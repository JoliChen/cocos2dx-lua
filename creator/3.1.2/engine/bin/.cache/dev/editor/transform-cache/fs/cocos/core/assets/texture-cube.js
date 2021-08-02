"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureCube = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../data/decorators/index.js");

var _index2 = require("../gfx/index.js");

var _imageAsset = require("./image-asset.js");

var _simpleTexture = require("./simple-texture.js");

var _globalExports = require("../global-exports.js");

var _js = require("../utils/js.js");

var _dec, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en The index for all faces of the cube
 * @zh 立方体每个面的约定索引。
 */
var FaceIndex;
/**
 * @en The texture cube asset.
 * Each mipmap level of a texture cube have 6 [[ImageAsset]], represents 6 faces of the cube.
 * @zh 立方体贴图资源。
 * 立方体贴图资源的每个 Mipmap 层级都为 6 张 [[ImageAsset]]，分别代表了立方体贴图的 6 个面。
 */

(function (FaceIndex) {
  FaceIndex[FaceIndex["right"] = 0] = "right";
  FaceIndex[FaceIndex["left"] = 1] = "left";
  FaceIndex[FaceIndex["top"] = 2] = "top";
  FaceIndex[FaceIndex["bottom"] = 3] = "bottom";
  FaceIndex[FaceIndex["front"] = 4] = "front";
  FaceIndex[FaceIndex["back"] = 5] = "back";
})(FaceIndex || (FaceIndex = {}));

let TextureCube = (_dec = (0, _index.ccclass)('cc.TextureCube'), _dec(_class = (_class2 = (_temp = _class3 = class TextureCube extends _simpleTexture.SimpleTexture {
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
      const imageAsset = this._mipmaps[0].front;
      this.reset({
        width: imageAsset.width,
        height: imageAsset.height,
        format: imageAsset.format,
        mipmapLevel: this._mipmaps.length
      });

      this._mipmaps.forEach((mipmap, level) => {
        _forEachFace(mipmap, (face, faceIndex) => {
          this._assignImage(face, level, faceIndex);
        });
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
  /**
   * @en Create a texture cube with an array of [[Texture2D]] which represents 6 faces of the texture cube.
   * @zh 通过二维贴图数组指定每个 Mipmap 的每个面创建立方体贴图。
   * @param textures Texture array, the texture count must be multiple of 6. Every 6 textures are 6 faces of a mipmap level.
   * The order should obey [[FaceIndex]] order.
   * @param out Output texture cube, if not given, will create a new texture cube.
   * @returns The created texture cube.
   * @example
   * ```ts
   * const textures = new Array<Texture2D>(6);
   * textures[TextureCube.FaceIndex.front] = frontImage;
   * textures[TextureCube.FaceIndex.back] = backImage;
   * textures[TextureCube.FaceIndex.left] = leftImage;
   * textures[TextureCube.FaceIndex.right] = rightImage;
   * textures[TextureCube.FaceIndex.top] = topImage;
   * textures[TextureCube.FaceIndex.bottom] = bottomImage;
   * const textureCube = TextureCube.fromTexture2DArray(textures);
   * ```
   */


  static fromTexture2DArray(textures, out) {
    const mipmaps = [];
    const nMipmaps = textures.length / 6;

    for (let i = 0; i < nMipmaps; i++) {
      const x = i * 6;
      mipmaps.push({
        front: textures[x + FaceIndex.front].image,
        back: textures[x + FaceIndex.back].image,
        left: textures[x + FaceIndex.left].image,
        right: textures[x + FaceIndex.right].image,
        top: textures[x + FaceIndex.top].image,
        bottom: textures[x + FaceIndex.bottom].image
      });
    }

    out = out || new TextureCube();
    out.mipmaps = mipmaps;
    return out;
  }

  onLoaded() {
    this.mipmaps = this._mipmaps;
    this.loaded = true;
    this.emit('load');
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

  updateMipmaps(firstLevel = 0, count) {
    if (firstLevel >= this._mipmaps.length) {
      return;
    }

    const nUpdate = Math.min(count === undefined ? this._mipmaps.length : count, this._mipmaps.length - firstLevel);

    for (let i = 0; i < nUpdate; ++i) {
      const level = firstLevel + i;

      _forEachFace(this._mipmaps[level], (face, faceIndex) => {
        this._assignImage(face, level, faceIndex);
      });
    }
  }
  /**
   * 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
   */


  destroy() {
    this._mipmaps = [];
    return super.destroy();
  }
  /**
   * @en Release used GPU resources.
   * @zh 释放占用的 GPU 资源。
   * @deprecated please use [[destroy]] instead
   */


  releaseTexture() {
    this.mipmaps = [];
  }

  _serialize(ctxForExporting) {
    if (_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) {
      return {
        base: super._serialize(ctxForExporting),
        mipmaps: this._mipmaps.map(mipmap => ctxForExporting && ctxForExporting._compressUuid ? {
          front: EditorExtends.UuidUtils.compressUuid(mipmap.front._uuid, true),
          back: EditorExtends.UuidUtils.compressUuid(mipmap.back._uuid, true),
          left: EditorExtends.UuidUtils.compressUuid(mipmap.left._uuid, true),
          right: EditorExtends.UuidUtils.compressUuid(mipmap.right._uuid, true),
          top: EditorExtends.UuidUtils.compressUuid(mipmap.top._uuid, true),
          bottom: EditorExtends.UuidUtils.compressUuid(mipmap.bottom._uuid, true)
        } : {
          front: mipmap.front._uuid,
          back: mipmap.back._uuid,
          left: mipmap.left._uuid,
          right: mipmap.right._uuid,
          top: mipmap.top._uuid,
          bottom: mipmap.bottom._uuid
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
      this._mipmaps[i] = {
        front: new _imageAsset.ImageAsset(),
        back: new _imageAsset.ImageAsset(),
        left: new _imageAsset.ImageAsset(),
        right: new _imageAsset.ImageAsset(),
        top: new _imageAsset.ImageAsset(),
        bottom: new _imageAsset.ImageAsset()
      };
      const mipmap = data.mipmaps[i];

      const imageAssetClassId = _js.js._getClassId(_imageAsset.ImageAsset);

      handle.result.push(this._mipmaps[i], `front`, mipmap.front, imageAssetClassId);
      handle.result.push(this._mipmaps[i], `back`, mipmap.back, imageAssetClassId);
      handle.result.push(this._mipmaps[i], `left`, mipmap.left, imageAssetClassId);
      handle.result.push(this._mipmaps[i], `right`, mipmap.right, imageAssetClassId);
      handle.result.push(this._mipmaps[i], `top`, mipmap.top, imageAssetClassId);
      handle.result.push(this._mipmaps[i], `bottom`, mipmap.bottom, imageAssetClassId);
    }
  }

  _getGfxTextureCreateInfo(presumed) {
    const texInfo = new _index2.TextureInfo(_index2.TextureType.CUBE);
    texInfo.width = this._width;
    texInfo.height = this._height;
    texInfo.layerCount = 6;
    Object.assign(texInfo, presumed);
    return texInfo;
  }

  initDefault(uuid) {
    super.initDefault(uuid);
    const imageAsset = new _imageAsset.ImageAsset();
    imageAsset.initDefault();
    this.mipmaps = [{
      front: imageAsset,
      back: imageAsset,
      top: imageAsset,
      bottom: imageAsset,
      left: imageAsset,
      right: imageAsset
    }];
  }

  validate() {
    return this._mipmaps.length !== 0 && !this._mipmaps.find(x => !(x.top && x.bottom && x.front && x.back && x.left && x.right));
  }

}, _class3.FaceIndex = FaceIndex, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mipmaps", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class);
exports.TextureCube = TextureCube;
_globalExports.legacyCC.TextureCube = TextureCube;

/**
 * @param {Mipmap} mipmap
 * @param {(face: ImageAsset) => void} callback
 */
function _forEachFace(mipmap, callback) {
  callback(mipmap.front, FaceIndex.front);
  callback(mipmap.back, FaceIndex.back);
  callback(mipmap.left, FaceIndex.left);
  callback(mipmap.right, FaceIndex.right);
  callback(mipmap.top, FaceIndex.top);
  callback(mipmap.bottom, FaceIndex.bottom);
}