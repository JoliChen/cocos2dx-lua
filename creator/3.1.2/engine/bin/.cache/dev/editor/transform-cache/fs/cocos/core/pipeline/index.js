"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  createDefaultPipeline: true,
  pipeline: true,
  ForwardPipeline: true,
  RenderPipeline: true,
  RenderFlow: true,
  RenderStage: true,
  ForwardFlow: true,
  ForwardStage: true,
  DeferredPipeline: true,
  GbufferFlow: true,
  GbufferStage: true,
  LightingFlow: true,
  LightingStage: true,
  PostprocessStage: true,
  ShadowFlow: true,
  ShadowStage: true,
  InstancedBuffer: true,
  PipelineStateManager: true
};
exports.createDefaultPipeline = createDefaultPipeline;
Object.defineProperty(exports, "ForwardPipeline", {
  enumerable: true,
  get: function () {
    return _forwardPipeline.ForwardPipeline;
  }
});
Object.defineProperty(exports, "RenderPipeline", {
  enumerable: true,
  get: function () {
    return _renderPipeline.RenderPipeline;
  }
});
Object.defineProperty(exports, "RenderFlow", {
  enumerable: true,
  get: function () {
    return _renderFlow.RenderFlow;
  }
});
Object.defineProperty(exports, "RenderStage", {
  enumerable: true,
  get: function () {
    return _renderStage.RenderStage;
  }
});
Object.defineProperty(exports, "ForwardFlow", {
  enumerable: true,
  get: function () {
    return _forwardFlow.ForwardFlow;
  }
});
Object.defineProperty(exports, "ForwardStage", {
  enumerable: true,
  get: function () {
    return _forwardStage.ForwardStage;
  }
});
Object.defineProperty(exports, "DeferredPipeline", {
  enumerable: true,
  get: function () {
    return _deferredPipeline.DeferredPipeline;
  }
});
Object.defineProperty(exports, "GbufferFlow", {
  enumerable: true,
  get: function () {
    return _gbufferFlow.GbufferFlow;
  }
});
Object.defineProperty(exports, "GbufferStage", {
  enumerable: true,
  get: function () {
    return _gbufferStage.GbufferStage;
  }
});
Object.defineProperty(exports, "LightingFlow", {
  enumerable: true,
  get: function () {
    return _lightingFlow.LightingFlow;
  }
});
Object.defineProperty(exports, "LightingStage", {
  enumerable: true,
  get: function () {
    return _lightingStage.LightingStage;
  }
});
Object.defineProperty(exports, "PostprocessStage", {
  enumerable: true,
  get: function () {
    return _postprocessStage.PostprocessStage;
  }
});
Object.defineProperty(exports, "ShadowFlow", {
  enumerable: true,
  get: function () {
    return _shadowFlow.ShadowFlow;
  }
});
Object.defineProperty(exports, "ShadowStage", {
  enumerable: true,
  get: function () {
    return _shadowStage.ShadowStage;
  }
});
Object.defineProperty(exports, "InstancedBuffer", {
  enumerable: true,
  get: function () {
    return _instancedBuffer.InstancedBuffer;
  }
});
Object.defineProperty(exports, "PipelineStateManager", {
  enumerable: true,
  get: function () {
    return _pipelineStateManager.PipelineStateManager;
  }
});
exports.pipeline = void 0;

var pipeline = _interopRequireWildcard(require("./define.js"));

exports.pipeline = pipeline;

var _forwardPipeline = require("./forward/forward-pipeline.js");

var _passPhase = require("./pass-phase.js");

Object.keys(_passPhase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _passPhase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _passPhase[key];
    }
  });
});

var _renderPipeline = require("./render-pipeline.js");

var _renderFlow = require("./render-flow.js");

var _renderStage = require("./render-stage.js");

var _forwardFlow = require("./forward/forward-flow.js");

var _forwardStage = require("./forward/forward-stage.js");

var _deferredPipeline = require("./deferred/deferred-pipeline.js");

var _gbufferFlow = require("./deferred/gbuffer-flow.js");

var _gbufferStage = require("./deferred/gbuffer-stage.js");

var _lightingFlow = require("./deferred/lighting-flow.js");

var _lightingStage = require("./deferred/lighting-stage.js");

var _postprocessStage = require("./deferred/postprocess-stage.js");

var _shadowFlow = require("./shadow/shadow-flow.js");

var _shadowStage = require("./shadow/shadow-stage.js");

var _instancedBuffer = require("./instanced-buffer.js");

var _pipelineStateManager = require("./pipeline-state-manager.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
function createDefaultPipeline() {
  const rppl = new _forwardPipeline.ForwardPipeline();
  rppl.initialize({
    flows: []
  });
  return rppl;
}