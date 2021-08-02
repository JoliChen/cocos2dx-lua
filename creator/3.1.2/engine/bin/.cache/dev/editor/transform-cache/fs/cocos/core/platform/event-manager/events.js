"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventKeyboard = exports.EventAcceleration = exports.EventTouch = exports.EventMouse = void 0;

var _event = _interopRequireDefault(require("../../event/event.js"));

var _vec = require("../../math/vec2.js");

var _globalExports = require("../../global-exports.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @module event
 */
const _vec2 = new _vec.Vec2();
/**
 * @en The mouse event
 * @zh 鼠标事件类型
 */


class EventMouse extends _event.default {
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
  constructor(eventType, bubbles, prevLoc) {
    super(_event.default.MOUSE, bubbles);
    this.movementX = 0;
    this.movementY = 0;
    this.eventType = void 0;
    this._button = EventMouse.BUTTON_MISSING;
    this._x = 0;
    this._y = 0;
    this._prevX = 0;
    this._prevY = 0;
    this._scrollX = 0;
    this._scrollY = 0;
    this.eventType = eventType;

    if (prevLoc) {
      this._prevX = prevLoc.x;
      this._prevY = prevLoc.y;
    }
  }
  /**
   * @en Sets scroll data of the mouse.
   * @zh 设置鼠标滚轮的滚动数据。
   * @param scrollX - The scroll value on x axis
   * @param scrollY - The scroll value on y axis
   */


  setScrollData(scrollX, scrollY) {
    this._scrollX = scrollX;
    this._scrollY = scrollY;
  }
  /**
   * @en Returns the scroll value on x axis.
   * @zh 获取鼠标滚动的 X 轴距离，只有滚动时才有效。
   */


  getScrollX() {
    return this._scrollX;
  }
  /**
   * @en Returns the scroll value on y axis.
   * @zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
   */


  getScrollY() {
    return this._scrollY;
  }
  /**
   * @en Sets cursor location.
   * @zh 设置当前鼠标位置。
   * @param x - The location on x axis
   * @param y - The location on y axis
   */


  setLocation(x, y) {
    this._x = x;
    this._y = y;
  }
  /**
   * @en Returns cursor location.
   * @zh 获取鼠标相对于左下角位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getLocation(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._x, this._y);

    return out;
  }
  /**
   * @en Returns the current cursor location in game view coordinates.
   * @zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getLocationInView(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._x, _globalExports.legacyCC.view._designResolutionSize.height - this._y);

    return out;
  }
  /**
   * @en Returns the current cursor location in ui coordinates.
   * @zh 获取当前事件在 UI 窗口内的坐标位置，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getUILocation(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._x, this._y);

    _globalExports.legacyCC.view._convertPointWithScale(out);

    return out;
  }
  /**
   * @en Returns the previous touch location.
   * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getPreviousLocation(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._prevX, this._prevY);

    return out;
  }
  /**
   * @en Returns the previous touch location.
   * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getUIPreviousLocation(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._prevX, this._prevY);

    _globalExports.legacyCC.view._convertPointWithScale(out);

    return out;
  }
  /**
   * @en Returns the delta distance from the previous location to current location.
   * @zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getDelta(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, this._x - this._prevX, this._y - this._prevY);

    return out;
  }
  /**
   * @en Returns the X axis delta distance from the previous location to current location.
   * @zh 获取鼠标距离上一次事件移动的 X 轴距离。
   */


  getDeltaX() {
    return this._x - this._prevX;
  }
  /**
   * @en Returns the Y axis delta distance from the previous location to current location.
   * @zh 获取鼠标距离上一次事件移动的 Y 轴距离。
   */


  getDeltaY() {
    return this._y - this._prevY;
  }
  /**
   * @en Returns the delta distance from the previous location to current location in the UI coordinates.
   * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的距离对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getUIDelta(out) {
    if (!out) {
      out = new _vec.Vec2();
    }

    _vec.Vec2.set(out, (this._x - this._prevX) / _globalExports.legacyCC.view.getScaleX(), (this._y - this._prevY) / _globalExports.legacyCC.view.getScaleY());

    return out;
  }
  /**
   * @en Returns the X axis delta distance from the previous location to current location in the UI coordinates.
   * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 X 轴距离。
   */


  getUIDeltaX() {
    return (this._x - this._prevX) / _globalExports.legacyCC.view.getScaleX();
  }
  /**
   * @en Returns the Y axis delta distance from the previous location to current location in the UI coordinates.
   * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 Y 轴距离。
   */


  getUIDeltaY() {
    return (this._y - this._prevY) / _globalExports.legacyCC.view.getScaleY();
  }
  /**
   * @en Sets mouse button code.
   * @zh 设置鼠标按键。
   * @param button - The button code
   */


  setButton(button) {
    this._button = button;
  }
  /**
   * @en Returns mouse button code.
   * @zh 获取鼠标按键。
   */


  getButton() {
    return this._button;
  }
  /**
   * @en Returns location data on X axis.
   * @zh 获取鼠标当前 X 轴位置。
   */


  getLocationX() {
    return this._x;
  }
  /**
   * @en Returns location data on Y axis.
   * @zh 获取鼠标当前 Y 轴位置。
   */


  getLocationY() {
    return this._y;
  }
  /**
   * @en Returns location data on X axis.
   * @zh 获取鼠标当前 X 轴位置。
   */


  getUILocationX() {
    const viewport = _globalExports.legacyCC.view.getViewportRect();

    return (this._x - viewport.x) / _globalExports.legacyCC.view.getScaleX();
  }
  /**
   * @en Returns location data on Y axis.
   * @zh 获取鼠标当前 Y 轴位置。
   */


  getUILocationY() {
    const viewport = _globalExports.legacyCC.view.getViewportRect();

    return (this._y - viewport.y) / _globalExports.legacyCC.view.getScaleY();
  }

}
/**
 * @en
 * The touch event.
 *
 * @zh
 * 触摸事件。
 */


exports.EventMouse = EventMouse;
EventMouse.BUTTON_MISSING = -1;
EventMouse.BUTTON_LEFT = 0;
EventMouse.BUTTON_RIGHT = 2;
EventMouse.BUTTON_MIDDLE = 1;
EventMouse.BUTTON_4 = 3;
EventMouse.BUTTON_5 = 4;
EventMouse.BUTTON_6 = 5;
EventMouse.BUTTON_7 = 6;
EventMouse.BUTTON_8 = 7;

class EventTouch extends _event.default {
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
  constructor(changedTouches, bubbles, eventCode, touches) {
    super(_event.default.TOUCH, bubbles);
    this.touch = null;
    this.simulate = false;
    this._eventCode = void 0;
    this._touches = void 0;
    this._allTouches = void 0;
    this._eventCode = eventCode || '';
    this._touches = changedTouches || [];
    this._allTouches = touches || [];
  }
  /**
   * @en Returns event type code.
   * @zh 获取触摸事件类型。
   */


  getEventCode() {
    return this._eventCode;
  }
  /**
   * @en Returns touches of event.
   * @zh 获取有变动的触摸点的列表。
   * 注意：第一根手指按下不动，接着按第二根手指，这时候触点信息就只有变动的这根手指（第二根手指）的信息。
   * 如果需要获取全部手指的信息，请使用 `getAllTouches`。
   */


  getTouches() {
    return this._touches;
  }
  /**
   * @en Returns touches of event.
   * @zh 获取所有触摸点的列表。
   * 注意：如果手指行为是 touch end，这个时候列表是没有该手指信息的。如需知道该手指信息，可通过 `getTouches` 获取识别。
   */


  getAllTouches() {
    return this._allTouches;
  }
  /**
   * @en Sets touch location.
   * @zh 设置当前触点位置
   * @param x - The current touch location on the x axis
   * @param y - The current touch location on the y axis
   */


  setLocation(x, y) {
    if (this.touch) {
      this.touch.setTouchInfo(this.touch.getID(), x, y);
    }
  }
  /**
   * @en Returns the current touch location.
   * @zh 获取触点位置。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getLocation(out) {
    return this.touch ? this.touch.getLocation(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the current touch location in UI coordinates.
   * @zh 获取 UI 坐标系下的触点位置。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getUILocation(out) {
    return this.touch ? this.touch.getUILocation(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the current touch location in game screen coordinates.
   * @zh 获取当前触点在游戏窗口中的位置。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getLocationInView(out) {
    return this.touch ? this.touch.getLocationInView(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the previous touch location.
   * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getPreviousLocation(out) {
    return this.touch ? this.touch.getPreviousLocation(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the start touch location.
   * @zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getStartLocation(out) {
    return this.touch ? this.touch.getStartLocation(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the start touch location in UI coordinates.
   * @zh 获取触点落下时的 UI 世界下位置对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getUIStartLocation(out) {
    return this.touch ? this.touch.getUIStartLocation(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the id of the current touch point.
   * @zh 获取触点的标识 ID，可以用来在多点触摸中跟踪触点。
   */


  getID() {
    return this.touch ? this.touch.getID() : null;
  }
  /**
   * @en Returns the delta distance from the previous location to current location.
   * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
   */


  getDelta(out) {
    return this.touch ? this.touch.getDelta(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the delta distance from the previous location to current location.
   * @zh 获取触点距离上一次事件 UI 世界下移动的距离对象，对象包含 x 和 y 属性。
   * @param out - Pass the out object to avoid object creation, very good practice
  */


  getUIDelta(out) {
    return this.touch ? this.touch.getUIDelta(out) : new _vec.Vec2();
  }
  /**
   * @en Returns the X axis delta distance from the previous location to current location.
   * @zh 获取触点距离上一次事件移动的 x 轴距离。
   */


  getDeltaX() {
    return this.touch ? this.touch.getDelta(_vec2).x : 0;
  }
  /**
   * @en Returns the Y axis delta distance from the previous location to current location.
   * @zh 获取触点距离上一次事件移动的 y 轴距离。
   */


  getDeltaY() {
    return this.touch ? this.touch.getDelta(_vec2).y : 0;
  }
  /**
   * @en Returns location X axis data.
   * @zh 获取当前触点 X 轴位置。
   */


  getLocationX() {
    return this.touch ? this.touch.getLocationX() : 0;
  }
  /**
   * @en Returns location Y axis data.
   * @zh 获取当前触点 Y 轴位置。
   */


  getLocationY() {
    return this.touch ? this.touch.getLocationY() : 0;
  }

}
/**
 * @en
 * The acceleration event.
 * @zh
 * 加速计事件。
 */


exports.EventTouch = EventTouch;
EventTouch.MAX_TOUCHES = 5;

class EventAcceleration extends _event.default {
  /**
   * @en The acceleration object
   * @zh 加速度对象
   */

  /**
   * @param acc - The acceleration
   * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
   */
  constructor(acc, bubbles) {
    super(_event.default.ACCELERATION, bubbles);
    this.acc = void 0;
    this.acc = acc;
  }

}
/**
 * @en
 * The keyboard event.
 * @zh
 * 键盘事件。
 */


exports.EventAcceleration = EventAcceleration;

class EventKeyboard extends _event.default {
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
  constructor(keyCode, isPressed, bubbles) {
    super(_event.default.KEYBOARD, bubbles);
    this.keyCode = void 0;
    this.rawEvent = void 0;
    this.isPressed = void 0;

    if (typeof keyCode === 'number') {
      this.keyCode = keyCode;
    } else {
      this.keyCode = keyCode.keyCode;
      this.rawEvent = keyCode;
    }

    this.isPressed = isPressed;
  }

} // @ts-expect-error TODO


exports.EventKeyboard = EventKeyboard;
_event.default.EventMouse = EventMouse; // @ts-expect-error TODO

_event.default.EventTouch = EventTouch; // @ts-expect-error TODO

_event.default.EventAcceleration = EventAcceleration; // @ts-expect-error TODO

_event.default.EventKeyboard = EventKeyboard;