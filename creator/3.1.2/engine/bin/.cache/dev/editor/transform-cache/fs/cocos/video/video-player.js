"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayer = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../core/platform/index.js");

var _index3 = require("../core/components/index.js");

var _index4 = require("../2d/framework/index.js");

var _index5 = require("../core/math/index.js");

var _videoClip = require("./assets/video-clip.js");

var _videoPlayerImplManager = require("./video-player-impl-manager.js");

var _videoPlayerEnums = require("./video-player-enums.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * VideoPlayer is a component for playing videos, you can use it for showing videos in your game.
 * Because different platforms have different authorization, API and control methods for VideoPlayer component.
 * And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
 * @zh
 * Video 组件，用于在游戏中播放视频。
 * 由于不同平台对于 VideoPlayer 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
 */
let VideoPlayer = (_dec = (0, _index.ccclass)('cc.VideoPlayer'), _dec2 = (0, _index.help)('i18n:cc.VideoPlayer'), _dec3 = (0, _index.menu)('Video/VideoPlayer'), _dec4 = (0, _index.requireComponent)(_index4.UITransform), _dec5 = (0, _index.type)(_videoClip.VideoClip), _dec6 = (0, _index.type)(_videoPlayerEnums.ResourceType), _dec7 = (0, _index.tooltip)('i18n:videoplayer.resourceType'), _dec8 = (0, _index.tooltip)('i18n:videoplayer.remoteURL'), _dec9 = (0, _index.type)(_videoClip.VideoClip), _dec10 = (0, _index.tooltip)('i18n:videoplayer.clip'), _dec11 = (0, _index.tooltip)('i18n:videoplayer.playOnAwake'), _dec12 = (0, _index.range)([0.0, 10, 1.0]), _dec13 = (0, _index.tooltip)('i18n:videoplayer.playbackRate'), _dec14 = (0, _index.range)([0.0, 1.0, 0.1]), _dec15 = (0, _index.tooltip)('i18n:videoplayer.volume'), _dec16 = (0, _index.tooltip)('i18n:videoplayer.mute'), _dec17 = (0, _index.tooltip)('i18n:videoplayer.loop'), _dec18 = (0, _index.tooltip)('i18n:videoplayer.keepAspectRatio'), _dec19 = (0, _index.tooltip)('i18n:videoplayer.fullScreenOnAwake'), _dec20 = (0, _index.tooltip)('i18n:videoplayer.stayOnBottom'), _dec21 = (0, _index.type)([_index3.EventHandler]), _dec22 = (0, _index.displayOrder)(20), _dec23 = (0, _index.tooltip)('i18n:videoplayer.videoPlayerEvent'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class VideoPlayer extends _index3.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_resourceType", _descriptor, this);

    _initializerDefineProperty(this, "_remoteURL", _descriptor2, this);

    _initializerDefineProperty(this, "_clip", _descriptor3, this);

    _initializerDefineProperty(this, "_playOnAwake", _descriptor4, this);

    _initializerDefineProperty(this, "_volume", _descriptor5, this);

    _initializerDefineProperty(this, "_mute", _descriptor6, this);

    _initializerDefineProperty(this, "_playbackRate", _descriptor7, this);

    _initializerDefineProperty(this, "_loop", _descriptor8, this);

    _initializerDefineProperty(this, "_fullScreenOnAwake", _descriptor9, this);

    _initializerDefineProperty(this, "_stayOnBottom", _descriptor10, this);

    _initializerDefineProperty(this, "_keepAspectRatio", _descriptor11, this);

    this._impl = null;
    this._cachedCurrentTime = 0;

    _initializerDefineProperty(this, "videoPlayerEvent", _descriptor12, this);
  }

  /**
   * @en
   * The resource type of video player, REMOTE for remote url and LOCAL for local file path.
   * @zh
   * 视频来源：REMOTE 表示远程视频 URL，LOCAL 表示本地视频地址。
   */
  get resourceType() {
    return this._resourceType;
  }

  set resourceType(val) {
    if (this._resourceType !== val) {
      this._resourceType = val;
      this.syncSource();
    }
  }
  /**
   * @en
   * The remote URL of video.
   * @zh
   * 远程视频的 URL
   */


  get remoteURL() {
    return this._remoteURL;
  }

  set remoteURL(val) {
    if (this._remoteURL !== val) {
      this._remoteURL = val;
      this.syncSource();
    }
  }
  /**
   * @en
   * The local video clip
   * @zh
   * 本地视频剪辑。
   */


  get clip() {
    return this._clip;
  }

  set clip(val) {
    if (this._clip !== val) {
      this._clip = val;
      this.syncSource();
    }
  }
  /**
   * @en
   * Whether the video start playing automatically after loaded?
   * @zh
   * 视频加载后是否自动开始播放？
   */


  get playOnAwake() {
    return this._playOnAwake;
  }

  set playOnAwake(value) {
    this._playOnAwake = value;
  }
  /**
   * @en
   * The Video playback rate
   * @zh
   * 视频播放时的速率（0.0 ~ 10.0）
   */


  get playbackRate() {
    return this._playbackRate;
  }

  set playbackRate(value) {
    this._playbackRate = value;

    if (this._impl) {
      this._impl.syncPlaybackRate(value);
    }
  }
  /**
   * @en
   * The volume of the video.
   * @zh
   * 视频的音量（0.0 ~ 1.0）
   */


  get volume() {
    return this._volume;
  }

  set volume(value) {
    this._volume = value;

    if (this._impl) {
      this._impl.syncVolume(value);
    }
  }
  /**
   * @en
   * Mutes the VideoPlayer. Mute sets the volume=0, Un-Mute restore the original volume.
   * @zh
   * 是否静音视频。静音时设置音量为 0，取消静音是恢复原来的音量。
   */


  get mute() {
    return this._mute;
  }

  set mute(value) {
    this._mute = value;

    if (this._impl) {
      this._impl.syncMute(value);
    }
  }
  /**
   * @en
   * Whether the video should be played again at the end
   * @zh
   * 视频是否应在结束时再次播放
   */


  get loop() {
    return this._loop;
  }

  set loop(value) {
    this._loop = value;

    if (this._impl) {
      this._impl.syncLoop(value);
    }
  }
  /**
   * @en
   * Whether keep the aspect ration of the original video.
   * @zh
   * 是否保持视频原来的宽高比
   */


  get keepAspectRatio() {
    return this._keepAspectRatio;
  }

  set keepAspectRatio(value) {
    if (this._keepAspectRatio !== value) {
      this._keepAspectRatio = value;

      if (this._impl) {
        this._impl.syncKeepAspectRatio(value);
      }
    }
  }
  /**
   * @en
   * Whether play video in fullscreen mode.
   * @zh
   * 是否全屏播放视频
   */


  get fullScreenOnAwake() {
    if (!_internal253Aconstants.EDITOR) {
      if (this._impl) {
        this._fullScreenOnAwake = this._impl.fullScreenOnAwake;
        return this._fullScreenOnAwake;
      }
    }

    return this._fullScreenOnAwake;
  }

  set fullScreenOnAwake(value) {
    if (this._fullScreenOnAwake !== value) {
      this._fullScreenOnAwake = value;

      if (this._impl) {
        this._impl.syncFullScreenOnAwake(value);
      }
    }
  }
  /**
   * @en
   * Always below the game view (only useful on Web.
   * Note: The specific effects are not guaranteed to be consistent, depending on whether each browser supports or restricts).
   * @zh
   * 永远在游戏视图最底层（这个属性只有在 Web 平台上有效果。注意：具体效果无法保证一致，跟各个浏览器是否支持与限制有关）
   */


  get stayOnBottom() {
    return this._stayOnBottom;
  }

  set stayOnBottom(value) {
    if (this._stayOnBottom !== value) {
      this._stayOnBottom = value;

      if (this._impl) {
        this._impl.syncStayOnBottom(value);
      }
    }
  }

  /**
   * @en
   * Raw video objects for user customization
   * @zh
   * 原始视频对象，用于用户定制
   */
  get nativeVideo() {
    return this._impl && this._impl.video || null;
  }
  /**
   * @en
   * The current playback time of the now playing item in seconds, you could also change the start playback time.
   * @zh
   * 指定视频从什么时间点开始播放，单位是秒，也可以用来获取当前视频播放的时间进度。
   */


  get currentTime() {
    if (!this._impl) {
      return this._cachedCurrentTime;
    }

    return this._impl.getCurrentTime();
  }

  set currentTime(val) {
    if (Number.isNaN(val)) {
      (0, _index2.warn)(`illegal video time! value:${val}`);
      return;
    }

    val = (0, _index5.clamp)(val, 0, this.duration);
    this._cachedCurrentTime = val;

    if (this._impl) {
      this._impl.seekTo(val);
    }
  }
  /**
   * @en
   * Get the audio duration, in seconds.
   * @zh
   * 获取以秒为单位的视频总时长。
   */


  get duration() {
    if (!this._impl) {
      return 0;
    }

    return this._impl.getDuration();
  }
  /**
   * @en
   * Get current audio state.
   * @zh
   * 获取当前视频状态。
   */


  get state() {
    if (!this._impl) {
      return _videoPlayerEnums.EventType.NONE;
    }

    return this._impl.state;
  }
  /**
   * @en
   * Is the audio currently playing?
   * @zh
   * 当前视频是否正在播放？
   */


  get isPlaying() {
    if (!this._impl) {
      return false;
    }

    return this._impl.isPlaying;
  }

  syncSource() {
    if (!this._impl) {
      return;
    }

    if (this._resourceType === _videoPlayerEnums.ResourceType.REMOTE) {
      this._impl.syncURL(this._remoteURL);
    } else {
      this._impl.syncClip(this._clip);
    }
  }

  __preload() {
    if (_internal253Aconstants.EDITOR) {
      return;
    }

    this._impl = _videoPlayerImplManager.VideoPlayerImplManager.getImpl(this);
    this.syncSource();

    this._impl.syncLoop(this._loop);

    this._impl.syncVolume(this._volume);

    this._impl.syncMute(this._mute);

    this._impl.seekTo(this._cachedCurrentTime);

    this._impl.syncPlaybackRate(this._playbackRate);

    this._impl.syncStayOnBottom(this._stayOnBottom);

    this._impl.syncKeepAspectRatio(this._keepAspectRatio);

    this._impl.syncFullScreenOnAwake(this._fullScreenOnAwake); //


    this._impl.componentEventList.set(_videoPlayerEnums.EventType.META_LOADED, this.onMetaLoaded.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.READY_TO_PLAY, this.onReadyToPlay.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.PLAYING, this.onPlaying.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.PAUSED, this.onPasued.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.STOPPED, this.onStopped.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.COMPLETED, this.onCompleted.bind(this));

    this._impl.componentEventList.set(_videoPlayerEnums.EventType.ERROR, this.onError.bind(this));

    if (this._playOnAwake && this._impl.loaded) {
      this.play();
    }
  }

  onEnable() {
    if (this._impl) {
      this._impl.enable();
    }
  }

  onDisable() {
    if (this._impl) {
      this._impl.disable();
    }
  }

  onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  }

  update(dt) {
    if (this._impl) {
      this._impl.syncMatrix();
    }
  }

  onMetaLoaded() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.META_LOADED);

    this.node.emit('meta-loaded', this);
  }

  onReadyToPlay() {
    if (this._playOnAwake && !this.isPlaying) {
      this.play();
    }

    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.READY_TO_PLAY);

    this.node.emit(_videoPlayerEnums.EventType.READY_TO_PLAY, this);
  }

  onPlaying() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.PLAYING);

    this.node.emit(_videoPlayerEnums.EventType.PLAYING, this);
  }

  onPasued() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.PAUSED);

    this.node.emit(_videoPlayerEnums.EventType.PAUSED, this);
  }

  onStopped() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.STOPPED);

    this.node.emit(_videoPlayerEnums.EventType.STOPPED, this);
  }

  onCompleted() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.COMPLETED);

    this.node.emit(_videoPlayerEnums.EventType.COMPLETED, this);
  }

  onError() {
    _index3.EventHandler.emitEvents(this.videoPlayerEvent, this, _videoPlayerEnums.EventType.ERROR);

    this.node.emit(_videoPlayerEnums.EventType.ERROR, this);
  }
  /**
   * @en
   * Play the clip.<br>
   * Restart if already playing.<br>
   * Resume if paused.
   * @zh
   * 开始播放。<br>
   * 如果视频处于正在播放状态，将会重新开始播放视频。<br>
   * 如果视频处于暂停状态，则会继续播放视频。
   */


  play() {
    if (this._impl) {
      this._impl.play();
    }
  }
  /**
   * @en
   * If a video is paused, call this method to resume playing.
   * @zh
   * 如果一个视频播放被暂停播放了，调用这个接口可以继续播放。
   */


  resume() {
    if (this._impl) {
      this._impl.resume();
    }
  }
  /**
   * @en
   * Pause the clip.
   * @zh
   * 暂停播放。
   */


  pause() {
    if (this._impl) {
      this._impl.pause();
    }
  }
  /**
   * @en
   * Stop the clip.
   * @zh
   * 停止播放。
   */


  stop() {
    if (this._impl) {
      this._impl.stop();
    }
  }

}, _class3.EventType = _videoPlayerEnums.EventType, _class3.ResourceType = _videoPlayerEnums.ResourceType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resourceType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _videoPlayerEnums.ResourceType.LOCAL;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_remoteURL", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_clip", [_dec5, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_playOnAwake", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_volume", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_mute", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_playbackRate", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_loop", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_fullScreenOnAwake", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_stayOnBottom", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_keepAspectRatio", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "resourceType", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "resourceType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remoteURL", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "remoteURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "clip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "playOnAwake"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "playbackRate", [_index.slide, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "playbackRate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "volume", [_index.slide, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "volume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loop", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "loop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "keepAspectRatio", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "keepAspectRatio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fullScreenOnAwake", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "fullScreenOnAwake"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stayOnBottom", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "stayOnBottom"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "videoPlayerEvent", [_index.serializable, _dec21, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class); // TODO Since jsb adapter does not support import cc, put it on internal first and adjust it later.

exports.VideoPlayer = VideoPlayer;
_globalExports.legacyCC.internal.VideoPlayer = VideoPlayer;