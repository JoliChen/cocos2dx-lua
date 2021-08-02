"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./deprecated.js");

var _eventManager = require("./event-manager.js");

Object.keys(_eventManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventManager[key];
    }
  });
});

var _inputManager = require("./input-manager.js");

Object.keys(_inputManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _inputManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputManager[key];
    }
  });
});

var _systemEvent = require("./system-event.js");

Object.keys(_systemEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _systemEvent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _systemEvent[key];
    }
  });
});

var _events = require("./events.js");

Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _events[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _events[key];
    }
  });
});

var _touch = require("./touch.js");

Object.keys(_touch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _touch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _touch[key];
    }
  });
});

var _eventEnum = require("./event-enum.js");

Object.keys(_eventEnum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventEnum[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventEnum[key];
    }
  });
});