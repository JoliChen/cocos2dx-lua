System.register("q-bundled:///fs/cocos/core/animation/animation-state.js", ["../../../../virtual/internal%253Aconstants.js", "../scene-graph/node.js", "./bound-target.js", "./playable.js", "./types.js", "./target-path.js", "../global-exports.js", "../value-types/enum.js", "../data/utils/asserts.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Node, createBoundTarget, createBufferedTarget, Playable, WrapMode, WrapModeMask, WrappedInfo, HierarchyPath, evaluatePath, legacyCC, ccenum, assertIsNonNullable, assertIsTrue, debug, EventType, ICurveInstance, InvalidIndex, AnimationState;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function makeSamplerSharedGroup(sampler) {
    return {
      sampler: sampler,
      curves: [],
      samplerResultCache: {
        from: 0,
        fromRatio: 0,
        to: 0,
        toRatio: 0
      }
    };
  }

  function isTargetingTRS(path) {
    var prs;

    if (path.length === 1 && typeof path[0] === 'string') {
      prs = path[0];
    } else if (path.length > 1) {
      for (var i = 0; i < path.length - 1; ++i) {
        if (!(path[i] instanceof HierarchyPath)) {
          return false;
        }
      }

      prs = path[path.length - 1];
    }

    switch (prs) {
      case 'position':
      case 'scale':
      case 'rotation':
      case 'eulerAngles':
        return true;

      default:
        return false;
    }
  }

  function wrapIterations(iterations) {
    if (iterations - (iterations | 0) === 0) {
      iterations -= 1;
    }

    return iterations | 0;
  }

  _export("EventType", void 0);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_sceneGraphNodeJs) {
      Node = _sceneGraphNodeJs.Node;
    }, function (_boundTargetJs) {
      createBoundTarget = _boundTargetJs.createBoundTarget;
      createBufferedTarget = _boundTargetJs.createBufferedTarget;
    }, function (_playableJs) {
      Playable = _playableJs.Playable;
    }, function (_typesJs) {
      WrapMode = _typesJs.WrapMode;
      WrapModeMask = _typesJs.WrapModeMask;
      WrappedInfo = _typesJs.WrappedInfo;
    }, function (_targetPathJs) {
      HierarchyPath = _targetPathJs.HierarchyPath;
      evaluatePath = _targetPathJs.evaluatePath;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_valueTypesEnumJs) {
      ccenum = _valueTypesEnumJs.ccenum;
    }, function (_dataUtilsAssertsJs) {
      assertIsNonNullable = _dataUtilsAssertsJs.assertIsNonNullable;
      assertIsTrue = _dataUtilsAssertsJs.assertIsTrue;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs.debug;
    }],
    execute: function () {
      (function (EventType) {
        EventType["PLAY"] = "play";
        EventType["STOP"] = "stop";
        EventType["PAUSE"] = "pause";
        EventType["RESUME"] = "resume";
        EventType["LASTFRAME"] = "lastframe";
        EventType["FINISHED"] = "finished";
      })(EventType || _export("EventType", EventType = {}));

      ccenum(EventType);

      _export("ICurveInstance", ICurveInstance = /*#__PURE__*/function () {
        function ICurveInstance(runtimeCurve, target, boundTarget) {
          this.commonTargetIndex = -1;
          this._curve = void 0;
          this._boundTarget = void 0;
          this._curveDetail = void 0;
          this._curve = runtimeCurve.curve;
          this._curveDetail = runtimeCurve;
          this._boundTarget = boundTarget;
          this._shouldLerp = runtimeCurve.curve.hasLerp();
        }

        var _proto = ICurveInstance.prototype;

        _proto.applySample = function applySample(ratio, index, inBetween, samplerResultCache, weight) {
          var value;

          if (!this._shouldLerp || !inBetween) {
            value = this._curve.valueAt(index);
          } else {
            value = this._curve.valueBetween(ratio, samplerResultCache.from, samplerResultCache.fromRatio, samplerResultCache.to, samplerResultCache.toRatio);
          }

          this._setValue(value, weight);
        };

        _proto._setValue = function _setValue(value, weight) {
          this._boundTarget.setValue(value);
        };

        _createClass(ICurveInstance, [{
          key: "propertyName",
          get: function get() {
            return '';
          }
        }, {
          key: "curveDetail",
          get: function get() {
            return this._curveDetail;
          }
        }]);

        return ICurveInstance;
      }());
      /**
       * The curves in ISamplerSharedGroup share a same keys.
       */


      InvalidIndex = -1;
      /**
       * @en
       * The AnimationState gives full control over animation playback process.
       * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
       * @zh
       * AnimationState 完全控制动画播放过程。<br/>
       * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
       *
       */

      _export("AnimationState", AnimationState = /*#__PURE__*/function (_Playable) {
        _inheritsLoose(AnimationState, _Playable);

        function AnimationState(clip, name) {
          var _this;

          if (name === void 0) {
            name = '';
          }

          _this = _Playable.call(this) || this;
          _this.duration = 1.0;
          _this.speed = 1.0;
          _this.time = 0.0;
          _this.frameRate = 0;
          _this._targetNode = null;
          _this._curveLoaded = false;
          _this._clip = void 0;
          _this._useSimpleProcess = false;
          _this._samplerSharedGroups = [];
          _this._target = null;
          _this._ignoreIndex = InvalidIndex;
          _this._commonTargetStatuses = [];
          _this._wrapMode = WrapMode.Normal;
          _this._repeatCount = 1;
          _this._delay = 0.0;
          _this._delayTime = 0.0;
          _this._currentFramePlayed = false;
          _this._lastIterations = NaN;
          _this._lastWrapInfo = null;
          _this._lastWrapInfoEvent = null;
          _this._wrappedInfo = new WrappedInfo();
          _this._blendStateBuffer = null;
          _this._blendStateWriters = [];
          _this._allowLastFrame = false;
          _this._blendStateWriterHost = {
            weight: 0.0
          };
          _this._playbackDuration = 0.0;
          _this._invDuration = 1.0;
          _this._weight = 0.0;
          _this._clipHasEvent = false;
          _this._clip = clip;
          _this._name = name || clip && clip.name;
          _this._playbackRange = {
            min: 0.0,
            max: clip.duration
          };
          _this._playbackDuration = clip.duration;

          if (!clip.duration) {
            debug("Clip " + clip.name + " has zero duration.");
          }

          return _this;
        }
        /**
         * This method is used for internal purpose only.
         */


        var _proto2 = AnimationState.prototype;

        _proto2.initialize = function initialize(root, propertyCurves) {
          var _legacyCC$director$ge,
              _legacyCC$director$ge2,
              _this2 = this;

          if (this._curveLoaded) {
            return;
          }

          this._curveLoaded = true;

          this._destroyBlendStateWriters();

          this._samplerSharedGroups.length = 0;
          this._blendStateBuffer = (_legacyCC$director$ge = (_legacyCC$director$ge2 = legacyCC.director.getAnimationManager()) === null || _legacyCC$director$ge2 === void 0 ? void 0 : _legacyCC$director$ge2.blendState) !== null && _legacyCC$director$ge !== void 0 ? _legacyCC$director$ge : null;
          this._targetNode = root;
          var clip = this._clip;
          this.duration = clip.duration;
          this._invDuration = 1.0 / this.duration;
          this.speed = clip.speed;
          this.wrapMode = clip.wrapMode;
          this.frameRate = clip.sample;
          this._playbackRange.min = 0.0;
          this._playbackRange.max = clip.duration;
          this._playbackDuration = clip.duration;
          this._clipHasEvent = clip.hasEvents();

          if ((this.wrapMode & WrapModeMask.Loop) === WrapModeMask.Loop) {
            this.repeatCount = Infinity;
          } else {
            this.repeatCount = 1;
          }
          /**
           * Create the bound target. Especially optimized for skeletal case.
           */


          var createBoundTargetOptimized = function createBoundTargetOptimized(rootTarget, path, valueAdapter, isConstant) {
            if (!clip.enableTrsBlending || !isTargetingTRS(path) || !_this2._blendStateBuffer) {
              return createBoundTarget(rootTarget, path, valueAdapter);
            } else {
              var targetNode = evaluatePath.apply(void 0, [rootTarget].concat(path.slice(0, path.length - 1)));

              if (targetNode !== null && targetNode instanceof Node) {
                var propertyName = path[path.length - 1];

                var blendStateWriter = _this2._blendStateBuffer.createWriter(targetNode, propertyName, _this2._blendStateWriterHost, isConstant);

                _this2._blendStateWriters.push(blendStateWriter);

                return blendStateWriter;
              }
            }

            return null;
          };

          this._commonTargetStatuses = clip.commonTargets.map(function (commonTarget, index) {
            var boundTarget = createBoundTargetOptimized(root, commonTarget.modifiers, commonTarget.valueAdapter, false);

            if (!boundTarget) {
              return null;
            }

            var target = createBufferedTarget(boundTarget);

            if (target === null) {
              return null;
            } else {
              return {
                target: target,
                changed: false
              };
            }
          });

          if (!propertyCurves) {
            propertyCurves = clip.getPropertyCurves();
          }

          var _loop = function _loop(iPropertyCurve) {
            var propertyCurve = propertyCurves[iPropertyCurve];

            if (propertyCurve.curve.empty()) {
              return "continue";
            }

            var samplerSharedGroup = _this2._samplerSharedGroups.find(function (value) {
              return value.sampler === propertyCurve.sampler;
            });

            if (!samplerSharedGroup) {
              samplerSharedGroup = makeSamplerSharedGroup(propertyCurve.sampler);

              _this2._samplerSharedGroups.push(samplerSharedGroup);
            }

            var rootTarget = void 0;

            if (typeof propertyCurve.commonTarget === 'undefined') {
              rootTarget = root;
            } else {
              var commonTargetStatus = _this2._commonTargetStatuses[propertyCurve.commonTarget];

              if (!commonTargetStatus) {
                return "continue";
              }

              rootTarget = commonTargetStatus.target.peek();
            }

            var boundTarget = createBoundTargetOptimized(rootTarget, propertyCurve.modifiers, propertyCurve.valueAdapter, propertyCurve.curve.constant());

            if (boundTarget === null) {// warn(`Failed to bind "${root.name}" to curve in clip ${clip.name}: ${err}`);
            } else {
              var _propertyCurve$common;

              var curveInstance = new ICurveInstance(propertyCurve, rootTarget, boundTarget);
              curveInstance.commonTargetIndex = (_propertyCurve$common = propertyCurve.commonTarget) !== null && _propertyCurve$common !== void 0 ? _propertyCurve$common : -1;
              samplerSharedGroup.curves.push(curveInstance);
            }
          };

          for (var iPropertyCurve = 0; iPropertyCurve < propertyCurves.length; ++iPropertyCurve) {
            var _ret = _loop(iPropertyCurve);

            if (_ret === "continue") continue;
          }
        };

        _proto2.destroy = function destroy() {
          this._destroyBlendStateWriters();
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        ;

        _proto2.emit = function emit() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          legacyCC.director.getAnimationManager().pushDelayEvent(this._emit, this, args);
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto2.on = function on(type, callback, target) {
          if (this._target && this._target.isValid) {
            return this._target.on(type, callback, target);
          } else {
            return null;
          }
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto2.once = function once(type, callback, target) {
          if (this._target && this._target.isValid) {
            return this._target.once(type, callback, target);
          } else {
            return null;
          }
        }
        /**
         * @deprecated Since V1.1.1, animation states were no longer defined as event targets.
         * To process animation events, use `Animation` instead.
         */
        // eslint-disable-next-line @typescript-eslint/ban-types
        ;

        _proto2.off = function off(type, callback, target) {
          if (this._target && this._target.isValid) {
            this._target.off(type, callback, target);
          }
        }
        /**
         * @zh
         * 是否允许触发 `LastFrame` 事件。
         * 该方法仅用作内部用途。
         * @en
         * Whether `LastFrame` should be triggered.
         * @param allowed True if the last frame events may be triggered.
         * This method is only used for internal purpose only.
         */
        ;

        _proto2.allowLastFrameEvent = function allowLastFrameEvent(allowed) {
          this._allowLastFrame = allowed;
        }
        /**
         * This method is used for internal purpose only.
         */
        ;

        _proto2._setEventTarget = function _setEventTarget(target) {
          this._target = target;
        };

        _proto2.setTime = function setTime(time) {
          this._currentFramePlayed = false;
          this.time = time || 0.0;

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._lastWrapInfoEvent = null;
            this._ignoreIndex = InvalidIndex;
            var info = this.getWrappedInfo(time, this._wrappedInfo);
            var direction = info.direction;

            var frameIndex = this._clip.getEventGroupIndexAtRatio(info.ratio); // only ignore when time not on a frame index


            if (frameIndex < 0) {
              frameIndex = ~frameIndex - 1; // if direction is inverse, then increase index

              if (direction < 0) {
                frameIndex += 1;
              }

              this._ignoreIndex = frameIndex;
            }
          }
        };

        _proto2.update = function update(delta) {
          // calculate delay time
          if (this._delayTime > 0.0) {
            this._delayTime -= delta;

            if (this._delayTime > 0.0) {
              // still waiting
              return;
            }
          } // make first frame perfect
          // var playPerfectFirstFrame = (this.time === 0);


          if (this._currentFramePlayed) {
            this.time += delta * this.speed;
          } else {
            this._currentFramePlayed = true;
          }

          this._process();
        };

        _proto2.sample = function sample() {
          var info = this.getWrappedInfo(this.time, this._wrappedInfo);

          this._sampleCurves(info.ratio);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._sampleEvents(info);
          }

          return info;
        };

        _proto2.onPlay = function onPlay() {
          this.setTime(0.0);
          this._delayTime = this._delay;

          this._onReplayOrResume();

          this.emit(EventType.PLAY, this);
        };

        _proto2.onStop = function onStop() {
          if (!this.isPaused) {
            this._onPauseOrStop();
          }

          this.emit(EventType.STOP, this);
        };

        _proto2.onResume = function onResume() {
          this._onReplayOrResume();

          this.emit(EventType.RESUME, this);
        };

        _proto2.onPause = function onPause() {
          this._onPauseOrStop();

          this.emit(EventType.PAUSE, this);
        };

        _proto2._sampleCurves = function _sampleCurves(ratio) {
          var weight = this.weight;
          var commonTargetStatuses = this._commonTargetStatuses; // Before we sample, we pull values of common targets.

          for (var iCommonTarget = 0, length = commonTargetStatuses.length; iCommonTarget < length; ++iCommonTarget) {
            var commonTargetStatus = commonTargetStatuses[iCommonTarget];

            if (!commonTargetStatus) {
              continue;
            }

            commonTargetStatus.target.pull();
            commonTargetStatus.changed = false;
          }

          var samplerSharedGroups = this._samplerSharedGroups;
          samplerSharedGroups.forEach(function (samplerSharedGroup) {
            var sampler = samplerSharedGroup.sampler,
                samplerResultCache = samplerSharedGroup.samplerResultCache;
            var index = 0;
            var lerpRequired = false;

            if (!sampler) {
              index = 0;
            } else {
              index = sampler.sample(ratio);

              if (index < 0) {
                index = ~index;

                if (index <= 0) {
                  index = 0;
                } else if (index >= sampler.ratios.length) {
                  index = sampler.ratios.length - 1;
                } else {
                  lerpRequired = true;
                  samplerResultCache.from = index - 1;
                  samplerResultCache.fromRatio = sampler.ratios[samplerResultCache.from];
                  samplerResultCache.to = index;
                  samplerResultCache.toRatio = sampler.ratios[samplerResultCache.to];
                  index = samplerResultCache.from;
                }
              }
            }

            var curves = samplerSharedGroup.curves;

            for (var iCurveInstance = 0, szCurves = curves.length; iCurveInstance < szCurves; ++iCurveInstance) {
              var curveInstance = curves[iCurveInstance];
              curveInstance.applySample(ratio, index, lerpRequired, samplerResultCache, weight);

              if (curveInstance.commonTargetIndex >= 0) {
                var _commonTargetStatus = commonTargetStatuses[curveInstance.commonTargetIndex];

                if (_commonTargetStatus) {
                  _commonTargetStatus.changed = true;
                }
              }
            }
          }); // After sample, we push values of common targets.

          for (var _iCommonTarget = 0, _length = commonTargetStatuses.length; _iCommonTarget < _length; ++_iCommonTarget) {
            var _commonTargetStatus2 = commonTargetStatuses[_iCommonTarget];

            if (!_commonTargetStatus2) {
              continue;
            }

            if (_commonTargetStatus2.changed) {
              _commonTargetStatus2.target.push();
            }
          }
        };

        _proto2._process = function _process() {
          if (this._useSimpleProcess) {
            this.simpleProcess();
          } else {
            this.process();
          }
        };

        _proto2.process = function process() {
          // sample
          var info = this.sample();

          if (this._allowLastFrame) {
            var lastInfo;

            if (!this._lastWrapInfo) {
              lastInfo = this._lastWrapInfo = new WrappedInfo(info);
            } else {
              lastInfo = this._lastWrapInfo;
            }

            if (this.repeatCount > 1 && (info.iterations | 0) > (lastInfo.iterations | 0)) {
              this.emit(EventType.LASTFRAME, this);
            }

            lastInfo.set(info);
          }

          if (info.stopped) {
            this.stop();
            this.emit(EventType.FINISHED, this);
          }
        };

        _proto2.simpleProcess = function simpleProcess() {
          var playbackStart = this._playbackRange.min;
          var playbackDuration = this._playbackDuration;
          var time = this.time % playbackDuration;

          if (time < 0.0) {
            time += playbackDuration;
          }

          var ratio = (playbackStart + time) * this._invDuration;

          this._sampleCurves(ratio);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            if (this._clipHasEvent) {
              this._sampleEvents(this.getWrappedInfo(this.time, this._wrappedInfo));
            }
          }

          if (this._allowLastFrame) {
            if (Number.isNaN(this._lastIterations)) {
              this._lastIterations = ratio;
            }

            if (this.time > 0 && this._lastIterations > ratio || this.time < 0 && this._lastIterations < ratio) {
              this.emit(EventType.LASTFRAME, this);
            }

            this._lastIterations = ratio;
          }
        };

        _proto2.cache = function cache(frames) {};

        _proto2._needReverse = function _needReverse(currentIterations) {
          var wrapMode = this.wrapMode;
          var needReverse = false;

          if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
            var isEnd = currentIterations - (currentIterations | 0) === 0;

            if (isEnd && currentIterations > 0) {
              currentIterations -= 1;
            }

            var isOddIteration = currentIterations & 1;

            if (isOddIteration) {
              needReverse = !needReverse;
            }
          }

          if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
            needReverse = !needReverse;
          }

          return needReverse;
        };

        _proto2.getWrappedInfo = function getWrappedInfo(time, info) {
          info = info || new WrappedInfo();

          var playbackStart = this._getPlaybackStart();

          var playbackEnd = this._getPlaybackEnd();

          var playbackDuration = playbackEnd - playbackStart;
          var stopped = false;
          var repeatCount = this.repeatCount;
          var currentIterations = time > 0 ? time / playbackDuration : -(time / playbackDuration);

          if (currentIterations >= repeatCount) {
            currentIterations = repeatCount;
            stopped = true;
            var tempRatio = repeatCount - (repeatCount | 0);

            if (tempRatio === 0) {
              tempRatio = 1; // 如果播放过，动画不复位
            }

            time = tempRatio * playbackDuration * (time > 0 ? 1 : -1);
          }

          if (time > playbackDuration) {
            var tempTime = time % playbackDuration;
            time = tempTime === 0 ? playbackDuration : tempTime;
          } else if (time < 0) {
            time %= playbackDuration;

            if (time !== 0) {
              time += playbackDuration;
            }
          }

          var needReverse = false;
          var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;

          if (shouldWrap) {
            needReverse = this._needReverse(currentIterations);
          }

          var direction = needReverse ? -1 : 1;

          if (this.speed < 0) {
            direction *= -1;
          } // calculate wrapped time


          if (shouldWrap && needReverse) {
            time = playbackDuration - time;
          }

          info.time = playbackStart + time;
          info.ratio = info.time / this.duration;
          info.direction = direction;
          info.stopped = stopped;
          info.iterations = currentIterations;
          return info;
        };

        _proto2._getPlaybackStart = function _getPlaybackStart() {
          return this._playbackRange.min;
        };

        _proto2._getPlaybackEnd = function _getPlaybackEnd() {
          return this._playbackRange.max;
        };

        _proto2._sampleEvents = function _sampleEvents(wrapInfo) {
          var length = this._clip.eventGroups.length;
          var direction = wrapInfo.direction;

          var eventIndex = this._clip.getEventGroupIndexAtRatio(wrapInfo.ratio);

          if (eventIndex < 0) {
            eventIndex = ~eventIndex - 1; // If direction is inverse, increase index.

            if (direction < 0) {
              eventIndex += 1;
            }
          }

          if (this._ignoreIndex !== eventIndex) {
            this._ignoreIndex = InvalidIndex;
          }

          wrapInfo.frameIndex = eventIndex;

          if (!this._lastWrapInfoEvent) {
            this._fireEvent(eventIndex);

            this._lastWrapInfoEvent = new WrappedInfo(wrapInfo);
            return;
          }

          var wrapMode = this.wrapMode;
          var currentIterations = wrapIterations(wrapInfo.iterations);
          var lastWrappedInfo = this._lastWrapInfoEvent;
          var lastIterations = wrapIterations(lastWrappedInfo.iterations);
          var lastIndex = lastWrappedInfo.frameIndex;
          var lastDirection = lastWrappedInfo.direction;
          var iterationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

          if (lastIndex === eventIndex && iterationsChanged && length === 1) {
            this._fireEvent(0);
          } else if (lastIndex !== eventIndex || iterationsChanged) {
            direction = lastDirection;

            do {
              if (lastIndex !== eventIndex) {
                if (direction === -1 && lastIndex === 0 && eventIndex > 0) {
                  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                    direction *= -1;
                  } else {
                    lastIndex = length;
                  }

                  lastIterations++;
                } else if (direction === 1 && lastIndex === length - 1 && eventIndex < length - 1) {
                  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                    direction *= -1;
                  } else {
                    lastIndex = -1;
                  }

                  lastIterations++;
                }

                if (lastIndex === eventIndex) {
                  break;
                }

                if (lastIterations > currentIterations) {
                  break;
                }
              }

              lastIndex += direction;
              legacyCC.director.getAnimationManager().pushDelayEvent(this._fireEvent, this, [lastIndex]);
            } while (lastIndex !== eventIndex && lastIndex > -1 && lastIndex < length);
          }

          this._lastWrapInfoEvent.set(wrapInfo);
        };

        _proto2._emit = function _emit(type, state) {
          if (this._target && this._target.isValid) {
            this._target.emit(type, type, state);
          }
        };

        _proto2._fireEvent = function _fireEvent(index) {
          if (!this._targetNode || !this._targetNode.isValid) {
            return;
          }

          var eventGroups = this._clip.eventGroups;

          if (index < 0 || index >= eventGroups.length || this._ignoreIndex === index) {
            return;
          }

          var eventGroup = eventGroups[index];
          var components = this._targetNode.components;

          for (var _iterator = _createForOfIteratorHelperLoose(eventGroup.events), _step; !(_step = _iterator()).done;) {
            var event = _step.value;
            var functionName = event.functionName;

            for (var _iterator2 = _createForOfIteratorHelperLoose(components), _step2; !(_step2 = _iterator2()).done;) {
              var component = _step2.value;
              var fx = component[functionName];

              if (typeof fx === 'function') {
                fx.apply(component, event.parameters);
              }
            }
          }
        };

        _proto2._onReplayOrResume = function _onReplayOrResume() {
          legacyCC.director.getAnimationManager().addAnimation(this);
        };

        _proto2._onPauseOrStop = function _onPauseOrStop() {
          legacyCC.director.getAnimationManager().removeAnimation(this);
        };

        _proto2._destroyBlendStateWriters = function _destroyBlendStateWriters() {
          if (this._blendStateWriters.length) {
            assertIsNonNullable(this._blendStateBuffer);
          }

          for (var iBlendStateWriter = 0; iBlendStateWriter < this._blendStateWriters.length; ++iBlendStateWriter) {
            this._blendStateBuffer.destroyWriter(this._blendStateWriters[iBlendStateWriter]);
          }

          this._blendStateWriters.length = 0;

          if (this._blendStateBuffer) {
            this._blendStateBuffer = null;
          }
        };

        _createClass(AnimationState, [{
          key: "clip",
          get:
          /**
           * @en The clip that is being played by this animation state.
           * @zh 此动画状态正在播放的剪辑。
           */
          function get() {
            return this._clip;
          }
          /**
           * @en The name of the playing animation.
           * @zh 动画的名字。
           */

        }, {
          key: "name",
          get: function get() {
            return this._name;
          }
        }, {
          key: "length",
          get: function get() {
            return this.duration;
          }
          /**
           * @en
           * Wrapping mode of the playing animation.
           * Notice : dynamic change wrapMode will reset time and repeatCount property
           * @zh
           * 动画循环方式。
           * 需要注意的是，动态修改 wrapMode 时，会重置 time 以及 repeatCount。
           * @default: WrapMode.Normal
           */

        }, {
          key: "wrapMode",
          get: function get() {
            return this._wrapMode;
          },
          set: function set(value) {
            this._wrapMode = value;

            if (EDITOR && !legacyCC.GAME_VIEW) {
              return;
            } // dynamic change wrapMode will need reset time to 0


            this.time = 0;

            if (value & WrapModeMask.Loop) {
              this.repeatCount = Infinity;
            } else {
              this.repeatCount = 1;
            }
          }
          /**
           * @en The animation's iteration count property.
           *
           * A real number greater than or equal to zero (including positive infinity) representing the number of times
           * to repeat the animation node.
           *
           * Values less than zero and NaN values are treated as the value 1.0 for the purpose of timing model
           * calculations.
           *
           * @zh 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）。
           *
           * @default 1
           */

        }, {
          key: "repeatCount",
          get: function get() {
            return this._repeatCount;
          },
          set: function set(value) {
            this._repeatCount = value;
            var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
            var reverse = (this.wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse;

            if (value === Infinity && !shouldWrap && !reverse) {
              this._useSimpleProcess = true;
            } else {
              this._useSimpleProcess = false;
            }
          }
          /**
           * @en The start delay which represents the number of seconds from an animation's start time to the start of
           * the active interval.
           * @zh 延迟多少秒播放。
           * @default 0
           */

        }, {
          key: "delay",
          get: function get() {
            return this._delay;
          },
          set: function set(value) {
            this._delayTime = this._delay = value;
          } // http://www.w3.org/TR/web-animations/#idl-def-AnimationTiming

          /**
           * @en The iteration duration of this animation in seconds. (length)
           * @zh 单次动画的持续时间，秒。（动画长度）
           * @readOnly
           */

        }, {
          key: "playbackRange",
          get:
          /**
           * @en
           * Gets or sets the playback range.
           * The `min` and `max` field of the range are measured in seconds.
           * While setting, the range object should be a valid range.
           * The actual playback range would be the inclusion of this field and [0, duration].
           * @zh
           * 获取或设置播放范围。
           * 范围的 `min`、`max` 字段都是以秒为单位的。
           * 设置时，应当指定一个有效的范围；实际的播放范围是该字段和 [0, 周期] 之间的交集。
           * 设置播放范围时将重置累计播放时间。
           */
          function get() {
            return this._playbackRange;
          },
          set: function set(value) {
            assertIsTrue(value.max > value.min);
            this._playbackRange.min = Math.max(value.min, 0);
            this._playbackRange.max = Math.min(value.max, this.duration);
            this._playbackDuration = this._playbackRange.max - this._playbackRange.min;
            this.setTime(0.0);
          }
          /**
           * @en The animation's playback speed. 1 is normal playback speed.
           * @zh 播放速率。
           * @default: 1.0
           */

        }, {
          key: "current",
          get:
          /**
           * @en Gets the time progress, in seconds.
           * @zh 获取动画的时间进度，单位为秒。
           */
          function get() {
            return this.getWrappedInfo(this.time).time;
          }
          /**
           * @en Gets the playback ratio.
           * @zh 获取动画播放的比例时间。
           */

        }, {
          key: "ratio",
          get: function get() {
            return this.current / this.duration;
          }
          /**
           * The weight.
           */

        }, {
          key: "weight",
          get: function get() {
            return this._weight;
          },
          set: function set(value) {
            this._weight = value;
            this._blendStateWriterHost.weight = value;
          }
        }, {
          key: "curveLoaded",
          get: function get() {
            return this._curveLoaded;
          }
        }]);

        return AnimationState;
      }(Playable));

      legacyCC.AnimationState = AnimationState;
    }
  };
});