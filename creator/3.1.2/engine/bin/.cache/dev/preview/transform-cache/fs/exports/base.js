System.register("q-bundled:///fs/exports/base.js", ["../cocos/core/global-exports.js", "../predefine.js", "../cocos/core/legacy.js", "../cocos/core/renderer/index.js", "../cocos/core/index.js", "../extensions/ccpool/node-pool.js"], function (_export, _context) {
  "use strict";

  var legacyCC, renderer;
  return {
    setters: [function (_cocosCoreGlobalExportsJs) {
      legacyCC = _cocosCoreGlobalExportsJs.legacyCC;
    }, function (_predefineJs) {}, function (_cocosCoreLegacyJs) {}, function (_cocosCoreRendererIndexJs) {
      renderer = _cocosCoreRendererIndexJs;
    }, function (_cocosCoreIndexJs) {
      var _exportObj = {};

      for (var _key in _cocosCoreIndexJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _cocosCoreIndexJs[_key];
      }

      _export(_exportObj);
    }, function (_extensionsCcpoolNodePoolJs) {
      var _exportObj2 = {};

      for (var _key2 in _extensionsCcpoolNodePoolJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _extensionsCcpoolNodePoolJs[_key2];
      }

      _export(_exportObj2);
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
      // has to import predefines first
      // tslint:disable-next-line: ordered-imports
      // LOAD ENGINE CORE
      _export("renderer", renderer);

      legacyCC.renderer = renderer;

      _export("cclegacy", legacyCC);
    }
  };
});