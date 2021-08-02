"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderAdditiveLightQueue = void 0;

var _batchedBuffer = require("./batched-buffer.js");

var _pass = require("../renderer/core/pass.js");

var _instancedBuffer = require("./instanced-buffer.js");

var _pipelineStateManager = require("./pipeline-state-manager.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _index = require("../math/index.js");

var _index2 = require("../geometry/index.js");

var _index3 = require("../gfx/index.js");

var _index4 = require("../memop/index.js");

var _renderBatchedQueue = require("./render-batched-queue.js");

var _renderInstancedQueue = require("./render-instanced-queue.js");

var _passPhase = require("./pass-phase.js");

var _light = require("../renderer/scene/light.js");

var _define = require("./define.js");

var _sceneCulling = require("./scene-culling.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module pipeline
 */
const _lightPassPool = new _index4.Pool(() => ({
  subModel: null,
  passIdx: -1,
  dynamicOffsets: [],
  lights: []
}), 16);

const _vec4Array = new Float32Array(4);

const _sphere = _index2.Sphere.create(0, 0, 0, 1);

const _dynamicOffsets = [];
const _lightIndices = [];

const _matShadowView = new _index.Mat4();

const _matShadowViewProj = new _index.Mat4();

function cullSphereLight(light, model) {
  return !!(model.worldBounds && !_index2.intersect.aabbWithAABB(model.worldBounds, light.aabb));
}

function cullSpotLight(light, model) {
  return !!(model.worldBounds && (!_index2.intersect.aabbWithAABB(model.worldBounds, light.aabb) || !_index2.intersect.aabbFrustum(model.worldBounds, light.frustum)));
}

const _phaseID = (0, _passPhase.getPhaseID)('forward-add');

const _lightPassIndices = [];

function getLightPassIndices(subModels, lightPassIndices) {
  lightPassIndices.length = 0;
  let hasValidLightPass = false;

  for (let j = 0; j < subModels.length; j++) {
    const {
      passes
    } = subModels[j];
    let lightPassIndex = -1;

    for (let k = 0; k < passes.length; k++) {
      if (passes[k].phase === _phaseID) {
        lightPassIndex = k;
        hasValidLightPass = true;
        break;
      }
    }

    lightPassIndices.push(lightPassIndex);
  }

  return hasValidLightPass;
}
/**
 * @zh 叠加光照队列。
 */


class RenderAdditiveLightQueue {
  constructor(pipeline) {
    this._pipeline = void 0;
    this._device = void 0;
    this._validLights = [];
    this._lightPasses = [];
    this._shadowUBO = new Float32Array(_define.UBOShadow.COUNT);
    this._lightBufferCount = 16;
    this._lightBufferStride = void 0;
    this._lightBufferElementCount = void 0;
    this._lightBuffer = void 0;
    this._firstLightBufferView = void 0;
    this._lightBufferData = void 0;
    this._instancedQueue = void 0;
    this._batchedQueue = void 0;
    this._lightMeterScale = 10000.0;
    this._pipeline = pipeline;
    this._device = pipeline.device;
    this._instancedQueue = new _renderInstancedQueue.RenderInstancedQueue();
    this._batchedQueue = new _renderBatchedQueue.RenderBatchedQueue();
    const alignment = this._device.capabilities.uboOffsetAlignment;
    this._lightBufferStride = Math.ceil(_define.UBOForwardLight.SIZE / alignment) * alignment;
    this._lightBufferElementCount = this._lightBufferStride / Float32Array.BYTES_PER_ELEMENT;
    this._lightBuffer = this._device.createBuffer(new _index3.BufferInfo(_index3.BufferUsageBit.UNIFORM | _index3.BufferUsageBit.TRANSFER_DST, _index3.MemoryUsageBit.HOST | _index3.MemoryUsageBit.DEVICE, this._lightBufferStride * this._lightBufferCount, this._lightBufferStride));
    this._firstLightBufferView = this._device.createBuffer(new _index3.BufferViewInfo(this._lightBuffer, 0, _define.UBOForwardLight.SIZE));
    this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);
  }

  clear() {
    this._instancedQueue.clear();

    this._batchedQueue.clear();

    this._validLights.length = 0;

    for (let i = 0; i < this._lightPasses.length; i++) {
      const lp = this._lightPasses[i];
      lp.dynamicOffsets.length = 0;
      lp.lights.length = 0;
    }

    _lightPassPool.freeArray(this._lightPasses);

    this._lightPasses.length = 0;
  }

  destroy() {
    const descriptorSetMap = this._pipeline.globalDSManager.descriptorSetMap;
    const keys = descriptorSetMap.keys;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const descriptorSet = descriptorSetMap.get(key);

      if (descriptorSet) {
        descriptorSet.getBuffer(_define.UBOShadow.BINDING).destroy();
        descriptorSet.getSampler(_define.UNIFORM_SHADOWMAP_BINDING).destroy();
        descriptorSet.getSampler(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
        descriptorSet.getTexture(_define.UNIFORM_SHADOWMAP_BINDING).destroy();
        descriptorSet.getTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
        descriptorSet.destroy();
      }

      descriptorSetMap.delete(key);
    }
  }

  gatherLightPasses(camera, cmdBuff) {
    const validLights = this._validLights;
    this.clear();

    this._gatherValidLights(camera, validLights);

    if (!validLights.length) {
      return;
    }

    this._updateUBOs(camera, cmdBuff);

    this._updateLightDescriptorSet(camera, cmdBuff);

    const renderObjects = this._pipeline.pipelineSceneData.renderObjects;

    for (let i = 0; i < renderObjects.length; i++) {
      const ro = renderObjects[i];
      const {
        model
      } = ro;
      const {
        subModels
      } = model;

      if (!getLightPassIndices(subModels, _lightPassIndices)) {
        continue;
      }

      _lightIndices.length = 0;

      this._lightCulling(model, validLights);

      if (!_lightIndices.length) {
        continue;
      }

      for (let j = 0; j < subModels.length; j++) {
        const lightPassIdx = _lightPassIndices[j];

        if (lightPassIdx < 0) {
          continue;
        }

        const subModel = subModels[j];
        const pass = subModel.passes[lightPassIdx];
        subModel.descriptorSet.bindBuffer(_define.UBOForwardLight.BINDING, this._firstLightBufferView);
        subModel.descriptorSet.update();

        this._addRenderQueue(pass, subModel, model, lightPassIdx, validLights);
      }
    }

    this._instancedQueue.uploadBuffers(cmdBuff);

    this._batchedQueue.uploadBuffers(cmdBuff);
  }

  recordCommandBuffer(device, renderPass, cmdBuff) {
    this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

    const globalDSManager = this._pipeline.globalDSManager;

    for (let i = 0; i < this._lightPasses.length; i++) {
      const {
        subModel,
        passIdx,
        dynamicOffsets,
        lights
      } = this._lightPasses[i];

      const shader = _memoryPools.ShaderPool.get(_memoryPools.SubModelPool.get(subModel.handle, _memoryPools.SubModelView.SHADER_0 + passIdx));

      const pass = subModel.passes[passIdx];
      const ia = subModel.inputAssembler;

      const pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);

      const matDS = _memoryPools.DSPool.get(_memoryPools.PassPool.get(pass.handle, _memoryPools.PassView.DESCRIPTOR_SET));

      const localDS = subModel.descriptorSet;
      cmdBuff.bindPipelineState(pso);
      cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, matDS);
      cmdBuff.bindInputAssembler(ia);

      for (let j = 0; j < dynamicOffsets.length; ++j) {
        const light = lights[j];
        const descriptorSet = globalDSManager.getOrCreateDescriptorSet(light);
        _dynamicOffsets[0] = dynamicOffsets[j];
        cmdBuff.bindDescriptorSet(_define.SetIndex.GLOBAL, descriptorSet);
        cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, localDS, _dynamicOffsets);
        cmdBuff.draw(ia);
      }
    }
  } // gather validLights


  _gatherValidLights(camera, validLights) {
    const {
      sphereLights
    } = camera.scene;

    for (let i = 0; i < sphereLights.length; i++) {
      const light = sphereLights[i];

      if (light.baked) {
        continue;
      }

      _index2.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (_index2.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validLights.push(light);
      }
    }

    const {
      spotLights
    } = camera.scene;

    for (let i = 0; i < spotLights.length; i++) {
      const light = spotLights[i];

      if (light.baked) {
        continue;
      }

      _index2.Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

      if (_index2.intersect.sphereFrustum(_sphere, camera.frustum)) {
        validLights.push(light);
      }
    }
  } // light culling


  _lightCulling(model, validLights) {
    for (let l = 0; l < validLights.length; l++) {
      const light = validLights[l];
      let isCulled = false;

      switch (light.type) {
        case _light.LightType.SPHERE:
          isCulled = cullSphereLight(light, model);
          break;

        case _light.LightType.SPOT:
          isCulled = cullSpotLight(light, model);
          break;

        default:
      }

      if (!isCulled) {
        _lightIndices.push(l);
      }
    }
  } // add renderQueue


  _addRenderQueue(pass, subModel, model, lightPassIdx, validLights) {
    const {
      batchingScheme
    } = pass;

    if (batchingScheme === _pass.BatchingSchemes.INSTANCING) {
      // instancing
      for (let l = 0; l < _lightIndices.length; l++) {
        const idx = _lightIndices[l];

        const buffer = _instancedBuffer.InstancedBuffer.get(pass, idx);

        buffer.merge(subModel, model.instancedAttributes, lightPassIdx);
        buffer.dynamicOffsets[0] = this._lightBufferStride * idx;

        this._instancedQueue.queue.add(buffer);
      }
    } else if (batchingScheme === _pass.BatchingSchemes.VB_MERGING) {
      // vb-merging
      for (let l = 0; l < _lightIndices.length; l++) {
        const idx = _lightIndices[l];

        const buffer = _batchedBuffer.BatchedBuffer.get(pass, idx);

        buffer.merge(subModel, lightPassIdx, model);
        buffer.dynamicOffsets[0] = this._lightBufferStride * idx;

        this._batchedQueue.queue.add(buffer);
      }
    } else {
      // standard draw
      const lp = _lightPassPool.alloc();

      lp.subModel = subModel;
      lp.passIdx = lightPassIdx;

      for (let l = 0; l < _lightIndices.length; l++) {
        const idx = _lightIndices[l];
        lp.lights.push(idx);
        lp.dynamicOffsets.push(this._lightBufferStride * idx);
      }

      this._lightPasses.push(lp);
    }
  } // update light DescriptorSet


  _updateLightDescriptorSet(camera, cmdBuff) {
    const device = this._pipeline.device;
    const sceneData = this._pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    const shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
    const mainLight = camera.scene.mainLight;
    const isSupportHalfFloat = (0, _define.supportsHalfFloatTexture)(device);
    const linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
    const packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
    const globalDSManager = this._pipeline.globalDSManager;

    for (let i = 0; i < this._validLights.length; i++) {
      const light = this._validLights[i];
      const descriptorSet = globalDSManager.getOrCreateDescriptorSet(i);

      if (!descriptorSet) {
        continue;
      }

      switch (light.type) {
        case _light.LightType.SPHERE:
          // planar PROJ
          if (mainLight) {
            (0, _sceneCulling.updatePlanarPROJ)(shadowInfo, mainLight, this._shadowUBO);
          }

          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 2.0;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0; // Reserve sphere light shadow interface

          _index.Color.toArray(this._shadowUBO, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET);

          break;

        case _light.LightType.SPOT:
          // planar PROJ
          if (mainLight) {
            (0, _sceneCulling.updatePlanarPROJ)(shadowInfo, mainLight, this._shadowUBO);
          } // light view


          _index.Mat4.toArray(this._shadowUBO, light.node.getWorldMatrix(), _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

          _index.Mat4.invert(_matShadowView, light.node.getWorldMatrix()); // light proj


          _index.Mat4.perspective(_matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range); // light viewProj


          _index.Mat4.multiply(_matShadowViewProj, _matShadowViewProj, _matShadowView);

          _index.Mat4.toArray(this._shadowUBO, _matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

          this._shadowUBO[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 0] = 0.01;
          this._shadowUBO[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 1] = light.range;
          this._shadowUBO[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 2] = linear;
          this._shadowUBO[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 3] = shadowInfo.selfShadow ? 1.0 : 0.0;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
          this._shadowUBO[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 1.0;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
          this._shadowUBO[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;

          _index.Color.toArray(this._shadowUBO, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET); // Spot light sampler binding


          if (shadowFrameBufferMap.has(light)) {
            var _shadowFrameBufferMap;

            const texture = (_shadowFrameBufferMap = shadowFrameBufferMap.get(light)) === null || _shadowFrameBufferMap === void 0 ? void 0 : _shadowFrameBufferMap.colorTextures[0];

            if (texture) {
              descriptorSet.bindTexture(_define.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, texture);
            }
          }

          break;

        default:
      }

      descriptorSet.update();
      cmdBuff.updateBuffer(descriptorSet.getBuffer(_define.UBOShadow.BINDING), this._shadowUBO);
    }
  }

  _updateUBOs(camera, cmdBuff) {
    const {
      exposure
    } = camera;
    const sceneData = this._pipeline.pipelineSceneData;
    const isHDR = sceneData.isHDR;
    const fpScale = sceneData.fpScale;

    if (this._validLights.length > this._lightBufferCount) {
      this._firstLightBufferView.destroy();

      this._lightBufferCount = (0, _index.nextPow2)(this._validLights.length);

      this._lightBuffer.resize(this._lightBufferStride * this._lightBufferCount);

      this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);

      this._firstLightBufferView.initialize(new _index3.BufferViewInfo(this._lightBuffer, 0, _define.UBOForwardLight.SIZE));
    }

    for (let l = 0, offset = 0; l < this._validLights.length; l++, offset += this._lightBufferElementCount) {
      const light = this._validLights[l];

      switch (light.type) {
        case _light.LightType.SPHERE:
          // UBOForwardLight
          _index.Vec3.toArray(_vec4Array, light.position);

          _vec4Array[3] = 0;

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_POS_OFFSET);

          _vec4Array[0] = light.size;
          _vec4Array[1] = light.range;
          _vec4Array[2] = 0.0;

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

          _index.Vec3.toArray(_vec4Array, light.color);

          if (light.useColorTemperature) {
            const tempRGB = light.colorTemperatureRGB;
            _vec4Array[0] *= tempRGB.x;
            _vec4Array[1] *= tempRGB.y;
            _vec4Array[2] *= tempRGB.z;
          }

          if (isHDR) {
            _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
          } else {
            _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
          }

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_COLOR_OFFSET);

          break;

        case _light.LightType.SPOT:
          // UBOForwardLight
          _index.Vec3.toArray(_vec4Array, light.position);

          _vec4Array[3] = 1;

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_POS_OFFSET);

          _vec4Array[0] = light.size;
          _vec4Array[1] = light.range;
          _vec4Array[2] = light.spotAngle;

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

          _index.Vec3.toArray(_vec4Array, light.direction);

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_DIR_OFFSET);

          _index.Vec3.toArray(_vec4Array, light.color);

          if (light.useColorTemperature) {
            const tempRGB = light.colorTemperatureRGB;
            _vec4Array[0] *= tempRGB.x;
            _vec4Array[1] *= tempRGB.y;
            _vec4Array[2] *= tempRGB.z;
          }

          if (isHDR) {
            _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
          } else {
            _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
          }

          this._lightBufferData.set(_vec4Array, offset + _define.UBOForwardLight.LIGHT_COLOR_OFFSET);

          break;

        default:
      }
    }

    cmdBuff.updateBuffer(this._lightBuffer, this._lightBufferData);
  }

}

exports.RenderAdditiveLightQueue = RenderAdditiveLightQueue;