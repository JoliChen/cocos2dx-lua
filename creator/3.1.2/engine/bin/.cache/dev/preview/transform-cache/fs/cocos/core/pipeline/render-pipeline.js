System.register("q-bundled:///fs/cocos/core/pipeline/render-pipeline.js", ["../data/decorators/index.js", "../global-exports.js", "../assets/asset.js", "./render-flow.js", "../gfx/index.js", "./pipeline-ubo.js", "./pipeline-scene-data.js", "./global-descriptor-set-manager.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, legacyCC, Asset, RenderFlow, Feature, Rect, PipelineUBO, PipelineSceneData, GlobalDSManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp, RenderPipeline;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_renderFlowJs) {
      RenderFlow = _renderFlowJs.RenderFlow;
    }, function (_gfxIndexJs) {
      Feature = _gfxIndexJs.Feature;
      Rect = _gfxIndexJs.Rect;
    }, function (_pipelineUboJs) {
      PipelineUBO = _pipelineUboJs.PipelineUBO;
    }, function (_pipelineSceneDataJs) {
      PipelineSceneData = _pipelineSceneDataJs.PipelineSceneData;
    }, function (_globalDescriptorSetManagerJs) {
      GlobalDSManager = _globalDescriptorSetManagerJs.GlobalDSManager;
    }],
    execute: function () {
      /**
       * @en Render pipeline describes how we handle the rendering process for all render objects in the related render scene root.
       * It contains some general pipeline configurations, necessary rendering resources and some [[RenderFlow]]s.
       * The rendering process function [[render]] is invoked by [[Root]] for all [[Camera]]s.
       * @zh 渲染管线对象决定了引擎对相关渲染场景下的所有渲染对象实施的完整渲染流程。
       * 这个类主要包含一些通用的管线配置，必要的渲染资源和一些 [[RenderFlow]]。
       * 渲染流程函数 [[render]] 会由 [[Root]] 发起调用并对所有 [[Camera]] 执行预设的渲染流程。
       */
      _export("RenderPipeline", RenderPipeline = (_dec = ccclass('cc.RenderPipeline'), _dec2 = displayOrder(0), _dec3 = displayOrder(1), _dec4 = type([RenderFlow]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(RenderPipeline, _Asset);

        function RenderPipeline() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_tag", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_flows", _descriptor2, _assertThisInitialized(_this));

          _this._commandBuffers = [];
          _this._pipelineUBO = new PipelineUBO();
          _this._pipelineSceneData = new PipelineSceneData();
          _this._macros = {};
          _this._constantMacros = '';
          return _this;
        }

        var _proto = RenderPipeline.prototype;

        /**
         * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
         * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
         * @param info The render pipeline information
         */
        _proto.initialize = function initialize(info) {
          this._flows = info.flows;

          if (info.tag) {
            this._tag = info.tag;
          }

          return true;
        }
        /**
         * @en generate renderArea by camera
         * @zh 生成renderArea
         * @param camera the camera
         * @returns
         */
        ;

        _proto.generateRenderArea = function generateRenderArea(camera) {
          var res = new Rect();
          var vp = camera.viewport;
          var sceneData = this.pipelineSceneData; // render area is not oriented

          var w = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.height : camera.width;
          var h = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.width : camera.height;
          res.x = vp.x * w;
          res.y = vp.y * h;
          res.width = vp.width * w * sceneData.shadingScale;
          res.height = vp.height * h * sceneData.shadingScale;
          return res;
        }
        /**
         * @en Activate the render pipeline after loaded, it mainly activate the flows
         * @zh 当渲染管线资源加载完成后，启用管线，主要是启用管线内的 flow
         */
        ;

        _proto.activate = function activate() {
          this._device = legacyCC.director.root.device;
          this._globalDSManager = new GlobalDSManager(this);
          this._descriptorSet = this._globalDSManager.globalDescriptorSet;

          this._pipelineUBO.activate(this._device, this);

          this._pipelineSceneData.activate(this._device, this);

          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].activate(this);
          } // update global defines when all states initialized.


          this._macros.CC_USE_HDR = this._pipelineSceneData.isHDR;

          this._generateConstantMacros();

          return true;
        }
        /**
         * @en Render function, it basically run the render process of all flows in sequence for the given view.
         * @zh 渲染函数，对指定的渲染视图按顺序执行所有渲染流程。
         * @param view Render view。
         */
        ;

        _proto.render = function render(cameras) {
          for (var j = 0; j < this.flows.length; j++) {
            for (var i = 0; i < cameras.length; i++) {
              var camera = cameras[i];
              this.flows[j].render(camera);
            }
          }
        }
        /**
         * @en Internal destroy function
         * @zh 内部销毁函数。
         */
        ;

        _proto.destroy = function destroy() {
          for (var i = 0; i < this._flows.length; i++) {
            this._flows[i].destroy();
          }

          this._flows.length = 0;

          if (this._descriptorSet) {
            this._descriptorSet.destroy();
          }

          this._globalDSManager.destroy();

          for (var _i = 0; _i < this._commandBuffers.length; _i++) {
            this._commandBuffers[_i].destroy();
          }

          this._commandBuffers.length = 0;

          this._pipelineUBO.destroy();

          this._pipelineSceneData.destroy();

          return _Asset.prototype.destroy.call(this);
        }
        /**
         * @en Device size change.
         * @zh 设备尺寸重置。
         */
        ;

        _proto.resize = function resize(width, height) {};

        _proto._generateConstantMacros = function _generateConstantMacros() {
          var str = '';
          str += "#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE " + (this.device.hasFeature(Feature.TEXTURE_FLOAT) ? 1 : 0) + "\n";
          str += "#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS " + this.device.capabilities.maxVertexUniformVectors + "\n";
          str += "#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS " + this.device.capabilities.maxFragmentUniformVectors + "\n";
          this._constantMacros = str;
        };

        _createClass(RenderPipeline, [{
          key: "tag",
          get:
          /**
           * @en The tag of pipeline.
           * @zh 管线的标签。
           * @readonly
           */
          function get() {
            return this._tag;
          }
          /**
           * @en The flows of pipeline.
           * @zh 管线的渲染流程列表。
           * @readonly
           */

        }, {
          key: "flows",
          get: function get() {
            return this._flows;
          }
          /**
           * @en Tag
           * @zh 标签
           * @readonly
           */

        }, {
          key: "constantMacros",
          get:
          /**
           * @en
           * Constant macro string, static throughout the whole runtime.
           * Used to pass device-specific parameters to shader.
           * @zh 常量宏定义字符串，运行时全程不会改变，用于给 shader 传一些只和平台相关的参数。
           * @readonly
           */
          function get() {
            return this._constantMacros;
          }
          /**
           * @en
           * The current global-scoped shader macros.
           * Used to control effects like IBL, fog, etc.
           * @zh 当前的全局宏定义，用于控制如 IBL、雾效等模块。
           * @readonly
           */

        }, {
          key: "macros",
          get: function get() {
            return this._macros;
          }
        }, {
          key: "device",
          get: function get() {
            return this._device;
          }
        }, {
          key: "globalDSManager",
          get: function get() {
            return this._globalDSManager;
          }
        }, {
          key: "descriptorSetLayout",
          get: function get() {
            return this._globalDSManager.descriptorSetLayout;
          }
        }, {
          key: "descriptorSet",
          get: function get() {
            return this._descriptorSet;
          }
        }, {
          key: "commandBuffers",
          get: function get() {
            return this._commandBuffers;
          }
        }, {
          key: "pipelineUBO",
          get: function get() {
            return this._pipelineUBO;
          }
        }, {
          key: "pipelineSceneData",
          get: function get() {
            return this._pipelineSceneData;
          }
        }]);

        return RenderPipeline;
      }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec2, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_flows", [_dec3, _dec4, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class)); // Do not delete, for the class detection of editor


      legacyCC.RenderPipeline = RenderPipeline;
    }
  };
});