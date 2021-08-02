"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParticleSystemRendererBase = void 0;

var _particleBatchModel = _interopRequireDefault(require("../models/particle-batch-model.js"));

var _enum = require("../enum.js");

var _globalExports = require("../../core/global-exports.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
class ParticleSystemRendererBase {
  constructor(info) {
    this._particleSystem = null;
    this._model = null;
    this._renderInfo = null;
    this._vertAttrs = [];
    this._renderInfo = info;
  }

  onInit(ps) {
    this._particleSystem = ps;
  }

  onEnable() {
    if (!this._particleSystem) {
      return;
    }

    this.attachToScene();
    const model = this._model;

    if (model) {
      model.node = model.transform = this._particleSystem.node;
      model.enabled = this._particleSystem.enabledInHierarchy;
    }
  }

  onDisable() {
    this.detachFromScene();
  }

  onDestroy() {
    if (this._model) {
      _globalExports.legacyCC.director.root.destroyModel(this._model);

      this._model = null;
    }
  }

  attachToScene() {
    if (this._model) {
      if (this._model.scene) {
        this.detachFromScene();
      }

      this._particleSystem._getRenderScene().addModel(this._model);
    }
  }

  detachFromScene() {
    if (this._model && this._model.scene) {
      this._model.scene.removeModel(this._model);
    }
  }

  setVertexAttributes() {
    if (this._model) {
      this._model.setVertexAttributes(this._renderInfo.renderMode === _enum.RenderMode.Mesh ? this._renderInfo.mesh : null, this._vertAttrs);
    }
  }

  clear() {
    if (this._model) this._model.enabled = false;
  }

  _initModel() {
    if (!this._model) {
      this._model = _globalExports.legacyCC.director.root.createModel(_particleBatchModel.default);

      this._model.setCapacity(this._particleSystem.capacity);

      this._model.visFlags = this._particleSystem.visibility;
    }
  }

  updateTrailMaterial() {}

  getDefaultTrailMaterial() {
    return null;
  }

}

exports.ParticleSystemRendererBase = ParticleSystemRendererBase;