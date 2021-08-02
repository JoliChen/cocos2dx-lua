System.register("q-bundled:///fs/cocos/particle/models/line-model.js", ["../../core/assets/rendering-sub-mesh.js", "../../core/gfx/index.js", "../../core/math/index.js", "../../core/renderer/index.js"], function (_export, _context) {
  "use strict";

  var RenderingSubMesh, DRAW_INFO_SIZE, IndirectBuffer, Attribute, BufferInfo, DrawInfo, AttributeName, BufferUsageBit, Format, FormatInfos, MemoryUsageBit, PrimitiveMode, Vec3, scene, _vertex_attrs, _temp_v1, _temp_v2, LineModel;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreAssetsRenderingSubMeshJs) {
      RenderingSubMesh = _coreAssetsRenderingSubMeshJs.RenderingSubMesh;
    }, function (_coreGfxIndexJs) {
      DRAW_INFO_SIZE = _coreGfxIndexJs.DRAW_INFO_SIZE;
      IndirectBuffer = _coreGfxIndexJs.IndirectBuffer;
      Attribute = _coreGfxIndexJs.Attribute;
      BufferInfo = _coreGfxIndexJs.BufferInfo;
      DrawInfo = _coreGfxIndexJs.DrawInfo;
      AttributeName = _coreGfxIndexJs.AttributeName;
      BufferUsageBit = _coreGfxIndexJs.BufferUsageBit;
      Format = _coreGfxIndexJs.Format;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      MemoryUsageBit = _coreGfxIndexJs.MemoryUsageBit;
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreRendererIndexJs) {
      scene = _coreRendererIndexJs.scene;
    }],
    execute: function () {
      _vertex_attrs = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), // xyz:position
      new Attribute(AttributeName.ATTR_TEX_COORD, Format.RGBA32F), // x:index y:size zw:texcoord
      new Attribute(AttributeName.ATTR_TEX_COORD1, Format.RGB32F), // xyz:velocity
      new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8, true)];
      _temp_v1 = new Vec3();
      _temp_v2 = new Vec3();

      _export("LineModel", LineModel = /*#__PURE__*/function (_scene$Model) {
        _inheritsLoose(LineModel, _scene$Model);

        function LineModel() {
          var _this;

          _this = _scene$Model.call(this) || this;
          _this._capacity = void 0;
          _this._vertSize = 0;
          _this._vBuffer = null;
          _this._vertAttrsFloatCount = 0;
          _this._vdataF32 = null;
          _this._vdataUint32 = null;
          _this._iaInfo = void 0;
          _this._iaInfoBuffer = void 0;
          _this._subMeshData = null;
          _this._vertCount = 0;
          _this._indexCount = 0;
          _this._material = null;
          _this.type = scene.ModelType.LINE;
          _this._capacity = 100;
          _this._iaInfo = new IndirectBuffer([new DrawInfo()]);
          _this._iaInfoBuffer = _this._device.createBuffer(new BufferInfo(BufferUsageBit.INDIRECT, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, DRAW_INFO_SIZE, DRAW_INFO_SIZE));
          return _this;
        }

        var _proto = LineModel.prototype;

        _proto.setCapacity = function setCapacity(capacity) {
          this._capacity = capacity;
          this.createBuffer();
        };

        _proto.createBuffer = function createBuffer() {
          this._vertSize = 0;

          for (var _iterator = _createForOfIteratorHelperLoose(_vertex_attrs), _step; !(_step = _iterator()).done;) {
            var a = _step.value;
            a.offset = this._vertSize;
            this._vertSize += FormatInfos[a.format].size;
          }

          this._vertAttrsFloatCount = this._vertSize / 4; // number of float

          this._vBuffer = this.createSubMeshData();
          this._vdataF32 = new Float32Array(this._vBuffer);
          this._vdataUint32 = new Uint32Array(this._vBuffer);
        };

        _proto.updateMaterial = function updateMaterial(mat) {
          this._material = mat;

          _scene$Model.prototype.setSubModelMaterial.call(this, 0, mat);
        };

        _proto.createSubMeshData = function createSubMeshData() {
          if (this._subMeshData) {
            this.destroySubMeshData();
          }

          this._vertCount = 2;
          this._indexCount = 6;

          var vertexBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, this._vertSize * this._capacity * this._vertCount, this._vertSize));

          var vBuffer = new ArrayBuffer(this._vertSize * this._capacity * this._vertCount);
          vertexBuffer.update(vBuffer);
          var indices = new Uint16Array((this._capacity - 1) * this._indexCount);
          var dst = 0;

          for (var i = 0; i < this._capacity - 1; ++i) {
            var baseIdx = 2 * i;
            indices[dst++] = baseIdx;
            indices[dst++] = baseIdx + 1;
            indices[dst++] = baseIdx + 2;
            indices[dst++] = baseIdx + 3;
            indices[dst++] = baseIdx + 2;
            indices[dst++] = baseIdx + 1;
          }

          var indexBuffer = this._device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, (this._capacity - 1) * this._indexCount * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));

          indexBuffer.update(indices);
          this._iaInfo.drawInfos[0].vertexCount = this._capacity * this._vertCount;
          this._iaInfo.drawInfos[0].indexCount = (this._capacity - 1) * this._indexCount;

          this._iaInfoBuffer.update(this._iaInfo);

          this._subMeshData = new RenderingSubMesh([vertexBuffer], _vertex_attrs, PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
          this.initSubModel(0, this._subMeshData, this._material);
          return vBuffer;
        };

        _proto.addLineVertexData = function addLineVertexData(positions, width, color) {
          if (positions.length > 1) {
            var offset = 0;
            Vec3.subtract(_temp_v1, positions[1], positions[0]);
            this._vdataF32[offset++] = positions[0].x;
            this._vdataF32[offset++] = positions[0].y;
            this._vdataF32[offset++] = positions[0].z;
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = width.evaluate(0, 1);
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = _temp_v1.x;
            this._vdataF32[offset++] = _temp_v1.y;
            this._vdataF32[offset++] = _temp_v1.z;
            this._vdataUint32[offset++] = color.evaluate(0, 1)._val;
            this._vdataF32[offset++] = positions[0].x;
            this._vdataF32[offset++] = positions[0].y;
            this._vdataF32[offset++] = positions[0].z;
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = width.evaluate(0, 1);
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = _temp_v1.x;
            this._vdataF32[offset++] = _temp_v1.y;
            this._vdataF32[offset++] = _temp_v1.z;
            this._vdataUint32[offset++] = color.evaluate(0, 1)._val;

            for (var i = 1; i < positions.length - 1; i++) {
              Vec3.subtract(_temp_v1, positions[i - 1], positions[i]);
              Vec3.subtract(_temp_v2, positions[i + 1], positions[i]);
              Vec3.subtract(_temp_v2, _temp_v2, _temp_v1);
              var seg = i / positions.length;
              this._vdataF32[offset++] = positions[i].x;
              this._vdataF32[offset++] = positions[i].y;
              this._vdataF32[offset++] = positions[i].z;
              this._vdataF32[offset++] = 0;
              this._vdataF32[offset++] = width.evaluate(seg, 1);
              this._vdataF32[offset++] = seg;
              this._vdataF32[offset++] = 0;
              this._vdataF32[offset++] = _temp_v2.x;
              this._vdataF32[offset++] = _temp_v2.y;
              this._vdataF32[offset++] = _temp_v2.z;
              this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
              this._vdataF32[offset++] = positions[i].x;
              this._vdataF32[offset++] = positions[i].y;
              this._vdataF32[offset++] = positions[i].z;
              this._vdataF32[offset++] = 1;
              this._vdataF32[offset++] = width.evaluate(seg, 1);
              this._vdataF32[offset++] = seg;
              this._vdataF32[offset++] = 1;
              this._vdataF32[offset++] = _temp_v2.x;
              this._vdataF32[offset++] = _temp_v2.y;
              this._vdataF32[offset++] = _temp_v2.z;
              this._vdataUint32[offset++] = color.evaluate(seg, 1)._val;
            }

            Vec3.subtract(_temp_v1, positions[positions.length - 1], positions[positions.length - 2]);
            this._vdataF32[offset++] = positions[positions.length - 1].x;
            this._vdataF32[offset++] = positions[positions.length - 1].y;
            this._vdataF32[offset++] = positions[positions.length - 1].z;
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = width.evaluate(1, 1);
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = 0;
            this._vdataF32[offset++] = _temp_v1.x;
            this._vdataF32[offset++] = _temp_v1.y;
            this._vdataF32[offset++] = _temp_v1.z;
            this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
            this._vdataF32[offset++] = positions[positions.length - 1].x;
            this._vdataF32[offset++] = positions[positions.length - 1].y;
            this._vdataF32[offset++] = positions[positions.length - 1].z;
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = width.evaluate(1, 1);
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = 1;
            this._vdataF32[offset++] = _temp_v1.x;
            this._vdataF32[offset++] = _temp_v1.y;
            this._vdataF32[offset++] = _temp_v1.z;
            this._vdataUint32[offset++] = color.evaluate(1, 1)._val;
          }

          this.updateIA(Math.max(0, positions.length - 1));
        };

        _proto.updateIA = function updateIA(count) {
          var ia = this._subModels[0].inputAssembler;
          ia.vertexBuffers[0].update(this._vdataF32);
          this._iaInfo.drawInfos[0].firstIndex = 0;
          this._iaInfo.drawInfos[0].indexCount = this._indexCount * count;

          this._iaInfoBuffer.update(this._iaInfo);
        };

        _proto.destroySubMeshData = function destroySubMeshData() {
          if (this._subMeshData) {
            this._subMeshData.destroy();

            this._subMeshData = null;
          }
        };

        return LineModel;
      }(scene.Model));
    }
  };
});