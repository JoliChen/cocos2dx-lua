System.register("q-bundled:///fs/cocos/physics-2d/spec/i-physics-contact.js", [], function (_export, _context) {
  "use strict";

  var Physics2DManifoldType;

  _export("Physics2DManifoldType", void 0);

  return {
    setters: [],
    execute: function () {
      (function (Physics2DManifoldType) {
        Physics2DManifoldType[Physics2DManifoldType["Circles"] = 0] = "Circles";
        Physics2DManifoldType[Physics2DManifoldType["FaceA"] = 1] = "FaceA";
        Physics2DManifoldType[Physics2DManifoldType["FaceB"] = 2] = "FaceB";
      })(Physics2DManifoldType || _export("Physics2DManifoldType", Physics2DManifoldType = {}));
    }
  };
});