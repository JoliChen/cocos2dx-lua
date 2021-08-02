System.register("q-bundled:///fs/cocos/physics/physx/physx-contact-equation.js", ["../../core/index.js", "./export-physx.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, getContactNormal, getContactPosition, quat, PhysXContactEquation;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_exportPhysxJs) {
      getContactNormal = _exportPhysxJs.getContactNormal;
      getContactPosition = _exportPhysxJs.getContactPosition;
    }],
    execute: function () {
      quat = new Quat();

      _export("PhysXContactEquation", PhysXContactEquation = /*#__PURE__*/function () {
        function PhysXContactEquation(event) {
          this.impl = null;
          this.event = void 0;
          this.event = event;
        }

        var _proto = PhysXContactEquation.prototype;

        _proto.getLocalPointOnA = function getLocalPointOnA(out) {
          getContactPosition(this.impl, out, this.event.impl);
          Vec3.subtract(out, out, this.colliderA.node.worldPosition);
        };

        _proto.getLocalPointOnB = function getLocalPointOnB(out) {
          getContactPosition(this.impl, out, this.event.impl);
          Vec3.subtract(out, out, this.colliderB.node.worldPosition);
        };

        _proto.getWorldPointOnA = function getWorldPointOnA(out) {
          getContactPosition(this.impl, out, this.event.impl);
        };

        _proto.getWorldPointOnB = function getWorldPointOnB(out) {
          getContactPosition(this.impl, out, this.event.impl);
        };

        _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
          this.getWorldNormalOnA(out);
          Quat.conjugate(quat, this.colliderA.node.worldRotation);
          Vec3.transformQuat(out, out, quat);
        };

        _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
          this.getWorldNormalOnB(out);
          Quat.conjugate(quat, this.colliderB.node.worldRotation);
          Vec3.transformQuat(out, out, quat);
        };

        _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
          getContactNormal(this.impl, out, this.event.impl);
          if (!this.isBodyA) Vec3.negate(out, out);
        };

        _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
          getContactNormal(this.impl, out, this.event.impl);
        };

        _createClass(PhysXContactEquation, [{
          key: "isBodyA",
          get: function get() {
            return this.colliderA.uuid === this.event.selfCollider.uuid;
          }
        }]);

        return PhysXContactEquation;
      }());
    }
  };
});