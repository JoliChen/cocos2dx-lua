"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freeHandleArray = freeHandleArray;
exports.BlendStatePool = exports.BlendStateView = exports.BlendTargetPool = exports.BlendTargetView = exports.DepthStencilStatePool = exports.DepthStencilStateView = exports.RasterizerStatePool = exports.RasterizerStateView = exports.SubMeshPool = exports.SubMeshView = exports.FlatBufferPool = exports.FlatBufferView = exports.SpherePool = exports.SphereView = exports.LightPool = exports.LightView = exports.PipelineSceneDataPool = exports.PipelineSceneDataView = exports.ShadowsPool = exports.ShadowsView = exports.FogPool = exports.FogView = exports.SkyboxPool = exports.SkyboxView = exports.AmbientPool = exports.AmbientView = exports.FrustumPool = exports.FrustumView = exports.RenderWindowPool = exports.RenderWindowView = exports.RootPool = exports.RootView = exports.NodePool = exports.NodeView = exports.CameraPool = exports.CameraView = exports.ScenePool = exports.SceneView = exports.AABBPool = exports.AABBView = exports.BatchPool2D = exports.BatchView2D = exports.ModelPool = exports.ModelView = exports.SubModelPool = exports.SubModelView = exports.PassPool = exports.PassView = exports.RawObjectPool = exports.RawBufferPool = exports.UIBatchArrayPool = exports.BlendTargetArrayPool = exports.LightArrayPool = exports.FlatBufferArrayPool = exports.AttributeArrayPool = exports.ModelArrayPool = exports.SubModelArrayPool = exports.FramebufferPool = exports.PipelineLayoutPool = exports.IAPool = exports.DSPool = exports.ShaderPool = exports.NULL_HANDLE = exports.PoolType = exports.ObjectPool = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _nativePools = require("./native-pools.js");

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
 * @hidden
 */
const contains = (a, t) => {
  for (let i = 0; i < a.length; ++i) {
    if (a[i] === t) return true;
  }

  return false;
};

var BufferDataType;

(function (BufferDataType) {
  BufferDataType[BufferDataType["UINT32"] = 0] = "UINT32";
  BufferDataType[BufferDataType["FLOAT32"] = 1] = "FLOAT32";
  BufferDataType[BufferDataType["NEVER"] = 2] = "NEVER";
})(BufferDataType || (BufferDataType = {}));

class BufferPool {
  // naming convension:
  // this._bufferViews[chunk][entry][element]
  constructor(poolType, dataType, enumType, entryBits = 8) {
    this._dataType = void 0;
    this._elementCount = void 0;
    this._entryBits = void 0;
    this._stride = void 0;
    this._entriesPerChunk = void 0;
    this._entryMask = void 0;
    this._chunkMask = void 0;
    this._poolFlag = void 0;
    this._arrayBuffers = [];
    this._freelists = [];
    this._uint32BufferViews = [];
    this._float32BufferViews = [];
    this._hasUint32 = false;
    this._hasFloat32 = false;
    this._nativePool = void 0;
    this._elementCount = enumType.COUNT;
    this._entryBits = entryBits;
    this._dataType = dataType;
    const bytesPerElement = 4;
    this._stride = bytesPerElement * this._elementCount;
    this._entriesPerChunk = 1 << entryBits;
    this._entryMask = this._entriesPerChunk - 1;
    this._poolFlag = 1 << 30;
    this._chunkMask = ~(this._entryMask | this._poolFlag);
    this._nativePool = new _nativePools.NativeBufferPool(poolType, entryBits, this._stride);
    let type = BufferDataType.NEVER;
    let hasFloat32 = false;
    let hasUint32 = false;

    for (const e in dataType) {
      hasFloat32 = this._hasFloat32;
      hasUint32 = this._hasUint32;

      if (hasUint32 && hasFloat32) {
        break;
      }

      type = dataType[e];

      if (!hasFloat32 && type === BufferDataType.FLOAT32) {
        this._hasFloat32 = true;
      } else if (!hasUint32 && type === BufferDataType.UINT32) {
        this._hasUint32 = true;
      }
    }
  }

  alloc() {
    let i = 0;

    for (; i < this._freelists.length; i++) {
      const list = this._freelists[i];

      if (list.length) {
        const j = list[list.length - 1];
        list.length--;
        return (i << this._entryBits) + j + this._poolFlag;
      }
    } // add a new chunk


    const buffer = this._nativePool.allocateNewChunk();

    const float32BufferViews = [];
    const uint32BufferViews = [];
    const freelist = [];
    const hasFloat32 = this._hasFloat32;
    const hasUint32 = this._hasUint32;

    for (let j = 0; j < this._entriesPerChunk; j++) {
      if (hasFloat32) {
        float32BufferViews.push(new Float32Array(buffer, this._stride * j, this._elementCount));
      }

      if (hasUint32) {
        uint32BufferViews.push(new Uint32Array(buffer, this._stride * j, this._elementCount));
      }

      if (j) {
        freelist.push(j);
      }
    }

    this._arrayBuffers.push(buffer);

    if (hasUint32) {
      this._uint32BufferViews.push(uint32BufferViews);
    }

    if (hasFloat32) {
      this._float32BufferViews.push(float32BufferViews);
    }

    this._freelists.push(freelist);

    return (i << this._entryBits) + this._poolFlag; // guarantees the handle is always not zero
  }
  /**
   * Get the specified element out from buffer pool.
   *
   * Note the type inference does not work when `element` is not directly
   * an pre-declared enum value: (e.g. when doing arithmetic operations)
   * ```ts
   * SubModelPool.get(handle, SubModelView.SHADER_0 + passIndex); // the return value will have type GeneralBufferElement
   * ```
   *
   * To properly declare the variable type, you have two options:
   * ```ts
   * const hShader = SubModelPool.get(handle, SubModelView.SHADER_0 + passIndex) as ShaderHandle; // option #1
   * const hShader = SubModelPool.get<SubModelView.SHADER_0>(handle, SubModelView.SHADER_0 + passIndex); // option #2
   * ```
   */


  get(handle, element) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return 0;
    }

    return bufferViews[chunk][entry][element];
  }

  set(handle, element, value) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    bufferViews[chunk][entry][element] = value;
  }

  setVec2(handle, element, vec2) {
    // Web engine has Vec2 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    view[index++] = vec2.x;
    view[index++] = vec2.y;
  }

  setVec3(handle, element, vec3) {
    // Web engine has Vec3 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    view[index++] = vec3.x;
    view[index++] = vec3.y;
    view[index] = vec3.z;
  }

  getVec3(handle, element, vec3) {
    // Web engine has Vec3 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    vec3.x = view[index++];
    vec3.y = view[index++];
    vec3.z = view[index];
  }

  setVec4(handle, element, vec4) {
    // Web engine has Vec4 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    view[index++] = vec4.x;
    view[index++] = vec4.y;
    view[index++] = vec4.z;
    view[index] = vec4.w;
  }

  getVec4(handle, element, vec4) {
    // Web engine has Vec4 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    vec4.x = view[index++];
    vec4.y = view[index++];
    vec4.z = view[index++];
    vec4.w = view[index];
  }

  setMat4(handle, element, mat4) {
    // Web engine has mat4 property, don't record it in shared memory.
    if (!_internal253Aconstants.JSB) {
      return;
    }

    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;
    const bufferViews = this._dataType[element] === BufferDataType.UINT32 ? this._uint32BufferViews : this._float32BufferViews;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= bufferViews.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    let index = element;
    const view = bufferViews[chunk][entry];
    view[index++] = mat4.m00;
    view[index++] = mat4.m01;
    view[index++] = mat4.m02;
    view[index++] = mat4.m03;
    view[index++] = mat4.m04;
    view[index++] = mat4.m05;
    view[index++] = mat4.m06;
    view[index++] = mat4.m07;
    view[index++] = mat4.m08;
    view[index++] = mat4.m09;
    view[index++] = mat4.m10;
    view[index++] = mat4.m11;
    view[index++] = mat4.m12;
    view[index++] = mat4.m13;
    view[index++] = mat4.m14;
    view[index] = mat4.m15;
  }

  free(handle) {
    const chunk = (this._chunkMask & handle) >> this._entryBits;
    const entry = this._entryMask & handle;

    if (_internal253Aconstants.DEBUG && (!handle || chunk < 0 || chunk >= this._freelists.length || entry < 0 || entry >= this._entriesPerChunk || contains(this._freelists[chunk], entry))) {
      console.warn('invalid buffer pool handle');
      return;
    }

    const bufferViews = this._hasUint32 ? this._uint32BufferViews : this._float32BufferViews;
    bufferViews[chunk][entry].fill(0);

    this._freelists[chunk].push(entry);
  }

}

class ObjectPool {
  constructor(poolType, ctor, dtor) {
    this._ctor = void 0;
    this._dtor = void 0;
    this._indexMask = void 0;
    this._poolFlag = void 0;
    this._array = [];
    this._freelist = [];
    this._nativePool = void 0;
    this._ctor = ctor;

    if (dtor) {
      this._dtor = dtor;
    }

    this._poolFlag = 1 << 29;
    this._indexMask = ~this._poolFlag;
    this._nativePool = new _nativePools.NativeObjectPool(poolType, this._array);
  }

  alloc(...args) {
    const freelist = this._freelist;
    let i = -1;

    if (freelist.length) {
      i = freelist[freelist.length - 1];
      freelist.length--;
      this._array[i] = this._ctor(arguments, this._array[i]);
    } else {
      i = this._array.length;

      const obj = this._ctor(arguments);

      if (!obj) {
        return 0;
      }

      this._array.push(obj);
    }

    if (_internal253Aconstants.JSB) this._nativePool.bind(i, this._array[i]);
    return i + this._poolFlag; // guarantees the handle is always not zero
  }

  get(handle) {
    const index = this._indexMask & handle;

    if (_internal253Aconstants.DEBUG && (!handle || index < 0 || index >= this._array.length || contains(this._freelist, index))) {
      console.warn('invalid object pool handle');
      return null;
    }

    return this._array[index];
  }

  free(handle) {
    const index = this._indexMask & handle;

    if (_internal253Aconstants.DEBUG && (!handle || index < 0 || index >= this._array.length || contains(this._freelist, index))) {
      console.warn('invalid object pool handle');
      return;
    }

    if (this._dtor) {
      this._array[index] = this._dtor(this._array[index]);
    }

    this._freelist.push(index);
  }

}

exports.ObjectPool = ObjectPool;

class BufferAllocator {
  constructor(poolType) {
    this._nativeBufferAllocator = void 0;
    this._buffers = new Map();
    this._nextBufferIdx = 0;
    this._poolFlag = void 0;
    this._bufferIdxMask = void 0;
    this._freelist = [];
    this._poolFlag = 1 << 30;
    this._bufferIdxMask = ~this._poolFlag;
    this._nativeBufferAllocator = new _nativePools.NativeBufferAllocator(poolType);
  }

  alloc(size) {
    const freelist = this._freelist;
    let bufferIdx = -1;

    if (freelist.length) {
      bufferIdx = freelist[freelist.length - 1];
      freelist.length--;
    } else {
      bufferIdx = this._nextBufferIdx++;
    }

    const buffer = this._nativeBufferAllocator.alloc(bufferIdx, size);

    this._buffers.set(bufferIdx, buffer);

    return bufferIdx | this._poolFlag;
  }

  free(handle) {
    const bufferIdx = this._bufferIdxMask & handle;

    if (!this._buffers.get(bufferIdx)) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid buffer allocator handle');
      }

      return;
    }

    this._nativeBufferAllocator.free(bufferIdx);

    this._buffers.delete(bufferIdx);

    this._freelist.push(bufferIdx);
  }

  getBuffer(handle) {
    const bufferIdx = this._bufferIdxMask & handle;

    const buffer = this._buffers.get(bufferIdx);

    if (!buffer) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool index or invalid array handle');
      }

      return null;
    }

    return buffer;
  }

}

class TypedArrayPool extends BufferAllocator {
  constructor(poolType, viewCtor, size, step) {
    super(poolType);
    this._viewCtor = void 0;
    this._size = void 0;
    this._step = void 0;
    this._viewCtor = viewCtor;
    this._size = size * viewCtor.BYTES_PER_ELEMENT;
    this._step = step || size;
  }

  alloc() {
    const bufferIdx = this._nextBufferIdx++;

    const buffer = this._nativeBufferAllocator.alloc(bufferIdx, this._size);

    this._buffers.set(bufferIdx, new this._viewCtor(buffer));

    return bufferIdx | this._poolFlag;
  } // no direct buffer accesses for array pools


  getBuffer(handle) {
    return null;
  }

  assign(handle, targetIdx, value) {
    const bufferIdx = this._bufferIdxMask & handle;

    let array = this._buffers.get(bufferIdx);

    if (!array) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return;
    } // First element is the length of array.


    const index = targetIdx + 1;

    if (index >= array.length) {
      let newSize = array.length;

      while (index >= newSize) {
        newSize += this._step;
      }

      newSize *= this._viewCtor.BYTES_PER_ELEMENT;
      const newArray = new this._viewCtor(this._nativeBufferAllocator.alloc(bufferIdx, newSize));
      newArray.set(array);
      array = newArray;

      this._buffers.set(bufferIdx, array);
    }

    array[index] = value; // There may be holes in the array.

    const len = array[0];
    array[0] = index > len ? index : len;
  }

  erase(handle, index) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array || index >= array[0]) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool index or invalid array handle');
      }

      return;
    }

    for (let i = index + 1; i < array[0]; ++i) {
      array[i] = array[i + 1];
    }

    --array[0];
  }

  push(handle, value) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return;
    }

    this.assign(handle, array[0], value);
  }

  pop(handle) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return;
    }

    if (array[0] !== 0) --array[0];
  }

  clear(handle) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return;
    }

    array[0] = 0;
  }

  get(handle, index) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array || index >= array[0]) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return 0;
    }

    return array[index + 1];
  }

  length(handle) {
    const bufferIdx = this._bufferIdxMask & handle;

    const array = this._buffers.get(bufferIdx);

    if (!array) {
      if (_internal253Aconstants.DEBUG) {
        console.warn('invalid array pool handle');
      }

      return 0;
    }

    return array[0];
  }

}

function freeHandleArray(arrayHandle, arrayPool, elementPool, freeArrayItself = true) {
  const count = arrayPool.length(arrayHandle);

  for (let i = 0; i < count; i++) {
    const element = arrayPool.get(arrayHandle, i);

    if (element) {
      elementPool.free(element);
    }
  }

  if (freeArrayItself) {
    arrayPool.free(arrayHandle);
  } else {
    arrayPool.clear(arrayHandle);
  }
}

let PoolType;
exports.PoolType = PoolType;

(function (PoolType) {
  PoolType[PoolType["ATTRIBUTE"] = 0] = "ATTRIBUTE";
  PoolType[PoolType["DESCRIPTOR_SETS"] = 1] = "DESCRIPTOR_SETS";
  PoolType[PoolType["SHADER"] = 2] = "SHADER";
  PoolType[PoolType["INPUT_ASSEMBLER"] = 3] = "INPUT_ASSEMBLER";
  PoolType[PoolType["PIPELINE_LAYOUT"] = 4] = "PIPELINE_LAYOUT";
  PoolType[PoolType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
  PoolType[PoolType["PASS"] = 100] = "PASS";
  PoolType[PoolType["SUB_MODEL"] = 101] = "SUB_MODEL";
  PoolType[PoolType["MODEL"] = 102] = "MODEL";
  PoolType[PoolType["SCENE"] = 103] = "SCENE";
  PoolType[PoolType["CAMERA"] = 104] = "CAMERA";
  PoolType[PoolType["NODE"] = 105] = "NODE";
  PoolType[PoolType["ROOT"] = 106] = "ROOT";
  PoolType[PoolType["AABB"] = 107] = "AABB";
  PoolType[PoolType["RENDER_WINDOW"] = 108] = "RENDER_WINDOW";
  PoolType[PoolType["FRUSTUM"] = 109] = "FRUSTUM";
  PoolType[PoolType["AMBIENT"] = 110] = "AMBIENT";
  PoolType[PoolType["FOG"] = 111] = "FOG";
  PoolType[PoolType["SKYBOX"] = 112] = "SKYBOX";
  PoolType[PoolType["SHADOW"] = 113] = "SHADOW";
  PoolType[PoolType["LIGHT"] = 114] = "LIGHT";
  PoolType[PoolType["SPHERE"] = 115] = "SPHERE";
  PoolType[PoolType["INSTANCED_ATTRIBUTE"] = 116] = "INSTANCED_ATTRIBUTE";
  PoolType[PoolType["FLAT_BUFFER"] = 117] = "FLAT_BUFFER";
  PoolType[PoolType["SUB_MESH"] = 118] = "SUB_MESH";
  PoolType[PoolType["RASTERIZER_STATE"] = 119] = "RASTERIZER_STATE";
  PoolType[PoolType["DEPTH_STENCIL_STATE"] = 120] = "DEPTH_STENCIL_STATE";
  PoolType[PoolType["BLEND_TARGET"] = 121] = "BLEND_TARGET";
  PoolType[PoolType["BLEND_STATE"] = 122] = "BLEND_STATE";
  PoolType[PoolType["BATCH_2D"] = 123] = "BATCH_2D";
  PoolType[PoolType["PIPELINE_SCENE_DATA"] = 124] = "PIPELINE_SCENE_DATA";
  PoolType[PoolType["SUB_MODEL_ARRAY"] = 200] = "SUB_MODEL_ARRAY";
  PoolType[PoolType["MODEL_ARRAY"] = 201] = "MODEL_ARRAY";
  PoolType[PoolType["ATTRIBUTE_ARRAY"] = 202] = "ATTRIBUTE_ARRAY";
  PoolType[PoolType["FLAT_BUFFER_ARRAY"] = 203] = "FLAT_BUFFER_ARRAY";
  PoolType[PoolType["INSTANCED_BUFFER_ARRAY"] = 204] = "INSTANCED_BUFFER_ARRAY";
  PoolType[PoolType["LIGHT_ARRAY"] = 205] = "LIGHT_ARRAY";
  PoolType[PoolType["BLEND_TARGET_ARRAY"] = 206] = "BLEND_TARGET_ARRAY";
  PoolType[PoolType["BATCH_ARRAY_2D"] = 207] = "BATCH_ARRAY_2D";
  PoolType[PoolType["RAW_BUFFER"] = 300] = "RAW_BUFFER";
  PoolType[PoolType["RAW_OBJECT"] = 400] = "RAW_OBJECT";
})(PoolType || (exports.PoolType = PoolType = {}));

const NULL_HANDLE = 0;
exports.NULL_HANDLE = NULL_HANDLE;
const ShaderPool = new ObjectPool(PoolType.SHADER, (args, obj) => obj ? (obj.initialize(args[1]), obj) : args[0].createShader(args[1]), obj => (obj && obj.destroy(), obj));
exports.ShaderPool = ShaderPool;
const DSPool = new ObjectPool(PoolType.DESCRIPTOR_SETS, (args, obj) => obj ? (obj.initialize(args[1]), obj) : args[0].createDescriptorSet(args[1]), obj => (obj && obj.destroy(), obj));
exports.DSPool = DSPool;
const IAPool = new ObjectPool(PoolType.INPUT_ASSEMBLER, (args, obj) => obj ? (obj.initialize(args[1]), obj) : args[0].createInputAssembler(args[1]), obj => (obj && obj.destroy(), obj));
exports.IAPool = IAPool;
const PipelineLayoutPool = new ObjectPool(PoolType.PIPELINE_LAYOUT, (args, obj) => obj ? (obj.initialize(args[1]), obj) : args[0].createPipelineLayout(args[1]), obj => (obj && obj.destroy(), obj));
exports.PipelineLayoutPool = PipelineLayoutPool;
const FramebufferPool = new ObjectPool(PoolType.FRAMEBUFFER, (args, obj) => obj ? (obj.initialize(args[1]), obj) : args[0].createFramebuffer(args[1]), obj => (obj && obj.destroy(), obj));
exports.FramebufferPool = FramebufferPool;
const SubModelArrayPool = new TypedArrayPool(PoolType.SUB_MODEL_ARRAY, Uint32Array, 8, 4);
exports.SubModelArrayPool = SubModelArrayPool;
const ModelArrayPool = new TypedArrayPool(PoolType.MODEL_ARRAY, Uint32Array, 32, 16);
exports.ModelArrayPool = ModelArrayPool;
const AttributeArrayPool = new TypedArrayPool(PoolType.ATTRIBUTE_ARRAY, Uint32Array, 8, 4);
exports.AttributeArrayPool = AttributeArrayPool;
const FlatBufferArrayPool = new TypedArrayPool(PoolType.FLAT_BUFFER_ARRAY, Uint32Array, 8, 4);
exports.FlatBufferArrayPool = FlatBufferArrayPool;
const LightArrayPool = new TypedArrayPool(PoolType.LIGHT_ARRAY, Uint32Array, 8, 4);
exports.LightArrayPool = LightArrayPool;
const BlendTargetArrayPool = new TypedArrayPool(PoolType.BLEND_TARGET_ARRAY, Uint32Array, 8, 4);
exports.BlendTargetArrayPool = BlendTargetArrayPool;
const UIBatchArrayPool = new TypedArrayPool(PoolType.BATCH_ARRAY_2D, Uint32Array, 32, 16);
exports.UIBatchArrayPool = UIBatchArrayPool;
const RawBufferPool = new BufferAllocator(PoolType.RAW_BUFFER);
exports.RawBufferPool = RawBufferPool;
const RawObjectPool = new ObjectPool(PoolType.RAW_OBJECT, args => args[0] || {}, _ => undefined);
exports.RawObjectPool = RawObjectPool;
let PassView;
exports.PassView = PassView;

(function (PassView) {
  PassView[PassView["PRIORITY"] = 0] = "PRIORITY";
  PassView[PassView["STAGE"] = 1] = "STAGE";
  PassView[PassView["PHASE"] = 2] = "PHASE";
  PassView[PassView["BATCHING_SCHEME"] = 3] = "BATCHING_SCHEME";
  PassView[PassView["PRIMITIVE"] = 4] = "PRIMITIVE";
  PassView[PassView["DYNAMIC_STATES"] = 5] = "DYNAMIC_STATES";
  PassView[PassView["HASH"] = 6] = "HASH";
  PassView[PassView["RASTERIZER_STATE"] = 7] = "RASTERIZER_STATE";
  PassView[PassView["DEPTH_STENCIL_STATE"] = 8] = "DEPTH_STENCIL_STATE";
  PassView[PassView["BLEND_STATE"] = 9] = "BLEND_STATE";
  PassView[PassView["DESCRIPTOR_SET"] = 10] = "DESCRIPTOR_SET";
  PassView[PassView["PIPELINE_LAYOUT"] = 11] = "PIPELINE_LAYOUT";
  PassView[PassView["COUNT"] = 12] = "COUNT";
})(PassView || (exports.PassView = PassView = {}));

const passViewDataType = {
  [PassView.PRIORITY]: BufferDataType.UINT32,
  [PassView.STAGE]: BufferDataType.UINT32,
  [PassView.PHASE]: BufferDataType.UINT32,
  [PassView.BATCHING_SCHEME]: BufferDataType.UINT32,
  [PassView.PRIMITIVE]: BufferDataType.UINT32,
  [PassView.DYNAMIC_STATES]: BufferDataType.UINT32,
  [PassView.HASH]: BufferDataType.UINT32,
  [PassView.RASTERIZER_STATE]: BufferDataType.UINT32,
  [PassView.DEPTH_STENCIL_STATE]: BufferDataType.UINT32,
  [PassView.BLEND_STATE]: BufferDataType.UINT32,
  [PassView.DESCRIPTOR_SET]: BufferDataType.UINT32,
  [PassView.PIPELINE_LAYOUT]: BufferDataType.UINT32,
  [PassView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const PassPool = new BufferPool(PoolType.PASS, passViewDataType, PassView);
exports.PassPool = PassPool;
let SubModelView;
exports.SubModelView = SubModelView;

(function (SubModelView) {
  SubModelView[SubModelView["PRIORITY"] = 0] = "PRIORITY";
  SubModelView[SubModelView["PASS_COUNT"] = 1] = "PASS_COUNT";
  SubModelView[SubModelView["PASS_0"] = 2] = "PASS_0";
  SubModelView[SubModelView["PASS_1"] = 3] = "PASS_1";
  SubModelView[SubModelView["PASS_2"] = 4] = "PASS_2";
  SubModelView[SubModelView["PASS_3"] = 5] = "PASS_3";
  SubModelView[SubModelView["PASS_4"] = 6] = "PASS_4";
  SubModelView[SubModelView["PASS_5"] = 7] = "PASS_5";
  SubModelView[SubModelView["PASS_6"] = 8] = "PASS_6";
  SubModelView[SubModelView["PASS_7"] = 9] = "PASS_7";
  SubModelView[SubModelView["SHADER_0"] = 10] = "SHADER_0";
  SubModelView[SubModelView["SHADER_1"] = 11] = "SHADER_1";
  SubModelView[SubModelView["SHADER_2"] = 12] = "SHADER_2";
  SubModelView[SubModelView["SHADER_3"] = 13] = "SHADER_3";
  SubModelView[SubModelView["SHADER_4"] = 14] = "SHADER_4";
  SubModelView[SubModelView["SHADER_5"] = 15] = "SHADER_5";
  SubModelView[SubModelView["SHADER_6"] = 16] = "SHADER_6";
  SubModelView[SubModelView["SHADER_7"] = 17] = "SHADER_7";
  SubModelView[SubModelView["PLANAR_SHADER"] = 18] = "PLANAR_SHADER";
  SubModelView[SubModelView["PLANAR_INSTANCE_SHADER"] = 19] = "PLANAR_INSTANCE_SHADER";
  SubModelView[SubModelView["DESCRIPTOR_SET"] = 20] = "DESCRIPTOR_SET";
  SubModelView[SubModelView["INPUT_ASSEMBLER"] = 21] = "INPUT_ASSEMBLER";
  SubModelView[SubModelView["SUB_MESH"] = 22] = "SUB_MESH";
  SubModelView[SubModelView["COUNT"] = 23] = "COUNT";
})(SubModelView || (exports.SubModelView = SubModelView = {}));

const subModelViewDataType = {
  [SubModelView.PRIORITY]: BufferDataType.UINT32,
  [SubModelView.PASS_COUNT]: BufferDataType.UINT32,
  [SubModelView.PASS_0]: BufferDataType.UINT32,
  [SubModelView.PASS_1]: BufferDataType.UINT32,
  [SubModelView.PASS_2]: BufferDataType.UINT32,
  [SubModelView.PASS_3]: BufferDataType.UINT32,
  [SubModelView.PASS_4]: BufferDataType.UINT32,
  [SubModelView.PASS_5]: BufferDataType.UINT32,
  [SubModelView.PASS_6]: BufferDataType.UINT32,
  [SubModelView.PASS_7]: BufferDataType.UINT32,
  [SubModelView.SHADER_0]: BufferDataType.UINT32,
  [SubModelView.SHADER_1]: BufferDataType.UINT32,
  [SubModelView.SHADER_2]: BufferDataType.UINT32,
  [SubModelView.SHADER_3]: BufferDataType.UINT32,
  [SubModelView.SHADER_4]: BufferDataType.UINT32,
  [SubModelView.SHADER_5]: BufferDataType.UINT32,
  [SubModelView.SHADER_6]: BufferDataType.UINT32,
  [SubModelView.SHADER_7]: BufferDataType.UINT32,
  [SubModelView.PLANAR_SHADER]: BufferDataType.UINT32,
  [SubModelView.PLANAR_INSTANCE_SHADER]: BufferDataType.UINT32,
  [SubModelView.DESCRIPTOR_SET]: BufferDataType.UINT32,
  [SubModelView.INPUT_ASSEMBLER]: BufferDataType.UINT32,
  [SubModelView.SUB_MESH]: BufferDataType.UINT32,
  [SubModelView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const SubModelPool = new BufferPool(PoolType.SUB_MODEL, subModelViewDataType, SubModelView);
exports.SubModelPool = SubModelPool;
let ModelView;
exports.ModelView = ModelView;

(function (ModelView) {
  ModelView[ModelView["ENABLED"] = 0] = "ENABLED";
  ModelView[ModelView["VIS_FLAGS"] = 1] = "VIS_FLAGS";
  ModelView[ModelView["CAST_SHADOW"] = 2] = "CAST_SHADOW";
  ModelView[ModelView["RECEIVE_SHADOW"] = 3] = "RECEIVE_SHADOW";
  ModelView[ModelView["WORLD_BOUNDS"] = 4] = "WORLD_BOUNDS";
  ModelView[ModelView["NODE"] = 5] = "NODE";
  ModelView[ModelView["TRANSFORM"] = 6] = "TRANSFORM";
  ModelView[ModelView["SUB_MODEL_ARRAY"] = 7] = "SUB_MODEL_ARRAY";
  ModelView[ModelView["INSTANCED_BUFFER"] = 8] = "INSTANCED_BUFFER";
  ModelView[ModelView["INSTANCED_ATTR_ARRAY"] = 9] = "INSTANCED_ATTR_ARRAY";
  ModelView[ModelView["COUNT"] = 10] = "COUNT";
})(ModelView || (exports.ModelView = ModelView = {}));

const modelViewDataType = {
  [ModelView.ENABLED]: BufferDataType.UINT32,
  [ModelView.VIS_FLAGS]: BufferDataType.UINT32,
  [ModelView.CAST_SHADOW]: BufferDataType.UINT32,
  [ModelView.RECEIVE_SHADOW]: BufferDataType.UINT32,
  [ModelView.WORLD_BOUNDS]: BufferDataType.UINT32,
  [ModelView.NODE]: BufferDataType.UINT32,
  [ModelView.TRANSFORM]: BufferDataType.UINT32,
  [ModelView.SUB_MODEL_ARRAY]: BufferDataType.UINT32,
  [ModelView.INSTANCED_BUFFER]: BufferDataType.UINT32,
  [ModelView.INSTANCED_ATTR_ARRAY]: BufferDataType.UINT32,
  [ModelView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const ModelPool = new BufferPool(PoolType.MODEL, modelViewDataType, ModelView);
exports.ModelPool = ModelPool;
let BatchView2D;
exports.BatchView2D = BatchView2D;

(function (BatchView2D) {
  BatchView2D[BatchView2D["VIS_FLAGS"] = 0] = "VIS_FLAGS";
  BatchView2D[BatchView2D["PASS_COUNT"] = 1] = "PASS_COUNT";
  BatchView2D[BatchView2D["PASS_0"] = 2] = "PASS_0";
  BatchView2D[BatchView2D["PASS_1"] = 3] = "PASS_1";
  BatchView2D[BatchView2D["PASS_2"] = 4] = "PASS_2";
  BatchView2D[BatchView2D["PASS_3"] = 5] = "PASS_3";
  BatchView2D[BatchView2D["SHADER_0"] = 6] = "SHADER_0";
  BatchView2D[BatchView2D["SHADER_1"] = 7] = "SHADER_1";
  BatchView2D[BatchView2D["SHADER_2"] = 8] = "SHADER_2";
  BatchView2D[BatchView2D["SHADER_3"] = 9] = "SHADER_3";
  BatchView2D[BatchView2D["DESCRIPTOR_SET"] = 10] = "DESCRIPTOR_SET";
  BatchView2D[BatchView2D["INPUT_ASSEMBLER"] = 11] = "INPUT_ASSEMBLER";
  BatchView2D[BatchView2D["COUNT"] = 12] = "COUNT";
})(BatchView2D || (exports.BatchView2D = BatchView2D = {}));

const batchView2DDataType = {
  [BatchView2D.VIS_FLAGS]: BufferDataType.UINT32,
  [BatchView2D.PASS_COUNT]: BufferDataType.UINT32,
  [BatchView2D.PASS_0]: BufferDataType.UINT32,
  [BatchView2D.PASS_1]: BufferDataType.UINT32,
  [BatchView2D.PASS_2]: BufferDataType.UINT32,
  [BatchView2D.PASS_3]: BufferDataType.UINT32,
  [BatchView2D.SHADER_0]: BufferDataType.UINT32,
  [BatchView2D.SHADER_1]: BufferDataType.UINT32,
  [BatchView2D.SHADER_2]: BufferDataType.UINT32,
  [BatchView2D.SHADER_3]: BufferDataType.UINT32,
  [BatchView2D.DESCRIPTOR_SET]: BufferDataType.UINT32,
  [BatchView2D.INPUT_ASSEMBLER]: BufferDataType.UINT32,
  [BatchView2D.COUNT]: BufferDataType.NEVER
};
const BatchPool2D = new BufferPool(PoolType.BATCH_2D, batchView2DDataType, BatchView2D);
exports.BatchPool2D = BatchPool2D;
let AABBView;
exports.AABBView = AABBView;

(function (AABBView) {
  AABBView[AABBView["CENTER"] = 0] = "CENTER";
  AABBView[AABBView["HALF_EXTENSION"] = 3] = "HALF_EXTENSION";
  AABBView[AABBView["COUNT"] = 6] = "COUNT";
})(AABBView || (exports.AABBView = AABBView = {}));

const aabbViewDataType = {
  [AABBView.CENTER]: BufferDataType.FLOAT32,
  [AABBView.HALF_EXTENSION]: BufferDataType.FLOAT32,
  [AABBView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const AABBPool = new BufferPool(PoolType.AABB, aabbViewDataType, AABBView);
exports.AABBPool = AABBPool;
let SceneView;
exports.SceneView = SceneView;

(function (SceneView) {
  SceneView[SceneView["MAIN_LIGHT"] = 0] = "MAIN_LIGHT";
  SceneView[SceneView["MODEL_ARRAY"] = 1] = "MODEL_ARRAY";
  SceneView[SceneView["SPHERE_LIGHT_ARRAY"] = 2] = "SPHERE_LIGHT_ARRAY";
  SceneView[SceneView["SPOT_LIGHT_ARRAY"] = 3] = "SPOT_LIGHT_ARRAY";
  SceneView[SceneView["BATCH_ARRAY_2D"] = 4] = "BATCH_ARRAY_2D";
  SceneView[SceneView["COUNT"] = 5] = "COUNT";
})(SceneView || (exports.SceneView = SceneView = {}));

const sceneViewDataType = {
  [SceneView.MAIN_LIGHT]: BufferDataType.UINT32,
  [SceneView.MODEL_ARRAY]: BufferDataType.UINT32,
  [SceneView.SPHERE_LIGHT_ARRAY]: BufferDataType.UINT32,
  [SceneView.SPOT_LIGHT_ARRAY]: BufferDataType.UINT32,
  [SceneView.BATCH_ARRAY_2D]: BufferDataType.UINT32,
  [SceneView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const ScenePool = new BufferPool(PoolType.SCENE, sceneViewDataType, SceneView);
exports.ScenePool = ScenePool;
let CameraView;
exports.CameraView = CameraView;

(function (CameraView) {
  CameraView[CameraView["WIDTH"] = 0] = "WIDTH";
  CameraView[CameraView["HEIGHT"] = 1] = "HEIGHT";
  CameraView[CameraView["EXPOSURE"] = 2] = "EXPOSURE";
  CameraView[CameraView["CLEAR_FLAGS"] = 3] = "CLEAR_FLAGS";
  CameraView[CameraView["CLEAR_DEPTH"] = 4] = "CLEAR_DEPTH";
  CameraView[CameraView["CLEAR_STENCIL"] = 5] = "CLEAR_STENCIL";
  CameraView[CameraView["VISIBILITY"] = 6] = "VISIBILITY";
  CameraView[CameraView["NODE"] = 7] = "NODE";
  CameraView[CameraView["SCENE"] = 8] = "SCENE";
  CameraView[CameraView["FRUSTUM"] = 9] = "FRUSTUM";
  CameraView[CameraView["WINDOW"] = 10] = "WINDOW";
  CameraView[CameraView["FORWARD"] = 11] = "FORWARD";
  CameraView[CameraView["POSITION"] = 14] = "POSITION";
  CameraView[CameraView["VIEW_PORT"] = 17] = "VIEW_PORT";
  CameraView[CameraView["CLEAR_COLOR"] = 21] = "CLEAR_COLOR";
  CameraView[CameraView["MAT_VIEW"] = 25] = "MAT_VIEW";
  CameraView[CameraView["MAT_VIEW_PROJ"] = 41] = "MAT_VIEW_PROJ";
  CameraView[CameraView["MAT_VIEW_PROJ_INV"] = 57] = "MAT_VIEW_PROJ_INV";
  CameraView[CameraView["MAT_PROJ"] = 73] = "MAT_PROJ";
  CameraView[CameraView["MAT_PROJ_INV"] = 89] = "MAT_PROJ_INV";
  CameraView[CameraView["MAT_VIEW_PROJ_OFFSCREEN"] = 105] = "MAT_VIEW_PROJ_OFFSCREEN";
  CameraView[CameraView["MAT_VIEW_PROJ_INV_OFFSCREEN"] = 121] = "MAT_VIEW_PROJ_INV_OFFSCREEN";
  CameraView[CameraView["MAT_PROJ_OFFSCREEN"] = 137] = "MAT_PROJ_OFFSCREEN";
  CameraView[CameraView["MAT_PROJ_INV_OFFSCREEN"] = 153] = "MAT_PROJ_INV_OFFSCREEN";
  CameraView[CameraView["COUNT"] = 169] = "COUNT";
})(CameraView || (exports.CameraView = CameraView = {}));

const cameraViewDataType = {
  [CameraView.WIDTH]: BufferDataType.UINT32,
  [CameraView.HEIGHT]: BufferDataType.UINT32,
  [CameraView.EXPOSURE]: BufferDataType.FLOAT32,
  [CameraView.CLEAR_FLAGS]: BufferDataType.UINT32,
  [CameraView.CLEAR_DEPTH]: BufferDataType.FLOAT32,
  [CameraView.CLEAR_STENCIL]: BufferDataType.UINT32,
  [CameraView.VISIBILITY]: BufferDataType.UINT32,
  [CameraView.NODE]: BufferDataType.UINT32,
  [CameraView.SCENE]: BufferDataType.UINT32,
  [CameraView.FRUSTUM]: BufferDataType.UINT32,
  [CameraView.WINDOW]: BufferDataType.UINT32,
  [CameraView.FORWARD]: BufferDataType.FLOAT32,
  [CameraView.POSITION]: BufferDataType.FLOAT32,
  [CameraView.VIEW_PORT]: BufferDataType.FLOAT32,
  [CameraView.CLEAR_COLOR]: BufferDataType.FLOAT32,
  [CameraView.MAT_VIEW]: BufferDataType.FLOAT32,
  [CameraView.MAT_VIEW_PROJ]: BufferDataType.FLOAT32,
  [CameraView.MAT_VIEW_PROJ_INV]: BufferDataType.FLOAT32,
  [CameraView.MAT_PROJ]: BufferDataType.FLOAT32,
  [CameraView.MAT_PROJ_INV]: BufferDataType.FLOAT32,
  [CameraView.MAT_VIEW_PROJ_OFFSCREEN]: BufferDataType.FLOAT32,
  [CameraView.MAT_VIEW_PROJ_INV_OFFSCREEN]: BufferDataType.FLOAT32,
  [CameraView.MAT_PROJ_OFFSCREEN]: BufferDataType.FLOAT32,
  [CameraView.MAT_PROJ_INV_OFFSCREEN]: BufferDataType.FLOAT32,
  [CameraView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const CameraPool = new BufferPool(PoolType.CAMERA, cameraViewDataType, CameraView);
exports.CameraPool = CameraPool;
let NodeView;
exports.NodeView = NodeView;

(function (NodeView) {
  NodeView[NodeView["HAS_CHANGED_FLAGS"] = 0] = "HAS_CHANGED_FLAGS";
  NodeView[NodeView["LAYER"] = 1] = "LAYER";
  NodeView[NodeView["WORLD_SCALE"] = 2] = "WORLD_SCALE";
  NodeView[NodeView["WORLD_POSITION"] = 5] = "WORLD_POSITION";
  NodeView[NodeView["WORLD_ROTATION"] = 8] = "WORLD_ROTATION";
  NodeView[NodeView["WORLD_MATRIX"] = 12] = "WORLD_MATRIX";
  NodeView[NodeView["COUNT"] = 28] = "COUNT";
})(NodeView || (exports.NodeView = NodeView = {}));

const nodeViewDataType = {
  [NodeView.HAS_CHANGED_FLAGS]: BufferDataType.UINT32,
  [NodeView.LAYER]: BufferDataType.UINT32,
  [NodeView.WORLD_SCALE]: BufferDataType.FLOAT32,
  [NodeView.WORLD_POSITION]: BufferDataType.FLOAT32,
  [NodeView.WORLD_ROTATION]: BufferDataType.FLOAT32,
  [NodeView.WORLD_MATRIX]: BufferDataType.FLOAT32,
  [NodeView.COUNT]: BufferDataType.NEVER
}; // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

if (!_internal253Aconstants.JSB) {
  delete NodeView[NodeView.COUNT];
  NodeView[NodeView.COUNT = NodeView.LAYER + 1] = 'COUNT';
} // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.


const NodePool = new BufferPool(PoolType.NODE, nodeViewDataType, NodeView);
exports.NodePool = NodePool;
let RootView;
exports.RootView = RootView;

(function (RootView) {
  RootView[RootView["CUMULATIVE_TIME"] = 0] = "CUMULATIVE_TIME";
  RootView[RootView["FRAME_TIME"] = 1] = "FRAME_TIME";
  RootView[RootView["COUNT"] = 2] = "COUNT";
})(RootView || (exports.RootView = RootView = {}));

const rootViewDataType = {
  [RootView.CUMULATIVE_TIME]: BufferDataType.FLOAT32,
  [RootView.FRAME_TIME]: BufferDataType.FLOAT32,
  [RootView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const RootPool = new BufferPool(PoolType.ROOT, rootViewDataType, RootView, 1);
exports.RootPool = RootPool;
let RenderWindowView;
exports.RenderWindowView = RenderWindowView;

(function (RenderWindowView) {
  RenderWindowView[RenderWindowView["HAS_ON_SCREEN_ATTACHMENTS"] = 0] = "HAS_ON_SCREEN_ATTACHMENTS";
  RenderWindowView[RenderWindowView["HAS_OFF_SCREEN_ATTACHMENTS"] = 1] = "HAS_OFF_SCREEN_ATTACHMENTS";
  RenderWindowView[RenderWindowView["FRAMEBUFFER"] = 2] = "FRAMEBUFFER";
  RenderWindowView[RenderWindowView["COUNT"] = 3] = "COUNT";
})(RenderWindowView || (exports.RenderWindowView = RenderWindowView = {}));

const renderWindowDataType = {
  [RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS]: BufferDataType.UINT32,
  [RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS]: BufferDataType.UINT32,
  [RenderWindowView.FRAMEBUFFER]: BufferDataType.UINT32,
  [RenderWindowView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const RenderWindowPool = new BufferPool(PoolType.RENDER_WINDOW, renderWindowDataType, RenderWindowView, 2);
exports.RenderWindowPool = RenderWindowPool;
let FrustumView;
exports.FrustumView = FrustumView;

(function (FrustumView) {
  FrustumView[FrustumView["VERTICES"] = 0] = "VERTICES";
  FrustumView[FrustumView["PLANES"] = 24] = "PLANES";
  FrustumView[FrustumView["COUNT"] = 48] = "COUNT";
})(FrustumView || (exports.FrustumView = FrustumView = {}));

const frustumViewDataType = {
  [FrustumView.VERTICES]: BufferDataType.FLOAT32,
  [FrustumView.PLANES]: BufferDataType.FLOAT32,
  [FrustumView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const FrustumPool = new BufferPool(PoolType.FRUSTUM, frustumViewDataType, FrustumView);
exports.FrustumPool = FrustumPool;
let AmbientView;
exports.AmbientView = AmbientView;

(function (AmbientView) {
  AmbientView[AmbientView["ENABLE"] = 0] = "ENABLE";
  AmbientView[AmbientView["ILLUM"] = 1] = "ILLUM";
  AmbientView[AmbientView["SKY_COLOR"] = 2] = "SKY_COLOR";
  AmbientView[AmbientView["GROUND_ALBEDO"] = 6] = "GROUND_ALBEDO";
  AmbientView[AmbientView["COUNT"] = 10] = "COUNT";
})(AmbientView || (exports.AmbientView = AmbientView = {}));

const ambientViewDataType = {
  [AmbientView.ENABLE]: BufferDataType.UINT32,
  [AmbientView.ILLUM]: BufferDataType.FLOAT32,
  [AmbientView.SKY_COLOR]: BufferDataType.FLOAT32,
  [AmbientView.GROUND_ALBEDO]: BufferDataType.FLOAT32,
  [AmbientView.COUNT]: BufferDataType.NEVER
}; // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

if (!_internal253Aconstants.JSB) {
  delete AmbientView[AmbientView.COUNT];
  AmbientView[AmbientView.COUNT = AmbientView.ILLUM + 1] = 'COUNT';
} // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.


const AmbientPool = new BufferPool(PoolType.AMBIENT, ambientViewDataType, AmbientView, 1);
exports.AmbientPool = AmbientPool;
let SkyboxView;
exports.SkyboxView = SkyboxView;

(function (SkyboxView) {
  SkyboxView[SkyboxView["ENABLE"] = 0] = "ENABLE";
  SkyboxView[SkyboxView["IS_RGBE"] = 1] = "IS_RGBE";
  SkyboxView[SkyboxView["USE_IBL"] = 2] = "USE_IBL";
  SkyboxView[SkyboxView["MODEL"] = 3] = "MODEL";
  SkyboxView[SkyboxView["COUNT"] = 4] = "COUNT";
})(SkyboxView || (exports.SkyboxView = SkyboxView = {}));

const skyboxDataType = {
  [SkyboxView.ENABLE]: BufferDataType.UINT32,
  [SkyboxView.IS_RGBE]: BufferDataType.UINT32,
  [SkyboxView.USE_IBL]: BufferDataType.UINT32,
  [SkyboxView.MODEL]: BufferDataType.UINT32,
  [SkyboxView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const SkyboxPool = new BufferPool(PoolType.SKYBOX, skyboxDataType, SkyboxView, 1);
exports.SkyboxPool = SkyboxPool;
let FogView;
exports.FogView = FogView;

(function (FogView) {
  FogView[FogView["ENABLE"] = 0] = "ENABLE";
  FogView[FogView["TYPE"] = 1] = "TYPE";
  FogView[FogView["DENSITY"] = 2] = "DENSITY";
  FogView[FogView["START"] = 3] = "START";
  FogView[FogView["END"] = 4] = "END";
  FogView[FogView["ATTEN"] = 5] = "ATTEN";
  FogView[FogView["TOP"] = 6] = "TOP";
  FogView[FogView["RANGE"] = 7] = "RANGE";
  FogView[FogView["COLOR"] = 8] = "COLOR";
  FogView[FogView["COUNT"] = 12] = "COUNT";
})(FogView || (exports.FogView = FogView = {}));

const fogViewDataType = {
  [FogView.ENABLE]: BufferDataType.UINT32,
  [FogView.TYPE]: BufferDataType.UINT32,
  [FogView.DENSITY]: BufferDataType.FLOAT32,
  [FogView.START]: BufferDataType.FLOAT32,
  [FogView.END]: BufferDataType.FLOAT32,
  [FogView.ATTEN]: BufferDataType.FLOAT32,
  [FogView.TOP]: BufferDataType.FLOAT32,
  [FogView.RANGE]: BufferDataType.FLOAT32,
  [FogView.COLOR]: BufferDataType.FLOAT32,
  [FogView.COUNT]: BufferDataType.NEVER
}; // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

if (!_internal253Aconstants.JSB) {
  delete FogView[FogView.COUNT];
  FogView[FogView.COUNT = FogView.RANGE + 1] = 'COUNT';
} // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.


const FogPool = new BufferPool(PoolType.FOG, fogViewDataType, FogView);
exports.FogPool = FogPool;
let ShadowsView;
exports.ShadowsView = ShadowsView;

(function (ShadowsView) {
  ShadowsView[ShadowsView["ENABLE"] = 0] = "ENABLE";
  ShadowsView[ShadowsView["DIRTY"] = 1] = "DIRTY";
  ShadowsView[ShadowsView["TYPE"] = 2] = "TYPE";
  ShadowsView[ShadowsView["DISTANCE"] = 3] = "DISTANCE";
  ShadowsView[ShadowsView["INSTANCE_PASS"] = 4] = "INSTANCE_PASS";
  ShadowsView[ShadowsView["PLANAR_PASS"] = 5] = "PLANAR_PASS";
  ShadowsView[ShadowsView["NEAR"] = 6] = "NEAR";
  ShadowsView[ShadowsView["FAR"] = 7] = "FAR";
  ShadowsView[ShadowsView["ASPECT"] = 8] = "ASPECT";
  ShadowsView[ShadowsView["PCF_TYPE"] = 9] = "PCF_TYPE";
  ShadowsView[ShadowsView["SHADOW_MAP_DIRTY"] = 10] = "SHADOW_MAP_DIRTY";
  ShadowsView[ShadowsView["BIAS"] = 11] = "BIAS";
  ShadowsView[ShadowsView["PACKING"] = 12] = "PACKING";
  ShadowsView[ShadowsView["LINEAR"] = 13] = "LINEAR";
  ShadowsView[ShadowsView["SELF_SHADOW"] = 14] = "SELF_SHADOW";
  ShadowsView[ShadowsView["NORMAL_BIAS"] = 15] = "NORMAL_BIAS";
  ShadowsView[ShadowsView["ORTHO_SIZE"] = 16] = "ORTHO_SIZE";
  ShadowsView[ShadowsView["AUTO_ADAPT"] = 17] = "AUTO_ADAPT";
  ShadowsView[ShadowsView["COLOR"] = 18] = "COLOR";
  ShadowsView[ShadowsView["SIZE"] = 22] = "SIZE";
  ShadowsView[ShadowsView["NORMAL"] = 24] = "NORMAL";
  ShadowsView[ShadowsView["MAT_LIGHT"] = 27] = "MAT_LIGHT";
  ShadowsView[ShadowsView["COUNT"] = 43] = "COUNT";
})(ShadowsView || (exports.ShadowsView = ShadowsView = {}));

const shadowsViewDataType = {
  [ShadowsView.ENABLE]: BufferDataType.UINT32,
  [ShadowsView.DIRTY]: BufferDataType.UINT32,
  [ShadowsView.TYPE]: BufferDataType.UINT32,
  [ShadowsView.DISTANCE]: BufferDataType.FLOAT32,
  [ShadowsView.INSTANCE_PASS]: BufferDataType.UINT32,
  [ShadowsView.PLANAR_PASS]: BufferDataType.UINT32,
  [ShadowsView.NEAR]: BufferDataType.FLOAT32,
  [ShadowsView.FAR]: BufferDataType.FLOAT32,
  [ShadowsView.ASPECT]: BufferDataType.FLOAT32,
  [ShadowsView.PCF_TYPE]: BufferDataType.UINT32,
  [ShadowsView.SHADOW_MAP_DIRTY]: BufferDataType.UINT32,
  [ShadowsView.BIAS]: BufferDataType.FLOAT32,
  [ShadowsView.PACKING]: BufferDataType.UINT32,
  [ShadowsView.LINEAR]: BufferDataType.UINT32,
  [ShadowsView.SELF_SHADOW]: BufferDataType.UINT32,
  [ShadowsView.NORMAL_BIAS]: BufferDataType.FLOAT32,
  [ShadowsView.ORTHO_SIZE]: BufferDataType.FLOAT32,
  [ShadowsView.AUTO_ADAPT]: BufferDataType.UINT32,
  [ShadowsView.COLOR]: BufferDataType.FLOAT32,
  [ShadowsView.SIZE]: BufferDataType.FLOAT32,
  [ShadowsView.NORMAL]: BufferDataType.FLOAT32,
  [ShadowsView.MAT_LIGHT]: BufferDataType.FLOAT32,
  [ShadowsView.COUNT]: BufferDataType.NEVER
}; // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

if (!_internal253Aconstants.JSB) {
  delete ShadowsView[ShadowsView.COUNT];
  ShadowsView[ShadowsView.COUNT = ShadowsView.AUTO_ADAPT + 1] = 'COUNT';
} // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.


const ShadowsPool = new BufferPool(PoolType.SHADOW, shadowsViewDataType, ShadowsView, 1);
exports.ShadowsPool = ShadowsPool;
let PipelineSceneDataView;
exports.PipelineSceneDataView = PipelineSceneDataView;

(function (PipelineSceneDataView) {
  PipelineSceneDataView[PipelineSceneDataView["SHADOW"] = 0] = "SHADOW";
  PipelineSceneDataView[PipelineSceneDataView["SKYBOX"] = 1] = "SKYBOX";
  PipelineSceneDataView[PipelineSceneDataView["AMBIENT"] = 2] = "AMBIENT";
  PipelineSceneDataView[PipelineSceneDataView["FOG"] = 3] = "FOG";
  PipelineSceneDataView[PipelineSceneDataView["IS_HDR"] = 4] = "IS_HDR";
  PipelineSceneDataView[PipelineSceneDataView["SHADING_SCALE"] = 5] = "SHADING_SCALE";
  PipelineSceneDataView[PipelineSceneDataView["FP_SCALE"] = 6] = "FP_SCALE";
  PipelineSceneDataView[PipelineSceneDataView["DEFERRED_LIGHT_PASS"] = 7] = "DEFERRED_LIGHT_PASS";
  PipelineSceneDataView[PipelineSceneDataView["DEFERRED_LIGHT_PASS_SHADER"] = 8] = "DEFERRED_LIGHT_PASS_SHADER";
  PipelineSceneDataView[PipelineSceneDataView["DEFERRED_POST_PASS"] = 9] = "DEFERRED_POST_PASS";
  PipelineSceneDataView[PipelineSceneDataView["DEFERRED_POST_PASS_SHADER"] = 10] = "DEFERRED_POST_PASS_SHADER";
  PipelineSceneDataView[PipelineSceneDataView["COUNT"] = 11] = "COUNT";
})(PipelineSceneDataView || (exports.PipelineSceneDataView = PipelineSceneDataView = {}));

const pipelineSceneDataType = {
  [PipelineSceneDataView.SHADOW]: BufferDataType.UINT32,
  [PipelineSceneDataView.SKYBOX]: BufferDataType.UINT32,
  [PipelineSceneDataView.AMBIENT]: BufferDataType.UINT32,
  [PipelineSceneDataView.FOG]: BufferDataType.UINT32,
  [PipelineSceneDataView.IS_HDR]: BufferDataType.UINT32,
  [PipelineSceneDataView.SHADING_SCALE]: BufferDataType.UINT32,
  [PipelineSceneDataView.FP_SCALE]: BufferDataType.UINT32,
  [PipelineSceneDataView.DEFERRED_LIGHT_PASS]: BufferDataType.UINT32,
  [PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER]: BufferDataType.UINT32,
  [PipelineSceneDataView.DEFERRED_POST_PASS]: BufferDataType.UINT32,
  [PipelineSceneDataView.DEFERRED_POST_PASS_SHADER]: BufferDataType.UINT32,
  [PipelineSceneDataView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const PipelineSceneDataPool = new BufferPool(PoolType.PIPELINE_SCENE_DATA, pipelineSceneDataType, PipelineSceneDataView, 1);
exports.PipelineSceneDataPool = PipelineSceneDataPool;
let LightView;
exports.LightView = LightView;

(function (LightView) {
  LightView[LightView["USE_COLOR_TEMPERATURE"] = 0] = "USE_COLOR_TEMPERATURE";
  LightView[LightView["ILLUMINANCE"] = 1] = "ILLUMINANCE";
  LightView[LightView["NODE"] = 2] = "NODE";
  LightView[LightView["RANGE"] = 3] = "RANGE";
  LightView[LightView["TYPE"] = 4] = "TYPE";
  LightView[LightView["AABB"] = 5] = "AABB";
  LightView[LightView["FRUSTUM"] = 6] = "FRUSTUM";
  LightView[LightView["SIZE"] = 7] = "SIZE";
  LightView[LightView["SPOT_ANGLE"] = 8] = "SPOT_ANGLE";
  LightView[LightView["ASPECT"] = 9] = "ASPECT";
  LightView[LightView["DIRECTION"] = 10] = "DIRECTION";
  LightView[LightView["COLOR"] = 13] = "COLOR";
  LightView[LightView["COLOR_TEMPERATURE_RGB"] = 16] = "COLOR_TEMPERATURE_RGB";
  LightView[LightView["POSITION"] = 19] = "POSITION";
  LightView[LightView["COUNT"] = 22] = "COUNT";
})(LightView || (exports.LightView = LightView = {}));

const lightViewDataType = {
  [LightView.USE_COLOR_TEMPERATURE]: BufferDataType.UINT32,
  [LightView.ILLUMINANCE]: BufferDataType.FLOAT32,
  [LightView.NODE]: BufferDataType.UINT32,
  [LightView.RANGE]: BufferDataType.FLOAT32,
  [LightView.TYPE]: BufferDataType.UINT32,
  [LightView.AABB]: BufferDataType.UINT32,
  [LightView.FRUSTUM]: BufferDataType.UINT32,
  [LightView.SIZE]: BufferDataType.FLOAT32,
  [LightView.SPOT_ANGLE]: BufferDataType.FLOAT32,
  [LightView.ASPECT]: BufferDataType.FLOAT32,
  [LightView.DIRECTION]: BufferDataType.FLOAT32,
  [LightView.COLOR]: BufferDataType.FLOAT32,
  [LightView.COLOR_TEMPERATURE_RGB]: BufferDataType.FLOAT32,
  [LightView.POSITION]: BufferDataType.FLOAT32,
  [LightView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const LightPool = new BufferPool(PoolType.LIGHT, lightViewDataType, LightView, 3);
exports.LightPool = LightPool;
let SphereView;
exports.SphereView = SphereView;

(function (SphereView) {
  SphereView[SphereView["RADIUS"] = 0] = "RADIUS";
  SphereView[SphereView["CENTER"] = 1] = "CENTER";
  SphereView[SphereView["COUNT"] = 4] = "COUNT";
})(SphereView || (exports.SphereView = SphereView = {}));

const sphereViewDataType = {
  [SphereView.RADIUS]: BufferDataType.FLOAT32,
  [SphereView.CENTER]: BufferDataType.FLOAT32,
  [SphereView.COUNT]: BufferDataType.NEVER
}; // @ts-expect-error Don't alloc memory for Vec3, Quat, Mat4 on web, as they are accessed by class member variable.

if (!_internal253Aconstants.JSB) {
  delete SphereView[SphereView.COUNT];
  SphereView[SphereView.COUNT = SphereView.RADIUS + 1] = 'COUNT';
}

const SpherePool = new BufferPool(PoolType.SPHERE, sphereViewDataType, SphereView, 3);
exports.SpherePool = SpherePool;
let FlatBufferView;
exports.FlatBufferView = FlatBufferView;

(function (FlatBufferView) {
  FlatBufferView[FlatBufferView["STRIDE"] = 0] = "STRIDE";
  FlatBufferView[FlatBufferView["AMOUNT"] = 1] = "AMOUNT";
  FlatBufferView[FlatBufferView["BUFFER"] = 2] = "BUFFER";
  FlatBufferView[FlatBufferView["COUNT"] = 3] = "COUNT";
})(FlatBufferView || (exports.FlatBufferView = FlatBufferView = {}));

const flatBufferViewDataType = {
  [FlatBufferView.STRIDE]: BufferDataType.UINT32,
  [FlatBufferView.AMOUNT]: BufferDataType.UINT32,
  [FlatBufferView.BUFFER]: BufferDataType.UINT32,
  [FlatBufferView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const FlatBufferPool = new BufferPool(PoolType.FLAT_BUFFER, flatBufferViewDataType, FlatBufferView, 3);
exports.FlatBufferPool = FlatBufferPool;
let SubMeshView;
exports.SubMeshView = SubMeshView;

(function (SubMeshView) {
  SubMeshView[SubMeshView["FLAT_BUFFER_ARRAY"] = 0] = "FLAT_BUFFER_ARRAY";
  SubMeshView[SubMeshView["COUNT"] = 1] = "COUNT";
})(SubMeshView || (exports.SubMeshView = SubMeshView = {}));

const subMeshViewDataType = {
  [SubMeshView.FLAT_BUFFER_ARRAY]: BufferDataType.UINT32,
  [SubMeshView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const SubMeshPool = new BufferPool(PoolType.SUB_MESH, subMeshViewDataType, SubMeshView, 3);
exports.SubMeshPool = SubMeshPool;
let RasterizerStateView;
exports.RasterizerStateView = RasterizerStateView;

(function (RasterizerStateView) {
  RasterizerStateView[RasterizerStateView["IS_DISCARD"] = 0] = "IS_DISCARD";
  RasterizerStateView[RasterizerStateView["POLYGO_MODEL"] = 1] = "POLYGO_MODEL";
  RasterizerStateView[RasterizerStateView["SHADE_MODEL"] = 2] = "SHADE_MODEL";
  RasterizerStateView[RasterizerStateView["CULL_MODE"] = 3] = "CULL_MODE";
  RasterizerStateView[RasterizerStateView["IS_FRONT_FACE_CCW"] = 4] = "IS_FRONT_FACE_CCW";
  RasterizerStateView[RasterizerStateView["DEPTH_BIAS_ENABLED"] = 5] = "DEPTH_BIAS_ENABLED";
  RasterizerStateView[RasterizerStateView["DEPTH_BIAS"] = 6] = "DEPTH_BIAS";
  RasterizerStateView[RasterizerStateView["DEPTH_BIAS_CLAMP"] = 7] = "DEPTH_BIAS_CLAMP";
  RasterizerStateView[RasterizerStateView["DEPTH_BIAS_SLOP"] = 8] = "DEPTH_BIAS_SLOP";
  RasterizerStateView[RasterizerStateView["IS_DEPTH_CLIP"] = 9] = "IS_DEPTH_CLIP";
  RasterizerStateView[RasterizerStateView["IS_MULTI_SAMPLE"] = 10] = "IS_MULTI_SAMPLE";
  RasterizerStateView[RasterizerStateView["LINE_WIDTH"] = 11] = "LINE_WIDTH";
  RasterizerStateView[RasterizerStateView["COUNT"] = 12] = "COUNT";
})(RasterizerStateView || (exports.RasterizerStateView = RasterizerStateView = {}));

const rasterizerStateViewDataType = {
  [RasterizerStateView.IS_DISCARD]: BufferDataType.UINT32,
  [RasterizerStateView.POLYGO_MODEL]: BufferDataType.UINT32,
  [RasterizerStateView.SHADE_MODEL]: BufferDataType.UINT32,
  [RasterizerStateView.CULL_MODE]: BufferDataType.UINT32,
  [RasterizerStateView.IS_FRONT_FACE_CCW]: BufferDataType.UINT32,
  [RasterizerStateView.DEPTH_BIAS_ENABLED]: BufferDataType.UINT32,
  [RasterizerStateView.DEPTH_BIAS]: BufferDataType.FLOAT32,
  [RasterizerStateView.DEPTH_BIAS_CLAMP]: BufferDataType.FLOAT32,
  [RasterizerStateView.DEPTH_BIAS_SLOP]: BufferDataType.FLOAT32,
  [RasterizerStateView.IS_DEPTH_CLIP]: BufferDataType.UINT32,
  [RasterizerStateView.IS_MULTI_SAMPLE]: BufferDataType.UINT32,
  [RasterizerStateView.LINE_WIDTH]: BufferDataType.FLOAT32,
  [RasterizerStateView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const RasterizerStatePool = new BufferPool(PoolType.RASTERIZER_STATE, rasterizerStateViewDataType, RasterizerStateView, 9);
exports.RasterizerStatePool = RasterizerStatePool;
let DepthStencilStateView;
exports.DepthStencilStateView = DepthStencilStateView;

(function (DepthStencilStateView) {
  DepthStencilStateView[DepthStencilStateView["DEPTH_TEST"] = 0] = "DEPTH_TEST";
  DepthStencilStateView[DepthStencilStateView["DEPTH_WRITE"] = 1] = "DEPTH_WRITE";
  DepthStencilStateView[DepthStencilStateView["DEPTH_FUNC"] = 2] = "DEPTH_FUNC";
  DepthStencilStateView[DepthStencilStateView["STENCIL_TEST_FRONT"] = 3] = "STENCIL_TEST_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_FUNC_FRONT"] = 4] = "STENCIL_FUNC_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_READ_MASK_FRONT"] = 5] = "STENCIL_READ_MASK_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_WRITE_MASK_FRONT"] = 6] = "STENCIL_WRITE_MASK_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_FAIL_OP_FRONT"] = 7] = "STENCIL_FAIL_OP_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_Z_FAIL_OP_FRONT"] = 8] = "STENCIL_Z_FAIL_OP_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_PASS_OP_FRONT"] = 9] = "STENCIL_PASS_OP_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_REF_FRONT"] = 10] = "STENCIL_REF_FRONT";
  DepthStencilStateView[DepthStencilStateView["STENCIL_TEST_BACK"] = 11] = "STENCIL_TEST_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_FUNC_BACK"] = 12] = "STENCIL_FUNC_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_READ_MADK_BACK"] = 13] = "STENCIL_READ_MADK_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_WRITE_MASK_BACK"] = 14] = "STENCIL_WRITE_MASK_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_FAIL_OP_BACK"] = 15] = "STENCIL_FAIL_OP_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_Z_FAIL_OP_BACK"] = 16] = "STENCIL_Z_FAIL_OP_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_PASS_OP_BACK"] = 17] = "STENCIL_PASS_OP_BACK";
  DepthStencilStateView[DepthStencilStateView["STENCIL_REF_BACK"] = 18] = "STENCIL_REF_BACK";
  DepthStencilStateView[DepthStencilStateView["COUNT"] = 19] = "COUNT";
})(DepthStencilStateView || (exports.DepthStencilStateView = DepthStencilStateView = {}));

const depthStencilStateViewDataType = {
  [DepthStencilStateView.DEPTH_TEST]: BufferDataType.UINT32,
  [DepthStencilStateView.DEPTH_WRITE]: BufferDataType.UINT32,
  [DepthStencilStateView.DEPTH_FUNC]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_TEST_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_FUNC_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_READ_MASK_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_WRITE_MASK_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_FAIL_OP_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_Z_FAIL_OP_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_PASS_OP_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_REF_FRONT]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_TEST_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_FUNC_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_READ_MADK_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_WRITE_MASK_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_FAIL_OP_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_Z_FAIL_OP_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_PASS_OP_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.STENCIL_REF_BACK]: BufferDataType.UINT32,
  [DepthStencilStateView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const DepthStencilStatePool = new BufferPool(PoolType.DEPTH_STENCIL_STATE, depthStencilStateViewDataType, DepthStencilStateView, 9);
exports.DepthStencilStatePool = DepthStencilStatePool;
let BlendTargetView;
exports.BlendTargetView = BlendTargetView;

(function (BlendTargetView) {
  BlendTargetView[BlendTargetView["BLEND"] = 0] = "BLEND";
  BlendTargetView[BlendTargetView["BLEND_SRC"] = 1] = "BLEND_SRC";
  BlendTargetView[BlendTargetView["BLEND_DST"] = 2] = "BLEND_DST";
  BlendTargetView[BlendTargetView["BLEND_EQ"] = 3] = "BLEND_EQ";
  BlendTargetView[BlendTargetView["BLEND_SRC_ALPHA"] = 4] = "BLEND_SRC_ALPHA";
  BlendTargetView[BlendTargetView["BLEND_DST_ALPHA"] = 5] = "BLEND_DST_ALPHA";
  BlendTargetView[BlendTargetView["BLEND_ALPHA_EQ"] = 6] = "BLEND_ALPHA_EQ";
  BlendTargetView[BlendTargetView["BLEND_COLOR_MASK"] = 7] = "BLEND_COLOR_MASK";
  BlendTargetView[BlendTargetView["COUNT"] = 8] = "COUNT";
})(BlendTargetView || (exports.BlendTargetView = BlendTargetView = {}));

const blendTargetViewDataType = {
  [BlendTargetView.BLEND]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_SRC]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_DST]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_EQ]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_SRC_ALPHA]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_DST_ALPHA]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_ALPHA_EQ]: BufferDataType.UINT32,
  [BlendTargetView.BLEND_COLOR_MASK]: BufferDataType.UINT32,
  [BlendTargetView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const BlendTargetPool = new BufferPool(PoolType.BLEND_TARGET, depthStencilStateViewDataType, BlendTargetView, 9);
exports.BlendTargetPool = BlendTargetPool;
let BlendStateView;
exports.BlendStateView = BlendStateView;

(function (BlendStateView) {
  BlendStateView[BlendStateView["IS_A2C"] = 0] = "IS_A2C";
  BlendStateView[BlendStateView["IS_INDEPEND"] = 1] = "IS_INDEPEND";
  BlendStateView[BlendStateView["BLEND_COLOR"] = 2] = "BLEND_COLOR";
  BlendStateView[BlendStateView["BLEND_TARGET"] = 6] = "BLEND_TARGET";
  BlendStateView[BlendStateView["COUNT"] = 7] = "COUNT";
})(BlendStateView || (exports.BlendStateView = BlendStateView = {}));

const blendStateViewDataType = {
  [BlendStateView.IS_A2C]: BufferDataType.UINT32,
  [BlendStateView.IS_INDEPEND]: BufferDataType.UINT32,
  [BlendStateView.BLEND_COLOR]: BufferDataType.FLOAT32,
  [BlendStateView.BLEND_TARGET]: BufferDataType.UINT32,
  [BlendStateView.COUNT]: BufferDataType.NEVER
}; // Theoretically we only have to declare the type view here while all the other arguments can be inferred.
// but before the official support of Partial Type Argument Inference releases, (microsoft/TypeScript#26349)
// we'll have to explicitly declare all these types.

const BlendStatePool = new BufferPool(PoolType.BLEND_STATE, blendStateViewDataType, BlendStateView, 9);
exports.BlendStatePool = BlendStatePool;