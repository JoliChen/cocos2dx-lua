"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchInputSource = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../../cocos/core/math/index.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _globalExports = require("../../../cocos/core/global-exports.js");

var _eventEnum = require("../../../cocos/core/platform/event-manager/event-enum.js");

class TouchInputSource {
  constructor() {
    this.support = void 0;
    this._canvas = void 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this.support = document.documentElement.ontouchstart !== undefined || document.ontouchstart !== undefined || navigator.msPointerEnabled;

    if (this.support) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !_internal253Aconstants.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
  }

  _registerEvent() {
    var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

    // IDEA: need to register on window ?
    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('touchstart', this._createCallback(_eventEnum.SystemEventType.TOUCH_START));
    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('touchmove', this._createCallback(_eventEnum.SystemEventType.TOUCH_MOVE));
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('touchend', this._createCallback(_eventEnum.SystemEventType.TOUCH_END));
    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('touchcancel', this._createCallback(_eventEnum.SystemEventType.TOUCH_CANCEL));
  }

  _createCallback(eventType) {
    return event => {
      const canvasRect = this._getCanvasRect();

      const touchDataList = [];
      const length = event.changedTouches.length;

      for (let i = 0; i < length; ++i) {
        const touch = event.changedTouches[i];

        const location = this._getLocation(touch);

        let x = location.x - canvasRect.x;
        let y = canvasRect.y + canvasRect.height - location.y; // TODO: should not call engine API

        if (_globalExports.legacyCC.view._isRotated) {
          const tmp = x;
          x = canvasRect.height - y;
          y = tmp;
        }

        const touchData = {
          identifier: touch.identifier,
          x,
          y,
          force: touch.force
        };
        touchDataList.push(touchData);
      }

      const inputEvent = {
        type: eventType,
        changedTouches: touchDataList,
        timestamp: performance.now()
      };
      event.stopPropagation();

      if (event.target === this._canvas) {
        event.preventDefault();
      }

      if (event.type === 'touchstart') {
        var _this$_canvas5;

        (_this$_canvas5 = this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
      }

      this._eventTarget.emit(eventType, inputEvent);
    };
  }

  _getCanvasRect() {
    const canvas = this._canvas;
    const box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

    if (box) {
      return new _index.Rect(box.x, box.y, box.width, box.height);
    }

    return new _index.Rect(0, 0, 0, 0);
  }

  _getLocation(event) {
    return new _index.Vec2(event.clientX, event.clientY);
  }

  onStart(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.TOUCH_START, cb);
  }

  onMove(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.TOUCH_MOVE, cb);
  }

  onEnd(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.TOUCH_END, cb);
  }

  onCancel(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.TOUCH_CANCEL, cb);
  }

}

exports.TouchInputSource = TouchInputSource;