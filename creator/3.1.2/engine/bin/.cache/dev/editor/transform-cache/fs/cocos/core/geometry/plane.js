"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = void 0;

var _index = require("../math/index.js");

var _enums = _interopRequireDefault(require("./enums.js"));

var _globalExports = require("../global-exports.js");

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
const v1 = new _index.Vec3(0, 0, 0);
const v2 = new _index.Vec3(0, 0, 0);

const temp_mat = _globalExports.legacyCC.mat4();

const temp_vec4 = _globalExports.legacyCC.v4();
/**
 * @en
 * Basic Geometry: Plane.
 * @zh
 * 基础几何 Plane。
 */


class Plane {
  /**
   * @en
   * create a new plane
   * @zh
   * 创建一个新的 plane。
   * @param nx 法向分量的 x 部分。
   * @param ny 法向分量的 y 部分。
   * @param nz 法向分量的 z 部分。
   * @param d 与原点的距离。
   * @return
   */
  static create(nx, ny, nz, d) {
    return new Plane(nx, ny, nz, d);
  }
  /**
   * @en
   * clone a new plane
   * @zh
   * 克隆一个新的 plane。
   * @param p 克隆的来源。
   * @return 克隆出的对象。
   */


  static clone(p) {
    return new Plane(p.n.x, p.n.y, p.n.z, p.d);
  }
  /**
   * @en
   * copy the values from one plane to another
   * @zh
   * 复制一个平面的值到另一个。
   * @param out 接受操作的对象。
   * @param p 复制的来源。
   * @return 接受操作的对象。
   */


  static copy(out, p) {
    _index.Vec3.copy(out.n, p.n);

    out.d = p.d;
    return out;
  }
  /**
   * @en
   * create a plane from three points
   * @zh
   * 用三个点创建一个平面。
   * @param out 接受操作的对象。
   * @param a 点 a。
   * @param b 点 b。
   * @param c 点 c。
   * @return out 接受操作的对象。
   */


  static fromPoints(out, a, b, c) {
    _index.Vec3.subtract(v1, b, a);

    _index.Vec3.subtract(v2, c, a);

    _index.Vec3.normalize(out.n, _index.Vec3.cross(out.n, v1, v2));

    out.d = _index.Vec3.dot(out.n, a);
    return out;
  }
  /**
   * @en
   * Set the components of a plane to the given values
   * @zh
   * 将给定平面的属性设置为给定值。
   * @param out 接受操作的对象。
   * @param nx 法向分量的 x 部分。
   * @param ny 法向分量的 y 部分。
   * @param nz 法向分量的 z 部分。
   * @param d 与原点的距离。
   * @return out 接受操作的对象。
   */


  static set(out, nx, ny, nz, d) {
    out.n.x = nx;
    out.n.y = ny;
    out.n.z = nz;
    out.d = d;
    return out;
  }
  /**
   * @en
   * create plane from normal and point
   * @zh
   * 用一条法线和一个点创建平面。
   * @param out 接受操作的对象。
   * @param normal 平面的法线。
   * @param point 平面上的一点。
   * @return out 接受操作的对象。
   */


  static fromNormalAndPoint(out, normal, point) {
    _index.Vec3.copy(out.n, normal);

    out.d = _index.Vec3.dot(normal, point);
    return out;
  }
  /**
   * @en
   * normalize a plane
   * @zh
   * 归一化一个平面。
   * @param out 接受操作的对象。
   * @param a 操作的源数据。
   * @return out 接受操作的对象。
   */


  static normalize(out, a) {
    const len = a.n.length();

    _index.Vec3.normalize(out.n, a.n);

    if (len > 0) {
      out.d = a.d / len;
    }

    return out;
  }
  /**
   * @en
   * The normal of the plane.
   * @zh
   * 法线向量。
   */


  /**
   * @en
   * Gets the type of the shape.
   * @zh
   * 获取形状的类型。
   */
  get type() {
    return this._type;
  } // compatibility with vector interfaces


  set x(val) {
    this.n.x = val;
  }

  get x() {
    return this.n.x;
  }

  set y(val) {
    this.n.y = val;
  }

  get y() {
    return this.n.y;
  }

  set z(val) {
    this.n.z = val;
  }

  get z() {
    return this.n.z;
  }

  set w(val) {
    this.d = val;
  }

  get w() {
    return this.d;
  }

  /**
   * @en
   * Construct a plane.
   * @zh
   * 构造一个平面。
   * @param nx 法向分量的 x 部分。
   * @param ny 法向分量的 y 部分。
   * @param nz 法向分量的 z 部分。
   * @param d 与原点的距离。
   */
  constructor(nx = 0, ny = 1, nz = 0, d = 0) {
    this.n = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums.default.SHAPE_PLANE;
    this.n = new _index.Vec3(nx, ny, nz);
    this.d = d;
  }
  /**
   * @en
   * transform this plane.
   * @zh
   * 变换一个平面。
   * @param mat
   */


  transform(mat) {
    _index.Mat4.invert(temp_mat, mat);

    _index.Mat4.transpose(temp_mat, temp_mat);

    _index.Vec4.set(temp_vec4, this.n.x, this.n.y, this.n.z, this.d);

    _index.Vec4.transformMat4(temp_vec4, temp_vec4, temp_mat);

    _index.Vec3.set(this.n, temp_vec4.x, temp_vec4.y, temp_vec4.z);

    this.d = temp_vec4.w;
  }

}

exports.Plane = Plane;