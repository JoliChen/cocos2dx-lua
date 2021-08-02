"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawBatch2D = void 0;

var _memoryPools = require("../../core/renderer/core/memory-pools.js");

var _layers = require("../../core/scene-graph/layers.js");

var _globalExports = require("../../core/global-exports.js");

var _pass = require("../../core/renderer/core/pass.js");

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
const UI_VIS_FLAG = _layers.Layers.Enum.NONE | _layers.Layers.Enum.UI_3D;

class DrawBatch2D {
  get handle() {
    return this._handle;
  }

  get hInputAssembler() {
    return _memoryPools.BatchPool2D.get(this._handle, _memoryPools.BatchView2D.INPUT_ASSEMBLER);
  }

  set hInputAssembler(handle) {
    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.INPUT_ASSEMBLER, handle);
  }

  get hDescriptorSet() {
    return _memoryPools.BatchPool2D.get(this._handle, _memoryPools.BatchView2D.DESCRIPTOR_SET);
  }

  set hDescriptorSet(handle) {
    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.DESCRIPTOR_SET, handle);
  }

  get visFlags() {
    return _memoryPools.BatchPool2D.get(this._handle, _memoryPools.BatchView2D.VIS_FLAGS);
  }

  set visFlags(vis) {
    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.VIS_FLAGS, vis);
  }

  get passes() {
    return this._passes;
  }

  constructor() {
    this.bufferBatch = null;
    this.camera = null;
    this.renderScene = null;
    this.model = null;
    this.texture = null;
    this.sampler = null;
    this.useLocalData = null;
    this.isStatic = false;
    this.textureHash = 0;
    this.samplerHash = 0;
    this._handle = _memoryPools.NULL_HANDLE;
    this._passes = [];
    this._handle = _memoryPools.BatchPool2D.alloc();

    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.VIS_FLAGS, UI_VIS_FLAG);

    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.INPUT_ASSEMBLER, _memoryPools.NULL_HANDLE);

    _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.DESCRIPTOR_SET, _memoryPools.NULL_HANDLE);
  }

  destroy(ui) {
    if (this._handle) {
      const length = this.passes.length;

      for (let i = 0; i < length; i++) {
        // @ts-expect-error hack for UI destroyHandle
        this.passes[i]._destroyHandle();
      }

      this._passes = [];

      _memoryPools.BatchPool2D.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }
  }

  clear() {
    this.bufferBatch = null;
    this.hInputAssembler = _memoryPools.NULL_HANDLE;
    this.hDescriptorSet = _memoryPools.NULL_HANDLE;
    this.camera = null;
    this.texture = null;
    this.sampler = null;
    this.model = null;
    this.isStatic = false;
    this.useLocalData = null;
    this.visFlags = UI_VIS_FLAG;
  } // object version


  fillPasses(mat, dss, dssHash, bs, bsHash, patches) {
    if (mat) {
      const passes = mat.passes;

      if (!passes) {
        return;
      }

      _memoryPools.BatchPool2D.set(this._handle, _memoryPools.BatchView2D.PASS_COUNT, passes.length);

      let passOffset = _memoryPools.BatchView2D.PASS_0;
      let shaderOffset = _memoryPools.BatchView2D.SHADER_0;
      let hashFactor = 0;

      for (let i = 0; i < passes.length; i++, passOffset++, shaderOffset++) {
        if (!this._passes[i]) {
          this._passes[i] = new _pass.Pass(_globalExports.legacyCC.director.root); // @ts-expect-error hack for UI use pass object

          this._passes[i]._handle = _memoryPools.PassPool.alloc();
        }

        const mtlPass = passes[i];
        const passInUse = this._passes[i];

        if (!dss) {
          dss = mtlPass.depthStencilState;
          dssHash = 0;
        }

        if (!bs) {
          bs = mtlPass.blendState;
          bsHash = 0;
        }

        if (bsHash === -1) {
          bsHash = 0;
        }

        hashFactor = dssHash << 16 | bsHash;
        mtlPass.update(); // @ts-expect-error hack for UI use pass object

        passInUse._initPassFromTarget(mtlPass, dss, bs, hashFactor);

        _memoryPools.BatchPool2D.set(this._handle, passOffset, passInUse.handle);

        _memoryPools.BatchPool2D.set(this._handle, shaderOffset, passInUse.getShaderVariant(patches));
      }
    }
  }

}

exports.DrawBatch2D = DrawBatch2D;