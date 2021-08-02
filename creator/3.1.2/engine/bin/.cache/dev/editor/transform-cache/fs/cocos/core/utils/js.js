"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  array: true,
  js: true,
  IDGenerator: true,
  Pool: true
};
Object.defineProperty(exports, "IDGenerator", {
  enumerable: true,
  get: function () {
    return _idGenerator.default;
  }
});
Object.defineProperty(exports, "Pool", {
  enumerable: true,
  get: function () {
    return _pool.default;
  }
});
exports.js = exports.array = void 0;

var jsarray = _interopRequireWildcard(require("./array.js"));

var _idGenerator = _interopRequireDefault(require("./id-generator.js"));

var _jsTyped = require("./js-typed.js");

Object.keys(_jsTyped).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _jsTyped[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jsTyped[key];
    }
  });
});

var _pool = _interopRequireDefault(require("./pool.js"));

var _globalExports = require("../global-exports.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
const array = jsarray;
exports.array = array;
const js = {
  IDGenerator: _idGenerator.default,
  Pool: _pool.default,
  array: jsarray,
  isNumber: _jsTyped.isNumber,
  isString: _jsTyped.isString,
  isEmptyObject: _jsTyped.isEmptyObject,
  getPropertyDescriptor: _jsTyped.getPropertyDescriptor,
  addon: _jsTyped.addon,
  mixin: _jsTyped.mixin,
  extend: _jsTyped.extend,
  getSuper: _jsTyped.getSuper,
  isChildClassOf: _jsTyped.isChildClassOf,
  clear: _jsTyped.clear,
  value: _jsTyped.value,
  getset: _jsTyped.getset,
  get: _jsTyped.get,
  set: _jsTyped.set,
  unregisterClass: _jsTyped.unregisterClass,
  getClassName: _jsTyped.getClassName,
  setClassName: _jsTyped.setClassName,
  setClassAlias: _jsTyped.setClassAlias,
  getClassByName: _jsTyped.getClassByName,

  /**
   * @en All classes registered in the engine, indexed by name.
   * @zh 引擎中已注册的所有类型，通过名称进行索引。
   * @private
   * @example
   * ```
   * import { js } from 'cc';
   * // save all registered classes before loading scripts
   * let builtinClassIds = js._registeredClassIds;
   * let builtinClassNames = js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * js._registeredClassIds = builtinClassIds;
   * js._registeredClassNames = builtinClassNames;
   * ```
   */
  get _registeredClassNames() {
    return { ..._jsTyped._nameToClass
    };
  },

  set _registeredClassNames(value) {
    (0, _jsTyped.clear)(_jsTyped._nameToClass);
    Object.assign(_jsTyped._nameToClass, value);
  },

  /**
   * @en All classes registered in the engine, indexed by ID.
   * @zh 引擎中已注册的所有类型，通过 ID 进行索引。
   * @private
   * @example
   * ```
   * import { js } from 'cc';
   * // save all registered classes before loading scripts
   * let builtinClassIds = js._registeredClassIds;
   * let builtinClassNames = js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * js._registeredClassIds = builtinClassIds;
   * js._registeredClassNames = builtinClassNames;
   * ```
   */
  get _registeredClassIds() {
    return { ..._jsTyped._idToClass
    };
  },

  set _registeredClassIds(value) {
    (0, _jsTyped.clear)(_jsTyped._idToClass);
    Object.assign(_jsTyped._idToClass, value);
  },

  _getClassId: _jsTyped._getClassId,
  _setClassId: _jsTyped._setClassId,
  _getClassById: _jsTyped._getClassById,
  obsolete: _jsTyped.obsolete,
  obsoletes: _jsTyped.obsoletes,
  formatStr: _jsTyped.formatStr,
  shiftArguments: _jsTyped.shiftArguments,
  createMap: _jsTyped.createMap
};
/**
 * @en This module provides some JavaScript utilities. All members can be accessed via `import { js } from 'cc'`.
 * @zh 这个模块封装了 JavaScript 相关的一些实用函数，你可以通过 `import { js } from 'cc'` 来访问这个模块。
 */

exports.js = js;
_globalExports.legacyCC.js = js;