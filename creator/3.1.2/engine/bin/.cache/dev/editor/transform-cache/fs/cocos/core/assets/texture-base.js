"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureBase = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _samplerLib = require("../renderer/core/sampler-lib.js");

var _idGenerator = _interopRequireDefault(require("../utils/id-generator.js"));

var _asset = require("./asset.js");

var _assetEnum = require("./asset-enum.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var _murmurhash2_gc = require("../utils/murmurhash2_gc.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const idGenerator = new _idGenerator.default('Tex');
/**
 * @en The base texture class, it defines features shared by all textures.
 * @zh 贴图资源基类。它定义了所有贴图共用的概念。
 */

let TextureBase = (_dec = (0, _index.ccclass)('cc.TextureBase'), _dec(_class = (_class2 = (_temp = _class3 = class TextureBase extends _asset.Asset {
  /**
   * @en Whether the pixel data is compressed.
   * @zh 此贴图是否为压缩的像素格式。
   */
  get isCompressed() {
    return this._format >= _assetEnum.PixelFormat.RGB_ETC1 && this._format <= _assetEnum.PixelFormat.RGBA_ASTC_12x12 || this._format >= _assetEnum.PixelFormat.RGB_A_PVRTC_2BPPV1 && this._format <= _assetEnum.PixelFormat.RGBA_ETC1;
  }
  /**
   * @en Pixel width of the texture
   * @zh 此贴图的像素宽度。
   */


  get width() {
    return this._width;
  }
  /**
   * @en Pixel height of the texture
   * @zh 此贴图的像素高度。
   */


  get height() {
    return this._height;
  }
  /**
   * @en The pixel format enum.
   * @zh 像素格式枚举类型
   */


  constructor() {
    super(); // Id for generate hash in material

    _initializerDefineProperty(this, "_format", _descriptor, this);

    _initializerDefineProperty(this, "_minFilter", _descriptor2, this);

    _initializerDefineProperty(this, "_magFilter", _descriptor3, this);

    _initializerDefineProperty(this, "_mipFilter", _descriptor4, this);

    _initializerDefineProperty(this, "_wrapS", _descriptor5, this);

    _initializerDefineProperty(this, "_wrapT", _descriptor6, this);

    _initializerDefineProperty(this, "_wrapR", _descriptor7, this);

    _initializerDefineProperty(this, "_anisotropy", _descriptor8, this);

    this._width = 1;
    this._height = 1;
    this._id = void 0;
    this._samplerInfo = [];
    this._samplerHash = 0;
    this._gfxSampler = null;
    this._gfxDevice = null;
    this._textureHash = 0;
    this._id = idGenerator.getNewId();
    this.loaded = false;
    this._gfxDevice = this._getGFXDevice();
    this._textureHash = (0, _murmurhash2_gc.murmurhash2_32_gc)(this._id, 666);
  }
  /**
   * @en Gets the id of the texture
   * @zh 获取标识符。
   * @returns The id
   */


  getId() {
    return this._id;
  }
  /**
   * @en Gets the pixel format
   * @zh 获取像素格式。
   * @returns The pixel format
   */


  getPixelFormat() {
    return this._format;
  }
  /**
   * @en Gets the anisotropy
   * @zh 获取各向异性。
   * @returns The anisotropy
   */


  getAnisotropy() {
    return this._anisotropy;
  }
  /**
   * @en Sets the wrap mode of the texture.
   * Be noted, if the size of the texture is not power of two, only [[WrapMode.CLAMP_TO_EDGE]] is allowed.
   * @zh 设置此贴图的缠绕模式。
   * 注意，若贴图尺寸不是 2 的整数幂，缠绕模式仅允许 [[WrapMode.CLAMP_TO_EDGE]]。
   * @param wrapS S(U) coordinate wrap mode
   * @param wrapT T(V) coordinate wrap mode
   * @param wrapR R(W) coordinate wrap mode
   */


  setWrapMode(wrapS, wrapT, wrapR) {
    this._wrapS = wrapS;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.addressU] = wrapS;
    this._wrapT = wrapT;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.addressV] = wrapT;

    if (wrapR !== undefined) {
      this._wrapR = wrapR;
      this._samplerInfo[_samplerLib.SamplerInfoIndex.addressW] = wrapR;
    }

    this._samplerHash = (0, _samplerLib.genSamplerHash)(this._samplerInfo); // for editor assetDB

    if (this._gfxDevice) {
      this._gfxSampler = _samplerLib.samplerLib.getSampler(this._gfxDevice, this._samplerHash);
    }
  }
  /**
   * @en Sets the texture's filter mode
   * @zh 设置此贴图的过滤算法。
   * @param minFilter Filter mode for scale down
   * @param magFilter Filter mode for scale up
   */


  setFilters(minFilter, magFilter) {
    this._minFilter = minFilter;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.minFilter] = minFilter;
    this._magFilter = magFilter;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.magFilter] = magFilter;
    this._samplerHash = (0, _samplerLib.genSamplerHash)(this._samplerInfo);

    if (this._gfxDevice) {
      this._gfxSampler = _samplerLib.samplerLib.getSampler(this._gfxDevice, this._samplerHash);
    }
  }
  /**
   * @en Sets the texture's mip filter
   * @zh 设置此贴图的缩小过滤算法。
   * @param mipFilter Filter mode for scale down
   */


  setMipFilter(mipFilter) {
    this._mipFilter = mipFilter;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.mipFilter] = mipFilter;
    this._samplerHash = (0, _samplerLib.genSamplerHash)(this._samplerInfo);

    if (this._gfxDevice) {
      this._gfxSampler = _samplerLib.samplerLib.getSampler(this._gfxDevice, this._samplerHash);
    }
  }
  /**
   * @en Sets the texture's anisotropy
   * @zh 设置此贴图的各向异性。
   * @param anisotropy
   */


  setAnisotropy(anisotropy) {
    this._anisotropy = anisotropy;
    this._samplerInfo[_samplerLib.SamplerInfoIndex.maxAnisotropy] = anisotropy;
    this._samplerHash = (0, _samplerLib.genSamplerHash)(this._samplerInfo);

    if (this._gfxDevice) {
      this._gfxSampler = _samplerLib.samplerLib.getSampler(this._gfxDevice, this._samplerHash);
    }
  }
  /**
   * @en Destroy the current texture, clear up the related GPU resources.
   * @zh 销毁此贴图，并释放占用的 GPU 资源。
   */


  destroy() {
    const destroyed = super.destroy();

    if (destroyed && _globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.batcher2D) {
      _globalExports.legacyCC.director.root.batcher2D._releaseDescriptorSetCache(this._textureHash);
    }

    return destroyed;
  }
  /**
   * @en Gets the texture hash.
   * @zh 获取此贴图的哈希值。
   */


  getHash() {
    return this._textureHash;
  }
  /**
   * @en Gets the GFX Texture resource
   * @zh 获取此贴图底层的 GFX 贴图对象。
   */


  getGFXTexture() {
    return null;
  }
  /**
   * @en Gets the internal GFX sampler hash.
   * @zh 获取此贴图内部使用的 GFX 采样器信息。
   * @private
   */


  getSamplerHash() {
    return this._samplerHash;
  }
  /**
   * @en Gets the sampler resource for the texture
   * @zh 获取此贴图底层的 GFX 采样信息。
   */


  getGFXSampler() {
    if (!this._gfxSampler) {
      if (this._gfxDevice) {
        this._gfxSampler = _samplerLib.samplerLib.getSampler(this._gfxDevice, this._samplerHash);
      } else {
        (0, _debug.errorID)(9302);
      }
    }

    return this._gfxSampler;
  } // SERIALIZATION

  /**
   * @return
   */


  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      return `${this._minFilter},${this._magFilter},${this._wrapS},${this._wrapT},${this._mipFilter},${this._anisotropy}`;
    }

    return '';
  }
  /**
   *
   * @param data
   */


  _deserialize(serializedData, handle) {
    const data = serializedData;
    const fields = data.split(',');
    fields.unshift('');

    if (fields.length >= 5) {
      // decode filters
      this.setFilters(parseInt(fields[1]), parseInt(fields[2])); // decode wraps

      this.setWrapMode(parseInt(fields[3]), parseInt(fields[4]));
    }

    if (fields.length >= 7) {
      this.setMipFilter(parseInt(fields[5]));
      this.setAnisotropy(parseInt(fields[6]));
    }
  }

  _getGFXDevice() {
    if (_globalExports.legacyCC.director.root) {
      return _globalExports.legacyCC.director.root.device;
    }

    return null;
  }

  _getGFXFormat() {
    return this._getGFXPixelFormat(this._format);
  }

  _setGFXFormat(format) {
    this._format = format === undefined ? _assetEnum.PixelFormat.RGBA8888 : format;
  }

  _getGFXPixelFormat(format) {
    if (format === _assetEnum.PixelFormat.RGBA_ETC1) {
      format = _assetEnum.PixelFormat.RGB_ETC1;
    } else if (format === _assetEnum.PixelFormat.RGB_A_PVRTC_4BPPV1) {
      format = _assetEnum.PixelFormat.RGB_PVRTC_4BPPV1;
    } else if (format === _assetEnum.PixelFormat.RGB_A_PVRTC_2BPPV1) {
      format = _assetEnum.PixelFormat.RGB_PVRTC_2BPPV1;
    }

    return format;
  }

}, _class3.PixelFormat = _assetEnum.PixelFormat, _class3.WrapMode = _assetEnum.WrapMode, _class3.Filter = _assetEnum.Filter, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_format", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.PixelFormat.RGBA8888;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_minFilter", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.Filter.LINEAR;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_magFilter", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.Filter.LINEAR;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_mipFilter", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.Filter.NONE;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_wrapS", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.WrapMode.REPEAT;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_wrapT", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.WrapMode.REPEAT;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_wrapR", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _assetEnum.WrapMode.REPEAT;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_anisotropy", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.TextureBase = TextureBase;
_globalExports.legacyCC.TextureBase = TextureBase;