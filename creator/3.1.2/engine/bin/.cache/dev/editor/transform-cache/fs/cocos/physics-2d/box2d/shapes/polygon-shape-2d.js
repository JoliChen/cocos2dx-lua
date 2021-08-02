"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2PolygonShape = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _shape2d = require("./shape-2d.js");

var PolygonSeparator = _interopRequireWildcard(require("../../framework/utils/polygon-separator.js"));

var _physicsTypes = require("../../framework/physics-types.js");

var _index = require("../../../core/index.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
class b2PolygonShape extends _shape2d.b2Shape2D {
  constructor(...args) {
    super(...args);
    this._worldPoints = [];
  }

  get worldPoints() {
    const comp = this.collider;
    const points = comp.points;
    const worldPoints = this._worldPoints;
    const m = comp.node.worldMatrix;

    for (let i = 0; i < points.length; i++) {
      if (!worldPoints[i]) {
        worldPoints[i] = new _index.Vec2();
      }

      _index.Vec2.transformMat4(worldPoints[i], points[i], m);
    }

    worldPoints.length = points.length;
    return this._worldPoints;
  }

  _createShapes(scaleX, scaleY) {
    const shapes = [];
    const comp = this.collider;
    const points = comp.points; // check if last point equal to first point

    if (points.length > 0 && points[0].equals(points[points.length - 1])) {
      points.length -= 1;
    }

    const polys = PolygonSeparator.ConvexPartition(points);
    const offset = comp.offset;

    for (let i = 0; i < polys.length; i++) {
      const poly = polys[i];
      let shape = null;
      let vertices = [];
      let firstVertice = null;

      for (let j = 0, l = poly.length; j < l; j++) {
        if (!shape) {
          shape = new _box2d.default.PolygonShape();
        }

        const p = poly[j];
        const x = (p.x + offset.x) / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleX;
        const y = (p.y + offset.y) / _physicsTypes.PHYSICS_2D_PTM_RATIO * scaleY;
        const v = new _box2d.default.Vec2(x, y);
        vertices.push(v);

        if (!firstVertice) {
          firstVertice = v;
        }

        if (vertices.length === _box2d.default.maxPolygonVertices) {
          shape.Set(vertices, vertices.length);
          shapes.push(shape);
          shape = null;

          if (j < l - 1) {
            vertices = [firstVertice, vertices[vertices.length - 1]];
          }
        }
      }

      if (shape) {
        shape.Set(vertices, vertices.length);
        shapes.push(shape);
      }
    }

    return shapes;
  }

}

exports.b2PolygonShape = b2PolygonShape;