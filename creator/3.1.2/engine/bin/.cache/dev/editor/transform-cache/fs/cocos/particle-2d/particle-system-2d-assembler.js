"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleSystem2DAssembler = exports.ParticleAssembler = void 0;

var _particleSystem2d = require("./particle-system-2d.js");

var _renderData = require("../2d/renderer/render-data.js");

var _globalExports = require("../core/global-exports.js");

/*
 Copyright (c) 2017-2018 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

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
 * @module particle2d
 */
const ParticleAssembler = {
  maxParticleDeltaTime: 0,

  createData(comp) {
    return _renderData.MeshRenderData.add();
  },

  updateRenderData() {},

  fillBuffers(comp, renderer) {
    if (comp === null) {
      return;
    }

    const renderData = comp._simulator.renderData;

    if (renderData.vertexCount === 0 || renderData.indicesCount === 0) {
      return;
    }

    let buffer = renderer.acquireBufferBatch();
    let vertexOffset = buffer.byteOffset >> 2;
    let indicesOffset = buffer.indicesOffset;
    let vertexId = buffer.vertexOffset;
    const isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

    if (!isRecreate) {
      buffer = renderer.currBufferBatch;
      indicesOffset = 0;
      vertexId = 0;
    } // buffer data may be realloc, need get reference after request.


    const vBuf = buffer.vData;
    const iBuf = buffer.iData;
    const vData = renderData.vData;
    const iData = renderData.iData;
    const vLen = renderData.vertexCount * 9;

    for (let i = 0; i < vLen; i++) {
      vBuf[vertexOffset++] = vData[i];
    }

    const iLen = renderData.indicesCount;

    for (let i = 0; i < iLen; i++) {
      iBuf[indicesOffset++] = iData[i] + vertexId;
    }
  }

};
exports.ParticleAssembler = ParticleAssembler;
const ParticleSystem2DAssembler = {
  getAssembler(comp) {
    if (!ParticleAssembler.maxParticleDeltaTime) {
      ParticleAssembler.maxParticleDeltaTime = _globalExports.legacyCC.game.frameTime / 1000 * 2;
    }

    return ParticleAssembler;
  }

};
exports.ParticleSystem2DAssembler = ParticleSystem2DAssembler;
_particleSystem2d.ParticleSystem2D.Assembler = ParticleSystem2DAssembler;