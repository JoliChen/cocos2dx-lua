"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonConstraint = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _util = require("../../utils/util.js");

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
_cannon.default.World.staticBody = new _cannon.default.Body();
_cannon.default.World.idToConstraintMap = {};

class CannonConstraint {
  setConnectedBody(v) {
    const oldSB = (0, _util.getWrap)(this.impl.bodyB);
    if (oldSB) oldSB.removeJoint(this, 1);

    if (v) {
      this._impl.bodyB = v.body.impl;
      const newSB = v.body.sharedBody;
      newSB.addJoint(this, 1);
    } else {
      this._impl.bodyB = _cannon.default.World.staticBody;
    }

    const newBJ = this._impl.bodyB;

    this._impl.equations.forEach(v => {
      v.bj = newBJ;
    });
  }

  setEnableCollision(v) {
    this._impl.collideConnected = v;
  }

  get impl() {
    return this._impl;
  }

  get constraint() {
    return this._com;
  }

  initialize(v) {
    this._com = v;
    this._rigidBody = v.attachedBody;
    this.onComponentSet();
    this.setEnableCollision(v.enableCollision);
    _cannon.default.World.idToConstraintMap[this._impl.id] = this._impl;
  } // virtual


  onComponentSet() {} // virtual


  updateScale0() {}

  updateScale1() {}

  onEnable() {
    const sb = this._rigidBody.body.sharedBody;
    sb.wrappedWorld.addConstraint(this);
    sb.addJoint(this, 0);
    const connect = this.constraint.connectedBody;

    if (connect) {
      const sb2 = connect.body.sharedBody;
      sb2.addJoint(this, 1);
    }
  }

  onDisable() {
    const sb = this._rigidBody.body.sharedBody;
    sb.wrappedWorld.removeConstraint(this);
    sb.removeJoint(this, 0);
    const connect = this.constraint.connectedBody;

    if (connect) {
      const sb2 = connect.body.sharedBody;
      sb2.removeJoint(this, 1);
    }
  }

  onDestroy() {
    delete _cannon.default.World.idToConstraintMap[this._impl.id];
    this._com = null;
    this._rigidBody = null;
    this._impl = null;
  }

}

exports.CannonConstraint = CannonConstraint;