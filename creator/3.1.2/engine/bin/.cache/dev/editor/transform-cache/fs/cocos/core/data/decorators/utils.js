"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSmartClassDecorator = makeSmartClassDecorator;
exports.makeEditorClassDecoratorFn = makeEditorClassDecoratorFn;
exports.makeSmartEditorClassDecorator = makeSmartEditorClassDecorator;
exports.getClassCache = getClassCache;
exports.getSubDict = getSubDict;
exports.CACHE_KEY = exports.emptySmartClassDecorator = exports.emptyDecoratorFn = exports.emptyDecorator = void 0;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _class = require("../class.js");

var _debug = require("../../platform/debug.js");

var _js = require("../../utils/js.js");

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
 * @module decorator
 */

/**
 * @en
 * A class(or property) decorator which does nothing.
 * @zh
 * 一个什么也不做的类（或属性）装饰器。
 */
const emptyDecorator = () => {};
/**
 * @en
 * A function which ignore all arguments and return the `emptyDecorator`.
 * @zh
 * 一个忽略所有参数并且返回 `emptyDecorator` 的函数。
 */


exports.emptyDecorator = emptyDecorator;

const emptyDecoratorFn = () => emptyDecorator;
/**
 * @en
 * Acts like `emptyDecorator` if called in form of `@x`;
 * acts like `emptyDecoratorFn` if called in form of `@x(...args)`.
 * @zh
 * 当以 `@x` 形式调用时表现如同 `emptyDecorator`，当以 `@x(...args)` 形式调用时表现如同 `emptyDecoratorFn`。
 */


exports.emptyDecoratorFn = emptyDecoratorFn;
const emptySmartClassDecorator = makeSmartClassDecorator(() => {});
/**
 * @en
 * Make a smart class decorator which can properly handle the following form decorator syntax:
 * - `@x`
 * - `@x(arg0)`
 *
 * and forward both the decorated class and the `arg0` (in first form, `arg0` is forward as `undefined`) to
 * `decorate`.
 * @zh
 * 创建一个智能类装饰器，它能正确地处理以下形式的装饰器语法：
 * - `@x`
 * - `@x(arg0)`
 *
 * 并且，将被装饰的类和 `arg0`（若是第一种形式，`arg0` 就是 `undefined`）一起转发给 `decorate`。
 * @param decorate
 */

exports.emptySmartClassDecorator = emptySmartClassDecorator;

function makeSmartClassDecorator(decorate) {
  return proxyFn;

  function proxyFn(target) {
    if (typeof target === 'function') {
      // If no parameter specified
      return decorate(target);
    } else {
      return function (constructor) {
        return decorate(constructor, target);
      };
    }
  }
}

function writeEditorClassProperty(constructor, propertyName, value) {
  const cache = getClassCache(constructor, propertyName);

  if (cache) {
    const proto = getSubDict(cache, 'proto');
    getSubDict(proto, 'editor')[propertyName] = value;
  }
}
/**
 * @en
 * Make a function which accept an argument value and return a class decorator.
 * The decorator sets the editor property `propertyName`, on the decorated class, into that argument value.
 * @zh
 * 创建一个函数，该函数接受一个参数值并返回一个类装饰器。
 * 该装饰器将被装饰类的编辑器属性 `propertyName` 设置为该参数的值。
 * @param propertyName The editor property.
 */


function makeEditorClassDecoratorFn(propertyName) {
  return value => constructor => {
    writeEditorClassProperty(constructor, propertyName, value);
  };
}
/**
 * Make a smart class decorator.
 * The smart decorator sets the editor property `propertyName`, on the decorated class, into:
 * - `defaultValue` if the decorator is called with `@x` form, or
 * - the argument if the decorator is called with an argument, eg, the `@x(arg0)` form.
 * @zh
 * 创建一个智能类装饰器。
 * 该智能类装饰器将根据以下情况来设置被装饰类的编辑器属性 `propertyName`：
 * - 如果该装饰器是以 `@x` 形式调用的，该属性将被设置为 `defaultValue`。
 * - 如果该装饰器是以一个参数的形式，即 `@x(arg0)` 的形式调用的，该属性将被设置为传入的参数值。
 * @param propertyName The editor property.
 */


function makeSmartEditorClassDecorator(propertyName, defaultValue) {
  return makeSmartClassDecorator((constructor, decoratedValue) => {
    writeEditorClassProperty(constructor, propertyName, defaultValue !== undefined ? defaultValue : decoratedValue);
  });
} // caches for class construction


const CACHE_KEY = '__ccclassCache__';
exports.CACHE_KEY = CACHE_KEY;

function getClassCache(ctor, decoratorName) {
  if (_internal253Aconstants.DEV && _class.CCClass._isCCClass(ctor)) {
    (0, _debug.error)('`@%s` should be used after @ccclass for class "%s"', decoratorName, _js.js.getClassName(ctor));
    return null;
  }

  return getSubDict(ctor, CACHE_KEY);
}

function getSubDict(obj, key) {
  return obj[key] || (obj[key] = {});
}