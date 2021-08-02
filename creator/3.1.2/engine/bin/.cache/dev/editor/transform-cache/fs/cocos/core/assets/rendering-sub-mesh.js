"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderingSubMesh = void 0;

var _globalExports = require("../global-exports.js");

var _buffer = require("../../3d/misc/buffer.js");

var _index = require("../gfx/index.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _index2 = require("../math/index.js");

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
 * @module asset
 */

/**
 * @en Sub mesh for rendering which contains all geometry data, it can be used to create [[InputAssembler]].
 * @zh 包含所有顶点数据的渲染子网格，可以用来创建 [[InputAssembler]]。
 */
class RenderingSubMesh {
  constructor(vertexBuffers, attributes, primitiveMode, indexBuffer = null, indirectBuffer = null) {
    this.mesh = void 0;
    this.subMeshIdx = void 0;
    this._flatBuffers = [];
    this._jointMappedBuffers = void 0;
    this._jointMappedBufferIndices = void 0;
    this._vertexIdChannel = void 0;
    this._geometricInfo = void 0;
    this._vertexBuffers = void 0;
    this._attributes = void 0;
    this._indexBuffer = null;
    this._indirectBuffer = null;
    this._primitiveMode = void 0;
    this._iaInfo = void 0;
    this._handle = _memoryPools.NULL_HANDLE;
    this._attributes = attributes;
    this._vertexBuffers = vertexBuffers;
    this._indexBuffer = indexBuffer;
    this._indirectBuffer = indirectBuffer;
    this._primitiveMode = primitiveMode;
    this._iaInfo = new _index.InputAssemblerInfo(attributes, vertexBuffers, indexBuffer, indirectBuffer);
    this._handle = _memoryPools.SubMeshPool.alloc();

    const fbArrayHandle = _memoryPools.FlatBufferArrayPool.alloc();

    _memoryPools.SubMeshPool.set(this._handle, _memoryPools.SubMeshView.FLAT_BUFFER_ARRAY, fbArrayHandle);
  }
  /**
   * @en All vertex attributes used by the sub mesh
   * @zh 所有顶点属性。
   */


  get attributes() {
    return this._attributes;
  }
  /**
   * @en All vertex buffers used by the sub mesh
   * @zh 使用的所有顶点缓冲区。
   */


  get vertexBuffers() {
    return this._vertexBuffers;
  }
  /**
   * @en Index buffer used by the sub mesh
   * @zh 使用的索引缓冲区，若未使用则无需指定。
   */


  get indexBuffer() {
    return this._indexBuffer;
  }
  /**
   * @en Indirect buffer used by the sub mesh
   * @zh 间接绘制缓冲区。
   */


  get indirectBuffer() {
    return this._indirectBuffer;
  }
  /**
   * @en Primitive mode used by the sub mesh
   * @zh 图元类型。
   */


  get primitiveMode() {
    return this._primitiveMode;
  }
  /**
   * @en The geometric info of the sub mesh, used for raycast.
   * @zh （用于射线检测的）几何信息。
   */


  get geometricInfo() {
    if (this._geometricInfo) {
      return this._geometricInfo;
    }

    if (this.mesh === undefined) {
      return {
        positions: new Float32Array(),
        indices: new Uint8Array(),
        boundingBox: {
          min: _index2.Vec3.ZERO,
          max: _index2.Vec3.ZERO
        }
      };
    }

    if (this.subMeshIdx === undefined) {
      return {
        positions: new Float32Array(),
        indices: new Uint8Array(),
        boundingBox: {
          min: _index2.Vec3.ZERO,
          max: _index2.Vec3.ZERO
        }
      };
    }

    const {
      mesh
    } = this;
    const index = this.subMeshIdx;
    const positions = mesh.readAttribute(index, _index.AttributeName.ATTR_POSITION);
    const indices = mesh.readIndices(index);
    const max = new _index2.Vec3();
    const min = new _index2.Vec3();
    const pAttri = this.attributes.find(element => element.name === _index.AttributeName.ATTR_POSITION);

    if (pAttri) {
      const conut = _index.FormatInfos[pAttri.format].count;

      if (conut === 2) {
        max.set(positions[0], positions[1], 0);
        min.set(positions[0], positions[1], 0);
      } else {
        max.set(positions[0], positions[1], positions[2]);
        min.set(positions[0], positions[1], positions[2]);
      }

      for (let i = 0; i < positions.length; i += conut) {
        if (conut === 2) {
          max.x = positions[i] > max.x ? positions[i] : max.x;
          max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
          min.x = positions[i] < min.x ? positions[i] : min.x;
          min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
        } else {
          max.x = positions[i] > max.x ? positions[i] : max.x;
          max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
          max.z = positions[i + 2] > max.z ? positions[i + 2] : max.z;
          min.x = positions[i] < min.x ? positions[i] : min.x;
          min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
          min.z = positions[i + 2] < min.z ? positions[i + 2] : min.z;
        }
      }
    }

    this._geometricInfo = {
      positions,
      indices,
      boundingBox: {
        max,
        min
      }
    };
    return this._geometricInfo;
  }
  /**
   * @en Flatted vertex buffers
   * @zh 扁平化的顶点缓冲区。
   */


  get flatBuffers() {
    return this._flatBuffers;
  }

  genFlatBuffers() {
    if (this._flatBuffers.length || !this.mesh || this.subMeshIdx === undefined) {
      return;
    }

    const {
      mesh
    } = this;
    let idxCount = 0;
    const prim = mesh.struct.primitives[this.subMeshIdx];

    const fbArrayHandle = _memoryPools.SubMeshPool.get(this._handle, _memoryPools.SubMeshView.FLAT_BUFFER_ARRAY);

    if (prim.indexView) {
      idxCount = prim.indexView.count;
    }

    for (let i = 0; i < prim.vertexBundelIndices.length; i++) {
      const bundleIdx = prim.vertexBundelIndices[i];
      const vertexBundle = mesh.struct.vertexBundles[bundleIdx];
      const vbCount = prim.indexView ? prim.indexView.count : vertexBundle.view.count;
      const vbStride = vertexBundle.view.stride;
      const vbSize = vbStride * vbCount;
      const view = new Uint8Array(mesh.data.buffer, vertexBundle.view.offset, vertexBundle.view.length);

      const hBuffer = _memoryPools.RawBufferPool.alloc(prim.indexView ? vbSize : vertexBundle.view.length);

      const hFlatBuffer = _memoryPools.FlatBufferPool.alloc();

      _memoryPools.FlatBufferPool.set(hFlatBuffer, _memoryPools.FlatBufferView.STRIDE, vbStride);

      _memoryPools.FlatBufferPool.set(hFlatBuffer, _memoryPools.FlatBufferView.AMOUNT, vbCount);

      _memoryPools.FlatBufferPool.set(hFlatBuffer, _memoryPools.FlatBufferView.BUFFER, hBuffer);

      _memoryPools.FlatBufferArrayPool.push(fbArrayHandle, hFlatBuffer);

      const buffer = _memoryPools.RawBufferPool.getBuffer(hBuffer);

      const sharedView = new Uint8Array(buffer);

      if (!prim.indexView) {
        sharedView.set(mesh.data.subarray(vertexBundle.view.offset, vertexBundle.view.offset + vertexBundle.view.length));

        this._flatBuffers.push({
          stride: vbStride,
          count: vbCount,
          buffer: sharedView
        });

        continue;
      }

      const ibView = mesh.readIndices(this.subMeshIdx); // transform to flat buffer

      for (let n = 0; n < idxCount; ++n) {
        const idx = ibView[n];
        const offset = n * vbStride;
        const srcOffset = idx * vbStride;

        for (let m = 0; m < vbStride; ++m) {
          sharedView[offset + m] = view[srcOffset + m];
        }
      }

      this._flatBuffers.push({
        stride: vbStride,
        count: vbCount,
        buffer: sharedView
      });
    }
  }
  /**
   * @en The vertex buffer for joint after mapping
   * @zh 骨骼索引按映射表处理后的顶点缓冲。
   */


  get jointMappedBuffers() {
    if (this._jointMappedBuffers) {
      return this._jointMappedBuffers;
    }

    const buffers = this._jointMappedBuffers = [];
    const indices = this._jointMappedBufferIndices = [];

    if (!this.mesh || this.subMeshIdx === undefined) {
      return this._jointMappedBuffers = this.vertexBuffers;
    }

    const {
      struct
    } = this.mesh;
    const prim = struct.primitives[this.subMeshIdx];

    if (!struct.jointMaps || prim.jointMapIndex === undefined || !struct.jointMaps[prim.jointMapIndex]) {
      return this._jointMappedBuffers = this.vertexBuffers;
    }

    let jointFormat;
    let jointOffset;
    const {
      device
    } = _globalExports.legacyCC.director.root;

    for (let i = 0; i < prim.vertexBundelIndices.length; i++) {
      const bundle = struct.vertexBundles[prim.vertexBundelIndices[i]];
      jointOffset = 0;
      jointFormat = _index.Format.UNKNOWN;

      for (let j = 0; j < bundle.attributes.length; j++) {
        const attr = bundle.attributes[j];

        if (attr.name === _index.AttributeName.ATTR_JOINTS) {
          jointFormat = attr.format;
          break;
        }

        jointOffset += _index.FormatInfos[attr.format].size;
      }

      if (jointFormat) {
        const data = new Uint8Array(this.mesh.data.buffer, bundle.view.offset, bundle.view.length);
        const dataView = new DataView(data.slice().buffer);
        const idxMap = struct.jointMaps[prim.jointMapIndex];
        (0, _buffer.mapBuffer)(dataView, cur => idxMap.indexOf(cur), jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
        const buffer = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.DEVICE, bundle.view.length, bundle.view.stride));
        buffer.update(dataView.buffer);
        buffers.push(buffer);
        indices.push(i);
      } else {
        buffers.push(this.vertexBuffers[prim.vertexBundelIndices[i]]);
      }
    }

    if (this._vertexIdChannel) {
      buffers.push(this._allocVertexIdBuffer(device));
    }

    return buffers;
  }

  get iaInfo() {
    return this._iaInfo;
  }

  get handle() {
    return this._handle;
  }

  destroy() {
    for (let i = 0; i < this.vertexBuffers.length; i++) {
      this.vertexBuffers[i].destroy();
    }

    this.vertexBuffers.length = 0;

    if (this._indexBuffer) {
      this._indexBuffer.destroy();

      this._indexBuffer = null;
    }

    if (this._jointMappedBuffers && this._jointMappedBufferIndices) {
      for (let i = 0; i < this._jointMappedBufferIndices.length; i++) {
        this._jointMappedBuffers[this._jointMappedBufferIndices[i]].destroy();
      }

      this._jointMappedBuffers = undefined;
      this._jointMappedBufferIndices = undefined;
    }

    if (this._indirectBuffer) {
      this._indirectBuffer.destroy();

      this._indirectBuffer = null;
    }

    if (this._handle) {
      const fbArrayHandle = _memoryPools.SubMeshPool.get(this._handle, _memoryPools.SubMeshView.FLAT_BUFFER_ARRAY);

      (0, _memoryPools.freeHandleArray)(fbArrayHandle, _memoryPools.FlatBufferArrayPool, _memoryPools.FlatBufferPool);

      _memoryPools.SubMeshPool.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }
  }
  /**
   * @en Adds a vertex attribute input called 'a_vertexId' into this sub-mesh.
   * This is useful if you want to simulate `gl_VertexId` in WebGL context prior to 2.0.
   * Once you call this function, the vertex attribute is permanently added.
   * Subsequent calls to this function take no effect.
   * @param device Device used to create related rendering resources.
   */


  enableVertexIdChannel(device) {
    if (this._vertexIdChannel) {
      return;
    }

    const streamIndex = this.vertexBuffers.length;
    const attributeIndex = this.attributes.length;

    const vertexIdBuffer = this._allocVertexIdBuffer(device);

    this._vertexBuffers.push(vertexIdBuffer);

    this._attributes.push(new _index.Attribute('a_vertexId', _index.Format.R32F, false, streamIndex));

    this._iaInfo.attributes = this._attributes;
    this._iaInfo.vertexBuffers = this._vertexBuffers;
    this._vertexIdChannel = {
      stream: streamIndex,
      index: attributeIndex
    };
  }

  _allocVertexIdBuffer(device) {
    const vertexCount = this.vertexBuffers.length === 0 || this.vertexBuffers[0].stride === 0 ? 0 // TODO: This depends on how stride of a vertex buffer is defined; Consider padding problem.
    : this.vertexBuffers[0].size / this.vertexBuffers[0].stride;
    const vertexIds = new Float32Array(vertexCount);

    for (let iVertex = 0; iVertex < vertexCount; ++iVertex) {
      // `+0.5` because on some platforms, the "fetched integer" may have small error.
      // For example `26` may yield `25.99999`, which is convert to `25` instead of `26` using `int()`.
      vertexIds[iVertex] = iVertex + 0.5;
    }

    const vertexIdBuffer = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.DEVICE, vertexIds.byteLength, vertexIds.BYTES_PER_ELEMENT));
    vertexIdBuffer.update(vertexIds);
    return vertexIdBuffer;
  }

}

exports.RenderingSubMesh = RenderingSubMesh;