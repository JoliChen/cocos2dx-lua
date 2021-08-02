"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2FixedJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2FixedJoint extends _joint2d.b2Joint {
  setFrequency(v) {
    if (this._b2joint) {
      this._b2joint.SetFrequency(v);
    }
  }

  setDampingRatio(v) {
    if (this._b2joint) {
      this._b2joint.SetDampingRatio(v);
    }
  }

  _createJointDef() {
    const comp = this._jointComp;
    const def = new _box2d.default.WeldJointDef();
    def.localAnchorA.Set(comp.anchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.anchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.localAnchorB.Set(comp.connectedAnchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.referenceAngle = 0;
    def.frequencyHz = comp.frequency;
    def.dampingRatio = comp.dampingRatio;
    return def;
  }

}

exports.b2FixedJoint = b2FixedJoint;