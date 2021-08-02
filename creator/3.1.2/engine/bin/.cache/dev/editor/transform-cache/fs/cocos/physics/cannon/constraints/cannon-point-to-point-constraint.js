"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonPointToPointConstraint = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _cannonConstraint = require("./cannon-constraint.js");

var _index = require("../../../core/index.js");

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
const v3_0 = new _index.Vec3();

class CannonPointToPointConstraint extends _cannonConstraint.CannonConstraint {
  get impl() {
    return this._impl;
  }

  get constraint() {
    return this._com;
  }

  setPivotA(v) {
    const cs = this.constraint;

    _index.Vec3.multiply(this.impl.pivotA, cs.node.worldScale, cs.pivotA);

    if (!cs.connectedBody) this.setPivotB(cs.pivotB);
  }

  setPivotB(v) {
    const cs = this.constraint;
    const cb = cs.connectedBody;

    if (cb) {
      _index.Vec3.multiply(this.impl.pivotB, cb.node.worldScale, cs.pivotB);
    } else {
      const node = cs.node;

      _index.Vec3.multiply(v3_0, node.worldScale, cs.pivotA);

      _index.Vec3.add(v3_0, v3_0, node.worldPosition);

      _index.Vec3.add(v3_0, v3_0, cs.pivotB);

      _index.Vec3.copy(this.impl.pivotB, v3_0);
    }
  }

  onComponentSet() {
    const bodyA = this._rigidBody.body.impl;
    const cb = this.constraint.connectedBody;
    let bodyB = _cannon.default.World.staticBody;

    if (cb) {
      bodyB = cb.body.impl;
    }

    this._impl = new _cannon.default.PointToPointConstraint(bodyA, null, bodyB);
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

exports.CannonPointToPointConstraint = CannonPointToPointConstraint;