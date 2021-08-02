System.register("q-bundled:///fs/cocos/core/renderer/scene/light.js", ["../../math/index.js", "../../scene-graph/node-enum.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var Vec3, TransformBit, NULL_HANDLE, LightPool, LightView, LightType, nt2lm, Light;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  // Color temperature (in Kelvin) to RGB
  function ColorTemperatureToRGB(rgb, kelvin) {
    if (kelvin < 1000.0) {
      kelvin = 1000.0;
    } else if (kelvin > 15000.0) {
      kelvin = 15000.0;
    } // Approximate Planckian locus in CIE 1960 UCS


    var kSqr = kelvin * kelvin;
    var u = (0.860117757 + 1.54118254e-4 * kelvin + 1.28641212e-7 * kSqr) / (1.0 + 8.42420235e-4 * kelvin + 7.08145163e-7 * kSqr);
    var v = (0.317398726 + 4.22806245e-5 * kelvin + 4.20481691e-8 * kSqr) / (1.0 - 2.89741816e-5 * kelvin + 1.61456053e-7 * kSqr);
    var d = 2.0 * u - 8.0 * v + 4.0;
    var x = 3.0 * u / d;
    var y = 2.0 * v / d;
    var z = 1.0 - x - y;
    var X = 1.0 / y * x;
    var Z = 1.0 / y * z; // XYZ to RGB with BT.709 primaries

    rgb.x = 3.2404542 * X + -1.5371385 + -0.4985314 * Z;
    rgb.y = -0.9692660 * X + 1.8760108 + 0.0415560 * Z;
    rgb.z = 0.0556434 * X + -0.2040259 + 1.0572252 * Z;
  }

  _export({
    ColorTemperatureToRGB: ColorTemperatureToRGB,
    LightType: void 0
  });

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_sceneGraphNodeEnumJs) {
      TransformBit = _sceneGraphNodeEnumJs.TransformBit;
    }, function (_coreMemoryPoolsJs) {
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      LightPool = _coreMemoryPoolsJs.LightPool;
      LightView = _coreMemoryPoolsJs.LightView;
    }],
    execute: function () {
      (function (LightType) {
        LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
        LightType[LightType["SPHERE"] = 1] = "SPHERE";
        LightType[LightType["SPOT"] = 2] = "SPOT";
        LightType[LightType["UNKNOWN"] = 3] = "UNKNOWN";
      })(LightType || _export("LightType", LightType = {}));

      _export("nt2lm", nt2lm = function nt2lm(size) {
        return 4 * Math.PI * Math.PI * size * size;
      });

      _export("Light", Light = /*#__PURE__*/function () {
        function Light() {
          this._baked = false;
          this._color = new Vec3(1, 1, 1);
          this._colorTemp = 6550.0;
          this._colorTempRGB = new Vec3(1, 1, 1);
          this._scene = null;
          this._node = null;
          this._name = null;
          this._handle = NULL_HANDLE;
        }

        var _proto = Light.prototype;

        _proto.initialize = function initialize() {
          this._handle = LightPool.alloc();
          LightPool.setVec3(this._handle, LightView.COLOR, this._color);
          LightPool.setVec3(this._handle, LightView.COLOR_TEMPERATURE_RGB, this._colorTempRGB);
          LightPool.set(this._handle, LightView.TYPE, LightType.UNKNOWN);
        };

        _proto.attachToScene = function attachToScene(scene) {
          this._scene = scene;
        };

        _proto.detachFromScene = function detachFromScene() {
          this._scene = null;
        };

        _proto.destroy = function destroy() {
          this._name = null;
          this._node = null;

          if (this._handle) {
            LightPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        };

        _proto.update = function update() {};

        _createClass(Light, [{
          key: "baked",
          get: function get() {
            return this._baked;
          },
          set: function set(val) {
            this._baked = val;
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          },
          set: function set(color) {
            this._color.set(color);

            LightPool.setVec3(this._handle, LightView.COLOR, color);
          }
        }, {
          key: "useColorTemperature",
          get: function get() {
            return LightPool.get(this._handle, LightView.USE_COLOR_TEMPERATURE) === 1;
          },
          set: function set(enable) {
            LightPool.set(this._handle, LightView.USE_COLOR_TEMPERATURE, enable ? 1 : 0);
          }
        }, {
          key: "colorTemperature",
          get: function get() {
            return this._colorTemp;
          },
          set: function set(val) {
            this._colorTemp = val;
            ColorTemperatureToRGB(this._colorTempRGB, this._colorTemp);
            LightPool.setVec3(this._handle, LightView.COLOR_TEMPERATURE_RGB, this._colorTempRGB);
          }
        }, {
          key: "colorTemperatureRGB",
          get: function get() {
            return this._colorTempRGB;
          }
        }, {
          key: "node",
          get: function get() {
            return this._node;
          },
          set: function set(n) {
            this._node = n;

            if (this._node) {
              this._node.hasChangedFlags |= TransformBit.ROTATION;
              LightPool.set(this._handle, LightView.NODE, this._node.handle);
            }
          }
        }, {
          key: "type",
          get: function get() {
            return LightPool.get(this._handle, LightView.TYPE);
          }
        }, {
          key: "name",
          get: function get() {
            return this._name;
          },
          set: function set(n) {
            this._name = n;
          }
        }, {
          key: "scene",
          get: function get() {
            return this._scene;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }]);

        return Light;
      }());
    }
  };
});