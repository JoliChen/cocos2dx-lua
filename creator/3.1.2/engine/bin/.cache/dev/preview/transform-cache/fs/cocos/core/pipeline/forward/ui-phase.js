System.register("q-bundled:///fs/cocos/core/pipeline/forward/ui-phase.js", ["../pipeline-state-manager.js", "../define.js", "../../renderer/core/memory-pools.js", "../pass-phase.js"], function (_export, _context) {
  "use strict";

  var PipelineStateManager, SetIndex, IAPool, DSPool, ShaderPool, BatchPool2D, BatchView2D, getPhaseID, UIPhase;
  return {
    setters: [function (_pipelineStateManagerJs) {
      PipelineStateManager = _pipelineStateManagerJs.PipelineStateManager;
    }, function (_defineJs) {
      SetIndex = _defineJs.SetIndex;
    }, function (_rendererCoreMemoryPoolsJs) {
      IAPool = _rendererCoreMemoryPoolsJs.IAPool;
      DSPool = _rendererCoreMemoryPoolsJs.DSPool;
      ShaderPool = _rendererCoreMemoryPoolsJs.ShaderPool;
      BatchPool2D = _rendererCoreMemoryPoolsJs.BatchPool2D;
      BatchView2D = _rendererCoreMemoryPoolsJs.BatchView2D;
    }, function (_passPhaseJs) {
      getPhaseID = _passPhaseJs.getPhaseID;
    }],
    execute: function () {
      /*
       Copyright (c) 2018-2021 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
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
      _export("UIPhase", UIPhase = /*#__PURE__*/function () {
        function UIPhase() {
          this._phaseID = getPhaseID('default');
        }

        var _proto = UIPhase.prototype;

        _proto.activate = function activate(pipeline) {
          this._pipeline = pipeline;
        };

        _proto.render = function render(camera, renderPass) {
          var pipeline = this._pipeline;
          var device = pipeline.device;
          var cmdBuff = pipeline.commandBuffers[0];
          var scene = camera.scene;
          var batches = scene.batches;

          for (var i = 0; i < batches.length; i++) {
            var batch = batches[i];
            var visible = false;

            if (camera.visibility & batch.visFlags) {
              visible = true;
            }

            if (!visible) continue;
            var handle = batch.handle;
            var count = BatchPool2D.get(handle, BatchView2D.PASS_COUNT);

            for (var j = 0; j < count; j++) {
              var pass = batch.passes[j];
              if (pass.phase !== this._phaseID) continue;
              var shaderHandle = BatchPool2D.get(handle, BatchView2D.SHADER_0 + j);
              var shader = ShaderPool.get(shaderHandle);
              var inputAssembler = IAPool.get(batch.hInputAssembler);
              var ds = DSPool.get(batch.hDescriptorSet);
              var pso = PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);
              cmdBuff.bindPipelineState(pso);
              cmdBuff.bindDescriptorSet(SetIndex.MATERIAL, pass.descriptorSet);
              cmdBuff.bindDescriptorSet(SetIndex.LOCAL, ds);
              cmdBuff.bindInputAssembler(inputAssembler);
              cmdBuff.draw(inputAssembler);
            }
          }
        };

        return UIPhase;
      }());
    }
  };
});