"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _macro = require("../../cocos/core/platform/macro.js");

Object.keys(_macro).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _macro[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _macro[key];
    }
  });
});