"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaselineOffset = getBaselineOffset;
exports.isUnicodeCJK = isUnicodeCJK;
exports.isUnicodeSpace = isUnicodeSpace;
exports.safeMeasureText = safeMeasureText;
exports.fragmentText = fragmentText;
exports.MIDDLE_RATIO = exports.BASELINE_RATIO = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _pool = _interopRequireDefault(require("../../core/utils/pool.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
const BASELINE_RATIO = 0.26;
exports.BASELINE_RATIO = BASELINE_RATIO;
let _BASELINE_OFFSET = 0;

if (_internal253Aconstants.RUNTIME_BASED) {
  _BASELINE_OFFSET = BASELINE_RATIO * 2 / 3;
}

const MIDDLE_RATIO = (BASELINE_RATIO + 1) / 2 - BASELINE_RATIO;
exports.MIDDLE_RATIO = MIDDLE_RATIO;

function getBaselineOffset() {
  return _BASELINE_OFFSET;
}

const MAX_CACHE_SIZE = 100;
const pool = new _pool.default(2);

pool.get = function () {
  return this._get() || {
    key: '',
    value: 0,
    prev: null,
    next: null
  };
};

class LRUCache {
  constructor(size) {
    this.count = 0;
    this.limit = 0;
    this.datas = {};
    this.limit = size;
  }

  moveToHead(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
    this.count++;
    this.datas[node.key] = node;
  }

  put(key, value) {
    const node = pool.get();
    node.key = key;
    node.value = value;

    if (this.count >= this.limit) {
      const discard = this.tail;
      delete this.datas[discard.key];
      this.count--;
      this.tail = discard.prev;
      this.tail.next = null;
      discard.prev = null;
      discard.next = null;
      pool.put(discard);
    }

    this.moveToHead(node);
  }

  remove(node) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    delete this.datas[node.key];
    this.count--;
  }

  get(key) {
    const node = this.datas[key];

    if (node) {
      this.remove(node);
      this.moveToHead(node);
      return node.value;
    }

    return null;
  }

  clear() {
    this.count = 0;
    this.datas = {};
    this.head = null;
    this.tail = null;
  }

  has(key) {
    return !!this.datas[key];
  }

  delete(key) {
    const node = this.datas[key];
    this.remove(node);
  }

}

const measureCache = new LRUCache(MAX_CACHE_SIZE);
const WORD_REG = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/; // eslint-disable-next-line no-useless-escape

const SYMBOL_REG = /^[!,.:;'}\]%\?>、‘“》？。，！]/;
const LAST_WORD_REG = /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/;
const LAST_ENGLISH_REG = /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/;
const FIRST_ENGLISH_REG = /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/;
const WRAP_INSPECTION = true; // The unicode standard will never assign a character from code point 0xD800 to 0xDFFF
// high surrogate (0xD800-0xDBFF) and low surrogate(0xDC00-0xDFFF) combines to a character on the Supplementary Multilingual Plane
// reference: https://en.wikipedia.org/wiki/UTF-16

const highSurrogateRex = /[\uD800-\uDBFF]/;
const lowSurrogateRex = /[\uDC00-\uDFFF]/;

function isUnicodeCJK(ch) {
  const __CHINESE_REG = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;
  const __JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
  const __KOREAN_REG = /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/;
  return __CHINESE_REG.test(ch) || __JAPANESE_REG.test(ch) || __KOREAN_REG.test(ch);
} // Checking whether the character is a whitespace


function isUnicodeSpace(ch) {
  const chCode = ch.charCodeAt(0);
  return chCode >= 9 && chCode <= 13 || chCode === 32 || chCode === 133 || chCode === 160 || chCode === 5760 || chCode >= 8192 && chCode <= 8202 || chCode === 8232 || chCode === 8233 || chCode === 8239 || chCode === 8287 || chCode === 12288;
}

function safeMeasureText(ctx, string, desc) {
  const font = desc || ctx.font;
  const key = `${font}\uD83C\uDFAE${string}`;
  const cache = measureCache.get(key);

  if (cache !== null) {
    return cache;
  }

  const metric = ctx.measureText(string);
  const width = metric && metric.width || 0;
  measureCache.put(key, width);
  return width;
} // in case truncate a character on the Supplementary Multilingual Plane
// test case: a = '😉🚗'
// _safeSubstring(a, 1) === '😉🚗'
// _safeSubstring(a, 0, 1) === '😉'
// _safeSubstring(a, 0, 2) === '😉'
// _safeSubstring(a, 0, 3) === '😉'
// _safeSubstring(a, 0, 4) === '😉🚗'
// _safeSubstring(a, 1, 2) === _safeSubstring(a, 1, 3) === '😉'
// _safeSubstring(a, 2, 3) === _safeSubstring(a, 2, 4) === '🚗'


function _safeSubstring(targetString, startIndex, endIndex) {
  let newStartIndex = startIndex;
  let newEndIndex = endIndex;
  const startChar = targetString[startIndex]; // lowSurrogateRex

  if (startChar >= '\uDC00' && startChar <= '\uDFFF') {
    newStartIndex--;
  }

  if (endIndex !== undefined) {
    if (endIndex - 1 !== startIndex) {
      const endChar = targetString[endIndex - 1]; // highSurrogateRex

      if (endChar >= '\uD800' && endChar <= '\uDBFF') {
        newEndIndex--;
      }
    } else if (startChar >= '\uD800' && startChar <= '\uDBFF') {
      // highSurrogateRex
      newEndIndex++;
    }
  }

  return targetString.substring(newStartIndex, newEndIndex);
}

function fragmentText(stringToken, allWidth, maxWidth, measureText) {
  // check the first character
  const wrappedWords = []; // fast return if strArr is empty

  if (stringToken.length === 0 || maxWidth < 0) {
    wrappedWords.push('');
    return wrappedWords;
  }

  let text = stringToken;

  while (allWidth > maxWidth && text.length > 1) {
    let fuzzyLen = text.length * (maxWidth / allWidth) | 0;

    let tmpText = _safeSubstring(text, fuzzyLen);

    let width = allWidth - measureText(tmpText);
    let sLine = tmpText;
    let pushNum = 0;
    let checkWhile = 0;
    const checkCount = 10; // Exceeded the size

    while (width > maxWidth && checkWhile++ < checkCount) {
      fuzzyLen *= maxWidth / width;
      fuzzyLen |= 0;
      tmpText = _safeSubstring(text, fuzzyLen);
      width = allWidth - measureText(tmpText);
    }

    checkWhile = 0; // Find the truncation point

    while (width <= maxWidth && checkWhile++ < checkCount) {
      if (tmpText) {
        const exec = WORD_REG.exec(tmpText);
        pushNum = exec ? exec[0].length : 1;
        sLine = tmpText;
      }

      fuzzyLen += pushNum;
      tmpText = _safeSubstring(text, fuzzyLen);
      width = allWidth - measureText(tmpText);
    }

    fuzzyLen -= pushNum; // in case maxWidth cannot contain any characters, need at least one character per line

    if (fuzzyLen === 0) {
      fuzzyLen = 1;
      sLine = _safeSubstring(text, 1);
    } else if (fuzzyLen === 1 && text[0] >= '\uD800' && text[0] <= '\uDBFF') {
      // highSurrogateRex
      fuzzyLen = 2;
      sLine = _safeSubstring(text, 2);
    }

    let sText = _safeSubstring(text, 0, fuzzyLen);

    let result; // symbol in the first

    if (WRAP_INSPECTION) {
      if (SYMBOL_REG.test(sLine || tmpText)) {
        result = LAST_WORD_REG.exec(sText);
        fuzzyLen -= result ? result[0].length : 0;

        if (fuzzyLen === 0) {
          fuzzyLen = 1;
        }

        sLine = _safeSubstring(text, fuzzyLen);
        sText = _safeSubstring(text, 0, fuzzyLen);
      }
    } // To judge whether a English words are truncated


    if (FIRST_ENGLISH_REG.test(sLine)) {
      result = LAST_ENGLISH_REG.exec(sText);

      if (result && sText !== result[0]) {
        fuzzyLen -= result[0].length;
        sLine = _safeSubstring(text, fuzzyLen);
        sText = _safeSubstring(text, 0, fuzzyLen);
      }
    } // The first line And do not wrap should not remove the space


    if (wrappedWords.length === 0) {
      wrappedWords.push(sText);
    } else {
      sText = sText.trim();

      if (sText.length > 0) {
        wrappedWords.push(sText);
      }
    }

    text = sLine || tmpText;
    allWidth = measureText(text);
  }

  if (wrappedWords.length === 0) {
    wrappedWords.push(text);
  } else {
    text = text.trim();

    if (text.length > 0) {
      wrappedWords.push(text);
    }
  }

  return wrappedWords;
}