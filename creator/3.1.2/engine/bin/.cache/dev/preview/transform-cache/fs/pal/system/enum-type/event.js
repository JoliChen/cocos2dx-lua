System.register("q-bundled:///fs/pal/system/enum-type/event.js", [], function (_export, _context) {
  "use strict";

  var AppEvent;

  _export("AppEvent", void 0);

  return {
    setters: [],
    execute: function () {
      (function (AppEvent) {
        AppEvent["HIDE"] = "hide";
        AppEvent["SHOW"] = "show";
        AppEvent["RESIZE"] = "resize";
        AppEvent["ORIENTATION_CHANGE"] = "orientation_change";
      })(AppEvent || _export("AppEvent", AppEvent = {}));
    }
  };
});