"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliced = void 0;

var _index = require("../../../core/math/index.js");

var _atlasManager = require("../../utils/dynamic-atlas/atlas-manager.js");

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
 * @module ui-assembler
 */
const vec3_temp = new _index.Vec3();
const matrix = new _index.Mat4();
/**
 * sliced 组装器
 * 可通过 `UI.sliced` 获取该组装器。
 */

const sliced = {
  useModel: false,

  createData(sprite) {
    const renderData = sprite.requestRenderData(); // 0-4 for local vertex
    // 5-20 for world vertex

    renderData.dataLength = 20;
    renderData.vertexCount = 16;
    renderData.indicesCount = 54;
    return renderData;
  },

  updateRenderData(sprite) {
    const frame = sprite.spriteFrame; // TODO: Material API design and export from editor could affect the material activation process
    // need to update the logic here
    // if (frame) {
    //     if (!frame._original && dynamicAtlasManager) {
    //         dynamicAtlasManager.insertSpriteFrame(frame);
    //     }
    //     if (sprite._material._texture !== frame._texture) {
    //         sprite._activateMaterial();
    //     }
    // }

    _atlasManager.dynamicAtlasManager.packToDynamicAtlas(sprite, frame);

    const renderData = sprite.renderData;

    if (renderData && frame) {
      const vertDirty = renderData.vertDirty;

      if (vertDirty) {
        this.updateVertexData(sprite);
        this.updateWorldVertexData(sprite);
      }
    }
  },

  updateVertexData(sprite) {
    const renderData = sprite.renderData;
    const dataList = renderData.data;
    const uiTrans = sprite.node._uiProps.uiTransformComp;
    const width = uiTrans.width;
    const height = uiTrans.height;
    const appX = uiTrans.anchorX * width;
    const appY = uiTrans.anchorY * height;
    const frame = sprite.spriteFrame;
    const leftWidth = frame.insetLeft;
    const rightWidth = frame.insetRight;
    const topHeight = frame.insetTop;
    const bottomHeight = frame.insetBottom;
    let sizableWidth = width - leftWidth - rightWidth;
    let sizableHeight = height - topHeight - bottomHeight;
    let xScale = width / (leftWidth + rightWidth);
    let yScale = height / (topHeight + bottomHeight);
    xScale = Number.isNaN(xScale) || xScale > 1 ? 1 : xScale;
    yScale = Number.isNaN(yScale) || yScale > 1 ? 1 : yScale;
    sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
    sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
    dataList[0].x = -appX;
    dataList[0].y = -appY;
    dataList[1].x = leftWidth * xScale - appX;
    dataList[1].y = bottomHeight * yScale - appY;
    dataList[2].x = dataList[1].x + sizableWidth;
    dataList[2].y = dataList[1].y + sizableHeight;
    dataList[3].x = width - appX;
    dataList[3].y = height - appY;
    renderData.vertDirty = false;
  },

  fillBuffers(sprite, renderer) {
    if (sprite.node.hasChangedFlags) {
      this.updateWorldVertexData(sprite);
    }

    let buffer = renderer.acquireBufferBatch();
    const renderData = sprite.renderData; // const node: Node = sprite.node;
    // const color: Color = sprite.color;

    const dataList = renderData.data;
    let vertexOffset = buffer.byteOffset >> 2;
    const vertexCount = renderData.vertexCount;
    let indicesOffset = buffer.indicesOffset;
    let vertexId = buffer.vertexOffset;
    const uvSliced = sprite.spriteFrame.uvSliced;
    const isRecreate = buffer.request(vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      vertexOffset = 0;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    const vBuf = buffer.vData; // const  uintbuf = buffer._uintVData,

    const iBuf = buffer.iData;

    for (let i = 4; i < 20; ++i) {
      const vert = dataList[i];
      const uvs = uvSliced[i - 4];
      vBuf[vertexOffset++] = vert.x;
      vBuf[vertexOffset++] = vert.y;
      vBuf[vertexOffset++] = vert.z;
      vBuf[vertexOffset++] = uvs.u;
      vBuf[vertexOffset++] = uvs.v;

      _index.Color.toArray(vBuf, dataList[i].color, vertexOffset);

      vertexOffset += 4; // uintbuf[vertexOffset++] = color;
    }

    for (let r = 0; r < 3; ++r) {
      for (let c = 0; c < 3; ++c) {
        const start = vertexId + r * 4 + c;
        iBuf[indicesOffset++] = start;
        iBuf[indicesOffset++] = start + 1;
        iBuf[indicesOffset++] = start + 4;
        iBuf[indicesOffset++] = start + 1;
        iBuf[indicesOffset++] = start + 5;
        iBuf[indicesOffset++] = start + 4;
      }
    }
  },

  updateWorldVertexData(sprite) {
    const node = sprite.node;
    const dataList = sprite.renderData.data;
    node.getWorldMatrix(matrix);

    for (let row = 0; row < 4; ++row) {
      const rowD = dataList[row];

      for (let col = 0; col < 4; ++col) {
        const colD = dataList[col];
        const world = dataList[4 + row * 4 + col];

        _index.Vec3.set(vec3_temp, colD.x, rowD.y, 0);

        _index.Vec3.transformMat4(world, vec3_temp, matrix);
      }
    }
  },

  updateColor(sprite) {
    const datalist = sprite.renderData.data;
    const color = sprite.color;
    const colorR = color.r;
    const colorG = color.g;
    const colorB = color.b;
    const colorA = sprite.node._uiProps.opacity * 255;

    for (let i = 4; i < 20; i++) {
      datalist[i].color.r = colorR;
      datalist[i].color.g = colorG;
      datalist[i].color.b = colorB;
      datalist[i].color.a = colorA;
    }
  }

};
exports.sliced = sliced;