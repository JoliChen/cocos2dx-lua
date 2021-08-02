System.register("q-bundled:///fs/cocos/3d/models/baked-skinning-model.js", ["../../core/gfx/index.js", "../../core/pipeline/define.js", "../../core/renderer/core/sampler-lib.js", "../../core/renderer/scene/model.js", "../skeletal-animation/skeletal-animation-utils.js", "./morph-model.js", "../../core/global-exports.js", "../../core/renderer/core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, MemoryUsageBit, BufferInfo, INST_JOINT_ANIM_INFO, UBOSkinningAnimation, UBOSkinningTexture, UNIFORM_JOINT_TEXTURE_BINDING, samplerLib, ModelType, jointTextureSamplerHash, MorphModel, legacyCC, AABBPool, AABBView, myPatches, BakedSkinningModel;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreGfxIndexJs) {
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_corePipelineDefineJs) {
      INST_JOINT_ANIM_INFO = _corePipelineDefineJs.INST_JOINT_ANIM_INFO;
      UBOSkinningAnimation = _corePipelineDefineJs.UBOSkinningAnimation;
      UBOSkinningTexture = _corePipelineDefineJs.UBOSkinningTexture;
      UNIFORM_JOINT_TEXTURE_BINDING = _corePipelineDefineJs.UNIFORM_JOINT_TEXTURE_BINDING;
    }, function (_coreRendererCoreSamplerLibJs) {
      samplerLib = _coreRendererCoreSamplerLibJs.samplerLib;
    }, function (_coreRendererSceneModelJs) {
      ModelType = _coreRendererSceneModelJs.ModelType;
    }, function (_skeletalAnimationSkeletalAnimationUtilsJs) {
      jointTextureSamplerHash = _skeletalAnimationSkeletalAnimationUtilsJs.jointTextureSamplerHash;
    }, function (_morphModelJs) {
      MorphModel = _morphModelJs.MorphModel;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreRendererCoreMemoryPoolsJs) {
      AABBPool = _coreRendererCoreMemoryPoolsJs.AABBPool;
      AABBView = _coreRendererCoreMemoryPoolsJs.AABBView;
    }],
    execute: function () {
      myPatches = [{
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

      _export("BakedSkinningModel", BakedSkinningModel = /*#__PURE__*/function (_MorphModel) {
        _inheritsLoose(BakedSkinningModel, _MorphModel);

        // uninitialized
        function BakedSkinningModel() {
          var _this;

          _this = _MorphModel.call(this) || this;
          _this.uploadedAnim = undefined;
          _this._jointsMedium = void 0;
          _this._skeleton = null;
          _this._mesh = null;
          _this._dataPoolManager = void 0;
          _this._instAnimInfoIdx = -1;
          _this.type = ModelType.BAKED_SKINNING;
          _this._dataPoolManager = legacyCC.director.root.dataPoolManager;
          var jointTextureInfo = new Float32Array(4);

          var animInfo = _this._dataPoolManager.jointAnimationInfo.getData();

          _this._jointsMedium = {
            buffer: null,
            jointTextureInfo: jointTextureInfo,
            animInfo: animInfo,
            texture: null,
            boundsInfo: null
          };
          return _this;
        }

        var _proto = BakedSkinningModel.prototype;

        _proto.destroy = function destroy() {
          this.uploadedAnim = undefined; // uninitialized

          this._jointsMedium.boundsInfo = null;

          if (this._jointsMedium.buffer) {
            this._jointsMedium.buffer.destroy();

            this._jointsMedium.buffer = null;
          }

          this._applyJointTexture();

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

          this._skeleton = skeleton;
          this._mesh = mesh;

          if (!skeleton || !skinningRoot || !mesh) {
            return;
          }

          this.transform = skinningRoot;
          var resMgr = this._dataPoolManager;
          this._jointsMedium.animInfo = resMgr.jointAnimationInfo.getData(skinningRoot.uuid);

          if (!this._jointsMedium.buffer) {
            this._jointsMedium.buffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOSkinningTexture.SIZE, UBOSkinningTexture.SIZE));
          }
        };

        _proto.updateTransform = function updateTransform(stamp) {
          _MorphModel.prototype.updateTransform.call(this, stamp);

          if (!this.uploadedAnim) {
            return;
          }

          var _this$_jointsMedium = this._jointsMedium,
              animInfo = _this$_jointsMedium.animInfo,
              boundsInfo = _this$_jointsMedium.boundsInfo;
          var skelBound = boundsInfo[animInfo.data[0]];
          var worldBounds = this._worldBounds;

          if (worldBounds && skelBound) {
            var node = this.transform; // @ts-expect-error TS2339

            skelBound.transform(node._mat, node._pos, node._rot, node._scale, worldBounds);
            AABBPool.setVec3(this._hWorldBounds, AABBView.CENTER, worldBounds.center);
            AABBPool.setVec3(this._hWorldBounds, AABBView.HALF_EXTENSION, worldBounds.halfExtents);
          }
        } // update fid buffer only when visible
        ;

        _proto.updateUBOs = function updateUBOs(stamp) {
          _MorphModel.prototype.updateUBOs.call(this, stamp);

          var info = this._jointsMedium.animInfo;
          var idx = this._instAnimInfoIdx;

          if (idx >= 0) {
            var view = this.instancedAttributes.views[idx];
            view[0] = info.data[0];
          } else if (info.dirty) {
            info.buffer.update(info.data);
            info.dirty = false;
          }

          return true;
        };

        _proto.uploadAnimation = function uploadAnimation(anim) {
          if (!this._skeleton || !this._mesh || this.uploadedAnim === anim) {
            return;
          }

          this.uploadedAnim = anim;
          var resMgr = this._dataPoolManager;
          var texture = null;

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
        };

        _proto._applyJointTexture = function _applyJointTexture(texture) {
          if (texture === void 0) {
            texture = null;
          }

          var oldTex = this._jointsMedium.texture;

          if (oldTex && oldTex !== texture) {
            this._dataPoolManager.jointTexturePool.releaseHandle(oldTex);
          }

          this._jointsMedium.texture = texture;

          if (!texture) {
            return;
          }

          var _this$_jointsMedium2 = this._jointsMedium,
              buffer = _this$_jointsMedium2.buffer,
              jointTextureInfo = _this$_jointsMedium2.jointTextureInfo;
          jointTextureInfo[0] = texture.handle.texture.width;
          jointTextureInfo[1] = this._skeleton.joints.length;
          jointTextureInfo[2] = texture.pixelOffset + 0.1; // guard against floor() underflow

          jointTextureInfo[3] = 1 / jointTextureInfo[0];
          this.updateInstancedJointTextureInfo();

          if (buffer) {
            buffer.update(jointTextureInfo);
          }

          var tex = texture.handle.texture;

          for (var i = 0; i < this._subModels.length; ++i) {
            var descriptorSet = this._subModels[i].descriptorSet;
            descriptorSet.bindTexture(UNIFORM_JOINT_TEXTURE_BINDING, tex);
          }
        };

        _proto.getMacroPatches = function getMacroPatches(subModelIndex) {
          var patches = _MorphModel.prototype.getMacroPatches.call(this, subModelIndex);

          return patches ? patches.concat(myPatches) : myPatches;
        };

        _proto._updateLocalDescriptors = function _updateLocalDescriptors(submodelIdx, descriptorSet) {
          _MorphModel.prototype._updateLocalDescriptors.call(this, submodelIdx, descriptorSet);

          var _this$_jointsMedium3 = this._jointsMedium,
              buffer = _this$_jointsMedium3.buffer,
              texture = _this$_jointsMedium3.texture,
              animInfo = _this$_jointsMedium3.animInfo;
          descriptorSet.bindBuffer(UBOSkinningTexture.BINDING, buffer);
          descriptorSet.bindBuffer(UBOSkinningAnimation.BINDING, animInfo.buffer);

          if (texture) {
            var sampler = samplerLib.getSampler(this._device, jointTextureSamplerHash);
            descriptorSet.bindTexture(UNIFORM_JOINT_TEXTURE_BINDING, texture.handle.texture);
            descriptorSet.bindSampler(UNIFORM_JOINT_TEXTURE_BINDING, sampler);
          }
        };

        _proto._updateInstancedAttributes = function _updateInstancedAttributes(attributes, pass) {
          _MorphModel.prototype._updateInstancedAttributes.call(this, attributes, pass);

          this._instAnimInfoIdx = this._getInstancedAttributeIndex(INST_JOINT_ANIM_INFO);
          this.updateInstancedJointTextureInfo();
        };

        _proto.updateInstancedJointTextureInfo = function updateInstancedJointTextureInfo() {
          var _this$_jointsMedium4 = this._jointsMedium,
              jointTextureInfo = _this$_jointsMedium4.jointTextureInfo,
              animInfo = _this$_jointsMedium4.animInfo;
          var idx = this._instAnimInfoIdx;

          if (idx >= 0) {
            // update instancing data too
            var view = this.instancedAttributes.views[idx];
            view[0] = animInfo.data[0];
            view[1] = jointTextureInfo[1];
            view[2] = jointTextureInfo[2];
          }
        };

        return BakedSkinningModel;
      }(MorphModel));
    }
  };
});