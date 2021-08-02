System.register("q-bundled:///fs/cocos/core/renderer/scene/model.js", ["../../builtin/builtin-res-mgr.js", "../../geometry/index.js", "../../memop/index.js", "../../scene-graph/layers.js", "./submodel.js", "../core/pass.js", "../../global-exports.js", "../../pipeline/instanced-buffer.js", "../../math/index.js", "../core/sampler-lib.js", "../core/memory-pools.js", "../../gfx/index.js", "../../pipeline/define.js"], function (_export, _context) {
  "use strict";

  var builtinResMgr, AABB, Pool, Layers, SubModel, BatchingSchemes, legacyCC, InstancedBuffer, Mat4, Vec4, genSamplerHash, samplerLib, ShaderPool, SubModelPool, SubModelView, SubModelArrayPool, ModelPool, ModelView, AABBPool, AABBView, NULL_HANDLE, AttributeArrayPool, RawBufferPool, freeHandleArray, ObjectPool, PoolType, Attribute, BufferInfo, getTypedArrayConstructor, BufferUsageBit, FormatInfos, MemoryUsageBit, Filter, Address, Feature, INST_MAT_WORLD, UBOLocal, UNIFORM_LIGHTMAP_TEXTURE_BINDING, AttrPool, m4_1, _subModelPool, shadowMapPatches, ModelType, lightmapSamplerHash, lightmapSamplerWithMipHash, Model;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

  _export("ModelType", void 0);

  return {
    setters: [function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }, function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_submodelJs) {
      SubModel = _submodelJs.SubModel;
    }, function (_corePassJs) {
      BatchingSchemes = _corePassJs.BatchingSchemes;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_pipelineInstancedBufferJs) {
      InstancedBuffer = _pipelineInstancedBufferJs.InstancedBuffer;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_coreSamplerLibJs) {
      genSamplerHash = _coreSamplerLibJs.genSamplerHash;
      samplerLib = _coreSamplerLibJs.samplerLib;
    }, function (_coreMemoryPoolsJs) {
      ShaderPool = _coreMemoryPoolsJs.ShaderPool;
      SubModelPool = _coreMemoryPoolsJs.SubModelPool;
      SubModelView = _coreMemoryPoolsJs.SubModelView;
      SubModelArrayPool = _coreMemoryPoolsJs.SubModelArrayPool;
      ModelPool = _coreMemoryPoolsJs.ModelPool;
      ModelView = _coreMemoryPoolsJs.ModelView;
      AABBPool = _coreMemoryPoolsJs.AABBPool;
      AABBView = _coreMemoryPoolsJs.AABBView;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      AttributeArrayPool = _coreMemoryPoolsJs.AttributeArrayPool;
      RawBufferPool = _coreMemoryPoolsJs.RawBufferPool;
      freeHandleArray = _coreMemoryPoolsJs.freeHandleArray;
      ObjectPool = _coreMemoryPoolsJs.ObjectPool;
      PoolType = _coreMemoryPoolsJs.PoolType;
    }, function (_gfxIndexJs) {
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      getTypedArrayConstructor = _gfxIndexJs.getTypedArrayConstructor;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      FormatInfos = _gfxIndexJs.FormatInfos;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      Filter = _gfxIndexJs.Filter;
      Address = _gfxIndexJs.Address;
      Feature = _gfxIndexJs.Feature;
    }, function (_pipelineDefineJs) {
      INST_MAT_WORLD = _pipelineDefineJs.INST_MAT_WORLD;
      UBOLocal = _pipelineDefineJs.UBOLocal;
      UNIFORM_LIGHTMAP_TEXTURE_BINDING = _pipelineDefineJs.UNIFORM_LIGHTMAP_TEXTURE_BINDING;
    }],
    execute: function () {
      AttrPool = new ObjectPool(PoolType.ATTRIBUTE, function (_, obj) {
        return obj || new Attribute();
      });
      m4_1 = new Mat4();
      _subModelPool = new Pool(function () {
        return new SubModel();
      }, 32);
      shadowMapPatches = [{
        name: 'CC_RECEIVE_SHADOW',
        value: true
      }];

      (function (ModelType) {
        ModelType[ModelType["DEFAULT"] = 0] = "DEFAULT";
        ModelType[ModelType["SKINNING"] = 1] = "SKINNING";
        ModelType[ModelType["BAKED_SKINNING"] = 2] = "BAKED_SKINNING";
        ModelType[ModelType["BATCH_2D"] = 3] = "BATCH_2D";
        ModelType[ModelType["PARTICLE_BATCH"] = 4] = "PARTICLE_BATCH";
        ModelType[ModelType["LINE"] = 5] = "LINE";
      })(ModelType || _export("ModelType", ModelType = {}));

      lightmapSamplerHash = genSamplerHash([Filter.LINEAR, Filter.LINEAR, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP]);
      lightmapSamplerWithMipHash = genSamplerHash([Filter.LINEAR, Filter.LINEAR, Filter.LINEAR, Address.CLAMP, Address.CLAMP, Address.CLAMP]);
      /**
       * A representation of a model
       */

      _export("Model", Model = /*#__PURE__*/function () {
        /**
         * Setup a default empty model
         */
        function Model() {
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
          this._visFlags = Layers.Enum.NONE;
          this._device = void 0;
          this._inited = false;
          this._descriptorSetCount = 1;
          this._updateStamp = -1;
          this._transformUpdated = true;
          this._handle = NULL_HANDLE;
          this._hWorldBounds = NULL_HANDLE;
          this._localData = new Float32Array(UBOLocal.COUNT);
          this._localBuffer = null;
          this._instMatWorldIdx = -1;
          this._lightmap = null;
          this._lightmapUVParam = new Vec4();
          this._device = legacyCC.director.root.device;
        }

        var _proto = Model.prototype;

        _proto.initialize = function initialize() {
          if (!this._inited) {
            this._handle = ModelPool.alloc();
            var hSubModelArray = SubModelArrayPool.alloc();
            var hInstancedAttrArray = AttributeArrayPool.alloc();
            ModelPool.set(this._handle, ModelView.INSTANCED_ATTR_ARRAY, hInstancedAttrArray);
            ModelPool.set(this._handle, ModelView.SUB_MODEL_ARRAY, hSubModelArray);
            ModelPool.set(this._handle, ModelView.VIS_FLAGS, Layers.Enum.NONE);
            ModelPool.set(this._handle, ModelView.ENABLED, 1);
            ModelPool.set(this._handle, ModelView.RECEIVE_SHADOW, 1);
            ModelPool.set(this._handle, ModelView.CAST_SHADOW, 0);
            this._inited = true;
          }
        };

        _proto.destroy = function destroy() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            var subModel = this._subModels[i];
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
            var hSubModelArray = ModelPool.get(this._handle, ModelView.SUB_MODEL_ARRAY); // don't free submodel handles here since they are just references

            if (hSubModelArray) SubModelArrayPool.free(hSubModelArray);
            var hOldBuffer = ModelPool.get(this._handle, ModelView.INSTANCED_BUFFER);
            if (hOldBuffer) RawBufferPool.free(hOldBuffer);
            var hAttrArray = ModelPool.get(this._handle, ModelView.INSTANCED_ATTR_ARRAY);
            if (hAttrArray) freeHandleArray(hAttrArray, AttributeArrayPool, AttrPool);
            ModelPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }

          if (this._hWorldBounds) {
            AABBPool.free(this._hWorldBounds);
            this._hWorldBounds = NULL_HANDLE;
          }
        };

        _proto.attachToScene = function attachToScene(scene) {
          this.scene = scene;
        };

        _proto.detachFromScene = function detachFromScene() {
          this.scene = null;
        };

        _proto.updateTransform = function updateTransform(stamp) {
          var node = this.transform; // @ts-expect-error TS2445

          if (node.hasChangedFlags || node._dirtyFlags) {
            node.updateWorldTransform();
            this._transformUpdated = true;
            var worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

              AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
              AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
            }
          }
        };

        _proto.updateWorldBound = function updateWorldBound() {
          var node = this.transform;

          if (node !== null) {
            node.updateWorldTransform();
            this._transformUpdated = true;
            var worldBounds = this._worldBounds;

            if (this._modelBounds && worldBounds) {
              // @ts-expect-error TS2445
              this._modelBounds.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

              AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
              AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
            }
          }
        };

        _proto.updateUBOs = function updateUBOs(stamp) {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].update();
          }

          this._updateStamp = stamp;

          if (!this._transformUpdated) {
            return;
          }

          this._transformUpdated = false; // @ts-expect-error using private members here for efficiency

          var worldMatrix = this.transform._mat;
          var idx = this._instMatWorldIdx;

          if (idx >= 0) {
            var attrs = this.instancedAttributes.views;
            uploadMat4AsVec4x3(worldMatrix, attrs[idx], attrs[idx + 1], attrs[idx + 2]);
          } else if (this._localBuffer) {
            Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
            Mat4.inverseTranspose(m4_1, worldMatrix);
            Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

            this._localBuffer.update(this._localData);
          }
        }
        /**
         * Create the bounding shape of this model
         * @param minPos the min position of the model
         * @param maxPos the max position of the model
         */
        ;

        _proto.createBoundingShape = function createBoundingShape(minPos, maxPos) {
          if (!minPos || !maxPos) {
            return;
          }

          this._modelBounds = AABB.fromPoints(AABB.create(), minPos, maxPos);
          this._worldBounds = AABB.clone(this._modelBounds);

          if (this._hWorldBounds === NULL_HANDLE) {
            this._hWorldBounds = AABBPool.alloc();
            ModelPool.set(this._handle, ModelView.WORLD_BOUNDS, this._hWorldBounds);
          }

          AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, this._worldBounds.center);
          AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, this._worldBounds.halfExtents);
        };

        _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
          this.initialize();
          var isNewSubModel = false;

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
            var hSubModelArray = ModelPool.get(this._handle, ModelView.SUB_MODEL_ARRAY);
            SubModelArrayPool.assign(hSubModelArray, idx, this._subModels[idx].handle);
          }
        };

        _proto.setSubModelMesh = function setSubModelMesh(idx, subMesh) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].subMesh = subMesh;
        };

        _proto.setSubModelMaterial = function setSubModelMaterial(idx, mat) {
          if (!this._subModels[idx]) {
            return;
          }

          this._subModels[idx].passes = mat.passes;

          this._updateAttributesAndBinding(idx);
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].onPipelineStateChanged();
          }
        };

        _proto.onMacroPatchesStateChanged = function onMacroPatchesStateChanged() {
          var subModels = this._subModels;

          for (var i = 0; i < subModels.length; i++) {
            subModels[i].onMacroPatchesStateChanged(this.getMacroPatches(i));
          }
        };

        _proto.updateLightingmap = function updateLightingmap(texture, uvParam) {
          Vec4.toArray(this._localData, uvParam, UBOLocal.LIGHTINGMAP_UVPARAM);
          this._lightmap = texture;
          this._lightmapUVParam = uvParam;

          if (texture === null) {
            texture = builtinResMgr.get('empty-texture');
          }

          var gfxTexture = texture.getGFXTexture();

          if (gfxTexture) {
            var sampler = samplerLib.getSampler(this._device, texture.mipmaps.length > 1 ? lightmapSamplerWithMipHash : lightmapSamplerHash);
            var subModels = this._subModels;

            for (var i = 0; i < subModels.length; i++) {
              var descriptorSet = subModels[i].descriptorSet; // TODO: should manage lightmap macro switches automatically
              // USE_LIGHTMAP -> CC_USE_LIGHTMAP

              descriptorSet.bindTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING, gfxTexture);
              descriptorSet.bindSampler(UNIFORM_LIGHTMAP_TEXTURE_BINDING, sampler);
              descriptorSet.update();
            }
          }
        };

        _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
          return this.receiveShadow ? shadowMapPatches : null;
        };

        _proto._updateAttributesAndBinding = function _updateAttributesAndBinding(subModelIndex) {
          var subModel = this._subModels[subModelIndex];

          if (!subModel) {
            return;
          }

          this._initLocalDescriptors(subModelIndex);

          this._updateLocalDescriptors(subModelIndex, subModel.descriptorSet);

          var shader = ShaderPool.get(SubModelPool.get(subModel.handle, SubModelView.SHADER_0));

          this._updateInstancedAttributes(shader.attributes, subModel.passes[0]);
        };

        _proto._getInstancedAttributeIndex = function _getInstancedAttributeIndex(name) {
          var attributes = this.instancedAttributes.attributes;

          for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].name === name) {
              return i;
            }
          }

          return -1;
        } // sub-classes can override the following functions if needed
        // for now no submodel level instancing attributes
        ;

        _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
          if (!pass.device.hasFeature(Feature.INSTANCED_ARRAYS)) {
            return;
          } // free old data


          var hOldBuffer = ModelPool.get(this._handle, ModelView.INSTANCED_BUFFER);
          if (hOldBuffer) RawBufferPool.free(hOldBuffer);
          var hAttrArray = ModelPool.get(this._handle, ModelView.INSTANCED_ATTR_ARRAY);
          if (hAttrArray) freeHandleArray(hAttrArray, AttributeArrayPool, AttrPool, false);
          var size = 0;

          for (var j = 0; j < attributes.length; j++) {
            var attribute = attributes[j];

            if (!attribute.isInstanced) {
              continue;
            }

            size += FormatInfos[attribute.format].size;
          }

          var hBuffer = RawBufferPool.alloc(size);
          var buffer = RawBufferPool.getBuffer(hBuffer);
          ModelPool.set(this._handle, ModelView.INSTANCED_BUFFER, hBuffer);
          var attrs = this.instancedAttributes;
          attrs.buffer = new Uint8Array(buffer);
          attrs.views.length = attrs.attributes.length = 0;
          var offset = 0;

          for (var _j = 0; _j < attributes.length; _j++) {
            var _attribute = attributes[_j];

            if (!_attribute.isInstanced) {
              continue;
            }

            var hAttr = AttrPool.alloc();
            var attr = AttrPool.get(hAttr);
            attr.format = _attribute.format;
            attr.name = _attribute.name;
            attr.isNormalized = _attribute.isNormalized;
            attr.location = _attribute.location;
            attrs.attributes.push(attr);
            AttributeArrayPool.push(hAttrArray, hAttr);
            var info = FormatInfos[_attribute.format];
            attrs.views.push(new (getTypedArrayConstructor(info))(buffer, offset, info.count));
            offset += info.size;
          }

          if (pass.batchingScheme === BatchingSchemes.INSTANCING) {
            InstancedBuffer.get(pass).destroy();
          } // instancing IA changed


          this._instMatWorldIdx = this._getInstancedAttributeIndex(INST_MAT_WORLD);
          this._transformUpdated = true;
        };

        _proto._initLocalDescriptors = function _initLocalDescriptors(subModelIndex) {
          if (!this._localBuffer) {
            this._localBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
          }
        };

        _proto._updateLocalDescriptors = function _updateLocalDescriptors(subModelIndex, descriptorSet) {
          if (this._localBuffer) descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);
        };

        _createClass(Model, [{
          key: "subModels",
          get: function get() {
            return this._subModels;
          }
        }, {
          key: "inited",
          get: function get() {
            return this._inited;
          }
        }, {
          key: "worldBounds",
          get: function get() {
            return this._worldBounds;
          }
        }, {
          key: "modelBounds",
          get: function get() {
            return this._modelBounds;
          }
        }, {
          key: "localBuffer",
          get: function get() {
            return this._localBuffer;
          }
        }, {
          key: "updateStamp",
          get: function get() {
            return this._updateStamp;
          }
        }, {
          key: "isInstancingEnabled",
          get: function get() {
            return this._instMatWorldIdx >= 0;
          }
        }, {
          key: "receiveShadow",
          get: function get() {
            if (ModelPool.get(this._handle, ModelView.RECEIVE_SHADOW)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ModelPool.set(this._handle, ModelView.RECEIVE_SHADOW, val ? 1 : 0);
            this.onMacroPatchesStateChanged();
          }
        }, {
          key: "castShadow",
          get: function get() {
            if (ModelPool.get(this._handle, ModelView.CAST_SHADOW)) {
              return true;
            }

            return false;
          },
          set: function set(val) {
            ModelPool.set(this._handle, ModelView.CAST_SHADOW, val ? 1 : 0);
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(n) {
            this._node = n;
            ModelPool.set(this._handle, ModelView.NODE, n.handle);
          }
        }, {
          key: "transform",
          get: function get() {
            return this._transform;
          },
          set: function set(n) {
            this._transform = n;
            ModelPool.set(this._handle, ModelView.TRANSFORM, n.handle);
          }
        }, {
          key: "visFlags",
          get: function get() {
            return this._visFlags;
          },
          set: function set(val) {
            this._visFlags = val;
            ModelPool.set(this._handle, ModelView.VIS_FLAGS, val);
          }
        }, {
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set: function set(val) {
            this._enabled = val;
            ModelPool.set(this._handle, ModelView.ENABLED, val ? 1 : 0);
          }
        }]);

        return Model;
      }());
    }
  };
});