System.register("q-bundled:///fs/cocos/core/platform/event-manager/event-listener.js", ["../../global-exports.js", "../debug.js", "./event-enum.js"], function (_export, _context) {
  "use strict";

  var legacyCC, logID, assertID, SystemEventType, EventListener, ListenerID, MouseEventListener, TouchOneByOneEventListener, TouchAllAtOnceEventListener, AccelerationEventListener, KeyboardEventListener;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      logID = _debugJs.logID;
      assertID = _debugJs.assertID;
    }, function (_eventEnumJs) {
      SystemEventType = _eventEnumJs.SystemEventType;
    }],
    execute: function () {
      /**
       * @en The base class of event listener.                                                                        <br/>
       * If you need custom listener which with different callback, you need to inherit this class.               <br/>
       * For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
       * EventListenerTouchOneByOne, EventListenerCustom.<br/>
       * @zh 封装用户的事件处理逻辑
       * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 [[create]] 。
       */
      _export("EventListener", EventListener = /*#__PURE__*/function () {
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
        EventListener.create = function create(argObj) {
          assertID(argObj && argObj.event, 1900);
          var listenerType = argObj.event;
          delete argObj.event;
          var listener = null;

          if (listenerType === legacyCC.EventListener.TOUCH_ONE_BY_ONE) {
            listener = new TouchOneByOneEventListener();
          } else if (listenerType === legacyCC.EventListener.TOUCH_ALL_AT_ONCE) {
            listener = new TouchAllAtOnceEventListener();
          } else if (listenerType === legacyCC.EventListener.MOUSE) {
            listener = new MouseEventListener();
          } else if (listenerType === legacyCC.EventListener.KEYBOARD) {
            listener = new KeyboardEventListener();
          } else if (listenerType === legacyCC.EventListener.ACCELERATION) {
            listener = new AccelerationEventListener(argObj.callback);
            delete argObj.callback;
          }

          if (listener) {
            for (var _i = 0, _Object$keys = Object.keys(argObj); _i < _Object$keys.length; _i++) {
              var key = _Object$keys[_i];
              listener[key] = argObj[key];
            }
          }

          return listener;
        } // hack: How to solve the problem of uncertain attribute
        // callback's this object
        ;

        function EventListener(type, listenerID, callback) {
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


        var _proto = EventListener.prototype;

        _proto._setPaused = function _setPaused(paused) {
          this._paused = paused;
        }
        /**
         * @en Checks whether the listener is paused.<br/>
         * @zh 检查侦听器是否已暂停。
         */
        ;

        _proto._isPaused = function _isPaused() {
          return this._paused;
        }
        /**
         * @en Marks the listener was registered by EventDispatcher.<br/>
         * @zh 标记监听器已由 EventDispatcher 注册。
         */
        ;

        _proto._setRegistered = function _setRegistered(registered) {
          this._registered = registered;
        }
        /**
         * @en Checks whether the listener was registered by EventDispatcher<br/>
         * @zh 检查监听器是否已由 EventDispatcher 注册。
         * @private
         */
        ;

        _proto._isRegistered = function _isRegistered() {
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
        ;

        _proto._getType = function _getType() {
          return this._type;
        }
        /**
         * @en Gets the listener ID of this listener<br/>
         * When event is being dispatched, listener ID is used as key for searching listeners according to event type.<br/>
         * @zh 获取此侦听器的侦听器 ID。<br/>
         * 调度事件时，侦听器 ID 用作根据事件类型搜索侦听器的键。
         */
        ;

        _proto._getListenerID = function _getListenerID() {
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
        ;

        _proto._setFixedPriority = function _setFixedPriority(fixedPriority) {
          this._fixedPriority = fixedPriority;
        }
        /**
         * @en Gets the fixed priority of this listener<br/>
         * @zh 获取此侦听器的固定优先级。
         * @return 如果它是场景图优先级侦听器则返回 0 ，则对于固定优先级侦听器则不为零
         */
        ;

        _proto._getFixedPriority = function _getFixedPriority() {
          return this._fixedPriority;
        }
        /**
         * @en Sets scene graph priority for this listener<br/>
         * @zh 设置此侦听器的场景图优先级。
         * @param {Node} node
         */
        ;

        _proto._setSceneGraphPriority = function _setSceneGraphPriority(node) {
          this._target = node;
          this._node = node;
        }
        /**
         * @en Gets scene graph priority of this listener<br/>
         * @zh 获取此侦听器的场景图优先级。
         * @return 如果它是固定优先级侦听器，则为场景图优先级侦听器非 null 。
         */
        ;

        _proto._getSceneGraphPriority = function _getSceneGraphPriority() {
          return this._node;
        }
        /**
         * @en Checks whether the listener is available.<br/>
         * @zh 检测监听器是否有效
         */
        ;

        _proto.checkAvailable = function checkAvailable() {
          return this._onEvent !== null;
        }
        /**
         * @en Clones the listener, its subclasses have to override this method.<br/>
         * @zh 克隆监听器,它的子类必须重写此方法。
         */
        ;

        _proto.clone = function clone() {
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
        ;

        _proto.setEnabled = function setEnabled(enabled) {
          this._isEnabled = enabled;
        }
        /**
         * @en Checks whether the listener is enabled<br/>
         * @zh 检查监听器是否可用。
         */
        ;

        _proto.isEnabled = function isEnabled() {
          return this._isEnabled;
        };

        _createClass(EventListener, [{
          key: "onEvent",
          get: // Whether the listener is enabled
          function get() {
            return this._onEvent;
          }
        }]);

        return EventListener;
      }());

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
      ListenerID = EventListener.ListenerID;

      _export("MouseEventListener", MouseEventListener = /*#__PURE__*/function (_EventListener) {
        _inheritsLoose(MouseEventListener, _EventListener);

        function MouseEventListener() {
          var _this;

          _this = _EventListener.call(this, EventListener.MOUSE, ListenerID.MOUSE, null) || this;
          _this.onMouseDown = null;
          _this.onMouseUp = null;
          _this.onMouseMove = null;
          _this.onMouseScroll = null;

          _this._onEvent = function (event) {
            return _this._callback(event);
          };

          return _this;
        }

        var _proto2 = MouseEventListener.prototype;

        _proto2._callback = function _callback(event) {
          switch (event.eventType) {
            case SystemEventType.MOUSE_DOWN:
              if (this.onMouseDown) {
                this.onMouseDown(event);
              }

              break;

            case SystemEventType.MOUSE_UP:
              if (this.onMouseUp) {
                this.onMouseUp(event);
              }

              break;

            case SystemEventType.MOUSE_MOVE:
              if (this.onMouseMove) {
                this.onMouseMove(event);
              }

              break;

            case SystemEventType.MOUSE_WHEEL:
              if (this.onMouseScroll) {
                this.onMouseScroll(event);
              }

              break;

            default:
              break;
          }
        };

        _proto2.clone = function clone() {
          var eventListener = new MouseEventListener();
          eventListener.onMouseDown = this.onMouseDown;
          eventListener.onMouseUp = this.onMouseUp;
          eventListener.onMouseMove = this.onMouseMove;
          eventListener.onMouseScroll = this.onMouseScroll;
          return eventListener;
        };

        _proto2.checkAvailable = function checkAvailable() {
          return true;
        };

        return MouseEventListener;
      }(EventListener));

      _export("TouchOneByOneEventListener", TouchOneByOneEventListener = /*#__PURE__*/function (_EventListener2) {
        _inheritsLoose(TouchOneByOneEventListener, _EventListener2);

        function TouchOneByOneEventListener() {
          var _this2;

          _this2 = _EventListener2.call(this, EventListener.TOUCH_ONE_BY_ONE, ListenerID.TOUCH_ONE_BY_ONE, null) || this;
          _this2.swallowTouches = false;
          _this2.onTouchBegan = null;
          _this2.onTouchMoved = null;
          _this2.onTouchEnded = null;
          _this2.onTouchCancelled = null;
          _this2._claimedTouches = [];
          return _this2;
        }

        var _proto3 = TouchOneByOneEventListener.prototype;

        _proto3.setSwallowTouches = function setSwallowTouches(needSwallow) {
          this.swallowTouches = needSwallow;
        };

        _proto3.isSwallowTouches = function isSwallowTouches() {
          return this.swallowTouches;
        };

        _proto3.clone = function clone() {
          var eventListener = new TouchOneByOneEventListener();
          eventListener.onTouchBegan = this.onTouchBegan;
          eventListener.onTouchMoved = this.onTouchMoved;
          eventListener.onTouchEnded = this.onTouchEnded;
          eventListener.onTouchCancelled = this.onTouchCancelled;
          eventListener.swallowTouches = this.swallowTouches;
          return eventListener;
        };

        _proto3.checkAvailable = function checkAvailable() {
          if (!this.onTouchBegan) {
            logID(1801);
            return false;
          }

          return true;
        };

        return TouchOneByOneEventListener;
      }(EventListener));

      _export("TouchAllAtOnceEventListener", TouchAllAtOnceEventListener = /*#__PURE__*/function (_EventListener3) {
        _inheritsLoose(TouchAllAtOnceEventListener, _EventListener3);

        function TouchAllAtOnceEventListener() {
          var _this3;

          _this3 = _EventListener3.call(this, EventListener.TOUCH_ALL_AT_ONCE, ListenerID.TOUCH_ALL_AT_ONCE, null) || this;
          _this3.onTouchesBegan = null;
          _this3.onTouchesMoved = null;
          _this3.onTouchesEnded = null;
          _this3.onTouchesCancelled = null;
          return _this3;
        }

        var _proto4 = TouchAllAtOnceEventListener.prototype;

        _proto4.clone = function clone() {
          var eventListener = new TouchAllAtOnceEventListener();
          eventListener.onTouchesBegan = this.onTouchesBegan;
          eventListener.onTouchesMoved = this.onTouchesMoved;
          eventListener.onTouchesEnded = this.onTouchesEnded;
          eventListener.onTouchesCancelled = this.onTouchesCancelled;
          return eventListener;
        };

        _proto4.checkAvailable = function checkAvailable() {
          if (this.onTouchesBegan === null && this.onTouchesMoved === null && this.onTouchesEnded === null && this.onTouchesCancelled === null) {
            logID(1802);
            return false;
          }

          return true;
        };

        return TouchAllAtOnceEventListener;
      }(EventListener)); // Acceleration


      _export("AccelerationEventListener", AccelerationEventListener = /*#__PURE__*/function (_EventListener4) {
        _inheritsLoose(AccelerationEventListener, _EventListener4);

        function AccelerationEventListener(callback) {
          var _this4;

          _this4 = _EventListener4.call(this, EventListener.ACCELERATION, ListenerID.ACCELERATION, null) || this;
          _this4._onAccelerationEvent = null;

          _this4._onEvent = function (event) {
            return _this4._callback(event);
          };

          _this4._onAccelerationEvent = callback;
          return _this4;
        }

        var _proto5 = AccelerationEventListener.prototype;

        _proto5._callback = function _callback(event) {
          if (this._onAccelerationEvent) {
            this._onAccelerationEvent(event.acc, event);
          }
        };

        _proto5.checkAvailable = function checkAvailable() {
          assertID(this._onAccelerationEvent, 1803);
          return true;
        };

        _proto5.clone = function clone() {
          return new AccelerationEventListener(this._onAccelerationEvent);
        };

        return AccelerationEventListener;
      }(EventListener)); // Keyboard


      _export("KeyboardEventListener", KeyboardEventListener = /*#__PURE__*/function (_EventListener5) {
        _inheritsLoose(KeyboardEventListener, _EventListener5);

        function KeyboardEventListener() {
          var _this5;

          _this5 = _EventListener5.call(this, EventListener.KEYBOARD, ListenerID.KEYBOARD, null) || this;
          _this5.onKeyPressed = null;
          _this5.onKeyReleased = null;

          _this5._onEvent = function (event) {
            return _this5._callback(event);
          };

          return _this5;
        }

        var _proto6 = KeyboardEventListener.prototype;

        _proto6._callback = function _callback(event) {
          if (event.isPressed) {
            if (this.onKeyPressed) {
              this.onKeyPressed(event.keyCode, event);
            }
          } else if (this.onKeyReleased) {
            this.onKeyReleased(event.keyCode, event);
          }
        };

        _proto6.clone = function clone() {
          var eventListener = new KeyboardEventListener();
          eventListener.onKeyPressed = this.onKeyPressed;
          eventListener.onKeyReleased = this.onKeyReleased;
          return eventListener;
        };

        _proto6.checkAvailable = function checkAvailable() {
          if (this.onKeyPressed === null && this.onKeyReleased === null) {
            logID(1800);
            return false;
          }

          return true;
        };

        return KeyboardEventListener;
      }(EventListener));

      legacyCC.EventListener = EventListener;
    }
  };
});