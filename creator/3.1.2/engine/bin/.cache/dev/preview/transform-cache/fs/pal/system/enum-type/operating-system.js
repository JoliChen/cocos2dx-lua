System.register("q-bundled:///fs/pal/system/enum-type/operating-system.js", [], function (_export, _context) {
  "use strict";

  var OS;

  _export("OS", void 0);

  return {
    setters: [],
    execute: function () {
      (function (OS) {
        OS["UNKNOWN"] = "Unknown";
        OS["IOS"] = "iOS";
        OS["ANDROID"] = "Android";
        OS["WINDOWS"] = "Windows";
        OS["LINUX"] = "Linux";
        OS["OSX"] = "OS X";
      })(OS || _export("OS", OS = {}));
    }
  };
});