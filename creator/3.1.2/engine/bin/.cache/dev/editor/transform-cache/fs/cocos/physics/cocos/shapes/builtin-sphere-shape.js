"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinSphereShape = void 0;

var _index = require("../../../core/geometry/index.js");

var _builtinShape = require("./builtin-shape.js");

var _util = require("../../utils/util.js");

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
class BuiltinSphereShape extends _builtinShape.BuiltinShape {
  setRadius(radius) {
    this.localSphere.radius = radius;
    const s = (0, _util.maxComponent)(this.collider.node.worldScale);
    this.worldSphere.radius = this.localSphere.radius * s;
  }

  get localSphere() {
    return this._localShape;
  }

  get worldSphere() {
    return this._worldShape;
  }

  get collider() {
    return this._collider;
  }

  constructor(radius = 0.5) {
    super();
    this._localShape = new _index.Sphere(0, 0, 0, radius);
    this._worldShape = new _index.Sphere(0, 0, 0, radius);
  }

  onLoad() {
    super.onLoad();
    this.setRadius(this.collider.radius);
  }

}

exports.BuiltinSphereShape = BuiltinSphereShape;