System.register("q-bundled:///fs/cocos/3d/skeletal-animation/skeletal-animation-state.js", ["../skinned-mesh-renderer/index.js", "../../core/math/index.js", "../../core/animation/animation-state.js", "./skeletal-animation-data-hub.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var SkinnedMeshRenderer, Mat4, Quat, Vec3, AnimationState, SkelAnimDataHub, legacyCC, m4_1, m4_2, noCurves, SkeletalAnimationState;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_skinnedMeshRendererIndexJs) {
      SkinnedMeshRenderer = _skinnedMeshRendererIndexJs.SkinnedMeshRenderer;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Quat = _coreMathIndexJs.Quat;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreAnimationAnimationStateJs) {
      AnimationState = _coreAnimationAnimationStateJs.AnimationState;
    }, function (_skeletalAnimationDataHubJs) {
      SkelAnimDataHub = _skeletalAnimationDataHubJs.SkelAnimDataHub;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      m4_1 = new Mat4();
      m4_2 = new Mat4();
      noCurves = [];

      _export("SkeletalAnimationState", SkeletalAnimationState = /*#__PURE__*/function (_AnimationState) {
        _inheritsLoose(SkeletalAnimationState, _AnimationState);

        function SkeletalAnimationState(clip, name) {
          var _this;

          if (name === void 0) {
            name = '';
          }

          _this = _AnimationState.call(this, clip, name) || this;
          _this._frames = 1;
          _this._bakedDuration = 0;
          _this._animInfo = null;
          _this._sockets = [];
          _this._animInfoMgr = void 0;
          _this._comps = [];
          _this._parent = null;
          _this._curvesInited = false;
          _this._animInfoMgr = legacyCC.director.root.dataPoolManager.jointAnimationInfo;
          return _this;
        }

        var _proto = SkeletalAnimationState.prototype;

        _proto.initialize = function initialize(root) {
          if (this._curveLoaded) {
            return;
          }

          this._comps.length = 0;
          var comps = root.getComponentsInChildren(SkinnedMeshRenderer);

          for (var i = 0; i < comps.length; ++i) {
            var comp = comps[i];

            if (comp.skinningRoot === root) {
              this._comps.push(comp);
            }
          }

          this._parent = root.getComponent('cc.SkeletalAnimation');
          var baked = this._parent.useBakedAnimation;

          _AnimationState.prototype.initialize.call(this, root, baked ? noCurves : undefined);

          this._curvesInited = !baked;

          var _SkelAnimDataHub$getO = SkelAnimDataHub.getOrExtract(this.clip),
              info = _SkelAnimDataHub$getO.info;

          this._frames = info.frames - 1;
          this._animInfo = this._animInfoMgr.getData(root.uuid);
          this._bakedDuration = this._frames / info.sample; // last key
        };

        _proto.onPlay = function onPlay() {
          _AnimationState.prototype.onPlay.call(this);

          var baked = this._parent.useBakedAnimation;

          if (baked) {
            this._sampleCurves = this._sampleCurvesBaked;
            this.duration = this._bakedDuration;

            this._animInfoMgr.switchClip(this._animInfo, this.clip);

            for (var i = 0; i < this._comps.length; ++i) {
              this._comps[i].uploadAnimation(this.clip);
            }
          } else {
            this._sampleCurves = _AnimationState.prototype._sampleCurves;
            this.duration = this.clip.duration;

            if (!this._curvesInited) {
              this._curveLoaded = false;

              _AnimationState.prototype.initialize.call(this, this._targetNode);

              this._curvesInited = true;
            }
          }
        };

        _proto.rebuildSocketCurves = function rebuildSocketCurves(sockets) {
          this._sockets.length = 0;

          if (!this._targetNode) {
            return;
          }

          var root = this._targetNode;

          for (var i = 0; i < sockets.length; ++i) {
            var socket = sockets[i];
            var targetNode = root.getChildByPath(socket.path);

            if (!socket.target) {
              continue;
            }

            var clipData = SkelAnimDataHub.getOrExtract(this.clip);
            var animPath = socket.path;
            var source = clipData.data[animPath];
            var animNode = targetNode;
            var downstream = void 0;

            while (!source) {
              var idx = animPath.lastIndexOf('/');
              animPath = animPath.substring(0, idx);
              source = clipData.data[animPath];

              if (animNode) {
                if (!downstream) {
                  downstream = Mat4.identity(m4_2);
                }

                Mat4.fromRTS(m4_1, animNode.rotation, animNode.position, animNode.scale);
                Mat4.multiply(downstream, m4_1, downstream);
                animNode = animNode.parent;
              }

              if (idx < 0) {
                break;
              }
            }

            var curveData = source && source.worldMatrix.values;
            var frames = clipData.info.frames;
            var transforms = [];

            for (var f = 0; f < frames; f++) {
              var mat = void 0;

              if (curveData && downstream) {
                // curve & static two-way combination
                mat = Mat4.multiply(m4_1, curveData[f], downstream);
              } else if (curveData) {
                // there is a curve directly controlling the joint
                mat = curveData[f];
              } else if (downstream) {
                // fallback to default pose if no animation curve can be found upstream
                mat = downstream;
              } else {
                // bottom line: render the original mesh as-is
                mat = Mat4.IDENTITY;
              }

              var tfm = {
                pos: new Vec3(),
                rot: new Quat(),
                scale: new Vec3()
              };
              Mat4.toRTS(mat, tfm.rot, tfm.pos, tfm.scale);
              transforms.push(tfm);
            }

            this._sockets.push({
              target: socket.target,
              frames: transforms
            });
          }
        };

        _proto._sampleCurvesBaked = function _sampleCurvesBaked(ratio) {
          var info = this._animInfo;
          var curFrame = ratio * this._frames + 0.5 | 0;

          if (curFrame === info.data[0]) {
            return;
          }

          info.data[0] = curFrame;
          info.dirty = true;

          for (var i = 0; i < this._sockets.length; ++i) {
            var _this$_sockets$i = this._sockets[i],
                target = _this$_sockets$i.target,
                frames = _this$_sockets$i.frames;
            var _frames$curFrame = frames[curFrame],
                pos = _frames$curFrame.pos,
                rot = _frames$curFrame.rot,
                scale = _frames$curFrame.scale; // ratio guaranteed to be in [0, 1]

            target.setRTS(rot, pos, scale);
          }
        };

        return SkeletalAnimationState;
      }(AnimationState));
    }
  };
});