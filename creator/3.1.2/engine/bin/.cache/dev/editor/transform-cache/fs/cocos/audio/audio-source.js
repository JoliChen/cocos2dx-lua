"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioSource = void 0;

var _player = require("../../pal/audio/web/player.js");

var _index = require("../core/data/decorators/index.js");

var _type = require("../../pal/audio/type.js");

var _component = require("../core/components/component.js");

var _index2 = require("../core/math/index.js");

var _audioClip = require("./audio-clip.js");

var _audioManager = require("./audio-manager.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * A representation of a single audio source, <br>
 * contains basic functionalities like play, pause and stop.
 * @zh
 * 音频组件，代表单个音源，提供播放、暂停、停止等基本功能。
 */
let AudioSource = (_dec = (0, _index.ccclass)('cc.AudioSource'), _dec2 = (0, _index.help)('i18n:cc.AudioSource'), _dec3 = (0, _index.menu)('Audio/AudioSource'), _dec4 = (0, _index.type)(_audioClip.AudioClip), _dec5 = (0, _index.type)(_audioClip.AudioClip), _dec6 = (0, _index.tooltip)('i18n:audio.clip'), _dec7 = (0, _index.tooltip)('i18n:audio.loop'), _dec8 = (0, _index.tooltip)('i18n:audio.playOnAwake'), _dec9 = (0, _index.range)([0.0, 1.0]), _dec10 = (0, _index.tooltip)('i18n:audio.volume'), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = (_temp = _class3 = class AudioSource extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_clip", _descriptor, this);

    this._player = null;

    _initializerDefineProperty(this, "_loop", _descriptor2, this);

    _initializerDefineProperty(this, "_playOnAwake", _descriptor3, this);

    _initializerDefineProperty(this, "_volume", _descriptor4, this);

    this._cachedCurrentTime = 0;
    this._operationsBeforeLoading = [];
    this._isLoaded = false;
    this._lastSetClip = void 0;
  }

  static get maxAudioChannel() {
    return _player.AudioPlayer.maxAudioChannel;
  }

  /**
   * @en
   * The default AudioClip to be played for this audio source.
   * @zh
   * 设定要播放的音频。
   */
  set clip(val) {
    if (val === this._clip) {
      return;
    }

    this._clip = val;

    this._syncPlayer();
  }

  get clip() {
    return this._clip;
  }

  _syncPlayer() {
    const clip = this._clip;
    this._isLoaded = false;

    if (!clip || this._lastSetClip === clip) {
      return;
    }

    if (!clip._nativeAsset) {
      console.error('Invalid audio clip');
      return;
    }

    this._lastSetClip = clip;

    _player.AudioPlayer.load(clip._nativeAsset.url, {
      audioLoadMode: clip.loadMode
    }).then(player => {
      if (this._lastSetClip !== clip) {
        // In case the developers set AudioSource.clip concurrently,
        // we should choose the last one player of AudioClip set to AudioSource.clip
        // instead of the last loaded one.
        return;
      }

      this._isLoaded = true; // clear old player

      if (this._player) {
        this._player.offEnded();

        this._player.offInterruptionBegin();

        this._player.offInterruptionEnd();

        this._player.destroy();
      }

      this._player = player;
      player.onEnded(() => {
        _audioManager.audioManager.removePlaying(player);
      });
      player.onInterruptionBegin(() => {
        _audioManager.audioManager.removePlaying(player);
      });
      player.onInterruptionEnd(() => {
        _audioManager.audioManager.addPlaying(player);
      });

      this._syncStates();
    }).catch(e => {});
  }
  /**
   * @en
   * Is looping enabled for this audio source?
   * @zh
   * 是否循环播放音频？
   */


  set loop(val) {
    this._loop = val;
    this._player && (this._player.loop = val);
  }

  get loop() {
    return this._loop;
  }
  /**
   * @en
   * Is the autoplay enabled? <br>
   * Note that for most platform autoplay will only start <br>
   * after a user gesture is received, according to the latest autoplay policy: <br>
   * https://www.chromium.org/audio-video/autoplay
   * @zh
   * 是否启用自动播放。 <br>
   * 请注意，根据最新的自动播放策略，现在对大多数平台，自动播放只会在第一次收到用户输入后生效。 <br>
   * 参考：https://www.chromium.org/audio-video/autoplay
   */


  set playOnAwake(val) {
    this._playOnAwake = val;
  }

  get playOnAwake() {
    return this._playOnAwake;
  }
  /**
   * @en
   * The volume of this audio source (0.0 to 1.0).<br>
   * Note: Volume control may be ineffective on some platforms.
   * @zh
   * 音频的音量（大小范围为 0.0 到 1.0）。<br>
   * 请注意，在某些平台上，音量控制可能不起效。<br>
   */


  set volume(val) {
    if (Number.isNaN(val)) {
      console.warn('illegal audio volume!');
      return;
    }

    val = (0, _index2.clamp)(val, 0, 1);

    if (this._player) {
      this._player.volume = val;
      this._volume = this._player.volume;
    } else {
      this._volume = val;
    }
  }

  get volume() {
    return this._volume;
  }

  onLoad() {
    this._syncPlayer();
  }

  onEnable() {
    // audio source component may be played before
    if (this._playOnAwake && !this.playing) {
      this.play();
    }
  }

  onDisable() {
    this.pause();
  }

  onDestroy() {
    this.stop();
  }
  /**
   * @en
   * Play the clip.<br>
   * Restart if already playing.<br>
   * Resume if paused.
   * @zh
   * 开始播放。<br>
   * 如果音频处于正在播放状态，将会重新开始播放音频。<br>
   * 如果音频处于暂停状态，则会继续播放音频。
   */


  play() {
    var _this$_player2;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('play');

      return;
    }

    _audioManager.audioManager.discardOnePlayingIfNeeded(); // Replay if the audio is playing


    if (this.state === _type.AudioState.PLAYING) {
      var _this$_player;

      (_this$_player = this._player) === null || _this$_player === void 0 ? void 0 : _this$_player.stop().catch(e => {});
    }

    (_this$_player2 = this._player) === null || _this$_player2 === void 0 ? void 0 : _this$_player2.play().then(() => {
      _audioManager.audioManager.addPlaying(this._player);
    }).catch(e => {});
  }
  /**
   * @en
   * Pause the clip.
   * @zh
   * 暂停播放。
   */


  pause() {
    var _this$_player3;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('pause');

      return;
    }

    (_this$_player3 = this._player) === null || _this$_player3 === void 0 ? void 0 : _this$_player3.pause().then(() => {
      _audioManager.audioManager.removePlaying(this._player);
    }).catch(e => {});
  }
  /**
   * @en
   * Stop the clip.
   * @zh
   * 停止播放。
   */


  stop() {
    var _this$_player4;

    if (!this._isLoaded) {
      this._operationsBeforeLoading.push('stop');

      return;
    }

    (_this$_player4 = this._player) === null || _this$_player4 === void 0 ? void 0 : _this$_player4.stop().then(() => {
      _audioManager.audioManager.removePlaying(this._player);
    }).catch(e => {});
  }
  /**
   * @en
   * Plays an AudioClip, and scales volume by volumeScale. The result volume is `audioSource.volume * volumeScale`. <br>
   * @zh
   * 以指定音量倍数播放一个音频一次。最终播放的音量为 `audioSource.volume * volumeScale`。 <br>
   * @param clip The audio clip to be played.
   * @param volumeScale volume scaling factor wrt. current value.
   */


  playOneShot(clip, volumeScale = 1) {
    if (!clip._nativeAsset) {
      console.error('Invalid audio clip');
      return;
    }

    _player.AudioPlayer.loadOneShotAudio(clip._nativeAsset.url, this._volume * volumeScale, {
      audioLoadMode: clip.loadMode
    }).then(oneShotAudio => {
      _audioManager.audioManager.discardOnePlayingIfNeeded();

      oneShotAudio.onPlay = () => {
        _audioManager.audioManager.addPlaying(oneShotAudio);
      };

      oneShotAudio.onEnd = () => {
        _audioManager.audioManager.removePlaying(oneShotAudio);
      };

      oneShotAudio.play();
    }).catch(e => {});
  }

  _syncStates() {
    if (!this._player) {
      return;
    }

    this._player.seek(this._cachedCurrentTime).then(() => {
      if (this._player) {
        this._player.loop = this._loop;
        this._player.volume = this._volume;

        this._operationsBeforeLoading.forEach(opName => {
          var _this$opName;

          (_this$opName = this[opName]) === null || _this$opName === void 0 ? void 0 : _this$opName.call(this);
        });

        this._operationsBeforeLoading.length = 0;
      }
    }).catch(e => {});
  }
  /**
   * @en
   * Set current playback time, in seconds.
   * @zh
   * 以秒为单位设置当前播放时间。
   * @param num playback time to jump to.
   */


  set currentTime(num) {
    var _this$_player5;

    if (Number.isNaN(num)) {
      console.warn('illegal audio time!');
      return;
    }

    num = (0, _index2.clamp)(num, 0, this.duration);
    this._cachedCurrentTime = num;
    (_this$_player5 = this._player) === null || _this$_player5 === void 0 ? void 0 : _this$_player5.seek(this._cachedCurrentTime).catch(e => {});
  }
  /**
   * @en
   * Get the current playback time, in seconds.
   * @zh
   * 以秒为单位获取当前播放时间。
   */


  get currentTime() {
    return this._player ? this._player.currentTime : this._cachedCurrentTime;
  }
  /**
   * @en
   * Get the audio duration, in seconds.
   * @zh
   * 获取以秒为单位的音频总时长。
   */


  get duration() {
    var _this$_clip$getDurati, _this$_clip;

    return (_this$_clip$getDurati = (_this$_clip = this._clip) === null || _this$_clip === void 0 ? void 0 : _this$_clip.getDuration()) !== null && _this$_clip$getDurati !== void 0 ? _this$_clip$getDurati : this._player ? this._player.currentTime : 0;
  }
  /**
   * @en
   * Get current audio state.
   * @zh
   * 获取当前音频状态。
   */


  get state() {
    return this._player ? this._player.state : _type.AudioState.INIT;
  }
  /**
   * @en
   * Is the audio currently playing?
   * @zh
   * 当前音频是否正在播放？
   */


  get playing() {
    return this.state === AudioSource.AudioState.PLAYING;
  }

}, _class3.AudioState = _type.AudioState, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_clip", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_loop", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_playOnAwake", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_volume", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "clip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loop", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "loop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "playOnAwake"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "volume", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "volume"), _class2.prototype)), _class2)) || _class) || _class) || _class);
exports.AudioSource = AudioSource;