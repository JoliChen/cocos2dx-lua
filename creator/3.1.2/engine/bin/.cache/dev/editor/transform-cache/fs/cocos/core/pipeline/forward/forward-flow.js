"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("./enum.js");

var _forwardStage = require("./forward-stage.js");

var _dec, _class, _class2, _temp;

/**
 * @en The forward flow in forward render pipeline
 * @zh 前向渲染流程。
 */
let ForwardFlow = (_dec = (0, _index.ccclass)('ForwardFlow'), _dec(_class = (_temp = _class2 = class ForwardFlow extends _renderFlow.RenderFlow {
  /**
   * @en The shared initialization information of forward render flow
   * @zh 共享的前向渲染流程初始化参数
   */
  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      const forwardStage = new _forwardStage.ForwardStage();
      forwardStage.initialize(_forwardStage.ForwardStage.initInfo);

      this._stages.push(forwardStage);
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
  name: _define.PIPELINE_FLOW_FORWARD,
  priority: _enum.ForwardFlowPriority.FORWARD,
  stages: []
}, _temp)) || _class);
exports.ForwardFlow = ForwardFlow;