System.register(['./shadows-72f55b4d.js', './json-asset-bf8c3142.js'], function (exports) {
    'use strict';
    var _createClass, assertIsTrue, UBOMorph, legacyCC, assertIsNonNullable, ImageAsset, Texture2D, warn, samplerLib, _createForOfIteratorHelperLoose, AttributeName, BufferInfo, BufferUsageBit, MemoryUsageBit, Feature, nextPow2, log2, UNIFORM_TANGENT_MORPH_TEXTURE_BINDING, UNIFORM_NORMAL_MORPH_TEXTURE_BINDING, UNIFORM_POSITION_MORPH_TEXTURE_BINDING, Vec3, ccclass, _inheritsLoose, AABB, Quat, FormatInfos, getTypedArrayConstructor, Format, Asset, _applyDecoratedDescriptor, FormatType, _initializerDefineProperty, _assertThisInitialized, warnID, Attribute, murmurhash2_32_gc, serializable, sys, RenderingSubMesh;
    return {
        setters: [function (module) {
            _createClass = module.eu;
            assertIsTrue = module.gf;
            UBOMorph = module.gr;
            legacyCC = module.l;
            assertIsNonNullable = module.gd;
            ImageAsset = module.e3;
            Texture2D = module.e4;
            warn = module.w;
            samplerLib = module.bR;
            _createForOfIteratorHelperLoose = module.t;
            AttributeName = module.b1;
            BufferInfo = module.ap;
            BufferUsageBit = module.z;
            MemoryUsageBit = module.G;
            Feature = module.F;
            nextPow2 = module.gs;
            log2 = module.gt;
            UNIFORM_TANGENT_MORPH_TEXTURE_BINDING = module.gu;
            UNIFORM_NORMAL_MORPH_TEXTURE_BINDING = module.gv;
            UNIFORM_POSITION_MORPH_TEXTURE_BINDING = module.gw;
            Vec3 = module.cY;
            ccclass = module.es;
            _inheritsLoose = module.et;
            AABB = module.f9;
            Quat = module.d0;
            FormatInfos = module.b2;
            getTypedArrayConstructor = module.bb;
            Format = module.x;
            Asset = module.e1;
            _applyDecoratedDescriptor = module.ev;
            FormatType = module.y;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            warnID = module.d;
            Attribute = module.aG;
            murmurhash2_32_gc = module.dJ;
            serializable = module.eI;
            sys = module.eg;
        }, function (module) {
            RenderingSubMesh = module.R;
        }],
        execute: function () {

            var BufferBlob = exports('B', function () {
              function BufferBlob() {
                this._arrayBufferOrPaddings = [];
                this._length = 0;
              }

              var _proto = BufferBlob.prototype;

              _proto.setNextAlignment = function setNextAlignment(align) {
                if (align !== 0) {
                  var remainder = this._length % align;

                  if (remainder !== 0) {
                    var padding = align - remainder;

                    this._arrayBufferOrPaddings.push(padding);

                    this._length += padding;
                  }
                }
              };

              _proto.addBuffer = function addBuffer(arrayBuffer) {
                var result = this._length;

                this._arrayBufferOrPaddings.push(arrayBuffer);

                this._length += arrayBuffer.byteLength;
                return result;
              };

              _proto.getLength = function getLength() {
                return this._length;
              };

              _proto.getCombined = function getCombined() {
                var result = new Uint8Array(this._length);
                var counter = 0;

                this._arrayBufferOrPaddings.forEach(function (arrayBufferOrPadding) {
                  if (typeof arrayBufferOrPadding === 'number') {
                    counter += arrayBufferOrPadding;
                  } else {
                    result.set(new Uint8Array(arrayBufferOrPadding), counter);
                    counter += arrayBufferOrPadding.byteLength;
                  }
                });

                return result.buffer;
              };

              return BufferBlob;
            }());

            var StdMorphRendering = function () {
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

                  if ( subMeshMorph.targets.length > UBOMorph.MAX_MORPH_TARGET_COUNT) {
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
            }();

            var GpuComputing = function () {
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
                };
                this._attributes = subMeshMorph.attributes.map(function (attributeName, attributeIndex) {
                  var vec4Tex = vec4TextureFactory.create();
                  var valueView = vec4Tex.valueView;
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

            var CpuComputing = function () {
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

            var CpuComputingRenderingInstance = function () {
              function CpuComputingRenderingInstance(owner, nVertices, gfxDevice) {
                this._attributes = void 0;
                this._owner = void 0;
                this._morphUniforms = void 0;
                this._owner = owner;
                this._morphUniforms = new MorphUniforms(gfxDevice, 0);
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

            var MorphUniforms = function () {
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
                    get texture() {
                      return textureAsset.getGFXTexture();
                    },

                    get sampler() {
                      return sampler;
                    },

                    get valueView() {
                      return valueView;
                    },

                    destroy: function destroy() {
                      textureAsset.destroy();
                    },
                    updatePixels: function updatePixels() {
                      textureAsset.uploadData(updateView);
                    }
                  };
                }
              };
            }

            function enableVertexId(mesh, subMeshIndex, gfxDevice) {
              mesh.renderingSubMeshes[subMeshIndex].enableVertexIdChannel(gfxDevice);
            }

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

            function createMorphRendering(mesh, gfxDevice) {
              return new StdMorphRendering(mesh, gfxDevice);
            }

            var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

            function getIndexStrideCtor(stride) {
              switch (stride) {
                case 1:
                  return Uint8Array;

                case 2:
                  return Uint16Array;

                case 4:
                  return Uint32Array;

                default:
                  return Uint8Array;
              }
            }

            var v3_1 = new Vec3();
            var v3_2 = new Vec3();
            var globalEmptyMeshBuffer = new Uint8Array();
            var Mesh = exports('M', (_dec = ccclass('cc.Mesh'), _dec(_class = (_class2 = (_temp = function (_Asset) {
              _inheritsLoose(Mesh, _Asset);

              function Mesh() {
                var _this;

                _this = _Asset.call(this) || this;
                _this.morphRendering = null;

                _initializerDefineProperty(_this, "_struct", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_dataLength", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_hash", _descriptor3, _assertThisInitialized(_this));

                _this._data = globalEmptyMeshBuffer;
                _this._initialized = false;
                _this._renderingSubMeshes = null;
                _this._boneSpaceBounds = new Map();
                _this._jointBufferIndices = null;
                _this.loaded = false;
                return _this;
              }

              var _proto = Mesh.prototype;

              _proto.initialize = function initialize() {
                var _this2 = this;

                if (this._initialized) {
                  return;
                }

                this._initialized = true;

                if (this._data.byteLength !== this._dataLength) {
                  this._data = new Uint8Array(this._dataLength);
                  legacyCC.assetManager.postLoadNative(this);
                }

                var buffer = this._data.buffer;
                var gfxDevice = legacyCC.director.root.device;

                var vertexBuffers = this._createVertexBuffers(gfxDevice, buffer);
                var subMeshes = [];

                var _loop = function _loop(i) {
                  var prim = _this2._struct.primitives[i];

                  if (prim.vertexBundelIndices.length === 0) {
                    return "continue";
                  }

                  var indexBuffer = null;
                  var ib = null;

                  if (prim.indexView) {
                    var idxView = prim.indexView;
                    var dstStride = idxView.stride;
                    var dstSize = idxView.length;

                    if (dstStride === 4 && !gfxDevice.hasFeature(Feature.ELEMENT_INDEX_UINT)) {
                      var vertexCount = _this2._struct.vertexBundles[prim.vertexBundelIndices[0]].view.count;

                      if (vertexCount >= 65536) {
                        warnID(10001, vertexCount, 65536);
                        return "continue";
                      } else {
                        dstStride >>= 1;
                        dstSize >>= 1;
                      }
                    }

                    indexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.INDEX, MemoryUsageBit.DEVICE, dstSize, dstStride));
                    ib = new (getIndexStrideCtor(idxView.stride))(buffer, idxView.offset, idxView.count);

                    if (idxView.stride !== dstStride) {
                      ib = getIndexStrideCtor(dstStride).from(ib);
                    }

                    if (_this2.loaded) {
                      indexBuffer.update(ib);
                    } else {
                      _this2.once('load', function () {
                        indexBuffer.update(ib);
                      });
                    }
                  }

                  var vbReference = prim.vertexBundelIndices.map(function (idx) {
                    return vertexBuffers[idx];
                  });
                  var gfxAttributes = [];

                  if (prim.vertexBundelIndices.length > 0) {
                    var idx = prim.vertexBundelIndices[0];
                    var _vertexBundle = _this2._struct.vertexBundles[idx];
                    var attrs = _vertexBundle.attributes;

                    for (var j = 0; j < attrs.length; ++j) {
                      var attr = attrs[j];
                      gfxAttributes[j] = new Attribute(attr.name, attr.format, attr.isInstanced, attr.stream, attr.isInstanced, attr.location);
                    }
                  }

                  var subMesh = new RenderingSubMesh(vbReference, gfxAttributes, prim.primitiveMode, indexBuffer);
                  subMesh.mesh = _this2;
                  subMesh.subMeshIdx = i;
                  subMeshes.push(subMesh);
                };

                for (var i = 0; i < this._struct.primitives.length; i++) {
                  var _ret = _loop(i);

                  if (_ret === "continue") continue;
                }

                this._renderingSubMeshes = subMeshes;

                if (this._struct.morph) {
                  this.morphRendering = createMorphRendering(this, gfxDevice);
                }
              };

              _proto.destroy = function destroy() {
                this.destroyRenderingMesh();
                return _Asset.prototype.destroy.call(this);
              };

              _proto.destroyRenderingMesh = function destroyRenderingMesh() {
                if (this._renderingSubMeshes) {
                  for (var i = 0; i < this._renderingSubMeshes.length; i++) {
                    this._renderingSubMeshes[i].destroy();
                  }

                  this._renderingSubMeshes = null;
                  this._initialized = false;
                }
              };

              _proto.assign = function assign(struct, data) {
                this.reset({
                  struct: struct,
                  data: data
                });
              };

              _proto.reset = function reset(info) {
                this.destroyRenderingMesh();
                this._struct = info.struct;
                this._data = info.data;
                this._dataLength = this.data.byteLength;
                this._hash = 0;
                this.loaded = true;
                this.emit('load');
              };

              _proto.getBoneSpaceBounds = function getBoneSpaceBounds(skeleton) {
                if (this._boneSpaceBounds.has(skeleton.hash)) {
                  return this._boneSpaceBounds.get(skeleton.hash);
                }

                var bounds = [];

                this._boneSpaceBounds.set(skeleton.hash, bounds);

                var valid = [];
                var bindposes = skeleton.bindposes;

                for (var i = 0; i < bindposes.length; i++) {
                  bounds.push(new AABB(Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity));
                  valid.push(false);
                }

                var primitives = this._struct.primitives;

                for (var p = 0; p < primitives.length; p++) {
                  var joints = this.readAttribute(p, AttributeName.ATTR_JOINTS);
                  var weights = this.readAttribute(p, AttributeName.ATTR_WEIGHTS);
                  var positions = this.readAttribute(p, AttributeName.ATTR_POSITION);

                  if (!joints || !weights || !positions) {
                    continue;
                  }

                  var vertCount = Math.min(joints.length / 4, weights.length / 4, positions.length / 3);

                  for (var _i = 0; _i < vertCount; _i++) {
                    Vec3.set(v3_1, positions[3 * _i + 0], positions[3 * _i + 1], positions[3 * _i + 2]);

                    for (var j = 0; j < 4; ++j) {
                      var idx = 4 * _i + j;
                      var joint = joints[idx];

                      if (weights[idx] === 0 || joint >= bindposes.length) {
                        continue;
                      }

                      Vec3.transformMat4(v3_2, v3_1, bindposes[joint]);
                      valid[joint] = true;
                      var b = bounds[joint];
                      Vec3.min(b.center, b.center, v3_2);
                      Vec3.max(b.halfExtents, b.halfExtents, v3_2);
                    }
                  }
                }

                for (var _i2 = 0; _i2 < bindposes.length; _i2++) {
                  var _b = bounds[_i2];

                  if (!valid[_i2]) {
                    bounds[_i2] = null;
                  } else {
                    AABB.fromPoints(_b, _b.center, _b.halfExtents);
                  }
                }

                return bounds;
              };

              _proto.merge = function merge(mesh, worldMatrix, validate) {
                if (validate) {
                  if (!this.loaded || !mesh.loaded || !this.validateMergingMesh(mesh)) {
                    return false;
                  }
                }

                var vec3_temp = new Vec3();
                var rotate = worldMatrix && new Quat();
                var boundingBox = worldMatrix && new AABB();

                if (rotate) {
                  worldMatrix.getRotation(rotate);
                }

                if (!this._initialized) {
                  var struct = JSON.parse(JSON.stringify(mesh._struct));

                  var data = mesh._data.slice();

                  if (worldMatrix) {
                    if (struct.maxPosition && struct.minPosition) {
                      Vec3.add(boundingBox.center, struct.maxPosition, struct.minPosition);
                      Vec3.multiplyScalar(boundingBox.center, boundingBox.center, 0.5);
                      Vec3.subtract(boundingBox.halfExtents, struct.maxPosition, struct.minPosition);
                      Vec3.multiplyScalar(boundingBox.halfExtents, boundingBox.halfExtents, 0.5);
                      AABB.transform(boundingBox, boundingBox, worldMatrix);
                      Vec3.add(struct.maxPosition, boundingBox.center, boundingBox.halfExtents);
                      Vec3.subtract(struct.minPosition, boundingBox.center, boundingBox.halfExtents);
                    }

                    for (var i = 0; i < struct.vertexBundles.length; i++) {
                      var vtxBdl = struct.vertexBundles[i];

                      for (var j = 0; j < vtxBdl.attributes.length; j++) {
                        if (vtxBdl.attributes[j].name === AttributeName.ATTR_POSITION || vtxBdl.attributes[j].name === AttributeName.ATTR_NORMAL) {
                          var format = vtxBdl.attributes[j].format;
                          var inputView = new DataView(data.buffer, vtxBdl.view.offset + getOffset(vtxBdl.attributes, j));
                          var reader = getReader(inputView, format);
                          var writer = getWriter(inputView, format);

                          if (!reader || !writer) {
                            continue;
                          }

                          var vertexCount = vtxBdl.view.count;
                          var vertexStride = vtxBdl.view.stride;
                          var attrComponentByteLength = getComponentByteLength(format);

                          for (var vtxIdx = 0; vtxIdx < vertexCount; vtxIdx++) {
                            var xOffset = vtxIdx * vertexStride;
                            var yOffset = xOffset + attrComponentByteLength;
                            var zOffset = yOffset + attrComponentByteLength;
                            vec3_temp.set(reader(xOffset), reader(yOffset), reader(zOffset));

                            switch (vtxBdl.attributes[j].name) {
                              case AttributeName.ATTR_POSITION:
                                vec3_temp.transformMat4(worldMatrix);
                                break;

                              case AttributeName.ATTR_NORMAL:
                                Vec3.transformQuat(vec3_temp, vec3_temp, rotate);
                                break;
                            }

                            writer(xOffset, vec3_temp.x);
                            writer(yOffset, vec3_temp.y);
                            writer(zOffset, vec3_temp.z);
                          }
                        }
                      }
                    }
                  }

                  this.reset({
                    struct: struct,
                    data: data
                  });
                  this.initialize();
                  return true;
                }

                var bufferBlob = new BufferBlob();
                var vertCount = 0;
                var vertStride = 0;
                var srcOffset = 0;
                var dstOffset = 0;
                var vb;
                var vbView;
                var srcVBView;
                var dstVBView;
                var srcAttrOffset = 0;
                var srcVBOffset = 0;
                var dstVBOffset = 0;
                var attrSize = 0;
                var dstAttrView;
                var hasAttr = false;
                var vertexBundles = new Array(this._struct.vertexBundles.length);

                for (var _i3 = 0; _i3 < this._struct.vertexBundles.length; ++_i3) {
                  var bundle = this._struct.vertexBundles[_i3];
                  var dstBundle = mesh._struct.vertexBundles[_i3];
                  srcOffset = bundle.view.offset;
                  dstOffset = dstBundle.view.offset;
                  vertStride = bundle.view.stride;
                  vertCount = bundle.view.count + dstBundle.view.count;
                  vb = new ArrayBuffer(vertCount * vertStride);
                  vbView = new Uint8Array(vb);
                  srcVBView = this._data.subarray(srcOffset, srcOffset + bundle.view.length);
                  srcOffset += srcVBView.length;
                  dstVBView = mesh._data.subarray(dstOffset, dstOffset + dstBundle.view.length);
                  dstOffset += dstVBView.length;
                  vbView.set(srcVBView);
                  srcAttrOffset = 0;

                  for (var _iterator = _createForOfIteratorHelperLoose(bundle.attributes), _step; !(_step = _iterator()).done;) {
                    var attr = _step.value;
                    dstVBOffset = 0;
                    hasAttr = false;

                    for (var _iterator2 = _createForOfIteratorHelperLoose(dstBundle.attributes), _step2; !(_step2 = _iterator2()).done;) {
                      var dstAttr = _step2.value;

                      if (attr.name === dstAttr.name && attr.format === dstAttr.format) {
                        hasAttr = true;
                        break;
                      }

                      dstVBOffset += FormatInfos[dstAttr.format].size;
                    }

                    if (hasAttr) {
                      attrSize = FormatInfos[attr.format].size;
                      srcVBOffset = bundle.view.length + srcAttrOffset;

                      for (var v = 0; v < dstBundle.view.count; ++v) {
                        dstAttrView = dstVBView.subarray(dstVBOffset, dstVBOffset + attrSize);
                        vbView.set(dstAttrView, srcVBOffset);

                        if ((attr.name === AttributeName.ATTR_POSITION || attr.name === AttributeName.ATTR_NORMAL) && worldMatrix) {
                          var f32_temp = new Float32Array(vbView.buffer, srcVBOffset, 3);
                          vec3_temp.set(f32_temp[0], f32_temp[1], f32_temp[2]);

                          switch (attr.name) {
                            case AttributeName.ATTR_POSITION:
                              vec3_temp.transformMat4(worldMatrix);
                              break;

                            case AttributeName.ATTR_NORMAL:
                              Vec3.transformQuat(vec3_temp, vec3_temp, rotate);
                              break;
                          }

                          f32_temp[0] = vec3_temp.x;
                          f32_temp[1] = vec3_temp.y;
                          f32_temp[2] = vec3_temp.z;
                        }

                        srcVBOffset += bundle.view.stride;
                        dstVBOffset += dstBundle.view.stride;
                      }
                    }

                    srcAttrOffset += FormatInfos[attr.format].size;
                  }

                  vertexBundles[_i3] = {
                    attributes: bundle.attributes,
                    view: {
                      offset: bufferBlob.getLength(),
                      length: vb.byteLength,
                      count: vertCount,
                      stride: vertStride
                    }
                  };
                  bufferBlob.addBuffer(vb);
                }

                var idxCount = 0;
                var idxStride = 2;
                var vertBatchCount = 0;
                var ibView;
                var srcIBView;
                var dstIBView;
                var primitives = new Array(this._struct.primitives.length);

                for (var _i4 = 0; _i4 < this._struct.primitives.length; ++_i4) {
                  var prim = this._struct.primitives[_i4];
                  var dstPrim = mesh._struct.primitives[_i4];
                  primitives[_i4] = {
                    primitiveMode: prim.primitiveMode,
                    vertexBundelIndices: prim.vertexBundelIndices
                  };

                  for (var _iterator3 = _createForOfIteratorHelperLoose(prim.vertexBundelIndices), _step3; !(_step3 = _iterator3()).done;) {
                    var bundleIdx = _step3.value;
                    vertBatchCount = Math.max(vertBatchCount, this._struct.vertexBundles[bundleIdx].view.count);
                  }

                  if (prim.indexView && dstPrim.indexView) {
                    idxCount = prim.indexView.count;
                    idxCount += dstPrim.indexView.count;
                    srcOffset = prim.indexView.offset;
                    dstOffset = dstPrim.indexView.offset;

                    if (idxCount < 256) {
                      idxStride = 1;
                    } else if (idxCount < 65536) {
                      idxStride = 2;
                    } else {
                      idxStride = 4;
                    }

                    var ib = new ArrayBuffer(idxCount * idxStride);

                    if (idxStride === 2) {
                      ibView = new Uint16Array(ib);
                    } else if (idxStride === 1) {
                      ibView = new Uint8Array(ib);
                    } else {
                      ibView = new Uint32Array(ib);
                    }

                    if (prim.indexView.stride === 2) {
                      srcIBView = new Uint16Array(this._data.buffer, srcOffset, prim.indexView.count);
                    } else if (prim.indexView.stride === 1) {
                      srcIBView = new Uint8Array(this._data.buffer, srcOffset, prim.indexView.count);
                    } else {
                      srcIBView = new Uint32Array(this._data.buffer, srcOffset, prim.indexView.count);
                    }

                    if (idxStride === prim.indexView.stride) {
                      ibView.set(srcIBView);
                    } else {
                      for (var n = 0; n < prim.indexView.count; ++n) {
                        ibView[n] = srcIBView[n];
                      }
                    }

                    srcOffset += prim.indexView.length;

                    if (dstPrim.indexView.stride === 2) {
                      dstIBView = new Uint16Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
                    } else if (dstPrim.indexView.stride === 1) {
                      dstIBView = new Uint8Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
                    } else {
                      dstIBView = new Uint32Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
                    }

                    for (var _n = 0; _n < dstPrim.indexView.count; ++_n) {
                      ibView[prim.indexView.count + _n] = vertBatchCount + dstIBView[_n];
                    }

                    dstOffset += dstPrim.indexView.length;
                    primitives[_i4].indexView = {
                      offset: bufferBlob.getLength(),
                      length: ib.byteLength,
                      count: idxCount,
                      stride: idxStride
                    };
                    bufferBlob.setNextAlignment(idxStride);
                    bufferBlob.addBuffer(ib);
                  }
                }

                var meshStruct = {
                  vertexBundles: vertexBundles,
                  primitives: primitives,
                  minPosition: this._struct.minPosition,
                  maxPosition: this._struct.maxPosition
                };

                if (meshStruct.minPosition && mesh._struct.minPosition && meshStruct.maxPosition && mesh._struct.maxPosition) {
                  if (worldMatrix) {
                    Vec3.add(boundingBox.center, mesh._struct.maxPosition, mesh._struct.minPosition);
                    Vec3.multiplyScalar(boundingBox.center, boundingBox.center, 0.5);
                    Vec3.subtract(boundingBox.halfExtents, mesh._struct.maxPosition, mesh._struct.minPosition);
                    Vec3.multiplyScalar(boundingBox.halfExtents, boundingBox.halfExtents, 0.5);
                    AABB.transform(boundingBox, boundingBox, worldMatrix);
                    Vec3.add(vec3_temp, boundingBox.center, boundingBox.halfExtents);
                    Vec3.max(meshStruct.maxPosition, meshStruct.maxPosition, vec3_temp);
                    Vec3.subtract(vec3_temp, boundingBox.center, boundingBox.halfExtents);
                    Vec3.min(meshStruct.minPosition, meshStruct.minPosition, vec3_temp);
                  } else {
                    Vec3.min(meshStruct.minPosition, meshStruct.minPosition, mesh._struct.minPosition);
                    Vec3.max(meshStruct.maxPosition, meshStruct.maxPosition, mesh._struct.maxPosition);
                  }
                }

                this.reset({
                  struct: meshStruct,
                  data: new Uint8Array(bufferBlob.getCombined())
                });
                this.initialize();
                return true;
              };

              _proto.validateMergingMesh = function validateMergingMesh(mesh) {
                if (this._struct.vertexBundles.length !== mesh._struct.vertexBundles.length) {
                  return false;
                }

                for (var i = 0; i < this._struct.vertexBundles.length; ++i) {
                  var bundle = this._struct.vertexBundles[i];
                  var dstBundle = mesh._struct.vertexBundles[i];

                  if (bundle.attributes.length !== dstBundle.attributes.length) {
                    return false;
                  }

                  for (var j = 0; j < bundle.attributes.length; ++j) {
                    if (bundle.attributes[j].format !== dstBundle.attributes[j].format) {
                      return false;
                    }
                  }
                }

                if (this._struct.primitives.length !== mesh._struct.primitives.length) {
                  return false;
                }

                for (var _i5 = 0; _i5 < this._struct.primitives.length; ++_i5) {
                  var prim = this._struct.primitives[_i5];
                  var dstPrim = mesh._struct.primitives[_i5];

                  if (prim.vertexBundelIndices.length !== dstPrim.vertexBundelIndices.length) {
                    return false;
                  }

                  for (var _j = 0; _j < prim.vertexBundelIndices.length; ++_j) {
                    if (prim.vertexBundelIndices[_j] !== dstPrim.vertexBundelIndices[_j]) {
                      return false;
                    }
                  }

                  if (prim.primitiveMode !== dstPrim.primitiveMode) {
                    return false;
                  }

                  if (prim.indexView) {
                    if (dstPrim.indexView === undefined) {
                      return false;
                    }
                  } else if (dstPrim.indexView) {
                    return false;
                  }
                }

                return true;
              };

              _proto.readAttribute = function readAttribute(primitiveIndex, attributeName) {
                var _this3 = this;

                var result = null;

                this._accessAttribute(primitiveIndex, attributeName, function (vertexBundle, iAttribute) {
                  var vertexCount = vertexBundle.view.count;
                  var format = vertexBundle.attributes[iAttribute].format;
                  var StorageConstructor = getTypedArrayConstructor(FormatInfos[format]);

                  if (vertexCount === 0) {
                    return;
                  }

                  var inputView = new DataView(_this3._data.buffer, vertexBundle.view.offset + getOffset(vertexBundle.attributes, iAttribute));
                  var formatInfo = FormatInfos[format];
                  var reader = getReader(inputView, format);

                  if (!StorageConstructor || !reader) {
                    return;
                  }

                  var componentCount = formatInfo.count;
                  var storage = new StorageConstructor(vertexCount * componentCount);
                  var inputStride = vertexBundle.view.stride;

                  for (var iVertex = 0; iVertex < vertexCount; ++iVertex) {
                    for (var iComponent = 0; iComponent < componentCount; ++iComponent) {
                      storage[componentCount * iVertex + iComponent] = reader(inputStride * iVertex + storage.BYTES_PER_ELEMENT * iComponent);
                    }
                  }

                  result = storage;
                });

                return result;
              };

              _proto.copyAttribute = function copyAttribute(primitiveIndex, attributeName, buffer, stride, offset) {
                var _this4 = this;

                var written = false;

                this._accessAttribute(primitiveIndex, attributeName, function (vertexBundle, iAttribute) {
                  var vertexCount = vertexBundle.view.count;

                  if (vertexCount === 0) {
                    written = true;
                    return;
                  }

                  var format = vertexBundle.attributes[iAttribute].format;
                  var inputView = new DataView(_this4._data.buffer, vertexBundle.view.offset + getOffset(vertexBundle.attributes, iAttribute));
                  var outputView = new DataView(buffer, offset);
                  var formatInfo = FormatInfos[format];
                  var reader = getReader(inputView, format);
                  var writer = getWriter(outputView, format);

                  if (!reader || !writer) {
                    return;
                  }

                  var componentCount = formatInfo.count;
                  var inputStride = vertexBundle.view.stride;
                  var inputComponentByteLength = getComponentByteLength(format);
                  var outputStride = stride;
                  var outputComponentByteLength = inputComponentByteLength;

                  for (var iVertex = 0; iVertex < vertexCount; ++iVertex) {
                    for (var iComponent = 0; iComponent < componentCount; ++iComponent) {
                      var inputOffset = inputStride * iVertex + inputComponentByteLength * iComponent;
                      var outputOffset = outputStride * iVertex + outputComponentByteLength * iComponent;
                      writer(outputOffset, reader(inputOffset));
                    }
                  }

                  written = true;
                });

                return written;
              };

              _proto.readIndices = function readIndices(primitiveIndex) {
                if (primitiveIndex >= this._struct.primitives.length) {
                  return null;
                }

                var primitive = this._struct.primitives[primitiveIndex];

                if (!primitive.indexView) {
                  return null;
                }

                var stride = primitive.indexView.stride;
                var Ctor = stride === 1 ? Uint8Array : stride === 2 ? Uint16Array : Uint32Array;
                return new Ctor(this._data.buffer, primitive.indexView.offset, primitive.indexView.count);
              };

              _proto.copyIndices = function copyIndices(primitiveIndex, outputArray) {
                if (primitiveIndex >= this._struct.primitives.length) {
                  return false;
                }

                var primitive = this._struct.primitives[primitiveIndex];

                if (!primitive.indexView) {
                  return false;
                }

                var indexCount = primitive.indexView.count;
                var indexFormat = primitive.indexView.stride === 1 ? Format.R8UI : primitive.indexView.stride === 2 ? Format.R16UI : Format.R32UI;
                var reader = getReader(new DataView(this._data.buffer), indexFormat);

                for (var i = 0; i < indexCount; ++i) {
                  outputArray[i] = reader(primitive.indexView.offset + FormatInfos[indexFormat].size * i);
                }

                return true;
              };

              _proto._accessAttribute = function _accessAttribute(primitiveIndex, attributeName, accessor) {
                if (primitiveIndex >= this._struct.primitives.length) {
                  return;
                }

                var primitive = this._struct.primitives[primitiveIndex];

                for (var _iterator4 = _createForOfIteratorHelperLoose(primitive.vertexBundelIndices), _step4; !(_step4 = _iterator4()).done;) {
                  var vertexBundleIndex = _step4.value;
                  var _vertexBundle2 = this._struct.vertexBundles[vertexBundleIndex];

                  var _iAttribute = _vertexBundle2.attributes.findIndex(function (a) {
                    return a.name === attributeName;
                  });

                  if (_iAttribute < 0) {
                    continue;
                  }

                  accessor(_vertexBundle2, _iAttribute);
                  break;
                }
              };

              _proto._createVertexBuffers = function _createVertexBuffers(gfxDevice, data) {
                var _this5 = this;

                return this._struct.vertexBundles.map(function (vertexBundle) {
                  var vertexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.VERTEX, MemoryUsageBit.DEVICE, vertexBundle.view.length, vertexBundle.view.stride));
                  var view = new Uint8Array(data, vertexBundle.view.offset, vertexBundle.view.length);

                  if (_this5.loaded) {
                    vertexBuffer.update(view);
                  } else {
                    _this5.once('load', function () {
                      vertexBuffer.update(view);
                    });
                  }

                  return vertexBuffer;
                });
              };

              _proto.initDefault = function initDefault(uuid) {
                _Asset.prototype.initDefault.call(this, uuid);

                this.reset({
                  struct: {
                    vertexBundles: [],
                    primitives: []
                  },
                  data: globalEmptyMeshBuffer
                });
              };

              _proto.validate = function validate() {
                return this.renderingSubMeshes.length > 0 && this.data.byteLength > 0;
              };

              _createClass(Mesh, [{
                key: "_nativeAsset",
                get: function get() {
                  return this._data.buffer;
                },
                set: function set(value) {
                  if (this._data.byteLength === value.byteLength) {
                    this._data.set(new Uint8Array(value));
                  } else {
                    this._data = new Uint8Array(value);
                  }

                  this.loaded = true;
                  this.emit('load');
                }
              }, {
                key: "subMeshCount",
                get: function get() {
                  var renderingMesh = this.renderingSubMeshes;
                  return renderingMesh ? renderingMesh.length : 0;
                }
              }, {
                key: "minPosition",
                get: function get() {
                  return this.struct.minPosition;
                }
              }, {
                key: "maxPosition",
                get: function get() {
                  return this.struct.maxPosition;
                }
              }, {
                key: "struct",
                get: function get() {
                  return this._struct;
                }
              }, {
                key: "data",
                get: function get() {
                  return this._data;
                }
              }, {
                key: "hash",
                get: function get() {
                  if (!this._hash) {
                    this._hash = murmurhash2_32_gc(this._data, 666);
                  }

                  return this._hash;
                }
              }, {
                key: "jointBufferIndices",
                get: function get() {
                  if (this._jointBufferIndices) {
                    return this._jointBufferIndices;
                  }

                  return this._jointBufferIndices = this._struct.primitives.map(function (p) {
                    return p.jointMapIndex || 0;
                  });
                }
              }, {
                key: "renderingSubMeshes",
                get: function get() {
                  this.initialize();
                  return this._renderingSubMeshes;
                }
              }]);

              return Mesh;
            }(Asset), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_struct", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return {
                  vertexBundles: [],
                  primitives: []
                };
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dataLength", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_hash", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            })), _class2)) || _class));
            legacyCC.Mesh = Mesh;

            function getOffset(attributes, attributeIndex) {
              var result = 0;

              for (var i = 0; i < attributeIndex; ++i) {
                var attribute = attributes[i];
                result += FormatInfos[attribute.format].size;
              }

              return result;
            }

            var isLittleEndian = sys.isLittleEndian;

            function getComponentByteLength(format) {
              var info = FormatInfos[format];
              return info.size / info.count;
            }

            function getReader(dataView, format) {
              var info = FormatInfos[format];
              var stride = info.size / info.count;

              switch (info.type) {
                case FormatType.UNORM:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset) {
                          return dataView.getUint8(offset);
                        };

                      case 2:
                        return function (offset) {
                          return dataView.getUint16(offset, isLittleEndian);
                        };

                      case 4:
                        return function (offset) {
                          return dataView.getUint32(offset, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.SNORM:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset) {
                          return dataView.getInt8(offset);
                        };

                      case 2:
                        return function (offset) {
                          return dataView.getInt16(offset, isLittleEndian);
                        };

                      case 4:
                        return function (offset) {
                          return dataView.getInt32(offset, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.INT:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset) {
                          return dataView.getInt8(offset);
                        };

                      case 2:
                        return function (offset) {
                          return dataView.getInt16(offset, isLittleEndian);
                        };

                      case 4:
                        return function (offset) {
                          return dataView.getInt32(offset, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.UINT:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset) {
                          return dataView.getUint8(offset);
                        };

                      case 2:
                        return function (offset) {
                          return dataView.getUint16(offset, isLittleEndian);
                        };

                      case 4:
                        return function (offset) {
                          return dataView.getUint32(offset, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.FLOAT:
                  {
                    return function (offset) {
                      return dataView.getFloat32(offset, isLittleEndian);
                    };
                  }
              }

              return null;
            }

            function getWriter(dataView, format) {
              var info = FormatInfos[format];
              var stride = info.size / info.count;

              switch (info.type) {
                case FormatType.UNORM:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset, value) {
                          return dataView.setUint8(offset, value);
                        };

                      case 2:
                        return function (offset, value) {
                          return dataView.setUint16(offset, value, isLittleEndian);
                        };

                      case 4:
                        return function (offset, value) {
                          return dataView.setUint32(offset, value, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.SNORM:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset, value) {
                          return dataView.setInt8(offset, value);
                        };

                      case 2:
                        return function (offset, value) {
                          return dataView.setInt16(offset, value, isLittleEndian);
                        };

                      case 4:
                        return function (offset, value) {
                          return dataView.setInt32(offset, value, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.INT:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset, value) {
                          return dataView.setInt8(offset, value);
                        };

                      case 2:
                        return function (offset, value) {
                          return dataView.setInt16(offset, value, isLittleEndian);
                        };

                      case 4:
                        return function (offset, value) {
                          return dataView.setInt32(offset, value, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.UINT:
                  {
                    switch (stride) {
                      case 1:
                        return function (offset, value) {
                          return dataView.setUint8(offset, value);
                        };

                      case 2:
                        return function (offset, value) {
                          return dataView.setUint16(offset, value, isLittleEndian);
                        };

                      case 4:
                        return function (offset, value) {
                          return dataView.setUint32(offset, value, isLittleEndian);
                        };
                    }

                    break;
                  }

                case FormatType.FLOAT:
                  {
                    return function (offset, value) {
                      return dataView.setFloat32(offset, value, isLittleEndian);
                    };
                  }
              }

              return null;
            }

        }
    };
});
