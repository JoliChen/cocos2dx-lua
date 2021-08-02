"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAssembler = void 0;

var _murmurhash2_gc = require("../../utils/murmurhash2_gc.js");

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
 * @en GFX input assembler.
 * @zh GFX 输入汇集器。
 */
class InputAssembler extends _define.Obj {
  /**
   * @en Get current vertex buffers.
   * @zh 顶点缓冲数组。
   */
  get vertexBuffers() {
    return this._vertexBuffers;
  }
  /**
   * @en Get current index buffer.
   * @zh 索引缓冲。
   */


  get indexBuffer() {
    return this._indexBuffer;
  }
  /**
   * @en Get current attributes.
   * @zh 顶点属性数组。
   */


  get attributes() {
    return this._attributes;
  }
  /**
   * @en Get hash of current attributes.
   * @zh 获取顶点属性数组的哈希值。
   */


  get attributesHash() {
    return this._attributesHash;
  }
  /**
   * @en Get current vertex count.
   * @zh 顶点数量。
   */


  get vertexCount() {
    return this._vertexCount;
  }

  set vertexCount(count) {
    this._vertexCount = count;
  }
  /**
   * @en Get starting vertex.
   * @zh 起始顶点。
   */


  get firstVertex() {
    return this._firstVertex;
  }

  set firstVertex(first) {
    this._firstVertex = first;
  }
  /**
   * @en Get current index count.
   * @zh 索引数量。
   */


  get indexCount() {
    return this._indexCount;
  }

  set indexCount(count) {
    this._indexCount = count;
  }
  /**
   * @en Get starting index.
   * @zh 起始索引。
   */


  get firstIndex() {
    return this._firstIndex;
  }

  set firstIndex(first) {
    this._firstIndex = first;
  }
  /**
   * @en Get current vertex offset.
   * @zh 顶点偏移量。
   */


  get vertexOffset() {
    return this._vertexOffset;
  }

  set vertexOffset(offset) {
    this._vertexOffset = offset;
  }
  /**
   * @en Get current instance count.
   * @zh 实例数量。
   */


  get instanceCount() {
    return this._instanceCount;
  }

  set instanceCount(count) {
    this._instanceCount = count;
  }
  /**
   * @en Get starting instance.
   * @zh 起始实例。
   */


  get firstInstance() {
    return this._firstInstance;
  }

  set firstInstance(first) {
    this._firstInstance = first;
  }
  /**
   * @en Get the indirect buffer, if present.
   * @zh 间接绘制缓冲。
   */


  get indirectBuffer() {
    return this._indirectBuffer;
  }

  constructor(device) {
    super(_define.ObjectType.INPUT_ASSEMBLER);
    this._device = void 0;
    this._attributes = [];
    this._vertexBuffers = [];
    this._indexBuffer = null;
    this._vertexCount = 0;
    this._firstVertex = 0;
    this._indexCount = 0;
    this._firstIndex = 0;
    this._vertexOffset = 0;
    this._instanceCount = 0;
    this._firstInstance = 0;
    this._attributesHash = 0;
    this._indirectBuffer = null;
    this._device = device;
  }
  /**
   * @en Get the specified vertex buffer.
   * @zh 获取顶点缓冲。
   * @param stream The stream index of the vertex buffer.
   */


  getVertexBuffer(stream = 0) {
    if (stream < this._vertexBuffers.length) {
      return this._vertexBuffers[stream];
    } else {
      return null;
    }
  }

  computeAttributesHash() {
    let res = 'attrs';

    for (let i = 0; i < this.attributes.length; ++i) {
      const at = this.attributes[i];
      res += `,${at.name},${at.format},${at.isNormalized},${at.stream},${at.isInstanced}`;
    }

    return (0, _murmurhash2_gc.murmurhash2_32_gc)(res, 666);
  }

}

exports.InputAssembler = InputAssembler;