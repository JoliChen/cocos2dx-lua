"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../cocos/physics/cocos/instantiate.js");

var _physicsInterface = require("../cocos/physics/framework/physics-interface.js");

Object.keys(_physicsInterface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _physicsInterface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsInterface[key];
    }
  });
});