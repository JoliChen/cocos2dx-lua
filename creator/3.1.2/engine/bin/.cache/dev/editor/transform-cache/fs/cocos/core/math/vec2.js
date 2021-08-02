"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.v2 = v2;
exports.Vec2 = void 0;

var _class = require("../data/class.js");

var _valueType = require("../value-types/value-type.js");

var _utils = require("./utils.js");

var _globalExports = require("../global-exports.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @en Representation of 2D vectors and points.
 * @zh 二维向量。
 */
class Vec2 extends _valueType.ValueType {
  /**
   * @en Obtains a clone of the given vector object
   * @zh 获得指定向量的拷贝
   */
  static clone(a) {
    return new Vec2(a.x, a.y);
  }
  /**
   * @en Copy the target vector and save the results to out vector object
   * @zh 复制目标向量
   */


  static copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    return out;
  }
  /**
   * @en Sets the out vector with the given x and y values
   * @zh 设置向量值
   */


  static set(out, x, y) {
    out.x = x;
    out.y = y;
    return out;
  }
  /**
   * @en Element-wise vector addition and save the results to out vector object
   * @zh 逐元素向量加法
   */


  static add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }
  /**
   * @en Element-wise vector subtraction and save the results to out vector object
   * @zh 逐元素向量减法
   */


  static subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }
  /**
   * @en Element-wise vector multiplication and save the results to out vector object
   * @zh 逐元素向量乘法
   */


  static multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    return out;
  }
  /**
   * @en Element-wise vector division and save the results to out vector object
   * @zh 逐元素向量除法
   */


  static divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    return out;
  }
  /**
   * @en Rounds up by elements of the vector and save the results to out vector object
   * @zh 逐元素向量向上取整
   */


  static ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    return out;
  }
  /**
   * @en Element-wise rounds down of the current vector and save the results to the out vector
   * @zh 逐元素向量向下取整
   */


  static floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    return out;
  }
  /**
   * @en Calculates element-wise minimum values and save to the out vector
   * @zh 逐元素向量最小值
   */


  static min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    return out;
  }
  /**
   * @en Calculates element-wise maximum values and save to the out vector
   * @zh 逐元素向量最大值
   */


  static max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    return out;
  }
  /**
   * @en Calculates element-wise round results and save to the out vector
   * @zh 逐元素向量四舍五入取整
   */


  static round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    return out;
  }
  /**
   * @en Vector scalar multiplication and save the results to out vector object
   * @zh 向量标量乘法
   */


  static multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    return out;
  }
  /**
   * @en Element-wise multiplication and addition with the equation: a + b * scale
   * @zh 逐元素向量乘加: A + B * scale
   */


  static scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    return out;
  }
  /**
   * @en Calculates the euclidean distance of two vectors
   * @zh 求两向量的欧氏距离
   */


  static distance(a, b) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
  }
  /**
   * @en Calculates the squared euclidean distance of two vectors
   * @zh 求两向量的欧氏距离平方
   */


  static squaredDistance(a, b) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return x * x + y * y;
  }
  /**
   * @en Calculates the length of the vector
   * @zh 求向量长度
   */


  static len(a) {
    const x = a.x;
    const y = a.y;
    return Math.sqrt(x * x + y * y);
  }
  /**
   * @en Calculates the squared length of the vector
   * @zh 求向量长度平方
   */


  static lengthSqr(a) {
    const x = a.x;
    const y = a.y;
    return x * x + y * y;
  }
  /**
   * @en Sets each element to its negative value
   * @zh 逐元素向量取负
   */


  static negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    return out;
  }
  /**
   * @en Sets each element to its inverse value, zero value will become Infinity
   * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
   */


  static inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    return out;
  }
  /**
   * @en Sets each element to its inverse value, zero value will remain zero
   * @zh 逐元素向量取倒数，接近 0 时返回 0
   */


  static inverseSafe(out, a) {
    const x = a.x;
    const y = a.y;

    if (Math.abs(x) < _utils.EPSILON) {
      out.x = 0;
    } else {
      out.x = 1.0 / x;
    }

    if (Math.abs(y) < _utils.EPSILON) {
      out.y = 0;
    } else {
      out.y = 1.0 / y;
    }

    return out;
  }
  /**
   * @en Sets the normalized vector to the out vector
   * @zh 归一化向量
   */


  static normalize(out, a) {
    const x = a.x;
    const y = a.y;
    let len = x * x + y * y;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = x * len;
      out.y = y * len;
    }

    return out;
  }
  /**
   * @en Calculates the dot product of the vector
   * @zh 向量点积（数量积）
   */


  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  /**
   * @en Calculates the cross product of the vector
   * @zh 向量叉积（向量积），注意二维向量的叉积为与 Z 轴平行的三维向量
   */


  static cross(out, a, b) {
    out.x = out.y = 0;
    out.z = a.x * b.y - a.y * b.x;
    return out;
  }
  /**
   * @en Calculates the linear interpolation between two vectors with a given ratio
   * @zh 逐元素向量线性插值： A + t * (B - A)
   */


  static lerp(out, a, b, t) {
    const x = a.x;
    const y = a.y;
    out.x = x + t * (b.x - x);
    out.y = y + t * (b.y - y);
    return out;
  }
  /**
   * @en Generates a uniformly distributed random vector points from center to the surface of the unit sphere
   * @zh 生成一个在单位圆上均匀分布的随机向量
   * @param scale vector length
   */


  static random(out, scale) {
    scale = scale || 1.0;
    const r = (0, _utils.random)() * 2.0 * Math.PI;
    out.x = Math.cos(r) * scale;
    out.y = Math.sin(r) * scale;
    return out;
  }
  /**
   * @en Vector and third order matrix multiplication, will complete the vector with a third value as one
   * @zh 向量与三维矩阵乘法，默认向量第三位为 1。
   */


  static transformMat3(out, a, m) {
    const x = a.x;
    const y = a.y;
    out.x = m.m00 * x + m.m03 * y + m.m06;
    out.y = m.m01 * x + m.m04 * y + m.m07;
    return out;
  }
  /**
   * @en Vector and third order matrix multiplication, will complete the vector with a third and a fourth element as one
   * @zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
   */


  static transformMat4(out, a, m) {
    const x = a.x;
    const y = a.y;
    out.x = m.m00 * x + m.m04 * y + m.m12;
    out.y = m.m01 * x + m.m05 * y + m.m13;
    return out;
  }
  /**
   * @en Gets the string representation of the given vector
   * @zh 返回向量的字符串表示
   */


  static str(a) {
    return `Vec2(${a.x}, ${a.y})`;
  }
  /**
   * @en Converts the given vector to an array
   * @zh 向量转数组
   * @param ofs Array Start Offset
   */


  static toArray(out, v, ofs = 0) {
    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    return out;
  }
  /**
   * @en Converts the given array to a vector
   * @zh 数组转向量
   * @param ofs Array Start Offset
   */


  static fromArray(out, arr, ofs = 0) {
    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    return out;
  }
  /**
   * @en Check the equality of the two given vectors
   * @zh 向量等价判断
   */


  static strictEquals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  /**
   * @en Check whether the two given vectors are approximately equivalent
   * @zh 排除浮点数误差的向量近似等价判断
   */


  static equals(a, b, epsilon = _utils.EPSILON) {
    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y));
  }
  /**
   * @en Calculates the radian angle between two vectors
   * @zh 求两向量夹角弧度
   */


  static angle(a, b) {
    Vec2.normalize(v2_1, a);
    Vec2.normalize(v2_2, b);
    const cosine = Vec2.dot(v2_1, v2_2);

    if (cosine > 1.0) {
      return 0;
    }

    if (cosine < -1.0) {
      return Math.PI;
    }

    return Math.acos(cosine);
  }
  /**
   * @en x component.
   * @zh x 分量。
   */


  constructor(x, y) {
    super();

    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }
  }
  /**
   * @en clone a Vec2 value
   * @zh 克隆当前向量。
   */


  clone() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @en Set the current vector value with the given vector.
   * @zh 设置当前向量使其与指定向量相等。
   * @param other Specified vector
   * @return `this`
   */


  set(x, y) {
    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x || 0;
      this.y = y || 0;
    }

    return this;
  }
  /**
   * @en Check whether the vector approximately equals another one.
   * @zh 判断当前向量是否在误差范围内与指定向量相等。
   * @param other Specified vector
   * @param epsilon The error allowed. It`s should be a non-negative number.
   * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  equals(other, epsilon = _utils.EPSILON) {
    return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y));
  }
  /**
   * @en Check whether the vector approximately equals another one.
   * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @param epsilon The error allowed. It`s should be a non-negative number.
   * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  equals2f(x, y, epsilon = _utils.EPSILON) {
    return Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y));
  }
  /**
   * @en Check whether the current vector strictly equals another Vec2.
   * @zh 判断当前向量是否与指定向量相等。
   * @param other specified vector
   * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  strictEquals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
  /**
   * @en Check whether the current vector strictly equals another Vec2.
   * @zh 判断当前向量是否与指定分量的向量相等。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   * @return Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
   */


  strictEquals2f(x, y) {
    return this.x === x && this.y === y;
  }
  /**
   * @en Transform to string with vector information.
   * @zh 返回当前向量的字符串表示。
   * @returns The string with vector information
   */


  toString() {
    return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
  /**
   * @en Calculate linear interpolation result between this vector and another one with given ratio.
   * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
   * @param to Target vector
   * @param ratio The interpolation coefficient.The range is [0,1].
   */


  lerp(to, ratio) {
    const x = this.x;
    const y = this.y;
    this.x = x + ratio * (to.x - x);
    this.y = y + ratio * (to.y - y);
    return this;
  }
  /**
   * @en Clamp the vector between minInclusive and maxInclusive.
   * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
   * @param minInclusive Minimum value allowed
   * @param maxInclusive Maximum value allowed
   * @return `this`
   */


  clampf(minInclusive, maxInclusive) {
    this.x = (0, _utils.clamp)(this.x, minInclusive.x, maxInclusive.x);
    this.y = (0, _utils.clamp)(this.y, minInclusive.y, maxInclusive.y);
    return this;
  }
  /**
   * @en Adds the current vector with another one and return this
   * @zh 向量加法。将当前向量与指定向量的相加
   * @param other specified vector
   */


  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  /**
   * @en Adds the current vector with another one and return this
   * @zh 向量加法。将当前向量与指定分量的向量相加
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   */


  add2f(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }
  /**
   * @en Subtracts one vector from this, and returns this.
   * @zh 向量减法。将当前向量减去指定向量
   * @param other specified vector
   */


  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  /**
   * @en Subtracts one vector from this, and returns this.
   * @zh 向量减法。将当前向量减去指定分量的向量
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   */


  subtract2f(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }
  /**
   * @en Multiplies the current vector with a number, and returns this.
   * @zh 向量数乘。将当前向量数乘指定标量
   * @param scalar scalar number
   */


  multiplyScalar(scalar) {
    if (typeof scalar === 'object') {
      console.warn('should use Vec2.multiply for vector * vector operation');
    }

    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * @en Multiplies the current vector with another one and return this
   * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
   * @param other specified vector
   */


  multiply(other) {
    if (typeof other !== 'object') {
      console.warn('should use Vec2.scale for vector * scalar operation');
    }

    this.x *= other.x;
    this.y *= other.y;
    return this;
  }
  /**
   * @en Multiplies the current vector with another one and return this
   * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   */


  multiply2f(x, y) {
    this.x *= x;
    this.y *= y;
    return this;
  }
  /**
   * @en Element-wisely divides this vector with another one, and return this.
   * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
   * @param other specified vector
   */


  divide(other) {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }
  /**
   * @en Element-wisely divides this vector with another one, and return this.
   * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
   * @param x The x value of specified vector
   * @param y The y value of specified vector
   */


  divide2f(x, y) {
    this.x /= x;
    this.y /= y;
    return this;
  }
  /**
   * @en Sets each component of this vector with its negative value
   * @zh 将当前向量的各个分量取反
   */


  negative() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * @en Calculates the dot product with another vector
   * @zh 向量点乘。
   * @param other specified vector
   * @return The result of calculates the dot product with another vector
   */


  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  /**
   * @en Calculates the cross product with another vector.
   * @zh 向量叉乘。
   * @param other specified vector
   * @return `out`
   */


  cross(other) {
    return this.x * other.y - this.y * other.x;
  }
  /**
   * @en Returns the length of this vector.
   * @zh 计算向量的长度（模）。
   * @return Length of vector
   */


  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * @en Returns the squared length of this vector.
   * @zh 计算向量长度（模）的平方。
   * @return the squared length of this vector
   */


  lengthSqr() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * @en Normalize the current vector.
   * @zh 将当前向量归一化。
   */


  normalize() {
    const x = this.x;
    const y = this.y;
    let len = x * x + y * y;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      this.x *= len;
      this.y *= len;
    }

    return this;
  }
  /**
   * @en Calculates radian angle between two vectors
   * @zh 获取当前向量和指定向量之间的角度。
   * @param other specified vector
   * @return The angle between the current vector and the specified vector (in radians); if there are zero vectors in the current vector and the specified vector, 0 is returned.
   */


  angle(other) {
    const magSqr1 = this.lengthSqr();
    const magSqr2 = other.lengthSqr();

    if (magSqr1 === 0 || magSqr2 === 0) {
      console.warn('Can\'t get angle between zero vector');
      return 0.0;
    }

    const dot = this.dot(other);
    let theta = dot / Math.sqrt(magSqr1 * magSqr2);
    theta = (0, _utils.clamp)(theta, -1.0, 1.0);
    return Math.acos(theta);
  }
  /**
   * @en Get angle in radian between this and vector with direction.
   * @zh 获取当前向量和指定向量之间的有符号角度。<br/>
   * 有符号角度的取值范围为 (-180, 180]，当前向量可以通过逆时针旋转有符号角度与指定向量同向。<br/>
   * @param other specified vector
   * @return The signed angle between the current vector and the specified vector (in radians); if there is a zero vector in the current vector and the specified vector, 0 is returned.
   */


  signAngle(other) {
    const angle = this.angle(other);
    return this.cross(other) < 0 ? -angle : angle;
  }
  /**
   * @en Rotates the current vector by an angle in radian value
   * @zh 将当前向量的旋转
   * @param radians radius of rotation
   */


  rotate(radians) {
    const x = this.x;
    const y = this.y;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    this.x = cos * x - sin * y;
    this.y = sin * x + cos * y;
    return this;
  }
  /**
   * @en Projects the current vector on another one
   * @zh 计算当前向量在指定向量上的投影向量。
   * @param other specified vector
   */


  project(other) {
    const scalar = this.dot(other) / other.dot(other);
    this.x = other.x * scalar;
    this.y = other.y * scalar;
    return this;
  }
  /**
   * @en Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
   * @zh 将当前向量视为 z 分量为 0、w 分量为 1 的四维向量，<br/>
   * 应用四维矩阵变换到当前矩阵<br/>
   * @param matrix matrix to transform with
   */


  transformMat4(matrix) {
    const x = this.x;
    const y = this.y;
    this.x = matrix.m00 * x + matrix.m04 * y + matrix.m12;
    this.y = matrix.m01 * x + matrix.m05 * y + matrix.m13;
    return this;
  }

}

exports.Vec2 = Vec2;
Vec2.ZERO = Object.freeze(new Vec2(0, 0));
Vec2.ONE = Object.freeze(new Vec2(1, 1));
Vec2.NEG_ONE = Object.freeze(new Vec2(-1, -1));
Vec2.UNIT_X = Object.freeze(new Vec2(1, 0));
Vec2.UNIT_Y = Object.freeze(new Vec2(0, 1));
const v2_1 = new Vec2();
const v2_2 = new Vec2();

_class.CCClass.fastDefine('cc.Vec2', Vec2, {
  x: 0,
  y: 0
});

_globalExports.legacyCC.Vec2 = Vec2;

function v2(x, y) {
  return new Vec2(x, y);
}

_globalExports.legacyCC.v2 = v2;