"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.size = size;
exports.Size = void 0;

var _class = require("../data/class.js");

var _valueType = require("../value-types/value-type.js");

var _globalExports = require("../global-exports.js");

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
 * @module core/math
 */

/**
 * @en Two dimensional size type representing the width and height.
 * @zh 二维尺寸。
 */
class Size extends _valueType.ValueType {
  /**
   * @en Calculate the interpolation result between this size and another one with given ratio
   * @zh 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
   * @param out Output Size.
   * @param from Original Size.
   * @param to Target Size.
   * @param ratio The interpolation coefficient.The range is [0,1].
   * @returns A vector consisting of linear interpolation of the width and height of the current size to the width and height of the target size at a specified interpolation ratio, respectively.
   */
  static lerp(out, from, to, ratio) {
    out.width = from.width + (to.width - from.width) * ratio;
    out.height = from.height + (to.height - from.height) * ratio;
    return out;
  } // compatibility with vector interfaces


  set x(val) {
    this.width = val;
  }

  get x() {
    return this.width;
  }

  set y(val) {
    this.height = val;
  }

  get y() {
    return this.height;
  }

  constructor(width, height) {
    super();

    if (width && typeof width === 'object') {
      this.width = width.width;
      this.height = width.height;
    } else {
      this.width = width || 0;
      this.height = height || 0;
    }
  }
  /**
   * @en clone the current `Size`.
   * @zh 克隆当前尺寸。
   */


  clone() {
    return new Size(this.width, this.height);
  }
  /**
   * @en Set values with another `Size`.
   * @zh 设置当前尺寸使其与指定的尺寸相等。
   * @param other Specified Size.
   * @returns `this`
   */


  set(width, height) {
    if (width && typeof width === 'object') {
      this.height = width.height;
      this.width = width.width;
    } else {
      this.width = width || 0;
      this.height = height || 0;
    }

    return this;
  }
  /**
   * @en Check whether the current `Size` equals another one.
   * @zh 判断当前尺寸是否与指定尺寸的相等。
   * @param other Specified Size
   * @returns Returns `true' when both dimensions are equal in width and height; otherwise returns `false'.
   */


  equals(other) {
    return this.width === other.width && this.height === other.height;
  }
  /**
   * @en Calculate the interpolation result between this size and another one with given ratio
   * @zh 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
   * @param to Target Size.
   * @param ratio The interpolation coefficient.The range is [0,1].
   */


  lerp(to, ratio) {
    this.width += (to.width - this.width) * ratio;
    this.height += (to.height - this.height) * ratio;
    return this;
  }
  /**
   * @en Return the information of the current size in string
   * @zh 返回当前尺寸的字符串表示。
   * @returns The information of the current size in string
   */


  toString() {
    return `(${this.width.toFixed(2)}, ${this.height.toFixed(2)})`;
  }

}

exports.Size = Size;
Size.ZERO = Object.freeze(new Size(0, 0));
Size.ONE = Object.freeze(new Size(1, 1));

_class.CCClass.fastDefine('cc.Size', Size, {
  width: 0,
  height: 0
});
/**
 * @en Constructs a `Size` object.
 * @zh 等价于 `new Size(other)`。
 * @param other Specified Size.
 * @returns `new Size(other)`
 */


function size(width = 0, height = 0) {
  return new Size(width, height);
}

_globalExports.legacyCC.size = size;
_globalExports.legacyCC.Size = Size;