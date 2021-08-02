System.register("q-bundled:///fs/cocos/particle/models/particle-batch-model.js", ["../../core/gfx/index.js", "../../core/math/color.js", "../../core/renderer/index.js", "../../core/assets/index.js"], function (_export, _context) {
  "use strict";

  var AttributeName, BufferUsageBit, FormatInfos, MemoryUsageBit, PrimitiveMode, DRAW_INFO_SIZE, IndirectBuffer, BufferInfo, DrawInfo, Color, scene, RenderingSubMesh, _uvs, ParticleBatchModel;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
      DRAW_INFO_SIZE = _coreGfxIndexJs.DRAW_INFO_SIZE;
      IndirectBuffer = _coreGfxIndexJs.IndirectBuffer;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      DrawInfo = _coreGfxIndexJs.DrawInfo;
    }, function (_coreMathColorJs) {
      Color = _coreMathColorJs.Color;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }, function (_coreAssetsIndexJs) {
      RenderingSubMesh = _coreAssetsIndexJs.RenderingSubMesh;
    }],
    execute: function () {
      _uvs = [0, 0, // bottom-left
      1, 0, // bottom-right
      0, 1, // top-left
      1, 1 // top-right
      ];

      _export("default", ParticleBatchModel = /*#__PURE__*/function (_scene$Model) {
        _inheritsLoose(ParticleBatchModel, _scene$Model);

        function ParticleBatchModel() {
          var _this;

          _this = _scene$Model.call(this) || this;
          _this._capacity = void 0;
          _this._vertAttrs = void 0;
          _this._vertSize = void 0;
          _this._vBuffer = void 0;
          _this._vertAttrsFloatCount = void 0;
          _this._vdataF32 = void 0;
          _this._vdataUint32 = void 0;
          _this._iaInfo = void 0;
          _this._iaInfoBuffer = void 0;
          _this._subMeshData = void 0;
          _this._mesh = void 0;
          _this._vertCount = 0;
          _this._indexCount = 0;
          _this._startTimeOffset = 0;
          _this._lifeTimeOffset = 0;
          _this._material = null;
          _this.type = scene.ModelType.PARTICLE_BATCH;
          _this._capacity = 0;
          _this._vertAttrs = null;
          _this._vertSize = 0;
          _this._vBuffer = null;
          _this._vertAttrsFloatCount = 0;
          _this._vdataF32 = null;
          _this._vdataUint32 = null;
          _this._iaInfo = new IndirectBuffer([new DrawInfo()]);
          _this._iaInfoBuffer = _this._device.createBuffer(new BufferInfo(BufferUsageBit.INDIRECT, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, DRAW_INFO_SIZE, DRAW_INFO_SIZE));
          _this._subMeshData = null;
          _this._mesh = null;
          return _this;
        }

        var _proto = ParticleBatchModel.prototype;

        _proto.setCapacity = function setCapacity(capacity) {
          var capChanged = this._capacity !== capacity;
          this._capacity = capacity;

          if (this._subMeshData && capChanged) {
            this.rebuild();
          }
        };

        _proto.setVertexAttributes = function setVertexAttributes(mesh, attrs) {
          if (this._mesh === mesh && this._vertAttrs === attrs) {
            return;
          }

          this._mesh = mesh;
          this._vertAttrs = attrs;
          this._vertSize = 0;

          for (var _iterator = _createForOfIteratorHelperLoose(this._vertAttrs), _step; !(_step = _iterator()).done;) {
            var a = _step.value;
            a.offset = this._vertSize;
            this._vertSize += FormatInfos[a.format].size;
          }

          this._vertAttrsFloatCount = this._vertSize / 4; // number of float
          // rebuid

          this.rebuild();
        };

        _proto.createSubMeshData = function createSubMeshData() {
          this.destroySubMeshData();
          this._vertCount = 4;
          this._indexCount = 6;

          if (this._mesh) {
            this._vertCount = this._mesh.struct.vertexBundles[this._mesh.struct.primitives[0].vertexBundelIndices[0]].view.count;
            this._indexCount = this._mesh.struct.primitives[0].indexView.count;
          }

          var vertexBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, this._vertSize * this._capacity * this._vertCount, this._vertSize));

          var vBuffer = new ArrayBuffer(this._vertSize * this._capacity * this._vertCount);

          if (this._mesh) {
            var vOffset = this._vertAttrs[this._vertAttrs.findIndex(function (val) {
              return val.name === AttributeName.ATTR_TEX_COORD;
            })].offset;

            this._mesh.copyAttribute(0, AttributeName.ATTR_TEX_COORD, vBuffer, this._vertSize, vOffset); // copy mesh uv to ATTR_TEX_COORD


            var vIdx = this._vertAttrs.findIndex(function (val) {
              return val.name === AttributeName.ATTR_TEX_COORD3;
            });

            vOffset = this._vertAttrs[vIdx++].offset;

            this._mesh.copyAttribute(0, AttributeName.ATTR_POSITION, vBuffer, this._vertSize, vOffset); // copy mesh position to ATTR_TEX_COORD3


            vOffset = this._vertAttrs[vIdx++].offset;

            this._mesh.copyAttribute(0, AttributeName.ATTR_NORMAL, vBuffer, this._vertSize, vOffset); // copy mesh normal to ATTR_NORMAL


            vOffset = this._vertAttrs[vIdx++].offset;

            if (!this._mesh.copyAttribute(0, AttributeName.ATTR_COLOR, vBuffer, this._vertSize, vOffset)) {
              // copy mesh color to ATTR_COLOR1
              var vb = new Uint32Array(vBuffer);

              for (var iVertex = 0; iVertex < this._vertCount; ++iVertex) {
                vb[iVertex * this._vertAttrsFloatCount + vOffset / 4] = Color.WHITE._val;
              }
            }

            var vbFloatArray = new Float32Array(vBuffer);

            for (var i = 1; i < this._capacity; i++) {
              vbFloatArray.copyWithin(i * this._vertSize * this._vertCount / 4, 0, this._vertSize * this._vertCount / 4);
            }
          }

          vertexBuffer.update(vBuffer);
          var indices = new Uint16Array(this._capacity * this._indexCount);

          if (this._mesh) {
            this._mesh.copyIndices(0, indices);

            for (var _i = 1; _i < this._capacity; _i++) {
              for (var j = 0; j < this._indexCount; j++) {
                indices[_i * this._indexCount + j] = indices[j] + _i * this._vertCount;
              }
            }
          } else {
            var dst = 0;

            for (var _i2 = 0; _i2 < this._capacity; ++_i2) {
              var baseIdx = 4 * _i2;
              indices[dst++] = baseIdx;
              indices[dst++] = baseIdx + 1;
              indices[dst++] = baseIdx + 2;
              indices[dst++] = baseIdx + 3;
              indices[dst++] = baseIdx + 2;
              indices[dst++] = baseIdx + 1;
            }
          }

          var indexBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, this._capacity * this._indexCount * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));

          indexBuffer.update(indices);
          this._iaInfo.drawInfos[0].vertexCount = this._capacity * this._vertCount;
          this._iaInfo.drawInfos[0].indexCount = this._capacity * this._indexCount;

          if (!this._iaInfoBuffer) {
            this._iaInfoBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.INDIRECT, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, DRAW_INFO_SIZE, DRAW_INFO_SIZE));
          }

          this._iaInfoBuffer.update(this._iaInfo);

          this._subMeshData = new RenderingSubMesh([vertexBuffer], this._vertAttrs, PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
          this.initSubModel(0, this._subMeshData, this._material);
          return vBuffer;
        };

        _proto.updateMaterial = function updateMaterial(mat) {
          this._material = mat;
          this.setSubModelMaterial(0, mat);
        };

        _proto.addParticleVertexData = function addParticleVertexData(index, pvdata) {
          if (!this._mesh) {
            var offset = index * this._vertAttrsFloatCount;
            this._vdataF32[offset++] = pvdata[0].x; // position

            this._vdataF32[offset++] = pvdata[0].y;
            this._vdataF32[offset++] = pvdata[0].z;
            this._vdataF32[offset++] = pvdata[1].x; // uv

            this._vdataF32[offset++] = pvdata[1].y;
            this._vdataF32[offset++] = pvdata[1].z; // frame idx

            this._vdataF32[offset++] = pvdata[2].x; // size

            this._vdataF32[offset++] = pvdata[2].y;
            this._vdataF32[offset++] = pvdata[2].z;
            this._vdataF32[offset++] = pvdata[3].x; // rotation

            this._vdataF32[offset++] = pvdata[3].y;
            this._vdataF32[offset++] = pvdata[3].z;
            this._vdataUint32[offset++] = pvdata[4]; // color

            if (pvdata[5]) {
              this._vdataF32[offset++] = pvdata[5].x; // velocity

              this._vdataF32[offset++] = pvdata[5].y;
              this._vdataF32[offset++] = pvdata[5].z;
            }
          } else {
            for (var i = 0; i < this._vertCount; i++) {
              var _offset = (index * this._vertCount + i) * this._vertAttrsFloatCount;

              this._vdataF32[_offset++] = pvdata[0].x; // position

              this._vdataF32[_offset++] = pvdata[0].y;
              this._vdataF32[_offset++] = pvdata[0].z;
              _offset += 2; // this._vdataF32![offset++] = index;
              // this._vdataF32![offset++] = pvdata[1].y;

              this._vdataF32[_offset++] = pvdata[1].z; // frame idx

              this._vdataF32[_offset++] = pvdata[2].x; // size

              this._vdataF32[_offset++] = pvdata[2].y;
              this._vdataF32[_offset++] = pvdata[2].z;
              this._vdataF32[_offset++] = pvdata[3].x; // rotation

              this._vdataF32[_offset++] = pvdata[3].y;
              this._vdataF32[_offset++] = pvdata[3].z;
              this._vdataUint32[_offset++] = pvdata[4]; // color
            }
          }
        };

        _proto.addGPUParticleVertexData = function addGPUParticleVertexData(p, num, time) {
          var offset = num * this._vertAttrsFloatCount * this._vertCount;

          for (var i = 0; i < this._vertCount; i++) {
            var idx = offset;
            this._vdataF32[idx++] = p.position.x;
            this._vdataF32[idx++] = p.position.y;
            this._vdataF32[idx++] = p.position.z;
            this._vdataF32[idx++] = time;
            this._vdataF32[idx++] = p.startSize.x;
            this._vdataF32[idx++] = p.startSize.y;
            this._vdataF32[idx++] = p.startSize.z;
            this._vdataF32[idx++] = _uvs[2 * i];
            this._vdataF32[idx++] = p.rotation.x;
            this._vdataF32[idx++] = p.rotation.y;
            this._vdataF32[idx++] = p.rotation.z;
            this._vdataF32[idx++] = _uvs[2 * i + 1];
            this._vdataF32[idx++] = p.startColor.r / 255.0;
            this._vdataF32[idx++] = p.startColor.g / 255.0;
            this._vdataF32[idx++] = p.startColor.b / 255.0;
            this._vdataF32[idx++] = p.startColor.a / 255.0;
            this._vdataF32[idx++] = p.velocity.x;
            this._vdataF32[idx++] = p.velocity.y;
            this._vdataF32[idx++] = p.velocity.z;
            this._vdataF32[idx++] = p.startLifetime;
            this._vdataF32[idx++] = p.randomSeed;
            offset += this._vertAttrsFloatCount;
          }
        };

        _proto.updateGPUParticles = function updateGPUParticles(num, time, dt) {
          var pSize = this._vertAttrsFloatCount * this._vertCount;
          var pBaseIndex = 0;
          var startTime = 0;
          var lifeTime = 0;
          var lastBaseIndex = 0;
          var interval = 0;

          for (var i = 0; i < num; ++i) {
            pBaseIndex = i * pSize;
            startTime = this._vdataF32[pBaseIndex + this._startTimeOffset];
            lifeTime = this._vdataF32[pBaseIndex + this._lifeTimeOffset];
            interval = time - startTime;

            if (lifeTime - interval < dt) {
              lastBaseIndex = --num * pSize;

              this._vdataF32.copyWithin(pBaseIndex, lastBaseIndex, lastBaseIndex + pSize);

              i--;
            }
          }

          return num;
        };

        _proto.constructAttributeIndex = function constructAttributeIndex() {
          if (!this._vertAttrs) {
            return;
          }

          var vIdx = this._vertAttrs.findIndex(function (val) {
            return val.name === 'a_position_starttime';
          });

          var vOffset = this._vertAttrs[vIdx].offset;
          this._startTimeOffset = vOffset / 4 + 3;
          vIdx = this._vertAttrs.findIndex(function (val) {
            return val.name === 'a_dir_life';
          });
          vOffset = this._vertAttrs[vIdx].offset;
          this._lifeTimeOffset = vOffset / 4 + 3;
        };

        _proto.updateIA = function updateIA(count) {
          var ia = this._subModels[0].inputAssembler;
          ia.vertexBuffers[0].update(this._vdataF32);
          this._iaInfo.drawInfos[0].firstIndex = 0;
          this._iaInfo.drawInfos[0].indexCount = this._indexCount * count;

          this._iaInfoBuffer.update(this._iaInfo);
        };

        _proto.clear = function clear() {
          this._subModels[0].inputAssembler.indexCount = 0;
        };

        _proto.destroy = function destroy() {
          _scene$Model.prototype.destroy.call(this);

          this._vBuffer = null;
          this._vdataF32 = null;
          this.destroySubMeshData();

          if (this._iaInfoBuffer) {
            this._iaInfoBuffer.destroy();

            this._iaInfoBuffer = null;
          }
        };

        _proto.rebuild = function rebuild() {
          this._vBuffer = this.createSubMeshData();
          this._vdataF32 = new Float32Array(this._vBuffer);
          this._vdataUint32 = new Uint32Array(this._vBuffer);
        };

        _proto.destroySubMeshData = function destroySubMeshData() {
          if (this._subMeshData) {
            this._subMeshData.destroy();

            this._subMeshData = null;
            this._iaInfoBuffer = null;
          }
        };

        return ParticleBatchModel;
      }(scene.Model));
    }
  };
});