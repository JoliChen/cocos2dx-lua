"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _profiler = require("../cocos/profiler/profiler.js");

Object.keys(_profiler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _profiler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _profiler[key];
    }
  });
});