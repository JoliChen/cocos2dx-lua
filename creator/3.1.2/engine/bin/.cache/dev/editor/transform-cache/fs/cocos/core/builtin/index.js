"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  effects: true
};
Object.defineProperty(exports, "effects", {
  enumerable: true,
  get: function () {
    return _effects.effects;
  }
});

var _builtinResMgr = require("./builtin-res-mgr.js");

Object.keys(_builtinResMgr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _builtinResMgr[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _builtinResMgr[key];
    }
  });
});

var _effects = require("./effects.js");