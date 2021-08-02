"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXTrimeshShape = void 0;

var _index = require("../../../core/index.js");

var _exportPhysx = require("../export-physx.js");

var _physxShape = require("./physx-shape.js");

var _index2 = require("../../../core/gfx/index.js");

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
class PhysXTrimeshShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.MESH);
    this.geometry = void 0;
  }

  setMesh(v) {
    if (v && v.renderingSubMeshes.length > 0 && this._impl == null) {
      const wrappedWorld = this._sharedBody.wrappedWorld;
      const physics = wrappedWorld.physics;
      const collider = this.collider;
      const pxmat = this.getSharedMaterial(collider.sharedMaterial);
      const meshScale = _physxShape.PhysXShape.MESH_SCALE;
      meshScale.setScale(_index.Vec3.ONE);
      meshScale.setRotation(_index.Quat.IDENTITY);

      if (collider.convex) {
        if (_exportPhysx.PX.MESH_CONVEX[v._uuid] == null) {
          const cooking = wrappedWorld.cooking;
          const posBuf = v.readAttribute(0, _index2.AttributeName.ATTR_POSITION);
          _exportPhysx.PX.MESH_CONVEX[v._uuid] = (0, _exportPhysx.createConvexMesh)(posBuf, cooking, physics);
        }

        const convexMesh = _exportPhysx.PX.MESH_CONVEX[v._uuid];
        this.geometry = new _exportPhysx.PX.ConvexMeshGeometry(convexMesh, meshScale, (0, _exportPhysx.createMeshGeometryFlags)(0, true));
      } else {
        if (_exportPhysx.PX.MESH_STATIC[v._uuid] == null) {
          const cooking = wrappedWorld.cooking;
          const posBuf = v.readAttribute(0, _index2.AttributeName.ATTR_POSITION);
          const indBuf = v.readIndices(0); // Uint16Array ?

          _exportPhysx.PX.MESH_STATIC[v._uuid] = (0, _exportPhysx.createTriangleMesh)(posBuf, indBuf, cooking, physics);
        }

        const trimesh = _exportPhysx.PX.MESH_STATIC[v._uuid];
        this.geometry = new _exportPhysx.PX.TriangleMeshGeometry(trimesh, meshScale, (0, _exportPhysx.createMeshGeometryFlags)(0, false));
      }

      this.updateGeometry();
      this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
    }
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this.setMesh(this.collider.mesh);
  }

  updateScale() {
    this.updateGeometry();
    this.setCenter(this._collider.center);
  }

  updateGeometry() {
    const meshScale = _physxShape.PhysXShape.MESH_SCALE;
    meshScale.setScale(this.collider.node.worldScale);
    meshScale.setRotation(_index.Quat.IDENTITY);
    this.geometry.setScale(meshScale);
  }

}

exports.PhysXTrimeshShape = PhysXTrimeshShape;