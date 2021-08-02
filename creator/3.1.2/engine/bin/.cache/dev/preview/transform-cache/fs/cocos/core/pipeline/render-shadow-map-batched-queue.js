System.register("q-bundled:///fs/cocos/core/pipeline/render-shadow-map-batched-queue.js", ["./define.js", "./pass-phase.js", "./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "../renderer/core/pass.js", "./render-instanced-queue.js", "./instanced-buffer.js", "./render-batched-queue.js", "./batched-buffer.js", "../renderer/scene/shadows.js", "../renderer/scene/light.js", "../geometry/index.js"], function (_export, _context) {
  "use strict";

  var SetIndex, getPhaseID, PipelineStateManager, ShaderPool, SubModelPool, SubModelView, BatchingSchemes, RenderInstancedQueue, InstancedBuffer, RenderBatchedQueue, BatchedBuffer, ShadowType, LightType, intersect, _phaseID, _shadowPassIndices, RenderShadowMapBatchedQueue;

  function getShadowPassIndex(subModels, shadowPassIndices) {
    shadowPassIndices.length = 0;
    var hasShadowPass = false;

    for (var j = 0; j < subModels.length; j++) {
      var passes = subModels[j].passes;
      var shadowPassIndex = -1;

      for (var k = 0; k < passes.length; k++) {
        if (passes[k].phase === _phaseID) {
          shadowPassIndex = k;
          hasShadowPass = true;
          break;
        }
      }

      shadowPassIndices.push(shadowPassIndex);
    }

    return hasShadowPass;
  }
  /**
   * @zh
   * 阴影渲染队列
   */


  return {
    setters: [function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
      SubModelPool = _rendererCoreMemoryPoolsJs.SubModelPool;
      SubModelView = _rendererCoreMemoryPoolsJs.SubModelView;
    }, function (_rendererCorePassJs) {
      BatchingSchemes = _rendererCorePassJs.BatchingSchemes;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_instancedBufferJs) {
      InstancedBuffer = _instancedBufferJs.InstancedBuffer;
    }, function (_renderBatchedQueueJs) {
      RenderBatchedQueue = _renderBatchedQueueJs.RenderBatchedQueue;
    }, function (_batchedBufferJs) {
      BatchedBuffer = _batchedBufferJs.BatchedBuffer;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_rendererSceneLightJs) {
      LightType = _rendererSceneLightJs.LightType;
    }, function (_geometryIndexJs) {
      intersect = _geometryIndexJs.intersect;
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
      _phaseID = getPhaseID('shadow-caster');
      _shadowPassIndices = [];

      _export("RenderShadowMapBatchedQueue", RenderShadowMapBatchedQueue = /*#__PURE__*/function () {
        function RenderShadowMapBatchedQueue(pipeline) {
          this._pipeline = void 0;
          this._subModelsArray = [];
          this._passArray = [];
          this._shaderArray = [];
          this._instancedQueue = void 0;
          this._batchedQueue = void 0;
          this._pipeline = pipeline;
          this._instancedQueue = new RenderInstancedQueue();
          this._batchedQueue = new RenderBatchedQueue();
        }

        var _proto = RenderShadowMapBatchedQueue.prototype;

        _proto.gatherLightPasses = function gatherLightPasses(light, cmdBuff) {
          this.clear();
          var shadowInfo = this._pipeline.pipelineSceneData.shadows;
          var shadowObjects = this._pipeline.pipelineSceneData.shadowObjects;

          if (light && shadowInfo.enabled && shadowInfo.type === ShadowType.ShadowMap) {
            this._pipeline.pipelineUBO.updateShadowUBOLight(light);

            for (var i = 0; i < shadowObjects.length; i++) {
              var ro = shadowObjects[i];
              var model = ro.model;

              if (!getShadowPassIndex(model.subModels, _shadowPassIndices)) {
                continue;
              }

              switch (light.type) {
                case LightType.DIRECTIONAL:
                  this.add(model, cmdBuff, _shadowPassIndices);
                  break;

                case LightType.SPOT:
                  if (model.worldBounds && (!intersect.aabbWithAABB(model.worldBounds, light.aabb) || !intersect.aabbFrustum(model.worldBounds, light.frustum))) continue;
                  this.add(model, cmdBuff, _shadowPassIndices);
                  break;

                default:
              }
            }
          }
        }
        /**
         * @zh
         * clear light-Batched-Queue
         */
        ;

        _proto.clear = function clear() {
          this._subModelsArray.length = 0;
          this._shaderArray.length = 0;
          this._passArray.length = 0;

          this._instancedQueue.clear();

          this._batchedQueue.clear();
        };

        _proto.add = function add(model, cmdBuff, _shadowPassIndices) {
          var subModels = model.subModels;

          for (var j = 0; j < subModels.length; j++) {
            var subModel = subModels[j];
            var shadowPassIdx = _shadowPassIndices[j];
            var pass = subModel.passes[shadowPassIdx];
            var batchingScheme = pass.batchingScheme;

            if (batchingScheme === BatchingSchemes.INSTANCING) {
              // instancing
              var buffer = InstancedBuffer.get(pass);
              buffer.merge(subModel, model.instancedAttributes, shadowPassIdx);

              this._instancedQueue.queue.add(buffer);
            } else if (pass.batchingScheme === BatchingSchemes.VB_MERGING) {
              // vb-merging
              var _buffer = BatchedBuffer.get(pass);

              _buffer.merge(subModel, shadowPassIdx, model);

              this._batchedQueue.queue.add(_buffer);
            } else {
              var shader = ShaderPool.get(SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + shadowPassIdx));

              this._subModelsArray.push(subModel);

              this._shaderArray.push(shader);

              this._passArray.push(pass);
            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);

          this._batchedQueue.uploadBuffers(cmdBuff);
        }
        /**
         * @zh
         * record CommandBuffer
         */
        ;

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          for (var i = 0; i < this._subModelsArray.length; ++i) {
            var subModel = this._subModelsArray[i];
            var shader = this._shaderArray[i];
            var pass = this._passArray[i];
            var ia = subModel.inputAssembler;
            var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
            var descriptorSet = pass.descriptorSet;
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(ia);
            cmdBuff.draw(ia);
          }
        };

        return RenderShadowMapBatchedQueue;
      }());
    }
  };
});