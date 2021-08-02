System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './renderable-2d-10fe359a.js', './deprecated-6bde9d8e.js'], function (exports) {
  'use strict';
  var ccclass, _inheritsLoose, _createClass, _applyDecoratedDescriptor, _initializerDefineProperty, _assertThisInitialized, Asset, serializable, log, Enum, error, legacyCC, mat4, system, BrowserType, warn, OS, sys, contains, ClearFlagBit, type, tooltip, range, displayOrder, executeInEditMode, slide, help, menu, requireComponent, clamp, Component, downloader, factory, director, EventHandler, screen, game, view, visibleRect, UITransform;
  return {
    setters: [function (module) {
      ccclass = module.es;
      _inheritsLoose = module.et;
      _createClass = module.eu;
      _applyDecoratedDescriptor = module.ev;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      Asset = module.e1;
      serializable = module.eI;
      log = module.a;
      Enum = module.dy;
      error = module.e;
      legacyCC = module.l;
      mat4 = module.d4;
      system = module.eP;
      BrowserType = module.eY;
      warn = module.w;
      OS = module.eR;
      sys = module.eg;
      contains = module.gH;
      ClearFlagBit = module.ab;
      type = module.ey;
      tooltip = module.fX;
      range = module.eC;
      displayOrder = module.eE;
      executeInEditMode = module.fZ;
      slide = module.eG;
      help = module.f$;
      menu = module.g0;
      requireComponent = module.gD;
      clamp = module.df;
      Component = module.eo;
    }, function (module) {
      downloader = module.w;
      factory = module.x;
      director = module.f;
      EventHandler = module.E;
    }, function () {}, function (module) {
      screen = module.s;
      game = module.g;
      view = module.v;
      visibleRect = module.u;
    }, function () {}, function () {}, function () {}, function (module) {
      UITransform = module.U;
    }, function () {}],
    execute: function () {

      var _dec, _class, _class2, _descriptor, _temp;
      var VideoClip = exports('VideoClip', (_dec = ccclass('cc.VideoClip'), _dec(_class = (_class2 = (_temp = function (_Asset) {
        _inheritsLoose(VideoClip, _Asset);

        function VideoClip() {
          var _this;

          _this = _Asset.call(this) || this;

          _initializerDefineProperty(_this, "_duration", _descriptor, _assertThisInitialized(_this));

          _this._video = null;
          _this.loaded = false;
          return _this;
        }

        _createClass(VideoClip, [{
          key: "_nativeAsset",
          get: function get() {
            return this._video;
          },
          set: function set(clip) {
            this._video = clip;

            if (clip) {
              this._duration = clip.duration;
              this.loaded = true;
            } else {
              this._duration = 0;
              this.loaded = false;
            }
          }
        }]);

        return VideoClip;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_duration", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      function downloadVideo(url, options, onComplete) {
        var video = document.createElement('video');
        var source = document.createElement('source');
        video.appendChild(source);
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'blob';

        req.onload = function onload() {
          if (this.status === 200 || this.status === 0) {
            source.src = URL.createObjectURL(this.response);
            onComplete(null, video);
          } else {
            onComplete(new Error(req.status + "(no response)"));
          }
        };

        req.onerror = function onerror() {
          var message = "load video failure - " + url;
          log(message);
          onComplete(new Error(message));
        };

        req.send();
      }

      function createVideoClip(id, data, options, onComplete) {
        var out = new VideoClip();
        out._nativeUrl = id;
        out._nativeAsset = data;
        onComplete(null, out);
      }

      downloader.register({
        '.mp4': downloadVideo,
        '.avi': downloadVideo,
        '.mov': downloadVideo,
        '.mpg': downloadVideo,
        '.mpeg': downloadVideo,
        '.rm': downloadVideo,
        '.rmvb': downloadVideo
      });
      factory.register({
        '.mp4': createVideoClip,
        '.avi': createVideoClip,
        '.mov': createVideoClip,
        '.mpg': createVideoClip,
        '.mpeg': createVideoClip,
        '.rm': createVideoClip,
        '.rmvb': createVideoClip
      });

      var ResourceType = Enum({
        REMOTE: 0,
        LOCAL: 1
      });
      var EventType;

      (function (EventType) {
        EventType["NONE"] = "none";
        EventType["PLAYING"] = "playing";
        EventType["PAUSED"] = "paused";
        EventType["STOPPED"] = "stopped";
        EventType["COMPLETED"] = "completed";
        EventType["META_LOADED"] = "meta-loaded";
        EventType["READY_TO_PLAY"] = "ready-to-play";
        EventType["ERROR"] = "error";
        EventType["CLICKED"] = "clicked";
      })(EventType || (EventType = {}));

      var READY_STATE;

      (function (READY_STATE) {
        READY_STATE[READY_STATE["HAVE_NOTHING"] = 0] = "HAVE_NOTHING";
        READY_STATE[READY_STATE["HAVE_METADATA"] = 1] = "HAVE_METADATA";
        READY_STATE[READY_STATE["HAVE_CURRENT_DATA"] = 2] = "HAVE_CURRENT_DATA";
        READY_STATE[READY_STATE["HAVE_FUTURE_DATA"] = 3] = "HAVE_FUTURE_DATA";
        READY_STATE[READY_STATE["HAVE_ENOUGH_DATA"] = 4] = "HAVE_ENOUGH_DATA";
      })(READY_STATE || (READY_STATE = {}));

      var VideoPlayerImpl = function () {
        function VideoPlayerImpl(component) {
          var _this = this;

          this._componentEventList = new Map();
          this._state = EventType.NONE;
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
          this._uiTrans = component.node.getComponent(UITransform);

          this._onHide = function () {
            if (!_this.video || _this._state !== EventType.PLAYING) {
              return;
            }

            _this.video.pause();

            _this._interrupted = true;
          };

          this._onShow = function () {
            if (!_this._interrupted || !_this.video) {
              return;
            }

            _this.video.play();

            _this._interrupted = false;
          };

          legacyCC.game.on(legacyCC.Game.EVENT_HIDE, this._onHide);
          legacyCC.game.on(legacyCC.Game.EVENT_SHOW, this._onShow);
        }

        var _proto = VideoPlayerImpl.prototype;

        _proto.onLoadedMetadata = function onLoadedMetadata(e) {
          this._loadedMeta = true;
          this._forceUpdate = true;

          if (this._visible) {
            this.enable();
          } else {
            this.disable();
          }

          this.dispatchEvent(EventType.META_LOADED);
          var video = e.target;

          if (this._keepAspectRatio && video) {
            this.syncUITransform(video.videoWidth, video.videoHeight);
          }

          this.delayedFullScreen();
          this.delayedPlay();
        };

        _proto.onCanPlay = function onCanPlay(e) {
          this._loaded = true;
          this.dispatchEvent(EventType.READY_TO_PLAY);
        };

        _proto.onPlay = function onPlay(e) {
          this._playing = true;
          this.dispatchEvent(EventType.PLAYING);
        };

        _proto.onPlaying = function onPlaying(e) {
          this.dispatchEvent(EventType.PLAYING);
        };

        _proto.onPause = function onPause(e) {
          if (this._ignorePause) {
            this._ignorePause = false;
            return;
          }

          this._playing = false;
          this.dispatchEvent(EventType.PAUSED);
        };

        _proto.onStoped = function onStoped(e) {
          this._playing = false;
          this._ignorePause = false;
          this.dispatchEvent(EventType.STOPPED);
        };

        _proto.onEnded = function onEnded(e) {
          this.dispatchEvent(EventType.COMPLETED);
        };

        _proto.onClick = function onClick(e) {
          this.dispatchEvent(EventType.CLICKED);
        };

        _proto.onError = function onError(e) {
          this.dispatchEvent(EventType.ERROR);
          var video = e.target;

          if (video && video.error) {
            error("Error " + video.error.code + "; details: " + video.error.message);
          }
        };

        _proto.play = function play() {
          if (this._loadedMeta || this._loaded) {
            this.canPlay();
          } else {
            this._waitingPlay = true;
          }
        };

        _proto.delayedPlay = function delayedPlay() {
          if (this._waitingPlay) {
            this.canPlay();
            this._waitingPlay = false;
          }
        };

        _proto.syncFullScreenOnAwake = function syncFullScreenOnAwake(enabled) {
          this._fullScreenOnAwake = enabled;

          if (this._loadedMeta || this._loaded) {
            this.canFullScreen(enabled);
          } else {
            this._waitingFullscreen = true;
          }
        };

        _proto.delayedFullScreen = function delayedFullScreen() {
          if (this._waitingFullscreen) {
            this.canFullScreen(this._fullScreenOnAwake);
            this._waitingFullscreen = false;
          }
        };

        _proto.dispatchEvent = function dispatchEvent(key) {
          var callback = this._componentEventList.get(key);

          if (callback) {
            this._state = key;
            callback.call(this);
          }
        };

        _proto.syncUITransform = function syncUITransform(width, height) {
          if (this._uiTrans) {
            this._uiTrans.width = width;
            this._uiTrans.height = height;
          }
        };

        _proto.syncCurrentTime = function syncCurrentTime() {
          if (!this.video) {
            return;
          }

          if (this._cachedCurrentTime !== -1 && this.video.currentTime !== this._cachedCurrentTime) {
            this.seekTo(this._cachedCurrentTime);
            this._cachedCurrentTime = -1;
          }
        };

        _proto.destroy = function destroy() {
          this.removeVideoPlayer();

          this._componentEventList.clear();

          legacyCC.game.off(legacyCC.Game.EVENT_HIDE, this._onHide);
          legacyCC.game.off(legacyCC.Game.EVENT_SHOW, this._onShow);
        };

        _createClass(VideoPlayerImpl, [{
          key: "fullScreenOnAwake",
          get: function get() {
            return this._fullScreenOnAwake;
          }
        }, {
          key: "loaded",
          get: function get() {
            return this._loaded;
          }
        }, {
          key: "componentEventList",
          get: function get() {
            return this._componentEventList;
          }
        }, {
          key: "video",
          get: function get() {
            return this._video;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "isPlaying",
          get: function get() {
            return this._playing;
          }
        }, {
          key: "UICamera",
          get: function get() {
            return director.root.batcher2D.getFirstRenderCamera(this._node);
          }
        }]);

        return VideoPlayerImpl;
      }();
      legacyCC.internal.VideoPlayerImpl = VideoPlayerImpl;

      var MIN_ZINDEX = -Math.pow(2, 15);

      var _mat4_temp = mat4();

      var VideoPlayerImplWeb = function (_VideoPlayerImpl) {
        _inheritsLoose(VideoPlayerImplWeb, _VideoPlayerImpl);

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
            var promise = this.video.play();

            if (window.Promise && promise instanceof Promise) {
              promise["catch"](function (error) {}).then(function () {
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
              if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
              }
            } else if (video.webkitExitFullscreen) {
              video.webkitExitFullscreen();
            }

            this._fullScreenOnAwake = video.webkitDisplayingFullscreen;
            return;
          }

          if (!screen.supportsFullScreen) {
            this._fullScreenOnAwake = enabled;
            this._forceUpdate = true;
            this.syncMatrix();
            return;
          }

          if (enabled) {
            if (system.browserType === BrowserType.IE) {
              video.style.transform = '';
            }

            video.setAttribute('x5-video-player-fullscreen', 'true');
            screen.requestFullScreen(video, function (document) {
              var fullscreenElement = system.browserType === BrowserType.IE ? document.msFullscreenElement : document.fullscreenElement;
              _this5._fullScreenOnAwake = fullscreenElement === video;
            }, function () {
              _this5._fullScreenOnAwake = false;
            });
          } else {
            video.removeAttribute('x5-video-player-fullscreen');
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
          video.style.left = '0px';
          video.style['transform-origin'] = '0px 100% 0px';
          video.style['-webkit-transform-origin'] = '0px 100% 0px';
          video.setAttribute('preload', 'auto');
          video.setAttribute('webkit-playsinline', '');
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
          }

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
          }

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
          }

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
          this._video.style['-webkit-transform'] = matrix;

          if (system.browserType !== BrowserType.IE) {
            this._forceUpdate = false;
          }
        };

        return VideoPlayerImplWeb;
      }(VideoPlayerImpl);

      var VideoPlayerImplManager = function () {
        function VideoPlayerImplManager() {}

        VideoPlayerImplManager.getImpl = function getImpl(component) {
          return new VideoPlayerImplWeb(component);
        };

        return VideoPlayerImplManager;
      }();
      legacyCC.internal.VideoPlayerImplManager = VideoPlayerImplManager;

      var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class$1, _class2$1, _descriptor$1, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp$1;
      var VideoPlayer = exports('VideoPlayer', (_dec$1 = ccclass('cc.VideoPlayer'), _dec2 = help('i18n:cc.VideoPlayer'), _dec3 = menu('Video/VideoPlayer'), _dec4 = requireComponent(UITransform), _dec5 = type(VideoClip), _dec6 = type(ResourceType), _dec7 = tooltip('i18n:videoplayer.resourceType'), _dec8 = tooltip('i18n:videoplayer.remoteURL'), _dec9 = type(VideoClip), _dec10 = tooltip('i18n:videoplayer.clip'), _dec11 = tooltip('i18n:videoplayer.playOnAwake'), _dec12 = range([0.0, 10, 1.0]), _dec13 = tooltip('i18n:videoplayer.playbackRate'), _dec14 = range([0.0, 1.0, 0.1]), _dec15 = tooltip('i18n:videoplayer.volume'), _dec16 = tooltip('i18n:videoplayer.mute'), _dec17 = tooltip('i18n:videoplayer.loop'), _dec18 = tooltip('i18n:videoplayer.keepAspectRatio'), _dec19 = tooltip('i18n:videoplayer.fullScreenOnAwake'), _dec20 = tooltip('i18n:videoplayer.stayOnBottom'), _dec21 = type([EventHandler]), _dec22 = displayOrder(20), _dec23 = tooltip('i18n:videoplayer.videoPlayerEvent'), _dec$1(_class$1 = _dec2(_class$1 = _dec3(_class$1 = _dec4(_class$1 = executeInEditMode(_class$1 = (_class2$1 = (_temp$1 = _class3 = function (_Component) {
        _inheritsLoose(VideoPlayer, _Component);

        function VideoPlayer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_resourceType", _descriptor$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_remoteURL", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_clip", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_playOnAwake", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_volume", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_mute", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_playbackRate", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_loop", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fullScreenOnAwake", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_stayOnBottom", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_keepAspectRatio", _descriptor11, _assertThisInitialized(_this));

          _this._impl = null;
          _this._cachedCurrentTime = 0;

          _initializerDefineProperty(_this, "videoPlayerEvent", _descriptor12, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = VideoPlayer.prototype;

        _proto.syncSource = function syncSource() {
          if (!this._impl) {
            return;
          }

          if (this._resourceType === ResourceType.REMOTE) {
            this._impl.syncURL(this._remoteURL);
          } else {
            this._impl.syncClip(this._clip);
          }
        };

        _proto.__preload = function __preload() {

          this._impl = VideoPlayerImplManager.getImpl(this);
          this.syncSource();

          this._impl.syncLoop(this._loop);

          this._impl.syncVolume(this._volume);

          this._impl.syncMute(this._mute);

          this._impl.seekTo(this._cachedCurrentTime);

          this._impl.syncPlaybackRate(this._playbackRate);

          this._impl.syncStayOnBottom(this._stayOnBottom);

          this._impl.syncKeepAspectRatio(this._keepAspectRatio);

          this._impl.syncFullScreenOnAwake(this._fullScreenOnAwake);

          this._impl.componentEventList.set(EventType.META_LOADED, this.onMetaLoaded.bind(this));

          this._impl.componentEventList.set(EventType.READY_TO_PLAY, this.onReadyToPlay.bind(this));

          this._impl.componentEventList.set(EventType.PLAYING, this.onPlaying.bind(this));

          this._impl.componentEventList.set(EventType.PAUSED, this.onPasued.bind(this));

          this._impl.componentEventList.set(EventType.STOPPED, this.onStopped.bind(this));

          this._impl.componentEventList.set(EventType.COMPLETED, this.onCompleted.bind(this));

          this._impl.componentEventList.set(EventType.ERROR, this.onError.bind(this));

          if (this._playOnAwake && this._impl.loaded) {
            this.play();
          }
        };

        _proto.onEnable = function onEnable() {
          if (this._impl) {
            this._impl.enable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._impl) {
            this._impl.disable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._impl) {
            this._impl.destroy();

            this._impl = null;
          }
        };

        _proto.update = function update(dt) {
          if (this._impl) {
            this._impl.syncMatrix();
          }
        };

        _proto.onMetaLoaded = function onMetaLoaded() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.META_LOADED);
          this.node.emit('meta-loaded', this);
        };

        _proto.onReadyToPlay = function onReadyToPlay() {
          if (this._playOnAwake && !this.isPlaying) {
            this.play();
          }

          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.READY_TO_PLAY);
          this.node.emit(EventType.READY_TO_PLAY, this);
        };

        _proto.onPlaying = function onPlaying() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PLAYING);
          this.node.emit(EventType.PLAYING, this);
        };

        _proto.onPasued = function onPasued() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PAUSED);
          this.node.emit(EventType.PAUSED, this);
        };

        _proto.onStopped = function onStopped() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.STOPPED);
          this.node.emit(EventType.STOPPED, this);
        };

        _proto.onCompleted = function onCompleted() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.COMPLETED);
          this.node.emit(EventType.COMPLETED, this);
        };

        _proto.onError = function onError() {
          EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.ERROR);
          this.node.emit(EventType.ERROR, this);
        };

        _proto.play = function play() {
          if (this._impl) {
            this._impl.play();
          }
        };

        _proto.resume = function resume() {
          if (this._impl) {
            this._impl.resume();
          }
        };

        _proto.pause = function pause() {
          if (this._impl) {
            this._impl.pause();
          }
        };

        _proto.stop = function stop() {
          if (this._impl) {
            this._impl.stop();
          }
        };

        _createClass(VideoPlayer, [{
          key: "resourceType",
          get: function get() {
            return this._resourceType;
          },
          set: function set(val) {
            if (this._resourceType !== val) {
              this._resourceType = val;
              this.syncSource();
            }
          }
        }, {
          key: "remoteURL",
          get: function get() {
            return this._remoteURL;
          },
          set: function set(val) {
            if (this._remoteURL !== val) {
              this._remoteURL = val;
              this.syncSource();
            }
          }
        }, {
          key: "clip",
          get: function get() {
            return this._clip;
          },
          set: function set(val) {
            if (this._clip !== val) {
              this._clip = val;
              this.syncSource();
            }
          }
        }, {
          key: "playOnAwake",
          get: function get() {
            return this._playOnAwake;
          },
          set: function set(value) {
            this._playOnAwake = value;
          }
        }, {
          key: "playbackRate",
          get: function get() {
            return this._playbackRate;
          },
          set: function set(value) {
            this._playbackRate = value;

            if (this._impl) {
              this._impl.syncPlaybackRate(value);
            }
          }
        }, {
          key: "volume",
          get: function get() {
            return this._volume;
          },
          set: function set(value) {
            this._volume = value;

            if (this._impl) {
              this._impl.syncVolume(value);
            }
          }
        }, {
          key: "mute",
          get: function get() {
            return this._mute;
          },
          set: function set(value) {
            this._mute = value;

            if (this._impl) {
              this._impl.syncMute(value);
            }
          }
        }, {
          key: "loop",
          get: function get() {
            return this._loop;
          },
          set: function set(value) {
            this._loop = value;

            if (this._impl) {
              this._impl.syncLoop(value);
            }
          }
        }, {
          key: "keepAspectRatio",
          get: function get() {
            return this._keepAspectRatio;
          },
          set: function set(value) {
            if (this._keepAspectRatio !== value) {
              this._keepAspectRatio = value;

              if (this._impl) {
                this._impl.syncKeepAspectRatio(value);
              }
            }
          }
        }, {
          key: "fullScreenOnAwake",
          get: function get() {
            {
              if (this._impl) {
                this._fullScreenOnAwake = this._impl.fullScreenOnAwake;
                return this._fullScreenOnAwake;
              }
            }

            return this._fullScreenOnAwake;
          },
          set: function set(value) {
            if (this._fullScreenOnAwake !== value) {
              this._fullScreenOnAwake = value;

              if (this._impl) {
                this._impl.syncFullScreenOnAwake(value);
              }
            }
          }
        }, {
          key: "stayOnBottom",
          get: function get() {
            return this._stayOnBottom;
          },
          set: function set(value) {
            if (this._stayOnBottom !== value) {
              this._stayOnBottom = value;

              if (this._impl) {
                this._impl.syncStayOnBottom(value);
              }
            }
          }
        }, {
          key: "nativeVideo",
          get: function get() {
            return this._impl && this._impl.video || null;
          }
        }, {
          key: "currentTime",
          get: function get() {
            if (!this._impl) {
              return this._cachedCurrentTime;
            }

            return this._impl.getCurrentTime();
          },
          set: function set(val) {
            if (Number.isNaN(val)) {
              warn("illegal video time! value:" + val);
              return;
            }

            val = clamp(val, 0, this.duration);
            this._cachedCurrentTime = val;

            if (this._impl) {
              this._impl.seekTo(val);
            }
          }
        }, {
          key: "duration",
          get: function get() {
            if (!this._impl) {
              return 0;
            }

            return this._impl.getDuration();
          }
        }, {
          key: "state",
          get: function get() {
            if (!this._impl) {
              return EventType.NONE;
            }

            return this._impl.state;
          }
        }, {
          key: "isPlaying",
          get: function get() {
            if (!this._impl) {
              return false;
            }

            return this._impl.isPlaying;
          }
        }]);

        return VideoPlayer;
      }(Component), _class3.EventType = EventType, _class3.ResourceType = ResourceType, _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_resourceType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ResourceType.LOCAL;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2$1.prototype, "_remoteURL", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2$1.prototype, "_clip", [_dec5, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2$1.prototype, "_playOnAwake", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2$1.prototype, "_volume", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2$1.prototype, "_mute", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2$1.prototype, "_playbackRate", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2$1.prototype, "_loop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2$1.prototype, "_fullScreenOnAwake", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2$1.prototype, "_stayOnBottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2$1.prototype, "_keepAspectRatio", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2$1.prototype, "resourceType", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "resourceType"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "remoteURL", [_dec8], Object.getOwnPropertyDescriptor(_class2$1.prototype, "remoteURL"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "clip", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2$1.prototype, "clip"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "playOnAwake", [_dec11], Object.getOwnPropertyDescriptor(_class2$1.prototype, "playOnAwake"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "playbackRate", [slide, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2$1.prototype, "playbackRate"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "volume", [slide, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2$1.prototype, "volume"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "mute", [_dec16], Object.getOwnPropertyDescriptor(_class2$1.prototype, "mute"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "loop", [_dec17], Object.getOwnPropertyDescriptor(_class2$1.prototype, "loop"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "keepAspectRatio", [_dec18], Object.getOwnPropertyDescriptor(_class2$1.prototype, "keepAspectRatio"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "fullScreenOnAwake", [_dec19], Object.getOwnPropertyDescriptor(_class2$1.prototype, "fullScreenOnAwake"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "stayOnBottom", [_dec20], Object.getOwnPropertyDescriptor(_class2$1.prototype, "stayOnBottom"), _class2$1.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2$1.prototype, "videoPlayerEvent", [serializable, _dec21, _dec22, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1));
      legacyCC.internal.VideoPlayer = VideoPlayer;

    }
  };
});
