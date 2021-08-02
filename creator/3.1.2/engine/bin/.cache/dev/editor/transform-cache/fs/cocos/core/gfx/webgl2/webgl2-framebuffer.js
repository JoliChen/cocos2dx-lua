"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2Framebuffer = void 0;

var _framebuffer = require("../base/framebuffer.js");

var _webgl2Commands = require("./webgl2-commands.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */
class WebGL2Framebuffer extends _framebuffer.Framebuffer {
  constructor(...args) {
    super(...args);
    this._gpuFramebuffer = null;
  }

  get gpuFramebuffer() {
    return this._gpuFramebuffer;
  }

  initialize(info) {
    this._renderPass = info.renderPass;
    this._colorTextures = info.colorTextures || [];
    this._depthStencilTexture = info.depthStencilTexture || null;

    if (info.depthStencilMipmapLevel !== 0) {
      console.warn('The mipmap level of th texture image to be attached of depth stencil attachment should be 0. Convert to 0.');
    }

    for (let i = 0; i < info.colorMipmapLevels.length; ++i) {
      if (info.colorMipmapLevels[i] !== 0) {
        console.warn(`The mipmap level of th texture image to be attached of color attachment ${i} should be 0. Convert to 0.`);
      }
    }

    const gpuColorTextures = [];

    for (let i = 0; i < info.colorTextures.length; i++) {
      const colorTexture = info.colorTextures[i];

      if (colorTexture) {
        gpuColorTextures.push(colorTexture.gpuTexture);
      }
    }

    let gpuDepthStencilTexture = null;

    if (info.depthStencilTexture) {
      gpuDepthStencilTexture = info.depthStencilTexture.gpuTexture;
    }

    this._gpuFramebuffer = {
      gpuRenderPass: info.renderPass.gpuRenderPass,
      gpuColorTextures,
      gpuDepthStencilTexture,
      glFramebuffer: null
    };
    (0, _webgl2Commands.WebGL2CmdFuncCreateFramebuffer)(this._device, this._gpuFramebuffer);
    return true;
  }

  destroy() {
    if (this._gpuFramebuffer) {
      (0, _webgl2Commands.WebGL2CmdFuncDestroyFramebuffer)(this._device, this._gpuFramebuffer);
      this._gpuFramebuffer = null;
    }
  }

}

exports.WebGL2Framebuffer = WebGL2Framebuffer;