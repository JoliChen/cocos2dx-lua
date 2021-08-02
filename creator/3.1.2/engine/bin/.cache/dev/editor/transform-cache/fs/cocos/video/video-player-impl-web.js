"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPlayerImplWeb = void 0;

var _system = require("../../pal/system/web/system.js");

var _index = require("../core/math/index.js");

var _index2 = require("../core/platform/index.js");

var _index3 = require("../core/index.js");

var _misc = require("../core/utils/misc.js");

var _videoPlayerEnums = require("./video-player-enums.js");

var _videoPlayerImpl = require("./video-player-impl.js");

var _index4 = require("../core/gfx/index.js");

var _visibleRect = _interopRequireDefault(require("../core/platform/visible-rect.js"));

var _index5 = require("../../pal/system/enum-type/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
const MIN_ZINDEX = -(2 ** 15);

const _mat4_temp = (0, _index.mat4)();

class VideoPlayerImplWeb extends _videoPlayerImpl.VideoPlayerImpl {
  // use stay on bottom
  constructor(component) {
    super(component);
    this._eventList = new Map();
    this._clearColorA = -1;
    this._clearFlag = void 0;
  }

  addListener(type, handler) {
    if (!this._video) {
      return;
    }

    this._eventList.set(type, handler);

    this._video.addEventListener(type, handler);
  }

  removeAllListeners() {
    this._eventList.forEach((handler, type) => {
      if (!this._video) {
        return;
      }

      this._video.removeEventListener(type, handler);
    });

    this._eventList.clear();
  }

  canPlay() {
    if (this.video) {
      const promise = this.video.play(); // the play API can only be initiated by user gesture.

      if (window.Promise && promise instanceof Promise) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.catch(error => {// Auto-play was prevented
          // Show a UI element to let the user manually start playback
        }).then(() => {
          // calibration time
          this.syncCurrentTime();
        });
      }
    }
  }

  pause() {
    if (this.video) {
      this.video.pause();
      this._cachedCurrentTime = this.video.currentTime;
    }
  }

  resume() {
    this.play();
  }

  stop() {
    if (this.video) {
      this._ignorePause = true;
      this.video.currentTime = 0;
      this.video.pause();
      this._cachedCurrentTime = 0;
      setTimeout(() => {
        this._ignorePause = false;
        this.dispatchEvent(_videoPlayerEnums.EventType.STOPPED);
      }, 0);
    }
  }

  syncClip(clip) {
    this.removeVideoPlayer();

    if (!clip) {
      return;
    }

    this.createVideoPlayer(clip.nativeUrl);
  }

  syncURL(url) {
    this.removeVideoPlayer();

    if (!url) {
      return;
    }

    this.createVideoPlayer(url);
  }

  syncPlaybackRate(val) {
    if (_system.system.browserType === _index5.BrowserType.UC) {
      (0, _index2.warn)('playbackRate is not supported by the uc mobile browser.');
      return;
    }

    if (this.video) {
      this.video.playbackRate = val;
    }
  }

  syncVolume(val) {
    if (this.video) {
      this.video.volume = val;
    }
  }

  syncMute(enabled) {
    if (this.video) {
      this.video.muted = enabled;
    }
  }

  syncLoop(enabled) {
    if (this.video) {
      this.video.loop = enabled;
    }
  }

  getDuration() {
    if (!this.video) {
      return 0;
    }

    return this.video.duration;
  }

  getCurrentTime() {
    if (this.video) {
      return this.video.currentTime;
    }

    return -1;
  }

  seekTo(val) {
    if (this.video) {
      this.video.currentTime = val;
    }
  }

  canFullScreen(enabled) {
    const video = this._video;

    if (!video || video.readyState !== _videoPlayerEnums.READY_STATE.HAVE_ENOUGH_DATA) {
      return;
    }

    if (_system.system.os === _index5.OS.IOS && _index2.sys.isBrowser) {
      if (enabled) {
        // @ts-expect-error only ios support
        if (video.webkitEnterFullscreen) {
          // @ts-expect-error only ios support
          video.webkitEnterFullscreen();
        } // @ts-expect-error only ios support

      } else if (video.webkitExitFullscreen) {
        // @ts-expect-error only ios support
        video.webkitExitFullscreen();
      } // @ts-expect-error only ios support


      this._fullScreenOnAwake = video.webkitDisplayingFullscreen;
      return;
    } // If video does not support native full-screen playback,
    // change to setting the video size to full screen.


    if (!_index2.screen.supportsFullScreen) {
      this._fullScreenOnAwake = enabled;
      this._forceUpdate = true;
      this.syncMatrix();
      return;
    }

    if (enabled) {
      // fix IE full screen content is not centered
      if (_system.system.browserType === _index5.BrowserType.IE) {
        video.style.transform = '';
      } // Monitor video entry and exit full-screen events


      video.setAttribute('x5-video-player-fullscreen', 'true'); // eslint-disable-next-line @typescript-eslint/no-floating-promises

      _index2.screen.requestFullScreen(video, document => {
        const fullscreenElement = _system.system.browserType === _index5.BrowserType.IE ? document.msFullscreenElement : document.fullscreenElement;
        this._fullScreenOnAwake = fullscreenElement === video;
      }, () => {
        this._fullScreenOnAwake = false;
      });
    } else {
      video.removeAttribute('x5-video-player-fullscreen'); // eslint-disable-next-line @typescript-eslint/no-floating-promises

      _index2.screen.exitFullScreen();
    }
  }

  syncStayOnBottom(enabled) {
    if (this._video) {
      this._video.style['z-index'] = enabled ? MIN_ZINDEX : 0;
      this._stayOnBottom = enabled;
    }

    this._dirty = true;
  }

  syncKeepAspectRatio(enabled) {
    this._keepAspectRatio = enabled;

    if (enabled && this._loadedMeta && this._video) {
      this.syncUITransform(this._video.videoWidth, this._video.videoHeight);
    }
  }

  removeVideoPlayer() {
    const video = this._video;

    if (video) {
      if ((0, _misc.contains)(_index3.game.container, video)) {
        _index3.game.container.removeChild(video);

        this.removeAllListeners();
      }
    }

    this._cachedCurrentTime = 0;
    this._playing = false;
    this._loaded = false;
    this._loadedMeta = false;
    this._video = null;
  }

  createVideoPlayer(url) {
    const video = this._video = document.createElement('video');
    video.className = 'cocosVideo';
    video.style.visibility = 'hidden';
    video.style.position = 'absolute';
    video.style.bottom = '0px';
    video.style.left = '0px'; // video.style['object-fit'] = 'none';

    video.style['transform-origin'] = '0px 100% 0px';
    video.style['-webkit-transform-origin'] = '0px 100% 0px';
    video.setAttribute('preload', 'auto');
    video.setAttribute('webkit-playsinline', ''); // This x5-playsinline tag must be added, otherwise the play, pause events will only fire once, in the qq browser.

    video.setAttribute('x5-playsinline', '');
    video.setAttribute('playsinline', '');

    this._bindDomEvent();

    _index3.game.container.appendChild(video);

    const source = document.createElement('source');
    video.appendChild(source);
    source.src = url;
  }

  _bindDomEvent() {
    const video = this._video;
    this.addListener('loadedmetadata', this.onLoadedMetadata.bind(this));
    this.addListener('canplay', this.onCanPlay.bind(this));
    this.addListener('canplaythrough', this.onCanPlay.bind(this));
    this.addListener('play', this.onPlay.bind(this));
    this.addListener('playing', this.onPlaying.bind(this));
    this.addListener('pause', this.onPause.bind(this));
    this.addListener('click', this.onClick.bind(this));
    this.addListener('ended', this.onEnded.bind(this));
    this.addListener('error', this.onError.bind(this));
  }

  onCanPlay(e) {
    const video = e.target;

    if (this._loaded && video) {
      return;
    } // eslint-disable-next-line default-case


    switch (video.readyState) {
      case _videoPlayerEnums.READY_STATE.HAVE_METADATA:
      case _videoPlayerEnums.READY_STATE.HAVE_ENOUGH_DATA:
        {
          super.onCanPlay(e);
          break;
        }
    }
  }

  enable() {
    if (this._video) {
      this._visible = true;

      if (this._video.style.visibility === 'visible') {
        return;
      }

      this._video.style.visibility = 'visible';
    }
  }

  disable(noPause) {
    if (this._video) {
      if (!noPause && this._playing) {
        this._video.pause();
      }

      this._visible = false;

      if (this._video.style.visibility === 'hidden') {
        return;
      }

      this._video.style.visibility = 'hidden';
    }
  }

  syncMatrix() {
    if (!this._video || !this._visible || !this._component) return;
    const camera = this.UICamera;

    if (!camera) {
      return;
    }

    if (_index2.screen.fullScreen()) {
      return;
    } // use stayOnBottom


    if (this._dirty) {
      this._dirty = false;

      if (this._stayOnBottom) {
        this._clearColorA = camera.clearColor.w;
        this._clearFlag = camera.clearFlag;
        camera.clearColor.w = 0;
        camera.clearFlag = _index4.ClearFlagBit.ALL;
      } else if (this._clearFlag) {
        camera.clearColor.w = this._clearColorA;
        camera.clearFlag = this._clearFlag;
        this._clearColorA = -1;
        this._clearFlag = null;
      }
    }

    this._component.node.getWorldMatrix(_mat4_temp);

    camera.update(true);
    camera.worldMatrixToScreen(_mat4_temp, _mat4_temp, _index3.game.canvas.width, _index3.game.canvas.height);
    let width = 0;
    let height = 0;

    if (this._fullScreenOnAwake) {
      width = _visibleRect.default.width;
      height = _visibleRect.default.height;
    } else {
      width = this._uiTrans.contentSize.width;
      height = this._uiTrans.contentSize.height;
    }

    if (!this._forceUpdate && this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 && this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 && this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 && this._w === width && this._h === height) {
      return;
    } // update matrix cache


    this._m00 = _mat4_temp.m00;
    this._m01 = _mat4_temp.m01;
    this._m04 = _mat4_temp.m04;
    this._m05 = _mat4_temp.m05;
    this._m12 = _mat4_temp.m12;
    this._m13 = _mat4_temp.m13;
    this._w = width;
    this._h = height;

    const dpr = _index2.view.getDevicePixelRatio();

    const scaleX = 1 / dpr;
    const scaleY = 1 / dpr;
    const container = _index3.game.container;
    const sx = _mat4_temp.m00 * scaleX;
    const b = _mat4_temp.m01;
    const c = _mat4_temp.m04;
    const sy = _mat4_temp.m05 * scaleY;
    this._video.style.width = `${this._w}px`;
    this._video.style.height = `${this._h}px`;

    if (_system.system.browserType !== _index5.BrowserType.MOBILE_QQ) {
      this._video.style.objectFit = this._keepAspectRatio ? 'none' : 'fill';
    } else {
      (0, _index2.warn)('keepAspectRatio is not supported by the qq mobile browser.');
    }

    const w = this._w * scaleX;
    const h = this._h * scaleY;
    const {
      x,
      y
    } = this._uiTrans.anchorPoint;
    const appx = w * _mat4_temp.m00 * x;
    const appy = h * _mat4_temp.m05 * y;
    const offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
    const offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
    const tx = _mat4_temp.m12 * scaleX - appx + offsetX;
    const ty = _mat4_temp.m13 * scaleY - appy + offsetY;
    const matrix = `matrix(${sx},${-b},${-c},${sy},${tx},${-ty})`;
    this._video.style.transform = matrix;
    this._video.style['-webkit-transform'] = matrix; // video style would change when enter fullscreen on IE
    // there is no way to add fullscreenchange event listeners on IE so that we can restore the cached video style

    if (_system.system.browserType !== _index5.BrowserType.IE) {
      this._forceUpdate = false;
    }
  }

}

exports.VideoPlayerImplWeb = VideoPlayerImplWeb;