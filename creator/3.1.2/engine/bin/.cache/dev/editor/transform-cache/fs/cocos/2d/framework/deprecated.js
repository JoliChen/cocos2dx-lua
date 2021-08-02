"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UITransformComponent", {
  enumerable: true,
  get: function () {
    return _uiTransform.UITransform;
  }
});
Object.defineProperty(exports, "RenderComponent", {
  enumerable: true,
  get: function () {
    return _renderable2d.Renderable2D;
  }
});
Object.defineProperty(exports, "UIRenderable", {
  enumerable: true,
  get: function () {
    return _renderable2d.Renderable2D;
  }
});
Object.defineProperty(exports, "CanvasComponent", {
  enumerable: true,
  get: function () {
    return _canvas.Canvas;
  }
});

var _index = require("../../core/utils/index.js");

var _uiComponent = require("./ui-component.js");

var _uiTransform = require("./ui-transform.js");

var _renderable2d = require("./renderable-2d.js");

var _canvas = require("./canvas.js");

var _js = require("../../core/utils/js.js");

var _globalExports = require("../../core/global-exports.js");

var _color = require("../../core/math/color.js");

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

/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * @packageDocumentation
 * @module ui
 */
(0, _index.removeProperty)(_uiComponent.UIComponent.prototype, 'UIComponent', [{
  name: '_visibility'
}, {
  name: 'setVisibility'
}]);
(0, _index.replaceProperty)(_canvas.Canvas.prototype, 'Canvas.prototype', [{
  name: 'camera',
  newName: 'cameraComponent.camera',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent.camera;
  }

}, {
  name: 'clearFlag',
  newName: 'cameraComponent.clearFlags',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent ? this._cameraComponent.clearFlags : 0;
  },

  customSetter(val) {
    // @ts-expect-error deprecation method
    if (this._cameraComponent) this._cameraComponent.clearFlags = val;
  }

}, {
  name: 'color',
  newName: 'cameraComponent.clearColor',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent ? this._cameraComponent.clearColor : _color.Color.BLACK;
  },

  customSetter(val) {
    // @ts-expect-error deprecation method
    if (this._cameraComponent) this._cameraComponent.clearColor = val;
  }

}, {
  name: 'priority',
  newName: 'cameraComponent.priority',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent ? this._cameraComponent.priority : 0;
  },

  customSetter(val) {
    // @ts-expect-error deprecation method
    if (this._cameraComponent) this._cameraComponent.priority = val;
  }

}, {
  name: 'targetTexture',
  newName: 'cameraComponent.targetTexture',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent ? this._cameraComponent.targetTexture : null;
  },

  customSetter(value) {
    // @ts-expect-error deprecation method
    if (this._cameraComponent) this._cameraComponent.targetTexture = value;
  }

}, {
  name: 'visibility',
  newName: 'cameraComponent.visibility',

  customGetter() {
    // @ts-expect-error deprecation method
    return this._cameraComponent ? this._cameraComponent.visibility : 0;
  }

}]);
(0, _index.markAsWarning)(_renderable2d.Renderable2D.prototype, 'Renderable2D.prototype', [{
  name: 'srcBlendFactor',
  suggest: 'Please use a custom material to specify blending options instead.'
}, {
  name: 'dstBlendFactor',
  suggest: 'Please use a custom material to specify blending options instead.'
}]);
(0, _index.markAsWarning)(_uiTransform.UITransform.prototype, 'UITransform.prototype', [{
  name: 'priority',
  suggest: `Please use setSiblingIndex to change index of the current node in its parent's children array.`
}]);
/**
 * Alias of [[UITransform]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.UITransformComponent = _uiTransform.UITransform;

_js.js.setClassAlias(_uiTransform.UITransform, 'cc.UITransformComponent');
/**
 * Alias of [[Renderable2D]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_renderable2d.Renderable2D, 'cc.RenderComponent');
/**
 * Alias of [[Canvas]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.CanvasComponent = _canvas.Canvas;

_js.js.setClassAlias(_canvas.Canvas, 'cc.CanvasComponent');