System.register("q-bundled:///fs/cocos/2d/renderer/mesh-buffer.js", ["../../core/gfx/index.js", "../../core/renderer/core/memory-pools.js", "./vertex-format.js"], function (_export, _context) {
  "use strict";

  var BufferUsageBit, MemoryUsageBit, InputAssemblerInfo, BufferInfo, NULL_HANDLE, IAPool, getComponentPerVertex, MeshBuffer;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreGfxIndexJs) {
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      InputAssemblerInfo = _coreGfxIndexJs.InputAssemblerInfo;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_coreRendererCoreMemoryPoolsJs) {
      NULL_HANDLE = _coreRendererCoreMemoryPoolsJs.NULL_HANDLE;
      IAPool = _coreRendererCoreMemoryPoolsJs.IAPool;
    }, function (_vertexFormatJs) {
      getComponentPerVertex = _vertexFormatJs.getComponentPerVertex;
    }],
    execute: function () {
      _export("MeshBuffer", MeshBuffer = /*#__PURE__*/function () {
        function MeshBuffer(batcher) {
          this.vData = null;
          this.iData = null;
          this.byteStart = 0;
          this.byteOffset = 0;
          this.indicesStart = 0;
          this.indicesOffset = 0;
          this.vertexStart = 0;
          this.vertexOffset = 0;
          this.lastByteOffset = 1;
          this._attributes = null;
          this._vertexBuffers = [];
          this._indexBuffer = null;
          this._iaInfo = null;
          this._batcher = void 0;
          this._dirty = false;
          this._vertexFormatBytes = 0;
          this._initVDataCount = 0;
          this._initIDataCount = 256 * 6;
          this._outOfCallback = null;
          this._hInputAssemblers = [];
          this._nextFreeIAHandle = 0;
          this._batcher = batcher;
        }

        var _proto = MeshBuffer.prototype;

        _proto.initialize = function initialize(attrs, outOfCallback) {
          this._outOfCallback = outOfCallback;
          var formatBytes = getComponentPerVertex(attrs);
          this._vertexFormatBytes = formatBytes * Float32Array.BYTES_PER_ELEMENT;
          this._initVDataCount = 256 * this._vertexFormatBytes;
          var vbStride = Float32Array.BYTES_PER_ELEMENT * formatBytes;

          if (!this.vertexBuffers.length) {
            this.vertexBuffers.push(this._batcher.device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, vbStride, vbStride)));
          }

          var ibStride = Uint16Array.BYTES_PER_ELEMENT;

          if (!this.indexBuffer) {
            this._indexBuffer = this._batcher.device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, ibStride, ibStride));
          }

          this._attributes = attrs;
          this._iaInfo = new InputAssemblerInfo(this.attributes, this.vertexBuffers, this.indexBuffer);

          this._reallocBuffer();
        };

        _proto.request = function request(vertexCount, indicesCount) {
          if (vertexCount === void 0) {
            vertexCount = 4;
          }

          if (indicesCount === void 0) {
            indicesCount = 6;
          }

          this.lastByteOffset = this.byteOffset;
          var byteOffset = this.byteOffset + vertexCount * this._vertexFormatBytes;
          var indicesOffset = this.indicesOffset + indicesCount;

          if (vertexCount + this.vertexOffset > 65535) {
            if (this._outOfCallback) {
              this._outOfCallback.call(this._batcher, vertexCount, indicesCount);
            }

            return false;
          }

          var byteLength = this.vData.byteLength;
          var indicesLength = this.iData.length;

          if (byteOffset > byteLength || indicesOffset > indicesLength) {
            while (byteLength < byteOffset || indicesLength < indicesOffset) {
              this._initVDataCount *= 2;
              this._initIDataCount *= 2;
              byteLength = this._initVDataCount * 4;
              indicesLength = this._initIDataCount;
            }

            this._reallocBuffer();
          }

          this.vertexOffset += vertexCount;
          this.indicesOffset += indicesCount;
          this.byteOffset = byteOffset;
          this._dirty = true;
          return true;
        };

        _proto.reset = function reset() {
          this.byteStart = 0;
          this.byteOffset = 0;
          this.indicesStart = 0;
          this.indicesOffset = 0;
          this.vertexStart = 0;
          this.vertexOffset = 0;
          this.lastByteOffset = 0;
          this._nextFreeIAHandle = 0;
          this._dirty = false;
        };

        _proto.destroy = function destroy() {
          this._attributes = null;
          this.vertexBuffers[0].destroy();
          this.vertexBuffers.length = 0;
          this.indexBuffer.destroy();
          this._indexBuffer = null;

          for (var i = 0; i < this._hInputAssemblers.length; i++) {
            IAPool.free(this._hInputAssemblers[i]);
          }

          this._hInputAssemblers.length = 0;
        };

        _proto.recordBatch = function recordBatch() {
          var vCount = this.indicesOffset - this.indicesStart;

          if (!vCount) {
            return NULL_HANDLE;
          }

          if (this._hInputAssemblers.length <= this._nextFreeIAHandle) {
            this._hInputAssemblers.push(IAPool.alloc(this._batcher.device, this._iaInfo));
          }

          var hIA = this._hInputAssemblers[this._nextFreeIAHandle++];
          var ia = IAPool.get(hIA);
          ia.firstIndex = this.indicesStart;
          ia.indexCount = vCount;
          return hIA;
        };

        _proto.uploadBuffers = function uploadBuffers() {
          if (this.byteOffset === 0 || !this._dirty) {
            return;
          }

          var verticesData = new Float32Array(this.vData.buffer, 0, this.byteOffset >> 2);
          var indicesData = new Uint16Array(this.iData.buffer, 0, this.indicesOffset);

          if (this.byteOffset > this.vertexBuffers[0].size) {
            this.vertexBuffers[0].resize(this.byteOffset);
          }

          this.vertexBuffers[0].update(verticesData);

          if (this.indicesOffset * 2 > this.indexBuffer.size) {
            this.indexBuffer.resize(this.indicesOffset * 2);
          }

          this.indexBuffer.update(indicesData);
          this._dirty = false;
        };

        _proto._reallocBuffer = function _reallocBuffer() {
          this._reallocVData(true);

          this._reallocIData(true);
        };

        _proto._reallocVData = function _reallocVData(copyOldData) {
          var oldVData;

          if (this.vData) {
            oldVData = new Uint8Array(this.vData.buffer);
          }

          this.vData = new Float32Array(this._initVDataCount);

          if (oldVData && copyOldData) {
            var newData = new Uint8Array(this.vData.buffer);

            for (var i = 0, l = oldVData.length; i < l; i++) {
              newData[i] = oldVData[i];
            }
          }
        };

        _proto._reallocIData = function _reallocIData(copyOldData) {
          var oldIData = this.iData;
          this.iData = new Uint16Array(this._initIDataCount);

          if (oldIData && copyOldData) {
            var iData = this.iData;

            for (var i = 0, l = oldIData.length; i < l; i++) {
              iData[i] = oldIData[i];
            }
          }
        };

        _createClass(MeshBuffer, [{
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
        }, {
          key: "vertexBuffers",
          get: function get() {
            return this._vertexBuffers;
          }
        }, {
          key: "indexBuffer",
          get: function get() {
            return this._indexBuffer;
          }
        }, {
          key: "vertexFormatBytes",
          get: function get() {
            return this._vertexFormatBytes;
          }
        }]);

        return MeshBuffer;
      }());

      MeshBuffer.OPACITY_OFFSET = 8;
    }
  };
});