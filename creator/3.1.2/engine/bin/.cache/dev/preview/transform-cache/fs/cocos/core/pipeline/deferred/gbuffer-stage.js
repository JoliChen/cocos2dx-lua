System.register("q-bundled:///fs/cocos/core/pipeline/deferred/gbuffer-stage.js", ["../../data/decorators/index.js", "../define.js", "../pass-phase.js", "../render-queue.js", "../../gfx/index.js", "../pipeline-funcs.js", "../render-batched-queue.js", "../render-instanced-queue.js", "../render-stage.js", "./enum.js", "../instanced-buffer.js", "../batched-buffer.js", "../../renderer/core/pass.js", "../pipeline-serialization.js"], function (_export, _context) {
  "use strict";

  var ccclass, displayOrder, type, serializable, SetIndex, getPhaseID, renderQueueClearFunc, convertRenderQueue, renderQueueSortFunc, ClearFlagBit, Color, Rect, SRGBToLinear, RenderBatchedQueue, RenderInstancedQueue, RenderStage, DeferredStagePriority, InstancedBuffer, BatchedBuffer, BatchingSchemes, RenderQueueDesc, RenderQueueSortMode, _dec, _dec2, _dec3, _class, _class2, _descriptor, _class3, _temp, colors, GbufferStage;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      displayOrder = _dataDecoratorsIndexJs.displayOrder;
      type = _dataDecoratorsIndexJs.type;
      serializable = _dataDecoratorsIndexJs.serializable;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }, function (_renderQueueJs) {
      renderQueueClearFunc = _renderQueueJs.renderQueueClearFunc;
      convertRenderQueue = _renderQueueJs.convertRenderQueue;
      renderQueueSortFunc = _renderQueueJs.renderQueueSortFunc;
    }, function (_gfxIndexJs) {
      ClearFlagBit = _gfxIndexJs.ClearFlagBit;
      Color = _gfxIndexJs.Color;
      Rect = _gfxIndexJs.Rect;
    }, function (_pipelineFuncsJs) {
      SRGBToLinear = _pipelineFuncsJs.SRGBToLinear;
    }, function (_renderBatchedQueueJs) {
      RenderBatchedQueue = _renderBatchedQueueJs.RenderBatchedQueue;
    }, function (_renderInstancedQueueJs) {
      RenderInstancedQueue = _renderInstancedQueueJs.RenderInstancedQueue;
    }, function (_renderStageJs) {
      RenderStage = _renderStageJs.RenderStage;
    }, function (_enumJs) {
      DeferredStagePriority = _enumJs.DeferredStagePriority;
    }, function (_instancedBufferJs) {
      InstancedBuffer = _instancedBufferJs.InstancedBuffer;
    }, function (_batchedBufferJs) {
      BatchedBuffer = _batchedBufferJs.BatchedBuffer;
    }, function (_rendererCorePassJs) {
      BatchingSchemes = _rendererCorePassJs.BatchingSchemes;
    }, function (_pipelineSerializationJs) {
      RenderQueueDesc = _pipelineSerializationJs.RenderQueueDesc;
      RenderQueueSortMode = _pipelineSerializationJs.RenderQueueSortMode;
    }],
    execute: function () {
      colors = [new Color(0, 0, 0, 0), new Color(0, 0, 0, 0), new Color(0, 0, 0, 0), new Color(0, 0, 0, 0)];
      /**
       * @en The gbuffer render stage
       * @zh 前向渲染阶段。
       */

      _export("GbufferStage", GbufferStage = (_dec = ccclass('GbufferStage'), _dec2 = type([RenderQueueDesc]), _dec3 = displayOrder(2), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_RenderStage) {
        _inheritsLoose(GbufferStage, _RenderStage);

        function GbufferStage() {
          var _this;

          _this = _RenderStage.call(this) || this;

          _initializerDefineProperty(_this, "renderQueues", _descriptor, _assertThisInitialized(_this));

          _this._renderQueues = [];
          _this._renderArea = new Rect();
          _this._batchedQueue = void 0;
          _this._instancedQueue = void 0;
          _this._phaseID = getPhaseID('deferred');
          _this._batchedQueue = new RenderBatchedQueue();
          _this._instancedQueue = new RenderInstancedQueue();
          return _this;
        }

        var _proto = GbufferStage.prototype;

        _proto.initialize = function initialize(info) {
          _RenderStage.prototype.initialize.call(this, info);

          if (info.renderQueues) {
            this.renderQueues = info.renderQueues;
          }

          return true;
        };

        _proto.activate = function activate(pipeline, flow) {
          _RenderStage.prototype.activate.call(this, pipeline, flow);

          for (var i = 0; i < this.renderQueues.length; i++) {
            this._renderQueues[i] = convertRenderQueue(this.renderQueues[i]);
          }
        };

        _proto.destroy = function destroy() {};

        _proto.render = function render(camera) {
          this._instancedQueue.clear();

          this._batchedQueue.clear();

          var pipeline = this._pipeline;
          var device = pipeline.device;

          this._renderQueues.forEach(renderQueueClearFunc);

          var renderObjects = pipeline.pipelineSceneData.renderObjects;

          if (renderObjects.length === 0) {
            return;
          }

          var m = 0;
          var p = 0;
          var k = 0;

          for (var i = 0; i < renderObjects.length; ++i) {
            var ro = renderObjects[i];
            var subModels = ro.model.subModels;

            for (m = 0; m < subModels.length; ++m) {
              var subModel = subModels[m];
              var passes = subModel.passes;

              for (p = 0; p < passes.length; ++p) {
                var pass = passes[p];
                if (pass.phase !== this._phaseID) continue;
                var batchingScheme = pass.batchingScheme;

                if (batchingScheme === BatchingSchemes.INSTANCING) {
                  var instancedBuffer = InstancedBuffer.get(pass);
                  instancedBuffer.merge(subModel, ro.model.instancedAttributes, p);

                  this._instancedQueue.queue.add(instancedBuffer);
                } else if (batchingScheme === BatchingSchemes.VB_MERGING) {
                  var batchedBuffer = BatchedBuffer.get(pass);
                  batchedBuffer.merge(subModel, p, ro.model);

                  this._batchedQueue.queue.add(batchedBuffer);
                } else {
                  for (k = 0; k < this._renderQueues.length; k++) {
                    this._renderQueues[k].insertRenderPass(ro, m, p);
                  }
                }
              }
            }
          }

          this._renderQueues.forEach(renderQueueSortFunc);

          var cmdBuff = pipeline.commandBuffers[0];

          this._instancedQueue.uploadBuffers(cmdBuff);

          this._batchedQueue.uploadBuffers(cmdBuff);

          this._renderArea = pipeline.generateRenderArea(camera);
          pipeline.updateQuadVertexData(this._renderArea);

          if (camera.clearFlag & ClearFlagBit.COLOR) {
            if (pipeline.pipelineSceneData.isHDR) {
              SRGBToLinear(colors[0], camera.clearColor);
              var scale = pipeline.pipelineSceneData.fpScale / camera.exposure;
              colors[0].x *= scale;
              colors[0].y *= scale;
              colors[0].z *= scale;
            } else {
              colors[0].x = camera.clearColor.x;
              colors[0].y = camera.clearColor.y;
              colors[0].z = camera.clearColor.z;
            }
          }

          colors[0].w = camera.clearColor.w;
          var deferredData = pipeline.getDeferredRenderData(camera);
          var framebuffer = deferredData.gbufferFrameBuffer;
          var renderPass = framebuffer.renderPass;
          cmdBuff.beginRenderPass(renderPass, framebuffer, this._renderArea, colors, camera.clearDepth, camera.clearStencil);
          cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, pipeline.descriptorSet);

          for (var _i = 0; _i < this.renderQueues.length; _i++) {
            this._renderQueues[_i].recordCommandBuffer(device, renderPass, cmdBuff);
          }

          this._instancedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          this._batchedQueue.recordCommandBuffer(device, renderPass, cmdBuff);

          cmdBuff.endRenderPass();
        };

        return GbufferStage;
      }(RenderStage), _class3.initInfo = {
        name: 'GbufferStage',
        priority: DeferredStagePriority.GBUFFER,
        tag: 0,
        renderQueues: [{
          isTransparent: false,
          sortMode: RenderQueueSortMode.FRONT_TO_BACK,
          stages: ['default']
        }, {
          isTransparent: true,
          sortMode: RenderQueueSortMode.BACK_TO_FRONT,
          stages: ['default']
        }]
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderQueues", [_dec2, serializable, _dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
    }
  };
});