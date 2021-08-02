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

#include "GFXBuffer.h"
#include "GFXInputAssembler.h"
#include "GFXObject.h"
#include "base/Utils.h"

namespace cc {
namespace gfx {

class CC_DLL CommandBuffer : public GFXObject {
public:
    CommandBuffer();
    ~CommandBuffer() override;

    void initialize(const CommandBufferInfo &info);
    void destroy();

    virtual void begin(RenderPass *renderPass, uint subpass, Framebuffer *frameBuffer)                                                                                                                       = 0;
    virtual void end()                                                                                                                                                                                       = 0;
    virtual void beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil, CommandBuffer *const *secondaryCBs, uint secondaryCBCount) = 0;
    virtual void endRenderPass()                                                                                                                                                                             = 0;
    virtual void bindPipelineState(PipelineState *pso)                                                                                                                                                       = 0;
    virtual void bindDescriptorSet(uint set, DescriptorSet *descriptorSet, uint dynamicOffsetCount, const uint *dynamicOffsets)                                                                              = 0;
    virtual void bindInputAssembler(InputAssembler *ia)                                                                                                                                                      = 0;
    virtual void setViewport(const Viewport &vp)                                                                                                                                                             = 0;
    virtual void setScissor(const Rect &rect)                                                                                                                                                                = 0;
    virtual void setLineWidth(float width)                                                                                                                                                                   = 0;
    virtual void setDepthBias(float constant, float clamp, float slope)                                                                                                                                      = 0;
    virtual void setBlendConstants(const Color &constants)                                                                                                                                                   = 0;
    virtual void setDepthBound(float minBounds, float maxBounds)                                                                                                                                             = 0;
    virtual void setStencilWriteMask(StencilFace face, uint mask)                                                                                                                                            = 0;
    virtual void setStencilCompareMask(StencilFace face, int ref, uint mask)                                                                                                                                 = 0;
    virtual void nextSubpass()                                                                                                                                                                               = 0;
    virtual void draw(const DrawInfo &info)                                                                                                                                                                  = 0;
    virtual void updateBuffer(Buffer *buff, const void *data, uint size)                                                                                                                                     = 0;
    virtual void copyBuffersToTexture(const uint8_t *const *buffers, Texture *texture, const BufferTextureCopy *regions, uint count)                                                                         = 0;
    virtual void blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlit *regions, uint count, Filter filter)                                                                                = 0;
    virtual void execute(CommandBuffer *const *cmdBuffs, uint32_t count)                                                                                                                                     = 0;
    virtual void dispatch(const DispatchInfo &info)                                                                                                                                                          = 0;
    virtual void pipelineBarrier(const GlobalBarrier *barrier, const TextureBarrier *const *textureBarriers, const Texture *const *textures, uint textureBarrierCount)                                       = 0;

    inline void begin();
    inline void begin(RenderPass *renderPass);
    inline void begin(RenderPass *renderPass, uint subpass);

    inline void updateBuffer(Buffer *buff, const void *data);

    inline void execute(const CommandBufferList &cmdBuffs, uint32_t count);

    inline void bindDescriptorSet(uint set, DescriptorSet *descriptorSet);
    inline void bindDescriptorSet(uint set, DescriptorSet *descriptorSet, const vector<uint> &dynamicOffsets);

    inline void beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil, const CommandBufferList &secondaryCBs);
    inline void beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil);
    inline void beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil);

    inline void draw(InputAssembler *ia);
    inline void copyBuffersToTexture(const BufferDataList &buffers, Texture *texture, const BufferTextureCopyList &regions);

    inline void blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlitList &regions, Filter filter);

    inline void pipelineBarrier(const GlobalBarrier *barrier);
    inline void pipelineBarrier(const GlobalBarrier *barrier, const TextureBarrierList &textureBarriers, const TextureList &textures);

    inline void bindDescriptorSetForJS(uint set, DescriptorSet *descriptorSet);
    inline void bindDescriptorSetForJS(uint set, DescriptorSet *descriptorSet, const vector<uint> &dynamicOffsets);
    inline void beginRenderPassForJS(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil, const CommandBufferList &secondaryCBs);
    inline void beginRenderPassForJS(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil);

    inline Queue *           getQueue() const { return _queue; }
    inline CommandBufferType getType() const { return _type; }

    virtual uint getNumDrawCalls() const { return _numDrawCalls; }
    virtual uint getNumInstances() const { return _numInstances; }
    virtual uint getNumTris() const { return _numTriangles; }

protected:
    virtual void doInit(const CommandBufferInfo &info) = 0;
    virtual void doDestroy()                           = 0;

    Queue *           _queue = nullptr;
    CommandBufferType _type  = CommandBufferType::PRIMARY;

    uint32_t _numDrawCalls = 0;
    uint32_t _numInstances = 0;
    uint32_t _numTriangles = 0;
};

//////////////////////////////////////////////////////////////////////////

void CommandBuffer::begin() {
    begin(nullptr, 0, nullptr);
}

void CommandBuffer::begin(RenderPass *renderPass) {
    begin(renderPass, 0, nullptr);
}

void CommandBuffer::begin(RenderPass *renderPass, uint subpass) {
    begin(renderPass, subpass, nullptr);
}

void CommandBuffer::updateBuffer(Buffer *buff, const void *data) {
    updateBuffer(buff, data, buff->getSize());
}

void CommandBuffer::execute(const CommandBufferList &cmdBuffs, uint32_t count) {
    execute(cmdBuffs.data(), count);
}

void CommandBuffer::bindDescriptorSet(uint set, DescriptorSet *descriptorSet) {
    bindDescriptorSet(set, descriptorSet, 0, nullptr);
}

void CommandBuffer::bindDescriptorSet(uint set, DescriptorSet *descriptorSet, const vector<uint> &dynamicOffsets) {
    bindDescriptorSet(set, descriptorSet, utils::toUint(dynamicOffsets.size()), dynamicOffsets.data());
}

void CommandBuffer::beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil, const CommandBufferList &secondaryCBs) {
    beginRenderPass(renderPass, fbo, renderArea, colors.data(), depth, stencil, secondaryCBs.data(), utils::toUint(secondaryCBs.size()));
}

void CommandBuffer::beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil) {
    beginRenderPass(renderPass, fbo, renderArea, colors.data(), depth, stencil, nullptr, 0);
}

void CommandBuffer::beginRenderPass(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const Color *colors, float depth, int stencil) {
    beginRenderPass(renderPass, fbo, renderArea, colors, depth, stencil, nullptr, 0);
}

void CommandBuffer::draw(InputAssembler *ia) {
    DrawInfo info;
    ia->extractDrawInfo(info);
    draw(info);
}

void CommandBuffer::copyBuffersToTexture(const BufferDataList &buffers, Texture *texture, const BufferTextureCopyList &regions) {
    copyBuffersToTexture(buffers.data(), texture, regions.data(), utils::toUint(regions.size()));
}

void CommandBuffer::blitTexture(Texture *srcTexture, Texture *dstTexture, const TextureBlitList &regions, Filter filter) {
    blitTexture(srcTexture, dstTexture, regions.data(), utils::toUint(regions.size()), filter);
}

void CommandBuffer::pipelineBarrier(const GlobalBarrier *barrier) {
    pipelineBarrier(barrier, nullptr, nullptr, 0U);
}

void CommandBuffer::pipelineBarrier(const GlobalBarrier *barrier, const TextureBarrierList &textureBarriers, const TextureList &textures) {
    pipelineBarrier(barrier, textureBarriers.data(), textures.data(), utils::toUint(textureBarriers.size()));
}

void CommandBuffer::bindDescriptorSetForJS(uint set, DescriptorSet *descriptorSet) {
    bindDescriptorSet(set, descriptorSet, 0, nullptr);
}

void CommandBuffer::bindDescriptorSetForJS(uint set, DescriptorSet *descriptorSet, const vector<uint> &dynamicOffsets) {
    bindDescriptorSet(set, descriptorSet, utils::toUint(dynamicOffsets.size()), dynamicOffsets.data());
}

void CommandBuffer::beginRenderPassForJS(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil, const CommandBufferList &secondaryCBs) {
    beginRenderPass(renderPass, fbo, renderArea, colors.data(), depth, stencil, secondaryCBs.data(), utils::toUint(secondaryCBs.size()));
}

void CommandBuffer::beginRenderPassForJS(RenderPass *renderPass, Framebuffer *fbo, const Rect &renderArea, const ColorList &colors, float depth, int stencil) {
    beginRenderPass(renderPass, fbo, renderArea, colors.data(), depth, stencil, nullptr, 0);
}

} // namespace gfx
} // namespace cc
