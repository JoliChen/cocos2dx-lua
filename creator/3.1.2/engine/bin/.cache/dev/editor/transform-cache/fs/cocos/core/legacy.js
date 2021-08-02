"use strict";

var debug = _interopRequireWildcard(require("./platform/debug.js"));

var _path = require("./utils/path.js");

var _globalExports = require("./global-exports.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
// CCDebug.js
_globalExports.legacyCC.log = debug.log;
_globalExports.legacyCC.warn = debug.warn;
_globalExports.legacyCC.error = debug.error;
_globalExports.legacyCC.assert = debug.assert;
_globalExports.legacyCC._throw = debug._throw;
_globalExports.legacyCC.logID = debug.logID;
_globalExports.legacyCC.warnID = debug.warnID;
_globalExports.legacyCC.errorID = debug.errorID;
_globalExports.legacyCC.assertID = debug.assertID;
_globalExports.legacyCC.debug = debug; // path.js

_globalExports.legacyCC.path = {
  join: _path.join,
  extname: _path.extname,
  mainFileName: _path.mainFileName,
  basename: _path.basename,
  dirname: _path.dirname,
  changeExtname: _path.changeExtname,
  changeBasename: _path.changeBasename,
  _normalize: _path._normalize,
  stripSep: _path.stripSep,

  get sep() {
    return (0, _path.getSeperator)();
  }

};