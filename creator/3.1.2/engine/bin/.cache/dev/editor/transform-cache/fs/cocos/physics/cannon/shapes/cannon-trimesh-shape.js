"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonTrimeshShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _cannonShape = require("./cannon-shape.js");

var _index = require("../../../core/index.js");

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
const v3_cannon0 = new _cannon.default.Vec3();

class CannonTrimeshShape extends _cannonShape.CannonShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  setMesh(v) {
    if (!this._isBinding) return;
    const mesh = v;

    if (this._shape != null) {
      if (mesh && mesh.renderingSubMeshes.length > 0) {
        const vertices = mesh.renderingSubMeshes[0].geometricInfo.positions;
        const indices = mesh.renderingSubMeshes[0].geometricInfo.indices;
        this.updateProperties(vertices, indices);
      } else {
        this.updateProperties(new Float32Array(), new Uint16Array());
      }
    } else if (mesh && mesh.renderingSubMeshes.length > 0) {
      const vertices = mesh.renderingSubMeshes[0].geometricInfo.positions;
      const indices = mesh.renderingSubMeshes[0].geometricInfo.indices;
      this._shape = new _cannon.default.Trimesh(vertices, indices);
    } else {
      this._shape = new _cannon.default.Trimesh(new Float32Array(), new Uint16Array());
    }
  }

  onComponentSet() {
    this.setMesh(this.collider.mesh);
  }

  onLoad() {
    super.onLoad();
    this.setMesh(this.collider.mesh);
  }

  setScale(scale) {
    super.setScale(scale);

    _index.Vec3.copy(v3_cannon0, scale);

    this.impl.setScale(v3_cannon0);
  }

  updateProperties(vertices, indices) {
    this.impl.vertices = new Float32Array(vertices);
    this.impl.indices = new Int16Array(indices);
    this.impl.normals = new Float32Array(indices.length);
    this.impl.aabb = new _cannon.default.AABB();
    this.impl.edges = [];
    this.impl.tree = new _cannon.default.Octree(new _cannon.default.AABB());
    this.impl.updateEdges();
    this.impl.updateNormals();
    this.impl.updateAABB();
    this.impl.updateBoundingSphereRadius();
    this.impl.updateTree();
    this.impl.setScale(this.impl.scale);

    if (this._index >= 0) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  }

}

exports.CannonTrimeshShape = CannonTrimeshShape;