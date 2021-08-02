"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitMask = BitMask;
exports.ccbitmask = ccbitmask;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _js = require("../utils/js.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
 * @module core/value-types
 */

/**
 * @en
 * Define an BitMask type.
 * @zh
 * 定义一个位掩码类型。
 * @param obj A JavaScript literal object containing BitMask names and values
 * @return The defined BitMask type
 */
function BitMask(obj) {
  if ('__bitmask__' in obj) {
    return obj;
  }

  (0, _js.value)(obj, '__bitmask__', null, true);
  let lastIndex = -1;
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let val = obj[key];

    if (val === -1) {
      val = ++lastIndex;
      obj[key] = val;
    } else if (typeof val === 'number') {
      lastIndex = val;
    } else if (typeof val === 'string' && Number.isInteger(parseFloat(key))) {
      continue;
    }

    const reverseKey = `${val}`;

    if (key !== reverseKey) {
      if ((_internal253Aconstants.EDITOR || _internal253Aconstants.TEST) && reverseKey in obj && obj[reverseKey] !== key) {
        (0, _debug.errorID)(7100, reverseKey);
        continue;
      }

      (0, _js.value)(obj, reverseKey, key);
    }
  }

  return obj;
}

BitMask.isBitMask = BitMaskType => BitMaskType && BitMaskType.hasOwnProperty('__bitmask__');

BitMask.getList = BitMaskDef => {
  if (BitMaskDef.__bitmask__) {
    return BitMaskDef.__bitmask__;
  }

  const bitlist = BitMaskDef.__bitmask__ = [];

  for (const name in BitMaskDef) {
    const v = BitMaskDef[name];

    if (Number.isInteger(v)) {
      bitlist.push({
        name,
        value: v
      });
    }
  }

  bitlist.sort((a, b) => a.value - b.value);
  return bitlist;
};

function ccbitmask(bitmaskx) {
  if ('__bitmask__' in bitmaskx) {
    return;
  }

  (0, _js.value)(bitmaskx, '__bitmask__', null, true);
}

_globalExports.legacyCC.BitMask = BitMask;