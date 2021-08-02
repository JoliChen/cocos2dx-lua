System.register("q-bundled:///fs/cocos/core/pipeline/planar-shadow-queue.js", ["../geometry/index.js", "./define.js", "./instanced-buffer.js", "./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "./render-instanced-queue.js", "../renderer/scene/shadows.js", "../scene-graph/layers.js"], function (_export, _context) {
  "use strict";

  var AABB, intersect, SetIndex, InstancedBuffer, PipelineStateManager, DSPool, ShaderPool, PassPool, PassView, RenderInstancedQueue, ShadowType, Layers, _ab, PlanarShadowQueue;

  return {
    setters: [function (_geometryIndexJs) {
      AABB = _geometryIndexJs.AABB;
      intersect = _geometryIndexJs.intersect;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_instancedBufferJs) {
      InstancedBuffer = _instancedBufferJs.InstancedBuffer;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      DSPool = _rendererCoreMemoryPoolsJs.DSPool;
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
      PassPool = _rendererCoreMemoryPoolsJs.PassPool;
      PassView = _rendererCoreMemoryPoolsJs.PassView;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_rendererSceneShadowsJs) {
      ShadowType = _rendererSceneShadowsJs.ShadowType;
    }, function (_sceneGraphLayersJs) {
      Layers = _sceneGraphLayersJs.Layers;
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
      _ab = new AABB();

      _export("PlanarShadowQueue", PlanarShadowQueue = /*#__PURE__*/function () {
        function PlanarShadowQueue(pipeline) {
          this._pendingModels = [];
          this._instancedQueue = new RenderInstancedQueue();
          this._pipeline = void 0;
          this._pipeline = pipeline;
        }

        var _proto = PlanarShadowQueue.prototype;

        _proto.gatherShadowPasses = function gatherShadowPasses(camera, cmdBuff) {
          var pipelineSceneData = this._pipeline.pipelineSceneData;
          var pipelineUBO = this._pipeline.pipelineUBO;
          var shadows = pipelineSceneData.shadows;

          this._instancedQueue.clear();

          this._pendingModels.length = 0;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar) {
            return;
          }

          pipelineUBO.updateShadowUBO(camera);
          var scene = camera.scene;
          var frustum = camera.frustum;
          var shadowVisible = (camera.visibility & Layers.BitMask.DEFAULT) !== 0;

          if (!scene.mainLight || !shadowVisible) {
            return;
          }

          var renderObjects = pipelineSceneData.renderObjects;
          var instancedBuffer = InstancedBuffer.get(shadows.instancingMaterial.passes[0]);

          this._instancedQueue.queue.add(instancedBuffer);

          for (var i = 0; i < renderObjects.length; i++) {
            var model = renderObjects[i].model;

            if (!model.enabled || !model.node || !model.castShadow) {
              continue;
            }

            if (model.worldBounds) {
              AABB.transform(_ab, model.worldBounds, shadows.matLight);

              if (!intersect.aabbFrustum(_ab, frustum)) {
                continue;
              }
            }

            if (model.isInstancingEnabled) {
              var subModels = model.subModels;

              for (var m = 0; m < subModels.length; m++) {
                var subModel = subModels[m];
                instancedBuffer.merge(subModel, model.instancedAttributes, 0, subModel.planarInstanceShaderHandle);
              }
            } else {
              this._pendingModels.push(model);
            }
          }

          this._instancedQueue.uploadBuffers(cmdBuff);
        };

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          var shadows = this._pipeline.pipelineSceneData.shadows;

          if (!shadows.enabled || shadows.type !== ShadowType.Planar) {
            return;
          }

          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          if (!this._pendingModels.length) {
            return;
          }

          var pass = shadows.material.passes[0];
          var descriptorSet = DSPool.get(PassPool.get(pass.handle, PassView.DESCRIPTOR_SET));
          cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, descriptorSet);
          var modelCount = this._pendingModels.length;

          for (var i = 0; i < modelCount; i++) {
            var model = this._pendingModels[i];

            for (var j = 0; j < model.subModels.length; j++) {
              var subModel = model.subModels[j]; // This is a temporary solution
              // It should not be written in a fixed way, or modified by the user

              var shader = ShaderPool.get(subModel.planarShaderHandle);
              var ia = subModel.inputAssembler;
              var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, ia);
              cmdBuff.bindPipelineState(pso);
              cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
              cmdBuff.bindInputAssembler(ia);
              cmdBuff.draw(ia);
            }
          }
        };

        return PlanarShadowQueue;
      }());
    }
  };
});