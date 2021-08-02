"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXContactEquation = void 0;

var _index = require("../../core/index.js");

var _exportPhysx = require("./export-physx.js");

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
const quat = new _index.Quat();

class PhysXContactEquation {
  get isBodyA() {
    return this.colliderA.uuid === this.event.selfCollider.uuid;
  }

  constructor(event) {
    this.impl = null;
    this.event = void 0;
    this.event = event;
  }

  getLocalPointOnA(out) {
    (0, _exportPhysx.getContactPosition)(this.impl, out, this.event.impl);

    _index.Vec3.subtract(out, out, this.colliderA.node.worldPosition);
  }

  getLocalPointOnB(out) {
    (0, _exportPhysx.getContactPosition)(this.impl, out, this.event.impl);

    _index.Vec3.subtract(out, out, this.colliderB.node.worldPosition);
  }

  getWorldPointOnA(out) {
    (0, _exportPhysx.getContactPosition)(this.impl, out, this.event.impl);
  }

  getWorldPointOnB(out) {
    (0, _exportPhysx.getContactPosition)(this.impl, out, this.event.impl);
  }

  getLocalNormalOnA(out) {
    this.getWorldNormalOnA(out);

    _index.Quat.conjugate(quat, this.colliderA.node.worldRotation);

    _index.Vec3.transformQuat(out, out, quat);
  }

  getLocalNormalOnB(out) {
    this.getWorldNormalOnB(out);

    _index.Quat.conjugate(quat, this.colliderB.node.worldRotation);

    _index.Vec3.transformQuat(out, out, quat);
  }

  getWorldNormalOnA(out) {
    (0, _exportPhysx.getContactNormal)(this.impl, out, this.event.impl);
    if (!this.isBodyA) _index.Vec3.negate(out, out);
  }

  getWorldNormalOnB(out) {
    (0, _exportPhysx.getContactNormal)(this.impl, out, this.event.impl);
  }

}

exports.PhysXContactEquation = PhysXContactEquation;