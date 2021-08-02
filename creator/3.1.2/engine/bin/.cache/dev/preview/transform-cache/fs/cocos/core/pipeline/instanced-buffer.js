System.register("q-bundled:///fs/cocos/core/pipeline/instanced-buffer.js", ["../renderer/core/memory-pools.js", "./define.js", "../gfx/index.js"], function (_export, _context) {
  "use strict";

  var SubModelView, SubModelPool, UNIFORM_LIGHTMAP_TEXTURE_BINDING, BufferUsageBit, MemoryUsageBit, InputAssemblerInfo, Attribute, BufferInfo, INITIAL_CAPACITY, MAX_CAPACITY, InstancedBuffer;
  return {
    setters: [function (_rendererCoreMemoryPoolsJs) {
      SubModelView = _rendererCoreMemoryPoolsJs.SubModelView;
      SubModelPool = _rendererCoreMemoryPoolsJs.SubModelPool;
    }, function (_defineJs) {
      UNIFORM_LIGHTMAP_TEXTURE_BINDING = _defineJs.UNIFORM_LIGHTMAP_TEXTURE_BINDING;
    }, function (_gfxIndexJs) {
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
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
      INITIAL_CAPACITY = 32;
      MAX_CAPACITY = 1024;

      _export("InstancedBuffer", InstancedBuffer = /*#__PURE__*/function () {
        InstancedBuffer.get = function get(pass, extraKey) {
          if (extraKey === void 0) {
            extraKey = 0;
          }

          var buffers = InstancedBuffer._buffers;
          if (!buffers.has(pass)) buffers.set(pass, {});
          var record = buffers.get(pass);
          return record[extraKey] || (record[extraKey] = new InstancedBuffer(pass));
        };

        function InstancedBuffer(pass) {
          this.instances = [];
          this.pass = void 0;
          this.hasPendingModels = false;
          this.dynamicOffsets = [];
          this._device = void 0;
          this._device = pass.device;
          this.pass = pass;
        }

        var _proto = InstancedBuffer.prototype;

        _proto.destroy = function destroy() {
          for (var i = 0; i < this.instances.length; ++i) {
            var instance = this.instances[i];
            instance.vb.destroy();
            instance.ia.destroy();
          }

          this.instances.length = 0;
        };

        _proto.merge = function merge(subModel, attrs, passIdx, hShaderImplant) {
          if (hShaderImplant === void 0) {
            hShaderImplant = null;
          }

          var stride = attrs.buffer.length;

          if (!stride) {
            return;
          } // we assume per-instance attributes are always present


          var sourceIA = subModel.inputAssembler;
          var lightingMap = subModel.descriptorSet.getTexture(UNIFORM_LIGHTMAP_TEXTURE_BINDING);
          var hShader = hShaderImplant;

          if (!hShader) {
            hShader = SubModelPool.get(subModel.handle, SubModelView.SHADER_0 + passIdx);
          }

          var hDescriptorSet = SubModelPool.get(subModel.handle, SubModelView.DESCRIPTOR_SET);

          for (var i = 0; i < this.instances.length; ++i) {
            var instance = this.instances[i];

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
              var newSize = instance.stride * instance.capacity;
              var oldData = instance.data;
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


          var vb = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, stride * INITIAL_CAPACITY, stride));

          var data = new Uint8Array(stride * INITIAL_CAPACITY);
          var vertexBuffers = sourceIA.vertexBuffers.slice();
          var attributes = sourceIA.attributes.slice();
          var indexBuffer = sourceIA.indexBuffer;

          for (var _i = 0; _i < attrs.attributes.length; _i++) {
            var attr = attrs.attributes[_i];
            var newAttr = new Attribute(attr.name, attr.format, attr.isNormalized, vertexBuffers.length, true);
            attributes.push(newAttr);
          }

          data.set(attrs.buffer);
          vertexBuffers.push(vb);
          var iaInfo = new InputAssemblerInfo(attributes, vertexBuffers, indexBuffer);

          var ia = this._device.createInputAssembler(iaInfo);

          this.instances.push({
            count: 1,
            capacity: INITIAL_CAPACITY,
            vb: vb,
            data: data,
            ia: ia,
            stride: stride,
            hShader: hShader,
            hDescriptorSet: hDescriptorSet,
            lightingMap: lightingMap
          });
          this.hasPendingModels = true;
        };

        _proto.uploadBuffers = function uploadBuffers(cmdBuff) {
          for (var i = 0; i < this.instances.length; ++i) {
            var instance = this.instances[i];

            if (!instance.count) {
              continue;
            }

            instance.ia.instanceCount = instance.count;
            cmdBuff.updateBuffer(instance.vb, instance.data);
          }
        };

        _proto.clear = function clear() {
          for (var i = 0; i < this.instances.length; ++i) {
            var instance = this.instances[i];
            instance.count = 0;
          }

          this.hasPendingModels = false;
        };

        return InstancedBuffer;
      }());

      InstancedBuffer._buffers = new Map();
    }
  };
});