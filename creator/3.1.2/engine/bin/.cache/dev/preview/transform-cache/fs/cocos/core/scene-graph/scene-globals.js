System.register("q-bundled:///fs/cocos/core/scene-graph/scene-globals.js", ["../data/decorators/index.js", "../assets/texture-cube.js", "../data/utils/attribute.js", "../math/index.js", "../renderer/scene/ambient.js", "../renderer/scene/shadows.js", "../renderer/scene/fog.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, visible, type, displayOrder, slide, range, rangeStep, editable, serializable, rangeMin, TextureCube, CCFloat, CCBoolean, CCInteger, Color, Quat, Vec3, Vec2, Ambient, ShadowType, PCFType, FogType, legacyCC, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec3, _dec4, _dec5, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class7, _class8, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class9, _temp3, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _class10, _class11, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _temp4, _dec64, _dec65, _class13, _class14, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _temp5, _up, _v3, _qt, AmbientInfo, SkyboxInfo, FogInfo, ShadowsInfo, SceneGlobals;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      visible = _dataDecoratorsIndexJs.visible;
      type = _dataDecoratorsIndexJs.type;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      slide = _dataDecoratorsIndexJs.slide;
      range = _dataDecoratorsIndexJs.range;
      rangeStep = _dataDecoratorsIndexJs.rangeStep;
      editable = _dataDecoratorsIndexJs.editable;
      serializable = _dataDecoratorsIndexJs.serializable;
      rangeMin = _dataDecoratorsIndexJs.rangeMin;
    }, function (_assetsTextureCubeJs) {
      TextureCube = _assetsTextureCubeJs.TextureCube;
    }, function (_dataUtilsAttributeJs) {
      CCFloat = _dataUtilsAttributeJs.CCFloat;
      CCBoolean = _dataUtilsAttributeJs.CCBoolean;
      CCInteger = _dataUtilsAttributeJs.CCInteger;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
      Vec2 = _mathIndexJs.Vec2;
    }, function (_rendererSceneAmbientJs) {
      Ambient = _rendererSceneAmbientJs.Ambient;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
      PCFType = _rendererSceneShadowsJs.PCFType;
    }, function (_rendererSceneFogJs) {
      FogType = _rendererSceneFogJs.FogType;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _up = new Vec3(0, 1, 0);
      _v3 = new Vec3();
      _qt = new Quat();
      /**
       * @en Environment lighting information in the Scene
       * @zh 场景的环境光照相关信息
       */

      _export("AmbientInfo", AmbientInfo = (_dec = ccclass('cc.AmbientInfo'), _dec2 = type(CCFloat), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function AmbientInfo() {
          _initializerDefineProperty(this, "_skyColor", _descriptor, this);

          _initializerDefineProperty(this, "_skyIllum", _descriptor2, this);

          _initializerDefineProperty(this, "_groundAlbedo", _descriptor3, this);

          this._resource = null;
        }

        var _proto = AmbientInfo.prototype;

        _proto.activate = function activate(resource) {
          var aa = resource;
          this._resource = resource;

          this._resource.initialize(this);
        };

        _createClass(AmbientInfo, [{
          key: "skyColor",
          get: function get() {
            return this._skyColor;
          }
          /**
           * @en Sky illuminance
           * @zh 天空亮度
           */
          ,
          set:
          /**
           * @en Sky color
           * @zh 天空颜色
           */
          function set(val) {
            this._skyColor.set(val);

            if (this._resource) {
              this._resource.skyColor = this._skyColor;
            }
          }
        }, {
          key: "skyIllum",
          get: function get() {
            return this._skyIllum;
          }
          /**
           * @en Ground color
           * @zh 地面颜色
           */
          ,
          set: function set(val) {
            this._skyIllum = val;

            if (this._resource) {
              this._resource.skyIllum = this.skyIllum;
            }
          }
        }, {
          key: "groundAlbedo",
          get: function get() {
            return this._groundAlbedo;
          },
          set: function set(val) {
            this._groundAlbedo.set(val); // only RGB channels are used, alpha channel are intensionally left unchanged here


            if (this._resource) {
              this._resource.groundAlbedo = this._groundAlbedo;
            }
          }
        }]);

        return AmbientInfo;
      }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skyColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(51, 128, 204, 1.0);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllum", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Ambient.SKY_ILLUM;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedo", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(51, 51, 51, 255);
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "skyColor", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "skyColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skyIllum", [editable, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "skyIllum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "groundAlbedo", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "groundAlbedo"), _class2.prototype)), _class2)) || _class));

      legacyCC.AmbientInfo = AmbientInfo;
      /**
       * @en Skybox related information
       * @zh 天空盒相关信息
       */

      _export("SkyboxInfo", SkyboxInfo = (_dec3 = ccclass('cc.SkyboxInfo'), _dec4 = type(TextureCube), _dec5 = type(TextureCube), _dec3(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
        function SkyboxInfo() {
          _initializerDefineProperty(this, "_envmap", _descriptor4, this);

          _initializerDefineProperty(this, "_isRGBE", _descriptor5, this);

          _initializerDefineProperty(this, "_enabled", _descriptor6, this);

          _initializerDefineProperty(this, "_useIBL", _descriptor7, this);

          this._resource = null;
        }

        var _proto2 = SkyboxInfo.prototype;

        _proto2.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);

          this._resource.activate(); // update global DS first

        };

        _createClass(SkyboxInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @en Whether use environment lighting
           * @zh 是否启用环境光照？
           */
          ,
          set:
          /**
           * @en Whether activate skybox in the scene
           * @zh 是否启用天空盒？
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = this._enabled;
            }
          }
        }, {
          key: "useIBL",
          get: function get() {
            return this._useIBL;
          }
          /**
           * @en The texture cube used for the skybox
           * @zh 使用的立方体贴图
           */
          ,
          set: function set(val) {
            this._useIBL = val;

            if (this._resource) {
              this._resource.useIBL = this._useIBL;
            }
          }
        }, {
          key: "envmap",
          get: function get() {
            return this._envmap;
          }
          /**
           * @en Whether enable RGBE data support in skybox shader
           * @zh 是否需要开启 shader 内的 RGBE 数据支持？
           */
          ,
          set: function set(val) {
            this._envmap = val;

            if (this._resource) {
              this._resource.envmap = this._envmap;
            }
          }
        }, {
          key: "isRGBE",
          get: function get() {
            return this._isRGBE;
          },
          set: function set(val) {
            this._isRGBE = val;

            if (this._resource) {
              this._resource.isRGBE = this._isRGBE;
            }
          }
        }]);

        return SkyboxInfo;
      }(), _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_envmap", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_isRGBE", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_useIBL", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class5.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "enabled"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useIBL", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "useIBL"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "envmap", [editable, _dec5], Object.getOwnPropertyDescriptor(_class5.prototype, "envmap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "isRGBE", [editable], Object.getOwnPropertyDescriptor(_class5.prototype, "isRGBE"), _class5.prototype)), _class5)) || _class4));

      legacyCC.SkyboxInfo = SkyboxInfo;
      /**
       * @zh 全局雾相关信息
       * @en Global fog info
       */

      _export("FogInfo", FogInfo = (_dec6 = ccclass('cc.FogInfo'), _dec7 = type(FogType), _dec8 = visible(function () {
        return this._type !== FogType.LAYERED && this._type !== FogType.LINEAR;
      }), _dec9 = type(CCFloat), _dec10 = range([0, 1]), _dec11 = rangeStep(0.01), _dec12 = displayOrder(3), _dec13 = visible(function () {
        return this._type === FogType.LINEAR;
      }), _dec14 = type(CCFloat), _dec15 = rangeStep(0.01), _dec16 = displayOrder(4), _dec17 = visible(function () {
        return this._type === FogType.LINEAR;
      }), _dec18 = type(CCFloat), _dec19 = rangeStep(0.01), _dec20 = displayOrder(5), _dec21 = visible(function () {
        return this._type !== FogType.LINEAR;
      }), _dec22 = type(CCFloat), _dec23 = rangeMin(0.01), _dec24 = rangeStep(0.01), _dec25 = displayOrder(6), _dec26 = visible(function () {
        return this._type === FogType.LAYERED;
      }), _dec27 = type(CCFloat), _dec28 = rangeStep(0.01), _dec29 = displayOrder(7), _dec30 = visible(function () {
        return this._type === FogType.LAYERED;
      }), _dec31 = type(CCFloat), _dec32 = rangeStep(0.01), _dec33 = displayOrder(8), _dec6(_class7 = (_class8 = (_temp3 = _class9 = /*#__PURE__*/function () {
        function FogInfo() {
          _initializerDefineProperty(this, "_type", _descriptor8, this);

          _initializerDefineProperty(this, "_fogColor", _descriptor9, this);

          _initializerDefineProperty(this, "_enabled", _descriptor10, this);

          _initializerDefineProperty(this, "_fogDensity", _descriptor11, this);

          _initializerDefineProperty(this, "_fogStart", _descriptor12, this);

          _initializerDefineProperty(this, "_fogEnd", _descriptor13, this);

          _initializerDefineProperty(this, "_fogAtten", _descriptor14, this);

          _initializerDefineProperty(this, "_fogTop", _descriptor15, this);

          _initializerDefineProperty(this, "_fogRange", _descriptor16, this);

          this._resource = null;
        }

        var _proto3 = FogInfo.prototype;

        _proto3.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);

          this._resource.activate();
        };

        _createClass(FogInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          }
          /**
           * @zh 全局雾颜色
           * @en Global fog color
           */
          ,
          set:
          /**
           * @zh 是否启用全局雾效
           * @en Enable global fog
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = val;

              if (val) {
                this._resource.type = this._type;
              }
            }
          }
        }, {
          key: "fogColor",
          get: function get() {
            return this._fogColor;
          }
          /**
           * @zh 全局雾类型
           * @en Global fog type
           */
          ,
          set: function set(val) {
            this._fogColor.set(val);

            if (this._resource) {
              this._resource.fogColor = this._fogColor;
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          },
          set: function set(val) {
            this._type = val;

            if (this._resource) {
              this._resource.type = val;
            }
          }
          /**
           * @zh 全局雾浓度
           * @en Global fog density
           */

        }, {
          key: "fogDensity",
          get: function get() {
            return this._fogDensity;
          },
          set: function set(val) {
            this._fogDensity = val;

            if (this._resource) {
              this._resource.fogDensity = val;
            }
          }
          /**
           * @zh 雾效起始位置，只适用于线性雾
           * @en Global fog start position, only for linear fog
           */

        }, {
          key: "fogStart",
          get: function get() {
            return this._fogStart;
          },
          set: function set(val) {
            this._fogStart = val;

            if (this._resource) {
              this._resource.fogStart = val;
            }
          }
          /**
           * @zh 雾效结束位置，只适用于线性雾
           * @en Global fog end position, only for linear fog
           */

        }, {
          key: "fogEnd",
          get: function get() {
            return this._fogEnd;
          },
          set: function set(val) {
            this._fogEnd = val;

            if (this._resource) {
              this._resource.fogEnd = val;
            }
          }
          /**
           * @zh 雾效衰减
           * @en Global fog attenuation
           */

        }, {
          key: "fogAtten",
          get: function get() {
            return this._fogAtten;
          },
          set: function set(val) {
            this._fogAtten = val;

            if (this._resource) {
              this._resource.fogAtten = val;
            }
          }
          /**
           * @zh 雾效顶部范围，只适用于层级雾
           * @en Global fog top range, only for layered fog
           */

        }, {
          key: "fogTop",
          get: function get() {
            return this._fogTop;
          },
          set: function set(val) {
            this._fogTop = val;

            if (this._resource) {
              this._resource.fogTop = val;
            }
          }
          /**
           * @zh 雾效范围，只适用于层级雾
           * @en Global fog range, only for layered fog
           */

        }, {
          key: "fogRange",
          get: function get() {
            return this._fogRange;
          },
          set: function set(val) {
            this._fogRange = val;

            if (this._resource) {
              this._resource.fogRange = val;
            }
          }
        }]);

        return FogInfo;
      }(), _class9.FogType = FogType, _temp3), (_descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return FogType.LINEAR;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "_fogColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color('#C8C8C8');
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "_fogDensity", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "_fogStart", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class8.prototype, "_fogEnd", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class8.prototype, "_fogAtten", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class8.prototype, "_fogTop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, "_fogRange", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.2;
        }
      }), _applyDecoratedDescriptor(_class8.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class8.prototype, "enabled"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogColor", [editable], Object.getOwnPropertyDescriptor(_class8.prototype, "fogColor"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "type", [editable, _dec7], Object.getOwnPropertyDescriptor(_class8.prototype, "type"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogDensity", [_dec8, _dec9, _dec10, _dec11, slide, _dec12], Object.getOwnPropertyDescriptor(_class8.prototype, "fogDensity"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogStart", [_dec13, _dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class8.prototype, "fogStart"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogEnd", [_dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class8.prototype, "fogEnd"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogAtten", [_dec21, _dec22, _dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class8.prototype, "fogAtten"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogTop", [_dec26, _dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class8.prototype, "fogTop"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogRange", [_dec30, _dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class8.prototype, "fogRange"), _class8.prototype)), _class8)) || _class7));
      /**
       * @en Scene level planar shadow related information
       * @zh 平面阴影相关信息
       */


      _export("ShadowsInfo", ShadowsInfo = (_dec34 = ccclass('cc.ShadowsInfo'), _dec35 = type(ShadowType), _dec36 = visible(function () {
        return this._type === ShadowType.Planar;
      }), _dec37 = type(CCFloat), _dec38 = visible(function () {
        return this._type === ShadowType.Planar;
      }), _dec39 = type(PCFType), _dec40 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec41 = type(CCInteger), _dec42 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec43 = type(CCFloat), _dec44 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec45 = type(CCBoolean), _dec46 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec47 = type(CCBoolean), _dec48 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec49 = type(CCBoolean), _dec50 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec51 = type(CCFloat), _dec52 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._selfShadow === true;
      }), _dec53 = type(CCBoolean), _dec54 = visible(function () {
        return this._type === ShadowType.ShadowMap;
      }), _dec55 = type(CCFloat), _dec56 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
      }), _dec57 = type(CCFloat), _dec58 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
      }), _dec59 = type(CCFloat), _dec60 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
      }), _dec61 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
      }), _dec62 = type(CCFloat), _dec63 = visible(function () {
        return this._type === ShadowType.ShadowMap && this._autoAdapt === false;
      }), _dec34(_class10 = (_class11 = (_temp4 = /*#__PURE__*/function () {
        function ShadowsInfo() {
          _initializerDefineProperty(this, "_type", _descriptor17, this);

          _initializerDefineProperty(this, "_enabled", _descriptor18, this);

          _initializerDefineProperty(this, "_normal", _descriptor19, this);

          _initializerDefineProperty(this, "_distance", _descriptor20, this);

          _initializerDefineProperty(this, "_shadowColor", _descriptor21, this);

          _initializerDefineProperty(this, "_autoAdapt", _descriptor22, this);

          _initializerDefineProperty(this, "_pcf", _descriptor23, this);

          _initializerDefineProperty(this, "_bias", _descriptor24, this);

          _initializerDefineProperty(this, "_packing", _descriptor25, this);

          _initializerDefineProperty(this, "_linear", _descriptor26, this);

          _initializerDefineProperty(this, "_selfShadow", _descriptor27, this);

          _initializerDefineProperty(this, "_normalBias", _descriptor28, this);

          _initializerDefineProperty(this, "_near", _descriptor29, this);

          _initializerDefineProperty(this, "_far", _descriptor30, this);

          _initializerDefineProperty(this, "_aspect", _descriptor31, this);

          _initializerDefineProperty(this, "_orthoSize", _descriptor32, this);

          _initializerDefineProperty(this, "_maxReceived", _descriptor33, this);

          _initializerDefineProperty(this, "_size", _descriptor34, this);

          this._resource = null;
        }

        var _proto4 = ShadowsInfo.prototype;

        /**
         * @en Set plane which receives shadow with the given node's world transformation
         * @zh 根据指定节点的世界变换设置阴影接收平面的信息
         * @param node The node for setting up the plane
         */
        _proto4.setPlaneFromNode = function setPlaneFromNode(node) {
          node.getWorldRotation(_qt);
          this.normal = Vec3.transformQuat(_v3, _up, _qt);
          node.getWorldPosition(_v3);
          this.distance = Vec3.dot(this._normal, _v3);
        };

        _proto4.activate = function activate(resource) {
          this._resource = resource;

          this._resource.initialize(this);

          this._resource.activate();
        };

        _createClass(ShadowsInfo, [{
          key: "enabled",
          get: function get() {
            return this._enabled;
          },
          set:
          /**
           * @en Whether activate planar shadow
           * @zh 是否启用平面阴影？
           */
          function set(val) {
            if (this._enabled === val) return;
            this._enabled = val;

            if (this._resource) {
              this._resource.enabled = val;

              if (val) {
                this._resource.type = this._type;
              }
            }
          }
        }, {
          key: "type",
          get: function get() {
            return this._type;
          }
          /**
           * @en Shadow color
           * @zh 阴影颜色
           */
          ,
          set: function set(val) {
            this._type = val;

            if (this._resource) {
              this._resource.type = val;
            }
          }
        }, {
          key: "shadowColor",
          get: function get() {
            return this._shadowColor;
          }
          /**
           * @en The normal of the plane which receives shadow
           * @zh 阴影接收平面的法线
           */
          ,
          set: function set(val) {
            this._shadowColor.set(val);

            if (this._resource) {
              this._resource.shadowColor = val;
            }
          }
        }, {
          key: "normal",
          get: function get() {
            return this._normal;
          }
          /**
           * @en The distance from coordinate origin to the receiving plane.
           * @zh 阴影接收平面与原点的距离
           */
          ,
          set: function set(val) {
            Vec3.copy(this._normal, val);

            if (this._resource) {
              this._resource.normal = val;
            }
          }
        }, {
          key: "distance",
          get: function get() {
            return this._distance;
          }
          /**
           * @en The normal of the plane which receives shadow
           * @zh 阴影接收平面的法线
           */
          ,
          set: function set(val) {
            this._distance = val;

            if (this._resource) {
              this._resource.distance = val;
            }
          }
        }, {
          key: "pcf",
          get: function get() {
            return this._pcf;
          }
          /**
           * @en get or set shadow max received
           * @zh 获取或者设置阴影接收的最大光源数量
           */
          ,
          set: function set(val) {
            this._pcf = val;

            if (this._resource) {
              this._resource.pcf = val;
            }
          }
        }, {
          key: "maxReceived",
          get: function get() {
            return this._maxReceived;
          }
          /**
           * @en get or set shadow map sampler offset
           * @zh 获取或者设置阴影纹理偏移值
           */
          ,
          set: function set(val) {
            this._maxReceived = val;

            if (this._resource) {
              this._resource.maxReceived = val;
            }
          }
        }, {
          key: "bias",
          get: function get() {
            return this._bias;
          }
          /**
           * @en on or off packing depth.
           * @zh 打开或者关闭深度压缩。降低阴影质量，提高性能。与 liner depth 互斥。
           */
          ,
          set: function set(val) {
            this._bias = val;

            if (this._resource) {
              this._resource.bias = val;
            }
          }
        }, {
          key: "packing",
          get: function get() {
            return this._packing;
          }
          /**
           * @en on or off linear depth.
           * @zh 打开或者关闭线性深度。提高阴影质量，降低性能。与 packing depth 互斥。
           */
          ,
          set: function set(val) {
            this._packing = val;

            if (val) {
              this._linear = this._linear ? false : this._linear;

              if (this._resource) {
                this._resource.linear = this._linear;
              }
            }

            if (this._resource) {
              this._resource.packing = val;
              this._resource.shadowMapDirty = true;
            }
          }
        }, {
          key: "linear",
          get: function get() {
            return this._linear;
          }
          /**
           * @en on or off Self-shadowing.
           * @zh 打开或者关闭自阴影。
           */
          ,
          set: function set(val) {
            this._linear = val;

            if (val) {
              this._packing = this._packing ? false : this._packing;

              if (this._resource) {
                this._resource.packing = this._packing;
              }
            }

            if (this._resource) {
              this._resource.linear = val;
            }
          }
        }, {
          key: "selfShadow",
          get: function get() {
            return this._selfShadow;
          }
          /**
           * @en on or off Self-shadowing.
           * @zh 打开或者关闭自阴影。
           */
          ,
          set: function set(val) {
            this._selfShadow = val;

            if (this._resource) {
              this._resource.selfShadow = val;
            }
          }
        }, {
          key: "normalBias",
          get: function get() {
            return this._normalBias;
          }
          /**
           * @en get or set shadow Map sampler auto adapt
           * @zh 阴影纹理生成是否自适应
           */
          ,
          set: function set(val) {
            this._normalBias = val;

            if (this._resource) {
              this._resource.normalBias = val;
            }
          }
        }, {
          key: "autoAdapt",
          get: function get() {
            return this._autoAdapt;
          }
          /**
           * @en get or set shadow camera near
           * @zh 获取或者设置阴影相机近裁剪面
           */
          ,
          set: function set(val) {
            this._autoAdapt = val;

            if (this._resource) {
              this._resource.autoAdapt = val;
            }
          }
        }, {
          key: "near",
          get: function get() {
            return this._near;
          }
          /**
           * @en get or set shadow camera far
           * @zh 获取或者设置阴影相机远裁剪面
           */
          ,
          set: function set(val) {
            this._near = val;

            if (this._resource) {
              this._resource.near = val;
            }
          }
        }, {
          key: "far",
          get: function get() {
            return this._far;
          }
          /**
           * @en get or set shadow camera orthoSize
           * @zh 获取或者设置阴影相机正交大小
           */
          ,
          set: function set(val) {
            this._far = val;

            if (this._resource) {
              this._resource.far = val;
            }
          }
        }, {
          key: "orthoSize",
          get: function get() {
            return this._orthoSize;
          }
          /**
           * @en get or set shadow map size
           * @zh 获取或者设置阴影纹理大小
           */
          ,
          set: function set(val) {
            this._orthoSize = val;

            if (this._resource) {
              this._resource.orthoSize = val;
            }
          }
        }, {
          key: "shadowMapSize",
          get: function get() {
            return this._size;
          }
          /**
           * @en get or set shadow camera aspect.
           * @zh 获取或者设置阴影相机的宽高比。
           */
          ,
          set: function set(val) {
            this._size.set(val);

            if (this._resource) {
              this._resource.size = val;
              this._resource.shadowMapDirty = true;
            }
          }
        }, {
          key: "aspect",
          get: function get() {
            return this._aspect;
          },
          set: function set(val) {
            this._aspect = val;

            if (this._resource) {
              this._resource.aspect = val;
            }
          }
        }]);

        return ShadowsInfo;
      }(), _temp4), (_descriptor17 = _applyDecoratedDescriptor(_class11.prototype, "_type", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ShadowType.Planar;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class11.prototype, "_enabled", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class11.prototype, "_normal", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, 1, 0);
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class11.prototype, "_distance", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class11.prototype, "_shadowColor", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(0, 0, 0, 76);
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class11.prototype, "_autoAdapt", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class11.prototype, "_pcf", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return PCFType.HARD;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class11.prototype, "_bias", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.00001;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class11.prototype, "_packing", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor26 = _applyDecoratedDescriptor(_class11.prototype, "_linear", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor27 = _applyDecoratedDescriptor(_class11.prototype, "_selfShadow", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor28 = _applyDecoratedDescriptor(_class11.prototype, "_normalBias", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor29 = _applyDecoratedDescriptor(_class11.prototype, "_near", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor30 = _applyDecoratedDescriptor(_class11.prototype, "_far", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor31 = _applyDecoratedDescriptor(_class11.prototype, "_aspect", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor32 = _applyDecoratedDescriptor(_class11.prototype, "_orthoSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor33 = _applyDecoratedDescriptor(_class11.prototype, "_maxReceived", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 4;
        }
      }), _descriptor34 = _applyDecoratedDescriptor(_class11.prototype, "_size", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(512, 512);
        }
      }), _applyDecoratedDescriptor(_class11.prototype, "enabled", [editable], Object.getOwnPropertyDescriptor(_class11.prototype, "enabled"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "type", [editable, _dec35], Object.getOwnPropertyDescriptor(_class11.prototype, "type"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowColor", [editable], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowColor"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normal", [_dec36], Object.getOwnPropertyDescriptor(_class11.prototype, "normal"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "distance", [_dec37, _dec38], Object.getOwnPropertyDescriptor(_class11.prototype, "distance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "pcf", [_dec39, _dec40], Object.getOwnPropertyDescriptor(_class11.prototype, "pcf"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "maxReceived", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class11.prototype, "maxReceived"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "bias", [_dec43, _dec44], Object.getOwnPropertyDescriptor(_class11.prototype, "bias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "packing", [_dec45, _dec46], Object.getOwnPropertyDescriptor(_class11.prototype, "packing"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "linear", [_dec47, _dec48], Object.getOwnPropertyDescriptor(_class11.prototype, "linear"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "selfShadow", [_dec49, _dec50], Object.getOwnPropertyDescriptor(_class11.prototype, "selfShadow"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normalBias", [_dec51, _dec52], Object.getOwnPropertyDescriptor(_class11.prototype, "normalBias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "autoAdapt", [_dec53, _dec54], Object.getOwnPropertyDescriptor(_class11.prototype, "autoAdapt"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "near", [_dec55, _dec56], Object.getOwnPropertyDescriptor(_class11.prototype, "near"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "far", [_dec57, _dec58], Object.getOwnPropertyDescriptor(_class11.prototype, "far"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "orthoSize", [_dec59, _dec60], Object.getOwnPropertyDescriptor(_class11.prototype, "orthoSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowMapSize", [_dec61], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowMapSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "aspect", [_dec62, _dec63], Object.getOwnPropertyDescriptor(_class11.prototype, "aspect"), _class11.prototype)), _class11)) || _class10));

      legacyCC.ShadowsInfo = ShadowsInfo;
      /**
       * @en All scene related global parameters, it affects all content in the corresponding scene
       * @zh 各类场景级别的渲染参数，将影响全场景的所有物体
       */

      _export("SceneGlobals", SceneGlobals = (_dec64 = ccclass('cc.SceneGlobals'), _dec65 = type(SkyboxInfo), _dec64(_class13 = (_class14 = (_temp5 = /*#__PURE__*/function () {
        function SceneGlobals() {
          _initializerDefineProperty(this, "ambient", _descriptor35, this);

          _initializerDefineProperty(this, "shadows", _descriptor36, this);

          _initializerDefineProperty(this, "_skybox", _descriptor37, this);

          _initializerDefineProperty(this, "fog", _descriptor38, this);
        }

        var _proto5 = SceneGlobals.prototype;

        _proto5.activate = function activate() {
          var sceneData = legacyCC.director.root.pipeline.pipelineSceneData;
          this.ambient.activate(sceneData.ambient);
          this.skybox.activate(sceneData.skybox);
          this.shadows.activate(sceneData.shadows);
          this.fog.activate(sceneData.fog);
        };

        _createClass(SceneGlobals, [{
          key: "skybox",
          get:
          /**
           * @en Skybox related information
           * @zh 天空盒相关信息
           */
          function get() {
            return this._skybox;
          },
          set: function set(value) {
            this._skybox = value;
          }
        }]);

        return SceneGlobals;
      }(), _temp5), (_descriptor35 = _applyDecoratedDescriptor(_class14.prototype, "ambient", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new AmbientInfo();
        }
      }), _descriptor36 = _applyDecoratedDescriptor(_class14.prototype, "shadows", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new ShadowsInfo();
        }
      }), _descriptor37 = _applyDecoratedDescriptor(_class14.prototype, "_skybox", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new SkyboxInfo();
        }
      }), _descriptor38 = _applyDecoratedDescriptor(_class14.prototype, "fog", [editable, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new FogInfo();
        }
      }), _applyDecoratedDescriptor(_class14.prototype, "skybox", [editable, _dec65], Object.getOwnPropertyDescriptor(_class14.prototype, "skybox"), _class14.prototype)), _class14)) || _class13));

      legacyCC.SceneGlobals = SceneGlobals;
    }
  };
});