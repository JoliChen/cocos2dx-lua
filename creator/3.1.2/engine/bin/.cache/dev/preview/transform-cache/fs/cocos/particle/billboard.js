System.register("q-bundled:///fs/cocos/particle/billboard.js", ["../core/data/decorators/index.js", "../core/builtin/index.js", "../3d/misc/index.js", "../core/assets/index.js", "../core/components/component.js", "../core/gfx/index.js", "../core/math/index.js", "../core/renderer/index.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, type, serializable, builtinResMgr, createMesh, Material, Texture2D, Component, Attribute, AttributeName, Format, PrimitiveMode, Color, toDegree, toRadian, Vec4, scene, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, Billboard;

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
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_dMiscIndexJs) {
      createMesh = _dMiscIndexJs.createMesh;
    }, function (_coreAssetsIndexJs) {
      Material = _coreAssetsIndexJs.Material;
      Texture2D = _coreAssetsIndexJs.Texture2D;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreGfxIndexJs) {
      Attribute = _coreGfxIndexJs.Attribute;
      AttributeName = _coreGfxIndexJs.AttributeName;
      Format = _coreGfxIndexJs.Format;
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      toDegree = _coreMathIndexJs.toDegree;
      toRadian = _coreMathIndexJs.toRadian;
      Vec4 = _coreMathIndexJs.Vec4;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("Billboard", Billboard = (_dec = ccclass('cc.Billboard'), _dec2 = help('i18n:cc.Billboard'), _dec3 = menu('Effects/Billboard'), _dec4 = type(Texture2D), _dec5 = type(Texture2D), _dec6 = tooltip('i18n:billboard.texture'), _dec7 = tooltip('i18n:billboard.height'), _dec8 = tooltip('i18n:billboard.width'), _dec9 = tooltip('i18n:billboard.rotation'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Billboard, _Component);

        function Billboard() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_texture", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_height", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_width", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_rotation", _descriptor4, _assertThisInitialized(_this));

          _this._model = null;
          _this._mesh = null;
          _this._material = null;
          _this._uniform = new Vec4(1, 1, 0, 0);
          return _this;
        }

        var _proto = Billboard.prototype;

        _proto.onLoad = function onLoad() {
          this.createModel();
        };

        _proto.onEnable = function onEnable() {
          this.attachToScene();
          this._model.enabled = true;
          this.width = this._width;
          this.height = this._height;
          this.rotation = this.rotation;
          this.texture = this.texture;
        };

        _proto.onDisable = function onDisable() {
          this.detachFromScene();
        };

        _proto.attachToScene = function attachToScene() {
          if (this._model && this.node && this.node.scene) {
            if (this._model.scene) {
              this.detachFromScene();
            }

            this._getRenderScene().addModel(this._model);
          }
        };

        _proto.detachFromScene = function detachFromScene() {
          if (this._model && this._model.scene) {
            this._model.scene.removeModel(this._model);
          }
        };

        _proto.createModel = function createModel() {
          this._mesh = createMesh({
            primitiveMode: PrimitiveMode.TRIANGLE_LIST,
            positions: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            uvs: [0, 0, 1, 0, 0, 1, 1, 1],
            colors: [Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a, Color.WHITE.r, Color.WHITE.g, Color.WHITE.b, Color.WHITE.a],
            attributes: [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8UI, true)],
            indices: [0, 1, 2, 1, 2, 3]
          }, undefined, {
            calculateBounds: false
          });
          var model = this._model = legacyCC.director.root.createModel(scene.Model, this.node);
          model.node = model.transform = this.node;

          if (this._material == null) {
            this._material = new Material();

            this._material.copy(builtinResMgr.get('default-billboard-material'));
          }

          model.initSubModel(0, this._mesh.renderingSubMeshes[0], this._material);
        };

        _createClass(Billboard, [{
          key: "texture",
          get:
          /**
           * @zh Billboard纹理。
           */
          function get() {
            return this._texture;
          },
          set: function set(val) {
            this._texture = val;

            if (this._material) {
              this._material.setProperty('mainTexture', val);
            }
          }
        }, {
          key: "height",
          get:
          /**
           * @zh 高度。
           */
          function get() {
            return this._height;
          },
          set: function set(val) {
            this._height = val;

            if (this._material) {
              this._uniform.y = val;

              this._material.setProperty('cc_size_rotation', this._uniform);
            }
          }
        }, {
          key: "width",
          get:
          /**
           * @zh 宽度。
           */
          function get() {
            return this._width;
          },
          set: function set(val) {
            this._width = val;

            if (this._material) {
              this._uniform.x = val;

              this._material.setProperty('cc_size_rotation', this._uniform);
            }
          }
        }, {
          key: "rotation",
          get:
          /**
           * @zh billboard绕中心点旋转的角度
           */
          function get() {
            return Math.round(toDegree(this._rotation) * 100) / 100;
          },
          set: function set(val) {
            this._rotation = toRadian(val);

            if (this._material) {
              this._uniform.z = this._rotation;

              this._material.setProperty('cc_size_rotation', this._uniform);
            }
          }
        }]);

        return Billboard;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_height", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_width", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});