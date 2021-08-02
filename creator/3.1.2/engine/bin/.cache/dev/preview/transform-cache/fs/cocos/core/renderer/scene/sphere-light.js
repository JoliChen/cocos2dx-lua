System.register("q-bundled:///fs/cocos/core/renderer/scene/sphere-light.js", ["../../geometry/index.js", "../../math/index.js", "./light.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var AABB, Vec3, Light, LightType, nt2lm, AABBPool, AABBView, LightPool, LightView, NULL_HANDLE, SphereLight;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_lightJs) {
      Light = _lightJs.Light;
      LightType = _lightJs.LightType;
      nt2lm = _lightJs.nt2lm;
    }, function (_coreMemoryPoolsJs) {
      AABBPool = _coreMemoryPoolsJs.AABBPool;
      AABBView = _coreMemoryPoolsJs.AABBView;
      LightPool = _coreMemoryPoolsJs.LightPool;
      LightView = _coreMemoryPoolsJs.LightView;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
    }],
    execute: function () {
      _export("SphereLight", SphereLight = /*#__PURE__*/function (_Light) {
        _inheritsLoose(SphereLight, _Light);

        function SphereLight() {
          var _this;

          _this = _Light.call(this) || this;
          _this._needUpdate = false;
          _this._pos = void 0;
          _this._aabb = void 0;
          _this._hAABB = NULL_HANDLE;
          _this._aabb = AABB.create();
          _this._pos = new Vec3();
          return _this;
        }

        var _proto = SphereLight.prototype;

        _proto.initialize = function initialize() {
          _Light.prototype.initialize.call(this);

          this._hAABB = AABBPool.alloc();
          var size = 0.15;
          LightPool.set(this._handle, LightView.TYPE, LightType.SPHERE);
          LightPool.set(this._handle, LightView.SIZE, size);
          LightPool.set(this._handle, LightView.RANGE, 1.0);
          LightPool.set(this._handle, LightView.AABB, this._hAABB);
          LightPool.set(this._handle, LightView.ILLUMINANCE, 1700 / nt2lm(size));
        };

        _proto.update = function update() {
          if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
            this._node.getWorldPosition(this._pos);

            var range = LightPool.get(this._handle, LightView.RANGE);
            AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);
            this._needUpdate = false;
            LightPool.setVec3(this._handle, LightView.POSITION, this._pos);
            AABBPool.setVec3(this._hAABB, AABBView.CENTER, this._aabb.center);
            AABBPool.setVec3(this._hAABB, AABBView.HALF_EXTENSION, this._aabb.halfExtents);
          }
        };

        _proto.destroy = function destroy() {
          if (this._hAABB) {
            AABBPool.free(this._hAABB);
            this._hAABB = NULL_HANDLE;
          }

          return _Light.prototype.destroy.call(this);
        };

        _createClass(SphereLight, [{
          key: "position",
          get: function get() {
            return this._pos;
          }
        }, {
          key: "size",
          get: function get() {
            return LightPool.get(this._handle, LightView.SIZE);
          },
          set: function set(size) {
            LightPool.set(this._handle, LightView.SIZE, size);
          }
        }, {
          key: "range",
          get: function get() {
            return LightPool.get(this._handle, LightView.RANGE);
          },
          set: function set(range) {
            LightPool.set(this._handle, LightView.RANGE, range);
            this._needUpdate = true;
          }
        }, {
          key: "luminance",
          get: function get() {
            return LightPool.get(this._handle, LightView.ILLUMINANCE);
          },
          set: function set(lum) {
            LightPool.set(this._handle, LightView.ILLUMINANCE, lum);
          }
        }, {
          key: "aabb",
          get: function get() {
            return this._aabb;
          }
        }]);

        return SphereLight;
      }(Light));
    }
  };
});