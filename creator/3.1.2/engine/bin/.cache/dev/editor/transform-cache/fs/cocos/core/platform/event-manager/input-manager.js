"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../../../pal/input/web/index.js");

var _index2 = require("../../math/index.js");

var _macro = require("../macro.js");

var _eventManager = _interopRequireDefault(require("./event-manager.js"));

var _events = require("./events.js");

var _touch = require("./touch.js");

var _globalExports = require("../../global-exports.js");

var _debug = require("../debug.js");

var _acceleration = require("./acceleration.js");

var _eventEnum = require("./event-enum.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

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
const TOUCH_TIMEOUT = _macro.macro.TOUCH_TIMEOUT;

const _vec2 = new _index2.Vec2();

const _preLocation = new _index2.Vec2();

/**
 *  This class manages all events of input. include: touch, mouse, accelerometer, keyboard
 */
class InputManager {
  constructor() {
    this._isRegisterEvent = false;
    this._preTouchPoint = new _index2.Vec2();
    this._prevMousePoint = new _index2.Vec2();
    this._preTouchPool = [];
    this._preTouchPoolPointer = 0;
    this._touches = [];
    this._touchesIntegerDict = {};
    this._indexBitsUsed = 0;
    this._maxTouches = 8;
    this._glView = null;
  }

  // #region Touch Handle
  handleTouchesBegin(touches) {
    const handleTouches = [];
    const locTouchIntDict = this._touchesIntegerDict;

    for (let i = 0; i < touches.length; ++i) {
      const touch = touches[i];
      const touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      const index = locTouchIntDict[touchID];

      if (index === undefined) {
        const unusedIndex = this._getUnUsedIndex();

        if (unusedIndex === -1) {
          (0, _debug.logID)(2300, unusedIndex);
          continue;
        } // curTouch = this._touches[unusedIndex] = touch;


        touch.getLocation(_vec2);
        const curTouch = new _touch.Touch(_vec2.x, _vec2.y, touchID);
        this._touches[unusedIndex] = curTouch;
        touch.getPreviousLocation(_vec2);
        curTouch.setPrevPoint(_vec2);
        locTouchIntDict[touchID] = unusedIndex;
        handleTouches.push(curTouch);
      }
    }

    if (handleTouches.length > 0) {
      // this._glView!._convertTouchesWithScale(handleTouches);
      const touchEvent = new _events.EventTouch(handleTouches, false, _eventEnum.SystemEventType.TOUCH_START, _macro.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);

      _eventManager.default.dispatchEvent(touchEvent);
    }
  }

  handleTouchesMove(touches) {
    const handleTouches = [];
    const locTouches = this._touches;

    for (let i = 0; i < touches.length; ++i) {
      const touch = touches[i];
      const touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      const index = this._touchesIntegerDict[touchID];

      if (index === undefined) {
        // cc.log("if the index doesn't exist, it is an error");
        continue;
      }

      if (locTouches[index]) {
        touch.getLocation(_vec2);
        locTouches[index].setPoint(_vec2);
        touch.getPreviousLocation(_vec2);
        locTouches[index].setPrevPoint(_vec2);
        handleTouches.push(locTouches[index]);
      }
    }

    if (handleTouches.length > 0) {
      const touchEvent = new _events.EventTouch(handleTouches, false, _eventEnum.SystemEventType.TOUCH_MOVE, _macro.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);

      _eventManager.default.dispatchEvent(touchEvent);
    }
  }

  handleTouchesEnd(touches) {
    const handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      const touchEvent = new _events.EventTouch(handleTouches, false, _eventEnum.SystemEventType.TOUCH_END, _macro.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);

      _eventManager.default.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  }

  handleTouchesCancel(touches) {
    const handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      const touchEvent = new _events.EventTouch(handleTouches, false, _eventEnum.SystemEventType.TOUCH_CANCEL, _macro.macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);

      _eventManager.default.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  }

  getSetOfTouchesEndOrCancel(touches) {
    const handleTouches = [];
    const locTouches = this._touches;
    const locTouchesIntDict = this._touchesIntegerDict;

    for (let i = 0; i < touches.length; ++i) {
      const touch = touches[i];
      const touchID = touch.getID();

      if (touchID === null) {
        continue;
      }

      const index = locTouchesIntDict[touchID];

      if (index === undefined) {
        // cc.log("if the index doesn't exist, it is an error");
        continue;
      }

      if (locTouches[index]) {
        touch.getLocation(_vec2);
        locTouches[index].setPoint(_vec2);
        touch.getPreviousLocation(_vec2);
        locTouches[index].setPrevPoint(_vec2);
        handleTouches.push(locTouches[index]);

        this._removeUsedIndexBit(index);

        delete locTouchesIntDict[touchID];
      }
    }

    return handleTouches;
  }

  _getPreTouch(touch) {
    let preTouch = null;
    const locPreTouchPool = this._preTouchPool;
    const id = touch.getID();

    for (let i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        preTouch = locPreTouchPool[i];
        break;
      }
    }

    if (!preTouch) {
      preTouch = touch;
    }

    return preTouch;
  }

  _setPreTouch(touch) {
    let find = false;
    const locPreTouchPool = this._preTouchPool;
    const id = touch.getID();

    for (let i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        locPreTouchPool[i] = touch;
        find = true;
        break;
      }
    }

    if (!find) {
      if (locPreTouchPool.length <= 50) {
        locPreTouchPool.push(touch);
      } else {
        locPreTouchPool[this._preTouchPoolPointer] = touch;
        this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
      }
    }
  } // TODO: remove this private method


  _getViewPixelRatio() {
    return this._glView ? this._glView._devicePixelRatio : 1;
  }

  _getTouch(inputEvent) {
    const locPreTouch = this._preTouchPoint;

    const pixelRatio = this._getViewPixelRatio();

    const x = inputEvent.x * pixelRatio;
    const y = inputEvent.y * pixelRatio;
    const touch = new _touch.Touch(x, y, 0);
    touch.setPrevPoint(locPreTouch.x, locPreTouch.y);
    locPreTouch.x = x;
    locPreTouch.y = y;
    return touch;
  }

  _getMouseEvent(inputEvent) {
    const locPreMouse = this._prevMousePoint;
    const mouseEvent = new _events.EventMouse(inputEvent.type, false, locPreMouse);

    const pixelRatio = this._getViewPixelRatio(); // update previous location


    locPreMouse.x = inputEvent.x * pixelRatio;
    locPreMouse.y = inputEvent.y * pixelRatio; // HACK: maybe it's an HACK operation

    if (_globalExports.legacyCC.GAME_VIEW) {
      locPreMouse.x /= _globalExports.legacyCC.gameView.canvas.width / _globalExports.legacyCC.game.canvas.width;
      locPreMouse.y /= _globalExports.legacyCC.gameView.canvas.height / _globalExports.legacyCC.game.canvas.height;
    }

    mouseEvent.setLocation(locPreMouse.x, locPreMouse.y);
    mouseEvent.setButton(inputEvent.button); // Web only

    if (inputEvent.movementX) {
      mouseEvent.movementX = inputEvent.movementX;
    }

    if (inputEvent.movementY) {
      mouseEvent.movementY = inputEvent.movementY;
    }

    return mouseEvent;
  }

  _getTouchList(inputEvent) {
    const touchList = [];
    const locPreTouch = this._preTouchPoint;
    const length = inputEvent.changedTouches.length;

    const pixelRatio = this._getViewPixelRatio();

    for (let i = 0; i < length; i++) {
      const touchData = inputEvent.changedTouches[i];
      const x = touchData.x * pixelRatio;
      const y = touchData.y * pixelRatio; // TODO: what if touchData.identifier is undefined

      const touch = new _touch.Touch(x, y, touchData.identifier);

      this._getPreTouch(touch).getLocation(_preLocation);

      touch.setPrevPoint(_preLocation.x, _preLocation.y);

      this._setPreTouch(touch); // update previous location


      locPreTouch.x = x;
      locPreTouch.y = y;
      touchList.push(touch);

      if (!_macro.macro.ENABLE_MULTI_TOUCH) {
        break;
      }
    }

    return touchList;
  }

  _getUnUsedIndex() {
    let temp = this._indexBitsUsed;

    const now = _globalExports.legacyCC.director.getCurrentTime();

    for (let i = 0; i < this._maxTouches; i++) {
      if (!(temp & 0x00000001)) {
        this._indexBitsUsed |= 1 << i;
        return i;
      } else {
        const touch = this._touches[i];

        if (now - touch.lastModified > TOUCH_TIMEOUT) {
          this._removeUsedIndexBit(i);

          const touchID = touch.getID();

          if (touchID !== null) {
            delete this._touchesIntegerDict[touchID];
          }

          return i;
        }
      }

      temp >>= 1;
    } // all bits are used


    return -1;
  }

  _removeUsedIndexBit(index) {
    if (index < 0 || index >= this._maxTouches) {
      return;
    }

    let temp = 1 << index;
    temp = ~temp;
    this._indexBitsUsed &= temp;
  }

  _getUsefulTouches() {
    const touches = [];
    const touchDict = this._touchesIntegerDict;

    for (const id in touchDict) {
      const index = parseInt(id);
      const usedID = touchDict[index];

      if (usedID === undefined || usedID === null) {
        continue;
      }

      const touch = this._touches[usedID];
      touches.push(touch);
    }

    return touches;
  } // #endregion Touch Handle
  // #region Accelerometer Handle

  /**
   * Whether enable accelerometer event.
   */


  setAccelerometerEnabled(isEnable) {
    if (isEnable) {
      _index.input._accelerometer.start();
    } else {
      _index.input._accelerometer.stop();
    }
  }
  /**
   * set accelerometer interval value in mileseconds
   * @method setAccelerometerInterval
   * @param {Number} intervalInMileseconds
   */


  setAccelerometerInterval(intervalInMileseconds) {
    _index.input._accelerometer.setInterval(intervalInMileseconds);
  } // #endregion Accelerometer Handle
  // #region Event Register


  registerSystemEvent() {
    if (this._isRegisterEvent) {
      return;
    }

    this._glView = _globalExports.legacyCC.view; // Register mouse events.

    if (_index.input._mouse.support) {
      this._registerMouseEvents();
    } // Register touch events.


    if (_index.input._touch.support) {
      this._registerTouchEvents();
    }

    if (_index.input._keyboard.support) {
      this._registerKeyboardEvent();
    }

    if (_index.input._accelerometer.support) {
      this._registerAccelerometerEvent();
    }

    this._isRegisterEvent = true;
  }

  _registerMouseEvents() {
    _index.input._mouse.onDown(inputEvent => {
      const mouseEvent = this._getMouseEvent(inputEvent);

      const touch = this._getTouch(inputEvent);

      this.handleTouchesBegin([touch]);

      _eventManager.default.dispatchEvent(mouseEvent);
    });

    _index.input._mouse.onMove(inputEvent => {
      const mouseEvent = this._getMouseEvent(inputEvent);

      const touch = this._getTouch(inputEvent);

      this.handleTouchesMove([touch]);

      _eventManager.default.dispatchEvent(mouseEvent);
    });

    _index.input._mouse.onUp(inputEvent => {
      const mouseEvent = this._getMouseEvent(inputEvent);

      const touch = this._getTouch(inputEvent);

      this.handleTouchesEnd([touch]);

      _eventManager.default.dispatchEvent(mouseEvent);
    });

    _index.input._mouse.onWheel(inputEvent => {
      const mouseEvent = this._getMouseEvent(inputEvent);

      mouseEvent.setScrollData(inputEvent.deltaX, inputEvent.deltaY);

      _eventManager.default.dispatchEvent(mouseEvent);
    });
  }

  _registerTouchEvents() {
    _index.input._touch.onStart(inputEvent => {
      const touchList = this._getTouchList(inputEvent);

      this.handleTouchesBegin(touchList);
    });

    _index.input._touch.onMove(inputEvent => {
      const touchList = this._getTouchList(inputEvent);

      this.handleTouchesMove(touchList);
    });

    _index.input._touch.onEnd(inputEvent => {
      const touchList = this._getTouchList(inputEvent);

      this.handleTouchesEnd(touchList);
    });

    _index.input._touch.onCancel(inputEvent => {
      const touchList = this._getTouchList(inputEvent);

      this.handleTouchesCancel(touchList);
    });
  }

  _registerKeyboardEvent() {
    _index.input._keyboard.onDown(inputEvent => {
      _eventManager.default.dispatchEvent(new _events.EventKeyboard(inputEvent.code, true));
    });

    _index.input._keyboard.onUp(inputEvent => {
      _eventManager.default.dispatchEvent(new _events.EventKeyboard(inputEvent.code, false));
    });
  }

  _registerAccelerometerEvent() {
    _index.input._accelerometer.onChange(inputEvent => {
      const {
        x,
        y,
        z,
        timestamp
      } = inputEvent;

      _eventManager.default.dispatchEvent(new _events.EventAcceleration(new _acceleration.Acceleration(x, y, z, timestamp)));
    });
  } // #endregion Event Register


}

const inputManager = new InputManager();
var _default = inputManager;
exports.default = _default;
_globalExports.legacyCC.internal.inputManager = inputManager;