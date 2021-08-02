"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quat = quat;
exports.Quat = void 0;

var _class = require("../data/class.js");

var _valueType = require("../value-types/value-type.js");

var _mat = require("./mat3.js");

var _utils = require("./utils.js");

var _vec = require("./vec3.js");

var _globalExports = require("../global-exports.js");

/*
 Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module core/math
 */

/**
 * @en quaternion
 * @zh 四元数
 */
class Quat extends _valueType.ValueType {
  /**
   * @en Obtain a copy of the given quaternion
   * @zh 获得指定四元数的拷贝
   */
  static clone(a) {
    return new Quat(a.x, a.y, a.z, a.w);
  }
  /**
   * @en Copy the given quaternion to the out quaternion
   * @zh 复制目标四元数
   */


  static copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * @en Sets the out quaternion with values of each component
   * @zh 设置四元数值
   */


  static set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * @en Sets the out quaternion to an identity quaternion
   * @zh 将目标赋值为单位四元数
   */


  static identity(out) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    out.w = 1;
    return out;
  }
  /**
   * @en Sets the out quaternion with the shortest path orientation between two vectors, considering both vectors normalized
   * @zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
   */


  static rotationTo(out, a, b) {
    const dot = _vec.Vec3.dot(a, b);

    if (dot < -0.999999) {
      _vec.Vec3.cross(v3_1, _vec.Vec3.UNIT_X, a);

      if (v3_1.length() < 0.000001) {
        _vec.Vec3.cross(v3_1, _vec.Vec3.UNIT_Y, a);
      }

      _vec.Vec3.normalize(v3_1, v3_1);

      Quat.fromAxisAngle(out, v3_1, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 1;
      return out;
    } else {
      _vec.Vec3.cross(v3_1, a, b);

      out.x = v3_1.x;
      out.y = v3_1.y;
      out.z = v3_1.z;
      out.w = 1 + dot;
      return Quat.normalize(out, out);
    }
  }
  /**
   * @en Gets the rotation axis and the arc of rotation from the quaternion
   * @zh 获取四元数的旋转轴和旋转弧度
   * @param outAxis output axis
   * @param q input quaternion
   * @return radius of rotation
   */


  static getAxisAngle(outAxis, q) {
    const rad = Math.acos(q.w) * 2.0;
    const s = Math.sin(rad / 2.0);

    if (s !== 0.0) {
      outAxis.x = q.x / s;
      outAxis.y = q.y / s;
      outAxis.z = q.z / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      outAxis.x = 1;
      outAxis.y = 0;
      outAxis.z = 0;
    }

    return rad;
  }
  /**
   * @en Quaternion multiplication and save the results to out quaternion
   * @zh 四元数乘法
   */


  static multiply(out, a, b) {
    const x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;
    const y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;
    const z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;
    const w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * @en Quaternion scalar multiplication and save the results to out quaternion
   * @zh 四元数标量乘法
   */


  static multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * @en Quaternion multiplication and addition: A + B * scale
   * @zh 四元数乘加：A + B * scale
   */


  static scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * @en Sets the out quaternion to represent a radian rotation around x axis
   * @zh 绕 X 轴旋转指定四元数
   * @param rad radius of rotation
   */


  static rotateX(out, a, rad) {
    rad *= 0.5;
    const bx = Math.sin(rad);
    const bw = Math.cos(rad);
    const {
      x,
      y,
      z,
      w
    } = a;
    out.x = x * bw + w * bx;
    out.y = y * bw + z * bx;
    out.z = z * bw - y * bx;
    out.w = w * bw - x * bx;
    return out;
  }
  /**
   * @en Sets the out quaternion to represent a radian rotation around y axis
   * @zh 绕 Y 轴旋转指定四元数
   * @param rad radius of rotation
   */


  static rotateY(out, a, rad) {
    rad *= 0.5;
    const by = Math.sin(rad);
    const bw = Math.cos(rad);
    const {
      x,
      y,
      z,
      w
    } = a;
    out.x = x * bw - z * by;
    out.y = y * bw + w * by;
    out.z = z * bw + x * by;
    out.w = w * bw - y * by;
    return out;
  }
  /**
   * @en Sets the out quaternion to represent a radian rotation around z axis
   * @zh 绕 Z 轴旋转指定四元数
   * @param rad radius of rotation
   */


  static rotateZ(out, a, rad) {
    rad *= 0.5;
    const bz = Math.sin(rad);
    const bw = Math.cos(rad);
    const {
      x,
      y,
      z,
      w
    } = a;
    out.x = x * bw + y * bz;
    out.y = y * bw - x * bz;
    out.z = z * bw + w * bz;
    out.w = w * bw - z * bz;
    return out;
  }
  /**
   * @en Sets the out quaternion to represent a radian rotation around a given rotation axis in world space
   * @zh 绕世界空间下指定轴旋转四元数
   * @param axis axis of rotation, normalized by default
   * @param rad radius of rotation
   */


  static rotateAround(out, rot, axis, rad) {
    // get inv-axis (local to rot)
    Quat.invert(qt_1, rot);

    _vec.Vec3.transformQuat(v3_1, axis, qt_1); // rotate by inv-axis


    Quat.fromAxisAngle(qt_1, v3_1, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * @en Sets the out quaternion to represent a radian rotation around a given rotation axis in local space
   * @zh 绕本地空间下指定轴旋转四元数
   * @param axis axis of rotation
   * @param rad radius of rotation
   */


  static rotateAroundLocal(out, rot, axis, rad) {
    Quat.fromAxisAngle(qt_1, axis, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * @en Calculates the w component with xyz components, considering the given quaternion normalized
   * @zh 根据 xyz 分量计算 w 分量，默认已归一化
   */


  static calculateW(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = Math.sqrt(Math.abs(1.0 - a.x * a.x - a.y * a.y - a.z * a.z));
    return out;
  }
  /**
   * @en Quaternion dot product (scalar product)
   * @zh 四元数点积（数量积）
   */


  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * @en Element by element linear interpolation: A + t * (B - A)
   * @zh 逐元素线性插值： A + t * (B - A)
   */


  static lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * @en Spherical quaternion interpolation
   * @zh 四元数球面插值
   */


  static slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let scale0 = 0;
    let scale1 = 0;
    let bx = b.x;
    let by = b.y;
    let bz = b.z;
    let bw = b.w; // calc cosine

    let cosom = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > 0.000001) {
      // standard case (slerp)
      const omega = Math.acos(cosom);
      const sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out.x = scale0 * a.x + scale1 * bx;
    out.y = scale0 * a.y + scale1 * by;
    out.z = scale0 * a.z + scale1 * bz;
    out.w = scale0 * a.w + scale1 * bw;
    return out;
  }
  /**
   * @en Spherical quaternion interpolation with two control points
   * @zh 带两个控制点的四元数球面插值
   */


  static sqlerp(out, a, b, c, d, t) {
    Quat.slerp(qt_1, a, d, t);
    Quat.slerp(qt_2, b, c, t);
    Quat.slerp(out, qt_1, qt_2, 2 * t * (1 - t));
    return out;
  }
  /**
   * @en Sets the inverse of the given quaternion to out quaternion
   * @zh 四元数求逆
   */


  static invert(out, a) {
    const dot = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    const invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out.x = -a.x * invDot;
    out.y = -a.y * invDot;
    out.z = -a.z * invDot;
    out.w = a.w * invDot;
    return out;
  }
  /**
   * @en Conjugating a quaternion, it's equivalent to the inverse of the unit quaternion, but more efficient
   * @zh 求共轭四元数，对单位四元数与求逆等价，但更高效
   */


  static conjugate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = a.w;
    return out;
  }
  /**
   * @en Calculates the length of the quaternion
   * @zh 求四元数长度
   */


  static len(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  }
  /**
   * @en Calculates the squared length of the quaternion
   * @zh 求四元数长度平方
   */


  static lengthSqr(a) {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  }
  /**
   * @en Normalize the given quaternion
   * @zh 归一化四元数
   */


  static normalize(out, a) {
    let len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = a.x * len;
      out.y = a.y * len;
      out.z = a.z * len;
      out.w = a.w * len;
    }

    return out;
  }
  /**
   * @en Calculated the quaternion represents the given coordinates, considering all given vectors are normalized and mutually perpendicular
   * @zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
   */


  static fromAxes(out, xAxis, yAxis, zAxis) {
    _mat.Mat3.set(m3_1, xAxis.x, xAxis.y, xAxis.z, yAxis.x, yAxis.y, yAxis.z, zAxis.x, zAxis.y, zAxis.z);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * @en Calculates the quaternion with the up direction and the direction of the viewport
   * @zh 根据视口的前方向和上方向计算四元数
   * @param view The view direction, it`s must be normalized.
   * @param up The view up direction, it`s must be normalized, default value is (0, 1, 0).
   */


  static fromViewUp(out, view, up) {
    _mat.Mat3.fromViewUp(m3_1, view, up);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * @en Calculates the quaternion from a given rotary shaft and a radian rotation around it.
   * @zh 根据旋转轴和旋转弧度计算四元数
   */


  static fromAxisAngle(out, axis, rad) {
    rad *= 0.5;
    const s = Math.sin(rad);
    out.x = s * axis.x;
    out.y = s * axis.y;
    out.z = s * axis.z;
    out.w = Math.cos(rad);
    return out;
  }
  /**
   * @en Calculates the quaternion with the three-dimensional transform matrix, considering no scale included in the matrix
   * @zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
   */


  static fromMat3(out, m) {
    const {
      m00,
      m03: m01,
      m06: m02,
      m01: m10,
      m04: m11,
      m07: m12,
      m02: m20,
      m05: m21,
      m08: m22
    } = m;
    const trace = m00 + m11 + m22;

    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1.0);
      out.w = 0.25 / s;
      out.x = (m21 - m12) * s;
      out.y = (m02 - m20) * s;
      out.z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
      const s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);
      out.w = (m21 - m12) / s;
      out.x = 0.25 * s;
      out.y = (m01 + m10) / s;
      out.z = (m02 + m20) / s;
    } else if (m11 > m22) {
      const s = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);
      out.w = (m02 - m20) / s;
      out.x = (m01 + m10) / s;
      out.y = 0.25 * s;
      out.z = (m12 + m21) / s;
    } else {
      const s = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);
      out.w = (m10 - m01) / s;
      out.x = (m02 + m20) / s;
      out.y = (m12 + m21) / s;
      out.z = 0.25 * s;
    }

    return out;
  }
  /**
   * @en Calculates the quaternion with Euler angles, the rotation order is YZX
   * @zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
   */


  static fromEuler(out, x, y, z) {
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    const sx = Math.sin(x);
    const cx = Math.cos(x);
    const sy = Math.sin(y);
    const cy = Math.cos(y);
    const sz = Math.sin(z);
    const cz = Math.cos(z);
    out.x = sx * cy * cz + cx * sy * sz;
    out.y = cx * sy * cz + sx * cy * sz;
    out.z = cx * cy * sz - sx * sy * cz;
    out.w = cx * cy * cz - sx * sy * sz;
    return out;
  }
  /**
   * @en Calculates the quaternion with given 2D angle (0, 0, z).
   * @zh 根据 2D 角度（0, 0, z）计算四元数
   *
   * @param out Output quaternion
   * @param z Angle to rotate around Z axis in degrees.
   */


  static fromAngleZ(out, z) {
    z *= halfToRad;
    out.x = out.y = 0;
    out.z = Math.sin(z);
    out.w = Math.cos(z);
    return out;
  }
  /**
   * @en This returns the X-axis vector of the quaternion
   * @zh 返回定义此四元数的坐标系 X 轴向量
   */


  static toAxisX(out, q) {
    const fy = 2.0 * q.y;
    const fz = 2.0 * q.z;
    out.x = 1.0 - fy * q.y - fz * q.z;
    out.y = fy * q.x + fz * q.w;
    out.z = fz * q.x + fy * q.w;
    return out;
  }
  /**
   * @en This returns the Y-axis vector of the quaternion
   * @zh 返回定义此四元数的坐标系 Y 轴向量
   */


  static toAxisY(out, q) {
    const fx = 2.0 * q.x;
    const fy = 2.0 * q.y;
    const fz = 2.0 * q.z;
    out.x = fy * q.x - fz * q.w;
    out.y = 1.0 - fx * q.x - fz * q.z;
    out.z = fz * q.y + fx * q.w;
    return out;
  }
  /**
   * @en This returns the Z-axis vector of the quaternion
   * @zh 返回定义此四元数的坐标系 Z 轴向量
   */


  static toAxisZ(out, q) {
    const fx = 2.0 * q.x;
    const fy = 2.0 * q.y;
    const fz = 2.0 * q.z;
    out.x = fz * q.x - fy * q.w;
    out.y = fz * q.y - fx * q.w;
    out.z = 1.0 - fx * q.x - fy * q.y;
    return out;
  }
  /**
   * @en Converts the quaternion to angles, result angle x, y in the range of [-180, 180], z in the range of [-90, 90] interval, the rotation order is YZX
   * @zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
   * @param outerZ change z value range to [-180, -90] U [90, 180]
   */


  static toEuler(out, q, outerZ) {
    const {
      x,
      y,
      z,
      w
    } = q;
    let bank = 0;
    let heading = 0;
    let attitude = 0;
    const test = x * y + z * w;

    if (test > 0.499999) {
      bank = 0; // default to zero

      heading = (0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = 90;
    } else if (test < -0.499999) {
      bank = 0; // default to zero

      heading = -(0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = -90;
    } else {
      const sqx = x * x;
      const sqy = y * y;
      const sqz = z * z;
      bank = (0, _utils.toDegree)(Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz));
      heading = (0, _utils.toDegree)(Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz));
      attitude = (0, _utils.toDegree)(Math.asin(2 * test));

      if (outerZ) {
        bank = -180 * Math.sign(bank + 1e-6) + bank;
        heading = -180 * Math.sign(heading + 1e-6) + heading;
        attitude = 180 * Math.sign(attitude + 1e-6) - attitude;
      }
    }

    out.x = bank;
    out.y = heading;
    out.z = attitude;
    return out;
  }
  /**
   * @en Converts quaternion to an array
   * @zh 四元数转数组
   * @param ofs Array Start Offset
   */


  static toArray(out, q, ofs = 0) {
    out[ofs + 0] = q.x;
    out[ofs + 1] = q.y;
    out[ofs + 2] = q.z;
    out[ofs + 3] = q.w;
    return out;
  }
  /**
   * @en Array to a quaternion
   * @zh 数组转四元数
   * @param ofs Array Start Offset
   */


  static fromArray(out, arr, ofs = 0) {
    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    out.w = arr[ofs + 3];
    return out;
  }
  /**
   * @en Check whether two quaternions are equal
   * @zh 四元数等价判断
   */


  static strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * @en Check whether two quaternions are approximately equal
   * @zh 排除浮点数误差的四元数近似等价判断
   */


  static equals(a, b, epsilon = _utils.EPSILON) {
    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * @en x component.
   * @zh x 分量。
   */


  constructor(x, y, z, w) {
    super();

    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w !== null && w !== void 0 ? w : 1;
    }
  }
  /**
   * @en clone the current Quat
   * @zh 克隆当前四元数。
   */


  clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }
  /**
   * @en Set values with another quaternion
   * @zh 设置当前四元数使其与指定四元数相等。
   * @param other Specified quaternion
   * @returns `this`
   */


  set(x, y, z, w) {
    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w !== null && w !== void 0 ? w : 1;
    }

    return this;
  }
  /**
   * @en Check whether the quaternion approximately equals another one
   * @zh 判断当前四元数是否在误差范围内与指定向量相等。
   * @param other Comparative quaternion
   * @param epsilon The error allowed. It`s should be a non-negative number.
   * @returns Returns `true' when the components of the two quaternions are equal within the specified error range; otherwise, returns `false'.
   */


  equals(other, epsilon = _utils.EPSILON) {
    return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)) && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w));
  }
  /**
   * @en Check whether the current quaternion strictly equals other quaternion
   * @zh 判断当前四元数是否与指定四元数相等。
   * @param other Comparative quaternion
   * @returns Returns `true' when the components of the two quaternions are equal within the specified error range; otherwise, returns `false'.
   */


  strictEquals(other) {
    return other && this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * @en Convert quaternion to Euler angles
   * @zh 将当前四元数转化为欧拉角（x-y-z）并赋值给出口向量。
   * @param out the output vector
   */


  getEulerAngles(out) {
    return Quat.toEuler(out, this);
  }
  /**
   * @en Calculate the linear interpolation result between this quaternion and another one with given ratio
   * @zh 根据指定的插值比率，从当前四元数到目标四元数之间做线性插值。
   * @param to The target quaternion
   * @param ratio The interpolation coefficient. The range is [0,1].
   */


  lerp(to, ratio) {
    this.x += ratio * (to.x - this.x);
    this.y += ratio * (to.y - this.y);
    this.z += ratio * (to.z - this.z);
    this.w += ratio * (to.w - this.w);
    return this;
  }
  /**
   * @en Calculates the spherical interpolation result between this quaternion and another one with the given ratio
   * @zh 根据指定的插值比率，从当前四元数到目标四元数之间做球面插值。
   * @param to The target quaternion
   * @param ratio The interpolation coefficient. The range is [0,1].
   */


  slerp(to, ratio) {
    return Quat.slerp(this, this, to, ratio);
  }
  /**
   * @en Calculates the length of the quaternion
   * @zh 求四元数长度
   */


  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * @en Calculates the squared length of the quaternion
   * @zh 求四元数长度平方
   */


  lengthSqr() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

}

exports.Quat = Quat;
Quat.IDENTITY = Object.freeze(new Quat());
const qt_1 = new Quat();
const qt_2 = new Quat();
const v3_1 = new _vec.Vec3();
const m3_1 = new _mat.Mat3();
const halfToRad = 0.5 * Math.PI / 180.0;

_class.CCClass.fastDefine('cc.Quat', Quat, {
  x: 0,
  y: 0,
  z: 0,
  w: 1
});

_globalExports.legacyCC.Quat = Quat;

function quat(x = 0, y = 0, z = 0, w = 1) {
  return new Quat(x, y, z, w);
}

_globalExports.legacyCC.quat = quat;