System.register("q-bundled:///fs/cocos/core/renderer/scene/directional-light.js", ["../../math/index.js", "./ambient.js", "./light.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var Vec3, Ambient, Light, LightType, LightPool, LightView, _forward, _v3, DirectionalLight;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_ambientJs) {
      Ambient = _ambientJs.Ambient;
    }, function (_lightJs) {
      Light = _lightJs.Light;
      LightType = _lightJs.LightType;
    }, function (_coreMemoryPoolsJs) {
      LightPool = _coreMemoryPoolsJs.LightPool;
      LightView = _coreMemoryPoolsJs.LightView;
    }],
    execute: function () {
      _forward = new Vec3(0, 0, -1);
      _v3 = new Vec3();

      _export("DirectionalLight", DirectionalLight = /*#__PURE__*/function (_Light) {
        _inheritsLoose(DirectionalLight, _Light);

        function DirectionalLight() {
          var _this;

          _this = _Light.call(this) || this;
          _this._dir = new Vec3(1.0, -1.0, -1.0);
          return _this;
        }

        var _proto = DirectionalLight.prototype;

        _proto.initialize = function initialize() {
          _Light.prototype.initialize.call(this);

          LightPool.set(this._handle, LightView.ILLUMINANCE, Ambient.SUN_ILLUM);
          LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
          LightPool.set(this._handle, LightView.TYPE, LightType.DIRECTIONAL);
        };

        _proto.update = function update() {
          if (this._node && this._node.hasChangedFlags) {
            this.direction = Vec3.transformQuat(_v3, _forward, this._node.worldRotation);
          }
        };

        _createClass(DirectionalLight, [{
          key: "direction",
          get: function get() {
            return this._dir;
          } // in Lux(lx)
          ,
          set: function set(dir) {
            Vec3.normalize(this._dir, dir);
            LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
          }
        }, {
          key: "illuminance",
          get: function get() {
            return LightPool.get(this._handle, LightView.ILLUMINANCE);
          },
          set: function set(illum) {
            LightPool.set(this._handle, LightView.ILLUMINANCE, illum);
          }
        }]);

        return DirectionalLight;
      }(Light));
    }
  };
});