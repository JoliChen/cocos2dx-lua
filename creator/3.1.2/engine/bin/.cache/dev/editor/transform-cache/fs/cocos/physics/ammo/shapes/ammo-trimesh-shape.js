"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoTrimeshShape = void 0;

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
class AmmoTrimeshShape extends _ammoShape.AmmoShape {
  get collider() {
    return this._collider;
  }

  get impl() {
    return this._btShape;
  }

  setMesh(v) {
    if (!this._isBinding) return;

    if (this._btShape != null && this._btShape !== _ammoConst.AmmoConstant.instance.EMPTY_SHAPE) {
      // TODO: change the mesh after initialization
      (0, _index.warnID)(9620);
    } else {
      const mesh = v;

      if (mesh && mesh.renderingSubMeshes.length > 0) {
        const btTriangleMesh = this._getBtTriangleMesh(mesh);

        if (this.collider.convex) {
          this._btShape = new _ammoInstantiated.default.btConvexTriangleMeshShape(btTriangleMesh, true);
        } else {
          this._btShape = new _ammoInstantiated.default.btBvhTriangleMeshShape(btTriangleMesh, true, true);
        }

        (0, _ammoUtil.cocos2AmmoVec3)(this.scale, this._collider.node.worldScale);

        this._btShape.setMargin(0.01);

        this._btShape.setLocalScaling(this.scale);

        this.setWrapper();
        this.setCompound(this._btCompound);
        this.updateByReAdd();
      } else {
        this._btShape = _ammoConst.AmmoConstant.instance.EMPTY_SHAPE;
      }
    }
  }

  constructor() {
    super(_ammoEnum.AmmoBroadphaseNativeTypes.TRIANGLE_MESH_SHAPE_PROXYTYPE);
    this.refBtTriangleMesh = null;
  }

  onComponentSet() {
    this.setMesh(this.collider.mesh);
  }

  onDestroy() {
    if (this.refBtTriangleMesh) {
      _ammoInstantiated.default.destroy(this.refBtTriangleMesh);
    }

    super.onDestroy();
  }

  setCompound(compound) {
    super.setCompound(compound);
    this.impl.setUserIndex(this._index);
  }

  setScale() {
    super.setScale();
    (0, _ammoUtil.cocos2AmmoVec3)(this.scale, this._collider.node.worldScale);

    this._btShape.setLocalScaling(this.scale);

    this.updateCompoundTransform();
  }

  _getBtTriangleMesh(mesh) {
    let btTriangleMesh;
    const cache = _ammoInstantiated.default.CC_CACHE;

    if (cache.btTriangleMesh.enable) {
      if (cache.btTriangleMesh[mesh._uuid] == null) {
        const btm = new _ammoInstantiated.default.btTriangleMesh();
        cache.btTriangleMesh[mesh._uuid] = btm;
        (0, _ammoUtil.cocos2AmmoTriMesh)(btm, mesh);
      }

      btTriangleMesh = cache.btTriangleMesh[mesh._uuid];
    } else {
      this.refBtTriangleMesh = btTriangleMesh = new _ammoInstantiated.default.btTriangleMesh();
      (0, _ammoUtil.cocos2AmmoTriMesh)(btTriangleMesh, mesh);
    }

    return btTriangleMesh;
  }

}

exports.AmmoTrimeshShape = AmmoTrimeshShape;