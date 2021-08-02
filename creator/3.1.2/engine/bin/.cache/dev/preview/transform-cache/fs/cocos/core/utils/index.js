System.register("q-bundled:///fs/cocos/core/utils/index.js", ["./js.js", "./misc.js", "./path.js", "./x-deprecated.js", "./murmurhash2_gc.js", "./prefab-link.js", "./coordinates-converts-utils.js"], function (_export, _context) {
  "use strict";

  var js, misc, path;
  return {
    setters: [function (_jsJs) {
      js = _jsJs;
    }, function (_miscJs) {
      misc = _miscJs;
    }, function (_pathJs) {
      path = _pathJs;
    }, function (_xDeprecatedJs) {
      var _exportObj = {};

      for (var _key in _xDeprecatedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _xDeprecatedJs[_key];
      }

      _export(_exportObj);
    }, function (_murmurhash2_gcJs) {
      var _exportObj2 = {};

      for (var _key2 in _murmurhash2_gcJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _murmurhash2_gcJs[_key2];
      }

      _export(_exportObj2);
    }, function (_prefabLinkJs) {
      _export("PrefabLink", _prefabLinkJs.PrefabLink);
    }, function (_coordinatesConvertsUtilsJs) {
      var _exportObj3 = {};

      for (var _key3 in _coordinatesConvertsUtilsJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _coordinatesConvertsUtilsJs[_key3];
      }

      _export(_exportObj3);
    }],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
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
       * 杂项工具函数
       */

      /**
       * 用于处理文件与目录的路径的模块
       */
      _export("js", js);

      _export("misc", misc);

      _export("path", path); // export const js = cc.js;
      // export const path = cc.path;

    }
  };
});