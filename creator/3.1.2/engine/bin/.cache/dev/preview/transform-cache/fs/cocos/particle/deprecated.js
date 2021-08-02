System.register("q-bundled:///fs/cocos/particle/deprecated.js", ["../core/utils/x-deprecated.js", "./burst.js", "./particle-system.js", "./billboard.js", "./line.js", "../core/utils/js.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var removeProperty, Burst, ParticleSystem, Billboard, Line, js, legacyCC;
  return {
    setters: [function (_coreUtilsXDeprecatedJs) {
      removeProperty = _coreUtilsXDeprecatedJs.removeProperty;
    }, function (_burstJs) {
      Burst = _burstJs.default;
    }, function (_particleSystemJs) {
      ParticleSystem = _particleSystemJs.ParticleSystem;
    }, function (_billboardJs) {
      Billboard = _billboardJs.Billboard;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
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
       * @module particle
       */
      removeProperty(Burst.prototype, 'Burst.prototype', [{
        name: 'minCount'
      }, {
        name: 'maxCount'
      }]);
      /**
       * Alias of [[ParticleSystem]]
       * @deprecated Since v1.2
       */

      _export("ParticleSystemComponent", ParticleSystem);

      legacyCC.ParticleSystemComponent = ParticleSystem;
      js.setClassAlias(ParticleSystem, 'cc.ParticleSystemComponent');
      /**
       * Alias of [[Billboard]]
       * @deprecated Since v1.2
       */

      _export("BillboardComponent", Billboard);

      legacyCC.BillboardComponent = Billboard;
      js.setClassAlias(Billboard, 'cc.BillboardComponent');
      /**
       * Alias of [[Line]]
       * @deprecated Since v1.2
       */

      _export("LineComponent", Line);

      legacyCC.LineComponent = Line;
      js.setClassAlias(Line, 'cc.LineComponent');
    }
  };
});