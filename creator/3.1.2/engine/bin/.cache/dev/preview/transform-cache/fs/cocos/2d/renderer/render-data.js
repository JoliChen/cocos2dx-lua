System.register("q-bundled:///fs/cocos/2d/renderer/render-data.js", ["../../core/math/index.js", "../../core/memop/index.js"], function (_export, _context) {
  "use strict";

  var Color, Pool, RecyclePool, BaseRenderData, RenderData, MeshRenderData, QuadRenderData, _dataPool, _pool, _meshDataPool;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_coreMemopIndexJs) {
      Pool = _coreMemopIndexJs.Pool;
      RecyclePool = _coreMemopIndexJs.RecyclePool;
    }],
    execute: function () {
      _export("BaseRenderData", BaseRenderData = function BaseRenderData() {
        this.material = null;
        this.vertexCount = 0;
        this.indicesCount = 0;
      });

      _export("RenderData", RenderData = /*#__PURE__*/function (_BaseRenderData) {
        _inheritsLoose(RenderData, _BaseRenderData);

        function RenderData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BaseRenderData.call.apply(_BaseRenderData, [this].concat(args)) || this;
          _this.vData = null;
          _this.uvDirty = true;
          _this.vertDirty = true;
          _this._data = [];
          _this._indices = [];
          _this._pivotX = 0;
          _this._pivotY = 0;
          _this._width = 0;
          _this._height = 0;
          return _this;
        }

        RenderData.add = function add() {
          return _pool.add();
        };

        RenderData.remove = function remove(data) {
          var idx = _pool.data.indexOf(data);

          if (idx === -1) {
            return;
          }

          _pool.data[idx].clear();

          _pool.removeAt(idx);
        };

        var _proto = RenderData.prototype;

        _proto.updateSizeNPivot = function updateSizeNPivot(width, height, pivotX, pivotY) {
          if (width !== this._width || height !== this._height || pivotX !== this._pivotX || pivotY !== this._pivotY) {
            this._width = width;
            this._height = height;
            this._pivotX = pivotX;
            this._pivotY = pivotY;
            this.vertDirty = true;
          }
        };

        _proto.clear = function clear() {
          this._data.length = 0;
          this._indices.length = 0;
          this._pivotX = 0;
          this._pivotY = 0;
          this._width = 0;
          this._height = 0;
          this.uvDirty = true;
          this.vertDirty = true;
          this.material = null;
          this.vertexCount = 0;
          this.indicesCount = 0;
        };

        _createClass(RenderData, [{
          key: "dataLength",
          get: function get() {
            return this._data.length;
          },
          set: function set(length) {
            var data = this._data;

            if (data.length !== length) {
              // // Free extra data
              var value = data.length;
              var i = 0;

              for (i = length; i < value; i++) {
                _dataPool.free(data[i]);
              }

              for (i = value; i < length; i++) {
                data[i] = _dataPool.alloc();
              }

              data.length = length;
            }
          }
        }, {
          key: "data",
          get: function get() {
            return this._data;
          }
        }]);

        return RenderData;
      }(BaseRenderData));

      _export("MeshRenderData", MeshRenderData = /*#__PURE__*/function (_BaseRenderData2) {
        _inheritsLoose(MeshRenderData, _BaseRenderData2);

        /**
         * Each vertex contains multiple float numbers
         */

        /**
         * Number of indices
         */
        // only for graphics
        function MeshRenderData(vertexFloatCnt) {
          var _this2;

          if (vertexFloatCnt === void 0) {
            vertexFloatCnt = 9;
          }

          _this2 = _BaseRenderData2.call(this) || this;
          _this2.vData = void 0;
          _this2.iData = void 0;
          _this2.vertexStart = 0;
          _this2.indicesStart = 0;
          _this2.byteStart = 0;
          _this2.byteCount = 0;
          _this2.lastFilledIndices = 0;
          _this2.lastFilledVertex = 0;
          _this2._formatByte = void 0;
          _this2._formatByte = vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT;
          _this2.vData = new Float32Array(256 * vertexFloatCnt * Float32Array.BYTES_PER_ELEMENT);
          _this2.iData = new Uint16Array(256 * 6);
          return _this2;
        }

        MeshRenderData.add = function add() {
          return _meshDataPool.add();
        };

        MeshRenderData.remove = function remove(data) {
          var idx = _meshDataPool.data.indexOf(data);

          if (idx === -1) {
            return;
          }

          _meshDataPool.data[idx].reset();

          _meshDataPool.removeAt(idx);
        };

        var _proto2 = MeshRenderData.prototype;

        _proto2.request = function request(vertexCount, indicesCount) {
          var byteOffset = this.byteCount + vertexCount * this._formatByte;
          this.reserve(vertexCount, indicesCount);
          this.vertexCount += vertexCount; // vertexOffset

          this.indicesCount += indicesCount; // indicesOffset

          this.byteCount = byteOffset; // byteOffset

          return true;
        };

        _proto2.reserve = function reserve(vertexCount, indicesCount) {
          var newVBytes = this.byteCount + vertexCount * this._formatByte;
          var newICount = this.indicesCount + indicesCount;

          if (vertexCount + this.vertexCount > 65535) {
            return false;
          }

          var byteLength = this.vData.byteLength;
          var indicesLength = this.iData.length;
          var vCount = this.vData.length;
          var iCount = this.iData.length;

          if (newVBytes > byteLength || newICount > indicesLength) {
            while (byteLength < newVBytes || indicesLength < newICount) {
              vCount *= 2;
              iCount *= 2;
              byteLength = vCount * 4;
              indicesLength = iCount;
            }

            this._reallocBuffer(vCount, iCount);
          }

          return true;
        };

        _proto2.advance = function advance(vertexCount, indicesCount) {
          this.vertexCount += vertexCount; // vertexOffset

          this.indicesCount += indicesCount; // indicesOffset

          this.byteCount += vertexCount * this._formatByte;
        };

        _proto2.reset = function reset() {
          this.vertexCount = 0;
          this.indicesCount = 0;
          this.byteCount = 0;
          this.vertexStart = 0;
          this.indicesStart = 0;
          this.byteStart = 0;
          this.lastFilledIndices = 0;
          this.lastFilledVertex = 0;
        };

        _proto2._reallocBuffer = function _reallocBuffer(vCount, iCount) {
          // copy old data
          var oldVData = this.vData;
          this.vData = new Float32Array(vCount);
          this.vData.set(oldVData, 0);
          var oldIData = this.iData;
          this.iData = new Uint16Array(iCount);
          this.iData.set(oldIData, 0);
        };

        _createClass(MeshRenderData, [{
          key: "formatByte",
          get: function get() {
            return this._formatByte;
          },
          set: function set(value) {
            this._formatByte = value;
          }
        }, {
          key: "floatStride",
          get: function get() {
            return this._formatByte >> 2;
          }
          /**
           * Index of Float32Array: vData
           */

        }, {
          key: "vDataOffset",
          get: function get() {
            return this.byteCount >>> 2;
          }
        }]);

        return MeshRenderData;
      }(BaseRenderData));

      _export("QuadRenderData", QuadRenderData = /*#__PURE__*/function (_MeshRenderData) {
        _inheritsLoose(QuadRenderData, _MeshRenderData);

        function QuadRenderData() {
          return _MeshRenderData.apply(this, arguments) || this;
        }

        var _proto3 = QuadRenderData.prototype;

        _proto3._fillQuadBuffer = function _fillQuadBuffer() {
          var count = this.iData.length / 6;
          var buffer = this.iData;

          for (var i = 0, idx = 0; i < count; i++) {
            var vId = i * 4;
            buffer[idx++] = vId;
            buffer[idx++] = vId + 1;
            buffer[idx++] = vId + 2;
            buffer[idx++] = vId + 1;
            buffer[idx++] = vId + 3;
            buffer[idx++] = vId + 2;
          }
        };

        _proto3._reallocBuffer = function _reallocBuffer(vCount, iCount) {
          // copy old data
          _MeshRenderData.prototype._reallocBuffer.call(this, vCount, iCount);

          this._fillQuadBuffer();
        };

        return QuadRenderData;
      }(MeshRenderData));

      _dataPool = new Pool(function () {
        return {
          x: 0,
          y: 0,
          z: 0,
          u: 0,
          v: 0,
          color: Color.WHITE.clone()
        };
      }, 128);
      _pool = new RecyclePool(function () {
        return new RenderData();
      }, 32);
      _meshDataPool = new RecyclePool(function () {
        return new MeshRenderData();
      }, 32);
    }
  };
});