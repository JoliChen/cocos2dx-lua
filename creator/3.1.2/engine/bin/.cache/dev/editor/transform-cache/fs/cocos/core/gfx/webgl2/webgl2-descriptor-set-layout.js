"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2DescriptorSetLayout = void 0;

var _define = require("../base/define.js");

var _descriptorSetLayout = require("../base/descriptor-set-layout.js");

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
class WebGL2DescriptorSetLayout extends _descriptorSetLayout.DescriptorSetLayout {
  constructor(...args) {
    super(...args);
    this._gpuDescriptorSetLayout = null;
  }

  get gpuDescriptorSetLayout() {
    return this._gpuDescriptorSetLayout;
  }

  initialize(info) {
    Array.prototype.push.apply(this._bindings, info.bindings);
    let descriptorCount = 0;
    let maxBinding = -1;
    const flattenedIndices = [];

    for (let i = 0; i < this._bindings.length; i++) {
      const binding = this._bindings[i];
      flattenedIndices.push(descriptorCount);
      descriptorCount += binding.count;
      if (binding.binding > maxBinding) maxBinding = binding.binding;
    }

    this._bindingIndices = Array(maxBinding + 1).fill(-1);
    const descriptorIndices = this._descriptorIndices = Array(maxBinding + 1).fill(-1);

    for (let i = 0; i < this._bindings.length; i++) {
      const binding = this._bindings[i];
      this._bindingIndices[binding.binding] = i;
      descriptorIndices[binding.binding] = flattenedIndices[i];
    }

    const dynamicBindings = [];

    for (let i = 0; i < this._bindings.length; i++) {
      const binding = this._bindings[i];

      if (binding.descriptorType & _define.DESCRIPTOR_DYNAMIC_TYPE) {
        for (let j = 0; j < binding.count; j++) {
          dynamicBindings.push(binding.binding);
        }
      }
    }

    this._gpuDescriptorSetLayout = {
      bindings: this._bindings,
      dynamicBindings,
      descriptorIndices,
      descriptorCount
    };
    return true;
  }

  destroy() {
    this._bindings.length = 0;
  }

}

exports.WebGL2DescriptorSetLayout = WebGL2DescriptorSetLayout;