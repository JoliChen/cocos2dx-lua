"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccelerometerInputSource = void 0;

var _system = require("../../system/web/system.js");

var _eventEnum = require("../../../cocos/core/platform/event-manager/event-enum.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index = require("../../system/enum-type/index.js");

var _globalExports = require("../../../cocos/core/global-exports.js");

class AccelerometerInputSource {
  constructor() {
    this.support = void 0;
    this._intervalInMileseconds = 200;
    this._accelTimer = 0;
    this._eventTarget = new _eventTarget.EventTarget();
    this._deviceEventName = void 0;
    this._globalEventClass = void 0;
    this._didAccelerateFunc = void 0;
    this.support = window.DeviceMotionEvent !== undefined || window.DeviceOrientationEvent !== undefined; // init event name

    this._globalEventClass = window.DeviceMotionEvent || window.DeviceOrientationEvent; // TODO fix DeviceMotionEvent bug on QQ Browser version 4.1 and below.

    if (_system.system.browserType === _index.BrowserType.MOBILE_QQ) {
      this._globalEventClass = window.DeviceOrientationEvent;
    }

    this._deviceEventName = this._globalEventClass === window.DeviceMotionEvent ? 'devicemotion' : 'deviceorientation';
    this._didAccelerateFunc = this._didAccelerate.bind(this);
  }

  _registerEvent() {
    this._accelTimer = performance.now();
    window.addEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  }

  _unregisterEvent() {
    this._accelTimer = 0;
    window.removeEventListener(this._deviceEventName, this._didAccelerateFunc, false);
  }

  _didAccelerate(event) {
    const now = performance.now();

    if (now - this._accelTimer < this._intervalInMileseconds) {
      return;
    }

    this._accelTimer = now;
    let x = 0;
    let y = 0;
    let z = 0;

    if (this._globalEventClass === window.DeviceMotionEvent) {
      const deviceMotionEvent = event;
      const eventAcceleration = deviceMotionEvent.accelerationIncludingGravity;
      x = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.x) || 0) * 0.1;
      y = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.y) || 0) * 0.1;
      z = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.z) || 0) * 0.1;
    } else {
      const deviceOrientationEvent = event;
      x = (deviceOrientationEvent.gamma || 0) / 90 * 0.981;
      y = -((deviceOrientationEvent.beta || 0) / 90) * 0.981;
      z = (deviceOrientationEvent.alpha || 0) / 90 * 0.981;
    } // TODO: should not call engine API


    if (_globalExports.legacyCC.view._isRotated) {
      const tmp = x;
      x = -y;
      y = tmp;
    } // TODO: window.orientation is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    // try to use experimental screen.orientation: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation


    const PORTRAIT = 0;
    const LANDSCAPE_LEFT = -90;
    const PORTRAIT_UPSIDE_DOWN = 180;
    const LANDSCAPE_RIGHT = 90;
    const tmpX = x;

    if (window.orientation === LANDSCAPE_RIGHT) {
      x = -y;
      y = tmpX;
    } else if (window.orientation === LANDSCAPE_LEFT) {
      x = y;
      y = -tmpX;
    } else if (window.orientation === PORTRAIT_UPSIDE_DOWN) {
      x = -x;
      y = -y;
    } // fix android acc values are opposite


    if (_system.system.os === _index.OS.ANDROID && _system.system.browserType !== _index.BrowserType.MOBILE_QQ) {
      x = -x;
      y = -y;
    }

    const accelerometer = {
      type: _eventEnum.SystemEventType.DEVICEMOTION,
      x,
      y,
      z,
      timestamp: performance.now()
    };

    this._eventTarget.emit(_eventEnum.SystemEventType.DEVICEMOTION, accelerometer);
  }

  start() {
    this._registerEvent();
  }

  stop() {
    this._unregisterEvent();
  }

  setInterval(intervalInMileseconds) {
    this._intervalInMileseconds = intervalInMileseconds;
  }

  onChange(cb) {
    this._eventTarget.on(_eventEnum.SystemEventType.DEVICEMOTION, cb);
  }

}

exports.AccelerometerInputSource = AccelerometerInputSource;