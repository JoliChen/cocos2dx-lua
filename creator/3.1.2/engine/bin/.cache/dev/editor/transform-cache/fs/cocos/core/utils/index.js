"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  js: true,
  misc: true,
  path: true,
  PrefabLink: true
};
Object.defineProperty(exports, "PrefabLink", {
  enumerable: true,
  get: function () {
    return _prefabLink.PrefabLink;
  }
});
exports.path = exports.misc = exports.js = void 0;

var js = _interopRequireWildcard(require("./js.js"));

exports.js = js;

var misc = _interopRequireWildcard(require("./misc.js"));

exports.misc = misc;

var path = _interopRequireWildcard(require("./path.js"));

exports.path = path;

var _xDeprecated = require("./x-deprecated.js");

Object.keys(_xDeprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _xDeprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xDeprecated[key];
    }
  });
});

var _murmurhash2_gc = require("./murmurhash2_gc.js");

Object.keys(_murmurhash2_gc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _murmurhash2_gc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _murmurhash2_gc[key];
    }
  });
});

var _prefabLink = require("./prefab-link.js");

var _coordinatesConvertsUtils = require("./coordinates-converts-utils.js");

Object.keys(_coordinatesConvertsUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _coordinatesConvertsUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _coordinatesConvertsUtils[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }