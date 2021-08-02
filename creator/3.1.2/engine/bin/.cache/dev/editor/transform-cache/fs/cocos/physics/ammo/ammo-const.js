"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CC_QUAT_0 = exports.CC_V3_1 = exports.CC_V3_0 = exports.AmmoConstant = exports.CollisionEventObject = exports.TriggerEventObject = void 0;

var _ammoInstantiated = _interopRequireDefault(require("./ammo-instantiated.js"));

var _index = require("../../core/index.js");

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
const TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: null
};
exports.TriggerEventObject = TriggerEventObject;
const CollisionEventObject = {
  type: 'onCollisionEnter',
  selfCollider: null,
  otherCollider: null,
  contacts: [],
  impl: null
};
exports.CollisionEventObject = CollisionEventObject;

class AmmoConstant {
  constructor() {
    this.EMPTY_SHAPE = new _ammoInstantiated.default.btEmptyShape();
    this.TRANSFORM = new _ammoInstantiated.default.btTransform();
    this.TRANSFORM_1 = new _ammoInstantiated.default.btTransform();
    this.VECTOR3_0 = new _ammoInstantiated.default.btVector3();
    this.VECTOR3_1 = new _ammoInstantiated.default.btVector3();
    this.QUAT_0 = new _ammoInstantiated.default.btQuaternion();
  }

  static get instance() {
    if (AmmoConstant._instance == null) AmmoConstant._instance = new AmmoConstant();
    return AmmoConstant._instance;
  }

}

exports.AmmoConstant = AmmoConstant;
AmmoConstant._instance = void 0;
const CC_V3_0 = new _index.Vec3();
exports.CC_V3_0 = CC_V3_0;
const CC_V3_1 = new _index.Vec3();
exports.CC_V3_1 = CC_V3_1;
const CC_QUAT_0 = new _index.Quat();
exports.CC_QUAT_0 = CC_QUAT_0;