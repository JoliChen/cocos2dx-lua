System.register("q-bundled:///fs/cocos/core/game.js", ["../../../virtual/internal%253Aconstants.js", "../../pal/system/web/system.js", "./event/event-target.js", "./platform/debug.js", "./platform/event-manager/input-manager.js", "./gfx/index.js", "./platform/sys.js", "./platform/macro.js", "./global-exports.js", "./pipeline/define.js", "./pipeline/index.js", "../../pal/system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, JSB, PREVIEW, RUNTIME_BASED, system, EventTarget, debug, inputManager, DeviceInfo, sys, macro, legacyCC, VERSION, bindingMappingInfo, RenderPipeline, BrowserType, Game, game;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
    }, function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_eventEventTargetJs) {
      EventTarget = _eventEventTargetJs.EventTarget;
    }, function (_platformDebugJs) {
      debug = _platformDebugJs;
    }, function (_platformEventManagerInputManagerJs) {
      inputManager = _platformEventManagerInputManagerJs.default;
    }, function (_gfxIndexJs) {
      DeviceInfo = _gfxIndexJs.DeviceInfo;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_platformMacroJs) {
      macro = _platformMacroJs.macro;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
      VERSION = _globalExportsJs.VERSION;
    }, function (_pipelineDefineJs) {
      bindingMappingInfo = _pipelineDefineJs.bindingMappingInfo;
    }, function (_pipelineIndexJs) {
      RenderPipeline = _pipelineIndexJs.RenderPipeline;
    }, function (_palSystemEnumTypeIndexJs) {
      BrowserType = _palSystemEnumTypeIndexJs.BrowserType;
    }],
    execute: function () {
      /**
       * @en An object to boot the game.
       * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
       */
      _export("Game", Game = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Game, _EventTarget);

        function Game() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _EventTarget.call.apply(_EventTarget, [this].concat(args)) || this;
          _this.frame = null;
          _this.container = null;
          _this.canvas = null;
          _this.renderType = -1;
          _this.eventTargetOn = _EventTarget.prototype.on;
          _this.eventTargetOnce = _EventTarget.prototype.once;
          _this.config = {};
          _this.onStart = null;
          _this.collisionMatrix = [];
          _this.groupList = [];
          _this._persistRootNodes = {};
          _this._paused = true;
          _this._configLoaded = false;
          _this._isCloning = false;
          _this._inited = false;
          _this._engineInited = false;
          _this._rendererInitialized = false;
          _this._gfxDevice = null;
          _this._intervalId = null;
          return _this;
        }

        var _proto = Game.prototype;

        // @Methods
        //  @Game play control

        /**
         * @en Set frame rate of game.
         * @zh 设置游戏帧率。
         */
        _proto.setFrameRate = function setFrameRate(frameRate) {
          var config = this.config;

          if (typeof frameRate !== 'number') {
            frameRate = parseInt(frameRate, 10);

            if (Number.isNaN(frameRate)) {
              frameRate = 60;
            }
          }

          config.frameRate = frameRate;
          this._paused = true;

          this._setAnimFrame();

          this._runMainLoop();
        }
        /**
         * @en Get frame rate set for the game, it doesn't represent the real frame rate.
         * @zh 获取设置的游戏帧率（不等同于实际帧率）。
         * @return frame rate
         */
        ;

        _proto.getFrameRate = function getFrameRate() {
          return this.config.frameRate || 0;
        }
        /**
         * @en Run the game frame by frame.
         * @zh 执行一帧游戏循环。
         */
        ;

        _proto.step = function step() {
          legacyCC.director.mainLoop();
        }
        /**
         * @en Pause the game main loop. This will pause:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * This is different with `director.pause` which only pause the game logic execution.<br>
         * @zh 暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。这点和只暂停游戏逻辑的 `director.pause` 不同。
         */
        ;

        _proto.pause = function pause() {
          if (this._paused) {
            return;
          }

          this._paused = true; // Pause main loop

          if (this._intervalId) {
            window.cAF(this._intervalId);
            this._intervalId = 0;
          }
        }
        /**
         * @en Resume the game from pause. This will resume:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * @zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
         */
        ;

        _proto.resume = function resume() {
          if (!this._paused) {
            return;
          } // Resume main loop


          this._runMainLoop();
        }
        /**
         * @en Check whether the game is paused.
         * @zh 判断游戏是否暂停。
         */
        ;

        _proto.isPaused = function isPaused() {
          return this._paused;
        }
        /**
         * @en Restart game.
         * @zh 重新开始游戏
         */
        ;

        _proto.restart = function restart() {
          var _this2 = this;

          var afterDrawPromise = new Promise(function (resolve) {
            return legacyCC.director.once(legacyCC.Director.EVENT_AFTER_DRAW, function () {
              return resolve();
            });
          });
          return afterDrawPromise.then(function () {
            for (var id in _this2._persistRootNodes) {
              _this2.removePersistRootNode(_this2._persistRootNodes[id]);
            } // Clear scene


            legacyCC.director.getScene().destroy();

            legacyCC.Object._deferredDestroy();

            legacyCC.director.reset();

            _this2.pause();

            return _this2._setRenderPipelineNShowSplash().then(function () {
              _this2.resume();

              _this2._safeEmit(Game.EVENT_RESTART);
            });
          });
        }
        /**
         * @en End game, it will close the game window
         * @zh 退出游戏
         */
        ;

        _proto.end = function end() {
          if (this._gfxDevice) {
            this._gfxDevice.destroy();

            this._gfxDevice = null;
          }

          window.close();
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object.<br>
         * This type of event should be triggered via `emit`.<br>
         * @zh
         * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。<br>
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @param once - After the first invocation, whether the callback should be unregistered.
         * @return - Just returns the incoming callback so you can save the anonymous function easier.
         */
        ;

        _proto.on = function on(type, callback, target, once) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED || this._inited && type === Game.EVENT_GAME_INITED || this._rendererInitialized && type === Game.EVENT_RENDERER_INITED) {
            callback.call(target);
          }

          return this.eventTargetOn(type, callback, target, once);
        }
        /**
         * @en
         * Register an callback of a specific event type on the game object,<br>
         * the callback will remove itself after the first time it is triggered.<br>
         * @zh
         * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         */
        ;

        _proto.once = function once(type, callback, target) {
          // Make sure EVENT_ENGINE_INITED callbacks to be invoked
          if (this._engineInited && type === Game.EVENT_ENGINE_INITED) {
            return callback.call(target);
          }

          return this.eventTargetOnce(type, callback, target);
        }
        /**
         * @en Init game with configuration object.
         * @zh 使用指定的配置初始化引擎。
         * @param config - Pass configuration object
         */
        ;

        _proto.init = function init(config) {
          var _this3 = this;

          this._initConfig(config); // Init assetManager


          if (this.config.assetOptions) {
            legacyCC.assetManager.init(this.config.assetOptions);
          }

          return this._initEngine().then(function () {
            if (!EDITOR) {
              _this3._initEvents();
            }

            if (legacyCC.director.root.dataPoolManager) {
              legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
            }

            return _this3._engineInited;
          });
        }
        /**
         * @en Run game with configuration object and onStart function.
         * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
         * @param onStart - function to be executed after game initialized
         */
        ;

        _proto.run = function run(configOrCallback, onStart) {
          var _this4 = this;

          // To compatible with older version,
          // we allow the `run(config, onstart?)` form. But it's deprecated.
          var initPromise;

          if (typeof configOrCallback !== 'function' && configOrCallback) {
            initPromise = this.init(configOrCallback);
            this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
          } else {
            this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
          }

          return Promise.resolve(initPromise).then(function () {
            // register system events
            if (!EDITOR && game.config.registerSystemEvent) {
              inputManager.registerSystemEvent();
            }

            return _this4._setRenderPipelineNShowSplash();
          });
        } //  @ Persist root node section

        /**
         * @en
         * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br>
         * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
         * @zh
         * 声明常驻根节点，该节点不会在场景切换中被销毁。<br>
         * 目标节点必须位于为层级的根节点，否则无效。
         * @param node - The node to be made persistent
         */
        ;

        _proto.addPersistRootNode = function addPersistRootNode(node) {
          if (!legacyCC.Node.isNode(node) || !node.uuid) {
            debug.warnID(3800);
            return;
          }

          var id = node.uuid;

          if (!this._persistRootNodes[id]) {
            var scene = legacyCC.director._scene;

            if (legacyCC.isValid(scene)) {
              if (!node.parent) {
                node.parent = scene;
              } else if (!(node.parent instanceof legacyCC.Scene)) {
                debug.warnID(3801);
                return;
              } else if (node.parent !== scene) {
                debug.warnID(3802);
                return;
              } else {
                node._originalSceneId = scene.uuid;
              }
            }

            this._persistRootNodes[id] = node;
            node._persistNode = true;

            legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
          }
        }
        /**
         * @en Remove a persistent root node.
         * @zh 取消常驻根节点。
         * @param node - The node to be removed from persistent node list
         */
        ;

        _proto.removePersistRootNode = function removePersistRootNode(node) {
          var id = node.uuid || '';

          if (node === this._persistRootNodes[id]) {
            delete this._persistRootNodes[id];
            node._persistNode = false;
            node._originalSceneId = '';

            legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
          }
        }
        /**
         * @en Check whether the node is a persistent root node.
         * @zh 检查节点是否是常驻根节点。
         * @param node - The node to be checked
         */
        ;

        _proto.isPersistRootNode = function isPersistRootNode(node) {
          return !!node._persistNode;
        } //  @Engine loading
        ;

        _proto._initEngine = function _initEngine() {
          var _this5 = this;

          this._initDevice();

          return Promise.resolve(legacyCC.director._init()).then(function () {
            // Log engine version
            debug.log("Cocos Creator v" + VERSION);

            _this5.emit(Game.EVENT_ENGINE_INITED);

            _this5._engineInited = true;
            legacyCC.internal.dynamicAtlasManager.enabled = !macro.CLEANUP_IMAGE_CACHE;
          });
        } // @Methods
        //  @Time ticker section
        ;

        _proto._setAnimFrame = function _setAnimFrame() {
          this._lastTime = performance.now();
          var frameRate = this.config.frameRate;
          this._frameTime = 1000 / frameRate;

          if (JSB) {
            // @ts-expect-error JSB Call
            jsb.setPreferredFramesPerSecond(frameRate);
            window.rAF = window.requestAnimationFrame;
            window.cAF = window.cancelAnimationFrame;
          } else {
            if (this._intervalId) {
              window.cAF(this._intervalId);
              this._intervalId = 0;
            }

            var rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

            if (frameRate !== 60 && frameRate !== 30) {
              // @ts-expect-error Compatibility
              window.rAF = rAF ? this._stTimeWithRAF : this._stTime;
              window.cAF = this._ctTime;
            } else {
              window.rAF = rAF || this._stTime;
              window.cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame || this._ctTime;
            }
          }
        };

        _proto._stTimeWithRAF = function _stTimeWithRAF(callback) {
          var currTime = performance.now();
          var elapseTime = Math.max(0, currTime - game._lastTime);
          var timeToCall = Math.max(0, game._frameTime - elapseTime);
          var id = window.setTimeout(function () {
            window.requestAnimationFrame(callback);
          }, timeToCall);
          game._lastTime = currTime + timeToCall;
          return id;
        };

        _proto._stTime = function _stTime(callback) {
          var currTime = performance.now();
          var elapseTime = Math.max(0, currTime - game._lastTime);
          var timeToCall = Math.max(0, game._frameTime - elapseTime);
          var id = window.setTimeout(callback, timeToCall);
          game._lastTime = currTime + timeToCall;
          return id;
        };

        _proto._ctTime = function _ctTime(id) {
          window.clearTimeout(id);
        } // Run game.
        ;

        _proto._runMainLoop = function _runMainLoop() {
          var _this6 = this;

          if (!this._inited || EDITOR && !legacyCC.GAME_VIEW) {
            return;
          }

          var config = this.config;
          var director = legacyCC.director;
          var frameRate = config.frameRate;
          debug.setDisplayStats(!!config.showFPS);
          director.startAnimation();

          var _callback2;

          if (!JSB && !RUNTIME_BASED && frameRate === 30) {
            var skip = true;

            _callback2 = function callback(time) {
              _this6._intervalId = window.rAF(_callback2);
              skip = !skip;

              if (skip) {
                return;
              }

              director.mainLoop(time);
            };
          } else {
            _callback2 = function _callback(time) {
              _this6._intervalId = window.rAF(_callback2);
              director.mainLoop(time);
            };
          }

          if (this._intervalId) {
            window.cAF(this._intervalId);
            this._intervalId = 0;
          }

          this._intervalId = window.rAF(_callback2);
          this._paused = false;
        } // @Game loading section
        ;

        _proto._initConfig = function _initConfig(config) {
          // Configs adjustment
          if (typeof config.debugMode !== 'number') {
            config.debugMode = debug.DebugMode.NONE;
          }

          config.exposeClassName = !!config.exposeClassName;

          if (typeof config.frameRate !== 'number') {
            config.frameRate = 60;
          }

          var renderMode = config.renderMode;

          if (typeof renderMode !== 'number' || renderMode > 2 || renderMode < 0) {
            config.renderMode = 0;
          }

          if (typeof config.registerSystemEvent !== 'boolean') {
            config.registerSystemEvent = true;
          }

          config.showFPS = !!config.showFPS; // Collide Map and Group List

          this.collisionMatrix = config.collisionMatrix || [];
          this.groupList = config.groupList || [];

          debug._resetDebugSetting(config.debugMode);

          this.config = config;
          this._configLoaded = true;

          this._setAnimFrame();
        };

        _proto._determineRenderType = function _determineRenderType() {
          var config = this.config;
          var userRenderMode = parseInt(config.renderMode, 10); // Determine RenderType

          this.renderType = Game.RENDER_TYPE_CANVAS;
          var supportRender = false;

          if (userRenderMode === 0) {
            if (legacyCC.sys.capabilities.opengl) {
              this.renderType = Game.RENDER_TYPE_WEBGL;
              supportRender = true;
            } else if (legacyCC.sys.capabilities.canvas) {
              this.renderType = Game.RENDER_TYPE_CANVAS;
              supportRender = true;
            }
          } else if (userRenderMode === 1 && legacyCC.sys.capabilities.canvas) {
            this.renderType = Game.RENDER_TYPE_CANVAS;
            supportRender = true;
          } else if (userRenderMode === 2 && legacyCC.sys.capabilities.opengl) {
            this.renderType = Game.RENDER_TYPE_WEBGL;
            supportRender = true;
          }

          if (!supportRender) {
            throw new Error(debug.getError(3820, userRenderMode));
          }
        };

        _proto._initDevice = function _initDevice() {
          // Avoid setup to be called twice.
          if (this._rendererInitialized) {
            return;
          }

          this.canvas = this.config.adapter.canvas;
          this.frame = this.config.adapter.frame;
          this.container = this.config.adapter.container;

          this._determineRenderType(); // WebGL context created successfully


          if (this.renderType === Game.RENDER_TYPE_WEBGL) {
            var ctors = [];

            if (JSB && window.gfx) {
              this._gfxDevice = gfx.deviceInstance;
            } else {
              var useWebGL2 = !!window.WebGL2RenderingContext;
              var userAgent = window.navigator.userAgent.toLowerCase();

              if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || system.browserType === BrowserType.UC // UC browser implementation doesn't conform to WebGL2 standard
              ) {
                  useWebGL2 = false;
                }

              if (useWebGL2 && legacyCC.WebGL2Device) {
                ctors.push(legacyCC.WebGL2Device);
              }

              if (legacyCC.WebGLDevice) {
                ctors.push(legacyCC.WebGLDevice);
              }

              var opts = new DeviceInfo(this.canvas, EDITOR || macro.ENABLE_WEBGL_ANTIALIAS, false, window.devicePixelRatio, sys.windowPixelResolution.width, sys.windowPixelResolution.height, bindingMappingInfo);

              for (var i = 0; i < ctors.length; i++) {
                this._gfxDevice = new ctors[i]();

                if (this._gfxDevice.initialize(opts)) {
                  break;
                }
              }
            }
          }

          if (!this._gfxDevice) {
            // todo fix here for wechat game
            debug.error('can not support canvas rendering in 3D');
            this.renderType = Game.RENDER_TYPE_CANVAS;
            return;
          }

          this.canvas.oncontextmenu = function () {
            return false;
          };
        };

        _proto._initEvents = function _initEvents() {
          system.onShow(this._onShow.bind(this));
          system.onHide(this._onHide.bind(this));
        };

        _proto._onHide = function _onHide() {
          this.emit(Game.EVENT_HIDE);
          this.pause();
        };

        _proto._onShow = function _onShow() {
          this.emit(Game.EVENT_SHOW);
          this.resume();
        };

        _proto._setRenderPipelineNShowSplash = function _setRenderPipelineNShowSplash() {
          var _this7 = this;

          return Promise.resolve(this._setupRenderPipeline()).then(function () {
            return Promise.resolve(_this7._showSplashScreen()).then(function () {
              _this7._inited = true;

              _this7._setAnimFrame();

              _this7._runMainLoop();

              _this7._safeEmit(Game.EVENT_GAME_INITED);

              if (_this7.onStart) {
                _this7.onStart();
              }
            });
          });
        };

        _proto._setupRenderPipeline = function _setupRenderPipeline() {
          var _this8 = this;

          var renderPipeline = this.config.renderPipeline;

          if (!renderPipeline) {
            return this._setRenderPipeline();
          }

          return new Promise(function (resolve, reject) {
            legacyCC.assetManager.loadAny(renderPipeline, function (err, asset) {
              return err || !(asset instanceof RenderPipeline) ? reject(err) : resolve(asset);
            });
          }).then(function (asset) {
            _this8._setRenderPipeline(asset);
          })["catch"](function (reason) {
            debug.warn(reason);
            debug.warn("Failed load render pipeline: " + renderPipeline + ", engine failed to initialize, will fallback to default pipeline");

            _this8._setRenderPipeline();
          });
        };

        _proto._showSplashScreen = function _showSplashScreen() {
          if (!EDITOR && !PREVIEW && legacyCC.internal.SplashScreen) {
            var splashScreen = legacyCC.internal.SplashScreen.instance;
            splashScreen.main(legacyCC.director.root);
            return new Promise(function (resolve) {
              splashScreen.setOnFinish(function () {
                return resolve();
              });
              splashScreen.loadFinish = true;
            });
          }

          return null;
        };

        _proto._setRenderPipeline = function _setRenderPipeline(rppl) {
          if (!legacyCC.director.root.setRenderPipeline(rppl)) {
            this._setRenderPipeline();
          }

          this._rendererInitialized = true;

          this._safeEmit(Game.EVENT_RENDERER_INITED);
        };

        _proto._safeEmit = function _safeEmit(event) {
          if (EDITOR) {
            try {
              this.emit(event);
            } catch (e) {
              debug.warn(e);
            }
          } else {
            this.emit(event);
          }
        };

        _createClass(Game, [{
          key: "inited",
          get:
          /**
           * @en Indicates whether the engine and the renderer has been initialized
           * @zh 引擎和渲染器是否以完成初始化
           */
          function get() {
            return this._inited;
          }
        }, {
          key: "frameTime",
          get: function get() {
            return this._frameTime;
          }
        }]);

        return Game;
      }(EventTarget));

      Game.EVENT_HIDE = 'game_on_hide';
      Game.EVENT_SHOW = 'game_on_show';
      Game.EVENT_LOW_MEMORY = 'game_on_low_memory';
      Game.EVENT_GAME_INITED = 'game_inited';
      Game.EVENT_ENGINE_INITED = 'engine_inited';
      Game.EVENT_RENDERER_INITED = 'renderer_inited';
      Game.EVENT_RESTART = 'game_on_restart';
      Game.RENDER_TYPE_CANVAS = 0;
      Game.RENDER_TYPE_WEBGL = 1;
      Game.RENDER_TYPE_OPENGL = 2;
      legacyCC.Game = Game;
      /**
       * @en
       * This is a Game instance.
       * @zh
       * 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。
       */

      _export("game", game = legacyCC.game = new Game());
    }
  };
});