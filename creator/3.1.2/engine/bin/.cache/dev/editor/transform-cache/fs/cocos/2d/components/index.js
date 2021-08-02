"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Mask: true,
  RichText: true,
  Sprite: true,
  UIMeshRenderer: true,
  LabelOutline: true,
  Graphics: true,
  UIStaticBatch: true,
  LabelShadow: true,
  UIOpacity: true
};
Object.defineProperty(exports, "Mask", {
  enumerable: true,
  get: function () {
    return _mask.Mask;
  }
});
Object.defineProperty(exports, "RichText", {
  enumerable: true,
  get: function () {
    return _richText.RichText;
  }
});
Object.defineProperty(exports, "Sprite", {
  enumerable: true,
  get: function () {
    return _sprite.Sprite;
  }
});
Object.defineProperty(exports, "UIMeshRenderer", {
  enumerable: true,
  get: function () {
    return _uiMeshRenderer.UIMeshRenderer;
  }
});
Object.defineProperty(exports, "LabelOutline", {
  enumerable: true,
  get: function () {
    return _labelOutline.LabelOutline;
  }
});
Object.defineProperty(exports, "Graphics", {
  enumerable: true,
  get: function () {
    return _graphics.Graphics;
  }
});
Object.defineProperty(exports, "UIStaticBatch", {
  enumerable: true,
  get: function () {
    return _uiStaticBatch.UIStaticBatch;
  }
});
Object.defineProperty(exports, "LabelShadow", {
  enumerable: true,
  get: function () {
    return _labelShadow.LabelShadow;
  }
});
Object.defineProperty(exports, "UIOpacity", {
  enumerable: true,
  get: function () {
    return _uiOpacity.UIOpacity;
  }
});

var _label = require("./label.js");

Object.keys(_label).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _label[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _label[key];
    }
  });
});

var _mask = require("./mask.js");

var _richText = require("./rich-text.js");

var _sprite = require("./sprite.js");

var _uiMeshRenderer = require("./ui-mesh-renderer.js");

var _labelOutline = require("./label-outline.js");

var _graphics = require("./graphics.js");

var _uiStaticBatch = require("./ui-static-batch.js");

var _labelShadow = require("./label-shadow.js");

var _uiOpacity = require("./ui-opacity.js");

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