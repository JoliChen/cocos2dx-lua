"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXCylinderShape = void 0;

var _index = require("../../../core/index.js");

var _cylinder = _interopRequireDefault(require("../../../primitive/cylinder.js"));

var _index2 = require("../../framework/index.js");

var _exportPhysx = require("../export-physx.js");

var _physxShape = require("./physx-shape.js");

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
class PhysXCylinderShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.CYLINDER);
    this.geometry = void 0;
  }

  setRadius(v) {
    this.updateGeometry();
  }

  setHeight(v) {
    this.updateGeometry();
  }

  setDirection(v) {
    this.updateGeometry();
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    const collider = this.collider;
    const physics = this._sharedBody.wrappedWorld.physics;

    if (!PhysXCylinderShape.CONVEX_MESH) {
      const cooking = this._sharedBody.wrappedWorld.cooking;
      const primitive = (0, _cylinder.default)(0.5, 0.5, 2, {
        radialSegments: 32,
        heightSegments: 1
      });
      PhysXCylinderShape.CONVEX_MESH = (0, _exportPhysx.createConvexMesh)(primitive.positions, cooking, physics);
    }

    const meshScale = _physxShape.PhysXShape.MESH_SCALE;
    meshScale.setScale(_index.Vec3.ONE);
    meshScale.setRotation(_index.Quat.IDENTITY);
    const convexMesh = PhysXCylinderShape.CONVEX_MESH;
    const pxmat = this.getSharedMaterial(collider.sharedMaterial);
    this.geometry = new _exportPhysx.PX.ConvexMeshGeometry(convexMesh, meshScale, (0, _exportPhysx.createMeshGeometryFlags)(0, true));
    this.updateGeometry();
    this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
  }

  updateScale() {
    this.updateGeometry();
    this.setCenter(this._collider.center);
  }

  updateGeometry() {
    const collider = this.collider;
    const r = collider.radius;
    const h = collider.height;
    const a = collider.direction;
    const scale = _exportPhysx._trans.translation;

    _index.Vec3.copy(scale, collider.node.worldScale);

    scale.y *= Math.max(0.0001, h / 2);
    const xz = Math.max(0.0001, r / 0.5);
    scale.x *= xz;
    scale.z *= xz;
    const quat = _exportPhysx._trans.rotation;

    switch (a) {
      case _index2.EAxisDirection.X_AXIS:
        _index.Quat.fromEuler(quat, 0, 0, 90);

        break;

      case _index2.EAxisDirection.Y_AXIS:
      default:
        _index.Quat.copy(quat, _index.Quat.IDENTITY);

        break;

      case _index2.EAxisDirection.Z_AXIS:
        _index.Quat.fromEuler(quat, 90, 0, 0);

        break;
    }

    const meshScale = _physxShape.PhysXShape.MESH_SCALE;
    meshScale.setScale(scale);
    meshScale.setRotation(quat);
    this.geometry.setScale(meshScale);

    _index.Quat.copy(this._rotation, quat);
  }

}

exports.PhysXCylinderShape = PhysXCylinderShape;
PhysXCylinderShape.CONVEX_MESH = void 0;