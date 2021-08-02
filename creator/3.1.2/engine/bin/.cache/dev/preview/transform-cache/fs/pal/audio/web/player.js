System.register("q-bundled:///fs/pal/audio/web/player.js", ["../../../cocos/core/index.js", "../type.js", "./player-dom.js", "./player-web.js"], function (_export, _context) {
  "use strict";

  var warnID, AudioType, AudioPlayerDOM, AudioContextAgent, AudioPlayerWeb, OneShotAudio, AudioPlayer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCoreIndexJs) {
      warnID = _cocosCoreIndexJs.warnID;
    }, function (_typeJs) {
      AudioType = _typeJs.AudioType;
    }, function (_playerDomJs) {
      AudioPlayerDOM = _playerDomJs.AudioPlayerDOM;
    }, function (_playerWebJs) {
      AudioContextAgent = _playerWebJs.AudioContextAgent;
      AudioPlayerWeb = _playerWebJs.AudioPlayerWeb;
    }],
    execute: function () {
      _export("OneShotAudio", OneShotAudio = /*#__PURE__*/function () {
        function OneShotAudio(audio) {
          this._audio = void 0;
          this._audio = audio;
        }

        var _proto = OneShotAudio.prototype;

        _proto.play = function play() {
          this._audio.play();
        };

        _proto.stop = function stop() {
          this._audio.stop();
        };

        _createClass(OneShotAudio, [{
          key: "onPlay",
          get: function get() {
            return this._audio.onPlay;
          },
          set: function set(v) {
            this._audio.onPlay = v;
          }
        }, {
          key: "onEnd",
          get: function get() {
            return this._audio.onEnd;
          },
          set: function set(v) {
            this._audio.onEnd = v;
          }
        }]);

        return OneShotAudio;
      }());

      _export("AudioPlayer", AudioPlayer = /*#__PURE__*/function () {
        function AudioPlayer(player) {
          this._player = void 0;
          this._player = player;
        }

        AudioPlayer.load = function load(url, opts) {
          return new Promise(function (resolve) {
            if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
              if (!AudioContextAgent.support) {
                warnID(5201);
              }

              AudioPlayerDOM.load(url).then(function (domPlayer) {
                resolve(new AudioPlayer(domPlayer));
              })["catch"](function (e) {});
            } else {
              AudioPlayerWeb.load(url).then(function (webPlayer) {
                resolve(new AudioPlayer(webPlayer));
              })["catch"](function (e) {});
            }
          });
        };

        var _proto2 = AudioPlayer.prototype;

        _proto2.destroy = function destroy() {
          this._player.destroy();
        };

        AudioPlayer.loadNative = function loadNative(url, opts) {
          if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
            if (!AudioContextAgent.support) {
              warnID(5201);
            }

            return AudioPlayerDOM.loadNative(url);
          }

          return AudioPlayerWeb.loadNative(url);
        };

        AudioPlayer.loadOneShotAudio = function loadOneShotAudio(url, volume, opts) {
          return new Promise(function (resolve, reject) {
            if ((opts === null || opts === void 0 ? void 0 : opts.audioLoadMode) === AudioType.DOM_AUDIO || !AudioContextAgent.support) {
              if (!AudioContextAgent.support) {
                warnID(5201);
              }

              AudioPlayerDOM.loadOneShotAudio(url, volume).then(function (oneShotAudioDOM) {
                // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
                resolve(new OneShotAudio(oneShotAudioDOM));
              })["catch"](reject);
            } else {
              AudioPlayerWeb.loadOneShotAudio(url, volume).then(function (oneShotAudioWeb) {
                // @ts-expect-error AudioPlayer should be a friend class in OneShotAudio
                resolve(new OneShotAudio(oneShotAudioWeb));
              })["catch"](reject);
            }
          });
        };

        _proto2.seek = function seek(time) {
          return this._player.seek(time);
        };

        _proto2.play = function play() {
          return this._player.play();
        };

        _proto2.pause = function pause() {
          return this._player.pause();
        };

        _proto2.stop = function stop() {
          return this._player.stop();
        };

        _proto2.onInterruptionBegin = function onInterruptionBegin(cb) {
          this._player.onInterruptionBegin(cb);
        };

        _proto2.offInterruptionBegin = function offInterruptionBegin(cb) {
          this._player.offInterruptionBegin(cb);
        };

        _proto2.onInterruptionEnd = function onInterruptionEnd(cb) {
          this._player.onInterruptionEnd(cb);
        };

        _proto2.offInterruptionEnd = function offInterruptionEnd(cb) {
          this._player.offInterruptionEnd(cb);
        };

        _proto2.onEnded = function onEnded(cb) {
          this._player.onEnded(cb);
        };

        _proto2.offEnded = function offEnded(cb) {
          this._player.offEnded(cb);
        };

        _createClass(AudioPlayer, [{
          key: "src",
          get: function get() {
            return this._player.src;
          }
        }, {
          key: "type",
          get: function get() {
            return this._player.type;
          }
        }, {
          key: "state",
          get: function get() {
            return this._player.state;
          }
        }, {
          key: "loop",
          get: function get() {
            return this._player.loop;
          },
          set: function set(val) {
            this._player.loop = val;
          }
        }, {
          key: "volume",
          get: function get() {
            return this._player.volume;
          },
          set: function set(val) {
            this._player.volume = val;
          }
        }, {
          key: "duration",
          get: function get() {
            return this._player.duration;
          }
        }, {
          key: "currentTime",
          get: function get() {
            return this._player.currentTime;
          }
        }]);

        return AudioPlayer;
      }());

      AudioPlayer.maxAudioChannel = 24;
    }
  };
});