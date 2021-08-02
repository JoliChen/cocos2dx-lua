System.register(['./shadows-72f55b4d.js'], function (exports) {
    'use strict';
    var FormatInfos, getTypedArrayConstructor, TextureInfo, TextureType, TextureUsageBit, TextureFlagBit, Format, BufferTextureCopy;
    return {
        setters: [function (module) {
            FormatInfos = module.b2;
            getTypedArrayConstructor = module.bb;
            TextureInfo = module.au;
            TextureType = module.H;
            TextureUsageBit = module.I;
            TextureFlagBit = module.J;
            Format = module.x;
            BufferTextureCopy = module.al;
        }],
        execute: function () {

            exports({
                P: void 0,
                R: void 0,
                n: nearestPOT
            });

            var RenderQueue;

            (function (RenderQueue) {
              RenderQueue[RenderQueue["OPAQUE"] = 0] = "OPAQUE";
              RenderQueue[RenderQueue["TRANSPARENT"] = 1] = "TRANSPARENT";
              RenderQueue[RenderQueue["OVERLAY"] = 2] = "OVERLAY";
            })(RenderQueue || (RenderQueue = exports('R', {})));

            var PassStage;

            (function (PassStage) {
              PassStage[PassStage["DEFAULT"] = 1] = "DEFAULT";
              PassStage[PassStage["FORWARD"] = 2] = "FORWARD";
              PassStage[PassStage["SHADOWCAST"] = 4] = "SHADOWCAST";
            })(PassStage || (PassStage = exports('P', {})));

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

            var TextureBufferPool = exports('T', function () {
              function TextureBufferPool(device) {
                this._device = void 0;
                this._format = Format.UNKNOWN;
                this._formatSize = 0;
                this._chunks = [];
                this._chunkCount = 0;
                this._handles = [];
                this._region0 = new BufferTextureCopy();
                this._region1 = new BufferTextureCopy();
                this._region2 = new BufferTextureCopy();
                this._roundUpFn = null;
                this._bufferViewCtor = Uint8Array;
                this._channels = 4;
                this._alignment = 1;
                this._device = device;
              }

              var _proto = TextureBufferPool.prototype;

              _proto.initialize = function initialize(info) {
                var formatInfo = FormatInfos[info.format];
                this._format = info.format;
                this._formatSize = formatInfo.size;
                this._channels = formatInfo.count;
                this._bufferViewCtor = getTypedArrayConstructor(formatInfo);
                this._roundUpFn = info.roundUpFn || null;
                this._alignment = info.alignment || 1;

                if (info.inOrderFree) {
                  this.alloc = this._McDonaldAlloc;
                }
              };

              _proto.destroy = function destroy() {
                for (var i = 0; i < this._chunkCount; ++i) {
                  var chunk = this._chunks[i];
                  chunk.texture.destroy();
                }

                this._chunks.length = 0;
                this._handles.length = 0;
              };

              _proto.alloc = function alloc(size, chunkIdx) {
                size = roundUp(size, this._alignment);
                var index = -1;
                var start = -1;

                if (chunkIdx !== undefined) {
                  index = chunkIdx;
                  start = this._findAvailableSpace(size, index);
                }

                if (start < 0) {
                  for (var i = 0; i < this._chunkCount; ++i) {
                    index = i;
                    start = this._findAvailableSpace(size, index);

                    if (start >= 0) {
                      break;
                    }
                  }
                }

                if (start >= 0) {
                  var chunk = this._chunks[index];
                  chunk.start += size;
                  var handle = {
                    chunkIdx: index,
                    start: start,
                    end: start + size,
                    texture: chunk.texture
                  };

                  this._handles.push(handle);

                  return handle;
                }

                var targetSize = Math.sqrt(size / this._formatSize);
                var texLength = this._roundUpFn && this._roundUpFn(targetSize, this._formatSize) || Math.max(1024, nearestPOT(targetSize));

                var newChunk = this._chunks[this.createChunk(texLength)];

                newChunk.start += size;
                var texHandle = {
                  chunkIdx: this._chunkCount - 1,
                  start: 0,
                  end: size,
                  texture: newChunk.texture
                };

                this._handles.push(texHandle);

                return texHandle;
              };

              _proto.free = function free(handle) {
                for (var i = 0; i < this._handles.length; ++i) {
                  if (this._handles[i] === handle) {
                    this._chunks[handle.chunkIdx].end = handle.end;

                    this._handles.splice(i, 1);

                    return;
                  }
                }
              };

              _proto.createChunk = function createChunk(length) {
                var texSize = length * length * this._formatSize;
                console.info("TextureBufferPool: Allocate chunk " + this._chunkCount + ", size: " + texSize + ", format: " + this._format);

                var texture = this._device.createTexture(new TextureInfo(TextureType.TEX2D, TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST, this._format, length, length, TextureFlagBit.IMMUTABLE));

                var chunk = {
                  texture: texture,
                  size: texSize,
                  start: 0,
                  end: texSize
                };
                this._chunks[this._chunkCount] = chunk;
                return this._chunkCount++;
              };

              _proto.update = function update(handle, buffer) {
                var buffers = [];
                var regions = [];
                var start = handle.start / this._formatSize;
                var remainSize = buffer.byteLength / this._formatSize;
                var offsetX = start % handle.texture.width;
                var offsetY = Math.floor(start / handle.texture.width);
                var copySize = Math.min(handle.texture.width - offsetX, remainSize);
                var begin = 0;

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
              };

              _proto._findAvailableSpace = function _findAvailableSpace(size, chunkIdx) {
                var chunk = this._chunks[chunkIdx];
                var isFound = false;
                var start = chunk.start;

                if (start + size <= chunk.size) {
                  isFound = true;
                } else {
                  start = 0;

                  var handles = this._handles.filter(function (h) {
                    return h.chunkIdx === chunkIdx;
                  }).sort(function (a, b) {
                    return a.start - b.start;
                  });

                  for (var i = 0; i < handles.length; i++) {
                    var handle = handles[i];

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
              };

              _proto._McDonaldAlloc = function _McDonaldAlloc(size) {
                size = roundUp(size, this._alignment);

                for (var i = 0; i < this._chunkCount; ++i) {
                  var chunk = this._chunks[i];
                  var isFound = false;
                  var start = chunk.start;

                  if (start + size <= chunk.end) {
                    isFound = true;
                  } else if (start > chunk.end) {
                    if (start + size <= chunk.size) {
                      isFound = true;
                    } else if (size <= chunk.end) {
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
                    var handle = {
                      chunkIdx: i,
                      start: start,
                      end: start + size,
                      texture: chunk.texture
                    };

                    this._handles.push(handle);

                    return handle;
                  }
                }

                var targetSize = Math.sqrt(size / this._formatSize);
                var texLength = this._roundUpFn && this._roundUpFn(targetSize, this._formatSize) || Math.max(1024, nearestPOT(targetSize));

                var newChunk = this._chunks[this.createChunk(texLength)];

                newChunk.start += size;
                var texHandle = {
                  chunkIdx: this._chunkCount,
                  start: 0,
                  end: size,
                  texture: newChunk.texture
                };

                this._handles.push(texHandle);

                return texHandle;
              };

              return TextureBufferPool;
            }());

        }
    };
});
