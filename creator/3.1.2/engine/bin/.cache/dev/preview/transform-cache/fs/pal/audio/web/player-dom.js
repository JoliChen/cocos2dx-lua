System.register("q-bundled:///fs/pal/audio/web/player-dom.js", ["../../system/web/system.js", "../type.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/global-exports.js", "../../../cocos/core/index.js", "../operation-queue.js", "../../system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var system, AudioEvent, AudioState, AudioType, EventTarget, legacyCC, clamp, clamp01, enqueueOperation, BrowserType, OS, _class, _temp, OneShotAudioDOM, AudioPlayerDOM;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function ensurePlaying(domAudio) {
    return new Promise(function (resolve) {
      var promise = domAudio.play();

      if (promise === undefined) {
        // Chrome50/Firefox53 below
        return resolve();
      }

      promise.then(resolve)["catch"](function () {
        var onGesture = function onGesture() {
          domAudio.play()["catch"](function (e) {});
          resolve();
        };

        var canvas = document.getElementById('GameCanvas');
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
          once: true
        });
        canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', onGesture, {
          once: true
        });
      });
      return null;
    });
  }

  return {
    setters: [function (_systemWebSystemJs) {
      system = _systemWebSystemJs.system;
    }, function (_typeJs) {
      AudioEvent = _typeJs.AudioEvent;
      AudioState = _typeJs.AudioState;
      AudioType = _typeJs.AudioType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreGlobalExportsJs) {
      legacyCC = _cocosCoreGlobalExportsJs.legacyCC;
    }, function (_cocosCoreIndexJs) {
      clamp = _cocosCoreIndexJs.clamp;
      clamp01 = _cocosCoreIndexJs.clamp01;
    }, function (_operationQueueJs) {
      enqueueOperation = _operationQueueJs.enqueueOperation;
    }, function (_systemEnumTypeIndexJs) {
      BrowserType = _systemEnumTypeIndexJs.BrowserType;
      OS = _systemEnumTypeIndexJs.OS;
    }],
    execute: function () {
      _export("OneShotAudioDOM", OneShotAudioDOM = /*#__PURE__*/function () {
        function OneShotAudioDOM(nativeAudio, volume) {
          this._domAudio = void 0;
          this._onPlayCb = void 0;
          this._onEndCb = void 0;
          this._domAudio = nativeAudio;
          nativeAudio.volume = volume;
        }

        var _proto = OneShotAudioDOM.prototype;

        _proto.play = function play() {
          var _this = this;

          ensurePlaying(this._domAudio).then(function () {
            var _this$onPlay;

            (_this$onPlay = _this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(_this);
          })["catch"](function (e) {});
        };

        _proto.stop = function stop() {
          this._domAudio.pause();
        };

        _createClass(OneShotAudioDOM, [{
          key: "onPlay",
          get: function get() {
            return this._onPlayCb;
          },
          set: function set(cb) {
            this._onPlayCb = cb;
          }
        }, {
          key: "onEnd",
          get: function get() {
            return this._onEndCb;
          },
          set: function set(cb) {
            if (this._onEndCb) {
              this._domAudio.removeEventListener('ended', this._onEndCb);
            }

            this._onEndCb = cb;

            if (cb) {
              this._domAudio.addEventListener('ended', cb);
            }
          }
        }]);

        return OneShotAudioDOM;
      }());

      _export("AudioPlayerDOM", AudioPlayerDOM = (_class = (_temp = /*#__PURE__*/function () {
        // NOTE: the implemented interface properties need to be public access
        function AudioPlayerDOM(nativeAudio) {
          var _this2 = this;

          this._domAudio = void 0;
          this._state = AudioState.INIT;
          this._onHide = void 0;
          this._onShow = void 0;
          this._onEnded = void 0;
          this._eventTarget = new EventTarget();
          this._operationQueue = [];
          this._domAudio = nativeAudio; // event
          // TODO: should not call engine API in pal

          this._onHide = function () {
            if (_this2._state === AudioState.PLAYING) {
              _this2.pause().then(function () {
                _this2._state = AudioState.INTERRUPTED;

                _this2._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
              })["catch"](function (e) {});
            }
          };

          legacyCC.game.on(legacyCC.Game.EVENT_HIDE, this._onHide);

          this._onShow = function () {
            if (_this2._state === AudioState.INTERRUPTED) {
              _this2.play().then(function () {
                _this2._eventTarget.emit(AudioEvent.INTERRUPTION_END);
              })["catch"](function (e) {});
            }
          };

          legacyCC.game.on(legacyCC.Game.EVENT_SHOW, this._onShow);

          this._onEnded = function () {
            _this2.seek(0)["catch"](function (e) {});

            _this2._state = AudioState.INIT;

            _this2._eventTarget.emit(AudioEvent.ENDED);
          };

          this._domAudio.addEventListener('ended', this._onEnded);
        }

        var _proto2 = AudioPlayerDOM.prototype;

        _proto2.destroy = function destroy() {
          if (this._onShow) {
            legacyCC.game.off(legacyCC.Game.EVENT_SHOW, this._onShow);
            this._onShow = undefined;
          }

          if (this._onHide) {
            legacyCC.game.off(legacyCC.Game.EVENT_HIDE, this._onHide);
            this._onHide = undefined;
          }

          if (this._onEnded) {
            this._domAudio.removeEventListener('ended', this._onEnded);

            this._onEnded = undefined;
          } // @ts-expect-error need to release DOM Audio instance


          this._domAudio = undefined;
        };

        AudioPlayerDOM.load = function load(url) {
          return new Promise(function (resolve) {
            AudioPlayerDOM.loadNative(url).then(function (domAudio) {
              resolve(new AudioPlayerDOM(domAudio));
            })["catch"](function (e) {});
          });
        };

        AudioPlayerDOM.loadNative = function loadNative(url) {
          return new Promise(function (resolve, reject) {
            var domAudio = document.createElement('audio');
            var sys = legacyCC.sys;
            var loadedEvent = 'canplaythrough';

            if (system.os === OS.IOS) {
              // iOS no event that used to parse completed callback
              // this time is not complete, can not play
              loadedEvent = 'loadedmetadata';
            } else if (system.browserType === BrowserType.FIREFOX) {
              loadedEvent = 'canplay';
            }

            var timer = setTimeout(function () {
              if (domAudio.readyState === 0) {
                failure();
              } else {
                success();
              }
            }, 8000);

            var clearEvent = function clearEvent() {
              clearTimeout(timer);
              domAudio.removeEventListener(loadedEvent, success, false);
              domAudio.removeEventListener('error', failure, false);
            };

            var success = function success() {
              clearEvent();
              resolve(domAudio);
            };

            var failure = function failure() {
              clearEvent();
              var message = "load audio failure - " + url;
              reject(message);
            };

            domAudio.addEventListener(loadedEvent, success, false);
            domAudio.addEventListener('error', failure, false);
            domAudio.src = url;
          });
        };

        AudioPlayerDOM.loadOneShotAudio = function loadOneShotAudio(url, volume) {
          return new Promise(function (resolve, reject) {
            AudioPlayerDOM.loadNative(url).then(function (domAudio) {
              // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
              var oneShotAudio = new OneShotAudioDOM(domAudio, volume);
              resolve(oneShotAudio);
            })["catch"](reject);
          });
        };

        _proto2.seek = function seek(time) {
          time = clamp(time, 0, this.duration);
          this._domAudio.currentTime = time;
          return Promise.resolve();
        };

        _proto2.play = function play() {
          var _this3 = this;

          return new Promise(function (resolve) {
            ensurePlaying(_this3._domAudio).then(function () {
              _this3._state = AudioState.PLAYING;
              resolve();
            })["catch"](function (e) {});
          });
        };

        _proto2.pause = function pause() {
          this._domAudio.pause();

          this._state = AudioState.PAUSED;
          return Promise.resolve();
        };

        _proto2.stop = function stop() {
          var _this4 = this;

          return new Promise(function (resolve) {
            _this4._domAudio.pause();

            _this4._domAudio.currentTime = 0;
            _this4._state = AudioState.STOPPED;
            resolve();
          });
        };

        _proto2.onInterruptionBegin = function onInterruptionBegin(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto2.offInterruptionBegin = function offInterruptionBegin(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto2.onInterruptionEnd = function onInterruptionEnd(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto2.offInterruptionEnd = function offInterruptionEnd(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto2.onEnded = function onEnded(cb) {
          this._eventTarget.on(AudioEvent.ENDED, cb);
        };

        _proto2.offEnded = function offEnded(cb) {
          this._eventTarget.off(AudioEvent.ENDED, cb);
        };

        _createClass(AudioPlayerDOM, [{
          key: "src",
          get: function get() {
            return this._domAudio ? this._domAudio.src : '';
          }
        }, {
          key: "type",
          get: function get() {
            return AudioType.DOM_AUDIO;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "loop",
          get: function get() {
            return this._domAudio.loop;
          },
          set: function set(val) {
            this._domAudio.loop = val;
          }
        }, {
          key: "volume",
          get: function get() {
            return this._domAudio.volume;
          },
          set: function set(val) {
            val = clamp01(val);
            this._domAudio.volume = val;
          }
        }, {
          key: "duration",
          get: function get() {
            return this._domAudio.duration;
          }
        }, {
          key: "currentTime",
          get: function get() {
            return this._domAudio.currentTime;
          }
        }]);

        return AudioPlayerDOM;
      }(), _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class));
    }
  };
});