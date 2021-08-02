"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Buffer = void 0;

var _define = require("./define.js");

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
 * @module gfx
 */

/**
 * @en GFX buffer.
 * @zh GFX 缓冲。
 */
class Buffer extends _define.Obj {
  /**
   * @en Usage type of the buffer.
   * @zh 缓冲使用方式。
   */
  get usage() {
    return this._usage;
  }
  /**
   * @en Memory usage of the buffer.
   * @zh 缓冲的内存使用方式。
   */


  get memUsage() {
    return this._memUsage;
  }
  /**
   * @en Size of the buffer.
   * @zh 缓冲大小。
   */


  get size() {
    return this._size;
  }
  /**
   * @en Stride of the buffer.
   * @zh 缓冲步长。
   */


  get stride() {
    return this._stride;
  }
  /**
   * @en Count of the buffer wrt. stride.
   * @zh 缓冲条目数量。
   */


  get count() {
    return this._count;
  }

  get flags() {
    return this._flags;
  }

  constructor(device) {
    super(_define.ObjectType.BUFFER);
    this._device = void 0;
    this._usage = _define.BufferUsageBit.NONE;
    this._memUsage = _define.MemoryUsageBit.NONE;
    this._size = 0;
    this._stride = 1;
    this._count = 0;
    this._flags = _define.BufferFlagBit.NONE;
    this._indirectBuffer = null;
    this._isBufferView = false;
    this._device = device;
  }

}

exports.Buffer = Buffer;