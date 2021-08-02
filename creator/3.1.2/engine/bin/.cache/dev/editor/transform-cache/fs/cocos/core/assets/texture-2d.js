"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture2D = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _index2 = require("../gfx/index.js");

var _assetEnum = require("./asset-enum.js");

var _imageAsset = require("./image-asset.js");

var _simpleTexture = require("./simple-texture.js");

var _globalExports = require("../global-exports.js");

var _js = require("../utils/js.js");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The 2D texture asset. It supports mipmap, each level of mipmap use an [[ImageAsset]].
 * @zh 二维贴图资源。二维贴图资源的每个 Mipmap 层级都为一张 [[ImageAsset]]。
 */
let Texture2D = (_dec = (0, _index.ccclass)('cc.Texture2D'), _dec2 = (0, _index.type)([_imageAsset.ImageAsset]), _dec(_class = (_class2 = (_temp = class Texture2D extends _simpleTexture.SimpleTexture {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_mipmaps", _descriptor, this);
  }

  /**
   * @en All levels of mipmap images, be noted, automatically generated mipmaps are not included.
   * When setup mipmap, the size of the texture and pixel format could be modified.
   * @zh 所有层级 Mipmap，注意，这里不包含自动生成的 Mipmap。
   * 当设置 Mipmap 时，贴图的尺寸以及像素格式可能会改变。
   */
  get mipmaps() {
    return this._mipmaps;
  }

  set mipmaps(value) {
    this._mipmaps = value;

    this._setMipmapLevel(this._mipmaps.length);

    if (this._mipmaps.length > 0) {
      const imageAsset = this._mipmaps[0];
      this.reset({
        width: imageAsset.width,
        height: imageAsset.height,
        format: imageAsset.format,
        mipmapLevel: this._mipmaps.length
      });

      this._mipmaps.forEach((mipmap, level) => {
        this._assignImage(mipmap, level);
      });
    } else {
      this.reset({
        width: 0,
        height: 0,
        mipmapLevel: this._mipmaps.length
      });
    }
  }
  /**
   * @en Level 0 mipmap image.
   * Be noted, `this.image = img` equals `this.mipmaps = [img]`,
   * sets image will clear all previous mipmaps.
   * @zh 0 级 Mipmap。
   * 注意，`this.image = img` 等价于 `this.mipmaps = [img]`，
   * 也就是说，通过 `this.image` 设置 0 级 Mipmap 时将隐式地清除之前的所有 Mipmap。
   */


  get image() {
    return this._mipmaps.length === 0 ? null : this._mipmaps[0];
  }

  set image(value) {
    this.mipmaps = value ? [value] : [];
  }

  initialize() {
    this.mipmaps = this._mipmaps;
  }

  onLoaded() {
    this.initialize();
  }
  /**
   * @en Reset the current texture with given size, pixel format and mipmap images.
   * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
   * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
   * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
   * @param info The create information
   */


  reset(info) {
    this._width = info.width;
    this._height = info.height;

    this._setGFXFormat(info.format);

    this._setMipmapLevel(info.mipmapLevel || 1);

    this._tryReset();
  }
  /**
   * @en Reset the current texture with given size, pixel format and mipmap images.
   * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
   * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
   * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
   * @param width Pixel width
   * @param height Pixel height
   * @param format Pixel format
   * @param mipmapLevel Mipmap level count
   * @deprecated since v1.0 please use [[reset]] instead
   */


  create(width, height, format = _assetEnum.PixelFormat.RGBA8888, mipmapLevel = 1) {
    this.reset({
      width,
      height,
      format,
      mipmapLevel
    });
  }

  toString() {
    return this._mipmaps.length !== 0 ? this._mipmaps[0].url : '';
  }

  updateMipmaps(firstLevel = 0, count) {
    if (firstLevel >= this._mipmaps.length) {
      return;
    }

    const nUpdate = Math.min(count === undefined ? this._mipmaps.length : count, this._mipmaps.length - firstLevel);

    for (let i = 0; i < nUpdate; ++i) {
      const level = firstLevel + i;

      this._assignImage(this._mipmaps[level], level);
    }
  }
  /**
   * @en If the level 0 mipmap image is a HTML element, then return it, otherwise return null.
   * @zh 若此贴图 0 级 Mipmap 的图像资源的实际源存在并为 HTML 元素则返回它，否则返回 `null`。
   * @returns HTML element or `null`
   * @deprecated Please use [[image.data]] instead
   */


  getHtmlElementObj() {
    return this._mipmaps[0] && this._mipmaps[0].data instanceof HTMLElement ? this._mipmaps[0].data : null;
  }
  /**
   * @en Destroy the current 2d texture, clear up all mipmap levels and the related GPU resources.
   * @zh 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
   */


  destroy() {
    this._mipmaps = [];
    return super.destroy();
  }
  /**
   * @en Gets the description of the 2d texture
   * @zh 返回此贴图的描述。
   * @returns The description
   */


  description() {
    const url = this._mipmaps[0] ? this._mipmaps[0].url : '';
    return `<cc.Texture2D | Name = ${url} | Dimension = ${this.width} x ${this.height}>`;
  }
  /**
   * @en Release used GPU resources.
   * @zh 释放占用的 GPU 资源。
   * @deprecated please use [[destroy]] instead
   */


  releaseTexture() {
    this.destroy();
  }

  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      return {
        base: super._serialize(ctxForExporting),
        mipmaps: this._mipmaps.map(mipmap => {
          if (!mipmap || !mipmap._uuid) {
            return null;
          }

          if (ctxForExporting && ctxForExporting._compressUuid) {
            // ctxForExporting.dependsOn('_textureSource', texture); TODO
            return EditorExtends.UuidUtils.compressUuid(mipmap._uuid, true);
          }

          return mipmap._uuid;
        })
      };
    }

    return null;
  }

  _deserialize(serializedData, handle) {
    const data = serializedData;

    super._deserialize(data.base, handle);

    this._mipmaps = new Array(data.mipmaps.length);

    for (let i = 0; i < data.mipmaps.length; ++i) {
      // Prevent resource load failed
      this._mipmaps[i] = new _imageAsset.ImageAsset();

      if (!data.mipmaps[i]) {
        continue;
      }

      const mipmapUUID = data.mipmaps[i];
      handle.result.push(this._mipmaps, `${i}`, mipmapUUID, _js.js._getClassId(_imageAsset.ImageAsset));
      this._mipmaps[i]._texture = this;
    }
  }

  _getGfxTextureCreateInfo(presumed) {
    const texInfo = new _index2.TextureInfo(_index2.TextureType.TEX2D);
    texInfo.width = this._width;
    texInfo.height = this._height;
    return Object.assign(texInfo, presumed);
  }

  _checkTextureLoaded() {
    let ready = true;

    for (let i = 0; i < this._mipmaps.length; ++i) {
      const image = this._mipmaps[i];

      if (!image.loaded) {
        ready = false;
        break;
      }
    }

    if (ready) {
      super._textureReady();
    }
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    const imageAsset = new _imageAsset.ImageAsset();
    imageAsset.initDefault();
    this.image = imageAsset;
  }

  validate() {
    return this.mipmaps && this.mipmaps.length !== 0;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mipmaps", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.Texture2D = Texture2D;
_globalExports.legacyCC.Texture2D = Texture2D;