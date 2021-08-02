"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointFlags = exports.LineJoin = exports.LineCap = void 0;

var _enum = require("../../../core/value-types/enum.js");

/*
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
 * @en Enum for LineCap.
 * @zh 线段末端属性
 * @enum Graphics.LineCap
 */
let LineCap;
exports.LineCap = LineCap;

(function (LineCap) {
  LineCap[LineCap["BUTT"] = 0] = "BUTT";
  LineCap[LineCap["ROUND"] = 1] = "ROUND";
  LineCap[LineCap["SQUARE"] = 2] = "SQUARE";
})(LineCap || (exports.LineCap = LineCap = {}));

(0, _enum.ccenum)(LineCap);
/**
 * @en Enum for LineJoin.
 * @zh 线段拐角属性
 * @enum Graphics.LineJoin
 */

let LineJoin;
exports.LineJoin = LineJoin;

(function (LineJoin) {
  LineJoin[LineJoin["BEVEL"] = 0] = "BEVEL";
  LineJoin[LineJoin["ROUND"] = 1] = "ROUND";
  LineJoin[LineJoin["MITER"] = 2] = "MITER";
})(LineJoin || (exports.LineJoin = LineJoin = {}));

(0, _enum.ccenum)(LineJoin); // PointFlags

let PointFlags;
exports.PointFlags = PointFlags;

(function (PointFlags) {
  PointFlags[PointFlags["PT_CORNER"] = 1] = "PT_CORNER";
  PointFlags[PointFlags["PT_LEFT"] = 2] = "PT_LEFT";
  PointFlags[PointFlags["PT_BEVEL"] = 4] = "PT_BEVEL";
  PointFlags[PointFlags["PT_INNERBEVEL"] = 8] = "PT_INNERBEVEL";
})(PointFlags || (exports.PointFlags = PointFlags = {}));

(0, _enum.ccenum)(PointFlags);