System.register("q-bundled:///fs/cocos/dragon-bones/ArmatureCache.js", ["@cocos/dragonbones-js", "./CCFactory.js"], function (_export, _context) {
  "use strict";

  var Matrix, CCFactory, MaxCacheTime, FrameTime, _vertices, _indices, _boneInfoOffset, _vertexOffset, _indexOffset, _vfOffset, _preTexUrl, _preBlendMode, _segVCount, _segICount, _segOffset, _colorOffset, _preColor, _x, _y, AnimationCache, ArmatureCache;

  return {
    setters: [function (_cocosDragonbonesJs) {
      Matrix = _cocosDragonbonesJs.Matrix;
    }, function (_CCFactoryJs) {
      CCFactory = _CCFactoryJs.CCFactory;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module dragonBones
       */
      MaxCacheTime = 30;
      FrameTime = 1 / 60;
      _vertices = [];
      _indices = [];
      _boneInfoOffset = 0;
      _vertexOffset = 0;
      _indexOffset = 0;
      _vfOffset = 0;
      _preTexUrl = null;
      _preBlendMode = null;
      _segVCount = 0;
      _segICount = 0;
      _segOffset = 0;
      _colorOffset = 0;
      _preColor = 0;

      // Cache all frames in an animation
      _export("AnimationCache", AnimationCache = /*#__PURE__*/function () {
        function AnimationCache() {
          this._privateMode = false;
          this._inited = false;
          this._invalid = true;
          this._enableCacheAttachedInfo = false;
          this.frames = [];
          this.totalTime = 0;
          this.isCompleted = false;
          this._frameIdx = -1;
          this._armatureInfo = null;
          this._animationName = null;
          this._tempSegments = null;
          this._tempColors = null;
          this._tempBoneInfos = null;
        }

        var _proto = AnimationCache.prototype;

        _proto.init = function init(armatureInfo, animationName) {
          this._inited = true;
          this._armatureInfo = armatureInfo;
          this._animationName = animationName;
        } // Clear texture quote.
        ;

        _proto.clear = function clear() {
          this._inited = false;

          for (var i = 0, n = this.frames.length; i < n; i++) {
            var frame = this.frames[i];
            frame.segments.length = 0;
          }

          this.invalidAllFrame();
        };

        _proto.begin = function begin() {
          if (!this._invalid) return;
          var armatureInfo = this._armatureInfo;
          var curAnimationCache = armatureInfo.curAnimationCache;

          if (curAnimationCache && curAnimationCache !== this) {
            if (this._privateMode) {
              curAnimationCache.invalidAllFrame();
            } else {
              curAnimationCache.updateToFrame();
            }
          }

          var armature = armatureInfo.armature;
          var animation = armature.animation;
          animation.play(this._animationName, 1);
          armatureInfo.curAnimationCache = this;
          this._invalid = false;
          this._frameIdx = -1;
          this.totalTime = 0;
          this.isCompleted = false;
        };

        _proto.end = function end() {
          if (!this._needToUpdate()) {
            this._armatureInfo.curAnimationCache = null;
            this.frames.length = this._frameIdx + 1;
            this.isCompleted = true;
          }
        };

        _proto._needToUpdate = function _needToUpdate(toFrameIdx) {
          var armatureInfo = this._armatureInfo;
          var armature = armatureInfo.armature;
          var animation = armature.animation;
          return !animation.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx === undefined || this._frameIdx < toFrameIdx);
        };

        _proto.updateToFrame = function updateToFrame(toFrameIdx) {
          if (!this._inited) return;
          this.begin();
          if (!this._needToUpdate(toFrameIdx)) return;
          var armatureInfo = this._armatureInfo;
          var armature = armatureInfo.armature;

          do {
            // Solid update frame rate 1/60.
            armature.advanceTime(FrameTime);
            this._frameIdx++;

            this._updateFrame(armature, this._frameIdx);

            this.totalTime += FrameTime;
          } while (this._needToUpdate(toFrameIdx));

          this.end();
        };

        _proto.isInited = function isInited() {
          return this._inited;
        };

        _proto.isInvalid = function isInvalid() {
          return this._invalid;
        };

        _proto.invalidAllFrame = function invalidAllFrame() {
          this.isCompleted = false;
          this._invalid = true;
        };

        _proto.updateAllFrame = function updateAllFrame() {
          this.invalidAllFrame();
          this.updateToFrame();
        };

        _proto.enableCacheAttachedInfo = function enableCacheAttachedInfo() {
          if (!this._enableCacheAttachedInfo) {
            this._enableCacheAttachedInfo = true;
            this.invalidAllFrame();
          }
        };

        _proto._updateFrame = function _updateFrame(armature, index) {
          _vfOffset = 0;
          _boneInfoOffset = 0;
          _indexOffset = 0;
          _vertexOffset = 0;
          _preTexUrl = null;
          _preBlendMode = null;
          _segVCount = 0;
          _segICount = 0;
          _segOffset = 0;
          _colorOffset = 0;
          _preColor = 0;
          this.frames[index] = this.frames[index] || {
            segments: [],
            colors: [],
            boneInfos: [],
            vertices: null,
            uintVert: null,
            indices: null
          };
          var frame = this.frames[index];
          var segments = this._tempSegments = frame.segments;
          var colors = this._tempColors = frame.colors;
          var boneInfos = this._tempBoneInfos = frame.boneInfos;

          this._traverseArmature(armature, 1.0); // At last must handle pre color and segment.
          // Because vertex count will right at the end.
          // Handle pre color.


          if (_colorOffset > 0) {
            colors[_colorOffset - 1].vfOffset = _vfOffset;
          }

          colors.length = _colorOffset;
          boneInfos.length = _boneInfoOffset; // Handle pre segment

          var preSegOffset = _segOffset - 1;

          if (preSegOffset >= 0) {
            if (_segICount > 0) {
              var preSegInfo = segments[preSegOffset];
              preSegInfo.indexCount = _segICount;
              preSegInfo.vfCount = _segVCount * 5;
              preSegInfo.vertexCount = _segVCount;
              segments.length = _segOffset;
            } else {
              segments.length = _segOffset - 1;
            }
          } // Discard all segments.


          if (segments.length === 0) return; // Fill vertices

          var vertices = frame.vertices;
          var uintVert = frame.uintVert;

          if (!vertices || vertices.length < _vfOffset) {
            vertices = frame.vertices = new Float32Array(_vfOffset);
            uintVert = frame.uintVert = new Uint32Array(vertices.buffer);
          }

          for (var i = 0, j = 0; i < _vfOffset;) {
            vertices[i++] = _vertices[j++]; // x

            vertices[i++] = _vertices[j++]; // y

            vertices[i++] = _vertices[j++]; // u

            vertices[i++] = _vertices[j++]; // v

            uintVert[i++] = _vertices[j++]; // color
          } // Fill indices


          var indices = frame.indices;

          if (!indices || indices.length < _indexOffset) {
            indices = frame.indices = new Uint16Array(_indexOffset);
          }

          for (var _i = 0; _i < _indexOffset; _i++) {
            indices[_i] = _indices[_i];
          }

          frame.vertices = vertices;
          frame.uintVert = uintVert;
          frame.indices = indices;
        };

        _proto._traverseArmature = function _traverseArmature(armature, parentOpacity) {
          var colors = this._tempColors;
          var segments = this._tempSegments;
          var boneInfos = this._tempBoneInfos;
          var gVertices = _vertices;
          var gIndices = _indices;
          var slots = armature._slots;
          var slotVertices;
          var slotIndices;
          var slot;
          var slotMatrix;
          var slotColor;
          var colorVal;
          var texture;
          var preSegOffset;
          var preSegInfo;
          var bones = armature._bones;

          if (this._enableCacheAttachedInfo) {
            for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
              var bone = bones[i];
              var boneInfo = boneInfos[_boneInfoOffset];

              if (!boneInfo) {
                boneInfo = boneInfos[_boneInfoOffset] = {
                  globalTransformMatrix: new Matrix()
                };
              }

              var boneMat = bone.globalTransformMatrix;
              var cacheBoneMat = boneInfo.globalTransformMatrix;
              cacheBoneMat.copyFrom(boneMat);
            }
          }

          for (var _i2 = 0, _l = slots.length; _i2 < _l; _i2++) {
            slot = slots[_i2];
            if (!slot._visible || !slot._displayData) continue;
            slot.updateWorldMatrix();
            slotColor = slot._color;

            if (slot.childArmature) {
              this._traverseArmature(slot.childArmature, parentOpacity * slotColor.a / 255);

              continue;
            }

            texture = slot.getTexture();
            if (!texture) continue;

            if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== slot._blendMode) {
              _preTexUrl = texture.nativeUrl;
              _preBlendMode = slot._blendMode; // Handle pre segment.

              preSegOffset = _segOffset - 1;

              if (preSegOffset >= 0) {
                if (_segICount > 0) {
                  preSegInfo = segments[preSegOffset];
                  preSegInfo.indexCount = _segICount;
                  preSegInfo.vertexCount = _segVCount;
                  preSegInfo.vfCount = _segVCount * 5;
                } else {
                  // Discard pre segment.
                  _segOffset--;
                }
              } // Handle now segment.


              segments[_segOffset] = {
                tex: texture,
                blendMode: slot._blendMode,
                indexCount: 0,
                vertexCount: 0,
                vfCount: 0
              };
              _segOffset++;
              _segICount = 0;
              _segVCount = 0;
            }

            colorVal = (slotColor.a * parentOpacity << 24 >>> 0) + (slotColor.b << 16) + (slotColor.g << 8) + slotColor.r;

            if (_preColor !== colorVal) {
              _preColor = colorVal;

              if (_colorOffset > 0) {
                colors[_colorOffset - 1].vfOffset = _vfOffset;
              }

              colors[_colorOffset++] = {
                r: slotColor.r,
                g: slotColor.g,
                b: slotColor.b,
                a: slotColor.a * parentOpacity,
                vfOffset: 0
              };
            }

            slotVertices = slot._localVertices;
            slotIndices = slot._indices;
            slotMatrix = slot._worldMatrix;

            for (var j = 0, vl = slotVertices.length; j < vl;) {
              _x = slotVertices[j++];
              _y = slotVertices[j++];
              gVertices[_vfOffset++] = _x * slotMatrix.m00 + _y * slotMatrix.m04 + slotMatrix.m12;
              gVertices[_vfOffset++] = _x * slotMatrix.m01 + _y * slotMatrix.m05 + slotMatrix.m13;
              gVertices[_vfOffset++] = slotVertices[j++];
              gVertices[_vfOffset++] = slotVertices[j++];
              gVertices[_vfOffset++] = colorVal;
            } // This place must use segment vertex count to calculate vertex offset.
            // Assembler will calculate vertex offset again for different segment.


            for (var ii = 0, il = slotIndices.length; ii < il; ii++) {
              gIndices[_indexOffset++] = _segVCount + slotIndices[ii];
            }

            _vertexOffset = _vfOffset / 5;
            _segICount += slotIndices.length;
            _segVCount += slotVertices.length / 4;
          }
        };

        return AnimationCache;
      }());

      _export("ArmatureCache", ArmatureCache = /*#__PURE__*/function () {
        function ArmatureCache() {
          this._privateMode = false;
          this._animationPool = {};
          this._armatureCache = {};
        }

        var _proto2 = ArmatureCache.prototype;

        _proto2.enablePrivateMode = function enablePrivateMode() {
          this._privateMode = true;
        } // If cache is private, cache will be destroy when dragonbones node destroy.
        ;

        _proto2.dispose = function dispose() {
          for (var _key in this._armatureCache) {
            var armatureInfo = this._armatureCache[_key];

            if (armatureInfo) {
              var armature = armatureInfo.armature;
              if (armature) armature.dispose();
            }
          }

          this._armatureCache = {};
          this._animationPool = {};
        };

        _proto2._removeArmature = function _removeArmature(armatureKey) {
          var armatureInfo = this._armatureCache[armatureKey];
          var animationsCache = armatureInfo.animationsCache;

          for (var aniKey in animationsCache) {
            // Clear cache texture, and put cache into pool.
            // No need to create TypedArray next time.
            var animationCache = animationsCache[aniKey];
            if (!animationCache) continue;
            this._animationPool[armatureKey + "#" + aniKey] = animationCache;
            animationCache.clear();
          }

          var armature = armatureInfo.armature;
          if (armature) armature.dispose();
          delete this._armatureCache[armatureKey];
        } // When db assets be destroy, remove armature from db cache.
        ;

        _proto2.resetArmature = function resetArmature(uuid) {
          for (var armatureKey in this._armatureCache) {
            if (armatureKey.indexOf(uuid) === -1) continue;

            this._removeArmature(armatureKey);
          }
        };

        _proto2.getArmatureCache = function getArmatureCache(armatureName, armatureKey, atlasUUID) {
          var armatureInfo = this._armatureCache[armatureKey];
          var armature;

          if (!armatureInfo) {
            var factory = CCFactory.getInstance();
            var proxy = factory.buildArmatureDisplay(armatureName, armatureKey, '', atlasUUID);
            if (!proxy || !proxy._armature) return null;
            armature = proxy._armature; // If armature has child armature, can not be cache, because it's
            // animation data can not be precompute.

            if (!ArmatureCache.canCache(armature)) {
              armature.dispose();
              return null;
            }

            this._armatureCache[armatureKey] = {
              armature: armature,
              // Cache all kinds of animation frame.
              // When armature is dispose, clear all animation cache.
              animationsCache: {},
              curAnimationCache: null
            };
          } else {
            armature = armatureInfo.armature;
          }

          return armature;
        };

        _proto2.getAnimationCache = function getAnimationCache(armatureKey, animationName) {
          var armatureInfo = this._armatureCache[armatureKey];
          if (!armatureInfo) return null;
          var animationsCache = armatureInfo.animationsCache;
          return animationsCache[animationName];
        };

        _proto2.initAnimationCache = function initAnimationCache(armatureKey, animationName) {
          if (!animationName) return null;
          var armatureInfo = this._armatureCache[armatureKey];
          var armature = armatureInfo && armatureInfo.armature;
          if (!armature) return null;
          var animation = armature.animation;
          var hasAni = animation.hasAnimation(animationName);
          if (!hasAni) return null;
          var animationsCache = armatureInfo.animationsCache;
          var animationCache = animationsCache[animationName];

          if (!animationCache) {
            // If cache exist in pool, then just use it.
            var poolKey = armatureKey + "#" + animationName;
            animationCache = this._animationPool[poolKey];

            if (animationCache) {
              delete this._animationPool[poolKey];
            } else {
              animationCache = new AnimationCache();
              animationCache._privateMode = this._privateMode;
            }

            animationCache.init(armatureInfo, animationName);
            animationsCache[animationName] = animationCache;
          }

          return animationCache;
        };

        _proto2.invalidAnimationCache = function invalidAnimationCache(armatureKey) {
          var armatureInfo = this._armatureCache[armatureKey];
          var armature = armatureInfo && armatureInfo.armature;
          if (!armature) return;
          var animationsCache = armatureInfo.animationsCache;

          for (var aniKey in animationsCache) {
            var animationCache = animationsCache[aniKey];
            animationCache.invalidAllFrame();
          }
        };

        _proto2.updateAnimationCache = function updateAnimationCache(armatureKey, animationName) {
          if (animationName) {
            var animationCache = this.initAnimationCache(armatureKey, animationName);
            if (!animationCache) return;
            animationCache.updateAllFrame();
          } else {
            var armatureInfo = this._armatureCache[armatureKey];
            var armature = armatureInfo && armatureInfo.armature;
            if (!armature) return;
            var animationsCache = armatureInfo.animationsCache;

            for (var aniKey in animationsCache) {
              var _animationCache = animationsCache[aniKey];

              _animationCache.updateAllFrame();
            }
          }
        };

        ArmatureCache.canCache = function canCache(armature) {
          var slots = armature._slots;

          for (var i = 0, l = slots.length; i < l; i++) {
            var slot = slots[i];

            if (slot.childArmature) {
              return false;
            }
          }

          return true;
        };

        return ArmatureCache;
      }());

      ArmatureCache.FrameTime = FrameTime;
      ArmatureCache.sharedCache = new ArmatureCache();
    }
  };
});