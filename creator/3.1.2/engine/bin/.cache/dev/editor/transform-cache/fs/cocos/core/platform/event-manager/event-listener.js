"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardEventListener = exports.AccelerationEventListener = exports.TouchAllAtOnceEventListener = exports.TouchOneByOneEventListener = exports.MouseEventListener = exports.EventListener = void 0;

var _globalExports = require("../../global-exports.js");

var _debug = require("../debug.js");

var _eventEnum = require("./event-enum.js");

/* eslint-disable @typescript-eslint/ban-types */

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @hidden
 */

/**
 * @en The base class of event listener.                                                                        <br/>
 * If you need custom listener which with different callback, you need to inherit this class.               <br/>
 * For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
 * EventListenerTouchOneByOne, EventListenerCustom.<br/>
 * @zh 封装用户的事件处理逻辑
 * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 [[create]] 。
 */
class EventListener {
  /**
   * to cache camera priority
   * @internal
   */

  /**
   * @en The type code of unknown event listener.<br/>
   * @zh 未知的事件监听器类型
   */

  /**
   * @en The type code of one by one touch event listener.<br/>
   * @zh 触摸事件监听器类型，触点会一个一个得分开被派发
   */

  /**
   * @en The type code of all at once touch event listener.<br/>
   * @zh 触摸事件监听器类型，触点会被一次性全部派发
   */

  /**
   * @en The type code of keyboard event listener.<br/>
   * @zh 键盘事件监听器类型
   */

  /**
   * @en The type code of mouse event listener.<br/>
   * @zh 鼠标事件监听器类型
   */

  /**
   * @en The type code of acceleration event listener.<br/>
   * @zh 加速器事件监听器类型
   */

  /**
   * @en The type code of custom event listener.<br/>
   * @zh 自定义事件监听器类型
   */

  /**
   * @en Create a EventListener object with configuration including the event type, handlers and other parameters.<br/>
   * In handlers, this refer to the event listener object itself.<br/>
   * You can also pass custom parameters in the configuration object,<br/>
   * all custom parameters will be polyfilled into the event listener object and can be accessed in handlers.<br/>
   * @zh 通过指定不同的 Event 对象来设置想要创建的事件监听器。
   * @param argObj a json object
   */
  static create(argObj) {
    (0, _debug.assertID)(argObj && argObj.event, 1900);
    const listenerType = argObj.event;
    delete argObj.event;
    let listener = null;

    if (listenerType === _globalExports.legacyCC.EventListener.TOUCH_ONE_BY_ONE) {
      listener = new TouchOneByOneEventListener();
    } else if (listenerType === _globalExports.legacyCC.EventListener.TOUCH_ALL_AT_ONCE) {
      listener = new TouchAllAtOnceEventListener();
    } else if (listenerType === _globalExports.legacyCC.EventListener.MOUSE) {
      listener = new MouseEventListener();
    } else if (listenerType === _globalExports.legacyCC.EventListener.KEYBOARD) {
      listener = new KeyboardEventListener();
    } else if (listenerType === _globalExports.legacyCC.EventListener.ACCELERATION) {
      listener = new AccelerationEventListener(argObj.callback);
      delete argObj.callback;
    }

    if (listener) {
      for (const key of Object.keys(argObj)) {
        listener[key] = argObj[key];
      }
    }

    return listener;
  } // hack: How to solve the problem of uncertain attribute
  // callback's this object


  // Whether the listener is enabled
  get onEvent() {
    return this._onEvent;
  }

  constructor(type, listenerID, callback) {
    this._cameraPriority = 0;
    this.owner = null;
    this.mask = null;
    this._previousIn = false;
    this._target = null;
    this._onEvent = void 0;
    this._type = void 0;
    this._listenerID = void 0;
    this._registered = false;
    this._fixedPriority = 0;
    this._node = null;
    this._paused = true;
    this._isEnabled = true;
    this._onEvent = callback;
    this._type = type || 0;
    this._listenerID = listenerID || '';
  }
  /**
   * @en
   * <p><br/>
   *     Sets paused state for the listener<br/>
   *     The paused state is only used for scene graph priority listeners.<br/>
   *     `EventDispatcher.resumeAllEventListenersForTarget(node)` will set the paused state to `true`,<br/>
   *     while `EventDispatcher.pauseAllEventListenersForTarget(node)` will set it to `false`.<br/>
   *     @note 1) Fixed priority listeners will never get paused. If a fixed priority doesn't want to receive events,<br/>
   *              call `setEnabled(false)` instead.<br/>
   *            2) In `Node`'s onEnter and onExit, the `paused state` of the listeners<br/>
   *              which associated with that node will be automatically updated.<br/>
   * </p><br/>
   * @zh
   * *为侦听器设置暂停状态<br/>
   * 暂停状态仅用于场景图优先级侦听器。<br/>
   * `EventDispatcher :: resumeAllEventListenersForTarget（node）`将暂停状态设置为`true`，<br/>
   * 而`EventDispatcher :: pauseAllEventListenersForTarget（node）`将它设置为`false`。<br/>
   * 注意：<br/>
   * - 固定优先级侦听器永远不会被暂停。 如果固定优先级不想接收事件，改为调用`setEnabled（false）`。<br/>
   * - 在“Node”的onEnter和onExit中，监听器的“暂停状态”与该节点关联的*将自动更新。
   */


  _setPaused(paused) {
    this._paused = paused;
  }
  /**
   * @en Checks whether the listener is paused.<br/>
   * @zh 检查侦听器是否已暂停。
   */


  _isPaused() {
    return this._paused;
  }
  /**
   * @en Marks the listener was registered by EventDispatcher.<br/>
   * @zh 标记监听器已由 EventDispatcher 注册。
   */


  _setRegistered(registered) {
    this._registered = registered;
  }
  /**
   * @en Checks whether the listener was registered by EventDispatcher<br/>
   * @zh 检查监听器是否已由 EventDispatcher 注册。
   * @private
   */


  _isRegistered() {
    return this._registered;
  }
  /**
   * @en Gets the type of this listener<br/>
   * note： It's different from `EventType`, e.g.<br/>
   * TouchEvent has two kinds of event listeners - EventListenerOneByOne, EventListenerAllAtOnce<br/>
   * @zh 获取此侦听器的类型<br/>
   * 注意：它与`EventType`不同，例如<br/>
   * TouchEvent 有两种事件监听器 -  EventListenerOneByOne，EventListenerAllAtOnce
   */


  _getType() {
    return this._type;
  }
  /**
   * @en Gets the listener ID of this listener<br/>
   * When event is being dispatched, listener ID is used as key for searching listeners according to event type.<br/>
   * @zh 获取此侦听器的侦听器 ID。<br/>
   * 调度事件时，侦听器 ID 用作根据事件类型搜索侦听器的键。
   */


  _getListenerID() {
    return this._listenerID;
  }
  /**
   * @en Sets the fixed priority for this listener<br/>
   * note: This method is only used for `fixed priority listeners`,<br/>
   *   it needs to access a non-zero value. 0 is reserved for scene graph priority listeners<br/>
   * @zh 设置此侦听器的固定优先级。<br/>
   * 注意：此方法仅用于“固定优先级侦听器”，<br/>
   * 它需要访问非零值。 0保留给场景图优先级侦听器。
   */


  _setFixedPriority(fixedPriority) {
    this._fixedPriority = fixedPriority;
  }
  /**
   * @en Gets the fixed priority of this listener<br/>
   * @zh 获取此侦听器的固定优先级。
   * @return 如果它是场景图优先级侦听器则返回 0 ，则对于固定优先级侦听器则不为零
   */


  _getFixedPriority() {
    return this._fixedPriority;
  }
  /**
   * @en Sets scene graph priority for this listener<br/>
   * @zh 设置此侦听器的场景图优先级。
   * @param {Node} node
   */


  _setSceneGraphPriority(node) {
    this._target = node;
    this._node = node;
  }
  /**
   * @en Gets scene graph priority of this listener<br/>
   * @zh 获取此侦听器的场景图优先级。
   * @return 如果它是固定优先级侦听器，则为场景图优先级侦听器非 null 。
   */


  _getSceneGraphPriority() {
    return this._node;
  }
  /**
   * @en Checks whether the listener is available.<br/>
   * @zh 检测监听器是否有效
   */


  checkAvailable() {
    return this._onEvent !== null;
  }
  /**
   * @en Clones the listener, its subclasses have to override this method.<br/>
   * @zh 克隆监听器,它的子类必须重写此方法。
   */


  clone() {
    return null;
  }
  /**
   * @en
   * Enables or disables the listener<br/>
   * note: Only listeners with `enabled` state will be able to receive events.<br/>
   * When an listener was initialized, it's enabled by default.<br/>
   * An event listener can receive events when it is enabled and is not paused.<br/>
   * paused state is always false when it is a fixed priority listener.<br/>
   * @zh
   * 启用或禁用监听器。<br/>
   * 注意：只有处于“启用”状态的侦听器才能接收事件。<br/>
   * 初始化侦听器时，默认情况下启用它。<br/>
   * 事件侦听器可以在启用且未暂停时接收事件。<br/>
   * 当固定优先级侦听器时，暂停状态始终为false。<br/>
   */


  setEnabled(enabled) {
    this._isEnabled = enabled;
  }
  /**
   * @en Checks whether the listener is enabled<br/>
   * @zh 检查监听器是否可用。
   */


  isEnabled() {
    return this._isEnabled;
  }

}

exports.EventListener = EventListener;
EventListener.UNKNOWN = 0;
EventListener.TOUCH_ONE_BY_ONE = 1;
EventListener.TOUCH_ALL_AT_ONCE = 2;
EventListener.KEYBOARD = 3;
EventListener.MOUSE = 4;
EventListener.ACCELERATION = 6;
EventListener.CUSTOM = 8;
EventListener.ListenerID = {
  MOUSE: '__cc_mouse',
  TOUCH_ONE_BY_ONE: '__cc_touch_one_by_one',
  TOUCH_ALL_AT_ONCE: '__cc_touch_all_at_once',
  KEYBOARD: '__cc_keyboard',
  ACCELERATION: '__cc_acceleration'
};
const ListenerID = EventListener.ListenerID;

class MouseEventListener extends EventListener {
  constructor() {
    super(EventListener.MOUSE, ListenerID.MOUSE, null);
    this.onMouseDown = null;
    this.onMouseUp = null;
    this.onMouseMove = null;
    this.onMouseScroll = null;

    this._onEvent = event => this._callback(event);
  }

  _callback(event) {
    switch (event.eventType) {
      case _eventEnum.SystemEventType.MOUSE_DOWN:
        if (this.onMouseDown) {
          this.onMouseDown(event);
        }

        break;

      case _eventEnum.SystemEventType.MOUSE_UP:
        if (this.onMouseUp) {
          this.onMouseUp(event);
        }

        break;

      case _eventEnum.SystemEventType.MOUSE_MOVE:
        if (this.onMouseMove) {
          this.onMouseMove(event);
        }

        break;

      case _eventEnum.SystemEventType.MOUSE_WHEEL:
        if (this.onMouseScroll) {
          this.onMouseScroll(event);
        }

        break;

      default:
        break;
    }
  }

  clone() {
    const eventListener = new MouseEventListener();
    eventListener.onMouseDown = this.onMouseDown;
    eventListener.onMouseUp = this.onMouseUp;
    eventListener.onMouseMove = this.onMouseMove;
    eventListener.onMouseScroll = this.onMouseScroll;
    return eventListener;
  }

  checkAvailable() {
    return true;
  }

}

exports.MouseEventListener = MouseEventListener;

class TouchOneByOneEventListener extends EventListener {
  constructor() {
    super(EventListener.TOUCH_ONE_BY_ONE, ListenerID.TOUCH_ONE_BY_ONE, null);
    this.swallowTouches = false;
    this.onTouchBegan = null;
    this.onTouchMoved = null;
    this.onTouchEnded = null;
    this.onTouchCancelled = null;
    this._claimedTouches = [];
  }

  setSwallowTouches(needSwallow) {
    this.swallowTouches = needSwallow;
  }

  isSwallowTouches() {
    return this.swallowTouches;
  }

  clone() {
    const eventListener = new TouchOneByOneEventListener();
    eventListener.onTouchBegan = this.onTouchBegan;
    eventListener.onTouchMoved = this.onTouchMoved;
    eventListener.onTouchEnded = this.onTouchEnded;
    eventListener.onTouchCancelled = this.onTouchCancelled;
    eventListener.swallowTouches = this.swallowTouches;
    return eventListener;
  }

  checkAvailable() {
    if (!this.onTouchBegan) {
      (0, _debug.logID)(1801);
      return false;
    }

    return true;
  }

}

exports.TouchOneByOneEventListener = TouchOneByOneEventListener;

class TouchAllAtOnceEventListener extends EventListener {
  constructor() {
    super(EventListener.TOUCH_ALL_AT_ONCE, ListenerID.TOUCH_ALL_AT_ONCE, null);
    this.onTouchesBegan = null;
    this.onTouchesMoved = null;
    this.onTouchesEnded = null;
    this.onTouchesCancelled = null;
  }

  clone() {
    const eventListener = new TouchAllAtOnceEventListener();
    eventListener.onTouchesBegan = this.onTouchesBegan;
    eventListener.onTouchesMoved = this.onTouchesMoved;
    eventListener.onTouchesEnded = this.onTouchesEnded;
    eventListener.onTouchesCancelled = this.onTouchesCancelled;
    return eventListener;
  }

  checkAvailable() {
    if (this.onTouchesBegan === null && this.onTouchesMoved === null && this.onTouchesEnded === null && this.onTouchesCancelled === null) {
      (0, _debug.logID)(1802);
      return false;
    }

    return true;
  }

} // Acceleration


exports.TouchAllAtOnceEventListener = TouchAllAtOnceEventListener;

class AccelerationEventListener extends EventListener {
  constructor(callback) {
    super(EventListener.ACCELERATION, ListenerID.ACCELERATION, null);
    this._onAccelerationEvent = null;

    this._onEvent = event => this._callback(event);

    this._onAccelerationEvent = callback;
  }

  _callback(event) {
    if (this._onAccelerationEvent) {
      this._onAccelerationEvent(event.acc, event);
    }
  }

  checkAvailable() {
    (0, _debug.assertID)(this._onAccelerationEvent, 1803);
    return true;
  }

  clone() {
    return new AccelerationEventListener(this._onAccelerationEvent);
  }

} // Keyboard


exports.AccelerationEventListener = AccelerationEventListener;

class KeyboardEventListener extends EventListener {
  constructor() {
    super(EventListener.KEYBOARD, ListenerID.KEYBOARD, null);
    this.onKeyPressed = null;
    this.onKeyReleased = null;

    this._onEvent = event => this._callback(event);
  }

  _callback(event) {
    if (event.isPressed) {
      if (this.onKeyPressed) {
        this.onKeyPressed(event.keyCode, event);
      }
    } else if (this.onKeyReleased) {
      this.onKeyReleased(event.keyCode, event);
    }
  }

  clone() {
    const eventListener = new KeyboardEventListener();
    eventListener.onKeyPressed = this.onKeyPressed;
    eventListener.onKeyReleased = this.onKeyReleased;
    return eventListener;
  }

  checkAvailable() {
    if (this.onKeyPressed === null && this.onKeyReleased === null) {
      (0, _debug.logID)(1800);
      return false;
    }

    return true;
  }

}

exports.KeyboardEventListener = KeyboardEventListener;
_globalExports.legacyCC.EventListener = EventListener;