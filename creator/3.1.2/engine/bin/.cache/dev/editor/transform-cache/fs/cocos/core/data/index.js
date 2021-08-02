"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CCClass", {
  enumerable: true,
  get: function () {
    return _class.CCClass;
  }
});
Object.defineProperty(exports, "CCObject", {
  enumerable: true,
  get: function () {
    return _object.CCObject;
  }
});
Object.defineProperty(exports, "isValid", {
  enumerable: true,
  get: function () {
    return _object.isValid;
  }
});
Object.defineProperty(exports, "deserialize", {
  enumerable: true,
  get: function () {
    return _deserialize.deserialize;
  }
});
Object.defineProperty(exports, "Details", {
  enumerable: true,
  get: function () {
    return _deserialize.Details;
  }
});
Object.defineProperty(exports, "instantiate", {
  enumerable: true,
  get: function () {
    return _instantiate.instantiate;
  }
});
Object.defineProperty(exports, "CCInteger", {
  enumerable: true,
  get: function () {
    return _attribute.CCInteger;
  }
});
Object.defineProperty(exports, "CCFloat", {
  enumerable: true,
  get: function () {
    return _attribute.CCFloat;
  }
});
Object.defineProperty(exports, "CCBoolean", {
  enumerable: true,
  get: function () {
    return _attribute.CCBoolean;
  }
});
Object.defineProperty(exports, "CCString", {
  enumerable: true,
  get: function () {
    return _attribute.CCString;
  }
});
Object.defineProperty(exports, "CompactValueTypeArray", {
  enumerable: true,
  get: function () {
    return _compactValueTypeArray.CompactValueTypeArray;
  }
});
Object.defineProperty(exports, "editorExtrasTag", {
  enumerable: true,
  get: function () {
    return _editorExtrasTag.editorExtrasTag;
  }
});
exports._decorator = void 0;

var _decorator = _interopRequireWildcard(require("./class-decorator.js"));

exports._decorator = _decorator;

var _globalExports = require("../global-exports.js");

var _class = require("./class.js");

var _object = require("./object.js");

var _deserialize = require("./deserialize.js");

var _instantiate = require("./instantiate.js");

var _attribute = require("./utils/attribute.js");

var _compactValueTypeArray = require("./utils/compact-value-type-array.js");

var _editorExtrasTag = require("./editor-extras-tag.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2018-2020 Xiamen Yaji Software Co., Ltd.

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
 * @module core/data
 */
_globalExports.legacyCC._decorator = _decorator;