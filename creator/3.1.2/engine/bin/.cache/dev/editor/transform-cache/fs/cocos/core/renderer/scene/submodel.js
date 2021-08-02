"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubModel = void 0;

var _define = require("../../pipeline/define.js");

var _pass = require("../core/pass.js");

var _memoryPools = require("../core/memory-pools.js");

var _index = require("../../gfx/index.js");

var _globalExports = require("../../global-exports.js");

var _index2 = require("../../platform/index.js");

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
const _dsInfo = new _index.DescriptorSetInfo(null);

const MAX_PASS_COUNT = 8;

class SubModel {
  constructor() {
    this._device = null;
    this._passes = null;
    this._subMesh = null;
    this._patches = null;
    this._handle = _memoryPools.NULL_HANDLE;
    this._priority = _define.RenderPriority.DEFAULT;
    this._inputAssembler = null;
    this._descriptorSet = null;
  }

  set passes(passes) {
    const passLengh = passes.length;

    if (passLengh > MAX_PASS_COUNT) {
      (0, _index2.errorID)(12004, MAX_PASS_COUNT);
      return;
    }

    this._passes = passes;

    this._flushPassInfo(); // DS layout might change too


    if (this._descriptorSet) {
      _memoryPools.DSPool.free(_memoryPools.SubModelPool.get(this._handle, _memoryPools.SubModelView.DESCRIPTOR_SET));

      _dsInfo.layout = passes[0].localSetLayout;

      const dsHandle = _memoryPools.DSPool.alloc(this._device, _dsInfo);

      _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.DESCRIPTOR_SET, dsHandle);

      this._descriptorSet = _memoryPools.DSPool.get(dsHandle);
    }
  }

  get passes() {
    return this._passes;
  }

  set subMesh(subMesh) {
    this._subMesh = subMesh;

    this._inputAssembler.destroy();

    this._inputAssembler.initialize(subMesh.iaInfo);

    if (this._passes[0].batchingScheme === _pass.BatchingSchemes.VB_MERGING) {
      this._subMesh.genFlatBuffers();
    }

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.SUB_MESH, subMesh.handle);
  }

  get subMesh() {
    return this._subMesh;
  }

  set priority(val) {
    this._priority = val;

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.PRIORITY, val);
  }

  get priority() {
    return this._priority;
  }

  get handle() {
    return this._handle;
  }

  get inputAssembler() {
    return this._inputAssembler;
  }

  get descriptorSet() {
    return this._descriptorSet;
  }

  get patches() {
    return this._patches;
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  get planarShaderHandle() {
    return _memoryPools.SubModelPool.get(this._handle, _memoryPools.SubModelView.PLANAR_SHADER);
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  get planarInstanceShaderHandle() {
    return _memoryPools.SubModelPool.get(this._handle, _memoryPools.SubModelView.PLANAR_INSTANCE_SHADER);
  }

  initialize(subMesh, passes, patches = null) {
    this._device = _globalExports.legacyCC.director.root.device;
    this._subMesh = subMesh;
    this._patches = patches;
    this._passes = passes;
    this._handle = _memoryPools.SubModelPool.alloc();

    this._flushPassInfo();

    if (passes[0].batchingScheme === _pass.BatchingSchemes.VB_MERGING) {
      this._subMesh.genFlatBuffers();
    }

    _dsInfo.layout = passes[0].localSetLayout;

    const dsHandle = _memoryPools.DSPool.alloc(this._device, _dsInfo);

    const iaHandle = _memoryPools.IAPool.alloc(this._device, subMesh.iaInfo);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.PRIORITY, _define.RenderPriority.DEFAULT);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.INPUT_ASSEMBLER, iaHandle);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.DESCRIPTOR_SET, dsHandle);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.SUB_MESH, subMesh.handle);

    this._inputAssembler = _memoryPools.IAPool.get(iaHandle);
    this._descriptorSet = _memoryPools.DSPool.get(dsHandle);
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  initPlanarShadowShader() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const shaderHandle = shadowInfo.getPlanarShader(this._patches);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.PLANAR_SHADER, shaderHandle);
  } // This is a temporary solution
  // It should not be written in a fixed way, or modified by the user


  initPlanarShadowInstanceShader() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const shadowInfo = pipeline.pipelineSceneData.shadows;
    const shaderHandle = shadowInfo.getPlanarInstanceShader(this._patches);

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.PLANAR_INSTANCE_SHADER, shaderHandle);
  }

  destroy() {
    _memoryPools.DSPool.free(_memoryPools.SubModelPool.get(this._handle, _memoryPools.SubModelView.DESCRIPTOR_SET));

    _memoryPools.IAPool.free(_memoryPools.SubModelPool.get(this._handle, _memoryPools.SubModelView.INPUT_ASSEMBLER));

    _memoryPools.SubModelPool.free(this._handle);

    this._descriptorSet = null;
    this._inputAssembler = null;
    this._priority = _define.RenderPriority.DEFAULT;
    this._handle = _memoryPools.NULL_HANDLE;
    this._patches = null;
    this._subMesh = null;
    this._passes = null;
  }

  update() {
    for (let i = 0; i < this._passes.length; ++i) {
      const pass = this._passes[i];
      pass.update();
    }

    this._descriptorSet.update();
  }

  onPipelineStateChanged() {
    const passes = this._passes;

    if (!passes) {
      return;
    }

    for (let i = 0; i < passes.length; i++) {
      const pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile(); // force update shaders

      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  }

  onMacroPatchesStateChanged(patches) {
    this._patches = patches;
    const passes = this._passes;

    if (!passes) {
      return;
    }

    for (let i = 0; i < passes.length; i++) {
      const pass = passes[i];
      pass.beginChangeStatesSilently();
      pass.tryCompile(); // force update shaders

      pass.endChangeStatesSilently();
    }

    this._flushPassInfo();
  }

  _flushPassInfo() {
    const passes = this._passes;

    if (!passes) {
      return;
    }

    _memoryPools.SubModelPool.set(this._handle, _memoryPools.SubModelView.PASS_COUNT, passes.length);

    let passOffset = _memoryPools.SubModelView.PASS_0;
    let shaderOffset = _memoryPools.SubModelView.SHADER_0;

    for (let i = 0; i < passes.length; i++, passOffset++, shaderOffset++) {
      _memoryPools.SubModelPool.set(this._handle, passOffset, passes[i].handle);

      _memoryPools.SubModelPool.set(this._handle, shaderOffset, passes[i].getShaderVariant(this._patches));
    }
  }

}

exports.SubModel = SubModel;