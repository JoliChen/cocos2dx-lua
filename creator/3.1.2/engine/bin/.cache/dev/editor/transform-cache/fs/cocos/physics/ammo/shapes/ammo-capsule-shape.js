"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoCapsuleShape = void 0;

var _ammoInstantiated = _interopRequireDefault(require("../ammo-instantiated.js"));

var _index = require("../../../core/index.js");

var _ammoShape = require("./ammo-shape.js");

var _ammoEnum = require("../ammo-enum.js");

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
class AmmoCapsuleShape extends _ammoShape.AmmoShape {
  setCylinderHeight(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  }

  setDirection(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  }

  setRadius(v) {
    this.updateProperties(this.collider.radius, this.collider.cylinderHeight, this.collider.direction, this._collider.node.worldScale);
  }

  get impl() {
    return this._btShape;
  }

  get collider() {
    return this._collider;
  }

  constructor() {
    super(_ammoEnum.AmmoBroadphaseNativeTypes.CAPSULE_SHAPE_PROXYTYPE);
  }

  onComponentSet() {
    this._btShape = new _ammoInstantiated.default.btCapsuleShape(0.5, 1);
    this.setRadius(this.collider.radius);
  }

  setScale() {
    super.setScale();
    this.setRadius(this.collider.radius);
  }

  updateProperties(radius, height, direction, scale) {
    const ws = scale;
    const upAxis = direction;

    if (upAxis === 1) {
      const wr = radius * Math.abs((0, _index.absMax)(ws.x, ws.z));
      const halfH = height / 2 * Math.abs(ws.y);
      this.impl.updateProp(wr, halfH, upAxis);
    } else if (upAxis === 0) {
      const wr = radius * Math.abs((0, _index.absMax)(ws.y, ws.z));
      const halfH = height / 2 * Math.abs(ws.x);
      this.impl.updateProp(wr, halfH, upAxis);
    } else {
      const wr = radius * Math.abs((0, _index.absMax)(ws.x, ws.y));
      const halfH = height / 2 * Math.abs(ws.z);
      this.impl.updateProp(wr, halfH, upAxis);
    }

    this.updateCompoundTransform();
  }

}

exports.AmmoCapsuleShape = AmmoCapsuleShape;