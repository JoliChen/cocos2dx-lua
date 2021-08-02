"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelAtlas = void 0;

var _index = require("../../core/data/decorators/index.js");

var _bitmapFont = require("./bitmap-font.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _class;

/**
 * @en Class for LabelAtlas handling.
 * @zh 艺术数字字体资源类。
 *
 */
let LabelAtlas = (_dec = (0, _index.ccclass)('cc.LabelAtlas'), _dec(_class = class LabelAtlas extends _bitmapFont.BitmapFont {}) || _class);
exports.LabelAtlas = LabelAtlas;
_globalExports.legacyCC.LabelAtlas = LabelAtlas;