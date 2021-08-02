"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXPlaneShape = void 0;

var _index = require("../../../core/index.js");

var _exportPhysx = require("../export-physx.js");

var _physxShape = require("./physx-shape.js");

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
class PhysXPlaneShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.PLANE);

    if (!PhysXPlaneShape.PLANE_GEOMETRY) {
      PhysXPlaneShape.PLANE_GEOMETRY = new _exportPhysx.PX.PlaneGeometry();
    }
  }

  setNormal(v) {
    this.setCenter();
  }

  setConstant(v) {
    this.setCenter();
  }

  setCenter() {
    const co = this.collider;
    const pos = _exportPhysx._trans.translation;
    const rot = _exportPhysx._trans.rotation;

    _index.Vec3.scaleAndAdd(pos, co.center, co.normal, co.constant);

    _index.Quat.rotationTo(rot, _index.Vec3.UNIT_X, co.normal);

    const trans = (0, _exportPhysx.getTempTransform)(pos, rot);

    this._impl.setLocalPose(trans);
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    const co = this.collider;
    const physics = this._sharedBody.wrappedWorld.physics;
    const pxmat = this.getSharedMaterial(co.sharedMaterial);
    this._impl = physics.createShape(PhysXPlaneShape.PLANE_GEOMETRY, pxmat, true, this._flags);
    this.setCenter();
  }

  updateScale() {
    this.setCenter();
  }

}

exports.PhysXPlaneShape = PhysXPlaneShape;
PhysXPlaneShape.PLANE_GEOMETRY = void 0;