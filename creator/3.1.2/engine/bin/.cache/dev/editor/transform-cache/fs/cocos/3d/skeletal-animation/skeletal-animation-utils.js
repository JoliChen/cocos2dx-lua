"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectJointsMediumFormat = selectJointsMediumFormat;
exports.JointAnimationInfo = exports.JointTexturePool = exports.jointTextureSamplerHash = exports.MINIMUM_JOINT_TEXTURE_SIZE = exports.uploadJointData = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _skeletalAnimationDataHub = require("./skeletal-animation-data-hub.js");

var _transformUtils = require("../../core/animation/transform-utils.js");

var _index = require("../../core/geometry/index.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _define = require("../../core/pipeline/define.js");

var _samplerLib = require("../../core/renderer/core/sampler-lib.js");

var _textureBufferPool = require("../../core/renderer/core/texture-buffer-pool.js");

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
// change here and cc-skinning.chunk to use other skinning algorithms
const uploadJointData = uploadJointDataLBS;
exports.uploadJointData = uploadJointData;
const MINIMUM_JOINT_TEXTURE_SIZE = _internal253Aconstants.EDITOR ? 2040 : 480; // have to be multiples of 12

exports.MINIMUM_JOINT_TEXTURE_SIZE = MINIMUM_JOINT_TEXTURE_SIZE;

function selectJointsMediumFormat(device) {
  if (device.hasFeature(_index2.Feature.TEXTURE_FLOAT)) {
    return _index2.Format.RGBA32F;
  }

  return _index2.Format.RGBA8;
} // Linear Blending Skinning


function uploadJointDataLBS(out, base, mat, firstBone) {
  out[base + 0] = mat.m00;
  out[base + 1] = mat.m01;
  out[base + 2] = mat.m02;
  out[base + 3] = mat.m12;
  out[base + 4] = mat.m04;
  out[base + 5] = mat.m05;
  out[base + 6] = mat.m06;
  out[base + 7] = mat.m13;
  out[base + 8] = mat.m08;
  out[base + 9] = mat.m09;
  out[base + 10] = mat.m10;
  out[base + 11] = mat.m14;
}

const dq_0 = new _index3.Quat();
const dq_1 = new _index3.Quat();
const v3_1 = new _index3.Vec3();
const qt_1 = new _index3.Quat();
const v3_2 = new _index3.Vec3(); // Dual Quaternion Skinning

function uploadJointDataDQS(out, base, mat, firstBone) {
  _index3.Mat4.toRTS(mat, qt_1, v3_1, v3_2); // sign consistency


  if (firstBone) {
    _index3.Quat.copy(dq_0, qt_1);
  } else if (_index3.Quat.dot(dq_0, qt_1) < 0) {
    _index3.Quat.multiplyScalar(qt_1, qt_1, -1);
  } // conversion


  _index3.Quat.set(dq_1, v3_1.x, v3_1.y, v3_1.z, 0);

  _index3.Quat.multiplyScalar(dq_1, _index3.Quat.multiply(dq_1, dq_1, qt_1), 0.5); // upload


  out[base + 0] = qt_1.x;
  out[base + 1] = qt_1.y;
  out[base + 2] = qt_1.z;
  out[base + 3] = qt_1.w;
  out[base + 4] = dq_1.x;
  out[base + 5] = dq_1.y;
  out[base + 6] = dq_1.z;
  out[base + 7] = dq_1.w;
  out[base + 8] = v3_2.x;
  out[base + 9] = v3_2.y;
  out[base + 10] = v3_2.z;
}

function roundUpTextureSize(targetLength, formatSize) {
  const formatScale = 4 / Math.sqrt(formatSize);
  return Math.ceil(Math.max(MINIMUM_JOINT_TEXTURE_SIZE * formatScale, targetLength) / 12) * 12;
}

const jointTextureSamplerHash = (0, _samplerLib.genSamplerHash)([_index2.Filter.POINT, _index2.Filter.POINT, _index2.Filter.NONE, _index2.Address.CLAMP, _index2.Address.CLAMP, _index2.Address.CLAMP]);
exports.jointTextureSamplerHash = jointTextureSamplerHash;
const v3_3 = new _index3.Vec3();
const v3_4 = new _index3.Vec3();
const v3_min = new _index3.Vec3();
const v3_max = new _index3.Vec3();
const m4_1 = new _index3.Mat4();
const m4_2 = new _index3.Mat4();
const ab_1 = new _index.AABB();
// Have to use some big number to replace the actual 'Infinity'.
// For (Infinity - Infinity) evaluates to NaN
const Inf = Number.MAX_SAFE_INTEGER;

class JointTexturePool {
  // per skeleton per clip
  // hash -> chunkIdx
  get pixelsPerJoint() {
    return this._pixelsPerJoint;
  }

  constructor(device) {
    this._device = void 0;
    this._pool = void 0;
    this._textureBuffers = new Map();
    this._formatSize = void 0;
    this._pixelsPerJoint = void 0;
    this._customPool = void 0;
    this._chunkIdxMap = new Map();
    this._device = device;
    const format = selectJointsMediumFormat(this._device);
    this._formatSize = _index2.FormatInfos[format].size;
    this._pixelsPerJoint = 48 / this._formatSize;
    this._pool = new _textureBufferPool.TextureBufferPool(device);

    this._pool.initialize({
      format,
      roundUpFn: roundUpTextureSize
    });

    this._customPool = new _textureBufferPool.TextureBufferPool(device);

    this._customPool.initialize({
      format,
      roundUpFn: roundUpTextureSize
    });
  }

  clear() {
    this._pool.destroy();

    this._textureBuffers.clear();
  }

  registerCustomTextureLayouts(layouts) {
    for (let i = 0; i < layouts.length; i++) {
      const layout = layouts[i];

      const chunkIdx = this._customPool.createChunk(layout.textureLength);

      for (let j = 0; j < layout.contents.length; j++) {
        const content = layout.contents[j];
        const {
          skeleton
        } = content;

        this._chunkIdxMap.set(skeleton, chunkIdx); // include default pose too


        for (let k = 0; k < content.clips.length; k++) {
          const clip = content.clips[k];

          this._chunkIdxMap.set(skeleton ^ clip, chunkIdx);
        }
      }
    }
  }
  /**
   * @en
   * Get joint texture for the default pose.
   * @zh
   * 获取默认姿势的骨骼贴图。
   */


  getDefaultPoseTexture(skeleton, mesh, skinningRoot) {
    const hash = skeleton.hash ^ 0; // may not equal to skeleton.hash

    let texture = this._textureBuffers.get(hash) || null;

    if (texture && texture.bounds.has(mesh.hash)) {
      texture.refCount++;
      return texture;
    }

    const {
      joints,
      bindposes
    } = skeleton;
    let textureBuffer = null;
    let buildTexture = false;
    const jointCount = joints.length;

    if (!texture) {
      const bufSize = jointCount * 12;

      const customChunkIdx = this._chunkIdxMap.get(hash);

      const handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

      if (!handle) {
        return texture;
      }

      texture = {
        pixelOffset: handle.start / this._formatSize,
        refCount: 1,
        bounds: new Map(),
        skeletonHash: skeleton.hash,
        clipHash: 0,
        readyToBeDeleted: false,
        handle
      };
      textureBuffer = new Float32Array(bufSize);
      buildTexture = true;
    } else {
      texture.refCount++;
    }

    _index3.Vec3.set(v3_min, Inf, Inf, Inf);

    _index3.Vec3.set(v3_max, -Inf, -Inf, -Inf);

    const boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);

    for (let j = 0, offset = 0; j < jointCount; j++, offset += 12) {
      const node = skinningRoot.getChildByPath(joints[j]);
      const mat = node ? (0, _transformUtils.getWorldTransformUntilRoot)(node, skinningRoot, m4_1) : skeleton.inverseBindposes[j];
      const bound = boneSpaceBounds[j];

      if (bound) {
        _index.AABB.transform(ab_1, bound, mat);

        ab_1.getBoundary(v3_3, v3_4);

        _index3.Vec3.min(v3_min, v3_min, v3_3);

        _index3.Vec3.max(v3_max, v3_max, v3_4);
      }

      if (buildTexture) {
        if (node) {
          _index3.Mat4.multiply(mat, mat, bindposes[j]);
        }

        uploadJointData(textureBuffer, offset, node ? mat : _index3.Mat4.IDENTITY, j === 0);
      }
    }

    const bounds = [new _index.AABB()];
    texture.bounds.set(mesh.hash, bounds);

    _index.AABB.fromPoints(bounds[0], v3_min, v3_max);

    if (buildTexture) {
      this._pool.update(texture.handle, textureBuffer.buffer);

      this._textureBuffers.set(hash, texture);
    }

    return texture;
  }
  /**
   * @en
   * Get joint texture for the specified animation clip.
   * @zh
   * 获取指定动画片段的骨骼贴图。
   */


  getSequencePoseTexture(skeleton, clip, mesh, skinningRoot) {
    const hash = skeleton.hash ^ clip.hash;
    let texture = this._textureBuffers.get(hash) || null;

    if (texture && texture.bounds.has(mesh.hash)) {
      texture.refCount++;
      return texture;
    }

    const {
      joints,
      bindposes
    } = skeleton;

    const clipData = _skeletalAnimationDataHub.SkelAnimDataHub.getOrExtract(clip);

    const {
      frames
    } = clipData.info;
    let textureBuffer = null;
    let buildTexture = false;
    const jointCount = joints.length;

    if (!texture) {
      const bufSize = jointCount * 12 * frames;

      const customChunkIdx = this._chunkIdxMap.get(hash);

      const handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

      if (!handle) {
        return null;
      }

      const animInfos = this._createAnimInfos(skeleton, clip, skinningRoot);

      texture = {
        pixelOffset: handle.start / this._formatSize,
        refCount: 1,
        bounds: new Map(),
        skeletonHash: skeleton.hash,
        clipHash: clip.hash,
        readyToBeDeleted: false,
        handle,
        animInfos
      };
      textureBuffer = new Float32Array(bufSize);
      buildTexture = true;
    } else {
      texture.refCount++;
    }

    const boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
    const bounds = [];
    texture.bounds.set(mesh.hash, bounds);

    for (let f = 0; f < frames; f++) {
      bounds.push(new _index.AABB(Inf, Inf, Inf, -Inf, -Inf, -Inf));
    }

    for (let f = 0, offset = 0; f < frames; f++) {
      const bound = bounds[f];

      for (let j = 0; j < jointCount; j++, offset += 12) {
        const {
          curveData,
          downstream,
          bindposeIdx,
          bindposeCorrection
        } = texture.animInfos[j];
        let mat;
        let transformValid = true;

        if (curveData && downstream) {
          // curve & static two-way combination
          mat = _index3.Mat4.multiply(m4_1, curveData[f], downstream);
        } else if (curveData) {
          // there is a curve directly controlling the joint
          mat = curveData[f];
        } else if (downstream) {
          // fallback to default pose if no animation curve can be found upstream
          mat = downstream;
        } else {
          // bottom line: render the original mesh as-is
          mat = skeleton.inverseBindposes[bindposeIdx];
          transformValid = false;
        }

        const boneSpaceBound = boneSpaceBounds[j];

        if (boneSpaceBound) {
          const transform = bindposeCorrection ? _index3.Mat4.multiply(m4_2, mat, bindposeCorrection) : mat;

          _index.AABB.transform(ab_1, boneSpaceBound, transform);

          ab_1.getBoundary(v3_3, v3_4);

          _index3.Vec3.min(bound.center, bound.center, v3_3);

          _index3.Vec3.max(bound.halfExtents, bound.halfExtents, v3_4);
        }

        if (buildTexture) {
          if (transformValid) {
            _index3.Mat4.multiply(m4_1, mat, bindposes[bindposeIdx]);
          }

          uploadJointData(textureBuffer, offset, transformValid ? m4_1 : _index3.Mat4.IDENTITY, j === 0);
        }
      }

      _index.AABB.fromPoints(bound, bound.center, bound.halfExtents);
    }

    if (buildTexture) {
      this._pool.update(texture.handle, textureBuffer.buffer);

      this._textureBuffers.set(hash, texture);
    }

    return texture;
  }

  releaseHandle(handle) {
    if (handle.refCount > 0) {
      handle.refCount--;
    }

    if (!handle.refCount && handle.readyToBeDeleted) {
      const hash = handle.skeletonHash ^ handle.clipHash;

      const customChunkIdx = this._chunkIdxMap.get(hash);

      (customChunkIdx !== undefined ? this._customPool : this._pool).free(handle.handle);

      if (this._textureBuffers.get(hash) === handle) {
        this._textureBuffers.delete(hash);
      }
    }
  }

  releaseSkeleton(skeleton) {
    const it = this._textureBuffers.values();

    let res = it.next();

    while (!res.done) {
      const handle = res.value;

      if (handle.skeletonHash === skeleton.hash) {
        handle.readyToBeDeleted = true;

        if (handle.refCount) {
          // delete handle record immediately so new allocations with the same asset could work
          this._textureBuffers.delete(handle.skeletonHash ^ handle.clipHash);
        } else {
          this.releaseHandle(handle);
        }
      }

      res = it.next();
    }
  }

  releaseAnimationClip(clip) {
    const it = this._textureBuffers.values();

    let res = it.next();

    while (!res.done) {
      const handle = res.value;

      if (handle.clipHash === clip.hash) {
        handle.readyToBeDeleted = true;

        if (handle.refCount) {
          // delete handle record immediately so new allocations with the same asset could work
          this._textureBuffers.delete(handle.skeletonHash ^ handle.clipHash);
        } else {
          this.releaseHandle(handle);
        }
      }

      res = it.next();
    }
  }

  _createAnimInfos(skeleton, clip, skinningRoot) {
    const animInfos = [];
    const {
      joints,
      bindposes
    } = skeleton;
    const jointCount = joints.length;

    const clipData = _skeletalAnimationDataHub.SkelAnimDataHub.getOrExtract(clip);

    for (let j = 0; j < jointCount; j++) {
      let animPath = joints[j];
      let source = clipData.data[animPath];
      let animNode = skinningRoot.getChildByPath(animPath);
      let downstream;
      let correctionPath;

      while (!source) {
        const idx = animPath.lastIndexOf('/');
        animPath = animPath.substring(0, idx);
        source = clipData.data[animPath];

        if (animNode) {
          if (!downstream) {
            downstream = new _index3.Mat4();
          }

          _index3.Mat4.fromRTS(m4_1, animNode.rotation, animNode.position, animNode.scale);

          _index3.Mat4.multiply(downstream, m4_1, downstream);

          animNode = animNode.parent;
        } else {
          // record the nearest curve path if no downstream pose is present
          correctionPath = animPath;
        }

        if (idx < 0) {
          break;
        }
      } // the default behavior, just use the bindpose for current joint directly


      let bindposeIdx = j;
      let bindposeCorrection;
      /**
       * It is regularly observed that developers may choose to delete the whole
       * skeleton node tree for skinning models that only use baked animations
       * as an effective optimization strategy (substantial improvements on both
       * package size and runtime efficiency).
       *
       * This becomes troublesome in some cases during baking though, e.g. when a
       * skeleton joint node is not directly controlled by any animation curve,
       * but its parent nodes are. Due to lack of proper downstream default pose,
       * the joint transform can not be calculated accurately.
       *
       * We address this issue by employing some pragmatic approximation.
       * Specifically, by multiplying the bindpose of the joint corresponding to
       * the nearest curve, instead of the actual target joint. This effectively
       * merges the skinning influence of the 'incomplete' joint into its nearest
       * parent with accurate transform data.
       * It gives more visually-plausible results compared to the naive approach
       * for most cases we've covered.
       */

      if (correctionPath !== undefined && source) {
        // just use the previous joint if the exact path is not found
        bindposeIdx = j - 1;

        for (let t = 0; t < jointCount; t++) {
          if (joints[t] === correctionPath) {
            bindposeIdx = t;
            bindposeCorrection = new _index3.Mat4();

            _index3.Mat4.multiply(bindposeCorrection, bindposes[t], skeleton.inverseBindposes[j]);

            break;
          }
        }
      }

      animInfos.push({
        curveData: source && source.worldMatrix.values,
        downstream,
        bindposeIdx,
        bindposeCorrection
      });
    }

    return animInfos;
  }

}

exports.JointTexturePool = JointTexturePool;

class JointAnimationInfo {
  // per node
  constructor(device) {
    this._pool = new Map();
    this._device = void 0;
    this._device = device;
  }

  getData(nodeID = '-1') {
    const res = this._pool.get(nodeID);

    if (res) {
      return res;
    }

    const buffer = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.UNIFORM | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, _define.UBOSkinningAnimation.SIZE, _define.UBOSkinningAnimation.SIZE));

    const data = new Float32Array([0, 0, 0, 0]);
    buffer.update(data);
    const info = {
      buffer,
      data,
      dirty: false
    };

    this._pool.set(nodeID, info);

    return info;
  }

  destroy(nodeID) {
    const info = this._pool.get(nodeID);

    if (!info) {
      return;
    }

    info.buffer.destroy();

    this._pool.delete(nodeID);
  }

  switchClip(info, clip) {
    info.data[0] = 0;
    info.buffer.update(info.data);
    info.dirty = false;
    return info;
  }

  clear() {
    for (const info of this._pool.values()) {
      info.buffer.destroy();
    }

    this._pool.clear();
  }

}

exports.JointAnimationInfo = JointAnimationInfo;