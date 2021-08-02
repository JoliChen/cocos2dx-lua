System.register("q-bundled:///fs/cocos/physics/ammo/ammo-contact-equation.js", ["../../core/index.js", "./ammo-util.js", "./ammo-const.js"], function (_export, _context) {
  "use strict";

  var Vec3, Quat, ammo2CocosVec3, ammo2CocosQuat, CC_QUAT_0, AmmoConstant, AmmoContactEquation;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }, function (_ammoUtilJs) {
      ammo2CocosVec3 = _ammoUtilJs.ammo2CocosVec3;
      ammo2CocosQuat = _ammoUtilJs.ammo2CocosQuat;
    }, function (_ammoConstJs) {
      CC_QUAT_0 = _ammoConstJs.CC_QUAT_0;
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }],
    execute: function () {
      _export("AmmoContactEquation", AmmoContactEquation = /*#__PURE__*/function () {
        function AmmoContactEquation(event) {
          this.impl = null;
          this.event = void 0;
          this.event = event;
        }

        var _proto = AmmoContactEquation.prototype;

        _proto.getLocalPointOnA = function getLocalPointOnA(out) {
          if (this.impl) ammo2CocosVec3(out, this.impl.m_localPointA);
        };

        _proto.getLocalPointOnB = function getLocalPointOnB(out) {
          if (this.impl) ammo2CocosVec3(out, this.impl.m_localPointB);
        };

        _proto.getWorldPointOnA = function getWorldPointOnA(out) {
          if (this.impl) ammo2CocosVec3(out, this.impl.m_positionWorldOnA);
        };

        _proto.getWorldPointOnB = function getWorldPointOnB(out) {
          if (this.impl) ammo2CocosVec3(out, this.impl.m_positionWorldOnB);
        };

        _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
          if (this.impl) {
            ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
            if (!this.isBodyA) Vec3.negate(out, out);
            var inv_rot = CC_QUAT_0;
            var bt_rot = AmmoConstant.instance.QUAT_0;
            var body = this.event.impl.getBody0();
            body.getWorldTransform().getBasis().getRotation(bt_rot);
            ammo2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            Vec3.transformQuat(out, out, inv_rot);
          }
        };

        _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
          if (this.impl) {
            var inv_rot = CC_QUAT_0;
            var bt_rot = AmmoConstant.instance.QUAT_0;
            var body = this.event.impl.getBody1();
            body.getWorldTransform().getBasis().getRotation(bt_rot);
            ammo2CocosQuat(inv_rot, bt_rot);
            Quat.conjugate(inv_rot, inv_rot);
            ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
            Vec3.transformQuat(out, out, inv_rot);
          }
        };

        _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
          if (this.impl) {
            ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
            if (!this.isBodyA) Vec3.negate(out, out);
          }
        };

        _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
          if (this.impl) ammo2CocosVec3(out, this.impl.m_normalWorldOnB);
        };

        _createClass(AmmoContactEquation, [{
          key: "isBodyA",
          get: function get() {
            var sb = this.event.selfCollider.shape.sharedBody.body;
            var b0 = this.event.impl.getBody0();
            return Ammo.compare(b0, sb);
          }
        }]);

        return AmmoContactEquation;
      }());
    }
  };
});