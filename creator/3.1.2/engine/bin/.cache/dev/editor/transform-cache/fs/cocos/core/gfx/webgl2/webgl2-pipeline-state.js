"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2PipelineState = void 0;

var _pipelineState = require("../base/pipeline-state.js");

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
const WebGLPrimitives = [0x0000, // WebGLRenderingContext.POINTS,
0x0001, // WebGLRenderingContext.LINES,
0x0003, // WebGLRenderingContext.LINE_STRIP,
0x0002, // WebGLRenderingContext.LINE_LOOP,
0x0000, // WebGLRenderingContext.NONE,
0x0000, // WebGLRenderingContext.NONE,
0x0000, // WebGLRenderingContext.NONE,
0x0004, // WebGLRenderingContext.TRIANGLES,
0x0005, // WebGLRenderingContext.TRIANGLE_STRIP,
0x0006, // WebGLRenderingContext.TRIANGLE_FAN,
0x0000, // WebGLRenderingContext.NONE,
0x0000, // WebGLRenderingContext.NONE,
0x0000, // WebGLRenderingContext.NONE,
0x0000 // WebGLRenderingContext.NONE,
];

class WebGL2PipelineState extends _pipelineState.PipelineState {
  constructor(...args) {
    super(...args);
    this._gpuPipelineState = null;
  }

  get gpuPipelineState() {
    return this._gpuPipelineState;
  }

  initialize(info) {
    this._primitive = info.primitive;
    this._shader = info.shader;
    this._pipelineLayout = info.pipelineLayout;
    const bs = this._bs;

    if (info.blendState) {
      const bsInfo = info.blendState;
      const {
        targets
      } = bsInfo;

      if (targets) {
        targets.forEach((t, i) => {
          bs.setTarget(i, t);
        });
      }

      if (bsInfo.isA2C !== undefined) {
        bs.isA2C = bsInfo.isA2C;
      }

      if (bsInfo.isIndepend !== undefined) {
        bs.isIndepend = bsInfo.isIndepend;
      }

      if (bsInfo.blendColor !== undefined) {
        bs.blendColor = bsInfo.blendColor;
      }
    }

    Object.assign(this._rs, info.rasterizerState);
    Object.assign(this._dss, info.depthStencilState);
    this._is = info.inputState;
    this._renderPass = info.renderPass;
    this._dynamicStates = info.dynamicStates;
    const dynamicStates = [];

    for (let i = 0; i < 31; i++) {
      if (this._dynamicStates & 1 << i) {
        dynamicStates.push(1 << i);
      }
    }

    this._gpuPipelineState = {
      glPrimitive: WebGLPrimitives[info.primitive],
      gpuShader: info.shader.gpuShader,
      gpuPipelineLayout: info.pipelineLayout.gpuPipelineLayout,
      rs: info.rasterizerState,
      dss: info.depthStencilState,
      bs: info.blendState,
      gpuRenderPass: info.renderPass.gpuRenderPass,
      dynamicStates
    };
    return true;
  }

  destroy() {
    this._gpuPipelineState = null;
  }

}

exports.WebGL2PipelineState = WebGL2PipelineState;