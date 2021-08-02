"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitmapFont = exports.FontAtlas = exports.FontLetterDefinition = void 0;

var _index = require("../../core/data/decorators/index.js");

var _font = require("./font.js");

var _spriteFrame = require("./sprite-frame.js");

var _globalExports = require("../../core/global-exports.js");

var _index2 = require("../../core/utils/index.js");

var _debug = require("../../core/platform/debug.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

class FontLetterDefinition {
  constructor() {
    this.u = 0;
    this.v = 0;
    this.w = 0;
    this.h = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.textureID = 0;
    this.valid = false;
    this.xAdvance = 0;
  }

}

exports.FontLetterDefinition = FontLetterDefinition;

class FontAtlas {
  constructor(texture) {
    this.letterDefinitions = {};
    this.texture = texture;
  }

  addLetterDefinitions(letter, letterDefinition) {
    this.letterDefinitions[letter] = letterDefinition;
  }

  cloneLetterDefinition() {
    const copyLetterDefinitions = {};

    for (const key of Object.keys(this.letterDefinitions)) {
      const value = new FontLetterDefinition();

      _index2.js.mixin(value, this.letterDefinitions[key]);

      copyLetterDefinitions[key] = value;
    }

    return copyLetterDefinitions;
  }

  getTexture() {
    return this.texture;
  }

  getLetter(key) {
    return this.letterDefinitions[key];
  }

  getLetterDefinitionForChar(char, labelInfo) {
    const key = char.charCodeAt(0);
    const hasKey = this.letterDefinitions.hasOwnProperty(key);
    let letter;

    if (hasKey) {
      letter = this.letterDefinitions[key];
    } else {
      letter = null;
    }

    return letter;
  }

  clear() {
    this.letterDefinitions = {};
  }

}
/**
 * @en Class for BitmapFont handling.
 * @zh 位图字体资源类。
 */


exports.FontAtlas = FontAtlas;
let BitmapFont = (_dec = (0, _index.ccclass)('cc.BitmapFont'), _dec2 = (0, _index.type)(_spriteFrame.SpriteFrame), _dec(_class = (_class2 = (_temp = class BitmapFont extends _font.Font {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "fntDataStr", _descriptor, this);

    _initializerDefineProperty(this, "spriteFrame", _descriptor2, this);

    _initializerDefineProperty(this, "fontSize", _descriptor3, this);

    _initializerDefineProperty(this, "fntConfig", _descriptor4, this);
  }

  onLoaded() {
    const spriteFrame = this.spriteFrame;

    if (!this.fontDefDictionary && spriteFrame) {
      this.fontDefDictionary = new FontAtlas(spriteFrame.texture);
    }

    const fntConfig = this.fntConfig;

    if (!fntConfig) {
      (0, _debug.warn)('The fnt config is not exists!');
      return;
    }

    const fontDict = fntConfig.fontDefDictionary;

    for (const fontDef in fontDict) {
      const letter = new FontLetterDefinition();
      const rect = fontDict[fontDef].rect;
      letter.offsetX = fontDict[fontDef].xOffset;
      letter.offsetY = fontDict[fontDef].yOffset;
      letter.w = rect.width;
      letter.h = rect.height;
      letter.u = rect.x;
      letter.v = rect.y; // FIXME: only one texture supported for now

      letter.textureID = 0;
      letter.valid = true;
      letter.xAdvance = fontDict[fontDef].xAdvance;
      this.fontDefDictionary.addLetterDefinitions(fontDef, letter);
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fntDataStr", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fntConfig", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.BitmapFont = BitmapFont;
_globalExports.legacyCC.BitmapFont = BitmapFont;