"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinCircleShape = void 0;

var _shape2d = require("./shape-2d.js");

var _index = require("../../../core/index.js");

var _intersection2d = _interopRequireDefault(require("../intersection-2d.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempVec2 = new _index.Vec2();
const tempMat4 = new _index.Mat4();

class BuiltinCircleShape extends _shape2d.BuiltinShape2D {
  constructor(...args) {
    super(...args);
    this._worldPosition = new _index.Vec2();
    this._worldRadius = 0;
  }

  get worldPosition() {
    return this._worldPosition;
  }

  get worldRadius() {
    return this._worldRadius;
  }

  update() {
    const aabb = this._worldAabb;
    const collider = this.collider;
    const worldMatrix = collider.node.getWorldMatrix(tempMat4); // calculate world position

    _index.Vec2.transformMat4(tempVec2, collider.offset, worldMatrix);

    const worldPos = this._worldPosition;
    worldPos.x = tempVec2.x;
    worldPos.y = tempVec2.y; // calculate world radius

    worldMatrix.m12 = worldMatrix.m13 = 0;
    tempVec2.x = collider.radius;
    tempVec2.y = 0;

    _index.Vec2.transformMat4(tempVec2, tempVec2, worldMatrix);

    const d = this._worldRadius = tempVec2.length();
    aabb.x = worldPos.x - d;
    aabb.y = worldPos.y - d;
    aabb.width = d * 2;
    aabb.height = d * 2;
  }

  containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    const dist = _index.Vec2.subtract(tempVec2, p, this.worldPosition).length();

    return dist < this.worldRadius;
  }

  intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return _intersection2d.default.rectCircle(rect, this.worldPosition, this.worldRadius);
  }

}

exports.BuiltinCircleShape = BuiltinCircleShape;