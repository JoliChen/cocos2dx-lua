"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Billboard: true,
  Line: true,
  ParticleSystem: true,
  ParticleUtils: true,
  CurveRange: true,
  GradientRange: true,
  Gradient: true,
  AlphaKey: true,
  ColorKey: true,
  Burst: true
};
Object.defineProperty(exports, "Billboard", {
  enumerable: true,
  get: function () {
    return _billboard.Billboard;
  }
});
Object.defineProperty(exports, "Line", {
  enumerable: true,
  get: function () {
    return _line.Line;
  }
});
Object.defineProperty(exports, "ParticleSystem", {
  enumerable: true,
  get: function () {
    return _particleSystem.ParticleSystem;
  }
});
Object.defineProperty(exports, "ParticleUtils", {
  enumerable: true,
  get: function () {
    return _particleUtils.ParticleUtils;
  }
});
Object.defineProperty(exports, "CurveRange", {
  enumerable: true,
  get: function () {
    return _curveRange.default;
  }
});
Object.defineProperty(exports, "GradientRange", {
  enumerable: true,
  get: function () {
    return _gradientRange.default;
  }
});
Object.defineProperty(exports, "Gradient", {
  enumerable: true,
  get: function () {
    return _gradient.default;
  }
});
Object.defineProperty(exports, "AlphaKey", {
  enumerable: true,
  get: function () {
    return _gradient.AlphaKey;
  }
});
Object.defineProperty(exports, "ColorKey", {
  enumerable: true,
  get: function () {
    return _gradient.ColorKey;
  }
});
Object.defineProperty(exports, "Burst", {
  enumerable: true,
  get: function () {
    return _burst.default;
  }
});

var _billboard = require("./billboard.js");

var _line = require("./line.js");

var _particleSystem = require("./particle-system.js");

var _particleUtils = require("./particle-utils.js");

var _curveRange = _interopRequireDefault(require("./animator/curve-range.js"));

var _globalExports = require("../core/global-exports.js");

var _gradientRange = _interopRequireDefault(require("./animator/gradient-range.js"));

var _gradient = _interopRequireWildcard(require("./animator/gradient.js"));

var _burst = _interopRequireDefault(require("./burst.js"));

var _deprecated = require("./deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
_globalExports.legacyCC.ParticleUtils = _particleUtils.ParticleUtils;