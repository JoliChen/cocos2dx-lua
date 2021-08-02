"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpotLight = void 0;

var _index = require("../../geometry/index.js");

var _index2 = require("../../math/index.js");

var _light = require("./light.js");

var _memoryPools = require("../core/memory-pools.js");

var _frustum = require("../../geometry/frustum.js");

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
const _forward = new _index2.Vec3(0, 0, -1);

const _qt = new _index2.Quat();

const _matView = new _index2.Mat4();

const _matProj = new _index2.Mat4();

const _matViewProj = new _index2.Mat4();

const _matViewProjInv = new _index2.Mat4();

class SpotLight extends _light.Light {
  get position() {
    return this._pos;
  }

  set size(size) {
    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.SIZE, size);
  }

  get size() {
    return _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.SIZE);
  }

  set range(range) {
    this._range = range;

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.RANGE, range);

    this._needUpdate = true;
  }

  get range() {
    return _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.RANGE);
  }

  set luminance(lum) {
    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.ILLUMINANCE, lum);
  }

  get luminance() {
    return _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.ILLUMINANCE);
  }

  get direction() {
    return this._dir;
  }

  get spotAngle() {
    return _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.SPOT_ANGLE);
  }

  set spotAngle(val) {
    this._angle = val;

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.SPOT_ANGLE, Math.cos(val * 0.5));

    this._needUpdate = true;
  }

  set aspect(val) {
    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.ASPECT, val);

    this._needUpdate = true;
  }

  get aspect() {
    return _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.ASPECT);
  }

  get aabb() {
    return this._aabb;
  }

  get frustum() {
    return this._frustum;
  }

  constructor() {
    super();
    this._dir = new _index2.Vec3(1.0, -1.0, -1.0);
    this._range = 5.0;
    this._spotAngle = Math.cos(Math.PI / 6);
    this._pos = void 0;
    this._aabb = void 0;
    this._frustum = void 0;
    this._angle = 0;
    this._needUpdate = false;
    this._hAABB = _memoryPools.NULL_HANDLE;
    this._hFrustum = _memoryPools.NULL_HANDLE;
    this._aabb = _index.AABB.create();
    this._frustum = _index.Frustum.create();
    this._pos = new _index2.Vec3();
  }

  initialize() {
    super.initialize();
    this._hAABB = _memoryPools.AABBPool.alloc();
    this._hFrustum = _memoryPools.FrustumPool.alloc();
    const size = 0.15;

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.TYPE, _light.LightType.SPOT);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.SIZE, size);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.AABB, this._hAABB);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.ILLUMINANCE, 1700 / (0, _light.nt2lm)(size));

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.RANGE, Math.cos(Math.PI / 6));

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.ASPECT, 1.0);

    _memoryPools.LightPool.setVec3(this._handle, _memoryPools.LightView.DIRECTION, this._dir);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.FRUSTUM, this._hFrustum);
  }

  update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      _index2.Vec3.transformQuat(this._dir, _forward, this._node.getWorldRotation(_qt));

      _index2.Vec3.normalize(this._dir, this._dir);

      _memoryPools.LightPool.setVec3(this._handle, _memoryPools.LightView.DIRECTION, this._dir);

      _index.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, this._range, this._range, this._range); // view matrix


      this._node.getWorldRT(_matView);

      _index2.Mat4.invert(_matView, _matView);

      _index2.Mat4.perspective(_matProj, this._angle, 1.0, 0.001, this._range); // view-projection


      _index2.Mat4.multiply(_matViewProj, _matProj, _matView); // Mat4.invert(_matViewProjInv, _matViewProj);


      this._frustum.update(_matViewProj, _matViewProjInv);

      this._needUpdate = false;

      _memoryPools.LightPool.setVec3(this._handle, _memoryPools.LightView.POSITION, this._pos);

      _memoryPools.AABBPool.setVec3(this._hAABB, _memoryPools.AABBView.CENTER, this._aabb.center);

      _memoryPools.AABBPool.setVec3(this._hAABB, _memoryPools.AABBView.HALF_EXTENSION, this._aabb.halfExtents);

      (0, _frustum.recordFrustumToSharedMemory)(this._hFrustum, this._frustum);
    }
  }

  destroy() {
    if (this._hAABB) {
      _memoryPools.AABBPool.free(this._hAABB);

      this._hAABB = _memoryPools.NULL_HANDLE;
    }

    if (this._hFrustum) {
      _memoryPools.FrustumPool.free(this._hFrustum);

      this._hFrustum = _memoryPools.NULL_HANDLE;
    }

    return super.destroy();
  }

}

exports.SpotLight = SpotLight;