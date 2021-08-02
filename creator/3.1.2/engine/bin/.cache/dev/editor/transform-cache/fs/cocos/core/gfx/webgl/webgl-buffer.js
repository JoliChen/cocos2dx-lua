"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLBuffer = void 0;

var _define = require("../base/define.js");

var _buffer = require("../base/buffer.js");

var _webglCommands = require("./webgl-commands.js");

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
class WebGLBuffer extends _buffer.Buffer {
  constructor(...args) {
    super(...args);
    this._gpuBuffer = null;
    this._gpuBufferView = null;
    this._uniformBuffer = null;
  }

  get gpuBuffer() {
    return this._gpuBuffer;
  }

  get gpuBufferView() {
    return this._gpuBufferView;
  }

  initialize(info) {
    if ('buffer' in info) {
      // buffer view
      this._isBufferView = true;
      const buffer = info.buffer;
      this._usage = buffer.usage;
      this._memUsage = buffer.memUsage;
      this._size = this._stride = info.range;
      this._count = 1;
      this._flags = buffer.flags;
      this._gpuBufferView = {
        gpuBuffer: buffer.gpuBuffer,
        offset: info.offset,
        range: info.range
      };
    } else {
      // native buffer
      this._usage = info.usage;
      this._memUsage = info.memUsage;
      this._size = info.size;
      this._stride = Math.max(info.stride || this._size, 1);
      this._count = this._size / this._stride;
      this._flags = info.flags;

      if (this._usage & _define.BufferUsageBit.INDIRECT) {
        this._indirectBuffer = new _define.IndirectBuffer();
      }

      if (this._usage & _define.BufferUsageBit.UNIFORM && this._size > 0) {
        this._uniformBuffer = new Uint8Array(this._size);
      }

      this._gpuBuffer = {
        usage: this._usage,
        memUsage: this._memUsage,
        size: this._size,
        stride: this._stride,
        buffer: null,
        vf32: null,
        indirects: [],
        glTarget: 0,
        glBuffer: null
      };

      if (info.usage & _define.BufferUsageBit.INDIRECT) {
        this._gpuBuffer.indirects = this._indirectBuffer.drawInfos;
      }

      if (this._usage & _define.BufferUsageBit.UNIFORM) {
        this._gpuBuffer.buffer = this._uniformBuffer;
      }

      (0, _webglCommands.WebGLCmdFuncCreateBuffer)(this._device, this._gpuBuffer);
      this._device.memoryStatus.bufferSize += this._size;
    }

    return true;
  }

  destroy() {
    if (this._gpuBuffer) {
      (0, _webglCommands.WebGLCmdFuncDestroyBuffer)(this._device, this._gpuBuffer);
      this._device.memoryStatus.bufferSize -= this._size;
      this._gpuBuffer = null;
    }

    if (this._gpuBufferView) {
      this._gpuBufferView = null;
    }
  }

  resize(size) {
    if (this._isBufferView) {
      console.warn('cannot resize buffer views!');
      return;
    }

    const oldSize = this._size;

    if (oldSize === size) {
      return;
    }

    this._size = size;
    this._count = this._size / this._stride;

    if (this._uniformBuffer) {
      this._uniformBuffer = new Uint8Array(size);
    }

    if (this._gpuBuffer) {
      if (this._uniformBuffer) {
        this._gpuBuffer.buffer = this._uniformBuffer;
      }

      this._gpuBuffer.size = size;

      if (size > 0) {
        (0, _webglCommands.WebGLCmdFuncResizeBuffer)(this._device, this._gpuBuffer);
        this._device.memoryStatus.bufferSize -= oldSize;
        this._device.memoryStatus.bufferSize += size;
      }
    }
  }

  update(buffer, size) {
    if (this._isBufferView) {
      console.warn('cannot update through buffer views!');
      return;
    }

    let buffSize;

    if (size !== undefined) {
      buffSize = size;
    } else if (this._usage & _define.BufferUsageBit.INDIRECT) {
      buffSize = 0;
    } else {
      buffSize = buffer.byteLength;
    }

    (0, _webglCommands.WebGLCmdFuncUpdateBuffer)(this._device, this._gpuBuffer, buffer, 0, buffSize);
  }

}

exports.WebGLBuffer = WebGLBuffer;