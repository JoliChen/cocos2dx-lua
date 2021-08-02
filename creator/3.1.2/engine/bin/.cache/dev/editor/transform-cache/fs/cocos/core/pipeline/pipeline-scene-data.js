"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipelineSceneData = void 0;

var _fog = require("../renderer/scene/fog.js");

var _ambient = require("../renderer/scene/ambient.js");

var _skybox = require("../renderer/scene/skybox.js");

var _shadows = require("../renderer/scene/shadows.js");

var _memoryPools = require("../renderer/core/memory-pools.js");

var _builtinResMgr = require("../builtin/builtin-res-mgr.js");

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
class PipelineSceneData {
  get handle() {
    return this._handle;
  }
  /**
   * @en Is open HDR.
   * @zh 是否开启 HDR。
   * @readonly
   */


  get isHDR() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.IS_HDR);
  }

  set isHDR(val) {
    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.IS_HDR, val ? 1 : 0);
  }

  get shadingScale() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.SHADING_SCALE);
  }

  set shadingScale(val) {
    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.SHADING_SCALE, val);
  }

  get fpScale() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.FP_SCALE);
  }

  set fpScale(val) {
    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.FP_SCALE, val);
  }

  constructor() {
    this.fog = new _fog.Fog();
    this.ambient = new _ambient.Ambient();
    this.skybox = new _skybox.Skybox();
    this.shadows = new _shadows.Shadows();
    this.renderObjects = [];
    this.shadowObjects = [];
    this.shadowFrameBufferMap = new Map();
    this._handle = _memoryPools.PipelineSceneDataPool.alloc();

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.AMBIENT, this.ambient.handle);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.SKYBOX, this.skybox.handle);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.FOG, this.fog.handle);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.SHADOW, this.shadows.handle);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.IS_HDR, 0);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.SHADING_SCALE, 1.0);

    _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.FP_SCALE, 1.0 / 1024.0);
  }

  get deferredLightPassHandle() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_LIGHT_PASS);
  }

  get deferredLightPassShaderHandle() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER);
  }

  get deferredPostPassHandle() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_POST_PASS);
  }

  get deferredPostPassShaderHandle() {
    return _memoryPools.PipelineSceneDataPool.get(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_POST_PASS_SHADER);
  }

  initDeferredPassInfo() {
    const builinDeferred = _builtinResMgr.builtinResMgr.get('builtin-deferred-material');

    if (builinDeferred) {
      const passLit = builinDeferred.passes[0];
      passLit.beginChangeStatesSilently();
      passLit.tryCompile();
      passLit.endChangeStatesSilently();
    }

    const builtinPostProcess = _builtinResMgr.builtinResMgr.get('builtin-post-process-material');

    if (builtinPostProcess) {
      const passPost = builtinPostProcess.passes[0];
      passPost.beginChangeStatesSilently();
      passPost.tryCompile();
      passPost.endChangeStatesSilently();
    }

    if (builinDeferred) {
      const passLit = builinDeferred.passes[0];

      _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_LIGHT_PASS, passLit.handle);

      _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER, passLit.getShaderVariant());
    }

    if (builtinPostProcess) {
      const passPost = builtinPostProcess.passes[0];

      _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_POST_PASS, passPost.handle);

      _memoryPools.PipelineSceneDataPool.set(this._handle, _memoryPools.PipelineSceneDataView.DEFERRED_POST_PASS_SHADER, passPost.getShaderVariant());
    }
  }

  activate(device, pipeline) {
    this._device = device;
    this._pipeline = pipeline;
    this.initDeferredPassInfo();
    return true;
  }

  destroy() {
    this.ambient.destroy();
    this.skybox.destroy();
    this.fog.destroy();
    this.shadows.destroy();

    if (this._handle) {
      _memoryPools.PipelineSceneDataPool.free(this._handle);
    }
  }

}

exports.PipelineSceneData = PipelineSceneData;