"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShadowStage = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../gfx/index.js");

var _renderStage = require("../render-stage.js");

var _enum = require("../forward/enum.js");

var _renderShadowMapBatchedQueue = require("../render-shadow-map-batched-queue.js");

var _define = require("../define.js");

var _dec, _class, _class2, _temp;

const colors = [new _index2.Color(1, 1, 1, 1)];
/**
 * @en Shadow map render stage
 * @zh 阴影渲染阶段。
 */

let ShadowStage = (_dec = (0, _index.ccclass)('ShadowStage'), _dec(_class = (_temp = _class2 = class ShadowStage extends _renderStage.RenderStage {
  constructor(...args) {
    super(...args);
    this._shadowFrameBuffer = null;
    this._renderArea = new _index2.Rect();
    this._light = null;
  }

  /**
   * @en Sets the frame buffer for shadow map
   * @zh 设置阴影渲染的 FrameBuffer
   * @param light
   * @param shadowFrameBuffer
   */
  setUsage(light, shadowFrameBuffer) {
    this._light = light;
    this._shadowFrameBuffer = shadowFrameBuffer;
  }

  destroy() {
    this._additiveShadowQueue.clear();
  }

  clearFramebuffer(camera) {
    if (!this._light || !this._shadowFrameBuffer) {
      return;
    }

    colors[0].w = camera.clearColor.w;
    const pipeline = this._pipeline;
    const cmdBuff = pipeline.commandBuffers[0];
    const renderPass = this._shadowFrameBuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.endRenderPass();
  }

  render(camera) {
    const pipeline = this._pipeline;
    const pipelineSceneData = pipeline.pipelineSceneData;
    const shadowInfo = pipelineSceneData.shadows;
    const shadingScale = pipelineSceneData.shadingScale;
    const cmdBuff = pipeline.commandBuffers[0];

    if (!this._light || !this._shadowFrameBuffer) {
      return;
    }

    this._additiveShadowQueue.gatherLightPasses(this._light, cmdBuff);

    const vp = camera.viewport;
    const shadowMapSize = shadowInfo.size;
    this._renderArea.x = vp.x * shadowMapSize.x;
    this._renderArea.y = vp.y * shadowMapSize.y;
    this._renderArea.width = vp.width * shadowMapSize.x * shadingScale;
    this._renderArea.height = vp.height * shadowMapSize.y * shadingScale;
    const device = pipeline.device;
    const renderPass = this._shadowFrameBuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, this._shadowFrameBuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet);

    this._additiveShadowQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    cmdBuff.endRenderPass();
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);
    this._additiveShadowQueue = new _renderShadowMapBatchedQueue.RenderShadowMapBatchedQueue(pipeline);
  }

}, _class2.initInfo = {
  name: 'ShadowStage',
  priority: _enum.ForwardStagePriority.FORWARD,
  tag: 0
}, _temp)) || _class);
exports.ShadowStage = ShadowStage;