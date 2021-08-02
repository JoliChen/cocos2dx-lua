"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandBuffer = void 0;

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
 * @en GFX command buffer.
 * @zh GFX 命令缓冲。
 */
class CommandBuffer extends _define.Obj {
  /**
   * @en Type of the command buffer.
   * @zh 命令缓冲类型。
   */
  get type() {
    return this._type;
  }
  /**
   * @en Type of the command buffer.
   * @zh 命令缓冲类型。
   */


  get queue() {
    return this._queue;
  }
  /**
   * @en Number of draw calls currently recorded.
   * @zh 绘制调用次数。
   */


  get numDrawCalls() {
    return this._numDrawCalls;
  }
  /**
   * @en Number of instances currently recorded.
   * @zh 绘制 Instance 数量。
   */


  get numInstances() {
    return this._numInstances;
  }
  /**
   * @en Number of triangles currently recorded.
   * @zh 绘制三角形数量。
   */


  get numTris() {
    return this._numTris;
  }

  constructor(device) {
    super(_define.ObjectType.COMMAND_BUFFER);
    this._device = void 0;
    this._queue = null;
    this._type = _define.CommandBufferType.PRIMARY;
    this._numDrawCalls = 0;
    this._numInstances = 0;
    this._numTris = 0;
    this._device = device;
  }

}

exports.CommandBuffer = CommandBuffer;