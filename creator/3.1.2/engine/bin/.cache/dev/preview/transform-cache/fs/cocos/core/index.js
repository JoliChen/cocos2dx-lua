System.register("q-bundled:///fs/cocos/core/index.js", ["./global-exports.js", "./geometry/index.js", "./math/index.js", "./memop/index.js", "./gfx/index.js", "./splash-screen.js", "./deprecated.js", "./value-types/index.js", "./utils/index.js", "./data/index.js", "./event/index.js", "./assets/index.js", "./platform/index.js", "./game.js", "./scheduler.js", "./director.js", "./gfx/deprecated-3.0.0.js", "./pipeline/index.js", "./asset-manager/index.js", "./scene-graph/index.js", "./components/index.js", "./builtin/index.js", "./animation/index.js"], function (_export, _context) {
  "use strict";

  var legacyCC, VERSION, geometry, math, memop, gfx;
  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
      VERSION = _globalExportsJs.VERSION;
    }, function (_geometryIndexJs) {
      geometry = _geometryIndexJs;
    }, function (_mathIndexJs) {
      math = _mathIndexJs;
      var _exportObj = {};

      for (var _key in _mathIndexJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _mathIndexJs[_key];
      }

      _export(_exportObj);
    }, function (_memopIndexJs) {
      memop = _memopIndexJs;
      var _exportObj2 = {};

      for (var _key2 in _memopIndexJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _memopIndexJs[_key2];
      }

      _export(_exportObj2);
    }, function (_gfxIndexJs) {
      gfx = _gfxIndexJs;
    }, function (_splashScreenJs) {}, function (_deprecatedJs) {}, function (_valueTypesIndexJs) {
      var _exportObj3 = {};

      for (var _key3 in _valueTypesIndexJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _valueTypesIndexJs[_key3];
      }

      _export(_exportObj3);
    }, function (_utilsIndexJs) {
      var _exportObj4 = {};

      for (var _key4 in _utilsIndexJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _utilsIndexJs[_key4];
      }

      _export(_exportObj4);
    }, function (_dataIndexJs) {
      var _exportObj5 = {};

      for (var _key5 in _dataIndexJs) {
        if (_key5 !== "default" && _key5 !== "__esModule") _exportObj5[_key5] = _dataIndexJs[_key5];
      }

      _export(_exportObj5);
    }, function (_eventIndexJs) {
      var _exportObj6 = {};

      for (var _key6 in _eventIndexJs) {
        if (_key6 !== "default" && _key6 !== "__esModule") _exportObj6[_key6] = _eventIndexJs[_key6];
      }

      _export(_exportObj6);
    }, function (_assetsIndexJs) {
      var _exportObj7 = {};

      for (var _key7 in _assetsIndexJs) {
        if (_key7 !== "default" && _key7 !== "__esModule") _exportObj7[_key7] = _assetsIndexJs[_key7];
      }

      _export(_exportObj7);
    }, function (_platformIndexJs) {
      var _exportObj8 = {};

      for (var _key8 in _platformIndexJs) {
        if (_key8 !== "default" && _key8 !== "__esModule") _exportObj8[_key8] = _platformIndexJs[_key8];
      }

      _export(_exportObj8);
    }, function (_gameJs) {
      var _exportObj9 = {};

      for (var _key9 in _gameJs) {
        if (_key9 !== "default" && _key9 !== "__esModule") _exportObj9[_key9] = _gameJs[_key9];
      }

      _export(_exportObj9);
    }, function (_schedulerJs) {
      var _exportObj10 = {};

      for (var _key10 in _schedulerJs) {
        if (_key10 !== "default" && _key10 !== "__esModule") _exportObj10[_key10] = _schedulerJs[_key10];
      }

      _export(_exportObj10);
    }, function (_directorJs) {
      var _exportObj11 = {};

      for (var _key11 in _directorJs) {
        if (_key11 !== "default" && _key11 !== "__esModule") _exportObj11[_key11] = _directorJs[_key11];
      }

      _export(_exportObj11);
    }, function (_gfxDeprecated300Js) {
      var _exportObj12 = {};

      for (var _key12 in _gfxDeprecated300Js) {
        if (_key12 !== "default" && _key12 !== "__esModule") _exportObj12[_key12] = _gfxDeprecated300Js[_key12];
      }

      _export(_exportObj12);
    }, function (_pipelineIndexJs) {
      var _exportObj13 = {};

      for (var _key13 in _pipelineIndexJs) {
        if (_key13 !== "default" && _key13 !== "__esModule") _exportObj13[_key13] = _pipelineIndexJs[_key13];
      }

      _export(_exportObj13);
    }, function (_assetManagerIndexJs) {
      var _exportObj14 = {};

      for (var _key14 in _assetManagerIndexJs) {
        if (_key14 !== "default" && _key14 !== "__esModule") _exportObj14[_key14] = _assetManagerIndexJs[_key14];
      }

      _export(_exportObj14);
    }, function (_sceneGraphIndexJs) {
      var _exportObj15 = {};

      for (var _key15 in _sceneGraphIndexJs) {
        if (_key15 !== "default" && _key15 !== "__esModule") _exportObj15[_key15] = _sceneGraphIndexJs[_key15];
      }

      _export(_exportObj15);
    }, function (_componentsIndexJs) {
      var _exportObj16 = {};

      for (var _key16 in _componentsIndexJs) {
        if (_key16 !== "default" && _key16 !== "__esModule") _exportObj16[_key16] = _componentsIndexJs[_key16];
      }

      _export(_exportObj16);
    }, function (_builtinIndexJs) {
      var _exportObj17 = {};

      for (var _key17 in _builtinIndexJs) {
        if (_key17 !== "default" && _key17 !== "__esModule") _exportObj17[_key17] = _builtinIndexJs[_key17];
      }

      _export(_exportObj17);
    }, function (_animationIndexJs) {
      var _exportObj18 = {};

      for (var _key18 in _animationIndexJs) {
        if (_key18 !== "default" && _key18 !== "__esModule") _exportObj18[_key18] = _animationIndexJs[_key18];
      }

      _export(_exportObj18);
    }],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @module core
       */
      legacyCC.math = math;
      legacyCC.geometry = geometry;

      _export("math", math);

      _export("memop", memop);

      _export("geometry", geometry);

      _export("gfx", gfx);

      _export("VERSION", VERSION);
    }
  };
});