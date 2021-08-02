System.register("q-bundled:///fs/cocos/particle/index.js", ["./billboard.js", "./line.js", "./particle-system.js", "./particle-utils.js", "./animator/curve-range.js", "../core/global-exports.js", "./animator/gradient-range.js", "./animator/gradient.js", "./burst.js", "./deprecated.js"], function (_export, _context) {
  "use strict";

  var Billboard, Line, ParticleSystem, ParticleUtils, CurveRange, legacyCC, GradientRange, Gradient, AlphaKey, ColorKey, Burst;
  return {
    setters: [function (_billboardJs) {
      Billboard = _billboardJs.Billboard;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }, function (_particleSystemJs) {
      ParticleSystem = _particleSystemJs.ParticleSystem;
    }, function (_particleUtilsJs) {
      ParticleUtils = _particleUtilsJs.ParticleUtils;
    }, function (_animatorCurveRangeJs) {
      CurveRange = _animatorCurveRangeJs.default;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_animatorGradientRangeJs) {
      GradientRange = _animatorGradientRangeJs.default;
    }, function (_animatorGradientJs) {
      Gradient = _animatorGradientJs.default;
      AlphaKey = _animatorGradientJs.AlphaKey;
      ColorKey = _animatorGradientJs.ColorKey;
    }, function (_burstJs) {
      Burst = _burstJs.default;
    }, function (_deprecatedJs) {
      var _exportObj = {};

      for (var _key in _deprecatedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _deprecatedJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @hidden
       */
      _export("Billboard", Billboard);

      _export("Line", Line);

      _export("ParticleSystem", ParticleSystem);

      _export("ParticleUtils", ParticleUtils);

      _export("CurveRange", CurveRange);

      _export("GradientRange", GradientRange);

      _export("Gradient", Gradient);

      _export("AlphaKey", AlphaKey);

      _export("ColorKey", ColorKey);

      _export("Burst", Burst);

      legacyCC.ParticleUtils = ParticleUtils;
    }
  };
});