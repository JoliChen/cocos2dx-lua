"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeHash = computeHash;
exports.shareLabelInfo = exports.LetterAtlas = exports.LetterRenderTexture = exports.CanvasPool = void 0;

var _bitmapFont = require("../../assets/bitmap-font.js");

var _index = require("../../../core/math/index.js");

var _index2 = require("../../../core/assets/index.js");

var _assetEnum = require("../../../core/assets/asset-enum.js");

var _index3 = require("../../../core/gfx/index.js");

var _textUtils = require("../../utils/text-utils.js");

var _director = require("../../../core/director.js");

var _index4 = require("../../../core/index.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @hidden
 */
let _canvasPool;

class CanvasPool {
  constructor() {
    this.pool = [];
  }

  static getInstance() {
    if (!_canvasPool) {
      _canvasPool = new CanvasPool();
    }

    return _canvasPool;
  }

  get() {
    let data = this.pool.pop();

    if (!data) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      data = {
        canvas,
        context
      };
    }

    return data;
  }

  put(canvas) {
    if (this.pool.length >= _index4.macro.MAX_LABEL_CANVAS_POOL_SIZE) {
      return;
    }

    this.pool.push(canvas);
  }

} // export function packToDynamicAtlas(comp, frame) {
//     // TODO: Material API design and export from editor could affect the material activation process
//     // need to update the logic here
//     if (frame && !TEST) {
//         if (!frame._original && dynamicAtlasManager) {
//             let packedFrame = dynamicAtlasManager.insertSpriteFrame(frame);
//             if (packedFrame) {
//                 frame._setDynamicAtlasFrame(packedFrame);
//             }
//         }
//         if (comp.sharedMaterials[0].getProperty('texture') !== frame._texture) {
//             comp._activateMaterial();
//         }
//     }
// }


exports.CanvasPool = CanvasPool;

const WHITE = _index.Color.WHITE.clone();

const space = 0;
const bleed = 2;

class FontLetterDefinition {
  constructor() {
    this.u = 0;
    this.v = 0;
    this.w = 0;
    this.h = 0;
    this.texture = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.valid = false;
    this.xAdvance = 0;
  }

}

const _backgroundStyle = `rgba(255, 255, 255, ${(1 / 255).toFixed(3)})`;
const BASELINE_OFFSET = (0, _textUtils.getBaselineOffset)();

class LetterTexture {
  constructor(char, labelInfo) {
    this.image = null;
    this.labelInfo = void 0;
    this.char = void 0;
    this.data = null;
    this.canvas = null;
    this.context = null;
    this.width = 0;
    this.height = 0;
    this.offsetY = 0;
    this.hash = void 0;
    this.char = char;
    this.labelInfo = labelInfo;
    this.hash = char.charCodeAt(0) + labelInfo.hash;
  }

  updateRenderData() {
    this._updateProperties();

    this._updateTexture();
  }

  destroy() {
    this.image = null; // Label._canvasPool.put(this._data);
  }

  _updateProperties() {
    this.data = CanvasPool.getInstance().get();
    this.canvas = this.data.canvas;
    this.context = this.data.context;

    if (this.context) {
      this.context.font = this.labelInfo.fontDesc;
      const width = (0, _textUtils.safeMeasureText)(this.context, this.char, this.labelInfo.fontDesc);
      const blank = this.labelInfo.margin * 2 + bleed;
      this.width = parseFloat(width.toFixed(2)) + blank;
      this.height = (1 + _textUtils.BASELINE_RATIO) * this.labelInfo.fontSize + blank;
      this.offsetY = -(this.labelInfo.fontSize * _textUtils.BASELINE_RATIO) / 2;
    }

    if (this.canvas.width !== this.width) {
      this.canvas.width = this.width;
    }

    if (this.canvas.height !== this.height) {
      this.canvas.height = this.height;
    }

    if (!this.image) {
      this.image = new _index2.ImageAsset();
    }

    this.image.reset(this.canvas);
  }

  _updateTexture() {
    if (!this.context || !this.canvas) {
      return;
    }

    const context = this.context;
    const labelInfo = this.labelInfo;
    const width = this.canvas.width;
    const height = this.canvas.height;
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';
    context.clearRect(0, 0, width, height); // Add a white background to avoid black edges.

    context.fillStyle = _backgroundStyle;
    context.fillRect(0, 0, width, height);
    context.font = labelInfo.fontDesc;
    const fontSize = labelInfo.fontSize;
    const startX = width / 2;
    const startY = height / 2 + fontSize * _textUtils.MIDDLE_RATIO + fontSize * BASELINE_OFFSET;
    const color = labelInfo.color; // use round for line join to avoid sharp intersect point

    context.lineJoin = 'round';
    context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${1})`;

    if (labelInfo.isOutlined) {
      const strokeColor = labelInfo.out || WHITE;
      context.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a / 255})`;
      context.lineWidth = labelInfo.margin * 2;
      context.strokeText(this.char, startX, startY);
    }

    context.fillText(this.char, startX, startY); // this.texture.handleLoadedTexture();
    // (this.image as Texture2D).updateImage();
  }

}

class LetterRenderTexture extends _index2.Texture2D {
  /**
   * @en
   * Init the render texture with size.
   * @zh
   * 初始化 render texture。
   * @param [width]
   * @param [height]
   * @param [string]
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

    const region = new _index3.BufferTextureCopy();
    region.texOffset.x = x;
    region.texOffset.y = y;
    region.texExtent.width = image.width;
    region.texExtent.height = image.height;
    gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
  }

}

exports.LetterRenderTexture = LetterRenderTexture;

class LetterAtlas {
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  constructor(width, height) {
    this._x = space;
    this._y = space;
    this._nextY = space;
    this._width = 0;
    this._height = 0;
    this._halfBleed = 0;
    this._dirty = false;
    const texture = new LetterRenderTexture();
    texture.initWithSize(width, height);
    this.fontDefDictionary = new _bitmapFont.FontAtlas(texture);
    this._halfBleed = bleed / 2;
    this._width = width;
    this._height = height;

    _director.director.on(_director.Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
  }

  insertLetterTexture(letterTexture) {
    const texture = letterTexture.image;
    const device = _director.director.root.device;

    if (!texture || !this.fontDefDictionary || !device) {
      return null;
    }

    const width = texture.width;
    const height = texture.height;

    if (this._x + width + space > this._width) {
      this._x = space;
      this._y = this._nextY;
    }

    if (this._y + height > this._nextY) {
      this._nextY = this._y + height + space;
    }

    if (this._nextY > this._height) {
      (0, _index4.warnID)(12100);
      return null;
    }

    this.fontDefDictionary.texture.drawTextureAt(texture, this._x, this._y);
    this._dirty = true;
    const letterDefinition = new FontLetterDefinition();
    letterDefinition.u = this._x + this._halfBleed;
    letterDefinition.v = this._y + this._halfBleed;
    letterDefinition.texture = this.fontDefDictionary.texture;
    letterDefinition.valid = true;
    letterDefinition.w = letterTexture.width - bleed;
    letterDefinition.h = letterTexture.height - bleed;
    letterDefinition.xAdvance = letterDefinition.w;
    letterDefinition.offsetY = letterTexture.offsetY;
    this._x += width + space;
    this.fontDefDictionary.addLetterDefinitions(letterTexture.hash, letterDefinition);
    /*
    const region = new BufferTextureCopy();
    region.texOffset.x = letterDefinition.offsetX;
    region.texOffset.y = letterDefinition.offsetY;
    region.texExtent.width = letterDefinition.w;
    region.texExtent.height = letterDefinition.h;
    */

    return letterDefinition;
  }

  update() {
    if (!this._dirty) {
      return;
    } // this.texture.update();


    this._dirty = false;
  }

  reset() {
    this._x = space;
    this._y = space;
    this._nextY = space; // const chars = this.letterDefinitions;
    // for (let i = 0, l = (Object.keys(chars)).length; i < l; i++) {
    //     const char = chars[i];
    //     if (!char.valid) {
    //         continue;
    //     }
    //     char.destroy();
    // }
    // this.letterDefinitions = createMap();

    this.fontDefDictionary.clear();
  }

  destroy() {
    this.reset();

    if (this.fontDefDictionary) {
      this.fontDefDictionary.texture.destroy();
      this.fontDefDictionary.texture = null;
    }
  }

  getTexture() {
    return this.fontDefDictionary.getTexture();
  }

  beforeSceneLoad() {
    this.clearAllCache();
  }

  clearAllCache() {
    this.destroy();
    const texture = new LetterRenderTexture();
    texture.initWithSize(this._width, this._height);
    this.fontDefDictionary.texture = texture;
  }

  getLetter(key) {
    return this.fontDefDictionary.letterDefinitions[key];
  }

  getLetterDefinitionForChar(char, labelInfo) {
    const hash = char.charCodeAt(0) + labelInfo.hash;
    let letter = this.fontDefDictionary.letterDefinitions[hash];

    if (!letter) {
      const temp = new LetterTexture(char, labelInfo);
      temp.updateRenderData();
      letter = this.insertLetterTexture(temp);
      temp.destroy();
    }

    return letter;
  }

}

exports.LetterAtlas = LetterAtlas;
const shareLabelInfo = {
  fontAtlas: null,
  fontSize: 0,
  lineHeight: 0,
  hAlign: 0,
  vAlign: 0,
  hash: '',
  fontFamily: '',
  fontDesc: 'Arial',
  color: _index.Color.WHITE.clone(),
  isOutlined: false,
  out: _index.Color.WHITE.clone(),
  margin: 0
};
exports.shareLabelInfo = shareLabelInfo;

function computeHash(labelInfo) {
  const hashData = '';
  const color = labelInfo.color.toHEX();
  let out = '';

  if (labelInfo.isOutlined && labelInfo.margin > 0) {
    out = out + labelInfo.margin + labelInfo.out.toHEX();
  }

  return hashData + labelInfo.fontSize + labelInfo.fontFamily + color + out;
}