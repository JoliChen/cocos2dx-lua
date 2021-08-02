System.register("q-bundled:///fs/cocos/audio/audio-clip.js", ["../core/data/decorators/index.js", "../../pal/audio/web/player.js", "../core/assets/asset.js", "../core/global-exports.js", "../../pal/audio/type.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, override, AudioPlayer, Asset, legacyCC, AudioState, AudioType, _dec, _class, _class2, _descriptor, _class3, _temp, AudioClip;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      override = _coreDataDecoratorsIndexJs.override;
    }, function (_palAudioWebPlayerJs) {
      AudioPlayer = _palAudioWebPlayerJs.AudioPlayer;
    }, function (_coreAssetsAssetJs) {
      Asset = _coreAssetsAssetJs.Asset;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_palAudioTypeJs) {
      AudioState = _palAudioTypeJs.AudioState;
      AudioType = _palAudioTypeJs.AudioType;
    }],
    execute: function () {
      /**
       * @en
       * The audio clip asset. <br>
       * 'started' event is emitted once the audio began to play. <br>
       * 'ended' event is emitted once the audio stopped. <br>
       * Low-level platform-specific details are handled independently inside each clip.
       * @zh
       * 音频片段资源。<br>
       * 每当音频片段实际开始播放时，会发出 'started' 事件；<br>
       * 每当音频片段自然结束播放时，会发出 'ended' 事件。<br>
       * 每个片段独立处理自己依赖的平台相关的底层细节。
       */
      _export("AudioClip", AudioClip = (_dec = ccclass('cc.AudioClip'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(AudioClip, _Asset);

        // we serialize this because it's unavailable at runtime on some platforms
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
          // Dynamicly loaded audioClip._duration is 0
          if (this._duration) {
            return this._duration;
          }

          return this._meta ? this._meta.duration : 0;
        } // #region deprecated method

        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.state instead.
         */
        ;

        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.getCurrentTime() instead.
         */
        _proto.getCurrentTime = function getCurrentTime() {
          return this._player ? this._player.currentTime : 0;
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.getVolume() instead.
         */
        ;

        _proto.getVolume = function getVolume() {
          return this._player ? this._player.volume : 0;
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.getLoop() instead.
         */
        ;

        _proto.getLoop = function getLoop() {
          return this._player ? this._player.loop : false;
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.setCurrentTime() instead.
         */
        ;

        _proto.setCurrentTime = function setCurrentTime(time) {
          var _this$_player2;

          (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.seek(time)["catch"](function (e) {});
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.setVolume() instead.
         */
        ;

        _proto.setVolume = function setVolume(volume) {
          if (this._player) {
            this._player.volume = volume;
          }
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.setLoop() instead.
         */
        ;

        _proto.setLoop = function setLoop(loop) {
          if (this._player) {
            this._player.loop = loop;
          }
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.play() instead.
         */
        ;

        _proto.play = function play() {
          var _this$_player3;

          (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.play()["catch"](function (e) {});
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.pause() instead.
         */
        ;

        _proto.pause = function pause() {
          var _this$_player4;

          (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.pause()["catch"](function (e) {});
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.stop() instead.
         */
        ;

        _proto.stop = function stop() {
          var _this$_player5;

          (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.stop()["catch"](function (e) {});
        }
        /**
         * @deprecated since v3.1.0, please use AudioSource.prototype.playOneShot() instead.
         */
        ;

        _proto.playOneShot = function playOneShot(volume) {
          if (volume === void 0) {
            volume = 1;
          }

          if (this._nativeAsset) {
            AudioPlayer.loadOneShotAudio(this._nativeAsset.url, volume).then(function (oneShotAudio) {
              oneShotAudio.play();
            })["catch"](function (e) {});
          }
        } // #endregion deprecated method
        ;

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
      }(Asset), _class3.AudioType = AudioType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "_nativeDep", [override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeDep"), _class2.prototype)), _class2)) || _class));

      legacyCC.AudioClip = AudioClip;
    }
  };
});