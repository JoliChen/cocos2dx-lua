"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonPlaneShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../../core/math/index.js");

var _cannonUtil = require("../cannon-util.js");

var _cannonShape = require("./cannon-shape.js");

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
class CannonPlaneShape extends _cannonShape.CannonShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  constructor() {
    super();
    this._shape = new _cannon.default.Plane();
  }

  setNormal(v) {
    _index.Quat.rotationTo(this._orient, _index.Vec3.UNIT_Z, v);

    if (this._index !== -1) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  }

  setConstant(v) {
    _index.Vec3.scaleAndAdd(this._offset, this._collider.center, this.collider.normal, v);
  }

  onLoad() {
    super.onLoad();
    this.setConstant(this.collider.constant);
    this.setNormal(this.collider.normal);
  }

  _setCenter(v) {
    super._setCenter(v);

    this.setConstant(this.collider.constant);
  }

}

exports.CannonPlaneShape = CannonPlaneShape;