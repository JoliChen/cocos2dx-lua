"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoContactEquation = void 0;

var _index = require("../../core/index.js");

var _ammoUtil = require("./ammo-util.js");

var _ammoConst = require("./ammo-const.js");

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
class AmmoContactEquation {
  get isBodyA() {
    const sb = this.event.selfCollider.shape.sharedBody.body;
    const b0 = this.event.impl.getBody0();
    return Ammo.compare(b0, sb);
  }

  constructor(event) {
    this.impl = null;
    this.event = void 0;
    this.event = event;
  }

  getLocalPointOnA(out) {
    if (this.impl) (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_localPointA);
  }

  getLocalPointOnB(out) {
    if (this.impl) (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_localPointB);
  }

  getWorldPointOnA(out) {
    if (this.impl) (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_positionWorldOnA);
  }

  getWorldPointOnB(out) {
    if (this.impl) (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_positionWorldOnB);
  }

  getLocalNormalOnA(out) {
    if (this.impl) {
      (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_normalWorldOnB);
      if (!this.isBodyA) _index.Vec3.negate(out, out);
      const inv_rot = _ammoConst.CC_QUAT_0;
      const bt_rot = _ammoConst.AmmoConstant.instance.QUAT_0;
      const body = this.event.impl.getBody0();
      body.getWorldTransform().getBasis().getRotation(bt_rot);
      (0, _ammoUtil.ammo2CocosQuat)(inv_rot, bt_rot);

      _index.Quat.conjugate(inv_rot, inv_rot);

      _index.Vec3.transformQuat(out, out, inv_rot);
    }
  }

  getLocalNormalOnB(out) {
    if (this.impl) {
      const inv_rot = _ammoConst.CC_QUAT_0;
      const bt_rot = _ammoConst.AmmoConstant.instance.QUAT_0;
      const body = this.event.impl.getBody1();
      body.getWorldTransform().getBasis().getRotation(bt_rot);
      (0, _ammoUtil.ammo2CocosQuat)(inv_rot, bt_rot);

      _index.Quat.conjugate(inv_rot, inv_rot);

      (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_normalWorldOnB);

      _index.Vec3.transformQuat(out, out, inv_rot);
    }
  }

  getWorldNormalOnA(out) {
    if (this.impl) {
      (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_normalWorldOnB);
      if (!this.isBodyA) _index.Vec3.negate(out, out);
    }
  }

  getWorldNormalOnB(out) {
    if (this.impl) (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.m_normalWorldOnB);
  }

}

exports.AmmoContactEquation = AmmoContactEquation;