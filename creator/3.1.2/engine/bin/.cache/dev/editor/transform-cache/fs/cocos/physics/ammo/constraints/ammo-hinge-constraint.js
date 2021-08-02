"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoHingeConstraint = void 0;

var _ammoInstantiated = _interopRequireDefault(require("../ammo-instantiated.js"));

var _ammoConstraint = require("./ammo-constraint.js");

var _index = require("../../../core/index.js");

var _ammoUtil = require("../ammo-util.js");

var _ammoConst = require("../ammo-const.js");

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

/* eslint-disable new-cap */
class AmmoHingeConstraint extends _ammoConstraint.AmmoConstraint {
  setPivotA(v) {
    this.updateFrames();
  }

  setPivotB(v) {
    this.updateFrames();
  }

  setAxis(v) {
    this.updateFrames();
  }

  get impl() {
    return this._impl;
  }

  get constraint() {
    return this._com;
  }

  onComponentSet() {
    const sb0 = this._rigidBody.body.sharedBody;
    const cb = this.constraint.connectedBody;
    const bodyB = cb ? cb.body.impl : sb0.wrappedWorld.impl.getFixedBody();
    const trans0 = _ammoConst.AmmoConstant.instance.TRANSFORM;
    const trans1 = _ammoConst.AmmoConstant.instance.TRANSFORM_1;
    this._impl = new _ammoInstantiated.default.btHingeConstraint(sb0.body, bodyB, trans0, trans1);
    this.updateFrames();
  }

  updateFrames() {
    const cs = this.constraint;
    const node = cs.node;
    const v3_0 = _ammoConst.CC_V3_0;
    const rot_0 = _ammoConst.CC_QUAT_0;
    const trans0 = _ammoConst.AmmoConstant.instance.TRANSFORM;

    _index.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);

    (0, _ammoUtil.cocos2AmmoVec3)(trans0.getOrigin(), v3_0);
    const quat = _ammoConst.AmmoConstant.instance.QUAT_0;

    _index.Quat.rotationTo(rot_0, _index.Vec3.UNIT_Z, cs.axis);

    trans0.setRotation((0, _ammoUtil.cocos2AmmoQuat)(quat, rot_0));
    const trans1 = _ammoConst.AmmoConstant.instance.TRANSFORM_1;
    const cb = this.constraint.connectedBody;

    if (cb) {
      _index.Vec3.multiply(v3_0, cb.node.worldScale, cs.pivotB);
    } else {
      _index.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);

      _index.Vec3.add(v3_0, v3_0, node.worldPosition);

      _index.Vec3.add(v3_0, v3_0, cs.pivotB);

      _index.Quat.multiply(rot_0, rot_0, node.worldRotation);
    }

    (0, _ammoUtil.cocos2AmmoVec3)(trans1.getOrigin(), v3_0);
    trans1.setRotation((0, _ammoUtil.cocos2AmmoQuat)(quat, rot_0));
    this.impl.setFrames(trans0, trans1);
  }

  updateScale0() {
    this.updateFrames();
  }

  updateScale1() {
    this.updateFrames();
  }

}

exports.AmmoHingeConstraint = AmmoHingeConstraint;