"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StdMorphRendering = void 0;

var _index = require("../../core/gfx/index.js");

var _texture2d = require("../../core/assets/texture-2d.js");

var _imageAsset = require("../../core/assets/image-asset.js");

var _samplerLib = require("../../core/renderer/core/sampler-lib.js");

var _define = require("../../core/pipeline/define.js");

var _debug = require("../../core/platform/debug.js");

var _asserts = require("../../core/data/utils/asserts.js");

var _bits = require("../../core/math/bits.js");

var _globalExports = require("../../core/global-exports.js");

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

/**
 * True if force to use cpu computing based sub-mesh rendering.
 */
const preferCpuComputing = false;
/**
 * Standard morph rendering.
 * The standard morph rendering renders each of sub-mesh morph separately.
 * Sub-mesh morph rendering may select different technique according sub-mesh morph itself.
 */

class StdMorphRendering {
  constructor(mesh, gfxDevice) {
    this._mesh = void 0;
    this._subMeshRenderings = [];
    this._mesh = mesh;

    if (!this._mesh.struct.morph) {
      return;
    }

    const nSubMeshes = this._mesh.struct.primitives.length;
    this._subMeshRenderings = new Array(nSubMeshes).fill(null);

    for (let iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
      const subMeshMorph = this._mesh.struct.morph.subMeshMorphs[iSubMesh];

      if (!subMeshMorph) {
        continue;
      }

      if (preferCpuComputing || subMeshMorph.targets.length > _define.UBOMorph.MAX_MORPH_TARGET_COUNT) {
        this._subMeshRenderings[iSubMesh] = new CpuComputing(this._mesh, iSubMesh, this._mesh.struct.morph, gfxDevice);
      } else {
        this._subMeshRenderings[iSubMesh] = new GpuComputing(this._mesh, iSubMesh, this._mesh.struct.morph, gfxDevice);
      }
    }
  }

  createInstance() {
    const nSubMeshes = this._mesh.struct.primitives.length;
    const subMeshInstances = new Array(nSubMeshes);

    for (let iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
      var _this$_subMeshRenderi, _this$_subMeshRenderi2;

      subMeshInstances[iSubMesh] = (_this$_subMeshRenderi = (_this$_subMeshRenderi2 = this._subMeshRenderings[iSubMesh]) === null || _this$_subMeshRenderi2 === void 0 ? void 0 : _this$_subMeshRenderi2.createInstance()) !== null && _this$_subMeshRenderi !== void 0 ? _this$_subMeshRenderi : null;
    }

    return {
      setWeights(subMeshIndex, weights) {
        var _subMeshInstances$sub;

        (_subMeshInstances$sub = subMeshInstances[subMeshIndex]) === null || _subMeshInstances$sub === void 0 ? void 0 : _subMeshInstances$sub.setWeights(weights);
      },

      requiredPatches: subMeshIndex => {
        (0, _asserts.assertIsNonNullable)(this._mesh.struct.morph);
        const subMeshMorph = this._mesh.struct.morph.subMeshMorphs[subMeshIndex];
        const subMeshRenderingInstance = subMeshInstances[subMeshIndex];

        if (subMeshRenderingInstance === null) {
          return null;
        }

        (0, _asserts.assertIsNonNullable)(subMeshMorph);
        const patches = [{
          name: 'CC_USE_MORPH',
          value: true
        }, {
          name: 'CC_MORPH_TARGET_COUNT',
          value: subMeshMorph.targets.length
        }];

        if (subMeshMorph.attributes.includes(_index.AttributeName.ATTR_POSITION)) {
          patches.push({
            name: 'CC_MORPH_TARGET_HAS_POSITION',
            value: true
          });
        }

        if (subMeshMorph.attributes.includes(_index.AttributeName.ATTR_NORMAL)) {
          patches.push({
            name: 'CC_MORPH_TARGET_HAS_NORMAL',
            value: true
          });
        }

        if (subMeshMorph.attributes.includes(_index.AttributeName.ATTR_TANGENT)) {
          patches.push({
            name: 'CC_MORPH_TARGET_HAS_TANGENT',
            value: true
          });
        }

        patches.push(...subMeshRenderingInstance.requiredPatches());
        return patches;
      },
      adaptPipelineState: (subMeshIndex, descriptorSet) => {
        var _subMeshInstances$sub2;

        (_subMeshInstances$sub2 = subMeshInstances[subMeshIndex]) === null || _subMeshInstances$sub2 === void 0 ? void 0 : _subMeshInstances$sub2.adaptPipelineState(descriptorSet);
      },
      destroy: () => {
        for (const subMeshInstance of subMeshInstances) {
          subMeshInstance === null || subMeshInstance === void 0 ? void 0 : subMeshInstance.destroy();
        }
      }
    };
  }

}
/**
 * Describes how to render a sub-mesh morph.
 */


exports.StdMorphRendering = StdMorphRendering;

/**
 * (General purpose) Gpu computing based sub-mesh morph rendering.
 * This technique computes final attribute displacements on GPU.
 * Target displacements of each attribute are transferred through vertex texture, say, morph texture.
 */
class GpuComputing {
  constructor(mesh, subMeshIndex, morph, gfxDevice) {
    this._gfxDevice = void 0;
    this._subMeshMorph = void 0;
    this._textureInfo = void 0;
    this._attributes = void 0;
    this._verticesCount = void 0;
    this._gfxDevice = gfxDevice;
    const subMeshMorph = morph.subMeshMorphs[subMeshIndex];
    (0, _asserts.assertIsNonNullable)(subMeshMorph);
    this._subMeshMorph = subMeshMorph;
    enableVertexId(mesh, subMeshIndex, gfxDevice);
    const nVertices = mesh.struct.vertexBundles[mesh.struct.primitives[subMeshIndex].vertexBundelIndices[0]].view.count;
    this._verticesCount = nVertices;
    const nTargets = subMeshMorph.targets.length;
    const vec4Required = nVertices * nTargets;
    const vec4TextureFactory = createVec4TextureFactory(gfxDevice, vec4Required);
    this._textureInfo = {
      width: vec4TextureFactory.width,
      height: vec4TextureFactory.height
    }; // Creates texture for each attribute.

    this._attributes = subMeshMorph.attributes.map((attributeName, attributeIndex) => {
      const vec4Tex = vec4TextureFactory.create();
      const valueView = vec4Tex.valueView; // if (DEV) { // Make it easy to view texture in profilers...
      //     for (let i = 0; i < valueView.length / 4; ++i) {
      //         valueView[i * 4 + 3] = 1.0;
      //     }
      // }

      subMeshMorph.targets.forEach((morphTarget, morphTargetIndex) => {
        const displacementsView = morphTarget.displacements[attributeIndex];
        const displacements = new Float32Array(mesh.data.buffer, mesh.data.byteOffset + displacementsView.offset, displacementsView.count);
        const displacementsOffset = nVertices * morphTargetIndex * 4;

        for (let iVertex = 0; iVertex < nVertices; ++iVertex) {
          valueView[displacementsOffset + 4 * iVertex + 0] = displacements[3 * iVertex + 0];
          valueView[displacementsOffset + 4 * iVertex + 1] = displacements[3 * iVertex + 1];
          valueView[displacementsOffset + 4 * iVertex + 2] = displacements[3 * iVertex + 2];
        }
      });
      vec4Tex.updatePixels();
      return {
        name: attributeName,
        morphTexture: vec4Tex
      };
    });
  }

  destroy() {
    for (const attribute of this._attributes) {
      attribute.morphTexture.destroy();
    }
  }

  createInstance() {
    const morphUniforms = new MorphUniforms(this._gfxDevice, this._subMeshMorph.targets.length);
    morphUniforms.setMorphTextureInfo(this._textureInfo.width, this._textureInfo.height);
    morphUniforms.setVerticesCount(this._verticesCount);
    morphUniforms.commit();
    return {
      setWeights: weights => {
        morphUniforms.setWeights(weights);
        morphUniforms.commit();
      },
      requiredPatches: () => [{
        name: 'CC_MORPH_TARGET_USE_TEXTURE',
        value: true
      }],
      adaptPipelineState: descriptorSet => {
        for (const attribute of this._attributes) {
          let binding;

          switch (attribute.name) {
            case _index.AttributeName.ATTR_POSITION:
              binding = _define.UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
              break;

            case _index.AttributeName.ATTR_NORMAL:
              binding = _define.UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
              break;

            case _index.AttributeName.ATTR_TANGENT:
              binding = _define.UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
              break;

            default:
              (0, _debug.warn)('Unexpected attribute!');
              break;
          }

          if (binding !== undefined) {
            descriptorSet.bindSampler(binding, attribute.morphTexture.sampler);
            descriptorSet.bindTexture(binding, attribute.morphTexture.texture);
          }
        }

        descriptorSet.bindBuffer(_define.UBOMorph.BINDING, morphUniforms.buffer);
        descriptorSet.update();
      },
      destroy: () => {}
    };
  }

}
/**
 * Cpu computing based sub-mesh morph rendering.
 * This technique computes final attribute displacements on CPU.
 * The displacements, then, are passed to GPU.
 */


class CpuComputing {
  constructor(mesh, subMeshIndex, morph, gfxDevice) {
    this._gfxDevice = void 0;
    this._attributes = [];
    this._gfxDevice = gfxDevice;
    const subMeshMorph = morph.subMeshMorphs[subMeshIndex];
    (0, _asserts.assertIsNonNullable)(subMeshMorph);
    enableVertexId(mesh, subMeshIndex, gfxDevice);
    this._attributes = subMeshMorph.attributes.map((attributeName, attributeIndex) => ({
      name: attributeName,
      targets: subMeshMorph.targets.map(attributeDisplacement => ({
        displacements: new Float32Array(mesh.data.buffer, mesh.data.byteOffset + attributeDisplacement.displacements[attributeIndex].offset, attributeDisplacement.displacements[attributeIndex].count)
      }))
    }));
  }
  /**
   * DO NOT use this field.
   */


  get data() {
    return this._attributes;
  }

  createInstance() {
    return new CpuComputingRenderingInstance(this, this._attributes[0].targets[0].displacements.length / 3, this._gfxDevice);
  }

}

class CpuComputingRenderingInstance {
  constructor(owner, nVertices, gfxDevice) {
    this._attributes = void 0;
    this._owner = void 0;
    this._morphUniforms = void 0;
    this._owner = owner;
    this._morphUniforms = new MorphUniforms(gfxDevice, 0
    /* TODO? */
    );
    const vec4TextureFactory = createVec4TextureFactory(gfxDevice, nVertices);

    this._morphUniforms.setMorphTextureInfo(vec4TextureFactory.width, vec4TextureFactory.height);

    this._morphUniforms.commit();

    this._attributes = this._owner.data.map((attributeMorph, attributeIndex) => {
      const morphTexture = vec4TextureFactory.create();
      return {
        attributeName: attributeMorph.name,
        morphTexture
      };
    });
  }

  setWeights(weights) {
    for (let iAttribute = 0; iAttribute < this._attributes.length; ++iAttribute) {
      const myAttribute = this._attributes[iAttribute];
      const valueView = myAttribute.morphTexture.valueView;
      const attributeMorph = this._owner.data[iAttribute];
      (0, _asserts.assertIsTrue)(weights.length === attributeMorph.targets.length);

      for (let iTarget = 0; iTarget < attributeMorph.targets.length; ++iTarget) {
        const targetDisplacements = attributeMorph.targets[iTarget].displacements;
        const weight = weights[iTarget];
        const nVertices = targetDisplacements.length / 3;

        if (iTarget === 0) {
          for (let iVertex = 0; iVertex < nVertices; ++iVertex) {
            valueView[4 * iVertex + 0] = targetDisplacements[3 * iVertex + 0] * weight;
            valueView[4 * iVertex + 1] = targetDisplacements[3 * iVertex + 1] * weight;
            valueView[4 * iVertex + 2] = targetDisplacements[3 * iVertex + 2] * weight;
          }
        } else if (weight !== 0.0) {
          for (let iVertex = 0; iVertex < nVertices; ++iVertex) {
            valueView[4 * iVertex + 0] += targetDisplacements[3 * iVertex + 0] * weight;
            valueView[4 * iVertex + 1] += targetDisplacements[3 * iVertex + 1] * weight;
            valueView[4 * iVertex + 2] += targetDisplacements[3 * iVertex + 2] * weight;
          }
        }
      }

      myAttribute.morphTexture.updatePixels();
    }
  }

  requiredPatches() {
    return [{
      name: 'CC_MORPH_TARGET_USE_TEXTURE',
      value: true
    }, {
      name: 'CC_MORPH_PRECOMPUTED',
      value: true
    }];
  }

  adaptPipelineState(descriptorSet) {
    for (const attribute of this._attributes) {
      const attributeName = attribute.attributeName;
      let binding;

      switch (attributeName) {
        case _index.AttributeName.ATTR_POSITION:
          binding = _define.UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
          break;

        case _index.AttributeName.ATTR_NORMAL:
          binding = _define.UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
          break;

        case _index.AttributeName.ATTR_TANGENT:
          binding = _define.UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
          break;

        default:
          (0, _debug.warn)('Unexpected attribute!');
          break;
      }

      if (binding !== undefined) {
        descriptorSet.bindSampler(binding, attribute.morphTexture.sampler);
        descriptorSet.bindTexture(binding, attribute.morphTexture.texture);
      }
    }

    descriptorSet.bindBuffer(_define.UBOMorph.BINDING, this._morphUniforms.buffer);
    descriptorSet.update();
  }

  destroy() {
    this._morphUniforms.destroy();

    for (let iAttribute = 0; iAttribute < this._attributes.length; ++iAttribute) {
      const myAttribute = this._attributes[iAttribute];
      myAttribute.morphTexture.destroy();
    }
  }

}
/**
 * Provides the access to morph related uniforms.
 */


class MorphUniforms {
  constructor(gfxDevice, targetCount) {
    this._targetCount = void 0;
    this._localBuffer = void 0;
    this._remoteBuffer = void 0;
    this._targetCount = targetCount;
    this._localBuffer = new DataView(new ArrayBuffer(_define.UBOMorph.SIZE));
    this._remoteBuffer = gfxDevice.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.UNIFORM | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, _define.UBOMorph.SIZE, _define.UBOMorph.SIZE));
  }

  destroy() {
    this._remoteBuffer.destroy();
  }

  get buffer() {
    return this._remoteBuffer;
  }

  setWeights(weights) {
    (0, _asserts.assertIsTrue)(weights.length === this._targetCount);

    for (let iWeight = 0; iWeight < weights.length; ++iWeight) {
      this._localBuffer.setFloat32(_define.UBOMorph.OFFSET_OF_WEIGHTS + 4 * iWeight, weights[iWeight], _globalExports.legacyCC.sys.isLittleEndian);
    }
  }

  setMorphTextureInfo(width, height) {
    this._localBuffer.setFloat32(_define.UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH, width, _globalExports.legacyCC.sys.isLittleEndian);

    this._localBuffer.setFloat32(_define.UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT, height, _globalExports.legacyCC.sys.isLittleEndian);
  }

  setVerticesCount(count) {
    this._localBuffer.setFloat32(_define.UBOMorph.OFFSET_OF_VERTICES_COUNT, count, _globalExports.legacyCC.sys.isLittleEndian);
  }

  commit() {
    this._remoteBuffer.update(this._localBuffer.buffer);
  }

}
/**
 *
 * @param gfxDevice
 * @param vec4Capacity Capacity of vec4.
 */


function createVec4TextureFactory(gfxDevice, vec4Capacity) {
  const hasFeatureFloatTexture = gfxDevice.hasFeature(_index.Feature.TEXTURE_FLOAT);
  let pixelRequired;
  let pixelFormat;
  let pixelBytes;
  let UpdateViewConstructor;

  if (hasFeatureFloatTexture) {
    pixelRequired = vec4Capacity;
    pixelBytes = 16;
    pixelFormat = _texture2d.Texture2D.PixelFormat.RGBA32F;
    UpdateViewConstructor = Float32Array;
  } else {
    pixelRequired = 4 * vec4Capacity;
    pixelBytes = 4;
    pixelFormat = _texture2d.Texture2D.PixelFormat.RGBA8888;
    UpdateViewConstructor = Uint8Array;
  }

  const {
    width,
    height
  } = bestSizeToHavePixels(pixelRequired);
  (0, _asserts.assertIsTrue)(width * height >= pixelRequired);
  return {
    width,
    height,
    create: () => {
      const arrayBuffer = new ArrayBuffer(width * height * pixelBytes);
      const valueView = new Float32Array(arrayBuffer);
      const updateView = UpdateViewConstructor === Float32Array ? valueView : new UpdateViewConstructor(arrayBuffer);
      const image = new _imageAsset.ImageAsset({
        width,
        height,
        _data: updateView,
        _compressed: false,
        format: pixelFormat
      });
      const textureAsset = new _texture2d.Texture2D();
      textureAsset.setFilters(_texture2d.Texture2D.Filter.NEAREST, _texture2d.Texture2D.Filter.NEAREST);
      textureAsset.setMipFilter(_texture2d.Texture2D.Filter.NONE);
      textureAsset.setWrapMode(_texture2d.Texture2D.WrapMode.CLAMP_TO_EDGE, _texture2d.Texture2D.WrapMode.CLAMP_TO_EDGE, _texture2d.Texture2D.WrapMode.CLAMP_TO_EDGE);
      textureAsset.image = image;

      if (!textureAsset.getGFXTexture()) {
        (0, _debug.warn)('Unexpected: failed to create morph texture?');
      }

      const sampler = _samplerLib.samplerLib.getSampler(gfxDevice, textureAsset.getSamplerHash());

      return {
        /**
         * Gets the GFX texture.
         */
        get texture() {
          return textureAsset.getGFXTexture();
        },

        /**
         * Gets the GFX sampler.
         */
        get sampler() {
          return sampler;
        },

        /**
         * Value view.
         */
        get valueView() {
          return valueView;
        },

        /**
         * Destroy the texture. Release its GPU resources.
         */
        destroy() {
          textureAsset.destroy(); // Samplers allocated from `samplerLib` are not required and
          // should not be destroyed.
          // this._sampler.destroy();
        },

        /**
         * Update the pixels content to `valueView`.
         */
        updatePixels() {
          textureAsset.uploadData(updateView);
        }

      };
    }
  };
}

/**
 * When use vertex-texture-fetch technique, we do need
 * `gl_vertexId` when we sample per-vertex data.
 * WebGL 1.0 does not have `gl_vertexId`; WebGL 2.0, however, does.
 * @param mesh
 * @param subMeshIndex
 * @param gfxDevice
 */
function enableVertexId(mesh, subMeshIndex, gfxDevice) {
  mesh.renderingSubMeshes[subMeshIndex].enableVertexIdChannel(gfxDevice);
}
/**
 * Decides a best texture size to have the specified pixel capacity at least.
 * The decided width and height has the following characteristics:
 * - the width and height are both power of 2;
 * - if the width and height are different, the width would be set to the larger once;
 * - the width is ensured to be multiple of 4.
 * @param nPixels Least pixel capacity.
 */


function bestSizeToHavePixels(nPixels) {
  if (nPixels < 5) {
    nPixels = 5;
  }

  const aligned = (0, _bits.nextPow2)(nPixels);
  const epxSum = (0, _bits.log2)(aligned);
  const h = epxSum >> 1;
  const w = epxSum & 1 ? h + 1 : h;
  return {
    width: 1 << w,
    height: 1 << h
  };
}