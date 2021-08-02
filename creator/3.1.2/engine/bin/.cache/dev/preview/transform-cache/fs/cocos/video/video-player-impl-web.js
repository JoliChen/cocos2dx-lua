System.register("q-bundled:///fs/cocos/video/video-player-impl-web.js", ["../../pal/system/web/system.js", "../core/math/index.js", "../core/platform/index.js", "../core/index.js", "../core/utils/misc.js", "./video-player-enums.js", "./video-player-impl.js", "../core/gfx/index.js", "../core/platform/visible-rect.js", "../../pal/system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var system, mat4, sys, view, screen, warn, game, contains, EventType, READY_STATE, VideoPlayerImpl, ClearFlagBit, visibleRect, BrowserType, OS, MIN_ZINDEX, _mat4_temp, VideoPlayerImplWeb;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_coreMathIndexJs) {
      mat4 = _coreMathIndexJs.mat4;
    }, function (_corePlatformIndexJs) {
      sys = _corePlatformIndexJs.sys;
      view = _corePlatformIndexJs.view;
      screen = _corePlatformIndexJs.screen;
      warn = _corePlatformIndexJs.warn;
    }, function (_coreIndexJs) {
      game = _coreIndexJs.game;
    }, function (_coreUtilsMiscJs) {
      contains = _coreUtilsMiscJs.contains;
    }, function (_videoPlayerEnumsJs) {
      EventType = _videoPlayerEnumsJs.EventType;
      READY_STATE = _videoPlayerEnumsJs.READY_STATE;
    }, function (_videoPlayerImplJs) {
      VideoPlayerImpl = _videoPlayerImplJs.VideoPlayerImpl;
    }, function (_coreGfxIndexJs) {
      ClearFlagBit = _coreGfxIndexJs.ClearFlagBit;
    }, function (_corePlatformVisibleRectJs) {
      visibleRect = _corePlatformVisibleRectJs.default;
    }, function (_palSystemEnumTypeIndexJs) {
      BrowserType = _palSystemEnumTypeIndexJs.BrowserType;
      OS = _palSystemEnumTypeIndexJs.OS;
    }],
    execute: function () {
      MIN_ZINDEX = -Math.pow(2, 15);
      _mat4_temp = mat4();

      _export("VideoPlayerImplWeb", VideoPlayerImplWeb = /*#__PURE__*/function (_VideoPlayerImpl) {
        _inheritsLoose(VideoPlayerImplWeb, _VideoPlayerImpl);

        // use stay on bottom
        function VideoPlayerImplWeb(component) {
          var _this;

          _this = _VideoPlayerImpl.call(this, component) || this;
          _this._eventList = new Map();
          _this._clearColorA = -1;
          _this._clearFlag = void 0;
          return _this;
        }

        var _proto = VideoPlayerImplWeb.prototype;

        _proto.addListener = function addListener(type, handler) {
          if (!this._video) {
            return;
          }

          this._eventList.set(type, handler);

          this._video.addEventListener(type, handler);
        };

        _proto.removeAllListeners = function removeAllListeners() {
          var _this2 = this;

          this._eventList.forEach(function (handler, type) {
            if (!_this2._video) {
              return;
            }

            _this2._video.removeEventListener(type, handler);
          });

          this._eventList.clear();
        };

        _proto.canPlay = function canPlay() {
          var _this3 = this;

          if (this.video) {
            var promise = this.video.play(); // the play API can only be initiated by user gesture.

            if (window.Promise && promise instanceof Promise) {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              promise["catch"](function (error) {// Auto-play was prevented
                // Show a UI element to let the user manually start playback
              }).then(function () {
                // calibration time
                _this3.syncCurrentTime();
              });
            }
          }
        };

        _proto.pause = function pause() {
          if (this.video) {
            this.video.pause();
            this._cachedCurrentTime = this.video.currentTime;
          }
        };

        _proto.resume = function resume() {
          this.play();
        };

        _proto.stop = function stop() {
          var _this4 = this;

          if (this.video) {
            this._ignorePause = true;
            this.video.currentTime = 0;
            this.video.pause();
            this._cachedCurrentTime = 0;
            setTimeout(function () {
              _this4._ignorePause = false;

              _this4.dispatchEvent(EventType.STOPPED);
            }, 0);
          }
        };

        _proto.syncClip = function syncClip(clip) {
          this.removeVideoPlayer();

          if (!clip) {
            return;
          }

          this.createVideoPlayer(clip.nativeUrl);
        };

        _proto.syncURL = function syncURL(url) {
          this.removeVideoPlayer();

          if (!url) {
            return;
          }

          this.createVideoPlayer(url);
        };

        _proto.syncPlaybackRate = function syncPlaybackRate(val) {
          if (system.browserType === BrowserType.UC) {
            warn('playbackRate is not supported by the uc mobile browser.');
            return;
          }

          if (this.video) {
            this.video.playbackRate = val;
          }
        };

        _proto.syncVolume = function syncVolume(val) {
          if (this.video) {
            this.video.volume = val;
          }
        };

        _proto.syncMute = function syncMute(enabled) {
          if (this.video) {
            this.video.muted = enabled;
          }
        };

        _proto.syncLoop = function syncLoop(enabled) {
          if (this.video) {
            this.video.loop = enabled;
          }
        };

        _proto.getDuration = function getDuration() {
          if (!this.video) {
            return 0;
          }

          return this.video.duration;
        };

        _proto.getCurrentTime = function getCurrentTime() {
          if (this.video) {
            return this.video.currentTime;
          }

          return -1;
        };

        _proto.seekTo = function seekTo(val) {
          if (this.video) {
            this.video.currentTime = val;
          }
        };

        _proto.canFullScreen = function canFullScreen(enabled) {
          var _this5 = this;

          var video = this._video;

          if (!video || video.readyState !== READY_STATE.HAVE_ENOUGH_DATA) {
            return;
          }

          if (system.os === OS.IOS && sys.isBrowser) {
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


          if (!screen.supportsFullScreen) {
            this._fullScreenOnAwake = enabled;
            this._forceUpdate = true;
            this.syncMatrix();
            return;
          }

          if (enabled) {
            // fix IE full screen content is not centered
            if (system.browserType === BrowserType.IE) {
              video.style.transform = '';
            } // Monitor video entry and exit full-screen events


            video.setAttribute('x5-video-player-fullscreen', 'true'); // eslint-disable-next-line @typescript-eslint/no-floating-promises

            screen.requestFullScreen(video, function (document) {
              var fullscreenElement = system.browserType === BrowserType.IE ? document.msFullscreenElement : document.fullscreenElement;
              _this5._fullScreenOnAwake = fullscreenElement === video;
            }, function () {
              _this5._fullScreenOnAwake = false;
            });
          } else {
            video.removeAttribute('x5-video-player-fullscreen'); // eslint-disable-next-line @typescript-eslint/no-floating-promises

            screen.exitFullScreen();
          }
        };

        _proto.syncStayOnBottom = function syncStayOnBottom(enabled) {
          if (this._video) {
            this._video.style['z-index'] = enabled ? MIN_ZINDEX : 0;
            this._stayOnBottom = enabled;
          }

          this._dirty = true;
        };

        _proto.syncKeepAspectRatio = function syncKeepAspectRatio(enabled) {
          this._keepAspectRatio = enabled;

          if (enabled && this._loadedMeta && this._video) {
            this.syncUITransform(this._video.videoWidth, this._video.videoHeight);
          }
        };

        _proto.removeVideoPlayer = function removeVideoPlayer() {
          var video = this._video;

          if (video) {
            if (contains(game.container, video)) {
              game.container.removeChild(video);
              this.removeAllListeners();
            }
          }

          this._cachedCurrentTime = 0;
          this._playing = false;
          this._loaded = false;
          this._loadedMeta = false;
          this._video = null;
        };

        _proto.createVideoPlayer = function createVideoPlayer(url) {
          var video = this._video = document.createElement('video');
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

          game.container.appendChild(video);
          var source = document.createElement('source');
          video.appendChild(source);
          source.src = url;
        };

        _proto._bindDomEvent = function _bindDomEvent() {
          var video = this._video;
          this.addListener('loadedmetadata', this.onLoadedMetadata.bind(this));
          this.addListener('canplay', this.onCanPlay.bind(this));
          this.addListener('canplaythrough', this.onCanPlay.bind(this));
          this.addListener('play', this.onPlay.bind(this));
          this.addListener('playing', this.onPlaying.bind(this));
          this.addListener('pause', this.onPause.bind(this));
          this.addListener('click', this.onClick.bind(this));
          this.addListener('ended', this.onEnded.bind(this));
          this.addListener('error', this.onError.bind(this));
        };

        _proto.onCanPlay = function onCanPlay(e) {
          var video = e.target;

          if (this._loaded && video) {
            return;
          } // eslint-disable-next-line default-case


          switch (video.readyState) {
            case READY_STATE.HAVE_METADATA:
            case READY_STATE.HAVE_ENOUGH_DATA:
              {
                _VideoPlayerImpl.prototype.onCanPlay.call(this, e);

                break;
              }
          }
        };

        _proto.enable = function enable() {
          if (this._video) {
            this._visible = true;

            if (this._video.style.visibility === 'visible') {
              return;
            }

            this._video.style.visibility = 'visible';
          }
        };

        _proto.disable = function disable(noPause) {
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
        };

        _proto.syncMatrix = function syncMatrix() {
          if (!this._video || !this._visible || !this._component) return;
          var camera = this.UICamera;

          if (!camera) {
            return;
          }

          if (screen.fullScreen()) {
            return;
          } // use stayOnBottom


          if (this._dirty) {
            this._dirty = false;

            if (this._stayOnBottom) {
              this._clearColorA = camera.clearColor.w;
              this._clearFlag = camera.clearFlag;
              camera.clearColor.w = 0;
              camera.clearFlag = ClearFlagBit.ALL;
            } else if (this._clearFlag) {
              camera.clearColor.w = this._clearColorA;
              camera.clearFlag = this._clearFlag;
              this._clearColorA = -1;
              this._clearFlag = null;
            }
          }

          this._component.node.getWorldMatrix(_mat4_temp);

          camera.update(true);
          camera.worldMatrixToScreen(_mat4_temp, _mat4_temp, game.canvas.width, game.canvas.height);
          var width = 0;
          var height = 0;

          if (this._fullScreenOnAwake) {
            width = visibleRect.width;
            height = visibleRect.height;
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
          var dpr = view.getDevicePixelRatio();
          var scaleX = 1 / dpr;
          var scaleY = 1 / dpr;
          var container = game.container;
          var sx = _mat4_temp.m00 * scaleX;
          var b = _mat4_temp.m01;
          var c = _mat4_temp.m04;
          var sy = _mat4_temp.m05 * scaleY;
          this._video.style.width = this._w + "px";
          this._video.style.height = this._h + "px";

          if (system.browserType !== BrowserType.MOBILE_QQ) {
            this._video.style.objectFit = this._keepAspectRatio ? 'none' : 'fill';
          } else {
            warn('keepAspectRatio is not supported by the qq mobile browser.');
          }

          var w = this._w * scaleX;
          var h = this._h * scaleY;
          var _anchorPoint = this._uiTrans.anchorPoint,
              x = _anchorPoint.x,
              y = _anchorPoint.y;
          var appx = w * _mat4_temp.m00 * x;
          var appy = h * _mat4_temp.m05 * y;
          var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
          var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
          var tx = _mat4_temp.m12 * scaleX - appx + offsetX;
          var ty = _mat4_temp.m13 * scaleY - appy + offsetY;
          var matrix = "matrix(" + sx + "," + -b + "," + -c + "," + sy + "," + tx + "," + -ty + ")";
          this._video.style.transform = matrix;
          this._video.style['-webkit-transform'] = matrix; // video style would change when enter fullscreen on IE
          // there is no way to add fullscreenchange event listeners on IE so that we can restore the cached video style

          if (system.browserType !== BrowserType.IE) {
            this._forceUpdate = false;
          }
        };

        return VideoPlayerImplWeb;
      }(VideoPlayerImpl));
    }
  };
});