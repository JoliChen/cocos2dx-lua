"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MaskComponent", {
  enumerable: true,
  get: function () {
    return _mask.Mask;
  }
});
Object.defineProperty(exports, "LabelComponent", {
  enumerable: true,
  get: function () {
    return _label.Label;
  }
});
Object.defineProperty(exports, "LabelOutlineComponent", {
  enumerable: true,
  get: function () {
    return _labelOutline.LabelOutline;
  }
});
Object.defineProperty(exports, "RichTextComponent", {
  enumerable: true,
  get: function () {
    return _richText.RichText;
  }
});
Object.defineProperty(exports, "SpriteComponent", {
  enumerable: true,
  get: function () {
    return _sprite.Sprite;
  }
});
Object.defineProperty(exports, "UIModelComponent", {
  enumerable: true,
  get: function () {
    return _uiMeshRenderer.UIMeshRenderer;
  }
});
Object.defineProperty(exports, "GraphicsComponent", {
  enumerable: true,
  get: function () {
    return _graphics.Graphics;
  }
});
Object.defineProperty(exports, "UIStaticBatchComponent", {
  enumerable: true,
  get: function () {
    return _uiStaticBatch.UIStaticBatch;
  }
});
Object.defineProperty(exports, "UIOpacityComponent", {
  enumerable: true,
  get: function () {
    return _uiOpacity.UIOpacity;
  }
});

var _mask = require("./mask.js");

var _label = require("./label.js");

var _labelOutline = require("./label-outline.js");

var _richText = require("./rich-text.js");

var _sprite = require("./sprite.js");

var _uiMeshRenderer = require("./ui-mesh-renderer.js");

var _graphics = require("./graphics.js");

var _uiStaticBatch = require("./ui-static-batch.js");

var _uiOpacity = require("./ui-opacity.js");

var _js = require("../../core/utils/js.js");

var _globalExports = require("../../core/global-exports.js");

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
 * @module ui
 */

/**
 * Alias of [[Mask]]
 * @deprecated Since v1.2
 */
_globalExports.legacyCC.MaskComponent = _mask.Mask;

_js.js.setClassAlias(_mask.Mask, 'cc.MaskComponent');
/**
 * Alias of [[Label]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.LabelComponent = _label.Label;

_js.js.setClassAlias(_label.Label, 'cc.LabelComponent');
/**
 * Alias of [[LabelOutline]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.LabelOutlineComponent = _labelOutline.LabelOutline;

_js.js.setClassAlias(_labelOutline.LabelOutline, 'cc.LabelOutlineComponent');
/**
 * Alias of [[RichText]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.RichTextComponent = _richText.RichText;

_js.js.setClassAlias(_richText.RichText, 'cc.RichTextComponent');
/**
 * Alias of [[Sprite]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SpriteComponent = _sprite.Sprite;

_js.js.setClassAlias(_sprite.Sprite, 'cc.SpriteComponent');
/**
 * Alias of [[UIMeshRenderer]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.UIModelComponent = _uiMeshRenderer.UIMeshRenderer;

_js.js.setClassAlias(_uiMeshRenderer.UIMeshRenderer, 'cc.UIModelComponent');
/**
 * Alias of [[Graphics]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.GraphicsComponent = _graphics.Graphics;

_js.js.setClassAlias(_graphics.Graphics, 'cc.GraphicsComponent');
/**
 * Alias of [[UIStaticBatch]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_uiStaticBatch.UIStaticBatch, 'cc.UIStaticBatchComponent');
/**
 * Alias of [[UIOpacity]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_uiOpacity.UIOpacity, 'cc.UIOpacityComponent');