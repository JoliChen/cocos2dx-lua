"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = exports.ModelType = void 0;

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _index = require("../../geometry/index.js");

var _index2 = require("../../memop/index.js");

var _layers = require("../../scene-graph/layers.js");

var _submodel = require("./submodel.js");

var _pass = require("../core/pass.js");

var _globalExports = require("../../global-exports.js");

var _instancedBuffer = require("../../pipeline/instanced-buffer.js");

var _index3 = require("../../math/index.js");

var _samplerLib = require("../core/sampler-lib.js");

var _memoryPools = require("../core/memory-pools.js");

var _index4 = require("../../gfx/index.js");

var _define = require("../../pipeline/define.js");

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
// Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
const AttrPool = new _memoryPools.ObjectPool(_memoryPools.PoolType.ATTRIBUTE, (_, obj) => obj || new _index4.Attribute());
const m4_1 = new _index3.Mat4();

const _subModelPool = new _index2.Pool(() => new _submodel.SubModel(), 32);

const shadowMapPatches = [{
  name: 'CC_RECEIVE_SHADOW',
  value: true
}];
let ModelType;
exports.ModelType = ModelType;

(function (ModelType) {
  ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
  ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
  ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
  ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
  ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
  ModelType[ModelType["LINE"] = 5] = "LINE";
})(ModelType || (exports.ModelType = ModelType = {}));

function uploadMat4AsVec4x3(mat, v1, v2, v3) {
  v1[0] = mat.m00;
  v1[1] = mat.m01;
  v1[2] = mat.m02;
  v1[3] = mat.m12;
  v2[0] = mat.m04;
  v2[1] = mat.m05;
  v2[2] = mat.m06;
  v2[3] = mat.m13;
  v3[0] = mat.m08;
  v3[1] = mat.m09;
  v3[2] = mat.m10;
  v3[3] = mat.m14;
}

const lightmapSamplerHash = (0, _samplerLib.genSamplerHash)([_index4.Filter.LINEAR, _index4.Filter.LINEAR, _index4.Filter.NONE, _index4.Address.CLAMP, _index4.Address.CLAMP, _index4.Address.CLAMP]);
const lightmapSamplerWithMipHash = (0, _samplerLib.genSamplerHash)([_index4.Filter.LINEAR, _index4.Filter.LINEAR, _index4.Filter.LINEAR, _index4.Address.CLAMP, _index4.Address.CLAMP, _index4.Address.CLAMP]);
/**
 * A representation of a model
 */

class Model {
  get subModels() {
    return this._subModels;
  }

  get inited() {
    return this._inited;
  }

  get worldBounds() {
    return this._worldBounds;
  }

  get modelBounds() {
    return this._modelBounds;
  }

  get localBuffer() {
    return this._localBuffer;
  }

  get updateStamp() {
    return this._updateStamp;
  }

  get isInstancingEnabled() {
    return this._instMatWorldIdx >= 0;
  }

  get receiveShadow() {
    if (_memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.RECEIVE_SHADOW)) {
      return true;
    }

    return false;
  }

  set receiveShadow(val) {
    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.RECEIVE_SHADOW, val ? 1 : 0);

    this.onMacroPatchesStateChanged();
  }

  get castShadow() {
    if (_memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.CAST_SHADOW)) {
      return true;
    }

    return false;
  }

  set castShadow(val) {
    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.CAST_SHADOW, val ? 1 : 0);
  }

  get handle() {
    return this._handle;
  }

  get node() {
    return this._node;
  }

  set node(n) {
    this._node = n;

    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.NODE, n.handle);
  }

  get transform() {
    return this._transform;
  }

  set transform(n) {
    this._transform = n;

    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.TRANSFORM, n.handle);
  }

  get visFlags() {
    return this._visFlags;
  }

  set visFlags(val) {
    this._visFlags = val;

    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.VIS_FLAGS, val);
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(val) {
    this._enabled = val;

    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.ENABLED, val ? 1 : 0);
  }

  /**
   * Setup a default empty model
   */
  constructor() {
    this.type = ModelType.DEFAULT;
    this.scene = null;
    this.isDynamicBatching = false;
    this.instancedAttributes = {
      buffer: null,
      views: [],
      attributes: []
    };
    this._enabled = true;
    this._worldBounds = null;
    this._modelBounds = null;
    this._subModels = [];
    this._node = null;
    this._transform = null;
    this._visFlags = _layers.Layers.Enum.NONE;
    this._device = void 0;
    this._inited = false;
    this._descriptorSetCount = 1;
    this._updateStamp = -1;
    this._transformUpdated = true;
    this._handle = _memoryPools.NULL_HANDLE;
    this._hWorldBounds = _memoryPools.NULL_HANDLE;
    this._localData = new Float32Array(_define.UBOLocal.COUNT);
    this._localBuffer = null;
    this._instMatWorldIdx = -1;
    this._lightmap = null;
    this._lightmapUVParam = new _index3.Vec4();
    this._device = _globalExports.legacyCC.director.root.device;
  }

  initialize() {
    if (!this._inited) {
      this._handle = _memoryPools.ModelPool.alloc();

      const hSubModelArray = _memoryPools.SubModelArrayPool.alloc();

      const hInstancedAttrArray = _memoryPools.AttributeArrayPool.alloc();

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.INSTANCED_ATTR_ARRAY, hInstancedAttrArray);

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.SUB_MODEL_ARRAY, hSubModelArray);

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.VIS_FLAGS, _layers.Layers.Enum.NONE);

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.ENABLED, 1);

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.RECEIVE_SHADOW, 1);

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.CAST_SHADOW, 0);

      this._inited = true;
    }
  }

  destroy() {
    const subModels = this._subModels;

    for (let i = 0; i < subModels.length; i++) {
      const subModel = this._subModels[i];
      subModel.destroy();

      _subModelPool.free(subModel);
    }

    if (this._localBuffer) {
      this._localBuffer.destroy();

      this._localBuffer = null;
    }

    this._worldBounds = null;
    this._modelBounds = null;
    this._subModels.length = 0;
    this._inited = false;
    this._transformUpdated = true;
    this._transform = null;
    this._node = null;
    this.isDynamicBatching = false;

    if (this._handle) {
      const hSubModelArray = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.SUB_MODEL_ARRAY); // don't free submodel handles here since they are just references


      if (hSubModelArray) _memoryPools.SubModelArrayPool.free(hSubModelArray);

      const hOldBuffer = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.INSTANCED_BUFFER);

      if (hOldBuffer) _memoryPools.RawBufferPool.free(hOldBuffer);

      const hAttrArray = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.INSTANCED_ATTR_ARRAY);

      if (hAttrArray) (0, _memoryPools.freeHandleArray)(hAttrArray, _memoryPools.AttributeArrayPool, AttrPool);

      _memoryPools.ModelPool.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }

    if (this._hWorldBounds) {
      _memoryPools.AABBPool.free(this._hWorldBounds);

      this._hWorldBounds = _memoryPools.NULL_HANDLE;
    }
  }

  attachToScene(scene) {
    this.scene = scene;
  }

  detachFromScene() {
    this.scene = null;
  }

  updateTransform(stamp) {
    const node = this.transform; // @ts-expect-error TS2445

    if (node.hasChangedFlags || node._dirtyFlags) {
      node.updateWorldTransform();
      this._transformUpdated = true;
      const worldBounds = this._worldBounds;

      if (this._modelBounds && worldBounds) {
        // @ts-expect-error TS2445
        this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

        _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.CENTER, worldBounds.center);

        _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.HALF_EXTENSION, worldBounds.halfExtents);
      }
    }
  }

  updateWorldBound() {
    const node = this.transform;

    if (node !== null) {
      node.updateWorldTransform();
      this._transformUpdated = true;
      const worldBounds = this._worldBounds;

      if (this._modelBounds && worldBounds) {
        // @ts-expect-error TS2445
        this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

        _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.CENTER, worldBounds.center);

        _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.HALF_EXTENSION, worldBounds.halfExtents);
      }
    }
  }

  updateUBOs(stamp) {
    const subModels = this._subModels;

    for (let i = 0; i < subModels.length; i++) {
      subModels[i].update();
    }

    this._updateStamp = stamp;

    if (!this._transformUpdated) {
      return;
    }

    this._transformUpdated = false; // @ts-expect-error using private members here for efficiency

    const worldMatrix = this.transform._mat;
    const idx = this._instMatWorldIdx;

    if (idx >= 0) {
      const attrs = this.instancedAttributes.views;
      uploadMat4AsVec4x3(worldMatrix, attrs[idx], attrs[idx + 1], attrs[idx + 2]);
    } else if (this._localBuffer) {
      _index3.Mat4.toArray(this._localData, worldMatrix, _define.UBOLocal.MAT_WORLD_OFFSET);

      _index3.Mat4.inverseTranspose(m4_1, worldMatrix);

      _index3.Mat4.toArray(this._localData, m4_1, _define.UBOLocal.MAT_WORLD_IT_OFFSET);

      this._localBuffer.update(this._localData);
    }
  }
  /**
   * Create the bounding shape of this model
   * @param minPos the min position of the model
   * @param maxPos the max position of the model
   */


  createBoundingShape(minPos, maxPos) {
    if (!minPos || !maxPos) {
      return;
    }

    this._modelBounds = _index.AABB.fromPoints(_index.AABB.create(), minPos, maxPos);
    this._worldBounds = _index.AABB.clone(this._modelBounds);

    if (this._hWorldBounds === _memoryPools.NULL_HANDLE) {
      this._hWorldBounds = _memoryPools.AABBPool.alloc();

      _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.WORLD_BOUNDS, this._hWorldBounds);
    }

    _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.CENTER, this._worldBounds.center);

    _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.HALF_EXTENSION, this._worldBounds.halfExtents);
  }

  initSubModel(idx, subMeshData, mat) {
    this.initialize();
    let isNewSubModel = false;

    if (this._subModels[idx] == null) {
      this._subModels[idx] = _subModelPool.alloc();
      isNewSubModel = true;
    } else {
      this._subModels[idx].destroy();
    }

    this._subModels[idx].initialize(subMeshData, mat.passes, this.getMacroPatches(idx)); // This is a temporary solution
    // It should not be written in a fixed way, or modified by the user


    this._subModels[idx].initPlanarShadowShader();

    this._subModels[idx].initPlanarShadowInstanceShader();

    this._updateAttributesAndBinding(idx);

    if (isNewSubModel) {
      const hSubModelArray = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.SUB_MODEL_ARRAY);

      _memoryPools.SubModelArrayPool.assign(hSubModelArray, idx, this._subModels[idx].handle);
    }
  }

  setSubModelMesh(idx, subMesh) {
    if (!this._subModels[idx]) {
      return;
    }

    this._subModels[idx].subMesh = subMesh;
  }

  setSubModelMaterial(idx, mat) {
    if (!this._subModels[idx]) {
      return;
    }

    this._subModels[idx].passes = mat.passes;

    this._updateAttributesAndBinding(idx);
  }

  onGlobalPipelineStateChanged() {
    const subModels = this._subModels;

    for (let i = 0; i < subModels.length; i++) {
      subModels[i].onPipelineStateChanged();
    }
  }

  onMacroPatchesStateChanged() {
    const subModels = this._subModels;

    for (let i = 0; i < subModels.length; i++) {
      subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
    }
  }

  updateLightingmap(texture, uvParam) {
    _index3.Vec4.toArray(this._localData, uvParam, _define.UBOLocal.LIGHTINGMAP_UVPARAM);

    this._lightmap = texture;
    this._lightmapUVParam = uvParam;

    if (texture === null) {
      texture = _builtinResMgr.builtinResMgr.get('empty-texture');
    }

    const gfxTexture = texture.getGFXTexture();

    if (gfxTexture) {
      const sampler = _samplerLib.samplerLib.getSampler(this._device, texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);

      const subModels = this._subModels;

      for (let i = 0; i < subModels.length; i++) {
        const {
          descriptorSet
        } = subModels[i]; // TODO: should manage lightmap macro switches automatically
        // USE_LIGHTMAP -> CC_USE_LIGHTMAP

        descriptorSet.bindTexture(_define.UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
        descriptorSet.bindSampler(_define.UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
        descriptorSet.update();
      }
    }
  }

  getMacroPatches(subModelIndex) {
    return this.receiveShadow ? shadowMapPatches : null;
  }

  _updateAttributesAndBinding(subModelIndex) {
    const subModel = this._subModels[subModelIndex];

    if (!subModel) {
      return;
    }

    this._initLocalDescriptors(subModelIndex);

    this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

    const shader = _memoryPools.ShaderPool.get(_memoryPools.SubModelPool.get(subModel.handle, _memoryPools.SubModelView.SHADER_0));

    this._updateInstancedAttributes(shader.attributes, subModel.passes[0]);
  }

  _getInstancedAttributeIndex(name) {
    const {
      attributes
    } = this.instancedAttributes;

    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].name === name) {
        return i;
      }
    }

    return -1;
  } // sub-classes can override the following functions if needed
  // for now no submodel level instancing attributes


  _updateInstancedAttributes(attributes, pass) {
    if (!pass.device.hasFeature(_index4.Feature.INSTANCED_ARRAYS)) {
      return;
    } // free old data


    const hOldBuffer = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.INSTANCED_BUFFER);

    if (hOldBuffer) _memoryPools.RawBufferPool.free(hOldBuffer);

    const hAttrArray = _memoryPools.ModelPool.get(this._handle, _memoryPools.ModelView.INSTANCED_ATTR_ARRAY);

    if (hAttrArray) (0, _memoryPools.freeHandleArray)(hAttrArray, _memoryPools.AttributeArrayPool, AttrPool, false);
    let size = 0;

    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j];

      if (!attribute.isInstanced) {
        continue;
      }

      size += _index4.FormatInfos[attribute.format].size;
    }

    const hBuffer = _memoryPools.RawBufferPool.alloc(size);

    const buffer = _memoryPools.RawBufferPool.getBuffer(hBuffer);

    _memoryPools.ModelPool.set(this._handle, _memoryPools.ModelView.INSTANCED_BUFFER, hBuffer);

    const attrs = this.instancedAttributes;
    attrs.buffer = new Uint8Array(buffer);
    attrs.views.length = attrs.attributes.length = 0;
    let offset = 0;

    for (let j = 0; j < attributes.length; j++) {
      const attribute = attributes[j];

      if (!attribute.isInstanced) {
        continue;
      }

      const hAttr = AttrPool.alloc();
      const attr = AttrPool.get(hAttr);
      attr.format = attribute.format;
      attr.name = attribute.name;
      attr.isNormalized = attribute.isNormalized;
      attr.location = attribute.location;
      attrs.attributes.push(attr);

      _memoryPools.AttributeArrayPool.push(hAttrArray, hAttr);

      const info = _index4.FormatInfos[attribute.format];
      attrs.views.push(new ((0, _index4.getTypedArrayConstructor)(info))(buffer, offset, info.count));
      offset += info.size;
    }

    if (pass.batchingScheme === _pass.BatchingSchemes.INSTANCING) {
      _instancedBuffer.InstancedBuffer.get(pass).destroy();
    } // instancing IA changed


    this._instMatWorldIdx = this._getInstancedAttributeIndex(_define.INST_MAT_WORLD);
    this._transformUpdated = true;
  }

  _initLocalDescriptors(subModelIndex) {
    if (!this._localBuffer) {
      this._localBuffer = this._device.createBuffer(new _index4.BufferInfo(_index4.BufferUsageBit.UNIFORM | _index4.BufferUsageBit.TRANSFER_DST, _index4.MemoryUsageBit.HOST | _index4.MemoryUsageBit.DEVICE, _define.UBOLocal.SIZE, _define.UBOLocal.SIZE));
    }
  }

  _updateLocalDescriptors(subModelIndex, descriptorSet) {
    if (this._localBuffer) descriptorSet.bindBuffer(_define.UBOLocal.BINDING, this._localBuffer);
  }

}

exports.Model = Model;