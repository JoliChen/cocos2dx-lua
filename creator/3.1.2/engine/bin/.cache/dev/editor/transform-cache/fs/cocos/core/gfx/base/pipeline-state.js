"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineState = exports.PipelineStateInfo = exports.BlendState = exports.BlendTarget = exports.DepthStencilState = exports.RasterizerState = void 0;

var _define = require("./define.js");

var _memoryPools = require("../../renderer/core/memory-pools.js");

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
 * @en GFX rasterizer state.
 * @zh GFX 光栅化状态。
 */
class RasterizerState {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(isDiscard = false, polygonMode = _define.PolygonMode.FILL, shadeModel = _define.ShadeModel.GOURAND, cullMode = _define.CullMode.BACK, isFrontFaceCCW = true, depthBiasEnabled = false, depthBias = 0, depthBiasClamp = 0.0, depthBiasSlop = 0.0, isDepthClip = true, isMultisample = false, lineWidth = 1.0) {
    this.isDiscard = isDiscard;
    this.polygonMode = polygonMode;
    this.shadeModel = shadeModel;
    this.cullMode = cullMode;
    this.isFrontFaceCCW = isFrontFaceCCW;
    this.depthBiasEnabled = depthBiasEnabled;
    this.depthBias = depthBias;
    this.depthBiasClamp = depthBiasClamp;
    this.depthBiasSlop = depthBiasSlop;
    this.isDepthClip = isDepthClip;
    this.isMultisample = isMultisample;
    this.lineWidth = lineWidth;
  }

  reset() {
    this.isDiscard = false;
    this.polygonMode = _define.PolygonMode.FILL;
    this.shadeModel = _define.ShadeModel.GOURAND;
    this.cullMode = _define.CullMode.BACK;
    this.isFrontFaceCCW = true;
    this.depthBiasEnabled = false;
    this.depthBias = 0;
    this.depthBiasClamp = 0.0;
    this.depthBiasSlop = 0.0;
    this.isDepthClip = true;
    this.isMultisample = false;
    this.lineWidth = 1.0;
  }

  assign(rs) {
    Object.assign(this, rs);
  }

  get handle() {
    return _memoryPools.NULL_HANDLE;
  }

  destroy() {}

}
/**
 * @en GFX depth stencil state.
 * @zh GFX 深度模板状态。
 */


exports.RasterizerState = RasterizerState;

class DepthStencilState {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(depthTest = true, depthWrite = true, depthFunc = _define.ComparisonFunc.LESS, stencilTestFront = false, stencilFuncFront = _define.ComparisonFunc.ALWAYS, stencilReadMaskFront = 0xffff, stencilWriteMaskFront = 0xffff, stencilFailOpFront = _define.StencilOp.KEEP, stencilZFailOpFront = _define.StencilOp.KEEP, stencilPassOpFront = _define.StencilOp.KEEP, stencilRefFront = 1, stencilTestBack = false, stencilFuncBack = _define.ComparisonFunc.ALWAYS, stencilReadMaskBack = 0xffff, stencilWriteMaskBack = 0xffff, stencilFailOpBack = _define.StencilOp.KEEP, stencilZFailOpBack = _define.StencilOp.KEEP, stencilPassOpBack = _define.StencilOp.KEEP, stencilRefBack = 1) {
    this.depthTest = depthTest;
    this.depthWrite = depthWrite;
    this.depthFunc = depthFunc;
    this.stencilTestFront = stencilTestFront;
    this.stencilFuncFront = stencilFuncFront;
    this.stencilReadMaskFront = stencilReadMaskFront;
    this.stencilWriteMaskFront = stencilWriteMaskFront;
    this.stencilFailOpFront = stencilFailOpFront;
    this.stencilZFailOpFront = stencilZFailOpFront;
    this.stencilPassOpFront = stencilPassOpFront;
    this.stencilRefFront = stencilRefFront;
    this.stencilTestBack = stencilTestBack;
    this.stencilFuncBack = stencilFuncBack;
    this.stencilReadMaskBack = stencilReadMaskBack;
    this.stencilWriteMaskBack = stencilWriteMaskBack;
    this.stencilFailOpBack = stencilFailOpBack;
    this.stencilZFailOpBack = stencilZFailOpBack;
    this.stencilPassOpBack = stencilPassOpBack;
    this.stencilRefBack = stencilRefBack;
  }

  reset() {
    this.depthTest = true;
    this.depthWrite = true;
    this.depthFunc = _define.ComparisonFunc.LESS;
    this.stencilTestFront = false;
    this.stencilFuncFront = _define.ComparisonFunc.ALWAYS;
    this.stencilReadMaskFront = 0xffff;
    this.stencilWriteMaskFront = 0xffff;
    this.stencilFailOpFront = _define.StencilOp.KEEP;
    this.stencilZFailOpFront = _define.StencilOp.KEEP;
    this.stencilPassOpFront = _define.StencilOp.KEEP;
    this.stencilRefFront = 1;
    this.stencilTestBack = false;
    this.stencilFuncBack = _define.ComparisonFunc.ALWAYS;
    this.stencilReadMaskBack = 0xffff;
    this.stencilWriteMaskBack = 0xffff;
    this.stencilFailOpBack = _define.StencilOp.KEEP;
    this.stencilZFailOpBack = _define.StencilOp.KEEP;
    this.stencilPassOpBack = _define.StencilOp.KEEP;
    this.stencilRefBack = 1;
  }

  assign(dss) {
    Object.assign(this, dss);
  }

  get handle() {
    return _memoryPools.NULL_HANDLE;
  }

  destroy() {}

}
/**
 * @en GFX blend target.
 * @zh GFX 混合目标。
 */


exports.DepthStencilState = DepthStencilState;

class BlendTarget {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(blend = false, blendSrc = _define.BlendFactor.ONE, blendDst = _define.BlendFactor.ZERO, blendEq = _define.BlendOp.ADD, blendSrcAlpha = _define.BlendFactor.ONE, blendDstAlpha = _define.BlendFactor.ZERO, blendAlphaEq = _define.BlendOp.ADD, blendColorMask = _define.ColorMask.ALL) {
    this.blend = blend;
    this.blendSrc = blendSrc;
    this.blendDst = blendDst;
    this.blendEq = blendEq;
    this.blendSrcAlpha = blendSrcAlpha;
    this.blendDstAlpha = blendDstAlpha;
    this.blendAlphaEq = blendAlphaEq;
    this.blendColorMask = blendColorMask;
  }

  reset() {
    this.blend = false;
    this.blendSrc = _define.BlendFactor.ONE;
    this.blendDst = _define.BlendFactor.ZERO;
    this.blendEq = _define.BlendOp.ADD;
    this.blendSrcAlpha = _define.BlendFactor.ONE;
    this.blendDstAlpha = _define.BlendFactor.ZERO;
    this.blendAlphaEq = _define.BlendOp.ADD;
    this.blendColorMask = _define.ColorMask.ALL;
  }

  assign(target) {
    Object.assign(this, target);
  }

  get handle() {
    return _memoryPools.NULL_HANDLE;
  }

  destroy() {}

}
/**
 * @en GFX blend state.
 * @zh GFX 混合状态。
 */


exports.BlendTarget = BlendTarget;

class BlendState {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(isA2C = false, isIndepend = false, blendColor = new _define.Color(), targets = [new BlendTarget()]) {
    this.isA2C = isA2C;
    this.isIndepend = isIndepend;
    this.blendColor = blendColor;
    this.targets = targets;
  }
  /**
   * @en Should use this function to set target, or it will not work
   * on native platforms, as native can not support this feature,
   * such as `blendState[i] = target;`.
   *
   * @param index The index to set target.
   * @param target The target to be set.
   */


  setTarget(index, target) {
    let tg = this.targets[index];

    if (!tg) {
      tg = this.targets[index] = new BlendTarget();
    }

    Object.assign(tg, target);
  }

  reset() {
    this.isA2C = false;
    this.isIndepend = false;
    this.blendColor.x = 0;
    this.blendColor.y = 0;
    this.blendColor.z = 0;
    this.blendColor.w = 0;
    this.targets.length = 1;
    this.targets[0].reset();
  }

  get handle() {
    return _memoryPools.NULL_HANDLE;
  }

  destroy() {}

}

exports.BlendState = BlendState;

class PipelineStateInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(shader = null, pipelineLayout = null, renderPass = null, inputState = new _define.InputState(), rasterizerState = new RasterizerState(), depthStencilState = new DepthStencilState(), blendState = new BlendState(), primitive = _define.PrimitiveMode.TRIANGLE_LIST, dynamicStates = _define.DynamicStateFlagBit.NONE, bindPoint = _define.PipelineBindPoint.GRAPHICS) {
    this.shader = shader;
    this.pipelineLayout = pipelineLayout;
    this.renderPass = renderPass;
    this.inputState = inputState;
    this.rasterizerState = rasterizerState;
    this.depthStencilState = depthStencilState;
    this.blendState = blendState;
    this.primitive = primitive;
    this.dynamicStates = dynamicStates;
    this.bindPoint = bindPoint;
  }

}
/**
 * @en GFX pipeline state.
 * @zh GFX 管线状态。
 */


exports.PipelineStateInfo = PipelineStateInfo;

class PipelineState extends _define.Obj {
  /**
   * @en Get current shader.
   * @zh GFX 着色器。
   */
  get shader() {
    return this._shader;
  }
  /**
   * @en Get current pipeline layout.
   * @zh GFX 管线布局。
   */


  get pipelineLayout() {
    return this._pipelineLayout;
  }
  /**
   * @en Get current primitve mode.
   * @zh GFX 图元模式。
   */


  get primitive() {
    return this._primitive;
  }
  /**
   * @en Get current rasterizer state.
   * @zh GFX 光栅化状态。
   */


  get rasterizerState() {
    return this._rs;
  }
  /**
   * @en Get current depth stencil state.
   * @zh GFX 深度模板状态。
   */


  get depthStencilState() {
    return this._dss;
  }
  /**
   * @en Get current blend state.
   * @zh GFX 混合状态。
   */


  get blendState() {
    return this._bs;
  }
  /**
   * @en Get current input state.
   * @zh GFX 输入状态。
   */


  get inputState() {
    return this._is;
  }
  /**
   * @en Get current dynamic states.
   * @zh GFX 动态状态数组。
   */


  get dynamicStates() {
    return this._dynamicStates;
  }
  /**
   * @en Get current render pass.
   * @zh GFX 渲染过程。
   */


  get renderPass() {
    return this._renderPass;
  }

  constructor(device) {
    super(_define.ObjectType.PIPELINE_STATE);
    this._device = void 0;
    this._shader = null;
    this._pipelineLayout = null;
    this._primitive = _define.PrimitiveMode.TRIANGLE_LIST;
    this._is = null;
    this._rs = new RasterizerState();
    this._dss = new DepthStencilState();
    this._bs = new BlendState();
    this._dynamicStates = _define.DynamicStateFlagBit.NONE;
    this._renderPass = null;
    this._device = device;
  }

}

exports.PipelineState = PipelineState;