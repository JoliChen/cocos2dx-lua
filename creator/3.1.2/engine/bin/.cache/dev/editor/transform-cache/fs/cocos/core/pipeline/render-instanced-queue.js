"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderInstancedQueue = void 0;

var _pipelineStateManager = require("./pipeline-state-manager.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _define = require("./define.js");

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
class RenderInstancedQueue {
  constructor() {
    this.queue = new Set();
  }

  /**
   * @en Clear the render queue
   * @zh 清空渲染队列。
   */
  clear() {
    const it = this.queue.values();
    let res = it.next();

    while (!res.done) {
      res.value.clear();
      res = it.next();
    }

    this.queue.clear();
  }

  uploadBuffers(cmdBuff) {
    const it = this.queue.values();
    let res = it.next();

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


  recordCommandBuffer(device, renderPass, cmdBuff) {
    const it = this.queue.values();
    let res = it.next();

    while (!res.done) {
      const {
        instances,
        pass,
        hasPendingModels
      } = res.value;

      if (hasPendingModels) {
        cmdBuff.bindDescriptorSet(_define.SetIndex.MATERIAL, pass.descriptorSet);
        let lastPSO = null;

        for (let b = 0; b < instances.length; ++b) {
          const instance = instances[b];

          if (!instance.count) {
            continue;
          }

          const shader = _memoryPools.ShaderPool.get(instance.hShader);

          const pso = _pipelineStateManager.PipelineStateManager.getOrCreatePipelineState(device, pass, shader, renderPass, instance.ia);

          if (lastPSO !== pso) {
            cmdBuff.bindPipelineState(pso);
            lastPSO = pso;
          }

          cmdBuff.bindDescriptorSet(_define.SetIndex.LOCAL, _memoryPools.DSPool.get(instance.hDescriptorSet), res.value.dynamicOffsets);
          cmdBuff.bindInputAssembler(instance.ia);
          cmdBuff.draw(instance.ia);
        }
      }

      res = it.next();
    }
  }

}

exports.RenderInstancedQueue = RenderInstancedQueue;