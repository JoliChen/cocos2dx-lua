System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-utils.js", ["../../../../virtual/internal%253Aconstants.js", "./skeletal-animation-data-hub.js", "../../core/animation/transform-utils.js", "../../core/geometry/index.js", "../../core/gfx/index.js", "../../core/math/index.js", "../../core/pipeline/define.js", "../../core/renderer/core/sampler-lib.js", "../../core/renderer/core/texture-buffer-pool.js"], function (_export, _context) {
  "use strict";

  var EDITOR, SkelAnimDataHub, getWorldTransformUntilRoot, AABB, Address, BufferUsageBit, Filter, Format, FormatInfos, MemoryUsageBit, Feature, BufferInfo, Mat4, Quat, Vec3, UBOSkinningAnimation, genSamplerHash, TextureBufferPool, uploadJointData, MINIMUM_JOINT_TEXTURE_SIZE, dq_0, dq_1, v3_1, qt_1, v3_2, jointTextureSamplerHash, v3_3, v3_4, v3_min, v3_max, m4_1, m4_2, ab_1, Inf, JointTexturePool, JointAnimationInfo;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  // have to be multiples of 12
  function selectJointsMediumFormat(device) {
    if (device.hasFeature(Feature.TEXTURE_FLOAT)) {
      return Format.RGBA32F;
    }

    return Format.RGBA8;
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

  // Dual Quaternion Skinning
  function uploadJointDataDQS(out, base, mat, firstBone) {
    Mat4.toRTS(mat, qt_1, v3_1, v3_2); // sign consistency

    if (firstBone) {
      Quat.copy(dq_0, qt_1);
    } else if (Quat.dot(dq_0, qt_1) < 0) {
      Quat.multiplyScalar(qt_1, qt_1, -1);
    } // conversion


    Quat.set(dq_1, v3_1.x, v3_1.y, v3_1.z, 0);
    Quat.multiplyScalar(dq_1, Quat.multiply(dq_1, dq_1, qt_1), 0.5); // upload

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
    var formatScale = 4 / Math.sqrt(formatSize);
    return Math.ceil(Math.max(MINIMUM_JOINT_TEXTURE_SIZE * formatScale, targetLength) / 12) * 12;
  }

  _export("selectJointsMediumFormat", selectJointsMediumFormat);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_skeletalAnimationDataHubJs) {
      SkelAnimDataHub = _skeletalAnimationDataHubJs.SkelAnimDataHub;
    }, function (_coreAnimationTransformUtilsJs) {
      getWorldTransformUntilRoot = _coreAnimationTransformUtilsJs.getWorldTransformUntilRoot;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_coreGfxIndexJs) {
      Address = _coreGfxIndexJs.Address;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      Filter = _coreGfxIndexJs.Filter;
      Format = _coreGfxIndexJs.Format;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      Feature = _coreGfxIndexJs.Feature;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Quat = _coreMathIndexJs.Quat;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_corePipelineDefineJs) {
      UBOSkinningAnimation = _corePipelineDefineJs.UBOSkinningAnimation;
    }, function (_coreRendererCoreSamplerLibJs) {
      genSamplerHash = _coreRendererCoreSamplerLibJs.genSamplerHash;
    }, function (_coreRendererCoreTextureBufferPoolJs) {
      TextureBufferPool = _coreRendererCoreTextureBufferPoolJs.TextureBufferPool;
    }],
    execute: function () {
      // change here and cc-skinning.chunk to use other skinning algorithms
      _export("uploadJointData", uploadJointData = uploadJointDataLBS);

      _export("MINIMUM_JOINT_TEXTURE_SIZE", MINIMUM_JOINT_TEXTURE_SIZE = EDITOR ? 2040 : 480);

      dq_0 = new Quat();
      dq_1 = new Quat();
      v3_1 = new Vec3();
      qt_1 = new Quat();
      v3_2 = new Vec3();

      _export("jointTextureSamplerHash", jointTextureSamplerHash = genSamplerHash([Filter.POINT, Filter.POINT, Filter.NONE, Address.CLAMP, Address.CLAMP, Address.CLAMP]));

      v3_3 = new Vec3();
      v3_4 = new Vec3();
      v3_min = new Vec3();
      v3_max = new Vec3();
      m4_1 = new Mat4();
      m4_2 = new Mat4();
      ab_1 = new AABB();
      // Have to use some big number to replace the actual 'Infinity'.
      // For (Infinity - Infinity) evaluates to NaN
      Inf = Number.MAX_SAFE_INTEGER;

      _export("JointTexturePool", JointTexturePool = /*#__PURE__*/function () {
        function JointTexturePool(device) {
          this._device = void 0;
          this._pool = void 0;
          this._textureBuffers = new Map();
          this._formatSize = void 0;
          this._pixelsPerJoint = void 0;
          this._customPool = void 0;
          this._chunkIdxMap = new Map();
          this._device = device;
          var format = selectJointsMediumFormat(this._device);
          this._formatSize = FormatInfos[format].size;
          this._pixelsPerJoint = 48 / this._formatSize;
          this._pool = new TextureBufferPool(device);

          this._pool.initialize({
            format: format,
            roundUpFn: roundUpTextureSize
          });

          this._customPool = new TextureBufferPool(device);

          this._customPool.initialize({
            format: format,
            roundUpFn: roundUpTextureSize
          });
        }

        var _proto = JointTexturePool.prototype;

        _proto.clear = function clear() {
          this._pool.destroy();

          this._textureBuffers.clear();
        };

        _proto.registerCustomTextureLayouts = function registerCustomTextureLayouts(layouts) {
          for (var i = 0; i < layouts.length; i++) {
            var layout = layouts[i];

            var chunkIdx = this._customPool.createChunk(layout.textureLength);

            for (var j = 0; j < layout.contents.length; j++) {
              var content = layout.contents[j];
              var skeleton = content.skeleton;

              this._chunkIdxMap.set(skeleton, chunkIdx); // include default pose too


              for (var k = 0; k < content.clips.length; k++) {
                var clip = content.clips[k];

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
        ;

        _proto.getDefaultPoseTexture = function getDefaultPoseTexture(skeleton, mesh, skinningRoot) {
          var hash = skeleton.hash ^ 0; // may not equal to skeleton.hash

          var texture = this._textureBuffers.get(hash) || null;

          if (texture && texture.bounds.has(mesh.hash)) {
            texture.refCount++;
            return texture;
          }

          var joints = skeleton.joints,
              bindposes = skeleton.bindposes;
          var textureBuffer = null;
          var buildTexture = false;
          var jointCount = joints.length;

          if (!texture) {
            var bufSize = jointCount * 12;

            var customChunkIdx = this._chunkIdxMap.get(hash);

            var handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

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
              handle: handle
            };
            textureBuffer = new Float32Array(bufSize);
            buildTexture = true;
          } else {
            texture.refCount++;
          }

          Vec3.set(v3_min, Inf, Inf, Inf);
          Vec3.set(v3_max, -Inf, -Inf, -Inf);
          var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);

          for (var j = 0, offset = 0; j < jointCount; j++, offset += 12) {
            var node = skinningRoot.getChildByPath(joints[j]);
            var mat = node ? getWorldTransformUntilRoot(node, skinningRoot, m4_1) : skeleton.inverseBindposes[j];
            var bound = boneSpaceBounds[j];

            if (bound) {
              AABB.transform(ab_1, bound, mat);
              ab_1.getBoundary(v3_3, v3_4);
              Vec3.min(v3_min, v3_min, v3_3);
              Vec3.max(v3_max, v3_max, v3_4);
            }

            if (buildTexture) {
              if (node) {
                Mat4.multiply(mat, mat, bindposes[j]);
              }

              uploadJointData(textureBuffer, offset, node ? mat : Mat4.IDENTITY, j === 0);
            }
          }

          var bounds = [new AABB()];
          texture.bounds.set(mesh.hash, bounds);
          AABB.fromPoints(bounds[0], v3_min, v3_max);

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
        ;

        _proto.getSequencePoseTexture = function getSequencePoseTexture(skeleton, clip, mesh, skinningRoot) {
          var hash = skeleton.hash ^ clip.hash;
          var texture = this._textureBuffers.get(hash) || null;

          if (texture && texture.bounds.has(mesh.hash)) {
            texture.refCount++;
            return texture;
          }

          var joints = skeleton.joints,
              bindposes = skeleton.bindposes;
          var clipData = SkelAnimDataHub.getOrExtract(clip);
          var frames = clipData.info.frames;
          var textureBuffer = null;
          var buildTexture = false;
          var jointCount = joints.length;

          if (!texture) {
            var bufSize = jointCount * 12 * frames;

            var customChunkIdx = this._chunkIdxMap.get(hash);

            var handle = customChunkIdx !== undefined ? this._customPool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT, customChunkIdx) : this._pool.alloc(bufSize * Float32Array.BYTES_PER_ELEMENT);

            if (!handle) {
              return null;
            }

            var animInfos = this._createAnimInfos(skeleton, clip, skinningRoot);

            texture = {
              pixelOffset: handle.start / this._formatSize,
              refCount: 1,
              bounds: new Map(),
              skeletonHash: skeleton.hash,
              clipHash: clip.hash,
              readyToBeDeleted: false,
              handle: handle,
              animInfos: animInfos
            };
            textureBuffer = new Float32Array(bufSize);
            buildTexture = true;
          } else {
            texture.refCount++;
          }

          var boneSpaceBounds = mesh.getBoneSpaceBounds(skeleton);
          var bounds = [];
          texture.bounds.set(mesh.hash, bounds);

          for (var f = 0; f < frames; f++) {
            bounds.push(new AABB(Inf, Inf, Inf, -Inf, -Inf, -Inf));
          }

          for (var _f = 0, offset = 0; _f < frames; _f++) {
            var bound = bounds[_f];

            for (var j = 0; j < jointCount; j++, offset += 12) {
              var _j = texture.animInfos[j],
                  curveData = _j.curveData,
                  downstream = _j.downstream,
                  bindposeIdx = _j.bindposeIdx,
                  bindposeCorrection = _j.bindposeCorrection;
              var mat = void 0;
              var transformValid = true;

              if (curveData && downstream) {
                // curve & static two-way combination
                mat = Mat4.multiply(m4_1, curveData[_f], downstream);
              } else if (curveData) {
                // there is a curve directly controlling the joint
                mat = curveData[_f];
              } else if (downstream) {
                // fallback to default pose if no animation curve can be found upstream
                mat = downstream;
              } else {
                // bottom line: render the original mesh as-is
                mat = skeleton.inverseBindposes[bindposeIdx];
                transformValid = false;
              }

              var boneSpaceBound = boneSpaceBounds[j];

              if (boneSpaceBound) {
                var transform = bindposeCorrection ? Mat4.multiply(m4_2, mat, bindposeCorrection) : mat;
                AABB.transform(ab_1, boneSpaceBound, transform);
                ab_1.getBoundary(v3_3, v3_4);
                Vec3.min(bound.center, bound.center, v3_3);
                Vec3.max(bound.halfExtents, bound.halfExtents, v3_4);
              }

              if (buildTexture) {
                if (transformValid) {
                  Mat4.multiply(m4_1, mat, bindposes[bindposeIdx]);
                }

                uploadJointData(textureBuffer, offset, transformValid ? m4_1 : Mat4.IDENTITY, j === 0);
              }
            }

            AABB.fromPoints(bound, bound.center, bound.halfExtents);
          }

          if (buildTexture) {
            this._pool.update(texture.handle, textureBuffer.buffer);

            this._textureBuffers.set(hash, texture);
          }

          return texture;
        };

        _proto.releaseHandle = function releaseHandle(handle) {
          if (handle.refCount > 0) {
            handle.refCount--;
          }

          if (!handle.refCount && handle.readyToBeDeleted) {
            var hash = handle.skeletonHash ^ handle.clipHash;

            var customChunkIdx = this._chunkIdxMap.get(hash);

            (customChunkIdx !== undefined ? this._customPool : this._pool).free(handle.handle);

            if (this._textureBuffers.get(hash) === handle) {
              this._textureBuffers["delete"](hash);
            }
          }
        };

        _proto.releaseSkeleton = function releaseSkeleton(skeleton) {
          var it = this._textureBuffers.values();

          var res = it.next();

          while (!res.done) {
            var handle = res.value;

            if (handle.skeletonHash === skeleton.hash) {
              handle.readyToBeDeleted = true;

              if (handle.refCount) {
                // delete handle record immediately so new allocations with the same asset could work
                this._textureBuffers["delete"](handle.skeletonHash ^ handle.clipHash);
              } else {
                this.releaseHandle(handle);
              }
            }

            res = it.next();
          }
        };

        _proto.releaseAnimationClip = function releaseAnimationClip(clip) {
          var it = this._textureBuffers.values();

          var res = it.next();

          while (!res.done) {
            var handle = res.value;

            if (handle.clipHash === clip.hash) {
              handle.readyToBeDeleted = true;

              if (handle.refCount) {
                // delete handle record immediately so new allocations with the same asset could work
                this._textureBuffers["delete"](handle.skeletonHash ^ handle.clipHash);
              } else {
                this.releaseHandle(handle);
              }
            }

            res = it.next();
          }
        };

        _proto._createAnimInfos = function _createAnimInfos(skeleton, clip, skinningRoot) {
          var animInfos = [];
          var joints = skeleton.joints,
              bindposes = skeleton.bindposes;
          var jointCount = joints.length;
          var clipData = SkelAnimDataHub.getOrExtract(clip);

          for (var j = 0; j < jointCount; j++) {
            var animPath = joints[j];
            var source = clipData.data[animPath];
            var animNode = skinningRoot.getChildByPath(animPath);
            var downstream = void 0;
            var correctionPath = void 0;

            while (!source) {
              var idx = animPath.lastIndexOf('/');
              animPath = animPath.substring(0, idx);
              source = clipData.data[animPath];

              if (animNode) {
                if (!downstream) {
                  downstream = new Mat4();
                }

                Mat4.fromRTS(m4_1, animNode.rotation, animNode.position, animNode.scale);
                Mat4.multiply(downstream, m4_1, downstream);
                animNode = animNode.parent;
              } else {
                // record the nearest curve path if no downstream pose is present
                correctionPath = animPath;
              }

              if (idx < 0) {
                break;
              }
            } // the default behavior, just use the bindpose for current joint directly


            var bindposeIdx = j;
            var bindposeCorrection = void 0;
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

              for (var t = 0; t < jointCount; t++) {
                if (joints[t] === correctionPath) {
                  bindposeIdx = t;
                  bindposeCorrection = new Mat4();
                  Mat4.multiply(bindposeCorrection, bindposes[t], skeleton.inverseBindposes[j]);
                  break;
                }
              }
            }

            animInfos.push({
              curveData: source && source.worldMatrix.values,
              downstream: downstream,
              bindposeIdx: bindposeIdx,
              bindposeCorrection: bindposeCorrection
            });
          }

          return animInfos;
        };

        _createClass(JointTexturePool, [{
          key: "pixelsPerJoint",
          get: // per skeleton per clip
          // hash -> chunkIdx
          function get() {
            return this._pixelsPerJoint;
          }
        }]);

        return JointTexturePool;
      }());

      _export("JointAnimationInfo", JointAnimationInfo = /*#__PURE__*/function () {
        // per node
        function JointAnimationInfo(device) {
          this._pool = new Map();
          this._device = void 0;
          this._device = device;
        }

        var _proto2 = JointAnimationInfo.prototype;

        _proto2.getData = function getData(nodeID) {
          if (nodeID === void 0) {
            nodeID = '-1';
          }

          var res = this._pool.get(nodeID);

          if (res) {
            return res;
          }

          var buffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOSkinningAnimation.SIZE, UBOSkinningAnimation.SIZE));

          var data = new Float32Array([0, 0, 0, 0]);
          buffer.update(data);
          var info = {
            buffer: buffer,
            data: data,
            dirty: false
          };

          this._pool.set(nodeID, info);

          return info;
        };

        _proto2.destroy = function destroy(nodeID) {
          var info = this._pool.get(nodeID);

          if (!info) {
            return;
          }

          info.buffer.destroy();

          this._pool["delete"](nodeID);
        };

        _proto2.switchClip = function switchClip(info, clip) {
          info.data[0] = 0;
          info.buffer.update(info.data);
          info.dirty = false;
          return info;
        };

        _proto2.clear = function clear() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._pool.values()), _step; !(_step = _iterator()).done;) {
            var info = _step.value;
            info.buffer.destroy();
          }

          this._pool.clear();
        };

        return JointAnimationInfo;
      }());
    }
  };
});