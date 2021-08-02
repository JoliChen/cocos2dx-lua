System.register("q-bundled:///fs/cocos/core/pipeline/index.js", ["./define.js", "./forward/forward-pipeline.js", "./pass-phase.js", "./render-pipeline.js", "./render-flow.js", "./render-stage.js", "./forward/forward-flow.js", "./forward/forward-stage.js", "./deferred/deferred-pipeline.js", "./deferred/gbuffer-flow.js", "./deferred/gbuffer-stage.js", "./deferred/lighting-flow.js", "./deferred/lighting-stage.js", "./deferred/postprocess-stage.js", "./shadow/shadow-flow.js", "./shadow/shadow-stage.js", "./instanced-buffer.js", "./pipeline-state-manager.js"], function (_export, _context) {
  "use strict";

  var pipeline, ForwardPipeline;

  function createDefaultPipeline() {
    var rppl = new ForwardPipeline();
    rppl.initialize({
      flows: []
    });
    return rppl;
  }

  _export("createDefaultPipeline", createDefaultPipeline);

  return {
    setters: [function (_defineJs) {
      pipeline = _defineJs;
    }, function (_forwardForwardPipelineJs) {
      ForwardPipeline = _forwardForwardPipelineJs.ForwardPipeline;

      _export("ForwardPipeline", _forwardForwardPipelineJs.ForwardPipeline);
    }, function (_passPhaseJs) {
      var _exportObj = {};

      for (var _key in _passPhaseJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _passPhaseJs[_key];
      }

      _export(_exportObj);
    }, function (_renderPipelineJs) {
      _export("RenderPipeline", _renderPipelineJs.RenderPipeline);
    }, function (_renderFlowJs) {
      _export("RenderFlow", _renderFlowJs.RenderFlow);
    }, function (_renderStageJs) {
      _export("RenderStage", _renderStageJs.RenderStage);
    }, function (_forwardForwardFlowJs) {
      _export("ForwardFlow", _forwardForwardFlowJs.ForwardFlow);
    }, function (_forwardForwardStageJs) {
      _export("ForwardStage", _forwardForwardStageJs.ForwardStage);
    }, function (_deferredDeferredPipelineJs) {
      _export("DeferredPipeline", _deferredDeferredPipelineJs.DeferredPipeline);
    }, function (_deferredGbufferFlowJs) {
      _export("GbufferFlow", _deferredGbufferFlowJs.GbufferFlow);
    }, function (_deferredGbufferStageJs) {
      _export("GbufferStage", _deferredGbufferStageJs.GbufferStage);
    }, function (_deferredLightingFlowJs) {
      _export("LightingFlow", _deferredLightingFlowJs.LightingFlow);
    }, function (_deferredLightingStageJs) {
      _export("LightingStage", _deferredLightingStageJs.LightingStage);
    }, function (_deferredPostprocessStageJs) {
      _export("PostprocessStage", _deferredPostprocessStageJs.PostprocessStage);
    }, function (_shadowShadowFlowJs) {
      _export("ShadowFlow", _shadowShadowFlowJs.ShadowFlow);
    }, function (_shadowShadowStageJs) {
      _export("ShadowStage", _shadowShadowStageJs.ShadowStage);
    }, function (_instancedBufferJs) {
      _export("InstancedBuffer", _instancedBufferJs.InstancedBuffer);
    }, function (_pipelineStateManagerJs) {
      _export("PipelineStateManager", _pipelineStateManagerJs.PipelineStateManager);
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
      _export("pipeline", pipeline);
    }
  };
});