"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2BoxShape = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _shape2d = require("./shape-2d.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempAabb = new _index.Rect();

class b2BoxShape extends _shape2d.b2Shape2D {
  constructor(...args) {
    super(...args);
    this._worldPoints = [new _index.Vec2(), new _index.Vec2(), new _index.Vec2(), new _index.Vec2()];
  }

  get worldPoints() {
    const aabb = tempAabb;
    const collider = this.collider;
    const size = collider.size;
    const offset = collider.offset;
    aabb.x = offset.x - size.width / 2;
    aabb.y = offset.y - size.height / 2;
    aabb.width = size.width;
    aabb.height = size.height;
    const wps = this._worldPoints;
    const wp0 = wps[0];
    const wp1 = wps[1];
    const wp2 = wps[2];
    const wp3 = wps[3];
    aabb.transformMat4ToPoints(collider.node.worldMatrix, wp0, wp1, wp2, wp3);
    return wps;
  }

  _createShapes(scaleX, scaleY) {
    scaleX = Math.abs(scaleX);
    scaleY = Math.abs(scaleY);
    const comp = this.collider;
    const width = comp.size.width / 2 / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleX;
    const height = comp.size.height / 2 / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleY;
    const offsetX = comp.offset.x / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleX;
    const offsetY = comp.offset.y / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleY;
    const shape = new _box2d.default.PolygonShape();
    shape.SetAsBox(width, height, new _box2d.default.Vec2(offsetX, offsetY), 0);
    return [shape];
  }

}

exports.b2BoxShape = b2BoxShape;