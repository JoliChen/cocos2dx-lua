System.register("q-bundled:///fs/pal/input/web/keyboard.js", ["../../../cocos/core/platform/event-manager/event-enum.js", "../../../cocos/core/event/event-target.js"], function (_export, _context) {
  "use strict";

  var SystemEventType, EventTarget, KeyboardInputSource;
  return {
    setters: [function (_cocosCorePlatformEventManagerEventEnumJs) {
      SystemEventType = _cocosCorePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }],
    execute: function () {
      _export("KeyboardInputSource", KeyboardInputSource = /*#__PURE__*/function () {
        function KeyboardInputSource() {
          this.support = void 0;
          this._eventTarget = new EventTarget();
          this.support = document.documentElement.onkeyup !== undefined;

          this._registerEvent();
        }

        var _proto = KeyboardInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          var canvas = document.getElementById('GameCanvas');
          canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keydown', this._createCallback(SystemEventType.KEY_DOWN));
          canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener('keyup', this._createCallback(SystemEventType.KEY_UP));
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (event) {
            var inputEvent = {
              type: eventType,
              code: event.keyCode,
              // TODO: keyCode is deprecated on Web standard
              timestamp: performance.now()
            };
            event.stopPropagation();
            event.preventDefault();

            _this._eventTarget.emit(eventType, inputEvent);
          };
        };

        _proto.onDown = function onDown(cb) {
          this._eventTarget.on(SystemEventType.KEY_DOWN, cb);
        };

        _proto.onUp = function onUp(cb) {
          this._eventTarget.on(SystemEventType.KEY_UP, cb);
        };

        return KeyboardInputSource;
      }());
    }
  };
});