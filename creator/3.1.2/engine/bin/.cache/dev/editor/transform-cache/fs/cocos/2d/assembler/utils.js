"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillVertices3D = fillVertices3D;
exports.fillMeshVertices3D = fillMeshVertices3D;
exports.fillVerticesWithoutCalc3D = fillVerticesWithoutCalc3D;

var _index = require("../../core/math/index.js");

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
 * @hidden
 */
const vec3_temp = new _index.Vec3();

const _worldMatrix = new _index.Mat4();

function fillVertices3D(node, renderer, renderData, color) {
  const dataList = renderData.data;
  let buffer = renderer.acquireBufferBatch();
  let vertexOffset = buffer.byteOffset >> 2;
  let vertexCount = renderData.vertexCount;
  let indicesOffset = buffer.indicesOffset;
  let vertexId = buffer.vertexOffset;
  const isRecreate = buffer.request(vertexCount, renderData.indicesCount);

  if (!isRecreate) {
    buffer = renderer.currBufferBatch;
    vertexCount = 0;
    indicesOffset = 0;
    vertexId = 0;
  } // buffer data may be realloc, need get reference after request.


  const vBuf = buffer.vData;
  node.getWorldMatrix(_worldMatrix);

  for (let i = 0; i < vertexCount; i++) {
    const vert = dataList[i];

    _index.Vec3.set(vec3_temp, vert.x, vert.y, 0);

    _index.Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);

    vBuf[vertexOffset++] = vec3_temp.x;
    vBuf[vertexOffset++] = vec3_temp.y;
    vBuf[vertexOffset++] = vec3_temp.z;
    vBuf[vertexOffset++] = vert.u;
    vBuf[vertexOffset++] = vert.v;

    _index.Color.toArray(vBuf, color, vertexOffset);

    vertexOffset += 4;
  } // buffer data may be realloc, need get reference after request.


  const iBuf = buffer.iData;

  for (let i = 0; i < renderData.dataLength; i++) {
    iBuf[indicesOffset + i] = vertexId + i;
  }
}

function fillMeshVertices3D(node, renderer, renderData, color) {
  const dataList = renderData.data;
  let buffer = renderer.acquireBufferBatch();
  let vertexOffset = buffer.byteOffset >> 2;
  let vertexCount = renderData.vertexCount;
  let indicesOffset = buffer.indicesOffset;
  let vertexId = buffer.vertexOffset;
  const isRecreate = buffer.request(vertexCount, renderData.indicesCount);

  if (!isRecreate) {
    buffer = renderer.currBufferBatch;
    vertexCount = 0;
    indicesOffset = 0;
    vertexId = 0;
  } // buffer data may be realloc, need get reference after request.


  const vBuf = buffer.vData;
  const iBuf = buffer.iData;
  node.getWorldMatrix(_worldMatrix);

  for (let i = 0; i < vertexCount; i++) {
    const vert = dataList[i];

    _index.Vec3.set(vec3_temp, vert.x, vert.y, 0);

    _index.Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);

    vBuf[vertexOffset++] = vec3_temp.x;
    vBuf[vertexOffset++] = vec3_temp.y;
    vBuf[vertexOffset++] = vec3_temp.z;
    vBuf[vertexOffset++] = vert.u;
    vBuf[vertexOffset++] = vert.v;

    _index.Color.toArray(vBuf, color, vertexOffset);

    vertexOffset += 4;
  } // fill index data


  for (let i = 0, count = vertexCount / 4; i < count; i++) {
    const start = vertexId + i * 4;
    iBuf[indicesOffset++] = start;
    iBuf[indicesOffset++] = start + 1;
    iBuf[indicesOffset++] = start + 2;
    iBuf[indicesOffset++] = start + 1;
    iBuf[indicesOffset++] = start + 3;
    iBuf[indicesOffset++] = start + 2;
  }
}

function fillVerticesWithoutCalc3D(node, renderer, renderData, color) {
  const dataList = renderData.data;
  let buffer = renderer.acquireBufferBatch();
  let vertexOffset = buffer.byteOffset >> 2; // buffer

  let vertexCount = renderData.vertexCount;
  let indicesOffset = buffer.indicesOffset;
  let vertexId = buffer.vertexOffset;
  const isRecreate = buffer.request(vertexCount, renderData.indicesCount);

  if (!isRecreate) {
    buffer = renderer.currBufferBatch;
    vertexCount = 0;
    indicesOffset = 0;
    vertexId = 0;
  } // buffer data may be realloc, need get reference after request.


  const vBuf = buffer.vData;

  for (let i = 0; i < vertexCount; i++) {
    const vert = dataList[i];
    vBuf[vertexOffset++] = vert.x;
    vBuf[vertexOffset++] = vert.y;
    vBuf[vertexOffset++] = vert.z;
    vBuf[vertexOffset++] = vert.u;
    vBuf[vertexOffset++] = vert.v;

    _index.Color.toArray(vBuf, color, vertexOffset);

    vertexOffset += 4;
  } // buffer data may be realloc, need get reference after request.


  const iBuf = buffer.iData;
  iBuf[indicesOffset++] = vertexId;
  iBuf[indicesOffset++] = vertexId + 1;
  iBuf[indicesOffset++] = vertexId + 2;
  iBuf[indicesOffset++] = vertexId + 1;
  iBuf[indicesOffset++] = vertexId + 3;
  iBuf[indicesOffset++] = vertexId + 2;
}