System.register("q-bundled:///fs/cocos/2d/assembler/utils.js", ["../../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Color, Mat4, Vec3, vec3_temp, _worldMatrix;

  function fillVertices3D(node, renderer, renderData, color) {
    var dataList = renderData.data;
    var buffer = renderer.acquireBufferBatch();
    var vertexOffset = buffer.byteOffset >> 2;
    var vertexCount = renderData.vertexCount;
    var indicesOffset = buffer.indicesOffset;
    var vertexId = buffer.vertexOffset;
    var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      vertexCount = 0;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    var vBuf = buffer.vData;
    node.getWorldMatrix(_worldMatrix);

    for (var i = 0; i < vertexCount; i++) {
      var vert = dataList[i];
      Vec3.set(vec3_temp, vert.x, vert.y, 0);
      Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
      vBuf[vertexOffset++] = vec3_temp.x;
      vBuf[vertexOffset++] = vec3_temp.y;
      vBuf[vertexOffset++] = vec3_temp.z;
      vBuf[vertexOffset++] = vert.u;
      vBuf[vertexOffset++] = vert.v;
      Color.toArray(vBuf, color, vertexOffset);
      vertexOffset += 4;
    } // buffer data may be realloc, need get reference after request.


    var iBuf = buffer.iData;

    for (var _i = 0; _i < renderData.dataLength; _i++) {
      iBuf[indicesOffset + _i] = vertexId + _i;
    }
  }

  function fillMeshVertices3D(node, renderer, renderData, color) {
    var dataList = renderData.data;
    var buffer = renderer.acquireBufferBatch();
    var vertexOffset = buffer.byteOffset >> 2;
    var vertexCount = renderData.vertexCount;
    var indicesOffset = buffer.indicesOffset;
    var vertexId = buffer.vertexOffset;
    var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      vertexCount = 0;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    var vBuf = buffer.vData;
    var iBuf = buffer.iData;
    node.getWorldMatrix(_worldMatrix);

    for (var i = 0; i < vertexCount; i++) {
      var vert = dataList[i];
      Vec3.set(vec3_temp, vert.x, vert.y, 0);
      Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
      vBuf[vertexOffset++] = vec3_temp.x;
      vBuf[vertexOffset++] = vec3_temp.y;
      vBuf[vertexOffset++] = vec3_temp.z;
      vBuf[vertexOffset++] = vert.u;
      vBuf[vertexOffset++] = vert.v;
      Color.toArray(vBuf, color, vertexOffset);
      vertexOffset += 4;
    } // fill index data


    for (var _i2 = 0, count = vertexCount / 4; _i2 < count; _i2++) {
      var start = vertexId + _i2 * 4;
      iBuf[indicesOffset++] = start;
      iBuf[indicesOffset++] = start + 1;
      iBuf[indicesOffset++] = start + 2;
      iBuf[indicesOffset++] = start + 1;
      iBuf[indicesOffset++] = start + 3;
      iBuf[indicesOffset++] = start + 2;
    }
  }

  function fillVerticesWithoutCalc3D(node, renderer, renderData, color) {
    var dataList = renderData.data;
    var buffer = renderer.acquireBufferBatch();
    var vertexOffset = buffer.byteOffset >> 2; // buffer

    var vertexCount = renderData.vertexCount;
    var indicesOffset = buffer.indicesOffset;
    var vertexId = buffer.vertexOffset;
    var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      vertexCount = 0;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    var vBuf = buffer.vData;

    for (var i = 0; i < vertexCount; i++) {
      var vert = dataList[i];
      vBuf[vertexOffset++] = vert.x;
      vBuf[vertexOffset++] = vert.y;
      vBuf[vertexOffset++] = vert.z;
      vBuf[vertexOffset++] = vert.u;
      vBuf[vertexOffset++] = vert.v;
      Color.toArray(vBuf, color, vertexOffset);
      vertexOffset += 4;
    } // buffer data may be realloc, need get reference after request.


    var iBuf = buffer.iData;
    iBuf[indicesOffset++] = vertexId;
    iBuf[indicesOffset++] = vertexId + 1;
    iBuf[indicesOffset++] = vertexId + 2;
    iBuf[indicesOffset++] = vertexId + 1;
    iBuf[indicesOffset++] = vertexId + 3;
    iBuf[indicesOffset++] = vertexId + 2;
  }

  _export({
    fillVertices3D: fillVertices3D,
    fillMeshVertices3D: fillMeshVertices3D,
    fillVerticesWithoutCalc3D: fillVerticesWithoutCalc3D
  });

  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Mat4 = _coreMathIndexJs.Mat4;
      Vec3 = _coreMathIndexJs.Vec3;
    }],
    execute: function () {
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
      vec3_temp = new Vec3();
      _worldMatrix = new Mat4();
    }
  };
});