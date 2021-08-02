System.register("q-bundled:///fs/cocos/3d/lights/light-component.js", ["../../core/data/decorators/index.js", "../../core/components/component.js", "../../core/math/index.js", "../../core/value-types/index.js", "../../core/renderer/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, range, slide, type, serializable, editable, Component, Color, Vec3, Enum, scene, legacyCC, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class6, _temp2, PhotometricTerm, _color_tmp, StaticLightSettings, Light;

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
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      range = _coreDataDecoratorsIndexJs.range;
      slide = _coreDataDecoratorsIndexJs.slide;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreValueTypesIndexJs) {
      Enum = _coreValueTypesIndexJs.Enum;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("PhotometricTerm", PhotometricTerm = Enum({
        LUMINOUS_POWER: 0,
        LUMINANCE: 1
      }));

      _color_tmp = new Vec3();
      /**
       * @en static light settings.
       * @zh 静态灯光设置
       */

      StaticLightSettings = (_dec = ccclass('cc.StaticLightSettings'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function StaticLightSettings() {
          _initializerDefineProperty(this, "_baked", _descriptor, this);

          _initializerDefineProperty(this, "_editorOnly", _descriptor2, this);

          _initializerDefineProperty(this, "_bakeable", _descriptor3, this);

          _initializerDefineProperty(this, "_castShadow", _descriptor4, this);
        }

        _createClass(StaticLightSettings, [{
          key: "editorOnly",
          get:
          /**
           * @en editor only.
           * @zh 是否只在编辑器里生效。
           */
          function get() {
            return this._editorOnly;
          },
          set: function set(val) {
            this._editorOnly = val;
          }
          /**
           * bake state
           */

        }, {
          key: "baked",
          get: function get() {
            return this._baked;
          },
          set: function set(val) {
            this._baked = val;
          }
          /**
           * @en bakeable.
           * @zh 是否可烘培。
           */

        }, {
          key: "bakeable",
          get: function get() {
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
        }]);

        return StaticLightSettings;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_baked", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_editorOnly", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
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
      }), _applyDecoratedDescriptor(_class2.prototype, "editorOnly", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "editorOnly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "bakeable", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "bakeable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "castShadow", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "castShadow"), _class2.prototype)), _class2)) || _class);

      _export("Light", Light = (_dec2 = ccclass('cc.Light'), _dec3 = tooltip('i18n:lights.color'), _dec4 = tooltip('i18n:lights.use_color_temperature'), _dec5 = range([1000, 15000, 1]), _dec6 = tooltip('i18n:lights.color_temperature'), _dec7 = type(StaticLightSettings), _dec2(_class4 = (_class5 = (_temp2 = _class6 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Light, _Component);

        function Light() {
          var _this;

          _this = _Component.call(this) || this;

          _initializerDefineProperty(_this, "_color", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_useColorTemperature", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_colorTemperature", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_staticSettings", _descriptor8, _assertThisInitialized(_this));

          _this._type = scene.LightType.UNKNOWN;
          _this._lightType = void 0;
          _this._light = null;
          _this._lightType = scene.Light;
          return _this;
        }

        var _proto = Light.prototype;

        _proto.onLoad = function onLoad() {
          this._createLight();
        };

        _proto.onEnable = function onEnable() {
          this._attachToScene();
        };

        _proto.onDisable = function onDisable() {
          this._detachFromScene();
        };

        _proto.onDestroy = function onDestroy() {
          this._destroyLight();
        };

        _proto._createLight = function _createLight() {
          if (!this._light) {
            this._light = legacyCC.director.root.createLight(this._lightType);
          }

          this.color = this._color;
          this.useColorTemperature = this._useColorTemperature;
          this.colorTemperature = this._colorTemperature;
          this._light.node = this.node;
          this._light.baked = this.baked;
        };

        _proto._destroyLight = function _destroyLight() {
          if (this._light) {
            legacyCC.director.root.destroyLight(this);
            this._light = null;
          }
        };

        _proto._attachToScene = function _attachToScene() {
          this._detachFromScene();

          if (this._light && !this._light.scene && this.node.scene) {
            var renderScene = this._getRenderScene();

            switch (this._type) {
              case scene.LightType.DIRECTIONAL:
                renderScene.addDirectionalLight(this._light);
                renderScene.setMainLight(this._light);
                break;

              case scene.LightType.SPHERE:
                renderScene.addSphereLight(this._light);
                break;

              case scene.LightType.SPOT:
                renderScene.addSpotLight(this._light);
                break;
            }
          }
        };

        _proto._detachFromScene = function _detachFromScene() {
          if (this._light && this._light.scene) {
            var renderScene = this._light.scene;

            switch (this._type) {
              case scene.LightType.DIRECTIONAL:
                renderScene.removeDirectionalLight(this._light);
                renderScene.unsetMainLight(this._light);
                break;

              case scene.LightType.SPHERE:
                renderScene.removeSphereLight(this._light);
                break;

              case scene.LightType.SPOT:
                renderScene.removeSpotLight(this._light);
                break;
            }
          }
        };

        _createClass(Light, [{
          key: "color",
          get:
          /**
           * @en
           * Color of the light.
           * @zh
           * 光源颜色。
           */
          function get() {
            return this._color;
          },
          set: function set(val) {
            this._color = val;

            if (this._light) {
              _color_tmp.x = val.r / 255.0;
              _color_tmp.y = val.g / 255.0;
              _color_tmp.z = val.b / 255.0;
              this._light.color = _color_tmp;
            }
          }
          /**
           * @en
           * Whether to enable light color temperature.
           * @zh
           * 是否启用光源色温。
           */

        }, {
          key: "useColorTemperature",
          get: function get() {
            return this._useColorTemperature;
          },
          set: function set(enable) {
            this._useColorTemperature = enable;

            if (this._light) {
              this._light.useColorTemperature = enable;
            }
          }
          /**
           * @en
           * The light color temperature.
           * @zh
           * 光源色温。
           */

        }, {
          key: "colorTemperature",
          get: function get() {
            return this._colorTemperature;
          },
          set: function set(val) {
            this._colorTemperature = val;

            if (this._light) {
              this._light.colorTemperature = val;
            }
          }
          /**
           * @en
           * static light settings.
           * @zh
           * 静态灯光设置。
           */

        }, {
          key: "staticSettings",
          get: function get() {
            return this._staticSettings;
          },
          set: function set(val) {
            this._staticSettings = val;
          }
          /**
           * @en
           * The light type.
           * @zh
           * 光源类型。
           */

        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
          /**
           * bake state
           */

        }, {
          key: "baked",
          get: function get() {
            return this.staticSettings.baked;
          },
          set: function set(val) {
            this.staticSettings.baked = val;

            if (this._light !== null) {
              this._light.baked = val;
            }
          }
        }]);

        return Light;
      }(Component), _class6.Type = scene.LightType, _class6.PhotometricTerm = PhotometricTerm, _temp2), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_color", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.WHITE.clone();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_useColorTemperature", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_colorTemperature", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6550;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_staticSettings", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new StaticLightSettings();
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "color", [_dec3], Object.getOwnPropertyDescriptor(_class5.prototype, "color"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useColorTemperature", [_dec4], Object.getOwnPropertyDescriptor(_class5.prototype, "useColorTemperature"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "colorTemperature", [slide, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class5.prototype, "colorTemperature"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "staticSettings", [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "staticSettings"), _class5.prototype)), _class5)) || _class4));
    }
  };
});