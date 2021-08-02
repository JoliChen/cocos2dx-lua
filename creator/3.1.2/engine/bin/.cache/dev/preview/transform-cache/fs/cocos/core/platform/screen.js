System.register("q-bundled:///fs/cocos/core/platform/screen.js", ["../global-exports.js"], function (_export, _context) {
  "use strict";

  var legacyCC, screen;
  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /*
       Copyright (c) 2008-2010 Ricardo Quesada
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
       * @module core
       */

      /**
       * @en The screen API provides an easy way for web content to be presented using the user's entire screen.
       * It's designed for web platforms and some mobile browsers don't provide such behavior, e.g. Safari
       * @zh screen 单例对象提供简单的方法来尝试让 Web 内容进入全屏模式。这是 Web 平台特有的行为，在部分浏览器上并不支持这样的功能。
       */
      _export("screen", screen = {
        _supportsFullScreen: false,
        _onfullscreenchange: null,
        _onfullscreenerror: null,
        // the pre fullscreenchange function
        _preOnFullScreenError: null,
        _preOnTouch: null,
        _touchEvent: '',
        _fn: null,
        // Function mapping for cross browser support
        _fnMap: [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement']],

        /**
         * @en Initialization
         * @zh 初始化函数
         */
        init: function init() {
          this._fn = {};
          var i;
          var l;
          var val;
          var map = this._fnMap;
          var valL;

          for (i = 0, l = map.length; i < l; i++) {
            val = map[i];

            if (val && typeof document[val[1]] !== 'undefined') {
              for (i = 0, valL = val.length; i < valL; i++) {
                this._fn[map[0][i]] = val[i];
              }

              break;
            }
          }

          this._supportsFullScreen = this._fn.requestFullscreen !== undefined;
          this._touchEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
        },

        /**
         * @en Whether it supports full screen？
         * @zh 是否支持全屏？
         * @returns {Boolean}
         */
        get supportsFullScreen() {
          return this._supportsFullScreen;
        },

        /**
         * @en Return true if it's in full screen state now.
         * @zh 当前是否处在全屏状态下
         * @returns {Boolean}
         */
        fullScreen: function fullScreen() {
          if (!this._supportsFullScreen) {
            return false;
          } else if (document[this._fn.fullscreenElement] === undefined || document[this._fn.fullscreenElement] === null) {
            return false;
          } else {
            return true;
          }
        },

        /**
         * @en Request to enter full screen mode with the given element.
         * Many browser forbid to enter full screen mode without an user intended interaction.
         * For simplify the process, you can try to use {{autoFullScreen}} which will try to enter full screen mode during the next user touch event.
         * @zh 尝试使当前节点进入全屏模式，很多浏览器不允许程序触发这样的行为，必须在一个用户交互回调中才会生效。
         * 如果希望更简单一些，可以尝试用 {{autoFullScreen}} 来自动监听用户触摸事件并在下一次触摸事件中尝试进入全屏模式。
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         * @param onFullScreenError callback function when full screen error
         * @return {Promise|undefined}
         */
        requestFullScreen: function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
          if (!this._supportsFullScreen) {
            return;
          }

          element = element || document.documentElement;

          if (onFullScreenChange) {
            var eventName = this._fn.fullscreenchange;

            if (this._onfullscreenchange) {
              document.removeEventListener(eventName, this._onfullscreenchange);
            }

            this._onfullscreenchange = onFullScreenChange;
            document.addEventListener(eventName, onFullScreenChange, false);
          }

          if (onFullScreenError) {
            var _eventName = this._fn.fullscreenerror;

            if (this._onfullscreenerror) {
              document.removeEventListener(_eventName, this._onfullscreenerror);
            }

            this._onfullscreenerror = onFullScreenError;
            document.addEventListener(_eventName, onFullScreenError, {
              once: true
            });
          }

          var requestPromise = element[this._fn.requestFullscreen](); // the requestFullscreen API can only be initiated by user gesture.


          if (window.Promise && requestPromise instanceof Promise) {
            requestPromise["catch"](function (err) {// do nothing ...
            });
          }

          return requestPromise;
        },

        /**
         * @en Exit the full mode.
         * @zh 退出全屏模式
         * @return {Promise|undefined}
         */
        exitFullScreen: function exitFullScreen() {
          var requestPromise;

          if (this.fullScreen()) {
            requestPromise = document[this._fn.exitFullscreen]();
            requestPromise["catch"](function (err) {// do nothing ...
            });
          }

          return requestPromise;
        },

        /**
         * @en Automatically request full screen during the next touch/click event
         * @zh 自动监听触摸、鼠标事件并在下一次事件触发时尝试进入全屏模式
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         */
        autoFullScreen: function autoFullScreen(element, onFullScreenChange) {
          element = element || document.body;

          this._ensureFullScreen(element, onFullScreenChange);

          this.requestFullScreen(element, onFullScreenChange);
        },
        disableAutoFullScreen: function disableAutoFullScreen(element) {
          if (this._preOnTouch) {
            var touchTarget = legacyCC.game.canvas || element;
            var touchEventName = this._touchEvent;
            touchTarget.removeEventListener(touchEventName, this._preOnTouch);
            this._preOnTouch = null;
          }
        },
        // Register touch event if request full screen failed
        _ensureFullScreen: function _ensureFullScreen(element, onFullScreenChange) {
          var _this = this;

          var touchTarget = legacyCC.game.canvas || element;
          var fullScreenErrorEventName = this._fn.fullscreenerror;
          var touchEventName = this._touchEvent;

          var onFullScreenError = function onFullScreenError() {
            _this._preOnFullScreenError = null; // handle touch event listener

            var onTouch = function onTouch() {
              _this._preOnTouch = null;

              _this.requestFullScreen(element, onFullScreenChange);
            };

            if (_this._preOnTouch) {
              touchTarget.removeEventListener(touchEventName, _this._preOnTouch);
            }

            _this._preOnTouch = onTouch;
            touchTarget.addEventListener(touchEventName, _this._preOnTouch, {
              once: true
            });
          }; // handle full screen error


          if (this._preOnFullScreenError) {
            element.removeEventListener(fullScreenErrorEventName, this._preOnFullScreenError);
          }

          this._preOnFullScreenError = onFullScreenError;
          element.addEventListener(fullScreenErrorEventName, onFullScreenError, {
            once: true
          });
        }
      });

      screen.init();
      legacyCC.screen = screen;
    }
  };
});