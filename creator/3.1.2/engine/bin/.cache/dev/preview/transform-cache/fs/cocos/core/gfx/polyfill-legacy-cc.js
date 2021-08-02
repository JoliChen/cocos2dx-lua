System.register("q-bundled:///fs/cocos/core/gfx/polyfill-legacy-cc.js", ["./base/buffer.js", "./base/command-buffer.js", "./base/device.js", "./base/framebuffer.js", "./base/input-assembler.js", "./base/descriptor-set.js", "./base/descriptor-set-layout.js", "./base/pipeline-layout.js", "./base/pipeline-state.js", "./base/queue.js", "./base/render-pass.js", "./base/sampler.js", "./base/shader.js", "./base/texture.js", "./base/global-barrier.js", "./base/texture-barrier.js", "../global-exports.js", "./base/define.js"], function (_export, _context) {
  "use strict";

  var Buffer, CommandBuffer, Device, Framebuffer, InputAssembler, DescriptorSet, DescriptorSetLayout, PipelineLayout, PipelineState, PipelineStateInfo, RasterizerState, BlendState, BlendTarget, DepthStencilState, Queue, RenderPass, Sampler, Shader, Texture, GlobalBarrier, TextureBarrier, legacyCC, defines, polyfills;
  return {
    setters: [function (_baseBufferJs) {
      Buffer = _baseBufferJs.Buffer;
    }, function (_baseCommandBufferJs) {
      CommandBuffer = _baseCommandBufferJs.CommandBuffer;
    }, function (_baseDeviceJs) {
      Device = _baseDeviceJs.Device;
    }, function (_baseFramebufferJs) {
      Framebuffer = _baseFramebufferJs.Framebuffer;
    }, function (_baseInputAssemblerJs) {
      InputAssembler = _baseInputAssemblerJs.InputAssembler;
    }, function (_baseDescriptorSetJs) {
      DescriptorSet = _baseDescriptorSetJs.DescriptorSet;
    }, function (_baseDescriptorSetLayoutJs) {
      DescriptorSetLayout = _baseDescriptorSetLayoutJs.DescriptorSetLayout;
    }, function (_basePipelineLayoutJs) {
      PipelineLayout = _basePipelineLayoutJs.PipelineLayout;
    }, function (_basePipelineStateJs) {
      PipelineState = _basePipelineStateJs.PipelineState;
      PipelineStateInfo = _basePipelineStateJs.PipelineStateInfo;
      RasterizerState = _basePipelineStateJs.RasterizerState;
      BlendState = _basePipelineStateJs.BlendState;
      BlendTarget = _basePipelineStateJs.BlendTarget;
      DepthStencilState = _basePipelineStateJs.DepthStencilState;
    }, function (_baseQueueJs) {
      Queue = _baseQueueJs.Queue;
    }, function (_baseRenderPassJs) {
      RenderPass = _baseRenderPassJs.RenderPass;
    }, function (_baseSamplerJs) {
      Sampler = _baseSamplerJs.Sampler;
    }, function (_baseShaderJs) {
      Shader = _baseShaderJs.Shader;
    }, function (_baseTextureJs) {
      Texture = _baseTextureJs.Texture;
    }, function (_baseGlobalBarrierJs) {
      GlobalBarrier = _baseGlobalBarrierJs.GlobalBarrier;
    }, function (_baseTextureBarrierJs) {
      TextureBarrier = _baseTextureBarrierJs.TextureBarrier;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_baseDefineJs) {
      defines = _baseDefineJs;
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
       * @hidden
       */
      polyfills = {
        Device: Device,
        Buffer: Buffer,
        Texture: Texture,
        Sampler: Sampler,
        Shader: Shader,
        InputAssembler: InputAssembler,
        RenderPass: RenderPass,
        Framebuffer: Framebuffer,
        DescriptorSet: DescriptorSet,
        DescriptorSetLayout: DescriptorSetLayout,
        PipelineLayout: PipelineLayout,
        PipelineState: PipelineState,
        CommandBuffer: CommandBuffer,
        Queue: Queue,
        GlobalBarrier: GlobalBarrier,
        TextureBarrier: TextureBarrier,
        RasterizerState: RasterizerState,
        BlendState: BlendState,
        BlendTarget: BlendTarget,
        DepthStencilState: DepthStencilState,
        PipelineStateInfo: PipelineStateInfo
      };
      Object.assign(polyfills, defines);
      legacyCC.gfx = polyfills;
    }
  };
});