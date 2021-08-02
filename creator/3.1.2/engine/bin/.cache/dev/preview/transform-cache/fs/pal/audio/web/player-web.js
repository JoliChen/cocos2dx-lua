System.register("q-bundled:///fs/pal/audio/web/player-web.js", ["../../../../virtual/internal%253Aconstants.js", "../type.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/global-exports.js", "../../../cocos/core/index.js", "../operation-queue.js"], function (_export, _context) {
  "use strict";

  var EDITOR, AudioEvent, AudioState, AudioType, EventTarget, legacyCC, clamp, clamp01, enqueueOperation, _class, _temp, AudioContextClass, AudioContextAgent, audioContextAgent, OneShotAudioWeb, AudioPlayerWeb;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
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
    }],
    execute: function () {
      // NOTE: fix CI
      AudioContextClass = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

      _export("AudioContextAgent", AudioContextAgent = /*#__PURE__*/function () {
        function AudioContextAgent() {
          this._context = void 0;
          this._context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
        }

        var _proto = AudioContextAgent.prototype;

        _proto.decodeAudioData = function decodeAudioData(audioData) {
          var _this = this;

          return new Promise(function (resolve) {
            var promise = _this._context.decodeAudioData(audioData, function (audioBuffer) {
              resolve(audioBuffer);
            }, function (err) {
              // TODO: need to reject the error.
              console.error('failed to load Web Audio', err);
            });

            promise === null || promise === void 0 ? void 0 : promise["catch"](function (e) {}); // Safari doesn't support the promise based decodeAudioData
          });
        };

        _proto.runContext = function runContext() {
          var _this2 = this;

          return new Promise(function (resolve) {
            var context = _this2._context;

            if (!context.resume) {
              return resolve();
            }

            if (context.state === 'running') {
              return resolve();
            }

            context.resume()["catch"](function (e) {}); // promise rejection cannot be caught, need to check running state again

            if (context.state !== 'running') {
              var canvas = document.getElementById('GameCanvas');

              var onGesture = function onGesture() {
                context.resume().then(resolve)["catch"](function (e) {});
              };

              canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('touchend', onGesture, {
                once: true
              });
              canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('mousedown', onGesture, {
                once: true
              });
            }

            return null;
          });
        };

        _proto.createBufferSource = function createBufferSource(audioBuffer, loop) {
          var sourceBufferNode = this._context.createBufferSource();

          if (audioBuffer !== undefined) {
            sourceBufferNode.buffer = audioBuffer;
          }

          if (loop !== undefined) {
            sourceBufferNode.loop = loop;
          }

          return sourceBufferNode;
        };

        _proto.createGain = function createGain(volume) {
          if (volume === void 0) {
            volume = 1;
          }

          var gainNode = this._context.createGain();

          this.setGainValue(gainNode, volume);
          return gainNode;
        };

        _proto.setGainValue = function setGainValue(gain, volume) {
          if (gain.gain.setTargetAtTime) {
            try {
              gain.gain.setTargetAtTime(volume, this._context.currentTime, 0);
            } catch (e) {
              // Some unknown browsers may crash if timeConstant is 0
              gain.gain.setTargetAtTime(volume, this._context.currentTime, 0.01);
            }
          } else {
            gain.gain.value = volume;
          }
        };

        _proto.connectContext = function connectContext(audioNode) {
          if (!this._context) {
            return;
          }

          audioNode.connect(this._context.destination);
        };

        _createClass(AudioContextAgent, [{
          key: "currentTime",
          get: function get() {
            return this._context.currentTime;
          }
        }]);

        return AudioContextAgent;
      }());

      AudioContextAgent.support = !!AudioContextClass;

      if (AudioContextAgent.support) {
        audioContextAgent = new AudioContextAgent();
      }

      _export("OneShotAudioWeb", OneShotAudioWeb = /*#__PURE__*/function () {
        function OneShotAudioWeb(audioBuffer, volume) {
          this._duration = void 0;
          this._bufferSourceNode = void 0;
          this._onPlayCb = void 0;
          this._onEndCb = void 0;
          this._duration = audioBuffer.duration;
          this._bufferSourceNode = audioContextAgent.createBufferSource(audioBuffer, false);
          var gainNode = audioContextAgent.createGain(volume);

          this._bufferSourceNode.connect(gainNode);

          audioContextAgent.connectContext(gainNode);
        }

        var _proto2 = OneShotAudioWeb.prototype;

        _proto2.play = function play() {
          var _this3 = this;

          if (EDITOR) {
            return;
          } // audioContextAgent does exist


          audioContextAgent.runContext().then(function () {
            var _this3$onPlay;

            _this3._bufferSourceNode.start();

            (_this3$onPlay = _this3.onPlay) === null || _this3$onPlay === void 0 ? void 0 : _this3$onPlay.call(_this3);
            window.setTimeout(function () {
              var _this3$onEnd;

              (_this3$onEnd = _this3.onEnd) === null || _this3$onEnd === void 0 ? void 0 : _this3$onEnd.call(_this3);
            }, _this3._duration * 1000);
          })["catch"](function (e) {});
        };

        _proto2.stop = function stop() {
          this._bufferSourceNode.stop();
        };

        _createClass(OneShotAudioWeb, [{
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
            this._onEndCb = cb;
          }
        }]);

        return OneShotAudioWeb;
      }());

      _export("AudioPlayerWeb", AudioPlayerWeb = (_class = (_temp = /*#__PURE__*/function () {
        // NOTE: the implemented interface properties need to be public access
        function AudioPlayerWeb(audioBuffer, url) {
          var _this4 = this;

          this._src = void 0;
          this._audioBuffer = void 0;
          this._sourceNode = void 0;
          this._gainNode = void 0;
          this._currentTimer = 0;
          this._volume = 1;
          this._loop = false;
          this._startTime = 0;
          this._playTimeOffset = 0;
          this._state = AudioState.INIT;
          this._eventTarget = new EventTarget();
          this._operationQueue = [];
          this._onHide = void 0;
          this._onShow = void 0;
          this._audioBuffer = audioBuffer;
          this._gainNode = audioContextAgent.createGain();
          audioContextAgent.connectContext(this._gainNode);
          this._src = url; // event
          // TODO: should not call engine API in pal

          this._onHide = function () {
            if (_this4._state === AudioState.PLAYING) {
              _this4.pause().then(function () {
                _this4._state = AudioState.INTERRUPTED;

                _this4._eventTarget.emit(AudioEvent.INTERRUPTION_BEGIN);
              })["catch"](function (e) {});
            }
          };

          legacyCC.game.on(legacyCC.Game.EVENT_HIDE, this._onHide);

          this._onShow = function () {
            if (_this4._state === AudioState.INTERRUPTED) {
              _this4.play().then(function () {
                _this4._eventTarget.emit(AudioEvent.INTERRUPTION_END);
              })["catch"](function (e) {});
            }
          };

          legacyCC.game.on(legacyCC.Game.EVENT_SHOW, this._onShow);
        }

        var _proto3 = AudioPlayerWeb.prototype;

        _proto3.destroy = function destroy() {
          if (this._audioBuffer) {
            // @ts-expect-error need to release AudioBuffer instance
            this._audioBuffer = undefined;
          }

          if (this._onShow) {
            legacyCC.game.off(legacyCC.Game.EVENT_SHOW, this._onShow);
            this._onShow = undefined;
          }

          if (this._onHide) {
            legacyCC.game.off(legacyCC.Game.EVENT_HIDE, this._onHide);
            this._onHide = undefined;
          }
        };

        AudioPlayerWeb.load = function load(url) {
          return new Promise(function (resolve) {
            AudioPlayerWeb.loadNative(url).then(function (audioBuffer) {
              resolve(new AudioPlayerWeb(audioBuffer, url));
            })["catch"](function (e) {});
          });
        };

        AudioPlayerWeb.loadNative = function loadNative(url) {
          return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var errInfo = "load audio failed: " + url + ", status: ";
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function () {
              if (xhr.status === 200 || xhr.status === 0) {
                audioContextAgent.decodeAudioData(xhr.response).then(function (buffer) {
                  resolve(buffer);
                })["catch"](function (e) {});
              } else {
                reject(new Error("" + errInfo + xhr.status + "(no response)"));
              }
            };

            xhr.onerror = function () {
              reject(new Error("" + errInfo + xhr.status + "(error)"));
            };

            xhr.ontimeout = function () {
              reject(new Error("" + errInfo + xhr.status + "(time out)"));
            };

            xhr.onabort = function () {
              reject(new Error("" + errInfo + xhr.status + "(abort)"));
            };

            xhr.send(null);
          });
        };

        AudioPlayerWeb.loadOneShotAudio = function loadOneShotAudio(url, volume) {
          return new Promise(function (resolve, reject) {
            AudioPlayerWeb.loadNative(url).then(function (audioBuffer) {
              // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
              var oneShotAudio = new OneShotAudioWeb(audioBuffer, volume);
              resolve(oneShotAudio);
            })["catch"](reject);
          });
        };

        _proto3.seek = function seek(time) {
          var _this5 = this;

          return new Promise(function (resolve) {
            _this5._playTimeOffset = clamp(time, 0, _this5._audioBuffer.duration);

            if (_this5._state === AudioState.PLAYING) {
              // one AudioBufferSourceNode can't start twice
              // need to create a new one to start from the offset
              _this5._doPlay().then(resolve)["catch"](function (e) {});
            } else {
              resolve();
            }
          });
        };

        _proto3.play = function play() {
          if (EDITOR) {
            return Promise.resolve();
          }

          return this._doPlay();
        } // The decorated play() method can't be call in seek()
        // so we define this method to ensure that the audio seeking works.
        ;

        _proto3._doPlay = function _doPlay() {
          var _this6 = this;

          return new Promise(function (resolve) {
            audioContextAgent.runContext().then(function () {
              // one AudioBufferSourceNode can't start twice
              _this6._stopSourceNode();

              _this6._sourceNode = audioContextAgent.createBufferSource(_this6._audioBuffer, _this6.loop);

              _this6._sourceNode.connect(_this6._gainNode);

              _this6._sourceNode.start(0, _this6._playTimeOffset);

              _this6._state = AudioState.PLAYING;
              _this6._startTime = audioContextAgent.currentTime;
              /* still not supported by all platforms *
              this._sourceNode.onended = this._onEnded;
              /* doing it manually for now */

              var checkEnded = function checkEnded() {
                _this6._playTimeOffset = 0;
                _this6._startTime = audioContextAgent.currentTime;

                if (_this6.loop) {
                  _this6._currentTimer = window.setTimeout(checkEnded, _this6._audioBuffer.duration * 1000);
                } else {
                  // do ended
                  _this6._eventTarget.emit(AudioEvent.ENDED);

                  _this6._state = AudioState.INIT;
                }
              };

              window.clearTimeout(_this6._currentTimer);
              _this6._currentTimer = window.setTimeout(checkEnded, (_this6._audioBuffer.duration - _this6._playTimeOffset) * 1000);
              resolve();
            })["catch"](function (e) {});
          });
        };

        _proto3._stopSourceNode = function _stopSourceNode() {
          try {
            var _this$_sourceNode;

            (_this$_sourceNode = this._sourceNode) === null || _this$_sourceNode === void 0 ? void 0 : _this$_sourceNode.stop();
          } catch (e) {// sourceNode can't be stopped twice, especially on Safari.
          }
        };

        _proto3.pause = function pause() {
          if (this._state !== AudioState.PLAYING || !this._sourceNode) {
            return Promise.resolve();
          }

          this._playTimeOffset = (audioContextAgent.currentTime - this._startTime + this._playTimeOffset) % this._audioBuffer.duration;
          this._state = AudioState.PAUSED;
          window.clearTimeout(this._currentTimer);

          this._stopSourceNode();

          return Promise.resolve();
        };

        _proto3.stop = function stop() {
          if (!this._sourceNode) {
            return Promise.resolve();
          }

          this._playTimeOffset = 0;
          this._state = AudioState.STOPPED;
          window.clearTimeout(this._currentTimer);

          this._stopSourceNode();

          return Promise.resolve();
        };

        _proto3.onInterruptionBegin = function onInterruptionBegin(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto3.offInterruptionBegin = function offInterruptionBegin(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_BEGIN, cb);
        };

        _proto3.onInterruptionEnd = function onInterruptionEnd(cb) {
          this._eventTarget.on(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto3.offInterruptionEnd = function offInterruptionEnd(cb) {
          this._eventTarget.off(AudioEvent.INTERRUPTION_END, cb);
        };

        _proto3.onEnded = function onEnded(cb) {
          this._eventTarget.on(AudioEvent.ENDED, cb);
        };

        _proto3.offEnded = function offEnded(cb) {
          this._eventTarget.off(AudioEvent.ENDED, cb);
        };

        _createClass(AudioPlayerWeb, [{
          key: "src",
          get: function get() {
            return this._src;
          }
        }, {
          key: "type",
          get: function get() {
            return AudioType.WEB_AUDIO;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "loop",
          get: function get() {
            return this._loop;
          },
          set: function set(val) {
            this._loop = val;
            this._sourceNode && (this._sourceNode.loop = val);
          }
        }, {
          key: "volume",
          get: function get() {
            return this._volume;
          },
          set: function set(val) {
            val = clamp01(val);
            this._volume = val;
            audioContextAgent.setGainValue(this._gainNode, val);
          }
        }, {
          key: "duration",
          get: function get() {
            return this._audioBuffer.duration;
          }
        }, {
          key: "currentTime",
          get: function get() {
            if (this._state !== AudioState.PLAYING) {
              return this._playTimeOffset;
            }

            return (audioContextAgent.currentTime - this._startTime + this._playTimeOffset) % this._audioBuffer.duration;
          }
        }]);

        return AudioPlayerWeb;
      }(), _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class));
    }
  };
});