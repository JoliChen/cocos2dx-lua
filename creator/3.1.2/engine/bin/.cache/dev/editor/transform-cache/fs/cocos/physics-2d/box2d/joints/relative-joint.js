"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2RelativeJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2RelativeJoint extends _joint2d.b2Joint {
  setMaxForce(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxForce(v);
    }
  }

  setAngularOffset(v) {
    if (this._b2joint) {
      this._b2joint.SetAngularOffset((0, _index.toRadian)(v));
    }
  }

  setLinearOffset(v) {
    if (this._b2joint) {
      this._b2joint.SetLinearOffset(new _box2d.default.Vec2(v.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, v.y / _physicsTypes.PHYSICS_2D_PTM_RATIO));
    }
  }

  setCorrectionFactor(v) {
    if (this._b2joint) {
      this._b2joint.m_correctionFactor = v;
    }
  }

  setMaxTorque(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxTorque(v);
    }
  }

  _createJointDef() {
    const comp = this._jointComp;
    const def = new _box2d.default.MotorJointDef();
    def.linearOffset.Set(comp.linearOffset.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.linearOffset.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.angularOffset = (0, _index.toRadian)(comp.angularOffset);
    def.maxForce = comp.maxForce;
    def.maxTorque = comp.maxTorque;
    def.correctionFactor = comp.correctionFactor;
    return def;
  }

}

exports.b2RelativeJoint = b2RelativeJoint;