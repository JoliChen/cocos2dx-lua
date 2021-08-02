System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/slider-joint.js", ["@cocos/box2d", "./joint-2d.js", "../../framework/physics-types.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Joint, PHYSICS_2D_PTM_RATIO, toRadian, b2SliderJoint;

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
      _export("b2SliderJoint", b2SliderJoint = /*#__PURE__*/function (_b2Joint) {
        _inheritsLoose(b2SliderJoint, _b2Joint);

        function b2SliderJoint() {
          return _b2Joint.apply(this, arguments) || this;
        }

        var _proto = b2SliderJoint.prototype;

        // limit
        _proto.enableLimit = function enableLimit(v) {
          if (this._b2joint) {
            this._b2joint.EnableLimit(v);
          }
        };

        _proto.setLowerLimit = function setLowerLimit(v) {
          this.updateLimits();
        };

        _proto.setUpperLimit = function setUpperLimit(v) {
          this.updateLimits();
        };

        _proto.updateLimits = function updateLimits() {
          if (this._b2joint) {
            var comp = this._jointComp;

            this._b2joint.SetLimits(comp.lowerLimit / PHYSICS_2D_PTM_RATIO, comp.upperLimit / PHYSICS_2D_PTM_RATIO);
          }
        } // motor
        ;

        _proto.enableMotor = function enableMotor(v) {
          if (this._b2joint) {
            this._b2joint.EnableMotor(v);
          }
        };

        _proto.setMaxMotorForce = function setMaxMotorForce(v) {
          if (this._b2joint) {
            this._b2joint.SetMaxMotorForce(v);
          }
        };

        _proto.setMotorSpeed = function setMotorSpeed(v) {
          if (this._b2joint) {
            this._b2joint.SetMotorSpeed(v);
          }
        };

        _proto._createJointDef = function _createJointDef() {
          var comp = this._jointComp;
          var def = new b2.PrismaticJointDef();
          def.localAnchorA.Set(comp.anchor.x / PHYSICS_2D_PTM_RATIO, comp.anchor.y / PHYSICS_2D_PTM_RATIO);
          def.localAnchorB.Set(comp.connectedAnchor.x / PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / PHYSICS_2D_PTM_RATIO);
          var angle = toRadian(comp.angle);
          def.localAxisA.Set(Math.cos(angle), Math.sin(angle));
          def.referenceAngle = 0;
          def.enableLimit = comp.enableLimit;
          def.lowerTranslation = comp.lowerLimit / PHYSICS_2D_PTM_RATIO;
          def.upperTranslation = comp.upperLimit / PHYSICS_2D_PTM_RATIO;
          def.enableMotor = comp.enableMotor;
          def.maxMotorForce = comp.maxMotorForce;
          def.motorSpeed = comp.motorSpeed;
          return def;
        };

        return b2SliderJoint;
      }(b2Joint));
    }
  };
});