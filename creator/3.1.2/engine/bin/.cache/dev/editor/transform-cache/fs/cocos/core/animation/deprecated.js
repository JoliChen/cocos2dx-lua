"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AnimationComponent", {
  enumerable: true,
  get: function () {
    return _animationComponent.Animation;
  }
});

var _xDeprecated = require("../utils/x-deprecated.js");

var _animationComponent = require("./animation-component.js");

var _js = require("../utils/js.js");

var _globalExports = require("../global-exports.js");

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
 * @module animation
 */
// deprecated
(0, _xDeprecated.replaceProperty)(_animationComponent.Animation.prototype, 'Animation', [{
  name: 'getAnimationState',
  newName: 'getState'
}, {
  name: 'addClip',
  newName: 'createState'
}, {
  name: 'removeClip',
  newName: 'removeState',

  customFunction(...args) {
    const arg0 = args[0];
    return _animationComponent.Animation.prototype.removeState.call(this, arg0.name);
  }

}]);
/**
 * Alias of [[Animation]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.AnimationComponent = _animationComponent.Animation;

_js.js.setClassAlias(_animationComponent.Animation, 'cc.AnimationComponent');