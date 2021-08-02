"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sphere = void 0;

var _index = require("../math/index.js");

var _enums = _interopRequireDefault(require("./enums.js"));

var _memoryPools = require("../renderer/core/memory-pools.js");

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

const _offset = new _index.Vec3();

const _min = new _index.Vec3();

const _max = new _index.Vec3();

function maxComponent(v) {
  return Math.max(Math.max(v.x, v.y), v.z);
}
/**
 * @en
 * Basic Geometry: Sphere.
 * @zh
 * 基础几何 轴对齐球。
 */


class Sphere {
  /**
   * @en
   * create a new sphere
   * @zh
   * 创建一个新的 sphere 实例。
   * @param cx 形状的相对于原点的 X 坐标。
   * @param cy 形状的相对于原点的 Y 坐标。
   * @param cz 形状的相对于原点的 Z 坐标。
   * @param r 球体的半径
   * @return {Sphere} 返回一个 sphere。
   */
  static create(cx, cy, cz, r) {
    return new Sphere(cx, cy, cz, r);
  }
  /**
   * @en
   * clone a new sphere
   * @zh
   * 克隆一个新的 sphere 实例。
   * @param {Sphere} p 克隆的目标。
   * @return {Sphere} 克隆出的示例。
   */


  static clone(p) {
    return new Sphere(p.center.x, p.center.y, p.center.z, p.radius);
  }
  /**
   * @en
   * copy the values from one sphere to another
   * @zh
   * 将从一个 sphere 的值复制到另一个 sphere。
   * @param {Sphere} out 接受操作的 sphere。
   * @param {Sphere} a 被复制的 sphere。
   * @return {Sphere} out 接受操作的 sphere。
   */


  static copy(out, p) {
    _index.Vec3.copy(out.center, p.center);

    out.radius = p.radius;
    return out;
  }
  /**
   * @en
   * create a new bounding sphere from two corner points
   * @zh
   * 从两个点创建一个新的 sphere。
   * @param out - 接受操作的 sphere。
   * @param minPos - sphere 的最小点。
   * @param maxPos - sphere 的最大点。
   * @returns {Sphere} out 接受操作的 sphere。
   */


  static fromPoints(out, minPos, maxPos) {
    _index.Vec3.multiplyScalar(out.center, _index.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    out.radius = _index.Vec3.subtract(_v3_tmp, maxPos, minPos).length() * 0.5;
    return out;
  }
  /**
   * @en
   * Set the components of a sphere to the given values
   * @zh
   * 将球体的属性设置为给定的值。
   * @param {Sphere} out 接受操作的 sphere。
   * @param cx 形状的相对于原点的 X 坐标。
   * @param cy 形状的相对于原点的 Y 坐标。
   * @param cz 形状的相对于原点的 Z 坐标。
   * @param {number} r 半径。
   * @return {Sphere} out 接受操作的 sphere。
   * @function
   */


  static set(out, cx, cy, cz, r) {
    out.center.x = cx;
    out.center.y = cy;
    out.center.z = cz;
    out.radius = r;
    return out;
  }
  /**
   * @zh
   * 球跟点合并
   */


  static mergePoint(out, s, point) {
    // if sphere.radius Less than 0,
    // Set this point as anchor,
    // And set radius to 0.
    if (s.radius < 0.0) {
      out.center.set(point);
      out.radius = 0.0;
      return out;
    }

    _index.Vec3.subtract(_offset, point, s.center);

    const dist = _offset.length();

    if (dist > s.radius) {
      const half = (dist - s.radius) * 0.5;
      out.radius += half;

      _index.Vec3.multiplyScalar(_offset, _offset, half / dist);

      _index.Vec3.add(out.center, out.center, _offset);
    }

    return out;
  }
  /**
   * @zh
   * 球跟立方体合并
   */


  static mergeAABB(out, s, a) {
    a.getBoundary(_min, _max);
    Sphere.mergePoint(out, s, _min);
    Sphere.mergePoint(out, s, _max);
    return out;
  }
  /**
   * @en
   * The center of this sphere.
   * @zh
   * 本地坐标的中心点。
   */


  get center() {
    return this._center;
  }

  set center(val) {
    this._center = val;

    _memoryPools.SpherePool.setVec3(this._poolHandle, _memoryPools.SphereView.CENTER, this._center);
  }
  /**
    * @en
    * The radius of this sphere.
    * @zh
    * 半径。
    */


  get radius() {
    return _memoryPools.SpherePool.get(this._poolHandle, _memoryPools.SphereView.RADIUS);
  }

  set radius(val) {
    _memoryPools.SpherePool.set(this._poolHandle, _memoryPools.SphereView.RADIUS, val);
  }

  get handle() {
    return this._poolHandle;
  }
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
   * Construct a sphere.
   * @zh
   * 构造一个球。
   * @param cx 该球的世界坐标的 X 坐标。
   * @param cy 该球的世界坐标的 Y 坐标。
   * @param cz 该球的世界坐标的 Z 坐标。
   * @param {number} r 半径。
   */
  constructor(cx = 0, cy = 0, cz = 0, r = 1) {
    this._center = new _index.Vec3(0, 0, 0);
    this._poolHandle = _memoryPools.NULL_HANDLE;
    this._type = void 0;
    this._type = _enums.default.SHAPE_SPHERE;
    this._center = new _index.Vec3(cx, cy, cz);
    this._poolHandle = _memoryPools.SpherePool.alloc();

    _memoryPools.SpherePool.setVec3(this._poolHandle, _memoryPools.SphereView.CENTER, this._center);

    _memoryPools.SpherePool.set(this._poolHandle, _memoryPools.SphereView.RADIUS, r);
  }

  destroy() {
    if (this._poolHandle) {
      _memoryPools.SpherePool.free(this._poolHandle);

      this._poolHandle = _memoryPools.NULL_HANDLE;
    }
  }
  /**
   * @en
   * Get a clone.
   * @zh
   * 获得克隆。
   */


  clone() {
    return Sphere.clone(this);
  }
  /**
   * @en
   * Copy a sphere.
   * @zh
   * 拷贝对象。
   * @param a 拷贝的目标。
   */


  copy(a) {
    return Sphere.copy(this, a);
  }
  /**
   * @en
   * Get the bounding points of this shape
   * @zh
   * 获取此形状的边界点。
   * @param {Vec3} minPos 最小点。
   * @param {Vec3} maxPos 最大点。
   */


  getBoundary(minPos, maxPos) {
    _index.Vec3.set(minPos, this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius);

    _index.Vec3.set(maxPos, this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius);
  }
  /**
   * @en
   * Transform this shape
   * @zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @param m 变换的矩阵。
   * @param pos 变换的位置部分。
   * @param rot 变换的旋转部分。
   * @param scale 变换的缩放部分。
   * @param out 变换的目标。
   */


  transform(m, pos, rot, scale, out) {
    _index.Vec3.transformMat4(out.center, this.center, m);

    out.radius = this.radius * maxComponent(scale);
  }
  /**
   * @en
   * Translate and rotate this sphere.
   * @zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @param m 变换的矩阵。
   * @param rot 变换的旋转部分。
   * @param out 变换的目标。
   */


  translateAndRotate(m, rot, out) {
    _index.Vec3.transformMat4(out.center, this.center, m);
  }
  /**
   * @en
   * Scaling this sphere.
   * @zh
   * 将 out 根据这个 sphere 的数据进行缩放。
   * @param scale 缩放值。
   * @param out 缩放的目标。
   */


  setScale(scale, out) {
    out.radius = this.radius * maxComponent(scale);
  }

}

exports.Sphere = Sphere;