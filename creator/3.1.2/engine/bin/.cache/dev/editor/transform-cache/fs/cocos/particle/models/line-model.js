"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineModel = void 0;

var _renderingSubMesh = require("../../core/assets/rendering-sub-mesh.js");

var _index = require("../../core/gfx/index.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/renderer/index.js");

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
const _vertex_attrs = [new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F), // xyz:position
new _index.Attribute(_index.AttributeName.ATTR_TEX_COORD, _index.Format.RGBA32F), // x:index y:size zw:texcoord
new _index.Attribute(_index.AttributeName.ATTR_TEX_COORD1, _index.Format.RGB32F), // xyz:velocity
new _index.Attribute(_index.AttributeName.ATTR_COLOR, _index.Format.RGBA8, true)];

const _temp_v1 = new _index2.Vec3();

const _temp_v2 = new _index2.Vec3();

class LineModel extends _index3.scene.Model {
  constructor() {
    super();
    this._capacity = void 0;
    this._vertSize = 0;
    this._vBuffer = null;
    this._vertAttrsFloatCount = 0;
    this._vdataF32 = null;
    this._vdataUint32 = null;
    this._iaInfo = void 0;
    this._iaInfoBuffer = void 0;
    this._subMeshData = null;
    this._vertCount = 0;
    this._indexCount = 0;
    this._material = null;
    this.type = _index3.scene.ModelType.LINE;
    this._capacity = 100;
    this._iaInfo = new _index.IndirectBuffer([new _index.DrawInfo()]);
    this._iaInfoBuffer = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.INDIRECT, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _index.DRAW_INFO_SIZE, _index.DRAW_INFO_SIZE));
  }

  setCapacity(capacity) {
    this._capacity = capacity;
    this.createBuffer();
  }

  createBuffer() {
    this._vertSize = 0;

    for (const a of _vertex_attrs) {
      a.offset = this._vertSize;
      this._vertSize += _index.FormatInfos[a.format].size;
    }

    this._vertAttrsFloatCount = this._vertSize / 4; // number of float

    this._vBuffer = this.createSubMeshData();
    this._vdataF32 = new Float32Array(this._vBuffer);
    this._vdataUint32 = new Uint32Array(this._vBuffer);
  }

  updateMaterial(mat) {
    this._material = mat;
    super.setSubModelMaterial(0, mat);
  }

  createSubMeshData() {
    if (this._subMeshData) {
      this.destroySubMeshData();
    }

    this._vertCount = 2;
    this._indexCount = 6;

    const vertexBuffer = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, this._vertSize * this._capacity * this._vertCount, this._vertSize));

    const vBuffer = new ArrayBuffer(this._vertSize * this._capacity * this._vertCount);
    vertexBuffer.update(vBuffer);
    const indices = new Uint16Array((this._capacity - 1) * this._indexCount);
    let dst = 0;

    for (let i = 0; i < this._capacity - 1; ++i) {
      const baseIdx = 2 * i;
      indices[dst++] = baseIdx;
      indices[dst++] = baseIdx + 1;
      indices[dst++] = baseIdx + 2;
      indices[dst++] = baseIdx + 3;
      indices[dst++] = baseIdx + 2;
      indices[dst++] = baseIdx + 1;
    }

    const indexBuffer = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.INDEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, (this._capacity - 1) * this._indexCount * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));

    indexBuffer.update(indices);
    this._iaInfo.drawInfos[0].vertexCount = this._capacity * this._vertCount;
    this._iaInfo.drawInfos[0].indexCount = (this._capacity - 1) * this._indexCount;

    this._iaInfoBuffer.update(this._iaInfo);

    this._subMeshData = new _renderingSubMesh.RenderingSubMesh([vertexBuffer], _vertex_attrs, _index.PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
    this.initSubModel(0, this._subMeshData, this._material);
    return vBuffer;
  }

  addLineVertexData(positions, width, color) {
    if (positions.length > 1) {
      let offset = 0;

      _index2.Vec3.subtract(_temp_v1, positions[1], positions[0]);

      this._vdataF32[offset++] = positions[0].x;
      this._vdataF32[offset++] = positions[0].y;
      this._vdataF32[offset++] = positions[0].z;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = width.evaluate(0, 1);
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(0, 1)._val;
      this._vdataF32[offset++] = positions[0].x;
      this._vdataF32[offset++] = positions[0].y;
      this._vdataF32[offset++] = positions[0].z;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = width.evaluate(0, 1);
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(0, 1)._val;

      for (let i = 1; i < positions.length - 1; i++) {
        _index2.Vec3.subtract(_temp_v1, positions[i - 1], positions[i]);

        _index2.Vec3.subtract(_temp_v2, positions[i + 1], positions[i]);

        _index2.Vec3.subtract(_temp_v2, _temp_v2, _temp_v1);

        const seg = i / positions.length;
        this._vdataF32[offset++] = positions[i].x;
        this._vdataF32[offset++] = positions[i].y;
        this._vdataF32[offset++] = positions[i].z;
        this._vdataF32[offset++] = 0;
        this._vdataF32[offset++] = width.evaluate(seg, 1);
        this._vdataF32[offset++] = seg;
        this._vdataF32[offset++] = 0;
        this._vdataF32[offset++] = _temp_v2.x;
        this._vdataF32[offset++] = _temp_v2.y;
        this._vdataF32[offset++] = _temp_v2.z;
        this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
        this._vdataF32[offset++] = positions[i].x;
        this._vdataF32[offset++] = positions[i].y;
        this._vdataF32[offset++] = positions[i].z;
        this._vdataF32[offset++] = 1;
        this._vdataF32[offset++] = width.evaluate(seg, 1);
        this._vdataF32[offset++] = seg;
        this._vdataF32[offset++] = 1;
        this._vdataF32[offset++] = _temp_v2.x;
        this._vdataF32[offset++] = _temp_v2.y;
        this._vdataF32[offset++] = _temp_v2.z;
        this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
      }

      _index2.Vec3.subtract(_temp_v1, positions[positions.length - 1], positions[positions.length - 2]);

      this._vdataF32[offset++] = positions[positions.length - 1].x;
      this._vdataF32[offset++] = positions[positions.length - 1].y;
      this._vdataF32[offset++] = positions[positions.length - 1].z;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = width.evaluate(1, 1);
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = 0;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
      this._vdataF32[offset++] = positions[positions.length - 1].x;
      this._vdataF32[offset++] = positions[positions.length - 1].y;
      this._vdataF32[offset++] = positions[positions.length - 1].z;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = width.evaluate(1, 1);
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = 1;
      this._vdataF32[offset++] = _temp_v1.x;
      this._vdataF32[offset++] = _temp_v1.y;
      this._vdataF32[offset++] = _temp_v1.z;
      this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
    }

    this.updateIA(Math.max(0, positions.length - 1));
  }

  updateIA(count) {
    const ia = this._subModels[0].inputAssembler;
    ia.vertexBuffers[0].update(this._vdataF32);
    this._iaInfo.drawInfos[0].firstIndex = 0;
    this._iaInfo.drawInfos[0].indexCount = this._indexCount * count;

    this._iaInfoBuffer.update(this._iaInfo);
  }

  destroySubMeshData() {
    if (this._subMeshData) {
      this._subMeshData.destroy();

      this._subMeshData = null;
    }
  }

}

exports.LineModel = LineModel;