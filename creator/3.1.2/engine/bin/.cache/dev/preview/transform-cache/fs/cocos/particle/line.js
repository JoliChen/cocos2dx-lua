System.register("q-bundled:///fs/cocos/particle/line.js", ["../core/data/decorators/index.js", "../core/assets/index.js", "../core/components/index.js", "../core/math/index.js", "./models/line-model.js", "../core/builtin/index.js", "./animator/curve-range.js", "./animator/gradient-range.js", "../core/global-exports.js", "../core/renderer/core/material-instance.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, displayOrder, type, serializable, Material, Texture2D, Component, Vec3, Vec2, Vec4, LineModel, builtinResMgr, CurveRange, GradientRange, legacyCC, MaterialInstance, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp, _matInsInfo, CC_USE_WORLD_SPACE, define, Line;

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
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreAssetsIndexJs) {
      Material = _coreAssetsIndexJs.Material;
      Texture2D = _coreAssetsIndexJs.Texture2D;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec4 = _coreMathIndexJs.Vec4;
    }, function (_modelsLineModelJs) {
      LineModel = _modelsLineModelJs.LineModel;
    }, function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
    }, function (_animatorGradientRangeJs) {
      GradientRange = _animatorGradientRangeJs.default;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreRendererCoreMaterialInstanceJs) {
      MaterialInstance = _coreRendererCoreMaterialInstanceJs.MaterialInstance;
    }],
    execute: function () {
      _matInsInfo = {
        parent: null,
        owner: null,
        subModelIdx: 0
      };
      CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
      define = {
        CC_USE_WORLD_SPACE: false
      };

      _export("Line", Line = (_dec = ccclass('cc.Line'), _dec2 = help('i18n:cc.Line'), _dec3 = menu('Effects/Line'), _dec4 = type(Texture2D), _dec5 = type(Texture2D), _dec6 = displayOrder(0), _dec7 = tooltip('i18n:line.texture'), _dec8 = displayOrder(1), _dec9 = tooltip('i18n:line.worldSpace'), _dec10 = type([Vec3]), _dec11 = type([Vec3]), _dec12 = displayOrder(2), _dec13 = tooltip('i18n:line.positions'), _dec14 = type(CurveRange), _dec15 = type(CurveRange), _dec16 = displayOrder(3), _dec17 = tooltip('i18n:line.width'), _dec18 = type(Vec2), _dec19 = displayOrder(4), _dec20 = tooltip('i18n:line.tile'), _dec21 = type(Vec2), _dec22 = displayOrder(5), _dec23 = tooltip('i18n:line.offset'), _dec24 = type(GradientRange), _dec25 = type(GradientRange), _dec26 = displayOrder(6), _dec27 = tooltip('i18n:line.color'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Line, _Component);

        function Line() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_texture", _descriptor, _assertThisInitialized(_this));

          _this._material = null;
          _this._materialInstance = null;

          _initializerDefineProperty(_this, "_worldSpace", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_positions", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_width", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_tile", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_offset", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_color", _descriptor7, _assertThisInitialized(_this));

          _this._model = null;
          _this._tile_offset = new Vec4();
          return _this;
        }

        var _proto = Line.prototype;

        _proto.onLoad = function onLoad() {
          var model = this._model = legacyCC.director.root.createModel(LineModel);
          model.node = model.transform = this.node;

          if (this._material === null) {
            this._material = new Material();

            this._material.copy(builtinResMgr.get('default-trail-material'));

            define[CC_USE_WORLD_SPACE] = this.worldSpace;
            _matInsInfo.parent = this._material;
            _matInsInfo.subModelIdx = 0;
            this._materialInstance = new MaterialInstance(_matInsInfo);

            this._materialInstance.recompileShaders(define);
          }

          model.updateMaterial(this._materialInstance);
          model.setCapacity(100);
        };

        _proto.onEnable = function onEnable() {
          if (!this._model) {
            return;
          }

          this._attachToScene();

          this.texture = this._texture;
          this.tile = this._tile;
          this.offset = this._offset;

          this._model.addLineVertexData(this._positions, this._width, this._color);
        };

        _proto.onDisable = function onDisable() {
          if (this._model) {
            this._detachFromScene();
          }
        };

        _proto._attachToScene = function _attachToScene() {
          if (this._model && this.node && this.node.scene) {
            if (this._model.scene) {
              this._detachFromScene();
            }

            this._getRenderScene().addModel(this._model);
          }
        };

        _proto._detachFromScene = function _detachFromScene() {
          if (this._model && this._model.scene) {
            this._model.scene.removeModel(this._model);
          }
        };

        _createClass(Line, [{
          key: "texture",
          get:
          /**
           * @zh 显示的纹理。
           */
          function get() {
            return this._texture;
          },
          set: function set(val) {
            this._texture = val;

            if (this._materialInstance) {
              this._materialInstance.setProperty('mainTexture', val);
            }
          }
        }, {
          key: "worldSpace",
          get:
          /**
           * @zh positions是否为世界空间坐标。
           */
          function get() {
            return this._worldSpace;
          },
          set: function set(val) {
            this._worldSpace = val;

            if (this._materialInstance) {
              define[CC_USE_WORLD_SPACE] = this.worldSpace;

              this._materialInstance.recompileShaders(define);

              if (this._model) {
                this._model.setSubModelMaterial(0, this._materialInstance);
              }
            }
          }
        }, {
          key: "positions",
          get:
          /**
           * 每段折线的拐点坐标。
           */
          function get() {
            return this._positions;
          },
          set: function set(val) {
            this._positions = val;

            if (this._model) {
              this._model.addLineVertexData(this._positions, this._width, this._color);
            }
          }
        }, {
          key: "width",
          get:
          /**
           * @zh 线段的宽度。
           */
          function get() {
            return this._width;
          },
          set: function set(val) {
            this._width = val;

            if (this._model) {
              this._model.addLineVertexData(this._positions, this._width, this._color);
            }
          }
        }, {
          key: "tile",
          get:
          /**
           * @zh 图块数。
           */
          function get() {
            return this._tile;
          },
          set: function set(val) {
            this._tile.set(val);

            if (this._materialInstance) {
              this._tile_offset.x = this._tile.x;
              this._tile_offset.y = this._tile.y;

              this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
            }
          }
        }, {
          key: "offset",
          get: function get() {
            return this._offset;
          },
          set: function set(val) {
            this._offset.set(val);

            if (this._materialInstance) {
              this._tile_offset.z = this._offset.x;
              this._tile_offset.w = this._offset.y;

              this._materialInstance.setProperty('mainTiling_Offset', this._tile_offset);
            }
          }
        }, {
          key: "color",
          get:
          /**
           * @zh 线段颜色。
           */
          function get() {
            return this._color;
          },
          set: function set(val) {
            this._color = val;

            if (this._model) {
              this._model.addLineVertexData(this._positions, this._width, this._color);
            }
          }
          /**
           * @ignore
           */

        }]);

        return Line;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_worldSpace", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "worldSpace", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "worldSpace"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_positions", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "positions", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "positions"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_width", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new CurveRange();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_tile", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(1, 1);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "tile", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "tile"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0, 0);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new GradientRange();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});