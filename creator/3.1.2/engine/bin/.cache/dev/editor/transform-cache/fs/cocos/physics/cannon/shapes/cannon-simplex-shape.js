"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonSimplexShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../../core/math/index.js");

var _cannonUtil = require("../cannon-util.js");

var _cannonShape = require("./cannon-shape.js");

var _physicsFramework = require("../../../../exports/physics-framework.js");

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

/* eslint-disable func-names */
class CannonSimplexShape extends _cannonShape.CannonShape {
  constructor(...args) {
    super(...args);
    this.vertices = [];
  }

  setShapeType(v) {
    if (this._isBinding) {// TODO: change the type after init
    }
  }

  setVertices(v) {
    const length = this.vertices.length;

    if (length === 4) {
      const ws = this._collider.node.worldScale;

      for (let i = 0; i < length; i++) {
        _index.Vec3.multiply(this.vertices[i], ws, v[i]);
      }

      const impl = this.impl;
      impl.computeNormals();
      impl.computeEdges();
      impl.updateBoundingSphereRadius();
    } else {// TODO: add to center
      // const impl = this.impl as CANNON.Particle;
    }

    if (this._index !== -1) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  }

  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  onComponentSet() {
    const type = this.collider.shapeType;

    if (type === _physicsFramework.SimplexCollider.ESimplexType.TETRAHEDRON) {
      for (let i = 0; i < 4; i++) {
        this.vertices[i] = new _cannon.default.Vec3(0, 0, 0);
      }

      this._shape = createTetra(this.vertices);
    } else {
      if (type !== _physicsFramework.SimplexCollider.ESimplexType.VERTEX) {// WARN
      }

      this._shape = new _cannon.default.Particle();
    }
  }

  onLoad() {
    super.onLoad();
    this.collider.updateVertices();
  }

  setScale(scale) {
    super.setScale(scale);
    this.collider.updateVertices();
  }

}

exports.CannonSimplexShape = CannonSimplexShape;

const createTetra = function () {
  const faces = [[0, 3, 2], // -x
  [0, 1, 3], // -y
  [0, 2, 1], // -z
  [1, 2, 3] // +xyz
  ];
  return function (verts) {
    return new _cannon.default.ConvexPolyhedron(verts, faces);
  };
}();