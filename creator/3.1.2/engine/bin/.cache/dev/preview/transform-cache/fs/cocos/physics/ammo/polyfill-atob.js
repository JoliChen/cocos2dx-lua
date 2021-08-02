System.register("q-bundled:///fs/cocos/physics/ammo/polyfill-atob.js", ["../../../exports/base.js", "../../core/utils/atob.js"], function (_export, _context) {
  "use strict";

  var cclegacy, atob;
  return {
    setters: [function (_exportsBaseJs) {
      cclegacy = _exportsBaseJs.cclegacy;
    }, function (_coreUtilsAtobJs) {
      atob = _coreUtilsAtobJs.atob;
    }],
    execute: function () {
      cclegacy._global.atob = atob;
    }
  };
});