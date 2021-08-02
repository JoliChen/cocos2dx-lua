"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  DirectionalLight: true,
  Light: true,
  SphereLight: true,
  SpotLight: true
};
Object.defineProperty(exports, "DirectionalLight", {
  enumerable: true,
  get: function () {
    return _directionalLightComponent.DirectionalLight;
  }
});
Object.defineProperty(exports, "Light", {
  enumerable: true,
  get: function () {
    return _lightComponent.Light;
  }
});
Object.defineProperty(exports, "SphereLight", {
  enumerable: true,
  get: function () {
    return _sphereLightComponent.SphereLight;
  }
});
Object.defineProperty(exports, "SpotLight", {
  enumerable: true,
  get: function () {
    return _spotLightComponent.SpotLight;
  }
});

var _directionalLightComponent = require("./directional-light-component.js");

var _lightComponent = require("./light-component.js");

var _sphereLightComponent = require("./sphere-light-component.js");

var _spotLightComponent = require("./spot-light-component.js");

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