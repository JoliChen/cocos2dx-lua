"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderScene = void 0;

var _nodeEnum = require("../../scene-graph/node-enum.js");

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
class RenderScene {
  get root() {
    return this._root;
  }

  get name() {
    return this._name;
  }

  get cameras() {
    return this._cameras;
  }

  get mainLight() {
    return this._mainLight;
  }

  get sphereLights() {
    return this._sphereLights;
  }

  get spotLights() {
    return this._spotLights;
  }

  get models() {
    return this._models;
  }

  get handle() {
    return this._scenePoolHandle;
  }

  get batches() {
    return this._batches;
  }

  static registerCreateFunc(root) {
    root._createSceneFun = _root => new RenderScene(_root);
  }

  constructor(root) {
    this._root = void 0;
    this._name = '';
    this._cameras = [];
    this._models = [];
    this._batches = [];
    this._directionalLights = [];
    this._sphereLights = [];
    this._spotLights = [];
    this._mainLight = null;
    this._modelId = 0;
    this._scenePoolHandle = _memoryPools.NULL_HANDLE;
    this._modelArrayHandle = _memoryPools.NULL_HANDLE;
    this._batchArrayHandle = _memoryPools.NULL_HANDLE;
    this._sphereLightsHandle = _memoryPools.NULL_HANDLE;
    this._spotLightsHandle = _memoryPools.NULL_HANDLE;
    this._root = root;

    this._createHandles();
  }

  initialize(info) {
    this._name = info.name;

    this._createHandles();

    return true;
  }

  update(stamp) {
    const mainLight = this._mainLight;

    if (mainLight) {
      mainLight.update();
    }

    const sphereLights = this._sphereLights;

    for (let i = 0; i < sphereLights.length; i++) {
      const light = sphereLights[i];
      light.update();
    }

    const spotLights = this._spotLights;

    for (let i = 0; i < spotLights.length; i++) {
      const light = spotLights[i];
      light.update();
    }

    const models = this._models;

    for (let i = 0; i < models.length; i++) {
      const model = models[i];

      if (model.enabled) {
        model.updateTransform(stamp);
        model.updateUBOs(stamp);
      }
    }
  }

  destroy() {
    this.removeCameras();
    this.removeSphereLights();
    this.removeSpotLights();
    this.removeModels();

    if (this._modelArrayHandle) {
      _memoryPools.ModelArrayPool.free(this._modelArrayHandle);

      this._modelArrayHandle = _memoryPools.NULL_HANDLE;
    }

    if (this._scenePoolHandle) {
      _memoryPools.ScenePool.free(this._scenePoolHandle);

      this._scenePoolHandle = _memoryPools.NULL_HANDLE;
    }

    if (this._sphereLightsHandle) {
      _memoryPools.LightArrayPool.free(this._sphereLightsHandle);

      this._sphereLightsHandle = _memoryPools.NULL_HANDLE;
    }

    if (this._spotLightsHandle) {
      _memoryPools.LightArrayPool.free(this._spotLightsHandle);

      this._spotLightsHandle = _memoryPools.NULL_HANDLE;
    }

    if (this._batchArrayHandle) {
      _memoryPools.UIBatchArrayPool.free(this._batchArrayHandle);

      this._batchArrayHandle = _memoryPools.NULL_HANDLE;
    }
  }

  addCamera(cam) {
    cam.attachToScene(this);

    this._cameras.push(cam);
  }

  removeCamera(camera) {
    for (let i = 0; i < this._cameras.length; ++i) {
      if (this._cameras[i] === camera) {
        this._cameras.splice(i, 1);

        camera.detachFromScene();
        return;
      }
    }
  }

  removeCameras() {
    for (const camera of this._cameras) {
      camera.detachFromScene();
    }

    this._cameras.splice(0);
  }

  setMainLight(dl) {
    this._mainLight = dl;

    _memoryPools.ScenePool.set(this._scenePoolHandle, _memoryPools.SceneView.MAIN_LIGHT, dl.handle);
  }

  unsetMainLight(dl) {
    if (this._mainLight === dl) {
      const dlList = this._directionalLights;

      if (dlList.length) {
        this._mainLight = dlList[dlList.length - 1];

        if (this._mainLight.node) {
          // trigger update
          this._mainLight.node.hasChangedFlags |= _nodeEnum.TransformBit.ROTATION;
        }
      } else {
        this._mainLight = null;
      }
    }
  }

  addDirectionalLight(dl) {
    dl.attachToScene(this);

    this._directionalLights.push(dl);
  }

  removeDirectionalLight(dl) {
    for (let i = 0; i < this._directionalLights.length; ++i) {
      if (this._directionalLights[i] === dl) {
        dl.detachFromScene();

        this._directionalLights.splice(i, 1);

        return;
      }
    }
  }

  addSphereLight(pl) {
    pl.attachToScene(this);

    this._sphereLights.push(pl);

    _memoryPools.LightArrayPool.push(this._sphereLightsHandle, pl.handle);
  }

  removeSphereLight(pl) {
    for (let i = 0; i < this._sphereLights.length; ++i) {
      if (this._sphereLights[i] === pl) {
        pl.detachFromScene();

        this._sphereLights.splice(i, 1);

        _memoryPools.LightArrayPool.erase(this._sphereLightsHandle, i);

        return;
      }
    }
  }

  addSpotLight(sl) {
    sl.attachToScene(this);

    this._spotLights.push(sl);

    _memoryPools.LightArrayPool.push(this._spotLightsHandle, sl.handle);
  }

  removeSpotLight(sl) {
    for (let i = 0; i < this._spotLights.length; ++i) {
      if (this._spotLights[i] === sl) {
        sl.detachFromScene();

        this._spotLights.splice(i, 1);

        _memoryPools.LightArrayPool.erase(this._spotLightsHandle, i);

        return;
      }
    }
  }

  removeSphereLights() {
    for (let i = 0; i < this._sphereLights.length; ++i) {
      this._sphereLights[i].detachFromScene();
    }

    this._sphereLights.length = 0;

    _memoryPools.LightArrayPool.clear(this._sphereLightsHandle);
  }

  removeSpotLights() {
    for (let i = 0; i < this._spotLights.length; ++i) {
      this._spotLights[i].detachFromScene();
    }

    this._spotLights = [];

    _memoryPools.LightArrayPool.clear(this._spotLightsHandle);
  }

  addModel(m) {
    m.attachToScene(this);

    this._models.push(m);

    _memoryPools.ModelArrayPool.push(this._modelArrayHandle, m.handle);
  }

  removeModel(model) {
    for (let i = 0; i < this._models.length; ++i) {
      if (this._models[i] === model) {
        model.detachFromScene();

        this._models.splice(i, 1);

        _memoryPools.ModelArrayPool.erase(this._modelArrayHandle, i);

        return;
      }
    }
  }

  removeModels() {
    for (const m of this._models) {
      m.detachFromScene();
      m.destroy();
    }

    this._models.length = 0;

    _memoryPools.ModelArrayPool.clear(this._modelArrayHandle);
  }

  addBatch(batch) {
    this._batches.push(batch);

    _memoryPools.UIBatchArrayPool.push(this._batchArrayHandle, batch.handle);
  }

  removeBatch(batch) {
    for (let i = 0; i < this._batches.length; ++i) {
      if (this._batches[i] === batch) {
        this._batches.splice(i, 1);

        _memoryPools.UIBatchArrayPool.erase(this._batchArrayHandle, i);

        return;
      }
    }
  }

  removeBatches() {
    this._batches.length = 0;

    _memoryPools.UIBatchArrayPool.clear(this._batchArrayHandle);
  }

  onGlobalPipelineStateChanged() {
    for (const m of this._models) {
      m.onGlobalPipelineStateChanged();
    }
  }

  generateModelId() {
    return this._modelId++;
  }

  _createHandles() {
    if (!this._modelArrayHandle) {
      this._modelArrayHandle = _memoryPools.ModelArrayPool.alloc();
      this._scenePoolHandle = _memoryPools.ScenePool.alloc();

      _memoryPools.ScenePool.set(this._scenePoolHandle, _memoryPools.SceneView.MODEL_ARRAY, this._modelArrayHandle);

      this._spotLightsHandle = _memoryPools.LightArrayPool.alloc();

      _memoryPools.ScenePool.set(this._scenePoolHandle, _memoryPools.SceneView.SPOT_LIGHT_ARRAY, this._spotLightsHandle);

      this._sphereLightsHandle = _memoryPools.LightArrayPool.alloc();

      _memoryPools.ScenePool.set(this._scenePoolHandle, _memoryPools.SceneView.SPHERE_LIGHT_ARRAY, this._sphereLightsHandle);
    }

    if (!this._batchArrayHandle) {
      this._batchArrayHandle = _memoryPools.UIBatchArrayPool.alloc();

      _memoryPools.ScenePool.set(this._scenePoolHandle, _memoryPools.SceneView.BATCH_ARRAY_2D, this._batchArrayHandle);
    }
  }

}

exports.RenderScene = RenderScene;