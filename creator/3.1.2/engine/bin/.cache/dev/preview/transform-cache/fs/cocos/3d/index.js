System.register("q-bundled:///fs/cocos/3d/index.js", ["./misc/index.js", "../core/global-exports.js", "./misc/batch-utils.js", "./assets/index.js", "./framework/index.js", "./lights/index.js", "./skinned-mesh-renderer/index.js", "./skeletal-animation/index.js"], function (_export, _context) {
  "use strict";

  var utils, legacyCC;
  return {
    setters: [function (_miscIndexJs) {
      utils = _miscIndexJs;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_miscBatchUtilsJs) {
      var _exportObj = {};

      for (var _key in _miscBatchUtilsJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _miscBatchUtilsJs[_key];
      }

      _export(_exportObj);
    }, function (_assetsIndexJs) {
      var _exportObj2 = {};

      for (var _key2 in _assetsIndexJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _assetsIndexJs[_key2];
      }

      _export(_exportObj2);
    }, function (_frameworkIndexJs) {
      var _exportObj3 = {};

      for (var _key3 in _frameworkIndexJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _frameworkIndexJs[_key3];
      }

      _export(_exportObj3);
    }, function (_lightsIndexJs) {
      var _exportObj4 = {};

      for (var _key4 in _lightsIndexJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _lightsIndexJs[_key4];
      }

      _export(_exportObj4);
    }, function (_skinnedMeshRendererIndexJs) {
      var _exportObj5 = {};

      for (var _key5 in _skinnedMeshRendererIndexJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _skinnedMeshRendererIndexJs[_key5];
      }

      _export(_exportObj5);
    }, function (_skeletalAnimationIndexJs) {
      var _exportObj6 = {};

      for (var _key6 in _skeletalAnimationIndexJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _skeletalAnimationIndexJs[_key6];
      }

      _export(_exportObj6);
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the 'Software'), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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
      _export("utils", utils);

      legacyCC.utils = utils;
    }
  };
});