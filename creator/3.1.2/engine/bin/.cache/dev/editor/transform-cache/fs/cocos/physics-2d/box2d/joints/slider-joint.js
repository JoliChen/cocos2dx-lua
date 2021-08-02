"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2SliderJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2SliderJoint extends _joint2d.b2Joint {
  // limit
  enableLimit(v) {
    if (this._b2joint) {
      this._b2joint.EnableLimit(v);
    }
  }

  setLowerLimit(v) {
    this.updateLimits();
  }

  setUpperLimit(v) {
    this.updateLimits();
  }

  updateLimits() {
    if (this._b2joint) {
      const comp = this._jointComp;

      this._b2joint.SetLimits(comp.lowerLimit / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.upperLimit / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    }
  } // motor


  enableMotor(v) {
    if (this._b2joint) {
      this._b2joint.EnableMotor(v);
    }
  }

  setMaxMotorForce(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxMotorForce(v);
    }
  }

  setMotorSpeed(v) {
    if (this._b2joint) {
      this._b2joint.SetMotorSpeed(v);
    }
  }

  _createJointDef() {
    const comp = this._jointComp;
    const def = new _box2d.default.PrismaticJointDef();
    def.localAnchorA.Set(comp.anchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.anchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.localAnchorB.Set(comp.connectedAnchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    const angle = (0, _index.toRadian)(comp.angle);
    def.localAxisA.Set(Math.cos(angle), Math.sin(angle));
    def.referenceAngle = 0;
    def.enableLimit = comp.enableLimit;
    def.lowerTranslation = comp.lowerLimit / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    def.upperTranslation = comp.upperLimit / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    def.enableMotor = comp.enableMotor;
    def.maxMotorForce = comp.maxMotorForce;
    def.motorSpeed = comp.motorSpeed;
    return def;
  }

}

exports.b2SliderJoint = b2SliderJoint;