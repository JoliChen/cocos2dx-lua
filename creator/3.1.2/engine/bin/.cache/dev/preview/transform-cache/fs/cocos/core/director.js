System.register("q-bundled:///fs/cocos/core/director.js", ["../../../virtual/internal%253Aconstants.js", "./assets/index.js", "./components/system.js", "./data/object.js", "./event/event-target.js", "./game.js", "./math/index.js", "./platform/event-manager/event-manager.js", "./root.js", "./scene-graph/index.js", "./scene-graph/component-scheduler.js", "./scene-graph/node-activator.js", "./scheduler.js", "./utils/index.js", "./global-exports.js", "./platform/debug.js"], function (_export, _context) {
  "use strict";

  var DEBUG, EDITOR, BUILD, SceneAsset, System, CCObject, EventTarget, Game, size, v2, eventManager, Root, Node, Scene, ComponentScheduler, NodeActivator, Scheduler, js, legacyCC, errorID, error, logID, assertID, warnID, Director, director;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      BUILD = _virtualInternal253AconstantsJs.BUILD;
    }, function (_assetsIndexJs) {
      SceneAsset = _assetsIndexJs.SceneAsset;
    }, function (_componentsSystemJs) {
      System = _componentsSystemJs.default;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
    }, function (_eventEventTargetJs) {
      EventTarget = _eventEventTargetJs.EventTarget;
    }, function (_gameJs) {
      Game = _gameJs.Game;
    }, function (_mathIndexJs) {
      size = _mathIndexJs.size;
      v2 = _mathIndexJs.v2;
    }, function (_platformEventManagerEventManagerJs) {
      eventManager = _platformEventManagerEventManagerJs.default;
    }, function (_rootJs) {
      Root = _rootJs.Root;
    }, function (_sceneGraphIndexJs) {
      Node = _sceneGraphIndexJs.Node;
      Scene = _sceneGraphIndexJs.Scene;
    }, function (_sceneGraphComponentSchedulerJs) {
      ComponentScheduler = _sceneGraphComponentSchedulerJs.ComponentScheduler;
    }, function (_sceneGraphNodeActivatorJs) {
      NodeActivator = _sceneGraphNodeActivatorJs.default;
    }, function (_schedulerJs) {
      Scheduler = _schedulerJs.Scheduler;
    }, function (_utilsIndexJs) {
      js = _utilsIndexJs.js;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      errorID = _platformDebugJs.errorID;
      error = _platformDebugJs.error;
      logID = _platformDebugJs.logID;
      assertID = _platformDebugJs.assertID;
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      // ----------------------------------------------------------------------------------------------------------------------

      /**
       * @en
       * <p>
       *    ATTENTION: USE `director` INSTEAD OF `Director`.<br/>
       *    `director` is a singleton object which manage your game's logic flow.<br/>
       *    Since the `director` is a singleton, you don't need to call any constructor or create functions,<br/>
       *    the standard way to use it is by calling:<br/>
       *      - `director.methodName();` <br/>
       *
       *    It creates and handle the main Window and manages how and when to execute the Scenes.<br/>
       *    <br/>
       *    The `director` is also responsible for:<br/>
       *      - initializing the OpenGL context<br/>
       *      - setting the OpenGL pixel format (default on is RGB565)<br/>
       *      - setting the OpenGL buffer depth (default on is 0-bit)<br/>
       *      - setting the color for clear screen (default one is BLACK)<br/>
       *      - setting the projection (default one is 3D)<br/>
       *      - setting the orientation (default one is Portrait)<br/>
       *      <br/>
       *    <br/>
       *    The `director` also sets the default OpenGL context:<br/>
       *      - GL_TEXTURE_2D is enabled<br/>
       *      - GL_VERTEX_ARRAY is enabled<br/>
       *      - GL_COLOR_ARRAY is enabled<br/>
       *      - GL_TEXTURE_COORD_ARRAY is enabled<br/>
       * </p>
       * <p>
       *   `director` also synchronizes timers with the refresh rate of the display.<br/>
       *   Features and Limitations:<br/>
       *      - Scheduled timers & drawing are synchronizes with the refresh rate of the display<br/>
       *      - Only supports animation intervals of 1/60 1/30 & 1/15<br/>
       * </p>
       *
       * @zh
       * <p>
       *     注意：用 `director` 代替 `Director`。<br/>
       *     `director` 一个管理你的游戏的逻辑流程的单例对象。<br/>
       *     由于 `director` 是一个单例，你不需要调用任何构造函数或创建函数，<br/>
       *     使用它的标准方法是通过调用：<br/>
       *       - `director.methodName();`
       *     <br/>
       *     它创建和处理主窗口并且管理什么时候执行场景。<br/>
       *     <br/>
       *     `director` 还负责：<br/>
       *      - 初始化 OpenGL 环境。<br/>
       *      - 设置OpenGL像素格式。(默认是 RGB565)<br/>
       *      - 设置OpenGL缓冲区深度 (默认是 0-bit)<br/>
       *      - 设置空白场景的颜色 (默认是 黑色)<br/>
       *      - 设置投影 (默认是 3D)<br/>
       *      - 设置方向 (默认是 Portrait)<br/>
       *    <br/>
       *    `director` 设置了 OpenGL 默认环境 <br/>
       *      - GL_TEXTURE_2D   启用。<br/>
       *      - GL_VERTEX_ARRAY 启用。<br/>
       *      - GL_COLOR_ARRAY  启用。<br/>
       *      - GL_TEXTURE_COORD_ARRAY 启用。<br/>
       * </p>
       * <p>
       *   `director` 也同步定时器与显示器的刷新速率。
       *   <br/>
       *   特点和局限性: <br/>
       *      - 将计时器 & 渲染与显示器的刷新频率同步。<br/>
       *      - 只支持动画的间隔 1/60 1/30 & 1/15。<br/>
       * </p>
       */
      _export("Director", Director = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(Director, _EventTarget);

        /**
         * @en The event which will be triggered when the singleton of Director initialized.
         * @zh Director 单例初始化时触发的事件
         * @event Director.EVENT_INIT
         */

        /**
         * @en The event which will be triggered when the singleton of Director initialized.
         * @zh Director 单例初始化时触发的事件
         */

        /**
         * @en The event which will be triggered when the singleton of Director reset.
         * @zh Director 单例重置时触发的事件
         * @event Director.EVENT_RESET
         */

        /**
         * @en The event which will be triggered when the singleton of Director reset.
         * @zh Director 单例重置时触发的事件
         */

        /**
         * @en The event which will be triggered before loading a new scene.
         * @zh 加载新场景之前所触发的事件。
         * @event Director.EVENT_BEFORE_SCENE_LOADING
         * @param {String} sceneName - The loading scene name
         */

        /**
         * @en The event which will be triggered before loading a new scene.
         * @zh 加载新场景之前所触发的事件。
         */

        /**
         * @en The event which will be triggered before launching a new scene.
         * @zh 运行新场景之前所触发的事件。
         * @event Director.EVENT_BEFORE_SCENE_LAUNCH
         * @param {String} sceneName - New scene which will be launched
         */

        /**
         * @en The event which will be triggered before launching a new scene.
         * @zh 运行新场景之前所触发的事件。
         */

        /**
         * @en The event which will be triggered after launching a new scene.
         * @zh 运行新场景之后所触发的事件。
         * @event Director.EVENT_AFTER_SCENE_LAUNCH
         * @param {String} sceneName - New scene which is launched
         */

        /**
         * @en The event which will be triggered after launching a new scene.
         * @zh 运行新场景之后所触发的事件。
         */

        /**
         * @en The event which will be triggered at the beginning of every frame.
         * @zh 每个帧的开始时所触发的事件。
         * @event Director.EVENT_BEFORE_UPDATE
         */

        /**
         * @en The event which will be triggered at the beginning of every frame.
         * @zh 每个帧的开始时所触发的事件。
         */

        /**
         * @en The event which will be triggered after engine and components update logic.
         * @zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
         * @event Director.EVENT_AFTER_UPDATE
         */

        /**
         * @en The event which will be triggered after engine and components update logic.
         * @zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
         */

        /**
         * @en The event which will be triggered before the rendering process.
         * @zh 渲染过程之前所触发的事件。
         * @event Director.EVENT_BEFORE_DRAW
         */

        /**
         * @en The event which will be triggered after the rendering process.
         * @zh 渲染过程之后所触发的事件。
         * @event Director.EVENT_AFTER_DRAW
         */

        /**
         * @en The event which will be triggered before the pipeline render commit.
         * @zh 当前渲染帧提交前所触发的事件。
         * @event Director.EVENT_BEFORE_COMMIT
         */

        /**
         * The event which will be triggered before the physics process.<br/>
         * 物理过程之前所触发的事件。
         * @event Director.EVENT_BEFORE_PHYSICS
         */

        /**
         * The event which will be triggered after the physics process.<br/>
         * 物理过程之后所触发的事件。
         * @event Director.EVENT_AFTER_PHYSICS
         */
        function Director() {
          var _this;

          _this = _EventTarget.call(this) || this;
          _this._compScheduler = void 0;
          _this._nodeActivator = void 0;
          _this._invalid = void 0;
          _this._paused = void 0;
          _this._purgeDirectorInNextLoop = void 0;
          _this._root = void 0;
          _this._loadingScene = void 0;
          _this._scene = void 0;
          _this._totalFrames = void 0;
          _this._lastUpdate = void 0;
          _this._deltaTime = void 0;
          _this._startTime = void 0;
          _this._scheduler = void 0;
          _this._systems = void 0;
          _this._invalid = false; // paused?

          _this._paused = false; // purge?

          _this._purgeDirectorInNextLoop = false; // root

          _this._root = null; // scenes

          _this._loadingScene = '';
          _this._scene = null; // FPS

          _this._totalFrames = 0;
          _this._lastUpdate = 0;
          _this._deltaTime = 0.0;
          _this._startTime = 0.0; // Scheduler for user registration update

          _this._scheduler = new Scheduler(); // Scheduler for life-cycle methods in component

          _this._compScheduler = new ComponentScheduler(); // Node activator

          _this._nodeActivator = new NodeActivator();
          _this._systems = [];
          legacyCC.game.once(Game.EVENT_RENDERER_INITED, _this._initOnRendererInitialized, _assertThisInitialized(_this));
          return _this;
        }
        /**
         * @en Calculates delta time since last time it was called, the result is saved to an internal property.
         * @zh 计算从上一帧到现在的时间间隔，结果保存在私有属性中
         */


        var _proto = Director.prototype;

        _proto.calculateDeltaTime = function calculateDeltaTime(now) {
          if (!now) now = performance.now();
          this._deltaTime = now > this._lastUpdate ? (now - this._lastUpdate) / 1000 : 0;

          if (DEBUG && this._deltaTime > 1) {
            this._deltaTime = 1 / 60.0;
          }

          this._lastUpdate = now;
        }
        /**
         * @en
         * Converts a view coordinate to an WebGL coordinate<br/>
         * Useful to convert (multi) touches coordinates to the current layout (portrait or landscape)<br/>
         * Implementation can be found in directorWebGL.
         * @zh 将触摸点的屏幕坐标转换为 WebGL View 下的坐标。
         * @deprecated since v2.0
         */
        ;

        _proto.convertToGL = function convertToGL(uiPoint) {
          var container = legacyCC.game.container;
          var view = legacyCC.view;
          var box = container.getBoundingClientRect();
          var left = box.left + window.pageXOffset - container.clientLeft;
          var top = box.top + window.pageYOffset - container.clientTop;
          var x = view._devicePixelRatio * (uiPoint.x - left);
          var y = view._devicePixelRatio * (top + box.height - uiPoint.y);
          return view._isRotated ? v2(view._viewportRect.width - y, x) : v2(x, y);
        }
        /**
         * @en
         * Converts an OpenGL coordinate to a view coordinate<br/>
         * Useful to convert node points to window points for calls such as glScissor<br/>
         * Implementation can be found in directorWebGL.
         * @zh 将触摸点的 WebGL View 坐标转换为屏幕坐标。
         * @deprecated since v2.0
         */
        ;

        _proto.convertToUI = function convertToUI(glPoint) {
          var container = legacyCC.game.container;
          var view = legacyCC.view;
          var box = container.getBoundingClientRect();
          var left = box.left + window.pageXOffset - container.clientLeft;
          var top = box.top + window.pageYOffset - container.clientTop;
          var uiPoint = v2(0, 0);

          if (view._isRotated) {
            uiPoint.x = left + glPoint.y / view._devicePixelRatio;
            uiPoint.y = top + box.height - (view._viewportRect.width - glPoint.x) / view._devicePixelRatio;
          } else {
            uiPoint.x = left + glPoint.x * view._devicePixelRatio;
            uiPoint.y = top + box.height - glPoint.y * view._devicePixelRatio;
          }

          return uiPoint;
        }
        /**
         * @en End the life of director in the next frame
         * @zh 执行完当前帧后停止 director 的执行
         */
        ;

        _proto.end = function end() {
          this._purgeDirectorInNextLoop = true;
        }
        /**
         * @en
         * Returns the size of the WebGL view in points.<br/>
         * It takes into account any possible rotation (device orientation) of the window.
         * @zh 获取视图的大小，以点为单位。
         * @deprecated since v2.0
         */
        ;

        _proto.getWinSize = function getWinSize() {
          return size(legacyCC.winSize);
        }
        /**
         * @en
         * Returns the size of the OpenGL view in pixels.<br/>
         * It takes into account any possible rotation (device orientation) of the window.<br/>
         * On Mac winSize and winSizeInPixels return the same value.
         * (The pixel here refers to the resource resolution. If you want to get the physics resolution of device, you need to use `view.getFrameSize()`)
         * @zh
         * 获取视图大小，以像素为单位（这里的像素指的是资源分辨率。
         * 如果要获取屏幕物理分辨率，需要用 `view.getFrameSize()`）
         * @deprecated since v2.0
         */
        ;

        _proto.getWinSizeInPixels = function getWinSizeInPixels() {
          return size(legacyCC.winSize);
        }
        /**
         * @en Pause the director's ticker, only involve the game logic execution.<br>
         * It won't pause the rendering process nor the event manager.<br>
         * If you want to pause the entire game including rendering, audio and event,<br>
         * please use `game.pause`.
         * @zh 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。<br>
         * 如果想要更彻底得暂停游戏，包含渲染，音频和事件，请使用 `game.pause` 。
         */
        ;

        _proto.pause = function pause() {
          if (this._paused) {
            return;
          }

          this._paused = true;
        }
        /**
         * @en Removes cached all cocos2d cached data.
         * @zh 删除cocos2d所有的缓存数据
         * @deprecated since v2.0
         */
        ;

        _proto.purgeCachedData = function purgeCachedData() {
          legacyCC.assetManager.releaseAll();
        }
        /**
         * @en Purge the `director` itself, including unschedule all schedule,<br>
         * remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
         * @zh 清除 `director` 本身，包括停止所有的计时器，<br>
         * 移除所有的事件监听器，清理并退出当前运行的场景，停止所有动画，清理缓存数据。
         */
        ;

        _proto.purgeDirector = function purgeDirector() {
          // cleanup scheduler
          this._scheduler.unscheduleAll();

          this._compScheduler.unscheduleAll();

          this._nodeActivator.reset(); // Disable event dispatching


          if (eventManager) {
            eventManager.setEnabled(false);
          }

          if (!EDITOR) {
            if (legacyCC.isValid(this._scene)) {
              this._scene.destroy();
            }

            this._scene = null;
          }

          this.stopAnimation(); // Clear all caches

          legacyCC.assetManager.releaseAll();
        }
        /**
         * @en Reset the director, can be used to restart the director after purge
         * @zh 重置此 Director，可用于在清除后重启 Director。
         */
        ;

        _proto.reset = function reset() {
          this.purgeDirector();
          this.emit(Director.EVENT_RESET);

          if (eventManager) {
            eventManager.setEnabled(true);
          }

          this.startAnimation();
        }
        /**
         * @en
         * Run a scene. Replaces the running scene with a new one or enter the first scene.<br>
         * The new scene will be launched immediately.
         * @zh 运行指定场景。将正在运行的场景替换为（或重入为）新场景。新场景将立即启动。
         * @param scene - The need run scene.
         * @param onBeforeLoadScene - The function invoked at the scene before loading.
         * @param onLaunched - The function invoked at the scene after launch.
         */
        ;

        _proto.runSceneImmediate = function runSceneImmediate(scene, onBeforeLoadScene, onLaunched) {
          if (scene instanceof SceneAsset) scene = scene.scene;
          assertID(scene instanceof Scene, 1216);

          if (BUILD && DEBUG) {
            console.time('InitScene');
          } // @ts-expect-error run private method


          scene._load(); // ensure scene initialized


          if (BUILD && DEBUG) {
            console.timeEnd('InitScene');
          } // Re-attach or replace persist nodes


          if (BUILD && DEBUG) {
            console.time('AttachPersist');
          }

          var persistNodeList = Object.keys(legacyCC.game._persistRootNodes).map(function (x) {
            return legacyCC.game._persistRootNodes[x];
          });

          for (var i = 0; i < persistNodeList.length; i++) {
            var node = persistNodeList[i];
            node.emit(legacyCC.Node.SCENE_CHANGED_FOR_PERSISTS, scene.renderScene);
            var existNode = scene.uuid === node._originalSceneId && scene.getChildByUuid(node.uuid);

            if (existNode) {
              // scene also contains the persist node, select the old one
              var index = existNode.getSiblingIndex();

              existNode._destroyImmediate();

              scene.insertChild(node, index);
            } else {
              // @ts-expect-error insert to new scene
              node.parent = scene;
            }
          }

          if (BUILD && DEBUG) {
            console.timeEnd('AttachPersist');
          }

          var oldScene = this._scene; // unload scene

          if (BUILD && DEBUG) {
            console.time('Destroy');
          }

          if (legacyCC.isValid(oldScene)) {
            oldScene.destroy();
          }

          if (!EDITOR) {
            // auto release assets
            if (BUILD && DEBUG) {
              console.time('AutoRelease');
            }

            legacyCC.assetManager._releaseManager._autoRelease(oldScene, scene, legacyCC.game._persistRootNodes);

            if (BUILD && DEBUG) {
              console.timeEnd('AutoRelease');
            }
          }

          this._scene = null; // purge destroyed nodes belongs to old scene

          CCObject._deferredDestroy();

          if (BUILD && DEBUG) {
            console.timeEnd('Destroy');
          }

          if (onBeforeLoadScene) {
            onBeforeLoadScene();
          }

          this.emit(legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, scene); // Run an Entity Scene

          this._scene = scene;

          if (BUILD && DEBUG) {
            console.time('Activate');
          } // @ts-expect-error run private method


          scene._activate();

          if (BUILD && DEBUG) {
            console.timeEnd('Activate');
          } // start scene


          if (this._root) {
            this._root.resetCumulativeTime();
          }

          this.startAnimation();

          if (onLaunched) {
            onLaunched(null, scene);
          }

          this.emit(legacyCC.Director.EVENT_AFTER_SCENE_LAUNCH, scene);
        }
        /**
         * @en
         * Run a scene. Replaces the running scene with a new one or enter the first scene.<br>
         * The new scene will be launched at the end of the current frame.<br>
         * @zh 运行指定场景。
         * @param scene - The need run scene.
         * @param onBeforeLoadScene - The function invoked at the scene before loading.
         * @param onLaunched - The function invoked at the scene after launch.
         * @private
         */
        ;

        _proto.runScene = function runScene(scene, onBeforeLoadScene, onLaunched) {
          var _this2 = this;

          if (scene instanceof SceneAsset) scene = scene.scene;
          assertID(scene, 1205);
          assertID(scene instanceof Scene, 1216); // ensure scene initialized
          // @ts-expect-error run private method

          scene._load(); // Delay run / replace scene to the end of the frame


          this.once(legacyCC.Director.EVENT_AFTER_DRAW, function () {
            _this2.runSceneImmediate(scene, onBeforeLoadScene, onLaunched);
          });
        }
        /**
         * @en Loads the scene by its name.
         * @zh 通过场景名称进行加载场景。
         *
         * @param sceneName - The name of the scene to load.
         * @param onLaunched - callback, will be called after scene launched.
         * @return if error, return false
         */
        ;

        _proto.loadScene = function loadScene(sceneName, onLaunched, onUnloaded) {
          var _this3 = this;

          if (this._loadingScene) {
            warnID(1208, sceneName, this._loadingScene);
            return false;
          }

          var bundle = legacyCC.assetManager.bundles.find(function (bundle) {
            return !!bundle.getSceneInfo(sceneName);
          });

          if (bundle) {
            this.emit(legacyCC.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
            this._loadingScene = sceneName;
            console.time("LoadScene " + sceneName);
            bundle.loadScene(sceneName, function (err, scene) {
              console.timeEnd("LoadScene " + sceneName);
              _this3._loadingScene = '';

              if (err) {
                error(err);

                if (onLaunched) {
                  onLaunched(err);
                }
              } else {
                _this3.runSceneImmediate(scene, onUnloaded, onLaunched);
              }
            });
            return true;
          } else {
            errorID(1209, sceneName);
            return false;
          }
        }
        /**
         * @en
         * Pre-loads the scene to reduces loading time. You can call this method at any time you want.<br>
         * After calling this method, you still need to launch the scene by `director.loadScene`.<br>
         * It will be totally fine to call `director.loadScene` at any time even if the preloading is not<br>
         * yet finished, the scene will be launched after loaded automatically.
         * @zh 预加载场景，你可以在任何时候调用这个方法。
         * 调用完后，你仍然需要通过 `director.loadScene` 来启动场景，因为这个方法不会执行场景加载操作。<br>
         * 就算预加载还没完成，你也可以直接调用 `director.loadScene`，加载完成后场景就会启动。
         * @param sceneName 场景名称。
         * @param onLoaded 加载回调。
         */
        ;

        _proto.preloadScene = function preloadScene(sceneName, onProgress, onLoaded) {
          var bundle = legacyCC.assetManager.bundles.find(function (bundle) {
            return !!bundle.getSceneInfo(sceneName);
          });

          if (bundle) {
            bundle.preloadScene(sceneName, null, onProgress, onLoaded);
          } else {
            var err = "Can not preload the scene \"" + sceneName + "\" because it is not in the build settings.";

            if (onLoaded) {
              onLoaded(new Error(err));
            }

            error("preloadScene: " + err);
          }
        }
        /**
         * @en Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
         * @zh 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生。
         */
        ;

        _proto.resume = function resume() {
          if (!this._paused) {
            return;
          }

          this._lastUpdate = performance.now();

          if (!this._lastUpdate) {
            logID(1200);
          }

          this._paused = false;
          this._deltaTime = 0;
        }
        /**
         * @en
         * Enables or disables WebGL depth test.<br>
         * Implementation can be found in directorCanvas.js/directorWebGL.js
         * @zh 启用/禁用深度测试（在 Canvas 渲染模式下不会生效）。
         * @deprecated since v2.0
         */
        ;

        _proto.setDepthTest = function setDepthTest(value) {
          if (!legacyCC.Camera.main) {
            return;
          }

          legacyCC.Camera.main.depth = !!value;
        }
        /**
         * @en
         * Set color for clear screen.<br>
         * (Implementation can be found in directorCanvas.js/directorWebGL.js)
         * @zh
         * 设置场景的默认擦除颜色。<br>
         * 支持全透明，但不支持透明度为中间值。要支持全透明需手工开启 `macro.ENABLE_TRANSPARENT_CANVAS`。
         * @deprecated since v2.0
         */
        ;

        _proto.setClearColor = function setClearColor(clearColor) {
          if (!legacyCC.Camera.main) {
            return;
          }

          legacyCC.Camera.main.backgroundColor = clearColor;
        };

        /**
         * @en Returns current logic Scene.
         * @zh 获取当前逻辑场景。
         * @deprecated Since v2.0.
         */
        _proto.getRunningScene = function getRunningScene() {
          return this._scene;
        }
        /**
         * @en Returns current logic Scene.
         * @zh 获取当前逻辑场景。
         * @example
         * ```
         * import { director } from 'cc';
         * // This will help you to get the Canvas node in scene
         * director.getScene().getChildByName('Canvas');
         * ```
         */
        ;

        _proto.getScene = function getScene() {
          return this._scene;
        }
        /**
         * @en Returns the FPS value. Please use [[Game.setFrameRate]] to control animation interval.
         * @zh 获取单位帧执行时间。请使用 [[Game.setFrameRate]] 来控制游戏帧率。
         * @deprecated since v2.0.
         */
        ;

        _proto.getAnimationInterval = function getAnimationInterval() {
          return 1000 / legacyCC.game.getFrameRate();
        }
        /**
         * @en Sets animation interval, this doesn't control the main loop.<br>
         * To control the game's frame rate overall, please use `game.setFrameRate`
         * @zh 设置动画间隔，这不控制主循环。<br>
         * 要控制游戏的帧速率，请使用 `game.setFrameRate`
         * @deprecated since v2.0
         * @param value - The animation interval desired.
         */
        ;

        _proto.setAnimationInterval = function setAnimationInterval(value) {
          legacyCC.game.setFrameRate(Math.round(1000 / value));
        }
        /**
         * @en Returns the delta time since last frame.
         * @zh 获取上一帧的增量时间。
         */
        ;

        _proto.getDeltaTime = function getDeltaTime() {
          return this._deltaTime;
        }
        /**
         * @en Returns the total passed time since game start, unit: ms
         * @zh 获取从游戏开始到现在总共经过的时间，单位为 ms
         */
        ;

        _proto.getTotalTime = function getTotalTime() {
          return performance.now() - this._startTime;
        }
        /**
         * @en Returns the current time.
         * @zh 获取当前帧的时间。
         */
        ;

        _proto.getCurrentTime = function getCurrentTime() {
          return this._lastUpdate;
        }
        /**
         * @en Returns how many frames were called since the director started.
         * @zh 获取 director 启动以来游戏运行的总帧数。
         */
        ;

        _proto.getTotalFrames = function getTotalFrames() {
          return this._totalFrames;
        }
        /**
         * @en Returns whether or not the Director is paused.
         * @zh 是否处于暂停状态。
         */
        ;

        _proto.isPaused = function isPaused() {
          return this._paused;
        }
        /**
         * @en Returns the scheduler associated with this director.
         * @zh 获取和 director 相关联的调度器。
         */
        ;

        _proto.getScheduler = function getScheduler() {
          return this._scheduler;
        }
        /**
         * @en Sets the scheduler associated with this director.
         * @zh 设置和 director 相关联的调度器。
         */
        ;

        _proto.setScheduler = function setScheduler(scheduler) {
          if (this._scheduler !== scheduler) {
            this.unregisterSystem(this._scheduler);
            this._scheduler = scheduler;
            this.registerSystem(Scheduler.ID, scheduler, 200);
          }
        }
        /**
         * @en Register a system.
         * @zh 注册一个系统。
         */
        ;

        _proto.registerSystem = function registerSystem(name, sys, priority) {
          sys.id = name;
          sys.priority = priority;
          sys.init();

          this._systems.push(sys);

          this._systems.sort(System.sortByPriority);
        };

        _proto.unregisterSystem = function unregisterSystem(sys) {
          js.array.fastRemove(this._systems, sys);

          this._systems.sort(System.sortByPriority);
        }
        /**
         * @en get a system.
         * @zh 获取一个 system。
         */
        ;

        _proto.getSystem = function getSystem(name) {
          return this._systems.find(function (sys) {
            return sys.id === name;
          });
        }
        /**
         * @en Returns the `AnimationManager` associated with this director. Please use getSystem(AnimationManager.ID)
         * @zh 获取和 director 相关联的 `AnimationManager`（动画管理器）。请使用 getSystem(AnimationManager.ID) 来替代
         * @deprecated
         */
        ;

        _proto.getAnimationManager = function getAnimationManager() {
          return this.getSystem(legacyCC.AnimationManager.ID);
        } // Loop management

        /**
         * @en Starts Animation
         * @zh 开始动画
         */
        ;

        _proto.startAnimation = function startAnimation() {
          this._invalid = false;
          this._lastUpdate = performance.now();
        }
        /**
         * @en Stops animation
         * @zh 停止动画
         */
        ;

        _proto.stopAnimation = function stopAnimation() {
          this._invalid = true;
        }
        /**
         * @en Run main loop of director
         * @zh 运行主循环
         */
        ;

        _proto.mainLoop = function mainLoop(time) {
          if (this._purgeDirectorInNextLoop) {
            this._purgeDirectorInNextLoop = false;
            this.purgeDirector();
          } else if (!this._invalid) {
            // calculate "global" dt
            if (EDITOR && !legacyCC.GAME_VIEW) {
              this._deltaTime = time;
            } else {
              this.calculateDeltaTime(time);
            }

            var dt = this._deltaTime; // Update

            if (!this._paused) {
              this.emit(Director.EVENT_BEFORE_UPDATE); // Call start for new added components

              this._compScheduler.startPhase(); // Update for components


              this._compScheduler.updatePhase(dt); // Update systems


              for (var i = 0; i < this._systems.length; ++i) {
                this._systems[i].update(dt);
              } // Late update for components


              this._compScheduler.lateUpdatePhase(dt); // User can use this event to do things after update


              this.emit(Director.EVENT_AFTER_UPDATE); // Destroy entities that have been removed recently

              CCObject._deferredDestroy(); // Post update systems


              for (var _i = 0; _i < this._systems.length; ++_i) {
                this._systems[_i].postUpdate(dt);
              }
            }

            this.emit(Director.EVENT_BEFORE_DRAW);

            this._root.frameMove(this._deltaTime);

            this.emit(Director.EVENT_AFTER_DRAW);
            eventManager.frameUpdateListeners();
            Node.resetHasChangedFlags();
            Node.clearNodeArray();
            this._totalFrames++;
          }
        };

        _proto._initOnRendererInitialized = function _initOnRendererInitialized() {
          this._totalFrames = 0;
          this._lastUpdate = performance.now();
          this._startTime = this._lastUpdate;
          this._paused = false;
          this._purgeDirectorInNextLoop = false; // Event manager

          if (eventManager) {
            eventManager.setEnabled(true);
          } // Scheduler
          // TODO: have a solid organization of priority and expose to user


          this.registerSystem(Scheduler.ID, this._scheduler, 200);
          this.emit(Director.EVENT_INIT);
        };

        _proto._init = function _init() {
          this._root = new Root(legacyCC.game._gfxDevice);
          var rootInfo = {};
          return this._root.initialize(rootInfo)["catch"](function (error) {
            errorID(1217);
            return Promise.reject(error);
          });
        };

        _createClass(Director, [{
          key: "root",
          get: function get() {
            return this._root;
          }
        }]);

        return Director;
      }(EventTarget));

      Director.EVENT_INIT = 'director_init';
      Director.EVENT_RESET = 'director_reset';
      Director.EVENT_BEFORE_SCENE_LOADING = 'director_before_scene_loading';
      Director.EVENT_BEFORE_SCENE_LAUNCH = 'director_before_scene_launch';
      Director.EVENT_AFTER_SCENE_LAUNCH = 'director_after_scene_launch';
      Director.EVENT_BEFORE_UPDATE = 'director_before_update';
      Director.EVENT_AFTER_UPDATE = 'director_after_update';
      Director.EVENT_BEFORE_DRAW = 'director_before_draw';
      Director.EVENT_AFTER_DRAW = 'director_after_draw';
      Director.EVENT_BEFORE_COMMIT = 'director_before_commit';
      Director.EVENT_BEFORE_PHYSICS = 'director_before_physics';
      Director.EVENT_AFTER_PHYSICS = 'director_after_physics';
      Director.instance = void 0;
      legacyCC.Director = Director;
      /**
       * 导演类。
       */

      _export("director", director = Director.instance = legacyCC.director = new Director());
    }
  };
});