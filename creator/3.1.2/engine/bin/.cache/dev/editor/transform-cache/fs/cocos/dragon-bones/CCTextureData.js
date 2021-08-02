"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CCTextureData = exports.CCTextureAtlasData = void 0;

var _dragonbonesJs = require("@cocos/dragonbones-js");

var _index = require("../2d/index.js");

var _index2 = require("../core/data/decorators/index.js");

var _rect = require("../core/math/rect.js");

var _dec, _class, _temp, _dec2, _class3, _temp2;

let CCTextureAtlasData = (_dec = (0, _index2.ccclass)('dragonBones.CCTextureAtlasData'), _dec(_class = (_temp = class CCTextureAtlasData extends _dragonbonesJs.TextureAtlasData {
  constructor(...args) {
    super(...args);
    this._renderTexture = null;
  }

  get renderTexture() {
    return this._renderTexture;
  }

  set renderTexture(value) {
    this._renderTexture = value;

    if (value) {
      for (const k in this.textures) {
        const textureData = this.textures[k];

        if (!textureData.spriteFrame) {
          let rect = null;

          if (textureData.rotated) {
            rect = new _rect.Rect(textureData.region.x, textureData.region.y, textureData.region.height, textureData.region.width);
          } else {
            rect = new _rect.Rect(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height); // }
            // const offset = new Vec2(0, 0);
            // const size = new Size(rect.width, rect.height);
            // setTexture(value, rect, false, offset, size);

            textureData.spriteFrame = new _index.SpriteFrame();
            textureData.spriteFrame.texture = value;
            textureData.spriteFrame.rect = rect;
          }
        }
      }
    } else {
      for (const k in this.textures) {
        const textureData = this.textures[k];
        textureData.spriteFrame = null;
      }
    }
  }

  static toString() {
    return '[class dragonBones.CCTextureAtlasData]';
  }

  createTexture() {
    return _dragonbonesJs.BaseObject.borrowObject(CCTextureData);
  }

  _onClear() {
    super._onClear();

    this.renderTexture = null;
  }

}, _temp)) || _class);
exports.CCTextureAtlasData = CCTextureAtlasData;
let CCTextureData = (_dec2 = (0, _index2.ccclass)('dragonBones.CCTextureData'), _dec2(_class3 = (_temp2 = class CCTextureData extends _dragonbonesJs.TextureData {
  constructor(...args) {
    super(...args);
    this.spriteFrame = null;
  }

  static toString() {
    return '[class dragonBones.CCTextureData]';
  }

  _onClear() {
    super._onClear();

    this.spriteFrame = null;
  }

}, _temp2)) || _class3);
exports.CCTextureData = CCTextureData;