System.register("q-bundled:///fs/cocos/core/renderer/scene/spot-light.js", ["../../geometry/index.js", "../../math/index.js", "./light.js", "../core/memory-pools.js", "../../geometry/frustum.js"], function (_export, _context) {
  "use strict";

  var AABB, Frustum, Mat4, Quat, Vec3, Light, LightType, nt2lm, AABBPool, AABBView, FrustumPool, LightPool, LightView, NULL_HANDLE, recordFrustumToSharedMemory, _forward, _qt, _matView, _matProj, _matViewProj, _matViewProjInv, SpotLight;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      Frustum = _geometryIndexJs.Frustum;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Quat = _mathIndexJs.Quat;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_lightJs) {
      Light = _lightJs.Light;
      LightType = _lightJs.LightType;
      nt2lm = _lightJs.nt2lm;
    }, function (_coreMemoryPoolsJs) {
      AABBPool = _coreMemoryPoolsJs.AABBPool;
      AABBView = _coreMemoryPoolsJs.AABBView;
      FrustumPool = _coreMemoryPoolsJs.FrustumPool;
      LightPool = _coreMemoryPoolsJs.LightPool;
      LightView = _coreMemoryPoolsJs.LightView;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
    }, function (_geometryFrustumJs) {
      recordFrustumToSharedMemory = _geometryFrustumJs.recordFrustumToSharedMemory;
    }],
    execute: function () {
      _forward = new Vec3(0, 0, -1);
      _qt = new Quat();
      _matView = new Mat4();
      _matProj = new Mat4();
      _matViewProj = new Mat4();
      _matViewProjInv = new Mat4();

      _export("SpotLight", SpotLight = /*#__PURE__*/function (_Light) {
        _inheritsLoose(SpotLight, _Light);

        function SpotLight() {
          var _this;

          _this = _Light.call(this) || this;
          _this._dir = new Vec3(1.0, -1.0, -1.0);
          _this._range = 5.0;
          _this._spotAngle = Math.cos(Math.PI / 6);
          _this._pos = void 0;
          _this._aabb = void 0;
          _this._frustum = void 0;
          _this._angle = 0;
          _this._needUpdate = false;
          _this._hAABB = NULL_HANDLE;
          _this._hFrustum = NULL_HANDLE;
          _this._aabb = AABB.create();
          _this._frustum = Frustum.create();
          _this._pos = new Vec3();
          return _this;
        }

        var _proto = SpotLight.prototype;

        _proto.initialize = function initialize() {
          _Light.prototype.initialize.call(this);

          this._hAABB = AABBPool.alloc();
          this._hFrustum = FrustumPool.alloc();
          var size = 0.15;
          LightPool.set(this._handle, LightView.TYPE, LightType.SPOT);
          LightPool.set(this._handle, LightView.SIZE, size);
          LightPool.set(this._handle, LightView.AABB, this._hAABB);
          LightPool.set(this._handle, LightView.ILLUMINANCE, 1700 / nt2lm(size));
          LightPool.set(this._handle, LightView.RANGE, Math.cos(Math.PI / 6));
          LightPool.set(this._handle, LightView.ASPECT, 1.0);
          LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
          LightPool.set(this._handle, LightView.FRUSTUM, this._hFrustum);
        };

        _proto.update = function update() {
          if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
            this._node.getWorldPosition(this._pos);

            Vec3.transformQuat(this._dir, _forward, this._node.getWorldRotation(_qt));
            Vec3.normalize(this._dir, this._dir);
            LightPool.setVec3(this._handle, LightView.DIRECTION, this._dir);
            AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range); // view matrix

            this._node.getWorldRT(_matView);

            Mat4.invert(_matView, _matView);
            Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range); // view-projection

            Mat4.multiply(_matViewProj, _matProj, _matView); // Mat4.invert(_matViewProjInv, _matViewProj);

            this._frustum.update(_matViewProj, _matViewProjInv);

            this._needUpdate = false;
            LightPool.setVec3(this._handle, LightView.POSITION, this._pos);
            AABBPool.setVec3(this._hAABB, AABBView.CENTER, this._aabb.center);
            AABBPool.setVec3(this._hAABB, AABBView.HALF_EXTENSION, this._aabb.halfExtents);
            recordFrustumToSharedMemory(this._hFrustum, this._frustum);
          }
        };

        _proto.destroy = function destroy() {
          if (this._hAABB) {
            AABBPool.free(this._hAABB);
            this._hAABB = NULL_HANDLE;
          }

          if (this._hFrustum) {
            FrustumPool.free(this._hFrustum);
            this._hFrustum = NULL_HANDLE;
          }

          return _Light.prototype.destroy.call(this);
        };

        _createClass(SpotLight, [{
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
            this._range = range;
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
          key: "direction",
          get: function get() {
            return this._dir;
          }
        }, {
          key: "spotAngle",
          get: function get() {
            return LightPool.get(this._handle, LightView.SPOT_ANGLE);
          },
          set: function set(val) {
            this._angle = val;
            LightPool.set(this._handle, LightView.SPOT_ANGLE, Math.cos(val * 0.5));
            this._needUpdate = true;
          }
        }, {
          key: "aspect",
          get: function get() {
            return LightPool.get(this._handle, LightView.ASPECT);
          },
          set: function set(val) {
            LightPool.set(this._handle, LightView.ASPECT, val);
            this._needUpdate = true;
          }
        }, {
          key: "aabb",
          get: function get() {
            return this._aabb;
          }
        }, {
          key: "frustum",
          get: function get() {
            return this._frustum;
          }
        }]);

        return SpotLight;
      }(Light));
    }
  };
});