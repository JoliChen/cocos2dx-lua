"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseInputSource = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../../cocos/core/math/index.js");

var _eventEnum = require("../../../cocos/core/platform/event-manager/event-enum.js");

class MouseInputSource {
  constructor() {
    this.support = void 0;
    this._canvas = void 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this._pointLocked = false;
    this._isPressed = false;
    this._preMousePos = new _index.Vec2();
    this.support = !_internal253Aconstants.EDITOR && document.documentElement.onmouseup !== undefined;

    if (this.support) {
      this._canvas = document.getElementById('GameCanvas');

      if (!this._canvas && !_internal253Aconstants.TEST) {
        console.warn('failed to access canvas');
      }

      this._registerEvent();
    }
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

  _registerEvent() {
    var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

    // register mouse down event
    window.addEventListener('mousedown', () => {
      this._isPressed = true;
    });
    (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('mousedown', this._createCallback(_eventEnum.SystemEventType.MOUSE_DOWN)); // register mouse move event

    (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('mousemove', this._createCallback(_eventEnum.SystemEventType.MOUSE_MOVE)); // register mouse up event

    window.addEventListener('mouseup', this._createCallback(_eventEnum.SystemEventType.MOUSE_UP));
    (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('mouseup', this._createCallback(_eventEnum.SystemEventType.MOUSE_UP)); // register wheel event

    (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('wheel', event => {
      const canvasRect = this._getCanvasRect();

      const location = this._getLocation(event);

      const wheelSensitivityFactor = 5;
      const inputEvent = {
        type: _eventEnum.SystemEventType.MOUSE_WHEEL,
        x: location.x - canvasRect.x,
        y: canvasRect.y + canvasRect.height - location.y,
        button: event.button,
        // TODO: what is the button when tracking mouse move ?
        deltaX: event.deltaX * wheelSensitivityFactor,
        deltaY: -event.deltaY * wheelSensitivityFactor,
        timestamp: performance.now(),
        movementX: event.movementX,
        movementY: event.movementY
      };
      event.stopPropagation();
      event.preventDefault();

      this._eventTarget.emit(_eventEnum.SystemEventType.MOUSE_WHEEL, inputEvent);
    });

    this._registerPointerLockEvent();
  } // To be removed in the future.


  _registerPointerLockEvent() {
    const lockChangeAlert = () => {
      const canvas = this._canvas; // @ts-expect-error undefined mozPointerLockElement

      if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        this._pointLocked = true;
      } else {
        this._pointLocked = false;
      }
    };

    if ('onpointerlockchange' in document) {
      document.addEventListener('pointerlockchange', lockChangeAlert, false);
    } else if ('onmozpointerlockchange' in document) {
      // @ts-expect-error undefined mozpointerlockchange event
      document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    }
  }

  _createCallback(eventType) {
    return event => {
      var _this$_canvas5;

      const canvasRect = this._getCanvasRect();

      const location = this._getLocation(event);

      let button = event.button;

      switch (event.type) {
        case 'mousedown':
          (_this$_canvas5 = this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
          this._isPressed = true;
          break;

        case 'mouseup':
          this._isPressed = false;
          break;

        case 'mousemove':
          if (!this._isPressed) {
            button = -1; // TODO: should not access EventMouse.BUTTON_MISSING, need a button enum type
          }

          break;

        default:
          break;
      }

      const inputEvent = {
        type: eventType,
        x: this._pointLocked ? this._preMousePos.x + event.movementX : location.x - canvasRect.x,
        y: this._pointLocked ? this._preMousePos.y - event.movementY : canvasRect.y + canvasRect.height - location.y,
        button,
        timestamp: performance.now(),
        // this is web only property
        movementX: event.movementX,
        movementY: event.movementY
      }; // update previous mouse position.

      this._preMousePos.set(inputEvent.x, inputEvent.y);

      event.stopPropagation();

      if (event.target === this._canvas) {
        event.preventDefault();
      } // emit web mouse event


      this._eventTarget.emit(eventType, inputEvent);
    };
  }

  onDown(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.MOUSE_DOWN, cb);
  }

  onMove(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.MOUSE_MOVE, cb);
  }

  onUp(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.MOUSE_UP, cb);
  }

  onWheel(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.MOUSE_WHEEL, cb);
  }

}

exports.MouseInputSource = MouseInputSource;