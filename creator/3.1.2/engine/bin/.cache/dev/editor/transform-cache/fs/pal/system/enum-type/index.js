"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserType = require("./browser-type.js");

Object.keys(_browserType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _browserType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _browserType[key];
    }
  });
});

var _event = require("./event.js");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _event[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _language = require("./language.js");

Object.keys(_language).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _language[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _language[key];
    }
  });
});

var _networkType = require("./network-type.js");

Object.keys(_networkType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _networkType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _networkType[key];
    }
  });
});

var _operatingSystem = require("./operating-system.js");

Object.keys(_operatingSystem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _operatingSystem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _operatingSystem[key];
    }
  });
});

var _orientation = require("./orientation.js");

Object.keys(_orientation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _orientation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _orientation[key];
    }
  });
});

var _platform = require("./platform.js");

Object.keys(_platform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _platform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _platform[key];
    }
  });
});