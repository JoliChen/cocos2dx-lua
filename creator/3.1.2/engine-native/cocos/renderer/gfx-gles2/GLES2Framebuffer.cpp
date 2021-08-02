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

#include "GLES2Commands.h"
#include "GLES2Device.h"
#include "GLES2Framebuffer.h"
#include "GLES2RenderPass.h"
#include "GLES2Texture.h"

namespace cc {
namespace gfx {

GLES2Framebuffer::GLES2Framebuffer() = default;

GLES2Framebuffer::~GLES2Framebuffer() {
    destroy();
}

void GLES2Framebuffer::doInit(const FramebufferInfo &info) {
    if (info.depthStencilMipmapLevel != 0) {
        CC_LOG_WARNING("Mipmap level of depth stencil attachment should be 0 in GLES2. Convert to 0.");
    }
    if (!info.colorMipmapLevels.empty()) {
        int i = 0;
        for (const auto mipmapLevel : info.colorMipmapLevels) {
            if (mipmapLevel != 0) {
                CC_LOG_WARNING("Mipmap level of color attachment %d should be 0 in GLES2. Convert to 0.", i);
            }
            ++i;
        }
    }

    _gpuFBO                = CC_NEW(GLES2GPUFramebuffer);
    _gpuFBO->gpuRenderPass = static_cast<GLES2RenderPass *>(_renderPass)->gpuRenderPass();

    _gpuFBO->gpuColorTextures.resize(_colorTextures.size());
    for (size_t i = 0; i < _colorTextures.size(); ++i) {
        auto *colorTexture = static_cast<GLES2Texture *>(_colorTextures[i]);
        if (colorTexture) {
            _gpuFBO->gpuColorTextures[i] = colorTexture->gpuTexture();
        }
    }

    if (_depthStencilTexture) {
        _gpuFBO->gpuDepthStencilTexture = static_cast<GLES2Texture *>(_depthStencilTexture)->gpuTexture();
    }

    cmdFuncGLES2CreateFramebuffer(GLES2Device::getInstance(), _gpuFBO);
}

void GLES2Framebuffer::doDestroy() {
    if (_gpuFBO) {
        cmdFuncGLES2DestroyFramebuffer(GLES2Device::getInstance(), _gpuFBO);
        CC_DELETE(_gpuFBO);
        _gpuFBO = nullptr;
    }
}

} // namespace gfx
} // namespace cc
