"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuadRenderData = exports.MeshRenderData = exports.RenderData = exports.BaseRenderData = void 0;

var _index = require("../../core/math/index.js");

var _index2 = require("../../core/memop/index.js");

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
class BaseRenderData {
  constructor() {
    this.material = null;
    this.vertexCount = 0;
    this.indicesCount = 0;
  }

}

exports.BaseRenderData = BaseRenderData;

class RenderData extends BaseRenderData {
  constructor(...args) {
    super(...args);
    this.vData = null;
    this.uvDirty = true;
    this.vertDirty = true;
    this._data = [];
    this._indices = [];
    this._pivotX = 0;
    this._pivotY = 0;
    this._width = 0;
    this._height = 0;
  }

  get dataLength() {
    return this._data.length;
  }

  set dataLength(length) {
    const data = this._data;

    if (data.length !== length) {
      // // Free extra data
      const value = data.length;
      let i = 0;

      for (i = length; i < value; i++) {
        _dataPool.free(data[i]);
      }

      for (i = value; i < length; i++) {
        data[i] = _dataPool.alloc();
      }

      data.length = length;
    }
  }

  get data() {
    return this._data;
  }

  static add() {
    return _pool.add();
  }

  static remove(data) {
    const idx = _pool.data.indexOf(data);

    if (idx === -1) {
      return;
    }

    _pool.data[idx].clear();

    _pool.removeAt(idx);
  }

  updateSizeNPivot(width, height, pivotX, pivotY) {
    if (width !== this._width || height !== this._height || pivotX !== this._pivotX || pivotY !== this._pivotY) {
      this._width = width;
      this._height = height;
      this._pivotX = pivotX;
      this._pivotY = pivotY;
      this.vertDirty = true;
    }
  }

  clear() {
    this._data.length = 0;
    this._indices.length = 0;
    this._pivotX = 0;
    this._pivotY = 0;
    this._width = 0;
    this._height = 0;
    this.uvDirty = true;
    this.vertDirty = true;
    this.material = null;
    this.vertexCount = 0;
    this.indicesCount = 0;
  }

}

exports.RenderData = RenderData;

class MeshRenderData extends BaseRenderData {
  /**
   * Each vertex contains multiple float numbers
   */

  /**
   * Number of indices
   */
  // only for graphics
  constructor(vertexFloatCnt = 9) {
    super();
    this.vData = void 0;
    this.iData = void 0;
    this.vertexStart = 0;
    this.indicesStart = 0;
    this.byteStart = 0;
    this.byteCount = 0;
    this.lastFilledIndices = 0;
    this.lastFilledVertex = 0;
    this._formatByte = void 0;
    this._formatByte = vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT;
    this.vData = new Float32Array(256 * vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT);
    this.iData = new Uint16Array(256 * 6);
  }

  set formatByte(value) {
    this._formatByte = value;
  }

  get formatByte() {
    return this._formatByte;
  }

  get floatStride() {
    return this._formatByte >> 2;
  }
  /**
   * Index of Float32Array: vData
   */


  get vDataOffset() {
    return this.byteCount >>> 2;
  }

  static add() {
    return _meshDataPool.add();
  }

  static remove(data) {
    const idx = _meshDataPool.data.indexOf(data);

    if (idx === -1) {
      return;
    }

    _meshDataPool.data[idx].reset();

    _meshDataPool.removeAt(idx);
  }

  request(vertexCount, indicesCount) {
    const byteOffset = this.byteCount + vertexCount * this._formatByte;
    this.reserve(vertexCount, indicesCount);
    this.vertexCount += vertexCount; // vertexOffset

    this.indicesCount += indicesCount; // indicesOffset

    this.byteCount = byteOffset; // byteOffset

    return true;
  }

  reserve(vertexCount, indicesCount) {
    const newVBytes = this.byteCount + vertexCount * this._formatByte;
    const newICount = this.indicesCount + indicesCount;

    if (vertexCount + this.vertexCount > 65535) {
      return false;
    }

    let byteLength = this.vData.byteLength;
    let indicesLength = this.iData.length;
    let vCount = this.vData.length;
    let iCount = this.iData.length;

    if (newVBytes > byteLength || newICount > indicesLength) {
      while (byteLength < newVBytes || indicesLength < newICount) {
        vCount *= 2;
        iCount *= 2;
        byteLength = vCount * 4;
        indicesLength = iCount;
      }

      this._reallocBuffer(vCount, iCount);
    }

    return true;
  }

  advance(vertexCount, indicesCount) {
    this.vertexCount += vertexCount; // vertexOffset

    this.indicesCount += indicesCount; // indicesOffset

    this.byteCount += vertexCount * this._formatByte;
  }

  reset() {
    this.vertexCount = 0;
    this.indicesCount = 0;
    this.byteCount = 0;
    this.vertexStart = 0;
    this.indicesStart = 0;
    this.byteStart = 0;
    this.lastFilledIndices = 0;
    this.lastFilledVertex = 0;
  }

  _reallocBuffer(vCount, iCount) {
    // copy old data
    const oldVData = this.vData;
    this.vData = new Float32Array(vCount);
    this.vData.set(oldVData, 0);
    const oldIData = this.iData;
    this.iData = new Uint16Array(iCount);
    this.iData.set(oldIData, 0);
  }

}

exports.MeshRenderData = MeshRenderData;

class QuadRenderData extends MeshRenderData {
  _fillQuadBuffer() {
    const count = this.iData.length / 6;
    const buffer = this.iData;

    for (let i = 0, idx = 0; i < count; i++) {
      const vId = i * 4;
      buffer[idx++] = vId;
      buffer[idx++] = vId + 1;
      buffer[idx++] = vId + 2;
      buffer[idx++] = vId + 1;
      buffer[idx++] = vId + 3;
      buffer[idx++] = vId + 2;
    }
  }

  _reallocBuffer(vCount, iCount) {
    // copy old data
    super._reallocBuffer(vCount, iCount);

    this._fillQuadBuffer();
  }

}

exports.QuadRenderData = QuadRenderData;

const _dataPool = new _index2.Pool(() => ({
  x: 0,
  y: 0,
  z: 0,
  u: 0,
  v: 0,
  color: _index.Color.WHITE.clone()
}), 128);

const _pool = new _index2.RecyclePool(() => new RenderData(), 32);

const _meshDataPool = new _index2.RecyclePool(() => new MeshRenderData(), 32);