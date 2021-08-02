"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.type = type;
exports.string = exports.boolean = exports.float = exports.integer = void 0;

var _property = require("./property.js");

var _attribute = require("../utils/attribute.js");

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
 * @en Declare the property as integer
 * @zh 将该属性标记为整数。
 */
const integer = type(_attribute.CCInteger);
/**
 * @en Declare the property as float
 * @zh 将该属性标记为浮点数。
 */

exports.integer = integer;
const float = type(_attribute.CCFloat);
/**
 * @en Declare the property as boolean
 * @zh 将该属性标记为布尔值。
 */

exports.float = float;
const boolean = type(_attribute.CCBoolean);
/**
 * @en Declare the property as string
 * @zh 将该属性标记为字符串。
 */

exports.boolean = boolean;
const string = type(_attribute.CCString);
/**
 * @en Declare the property as the given type
 * @zh 标记该属性的类型。
 * @param type
 */

exports.string = string;

function type(type) {
  return (0, _property.property)({
    type
  });
}