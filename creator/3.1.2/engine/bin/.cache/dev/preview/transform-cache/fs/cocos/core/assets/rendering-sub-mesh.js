System.register("q-bundled:///fs/cocos/core/assets/rendering-sub-mesh.js", ["../global-exports.js", "../../3d/misc/buffer.js", "../gfx/index.js", "../renderer/core/memory-pools.js", "../math/index.js"], function (_export, _context) {
  "use strict";

  var legacyCC, mapBuffer, Attribute, InputAssemblerInfo, BufferInfo, AttributeName, BufferUsageBit, Format, FormatInfos, MemoryUsageBit, FlatBufferArrayPool, FlatBufferPool, FlatBufferView, NULL_HANDLE, RawBufferPool, SubMeshPool, SubMeshView, freeHandleArray, Vec3, RenderingSubMesh;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_dMiscBufferJs) {
      mapBuffer = _dMiscBufferJs.mapBuffer;
    }, function (_gfxIndexJs) {
      Attribute = _gfxIndexJs.Attribute;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      BufferInfo = _gfxIndexJs.BufferInfo;
      AttributeName = _gfxIndexJs.AttributeName;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      FormatInfos = _gfxIndexJs.FormatInfos;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
    }, function (_rendererCoreMemoryPoolsJs) {
      FlatBufferArrayPool = _rendererCoreMemoryPoolsJs.FlatBufferArrayPool;
      FlatBufferPool = _rendererCoreMemoryPoolsJs.FlatBufferPool;
      FlatBufferView = _rendererCoreMemoryPoolsJs.FlatBufferView;
      NULL_HANDLE = _rendererCoreMemoryPoolsJs.NULL_HANDLE;
      RawBufferPool = _rendererCoreMemoryPoolsJs.RawBufferPool;
      SubMeshPool = _rendererCoreMemoryPoolsJs.SubMeshPool;
      SubMeshView = _rendererCoreMemoryPoolsJs.SubMeshView;
      freeHandleArray = _rendererCoreMemoryPoolsJs.freeHandleArray;
    }, function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }],
    execute: function () {
      /**
       * @en Sub mesh for rendering which contains all geometry data, it can be used to create [[InputAssembler]].
       * @zh 包含所有顶点数据的渲染子网格，可以用来创建 [[InputAssembler]]。
       */
      _export("RenderingSubMesh", RenderingSubMesh = /*#__PURE__*/function () {
        function RenderingSubMesh(vertexBuffers, attributes, primitiveMode, indexBuffer, indirectBuffer) {
          if (indexBuffer === void 0) {
            indexBuffer = null;
          }

          if (indirectBuffer === void 0) {
            indirectBuffer = null;
          }

          this.mesh = void 0;
          this.subMeshIdx = void 0;
          this._flatBuffers = [];
          this._jointMappedBuffers = void 0;
          this._jointMappedBufferIndices = void 0;
          this._vertexIdChannel = void 0;
          this._geometricInfo = void 0;
          this._vertexBuffers = void 0;
          this._attributes = void 0;
          this._indexBuffer = null;
          this._indirectBuffer = null;
          this._primitiveMode = void 0;
          this._iaInfo = void 0;
          this._handle = NULL_HANDLE;
          this._attributes = attributes;
          this._vertexBuffers = vertexBuffers;
          this._indexBuffer = indexBuffer;
          this._indirectBuffer = indirectBuffer;
          this._primitiveMode = primitiveMode;
          this._iaInfo = new InputAssemblerInfo(attributes, vertexBuffers, indexBuffer, indirectBuffer);
          this._handle = SubMeshPool.alloc();
          var fbArrayHandle = FlatBufferArrayPool.alloc();
          SubMeshPool.set(this._handle, SubMeshView.FLAT_BUFFER_ARRAY, fbArrayHandle);
        }
        /**
         * @en All vertex attributes used by the sub mesh
         * @zh 所有顶点属性。
         */


        var _proto = RenderingSubMesh.prototype;

        _proto.genFlatBuffers = function genFlatBuffers() {
          if (this._flatBuffers.length || !this.mesh || this.subMeshIdx === undefined) {
            return;
          }

          var mesh = this.mesh;
          var idxCount = 0;
          var prim = mesh.struct.primitives[this.subMeshIdx];
          var fbArrayHandle = SubMeshPool.get(this._handle, SubMeshView.FLAT_BUFFER_ARRAY);

          if (prim.indexView) {
            idxCount = prim.indexView.count;
          }

          for (var i = 0; i < prim.vertexBundelIndices.length; i++) {
            var bundleIdx = prim.vertexBundelIndices[i];
            var vertexBundle = mesh.struct.vertexBundles[bundleIdx];
            var vbCount = prim.indexView ? prim.indexView.count : vertexBundle.view.count;
            var vbStride = vertexBundle.view.stride;
            var vbSize = vbStride * vbCount;
            var view = new Uint8Array(mesh.data.buffer, vertexBundle.view.offset, vertexBundle.view.length);
            var hBuffer = RawBufferPool.alloc(prim.indexView ? vbSize : vertexBundle.view.length);
            var hFlatBuffer = FlatBufferPool.alloc();
            FlatBufferPool.set(hFlatBuffer, FlatBufferView.STRIDE, vbStride);
            FlatBufferPool.set(hFlatBuffer, FlatBufferView.AMOUNT, vbCount);
            FlatBufferPool.set(hFlatBuffer, FlatBufferView.BUFFER, hBuffer);
            FlatBufferArrayPool.push(fbArrayHandle, hFlatBuffer);
            var buffer = RawBufferPool.getBuffer(hBuffer);
            var sharedView = new Uint8Array(buffer);

            if (!prim.indexView) {
              sharedView.set(mesh.data.subarray(vertexBundle.view.offset, vertexBundle.view.offset + vertexBundle.view.length));

              this._flatBuffers.push({
                stride: vbStride,
                count: vbCount,
                buffer: sharedView
              });

              continue;
            }

            var ibView = mesh.readIndices(this.subMeshIdx); // transform to flat buffer

            for (var n = 0; n < idxCount; ++n) {
              var idx = ibView[n];
              var offset = n * vbStride;
              var srcOffset = idx * vbStride;

              for (var m = 0; m < vbStride; ++m) {
                sharedView[offset + m] = view[srcOffset + m];
              }
            }

            this._flatBuffers.push({
              stride: vbStride,
              count: vbCount,
              buffer: sharedView
            });
          }
        }
        /**
         * @en The vertex buffer for joint after mapping
         * @zh 骨骼索引按映射表处理后的顶点缓冲。
         */
        ;

        _proto.destroy = function destroy() {
          for (var i = 0; i < this.vertexBuffers.length; i++) {
            this.vertexBuffers[i].destroy();
          }

          this.vertexBuffers.length = 0;

          if (this._indexBuffer) {
            this._indexBuffer.destroy();

            this._indexBuffer = null;
          }

          if (this._jointMappedBuffers && this._jointMappedBufferIndices) {
            for (var _i = 0; _i < this._jointMappedBufferIndices.length; _i++) {
              this._jointMappedBuffers[this._jointMappedBufferIndices[_i]].destroy();
            }

            this._jointMappedBuffers = undefined;
            this._jointMappedBufferIndices = undefined;
          }

          if (this._indirectBuffer) {
            this._indirectBuffer.destroy();

            this._indirectBuffer = null;
          }

          if (this._handle) {
            var fbArrayHandle = SubMeshPool.get(this._handle, SubMeshView.FLAT_BUFFER_ARRAY);
            freeHandleArray(fbArrayHandle, FlatBufferArrayPool, FlatBufferPool);
            SubMeshPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        }
        /**
         * @en Adds a vertex attribute input called 'a_vertexId' into this sub-mesh.
         * This is useful if you want to simulate `gl_VertexId` in WebGL context prior to 2.0.
         * Once you call this function, the vertex attribute is permanently added.
         * Subsequent calls to this function take no effect.
         * @param device Device used to create related rendering resources.
         */
        ;

        _proto.enableVertexIdChannel = function enableVertexIdChannel(device) {
          if (this._vertexIdChannel) {
            return;
          }

          var streamIndex = this.vertexBuffers.length;
          var attributeIndex = this.attributes.length;

          var vertexIdBuffer = this._allocVertexIdBuffer(device);

          this._vertexBuffers.push(vertexIdBuffer);

          this._attributes.push(new Attribute('a_vertexId', Format.R32F, false, streamIndex));

          this._iaInfo.attributes = this._attributes;
          this._iaInfo.vertexBuffers = this._vertexBuffers;
          this._vertexIdChannel = {
            stream: streamIndex,
            index: attributeIndex
          };
        };

        _proto._allocVertexIdBuffer = function _allocVertexIdBuffer(device) {
          var vertexCount = this.vertexBuffers.length === 0 || this.vertexBuffers[0].stride === 0 ? 0 // TODO: This depends on how stride of a vertex buffer is defined; Consider padding problem.
          : this.vertexBuffers[0].size / this.vertexBuffers[0].stride;
          var vertexIds = new Float32Array(vertexCount);

          for (var iVertex = 0; iVertex < vertexCount; ++iVertex) {
            // `+0.5` because on some platforms, the "fetched integer" may have small error.
            // For example `26` may yield `25.99999`, which is convert to `25` instead of `26` using `int()`.
            vertexIds[iVertex] = iVertex + 0.5;
          }

          var vertexIdBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, vertexIds.byteLength, vertexIds.BYTES_PER_ELEMENT));
          vertexIdBuffer.update(vertexIds);
          return vertexIdBuffer;
        };

        _createClass(RenderingSubMesh, [{
          key: "attributes",
          get: function get() {
            return this._attributes;
          }
          /**
           * @en All vertex buffers used by the sub mesh
           * @zh 使用的所有顶点缓冲区。
           */

        }, {
          key: "vertexBuffers",
          get: function get() {
            return this._vertexBuffers;
          }
          /**
           * @en Index buffer used by the sub mesh
           * @zh 使用的索引缓冲区，若未使用则无需指定。
           */

        }, {
          key: "indexBuffer",
          get: function get() {
            return this._indexBuffer;
          }
          /**
           * @en Indirect buffer used by the sub mesh
           * @zh 间接绘制缓冲区。
           */

        }, {
          key: "indirectBuffer",
          get: function get() {
            return this._indirectBuffer;
          }
          /**
           * @en Primitive mode used by the sub mesh
           * @zh 图元类型。
           */

        }, {
          key: "primitiveMode",
          get: function get() {
            return this._primitiveMode;
          }
          /**
           * @en The geometric info of the sub mesh, used for raycast.
           * @zh （用于射线检测的）几何信息。
           */

        }, {
          key: "geometricInfo",
          get: function get() {
            if (this._geometricInfo) {
              return this._geometricInfo;
            }

            if (this.mesh === undefined) {
              return {
                positions: new Float32Array(),
                indices: new Uint8Array(),
                boundingBox: {
                  min: Vec3.ZERO,
                  max: Vec3.ZERO
                }
              };
            }

            if (this.subMeshIdx === undefined) {
              return {
                positions: new Float32Array(),
                indices: new Uint8Array(),
                boundingBox: {
                  min: Vec3.ZERO,
                  max: Vec3.ZERO
                }
              };
            }

            var mesh = this.mesh;
            var index = this.subMeshIdx;
            var positions = mesh.readAttribute(index, AttributeName.ATTR_POSITION);
            var indices = mesh.readIndices(index);
            var max = new Vec3();
            var min = new Vec3();
            var pAttri = this.attributes.find(function (element) {
              return element.name === AttributeName.ATTR_POSITION;
            });

            if (pAttri) {
              var conut = FormatInfos[pAttri.format].count;

              if (conut === 2) {
                max.set(positions[0], positions[1], 0);
                min.set(positions[0], positions[1], 0);
              } else {
                max.set(positions[0], positions[1], positions[2]);
                min.set(positions[0], positions[1], positions[2]);
              }

              for (var i = 0; i < positions.length; i += conut) {
                if (conut === 2) {
                  max.x = positions[i] > max.x ? positions[i] : max.x;
                  max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
                  min.x = positions[i] < min.x ? positions[i] : min.x;
                  min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
                } else {
                  max.x = positions[i] > max.x ? positions[i] : max.x;
                  max.y = positions[i + 1] > max.y ? positions[i + 1] : max.y;
                  max.z = positions[i + 2] > max.z ? positions[i + 2] : max.z;
                  min.x = positions[i] < min.x ? positions[i] : min.x;
                  min.y = positions[i + 1] < min.y ? positions[i + 1] : min.y;
                  min.z = positions[i + 2] < min.z ? positions[i + 2] : min.z;
                }
              }
            }

            this._geometricInfo = {
              positions: positions,
              indices: indices,
              boundingBox: {
                max: max,
                min: min
              }
            };
            return this._geometricInfo;
          }
          /**
           * @en Flatted vertex buffers
           * @zh 扁平化的顶点缓冲区。
           */

        }, {
          key: "flatBuffers",
          get: function get() {
            return this._flatBuffers;
          }
        }, {
          key: "jointMappedBuffers",
          get: function get() {
            var _this = this;

            if (this._jointMappedBuffers) {
              return this._jointMappedBuffers;
            }

            var buffers = this._jointMappedBuffers = [];
            var indices = this._jointMappedBufferIndices = [];

            if (!this.mesh || this.subMeshIdx === undefined) {
              return this._jointMappedBuffers = this.vertexBuffers;
            }

            var struct = this.mesh.struct;
            var prim = struct.primitives[this.subMeshIdx];

            if (!struct.jointMaps || prim.jointMapIndex === undefined || !struct.jointMaps[prim.jointMapIndex]) {
              return this._jointMappedBuffers = this.vertexBuffers;
            }

            var jointFormat;
            var jointOffset;
            var device = legacyCC.director.root.device;

            for (var i = 0; i < prim.vertexBundelIndices.length; i++) {
              var bundle = struct.vertexBundles[prim.vertexBundelIndices[i]];
              jointOffset = 0;
              jointFormat = Format.UNKNOWN;

              for (var j = 0; j < bundle.attributes.length; j++) {
                var attr = bundle.attributes[j];

                if (attr.name === AttributeName.ATTR_JOINTS) {
                  jointFormat = attr.format;
                  break;
                }

                jointOffset += FormatInfos[attr.format].size;
              }

              if (jointFormat) {
                (function () {
                  var data = new Uint8Array(_this.mesh.data.buffer, bundle.view.offset, bundle.view.length);
                  var dataView = new DataView(data.slice().buffer);
                  var idxMap = struct.jointMaps[prim.jointMapIndex];
                  mapBuffer(dataView, function (cur) {
                    return idxMap.indexOf(cur);
                  }, jointFormat, jointOffset, bundle.view.length, bundle.view.stride, dataView);
                  var buffer = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.DEVICE, bundle.view.length, bundle.view.stride));
                  buffer.update(dataView.buffer);
                  buffers.push(buffer);
                  indices.push(i);
                })();
              } else {
                buffers.push(this.vertexBuffers[prim.vertexBundelIndices[i]]);
              }
            }

            if (this._vertexIdChannel) {
              buffers.push(this._allocVertexIdBuffer(device));
            }

            return buffers;
          }
        }, {
          key: "iaInfo",
          get: function get() {
            return this._iaInfo;
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }]);

        return RenderingSubMesh;
      }());
    }
  };
});