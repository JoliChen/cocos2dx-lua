"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemEvent = exports.SystemEvent = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _eventTarget = require("../../event/event-target.js");

var _eventEnum = require("./event-enum.js");

var _eventListener = require("./event-listener.js");

var _eventManager = _interopRequireDefault(require("./event-manager.js"));

var _inputManager = _interopRequireDefault(require("./input-manager.js"));

var _globalExports = require("../../global-exports.js");

var _debug = require("../debug.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @module event
 */
let keyboardListener = null;
let accelerationListener = null;
let touchListener = null;
let mouseListener = null;
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

class SystemEvent extends _eventTarget.EventTarget {
  constructor() {
    super();
  }
  /**
   * @en
   * Sets whether to enable the accelerometer event listener or not.
   *
   * @zh
   * 是否启用加速度计事件。
   */


  setAccelerometerEnabled(isEnabled) {
    if (_internal253Aconstants.EDITOR) {
      return;
    } // for iOS 13+


    if (isEnabled && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        (0, _debug.logID)(3520, response);

        _inputManager.default.setAccelerometerEnabled(response === 'granted');
      }).catch(error => {
        (0, _debug.warnID)(3521, error.message);

        _inputManager.default.setAccelerometerEnabled(false);
      });
    } else {
      _inputManager.default.setAccelerometerEnabled(isEnabled);
    }
  }
  /**
   * @en
   * Sets the accelerometer interval value.
   *
   * @zh
   * 设置加速度计间隔值。
   */


  setAccelerometerInterval(interval) {
    if (_internal253Aconstants.EDITOR) {
      return;
    }

    _inputManager.default.setAccelerometerInterval(interval);
  }

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
  on(type, callback, target, once) {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      return callback;
    }

    super.on(type, callback, target, once); // Keyboard

    if (type === _eventEnum.SystemEventType.KEY_DOWN || type === _eventEnum.SystemEventType.KEY_UP) {
      if (!keyboardListener) {
        keyboardListener = _eventListener.EventListener.create({
          event: _eventListener.EventListener.KEYBOARD,

          onKeyPressed(keyCode, event) {
            event.type = _eventEnum.SystemEventType.KEY_DOWN;
            systemEvent.emit(event.type, event);
          },

          onKeyReleased(keyCode, event) {
            event.type = _eventEnum.SystemEventType.KEY_UP;
            systemEvent.emit(event.type, event);
          }

        });

        _eventManager.default.addListener(keyboardListener, 256);
      }
    } // Acceleration


    if (type === _eventEnum.SystemEventType.DEVICEMOTION) {
      if (!accelerationListener) {
        accelerationListener = _eventListener.EventListener.create({
          event: _eventListener.EventListener.ACCELERATION,

          callback(acc, event) {
            event.type = _eventEnum.SystemEventType.DEVICEMOTION;

            _globalExports.legacyCC.systemEvent.emit(event.type, event);
          }

        });

        _eventManager.default.addListener(accelerationListener, 256);
      }
    } // touch


    if (type === _eventEnum.SystemEventType.TOUCH_START || type === _eventEnum.SystemEventType.TOUCH_MOVE || type === _eventEnum.SystemEventType.TOUCH_END || type === _eventEnum.SystemEventType.TOUCH_CANCEL) {
      if (!touchListener) {
        touchListener = _eventListener.EventListener.create({
          event: _eventListener.EventListener.TOUCH_ONE_BY_ONE,

          onTouchBegan(touch, event) {
            event.type = _eventEnum.SystemEventType.TOUCH_START;

            _globalExports.legacyCC.systemEvent.emit(event.type, touch, event);

            return true;
          },

          onTouchMoved(touch, event) {
            event.type = _eventEnum.SystemEventType.TOUCH_MOVE;

            _globalExports.legacyCC.systemEvent.emit(event.type, touch, event);
          },

          onTouchEnded(touch, event) {
            event.type = _eventEnum.SystemEventType.TOUCH_END;

            _globalExports.legacyCC.systemEvent.emit(event.type, touch, event);
          },

          onTouchCancelled(touch, event) {
            event.type = _eventEnum.SystemEventType.TOUCH_CANCEL;

            _globalExports.legacyCC.systemEvent.emit(event.type, touch, event);
          }

        });

        _eventManager.default.addListener(touchListener, 256);
      }
    } // mouse


    if (type === _eventEnum.SystemEventType.MOUSE_DOWN || type === _eventEnum.SystemEventType.MOUSE_MOVE || type === _eventEnum.SystemEventType.MOUSE_UP || type === _eventEnum.SystemEventType.MOUSE_WHEEL) {
      if (!mouseListener) {
        mouseListener = _eventListener.EventListener.create({
          event: _eventListener.EventListener.MOUSE,

          onMouseDown(event) {
            event.type = _eventEnum.SystemEventType.MOUSE_DOWN;

            _globalExports.legacyCC.systemEvent.emit(event.type, event);
          },

          onMouseMove(event) {
            event.type = _eventEnum.SystemEventType.MOUSE_MOVE;

            _globalExports.legacyCC.systemEvent.emit(event.type, event);
          },

          onMouseUp(event) {
            event.type = _eventEnum.SystemEventType.MOUSE_UP;

            _globalExports.legacyCC.systemEvent.emit(event.type, event);
          },

          onMouseScroll(event) {
            event.type = _eventEnum.SystemEventType.MOUSE_WHEEL;

            _globalExports.legacyCC.systemEvent.emit(event.type, event);
          }

        });

        _eventManager.default.addListener(mouseListener, 256);
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


  off(type, callback, target) {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW) {
      return;
    }

    super.off(type, callback, target); // Keyboard

    if (keyboardListener && (type === _eventEnum.SystemEventType.KEY_DOWN || type === _eventEnum.SystemEventType.KEY_UP)) {
      const hasKeyDownEventListener = this.hasEventListener(_eventEnum.SystemEventType.KEY_DOWN);
      const hasKeyUpEventListener = this.hasEventListener(_eventEnum.SystemEventType.KEY_UP);

      if (!hasKeyDownEventListener && !hasKeyUpEventListener) {
        _eventManager.default.removeListener(keyboardListener);

        keyboardListener = null;
      }
    } // Acceleration


    if (accelerationListener && type === _eventEnum.SystemEventType.DEVICEMOTION) {
      _eventManager.default.removeListener(accelerationListener);

      accelerationListener = null;
    }

    if (touchListener && (type === _eventEnum.SystemEventType.TOUCH_START || type === _eventEnum.SystemEventType.TOUCH_MOVE || type === _eventEnum.SystemEventType.TOUCH_END || type === _eventEnum.SystemEventType.TOUCH_CANCEL)) {
      const hasTouchStart = this.hasEventListener(_eventEnum.SystemEventType.TOUCH_START);
      const hasTouchMove = this.hasEventListener(_eventEnum.SystemEventType.TOUCH_MOVE);
      const hasTouchEnd = this.hasEventListener(_eventEnum.SystemEventType.TOUCH_END);
      const hasTouchCancel = this.hasEventListener(_eventEnum.SystemEventType.TOUCH_CANCEL);

      if (!hasTouchStart && !hasTouchMove && !hasTouchEnd && !hasTouchCancel) {
        _eventManager.default.removeListener(touchListener);

        touchListener = null;
      }
    }

    if (mouseListener && (type === _eventEnum.SystemEventType.MOUSE_DOWN || type === _eventEnum.SystemEventType.MOUSE_MOVE || type === _eventEnum.SystemEventType.MOUSE_UP || type === _eventEnum.SystemEventType.MOUSE_WHEEL)) {
      const hasMouseDown = this.hasEventListener(_eventEnum.SystemEventType.MOUSE_DOWN);
      const hasMouseMove = this.hasEventListener(_eventEnum.SystemEventType.MOUSE_MOVE);
      const hasMouseUp = this.hasEventListener(_eventEnum.SystemEventType.MOUSE_UP);
      const hasMouseWheel = this.hasEventListener(_eventEnum.SystemEventType.MOUSE_WHEEL);

      if (!hasMouseDown && !hasMouseMove && !hasMouseUp && !hasMouseWheel) {
        _eventManager.default.removeListener(mouseListener);

        mouseListener = null;
      }
    }
  }

}

exports.SystemEvent = SystemEvent;
SystemEvent.EventType = _eventEnum.SystemEventType;
_globalExports.legacyCC.SystemEvent = SystemEvent;
/**
 * @module cc
 */

/**
 * @en The singleton of the SystemEvent, there should only be one instance to be used globally
 * @zh 系统事件单例，方便全局使用。
 */

const systemEvent = new SystemEvent();
exports.systemEvent = systemEvent;
_globalExports.legacyCC.systemEvent = systemEvent;