"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoTerrainShape = void 0;

var _ammoInstantiated = _interopRequireDefault(require("../ammo-instantiated.js"));

var _ammoShape = require("./ammo-shape.js");

var _index = require("../../../core/index.js");

var _ammoUtil = require("../ammo-util.js");

var _ammoEnum = require("../ammo-enum.js");

var _ammoConst = require("../ammo-const.js");

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

/* eslint-disable new-cap */
class AmmoTerrainShape extends _ammoShape.AmmoShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._btShape;
  }

  setTerrain(v) {
    if (!this._isBinding) return;

    if (this._btShape != null && this._btShape !== _ammoConst.AmmoConstant.instance.EMPTY_SHAPE) {
      // TODO: change the terrain asset after initialization
      (0, _index.warn)('[Physics] Ammo change the terrain asset after initialization is not support.');
    } else {
      const terrain = v;

      if (terrain) {
        this._terrainID = terrain._uuid;
        this._tileSize = terrain.tileSize;
        const sizeI = terrain.getVertexCountI();
        const sizeJ = terrain.getVertexCountJ();
        this._buffPtr = _ammoInstantiated.default._malloc(4 * sizeI * sizeJ);
        let offset = 0;
        let maxHeight = Number.MIN_VALUE;
        let minHeight = Number.MAX_VALUE;

        for (let j = 0; j < sizeJ; j++) {
          for (let i = 0; i < sizeI; i++) {
            const v = terrain.getHeight(i, j);
            _ammoInstantiated.default.HEAPF32[this._buffPtr + offset >> 2] = v;
            maxHeight = maxHeight < v ? v : maxHeight;
            minHeight = minHeight > v ? v : minHeight;
            offset += 4;
          }
        }

        maxHeight += 0.1;
        minHeight -= 0.1;

        this._localOffset.set((sizeI - 1) / 2 * this._tileSize, (maxHeight + minHeight) / 2, (sizeJ - 1) / 2 * this._tileSize);

        const heightScale = 1;
        const hdt = 'PHY_FLOAT';
        const upAxis = 1;
        const flipQuadEdges = false;
        this._btShape = new _ammoInstantiated.default.btHeightfieldTerrainShape(sizeI, sizeJ, this._buffPtr, heightScale, minHeight, maxHeight, upAxis, hdt, flipQuadEdges);
        this.scale.setValue(this._tileSize, 1, this._tileSize);

        this._btShape.setLocalScaling(this.scale);
      } else {
        this._btShape = _ammoConst.AmmoConstant.instance.EMPTY_SHAPE;
      }
    }
  }

  constructor() {
    super(_ammoEnum.AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE);
    this._terrainID = void 0;
    this._buffPtr = void 0;
    this._tileSize = void 0;
    this._localOffset = void 0;
    this._terrainID = '';
    this._buffPtr = 0;
    this._tileSize = 0;
    this._localOffset = new _index.Vec3();
  }

  onComponentSet() {
    this.setTerrain(this.collider.terrain);
  }

  onDestroy() {
    if (this._buffPtr) _ammoInstantiated.default._free(this._buffPtr);
    super.onDestroy();
  }

  setCompound(compound) {
    super.setCompound(compound);
    this.impl.setUserIndex(this._index);
  }

  setCenter(v) {
    _index.Vec3.copy(_ammoConst.CC_V3_0, v);

    _ammoConst.CC_V3_0.add(this._localOffset); // CC_V3_0.multiply(this._collider.node.worldScale);


    (0, _ammoUtil.cocos2AmmoVec3)(this.transform.getOrigin(), _ammoConst.CC_V3_0);
    this.updateCompoundTransform();
  } // setScale () {
  // }


}

exports.AmmoTerrainShape = AmmoTerrainShape;