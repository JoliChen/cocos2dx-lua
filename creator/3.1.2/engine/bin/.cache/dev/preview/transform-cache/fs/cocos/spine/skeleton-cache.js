System.register("q-bundled:///fs/cocos/spine/skeleton-cache.js", ["./track-entry-listeners.js", "./lib/spine-core.js"], function (_export, _context) {
  "use strict";

  var TrackEntryListeners, spine, MaxCacheTime, FrameTime, _vertices, _indices, _boneInfoOffset, _indexOffset, _vfOffset, _preTexUrl, _preBlendMode, _segVCount, _segICount, _segOffset, _colorOffset, _preFinalColor, _preDarkColor, PerVertexSize, PerClipVertexSize, ExportVertexSize, _vfCount, _indexCount, _tempr, _tempg, _tempb, _tempa, _finalColor32, _darkColor32, _finalColor, _darkColor, _quadTriangles, AnimationCache, SkeletonCache;

  return {
    setters: [function (_trackEntryListenersJs) {
      TrackEntryListeners = _trackEntryListenersJs.TrackEntryListeners;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module spine
       */
      // Permit max cache time, unit is second.
      MaxCacheTime = 30;
      FrameTime = 1 / 60;
      /**
       *  0/x, 1/y, 2/u, 3/v, 4/color32, 5/color32,
       */

      _vertices = [];
      _indices = [];
      _boneInfoOffset = 0;
      _indexOffset = 0;
      _vfOffset = 0;
      _preTexUrl = null;
      _preBlendMode = null;
      _segVCount = 0;
      _segICount = 0;
      _segOffset = 0;
      _colorOffset = 0;
      _preFinalColor = null;
      _preDarkColor = null; // x y u v c1 c2

      PerVertexSize = 6; // x y u v r1 g1 b1 a1 r2 g2 b2 a2

      PerClipVertexSize = 12; // x y z / u v / r g b a/ r g b a

      ExportVertexSize = 13;
      _vfCount = 0;
      _indexCount = 0;
      _finalColor = new spine.Color(1, 1, 1, 1);
      _darkColor = new spine.Color(1, 1, 1, 1);
      _quadTriangles = [0, 1, 2, 2, 3, 0];

      // Cache all frames in an animation
      _export("AnimationCache", AnimationCache = /*#__PURE__*/function () {
        function AnimationCache() {
          this.frames = [];
          this.totalTime = 0;
          this.isCompleted = false;
          this._privateMode = false;
          this._inited = false;
          this._invalid = true;
          this._enableCacheAttachedInfo = false;
          this._frameIdx = -1;
          this._skeletonInfo = null;
          this._animationName = null;
          this._tempSegments = null;
          this._tempColors = null;
          this._tempBoneInfos = null;
          this._privateMode = false;
          this._inited = false;
          this._invalid = true;
          this._enableCacheAttachedInfo = false;
          this.frames = [];
          this.totalTime = 0;
          this._frameIdx = -1;
          this.isCompleted = false;
          this._skeletonInfo = null;
          this._animationName = null;
          this._tempSegments = null;
          this._tempColors = null;
          this._tempBoneInfos = null;
        }

        var _proto = AnimationCache.prototype;

        _proto.init = function init(skeletonInfo, animationName) {
          this._inited = true;
          this._animationName = animationName;
          this._skeletonInfo = skeletonInfo;
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

        _proto.bind = function bind(listener) {
          var _this = this;

          var completeHandle = function completeHandle(entry) {
            if (entry && entry.animation.name === _this._animationName) {
              _this.isCompleted = true;
            }
          };

          listener.complete = completeHandle;
        };

        _proto.unbind = function unbind(listener) {
          listener.complete = null;
        };

        _proto.begin = function begin() {
          if (!this._invalid) return;
          var skeletonInfo = this._skeletonInfo;
          var preAnimationCache = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.curAnimationCache;

          if (preAnimationCache && preAnimationCache !== this) {
            if (this._privateMode) {
              // Private cache mode just invalid pre animation frame.
              preAnimationCache.invalidAllFrame();
            } else {
              // If pre animation not finished, play it to the end.
              preAnimationCache.updateToFrame();
            }
          }

          var skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
          var listener = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.listener;
          var state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;
          var animation = skeleton === null || skeleton === void 0 ? void 0 : skeleton.data.findAnimation(this._animationName);
          state === null || state === void 0 ? void 0 : state.setAnimationWith(0, animation, false);
          this.bind(listener); // record cur animation cache

          skeletonInfo.curAnimationCache = this;
          this._frameIdx = -1;
          this.isCompleted = false;
          this.totalTime = 0;
          this._invalid = false;
        };

        _proto.end = function end() {
          if (!this.needToUpdate()) {
            // clear cur animation cache
            this._skeletonInfo.curAnimationCache = null;
            this.frames.length = this._frameIdx + 1;
            this.isCompleted = true;
            this.unbind(this._skeletonInfo.listener);
          }
        };

        _proto.updateToFrame = function updateToFrame(toFrameIdx) {
          if (!this._inited) return;
          this.begin();
          if (!this.needToUpdate(toFrameIdx)) return;
          var skeletonInfo = this._skeletonInfo;
          var skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
          var clipper = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.clipper;
          var state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;

          do {
            // Solid update frame rate 1/60.
            skeleton === null || skeleton === void 0 ? void 0 : skeleton.update(FrameTime);
            state === null || state === void 0 ? void 0 : state.update(FrameTime);
            state === null || state === void 0 ? void 0 : state.apply(skeleton);
            skeleton === null || skeleton === void 0 ? void 0 : skeleton.updateWorldTransform();
            this._frameIdx++;
            this.updateFrame(skeleton, clipper, this._frameIdx);
            this.totalTime += FrameTime;
          } while (this.needToUpdate(toFrameIdx));

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

        _proto.fillVertices = function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
          _tempa = slotColor.a * attachmentColor.a * skeletonColor.a * 255;
          _tempr = attachmentColor.r * skeletonColor.r * 255;
          _tempg = attachmentColor.g * skeletonColor.g * 255;
          _tempb = attachmentColor.b * skeletonColor.b * 255;
          _finalColor.r = _tempr * slotColor.r;
          _finalColor.g = _tempg * slotColor.g;
          _finalColor.b = _tempb * slotColor.b;
          _finalColor.a = _tempa;

          if (slot.darkColor == null) {
            _darkColor.set(0.0, 0, 0, 1.0);
          } else {
            _darkColor.r = slot.darkColor.r * _tempr;
            _darkColor.g = slot.darkColor.g * _tempg;
            _darkColor.b = slot.darkColor.b * _tempb;
          }

          _darkColor.a = 0;
          _finalColor32 = (_finalColor.a << 24 >>> 0) + (_finalColor.b << 16) + (_finalColor.g << 8) + _finalColor.r;
          _darkColor32 = (_darkColor.a << 24 >>> 0) + (_darkColor.b << 16) + (_darkColor.g << 8) + _darkColor.r;

          if (_preFinalColor !== _finalColor32 || _preDarkColor !== _darkColor32) {
            var colors = this._tempColors;
            _preFinalColor = _finalColor32;
            _preDarkColor = _darkColor32;

            if (_colorOffset > 0) {
              colors[_colorOffset - 1].vfOffset = _vfOffset;
            }

            colors[_colorOffset++] = {
              fr: _finalColor.r,
              fg: _finalColor.g,
              fb: _finalColor.b,
              fa: _finalColor.a,
              dr: _darkColor.r,
              dg: _darkColor.g,
              db: _darkColor.b,
              da: _darkColor.a,
              vfOffset: 0
            };
          }

          if (!clipper.isClipping()) {
            for (var v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += PerVertexSize) {
              _vertices[v + 4] = _finalColor32; // light color

              _vertices[v + 5] = _darkColor32; // dark color
            }
          } else {
            clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true, PerVertexSize, _vfOffset, _vfOffset + 2);
            var clippedVertices = clipper.clippedVertices;
            var clippedTriangles = clipper.clippedTriangles; // insure capacity

            _indexCount = clippedTriangles.length;
            _vfCount = clippedVertices.length / PerClipVertexSize * PerVertexSize; // fill indices

            for (var ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
              _indices[jj++] = clippedTriangles[ii++];
            } // clippedVertices: x y/r g b a/u v/r g b a
            // fill vertices contain x y u v light color dark color


            for (var _v = 0, _n = clippedVertices.length, offset = _vfOffset; _v < _n; _v += PerClipVertexSize, offset += PerVertexSize) {
              _vertices[offset] = clippedVertices[_v]; // x

              _vertices[offset + 1] = clippedVertices[_v + 1]; // y

              _vertices[offset + 2] = clippedVertices[_v + 6]; // u

              _vertices[offset + 3] = clippedVertices[_v + 7]; // v

              _vertices[offset + 4] = _finalColor32;
              _vertices[offset + 5] = _darkColor32;
            }
          }
        };

        _proto.updateFrame = function updateFrame(skeleton, clipper, index) {
          _vfOffset = 0;
          _boneInfoOffset = 0;
          _indexOffset = 0;
          _preTexUrl = null;
          _preBlendMode = null;
          _segVCount = 0;
          _segICount = 0;
          _segOffset = 0;
          _colorOffset = 0;
          _preFinalColor = null;
          _preDarkColor = null;
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
          this.traverseSkeleton(skeleton, clipper);

          if (_colorOffset > 0) {
            colors[_colorOffset - 1].vfOffset = _vfOffset;
          }

          colors.length = _colorOffset;
          boneInfos.length = _boneInfoOffset; // Handle pre segment.

          var preSegOffset = _segOffset - 1;

          if (preSegOffset >= 0) {
            // Judge segment vertex count is not empty.
            if (_segICount > 0) {
              var preSegInfo = segments[preSegOffset];
              preSegInfo.indexCount = _segICount;
              preSegInfo.vfCount = _segVCount * ExportVertexSize;
              preSegInfo.vertexCount = _segVCount;
              segments.length = _segOffset;
            } else {
              // Discard pre segment.
              segments.length = _segOffset - 1;
            }
          } // Segments is empty,discard all segments.


          if (segments.length === 0) return; // Fill vertices

          var vertices = frame.vertices;
          var copyOutVerticeSize = _vfOffset / PerVertexSize * ExportVertexSize;

          if (!vertices || vertices.length < copyOutVerticeSize) {
            vertices = frame.vertices = new Float32Array(copyOutVerticeSize);
          }

          for (var i = 0, j = 0; i < copyOutVerticeSize;) {
            vertices[i] = _vertices[j++]; // x

            vertices[i + 1] = _vertices[j++]; // y

            vertices[i + 3] = _vertices[j++]; // u

            vertices[i + 4] = _vertices[j++]; // v

            this._setVerticeColor(_vertices[j++], vertices, i + 5);

            this._setVerticeColor(_vertices[j++], vertices, i + 9);

            i += ExportVertexSize;
          } // Fill indices


          var indices = frame.indices;

          if (!indices || indices.length < _indexOffset) {
            indices = frame.indices = new Uint16Array(_indexOffset);
          }

          for (var _i = 0; _i < _indexOffset; _i++) {
            indices[_i] = _indices[_i];
          }

          frame.vertices = vertices;
          frame.indices = indices;
        };

        _proto.needToUpdate = function needToUpdate(toFrameIdx) {
          return !this.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx === undefined || this._frameIdx < toFrameIdx);
        };

        _proto.traverseSkeleton = function traverseSkeleton(skeleton, clipper) {
          var segments = this._tempSegments;
          var boneInfos = this._tempBoneInfos;
          var skeletonColor = skeleton.color;
          var attachment;
          var attachmentColor;
          var slotColor;
          var uvs;
          var triangles;
          var isRegion;
          var isMesh;
          var isClip;
          var texture;
          var preSegOffset;
          var preSegInfo;
          var blendMode;
          var slot;
          var bones = skeleton.bones;

          if (this._enableCacheAttachedInfo) {
            for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
              var bone = bones[i];
              var boneInfo = boneInfos[_boneInfoOffset];

              if (!boneInfo) {
                boneInfo = boneInfos[_boneInfoOffset] = {};
              }

              boneInfo.a = bone.a;
              boneInfo.b = bone.b;
              boneInfo.c = bone.c;
              boneInfo.d = bone.d;
              boneInfo.worldX = bone.worldX;
              boneInfo.worldY = bone.worldY;
            }
          }

          for (var slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
            slot = skeleton.drawOrder[slotIdx];
            _vfCount = 0;
            _indexCount = 0;
            attachment = slot.getAttachment();

            if (!attachment) {
              clipper.clipEndWithSlot(slot);
              continue;
            }

            isRegion = attachment instanceof spine.RegionAttachment;
            isMesh = attachment instanceof spine.MeshAttachment;
            isClip = attachment instanceof spine.ClippingAttachment;

            if (isClip) {
              clipper.clipStart(slot, attachment);
              continue;
            }

            if (!isRegion && !isMesh) {
              clipper.clipEndWithSlot(slot);
              continue;
            }

            texture = attachment.region.texture.getRealTexture();

            if (!texture) {
              clipper.clipEndWithSlot(slot);
              continue;
            }

            blendMode = slot.data.blendMode;

            if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== blendMode) {
              _preTexUrl = texture.nativeUrl;
              _preBlendMode = blendMode; // Handle pre segment.

              preSegOffset = _segOffset - 1;

              if (preSegOffset >= 0) {
                if (_segICount > 0) {
                  preSegInfo = segments[preSegOffset];
                  preSegInfo.indexCount = _segICount;
                  preSegInfo.vertexCount = _segVCount;
                  preSegInfo.vfCount = _segVCount * ExportVertexSize;
                } else {
                  // Discard pre segment.
                  _segOffset--;
                }
              } // Handle now segment.


              segments[_segOffset] = {
                tex: texture,
                blendMode: blendMode,
                indexCount: 0,
                vertexCount: 0,
                vfCount: 0
              };
              _segOffset++;
              _segICount = 0;
              _segVCount = 0;
            }

            if (isRegion) {
              triangles = _quadTriangles; // insure capacity

              _vfCount = 4 * PerVertexSize;
              _indexCount = 6; // compute vertex and fill x y

              attachment.computeWorldVertices(slot.bone, _vertices, _vfOffset, PerVertexSize);
            } else if (isMesh) {
              var meshAttachment = attachment;
              triangles = meshAttachment.triangles; // insure capacity

              _vfCount = (meshAttachment.worldVerticesLength >> 1) * PerVertexSize;
              _indexCount = triangles.length; // compute vertex and fill x y

              meshAttachment.computeWorldVertices(slot, 0, meshAttachment.worldVerticesLength, _vertices, _vfOffset, PerVertexSize);
            }

            if (_vfCount === 0 || _indexCount === 0) {
              clipper.clipEndWithSlot(slot);
              continue;
            } // fill indices


            for (var ii = 0, jj = _indexOffset, nn = triangles.length; ii < nn;) {
              _indices[jj++] = triangles[ii++];
            } // fill u v


            uvs = attachment.uvs;

            for (var v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += PerVertexSize, u += 2) {
              _vertices[v + 2] = uvs[u]; // u

              _vertices[v + 3] = uvs[u + 1]; // v
            }

            attachmentColor = attachment.color;
            slotColor = slot.color;
            this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

            if (_indexCount > 0) {
              for (var _ii = _indexOffset, _nn = _indexOffset + _indexCount; _ii < _nn; _ii++) {
                _indices[_ii] += _segVCount;
              }

              _indexOffset += _indexCount;
              _vfOffset += _vfCount;
              _segICount += _indexCount;
              _segVCount += _vfCount / PerVertexSize;
            }

            clipper.clipEndWithSlot(slot);
          }

          clipper.clipEnd();
        };

        _proto._setVerticeColor = function _setVerticeColor(colorI32, buffer, offset) {
          buffer[offset] = (colorI32 & 0xff) / 255.0;
          buffer[offset + 1] = (colorI32 >> 8 & 0xff) / 255.0;
          buffer[offset + 2] = (colorI32 >> 16 & 0xff) / 255.0;
          buffer[offset + 3] = (colorI32 >> 24 & 0xff) / 255.0;
        };

        return AnimationCache;
      }());

      SkeletonCache = /*#__PURE__*/function () {
        function SkeletonCache() {
          this._privateMode = void 0;
          this._skeletonCache = void 0;
          this._animationPool = void 0;
          this._privateMode = false;
          this._animationPool = {};
          this._skeletonCache = {};
        }

        var _proto2 = SkeletonCache.prototype;

        _proto2.enablePrivateMode = function enablePrivateMode() {
          this._privateMode = true;
        };

        _proto2.clear = function clear() {
          this._animationPool = {};
          this._skeletonCache = {};
        };

        _proto2.removeSkeleton = function removeSkeleton(uuid) {
          var skeletonInfo = this._skeletonCache[uuid];
          if (!skeletonInfo) return;
          var animationsCache = skeletonInfo.animationsCache;

          for (var aniKey in animationsCache) {
            // Clear cache texture, and put cache into pool.
            // No need to create TypedArray next time.
            var animationCache = animationsCache[aniKey];
            if (!animationCache) continue;
            this._animationPool[uuid + "#" + aniKey] = animationCache;
            animationCache.clear();
          }

          delete this._skeletonCache[uuid];
        };

        _proto2.getSkeletonCache = function getSkeletonCache(uuid, skeletonData) {
          var skeletonInfo = this._skeletonCache[uuid];

          if (!skeletonInfo) {
            var skeleton = new spine.Skeleton(skeletonData);
            var clipper = new spine.SkeletonClipping();
            var stateData = new spine.AnimationStateData(skeleton.data);
            var state = new spine.AnimationState(stateData);
            var listener = new TrackEntryListeners();
            state.addListener(listener);
            this._skeletonCache[uuid] = skeletonInfo = {
              skeleton: skeleton,
              clipper: clipper,
              state: state,
              listener: listener,
              // Cache all kinds of animation frame.
              // When skeleton is dispose, clear all animation cache.
              animationsCache: {},
              curAnimationCache: null
            };
          }

          return skeletonInfo;
        };

        _proto2.getAnimationCache = function getAnimationCache(uuid, animationName) {
          var skeletonInfo = this._skeletonCache[uuid];
          if (!skeletonInfo) return null;
          var animationsCache = skeletonInfo.animationsCache;
          return animationsCache[animationName];
        };

        _proto2.invalidAnimationCache = function invalidAnimationCache(uuid) {
          var skeletonInfo = this._skeletonCache[uuid];
          var skeleton = skeletonInfo && skeletonInfo.skeleton;
          if (!skeleton) return;
          var animationsCache = skeletonInfo.animationsCache;

          for (var aniKey in animationsCache) {
            var animationCache = animationsCache[aniKey];
            animationCache.invalidAllFrame();
          }
        };

        _proto2.initAnimationCache = function initAnimationCache(uuid, animationName) {
          if (!animationName) return null;
          var skeletonInfo = this._skeletonCache[uuid];
          var skeleton = skeletonInfo && skeletonInfo.skeleton;
          if (!skeleton) return null;
          var animation = skeleton.data.findAnimation(animationName);

          if (!animation) {
            return null;
          }

          var animationsCache = skeletonInfo.animationsCache;
          var animationCache = animationsCache[animationName];

          if (!animationCache) {
            // If cache exist in pool, then just use it.
            var poolKey = uuid + "#" + animationName;
            animationCache = this._animationPool[poolKey];

            if (animationCache) {
              delete this._animationPool[poolKey];
            } else {
              animationCache = new AnimationCache();
              animationCache._privateMode = this._privateMode;
            }

            animationCache.init(skeletonInfo, animationName);
            animationsCache[animationName] = animationCache;
          }

          return animationCache;
        };

        _proto2.updateAnimationCache = function updateAnimationCache(uuid, animationName) {
          if (animationName) {
            var animationCache = this.initAnimationCache(uuid, animationName);
            if (!animationCache) return null;
            animationCache.updateAllFrame();
          } else {
            var skeletonInfo = this._skeletonCache[uuid];
            var skeleton = skeletonInfo && skeletonInfo.skeleton;
            if (!skeleton) return;
            var animationsCache = skeletonInfo.animationsCache;

            for (var aniKey in animationsCache) {
              var _animationCache = animationsCache[aniKey];

              _animationCache.updateAllFrame();
            }
          }
        };

        return SkeletonCache;
      }();

      SkeletonCache.FrameTime = FrameTime;
      SkeletonCache.sharedCache = new SkeletonCache();

      _export("default", SkeletonCache);
    }
  };
});