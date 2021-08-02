"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SpriteAtlas: true,
  TTFFont: true,
  LabelAtlas: true,
  BitmapFont: true,
  Font: true
};
Object.defineProperty(exports, "SpriteAtlas", {
  enumerable: true,
  get: function () {
    return _spriteAtlas.SpriteAtlas;
  }
});
Object.defineProperty(exports, "TTFFont", {
  enumerable: true,
  get: function () {
    return _ttfFont.TTFFont;
  }
});
Object.defineProperty(exports, "LabelAtlas", {
  enumerable: true,
  get: function () {
    return _labelAtlas.LabelAtlas;
  }
});
Object.defineProperty(exports, "BitmapFont", {
  enumerable: true,
  get: function () {
    return _bitmapFont.BitmapFont;
  }
});
Object.defineProperty(exports, "Font", {
  enumerable: true,
  get: function () {
    return _font.Font;
  }
});

var _spriteFrame = require("./sprite-frame.js");

Object.keys(_spriteFrame).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _spriteFrame[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spriteFrame[key];
    }
  });
});

var _spriteAtlas = require("./sprite-atlas.js");

var _ttfFont = require("./ttf-font.js");

var _labelAtlas = require("./label-atlas.js");

var _bitmapFont = require("./bitmap-font.js");

var _font = require("./font.js");