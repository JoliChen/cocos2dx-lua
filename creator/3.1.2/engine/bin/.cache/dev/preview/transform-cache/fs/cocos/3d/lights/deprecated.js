System.register("q-bundled:///fs/cocos/3d/lights/deprecated.js", ["./light-component.js", "./spot-light-component.js", "./sphere-light-component.js", "./directional-light-component.js", "../../core/global-exports.js", "../../core/utils/js.js"], function (_export, _context) {
  "use strict";

  var Light, SpotLight, SphereLight, DirectionalLight, legacyCC, js;
  return {
    setters: [function (_lightComponentJs) {
      Light = _lightComponentJs.Light;
    }, function (_spotLightComponentJs) {
      SpotLight = _spotLightComponentJs.SpotLight;
    }, function (_sphereLightComponentJs) {
      SphereLight = _sphereLightComponentJs.SphereLight;
    }, function (_directionalLightComponentJs) {
      DirectionalLight = _directionalLightComponentJs.DirectionalLight;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs.js;
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
       * @module component
       */

      /**
       * Alias of [[Light]]
       * @deprecated Since v1.2
       */
      _export("LightComponent", Light);

      legacyCC.LightComponent = Light;
      js.setClassAlias(Light, 'cc.LightComponent');
      /**
       * Alias of [[DirectionalLight]]
       * @deprecated Since v1.2
       */

      _export("DirectionalLightComponent", DirectionalLight);

      legacyCC.DirectionalLightComponent = DirectionalLight;
      js.setClassAlias(DirectionalLight, 'cc.DirectionalLightComponent');
      /**
       * Alias of [[SphereLight]]
       * @deprecated Since v1.2
       */

      _export("SphereLightComponent", SphereLight);

      legacyCC.SphereLightComponent = SphereLight;
      js.setClassAlias(SphereLight, 'cc.SphereLightComponent');
      /**
       * Alias of [[SpotLight]]
       * @deprecated Since v1.2
       */

      _export("SpotLightComponent", SpotLight);

      legacyCC.SpotLightComponent = SpotLight;
      js.setClassAlias(SpotLight, 'cc.SpotLightComponent');
    }
  };
});