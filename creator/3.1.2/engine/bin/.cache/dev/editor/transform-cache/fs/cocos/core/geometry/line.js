"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = void 0;

var _index = require("../math/index.js");

var _enums = _interopRequireDefault(require("./enums.js"));

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
 * @module geometry
 */

/**
 * @en
 * Basic Geometry: Line.
 * @zh
 * 基础几何 line。
 */
class Line {
  /**
   * @en
   * create a new line
   * @zh
   * 创建一个新的 line。
   * @param sx 起点的 x 部分。
   * @param sy 起点的 y 部分。
   * @param sz 起点的 z 部分。
   * @param ex 终点的 x 部分。
   * @param ey 终点的 y 部分。
   * @param ez 终点的 z 部分。
   * @return
   */
  static create(sx, sy, sz, ex, ey, ez) {
    return new Line(sx, sy, sz, ex, ey, ez);
  }
  /**
   * @en
   * Creates a new Line initialized with values from an existing Line
   * @zh
   * 克隆一个新的 line。
   * @param a 克隆的来源。
   * @return 克隆出的对象。
   */


  static clone(a) {
    return new Line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
  }
  /**
   * @en
   * Copy the values from one Line to another
   * @zh
   * 复制一个线的值到另一个。
   * @param out 接受操作的对象。
   * @param a 复制的来源。
   * @return 接受操作的对象。
   */


  static copy(out, a) {
    _index.Vec3.copy(out.s, a.s);

    _index.Vec3.copy(out.e, a.e);

    return out;
  }
  /**
   * @en
   * create a line from two points
   * @zh
   * 用两个点创建一个线。
   * @param out 接受操作的对象。
   * @param start 起点。
   * @param end 终点。
   * @return out 接受操作的对象。
   */


  static fromPoints(out, start, end) {
    _index.Vec3.copy(out.s, start);

    _index.Vec3.copy(out.e, end);

    return out;
  }
  /**
   * @en
   * Set the components of a Vec3 to the given values
   * @zh
   * 将给定线的属性设置为给定值。
   * @param out 接受操作的对象。
   * @param sx 起点的 x 部分。
   * @param sy 起点的 y 部分。
   * @param sz 起点的 z 部分。
   * @param ex 终点的 x 部分。
   * @param ey 终点的 y 部分。
   * @param ez 终点的 z 部分。
   * @return out 接受操作的对象。
   */


  static set(out, sx, sy, sz, ex, ey, ez) {
    out.s.x = sx;
    out.s.y = sy;
    out.s.z = sz;
    out.e.x = ex;
    out.e.y = ey;
    out.e.z = ez;
    return out;
  }
  /**
   * @zh
   * 计算线的长度。
   * @param a 要计算的线。
   * @return 长度。
   */


  static len(a) {
    return _index.Vec3.distance(a.s, a.e);
  }
  /**
   * @zh
   * 起点。
   */


  /**
   * @en
   * Gets the type of the shape.
   * @zh
   * 获取形状的类型。
   */
  get type() {
    return this._type;
  }

  /**
   * 构造一条线。
   * @param sx 起点的 x 部分。
   * @param sy 起点的 y 部分。
   * @param sz 起点的 z 部分。
   * @param ex 终点的 x 部分。
   * @param ey 终点的 y 部分。
   * @param ez 终点的 z 部分。
   */
  constructor(sx = 0, sy = 0, sz = 0, ex = 0, ey = 0, ez = -1) {
    this.s = void 0;
    this.e = void 0;
    this._type = void 0;
    this._type = _enums.default.SHAPE_LINE;
    this.s = new _index.Vec3(sx, sy, sz);
    this.e = new _index.Vec3(ex, ey, ez);
  }
  /**
   * @zh
   * 计算线的长度。
   * @param a 要计算的线。
   * @return 长度。
   */


  length() {
    return _index.Vec3.distance(this.s, this.e);
  }

}

exports.Line = Line;