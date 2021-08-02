System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/relative-joint.js", ["@cocos/box2d", "./joint-2d.js", "../../framework/physics-types.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Joint, PHYSICS_2D_PTM_RATIO, toRadian, b2RelativeJoint;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_joint2dJs) {
      b2Joint = _joint2dJs.b2Joint;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      toRadian = _coreIndexJs.toRadian;
    }],
    execute: function () {
      _export("b2RelativeJoint", b2RelativeJoint = /*#__PURE__*/function (_b2Joint) {
        _inheritsLoose(b2RelativeJoint, _b2Joint);

        function b2RelativeJoint() {
          return _b2Joint.apply(this, arguments) || this;
        }

        var _proto = b2RelativeJoint.prototype;

        _proto.setMaxForce = function setMaxForce(v) {
          if (this._b2joint) {
            this._b2joint.SetMaxForce(v);
          }
        };

        _proto.setAngularOffset = function setAngularOffset(v) {
          if (this._b2joint) {
            this._b2joint.SetAngularOffset(toRadian(v));
          }
        };

        _proto.setLinearOffset = function setLinearOffset(v) {
          if (this._b2joint) {
            this._b2joint.SetLinearOffset(new b2.Vec2(v.x / PHYSICS_2D_PTM_RATIO, v.y / PHYSICS_2D_PTM_RATIO));
          }
        };

        _proto.setCorrectionFactor = function setCorrectionFactor(v) {
          if (this._b2joint) {
            this._b2joint.m_correctionFactor = v;
          }
        };

        _proto.setMaxTorque = function setMaxTorque(v) {
          if (this._b2joint) {
            this._b2joint.SetMaxTorque(v);
          }
        };

        _proto._createJointDef = function _createJointDef() {
          var comp = this._jointComp;
          var def = new b2.MotorJointDef();
          def.linearOffset.Set(comp.linearOffset.x / PHYSICS_2D_PTM_RATIO, comp.linearOffset.y / PHYSICS_2D_PTM_RATIO);
          def.angularOffset = toRadian(comp.angularOffset);
          def.maxForce = comp.maxForce;
          def.maxTorque = comp.maxTorque;
          def.correctionFactor = comp.correctionFactor;
          return def;
        };

        return b2RelativeJoint;
      }(b2Joint));
    }
  };
});