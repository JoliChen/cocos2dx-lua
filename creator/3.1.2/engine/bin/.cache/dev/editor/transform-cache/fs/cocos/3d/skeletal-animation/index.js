"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./data-pool-manager.js");

var _skeletalAnimationDataHub = require("./skeletal-animation-data-hub.js");

Object.keys(_skeletalAnimationDataHub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _skeletalAnimationDataHub[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletalAnimationDataHub[key];
    }
  });
});

var _skeletalAnimationState = require("./skeletal-animation-state.js");

Object.keys(_skeletalAnimationState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _skeletalAnimationState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletalAnimationState[key];
    }
  });
});

var _skeletalAnimation = require("./skeletal-animation.js");

Object.keys(_skeletalAnimation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _skeletalAnimation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _skeletalAnimation[key];
    }
  });
});

var _deprecated = require("./deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});