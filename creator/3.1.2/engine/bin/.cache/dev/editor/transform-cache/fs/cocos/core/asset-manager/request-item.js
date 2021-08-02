"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
 * @module asset-manager
 */

/**
 * @en
 * A collection of information about a request
 *
 * @zh
 * 请求的相关信息集合
 *
 */
class RequestItem {
  constructor() {
    this.uuid = '';
    this.url = '';
    this.ext = '.json';
    this.content = null;
    this.file = null;
    this.info = null;
    this.config = null;
    this.isNative = false;
    this.options = Object.create(null);
    this._id = '';
  }

  /**
   * @en
   * The id of request, combined from uuid and isNative
   *
   * @zh
   * 请求的 id, 由 uuid 和 isNative 组合而成
   */
  get id() {
    if (!this._id) {
      this._id = `${this.uuid}@${this.isNative ? 'native' : 'import'}`;
    }

    return this._id;
  }

  /**
   * @en
   * Create a new request item from pool
   *
   * @zh
   * 从对象池中创建 requestItem
   *
   * @returns requestItem
   *
   */
  static create() {
    let out;

    if (RequestItem._deadPool.length !== 0) {
      out = RequestItem._deadPool.pop();
    } else {
      out = new RequestItem();
    }

    return out;
  }

  /**
   * @en
   * Recycle this for reuse
   *
   * @zh
   * 回收 requestItem 用于复用
   *
   */
  recycle() {
    if (RequestItem._deadPool.length === RequestItem.MAX_DEAD_NUM) {
      return;
    }

    this._id = '';
    this.uuid = '';
    this.url = '';
    this.ext = '.json';
    this.content = null;
    this.file = null;
    this.info = null;
    this.config = null;
    this.isNative = false;
    this.options = Object.create(null);

    RequestItem._deadPool.push(this);
  }

}

exports.default = RequestItem;
RequestItem.MAX_DEAD_NUM = 500;
RequestItem._deadPool = [];