System.register("q-bundled:///fs/cocos/video/video-player.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/platform/index.js", "../core/components/index.js", "../2d/framework/index.js", "../core/math/index.js", "./assets/video-clip.js", "./video-player-impl-manager.js", "./video-player-enums.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, executeInEditMode, help, menu, slide, range, requireComponent, tooltip, type, serializable, EDITOR, warn, Component, ComponentEventHandler, UITransform, clamp, VideoClip, VideoPlayerImplManager, EventType, ResourceType, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp, VideoPlayer;

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
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      slide = _coreDataDecoratorsIndexJs.slide;
      range = _coreDataDecoratorsIndexJs.range;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_corePlatformIndexJs) {
      warn = _corePlatformIndexJs.warn;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
      ComponentEventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_coreMathIndexJs) {
      clamp = _coreMathIndexJs.clamp;
    }, function (_assetsVideoClipJs) {
      VideoClip = _assetsVideoClipJs.VideoClip;
    }, function (_videoPlayerImplManagerJs) {
      VideoPlayerImplManager = _videoPlayerImplManagerJs.VideoPlayerImplManager;
    }, function (_videoPlayerEnumsJs) {
      EventType = _videoPlayerEnumsJs.EventType;
      ResourceType = _videoPlayerEnumsJs.ResourceType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en
       * VideoPlayer is a component for playing videos, you can use it for showing videos in your game.
       * Because different platforms have different authorization, API and control methods for VideoPlayer component.
       * And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
       * @zh
       * Video 组件，用于在游戏中播放视频。
       * 由于不同平台对于 VideoPlayer 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
       */
      _export("VideoPlayer", VideoPlayer = (_dec = ccclass('cc.VideoPlayer'), _dec2 = help('i18n:cc.VideoPlayer'), _dec3 = menu('Video/VideoPlayer'), _dec4 = requireComponent(UITransform), _dec5 = type(VideoClip), _dec6 = type(ResourceType), _dec7 = tooltip('i18n:videoplayer.resourceType'), _dec8 = tooltip('i18n:videoplayer.remoteURL'), _dec9 = type(VideoClip), _dec10 = tooltip('i18n:videoplayer.clip'), _dec11 = tooltip('i18n:videoplayer.playOnAwake'), _dec12 = range([0.0, 10, 1.0]), _dec13 = tooltip('i18n:videoplayer.playbackRate'), _dec14 = range([0.0, 1.0, 0.1]), _dec15 = tooltip('i18n:videoplayer.volume'), _dec16 = tooltip('i18n:videoplayer.mute'), _dec17 = tooltip('i18n:videoplayer.loop'), _dec18 = tooltip('i18n:videoplayer.keepAspectRatio'), _dec19 = tooltip('i18n:videoplayer.fullScreenOnAwake'), _dec20 = tooltip('i18n:videoplayer.stayOnBottom'), _dec21 = type([ComponentEventHandler]), _dec22 = displayOrder(20), _dec23 = tooltip('i18n:videoplayer.videoPlayerEvent'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VideoPlayer, _Component);

        function VideoPlayer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_resourceType", _descriptor, _assertThisInitialized(_this));

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
          if (EDITOR) {
            return;
          }

          this._impl = VideoPlayerImplManager.getImpl(this);
          this.syncSource();

          this._impl.syncLoop(this._loop);

          this._impl.syncVolume(this._volume);

          this._impl.syncMute(this._mute);

          this._impl.seekTo(this._cachedCurrentTime);

          this._impl.syncPlaybackRate(this._playbackRate);

          this._impl.syncStayOnBottom(this._stayOnBottom);

          this._impl.syncKeepAspectRatio(this._keepAspectRatio);

          this._impl.syncFullScreenOnAwake(this._fullScreenOnAwake); //


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
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.META_LOADED);
          this.node.emit('meta-loaded', this);
        };

        _proto.onReadyToPlay = function onReadyToPlay() {
          if (this._playOnAwake && !this.isPlaying) {
            this.play();
          }

          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.READY_TO_PLAY);
          this.node.emit(EventType.READY_TO_PLAY, this);
        };

        _proto.onPlaying = function onPlaying() {
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PLAYING);
          this.node.emit(EventType.PLAYING, this);
        };

        _proto.onPasued = function onPasued() {
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PAUSED);
          this.node.emit(EventType.PAUSED, this);
        };

        _proto.onStopped = function onStopped() {
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.STOPPED);
          this.node.emit(EventType.STOPPED, this);
        };

        _proto.onCompleted = function onCompleted() {
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.COMPLETED);
          this.node.emit(EventType.COMPLETED, this);
        };

        _proto.onError = function onError() {
          ComponentEventHandler.emitEvents(this.videoPlayerEvent, this, EventType.ERROR);
          this.node.emit(EventType.ERROR, this);
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
        ;

        _proto.play = function play() {
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
        ;

        _proto.resume = function resume() {
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
        ;

        _proto.pause = function pause() {
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
        ;

        _proto.stop = function stop() {
          if (this._impl) {
            this._impl.stop();
          }
        };

        _createClass(VideoPlayer, [{
          key: "resourceType",
          get:
          /**
           * @en
           * The resource type of video player, REMOTE for remote url and LOCAL for local file path.
           * @zh
           * 视频来源：REMOTE 表示远程视频 URL，LOCAL 表示本地视频地址。
           */
          function get() {
            return this._resourceType;
          },
          set: function set(val) {
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
          /**
           * @en
           * The local video clip
           * @zh
           * 本地视频剪辑。
           */

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
          /**
           * @en
           * Whether the video start playing automatically after loaded?
           * @zh
           * 视频加载后是否自动开始播放？
           */

        }, {
          key: "playOnAwake",
          get: function get() {
            return this._playOnAwake;
          },
          set: function set(value) {
            this._playOnAwake = value;
          }
          /**
           * @en
           * The Video playback rate
           * @zh
           * 视频播放时的速率（0.0 ~ 10.0）
           */

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
          /**
           * @en
           * The volume of the video.
           * @zh
           * 视频的音量（0.0 ~ 1.0）
           */

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
          /**
           * @en
           * Mutes the VideoPlayer. Mute sets the volume=0, Un-Mute restore the original volume.
           * @zh
           * 是否静音视频。静音时设置音量为 0，取消静音是恢复原来的音量。
           */

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
          /**
           * @en
           * Whether the video should be played again at the end
           * @zh
           * 视频是否应在结束时再次播放
           */

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
          /**
           * @en
           * Whether keep the aspect ration of the original video.
           * @zh
           * 是否保持视频原来的宽高比
           */

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
          /**
           * @en
           * Whether play video in fullscreen mode.
           * @zh
           * 是否全屏播放视频
           */

        }, {
          key: "fullScreenOnAwake",
          get: function get() {
            if (!EDITOR) {
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
          /**
           * @en
           * Always below the game view (only useful on Web.
           * Note: The specific effects are not guaranteed to be consistent, depending on whether each browser supports or restricts).
           * @zh
           * 永远在游戏视图最底层（这个属性只有在 Web 平台上有效果。注意：具体效果无法保证一致，跟各个浏览器是否支持与限制有关）
           */

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
          get:
          /**
           * @en
           * Raw video objects for user customization
           * @zh
           * 原始视频对象，用于用户定制
           */
          function get() {
            return this._impl && this._impl.video || null;
          }
          /**
           * @en
           * The current playback time of the now playing item in seconds, you could also change the start playback time.
           * @zh
           * 指定视频从什么时间点开始播放，单位是秒，也可以用来获取当前视频播放的时间进度。
           */

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
          /**
           * @en
           * Get the audio duration, in seconds.
           * @zh
           * 获取以秒为单位的视频总时长。
           */

        }, {
          key: "duration",
          get: function get() {
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

        }, {
          key: "state",
          get: function get() {
            if (!this._impl) {
              return EventType.NONE;
            }

            return this._impl.state;
          }
          /**
           * @en
           * Is the audio currently playing?
           * @zh
           * 当前视频是否正在播放？
           */

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
      }(Component), _class3.EventType = EventType, _class3.ResourceType = ResourceType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resourceType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return ResourceType.LOCAL;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_remoteURL", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_clip", [_dec5, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_playOnAwake", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_volume", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_mute", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_playbackRate", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_loop", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_fullScreenOnAwake", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_stayOnBottom", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_keepAspectRatio", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "resourceType", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "resourceType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remoteURL", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "remoteURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "clip"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "playOnAwake"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "playbackRate", [slide, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "playbackRate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "volume", [slide, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "volume"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mute", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "mute"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loop", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "loop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "keepAspectRatio", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "keepAspectRatio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fullScreenOnAwake", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "fullScreenOnAwake"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stayOnBottom", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "stayOnBottom"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "videoPlayerEvent", [serializable, _dec21, _dec22, _dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class)); // TODO Since jsb adapter does not support import cc, put it on internal first and adjust it later.


      legacyCC.internal.VideoPlayer = VideoPlayer;
    }
  };
});