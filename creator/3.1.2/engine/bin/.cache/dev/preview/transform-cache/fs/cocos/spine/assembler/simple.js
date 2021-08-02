System.register("q-bundled:///fs/cocos/spine/assembler/simple.js", ["../lib/spine-core.js", "../../2d/renderer/vertex-format.js", "../skeleton.js", "../../core/index.js", "../../core/gfx/index.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var spine, vfmtPosUvColor, vfmtPosUvTwoColor, SpineMaterialType, Color, Vec3, BlendFactor, legacyCC, FLAG_BATCH, FLAG_TWO_COLOR, _handleVal, _quadTriangles, _slotColor, _boneColor, _originColor, _meshColor, _finalColor, _darkColor, _tempPos, _tempUv, _premultipliedAlpha, _multiplier, _slotRangeStart, _slotRangeEnd, _useTint, _debugSlots, _debugBones, _debugMesh, _nodeR, _nodeG, _nodeB, _nodeA, _finalColor32, _darkColor32, _vec3u_temp, _perVertexSize, _perClipVertexSize, _vertexFloatCount, _vertexCount, _vertexOffset, _vertexFloatOffset, _indexCount, _indexOffset, _vfOffset, _tempr, _tempg, _tempb, _inRange, _mustFlush, _x, _y, _m00, _m04, _m12, _m01, _m05, _m13, _r, _g, _b, _fr, _fg, _fb, _fa, _dr, _dg, _db, _da, _comp, _buffer, _node, _needColor, _vertexEffect, _currentMaterial, _currentTexture, _tmpColor4, simple;

  function _getSlotMaterial(blendMode) {
    var src;
    var dst;

    switch (blendMode) {
      case spine.BlendMode.Additive:
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE;
        break;

      case spine.BlendMode.Multiply:
        src = BlendFactor.DST_COLOR;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;

      case spine.BlendMode.Screen:
        src = BlendFactor.ONE;
        dst = BlendFactor.ONE_MINUS_SRC_COLOR;
        break;

      case spine.BlendMode.Normal:
      default:
        src = _premultipliedAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
        dst = BlendFactor.ONE_MINUS_SRC_ALPHA;
        break;
    }

    return _comp.getMaterialForBlendAndTint(src, dst, _useTint ? SpineMaterialType.TWO_COLORED : SpineMaterialType.COLORED_TEXTURED);
  }

  function _handleColor(color) {
    // temp rgb has multiply 255, so need divide 255;
    _fa = color.fa * _nodeA;
    _multiplier = _premultipliedAlpha ? _fa / 255 : 1;
    _r = _nodeR * _multiplier;
    _g = _nodeG * _multiplier;
    _b = _nodeB * _multiplier;
    _fr = color.fr * _r;
    _fg = color.fg * _g;
    _fb = color.fb * _b;
    _finalColor32[0] = _fr / 255.0;
    _finalColor32[1] = _fg / 255.0;
    _finalColor32[2] = _fb / 255.0;
    _finalColor32[3] = _fa / 255.0;
    _dr = color.dr * _r;
    _dg = color.dg * _g;
    _db = color.db * _b;
    _da = _premultipliedAlpha ? 255 : 0;
    _darkColor32[0] = _dr / 255.0;
    _darkColor32[1] = _dg / 255.0;
    _darkColor32[2] = _db / 255.0;
    _darkColor32[3] = _da / 255.0;
  }

  function _spineColorToFloat32Array4(spineColor) {
    _tmpColor4[0] = spineColor.r / 255.0;
    _tmpColor4[1] = spineColor.g / 255.0;
    _tmpColor4[2] = spineColor.b / 255.0;
    _tmpColor4[3] = spineColor.a / 255.0;
    return _tmpColor4;
  }

  function _vfmtFloatSize(useTint) {
    return useTint ? 3 + 2 + 4 + 4 : 3 + 2 + 4;
  }
  /**
   * simple 组装器
   * 可通过 `UI.simple` 获取该组装器。
   */


  function updateComponentRenderData(comp, ui) {
    if (!comp._skeleton) return;
    var nodeColor = comp.color;
    _nodeR = nodeColor.r / 255;
    _nodeG = nodeColor.g / 255;
    _nodeB = nodeColor.b / 255;
    _nodeA = nodeColor.a / 255;
    _useTint = comp.useTint || comp.isAnimationCached(); // x y u v color1 color2 or x y u v color

    _perVertexSize = _vfmtFloatSize(_useTint);
    _node = comp.node; // huge performance impact

    comp.destroyRenderData();
    _buffer = comp.requestMeshRenderData(_perVertexSize);
    _comp = comp;
    _currentMaterial = null;
    _mustFlush = true;
    _premultipliedAlpha = comp.premultipliedAlpha;
    _multiplier = 1.0;
    _handleVal = 0x00;
    _needColor = false;
    _vertexEffect = comp._effectDelegate && comp._effectDelegate._vertexEffect;

    if (nodeColor._val !== 0xffffffff || _premultipliedAlpha) {
      _needColor = true;
    }

    if (_useTint) {
      _handleVal |= FLAG_TWO_COLOR;
    }

    var worldMat;

    if (_comp.enableBatch) {
      worldMat = _node.worldMatrix;
      _mustFlush = false;
      _handleVal |= FLAG_BATCH;
    }

    if (comp.isAnimationCached()) {
      // Traverse input assembler.
      cacheTraverse(worldMat);
    } else {
      if (_vertexEffect) _vertexEffect.begin(comp._skeleton);
      realTimeTraverse(worldMat);
      if (_vertexEffect) _vertexEffect.end();
    } // sync attached node matrix


    comp.attachUtil._syncAttachedNode(); // Clear temp var.


    _node = undefined;
    _buffer = undefined;
    _comp = undefined;
    _vertexEffect = null;
  }

  function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
    var vbuf = _buffer.renderData.vData;
    var ibuf = _buffer.renderData.iData;
    _finalColor.a = slotColor.a * attachmentColor.a * skeletonColor.a * _nodeA * 255;
    _multiplier = _premultipliedAlpha ? _finalColor.a : 255;
    _tempr = _nodeR * attachmentColor.r * skeletonColor.r * _multiplier;
    _tempg = _nodeG * attachmentColor.g * skeletonColor.g * _multiplier;
    _tempb = _nodeB * attachmentColor.b * skeletonColor.b * _multiplier;
    _finalColor.r = _tempr * slotColor.r;
    _finalColor.g = _tempg * slotColor.g;
    _finalColor.b = _tempb * slotColor.b;

    if (slot.darkColor == null) {
      _darkColor.set(0.0, 0.0, 0.0, 1.0);
    } else {
      _darkColor.r = slot.darkColor.r * _tempr;
      _darkColor.g = slot.darkColor.g * _tempg;
      _darkColor.b = slot.darkColor.b * _tempb;
    }

    _darkColor.a = _premultipliedAlpha ? 255 : 0;

    if (!clipper.isClipping()) {
      if (_vertexEffect) {
        for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount; v < n; v += _perVertexSize) {
          _tempPos.x = vbuf[v];
          _tempPos.y = vbuf[v + 1];
          _tempUv.x = vbuf[v + 3];
          _tempUv.y = vbuf[v + 4];

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          vbuf[v] = _tempPos.x; // x

          vbuf[v + 1] = _tempPos.y; // y

          vbuf[v + 3] = _tempUv.x; // u

          vbuf[v + 4] = _tempUv.y; // v

          vbuf.set(_spineColorToFloat32Array4(_finalColor), v + 5);

          if (_useTint) {
            vbuf.set(_spineColorToFloat32Array4(_darkColor), v + 9); // dark color
          }
        }
      } else {
        _finalColor32.set(_spineColorToFloat32Array4(_finalColor));

        _darkColor32.set(_spineColorToFloat32Array4(_darkColor));

        for (var _v = _vertexFloatOffset, _n = _vertexFloatOffset + _vertexFloatCount; _v < _n; _v += _perVertexSize) {
          vbuf.set(_finalColor32, _v + 5); // light color

          if (_useTint) {
            vbuf.set(_darkColor32, _v + 9); // dark color
          }
        }
      }
    } else {
      // const uvs = vbuf.subarray(_vertexFloatOffset + 2);
      _perClipVertexSize = _useTint ? 12 : 8; // const

      var vertices = vbuf.subarray(_vertexFloatOffset);
      var uvs = vbuf.subarray(_vertexFloatOffset + 3);
      clipper.clipTriangles(vertices, _vertexFloatCount, ibuf.subarray(_indexOffset), _indexCount, uvs, _finalColor, _darkColor, _useTint, _perVertexSize);
      var clippedVertices = new Float32Array(clipper.clippedVertices);
      var clippedTriangles = clipper.clippedTriangles; // insure capacity

      _indexCount = clippedTriangles.length;
      _vertexFloatCount = clippedVertices.length / _perClipVertexSize * _perVertexSize;

      _buffer.renderData.reserve(_vertexFloatCount / _perVertexSize, _indexCount);

      _indexOffset = _buffer.renderData.indicesCount;
      _vertexOffset = _buffer.renderData.vertexCount;
      _vertexFloatOffset = _buffer.renderData.vDataOffset;
      vbuf = _buffer.renderData.vData;
      ibuf = _buffer.renderData.iData; // fill indices
      // for(let ii=0; ii < _indexCount; ii++) {
      //     clippedTriangles[ii] += _vertexOffset;
      // }

      if (clippedTriangles.length > 0) {
        ibuf.set(clippedTriangles, _indexOffset);
      } // fill vertices contain x y u v light color dark color


      if (_vertexEffect) {
        for (var _v2 = 0, _n2 = clippedVertices.length, offset = _vertexFloatOffset; _v2 < _n2; _v2 += _perClipVertexSize, offset += _perVertexSize) {
          _tempPos.x = clippedVertices[_v2];
          _tempPos.y = clippedVertices[_v2 + 1];

          _finalColor.set(clippedVertices[_v2 + 2], clippedVertices[_v2 + 3], clippedVertices[_v2 + 4], clippedVertices[_v2 + 5]);

          _tempUv.x = clippedVertices[_v2 + 6];
          _tempUv.y = clippedVertices[_v2 + 7];

          if (_useTint) {
            _darkColor.set(clippedVertices[_v2 + 8], clippedVertices[_v2 + 9], clippedVertices[_v2 + 10], clippedVertices[_v2 + 11]);
          } else {
            _darkColor.set(0, 0, 0, 0);
          }

          _vertexEffect.transform(_tempPos, _tempUv, _finalColor, _darkColor);

          vbuf[offset] = _tempPos.x; // x

          vbuf[offset + 1] = _tempPos.y; // y

          vbuf[offset + 3] = _tempUv.x; // u

          vbuf[offset + 4] = _tempUv.y; // v

          vbuf.set(_spineColorToFloat32Array4(_finalColor), offset + 5);

          if (_useTint) {
            vbuf.set(_spineColorToFloat32Array4(_darkColor), offset + 9);
          }
        }
      } else {
        // x y r g b a u v (rr gg bb aa)
        for (var _v3 = 0, _n3 = clippedVertices.length, _offset = _vertexFloatOffset; _v3 < _n3; _v3 += _perClipVertexSize, _offset += _perVertexSize) {
          vbuf[_offset] = clippedVertices[_v3]; // x

          vbuf[_offset + 1] = clippedVertices[_v3 + 1]; // y

          vbuf[_offset + 3] = clippedVertices[_v3 + 6]; // u

          vbuf[_offset + 4] = clippedVertices[_v3 + 7]; // v

          vbuf[_offset + 5] = clippedVertices[_v3 + 2] / 255.0;
          vbuf[_offset + 6] = clippedVertices[_v3 + 3] / 255.0;
          vbuf[_offset + 7] = clippedVertices[_v3 + 4] / 255.0;
          vbuf[_offset + 8] = clippedVertices[_v3 + 5] / 255.0;

          if (_useTint) {
            vbuf[_offset + 9] = clippedVertices[_v3 + 8] / 255.0;
            vbuf[_offset + 10] = clippedVertices[_v3 + 9] / 255.0;
            vbuf[_offset + 11] = clippedVertices[_v3 + 10] / 255.0;
            vbuf[_offset + 12] = clippedVertices[_v3 + 11] / 255.0;
          }
        }
      } // TOOD: remove
      // _buffer?.renderData.advance(_vertexFloatCount / _perVertexSize, _indexCount);

    }
  }

  function realTimeTraverse(worldMat) {
    var vbuf;
    var ibuf;
    var locSkeleton = _comp._skeleton;
    var skeletonColor = locSkeleton.color;
    var graphics = _comp._debugRenderer;
    var clipper = _comp._clipper;
    var material = null;
    var attachment;
    var uvs;
    var triangles;
    var isRegion;
    var isMesh;
    var isClip;
    var slot;
    _slotRangeStart = _comp._startSlotIndex;
    _slotRangeEnd = _comp._endSlotIndex;
    _inRange = false;
    if (_slotRangeStart === -1) _inRange = true;
    _debugSlots = _comp.debugSlots;
    _debugBones = _comp.debugBones;
    _debugMesh = _comp.debugMesh;

    if (graphics && (_debugBones || _debugSlots || _debugMesh)) {
      graphics.clear();
      graphics.lineWidth = 5;
    } // x y u v r1 g1 b1 a1 r2 g2 b2 a2 or x y u v r g b a


    _perClipVertexSize = 12;
    _vertexFloatCount = 0;
    _vertexOffset = 0;
    _vertexFloatOffset = 0;
    _indexCount = 0;
    _indexOffset = 0;

    for (var slotIdx = 0, slotCount = locSkeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      var _buffer2;

      slot = locSkeleton.drawOrder[slotIdx];

      if (slot === undefined) {
        continue;
      }

      if (_slotRangeStart >= 0 && _slotRangeStart === slot.data.index) {
        _inRange = true;
      }

      if (!_inRange) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (_slotRangeEnd >= 0 && _slotRangeEnd === slot.data.index) {
        _inRange = false;
      }

      _vertexFloatCount = 0;
      _indexCount = 0;
      attachment = slot.getAttachment();

      if (!attachment) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      isRegion = attachment instanceof spine.RegionAttachment;
      isMesh = attachment instanceof spine.MeshAttachment;
      isClip = attachment instanceof spine.ClippingAttachment;

      if (isClip) {
        clipper.clipStart(slot, attachment);
        continue;
      }

      if (!isRegion && !isMesh) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      var texture = attachment.region.texture.getRealTexture();
      material = _getSlotMaterial(slot.data.blendMode);

      if (!material) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (!_currentMaterial) _currentMaterial = material;
      if (!((_buffer2 = _buffer) === null || _buffer2 === void 0 ? void 0 : _buffer2.renderData.material)) _buffer.renderData.material = _currentMaterial;

      if (_mustFlush || material.hash !== _currentMaterial.hash || texture && _currentTexture !== texture) {
        _mustFlush = false;
        _buffer = _comp.requestMeshRenderData(_perVertexSize);
        _currentMaterial = material;
        _currentTexture = texture;
        _buffer.texture = texture;
        _buffer.renderData.material = _currentMaterial;
      }

      if (isRegion) {
        triangles = _quadTriangles; // insure capacity

        _vertexFloatCount = 4 * _perVertexSize;
        _indexCount = 6;

        _buffer.renderData.reserve(4, 6);

        _indexOffset = _buffer.renderData.indicesCount;
        _vertexOffset = _buffer.renderData.vertexCount;
        _vertexFloatOffset = _buffer.renderData.vDataOffset;
        vbuf = _buffer.renderData.vData;
        ibuf = _buffer.renderData.iData; // compute vertex and fill x y

        attachment.computeWorldVertices(slot.bone, vbuf, _vertexFloatOffset, _perVertexSize); // draw debug slots if enabled graphics

        if (graphics && _debugSlots) {
          graphics.strokeColor = _slotColor;
          graphics.moveTo(vbuf[_vertexFloatOffset], vbuf[_vertexFloatOffset + 1]);

          for (var ii = _vertexFloatOffset + _perVertexSize, nn = _vertexFloatOffset + _vertexFloatCount; ii < nn; ii += _perVertexSize) {
            graphics.lineTo(vbuf[ii], vbuf[ii + 1]);
          }

          graphics.close();
          graphics.stroke();
        }
      } else if (isMesh) {
        var mattachment = attachment;
        triangles = mattachment.triangles; // insure capacity

        _vertexFloatCount = (mattachment.worldVerticesLength >> 1) * _perVertexSize;
        _indexCount = triangles.length;

        _buffer.renderData.reserve(mattachment.worldVerticesLength >> 1, _indexCount);

        _indexOffset = _buffer.renderData.indicesCount;
        _vertexOffset = _buffer.renderData.vertexCount;
        _vertexFloatOffset = _buffer.renderData.vDataOffset;
        vbuf = _buffer.renderData.vData;
        ibuf = _buffer.renderData.iData; // compute vertex and fill x y

        mattachment.computeWorldVertices(slot, 0, mattachment.worldVerticesLength, vbuf, _vertexFloatOffset, _perVertexSize); // draw debug mesh if enabled graphics

        if (graphics && _debugMesh) {
          graphics.strokeColor = _meshColor;

          for (var _ii = 0, _nn = triangles.length; _ii < _nn; _ii += 3) {
            var v1 = triangles[_ii] * _perVertexSize + _vertexFloatOffset;
            var v2 = triangles[_ii + 1] * _perVertexSize + _vertexFloatOffset;
            var v3 = triangles[_ii + 2] * _perVertexSize + _vertexFloatOffset;
            graphics.moveTo(vbuf[v1], vbuf[v1 + 1]);
            graphics.lineTo(vbuf[v2], vbuf[v2 + 1]);
            graphics.lineTo(vbuf[v3], vbuf[v3 + 1]);
            graphics.close();
            graphics.stroke();
          }
        }
      }

      if (_vertexFloatCount === 0 || _indexCount === 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      var meshAttachment = attachment; // fill indices

      ibuf.set(triangles, _indexOffset); // fill u v

      uvs = meshAttachment.uvs;

      for (var v = _vertexFloatOffset, n = _vertexFloatOffset + _vertexFloatCount, u = 0; v < n; v += _perVertexSize, u += 2) {
        vbuf[v + 3] = uvs[u]; // u

        vbuf[v + 4] = uvs[u + 1]; // v
      }

      fillVertices(skeletonColor, meshAttachment.color, slot.color, clipper, slot); // reset buffer pointer, because clipper maybe realloc a new buffer in file Vertices function.

      vbuf = _buffer.renderData.vData;
      ibuf = _buffer.renderData.iData;

      if (_indexCount > 0) {
        for (var _ii2 = _indexOffset, _nn2 = _indexOffset + _indexCount; _ii2 < _nn2; _ii2++) {
          ibuf[_ii2] += _vertexOffset;
        }

        if (worldMat) {
          _m00 = worldMat.m00;
          _m04 = worldMat.m04;
          _m12 = worldMat.m12;
          _m01 = worldMat.m01;
          _m05 = worldMat.m05;
          _m13 = worldMat.m13;

          for (var _ii3 = _vertexFloatOffset, _nn3 = _vertexFloatOffset + _vertexFloatCount; _ii3 < _nn3; _ii3 += _perVertexSize) {
            _x = vbuf[_ii3];
            _y = vbuf[_ii3 + 1];
            vbuf[_ii3] = _x * _m00 + _y * _m04 + _m12;
            vbuf[_ii3 + 1] = _x * _m01 + _y * _m05 + _m13;
          }
        }

        _buffer.renderData.advance(_vertexFloatCount / _perVertexSize, _indexCount);
      }

      clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();

    if (graphics && _debugBones) {
      var bone;
      graphics.strokeColor = _boneColor;
      graphics.fillColor = _slotColor; // Root bone color is same as slot color.

      for (var i = 0, _n4 = locSkeleton.bones.length; i < _n4; i++) {
        bone = locSkeleton.bones[i];
        var x = bone.data.length * bone.a + bone.worldX;
        var y = bone.data.length * bone.c + bone.worldY; // Bone lengths.

        graphics.moveTo(bone.worldX, bone.worldY);
        graphics.lineTo(x, y);
        graphics.stroke(); // Bone origins.

        graphics.circle(bone.worldX, bone.worldY, Math.PI * 1.5);
        graphics.fill();

        if (i === 0) {
          graphics.fillColor = _originColor;
        }
      }
    }
  }

  function cacheTraverse(worldMat) {
    var frame = _comp._curFrame;
    if (!frame) return;
    var segments = frame.segments;
    if (segments.length === 0) return;
    _perClipVertexSize = 12;
    var vbuf;
    var ibuf;
    var material = null;
    var vertices = frame.vertices;
    var indices = frame.indices;
    var frameVFOffset = 0;
    var frameIndexOffset = 0;
    var segVFCount = 0;

    if (worldMat) {
      _m00 = worldMat.m00;
      _m01 = worldMat.m01;
      _m04 = worldMat.m04;
      _m05 = worldMat.m05;
      _m12 = worldMat.m12;
      _m13 = worldMat.m13;
    }

    var justTranslate = _m00 === 1 && _m01 === 0 && _m04 === 0 && _m05 === 1;
    var needBatch = _handleVal & FLAG_BATCH;
    var calcTranslate = needBatch && justTranslate;
    var colorOffset = 0;
    var colors = frame.colors;
    var nowColor = colors[colorOffset++];
    var maxVFOffset = nowColor.vfOffset;

    _handleColor(nowColor);

    for (var i = 0, n = segments.length; i < n; i++) {
      var segInfo = segments[i];
      material = _getSlotMaterial(segInfo.blendMode);
      if (!material) continue;
      if (!_currentMaterial) _currentMaterial = material;
      if (!_currentTexture) _currentTexture = segInfo.tex;
      if (_buffer.renderData.material) _buffer.renderData.material = _currentMaterial;

      if (_mustFlush || material.hash !== _currentMaterial.hash || segInfo.tex && segInfo.tex !== _currentTexture) {
        _mustFlush = false;

        if (!_buffer.texture) {
          _buffer.texture = segInfo.tex;
        }

        _buffer = _comp.requestMeshRenderData(_vfmtFloatSize(_useTint));
        _currentMaterial = material;
        _currentTexture = segInfo.tex;
        _buffer.texture = segInfo.tex;
        _buffer.renderData.material = _currentMaterial;
      }

      _vertexCount = segInfo.vertexCount;
      _indexCount = segInfo.indexCount;

      _buffer.renderData.reserve(_vertexCount, _indexCount);

      _indexOffset = _buffer.renderData.indicesCount;
      _vertexOffset = _buffer.renderData.vertexCount;
      _vfOffset = _buffer.renderData.vDataOffset;
      vbuf = _buffer.renderData.vData;
      ibuf = _buffer.renderData.iData;

      for (var ii = _indexOffset, il = _indexOffset + _indexCount; ii < il; ii++) {
        ibuf[ii] = _vertexOffset + indices[frameIndexOffset++];
      }

      segVFCount = segInfo.vfCount; // vbuf.set(vertices.subarray(frameVFOffset, frameVFOffset + segVFCount), _vfOffset)

      var subArray = vertices.subarray(frameVFOffset, frameVFOffset + segVFCount);
      frameVFOffset += segVFCount; // x y r g b a u v r g b a

      var floatOffset = _vfOffset;
      _perVertexSize = _vfmtFloatSize(_useTint);

      for (var _ii4 = 0; _ii4 < subArray.length;) {
        vbuf[floatOffset + 0] = subArray[_ii4 + 0];
        vbuf[floatOffset + 1] = subArray[_ii4 + 1];
        vbuf[floatOffset + 3] = subArray[_ii4 + 3];
        vbuf[floatOffset + 4] = subArray[_ii4 + 4];
        vbuf[floatOffset + 5] = subArray[_ii4 + 5];
        vbuf[floatOffset + 6] = subArray[_ii4 + 6];
        vbuf[floatOffset + 7] = subArray[_ii4 + 7];
        vbuf[floatOffset + 8] = subArray[_ii4 + 8];

        if (_useTint) {
          vbuf[floatOffset + 9] = subArray[_ii4 + 9];
          vbuf[floatOffset + 10] = subArray[_ii4 + 10];
          vbuf[floatOffset + 11] = subArray[_ii4 + 11];
          vbuf[floatOffset + 12] = subArray[_ii4 + 12];
        }

        floatOffset += _perVertexSize;
        _ii4 += 13;
      }

      if (calcTranslate) {
        for (var _ii5 = _vfOffset, _il = _vfOffset + segVFCount; _ii5 < _il; _ii5 += _perVertexSize) {
          vbuf[_ii5] += _m12;
          vbuf[_ii5 + 1] += _m13;
        }
      } else if (needBatch) {
        for (var _ii6 = _vfOffset, _il2 = _vfOffset + segVFCount; _ii6 < _il2; _ii6 += _perVertexSize) {
          _x = vbuf[_ii6];
          _y = vbuf[_ii6 + 1];
          vbuf[_ii6] = _x * _m00 + _y * _m04 + _m12;
          vbuf[_ii6 + 1] = _x * _m01 + _y * _m05 + _m13;
        }
      }

      _buffer.renderData.advance(_vertexCount, _indexCount);

      if (!_needColor) continue; // handle color

      var frameColorOffset = frameVFOffset - segVFCount;

      for (var _ii7 = _vfOffset, iEnd = _vfOffset + segVFCount; _ii7 < iEnd; _ii7 += _perVertexSize, frameColorOffset += 6) {
        if (frameColorOffset >= maxVFOffset) {
          nowColor = colors[colorOffset++];

          _handleColor(nowColor);

          maxVFOffset = nowColor.vfOffset;
        }

        vbuf.set(_finalColor32, _ii7 + 5);
        vbuf.set(_darkColor32, _ii7 + 9);
      }
    }
  }

  return {
    setters: [function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }, function (_dRendererVertexFormatJs) {
      vfmtPosUvColor = _dRendererVertexFormatJs.vfmtPosUvColor;
      vfmtPosUvTwoColor = _dRendererVertexFormatJs.vfmtPosUvTwoColor;
    }, function (_skeletonJs) {
      SpineMaterialType = _skeletonJs.SpineMaterialType;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_coreGfxIndexJs) {
      BlendFactor = _coreGfxIndexJs.BlendFactor;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @hidden
       */
      FLAG_BATCH = 0x10;
      FLAG_TWO_COLOR = 0x01;
      _handleVal = 0x00;
      _quadTriangles = [0, 1, 2, 2, 3, 0];
      _slotColor = new Color(0, 0, 255, 255);
      _boneColor = new Color(255, 0, 0, 255);
      _originColor = new Color(0, 255, 0, 255);
      _meshColor = new Color(255, 255, 0, 255);
      _finalColor = new spine.Color(1, 1, 1, 1);
      _darkColor = new spine.Color(1, 1, 1, 1);
      _tempPos = new spine.Vector2();
      _tempUv = new spine.Vector2();
      _finalColor32 = new Float32Array(4);
      _darkColor32 = new Float32Array(4);
      _vec3u_temp = new Vec3();
      _vertexFloatCount = 0;
      _vertexCount = 0;
      _vertexOffset = 0;
      _vertexFloatOffset = 0;
      _indexCount = 0;
      _indexOffset = 0;
      _vfOffset = 0;
      _vertexEffect = null;
      _currentMaterial = null;
      _currentTexture = null;
      _tmpColor4 = new Float32Array(4);

      _export("simple", simple = {
        createData: function createData() {},
        updateRenderData: function updateRenderData(comp, ui) {
          _comp = comp;
          var skeleton = comp._skeleton;

          if (!comp.isAnimationCached() && skeleton) {
            skeleton.updateWorldTransform();
          }

          if (skeleton) {
            updateComponentRenderData(comp, ui);
          }
        },
        updateColor: function updateColor(comp) {
          if (!comp) return;
          _comp = comp;

          _comp.markForUpdateRenderData();
        },
        fillBuffers: function fillBuffers(comp, renderer) {
          if (!comp || !comp.meshRenderDataArray) return;
          _comp = comp;
          var dataArray = comp.meshRenderDataArray;
          var node = comp.node; // 当前渲染的数据

          var data = dataArray[comp._meshRenderDataArrayIdx];
          var renderData = data.renderData;
          var buffer = renderer.acquireBufferBatch(renderData.floatStride === 9 ? vfmtPosUvColor : vfmtPosUvTwoColor);
          var floatOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexOffset = buffer.vertexOffset;
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

          var strideFloat = renderData.floatStride;
          vBuf.set(srcVBuf.subarray(srcVIdx, srcVIdx + renderData.vertexCount * strideFloat), floatOffset);

          for (var i = 0; i < renderData.vertexCount; i++) {
            var pOffset = floatOffset + i * strideFloat;

            _vec3u_temp.set(vBuf[pOffset], vBuf[pOffset + 1], vBuf[pOffset + 2]);

            _vec3u_temp.transformMat4(matrix);

            vBuf[pOffset] = _vec3u_temp.x;
            vBuf[pOffset + 1] = _vec3u_temp.y;
            vBuf[pOffset + 2] = _vec3u_temp.z;
          }

          var srcIOffset = renderData.indicesStart;

          for (var _i = 0; _i < renderData.indicesCount; _i += 1) {
            iBuf[_i + indicesOffset] = srcIBuf[_i + srcIOffset] + vertexOffset;
          }
        }
      });

      legacyCC.internal.SpineAssembler = simple;
    }
  };
});