"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXSphereShape = void 0;

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
class PhysXSphereShape extends _physxShape.PhysXShape {
  constructor() {
    super(_physxShape.EPhysXShapeType.SPHERE);

    if (!PhysXSphereShape.SPHERE_GEOMETRY) {
      PhysXSphereShape.SPHERE_GEOMETRY = new _exportPhysx.PX.SphereGeometry(0.5);
    }
  }

  setRadius(v) {
    this.updateScale();
  }

  get collider() {
    return this._collider;
  }

  onComponentSet() {
    this.updateGeometry();
    const physics = this._sharedBody.wrappedWorld.physics;
    const pxmat = this.getSharedMaterial(this.collider.sharedMaterial);
    this._impl = physics.createShape(PhysXSphereShape.SPHERE_GEOMETRY, pxmat, true, this._flags);
  }

  updateScale() {
    this.updateGeometry();

    this._impl.setGeometry(PhysXSphereShape.SPHERE_GEOMETRY);

    this.setCenter(this._collider.center);
  }

  updateGeometry() {
    const co = this.collider;
    const ws = co.node.worldScale;
    const absX = Math.abs(ws.x);
    const absY = Math.abs(ws.y);
    const absZ = Math.abs(ws.z);
    const maxSp = Math.max(Math.max(absX, absY), absZ);
    PhysXSphereShape.SPHERE_GEOMETRY.setRadius(Math.max(0.0001, co.radius * maxSp));
  }

}

exports.PhysXSphereShape = PhysXSphereShape;
PhysXSphereShape.SPHERE_GEOMETRY = void 0;