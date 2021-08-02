System.register("q-bundled:///fs/cocos/3d/models/skinning-model.js", ["../../core/geometry/index.js", "../../core/gfx/index.js", "../../core/math/index.js", "../../core/pipeline/define.js", "../../core/renderer/scene/model.js", "../skeletal-animation/skeletal-animation-utils.js", "./morph-model.js", "../../core/renderer/core/memory-pools.js", "../../core/animation/skeletal-animation-utils.js"], function (_export, _context) {
  "use strict";

  var AABB, BufferUsageBit, MemoryUsageBit, BufferInfo, Mat4, Vec3, UBOSkinning, ModelType, uploadJointData, MorphModel, AABBPool, AABBView, deleteTransform, getTransform, getWorldMatrix, myPatches, v3_min, v3_max, v3_1, v3_2, m4_1, ab_1, SkinningModel;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function getRelevantBuffers(outIndices, outBuffers, jointMaps, targetJoint) {
    for (var i = 0; i < jointMaps.length; i++) {
      var idxMap = jointMaps[i];
      var index = -1;

      for (var j = 0; j < idxMap.length; j++) {
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

  return {
    setters: [function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_coreGfxIndexJs) {
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_corePipelineDefineJs) {
      UBOSkinning = _corePipelineDefineJs.UBOSkinning;
    }, function (_coreRendererSceneModelJs) {
      ModelType = _coreRendererSceneModelJs.ModelType;
    }, function (_skeletalAnimationSkeletalAnimationUtilsJs) {
      uploadJointData = _skeletalAnimationSkeletalAnimationUtilsJs.uploadJointData;
    }, function (_morphModelJs) {
      MorphModel = _morphModelJs.MorphModel;
    }, function (_coreRendererCoreMemoryPoolsJs) {
      AABBPool = _coreRendererCoreMemoryPoolsJs.AABBPool;
      AABBView = _coreRendererCoreMemoryPoolsJs.AABBView;
    }, function (_coreAnimationSkeletalAnimationUtilsJs) {
      deleteTransform = _coreAnimationSkeletalAnimationUtilsJs.deleteTransform;
      getTransform = _coreAnimationSkeletalAnimationUtilsJs.getTransform;
      getWorldMatrix = _coreAnimationSkeletalAnimationUtilsJs.getWorldMatrix;
    }],
    execute: function () {
      myPatches = [{
        name: 'CC_USE_SKINNING',
        value: true
      }];
      v3_min = new Vec3();
      v3_max = new Vec3();
      v3_1 = new Vec3();
      v3_2 = new Vec3();
      m4_1 = new Mat4();
      ab_1 = new AABB();
      /**
       * @en
       * The skinning model that is using real-time pose calculation.
       * @zh
       * 实时计算动画的蒙皮模型。
       */

      _export("SkinningModel", SkinningModel = /*#__PURE__*/function (_MorphModel) {
        _inheritsLoose(SkinningModel, _MorphModel);

        function SkinningModel() {
          var _this;

          _this = _MorphModel.call(this) || this;
          _this.uploadAnimation = null;
          _this._buffers = [];
          _this._dataArray = [];
          _this._joints = [];
          _this._bufferIndices = null;
          _this.type = ModelType.SKINNING;
          return _this;
        }

        var _proto = SkinningModel.prototype;

        _proto.destroy = function destroy() {
          this.bindSkeleton();

          if (this._buffers.length) {
            for (var i = 0; i < this._buffers.length; i++) {
              this._buffers[i].destroy();
            }

            this._buffers.length = 0;
          }

          _MorphModel.prototype.destroy.call(this);
        };

        _proto.bindSkeleton = function bindSkeleton(skeleton, skinningRoot, mesh) {
          if (skeleton === void 0) {
            skeleton = null;
          }

          if (skinningRoot === void 0) {
            skinningRoot = null;
          }

          if (mesh === void 0) {
            mesh = null;
          }

          for (var i = 0; i < this._joints.length; i++) {
            deleteTransform(this._joints[i].target);
          }

          this._bufferIndices = null;
          this._joints.length = 0;

          if (!skeleton || !skinningRoot || !mesh) {
            return;
          }

          this.transform = skinningRoot;
          var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
          var jointMaps = mesh.struct.jointMaps;

          this._ensureEnoughBuffers(jointMaps && jointMaps.length || 1);

          this._bufferIndices = mesh.jointBufferIndices;

          for (var index = 0; index < skeleton.joints.length; index++) {
            var bound = boneSpaceBounds[index];
            var target = skinningRoot.getChildByPath(skeleton.joints[index]);

            if (!bound || !target) {
              continue;
            }

            var transform = getTransform(target, skinningRoot);
            var bindpose = skeleton.bindposes[index];
            var indices = [];
            var buffers = [];

            if (!jointMaps) {
              indices.push(index);
              buffers.push(0);
            } else {
              getRelevantBuffers(indices, buffers, jointMaps, index);
            }

            this._joints.push({
              indices: indices,
              buffers: buffers,
              bound: bound,
              target: target,
              bindpose: bindpose,
              transform: transform
            });
          }
        };

        _proto.updateTransform = function updateTransform(stamp) {
          var root = this.transform; // @ts-expect-error TS2445

          if (root.hasChangedFlags || root._dirtyFlags) {
            root.updateWorldTransform();
            this._transformUpdated = true;
          } // update bounds


          Vec3.set(v3_min, Infinity, Infinity, Infinity);
          Vec3.set(v3_max, -Infinity, -Infinity, -Infinity);

          for (var i = 0; i < this._joints.length; i++) {
            var _this$_joints$i = this._joints[i],
                bound = _this$_joints$i.bound,
                transform = _this$_joints$i.transform;
            var worldMatrix = getWorldMatrix(transform, stamp);
            AABB.transform(ab_1, bound, worldMatrix);
            ab_1.getBoundary(v3_1, v3_2);
            Vec3.min(v3_min, v3_min, v3_1);
            Vec3.max(v3_max, v3_max, v3_2);
          }

          var worldBounds = this._worldBounds;

          if (this._modelBounds && worldBounds) {
            AABB.fromPoints(this._modelBounds, v3_min, v3_max); // @ts-expect-error TS2445

            this._modelBounds.transform(root._mat, root._pos, root._rot, root._scale, this._worldBounds);

            AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
            AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
          }
        };

        _proto.updateUBOs = function updateUBOs(stamp) {
          _MorphModel.prototype.updateUBOs.call(this, stamp);

          for (var i = 0; i < this._joints.length; i++) {
            var _this$_joints$i2 = this._joints[i],
                indices = _this$_joints$i2.indices,
                buffers = _this$_joints$i2.buffers,
                transform = _this$_joints$i2.transform,
                bindpose = _this$_joints$i2.bindpose;
            Mat4.multiply(m4_1, transform.world, bindpose);

            for (var b = 0; b < buffers.length; b++) {
              uploadJointData(this._dataArray[buffers[b]], indices[b] * 12, m4_1, i === 0);
            }
          }

          for (var _b = 0; _b < this._buffers.length; _b++) {
            this._buffers[_b].update(this._dataArray[_b]);
          }

          return true;
        };

        _proto.initSubModel = function initSubModel(idx, subMeshData, mat) {
          var original = subMeshData.vertexBuffers;
          var iaInfo = subMeshData.iaInfo;
          iaInfo.vertexBuffers = subMeshData.jointMappedBuffers;

          _MorphModel.prototype.initSubModel.call(this, idx, subMeshData, mat);

          iaInfo.vertexBuffers = original;
        };

        _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
          var superMacroPatches = _MorphModel.prototype.getMacroPatches.call(this, subModelIndex);

          if (superMacroPatches) {
            return myPatches.concat(superMacroPatches);
          }

          return myPatches;
        };

        _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
          _MorphModel.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

          var buffer = this._buffers[this._bufferIndices[submodelIdx]];

          if (buffer) {
            descriptorSet.bindBuffer(UBOSkinning.BINDING, buffer);
          }
        };

        _proto._ensureEnoughBuffers = function _ensureEnoughBuffers(count) {
          for (var i = 0; i < count; i++) {
            if (!this._buffers[i]) {
              this._buffers[i] = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOSkinning.SIZE, UBOSkinning.SIZE));
            }

            if (!this._dataArray[i]) {
              this._dataArray[i] = new Float32Array(UBOSkinning.COUNT);
            }
          }
        };

        return SkinningModel;
      }(MorphModel));
    }
  };
});