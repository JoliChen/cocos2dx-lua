System.register("q-bundled:///fs/cocos/core/builtin/index.js", ["./builtin-res-mgr.js", "./effects.js"], function (_export, _context) {
  "use strict";

  return {
    setters: [function (_builtinResMgrJs) {
      var _exportObj = {};

      for (var _key in _builtinResMgrJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _builtinResMgrJs[_key];
      }

      _export(_exportObj);
    }, function (_effectsJs) {
      _export("effects", _effectsJs.effects);
    }],
    execute: function () {}
  };
});