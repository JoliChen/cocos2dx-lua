System.register("q-bundled:///fs/pal/minigame/non-minigame.js", [], function (_export, _context) {
  "use strict";

  var minigame;
  return {
    setters: [],
    execute: function () {
      // @ts-expect-error can't init minigame when it's declared
      _export("minigame", minigame = {});
    }
  };
});