"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genSamplerHash = genSamplerHash;
exports.samplerLib = exports.defaultSamplerHash = exports.SamplerInfoIndex = void 0;

var _index = require("../../gfx/index.js");

var _globalExports = require("../../global-exports.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @hidden
 */
let SamplerInfoIndex;
exports.SamplerInfoIndex = SamplerInfoIndex;

(function (SamplerInfoIndex) {
  SamplerInfoIndex[SamplerInfoIndex["minFilter"] = 0] = "minFilter";
  SamplerInfoIndex[SamplerInfoIndex["magFilter"] = 1] = "magFilter";
  SamplerInfoIndex[SamplerInfoIndex["mipFilter"] = 2] = "mipFilter";
  SamplerInfoIndex[SamplerInfoIndex["addressU"] = 3] = "addressU";
  SamplerInfoIndex[SamplerInfoIndex["addressV"] = 4] = "addressV";
  SamplerInfoIndex[SamplerInfoIndex["addressW"] = 5] = "addressW";
  SamplerInfoIndex[SamplerInfoIndex["maxAnisotropy"] = 6] = "maxAnisotropy";
  SamplerInfoIndex[SamplerInfoIndex["cmpFunc"] = 7] = "cmpFunc";
  SamplerInfoIndex[SamplerInfoIndex["mipLODBias"] = 8] = "mipLODBias";
  SamplerInfoIndex[SamplerInfoIndex["total"] = 9] = "total";
})(SamplerInfoIndex || (exports.SamplerInfoIndex = SamplerInfoIndex = {}));

const defaultInfo = [_index.Filter.LINEAR, _index.Filter.LINEAR, _index.Filter.NONE, _index.Address.WRAP, _index.Address.WRAP, _index.Address.WRAP, 0, _index.ComparisonFunc.NEVER, 0];
const defaultSamplerHash = genSamplerHash(defaultInfo);
exports.defaultSamplerHash = defaultSamplerHash;
const borderColor = new _index.Color();

const _samplerInfo = new _index.SamplerInfo();

function genSamplerHash(info) {
  let value = 0;
  let hash = 0;

  for (let i = 0; i < defaultInfo.length; i++) {
    value = info[i] || defaultInfo[i];

    switch (i) {
      case SamplerInfoIndex.minFilter:
        hash |= value;
        break;

      case SamplerInfoIndex.magFilter:
        hash |= value << 2;
        break;

      case SamplerInfoIndex.mipFilter:
        hash |= value << 4;
        break;

      case SamplerInfoIndex.addressU:
        hash |= value << 6;
        break;

      case SamplerInfoIndex.addressV:
        hash |= value << 8;
        break;

      case SamplerInfoIndex.addressW:
        hash |= value << 10;
        break;

      case SamplerInfoIndex.maxAnisotropy:
        hash |= value << 12;
        break;

      case SamplerInfoIndex.cmpFunc:
        hash |= value << 16;
        break;

      case SamplerInfoIndex.mipLODBias:
        hash |= value << 28;
        break;

      default:
    }
  }

  return hash;
}
/**
 * @zh
 * 维护 sampler 资源实例的全局管理器。
 */


class SamplerLib {
  constructor() {
    this._cache = {};
  }

  /**
   * @zh
   * 获取指定属性的 sampler 资源。
   * @param device 渲染设备 GFX [[Device]]
   * @param info 目标 sampler 属性
   */
  getSampler(device, hash) {
    if (!hash) {
      hash = defaultSamplerHash;
    }

    const cache = this._cache[hash];

    if (cache) {
      return cache;
    }

    _samplerInfo.minFilter = hash & 3;
    _samplerInfo.magFilter = hash >> 2 & 3;
    _samplerInfo.mipFilter = hash >> 4 & 3;
    _samplerInfo.addressU = hash >> 6 & 3;
    _samplerInfo.addressV = hash >> 8 & 3;
    _samplerInfo.addressW = hash >> 10 & 3;
    _samplerInfo.maxAnisotropy = hash >> 12 & 15;
    _samplerInfo.cmpFunc = hash >> 16 & 15;
    _samplerInfo.mipLODBias = hash >> 28 & 15;
    _samplerInfo.borderColor = borderColor;
    const sampler = this._cache[hash] = device.createSampler(_samplerInfo);
    return sampler;
  }

}

const samplerLib = new SamplerLib();
exports.samplerLib = samplerLib;
_globalExports.legacyCC.samplerLib = samplerLib;