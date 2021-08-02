"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ParticleSystemComponent", {
  enumerable: true,
  get: function () {
    return _particleSystem.ParticleSystem;
  }
});
Object.defineProperty(exports, "BillboardComponent", {
  enumerable: true,
  get: function () {
    return _billboard.Billboard;
  }
});
Object.defineProperty(exports, "LineComponent", {
  enumerable: true,
  get: function () {
    return _line.Line;
  }
});

var _xDeprecated = require("../core/utils/x-deprecated.js");

var _burst = _interopRequireDefault(require("./burst.js"));

var _particleSystem = require("./particle-system.js");

var _billboard = require("./billboard.js");

var _line = require("./line.js");

var _js = require("../core/utils/js.js");

var _globalExports = require("../core/global-exports.js");

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
 * @module particle
 */
(0, _xDeprecated.removeProperty)(_burst.default.prototype, 'Burst.prototype', [{
  name: 'minCount'
}, {
  name: 'maxCount'
}]);
/**
 * Alias of [[ParticleSystem]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.ParticleSystemComponent = _particleSystem.ParticleSystem;

_js.js.setClassAlias(_particleSystem.ParticleSystem, 'cc.ParticleSystemComponent');
/**
 * Alias of [[Billboard]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.BillboardComponent = _billboard.Billboard;

_js.js.setClassAlias(_billboard.Billboard, 'cc.BillboardComponent');
/**
 * Alias of [[Line]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.LineComponent = _line.Line;

_js.js.setClassAlias(_line.Line, 'cc.LineComponent');