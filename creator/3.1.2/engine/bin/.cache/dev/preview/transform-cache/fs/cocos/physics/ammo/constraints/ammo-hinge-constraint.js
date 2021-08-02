System.register("q-bundled:///fs/cocos/physics/ammo/constraints/ammo-hinge-constraint.js", ["../ammo-instantiated.js", "./ammo-constraint.js", "../../../core/index.js", "../ammo-util.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoConstraint, Quat, Vec3, cocos2AmmoQuat, cocos2AmmoVec3, AmmoConstant, CC_QUAT_0, CC_V3_0, AmmoHingeConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_ammoConstraintJs) {
      AmmoConstraint = _ammoConstraintJs.AmmoConstraint;
    }, function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_ammoUtilJs) {
      cocos2AmmoQuat = _ammoUtilJs.cocos2AmmoQuat;
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
      CC_QUAT_0 = _ammoConstJs.CC_QUAT_0;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
    }],
    execute: function () {
      _export("AmmoHingeConstraint", AmmoHingeConstraint = /*#__PURE__*/function (_AmmoConstraint) {
        _inheritsLoose(AmmoHingeConstraint, _AmmoConstraint);

        function AmmoHingeConstraint() {
          return _AmmoConstraint.apply(this, arguments) || this;
        }

        var _proto = AmmoHingeConstraint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          this.updateFrames();
        };

        _proto.setPivotB = function setPivotB(v) {
          this.updateFrames();
        };

        _proto.setAxis = function setAxis(v) {
          this.updateFrames();
        };

        _proto.onComponentSet = function onComponentSet() {
          var sb0 = this._rigidBody.body.sharedBody;
          var cb = this.constraint.connectedBody;
          var bodyB = cb ? cb.body.impl : sb0.wrappedWorld.impl.getFixedBody();
          var trans0 = AmmoConstant.instance.TRANSFORM;
          var trans1 = AmmoConstant.instance.TRANSFORM_1;
          this._impl = new Ammo.btHingeConstraint(sb0.body, bodyB, trans0, trans1);
          this.updateFrames();
        };

        _proto.updateFrames = function updateFrames() {
          var cs = this.constraint;
          var node = cs.node;
          var v3_0 = CC_V3_0;
          var rot_0 = CC_QUAT_0;
          var trans0 = AmmoConstant.instance.TRANSFORM;
          Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
          cocos2AmmoVec3(trans0.getOrigin(), v3_0);
          var quat = AmmoConstant.instance.QUAT_0;
          Quat.rotationTo(rot_0, Vec3.UNIT_Z, cs.axis);
          trans0.setRotation(cocos2AmmoQuat(quat, rot_0));
          var trans1 = AmmoConstant.instance.TRANSFORM_1;
          var cb = this.constraint.connectedBody;

          if (cb) {
            Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
          } else {
            Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
            Vec3.add(v3_0, v3_0, node.worldPosition);
            Vec3.add(v3_0, v3_0, cs.pivotB);
            Quat.multiply(rot_0, rot_0, node.worldRotation);
          }

          cocos2AmmoVec3(trans1.getOrigin(), v3_0);
          trans1.setRotation(cocos2AmmoQuat(quat, rot_0));
          this.impl.setFrames(trans0, trans1);
        };

        _proto.updateScale0 = function updateScale0() {
          this.updateFrames();
        };

        _proto.updateScale1 = function updateScale1() {
          this.updateFrames();
        };

        _createClass(AmmoHingeConstraint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return AmmoHingeConstraint;
      }(AmmoConstraint));
    }
  };
});