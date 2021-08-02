System.register("q-bundled:///fs/cocos/3d/assets/mesh.js", ["../../core/data/decorators/index.js", "../../core/assets/asset.js", "../misc/buffer-blob.js", "../../core/geometry/index.js", "../../core/global-exports.js", "../../core/utils/murmurhash2_gc.js", "../../core/platform/sys.js", "../../core/platform/debug.js", "../../core/assets/index.js", "../../core/gfx/index.js", "../../core/math/index.js", "./morph.js"], function (_export, _context) {
  "use strict";

  var ccclass, serializable, Asset, BufferBlob, AABB, legacyCC, murmurhash2_32_gc, sys, warnID, RenderingSubMesh, Attribute, BufferInfo, AttributeName, BufferUsageBit, Feature, Format, FormatInfos, FormatType, MemoryUsageBit, getTypedArrayConstructor, Quat, Vec3, createMorphRendering, _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, v3_1, v3_2, globalEmptyMeshBuffer, Mesh, isLittleEndian;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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

  function getOffset(attributes, attributeIndex) {
    var result = 0;

    for (var i = 0; i < attributeIndex; ++i) {
      var attribute = attributes[i];
      result += FormatInfos[attribute.format].size;
    }

    return result;
  }

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

            default:
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

            default:
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

            default:
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

            default:
          }

          break;
        }

      case FormatType.FLOAT:
        {
          return function (offset) {
            return dataView.getFloat32(offset, isLittleEndian);
          };
        }

      default:
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

            default:
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

            default:
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

            default:
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

            default:
          }

          break;
        }

      case FormatType.FLOAT:
        {
          return function (offset, value) {
            return dataView.setFloat32(offset, value, isLittleEndian);
          };
        }

      default:
    }

    return null;
  } // function get


  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_coreAssetsAssetJs) {
      Asset = _coreAssetsAssetJs.Asset;
    }, function (_miscBufferBlobJs) {
      BufferBlob = _miscBufferBlobJs.BufferBlob;
    }, function (_coreGeometryIndexJs) {
      AABB = _coreGeometryIndexJs.AABB;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreUtilsMurmurhash2_gcJs) {
      murmurhash2_32_gc = _coreUtilsMurmurhash2_gcJs.murmurhash2_32_gc;
    }, function (_corePlatformSysJs) {
      sys = _corePlatformSysJs.sys;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
    }, function (_coreAssetsIndexJs) {
      RenderingSubMesh = _coreAssetsIndexJs.RenderingSubMesh;
    }, function (_coreGfxIndexJs) {
      Attribute = _coreGfxIndexJs.Attribute;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      AttributeName = _coreGfxIndexJs.AttributeName;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      Feature = _coreGfxIndexJs.Feature;
      Format = _coreGfxIndexJs.Format;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      FormatType = _coreGfxIndexJs.FormatType;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      getTypedArrayConstructor = _coreGfxIndexJs.getTypedArrayConstructor;
    }, function (_coreMathIndexJs) {
      Quat = _coreMathIndexJs.Quat;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_morphJs) {
      createMorphRendering = _morphJs.createMorphRendering;
    }],
    execute: function () {
      v3_1 = new Vec3();
      v3_2 = new Vec3();
      globalEmptyMeshBuffer = new Uint8Array();
      /**
       * @en Mesh asset
       * @zh 网格资源。
       */

      _export("Mesh", Mesh = (_dec = ccclass('cc.Mesh'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Asset) {
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
            // In the case of deferred loading, `this._data` is created before
            // the actual binary buffer is loaded.
            this._data = new Uint8Array(this._dataLength);
            legacyCC.assetManager.postLoadNative(this);
          }

          var buffer = this._data.buffer;
          var gfxDevice = legacyCC.director.root.device;

          var vertexBuffers = this._createVertexBuffers(gfxDevice, buffer);

          var indexBuffers = [];
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
                  return "continue"; // Ignore this primitive
                } else {
                  dstStride >>= 1; // Reduce to short.

                  dstSize >>= 1;
                }
              }

              indexBuffer = gfxDevice.createBuffer(new BufferInfo(BufferUsageBit.INDEX, MemoryUsageBit.DEVICE, dstSize, dstStride));
              indexBuffers.push(indexBuffer);
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
        }
        /**
         * @en Destroy the mesh and release all related GPU resources
         * @zh 销毁此网格，并释放它占有的所有 GPU 资源。
         */
        ;

        _proto.destroy = function destroy() {
          this.destroyRenderingMesh();
          return _Asset.prototype.destroy.call(this);
        }
        /**
         * @en Release all related GPU resources
         * @zh 释放此网格占有的所有 GPU 资源。
         */
        ;

        _proto.destroyRenderingMesh = function destroyRenderingMesh() {
          if (this._renderingSubMeshes) {
            for (var i = 0; i < this._renderingSubMeshes.length; i++) {
              this._renderingSubMeshes[i].destroy();
            }

            this._renderingSubMeshes = null;
            this._initialized = false;
          }
        }
        /**
         * @en Reset the struct and data of the mesh
         * @zh 重置此网格的结构和数据。
         * @param struct The new struct
         * @param data The new data
         * @deprecated Will be removed in v3.0.0, please use [[reset]] instead
         */
        ;

        _proto.assign = function assign(struct, data) {
          this.reset({
            struct: struct,
            data: data
          });
        }
        /**
         * @en Reset the mesh with mesh creation information
         * @zh 重置此网格。
         * @param info Mesh creation information including struct and data
         */
        ;

        _proto.reset = function reset(info) {
          this.destroyRenderingMesh();
          this._struct = info.struct;
          this._data = info.data;
          this._dataLength = this.data.byteLength;
          this._hash = 0;
          this.loaded = true;
          this.emit('load');
        }
        /**
         * @en Get [[AABB]] bounds in the skeleton's bone space
         * @zh 获取骨骼变换空间内下的 [[AABB]] 包围盒
         * @param skeleton
         */
        ;

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
        }
        /**
         * @en Merge the given mesh into the current mesh
         * @zh 合并指定的网格到此网格中。
         * @param mesh The mesh to be merged
         * @param worldMatrix The world matrix of the given mesh
         * @param [validate=false] Whether to validate the mesh
         * @returns Check the mesh state and return the validation result.
         */
        ;

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

                        default:
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
          } // merge buffer


          var bufferBlob = new BufferBlob(); // merge vertex buffer

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

                      default:
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
          } // merge index buffer


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
                // Uint32
                ibView = new Uint32Array(ib);
              } // merge src indices


              if (prim.indexView.stride === 2) {
                srcIBView = new Uint16Array(this._data.buffer, srcOffset, prim.indexView.count);
              } else if (prim.indexView.stride === 1) {
                srcIBView = new Uint8Array(this._data.buffer, srcOffset, prim.indexView.count);
              } else {
                // Uint32
                srcIBView = new Uint32Array(this._data.buffer, srcOffset, prim.indexView.count);
              }

              if (idxStride === prim.indexView.stride) {
                ibView.set(srcIBView);
              } else {
                for (var n = 0; n < prim.indexView.count; ++n) {
                  ibView[n] = srcIBView[n];
                }
              }

              srcOffset += prim.indexView.length; // merge dst indices

              if (dstPrim.indexView.stride === 2) {
                dstIBView = new Uint16Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
              } else if (dstPrim.indexView.stride === 1) {
                dstIBView = new Uint8Array(mesh._data.buffer, dstOffset, dstPrim.indexView.count);
              } else {
                // Uint32
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
          } // Create mesh struct.


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
          } // Create mesh.


          this.reset({
            struct: meshStruct,
            data: new Uint8Array(bufferBlob.getCombined())
          });
          this.initialize();
          return true;
        }
        /**
         * @en Validation for whether the given mesh can be merged into the current mesh.
         * To pass the validation, it must satisfy either of these two requirements:
         * - When the current mesh have no data
         * - When the two mesh have the same vertex bundle count, the same sub meshes count, and the same sub mesh layout.
         *
         * Same mesh layout means:
         * - They have the same primitive type and reference to the same amount vertex bundle with the same indices.
         * - And they all have or don't have index view
         * @zh 验证指定网格是否可以合并至当前网格。
         *
         * 当满足以下条件之一时，指定网格可以合并至当前网格：
         *  - 当前网格无数据而待合并网格有数据；
         *  - 它们的顶点块数目相同且对应顶点块的布局一致，并且它们的子网格数目相同且对应子网格的布局一致。
         *
         * 两个顶点块布局一致当且仅当：
         *  - 它们具有相同数量的顶点属性且对应的顶点属性具有相同的属性格式。
         *
         * 两个子网格布局一致，当且仅当：
         *  - 它们具有相同的图元类型并且引用相同数量、相同索引的顶点块；并且，
         *  - 要么都需要索引绘制，要么都不需要索引绘制。
         * @param mesh The other mesh to be validated
         */
        ;

        _proto.validateMergingMesh = function validateMergingMesh(mesh) {
          // validate vertex bundles
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
          } // validate primitives


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
        }
        /**
         * @en Read the requested attribute of the given sub mesh
         * @zh 读取子网格的指定属性。
         * @param primitiveIndex Sub mesh index
         * @param attributeName Attribute name
         * @returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all data of the attribute,
         * the array type will match the data type of the attribute.
         */
        ;

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
        }
        /**
         * @en Read the requested attribute of the given sub mesh and fill into the given buffer.
         * @zh 读取子网格的指定属性到目标缓冲区中。
         * @param primitiveIndex Sub mesh index
         * @param attributeName Attribute name
         * @param buffer The target array buffer
         * @param stride Byte distance between two attributes in the target buffer
         * @param offset The offset of the first attribute in the target buffer
         * @returns Return false if failed to access attribute, return true otherwise.
         */
        ;

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
        }
        /**
         * @en Read the indices data of the given sub mesh
         * @zh 读取子网格的索引数据。
         * @param primitiveIndex Sub mesh index
         * @returns Return null if not found or can't read, otherwise, will create a large enough typed array to contain all indices data,
         * the array type will use the corresponding stride size.
         */
        ;

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
        }
        /**
         * @en Read the indices data of the given sub mesh and fill into the given array
         * @zh 读取子网格的索引数据到目标数组中。
         * @param primitiveIndex Sub mesh index
         * @param outputArray The target output array
         * @returns Return false if failed to access the indices data, return true otherwise.
         */
        ;

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
          /**
           * @en The sub meshes count of the mesh.
           * @zh 此网格的子网格数量。
           * @deprecated Please use [[renderingSubMeshes.length]] instead
           */

        }, {
          key: "subMeshCount",
          get: function get() {
            var renderingMesh = this.renderingSubMeshes;
            return renderingMesh ? renderingMesh.length : 0;
          }
          /**
           * @en The minimum position of all vertices in the mesh
           * @zh （各分量都）小于等于此网格任何顶点位置的最大位置。
           * @deprecated Please use [[struct.minPosition]] instead
           */

        }, {
          key: "minPosition",
          get: function get() {
            return this.struct.minPosition;
          }
          /**
           * @en The maximum position of all vertices in the mesh
           * @zh （各分量都）大于等于此网格任何顶点位置的最大位置。
           * @deprecated Please use [[struct.maxPosition]] instead
           */

        }, {
          key: "maxPosition",
          get: function get() {
            return this.struct.maxPosition;
          }
          /**
           * @en The struct of the mesh
           * @zh 此网格的结构。
           */

        }, {
          key: "struct",
          get: function get() {
            return this._struct;
          }
          /**
           * @en The actual data of the mesh
           * @zh 此网格的数据。
           */

        }, {
          key: "data",
          get: function get() {
            return this._data;
          }
          /**
           * @en The hash of the mesh
           * @zh 此网格的哈希值。
           */

        }, {
          key: "hash",
          get: function get() {
            // hashes should already be computed offline, but if not, make one
            if (!this._hash) {
              this._hash = murmurhash2_32_gc(this._data, 666);
            }

            return this._hash;
          }
          /**
           * The index of the joint buffer of all sub meshes in the joint map buffers
           */

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
          /**
           * @en The sub meshes for rendering. Mesh could be split into different sub meshes for rendering.
           * @zh 此网格创建的渲染网格。
           */

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
      isLittleEndian = sys.isLittleEndian;
    }
  };
});