"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicAtlasTexture = exports.Atlas = void 0;

var _assetEnum = require("../../../core/assets/asset-enum.js");

var _texture2d = require("../../../core/assets/texture-2d.js");

var _index = require("../../../core/gfx/index.js");

var _globalExports = require("../../../core/global-exports.js");

/**
 * @packageDocumentation
 * @hidden
 */
const space = 2;

class Atlas {
  constructor(width, height) {
    this._texture = void 0;
    this._width = void 0;
    this._height = void 0;
    this._x = void 0;
    this._y = void 0;
    this._nexty = void 0;
    this._innerTextureInfos = {};
    this._innerSpriteFrames = void 0;
    this._count = void 0;
    const texture = new DynamicAtlasTexture();
    texture.initWithSize(width, height);
    this._texture = texture;
    this._width = width;
    this._height = height;
    this._x = space;
    this._y = space;
    this._nexty = space;
    this._innerTextureInfos = {};
    this._innerSpriteFrames = [];
    this._count = 0;
  }

  insertSpriteFrame(spriteFrame) {
    const rect = spriteFrame.rect; // Todo:No renderTexture

    const texture = spriteFrame.texture;

    const info = this._innerTextureInfos[texture.getId()];

    let sx = rect.x;
    let sy = rect.y;

    if (info) {
      sx += info.x;
      sy += info.y;
    } else {
      const width = texture.width;
      const height = texture.height;

      if (this._x + width + space > this._width) {
        this._x = space;
        this._y = this._nexty;
      }

      if (this._y + height + space > this._nexty) {
        this._nexty = this._y + height + space;
      }

      if (this._nexty > this._height) {
        return null;
      }

      if (_globalExports.legacyCC.internal.dynamicAtlasManager.textureBleeding) {
        // Smaller frame is more likely to be affected by linear filter
        if (width <= 8 || height <= 8) {
          this._texture.drawTextureAt(texture.image, this._x - 1, this._y - 1);

          this._texture.drawTextureAt(texture.image, this._x - 1, this._y + 1);

          this._texture.drawTextureAt(texture.image, this._x + 1, this._y - 1);

          this._texture.drawTextureAt(texture.image, this._x + 1, this._y + 1);
        }

        this._texture.drawTextureAt(texture.image, this._x - 1, this._y);

        this._texture.drawTextureAt(texture.image, this._x + 1, this._y);

        this._texture.drawTextureAt(texture.image, this._x, this._y - 1);

        this._texture.drawTextureAt(texture.image, this._x, this._y + 1);
      }

      this._texture.drawTextureAt(texture.image, this._x, this._y);

      this._innerTextureInfos[texture.getId()] = {
        x: this._x,
        y: this._y,
        texture
      };
      this._count++;
      sx += this._x;
      sy += this._y;
      this._x += width + space;
    }

    const frame = {
      x: sx,
      y: sy,
      texture: this._texture
    };

    this._innerSpriteFrames.push(spriteFrame);

    return frame;
  }

  deleteInnerTexture(texture) {
    if (texture && this._innerTextureInfos[texture.getId()]) {
      delete this._innerTextureInfos[texture.getId()];
      this._count--;
    }
  }

  isEmpty() {
    return this._count <= 0;
  }

  reset() {
    this._x = space;
    this._y = space;
    this._nexty = space;
    const frames = this._innerSpriteFrames;

    for (let i = 0, l = frames.length; i < l; i++) {
      const frame = frames[i];

      if (!frame.isValid) {
        continue;
      }

      frame._resetDynamicAtlasFrame();
    }

    this._innerSpriteFrames.length = 0;
    this._innerTextureInfos = {};
  }

  destroy() {
    this.reset();

    this._texture.destroy();
  }

}

exports.Atlas = Atlas;

class DynamicAtlasTexture extends _texture2d.Texture2D {
  /**
   * @en
   * Init the render texture with size.
   * @zh
   * 初始化 render texture。
   */
  initWithSize(width, height, format = _assetEnum.PixelFormat.RGBA8888) {
    this.reset({
      width,
      height,
      format
    });
    this.loaded = true;
    this.emit('load');
  }
  /**
   * @en Draw a texture to the specified position
   * @zh 将指定的图片渲染到指定的位置上。
   * @param {Texture2D} image
   * @param {Number} x
   * @param {Number} y
   */


  drawTextureAt(image, x, y) {
    const gfxTexture = this.getGFXTexture();

    if (!image || !gfxTexture) {
      return;
    }

    const gfxDevice = this._getGFXDevice();

    if (!gfxDevice) {
      console.warn('Unable to get device');
      return;
    }

    const region = new _index.BufferTextureCopy();
    region.texOffset.x = x;
    region.texOffset.y = y;
    region.texExtent.width = image.width;
    region.texExtent.height = image.height;
    gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
  }

}

exports.DynamicAtlasTexture = DynamicAtlasTexture;