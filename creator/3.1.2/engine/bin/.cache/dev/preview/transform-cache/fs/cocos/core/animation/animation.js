System.register("q-bundled:///fs/cocos/core/animation/animation.js", ["./target-path.js", "./value-proxy.js", "./value-proxy-factories/uniform.js", "./value-proxy-factories/morph-weights.js", "./cubic-spline-value.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_targetPathJs) {
      var _exportObj = {};

      for (var _key in _targetPathJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _targetPathJs[_key];
      }

      _export(_exportObj);
    }, function (_valueProxyJs) {
      var _exportObj2 = {};

      for (var _key2 in _valueProxyJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _valueProxyJs[_key2];
      }

      _export(_exportObj2);
    }, function (_valueProxyFactoriesUniformJs) {
      _export("UniformProxyFactory", _valueProxyFactoriesUniformJs.UniformProxyFactory);
    }, function (_valueProxyFactoriesMorphWeightsJs) {
      _export({
        MorphWeightsValueProxy: _valueProxyFactoriesMorphWeightsJs.MorphWeightsValueProxy,
        MorphWeightsAllValueProxy: _valueProxyFactoriesMorphWeightsJs.MorphWeightsAllValueProxy
      });
    }, function (_cubicSplineValueJs) {
      var _exportObj3 = {};

      for (var _key3 in _cubicSplineValueJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _cubicSplineValueJs[_key3];
      }

      _export(_exportObj3);
    }],
    execute: function () {}
  };
});