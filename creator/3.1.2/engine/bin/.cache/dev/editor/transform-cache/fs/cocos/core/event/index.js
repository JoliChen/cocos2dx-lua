"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function () {
    return _event.default;
  }
});
Object.defineProperty(exports, "EventTarget", {
  enumerable: true,
  get: function () {
    return _eventTarget.EventTarget;
  }
});
Object.defineProperty(exports, "Eventify", {
  enumerable: true,
  get: function () {
    return _eventify.Eventify;
  }
});

var _event = _interopRequireDefault(require("./event.js"));

var _eventTarget = require("./event-target.js");

var _eventify = require("./eventify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }