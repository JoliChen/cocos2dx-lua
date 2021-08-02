"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultConstants = require("../fs/cocos/core/default-constants.js");

Object.keys(_defaultConstants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _defaultConstants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _defaultConstants[key];
    }
  });
});