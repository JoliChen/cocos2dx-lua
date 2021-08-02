System.register("q-bundled:///fs/cocos/2d/utils/index.js", ["./font-loader.js", "./html-text-parser.js", "./text-utils.js", "./dynamic-atlas/atlas-manager.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_fontLoaderJs) {}, function (_htmlTextParserJs) {
      var _exportObj = {};

      for (var _key in _htmlTextParserJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _htmlTextParserJs[_key];
      }

      _export(_exportObj);
    }, function (_textUtilsJs) {
      var _exportObj2 = {};

      for (var _key2 in _textUtilsJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _textUtilsJs[_key2];
      }

      _export(_exportObj2);
    }, function (_dynamicAtlasAtlasManagerJs) {
      _export("dynamicAtlasManager", _dynamicAtlasAtlasManagerJs.dynamicAtlasManager);
    }],
    execute: function () {}
  };
});