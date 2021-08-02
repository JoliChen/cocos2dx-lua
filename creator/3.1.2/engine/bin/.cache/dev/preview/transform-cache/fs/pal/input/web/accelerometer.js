System.register("q-bundled:///fs/pal/input/web/accelerometer.js", ["../../system/web/system.js", "../../../cocos/core/platform/event-manager/event-enum.js", "../../../cocos/core/event/event-target.js", "../../system/enum-type/index.js", "../../../cocos/core/global-exports.js"], function (_export, _context) {
  "use strict";

  var system, SystemEventType, EventTarget, BrowserType, OS, legacyCC, AccelerometerInputSource;
  return {
    setters: [function (_systemWebSystemJs) {
      system = _systemWebSystemJs.system;
    }, function (_cocosCorePlatformEventManagerEventEnumJs) {
      SystemEventType = _cocosCorePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_systemEnumTypeIndexJs) {
      BrowserType = _systemEnumTypeIndexJs.BrowserType;
      OS = _systemEnumTypeIndexJs.OS;
    }, function (_cocosCoreGlobalExportsJs) {
      legacyCC = _cocosCoreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _export("AccelerometerInputSource", AccelerometerInputSource = /*#__PURE__*/function () {
        function AccelerometerInputSource() {
          this.support = void 0;
          this._intervalInMileseconds = 200;
          this._accelTimer = 0;
          this._eventTarget = new EventTarget();
          this._deviceEventName = void 0;
          this._globalEventClass = void 0;
          this._didAccelerateFunc = void 0;
          this.support = window.DeviceMotionEvent !== undefined || window.DeviceOrientationEvent !== undefined; // init event name

          this._globalEventClass = window.DeviceMotionEvent || window.DeviceOrientationEvent; // TODO fix DeviceMotionEvent bug on QQ Browser version 4.1 and below.

          if (system.browserType === BrowserType.MOBILE_QQ) {
            this._globalEventClass = window.DeviceOrientationEvent;
          }

          this._deviceEventName = this._globalEventClass === window.DeviceMotionEvent ? 'devicemotion' : 'deviceorientation';
          this._didAccelerateFunc = this._didAccelerate.bind(this);
        }

        var _proto = AccelerometerInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          this._accelTimer = performance.now();
          window.addEventListener(this._deviceEventName, this._didAccelerateFunc, false);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this._accelTimer = 0;
          window.removeEventListener(this._deviceEventName, this._didAccelerateFunc, false);
        };

        _proto._didAccelerate = function _didAccelerate(event) {
          var now = performance.now();

          if (now - this._accelTimer < this._intervalInMileseconds) {
            return;
          }

          this._accelTimer = now;
          var x = 0;
          var y = 0;
          var z = 0;

          if (this._globalEventClass === window.DeviceMotionEvent) {
            var deviceMotionEvent = event;
            var eventAcceleration = deviceMotionEvent.accelerationIncludingGravity;
            x = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.x) || 0) * 0.1;
            y = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.y) || 0) * 0.1;
            z = ((eventAcceleration === null || eventAcceleration === void 0 ? void 0 : eventAcceleration.z) || 0) * 0.1;
          } else {
            var deviceOrientationEvent = event;
            x = (deviceOrientationEvent.gamma || 0) / 90 * 0.981;
            y = -((deviceOrientationEvent.beta || 0) / 90) * 0.981;
            z = (deviceOrientationEvent.alpha || 0) / 90 * 0.981;
          } // TODO: should not call engine API


          if (legacyCC.view._isRotated) {
            var tmp = x;
            x = -y;
            y = tmp;
          } // TODO: window.orientation is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
          // try to use experimental screen.orientation: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation


          var PORTRAIT = 0;
          var LANDSCAPE_LEFT = -90;
          var PORTRAIT_UPSIDE_DOWN = 180;
          var LANDSCAPE_RIGHT = 90;
          var tmpX = x;

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


          if (system.os === OS.ANDROID && system.browserType !== BrowserType.MOBILE_QQ) {
            x = -x;
            y = -y;
          }

          var accelerometer = {
            type: SystemEventType.DEVICEMOTION,
            x: x,
            y: y,
            z: z,
            timestamp: performance.now()
          };

          this._eventTarget.emit(SystemEventType.DEVICEMOTION, accelerometer);
        };

        _proto.start = function start() {
          this._registerEvent();
        };

        _proto.stop = function stop() {
          this._unregisterEvent();
        };

        _proto.setInterval = function setInterval(intervalInMileseconds) {
          this._intervalInMileseconds = intervalInMileseconds;
        };

        _proto.onChange = function onChange(cb) {
          this._eventTarget.on(SystemEventType.DEVICEMOTION, cb);
        };

        return AccelerometerInputSource;
      }());
    }
  };
});