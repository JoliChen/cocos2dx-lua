"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialInstance = void 0;

var _material = require("../../assets/material.js");

var _passInstance = require("./pass-instance.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module material
 */

/**
 * @zh
 * 材质实例，当有材质修改需求时，根据材质资源创建的，可任意定制的实例。
 */
class MaterialInstance extends _material.Material {
  get parent() {
    return this._parent;
  }

  get owner() {
    return this._owner;
  }

  constructor(info) {
    super();
    this._passes = [];
    this._parent = void 0;
    this._owner = void 0;
    this._subModelIdx = 0;
    this._parent = info.parent;
    this._owner = info.owner || null;
    this._subModelIdx = info.subModelIdx || 0;
    this.copy(this._parent);
  }

  recompileShaders(overrides, passIdx) {
    if (!this._passes || !this.effectAsset) {
      return;
    }

    if (passIdx === undefined) {
      for (const pass of this._passes) {
        pass.tryCompile(overrides);
      }
    } else {
      this._passes[passIdx].tryCompile(overrides);
    }
  }

  overridePipelineStates(overrides, passIdx) {
    if (!this._passes || !this.effectAsset) {
      return;
    }

    const passInfos = this.effectAsset.techniques[this.technique].passes;

    if (passIdx === undefined) {
      for (let i = 0; i < this._passes.length; i++) {
        const pass = this._passes[i];
        const state = this._states[i] || (this._states[i] = {});

        for (const key in overrides) {
          state[key] = overrides[key];
        }

        pass.overridePipelineStates(passInfos[pass.passIndex], state);
      }
    } else {
      const state = this._states[passIdx] || (this._states[passIdx] = {});

      for (const key in overrides) {
        state[key] = overrides[key];
      }

      this._passes[passIdx].overridePipelineStates(passInfos[passIdx], state);
    }
  }

  destroy() {
    this._doDestroy();

    return true;
  }

  onPassStateChange(dontNotify) {
    this._hash = _material.Material.getHash(this);

    if (!dontNotify && this._owner) {
      // @ts-expect-error calling protected method here
      this._owner._onRebuildPSO(this._subModelIdx, this);
    }
  }

  _createPasses() {
    const passes = [];
    const parentPasses = this._parent.passes;

    if (!parentPasses) {
      return passes;
    }

    for (let k = 0; k < parentPasses.length; ++k) {
      passes.push(new _passInstance.PassInstance(parentPasses[k], this));
    }

    return passes;
  }

}

exports.MaterialInstance = MaterialInstance;