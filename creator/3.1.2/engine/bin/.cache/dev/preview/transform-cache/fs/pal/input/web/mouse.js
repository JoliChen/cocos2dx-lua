System.register("q-bundled:///fs/pal/input/web/mouse.js", ["../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/event/event-target.js", "../../../cocos/core/math/index.js", "../../../cocos/core/platform/event-manager/event-enum.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, EventTarget, Rect, Vec2, SystemEventType, MouseInputSource;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_cocosCoreMathIndexJs) {
      Rect = _cocosCoreMathIndexJs.Rect;
      Vec2 = _cocosCoreMathIndexJs.Vec2;
    }, function (_cocosCorePlatformEventManagerEventEnumJs) {
      SystemEventType = _cocosCorePlatformEventManagerEventEnumJs.SystemEventType;
    }],
    execute: function () {
      _export("MouseInputSource", MouseInputSource = /*#__PURE__*/function () {
        function MouseInputSource() {
          this.support = void 0;
          this._canvas = void 0;
          this._eventTarget = new EventTarget();
          this._pointLocked = false;
          this._isPressed = false;
          this._preMousePos = new Vec2();
          this.support = !EDITOR && document.documentElement.onmouseup !== undefined;

          if (this.support) {
            this._canvas = document.getElementById('GameCanvas');

            if (!this._canvas && !TEST) {
              console.warn('failed to access canvas');
            }

            this._registerEvent();
          }
        }

        var _proto = MouseInputSource.prototype;

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

        _proto._registerEvent = function _registerEvent() {
          var _this = this,
              _this$_canvas,
              _this$_canvas2,
              _this$_canvas3,
              _this$_canvas4;

          // register mouse down event
          window.addEventListener('mousedown', function () {
            _this._isPressed = true;
          });
          (_this$_canvas = this._canvas) === null || _this$_canvas === void 0 ? void 0 : _this$_canvas.addEventListener('mousedown', this._createCallback(SystemEventType.MOUSE_DOWN)); // register mouse move event

          (_this$_canvas2 = this._canvas) === null || _this$_canvas2 === void 0 ? void 0 : _this$_canvas2.addEventListener('mousemove', this._createCallback(SystemEventType.MOUSE_MOVE)); // register mouse up event

          window.addEventListener('mouseup', this._createCallback(SystemEventType.MOUSE_UP));
          (_this$_canvas3 = this._canvas) === null || _this$_canvas3 === void 0 ? void 0 : _this$_canvas3.addEventListener('mouseup', this._createCallback(SystemEventType.MOUSE_UP)); // register wheel event

          (_this$_canvas4 = this._canvas) === null || _this$_canvas4 === void 0 ? void 0 : _this$_canvas4.addEventListener('wheel', function (event) {
            var canvasRect = _this._getCanvasRect();

            var location = _this._getLocation(event);

            var wheelSensitivityFactor = 5;
            var inputEvent = {
              type: SystemEventType.MOUSE_WHEEL,
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

            _this._eventTarget.emit(SystemEventType.MOUSE_WHEEL, inputEvent);
          });

          this._registerPointerLockEvent();
        } // To be removed in the future.
        ;

        _proto._registerPointerLockEvent = function _registerPointerLockEvent() {
          var _this2 = this;

          var lockChangeAlert = function lockChangeAlert() {
            var canvas = _this2._canvas; // @ts-expect-error undefined mozPointerLockElement

            if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
              _this2._pointLocked = true;
            } else {
              _this2._pointLocked = false;
            }
          };

          if ('onpointerlockchange' in document) {
            document.addEventListener('pointerlockchange', lockChangeAlert, false);
          } else if ('onmozpointerlockchange' in document) {
            // @ts-expect-error undefined mozpointerlockchange event
            document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
          }
        };

        _proto._createCallback = function _createCallback(eventType) {
          var _this3 = this;

          return function (event) {
            var _this3$_canvas;

            var canvasRect = _this3._getCanvasRect();

            var location = _this3._getLocation(event);

            var button = event.button;

            switch (event.type) {
              case 'mousedown':
                (_this3$_canvas = _this3._canvas) === null || _this3$_canvas === void 0 ? void 0 : _this3$_canvas.focus();
                _this3._isPressed = true;
                break;

              case 'mouseup':
                _this3._isPressed = false;
                break;

              case 'mousemove':
                if (!_this3._isPressed) {
                  button = -1; // TODO: should not access EventMouse.BUTTON_MISSING, need a button enum type
                }

                break;

              default:
                break;
            }

            var inputEvent = {
              type: eventType,
              x: _this3._pointLocked ? _this3._preMousePos.x + event.movementX : location.x - canvasRect.x,
              y: _this3._pointLocked ? _this3._preMousePos.y - event.movementY : canvasRect.y + canvasRect.height - location.y,
              button: button,
              timestamp: performance.now(),
              // this is web only property
              movementX: event.movementX,
              movementY: event.movementY
            }; // update previous mouse position.

            _this3._preMousePos.set(inputEvent.x, inputEvent.y);

            event.stopPropagation();

            if (event.target === _this3._canvas) {
              event.preventDefault();
            } // emit web mouse event


            _this3._eventTarget.emit(eventType, inputEvent);
          };
        };

        _proto.onDown = function onDown(cb) {
          this._eventTarget.on(SystemEventType.MOUSE_DOWN, cb);
        };

        _proto.onMove = function onMove(cb) {
          this._eventTarget.on(SystemEventType.MOUSE_MOVE, cb);
        };

        _proto.onUp = function onUp(cb) {
          this._eventTarget.on(SystemEventType.MOUSE_UP, cb);
        };

        _proto.onWheel = function onWheel(cb) {
          this._eventTarget.on(SystemEventType.MOUSE_WHEEL, cb);
        };

        return MouseInputSource;
      }());
    }
  };
});