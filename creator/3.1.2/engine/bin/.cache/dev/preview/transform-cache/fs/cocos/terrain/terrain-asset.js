System.register("q-bundled:///fs/cocos/terrain/terrain-asset.js", ["../core/data/decorators/index.js", "../core/assets/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Asset, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec2, _class4, _temp2, _dec3, _class6, _class7, _descriptor7, _temp3, TERRAIN_MAX_LEVELS, TERRAIN_MAX_BLEND_LAYERS, TERRAIN_MAX_LAYER_COUNT, TERRAIN_BLOCK_TILE_COMPLEXITY, TERRAIN_BLOCK_VERTEX_COMPLEXITY, TERRAIN_BLOCK_VERTEX_SIZE, TERRAIN_HEIGHT_BASE, TERRAIN_HEIGHT_FACTORY, TERRAIN_HEIGHT_FMIN, TERRAIN_HEIGHT_FMAX, TERRAIN_NORTH_INDEX, TERRAIN_SOUTH_INDEX, TERRAIN_WEST_INDEX, TERRAIN_EAST_INDEX, TERRAIN_DATA_VERSION, TERRAIN_DATA_VERSION2, TERRAIN_DATA_VERSION3, TERRAIN_DATA_VERSION4, TERRAIN_DATA_VERSION5, TERRAIN_DATA_VERSION_DEFAULT, TerrainBuffer, TerrainLayerInfo, TerrainLayerBinaryInfo, TerrainAsset;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreAssetsIndexJs) {
      Asset = _coreAssetsIndexJs.Asset;
    }],
    execute: function () {
      _export("TERRAIN_MAX_LEVELS", TERRAIN_MAX_LEVELS = 4);

      _export("TERRAIN_MAX_BLEND_LAYERS", TERRAIN_MAX_BLEND_LAYERS = 4);

      _export("TERRAIN_MAX_LAYER_COUNT", TERRAIN_MAX_LAYER_COUNT = 256);

      _export("TERRAIN_BLOCK_TILE_COMPLEXITY", TERRAIN_BLOCK_TILE_COMPLEXITY = 32);

      _export("TERRAIN_BLOCK_VERTEX_COMPLEXITY", TERRAIN_BLOCK_VERTEX_COMPLEXITY = 33);

      _export("TERRAIN_BLOCK_VERTEX_SIZE", TERRAIN_BLOCK_VERTEX_SIZE = 8); // position + normal + uv


      _export("TERRAIN_HEIGHT_BASE", TERRAIN_HEIGHT_BASE = 32768);

      _export("TERRAIN_HEIGHT_FACTORY", TERRAIN_HEIGHT_FACTORY = 1.0 / 512.0);

      _export("TERRAIN_HEIGHT_FMIN", TERRAIN_HEIGHT_FMIN = -TERRAIN_HEIGHT_BASE * TERRAIN_HEIGHT_FACTORY);

      _export("TERRAIN_HEIGHT_FMAX", TERRAIN_HEIGHT_FMAX = (65535 - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY);

      _export("TERRAIN_NORTH_INDEX", TERRAIN_NORTH_INDEX = 0);

      _export("TERRAIN_SOUTH_INDEX", TERRAIN_SOUTH_INDEX = 1);

      _export("TERRAIN_WEST_INDEX", TERRAIN_WEST_INDEX = 2);

      _export("TERRAIN_EAST_INDEX", TERRAIN_EAST_INDEX = 3);

      _export("TERRAIN_DATA_VERSION", TERRAIN_DATA_VERSION = 0x01010001);

      _export("TERRAIN_DATA_VERSION2", TERRAIN_DATA_VERSION2 = 0x01010002);

      _export("TERRAIN_DATA_VERSION3", TERRAIN_DATA_VERSION3 = 0x01010003);

      _export("TERRAIN_DATA_VERSION4", TERRAIN_DATA_VERSION4 = 0x01010004);

      _export("TERRAIN_DATA_VERSION5", TERRAIN_DATA_VERSION5 = 0x01010005);

      _export("TERRAIN_DATA_VERSION_DEFAULT", TERRAIN_DATA_VERSION_DEFAULT = 0x01010111);

      TerrainBuffer = /*#__PURE__*/function () {
        function TerrainBuffer() {
          this.length = 0;
          this.buffer = new Uint8Array(2048);
          this._buffView = new DataView(this.buffer.buffer);
          this._seekPos = 0;
        }

        var _proto = TerrainBuffer.prototype;

        _proto.reserve = function reserve(size) {
          if (this.buffer.byteLength > size) {
            return;
          }

          var capacity = this.buffer.byteLength;

          while (capacity < size) {
            capacity += capacity;
          }

          var temp = new Uint8Array(capacity);

          for (var i = 0; i < this.length; ++i) {
            temp[i] = this.buffer[i];
          }

          this.buffer = temp;
          this._buffView = new DataView(this.buffer.buffer);
        };

        _proto.assign = function assign(buff) {
          this.buffer = buff;
          this.length = buff.length;
          this._seekPos = buff.byteOffset;
          this._buffView = new DataView(buff.buffer);
        };

        _proto.writeInt8 = function writeInt8(value) {
          this.reserve(this.length + 1);

          this._buffView.setInt8(this.length, value);

          this.length += 1;
        };

        _proto.writeInt16 = function writeInt16(value) {
          this.reserve(this.length + 2);

          this._buffView.setInt16(this.length, value, true);

          this.length += 2;
        };

        _proto.writeInt32 = function writeInt32(value) {
          this.reserve(this.length + 4);

          this._buffView.setInt32(this.length, value, true);

          this.length += 4;
        };

        _proto.writeIntArray = function writeIntArray(value) {
          this.reserve(this.length + 4 * value.length);

          for (var i = 0; i < value.length; ++i) {
            this._buffView.setInt32(this.length + i * 4, value[i], true);
          }

          this.length += 4 * value.length;
        };

        _proto.writeFloat = function writeFloat(value) {
          this.reserve(this.length + 4);

          this._buffView.setFloat32(this.length, value, true);

          this.length += 4;
        };

        _proto.writeFloatArray = function writeFloatArray(value) {
          this.reserve(this.length + 4 * value.length);

          for (var i = 0; i < value.length; ++i) {
            this._buffView.setFloat32(this.length + i * 4, value[i], true);
          }

          this.length += 4 * value.length;
        };

        _proto.writeString = function writeString(value) {
          this.reserve(this.length + value.length + 4);

          this._buffView.setInt32(this.length, value.length, true);

          for (var i = 0; i < value.length; ++i) {
            this._buffView.setInt8(this.length + 4 + i, value.charCodeAt(i));
          }

          this.length += value.length + 4;
        };

        _proto.readInt8 = function readInt8() {
          var value = this._buffView.getInt8(this._seekPos);

          this._seekPos += 1;
          return value;
        };

        _proto.readInt16 = function readInt16() {
          var value = this._buffView.getInt16(this._seekPos, true);

          this._seekPos += 2;
          return value;
        };

        _proto.readInt = function readInt() {
          var value = this._buffView.getInt32(this._seekPos, true);

          this._seekPos += 4;
          return value;
        };

        _proto.readIntArray = function readIntArray(value) {
          for (var i = 0; i < value.length; ++i) {
            value[i] = this._buffView.getInt32(this._seekPos + i * 4, true);
          }

          this._seekPos += 4 * value.length;
          return value;
        };

        _proto.readFloat = function readFloat() {
          var value = this._buffView.getFloat32(this._seekPos, true);

          this._seekPos += 4;
          return value;
        };

        _proto.readFloatArray = function readFloatArray(value) {
          for (var i = 0; i < value.length; ++i) {
            value[i] = this._buffView.getFloat32(this._seekPos + i * 4, true);
          }

          this._seekPos += 4 * value.length;
          return value;
        };

        _proto.readString = function readString() {
          var length = this.readInt();
          var value = '';

          for (var i = 0; i < length; ++i) {
            value += String.fromCharCode(this.readInt8());
          }

          return value;
        };

        return TerrainBuffer;
      }();
      /**
       * @en terrain layer info
       * @zh 地形纹理信息
       */


      _export("TerrainLayerInfo", TerrainLayerInfo = (_dec = ccclass('cc.TerrainLayerInfo'), _dec(_class = (_class2 = (_temp = function TerrainLayerInfo() {
        _initializerDefineProperty(this, "slot", _descriptor, this);

        _initializerDefineProperty(this, "tileSize", _descriptor2, this);

        _initializerDefineProperty(this, "detailMap", _descriptor3, this);

        _initializerDefineProperty(this, "normalMap", _descriptor4, this);

        _initializerDefineProperty(this, "roughness", _descriptor5, this);

        _initializerDefineProperty(this, "metallic", _descriptor6, this);
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slot", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tileSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "detailMap", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "normalMap", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "roughness", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "metallic", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      /**
       * @en terrain layer binary info
       * @zh 地形纹理二进制信息
       */


      _export("TerrainLayerBinaryInfo", TerrainLayerBinaryInfo = (_dec2 = ccclass('cc.TerrainLayerBinaryInfo'), _dec2(_class4 = (_temp2 = function TerrainLayerBinaryInfo() {
        this.slot = 0;
        this.tileSize = 1;
        this.roughness = 1;
        this.metallic = 0;
        this.detailMapId = '';
        this.normalMapId = '';
      }, _temp2)) || _class4));
      /**
       * @en terrain asset
       * @zh 地形资源
       */


      _export("TerrainAsset", TerrainAsset = (_dec3 = ccclass('cc.TerrainAsset'), _dec3(_class6 = (_class7 = (_temp3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(TerrainAsset, _Asset);

        function TerrainAsset() {
          var _this;

          _this = _Asset.call(this) || this;
          _this._version = 0;
          _this._data = null;
          _this._tileSize = 1;
          _this._blockCount = [1, 1];
          _this._weightMapSize = 128;
          _this._lightMapSize = 128;
          _this._heights = new Uint16Array();
          _this._weights = new Uint8Array();
          _this._layerBuffer = [-1, -1, -1, -1];
          _this._layerBinaryInfos = [];

          _initializerDefineProperty(_this, "_layerInfos", _descriptor7, _assertThisInitialized(_this));

          _this.loaded = false;
          return _this;
        }

        var _proto2 = TerrainAsset.prototype;

        /**
         * @en get layer
         * @zh 获得纹理索引
         * @param xBlock block index x
         * @param yBlock block index y
         * @param layerId layer id
         */
        _proto2.getLayer = function getLayer(xBlock, yBlock, layerId) {
          var blockId = yBlock * this.blockCount[0] + xBlock;
          var index = blockId * 4 + layerId;

          if (xBlock < this.blockCount[0] && yBlock < this.blockCount[1] && index < this._layerBuffer.length) {
            return this._layerBuffer[index];
          }

          return -1;
        };

        _proto2.getHeight = function getHeight(i, j) {
          var vertexCountX = this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
          return (this._heights[j * vertexCountX + i] - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
        };

        _proto2.getVertexCountI = function getVertexCountI() {
          if (this._blockCount.length < 1) return 0;
          return this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
        };

        _proto2.getVertexCountJ = function getVertexCountJ() {
          if (this._blockCount.length < 2) return 0;
          return this._blockCount[1] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
        };

        _proto2._setNativeData = function _setNativeData(_nativeData) {
          this._data = _nativeData;
        };

        _proto2._loadNativeData = function _loadNativeData(_nativeData) {
          if (!_nativeData || _nativeData.length === 0) {
            return false;
          }

          var stream = new TerrainBuffer();
          stream.assign(_nativeData); // version

          this._version = stream.readInt();

          if (this._version === TERRAIN_DATA_VERSION_DEFAULT) {
            return true;
          }

          if (this._version !== TERRAIN_DATA_VERSION && this._version !== TERRAIN_DATA_VERSION2 && this._version !== TERRAIN_DATA_VERSION3 && this._version !== TERRAIN_DATA_VERSION4 && this._version !== TERRAIN_DATA_VERSION5) {
            return false;
          } // geometry info


          this.tileSize = stream.readFloat();
          stream.readIntArray(this._blockCount);
          this.weightMapSize = stream.readInt16();
          this.lightMapSize = stream.readInt16(); // heights

          var heightBufferSize = stream.readInt();
          this.heights = new Uint16Array(heightBufferSize);

          for (var i = 0; i < this.heights.length; ++i) {
            this.heights[i] = stream.readInt16();
          } // weights


          var WeightBufferSize = stream.readInt();
          this.weights = new Uint8Array(WeightBufferSize);

          for (var _i = 0; _i < this.weights.length; ++_i) {
            this.weights[_i] = stream.readInt8();
          } // layer buffer


          if (this._version >= TERRAIN_DATA_VERSION2) {
            var layerBufferSize = stream.readInt();
            this.layerBuffer = new Array(layerBufferSize);

            for (var _i2 = 0; _i2 < this.layerBuffer.length; ++_i2) {
              this.layerBuffer[_i2] = stream.readInt16();
            }
          } // layer infos


          if (this._version >= TERRAIN_DATA_VERSION3) {
            var layerInfoSize = stream.readInt();
            this._layerBinaryInfos = new Array(layerInfoSize);

            for (var _i3 = 0; _i3 < this._layerBinaryInfos.length; ++_i3) {
              this._layerBinaryInfos[_i3] = new TerrainLayerBinaryInfo();
              this._layerBinaryInfos[_i3].slot = stream.readInt();
              this._layerBinaryInfos[_i3].tileSize = stream.readFloat();
              this._layerBinaryInfos[_i3].detailMapId = stream.readString();

              if (this._version >= TERRAIN_DATA_VERSION4) {
                this._layerBinaryInfos[_i3].normalMapId = stream.readString();
                this._layerBinaryInfos[_i3].roughness = stream.readFloat();
                this._layerBinaryInfos[_i3].metallic = stream.readFloat();
              }
            }
          }

          return true;
        };

        _proto2._exportNativeData = function _exportNativeData() {
          var stream = new TerrainBuffer(); // version

          stream.writeInt32(TERRAIN_DATA_VERSION5); // geometry info

          stream.writeFloat(this.tileSize);
          stream.writeIntArray(this._blockCount);
          stream.writeInt16(this.weightMapSize);
          stream.writeInt16(this.lightMapSize); // heights

          stream.writeInt32(this.heights.length);

          for (var i = 0; i < this.heights.length; ++i) {
            stream.writeInt16(this.heights[i]);
          } // weights


          stream.writeInt32(this.weights.length);

          for (var _i4 = 0; _i4 < this.weights.length; ++_i4) {
            stream.writeInt8(this.weights[_i4]);
          } // layer buffer


          stream.writeInt32(this.layerBuffer.length);

          for (var _i5 = 0; _i5 < this.layerBuffer.length; ++_i5) {
            stream.writeInt16(this.layerBuffer[_i5]);
          } // layer infos


          var layerBinaryInfos = [];
          layerBinaryInfos.length = this.layerInfos.length;

          for (var _i6 = 0; _i6 < layerBinaryInfos.length; ++_i6) {
            var layer = this.layerInfos[_i6];
            var binaryLayer = new TerrainLayerBinaryInfo();
            binaryLayer.slot = _i6;
            binaryLayer.tileSize = layer.tileSize;
            binaryLayer.detailMapId = layer.detailMap ? layer.detailMap._uuid : '';
            binaryLayer.normalMapId = layer.normalMap ? layer.normalMap._uuid : '';
            binaryLayer.metallic = layer.metallic;
            binaryLayer.roughness = layer.roughness;
            layerBinaryInfos[_i6] = binaryLayer;
          }

          stream.writeInt32(layerBinaryInfos.length);

          for (var _i7 = 0; _i7 < layerBinaryInfos.length; ++_i7) {
            stream.writeInt32(layerBinaryInfos[_i7].slot);
            stream.writeFloat(layerBinaryInfos[_i7].tileSize);
            stream.writeString(layerBinaryInfos[_i7].detailMapId);
            stream.writeString(layerBinaryInfos[_i7].normalMapId);
            stream.writeFloat(layerBinaryInfos[_i7].roughness);
            stream.writeFloat(layerBinaryInfos[_i7].metallic);
          }

          return stream.buffer;
        };

        _proto2._exportDefaultNativeData = function _exportDefaultNativeData() {
          var stream = new TerrainBuffer();
          stream.writeInt32(TERRAIN_DATA_VERSION_DEFAULT);
          return stream.buffer;
        };

        _createClass(TerrainAsset, [{
          key: "_nativeAsset",
          get: function get() {
            return this._data.buffer;
          },
          set: function set(value) {
            if (this._data && this._data.byteLength === value.byteLength) {
              this._data.set(new Uint8Array(value));
            } else {
              this._data = new Uint8Array(value);
            }

            this._loadNativeData(this._data);

            this.loaded = true;
            this.emit('load');
          }
          /**
           * @en version
           * @zh 版本
           */

        }, {
          key: "version",
          get: function get() {
            return this._version;
          }
          /**
           * @en tile size
           * @zh 栅格大小
           */

        }, {
          key: "tileSize",
          get: function get() {
            return this._tileSize;
          }
          /**
           * @en block count
           * @zh 块数量
           */
          ,
          set: function set(value) {
            this._tileSize = value;
          }
        }, {
          key: "blockCount",
          get: function get() {
            return this._blockCount;
          }
          /**
           * @en light map size
           * @zh 光照图大小
           */
          ,
          set: function set(value) {
            this._blockCount = value;
          }
        }, {
          key: "lightMapSize",
          get: function get() {
            return this._lightMapSize;
          }
          /**
           * @en weight map size
           * @zh 权重图大小
           */
          ,
          set: function set(value) {
            this._lightMapSize = value;
          }
        }, {
          key: "weightMapSize",
          get: function get() {
            return this._weightMapSize;
          }
          /**
           * @en height buffer
           * @zh 高度缓存
           */
          ,
          set: function set(value) {
            this._weightMapSize = value;
          }
        }, {
          key: "heights",
          get: function get() {
            return this._heights;
          }
          /**
           * @en weight buffer
           * @zh 权重缓存
           */
          ,
          set: function set(value) {
            this._heights = value;
          }
        }, {
          key: "weights",
          get: function get() {
            return this._weights;
          }
          /**
           * @en layer buffer
           * @zh 纹理索引缓存
           */
          ,
          set: function set(value) {
            this._weights = value;
          }
        }, {
          key: "layerBuffer",
          get: function get() {
            return this._layerBuffer;
          }
          /**
           * @en layer info
           * @zh 纹理信息
           */
          ,
          set: function set(value) {
            this._layerBuffer = value;
          }
        }, {
          key: "layerInfos",
          get: function get() {
            return this._layerInfos;
          },
          set: function set(value) {
            this._layerInfos = value;
          }
        }, {
          key: "layerBinaryInfos",
          get: function get() {
            return this._layerBinaryInfos;
          }
        }]);

        return TerrainAsset;
      }(Asset), _temp3), (_descriptor7 = _applyDecoratedDescriptor(_class7.prototype, "_layerInfos", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class7)) || _class6));
    }
  };
});