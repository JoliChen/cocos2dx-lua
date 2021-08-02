"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultLogTimes = setDefaultLogTimes;
exports.markAsWarning = exports.removeProperty = exports.replaceProperty = void 0;

var _debug = require("../platform/debug.js");

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
let defaultLogTimes = 10;

function setDefaultLogTimes(times) {
  if (times > 0) {
    defaultLogTimes = times;
  }
}

let replaceProperty;
exports.replaceProperty = replaceProperty;
let removeProperty;
exports.removeProperty = removeProperty;
let markAsWarning;
exports.markAsWarning = markAsWarning;
let replacePropertyLog;
let markAsWarningLog;
let removePropertyLog; // if (DEBUG) {

let messageID = 0;
const messageMap = new Map();

replacePropertyLog = (n, dp, n2, newp, f, id, s) => {
  const item = messageMap.get(id);

  if (item && item.logTimes > item.count) {
    f(`'%s' is deprecated, please use '%s' instead. ${s}`, `${n}.${dp}`, `${n2}.${newp}`);
    item.count++;
  }
};

exports.replaceProperty = replaceProperty = (owner, ownerName, properties) => {
  if (owner == null) return;
  properties.forEach(item => {
    const id = messageID++;
    messageMap.set(id, {
      id,
      count: 0,
      logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
    });
    const target = item.target != null ? item.target : owner;
    const newName = item.newName != null ? item.newName : item.name;
    const targetName = item.targetName != null ? item.targetName : ownerName;
    const sameTarget = target === owner;
    const suggest = item.suggest ? `(${item.suggest})` : '';

    if (item.customFunction != null) {
      owner[item.name] = function () {
        replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
        return item.customFunction.call(this, ...arguments);
      };
    } else if (item.customSetter != null || item.customGetter != null) {
      const hasSetter = item.customSetter != null;
      const hasGetter = item.customGetter != null;

      if (hasSetter && hasGetter) {
        Object.defineProperty(owner, item.name, {
          get() {
            replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
            return item.customGetter.call(this);
          },

          set(v) {
            replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
            item.customSetter.call(this, v);
          },

          enumerable: false
        });
      } else if (hasSetter) {
        Object.defineProperty(owner, item.name, {
          set(v) {
            replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
            item.customSetter.call(this, v);
          },

          enumerable: false
        });
      } else if (hasGetter) {
        Object.defineProperty(owner, item.name, {
          get() {
            replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
            return item.customGetter.call(this);
          },

          enumerable: false
        });
      }
    } else {
      Object.defineProperty(owner, item.name, {
        get() {
          replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);
          return sameTarget ? this[newName] : target[newName];
        },

        set(v) {
          replacePropertyLog(ownerName, item.name, targetName, newName, _debug.warn, id, suggest);

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
};

removePropertyLog = (n, dp, f, id, s) => {
  const item = messageMap.get(id);

  if (item && item.logTimes > item.count) {
    f(`'%s' has been removed. ${s}`, `${n}.${dp}`);
    item.count++;
  }
};

exports.removeProperty = removeProperty = (owner, ownerName, properties) => {
  if (owner == null) return;
  properties.forEach(item => {
    const id = messageID++;
    messageMap.set(id, {
      id,
      count: 0,
      logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
    });
    const suggest = item.suggest ? `(${item.suggest})` : '';
    Object.defineProperty(owner, item.name, {
      get() {
        return removePropertyLog(ownerName, item.name, _debug.error, id, suggest);
      },

      set() {
        removePropertyLog(ownerName, item.name, _debug.error, id, suggest);
      },

      enumerable: false
    });
  });
};

markAsWarningLog = (n, dp, f, id, s) => {
  const item = messageMap.get(id);

  if (item && item.logTimes > item.count) {
    f(`'%s' is deprecated. ${s}`, `${n}.${dp}`);
    item.count++;
  }
};

exports.markAsWarning = markAsWarning = (owner, ownerName, properties) => {
  if (owner == null) return;

  const _defaultGetSet = (d, n, dp, f, id, s) => {
    if (d.get) {
      const oldGet = d.get;

      d.get = function () {
        markAsWarningLog(n, dp, f, id, s);
        return oldGet.call(this);
      };
    }

    if (d.set) {
      const oldSet = d.set;

      d.set = function (v) {
        markAsWarningLog(n, dp, f, id, s);
        oldSet.call(this, v);
      };
    }

    Object.defineProperty(owner, dp, d);
  };

  properties.forEach(item => {
    const deprecatedProp = item.name;
    const descriptor = Object.getOwnPropertyDescriptor(owner, deprecatedProp);

    if (!descriptor || !descriptor.configurable) {
      return;
    }

    const id = messageID++;
    messageMap.set(id, {
      id,
      count: 0,
      logTimes: item.logTimes !== undefined ? item.logTimes : defaultLogTimes
    });
    const suggest = item.suggest ? `(${item.suggest})` : '';

    if (descriptor.value != null) {
      if (typeof descriptor.value === 'function') {
        const oldValue = descriptor.value;

        owner[deprecatedProp] = function () {
          markAsWarningLog(ownerName, deprecatedProp, _debug.warn, id, suggest);
          return oldValue.call(this, ...arguments);
        };
      } else {
        _defaultGetSet(descriptor, ownerName, deprecatedProp, _debug.warn, id, suggest);
      }
    } else {
      _defaultGetSet(descriptor, ownerName, deprecatedProp, _debug.warn, id, suggest);
    }

    Object.defineProperty(owner, deprecatedProp, {
      enumerable: false
    });
  });
}; // } else {
//     // for compatible
//     replaceProperty = () => { };
//     removeProperty = () => { };
//     markAsWarning = () => { };
//     replacePropertyLog = () => { };
//     removePropertyLog = () => { };
//     markAsWarningLog = () => { };
// }