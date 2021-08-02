"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredPipeline = exports.DeferredRenderData = void 0;

var _index = require("../../data/decorators/index.js");

var _samplerLib = require("../../renderer/core/sampler-lib.js");

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _renderPipeline = require("../render-pipeline.js");

var _gbufferFlow = require("./gbuffer-flow.js");

var _lightingFlow = require("./lighting-flow.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadowFlow = require("../shadow/shadow-flow.js");

var _index2 = require("../../gfx/index.js");

var _define = require("../define.js");

var _camera = require("../../renderer/scene/camera.js");

var _debug = require("../../platform/debug.js");

var _sceneCulling = require("../scene-culling.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _samplerInfo = [_index2.Filter.POINT, _index2.Filter.POINT, _index2.Filter.NONE, _index2.Address.CLAMP, _index2.Address.CLAMP, _index2.Address.CLAMP];
const samplerHash = (0, _samplerLib.genSamplerHash)(_samplerInfo);

class InputAssemblerData {
  constructor() {
    this.quadIB = null;
    this.quadVB = null;
    this.quadIA = null;
  }

}

class DeferredRenderData {
  constructor() {
    this.gbufferFrameBuffer = null;
    this.gbufferRenderTargets = [];
    this.lightingFrameBuffer = null;
    this.lightingRenderTargets = [];
    this.depthTex = null;
  }

}
/**
 * @en The deferred render pipeline
 * @zh 延迟渲染管线。
 */


exports.DeferredRenderData = DeferredRenderData;
let DeferredPipeline = (_dec = (0, _index.ccclass)('DeferredPipeline'), _dec2 = (0, _index.type)([_pipelineSerialization.RenderTextureConfig]), _dec3 = (0, _index.displayOrder)(2), _dec4 = (0, _index.type)([_pipelineSerialization.MaterialConfig]), _dec5 = (0, _index.displayOrder)(3), _dec(_class = (_class2 = (_temp = class DeferredPipeline extends _renderPipeline.RenderPipeline {
  constructor(...args) {
    super(...args);
    this._quadIB = null;
    this._quadVBOnscreen = null;
    this._quadVBOffscreen = null;
    this._quadIAOnscreen = null;
    this._quadIAOffscreen = null;
    this._deferredRenderData = null;
    this._gbufferRenderPass = null;
    this._lightingRenderPass = null;
    this._width = 0;
    this._height = 0;
    this._lastUsedRenderArea = new _index2.Rect();

    _initializerDefineProperty(this, "renderTextures", _descriptor, this);

    _initializerDefineProperty(this, "materials", _descriptor2, this);

    this._renderPasses = new Map();
  }

  /**
   * @zh
   * 四边形输入汇集器。
   */
  get quadIAOnscreen() {
    return this._quadIAOnscreen;
  }

  get quadIAOffscreen() {
    return this._quadIAOffscreen;
  }

  initialize(info) {
    super.initialize(info);

    if (this._flows.length === 0) {
      const shadowFlow = new _shadowFlow.ShadowFlow();
      shadowFlow.initialize(_shadowFlow.ShadowFlow.initInfo);

      this._flows.push(shadowFlow);

      const gbufferFlow = new _gbufferFlow.GbufferFlow();
      gbufferFlow.initialize(_gbufferFlow.GbufferFlow.initInfo);

      this._flows.push(gbufferFlow);

      const lightingFlow = new _lightingFlow.LightingFlow();
      lightingFlow.initialize(_lightingFlow.LightingFlow.initInfo);

      this._flows.push(lightingFlow);
    }

    return true;
  }

  activate() {
    this._macros.CC_PIPELINE_TYPE = 1;

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
    if (cameras.length === 0) {
      return;
    }

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

  getDeferredRenderData(camera) {
    if (!this._deferredRenderData) {
      this._generateDeferredRenderData();
    }

    return this._deferredRenderData;
  }

  _activeRenderer() {
    const device = this.device;

    this._commandBuffers.push(device.commandBuffer);

    const sampler = _samplerLib.samplerLib.getSampler(device, samplerHash);

    this._descriptorSet.bindSampler(_define.UNIFORM_SHADOWMAP_BINDING, sampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.bindSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, sampler);

    this._descriptorSet.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, _builtinResMgr.builtinResMgr.get('default-texture').getGFXTexture());

    this._descriptorSet.update();

    let inputAssemblerDataOffscreen = new InputAssemblerData();
    inputAssemblerDataOffscreen = this.createQuadInputAssembler(_index2.SurfaceTransform.IDENTITY);

    if (!inputAssemblerDataOffscreen.quadIB || !inputAssemblerDataOffscreen.quadVB || !inputAssemblerDataOffscreen.quadIA) {
      return false;
    }

    this._quadIB = inputAssemblerDataOffscreen.quadIB;
    this._quadVBOffscreen = inputAssemblerDataOffscreen.quadVB;
    this._quadIAOffscreen = inputAssemblerDataOffscreen.quadIA;
    const inputAssemblerDataOnscreen = this.createQuadInputAssembler(device.surfaceTransform);

    if (!inputAssemblerDataOnscreen.quadIB || !inputAssemblerDataOnscreen.quadVB || !inputAssemblerDataOnscreen.quadIA) {
      return false;
    }

    this._quadVBOnscreen = inputAssemblerDataOnscreen.quadVB;
    this._quadIAOnscreen = inputAssemblerDataOnscreen.quadIA;

    if (!this._gbufferRenderPass) {
      const colorAttachment0 = new _index2.ColorAttachment();
      colorAttachment0.format = _index2.Format.RGBA16F;
      colorAttachment0.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment0.storeOp = _index2.StoreOp.STORE;
      const colorAttachment1 = new _index2.ColorAttachment();
      colorAttachment1.format = _index2.Format.RGBA16F;
      colorAttachment1.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment1.storeOp = _index2.StoreOp.STORE;
      const colorAttachment2 = new _index2.ColorAttachment();
      colorAttachment2.format = _index2.Format.RGBA16F;
      colorAttachment2.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment2.storeOp = _index2.StoreOp.STORE;
      const colorAttachment3 = new _index2.ColorAttachment();
      colorAttachment3.format = _index2.Format.RGBA16F;
      colorAttachment3.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment3.storeOp = _index2.StoreOp.STORE;
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = device.depthStencilFormat;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.STORE;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.STORE;
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment0, colorAttachment1, colorAttachment2, colorAttachment3], depthStencilAttachment);
      this._gbufferRenderPass = device.createRenderPass(renderPassInfo);
    }

    if (!this._lightingRenderPass) {
      const colorAttachment = new _index2.ColorAttachment();
      colorAttachment.format = _index2.Format.RGBA16F;
      colorAttachment.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment.storeOp = _index2.StoreOp.STORE;
      colorAttachment.endAccesses = [_index2.AccessType.COLOR_ATTACHMENT_WRITE];
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = device.depthStencilFormat;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.LOAD;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.LOAD;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.beginAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
      depthStencilAttachment.endAccesses = [_index2.AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE];
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
      this._lightingRenderPass = device.createRenderPass(renderPassInfo);
    }

    this._width = device.width;
    this._height = device.height;

    this._generateDeferredRenderData();

    if (device.surfaceTransform === _index2.SurfaceTransform.IDENTITY || device.surfaceTransform === _index2.SurfaceTransform.ROTATE_180) {
      this._width = device.width;
      this._height = device.height;
    } else {
      this._width = device.height;
      this._height = device.width;
    }

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

  destroyDeferredData() {
    const deferredData = this._deferredRenderData;

    if (deferredData) {
      if (deferredData.gbufferFrameBuffer) deferredData.gbufferFrameBuffer.destroy();
      if (deferredData.lightingFrameBuffer) deferredData.lightingFrameBuffer.destroy();
      if (deferredData.depthTex) deferredData.depthTex.destroy();

      for (let i = 0; i < deferredData.gbufferRenderTargets.length; i++) {
        deferredData.gbufferRenderTargets[i].destroy();
      }

      deferredData.gbufferRenderTargets.length = 0;

      for (let i = 0; i < deferredData.lightingRenderTargets.length; i++) {
        deferredData.lightingRenderTargets[i].destroy();
      }

      deferredData.lightingRenderTargets.length = 0;
    }

    this._deferredRenderData = null;
  }

  destroy() {
    this.destroyUBOs();
    this.destroyQuadInputAssembler();
    this.destroyDeferredData();

    const rpIter = this._renderPasses.values();

    let rpRes = rpIter.next();

    while (!rpRes.done) {
      rpRes.value.destroy();
      rpRes = rpIter.next();
    }

    this._commandBuffers.length = 0;
    return super.destroy();
  }

  resize(width, height) {
    if (this._width === width && this._height === height) {
      return;
    }

    this._width = width;
    this._height = height;
    this.destroyDeferredData();

    this._generateDeferredRenderData();
  }
  /**
   * @zh
   * 创建四边形输入汇集器。
   */


  createQuadInputAssembler(surfaceTransform) {
    // create vertex buffer
    const inputAssemblerData = new InputAssemblerData();
    const vbStride = Float32Array.BYTES_PER_ELEMENT * 4;
    const vbSize = vbStride * 4;

    const quadVB = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.VERTEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, vbSize, vbStride));

    if (!quadVB) {
      return inputAssemblerData;
    } // create index buffer


    const ibStride = Uint8Array.BYTES_PER_ELEMENT;
    const ibSize = ibStride * 6;

    const quadIB = this._device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.INDEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, ibSize, ibStride));

    if (!quadIB) {
      return inputAssemblerData;
    }

    const indices = new Uint8Array(6);
    indices[0] = 0;
    indices[1] = 1;
    indices[2] = 2;
    indices[3] = 1;
    indices[4] = 3;
    indices[5] = 2;
    quadIB.update(indices); // create input assembler

    const attributes = new Array(2);
    attributes[0] = new _index2.Attribute('a_position', _index2.Format.RG32F);
    attributes[1] = new _index2.Attribute('a_texCoord', _index2.Format.RG32F);

    const quadIA = this._device.createInputAssembler(new _index2.InputAssemblerInfo(attributes, [quadVB], quadIB));

    inputAssemblerData.quadIB = quadIB;
    inputAssemblerData.quadVB = quadVB;
    inputAssemblerData.quadIA = quadIA;
    return inputAssemblerData;
  }

  updateQuadVertexData(renderArea) {
    if (this._lastUsedRenderArea === renderArea) {
      return;
    }

    this._lastUsedRenderArea = renderArea;
    const offData = this.genQuadVertexData(_index2.SurfaceTransform.IDENTITY, renderArea);

    this._quadVBOffscreen.update(offData);

    const onData = this.genQuadVertexData(this.device.surfaceTransform, renderArea);

    this._quadVBOnscreen.update(onData);
  }

  genQuadVertexData(surfaceTransform, renderArea) {
    const vbData = new Float32Array(4 * 4);
    const minX = renderArea.x / this.device.width;
    const maxX = (renderArea.x + renderArea.width) / this.device.width;
    let minY = renderArea.y / this.device.height;
    let maxY = (renderArea.y + renderArea.height) / this.device.height;

    if (this.device.capabilities.screenSpaceSignY > 0) {
      const temp = maxY;
      maxY = minY;
      minY = temp;
    }

    let n = 0;

    switch (surfaceTransform) {
      case _index2.SurfaceTransform.IDENTITY:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        break;

      case _index2.SurfaceTransform.ROTATE_90:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        break;

      case _index2.SurfaceTransform.ROTATE_180:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        break;

      case _index2.SurfaceTransform.ROTATE_270:
        n = 0;
        vbData[n++] = -1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = -1.0;
        vbData[n++] = minX;
        vbData[n++] = maxY;
        vbData[n++] = -1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = minY;
        vbData[n++] = 1.0;
        vbData[n++] = 1.0;
        vbData[n++] = maxX;
        vbData[n++] = maxY;
        break;

      default:
        break;
    }

    return vbData;
  }
  /**
   * @zh
   * 销毁四边形输入汇集器。
   */


  destroyQuadInputAssembler() {
    if (this._quadIB) {
      this._quadIB.destroy();

      this._quadIB = null;
    }

    if (this._quadVBOnscreen) {
      this._quadVBOnscreen.destroy();

      this._quadVBOnscreen = null;
    }

    if (this._quadVBOffscreen) {
      this._quadVBOffscreen.destroy();

      this._quadVBOffscreen = null;
    }

    if (this._quadIAOnscreen) {
      this._quadIAOnscreen.destroy();

      this._quadIAOnscreen = null;
    }

    if (this._quadIAOffscreen) {
      this._quadIAOffscreen.destroy();

      this._quadIAOffscreen = null;
    }
  }

  _generateDeferredRenderData() {
    const device = this.device;
    const data = this._deferredRenderData = new DeferredRenderData();
    data.gbufferRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width, this._height)));
    data.gbufferRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width, this._height)));
    data.depthTex = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, this._width, this._height));
    data.gbufferFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._gbufferRenderPass, data.gbufferRenderTargets, data.depthTex));
    data.lightingRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, _index2.Format.RGBA16F, this._width, this._height)));
    data.lightingFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._lightingRenderPass, data.lightingRenderTargets, data.depthTex));

    this._descriptorSet.bindTexture(_define.UNIFORM_GBUFFER_ALBEDOMAP_BINDING, data.gbufferFrameBuffer.colorTextures[0]);

    this._descriptorSet.bindTexture(_define.UNIFORM_GBUFFER_POSITIONMAP_BINDING, data.gbufferFrameBuffer.colorTextures[1]);

    this._descriptorSet.bindTexture(_define.UNIFORM_GBUFFER_NORMALMAP_BINDING, data.gbufferFrameBuffer.colorTextures[2]);

    this._descriptorSet.bindTexture(_define.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, data.gbufferFrameBuffer.colorTextures[3]);

    this._descriptorSet.bindTexture(_define.UNIFORM_LIGHTING_RESULTMAP_BINDING, data.lightingFrameBuffer.colorTextures[0]);

    const sampler = _samplerLib.samplerLib.getSampler(device, samplerHash);

    this._descriptorSet.bindSampler(_define.UNIFORM_GBUFFER_ALBEDOMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(_define.UNIFORM_GBUFFER_POSITIONMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(_define.UNIFORM_GBUFFER_NORMALMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(_define.UNIFORM_GBUFFER_EMISSIVEMAP_BINDING, sampler);

    this._descriptorSet.bindSampler(_define.UNIFORM_LIGHTING_RESULTMAP_BINDING, sampler);
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
exports.DeferredPipeline = DeferredPipeline;