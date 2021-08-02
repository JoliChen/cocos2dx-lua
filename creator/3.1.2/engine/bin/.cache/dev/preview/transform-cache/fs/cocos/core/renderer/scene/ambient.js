System.register("q-bundled:///fs/cocos/core/renderer/scene/ambient.js", ["../../math/index.js", "../core/memory-pools.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var Color, Vec3, AmbientPool, NULL_HANDLE, AmbientView, legacyCC, Ambient;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Color = _mathIndexJs.Color;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_coreMemoryPoolsJs) {
      AmbientPool = _coreMemoryPoolsJs.AmbientPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      AmbientView = _coreMemoryPoolsJs.AmbientView;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("Ambient", Ambient = /*#__PURE__*/function () {
        function Ambient() {
          this._skyColor = new Color(51, 128, 204, 1.0);
          this._groundAlbedo = new Color(51, 51, 51, 255);
          this._albedoArray = Float32Array.from([0.2, 0.2, 0.2, 1.0]);
          this._colorArray = Float32Array.from([0.2, 0.5, 0.8, 1.0]);
          this._handle = NULL_HANDLE;
          this._handle = AmbientPool.alloc();
        }

        var _proto = Ambient.prototype;

        _proto.initialize = function initialize(ambientInfo) {
          this._skyColor.set(ambientInfo.skyColor);

          this._groundAlbedo.set(ambientInfo.groundAlbedo);

          Color.toArray(this._colorArray, this._skyColor);
          Vec3.toArray(this._albedoArray, this._groundAlbedo);
          AmbientPool.setVec4(this._handle, AmbientView.SKY_COLOR, this._skyColor);
          AmbientPool.setVec4(this._handle, AmbientView.GROUND_ALBEDO, this._groundAlbedo);
          AmbientPool.set(this._handle, AmbientView.ILLUM, ambientInfo.skyIllum);
        };

        _proto.destroy = function destroy() {
          if (this._handle) {
            AmbientPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        };

        _createClass(Ambient, [{
          key: "colorArray",
          get: function get() {
            return this._colorArray;
          }
        }, {
          key: "albedoArray",
          get: function get() {
            return this._albedoArray;
          }
          /**
           * @en Enable ambient
           * @zh 是否开启环境光
           */

        }, {
          key: "enabled",
          get: function get() {
            return AmbientPool.get(this._handle, AmbientView.ENABLE);
          }
          /**
           * @en Sky color
           * @zh 天空颜色
           */
          ,
          set: function set(val) {
            AmbientPool.set(this._handle, AmbientView.ENABLE, val ? 1 : 0);
          }
        }, {
          key: "skyColor",
          get: function get() {
            return this._skyColor;
          },
          set: function set(color) {
            this._skyColor.set(color);

            Color.toArray(this._colorArray, this._skyColor);
            AmbientPool.setVec4(this._handle, AmbientView.SKY_COLOR, this._skyColor);
          }
          /**
           * @en Sky illuminance
           * @zh 天空亮度
           */

        }, {
          key: "skyIllum",
          get: function get() {
            return AmbientPool.get(this._handle, AmbientView.ILLUM);
          },
          set: function set(illum) {
            AmbientPool.set(this._handle, AmbientView.ILLUM, illum);
          }
          /**
           * @en Ground color
           * @zh 地面颜色
           */

        }, {
          key: "groundAlbedo",
          get: function get() {
            return this._groundAlbedo;
          },
          set: function set(color) {
            this._groundAlbedo.set(color);

            Vec3.toArray(this._albedoArray, this._groundAlbedo);
            AmbientPool.setVec4(this._handle, AmbientView.GROUND_ALBEDO, this._groundAlbedo);
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }]);

        return Ambient;
      }());

      Ambient.SUN_ILLUM = 65000.0;
      Ambient.SKY_ILLUM = 20000.0;
      legacyCC.Ambient = Ambient;
    }
  };
});