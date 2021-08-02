System.register("q-bundled:///fs/cocos/core/pipeline/pipeline-ubo.js", ["./define.js", "../gfx/index.js", "../math/index.js", "../global-exports.js", "../renderer/scene/shadows.js", "./scene-culling.js", "../renderer/scene/light.js"], function (_export, _context) {
  "use strict";

  var UBOGlobal, UBOShadow, UBOCamera, UNIFORM_SHADOWMAP_BINDING, supportsHalfFloatTexture, BufferInfo, BufferUsageBit, MemoryUsageBit, Mat4, Vec3, Vec4, Color, legacyCC, Shadows, ShadowType, getShadowWorldMatrix, updatePlanarPROJ, LightType, matShadowView, matShadowViewProj, vec3_center, vec4ShadowInfo, PipelineUBO;
  return {
    setters: [function (_defineJs) {
      UBOGlobal = _defineJs.UBOGlobal;
      UBOShadow = _defineJs.UBOShadow;
      UBOCamera = _defineJs.UBOCamera;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      supportsHalfFloatTexture = _defineJs.supportsHalfFloatTexture;
    }, function (_gfxIndexJs) {
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
      Color = _mathIndexJs.Color;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_rendererSceneShadowsJs) {
      Shadows = _rendererSceneShadowsJs.Shadows;
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_sceneCullingJs) {
      getShadowWorldMatrix = _sceneCullingJs.getShadowWorldMatrix;
      updatePlanarPROJ = _sceneCullingJs.updatePlanarPROJ;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }],
    execute: function () {
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
      matShadowView = new Mat4();
      matShadowViewProj = new Mat4();
      vec3_center = new Vec3();
      vec4ShadowInfo = new Vec4();

      _export("PipelineUBO", PipelineUBO = /*#__PURE__*/function () {
        function PipelineUBO() {
          this._globalUBO = new Float32Array(UBOGlobal.COUNT);
          this._cameraUBO = new Float32Array(UBOCamera.COUNT);
          this._shadowUBO = new Float32Array(UBOShadow.COUNT);
        }

        PipelineUBO.updateGlobalUBOView = function updateGlobalUBOView(pipeline, bufferView) {
          var device = pipeline.device;
          var root = legacyCC.director.root;
          var fv = bufferView;
          var shadingWidth = Math.floor(device.width);
          var shadingHeight = Math.floor(device.height); // update UBOGlobal

          fv[UBOGlobal.TIME_OFFSET] = root.cumulativeTime;
          fv[UBOGlobal.TIME_OFFSET + 1] = root.frameTime;
          fv[UBOGlobal.TIME_OFFSET + 2] = legacyCC.director.getTotalFrames();
          fv[UBOGlobal.SCREEN_SIZE_OFFSET] = device.width;
          fv[UBOGlobal.SCREEN_SIZE_OFFSET + 1] = device.height;
          fv[UBOGlobal.SCREEN_SIZE_OFFSET + 2] = 1.0 / device.width;
          fv[UBOGlobal.SCREEN_SIZE_OFFSET + 3] = 1.0 / device.height;
          fv[UBOGlobal.NATIVE_SIZE_OFFSET] = shadingWidth;
          fv[UBOGlobal.NATIVE_SIZE_OFFSET + 1] = shadingHeight;
          fv[UBOGlobal.NATIVE_SIZE_OFFSET + 2] = 1.0 / fv[UBOGlobal.NATIVE_SIZE_OFFSET];
          fv[UBOGlobal.NATIVE_SIZE_OFFSET + 3] = 1.0 / fv[UBOGlobal.NATIVE_SIZE_OFFSET + 1];
        };

        PipelineUBO.updateCameraUBOView = function updateCameraUBOView(pipeline, bufferView, camera) {
          var device = pipeline.device;
          var scene = camera.scene ? camera.scene : legacyCC.director.getScene().renderScene;
          var mainLight = scene.mainLight;
          var sceneData = pipeline.pipelineSceneData;
          var ambient = sceneData.ambient;
          var fog = sceneData.fog;
          var shadingWidth = Math.floor(device.width);
          var shadingHeight = Math.floor(device.height);
          var cv = bufferView;
          var exposure = camera.exposure;
          var isHDR = sceneData.isHDR;
          var shadingScale = sceneData.shadingScale;
          var fpScale = sceneData.fpScale; // update camera ubo

          cv[UBOCamera.SCREEN_SCALE_OFFSET] = camera.width / shadingWidth * shadingScale;
          cv[UBOCamera.SCREEN_SCALE_OFFSET + 1] = camera.height / shadingHeight * shadingScale;
          cv[UBOCamera.SCREEN_SCALE_OFFSET + 2] = 1.0 / cv[UBOCamera.SCREEN_SCALE_OFFSET];
          cv[UBOCamera.SCREEN_SCALE_OFFSET + 3] = 1.0 / cv[UBOCamera.SCREEN_SCALE_OFFSET + 1];
          cv[UBOCamera.EXPOSURE_OFFSET] = exposure;
          cv[UBOCamera.EXPOSURE_OFFSET + 1] = 1.0 / exposure;
          cv[UBOCamera.EXPOSURE_OFFSET + 2] = isHDR ? 1.0 : 0.0;
          cv[UBOCamera.EXPOSURE_OFFSET + 3] = fpScale / exposure;

          if (mainLight) {
            Vec3.toArray(cv, mainLight.direction, UBOCamera.MAIN_LIT_DIR_OFFSET);
            Vec3.toArray(cv, mainLight.color, UBOCamera.MAIN_LIT_COLOR_OFFSET);

            if (mainLight.useColorTemperature) {
              var colorTempRGB = mainLight.colorTemperatureRGB;
              cv[UBOCamera.MAIN_LIT_COLOR_OFFSET] *= colorTempRGB.x;
              cv[UBOCamera.MAIN_LIT_COLOR_OFFSET + 1] *= colorTempRGB.y;
              cv[UBOCamera.MAIN_LIT_COLOR_OFFSET + 2] *= colorTempRGB.z;
            }

            if (isHDR) {
              cv[UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * fpScale;
            } else {
              cv[UBOCamera.MAIN_LIT_COLOR_OFFSET + 3] = mainLight.illuminance * exposure;
            }
          } else {
            Vec3.toArray(cv, Vec3.UNIT_Z, UBOCamera.MAIN_LIT_DIR_OFFSET);
            Vec4.toArray(cv, Vec4.ZERO, UBOCamera.MAIN_LIT_COLOR_OFFSET);
          }

          var skyColor = ambient.colorArray;

          if (isHDR) {
            skyColor[3] = ambient.skyIllum * fpScale;
          } else {
            skyColor[3] = ambient.skyIllum * exposure;
          }

          cv.set(skyColor, UBOCamera.AMBIENT_SKY_OFFSET);
          cv.set(ambient.albedoArray, UBOCamera.AMBIENT_GROUND_OFFSET);
          Mat4.toArray(cv, camera.matView, UBOCamera.MAT_VIEW_OFFSET);
          Mat4.toArray(cv, camera.node.worldMatrix, UBOCamera.MAT_VIEW_INV_OFFSET);
          Vec3.toArray(cv, camera.position, UBOCamera.CAMERA_POS_OFFSET);
          Mat4.toArray(cv, camera.matProj, UBOCamera.MAT_PROJ_OFFSET);
          Mat4.toArray(cv, camera.matProjInv, UBOCamera.MAT_PROJ_INV_OFFSET);
          Mat4.toArray(cv, camera.matViewProj, UBOCamera.MAT_VIEW_PROJ_OFFSET);
          Mat4.toArray(cv, camera.matViewProjInv, UBOCamera.MAT_VIEW_PROJ_INV_OFFSET);
          cv[UBOCamera.CAMERA_POS_OFFSET + 3] = this.getCombineSignY();
          cv.set(fog.colorArray, UBOCamera.GLOBAL_FOG_COLOR_OFFSET);
          cv[UBOCamera.GLOBAL_FOG_BASE_OFFSET] = fog.fogStart;
          cv[UBOCamera.GLOBAL_FOG_BASE_OFFSET + 1] = fog.fogEnd;
          cv[UBOCamera.GLOBAL_FOG_BASE_OFFSET + 2] = fog.fogDensity;
          cv[UBOCamera.GLOBAL_FOG_ADD_OFFSET] = fog.fogTop;
          cv[UBOCamera.GLOBAL_FOG_ADD_OFFSET + 1] = fog.fogRange;
          cv[UBOCamera.GLOBAL_FOG_ADD_OFFSET + 2] = fog.fogAtten;
        };

        PipelineUBO.updateShadowUBOView = function updateShadowUBOView(pipeline, bufferView, camera) {
          var device = pipeline.device;
          var mainLight = camera.scene.mainLight;
          var sceneData = pipeline.pipelineSceneData;
          var shadowInfo = sceneData.shadows;
          var sv = bufferView;

          if (shadowInfo.enabled) {
            if (mainLight && shadowInfo.type === ShadowType.ShadowMap) {
              // light view
              var shadowCameraView; // light proj

              var x = 0;
              var y = 0;
              var far = 0;

              if (shadowInfo.autoAdapt) {
                shadowCameraView = getShadowWorldMatrix(pipeline, mainLight.node.getWorldRotation(), mainLight.direction, vec3_center); // if orthoSize is the smallest, auto calculate orthoSize.

                var radius = shadowInfo.sphere.radius;
                x = radius * shadowInfo.aspect;
                y = radius;
                var halfFar = Vec3.distance(shadowInfo.sphere.center, vec3_center);
                far = Math.min(halfFar * Shadows.COEFFICIENT_OF_EXPANSION, Shadows.MAX_FAR);
              } else {
                shadowCameraView = mainLight.node.getWorldMatrix();
                x = shadowInfo.orthoSize * shadowInfo.aspect;
                y = shadowInfo.orthoSize;
                far = shadowInfo.far;
              }

              Mat4.toArray(sv, shadowCameraView, UBOShadow.MAT_LIGHT_VIEW_OFFSET);
              Mat4.invert(matShadowView, shadowCameraView);
              Mat4.ortho(matShadowViewProj, -x, x, -y, y, shadowInfo.near, far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);
              Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);
              Mat4.toArray(sv, matShadowViewProj, UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
              var isSupportHalfFloat = supportsHalfFloatTexture(device);
              var linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
              sv[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 0] = shadowInfo.near;
              sv[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 1] = far;
              sv[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 2] = linear;
              sv[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 3] = shadowInfo.selfShadow ? 1.0 : 0.0;
              sv[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
              sv[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
              sv[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
              sv[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
              var packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
              sv[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 0.0;
              sv[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
              sv[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
              sv[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
            } else if (mainLight && shadowInfo.type === ShadowType.Planar) {
              updatePlanarPROJ(shadowInfo, mainLight, sv);
            }

            Color.toArray(sv, shadowInfo.shadowColor, UBOShadow.SHADOW_COLOR_OFFSET);
          }
        };

        PipelineUBO.updateShadowUBOLightView = function updateShadowUBOLightView(pipeline, bufferView, light) {
          var device = pipeline.device;
          var shadowInfo = pipeline.pipelineSceneData.shadows;
          var sv = bufferView;
          var isSupportHalfFloat = supportsHalfFloatTexture(device);
          var linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
          var packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
          var _x = 0;
          var _y = 0;
          var _far = 0;
          var shadowCameraView;

          switch (light.type) {
            case LightType.DIRECTIONAL:
              // light view
              light.update(); // light proj

              if (shadowInfo.autoAdapt) {
                var node = light.node;

                if (node) {
                  shadowCameraView = getShadowWorldMatrix(pipeline, node.getWorldRotation(), light.direction, vec3_center);
                } // if orthoSize is the smallest, auto calculate orthoSize.


                var radius = shadowInfo.sphere.radius;
                _x = radius * shadowInfo.aspect;
                _y = radius;
                var halfFar = Vec3.distance(shadowInfo.sphere.center, vec3_center);
                _far = Math.min(halfFar * Shadows.COEFFICIENT_OF_EXPANSION, Shadows.MAX_FAR);
              } else {
                shadowCameraView = light.node.getWorldMatrix();
                _x = shadowInfo.orthoSize * shadowInfo.aspect;
                _y = shadowInfo.orthoSize;
                _far = shadowInfo.far;
              }

              Mat4.toArray(sv, shadowCameraView, UBOShadow.MAT_LIGHT_VIEW_OFFSET);
              Mat4.invert(matShadowView, shadowCameraView);
              vec4ShadowInfo.set(shadowInfo.near, _far, linear, shadowInfo.selfShadow ? 1.0 : 0.0);
              Vec4.toArray(sv, vec4ShadowInfo, UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET);
              vec4ShadowInfo.set(0.0, packing, shadowInfo.normalBias, 0.0);
              Vec4.toArray(sv, vec4ShadowInfo, UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET);
              Mat4.ortho(matShadowViewProj, -_x, _x, -_y, _y, shadowInfo.near, _far, device.capabilities.clipSpaceMinZ, device.capabilities.clipSpaceSignY);
              break;

            case LightType.SPOT:
              // light view
              Mat4.toArray(sv, light.node.getWorldMatrix(), UBOShadow.MAT_LIGHT_VIEW_OFFSET);
              Mat4.invert(matShadowView, light.node.getWorldMatrix());
              vec4ShadowInfo.set(0.01, light.range, linear, shadowInfo.selfShadow ? 1.0 : 0.0);
              Vec4.toArray(sv, vec4ShadowInfo, UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET);
              vec4ShadowInfo.set(1.0, packing, shadowInfo.normalBias, 0.0);
              Vec4.toArray(sv, vec4ShadowInfo, UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET); // light proj

              Mat4.perspective(matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range);
              break;

            default:
          } // light viewProj


          Mat4.multiply(matShadowViewProj, matShadowViewProj, matShadowView);
          Mat4.toArray(sv, matShadowViewProj, UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
          vec4ShadowInfo.set(shadowInfo.size.x, shadowInfo.size.y, shadowInfo.pcf, shadowInfo.bias);
          Vec4.toArray(sv, vec4ShadowInfo, UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET);
          Color.toArray(sv, shadowInfo.shadowColor, UBOShadow.SHADOW_COLOR_OFFSET);
        };

        /**
         *|combinedSignY|clipSpaceSignY|screenSpaceSignY| Backends |
         *|    :--:     |    :--:      |      :--:      |   :--:   |
         *|      0      |      -1      |      -1        |  Vulkan  |
         *|      1      |       1      |      -1        |  Metal   |
         *|      2      |      -1      |       1        |          |
         *|      3      |       1      |       1        |  GL-like |
         */
        PipelineUBO.getCombineSignY = function getCombineSignY() {
          return PipelineUBO._combineSignY;
        };

        var _proto = PipelineUBO.prototype;

        _proto._initCombineSignY = function _initCombineSignY() {
          var device = this._device;
          PipelineUBO._combineSignY = device.capabilities.screenSpaceSignY * 0.5 + 0.5 << 1 | device.capabilities.clipSpaceSignY * 0.5 + 0.5;
        };

        _proto.activate = function activate(device, pipeline) {
          this._device = device;
          this._pipeline = pipeline;
          var ds = this._pipeline.descriptorSet;

          this._initCombineSignY();

          var globalUBO = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOGlobal.SIZE, UBOGlobal.SIZE));
          ds.bindBuffer(UBOGlobal.BINDING, globalUBO);
          var cameraUBO = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOCamera.SIZE, UBOCamera.SIZE));
          ds.bindBuffer(UBOCamera.BINDING, cameraUBO);
          var shadowUBO = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOShadow.SIZE, UBOShadow.SIZE));
          ds.bindBuffer(UBOShadow.BINDING, shadowUBO);
        }
        /**
         * @en Update all UBOs
         * @zh 更新全部 UBO。
         */
        ;

        _proto.updateGlobalUBO = function updateGlobalUBO() {
          var globalDSManager = this._pipeline.globalDSManager;
          var ds = this._pipeline.descriptorSet;
          var cmdBuffer = this._pipeline.commandBuffers;
          ds.update();
          PipelineUBO.updateGlobalUBOView(this._pipeline, this._globalUBO);
          cmdBuffer[0].updateBuffer(ds.getBuffer(UBOGlobal.BINDING), this._globalUBO);
          globalDSManager.bindBuffer(UBOGlobal.BINDING, ds.getBuffer(UBOGlobal.BINDING));
          globalDSManager.update();
        };

        _proto.updateCameraUBO = function updateCameraUBO(camera) {
          var globalDSManager = this._pipeline.globalDSManager;
          var ds = this._pipeline.descriptorSet;
          var cmdBuffer = this._pipeline.commandBuffers;
          PipelineUBO.updateCameraUBOView(this._pipeline, this._cameraUBO, camera);
          cmdBuffer[0].updateBuffer(ds.getBuffer(UBOCamera.BINDING), this._cameraUBO);
          globalDSManager.bindBuffer(UBOCamera.BINDING, ds.getBuffer(UBOCamera.BINDING));
          globalDSManager.update();
        };

        _proto.updateShadowUBO = function updateShadowUBO(camera) {
          var sceneData = this._pipeline.pipelineSceneData;
          var shadowInfo = sceneData.shadows;
          if (!shadowInfo.enabled) return;
          var ds = this._pipeline.descriptorSet;
          var cmdBuffer = this._pipeline.commandBuffers;
          var shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
          var mainLight = camera.scene.mainLight;
          ds.update();

          if (mainLight && shadowFrameBufferMap.has(mainLight)) {
            ds.bindTexture(UNIFORM_SHADOWMAP_BINDING, shadowFrameBufferMap.get(mainLight).colorTextures[0]);
          }

          PipelineUBO.updateShadowUBOView(this._pipeline, this._shadowUBO, camera);
          cmdBuffer[0].updateBuffer(ds.getBuffer(UBOShadow.BINDING), this._shadowUBO);
        };

        _proto.updateShadowUBOLight = function updateShadowUBOLight(light) {
          var ds = this._pipeline.descriptorSet;
          PipelineUBO.updateShadowUBOLightView(this._pipeline, this._shadowUBO, light);
          ds.getBuffer(UBOShadow.BINDING).update(this._shadowUBO);
        };

        _proto.updateShadowUBORange = function updateShadowUBORange(offset, data) {
          if (data instanceof Mat4) {
            Mat4.toArray(this._shadowUBO, data, offset);
          } else if (data instanceof Color) {
            Color.toArray(this._shadowUBO, data, offset);
          }
        };

        _proto.destroy = function destroy() {};

        return PipelineUBO;
      }());

      PipelineUBO._combineSignY = 0;
    }
  };
});