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

#include "GLES3Std.h"

#include "GLES3Commands.h"
#include "GLES3Device.h"
#include "GLES3Framebuffer.h"
#include "GLES3RenderPass.h"
#include "GLES3Texture.h"

namespace cc {
namespace gfx {

GLES3Framebuffer::GLES3Framebuffer() = default;

GLES3Framebuffer::~GLES3Framebuffer() {
    destroy();
}

void GLES3Framebuffer::doInit(const FramebufferInfo &info) {
    _gpuFBO                          = CC_NEW(GLES3GPUFramebuffer);
    _gpuFBO->gpuRenderPass           = static_cast<GLES3RenderPass *>(_renderPass)->gpuRenderPass();
    _gpuFBO->depthStencilMipmapLevel = info.depthStencilMipmapLevel;
    for (uint mipLevel : info.colorMipmapLevels) {
        _gpuFBO->colorMipmapLevels.push_back(mipLevel);
    }

    _gpuFBO->gpuColorTextures.resize(_colorTextures.size());
    for (size_t i = 0; i < _colorTextures.size(); ++i) {
        auto *colorTexture = static_cast<GLES3Texture *>(_colorTextures[i]);
        if (colorTexture) {
            _gpuFBO->gpuColorTextures[i] = colorTexture->gpuTexture();
        }
    }

    if (_depthStencilTexture) {
        _gpuFBO->gpuDepthStencilTexture = static_cast<GLES3Texture *>(_depthStencilTexture)->gpuTexture();
    }

    cmdFuncGLES3CreateFramebuffer(GLES3Device::getInstance(), _gpuFBO);
}

void GLES3Framebuffer::doDestroy() {
    if (_gpuFBO) {
        cmdFuncGLES3DestroyFramebuffer(GLES3Device::getInstance(), _gpuFBO);
        CC_DELETE(_gpuFBO);
        _gpuFBO = nullptr;
    }
}

} // namespace gfx
} // namespace cc
