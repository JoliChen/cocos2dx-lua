"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2DistanceJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2DistanceJoint extends _joint2d.b2Joint {
  setMaxLength(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxLength(v);
    }
  }

  _createJointDef() {
    const comp = this._jointComp;
    const def = new _box2d.default.RopeJointDef();
    def.localAnchorA.Set(comp.anchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.anchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.localAnchorB.Set(comp.connectedAnchor.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.maxLength = comp.maxLength / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return def;
  }

}

exports.b2DistanceJoint = b2DistanceJoint;