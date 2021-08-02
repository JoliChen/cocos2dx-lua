System.register("q-bundled:///fs/cocos/core/platform/event-manager/input-manager.js", ["../../../../pal/input/web/index.js", "../../math/index.js", "../macro.js", "./event-manager.js", "./events.js", "./touch.js", "../../global-exports.js", "../debug.js", "./acceleration.js", "./event-enum.js"], function (_export, _context) {
  "use strict";

  var input, Vec2, macro, eventManager, EventAcceleration, EventKeyboard, EventMouse, EventTouch, Touch, legacyCC, logID, Acceleration, SystemEventType, TOUCH_TIMEOUT, _vec2, _preLocation, InputManager, inputManager;

  return {
    setters: [function (_palInputWebIndexJs) {
      input = _palInputWebIndexJs.input;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
    }, function (_macroJs) {
      macro = _macroJs.macro;
    }, function (_eventManagerJs) {
      eventManager = _eventManagerJs.default;
    }, function (_eventsJs) {
      EventAcceleration = _eventsJs.EventAcceleration;
      EventKeyboard = _eventsJs.EventKeyboard;
      EventMouse = _eventsJs.EventMouse;
      EventTouch = _eventsJs.EventTouch;
    }, function (_touchJs) {
      Touch = _touchJs.Touch;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      logID = _debugJs.logID;
    }, function (_accelerationJs) {
      Acceleration = _accelerationJs.Acceleration;
    }, function (_eventEnumJs) {
      SystemEventType = _eventEnumJs.SystemEventType;
    }],
    execute: function () {
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
      TOUCH_TIMEOUT = macro.TOUCH_TIMEOUT;
      _vec2 = new Vec2();
      _preLocation = new Vec2();

      /**
       *  This class manages all events of input. include: touch, mouse, accelerometer, keyboard
       */
      InputManager = /*#__PURE__*/function () {
        function InputManager() {
          this._isRegisterEvent = false;
          this._preTouchPoint = new Vec2();
          this._prevMousePoint = new Vec2();
          this._preTouchPool = [];
          this._preTouchPoolPointer = 0;
          this._touches = [];
          this._touchesIntegerDict = {};
          this._indexBitsUsed = 0;
          this._maxTouches = 8;
          this._glView = null;
        }

        var _proto = InputManager.prototype;

        // #region Touch Handle
        _proto.handleTouchesBegin = function handleTouchesBegin(touches) {
          var handleTouches = [];
          var locTouchIntDict = this._touchesIntegerDict;

          for (var i = 0; i < touches.length; ++i) {
            var touch = touches[i];
            var touchID = touch.getID();

            if (touchID === null) {
              continue;
            }

            var _index = locTouchIntDict[touchID];

            if (_index === undefined) {
              var unusedIndex = this._getUnUsedIndex();

              if (unusedIndex === -1) {
                logID(2300, unusedIndex);
                continue;
              } // curTouch = this._touches[unusedIndex] = touch;


              touch.getLocation(_vec2);
              var curTouch = new Touch(_vec2.x, _vec2.y, touchID);
              this._touches[unusedIndex] = curTouch;
              touch.getPreviousLocation(_vec2);
              curTouch.setPrevPoint(_vec2);
              locTouchIntDict[touchID] = unusedIndex;
              handleTouches.push(curTouch);
            }
          }

          if (handleTouches.length > 0) {
            // this._glView!._convertTouchesWithScale(handleTouches);
            var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_START, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
            eventManager.dispatchEvent(touchEvent);
          }
        };

        _proto.handleTouchesMove = function handleTouchesMove(touches) {
          var handleTouches = [];
          var locTouches = this._touches;

          for (var i = 0; i < touches.length; ++i) {
            var touch = touches[i];
            var touchID = touch.getID();

            if (touchID === null) {
              continue;
            }

            var _index2 = this._touchesIntegerDict[touchID];

            if (_index2 === undefined) {
              // cc.log("if the index doesn't exist, it is an error");
              continue;
            }

            if (locTouches[_index2]) {
              touch.getLocation(_vec2);

              locTouches[_index2].setPoint(_vec2);

              touch.getPreviousLocation(_vec2);

              locTouches[_index2].setPrevPoint(_vec2);

              handleTouches.push(locTouches[_index2]);
            }
          }

          if (handleTouches.length > 0) {
            var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_MOVE, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
            eventManager.dispatchEvent(touchEvent);
          }
        };

        _proto.handleTouchesEnd = function handleTouchesEnd(touches) {
          var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

          if (handleTouches.length > 0) {
            var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_END, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
            eventManager.dispatchEvent(touchEvent);
          }

          this._preTouchPool.length = 0;
        };

        _proto.handleTouchesCancel = function handleTouchesCancel(touches) {
          var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

          if (handleTouches.length > 0) {
            var touchEvent = new EventTouch(handleTouches, false, SystemEventType.TOUCH_CANCEL, macro.ENABLE_MULTI_TOUCH ? this._getUsefulTouches() : handleTouches);
            eventManager.dispatchEvent(touchEvent);
          }

          this._preTouchPool.length = 0;
        };

        _proto.getSetOfTouchesEndOrCancel = function getSetOfTouchesEndOrCancel(touches) {
          var handleTouches = [];
          var locTouches = this._touches;
          var locTouchesIntDict = this._touchesIntegerDict;

          for (var i = 0; i < touches.length; ++i) {
            var touch = touches[i];
            var touchID = touch.getID();

            if (touchID === null) {
              continue;
            }

            var _index3 = locTouchesIntDict[touchID];

            if (_index3 === undefined) {
              // cc.log("if the index doesn't exist, it is an error");
              continue;
            }

            if (locTouches[_index3]) {
              touch.getLocation(_vec2);

              locTouches[_index3].setPoint(_vec2);

              touch.getPreviousLocation(_vec2);

              locTouches[_index3].setPrevPoint(_vec2);

              handleTouches.push(locTouches[_index3]);

              this._removeUsedIndexBit(_index3);

              delete locTouchesIntDict[touchID];
            }
          }

          return handleTouches;
        };

        _proto._getPreTouch = function _getPreTouch(touch) {
          var preTouch = null;
          var locPreTouchPool = this._preTouchPool;
          var id = touch.getID();

          for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
            if (locPreTouchPool[i].getID() === id) {
              preTouch = locPreTouchPool[i];
              break;
            }
          }

          if (!preTouch) {
            preTouch = touch;
          }

          return preTouch;
        };

        _proto._setPreTouch = function _setPreTouch(touch) {
          var find = false;
          var locPreTouchPool = this._preTouchPool;
          var id = touch.getID();

          for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
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
        ;

        _proto._getViewPixelRatio = function _getViewPixelRatio() {
          return this._glView ? this._glView._devicePixelRatio : 1;
        };

        _proto._getTouch = function _getTouch(inputEvent) {
          var locPreTouch = this._preTouchPoint;

          var pixelRatio = this._getViewPixelRatio();

          var x = inputEvent.x * pixelRatio;
          var y = inputEvent.y * pixelRatio;
          var touch = new Touch(x, y, 0);
          touch.setPrevPoint(locPreTouch.x, locPreTouch.y);
          locPreTouch.x = x;
          locPreTouch.y = y;
          return touch;
        };

        _proto._getMouseEvent = function _getMouseEvent(inputEvent) {
          var locPreMouse = this._prevMousePoint;
          var mouseEvent = new EventMouse(inputEvent.type, false, locPreMouse);

          var pixelRatio = this._getViewPixelRatio(); // update previous location


          locPreMouse.x = inputEvent.x * pixelRatio;
          locPreMouse.y = inputEvent.y * pixelRatio; // HACK: maybe it's an HACK operation

          if (legacyCC.GAME_VIEW) {
            locPreMouse.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
            locPreMouse.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
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
        };

        _proto._getTouchList = function _getTouchList(inputEvent) {
          var touchList = [];
          var locPreTouch = this._preTouchPoint;
          var length = inputEvent.changedTouches.length;

          var pixelRatio = this._getViewPixelRatio();

          for (var i = 0; i < length; i++) {
            var touchData = inputEvent.changedTouches[i];
            var x = touchData.x * pixelRatio;
            var y = touchData.y * pixelRatio; // TODO: what if touchData.identifier is undefined

            var touch = new Touch(x, y, touchData.identifier);

            this._getPreTouch(touch).getLocation(_preLocation);

            touch.setPrevPoint(_preLocation.x, _preLocation.y);

            this._setPreTouch(touch); // update previous location


            locPreTouch.x = x;
            locPreTouch.y = y;
            touchList.push(touch);

            if (!macro.ENABLE_MULTI_TOUCH) {
              break;
            }
          }

          return touchList;
        };

        _proto._getUnUsedIndex = function _getUnUsedIndex() {
          var temp = this._indexBitsUsed;
          var now = legacyCC.director.getCurrentTime();

          for (var i = 0; i < this._maxTouches; i++) {
            if (!(temp & 0x00000001)) {
              this._indexBitsUsed |= 1 << i;
              return i;
            } else {
              var touch = this._touches[i];

              if (now - touch.lastModified > TOUCH_TIMEOUT) {
                this._removeUsedIndexBit(i);

                var touchID = touch.getID();

                if (touchID !== null) {
                  delete this._touchesIntegerDict[touchID];
                }

                return i;
              }
            }

            temp >>= 1;
          } // all bits are used


          return -1;
        };

        _proto._removeUsedIndexBit = function _removeUsedIndexBit(index) {
          if (index < 0 || index >= this._maxTouches) {
            return;
          }

          var temp = 1 << index;
          temp = ~temp;
          this._indexBitsUsed &= temp;
        };

        _proto._getUsefulTouches = function _getUsefulTouches() {
          var touches = [];
          var touchDict = this._touchesIntegerDict;

          for (var id in touchDict) {
            var _index4 = parseInt(id);

            var usedID = touchDict[_index4];

            if (usedID === undefined || usedID === null) {
              continue;
            }

            var touch = this._touches[usedID];
            touches.push(touch);
          }

          return touches;
        } // #endregion Touch Handle
        // #region Accelerometer Handle

        /**
         * Whether enable accelerometer event.
         */
        ;

        _proto.setAccelerometerEnabled = function setAccelerometerEnabled(isEnable) {
          if (isEnable) {
            input._accelerometer.start();
          } else {
            input._accelerometer.stop();
          }
        }
        /**
         * set accelerometer interval value in mileseconds
         * @method setAccelerometerInterval
         * @param {Number} intervalInMileseconds
         */
        ;

        _proto.setAccelerometerInterval = function setAccelerometerInterval(intervalInMileseconds) {
          input._accelerometer.setInterval(intervalInMileseconds);
        } // #endregion Accelerometer Handle
        // #region Event Register
        ;

        _proto.registerSystemEvent = function registerSystemEvent() {
          if (this._isRegisterEvent) {
            return;
          }

          this._glView = legacyCC.view; // Register mouse events.

          if (input._mouse.support) {
            this._registerMouseEvents();
          } // Register touch events.


          if (input._touch.support) {
            this._registerTouchEvents();
          }

          if (input._keyboard.support) {
            this._registerKeyboardEvent();
          }

          if (input._accelerometer.support) {
            this._registerAccelerometerEvent();
          }

          this._isRegisterEvent = true;
        };

        _proto._registerMouseEvents = function _registerMouseEvents() {
          var _this = this;

          input._mouse.onDown(function (inputEvent) {
            var mouseEvent = _this._getMouseEvent(inputEvent);

            var touch = _this._getTouch(inputEvent);

            _this.handleTouchesBegin([touch]);

            eventManager.dispatchEvent(mouseEvent);
          });

          input._mouse.onMove(function (inputEvent) {
            var mouseEvent = _this._getMouseEvent(inputEvent);

            var touch = _this._getTouch(inputEvent);

            _this.handleTouchesMove([touch]);

            eventManager.dispatchEvent(mouseEvent);
          });

          input._mouse.onUp(function (inputEvent) {
            var mouseEvent = _this._getMouseEvent(inputEvent);

            var touch = _this._getTouch(inputEvent);

            _this.handleTouchesEnd([touch]);

            eventManager.dispatchEvent(mouseEvent);
          });

          input._mouse.onWheel(function (inputEvent) {
            var mouseEvent = _this._getMouseEvent(inputEvent);

            mouseEvent.setScrollData(inputEvent.deltaX, inputEvent.deltaY);
            eventManager.dispatchEvent(mouseEvent);
          });
        };

        _proto._registerTouchEvents = function _registerTouchEvents() {
          var _this2 = this;

          input._touch.onStart(function (inputEvent) {
            var touchList = _this2._getTouchList(inputEvent);

            _this2.handleTouchesBegin(touchList);
          });

          input._touch.onMove(function (inputEvent) {
            var touchList = _this2._getTouchList(inputEvent);

            _this2.handleTouchesMove(touchList);
          });

          input._touch.onEnd(function (inputEvent) {
            var touchList = _this2._getTouchList(inputEvent);

            _this2.handleTouchesEnd(touchList);
          });

          input._touch.onCancel(function (inputEvent) {
            var touchList = _this2._getTouchList(inputEvent);

            _this2.handleTouchesCancel(touchList);
          });
        };

        _proto._registerKeyboardEvent = function _registerKeyboardEvent() {
          input._keyboard.onDown(function (inputEvent) {
            eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, true));
          });

          input._keyboard.onUp(function (inputEvent) {
            eventManager.dispatchEvent(new EventKeyboard(inputEvent.code, false));
          });
        };

        _proto._registerAccelerometerEvent = function _registerAccelerometerEvent() {
          input._accelerometer.onChange(function (inputEvent) {
            var x = inputEvent.x,
                y = inputEvent.y,
                z = inputEvent.z,
                timestamp = inputEvent.timestamp;
            eventManager.dispatchEvent(new EventAcceleration(new Acceleration(x, y, z, timestamp)));
          });
        } // #endregion Event Register
        ;

        return InputManager;
      }();

      inputManager = new InputManager();

      _export("default", inputManager);

      legacyCC.internal.inputManager = inputManager;
    }
  };
});