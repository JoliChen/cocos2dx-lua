System.register("q-bundled:///fs/cocos/3d/misc/create-mesh.js", ["../assets/mesh.js", "../../core/gfx/index.js", "../../core/math/index.js", "./buffer.js", "./buffer-blob.js"], function (_export, _context) {
  "use strict";

  var Mesh, AttributeName, Format, FormatInfos, PrimitiveMode, Attribute, Vec3, writeBuffer, BufferBlob, _defAttrs, v3_1;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function createMesh(geometry, out, options) {
    options = options || {}; // Collect attributes and calculate length of result vertex buffer.

    var attributes = [];
    var stride = 0;
    var channels = [];
    var vertCount = 0;
    var attr;
    var positions = geometry.positions.slice();

    if (positions.length > 0) {
      attr = null;

      if (geometry.attributes) {
        for (var _iterator = _createForOfIteratorHelperLoose(geometry.attributes), _step; !(_step = _iterator()).done;) {
          var att = _step.value;

          if (att.name === AttributeName.ATTR_POSITION) {
            attr = att;
            break;
          }
        }
      }

      if (!attr) {
        attr = _defAttrs[0];
      }

      attributes.push(attr);
      var info = FormatInfos[attr.format];
      vertCount = Math.max(vertCount, Math.floor(positions.length / info.count));
      channels.push({
        offset: stride,
        data: positions,
        attribute: attr
      });
      stride += info.size;
    }

    if (geometry.normals && geometry.normals.length > 0) {
      attr = null;

      if (geometry.attributes) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(geometry.attributes), _step2; !(_step2 = _iterator2()).done;) {
          var _att = _step2.value;

          if (_att.name === AttributeName.ATTR_NORMAL) {
            attr = _att;
            break;
          }
        }
      }

      if (!attr) {
        attr = _defAttrs[1];
      }

      var _info = FormatInfos[attr.format];
      attributes.push(attr);
      vertCount = Math.max(vertCount, Math.floor(geometry.normals.length / _info.count));
      channels.push({
        offset: stride,
        data: geometry.normals,
        attribute: attr
      });
      stride += _info.size;
    }

    if (geometry.uvs && geometry.uvs.length > 0) {
      attr = null;

      if (geometry.attributes) {
        for (var _iterator3 = _createForOfIteratorHelperLoose(geometry.attributes), _step3; !(_step3 = _iterator3()).done;) {
          var _att2 = _step3.value;

          if (_att2.name === AttributeName.ATTR_TEX_COORD) {
            attr = _att2;
            break;
          }
        }
      }

      if (!attr) {
        attr = _defAttrs[2];
      }

      var _info2 = FormatInfos[attr.format];
      attributes.push(attr);
      vertCount = Math.max(vertCount, Math.floor(geometry.uvs.length / _info2.count));
      channels.push({
        offset: stride,
        data: geometry.uvs,
        attribute: attr
      });
      stride += _info2.size;
    }

    if (geometry.tangents && geometry.tangents.length > 0) {
      attr = null;

      if (geometry.attributes) {
        for (var _iterator4 = _createForOfIteratorHelperLoose(geometry.attributes), _step4; !(_step4 = _iterator4()).done;) {
          var _att3 = _step4.value;

          if (_att3.name === AttributeName.ATTR_TANGENT) {
            attr = _att3;
            break;
          }
        }
      }

      if (!attr) {
        attr = _defAttrs[3];
      }

      var _info3 = FormatInfos[attr.format];
      attributes.push(attr);
      vertCount = Math.max(vertCount, Math.floor(geometry.tangents.length / _info3.count));
      channels.push({
        offset: stride,
        data: geometry.tangents,
        attribute: attr
      });
      stride += _info3.size;
    }

    if (geometry.colors && geometry.colors.length > 0) {
      attr = null;

      if (geometry.attributes) {
        for (var _iterator5 = _createForOfIteratorHelperLoose(geometry.attributes), _step5; !(_step5 = _iterator5()).done;) {
          var _att4 = _step5.value;

          if (_att4.name === AttributeName.ATTR_COLOR) {
            attr = _att4;
            break;
          }
        }
      }

      if (!attr) {
        attr = _defAttrs[4];
      }

      var _info4 = FormatInfos[attr.format];
      attributes.push(attr);
      vertCount = Math.max(vertCount, Math.floor(geometry.colors.length / _info4.count));
      channels.push({
        offset: stride,
        data: geometry.colors,
        attribute: attr
      });
      stride += _info4.size;
    }

    if (geometry.customAttributes) {
      for (var _iterator6 = _createForOfIteratorHelperLoose(geometry.customAttributes), _step6; !(_step6 = _iterator6()).done;) {
        var ca = _step6.value;
        var _info5 = FormatInfos[ca.attr.format];
        attributes.push(ca.attr);
        vertCount = Math.max(vertCount, Math.floor(ca.values.length / _info5.count));
        channels.push({
          offset: stride,
          data: ca.values,
          attribute: ca.attr
        });
        stride += _info5.size;
      }
    } // Use this to generate final merged buffer.


    var bufferBlob = new BufferBlob(); // Fill vertex buffer.

    var vertexBuffer = new ArrayBuffer(vertCount * stride);
    var vertexBufferView = new DataView(vertexBuffer);

    for (var _i = 0, _channels = channels; _i < _channels.length; _i++) {
      var channel = _channels[_i];
      writeBuffer(vertexBufferView, channel.data, channel.attribute.format, channel.offset, stride);
    }

    bufferBlob.setNextAlignment(0);
    var vertexBundle = {
      attributes: attributes,
      view: {
        offset: bufferBlob.getLength(),
        length: vertexBuffer.byteLength,
        count: vertCount,
        stride: stride
      }
    };
    bufferBlob.addBuffer(vertexBuffer); // Fill index buffer.

    var indexBuffer = null;
    var idxCount = 0;
    var idxStride = 2;

    if (geometry.indices) {
      var indices = geometry.indices;
      idxCount = indices.length;
      indexBuffer = new ArrayBuffer(idxStride * idxCount);
      var indexBufferView = new DataView(indexBuffer);
      writeBuffer(indexBufferView, indices, Format.R16UI);
    } // Create primitive.


    var primitive = {
      primitiveMode: geometry.primitiveMode || PrimitiveMode.TRIANGLE_LIST,
      vertexBundelIndices: [0]
    };

    if (indexBuffer) {
      bufferBlob.setNextAlignment(idxStride);
      primitive.indexView = {
        offset: bufferBlob.getLength(),
        length: indexBuffer.byteLength,
        count: idxCount,
        stride: idxStride
      };
      bufferBlob.addBuffer(indexBuffer);
    }

    var minPosition = geometry.minPos;

    if (!minPosition && options.calculateBounds) {
      minPosition = Vec3.set(new Vec3(), Infinity, Infinity, Infinity);

      for (var iVertex = 0; iVertex < vertCount; ++iVertex) {
        Vec3.set(v3_1, positions[iVertex * 3 + 0], positions[iVertex * 3 + 1], positions[iVertex * 3 + 2]);
        Vec3.min(minPosition, minPosition, v3_1);
      }
    }

    var maxPosition = geometry.maxPos;

    if (!maxPosition && options.calculateBounds) {
      maxPosition = Vec3.set(new Vec3(), -Infinity, -Infinity, -Infinity);

      for (var _iVertex = 0; _iVertex < vertCount; ++_iVertex) {
        Vec3.set(v3_1, positions[_iVertex * 3 + 0], positions[_iVertex * 3 + 1], positions[_iVertex * 3 + 2]);
        Vec3.max(maxPosition, maxPosition, v3_1);
      }
    } // Create mesh struct.


    var meshStruct = {
      vertexBundles: [vertexBundle],
      primitives: [primitive]
    };

    if (minPosition) {
      meshStruct.minPosition = new Vec3(minPosition.x, minPosition.y, minPosition.z);
    }

    if (maxPosition) {
      meshStruct.maxPosition = new Vec3(maxPosition.x, maxPosition.y, maxPosition.z);
    } // Create mesh.


    if (!out) {
      out = new Mesh();
    }

    out.reset({
      struct: meshStruct,
      data: new Uint8Array(bufferBlob.getCombined())
    });
    return out;
  }

  _export("createMesh", createMesh);

  return {
    setters: [function (_assetsMeshJs) {
      Mesh = _assetsMeshJs.Mesh;
    }, function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      Format = _coreGfxIndexJs.Format;
      FormatInfos = _coreGfxIndexJs.FormatInfos;
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
      Attribute = _coreGfxIndexJs.Attribute;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_bufferJs) {
      writeBuffer = _bufferJs.writeBuffer;
    }, function (_bufferBlobJs) {
      BufferBlob = _bufferBlobJs.BufferBlob;
    }],
    execute: function () {
      _defAttrs = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F), new Attribute(AttributeName.ATTR_TANGENT, Format.RGBA32F), new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F)];
      v3_1 = new Vec3();
    }
  };
});