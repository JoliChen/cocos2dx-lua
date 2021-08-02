System.register("q-bundled:///fs/cocos/core/pipeline/render-instanced-queue.js", ["./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "./define.js"], function (_export, _context) {
  "use strict";

  var PipelineStateManager, DSPool, ShaderPool, SetIndex, RenderInstancedQueue;
  return {
    setters: [function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      DSPool = _rendererCoreMemoryPoolsJs.DSPool;
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
       * @en Render queue for instanced batching
       * @zh 渲染合批队列。
       */
      _export("RenderInstancedQueue", RenderInstancedQueue = /*#__PURE__*/function () {
        function RenderInstancedQueue() {
          this.queue = new Set();
        }

        var _proto = RenderInstancedQueue.prototype;

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
            if (res.value.hasPendingModels) res.value.uploadBuffers(cmdBuff);
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
            var _res$value = res.value,
                instances = _res$value.instances,
                pass = _res$value.pass,
                hasPendingModels = _res$value.hasPendingModels;

            if (hasPendingModels) {
              cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              var lastPSO = null;

              for (var b = 0; b < instances.length; ++b) {
                var instance = instances[b];

                if (!instance.count) {
                  continue;
                }

                var shader = ShaderPool.get(instance.hShader);
                var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, instance.ia);

                if (lastPSO !== pso) {
                  cmdBuff.bindPipelineState(pso);
                  lastPSO = pso;
                }

                cmdBuff.bindDescriptorSet(SetIndex.LOCAL, DSPool.get(instance.hDescriptorSet), res.value.dynamicOffsets);
                cmdBuff.bindInputAssembler(instance.ia);
                cmdBuff.draw(instance.ia);
              }
            }

            res = it.next();
          }
        };

        return RenderInstancedQueue;
      }());
    }
  };
});