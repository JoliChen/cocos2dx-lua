System.register("q-bundled:///fs/cocos/particle-2d/motion-streak-2d-assembler.js", ["./motion-streak-2d.js", "../core/math/index.js"], function (_export, _context) {
  "use strict";

  var MotionStreak, Vec2, Color, _tangent, _normal, _vec2, MotionStreakAssembler, MotionStreakAssemblerManager;

  function normal(out, dir) {
    // get perpendicular
    out.x = -dir.y;
    out.y = dir.x;
    return out;
  }

  function computeMiter(miter, lineA, lineB, halfThick, maxMultiple) {
    // get tangent line
    lineA.add(lineB, _tangent);

    _tangent.normalize(); // get miter as a unit vector


    miter.x = -_tangent.y;
    miter.y = _tangent.x;
    _vec2.x = -lineA.y;
    _vec2.y = lineA.x; // get the necessary length of our miter

    var multiple = 1 / miter.dot(_vec2);

    if (maxMultiple) {
      multiple = Math.min(multiple, maxMultiple);
    }

    return halfThick * multiple;
  }

  return {
    setters: [function (_motionStreak2dJs) {
      MotionStreak = _motionStreak2dJs.MotionStreak;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Color = _coreMathIndexJs.Color;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2018 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Chukong Aipu reserves all rights not expressly granted to you.
      
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
       * @module particle2d
       */
      _tangent = new Vec2(); // const _miter = new Vec2();

      _normal = new Vec2();
      _vec2 = new Vec2();

      _export("MotionStreakAssembler", MotionStreakAssembler = {
        createData: function createData(comp) {
          var renderData = comp.requestRenderData();
          renderData.dataLength = 4;
          renderData.vertexCount = 16;
          renderData.indicesCount = (16 - 2) * 3;
          return renderData;
        },
        update: function update(comp, dt) {
          var stroke = comp.stroke / 2;
          var node = comp.node;
          var matrix = node.worldMatrix;
          var tx = matrix.m12;
          var ty = matrix.m13;
          var points = comp.points;
          var cur;

          if (points.length > 1) {
            var point = points[0];
            var difx = point.point.x - tx;
            var dify = point.point.y - ty;

            if (difx * difx + dify * dify < comp.minSeg) {
              cur = point;
            }
          }

          if (!cur) {
            cur = new MotionStreak.Point();
            points.splice(0, 0, cur);
          }

          cur.setPoint(tx, ty);
          cur.time = comp.fadeTime + dt;
          var verticesCount = 0;
          var indicesCount = 0;

          if (points.length < 2) {
            return;
          }

          var renderData = comp.renderData;
          var color = comp.color;
          var cr = color.r;
          var cg = color.g;
          var cb = color.b;
          var ca = color.a;
          var prev = points[1];
          prev.distance = Vec2.subtract(_vec2, cur.point, prev.point).length();

          _vec2.normalize();

          prev.setDir(_vec2.x, _vec2.y);
          cur.setDir(_vec2.x, _vec2.y);
          renderData.dataLength = points.length * 2;
          var data = renderData.data;
          var fadeTime = comp.fadeTime;
          var findLast = false;

          for (var i = points.length - 1; i >= 0; i--) {
            var p = points[i];
            var _point = p.point;
            var dir = p.dir;
            p.time -= dt;

            if (p.time < 0) {
              points.splice(i, 1);
              continue;
            }

            var progress = p.time / fadeTime;
            var next = points[i - 1];

            if (!findLast) {
              if (!next) {
                points.splice(i, 1);
                continue;
              }

              _point.x = next.point.x - dir.x * progress;
              _point.y = next.point.y - dir.y * progress;
            }

            findLast = true;
            normal(_normal, dir);
            var da = progress * ca;
            var c = (da << 24 >>> 0) + (cb << 16) + (cg << 8) + cr;
            var offset = verticesCount;
            data[offset].x = _point.x + _normal.x * stroke;
            data[offset].y = _point.y + _normal.y * stroke;
            data[offset].u = 1;
            data[offset].v = progress;
            data[offset].color._val = c;
            offset += 1;
            data[offset].x = _point.x - _normal.x * stroke;
            data[offset].y = _point.y - _normal.y * stroke;
            data[offset].u = 0;
            data[offset].v = progress;
            data[offset].color._val = c;
            verticesCount += 2;
          }

          indicesCount = verticesCount <= 2 ? 0 : (verticesCount - 2) * 3;
          renderData.vertexCount = verticesCount;
          renderData.indicesCount = indicesCount;
        },
        updateRenderData: function updateRenderData(comp) {},
        fillBuffers: function fillBuffers(comp, renderer) {
          var renderData = comp.renderData;
          var dataList = renderData.data;
          var node = comp.node;
          var buffer = renderer.acquireBufferBatch();
          var vertexOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexId = buffer.vertexOffset;
          var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            indicesOffset = 0;
            vertexId = 0;
          } // buffer data may be reallocated, need get reference after request.


          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var vertexCount = renderData.vertexCount;
          var indicesCount = renderData.indicesCount;

          for (var i = 0; i < vertexCount; i++) {
            var vert = dataList[i];
            vBuf[vertexOffset++] = vert.x;
            vBuf[vertexOffset++] = vert.y;
            vBuf[vertexOffset++] = vert.z;
            vBuf[vertexOffset++] = vert.u;
            vBuf[vertexOffset++] = vert.v;
            Color.toArray(vBuf, vert.color, vertexOffset);
            vertexOffset += 4;
          } // fill index data


          for (var _i = 0, l = indicesCount; _i < l; _i += 2) {
            var start = vertexId + _i;
            iBuf[indicesOffset++] = start;
            iBuf[indicesOffset++] = start + 2;
            iBuf[indicesOffset++] = start + 1;
            iBuf[indicesOffset++] = start + 1;
            iBuf[indicesOffset++] = start + 2;
            iBuf[indicesOffset++] = start + 3;
          }
        }
      });

      _export("MotionStreakAssemblerManager", MotionStreakAssemblerManager = {
        getAssembler: function getAssembler(comp) {
          return MotionStreakAssembler;
        }
      });

      MotionStreak.Assembler = MotionStreakAssemblerManager;
    }
  };
});