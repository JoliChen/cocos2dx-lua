"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SphereLight = void 0;

var _index = require("../../geometry/index.js");

var _index2 = require("../../math/index.js");

var _light = require("./light.js");

var _memoryPools = require("../core/memory-pools.js");

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
class SphereLight extends _light.Light {
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

  get aabb() {
    return this._aabb;
  }

  constructor() {
    super();
    this._needUpdate = false;
    this._pos = void 0;
    this._aabb = void 0;
    this._hAABB = _memoryPools.NULL_HANDLE;
    this._aabb = _index.AABB.create();
    this._pos = new _index2.Vec3();
  }

  initialize() {
    super.initialize();
    this._hAABB = _memoryPools.AABBPool.alloc();
    const size = 0.15;

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.TYPE, _light.LightType.SPHERE);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.SIZE, size);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.RANGE, 1.0);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.AABB, this._hAABB);

    _memoryPools.LightPool.set(this._handle, _memoryPools.LightView.ILLUMINANCE, 1700 / (0, _light.nt2lm)(size));
  }

  update() {
    if (this._node && (this._node.hasChangedFlags || this._needUpdate)) {
      this._node.getWorldPosition(this._pos);

      const range = _memoryPools.LightPool.get(this._handle, _memoryPools.LightView.RANGE);

      _index.AABB.set(this._aabb, this._pos.x, this._pos.y, this._pos.z, range, range, range);

      this._needUpdate = false;

      _memoryPools.LightPool.setVec3(this._handle, _memoryPools.LightView.POSITION, this._pos);

      _memoryPools.AABBPool.setVec3(this._hAABB, _memoryPools.AABBView.CENTER, this._aabb.center);

      _memoryPools.AABBPool.setVec3(this._hAABB, _memoryPools.AABBView.HALF_EXTENSION, this._aabb.halfExtents);
    }
  }

  destroy() {
    if (this._hAABB) {
      _memoryPools.AABBPool.free(this._hAABB);

      this._hAABB = _memoryPools.NULL_HANDLE;
    }

    return super.destroy();
  }

}

exports.SphereLight = SphereLight;