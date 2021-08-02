"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputFlag = exports.InputMode = exports.KeyboardReturnType = void 0;

var _index = require("../../core/value-types/index.js");

/*
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

/**
 * 键盘的返回键类型。
 * @readonly
 * @enum EditBox.KeyboardReturnType
 */
let KeyboardReturnType;
exports.KeyboardReturnType = KeyboardReturnType;

(function (KeyboardReturnType) {
  KeyboardReturnType[KeyboardReturnType["DEFAULT"] = 0] = "DEFAULT";
  KeyboardReturnType[KeyboardReturnType["DONE"] = 1] = "DONE";
  KeyboardReturnType[KeyboardReturnType["SEND"] = 2] = "SEND";
  KeyboardReturnType[KeyboardReturnType["SEARCH"] = 3] = "SEARCH";
  KeyboardReturnType[KeyboardReturnType["GO"] = 4] = "GO";
  KeyboardReturnType[KeyboardReturnType["NEXT"] = 5] = "NEXT";
})(KeyboardReturnType || (exports.KeyboardReturnType = KeyboardReturnType = {}));

(0, _index.Enum)(KeyboardReturnType);
/**
 * 输入模式。
 * @readonly
 * @enum EditBox.InputMode
 */

let InputMode;
exports.InputMode = InputMode;

(function (InputMode) {
  InputMode[InputMode["ANY"] = 0] = "ANY";
  InputMode[InputMode["EMAIL_ADDR"] = 1] = "EMAIL_ADDR";
  InputMode[InputMode["NUMERIC"] = 2] = "NUMERIC";
  InputMode[InputMode["PHONE_NUMBER"] = 3] = "PHONE_NUMBER";
  InputMode[InputMode["URL"] = 4] = "URL";
  InputMode[InputMode["DECIMAL"] = 5] = "DECIMAL";
  InputMode[InputMode["SINGLE_LINE"] = 6] = "SINGLE_LINE";
})(InputMode || (exports.InputMode = InputMode = {}));

(0, _index.Enum)(InputMode);
/**
 * 定义了一些用于设置文本显示和文本格式化的标志位。
 * @readonly
 * @enum EditBox.InputFlag
 */

let InputFlag;
exports.InputFlag = InputFlag;

(function (InputFlag) {
  InputFlag[InputFlag["PASSWORD"] = 0] = "PASSWORD";
  InputFlag[InputFlag["SENSITIVE"] = 1] = "SENSITIVE";
  InputFlag[InputFlag["INITIAL_CAPS_WORD"] = 2] = "INITIAL_CAPS_WORD";
  InputFlag[InputFlag["INITIAL_CAPS_SENTENCE"] = 3] = "INITIAL_CAPS_SENTENCE";
  InputFlag[InputFlag["INITIAL_CAPS_ALL_CHARACTERS"] = 4] = "INITIAL_CAPS_ALL_CHARACTERS";
  InputFlag[InputFlag["DEFAULT"] = 5] = "DEFAULT";
})(InputFlag || (exports.InputFlag = InputFlag = {}));

(0, _index.Enum)(InputFlag);