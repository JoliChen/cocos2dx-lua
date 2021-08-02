"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinBoxShape = void 0;

var _index = require("../../../core/math/index.js");

var _index2 = require("../../../core/geometry/index.js");

var _builtinShape = require("./builtin-shape.js");

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
class BuiltinBoxShape extends _builtinShape.BuiltinShape {
  get localObb() {
    return this._localShape;
  }

  get worldObb() {
    return this._worldShape;
  }

  get collider() {
    return this._collider;
  }

  constructor() {
    super();
    this._localShape = new _index2.OBB();
    this._worldShape = new _index2.OBB();
  }

  setSize(size) {
    _index.Vec3.multiplyScalar(this.localObb.halfExtents, size, 0.5);

    _index.Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, this.collider.node.worldScale);
  }

  onLoad() {
    super.onLoad();
    this.setSize(this.collider.size);
  }

}

exports.BuiltinBoxShape = BuiltinBoxShape;