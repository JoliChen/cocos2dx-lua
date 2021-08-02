System.register("q-bundled:///fs/cocos/3d/framework/mesh-renderer.js", ["../../core/data/decorators/index.js", "../assets/mesh.js", "../../core/math/index.js", "../../core/renderer/index.js", "../models/morph-model.js", "../../core/scene-graph/node-enum.js", "../../core/value-types/index.js", "../../core/builtin/index.js", "../../core/components/renderable-component.js", "../../core/global-exports.js", "../../core/data/utils/asserts.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, tooltip, visible, type, formerlySerializedAs, serializable, editable, disallowAnimation, Mesh, Vec4, scene, MorphModel, TransformBit, Enum, builtinResMgr, RenderableComponent, legacyCC, assertIsTrue, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class4, _class5, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class6, _temp2, ModelShadowCastingMode, ModelShadowReceivingMode, ModelLightmapSettings, MeshRenderer;

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      visible = _coreDataDecoratorsIndexJs.visible;
      type = _coreDataDecoratorsIndexJs.type;
      formerlySerializedAs = _coreDataDecoratorsIndexJs.formerlySerializedAs;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
      disallowAnimation = _coreDataDecoratorsIndexJs.disallowAnimation;
    }, function (_assetsMeshJs) {
      Mesh = _assetsMeshJs.Mesh;
    }, function (_coreMathIndexJs) {
      Vec4 = _coreMathIndexJs.Vec4;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }, function (_modelsMorphModelJs) {
      MorphModel = _modelsMorphModelJs.MorphModel;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_coreComponentsRenderableComponentJs) {
      RenderableComponent = _coreComponentsRenderableComponentJs.RenderableComponent;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreDataUtilsAssertsJs) {
      assertIsTrue = _coreDataUtilsAssertsJs.assertIsTrue;
    }],
    execute: function () {
      /**
       * @en Shadow projection mode.
       * @zh 阴影投射方式。
       */
      ModelShadowCastingMode = Enum({
        /**
         * @en Disable shadow projection.
         * @zh 不投射阴影。
         */
        OFF: 0,

        /**
         * @en Enable shadow projection.
         * @zh 开启阴影投射。
         */
        ON: 1
      });
      /**
       * @en Shadow receive mode.
       * @zh 阴影接收方式。
       */

      ModelShadowReceivingMode = Enum({
        /**
         * @en Disable shadow projection.
         * @zh 不接收阴影。
         */
        OFF: 0,

        /**
         * @en Enable shadow projection.
         * @zh 开启阴影投射。
         */
        ON: 1
      });
      /**
       * @en model light map settings.
       * @zh 模型光照图设置
       */

      ModelLightmapSettings = (_dec = ccclass('cc.ModelLightmapSettings'), _dec2 = formerlySerializedAs('_recieveShadow'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
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
          get:
          /**
           * @en bakeable.
           * @zh 是否可烘培。
           */
          function get() {
            return this._bakeable;
          },
          set: function set(val) {
            this._bakeable = val;
          }
          /**
           * @en cast shadow.
           * @zh 是否投射阴影。
           */

        }, {
          key: "castShadow",
          get: function get() {
            return this._castShadow;
          },
          set: function set(val) {
            this._castShadow = val;
          }
          /**
           * @en receive shadow.
           * @zh 是否接受阴影。
           */

        }, {
          key: "receiveShadow",
          get: function get() {
            return this._receiveShadow;
          },
          set: function set(val) {
            this._receiveShadow = val;
          }
          /**
           * @en lightmap size.
           * @zh 光照图大小
           */

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
      /**
       * @en Mesh renderer component
       * @zh 网格渲染器组件。
       */

      _export("MeshRenderer", MeshRenderer = (_dec3 = ccclass('cc.MeshRenderer'), _dec4 = help('i18n:cc.MeshRenderer'), _dec5 = executionOrder(100), _dec6 = menu('Mesh/MeshRenderer'), _dec7 = type(ModelShadowCastingMode), _dec8 = tooltip('i18n:model.shadow_casting_model'), _dec9 = type(ModelShadowReceivingMode), _dec10 = tooltip('i18n:model.shadow_receiving_model'), _dec11 = type(Mesh), _dec12 = tooltip('i18n:model.mesh'), _dec13 = visible(function () {
        return !!(this.mesh && this.mesh.struct.morph && this.mesh.struct.morph.subMeshMorphs.some(function (subMeshMorph) {
          return !!subMeshMorph;
        }));
      }), _dec3(_class4 = _dec4(_class4 = _dec5(_class4 = _dec6(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_RenderableComponent) {
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

          _this._modelType = scene.Model;
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
        } // Redo, Undo, Prefab restore, etc.
        ;

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
          var preferMorphOverPlain = !!this._morphInstance; // Note we only change to use `MorphModel` if
          // we are required to render morph and the `this._modelType` is exactly the basic `Model`.
          // We do this since the `this._modelType` might be changed in classes derived from `Model`.
          // We shall not overwrite it.
          // Please notice that we do not enforce that
          // derived classes should use a morph-able model type(i.e. model type derived from `MorphModel`).
          // So we should take care of the edge case.

          var modelType = preferMorphOverPlain && this._modelType === scene.Model ? MorphModel : this._modelType;
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
          // classic ugly pink indicating missing material
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
          get:
          /**
           * @en Shadow projection mode.
           * @zh 阴影投射方式。
           */
          function get() {
            return this._shadowCastingMode;
          },
          set: function set(val) {
            this._shadowCastingMode = val;

            this._updateCastShadow();
          }
          /**
           * @en receive shadow.
           * @zh 是否接受阴影。
           */

        }, {
          key: "receiveShadow",
          get: function get() {
            return this._shadowReceivingMode;
          },
          set: function set(val) {
            this._shadowReceivingMode = val;

            this._updateReceiveShadow();
          }
          /**
           * @en The mesh of the model.
           * @zh 模型的网格数据。
           */

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
          } // eslint-disable-next-line func-names

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