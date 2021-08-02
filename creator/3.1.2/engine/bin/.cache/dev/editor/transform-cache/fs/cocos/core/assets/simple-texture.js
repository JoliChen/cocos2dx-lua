"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleTexture = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../gfx/index.js");

var _debug = require("../platform/debug.js");

var _assetEnum = require("./asset-enum.js");

var _textureBase = require("./texture-base.js");

var _globalExports = require("../global-exports.js");

var _macro = require("../platform/macro.js");

var _dependUtil = _interopRequireDefault(require("../asset-manager/depend-util.js"));

var _array = require("../utils/array.js");

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _regions = [new _index2.BufferTextureCopy()];

function getMipLevel(width, height) {
  let size = Math.max(width, height);
  let level = 0;

  while (size) {
    size >>= 1;
    level++;
  }

  return level;
}

function isPOT(n) {
  return n && (n & n - 1) === 0;
}

function canGenerateMipmap(device, w, h) {
  const needCheckPOT = device.gfxAPI === _index2.API.WEBGL;

  if (needCheckPOT) {
    return isPOT(w) && isPOT(h);
  }

  return true;
}
/**
 * @en The simple texture base class.
 * It create the GFX Texture and can set mipmap levels.
 * @zh 简单贴图基类。
 * 简单贴图内部创建了 GFX 贴图和该贴图上的 GFX 贴图视图。
 * 简单贴图允许指定不同的 Mipmap 层级。
 */


let SimpleTexture = (_dec = (0, _index.ccclass)('cc.SimpleTexture'), _dec(_class = (_temp = class SimpleTexture extends _textureBase.TextureBase {
  constructor(...args) {
    super(...args);
    this._gfxTexture = null;
    this._mipmapLevel = 1;
    this._textureWidth = 0;
    this._textureHeight = 0;
  }

  /**
   * @en The mipmap level of the texture
   * @zh 贴图中的 Mipmap 层级数量
   */
  get mipmapLevel() {
    return this._mipmapLevel;
  }
  /**
   * @en The GFX Texture resource
   * @zh 获取此贴图底层的 GFX 贴图对象。
   */


  getGFXTexture() {
    return this._gfxTexture;
  }

  destroy() {
    this._tryDestroyTexture();

    return super.destroy();
  }
  /**
   * @en Update the level 0 mipmap image.
   * @zh 更新 0 级 Mipmap。
   */


  updateImage() {
    this.updateMipmaps(0);
  }
  /**
   * @en Update the given level mipmap image.
   * @zh 更新指定层级范围内的 Mipmap。当 Mipmap 数据发生了改变时应调用此方法提交更改。
   * 若指定的层级范围超出了实际已有的层级范围，只有覆盖的那些层级范围会被更新。
   * @param firstLevel First level to be updated
   * @param count Mipmap level count to be updated
   */


  updateMipmaps(firstLevel = 0, count) {}
  /**
   * @en Upload data to the given mipmap level.
   * The size of the image will affect how the mipmap is updated.
   * - When the image is an ArrayBuffer, the size of the image must match the mipmap size.
   * - If the image size matches the mipmap size, the mipmap data will be updated entirely.
   * - If the image size is smaller than the mipmap size, the mipmap will be updated from top left corner.
   * - If the image size is larger, an error will be raised
   * @zh 上传图像数据到指定层级的 Mipmap 中。
   * 图像的尺寸影响 Mipmap 的更新范围：
   * - 当图像是 `ArrayBuffer` 时，图像的尺寸必须和 Mipmap 的尺寸一致；否则，
   * - 若图像的尺寸与 Mipmap 的尺寸相同，上传后整个 Mipmap 的数据将与图像数据一致；
   * - 若图像的尺寸小于指定层级 Mipmap 的尺寸（不管是长或宽），则从贴图左上角开始，图像尺寸范围内的 Mipmap 会被更新；
   * - 若图像的尺寸超出了指定层级 Mipmap 的尺寸（不管是长或宽），都将引起错误。
   * @param source The source image or image data
   * @param level Mipmap level to upload the image to
   * @param arrayIndex The array index
   */


  uploadData(source, level = 0, arrayIndex = 0) {
    if (!this._gfxTexture || this._mipmapLevel <= level) {
      return;
    }

    const gfxDevice = this._getGFXDevice();

    if (!gfxDevice) {
      return;
    }

    const region = _regions[0];
    region.texExtent.width = this._textureWidth >> level;
    region.texExtent.height = this._textureHeight >> level;
    region.texSubres.mipLevel = level;
    region.texSubres.baseArrayLayer = arrayIndex;

    if (_internal253Aconstants.DEV) {
      if (source instanceof HTMLElement) {
        if (source.height > region.texExtent.height || source.width > region.texExtent.width) {
          (0, _debug.error)(`Image source(${this.name}) bounds override.`);
        }
      }
    }

    if (ArrayBuffer.isView(source)) {
      gfxDevice.copyBuffersToTexture([source], this._gfxTexture, _regions);
    } else {
      gfxDevice.copyTexImagesToTexture([source], this._gfxTexture, _regions);
    }
  }

  _assignImage(image, level, arrayIndex) {
    const upload = () => {
      const data = image.data;

      if (!data) {
        return;
      }

      this.uploadData(data, level, arrayIndex);

      this._checkTextureLoaded();

      if (_macro.macro.CLEANUP_IMAGE_CACHE) {
        const deps = _dependUtil.default.getDeps(this._uuid);

        const index = deps.indexOf(image._uuid);

        if (index !== -1) {
          (0, _array.fastRemoveAt)(deps, index);
          image.decRef();
        }
      }
    };

    if (image.loaded) {
      upload();
    } else {
      image.once('load', () => {
        upload();
      });

      if (!this.isCompressed) {
        const defaultImg = _globalExports.legacyCC.builtinResMgr.get('black-texture').image;

        this.uploadData(defaultImg.data, level, arrayIndex);
      }

      _globalExports.legacyCC.assetManager.postLoadNative(image);
    }
  }

  _checkTextureLoaded() {
    this._textureReady();
  }

  _textureReady() {
    this.loaded = true;
    this.emit('load');
  }
  /**
   * Set mipmap level of this texture.
   * The value is passes as presumed info to `this._getGfxTextureCreateInfo()`.
   * @param value The mipmap level.
   */


  _setMipmapLevel(value) {
    this._mipmapLevel = value < 1 ? 1 : value;
  }
  /**
   * @en This method is overrided by derived classes to provide GFX texture info.
   * @zh 这个方法被派生类重写以提供 GFX 纹理信息。
   * @param presumed The presumed GFX texture info.
   */


  _getGfxTextureCreateInfo(presumed) {
    return null;
  }

  _tryReset() {
    this._tryDestroyTexture();

    if (this._mipmapLevel === 0) {
      return;
    }

    const device = this._getGFXDevice();

    if (!device) {
      return;
    }

    this._createTexture(device);
  }

  _createTexture(device) {
    if (this._width === 0 || this._height === 0) {
      return;
    }

    let flags = _index2.TextureFlagBit.NONE;

    if (this._mipFilter !== _assetEnum.Filter.NONE && canGenerateMipmap(device, this._width, this._height)) {
      this._mipmapLevel = getMipLevel(this._width, this._height);
      flags = _index2.TextureFlagBit.GEN_MIPMAP;
    }

    const textureCreateInfo = this._getGfxTextureCreateInfo({
      usage: _index2.TextureUsageBit.SAMPLED | _index2.TextureUsageBit.TRANSFER_DST,
      format: this._getGFXFormat(),
      levelCount: this._mipmapLevel,
      flags: flags | _index2.TextureFlagBit.IMMUTABLE
    });

    if (!textureCreateInfo) {
      return;
    }

    const texture = device.createTexture(textureCreateInfo);
    this._textureWidth = textureCreateInfo.width;
    this._textureHeight = textureCreateInfo.height;
    this._gfxTexture = texture;
  }

  _tryDestroyTexture() {
    if (this._gfxTexture) {
      this._gfxTexture.destroy();

      this._gfxTexture = null;
    }
  }

}, _temp)) || _class);
exports.SimpleTexture = SimpleTexture;
_globalExports.legacyCC.SimpleTexture = SimpleTexture;