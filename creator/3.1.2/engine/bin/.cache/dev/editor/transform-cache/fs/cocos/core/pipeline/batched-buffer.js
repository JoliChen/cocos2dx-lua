"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BatchedBuffer = void 0;

var _index = require("../gfx/index.js");

var _index2 = require("../math/index.js");

var _define = require("./define.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

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
class BatchedBuffer {
  static get(pass, extraKey = 0) {
    const buffers = BatchedBuffer._buffers;
    if (!buffers.has(pass)) buffers.set(pass, {});
    const record = buffers.get(pass);
    return record[extraKey] || (record[extraKey] = new BatchedBuffer(pass));
  }

  constructor(pass) {
    this.batches = [];
    this.dynamicOffsets = [];
    this._device = void 0;
    this._device = pass.device;
  }

  destroy() {
    for (let i = 0; i < this.batches.length; ++i) {
      const batch = this.batches[i];

      for (let j = 0; j < batch.vbs.length; ++j) {
        batch.vbs[j].destroy();
      }

      batch.vbIdx.destroy();
      batch.ia.destroy();
      batch.ubo.destroy();
    }

    this.batches.length = 0;
  }

  merge(subModel, passIdx, model) {
    const flatBuffers = subModel.subMesh.flatBuffers;

    if (flatBuffers.length === 0) {
      return;
    }

    let vbSize = 0;
    let vbIdxSize = 0;
    const vbCount = flatBuffers[0].count;
    const pass = subModel.passes[passIdx];

    const hShader = _memoryPools.SubModelPool.get(subModel.handle, _memoryPools.SubModelView.SHADER_0 + passIdx);

    const descriptorSet = subModel.descriptorSet;
    let isBatchExist = false;

    for (let i = 0; i < this.batches.length; ++i) {
      const batch = this.batches[i];

      if (batch.vbs.length === flatBuffers.length && batch.mergeCount < _define.UBOLocalBatched.BATCHING_COUNT) {
        isBatchExist = true;

        for (let j = 0; j < batch.vbs.length; ++j) {
          const vb = batch.vbs[j];

          if (vb.stride !== flatBuffers[j].stride) {
            isBatchExist = false;
            break;
          }
        }

        if (isBatchExist) {
          for (let j = 0; j < batch.vbs.length; ++j) {
            const flatBuff = flatBuffers[j];
            const batchVB = batch.vbs[j];
            const vbBuf = batch.vbDatas[j];
            vbSize = (vbCount + batch.vbCount) * flatBuff.stride;

            if (vbSize > batchVB.size) {
              batchVB.resize(vbSize);
              batch.vbDatas[j] = new Uint8Array(vbSize);
              batch.vbDatas[j].set(vbBuf);
            }

            batch.vbDatas[j].set(flatBuff.buffer, batch.vbCount * flatBuff.stride);
          }

          let vbIdxBuf = batch.vbIdxData;
          vbIdxSize = (vbCount + batch.vbCount) * 4;

          if (vbIdxSize > batch.vbIdx.size) {
            batch.vbIdx.resize(vbIdxSize);
            batch.vbIdxData = new Float32Array(vbIdxSize / Float32Array.BYTES_PER_ELEMENT);
            batch.vbIdxData.set(vbIdxBuf);
            vbIdxBuf = batch.vbIdxData;
          }

          const start = batch.vbCount;
          const end = start + vbCount;
          const mergeCount = batch.mergeCount;

          if (vbIdxBuf[start] !== mergeCount || vbIdxBuf[end - 1] !== mergeCount) {
            for (let j = start; j < end; j++) {
              vbIdxBuf[j] = mergeCount + 0.1; // guard against underflow
            }
          } // update world matrix


          _index2.Mat4.toArray(batch.uboData, model.transform.worldMatrix, _define.UBOLocalBatched.MAT_WORLDS_OFFSET + batch.mergeCount * 16);

          if (!batch.mergeCount) {
            descriptorSet.bindBuffer(_define.UBOLocalBatched.BINDING, batch.ubo);
            descriptorSet.update();
            batch.pass = pass;
            batch.hShader = hShader;
            batch.descriptorSet = descriptorSet;
          }

          ++batch.mergeCount;
          batch.vbCount += vbCount;
          batch.ia.vertexCount += vbCount;
          return;
        }
      }
    } // Create a new batch


    const vbs = [];
    const vbDatas = [];
    const totalVBs = [];

    for (let i = 0; i < flatBuffers.length; ++i) {
      const flatBuff = flatBuffers[i];

      const newVB = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, flatBuff.count * flatBuff.stride, flatBuff.stride));

      newVB.update(flatBuff.buffer.buffer);
      vbs.push(newVB);
      vbDatas.push(new Uint8Array(newVB.size));
      totalVBs.push(newVB);
    }

    const vbIdx = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, vbCount * 4, 4));

    const vbIdxData = new Float32Array(vbCount);
    vbIdxData.fill(0);
    vbIdx.update(vbIdxData);
    totalVBs.push(vbIdx);
    const attributes = subModel.inputAssembler.attributes;
    const attrs = new Array(attributes.length + 1);

    for (let a = 0; a < attributes.length; ++a) {
      attrs[a] = attributes[a];
    }

    attrs[attributes.length] = new _index.Attribute('a_dyn_batch_id', _index.Format.R32F, false, flatBuffers.length);
    const iaInfo = new _index.InputAssemblerInfo(attrs, totalVBs);

    const ia = this._device.createInputAssembler(iaInfo);

    const ubo = this._device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOLocalBatched.SIZE, _define.UBOLocalBatched.SIZE));

    descriptorSet.bindBuffer(_define.UBOLocalBatched.BINDING, ubo);
    descriptorSet.update();
    const uboData = new Float32Array(_define.UBOLocalBatched.COUNT);

    _index2.Mat4.toArray(uboData, model.transform.worldMatrix, _define.UBOLocalBatched.MAT_WORLDS_OFFSET);

    this.batches.push({
      mergeCount: 1,
      vbs,
      vbDatas,
      vbIdx,
      vbIdxData,
      vbCount,
      ia,
      ubo,
      uboData,
      pass,
      hShader,
      descriptorSet
    });
  }

  clear() {
    for (let i = 0; i < this.batches.length; ++i) {
      const batch = this.batches[i];
      batch.vbCount = 0;
      batch.mergeCount = 0;
      batch.ia.vertexCount = 0;
    }
  }

}

exports.BatchedBuffer = BatchedBuffer;
BatchedBuffer._buffers = new Map();