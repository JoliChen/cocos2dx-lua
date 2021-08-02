System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js'], function (exports) {
    'use strict';
    var _createClass, legacyCC, clamp, _applyDecoratedDescriptor, EventTarget, system, Platform, clamp01, ccclass, _inheritsLoose, Asset, override, _initializerDefineProperty, _assertThisInitialized, serializable, fastRemoveAt, type, tooltip, range, help, menu, Component, replaceProperty, markAsWarning, js, downloader, factory;
    return {
        setters: [function (module) {
            _createClass = module.eu;
            legacyCC = module.l;
            clamp = module.df;
            _applyDecoratedDescriptor = module.ev;
            EventTarget = module.d$;
            system = module.eP;
            Platform = module.gU;
            clamp01 = module.dg;
            ccclass = module.es;
            _inheritsLoose = module.et;
            Asset = module.e1;
            override = module.ew;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            serializable = module.eI;
            fastRemoveAt = module.gR;
            type = module.ey;
            tooltip = module.fX;
            range = module.eC;
            help = module.f$;
            menu = module.g0;
            Component = module.eo;
            replaceProperty = module.dG;
            markAsWarning = module.dI;
            js = module.fu;
        }, function (module) {
            downloader = module.w;
            factory = module.x;
        }, function () {}, function () {}, function () {}, function () {}, function () {}],
        execute: function () {

            var AudioEvent;

            (function (AudioEvent) {
              AudioEvent["PLAYED"] = "play";
              AudioEvent["PAUSED"] = "pause";
              AudioEvent["STOPPED"] = "stop";
              AudioEvent["SEEKED"] = "seeked";
              AudioEvent["ENDED"] = "ended";
              AudioEvent["INTERRUPTION_BEGIN"] = "interruptionBegin";
              AudioEvent["INTERRUPTION_END"] = "interruptionEnd";
              AudioEvent["USER_GESTURE"] = "on_gesture";
            })(AudioEvent || (AudioEvent = {}));

            var AudioType;

            (function (AudioType) {
              AudioType[AudioType["DOM_AUDIO"] = 0] = "DOM_AUDIO";
              AudioType[AudioType["WEB_AUDIO"] = 1] = "WEB_AUDIO";
              AudioType[AudioType["MINIGAME_AUDIO"] = 2] = "MINIGAME_AUDIO";
              AudioType[AudioType["NATIVE_AUDIO"] = 3] = "NATIVE_AUDIO";
              AudioType[AudioType["UNKNOWN_AUDIO"] = 4] = "UNKNOWN_AUDIO";
            })(AudioType || (AudioType = {}));

            var AudioState;

            (function (AudioState) {
              AudioState[AudioState["INIT"] = 0] = "INIT";
              AudioState[AudioState["PLAYING"] = 1] = "PLAYING";
              AudioState[AudioState["PAUSED"] = 2] = "PAUSED";
              AudioState[AudioState["STOPPED"] = 3] = "STOPPED";
              AudioState[AudioState["INTERRUPTED"] = 4] = "INTERRUPTED";
            })(AudioState || (AudioState = {}));

            var operationId = 0;

            function _tryCallingRecursively(target, opInfo) {
              var _opInfo$func;

              if (opInfo.invoking) {
                return;
              }

              opInfo.invoking = true;

              (_opInfo$func = opInfo.func).call.apply(_opInfo$func, [target].concat(opInfo.args)).then(function () {
                opInfo.invoking = false;

                target._operationQueue.shift();

                target._eventTarget.emit(opInfo.id.toString());

                var nextOpInfo = target._operationQueue[0];
                nextOpInfo && _tryCallingRecursively(target, nextOpInfo);
              })["catch"](function (e) {});
            }

            function enqueueOperation(target, propertyKey, descriptor) {
              var originalOperation = descriptor.value;

              descriptor.value = function () {
                var _this = this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                return new Promise(function (resolve) {
                  var id = operationId++;
                  var instance = _this;

                  instance._operationQueue.push({
                    id: id,
                    func: originalOperation,
                    args: args,
                    invoking: false
                  });

                  instance._eventTarget.once(id.toString(), resolve);

                  var opInfo = instance._operationQueue[0];

                  _tryCallingRecursively(instance, opInfo);
                });
              };
            }

            var _class, _class2, _temp;
            var urlCount = {};
            var audioEngine = jsb.AudioEngine;
            var INVALID_AUDIO_ID = -1;
            var OneShotAudio = function () {
              function OneShotAudio(url, volume) {
                this._id = INVALID_AUDIO_ID;
                this._url = void 0;
                this._volume = void 0;
                this._onPlayCb = void 0;
                this._onEndCb = void 0;
                this._url = url;
                this._volume = volume;
              }

              var _proto = OneShotAudio.prototype;

              _proto.play = function play() {
                var _this = this,
                    _this$onPlay;

                this._id = jsb.AudioEngine.play2d(this._url, false, this._volume);
                jsb.AudioEngine.setFinishCallback(this._id, function () {
                  var _this$onEnd;

                  (_this$onEnd = _this.onEnd) === null || _this$onEnd === void 0 ? void 0 : _this$onEnd.call(_this);
                });
                (_this$onPlay = this.onPlay) === null || _this$onPlay === void 0 ? void 0 : _this$onPlay.call(this);
              };

              _proto.stop = function stop() {
                if (this._id === INVALID_AUDIO_ID) {
                  return;
                }

                jsb.AudioEngine.stop(this._id);
              };

              _createClass(OneShotAudio, [{
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

              return OneShotAudio;
            }();
            var AudioPlayer = (_class = (_temp = _class2 = function () {
              function AudioPlayer(url) {
                var _this2 = this;

                this._url = void 0;
                this._id = INVALID_AUDIO_ID;
                this._state = AudioState.INIT;
                this._onHide = void 0;
                this._onShow = void 0;
                this._eventTarget = new EventTarget();
                this._operationQueue = [];
                this._beforePlaying = {
                  duration: 0,
                  loop: false,
                  currentTime: 0,
                  volume: 1
                };
                this._url = url;

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
              }

              var _proto2 = AudioPlayer.prototype;

              _proto2.destroy = function destroy() {
                if (this._onShow) {
                  legacyCC.game.off(legacyCC.Game.EVENT_SHOW, this._onShow);
                  this._onShow = undefined;
                }

                if (this._onHide) {
                  legacyCC.game.off(legacyCC.Game.EVENT_HIDE, this._onHide);
                  this._onHide = undefined;
                }

                if (--urlCount[this._url] <= 0) {
                  audioEngine.uncache(this._url);
                }
              };

              AudioPlayer.load = function load(url) {
                return new Promise(function (resolve, reject) {
                  AudioPlayer.loadNative(url).then(function (url) {
                    resolve(new AudioPlayer(url));
                  })["catch"](function (err) {
                    return reject(err);
                  });
                });
              };

              AudioPlayer.loadNative = function loadNative(url) {
                return new Promise(function (resolve, reject) {
                  if (system.platform === Platform.WIN32) {
                    resolve(url);
                  } else {
                    audioEngine.preload(url, function (isSuccess) {
                      if (isSuccess) {
                        resolve(url);
                      } else {
                        reject(new Error('load audio failed'));
                      }
                    });
                  }
                });
              };

              AudioPlayer.loadOneShotAudio = function loadOneShotAudio(url, volume) {
                return new Promise(function (resolve, reject) {
                  AudioPlayer.loadNative(url).then(function (url) {
                    resolve(new OneShotAudio(url, volume));
                  })["catch"](reject);
                });
              };

              _proto2.seek = function seek(time) {
                var _this3 = this;

                return new Promise(function (resolve) {
                  time = clamp(time, 0, _this3.duration);

                  if (!_this3._isValid) {
                    _this3._beforePlaying.currentTime = time;
                    return resolve();
                  }

                  audioEngine.setCurrentTime(_this3._id, time);
                  return resolve();
                });
              };

              _proto2.play = function play() {
                var _this4 = this;

                return new Promise(function (resolve) {
                  if (_this4._isValid) {
                    if (_this4._state === AudioState.PAUSED) {
                      audioEngine.resume(_this4._id);
                    } else if (_this4._state === AudioState.PLAYING) {
                      audioEngine.pause(_this4._id);
                      audioEngine.setCurrentTime(_this4._id, 0);
                      audioEngine.resume(_this4._id);
                    }
                  } else {
                    _this4._id = audioEngine.play2d(_this4._url, _this4._beforePlaying.loop, _this4._beforePlaying.volume);

                    if (_this4._isValid) {
                      if (_this4._beforePlaying.currentTime !== 0) {
                        audioEngine.setCurrentTime(_this4._id, _this4._beforePlaying.currentTime);
                      }

                      audioEngine.setFinishCallback(_this4._id, function () {
                        _this4._id = INVALID_AUDIO_ID;
                        _this4._state = AudioState.INIT;

                        _this4._eventTarget.emit(AudioEvent.ENDED);
                      });
                    }
                  }

                  _this4._state = AudioState.PLAYING;
                  resolve();
                });
              };

              _proto2.pause = function pause() {
                var _this5 = this;

                return new Promise(function (resolve) {
                  if (_this5._isValid) {
                    audioEngine.pause(_this5._id);
                  }

                  _this5._state = AudioState.PAUSED;
                  resolve();
                });
              };

              _proto2.stop = function stop() {
                var _this6 = this;

                return new Promise(function (resolve) {
                  if (_this6._isValid) {
                    audioEngine.stop(_this6._id);
                  }

                  _this6._state = AudioState.STOPPED;
                  _this6._id = INVALID_AUDIO_ID;
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

              _createClass(AudioPlayer, [{
                key: "_isValid",
                get: function get() {
                  return this._id !== INVALID_AUDIO_ID;
                }
              }, {
                key: "src",
                get: function get() {
                  return this._url;
                }
              }, {
                key: "type",
                get: function get() {
                  return AudioType.NATIVE_AUDIO;
                }
              }, {
                key: "state",
                get: function get() {
                  return this._state;
                }
              }, {
                key: "loop",
                get: function get() {
                  if (!this._isValid) {
                    return this._beforePlaying.loop;
                  }

                  return audioEngine.isLoop(this._id);
                },
                set: function set(val) {
                  if (!this._isValid) {
                    this._beforePlaying.loop = val;
                  } else {
                    audioEngine.setLoop(this._id, val);
                  }
                }
              }, {
                key: "volume",
                get: function get() {
                  if (!this._isValid) {
                    return this._beforePlaying.volume;
                  }

                  return audioEngine.getVolume(this._id);
                },
                set: function set(val) {
                  val = clamp01(val);

                  if (!this._isValid) {
                    this._beforePlaying.volume = val;
                  } else {
                    audioEngine.setVolume(this._id, val);
                  }
                }
              }, {
                key: "duration",
                get: function get() {
                  if (!this._isValid) {
                    return this._beforePlaying.duration;
                  }

                  return audioEngine.getDuration(this._id);
                }
              }, {
                key: "currentTime",
                get: function get() {
                  if (!this._isValid) {
                    return this._beforePlaying.currentTime;
                  }

                  return audioEngine.getCurrentTime(this._id);
                }
              }]);

              return AudioPlayer;
            }(), _class2.maxAudioChannel = audioEngine.getMaxAudioInstance(), _temp), (_applyDecoratedDescriptor(_class.prototype, "seek", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "seek"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "play", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "play"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "pause", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "pause"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "stop", [enqueueOperation], Object.getOwnPropertyDescriptor(_class.prototype, "stop"), _class.prototype)), _class);
            legacyCC.AudioPlayer = AudioPlayer;

            var _dec, _class$1, _class2$1, _descriptor, _class3, _temp$1;
            var AudioClip = exports('AudioClip', (_dec = ccclass('cc.AudioClip'), _dec(_class$1 = (_class2$1 = (_temp$1 = _class3 = function (_Asset) {
              _inheritsLoose(AudioClip, _Asset);

              function AudioClip() {
                var _this;

                _this = _Asset.call(this) || this;

                _initializerDefineProperty(_this, "_duration", _descriptor, _assertThisInitialized(_this));

                _this._loadMode = AudioType.UNKNOWN_AUDIO;
                _this._meta = null;
                _this._player = void 0;
                _this.loaded = false;
                return _this;
              }

              var _proto = AudioClip.prototype;

              _proto.destroy = function destroy() {
                var _this$_player;

                var destroyResult = _Asset.prototype.destroy.call(this);

                (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.destroy();
                return destroyResult;
              };

              _proto.validate = function validate() {
                return !!this._meta;
              };

              _proto.getDuration = function getDuration() {
                if (this._duration) {
                  return this._duration;
                }

                return this._meta ? this._meta.duration : 0;
              };

              _proto.getCurrentTime = function getCurrentTime() {
                return this._player ? this._player.currentTime : 0;
              };

              _proto.getVolume = function getVolume() {
                return this._player ? this._player.volume : 0;
              };

              _proto.getLoop = function getLoop() {
                return this._player ? this._player.loop : false;
              };

              _proto.setCurrentTime = function setCurrentTime(time) {
                var _this$_player2;

                (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.seek(time)["catch"](function (e) {});
              };

              _proto.setVolume = function setVolume(volume) {
                if (this._player) {
                  this._player.volume = volume;
                }
              };

              _proto.setLoop = function setLoop(loop) {
                if (this._player) {
                  this._player.loop = loop;
                }
              };

              _proto.play = function play() {
                var _this$_player3;

                (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.play()["catch"](function (e) {});
              };

              _proto.pause = function pause() {
                var _this$_player4;

                (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.pause()["catch"](function (e) {});
              };

              _proto.stop = function stop() {
                var _this$_player5;

                (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.stop()["catch"](function (e) {});
              };

              _proto.playOneShot = function playOneShot(volume) {
                if (volume === void 0) {
                  volume = 1;
                }

                if (this._nativeAsset) {
                  AudioPlayer.loadOneShotAudio(this._nativeAsset.url, volume).then(function (oneShotAudio) {
                    oneShotAudio.play();
                  })["catch"](function (e) {});
                }
              };

              _createClass(AudioClip, [{
                key: "_nativeAsset",
                get: function get() {
                  return this._meta;
                },
                set: function set(meta) {
                  this._meta = meta;

                  if (meta) {
                    this.loaded = true;
                    this._loadMode = meta.type;
                    this._player = meta.player;
                    this.emit('load');
                  } else {
                    this._meta = null;
                    this._loadMode = AudioType.UNKNOWN_AUDIO;
                    this._duration = 0;
                    this.loaded = false;
                  }
                }
              }, {
                key: "_nativeDep",
                get: function get() {
                  return {
                    uuid: this._uuid,
                    audioLoadMode: this.loadMode,
                    ext: this._native,
                    __isNative__: true
                  };
                }
              }, {
                key: "loadMode",
                get: function get() {
                  return this._loadMode;
                }
              }, {
                key: "state",
                get: function get() {
                  return this._player ? this._player.state : AudioState.INIT;
                }
              }]);

              return AudioClip;
            }(Asset), _class3.AudioType = AudioType, _temp$1), (_descriptor = _applyDecoratedDescriptor(_class2$1.prototype, "_duration", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _applyDecoratedDescriptor(_class2$1.prototype, "_nativeDep", [override], Object.getOwnPropertyDescriptor(_class2$1.prototype, "_nativeDep"), _class2$1.prototype)), _class2$1)) || _class$1));
            legacyCC.AudioClip = AudioClip;

            function loadAudioPlayer(url, options, onComplete) {
              AudioPlayer.load(url, {
                audioLoadMode: options.audioLoadMode
              }).then(function (player) {
                var audioMeta = {
                  player: player,
                  url: url,
                  duration: player.duration,
                  type: player.type
                };
                onComplete(null, audioMeta);
              })["catch"](function (err) {
                onComplete(err);
              });
            }

            function createAudioClip(id, data, options, onComplete) {
              var out = new AudioClip();
              out._nativeUrl = id;
              out._nativeAsset = data;
              out._duration = data.duration;
              onComplete(null, out);
            }

            downloader.register({
              '.mp3': loadAudioPlayer,
              '.ogg': loadAudioPlayer,
              '.wav': loadAudioPlayer,
              '.m4a': loadAudioPlayer
            });
            factory.register({
              '.mp3': createAudioClip,
              '.ogg': createAudioClip,
              '.wav': createAudioClip,
              '.m4a': createAudioClip
            });

            var AudioManager = function () {
              function AudioManager() {
                this._oneShotAudioInfoList = [];
                this._audioPlayerInfoList = [];
              }

              var _proto = AudioManager.prototype;

              _proto._findIndex = function _findIndex(audioInfoList, audio) {
                return audioInfoList.findIndex(function (item) {
                  return item.audio === audio;
                });
              };

              _proto._tryAddPlaying = function _tryAddPlaying(audioInfoList, audio) {
                var idx = this._findIndex(audioInfoList, audio);

                if (idx > -1) {
                  audioInfoList[idx].playTime = performance.now();
                  return false;
                }

                audioInfoList.push({
                  audio: audio,
                  playTime: performance.now()
                });
                return true;
              };

              _proto.addPlaying = function addPlaying(audio) {
                if (audio instanceof AudioPlayer) {
                  if (this._tryAddPlaying(this._audioPlayerInfoList, audio)) {
                    return;
                  }
                } else {
                  this._tryAddPlaying(this._oneShotAudioInfoList, audio);
                }
              };

              _proto._tryRemovePlaying = function _tryRemovePlaying(audioInfoList, audio) {
                var idx = this._findIndex(audioInfoList, audio);

                if (idx === -1) {
                  return false;
                }

                fastRemoveAt(audioInfoList, idx);
                return true;
              };

              _proto.removePlaying = function removePlaying(audio) {
                if (audio instanceof AudioPlayer) {
                  if (this._tryRemovePlaying(this._audioPlayerInfoList, audio)) {
                    return;
                  }
                } else {
                  this._tryRemovePlaying(this._oneShotAudioInfoList, audio);
                }
              };

              _proto.discardOnePlayingIfNeeded = function discardOnePlayingIfNeeded() {
                if (this._audioPlayerInfoList.length + this._oneShotAudioInfoList.length < AudioPlayer.maxAudioChannel) {
                  return;
                }

                var audioInfoToDiscard;

                if (this._oneShotAudioInfoList.length > 0) {
                  this._oneShotAudioInfoList.forEach(function (audioInfo) {
                    if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
                      audioInfoToDiscard = audioInfo;
                    }
                  });
                } else {
                  this._audioPlayerInfoList.forEach(function (audioInfo) {
                    if (!audioInfoToDiscard || audioInfo.playTime < audioInfoToDiscard.playTime) {
                      audioInfoToDiscard = audioInfo;
                    }
                  });
                }

                if (audioInfoToDiscard) {
                  audioInfoToDiscard.audio.stop();
                  this.removePlaying(audioInfoToDiscard.audio);
                }
              };

              return AudioManager;
            }();
            var audioManager = new AudioManager();

            var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class$2, _class2$2, _descriptor$1, _descriptor2, _descriptor3, _descriptor4, _class3$1, _temp$2;
            var AudioSource = function (v) { return exports({ AudioSource: v, AudioSourceComponent: v }), v; }((_dec$1 = ccclass('cc.AudioSource'), _dec2 = help('i18n:cc.AudioSource'), _dec3 = menu('Audio/AudioSource'), _dec4 = type(AudioClip), _dec5 = type(AudioClip), _dec6 = tooltip('i18n:audio.clip'), _dec7 = tooltip('i18n:audio.loop'), _dec8 = tooltip('i18n:audio.playOnAwake'), _dec9 = range([0.0, 1.0]), _dec10 = tooltip('i18n:audio.volume'), _dec$1(_class$2 = _dec2(_class$2 = _dec3(_class$2 = (_class2$2 = (_temp$2 = _class3$1 = function (_Component) {
              _inheritsLoose(AudioSource, _Component);

              function AudioSource() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Component.call.apply(_Component, [this].concat(args)) || this;

                _initializerDefineProperty(_this, "_clip", _descriptor$1, _assertThisInitialized(_this));

                _this._player = null;

                _initializerDefineProperty(_this, "_loop", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_playOnAwake", _descriptor3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_volume", _descriptor4, _assertThisInitialized(_this));

                _this._cachedCurrentTime = 0;
                _this._operationsBeforeLoading = [];
                _this._isLoaded = false;
                _this._lastSetClip = void 0;
                return _this;
              }

              var _proto = AudioSource.prototype;

              _proto._syncPlayer = function _syncPlayer() {
                var _this2 = this;

                var clip = this._clip;
                this._isLoaded = false;

                if (!clip || this._lastSetClip === clip) {
                  return;
                }

                if (!clip._nativeAsset) {
                  console.error('Invalid audio clip');
                  return;
                }

                this._lastSetClip = clip;
                AudioPlayer.load(clip._nativeAsset.url, {
                  audioLoadMode: clip.loadMode
                }).then(function (player) {
                  if (_this2._lastSetClip !== clip) {
                    return;
                  }

                  _this2._isLoaded = true;

                  if (_this2._player) {
                    _this2._player.offEnded();

                    _this2._player.offInterruptionBegin();

                    _this2._player.offInterruptionEnd();

                    _this2._player.destroy();
                  }

                  _this2._player = player;
                  player.onEnded(function () {
                    audioManager.removePlaying(player);
                  });
                  player.onInterruptionBegin(function () {
                    audioManager.removePlaying(player);
                  });
                  player.onInterruptionEnd(function () {
                    audioManager.addPlaying(player);
                  });

                  _this2._syncStates();
                })["catch"](function (e) {});
              };

              _proto.onLoad = function onLoad() {
                this._syncPlayer();
              };

              _proto.onEnable = function onEnable() {
                if (this._playOnAwake && !this.playing) {
                  this.play();
                }
              };

              _proto.onDisable = function onDisable() {
                this.pause();
              };

              _proto.onDestroy = function onDestroy() {
                this.stop();
              };

              _proto.play = function play() {
                var _this$_player2,
                    _this3 = this;

                if (!this._isLoaded) {
                  this._operationsBeforeLoading.push('play');

                  return;
                }

                audioManager.discardOnePlayingIfNeeded();

                if (this.state === AudioState.PLAYING) {
                  var _this$_player;

                  (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.stop()["catch"](function (e) {});
                }

                (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.play().then(function () {
                  audioManager.addPlaying(_this3._player);
                })["catch"](function (e) {});
              };

              _proto.pause = function pause() {
                var _this$_player3,
                    _this4 = this;

                if (!this._isLoaded) {
                  this._operationsBeforeLoading.push('pause');

                  return;
                }

                (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.pause().then(function () {
                  audioManager.removePlaying(_this4._player);
                })["catch"](function (e) {});
              };

              _proto.stop = function stop() {
                var _this$_player4,
                    _this5 = this;

                if (!this._isLoaded) {
                  this._operationsBeforeLoading.push('stop');

                  return;
                }

                (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.stop().then(function () {
                  audioManager.removePlaying(_this5._player);
                })["catch"](function (e) {});
              };

              _proto.playOneShot = function playOneShot(clip, volumeScale) {
                if (volumeScale === void 0) {
                  volumeScale = 1;
                }

                if (!clip._nativeAsset) {
                  console.error('Invalid audio clip');
                  return;
                }

                AudioPlayer.loadOneShotAudio(clip._nativeAsset.url, this._volume * volumeScale, {
                  audioLoadMode: clip.loadMode
                }).then(function (oneShotAudio) {
                  audioManager.discardOnePlayingIfNeeded();

                  oneShotAudio.onPlay = function () {
                    audioManager.addPlaying(oneShotAudio);
                  };

                  oneShotAudio.onEnd = function () {
                    audioManager.removePlaying(oneShotAudio);
                  };

                  oneShotAudio.play();
                })["catch"](function (e) {});
              };

              _proto._syncStates = function _syncStates() {
                var _this6 = this;

                if (!this._player) {
                  return;
                }

                this._player.seek(this._cachedCurrentTime).then(function () {
                  if (_this6._player) {
                    _this6._player.loop = _this6._loop;
                    _this6._player.volume = _this6._volume;

                    _this6._operationsBeforeLoading.forEach(function (opName) {
                      var _this6$opName;

                      (_this6$opName = _this6[opName]) === null || _this6$opName === void 0 ? void 0 : _this6$opName.call(_this6);
                    });

                    _this6._operationsBeforeLoading.length = 0;
                  }
                })["catch"](function (e) {});
              };

              _createClass(AudioSource, [{
                key: "clip",
                get: function get() {
                  return this._clip;
                },
                set: function set(val) {
                  if (val === this._clip) {
                    return;
                  }

                  this._clip = val;

                  this._syncPlayer();
                }
              }, {
                key: "loop",
                get: function get() {
                  return this._loop;
                },
                set: function set(val) {
                  this._loop = val;
                  this._player && (this._player.loop = val);
                }
              }, {
                key: "playOnAwake",
                get: function get() {
                  return this._playOnAwake;
                },
                set: function set(val) {
                  this._playOnAwake = val;
                }
              }, {
                key: "volume",
                get: function get() {
                  return this._volume;
                },
                set: function set(val) {
                  if (Number.isNaN(val)) {
                    console.warn('illegal audio volume!');
                    return;
                  }

                  val = clamp(val, 0, 1);

                  if (this._player) {
                    this._player.volume = val;
                    this._volume = this._player.volume;
                  } else {
                    this._volume = val;
                  }
                }
              }, {
                key: "currentTime",
                get: function get() {
                  return this._player ? this._player.currentTime : this._cachedCurrentTime;
                },
                set: function set(num) {
                  var _this$_player5;

                  if (Number.isNaN(num)) {
                    console.warn('illegal audio time!');
                    return;
                  }

                  num = clamp(num, 0, this.duration);
                  this._cachedCurrentTime = num;
                  (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.seek(this._cachedCurrentTime)["catch"](function (e) {});
                }
              }, {
                key: "duration",
                get: function get() {
                  var _this$_clip$getDurati, _this$_clip;

                  return (_this$_clip$getDurati = (_this$_clip = this._clip) === null || _this$_clip === void 0 ? void 0 : _this$_clip.getDuration()) !== null && _this$_clip$getDurati !== void 0 ? _this$_clip$getDurati : this._player ? this._player.currentTime : 0;
                }
              }, {
                key: "state",
                get: function get() {
                  return this._player ? this._player.state : AudioState.INIT;
                }
              }, {
                key: "playing",
                get: function get() {
                  return this.state === AudioSource.AudioState.PLAYING;
                }
              }], [{
                key: "maxAudioChannel",
                get: function get() {
                  return AudioPlayer.maxAudioChannel;
                }
              }]);

              return AudioSource;
            }(Component), _class3$1.AudioState = AudioState, _temp$2), (_descriptor$1 = _applyDecoratedDescriptor(_class2$2.prototype, "_clip", [_dec4], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2$2.prototype, "_loop", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2$2.prototype, "_playOnAwake", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2$2.prototype, "_volume", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _applyDecoratedDescriptor(_class2$2.prototype, "clip", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2$2.prototype, "clip"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "loop", [_dec7], Object.getOwnPropertyDescriptor(_class2$2.prototype, "loop"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "playOnAwake", [_dec8], Object.getOwnPropertyDescriptor(_class2$2.prototype, "playOnAwake"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "volume", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2$2.prototype, "volume"), _class2$2.prototype)), _class2$2)) || _class$2) || _class$2) || _class$2));

            replaceProperty(AudioClip, 'AudioClip', [{
              name: 'PlayingState',
              newName: 'AudioState',
              target: AudioSource,
              targetName: 'AudioSource'
            }]);
            markAsWarning(AudioClip.prototype, 'AudioClip.prototype', ['state', 'play', 'pause', 'stop', 'playOneShot', 'setCurrentTime', 'setVolume', 'setLoop', 'getCurrentTime', 'getVolume', 'getLoop'].map(function (item) {
              return {
                name: item,
                suggest: "please use AudioSource.prototype." + item + " instead"
              };
            }));

            legacyCC.AudioSourceComponent = AudioSource;
            js.setClassAlias(AudioSource, 'cc.AudioSourceComponent');

        }
    };
});
