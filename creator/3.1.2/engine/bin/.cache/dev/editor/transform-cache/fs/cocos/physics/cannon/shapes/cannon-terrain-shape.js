"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonTerrainShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _cannonShape = require("./cannon-shape.js");

var _index = require("../../../core/index.js");

var _cannonUtil = require("../cannon-util.js");

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
 * @hidden
 */
const CANNON_AABB_LOCAL = new _cannon.default.AABB();
const CANNON_AABB = new _cannon.default.AABB();
const CANNON_TRANSFORM = new _cannon.default.Transform(); // eslint-disable-next-line func-names

_cannon.default.Heightfield.prototype.calculateWorldAABB = function (pos, quat, min, max) {
  const frame = CANNON_TRANSFORM;
  const result = CANNON_AABB;

  _index.Vec3.copy(frame.position, pos);

  _index.Quat.copy(frame.quaternion, quat);

  const s = this.elementSize;
  const data = this.data;
  CANNON_AABB_LOCAL.lowerBound.set(0, 0, this.minValue);
  CANNON_AABB_LOCAL.upperBound.set((data.length - 1) * s, (data[0].length - 1) * s, this.maxValue);
  CANNON_AABB_LOCAL.toWorldFrame(frame, result);
  min.copy(result.lowerBound);
  max.copy(result.upperBound);
};

class CannonTerrainShape extends _cannonShape.CannonShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._shape;
  }

  setTerrain(v) {
    if (v) {
      if (this._terrainID !== v._uuid) {
        const terrain = v;
        const sizeI = terrain.getVertexCountI();
        const sizeJ = terrain.getVertexCountJ();
        this._terrainID = terrain._uuid;
        this.data.length = sizeI - 1;

        for (let i = 0; i < sizeI; i++) {
          if (this.data[i] == null) this.data[i] = [];
          this.data[i].length = sizeJ - 1;

          for (let j = 0; j < sizeJ; j++) {
            this.data[i][j] = terrain.getHeight(i, sizeJ - 1 - j);
          }
        }

        this.options.elementSize = terrain.tileSize;
        this.updateProperties(this.data, this.options.elementSize);
      }
    } else if (this._terrainID !== '') {
      this._terrainID = '';
      this.data.length = 1;
      this.data[0] = this.data[0] || [];
      this.data[0].length = 0;
      this.options.elementSize = 0;
      this.updateProperties(this.data, this.options.elementSize);
    }
  }

  constructor() {
    super();
    this.data = void 0;
    this.options = void 0;
    this._terrainID = void 0;
    this.data = [[]];
    this.options = {
      elementSize: 0
    };
    this._terrainID = '';
  }

  onComponentSet() {
    const terrain = this.collider.terrain;

    if (terrain) {
      const sizeI = terrain.getVertexCountI();
      const sizeJ = terrain.getVertexCountJ();

      for (let i = 0; i < sizeI; i++) {
        if (this.data[i] == null) this.data[i] = [];

        for (let j = 0; j < sizeJ; j++) {
          this.data[i][j] = terrain.getHeight(i, sizeJ - 1 - j);
        }
      }

      this.options.elementSize = terrain.tileSize;
      this._terrainID = terrain._uuid;
    }

    this._shape = new _cannon.default.Heightfield(this.data, this.options);
  }

  onLoad() {
    super.onLoad();
    this.setTerrain(this.collider.terrain);
  }

  updateProperties(data, elementSize) {
    const impl = this.impl;
    impl.data = data;
    impl.elementSize = elementSize;
    impl.updateMinValue();
    impl.updateMaxValue();
    impl.updateBoundingSphereRadius();
    impl.update();

    if (this._index >= 0) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  } // override


  _setCenter(v) {
    const terrain = this.collider.terrain;

    if (terrain) {
      _index.Quat.fromEuler(this._orient, -90, 0, 0);

      const lpos = this._offset;

      _index.Vec3.set(lpos, 0, 0, (terrain.getVertexCountJ() - 1) * terrain.tileSize);

      _index.Vec3.add(lpos, lpos, v); // Vec3.multiply(lpos, lpos, this._collider.node.worldScale);

    }
  }

}

exports.CannonTerrainShape = CannonTerrainShape;