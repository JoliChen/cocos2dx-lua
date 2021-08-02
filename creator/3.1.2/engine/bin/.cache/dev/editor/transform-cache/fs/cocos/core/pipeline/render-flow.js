"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderFlow = void 0;

var _index = require("../data/decorators/index.js");

var _renderStage = require("./render-stage.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Render flow is a sub process of the [[RenderPipeline]], it dispatch the render task to all the [[RenderStage]]s.
 * @zh 渲染流程是渲染管线（[[RenderPipeline]]）的一个子过程，它将渲染任务派发到它的所有渲染阶段（[[RenderStage]]）中执行。
 */
let RenderFlow = (_dec = (0, _index.ccclass)('RenderFlow'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.displayOrder)(1), _dec4 = (0, _index.displayOrder)(2), _dec5 = (0, _index.displayOrder)(3), _dec6 = (0, _index.type)([_renderStage.RenderStage]), _dec(_class = (_class2 = (_temp = class RenderFlow {
  constructor() {
    _initializerDefineProperty(this, "_name", _descriptor, this);

    _initializerDefineProperty(this, "_priority", _descriptor2, this);

    _initializerDefineProperty(this, "_tag", _descriptor3, this);

    _initializerDefineProperty(this, "_stages", _descriptor4, this);
  }

  /**
   * @en The name of the render flow
   * @zh 渲染流程的名字
   */
  get name() {
    return this._name;
  }
  /**
   * @en Priority of the current flow
   * @zh 当前渲染流程的优先级。
   */


  get priority() {
    return this._priority;
  }
  /**
   * @en Tag of the current flow
   * @zh 当前渲染流程的标签。
   */


  get tag() {
    return this._tag;
  }
  /**
   * @en The stages of flow.
   * @zh 渲染流程 stage 列表。
   * @readonly
   */


  get stages() {
    return this._stages;
  }

  /**
   * @en Get pipeline
   * @zh 获取pipeline
   */
  get pipeline() {
    return this._pipeline;
  }
  /**
   * @en The initialization process, user shouldn't use it in most case, only useful when need to generate render pipeline programmatically.
   * @zh 初始化函数，正常情况下不会用到，仅用于程序化生成渲染管线的情况。
   * @param info The render flow information
   */


  initialize(info) {
    this._name = info.name;
    this._priority = info.priority;
    this._stages = info.stages;

    if (info.tag) {
      this._tag = info.tag;
    }

    return true;
  }
  /**
   * @en Activate the current render flow in the given pipeline
   * @zh 为指定的渲染管线开启当前渲染流程
   * @param pipeline The render pipeline to activate this render flow
   */


  activate(pipeline) {
    this._pipeline = pipeline;

    this._stages.sort((a, b) => a.priority - b.priority);

    for (let i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].activate(pipeline, this);
    }
  }
  /**
   * @en Render function, it basically run all render stages in sequence for the given view.
   * @zh 渲染函数，对指定的渲染视图按顺序执行所有渲染阶段。
   * @param view Render view。
   */


  render(camera) {
    for (let i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].render(camera);
    }
  }
  /**
   * @en Destroy function.
   * @zh 销毁函数。
   */


  destroy() {
    for (let i = 0, len = this._stages.length; i < len; i++) {
      this._stages[i].destroy();
    }

    this._stages.length = 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_name", [_dec2, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_priority", [_dec3, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_tag", [_dec4, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_stages", [_dec5, _dec6, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.RenderFlow = RenderFlow;
_globalExports.legacyCC.RenderFlow = RenderFlow;