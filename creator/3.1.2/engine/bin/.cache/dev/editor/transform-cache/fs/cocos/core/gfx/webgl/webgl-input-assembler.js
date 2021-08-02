"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLInputAssembler = void 0;

var _inputAssembler = require("../base/input-assembler.js");

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
class WebGLInputAssembler extends _inputAssembler.InputAssembler {
  constructor(...args) {
    super(...args);
    this._gpuInputAssembler = null;
  }

  get gpuInputAssembler() {
    return this._gpuInputAssembler;
  }

  initialize(info) {
    if (info.vertexBuffers.length === 0) {
      console.error('InputAssemblerInfo.vertexBuffers is null.');
      return false;
    }

    this._attributes = info.attributes;
    this._attributesHash = this.computeAttributesHash();
    this._vertexBuffers = info.vertexBuffers;

    if (info.indexBuffer) {
      this._indexBuffer = info.indexBuffer;
      this._indexCount = this._indexBuffer.size / this._indexBuffer.stride;
      this._firstIndex = 0;
    } else {
      const vertBuff = this._vertexBuffers[0];
      this._vertexCount = vertBuff.size / vertBuff.stride;
      this._firstVertex = 0;
      this._vertexOffset = 0;
    }

    this._instanceCount = 0;
    this._firstInstance = 0;
    this._indirectBuffer = info.indirectBuffer || null;
    const gpuVertexBuffers = new Array(info.vertexBuffers.length);

    for (let i = 0; i < info.vertexBuffers.length; ++i) {
      const vb = info.vertexBuffers[i];

      if (vb.gpuBuffer) {
        gpuVertexBuffers[i] = vb.gpuBuffer;
      }
    }

    let gpuIndexBuffer = null;
    let glIndexType = 0;

    if (info.indexBuffer) {
      gpuIndexBuffer = info.indexBuffer.gpuBuffer;

      if (gpuIndexBuffer) {
        switch (gpuIndexBuffer.stride) {
          case 1:
            glIndexType = 0x1401;
            break;
          // WebGLRenderingContext.UNSIGNED_BYTE

          case 2:
            glIndexType = 0x1403;
            break;
          // WebGLRenderingContext.UNSIGNED_SHORT

          case 4:
            glIndexType = 0x1405;
            break;
          // WebGLRenderingContext.UNSIGNED_INT

          default:
            {
              console.error('Error index buffer stride.');
            }
        }
      }
    }

    let gpuIndirectBuffer = null;

    if (info.indirectBuffer) {
      gpuIndirectBuffer = info.indirectBuffer.gpuBuffer;
    }

    this._gpuInputAssembler = {
      attributes: info.attributes,
      gpuVertexBuffers,
      gpuIndexBuffer,
      gpuIndirectBuffer,
      glAttribs: [],
      glIndexType,
      glVAOs: new Map()
    };
    (0, _webglCommands.WebGLCmdFuncCreateInputAssember)(this._device, this._gpuInputAssembler);
    return true;
  }

  destroy() {
    const webglDev = this._device;

    if (this._gpuInputAssembler && webglDev.useVAO) {
      (0, _webglCommands.WebGLCmdFuncDestroyInputAssembler)(webglDev, this._gpuInputAssembler);
    }

    this._gpuInputAssembler = null;
  }

}

exports.WebGLInputAssembler = WebGLInputAssembler;