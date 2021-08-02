"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBB = void 0;

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
const _v3_tmp = new _index.Vec3();

const _v3_tmp2 = new _index.Vec3();

const _m3_tmp = new _index.Mat3(); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/


const transform_extent_m3 = (out, extent, m3) => {
  _m3_tmp.m00 = Math.abs(m3.m00);
  _m3_tmp.m01 = Math.abs(m3.m01);
  _m3_tmp.m02 = Math.abs(m3.m02);
  _m3_tmp.m03 = Math.abs(m3.m03);
  _m3_tmp.m04 = Math.abs(m3.m04);
  _m3_tmp.m05 = Math.abs(m3.m05);
  _m3_tmp.m06 = Math.abs(m3.m06);
  _m3_tmp.m07 = Math.abs(m3.m07);
  _m3_tmp.m08 = Math.abs(m3.m08);

  _index.Vec3.transformMat3(out, extent, _m3_tmp);
};
/**
 * @en
 * Basic Geometry: directional bounding box.
 * @zh
 * 基础几何  方向包围盒。
 */


class OBB {
  /**
   * @en
   * create a new obb
   * @zh
   * 创建一个新的 obb 实例。
   * @param cx 形状的相对于原点的 X 坐标。
   * @param cy 形状的相对于原点的 Y 坐标。
   * @param cz 形状的相对于原点的 Z 坐标。
   * @param hw - obb 宽度的一半。
   * @param hh - obb 高度的一半。
   * @param hl - obb 长度的一半。
   * @param ox_1 方向矩阵参数。
   * @param ox_2 方向矩阵参数。
   * @param ox_3 方向矩阵参数。
   * @param oy_1 方向矩阵参数。
   * @param oy_2 方向矩阵参数。
   * @param oy_3 方向矩阵参数。
   * @param oz_1 方向矩阵参数。
   * @param oz_2 方向矩阵参数。
   * @param oz_3 方向矩阵参数。
   * @return 返回一个 obb。
   */
  static create(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    return new OBB(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * @en
   * clone a new obb
   * @zh
   * 克隆一个 obb。
   * @param a 克隆的目标。
   * @returns 克隆出的新对象。
   */


  static clone(a) {
    return new OBB(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z, a.orientation.m00, a.orientation.m01, a.orientation.m02, a.orientation.m03, a.orientation.m04, a.orientation.m05, a.orientation.m06, a.orientation.m07, a.orientation.m08);
  }
  /**
   * @en
   * copy the values from one obb to another
   * @zh
   * 将从一个 obb 的值复制到另一个 obb。
   * @param {OBB} out 接受操作的 obb。
   * @param {OBB} a 被复制的 obb。
   * @return {OBB} out 接受操作的 obb。
   */


  static copy(out, a) {
    _index.Vec3.copy(out.center, a.center);

    _index.Vec3.copy(out.halfExtents, a.halfExtents);

    _index.Mat3.copy(out.orientation, a.orientation);

    return out;
  }
  /**
   * @en
   * create a new obb from two corner points
   * @zh
   * 用两个点创建一个新的 obb。
   * @param out - 接受操作的 obb。
   * @param minPos - obb 的最小点。
   * @param maxPos - obb 的最大点。
   * @returns {OBB} out 接受操作的 obb。
   */


  static fromPoints(out, minPos, maxPos) {
    _index.Vec3.multiplyScalar(out.center, _index.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    _index.Vec3.multiplyScalar(out.halfExtents, _index.Vec3.subtract(_v3_tmp2, maxPos, minPos), 0.5);

    _index.Mat3.identity(out.orientation);

    return out;
  }
  /**
   * @en
   * Set the components of a obb to the given values
   * @zh
   * 将给定 obb 的属性设置为给定的值。
   * @param cx - obb 的原点的 X 坐标。
   * @param cy - obb 的原点的 Y 坐标。
   * @param cz - obb 的原点的 Z 坐标。
   * @param hw - obb 宽度的一半。
   * @param hh - obb 高度的一半。
   * @param hl - obb 长度的一半。
   * @param ox_1 方向矩阵参数。
   * @param ox_2 方向矩阵参数。
   * @param ox_3 方向矩阵参数。
   * @param oy_1 方向矩阵参数。
   * @param oy_2 方向矩阵参数。
   * @param oy_3 方向矩阵参数。
   * @param oz_1 方向矩阵参数。
   * @param oz_2 方向矩阵参数。
   * @param oz_3 方向矩阵参数。
   * @return {OBB} out
   */


  static set(out, cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    _index.Vec3.set(out.center, cx, cy, cz);

    _index.Vec3.set(out.halfExtents, hw, hh, hl);

    _index.Mat3.set(out.orientation, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);

    return out;
  }
  /**
   * @zh
   * 本地坐标的中心点。
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

  constructor(cx = 0, cy = 0, cz = 0, hw = 1, hh = 1, hl = 1, ox_1 = 1, ox_2 = 0, ox_3 = 0, oy_1 = 0, oy_2 = 1, oy_3 = 0, oz_1 = 0, oz_2 = 0, oz_3 = 1) {
    this.center = void 0;
    this.halfExtents = void 0;
    this.orientation = void 0;
    this._type = void 0;
    this._type = _enums.default.SHAPE_OBB;
    this.center = new _index.Vec3(cx, cy, cz);
    this.halfExtents = new _index.Vec3(hw, hh, hl);
    this.orientation = new _index.Mat3(ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * @en
   * Get the bounding points of this shape
   * @zh
   * 获取 obb 的最小点和最大点。
   * @param {Vec3} minPos 最小点。
   * @param {Vec3} maxPos 最大点。
   */


  getBoundary(minPos, maxPos) {
    transform_extent_m3(_v3_tmp, this.halfExtents, this.orientation);

    _index.Vec3.subtract(minPos, this.center, _v3_tmp);

    _index.Vec3.add(maxPos, this.center, _v3_tmp);
  }
  /**
   * Transform this shape
   * @zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @param m 变换的矩阵。
   * @param pos 变换的位置部分。
   * @param rot 变换的旋转部分。
   * @param scale 变换的缩放部分。
   * @param out 变换的目标。
   */


  transform(m, pos, rot, scale, out) {
    _index.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _index.Mat3.fromQuat(out.orientation, rot);

    _index.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  }
  /**
   * @zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @param m 变换的矩阵。
   * @param rot 变换的旋转部分。
   * @param out 变换的目标。
   */


  translateAndRotate(m, rot, out) {
    _index.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _index.Mat3.fromQuat(out.orientation, rot);
  }
  /**
   * @zh
   *  将 out 根据这个 obb 的数据进行缩放。
   * @param scale 缩放值。
   * @param out 缩放的目标。
   */


  setScale(scale, out) {
    _index.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  }

}

exports.OBB = OBB;