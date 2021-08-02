"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ray = void 0;

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
 * Basic Geometry: ray.
 * @zh
 * 基础几何 射线。
 */
class Ray {
  /**
   * @en
   * create a new ray
   * @zh
   * 创建一条射线。
   * @param {number} ox 起点的 x 部分。
   * @param {number} oy 起点的 y 部分。
   * @param {number} oz 起点的 z 部分。
   * @param {number} dx 方向的 x 部分。
   * @param {number} dy 方向的 y 部分。
   * @param {number} dz 方向的 z 部分。
   * @return {Ray} 射线。
   */
  static create(ox = 0, oy = 0, oz = 0, dx = 0, dy = 0, dz = 1) {
    return new Ray(ox, oy, oz, dx, dy, dz);
  }
  /**
   * @en
   * Creates a new ray initialized with values from an existing ray
   * @zh
   * 从一条射线克隆出一条新的射线。
   * @param {Ray} a 克隆的目标。
   * @return {Ray} 克隆出的新对象。
   */


  static clone(a) {
    return new Ray(a.o.x, a.o.y, a.o.z, a.d.x, a.d.y, a.d.z);
  }
  /**
   * @en
   * Copy the values from one ray to another
   * @zh
   * 将从一个 ray 的值复制到另一个 ray。
   * @param {Ray} out 接受操作的 ray。
   * @param {Ray} a 被复制的 ray。
   * @return {Ray} out 接受操作的 ray。
   */


  static copy(out, a) {
    _index.Vec3.copy(out.o, a.o);

    _index.Vec3.copy(out.d, a.d);

    return out;
  }
  /**
   * @en
   * create a ray from two points
   * @zh
   * 用两个点创建一条射线。
   * @param {Ray} out 接受操作的射线。
   * @param {Vec3} origin 射线的起点。
   * @param {Vec3} target 射线上的一点。
   * @return {Ray} out 接受操作的射线。
   */


  static fromPoints(out, origin, target) {
    _index.Vec3.copy(out.o, origin);

    _index.Vec3.normalize(out.d, _index.Vec3.subtract(out.d, target, origin));

    return out;
  }
  /**
   * @en
   * Set the components of a ray to the given values
   * @zh
   * 将给定射线的属性设置为给定的值。
   * @param {Ray} out 接受操作的射线。
   * @param {number} ox 起点的 x 部分。
   * @param {number} oy 起点的 y 部分。
   * @param {number} oz 起点的 z 部分。
   * @param {number} dx 方向的 x 部分。
   * @param {number} dy 方向的 y 部分。
   * @param {number} dz 方向的 z 部分。
   * @return {Ray} out 接受操作的射线。
   */


  static set(out, ox, oy, oz, dx, dy, dz) {
    out.o.x = ox;
    out.o.y = oy;
    out.o.z = oz;
    out.d.x = dx;
    out.d.y = dy;
    out.d.z = dz;
    return out;
  }
  /**
   * @en
   * The origin of the ray.
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
   * @en
   * Construct a ray;
   * @zh
   * 构造一条射线。
   * @param {number} ox 起点的 x 部分。
   * @param {number} oy 起点的 y 部分。
   * @param {number} oz 起点的 z 部分。
   * @param {number} dx 方向的 x 部分。
   * @param {number} dy 方向的 y 部分。
   * @param {number} dz 方向的 z 部分。
   */
  constructor(ox = 0, oy = 0, oz = 0, dx = 0, dy = 0, dz = -1) {
    this.o = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums.default.SHAPE_RAY;
    this.o = new _index.Vec3(ox, oy, oz);
    this.d = new _index.Vec3(dx, dy, dz);
  }
  /**
   * @en
   * Compute a point with the distance between the origin.
   * @zh
   * 根据给定距离计算出射线上的一点。
   * @param out 射线上的另一点。
   * @param distance 给定距离。
   */


  computeHit(out, distance) {
    _index.Vec3.normalize(out, this.d);

    _index.Vec3.scaleAndAdd(out, this.o, out, distance);
  }

}

exports.Ray = Ray;