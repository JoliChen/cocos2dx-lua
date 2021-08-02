System.register("q-bundled:///fs/cocos/core/gfx/deprecated-3.0.0.js", ["../utils/x-deprecated.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, legacyCC, customMappings, api, deprecated;
  return {
    setters: [function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
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
      // Deprecated CC polyfill
      customMappings = {
        Obj: 'GFXObject',
        DRAW_INFO_SIZE: 'GFX_DRAW_INFO_SIZE',
        DESCRIPTOR_BUFFER_TYPE: '',
        DESCRIPTOR_SAMPLER_TYPE: '',
        DESCRIPTOR_DYNAMIC_TYPE: '',
        getTypedArrayConstructor: ''
      };

      for (api in legacyCC.gfx) {
        if (api === '__esModule') continue;
        deprecated = customMappings[api];

        if (deprecated === '') {
          deprecated = api;
        } else if (deprecated === undefined) {
          deprecated = "GFX" + api;
        } // Deprecation


        replaceProperty(legacyCC, 'cc', [{
          name: deprecated,
          newName: api,
          target: legacyCC.gfx,
          targetName: 'cc.gfx'
        }]);
      }
    }
  };
});