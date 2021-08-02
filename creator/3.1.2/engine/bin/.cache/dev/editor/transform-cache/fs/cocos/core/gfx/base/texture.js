"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = void 0;

var _define = require("./define.js");

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

/**
 * @packageDocumentation
 * @module gfx
 */

/**
 * @en GFX texture.
 * @zh GFX 纹理。
 */
class Texture extends _define.Obj {
  /**
   * @en Get texture type.
   * @zh 纹理类型。
   */
  get type() {
    return this._type;
  }
  /**
   * @en Get texture usage.
   * @zh 纹理使用方式。
   */


  get usage() {
    return this._usage;
  }
  /**
   * @en Get texture format.
   * @zh 纹理格式。
   */


  get format() {
    return this._format;
  }
  /**
   * @en Get texture width.
   * @zh 纹理宽度。
   */


  get width() {
    return this._width;
  }
  /**
   * @en Get texture height.
   * @zh 纹理高度。
   */


  get height() {
    return this._height;
  }
  /**
   * @en Get texture depth.
   * @zh 纹理深度。
   */


  get depth() {
    return this._depth;
  }
  /**
   * @en Get texture array layer.
   * @zh 纹理数组层数。
   */


  get layerCount() {
    return this._layerCount;
  }
  /**
   * @en Get texture mip level.
   * @zh 纹理 mip 层级数。
   */


  get levelCount() {
    return this._levelCount;
  }
  /**
   * @en Get texture samples.
   * @zh 纹理采样数。
   */


  get samples() {
    return this._samples;
  }
  /**
   * @en Get texture flags.
   * @zh 纹理标识位。
   */


  get flags() {
    return this._flags;
  }
  /**
   * @en Get texture size.
   * @zh 纹理大小。
   */


  get size() {
    return this._size;
  }

  constructor(device) {
    super(_define.ObjectType.TEXTURE);
    this._device = void 0;
    this._type = _define.TextureType.TEX2D;
    this._usage = _define.TextureUsageBit.NONE;
    this._format = _define.Format.UNKNOWN;
    this._width = 0;
    this._height = 0;
    this._depth = 1;
    this._layerCount = 1;
    this._levelCount = 1;
    this._samples = _define.SampleCount.X1;
    this._flags = _define.TextureFlagBit.NONE;
    this._isPowerOf2 = false;
    this._size = 0;
    this._device = device;
  }

}

exports.Texture = Texture;