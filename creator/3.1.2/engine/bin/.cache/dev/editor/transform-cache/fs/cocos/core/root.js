"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;

var _index = require("./builtin/index.js");

var _index2 = require("./memop/index.js");

var _index3 = require("./pipeline/index.js");

var _index4 = require("./renderer/scene/index.js");

var _light = require("./renderer/scene/light.js");

var _renderScene = require("./renderer/scene/render-scene.js");

var _globalExports = require("./global-exports.js");

var _renderWindow = require("./renderer/core/render-window.js");

var _index5 = require("./gfx/index.js");

var _memoryPools = require("./renderer/core/memory-pools.js");

var _debug = require("./platform/debug.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
 * @module core
 */

/**
 * @zh
 * Root类
 */
class Root {
  /**
   * @zh
   * GFX 设备
   */
  get device() {
    return this._device;
  }
  /**
   * @zh
   * 主窗口
   */


  get mainWindow() {
    return this._mainWindow;
  }
  /**
   * @zh
   * 当前窗口
   */


  set curWindow(window) {
    this._curWindow = window;
  }

  get curWindow() {
    return this._curWindow;
  }
  /**
   * @zh
   * 临时窗口（用于数据传输）
   */


  set tempWindow(window) {
    this._tempWindow = window;
  }

  get tempWindow() {
    return this._tempWindow;
  }
  /**
   * @zh
   * 窗口列表
   */


  get windows() {
    return this._windows;
  }
  /**
   * @zh
   * 渲染管线
   */


  get pipeline() {
    return this._pipeline;
  }
  /**
   * @zh
   * UI实例
   * 引擎内部使用，用户无需调用此接口
   */


  get batcher2D() {
    return this._batcher;
  }
  /**
   * @zh
   * 场景列表
   */


  get scenes() {
    return this._scenes;
  }
  /**
   * @zh
   * 累计时间（秒）
   */


  get cumulativeTime() {
    return _memoryPools.RootPool.get(this._poolHandle, _memoryPools.RootView.CUMULATIVE_TIME);
  }
  /**
   * @zh
   * 帧时间（秒）
   */


  get frameTime() {
    return _memoryPools.RootPool.get(this._poolHandle, _memoryPools.RootView.FRAME_TIME);
  }
  /**
   * @zh
   * 一秒内的累计帧数
   */


  get frameCount() {
    return this._frameCount;
  }
  /**
   * @zh
   * 每秒帧率
   */


  get fps() {
    return this._fps;
  }
  /**
   * @zh
   * 每秒固定帧率
   */


  set fixedFPS(fps) {
    if (fps > 0) {
      this._fixedFPS = fps;
      this._fixedFPSFrameTime = 1000.0 / fps;
    } else {
      this._fixedFPSFrameTime = 0;
    }
  }

  get fixedFPS() {
    return this._fixedFPS;
  }

  get dataPoolManager() {
    return this._dataPoolMgr;
  }

  get handle() {
    return this._poolHandle;
  }

  get useDeferredPipeline() {
    return this._useDeferredPipeline;
  }

  /**
   * 构造函数
   * @param device GFX 设备
   */
  constructor(device) {
    this._createSceneFun = null;
    this._createWindowFun = null;
    this._device = void 0;
    this._windows = [];
    this._mainWindow = null;
    this._curWindow = null;
    this._tempWindow = null;
    this._pipeline = null;
    this._batcher = null;
    this._dataPoolMgr = void 0;
    this._scenes = [];
    this._modelPools = new Map();
    this._cameraPool = null;
    this._lightPools = new Map();
    this._fpsTime = 0;
    this._frameCount = 0;
    this._fps = 0;
    this._fixedFPS = 0;
    this._fixedFPSFrameTime = 0;
    this._poolHandle = _memoryPools.NULL_HANDLE;
    this._useDeferredPipeline = false;
    this._device = device;
    this._dataPoolMgr = _globalExports.legacyCC.internal.DataPoolManager && new _globalExports.legacyCC.internal.DataPoolManager(device);

    _renderScene.RenderScene.registerCreateFunc(this);

    _renderWindow.RenderWindow.registerCreateFunc(this);

    this._cameraPool = new _index2.Pool(() => new _index4.Camera(this._device), 4);
  }
  /**
   * @zh
   * 初始化函数
   * @param info Root描述信息
   */


  initialize(info) {
    this._poolHandle = _memoryPools.RootPool.alloc();
    const colorAttachment = new _index5.ColorAttachment();
    const depthStencilAttachment = new _index5.DepthStencilAttachment();
    depthStencilAttachment.depthStoreOp = _index5.StoreOp.DISCARD;
    depthStencilAttachment.stencilStoreOp = _index5.StoreOp.DISCARD;
    const renderPassInfo = new _index5.RenderPassInfo([colorAttachment], depthStencilAttachment);
    this._mainWindow = this.createWindow({
      title: 'rootMainWindow',
      width: this._device.width,
      height: this._device.height,
      renderPassInfo,
      swapchainBufferIndices: -1 // always on screen

    });
    this._curWindow = this._mainWindow;
    return Promise.resolve(_index.builtinResMgr.initBuiltinRes(this._device)).then(() => {
      _globalExports.legacyCC.view.on('design-resolution-changed', () => {
        const width = _globalExports.legacyCC.game.canvas.width;
        const height = _globalExports.legacyCC.game.canvas.height;
        this.resize(width, height);
      }, this);
    });
  }

  destroy() {
    this.destroyScenes();

    if (this._pipeline) {
      this._pipeline.destroy();

      this._pipeline = null;
    }

    if (this._batcher) {
      this._batcher.destroy();

      this._batcher = null;
    }

    this._curWindow = null;
    this._mainWindow = null;
    this.dataPoolManager.clear();

    if (this._poolHandle) {
      _memoryPools.RootPool.free(this._poolHandle);

      this._poolHandle = _memoryPools.NULL_HANDLE;
    }
  }
  /**
   * @zh
   * 重置大小
   * @param width 屏幕宽度
   * @param height 屏幕高度
   */


  resize(width, height) {
    // const w = width / cc.view._devicePixelRatio;
    // const h = height / cc.view._devicePixelRatio;
    this._device.resize(width, height);

    this._mainWindow.resize(width, height);

    for (const window of this._windows) {
      if (window.shouldSyncSizeWithSwapchain) {
        window.resize(width, height);
      }
    }

    if (this._pipeline) {
      this._pipeline.resize(width, height);
    }
  }

  setRenderPipeline(rppl) {
    if (rppl instanceof _index3.DeferredPipeline) {
      this._useDeferredPipeline = true;
    }

    if (!rppl) {
      rppl = (0, _index3.createDefaultPipeline)();
    }

    this._pipeline = rppl;

    if (!this._pipeline.activate()) {
      return false;
    }

    const scene = _globalExports.legacyCC.director.getScene();

    if (scene) {
      scene.globals.activate();
    }

    this.onGlobalPipelineStateChanged();

    if (!this._batcher && _globalExports.legacyCC.internal.Batcher2D) {
      this._batcher = new _globalExports.legacyCC.internal.Batcher2D(this);

      if (!this._batcher.initialize()) {
        this.destroy();
        return false;
      }
    }

    return true;
  }

  onGlobalPipelineStateChanged() {
    for (let i = 0; i < this._scenes.length; i++) {
      this._scenes[i].onGlobalPipelineStateChanged();
    }

    this._pipeline.pipelineSceneData.initDeferredPassInfo();
  }
  /**
   * @zh
   * 激活指定窗口为当前窗口
   * @param window GFX 窗口
   */


  activeWindow(window) {
    this._curWindow = window;
  }
  /**
   * @zh
   * 重置累计时间
   */


  resetCumulativeTime() {
    _memoryPools.RootPool.set(this._poolHandle, _memoryPools.RootView.CUMULATIVE_TIME, 0);
  }
  /**
   * @zh
   * 每帧执行函数
   * @param deltaTime 间隔时间
   */


  frameMove(deltaTime) {
    _memoryPools.RootPool.set(this._poolHandle, _memoryPools.RootView.FRAME_TIME, deltaTime);
    /*
    if (this._fixedFPSFrameTime > 0) {
         const elapsed = this._frameTime * 1000.0;
        if (this._fixedFPSFrameTime > elapsed) {
             setTimeout(function () {}, this._fixedFPSFrameTime - elapsed);
        }
    }
    */


    ++this._frameCount;

    _memoryPools.RootPool.set(this._poolHandle, _memoryPools.RootView.CUMULATIVE_TIME, _memoryPools.RootPool.get(this._poolHandle, _memoryPools.RootView.CUMULATIVE_TIME) + deltaTime);

    this._fpsTime += deltaTime;

    if (this._fpsTime > 1.0) {
      this._fps = this._frameCount;
      this._frameCount = 0;
      this._fpsTime = 0.0;
    }

    for (let i = 0; i < this._scenes.length; ++i) {
      this._scenes[i].removeBatches();
    }

    if (this._batcher) this._batcher.update();
    const windows = this._windows;
    const cameraList = [];

    for (let i = 0; i < windows.length; i++) {
      const window = windows[i];
      window.extractRenderCameras(cameraList);
    }

    if (this._pipeline && cameraList.length > 0) {
      this._device.acquire();

      const scenes = this._scenes;

      const stamp = _globalExports.legacyCC.director.getTotalFrames();

      if (this._batcher) this._batcher.uploadBuffers();

      for (let i = 0; i < scenes.length; i++) {
        scenes[i].update(stamp);
      }

      _globalExports.legacyCC.director.emit(_globalExports.legacyCC.Director.EVENT_BEFORE_COMMIT);

      cameraList.sort((a, b) => a.priority - b.priority);

      this._pipeline.render(cameraList);

      this._device.present();
    }

    if (this._batcher) this._batcher.reset();
  }
  /**
   * @zh
   * 创建窗口
   * @param info GFX 窗口描述信息
   */


  createWindow(info) {
    const window = this._createWindowFun(this);

    window.initialize(this.device, info);

    this._windows.push(window);

    return window;
  }
  /**
   * @zh
   * 销毁指定的窗口
   * @param window GFX 窗口
   */


  destroyWindow(window) {
    for (let i = 0; i < this._windows.length; ++i) {
      if (this._windows[i] === window) {
        window.destroy();

        this._windows.splice(i, 1);

        return;
      }
    }
  }
  /**
   * @zh
   * 销毁全部窗口
   */


  destroyWindows() {
    for (const window of this._windows) {
      window.destroy();
    }

    this._windows = [];
  }
  /**
   * @zh
   * 创建渲染场景
   * @param info 渲染场景描述信息
   */


  createScene(info) {
    const scene = this._createSceneFun(this);

    scene.initialize(info);

    this._scenes.push(scene);

    return scene;
  }
  /**
   * @zh
   * 销毁指定的渲染场景
   * @param scene 渲染场景
   */


  destroyScene(scene) {
    for (let i = 0; i < this._scenes.length; ++i) {
      if (this._scenes[i] === scene) {
        scene.destroy();

        this._scenes.splice(i, 1);

        return;
      }
    }
  }
  /**
   * @zh
   * 销毁全部场景
   */


  destroyScenes() {
    for (const scene of this._scenes) {
      scene.destroy();
    }

    this._scenes = [];
  }

  createModel(ModelCtor) {
    let p = this._modelPools.get(ModelCtor);

    if (!p) {
      this._modelPools.set(ModelCtor, new _index2.Pool(() => new ModelCtor(), 10));

      p = this._modelPools.get(ModelCtor);
    }

    const model = p.alloc();
    model.initialize();
    return model;
  }

  destroyModel(m) {
    const p = this._modelPools.get(m.constructor);

    if (p) {
      p.free(m);
      m.destroy();

      if (m.scene) {
        m.scene.removeModel(m);
      }
    } else {
      (0, _debug.warnID)(1300, m.constructor.name);
    }
  }

  createCamera() {
    return this._cameraPool.alloc();
  }

  createLight(LightCtor) {
    let l = this._lightPools.get(LightCtor);

    if (!l) {
      this._lightPools.set(LightCtor, new _index2.Pool(() => new LightCtor(), 4));

      l = this._lightPools.get(LightCtor);
    }

    const light = l.alloc();
    light.initialize();
    return light;
  }

  destroyLight(l) {
    const p = this._lightPools.get(l.constructor);

    l.destroy();

    if (p) {
      p.free(l);

      if (l.scene) {
        switch (l.type) {
          case _light.LightType.SPHERE:
            l.scene.removeSphereLight(l);
            break;

          case _light.LightType.SPOT:
            l.scene.removeSpotLight(l);
            break;

          default:
            break;
        }
      }
    }
  }

}

exports.Root = Root;
_globalExports.legacyCC.Root = Root;