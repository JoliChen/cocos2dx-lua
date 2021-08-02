"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BakedSkinningModel = void 0;

var _index = require("../../core/gfx/index.js");

var _define = require("../../core/pipeline/define.js");

var _samplerLib = require("../../core/renderer/core/sampler-lib.js");

var _model = require("../../core/renderer/scene/model.js");

var _skeletalAnimationUtils = require("../skeletal-animation/skeletal-animation-utils.js");

var _morphModel = require("./morph-model.js");

var _globalExports = require("../../core/global-exports.js");

var _memoryPools = require("../../core/renderer/core/memory-pools.js");

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
}, {
  name: 'CC_USE_BAKED_ANIMATION',
  value: true
}];
/**
 * @en
 * The skinning model that is using baked animation.
 * @zh
 * 预烘焙动画的蒙皮模型。
 */

class BakedSkinningModel extends _morphModel.MorphModel {
  // uninitialized
  constructor() {
    super();
    this.uploadedAnim = undefined;
    this._jointsMedium = void 0;
    this._skeleton = null;
    this._mesh = null;
    this._dataPoolManager = void 0;
    this._instAnimInfoIdx = -1;
    this.type = _model.ModelType.BAKED_SKINNING;
    this._dataPoolManager = _globalExports.legacyCC.director.root.dataPoolManager;
    const jointTextureInfo = new Float32Array(4);

    const animInfo = this._dataPoolManager.jointAnimationInfo.getData();

    this._jointsMedium = {
      buffer: null,
      jointTextureInfo,
      animInfo,
      texture: null,
      boundsInfo: null
    };
  }

  destroy() {
    this.uploadedAnim = undefined; // uninitialized

    this._jointsMedium.boundsInfo = null;

    if (this._jointsMedium.buffer) {
      this._jointsMedium.buffer.destroy();

      this._jointsMedium.buffer = null;
    }

    this._applyJointTexture();

    super.destroy();
  }

  bindSkeleton(skeleton = null, skinningRoot = null, mesh = null) {
    this._skeleton = skeleton;
    this._mesh = mesh;

    if (!skeleton || !skinningRoot || !mesh) {
      return;
    }

    this.transform = skinningRoot;
    const resMgr = this._dataPoolManager;
    this._jointsMedium.animInfo = resMgr.jointAnimationInfo.getData(skinningRoot.uuid);

    if (!this._jointsMedium.buffer) {
      this._jointsMedium.buffer = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOSkinningTexture.SIZE, _define.UBOSkinningTexture.SIZE));
    }
  }

  updateTransform(stamp) {
    super.updateTransform(stamp);

    if (!this.uploadedAnim) {
      return;
    }

    const {
      animInfo,
      boundsInfo
    } = this._jointsMedium;
    const skelBound = boundsInfo[animInfo.data[0]];
    const worldBounds = this._worldBounds;

    if (worldBounds && skelBound) {
      const node = this.transform; // @ts-expect-error TS2339

      skelBound.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);

      _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.CENTER, worldBounds.center);

      _memoryPools.AABBPool.setVec3(this._hWorldBounds, _memoryPools.AABBView.HALF_EXTENSION, worldBounds.halfExtents);
    }
  } // update fid buffer only when visible


  updateUBOs(stamp) {
    super.updateUBOs(stamp);
    const info = this._jointsMedium.animInfo;
    const idx = this._instAnimInfoIdx;

    if (idx >= 0) {
      const view = this.instancedAttributes.views[idx];
      view[0] = info.data[0];
    } else if (info.dirty) {
      info.buffer.update(info.data);
      info.dirty = false;
    }

    return true;
  }

  uploadAnimation(anim) {
    if (!this._skeleton || !this._mesh || this.uploadedAnim === anim) {
      return;
    }

    this.uploadedAnim = anim;
    const resMgr = this._dataPoolManager;
    let texture = null;

    if (anim) {
      texture = resMgr.jointTexturePool.getSequencePoseTexture(this._skeleton, anim, this._mesh, this.transform);
      this._jointsMedium.boundsInfo = texture && texture.bounds.get(this._mesh.hash);
      this._modelBounds = null; // don't calc bounds again in Model
    } else {
      texture = resMgr.jointTexturePool.getDefaultPoseTexture(this._skeleton, this._mesh, this.transform);
      this._jointsMedium.boundsInfo = null;
      this._modelBounds = texture && texture.bounds.get(this._mesh.hash)[0];
    }

    this._applyJointTexture(texture);
  }

  _applyJointTexture(texture = null) {
    const oldTex = this._jointsMedium.texture;

    if (oldTex && oldTex !== texture) {
      this._dataPoolManager.jointTexturePool.releaseHandle(oldTex);
    }

    this._jointsMedium.texture = texture;

    if (!texture) {
      return;
    }

    const {
      buffer,
      jointTextureInfo
    } = this._jointsMedium;
    jointTextureInfo[0] = texture.handle.texture.width;
    jointTextureInfo[1] = this._skeleton.joints.length;
    jointTextureInfo[2] = texture.pixelOffset + 0.1; // guard against floor() underflow

    jointTextureInfo[3] = 1 / jointTextureInfo[0];
    this.updateInstancedJointTextureInfo();

    if (buffer) {
      buffer.update(jointTextureInfo);
    }

    const tex = texture.handle.texture;

    for (let i = 0; i < this._subModels.length; ++i) {
      const descriptorSet = this._subModels[i].descriptorSet;
      descriptorSet.bindTexture(_define.UNIFORM_JOINT_TEXTURE_BINDING, tex);
    }
  }

  getMacroPatches(subModelIndex) {
    const patches = super.getMacroPatches(subModelIndex);
    return patches ? patches.concat(myPatches) : myPatches;
  }

  _updateLocalDescriptors(submodelIdx, descriptorSet) {
    super._updateLocalDescriptors(submodelIdx, descriptorSet);

    const {
      buffer,
      texture,
      animInfo
    } = this._jointsMedium;
    descriptorSet.bindBuffer(_define.UBOSkinningTexture.BINDING, buffer);
    descriptorSet.bindBuffer(_define.UBOSkinningAnimation.BINDING, animInfo.buffer);

    if (texture) {
      const sampler = _samplerLib.samplerLib.getSampler(this._device, _skeletalAnimationUtils.jointTextureSamplerHash);

      descriptorSet.bindTexture(_define.UNIFORM_JOINT_TEXTURE_BINDING, texture.handle.texture);
      descriptorSet.bindSampler(_define.UNIFORM_JOINT_TEXTURE_BINDING, sampler);
    }
  }

  _updateInstancedAttributes(attributes, pass) {
    super._updateInstancedAttributes(attributes, pass);

    this._instAnimInfoIdx = this._getInstancedAttributeIndex(_define.INST_JOINT_ANIM_INFO);
    this.updateInstancedJointTextureInfo();
  }

  updateInstancedJointTextureInfo() {
    const {
      jointTextureInfo,
      animInfo
    } = this._jointsMedium;
    const idx = this._instAnimInfoIdx;

    if (idx >= 0) {
      // update instancing data too
      const view = this.instancedAttributes.views[idx];
      view[0] = animInfo.data[0];
      view[1] = jointTextureInfo[1];
      view[2] = jointTextureInfo[2];
    }
  }

}

exports.BakedSkinningModel = BakedSkinningModel;