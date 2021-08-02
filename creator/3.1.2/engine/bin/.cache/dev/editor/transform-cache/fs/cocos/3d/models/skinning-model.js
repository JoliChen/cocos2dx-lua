"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinningModel = void 0;

var _index = require("../../core/geometry/index.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _define = require("../../core/pipeline/define.js");

var _model = require("../../core/renderer/scene/model.js");

var _skeletalAnimationUtils = require("../skeletal-animation/skeletal-animation-utils.js");

var _morphModel = require("./morph-model.js");

var _memoryPools = require("../../core/renderer/core/memory-pools.js");

var _skeletalAnimationUtils2 = require("../../core/animation/skeletal-animation-utils.js");

/*
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
 * @hidden
 */
const myPatches = [{
  name: 'CC_USE_SKINNING',
  value: true
}];

function getRelevantBuffers(outIndices, outBuffers, jointMaps, targetJoint) {
  for (let i = 0; i < jointMaps.length; i++) {
    const idxMap = jointMaps[i];
    let index = -1;

    for (let j = 0; j < idxMap.length; j++) {
      if (idxMap[j] === targetJoint) {
        index = j;
        break;
      }
    }

    if (index >= 0) {
      outBuffers.push(i);
      outIndices.push(index);
    }
  }
}

const v3_min = new _index3.Vec3();
const v3_max = new _index3.Vec3();
const v3_1 = new _index3.Vec3();
const v3_2 = new _index3.Vec3();
const m4_1 = new _index3.Mat4();
const ab_1 = new _index.AABB();
/**
 * @en
 * The skinning model that is using real-time pose calculation.
 * @zh
 * 实时计算动画的蒙皮模型。
 */

class SkinningModel extends _morphModel.MorphModel {
  constructor() {
    super();
    this.uploadAnimation = null;
    this._buffers = [];
    this._dataArray = [];
    this._joints = [];
    this._bufferIndices = null;
    this.type = _model.ModelType.SKINNING;
  }

  destroy() {
    this.bindSkeleton();

    if (this._buffers.length) {
      for (let i = 0; i < this._buffers.length; i++) {
        this._buffers[i].destroy();
      }

      this._buffers.length = 0;
    }

    super.destroy();
  }

  bindSkeleton(skeleton = null, skinningRoot = null, mesh = null) {
    for (let i = 0; i < this._joints.length; i++) {
      (0, _skeletalAnimationUtils2.deleteTransform)(this._joints[i].target);
    }

    this._bufferIndices = null;
    this._joints.length = 0;

    if (!skeleton || !skinningRoot || !mesh) {
      return;
    }

    this.transform = skinningRoot;
    const boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
    const jointMaps = mesh.struct.jointMaps;

    this._ensureEnoughBuffers(jointMaps && jointMaps.length || 1);

    this._bufferIndices = mesh.jointBufferIndices;

    for (let index = 0; index < skeleton.joints.length; index++) {
      const bound = boneSpaceBounds[index];
      const target = skinningRoot.getChildByPath(skeleton.joints[index]);

      if (!bound || !target) {
        continue;
      }

      const transform = (0, _skeletalAnimationUtils2.getTransform)(target, skinningRoot);
      const bindpose = skeleton.bindposes[index];
      const indices = [];
      const buffers = [];

      if (!jointMaps) {
        indices.push(index);
        buffers.push(0);
      } else {
        getRelevantBuffers(indices, buffers, jointMaps, index);
      }

      this._joints.push({
        indices,
        buffers,
        bound,
        target,
        bindpose,
        transform
      });
    }
  }

  updateTransform(stamp) {
    const root = this.transform; // @ts-expect-error TS2445

    if (root.hasChangedFlags || root._dirtyFlags) {
      root.updateWorldTransform();
      this._transformUpdated = true;
    } // update bounds


    _index3.Vec3.set(v3_min, Infinity, Infinity, Infinity);

    _index3.Vec3.set(v3_max, -Infinity, -Infinity, -Infinity);

    for (let i = 0; i < this._joints.length; i++) {
      const {
        bound,
        transform
      } = this._joints[i];
      const worldMatrix = (0, _skeletalAnimationUtils2.getWorldMatrix)(transform, stamp);

      _index.AABB.transform(ab_1, bound, worldMatrix);

      ab_1.getBoundary(v3_1, v3_2);

      _index3.Vec3.min(v3_min, v3_min, v3_1);

      _index3.Vec3.max(v3_max, v3_max, v3_2);
    }

    const worldBounds = this._worldBounds;

    if (this._modelBounds && worldBounds) {
      _index.AABB.fromPoints(this._modelBounds, v3_min, v3_max); // @ts-expect-error TS2445


      this._modelBounds.transform(root._mat, root._pos, root._rot, root._scale, this._worldBounds);

      _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.CENTER, worldBounds.center);

      _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.HALF_EXTENSION, worldBounds.halfExtents);
    }
  }

  updateUBOs(stamp) {
    super.updateUBOs(stamp);

    for (let i = 0; i < this._joints.length; i++) {
      const {
        indices,
        buffers,
        transform,
        bindpose
      } = this._joints[i];

      _index3.Mat4.multiply(m4_1, transform.world, bindpose);

      for (let b = 0; b < buffers.length; b++) {
        (0, _skeletalAnimationUtils.uploadJointData)(this._dataArray[buffers[b]], indices[b] * 12, m4_1, i === 0);
      }
    }

    for (let b = 0; b < this._buffers.length; b++) {
      this._buffers[b].update(this._dataArray[b]);
    }

    return true;
  }

  initSubModel(idx, subMeshData, mat) {
    const original = subMeshData.vertexBuffers;
    const iaInfo = subMeshData.iaInfo;
    iaInfo.vertexBuffers = subMeshData.jointMappedBuffers;
    super.initSubModel(idx, subMeshData, mat);
    iaInfo.vertexBuffers = original;
  }

  getMacroPatches(subModelIndex) {
    const superMacroPatches = super.getMacroPatches(subModelIndex);

    if (superMacroPatches) {
      return myPatches.concat(superMacroPatches);
    }

    return myPatches;
  }

  _updateLocalDescriptors(submodelIdx, descriptorSet) {
    super._updateLocalDescriptors(submodelIdx, descriptorSet);

    const buffer = this._buffers[this._bufferIndices[submodelIdx]];

    if (buffer) {
      descriptorSet.bindBuffer(_define.UBOSkinning.BINDING, buffer);
    }
  }

  _ensureEnoughBuffers(count) {
    for (let i = 0; i < count; i++) {
      if (!this._buffers[i]) {
        this._buffers[i] = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.UNIFORM | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, _define.UBOSkinning.SIZE, _define.UBOSkinning.SIZE));
      }

      if (!this._dataArray[i]) {
        this._dataArray[i] = new Float32Array(_define.UBOSkinning.COUNT);
      }
    }
  }

}

exports.SkinningModel = SkinningModel;