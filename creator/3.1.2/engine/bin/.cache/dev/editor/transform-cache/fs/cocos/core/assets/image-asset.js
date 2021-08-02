"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAsset = void 0;

var _index = require("../data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../gfx/index.js");

var _asset = require("./asset.js");

var _assetEnum = require("./asset-enum.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var _dec, _class, _class2, _class3, _temp;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function isImageBitmap(imageSource) {
  return _globalExports.legacyCC.sys.capabilities.imageBitmap && imageSource instanceof ImageBitmap;
}

function fetchImageSource(imageSource) {
  return '_data' in imageSource ? imageSource._data : imageSource;
} // 返回该图像源是否是平台提供的图像对象。


function isNativeImage(imageSource) {
  if (_internal253Aconstants.ALIPAY || _internal253Aconstants.XIAOMI || _internal253Aconstants.BAIDU) {
    // We're unable to grab the constructors of Alipay native image or canvas object.
    return !('_data' in imageSource);
  }

  if (_internal253Aconstants.JSB && imageSource._compressed === true) {
    return false;
  }

  return imageSource instanceof HTMLImageElement || imageSource instanceof HTMLCanvasElement || isImageBitmap(imageSource);
}
/**
 * @en Image Asset.
 * @zh 图像资源。
 */


let ImageAsset = (_dec = (0, _index.ccclass)('cc.ImageAsset'), _dec(_class = (_class2 = (_temp = _class3 = class ImageAsset extends _asset.Asset {
  get _nativeAsset() {
    // Maybe returned to pool in webgl.
    return this._nativeData;
  }

  set _nativeAsset(value) {
    if (!(value instanceof HTMLElement) && !isImageBitmap(value)) {
      value.format = value.format || this._format;
    }

    this.reset(value);
  }
  /**
   * @en Image data.
   * @zh 此图像资源的图像数据。
   */


  get data() {
    if (this._nativeData && isNativeImage(this._nativeData)) {
      return this._nativeData;
    }

    return this._nativeData && this._nativeData._data;
  }
  /**
   * @en The pixel width of the image.
   * @zh 此图像资源的像素宽度。
   */


  get width() {
    return this._nativeData.width || this._width;
  }
  /**
   * @en The pixel height of the image.
   * @zh 此图像资源的像素高度。
   */


  get height() {
    return this._nativeData.height || this._height;
  }
  /**
   * @en The pixel format of the image.
   * @zh 此图像资源的像素格式。
   */


  get format() {
    return this._format;
  }
  /**
   * @en Whether the image is in compressed texture format.
   * @zh 此图像资源是否为压缩像素格式。
   */


  get isCompressed() {
    return this._format >= _assetEnum.PixelFormat.RGB_ETC1 && this._format <= _assetEnum.PixelFormat.RGBA_ASTC_12x12 || this._format >= _assetEnum.PixelFormat.RGB_A_PVRTC_2BPPV1 && this._format <= _assetEnum.PixelFormat.RGBA_ETC1;
  }
  /**
   * @en The original source image URL, it could be empty.
   * @zh 此图像资源的原始图像源的 URL。当原始图像元不是 HTML 文件时可能为空。
   * @deprecated Please use [[nativeUrl]]
   */


  get url() {
    return this.nativeUrl;
  }
  /**
   * @private
   */


  set _texture(tex) {
    this._tex = tex;
  }

  get _texture() {
    if (!this._tex) {
      const tex = new _globalExports.legacyCC.Texture2D();
      tex.name = this.nativeUrl;
      tex.image = this;
      this._tex = tex;
    }

    return this._tex;
  }

  constructor(nativeAsset) {
    super();
    this._nativeData = void 0;
    this._tex = void 0;
    this._exportedExts = undefined;
    this._format = _assetEnum.PixelFormat.RGBA8888;
    this._width = 0;
    this._height = 0;
    this.loaded = false;
    this._nativeData = {
      _data: null,
      width: 0,
      height: 0,
      format: 0,
      _compressed: false
    };

    if (_internal253Aconstants.EDITOR) {
      this._exportedExts = null;
    }

    if (nativeAsset !== undefined) {
      this.reset(nativeAsset);
    }
  }
  /**
   * @en Reset the source of the image asset.
   * @zh 重置此图像资源使用的原始图像源。
   * @param data The new source
   */


  reset(data) {
    if (isImageBitmap(data)) {
      this._nativeData = data;

      this._onDataComplete();
    } else if (!(data instanceof HTMLElement)) {
      // this._nativeData = Object.create(data);
      this._nativeData = data;
      this._format = data.format;

      this._onDataComplete();
    } else {
      this._nativeData = data;

      if (_internal253Aconstants.MINIGAME || data.complete || data instanceof HTMLCanvasElement) {
        // todo need adatper
        this._onDataComplete();
      } else {
        this.loaded = false;
        data.addEventListener('load', () => {
          this._onDataComplete();
        });
        data.addEventListener('error', err => {
          (0, _debug.warnID)(3119, err.message);
        });
      }
    }
  }

  destroy() {
    if (this.data && this.data instanceof HTMLImageElement) {
      this.data.src = '';

      this._setRawAsset(''); // @ts-expect-error JSB element should destroy native data.


      if (_internal253Aconstants.JSB) this.data.destroy();
    } else if (isImageBitmap(this.data)) {
      this.data.close && this.data.close();
    }

    return super.destroy();
  } // SERIALIZATION


  _serialize() {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      let targetExtensions = this._exportedExts;

      if (!targetExtensions && this._native) {
        targetExtensions = [this._native];
      }

      if (!targetExtensions) {
        return '';
      }

      const extensionIndices = [];

      for (const targetExtension of targetExtensions) {
        const extensionFormat = targetExtension.split('@');
        const i = ImageAsset.extnames.indexOf(extensionFormat[0]);
        let exportedExtensionID = i < 0 ? targetExtension : `${i}`;

        if (extensionFormat[1]) {
          exportedExtensionID += `@${extensionFormat[1]}`;
        }

        extensionIndices.push(exportedExtensionID);
      }

      return {
        fmt: extensionIndices.join('_'),
        w: this.width,
        h: this.height
      };
    }
  }

  _deserialize(data) {
    let fmtStr = '';

    if (typeof data === 'string') {
      fmtStr = data;
    } else {
      this._width = data.w;
      this._height = data.h;
      fmtStr = data.fmt;
    }

    const device = _getGlobalDevice();

    const extensionIDs = fmtStr.split('_');
    let defaultExt = '';
    let preferedExtensionIndex = Number.MAX_VALUE;
    let format = this._format;
    let ext = '';
    const SupportTextureFormats = _globalExports.legacyCC.macro.SUPPORT_TEXTURE_FORMATS;

    for (const extensionID of extensionIDs) {
      const extFormat = extensionID.split('@');
      const i = parseInt(extFormat[0], undefined);
      const tmpExt = ImageAsset.extnames[i] || extFormat[0];
      const index = SupportTextureFormats.indexOf(tmpExt);

      if (index !== -1 && index < preferedExtensionIndex) {
        const fmt = extFormat[1] ? parseInt(extFormat[1]) : this._format; // check whether or not support compressed texture

        if (tmpExt === '.astc' && (!device || !device.hasFeature(_index2.Feature.FORMAT_ASTC))) {
          continue;
        } else if (tmpExt === '.pvr' && (!device || !device.hasFeature(_index2.Feature.FORMAT_PVRTC))) {
          continue;
        } else if ((fmt === _assetEnum.PixelFormat.RGB_ETC1 || fmt === _assetEnum.PixelFormat.RGBA_ETC1) && (!device || !device.hasFeature(_index2.Feature.FORMAT_ETC1))) {
          continue;
        } else if ((fmt === _assetEnum.PixelFormat.RGB_ETC2 || fmt === _assetEnum.PixelFormat.RGBA_ETC2) && (!device || !device.hasFeature(_index2.Feature.FORMAT_ETC2))) {
          continue;
        } else if (tmpExt === '.webp' && !_globalExports.legacyCC.sys.capabilities.webp) {
          continue;
        }

        preferedExtensionIndex = index;
        ext = tmpExt;
        format = fmt;
      } else if (!defaultExt) {
        defaultExt = tmpExt;
      }
    }

    if (ext) {
      this._setRawAsset(ext);

      this._format = format;
    } else if (defaultExt) {
      this._setRawAsset(defaultExt);

      (0, _debug.warnID)(3120, defaultExt, defaultExt);
    } else {
      (0, _debug.warnID)(3121);
    }
  }

  _onDataComplete() {
    this.loaded = true;
    this.emit('load');
  }

  initDefault(uuid) {
    super.initDefault(uuid);

    if (!ImageAsset._sharedPlaceHolderCanvas) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const l = canvas.width = canvas.height = 2;
      context.fillStyle = '#ff00ff';
      context.fillRect(0, 0, l, l);
      this.reset(canvas);
      ImageAsset._sharedPlaceHolderCanvas = canvas;
    } else {
      this.reset(ImageAsset._sharedPlaceHolderCanvas);
    }
  }

  validate() {
    return !!this.data;
  }

}, _class3.extnames = ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.pvr', '.pkm', '.astc'], _class3._sharedPlaceHolderCanvas = null, _temp), (_applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [_index.override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class);
exports.ImageAsset = ImageAsset;

function _getGlobalDevice() {
  if (_globalExports.legacyCC.director.root) {
    return _globalExports.legacyCC.director.root.device;
  }

  return null;
}
/**
 * @zh
 * 当该资源加载成功后触发该事件。
 * @en
 * This event is emitted when the asset is loaded
 *
 * @event load
 */


_globalExports.legacyCC.ImageAsset = ImageAsset;