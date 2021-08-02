System.register("q-bundled:///fs/cocos/dragon-bones/assembler/simple.js", ["../../core/index.js", "../../core/gfx/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var Color, Mat4, Vec3, BlendFactor, legacyCC, NEED_COLOR, NEED_BATCH, STRIDE_FLOAT, STRIDE_BYTES, _boneColor, _slotColor, _originColor, _nodeR, _nodeG, _nodeB, _nodeA, _premultipliedAlpha, _multiply, _mustFlush, _buffer, _node, _batcher, _comp, _vfOffset, _indexOffset, _vertexOffset, _vertexCount, _indexCount, _x, _y, _c, _handleVal, _m00, _m04, _m12, _m01, _m05, _m13, _vec3u_temp, simple;

  function _getSlotMaterial(tex, blendMode) {
    if (!tex) return null;
    var src;
    var dst;

    switch (blendMode) {
      case 1:
        // additive
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE;
        break;

      case 10:
        // multiply
        src = BlendFactor.DST_COLOR;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;

      case 12:
        // screen
        src = BlendFactor.ONE;
        dst = BlendFactor.ONE_MINUS_SRC_COLOR;
        break;

      case 0: // normal

      default:
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;
    } // const useModel = !_comp!.enableBatch;


    _comp.setBlendHash();

    return _comp.getMaterialForBlend(src, dst);
  }

  function _handleColor(color, parentOpacity) {
    var _a = color.a * parentOpacity * _nodeA;

    var _multiply = _premultipliedAlpha ? _a / 255.0 : 1.0;

    var _r = color.r * _nodeR * _multiply / 255.0;

    var _g = color.g * _nodeG * _multiply / 255.0;

    var _b = color.b * _nodeB * _multiply / 255.0;

    _c[0] = _r;
    _c[1] = _g;
    _c[2] = _b;
    _c[3] = _premultipliedAlpha ? 1.0 : _a / 255.0;
  }

  function _intToColor(v) {
    _c[0] = (0xFF & v >>> 24) / 255.0;
    _c[1] = (0xFF & v >>> 16) / 255.0;
    _c[2] = (0xFF & v >>> 8) / 255.0;
    _c[3] = (0xFF & v >>> 0) / 255.0;
  }
  /**
   * simple 组装器
   * 可通过 `UI.simple` 获取该组装器。
   */


  function realTimeTraverse(armature, parentMat, parentOpacity) {
    var slots = armature._slots;
    var vbuf;
    var ibuf;
    var material;
    var vertices;
    var indices;
    var slotColor;
    var slot;
    var slotMat = new Mat4();

    for (var i = 0, l = slots.length; i < l; i++) {
      slot = slots[i];
      slotColor = slot._color;
      if (!slot._visible || !slot._displayData) continue;

      if (parentMat) {
        /* enable batch or recursive armature */
        slot._mulMat(slot._worldMatrix, parentMat, slot._matrix);
      } else {
        Mat4.copy(slot._worldMatrix, slot._matrix);
      }

      if (slot.childArmature) {
        realTimeTraverse(slot.childArmature, slot._worldMatrix, parentOpacity * slotColor.a / 255);
        continue;
      }

      material = _getSlotMaterial(slot.getTexture(), slot._blendMode);

      if (!material) {
        continue;
      }

      if (!_buffer.renderData.material) {
        _buffer.renderData.material = material;
      }

      if (!_buffer.texture) {
        _buffer.texture = slot.getTexture();
      }

      if (_mustFlush || material !== _buffer.renderData.material || _buffer.texture !== slot.getTexture()) {
        _mustFlush = false;
        _buffer = _comp.requestMeshRenderData();
        _buffer.renderData.material = material;
        _buffer.texture = slot.getTexture();
      }

      _handleColor(slotColor, parentOpacity);

      slotMat.set(slot._worldMatrix);
      vertices = slot._localVertices;
      _vertexCount = vertices.length >> 2;
      indices = slot._indices;
      _indexCount = indices.length;
      var rd = _buffer.renderData;
      rd.reserve(_vertexCount, _indexCount);
      _indexOffset = rd.indicesCount;
      _vfOffset = rd.vDataOffset;
      _vertexOffset = rd.vertexCount;
      vbuf = _buffer.renderData.vData;
      ibuf = _buffer.renderData.iData;
      _m00 = slotMat.m00;
      _m04 = slotMat.m04;
      _m12 = slotMat.m12;
      _m01 = slotMat.m01;
      _m05 = slotMat.m05;
      _m13 = slotMat.m13; // vertext format:
      //       x y z u v r g b a

      for (var vi = 0, vl = vertices.length; vi < vl;) {
        _x = vertices[vi++];
        _y = vertices[vi++];
        vbuf[_vfOffset] = _x * _m00 + _y * _m04 + _m12; // x

        vbuf[_vfOffset + 1] = _x * _m01 + _y * _m05 + _m13; // y

        vbuf[_vfOffset + 3] = vertices[vi++]; // u

        vbuf[_vfOffset + 4] = vertices[vi++]; // v

        vbuf.set(_c, _vfOffset + 5); // color

        _vfOffset += STRIDE_FLOAT;
      }

      for (var ii = 0, il = indices.length; ii < il; ii++) {
        ibuf[_indexOffset++] = _vertexOffset + indices[ii];
      }

      _buffer.renderData.advance(_vertexCount, _indexCount);
    }
  }

  function cacheTraverse(frame, parentMat) {
    if (!frame) return;
    var segments = frame.segments;
    if (segments.length === 0) return;
    var vbuf;
    var ibuf;
    var material; // let offsetInfo;

    var vertices = frame.vertices;
    var colorArray = new Uint32Array(vertices.buffer);
    var indices = frame.indices;
    var frameVFOffset = 0;
    var frameIndexOffset = 0;
    var segVFCount = 0;

    if (parentMat) {
      _m00 = parentMat.m00;
      _m01 = parentMat.m01;
      _m04 = parentMat.m04;
      _m05 = parentMat.m05;
      _m12 = parentMat.m12;
      _m13 = parentMat.m13;
    }

    var justTranslate = _m00 === 1 && _m01 === 0 && _m04 === 0 && _m05 === 1;
    var needBatch = _handleVal & NEED_BATCH;
    var calcTranslate = needBatch && justTranslate;
    var colorOffset = 0;
    var colors = frame.colors;
    var nowColor = colors[colorOffset++];
    var maxVFOffset = nowColor.vfOffset;

    _handleColor(nowColor, 1.0);

    for (var i = 0, n = segments.length; i < n; i++) {
      var segInfo = segments[i];
      material = _getSlotMaterial(segInfo.tex, segInfo.blendMode);

      if (!_buffer.renderData.material) {
        _buffer.renderData.material = material;
      }

      if (!_buffer.texture) {
        _buffer.texture = segInfo.tex;
      }

      if (_mustFlush || _buffer.renderData.material !== material || _buffer.texture !== segInfo.tex) {
        _mustFlush = false;
        _buffer = _comp.requestMeshRenderData();
        _buffer.renderData.material = material;
        _buffer.texture = segInfo.tex;
      }

      _vertexCount = segInfo.vertexCount;
      _indexCount = segInfo.indexCount;
      var rd = _buffer.renderData;
      rd.reserve(_vertexCount, _indexCount);
      _indexOffset = rd.indicesCount;
      _vfOffset = rd.vDataOffset;
      _vertexOffset = rd.vertexCount;
      vbuf = _buffer.renderData.vData;
      ibuf = _buffer.renderData.iData;

      for (var ii = _indexOffset, il = _indexOffset + _indexCount; ii < il; ii++) {
        ibuf[ii] = _vertexOffset + indices[frameIndexOffset++];
      }

      segVFCount = segInfo.vfCount; // vbuf.set(vertices.subarray(frameVFOffset, frameVFOffset + segVFCount), _vfOffset);

      for (var _ii = frameVFOffset, jj = _vfOffset; _ii < frameVFOffset + segVFCount;) {
        vbuf[jj] = vertices[_ii++];
        vbuf[jj + 1] = vertices[_ii++];
        vbuf[jj + 3] = vertices[_ii++];
        vbuf[jj + 4] = vertices[_ii++];

        _intToColor(colorArray[_ii++]);

        vbuf.set(_c, jj + 5);
        jj += STRIDE_FLOAT;
      }

      frameVFOffset += segVFCount;

      if (calcTranslate) {
        for (var _ii2 = _vfOffset, _il = _vfOffset + segVFCount; _ii2 < _il; _ii2 += STRIDE_FLOAT) {
          vbuf[_ii2] += _m12;
          vbuf[_ii2 + 1] += _m13;
        }
      } else if (needBatch) {
        for (var _ii3 = _vfOffset, _il2 = _vfOffset + segVFCount; _ii3 < _il2; _ii3 += STRIDE_FLOAT) {
          _x = vbuf[_ii3];
          _y = vbuf[_ii3 + 1];
          vbuf[_ii3] = _x * _m00 + _y * _m04 + _m12;
          vbuf[_ii3 + 1] = _x * _m01 + _y * _m05 + _m13;
        }
      }

      _buffer.renderData.advance(_vertexCount, _indexCount);

      if (!(_handleVal & NEED_COLOR)) continue; // handle color

      var frameColorOffset = frameVFOffset - segVFCount;

      for (var _ii4 = _vfOffset + 5, _il3 = _vfOffset + 4 + segVFCount; _ii4 < _il3; _ii4 += STRIDE_FLOAT, frameColorOffset += STRIDE_FLOAT) {
        if (frameColorOffset >= maxVFOffset) {
          nowColor = colors[colorOffset++];

          _handleColor(nowColor, 1.0);

          maxVFOffset = nowColor.vfOffset;
        }

        vbuf.set(_c, _ii4);
      }
    }
  }

  function updateComponentRenderData(comp, batcher) {
    // comp.node._renderFlag |= RenderFlow.FLAG_UPDATE_RENDER_DATA;
    var armature = comp._armature;
    if (!armature) return;
    comp.markForUpdateRenderData();
    comp.destroyRenderData(); // Init temp var.

    _mustFlush = true;
    _premultipliedAlpha = comp.premultipliedAlpha;
    _node = comp.node;
    _buffer = comp.requestMeshRenderData();
    _batcher = batcher;
    _comp = comp;
    _handleVal = 0;
    var nodeColor = comp.color;
    _nodeR = nodeColor.r / 255;
    _nodeG = nodeColor.g / 255;
    _nodeB = nodeColor.b / 255;
    _nodeA = nodeColor.a / 255;

    if (nodeColor._val !== 0xffffffff) {
      _handleVal |= NEED_COLOR;
    }

    var worldMat;

    if (_comp._enableBatch) {
      worldMat = _node.worldMatrix;
      _mustFlush = false;
      _handleVal |= NEED_BATCH;
    }

    if (comp.isAnimationCached()) {
      // Traverse input assembler.
      cacheTraverse(comp._curFrame, worldMat);
    } else {
      // Traverse all armature.
      realTimeTraverse(armature, worldMat, 1.0);
      var graphics = comp._debugDraw;

      if (comp.debugBones && graphics) {
        graphics.clear();
        graphics.lineWidth = 5;
        graphics.strokeColor = _boneColor;
        graphics.fillColor = _slotColor; // Root bone color is same as slot color.

        var bones = armature.getBones();

        for (var i = 0, l = bones.length; i < l; i++) {
          var bone = bones[i];
          var boneLength = Math.max(bone.boneData.length, 5);
          var startX = bone.globalTransformMatrix.tx;
          var startY = bone.globalTransformMatrix.ty;
          var endX = startX + bone.globalTransformMatrix.a * boneLength;
          var endY = startY + bone.globalTransformMatrix.b * boneLength;
          graphics.moveTo(startX, startY);
          graphics.lineTo(endX, endY);
          graphics.stroke(); // Bone origins.

          graphics.circle(startX, startY, Math.PI * 2);
          graphics.fill();

          if (i === 0) {
            graphics.fillColor = _originColor;
          }
        }
      }
    } // sync attached node matrix
    // renderer.worldMatDirty++;


    comp.attachUtil._syncAttachedNode(); // Clear temp var.


    _node = undefined;
    _buffer = undefined;
    _batcher = undefined;
    _comp = undefined;
  }

  return {
    setters: [function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      Mat4 = _coreIndexJs.Mat4;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_coreGfxIndexJs) {
      BlendFactor = _coreGfxIndexJs.BlendFactor;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @module dragonBones
       */
      NEED_COLOR = 0x01;
      NEED_BATCH = 0x10;
      STRIDE_FLOAT = 9;
      STRIDE_BYTES = 9 * 4;
      _boneColor = new Color(255, 0, 0, 255);
      _slotColor = new Color(0, 0, 255, 255);
      _originColor = new Color(0, 255, 0, 255);
      /** node R [0,1] */

      _c = new Float32Array(4);
      _vec3u_temp = new Vec3();

      _export("simple", simple = {
        createData: function createData() {},
        updateRenderData: function updateRenderData(comp, ui) {
          _comp = comp;
          updateComponentRenderData(comp, ui);
        },
        updateColor: function updateColor(comp) {
          if (!comp) return;
          _comp = comp;

          _comp.markForUpdateRenderData();
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          if (!comp || comp.meshRenderDataArray.length === 0) return;
          var dataArray = comp.meshRenderDataArray;
          var node = comp.node;
          var buffer = renderer.acquireBufferBatch();
          var floatOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexOffset = buffer.vertexOffset; // 当前渲染的数据

          var data = dataArray[comp._meshRenderDataArrayIdx];
          var renderData = data.renderData;
          var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            floatOffset = 0;
            indicesOffset = 0;
            vertexOffset = 0;
          }

          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var matrix = node.worldMatrix;
          var srcVBuf = renderData.vData;
          var srcVIdx = renderData.vertexStart;
          var srcIBuf = renderData.iData; // copy all vertexData

          vBuf.set(srcVBuf.slice(srcVIdx, srcVIdx + renderData.vertexCount * STRIDE_FLOAT), floatOffset);

          if (!comp._enableBatch) {
            for (var i = 0; i < renderData.vertexCount; i++) {
              var pOffset = floatOffset + i * STRIDE_FLOAT;

              _vec3u_temp.set(vBuf[pOffset], vBuf[pOffset + 1], vBuf[pOffset + 2]);

              _vec3u_temp.transformMat4(matrix);

              vBuf[pOffset] = _vec3u_temp.x;
              vBuf[pOffset + 1] = _vec3u_temp.y;
              vBuf[pOffset + 2] = _vec3u_temp.z;
            }
          }

          var srcIOffset = renderData.indicesStart;

          for (var _i = 0; _i < renderData.indicesCount; _i += 1) {
            iBuf[_i + indicesOffset] = srcIBuf[_i + srcIOffset] + vertexOffset;
          }
        }
      });

      legacyCC.internal.DragonBonesAssembler = simple;
    }
  };
});