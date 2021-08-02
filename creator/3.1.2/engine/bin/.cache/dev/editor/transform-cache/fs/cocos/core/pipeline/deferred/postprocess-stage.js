"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostprocessStage = void 0;

var _index = require("../../data/decorators/index.js");

var _index2 = require("../../builtin/index.js");

var _define = require("../define.js");

var _index3 = require("../../gfx/index.js");

var _renderStage = require("../render-stage.js");

var _enum = require("./enum.js");

var _material = require("../../assets/material.js");

var _memoryPools = require("../../renderer/core/memory-pools.js");

var _pipelineStateManager = require("../pipeline-state-manager.js");

var _uiPhase = require("../forward/ui-phase.js");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const colors = [new _index3.Color(0, 0, 0, 1)];
const POSTPROCESSPASS_INDEX = 0;
/**
 * @en The postprocess render stage
 * @zh 前向渲染阶段。
 */

let PostprocessStage = (_dec = (0, _index.ccclass)('PostprocessStage'), _dec2 = (0, _index.type)(_material.Material), _dec3 = (0, _index.displayOrder)(3), _dec(_class = (_class2 = (_temp = _class3 = class PostprocessStage extends _renderStage.RenderStage {
  set material(val) {
    if (this._postprocessMaterial === val) {
      return;
    }

    this._postprocessMaterial = val;
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_postprocessMaterial", _descriptor, this);

    this._renderArea = new _index3.Rect();
    this._uiPhase = void 0;
    this._uiPhase = new _uiPhase.UIPhase();
  }

  initialize(info) {
    super.initialize(info);
    return true;
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);

    this._uiPhase.activate(pipeline);
  }

  destroy() {}

  render(camera) {
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const cmdBuff = pipeline.commandBuffers[0];
    pipeline.pipelineUBO.updateCameraUBO(camera);
    const vp = camera.viewport;
    this._renderArea.x = vp.x * camera.width;
    this._renderArea.y = vp.y * camera.height;
    this._renderArea.width = vp.width * camera.width * pipeline.pipelineSceneData.shadingScale;
    this._renderArea.height = vp.height * camera.height * pipeline.pipelineSceneData.shadingScale;
    const framebuffer = camera.window.framebuffer;
    const renderPass = framebuffer.colorTextures[0] ? framebuffer.renderPass : pipeline.getRenderPass(camera.clearFlag);

    if (camera.clearFlag & _index3.ClearFlagBit.COLOR) {
      colors[0].x = camera.clearColor.x;
      colors[0].y = camera.clearColor.y;
      colors[0].z = camera.clearColor.z;
    }

    colors[0].w = camera.clearColor.w;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet); // Postprocess

    let pass;
    let shader;

    const builtinPostProcess = _index2.builtinResMgr.get('builtin-post-process-material');

    if (builtinPostProcess) {
      pass = builtinPostProcess.passes[0];
      shader = _memoryPools.ShaderPool.get(pass.getShaderVariant());
    } else {
      pass = this._postprocessMaterial.passes[POSTPROCESSPASS_INDEX];
      shader = _memoryPools.ShaderPool.get(this._postprocessMaterial.passes[POSTPROCESSPASS_INDEX].getShaderVariant());
    }

    const inputAssembler = camera.window.hasOffScreenAttachments ? pipeline.quadIAOffscreen : pipeline.quadIAOnscreen;
    let pso = null;

    if (pass != null && shader != null && inputAssembler != null) {
      pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
    }

    const renderObjects = pipeline.pipelineSceneData.renderObjects;

    if (pso != null && renderObjects.length > 0) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    }

    this._uiPhase.render(camera, renderPass);

    cmdBuff.endRenderPass();
  }

}, _class3.initInfo = {
  name: 'PostprocessStage',
  priority: _enum.DeferredStagePriority.POSTPROCESS,
  tag: 0
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_postprocessMaterial", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.PostprocessStage = PostprocessStage;