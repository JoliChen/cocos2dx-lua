"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.game = exports.Game = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _system = require("../../pal/system/web/system.js");

var _eventTarget = require("./event/event-target.js");

var debug = _interopRequireWildcard(require("./platform/debug.js"));

var _inputManager = _interopRequireDefault(require("./platform/event-manager/input-manager.js"));

var _index = require("./gfx/index.js");

var _sys = require("./platform/sys.js");

var _macro = require("./platform/macro.js");

var _globalExports = require("./global-exports.js");

var _define = require("./pipeline/define.js");

var _index2 = require("./pipeline/index.js");

var _index3 = require("../../pal/system/enum-type/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
 * @module core
 */

/**
 * @en An object to boot the game.
 * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 */
class Game extends _eventTarget.EventTarget {
  constructor(...args) {
    super(...args);
    this.frame = null;
    this.container = null;
    this.canvas = null;
    this.renderType = -1;
    this.eventTargetOn = super.on;
    this.eventTargetOnce = super.once;
    this.config = {};
    this.onStart = null;
    this.collisionMatrix = [];
    this.groupList = [];
    this._persistRootNodes = {};
    this._paused = true;
    this._configLoaded = false;
    this._isCloning = false;
    this._inited = false;
    this._engineInited = false;
    this._rendererInitialized = false;
    this._gfxDevice = null;
    this._intervalId = null;
  }

  /**
   * @en Indicates whether the engine and the renderer has been initialized
   * @zh 引擎和渲染器是否以完成初始化
   */
  get inited() {
    return this._inited;
  }

  get frameTime() {
    return this._frameTime;
  }

  // @Methods
  //  @Game play control

  /**
   * @en Set frame rate of game.
   * @zh 设置游戏帧率。
   */
  setFrameRate(frameRate) {
    const config = this.config;

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


  getFrameRate() {
    return this.config.frameRate || 0;
  }
  /**
   * @en Run the game frame by frame.
   * @zh 执行一帧游戏循环。
   */


  step() {
    _globalExports.legacyCC.director.mainLoop();
  }
  /**
   * @en Pause the game main loop. This will pause:<br>
   * game logic execution, rendering process, event manager, background music and all audio effects.<br>
   * This is different with `director.pause` which only pause the game logic execution.<br>
   * @zh 暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。这点和只暂停游戏逻辑的 `director.pause` 不同。
   */


  pause() {
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


  resume() {
    if (!this._paused) {
      return;
    } // Resume main loop


    this._runMainLoop();
  }
  /**
   * @en Check whether the game is paused.
   * @zh 判断游戏是否暂停。
   */


  isPaused() {
    return this._paused;
  }
  /**
   * @en Restart game.
   * @zh 重新开始游戏
   */


  restart() {
    const afterDrawPromise = new Promise(resolve => _globalExports.legacyCC.director.once(_globalExports.legacyCC.Director.EVENT_AFTER_DRAW, () => resolve()));
    return afterDrawPromise.then(() => {
      for (const id in this._persistRootNodes) {
        this.removePersistRootNode(this._persistRootNodes[id]);
      } // Clear scene


      _globalExports.legacyCC.director.getScene().destroy();

      _globalExports.legacyCC.Object._deferredDestroy();

      _globalExports.legacyCC.director.reset();

      this.pause();
      return this._setRenderPipelineNShowSplash().then(() => {
        this.resume();

        this._safeEmit(Game.EVENT_RESTART);
      });
    });
  }
  /**
   * @en End game, it will close the game window
   * @zh 退出游戏
   */


  end() {
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


  on(type, callback, target, once) {
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


  once(type, callback, target) {
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


  init(config) {
    this._initConfig(config); // Init assetManager


    if (this.config.assetOptions) {
      _globalExports.legacyCC.assetManager.init(this.config.assetOptions);
    }

    return this._initEngine().then(() => {
      if (!_internal253Aconstants.EDITOR) {
        this._initEvents();
      }

      if (_globalExports.legacyCC.director.root.dataPoolManager) {
        _globalExports.legacyCC.director.root.dataPoolManager.jointTexturePool.registerCustomTextureLayouts(config.customJointTextureLayouts);
      }

      return this._engineInited;
    });
  }
  /**
   * @en Run game with configuration object and onStart function.
   * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
   * @param onStart - function to be executed after game initialized
   */


  run(configOrCallback, onStart) {
    // To compatible with older version,
    // we allow the `run(config, onstart?)` form. But it's deprecated.
    let initPromise;

    if (typeof configOrCallback !== 'function' && configOrCallback) {
      initPromise = this.init(configOrCallback);
      this.onStart = onStart !== null && onStart !== void 0 ? onStart : null;
    } else {
      this.onStart = configOrCallback !== null && configOrCallback !== void 0 ? configOrCallback : null;
    }

    return Promise.resolve(initPromise).then(() => {
      // register system events
      if (!_internal253Aconstants.EDITOR && game.config.registerSystemEvent) {
        _inputManager.default.registerSystemEvent();
      }

      return this._setRenderPipelineNShowSplash();
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


  addPersistRootNode(node) {
    if (!_globalExports.legacyCC.Node.isNode(node) || !node.uuid) {
      debug.warnID(3800);
      return;
    }

    const id = node.uuid;

    if (!this._persistRootNodes[id]) {
      const scene = _globalExports.legacyCC.director._scene;

      if (_globalExports.legacyCC.isValid(scene)) {
        if (!node.parent) {
          node.parent = scene;
        } else if (!(node.parent instanceof _globalExports.legacyCC.Scene)) {
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

      _globalExports.legacyCC.assetManager._releaseManager._addPersistNodeRef(node);
    }
  }
  /**
   * @en Remove a persistent root node.
   * @zh 取消常驻根节点。
   * @param node - The node to be removed from persistent node list
   */


  removePersistRootNode(node) {
    const id = node.uuid || '';

    if (node === this._persistRootNodes[id]) {
      delete this._persistRootNodes[id];
      node._persistNode = false;
      node._originalSceneId = '';

      _globalExports.legacyCC.assetManager._releaseManager._removePersistNodeRef(node);
    }
  }
  /**
   * @en Check whether the node is a persistent root node.
   * @zh 检查节点是否是常驻根节点。
   * @param node - The node to be checked
   */


  isPersistRootNode(node) {
    return !!node._persistNode;
  } //  @Engine loading


  _initEngine() {
    this._initDevice();

    return Promise.resolve(_globalExports.legacyCC.director._init()).then(() => {
      // Log engine version
      debug.log(`Cocos Creator v${_globalExports.VERSION}`);
      this.emit(Game.EVENT_ENGINE_INITED);
      this._engineInited = true;
      _globalExports.legacyCC.internal.dynamicAtlasManager.enabled = !_macro.macro.CLEANUP_IMAGE_CACHE;
    });
  } // @Methods
  //  @Time ticker section


  _setAnimFrame() {
    this._lastTime = performance.now();
    const frameRate = this.config.frameRate;
    this._frameTime = 1000 / frameRate;

    if (_internal253Aconstants.JSB) {
      // @ts-expect-error JSB Call
      jsb.setPreferredFramesPerSecond(frameRate);
      window.rAF = window.requestAnimationFrame;
      window.cAF = window.cancelAnimationFrame;
    } else {
      if (this._intervalId) {
        window.cAF(this._intervalId);
        this._intervalId = 0;
      }

      const rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

      if (frameRate !== 60 && frameRate !== 30) {
        // @ts-expect-error Compatibility
        window.rAF = rAF ? this._stTimeWithRAF : this._stTime;
        window.cAF = this._ctTime;
      } else {
        window.rAF = rAF || this._stTime;
        window.cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.ocancelAnimationFrame || this._ctTime;
      }
    }
  }

  _stTimeWithRAF(callback) {
    const currTime = performance.now();
    const elapseTime = Math.max(0, currTime - game._lastTime);
    const timeToCall = Math.max(0, game._frameTime - elapseTime);
    const id = window.setTimeout(() => {
      window.requestAnimationFrame(callback);
    }, timeToCall);
    game._lastTime = currTime + timeToCall;
    return id;
  }

  _stTime(callback) {
    const currTime = performance.now();
    const elapseTime = Math.max(0, currTime - game._lastTime);
    const timeToCall = Math.max(0, game._frameTime - elapseTime);
    const id = window.setTimeout(callback, timeToCall);
    game._lastTime = currTime + timeToCall;
    return id;
  }

  _ctTime(id) {
    window.clearTimeout(id);
  } // Run game.


  _runMainLoop() {
    if (!this._inited || _internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      return;
    }

    const config = this.config;
    const director = _globalExports.legacyCC.director;
    const frameRate = config.frameRate;
    debug.setDisplayStats(!!config.showFPS);
    director.startAnimation();
    let callback;

    if (!_internal253Aconstants.JSB && !_internal253Aconstants.RUNTIME_BASED && frameRate === 30) {
      let skip = true;

      callback = time => {
        this._intervalId = window.rAF(callback);
        skip = !skip;

        if (skip) {
          return;
        }

        director.mainLoop(time);
      };
    } else {
      callback = time => {
        this._intervalId = window.rAF(callback);
        director.mainLoop(time);
      };
    }

    if (this._intervalId) {
      window.cAF(this._intervalId);
      this._intervalId = 0;
    }

    this._intervalId = window.rAF(callback);
    this._paused = false;
  } // @Game loading section


  _initConfig(config) {
    // Configs adjustment
    if (typeof config.debugMode !== 'number') {
      config.debugMode = debug.DebugMode.NONE;
    }

    config.exposeClassName = !!config.exposeClassName;

    if (typeof config.frameRate !== 'number') {
      config.frameRate = 60;
    }

    const renderMode = config.renderMode;

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
  }

  _determineRenderType() {
    const config = this.config;
    const userRenderMode = parseInt(config.renderMode, 10); // Determine RenderType

    this.renderType = Game.RENDER_TYPE_CANVAS;
    let supportRender = false;

    if (userRenderMode === 0) {
      if (_globalExports.legacyCC.sys.capabilities.opengl) {
        this.renderType = Game.RENDER_TYPE_WEBGL;
        supportRender = true;
      } else if (_globalExports.legacyCC.sys.capabilities.canvas) {
        this.renderType = Game.RENDER_TYPE_CANVAS;
        supportRender = true;
      }
    } else if (userRenderMode === 1 && _globalExports.legacyCC.sys.capabilities.canvas) {
      this.renderType = Game.RENDER_TYPE_CANVAS;
      supportRender = true;
    } else if (userRenderMode === 2 && _globalExports.legacyCC.sys.capabilities.opengl) {
      this.renderType = Game.RENDER_TYPE_WEBGL;
      supportRender = true;
    }

    if (!supportRender) {
      throw new Error(debug.getError(3820, userRenderMode));
    }
  }

  _initDevice() {
    // Avoid setup to be called twice.
    if (this._rendererInitialized) {
      return;
    }

    this.canvas = this.config.adapter.canvas;
    this.frame = this.config.adapter.frame;
    this.container = this.config.adapter.container;

    this._determineRenderType(); // WebGL context created successfully


    if (this.renderType === Game.RENDER_TYPE_WEBGL) {
      const ctors = [];

      if (_internal253Aconstants.JSB && window.gfx) {
        this._gfxDevice = gfx.deviceInstance;
      } else {
        let useWebGL2 = !!window.WebGL2RenderingContext;
        const userAgent = window.navigator.userAgent.toLowerCase();

        if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 || _system.system.browserType === _index3.BrowserType.UC // UC browser implementation doesn't conform to WebGL2 standard
        ) {
            useWebGL2 = false;
          }

        if (useWebGL2 && _globalExports.legacyCC.WebGL2Device) {
          ctors.push(_globalExports.legacyCC.WebGL2Device);
        }

        if (_globalExports.legacyCC.WebGLDevice) {
          ctors.push(_globalExports.legacyCC.WebGLDevice);
        }

        const opts = new _index.DeviceInfo(this.canvas, _internal253Aconstants.EDITOR || _macro.macro.ENABLE_WEBGL_ANTIALIAS, false, window.devicePixelRatio, _sys.sys.windowPixelResolution.width, _sys.sys.windowPixelResolution.height, _define.bindingMappingInfo);

        for (let i = 0; i < ctors.length; i++) {
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

    this.canvas.oncontextmenu = () => false;
  }

  _initEvents() {
    _system.system.onShow(this._onShow.bind(this));

    _system.system.onHide(this._onHide.bind(this));
  }

  _onHide() {
    this.emit(Game.EVENT_HIDE);
    this.pause();
  }

  _onShow() {
    this.emit(Game.EVENT_SHOW);
    this.resume();
  }

  _setRenderPipelineNShowSplash() {
    return Promise.resolve(this._setupRenderPipeline()).then(() => Promise.resolve(this._showSplashScreen()).then(() => {
      this._inited = true;

      this._setAnimFrame();

      this._runMainLoop();

      this._safeEmit(Game.EVENT_GAME_INITED);

      if (this.onStart) {
        this.onStart();
      }
    }));
  }

  _setupRenderPipeline() {
    const {
      renderPipeline
    } = this.config;

    if (!renderPipeline) {
      return this._setRenderPipeline();
    }

    return new Promise((resolve, reject) => {
      _globalExports.legacyCC.assetManager.loadAny(renderPipeline, (err, asset) => err || !(asset instanceof _index2.RenderPipeline) ? reject(err) : resolve(asset));
    }).then(asset => {
      this._setRenderPipeline(asset);
    }).catch(reason => {
      debug.warn(reason);
      debug.warn(`Failed load render pipeline: ${renderPipeline}, engine failed to initialize, will fallback to default pipeline`);

      this._setRenderPipeline();
    });
  }

  _showSplashScreen() {
    if (!_internal253Aconstants.EDITOR && !_internal253Aconstants.PREVIEW && _globalExports.legacyCC.internal.SplashScreen) {
      const splashScreen = _globalExports.legacyCC.internal.SplashScreen.instance;
      splashScreen.main(_globalExports.legacyCC.director.root);
      return new Promise(resolve => {
        splashScreen.setOnFinish(() => resolve());
        splashScreen.loadFinish = true;
      });
    }

    return null;
  }

  _setRenderPipeline(rppl) {
    if (!_globalExports.legacyCC.director.root.setRenderPipeline(rppl)) {
      this._setRenderPipeline();
    }

    this._rendererInitialized = true;

    this._safeEmit(Game.EVENT_RENDERER_INITED);
  }

  _safeEmit(event) {
    if (_internal253Aconstants.EDITOR) {
      try {
        this.emit(event);
      } catch (e) {
        debug.warn(e);
      }
    } else {
      this.emit(event);
    }
  }

}

exports.Game = Game;
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
_globalExports.legacyCC.Game = Game;
/**
 * @en
 * This is a Game instance.
 * @zh
 * 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。
 */

const game = _globalExports.legacyCC.game = new Game();
exports.game = game;