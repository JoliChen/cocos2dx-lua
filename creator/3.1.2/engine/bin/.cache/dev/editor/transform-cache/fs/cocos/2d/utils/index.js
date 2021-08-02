"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  dynamicAtlasManager: true
};
Object.defineProperty(exports, "dynamicAtlasManager", {
  enumerable: true,
  get: function () {
    return _atlasManager.dynamicAtlasManager;
  }
});

require("./font-loader.js");

var _htmlTextParser = require("./html-text-parser.js");

Object.keys(_htmlTextParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _htmlTextParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _htmlTextParser[key];
    }
  });
});

var _textUtils = require("./text-utils.js");

Object.keys(_textUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _textUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textUtils[key];
    }
  });
});

var _atlasManager = require("./dynamic-atlas/atlas-manager.js");