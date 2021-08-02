"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CameraComponent", {
  enumerable: true,
  get: function () {
    return _cameraComponent.Camera;
  }
});

var _cameraComponent = require("./camera-component.js");

var _index = require("../utils/index.js");

var _globalExports = require("../global-exports.js");

var _js = require("../utils/js.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

/* eslint-disable @typescript-eslint/no-unsafe-return */
(0, _index.replaceProperty)(_cameraComponent.Camera, 'Camera', [{
  name: 'CameraClearFlag',
  newName: 'ClearFlag'
}]);
(0, _index.replaceProperty)(_cameraComponent.Camera.prototype, 'Camera.prototype', [{
  name: 'color',
  newName: 'clearColor'
}, {
  name: 'depth',
  newName: 'clearDepth'
}, {
  name: 'stencil',
  newName: 'clearStencil'
}]);
/**
 * Alias of [[Camera]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.CameraComponent = _cameraComponent.Camera;

_js.js.setClassAlias(_cameraComponent.Camera, 'cc.CameraComponent');