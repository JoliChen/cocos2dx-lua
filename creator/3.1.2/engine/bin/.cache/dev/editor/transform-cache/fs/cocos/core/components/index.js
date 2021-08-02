"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  System: true,
  MissingScript: true,
  EventHandler: true,
  Component: true,
  Camera: true,
  RenderableComponent: true
};
Object.defineProperty(exports, "System", {
  enumerable: true,
  get: function () {
    return _system.default;
  }
});
Object.defineProperty(exports, "MissingScript", {
  enumerable: true,
  get: function () {
    return _missingScript.default;
  }
});
Object.defineProperty(exports, "EventHandler", {
  enumerable: true,
  get: function () {
    return _componentEventHandler.EventHandler;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _component.Component;
  }
});
Object.defineProperty(exports, "Camera", {
  enumerable: true,
  get: function () {
    return _cameraComponent.Camera;
  }
});
Object.defineProperty(exports, "RenderableComponent", {
  enumerable: true,
  get: function () {
    return _renderableComponent.RenderableComponent;
  }
});

var _system = _interopRequireDefault(require("./system.js"));

var _missingScript = _interopRequireDefault(require("./missing-script.js"));

var _componentEventHandler = require("./component-event-handler.js");

var _component = require("./component.js");

var _cameraComponent = require("./camera-component.js");

var _renderableComponent = require("./renderable-component.js");

var _deprecated = require("./deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }