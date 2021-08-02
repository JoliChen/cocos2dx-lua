"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsRayCastCallback = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _index = require("../../../core/index.js");

var _index2 = require("../../framework/index.js");

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
class PhysicsRayCastCallback extends _box2d.default.RayCastCallback {
  constructor(...args) {
    super(...args);
    this._type = _index2.ERaycast2DType.Closest;
    this._fixtures = [];
    this._points = [];
    this._normals = [];
    this._fractions = [];
    this._mask = 0xffffffff;
  }

  init(type, mask) {
    this._type = type;
    this._mask = mask;
    this._fixtures.length = 0;
    this._points.length = 0;
    this._normals.length = 0;
    this._fractions.length = 0;
  }

  ReportFixture(fixture, point, normal, fraction) {
    if ((fixture.GetFilterData().categoryBits & this._mask) === 0) {
      return 0;
    }

    if (this._type === _index2.ERaycast2DType.Closest) {
      this._fixtures[0] = fixture;
      this._points[0] = point;
      this._normals[0] = normal;
      this._fractions[0] = fraction;
      return fraction;
    }

    this._fixtures.push(fixture);

    this._points.push(new _index.Vec2(point.x, point.y));

    this._normals.push(new _index.Vec2(normal.x, normal.y));

    this._fractions.push(fraction);

    if (this._type === _index2.ERaycast2DType.Any) {
      return 0;
    } else if (this._type >= _index2.ERaycast2DType.All) {
      return 1;
    }

    return fraction;
  }

  getFixtures() {
    return this._fixtures;
  }

  getPoints() {
    return this._points;
  }

  getNormals() {
    return this._normals;
  }

  getFractions() {
    return this._fractions;
  }

}

exports.PhysicsRayCastCallback = PhysicsRayCastCallback;