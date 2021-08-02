"use strict";

var _buffer = require("./base/buffer.js");

var _commandBuffer = require("./base/command-buffer.js");

var _device = require("./base/device.js");

var _framebuffer = require("./base/framebuffer.js");

var _inputAssembler = require("./base/input-assembler.js");

var _descriptorSet = require("./base/descriptor-set.js");

var _descriptorSetLayout = require("./base/descriptor-set-layout.js");

var _pipelineLayout = require("./base/pipeline-layout.js");

var _pipelineState = require("./base/pipeline-state.js");

var _queue = require("./base/queue.js");

var _renderPass = require("./base/render-pass.js");

var _sampler = require("./base/sampler.js");

var _shader = require("./base/shader.js");

var _texture = require("./base/texture.js");

var _globalBarrier = require("./base/global-barrier.js");

var _textureBarrier = require("./base/texture-barrier.js");

var _globalExports = require("../global-exports.js");

var defines = _interopRequireWildcard(require("./base/define.js"));

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
 * @hidden
 */
const polyfills = {
  Device: _device.Device,
  Buffer: _buffer.Buffer,
  Texture: _texture.Texture,
  Sampler: _sampler.Sampler,
  Shader: _shader.Shader,
  InputAssembler: _inputAssembler.InputAssembler,
  RenderPass: _renderPass.RenderPass,
  Framebuffer: _framebuffer.Framebuffer,
  DescriptorSet: _descriptorSet.DescriptorSet,
  DescriptorSetLayout: _descriptorSetLayout.DescriptorSetLayout,
  PipelineLayout: _pipelineLayout.PipelineLayout,
  PipelineState: _pipelineState.PipelineState,
  CommandBuffer: _commandBuffer.CommandBuffer,
  Queue: _queue.Queue,
  GlobalBarrier: _globalBarrier.GlobalBarrier,
  TextureBarrier: _textureBarrier.TextureBarrier,
  RasterizerState: _pipelineState.RasterizerState,
  BlendState: _pipelineState.BlendState,
  BlendTarget: _pipelineState.BlendTarget,
  DepthStencilState: _pipelineState.DepthStencilState,
  PipelineStateInfo: _pipelineState.PipelineStateInfo
};
Object.assign(polyfills, defines);
_globalExports.legacyCC.gfx = polyfills;