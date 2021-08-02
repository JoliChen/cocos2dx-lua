"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.director = exports.Director = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("./assets/index.js");

var _system = _interopRequireDefault(require("./components/system.js"));

var _object = require("./data/object.js");

var _eventTarget = require("./event/event-target.js");

var _game = require("./game.js");

var _index2 = require("./math/index.js");

var _eventManager = _interopRequireDefault(require("./platform/event-manager/event-manager.js"));

var _root = require("./root.js");

var _index3 = require("./scene-graph/index.js");

var _componentScheduler = require("./scene-graph/component-scheduler.js");

var _nodeActivator = _interopRequireDefault(require("./scene-graph/node-activator.js"));

var _scheduler = require("./scheduler.js");

var _index4 = require("./utils/index.js");

var _globalExports = require("./global-exports.js");

var _debug = require("./platform/debug.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/* spell-checker:words COORD, Quesada, INITED, Renerer */

/**
 * @packageDocumentation
 * @module core
 */
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
class Director extends _eventTarget.EventTarget {
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
  constructor() {
    super();
    this._compScheduler = void 0;
    this._nodeActivator = void 0;
    this._invalid = void 0;
    this._paused = void 0;
    this._purgeDirectorInNextLoop = void 0;
    this._root = void 0;
    this._loadingScene = void 0;
    this._scene = void 0;
    this._totalFrames = void 0;
    this._lastUpdate = void 0;
    this._deltaTime = void 0;
    this._startTime = void 0;
    this._scheduler = void 0;
    this._systems = void 0;
    this._invalid = false; // paused?

    this._paused = false; // purge?

    this._purgeDirectorInNextLoop = false; // root

    this._root = null; // scenes

    this._loadingScene = '';
    this._scene = null; // FPS

    this._totalFrames = 0;
    this._lastUpdate = 0;
    this._deltaTime = 0.0;
    this._startTime = 0.0; // Scheduler for user registration update

    this._scheduler = new _scheduler.Scheduler(); // Scheduler for life-cycle methods in component

    this._compScheduler = new _componentScheduler.ComponentScheduler(); // Node activator

    this._nodeActivator = new _nodeActivator.default();
    this._systems = [];

    _globalExports.legacyCC.game.once(_game.Game.EVENT_RENDERER_INITED, this._initOnRendererInitialized, this);
  }
  /**
   * @en Calculates delta time since last time it was called, the result is saved to an internal property.
   * @zh 计算从上一帧到现在的时间间隔，结果保存在私有属性中
   */


  calculateDeltaTime(now) {
    if (!now) now = performance.now();
    this._deltaTime = now > this._lastUpdate ? (now - this._lastUpdate) / 1000 : 0;

    if (_internal253Aconstants.DEBUG && this._deltaTime > 1) {
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


  convertToGL(uiPoint) {
    const container = _globalExports.legacyCC.game.container;
    const view = _globalExports.legacyCC.view;
    const box = container.getBoundingClientRect();
    const left = box.left + window.pageXOffset - container.clientLeft;
    const top = box.top + window.pageYOffset - container.clientTop;
    const x = view._devicePixelRatio * (uiPoint.x - left);
    const y = view._devicePixelRatio * (top + box.height - uiPoint.y);
    return view._isRotated ? (0, _index2.v2)(view._viewportRect.width - y, x) : (0, _index2.v2)(x, y);
  }
  /**
   * @en
   * Converts an OpenGL coordinate to a view coordinate<br/>
   * Useful to convert node points to window points for calls such as glScissor<br/>
   * Implementation can be found in directorWebGL.
   * @zh 将触摸点的 WebGL View 坐标转换为屏幕坐标。
   * @deprecated since v2.0
   */


  convertToUI(glPoint) {
    const container = _globalExports.legacyCC.game.container;
    const view = _globalExports.legacyCC.view;
    const box = container.getBoundingClientRect();
    const left = box.left + window.pageXOffset - container.clientLeft;
    const top = box.top + window.pageYOffset - container.clientTop;
    const uiPoint = (0, _index2.v2)(0, 0);

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


  end() {
    this._purgeDirectorInNextLoop = true;
  }
  /**
   * @en
   * Returns the size of the WebGL view in points.<br/>
   * It takes into account any possible rotation (device orientation) of the window.
   * @zh 获取视图的大小，以点为单位。
   * @deprecated since v2.0
   */


  getWinSize() {
    return (0, _index2.size)(_globalExports.legacyCC.winSize);
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


  getWinSizeInPixels() {
    return (0, _index2.size)(_globalExports.legacyCC.winSize);
  }
  /**
   * @en Pause the director's ticker, only involve the game logic execution.<br>
   * It won't pause the rendering process nor the event manager.<br>
   * If you want to pause the entire game including rendering, audio and event,<br>
   * please use `game.pause`.
   * @zh 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。<br>
   * 如果想要更彻底得暂停游戏，包含渲染，音频和事件，请使用 `game.pause` 。
   */


  pause() {
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


  purgeCachedData() {
    _globalExports.legacyCC.assetManager.releaseAll();
  }
  /**
   * @en Purge the `director` itself, including unschedule all schedule,<br>
   * remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
   * @zh 清除 `director` 本身，包括停止所有的计时器，<br>
   * 移除所有的事件监听器，清理并退出当前运行的场景，停止所有动画，清理缓存数据。
   */


  purgeDirector() {
    // cleanup scheduler
    this._scheduler.unscheduleAll();

    this._compScheduler.unscheduleAll();

    this._nodeActivator.reset(); // Disable event dispatching


    if (_eventManager.default) {
      _eventManager.default.setEnabled(false);
    }

    if (!_internal253Aconstants.EDITOR) {
      if (_globalExports.legacyCC.isValid(this._scene)) {
        this._scene.destroy();
      }

      this._scene = null;
    }

    this.stopAnimation(); // Clear all caches

    _globalExports.legacyCC.assetManager.releaseAll();
  }
  /**
   * @en Reset the director, can be used to restart the director after purge
   * @zh 重置此 Director，可用于在清除后重启 Director。
   */


  reset() {
    this.purgeDirector();
    this.emit(Director.EVENT_RESET);

    if (_eventManager.default) {
      _eventManager.default.setEnabled(true);
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


  runSceneImmediate(scene, onBeforeLoadScene, onLaunched) {
    if (scene instanceof _index.SceneAsset) scene = scene.scene;
    (0, _debug.assertID)(scene instanceof _index3.Scene, 1216);

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.time('InitScene');
    } // @ts-expect-error run private method


    scene._load(); // ensure scene initialized


    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.timeEnd('InitScene');
    } // Re-attach or replace persist nodes


    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.time('AttachPersist');
    }

    const persistNodeList = Object.keys(_globalExports.legacyCC.game._persistRootNodes).map(x => _globalExports.legacyCC.game._persistRootNodes[x]);

    for (let i = 0; i < persistNodeList.length; i++) {
      const node = persistNodeList[i];
      node.emit(_globalExports.legacyCC.Node.SCENE_CHANGED_FOR_PERSISTS, scene.renderScene);
      const existNode = scene.uuid === node._originalSceneId && scene.getChildByUuid(node.uuid);

      if (existNode) {
        // scene also contains the persist node, select the old one
        const index = existNode.getSiblingIndex();

        existNode._destroyImmediate();

        scene.insertChild(node, index);
      } else {
        // @ts-expect-error insert to new scene
        node.parent = scene;
      }
    }

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.timeEnd('AttachPersist');
    }

    const oldScene = this._scene; // unload scene

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.time('Destroy');
    }

    if (_globalExports.legacyCC.isValid(oldScene)) {
      oldScene.destroy();
    }

    if (!_internal253Aconstants.EDITOR) {
      // auto release assets
      if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
        console.time('AutoRelease');
      }

      _globalExports.legacyCC.assetManager._releaseManager._autoRelease(oldScene, scene, _globalExports.legacyCC.game._persistRootNodes);

      if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
        console.timeEnd('AutoRelease');
      }
    }

    this._scene = null; // purge destroyed nodes belongs to old scene

    _object.CCObject._deferredDestroy();

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.timeEnd('Destroy');
    }

    if (onBeforeLoadScene) {
      onBeforeLoadScene();
    }

    this.emit(_globalExports.legacyCC.Director.EVENT_BEFORE_SCENE_LAUNCH, scene); // Run an Entity Scene

    this._scene = scene;

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.time('Activate');
    } // @ts-expect-error run private method


    scene._activate();

    if (_internal253Aconstants.BUILD && _internal253Aconstants.DEBUG) {
      console.timeEnd('Activate');
    } // start scene


    if (this._root) {
      this._root.resetCumulativeTime();
    }

    this.startAnimation();

    if (onLaunched) {
      onLaunched(null, scene);
    }

    this.emit(_globalExports.legacyCC.Director.EVENT_AFTER_SCENE_LAUNCH, scene);
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


  runScene(scene, onBeforeLoadScene, onLaunched) {
    if (scene instanceof _index.SceneAsset) scene = scene.scene;
    (0, _debug.assertID)(scene, 1205);
    (0, _debug.assertID)(scene instanceof _index3.Scene, 1216); // ensure scene initialized
    // @ts-expect-error run private method

    scene._load(); // Delay run / replace scene to the end of the frame


    this.once(_globalExports.legacyCC.Director.EVENT_AFTER_DRAW, () => {
      this.runSceneImmediate(scene, onBeforeLoadScene, onLaunched);
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


  loadScene(sceneName, onLaunched, onUnloaded) {
    if (this._loadingScene) {
      (0, _debug.warnID)(1208, sceneName, this._loadingScene);
      return false;
    }

    const bundle = _globalExports.legacyCC.assetManager.bundles.find(bundle => !!bundle.getSceneInfo(sceneName));

    if (bundle) {
      this.emit(_globalExports.legacyCC.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
      this._loadingScene = sceneName;
      console.time(`LoadScene ${sceneName}`);
      bundle.loadScene(sceneName, (err, scene) => {
        console.timeEnd(`LoadScene ${sceneName}`);
        this._loadingScene = '';

        if (err) {
          (0, _debug.error)(err);

          if (onLaunched) {
            onLaunched(err);
          }
        } else {
          this.runSceneImmediate(scene, onUnloaded, onLaunched);
        }
      });
      return true;
    } else {
      (0, _debug.errorID)(1209, sceneName);
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


  preloadScene(sceneName, onProgress, onLoaded) {
    const bundle = _globalExports.legacyCC.assetManager.bundles.find(bundle => !!bundle.getSceneInfo(sceneName));

    if (bundle) {
      bundle.preloadScene(sceneName, null, onProgress, onLoaded);
    } else {
      const err = `Can not preload the scene "${sceneName}" because it is not in the build settings.`;

      if (onLoaded) {
        onLoaded(new Error(err));
      }

      (0, _debug.error)(`preloadScene: ${err}`);
    }
  }
  /**
   * @en Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
   * @zh 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生。
   */


  resume() {
    if (!this._paused) {
      return;
    }

    this._lastUpdate = performance.now();

    if (!this._lastUpdate) {
      (0, _debug.logID)(1200);
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


  setDepthTest(value) {
    if (!_globalExports.legacyCC.Camera.main) {
      return;
    }

    _globalExports.legacyCC.Camera.main.depth = !!value;
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


  setClearColor(clearColor) {
    if (!_globalExports.legacyCC.Camera.main) {
      return;
    }

    _globalExports.legacyCC.Camera.main.backgroundColor = clearColor;
  }

  get root() {
    return this._root;
  }
  /**
   * @en Returns current logic Scene.
   * @zh 获取当前逻辑场景。
   * @deprecated Since v2.0.
   */


  getRunningScene() {
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


  getScene() {
    return this._scene;
  }
  /**
   * @en Returns the FPS value. Please use [[Game.setFrameRate]] to control animation interval.
   * @zh 获取单位帧执行时间。请使用 [[Game.setFrameRate]] 来控制游戏帧率。
   * @deprecated since v2.0.
   */


  getAnimationInterval() {
    return 1000 / _globalExports.legacyCC.game.getFrameRate();
  }
  /**
   * @en Sets animation interval, this doesn't control the main loop.<br>
   * To control the game's frame rate overall, please use `game.setFrameRate`
   * @zh 设置动画间隔，这不控制主循环。<br>
   * 要控制游戏的帧速率，请使用 `game.setFrameRate`
   * @deprecated since v2.0
   * @param value - The animation interval desired.
   */


  setAnimationInterval(value) {
    _globalExports.legacyCC.game.setFrameRate(Math.round(1000 / value));
  }
  /**
   * @en Returns the delta time since last frame.
   * @zh 获取上一帧的增量时间。
   */


  getDeltaTime() {
    return this._deltaTime;
  }
  /**
   * @en Returns the total passed time since game start, unit: ms
   * @zh 获取从游戏开始到现在总共经过的时间，单位为 ms
   */


  getTotalTime() {
    return performance.now() - this._startTime;
  }
  /**
   * @en Returns the current time.
   * @zh 获取当前帧的时间。
   */


  getCurrentTime() {
    return this._lastUpdate;
  }
  /**
   * @en Returns how many frames were called since the director started.
   * @zh 获取 director 启动以来游戏运行的总帧数。
   */


  getTotalFrames() {
    return this._totalFrames;
  }
  /**
   * @en Returns whether or not the Director is paused.
   * @zh 是否处于暂停状态。
   */


  isPaused() {
    return this._paused;
  }
  /**
   * @en Returns the scheduler associated with this director.
   * @zh 获取和 director 相关联的调度器。
   */


  getScheduler() {
    return this._scheduler;
  }
  /**
   * @en Sets the scheduler associated with this director.
   * @zh 设置和 director 相关联的调度器。
   */


  setScheduler(scheduler) {
    if (this._scheduler !== scheduler) {
      this.unregisterSystem(this._scheduler);
      this._scheduler = scheduler;
      this.registerSystem(_scheduler.Scheduler.ID, scheduler, 200);
    }
  }
  /**
   * @en Register a system.
   * @zh 注册一个系统。
   */


  registerSystem(name, sys, priority) {
    sys.id = name;
    sys.priority = priority;
    sys.init();

    this._systems.push(sys);

    this._systems.sort(_system.default.sortByPriority);
  }

  unregisterSystem(sys) {
    _index4.js.array.fastRemove(this._systems, sys);

    this._systems.sort(_system.default.sortByPriority);
  }
  /**
   * @en get a system.
   * @zh 获取一个 system。
   */


  getSystem(name) {
    return this._systems.find(sys => sys.id === name);
  }
  /**
   * @en Returns the `AnimationManager` associated with this director. Please use getSystem(AnimationManager.ID)
   * @zh 获取和 director 相关联的 `AnimationManager`（动画管理器）。请使用 getSystem(AnimationManager.ID) 来替代
   * @deprecated
   */


  getAnimationManager() {
    return this.getSystem(_globalExports.legacyCC.AnimationManager.ID);
  } // Loop management

  /**
   * @en Starts Animation
   * @zh 开始动画
   */


  startAnimation() {
    this._invalid = false;
    this._lastUpdate = performance.now();
  }
  /**
   * @en Stops animation
   * @zh 停止动画
   */


  stopAnimation() {
    this._invalid = true;
  }
  /**
   * @en Run main loop of director
   * @zh 运行主循环
   */


  mainLoop(time) {
    if (this._purgeDirectorInNextLoop) {
      this._purgeDirectorInNextLoop = false;
      this.purgeDirector();
    } else if (!this._invalid) {
      // calculate "global" dt
      if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
        this._deltaTime = time;
      } else {
        this.calculateDeltaTime(time);
      }

      const dt = this._deltaTime; // Update

      if (!this._paused) {
        this.emit(Director.EVENT_BEFORE_UPDATE); // Call start for new added components

        this._compScheduler.startPhase(); // Update for components


        this._compScheduler.updatePhase(dt); // Update systems


        for (let i = 0; i < this._systems.length; ++i) {
          this._systems[i].update(dt);
        } // Late update for components


        this._compScheduler.lateUpdatePhase(dt); // User can use this event to do things after update


        this.emit(Director.EVENT_AFTER_UPDATE); // Destroy entities that have been removed recently

        _object.CCObject._deferredDestroy(); // Post update systems


        for (let i = 0; i < this._systems.length; ++i) {
          this._systems[i].postUpdate(dt);
        }
      }

      this.emit(Director.EVENT_BEFORE_DRAW);

      this._root.frameMove(this._deltaTime);

      this.emit(Director.EVENT_AFTER_DRAW);

      _eventManager.default.frameUpdateListeners();

      _index3.Node.resetHasChangedFlags();

      _index3.Node.clearNodeArray();

      this._totalFrames++;
    }
  }

  _initOnRendererInitialized() {
    this._totalFrames = 0;
    this._lastUpdate = performance.now();
    this._startTime = this._lastUpdate;
    this._paused = false;
    this._purgeDirectorInNextLoop = false; // Event manager

    if (_eventManager.default) {
      _eventManager.default.setEnabled(true);
    } // Scheduler
    // TODO: have a solid organization of priority and expose to user


    this.registerSystem(_scheduler.Scheduler.ID, this._scheduler, 200);
    this.emit(Director.EVENT_INIT);
  }

  _init() {
    this._root = new _root.Root(_globalExports.legacyCC.game._gfxDevice);
    const rootInfo = {};
    return this._root.initialize(rootInfo).catch(error => {
      (0, _debug.errorID)(1217);
      return Promise.reject(error);
    });
  }

}

exports.Director = Director;
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
_globalExports.legacyCC.Director = Director;
/**
 * 导演类。
 */

const director = Director.instance = _globalExports.legacyCC.director = new Director();
exports.director = director;