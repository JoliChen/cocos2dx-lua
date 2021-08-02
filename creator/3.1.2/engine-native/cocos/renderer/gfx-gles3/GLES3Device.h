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

#include "GLES3Std.h"
#include "gfx-base/GFXDevice.h"

namespace cc {
namespace gfx {

class GLES3Context;
class GLES3GPUStateCache;
class GLES3GPUStagingBufferPool;
class GLES3GPUFramebufferCacheMap;

class CC_GLES3_API GLES3Device final : public Device {
public:
    static GLES3Device *getInstance();

    ~GLES3Device() override;

    using Device::copyBuffersToTexture;
    using Device::createBuffer;
    using Device::createCommandBuffer;
    using Device::createDescriptorSet;
    using Device::createDescriptorSetLayout;
    using Device::createFramebuffer;
    using Device::createGlobalBarrier;
    using Device::createInputAssembler;
    using Device::createPipelineLayout;
    using Device::createPipelineState;
    using Device::createQueue;
    using Device::createRenderPass;
    using Device::createSampler;
    using Device::createShader;
    using Device::createTexture;
    using Device::createTextureBarrier;

    void resize(uint width, uint height) override;
    void acquire() override;
    void present() override;

    inline GLES3GPUStateCache *         stateCache() const { return _gpuStateCache; }
    inline GLES3GPUStagingBufferPool *  stagingBufferPool() const { return _gpuStagingBufferPool; }
    inline GLES3GPUFramebufferCacheMap *framebufferCacheMap() const { return _gpuFramebufferCacheMap; }
    inline uint                         getThreadID() const { return _threadID; }

    inline bool checkExtension(const String &extension) const {
        return std::any_of(_extensions.begin(), _extensions.end(), [&extension](auto &ext) {
            return ext.find(extension) != String::npos;
        });
    }

    uint getMinorVersion() const;

protected:
    static GLES3Device *instance;

    friend class DeviceManager;
    friend class GLES3Context;

    GLES3Device();

    bool                 doInit(const DeviceInfo &info) override;
    void                 doDestroy() override;
    CommandBuffer *      createCommandBuffer(const CommandBufferInfo &info, bool hasAgent) override;
    Queue *              createQueue() override;
    Buffer *             createBuffer() override;
    Texture *            createTexture() override;
    Sampler *            createSampler() override;
    Shader *             createShader() override;
    InputAssembler *     createInputAssembler() override;
    RenderPass *         createRenderPass() override;
    Framebuffer *        createFramebuffer() override;
    DescriptorSet *      createDescriptorSet() override;
    DescriptorSetLayout *createDescriptorSetLayout() override;
    PipelineLayout *     createPipelineLayout() override;
    PipelineState *      createPipelineState() override;
    GlobalBarrier *      createGlobalBarrier() override;
    TextureBarrier *     createTextureBarrier() override;
    void                 copyBuffersToTexture(const uint8_t *const *buffers, Texture *dst, const BufferTextureCopy *regions, uint count) override;

    void releaseSurface(uintptr_t windowHandle) override;
    void acquireSurface(uintptr_t windowHandle) override;

    void bindRenderContext(bool bound) override;
    void bindDeviceContext(bool bound) override;

    GLES3Context *               _renderContext          = nullptr;
    GLES3Context *               _deviceContext          = nullptr;
    GLES3GPUStateCache *         _gpuStateCache          = nullptr;
    GLES3GPUStagingBufferPool *  _gpuStagingBufferPool   = nullptr;
    GLES3GPUFramebufferCacheMap *_gpuFramebufferCacheMap = nullptr;

    StringArray _extensions;

    uint _threadID = 0U;
};

} // namespace gfx
} // namespace cc
