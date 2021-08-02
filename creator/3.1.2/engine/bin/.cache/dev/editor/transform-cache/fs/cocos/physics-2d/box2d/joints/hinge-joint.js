"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2HingeJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2HingeJoint extends _joint2d.b2Joint {
  enableLimit(v) {
    if (this._b2joint) {
      this._b2joint.EnableLimit(v);
    }
  }

  setLowerAngle(v) {
    this.updateLimits();
  }

  setUpperAngle(v) {
    this.updateLimits();
  }

  updateLimits() {
    if (this._b2joint) {
      const comp = this._jointComp;

      this._b2joint.SetLimits((0, _index.toRadian)(comp.lowerAngle), (0, _index.toRadian)(comp.upperAngle));
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
    const def = new _box2d.default.RevoluteJointDef();
    def.localAnchorA.Set(comp.anchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.anchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.localAnchorB.Set(comp.connectedAnchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.enableMotor = comp.enableMotor;
    def.maxMotorTorque = comp.maxMotorTorque;
    def.motorSpeed = (0, _index.toRadian)(comp.motorSpeed);
    def.enableLimit = comp.enableLimit;
    def.lowerAngle = comp.lowerAngle;
    def.upperAngle = comp.upperAngle;
    return def;
  }

}

exports.b2HingeJoint = b2HingeJoint;