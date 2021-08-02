System.register("q-bundled:///fs/cocos/core/renderer/index.js", ["./config.js", "./scene/index.js", "./scene/deprecated.js", "./utils.js", "./core/constants.js", "./core/pass-utils.js", "./core/pass.js", "./core/program-lib.js", "./core/sampler-lib.js", "./core/texture-buffer-pool.js", "./core/material-instance.js", "./core/pass-instance.js", "./core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var config, scene, addStage;
  return {
    setters: [function (_configJs) {
      config = _configJs.default;
    }, function (_sceneIndexJs) {
      scene = _sceneIndexJs;
    }, function (_sceneDeprecatedJs) {}, function (_utilsJs) {
      _export("createIA", _utilsJs.createIA);
    }, function (_coreConstantsJs) {
      var _exportObj = {};

      for (var _key in _coreConstantsJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _coreConstantsJs[_key];
      }

      _export(_exportObj);
    }, function (_corePassUtilsJs) {
      var _exportObj2 = {};

      for (var _key2 in _corePassUtilsJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _corePassUtilsJs[_key2];
      }

      _export(_exportObj2);
    }, function (_corePassJs) {
      var _exportObj3 = {};

      for (var _key3 in _corePassJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _corePassJs[_key3];
      }

      _export(_exportObj3);
    }, function (_coreProgramLibJs) {
      var _exportObj4 = {};

      for (var _key4 in _coreProgramLibJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _coreProgramLibJs[_key4];
      }

      _export(_exportObj4);
    }, function (_coreSamplerLibJs) {
      var _exportObj5 = {};

      for (var _key5 in _coreSamplerLibJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _coreSamplerLibJs[_key5];
      }

      _export(_exportObj5);
    }, function (_coreTextureBufferPoolJs) {
      var _exportObj6 = {};

      for (var _key6 in _coreTextureBufferPoolJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _coreTextureBufferPoolJs[_key6];
      }

      _export(_exportObj6);
    }, function (_coreMaterialInstanceJs) {
      var _exportObj7 = {};

      for (var _key7 in _coreMaterialInstanceJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _coreMaterialInstanceJs[_key7];
      }

      _export(_exportObj7);
    }, function (_corePassInstanceJs) {
      var _exportObj8 = {};

      for (var _key8 in _corePassInstanceJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _corePassInstanceJs[_key8];
      }

      _export(_exportObj8);
    }, function (_coreMemoryPoolsJs) {
      var _exportObj9 = {};

      for (var _key9 in _coreMemoryPoolsJs) {
        if (_key9 !== "default" && _key9 !== "__esModule") _exportObj9[_key9] = _coreMemoryPoolsJs[_key9];
      }

      _export(_exportObj9);
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
      _export("addStage", addStage = config.addStage);

      _export("scene", scene);
    }
  };
});