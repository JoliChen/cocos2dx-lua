"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "barFilled", {
  enumerable: true,
  get: function () {
    return _barFilled.barFilled;
  }
});
Object.defineProperty(exports, "radialFilled", {
  enumerable: true,
  get: function () {
    return _radialFilled.radialFilled;
  }
});
Object.defineProperty(exports, "simple", {
  enumerable: true,
  get: function () {
    return _simple.simple;
  }
});
Object.defineProperty(exports, "sliced", {
  enumerable: true,
  get: function () {
    return _sliced.sliced;
  }
});
exports.spriteAssembler = void 0;

var _index = require("../../components/index.js");

var _barFilled = require("./bar-filled.js");

var _radialFilled = require("./radial-filled.js");

var _simple = require("./simple.js");

var _sliced = require("./sliced.js");

var _tiled = require("./tiled.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
const SpriteType = _index.Sprite.Type;
const FillType = _index.Sprite.FillType; // Inline all type switch to avoid jit deoptimization during inlined function change

const spriteAssembler = {
  getAssembler(spriteComp) {
    let util = _simple.simple;
    const comp = spriteComp;

    switch (comp.type) {
      case SpriteType.SLICED:
        util = _sliced.sliced;
        break;

      case SpriteType.TILED:
        util = _tiled.tiled;
        break;

      case SpriteType.FILLED:
        if (comp.fillType === FillType.RADIAL) {
          util = _radialFilled.radialFilled;
        } else {
          util = _barFilled.barFilled;
        }

        break;
      // case SpriteType.MESH:
      //     util = meshRenderUtil;
      //     break;

      default:
        break;
    }

    return util;
  } // Skip invalid sprites (without own _assembler)
  // updateRenderData (sprite) {
  //     return sprite.__allocedDatas;
  // },


};
exports.spriteAssembler = spriteAssembler;
_index.Sprite.Assembler = spriteAssembler;