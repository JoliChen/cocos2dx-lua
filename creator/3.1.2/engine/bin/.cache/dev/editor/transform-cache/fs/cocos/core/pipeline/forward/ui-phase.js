"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIPhase = void 0;

var _pipelineStateManager = require("../pipeline-state-manager.js");

var _define = require("../define.js");

var _memoryPools = require("../../renderer/core/memory-pools.js");

var _passPhase = require("../pass-phase.js");

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
class UIPhase {
  constructor() {
    this._phaseID = (0, _passPhase.getPhaseID)('default');
  }

  activate(pipeline) {
    this._pipeline = pipeline;
  }

  render(camera, renderPass) {
    const pipeline = this._pipeline;
    const device = pipeline.device;
    const cmdBuff = pipeline.commandBuffers[0];
    const scene = camera.scene;
    const batches = scene.batches;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      let visible = false;

      if (camera.visibility & batch.visFlags) {
        visible = true;
      }

      if (!visible) continue;
      const handle = batch.handle;

      const count = _memoryPools.BatchPool2D.get(handle, _memoryPools.BatchView2D.PASS_COUNT);

      for (let j = 0; j < count; j++) {
        const pass = batch.passes[j];
        if (pass.phase !== this._phaseID) continue;

        const shaderHandle = _memoryPools.BatchPool2D.get(handle, _memoryPools.BatchView2D.SHADER_0 + j);

        const shader = _memoryPools.ShaderPool.get(shaderHandle);

        const inputAssembler = _memoryPools.IAPool.get(batch.hInputAssembler);

        const ds = _memoryPools.DSPool.get(batch.hDescriptorSet);

        const pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, inputAssembler);

        cmdBuff.bindPipelineState(pso);
        cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
        cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, ds);
        cmdBuff.bindInputAssembler(inputAssembler);
        cmdBuff.draw(inputAssembler);
      }
    }
  }

}

exports.UIPhase = UIPhase;