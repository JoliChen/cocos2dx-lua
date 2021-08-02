"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _js = require("../utils/js.js");

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
 * use to cache something
 *
 * @zh
 * 用于缓存某些内容
 *
 */
class Cache {
  /**
   * @en
   * Create a cache
   *
   * @zh
   * 创建一个 cache
   *
   * @param map - An object used to initialize
   *
   */
  constructor(map) {
    this._map = null;
    this._count = 0;

    if (map) {
      this._map = map;
      this._count = Object.keys(map).length;
    } else {
      this._map = _js.js.createMap(true);
      this._count = 0;
    }
  }
  /**
   * @en
   * Add Key-Value to cache
   *
   * @zh
   * 增加键值对到缓存中
   *
   * @param key - The key
   * @param val - The value
   * @returns The value
   *
   * @example
   * var cache = new Cache();
   * cache.add('test', null);
   *
   */


  add(key, val) {
    if (!(key in this._map)) {
      this._count++;
    }

    return this._map[key] = val;
  }
  /**
   * @en
   * Get the cached content by key
   *
   * @zh
   * 通过 key 获取对应的 value
   *
   * @param key - The key
   * @returns The corresponding content
   *
   * @example
   * let cache = new Cache();
   * let test = cache.get('test');
   *
   */


  get(key) {
    return this._map[key];
  }
  /**
   * @en
   * Check whether or not content exists by key
   *
   * @zh
   * 通过 Key 判断是否存在对应的内容
   *
   * @param key - The key
   * @returns True indecates that content of the key exists
   *
   * @example
   * var cache = new Cache();
   * var exist = cache.has('test');
   *
   */


  has(key) {
    return key in this._map;
  }
  /**
   * @en
   * Remove the cached content by key
   *
   * @zh
   * 通过 Key 移除对应的内容
   *
   * @param key - The key
   * @returns The removed content
   *
   * @example
   * var cache = new Cache();
   * var content = cache.remove('test');
   *
   */


  remove(key) {
    const out = this._map[key];

    if (key in this._map) {
      delete this._map[key];
      this._count--;
    }

    return out;
  }
  /**
   * @en
   * Clear all content
   *
   * @zh
   * 清除所有内容
   *
   * @example
   * var cache = new Cache();
   * cache.clear();
   *
   */


  clear() {
    if (this._count !== 0) {
      this._map = _js.js.createMap(true);
      this._count = 0;
    }
  }
  /**
   * @en
   * Enumerate all content and invoke function
   *
   * @zh
   * 枚举所有内容并执行方法
   *
   * @param func - Function to be invoked
   * @param func.val - The value
   * @param func.key - The corresponding key
   *
   * @example
   * var cache = new Cache();
   * cache.forEach((val, key) => console.log(key));
   *
   */


  forEach(func) {
    for (const key in this._map) {
      func(this._map[key], key);
    }
  }
  /**
   * @en
   * Enumerate all content to find one element which can fulfill condition
   *
   * @zh
   * 枚举所有内容，找到一个可以满足条件的元素
   *
   * @param predicate - The condition
   * @returns content
   *
   * @example
   * var cache = new Cache();
   * var val = cache.find((val, key) => key === 'test');
   *
   */


  find(predicate) {
    for (const key in this._map) {
      if (predicate(this._map[key], key)) {
        return this._map[key];
      }
    }

    return null;
  }
  /**
   * @en
   * The count of cached content
   *
   * @zh
   * 缓存数量
   *
   */


  get count() {
    return this._count;
  }
  /**
   * @en
   * Destroy this cache
   *
   * @zh
   * 销毁这个 cache
   *
   */


  destroy() {
    this._map = null;
  }

}

exports.default = Cache;