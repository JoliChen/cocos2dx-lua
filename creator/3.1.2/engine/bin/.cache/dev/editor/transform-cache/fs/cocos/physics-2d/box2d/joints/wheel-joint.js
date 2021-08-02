"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2WheelJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2WheelJoint extends _joint2d.b2Joint {
  setDampingRatio(v) {
    if (this._b2joint) {
      this._b2joint.SetSpringDampingRatio(v);
    }
  }

  setFrequency(v) {
    if (this._b2joint) {
      this._b2joint.SetSpringFrequencyHz(v);
    }
  } // motor


  enableMotor(v) {
    if (this._b2joint) {
      this._b2joint.EnableMotor(v);
    }
  }

  setMaxMotorTorque(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxMotorTorque(v);
    }
  }

  setMotorSpeed(v) {
    if (this._b2joint) {
      this._b2joint.SetMotorSpeed(v);
    }
  }

  _createJointDef() {
    const comp = this._jointComp;
    const def = new _box2d.default.WheelJointDef();
    def.localAnchorA.Set(comp.anchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.anchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.localAnchorB.Set(comp.connectedAnchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    const angle = (0, _index.toRadian)(comp.angle);
    def.localAxisA.Set(Math.cos(angle), Math.sin(angle)); // def.localAxisA.Set(0, 1);

    def.maxMotorTorque = comp.maxMotorTorque;
    def.motorSpeed = (0, _index.toRadian)(comp.motorSpeed);
    def.enableMotor = comp.enableMotor;
    def.dampingRatio = comp.dampingRatio;
    def.frequencyHz = comp.frequency;
    return def;
  }

}

exports.b2WheelJoint = b2WheelJoint;