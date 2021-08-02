System.register("q-bundled:///fs/pal/system/enum-type/orientation.js", [], function (_export, _context) {
  "use strict";

  var LEFT, RIGHT, Orientation;

  _export("Orientation", void 0);

  return {
    setters: [],
    execute: function () {
      LEFT = 1 << 2;
      RIGHT = 1 << 3;

      (function (Orientation) {
        Orientation[Orientation["PORTRAIT"] = 1] = "PORTRAIT";
        Orientation[Orientation["PORTRAIT_UPSIDE_DOWN"] = 2] = "PORTRAIT_UPSIDE_DOWN";
        Orientation[Orientation["LANDSCAPE_LEFT"] = LEFT] = "LANDSCAPE_LEFT";
        Orientation[Orientation["LANDSCAPE_RIGHT"] = RIGHT] = "LANDSCAPE_RIGHT";
        Orientation[Orientation["LANDSCAPE"] = LEFT | RIGHT] = "LANDSCAPE";
      })(Orientation || _export("Orientation", Orientation = {}));
    }
  };
});