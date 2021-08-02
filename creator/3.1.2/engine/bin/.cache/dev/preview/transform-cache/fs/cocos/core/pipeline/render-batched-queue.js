System.register("q-bundled:///fs/cocos/core/pipeline/render-batched-queue.js", ["./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "./define.js"], function (_export, _context) {
  "use strict";

  var PipelineStateManager, ShaderPool, SetIndex, RenderBatchedQueue;
  return {
    setters: [function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
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

      /**
       * @en The render queue for dynamic batching
       * @zh 渲染合批队列。
       */
      _export("RenderBatchedQueue", RenderBatchedQueue = /*#__PURE__*/function () {
        function RenderBatchedQueue() {
          this.queue = new Set();
        }

        var _proto = RenderBatchedQueue.prototype;

        /**
         * @en Clear the render queue
         * @zh 清空渲染队列。
         */
        _proto.clear = function clear() {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            res.value.clear();
            res = it.next();
          }

          this.queue.clear();
        };

        _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            for (var b = 0; b < res.value.batches.length; ++b) {
              var batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              for (var v = 0; v < batch.vbs.length; ++v) {
                batch.vbs[v].update(batch.vbDatas[v]);
              }

              cmdBuff.updateBuffer(batch.vbIdx, batch.vbIdxData.buffer);
              cmdBuff.updateBuffer(batch.ubo, batch.uboData);
            }

            res = it.next();
          }
        }
        /**
         * @en Record command buffer for the current queue
         * @zh 记录命令缓冲。
         * @param cmdBuff The command buffer to store the result
         */
        ;

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          var it = this.queue.values();
          var res = it.next();

          while (!res.done) {
            var boundPSO = false;

            for (var b = 0; b < res.value.batches.length; ++b) {
              var batch = res.value.batches[b];

              if (!batch.mergeCount) {
                continue;
              }

              if (!boundPSO) {
                var shader = ShaderPool.get(batch.hShader);
                var pso = PipelineStateManager.getOrCreatePipelineState(device, batch.pass, shader, renderPass, batch.ia);
                cmdBuff.bindPipelineState(pso);
                cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, batch.pass.descriptorSet);
                boundPSO = true;
              }

              cmdBuff.bindDescriptorSet(SetIndex.LOCAL, batch.descriptorSet, res.value.dynamicOffsets);
              cmdBuff.bindInputAssembler(batch.ia);
              cmdBuff.draw(batch.ia);
            }

            res = it.next();
          }
        };

        return RenderBatchedQueue;
      }());
    }
  };
});