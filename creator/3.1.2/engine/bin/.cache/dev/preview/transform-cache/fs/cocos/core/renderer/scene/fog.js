System.register("q-bundled:///fs/cocos/core/renderer/scene/fog.js", ["../../value-types/index.js", "../../math/index.js", "../../global-exports.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var Enum, Color, legacyCC, FogPool, NULL_HANDLE, FogView, FogType, FOG_TYPE_NONE, Fog;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_valueTypesIndexJs) {
      Enum = _valueTypesIndexJs.Enum;
    }, function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_coreMemoryPoolsJs) {
      FogPool = _coreMemoryPoolsJs.FogPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      FogView = _coreMemoryPoolsJs.FogView;
    }],
    execute: function () {
      /**
       * @zh
       * 全局雾类型。
       * @en
       * The global fog type
       * @static
       * @enum FogInfo.FogType
       */
      _export("FogType", FogType = Enum({
        /**
         * @zh
         * 线性雾。
         * @en
         * Linear fog
         * @readonly
         */
        LINEAR: 0,

        /**
         * @zh
         * 指数雾。
         * @en
         * Exponential fog
         * @readonly
         */
        EXP: 1,

        /**
         * @zh
         * 指数平方雾。
         * @en
         * Exponential square fog
         * @readonly
         */
        EXP_SQUARED: 2,

        /**
         * @zh
         * 层叠雾。
         * @en
         * Layered fog
         * @readonly
         */
        LAYERED: 3
      }));

      FOG_TYPE_NONE = FogType.LAYERED + 1;

      _export("Fog", Fog = /*#__PURE__*/function () {
        function Fog() {
          this._fogColor = new Color('#C8C8C8');
          this._colorArray = new Float32Array([0.2, 0.2, 0.2, 1.0]);
          this._handle = NULL_HANDLE;
          this._handle = FogPool.alloc();
        }

        var _proto = Fog.prototype;

        _proto.initialize = function initialize(fogInfo) {
          FogPool.set(this._handle, FogView.ENABLE, fogInfo.enabled ? 1 : 0);
          FogPool.set(this._handle, FogView.TYPE, fogInfo.enabled ? fogInfo.type : FOG_TYPE_NONE);

          this._fogColor.set(fogInfo.fogColor);

          Color.toArray(this._colorArray, this._fogColor);
          FogPool.setVec4(this._handle, FogView.COLOR, this._fogColor);
          FogPool.set(this._handle, FogView.DENSITY, fogInfo.fogDensity);
          FogPool.set(this._handle, FogView.START, fogInfo.fogStart);
          FogPool.set(this._handle, FogView.END, fogInfo.fogEnd);
          FogPool.set(this._handle, FogView.ATTEN, fogInfo.fogAtten);
          FogPool.set(this._handle, FogView.TOP, fogInfo.fogTop);
          FogPool.set(this._handle, FogView.RANGE, fogInfo.fogRange);
        };

        _proto.activate = function activate() {
          this._updatePipeline();
        };

        _proto._updatePipeline = function _updatePipeline() {
          var root = legacyCC.director.root;
          var value = this.enabled ? this.type : FOG_TYPE_NONE;
          var pipeline = root.pipeline;

          if (pipeline.macros.CC_USE_FOG === value) {
            return;
          }

          pipeline.macros.CC_USE_FOG = value;
          root.onGlobalPipelineStateChanged();
        };

        _proto.destroy = function destroy() {
          if (this._handle) {
            FogPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        };

        _createClass(Fog, [{
          key: "enabled",
          get: function get() {
            return FogPool.get(this._handle, FogView.ENABLE);
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
            FogPool.set(this._handle, FogView.ENABLE, val ? 1 : 0);
            if (!val) FogPool.set(this._handle, FogView.TYPE, FOG_TYPE_NONE);
            val ? this.activate() : this._updatePipeline();
          }
        }, {
          key: "fogColor",
          get: function get() {
            return this._fogColor;
          }
          /**
           * @zh 当前雾化类型。
           * @en The current global fog type.
           * @returns {FogType}
           * Returns the current global fog type
           * - -1:Disable global Fog
           * - 0:Linear fog
           * - 1:Exponential fog
           * - 2:Exponential square fog
           * - 3:Layered fog
           */
          ,
          set: function set(val) {
            this._fogColor.set(val);

            Color.toArray(this._colorArray, this._fogColor);
            FogPool.setVec4(this._handle, FogView.COLOR, this._fogColor);
          }
        }, {
          key: "type",
          get: function get() {
            return FogPool.get(this._handle, FogView.TYPE);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.TYPE, this.enabled ? val : FOG_TYPE_NONE);
            if (this.enabled) this._updatePipeline();
          }
          /**
           * @zh 全局雾浓度
           * @en Global fog density
           */

        }, {
          key: "fogDensity",
          get: function get() {
            return FogPool.get(this._handle, FogView.DENSITY);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.DENSITY, val);
          }
          /**
           * @zh 雾效起始位置，只适用于线性雾
           * @en Global fog start position, only for linear fog
           */

        }, {
          key: "fogStart",
          get: function get() {
            return FogPool.get(this._handle, FogView.START);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.START, val);
          }
          /**
           * @zh 雾效结束位置，只适用于线性雾
           * @en Global fog end position, only for linear fog
           */

        }, {
          key: "fogEnd",
          get: function get() {
            return FogPool.get(this._handle, FogView.END);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.END, val);
          }
          /**
           * @zh 雾效衰减
           * @en Global fog attenuation
           */

        }, {
          key: "fogAtten",
          get: function get() {
            return FogPool.get(this._handle, FogView.ATTEN);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.ATTEN, val);
          }
          /**
           * @zh 雾效顶部范围，只适用于层级雾
           * @en Global fog top range, only for layered fog
           */

        }, {
          key: "fogTop",
          get: function get() {
            return FogPool.get(this._handle, FogView.TOP);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.TOP, val);
          }
          /**
           * @zh 雾效范围，只适用于层级雾
           * @en Global fog range, only for layered fog
           */

        }, {
          key: "fogRange",
          get: function get() {
            return FogPool.get(this._handle, FogView.RANGE);
          },
          set: function set(val) {
            FogPool.set(this._handle, FogView.RANGE, val);
          }
        }, {
          key: "colorArray",
          get: function get() {
            return this._colorArray;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }]);

        return Fog;
      }());

      legacyCC.Fog = Fog;
    }
  };
});