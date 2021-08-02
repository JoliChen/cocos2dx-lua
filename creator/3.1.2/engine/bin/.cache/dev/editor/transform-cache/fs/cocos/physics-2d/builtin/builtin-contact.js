"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinContact = void 0;

var _intersection2d = _interopRequireDefault(require("./intersection-2d.js"));

var _boxShape2d = require("./shapes/box-shape-2d.js");

var _polygonShape2d = require("./shapes/polygon-shape-2d.js");

var _circleShape2d = require("./shapes/circle-shape-2d.js");

var _index = require("../../core/index.js");

var _index2 = require("../framework/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
class BuiltinContact {
  constructor(shape1, shape2) {
    this.shape1 = void 0;
    this.shape2 = void 0;
    this.testFunc = void 0;
    this.touching = false;
    this.type = _index2.Contact2DType.None;
    this.shape1 = shape1;
    this.shape2 = shape2;
    this.touching = false;
    const isShape1Polygon = shape1 instanceof _boxShape2d.BuiltinBoxShape || shape1 instanceof _polygonShape2d.BuiltinPolygonShape;
    const isShape2Polygon = shape2 instanceof _boxShape2d.BuiltinBoxShape || shape2 instanceof _polygonShape2d.BuiltinPolygonShape;
    const isShape1Circle = shape1 instanceof _circleShape2d.BuiltinCircleShape;
    const isShape2Circle = shape2 instanceof _circleShape2d.BuiltinCircleShape;

    if (isShape1Polygon && isShape2Polygon) {
      this.testFunc = _intersection2d.default.polygonPolygon;
    } else if (isShape1Circle && isShape2Circle) {
      this.testFunc = _intersection2d.default.circleCircle;
    } else if (isShape1Polygon && isShape2Circle) {
      this.testFunc = _intersection2d.default.polygonCircle;
    } else if (isShape1Circle && isShape2Polygon) {
      this.testFunc = _intersection2d.default.polygonCircle;
      this.shape1 = shape2;
      this.shape2 = shape1;
    } else {
      (0, _index.error)(`Can not find contact for builtin shape: ${shape1.constructor.name}, ${shape2.constructor.name}`);
    }
  }

  test() {
    const s1 = this.shape1;
    const s2 = this.shape2;

    if (!s1.worldAABB.intersects(s2.worldAABB)) {
      return false;
    }

    if (this.testFunc === _intersection2d.default.polygonPolygon) {
      return _intersection2d.default.polygonPolygon(s1.worldPoints, s2.worldPoints);
    } else if (this.testFunc === _intersection2d.default.circleCircle) {
      return _intersection2d.default.circleCircle(s1.worldPosition, s1.worldRadius, s2.worldPosition, s2.worldRadius);
    } else if (this.testFunc === _intersection2d.default.polygonCircle) {
      return _intersection2d.default.polygonCircle(s1.worldPoints, s2.worldPosition, s2.worldRadius);
    }

    return false;
  }

  updateState() {
    const result = this.test();
    let type = _index2.Contact2DType.None;

    if (result && !this.touching) {
      this.touching = true;
      type = _index2.Contact2DType.BEGIN_CONTACT;
    } else if (!result && this.touching) {
      this.touching = false;
      type = _index2.Contact2DType.END_CONTACT;
    }

    this.type = type;
    return type;
  }

}

exports.BuiltinContact = BuiltinContact;