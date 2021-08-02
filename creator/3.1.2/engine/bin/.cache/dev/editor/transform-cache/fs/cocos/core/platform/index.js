"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  log: true,
  error: true,
  warn: true,
  assert: true,
  logID: true,
  errorID: true,
  warnID: true,
  assertID: true,
  isDisplayStats: true,
  setDisplayStats: true,
  getError: true,
  DebugMode: true,
  screen: true
};
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function () {
    return _debug.log;
  }
});
Object.defineProperty(exports, "error", {
  enumerable: true,
  get: function () {
    return _debug.error;
  }
});
Object.defineProperty(exports, "warn", {
  enumerable: true,
  get: function () {
    return _debug.warn;
  }
});
Object.defineProperty(exports, "assert", {
  enumerable: true,
  get: function () {
    return _debug.assert;
  }
});
Object.defineProperty(exports, "logID", {
  enumerable: true,
  get: function () {
    return _debug.logID;
  }
});
Object.defineProperty(exports, "errorID", {
  enumerable: true,
  get: function () {
    return _debug.errorID;
  }
});
Object.defineProperty(exports, "warnID", {
  enumerable: true,
  get: function () {
    return _debug.warnID;
  }
});
Object.defineProperty(exports, "assertID", {
  enumerable: true,
  get: function () {
    return _debug.assertID;
  }
});
Object.defineProperty(exports, "isDisplayStats", {
  enumerable: true,
  get: function () {
    return _debug.isDisplayStats;
  }
});
Object.defineProperty(exports, "setDisplayStats", {
  enumerable: true,
  get: function () {
    return _debug.setDisplayStats;
  }
});
Object.defineProperty(exports, "getError", {
  enumerable: true,
  get: function () {
    return _debug.getError;
  }
});
Object.defineProperty(exports, "DebugMode", {
  enumerable: true,
  get: function () {
    return _debug.DebugMode;
  }
});
Object.defineProperty(exports, "screen", {
  enumerable: true,
  get: function () {
    return _screen.screen;
  }
});

require("./deprecated.js");

var _sys = require("./sys.js");

Object.keys(_sys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sys[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sys[key];
    }
  });
});

var _macro = require("./macro.js");

Object.keys(_macro).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _macro[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _macro[key];
    }
  });
});

var _visibleRect = require("./visible-rect.js");

Object.keys(_visibleRect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _visibleRect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _visibleRect[key];
    }
  });
});

var _view = require("./view.js");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _view[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});

var _index = require("./event-manager/index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _debug = require("./debug.js");

var _screen = require("./screen.js");