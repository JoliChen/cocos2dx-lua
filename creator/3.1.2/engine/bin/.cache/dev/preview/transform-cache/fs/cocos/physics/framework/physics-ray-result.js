System.register("q-bundled:///fs/cocos/physics/framework/physics-ray-result.js", ["../../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, PhysicsRayResult;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }],
    execute: function () {
      /**
       * @en
       * Used to store physics ray test results.
       * @zh
       * 用于保存物理射线检测结果。
       */
      _export("PhysicsRayResult", PhysicsRayResult = /*#__PURE__*/function () {
        function PhysicsRayResult() {
          this._hitPoint = new Vec3();
          this._hitNormal = new Vec3();
          this._distance = 0;
          this._collider = null;
        }

        var _proto = PhysicsRayResult.prototype;

        /**
         * @en
         * internal methods.
         * @zh
         * 设置射线，此方法由引擎内部使用，请勿在外部脚本调用。
         */
        _proto._assign = function _assign(hitPoint, distance, collider, hitNormal) {
          Vec3.copy(this._hitPoint, hitPoint);
          Vec3.copy(this._hitNormal, hitNormal);
          this._distance = distance;
          this._collider = collider;
        }
        /**
         * @en
         * clone.
         * @zh
         * 克隆。
         */
        ;

        _proto.clone = function clone() {
          var c = new PhysicsRayResult();
          Vec3.copy(c._hitPoint, this._hitPoint);
          Vec3.copy(c._hitNormal, this._hitNormal);
          c._distance = this._distance;
          c._collider = this._collider;
          return c;
        };

        _createClass(PhysicsRayResult, [{
          key: "hitPoint",
          get:
          /**
           * @en
           * The hit point，in world space.
           * @zh
           * 在世界坐标系下的击中点。
           */
          function get() {
            return this._hitPoint;
          }
          /**
           * @en
           * The distance between the ray origin with the hit.
           * @zh
           * 距离。
           */

        }, {
          key: "distance",
          get: function get() {
            return this._distance;
          }
          /**
           * @en
           * The collider hit by the ray.
           * @zh
           * 击中的碰撞盒
           */

        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
          /**
           * @en
           * The normal of the hit plane，in world space.
           * @zh
           * 在世界坐标系下击中面的法线。
           */

        }, {
          key: "hitNormal",
          get: function get() {
            return this._hitNormal;
          }
        }]);

        return PhysicsRayResult;
      }());
    }
  };
});