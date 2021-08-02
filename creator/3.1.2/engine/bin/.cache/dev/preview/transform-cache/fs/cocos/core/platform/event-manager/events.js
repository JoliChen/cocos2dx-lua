System.register("q-bundled:///fs/cocos/core/platform/event-manager/events.js", ["../../event/event.js", "../../math/vec2.js", "../../global-exports.js"], function (_export, _context) {
  "use strict";

  var Event, Vec2, legacyCC, _vec2, EventMouse, EventTouch, EventAcceleration, EventKeyboard;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_eventEventJs) {
      Event = _eventEventJs.default;
    }, function (_mathVec2Js) {
      Vec2 = _mathVec2Js.Vec2;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      _vec2 = new Vec2();
      /**
       * @en The mouse event
       * @zh 鼠标事件类型
       */

      _export("EventMouse", EventMouse = /*#__PURE__*/function (_Event) {
        _inheritsLoose(EventMouse, _Event);

        /**
         * @en The default tag when no button is pressed
         * @zh 按键默认的缺省状态
         */

        /**
         * @en The tag of mouse's left button.
         * @zh 鼠标左键的标签。
         */

        /**
         * @en The tag of mouse's right button  (The right button number is 2 on browser).
         * @zh 鼠标右键的标签。
         */

        /**
         * @en The tag of mouse's middle button.
         * @zh 鼠标中键的标签。
         */

        /**
         * @en The tag of mouse's button 4.
         * @zh 鼠标按键 4 的标签。
         */

        /**
         * @en The tag of mouse's button 5.
         * @zh 鼠标按键 5 的标签。
         */

        /**
         * @en The tag of mouse's button 6.
         * @zh 鼠标按键 6 的标签。
         */

        /**
         * @en The tag of mouse's button 7.
         * @zh 鼠标按键 7 的标签。
         */

        /**
         * @en The tag of mouse's button 8.
         * @zh 鼠标按键 8 的标签。
         */

        /**
         * @en Mouse movement on x axis of the UI coordinate system.
         * @zh 鼠标在 UI 坐标系下 X 轴上的移动距离
         */

        /**
         * @en Mouse movement on y axis of the UI coordinate system.
         * @zh 鼠标在 UI 坐标系下 Y 轴上的移动距离
         */

        /**
         * @en The type of the event, possible values are UP, DOWN, MOVE, SCROLL
         * @zh 鼠标事件类型，可以是 UP, DOWN, MOVE, CANCELED。
         */

        /**
         * @param eventType - The type of the event, possible values are UP, DOWN, MOVE, SCROLL
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         */
        function EventMouse(eventType, bubbles, prevLoc) {
          var _this;

          _this = _Event.call(this, Event.MOUSE, bubbles) || this;
          _this.movementX = 0;
          _this.movementY = 0;
          _this.eventType = void 0;
          _this._button = EventMouse.BUTTON_MISSING;
          _this._x = 0;
          _this._y = 0;
          _this._prevX = 0;
          _this._prevY = 0;
          _this._scrollX = 0;
          _this._scrollY = 0;
          _this.eventType = eventType;

          if (prevLoc) {
            _this._prevX = prevLoc.x;
            _this._prevY = prevLoc.y;
          }

          return _this;
        }
        /**
         * @en Sets scroll data of the mouse.
         * @zh 设置鼠标滚轮的滚动数据。
         * @param scrollX - The scroll value on x axis
         * @param scrollY - The scroll value on y axis
         */


        var _proto = EventMouse.prototype;

        _proto.setScrollData = function setScrollData(scrollX, scrollY) {
          this._scrollX = scrollX;
          this._scrollY = scrollY;
        }
        /**
         * @en Returns the scroll value on x axis.
         * @zh 获取鼠标滚动的 X 轴距离，只有滚动时才有效。
         */
        ;

        _proto.getScrollX = function getScrollX() {
          return this._scrollX;
        }
        /**
         * @en Returns the scroll value on y axis.
         * @zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
         */
        ;

        _proto.getScrollY = function getScrollY() {
          return this._scrollY;
        }
        /**
         * @en Sets cursor location.
         * @zh 设置当前鼠标位置。
         * @param x - The location on x axis
         * @param y - The location on y axis
         */
        ;

        _proto.setLocation = function setLocation(x, y) {
          this._x = x;
          this._y = y;
        }
        /**
         * @en Returns cursor location.
         * @zh 获取鼠标相对于左下角位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getLocation = function getLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._x, this._y);
          return out;
        }
        /**
         * @en Returns the current cursor location in game view coordinates.
         * @zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getLocationInView = function getLocationInView(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._x, legacyCC.view._designResolutionSize.height - this._y);
          return out;
        }
        /**
         * @en Returns the current cursor location in ui coordinates.
         * @zh 获取当前事件在 UI 窗口内的坐标位置，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUILocation = function getUILocation(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._x, this._y);

          legacyCC.view._convertPointWithScale(out);

          return out;
        }
        /**
         * @en Returns the previous touch location.
         * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getPreviousLocation = function getPreviousLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._prevX, this._prevY);
          return out;
        }
        /**
         * @en Returns the previous touch location.
         * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIPreviousLocation = function getUIPreviousLocation(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._prevX, this._prevY);

          legacyCC.view._convertPointWithScale(out);

          return out;
        }
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getDelta = function getDelta(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, this._x - this._prevX, this._y - this._prevY);
          return out;
        }
        /**
         * @en Returns the X axis delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的 X 轴距离。
         */
        ;

        _proto.getDeltaX = function getDeltaX() {
          return this._x - this._prevX;
        }
        /**
         * @en Returns the Y axis delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的 Y 轴距离。
         */
        ;

        _proto.getDeltaY = function getDeltaY() {
          return this._y - this._prevY;
        }
        /**
         * @en Returns the delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto.getUIDelta = function getUIDelta(out) {
          if (!out) {
            out = new Vec2();
          }

          Vec2.set(out, (this._x - this._prevX) / legacyCC.view.getScaleX(), (this._y - this._prevY) / legacyCC.view.getScaleY());
          return out;
        }
        /**
         * @en Returns the X axis delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 X 轴距离。
         */
        ;

        _proto.getUIDeltaX = function getUIDeltaX() {
          return (this._x - this._prevX) / legacyCC.view.getScaleX();
        }
        /**
         * @en Returns the Y axis delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 Y 轴距离。
         */
        ;

        _proto.getUIDeltaY = function getUIDeltaY() {
          return (this._y - this._prevY) / legacyCC.view.getScaleY();
        }
        /**
         * @en Sets mouse button code.
         * @zh 设置鼠标按键。
         * @param button - The button code
         */
        ;

        _proto.setButton = function setButton(button) {
          this._button = button;
        }
        /**
         * @en Returns mouse button code.
         * @zh 获取鼠标按键。
         */
        ;

        _proto.getButton = function getButton() {
          return this._button;
        }
        /**
         * @en Returns location data on X axis.
         * @zh 获取鼠标当前 X 轴位置。
         */
        ;

        _proto.getLocationX = function getLocationX() {
          return this._x;
        }
        /**
         * @en Returns location data on Y axis.
         * @zh 获取鼠标当前 Y 轴位置。
         */
        ;

        _proto.getLocationY = function getLocationY() {
          return this._y;
        }
        /**
         * @en Returns location data on X axis.
         * @zh 获取鼠标当前 X 轴位置。
         */
        ;

        _proto.getUILocationX = function getUILocationX() {
          var viewport = legacyCC.view.getViewportRect();
          return (this._x - viewport.x) / legacyCC.view.getScaleX();
        }
        /**
         * @en Returns location data on Y axis.
         * @zh 获取鼠标当前 Y 轴位置。
         */
        ;

        _proto.getUILocationY = function getUILocationY() {
          var viewport = legacyCC.view.getViewportRect();
          return (this._y - viewport.y) / legacyCC.view.getScaleY();
        };

        return EventMouse;
      }(Event));
      /**
       * @en
       * The touch event.
       *
       * @zh
       * 触摸事件。
       */


      EventMouse.BUTTON_MISSING = -1;
      EventMouse.BUTTON_LEFT = 0;
      EventMouse.BUTTON_RIGHT = 2;
      EventMouse.BUTTON_MIDDLE = 1;
      EventMouse.BUTTON_4 = 3;
      EventMouse.BUTTON_5 = 4;
      EventMouse.BUTTON_6 = 5;
      EventMouse.BUTTON_7 = 6;
      EventMouse.BUTTON_8 = 7;

      _export("EventTouch", EventTouch = /*#__PURE__*/function (_Event2) {
        _inheritsLoose(EventTouch, _Event2);

        /**
         * @en The maximum touch point numbers simultaneously
         * @zh 同时存在的最大触点数量。
         */

        /**
         * @en The current touch object
         * @zh 当前触点对象
         */

        /**
         * @en Indicate whether the touch event is simulated or real
         * @zh 表示触摸事件是真实触点触发的还是模拟的
         */

        /**
         * @param touches - An array of current touches
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         * @param eventCode - The type code of the touch event
         */
        function EventTouch(changedTouches, bubbles, eventCode, touches) {
          var _this2;

          _this2 = _Event2.call(this, Event.TOUCH, bubbles) || this;
          _this2.touch = null;
          _this2.simulate = false;
          _this2._eventCode = void 0;
          _this2._touches = void 0;
          _this2._allTouches = void 0;
          _this2._eventCode = eventCode || '';
          _this2._touches = changedTouches || [];
          _this2._allTouches = touches || [];
          return _this2;
        }
        /**
         * @en Returns event type code.
         * @zh 获取触摸事件类型。
         */


        var _proto2 = EventTouch.prototype;

        _proto2.getEventCode = function getEventCode() {
          return this._eventCode;
        }
        /**
         * @en Returns touches of event.
         * @zh 获取有变动的触摸点的列表。
         * 注意：第一根手指按下不动，接着按第二根手指，这时候触点信息就只有变动的这根手指（第二根手指）的信息。
         * 如果需要获取全部手指的信息，请使用 `getAllTouches`。
         */
        ;

        _proto2.getTouches = function getTouches() {
          return this._touches;
        }
        /**
         * @en Returns touches of event.
         * @zh 获取所有触摸点的列表。
         * 注意：如果手指行为是 touch end，这个时候列表是没有该手指信息的。如需知道该手指信息，可通过 `getTouches` 获取识别。
         */
        ;

        _proto2.getAllTouches = function getAllTouches() {
          return this._allTouches;
        }
        /**
         * @en Sets touch location.
         * @zh 设置当前触点位置
         * @param x - The current touch location on the x axis
         * @param y - The current touch location on the y axis
         */
        ;

        _proto2.setLocation = function setLocation(x, y) {
          if (this.touch) {
            this.touch.setTouchInfo(this.touch.getID(), x, y);
          }
        }
        /**
         * @en Returns the current touch location.
         * @zh 获取触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getLocation = function getLocation(out) {
          return this.touch ? this.touch.getLocation(out) : new Vec2();
        }
        /**
         * @en Returns the current touch location in UI coordinates.
         * @zh 获取 UI 坐标系下的触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getUILocation = function getUILocation(out) {
          return this.touch ? this.touch.getUILocation(out) : new Vec2();
        }
        /**
         * @en Returns the current touch location in game screen coordinates.
         * @zh 获取当前触点在游戏窗口中的位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getLocationInView = function getLocationInView(out) {
          return this.touch ? this.touch.getLocationInView(out) : new Vec2();
        }
        /**
         * @en Returns the previous touch location.
         * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getPreviousLocation = function getPreviousLocation(out) {
          return this.touch ? this.touch.getPreviousLocation(out) : new Vec2();
        }
        /**
         * @en Returns the start touch location.
         * @zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getStartLocation = function getStartLocation(out) {
          return this.touch ? this.touch.getStartLocation(out) : new Vec2();
        }
        /**
         * @en Returns the start touch location in UI coordinates.
         * @zh 获取触点落下时的 UI 世界下位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getUIStartLocation = function getUIStartLocation(out) {
          return this.touch ? this.touch.getUIStartLocation(out) : new Vec2();
        }
        /**
         * @en Returns the id of the current touch point.
         * @zh 获取触点的标识 ID，可以用来在多点触摸中跟踪触点。
         */
        ;

        _proto2.getID = function getID() {
          return this.touch ? this.touch.getID() : null;
        }
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        ;

        _proto2.getDelta = function getDelta(out) {
          return this.touch ? this.touch.getDelta(out) : new Vec2();
        }
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件 UI 世界下移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
        */
        ;

        _proto2.getUIDelta = function getUIDelta(out) {
          return this.touch ? this.touch.getUIDelta(out) : new Vec2();
        }
        /**
         * @en Returns the X axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 x 轴距离。
         */
        ;

        _proto2.getDeltaX = function getDeltaX() {
          return this.touch ? this.touch.getDelta(_vec2).x : 0;
        }
        /**
         * @en Returns the Y axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 y 轴距离。
         */
        ;

        _proto2.getDeltaY = function getDeltaY() {
          return this.touch ? this.touch.getDelta(_vec2).y : 0;
        }
        /**
         * @en Returns location X axis data.
         * @zh 获取当前触点 X 轴位置。
         */
        ;

        _proto2.getLocationX = function getLocationX() {
          return this.touch ? this.touch.getLocationX() : 0;
        }
        /**
         * @en Returns location Y axis data.
         * @zh 获取当前触点 Y 轴位置。
         */
        ;

        _proto2.getLocationY = function getLocationY() {
          return this.touch ? this.touch.getLocationY() : 0;
        };

        return EventTouch;
      }(Event));
      /**
       * @en
       * The acceleration event.
       * @zh
       * 加速计事件。
       */


      EventTouch.MAX_TOUCHES = 5;

      _export("EventAcceleration", EventAcceleration = /*#__PURE__*/function (_Event3) {
        _inheritsLoose(EventAcceleration, _Event3);

        /**
         * @en The acceleration object
         * @zh 加速度对象
         */

        /**
         * @param acc - The acceleration
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         */
        function EventAcceleration(acc, bubbles) {
          var _this3;

          _this3 = _Event3.call(this, Event.ACCELERATION, bubbles) || this;
          _this3.acc = void 0;
          _this3.acc = acc;
          return _this3;
        }

        return EventAcceleration;
      }(Event));
      /**
       * @en
       * The keyboard event.
       * @zh
       * 键盘事件。
       */


      _export("EventKeyboard", EventKeyboard = /*#__PURE__*/function (_Event4) {
        _inheritsLoose(EventKeyboard, _Event4);

        /**
         * @en The keyCode read-only property represents a system and implementation dependent numerical code
         * identifying the unmodified value of the pressed key.
         * This is usually the decimal ASCII (RFC 20) or Windows 1252 code corresponding to the key.
         * If the key can't be identified, this value is 0.
         * @zh keyCode 是只读属性它表示一个系统和依赖于实现的数字代码，可以识别按键的未修改值。
         * 这通常是十进制 ASCII (RFC20) 或者 Windows 1252 代码，所对应的密钥。
         * 如果无法识别该键，则该值为 0。
         */

        /**
         * @en Raw DOM KeyboardEvent.
         * @zh 原始 DOM KeyboardEvent 事件对象
         */

        /**
         * @en Indicates whether the current key is being pressed
         * @zh 表示当前按键是否正在被按下
         */

        /**
         * @param keyCode - The key code of the current key or the DOM KeyboardEvent
         * @param isPressed - Indicates whether the current key is being pressed
         * @param bubbles - Indicates whether the event bubbles up through the hierarchy or not.
         */
        function EventKeyboard(keyCode, isPressed, bubbles) {
          var _this4;

          _this4 = _Event4.call(this, Event.KEYBOARD, bubbles) || this;
          _this4.keyCode = void 0;
          _this4.rawEvent = void 0;
          _this4.isPressed = void 0;

          if (typeof keyCode === 'number') {
            _this4.keyCode = keyCode;
          } else {
            _this4.keyCode = keyCode.keyCode;
            _this4.rawEvent = keyCode;
          }

          _this4.isPressed = isPressed;
          return _this4;
        }

        return EventKeyboard;
      }(Event)); // @ts-expect-error TODO


      Event.EventMouse = EventMouse; // @ts-expect-error TODO

      Event.EventTouch = EventTouch; // @ts-expect-error TODO

      Event.EventAcceleration = EventAcceleration; // @ts-expect-error TODO

      Event.EventKeyboard = EventKeyboard;
    }
  };
});