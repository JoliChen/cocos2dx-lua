"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2CircleShape = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _shape2d = require("./shape-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2CircleShape extends _shape2d.b2Shape2D {
  constructor(...args) {
    super(...args);
    this._worldPosition = new _index.Vec2();
  }

  get worldRadius() {
    return this._shapes[0].m_radius * _physicsTypes.PHYSICS_2D_PTM_RATIO;
  }

  get worldPosition() {
    const p = this._shapes[0].m_p;
    return this._worldPosition.set(p.x * _physicsTypes.PHYSICS_2D_PTM_RATIO, p.y * _physicsTypes.PHYSICS_2D_PTM_RATIO);
  }

  _createShapes(scaleX, scaleY) {
    scaleX = Math.abs(scaleX);
    scaleY = Math.abs(scaleY);
    const comp = this.collider;
    const offsetX = comp.offset.x / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleX;
    const offsetY = comp.offset.y / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleY;
    const shape = new _box2d.default.CircleShape();
    shape.m_radius = comp.radius / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleX;
    shape.m_p.Set(offsetX, offsetY);
    return [shape];
  }

}

exports.b2CircleShape = b2CircleShape;