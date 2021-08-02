System.register("q-bundled:///fs/cocos/physics/ammo/ammo-const.js", ["./ammo-instantiated.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var Ammo, Vec3, Quat, TriggerEventObject, CollisionEventObject, AmmoConstant, CC_V3_0, CC_V3_1, CC_QUAT_0;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
    }],
    execute: function () {
      _export("TriggerEventObject", TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: null
      });

      _export("CollisionEventObject", CollisionEventObject = {
        type: 'onCollisionEnter',
        selfCollider: null,
        otherCollider: null,
        contacts: [],
        impl: null
      });

      _export("AmmoConstant", AmmoConstant = /*#__PURE__*/function () {
        function AmmoConstant() {
          this.EMPTY_SHAPE = new Ammo.btEmptyShape();
          this.TRANSFORM = new Ammo.btTransform();
          this.TRANSFORM_1 = new Ammo.btTransform();
          this.VECTOR3_0 = new Ammo.btVector3();
          this.VECTOR3_1 = new Ammo.btVector3();
          this.QUAT_0 = new Ammo.btQuaternion();
        }

        _createClass(AmmoConstant, null, [{
          key: "instance",
          get: function get() {
            if (AmmoConstant._instance == null) AmmoConstant._instance = new AmmoConstant();
            return AmmoConstant._instance;
          }
        }]);

        return AmmoConstant;
      }());

      AmmoConstant._instance = void 0;

      _export("CC_V3_0", CC_V3_0 = new Vec3());

      _export("CC_V3_1", CC_V3_1 = new Vec3());

      _export("CC_QUAT_0", CC_QUAT_0 = new Quat());
    }
  };
});