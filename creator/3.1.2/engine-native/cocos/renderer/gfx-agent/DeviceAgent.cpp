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
#include "base/threading/MessageQueue.h"

#include "BufferAgent.h"
#include "CommandBufferAgent.h"
#include "DescriptorSetAgent.h"
#include "DescriptorSetLayoutAgent.h"
#include "DeviceAgent.h"
#include "FramebufferAgent.h"
#include "InputAssemblerAgent.h"
#include "LinearAllocatorPool.h"
#include "PipelineLayoutAgent.h"
#include "PipelineStateAgent.h"
#include "QueueAgent.h"
#include "RenderPassAgent.h"
#include "SamplerAgent.h"
#include "ShaderAgent.h"
#include "TextureAgent.h"

namespace cc {
namespace gfx {

DeviceAgent *DeviceAgent::instance = nullptr;

DeviceAgent *DeviceAgent::getInstance() {
    return DeviceAgent::instance;
}

DeviceAgent::DeviceAgent(Device *device) : Agent(device) {
    DeviceAgent::instance = this;
}

DeviceAgent::~DeviceAgent() {
    CC_SAFE_DELETE(_actor);
    DeviceAgent::instance = nullptr;
}

bool DeviceAgent::doInit(const DeviceInfo &info) {
    if (!_actor->initialize(info)) {
        return false;
    }

    _context                                            = _actor->getContext();
    _api                                                = _actor->getGfxAPI();
    _deviceName                                         = _actor->getDeviceName();
    _queue                                              = CC_NEW(QueueAgent(_actor->getQueue()));
    _cmdBuff                                            = CC_NEW(CommandBufferAgent(_actor->getCommandBuffer()));
    static_cast<CommandBufferAgent *>(_cmdBuff)->_queue = _queue;
    _renderer                                           = _actor->getRenderer();
    _vendor                                             = _actor->getVendor();
    _caps                                               = _actor->_caps;
    memcpy(_features, _actor->_features, static_cast<uint>(Feature::COUNT) * sizeof(bool));

    _mainEncoder = CC_NEW(MessageQueue);

    _allocatorPools.resize(MAX_CPU_FRAME_AHEAD + 1);
    for (uint i = 0U; i < MAX_CPU_FRAME_AHEAD + 1; ++i) {
        _allocatorPools[i] = CC_NEW(LinearAllocatorPool);
    }
    static_cast<CommandBufferAgent *>(_cmdBuff)->initMessageQueue();

    setMultithreaded(true);

    return true;
}

void DeviceAgent::doDestroy() {
    ENQUEUE_MESSAGE_1(
        getMessageQueue(), DeviceDestroy,
        actor, getActor(),
        {
            actor->destroy();
        });

    if (_cmdBuff) {
        static_cast<CommandBufferAgent *>(_cmdBuff)->destroyMessageQueue();
        static_cast<CommandBufferAgent *>(_cmdBuff)->_actor = nullptr;
        CC_DELETE(_cmdBuff);
        _cmdBuff = nullptr;
    }
    if (_queue) {
        static_cast<QueueAgent *>(_queue)->_actor = nullptr;
        CC_DELETE(_queue);
        _queue = nullptr;
    }

    _mainEncoder->terminateConsumerThread();
    CC_SAFE_DELETE(_mainEncoder);

    for (LinearAllocatorPool *pool : _allocatorPools) {
        CC_SAFE_DELETE(pool);
    }
    _allocatorPools.clear();
}

void DeviceAgent::resize(uint width, uint height) {
    ENQUEUE_MESSAGE_3(
        getMessageQueue(), DeviceResize,
        actor, getActor(),
        width, width,
        height, height,
        {
            actor->resize(width, height);
        });
}

void DeviceAgent::acquire() {
    ENQUEUE_MESSAGE_1(
        _mainEncoder, DeviceAcquire,
        actor, getActor(),
        {
            actor->acquire();
        });
}

void DeviceAgent::present() {
    ENQUEUE_MESSAGE_2(
        _mainEncoder, DevicePresent,
        actor, getActor(),
        frameBoundarySemaphore, &_frameBoundarySemaphore,
        {
            actor->present();
            frameBoundarySemaphore->signal();
        });

    MessageQueue::freeChunksInFreeQueue(_mainEncoder);
    _mainEncoder->finishWriting();
    _currentIndex = (_currentIndex + 1) % (MAX_CPU_FRAME_AHEAD + 1);
    _frameBoundarySemaphore.wait();

    getMainAllocator()->reset();
    for (CommandBufferAgent *cmdBuff : _cmdBuffRefs) {
        cmdBuff->_allocatorPools[_currentIndex]->reset();
    }
}

void DeviceAgent::setMultithreaded(bool multithreaded) {
    if (multithreaded == _multithreaded) return;
    _multithreaded = multithreaded;

    if (multithreaded) {
        _mainEncoder->setImmediateMode(false);
        _actor->bindRenderContext(false);
        _mainEncoder->runConsumerThread();
        ENQUEUE_MESSAGE_1(
            _mainEncoder, DeviceMakeCurrentTrue,
            actor, _actor,
            {
                actor->bindDeviceContext(true);
                CC_LOG_INFO("Device thread detached.");
            });
        for (CommandBufferAgent *cmdBuff : _cmdBuffRefs) {
            cmdBuff->_messageQueue->setImmediateMode(false);
        }
    } else {
        ENQUEUE_MESSAGE_1(
            _mainEncoder, DeviceMakeCurrentFalse,
            actor, _actor,
            {
                actor->bindDeviceContext(false);
            });
        _mainEncoder->terminateConsumerThread();
        _mainEncoder->setImmediateMode(true);
        _actor->bindRenderContext(true);
        for (CommandBufferAgent *cmdBuff : _cmdBuffRefs) {
            cmdBuff->_messageQueue->setImmediateMode(true);
        }
        CC_LOG_INFO("Device thread joined.");
    }
}

void DeviceAgent::releaseSurface(uintptr_t windowHandle) {
    ENQUEUE_MESSAGE_2(
        _mainEncoder, DeviceReleaseSurface,
        actor, _actor,
        windowHandle, windowHandle,
        {
            actor->releaseSurface(windowHandle);
        });
}

void DeviceAgent::acquireSurface(uintptr_t windowHandle) {
    ENQUEUE_MESSAGE_2(
        _mainEncoder, DeviceAcquireSurface,
        actor, _actor,
        windowHandle, windowHandle,
        {
            actor->acquireSurface(windowHandle);
        });
}

CommandBuffer *DeviceAgent::createCommandBuffer(const CommandBufferInfo &info, bool /*hasAgent*/) {
    CommandBuffer *actor = _actor->createCommandBuffer(info, true);
    return CC_NEW(CommandBufferAgent(actor));
}

Queue *DeviceAgent::createQueue() {
    Queue *actor = _actor->createQueue();
    return CC_NEW(QueueAgent(actor));
}

Buffer *DeviceAgent::createBuffer() {
    Buffer *actor = _actor->createBuffer();
    return CC_NEW(BufferAgent(actor));
}

Texture *DeviceAgent::createTexture() {
    Texture *actor = _actor->createTexture();
    return CC_NEW(TextureAgent(actor));
}

Sampler *DeviceAgent::createSampler() {
    Sampler *actor = _actor->createSampler();
    return CC_NEW(SamplerAgent(actor));
}

Shader *DeviceAgent::createShader() {
    Shader *actor = _actor->createShader();
    return CC_NEW(ShaderAgent(actor));
}

InputAssembler *DeviceAgent::createInputAssembler() {
    InputAssembler *actor = _actor->createInputAssembler();
    return CC_NEW(InputAssemblerAgent(actor));
}

RenderPass *DeviceAgent::createRenderPass() {
    RenderPass *actor = _actor->createRenderPass();
    return CC_NEW(RenderPassAgent(actor));
}

Framebuffer *DeviceAgent::createFramebuffer() {
    Framebuffer *actor = _actor->createFramebuffer();
    return CC_NEW(FramebufferAgent(actor));
}

DescriptorSet *DeviceAgent::createDescriptorSet() {
    DescriptorSet *actor = _actor->createDescriptorSet();
    return CC_NEW(DescriptorSetAgent(actor));
}

DescriptorSetLayout *DeviceAgent::createDescriptorSetLayout() {
    DescriptorSetLayout *actor = _actor->createDescriptorSetLayout();
    return CC_NEW(DescriptorSetLayoutAgent(actor));
}

PipelineLayout *DeviceAgent::createPipelineLayout() {
    PipelineLayout *actor = _actor->createPipelineLayout();
    return CC_NEW(PipelineLayoutAgent(actor));
}

PipelineState *DeviceAgent::createPipelineState() {
    PipelineState *actor = _actor->createPipelineState();
    return CC_NEW(PipelineStateAgent(actor));
}

GlobalBarrier *DeviceAgent::createGlobalBarrier() {
    return _actor->createGlobalBarrier();
}

TextureBarrier *DeviceAgent::createTextureBarrier() {
    return _actor->createTextureBarrier();
}

void DeviceAgent::copyBuffersToTexture(const uint8_t *const *buffers, Texture *dst, const BufferTextureCopy *regions, uint count) {
    LinearAllocatorPool *allocator = getMainAllocator();

    auto *actorRegions = allocator->allocate<BufferTextureCopy>(count);
    memcpy(actorRegions, regions, count * sizeof(BufferTextureCopy));

    uint bufferCount = 0U;
    for (uint i = 0U; i < count; i++) {
        bufferCount += regions[i].texSubres.layerCount;
    }
    const auto **actorBuffers = allocator->allocate<const uint8_t *>(bufferCount);
    for (uint i = 0U, n = 0U; i < count; i++) {
        const BufferTextureCopy &region = regions[i];
        uint                     size   = formatSize(dst->getFormat(), region.texExtent.width, region.texExtent.height, 1);
        for (uint l = 0; l < region.texSubres.layerCount; l++) {
            auto *buffer = allocator->allocate<uint8_t>(size);
            memcpy(buffer, buffers[n], size);
            actorBuffers[n++] = buffer;
        }
    }

    ENQUEUE_MESSAGE_5(
        _mainEncoder, DeviceCopyBuffersToTexture,
        actor, getActor(),
        buffers, actorBuffers,
        dst, static_cast<TextureAgent *>(dst)->getActor(),
        regions, actorRegions,
        count, count,
        {
            actor->copyBuffersToTexture(buffers, dst, regions, count);
        });
}

void DeviceAgent::flushCommands(CommandBuffer *const *cmdBuffs, uint count) {
    if (!_multithreaded) return; // all command buffers are immediately executed

    bool multiThreaded = hasFeature(Feature::MULTITHREADED_SUBMISSION);

    auto **agentCmdBuffs = getMainAllocator()->allocate<CommandBufferAgent *>(count);
    for (uint i = 0; i < count; ++i) {
        agentCmdBuffs[i] = static_cast<CommandBufferAgent *const>(cmdBuffs[i]);
        MessageQueue::freeChunksInFreeQueue(agentCmdBuffs[i]->_messageQueue);
        agentCmdBuffs[i]->_messageQueue->finishWriting();
    }

    ENQUEUE_MESSAGE_3(
        _mainEncoder, DeviceFlushCommands,
        count, count,
        cmdBuffs, agentCmdBuffs,
        multiThreaded, multiThreaded,
        {
            CommandBufferAgent::flushCommands(count, cmdBuffs, multiThreaded);
        });
}

} // namespace gfx
} // namespace cc
