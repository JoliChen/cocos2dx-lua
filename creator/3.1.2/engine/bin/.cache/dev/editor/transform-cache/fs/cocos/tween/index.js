"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TweenSystem: true,
  tween: true,
  tweenUtil: true,
  Tween: true
};
Object.defineProperty(exports, "TweenSystem", {
  enumerable: true,
  get: function () {
    return _tweenSystem.TweenSystem;
  }
});
Object.defineProperty(exports, "tween", {
  enumerable: true,
  get: function () {
    return _tween.tween;
  }
});
Object.defineProperty(exports, "tweenUtil", {
  enumerable: true,
  get: function () {
    return _tween.tweenUtil;
  }
});
Object.defineProperty(exports, "Tween", {
  enumerable: true,
  get: function () {
    return _tween.Tween;
  }
});

var _tweenSystem = require("./tween-system.js");

var _tween = require("./tween.js");

var _exportApi = require("./export-api.js");

Object.keys(_exportApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _exportApi[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _exportApi[key];
    }
  });
});