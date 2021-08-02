System.register("q-bundled:///fs/cocos/core/pipeline/render-additive-light-queue.js", ["./batched-buffer.js", "../renderer/core/pass.js", "./instanced-buffer.js", "./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "../math/index.js", "../geometry/index.js", "../gfx/index.js", "../memop/index.js", "./render-batched-queue.js", "./render-instanced-queue.js", "./pass-phase.js", "../renderer/scene/light.js", "./define.js", "./scene-culling.js"], function (_export, _context) {
  "use strict";

  var BatchedBuffer, BatchingSchemes, InstancedBuffer, PipelineStateManager, DSPool, ShaderPool, PassView, PassPool, SubModelPool, SubModelView, Vec3, nextPow2, Mat4, Color, Sphere, intersect, BufferUsageBit, MemoryUsageBit, BufferInfo, BufferViewInfo, Pool, RenderBatchedQueue, RenderInstancedQueue, getPhaseID, LightType, SetIndex, UBOForwardLight, UBOShadow, UNIFORM_SHADOWMAP_BINDING, UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, supportsHalfFloatTexture, updatePlanarPROJ, _lightPassPool, _vec4Array, _sphere, _dynamicOffsets, _lightIndices, _matShadowView, _matShadowViewProj, _phaseID, _lightPassIndices, RenderAdditiveLightQueue;

  function cullSphereLight(light, model) {
    return !!(model.worldBounds && !intersect.aabbWithAABB(model.worldBounds, light.aabb));
  }

  function cullSpotLight(light, model) {
    return !!(model.worldBounds && (!intersect.aabbWithAABB(model.worldBounds, light.aabb) || !intersect.aabbFrustum(model.worldBounds, light.frustum)));
  }

  function getLightPassIndices(subModels, lightPassIndices) {
    lightPassIndices.length = 0;
    var hasValidLightPass = false;

    for (var j = 0; j < subModels.length; j++) {
      var passes = subModels[j].passes;
      var lightPassIndex = -1;

      for (var k = 0; k < passes.length; k++) {
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


  return {
    setters: [function (_batchedBufferJs) {
      BatchedBuffer = _batchedBufferJs.BatchedBuffer;
    }, function (_rendererCorePassJs) {
      BatchingSchemes = _rendererCorePassJs.BatchingSchemes;
    }, function (_instancedBufferJs) {
      InstancedBuffer = _instancedBufferJs.InstancedBuffer;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      DSPool = _rendererCoreMemoryPoolsJs.DSPool;
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
      PassView = _rendererCoreMemoryPoolsJs.PassView;
      PassPool = _rendererCoreMemoryPoolsJs.PassPool;
      SubModelPool = _rendererCoreMemoryPoolsJs.SubModelPool;
      SubModelView = _rendererCoreMemoryPoolsJs.SubModelView;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
      nextPow2 = _mathIndexJs.nextPow2;
      Mat4 = _mathIndexJs.Mat4;
      Color = _mathIndexJs.Color;
    }, function (_geometryIndexJs) {
      Sphere = _geometryIndexJs.Sphere;
      intersect = _geometryIndexJs.intersect;
    }, function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      BufferInfo = _gfxIndexJs.BufferInfo;
      BufferViewInfo = _gfxIndexJs.BufferViewInfo;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_renderBatchedQueueJs) {
      RenderBatchedQueue = _renderBatchedQueueJs.RenderBatchedQueue;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
      UBOForwardLight = _defineJs.UBOForwardLight;
      UBOShadow = _defineJs.UBOShadow;
      UNIFORM_SHADOWMAP_BINDING = _defineJs.UNIFORM_SHADOWMAP_BINDING;
      UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING = _defineJs.UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING;
      supportsHalfFloatTexture = _defineJs.supportsHalfFloatTexture;
    }, function (_sceneCullingJs) {
      updatePlanarPROJ = _sceneCullingJs.updatePlanarPROJ;
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

      /**
       * @packageDocumentation
       * @module pipeline
       */
      _lightPassPool = new Pool(function () {
        return {
          subModel: null,
          passIdx: -1,
          dynamicOffsets: [],
          lights: []
        };
      }, 16);
      _vec4Array = new Float32Array(4);
      _sphere = Sphere.create(0, 0, 0, 1);
      _dynamicOffsets = [];
      _lightIndices = [];
      _matShadowView = new Mat4();
      _matShadowViewProj = new Mat4();
      _phaseID = getPhaseID('forward-add');
      _lightPassIndices = [];

      _export("RenderAdditiveLightQueue", RenderAdditiveLightQueue = /*#__PURE__*/function () {
        function RenderAdditiveLightQueue(pipeline) {
          this._pipeline = void 0;
          this._device = void 0;
          this._validLights = [];
          this._lightPasses = [];
          this._shadowUBO = new Float32Array(UBOShadow.COUNT);
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
          this._instancedQueue = new RenderInstancedQueue();
          this._batchedQueue = new RenderBatchedQueue();
          var alignment = this._device.capabilities.uboOffsetAlignment;
          this._lightBufferStride = Math.ceil(UBOForwardLight.SIZE / alignment) * alignment;
          this._lightBufferElementCount = this._lightBufferStride / Float32Array.BYTES_PER_ELEMENT;
          this._lightBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, this._lightBufferStride * this._lightBufferCount, this._lightBufferStride));
          this._firstLightBufferView = this._device.createBuffer(new BufferViewInfo(this._lightBuffer, 0, UBOForwardLight.SIZE));
          this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);
        }

        var _proto = RenderAdditiveLightQueue.prototype;

        _proto.clear = function clear() {
          this._instancedQueue.clear();

          this._batchedQueue.clear();

          this._validLights.length = 0;

          for (var i = 0; i < this._lightPasses.length; i++) {
            var lp = this._lightPasses[i];
            lp.dynamicOffsets.length = 0;
            lp.lights.length = 0;
          }

          _lightPassPool.freeArray(this._lightPasses);

          this._lightPasses.length = 0;
        };

        _proto.destroy = function destroy() {
          var descriptorSetMap = this._pipeline.globalDSManager.descriptorSetMap;
          var keys = descriptorSetMap.keys;

          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var descriptorSet = descriptorSetMap.get(key);

            if (descriptorSet) {
              descriptorSet.getBuffer(UBOShadow.BINDING).destroy();
              descriptorSet.getSampler(UNIFORM_SHADOWMAP_BINDING).destroy();
              descriptorSet.getSampler(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
              descriptorSet.getTexture(UNIFORM_SHADOWMAP_BINDING).destroy();
              descriptorSet.getTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING).destroy();
              descriptorSet.destroy();
            }

            descriptorSetMap["delete"](key);
          }
        };

        _proto.gatherLightPasses = function gatherLightPasses(camera, cmdBuff) {
          var validLights = this._validLights;
          this.clear();

          this._gatherValidLights(camera, validLights);

          if (!validLights.length) {
            return;
          }

          this._updateUBOs(camera, cmdBuff);

          this._updateLightDescriptorSet(camera, cmdBuff);

          var renderObjects = this._pipeline.pipelineSceneData.renderObjects;

          for (var i = 0; i < renderObjects.length; i++) {
            var ro = renderObjects[i];
            var model = ro.model;
            var subModels = model.subModels;

            if (!getLightPassIndices(subModels, _lightPassIndices)) {
              continue;
            }

            _lightIndices.length = 0;

            this._lightCulling(model, validLights);

            if (!_lightIndices.length) {
              continue;
            }

            for (var j = 0; j < subModels.length; j++) {
              var lightPassIdx = _lightPassIndices[j];

              if (lightPassIdx < 0) {
                continue;
              }

              var subModel = subModels[j];
              var pass = subModel.passes[lightPassIdx];
              subModel.descriptorSet.bindBuffer(UBOForwardLight.BINDING, this._firstLightBufferView);
              subModel.descriptorSet.update();

              this._addRenderQueue(pass, subModel, model, lightPassIdx, validLights);
            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);

          this._batchedQueue.uploadBuffers(cmdBuff);
        };

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          var globalDSManager = this._pipeline.globalDSManager;

          for (var i = 0; i < this._lightPasses.length; i++) {
            var _this$_lightPasses$i = this._lightPasses[i],
                subModel = _this$_lightPasses$i.subModel,
                passIdx = _this$_lightPasses$i.passIdx,
                dynamicOffsets = _this$_lightPasses$i.dynamicOffsets,
                lights = _this$_lightPasses$i.lights;
            var shader = ShaderPool.get(SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + passIdx));
            var pass = subModel.passes[passIdx];
            var ia = subModel.inputAssembler;
            var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            var matDS = DSPool.get(PassPool.get(pass.handle, PassView.DESCRIPTOR_SET));
            var localDS = subModel.descriptorSet;
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, matDS);
            cmdBuff.bindInputAssembler(ia);

            for (var j = 0; j < dynamicOffsets.length; ++j) {
              var light = lights[j];
              var descriptorSet = globalDSManager.getOrCreateDescriptorSet(light);
              _dynamicOffsets[0] = dynamicOffsets[j];
              cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, descriptorSet);
              cmdBuff.bindDescriptorSet(SetIndex.LOCAL, localDS, _dynamicOffsets);
              cmdBuff.draw(ia);
            }
          }
        } // gather validLights
        ;

        _proto._gatherValidLights = function _gatherValidLights(camera, validLights) {
          var _ref = camera.scene,
              sphereLights = _ref.sphereLights;

          for (var i = 0; i < sphereLights.length; i++) {
            var light = sphereLights[i];

            if (light.baked) {
              continue;
            }

            Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              validLights.push(light);
            }
          }

          var _ref2 = camera.scene,
              spotLights = _ref2.spotLights;

          for (var _i = 0; _i < spotLights.length; _i++) {
            var _light = spotLights[_i];

            if (_light.baked) {
              continue;
            }

            Sphere.set(_sphere, _light.position.x, _light.position.y, _light.position.z, _light.range);

            if (intersect.sphereFrustum(_sphere, camera.frustum)) {
              validLights.push(_light);
            }
          }
        } // light culling
        ;

        _proto._lightCulling = function _lightCulling(model, validLights) {
          for (var l = 0; l < validLights.length; l++) {
            var light = validLights[l];
            var isCulled = false;

            switch (light.type) {
              case LightType.SPHERE:
                isCulled = cullSphereLight(light, model);
                break;

              case LightType.SPOT:
                isCulled = cullSpotLight(light, model);
                break;

              default:
            }

            if (!isCulled) {
              _lightIndices.push(l);
            }
          }
        } // add renderQueue
        ;

        _proto._addRenderQueue = function _addRenderQueue(pass, subModel, model, lightPassIdx, validLights) {
          var batchingScheme = pass.batchingScheme;

          if (batchingScheme === BatchingSchemes.INSTANCING) {
            // instancing
            for (var l = 0; l < _lightIndices.length; l++) {
              var idx = _lightIndices[l];
              var buffer = InstancedBuffer.get(pass, idx);
              buffer.merge(subModel, model.instancedAttributes, lightPassIdx);
              buffer.dynamicOffsets[0] = this._lightBufferStride * idx;

              this._instancedQueue.queue.add(buffer);
            }
          } else if (batchingScheme === BatchingSchemes.VB_MERGING) {
            // vb-merging
            for (var _l = 0; _l < _lightIndices.length; _l++) {
              var _idx = _lightIndices[_l];

              var _buffer = BatchedBuffer.get(pass, _idx);

              _buffer.merge(subModel, lightPassIdx, model);

              _buffer.dynamicOffsets[0] = this._lightBufferStride * _idx;

              this._batchedQueue.queue.add(_buffer);
            }
          } else {
            // standard draw
            var lp = _lightPassPool.alloc();

            lp.subModel = subModel;
            lp.passIdx = lightPassIdx;

            for (var _l2 = 0; _l2 < _lightIndices.length; _l2++) {
              var _idx2 = _lightIndices[_l2];
              lp.lights.push(_idx2);
              lp.dynamicOffsets.push(this._lightBufferStride * _idx2);
            }

            this._lightPasses.push(lp);
          }
        } // update light DescriptorSet
        ;

        _proto._updateLightDescriptorSet = function _updateLightDescriptorSet(camera, cmdBuff) {
          var device = this._pipeline.device;
          var sceneData = this._pipeline.pipelineSceneData;
          var shadowInfo = sceneData.shadows;
          var shadowFrameBufferMap = sceneData.shadowFrameBufferMap;
          var mainLight = camera.scene.mainLight;
          var isSupportHalfFloat = supportsHalfFloatTexture(device);
          var linear = shadowInfo.linear && isSupportHalfFloat ? 1.0 : 0.0;
          var packing = shadowInfo.packing ? 1.0 : isSupportHalfFloat ? 0.0 : 1.0;
          var globalDSManager = this._pipeline.globalDSManager;

          for (var i = 0; i < this._validLights.length; i++) {
            var light = this._validLights[i];
            var descriptorSet = globalDSManager.getOrCreateDescriptorSet(i);

            if (!descriptorSet) {
              continue;
            }

            switch (light.type) {
              case LightType.SPHERE:
                // planar PROJ
                if (mainLight) {
                  updatePlanarPROJ(shadowInfo, mainLight, this._shadowUBO);
                }

                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 2.0;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0; // Reserve sphere light shadow interface

                Color.toArray(this._shadowUBO, shadowInfo.shadowColor, UBOShadow.SHADOW_COLOR_OFFSET);
                break;

              case LightType.SPOT:
                // planar PROJ
                if (mainLight) {
                  updatePlanarPROJ(shadowInfo, mainLight, this._shadowUBO);
                } // light view


                Mat4.toArray(this._shadowUBO, light.node.getWorldMatrix(), UBOShadow.MAT_LIGHT_VIEW_OFFSET);
                Mat4.invert(_matShadowView, light.node.getWorldMatrix()); // light proj

                Mat4.perspective(_matShadowViewProj, light.spotAngle, light.aspect, 0.001, light.range); // light viewProj

                Mat4.multiply(_matShadowViewProj, _matShadowViewProj, _matShadowView);
                Mat4.toArray(this._shadowUBO, _matShadowViewProj, UBOShadow.MAT_LIGHT_VIEW_PROJ_OFFSET);
                this._shadowUBO[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 0] = 0.01;
                this._shadowUBO[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 1] = light.range;
                this._shadowUBO[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 2] = linear;
                this._shadowUBO[UBOShadow.SHADOW_NEAR_FAR_LINEAR_SELF_INFO_OFFSET + 3] = shadowInfo.selfShadow ? 1.0 : 0.0;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 0] = shadowInfo.size.x;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 1] = shadowInfo.size.y;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 2] = shadowInfo.pcf;
                this._shadowUBO[UBOShadow.SHADOW_WIDTH_HEIGHT_PCF_BIAS_INFO_OFFSET + 3] = shadowInfo.bias;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 0] = 1.0;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 1] = packing;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 2] = shadowInfo.normalBias;
                this._shadowUBO[UBOShadow.SHADOW_LIGHT_PACKING_NBIAS_NULL_INFO_OFFSET + 3] = 0.0;
                Color.toArray(this._shadowUBO, shadowInfo.shadowColor, UBOShadow.SHADOW_COLOR_OFFSET); // Spot light sampler binding

                if (shadowFrameBufferMap.has(light)) {
                  var _shadowFrameBufferMap;

                  var texture = (_shadowFrameBufferMap = shadowFrameBufferMap.get(light)) === null || _shadowFrameBufferMap === void 0 ? void 0 : _shadowFrameBufferMap.colorTextures[0];

                  if (texture) {
                    descriptorSet.bindTexture(UNIFORM_SPOT_LIGHTING_MAP_TEXTURE_BINDING, texture);
                  }
                }

                break;

              default:
            }

            descriptorSet.update();
            cmdBuff.updateBuffer(descriptorSet.getBuffer(UBOShadow.BINDING), this._shadowUBO);
          }
        };

        _proto._updateUBOs = function _updateUBOs(camera, cmdBuff) {
          var exposure = camera.exposure;
          var sceneData = this._pipeline.pipelineSceneData;
          var isHDR = sceneData.isHDR;
          var fpScale = sceneData.fpScale;

          if (this._validLights.length > this._lightBufferCount) {
            this._firstLightBufferView.destroy();

            this._lightBufferCount = nextPow2(this._validLights.length);

            this._lightBuffer.resize(this._lightBufferStride * this._lightBufferCount);

            this._lightBufferData = new Float32Array(this._lightBufferElementCount * this._lightBufferCount);

            this._firstLightBufferView.initialize(new BufferViewInfo(this._lightBuffer, 0, UBOForwardLight.SIZE));
          }

          for (var l = 0, offset = 0; l < this._validLights.length; l++, offset += this._lightBufferElementCount) {
            var light = this._validLights[l];

            switch (light.type) {
              case LightType.SPHERE:
                // UBOForwardLight
                Vec3.toArray(_vec4Array, light.position);
                _vec4Array[3] = 0;

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_POS_OFFSET);

                _vec4Array[0] = light.size;
                _vec4Array[1] = light.range;
                _vec4Array[2] = 0.0;

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

                Vec3.toArray(_vec4Array, light.color);

                if (light.useColorTemperature) {
                  var tempRGB = light.colorTemperatureRGB;
                  _vec4Array[0] *= tempRGB.x;
                  _vec4Array[1] *= tempRGB.y;
                  _vec4Array[2] *= tempRGB.z;
                }

                if (isHDR) {
                  _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
                } else {
                  _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
                }

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_COLOR_OFFSET);

                break;

              case LightType.SPOT:
                // UBOForwardLight
                Vec3.toArray(_vec4Array, light.position);
                _vec4Array[3] = 1;

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_POS_OFFSET);

                _vec4Array[0] = light.size;
                _vec4Array[1] = light.range;
                _vec4Array[2] = light.spotAngle;

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_SIZE_RANGE_ANGLE_OFFSET);

                Vec3.toArray(_vec4Array, light.direction);

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_DIR_OFFSET);

                Vec3.toArray(_vec4Array, light.color);

                if (light.useColorTemperature) {
                  var _tempRGB = light.colorTemperatureRGB;
                  _vec4Array[0] *= _tempRGB.x;
                  _vec4Array[1] *= _tempRGB.y;
                  _vec4Array[2] *= _tempRGB.z;
                }

                if (isHDR) {
                  _vec4Array[3] = light.luminance * fpScale * this._lightMeterScale;
                } else {
                  _vec4Array[3] = light.luminance * exposure * this._lightMeterScale;
                }

                this._lightBufferData.set(_vec4Array, offset + UBOForwardLight.LIGHT_COLOR_OFFSET);

                break;

              default:
            }
          }

          cmdBuff.updateBuffer(this._lightBuffer, this._lightBufferData);
        };

        return RenderAdditiveLightQueue;
      }());
    }
  };
});