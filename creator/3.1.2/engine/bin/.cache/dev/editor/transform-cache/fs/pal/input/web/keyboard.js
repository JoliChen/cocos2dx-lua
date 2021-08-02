"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardInputSource = void 0;

var _eventEnum = require("../../../cocos/core/platform/event-manager/event-enum.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

class KeyboardInputSource {
  constructor() {
    this.support = void 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this.support = document.documentElement.onkeyup !== undefined;

    this._registerEvent();
  }

  _registerEvent() {
    const canvas = document.getElementById('GameCanvas');
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keydown', this._createCallback(_eventEnum.SystemEventType.KEY_DOWN));
    canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keyup', this._createCallback(_eventEnum.SystemEventType.KEY_UP));
  }

  _createCallback(eventType) {
    return event => {
      const inputEvent = {
        type: eventType,
        code: event.keyCode,
        // TODO: keyCode is deprecated on Web standard
        timestamp: performance.now()
      };
      event.stopPropagation();
      event.preventDefault();

      this._eventTarget.emit(eventType, inputEvent);
    };
  }

  onDown(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.KEY_DOWN, cb);
  }

  onUp(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.KEY_UP, cb);
  }

}

exports.KeyboardInputSource = KeyboardInputSource;