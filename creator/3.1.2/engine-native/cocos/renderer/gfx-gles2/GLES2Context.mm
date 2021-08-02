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
#include "GLES2Context.h"
#include "gles2w.h"

#if TARGET_OS_OSX
#import <QuartzCore/CAOpenGLLayer.h>
#else
#import <UIKit/UIScreen.h>
#endif

namespace cc {
namespace gfx {

#if (CC_PLATFORM == CC_PLATFORM_MAC_IOS)

void GLES2Context::doInit(const ContextInfo &info) {

    _vsyncMode = info.vsyncMode;
    _windowHandle = info.windowHandle;

    //////////////////////////////////////////////////////////////////////////

    if (!info.sharedCtx) {
        _isPrimaryContex = true;
        _windowHandle = info.windowHandle;

        CAEAGLLayer* eaglLayer = (CAEAGLLayer*)( ((UIView*)(_windowHandle)).layer);
        eaglLayer.opaque = TRUE;

        EAGLContext* eagl_context = [[EAGLContext alloc]initWithAPI:kEAGLRenderingAPIOpenGLES2];
        if (!eagl_context) {
            CC_LOG_ERROR("Create EAGL context failed.");
            return false;
        }

        _eaglContext = (intptr_t)eagl_context;
        _eaglSharedContext = (intptr_t)eagl_context;

        if (!gles2wInit())
            return false;
    } else {
        GLES2Context* sharedCtx = (GLES2Context*)info.sharedCtx;
        _majorVersion = sharedCtx->_majorVersion;
        _defaultFBO = sharedCtx->_defaultFBO;
        _defaultColorBuffer = sharedCtx->_defaultColorBuffer;
        _defaultDepthStencilBuffer = sharedCtx->_defaultDepthStencilBuffer;

        EAGLContext* eagl_shared_context = (EAGLContext*)sharedCtx->eagl_shared_ctx();
        EAGLContext* eagl_context = [[EAGLContext alloc] initWithAPI: [eagl_shared_context API] sharegroup: [eagl_shared_context sharegroup]];
        if (!eagl_context) {
            CC_LOG_ERROR("Create EGL context with share context [0x%p] failed.", eagl_shared_context);
            return false;
        }

        _eaglContext = (intptr_t)eagl_context;
        _eaglSharedContext = (intptr_t)eagl_shared_context;
    }

    _colorFmt = Format::RGBA8;
    _depthStencilFmt = Format::D24S8;

    return true;
}

bool GLES2Context::createCustomFrameBuffer() {
    if (_defaultFBO) {
        glBindFramebuffer(GL_FRAMEBUFFER, _defaultFBO);
        glBindRenderbuffer(GL_RENDERBUFFER, _defaultColorBuffer);
        return true;
    }

    glGenFramebuffers(1, &_defaultFBO);
    if (0 == _defaultFBO) {
        CC_LOG_ERROR("Can not create default frame buffer");
        return false;
    }
    glBindFramebuffer(GL_FRAMEBUFFER, _defaultFBO);

    glGenRenderbuffers(1, &_defaultColorBuffer);
    if (0 == _defaultColorBuffer) {
        CC_LOG_ERROR("Can not create default color buffer");
        return false;
    }
    glBindRenderbuffer(GL_RENDERBUFFER, _defaultColorBuffer);

    CAEAGLLayer* eaglLayer = (CAEAGLLayer*)( ((UIView*)(_windowHandle)).layer);

    //get the storage from iOS so it can be displayed in the view
    if (! [(EAGLContext*)_eaglContext renderbufferStorage:GL_RENDERBUFFER
                                              fromDrawable:eaglLayer]) {
        CC_LOG_ERROR("Attaches EAGLDrawable as storage for the OpenGL ES renderbuffer object failed.");
        glBindRenderbuffer(GL_RENDERBUFFER, 0);
        glDeleteRenderbuffers(1, &_defaultColorBuffer);
        return false;
    }

    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, _defaultColorBuffer);

    //get the frame's width and height
    GLint framebufferWidth = 0, framebufferHeight = 0;
    glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_WIDTH, &framebufferWidth);
    glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_HEIGHT, &framebufferHeight);
    glGenRenderbuffers(1, &_defaultDepthStencilBuffer);
    if (_defaultDepthStencilBuffer == 0)
    {
        // Application can run without depth/stencil buffer, so don't return false here.
        CC_LOG_ERROR("Can not create default depth/stencil buffer");
    }
    glBindRenderbuffer(GL_RENDERBUFFER, _defaultDepthStencilBuffer);
    glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH24_STENCIL8_OES, framebufferWidth, framebufferHeight);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, _defaultDepthStencilBuffer);
    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_STENCIL_ATTACHMENT, GL_RENDERBUFFER, _defaultDepthStencilBuffer);

    GLenum status = glCheckFramebufferStatus(GL_FRAMEBUFFER);
    if (status != GL_FRAMEBUFFER_COMPLETE)
    {
        switch (status)
        {
            case GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            {
                CC_LOG_ERROR("glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                break;
            }
            case GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            {
                CC_LOG_ERROR("glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                break;
            }
            case GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            {
                CC_LOG_ERROR("glCheckFramebufferStatus() - FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                break;
            }
            case GL_FRAMEBUFFER_UNSUPPORTED:
            {
                CC_LOG_ERROR("glCheckFramebufferStatus() - FRAMEBUFFER_UNSUPPORTED");
                break;
            }
            default:;
        }
        destroyCustomFrameBuffer();
        return false;
    }

    glBindRenderbuffer(GL_RENDERBUFFER, _defaultColorBuffer);
    return true;
}

void GLES2Context::destroyCustomFrameBuffer()
{
    if (_defaultColorBuffer)
    {
        glDeleteRenderbuffers(1, &_defaultColorBuffer);
        _defaultColorBuffer = 0;
    }
    if (_defaultDepthStencilBuffer)
    {
        glDeleteRenderbuffers(1, &_defaultDepthStencilBuffer);
        _defaultDepthStencilBuffer = 0;
    }

    if (_defaultFBO)
    {
        glDeleteFramebuffers(1, &_defaultFBO);
        _defaultFBO = 0;
    }
}

void GLES2Context::doDestroy() {
    destroyCustomFrameBuffer();

  if (_eaglContext) {
    [(EAGLContext*)_eaglContext release];
  }

  _isPrimaryContex = false;
  _windowHandle = 0;
  _vsyncMode = VsyncMode::OFF;
  _isInitialized = false;
}

void GLES2Context::present() {
  if (! [(EAGLContext*)_eaglContext presentRenderbuffer:GL_RENDERBUFFER] )
  {
      CC_LOG_ERROR("Failed to present content.");
  }
}

bool GLES2Context::MakeCurrentImpl(bool bound) {
    if (!bound) return [EAGLContext setCurrentContext: nil];
    return [EAGLContext setCurrentContext: (EAGLContext*)_eaglContext] && createCustomFrameBuffer();
}

#endif

} // namespace gfx
} // namespace cc
