"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinBoxShape = void 0;

var _shape2d = require("./shape-2d.js");

var _index = require("../../../core/index.js");

var _intersection2d = _interopRequireDefault(require("../intersection-2d.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class BuiltinBoxShape extends _shape2d.BuiltinShape2D {
  constructor(...args) {
    super(...args);
    this._worldPoints = [new _index.Vec2(), new _index.Vec2(), new _index.Vec2(), new _index.Vec2()];
  }

  get worldPoints() {
    return this._worldPoints;
  }

  update() {
    const aabb = this._worldAabb;
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
    const minx = Math.min(wp0.x, wp1.x, wp2.x, wp3.x);
    const miny = Math.min(wp0.y, wp1.y, wp2.y, wp3.y);
    const maxx = Math.max(wp0.x, wp1.x, wp2.x, wp3.x);
    const maxy = Math.max(wp0.y, wp1.y, wp2.y, wp3.y);
    aabb.x = minx;
    aabb.y = miny;
    aabb.width = maxx - minx;
    aabb.height = maxy - miny;
  }

  containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    return _intersection2d.default.pointInPolygon(p, this.worldPoints);
  }

  intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return _intersection2d.default.rectPolygon(rect, this.worldPoints);
  }

}

exports.BuiltinBoxShape = BuiltinBoxShape;