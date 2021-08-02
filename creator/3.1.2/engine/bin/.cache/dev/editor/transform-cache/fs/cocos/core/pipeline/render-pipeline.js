"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderPipeline = void 0;

var _index = require("../data/decorators/index.js");

var _globalExports = require("../global-exports.js");

var _asset = require("../assets/asset.js");

var _renderFlow = require("./render-flow.js");

var _index2 = require("../gfx/index.js");

var _pipelineUbo = require("./pipeline-ubo.js");

var _pipelineSceneData = require("./pipeline-scene-data.js");

var _globalDescriptorSetManager = require("./global-descriptor-set-manager.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Render pipeline describes how we handle the rendering process for all render objects in the related render scene root.
 * It contains some general pipeline configurations, necessary rendering resources and some [[RenderFlow]]s.
 * The rendering process function [[render]] is invoked by [[Root]] for all [[Camera]]s.
 * @zh 渲染管线对象决定了引擎对相关渲染场景下的所有渲染对象实施的完整渲染流程。
 * 这个类主要包含一些通用的管线配置，必要的渲染资源和一些 [[RenderFlow]]。
 * 渲染流程函数 [[render]] 会由 [[Root]] 发起调用并对所有 [[Camera]] 执行预设的渲染流程。
 */
let RenderPipeline = (_dec = (0, _index.ccclass)('cc.RenderPipeline'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.displayOrder)(1), _dec4 = (0, _index.type)([_renderFlow.RenderFlow]), _dec(_class = (_class2 = (_temp = class RenderPipeline extends _asset.Asset {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_tag", _descriptor, this);

    _initializerDefineProperty(this, "_flows", _descriptor2, this);

    this._commandBuffers = [];
    this._pipelineUBO = new _pipelineUbo.PipelineUBO();
    this._pipelineSceneData = new _pipelineSceneData.PipelineSceneData();
    this._macros = {};
    this._constantMacros = '';
  }

  /**
   * @en The tag of pipeline.
   * @zh 管线的标签。
   * @readonly
   */
  get tag() {
    return this._tag;
  }
  /**
   * @en The flows of pipeline.
   * @zh 管线的渲染流程列表。
   * @readonly
   */


  get flows() {
    return this._flows;
  }
  /**
   * @en Tag
   * @zh 标签
   * @readonly
   */


  /**
   * @en
   * Constant macro string, static throughout the whole runtime.
   * Used to pass device-specific parameters to shader.
   * @zh 常量宏定义字符串，运行时全程不会改变，用于给 shader 传一些只和平台相关的参数。
   * @readonly
   */
  get constantMacros() {
    return this._constantMacros;
  }
  /**
   * @en
   * The current global-scoped shader macros.
   * Used to control effects like IBL, fog, etc.
   * @zh 当前的全局宏定义，用于控制如 IBL、雾效等模块。
   * @readonly
   */


  get macros() {
    return this._macros;
  }

  get device() {
    return this._device;
  }

  get globalDSManager() {
    return this._globalDSManager;
  }

  get descriptorSetLayout() {
    return this._globalDSManager.descriptorSetLayout;
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  get commandBuffers() {
    return this._commandBuffers;
  }

  get pipelineUBO() {
    return this._pipelineUBO;
  }

  get pipelineSceneData() {
    return this._pipelineSceneData;
  }

  /**
   * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
   * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
   * @param info The render pipeline information
   */
  initialize(info) {
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


  generateRenderArea(camera) {
    const res = new _index2.Rect();
    const vp = camera.viewport;
    const sceneData = this.pipelineSceneData; // render area is not oriented

    const w = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.height : camera.width;
    const h = camera.window.hasOnScreenAttachments && this.device.surfaceTransform % 2 ? camera.width : camera.height;
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


  activate() {
    this._device = _globalExports.legacyCC.director.root.device;
    this._globalDSManager = new _globalDescriptorSetManager.GlobalDSManager(this);
    this._descriptorSet = this._globalDSManager.globalDescriptorSet;

    this._pipelineUBO.activate(this._device, this);

    this._pipelineSceneData.activate(this._device, this);

    for (let i = 0; i < this._flows.length; i++) {
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


  render(cameras) {
    for (let j = 0; j < this.flows.length; j++) {
      for (let i = 0; i < cameras.length; i++) {
        const camera = cameras[i];
        this.flows[j].render(camera);
      }
    }
  }
  /**
   * @en Internal destroy function
   * @zh 内部销毁函数。
   */


  destroy() {
    for (let i = 0; i < this._flows.length; i++) {
      this._flows[i].destroy();
    }

    this._flows.length = 0;

    if (this._descriptorSet) {
      this._descriptorSet.destroy();
    }

    this._globalDSManager.destroy();

    for (let i = 0; i < this._commandBuffers.length; i++) {
      this._commandBuffers[i].destroy();
    }

    this._commandBuffers.length = 0;

    this._pipelineUBO.destroy();

    this._pipelineSceneData.destroy();

    return super.destroy();
  }
  /**
   * @en Device size change.
   * @zh 设备尺寸重置。
   */


  resize(width, height) {}

  _generateConstantMacros() {
    let str = '';
    str += `#define CC_DEVICE_SUPPORT_FLOAT_TEXTURE ${this.device.hasFeature(_index2.Feature.TEXTURE_FLOAT) ? 1 : 0}\n`;
    str += `#define CC_DEVICE_MAX_VERTEX_UNIFORM_VECTORS ${this.device.capabilities.maxVertexUniformVectors}\n`;
    str += `#define CC_DEVICE_MAX_FRAGMENT_UNIFORM_VECTORS ${this.device.capabilities.maxFragmentUniformVectors}\n`;
    this._constantMacros = str;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec2, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_flows", [_dec3, _dec4, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class); // Do not delete, for the class detection of editor

exports.RenderPipeline = RenderPipeline;
_globalExports.legacyCC.RenderPipeline = RenderPipeline;