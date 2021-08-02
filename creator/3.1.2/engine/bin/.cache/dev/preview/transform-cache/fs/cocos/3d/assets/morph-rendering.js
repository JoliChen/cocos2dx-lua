System.register("q-bundled:///fs/cocos/3d/assets/morph-rendering.js", ["../../core/gfx/index.js", "../../core/assets/texture-2d.js", "../../core/assets/image-asset.js", "../../core/renderer/core/sampler-lib.js", "../../core/pipeline/define.js", "../../core/platform/debug.js", "../../core/data/utils/asserts.js", "../../core/math/bits.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var AttributeName, BufferUsageBit, Feature, MemoryUsageBit, BufferInfo, Texture2D, ImageAsset, samplerLib, UBOMorph, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, warn, assertIsNonNullable, assertIsTrue, log2, nextPow2, legacyCC, preferCpuComputing, StdMorphRendering, GpuComputing, CpuComputing, CpuComputingRenderingInstance, MorphUniforms;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   *
   * @param gfxDevice
   * @param vec4Capacity Capacity of vec4.
   */
  function createVec4TextureFactory(gfxDevice, vec4Capacity) {
    var hasFeatureFloatTexture = gfxDevice.hasFeature(Feature.TEXTURE_FLOAT);
    var pixelRequired;
    var pixelFormat;
    var pixelBytes;
    var UpdateViewConstructor;

    if (hasFeatureFloatTexture) {
      pixelRequired = vec4Capacity;
      pixelBytes = 16;
      pixelFormat = Texture2D.PixelFormat.RGBA32F;
      UpdateViewConstructor = Float32Array;
    } else {
      pixelRequired = 4 * vec4Capacity;
      pixelBytes = 4;
      pixelFormat = Texture2D.PixelFormat.RGBA8888;
      UpdateViewConstructor = Uint8Array;
    }

    var _bestSizeToHavePixels = bestSizeToHavePixels(pixelRequired),
        width = _bestSizeToHavePixels.width,
        height = _bestSizeToHavePixels.height;

    assertIsTrue(width * height >= pixelRequired);
    return {
      width: width,
      height: height,
      create: function create() {
        var arrayBuffer = new ArrayBuffer(width * height * pixelBytes);
        var valueView = new Float32Array(arrayBuffer);
        var updateView = UpdateViewConstructor === Float32Array ? valueView : new UpdateViewConstructor(arrayBuffer);
        var image = new ImageAsset({
          width: width,
          height: height,
          _data: updateView,
          _compressed: false,
          format: pixelFormat
        });
        var textureAsset = new Texture2D();
        textureAsset.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
        textureAsset.setMipFilter(Texture2D.Filter.NONE);
        textureAsset.setWrapMode(Texture2D.WrapMode.CLAMP_TO_EDGE, Texture2D.WrapMode.CLAMP_TO_EDGE, Texture2D.WrapMode.CLAMP_TO_EDGE);
        textureAsset.image = image;

        if (!textureAsset.getGFXTexture()) {
          warn('Unexpected: failed to create morph texture?');
        }

        var sampler = samplerLib.getSampler(gfxDevice, textureAsset.getSamplerHash());
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
          destroy: function destroy() {
            textureAsset.destroy(); // Samplers allocated from `samplerLib` are not required and
            // should not be destroyed.
            // this._sampler.destroy();
          },

          /**
           * Update the pixels content to `valueView`.
           */
          updatePixels: function updatePixels() {
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

    var aligned = nextPow2(nPixels);
    var epxSum = log2(aligned);
    var h = epxSum >> 1;
    var w = epxSum & 1 ? h + 1 : h;
    return {
      width: 1 << w,
      height: 1 << h
    };
  }

  return {
    setters: [function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      Feature = _coreGfxIndexJs.Feature;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
    }, function (_coreAssetsTexture2dJs) {
      Texture2D = _coreAssetsTexture2dJs.Texture2D;
    }, function (_coreAssetsImageAssetJs) {
      ImageAsset = _coreAssetsImageAssetJs.ImageAsset;
    }, function (_coreRendererCoreSamplerLibJs) {
      samplerLib = _coreRendererCoreSamplerLibJs.samplerLib;
    }, function (_corePipelineDefineJs) {
      UBOMorph = _corePipelineDefineJs.UBOMorph;
      UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = _corePipelineDefineJs.UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
      UNIFORM_POSITION_MORPH_TEXTURE_BINDING = _corePipelineDefineJs.UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
      UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = _corePipelineDefineJs.UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
    }, function (_corePlatformDebugJs) {
      warn = _corePlatformDebugJs.warn;
    }, function (_coreDataUtilsAssertsJs) {
      assertIsNonNullable = _coreDataUtilsAssertsJs.assertIsNonNullable;
      assertIsTrue = _coreDataUtilsAssertsJs.assertIsTrue;
    }, function (_coreMathBitsJs) {
      log2 = _coreMathBitsJs.log2;
      nextPow2 = _coreMathBitsJs.nextPow2;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * True if force to use cpu computing based sub-mesh rendering.
       */
      preferCpuComputing = false;
      /**
       * Standard morph rendering.
       * The standard morph rendering renders each of sub-mesh morph separately.
       * Sub-mesh morph rendering may select different technique according sub-mesh morph itself.
       */

      _export("StdMorphRendering", StdMorphRendering = /*#__PURE__*/function () {
        function StdMorphRendering(mesh, gfxDevice) {
          this._mesh = void 0;
          this._subMeshRenderings = [];
          this._mesh = mesh;

          if (!this._mesh.struct.morph) {
            return;
          }

          var nSubMeshes = this._mesh.struct.primitives.length;
          this._subMeshRenderings = new Array(nSubMeshes).fill(null);

          for (var iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
            var subMeshMorph = this._mesh.struct.morph.subMeshMorphs[iSubMesh];

            if (!subMeshMorph) {
              continue;
            }

            if (preferCpuComputing || subMeshMorph.targets.length > UBOMorph.MAX_MORPH_TARGET_COUNT) {
              this._subMeshRenderings[iSubMesh] = new CpuComputing(this._mesh, iSubMesh, this._mesh.struct.morph, gfxDevice);
            } else {
              this._subMeshRenderings[iSubMesh] = new GpuComputing(this._mesh, iSubMesh, this._mesh.struct.morph, gfxDevice);
            }
          }
        }

        var _proto = StdMorphRendering.prototype;

        _proto.createInstance = function createInstance() {
          var _this = this;

          var nSubMeshes = this._mesh.struct.primitives.length;
          var subMeshInstances = new Array(nSubMeshes);

          for (var iSubMesh = 0; iSubMesh < nSubMeshes; ++iSubMesh) {
            var _this$_subMeshRenderi, _this$_subMeshRenderi2;

            subMeshInstances[iSubMesh] = (_this$_subMeshRenderi = (_this$_subMeshRenderi2 = this._subMeshRenderings[iSubMesh]) === null || _this$_subMeshRenderi2 === void 0 ? void 0 : _this$_subMeshRenderi2.createInstance()) !== null && _this$_subMeshRenderi !== void 0 ? _this$_subMeshRenderi : null;
          }

          return {
            setWeights: function setWeights(subMeshIndex, weights) {
              var _subMeshInstances$sub;

              (_subMeshInstances$sub = subMeshInstances[subMeshIndex]) === null || _subMeshInstances$sub === void 0 ? void 0 : _subMeshInstances$sub.setWeights(weights);
            },
            requiredPatches: function requiredPatches(subMeshIndex) {
              assertIsNonNullable(_this._mesh.struct.morph);
              var subMeshMorph = _this._mesh.struct.morph.subMeshMorphs[subMeshIndex];
              var subMeshRenderingInstance = subMeshInstances[subMeshIndex];

              if (subMeshRenderingInstance === null) {
                return null;
              }

              assertIsNonNullable(subMeshMorph);
              var patches = [{
                name: 'CC_USE_MORPH',
                value: true
              }, {
                name: 'CC_MORPH_TARGET_COUNT',
                value: subMeshMorph.targets.length
              }];

              if (subMeshMorph.attributes.includes(AttributeName.ATTR_POSITION)) {
                patches.push({
                  name: 'CC_MORPH_TARGET_HAS_POSITION',
                  value: true
                });
              }

              if (subMeshMorph.attributes.includes(AttributeName.ATTR_NORMAL)) {
                patches.push({
                  name: 'CC_MORPH_TARGET_HAS_NORMAL',
                  value: true
                });
              }

              if (subMeshMorph.attributes.includes(AttributeName.ATTR_TANGENT)) {
                patches.push({
                  name: 'CC_MORPH_TARGET_HAS_TANGENT',
                  value: true
                });
              }

              patches.push.apply(patches, subMeshRenderingInstance.requiredPatches());
              return patches;
            },
            adaptPipelineState: function adaptPipelineState(subMeshIndex, descriptorSet) {
              var _subMeshInstances$sub2;

              (_subMeshInstances$sub2 = subMeshInstances[subMeshIndex]) === null || _subMeshInstances$sub2 === void 0 ? void 0 : _subMeshInstances$sub2.adaptPipelineState(descriptorSet);
            },
            destroy: function destroy() {
              for (var _iterator = _createForOfIteratorHelperLoose(subMeshInstances), _step; !(_step = _iterator()).done;) {
                var subMeshInstance = _step.value;
                subMeshInstance === null || subMeshInstance === void 0 ? void 0 : subMeshInstance.destroy();
              }
            }
          };
        };

        return StdMorphRendering;
      }());
      /**
       * Describes how to render a sub-mesh morph.
       */


      /**
       * (General purpose) Gpu computing based sub-mesh morph rendering.
       * This technique computes final attribute displacements on GPU.
       * Target displacements of each attribute are transferred through vertex texture, say, morph texture.
       */
      GpuComputing = /*#__PURE__*/function () {
        function GpuComputing(mesh, subMeshIndex, morph, gfxDevice) {
          this._gfxDevice = void 0;
          this._subMeshMorph = void 0;
          this._textureInfo = void 0;
          this._attributes = void 0;
          this._verticesCount = void 0;
          this._gfxDevice = gfxDevice;
          var subMeshMorph = morph.subMeshMorphs[subMeshIndex];
          assertIsNonNullable(subMeshMorph);
          this._subMeshMorph = subMeshMorph;
          enableVertexId(mesh, subMeshIndex, gfxDevice);
          var nVertices = mesh.struct.vertexBundles[mesh.struct.primitives[subMeshIndex].vertexBundelIndices[0]].view.count;
          this._verticesCount = nVertices;
          var nTargets = subMeshMorph.targets.length;
          var vec4Required = nVertices * nTargets;
          var vec4TextureFactory = createVec4TextureFactory(gfxDevice, vec4Required);
          this._textureInfo = {
            width: vec4TextureFactory.width,
            height: vec4TextureFactory.height
          }; // Creates texture for each attribute.

          this._attributes = subMeshMorph.attributes.map(function (attributeName, attributeIndex) {
            var vec4Tex = vec4TextureFactory.create();
            var valueView = vec4Tex.valueView; // if (DEV) { // Make it easy to view texture in profilers...
            //     for (let i = 0; i < valueView.length / 4; ++i) {
            //         valueView[i * 4 + 3] = 1.0;
            //     }
            // }

            subMeshMorph.targets.forEach(function (morphTarget, morphTargetIndex) {
              var displacementsView = morphTarget.displacements[attributeIndex];
              var displacements = new Float32Array(mesh.data.buffer, mesh.data.byteOffset + displacementsView.offset, displacementsView.count);
              var displacementsOffset = nVertices * morphTargetIndex * 4;

              for (var iVertex = 0; iVertex < nVertices; ++iVertex) {
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

        var _proto2 = GpuComputing.prototype;

        _proto2.destroy = function destroy() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this._attributes), _step2; !(_step2 = _iterator2()).done;) {
            var attribute = _step2.value;
            attribute.morphTexture.destroy();
          }
        };

        _proto2.createInstance = function createInstance() {
          var _this2 = this;

          var morphUniforms = new MorphUniforms(this._gfxDevice, this._subMeshMorph.targets.length);
          morphUniforms.setMorphTextureInfo(this._textureInfo.width, this._textureInfo.height);
          morphUniforms.setVerticesCount(this._verticesCount);
          morphUniforms.commit();
          return {
            setWeights: function setWeights(weights) {
              morphUniforms.setWeights(weights);
              morphUniforms.commit();
            },
            requiredPatches: function requiredPatches() {
              return [{
                name: 'CC_MORPH_TARGET_USE_TEXTURE',
                value: true
              }];
            },
            adaptPipelineState: function adaptPipelineState(descriptorSet) {
              for (var _iterator3 = _createForOfIteratorHelperLoose(_this2._attributes), _step3; !(_step3 = _iterator3()).done;) {
                var attribute = _step3.value;
                var binding = void 0;

                switch (attribute.name) {
                  case AttributeName.ATTR_POSITION:
                    binding = UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
                    break;

                  case AttributeName.ATTR_NORMAL:
                    binding = UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
                    break;

                  case AttributeName.ATTR_TANGENT:
                    binding = UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
                    break;

                  default:
                    warn('Unexpected attribute!');
                    break;
                }

                if (binding !== undefined) {
                  descriptorSet.bindSampler(binding, attribute.morphTexture.sampler);
                  descriptorSet.bindTexture(binding, attribute.morphTexture.texture);
                }
              }

              descriptorSet.bindBuffer(UBOMorph.BINDING, morphUniforms.buffer);
              descriptorSet.update();
            },
            destroy: function destroy() {}
          };
        };

        return GpuComputing;
      }();
      /**
       * Cpu computing based sub-mesh morph rendering.
       * This technique computes final attribute displacements on CPU.
       * The displacements, then, are passed to GPU.
       */


      CpuComputing = /*#__PURE__*/function () {
        function CpuComputing(mesh, subMeshIndex, morph, gfxDevice) {
          this._gfxDevice = void 0;
          this._attributes = [];
          this._gfxDevice = gfxDevice;
          var subMeshMorph = morph.subMeshMorphs[subMeshIndex];
          assertIsNonNullable(subMeshMorph);
          enableVertexId(mesh, subMeshIndex, gfxDevice);
          this._attributes = subMeshMorph.attributes.map(function (attributeName, attributeIndex) {
            return {
              name: attributeName,
              targets: subMeshMorph.targets.map(function (attributeDisplacement) {
                return {
                  displacements: new Float32Array(mesh.data.buffer, mesh.data.byteOffset + attributeDisplacement.displacements[attributeIndex].offset, attributeDisplacement.displacements[attributeIndex].count)
                };
              })
            };
          });
        }
        /**
         * DO NOT use this field.
         */


        var _proto3 = CpuComputing.prototype;

        _proto3.createInstance = function createInstance() {
          return new CpuComputingRenderingInstance(this, this._attributes[0].targets[0].displacements.length / 3, this._gfxDevice);
        };

        _createClass(CpuComputing, [{
          key: "data",
          get: function get() {
            return this._attributes;
          }
        }]);

        return CpuComputing;
      }();

      CpuComputingRenderingInstance = /*#__PURE__*/function () {
        function CpuComputingRenderingInstance(owner, nVertices, gfxDevice) {
          this._attributes = void 0;
          this._owner = void 0;
          this._morphUniforms = void 0;
          this._owner = owner;
          this._morphUniforms = new MorphUniforms(gfxDevice, 0
          /* TODO? */
          );
          var vec4TextureFactory = createVec4TextureFactory(gfxDevice, nVertices);

          this._morphUniforms.setMorphTextureInfo(vec4TextureFactory.width, vec4TextureFactory.height);

          this._morphUniforms.commit();

          this._attributes = this._owner.data.map(function (attributeMorph, attributeIndex) {
            var morphTexture = vec4TextureFactory.create();
            return {
              attributeName: attributeMorph.name,
              morphTexture: morphTexture
            };
          });
        }

        var _proto4 = CpuComputingRenderingInstance.prototype;

        _proto4.setWeights = function setWeights(weights) {
          for (var iAttribute = 0; iAttribute < this._attributes.length; ++iAttribute) {
            var myAttribute = this._attributes[iAttribute];
            var valueView = myAttribute.morphTexture.valueView;
            var attributeMorph = this._owner.data[iAttribute];
            assertIsTrue(weights.length === attributeMorph.targets.length);

            for (var iTarget = 0; iTarget < attributeMorph.targets.length; ++iTarget) {
              var targetDisplacements = attributeMorph.targets[iTarget].displacements;
              var weight = weights[iTarget];
              var nVertices = targetDisplacements.length / 3;

              if (iTarget === 0) {
                for (var iVertex = 0; iVertex < nVertices; ++iVertex) {
                  valueView[4 * iVertex + 0] = targetDisplacements[3 * iVertex + 0] * weight;
                  valueView[4 * iVertex + 1] = targetDisplacements[3 * iVertex + 1] * weight;
                  valueView[4 * iVertex + 2] = targetDisplacements[3 * iVertex + 2] * weight;
                }
              } else if (weight !== 0.0) {
                for (var _iVertex = 0; _iVertex < nVertices; ++_iVertex) {
                  valueView[4 * _iVertex + 0] += targetDisplacements[3 * _iVertex + 0] * weight;
                  valueView[4 * _iVertex + 1] += targetDisplacements[3 * _iVertex + 1] * weight;
                  valueView[4 * _iVertex + 2] += targetDisplacements[3 * _iVertex + 2] * weight;
                }
              }
            }

            myAttribute.morphTexture.updatePixels();
          }
        };

        _proto4.requiredPatches = function requiredPatches() {
          return [{
            name: 'CC_MORPH_TARGET_USE_TEXTURE',
            value: true
          }, {
            name: 'CC_MORPH_PRECOMPUTED',
            value: true
          }];
        };

        _proto4.adaptPipelineState = function adaptPipelineState(descriptorSet) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(this._attributes), _step4; !(_step4 = _iterator4()).done;) {
            var attribute = _step4.value;
            var attributeName = attribute.attributeName;
            var binding = void 0;

            switch (attributeName) {
              case AttributeName.ATTR_POSITION:
                binding = UNIFORM_POSITION_MORPH_TEXTURE_BINDING;
                break;

              case AttributeName.ATTR_NORMAL:
                binding = UNIFORM_NORMAL_MORPH_TEXTURE_BINDING;
                break;

              case AttributeName.ATTR_TANGENT:
                binding = UNIFORM_TANGENT_MORPH_TEXTURE_BINDING;
                break;

              default:
                warn('Unexpected attribute!');
                break;
            }

            if (binding !== undefined) {
              descriptorSet.bindSampler(binding, attribute.morphTexture.sampler);
              descriptorSet.bindTexture(binding, attribute.morphTexture.texture);
            }
          }

          descriptorSet.bindBuffer(UBOMorph.BINDING, this._morphUniforms.buffer);
          descriptorSet.update();
        };

        _proto4.destroy = function destroy() {
          this._morphUniforms.destroy();

          for (var iAttribute = 0; iAttribute < this._attributes.length; ++iAttribute) {
            var myAttribute = this._attributes[iAttribute];
            myAttribute.morphTexture.destroy();
          }
        };

        return CpuComputingRenderingInstance;
      }();
      /**
       * Provides the access to morph related uniforms.
       */


      MorphUniforms = /*#__PURE__*/function () {
        function MorphUniforms(gfxDevice, targetCount) {
          this._targetCount = void 0;
          this._localBuffer = void 0;
          this._remoteBuffer = void 0;
          this._targetCount = targetCount;
          this._localBuffer = new DataView(new ArrayBuffer(UBOMorph.SIZE));
          this._remoteBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOMorph.SIZE, UBOMorph.SIZE));
        }

        var _proto5 = MorphUniforms.prototype;

        _proto5.destroy = function destroy() {
          this._remoteBuffer.destroy();
        };

        _proto5.setWeights = function setWeights(weights) {
          assertIsTrue(weights.length === this._targetCount);

          for (var iWeight = 0; iWeight < weights.length; ++iWeight) {
            this._localBuffer.setFloat32(UBOMorph.OFFSET_OF_WEIGHTS + 4 * iWeight, weights[iWeight], legacyCC.sys.isLittleEndian);
          }
        };

        _proto5.setMorphTextureInfo = function setMorphTextureInfo(width, height) {
          this._localBuffer.setFloat32(UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_WIDTH, width, legacyCC.sys.isLittleEndian);

          this._localBuffer.setFloat32(UBOMorph.OFFSET_OF_DISPLACEMENT_TEXTURE_HEIGHT, height, legacyCC.sys.isLittleEndian);
        };

        _proto5.setVerticesCount = function setVerticesCount(count) {
          this._localBuffer.setFloat32(UBOMorph.OFFSET_OF_VERTICES_COUNT, count, legacyCC.sys.isLittleEndian);
        };

        _proto5.commit = function commit() {
          this._remoteBuffer.update(this._localBuffer.buffer);
        };

        _createClass(MorphUniforms, [{
          key: "buffer",
          get: function get() {
            return this._remoteBuffer;
          }
        }]);

        return MorphUniforms;
      }();
    }
  };
});