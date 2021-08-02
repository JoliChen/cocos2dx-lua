"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BatchingUtility = void 0;

var _meshRenderer = require("../framework/mesh-renderer.js");

var _mesh = require("../assets/mesh.js");

var _mat = require("../../core/math/mat4.js");

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
 * @module core
 */
function checkMaterialisSame(comp1, comp2) {
  const matNum = comp1.sharedMaterials.length;

  if (matNum !== comp2.sharedMaterials.length) {
    return false;
  }

  for (let i = 0; i < matNum; i++) {
    if (comp1.getRenderMaterial(i) !== comp2.getRenderMaterial(i)) {
      return false;
    }
  }

  return true;
}
/**
 * @en Utility for 3d model static batching
 * @zh 服务于 3D 模型静态合批的工具类
 */


class BatchingUtility {
  /**
   * Collect the Models under `staticModelRoot`,
   * merge all the meshes statically into one (while disabling each component),
   * and attach it to a new Model on `batchedRoot`.
   * The world transform of each model is guaranteed to be preserved.
   *
   * For a more fine-grained control over the process, use `Mesh.merge` directly.
   * @param staticModelRoot root of all the static models to be batched
   * @param batchedRoot the target output node
   */
  static batchStaticModel(staticModelRoot, batchedRoot) {
    const models = staticModelRoot.getComponentsInChildren(_meshRenderer.MeshRenderer);

    if (models.length < 2) {
      console.error('the number of static models to batch is less than 2,it needn\'t batch.');
      return false;
    }

    for (let i = 1; i < models.length; i++) {
      if (!models[0].mesh.validateMergingMesh(models[i].mesh)) {
        console.error(`the meshes of ${models[0].node.name} and ${models[i].node.name} can't be merged`);
        return false;
      }

      if (!checkMaterialisSame(models[0], models[i])) {
        console.error(`the materials of ${models[0].node.name} and ${models[i].node.name} can't be merged`);
        return false;
      }
    }

    const batchedMesh = new _mesh.Mesh();
    const worldMat = new _mat.Mat4();
    const rootWorldMatInv = new _mat.Mat4();
    staticModelRoot.getWorldMatrix(rootWorldMatInv);

    _mat.Mat4.invert(rootWorldMatInv, rootWorldMatInv);

    for (let i = 0; i < models.length; i++) {
      const comp = models[i];
      comp.node.getWorldMatrix(worldMat);

      _mat.Mat4.multiply(worldMat, rootWorldMatInv, worldMat);

      batchedMesh.merge(models[i].mesh, worldMat);
      comp.enabled = false;
    }

    const batchedModel = batchedRoot.addComponent(_meshRenderer.MeshRenderer);
    batchedModel.mesh = batchedMesh;
    batchedModel.sharedMaterials = models[0].sharedMaterials;
    return true;
  }
  /**
   * Undoes everything `batchStaticModel` did.
   *
   * @param staticModelRoot root of all the static models to be batched
   * @param batchedRoot the target output node
   */


  static unbatchStaticModel(staticModelRoot, batchedRoot) {
    const models = staticModelRoot.getComponentsInChildren(_meshRenderer.MeshRenderer);

    for (let i = 0; i < models.length; i++) {
      const comp = models[i];
      comp.enabled = true;
    }

    const batchedModel = batchedRoot.getComponent(_meshRenderer.MeshRenderer);

    if (batchedModel) {
      if (batchedModel.mesh) {
        batchedModel.mesh.destroyRenderingMesh();
      }

      batchedModel.destroy();
    }

    return true;
  }

}

exports.BatchingUtility = BatchingUtility;