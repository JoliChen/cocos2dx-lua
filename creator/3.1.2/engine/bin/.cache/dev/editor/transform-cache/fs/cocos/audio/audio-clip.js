"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioClip = void 0;

var _index = require("../core/data/decorators/index.js");

var _player = require("../../pal/audio/web/player.js");

var _asset = require("../core/assets/asset.js");

var _globalExports = require("../core/global-exports.js");

var _type = require("../../pal/audio/type.js");

var _dec, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
let AudioClip = (_dec = (0, _index.ccclass)('cc.AudioClip'), _dec(_class = (_class2 = (_temp = _class3 = class AudioClip extends _asset.Asset {
  // we serialize this because it's unavailable at runtime on some platforms
  constructor() {
    super();

    _initializerDefineProperty(this, "_duration", _descriptor, this);

    this._loadMode = _type.AudioType.UNKNOWN_AUDIO;
    this._meta = null;
    this._player = void 0;
    this.loaded = false;
  }

  destroy() {
    var _this$_player;

    const destroyResult = super.destroy();
    (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.destroy();
    return destroyResult;
  }

  set _nativeAsset(meta) {
    this._meta = meta;

    if (meta) {
      this.loaded = true;
      this._loadMode = meta.type;
      this._player = meta.player;
      this.emit('load');
    } else {
      this._meta = null;
      this._loadMode = _type.AudioType.UNKNOWN_AUDIO;
      this._duration = 0;
      this.loaded = false;
    }
  }

  get _nativeAsset() {
    return this._meta;
  }

  get _nativeDep() {
    return {
      uuid: this._uuid,
      audioLoadMode: this.loadMode,
      ext: this._native,
      __isNative__: true
    };
  }

  get loadMode() {
    return this._loadMode;
  }

  validate() {
    return !!this._meta;
  }

  getDuration() {
    // Dynamicly loaded audioClip._duration is 0
    if (this._duration) {
      return this._duration;
    }

    return this._meta ? this._meta.duration : 0;
  } // #region deprecated method

  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.state instead.
   */


  get state() {
    return this._player ? this._player.state : _type.AudioState.INIT;
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.getCurrentTime() instead.
   */


  getCurrentTime() {
    return this._player ? this._player.currentTime : 0;
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.getVolume() instead.
   */


  getVolume() {
    return this._player ? this._player.volume : 0;
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.getLoop() instead.
   */


  getLoop() {
    return this._player ? this._player.loop : false;
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.setCurrentTime() instead.
   */


  setCurrentTime(time) {
    var _this$_player2;

    (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.seek(time).catch(e => {});
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.setVolume() instead.
   */


  setVolume(volume) {
    if (this._player) {
      this._player.volume = volume;
    }
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.setLoop() instead.
   */


  setLoop(loop) {
    if (this._player) {
      this._player.loop = loop;
    }
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.play() instead.
   */


  play() {
    var _this$_player3;

    (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.play().catch(e => {});
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.pause() instead.
   */


  pause() {
    var _this$_player4;

    (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.pause().catch(e => {});
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.stop() instead.
   */


  stop() {
    var _this$_player5;

    (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.stop().catch(e => {});
  }
  /**
   * @deprecated since v3.1.0, please use AudioSource.prototype.playOneShot() instead.
   */


  playOneShot(volume = 1) {
    if (this._nativeAsset) {
      _player.AudioPlayer.loadOneShotAudio(this._nativeAsset.url, volume).then(oneShotAudio => {
        oneShotAudio.play();
      }).catch(e => {});
    }
  } // #endregion deprecated method


}, _class3.AudioType = _type.AudioType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_duration", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_nativeDep", [_index.override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeDep"), _class2.prototype)), _class2)) || _class);
exports.AudioClip = AudioClip;
_globalExports.legacyCC.AudioClip = AudioClip;