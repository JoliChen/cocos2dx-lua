System.register("q-bundled:///fs/cocos/core/event/callbacks-invoker.js", ["../../../../virtual/internal%253Aconstants.js", "../memop/index.js", "../utils/js.js", "../data/object.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var TEST, Pool, array, createMap, CCObject, isValid, legacyCC, fastRemoveAt, CallbackInfo, callbackInfoPool, CallbackList, MAX_SIZE, callbackListPool, CallbacksInvoker;

  function empty() {}

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_memopIndexJs) {
      Pool = _memopIndexJs.Pool;
    }, function (_utilsJsJs) {
      array = _utilsJsJs.array;
      createMap = _utilsJsJs.createMap;
    }, function (_dataObjectJs) {
      CCObject = _dataObjectJs.CCObject;
      isValid = _dataObjectJs.isValid;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
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
      fastRemoveAt = array.fastRemoveAt;

      CallbackInfo = /*#__PURE__*/function () {
        function CallbackInfo() {
          this.callback = empty;
          this.target = undefined;
          this.once = false;
        }

        var _proto = CallbackInfo.prototype;

        _proto.set = function set(callback, target, once) {
          this.callback = callback || empty;
          this.target = target;
          this.once = !!once;
        };

        _proto.reset = function reset() {
          this.target = undefined;
          this.callback = empty;
          this.once = false;
        };

        _proto.check = function check() {
          // Validation
          if (this.target instanceof CCObject && !isValid(this.target, true)) {
            return false;
          } else {
            return true;
          }
        };

        return CallbackInfo;
      }();

      callbackInfoPool = new Pool(function () {
        return new CallbackInfo();
      }, 32);
      /**
       * @zh 事件监听器列表的简单封装。
       * @en A simple list of event callbacks
       */

      _export("CallbackList", CallbackList = /*#__PURE__*/function () {
        function CallbackList() {
          this.callbackInfos = [];
          this.isInvoking = false;
          this.containCanceled = false;
        }

        var _proto2 = CallbackList.prototype;

        /**
         * @zh 从列表中移除与指定目标相同回调函数的事件。
         * @en Remove the event listeners with the given callback from the list
         *
         * @param cb - The callback to be removed
         */
        _proto2.removeByCallback = function removeByCallback(cb) {
          for (var i = 0; i < this.callbackInfos.length; ++i) {
            var info = this.callbackInfos[i];

            if (info && info.callback === cb) {
              info.reset();
              callbackInfoPool.free(info);
              fastRemoveAt(this.callbackInfos, i);
              --i;
            }
          }
        }
        /**
         * @zh 从列表中移除与指定目标相同调用者的事件。
         * @en Remove the event listeners with the given target from the list
         * @param target
         */
        ;

        _proto2.removeByTarget = function removeByTarget(target) {
          for (var i = 0; i < this.callbackInfos.length; ++i) {
            var info = this.callbackInfos[i];

            if (info && info.target === target) {
              info.reset();
              callbackInfoPool.free(info);
              fastRemoveAt(this.callbackInfos, i);
              --i;
            }
          }
        }
        /**
         * @zh 移除指定编号事件。
         * @en Remove the event listener at the given index
         * @param index
         */
        ;

        _proto2.cancel = function cancel(index) {
          var info = this.callbackInfos[index];

          if (info) {
            info.reset();

            if (this.isInvoking) {
              this.callbackInfos[index] = null;
            } else {
              fastRemoveAt(this.callbackInfos, index);
            }

            callbackInfoPool.free(info);
          }

          this.containCanceled = true;
        }
        /**
         * @zh 注销所有事件。
         * @en Cancel all event listeners
         */
        ;

        _proto2.cancelAll = function cancelAll() {
          for (var i = 0; i < this.callbackInfos.length; i++) {
            var info = this.callbackInfos[i];

            if (info) {
              info.reset();
              callbackInfoPool.free(info);
              this.callbackInfos[i] = null;
            }
          }

          this.containCanceled = true;
        }
        /**
         * @zh 立即删除所有取消的回调。（在移除过程中会更加紧凑的排列数组）
         * @en Delete all canceled callbacks and compact array
         */
        ;

        _proto2.purgeCanceled = function purgeCanceled() {
          for (var i = this.callbackInfos.length - 1; i >= 0; --i) {
            var info = this.callbackInfos[i];

            if (!info) {
              fastRemoveAt(this.callbackInfos, i);
            }
          }

          this.containCanceled = false;
        }
        /**
         * @zh 清除并重置所有数据。
         * @en Clear all data
         */
        ;

        _proto2.clear = function clear() {
          this.cancelAll();
          this.callbackInfos.length = 0;
          this.isInvoking = false;
          this.containCanceled = false;
        };

        return CallbackList;
      }());

      MAX_SIZE = 16;
      callbackListPool = new Pool(function () {
        return new CallbackList();
      }, MAX_SIZE);

      /**
       * @zh CallbacksInvoker 用来根据事件名（Key）管理事件监听器列表并调用回调方法。
       * @en CallbacksInvoker is used to manager and invoke event listeners with different event keys,
       * each key is mapped to a CallbackList.
       */
      _export("CallbacksInvoker", CallbacksInvoker = /*#__PURE__*/function () {
        function CallbacksInvoker() {
          this._callbackTable = createMap(true);
        }

        var _proto3 = CallbacksInvoker.prototype;

        /**
         * @zh 向一个事件名注册一个新的事件监听器，包含回调函数和调用者
         * @en Register an event listener to a given event key with callback and target.
         *
         * @param key - Event type
         * @param callback - Callback function when event triggered
         * @param target - Callback callee
         * @param once - Whether invoke the callback only once (and remove it)
         */
        _proto3.on = function on(key, callback, target, once) {
          if (!this.hasEventListener(key, callback, target)) {
            var list = this._callbackTable[key];

            if (!list) {
              list = this._callbackTable[key] = callbackListPool.alloc();
            }

            var info = callbackInfoPool.alloc();
            info.set(callback, target, once);
            list.callbackInfos.push(info);
          }

          return callback;
        }
        /**
         * @zh 检查指定事件是否已注册回调。
         * @en Checks whether there is correspond event listener registered on the given event
         * @param key - Event type
         * @param callback - Callback function when event triggered
         * @param target - Callback callee
         */
        ;

        _proto3.hasEventListener = function hasEventListener(key, callback, target) {
          var list = this._callbackTable && this._callbackTable[key];

          if (!list) {
            return false;
          } // check any valid callback


          var infos = list.callbackInfos;

          if (!callback) {
            // Make sure no cancelled callbacks
            if (list.isInvoking) {
              for (var i = 0; i < infos.length; ++i) {
                if (infos[i]) {
                  return true;
                }
              }

              return false;
            } else {
              return infos.length > 0;
            }
          }

          for (var _i = 0; _i < infos.length; ++_i) {
            var info = infos[_i];

            if (info && info.check() && info.callback === callback && info.target === target) {
              return true;
            }
          }

          return false;
        }
        /**
         * @zh 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
         * @en Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
         * @param keyOrTarget - The event type or target with which the listeners will be removed
         */
        ;

        _proto3.removeAll = function removeAll(keyOrTarget) {
          if (typeof keyOrTarget === 'string') {
            // remove by key
            var list = this._callbackTable && this._callbackTable[keyOrTarget];

            if (list) {
              if (list.isInvoking) {
                list.cancelAll();
              } else {
                list.clear();
                callbackListPool.free(list);
                delete this._callbackTable[keyOrTarget];
              }
            }
          } else if (keyOrTarget) {
            // remove by target
            for (var key in this._callbackTable) {
              var _list = this._callbackTable[key];

              if (_list.isInvoking) {
                var infos = _list.callbackInfos;

                for (var i = 0; i < infos.length; ++i) {
                  var info = infos[i];

                  if (info && info.target === keyOrTarget) {
                    _list.cancel(i);
                  }
                }
              } else {
                _list.removeByTarget(keyOrTarget);
              }
            }
          }
        }
        /**
         * @zh 删除以指定事件，回调函数，目标注册的回调。
         * @en Remove event listeners registered with the given event key, callback and target
         * @param key - Event type
         * @param callback - The callback function of the event listener, if absent all event listeners for the given type will be removed
         * @param target - The callback callee of the event listener
         */
        ;

        _proto3.off = function off(key, callback, target) {
          var list = this._callbackTable && this._callbackTable[key];

          if (list) {
            var infos = list.callbackInfos;

            if (callback) {
              for (var i = 0; i < infos.length; ++i) {
                var info = infos[i];

                if (info && info.callback === callback && info.target === target) {
                  list.cancel(i);
                  break;
                }
              }
            } else {
              this.removeAll(key);
            }
          }
        }
        /**
         * @zh 派发一个指定事件，并传递需要的参数
         * @en Trigger an event directly with the event name and necessary arguments.
         * @param key - event type
         * @param arg0 - The first argument to be passed to the callback
         * @param arg1 - The second argument to be passed to the callback
         * @param arg2 - The third argument to be passed to the callback
         * @param arg3 - The fourth argument to be passed to the callback
         * @param arg4 - The fifth argument to be passed to the callback
         */
        ;

        _proto3.emit = function emit(key, arg0, arg1, arg2, arg3, arg4) {
          var list = this._callbackTable && this._callbackTable[key];

          if (list) {
            var rootInvoker = !list.isInvoking;
            list.isInvoking = true;
            var infos = list.callbackInfos;

            for (var i = 0, len = infos.length; i < len; ++i) {
              var info = infos[i];

              if (info) {
                var callback = info.callback;
                var target = info.target; // Pre off once callbacks to avoid influence on logic in callback

                if (info.once) {
                  this.off(key, callback, target);
                } // Lazy check validity of callback target,
                // if target is CCObject and is no longer valid, then remove the callback info directly


                if (!info.check()) {
                  this.off(key, callback, target);
                } else if (target) {
                  callback.call(target, arg0, arg1, arg2, arg3, arg4);
                } else {
                  callback(arg0, arg1, arg2, arg3, arg4);
                }
              }
            }

            if (rootInvoker) {
              list.isInvoking = false;

              if (list.containCanceled) {
                list.purgeCanceled();
              }
            }
          }
        }
        /**
         * 移除所有回调。
         */
        ;

        _proto3.clear = function clear() {
          for (var key in this._callbackTable) {
            var list = this._callbackTable[key];

            if (list) {
              list.clear();
              callbackListPool.free(list);
              delete this._callbackTable[key];
            }
          }
        };

        return CallbacksInvoker;
      }());

      if (TEST) {
        legacyCC._Test.CallbacksInvoker = CallbacksInvoker;
      }
    }
  };
});