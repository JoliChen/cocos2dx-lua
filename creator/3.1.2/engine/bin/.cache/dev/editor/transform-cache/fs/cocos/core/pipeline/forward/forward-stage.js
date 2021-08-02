"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardStage = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _passPhase = require("../pass-phase.js");

var _renderQueue = require("../render-queue.js");

var _index2 = require("../../gfx/index.js");

var _pipelineFuncs = require("../pipeline-funcs.js");

var _renderBatchedQueue = require("../render-batched-queue.js");

var _renderInstancedQueue = require("../render-instanced-queue.js");

var _renderStage = require("../render-stage.js");

var _enum = require("./enum.js");

var _renderAdditiveLightQueue = require("../render-additive-light-queue.js");

var _instancedBuffer = require("../instanced-buffer.js");

var _batchedBuffer = require("../batched-buffer.js");

var _pass = require("../../renderer/core/pass.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _planarShadowQueue = require("../planar-shadow-queue.js");

var _uiPhase = require("./ui-phase.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const colors = [new _index2.Color(0, 0, 0, 1)];
/**
 * @en The forward render stage
 * @zh 前向渲染阶段。
 */

let ForwardStage = (_dec = (0, _index.ccclass)('ForwardStage'), _dec2 = (0, _index.type)([_pipelineSerialization.RenderQueueDesc]), _dec3 = (0, _index.displayOrder)(2), _dec(_class = (_class2 = (_temp = _class3 = class ForwardStage extends _renderStage.RenderStage {
  constructor() {
    super();

    _initializerDefineProperty(this, "renderQueues", _descriptor, this);

    this._renderQueues = [];
    this._renderArea = new _index2.Rect();
    this._batchedQueue = void 0;
    this._instancedQueue = void 0;
    this._phaseID = (0, _passPhase.getPhaseID)('default');
    this._clearFlag = 0xffffffff;
    this._batchedQueue = new _renderBatchedQueue.RenderBatchedQueue();
    this._instancedQueue = new _renderInstancedQueue.RenderInstancedQueue();
    this._uiPhase = new _uiPhase.UIPhase();
  }

  initialize(info) {
    super.initialize(info);

    if (info.renderQueues) {
      this.renderQueues = info.renderQueues;
    }

    return true;
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);

    for (let i = 0; i < this.renderQueues.length; i++) {
      this._renderQueues[i] = (0, _renderQueue.convertRenderQueue)(this.renderQueues[i]);
    }

    this._additiveLightQueue = new _renderAdditiveLightQueue.RenderAdditiveLightQueue(this._pipeline);
    this._planarQueue = new _planarShadowQueue.PlanarShadowQueue(this._pipeline);

    this._uiPhase.activate(pipeline);
  }

  destroy() {}

  render(camera) {
    this._instancedQueue.clear();

    this._batchedQueue.clear();

    const pipeline = this._pipeline;
    const device = pipeline.device;

    this._renderQueues.forEach(_renderQueue.renderQueueClearFunc);

    const renderObjects = pipeline.pipelineSceneData.renderObjects;
    let m = 0;
    let p = 0;
    let k = 0;

    for (let i = 0; i < renderObjects.length; ++i) {
      const ro = renderObjects[i];
      const subModels = ro.model.subModels;

      for (m = 0; m < subModels.length; ++m) {
        const subModel = subModels[m];
        const passes = subModel.passes;

        for (p = 0; p < passes.length; ++p) {
          const pass = passes[p];
          if (pass.phase !== this._phaseID) continue;
          const batchingScheme = pass.batchingScheme;

          if (batchingScheme === _pass.BatchingSchemes.INSTANCING) {
            const instancedBuffer = _instancedBuffer.InstancedBuffer.get(pass);

            instancedBuffer.merge(subModel, ro.model.instancedAttributes, p);

            this._instancedQueue.queue.add(instancedBuffer);
          } else if (batchingScheme === _pass.BatchingSchemes.VB_MERGING) {
            const batchedBuffer = _batchedBuffer.BatchedBuffer.get(pass);

            batchedBuffer.merge(subModel, p, ro.model);

            this._batchedQueue.queue.add(batchedBuffer);
          } else {
            for (k = 0; k < this._renderQueues.length; k++) {
              this._renderQueues[k].insertRenderPass(ro, m, p);
            }
          }
        }
      }
    }

    this._renderQueues.forEach(_renderQueue.renderQueueSortFunc);

    const cmdBuff = pipeline.commandBuffers[0];

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);

    this._additiveLightQueue.gatherLightPasses(camera, cmdBuff);

    this._planarQueue.gatherShadowPasses(camera, cmdBuff);

    const sceneData = pipeline.pipelineSceneData;
    this._renderArea = pipeline.generateRenderArea(camera);

    if (camera.clearFlag & _index2.ClearFlagBit.COLOR) {
      if (sceneData.isHDR) {
        (0, _pipelineFuncs.SRGBToLinear)(colors[0], camera.clearColor);
        const scale = sceneData.fpScale / camera.exposure;
        colors[0].x *= scale;
        colors[0].y *= scale;
        colors[0].z *= scale;
      } else {
        colors[0].x = camera.clearColor.x;
        colors[0].y = camera.clearColor.y;
        colors[0].z = camera.clearColor.z;
      }
    }

    colors[0].w = camera.clearColor.w;
    const framebuffer = camera.window.framebuffer;
    const renderPass = framebuffer.colorTextures[0] ? framebuffer.renderPass : pipeline.getRenderPass(camera.clearFlag & this._clearFlag);
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet);

    this._renderQueues[0].recordCommandBuffer(device, renderPass, cmdBuff);

    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._additiveLightQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._renderQueues[1].recordCommandBuffer(device, renderPass, cmdBuff);

    this._uiPhase.render(camera, renderPass);

    cmdBuff.endRenderPass();
  }

}, _class3.initInfo = {
  name: 'ForwardStage',
  priority: _enum.ForwardStagePriority.FORWARD,
  tag: 0,
  renderQueues: [{
    isTransparent: false,
    sortMode: _pipelineSerialization.RenderQueueSortMode.FRONT_TO_BACK,
    stages: ['default']
  }, {
    isTransparent: true,
    sortMode: _pipelineSerialization.RenderQueueSortMode.BACK_TO_FRONT,
    stages: ['default', 'planarShadow']
  }]
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.ForwardStage = ForwardStage;