System.register("q-bundled:///fs/cocos/physics/cannon/cannon-contact-equation.js", ["../../core/index.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, quat, CannonContactEquation;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      quat = new Quat();

      _export("CannonContactEquation", CannonContactEquation = /*#__PURE__*/function () {
        function CannonContactEquation(event) {
          this.impl = null;
          this.event = void 0;
          this.event = event;
        }

        var _proto = CannonContactEquation.prototype;

        _proto.getLocalPointOnA = function getLocalPointOnA(out) {
          if (this.impl) Vec3.copy(out, this.impl.rj);
        };

        _proto.getLocalPointOnB = function getLocalPointOnB(out) {
          if (this.impl) Vec3.copy(out, this.impl.ri);
        };

        _proto.getWorldPointOnA = function getWorldPointOnA(out) {
          if (this.impl) Vec3.add(out, this.impl.rj, this.impl.bj.position);
        };

        _proto.getWorldPointOnB = function getWorldPointOnB(out) {
          if (this.impl) Vec3.add(out, this.impl.ri, this.impl.bi.position);
        };

        _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
          if (this.impl) {
            this.getWorldNormalOnA(out);
            Quat.conjugate(quat, this.impl.bi.quaternion);
            Vec3.transformQuat(out, out, quat);
          }
        };

        _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
          if (this.impl) {
            Quat.conjugate(quat, this.impl.bj.quaternion);
            Vec3.transformQuat(out, this.impl.ni, quat);
          }
        };

        _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
          if (this.impl) {
            this.getWorldNormalOnB(out);
            if (!this.isBodyA) Vec3.negate(out, out);
          }
        };

        _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
          if (this.impl) Vec3.copy(out, this.impl.ni);
        };

        _createClass(CannonContactEquation, [{
          key: "isBodyA",
          get: function get() {
            if (this.impl) {
              var si = this.event.selfCollider.shape.impl;
              var bj = this.impl.bj;
              return si.body.id === bj.id;
            }

            return false;
          }
        }]);

        return CannonContactEquation;
      }());
    }
  };
});