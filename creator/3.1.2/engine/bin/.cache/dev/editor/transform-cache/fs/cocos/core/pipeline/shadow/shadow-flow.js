"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShadowFlow = void 0;

var _index = require("../../data/decorators/index.js");

var _define = require("../define.js");

var _renderFlow = require("../render-flow.js");

var _enum = require("../forward/enum.js");

var _shadowStage = require("./shadow-stage.js");

var _index2 = require("../../gfx/index.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _shadows = require("../../renderer/scene/shadows.js");

var _sceneCulling = require("../scene-culling.js");

var _dec, _class, _class2, _temp;

/**
 * @en Shadow map render flow
 * @zh 阴影贴图绘制流程
 */
let ShadowFlow = (_dec = (0, _index.ccclass)('ShadowFlow'), _dec(_class = (_temp = _class2 = class ShadowFlow extends _renderFlow.RenderFlow {
  constructor(...args) {
    super(...args);
    this._shadowRenderPass = null;
  }

  initialize(info) {
    super.initialize(info);

    if (this._stages.length === 0) {
      // add shadowMap-stages
      const shadowMapStage = new _shadowStage.ShadowStage();
      shadowMapStage.initialize(_shadowStage.ShadowStage.initInfo);

      this._stages.push(shadowMapStage);
    }

    return true;
  }

  render(camera) {
    const pipeline = this._pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const shadowObjects = pipeline.pipelineSceneData.shadowObjects;

    if (!shadowInfo.enabled || shadowInfo.type !== _shadows.ShadowType.ShadowMap) {
      return;
    }

    const validLights = (0, _sceneCulling.lightCollecting)(camera, shadowInfo.maxReceived);

    if (shadowObjects.length === 0) {
      this.clearShadowMap(validLights, camera);
      return;
    }

    for (let l = 0; l < validLights.length; l++) {
      const light = validLights[l];

      if (!shadowFrameBufferMap.has(light)) {
        this._initShadowFrameBuffer(pipeline, light);
      }

      const shadowFrameBuffer = shadowFrameBufferMap.get(light);

      if (shadowInfo.shadowMapDirty) {
        this.resizeShadowMap(light, shadowInfo);
      }

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(light, shadowFrameBuffer);
        shadowStage.render(camera);
      }
    } // After the shadowMap rendering of all lights is completed,
    // restore the ShadowUBO data of the main light.


    pipeline.pipelineUBO.updateShadowUBO(camera);
  }

  destroy() {
    super.destroy();
    const shadowFrameBufferMap = this._pipeline.pipelineSceneData.shadowFrameBufferMap;
    const shadowFrameBuffers = Array.from(shadowFrameBufferMap.values());

    for (let i = 0; i < shadowFrameBuffers.length; i++) {
      const frameBuffer = shadowFrameBuffers[i];

      if (!frameBuffer) {
        continue;
      }

      const renderTargets = frameBuffer.colorTextures;

      for (let j = 0; j < renderTargets.length; j++) {
        const renderTarget = renderTargets[i];

        if (renderTarget) {
          renderTarget.destroy();
        }
      }

      renderTargets.length = 0;
      const depth = frameBuffer.depthStencilTexture;

      if (depth) {
        depth.destroy();
      }

      frameBuffer.destroy();
    }

    shadowFrameBufferMap.clear();

    if (this._shadowRenderPass) {
      this._shadowRenderPass.destroy();
    }
  }

  _initShadowFrameBuffer(pipeline, light) {
    const device = pipeline.device;
    const shadows = pipeline.pipelineSceneData.shadows;
    const shadowMapSize = shadows.size;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const format = (0, _define.supportsHalfFloatTexture)(device) ? shadows.packing ? _index2.Format.RGBA8 : _index2.Format.RGBA16F : _index2.Format.RGBA8;

    if (!this._shadowRenderPass) {
      const colorAttachment = new _index2.ColorAttachment();
      colorAttachment.format = format;
      colorAttachment.loadOp = _index2.LoadOp.CLEAR; // should clear color attachment

      colorAttachment.storeOp = _index2.StoreOp.STORE;
      colorAttachment.sampleCount = 1;
      const depthStencilAttachment = new _index2.DepthStencilAttachment();
      depthStencilAttachment.format = device.depthStencilFormat;
      depthStencilAttachment.depthLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.depthStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.stencilLoadOp = _index2.LoadOp.CLEAR;
      depthStencilAttachment.stencilStoreOp = _index2.StoreOp.DISCARD;
      depthStencilAttachment.sampleCount = 1;
      const renderPassInfo = new _index2.RenderPassInfo([colorAttachment], depthStencilAttachment);
      this._shadowRenderPass = device.createRenderPass(renderPassInfo);
    }

    const shadowRenderTargets = [];
    shadowRenderTargets.push(device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, format, shadowMapSize.x, shadowMapSize.y)));
    const depth = device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.DEPTH_STENCIL_ATTACHMENT, device.depthStencilFormat, shadowMapSize.x, shadowMapSize.y));
    const shadowFrameBuffer = device.createFramebuffer(new _index2.FramebufferInfo(this._shadowRenderPass, shadowRenderTargets, depth)); // Cache frameBuffer

    shadowFrameBufferMap.set(light, shadowFrameBuffer);
  }

  clearShadowMap(validLights, camera) {
    const scene = this._pipeline.pipelineSceneData;

    for (let l = 0; l < validLights.length; l++) {
      const light = validLights[l];
      const shadowFrameBuffer = scene.shadowFrameBufferMap.get(light);

      if (!scene.shadowFrameBufferMap.has(light)) {
        continue;
      }

      for (let i = 0; i < this._stages.length; i++) {
        const shadowStage = this._stages[i];
        shadowStage.setUsage(light, shadowFrameBuffer);
        shadowStage.clearFramebuffer(camera);
      }
    }
  }

  resizeShadowMap(light, shadowInfo) {
    const width = shadowInfo.size.x;
    const height = shadowInfo.size.y;
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const shadowFrameBufferMap = pipeline.pipelineSceneData.shadowFrameBufferMap;
    const format = (0, _define.supportsHalfFloatTexture)(device) ? shadowInfo.packing ? _index2.Format.RGBA8 : _index2.Format.RGBA16F : _index2.Format.RGBA8;

    if (shadowFrameBufferMap.has(light)) {
      const frameBuffer = shadowFrameBufferMap.get(light);

      if (!frameBuffer) {
        return;
      }

      const renderTargets = [];
      renderTargets.push(pipeline.device.createTexture(new _index2.TextureInfo(_index2.TextureType.TEX2D, _index2.TextureUsageBit.COLOR_ATTACHMENT | _index2.TextureUsageBit.SAMPLED, format, width, height)));
      const depth = frameBuffer.depthStencilTexture;

      if (depth) {
        depth.resize(width, height);
      }

      const shadowRenderPass = frameBuffer.renderPass;
      frameBuffer.destroy();
      frameBuffer.initialize(new _index2.FramebufferInfo(shadowRenderPass, renderTargets, depth));
    }

    shadowInfo.shadowMapDirty = false;
  }

}, _class2.initInfo = {
  name: _define.PIPELINE_FLOW_SHADOW,
  priority: _enum.ForwardFlowPriority.SHADOW,
  tag: _pipelineSerialization.RenderFlowTag.SCENE,
  stages: []
}, _temp)) || _class);
exports.ShadowFlow = ShadowFlow;