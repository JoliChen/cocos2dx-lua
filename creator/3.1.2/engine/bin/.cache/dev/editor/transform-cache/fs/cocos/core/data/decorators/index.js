"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ccclass: true,
  override: true
};
Object.defineProperty(exports, "ccclass", {
  enumerable: true,
  get: function () {
    return _ccclass.ccclass;
  }
});
Object.defineProperty(exports, "override", {
  enumerable: true,
  get: function () {
    return _override.override;
  }
});

var _ccclass = require("./ccclass.js");

var _component = require("./component.js");

Object.keys(_component).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _component[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _component[key];
    }
  });
});

var _serializable = require("./serializable.js");

Object.keys(_serializable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _serializable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _serializable[key];
    }
  });
});

var _editable = require("./editable.js");

Object.keys(_editable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _editable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _editable[key];
    }
  });
});

var _type = require("./type.js");

Object.keys(_type).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _type[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _type[key];
    }
  });
});

var _override = require("./override.js");