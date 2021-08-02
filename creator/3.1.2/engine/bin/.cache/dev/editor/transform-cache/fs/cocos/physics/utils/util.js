"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setWrap = setWrap;
exports.getWrap = getWrap;
exports.maxComponent = maxComponent;
exports.shrinkPositions = shrinkPositions;
Object.defineProperty(exports, "cylinder", {
  enumerable: true,
  get: function () {
    return _index2.cylinder;
  }
});
exports.CollisionEventObject = exports.TriggerEventObject = exports.VEC3_0 = void 0;

var _index = require("../../core/index.js");

var _index2 = require("../../primitive/index.js");

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
function setWrap(object, wrapper) {
  object.__cc_wrapper__ = wrapper;
}

function getWrap(object) {
  return object.__cc_wrapper__;
}

function maxComponent(v) {
  return Math.max(v.x, Math.max(v.y, v.z));
}

const VEC3_0 = new _index.Vec3();
exports.VEC3_0 = VEC3_0;
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

function shrinkPositions(buffer) {
  const pos = [];

  if (buffer.length >= 3) {
    // eslint-disable-next-line no-unused-expressions
    pos[0] = buffer[0], pos[1] = buffer[1], pos[2] = buffer[2];
    const len = buffer.length;

    for (let i = 3; i < len; i += 3) {
      const p0 = buffer[i];
      const p1 = buffer[i + 1];
      const p2 = buffer[i + 2];
      const len2 = pos.length;
      let isNew = true;

      for (let j = 0; j < len2; j += 3) {
        if ((0, _index.equals)(p0, pos[j]) && (0, _index.equals)(p1, pos[j + 1]) && (0, _index.equals)(p2, pos[j + 2])) {
          isNew = false;
          break;
        }
      }

      if (isNew) {
        pos.push(p0);
        pos.push(p1);
        pos.push(p2);
      }
    }
  }

  return pos;
}