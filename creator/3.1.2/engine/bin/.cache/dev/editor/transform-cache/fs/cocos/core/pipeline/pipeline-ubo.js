"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineUBO = void 0;

var _define = require("./define.js");

var _index = require("../gfx/index.js");

var _index2 = require("../math/index.js");

var _globalExports = require("../global-exports.js");

var _shadows = require("../renderer/scene/shadows.js");

var _sceneCulling = require("./scene-culling.js");

var _light = require("../renderer/scene/light.js");

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
const matShadowView = new _index2.Mat4();
const matShadowViewProj = new _index2.Mat4();
const vec3_center = new _index2.Vec3();
const vec4ShadowInfo = new _index2.Vec4();

class PipelineUBO {
  constructor() {
    this._globalUBO = new Float32Array(_define.UBOGlobal.COUNT);
    this._cameraUBO = new Float32Array(_define.UBOCamera.COUNT);
    this._shadowUBO = new Float32Array(_define.UBOShadow.COUNT);
  }

  static updateGlobalUBOView(pipeline, bufferView) {
    const device = pipeline.device;
    const root = _globalExports.legacyCC.director.root;
    const fv = bufferView;
    const shadingWidth = Math.floor(device.width);
    const shadingHeight = Math.floor(device.height); // update UBOGlobal

    fv[_define.UBOGlobal.TIME_OFFSET] = root.cumulativeTime;
    fv[_define.UBOGlobal.TIME_OFFSET + 1] = root.frameTime;
    fv[_define.UBOGlobal.TIME_OFFSET + 2] = _globalExports.legacyCC.director.getTotalFrames();
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET] = device.width;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 1] = device.height;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 2] = 1.0 / device.width;
    fv[_define.UBOGlobal.SCREEN_SIZE_OFFSET + 3] = 1.0 / device.height;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET] = shadingWidth;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 1] = shadingHeight;
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 2] = 1.0 / fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET];
    fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 3] = 1.0 / fv[_define.UBOGlobal.NATIVE_SIZE_OFFSET + 1];
  }

  static updateCameraUBOView(pipeline, bufferView, camera) {
    const device = pipeline.device;
    const scene = camera.scene ? camera.scene : _globalExports.legacyCC.director.getScene().renderScene;
    const mainLight = scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const ambient = sceneData.ambient;
    const fog = sceneData.fog;
    const shadingWidth = Math.floor(device.width);
    const shadingHeight = Math.floor(device.height);
    const cv = bufferView;
    const exposure = camera.exposure;
    const isHDR = sceneData.isHDR;
    const shadingScale = sceneData.shadingScale;
    const fpScale = sceneData.fpScale; // update camera ubo

    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET] = camera.width / shadingWidth * shadingScale;
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 1] = camera.height / shadingHeight * shadingScale;
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 2] = 1.0 / cv[_define.UBOCamera.SCREEN_SCALE_OFFSET];
    cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 3] = 1.0 / cv[_define.UBOCamera.SCREEN_SCALE_OFFSET + 1];
    cv[_define.UBOCamera.EXPOSURE_OFFSET] = exposure;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 1] = 1.0 / exposure;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 2] = isHDR ? 1.0 : 0.0;
    cv[_define.UBOCamera.EXPOSURE_OFFSET + 3] = fpScale / exposure;

    if (mainLight) {
      _index2.Vec3.toArray(cv, mainLight.direction, _define.UBOCamera.MAIN_LIT_DIR_OFFSET);

      _index2.Vec3.toArray(cv, mainLight.color, _define.UBOCamera.MAIN_LIT_COLOR_OFFSET);

      if (mainLight.useColorTemperature) {
        const colorTempRGB = mainLight.colorTemperatureRGB;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET] *= colorTempRGB.x;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 1] *= colorTempRGB.y;
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 2] *= colorTempRGB.z;
      }

      if (isHDR) {
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * fpScale;
      } else {
        cv[_define.UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * exposure;
      }
    } else {
      _index2.Vec3.toArray(cv, _index2.Vec3.UNIT_Z, _define.UBOCamera.MAIN_LIT_DIR_OFFSET);

      _index2.Vec4.toArray(cv, _index2.Vec4.ZERO, _define.UBOCamera.MAIN_LIT_COLOR_OFFSET);
    }

    const skyColor = ambient.colorArray;

    if (isHDR) {
      skyColor[3] = ambient.skyIllum * fpScale;
    } else {
      skyColor[3] = ambient.skyIllum * exposure;
    }

    cv.set(skyColor, _define.UBOCamera.AMBIENT_SKY_OFFSET);
    cv.set(ambient.albedoArray, _define.UBOCamera.AMBIENT_GROUND_OFFSET);

    _index2.Mat4.toArray(cv, camera.matView, _define.UBOCamera.MAT_VIEW_OFFSET);

    _index2.Mat4.toArray(cv, camera.node.worldMatrix, _define.UBOCamera.MAT_VIEW_INV_OFFSET);

    _index2.Vec3.toArray(cv, camera.position, _define.UBOCamera.CAMERA_POS_OFFSET);

    _index2.Mat4.toArray(cv, camera.matProj, _define.UBOCamera.MAT_PROJ_OFFSET);

    _index2.Mat4.toArray(cv, camera.matProjInv, _define.UBOCamera.MAT_PROJ_INV_OFFSET);

    _index2.Mat4.toArray(cv, camera.matViewProj, _define.UBOCamera.MAT_VIEW_PROJ_OFFSET);

    _index2.Mat4.toArray(cv, camera.matViewProjInv, _define.UBOCamera.MAT_VIEW_PROJ_INV_OFFSET);

    cv[_define.UBOCamera.CAMERA_POS_OFFSET + 3] = this.getCombineSignY();
    cv.set(fog.colorArray, _define.UBOCamera.GLOBAL_FOG_COLOR_OFFSET);
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET] = fog.fogStart;
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 1] = fog.fogEnd;
    cv[_define.UBOCamera.GLOBAL_FOG_BASE_OFFSET + 2] = fog.fogDensity;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET] = fog.fogTop;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 1] = fog.fogRange;
    cv[_define.UBOCamera.GLOBAL_FOG_ADD_OFFSET + 2] = fog.fogAtten;
  }

  static updateShadowUBOView(pipeline, bufferView, camera) {
    const device = pipeline.device;
    const mainLight = camera.scene.mainLight;
    const sceneData = pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    const sv = bufferView;

    if (shadowInfo.enabled) {
      if (mainLight && shadowInfo.type === _shadows.ShadowType.ShadowMap) {
        // light view
        let shadowCameraView; // light proj

        let x = 0;
        let y = 0;
        let far = 0;

        if (shadowInfo.autoAdapt) {
          shadowCameraView = (0, _sceneCulling.getShadowWorldMatrix)(pipeline, mainLight.node.getWorldRotation(), mainLight.direction, vec3_center); // if orthoSize is the smallest, auto calculate orthoSize.

          const radius = shadowInfo.sphere.radius;
          x = radius * shadowInfo.aspect;
          y = radius;

          const halfFar = _index2.Vec3.distance(shadowInfo.sphere.center, vec3_center);

          far = Math.min(halfFar * _shadows.Shadows.COEFFICIENT_OF_EXPANSION, _shadows.Shadows.MAX_FAR);
        } else {
          shadowCameraView = mainLight.node.getWorldMatrix();
          x = shadowInfo.orthoSize * shadowInfo.aspect;
          y = shadowInfo.orthoSize;
          far = shadowInfo.far;
        }

        _index2.Mat4.toArray(sv, shadowCameraView, _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        _index2.Mat4.invert(matShadowView, shadowCameraView);

        _index2.Mat4.ortho(matShadowViewProj, -x, x, -y, y, shadowInfo.near, far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

        _index2.Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);

        _index2.Mat4.toArray(sv, matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

        const isSupportHalfFloat = (0, _define.supportsHalfFloatTexture)(device);
        const linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 0] = shadowInfo.near;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 1] = far;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 2] = linear;
        sv[_define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 3] = shadowInfo.selfShadow ? 1.0 : 0.0;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
        sv[_define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
        const packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 0.0;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
        sv[_define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
      } else if (mainLight && shadowInfo.type === _shadows.ShadowType.Planar) {
        (0, _sceneCulling.updatePlanarPROJ)(shadowInfo, mainLight, sv);
      }

      _index2.Color.toArray(sv, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET);
    }
  }

  static updateShadowUBOLightView(pipeline, bufferView, light) {
    const device = pipeline.device;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const sv = bufferView;
    const isSupportHalfFloat = (0, _define.supportsHalfFloatTexture)(device);
    const linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
    const packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
    let _x = 0;
    let _y = 0;
    let _far = 0;
    let shadowCameraView;

    switch (light.type) {
      case _light.LightType.DIRECTIONAL:
        // light view
        light.update(); // light proj

        if (shadowInfo.autoAdapt) {
          const node = light.node;

          if (node) {
            shadowCameraView = (0, _sceneCulling.getShadowWorldMatrix)(pipeline, node.getWorldRotation(), light.direction, vec3_center);
          } // if orthoSize is the smallest, auto calculate orthoSize.


          const radius = shadowInfo.sphere.radius;
          _x = radius * shadowInfo.aspect;
          _y = radius;

          const halfFar = _index2.Vec3.distance(shadowInfo.sphere.center, vec3_center);

          _far = Math.min(halfFar * _shadows.Shadows.COEFFICIENT_OF_EXPANSION, _shadows.Shadows.MAX_FAR);
        } else {
          shadowCameraView = light.node.getWorldMatrix();
          _x = shadowInfo.orthoSize * shadowInfo.aspect;
          _y = shadowInfo.orthoSize;
          _far = shadowInfo.far;
        }

        _index2.Mat4.toArray(sv, shadowCameraView, _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        _index2.Mat4.invert(matShadowView, shadowCameraView);

        vec4ShadowInfo.set(shadowInfo.near, _far, linear, shadowInfo.selfShadow ? 1.0 : 0.0);

        _index2.Vec4.toArray(sv, vec4ShadowInfo, _define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET);

        vec4ShadowInfo.set(0.0, packing, shadowInfo.normalBias, 0.0);

        _index2.Vec4.toArray(sv, vec4ShadowInfo, _define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);

        _index2.Mat4.ortho(matShadowViewProj, -_x, _x, -_y, _y, shadowInfo.near, _far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);

        break;

      case _light.LightType.SPOT:
        // light view
        _index2.Mat4.toArray(sv, light.node.getWorldMatrix(), _define.UBOShadow.MAT_LIGHT_VIEW_OFFSET);

        _index2.Mat4.invert(matShadowView, light.node.getWorldMatrix());

        vec4ShadowInfo.set(0.01, light.range, linear, shadowInfo.selfShadow ? 1.0 : 0.0);

        _index2.Vec4.toArray(sv, vec4ShadowInfo, _define.UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET);

        vec4ShadowInfo.set(1.0, packing, shadowInfo.normalBias, 0.0);

        _index2.Vec4.toArray(sv, vec4ShadowInfo, _define.UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET); // light proj


        _index2.Mat4.perspective(matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range);

        break;

      default:
    } // light viewProj


    _index2.Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);

    _index2.Mat4.toArray(sv, matShadowViewProj, _define.UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);

    vec4ShadowInfo.set(shadowInfo.size.x, shadowInfo.size.y, shadowInfo.pcf, shadowInfo.bias);

    _index2.Vec4.toArray(sv, vec4ShadowInfo, _define.UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET);

    _index2.Color.toArray(sv, shadowInfo.shadowColor, _define.UBOShadow.SHADOW_COLOR_OFFSET);
  }

  /**
   *|combinedSignY|clipSpaceSignY|screenSpaceSignY| Backends |
   *|    :--:     |    :--:      |      :--:      |   :--:   |
   *|      0      |      -1      |      -1        |  Vulkan  |
   *|      1      |       1      |      -1        |  Metal   |
   *|      2      |      -1      |       1        |          |
   *|      3      |       1      |       1        |  GL-like |
   */
  static getCombineSignY() {
    return PipelineUBO._combineSignY;
  }

  _initCombineSignY() {
    const device = this._device;
    PipelineUBO._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
  }

  activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    const ds = this._pipeline.descriptorSet;

    this._initCombineSignY();

    const globalUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOGlobal.SIZE, _define.UBOGlobal.SIZE));
    ds.bindBuffer(_define.UBOGlobal.BINDING, globalUBO);
    const cameraUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOCamera.SIZE, _define.UBOCamera.SIZE));
    ds.bindBuffer(_define.UBOCamera.BINDING, cameraUBO);
    const shadowUBO = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOShadow.SIZE, _define.UBOShadow.SIZE));
    ds.bindBuffer(_define.UBOShadow.BINDING, shadowUBO);
  }
  /**
   * @en Update all UBOs
   * @zh 更新全部 UBO。
   */


  updateGlobalUBO() {
    const globalDSManager = this._pipeline.globalDSManager;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    ds.update();
    PipelineUBO.updateGlobalUBOView(this._pipeline, this._globalUBO);
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOGlobal.BINDING), this._globalUBO);
    globalDSManager.bindBuffer(_define.UBOGlobal.BINDING, ds.getBuffer(_define.UBOGlobal.BINDING));
    globalDSManager.update();
  }

  updateCameraUBO(camera) {
    const globalDSManager = this._pipeline.globalDSManager;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    PipelineUBO.updateCameraUBOView(this._pipeline, this._cameraUBO, camera);
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOCamera.BINDING), this._cameraUBO);
    globalDSManager.bindBuffer(_define.UBOCamera.BINDING, ds.getBuffer(_define.UBOCamera.BINDING));
    globalDSManager.update();
  }

  updateShadowUBO(camera) {
    const sceneData = this._pipeline.pipelineSceneData;
    const shadowInfo = sceneData.shadows;
    if (!shadowInfo.enabled) return;
    const ds = this._pipeline.descriptorSet;
    const cmdBuffer = this._pipeline.commandBuffers;
    const shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
    const mainLight = camera.scene.mainLight;
    ds.update();

    if (mainLight && shadowFrameBufferMap.has(mainLight)) {
      ds.bindTexture(_define.UNIFORM_SHADOWMAP_BINDING, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
    }

    PipelineUBO.updateShadowUBOView(this._pipeline, this._shadowUBO, camera);
    cmdBuffer[0].updateBuffer(ds.getBuffer(_define.UBOShadow.BINDING), this._shadowUBO);
  }

  updateShadowUBOLight(light) {
    const ds = this._pipeline.descriptorSet;
    PipelineUBO.updateShadowUBOLightView(this._pipeline, this._shadowUBO, light);
    ds.getBuffer(_define.UBOShadow.BINDING).update(this._shadowUBO);
  }

  updateShadowUBORange(offset, data) {
    if (data instanceof _index2.Mat4) {
      _index2.Mat4.toArray(this._shadowUBO, data, offset);
    } else if (data instanceof _index2.Color) {
      _index2.Color.toArray(this._shadowUBO, data, offset);
    }
  }

  destroy() {}

}

exports.PipelineUBO = PipelineUBO;
PipelineUBO._combineSignY = 0;