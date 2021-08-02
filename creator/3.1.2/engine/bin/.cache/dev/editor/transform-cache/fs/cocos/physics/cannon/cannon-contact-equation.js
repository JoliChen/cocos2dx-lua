"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonContactEquation = void 0;

var _index = require("../../core/index.js");

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

class CannonContactEquation {
  get isBodyA() {
    if (this.impl) {
      const si = this.event.selfCollider.shape.impl;
      const bj = this.impl.bj;
      return si.body.id === bj.id;
    }

    return false;
  }

  constructor(event) {
    this.impl = null;
    this.event = void 0;
    this.event = event;
  }

  getLocalPointOnA(out) {
    if (this.impl) _index.Vec3.copy(out, this.impl.rj);
  }

  getLocalPointOnB(out) {
    if (this.impl) _index.Vec3.copy(out, this.impl.ri);
  }

  getWorldPointOnA(out) {
    if (this.impl) _index.Vec3.add(out, this.impl.rj, this.impl.bj.position);
  }

  getWorldPointOnB(out) {
    if (this.impl) _index.Vec3.add(out, this.impl.ri, this.impl.bi.position);
  }

  getLocalNormalOnA(out) {
    if (this.impl) {
      this.getWorldNormalOnA(out);

      _index.Quat.conjugate(quat, this.impl.bi.quaternion);

      _index.Vec3.transformQuat(out, out, quat);
    }
  }

  getLocalNormalOnB(out) {
    if (this.impl) {
      _index.Quat.conjugate(quat, this.impl.bj.quaternion);

      _index.Vec3.transformQuat(out, this.impl.ni, quat);
    }
  }

  getWorldNormalOnA(out) {
    if (this.impl) {
      this.getWorldNormalOnB(out);
      if (!this.isBodyA) _index.Vec3.negate(out, out);
    }
  }

  getWorldNormalOnB(out) {
    if (this.impl) _index.Vec3.copy(out, this.impl.ni);
  }

}

exports.CannonContactEquation = CannonContactEquation;