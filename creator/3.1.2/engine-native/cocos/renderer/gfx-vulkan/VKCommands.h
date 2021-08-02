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

#pragma once

#include "VKGPUObjects.h"

namespace cc {
namespace gfx {

class CCVKDevice;

struct CCVKDepthBias {
    float constant = 0.0F;
    float clamp = 0.0F;
    float slope = 0.0F;
};

struct CCVKDepthBounds {
    float minBounds = 0.0F;
    float maxBounds = 0.0F;
};

struct CCVKStencilWriteMask {
    StencilFace face = StencilFace::FRONT;
    uint32_t write_mask = 0;
};

struct CCVKStencilCompareMask {
    StencilFace face = StencilFace::FRONT;
    int reference = 0;
    uint32_t compareMask = 0;
};

CC_VULKAN_API void cmdFuncCCVKGetDeviceQueue(CCVKDevice *device, CCVKGPUQueue *gpuQueue);

CC_VULKAN_API void cmdFuncCCVKCreateTexture(CCVKDevice *device, CCVKGPUTexture *gpuTexture);
CC_VULKAN_API void cmdFuncCCVKCreateTextureView(CCVKDevice *device, CCVKGPUTextureView *gpuTextureView);
CC_VULKAN_API void cmdFuncCCVKCreateSampler(CCVKDevice *device, CCVKGPUSampler *gpuSampler);
CC_VULKAN_API void cmdFuncCCVKCreateBuffer(CCVKDevice *device, CCVKGPUBuffer *gpuBuffer);
CC_VULKAN_API void cmdFuncCCVKCreateRenderPass(CCVKDevice *device, CCVKGPURenderPass *gpuRenderPass);
CC_VULKAN_API void cmdFuncCCVKCreateFramebuffer(CCVKDevice *device, CCVKGPUFramebuffer *gpuFramebuffer);
CC_VULKAN_API void cmdFuncCCVKCreateShader(CCVKDevice *device, CCVKGPUShader *gpuShader);
CC_VULKAN_API void cmdFuncCCVKCreateDescriptorSetLayout(CCVKDevice *device, CCVKGPUDescriptorSetLayout *gpuDescriptorSetLayout);
CC_VULKAN_API void cmdFuncCCVKCreatePipelineLayout(CCVKDevice *device, CCVKGPUPipelineLayout *gpuPipelineLayout);
CC_VULKAN_API void cmdFuncCCVKCreateGraphicsPipelineState(CCVKDevice *device, CCVKGPUPipelineState *gpuPipelineState);
CC_VULKAN_API void cmdFuncCCVKCreateComputePipelineState(CCVKDevice *device, CCVKGPUPipelineState *gpuPipelineState);

CC_VULKAN_API void cmdFuncCCVKUpdateBuffer(CCVKDevice *device, CCVKGPUBuffer *gpuBuffer, const void *buffer, uint size, const CCVKGPUCommandBuffer *cmdBuffer = nullptr);
CC_VULKAN_API void cmdFuncCCVKCopyBuffersToTexture(CCVKDevice *device, const uint8_t *const *buffers, CCVKGPUTexture *gpuTexture, const BufferTextureCopy *regions, uint count, const CCVKGPUCommandBuffer *gpuCommandBuffer);

CC_VULKAN_API void cmdFuncCCVKDestroyRenderPass(CCVKGPUDevice *device, CCVKGPURenderPass *gpuRenderPass);
CC_VULKAN_API void cmdFuncCCVKDestroySampler(CCVKGPUDevice *device, CCVKGPUSampler *gpuSampler);
CC_VULKAN_API void cmdFuncCCVKDestroyShader(CCVKGPUDevice *device, CCVKGPUShader *gpuShader);
CC_VULKAN_API void cmdFuncCCVKDestroyFramebuffer(CCVKGPUDevice *device, CCVKGPUFramebuffer *gpuFramebuffer);
CC_VULKAN_API void cmdFuncCCVKDestroyDescriptorSetLayout(CCVKGPUDevice *device, CCVKGPUDescriptorSetLayout *gpuDescriptorSetLayout);
CC_VULKAN_API void cmdFuncCCVKDestroyPipelineLayout(CCVKGPUDevice *device, CCVKGPUPipelineLayout *gpuPipelineLayout);
CC_VULKAN_API void cmdFuncCCVKDestroyPipelineState(CCVKGPUDevice *device, CCVKGPUPipelineState *gpuPipelineState);

CC_VULKAN_API void cmdFuncCCVKImageMemoryBarrier(const CCVKGPUCommandBuffer *gpuCommandBuffer, const ThsvsImageBarrier &imageBarrier);
CC_VULKAN_API void cmdFuncCCVKGlobalMemoryBarrier(const CCVKGPUCommandBuffer *gpuCommandBuffer, const ThsvsGlobalBarrier &globalBarrier);

} // namespace gfx
} // namespace cc
