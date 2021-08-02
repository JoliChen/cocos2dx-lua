System.register("q-bundled:///fs/cocos/physics/cannon/constraints/cannon-hinge-constraint.js", ["@cocos/cannon", "./cannon-constraint.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var CANNON, CannonConstraint, Vec3, v3_0, CannonHingeConstraint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_cannonConstraintJs) {
      CannonConstraint = _cannonConstraintJs.CannonConstraint;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }],
    execute: function () {
      v3_0 = new Vec3();

      _export("CannonHingeConstraint", CannonHingeConstraint = /*#__PURE__*/function (_CannonConstraint) {
        _inheritsLoose(CannonHingeConstraint, _CannonConstraint);

        function CannonHingeConstraint() {
          return _CannonConstraint.apply(this, arguments) || this;
        }

        var _proto = CannonHingeConstraint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          var cs = this.constraint;
          Vec3.multiply(this.impl.pivotA, this.constraint.node.worldScale, cs.pivotA);
          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        };

        _proto.setPivotB = function setPivotB(v) {
          var cs = this.constraint;
          var cb = cs.connectedBody;

          if (cb) {
            Vec3.multiply(this.impl.pivotB, cb.node.worldScale, cs.pivotB);
          } else {
            var node = this.constraint.node;
            Vec3.multiply(v3_0, node.worldScale, cs.pivotA);
            Vec3.add(v3_0, v3_0, node.worldPosition);
            Vec3.add(v3_0, v3_0, cs.pivotB);
            Vec3.copy(this.impl.pivotB, v3_0);
          }
        };

        _proto.setAxis = function setAxis(v) {
          Vec3.copy(this.impl.axisA, v);
          Vec3.copy(this.impl.equations[3].axisA, v);
          Vec3.copy(this.impl.equations[4].axisA, v);
          Vec3.copy(this.impl.equations[5].axisA, v);

          if (this.constraint.connectedBody) {
            Vec3.copy(this.impl.axisB, v);
            Vec3.copy(this.impl.equations[3].axisB, v);
            Vec3.copy(this.impl.equations[4].axisB, v);
            Vec3.copy(this.impl.equations[5].axisB, v);
          } else {
            Vec3.transformQuat(this.impl.axisB, v, this.constraint.node.worldRotation);
            Vec3.copy(this.impl.equations[3].axisB, this.impl.axisB);
            Vec3.copy(this.impl.equations[4].axisB, this.impl.axisB);
            Vec3.copy(this.impl.equations[5].axisB, this.impl.axisB);
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          var bodyA = this._rigidBody.body.impl;
          var cb = this.constraint.connectedBody;
          var bodyB = CANNON.World.staticBody;

          if (cb) {
            bodyB = cb.body.impl;
          }

          this._impl = new CANNON.HingeConstraint(bodyA, bodyB);
          this.setPivotA(this.constraint.pivotA);
          this.setPivotB(this.constraint.pivotB);
          this.setAxis(this.constraint.axis);
        };

        _proto.updateScale0 = function updateScale0() {
          this.setPivotA(this.constraint.pivotA);
        };

        _proto.updateScale1 = function updateScale1() {
          this.setPivotB(this.constraint.pivotB);
        };

        _createClass(CannonHingeConstraint, [{
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

        return CannonHingeConstraint;
      }(CannonConstraint));
    }
  };
});