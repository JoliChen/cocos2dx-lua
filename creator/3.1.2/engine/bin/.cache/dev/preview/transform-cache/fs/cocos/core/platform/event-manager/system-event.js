System.register("q-bundled:///fs/cocos/core/platform/event-manager/system-event.js", ["../../../../../virtual/internal%253Aconstants.js", "../../event/event-target.js", "./event-enum.js", "./event-listener.js", "./event-manager.js", "./input-manager.js", "../../global-exports.js", "../debug.js"], function (_export, _context) {
  "use strict";

  var EDITOR, EventTarget, SystemEventType, EventListener, eventManager, inputManager, legacyCC, logID, warnID, keyboardListener, accelerationListener, touchListener, mouseListener, SystemEvent, systemEvent;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_eventEventTargetJs) {
      EventTarget = _eventEventTargetJs.EventTarget;
    }, function (_eventEnumJs) {
      SystemEventType = _eventEnumJs.SystemEventType;
    }, function (_eventListenerJs) {
      EventListener = _eventListenerJs.EventListener;
    }, function (_eventManagerJs) {
      eventManager = _eventManagerJs.default;
    }, function (_inputManagerJs) {
      inputManager = _inputManagerJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      logID = _debugJs.logID;
      warnID = _debugJs.warnID;
    }],
    execute: function () {
      keyboardListener = null;
      accelerationListener = null;
      touchListener = null;
      mouseListener = null;
      /**
      * @en
      * The System event, it currently supports keyboard events and accelerometer events.<br/>
      * You can get the `SystemEvent` instance with `systemEvent`.<br/>
      * @zh
      * 系统事件，它目前支持按键事件和重力感应事件。<br/>
      * 你可以通过 `systemEvent` 获取到 `SystemEvent` 的实例。<br/>
      * @example
      * ```
      * import { systemEvent, SystemEvent } from 'cc';
      * systemEvent.on(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      * systemEvent.off(SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
      * ```
      */

      _export("SystemEvent", SystemEvent = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(SystemEvent, _EventTarget);

        function SystemEvent() {
          return _EventTarget.call(this) || this;
        }
        /**
         * @en
         * Sets whether to enable the accelerometer event listener or not.
         *
         * @zh
         * 是否启用加速度计事件。
         */


        var _proto = SystemEvent.prototype;

        _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnabled) {
          if (EDITOR) {
            return;
          } // for iOS 13+


          if (isEnabled && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(function (response) {
              logID(3520, response);
              inputManager.setAccelerometerEnabled(response === 'granted');
            })["catch"](function (error) {
              warnID(3521, error.message);
              inputManager.setAccelerometerEnabled(false);
            });
          } else {
            inputManager.setAccelerometerEnabled(isEnabled);
          }
        }
        /**
         * @en
         * Sets the accelerometer interval value.
         *
         * @zh
         * 设置加速度计间隔值。
         */
        ;

        _proto.setAccelerometerInterval = function setAccelerometerInterval(interval) {
          if (EDITOR) {
            return;
          }

          inputManager.setAccelerometerInterval(interval);
        };

        /**
         * @en
         * Register an callback of a specific system event type.
         * @zh
         * 注册特定事件类型回调。
         *
         * @param type - The event type
         * @param callback - The event listener's callback
         * @param target - The event listener's target and callee
         */
        _proto.on = function on(type, callback, target, once) {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            return callback;
          }

          _EventTarget.prototype.on.call(this, type, callback, target, once); // Keyboard


          if (type === SystemEventType.KEY_DOWN || type === SystemEventType.KEY_UP) {
            if (!keyboardListener) {
              keyboardListener = EventListener.create({
                event: EventListener.KEYBOARD,
                onKeyPressed: function onKeyPressed(keyCode, event) {
                  event.type = SystemEventType.KEY_DOWN;
                  systemEvent.emit(event.type, event);
                },
                onKeyReleased: function onKeyReleased(keyCode, event) {
                  event.type = SystemEventType.KEY_UP;
                  systemEvent.emit(event.type, event);
                }
              });
              eventManager.addListener(keyboardListener, 256);
            }
          } // Acceleration


          if (type === SystemEventType.DEVICEMOTION) {
            if (!accelerationListener) {
              accelerationListener = EventListener.create({
                event: EventListener.ACCELERATION,
                callback: function callback(acc, event) {
                  event.type = SystemEventType.DEVICEMOTION;
                  legacyCC.systemEvent.emit(event.type, event);
                }
              });
              eventManager.addListener(accelerationListener, 256);
            }
          } // touch


          if (type === SystemEventType.TOUCH_START || type === SystemEventType.TOUCH_MOVE || type === SystemEventType.TOUCH_END || type === SystemEventType.TOUCH_CANCEL) {
            if (!touchListener) {
              touchListener = EventListener.create({
                event: EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function onTouchBegan(touch, event) {
                  event.type = SystemEventType.TOUCH_START;
                  legacyCC.systemEvent.emit(event.type, touch, event);
                  return true;
                },
                onTouchMoved: function onTouchMoved(touch, event) {
                  event.type = SystemEventType.TOUCH_MOVE;
                  legacyCC.systemEvent.emit(event.type, touch, event);
                },
                onTouchEnded: function onTouchEnded(touch, event) {
                  event.type = SystemEventType.TOUCH_END;
                  legacyCC.systemEvent.emit(event.type, touch, event);
                },
                onTouchCancelled: function onTouchCancelled(touch, event) {
                  event.type = SystemEventType.TOUCH_CANCEL;
                  legacyCC.systemEvent.emit(event.type, touch, event);
                }
              });
              eventManager.addListener(touchListener, 256);
            }
          } // mouse


          if (type === SystemEventType.MOUSE_DOWN || type === SystemEventType.MOUSE_MOVE || type === SystemEventType.MOUSE_UP || type === SystemEventType.MOUSE_WHEEL) {
            if (!mouseListener) {
              mouseListener = EventListener.create({
                event: EventListener.MOUSE,
                onMouseDown: function onMouseDown(event) {
                  event.type = SystemEventType.MOUSE_DOWN;
                  legacyCC.systemEvent.emit(event.type, event);
                },
                onMouseMove: function onMouseMove(event) {
                  event.type = SystemEventType.MOUSE_MOVE;
                  legacyCC.systemEvent.emit(event.type, event);
                },
                onMouseUp: function onMouseUp(event) {
                  event.type = SystemEventType.MOUSE_UP;
                  legacyCC.systemEvent.emit(event.type, event);
                },
                onMouseScroll: function onMouseScroll(event) {
                  event.type = SystemEventType.MOUSE_WHEEL;
                  legacyCC.systemEvent.emit(event.type, event);
                }
              });
              eventManager.addListener(mouseListener, 256);
            }
          }

          return callback;
        }
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         */
        ;

        _proto.off = function off(type, callback, target) {
          if (EDITOR && !legacyCC.GAME_VIEW) {
            return;
          }

          _EventTarget.prototype.off.call(this, type, callback, target); // Keyboard


          if (keyboardListener && (type === SystemEventType.KEY_DOWN || type === SystemEventType.KEY_UP)) {
            var hasKeyDownEventListener = this.hasEventListener(SystemEventType.KEY_DOWN);
            var hasKeyUpEventListener = this.hasEventListener(SystemEventType.KEY_UP);

            if (!hasKeyDownEventListener && !hasKeyUpEventListener) {
              eventManager.removeListener(keyboardListener);
              keyboardListener = null;
            }
          } // Acceleration


          if (accelerationListener && type === SystemEventType.DEVICEMOTION) {
            eventManager.removeListener(accelerationListener);
            accelerationListener = null;
          }

          if (touchListener && (type === SystemEventType.TOUCH_START || type === SystemEventType.TOUCH_MOVE || type === SystemEventType.TOUCH_END || type === SystemEventType.TOUCH_CANCEL)) {
            var hasTouchStart = this.hasEventListener(SystemEventType.TOUCH_START);
            var hasTouchMove = this.hasEventListener(SystemEventType.TOUCH_MOVE);
            var hasTouchEnd = this.hasEventListener(SystemEventType.TOUCH_END);
            var hasTouchCancel = this.hasEventListener(SystemEventType.TOUCH_CANCEL);

            if (!hasTouchStart && !hasTouchMove && !hasTouchEnd && !hasTouchCancel) {
              eventManager.removeListener(touchListener);
              touchListener = null;
            }
          }

          if (mouseListener && (type === SystemEventType.MOUSE_DOWN || type === SystemEventType.MOUSE_MOVE || type === SystemEventType.MOUSE_UP || type === SystemEventType.MOUSE_WHEEL)) {
            var hasMouseDown = this.hasEventListener(SystemEventType.MOUSE_DOWN);
            var hasMouseMove = this.hasEventListener(SystemEventType.MOUSE_MOVE);
            var hasMouseUp = this.hasEventListener(SystemEventType.MOUSE_UP);
            var hasMouseWheel = this.hasEventListener(SystemEventType.MOUSE_WHEEL);

            if (!hasMouseDown && !hasMouseMove && !hasMouseUp && !hasMouseWheel) {
              eventManager.removeListener(mouseListener);
              mouseListener = null;
            }
          }
        };

        return SystemEvent;
      }(EventTarget));

      SystemEvent.EventType = SystemEventType;
      legacyCC.SystemEvent = SystemEvent;
      /**
       * @module cc
       */

      /**
       * @en The singleton of the SystemEvent, there should only be one instance to be used globally
       * @zh 系统事件单例，方便全局使用。
       */

      _export("systemEvent", systemEvent = new SystemEvent());

      legacyCC.systemEvent = systemEvent;
    }
  };
});