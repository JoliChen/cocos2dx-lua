System.register("q-bundled:///fs/cocos/core/components/renderable-component.js", ["../../../../virtual/internal%253Aconstants.js", "../data/decorators/index.js", "../assets/material.js", "./component.js", "../renderer/core/material-instance.js", "../scene-graph/layers.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, ccclass, type, displayOrder, displayName, serializable, Material, Component, MaterialInstance, Layers, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp, _matInsInfo, RenderableComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      type = _dataDecoratorsIndexJs.type;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      displayName = _dataDecoratorsIndexJs.displayName;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_componentJs) {
      Component = _componentJs.Component;
    }, function (_rendererCoreMaterialInstanceJs) {
      MaterialInstance = _rendererCoreMaterialInstanceJs.MaterialInstance;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _matInsInfo = {
        parent: null,
        owner: null,
        subModelIdx: 0
      };

      _export("RenderableComponent", RenderableComponent = (_dec = ccclass('cc.RenderableComponent'), _dec2 = type([Material]), _dec3 = type(Material), _dec4 = displayOrder(0), _dec5 = displayName('Materials'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(RenderableComponent, _Component);

        function RenderableComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_materials", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_visFlags", _descriptor2, _assertThisInitialized(_this));

          _this._materialInstances = [];
          _this._models = [];
          return _this;
        }

        var _proto = RenderableComponent.prototype;

        /**
         * @en Get the shared material asset of the specified sub-model.
         * @zh 获取指定子模型的共享材质资源。
         */
        _proto.getMaterial = function getMaterial(idx) {
          if (idx < 0 || idx >= this._materials.length) {
            return null;
          }

          return this._materials[idx];
        }
        /**
         * @en Set the shared material asset of the specified sub-model,
         * new material instance will be created automatically if the sub-model is already using one.
         * @zh 设置指定子模型的 sharedMaterial，如果对应位置有材质实例则会创建一个对应的材质实例。
         */
        ;

        _proto.setMaterial = function setMaterial(material, index) {
          if (material && material instanceof MaterialInstance) {
            console.error('Can\'t set a material instance to a sharedMaterial slot');
          }

          this._materials[index] = material;
          var inst = this._materialInstances[index];

          if (inst) {
            if (inst.parent !== this._materials[index]) {
              inst.destroy();
              this._materialInstances[index] = null;

              this._onMaterialModified(index, this._materials[index]);
            }
          } else {
            this._onMaterialModified(index, this._materials[index]);
          }
        };

        /**
         * @en Get the material instance of the specified sub-model.
         * @zh 获取指定子模型的材质实例。
         */
        _proto.getMaterialInstance = function getMaterialInstance(idx) {
          var mat = this._materials[idx];

          if (!mat) {
            return null;
          }

          if (!this._materialInstances[idx]) {
            _matInsInfo.parent = this._materials[idx];
            _matInsInfo.owner = this;
            _matInsInfo.subModelIdx = idx;
            var instantiated = new MaterialInstance(_matInsInfo);
            this.setMaterialInstance(idx, instantiated);
          }

          return this._materialInstances[idx];
        }
        /**
         * @en Set the material instance of the specified sub-model.
         * @zh 获取指定子模型的材质实例。
         */
        ;

        _proto.setMaterialInstance = function setMaterialInstance(index, matInst) {
          if (matInst && matInst.parent) {
            if (matInst !== this._materialInstances[index]) {
              this._materialInstances[index] = matInst;

              this._onMaterialModified(index, matInst);
            }
          } else if (matInst !== this._materials[index]) {
            this.setMaterial(matInst, index);
          }
        }
        /**
         * @en Get the actual rendering material of the specified sub-model.
         * (material instance if there is one, or the shared material asset)
         * @zh 获取指定位置可供渲染的材质，如果有材质实例则使用材质实例，如果没有则使用材质资源
         */
        ;

        _proto.getRenderMaterial = function getRenderMaterial(index) {
          return this._materialInstances[index] || this._materials[index];
        };

        _proto._collectModels = function _collectModels() {
          return this._models;
        };

        _proto._attachToScene = function _attachToScene() {};

        _proto._detachFromScene = function _detachFromScene() {};

        _proto._onMaterialModified = function _onMaterialModified(index, material) {};

        _proto._onRebuildPSO = function _onRebuildPSO(index, material) {};

        _proto._clearMaterials = function _clearMaterials() {};

        _proto._onVisibilityChange = function _onVisibilityChange(val) {};

        _createClass(RenderableComponent, [{
          key: "visibility",
          get: function get() {
            return this._visFlags;
          },
          set: function set(val) {
            this._visFlags = val;

            this._onVisibilityChange(val);
          }
        }, {
          key: "sharedMaterials",
          get: function get() {
            // if we don't create an array copy, the editor will modify the original array directly.
            return EDITOR && this._materials.slice() || this._materials;
          },
          set: function set(val) {
            for (var i = 0; i < val.length; i++) {
              if (val[i] !== this._materials[i]) {
                this.setMaterial(val[i], i);
              }
            }

            if (val.length < this._materials.length) {
              for (var _i = val.length; _i < this._materials.length; _i++) {
                this.setMaterial(null, _i);
              }

              this._materials.splice(val.length);
            }
          }
          /**
           * @en The materials of the model.
           * @zh 模型材质。
           */

        }, {
          key: "materials",
          get: function get() {
            for (var i = 0; i < this._materials.length; i++) {
              this._materialInstances[i] = this.getMaterialInstance(i);
            }

            return this._materialInstances;
          },
          set: function set(val) {
            var dLen = val.length - this._materials.length;

            if (dLen > 0) {
              this._materials.length = val.length;
              this._materialInstances.length = val.length;
            } else if (dLen < 0) {
              for (var i = this._materials.length - dLen; i < this._materials.length; ++i) {
                this.setMaterialInstance(i, null);
              }
            }

            for (var _i2 = 0; _i2 < this._materialInstances.length; _i2++) {
              // they could be either undefined or null
              // eslint-disable-next-line eqeqeq
              if (this._materialInstances[_i2] != val[_i2]) {
                this.setMaterialInstance(_i2, val[_i2]);
              }
            }
          }
        }, {
          key: "sharedMaterial",
          get: function get() {
            return this.getMaterial(0);
          }
        }, {
          key: "material",
          get: function get() {
            return this.getMaterialInstance(0);
          },
          set: function set(val) {
            if (this._materials.length === 1 && this._materials[0] === val) {
              return;
            }

            this.setMaterialInstance(0, val);
          }
        }]);

        return RenderableComponent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_materials", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_visFlags", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Layers.Enum.NONE;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype)), _class2)) || _class));

      legacyCC.RenderableComponent = RenderableComponent;
    }
  };
});