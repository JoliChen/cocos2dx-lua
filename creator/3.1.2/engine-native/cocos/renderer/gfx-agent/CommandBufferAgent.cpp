/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "base/CoreStd.h"
#include "base/job-system/JobSystem.h"
#include "base/threading/MessageQueue.h"

#include "BufferAgent.h"
#include "CommandBufferAgent.h"
#include "DescriptorSetAgent.h"
#include "DeviceAgent.h"
#include "FramebufferAgent.h"
#include "InputAssemblerAgent.h"
#include "LinearAllocatorPool.h"
#include "PipelineStateAgent.h"
#include "QueueAgent.h"
#include "RenderPassAgent.h"
#include "TextureAgent.h"

namespace cc {
namespace gfx {

void CommandBufferAgent::flushCommands(uint count, CommandBufferAgent *const *cmdBuffs, bool multiThreaded) {
    uint jobThreadCount    = JobSystem::getInstance()->threadCount();
    uint workForThisThread = (count - 1) / jobThreadCount + 1; // ceil(count / jobThreadCount)

    if (count > workForThisThread + 1 && multiThreaded) { // more than one job to dispatch
        JobGraph g(JobSystem::getInstance());
        g.createForEachIndexJob(workForThisThread, count, 1U, [cmdBuffs](uint i) {
            cmdBuffs[i]->getMessageQueue()->flushMessages();
        });
        g.run();

        for (uint i = 0U; i < workForThisThread; ++i) {
            cmdBuffs[i]->getMessageQueue()->flushMessages();
        }
        g.waitForAll();
    } else {
        for (uint i = 0U; i < count; ++i) {
            cmdBuffs[i]->getMessageQueue()->flushMessages();
        }
    }
}

CommandBufferAgent::~CommandBufferAgent() {
    destroyMessageQueue();

    ENQUEUE_MESSAGE_1(
        DeviceAgent::getInstance()->getMessageQueue(), CommandBufferDestruct,
        actor, _actor,
        {
            CC_SAFE_DELETE(actor);
        });
}

void CommandBufferAgent::initMessageQueue() {
    _allocatorPools.resize(MAX_CPU_FRAME_AHEAD + 1);

    for (uint i = 0U; i < MAX_CPU_FRAME_AHEAD + 1; ++i) {
        _allocatorPools[i] = CC_NEW(LinearAllocatorPool);
    }
    DeviceAgent *device = DeviceAgent::getInstance();
    device->_cmdBuffRefs.insert(this);

    _messageQueue = CC_NEW(MessageQueue);
    if (device->_multithreaded) _messageQueue->setImmediateMode(false);
}

void CommandBufferAgent::destroyMessageQueue() {
    DeviceAgent::getInstance()->getMessageQueue()->kickAndWait();
    CC_SAFE_DELETE(_messageQueue);

    DeviceAgent::getInstance()->_cmdBuffRefs.erase(this);
    for (LinearAllocatorPool *pool : _allocatorPools) {
        CC_SAFE_DELETE(pool);
    }
    _allocatorPools.clear();
}

LinearAllocatorPool *CommandBufferAgent::getAllocator() {
    return _allocatorPools[DeviceAgent::getInstance()->_currentIndex];
}

void CommandBufferAgent::doInit(const CommandBufferInfo &info) {
    initMessageQueue();

    CommandBufferInfo actorInfo = info;
    actorInfo.queue             = static_cast<QueueAgent *>(info.queue)->getActor();

    ENQUEUE_MESSAGE_2(
        DeviceAgent::getInstance()->getMessageQueue(), CommandBufferInit,
        actor, getActor(),
        info, actorInfo,
        {
            actor->initialize(info);
        });
}

void CommandBufferAgent::doDestroy() {
    destroyMessageQueue();

    ENQUEUE_MESSAGE_1(
        DeviceAgent::getInstance()->getMessageQueue(), CommandBufferDestroy,
        actor, getActor(),
        {
            actor->destroy();
        });
}

void CommandBufferAgent::begin(RenderPass *renderPass, uint subpass, Framebuffer *frameBuffer) {
    ENQUEUE_MESSAGE_4(
        _messageQueue,
        CommandBufferBegin,
        actor, getActor(),
        renderPass, renderPass ? static_cast<RenderPassAgent *>(renderPass)->getActor() : nullptr,
        subpass, subpass,
        frameBuffer, frameBuffer ? static_cast<FramebufferAgent *>(frameBuffer)->getActor() : nullptr,
        {
            actor->begin(renderPass, subpass, frameBuffer);
        });
}

void CommandBufferAgent::end() {
    ENQUEUE_MESSAGE_1(
        _messageQueue, CommandBufferEnd,
        actor, getActor(),
        {
            actor->end();
        });
}

void CommandBufferAgent::beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil, CommandBuffer *const *secondaryCBs, uint secondaryCBCount) {
    uint   attachmentCount = static_cast<uint>(renderPass->getColorAttachments().size());
    Color *actorColors     = nullptr;
    if (attachmentCount) {
        actorColors = getAllocator()->allocate<Color>(attachmentCount);
        memcpy(actorColors, colors, sizeof(Color) * attachmentCount);
    }

    CommandBuffer **actorSecondaryCBs = nullptr;
    if (secondaryCBCount) {
        actorSecondaryCBs = getAllocator()->allocate<CommandBuffer *>(secondaryCBCount);
        for (uint i = 0; i < secondaryCBCount; ++i) {
            actorSecondaryCBs[i] = static_cast<CommandBufferAgent *>(secondaryCBs[i])->getActor();
        }
    }

    ENQUEUE_MESSAGE_9(
        _messageQueue, CommandBufferBeginRenderPass,
        actor, getActor(),
        renderPass, static_cast<RenderPassAgent *>(renderPass)->getActor(),
        fbo, static_cast<FramebufferAgent *>(fbo)->getActor(),
        renderArea, renderArea,
        colors, actorColors,
        depth, depth,
        stencil, stencil,
        secondaryCBCount, secondaryCBCount,
        secondaryCBs, actorSecondaryCBs,
        {
            actor->beginRenderPass(renderPass, fbo, renderArea, colors, depth, stencil, secondaryCBs, secondaryCBCount);
        });
}

void CommandBufferAgent::endRenderPass() {
    ENQUEUE_MESSAGE_1(
        _messageQueue, CommandBufferEndRenderPass,
        actor, getActor(),
        {
            actor->endRenderPass();
        });
}

void CommandBufferAgent::execute(CommandBuffer *const *cmdBuffs, uint32_t count) {
    if (!count) return;

    auto **actorCmdBuffs = getAllocator()->allocate<CommandBuffer *>(count);
    for (uint i = 0; i < count; ++i) {
        actorCmdBuffs[i] = static_cast<CommandBufferAgent *>(cmdBuffs[i])->getActor();
    }

    ENQUEUE_MESSAGE_3(
        _messageQueue, CommandBufferExecute,
        actor, getActor(),
        cmdBuffs, actorCmdBuffs,
        count, count,
        {
            actor->execute(cmdBuffs, count);
        });
}

void CommandBufferAgent::bindPipelineState(PipelineState *pso) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferBindPipelineState,
        actor, getActor(),
        pso, static_cast<PipelineStateAgent *>(pso)->getActor(),
        {
            actor->bindPipelineState(pso);
        });
}

void CommandBufferAgent::bindDescriptorSet(uint set, DescriptorSet *descriptorSet, uint dynamicOffsetCount, const uint *dynamicOffsets) {
    uint *actorDynamicOffsets = nullptr;
    if (dynamicOffsetCount) {
        actorDynamicOffsets = getAllocator()->allocate<uint>(dynamicOffsetCount);
        memcpy(actorDynamicOffsets, dynamicOffsets, dynamicOffsetCount * sizeof(uint));
    }

    ENQUEUE_MESSAGE_5(
        _messageQueue, CommandBufferBindDescriptorSet,
        actor, getActor(),
        set, set,
        descriptorSet, static_cast<DescriptorSetAgent *>(descriptorSet)->getActor(),
        dynamicOffsetCount, dynamicOffsetCount,
        dynamicOffsets, actorDynamicOffsets,
        {
            actor->bindDescriptorSet(set, descriptorSet, dynamicOffsetCount, dynamicOffsets);
        });
}

void CommandBufferAgent::bindInputAssembler(InputAssembler *ia) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferBindInputAssembler,
        actor, getActor(),
        ia, static_cast<InputAssemblerAgent *>(ia)->getActor(),
        {
            actor->bindInputAssembler(ia);
        });
}

void CommandBufferAgent::setViewport(const Viewport &vp) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferSetViewport,
        actor, getActor(),
        vp, vp,
        {
            actor->setViewport(vp);
        });
}

void CommandBufferAgent::setScissor(const Rect &rect) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferSetScissor,
        actor, getActor(),
        rect, rect,
        {
            actor->setScissor(rect);
        });
}

void CommandBufferAgent::setLineWidth(float width) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferSetLineWidth,
        actor, getActor(),
        width, width,
        {
            actor->setLineWidth(width);
        });
}

void CommandBufferAgent::setDepthBias(float constant, float clamp, float slope) {
    ENQUEUE_MESSAGE_4(
        _messageQueue, CommandBufferSetDepthBias,
        actor, getActor(),
        constant, constant,
        clamp, clamp,
        slope, slope,
        {
            actor->setDepthBias(constant, clamp, slope);
        });
}

void CommandBufferAgent::setBlendConstants(const Color &constants) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferSetBlendConstants,
        actor, getActor(),
        constants, constants,
        {
            actor->setBlendConstants(constants);
        });
}

void CommandBufferAgent::setDepthBound(float minBounds, float maxBounds) {
    ENQUEUE_MESSAGE_3(
        _messageQueue, CommandBufferSetDepthBound,
        actor, getActor(),
        minBounds, minBounds,
        maxBounds, maxBounds,
        {
            actor->setDepthBound(minBounds, maxBounds);
        });
}

void CommandBufferAgent::setStencilWriteMask(StencilFace face, uint mask) {
    ENQUEUE_MESSAGE_3(
        _messageQueue, CommandBufferSetStencilWriteMask,
        actor, getActor(),
        face, face,
        mask, mask,
        {
            actor->setStencilWriteMask(face, mask);
        });
}

void CommandBufferAgent::setStencilCompareMask(StencilFace face, int ref, uint mask) {
    ENQUEUE_MESSAGE_4(
        _messageQueue, CommandBufferSetStencilCompareMask,
        actor, getActor(),
        face, face,
        ref, ref,
        mask, mask,
        {
            actor->setStencilCompareMask(face, ref, mask);
        });
}

void CommandBufferAgent::nextSubpass() {
    ENQUEUE_MESSAGE_1(
        _messageQueue, CommandBufferNextSubpass,
        actor, getActor(),
        {
            actor->nextSubpass();
        });
}

void CommandBufferAgent::draw(const DrawInfo &info) {
    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferDraw,
        actor, getActor(),
        info, info,
        {
            actor->draw(info);
        });
}

void CommandBufferAgent::updateBuffer(Buffer *buff, const void *data, uint size) {
    MessageQueue *queue = _messageQueue;

    auto *actorData = getAllocator()->allocate<uint8_t>(size);
    memcpy(actorData, data, size);

    ENQUEUE_MESSAGE_4(
        queue, CommandBufferUpdateBuffer,
        actor, getActor(),
        buff, static_cast<BufferAgent *>(buff)->getActor(),
        data, actorData,
        size, size,
        {
            actor->updateBuffer(buff, data, size);
        });
}

void CommandBufferAgent::copyBuffersToTexture(const uint8_t *const *buffers, Texture *texture, const BufferTextureCopy *regions, uint count) {
    LinearAllocatorPool *allocator = getAllocator();

    auto *actorRegions = allocator->allocate<BufferTextureCopy>(count);
    memcpy(actorRegions, regions, count * sizeof(BufferTextureCopy));

    uint bufferCount = 0U;
    for (uint i = 0U; i < count; i++) {
        bufferCount += regions[i].texSubres.layerCount;
    }
    const auto **actorBuffers = allocator->allocate<const uint8_t *>(bufferCount);
    for (uint i = 0U, n = 0U; i < count; i++) {
        const BufferTextureCopy &region = regions[i];
        uint                     size   = formatSize(texture->getFormat(), region.texExtent.width, region.texExtent.height, 1);
        for (uint l = 0; l < region.texSubres.layerCount; l++) {
            auto *buffer = allocator->allocate<uint8_t>(size);
            memcpy(buffer, buffers[n], size);
            actorBuffers[n++] = buffer;
        }
    }

    ENQUEUE_MESSAGE_5(
        _messageQueue, CommandBufferCopyBuffersToTexture,
        actor, getActor(),
        buffers, actorBuffers,
        texture, static_cast<TextureAgent *>(texture)->getActor(),
        regions, actorRegions,
        count, count,
        {
            actor->copyBuffersToTexture(buffers, texture, regions, count);
        });
}

void CommandBufferAgent::blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlit *regions, uint count, Filter filter) {
    Texture *actorSrcTexture = nullptr;
    Texture *actorDstTexture = nullptr;
    if (srcTexture) actorSrcTexture = static_cast<TextureAgent *>(srcTexture)->getActor();
    if (dstTexture) actorDstTexture = static_cast<TextureAgent *>(dstTexture)->getActor();

    auto *actorRegions = getAllocator()->allocate<TextureBlit>(count);
    memcpy(actorRegions, regions, count * sizeof(TextureBlit));

    ENQUEUE_MESSAGE_6(
        _messageQueue, CommandBufferBlitTexture,
        actor, getActor(),
        srcTexture, actorSrcTexture,
        dstTexture, actorDstTexture,
        regions, actorRegions,
        count, count,
        filter, filter,
        {
            actor->blitTexture(srcTexture, dstTexture, regions, count, filter);
        });
}

void CommandBufferAgent::dispatch(const DispatchInfo &info) {
    DispatchInfo actorInfo = info;
    if (info.indirectBuffer) actorInfo.indirectBuffer = static_cast<BufferAgent *>(info.indirectBuffer)->getActor();

    ENQUEUE_MESSAGE_2(
        _messageQueue, CommandBufferDispatch,
        actor, getActor(),
        info, actorInfo,
        {
            actor->dispatch(info);
        });
}

void CommandBufferAgent::pipelineBarrier(const GlobalBarrier *barrier, const TextureBarrier *const *textureBarriers, const Texture *const *textures, uint textureBarrierCount) {
    TextureBarrier **actorTextureBarriers = nullptr;
    Texture **       actorTextures        = nullptr;

    if (textureBarrierCount) {
        actorTextureBarriers = getAllocator()->allocate<TextureBarrier *>(textureBarrierCount);
        memcpy(actorTextureBarriers, textureBarriers, textureBarrierCount * sizeof(uintptr_t));

        actorTextures = getAllocator()->allocate<Texture *>(textureBarrierCount);
        for (uint i = 0U; i < textureBarrierCount; ++i) {
            actorTextures[i] = textures[i] ? static_cast<const TextureAgent *>(textures[i])->getActor() : nullptr;
        }
    }

    ENQUEUE_MESSAGE_5(
        _messageQueue, CommandBufferPipelineBarrier,
        actor, getActor(),
        barrier, barrier,
        textureBarriers, actorTextureBarriers,
        textures, actorTextures,
        textureBarrierCount, textureBarrierCount,
        {
            actor->pipelineBarrier(barrier, textureBarriers, textures, textureBarrierCount);
        });
}

} // namespace gfx
} // namespace cc
