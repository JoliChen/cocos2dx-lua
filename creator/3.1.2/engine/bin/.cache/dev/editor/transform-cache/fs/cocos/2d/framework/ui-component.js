"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIComponent = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _uiTransform = require("./ui-transform.js");

var _stencilManager = require("../renderer/stencil-manager.js");

var _dec, _dec2, _dec3, _class, _temp;

/**
 * @en Legacy 2D base class for rendering component, please use [[Renderable2D]] instead.
 * This component will setup [[NodeUIProperties.uiComp]] in its owner [[Node]]
 * @zh 旧的 2D 渲染组件基类，请使用 [[Renderable2D]] 替代。
 * 这个组件会设置 [[Node]] 上的 [[NodeUIProperties.uiComp]]。
 * @deprecated
 */
let UIComponent = (_dec = (0, _index.ccclass)('cc.UIComponent'), _dec2 = (0, _index.requireComponent)(_uiTransform.UITransform), _dec3 = (0, _index.executionOrder)(110), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.disallowMultiple)(_class = (0, _index.executeInEditMode)(_class = (_temp = class UIComponent extends _component.Component {
  constructor(...args) {
    super(...args);
    this._lastParent = null;
    this.stencilStage = _stencilManager.Stage.DISABLED;
  }

  __preload() {
    this.node._uiProps.uiComp = this;
  }

  onEnable() {}

  onDisable() {}

  onDestroy() {
    if (this.node._uiProps.uiComp === this) {
      this.node._uiProps.uiComp = null;
    }
  }
  /**
   * @en Render data submission procedure, it update and assemble the render data to 2D data buffers before all children submission process.
   * Usually called each frame when the ui flow assemble all render data to geometry buffers.
   * Don't call it unless you know what you are doing.
   * @zh 渲染数据组装程序，这个方法会在所有子节点数据组装之前更新并组装当前组件的渲染数据到 UI 的顶点数据缓冲区中。
   * 一般在 UI 渲染流程中调用，用于组装所有的渲染数据到顶点数据缓冲区。
   * 注意：不要手动调用该函数，除非你理解整个流程。
   */


  updateAssembler(render) {}
  /**
   * @en Post render data submission procedure, it's executed after assembler updated for all children.
   * It may assemble some extra render data to the geometry buffers, or it may only change some render states.
   * Don't call it unless you know what you are doing.
   * @zh 后置渲染数据组装程序，它会在所有子节点的渲染数据组装完成后被调用。
   * 它可能会组装额外的渲染数据到顶点数据缓冲区，也可能只是重置一些渲染状态。
   * 注意：不要手动调用该函数，除非你理解整个流程。
   */


  postUpdateAssembler(render) {}

  markForUpdateRenderData(enable = true) {}

}, _temp)) || _class) || _class) || _class) || _class) || _class);
exports.UIComponent = UIComponent;