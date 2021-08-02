"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIMeshRenderer = void 0;

var _index = require("../../core/data/decorators/index.js");

var _uiComponent = require("../framework/ui-component.js");

var _define = require("../../core/pipeline/define.js");

var _dec, _dec2, _dec3, _dec4, _class, _temp;

/**
 * @en
 * The component of model.
 * When you place particles or models in the UI, you must add this component to render.
 * The component must be placed on a node with the [[MeshRenderer]] or the [[Particle]].
 *
 * @zh
 * UI 模型基础组件。
 * 当你在 UI 中放置模型或者粒子的时候，必须添加该组件才能渲染。该组件必须放置在带有 [[MeshRenderer]] 或者 [[Particle]] 组件的节点上。
 */
let UIMeshRenderer = (_dec = (0, _index.ccclass)('cc.UIMeshRenderer'), _dec2 = (0, _index.help)('i18n:cc.UIMeshRenderer'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/UIMeshRenderer'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class UIMeshRenderer extends _uiComponent.UIComponent {
  constructor(...args) {
    super(...args);
    this._models = null;
    this._modelComponent = null;
  }

  get modelComponent() {
    return this._modelComponent;
  }

  onLoad() {
    if (!this.node._uiProps.uiTransformComp) {
      this.node.addComponent('cc.UITransform');
    }

    this._modelComponent = this.getComponent('cc.RenderableComponent');

    if (!this._modelComponent) {
      console.warn(`node '${this.node && this.node.name}' doesn't have any renderable component`);
      return;
    }

    this._models = this._modelComponent._collectModels();
  }

  onEnable() {
    super.onEnable();
  }

  onDisable() {
    super.onDisable();
  }

  onDestroy() {
    super.onDestroy();
    this._modelComponent = this.getComponent('cc.RenderableComponent');

    if (!this._modelComponent) {
      return;
    }

    this._modelComponent._sceneGetter = null;
    this._models = null;
  }

  updateAssembler(render) {
    if (this._models) {
      // @ts-expect-error: UIMeshRenderer do not attachToScene
      this._modelComponent._detachFromScene();

      for (const m of this._models) {
        render.commitModel.call(render, this, m, this._modelComponent.material);
      }

      return true;
    }

    return false;
  }

  update() {
    this._fitUIRenderQueue();
  }

  _fitUIRenderQueue() {
    if (!this._modelComponent) {
      return;
    }

    const matNum = this._modelComponent.sharedMaterials.length;

    for (let i = 0; i < matNum; i++) {
      const material = this._modelComponent.getMaterialInstance(i);

      if (material == null) {
        continue;
      }

      const passes = material.passes;
      const passNum = passes.length;

      for (let j = 0; j < passNum; j++) {
        const pass = passes[j]; // @ts-expect-error private property access

        pass._priority = _define.RenderPriority.MAX - 11;

        if (!pass.blendState.targets[0].blend) {
          material.overridePipelineStates({
            blendState: {
              targets: [{
                blend: true
              }]
            }
          }, j);
        }
      }
    }
  }

}, _temp)) || _class) || _class) || _class) || _class);
exports.UIMeshRenderer = UIMeshRenderer;