"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXDistanceJoint = void 0;

var _index = require("../../../core/index.js");

var _exportPhysx = require("../export-physx.js");

var _physxJoint = require("./physx-joint.js");

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
class PhysXDistanceJoint extends _physxJoint.PhysXJoint {
  setPivotA(v) {
    const cs = this.constraint;
    const pos = _exportPhysx._trans.translation;
    const rot = _exportPhysx._trans.rotation;

    _index.Vec3.multiply(pos, cs.node.worldScale, cs.pivotA);

    _index.Quat.copy(rot, _index.Quat.IDENTITY);

    this._impl.setLocalPose(0, (0, _exportPhysx.getTempTransform)(pos, rot));

    if (!cs.connectedBody) this.setPivotB(cs.pivotB);
  }

  setPivotB(v) {
    const cs = this.constraint;
    const cb = cs.connectedBody;
    const pos = _exportPhysx._trans.translation;
    const rot = _exportPhysx._trans.rotation;

    _index.Vec3.copy(pos, cs.pivotB);

    _index.Quat.copy(rot, _index.Quat.IDENTITY);

    if (cb) {
      _index.Vec3.multiply(pos, cb.node.worldScale, cs.pivotB);
    } else {
      const node = cs.node;

      _index.Vec3.multiply(pos, node.worldScale, cs.pivotA);

      _index.Vec3.add(pos, pos, node.worldPosition);

      _index.Vec3.add(pos, pos, cs.pivotB);

      _index.Quat.multiply(rot, rot, node.worldRotation);
    }

    this._impl.setLocalPose(1, (0, _exportPhysx.getTempTransform)(pos, rot));
  }

  get constraint() {
    return this._com;
  }

  onComponentSet() {
    this._impl = _exportPhysx.PX.createDistanceJoint(_physxJoint.PhysXJoint.tempActor, _exportPhysx._pxtrans, null, _exportPhysx._pxtrans);
    this.setPivotA(this.constraint.pivotA);
    this.setPivotB(this.constraint.pivotB);
  }

  updateScale0() {
    this.setPivotA(this.constraint.pivotA);
  }

  updateScale1() {
    this.setPivotB(this.constraint.pivotB);
  }

}

exports.PhysXDistanceJoint = PhysXDistanceJoint;