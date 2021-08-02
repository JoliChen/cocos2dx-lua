"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerImpl = void 0;

var _globalExports = require("../core/global-exports.js");

var _index = require("../2d/framework/index.js");

var _videoPlayerEnums = require("./video-player-enums.js");

var _index2 = require("../core/platform/index.js");

var _director = require("../core/director.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module component/video
 */
class VideoPlayerImpl {
  constructor(component) {
    this._componentEventList = new Map();
    this._state = _videoPlayerEnums.EventType.NONE;
    this._video = null;
    this._onHide = void 0;
    this._onShow = void 0;
    this._interrupted = false;
    this._loaded = false;
    this._loadedMeta = false;
    this._ignorePause = false;
    this._fullScreenOnAwake = false;
    this._visible = true;
    this._playing = false;
    this._cachedCurrentTime = -1;
    this._waitingFullscreen = false;
    this._waitingPlay = false;
    this._keepAspectRatio = false;
    this._component = null;
    this._uiTrans = null;
    this._node = null;
    this._stayOnBottom = false;
    this._dirty = false;
    this._forceUpdate = false;
    this._w = 0;
    this._h = 0;
    this._m00 = 0;
    this._m01 = 0;
    this._m04 = 0;
    this._m05 = 0;
    this._m12 = 0;
    this._m13 = 0;
    this._component = component;
    this._node = component.node;
    this._uiTrans = component.node.getComponent(_index.UITransform);

    this._onHide = () => {
      if (!this.video || this._state !== _videoPlayerEnums.EventType.PLAYING) {
        return;
      }

      this.video.pause();
      this._interrupted = true;
    };

    this._onShow = () => {
      if (!this._interrupted || !this.video) {
        return;
      } // eslint-disable-next-line @typescript-eslint/no-floating-promises


      this.video.play();
      this._interrupted = false;
    };
    /* handle hide & show */


    _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_HIDE, this._onHide);

    _globalExports.legacyCC.game.on(_globalExports.legacyCC.Game.EVENT_SHOW, this._onShow);
  } //


  get fullScreenOnAwake() {
    return this._fullScreenOnAwake;
  }

  get loaded() {
    return this._loaded;
  }

  get componentEventList() {
    return this._componentEventList;
  }

  get video() {
    return this._video;
  }

  get state() {
    return this._state;
  }

  get isPlaying() {
    return this._playing;
  }

  get UICamera() {
    return _director.director.root.batcher2D.getFirstRenderCamera(this._node);
  } // video player event


  onLoadedMetadata(e) {
    this._loadedMeta = true;
    this._forceUpdate = true;

    if (this._visible) {
      this.enable();
    } else {
      this.disable();
    }

    this.dispatchEvent(_videoPlayerEnums.EventType.META_LOADED);
    const video = e.target;

    if (this._keepAspectRatio && video) {
      this.syncUITransform(video.videoWidth, video.videoHeight);
    }

    this.delayedFullScreen();
    this.delayedPlay();
  }

  onCanPlay(e) {
    this._loaded = true;
    this.dispatchEvent(_videoPlayerEnums.EventType.READY_TO_PLAY);
  }

  onPlay(e) {
    this._playing = true;
    this.dispatchEvent(_videoPlayerEnums.EventType.PLAYING);
  }

  onPlaying(e) {
    this.dispatchEvent(_videoPlayerEnums.EventType.PLAYING);
  }

  onPause(e) {
    if (this._ignorePause) {
      this._ignorePause = false;
      return;
    }

    this._playing = false;
    this.dispatchEvent(_videoPlayerEnums.EventType.PAUSED);
  }

  onStoped(e) {
    this._playing = false;
    this._ignorePause = false;
    this.dispatchEvent(_videoPlayerEnums.EventType.STOPPED);
  }

  onEnded(e) {
    this.dispatchEvent(_videoPlayerEnums.EventType.COMPLETED);
  }

  onClick(e) {
    this.dispatchEvent(_videoPlayerEnums.EventType.CLICKED);
  }

  onError(e) {
    this.dispatchEvent(_videoPlayerEnums.EventType.ERROR);
    const video = e.target;

    if (video && video.error) {
      (0, _index2.error)(`Error ${video.error.code}; details: ${video.error.message}`);
    }
  } //


  play() {
    if (this._loadedMeta || this._loaded) {
      this.canPlay();
    } else {
      this._waitingPlay = true;
    }
  }

  delayedPlay() {
    if (this._waitingPlay) {
      this.canPlay();
      this._waitingPlay = false;
    }
  }

  syncFullScreenOnAwake(enabled) {
    this._fullScreenOnAwake = enabled;

    if (this._loadedMeta || this._loaded) {
      this.canFullScreen(enabled);
    } else {
      this._waitingFullscreen = true;
    }
  }

  delayedFullScreen() {
    if (this._waitingFullscreen) {
      this.canFullScreen(this._fullScreenOnAwake);
      this._waitingFullscreen = false;
    }
  }

  dispatchEvent(key) {
    const callback = this._componentEventList.get(key);

    if (callback) {
      this._state = key;
      callback.call(this);
    }
  }

  syncUITransform(width, height) {
    if (this._uiTrans) {
      this._uiTrans.width = width;
      this._uiTrans.height = height;
    }
  }

  syncCurrentTime() {
    if (!this.video) {
      return;
    }

    if (this._cachedCurrentTime !== -1 && this.video.currentTime !== this._cachedCurrentTime) {
      this.seekTo(this._cachedCurrentTime);
      this._cachedCurrentTime = -1;
    }
  }

  destroy() {
    this.removeVideoPlayer();

    this._componentEventList.clear();

    _globalExports.legacyCC.game.off(_globalExports.legacyCC.Game.EVENT_HIDE, this._onHide);

    _globalExports.legacyCC.game.off(_globalExports.legacyCC.Game.EVENT_SHOW, this._onShow);
  }

}

exports.VideoPlayerImpl = VideoPlayerImpl;
_globalExports.legacyCC.internal.VideoPlayerImpl = VideoPlayerImpl;