System.register("q-bundled:///fs/cocos/core/pipeline/render-queue.js", ["../memop/index.js", "../memop/cached-array.js", "./define.js", "./pipeline-state-manager.js", "../renderer/core/memory-pools.js", "./pipeline-serialization.js", "./pass-phase.js"], function (_export, _context) {
  "use strict";

  var RecyclePool, CachedArray, SetIndex, PipelineStateManager, SubModelView, SubModelPool, ShaderPool, RenderQueueSortMode, getPhaseID, RenderQueue;

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
   * @en Comparison sorting function. Opaque objects are sorted by priority -> depth front to back -> shader ID.
   * @zh 比较排序函数。不透明对象按优先级 -> 深度由前向后 -> Shader ID 顺序排序。
   */
  function opaqueCompareFn(a, b) {
    return a.hash - b.hash || a.depth - b.depth || a.shaderId - b.shaderId;
  }
  /**
   * @en Comparison sorting function. Transparent objects are sorted by priority -> depth back to front -> shader ID.
   * @zh 比较排序函数。半透明对象按优先级 -> 深度由后向前 -> Shader ID 顺序排序。
   */


  function transparentCompareFn(a, b) {
    return a.hash - b.hash || b.depth - a.depth || a.shaderId - b.shaderId;
  }
  /**
   * @en The render queue. It manages a GFX [[RenderPass]] queue which will be executed by the [[RenderStage]].
   * @zh 渲染队列。它管理一个 GFX [[RenderPass]] 队列，队列中的渲染过程会被 [[RenderStage]] 所执行。
   */


  function convertRenderQueue(desc) {
    var phase = 0;

    for (var j = 0; j < desc.stages.length; j++) {
      phase |= getPhaseID(desc.stages[j]);
    }

    var sortFunc = opaqueCompareFn;

    switch (desc.sortMode) {
      case RenderQueueSortMode.BACK_TO_FRONT:
        sortFunc = transparentCompareFn;
        break;

      case RenderQueueSortMode.FRONT_TO_BACK:
        sortFunc = opaqueCompareFn;
        break;

      default:
        break;
    }

    return new RenderQueue({
      isTransparent: desc.isTransparent,
      phases: phase,
      sortFunc: sortFunc
    });
  }
  /**
   * @en Clear the given render queue
   * @zh 清空指定的渲染队列
   * @param rq The render queue
   */


  function renderQueueClearFunc(rq) {
    rq.clear();
  }
  /**
   * @en Sort the given render queue
   * @zh 对指定的渲染队列执行排序
   * @param rq The render queue
   */


  function renderQueueSortFunc(rq) {
    rq.sort();
  }

  _export({
    opaqueCompareFn: opaqueCompareFn,
    transparentCompareFn: transparentCompareFn,
    convertRenderQueue: convertRenderQueue,
    renderQueueClearFunc: renderQueueClearFunc,
    renderQueueSortFunc: renderQueueSortFunc
  });

  return {
    setters: [function (_memopIndexJs) {
      RecyclePool = _memopIndexJs.RecyclePool;
    }, function (_memopCachedArrayJs) {
      CachedArray = _memopCachedArrayJs.CachedArray;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_rendererCoreMemoryPoolsJs) {
      SubModelView = _rendererCoreMemoryPoolsJs.SubModelView;
      SubModelPool = _rendererCoreMemoryPoolsJs.SubModelPool;
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
    }, function (_pipelineSerializationJs) {
      RenderQueueSortMode = _pipelineSerializationJs.RenderQueueSortMode;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }],
    execute: function () {
      _export("RenderQueue", RenderQueue = /*#__PURE__*/function () {
        /**
         * @en A cached array of render passes
         * @zh 基于缓存数组的渲染过程队列。
         */

        /**
         * @en Construct a RenderQueue with render queue descriptor
         * @zh 利用渲染队列描述来构造一个 RenderQueue。
         * @param desc Render queue descriptor
         */
        function RenderQueue(desc) {
          this.queue = void 0;
          this._passDesc = void 0;
          this._passPool = void 0;
          this._passDesc = desc;
          this._passPool = new RecyclePool(function () {
            return {
              hash: 0,
              depth: 0,
              shaderId: 0,
              subModel: null,
              passIdx: 0
            };
          }, 64);
          this.queue = new CachedArray(64, this._passDesc.sortFunc);
        }
        /**
         * @en Clear the render queue
         * @zh 清空渲染队列。
         */


        var _proto = RenderQueue.prototype;

        _proto.clear = function clear() {
          this.queue.clear();

          this._passPool.reset();
        }
        /**
         * @en Insert a render pass into the queue
         * @zh 插入渲染过程。
         * @param renderObj The render object of the pass
         * @param modelIdx The model id
         * @param passIdx The pass id
         * @returns Whether the new render pass is successfully added
         */
        ;

        _proto.insertRenderPass = function insertRenderPass(renderObj, subModelIdx, passIdx) {
          var subModel = renderObj.model.subModels[subModelIdx];
          var pass = subModel.passes[passIdx];
          var isTransparent = pass.blendState.targets[0].blend;

          if (isTransparent !== this._passDesc.isTransparent || !(pass.phase & this._passDesc.phases)) {
            return false;
          }

          var hash = 0 << 30 | pass.priority << 16 | subModel.priority << 8 | passIdx;

          var rp = this._passPool.add();

          rp.hash = hash;
          rp.depth = renderObj.depth || 0;
          rp.shaderId = SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + passIdx);
          rp.subModel = subModel;
          rp.passIdx = passIdx;
          this.queue.push(rp);
          return true;
        }
        /**
         * @en Sort the current queue
         * @zh 排序渲染队列。
         */
        ;

        _proto.sort = function sort() {
          this.queue.sort();
        };

        _proto.recordCommandBuffer = function recordCommandBuffer(device, renderPass, cmdBuff) {
          for (var i = 0; i < this.queue.length; ++i) {
            var _this$queue$array$i = this.queue.array[i],
                subModel = _this$queue$array$i.subModel,
                passIdx = _this$queue$array$i.passIdx;
            var inputAssembler = subModel.inputAssembler,
                hSubModel = subModel.handle;
            var pass = subModel.passes[passIdx];
            var shader = ShaderPool.get(SubModelPool.get(hSubModel, SubModelView.SHADER_0 + passIdx));
            var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
            cmdBuff.bindPipelineState(pso);
            cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
            cmdBuff.bindDescriptorSet(SetIndex.LOCAL, subModel.descriptorSet);
            cmdBuff.bindInputAssembler(inputAssembler);
            cmdBuff.draw(inputAssembler);
          }
        };

        return RenderQueue;
      }());
    }
  };
});