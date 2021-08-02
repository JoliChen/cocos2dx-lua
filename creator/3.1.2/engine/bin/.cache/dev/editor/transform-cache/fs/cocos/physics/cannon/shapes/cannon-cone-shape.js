"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonConeShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../../core/math/index.js");

var _cannonShape = require("./cannon-shape.js");

var _physicsEnum = require("../../framework/physics-enum.js");

var _cannonUtil = require("../cannon-util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @hidden
 */
const v3_0 = new _index.Vec3();
const v3_1 = new _index.Vec3();

class CannonConeShape extends _cannonShape.CannonShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.height, _cannon.default.CC_CONFIG.numSegmentsCone, this.collider.direction, this.collider.node.worldScale);
    if (this._index !== -1) (0, _cannonUtil.commitShapeUpdates)(this._body);
  }

  setHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.height, _cannon.default.CC_CONFIG.numSegmentsCone, this.collider.direction, this.collider.node.worldScale);
    if (this._index !== -1) (0, _cannonUtil.commitShapeUpdates)(this._body);
  }

  setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.height, _cannon.default.CC_CONFIG.numSegmentsCone, this.collider.direction, this.collider.node.worldScale);
    if (this._index !== -1) (0, _cannonUtil.commitShapeUpdates)(this._body);
  }

  constructor(radius = 0.5, height = 1, direction = _physicsEnum.EAxisDirection.Y_AXIS) {
    super();
    this._shape = new _cannon.default.Cylinder(0, radius, height, _cannon.default.CC_CONFIG.numSegmentsCone, direction === _physicsEnum.EAxisDirection.Y_AXIS);
  }

  onLoad() {
    super.onLoad();
    this.setRadius(this.collider.radius);
  }

  setScale(scale) {
    super.setScale(scale);
    this.setRadius(this.collider.radius);
  }

  updateProperties(radius, height, numSegments, direction, scale) {
    let wh = height;
    let wr = radius;
    const cos = Math.cos;
    const sin = Math.sin;
    const abs = Math.abs;
    const max = Math.max;

    if (direction === 1) {
      wh = abs(scale.y) * height;
      wr = max(abs(scale.x), abs(scale.z)) * radius;
    } else if (direction === 2) {
      wh = abs(scale.z) * height;
      wr = max(abs(scale.x), abs(scale.y)) * radius;
    } else {
      wh = abs(scale.x) * height;
      wr = max(abs(scale.y), abs(scale.z)) * radius;
    }

    const N = numSegments;
    const hH = wh / 2;
    const vertices = [];
    const indices = [];
    const axes = [];
    const theta = Math.PI * 2 / N;

    if (direction === 1) {
      const bf = [];
      indices.push(bf);
      vertices.push(new _cannon.default.Vec3(0, hH, 0));

      for (let i = 0; i < N; i++) {
        const x = wr * cos(theta * i);
        const z = wr * sin(theta * i);
        vertices.push(new _cannon.default.Vec3(x, -hH, z));
      }

      for (let i = 0; i < N; i++) {
        if (i !== 0) bf.push(i);
        let face;

        if (i < N - 1) {
          face = [0, i + 2, i + 1];
        } else {
          face = [0, 1, i + 1];
        }

        indices.push(face);

        _index.Vec3.subtract(v3_0, vertices[0], vertices[face[1]]);

        _index.Vec3.subtract(v3_1, vertices[face[2]], vertices[face[1]]);

        _index.Vec3.cross(v3_0, v3_1, v3_0);

        v3_0.normalize();
        axes.push(new _cannon.default.Vec3(v3_0.x, v3_0.y, v3_0.z));
      }

      axes.push(new _cannon.default.Vec3(0, -1, 0));
    } else if (direction === 2) {
      const bf = [];
      indices.push(bf);
      vertices.push(new _cannon.default.Vec3(0, 0, hH));

      for (let i = 0; i < N; i++) {
        const x = wr * cos(theta * i);
        const y = wr * sin(theta * i);
        vertices.push(new _cannon.default.Vec3(x, y, -hH));
      }

      for (let i = 0; i < N; i++) {
        if (i !== 0) bf.push(N - i);
        let face;

        if (i < N - 1) {
          face = [0, i + 1, i + 2];
        } else {
          face = [0, i + 1, 1];
        }

        indices.push(face);

        _index.Vec3.subtract(v3_0, vertices[0], vertices[face[1]]);

        _index.Vec3.subtract(v3_1, vertices[face[2]], vertices[face[1]]);

        _index.Vec3.cross(v3_0, v3_0, v3_1);

        v3_0.normalize();
        axes.push(new _cannon.default.Vec3(v3_0.x, v3_0.y, v3_0.z));
      }

      axes.push(new _cannon.default.Vec3(0, 0, -1));
    } else {
      const bf = [];
      indices.push(bf);
      vertices.push(new _cannon.default.Vec3(hH, 0, 0));

      for (let i = 0; i < N; i++) {
        const y = wr * cos(theta * i);
        const z = wr * sin(theta * i);
        vertices.push(new _cannon.default.Vec3(-hH, y, z));
      }

      for (let i = 0; i < N; i++) {
        if (i !== 0) bf.push(N - i);
        let face;

        if (i < N - 1) {
          face = [0, i + 1, i + 2];
        } else {
          face = [0, i + 1, 1];
        }

        indices.push(face);

        _index.Vec3.subtract(v3_0, vertices[0], vertices[face[1]]);

        _index.Vec3.subtract(v3_1, vertices[face[2]], vertices[face[1]]);

        _index.Vec3.cross(v3_0, v3_0, v3_1);

        v3_0.normalize();
        axes.push(new _cannon.default.Vec3(v3_0.x, v3_0.y, v3_0.z));
      }

      axes.push(new _cannon.default.Vec3(-1, 0, 0));
    }

    this.impl.vertices = vertices;
    this.impl.faces = indices;
    this.impl.uniqueAxes = axes;
    this.impl.worldVerticesNeedsUpdate = true;
    this.impl.worldFaceNormalsNeedsUpdate = true;
    this.impl.computeNormals();
    this.impl.computeEdges();
    this.impl.updateBoundingSphereRadius();
  }

}

exports.CannonConeShape = CannonConeShape;