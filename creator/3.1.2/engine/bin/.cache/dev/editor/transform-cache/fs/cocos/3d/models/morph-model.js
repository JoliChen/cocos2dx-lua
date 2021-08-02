"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MorphModel = void 0;

var _model = require("../../core/renderer/scene/model.js");

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
class MorphModel extends _model.Model {
  constructor(...args) {
    super(...args);
    this._morphRenderingInstance = null;
    this._usedMaterials = new Set();
  }

  getMacroPatches(subModelIndex) {
    if (this._morphRenderingInstance) {
      return this._morphRenderingInstance.requiredPatches(subModelIndex);
    } else {
      return null;
    }
  }

  initSubModel(subModelIndex, subMeshData, material) {
    return super.initSubModel(subModelIndex, subMeshData, this._launderMaterial(material));
  }

  destroy() {
    super.destroy();
    this._morphRenderingInstance = null;
  }

  setSubModelMaterial(subModelIndex, material) {
    return super.setSubModelMaterial(subModelIndex, this._launderMaterial(material));
  }

  _updateLocalDescriptors(submodelIdx, descriptorSet) {
    super._updateLocalDescriptors(submodelIdx, descriptorSet);

    if (this._morphRenderingInstance) {
      this._morphRenderingInstance.adaptPipelineState(submodelIdx, descriptorSet);
    }
  }

  _launderMaterial(material) {
    return material; // if (this._usedMaterials.has(material)) {
    //     return new MaterialInstance({
    //         parent: material,
    //     });
    // } else {
    //     this._usedMaterials.add(material);
    //     return material;
    // }
  }

  setMorphRendering(morphRendering) {
    this._morphRenderingInstance = morphRendering;
  }

}

exports.MorphModel = MorphModel;