"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentPerVertex = getComponentPerVertex;
exports.getAttributeStride = getAttributeStride;
exports.vfmtPosUvTwoColor = exports.vfmtPosUvColor = exports.vfmtPosColor = exports.vfmt = void 0;

var _index = require("../../core/gfx/index.js");

var _globalExports = require("../../core/global-exports.js");

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
*/

/**
 * @packageDocumentation
 * @hidden
 */
const vfmt = [new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F)];
exports.vfmt = vfmt;
const vfmtPosColor = [new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F), new _index.Attribute(_index.AttributeName.ATTR_COLOR, _index.Format.RGBA32F)];
exports.vfmtPosColor = vfmtPosColor;
const vfmtPosUvColor = [new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F), new _index.Attribute(_index.AttributeName.ATTR_TEX_COORD, _index.Format.RG32F), new _index.Attribute(_index.AttributeName.ATTR_COLOR, _index.Format.RGBA32F)];
exports.vfmtPosUvColor = vfmtPosUvColor;
const vfmtPosUvTwoColor = [new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F), new _index.Attribute(_index.AttributeName.ATTR_TEX_COORD, _index.Format.RG32F), new _index.Attribute(_index.AttributeName.ATTR_COLOR, _index.Format.RGBA32F), new _index.Attribute(_index.AttributeName.ATTR_COLOR2, _index.Format.RGBA32F)];
exports.vfmtPosUvTwoColor = vfmtPosUvTwoColor;

function getComponentPerVertex(attrs) {
  let count = 0;

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const info = _index.FormatInfos[attr.format];
    count += info.count;
  }

  return count;
}

function getAttributeStride(attrs) {
  let count = 0;

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const info = _index.FormatInfos[attr.format];
    count += info.size;
  }

  return count;
}

_globalExports.legacyCC.internal.vfmtPosUvColor = vfmtPosUvColor;
_globalExports.legacyCC.internal.vfmtPosUvTwoColor = vfmtPosUvTwoColor;