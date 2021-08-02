"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AnimationCache = void 0;

var _trackEntryListeners = require("./track-entry-listeners.js");

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @module spine
 */
// Permit max cache time, unit is second.
const MaxCacheTime = 30;
const FrameTime = 1 / 60;
/**
 *  0/x, 1/y, 2/u, 3/v, 4/color32, 5/color32,
 */

const _vertices = [];
const _indices = [];
let _boneInfoOffset = 0;
let _indexOffset = 0;
let _vfOffset = 0;
let _preTexUrl = null;
let _preBlendMode = null;
let _segVCount = 0;
let _segICount = 0;
let _segOffset = 0;
let _colorOffset = 0;
let _preFinalColor = null;
let _preDarkColor = null; // x y u v c1 c2

const PerVertexSize = 6; // x y u v r1 g1 b1 a1 r2 g2 b2 a2

const PerClipVertexSize = 12; // x y z / u v / r g b a/ r g b a

const ExportVertexSize = 13;
let _vfCount = 0;
let _indexCount = 0;

let _tempr;

let _tempg;

let _tempb;

let _tempa;

let _finalColor32;

let _darkColor32;

const _finalColor = new _spineCore.default.Color(1, 1, 1, 1);

const _darkColor = new _spineCore.default.Color(1, 1, 1, 1);

const _quadTriangles = [0, 1, 2, 2, 3, 0];

// Cache all frames in an animation
class AnimationCache {
  constructor() {
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

  init(skeletonInfo, animationName) {
    this._inited = true;
    this._animationName = animationName;
    this._skeletonInfo = skeletonInfo;
  } // Clear texture quote.


  clear() {
    this._inited = false;

    for (let i = 0, n = this.frames.length; i < n; i++) {
      const frame = this.frames[i];
      frame.segments.length = 0;
    }

    this.invalidAllFrame();
  }

  bind(listener) {
    const completeHandle = entry => {
      if (entry && entry.animation.name === this._animationName) {
        this.isCompleted = true;
      }
    };

    listener.complete = completeHandle;
  }

  unbind(listener) {
    listener.complete = null;
  }

  begin() {
    if (!this._invalid) return;
    const skeletonInfo = this._skeletonInfo;
    const preAnimationCache = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.curAnimationCache;

    if (preAnimationCache && preAnimationCache !== this) {
      if (this._privateMode) {
        // Private cache mode just invalid pre animation frame.
        preAnimationCache.invalidAllFrame();
      } else {
        // If pre animation not finished, play it to the end.
        preAnimationCache.updateToFrame();
      }
    }

    const skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
    const listener = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.listener;
    const state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;
    const animation = skeleton === null || skeleton === void 0 ? void 0 : skeleton.data.findAnimation(this._animationName);
    state === null || state === void 0 ? void 0 : state.setAnimationWith(0, animation, false);
    this.bind(listener); // record cur animation cache

    skeletonInfo.curAnimationCache = this;
    this._frameIdx = -1;
    this.isCompleted = false;
    this.totalTime = 0;
    this._invalid = false;
  }

  end() {
    if (!this.needToUpdate()) {
      // clear cur animation cache
      this._skeletonInfo.curAnimationCache = null;
      this.frames.length = this._frameIdx + 1;
      this.isCompleted = true;
      this.unbind(this._skeletonInfo.listener);
    }
  }

  updateToFrame(toFrameIdx) {
    if (!this._inited) return;
    this.begin();
    if (!this.needToUpdate(toFrameIdx)) return;
    const skeletonInfo = this._skeletonInfo;
    const skeleton = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.skeleton;
    const clipper = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.clipper;
    const state = skeletonInfo === null || skeletonInfo === void 0 ? void 0 : skeletonInfo.state;

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
  }

  isInited() {
    return this._inited;
  }

  isInvalid() {
    return this._invalid;
  }

  invalidAllFrame() {
    this.isCompleted = false;
    this._invalid = true;
  }

  updateAllFrame() {
    this.invalidAllFrame();
    this.updateToFrame();
  }

  enableCacheAttachedInfo() {
    if (!this._enableCacheAttachedInfo) {
      this._enableCacheAttachedInfo = true;
      this.invalidAllFrame();
    }
  }

  fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
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
      const colors = this._tempColors;
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
      for (let v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += PerVertexSize) {
        _vertices[v + 4] = _finalColor32; // light color

        _vertices[v + 5] = _darkColor32; // dark color
      }
    } else {
      clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true, PerVertexSize, _vfOffset, _vfOffset + 2);
      const clippedVertices = clipper.clippedVertices;
      const clippedTriangles = clipper.clippedTriangles; // insure capacity

      _indexCount = clippedTriangles.length;
      _vfCount = clippedVertices.length / PerClipVertexSize * PerVertexSize; // fill indices

      for (let ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
        _indices[jj++] = clippedTriangles[ii++];
      } // clippedVertices: x y/r g b a/u v/r g b a
      // fill vertices contain x y u v light color dark color


      for (let v = 0, n = clippedVertices.length, offset = _vfOffset; v < n; v += PerClipVertexSize, offset += PerVertexSize) {
        _vertices[offset] = clippedVertices[v]; // x

        _vertices[offset + 1] = clippedVertices[v + 1]; // y

        _vertices[offset + 2] = clippedVertices[v + 6]; // u

        _vertices[offset + 3] = clippedVertices[v + 7]; // v

        _vertices[offset + 4] = _finalColor32;
        _vertices[offset + 5] = _darkColor32;
      }
    }
  }

  updateFrame(skeleton, clipper, index) {
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
    const frame = this.frames[index];
    const segments = this._tempSegments = frame.segments;
    const colors = this._tempColors = frame.colors;
    const boneInfos = this._tempBoneInfos = frame.boneInfos;
    this.traverseSkeleton(skeleton, clipper);

    if (_colorOffset > 0) {
      colors[_colorOffset - 1].vfOffset = _vfOffset;
    }

    colors.length = _colorOffset;
    boneInfos.length = _boneInfoOffset; // Handle pre segment.

    const preSegOffset = _segOffset - 1;

    if (preSegOffset >= 0) {
      // Judge segment vertex count is not empty.
      if (_segICount > 0) {
        const preSegInfo = segments[preSegOffset];
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

    let vertices = frame.vertices;
    const copyOutVerticeSize = _vfOffset / PerVertexSize * ExportVertexSize;

    if (!vertices || vertices.length < copyOutVerticeSize) {
      vertices = frame.vertices = new Float32Array(copyOutVerticeSize);
    }

    for (let i = 0, j = 0; i < copyOutVerticeSize;) {
      vertices[i] = _vertices[j++]; // x

      vertices[i + 1] = _vertices[j++]; // y

      vertices[i + 3] = _vertices[j++]; // u

      vertices[i + 4] = _vertices[j++]; // v

      this._setVerticeColor(_vertices[j++], vertices, i + 5);

      this._setVerticeColor(_vertices[j++], vertices, i + 9);

      i += ExportVertexSize;
    } // Fill indices


    let indices = frame.indices;

    if (!indices || indices.length < _indexOffset) {
      indices = frame.indices = new Uint16Array(_indexOffset);
    }

    for (let i = 0; i < _indexOffset; i++) {
      indices[i] = _indices[i];
    }

    frame.vertices = vertices;
    frame.indices = indices;
  }

  needToUpdate(toFrameIdx) {
    return !this.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx === undefined || this._frameIdx < toFrameIdx);
  }

  traverseSkeleton(skeleton, clipper) {
    const segments = this._tempSegments;
    const boneInfos = this._tempBoneInfos;
    const skeletonColor = skeleton.color;
    let attachment;
    let attachmentColor;
    let slotColor;
    let uvs;
    let triangles;
    let isRegion;
    let isMesh;
    let isClip;
    let texture;
    let preSegOffset;
    let preSegInfo;
    let blendMode;
    let slot;
    const bones = skeleton.bones;

    if (this._enableCacheAttachedInfo) {
      for (let i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
        const bone = bones[i];
        let boneInfo = boneInfos[_boneInfoOffset];

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

    for (let slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      slot = skeleton.drawOrder[slotIdx];
      _vfCount = 0;
      _indexCount = 0;
      attachment = slot.getAttachment();

      if (!attachment) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      isRegion = attachment instanceof _spineCore.default.RegionAttachment;
      isMesh = attachment instanceof _spineCore.default.MeshAttachment;
      isClip = attachment instanceof _spineCore.default.ClippingAttachment;

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
          blendMode,
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
        const meshAttachment = attachment;
        triangles = meshAttachment.triangles; // insure capacity

        _vfCount = (meshAttachment.worldVerticesLength >> 1) * PerVertexSize;
        _indexCount = triangles.length; // compute vertex and fill x y

        meshAttachment.computeWorldVertices(slot, 0, meshAttachment.worldVerticesLength, _vertices, _vfOffset, PerVertexSize);
      }

      if (_vfCount === 0 || _indexCount === 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      } // fill indices


      for (let ii = 0, jj = _indexOffset, nn = triangles.length; ii < nn;) {
        _indices[jj++] = triangles[ii++];
      } // fill u v


      uvs = attachment.uvs;

      for (let v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += PerVertexSize, u += 2) {
        _vertices[v + 2] = uvs[u]; // u

        _vertices[v + 3] = uvs[u + 1]; // v
      }

      attachmentColor = attachment.color;
      slotColor = slot.color;
      this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

      if (_indexCount > 0) {
        for (let ii = _indexOffset, nn = _indexOffset + _indexCount; ii < nn; ii++) {
          _indices[ii] += _segVCount;
        }

        _indexOffset += _indexCount;
        _vfOffset += _vfCount;
        _segICount += _indexCount;
        _segVCount += _vfCount / PerVertexSize;
      }

      clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();
  }

  _setVerticeColor(colorI32, buffer, offset) {
    buffer[offset] = (colorI32 & 0xff) / 255.0;
    buffer[offset + 1] = (colorI32 >> 8 & 0xff) / 255.0;
    buffer[offset + 2] = (colorI32 >> 16 & 0xff) / 255.0;
    buffer[offset + 3] = (colorI32 >> 24 & 0xff) / 255.0;
  }

}

exports.AnimationCache = AnimationCache;

class SkeletonCache {
  constructor() {
    this._privateMode = void 0;
    this._skeletonCache = void 0;
    this._animationPool = void 0;
    this._privateMode = false;
    this._animationPool = {};
    this._skeletonCache = {};
  }

  enablePrivateMode() {
    this._privateMode = true;
  }

  clear() {
    this._animationPool = {};
    this._skeletonCache = {};
  }

  removeSkeleton(uuid) {
    const skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return;
    const animationsCache = skeletonInfo.animationsCache;

    for (const aniKey in animationsCache) {
      // Clear cache texture, and put cache into pool.
      // No need to create TypedArray next time.
      const animationCache = animationsCache[aniKey];
      if (!animationCache) continue;
      this._animationPool[`${uuid}#${aniKey}`] = animationCache;
      animationCache.clear();
    }

    delete this._skeletonCache[uuid];
  }

  getSkeletonCache(uuid, skeletonData) {
    let skeletonInfo = this._skeletonCache[uuid];

    if (!skeletonInfo) {
      const skeleton = new _spineCore.default.Skeleton(skeletonData);
      const clipper = new _spineCore.default.SkeletonClipping();
      const stateData = new _spineCore.default.AnimationStateData(skeleton.data);
      const state = new _spineCore.default.AnimationState(stateData);
      const listener = new _trackEntryListeners.TrackEntryListeners();
      state.addListener(listener);
      this._skeletonCache[uuid] = skeletonInfo = {
        skeleton,
        clipper,
        state,
        listener,
        // Cache all kinds of animation frame.
        // When skeleton is dispose, clear all animation cache.
        animationsCache: {},
        curAnimationCache: null
      };
    }

    return skeletonInfo;
  }

  getAnimationCache(uuid, animationName) {
    const skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return null;
    const animationsCache = skeletonInfo.animationsCache;
    return animationsCache[animationName];
  }

  invalidAnimationCache(uuid) {
    const skeletonInfo = this._skeletonCache[uuid];
    const skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return;
    const animationsCache = skeletonInfo.animationsCache;

    for (const aniKey in animationsCache) {
      const animationCache = animationsCache[aniKey];
      animationCache.invalidAllFrame();
    }
  }

  initAnimationCache(uuid, animationName) {
    if (!animationName) return null;
    const skeletonInfo = this._skeletonCache[uuid];
    const skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return null;
    const animation = skeleton.data.findAnimation(animationName);

    if (!animation) {
      return null;
    }

    const animationsCache = skeletonInfo.animationsCache;
    let animationCache = animationsCache[animationName];

    if (!animationCache) {
      // If cache exist in pool, then just use it.
      const poolKey = `${uuid}#${animationName}`;
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
  }

  updateAnimationCache(uuid, animationName) {
    if (animationName) {
      const animationCache = this.initAnimationCache(uuid, animationName);
      if (!animationCache) return null;
      animationCache.updateAllFrame();
    } else {
      const skeletonInfo = this._skeletonCache[uuid];
      const skeleton = skeletonInfo && skeletonInfo.skeleton;
      if (!skeleton) return;
      const animationsCache = skeletonInfo.animationsCache;

      for (const aniKey in animationsCache) {
        const animationCache = animationsCache[aniKey];
        animationCache.updateAllFrame();
      }
    }
  }

}

SkeletonCache.FrameTime = FrameTime;
SkeletonCache.sharedCache = new SkeletonCache();
var _default = SkeletonCache;
exports.default = _default;