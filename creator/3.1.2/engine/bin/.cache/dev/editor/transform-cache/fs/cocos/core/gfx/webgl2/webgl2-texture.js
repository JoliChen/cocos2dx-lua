"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2Texture = void 0;

var _define = require("../base/define.js");

var _texture = require("../base/texture.js");

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
class WebGL2Texture extends _texture.Texture {
  constructor(...args) {
    super(...args);
    this._gpuTexture = null;
  }

  get gpuTexture() {
    return this._gpuTexture;
  }

  initialize(info) {
    if ('texture' in info) {
      console.log('WebGL2 does not support texture view.');
      return false;
    }

    this._type = info.type;
    this._usage = info.usage;
    this._format = info.format;
    this._width = info.width;
    this._height = info.height;
    this._depth = info.depth;
    this._layerCount = info.layerCount;
    this._levelCount = info.levelCount;
    this._samples = info.samples;
    this._flags = info.flags;
    this._isPowerOf2 = (0, _define.IsPowerOf2)(this._width) && (0, _define.IsPowerOf2)(this._height);
    this._size = (0, _define.FormatSurfaceSize)(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;
    this._gpuTexture = {
      type: this._type,
      format: this._format,
      usage: this._usage,
      width: this._width,
      height: this._height,
      depth: this._depth,
      size: this._size,
      arrayLayer: this._layerCount,
      mipLevel: this._levelCount,
      samples: this._samples,
      flags: this._flags,
      isPowerOf2: this._isPowerOf2,
      glTarget: 0,
      glInternalFmt: 0,
      glFormat: 0,
      glType: 0,
      glUsage: 0,
      glTexture: null,
      glRenderbuffer: null,
      glWrapS: 0,
      glWrapT: 0,
      glMinFilter: 0,
      glMagFilter: 0
    };
    (0, _webgl2Commands.WebGL2CmdFuncCreateTexture)(this._device, this._gpuTexture);
    this._device.memoryStatus.textureSize += this._size;
    return true;
  }

  destroy() {
    if (this._gpuTexture) {
      (0, _webgl2Commands.WebGL2CmdFuncDestroyTexture)(this._device, this._gpuTexture);
      this._device.memoryStatus.textureSize -= this._size;
      this._gpuTexture = null;
    }
  }

  resize(width, height) {
    const oldSize = this._size;
    this._width = width;
    this._height = height;
    this._size = (0, _define.FormatSurfaceSize)(this._format, this.width, this.height, this.depth, this._levelCount) * this._layerCount;

    if (this._gpuTexture) {
      this._gpuTexture.width = width;
      this._gpuTexture.height = height;
      this._gpuTexture.size = this._size;
      (0, _webgl2Commands.WebGL2CmdFuncResizeTexture)(this._device, this._gpuTexture);
      this._device.memoryStatus.textureSize -= oldSize;
      this._device.memoryStatus.textureSize += this._size;
    }
  }

}

exports.WebGL2Texture = WebGL2Texture;