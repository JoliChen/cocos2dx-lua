"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoPlaneShape = void 0;

var _ammoInstantiated = _interopRequireDefault(require("../ammo-instantiated.js"));

var _ammoShape = require("./ammo-shape.js");

var _ammoUtil = require("../ammo-util.js");

var _ammoEnum = require("../ammo-enum.js");

var _ammoConst = require("../ammo-const.js");

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
class AmmoPlaneShape extends _ammoShape.AmmoShape {
  setNormal(v) {
    (0, _ammoUtil.cocos2AmmoVec3)(this.impl.getPlaneNormal(), v);
    this.updateCompoundTransform();
  }

  setConstant(v) {
    this.impl.setPlaneConstant(v);
    this.updateCompoundTransform();
  }

  setScale() {
    super.setScale();
    (0, _ammoUtil.cocos2AmmoVec3)(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  }

  get impl() {
    return this._btShape;
  }

  get collider() {
    return this._collider;
  }

  constructor() {
    super(_ammoEnum.AmmoBroadphaseNativeTypes.STATIC_PLANE_PROXYTYPE);
  }

  onComponentSet() {
    const normal = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    (0, _ammoUtil.cocos2AmmoVec3)(normal, this.collider.normal);
    this._btShape = new _ammoInstantiated.default.btStaticPlaneShape(normal, this.collider.constant);
    this.setScale();
  }

}

exports.AmmoPlaneShape = AmmoPlaneShape;