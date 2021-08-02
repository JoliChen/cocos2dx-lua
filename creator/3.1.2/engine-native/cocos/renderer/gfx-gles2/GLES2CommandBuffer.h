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

#pragma once

#include "GLES2Commands.h"
#include "gfx-base/GFXCommandBuffer.h"

namespace cc {
namespace gfx {

class GLES2GPUCommandAllocator;

class CC_GLES2_API GLES2CommandBuffer : public CommandBuffer {
public:
    GLES2CommandBuffer() = default;
    ~GLES2CommandBuffer() override;

    friend class GLES2Queue;

    void begin(RenderPass *renderPass, uint subpass, Framebuffer *frameBuffer) override;
    void end() override;
    void beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil, CommandBuffer *const *secondaryCBs, uint secondaryCBCount) override;
    void endRenderPass() override;
    void bindPipelineState(PipelineState *pso) override;
    void bindDescriptorSet(uint set, DescriptorSet *descriptorSet, uint dynamicOffsetCount, const uint *dynamicOffsets) override;
    void bindInputAssembler(InputAssembler *ia) override;
    void setViewport(const Viewport &vp) override;
    void setScissor(const Rect &rect) override;
    void setLineWidth(float width) override;
    void setDepthBias(float constant, float clamp, float slope) override;
    void setBlendConstants(const Color &constants) override;
    void setDepthBound(float minBounds, float maxBounds) override;
    void setStencilWriteMask(StencilFace face, uint mask) override;
    void setStencilCompareMask(StencilFace face, int ref, uint mask) override;
    void nextSubpass() override;
    void draw(const DrawInfo &info) override;
    void updateBuffer(Buffer *buff, const void *data, uint size) override;
    void copyBuffersToTexture(const uint8_t *const *buffers, Texture *texture, const BufferTextureCopy *regions, uint count) override;
    void blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlit *regions, uint count, Filter filter) override;
    void execute(CommandBuffer *const *cmdBuffs, uint32_t count) override;
    void dispatch(const DispatchInfo &info) override {}
    void pipelineBarrier(const GlobalBarrier *barrier, const TextureBarrier *const *textureBarriers, const Texture *const *textures, uint textureBarrierCount) override {}

protected:
    void doInit(const CommandBufferInfo &info) override;
    void doDestroy() override;

    virtual void bindStates();

    GLES2GPUCommandAllocator *_cmdAllocator  = nullptr;
    GLES2CmdPackage *         _curCmdPackage = nullptr;
    queue<GLES2CmdPackage *>  _pendingPackages, _freePackages;

    bool                            _isInRenderPass      = false;
    GLES2GPUPipelineState *         _curGPUPipelineState = nullptr;
    vector<GLES2GPUDescriptorSet *> _curGPUDescriptorSets;
    vector<vector<uint>>            _curDynamicOffsets;
    GLES2GPUInputAssembler *        _curGPUInputAssember = nullptr;
    Viewport                        _curViewport;
    Rect                            _curScissor;
    float                           _curLineWidth = 1.0F;
    GLES2DepthBias                  _curDepthBias;
    Color                           _curBlendConstants;
    GLES2DepthBounds                _curDepthBounds;
    GLES2StencilWriteMask           _curStencilWriteMask;
    GLES2StencilCompareMask         _curStencilCompareMask;
    bool                            _isStateInvalid = false;
};

} // namespace gfx
} // namespace cc
