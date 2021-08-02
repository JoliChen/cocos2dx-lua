"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  UniformProxyFactory: true,
  MorphWeightsValueProxy: true,
  MorphWeightsAllValueProxy: true
};
Object.defineProperty(exports, "UniformProxyFactory", {
  enumerable: true,
  get: function () {
    return _uniform.UniformProxyFactory;
  }
});
Object.defineProperty(exports, "MorphWeightsValueProxy", {
  enumerable: true,
  get: function () {
    return _morphWeights.MorphWeightsValueProxy;
  }
});
Object.defineProperty(exports, "MorphWeightsAllValueProxy", {
  enumerable: true,
  get: function () {
    return _morphWeights.MorphWeightsAllValueProxy;
  }
});

var _targetPath = require("./target-path.js");

Object.keys(_targetPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _targetPath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _targetPath[key];
    }
  });
});

var _valueProxy = require("./value-proxy.js");

Object.keys(_valueProxy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _valueProxy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _valueProxy[key];
    }
  });
});

var _uniform = require("./value-proxy-factories/uniform.js");

var _morphWeights = require("./value-proxy-factories/morph-weights.js");

var _cubicSplineValue = require("./cubic-spline-value.js");

Object.keys(_cubicSplineValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cubicSplineValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cubicSplineValue[key];
    }
  });
});