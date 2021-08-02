System.register("q-bundled:///fs/pal/input/web/touch.js", ["../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/math/index.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/global-exports.js", "../../../cocos/core/platform/event-manager/event-enum.js"], function (_export, _context) {
  "use strict";

  var TEST, Rect, Vec2, EventTarget, legacyCC, SystemEventType, TouchInputSource;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_cocosCoreMathIndexJs) {
      Rect = _cocosCoreMathIndexJs.Rect;
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreGlobalExportsJs) {
      legacyCC = _cocosCoreGlobalExportsJs.legacyCC;
    }, function (_cocosCorePlatformEventManagerEventEnumJs) {
      SystemEventType = _cocosCorePlatformEventManagerEventEnumJs.SystemEventType;
    }],
    execute: function () {
      _export("TouchInputSource", TouchInputSource = /*#__PURE__*/function () {
        function TouchInputSource() {
          this.support = void 0;
          this._canvas = void 0;
          this._eventTarget = new EventTarget();
          this.support = document.documentElement.ontouchstart !== undefined || document.ontouchstart !== undefined || navigator.msPointerEnabled;

          if (this.support) {
            this._canvas = document.getElementById('GameCanvas');

            if (!this._canvas && !TEST) {
              console.warn('failed to access canvas');
            }

            this._registerEvent();
          }
        }

        var _proto = TouchInputSource.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this$_canvas, _this$_canvas2, _this$_canvas3, _this$_canvas4;

          // IDEA: need to register on window ?
          (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('touchstart', this._createCallback(SystemEventType.TOUCH_START));
          (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('touchmove', this._createCallback(SystemEventType.TOUCH_MOVE));
          (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('touchend', this._createCallback(SystemEventType.TOUCH_END));
          (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('touchcancel', this._createCallback(SystemEventType.TOUCH_CANCEL));
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this = this;

          return function (event) {
            var canvasRect = _this._getCanvasRect();

            var touchDataList = [];
            var length = event.changedTouches.length;

            for (var i = 0; i < length; ++i) {
              var touch = event.changedTouches[i];

              var location = _this._getLocation(touch);

              var x = location.x - canvasRect.x;
              var y = canvasRect.y + canvasRect.height - location.y; // TODO: should not call engine API

              if (legacyCC.view._isRotated) {
                var tmp = x;
                x = canvasRect.height - y;
                y = tmp;
              }

              var touchData = {
                identifier: touch.identifier,
                x: x,
                y: y,
                force: touch.force
              };
              touchDataList.push(touchData);
            }

            var inputEvent = {
              type: eventType,
              changedTouches: touchDataList,
              timestamp: performance.now()
            };
            event.stopPropagation();

            if (event.target === _this._canvas) {
              event.preventDefault();
            }

            if (event.type === 'touchstart') {
              var _this$_canvas5;

              (_this$_canvas5 = _this._canvas) === null || _this$_canvas5 === void 0 ? void 0 : _this$_canvas5.focus();
            }

            _this._eventTarget.emit(eventType, inputEvent);
          };
        };

        _proto._getCanvasRect = function _getCanvasRect() {
          var canvas = this._canvas;
          var box = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();

          if (box) {
            return new Rect(box.x, box.y, box.width, box.height);
          }

          return new Rect(0, 0, 0, 0);
        };

        _proto._getLocation = function _getLocation(event) {
          return new Vec2(event.clientX, event.clientY);
        };

        _proto.onStart = function onStart(cb) {
          this._eventTarget.on(SystemEventType.TOUCH_START, cb);
        };

        _proto.onMove = function onMove(cb) {
          this._eventTarget.on(SystemEventType.TOUCH_MOVE, cb);
        };

        _proto.onEnd = function onEnd(cb) {
          this._eventTarget.on(SystemEventType.TOUCH_END, cb);
        };

        _proto.onCancel = function onCancel(cb) {
          this._eventTarget.on(SystemEventType.TOUCH_CANCEL, cb);
        };

        return TouchInputSource;
      }());
    }
  };
});