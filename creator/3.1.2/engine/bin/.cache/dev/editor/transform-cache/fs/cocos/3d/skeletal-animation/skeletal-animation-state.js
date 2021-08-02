"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkeletalAnimationState = void 0;

var _index = require("../skinned-mesh-renderer/index.js");

var _index2 = require("../../core/math/index.js");

var _animationState = require("../../core/animation/animation-state.js");

var _skeletalAnimationDataHub = require("./skeletal-animation-data-hub.js");

var _globalExports = require("../../core/global-exports.js");

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
 * @module animation
 */
const m4_1 = new _index2.Mat4();
const m4_2 = new _index2.Mat4();
const noCurves = [];

class SkeletalAnimationState extends _animationState.AnimationState {
  constructor(clip, name = '') {
    super(clip, name);
    this._frames = 1;
    this._bakedDuration = 0;
    this._animInfo = null;
    this._sockets = [];
    this._animInfoMgr = void 0;
    this._comps = [];
    this._parent = null;
    this._curvesInited = false;
    this._animInfoMgr = _globalExports.legacyCC.director.root.dataPoolManager.jointAnimationInfo;
  }

  initialize(root) {
    if (this._curveLoaded) {
      return;
    }

    this._comps.length = 0;
    const comps = root.getComponentsInChildren(_index.SkinnedMeshRenderer);

    for (let i = 0; i < comps.length; ++i) {
      const comp = comps[i];

      if (comp.skinningRoot === root) {
        this._comps.push(comp);
      }
    }

    this._parent = root.getComponent('cc.SkeletalAnimation');
    const baked = this._parent.useBakedAnimation;
    super.initialize(root, baked ? noCurves : undefined);
    this._curvesInited = !baked;

    const {
      info
    } = _skeletalAnimationDataHub.SkelAnimDataHub.getOrExtract(this.clip);

    this._frames = info.frames - 1;
    this._animInfo = this._animInfoMgr.getData(root.uuid);
    this._bakedDuration = this._frames / info.sample; // last key
  }

  onPlay() {
    super.onPlay();
    const baked = this._parent.useBakedAnimation;

    if (baked) {
      this._sampleCurves = this._sampleCurvesBaked;
      this.duration = this._bakedDuration;

      this._animInfoMgr.switchClip(this._animInfo, this.clip);

      for (let i = 0; i < this._comps.length; ++i) {
        this._comps[i].uploadAnimation(this.clip);
      }
    } else {
      this._sampleCurves = super._sampleCurves;
      this.duration = this.clip.duration;

      if (!this._curvesInited) {
        this._curveLoaded = false;
        super.initialize(this._targetNode);
        this._curvesInited = true;
      }
    }
  }

  rebuildSocketCurves(sockets) {
    this._sockets.length = 0;

    if (!this._targetNode) {
      return;
    }

    const root = this._targetNode;

    for (let i = 0; i < sockets.length; ++i) {
      const socket = sockets[i];
      const targetNode = root.getChildByPath(socket.path);

      if (!socket.target) {
        continue;
      }

      const clipData = _skeletalAnimationDataHub.SkelAnimDataHub.getOrExtract(this.clip);

      let animPath = socket.path;
      let source = clipData.data[animPath];
      let animNode = targetNode;
      let downstream;

      while (!source) {
        const idx = animPath.lastIndexOf('/');
        animPath = animPath.substring(0, idx);
        source = clipData.data[animPath];

        if (animNode) {
          if (!downstream) {
            downstream = _index2.Mat4.identity(m4_2);
          }

          _index2.Mat4.fromRTS(m4_1, animNode.rotation, animNode.position, animNode.scale);

          _index2.Mat4.multiply(downstream, m4_1, downstream);

          animNode = animNode.parent;
        }

        if (idx < 0) {
          break;
        }
      }

      const curveData = source && source.worldMatrix.values;
      const {
        frames
      } = clipData.info;
      const transforms = [];

      for (let f = 0; f < frames; f++) {
        let mat;

        if (curveData && downstream) {
          // curve & static two-way combination
          mat = _index2.Mat4.multiply(m4_1, curveData[f], downstream);
        } else if (curveData) {
          // there is a curve directly controlling the joint
          mat = curveData[f];
        } else if (downstream) {
          // fallback to default pose if no animation curve can be found upstream
          mat = downstream;
        } else {
          // bottom line: render the original mesh as-is
          mat = _index2.Mat4.IDENTITY;
        }

        const tfm = {
          pos: new _index2.Vec3(),
          rot: new _index2.Quat(),
          scale: new _index2.Vec3()
        };

        _index2.Mat4.toRTS(mat, tfm.rot, tfm.pos, tfm.scale);

        transforms.push(tfm);
      }

      this._sockets.push({
        target: socket.target,
        frames: transforms
      });
    }
  }

  _sampleCurvesBaked(ratio) {
    const info = this._animInfo;
    const curFrame = ratio * this._frames + 0.5 | 0;

    if (curFrame === info.data[0]) {
      return;
    }

    info.data[0] = curFrame;
    info.dirty = true;

    for (let i = 0; i < this._sockets.length; ++i) {
      const {
        target,
        frames
      } = this._sockets[i];
      const {
        pos,
        rot,
        scale
      } = frames[curFrame]; // ratio guaranteed to be in [0, 1]

      target.setRTS(rot, pos, scale);
    }
  }

}

exports.SkeletalAnimationState = SkeletalAnimationState;