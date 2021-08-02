"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GbufferFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("./enum.js");

var _gbufferStage = require("./gbuffer-stage.js");

var _dec, _class, _class2, _temp;

/**
 * @en The gbuffer flow in deferred render pipeline
 * @zh 延迟渲染流程。
 */
let GbufferFlow = (_dec = (0, _index.ccclass)('GbufferFlow'), _dec(_class = (_temp = _class2 = class GbufferFlow extends _renderFlow.RenderFlow {
  /**
   * @en The shared initialization information of gbuffer render flow
   * @zh 共享的延迟渲染流程初始化参数
   */
  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      const gbufferStage = new _gbufferStage.GbufferStage();
      gbufferStage.initialize(_gbufferStage.GbufferStage.initInfo);

      this._stages.push(gbufferStage);
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
  name: _define.PIPELINE_FLOW_GBUFFER,
  priority: _enum.DeferredFlowPriority.GBUFFER,
  stages: []
}, _temp)) || _class);
exports.GbufferFlow = GbufferFlow;