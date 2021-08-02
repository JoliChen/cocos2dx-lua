System.register("q-bundled:///fs/cocos/core/asset-manager/index.js", ["./asset-manager.js", "./bundle.js", "./deprecated.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_assetManagerJs) {
      _export({
        assetManager: _assetManagerJs.default,
        AssetManager: _assetManagerJs.AssetManager
      });
    }, function (_bundleJs) {
      _export("resources", _bundleJs.resources);
    }, function (_deprecatedJs) {
      var _exportObj = {};

      for (var _key in _deprecatedJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _deprecatedJs[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {}
  };
});