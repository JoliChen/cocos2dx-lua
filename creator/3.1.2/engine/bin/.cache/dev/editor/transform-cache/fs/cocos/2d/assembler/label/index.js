"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "bmfont", {
  enumerable: true,
  get: function () {
    return _bmfont.bmfont;
  }
});
Object.defineProperty(exports, "CanvasPool", {
  enumerable: true,
  get: function () {
    return _fontUtils.CanvasPool;
  }
});
Object.defineProperty(exports, "letter", {
  enumerable: true,
  get: function () {
    return _letter.letter;
  }
});
Object.defineProperty(exports, "ttf", {
  enumerable: true,
  get: function () {
    return _ttf.ttf;
  }
});
exports.labelAssembler = void 0;

var _index = require("../../assets/index.js");

var _index2 = require("../../components/index.js");

var _bmfont = require("./bmfont.js");

var _fontUtils = require("./font-utils.js");

var _letter = require("./letter.js");

var _ttf = require("./ttf.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module ui-assembler
 */
const labelAssembler = {
  getAssembler(comp) {
    let assembler = _ttf.ttf;

    if (comp.font instanceof _index.BitmapFont) {
      assembler = _bmfont.bmfont;
    } else if (comp.cacheMode === _index2.Label.CacheMode.CHAR) {
      assembler = _letter.letter;
    }

    return assembler;
  } // Skip invalid labels (without own _assembler)
  // updateRenderData(label) {
  //     return label.__allocedDatas;
  // }


};
exports.labelAssembler = labelAssembler;
_index2.Label.Assembler = labelAssembler;