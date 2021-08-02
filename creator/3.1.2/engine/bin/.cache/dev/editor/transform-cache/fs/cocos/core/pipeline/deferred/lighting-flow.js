"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightingFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("./enum.js");

var _lightingStage = require("./lighting-stage.js");

var _dec, _class, _class2, _temp;

/**
 * @en The lighting flow in lighting render pipeline
 * @zh 前向渲染流程。
 */
let LightingFlow = (_dec = (0, _index.ccclass)('LightingFlow'), _dec(_class = (_temp = _class2 = class LightingFlow extends _renderFlow.RenderFlow {
  /**
   * @en The shared initialization information of lighting render flow
   * @zh 共享的前向渲染流程初始化参数
   */
  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      const lightingStage = new _lightingStage.LightingStage();
      lightingStage.initialize(_lightingStage.LightingStage.initInfo);

      this._stages.push(lightingStage);
    }

    return true;
  }

  activate(pipeline) {
    super.activate(pipeline);
  }

  render(camera) {
    super.render(camera);
  }

  destroy() {
    super.destroy();
  }

}, _class2.initInfo = {
  name: _define.PIPELINE_FLOW_LIGHTING,
  priority: _enum.DeferredFlowPriority.LIGHTING,
  stages: []
}, _temp)) || _class);
exports.LightingFlow = LightingFlow;