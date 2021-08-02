"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordFrustumToSharedMemory = recordFrustumToSharedMemory;
exports.Frustum = void 0;

var _index = require("../math/index.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _enums = _interopRequireDefault(require("./enums.js"));

var _plane = require("./plane.js");

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
const _v = new Array(8);

_v[0] = new _index.Vec3(1, 1, 1);
_v[1] = new _index.Vec3(-1, 1, 1);
_v[2] = new _index.Vec3(-1, -1, 1);
_v[3] = new _index.Vec3(1, -1, 1);
_v[4] = new _index.Vec3(1, 1, -1);
_v[5] = new _index.Vec3(-1, 1, -1);
_v[6] = new _index.Vec3(-1, -1, -1);
_v[7] = new _index.Vec3(1, -1, -1);
/**
 * @en
 * Basic Geometry: frustum.
 * @zh
 * 基础几何 截头锥体。
 */

class Frustum {
  /**
   * @en
   * Set whether to use accurate intersection testing function on this frustum.
   * @zh
   * 设置是否在此截锥体上使用精确的相交测试函数。
   */
  set accurate(b) {
    this._type = b ? _enums.default.SHAPE_FRUSTUM_ACCURATE : _enums.default.SHAPE_FRUSTUM;
  }
  /**
   * @en
   * Create a ortho frustum.
   * @zh
   * 创建一个正交视锥体。
   * @param out 正交视锥体。
   * @param width 正交视锥体的宽度。
   * @param height 正交视锥体的高度。
   * @param near 正交视锥体的近平面值。
   * @param far 正交视锥体的远平面值。
   * @param transform 正交视锥体的变换矩阵。
   * @return {Frustum} frustum.
   */


  /**
   * @en
   * create a new frustum.
   * @zh
   * 创建一个新的截锥体。
   * @return {Frustum} frustum.
   */
  static create() {
    return new Frustum();
  }
  /**
   * @en
   * Clone a frustum.
   * @zh
   * 克隆一个截锥体。
   */


  static clone(f) {
    return Frustum.copy(new Frustum(), f);
  }
  /**
   * @en
   * Copy the values from one frustum to another.
   * @zh
   * 从一个截锥体拷贝到另一个截锥体。
   */


  static copy(out, f) {
    out._type = f._type;

    for (let i = 0; i < 6; ++i) {
      _plane.Plane.copy(out.planes[i], f.planes[i]);
    }

    for (let i = 0; i < 8; ++i) {
      _index.Vec3.copy(out.vertices[i], f.vertices[i]);
    }

    return out;
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

  constructor() {
    this._type = void 0;
    this.planes = void 0;
    this.vertices = void 0;
    this._type = _enums.default.SHAPE_FRUSTUM;
    this.planes = new Array(6);

    for (let i = 0; i < 6; ++i) {
      this.planes[i] = _plane.Plane.create(0, 0, 0, 0);
    }

    this.vertices = new Array(8);

    for (let i = 0; i < 8; ++i) {
      this.vertices[i] = new _index.Vec3();
    }
  }
  /**
   * @en
   * Update the frustum information according to the given transform matrix.
   * Note that the resulting planes are not normalized under normal mode.
   * @zh
   * 根据给定的变换矩阵更新截锥体信息，注意得到的平面不是在标准模式下归一化的。
   * @param {Mat4} m the view-projection matrix
   * @param {Mat4} inv the inverse view-projection matrix
   */


  update(m, inv) {
    // RTR4, ch. 22.14.1, p. 983
    // extract frustum planes from view-proj matrix.
    // left plane
    _index.Vec3.set(this.planes[0].n, m.m03 + m.m00, m.m07 + m.m04, m.m11 + m.m08);

    this.planes[0].d = -(m.m15 + m.m12); // right plane

    _index.Vec3.set(this.planes[1].n, m.m03 - m.m00, m.m07 - m.m04, m.m11 - m.m08);

    this.planes[1].d = -(m.m15 - m.m12); // bottom plane

    _index.Vec3.set(this.planes[2].n, m.m03 + m.m01, m.m07 + m.m05, m.m11 + m.m09);

    this.planes[2].d = -(m.m15 + m.m13); // top plane

    _index.Vec3.set(this.planes[3].n, m.m03 - m.m01, m.m07 - m.m05, m.m11 - m.m09);

    this.planes[3].d = -(m.m15 - m.m13); // near plane

    _index.Vec3.set(this.planes[4].n, m.m03 + m.m02, m.m07 + m.m06, m.m11 + m.m10);

    this.planes[4].d = -(m.m15 + m.m14); // far plane

    _index.Vec3.set(this.planes[5].n, m.m03 - m.m02, m.m07 - m.m06, m.m11 - m.m10);

    this.planes[5].d = -(m.m15 - m.m14);

    if (this._type !== _enums.default.SHAPE_FRUSTUM_ACCURATE) {
      return;
    } // normalize planes


    for (let i = 0; i < 6; i++) {
      const pl = this.planes[i];
      const invDist = 1 / pl.n.length();

      _index.Vec3.multiplyScalar(pl.n, pl.n, invDist);

      pl.d *= invDist;
    } // update frustum vertices


    for (let i = 0; i < 8; i++) {
      _index.Vec3.transformMat4(this.vertices[i], _v[i], inv);
    }
  }
  /**
   * @en
   * Transform this frustum.
   * @zh
   * 变换此截锥体。
   * @param mat 变换矩阵。
   */


  transform(mat) {
    if (this._type !== _enums.default.SHAPE_FRUSTUM_ACCURATE) {
      return;
    }

    for (let i = 0; i < 8; i++) {
      _index.Vec3.transformMat4(this.vertices[i], this.vertices[i], mat);
    }

    _plane.Plane.fromPoints(this.planes[0], this.vertices[1], this.vertices[5], this.vertices[6]);

    _plane.Plane.fromPoints(this.planes[1], this.vertices[3], this.vertices[7], this.vertices[4]);

    _plane.Plane.fromPoints(this.planes[2], this.vertices[6], this.vertices[7], this.vertices[3]);

    _plane.Plane.fromPoints(this.planes[3], this.vertices[0], this.vertices[4], this.vertices[5]);

    _plane.Plane.fromPoints(this.planes[4], this.vertices[2], this.vertices[3], this.vertices[0]);

    _plane.Plane.fromPoints(this.planes[0], this.vertices[7], this.vertices[6], this.vertices[5]);
  }

}
/**
 * @en
 * Record frustum to shared memory.
 * @zh
 * 记录 frustum 数据到共享内存。并不是每个 frustum 都是需要记录到共享内存的。
 * @param handle The frustum handle
 * @param frstm The frustum object
 */


exports.Frustum = Frustum;

Frustum.createOrtho = (() => {
  const _temp_v3 = new _index.Vec3();

  return (out, width, height, near, far, transform) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    _index.Vec3.set(_temp_v3, halfWidth, halfHeight, near);

    _index.Vec3.transformMat4(out.vertices[0], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, -halfWidth, halfHeight, near);

    _index.Vec3.transformMat4(out.vertices[1], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, -halfWidth, -halfHeight, near);

    _index.Vec3.transformMat4(out.vertices[2], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, halfWidth, -halfHeight, near);

    _index.Vec3.transformMat4(out.vertices[3], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, halfWidth, halfHeight, far);

    _index.Vec3.transformMat4(out.vertices[4], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, -halfWidth, halfHeight, far);

    _index.Vec3.transformMat4(out.vertices[5], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, -halfWidth, -halfHeight, far);

    _index.Vec3.transformMat4(out.vertices[6], _temp_v3, transform);

    _index.Vec3.set(_temp_v3, halfWidth, -halfHeight, far);

    _index.Vec3.transformMat4(out.vertices[7], _temp_v3, transform);

    _plane.Plane.fromPoints(out.planes[0], out.vertices[1], out.vertices[6], out.vertices[5]);

    _plane.Plane.fromPoints(out.planes[1], out.vertices[3], out.vertices[4], out.vertices[7]);

    _plane.Plane.fromPoints(out.planes[2], out.vertices[6], out.vertices[3], out.vertices[7]);

    _plane.Plane.fromPoints(out.planes[3], out.vertices[0], out.vertices[5], out.vertices[4]);

    _plane.Plane.fromPoints(out.planes[4], out.vertices[2], out.vertices[0], out.vertices[3]);

    _plane.Plane.fromPoints(out.planes[0], out.vertices[7], out.vertices[5], out.vertices[6]);
  };
})();

function recordFrustumToSharedMemory(handle, frstm) {
  if (!frstm || handle === _memoryPools.NULL_HANDLE) {
    return;
  }

  const vertices = frstm.vertices;
  let vertexOffset = _memoryPools.FrustumView.VERTICES;

  for (let i = 0; i < 8; ++i) {
    _memoryPools.FrustumPool.setVec3(handle, vertexOffset, vertices[i]);

    vertexOffset += 3;
  }

  const planes = frstm.planes;
  let planeOffset = _memoryPools.FrustumView.PLANES;

  for (let i = 0; i < 6; i++, planeOffset += 4) {
    _memoryPools.FrustumPool.setVec4(handle, planeOffset, planes[i]);
  }
}