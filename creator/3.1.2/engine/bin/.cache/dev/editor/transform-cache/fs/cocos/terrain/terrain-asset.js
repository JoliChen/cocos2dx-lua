"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TerrainAsset = exports.TerrainLayerBinaryInfo = exports.TerrainLayerInfo = exports.TERRAIN_DATA_VERSION_DEFAULT = exports.TERRAIN_DATA_VERSION5 = exports.TERRAIN_DATA_VERSION4 = exports.TERRAIN_DATA_VERSION3 = exports.TERRAIN_DATA_VERSION2 = exports.TERRAIN_DATA_VERSION = exports.TERRAIN_EAST_INDEX = exports.TERRAIN_WEST_INDEX = exports.TERRAIN_SOUTH_INDEX = exports.TERRAIN_NORTH_INDEX = exports.TERRAIN_HEIGHT_FMAX = exports.TERRAIN_HEIGHT_FMIN = exports.TERRAIN_HEIGHT_FACTORY = exports.TERRAIN_HEIGHT_BASE = exports.TERRAIN_BLOCK_VERTEX_SIZE = exports.TERRAIN_BLOCK_VERTEX_COMPLEXITY = exports.TERRAIN_BLOCK_TILE_COMPLEXITY = exports.TERRAIN_MAX_LAYER_COUNT = exports.TERRAIN_MAX_BLEND_LAYERS = exports.TERRAIN_MAX_LEVELS = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/assets/index.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _dec2, _class4, _temp2, _dec3, _class6, _class7, _descriptor7, _temp3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const TERRAIN_MAX_LEVELS = 4;
exports.TERRAIN_MAX_LEVELS = TERRAIN_MAX_LEVELS;
const TERRAIN_MAX_BLEND_LAYERS = 4;
exports.TERRAIN_MAX_BLEND_LAYERS = TERRAIN_MAX_BLEND_LAYERS;
const TERRAIN_MAX_LAYER_COUNT = 256;
exports.TERRAIN_MAX_LAYER_COUNT = TERRAIN_MAX_LAYER_COUNT;
const TERRAIN_BLOCK_TILE_COMPLEXITY = 32;
exports.TERRAIN_BLOCK_TILE_COMPLEXITY = TERRAIN_BLOCK_TILE_COMPLEXITY;
const TERRAIN_BLOCK_VERTEX_COMPLEXITY = 33;
exports.TERRAIN_BLOCK_VERTEX_COMPLEXITY = TERRAIN_BLOCK_VERTEX_COMPLEXITY;
const TERRAIN_BLOCK_VERTEX_SIZE = 8; // position + normal + uv

exports.TERRAIN_BLOCK_VERTEX_SIZE = TERRAIN_BLOCK_VERTEX_SIZE;
const TERRAIN_HEIGHT_BASE = 32768;
exports.TERRAIN_HEIGHT_BASE = TERRAIN_HEIGHT_BASE;
const TERRAIN_HEIGHT_FACTORY = 1.0 / 512.0;
exports.TERRAIN_HEIGHT_FACTORY = TERRAIN_HEIGHT_FACTORY;
const TERRAIN_HEIGHT_FMIN = -TERRAIN_HEIGHT_BASE * TERRAIN_HEIGHT_FACTORY;
exports.TERRAIN_HEIGHT_FMIN = TERRAIN_HEIGHT_FMIN;
const TERRAIN_HEIGHT_FMAX = (65535 - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
exports.TERRAIN_HEIGHT_FMAX = TERRAIN_HEIGHT_FMAX;
const TERRAIN_NORTH_INDEX = 0;
exports.TERRAIN_NORTH_INDEX = TERRAIN_NORTH_INDEX;
const TERRAIN_SOUTH_INDEX = 1;
exports.TERRAIN_SOUTH_INDEX = TERRAIN_SOUTH_INDEX;
const TERRAIN_WEST_INDEX = 2;
exports.TERRAIN_WEST_INDEX = TERRAIN_WEST_INDEX;
const TERRAIN_EAST_INDEX = 3;
exports.TERRAIN_EAST_INDEX = TERRAIN_EAST_INDEX;
const TERRAIN_DATA_VERSION = 0x01010001;
exports.TERRAIN_DATA_VERSION = TERRAIN_DATA_VERSION;
const TERRAIN_DATA_VERSION2 = 0x01010002;
exports.TERRAIN_DATA_VERSION2 = TERRAIN_DATA_VERSION2;
const TERRAIN_DATA_VERSION3 = 0x01010003;
exports.TERRAIN_DATA_VERSION3 = TERRAIN_DATA_VERSION3;
const TERRAIN_DATA_VERSION4 = 0x01010004;
exports.TERRAIN_DATA_VERSION4 = TERRAIN_DATA_VERSION4;
const TERRAIN_DATA_VERSION5 = 0x01010005;
exports.TERRAIN_DATA_VERSION5 = TERRAIN_DATA_VERSION5;
const TERRAIN_DATA_VERSION_DEFAULT = 0x01010111;
exports.TERRAIN_DATA_VERSION_DEFAULT = TERRAIN_DATA_VERSION_DEFAULT;

class TerrainBuffer {
  constructor() {
    this.length = 0;
    this.buffer = new Uint8Array(2048);
    this._buffView = new DataView(this.buffer.buffer);
    this._seekPos = 0;
  }

  reserve(size) {
    if (this.buffer.byteLength > size) {
      return;
    }

    let capacity = this.buffer.byteLength;

    while (capacity < size) {
      capacity += capacity;
    }

    const temp = new Uint8Array(capacity);

    for (let i = 0; i < this.length; ++i) {
      temp[i] = this.buffer[i];
    }

    this.buffer = temp;
    this._buffView = new DataView(this.buffer.buffer);
  }

  assign(buff) {
    this.buffer = buff;
    this.length = buff.length;
    this._seekPos = buff.byteOffset;
    this._buffView = new DataView(buff.buffer);
  }

  writeInt8(value) {
    this.reserve(this.length + 1);

    this._buffView.setInt8(this.length, value);

    this.length += 1;
  }

  writeInt16(value) {
    this.reserve(this.length + 2);

    this._buffView.setInt16(this.length, value, true);

    this.length += 2;
  }

  writeInt32(value) {
    this.reserve(this.length + 4);

    this._buffView.setInt32(this.length, value, true);

    this.length += 4;
  }

  writeIntArray(value) {
    this.reserve(this.length + 4 * value.length);

    for (let i = 0; i < value.length; ++i) {
      this._buffView.setInt32(this.length + i * 4, value[i], true);
    }

    this.length += 4 * value.length;
  }

  writeFloat(value) {
    this.reserve(this.length + 4);

    this._buffView.setFloat32(this.length, value, true);

    this.length += 4;
  }

  writeFloatArray(value) {
    this.reserve(this.length + 4 * value.length);

    for (let i = 0; i < value.length; ++i) {
      this._buffView.setFloat32(this.length + i * 4, value[i], true);
    }

    this.length += 4 * value.length;
  }

  writeString(value) {
    this.reserve(this.length + value.length + 4);

    this._buffView.setInt32(this.length, value.length, true);

    for (let i = 0; i < value.length; ++i) {
      this._buffView.setInt8(this.length + 4 + i, value.charCodeAt(i));
    }

    this.length += value.length + 4;
  }

  readInt8() {
    const value = this._buffView.getInt8(this._seekPos);

    this._seekPos += 1;
    return value;
  }

  readInt16() {
    const value = this._buffView.getInt16(this._seekPos, true);

    this._seekPos += 2;
    return value;
  }

  readInt() {
    const value = this._buffView.getInt32(this._seekPos, true);

    this._seekPos += 4;
    return value;
  }

  readIntArray(value) {
    for (let i = 0; i < value.length; ++i) {
      value[i] = this._buffView.getInt32(this._seekPos + i * 4, true);
    }

    this._seekPos += 4 * value.length;
    return value;
  }

  readFloat() {
    const value = this._buffView.getFloat32(this._seekPos, true);

    this._seekPos += 4;
    return value;
  }

  readFloatArray(value) {
    for (let i = 0; i < value.length; ++i) {
      value[i] = this._buffView.getFloat32(this._seekPos + i * 4, true);
    }

    this._seekPos += 4 * value.length;
    return value;
  }

  readString() {
    const length = this.readInt();
    let value = '';

    for (let i = 0; i < length; ++i) {
      value += String.fromCharCode(this.readInt8());
    }

    return value;
  }

}
/**
 * @en terrain layer info
 * @zh 地形纹理信息
 */


let TerrainLayerInfo = (_dec = (0, _index.ccclass)('cc.TerrainLayerInfo'), _dec(_class = (_class2 = (_temp = class TerrainLayerInfo {
  constructor() {
    _initializerDefineProperty(this, "slot", _descriptor, this);

    _initializerDefineProperty(this, "tileSize", _descriptor2, this);

    _initializerDefineProperty(this, "detailMap", _descriptor3, this);

    _initializerDefineProperty(this, "normalMap", _descriptor4, this);

    _initializerDefineProperty(this, "roughness", _descriptor5, this);

    _initializerDefineProperty(this, "metallic", _descriptor6, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slot", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tileSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "detailMap", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "normalMap", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "roughness", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "metallic", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
/**
 * @en terrain layer binary info
 * @zh 地形纹理二进制信息
 */

exports.TerrainLayerInfo = TerrainLayerInfo;
let TerrainLayerBinaryInfo = (_dec2 = (0, _index.ccclass)('cc.TerrainLayerBinaryInfo'), _dec2(_class4 = (_temp2 = class TerrainLayerBinaryInfo {
  constructor() {
    this.slot = 0;
    this.tileSize = 1;
    this.roughness = 1;
    this.metallic = 0;
    this.detailMapId = '';
    this.normalMapId = '';
  }

}, _temp2)) || _class4);
/**
 * @en terrain asset
 * @zh 地形资源
 */

exports.TerrainLayerBinaryInfo = TerrainLayerBinaryInfo;
let TerrainAsset = (_dec3 = (0, _index.ccclass)('cc.TerrainAsset'), _dec3(_class6 = (_class7 = (_temp3 = class TerrainAsset extends _index2.Asset {
  constructor() {
    super();
    this._version = 0;
    this._data = null;
    this._tileSize = 1;
    this._blockCount = [1, 1];
    this._weightMapSize = 128;
    this._lightMapSize = 128;
    this._heights = new Uint16Array();
    this._weights = new Uint8Array();
    this._layerBuffer = [-1, -1, -1, -1];
    this._layerBinaryInfos = [];

    _initializerDefineProperty(this, "_layerInfos", _descriptor7, this);

    this.loaded = false;
  }

  get _nativeAsset() {
    return this._data.buffer;
  }

  set _nativeAsset(value) {
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


  get version() {
    return this._version;
  }
  /**
   * @en tile size
   * @zh 栅格大小
   */


  set tileSize(value) {
    this._tileSize = value;
  }

  get tileSize() {
    return this._tileSize;
  }
  /**
   * @en block count
   * @zh 块数量
   */


  set blockCount(value) {
    this._blockCount = value;
  }

  get blockCount() {
    return this._blockCount;
  }
  /**
   * @en light map size
   * @zh 光照图大小
   */


  set lightMapSize(value) {
    this._lightMapSize = value;
  }

  get lightMapSize() {
    return this._lightMapSize;
  }
  /**
   * @en weight map size
   * @zh 权重图大小
   */


  set weightMapSize(value) {
    this._weightMapSize = value;
  }

  get weightMapSize() {
    return this._weightMapSize;
  }
  /**
   * @en height buffer
   * @zh 高度缓存
   */


  set heights(value) {
    this._heights = value;
  }

  get heights() {
    return this._heights;
  }
  /**
   * @en weight buffer
   * @zh 权重缓存
   */


  set weights(value) {
    this._weights = value;
  }

  get weights() {
    return this._weights;
  }
  /**
   * @en layer buffer
   * @zh 纹理索引缓存
   */


  set layerBuffer(value) {
    this._layerBuffer = value;
  }

  get layerBuffer() {
    return this._layerBuffer;
  }
  /**
   * @en layer info
   * @zh 纹理信息
   */


  set layerInfos(value) {
    this._layerInfos = value;
  }

  get layerInfos() {
    return this._layerInfos;
  }

  get layerBinaryInfos() {
    return this._layerBinaryInfos;
  }
  /**
   * @en get layer
   * @zh 获得纹理索引
   * @param xBlock block index x
   * @param yBlock block index y
   * @param layerId layer id
   */


  getLayer(xBlock, yBlock, layerId) {
    const blockId = yBlock * this.blockCount[0] + xBlock;
    const index = blockId * 4 + layerId;

    if (xBlock < this.blockCount[0] && yBlock < this.blockCount[1] && index < this._layerBuffer.length) {
      return this._layerBuffer[index];
    }

    return -1;
  }

  getHeight(i, j) {
    const vertexCountX = this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
    return (this._heights[j * vertexCountX + i] - TERRAIN_HEIGHT_BASE) * TERRAIN_HEIGHT_FACTORY;
  }

  getVertexCountI() {
    if (this._blockCount.length < 1) return 0;
    return this._blockCount[0] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
  }

  getVertexCountJ() {
    if (this._blockCount.length < 2) return 0;
    return this._blockCount[1] * TERRAIN_BLOCK_TILE_COMPLEXITY + 1;
  }

  _setNativeData(_nativeData) {
    this._data = _nativeData;
  }

  _loadNativeData(_nativeData) {
    if (!_nativeData || _nativeData.length === 0) {
      return false;
    }

    const stream = new TerrainBuffer();
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

    const heightBufferSize = stream.readInt();
    this.heights = new Uint16Array(heightBufferSize);

    for (let i = 0; i < this.heights.length; ++i) {
      this.heights[i] = stream.readInt16();
    } // weights


    const WeightBufferSize = stream.readInt();
    this.weights = new Uint8Array(WeightBufferSize);

    for (let i = 0; i < this.weights.length; ++i) {
      this.weights[i] = stream.readInt8();
    } // layer buffer


    if (this._version >= TERRAIN_DATA_VERSION2) {
      const layerBufferSize = stream.readInt();
      this.layerBuffer = new Array(layerBufferSize);

      for (let i = 0; i < this.layerBuffer.length; ++i) {
        this.layerBuffer[i] = stream.readInt16();
      }
    } // layer infos


    if (this._version >= TERRAIN_DATA_VERSION3) {
      const layerInfoSize = stream.readInt();
      this._layerBinaryInfos = new Array(layerInfoSize);

      for (let i = 0; i < this._layerBinaryInfos.length; ++i) {
        this._layerBinaryInfos[i] = new TerrainLayerBinaryInfo();
        this._layerBinaryInfos[i].slot = stream.readInt();
        this._layerBinaryInfos[i].tileSize = stream.readFloat();
        this._layerBinaryInfos[i].detailMapId = stream.readString();

        if (this._version >= TERRAIN_DATA_VERSION4) {
          this._layerBinaryInfos[i].normalMapId = stream.readString();
          this._layerBinaryInfos[i].roughness = stream.readFloat();
          this._layerBinaryInfos[i].metallic = stream.readFloat();
        }
      }
    }

    return true;
  }

  _exportNativeData() {
    const stream = new TerrainBuffer(); // version

    stream.writeInt32(TERRAIN_DATA_VERSION5); // geometry info

    stream.writeFloat(this.tileSize);
    stream.writeIntArray(this._blockCount);
    stream.writeInt16(this.weightMapSize);
    stream.writeInt16(this.lightMapSize); // heights

    stream.writeInt32(this.heights.length);

    for (let i = 0; i < this.heights.length; ++i) {
      stream.writeInt16(this.heights[i]);
    } // weights


    stream.writeInt32(this.weights.length);

    for (let i = 0; i < this.weights.length; ++i) {
      stream.writeInt8(this.weights[i]);
    } // layer buffer


    stream.writeInt32(this.layerBuffer.length);

    for (let i = 0; i < this.layerBuffer.length; ++i) {
      stream.writeInt16(this.layerBuffer[i]);
    } // layer infos


    const layerBinaryInfos = [];
    layerBinaryInfos.length = this.layerInfos.length;

    for (let i = 0; i < layerBinaryInfos.length; ++i) {
      const layer = this.layerInfos[i];
      const binaryLayer = new TerrainLayerBinaryInfo();
      binaryLayer.slot = i;
      binaryLayer.tileSize = layer.tileSize;
      binaryLayer.detailMapId = layer.detailMap ? layer.detailMap._uuid : '';
      binaryLayer.normalMapId = layer.normalMap ? layer.normalMap._uuid : '';
      binaryLayer.metallic = layer.metallic;
      binaryLayer.roughness = layer.roughness;
      layerBinaryInfos[i] = binaryLayer;
    }

    stream.writeInt32(layerBinaryInfos.length);

    for (let i = 0; i < layerBinaryInfos.length; ++i) {
      stream.writeInt32(layerBinaryInfos[i].slot);
      stream.writeFloat(layerBinaryInfos[i].tileSize);
      stream.writeString(layerBinaryInfos[i].detailMapId);
      stream.writeString(layerBinaryInfos[i].normalMapId);
      stream.writeFloat(layerBinaryInfos[i].roughness);
      stream.writeFloat(layerBinaryInfos[i].metallic);
    }

    return stream.buffer;
  }

  _exportDefaultNativeData() {
    const stream = new TerrainBuffer();
    stream.writeInt32(TERRAIN_DATA_VERSION_DEFAULT);
    return stream.buffer;
  }

}, _temp3), (_descriptor7 = _applyDecoratedDescriptor(_class7.prototype, "_layerInfos", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class7)) || _class6);
exports.TerrainAsset = TerrainAsset;