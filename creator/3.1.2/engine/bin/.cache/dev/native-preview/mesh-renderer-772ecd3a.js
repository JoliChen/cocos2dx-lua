System.register(['./shadows-72f55b4d.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './mesh-a2fd8333.js'], function (exports) {
    'use strict';
    var _inheritsLoose, Enum, ccclass, formerlySerializedAs, _createClass, _applyDecoratedDescriptor, editable, type, tooltip, visible, executeInEditMode, legacyCC, TransformBit, builtinResMgr, assertIsTrue, disallowAnimation, _initializerDefineProperty, serializable, Vec4, help, executionOrder, menu, _assertThisInitialized, Model, RenderableComponent, Mesh;
    return {
        setters: [function (module) {
            _inheritsLoose = module.et;
            Enum = module.dy;
            ccclass = module.es;
            formerlySerializedAs = module.gx;
            _createClass = module.eu;
            _applyDecoratedDescriptor = module.ev;
            editable = module.ez;
            type = module.ey;
            tooltip = module.fX;
            visible = module.eB;
            executeInEditMode = module.fZ;
            legacyCC = module.l;
            TransformBit = module.f_;
            builtinResMgr = module.eq;
            assertIsTrue = module.gf;
            disallowAnimation = module.gy;
            _initializerDefineProperty = module.eH;
            serializable = module.eI;
            Vec4 = module.c_;
            help = module.f$;
            executionOrder = module.gi;
            menu = module.g0;
            _assertThisInitialized = module.eL;
        }, function (module) {
            Model = module.i;
            RenderableComponent = module.m;
        }, function () {}, function () {}, function (module) {
            Mesh = module.M;
        }],
        execute: function () {

            var MorphModel = exports('a', function (_Model) {
              _inheritsLoose(MorphModel, _Model);

              function MorphModel() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Model.call.apply(_Model, [this].concat(args)) || this;
                _this._morphRenderingInstance = null;
                _this._usedMaterials = new Set();
                return _this;
              }

              var _proto = MorphModel.prototype;

              _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
                if (this._morphRenderingInstance) {
                  return this._morphRenderingInstance.requiredPatches(subModelIndex);
                } else {
                  return null;
                }
              };

              _proto.initSubModel = function initSubModel(subModelIndex, subMeshData, material) {
                return _Model.prototype.initSubModel.call(this, subModelIndex, subMeshData, this._launderMaterial(material));
              };

              _proto.destroy = function destroy() {
                _Model.prototype.destroy.call(this);

                this._morphRenderingInstance = null;
              };

              _proto.setSubModelMaterial = function setSubModelMaterial(subModelIndex, material) {
                return _Model.prototype.setSubModelMaterial.call(this, subModelIndex, this._launderMaterial(material));
              };

              _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
                _Model.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

                if (this._morphRenderingInstance) {
                  this._morphRenderingInstance.adaptPipelineState(submodelIdx, descriptorSet);
                }
              };

              _proto._launderMaterial = function _launderMaterial(material) {
                return material;
              };

              _proto.setMorphRendering = function setMorphRendering(morphRendering) {
                this._morphRenderingInstance = morphRendering;
              };

              return MorphModel;
            }(Model));

            var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class6, _temp2;
            var ModelShadowCastingMode = Enum({
              OFF: 0,
              ON: 1
            });
            var ModelShadowReceivingMode = Enum({
              OFF: 0,
              ON: 1
            });
            var ModelLightmapSettings = (_dec = ccclass('cc.ModelLightmapSettings'), _dec2 = formerlySerializedAs('_recieveShadow'), _dec(_class = (_class2 = (_temp = function () {
              function ModelLightmapSettings() {
                _initializerDefineProperty(this, "texture", _descriptor, this);

                _initializerDefineProperty(this, "uvParam", _descriptor2, this);

                _initializerDefineProperty(this, "_bakeable", _descriptor3, this);

                _initializerDefineProperty(this, "_castShadow", _descriptor4, this);

                _initializerDefineProperty(this, "_receiveShadow", _descriptor5, this);

                _initializerDefineProperty(this, "_lightmapSize", _descriptor6, this);
              }

              _createClass(ModelLightmapSettings, [{
                key: "bakeable",
                get: function get() {
                  return this._bakeable;
                },
                set: function set(val) {
                  this._bakeable = val;
                }
              }, {
                key: "castShadow",
                get: function get() {
                  return this._castShadow;
                },
                set: function set(val) {
                  this._castShadow = val;
                }
              }, {
                key: "receiveShadow",
                get: function get() {
                  return this._receiveShadow;
                },
                set: function set(val) {
                  this._receiveShadow = val;
                }
              }, {
                key: "lightmapSize",
                get: function get() {
                  return this._lightmapSize;
                },
                set: function set(val) {
                  this._lightmapSize = val;
                }
              }]);

              return ModelLightmapSettings;
            }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "texture", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uvParam", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec4();
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_bakeable", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_castShadow", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_receiveShadow", [_dec2], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_lightmapSize", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 64;
              }
            }), _applyDecoratedDescriptor(_class2.prototype, "bakeable", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "bakeable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "castShadow", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "castShadow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "receiveShadow", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "receiveShadow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lightmapSize", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "lightmapSize"), _class2.prototype)), _class2)) || _class);
            var MeshRenderer = exports('M', (_dec3 = ccclass('cc.MeshRenderer'), _dec4 = help('i18n:cc.MeshRenderer'), _dec5 = executionOrder(100), _dec6 = menu('Mesh/MeshRenderer'), _dec7 = type(ModelShadowCastingMode), _dec8 = tooltip('i18n:model.shadow_casting_model'), _dec9 = type(ModelShadowReceivingMode), _dec10 = tooltip('i18n:model.shadow_receiving_model'), _dec11 = type(Mesh), _dec12 = tooltip('i18n:model.mesh'), _dec13 = visible(function () {
              return !!(this.mesh && this.mesh.struct.morph && this.mesh.struct.morph.subMeshMorphs.some(function (subMeshMorph) {
                return !!subMeshMorph;
              }));
            }), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = _dec6(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = _class6 = function (_RenderableComponent) {
              _inheritsLoose(MeshRenderer, _RenderableComponent);

              function MeshRenderer() {
                var _this;

                _this = _RenderableComponent.call(this) || this;

                _initializerDefineProperty(_this, "lightmapSettings", _descriptor7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_mesh", _descriptor8, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_shadowCastingMode", _descriptor9, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_shadowReceivingMode", _descriptor10, _assertThisInitialized(_this));

                _this._modelType = void 0;
                _this._model = null;
                _this._morphInstance = null;

                _initializerDefineProperty(_this, "_enableMorph", _descriptor11, _assertThisInitialized(_this));

                _this._modelType = Model;
                return _this;
              }

              var _proto = MeshRenderer.prototype;

              _proto.onLoad = function onLoad() {
                if (this._mesh) {
                  this._mesh.initialize();
                }

                this._watchMorphInMesh();

                this._updateModels();

                this._updateCastShadow();

                this._updateReceiveShadow();
              };

              _proto.onRestore = function onRestore() {
                this._updateModels();

                this._updateCastShadow();

                this._updateReceiveShadow();
              };

              _proto.onEnable = function onEnable() {
                if (!this._model) {
                  this._updateModels();
                }

                this._attachToScene();
              };

              _proto.onDisable = function onDisable() {
                if (this._model) {
                  this._detachFromScene();
                }
              };

              _proto.onDestroy = function onDestroy() {
                if (this._model) {
                  legacyCC.director.root.destroyModel(this._model);
                  this._model = null;
                  this._models.length = 0;
                }

                if (this._morphInstance) {
                  this._morphInstance.destroy();
                }
              };

              _proto.setWeights = function setWeights(weights, subMeshIndex) {
                if (this._morphInstance) {
                  this._morphInstance.setWeights(subMeshIndex, weights);
                }
              };

              _proto.setInstancedAttribute = function setInstancedAttribute(name, value) {
                if (!this.model) {
                  return;
                }

                var _this$model$instanced = this.model.instancedAttributes,
                    attributes = _this$model$instanced.attributes,
                    views = _this$model$instanced.views;

                for (var i = 0; i < attributes.length; i++) {
                  if (attributes[i].name === name) {
                    views[i].set(value);
                    break;
                  }
                }
              };

              _proto._updateLightmap = function _updateLightmap(lightmap, uOff, vOff, uScale, vScale) {
                this.lightmapSettings.texture = lightmap;
                this.lightmapSettings.uvParam.x = uOff;
                this.lightmapSettings.uvParam.y = vOff;
                this.lightmapSettings.uvParam.z = uScale;
                this.lightmapSettings.uvParam.w = vScale;

                this._onUpdateLightingmap();
              };

              _proto._updateModels = function _updateModels() {
                if (!this.enabledInHierarchy || !this._mesh) {
                  return;
                }

                var model = this._model;

                if (model) {
                  model.destroy();
                  model.initialize();
                  model.node = model.transform = this.node;
                } else {
                  this._createModel();
                }

                if (this._model) {
                  this._model.createBoundingShape(this._mesh.struct.minPosition, this._mesh.struct.maxPosition);

                  this._updateModelParams();

                  this._onUpdateLightingmap();
                }
              };

              _proto._createModel = function _createModel() {
                var preferMorphOverPlain = !!this._morphInstance;
                var modelType = preferMorphOverPlain && this._modelType === Model ? MorphModel : this._modelType;
                var model = this._model = legacyCC.director.root.createModel(modelType);
                model.visFlags = this.visibility;
                model.node = model.transform = this.node;
                this._models.length = 0;

                this._models.push(this._model);

                if (this._morphInstance && model instanceof MorphModel) {
                  model.setMorphRendering(this._morphInstance);
                }
              };

              _proto._attachToScene = function _attachToScene() {
                if (!this.node.scene || !this._model) {
                  return;
                }

                var renderScene = this._getRenderScene();

                if (this._model.scene !== null) {
                  this._detachFromScene();
                }

                renderScene.addModel(this._model);
              };

              _proto._detachFromScene = function _detachFromScene() {
                if (this._model && this._model.scene) {
                  this._model.scene.removeModel(this._model);
                }
              };

              _proto._updateModelParams = function _updateModelParams() {
                if (!this._mesh || !this._model) {
                  return;
                }

                this.node.hasChangedFlags |= TransformBit.POSITION;
                this._model.transform.hasChangedFlags |= TransformBit.POSITION;
                this._model.isDynamicBatching = this._isBatchingEnabled();
                var meshCount = this._mesh ? this._mesh.renderingSubMeshes.length : 0;
                var renderingMesh = this._mesh.renderingSubMeshes;

                if (renderingMesh) {
                  for (var i = 0; i < meshCount; ++i) {
                    var material = this.getRenderMaterial(i);

                    if (material && !material.isValid) {
                      material = null;
                    }

                    var subMeshData = renderingMesh[i];

                    if (subMeshData) {
                      this._model.initSubModel(i, subMeshData, material || this._getBuiltinMaterial());
                    }
                  }
                }

                this._model.enabled = true;
              };

              _proto._onUpdateLightingmap = function _onUpdateLightingmap() {
                if (this.model !== null) {
                  this.model.updateLightingmap(this.lightmapSettings.texture, this.lightmapSettings.uvParam);
                }

                this.setInstancedAttribute('a_lightingMapUVParam', [this.lightmapSettings.uvParam.x, this.lightmapSettings.uvParam.y, this.lightmapSettings.uvParam.z, this.lightmapSettings.uvParam.w]);
              };

              _proto._onMaterialModified = function _onMaterialModified(idx, material) {
                if (!this._model || !this._model.inited) {
                  return;
                }

                this._onRebuildPSO(idx, material || this._getBuiltinMaterial());
              };

              _proto._onRebuildPSO = function _onRebuildPSO(idx, material) {
                if (!this._model || !this._model.inited) {
                  return;
                }

                this._model.isDynamicBatching = this._isBatchingEnabled();

                this._model.setSubModelMaterial(idx, material);

                this._onUpdateLightingmap();
              };

              _proto._onMeshChanged = function _onMeshChanged(old) {};

              _proto._clearMaterials = function _clearMaterials() {
                if (!this._model) {
                  return;
                }

                var subModels = this._model.subModels;

                for (var i = 0; i < subModels.length; ++i) {
                  this._onMaterialModified(i, null);
                }
              };

              _proto._getBuiltinMaterial = function _getBuiltinMaterial() {
                return builtinResMgr.get('missing-material');
              };

              _proto._onVisibilityChange = function _onVisibilityChange(val) {
                if (!this._model) {
                  return;
                }

                this._model.visFlags = val;
              };

              _proto._updateCastShadow = function _updateCastShadow() {
                if (!this._model) {
                  return;
                }

                if (this._shadowCastingMode === ModelShadowCastingMode.OFF) {
                  this._model.castShadow = false;
                } else {
                  assertIsTrue(this._shadowCastingMode === ModelShadowCastingMode.ON, "ShadowCastingMode " + this._shadowCastingMode + " is not supported.");
                  this._model.castShadow = true;
                }
              };

              _proto._updateReceiveShadow = function _updateReceiveShadow() {
                if (!this._model) {
                  return;
                }

                if (this._shadowReceivingMode === ModelShadowReceivingMode.OFF) {
                  this._model.receiveShadow = false;
                } else {
                  this._model.receiveShadow = true;
                }
              };

              _proto._isBatchingEnabled = function _isBatchingEnabled() {
                for (var i = 0; i < this._materials.length; ++i) {
                  var mat = this._materials[i];

                  if (!mat) {
                    continue;
                  }

                  for (var p = 0; p < mat.passes.length; ++p) {
                    var pass = mat.passes[p];

                    if (pass.batchingScheme) {
                      return true;
                    }
                  }
                }

                return false;
              };

              _proto._watchMorphInMesh = function _watchMorphInMesh() {
                if (this._morphInstance) {
                  this._morphInstance.destroy();

                  this._morphInstance = null;
                }

                if (!this._enableMorph) {
                  return;
                }

                if (!this._mesh || !this._mesh.struct.morph || !this._mesh.morphRendering) {
                  return;
                }

                var morph = this._mesh.struct.morph;
                this._morphInstance = this._mesh.morphRendering.createInstance();
                var nSubMeshes = this._mesh.struct.primitives.length;

                for (var iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
                  var subMeshMorph = morph.subMeshMorphs[iSubMesh];

                  if (!subMeshMorph) {
                    continue;
                  }

                  var initialWeights = subMeshMorph.weights || morph.weights;
                  var weights = initialWeights ? initialWeights.slice() : new Array(subMeshMorph.targets.length).fill(0);

                  this._morphInstance.setWeights(iSubMesh, weights);
                }

                if (this._model && this._model instanceof MorphModel) {
                  this._model.setMorphRendering(this._morphInstance);
                }
              };

              _proto._syncMorphWeights = function _syncMorphWeights(subMeshIndex) {
                if (!this._morphInstance) {
                  return;
                }

                var subMeshMorphInstance = this._morphInstance[subMeshIndex];

                if (!subMeshMorphInstance || !subMeshMorphInstance.renderResources) {
                  return;
                }

                subMeshMorphInstance.renderResources.setWeights(subMeshMorphInstance.weights);
              };

              _createClass(MeshRenderer, [{
                key: "shadowCastingMode",
                get: function get() {
                  return this._shadowCastingMode;
                },
                set: function set(val) {
                  this._shadowCastingMode = val;

                  this._updateCastShadow();
                }
              }, {
                key: "receiveShadow",
                get: function get() {
                  return this._shadowReceivingMode;
                },
                set: function set(val) {
                  this._shadowReceivingMode = val;

                  this._updateReceiveShadow();
                }
              }, {
                key: "mesh",
                get: function get() {
                  return this._mesh;
                },
                set: function set(val) {
                  var old = this._mesh;
                  this._mesh = val;

                  if (this._mesh) {
                    this._mesh.initialize();
                  }

                  this._watchMorphInMesh();

                  this._onMeshChanged(old);

                  this._updateModels();

                  if (this.enabledInHierarchy) {
                    this._attachToScene();
                  }

                  this._updateCastShadow();

                  this._updateReceiveShadow();
                }
              }, {
                key: "model",
                get: function get() {
                  return this._model;
                }
              }, {
                key: "enableMorph",
                get: function get() {
                  return this._enableMorph;
                },
                set: function set(value) {
                  this._enableMorph = value;
                }
              }]);

              return MeshRenderer;
            }(RenderableComponent), _class6.ShadowCastingMode = ModelShadowCastingMode, _class6.ShadowReceivingMode = ModelShadowReceivingMode, _temp2), (_descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "lightmapSettings", [serializable, editable, disallowAnimation], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new ModelLightmapSettings();
              }
            }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_mesh", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class5.prototype, "_shadowCastingMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ModelShadowCastingMode.OFF;
              }
            }), _descriptor10 = _applyDecoratedDescriptor(_class5.prototype, "_shadowReceivingMode", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ModelShadowReceivingMode.ON;
              }
            }), _applyDecoratedDescriptor(_class5.prototype, "shadowCastingMode", [_dec7, _dec8, disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "shadowCastingMode"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "receiveShadow", [_dec9, _dec10, disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "receiveShadow"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "mesh", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class5.prototype, "mesh"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "enableMorph", [_dec13, disallowAnimation], Object.getOwnPropertyDescriptor(_class5.prototype, "enableMorph"), _class5.prototype), _descriptor11 = _applyDecoratedDescriptor(_class5.prototype, "_enableMorph", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            })), _class5)) || _class4) || _class4) || _class4) || _class4) || _class4));

        }
    };
});
