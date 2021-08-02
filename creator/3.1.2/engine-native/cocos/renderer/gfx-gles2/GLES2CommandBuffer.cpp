/****************************************************************************
 Copyright (c) 2019-2021 Xiamen Yaji Software Co., Ltd.

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

#include "GLES2Std.h"

#include "GLES2Buffer.h"
#include "GLES2CommandBuffer.h"
#include "GLES2DescriptorSet.h"
#include "GLES2Device.h"
#include "GLES2Framebuffer.h"
#include "GLES2InputAssembler.h"
#include "GLES2PipelineState.h"
#include "GLES2RenderPass.h"
#include "GLES2Texture.h"

namespace cc {
namespace gfx {

GLES2CommandBuffer::~GLES2CommandBuffer() {
    destroy();
}

void GLES2CommandBuffer::doInit(const CommandBufferInfo &info) {
    _type  = info.type;
    _queue = info.queue;

    _cmdAllocator  = CC_NEW(GLES2GPUCommandAllocator);
    _curCmdPackage = CC_NEW(GLES2CmdPackage);

    size_t setCount = GLES2Device::getInstance()->bindingMappingInfo().bufferOffsets.size();
    _curGPUDescriptorSets.resize(setCount);
    _curDynamicOffsets.resize(setCount);
}

void GLES2CommandBuffer::doDestroy() {
    if (!_cmdAllocator) return;

    _cmdAllocator->clearCmds(_curCmdPackage);
    CC_SAFE_DELETE(_curCmdPackage);

    while (!_pendingPackages.empty()) {
        GLES2CmdPackage *package = _pendingPackages.front();
        _cmdAllocator->clearCmds(package);
        CC_SAFE_DELETE(package);
        _pendingPackages.pop();
    }

    while (!_freePackages.empty()) {
        GLES2CmdPackage *package = _freePackages.front();
        _cmdAllocator->clearCmds(package);
        CC_SAFE_DELETE(package);
        _freePackages.pop();
    }

    _cmdAllocator->reset();
    CC_SAFE_DELETE(_cmdAllocator);
}

void GLES2CommandBuffer::begin(RenderPass * /*renderPass*/, uint /*subpass*/, Framebuffer * /*frameBuffer*/) {
    _cmdAllocator->clearCmds(_curCmdPackage);
    _curGPUPipelineState = nullptr;
    _curGPUInputAssember = nullptr;
    _curGPUDescriptorSets.assign(_curGPUDescriptorSets.size(), nullptr);

    _numDrawCalls = 0;
    _numInstances = 0;
    _numTriangles = 0;
}

void GLES2CommandBuffer::end() {
    if (_isStateInvalid) {
        bindStates();
    }
    _isInRenderPass = false;

    _pendingPackages.push(_curCmdPackage);
    if (!_freePackages.empty()) {
        _curCmdPackage = _freePackages.front();
        _freePackages.pop();
    } else {
        _curCmdPackage = CC_NEW(GLES2CmdPackage);
    }
}

void GLES2CommandBuffer::beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil, CommandBuffer *const * /*secondaryCBs*/, uint /*secondaryCBCount*/) {
    _isInRenderPass = true;

    GLES2CmdBeginRenderPass *cmd = _cmdAllocator->beginRenderPassCmdPool.alloc();
    cmd->gpuRenderPass           = static_cast<GLES2RenderPass *>(renderPass)->gpuRenderPass();
    cmd->gpuFBO                  = static_cast<GLES2Framebuffer *>(fbo)->gpuFBO();
    cmd->renderArea              = renderArea;
    cmd->numClearColors          = cmd->gpuRenderPass->colorAttachments.size();
    for (size_t i = 0; i < cmd->numClearColors; ++i) {
        cmd->clearColors[i] = colors[i];
    }
    cmd->clearDepth   = depth;
    cmd->clearStencil = stencil;
    _curCmdPackage->beginRenderPassCmds.push(cmd);
    _curCmdPackage->cmds.push(GLESCmdType::BEGIN_RENDER_PASS);
}

void GLES2CommandBuffer::endRenderPass() {
    _isInRenderPass = false;
    _curCmdPackage->cmds.push(GLESCmdType::END_RENDER_PASS);
}

void GLES2CommandBuffer::bindPipelineState(PipelineState *pso) {
    GLES2GPUPipelineState *gpuPipelineState = static_cast<GLES2PipelineState *>(pso)->gpuPipelineState();
    if (_curGPUPipelineState != gpuPipelineState) {
        _curGPUPipelineState = gpuPipelineState;
        _isStateInvalid      = true;
    }
}

void GLES2CommandBuffer::bindDescriptorSet(uint set, DescriptorSet *descriptorSet, uint dynamicOffsetCount, const uint *dynamicOffsets) {
    CCASSERT(_curGPUDescriptorSets.size() > set, "Invalid set index");

    GLES2GPUDescriptorSet *gpuDescriptorSet = static_cast<GLES2DescriptorSet *>(descriptorSet)->gpuDescriptorSet();
    if (_curGPUDescriptorSets[set] != gpuDescriptorSet) {
        _curGPUDescriptorSets[set] = gpuDescriptorSet;
        _isStateInvalid            = true;
    }
    if (dynamicOffsetCount) {
        _curDynamicOffsets[set].assign(dynamicOffsets, dynamicOffsets + dynamicOffsetCount);
        _isStateInvalid = true;
    }
}

void GLES2CommandBuffer::bindInputAssembler(InputAssembler *ia) {
    _curGPUInputAssember = static_cast<GLES2InputAssembler *>(ia)->gpuInputAssembler();
    _isStateInvalid      = true;
}

void GLES2CommandBuffer::setViewport(const Viewport &vp) {

    if ((_curViewport.left != vp.left) ||
        (_curViewport.top != vp.top) ||
        (_curViewport.width != vp.width) ||
        (_curViewport.height != vp.height) ||
        math::IsNotEqualF(_curViewport.minDepth, vp.minDepth) ||
        math::IsNotEqualF(_curViewport.maxDepth, vp.maxDepth)) {
        _curViewport    = vp;
        _isStateInvalid = true;
    }
}

void GLES2CommandBuffer::setScissor(const Rect &rect) {
    if ((_curScissor.x != rect.x) ||
        (_curScissor.y != rect.y) ||
        (_curScissor.width != rect.width) ||
        (_curScissor.height != rect.height)) {
        _curScissor     = rect;
        _isStateInvalid = true;
    }
}

void GLES2CommandBuffer::setLineWidth(float width) {
    if (math::IsNotEqualF(_curLineWidth, width)) {
        _curLineWidth   = width;
        _isStateInvalid = true;
    }
}

void GLES2CommandBuffer::setDepthBias(float constant, float clamp, float slope) {
    if (math::IsNotEqualF(_curDepthBias.constant, constant) ||
        math::IsNotEqualF(_curDepthBias.clamp, clamp) ||
        math::IsNotEqualF(_curDepthBias.slope, slope)) {
        _curDepthBias.constant = constant;
        _curDepthBias.clamp    = clamp;
        _curDepthBias.slope    = slope;
        _isStateInvalid        = true;
    }
}

void GLES2CommandBuffer::setBlendConstants(const Color &constants) {
    if (math::IsNotEqualF(_curBlendConstants.x, constants.x) ||
        math::IsNotEqualF(_curBlendConstants.y, constants.y) ||
        math::IsNotEqualF(_curBlendConstants.z, constants.z) ||
        math::IsNotEqualF(_curBlendConstants.w, constants.w)) {
        _curBlendConstants.x = constants.x;
        _curBlendConstants.y = constants.y;
        _curBlendConstants.z = constants.z;
        _curBlendConstants.w = constants.w;
        _isStateInvalid      = true;
    }
}

void GLES2CommandBuffer::setDepthBound(float minBounds, float maxBounds) {
    if (math::IsNotEqualF(_curDepthBounds.minBounds, minBounds) ||
        math::IsNotEqualF(_curDepthBounds.maxBounds, maxBounds)) {
        _curDepthBounds.minBounds = minBounds;
        _curDepthBounds.maxBounds = maxBounds;
        _isStateInvalid           = true;
    }
}

void GLES2CommandBuffer::setStencilWriteMask(StencilFace face, uint mask) {
    if ((_curStencilWriteMask.face != face) ||
        (_curStencilWriteMask.writeMask != mask)) {
        _curStencilWriteMask.face      = face;
        _curStencilWriteMask.writeMask = mask;
        _isStateInvalid                = true;
    }
}

void GLES2CommandBuffer::setStencilCompareMask(StencilFace face, int ref, uint mask) {
    if ((_curStencilCompareMask.face != face) ||
        (_curStencilCompareMask.refrence != ref) ||
        (_curStencilCompareMask.compareMask != mask)) {
        _curStencilCompareMask.face        = face;
        _curStencilCompareMask.refrence    = ref;
        _curStencilCompareMask.compareMask = mask;
        _isStateInvalid                    = true;
    }
}

void GLES2CommandBuffer::nextSubpass() {
}

void GLES2CommandBuffer::draw(const DrawInfo &info) {
    if (_isStateInvalid) {
        bindStates();
    }

    GLES2CmdDraw *cmd = _cmdAllocator->drawCmdPool.alloc();
    cmd->drawInfo     = info;
    _curCmdPackage->drawCmds.push(cmd);
    _curCmdPackage->cmds.push(GLESCmdType::DRAW);

    ++_numDrawCalls;
    _numInstances += info.instanceCount;
    uint indexCount = info.indexCount ? info.indexCount : info.vertexCount;
    if (_curGPUPipelineState) {
        switch (_curGPUPipelineState->glPrimitive) {
            case GL_TRIANGLES: {
                _numTriangles += indexCount / 3 * std::max(info.instanceCount, 1U);
                break;
            }
            case GL_TRIANGLE_STRIP:
            case GL_TRIANGLE_FAN: {
                _numTriangles += (indexCount - 2) * std::max(info.instanceCount, 1U);
                break;
            }
            default:
                break;
        }
    }
}

void GLES2CommandBuffer::updateBuffer(Buffer *buff, const void *data, uint size) {
    GLES2GPUBuffer *gpuBuffer = static_cast<GLES2Buffer *>(buff)->gpuBuffer();
    if (gpuBuffer) {
        GLES2CmdUpdateBuffer *cmd = _cmdAllocator->updateBufferCmdPool.alloc();
        cmd->gpuBuffer            = gpuBuffer;
        cmd->size                 = size;
        cmd->buffer               = static_cast<const uint8_t *>(data);

        _curCmdPackage->updateBufferCmds.push(cmd);
        _curCmdPackage->cmds.push(GLESCmdType::UPDATE_BUFFER);
    }
}

void GLES2CommandBuffer::copyBuffersToTexture(const uint8_t *const *buffers, Texture *texture, const BufferTextureCopy *regions, uint count) {
    GLES2GPUTexture *gpuTexture = static_cast<GLES2Texture *>(texture)->gpuTexture();
    if (gpuTexture) {
        GLES2CmdCopyBufferToTexture *cmd = _cmdAllocator->copyBufferToTextureCmdPool.alloc();
        cmd->gpuTexture                  = gpuTexture;
        cmd->regions                     = regions;
        cmd->count                       = count;
        cmd->buffers                     = buffers;

        _curCmdPackage->copyBufferToTextureCmds.push(cmd);
        _curCmdPackage->cmds.push(GLESCmdType::COPY_BUFFER_TO_TEXTURE);
    }
}

void GLES2CommandBuffer::blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlit *regions, uint count, Filter filter) {
}

void GLES2CommandBuffer::execute(CommandBuffer *const *cmdBuffs, uint32_t count) {
    CCASSERT(false, "Command 'execute' must be recorded in primary command buffers.");

    for (uint i = 0; i < count; ++i) {
        auto *           cmdBuff    = static_cast<GLES2CommandBuffer *>(cmdBuffs[i]);
        GLES2CmdPackage *cmdPackage = cmdBuff->_pendingPackages.front();

        for (uint j = 0; j < cmdPackage->beginRenderPassCmds.size(); ++j) {
            GLES2CmdBeginRenderPass *cmd = cmdPackage->beginRenderPassCmds[j];
            ++cmd->refCount;
            _curCmdPackage->beginRenderPassCmds.push(cmd);
        }
        for (uint j = 0; j < cmdPackage->bindStatesCmds.size(); ++j) {
            GLES2CmdBindStates *cmd = cmdPackage->bindStatesCmds[j];
            ++cmd->refCount;
            _curCmdPackage->bindStatesCmds.push(cmd);
        }
        for (uint j = 0; j < cmdPackage->drawCmds.size(); ++j) {
            GLES2CmdDraw *cmd = cmdPackage->drawCmds[j];
            ++cmd->refCount;
            _curCmdPackage->drawCmds.push(cmd);
        }
        for (uint j = 0; j < cmdPackage->updateBufferCmds.size(); ++j) {
            GLES2CmdUpdateBuffer *cmd = cmdPackage->updateBufferCmds[j];
            ++cmd->refCount;
            _curCmdPackage->updateBufferCmds.push(cmd);
        }
        for (uint j = 0; j < cmdPackage->copyBufferToTextureCmds.size(); ++j) {
            GLES2CmdCopyBufferToTexture *cmd = cmdPackage->copyBufferToTextureCmds[j];
            ++cmd->refCount;
            _curCmdPackage->copyBufferToTextureCmds.push(cmd);
        }
        _curCmdPackage->cmds.concat(cmdPackage->cmds);

        _numDrawCalls += cmdBuff->_numDrawCalls;
        _numInstances += cmdBuff->_numInstances;
        _numTriangles += cmdBuff->_numTriangles;

        cmdBuff->_pendingPackages.pop();
        cmdBuff->_freePackages.push(cmdPackage);

        // current cmd allocator strategy will not work here: (but it doesn't matter anyways)
        // allocators are designed to only free the cmds they allocated
        // but here we are essentially ��transfering' the owner ship
        //cmdBuff->_cmdAllocator->clearCmds(cmdPackage);
    }
}

void GLES2CommandBuffer::bindStates() {
    GLES2CmdBindStates *cmd = _cmdAllocator->bindStatesCmdPool.alloc();

    cmd->gpuPipelineState  = _curGPUPipelineState;
    cmd->gpuInputAssembler = _curGPUInputAssember;
    cmd->gpuDescriptorSets = _curGPUDescriptorSets;

    if (_curGPUPipelineState) {
        vector<uint> &dynamicOffsetOffsets = _curGPUPipelineState->gpuPipelineLayout->dynamicOffsetOffsets;
        cmd->dynamicOffsets.resize(_curGPUPipelineState->gpuPipelineLayout->dynamicOffsetCount);
        for (size_t i = 0U; i < _curDynamicOffsets.size(); i++) {
            size_t count = dynamicOffsetOffsets[i + 1] - dynamicOffsetOffsets[i];
            //CCASSERT(_curDynamicOffsets[i].size() >= count, "missing dynamic offsets?");
            count = std::min(count, _curDynamicOffsets[i].size());
            if (count) memcpy(&cmd->dynamicOffsets[dynamicOffsetOffsets[i]], _curDynamicOffsets[i].data(), count * sizeof(uint));
        }
    }

    cmd->viewport           = _curViewport;
    cmd->scissor            = _curScissor;
    cmd->lineWidth          = _curLineWidth;
    cmd->depthBias          = _curDepthBias;
    cmd->blendConstants.x   = _curBlendConstants.x;
    cmd->blendConstants.y   = _curBlendConstants.y;
    cmd->blendConstants.z   = _curBlendConstants.z;
    cmd->blendConstants.w   = _curBlendConstants.w;
    cmd->depthBounds        = _curDepthBounds;
    cmd->stencilWriteMask   = _curStencilWriteMask;
    cmd->stencilCompareMask = _curStencilCompareMask;

    _curCmdPackage->bindStatesCmds.push(cmd);
    _curCmdPackage->cmds.push(GLESCmdType::BIND_STATES);
    _isStateInvalid = false;
}

} // namespace gfx
} // namespace cc
