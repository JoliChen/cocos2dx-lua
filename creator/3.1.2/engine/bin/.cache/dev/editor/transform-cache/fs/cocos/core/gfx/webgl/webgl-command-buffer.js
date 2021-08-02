"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLCommandBuffer = void 0;

var _commandBuffer = require("../base/command-buffer.js");

var _define = require("../base/define.js");

var _webglCommands = require("./webgl-commands.js");

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
class WebGLCommandBuffer extends _commandBuffer.CommandBuffer {
  constructor(...args) {
    super(...args);
    this.cmdPackage = new _webglCommands.WebGLCmdPackage();
    this._webGLAllocator = null;
    this._isInRenderPass = false;
    this._curGPUPipelineState = null;
    this._curGPUInputAssembler = null;
    this._curGPUDescriptorSets = [];
    this._curDynamicOffsets = Array(8).fill(0);
    this._curDynamicStates = new _define.DynamicStates();
    this._isStateInvalied = false;
  }

  initialize(info) {
    this._type = info.type;
    this._queue = info.queue;
    this._webGLAllocator = this._device.cmdAllocator;
    const setCount = this._device.bindingMappingInfo.bufferOffsets.length;

    for (let i = 0; i < setCount; i++) {
      this._curGPUDescriptorSets.push(null);
    }

    return true;
  }

  destroy() {
    if (this._webGLAllocator) {
      this._webGLAllocator.clearCmds(this.cmdPackage);

      this._webGLAllocator = null;
    }
  }

  begin(renderPass, subpass = 0, frameBuffer) {
    this._webGLAllocator.clearCmds(this.cmdPackage);

    this._curGPUPipelineState = null;
    this._curGPUInputAssembler = null;
    this._curGPUDescriptorSets.length = 0;
    this._numDrawCalls = 0;
    this._numInstances = 0;
    this._numTris = 0;
  }

  end() {
    if (this._isStateInvalied) {
      this.bindStates();
    }

    this._isInRenderPass = false;
  }

  beginRenderPass(renderPass, framebuffer, renderArea, clearColors, clearDepth, clearStencil) {
    const cmd = this._webGLAllocator.beginRenderPassCmdPool.alloc(_webglCommands.WebGLCmdBeginRenderPass);

    cmd.gpuRenderPass = renderPass.gpuRenderPass;
    cmd.gpuFramebuffer = framebuffer.gpuFramebuffer;
    cmd.renderArea = renderArea;
    cmd.clearColors.length = clearColors.length;

    for (let i = 0; i < clearColors.length; ++i) {
      cmd.clearColors[i] = clearColors[i];
    }

    cmd.clearDepth = clearDepth;
    cmd.clearStencil = clearStencil;
    this.cmdPackage.beginRenderPassCmds.push(cmd);
    this.cmdPackage.cmds.push(_webglCommands.WebGLCmd.BEGIN_RENDER_PASS);
    this._isInRenderPass = true;
  }

  endRenderPass() {
    this._isInRenderPass = false;
  }

  bindPipelineState(pipelineState) {
    const gpuPipelineState = pipelineState.gpuPipelineState;

    if (gpuPipelineState !== this._curGPUPipelineState) {
      this._curGPUPipelineState = gpuPipelineState;
      this._isStateInvalied = true;
    }
  }

  bindDescriptorSet(set, descriptorSet, dynamicOffsets) {
    const gpuDescriptorSet = descriptorSet.gpuDescriptorSet;

    if (gpuDescriptorSet !== this._curGPUDescriptorSets[set]) {
      this._curGPUDescriptorSets[set] = gpuDescriptorSet;
      this._isStateInvalied = true;
    }

    if (dynamicOffsets) {
      var _this$_curGPUPipeline;

      const gpuPipelineLayout = (_this$_curGPUPipeline = this._curGPUPipelineState) === null || _this$_curGPUPipeline === void 0 ? void 0 : _this$_curGPUPipeline.gpuPipelineLayout;

      if (gpuPipelineLayout) {
        const offsets = this._curDynamicOffsets;
        const idx = gpuPipelineLayout.dynamicOffsetOffsets[set];

        for (let i = 0; i < dynamicOffsets.length; i++) offsets[idx + i] = dynamicOffsets[i];

        this._isStateInvalied = true;
      }
    }
  }

  bindInputAssembler(inputAssembler) {
    const gpuInputAssembler = inputAssembler.gpuInputAssembler;
    this._curGPUInputAssembler = gpuInputAssembler;
    this._isStateInvalied = true;
  }

  setViewport(viewport) {
    const cache = this._curDynamicStates.viewport;

    if (cache.left !== viewport.left || cache.top !== viewport.top || cache.width !== viewport.width || cache.height !== viewport.height || cache.minDepth !== viewport.minDepth || cache.maxDepth !== viewport.maxDepth) {
      cache.left = viewport.left;
      cache.top = viewport.top;
      cache.width = viewport.width;
      cache.height = viewport.height;
      cache.minDepth = viewport.minDepth;
      cache.maxDepth = viewport.maxDepth;
      this._isStateInvalied = true;
    }
  }

  setScissor(scissor) {
    const cache = this._curDynamicStates.scissor;

    if (cache.x !== scissor.x || cache.y !== scissor.y || cache.width !== scissor.width || cache.height !== scissor.height) {
      cache.x = scissor.x;
      cache.y = scissor.y;
      cache.width = scissor.width;
      cache.height = scissor.height;
      this._isStateInvalied = true;
    }
  }

  setLineWidth(lineWidth) {
    if (this._curDynamicStates.lineWidth !== lineWidth) {
      this._curDynamicStates.lineWidth = lineWidth;
      this._isStateInvalied = true;
    }
  }

  setDepthBias(depthBiasConstantFactor, depthBiasClamp, depthBiasSlopeFactor) {
    const cache = this._curDynamicStates;

    if (cache.depthBiasConstant !== depthBiasConstantFactor || cache.depthBiasClamp !== depthBiasClamp || cache.depthBiasSlope !== depthBiasSlopeFactor) {
      cache.depthBiasConstant = depthBiasConstantFactor;
      cache.depthBiasClamp = depthBiasClamp;
      cache.depthBiasSlope = depthBiasSlopeFactor;
      this._isStateInvalied = true;
    }
  }

  setBlendConstants(blendConstants) {
    const cache = this._curDynamicStates.blendConstant;

    if (cache.x !== blendConstants.x || cache.y !== blendConstants.y || cache.z !== blendConstants.z || cache.w !== blendConstants.w) {
      cache.copy(blendConstants);
      this._isStateInvalied = true;
    }
  }

  setDepthBound(minDepthBounds, maxDepthBounds) {
    const cache = this._curDynamicStates;

    if (cache.depthMinBounds !== minDepthBounds || cache.depthMaxBounds !== maxDepthBounds) {
      cache.depthMinBounds = minDepthBounds;
      cache.depthMaxBounds = maxDepthBounds;
      this._isStateInvalied = true;
    }
  }

  setStencilWriteMask(face, writeMask) {
    const front = this._curDynamicStates.stencilStatesFront;
    const back = this._curDynamicStates.stencilStatesBack;

    if (face & _define.StencilFace.FRONT) {
      if (front.writeMask !== writeMask) {
        front.writeMask = writeMask;
        this._isStateInvalied = true;
      }
    }

    if (face & _define.StencilFace.BACK) {
      if (back.writeMask !== writeMask) {
        back.writeMask = writeMask;
        this._isStateInvalied = true;
      }
    }
  }

  setStencilCompareMask(face, reference, compareMask) {
    const front = this._curDynamicStates.stencilStatesFront;
    const back = this._curDynamicStates.stencilStatesBack;

    if (face & _define.StencilFace.FRONT) {
      if (front.compareMask !== compareMask || front.reference !== reference) {
        front.reference = reference;
        front.compareMask = compareMask;
        this._isStateInvalied = true;
      }
    }

    if (face & _define.StencilFace.BACK) {
      if (back.compareMask !== compareMask || back.reference !== reference) {
        back.reference = reference;
        back.compareMask = compareMask;
        this._isStateInvalied = true;
      }
    }
  }

  draw(info) {
    if (this._type === _define.CommandBufferType.PRIMARY && this._isInRenderPass || this._type === _define.CommandBufferType.SECONDARY) {
      if (this._isStateInvalied) {
        this.bindStates();
      }

      const cmd = this._webGLAllocator.drawCmdPool.alloc(_webglCommands.WebGLCmdDraw); // cmd.drawInfo = inputAssembler;


      cmd.drawInfo.vertexCount = info.vertexCount;
      cmd.drawInfo.firstVertex = info.firstVertex;
      cmd.drawInfo.indexCount = info.indexCount;
      cmd.drawInfo.firstIndex = info.firstIndex;
      cmd.drawInfo.vertexOffset = info.vertexOffset;
      cmd.drawInfo.instanceCount = info.instanceCount;
      cmd.drawInfo.firstInstance = info.firstInstance;
      this.cmdPackage.drawCmds.push(cmd);
      this.cmdPackage.cmds.push(_webglCommands.WebGLCmd.DRAW);
      ++this._numDrawCalls;
      this._numInstances += info.instanceCount;
      const indexCount = info.indexCount || info.vertexCount;

      if (this._curGPUPipelineState) {
        const glPrimitive = this._curGPUPipelineState.glPrimitive;

        switch (glPrimitive) {
          case 0x0004:
            {
              // WebGLRenderingContext.TRIANGLES
              this._numTris += indexCount / 3 * Math.max(info.instanceCount, 1);
              break;
            }

          case 0x0005: // WebGLRenderingContext.TRIANGLE_STRIP

          case 0x0006:
            {
              // WebGLRenderingContext.TRIANGLE_FAN
              this._numTris += (indexCount - 2) * Math.max(info.instanceCount, 1);
              break;
            }

          default:
        }
      }
    } else {
      console.error('Command \'draw\' must be recorded inside a render pass.');
    }
  }

  updateBuffer(buffer, data, size) {
    if (this._type === _define.CommandBufferType.PRIMARY && !this._isInRenderPass || this._type === _define.CommandBufferType.SECONDARY) {
      const gpuBuffer = buffer.gpuBuffer;

      if (gpuBuffer) {
        const cmd = this._webGLAllocator.updateBufferCmdPool.alloc(_webglCommands.WebGLCmdUpdateBuffer);

        let buffSize = 0;
        let buff = null; // TODO: Have to copy to staging buffer first to make this work for the execution is deferred.
        // But since we are using specialized primary command buffers in WebGL backends, we leave it as is for now

        if (buffer.usage & _define.BufferUsageBit.INDIRECT) {
          buff = data;
        } else {
          if (size !== undefined) {
            buffSize = size;
          } else {
            buffSize = data.byteLength;
          }

          buff = data;
        }

        cmd.gpuBuffer = gpuBuffer;
        cmd.buffer = buff;
        cmd.offset = 0;
        cmd.size = buffSize;
        this.cmdPackage.updateBufferCmds.push(cmd);
        this.cmdPackage.cmds.push(_webglCommands.WebGLCmd.UPDATE_BUFFER);
      }
    } else {
      console.error('Command \'updateBuffer\' must be recorded outside a render pass.');
    }
  }

  copyBuffersToTexture(buffers, texture, regions) {
    if (this._type === _define.CommandBufferType.PRIMARY && !this._isInRenderPass || this._type === _define.CommandBufferType.SECONDARY) {
      const gpuTexture = texture.gpuTexture;

      if (gpuTexture) {
        const cmd = this._webGLAllocator.copyBufferToTextureCmdPool.alloc(_webglCommands.WebGLCmdCopyBufferToTexture);

        if (cmd) {
          cmd.gpuTexture = gpuTexture;
          cmd.regions = regions; // TODO: Have to copy to staging buffer first to make this work for the execution is deferred.
          // But since we are using specialized primary command buffers in WebGL backends, we leave it as is for now

          cmd.buffers = buffers;
          this.cmdPackage.copyBufferToTextureCmds.push(cmd);
          this.cmdPackage.cmds.push(_webglCommands.WebGLCmd.COPY_BUFFER_TO_TEXTURE);
        }
      }
    } else {
      console.error('Command \'copyBufferToTexture\' must be recorded outside a render pass.');
    }
  }

  execute(cmdBuffs, count) {
    for (let i = 0; i < count; ++i) {
      const webGLCmdBuff = cmdBuffs[i];

      for (let c = 0; c < webGLCmdBuff.cmdPackage.beginRenderPassCmds.length; ++c) {
        const cmd = webGLCmdBuff.cmdPackage.beginRenderPassCmds.array[c];
        ++cmd.refCount;
        this.cmdPackage.beginRenderPassCmds.push(cmd);
      }

      for (let c = 0; c < webGLCmdBuff.cmdPackage.bindStatesCmds.length; ++c) {
        const cmd = webGLCmdBuff.cmdPackage.bindStatesCmds.array[c];
        ++cmd.refCount;
        this.cmdPackage.bindStatesCmds.push(cmd);
      }

      for (let c = 0; c < webGLCmdBuff.cmdPackage.drawCmds.length; ++c) {
        const cmd = webGLCmdBuff.cmdPackage.drawCmds.array[c];
        ++cmd.refCount;
        this.cmdPackage.drawCmds.push(cmd);
      }

      for (let c = 0; c < webGLCmdBuff.cmdPackage.updateBufferCmds.length; ++c) {
        const cmd = webGLCmdBuff.cmdPackage.updateBufferCmds.array[c];
        ++cmd.refCount;
        this.cmdPackage.updateBufferCmds.push(cmd);
      }

      for (let c = 0; c < webGLCmdBuff.cmdPackage.copyBufferToTextureCmds.length; ++c) {
        const cmd = webGLCmdBuff.cmdPackage.copyBufferToTextureCmds.array[c];
        ++cmd.refCount;
        this.cmdPackage.copyBufferToTextureCmds.push(cmd);
      }

      this.cmdPackage.cmds.concat(webGLCmdBuff.cmdPackage.cmds.array);
      this._numDrawCalls += webGLCmdBuff._numDrawCalls;
      this._numInstances += webGLCmdBuff._numInstances;
      this._numTris += webGLCmdBuff._numTris;
    }
  }

  pipelineBarrier(globalBarrier, textureBarriers) {}

  get webGLDevice() {
    return this._device;
  }

  bindStates() {
    const bindStatesCmd = this._webGLAllocator.bindStatesCmdPool.alloc(_webglCommands.WebGLCmdBindStates);

    if (bindStatesCmd) {
      bindStatesCmd.gpuPipelineState = this._curGPUPipelineState;
      Array.prototype.push.apply(bindStatesCmd.gpuDescriptorSets, this._curGPUDescriptorSets);
      Array.prototype.push.apply(bindStatesCmd.dynamicOffsets, this._curDynamicOffsets);
      bindStatesCmd.gpuInputAssembler = this._curGPUInputAssembler;
      bindStatesCmd.dynamicStates.copy(this._curDynamicStates);
      this.cmdPackage.bindStatesCmds.push(bindStatesCmd);
      this.cmdPackage.cmds.push(_webglCommands.WebGLCmd.BIND_STATES);
      this._isStateInvalied = false;
    }
  }

}

exports.WebGLCommandBuffer = WebGLCommandBuffer;