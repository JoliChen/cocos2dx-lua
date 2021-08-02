System.register("q-bundled:///fs/cocos/2d/assembler/index.js", ["./utils.js", "./graphics/index.js", "./label/index.js", "./mask/index.js", "./sprite/index.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_utilsJs) {}, function (_graphicsIndexJs) {
      var _exportObj = {};

      for (var _key in _graphicsIndexJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _graphicsIndexJs[_key];
      }

      _export(_exportObj);
    }, function (_labelIndexJs) {
      var _exportObj2 = {};

      for (var _key2 in _labelIndexJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _labelIndexJs[_key2];
      }

      _export(_exportObj2);
    }, function (_maskIndexJs) {
      var _exportObj3 = {};

      for (var _key3 in _maskIndexJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _maskIndexJs[_key3];
      }

      _export(_exportObj3);
    }, function (_spriteIndexJs) {
      var _exportObj4 = {};

      for (var _key4 in _spriteIndexJs) {
        if (_key4 !== "default" && _key4 !== "__esModule") _exportObj4[_key4] = _spriteIndexJs[_key4];
      }

      _export(_exportObj4);
    }],
    execute: function () {}
  };
});