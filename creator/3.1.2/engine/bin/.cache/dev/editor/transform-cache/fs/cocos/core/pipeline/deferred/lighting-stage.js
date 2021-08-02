"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightingStage = void 0;

var _index = require("../../data/decorators/index.js");

var _builtinResMgr = require("../../builtin/builtin-res-mgr.js");

var _define = require("../define.js");

var _passPhase = require("../pass-phase.js");

var _index2 = require("../../gfx/index.js");

var _renderStage = require("../render-stage.js");

var _enum = require("./enum.js");

var _planarShadowQueue = require("../planar-shadow-queue.js");

var _material = require("../../assets/material.js");

var _memoryPools = require("../../renderer/core/memory-pools.js");

var _pipelineStateManager = require("../pipeline-state-manager.js");

var _index3 = require("../../geometry/index.js");

var _index4 = require("../../math/index.js");

var _pipelineFuncs = require("../pipeline-funcs.js");

var _renderQueue = require("../render-queue.js");

var _pipelineSerialization = require("../pipeline-serialization.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const colors = [new _index2.Color(0, 0, 0, 1)];
const LIGHTINGPASS_INDEX = 1;
/**
 * @en The lighting render stage
 * @zh 前向渲染阶段。
 */

let LightingStage = (_dec = (0, _index.ccclass)('LightingStage'), _dec2 = (0, _index.type)(_material.Material), _dec3 = (0, _index.displayOrder)(3), _dec4 = (0, _index.type)([_pipelineSerialization.RenderQueueDesc]), _dec5 = (0, _index.displayOrder)(2), _dec(_class = (_class2 = (_temp = _class3 = class LightingStage extends _renderStage.RenderStage {
  constructor(...args) {
    super(...args);
    this._deferredLitsBufs = null;
    this._maxDeferredLights = _define.UBODeferredLight.LIGHTS_PER_PASS;
    this._lightMeterScale = 10000.0;
    this._descriptorSet = null;
    this._renderArea = new _index2.Rect();

    _initializerDefineProperty(this, "_deferredMaterial", _descriptor, this);

    _initializerDefineProperty(this, "renderQueues", _descriptor2, this);

    this._phaseID = (0, _passPhase.getPhaseID)('default');
    this._defPhaseID = (0, _passPhase.getPhaseID)('deferred');
    this._renderQueues = [];
  }

  set material(val) {
    if (this._deferredMaterial === val) {
      return;
    }

    this._deferredMaterial = val;
  }

  initialize(info) {
    super.initialize(info);
    return true;
  }

  gatherLights(camera) {
    const pipeline = this._pipeline;
    const cmdBuff = pipeline.commandBuffers[0];
    const sphereLights = camera.scene.sphereLights;
    const spotLights = camera.scene.spotLights;

    const _sphere = _index3.Sphere.create(0, 0, 0, 1);

    const _vec4Array = new Float32Array(4);

    const exposure = camera.exposure;
    let idx = 0;
    const elementLen = _index4.Vec4.length; // sizeof(vec4) / sizeof(float32)

    const fieldLen = elementLen * this._maxDeferredLights;

    for (let i = 0; i < sphereLights.length && idx < this._maxDeferredLights; i++, ++idx) {
      const light = sphereLights[i];

      _index3.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (_index3.intersect.sphereFrustum(_sphere, camera.frustum)) {
        // cc_lightPos
        _index4.Vec3.toArray(_vec4Array, light.position);

        _vec4Array[3] = 0;

        this._lightBufferData.set(_vec4Array, idx * elementLen); // cc_lightColor


        _index4.Vec3.toArray(_vec4Array, light.color);

        if (light.useColorTemperature) {
          const tempRGB = light.colorTemperatureRGB;
          _vec4Array[0] *= tempRGB.x;
          _vec4Array[1] *= tempRGB.y;
          _vec4Array[2] *= tempRGB.z;
        }

        if (pipeline.pipelineSceneData.isHDR) {
          _vec4Array[3] = light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
        } else {
          _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
        }

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


        _vec4Array[0] = light.size;
        _vec4Array[1] = light.range;
        _vec4Array[2] = 0.0;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2);
      }
    }

    for (let i = 0; i < spotLights.length && idx < this._maxDeferredLights; i++, ++idx) {
      const light = spotLights[i];

      _index3.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (_index3.intersect.sphereFrustum(_sphere, camera.frustum)) {
        // cc_lightPos
        _index4.Vec3.toArray(_vec4Array, light.position);

        _vec4Array[3] = 1;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 0); // cc_lightColor


        _index4.Vec3.toArray(_vec4Array, light.color);

        if (light.useColorTemperature) {
          const tempRGB = light.colorTemperatureRGB;
          _vec4Array[0] *= tempRGB.x;
          _vec4Array[1] *= tempRGB.y;
          _vec4Array[2] *= tempRGB.z;
        }

        if (pipeline.pipelineSceneData.isHDR) {
          _vec4Array[3] = light.luminance * pipeline.pipelineSceneData.fpScale * this._lightMeterScale;
        } else {
          _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
        }

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 1); // cc_lightSizeRangeAngle


        _vec4Array[0] = light.size;
        _vec4Array[1] = light.range;
        _vec4Array[2] = light.spotAngle;

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 2); // cc_lightDir


        _index4.Vec3.toArray(_vec4Array, light.direction);

        this._lightBufferData.set(_vec4Array, idx * elementLen + fieldLen * 3);
      }
    } // the count of lights is set to cc_lightDir[0].w


    const offset = fieldLen * 3 + 3;

    this._lightBufferData.set([idx], offset);

    cmdBuff.updateBuffer(this._deferredLitsBufs, this._lightBufferData);
  }

  activate(pipeline, flow) {
    super.activate(pipeline, flow);
    const device = pipeline.device; // activate queue

    for (let i = 0; i < this.renderQueues.length; i++) {
      this._renderQueues[i] = (0, _renderQueue.convertRenderQueue)(this.renderQueues[i]);
    }

    let totalSize = Float32Array.BYTES_PER_ELEMENT * 4 * 4 * this._maxDeferredLights;
    totalSize = Math.ceil(totalSize / device.capabilities.uboOffsetAlignment) * device.capabilities.uboOffsetAlignment;
    this._deferredLitsBufs = device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.UNIFORM | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, totalSize, device.capabilities.uboOffsetAlignment));
    const deferredLitsBufView = device.createBuffer(new _index2.BufferViewInfo(this._deferredLitsBufs, 0, totalSize));
    this._lightBufferData = new Float32Array(totalSize / Float32Array.BYTES_PER_ELEMENT);
    const layoutInfo = new _index2.DescriptorSetLayoutInfo(_define.localDescriptorSetLayout.bindings);
    this._descriptorSetLayout = device.createDescriptorSetLayout(layoutInfo);
    this._descriptorSet = device.createDescriptorSet(new _index2.DescriptorSetInfo(this._descriptorSetLayout));

    this._descriptorSet.bindBuffer(_define.UBOForwardLight.BINDING, deferredLitsBufView);

    this._planarQueue = new _planarShadowQueue.PlanarShadowQueue(this._pipeline);
  }

  destroy() {
    this._deferredLitsBufs.destroy();

    this._deferredLitsBufs = null;
    this._descriptorSet = null;
  }

  render(camera) {
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const cmdBuff = pipeline.commandBuffers[0];
    const renderObjects = pipeline.pipelineSceneData.renderObjects;

    if (renderObjects.length === 0) {
      return;
    } // light信息


    this.gatherLights(camera);

    this._descriptorSet.update();

    this._planarQueue.gatherShadowPasses(camera, cmdBuff);

    const dynamicOffsets = [0];
    cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, this._descriptorSet, dynamicOffsets);
    this._renderArea = pipeline.generateRenderArea(camera);

    if (camera.clearFlag & _index2.ClearFlagBit.COLOR) {
      if (pipeline.pipelineSceneData.isHDR) {
        (0, _pipelineFuncs.SRGBToLinear)(colors[0], camera.clearColor);
        const scale = pipeline.pipelineSceneData.fpScale / camera.exposure;
        colors[0].x *= scale;
        colors[0].y *= scale;
        colors[0].z *= scale;
      } else {
        colors[0].x = camera.clearColor.x;
        colors[0].y = camera.clearColor.y;
        colors[0].z = camera.clearColor.z;
      }
    }

    colors[0].w = 0;
    const deferredData = pipeline.getDeferredRenderData(camera);
    const framebuffer = deferredData.lightingFrameBuffer;
    const renderPass = framebuffer.renderPass;
    cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
    cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, pipeline.descriptorSet); // Lighting

    let pass;
    let shader;

    const builinDeferred = _builtinResMgr.builtinResMgr.get('builtin-deferred-material');

    if (builinDeferred) {
      pass = builinDeferred.passes[0];
      shader = _memoryPools.ShaderPool.get(pass.getShaderVariant());
    } else {
      pass = this._deferredMaterial.passes[LIGHTINGPASS_INDEX];
      shader = _memoryPools.ShaderPool.get(this._deferredMaterial.passes[LIGHTINGPASS_INDEX].getShaderVariant());
    }

    const inputAssembler = pipeline.quadIAOffscreen;
    let pso = null;

    if (pass != null && shader != null && inputAssembler != null) {
      pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
    }

    if (pso != null) {
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindInputAssembler(inputAssembler);
      cmdBuff.draw(inputAssembler);
    } // Transparent


    this._renderQueues.forEach(_renderQueue.renderQueueClearFunc);

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
          const pass = passes[p]; // TODO: need fallback of ulit and gizmo material.

          if (pass.phase !== this._phaseID && pass.phase !== this._defPhaseID) continue;

          for (k = 0; k < this._renderQueues.length; k++) {
            this._renderQueues[k].insertRenderPass(ro, m, p);
          }
        }
      }
    }

    this._renderQueues.forEach(_renderQueue.renderQueueSortFunc);

    for (let i = 0; i < this._renderQueues.length; i++) {
      this._renderQueues[i].recordCommandBuffer(device, renderPass, cmdBuff);
    } // planarQueue


    this._planarQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    cmdBuff.endRenderPass();
  }

}, _class3.initInfo = {
  name: 'LightingStage',
  priority: _enum.DeferredStagePriority.LIGHTING,
  tag: 0
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_deferredMaterial", [_dec2, _index.serializable, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec4, _index.serializable, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.LightingStage = LightingStage;