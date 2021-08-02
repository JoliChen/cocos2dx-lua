System.register("q-bundled:///fs/cocos/core/animation/cross-fade.js", ["../math/utils.js", "../utils/array.js", "./playable.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var clamp01, remove, Playable, legacyCC, CrossFade;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_mathUtilsJs) {
      clamp01 = _mathUtilsJs.clamp01;
    }, function (_utilsArrayJs) {
      remove = _utilsArrayJs.remove;
    }, function (_playableJs) {
      Playable = _playableJs.Playable;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("CrossFade", CrossFade = /*#__PURE__*/function (_Playable) {
        _inheritsLoose(CrossFade, _Playable);

        function CrossFade(scheduler) {
          var _this;

          _this = _Playable.call(this) || this;
          _this._managedStates = [];
          _this._fadings = [];
          _this._scheduled = false;
          _this._scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : legacyCC.director.getAnimationManager();
          return _this;
        }

        var _proto = CrossFade.prototype;

        _proto.update = function update(deltaTime) {
          if (this.isMotionless) {
            return;
          }

          var managedStates = this._managedStates;
          var fadings = this._fadings;

          if (managedStates.length === 1 && fadings.length === 1) {
            var state = managedStates[0].state;

            if (state) {
              state.weight = 1.0;
            }
          } else {
            this._calculateWeights(deltaTime);
          }

          if (managedStates.length === 1 && fadings.length === 1) {
            // Definitely not code repetition
            this._unscheduleThis();
          }
        }
        /**
         * 在指定时间内将从当前动画状态切换到指定的动画状态。
         * @param state 指定的动画状态。
         * @param duration 切换时间。
         */
        ;

        _proto.crossFade = function crossFade(state, duration) {
          var _target$state;

          if (this._managedStates.length === 0) {
            // If we are cross fade from a "initial" pose,
            // we do not use the duration.
            // It's meaning-less and may get a bad visual effect.
            duration = 0;
          }

          if (duration === 0) {
            this.clear();
          }

          var target = this._managedStates.find(function (weightedState) {
            return weightedState.state === state;
          });

          if (!target) {
            target = {
              state: state,
              reference: 0
            };

            if (state) {
              state.play();
            }

            this._managedStates.push(target);
          } else if ((_target$state = target.state) === null || _target$state === void 0 ? void 0 : _target$state.isMotionless) {
            target.state.play();
          }

          ++target.reference;

          this._fadings.unshift({
            easeDuration: duration,
            easeTime: 0,
            target: target
          });

          if (!this.isMotionless) {
            this._scheduleThis();
          }
        };

        _proto.clear = function clear() {
          for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            var state = this._managedStates[iManagedState].state;

            if (state) {
              state.stop();
            }
          }

          this._managedStates.length = 0;
          this._fadings.length = 0;
        };

        _proto.onPlay = function onPlay() {
          _Playable.prototype.onPlay.call(this);

          this._scheduleThis();
        }
        /**
         * 停止我们淡入淡出的所有动画状态并停止淡入淡出。
         */
        ;

        _proto.onPause = function onPause() {
          _Playable.prototype.onPause.call(this);

          for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            var state = this._managedStates[iManagedState].state;

            if (state) {
              state.pause();
            }
          }

          this._unscheduleThis();
        }
        /**
         * 恢复我们淡入淡出的所有动画状态并继续淡入淡出。
         */
        ;

        _proto.onResume = function onResume() {
          _Playable.prototype.onResume.call(this);

          for (var iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            var state = this._managedStates[iManagedState].state;

            if (state) {
              state.resume();
            }
          }

          this._scheduleThis();
        }
        /**
         * 停止所有淡入淡出的动画状态。
         */
        ;

        _proto.onStop = function onStop() {
          _Playable.prototype.onStop.call(this);

          this.clear();
        };

        _proto._calculateWeights = function _calculateWeights(deltaTime) {
          var managedStates = this._managedStates;
          var fadings = this._fadings; // Set all state's weight to 0.

          for (var iManagedState = 0; iManagedState < managedStates.length; ++iManagedState) {
            var state = managedStates[iManagedState].state;

            if (state) {
              state.weight = 0;
            }
          } // Allocate weights.


          var absoluteWeight = 1.0;
          var deadFadingBegin = fadings.length;

          for (var iFading = 0; iFading < fadings.length; ++iFading) {
            var fading = fadings[iFading];
            fading.easeTime += deltaTime; // We should properly handle the case of
            // `fading.easeTime === 0 && fading.easeDuration === 0`, which yields `NaN`.

            var relativeWeight = fading.easeDuration === 0 ? 1 : clamp01(fading.easeTime / fading.easeDuration);
            var weight = relativeWeight * absoluteWeight;
            absoluteWeight *= 1.0 - relativeWeight;

            if (fading.target.state) {
              fading.target.state.weight += weight;
            }

            if (fading.easeTime >= fading.easeDuration) {
              deadFadingBegin = iFading + 1;
              fading.easeTime = fading.easeDuration;
              break;
            }
          } // Kill fadings having no lifetime.


          if (deadFadingBegin !== fadings.length) {
            for (var iDeadFading = deadFadingBegin; iDeadFading < fadings.length; ++iDeadFading) {
              var deadFading = fadings[iDeadFading];
              --deadFading.target.reference;

              if (deadFading.target.reference <= 0) {
                if (deadFading.target.state) {
                  deadFading.target.state.stop();
                }

                remove(this._managedStates, deadFading.target);
              }
            }

            fadings.splice(deadFadingBegin);
          }
        };

        _proto._scheduleThis = function _scheduleThis() {
          if (!this._scheduled) {
            this._scheduler.addCrossFade(this);

            this._scheduled = true;
          }
        };

        _proto._unscheduleThis = function _unscheduleThis() {
          if (this._scheduled) {
            this._scheduler.removeCrossFade(this);

            this._scheduled = false;
          }
        };

        return CrossFade;
      }(Playable));
    }
  };
});