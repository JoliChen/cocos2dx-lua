"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nearestPOT = nearestPOT;
exports.TextureBufferPool = void 0;

var _index = require("../../gfx/index.js");

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
 * @hidden
 */
function nearestPOT(num) {
  --num;
  num |= num >> 16;
  num |= num >> 8;
  num |= num >> 4;
  num |= num >> 2;
  num |= num >> 1;
  ++num;
  return num;
}

function roundUp(n, alignment) {
  return Math.ceil(n / alignment) * alignment;
}

class TextureBufferPool {
  constructor(device) {
    this._device = void 0;
    this._format = _index.Format.UNKNOWN;
    this._formatSize = 0;
    this._chunks = [];
    this._chunkCount = 0;
    this._handles = [];
    this._region0 = new _index.BufferTextureCopy();
    this._region1 = new _index.BufferTextureCopy();
    this._region2 = new _index.BufferTextureCopy();
    this._roundUpFn = null;
    this._bufferViewCtor = Uint8Array;
    this._channels = 4;
    this._alignment = 1;
    this._device = device;
  }

  initialize(info) {
    const formatInfo = _index.FormatInfos[info.format];
    this._format = info.format;
    this._formatSize = formatInfo.size;
    this._channels = formatInfo.count;
    this._bufferViewCtor = (0, _index.getTypedArrayConstructor)(formatInfo);
    this._roundUpFn = info.roundUpFn || null;
    this._alignment = info.alignment || 1;

    if (info.inOrderFree) {
      this.alloc = this._McDonaldAlloc;
    }
  }

  destroy() {
    for (let i = 0; i < this._chunkCount; ++i) {
      const chunk = this._chunks[i];
      chunk.texture.destroy();
    }

    this._chunks.length = 0;
    this._handles.length = 0;
  }

  alloc(size, chunkIdx) {
    size = roundUp(size, this._alignment);
    let index = -1;
    let start = -1;

    if (chunkIdx !== undefined) {
      index = chunkIdx;
      start = this._findAvailableSpace(size, index);
    }

    if (start < 0) {
      for (let i = 0; i < this._chunkCount; ++i) {
        index = i;
        start = this._findAvailableSpace(size, index);

        if (start >= 0) {
          break;
        }
      }
    }

    if (start >= 0) {
      const chunk = this._chunks[index];
      chunk.start += size;
      const handle = {
        chunkIdx: index,
        start,
        end: start + size,
        texture: chunk.texture
      };

      this._handles.push(handle);

      return handle;
    } // create a new one


    const targetSize = Math.sqrt(size / this._formatSize);
    const texLength = this._roundUpFn && this._roundUpFn(targetSize, this._formatSize) || Math.max(1024, nearestPOT(targetSize));

    const newChunk = this._chunks[this.createChunk(texLength)];

    newChunk.start += size;
    const texHandle = {
      chunkIdx: this._chunkCount - 1,
      start: 0,
      end: size,
      texture: newChunk.texture
    };

    this._handles.push(texHandle);

    return texHandle;
  }

  free(handle) {
    for (let i = 0; i < this._handles.length; ++i) {
      if (this._handles[i] === handle) {
        this._chunks[handle.chunkIdx].end = handle.end;

        this._handles.splice(i, 1);

        return;
      }
    }
  }

  createChunk(length) {
    const texSize = length * length * this._formatSize;
    console.info(`TextureBufferPool: Allocate chunk ${this._chunkCount}, size: ${texSize}, format: ${this._format}`);

    const texture = this._device.createTexture(new _index.TextureInfo(_index.TextureType.TEX2D, _index.TextureUsageBit.SAMPLED | _index.TextureUsageBit.TRANSFER_DST, this._format, length, length, _index.TextureFlagBit.IMMUTABLE));

    const chunk = {
      texture,
      size: texSize,
      start: 0,
      end: texSize
    };
    this._chunks[this._chunkCount] = chunk;
    return this._chunkCount++;
  }

  update(handle, buffer) {
    const buffers = [];
    const regions = [];
    const start = handle.start / this._formatSize;
    let remainSize = buffer.byteLength / this._formatSize;
    let offsetX = start % handle.texture.width;
    let offsetY = Math.floor(start / handle.texture.width);
    let copySize = Math.min(handle.texture.width - offsetX, remainSize);
    let begin = 0;

    if (offsetX > 0) {
      this._region0.texOffset.x = offsetX;
      this._region0.texOffset.y = offsetY;
      this._region0.texExtent.width = copySize;
      this._region0.texExtent.height = 1;
      buffers.push(new this._bufferViewCtor(buffer, begin * this._formatSize, copySize * this._channels));
      regions.push(this._region0);
      offsetX = 0;
      offsetY += 1;
      remainSize -= copySize;
      begin += copySize;
    }

    if (remainSize > 0) {
      this._region1.texOffset.x = offsetX;
      this._region1.texOffset.y = offsetY;

      if (remainSize > handle.texture.width) {
        this._region1.texExtent.width = handle.texture.width;
        this._region1.texExtent.height = Math.floor(remainSize / handle.texture.width);
        copySize = this._region1.texExtent.width * this._region1.texExtent.height;
      } else {
        copySize = remainSize;
        this._region1.texExtent.width = copySize;
        this._region1.texExtent.height = 1;
      }

      buffers.push(new this._bufferViewCtor(buffer, begin * this._formatSize, copySize * this._channels));
      regions.push(this._region1);
      offsetX = 0;
      offsetY += this._region1.texExtent.height;
      remainSize -= copySize;
      begin += copySize;
    }

    if (remainSize > 0) {
      this._region2.texOffset.x = offsetX;
      this._region2.texOffset.y = offsetY;
      this._region2.texExtent.width = remainSize;
      this._region2.texExtent.height = 1;
      buffers.push(new this._bufferViewCtor(buffer, begin * this._formatSize, remainSize * this._channels));
      regions.push(this._region2);
    }

    this._device.copyBuffersToTexture(buffers, handle.texture, regions);
  }

  _findAvailableSpace(size, chunkIdx) {
    const chunk = this._chunks[chunkIdx];
    let isFound = false;
    let start = chunk.start;

    if (start + size <= chunk.size) {
      isFound = true;
    } else {
      start = 0; // try to find from head again

      const handles = this._handles.filter(h => h.chunkIdx === chunkIdx).sort((a, b) => a.start - b.start);

      for (let i = 0; i < handles.length; i++) {
        const handle = handles[i];

        if (start + size <= handle.start) {
          isFound = true;
          break;
        }

        start = handle.end;
      }

      if (!isFound && start + size <= chunk.size) {
        isFound = true;
      }
    }

    return isFound ? start : -1;
  } // [McDonald 12] Efficient Buffer Management


  _McDonaldAlloc(size) {
    size = roundUp(size, this._alignment);

    for (let i = 0; i < this._chunkCount; ++i) {
      const chunk = this._chunks[i];
      let isFound = false;
      let start = chunk.start;

      if (start + size <= chunk.end) {
        isFound = true;
      } else if (start > chunk.end) {
        if (start + size <= chunk.size) {
          isFound = true;
        } else if (size <= chunk.end) {
          // Try to find from head again.
          chunk.start = start = 0;
          isFound = true;
        }
      } else if (start === chunk.end) {
        chunk.start = start = 0;
        chunk.end = chunk.size;

        if (size <= chunk.end) {
          isFound = true;
        }
      }

      if (isFound) {
        chunk.start += size;
        const handle = {
          chunkIdx: i,
          start,
          end: start + size,
          texture: chunk.texture
        };

        this._handles.push(handle);

        return handle;
      }
    } // create a new one


    const targetSize = Math.sqrt(size / this._formatSize);
    const texLength = this._roundUpFn && this._roundUpFn(targetSize, this._formatSize) || Math.max(1024, nearestPOT(targetSize));

    const newChunk = this._chunks[this.createChunk(texLength)];

    newChunk.start += size;
    const texHandle = {
      chunkIdx: this._chunkCount,
      start: 0,
      end: size,
      texture: newChunk.texture
    };

    this._handles.push(texHandle);

    return texHandle;
  }

}

exports.TextureBufferPool = TextureBufferPool;