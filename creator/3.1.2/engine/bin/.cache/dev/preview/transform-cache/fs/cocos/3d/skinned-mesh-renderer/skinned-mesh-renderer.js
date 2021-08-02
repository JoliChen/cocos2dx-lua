System.register("q-bundled:///fs/cocos/3d/skinned-mesh-renderer/skinned-mesh-renderer.js", ["../../core/data/decorators/index.js", "../assets/skeleton.js", "../../core/scene-graph/node.js", "../framework/mesh-renderer.js", "../../core/global-exports.js", "../models/skinning-model.js", "../models/baked-skinning-model.js"], function (_export, _context) {
  "use strict";

  var ccclass, executeInEditMode, executionOrder, help, menu, tooltip, type, Skeleton, Node, MeshRenderer, legacyCC, SkinningModel, BakedSkinningModel, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _temp, SkinnedMeshRenderer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_assetsSkeletonJs) {
      Skeleton = _assetsSkeletonJs.Skeleton;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_frameworkMeshRendererJs) {
      MeshRenderer = _frameworkMeshRendererJs.MeshRenderer;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_modelsSkinningModelJs) {
      SkinningModel = _modelsSkinningModelJs.SkinningModel;
    }, function (_modelsBakedSkinningModelJs) {
      BakedSkinningModel = _modelsBakedSkinningModelJs.BakedSkinningModel;
    }],
    execute: function () {
      /**
       * @en The skinned mesh renderer component.
       * @zh 蒙皮网格渲染器组件。
       */
      _export("SkinnedMeshRenderer", SkinnedMeshRenderer = (_dec = ccclass('cc.SkinnedMeshRenderer'), _dec2 = help('i18n:cc.SkinnedMeshRenderer'), _dec3 = executionOrder(100), _dec4 = menu('Mesh/SkinnedMeshRenderer'), _dec5 = type(Skeleton), _dec6 = type(Node), _dec7 = type(Skeleton), _dec8 = type(Node), _dec9 = tooltip('i18n:model.skinning_root'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = _dec4(_class = (_class2 = (_temp = /*#__PURE__*/function (_MeshRenderer) {
        _inheritsLoose(SkinnedMeshRenderer, _MeshRenderer);

        function SkinnedMeshRenderer() {
          var _this;

          _this = _MeshRenderer.call(this) || this;

          _initializerDefineProperty(_this, "_skeleton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_skinningRoot", _descriptor2, _assertThisInitialized(_this));

          _this._clip = null;
          _this._modelType = BakedSkinningModel;
          return _this;
        }

        var _proto = SkinnedMeshRenderer.prototype;

        _proto.__preload = function __preload() {
          this._updateModelType();
        };

        _proto.uploadAnimation = function uploadAnimation(clip) {
          this._clip = clip;

          if (this.model && this.model.uploadAnimation) {
            this.model.uploadAnimation(clip);
          }
        };

        _proto.setUseBakedAnimation = function setUseBakedAnimation(val) {
          if (val === void 0) {
            val = true;
          }

          var modelType = val ? BakedSkinningModel : SkinningModel;

          if (this._modelType === modelType) {
            return;
          }

          this._modelType = modelType;

          if (this._model) {
            legacyCC.director.root.destroyModel(this._model);
            this._model = null;
            this._models.length = 0;

            this._updateModels();

            this._updateCastShadow();

            if (this.enabledInHierarchy) {
              this._attachToScene();
            }
          }
        };

        _proto.setMaterial = function setMaterial(material, index) {
          _MeshRenderer.prototype.setMaterial.call(this, material, index);

          if (this._modelType === SkinningModel) {
            this.getMaterialInstance(index);
          }
        };

        _proto._updateModelParams = function _updateModelParams() {
          this._update(); // should bind skeleton before super create pso


          _MeshRenderer.prototype._updateModelParams.call(this);
        };

        _proto._updateModelType = function _updateModelType() {
          if (!this._skinningRoot) {
            return;
          }

          var comp = this._skinningRoot.getComponent('cc.SkeletalAnimation');

          if (comp) {
            this.setUseBakedAnimation(comp.useBakedAnimation);
          } else {
            this.setUseBakedAnimation(false);
          }
        };

        _proto._update = function _update() {
          if (this.model) {
            this.model.bindSkeleton(this._skeleton, this._skinningRoot, this._mesh);

            if (this.model.uploadAnimation) {
              this.model.uploadAnimation(this._clip);
            }
          }
        };

        _createClass(SkinnedMeshRenderer, [{
          key: "skeleton",
          get:
          /**
           * @en The skeleton asset.
           * @zh 骨骼资源。
           */
          function get() {
            return this._skeleton;
          },
          set: function set(val) {
            if (val === this._skeleton) {
              return;
            }

            this._skeleton = val;

            this._update();
          }
          /**
           * @en The skinning root. (The node where the controlling Animation is located)
           * 骨骼根节点的引用，对应控制此模型的动画组件所在节点。
           */

        }, {
          key: "skinningRoot",
          get: function get() {
            return this._skinningRoot;
          },
          set: function set(value) {
            if (value === this._skinningRoot) {
              return;
            }

            this._skinningRoot = value;

            this._updateModelType();

            this._update();
          }
        }, {
          key: "model",
          get: function get() {
            return this._model;
          }
        }]);

        return SkinnedMeshRenderer;
      }(MeshRenderer), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skeleton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skinningRoot", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "skeleton", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "skeleton"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skinningRoot", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "skinningRoot"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});