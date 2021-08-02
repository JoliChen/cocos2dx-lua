"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebViewImpl = void 0;

var _globalExports = require("../core/global-exports.js");

var _webViewEnums = require("./web-view-enums.js");

var _index = require("../2d/framework/index.js");

var _director = require("../core/director.js");

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
 * @module component/web-view
 */
class WebViewImpl {
  // Fix iframe display problem in ios.
  constructor(component) {
    this._componentEventList = new Map();
    this._state = _webViewEnums.EventType.NONE;
    this._warpper = void 0;
    this._webview = null;
    this._loaded = false;
    this._forceUpdate = false;
    this._component = null;
    this._uiTrans = null;
    this._node = null;
    this._w = 0;
    this._h = 0;
    this._m00 = 0;
    this._m01 = 0;
    this._m04 = 0;
    this._m05 = 0;
    this._m12 = 0;
    this._m13 = 0;
    this._component = component;
    this._node = component.node;
    this._uiTrans = component.node.getComponent(_index.UITransform);
    this.reset();
    this.createWebView();
  }

  reset() {
    this._warpper = null;
    this._webview = null;
    this._loaded = false;
    this._w = 0;
    this._h = 0;
    this._m00 = 0;
    this._m01 = 0;
    this._m04 = 0;
    this._m05 = 0;
    this._m12 = 0;
    this._m13 = 0;
    this._state = _webViewEnums.EventType.NONE;
    this._forceUpdate = false;
  }

  get loaded() {
    return this._loaded;
  }

  get componentEventList() {
    return this._componentEventList;
  }

  get webview() {
    return this._webview;
  }

  get state() {
    return this._state;
  }

  get UICamera() {
    return _director.director.root.batcher2D.getFirstRenderCamera(this._node);
  }

  dispatchEvent(key, ...args) {
    const callback = this._componentEventList.get(key);

    if (callback) {
      this._state = key;
      callback.call(this, args);
    }
  }

  destroy() {
    this.removeWebView();
    this._warpper = null;
    this._webview = null;
    this._loaded = false;
    this._component = null;
    this._uiTrans = null;
    this._forceUpdate = false;

    this._componentEventList.clear();
  }

}

exports.WebViewImpl = WebViewImpl;
_globalExports.legacyCC.internal.WebViewImpl = WebViewImpl;