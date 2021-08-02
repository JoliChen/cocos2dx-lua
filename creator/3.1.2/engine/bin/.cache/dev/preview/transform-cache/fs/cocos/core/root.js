System.register("q-bundled:///fs/cocos/core/root.js", ["./builtin/index.js", "./memop/index.js", "./pipeline/index.js", "./renderer/scene/index.js", "./renderer/scene/light.js", "./renderer/scene/render-scene.js", "./global-exports.js", "./renderer/core/render-window.js", "./gfx/index.js", "./renderer/core/memory-pools.js", "./platform/debug.js"], function (_export, _context) {
  "use strict";

  var builtinResMgr, Pool, createDefaultPipeline, DeferredPipeline, Camera, LightType, RenderScene, legacyCC, RenderWindow, ColorAttachment, DepthStencilAttachment, RenderPassInfo, StoreOp, RootPool, RootView, NULL_HANDLE, warnID, Root;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_pipelineIndexJs) {
      createDefaultPipeline = _pipelineIndexJs.createDefaultPipeline;
      DeferredPipeline = _pipelineIndexJs.DeferredPipeline;
    }, function (_rendererSceneIndexJs) {
      Camera = _rendererSceneIndexJs.Camera;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }, function (_rendererSceneRenderSceneJs) {
      RenderScene = _rendererSceneRenderSceneJs.RenderScene;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_rendererCoreRenderWindowJs) {
      RenderWindow = _rendererCoreRenderWindowJs.RenderWindow;
    }, function (_gfxIndexJs) {
      ColorAttachment = _gfxIndexJs.ColorAttachment;
      DepthStencilAttachment = _gfxIndexJs.DepthStencilAttachment;
      RenderPassInfo = _gfxIndexJs.RenderPassInfo;
      StoreOp = _gfxIndexJs.StoreOp;
    }, function (_rendererCoreMemoryPoolsJs) {
      RootPool = _rendererCoreMemoryPoolsJs.RootPool;
      RootView = _rendererCoreMemoryPoolsJs.RootView;
      NULL_HANDLE = _rendererCoreMemoryPoolsJs.NULL_HANDLE;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      /**
       * @zh
       * Root类
       */
      _export("Root", Root = /*#__PURE__*/function () {
        /**
         * 构造函数
         * @param device GFX 设备
         */
        function Root(device) {
          var _this = this;

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
          this._poolHandle = NULL_HANDLE;
          this._useDeferredPipeline = false;
          this._device = device;
          this._dataPoolMgr = legacyCC.internal.DataPoolManager && new legacyCC.internal.DataPoolManager(device);
          RenderScene.registerCreateFunc(this);
          RenderWindow.registerCreateFunc(this);
          this._cameraPool = new Pool(function () {
            return new Camera(_this._device);
          }, 4);
        }
        /**
         * @zh
         * 初始化函数
         * @param info Root描述信息
         */


        var _proto = Root.prototype;

        _proto.initialize = function initialize(info) {
          var _this2 = this;

          this._poolHandle = RootPool.alloc();
          var colorAttachment = new ColorAttachment();
          var depthStencilAttachment = new DepthStencilAttachment();
          depthStencilAttachment.depthStoreOp = StoreOp.DISCARD;
          depthStencilAttachment.stencilStoreOp = StoreOp.DISCARD;
          var renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
          this._mainWindow = this.createWindow({
            title: 'rootMainWindow',
            width: this._device.width,
            height: this._device.height,
            renderPassInfo: renderPassInfo,
            swapchainBufferIndices: -1 // always on screen

          });
          this._curWindow = this._mainWindow;
          return Promise.resolve(builtinResMgr.initBuiltinRes(this._device)).then(function () {
            legacyCC.view.on('design-resolution-changed', function () {
              var width = legacyCC.game.canvas.width;
              var height = legacyCC.game.canvas.height;

              _this2.resize(width, height);
            }, _this2);
          });
        };

        _proto.destroy = function destroy() {
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
            RootPool.free(this._poolHandle);
            this._poolHandle = NULL_HANDLE;
          }
        }
        /**
         * @zh
         * 重置大小
         * @param width 屏幕宽度
         * @param height 屏幕高度
         */
        ;

        _proto.resize = function resize(width, height) {
          // const w = width / cc.view._devicePixelRatio;
          // const h = height / cc.view._devicePixelRatio;
          this._device.resize(width, height);

          this._mainWindow.resize(width, height);

          for (var _iterator = _createForOfIteratorHelperLoose(this._windows), _step; !(_step = _iterator()).done;) {
            var window = _step.value;

            if (window.shouldSyncSizeWithSwapchain) {
              window.resize(width, height);
            }
          }

          if (this._pipeline) {
            this._pipeline.resize(width, height);
          }
        };

        _proto.setRenderPipeline = function setRenderPipeline(rppl) {
          if (rppl instanceof DeferredPipeline) {
            this._useDeferredPipeline = true;
          }

          if (!rppl) {
            rppl = createDefaultPipeline();
          }

          this._pipeline = rppl;

          if (!this._pipeline.activate()) {
            return false;
          }

          var scene = legacyCC.director.getScene();

          if (scene) {
            scene.globals.activate();
          }

          this.onGlobalPipelineStateChanged();

          if (!this._batcher && legacyCC.internal.Batcher2D) {
            this._batcher = new legacyCC.internal.Batcher2D(this);

            if (!this._batcher.initialize()) {
              this.destroy();
              return false;
            }
          }

          return true;
        };

        _proto.onGlobalPipelineStateChanged = function onGlobalPipelineStateChanged() {
          for (var i = 0; i < this._scenes.length; i++) {
            this._scenes[i].onGlobalPipelineStateChanged();
          }

          this._pipeline.pipelineSceneData.initDeferredPassInfo();
        }
        /**
         * @zh
         * 激活指定窗口为当前窗口
         * @param window GFX 窗口
         */
        ;

        _proto.activeWindow = function activeWindow(window) {
          this._curWindow = window;
        }
        /**
         * @zh
         * 重置累计时间
         */
        ;

        _proto.resetCumulativeTime = function resetCumulativeTime() {
          RootPool.set(this._poolHandle, RootView.CUMULATIVE_TIME, 0);
        }
        /**
         * @zh
         * 每帧执行函数
         * @param deltaTime 间隔时间
         */
        ;

        _proto.frameMove = function frameMove(deltaTime) {
          RootPool.set(this._poolHandle, RootView.FRAME_TIME, deltaTime);
          /*
          if (this._fixedFPSFrameTime > 0) {
               const elapsed = this._frameTime * 1000.0;
              if (this._fixedFPSFrameTime > elapsed) {
                   setTimeout(function () {}, this._fixedFPSFrameTime - elapsed);
              }
          }
          */

          ++this._frameCount;
          RootPool.set(this._poolHandle, RootView.CUMULATIVE_TIME, RootPool.get(this._poolHandle, RootView.CUMULATIVE_TIME) + deltaTime);
          this._fpsTime += deltaTime;

          if (this._fpsTime > 1.0) {
            this._fps = this._frameCount;
            this._frameCount = 0;
            this._fpsTime = 0.0;
          }

          for (var i = 0; i < this._scenes.length; ++i) {
            this._scenes[i].removeBatches();
          }

          if (this._batcher) this._batcher.update();
          var windows = this._windows;
          var cameraList = [];

          for (var _i = 0; _i < windows.length; _i++) {
            var window = windows[_i];
            window.extractRenderCameras(cameraList);
          }

          if (this._pipeline && cameraList.length > 0) {
            this._device.acquire();

            var scenes = this._scenes;
            var stamp = legacyCC.director.getTotalFrames();
            if (this._batcher) this._batcher.uploadBuffers();

            for (var _i2 = 0; _i2 < scenes.length; _i2++) {
              scenes[_i2].update(stamp);
            }

            legacyCC.director.emit(legacyCC.Director.EVENT_BEFORE_COMMIT);
            cameraList.sort(function (a, b) {
              return a.priority - b.priority;
            });

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
        ;

        _proto.createWindow = function createWindow(info) {
          var window = this._createWindowFun(this);

          window.initialize(this.device, info);

          this._windows.push(window);

          return window;
        }
        /**
         * @zh
         * 销毁指定的窗口
         * @param window GFX 窗口
         */
        ;

        _proto.destroyWindow = function destroyWindow(window) {
          for (var i = 0; i < this._windows.length; ++i) {
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
        ;

        _proto.destroyWindows = function destroyWindows() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._windows), _step2; !(_step2 = _iterator2()).done;) {
            var window = _step2.value;
            window.destroy();
          }

          this._windows = [];
        }
        /**
         * @zh
         * 创建渲染场景
         * @param info 渲染场景描述信息
         */
        ;

        _proto.createScene = function createScene(info) {
          var scene = this._createSceneFun(this);

          scene.initialize(info);

          this._scenes.push(scene);

          return scene;
        }
        /**
         * @zh
         * 销毁指定的渲染场景
         * @param scene 渲染场景
         */
        ;

        _proto.destroyScene = function destroyScene(scene) {
          for (var i = 0; i < this._scenes.length; ++i) {
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
        ;

        _proto.destroyScenes = function destroyScenes() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._scenes), _step3; !(_step3 = _iterator3()).done;) {
            var scene = _step3.value;
            scene.destroy();
          }

          this._scenes = [];
        };

        _proto.createModel = function createModel(ModelCtor) {
          var p = this._modelPools.get(ModelCtor);

          if (!p) {
            this._modelPools.set(ModelCtor, new Pool(function () {
              return new ModelCtor();
            }, 10));

            p = this._modelPools.get(ModelCtor);
          }

          var model = p.alloc();
          model.initialize();
          return model;
        };

        _proto.destroyModel = function destroyModel(m) {
          var p = this._modelPools.get(m.constructor);

          if (p) {
            p.free(m);
            m.destroy();

            if (m.scene) {
              m.scene.removeModel(m);
            }
          } else {
            warnID(1300, m.constructor.name);
          }
        };

        _proto.createCamera = function createCamera() {
          return this._cameraPool.alloc();
        };

        _proto.createLight = function createLight(LightCtor) {
          var l = this._lightPools.get(LightCtor);

          if (!l) {
            this._lightPools.set(LightCtor, new Pool(function () {
              return new LightCtor();
            }, 4));

            l = this._lightPools.get(LightCtor);
          }

          var light = l.alloc();
          light.initialize();
          return light;
        };

        _proto.destroyLight = function destroyLight(l) {
          var p = this._lightPools.get(l.constructor);

          l.destroy();

          if (p) {
            p.free(l);

            if (l.scene) {
              switch (l.type) {
                case LightType.SPHERE:
                  l.scene.removeSphereLight(l);
                  break;

                case LightType.SPOT:
                  l.scene.removeSpotLight(l);
                  break;

                default:
                  break;
              }
            }
          }
        };

        _createClass(Root, [{
          key: "device",
          get:
          /**
           * @zh
           * GFX 设备
           */
          function get() {
            return this._device;
          }
          /**
           * @zh
           * 主窗口
           */

        }, {
          key: "mainWindow",
          get: function get() {
            return this._mainWindow;
          }
          /**
           * @zh
           * 当前窗口
           */

        }, {
          key: "curWindow",
          get: function get() {
            return this._curWindow;
          }
          /**
           * @zh
           * 临时窗口（用于数据传输）
           */
          ,
          set: function set(window) {
            this._curWindow = window;
          }
        }, {
          key: "tempWindow",
          get: function get() {
            return this._tempWindow;
          }
          /**
           * @zh
           * 窗口列表
           */
          ,
          set: function set(window) {
            this._tempWindow = window;
          }
        }, {
          key: "windows",
          get: function get() {
            return this._windows;
          }
          /**
           * @zh
           * 渲染管线
           */

        }, {
          key: "pipeline",
          get: function get() {
            return this._pipeline;
          }
          /**
           * @zh
           * UI实例
           * 引擎内部使用，用户无需调用此接口
           */

        }, {
          key: "batcher2D",
          get: function get() {
            return this._batcher;
          }
          /**
           * @zh
           * 场景列表
           */

        }, {
          key: "scenes",
          get: function get() {
            return this._scenes;
          }
          /**
           * @zh
           * 累计时间（秒）
           */

        }, {
          key: "cumulativeTime",
          get: function get() {
            return RootPool.get(this._poolHandle, RootView.CUMULATIVE_TIME);
          }
          /**
           * @zh
           * 帧时间（秒）
           */

        }, {
          key: "frameTime",
          get: function get() {
            return RootPool.get(this._poolHandle, RootView.FRAME_TIME);
          }
          /**
           * @zh
           * 一秒内的累计帧数
           */

        }, {
          key: "frameCount",
          get: function get() {
            return this._frameCount;
          }
          /**
           * @zh
           * 每秒帧率
           */

        }, {
          key: "fps",
          get: function get() {
            return this._fps;
          }
          /**
           * @zh
           * 每秒固定帧率
           */

        }, {
          key: "fixedFPS",
          get: function get() {
            return this._fixedFPS;
          },
          set: function set(fps) {
            if (fps > 0) {
              this._fixedFPS = fps;
              this._fixedFPSFrameTime = 1000.0 / fps;
            } else {
              this._fixedFPSFrameTime = 0;
            }
          }
        }, {
          key: "dataPoolManager",
          get: function get() {
            return this._dataPoolMgr;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._poolHandle;
          }
        }, {
          key: "useDeferredPipeline",
          get: function get() {
            return this._useDeferredPipeline;
          }
        }]);

        return Root;
      }());

      legacyCC.Root = Root;
    }
  };
});