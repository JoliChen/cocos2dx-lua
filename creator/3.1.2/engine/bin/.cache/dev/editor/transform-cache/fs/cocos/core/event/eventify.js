"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eventify = Eventify;

var _callbacksInvoker = require("./callbacks-invoker.js");

var _js = require("../utils/js.js");

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
 * @module event
 */

/**
 * @en Generate a new class from the given base class, after polyfill all functionalities in [[IEventified]] as if it's extended from [[EventTarget]]
 * @zh 生成一个类，该类继承自指定的基类，并以和 [[EventTarget]] 等同的方式实现了 [[IEventified]] 的所有接口。
 * @param base The base class
 * @example
 * ```ts
 * class Base { say() { console.log('Hello!'); } }
 * class MyClass extends Eventify(Base) { }
 * function (o: MyClass) {
 *     o.say(); // Ok: Extend from `Base`
 *     o.emit('sing', 'The ghost'); // Ok: `MyClass` implements IEventified
 * }
 * ```
 */
function Eventify(base) {
  class Eventified extends base {
    constructor(...args) {
      super(...args);
      this._callbackTable = (0, _js.createMap)(true);
    }

    once(type, callback, target) {
      return this.on(type, callback, target, true);
    }

    targetOff(typeOrTarget) {
      this.removeAll(typeOrTarget);
    }

  } // Mixin with `CallbacksInvokers`'s prototype


  const callbacksInvokerPrototype = _callbacksInvoker.CallbacksInvoker.prototype;
  const propertyKeys = Object.getOwnPropertyNames(callbacksInvokerPrototype).concat(Object.getOwnPropertySymbols(callbacksInvokerPrototype));

  for (let iPropertyKey = 0; iPropertyKey < propertyKeys.length; ++iPropertyKey) {
    const propertyKey = propertyKeys[iPropertyKey];

    if (!(propertyKey in Eventified.prototype)) {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(callbacksInvokerPrototype, propertyKey);

      if (propertyDescriptor) {
        Object.defineProperty(Eventified.prototype, propertyKey, propertyDescriptor);
      }
    }
  }

  return Eventified;
}