"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstancedBuffer = void 0;

var _memoryPools = require("../renderer/core/memory-pools.js");

var _define = require("./define.js");

var _index = require("../gfx/index.js");

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
const INITIAL_CAPACITY = 32;
const MAX_CAPACITY = 1024;

class InstancedBuffer {
  static get(pass, extraKey = 0) {
    const buffers = InstancedBuffer._buffers;
    if (!buffers.has(pass)) buffers.set(pass, {});
    const record = buffers.get(pass);
    return record[extraKey] || (record[extraKey] = new InstancedBuffer(pass));
  }

  constructor(pass) {
    this.instances = [];
    this.pass = void 0;
    this.hasPendingModels = false;
    this.dynamicOffsets = [];
    this._device = void 0;
    this._device = pass.device;
    this.pass = pass;
  }

  destroy() {
    for (let i = 0; i < this.instances.length; ++i) {
      const instance = this.instances[i];
      instance.vb.destroy();
      instance.ia.destroy();
    }

    this.instances.length = 0;
  }

  merge(subModel, attrs, passIdx, hShaderImplant = null) {
    const stride = attrs.buffer.length;

    if (!stride) {
      return;
    } // we assume per-instance attributes are always present


    const sourceIA = subModel.inputAssembler;
    const lightingMap = subModel.descriptorSet.getTexture(_define.UNIFORM_LIGHTMAP_TEXTURE_BINDING);
    let hShader = hShaderImplant;

    if (!hShader) {
      hShader = _memoryPools.SubModelPool.get(subModel.handle, _memoryPools.SubModelView.SHADER_0 + passIdx);
    }

    const hDescriptorSet = _memoryPools.SubModelPool.get(subModel.handle, _memoryPools.SubModelView.DESCRIPTOR_SET);

    for (let i = 0; i < this.instances.length; ++i) {
      const instance = this.instances[i];

      if (instance.ia.indexBuffer !== sourceIA.indexBuffer || instance.count >= MAX_CAPACITY) {
        continue;
      } // check same binding


      if (instance.lightingMap !== lightingMap) {
        continue;
      }

      if (instance.stride !== stride) {
        // console.error(`instanced buffer stride mismatch! ${stride}/${instance.stride}`);
        return;
      }

      if (instance.count >= instance.capacity) {
        // resize buffers
        instance.capacity <<= 1;
        const newSize = instance.stride * instance.capacity;
        const oldData = instance.data;
        instance.data = new Uint8Array(newSize);
        instance.data.set(oldData);
        instance.vb.resize(newSize);
      }

      if (instance.hShader !== hShader) {
        instance.hShader = hShader;
      }

      if (instance.hDescriptorSet !== hDescriptorSet) {
        instance.hDescriptorSet = hDescriptorSet;
      }

      instance.data.set(attrs.buffer, instance.stride * instance.count++);
      this.hasPendingModels = true;
      return;
    } // Create a new instance


    const vb = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, stride * INITIAL_CAPACITY, stride));

    const data = new Uint8Array(stride * INITIAL_CAPACITY);
    const vertexBuffers = sourceIA.vertexBuffers.slice();
    const attributes = sourceIA.attributes.slice();
    const indexBuffer = sourceIA.indexBuffer;

    for (let i = 0; i < attrs.attributes.length; i++) {
      const attr = attrs.attributes[i];
      const newAttr = new _index.Attribute(attr.name, attr.format, attr.isNormalized, vertexBuffers.length, true);
      attributes.push(newAttr);
    }

    data.set(attrs.buffer);
    vertexBuffers.push(vb);
    const iaInfo = new _index.InputAssemblerInfo(attributes, vertexBuffers, indexBuffer);

    const ia = this._device.createInputAssembler(iaInfo);

    this.instances.push({
      count: 1,
      capacity: INITIAL_CAPACITY,
      vb,
      data,
      ia,
      stride,
      hShader,
      hDescriptorSet,
      lightingMap
    });
    this.hasPendingModels = true;
  }

  uploadBuffers(cmdBuff) {
    for (let i = 0; i < this.instances.length; ++i) {
      const instance = this.instances[i];

      if (!instance.count) {
        continue;
      }

      instance.ia.instanceCount = instance.count;
      cmdBuff.updateBuffer(instance.vb, instance.data);
    }
  }

  clear() {
    for (let i = 0; i < this.instances.length; ++i) {
      const instance = this.instances[i];
      instance.count = 0;
    }

    this.hasPendingModels = false;
  }

}

exports.InstancedBuffer = InstancedBuffer;
InstancedBuffer._buffers = new Map();