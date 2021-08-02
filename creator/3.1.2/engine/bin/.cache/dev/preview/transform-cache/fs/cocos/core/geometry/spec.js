System.register("q-bundled:///fs/cocos/core/geometry/spec.js", [], function (_export, _context) {
  "use strict";

  var ERaycastMode;

  _export("ERaycastMode", void 0);

  return {
    setters: [],
    execute: function () {
      (function (ERaycastMode) {
        ERaycastMode[ERaycastMode["ALL"] = 0] = "ALL";
        ERaycastMode[ERaycastMode["CLOSEST"] = 1] = "CLOSEST";
        ERaycastMode[ERaycastMode["ANY"] = 2] = "ANY";
      })(ERaycastMode || _export("ERaycastMode", ERaycastMode = {}));
    }
  };
});