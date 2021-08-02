"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForwardPipeline = void 0;

var _index = require("../../data/decorators/index.js");

var _renderPipeline = require("../render-pipeline.js");

var _forwardFlow = require("./forward-flow.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadowFlow = require("../shadow/shadow-flow.js");

var _define = require("../define.js");

var _index2 = require("../../gfx/index.js");

var _camera = require("../../renderer/scene/camera.js");

var _samplerLib = require("../../renderer/core/sampler-lib.js");

var _index3 = require("../../builtin/index.js");

var _debug = require("../../platform/debug.js");

var _sceneCulling = require("../scene-culling.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _samplerInfo = [_index2.Filter.POINT, _index2.Filter.POINT, _index2.Filter.NONE, _index2.Address.CLAMP, _index2.Address.CLAMP, _index2.Address.CLAMP];
/**
 * @en The forward render pipeline
 * @zh 前向渲染管线。
 */

let ForwardPipeline = (_dec = (0, _index.ccclass)('ForwardPipeline'), _dec2 = (0, _index.type)([_pipelineSerialization.RenderTextureConfig]), _dec3 = (0, _index.displayOrder)(2), _dec4 = (0, _index.type)([_pipelineSerialization.MaterialConfig]), _dec5 = (0, _index.displayOrder)(3), _dec(_class = (_class2 = (_temp = class ForwardPipeline extends _renderPipeline.RenderPipeline {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "renderTextures", _descriptor, this);

    _initializerDefineProperty(this, "materials", _descriptor2, this);

    this._renderPasses = new Map();
  }

  initialize(info) {
    super.initialize(info);

    if (this._flows.length === 0) {
      const shadowFlow = new _shadowFlow.ShadowFlow();
      shadowFlow.initialize(_shadowFlow.ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      const forwardFlow = new _forwardFlow.ForwardFlow();
      forwardFlow.initialize(_forwardFlow.ForwardFlow.initInfo);

      this._flows.push(forwardFlow);
    }

    return true;
  }

  activate() {
    if (!super.activate()) {
      return false;
    }

    if (!this._activeRenderer()) {
      (0, _debug.errorID)(2402);
      return false;
    }

    return true;
  }

  render(cameras) {
    this._commandBuffers[0].begin();

    this._pipelineUBO.updateGlobalUBO();

    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];

      if (camera.scene) {
        (0, _sceneCulling.sceneCulling)(this, camera);

        this._pipelineUBO.updateCameraUBO(camera);

        for (let j = 0; j < this._flows.length; j++) {
          this._flows[j].render(camera);
        }
      }
    }

    this._commandBuffers[0].end();

    this._device.flushCommands(this._commandBuffers);

    this._device.queue.submit(this._commandBuffers);
  }

  getRenderPass(clearFlags) {
    let renderPass = this._renderPasses.get(clearFlags);

    if (renderPass) {
      return renderPass;
    }

    const device = this.device;
    const colorAttachment = new _index2.ColorAttachment();
    const depthStencilAttachment = new _index2.DepthStencilAttachment();
    colorAttachment.format = device.colorFormat;
    depthStencilAttachment.format = device.depthStencilFormat;
    depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
    depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;

    if (!(clearFlags & _index2.ClearFlagBit.COLOR)) {
      if (clearFlags & _camera.SKYBOX_FLAG) {
        colorAttachment.loadOp = _index2.LoadOp.DISCARD;
      } else {
        colorAttachment.loadOp = _index2.LoadOp.LOAD;
        colorAttachment.beginAccesses = [_index2.AccessType.PRESENT];
      }
    }

    if ((clearFlags & _index2.ClearFlagBit.DEPTH_STENCIL) !== _index2.ClearFlagBit.DEPTH_STENCIL) {
      if (!(clearFlags & _index2.ClearFlagBit.DEPTH)) depthStencilAttachment.depthLoadOp = _index2.LoadOp.LOAD;
      if (!(clearFlags & _index2.ClearFlagBit.STENCIL)) depthStencilAttachment.stencilLoadOp = _index2.LoadOp.LOAD;
      depthStencilAttachment.beginAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
    }

    const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
    renderPass = device.createRenderPass(renderPassInfo);

    this._renderPasses.set(clearFlags, renderPass);

    return renderPass;
  }

  _activeRenderer() {
    const device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    const shadowMapSamplerHash = (0, _samplerLib.genSamplerHash)(_samplerInfo);

    const shadowMapSampler = _samplerLib.samplerLib.getSampler(device, shadowMapSamplerHash);

    this._descriptorSet.bindSampler(_define.UNIFORM_SHADOWMAP_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, _index3.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, shadowMapSampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _index3.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

    return true;
  }

  destroyUBOs() {
    if (this._descriptorSet) {
      this._descriptorSet.getBuffer(_define.UBOGlobal.BINDING).destroy();

      this._descriptorSet.getBuffer(_define.UBOShadow.BINDING).destroy();

      this._descriptorSet.getBuffer(_define.UBOCamera.BINDING).destroy();

      this._descriptorSet.getSampler(_define.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();

      this._descriptorSet.getTexture(_define.UNIFORM_SHADOWMAP_BINDING).destroy();

      this._descriptorSet.getTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
    }
  }

  destroy() {
    this.destroyUBOs();

    const rpIter = this._renderPasses.values();

    let rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return super.destroy();
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderTextures", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "materials", [_dec4, _index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.ForwardPipeline = ForwardPipeline;