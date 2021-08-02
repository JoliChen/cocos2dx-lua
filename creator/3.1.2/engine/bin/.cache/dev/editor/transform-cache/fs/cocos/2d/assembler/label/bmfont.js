"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bmfont = void 0;

var js = _interopRequireWildcard(require("../../../core/utils/js.js"));

var _index = require("../../../core/math/index.js");

var _utils = require("../utils.js");

var _bmfontUtils = require("./bmfontUtils.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @module ui-assembler
 */
const tempColor = new _index.Color(255, 255, 255, 255);
/**
 * bmfont 组装器
 * 可通过 `UI.bmfont` 获取该组装器。
 */

const bmfont = {
  createData(comp) {
    return comp.requestRenderData();
  },

  fillBuffers(comp, renderer) {
    const node = comp.node;

    comp._setCacheAlpha(node._uiProps.opacity);

    tempColor.set(comp.color);
    tempColor.a = node._uiProps.opacity * 255;
    (0, _utils.fillMeshVertices3D)(node, renderer, comp.renderData, tempColor);
  },

  appendQuad(comp, spriteFrame, rect, rotated, x, y, scale) {
    const renderData = comp.renderData;

    if (!renderData) {
      return;
    }

    const dataOffset = renderData.dataLength;
    renderData.dataLength += 4;
    renderData.vertexCount = renderData.dataLength;
    renderData.indicesCount = renderData.dataLength / 2 * 3;
    const dataList = renderData.data;
    const texW = spriteFrame.width;
    const texH = spriteFrame.height;
    const rectWidth = rect.width;
    const rectHeight = rect.height;
    let l = 0;
    let b = 0;
    let t = 0;
    let r = 0;

    if (!rotated) {
      l = rect.x / texW;
      r = (rect.x + rectWidth) / texW;
      b = (rect.y + rectHeight) / texH;
      t = rect.y / texH;
      dataList[dataOffset].u = l;
      dataList[dataOffset].v = b;
      dataList[dataOffset + 1].u = r;
      dataList[dataOffset + 1].v = b;
      dataList[dataOffset + 2].u = l;
      dataList[dataOffset + 2].v = t;
      dataList[dataOffset + 3].u = r;
      dataList[dataOffset + 3].v = t;
    } else {
      l = rect.x / texW;
      r = (rect.x + rectHeight) / texW;
      b = (rect.y + rectWidth) / texH;
      t = rect.y / texH;
      dataList[dataOffset].u = l;
      dataList[dataOffset].v = t;
      dataList[dataOffset + 1].u = l;
      dataList[dataOffset + 1].v = b;
      dataList[dataOffset + 2].u = r;
      dataList[dataOffset + 2].v = t;
      dataList[dataOffset + 3].u = r;
      dataList[dataOffset + 3].v = b;
    }

    dataList[dataOffset].x = x;
    dataList[dataOffset].y = y - rectHeight * scale;
    dataList[dataOffset + 1].x = x + rectWidth * scale;
    dataList[dataOffset + 1].y = y - rectHeight * scale;
    dataList[dataOffset + 2].x = x;
    dataList[dataOffset + 2].y = y;
    dataList[dataOffset + 3].x = x + rectWidth * scale;
    dataList[dataOffset + 3].y = y;
  }

};
exports.bmfont = bmfont;
js.addon(bmfont, _bmfontUtils.bmfontUtils);