"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsRayResult = void 0;

var _index = require("../../core/math/index.js");

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
 * @module physics
 */

/**
 * @en
 * Used to store physics ray test results.
 * @zh
 * 用于保存物理射线检测结果。
 */
class PhysicsRayResult {
  constructor() {
    this._hitPoint = new _index.Vec3();
    this._hitNormal = new _index.Vec3();
    this._distance = 0;
    this._collider = null;
  }

  /**
   * @en
   * The hit point，in world space.
   * @zh
   * 在世界坐标系下的击中点。
   */
  get hitPoint() {
    return this._hitPoint;
  }
  /**
   * @en
   * The distance between the ray origin with the hit.
   * @zh
   * 距离。
   */


  get distance() {
    return this._distance;
  }
  /**
   * @en
   * The collider hit by the ray.
   * @zh
   * 击中的碰撞盒
   */


  get collider() {
    return this._collider;
  }
  /**
   * @en
   * The normal of the hit plane，in world space.
   * @zh
   * 在世界坐标系下击中面的法线。
   */


  get hitNormal() {
    return this._hitNormal;
  }

  /**
   * @en
   * internal methods.
   * @zh
   * 设置射线，此方法由引擎内部使用，请勿在外部脚本调用。
   */
  _assign(hitPoint, distance, collider, hitNormal) {
    _index.Vec3.copy(this._hitPoint, hitPoint);

    _index.Vec3.copy(this._hitNormal, hitNormal);

    this._distance = distance;
    this._collider = collider;
  }
  /**
   * @en
   * clone.
   * @zh
   * 克隆。
   */


  clone() {
    const c = new PhysicsRayResult();

    _index.Vec3.copy(c._hitPoint, this._hitPoint);

    _index.Vec3.copy(c._hitNormal, this._hitNormal);

    c._distance = this._distance;
    c._collider = this._collider;
    return c;
  }

}

exports.PhysicsRayResult = PhysicsRayResult;