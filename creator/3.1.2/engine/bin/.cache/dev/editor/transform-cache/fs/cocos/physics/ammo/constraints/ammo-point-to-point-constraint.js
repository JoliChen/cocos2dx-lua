"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoPointToPointConstraint = void 0;

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
class AmmoPointToPointConstraint extends _ammoConstraint.AmmoConstraint {
  setPivotA(v) {
    const pivotA = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    const cs = this.constraint;

    _index.Vec3.multiply(_ammoConst.CC_V3_0, cs.node.worldScale, cs.pivotA);

    (0, _ammoUtil.cocos2AmmoVec3)(pivotA, _ammoConst.CC_V3_0);
    this.impl.setPivotA(pivotA);
    if (!cs.connectedBody) this.setPivotB(cs.pivotB);
  }

  setPivotB(v) {
    const cs = this.constraint;
    const node = this._rigidBody.node;
    const pivotB = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    const cb = cs.connectedBody;

    if (cb) {
      _index.Vec3.multiply(_ammoConst.CC_V3_0, cb.node.worldScale, cs.pivotB);

      (0, _ammoUtil.cocos2AmmoVec3)(pivotB, _ammoConst.CC_V3_0);
    } else {
      _index.Vec3.multiply(_ammoConst.CC_V3_0, node.worldScale, cs.pivotA);

      _index.Vec3.add(_ammoConst.CC_V3_0, _ammoConst.CC_V3_0, node.worldPosition);

      _index.Vec3.add(_ammoConst.CC_V3_0, _ammoConst.CC_V3_0, cs.pivotB);

      (0, _ammoUtil.cocos2AmmoVec3)(pivotB, _ammoConst.CC_V3_0);
    }

    this.impl.setPivotB(pivotB);
  }

  get impl() {
    return this._impl;
  }

  get constraint() {
    return this._com;
  }

  onComponentSet() {
    const bodyA = this._rigidBody.body.impl;
    const cb = this.constraint.connectedBody;
    let bodyB;

    if (cb) {
      bodyB = cb.body.impl;
    }

    const pivotA = _ammoConst.AmmoConstant.instance.VECTOR3_0;

    if (bodyB) {
      const pivotB = _ammoConst.AmmoConstant.instance.VECTOR3_1;
      this._impl = new _ammoInstantiated.default.btPoint2PointConstraint(bodyA, bodyB, pivotA, pivotB);
    } else {
      this._impl = new _ammoInstantiated.default.btPoint2PointConstraint(bodyA, pivotA);
    }

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

exports.AmmoPointToPointConstraint = AmmoPointToPointConstraint;