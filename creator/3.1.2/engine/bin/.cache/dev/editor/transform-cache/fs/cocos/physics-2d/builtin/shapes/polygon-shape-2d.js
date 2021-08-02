"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinPolygonShape = void 0;

var _shape2d = require("./shape-2d.js");

var _index = require("../../../core/index.js");

var _intersection2d = _interopRequireDefault(require("../intersection-2d.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempVec2 = new _index.Vec2();

class BuiltinPolygonShape extends _shape2d.BuiltinShape2D {
  constructor(...args) {
    super(...args);
    this._worldPoints = [];
  }

  get worldPoints() {
    return this._worldPoints;
  }

  update() {
    const aabb = this._worldAabb;
    const collider = this.collider;
    const points = collider.points;
    const offset = collider.offset;
    const worldMatrix = collider.node.worldMatrix;
    const worldPoints = this._worldPoints;
    worldPoints.length = points.length;
    let minx = 1e6;
    let miny = 1e6;
    let maxx = -1e6;
    let maxy = -1e6;

    for (let i = 0, l = points.length; i < l; i++) {
      if (!worldPoints[i]) {
        worldPoints[i] = new _index.Vec2();
      }

      tempVec2.x = points[i].x + offset.x;
      tempVec2.y = points[i].y + offset.y;

      _index.Vec2.transformMat4(tempVec2, tempVec2, worldMatrix);

      const x = tempVec2.x;
      const y = tempVec2.y;
      worldPoints[i].x = x;
      worldPoints[i].y = y;
      if (x > maxx) maxx = x;
      if (x < minx) minx = x;
      if (y > maxy) maxy = y;
      if (y < miny) miny = y;
    }

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

exports.BuiltinPolygonShape = BuiltinPolygonShape;