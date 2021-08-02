System.register("q-bundled:///fs/cocos/core/pipeline/batched-buffer.js", ["../gfx/index.js", "../math/index.js", "./define.js", "../renderer/core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, Format, MemoryUsageBit, InputAssemblerInfo, Attribute, BufferInfo, Mat4, UBOLocalBatched, SubModelPool, SubModelView, BatchedBuffer;
  return {
    setters: [function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
    }, function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
    }, function (_defineJs) {
      UBOLocalBatched = _defineJs.UBOLocalBatched;
    }, function (_rendererCoreMemoryPoolsJs) {
      SubModelPool = _rendererCoreMemoryPoolsJs.SubModelPool;
      SubModelView = _rendererCoreMemoryPoolsJs.SubModelView;
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
      _export("BatchedBuffer", BatchedBuffer = /*#__PURE__*/function () {
        BatchedBuffer.get = function get(pass, extraKey) {
          if (extraKey === void 0) {
            extraKey = 0;
          }

          var buffers = BatchedBuffer._buffers;
          if (!buffers.has(pass)) buffers.set(pass, {});
          var record = buffers.get(pass);
          return record[extraKey] || (record[extraKey] = new BatchedBuffer(pass));
        };

        function BatchedBuffer(pass) {
          this.batches = [];
          this.dynamicOffsets = [];
          this._device = void 0;
          this._device = pass.device;
        }

        var _proto = BatchedBuffer.prototype;

        _proto.destroy = function destroy() {
          for (var i = 0; i < this.batches.length; ++i) {
            var batch = this.batches[i];

            for (var j = 0; j < batch.vbs.length; ++j) {
              batch.vbs[j].destroy();
            }

            batch.vbIdx.destroy();
            batch.ia.destroy();
            batch.ubo.destroy();
          }

          this.batches.length = 0;
        };

        _proto.merge = function merge(subModel, passIdx, model) {
          var flatBuffers = subModel.subMesh.flatBuffers;

          if (flatBuffers.length === 0) {
            return;
          }

          var vbSize = 0;
          var vbIdxSize = 0;
          var vbCount = flatBuffers[0].count;
          var pass = subModel.passes[passIdx];
          var hShader = SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + passIdx);
          var descriptorSet = subModel.descriptorSet;
          var isBatchExist = false;

          for (var i = 0; i < this.batches.length; ++i) {
            var batch = this.batches[i];

            if (batch.vbs.length === flatBuffers.length && batch.mergeCount < UBOLocalBatched.BATCHING_COUNT) {
              isBatchExist = true;

              for (var j = 0; j < batch.vbs.length; ++j) {
                var vb = batch.vbs[j];

                if (vb.stride !== flatBuffers[j].stride) {
                  isBatchExist = false;
                  break;
                }
              }

              if (isBatchExist) {
                for (var _j = 0; _j < batch.vbs.length; ++_j) {
                  var flatBuff = flatBuffers[_j];
                  var batchVB = batch.vbs[_j];
                  var vbBuf = batch.vbDatas[_j];
                  vbSize = (vbCount + batch.vbCount) * flatBuff.stride;

                  if (vbSize > batchVB.size) {
                    batchVB.resize(vbSize);
                    batch.vbDatas[_j] = new Uint8Array(vbSize);

                    batch.vbDatas[_j].set(vbBuf);
                  }

                  batch.vbDatas[_j].set(flatBuff.buffer, batch.vbCount * flatBuff.stride);
                }

                var vbIdxBuf = batch.vbIdxData;
                vbIdxSize = (vbCount + batch.vbCount) * 4;

                if (vbIdxSize > batch.vbIdx.size) {
                  batch.vbIdx.resize(vbIdxSize);
                  batch.vbIdxData = new Float32Array(vbIdxSize / Float32Array.BYTES_PER_ELEMENT);
                  batch.vbIdxData.set(vbIdxBuf);
                  vbIdxBuf = batch.vbIdxData;
                }

                var start = batch.vbCount;
                var end = start + vbCount;
                var mergeCount = batch.mergeCount;

                if (vbIdxBuf[start] !== mergeCount || vbIdxBuf[end - 1] !== mergeCount) {
                  for (var _j2 = start; _j2 < end; _j2++) {
                    vbIdxBuf[_j2] = mergeCount + 0.1; // guard against underflow
                  }
                } // update world matrix


                Mat4.toArray(batch.uboData, model.transform.worldMatrix, UBOLocalBatched.MAT_WORLDS_OFFSET + batch.mergeCount * 16);

                if (!batch.mergeCount) {
                  descriptorSet.bindBuffer(UBOLocalBatched.BINDING, batch.ubo);
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


          var vbs = [];
          var vbDatas = [];
          var totalVBs = [];

          for (var _i = 0; _i < flatBuffers.length; ++_i) {
            var _flatBuff = flatBuffers[_i];

            var newVB = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, _flatBuff.count * _flatBuff.stride, _flatBuff.stride));

            newVB.update(_flatBuff.buffer.buffer);
            vbs.push(newVB);
            vbDatas.push(new Uint8Array(newVB.size));
            totalVBs.push(newVB);
          }

          var vbIdx = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, vbCount * 4, 4));

          var vbIdxData = new Float32Array(vbCount);
          vbIdxData.fill(0);
          vbIdx.update(vbIdxData);
          totalVBs.push(vbIdx);
          var attributes = subModel.inputAssembler.attributes;
          var attrs = new Array(attributes.length + 1);

          for (var a = 0; a < attributes.length; ++a) {
            attrs[a] = attributes[a];
          }

          attrs[attributes.length] = new Attribute('a_dyn_batch_id', Format.R32F, false, flatBuffers.length);
          var iaInfo = new InputAssemblerInfo(attrs, totalVBs);

          var ia = this._device.createInputAssembler(iaInfo);

          var ubo = this._device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocalBatched.SIZE, UBOLocalBatched.SIZE));

          descriptorSet.bindBuffer(UBOLocalBatched.BINDING, ubo);
          descriptorSet.update();
          var uboData = new Float32Array(UBOLocalBatched.COUNT);
          Mat4.toArray(uboData, model.transform.worldMatrix, UBOLocalBatched.MAT_WORLDS_OFFSET);
          this.batches.push({
            mergeCount: 1,
            vbs: vbs,
            vbDatas: vbDatas,
            vbIdx: vbIdx,
            vbIdxData: vbIdxData,
            vbCount: vbCount,
            ia: ia,
            ubo: ubo,
            uboData: uboData,
            pass: pass,
            hShader: hShader,
            descriptorSet: descriptorSet
          });
        };

        _proto.clear = function clear() {
          for (var i = 0; i < this.batches.length; ++i) {
            var batch = this.batches[i];
            batch.vbCount = 0;
            batch.mergeCount = 0;
            batch.ia.vertexCount = 0;
          }
        };

        return BatchedBuffer;
      }());

      BatchedBuffer._buffers = new Map();
    }
  };
});