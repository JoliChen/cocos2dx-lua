"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLDescriptorSet = void 0;

var _descriptorSet = require("../base/descriptor-set.js");

var _define = require("../base/define.js");

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
class WebGLDescriptorSet extends _descriptorSet.DescriptorSet {
  constructor(...args) {
    super(...args);
    this._gpuDescriptorSet = null;
  }

  get gpuDescriptorSet() {
    return this._gpuDescriptorSet;
  }

  initialize(info) {
    this._layout = info.layout;
    const {
      bindings,
      descriptorIndices,
      descriptorCount
    } = info.layout.gpuDescriptorSetLayout;
    this._buffers = Array(descriptorCount).fill(null);
    this._textures = Array(descriptorCount).fill(null);
    this._samplers = Array(descriptorCount).fill(null);
    const gpuDescriptors = [];
    this._gpuDescriptorSet = {
      gpuDescriptors,
      descriptorIndices
    };

    for (let i = 0; i < bindings.length; ++i) {
      const binding = bindings[i];

      for (let j = 0; j < binding.count; j++) {
        gpuDescriptors.push({
          type: binding.descriptorType,
          gpuBuffer: null,
          gpuTexture: null,
          gpuSampler: null
        });
      }
    }

    return true;
  }

  destroy() {
    this._layout = null;
    this._gpuDescriptorSet = null;
  }

  update() {
    if (this._isDirty && this._gpuDescriptorSet) {
      const descriptors = this._gpuDescriptorSet.gpuDescriptors;

      for (let i = 0; i < descriptors.length; ++i) {
        if (descriptors[i].type & _define.DESCRIPTOR_BUFFER_TYPE) {
          const buffer = this._buffers[i];

          if (buffer) {
            descriptors[i].gpuBuffer = buffer.gpuBuffer || buffer.gpuBufferView;
          }
        } else if (descriptors[i].type & _define.DESCRIPTOR_SAMPLER_TYPE) {
          if (this._textures[i]) {
            descriptors[i].gpuTexture = this._textures[i].gpuTexture;
          }

          if (this._samplers[i]) {
            descriptors[i].gpuSampler = this._samplers[i].gpuSampler;
          }
        }
      }

      this._isDirty = false;
    }
  }

}

exports.WebGLDescriptorSet = WebGLDescriptorSet;