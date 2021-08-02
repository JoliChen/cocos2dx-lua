"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  VERSION: true,
  geometry: true,
  math: true,
  memop: true,
  gfx: true
};
Object.defineProperty(exports, "VERSION", {
  enumerable: true,
  get: function () {
    return _globalExports.VERSION;
  }
});
exports.gfx = exports.memop = exports.math = exports.geometry = void 0;

var _globalExports = require("./global-exports.js");

var geometry = _interopRequireWildcard(require("./geometry/index.js"));

exports.geometry = geometry;

var math = _interopRequireWildcard(require("./math/index.js"));

exports.math = math;
Object.keys(math).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === math[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return math[key];
    }
  });
});

var memop = _interopRequireWildcard(require("./memop/index.js"));

exports.memop = memop;
Object.keys(memop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === memop[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return memop[key];
    }
  });
});

var gfx = _interopRequireWildcard(require("./gfx/index.js"));

exports.gfx = gfx;

require("./splash-screen.js");

require("./deprecated.js");

var _index5 = require("./value-types/index.js");

Object.keys(_index5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index5[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index5[key];
    }
  });
});

var _index6 = require("./utils/index.js");

Object.keys(_index6).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index6[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index6[key];
    }
  });
});

var _index7 = require("./data/index.js");

Object.keys(_index7).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index7[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index7[key];
    }
  });
});

var _index8 = require("./event/index.js");

Object.keys(_index8).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index8[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index8[key];
    }
  });
});

var _index9 = require("./assets/index.js");

Object.keys(_index9).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index9[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index9[key];
    }
  });
});

var _index10 = require("./platform/index.js");

Object.keys(_index10).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index10[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index10[key];
    }
  });
});

var _game = require("./game.js");

Object.keys(_game).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _game[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _game[key];
    }
  });
});

var _scheduler = require("./scheduler.js");

Object.keys(_scheduler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scheduler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scheduler[key];
    }
  });
});

var _director = require("./director.js");

Object.keys(_director).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _director[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _director[key];
    }
  });
});

var _deprecated2 = require("./gfx/deprecated-3.0.0.js");

Object.keys(_deprecated2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated2[key];
    }
  });
});

var _index11 = require("./pipeline/index.js");

Object.keys(_index11).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index11[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index11[key];
    }
  });
});

var _index12 = require("./asset-manager/index.js");

Object.keys(_index12).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index12[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index12[key];
    }
  });
});

var _index13 = require("./scene-graph/index.js");

Object.keys(_index13).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index13[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index13[key];
    }
  });
});

var _index14 = require("./components/index.js");

Object.keys(_index14).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index14[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index14[key];
    }
  });
});

var _index15 = require("./builtin/index.js");

Object.keys(_index15).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index15[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index15[key];
    }
  });
});

var _index16 = require("./animation/index.js");

Object.keys(_index16).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index16[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index16[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @module core
 */
_globalExports.legacyCC.math = math;
_globalExports.legacyCC.geometry = geometry;