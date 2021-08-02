"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skybox = void 0;

var _index = require("../../builtin/index.js");

var _material = require("../../assets/material.js");

var _define = require("../../pipeline/define.js");

var _materialInstance = require("../core/material-instance.js");

var _samplerLib = require("../core/sampler-lib.js");

var _globalExports = require("../../global-exports.js");

var _memoryPools = require("../core/memory-pools.js");

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
let skybox_mesh = null;
let skybox_material = null;

class Skybox {
  get model() {
    return this._model;
  }
  /**
   * @en Whether activate skybox in the scene
   * @zh 是否启用天空盒？
   */


  get enabled() {
    return _memoryPools.SkyboxPool.get(this._handle, _memoryPools.SkyboxView.ENABLE);
  }

  set enabled(val) {
    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.ENABLE, val ? 1 : 0);

    if (val) this.activate();else this._updatePipeline();
  }
  /**
   * @en Whether use environment lighting
   * @zh 是否启用环境光照？
   */


  get useIBL() {
    return _memoryPools.SkyboxPool.get(this._handle, _memoryPools.SkyboxView.USE_IBL);
  }

  set useIBL(val) {
    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.USE_IBL, val ? 1 : 0);

    this._updatePipeline();
  }
  /**
   * @en Whether enable RGBE data support in skybox shader
   * @zh 是否需要开启 shader 内的 RGBE 数据支持？
   */


  get isRGBE() {
    return _memoryPools.SkyboxPool.get(this._handle, _memoryPools.SkyboxView.IS_RGBE);
  }

  set isRGBE(val) {
    if (val) {
      if (skybox_material) {
        skybox_material.recompileShaders({
          USE_RGBE_CUBEMAP: val
        });
      }

      if (this._model) {
        this._model.setSubModelMaterial(0, skybox_material);
      }
    }

    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.IS_RGBE, val ? 1 : 0);

    this._updatePipeline();
  }
  /**
   * @en The texture cube used for the skybox
   * @zh 使用的立方体贴图
   */


  get envmap() {
    return this._envmap;
  }

  set envmap(val) {
    this._envmap = val || this._default;

    if (this._envmap) {
      _globalExports.legacyCC.director.root.pipeline.pipelineSceneData.ambient.albedoArray[3] = this._envmap.mipmapLevel;

      this._updateGlobalBinding();
    }
  }

  get handle() {
    return this._handle;
  }

  constructor() {
    this._envmap = null;
    this._globalDSManager = null;
    this._model = null;
    this._default = null;
    this._handle = _memoryPools.NULL_HANDLE;
    this._handle = _memoryPools.SkyboxPool.alloc();
  }

  initialize(skyboxInfo) {
    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.ENABLE, skyboxInfo.enabled ? 1 : 0);

    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.USE_IBL, skyboxInfo.useIBL ? 1 : 0);

    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.IS_RGBE, skyboxInfo.isRGBE ? 1 : 0);

    this._envmap = skyboxInfo.envmap;
  }

  activate() {
    const pipeline = _globalExports.legacyCC.director.root.pipeline;
    const ambient = pipeline.pipelineSceneData.ambient;
    this._globalDSManager = pipeline.globalDSManager;
    this._default = _index.builtinResMgr.get('default-cube-texture');

    if (!this._model) {
      this._model = _globalExports.legacyCC.director.root.createModel(_globalExports.legacyCC.renderer.scene.Model); // @ts-expect-error private member access

      this._model._initLocalDescriptors = () => {};
    }

    _memoryPools.SkyboxPool.set(this._handle, _memoryPools.SkyboxView.MODEL, this._model.handle);

    if (!this._envmap) {
      this._envmap = this._default;
    }

    ambient.albedoArray[3] = this._envmap.mipmapLevel;

    if (!skybox_material) {
      const mat = new _material.Material();
      mat.initialize({
        effectName: 'skybox',
        defines: {
          USE_RGBE_CUBEMAP: this.isRGBE
        }
      });
      skybox_material = new _materialInstance.MaterialInstance({
        parent: mat
      });
    } else {
      skybox_material.recompileShaders({
        USE_RGBE_CUBEMAP: this.isRGBE
      });
    }

    if (this.enabled) {
      if (!skybox_mesh) {
        skybox_mesh = _globalExports.legacyCC.utils.createMesh(_globalExports.legacyCC.primitives.box({
          width: 2,
          height: 2,
          length: 2
        }));
      }

      this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
    }

    this._updateGlobalBinding();

    this._updatePipeline();
  }

  _updatePipeline() {
    const value = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
    const root = _globalExports.legacyCC.director.root;
    const pipeline = root.pipeline;
    const current = pipeline.macros.CC_USE_IBL;

    if (current === value) {
      return;
    }

    pipeline.macros.CC_USE_IBL = value;
    root.onGlobalPipelineStateChanged();
  }

  _updateGlobalBinding() {
    const texture = this.envmap.getGFXTexture();

    const sampler = _samplerLib.samplerLib.getSampler(_globalExports.legacyCC.director._device, this.envmap.getSamplerHash());

    this._globalDSManager.bindSampler(_define.UNIFORM_ENVIRONMENT_BINDING, sampler);

    this._globalDSManager.bindTexture(_define.UNIFORM_ENVIRONMENT_BINDING, texture);

    this._globalDSManager.update();
  }

  destroy() {
    if (this._handle) {
      _memoryPools.SkyboxPool.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }
  }

}

exports.Skybox = Skybox;
_globalExports.legacyCC.Skybox = Skybox;