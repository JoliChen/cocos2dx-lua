System.register("q-bundled:///fs/cocos/physics/ammo/constraints/ammo-point-to-point-constraint.js", ["../ammo-instantiated.js", "./ammo-constraint.js", "../../../core/index.js", "../ammo-util.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, AmmoConstraint, Vec3, cocos2AmmoVec3, AmmoConstant, CC_V3_0, AmmoPointToPointConstraint;

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
      Vec3 = _coreIndexJs.Vec3;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
    }],
    execute: function () {
      _export("AmmoPointToPointConstraint", AmmoPointToPointConstraint = /*#__PURE__*/function (_AmmoConstraint) {
        _inheritsLoose(AmmoPointToPointConstraint, _AmmoConstraint);

        function AmmoPointToPointConstraint() {
          return _AmmoConstraint.apply(this, arguments) || this;
        }

        var _proto = AmmoPointToPointConstraint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          var pivotA = AmmoConstant.instance.VECTOR3_0;
          var cs = this.constraint;
          Vec3.multiply(CC_V3_0, cs.node.worldScale, cs.pivotA);
          cocos2AmmoVec3(pivotA, CC_V3_0);
          this.impl.setPivotA(pivotA);
          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        };

        _proto.setPivotB = function setPivotB(v) {
          var cs = this.constraint;
          var node = this._rigidBody.node;
          var pivotB = AmmoConstant.instance.VECTOR3_0;
          var cb = cs.connectedBody;

          if (cb) {
            Vec3.multiply(CC_V3_0, cb.node.worldScale, cs.pivotB);
            cocos2AmmoVec3(pivotB, CC_V3_0);
          } else {
            Vec3.multiply(CC_V3_0, node.worldScale, cs.pivotA);
            Vec3.add(CC_V3_0, CC_V3_0, node.worldPosition);
            Vec3.add(CC_V3_0, CC_V3_0, cs.pivotB);
            cocos2AmmoVec3(pivotB, CC_V3_0);
          }

          this.impl.setPivotB(pivotB);
        };

        _proto.onComponentSet = function onComponentSet() {
          var bodyA = this._rigidBody.body.impl;
          var cb = this.constraint.connectedBody;
          var bodyB;

          if (cb) {
            bodyB = cb.body.impl;
          }

          var pivotA = AmmoConstant.instance.VECTOR3_0;

          if (bodyB) {
            var pivotB = AmmoConstant.instance.VECTOR3_1;
            this._impl = new Ammo.btPoint2PointConstraint(bodyA, bodyB, pivotA, pivotB);
          } else {
            this._impl = new Ammo.btPoint2PointConstraint(bodyA, pivotA);
          }

          this.setPivotA(this.constraint.pivotA);
          this.setPivotB(this.constraint.pivotB);
        };

        _proto.updateScale0 = function updateScale0() {
          this.setPivotA(this.constraint.pivotA);
        };

        _proto.updateScale1 = function updateScale1() {
          this.setPivotB(this.constraint.pivotB);
        };

        _createClass(AmmoPointToPointConstraint, [{
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

        return AmmoPointToPointConstraint;
      }(AmmoConstraint));
    }
  };
});