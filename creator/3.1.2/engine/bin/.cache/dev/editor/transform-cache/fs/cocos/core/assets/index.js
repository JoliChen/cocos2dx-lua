"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Asset: true,
  BufferAsset: true,
  Prefab: true,
  RenderingSubMesh: true,
  SceneAsset: true,
  TextAsset: true,
  JsonAsset: true,
  ImageAsset: true,
  Texture2D: true,
  TextureCube: true,
  EffectAsset: true,
  Material: true,
  RenderTexture: true
};
Object.defineProperty(exports, "Asset", {
  enumerable: true,
  get: function () {
    return _asset.Asset;
  }
});
Object.defineProperty(exports, "BufferAsset", {
  enumerable: true,
  get: function () {
    return _bufferAsset.BufferAsset;
  }
});
Object.defineProperty(exports, "Prefab", {
  enumerable: true,
  get: function () {
    return _prefab.default;
  }
});
Object.defineProperty(exports, "RenderingSubMesh", {
  enumerable: true,
  get: function () {
    return _renderingSubMesh.RenderingSubMesh;
  }
});
Object.defineProperty(exports, "SceneAsset", {
  enumerable: true,
  get: function () {
    return _sceneAsset.default;
  }
});
Object.defineProperty(exports, "TextAsset", {
  enumerable: true,
  get: function () {
    return _textAsset.default;
  }
});
Object.defineProperty(exports, "JsonAsset", {
  enumerable: true,
  get: function () {
    return _jsonAsset.default;
  }
});
Object.defineProperty(exports, "ImageAsset", {
  enumerable: true,
  get: function () {
    return _imageAsset.ImageAsset;
  }
});
Object.defineProperty(exports, "Texture2D", {
  enumerable: true,
  get: function () {
    return _texture2d.Texture2D;
  }
});
Object.defineProperty(exports, "TextureCube", {
  enumerable: true,
  get: function () {
    return _textureCube.TextureCube;
  }
});
Object.defineProperty(exports, "EffectAsset", {
  enumerable: true,
  get: function () {
    return _effectAsset.EffectAsset;
  }
});
Object.defineProperty(exports, "Material", {
  enumerable: true,
  get: function () {
    return _material.Material;
  }
});
Object.defineProperty(exports, "RenderTexture", {
  enumerable: true,
  get: function () {
    return _renderTexture.RenderTexture;
  }
});

require("./deprecation.js");

var _asset = require("./asset.js");

var _bufferAsset = require("./buffer-asset.js");

var _prefab = _interopRequireDefault(require("./prefab.js"));

var _scripts = require("./scripts.js");

Object.keys(_scripts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scripts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scripts[key];
    }
  });
});

var _renderingSubMesh = require("./rendering-sub-mesh.js");

var _sceneAsset = _interopRequireDefault(require("./scene-asset.js"));

var _textAsset = _interopRequireDefault(require("./text-asset.js"));

var _jsonAsset = _interopRequireDefault(require("./json-asset.js"));

var _imageAsset = require("./image-asset.js");

var _texture2d = require("./texture-2d.js");

var _textureCube = require("./texture-cube.js");

var _effectAsset = require("./effect-asset.js");

var _material = require("./material.js");

var _renderTexture = require("./render-texture.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }