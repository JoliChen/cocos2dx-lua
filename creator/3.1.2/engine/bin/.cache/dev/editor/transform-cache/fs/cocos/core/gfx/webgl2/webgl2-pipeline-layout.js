"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2PipelineLayout = void 0;

var _pipelineLayout = require("../base/pipeline-layout.js");

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
class WebGL2PipelineLayout extends _pipelineLayout.PipelineLayout {
  constructor(...args) {
    super(...args);
    this._gpuPipelineLayout = null;
  }

  get gpuPipelineLayout() {
    return this._gpuPipelineLayout;
  }

  initialize(info) {
    Array.prototype.push.apply(this._setLayouts, info.setLayouts);
    const dynamicOffsetIndices = [];
    const gpuSetLayouts = [];
    let dynamicOffsetCount = 0;
    const dynamicOffsetOffsets = [];

    for (let i = 0; i < this._setLayouts.length; i++) {
      const setLayout = this._setLayouts[i];
      const dynamicBindings = setLayout.gpuDescriptorSetLayout.dynamicBindings;
      const indices = Array(setLayout.bindingIndices.length).fill(-1);

      for (let j = 0; j < dynamicBindings.length; j++) {
        const binding = dynamicBindings[j];
        if (indices[binding] < 0) indices[binding] = dynamicOffsetCount + j;
      }

      gpuSetLayouts.push(setLayout.gpuDescriptorSetLayout);
      dynamicOffsetIndices.push(indices);
      dynamicOffsetOffsets.push(dynamicOffsetCount);
      dynamicOffsetCount += dynamicBindings.length;
    }

    this._gpuPipelineLayout = {
      gpuSetLayouts,
      dynamicOffsetIndices,
      dynamicOffsetCount,
      dynamicOffsetOffsets
    };
    return true;
  }

  destroy() {
    this._setLayouts.length = 0;
  }

}

exports.WebGL2PipelineLayout = WebGL2PipelineLayout;