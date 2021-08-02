"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  assetManager: true,
  AssetManager: true,
  resources: true
};
Object.defineProperty(exports, "assetManager", {
  enumerable: true,
  get: function () {
    return _assetManager.default;
  }
});
Object.defineProperty(exports, "AssetManager", {
  enumerable: true,
  get: function () {
    return _assetManager.AssetManager;
  }
});
Object.defineProperty(exports, "resources", {
  enumerable: true,
  get: function () {
    return _bundle.resources;
  }
});

var _assetManager = _interopRequireWildcard(require("./asset-manager.js"));

var _bundle = require("./bundle.js");

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