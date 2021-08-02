"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StencilManager = exports.Stage = void 0;

var _index = require("../../core/gfx/index.js");

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
// Stage types
let Stage;
exports.Stage = Stage;

(function (Stage) {
  Stage[Stage["DISABLED"] = 0] = "DISABLED";
  Stage[Stage["CLEAR"] = 1] = "CLEAR";
  Stage[Stage["ENTER_LEVEL"] = 2] = "ENTER_LEVEL";
  Stage[Stage["ENABLED"] = 3] = "ENABLED";
  Stage[Stage["EXIT_LEVEL"] = 4] = "EXIT_LEVEL";
  Stage[Stage["CLEAR_INVERTED"] = 5] = "CLEAR_INVERTED";
  Stage[Stage["ENTER_LEVEL_INVERTED"] = 6] = "ENTER_LEVEL_INVERTED";
})(Stage || (exports.Stage = Stage = {}));

class StencilManager {
  constructor() {
    this.stage = Stage.DISABLED;
    this._maskStack = [];
    this._stencilPattern = {
      stencilTest: true,
      func: _index.ComparisonFunc.ALWAYS,
      stencilMask: 0xffff,
      writeMask: 0xffff,
      failOp: _index.StencilOp.KEEP,
      zFailOp: _index.StencilOp.KEEP,
      passOp: _index.StencilOp.KEEP,
      ref: 1
    };
    this.stencilStateMap = new Map();
    this.stencilStateMapWithDepth = new Map();
  }

  get pattern() {
    return this._stencilPattern;
  }

  pushMask(mask) {
    this._maskStack.push(mask);
  }

  clear(comp) {
    comp.stencilStage = comp.inverted ? Stage.CLEAR_INVERTED : Stage.CLEAR; // this.stage = Stage.CLEAR;
  }

  enterLevel(comp) {
    comp.graphics.stencilStage = comp.inverted ? Stage.ENTER_LEVEL_INVERTED : Stage.ENTER_LEVEL; // this.stage = Stage.ENTER_LEVEL;
  }

  enableMask() {
    this.stage = Stage.ENABLED;
  }

  exitMask() {
    if (this._maskStack.length === 0) {
      // cc.errorID(9001);
      return;
    }

    this._maskStack.pop();

    if (this._maskStack.length === 0) {
      this.stage = Stage.DISABLED;
    } else {
      this.stage = Stage.ENABLED;
    }
  }

  getWriteMask() {
    return 1 << this._maskStack.length - 1;
  }

  getExitWriteMask() {
    return 1 << this._maskStack.length;
  }

  getStencilRef() {
    let result = 0;

    for (let i = 0; i < this._maskStack.length; ++i) {
      result += 0x00000001 << i;
    }

    return result;
  }

  reset() {
    // reset stack and stage
    this._maskStack.length = 0;
    this.stage = Stage.DISABLED;
  }

  destroy() {
    this.stencilStateMap.forEach((value, key) => {
      value.destroy();
    });
    this.stencilStateMap.clear();
  }

  getStencilStage(stage, mat) {
    let key = 0;
    let depthTest = false;
    let depthWrite = false;
    let depthFunc = _index.ComparisonFunc.LESS;
    let cacheMap = this.stencilStateMap;

    if (mat && mat.passes[0]) {
      const pass = mat.passes[0];
      const dss = pass.depthStencilState;
      let depthTestValue = 0;
      let depthWriteValue = 0;
      if (dss.depthTest) depthTestValue = 1;
      if (dss.depthWrite) depthWriteValue = 1;
      key = depthTestValue | depthWriteValue << 1 | dss.depthFunc << 2 | stage << 6 | this._maskStack.length << 9;
      depthTest = dss.depthTest;
      depthWrite = dss.depthWrite;
      depthFunc = dss.depthFunc;
      cacheMap = this.stencilStateMapWithDepth;
    } else {
      key = stage << 16 | this._maskStack.length;
    }

    if (cacheMap && cacheMap.has(key)) {
      return cacheMap.get(key);
    }

    this.setStateFromStage(stage);
    const depthStencilState = new _index.DepthStencilState(depthTest, depthWrite, depthFunc, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref, this._stencilPattern.stencilTest, this._stencilPattern.func, this._stencilPattern.stencilMask, this._stencilPattern.writeMask, this._stencilPattern.failOp, this._stencilPattern.zFailOp, this._stencilPattern.passOp, this._stencilPattern.ref);
    cacheMap.set(key, depthStencilState);
    return depthStencilState;
  }

  getStencilHash(stage) {
    return stage << 8 | this._maskStack.length;
  } // Notice: Only children node in Mask need use this.stage


  setStateFromStage(stage) {
    const pattern = this._stencilPattern;

    if (stage === Stage.DISABLED) {
      pattern.stencilTest = false;
      pattern.func = _index.ComparisonFunc.ALWAYS;
      pattern.failOp = _index.StencilOp.KEEP;
      pattern.stencilMask = pattern.writeMask = 0xffff;
      pattern.ref = 1;
    } else {
      pattern.stencilTest = true;

      if (stage === Stage.ENABLED) {
        pattern.func = _index.ComparisonFunc.EQUAL;
        pattern.failOp = _index.StencilOp.KEEP;
        pattern.stencilMask = pattern.ref = this.getStencilRef();
        pattern.writeMask = this.getWriteMask();
      } else if (stage === Stage.CLEAR) {
        pattern.func = _index.ComparisonFunc.NEVER;
        pattern.failOp = _index.StencilOp.ZERO;
        pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
      } else if (stage === Stage.CLEAR_INVERTED) {
        pattern.func = _index.ComparisonFunc.NEVER;
        pattern.failOp = _index.StencilOp.REPLACE;
        pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
      } else if (stage === Stage.ENTER_LEVEL) {
        pattern.func = _index.ComparisonFunc.NEVER;
        pattern.failOp = _index.StencilOp.REPLACE;
        pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
      } else if (stage === Stage.ENTER_LEVEL_INVERTED) {
        pattern.func = _index.ComparisonFunc.NEVER;
        pattern.failOp = _index.StencilOp.ZERO;
        pattern.writeMask = pattern.stencilMask = pattern.ref = this.getWriteMask();
      }
    }
  }

}

exports.StencilManager = StencilManager;
StencilManager.sharedManager = null;
StencilManager.sharedManager = new StencilManager();