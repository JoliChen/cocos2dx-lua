System.register("q-bundled:///fs/cocos/core/utils/x-deprecated.js", ["../platform/debug.js"], function (_export, _context) {
  "use strict";

  var error, warn, defaultLogTimes, replaceProperty, removeProperty, markAsWarning, replacePropertyLog, markAsWarningLog, removePropertyLog, messageID, messageMap;

  function setDefaultLogTimes(times) {
    if (times > 0) {
      defaultLogTimes = times;
    }
  }

  _export({
    setDefaultLogTimes: setDefaultLogTimes,
    replaceProperty: void 0,
    removeProperty: void 0,
    markAsWarning: void 0
  });

  return {
    setters: [function (_platformDebugJs) {
      error = _platformDebugJs.error;
      warn = _platformDebugJs.warn;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
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
       * @hidden
       * Note, naming this file with prefix `x-` exclude it from regular deprecated modules.
       */

      /* eslint-disable @typescript-eslint/ban-types */

      /* eslint-disable import/no-mutable-exports */

      /* eslint-disable func-names */

      /* eslint-disable @typescript-eslint/no-unsafe-return */

      /* eslint-disable prefer-const */
      defaultLogTimes = 10;
      messageID = 0;
      messageMap = new Map();

      replacePropertyLog = function replacePropertyLog(n, dp, n2, newp, f, id, s) {
        var item = messageMap.get(id);

        if (item && item.logTimes > item.count) {
          f("'%s' is deprecated, please use '%s' instead. " + s, n + "." + dp, n2 + "." + newp);
          item.count++;
        }
      };

      _export("replaceProperty", replaceProperty = function replaceProperty(owner, ownerName, properties) {
        if (owner == null) return;
        properties.forEach(function (item) {
          var id = messageID++;
          messageMap.set(id, {
            id: id,
            count: 0,
            logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
          });
          var target = item.target != null ? item.target : owner;
          var newName = item.newName != null ? item.newName : item.name;
          var targetName = item.targetName != null ? item.targetName : ownerName;
          var sameTarget = target === owner;
          var suggest = item.suggest ? "(" + item.suggest + ")" : '';

          if (item.customFunction != null) {
            owner[item.name] = function () {
              var _ref;

              replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
              return (_ref = item.customFunction).call.apply(_ref, [this].concat(Array.prototype.slice.call(arguments)));
            };
          } else if (item.customSetter != null || item.customGetter != null) {
            var hasSetter = item.customSetter != null;
            var hasGetter = item.customGetter != null;

            if (hasSetter && hasGetter) {
              Object.defineProperty(owner, item.name, {
                get: function get() {
                  replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
                  return item.customGetter.call(this);
                },
                set: function set(v) {
                  replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
                  item.customSetter.call(this, v);
                },
                enumerable: false
              });
            } else if (hasSetter) {
              Object.defineProperty(owner, item.name, {
                set: function set(v) {
                  replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
                  item.customSetter.call(this, v);
                },
                enumerable: false
              });
            } else if (hasGetter) {
              Object.defineProperty(owner, item.name, {
                get: function get() {
                  replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
                  return item.customGetter.call(this);
                },
                enumerable: false
              });
            }
          } else {
            Object.defineProperty(owner, item.name, {
              get: function get() {
                replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);
                return sameTarget ? this[newName] : target[newName];
              },
              set: function set(v) {
                replacePropertyLog(ownerName, item.name, targetName, newName, warn, id, suggest);

                if (sameTarget) {
                  this[newName] = v;
                } else {
                  target[newName] = v;
                }
              },
              enumerable: false
            });
          }
        });
      });

      removePropertyLog = function removePropertyLog(n, dp, f, id, s) {
        var item = messageMap.get(id);

        if (item && item.logTimes > item.count) {
          f("'%s' has been removed. " + s, n + "." + dp);
          item.count++;
        }
      };

      _export("removeProperty", removeProperty = function removeProperty(owner, ownerName, properties) {
        if (owner == null) return;
        properties.forEach(function (item) {
          var id = messageID++;
          messageMap.set(id, {
            id: id,
            count: 0,
            logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
          });
          var suggest = item.suggest ? "(" + item.suggest + ")" : '';
          Object.defineProperty(owner, item.name, {
            get: function get() {
              return removePropertyLog(ownerName, item.name, error, id, suggest);
            },
            set: function set() {
              removePropertyLog(ownerName, item.name, error, id, suggest);
            },
            enumerable: false
          });
        });
      });

      markAsWarningLog = function markAsWarningLog(n, dp, f, id, s) {
        var item = messageMap.get(id);

        if (item && item.logTimes > item.count) {
          f("'%s' is deprecated. " + s, n + "." + dp);
          item.count++;
        }
      };

      _export("markAsWarning", markAsWarning = function markAsWarning(owner, ownerName, properties) {
        if (owner == null) return;

        var _defaultGetSet = function _defaultGetSet(d, n, dp, f, id, s) {
          if (d.get) {
            var oldGet = d.get;

            d.get = function () {
              markAsWarningLog(n, dp, f, id, s);
              return oldGet.call(this);
            };
          }

          if (d.set) {
            var oldSet = d.set;

            d.set = function (v) {
              markAsWarningLog(n, dp, f, id, s);
              oldSet.call(this, v);
            };
          }

          Object.defineProperty(owner, dp, d);
        };

        properties.forEach(function (item) {
          var deprecatedProp = item.name;
          var descriptor = Object.getOwnPropertyDescriptor(owner, deprecatedProp);

          if (!descriptor || !descriptor.configurable) {
            return;
          }

          var id = messageID++;
          messageMap.set(id, {
            id: id,
            count: 0,
            logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
          });
          var suggest = item.suggest ? "(" + item.suggest + ")" : '';

          if (descriptor.value != null) {
            if (typeof descriptor.value === 'function') {
              var oldValue = descriptor.value;

              owner[deprecatedProp] = function () {
                markAsWarningLog(ownerName, deprecatedProp, warn, id, suggest);
                return oldValue.call.apply(oldValue, [this].concat(Array.prototype.slice.call(arguments)));
              };
            } else {
              _defaultGetSet(descriptor, ownerName, deprecatedProp, warn, id, suggest);
            }
          } else {
            _defaultGetSet(descriptor, ownerName, deprecatedProp, warn, id, suggest);
          }

          Object.defineProperty(owner, deprecatedProp, {
            enumerable: false
          });
        });
      }); // } else {
      //     // for compatible
      //     replaceProperty = () => { };
      //     removeProperty = () => { };
      //     markAsWarning = () => { };
      //     replacePropertyLog = () => { };
      //     removePropertyLog = () => { };
      //     markAsWarningLog = () => { };
      // }

    }
  };
});