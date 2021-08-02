"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.letterFont = void 0;

var _index = require("../../../core/asset-manager/index.js");

var _js = require("../../../core/utils/js.js");

var _index2 = require("../../components/index.js");

var _bmfontUtils = require("./bmfontUtils.js");

var _fontUtils = require("./font-utils.js");

/*
 Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.

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
const _atlasWidth = 1024;
const _atlasHeight = 1024;
const _isBold = false;
let _shareAtlas = null;
const letterFont = (0, _js.mixin)(_bmfontUtils.bmfontUtils, {
  getAssemblerData() {
    if (!_shareAtlas) {
      _shareAtlas = new _fontUtils.LetterAtlas(_atlasWidth, _atlasHeight);
    }

    return _shareAtlas.getTexture();
  },

  _updateFontFamily(comp) {
    _fontUtils.shareLabelInfo.fontAtlas = _shareAtlas;
    _fontUtils.shareLabelInfo.fontFamily = this._getFontFamily(comp); // outline

    const outline = comp.getComponent(_index2.LabelOutline);

    if (outline && outline.enabled) {
      _fontUtils.shareLabelInfo.isOutlined = true;
      _fontUtils.shareLabelInfo.margin = outline.width;
      _fontUtils.shareLabelInfo.out = outline.color.clone();
      _fontUtils.shareLabelInfo.out.a = outline.color.a * comp.color.a / 255.0;
    } else {
      _fontUtils.shareLabelInfo.isOutlined = false;
      _fontUtils.shareLabelInfo.margin = 0;
    }
  },

  _getFontFamily(comp) {
    let fontFamily = 'Arial';

    if (!comp.useSystemFont) {
      if (comp.font) {
        if (comp.font._nativeAsset) {
          fontFamily = comp.font._nativeAsset;
        } else {
          _index.assetManager.postLoadNative(comp.font, err => {
            if (!comp.isValid) {
              return;
            }

            fontFamily = comp.font._nativeAsset || 'Arial';
            comp.updateRenderData(true);
          });
        }
      }
    } else {
      fontFamily = comp.fontFamily || 'Arial';
    }

    return fontFamily;
  },

  _updateLabelInfo(comp) {
    _fontUtils.shareLabelInfo.fontDesc = this._getFontDesc();
    _fontUtils.shareLabelInfo.color = comp.color;
    _fontUtils.shareLabelInfo.hash = (0, _fontUtils.computeHash)(_fontUtils.shareLabelInfo);
  },

  _getFontDesc() {
    let fontDesc = `${_fontUtils.shareLabelInfo.fontSize.toString()}px `;
    fontDesc += _fontUtils.shareLabelInfo.fontFamily;

    if (_isBold) {
      fontDesc = `bold ${fontDesc}`;
    }

    return fontDesc;
  },

  _computeHorizontalKerningForText() {},

  _determineRect(tempRect) {
    return false;
  }

});
exports.letterFont = letterFont;