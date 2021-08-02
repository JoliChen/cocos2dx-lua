System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './sprite-frame-7d9f333d.js', './sprite-a3b66458.js', './renderable-2d-10fe359a.js', './graphics-dd08825e.js', './vertex-format-4cd0d3eb.js', './deprecated-d095a9bd.js', './deprecated-6bde9d8e.js'], function (exports) {
    'use strict';
    var Vec3, Mat4, Color, Rect, Size, Vec2, addon, mixin, BlendFactor, legacyCC, _createForOfIteratorHelperLoose, logID, errorID, SubModelPool, SubModelView, sys, _createClass, DSPool, UBOLocal, ModelLocalBindings, DescriptorSetInfo, RecyclePool, Material, CachedArray, Pool, BufferInfo, BufferUsageBit, MemoryUsageBit, warnID, assetManager, downloader, factory, dynamicAtlasManager, SpriteFrame, shareLabelInfo, Overflow$1, isUnicodeSpace, isUnicodeCJK, HorizontalTextAlignment, VerticalTextAlignment, LetterAtlas, computeHash, Label, safeMeasureText, fragmentText, BASELINE_RATIO, getBaselineOffset, BitmapFont, Sprite, TTFFont, StencilManager, Stage, LineJoin, LineCap, Point, PointFlags, Graphics, vfmtPosUvColor, getAttributeStride, LabelOutline, LabelShadow, Mask, MaskType, MeshBuffer, DrawBatch2D;
    return {
        setters: [function (module) {
            Vec3 = module.cY;
            Mat4 = module.d3;
            Color = module.da;
            Rect = module.d8;
            Size = module.d6;
            Vec2 = module.cW;
            addon = module.fR;
            mixin = module.fD;
            BlendFactor = module.V;
            legacyCC = module.l;
            _createForOfIteratorHelperLoose = module.t;
            logID = module.c;
            errorID = module.f;
            SubModelPool = module.cb;
            SubModelView = module.ca;
            sys = module.eg;
            _createClass = module.eu;
            DSPool = module.bX;
            UBOLocal = module.g6;
            ModelLocalBindings = module.gF;
            DescriptorSetInfo = module.aS;
            RecyclePool = module.R;
            Material = module.e7;
            CachedArray = module.C;
            Pool = module.P;
            BufferInfo = module.ap;
            BufferUsageBit = module.z;
            MemoryUsageBit = module.G;
            warnID = module.d;
        }, function (module) {
            assetManager = module.h;
            downloader = module.w;
            factory = module.x;
        }, function (module) {
            dynamicAtlasManager = module.d;
            SpriteFrame = module.S;
        }, function (module) {
            shareLabelInfo = module.h;
            Overflow$1 = module.O;
            isUnicodeSpace = module.e;
            isUnicodeCJK = module.i;
            HorizontalTextAlignment = module.H;
            VerticalTextAlignment = module.V;
            LetterAtlas = module.j;
            computeHash = module.k;
            Label = module.c;
            safeMeasureText = module.s;
            fragmentText = module.f;
            BASELINE_RATIO = module.d;
            getBaselineOffset = module.g;
            BitmapFont = module.B;
            Sprite = module.a;
            TTFFont = module.T;
        }, function (module) {
            StencilManager = module.S;
            Stage = module.a;
        }, function (module) {
            LineJoin = module.L;
            LineCap = module.a;
            Point = module.P;
            PointFlags = module.b;
            Graphics = module.G;
        }, function (module) {
            vfmtPosUvColor = module.c;
            getAttributeStride = module.g;
        }, function (module) {
            LabelOutline = module.L;
            LabelShadow = module.c;
            Mask = module.a;
            MaskType = module.e;
            MeshBuffer = module.M;
            DrawBatch2D = module.D;
        }, function () {}],
        execute: function () {

            exports('e', earcut);

            var vec3_temp = new Vec3();

            var _worldMatrix = new Mat4();

            function fillVertices3D(node, renderer, renderData, color) {
              var dataList = renderData.data;
              var buffer = renderer.acquireBufferBatch();
              var vertexOffset = buffer.byteOffset >> 2;
              var vertexCount = renderData.vertexCount;
              var indicesOffset = buffer.indicesOffset;
              var vertexId = buffer.vertexOffset;
              var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

              if (!isRecreate) {
                buffer = renderer.currBufferBatch;
                vertexCount = 0;
                indicesOffset = 0;
                vertexId = 0;
              }

              var vBuf = buffer.vData;
              node.getWorldMatrix(_worldMatrix);

              for (var i = 0; i < vertexCount; i++) {
                var vert = dataList[i];
                Vec3.set(vec3_temp, vert.x, vert.y, 0);
                Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
                vBuf[vertexOffset++] = vec3_temp.x;
                vBuf[vertexOffset++] = vec3_temp.y;
                vBuf[vertexOffset++] = vec3_temp.z;
                vBuf[vertexOffset++] = vert.u;
                vBuf[vertexOffset++] = vert.v;
                Color.toArray(vBuf, color, vertexOffset);
                vertexOffset += 4;
              }

              var iBuf = buffer.iData;

              for (var _i = 0; _i < renderData.dataLength; _i++) {
                iBuf[indicesOffset + _i] = vertexId + _i;
              }
            }
            function fillMeshVertices3D(node, renderer, renderData, color) {
              var dataList = renderData.data;
              var buffer = renderer.acquireBufferBatch();
              var vertexOffset = buffer.byteOffset >> 2;
              var vertexCount = renderData.vertexCount;
              var indicesOffset = buffer.indicesOffset;
              var vertexId = buffer.vertexOffset;
              var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

              if (!isRecreate) {
                buffer = renderer.currBufferBatch;
                vertexCount = 0;
                indicesOffset = 0;
                vertexId = 0;
              }

              var vBuf = buffer.vData;
              var iBuf = buffer.iData;
              node.getWorldMatrix(_worldMatrix);

              for (var i = 0; i < vertexCount; i++) {
                var vert = dataList[i];
                Vec3.set(vec3_temp, vert.x, vert.y, 0);
                Vec3.transformMat4(vec3_temp, vec3_temp, _worldMatrix);
                vBuf[vertexOffset++] = vec3_temp.x;
                vBuf[vertexOffset++] = vec3_temp.y;
                vBuf[vertexOffset++] = vec3_temp.z;
                vBuf[vertexOffset++] = vert.u;
                vBuf[vertexOffset++] = vert.v;
                Color.toArray(vBuf, color, vertexOffset);
                vertexOffset += 4;
              }

              for (var _i2 = 0, count = vertexCount / 4; _i2 < count; _i2++) {
                var start = vertexId + _i2 * 4;
                iBuf[indicesOffset++] = start;
                iBuf[indicesOffset++] = start + 1;
                iBuf[indicesOffset++] = start + 2;
                iBuf[indicesOffset++] = start + 1;
                iBuf[indicesOffset++] = start + 3;
                iBuf[indicesOffset++] = start + 2;
              }
            }
            function fillVerticesWithoutCalc3D(node, renderer, renderData, color) {
              var dataList = renderData.data;
              var buffer = renderer.acquireBufferBatch();
              var vertexOffset = buffer.byteOffset >> 2;
              var vertexCount = renderData.vertexCount;
              var indicesOffset = buffer.indicesOffset;
              var vertexId = buffer.vertexOffset;
              var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

              if (!isRecreate) {
                buffer = renderer.currBufferBatch;
                vertexCount = 0;
                indicesOffset = 0;
                vertexId = 0;
              }

              var vBuf = buffer.vData;

              for (var i = 0; i < vertexCount; i++) {
                var vert = dataList[i];
                vBuf[vertexOffset++] = vert.x;
                vBuf[vertexOffset++] = vert.y;
                vBuf[vertexOffset++] = vert.z;
                vBuf[vertexOffset++] = vert.u;
                vBuf[vertexOffset++] = vert.v;
                Color.toArray(vBuf, color, vertexOffset);
                vertexOffset += 4;
              }

              var iBuf = buffer.iData;
              iBuf[indicesOffset++] = vertexId;
              iBuf[indicesOffset++] = vertexId + 1;
              iBuf[indicesOffset++] = vertexId + 2;
              iBuf[indicesOffset++] = vertexId + 1;
              iBuf[indicesOffset++] = vertexId + 3;
              iBuf[indicesOffset++] = vertexId + 2;
            }

            var Aim = function Aim(i, x, y) {
              this.i = void 0;
              this.x = void 0;
              this.y = void 0;
              this.prev = null;
              this.next = null;
              this.z = 0;
              this.prevZ = null;
              this.nextZ = null;
              this.steiner = false;
              this.i = i;
              this.x = x;
              this.y = y;
            };

            function linkedList(datas, start, end, dim, clockwise) {
              var i = 0;
              var last = null;

              if (clockwise === signedArea(datas, start, end, dim) > 0) {
                for (i = start; i < end; i += dim) {
                  last = insertNode(i, datas[i], datas[i + 1], last);
                }
              } else {
                for (i = end - dim; i >= start; i -= dim) {
                  last = insertNode(i, datas[i], datas[i + 1], last);
                }
              }

              if (last && equals(last, last.next)) {
                removeNode(last);
                last = last.next;
              }

              return last;
            }

            function filterPoints(start, end) {
              if (end === void 0) {
                end = null;
              }

              if (!start) {
                return start;
              }

              if (!end) {
                end = start;
              }

              var p = start;
              var again = false;

              do {
                again = false;

                if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
                  removeNode(p);
                  p = end = p.prev;

                  if (p === p.next) {
                    return null;
                  }

                  again = true;
                } else {
                  p = p.next;
                }
              } while (again || p !== end);

              return end;
            }

            function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
              if (pass === void 0) {
                pass = 0;
              }

              if (!ear) {
                return;
              }

              if (!pass && size) {
                indexCurve(ear, minX, minY, size);
              }

              var stop = ear;
              var prev = null;
              var next = null;

              while (ear.prev !== ear.next) {
                prev = ear.prev;
                next = ear.next;

                if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
                  triangles.push(prev.i / dim);
                  triangles.push(ear.i / dim);
                  triangles.push(next.i / dim);
                  removeNode(ear);
                  ear = next.next;
                  stop = next.next;
                  continue;
                }

                ear = next;

                if (ear === stop) {
                  if (!pass) {
                    earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1);
                  } else if (pass === 1) {
                    ear = cureLocalIntersections(ear, triangles, dim);
                    earcutLinked(ear, triangles, dim, minX, minY, size, 2);
                  } else if (pass === 2) {
                    splitEarcut(ear, triangles, dim, minX, minY, size);
                  }

                  break;
                }
              }
            }

            function isEar(ear) {
              var a = ear.prev;
              var b = ear;
              var c = ear.next;

              if (area(a, b, c) >= 0) {
                return false;
              }

              var p = ear.next.next;

              while (p !== ear.prev) {
                if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
                  return false;
                }

                p = p.next;
              }

              return true;
            }

            function isEarHashed(ear, minX, minY, size) {
              var a = ear.prev;
              var b = ear;
              var c = ear.next;

              if (area(a, b, c) >= 0) {
                return false;
              }

              var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x;
              var minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y;
              var maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x;
              var maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y;
              var minZ = zOrder(minTX, minTY, minX, minY, size);
              var maxZ = zOrder(maxTX, maxTY, minX, minY, size);
              var p = ear.nextZ;

              while (p && p.z <= maxZ) {
                if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
                  return false;
                }

                p = p.nextZ;
              }

              p = ear.prevZ;

              while (p && p.z >= minZ) {
                if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
                  return false;
                }

                p = p.prevZ;
              }

              return true;
            }

            function cureLocalIntersections(start, triangles, dim) {
              var p = start;

              do {
                var a = p.prev;
                var b = p.next.next;

                if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
                  triangles.push(a.i / dim);
                  triangles.push(p.i / dim);
                  triangles.push(b.i / dim);
                  removeNode(p);
                  removeNode(p.next);
                  p = start = b;
                }

                p = p.next;
              } while (p !== start);

              return p;
            }

            function splitEarcut(start, triangles, dim, minX, minY, size) {
              var a = start;

              do {
                var b = a.next.next;

                while (b !== a.prev) {
                  if (a.i !== b.i && isValidDiagonal(a, b)) {
                    var c = splitPolygon(a, b);
                    a = filterPoints(a, a.next);
                    c = filterPoints(c, c.next);
                    earcutLinked(a, triangles, dim, minX, minY, size);
                    earcutLinked(c, triangles, dim, minX, minY, size);
                    return;
                  }

                  b = b.next;
                }

                a = a.next;
              } while (a !== start);
            }

            function eliminateHoles(datas, holeIndices, outerNode, dim) {
              var queue = [];
              var i = 0;
              var len = 0;
              var start = 0;
              var end = 0;
              var list = null;

              for (i = 0, len = holeIndices.length; i < len; i++) {
                start = holeIndices[i] * dim;
                end = i < len - 1 ? holeIndices[i + 1] * dim : datas.length;
                list = linkedList(datas, start, end, dim, false);

                if (!list) {
                  continue;
                }

                if (list === list.next) {
                  list.steiner = true;
                }

                queue.push(getLeftmost(list));
              }

              queue.sort(compareX);

              if (!outerNode) {
                return outerNode;
              }

              for (i = 0; i < queue.length; i++) {
                eliminateHole(queue[i], outerNode);
                outerNode = filterPoints(outerNode, outerNode.next);
              }

              return outerNode;
            }

            function compareX(a, b) {
              return a.x - b.x;
            }

            function eliminateHole(hole, outerNode) {
              outerNode = findHoleBridge(hole, outerNode);

              if (outerNode) {
                var b = splitPolygon(outerNode, hole);
                filterPoints(b, b.next);
              }
            }

            function findHoleBridge(hole, outerNode) {
              var p = outerNode;
              var hx = hole.x;
              var hy = hole.y;
              var qx = -Infinity;
              var m = null;

              do {
                if (hy <= p.y && hy >= p.next.y) {
                  var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

                  if (x <= hx && x > qx) {
                    qx = x;

                    if (x === hx) {
                      if (hy === p.y) {
                        return p;
                      }

                      if (hy === p.next.y) {
                        return p.next;
                      }
                    }

                    m = p.x < p.next.x ? p : p.next;
                  }
                }

                p = p.next;
              } while (p !== outerNode);

              if (!m) {
                return null;
              }

              if (hx === qx) {
                return m.prev;
              }

              var stop = m;
              var mx = m.x;
              var my = m.y;
              var tanMin = Infinity;
              var tan;
              p = m.next;

              while (p !== stop) {
                if (hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
                  tan = Math.abs(hy - p.y) / (hx - p.x);

                  if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
                    m = p;
                    tanMin = tan;
                  }
                }

                p = p.next;
              }

              return m;
            }

            function indexCurve(start, minX, minY, size) {
              var p = start;

              do {
                if (p.z === null) {
                  p.z = zOrder(p.x, p.y, minX, minY, size);
                }

                p.prevZ = p.prev;
                p.nextZ = p.next;
                p = p.next;
              } while (p !== start);

              p.prevZ.nextZ = null;
              p.prevZ = null;
              sortLinked(p);
            }

            function sortLinked(list) {
              var i = 0;
              var p = null;
              var q = null;
              var e = null;
              var tail = null;
              var numMerges = 0;
              var pSize = 0;
              var qSize = 0;
              var inSize = 1;

              do {
                p = list;
                list = null;
                tail = null;
                numMerges = 0;

                while (p) {
                  numMerges++;
                  q = p;
                  pSize = 0;

                  for (i = 0; i < inSize; i++) {
                    pSize++;
                    q = q.nextZ;

                    if (!q) {
                      break;
                    }
                  }

                  qSize = inSize;

                  while (pSize > 0 || qSize > 0 && q) {
                    if (pSize === 0) {
                      e = q;
                      q = q.nextZ;
                      qSize--;
                    } else if (qSize === 0 || !q) {
                      e = p;
                      p = p.nextZ;
                      pSize--;
                    } else if (p.z <= q.z) {
                      e = p;
                      p = p.nextZ;
                      pSize--;
                    } else {
                      e = q;
                      q = q.nextZ;
                      qSize--;
                    }

                    if (tail) {
                      tail.nextZ = e;
                    } else {
                      list = e;
                    }

                    e.prevZ = tail;
                    tail = e;
                  }

                  p = q;
                }

                tail.nextZ = null;
                inSize *= 2;
              } while (numMerges > 1);

              return list;
            }

            function zOrder(x, y, minX, minY, size) {
              x = 32767 * (x - minX) / size;
              y = 32767 * (y - minY) / size;
              x = (x | x << 8) & 0x00FF00FF;
              x = (x | x << 4) & 0x0F0F0F0F;
              x = (x | x << 2) & 0x33333333;
              x = (x | x << 1) & 0x55555555;
              y = (y | y << 8) & 0x00FF00FF;
              y = (y | y << 4) & 0x0F0F0F0F;
              y = (y | y << 2) & 0x33333333;
              y = (y | y << 1) & 0x55555555;
              return x | y << 1;
            }

            function getLeftmost(start) {
              var p = start;
              var leftmost = start;

              do {
                if (p.x < leftmost.x) {
                  leftmost = p;
                }

                p = p.next;
              } while (p !== start);

              return leftmost;
            }

            function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
              return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
            }

            function isValidDiagonal(a, b) {
              return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
            }

            function area(p, q, r) {
              return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
            }

            function equals(p1, p2) {
              return p1.x === p2.x && p1.y === p2.y;
            }

            function intersects(p1, q1, p2, q2) {
              if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) {
                return true;
              }

              return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
            }

            function intersectsPolygon(a, b) {
              var p = a;

              do {
                if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) {
                  return true;
                }

                p = p.next;
              } while (p !== a);

              return false;
            }

            function locallyInside(a, b) {
              return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
            }

            function middleInside(a, b) {
              var p = a;
              var inside = false;
              var px = (a.x + b.x) / 2;
              var py = (a.y + b.y) / 2;

              do {
                if (p.y > py !== p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) {
                  inside = !inside;
                }

                p = p.next;
              } while (p !== a);

              return inside;
            }

            function splitPolygon(a, b) {
              var a2 = new Aim(a.i, a.x, a.y);
              var b2 = new Aim(b.i, b.x, b.y);
              var an = a.next;
              var bp = b.prev;
              a.next = b;
              b.prev = a;
              a2.next = an;
              an.prev = a2;
              b2.next = a2;
              a2.prev = b2;
              bp.next = b2;
              b2.prev = bp;
              return b2;
            }

            function insertNode(i, x, y, last) {
              var p = new Aim(i, x, y);

              if (!last) {
                p.prev = p;
                p.next = p;
              } else {
                p.next = last.next;
                p.prev = last;
                last.next.prev = p;
                last.next = p;
              }

              return p;
            }

            function removeNode(p) {
              p.next.prev = p.prev;
              p.prev.next = p.next;

              if (p.prevZ) {
                p.prevZ.nextZ = p.nextZ;
              }

              if (p.nextZ) {
                p.nextZ.prevZ = p.prevZ;
              }
            }

            function signedArea(datas, start, end, dim) {
              var sum = 0;

              for (var i = start, j = end - dim; i < end; i += dim) {
                sum += (datas[j] - datas[i]) * (datas[i + 1] + datas[j + 1]);
                j = i;
              }

              return sum;
            }

            function earcut(datas, holeIndices, dim) {
              dim = dim || 3;
              var hasHoles = holeIndices ? holeIndices.length : 0;
              var outerLen = hasHoles ? holeIndices[0] * dim : datas.length;
              var outerNode = linkedList(datas, 0, outerLen, dim, true);
              var triangles = [];

              if (!outerNode) {
                return triangles;
              }

              var minX = 0;
              var minY = 0;
              var maxX = 0;
              var maxY = 0;
              var x = 0;
              var y = 0;
              var size = 0;

              if (hasHoles) {
                outerNode = eliminateHoles(datas, holeIndices, outerNode, dim);
              }

              if (datas.length > 80 * dim) {
                minX = maxX = datas[0];
                minY = maxY = datas[1];

                for (var i = dim; i < outerLen; i += dim) {
                  x = datas[i];
                  y = datas[i + 1];

                  if (x < minX) {
                    minX = x;
                  }

                  if (y < minY) {
                    minY = y;
                  }

                  if (x > maxX) {
                    maxX = x;
                  }

                  if (y > maxY) {
                    maxY = y;
                  }
                }

                size = Math.max(maxX - minX, maxY - minY);
              }

              earcutLinked(outerNode, triangles, dim, minX, minY, size);
              return triangles;
            }

            var MAX_VERTEX = 65535;
            var MAX_INDICES = MAX_VERTEX * 2;
            var PI = Math.PI;
            var min = Math.min;
            var max = Math.max;
            var ceil = Math.ceil;
            var acos = Math.acos;
            var cos = Math.cos;
            var sin = Math.sin;
            var atan2 = Math.atan2;
            var attrBytes = 8;
            var _renderData = null;
            var _impl = null;

            var _curColor = new Color();

            var vec3_temps = [];

            for (var i = 0; i < 4; i++) {
              vec3_temps.push(new Vec3());
            }

            function curveDivs(r, arc, tol) {
              var da = acos(r / (r + tol)) * 2.0;
              return max(2, ceil(arc / da));
            }

            function clamp(v, minNum, maxNum) {
              if (v < minNum) {
                return minNum;
              } else if (v > maxNum) {
                return maxNum;
              }

              return v;
            }

            var graphicsAssembler = {
              useModel: true,
              updateRenderData: function updateRenderData(graphics) {},
              fillBuffers: function fillBuffers(graphics, renderer) {},
              renderIA: function renderIA(graphics, renderer) {},
              getRenderData: function getRenderData(graphics, vertexCount) {
                if (!_impl) {
                  return null;
                }

                var renderDataList = _impl.getRenderDataList();

                var renderData = renderDataList[_impl.dataOffset];

                if (!renderData) {
                  return null;
                }

                var meshBuffer = renderData;
                var maxVertexCount = meshBuffer ? meshBuffer.vertexStart + vertexCount : 0;

                if (maxVertexCount > MAX_VERTEX || maxVertexCount * 3 > MAX_INDICES) {
                  ++_impl.dataOffset;

                  if (_impl.dataOffset < renderDataList.length) {
                    renderData = renderDataList[_impl.dataOffset];
                  } else {
                    renderData = _impl.requestRenderData();
                    renderDataList[_impl.dataOffset] = renderData;
                  }

                  meshBuffer = renderData;
                }

                if (meshBuffer && meshBuffer.vertexCount < maxVertexCount) {
                  meshBuffer.request(vertexCount, vertexCount * 3);
                }

                return renderData;
              },
              stroke: function stroke(graphics) {
                Color.copy(_curColor, graphics.strokeColor);

                if (!graphics.impl) {
                  return;
                }

                this._flattenPaths(graphics.impl);

                this._expandStroke(graphics);

                graphics.impl.updatePathOffset = true;
                this.end(graphics);
              },
              fill: function fill(graphics) {
                Color.copy(_curColor, graphics.fillColor);

                this._expandFill(graphics);

                if (graphics.impl) {
                  graphics.impl.updatePathOffset = true;
                }

                this.end(graphics);
              },
              end: function end(graphics) {
                graphics.markForUpdateRenderData();
              },
              _expandStroke: function _expandStroke(graphics) {
                var w = graphics.lineWidth * 0.5;
                var lineCap = graphics.lineCap;
                var lineJoin = graphics.lineJoin;
                var miterLimit = graphics.miterLimit;
                _impl = graphics.impl;

                if (!_impl) {
                  return;
                }

                var nCap = curveDivs(w, PI, _impl.tessTol);

                this._calculateJoins(_impl, w, lineJoin, miterLimit);

                var paths = _impl.paths;
                var vertexCount = 0;

                for (var _i = _impl.pathOffset, l = _impl.pathLength; _i < l; _i++) {
                  var path = paths[_i];
                  var pointsLength = path.points.length;

                  if (lineJoin === LineJoin.ROUND) {
                    vertexCount += (pointsLength + path.bevel * (nCap + 2) + 1) * 2;
                  } else {
                    vertexCount += (pointsLength + path.bevel * 5 + 1) * 2;
                  }

                  if (!path.closed) {
                    if (lineCap === LineCap.ROUND) {
                      vertexCount += (nCap * 2 + 2) * 2;
                    } else {
                      vertexCount += (3 + 3) * 2;
                    }
                  }
                }

                var meshBuffer = _renderData = this.getRenderData(graphics, vertexCount);

                if (!meshBuffer) {
                  return;
                }

                var vData = meshBuffer.vData;
                var iData = meshBuffer.iData;

                for (var _i2 = _impl.pathOffset, _l = _impl.pathLength; _i2 < _l; _i2++) {
                  var _path = paths[_i2];
                  var pts = _path.points;
                  var _pointsLength = pts.length;
                  var offset = meshBuffer.vertexStart;
                  var p0 = void 0;
                  var p1 = void 0;
                  var start = 0;
                  var end = 0;
                  var loop = _path.closed;

                  if (loop) {
                    p0 = pts[_pointsLength - 1];
                    p1 = pts[0];
                    start = 0;
                    end = _pointsLength;
                  } else {
                    p0 = pts[0];
                    p1 = pts[1];
                    start = 1;
                    end = _pointsLength - 1;
                  }

                  p1 = p1 || p0;

                  if (!loop) {
                    var dPos = new Point(p1.x, p1.y);
                    dPos.subtract(p0);
                    dPos.normalize();
                    var dx = dPos.x;
                    var dy = dPos.y;

                    if (lineCap === LineCap.BUTT) {
                      this._buttCapStart(p0, dx, dy, w, 0);
                    } else if (lineCap === LineCap.SQUARE) {
                      this._buttCapStart(p0, dx, dy, w, w);
                    } else if (lineCap === LineCap.ROUND) {
                      this._roundCapStart(p0, dx, dy, w, nCap);
                    }
                  }

                  for (var j = start; j < end; ++j) {
                    if (lineJoin === LineJoin.ROUND) {
                      this._roundJoin(p0, p1, w, w, nCap);
                    } else if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
                      this._bevelJoin(p0, p1, w, w);
                    } else {
                      this._vSet(p1.x + p1.dmx * w, p1.y + p1.dmy * w, 1);

                      this._vSet(p1.x - p1.dmx * w, p1.y - p1.dmy * w, -1);
                    }

                    p0 = p1;
                    p1 = pts[j + 1];
                  }

                  if (loop) {
                    var vDataOffset = offset * attrBytes;

                    this._vSet(vData[vDataOffset], vData[vDataOffset + 1], 1);

                    this._vSet(vData[vDataOffset + attrBytes], vData[vDataOffset + attrBytes + 1], -1);
                  } else {
                    var _dPos = new Point(p1.x, p1.y);

                    _dPos.subtract(p0);

                    _dPos.normalize();

                    var _dx = _dPos.x;
                    var _dy = _dPos.y;

                    if (lineCap === LineCap.BUTT) {
                      this._buttCapEnd(p1, _dx, _dy, w, 0);
                    } else if (lineCap === LineCap.SQUARE) {
                      this._buttCapEnd(p1, _dx, _dy, w, w);
                    } else if (lineCap === LineCap.ROUND) {
                      this._roundCapEnd(p1, _dx, _dy, w, nCap);
                    }
                  }

                  var indicesOffset = meshBuffer.indicesStart;

                  for (var begin = offset + 2, over = meshBuffer.vertexStart; begin < over; begin++) {
                    iData[indicesOffset++] = begin - 2;
                    iData[indicesOffset++] = begin - 1;
                    iData[indicesOffset++] = begin;
                  }

                  meshBuffer.indicesStart = indicesOffset;
                }

                _renderData = null;
                _impl = null;
              },
              _expandFill: function _expandFill(graphics) {
                _impl = graphics.impl;

                if (!_impl) {
                  return;
                }

                var paths = _impl.paths;
                var vertexCount = 0;

                for (var _i3 = _impl.pathOffset, l = _impl.pathLength; _i3 < l; _i3++) {
                  var path = paths[_i3];
                  var pointsLength = path.points.length;
                  vertexCount += pointsLength;
                }

                var renderData = _renderData = this.getRenderData(graphics, vertexCount);

                if (!renderData) {
                  return;
                }

                var meshBuffer = renderData;
                var vData = meshBuffer.vData;
                var iData = meshBuffer.iData;

                for (var _i4 = _impl.pathOffset, _l2 = _impl.pathLength; _i4 < _l2; _i4++) {
                  var _path2 = paths[_i4];
                  var pts = _path2.points;
                  var _pointsLength2 = pts.length;

                  if (_pointsLength2 === 0) {
                    continue;
                  }

                  var vertexOffset = renderData.vertexStart;

                  for (var j = 0; j < _pointsLength2; ++j) {
                    this._vSet(pts[j].x, pts[j].y);
                  }

                  var indicesOffset = renderData.indicesStart;

                  if (_path2.complex) {
                    var earcutData = [];

                    for (var _j = vertexOffset, end = renderData.vertexStart; _j < end; _j++) {
                      var vDataOffset = _j * attrBytes;
                      earcutData.push(vData[vDataOffset++]);
                      earcutData.push(vData[vDataOffset++]);
                      earcutData.push(vData[vDataOffset++]);
                    }

                    var newIndices = earcut(earcutData, null, 3);

                    if (!newIndices || newIndices.length === 0) {
                      continue;
                    }

                    for (var _j2 = 0, nIndices = newIndices.length; _j2 < nIndices; _j2++) {
                      iData[indicesOffset++] = newIndices[_j2] + vertexOffset;
                    }
                  } else {
                    var first = vertexOffset;

                    for (var start = vertexOffset + 2, _end = meshBuffer.vertexStart; start < _end; start++) {
                      iData[indicesOffset++] = first;
                      iData[indicesOffset++] = start - 1;
                      iData[indicesOffset++] = start;
                    }
                  }

                  meshBuffer.indicesStart = indicesOffset;
                }

                _renderData = null;
                _impl = null;
              },
              _calculateJoins: function _calculateJoins(impl, w, lineJoin, miterLimit) {
                var iw = 0.0;

                if (w > 0.0) {
                  iw = 1 / w;
                }

                var paths = impl.paths;

                for (var _i5 = impl.pathOffset, l = impl.pathLength; _i5 < l; _i5++) {
                  var path = paths[_i5];
                  var pts = path.points;
                  var ptsLength = pts.length;
                  var p0 = pts[ptsLength - 1];
                  var p1 = pts[0];
                  path.bevel = 0;

                  for (var j = 0; j < ptsLength; j++) {
                    var dmr2 = 0;
                    var cross = 0;
                    var limit = 0;
                    var dlx0 = p0.dy;
                    var dly0 = -p0.dx;
                    var dlx1 = p1.dy;
                    var dly1 = -p1.dx;
                    p1.dmx = (dlx0 + dlx1) * 0.5;
                    p1.dmy = (dly0 + dly1) * 0.5;
                    dmr2 = p1.dmx * p1.dmx + p1.dmy * p1.dmy;

                    if (dmr2 > 0.000001) {
                      var scale = 1 / dmr2;

                      if (scale > 600) {
                        scale = 600;
                      }

                      p1.dmx *= scale;
                      p1.dmy *= scale;
                    }

                    cross = p1.dx * p0.dy - p0.dx * p1.dy;

                    if (cross > 0) {
                      p1.flags |= PointFlags.PT_LEFT;
                    }

                    limit = max(11, min(p0.len, p1.len) * iw);

                    if (dmr2 * limit * limit < 1) {
                      p1.flags |= PointFlags.PT_INNERBEVEL;
                    }

                    if (p1.flags & PointFlags.PT_CORNER) {
                      if (dmr2 * miterLimit * miterLimit < 1 || lineJoin === LineJoin.BEVEL || lineJoin === LineJoin.ROUND) {
                        p1.flags |= PointFlags.PT_BEVEL;
                      }
                    }

                    if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
                      path.bevel++;
                    }

                    p0 = p1;
                    p1 = pts[j + 1];
                  }
                }
              },
              _flattenPaths: function _flattenPaths(impl) {
                var paths = impl.paths;

                for (var _i6 = impl.pathOffset, l = impl.pathLength; _i6 < l; _i6++) {
                  var path = paths[_i6];
                  var pts = path.points;
                  var p0 = pts[pts.length - 1];
                  var p1 = pts[0];

                  if (pts.length > 2 && p0.equals(p1)) {
                    path.closed = true;
                    pts.pop();
                    p0 = pts[pts.length - 1];
                  }

                  for (var j = 0, size = pts.length; j < size; j++) {
                    var dPos = new Point(p1.x, p1.y);
                    dPos.subtract(p0);
                    p0.len = dPos.length();

                    if (dPos.x || dPos.y) {
                      dPos.normalize();
                    }

                    p0.dx = dPos.x;
                    p0.dy = dPos.y;
                    p0 = p1;
                    p1 = pts[j + 1];
                  }
                }
              },
              _chooseBevel: function _chooseBevel(bevel, p0, p1, w) {
                var x = p1.x;
                var y = p1.y;
                var x0 = 0;
                var y0 = 0;
                var x1 = 0;
                var y1 = 0;

                if (bevel !== 0) {
                  x0 = x + p0.dy * w;
                  y0 = y - p0.dx * w;
                  x1 = x + p1.dy * w;
                  y1 = y - p1.dx * w;
                } else {
                  x0 = x1 = x + p1.dmx * w;
                  y0 = y1 = y + p1.dmy * w;
                }

                return [x0, y0, x1, y1];
              },
              _buttCapStart: function _buttCapStart(p, dx, dy, w, d) {
                var px = p.x - dx * d;
                var py = p.y - dy * d;
                var dlx = dy;
                var dly = -dx;

                this._vSet(px + dlx * w, py + dly * w, 1);

                this._vSet(px - dlx * w, py - dly * w, -1);
              },
              _buttCapEnd: function _buttCapEnd(p, dx, dy, w, d) {
                var px = p.x + dx * d;
                var py = p.y + dy * d;
                var dlx = dy;
                var dly = -dx;

                this._vSet(px + dlx * w, py + dly * w, 1);

                this._vSet(px - dlx * w, py - dly * w, -1);
              },
              _roundCapStart: function _roundCapStart(p, dx, dy, w, nCap) {
                var px = p.x;
                var py = p.y;
                var dlx = dy;
                var dly = -dx;

                for (var _i7 = 0; _i7 < nCap; _i7++) {
                  var a = _i7 / (nCap - 1) * PI;
                  var ax = cos(a) * w;
                  var ay = sin(a) * w;

                  this._vSet(px - dlx * ax - dx * ay, py - dly * ax - dy * ay, 1);

                  this._vSet(px, py, 0);
                }

                this._vSet(px + dlx * w, py + dly * w, 1);

                this._vSet(px - dlx * w, py - dly * w, -1);
              },
              _roundCapEnd: function _roundCapEnd(p, dx, dy, w, nCap) {
                var px = p.x;
                var py = p.y;
                var dlx = dy;
                var dly = -dx;

                this._vSet(px + dlx * w, py + dly * w, 1);

                this._vSet(px - dlx * w, py - dly * w, -1);

                for (var _i8 = 0; _i8 < nCap; _i8++) {
                  var a = _i8 / (nCap - 1) * PI;
                  var ax = cos(a) * w;
                  var ay = sin(a) * w;

                  this._vSet(px, py, 0);

                  this._vSet(px - dlx * ax + dx * ay, py - dly * ax + dy * ay, 1);
                }
              },
              _roundJoin: function _roundJoin(p0, p1, lw, rw, nCap) {
                var dlx0 = p0.dy;
                var dly0 = -p0.dx;
                var dlx1 = p1.dy;
                var dly1 = -p1.dx;
                var p1x = p1.x;
                var p1y = p1.y;

                if ((p1.flags & PointFlags.PT_LEFT) !== 0) {
                  var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

                  var lx0 = out[0];
                  var ly0 = out[1];
                  var lx1 = out[2];
                  var ly1 = out[3];
                  var a0 = atan2(-dly0, -dlx0);
                  var a1 = atan2(-dly1, -dlx1);

                  if (a1 > a0) {
                    a1 -= PI * 2;
                  }

                  this._vSet(lx0, ly0, 1);

                  this._vSet(p1x - dlx0 * rw, p1.y - dly0 * rw, -1);

                  var n = clamp(ceil((a0 - a1) / PI) * nCap, 2, nCap);

                  for (var _i9 = 0; _i9 < n; _i9++) {
                    var u = _i9 / (n - 1);
                    var a = a0 + u * (a1 - a0);
                    var rx = p1x + cos(a) * rw;
                    var ry = p1y + sin(a) * rw;

                    this._vSet(p1x, p1y, 0);

                    this._vSet(rx, ry, -1);
                  }

                  this._vSet(lx1, ly1, 1);

                  this._vSet(p1x - dlx1 * rw, p1y - dly1 * rw, -1);
                } else {
                  var _out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

                  var rx0 = _out[0];
                  var ry0 = _out[1];
                  var rx1 = _out[2];
                  var ry1 = _out[3];

                  var _a = atan2(dly0, dlx0);

                  var _a2 = atan2(dly1, dlx1);

                  if (_a2 < _a) {
                    _a2 += PI * 2;
                  }

                  this._vSet(p1x + dlx0 * rw, p1y + dly0 * rw, 1);

                  this._vSet(rx0, ry0, -1);

                  var _n = clamp(ceil((_a2 - _a) / PI) * nCap, 2, nCap);

                  for (var _i10 = 0; _i10 < _n; _i10++) {
                    var _u = _i10 / (_n - 1);

                    var _a3 = _a + _u * (_a2 - _a);

                    var lx = p1x + cos(_a3) * lw;
                    var ly = p1y + sin(_a3) * lw;

                    this._vSet(lx, ly, 1);

                    this._vSet(p1x, p1y, 0);
                  }

                  this._vSet(p1x + dlx1 * rw, p1y + dly1 * rw, 1);

                  this._vSet(rx1, ry1, -1);
                }
              },
              _bevelJoin: function _bevelJoin(p0, p1, lw, rw) {
                var rx0 = 0;
                var ry0 = 0;
                var rx1 = 0;
                var ry1 = 0;
                var lx0 = 0;
                var ly0 = 0;
                var lx1 = 0;
                var ly1 = 0;
                var dlx0 = p0.dy;
                var dly0 = -p0.dx;
                var dlx1 = p1.dy;
                var dly1 = -p1.dx;

                if (p1.flags & PointFlags.PT_LEFT) {
                  var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

                  lx0 = out[0];
                  ly0 = out[1];
                  lx1 = out[2];
                  ly1 = out[3];

                  this._vSet(lx0, ly0, 1);

                  this._vSet(p1.x - dlx0 * rw, p1.y - dly0 * rw, -1);

                  this._vSet(lx1, ly1, 1);

                  this._vSet(p1.x - dlx1 * rw, p1.y - dly1 * rw, -1);
                } else {
                  var _out2 = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

                  rx0 = _out2[0];
                  ry0 = _out2[1];
                  rx1 = _out2[2];
                  ry1 = _out2[3];

                  this._vSet(p1.x + dlx0 * lw, p1.y + dly0 * lw, 1);

                  this._vSet(rx0, ry0, -1);

                  this._vSet(p1.x + dlx1 * lw, p1.y + dly1 * lw, 1);

                  this._vSet(rx1, ry1, -1);
                }
              },
              _vSet: function _vSet(x, y, distance) {
                if (distance === void 0) {
                  distance = 0;
                }

                if (!_renderData) {
                  return;
                }

                var meshBuffer = _renderData;
                var dataOffset = meshBuffer.vertexStart * attrBytes;
                var vData = meshBuffer.vData;
                vData[dataOffset++] = x;
                vData[dataOffset++] = y;
                vData[dataOffset++] = 0;
                Color.toArray(vData, _curColor, dataOffset);
                dataOffset += 4;
                vData[dataOffset++] = distance;
                meshBuffer.vertexStart++;
              }
            };

            var graphicsAssemblerManager = exports('g', {
              getAssembler: function getAssembler(sprite) {
                return graphicsAssembler;
              }
            });
            Graphics.Assembler = graphicsAssemblerManager;

            var LetterInfo = function LetterInfo() {
              this["char"] = '';
              this.valid = true;
              this.x = 0;
              this.y = 0;
              this.line = 0;
              this.hash = '';
            };

            var _tmpRect = new Rect();

            var _comp = null;
            var _uiTrans = null;
            var _horizontalKerning = [];
            var _lettersInfo = [];
            var _linesWidth = [];
            var _linesOffsetX = [];

            var _labelDimensions = new Size();

            var _contentSize = new Size();

            var letterPosition = new Vec2();
            var _lineSpacing = 0;
            var _fntConfig = null;
            var _numberOfLines = 0;
            var _textDesiredHeight = 0;
            var _letterOffsetY = 0;
            var _tailoredTopY = 0;
            var _tailoredBottomY = 0;
            var _bmfontScale = 1.0;
            var _spriteFrame = null;
            var _string = '';
            var _fontSize = 0;
            var _originFontSize = 0;
            var _hAlign = 0;
            var _vAlign = 0;
            var _spacingX = 0;
            var _lineHeight = 0;
            var _overflow = 0;
            var _isWrapText = false;
            var _labelWidth = 0;
            var _labelHeight = 0;
            var _maxLineWidth = 0;
            var bmfontUtils = {
              updateRenderData: function updateRenderData(comp) {
                if (!comp.renderData || !comp.renderData.vertDirty) {
                  return;
                }

                if (_comp === comp) {
                  return;
                }

                _comp = comp;
                _uiTrans = _comp.node._uiProps.uiTransformComp;

                this._updateFontFamily(comp);

                this._updateProperties(comp);

                this._updateLabelInfo(comp);

                this._updateContent();

                _comp.actualFontSize = _fontSize;

                _uiTrans.setContentSize(_contentSize);

                _comp.renderData.vertDirty = _comp.renderData.uvDirty = false;

                _comp.markForUpdateRenderData(false);

                _comp = null;

                this._resetProperties();
              },
              _updateFontScale: function _updateFontScale() {
                _bmfontScale = _fontSize / _originFontSize;
              },
              _updateFontFamily: function _updateFontFamily(comp) {
                var fontAsset = comp.font;
                _spriteFrame = fontAsset.spriteFrame;
                _fntConfig = fontAsset.fntConfig;
                shareLabelInfo.fontAtlas = fontAsset.fontDefDictionary;
                dynamicAtlasManager.packToDynamicAtlas(comp, _spriteFrame);
              },
              _updateLabelInfo: function _updateLabelInfo(comp) {
                shareLabelInfo.hash = '';
                shareLabelInfo.margin = 0;
              },
              _updateProperties: function _updateProperties(comp) {
                _string = comp.string.toString();
                _fontSize = comp.fontSize;
                _originFontSize = _fntConfig ? _fntConfig.fontSize : comp.fontSize;
                _hAlign = comp.horizontalAlign;
                _vAlign = comp.verticalAlign;
                _spacingX = comp.spacingX;
                _overflow = comp.overflow;
                _lineHeight = comp._lineHeight;
                var contentSize = _uiTrans.contentSize;
                _contentSize.width = contentSize.width;
                _contentSize.height = contentSize.height;

                if (_overflow === Overflow$1.NONE) {
                  _isWrapText = false;
                  _contentSize.width += shareLabelInfo.margin * 2;
                  _contentSize.height += shareLabelInfo.margin * 2;
                } else if (_overflow === Overflow$1.RESIZE_HEIGHT) {
                  _isWrapText = true;
                  _contentSize.height += shareLabelInfo.margin * 2;
                } else {
                  _isWrapText = comp.enableWrapText;
                }

                shareLabelInfo.lineHeight = _lineHeight;
                shareLabelInfo.fontSize = _fontSize;

                this._setupBMFontOverflowMetrics();
              },
              _resetProperties: function _resetProperties() {
                _fntConfig = null;
                _spriteFrame = null;
                shareLabelInfo.hash = '';
                shareLabelInfo.margin = 0;
              },
              _updateContent: function _updateContent() {
                this._updateFontScale();

                this._computeHorizontalKerningForText();

                this._alignText();
              },
              _computeHorizontalKerningForText: function _computeHorizontalKerningForText() {
                var string = _string;
                var stringLen = string.length;
                var kerningDict = _fntConfig.kerningDict;
                var horizontalKerning = _horizontalKerning;
                var prev = -1;

                for (var i = 0; i < stringLen; ++i) {
                  var key = string.charCodeAt(i);
                  var kerningAmount = kerningDict[prev << 16 | key & 0xffff] || 0;

                  if (i < stringLen - 1) {
                    horizontalKerning[i] = kerningAmount;
                  } else {
                    horizontalKerning[i] = 0;
                  }

                  prev = key;
                }
              },
              _multilineTextWrap: function _multilineTextWrap(nextTokenFunc) {
                var textLen = _string.length;
                var lineIndex = 0;
                var nextTokenX = 0;
                var nextTokenY = 0;
                var longestLine = 0;
                var letterRight = 0;
                var highestY = 0;
                var lowestY = 0;
                var letterDef = null;

                for (var index = 0; index < textLen;) {
                  var character = _string.charAt(index);

                  if (character === '\n') {
                    _linesWidth.push(letterRight);

                    letterRight = 0;
                    lineIndex++;
                    nextTokenX = 0;
                    nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;

                    this._recordPlaceholderInfo(index, character);

                    index++;
                    continue;
                  }

                  var tokenLen = nextTokenFunc(_string, index, textLen);
                  var tokenHighestY = highestY;
                  var tokenLowestY = lowestY;
                  var tokenRight = letterRight;
                  var nextLetterX = nextTokenX;
                  var newLine = false;

                  for (var tmp = 0; tmp < tokenLen; ++tmp) {
                    var letterIndex = index + tmp;
                    character = _string.charAt(letterIndex);

                    if (character === '\r') {
                      this._recordPlaceholderInfo(letterIndex, character);

                      continue;
                    }

                    letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

                    if (!letterDef) {
                      this._recordPlaceholderInfo(letterIndex, character);

                      console.log("Can't find letter definition in texture atlas " + _fntConfig.atlasName + " for letter:" + character);
                      continue;
                    }

                    var letterX = nextLetterX + letterDef.offsetX * _bmfontScale - shareLabelInfo.margin;

                    if (_isWrapText && _maxLineWidth > 0 && nextTokenX > 0 && letterX + letterDef.w * _bmfontScale > _maxLineWidth && !isUnicodeSpace(character)) {
                      _linesWidth.push(letterRight);

                      letterRight = 0;
                      lineIndex++;
                      nextTokenX = 0;
                      nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;
                      newLine = true;
                      break;
                    } else {
                      letterPosition.x = letterX;
                    }

                    letterPosition.y = nextTokenY - letterDef.offsetY * _bmfontScale;

                    this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex);

                    if (letterIndex + 1 < _horizontalKerning.length && letterIndex < textLen - 1) {
                      nextLetterX += _horizontalKerning[letterIndex + 1];
                    }

                    nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;
                    tokenRight = letterPosition.x + letterDef.w * _bmfontScale;

                    if (tokenHighestY < letterPosition.y) {
                      tokenHighestY = letterPosition.y;
                    }

                    if (tokenLowestY > letterPosition.y - letterDef.h * _bmfontScale) {
                      tokenLowestY = letterPosition.y - letterDef.h * _bmfontScale;
                    }
                  }

                  if (newLine) {
                    continue;
                  }

                  nextTokenX = nextLetterX;
                  letterRight = tokenRight;

                  if (highestY < tokenHighestY) {
                    highestY = tokenHighestY;
                  }

                  if (lowestY > tokenLowestY) {
                    lowestY = tokenLowestY;
                  }

                  if (longestLine < letterRight) {
                    longestLine = letterRight;
                  }

                  index += tokenLen;
                }

                _linesWidth.push(letterRight);

                _numberOfLines = lineIndex + 1;
                _textDesiredHeight = _numberOfLines * _lineHeight * this._getFontScale();

                if (_numberOfLines > 1) {
                  _textDesiredHeight += (_numberOfLines - 1) * _lineSpacing;
                }

                _contentSize.width = _labelWidth;
                _contentSize.height = _labelHeight;

                if (_labelWidth <= 0) {
                  _contentSize.width = parseFloat(longestLine.toFixed(2)) + shareLabelInfo.margin * 2;
                }

                if (_labelHeight <= 0) {
                  _contentSize.height = parseFloat(_textDesiredHeight.toFixed(2)) + shareLabelInfo.margin * 2;
                }

                _tailoredTopY = _contentSize.height;
                _tailoredBottomY = 0;

                if (highestY > 0) {
                  _tailoredTopY = _contentSize.height + highestY;
                }

                if (lowestY < -_textDesiredHeight) {
                  _tailoredBottomY = _textDesiredHeight + lowestY;
                }

                return true;
              },
              _getFirstCharLen: function _getFirstCharLen() {
                return 1;
              },
              _getFontScale: function _getFontScale() {
                return _overflow === Overflow$1.SHRINK ? _bmfontScale : 1;
              },
              _getFirstWordLen: function _getFirstWordLen(text, startIndex, textLen) {
                var character = text.charAt(startIndex);

                if (isUnicodeCJK(character) || character === '\n' || isUnicodeSpace(character)) {
                  return 1;
                }

                var len = 1;
                var letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

                if (!letterDef) {
                  return len;
                }

                var nextLetterX = letterDef.xAdvance * _bmfontScale + _spacingX;
                var letterX = 0;

                for (var index = startIndex + 1; index < textLen; ++index) {
                  character = text.charAt(index);
                  letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

                  if (!letterDef) {
                    break;
                  }

                  letterX = nextLetterX + letterDef.offsetX * _bmfontScale;

                  if (letterX + letterDef.w * _bmfontScale > _maxLineWidth && !isUnicodeSpace(character) && _maxLineWidth > 0) {
                    return len;
                  }

                  nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;

                  if (character === '\n' || isUnicodeSpace(character) || isUnicodeCJK(character)) {
                    break;
                  }

                  len++;
                }

                return len;
              },
              _multilineTextWrapByWord: function _multilineTextWrapByWord() {
                return this._multilineTextWrap(this._getFirstWordLen);
              },
              _multilineTextWrapByChar: function _multilineTextWrapByChar() {
                return this._multilineTextWrap(this._getFirstCharLen);
              },
              _recordPlaceholderInfo: function _recordPlaceholderInfo(letterIndex, _char) {
                if (letterIndex >= _lettersInfo.length) {
                  var tmpInfo = new LetterInfo();

                  _lettersInfo.push(tmpInfo);
                }

                _lettersInfo[letterIndex]["char"] = _char;
                _lettersInfo[letterIndex].hash = _char.charCodeAt(0) + shareLabelInfo.hash;
                _lettersInfo[letterIndex].valid = false;
              },
              _recordLetterInfo: function _recordLetterInfo(letterPosition, character, letterIndex, lineIndex) {
                if (letterIndex >= _lettersInfo.length) {
                  var tmpInfo = new LetterInfo();

                  _lettersInfo.push(tmpInfo);
                }

                var _char2 = character.charCodeAt(0);

                var key = _char2 + shareLabelInfo.hash;
                _lettersInfo[letterIndex].line = lineIndex;
                _lettersInfo[letterIndex]["char"] = character;
                _lettersInfo[letterIndex].hash = key;
                _lettersInfo[letterIndex].valid = shareLabelInfo.fontAtlas.getLetter(key).valid;
                _lettersInfo[letterIndex].x = letterPosition.x;
                _lettersInfo[letterIndex].y = letterPosition.y;
              },
              _alignText: function _alignText() {
                _textDesiredHeight = 0;
                _linesWidth.length = 0;

                {
                  this._multilineTextWrapByWord();
                }

                this._computeAlignmentOffset();

                if (_overflow === Overflow$1.SHRINK) {
                  if (_fontSize > 0 && this._isVerticalClamp()) {
                    this._shrinkLabelToContentSize(this._isVerticalClamp);
                  }
                }

                if (!this._updateQuads()) {
                  if (_overflow === Overflow$1.SHRINK) {
                    this._shrinkLabelToContentSize(this._isHorizontalClamp);
                  }
                }
              },
              _scaleFontSizeDown: function _scaleFontSizeDown(fontSize) {
                var shouldUpdateContent = true;

                if (!fontSize) {
                  fontSize = 0.1;
                  shouldUpdateContent = false;
                }

                _fontSize = fontSize;

                if (shouldUpdateContent) {
                  this._updateContent();
                }
              },
              _shrinkLabelToContentSize: function _shrinkLabelToContentSize(lambda) {
                var fontSize = _fontSize;
                var left = 0;
                var right = fontSize | 0;
                var mid = 0;

                while (left < right) {
                  mid = left + right + 1 >> 1;
                  var newFontSize = mid;

                  if (newFontSize <= 0) {
                    break;
                  }

                  _bmfontScale = newFontSize / _originFontSize;

                  {
                    this._multilineTextWrapByWord();
                  }

                  this._computeAlignmentOffset();

                  if (lambda()) {
                    right = mid - 1;
                  } else {
                    left = mid;
                  }
                }

                if (left >= 0) {
                  this._scaleFontSizeDown(left);
                }
              },
              _isVerticalClamp: function _isVerticalClamp() {
                if (_textDesiredHeight > _contentSize.height) {
                  return true;
                } else {
                  return false;
                }
              },
              _isHorizontalClamp: function _isHorizontalClamp() {
                var letterClamp = false;

                for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
                  var letterInfo = _lettersInfo[ctr];

                  if (letterInfo.valid) {
                    var letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(letterInfo["char"], shareLabelInfo);

                    if (!letterDef) {
                      continue;
                    }

                    var px = letterInfo.x + letterDef.w / 2 * _bmfontScale;
                    var lineIndex = letterInfo.line;

                    if (_labelWidth > 0) {
                      if (!_isWrapText) {
                        if (px > _contentSize.width) {
                          letterClamp = true;
                          break;
                        }
                      } else {
                        var wordWidth = _linesWidth[lineIndex];

                        if (wordWidth > _contentSize.width && (px > _contentSize.width || px < 0)) {
                          letterClamp = true;
                          break;
                        }
                      }
                    }
                  }
                }

                return letterClamp;
              },
              _isHorizontalClamped: function _isHorizontalClamped(px, lineIndex) {
                var wordWidth = _linesWidth[lineIndex];
                var letterOverClamp = px > _contentSize.width || px < 0;

                if (!_isWrapText) {
                  return letterOverClamp;
                } else {
                  return wordWidth > _contentSize.width && letterOverClamp;
                }
              },
              _updateQuads: function _updateQuads() {
                if (!_comp) {
                  return false;
                }

                var texture = _spriteFrame ? _spriteFrame.texture : shareLabelInfo.fontAtlas.getTexture();
                var renderData = _comp.renderData;
                renderData.dataLength = renderData.vertexCount = renderData.indicesCount = 0;
                var anchorPoint = _uiTrans.anchorPoint;
                var contentSize = _contentSize;
                var appX = anchorPoint.x * contentSize.width;
                var appY = anchorPoint.y * contentSize.height;
                var ret = true;

                for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
                  var letterInfo = _lettersInfo[ctr];

                  if (!letterInfo.valid) {
                    continue;
                  }

                  var letterDef = shareLabelInfo.fontAtlas.getLetter(letterInfo.hash);

                  if (!letterDef) {
                    console.warn('Can\'t find letter in this bitmap-font');
                    continue;
                  }

                  _tmpRect.height = letterDef.h;
                  _tmpRect.width = letterDef.w;
                  _tmpRect.x = letterDef.u;
                  _tmpRect.y = letterDef.v;
                  var py = letterInfo.y + _letterOffsetY;

                  if (_labelHeight > 0) {
                    if (py > _tailoredTopY) {
                      var clipTop = py - _tailoredTopY;
                      _tmpRect.y += clipTop;
                      _tmpRect.height -= clipTop;
                      py -= clipTop;
                    }

                    if (py - letterDef.h * _bmfontScale < _tailoredBottomY && _overflow === Overflow$1.CLAMP) {
                      _tmpRect.height = py < _tailoredBottomY ? 0 : (py - _tailoredBottomY) / _bmfontScale;
                    }
                  }

                  var lineIndex = letterInfo.line;
                  var px = letterInfo.x + letterDef.w / 2 * _bmfontScale + _linesOffsetX[lineIndex];

                  if (_labelWidth > 0) {
                    if (this._isHorizontalClamped(px, lineIndex)) {
                      if (_overflow === Overflow$1.CLAMP) {
                        _tmpRect.width = 0;
                      } else if (_overflow === Overflow$1.SHRINK) {
                        if (_contentSize.width > letterDef.w) {
                          ret = false;
                          break;
                        } else {
                          _tmpRect.width = 0;
                        }
                      }
                    }
                  }

                  if (_tmpRect.height > 0 && _tmpRect.width > 0) {
                    var isRotated = this._determineRect();

                    var letterPositionX = letterInfo.x + _linesOffsetX[letterInfo.line];
                    this.appendQuad(_comp, texture, _tmpRect, isRotated, letterPositionX - appX, py - appY, _bmfontScale);
                  }
                }

                return ret;
              },
              appendQuad: function appendQuad(comp, texture, rect, rotated, x, y, scale) {},
              _determineRect: function _determineRect() {
                var isRotated = _spriteFrame.isRotated();

                var originalSize = _spriteFrame.getOriginalSize();

                var rect = _spriteFrame.getRect();

                var offset = _spriteFrame.getOffset();

                var trimmedLeft = offset.x + (originalSize.width - rect.width) / 2;
                var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

                if (!isRotated) {
                  _tmpRect.x += rect.x - trimmedLeft;
                  _tmpRect.y += rect.y + trimmedTop;
                } else {
                  var originalX = _tmpRect.x;
                  _tmpRect.x = rect.x + rect.height - _tmpRect.y - _tmpRect.height - trimmedTop;
                  _tmpRect.y = originalX + rect.y - trimmedLeft;

                  if (_tmpRect.y < 0) {
                    _tmpRect.height += trimmedTop;
                  }
                }

                return isRotated;
              },
              _computeAlignmentOffset: function _computeAlignmentOffset() {
                _linesOffsetX.length = 0;

                switch (_hAlign) {
                  case HorizontalTextAlignment.LEFT:
                    for (var i = 0; i < _numberOfLines; ++i) {
                      _linesOffsetX.push(0);
                    }

                    break;

                  case HorizontalTextAlignment.CENTER:
                    for (var _i = 0, l = _linesWidth.length; _i < l; _i++) {
                      _linesOffsetX.push((_contentSize.width - _linesWidth[_i]) / 2);
                    }

                    break;

                  case HorizontalTextAlignment.RIGHT:
                    for (var _i2 = 0, _l = _linesWidth.length; _i2 < _l; _i2++) {
                      _linesOffsetX.push(_contentSize.width - _linesWidth[_i2]);
                    }

                    break;
                }

                _letterOffsetY = _contentSize.height;

                if (_vAlign !== VerticalTextAlignment.TOP) {
                  var blank = _contentSize.height - _textDesiredHeight + _lineHeight * this._getFontScale() - _originFontSize * _bmfontScale;

                  if (_vAlign === VerticalTextAlignment.BOTTOM) {
                    _letterOffsetY -= blank;
                  } else {
                    _letterOffsetY -= blank / 2;
                  }
                }
              },
              _setupBMFontOverflowMetrics: function _setupBMFontOverflowMetrics() {
                var newWidth = _contentSize.width;
                var newHeight = _contentSize.height;

                if (_overflow === Overflow$1.RESIZE_HEIGHT) {
                  newHeight = 0;
                }

                if (_overflow === Overflow$1.NONE) {
                  newWidth = 0;
                  newHeight = 0;
                }

                _labelWidth = newWidth;
                _labelHeight = newHeight;
                _labelDimensions.width = newWidth;
                _labelDimensions.height = newHeight;
                _maxLineWidth = newWidth;
              }
            };

            var tempColor = new Color(255, 255, 255, 255);
            var bmfont = {
              createData: function createData(comp) {
                return comp.requestRenderData();
              },
              fillBuffers: function fillBuffers(comp, renderer) {
                var node = comp.node;

                comp._setCacheAlpha(node._uiProps.opacity);

                tempColor.set(comp.color);
                tempColor.a = node._uiProps.opacity * 255;
                fillMeshVertices3D(node, renderer, comp.renderData, tempColor);
              },
              appendQuad: function appendQuad(comp, spriteFrame, rect, rotated, x, y, scale) {
                var renderData = comp.renderData;

                if (!renderData) {
                  return;
                }

                var dataOffset = renderData.dataLength;
                renderData.dataLength += 4;
                renderData.vertexCount = renderData.dataLength;
                renderData.indicesCount = renderData.dataLength / 2 * 3;
                var dataList = renderData.data;
                var texW = spriteFrame.width;
                var texH = spriteFrame.height;
                var rectWidth = rect.width;
                var rectHeight = rect.height;
                var l = 0;
                var b = 0;
                var t = 0;
                var r = 0;

                if (!rotated) {
                  l = rect.x / texW;
                  r = (rect.x + rectWidth) / texW;
                  b = (rect.y + rectHeight) / texH;
                  t = rect.y / texH;
                  dataList[dataOffset].u = l;
                  dataList[dataOffset].v = b;
                  dataList[dataOffset + 1].u = r;
                  dataList[dataOffset + 1].v = b;
                  dataList[dataOffset + 2].u = l;
                  dataList[dataOffset + 2].v = t;
                  dataList[dataOffset + 3].u = r;
                  dataList[dataOffset + 3].v = t;
                } else {
                  l = rect.x / texW;
                  r = (rect.x + rectHeight) / texW;
                  b = (rect.y + rectWidth) / texH;
                  t = rect.y / texH;
                  dataList[dataOffset].u = l;
                  dataList[dataOffset].v = t;
                  dataList[dataOffset + 1].u = l;
                  dataList[dataOffset + 1].v = b;
                  dataList[dataOffset + 2].u = r;
                  dataList[dataOffset + 2].v = t;
                  dataList[dataOffset + 3].u = r;
                  dataList[dataOffset + 3].v = b;
                }

                dataList[dataOffset].x = x;
                dataList[dataOffset].y = y - rectHeight * scale;
                dataList[dataOffset + 1].x = x + rectWidth * scale;
                dataList[dataOffset + 1].y = y - rectHeight * scale;
                dataList[dataOffset + 2].x = x;
                dataList[dataOffset + 2].y = y;
                dataList[dataOffset + 3].x = x + rectWidth * scale;
                dataList[dataOffset + 3].y = y;
              }
            };
            addon(bmfont, bmfontUtils);

            var _atlasWidth = 1024;
            var _atlasHeight = 1024;
            var _shareAtlas = null;
            var letterFont = mixin(bmfontUtils, {
              getAssemblerData: function getAssemblerData() {
                if (!_shareAtlas) {
                  _shareAtlas = new LetterAtlas(_atlasWidth, _atlasHeight);
                }

                return _shareAtlas.getTexture();
              },
              _updateFontFamily: function _updateFontFamily(comp) {
                shareLabelInfo.fontAtlas = _shareAtlas;
                shareLabelInfo.fontFamily = this._getFontFamily(comp);
                var outline = comp.getComponent(LabelOutline);

                if (outline && outline.enabled) {
                  shareLabelInfo.isOutlined = true;
                  shareLabelInfo.margin = outline.width;
                  shareLabelInfo.out = outline.color.clone();
                  shareLabelInfo.out.a = outline.color.a * comp.color.a / 255.0;
                } else {
                  shareLabelInfo.isOutlined = false;
                  shareLabelInfo.margin = 0;
                }
              },
              _getFontFamily: function _getFontFamily(comp) {
                var fontFamily = 'Arial';

                if (!comp.useSystemFont) {
                  if (comp.font) {
                    if (comp.font._nativeAsset) {
                      fontFamily = comp.font._nativeAsset;
                    } else {
                      assetManager.postLoadNative(comp.font, function (err) {
                        if (!comp.isValid) {
                          return;
                        }

                        fontFamily = comp.font._nativeAsset || 'Arial';
                        comp.updateRenderData(true);
                      });
                    }
                  }
                } else {
                  fontFamily = comp.fontFamily || 'Arial';
                }

                return fontFamily;
              },
              _updateLabelInfo: function _updateLabelInfo(comp) {
                shareLabelInfo.fontDesc = this._getFontDesc();
                shareLabelInfo.color = comp.color;
                shareLabelInfo.hash = computeHash(shareLabelInfo);
              },
              _getFontDesc: function _getFontDesc() {
                var fontDesc = shareLabelInfo.fontSize.toString() + "px ";
                fontDesc += shareLabelInfo.fontFamily;

                return fontDesc;
              },
              _computeHorizontalKerningForText: function _computeHorizontalKerningForText() {},
              _determineRect: function _determineRect(tempRect) {
                return false;
              }
            });

            var WHITE = new Color(255, 255, 255, 255);
            var letter = {
              createData: function createData(comp) {
                return comp.requestRenderData();
              },
              fillBuffers: function fillBuffers(comp, renderer) {
                if (!comp.renderData) {
                  return;
                }

                var node = comp.node;

                comp._setCacheAlpha(node._uiProps.opacity);

                WHITE.a = node._uiProps.opacity * 255;
                fillMeshVertices3D(node, renderer, comp.renderData, WHITE);
              },
              appendQuad: bmfont.appendQuad
            };
            addon(letter, letterFont);

            var Overflow = Label.Overflow;
            var MAX_SIZE = 2048;

            var _BASELINE_OFFSET = getBaselineOffset();

            var _invisibleAlpha = (1 / 255).toFixed(3);

            var _context = null;
            var _canvas = null;
            var _texture = null;
            var _fontDesc = '';
            var _string$1 = '';
            var _fontSize$1 = 0;
            var _drawFontsize = 0;
            var _splitStrings = [];

            var _canvasSize = new Size();

            var _lineHeight$1 = 0;
            var _hAlign$1 = 0;
            var _vAlign$1 = 0;

            var _color = new Color();

            var _alpha = 1;
            var _fontFamily = '';
            var _overflow$1 = Overflow.NONE;
            var _isWrapText$1 = false;
            var _outlineComp = null;

            var _outlineColor = Color.BLACK.clone();

            var _shadowComp = null;

            var _shadowColor = Color.BLACK.clone();

            var _canvasPadding = new Rect();

            var _contentSizeExtend = Size.ZERO.clone();

            var _nodeContentSize = Size.ZERO.clone();

            var _startPosition = Vec2.ZERO.clone();

            var _drawUnderlinePos = Vec2.ZERO.clone();

            var _drawUnderlineWidth = 0;
            var _underlineThickness = 0;
            var _isBold = false;
            var _isItalic = false;
            var _isUnderline = false;
            var Alignment = ['left', 'center', 'right'];
            var ttfUtils = {
              getAssemblerData: function getAssemblerData() {
                var sharedLabelData = Label._canvasPool.get();

                return sharedLabelData;
              },
              resetAssemblerData: function resetAssemblerData(assemblerData) {
                if (assemblerData) {
                  Label._canvasPool.put(assemblerData);
                }
              },
              updateRenderData: function updateRenderData(comp) {
                if (!comp.renderData || !comp.renderData.vertDirty) {
                  return;
                }

                var trans = comp.node._uiProps.uiTransformComp;

                this._updateFontFamily(comp);

                this._updateProperties(comp, trans);

                this._calculateLabelFont();

                this._updateLabelDimensions();

                this._resetDynamicAtlas(comp);

                this._updateTexture(comp);

                this.updateOpacity(comp);

                comp._setCacheAlpha(_alpha);

                this._calDynamicAtlas(comp);

                comp.actualFontSize = _fontSize$1;
                trans.setContentSize(_canvasSize);
                this.updateVertexData(comp);
                this.updateUvs(comp);
                comp.markForUpdateRenderData(false);
                _context = null;
                _canvas = null;
                _texture = null;
              },
              updateVertexData: function updateVertexData(comp) {},
              updateUvs: function updateUvs(comp) {},
              updateOpacity: function updateOpacity(comp) {
                var vData = comp.renderData.vData;
                var colorOffset = 5;
                var colorA = comp.node._uiProps.opacity;

                for (var i = 0; i < 4; i++) {
                  vData[colorOffset + 3] = colorA;
                  colorOffset += 9;
                }
              },
              _updateFontFamily: function _updateFontFamily(comp) {
                if (!comp.useSystemFont) {
                  if (comp.font) {
                    if (comp.font._nativeAsset) {
                      _fontFamily = comp.font._nativeAsset;
                    } else {
                      assetManager.postLoadNative(comp.font, function (err) {
                        if (!comp.isValid) {
                          return;
                        }

                        _fontFamily = comp.font._nativeAsset || 'Arial';
                        comp.updateRenderData(true);
                      });
                      _fontFamily = 'Arial';
                    }
                  } else {
                    _fontFamily = 'Arial';
                  }
                } else {
                  _fontFamily = comp.fontFamily || 'Arial';
                }
              },
              _updateProperties: function _updateProperties(comp, trans) {
                var assemblerData = comp.assemblerData;

                if (!assemblerData) {
                  return;
                }

                _context = assemblerData.context;
                _canvas = assemblerData.canvas;
                _texture = comp.spriteFrame;
                _string$1 = comp.string.toString();
                _fontSize$1 = comp.fontSize;
                _drawFontsize = _fontSize$1;
                _overflow$1 = comp.overflow;
                _nodeContentSize.width = _canvasSize.width = trans.width;
                _nodeContentSize.height = _canvasSize.height = trans.height;
                _underlineThickness = comp.underlineHeight;
                _lineHeight$1 = comp.lineHeight;
                _hAlign$1 = comp.horizontalAlign;
                _vAlign$1 = comp.verticalAlign;
                _color = comp.color;
                _alpha = comp.node._uiProps.opacity;
                _isBold = comp.isBold;
                _isItalic = comp.isItalic;
                _isUnderline = comp.isUnderline;

                if (_overflow$1 === Overflow.NONE) {
                  _isWrapText$1 = false;
                } else if (_overflow$1 === Overflow.RESIZE_HEIGHT) {
                  _isWrapText$1 = true;
                } else {
                  _isWrapText$1 = comp.enableWrapText;
                }

                _outlineComp = LabelOutline && comp.getComponent(LabelOutline);
                _outlineComp = _outlineComp && _outlineComp.enabled && _outlineComp.width > 0 ? _outlineComp : null;

                if (_outlineComp) {
                  _outlineColor.set(_outlineComp.color);
                }

                _shadowComp = LabelShadow && comp.getComponent(LabelShadow);
                _shadowComp = _shadowComp && _shadowComp.enabled ? _shadowComp : null;

                if (_shadowComp) {
                  _shadowColor.set(_shadowComp.color);
                }

                this._updatePaddingRect();
              },
              _updatePaddingRect: function _updatePaddingRect() {
                var top = 0;
                var bottom = 0;
                var left = 0;
                var right = 0;
                var outlineWidth = 0;
                _contentSizeExtend.width = _contentSizeExtend.height = 0;

                if (_outlineComp) {
                  outlineWidth = _outlineComp.width;
                  top = bottom = left = right = outlineWidth;
                  _contentSizeExtend.width = _contentSizeExtend.height = outlineWidth * 2;
                }

                if (_shadowComp) {
                  var shadowWidth = _shadowComp.blur + outlineWidth;
                  var offsetX = _shadowComp.offset.x;
                  var offsetY = _shadowComp.offset.y;
                  left = Math.max(left, -offsetX + shadowWidth);
                  right = Math.max(right, offsetX + shadowWidth);
                  top = Math.max(top, offsetY + shadowWidth);
                  bottom = Math.max(bottom, -offsetY + shadowWidth);
                }

                if (_isItalic) {
                  var offset = _drawFontsize * Math.tan(12 * 0.0174532925);

                  right += offset;
                  _contentSizeExtend.width += offset;
                }

                _canvasPadding.x = left;
                _canvasPadding.y = top;
                _canvasPadding.width = left + right;
                _canvasPadding.height = top + bottom;
              },
              _calculateFillTextStartPosition: function _calculateFillTextStartPosition() {
                var labelX = 0;

                if (_hAlign$1 === HorizontalTextAlignment.RIGHT) {
                  labelX = _canvasSize.width - _canvasPadding.width;
                } else if (_hAlign$1 === HorizontalTextAlignment.CENTER) {
                  labelX = (_canvasSize.width - _canvasPadding.width) / 2;
                }

                var lineHeight = this._getLineHeight();

                var drawStartY = lineHeight * (_splitStrings.length - 1);
                var firstLinelabelY = _fontSize$1 * (1 - BASELINE_RATIO / 2);

                if (_vAlign$1 !== VerticalTextAlignment.TOP) {
                  var blank = drawStartY + _canvasPadding.height + _fontSize$1 - _canvasSize.height;

                  if (_vAlign$1 === VerticalTextAlignment.BOTTOM) {
                    blank += BASELINE_RATIO / 2 * _fontSize$1;
                    firstLinelabelY -= blank;
                  } else {
                    firstLinelabelY -= blank / 2;
                  }
                }

                firstLinelabelY += _BASELINE_OFFSET * _fontSize$1;

                _startPosition.set(labelX + _canvasPadding.x, firstLinelabelY + _canvasPadding.y);
              },
              _updateTexture: function _updateTexture(comp) {
                if (!_context || !_canvas) {
                  return;
                }

                _context.clearRect(0, 0, _canvas.width, _canvas.height);

                _context.font = _fontDesc;

                this._calculateFillTextStartPosition();

                var lineHeight = this._getLineHeight();

                _context.lineJoin = 'round';

                if (comp._srcBlendFactor === BlendFactor.SRC_ALPHA) {
                  _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", " + _invisibleAlpha + ")";

                  _context.fillRect(0, 0, _canvas.width, _canvas.height);
                }

                _context.fillStyle = "rgb(" + _color.r + ", " + _color.g + ", " + _color.b + ")";
                var drawTextPosX = _startPosition.x;
                var drawTextPosY = 0;

                this._drawTextEffect(_startPosition, lineHeight);

                for (var i = 0; i < _splitStrings.length; ++i) {
                  drawTextPosY = _startPosition.y + i * lineHeight;

                  if (_outlineComp) {
                    _context.strokeText(_splitStrings[i], drawTextPosX, drawTextPosY);
                  }

                  _context.fillText(_splitStrings[i], drawTextPosX, drawTextPosY);
                }

                if (_shadowComp) {
                  _context.shadowColor = 'transparent';
                }

                if (_texture) {
                  var tex;

                  if (_texture instanceof SpriteFrame) {
                    tex = _texture.texture;
                  } else {
                    tex = _texture;
                  }

                  var uploadAgain = _canvas.width !== 0 && _canvas.height !== 0;

                  if (uploadAgain) {
                    tex.reset({
                      width: _canvas.width,
                      height: _canvas.height,
                      mipmapLevel: 1
                    });
                    tex.uploadData(_canvas);

                    if (_texture instanceof SpriteFrame) {
                      _texture.rect = new Rect(0, 0, _canvas.width, _canvas.height);

                      _texture._calculateUV();
                    }

                    if (legacyCC.director.root && legacyCC.director.root.batcher2D) {
                      legacyCC.director.root.batcher2D._releaseDescriptorSetCache(tex.getHash());
                    }
                  }
                }
              },
              _resetDynamicAtlas: function _resetDynamicAtlas(comp) {
                if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
                var frame = comp.ttfSpriteFrame;
                dynamicAtlasManager.deleteAtlasSpriteFrame(frame);

                frame._resetDynamicAtlasFrame();
              },
              _calDynamicAtlas: function _calDynamicAtlas(comp) {
                if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
                var frame = comp.ttfSpriteFrame;
                dynamicAtlasManager.packToDynamicAtlas(comp, frame);
                comp.renderData.uvDirty = true;
              },
              _setupOutline: function _setupOutline() {
                _context.strokeStyle = "rgba(" + _outlineColor.r + ", " + _outlineColor.g + ", " + _outlineColor.b + ", " + _outlineColor.a / 255 + ")";
                _context.lineWidth = _outlineComp.width * 2;
              },
              _setupShadow: function _setupShadow() {
                _context.shadowColor = "rgba(" + _shadowColor.r + ", " + _shadowColor.g + ", " + _shadowColor.b + ", " + _shadowColor.a / 255 + ")";
                _context.shadowBlur = _shadowComp.blur;
                _context.shadowOffsetX = _shadowComp.offset.x;
                _context.shadowOffsetY = -_shadowComp.offset.y;
              },
              _drawTextEffect: function _drawTextEffect(startPosition, lineHeight) {
                if (!_shadowComp && !_outlineComp && !_isUnderline) return;
                var isMultiple = _splitStrings.length > 1 && _shadowComp;

                var measureText = this._measureText(_context, _fontDesc);

                var drawTextPosX = 0;
                var drawTextPosY = 0;

                if (_shadowComp) {
                  this._setupShadow();
                }

                if (_outlineComp) {
                  this._setupOutline();
                }

                for (var i = 0; i < _splitStrings.length; ++i) {
                  drawTextPosX = startPosition.x;
                  drawTextPosY = startPosition.y + i * lineHeight;

                  if (isMultiple) {
                    if (_outlineComp) {
                      _context.strokeText(_splitStrings[i], drawTextPosX, drawTextPosY);
                    }

                    _context.fillText(_splitStrings[i], drawTextPosX, drawTextPosY);
                  }

                  if (_isUnderline) {
                    _drawUnderlineWidth = measureText(_splitStrings[i]);

                    if (_hAlign$1 === HorizontalTextAlignment.RIGHT) {
                      _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth;
                    } else if (_hAlign$1 === HorizontalTextAlignment.CENTER) {
                      _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth / 2;
                    } else {
                      _drawUnderlinePos.x = startPosition.x;
                    }

                    _drawUnderlinePos.y = drawTextPosY + _drawFontsize / 8;

                    _context.fillRect(_drawUnderlinePos.x, _drawUnderlinePos.y, _drawUnderlineWidth, _underlineThickness);
                  }
                }

                if (isMultiple) {
                  _context.shadowColor = 'transparent';
                }
              },
              _updateLabelDimensions: function _updateLabelDimensions() {
                _canvasSize.width = Math.min(_canvasSize.width, MAX_SIZE);
                _canvasSize.height = Math.min(_canvasSize.height, MAX_SIZE);
                var recreate = false;

                if (_canvas.width !== _canvasSize.width) {
                  _canvas.width = _canvasSize.width;
                  recreate = true;
                }

                if (_canvas.height !== _canvasSize.height) {
                  _canvas.height = _canvasSize.height;
                  recreate = true;
                }

                if (recreate) _context.font = _fontDesc;
                _context.textAlign = Alignment[_hAlign$1];
                _context.textBaseline = 'alphabetic';
              },
              _getFontDesc: function _getFontDesc() {
                var fontDesc = _fontSize$1.toString() + "px ";
                fontDesc += _fontFamily;

                if (_isBold) {
                  fontDesc = "bold " + fontDesc;
                }

                if (_isItalic) {
                  fontDesc = "italic " + fontDesc;
                }

                return fontDesc;
              },
              _getLineHeight: function _getLineHeight() {
                var nodeSpacingY = _lineHeight$1;

                if (nodeSpacingY === 0) {
                  nodeSpacingY = _fontSize$1;
                } else {
                  nodeSpacingY = nodeSpacingY * _fontSize$1 / _drawFontsize;
                }

                return nodeSpacingY | 0;
              },
              _calculateParagraphLength: function _calculateParagraphLength(paragraphedStrings, ctx) {
                var paragraphLength = [];

                for (var _iterator = _createForOfIteratorHelperLoose(paragraphedStrings), _step; !(_step = _iterator()).done;) {
                  var para = _step.value;
                  var width = safeMeasureText(ctx, para, _fontDesc);
                  paragraphLength.push(width);
                }

                return paragraphLength;
              },
              _measureText: function _measureText(ctx, fontDesc) {
                return function (string) {
                  return safeMeasureText(ctx, string, fontDesc);
                };
              },
              _calculateShrinkFont: function _calculateShrinkFont(paragraphedStrings) {
                if (!_context) return;

                var paragraphLength = this._calculateParagraphLength(paragraphedStrings, _context);

                var i = 0;
                var totalHeight = 0;
                var maxLength = 0;

                if (_isWrapText$1) {
                  var canvasWidthNoMargin = _nodeContentSize.width;
                  var canvasHeightNoMargin = _nodeContentSize.height;

                  if (canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
                    return;
                  }

                  totalHeight = canvasHeightNoMargin + 1;
                  var actualFontSize = _fontSize$1 + 1;
                  var textFragment = [];
                  var left = 0;
                  var right = actualFontSize | 0;
                  var mid = 0;

                  while (left < right) {
                    mid = left + right + 1 >> 1;

                    if (mid <= 0) {
                      logID(4003);
                      break;
                    }

                    _fontSize$1 = mid;
                    _fontDesc = this._getFontDesc();
                    _context.font = _fontDesc;

                    var lineHeight = this._getLineHeight();

                    totalHeight = 0;

                    for (i = 0; i < paragraphedStrings.length; ++i) {
                      var allWidth = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
                      textFragment = fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
                      totalHeight += textFragment.length * lineHeight;
                    }

                    if (totalHeight > canvasHeightNoMargin) {
                      right = mid - 1;
                    } else {
                      left = mid;
                    }
                  }

                  if (left === 0) {
                    logID(4003);
                  } else {
                    _fontSize$1 = left;
                    _fontDesc = this._getFontDesc();
                    _context.font = _fontDesc;
                  }
                } else {
                  totalHeight = paragraphedStrings.length * this._getLineHeight();

                  for (i = 0; i < paragraphedStrings.length; ++i) {
                    if (maxLength < paragraphLength[i]) {
                      maxLength = paragraphLength[i];
                    }
                  }

                  var scaleX = (_canvasSize.width - _canvasPadding.width) / maxLength;
                  var scaleY = _canvasSize.height / totalHeight;
                  _fontSize$1 = _drawFontsize * Math.min(1, scaleX, scaleY) | 0;
                  _fontDesc = this._getFontDesc();
                  _context.font = _fontDesc;
                }
              },
              _calculateWrapText: function _calculateWrapText(paragraphedStrings) {
                if (!_isWrapText$1 || !_context) return;
                _splitStrings = [];
                var canvasWidthNoMargin = _nodeContentSize.width;

                for (var i = 0; i < paragraphedStrings.length; ++i) {
                  var allWidth = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
                  var textFragment = fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
                  _splitStrings = _splitStrings.concat(textFragment);
                }
              },
              _calculateLabelFont: function _calculateLabelFont() {
                if (!_context) {
                  return;
                }

                var paragraphedStrings = _string$1.split('\n');

                _splitStrings = paragraphedStrings;
                _fontDesc = this._getFontDesc();
                _context.font = _fontDesc;

                switch (_overflow$1) {
                  case Overflow.NONE:
                    {
                      var canvasSizeX = 0;
                      var canvasSizeY = 0;

                      for (var i = 0; i < paragraphedStrings.length; ++i) {
                        var paraLength = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
                        canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
                      }

                      canvasSizeY = (_splitStrings.length + BASELINE_RATIO) * this._getLineHeight();
                      var rawWidth = parseFloat(canvasSizeX.toFixed(2));
                      var rawHeight = parseFloat(canvasSizeY.toFixed(2));
                      _canvasSize.width = rawWidth + _canvasPadding.width;
                      _canvasSize.height = rawHeight + _canvasPadding.height;
                      _nodeContentSize.width = rawWidth + _contentSizeExtend.width;
                      _nodeContentSize.height = rawHeight + _contentSizeExtend.height;
                      break;
                    }

                  case Overflow.SHRINK:
                    {
                      this._calculateShrinkFont(paragraphedStrings);

                      this._calculateWrapText(paragraphedStrings);

                      break;
                    }

                  case Overflow.CLAMP:
                    {
                      this._calculateWrapText(paragraphedStrings);

                      break;
                    }

                  case Overflow.RESIZE_HEIGHT:
                    {
                      this._calculateWrapText(paragraphedStrings);

                      var _rawHeight = (_splitStrings.length + BASELINE_RATIO) * this._getLineHeight();

                      _canvasSize.height = _rawHeight + _canvasPadding.height;
                      _nodeContentSize.height = _rawHeight + _contentSizeExtend.height;
                      break;
                    }
                }
              }
            };

            var WHITE$1 = Color.WHITE.clone();
            var ttf = {
              createData: function createData(comp) {
                var renderData = comp.requestRenderData();
                renderData.dataLength = 4;
                renderData.vertexCount = 4;
                renderData.indicesCount = 6;
                var vData = renderData.vData = new Float32Array(4 * 9);
                vData[3] = vData[21] = vData[22] = vData[31] = 0;
                vData[4] = vData[12] = vData[13] = vData[30] = 1;
                var offset = 5;

                for (var i = 0; i < 4; i++) {
                  Color.toArray(vData, WHITE$1, offset);
                  offset += 9;
                }

                return renderData;
              },
              fillBuffers: function fillBuffers(comp, renderer) {
                var renderData = comp.renderData;
                var dataList = renderData.data;
                var node = comp.node;
                var buffer = renderer.acquireBufferBatch();
                var vertexOffset = buffer.byteOffset >> 2;
                var indicesOffset = buffer.indicesOffset;
                var vertexId = buffer.vertexOffset;
                var isRecreate = buffer.request();

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  indicesOffset = 0;
                  vertexId = 0;
                  vertexOffset = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                var vData = renderData.vData;
                var data0 = dataList[0];
                var data3 = dataList[3];
                node.updateWorldTransform();
                var pos = node._pos;
                var rot = node._rot;
                var scale = node._scale;
                var ax = data0.x * scale.x;
                var bx = data3.x * scale.x;
                var ay = data0.y * scale.y;
                var by = data3.y * scale.y;
                var qx = rot.x;
                var qy = rot.y;
                var qz = rot.z;
                var qw = rot.w;
                var qxy = qx * qy;
                var qzw = qz * qw;
                var qxy2 = qx * qx - qy * qy;
                var qzw2 = qw * qw - qz * qz;
                var cx1 = qzw2 + qxy2;
                var cx2 = (qxy - qzw) * 2;
                var cy1 = qzw2 - qxy2;
                var cy2 = (qxy + qzw) * 2;
                var x = pos.x;
                var y = pos.y;
                vData[0] = cx1 * ax + cx2 * ay + x;
                vData[1] = cy1 * ay + cy2 * ax + y;
                vData[9] = cx1 * bx + cx2 * ay + x;
                vData[10] = cy1 * ay + cy2 * bx + y;
                vData[18] = cx1 * ax + cx2 * by + x;
                vData[19] = cy1 * by + cy2 * ax + y;
                vData[27] = cx1 * bx + cx2 * by + x;
                vData[28] = cy1 * by + cy2 * bx + y;
                vBuf.set(vData, vertexOffset);
                iBuf[indicesOffset++] = vertexId;
                iBuf[indicesOffset++] = vertexId + 1;
                iBuf[indicesOffset++] = vertexId + 2;
                iBuf[indicesOffset++] = vertexId + 2;
                iBuf[indicesOffset++] = vertexId + 1;
                iBuf[indicesOffset++] = vertexId + 3;
              },
              updateVertexData: function updateVertexData(comp) {
                var renderData = comp.renderData;

                if (!renderData) {
                  return;
                }

                var uiTrans = comp.node._uiProps.uiTransformComp;
                var width = uiTrans.width;
                var height = uiTrans.height;
                var appX = uiTrans.anchorX * width;
                var appY = uiTrans.anchorY * height;
                var data = renderData.data;
                data[0].x = -appX;
                data[0].y = -appY;
                data[3].x = width - appX;
                data[3].y = height - appY;
              },
              updateUvs: function updateUvs(comp) {
                var renderData = comp.renderData;

                if (!renderData) {
                  return;
                }

                var vData = renderData.vData;

                if (!vData || !renderData.uvDirty) {
                  return;
                }

                var uv = comp.ttfSpriteFrame.uv;
                vData[3] = uv[0];
                vData[4] = uv[1];
                vData[12] = uv[2];
                vData[13] = uv[3];
                vData[21] = uv[4];
                vData[22] = uv[5];
                vData[30] = uv[6];
                vData[31] = uv[7];
                renderData.uvDirty = false;
              }
            };
            addon(ttf, ttfUtils);

            var labelAssembler = exports('l', {
              getAssembler: function getAssembler(comp) {
                var assembler = ttf;

                if (comp.font instanceof BitmapFont) {
                  assembler = bmfont;
                } else if (comp.cacheMode === Label.CacheMode.CHAR) {
                  assembler = letter;
                }

                return assembler;
              }
            });
            Label.Assembler = labelAssembler;

            var FillType = Sprite.FillType;
            var matrix = new Mat4();
            var tempColor$1 = new Color(255, 255, 255, 255);
            var barFilled = {
              useModel: false,
              updateRenderData: function updateRenderData(sprite) {
                var frame = sprite.spriteFrame;
                dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
                var renderData = sprite.renderData;

                if (renderData && frame) {
                  var uvDirty = renderData.uvDirty;
                  var vertDirty = renderData.vertDirty;

                  if (!uvDirty && !vertDirty) {
                    return;
                  }

                  var fillStart = sprite.fillStart;
                  var fillRange = sprite.fillRange;

                  if (fillRange < 0) {
                    fillStart += fillRange;
                    fillRange = -fillRange;
                  }

                  fillRange = fillStart + fillRange;
                  fillStart = fillStart > 1.0 ? 1.0 : fillStart;
                  fillStart = fillStart < 0.0 ? 0.0 : fillStart;
                  fillRange = fillRange > 1.0 ? 1.0 : fillRange;
                  fillRange = fillRange < 0.0 ? 0.0 : fillRange;
                  fillRange -= fillStart;
                  fillRange = fillRange < 0 ? 0 : fillRange;
                  var fillEnd = fillStart + fillRange;
                  fillEnd = fillEnd > 1 ? 1 : fillEnd;

                  if (uvDirty) {
                    this.updateUVs(sprite, fillStart, fillEnd);
                  }

                  if (vertDirty) {
                    if (this.updateVertexData) {
                      this.updateVertexData(sprite, fillStart, fillEnd);
                    }

                    this.updateWorldVertexData(sprite);
                  }
                }
              },
              updateUVs: function updateUVs(sprite, fillStart, fillEnd) {
                var spriteFrame = sprite.spriteFrame;
                var renderData = sprite.renderData;
                var dataList = renderData.data;
                var atlasWidth = spriteFrame.width;
                var atlasHeight = spriteFrame.height;
                var textureRect = spriteFrame.getRect();
                var ul = 0;
                var vb = 0;
                var ur = 0;
                var vt = 0;
                var quadUV0 = 0;
                var quadUV1 = 0;
                var quadUV2 = 0;
                var quadUV3 = 0;
                var quadUV4 = 0;
                var quadUV5 = 0;
                var quadUV6 = 0;
                var quadUV7 = 0;

                if (spriteFrame.isRotated()) {
                  ul = textureRect.x / atlasWidth;
                  vb = (textureRect.y + textureRect.width) / atlasHeight;
                  ur = (textureRect.x + textureRect.height) / atlasWidth;
                  vt = textureRect.y / atlasHeight;
                  quadUV0 = quadUV2 = ul;
                  quadUV4 = quadUV6 = ur;
                  quadUV3 = quadUV7 = vb;
                  quadUV1 = quadUV5 = vt;
                } else {
                  ul = textureRect.x / atlasWidth;
                  vb = (textureRect.y + textureRect.height) / atlasHeight;
                  ur = (textureRect.x + textureRect.width) / atlasWidth;
                  vt = textureRect.y / atlasHeight;
                  quadUV0 = quadUV4 = ul;
                  quadUV2 = quadUV6 = ur;
                  quadUV1 = quadUV3 = vb;
                  quadUV5 = quadUV7 = vt;
                }

                switch (sprite.fillType) {
                  case FillType.HORIZONTAL:
                    dataList[0].u = quadUV0 + (quadUV2 - quadUV0) * fillStart;
                    dataList[0].v = quadUV1 + (quadUV3 - quadUV1) * fillStart;
                    dataList[1].u = quadUV0 + (quadUV2 - quadUV0) * fillEnd;
                    dataList[1].v = quadUV1 + (quadUV3 - quadUV1) * fillEnd;
                    dataList[2].u = quadUV4 + (quadUV6 - quadUV4) * fillStart;
                    dataList[2].v = quadUV5 + (quadUV7 - quadUV5) * fillStart;
                    dataList[3].u = quadUV4 + (quadUV6 - quadUV4) * fillEnd;
                    dataList[3].v = quadUV5 + (quadUV7 - quadUV5) * fillEnd;
                    break;

                  case FillType.VERTICAL:
                    dataList[0].u = quadUV0 + (quadUV4 - quadUV0) * fillStart;
                    dataList[0].v = quadUV1 + (quadUV5 - quadUV1) * fillStart;
                    dataList[1].u = quadUV2 + (quadUV6 - quadUV2) * fillStart;
                    dataList[1].v = quadUV3 + (quadUV7 - quadUV3) * fillStart;
                    dataList[2].u = quadUV0 + (quadUV4 - quadUV0) * fillEnd;
                    dataList[2].v = quadUV1 + (quadUV5 - quadUV1) * fillEnd;
                    dataList[3].u = quadUV2 + (quadUV6 - quadUV2) * fillEnd;
                    dataList[3].v = quadUV3 + (quadUV7 - quadUV3) * fillEnd;
                    break;

                  default:
                    errorID(2626);
                    break;
                }

                renderData.uvDirty = false;
              },
              updateVertexData: function updateVertexData(sprite, fillStart, fillEnd) {
                var renderData = sprite.renderData;
                var dataList = renderData.data;
                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var width = uiTrans.width;
                var height = uiTrans.height;
                var appX = uiTrans.anchorX * width;
                var appY = uiTrans.anchorY * height;
                var l = -appX;
                var b = -appY;
                var r = width - appX;
                var t = height - appY;
                var progressStart = 0;
                var progressEnd = 0;

                switch (sprite.fillType) {
                  case FillType.HORIZONTAL:
                    progressStart = l + (r - l) * fillStart;
                    progressEnd = l + (r - l) * fillEnd;
                    l = progressStart;
                    r = progressEnd;
                    break;

                  case FillType.VERTICAL:
                    progressStart = b + (t - b) * fillStart;
                    progressEnd = b + (t - b) * fillEnd;
                    b = progressStart;
                    t = progressEnd;
                    break;

                  default:
                    errorID(2626);
                    break;
                }

                dataList[4].x = l;
                dataList[4].y = b;
                dataList[5].x = r;
                dataList[5].y = b;
                dataList[6].x = l;
                dataList[6].y = t;
                dataList[7].x = r;
                dataList[7].y = t;
                renderData.vertDirty = false;
              },
              createData: function createData(sprite) {
                var renderData = sprite.requestRenderData();
                renderData.dataLength = 8;
                renderData.vertexCount = 4;
                renderData.indicesCount = 6;
                var dataList = renderData.data;

                for (var _iterator = _createForOfIteratorHelperLoose(dataList), _step; !(_step = _iterator()).done;) {
                  var data = _step.value;
                  data.z = 0;
                }

                return renderData;
              },
              updateWorldVertexData: function updateWorldVertexData(sprite) {
                var node = sprite.node;
                var dataList = sprite.renderData.data;
                node.getWorldMatrix(matrix);

                for (var i = 0; i < 4; i++) {
                  var local = dataList[i + 4];
                  var world = dataList[i];
                  Vec3.transformMat4(world, local, matrix);
                }
              },
              fillBuffers: function fillBuffers(sprite, renderer) {
                if (sprite.node.hasChangedFlags) {
                  this.updateWorldVertexData(sprite);
                }

                var node = sprite.node;
                tempColor$1.set(sprite.color);
                tempColor$1.a = node._uiProps.opacity * 255;
                fillVerticesWithoutCalc3D(node, renderer, sprite.renderData, tempColor$1);
              },
              updateColor: function updateColor(sprite) {}
            };

            var PI_2 = Math.PI * 2;
            var EPSILON = 1e-6;
            var tempColor$2 = new Color(255, 255, 255, 255);
            var _vertPos = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

            var _vertices = new Array(4);

            var _uvs = new Array(8);

            var _intersectPoint_1 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
            var _intersectPoint_2 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

            var _center = new Vec2();

            var _triangles = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

            function _calcIntersectedPoints(left, right, bottom, top, center, angle, intersectPoints) {
              var sinAngle = Math.sin(angle);
              sinAngle = Math.abs(sinAngle) > EPSILON ? sinAngle : 0;
              var cosAngle = Math.cos(angle);
              cosAngle = Math.abs(cosAngle) > EPSILON ? cosAngle : 0;
              var tanAngle = 0;
              var cotAngle = 0;

              if (cosAngle !== 0) {
                tanAngle = sinAngle / cosAngle;

                if ((left - center.x) * cosAngle > 0) {
                  var yLeft = center.y + tanAngle * (left - center.x);
                  intersectPoints[0].x = left;
                  intersectPoints[0].y = yLeft;
                }

                if ((right - center.x) * cosAngle > 0) {
                  var yRight = center.y + tanAngle * (right - center.x);
                  intersectPoints[2].x = right;
                  intersectPoints[2].y = yRight;
                }
              }

              if (sinAngle !== 0) {
                cotAngle = cosAngle / sinAngle;

                if ((top - center.y) * sinAngle > 0) {
                  var xTop = center.x + cotAngle * (top - center.y);
                  intersectPoints[3].x = xTop;
                  intersectPoints[3].y = top;
                }

                if ((bottom - center.y) * sinAngle > 0) {
                  var xBottom = center.x + cotAngle * (bottom - center.y);
                  intersectPoints[1].x = xBottom;
                  intersectPoints[1].y = bottom;
                }
              }
            }

            function _calculateVertices(sprite) {
              var uiTrans = sprite.node._uiProps.uiTransformComp;
              var width = uiTrans.width;
              var height = uiTrans.height;
              var appX = uiTrans.anchorX * width;
              var appY = uiTrans.anchorY * height;
              var l = -appX;
              var b = -appY;
              var r = width - appX;
              var t = height - appY;
              var vertices = _vertices;
              vertices[0] = l;
              vertices[1] = b;
              vertices[2] = r;
              vertices[3] = t;
              var fillCenter = sprite.fillCenter;
              var cx = _center.x = Math.min(Math.max(0, fillCenter.x), 1) * (r - l) + l;
              var cy = _center.y = Math.min(Math.max(0, fillCenter.y), 1) * (t - b) + b;
              _vertPos[0].x = _vertPos[3].x = l;
              _vertPos[1].x = _vertPos[2].x = r;
              _vertPos[0].y = _vertPos[1].y = b;
              _vertPos[2].y = _vertPos[3].y = t;

              for (var _iterator = _createForOfIteratorHelperLoose(_triangles), _step; !(_step = _iterator()).done;) {
                var num = _step.value;
                Vec2.set(num, 0, 0);
              }

              if (cx !== vertices[0]) {
                Vec2.set(_triangles[0], 3, 0);
              }

              if (cx !== vertices[2]) {
                Vec2.set(_triangles[2], 1, 2);
              }

              if (cy !== vertices[1]) {
                Vec2.set(_triangles[1], 0, 1);
              }

              if (cy !== vertices[3]) {
                Vec2.set(_triangles[3], 2, 3);
              }
            }

            function _calculateUVs(spriteFrame) {
              var atlasWidth = spriteFrame.width;
              var atlasHeight = spriteFrame.height;
              var textureRect = spriteFrame.getRect();
              var u0 = 0;
              var u1 = 0;
              var v0 = 0;
              var v1 = 0;
              var uvs = _uvs;

              if (spriteFrame.isRotated()) {
                u0 = textureRect.x / atlasWidth;
                u1 = (textureRect.x + textureRect.height) / atlasWidth;
                v0 = textureRect.y / atlasHeight;
                v1 = (textureRect.y + textureRect.width) / atlasHeight;
                uvs[0] = uvs[2] = u0;
                uvs[4] = uvs[6] = u1;
                uvs[3] = uvs[7] = v1;
                uvs[1] = uvs[5] = v0;
              } else {
                u0 = textureRect.x / atlasWidth;
                u1 = (textureRect.x + textureRect.width) / atlasWidth;
                v0 = textureRect.y / atlasHeight;
                v1 = (textureRect.y + textureRect.height) / atlasHeight;
                uvs[0] = uvs[4] = u0;
                uvs[2] = uvs[6] = u1;
                uvs[1] = uvs[3] = v1;
                uvs[5] = uvs[7] = v0;
              }
            }

            function _getVertAngle(start, end) {
              var placementX = end.x - start.x;
              var placementY = end.y - start.y;

              if (placementX === 0 && placementY === 0) {
                return 0;
              } else if (placementX === 0) {
                if (placementY > 0) {
                  return Math.PI * 0.5;
                } else {
                  return Math.PI * 1.5;
                }
              } else {
                var angle = Math.atan(placementY / placementX);

                if (placementX < 0) {
                  angle += Math.PI;
                }

                return angle;
              }
            }

            function _generateTriangle(dataList, offset, vert0, vert1, vert2) {
              var vertices = _vertices;
              var v0x = vertices[0];
              var v0y = vertices[1];
              var v1x = vertices[2];
              var v1y = vertices[3];
              dataList[offset].x = vert0.x;
              dataList[offset].y = vert0.y;
              dataList[offset + 1].x = vert1.x;
              dataList[offset + 1].y = vert1.y;
              dataList[offset + 2].x = vert2.x;
              dataList[offset + 2].y = vert2.y;
              var progressX = 0;
              var progressY = 0;
              progressX = (vert0.x - v0x) / (v1x - v0x);
              progressY = (vert0.y - v0y) / (v1y - v0y);

              _generateUV(progressX, progressY, dataList, offset);

              progressX = (vert1.x - v0x) / (v1x - v0x);
              progressY = (vert1.y - v0y) / (v1y - v0y);

              _generateUV(progressX, progressY, dataList, offset + 1);

              progressX = (vert2.x - v0x) / (v1x - v0x);
              progressY = (vert2.y - v0y) / (v1y - v0y);

              _generateUV(progressX, progressY, dataList, offset + 2);
            }

            function _generateUV(progressX, progressY, data, offset) {
              var uvs = _uvs;
              var px1 = uvs[0] + (uvs[2] - uvs[0]) * progressX;
              var px2 = uvs[4] + (uvs[6] - uvs[4]) * progressX;
              var py1 = uvs[1] + (uvs[3] - uvs[1]) * progressX;
              var py2 = uvs[5] + (uvs[7] - uvs[5]) * progressX;
              var uv = data[offset];
              uv.u = px1 + (px2 - px1) * progressY;
              uv.v = py1 + (py2 - py1) * progressY;
            }

            var radialFilled = {
              useModel: false,
              createData: function createData(sprite) {
                return sprite.requestRenderData();
              },
              updateRenderData: function updateRenderData(sprite) {
                var frame = sprite.spriteFrame;
                dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
                var renderData = sprite.renderData;

                if (renderData && frame) {
                  if (renderData.vertDirty || renderData.uvDirty) {
                    var dataList = renderData.data;
                    var fillStart = sprite.fillStart;
                    var fillRange = sprite.fillRange;

                    if (fillRange < 0) {
                      fillStart += fillRange;
                      fillRange = -fillRange;
                    }

                    while (fillStart >= 1.0) {
                      fillStart -= 1.0;
                    }

                    while (fillStart < 0.0) {
                      fillStart += 1.0;
                    }

                    fillStart *= PI_2;
                    fillRange *= PI_2;
                    var fillEnd = fillStart + fillRange;

                    _calculateVertices(sprite);

                    _calculateUVs(frame);

                    _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart, _intersectPoint_1);

                    _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart + fillRange, _intersectPoint_2);

                    var offset = 0;

                    for (var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
                      var triangle = _triangles[triangleIndex];

                      if (!triangle) {
                        continue;
                      }

                      if (fillRange >= PI_2) {
                        renderData.dataLength = offset + 3;

                        _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);

                        offset += 3;
                        continue;
                      }

                      var startAngle = _getVertAngle(_center, _vertPos[triangle.x]);

                      var endAngle = _getVertAngle(_center, _vertPos[triangle.y]);

                      if (endAngle < startAngle) {
                        endAngle += PI_2;
                      }

                      startAngle -= PI_2;
                      endAngle -= PI_2;

                      for (var testIndex = 0; testIndex < 3; ++testIndex) {
                        if (startAngle >= fillEnd) ; else if (startAngle >= fillStart) {
                          renderData.dataLength = offset + 3;

                          if (endAngle >= fillEnd) {
                            _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _intersectPoint_2[triangleIndex]);
                          } else {
                            _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);
                          }

                          offset += 3;
                        } else if (endAngle > fillStart) {
                          if (endAngle <= fillEnd) {
                            renderData.dataLength = offset + 3;

                            _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _vertPos[triangle.y]);

                            offset += 3;
                          } else {
                            renderData.dataLength = offset + 3;

                            _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _intersectPoint_2[triangleIndex]);

                            offset += 3;
                          }
                        }

                        startAngle += PI_2;
                        endAngle += PI_2;
                      }
                    }

                    renderData.indicesCount = renderData.vertexCount = offset;
                    renderData.vertDirty = renderData.uvDirty = false;
                  }
                }
              },
              fillBuffers: function fillBuffers(comp, renderer) {
                var node = comp.node;
                var renderData = comp.renderData;
                tempColor$2.set(comp.color);
                tempColor$2.a = node._uiProps.opacity * 255;
                fillVertices3D(node, renderer, renderData, tempColor$2);
              },
              updateColor: function updateColor(sprite) {}
            };

            var vec3_temps$1 = [];

            for (var i$1 = 0; i$1 < 4; i$1++) {
              vec3_temps$1.push(new Vec3());
            }

            var simple = {
              createData: function createData(sprite) {
                var renderData = sprite.requestRenderData();
                renderData.dataLength = 4;
                renderData.vertexCount = 4;
                renderData.indicesCount = 6;
                renderData.vData = new Float32Array(4 * 9);
                return renderData;
              },
              updateRenderData: function updateRenderData(sprite) {
                var frame = sprite.spriteFrame;
                dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
                var renderData = sprite.renderData;

                if (renderData && frame) {
                  if (renderData.vertDirty) {
                    this.updateVertexData(sprite);
                  }

                  if (renderData.uvDirty) {
                    this.updateUvs(sprite);
                  }
                }
              },
              updateWorldVerts: function updateWorldVerts(sprite, vData) {
                var renderData = sprite.renderData;
                var dataList = renderData.data;
                var node = sprite.node;
                var data0 = dataList[0];
                var data3 = dataList[3];
                var matrix = node.worldMatrix;
                var a = matrix.m00;
                var b = matrix.m01;
                var c = matrix.m04;
                var d = matrix.m05;
                var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;
                var tx = matrix.m12;
                var ty = matrix.m13;
                var vl = data0.x;
                var vr = data3.x;
                var vb = data0.y;
                var vt = data3.y;

                if (justTranslate) {
                  var vltx = vl + tx;
                  var vrtx = vr + tx;
                  var vbty = vb + ty;
                  var vtty = vt + ty;
                  vData[0] = vltx;
                  vData[1] = vbty;
                  vData[9] = vrtx;
                  vData[10] = vbty;
                  vData[18] = vltx;
                  vData[19] = vtty;
                  vData[27] = vrtx;
                  vData[28] = vtty;
                } else {
                  var al = a * vl;
                  var ar = a * vr;
                  var bl = b * vl;
                  var br = b * vr;
                  var cb = c * vb;
                  var ct = c * vt;
                  var db = d * vb;
                  var dt = d * vt;
                  var cbtx = cb + tx;
                  var cttx = ct + tx;
                  var dbty = db + ty;
                  var dtty = dt + ty;
                  vData[0] = al + cbtx;
                  vData[1] = bl + dbty;
                  vData[9] = ar + cbtx;
                  vData[10] = br + dbty;
                  vData[18] = al + cttx;
                  vData[19] = bl + dtty;
                  vData[27] = ar + cttx;
                  vData[28] = br + dtty;
                }

                node._uiProps.uiTransformDirty = false;
              },
              fillBuffers: function fillBuffers(sprite, renderer) {
                if (sprite === null) {
                  return;
                }

                var vData = sprite.renderData.vData;

                if (sprite.node._uiProps.uiTransformDirty) {
                  this.updateWorldVerts(sprite, vData);
                }

                var buffer = renderer.acquireBufferBatch();
                var vertexOffset = buffer.byteOffset >> 2;
                var indicesOffset = buffer.indicesOffset;
                var vertexId = buffer.vertexOffset;
                var bufferUnchanged = buffer.request();

                if (!bufferUnchanged) {
                  buffer = renderer.currBufferBatch;
                  vertexOffset = 0;
                  indicesOffset = 0;
                  vertexId = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                vBuf.set(vData, vertexOffset);
                var index0 = vertexId;
                var index1 = vertexId + 1;
                var index2 = vertexId + 2;
                var index3 = vertexId + 3;
                iBuf[indicesOffset++] = index0;
                iBuf[indicesOffset++] = index1;
                iBuf[indicesOffset++] = index2;
                iBuf[indicesOffset++] = index2;
                iBuf[indicesOffset++] = index1;
                iBuf[indicesOffset++] = index3;
              },
              updateVertexData: function updateVertexData(sprite) {
                var renderData = sprite.renderData;

                if (!renderData) {
                  return;
                }

                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var dataList = renderData.data;
                var cw = uiTrans.width;
                var ch = uiTrans.height;
                var appX = uiTrans.anchorX * cw;
                var appY = uiTrans.anchorY * ch;
                var l = 0;
                var b = 0;
                var r = 0;
                var t = 0;

                if (sprite.trim) {
                  l = -appX;
                  b = -appY;
                  r = cw - appX;
                  t = ch - appY;
                } else {
                  var frame = sprite.spriteFrame;
                  var originSize = frame.getOriginalSize();
                  var rect = frame.getRect();
                  var ow = originSize.width;
                  var oh = originSize.height;
                  var rw = rect.width;
                  var rh = rect.height;
                  var offset = frame.getOffset();
                  var scaleX = cw / ow;
                  var scaleY = ch / oh;
                  var trimLeft = offset.x + (ow - rw) / 2;
                  var trimRight = offset.x - (ow - rw) / 2;
                  var trimBottom = offset.y + (oh - rh) / 2;
                  var trimTop = offset.y - (oh - rh) / 2;
                  l = trimLeft * scaleX - appX;
                  b = trimBottom * scaleY - appY;
                  r = cw + trimRight * scaleX - appX;
                  t = ch + trimTop * scaleY - appY;
                }

                dataList[0].x = l;
                dataList[0].y = b;
                dataList[3].x = r;
                dataList[3].y = t;
                renderData.vertDirty = false;
                this.updateWorldVerts(sprite, renderData.vData);
              },
              updateUvs: function updateUvs(sprite) {
                var renderData = sprite.renderData;
                var vData = renderData.vData;
                var uv = sprite.spriteFrame.uv;
                vData[3] = uv[0];
                vData[4] = uv[1];
                vData[12] = uv[2];
                vData[13] = uv[3];
                vData[21] = uv[4];
                vData[22] = uv[5];
                vData[30] = uv[6];
                vData[31] = uv[7];
                renderData.uvDirty = false;
              },
              updateColor: function updateColor(sprite) {
                var vData = sprite.renderData.vData;
                var colorOffset = 5;
                var color = sprite.color;
                var colorR = color.r / 255;
                var colorG = color.g / 255;
                var colorB = color.b / 255;
                var colorA = sprite.node._uiProps.opacity;

                for (var _i = 0; _i < 4; _i++) {
                  vData[colorOffset] = colorR;
                  vData[colorOffset + 1] = colorG;
                  vData[colorOffset + 2] = colorB;
                  vData[colorOffset + 3] = colorA;
                  colorOffset += 9;
                }
              }
            };

            var vec3_temp$1 = new Vec3();
            var matrix$1 = new Mat4();
            var sliced = {
              useModel: false,
              createData: function createData(sprite) {
                var renderData = sprite.requestRenderData();
                renderData.dataLength = 20;
                renderData.vertexCount = 16;
                renderData.indicesCount = 54;
                return renderData;
              },
              updateRenderData: function updateRenderData(sprite) {
                var frame = sprite.spriteFrame;
                dynamicAtlasManager.packToDynamicAtlas(sprite, frame);
                var renderData = sprite.renderData;

                if (renderData && frame) {
                  var vertDirty = renderData.vertDirty;

                  if (vertDirty) {
                    this.updateVertexData(sprite);
                    this.updateWorldVertexData(sprite);
                  }
                }
              },
              updateVertexData: function updateVertexData(sprite) {
                var renderData = sprite.renderData;
                var dataList = renderData.data;
                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var width = uiTrans.width;
                var height = uiTrans.height;
                var appX = uiTrans.anchorX * width;
                var appY = uiTrans.anchorY * height;
                var frame = sprite.spriteFrame;
                var leftWidth = frame.insetLeft;
                var rightWidth = frame.insetRight;
                var topHeight = frame.insetTop;
                var bottomHeight = frame.insetBottom;
                var sizableWidth = width - leftWidth - rightWidth;
                var sizableHeight = height - topHeight - bottomHeight;
                var xScale = width / (leftWidth + rightWidth);
                var yScale = height / (topHeight + bottomHeight);
                xScale = Number.isNaN(xScale) || xScale > 1 ? 1 : xScale;
                yScale = Number.isNaN(yScale) || yScale > 1 ? 1 : yScale;
                sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
                sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
                dataList[0].x = -appX;
                dataList[0].y = -appY;
                dataList[1].x = leftWidth * xScale - appX;
                dataList[1].y = bottomHeight * yScale - appY;
                dataList[2].x = dataList[1].x + sizableWidth;
                dataList[2].y = dataList[1].y + sizableHeight;
                dataList[3].x = width - appX;
                dataList[3].y = height - appY;
                renderData.vertDirty = false;
              },
              fillBuffers: function fillBuffers(sprite, renderer) {
                if (sprite.node.hasChangedFlags) {
                  this.updateWorldVertexData(sprite);
                }

                var buffer = renderer.acquireBufferBatch();
                var renderData = sprite.renderData;
                var dataList = renderData.data;
                var vertexOffset = buffer.byteOffset >> 2;
                var vertexCount = renderData.vertexCount;
                var indicesOffset = buffer.indicesOffset;
                var vertexId = buffer.vertexOffset;
                var uvSliced = sprite.spriteFrame.uvSliced;
                var isRecreate = buffer.request(vertexCount, renderData.indicesCount);

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  vertexOffset = 0;
                  indicesOffset = 0;
                  vertexId = 0;
                }

                var vBuf = buffer.vData;
                var iBuf = buffer.iData;

                for (var i = 4; i < 20; ++i) {
                  var vert = dataList[i];
                  var uvs = uvSliced[i - 4];
                  vBuf[vertexOffset++] = vert.x;
                  vBuf[vertexOffset++] = vert.y;
                  vBuf[vertexOffset++] = vert.z;
                  vBuf[vertexOffset++] = uvs.u;
                  vBuf[vertexOffset++] = uvs.v;
                  Color.toArray(vBuf, dataList[i].color, vertexOffset);
                  vertexOffset += 4;
                }

                for (var r = 0; r < 3; ++r) {
                  for (var c = 0; c < 3; ++c) {
                    var start = vertexId + r * 4 + c;
                    iBuf[indicesOffset++] = start;
                    iBuf[indicesOffset++] = start + 1;
                    iBuf[indicesOffset++] = start + 4;
                    iBuf[indicesOffset++] = start + 1;
                    iBuf[indicesOffset++] = start + 5;
                    iBuf[indicesOffset++] = start + 4;
                  }
                }
              },
              updateWorldVertexData: function updateWorldVertexData(sprite) {
                var node = sprite.node;
                var dataList = sprite.renderData.data;
                node.getWorldMatrix(matrix$1);

                for (var row = 0; row < 4; ++row) {
                  var rowD = dataList[row];

                  for (var col = 0; col < 4; ++col) {
                    var colD = dataList[col];
                    var world = dataList[4 + row * 4 + col];
                    Vec3.set(vec3_temp$1, colD.x, rowD.y, 0);
                    Vec3.transformMat4(world, vec3_temp$1, matrix$1);
                  }
                }
              },
              updateColor: function updateColor(sprite) {
                var datalist = sprite.renderData.data;
                var color = sprite.color;
                var colorR = color.r;
                var colorG = color.g;
                var colorB = color.b;
                var colorA = sprite.node._uiProps.opacity * 255;

                for (var i = 4; i < 20; i++) {
                  datalist[i].color.r = colorR;
                  datalist[i].color.g = colorG;
                  datalist[i].color.b = colorB;
                  datalist[i].color.a = colorA;
                }
              }
            };

            var vec3_temps$2 = [];

            for (var i$2 = 0; i$2 < 4; i$2++) {
              vec3_temps$2.push(new Vec3());
            }

            var _perVertexLength = 9;
            var tiled = {
              createData: function createData(sprite) {
                return sprite.requestRenderData();
              },
              updateRenderData: function updateRenderData(sprite) {
                var renderData = sprite.renderData;
                var frame = sprite.spriteFrame;

                if (!frame || !renderData || !(renderData.uvDirty || renderData.vertDirty)) {
                  return;
                }

                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var contentWidth = Math.abs(uiTrans.width);
                var contentHeight = Math.abs(uiTrans.height);
                var rect = frame.getRect();
                var leftWidth = frame.insetLeft;
                var rightWidth = frame.insetRight;
                var centerWidth = rect.width - leftWidth - rightWidth;
                var topHeight = frame.insetTop;
                var bottomHeight = frame.insetBottom;
                var centerHeight = rect.height - topHeight - bottomHeight;
                var sizableWidth = contentWidth - leftWidth - rightWidth;
                var sizableHeight = contentHeight - topHeight - bottomHeight;
                sizableWidth = sizableWidth > 0 ? sizableWidth : 0;
                sizableHeight = sizableHeight > 0 ? sizableHeight : 0;
                var hRepeat = centerWidth === 0 ? sizableWidth : sizableWidth / centerWidth;
                var vRepeat = centerHeight === 0 ? sizableHeight : sizableHeight / centerHeight;
                var row = Math.ceil(vRepeat + 2);
                var col = Math.ceil(hRepeat + 2);
                renderData.dataLength = Math.max(8, row + 1, col + 1);
                this.updateVerts(sprite, sizableWidth, sizableHeight, row, col);
                renderData.vertexCount = row * col * 4;
                renderData.indicesCount = row * col * 6;
                renderData.uvDirty = false;
                renderData.vertDirty = false;
                this.updateColor(sprite);
              },
              fillBuffers: function fillBuffers(sprite, renderer) {
                var node = sprite.node;
                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var contentWidth = Math.abs(uiTrans.width);
                var contentHeight = Math.abs(uiTrans.height);
                var renderData = sprite.renderData;
                var buffer = renderer.acquireBufferBatch();
                var indicesOffset = buffer.indicesOffset;
                var vertexOffset = buffer.byteOffset >> 2;
                var vertexId = buffer.vertexOffset;
                var vertexCount = renderData.vertexCount;
                var indicesCount = renderData.indicesCount;
                var vBuf = buffer.vData;
                var iBuf = buffer.iData;
                var isRecreate = buffer.request(vertexCount, indicesCount);

                if (!isRecreate) {
                  buffer = renderer.currBufferBatch;
                  vertexOffset = 0;
                  indicesOffset = 0;
                  vertexId = 0;
                }

                var frame = sprite.spriteFrame;
                var rotated = frame.isRotated();
                var uv = frame.uv;
                var uvSliced = sprite.spriteFrame.uvSliced;
                var rect = frame.getRect();
                var leftWidth = frame.insetLeft;
                var rightWidth = frame.insetRight;
                var centerWidth = rect.width - leftWidth - rightWidth;
                var topHeight = frame.insetTop;
                var bottomHeight = frame.insetBottom;
                var centerHeight = rect.height - topHeight - bottomHeight;
                var sizableWidth = contentWidth - leftWidth - rightWidth;
                var sizableHeight = contentHeight - topHeight - bottomHeight;
                sizableWidth = sizableWidth > 0 ? sizableWidth : 0;
                sizableHeight = sizableHeight > 0 ? sizableHeight : 0;
                var hRepeat = centerWidth === 0 ? sizableWidth : sizableWidth / centerWidth;
                var vRepeat = centerHeight === 0 ? sizableHeight : sizableHeight / centerHeight;
                var row = Math.ceil(vRepeat + 2);
                var col = Math.ceil(hRepeat + 2);
                var matrix = node.worldMatrix;
                var datalist = renderData.data;
                this.fillVertices(vBuf, vertexOffset, matrix, row, col, datalist);
                var offset = _perVertexLength;
                var offset1 = offset;
                var offset2 = offset * 2;
                var offset3 = offset * 3;
                var offset4 = offset * 4;
                var coefU = 0;
                var coefV = 0;
                var tempXVerts = [];
                var tempYVerts = [];

                for (var yIndex = 0, yLength = row; yIndex < yLength; ++yIndex) {
                  if (sizableHeight > centerHeight) {
                    if (sizableHeight >= yIndex * centerHeight) {
                      coefV = 1;
                    } else {
                      coefV = vRepeat % 1;
                    }
                  } else {
                    coefV = vRepeat;
                  }

                  for (var xIndex = 0, xLength = col; xIndex < xLength; ++xIndex) {
                    if (sizableWidth > centerWidth) {
                      if (sizableWidth >= xIndex * centerWidth) {
                        coefU = 1;
                      } else {
                        coefU = hRepeat % 1;
                      }
                    } else {
                      coefU = hRepeat;
                    }

                    var vertexOffsetU = vertexOffset + 3;
                    var vertexOffsetV = vertexOffsetU + 1;

                    if (rotated) {
                      if (yIndex === 0) {
                        tempXVerts[0] = uvSliced[0].u;
                        tempXVerts[1] = uvSliced[0].u;
                        tempXVerts[2] = uvSliced[4].u + (uvSliced[8].u - uvSliced[4].u) * coefV;
                      } else if (yIndex < row - 1) {
                        tempXVerts[0] = uvSliced[4].u;
                        tempXVerts[1] = uvSliced[4].u;
                        tempXVerts[2] = uvSliced[4].u + (uvSliced[8].u - uvSliced[4].u) * coefV;
                      } else if (yIndex === row - 1) {
                        tempXVerts[0] = uvSliced[8].u;
                        tempXVerts[1] = uvSliced[8].u;
                        tempXVerts[2] = uvSliced[12].u;
                      }

                      if (xIndex === 0) {
                        tempYVerts[0] = uvSliced[0].v;
                        tempYVerts[1] = uvSliced[1].v + (uvSliced[2].v - uvSliced[1].v) * coefU;
                        tempYVerts[2] = uvSliced[0].v;
                      } else if (xIndex < col - 1) {
                        tempYVerts[0] = uvSliced[1].v;
                        tempYVerts[1] = uvSliced[1].v + (uvSliced[2].v - uvSliced[1].v) * coefU;
                        tempYVerts[2] = uvSliced[1].v;
                      } else if (xIndex === col - 1) {
                        tempYVerts[0] = uvSliced[2].v;
                        tempYVerts[1] = uvSliced[3].v;
                        tempYVerts[2] = uvSliced[2].v;
                      }

                      tempXVerts[3] = tempXVerts[2];
                      tempYVerts[3] = tempYVerts[1];
                    } else {
                      if (xIndex === 0) {
                        tempXVerts[0] = uvSliced[0].u;
                        tempXVerts[1] = uvSliced[1].u + (uvSliced[2].u - uvSliced[1].u) * coefU;
                        tempXVerts[2] = uv[0];
                      } else if (xIndex < col - 1) {
                        tempXVerts[0] = uvSliced[1].u;
                        tempXVerts[1] = uvSliced[1].u + (uvSliced[2].u - uvSliced[1].u) * coefU;
                        tempXVerts[2] = uvSliced[1].u;
                      } else if (xIndex === col - 1) {
                        tempXVerts[0] = uvSliced[2].u;
                        tempXVerts[1] = uvSliced[3].u;
                        tempXVerts[2] = uvSliced[2].u;
                      }

                      if (yIndex === 0) {
                        tempYVerts[0] = uvSliced[0].v;
                        tempYVerts[1] = uvSliced[0].v;
                        tempYVerts[2] = uvSliced[4].v + (uvSliced[8].v - uvSliced[4].v) * coefV;
                      } else if (yIndex < row - 1) {
                        tempYVerts[0] = uvSliced[4].v;
                        tempYVerts[1] = uvSliced[4].v;
                        tempYVerts[2] = uvSliced[4].v + (uvSliced[8].v - uvSliced[4].v) * coefV;
                      } else if (yIndex === row - 1) {
                        tempYVerts[0] = uvSliced[8].v;
                        tempYVerts[1] = uvSliced[8].v;
                        tempYVerts[2] = uvSliced[12].v;
                      }

                      tempXVerts[3] = tempXVerts[1];
                      tempYVerts[3] = tempYVerts[2];
                    }

                    vBuf[vertexOffsetU] = tempXVerts[0];
                    vBuf[vertexOffsetV] = tempYVerts[0];
                    vBuf[vertexOffsetU + offset1] = tempXVerts[1];
                    vBuf[vertexOffsetV + offset1] = tempYVerts[1];
                    vBuf[vertexOffsetU + offset2] = tempXVerts[2];
                    vBuf[vertexOffsetV + offset2] = tempYVerts[2];
                    vBuf[vertexOffsetU + offset3] = tempXVerts[3];
                    vBuf[vertexOffsetV + offset3] = tempYVerts[3];
                    Color.toArray(vBuf, datalist[0].color, vertexOffsetV + 1);
                    Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset1 + 1);
                    Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset2 + 1);
                    Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset3 + 1);
                    vertexOffset += offset4;
                  }
                }

                for (var _i = 0; _i < indicesCount; _i += 6) {
                  iBuf[indicesOffset++] = vertexId;
                  iBuf[indicesOffset++] = vertexId + 1;
                  iBuf[indicesOffset++] = vertexId + 2;
                  iBuf[indicesOffset++] = vertexId + 1;
                  iBuf[indicesOffset++] = vertexId + 3;
                  iBuf[indicesOffset++] = vertexId + 2;
                  vertexId += 4;
                }
              },
              fillVertices: function fillVertices(vBuf, vertexOffset, matrix, row, col, dataList) {
                var x = 0;
                var x1 = 0;
                var y = 0;
                var y1 = 0;

                for (var yIndex = 0, yLength = row; yIndex < yLength; ++yIndex) {
                  y = dataList[yIndex].y;
                  y1 = dataList[yIndex + 1].y;

                  for (var xIndex = 0, xLength = col; xIndex < xLength; ++xIndex) {
                    x = dataList[xIndex].x;
                    x1 = dataList[xIndex + 1].x;
                    Vec3.set(vec3_temps$2[0], x, y, 0);
                    Vec3.set(vec3_temps$2[1], x1, y, 0);
                    Vec3.set(vec3_temps$2[2], x, y1, 0);
                    Vec3.set(vec3_temps$2[3], x1, y1, 0);

                    for (var _i2 = 0; _i2 < 4; _i2++) {
                      var vec3_temp = vec3_temps$2[_i2];
                      Vec3.transformMat4(vec3_temp, vec3_temp, matrix);
                      var offset = _i2 * _perVertexLength;
                      vBuf[vertexOffset + offset] = vec3_temp.x;
                      vBuf[vertexOffset + offset + 1] = vec3_temp.y;
                      vBuf[vertexOffset + offset + 2] = vec3_temp.z;
                    }

                    vertexOffset += 36;
                  }
                }
              },
              updateVerts: function updateVerts(sprite, sizableWidth, sizableHeight, row, col) {
                var uiTrans = sprite.node._uiProps.uiTransformComp;
                var renderData = sprite.renderData;
                var data = renderData.data;
                var frame = sprite.spriteFrame;
                var rect = frame.getRect();
                var contentWidth = Math.abs(uiTrans.width);
                var contentHeight = Math.abs(uiTrans.height);
                var appx = uiTrans.anchorX * contentWidth;
                var appy = uiTrans.anchorY * contentHeight;
                var leftWidth = frame.insetLeft;
                var rightWidth = frame.insetRight;
                var centerWidth = rect.width - leftWidth - rightWidth;
                var topHeight = frame.insetTop;
                var bottomHeight = frame.insetBottom;
                var centerHeight = rect.height - topHeight - bottomHeight;
                var xScale = uiTrans.width / (leftWidth + rightWidth) > 1 ? 1 : uiTrans.width / (leftWidth + rightWidth);
                var yScale = uiTrans.height / (topHeight + bottomHeight) > 1 ? 1 : uiTrans.height / (topHeight + bottomHeight);
                var offsetWidth = 0;
                var offsetHeight = 0;

                if (centerWidth > 0) {
                  offsetWidth = Math.floor(sizableWidth * 1000) / 1000 % centerWidth === 0 ? centerWidth : sizableWidth % centerWidth;
                } else {
                  offsetWidth = sizableWidth;
                }

                if (centerHeight > 0) {
                  offsetHeight = Math.floor(sizableHeight * 1000) / 1000 % centerHeight === 0 ? centerHeight : sizableHeight % centerHeight;
                } else {
                  offsetHeight = sizableHeight;
                }

                for (var _i3 = 0; _i3 <= col; _i3++) {
                  if (_i3 === 0) {
                    data[_i3].x = -appx;
                  } else if (_i3 > 0 && _i3 < col) {
                    if (_i3 === 1) {
                      data[_i3].x = leftWidth * xScale + Math.min(centerWidth, sizableWidth) - appx;
                    } else if (centerWidth > 0) {
                      if (_i3 === col - 1) {
                        data[_i3].x = leftWidth + offsetWidth + centerWidth * (_i3 - 2) - appx;
                      } else {
                        data[_i3].x = leftWidth + Math.min(centerWidth, sizableWidth) + centerWidth * (_i3 - 2) - appx;
                      }
                    } else {
                      data[_i3].x = leftWidth + sizableWidth - appx;
                    }
                  } else if (_i3 === col) {
                    data[_i3].x = Math.min(leftWidth + sizableWidth + rightWidth, contentWidth) - appx;
                  }
                }

                for (var _i4 = 0; _i4 <= row; _i4++) {
                  if (_i4 === 0) {
                    data[_i4].y = -appy;
                  } else if (_i4 > 0 && _i4 < row) {
                    if (_i4 === 1) {
                      data[_i4].y = bottomHeight * yScale + Math.min(centerHeight, sizableHeight) - appy;
                    } else if (centerHeight > 0) {
                      if (_i4 === row - 1) {
                        data[_i4].y = bottomHeight + offsetHeight + (_i4 - 2) * centerHeight - appy;
                      } else {
                        data[_i4].y = bottomHeight + Math.min(centerHeight, sizableHeight) + (_i4 - 2) * centerHeight - appy;
                      }
                    } else {
                      data[_i4].y = bottomHeight + sizableHeight - appy;
                    }
                  } else if (_i4 === row) {
                    data[_i4].y = Math.min(bottomHeight + sizableHeight + topHeight, contentHeight) - appy;
                  }
                }
              },
              updateColor: function updateColor(sprite) {
                var datalist = sprite.renderData.data;
                var length = datalist.length;
                if (length === 0) return;
                var color = sprite.color;
                var colorR = color.r;
                var colorG = color.g;
                var colorB = color.b;
                var colorA = sprite.node._uiProps.opacity * 255;

                for (var _i5 = 0; _i5 < length; _i5++) {
                  datalist[_i5].color.r = colorR;
                  datalist[_i5].color.g = colorG;
                  datalist[_i5].color.b = colorB;
                  datalist[_i5].color.a = colorA;
                }
              }
            };

            var SpriteType = Sprite.Type;
            var FillType$1 = Sprite.FillType;
            var spriteAssembler = exports('s', {
              getAssembler: function getAssembler(spriteComp) {
                var util = simple;
                var comp = spriteComp;

                switch (comp.type) {
                  case SpriteType.SLICED:
                    util = sliced;
                    break;

                  case SpriteType.TILED:
                    util = tiled;
                    break;

                  case SpriteType.FILLED:
                    if (comp.fillType === FillType$1.RADIAL) {
                      util = radialFilled;
                    } else {
                      util = barFilled;
                    }

                    break;
                }

                return util;
              }
            });
            Sprite.Assembler = spriteAssembler;

            var _stencilManager = StencilManager.sharedManager;

            function applyClearMask(mask, renderer) {
              _stencilManager.clear(mask);

              renderer.commitModel(mask, mask._clearModel, mask._clearStencilMtl);
            }

            function applyAreaMask(mask, renderer) {
              _stencilManager.enterLevel(mask);

              if (mask.type === MaskType.IMAGE_STENCIL) {
                simple.fillBuffers(mask, renderer);
                var mat = mask.graphics.getMaterialInstance(0);
                renderer.forceMergeBatches(mat, mask.spriteFrame, mask.graphics);
              } else {
                mask.graphics.updateAssembler(renderer);
              }
            }

            var maskAssembler = {
              createData: function createData(mask) {
                var renderData = mask.requestRenderData();
                renderData.dataLength = 4;
                renderData.vertexCount = 4;
                renderData.indicesCount = 6;
                renderData.vData = new Float32Array(4 * 9);
                return renderData;
              },
              updateRenderData: function updateRenderData(mask) {
                if (mask.type === MaskType.IMAGE_STENCIL) {
                  simple.updateRenderData(mask);
                  simple.updateColor(mask);
                }
              },
              fillBuffers: function fillBuffers(mask, renderer) {
                if (mask.type !== MaskType.IMAGE_STENCIL || mask.spriteFrame) {
                  _stencilManager.pushMask(mask);

                  renderer.finishMergeBatches();
                  applyClearMask(mask, renderer);
                  applyAreaMask(mask, renderer);

                  _stencilManager.enableMask();
                }
              }
            };
            var maskEndAssembler = {
              fillBuffers: function fillBuffers(mask, ui) {
                _stencilManager.exitMask();
              }
            };
            var StartAssembler = {
              getAssembler: function getAssembler() {
                return maskAssembler;
              }
            };
            var PostAssembler = {
              getAssembler: function getAssembler() {
                return maskEndAssembler;
              }
            };
            Mask.Assembler = StartAssembler;
            Mask.PostAssembler = PostAssembler;

            var _dsInfo = new DescriptorSetInfo(null);

            var m4_1 = new Mat4();
            var Batcher2D = exports('B', function () {
              var _proto = Batcher2D.prototype;

              _proto.acquireBufferBatch = function acquireBufferBatch(attributes) {
                if (attributes === void 0) {
                  attributes = vfmtPosUvColor;
                }

                var strideBytes = attributes === vfmtPosUvColor ? 36 : getAttributeStride(attributes);

                if (!this._currMeshBuffer || this._currMeshBuffer.vertexFormatBytes !== strideBytes) {
                  this._requireBufferBatch(attributes);

                  return this._currMeshBuffer;
                }

                return this._currMeshBuffer;
              };

              _proto.registerCustomBuffer = function registerCustomBuffer(attributes, callback) {
                var batch;

                if (attributes instanceof MeshBuffer) {
                  batch = attributes;
                } else {
                  batch = this._bufferBatchPool.add();
                  batch.initialize(attributes, callback || this._recreateMeshBuffer.bind(this, attributes));
                }

                var strideBytes = batch.vertexFormatBytes;

                var buffers = this._customMeshBuffers.get(strideBytes);

                if (!buffers) {
                  buffers = [];

                  this._customMeshBuffers.set(strideBytes, buffers);
                }

                buffers.push(batch);
                return batch;
              };

              _proto.unRegisterCustomBuffer = function unRegisterCustomBuffer(buffer) {
                var buffers = this._customMeshBuffers.get(buffer.vertexFormatBytes);

                if (buffers) {
                  for (var i = 0; i < buffers.length; i++) {
                    if (buffers[i] === buffer) {
                      buffers.splice(i, 1);
                      break;
                    }
                  }
                }
              };

              function Batcher2D(_root) {
                var _this = this;

                this.device = void 0;
                this._screens = [];
                this._bufferBatchPool = new RecyclePool(function () {
                  return new MeshBuffer(_this);
                }, 128);
                this._drawBatchPool = void 0;
                this._meshBuffers = new Map();
                this._customMeshBuffers = new Map();
                this._meshBufferUseCount = new Map();
                this._batches = void 0;
                this._doUploadBuffersCall = new Map();
                this._emptyMaterial = new Material();
                this._currScene = null;
                this._currMaterial = this._emptyMaterial;
                this._currTexture = null;
                this._currSampler = null;
                this._currMeshBuffer = null;
                this._currStaticRoot = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currTextureHash = 0;
                this._currSamplerHash = 0;
                this._currBlendTargetHash = 0;
                this._currLayer = 0;
                this._currDepthStencilStateStage = null;
                this._currIsStatic = false;
                this._descriptorSetCache = new DescriptorSetCache();
                this._root = _root;
                this.device = _root.device;
                this._batches = new CachedArray(64);
                this._drawBatchPool = new Pool(function () {
                  return new DrawBatch2D();
                }, 128);
              }

              _proto.initialize = function initialize() {
                return true;
              };

              _proto.destroy = function destroy() {
                var _this2 = this;

                for (var i = 0; i < this._batches.length; i++) {
                  if (this._batches.array[i]) {
                    this._batches.array[i].destroy(this);
                  }
                }

                this._batches.destroy();

                for (var _iterator = _createForOfIteratorHelperLoose(this._meshBuffers.keys()), _step; !(_step = _iterator()).done;) {
                  var size = _step.value;

                  var buffers = this._meshBuffers.get(size);

                  if (buffers) {
                    buffers.forEach(function (buffer) {
                      return buffer.destroy();
                    });
                  }
                }

                if (this._drawBatchPool) {
                  this._drawBatchPool.destroy(function (obj) {
                    obj.destroy(_this2);
                  });
                }

                this._descriptorSetCache.destroy();

                this._meshBuffers.clear();

                StencilManager.sharedManager.destroy();
              };

              _proto.addScreen = function addScreen(comp) {
                this._screens.push(comp);

                this._screens.sort(this._screenSort);
              };

              _proto.getFirstRenderCamera = function getFirstRenderCamera(node) {
                if (node.scene && node.scene.renderScene) {
                  var cameras = node.scene.renderScene.cameras;

                  for (var i = 0; i < cameras.length; i++) {
                    var camera = cameras[i];

                    if (camera.visibility & node.layer) {
                      return camera;
                    }
                  }
                }

                return null;
              };

              _proto.removeScreen = function removeScreen(comp) {
                var idx = this._screens.indexOf(comp);

                if (idx === -1) {
                  return;
                }

                this._screens.splice(idx, 1);
              };

              _proto.sortScreens = function sortScreens() {
                this._screens.sort(this._screenSort);
              };

              _proto.addUploadBuffersFunc = function addUploadBuffersFunc(target, func) {
                this._doUploadBuffersCall.set(target, func);
              };

              _proto.removeUploadBuffersFunc = function removeUploadBuffersFunc(target) {
                this._doUploadBuffersCall["delete"](target);
              };

              _proto.update = function update() {
                var screens = this._screens;

                for (var i = 0; i < screens.length; ++i) {
                  var screen = screens[i];

                  if (!screen.enabledInHierarchy) {
                    continue;
                  }

                  this._recursiveScreenNode(screen.node);
                }

                var batchPriority = 0;

                if (this._batches.length) {
                  for (var _i = 0; _i < this._batches.length; ++_i) {
                    var batch = this._batches.array[_i];
                    if (!batch.renderScene) continue;

                    if (batch.model) {
                      var subModels = batch.model.subModels;

                      for (var j = 0; j < subModels.length; j++) {
                        subModels[j].priority = batchPriority++;
                      }
                    } else {
                      batch.hDescriptorSet = this._descriptorSetCache.getDescriptorSet(batch);
                    }

                    batch.renderScene.addBatch(batch);
                  }
                }
              };

              _proto.uploadBuffers = function uploadBuffers() {
                var _this3 = this;

                if (this._batches.length > 0) {
                  var calls = this._doUploadBuffersCall;
                  calls.forEach(function (value, key) {
                    value.call(key, _this3);
                  });
                  var buffers = this._meshBuffers;
                  buffers.forEach(function (value, key) {
                    value.forEach(function (bb) {
                      bb.uploadBuffers();
                      bb.reset();
                    });
                  });
                  var customs = this._customMeshBuffers;
                  customs.forEach(function (value, key) {
                    value.forEach(function (bb) {
                      bb.uploadBuffers();
                      bb.reset();
                    });
                  });

                  this._descriptorSetCache.update();
                }
              };

              _proto.reset = function reset() {
                for (var i = 0; i < this._batches.length; ++i) {
                  var batch = this._batches.array[i];

                  if (batch.isStatic) {
                    continue;
                  }

                  batch.clear();

                  this._drawBatchPool.free(batch);
                }

                this._currLayer = 0;
                this._currMaterial = this._emptyMaterial;
                this._currTexture = null;
                this._currSampler = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currScene = null;
                this._currMeshBuffer = null;

                this._meshBufferUseCount.clear();

                this._batches.clear();

                StencilManager.sharedManager.reset();

                this._descriptorSetCache.reset();
              };

              _proto.commitComp = function commitComp(comp, frame, assembler, transform) {
                var renderComp = comp;
                var texture;
                var samp;
                var textureHash = 0;
                var samplerHash = 0;

                if (frame) {
                  texture = frame.getGFXTexture();
                  samp = frame.getGFXSampler();
                  textureHash = frame.getHash();
                  samplerHash = frame.getSamplerHash();
                } else {
                  texture = null;
                  samp = null;
                }

                var renderScene = renderComp._getRenderScene();

                var mat = renderComp.getRenderMaterial(0);
                renderComp.stencilStage = StencilManager.sharedManager.stage;
                var blendTargetHash = renderComp.blendHash;
                var depthStencilStateStage = renderComp.stencilStage;

                if (this._currScene !== renderScene || this._currLayer !== comp.node.layer || this._currMaterial !== mat || this._currBlendTargetHash !== blendTargetHash || this._currDepthStencilStateStage !== depthStencilStateStage || this._currTextureHash !== textureHash || this._currSamplerHash !== samplerHash || this._currTransform !== transform) {
                  this.autoMergeBatches(this._currComponent);
                  this._currScene = renderScene;
                  this._currComponent = renderComp;
                  this._currTransform = transform;
                  this._currMaterial = mat;
                  this._currTexture = texture;
                  this._currSampler = samp;
                  this._currTextureHash = textureHash;
                  this._currSamplerHash = samplerHash;
                  this._currBlendTargetHash = blendTargetHash;
                  this._currDepthStencilStateStage = depthStencilStateStage;
                  this._currLayer = comp.node.layer;
                }

                if (assembler) {
                  assembler.fillBuffers(renderComp, this);
                }
              };

              _proto.commitModel = function commitModel(comp, model, mat) {
                if (this._currMaterial !== this._emptyMaterial) {
                  this.autoMergeBatches(this._currComponent);
                }

                var depthStencil;
                var dssHash = 0;

                if (mat) {
                  if (comp.stencilStage === Stage.ENABLED || comp.stencilStage === Stage.DISABLED) {
                    comp.stencilStage = StencilManager.sharedManager.stage;
                  }

                  depthStencil = StencilManager.sharedManager.getStencilStage(comp.stencilStage, mat);
                  dssHash = StencilManager.sharedManager.getStencilHash(comp.stencilStage);
                }

                var stamp = legacyCC.director.getTotalFrames();

                if (model) {
                  model.updateTransform(stamp);
                  model.updateUBOs(stamp);
                }

                for (var i = 0; i < model.subModels.length; i++) {
                  var curDrawBatch = this._drawBatchPool.alloc();

                  var subModel = model.subModels[i];
                  curDrawBatch.renderScene = comp._getRenderScene();
                  curDrawBatch.visFlags = comp.node.layer;
                  curDrawBatch.model = model;
                  curDrawBatch.bufferBatch = null;
                  curDrawBatch.texture = null;
                  curDrawBatch.sampler = null;
                  curDrawBatch.useLocalData = null;

                  if (!depthStencil) {
                    depthStencil = null;
                  }

                  curDrawBatch.fillPasses(mat, depthStencil, dssHash, null, 0, subModel.patches);
                  curDrawBatch.hDescriptorSet = SubModelPool.get(subModel.handle, SubModelView.DESCRIPTOR_SET);
                  curDrawBatch.hInputAssembler = SubModelPool.get(subModel.handle, SubModelView.INPUT_ASSEMBLER);
                  curDrawBatch.model.visFlags = curDrawBatch.visFlags;

                  this._batches.push(curDrawBatch);
                }

                this._currMaterial = this._emptyMaterial;
                this._currScene = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currTexture = null;
                this._currSampler = null;
                this._currTextureHash = 0;
                this._currSamplerHash = 0;
                this._currLayer = 0;
              };

              _proto.commitStaticBatch = function commitStaticBatch(comp) {
                this._batches.concat(comp.drawBatchList);

                this.finishMergeBatches();
              };

              _proto.autoMergeBatches = function autoMergeBatches(renderComp) {
                var buffer = this.currBufferBatch;
                var hIA = buffer === null || buffer === void 0 ? void 0 : buffer.recordBatch();
                var mat = this._currMaterial;

                if (!hIA || !mat || !buffer) {
                  return;
                }

                var blendState;
                var depthStencil;
                var dssHash = 0;
                var bsHash = 0;

                if (renderComp) {
                  blendState = renderComp.blendHash === -1 ? null : renderComp.getBlendState();
                  bsHash = renderComp.blendHash;

                  if (renderComp.customMaterial !== null) {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage, mat);
                  } else {
                    depthStencil = StencilManager.sharedManager.getStencilStage(renderComp.stencilStage);
                  }

                  dssHash = StencilManager.sharedManager.getStencilHash(renderComp.stencilStage);
                }

                var curDrawBatch = this._currStaticRoot ? this._currStaticRoot._requireDrawBatch() : this._drawBatchPool.alloc();
                curDrawBatch.renderScene = this._currScene;
                curDrawBatch.visFlags = this._currLayer;
                curDrawBatch.bufferBatch = buffer;
                curDrawBatch.texture = this._currTexture;
                curDrawBatch.sampler = this._currSampler;
                curDrawBatch.hInputAssembler = hIA;
                curDrawBatch.useLocalData = this._currTransform;
                curDrawBatch.textureHash = this._currTextureHash;
                curDrawBatch.samplerHash = this._currSamplerHash;
                curDrawBatch.fillPasses(mat, depthStencil, dssHash, blendState, bsHash, null);

                this._batches.push(curDrawBatch);

                buffer.vertexStart = buffer.vertexOffset;
                buffer.indicesStart = buffer.indicesOffset;
                buffer.byteStart = buffer.byteOffset;

                if (sys.__isWebIOS14OrIPadOS14Env && !this._currIsStatic) {
                  this._currMeshBuffer = null;
                }
              };

              _proto.forceMergeBatches = function forceMergeBatches(material, frame, renderComp) {
                this._currMaterial = material;

                if (frame) {
                  this._currTexture = frame.getGFXTexture();
                  this._currSampler = frame.getGFXSampler();
                  this._currTextureHash = frame.getHash();
                  this._currSamplerHash = frame.getSamplerHash();
                } else {
                  this._currTexture = this._currSampler = null;
                  this._currTextureHash = this._currSamplerHash = 0;
                }

                this._currLayer = renderComp.node.layer;
                this._currScene = renderComp._getRenderScene();
                this.autoMergeBatches(renderComp);
              };

              _proto.finishMergeBatches = function finishMergeBatches() {
                this.autoMergeBatches();
                this._currMaterial = this._emptyMaterial;
                this._currTexture = null;
                this._currComponent = null;
                this._currTransform = null;
                this._currTextureHash = 0;
                this._currSamplerHash = 0;
                this._currLayer = 0;
              };

              _proto.flushMaterial = function flushMaterial(mat) {
                this._currMaterial = mat;
              };

              _proto.walk = function walk(node, level) {
                if (level === void 0) {
                  level = 0;
                }

                var len = node.children.length;

                this._preProcess(node);

                if (len > 0 && !node._static) {
                  var children = node.children;

                  for (var i = 0; i < children.length; ++i) {
                    var child = children[i];
                    this.walk(child, level);
                  }
                }

                this._postProcess(node);

                level += 1;
              };

              _proto._preProcess = function _preProcess(node) {
                var render = node._uiProps.uiComp;

                if (!render) {
                  var localAlpha = node._uiProps.localOpacity;
                  node._uiProps.opacity = node.parent && node.parent._uiProps ? node.parent._uiProps.opacity * localAlpha : localAlpha;
                }

                if (!node._uiProps.uiTransformComp) {
                  return;
                }

                if (render && render.enabledInHierarchy) {
                  render.updateAssembler(this);
                }
              };

              _proto._postProcess = function _postProcess(node) {
                var render = node._uiProps.uiComp;

                if (render && render.enabledInHierarchy) {
                  render.postUpdateAssembler(this);
                }
              };

              _proto._recursiveScreenNode = function _recursiveScreenNode(screen) {
                this.walk(screen);
                this.autoMergeBatches(this._currComponent);
              };

              _proto._createMeshBuffer = function _createMeshBuffer(attributes) {
                var batch = this._bufferBatchPool.add();

                batch.initialize(attributes, this._recreateMeshBuffer.bind(this, attributes));
                var strideBytes = getAttributeStride(attributes);

                var buffers = this._meshBuffers.get(strideBytes);

                if (!buffers) {
                  buffers = [];

                  this._meshBuffers.set(strideBytes, buffers);
                }

                buffers.push(batch);
                return batch;
              };

              _proto._recreateMeshBuffer = function _recreateMeshBuffer(attributes, vertexCount, indexCount) {
                this.autoMergeBatches();

                this._requireBufferBatch(attributes, vertexCount, indexCount);
              };

              _proto._requireBufferBatch = function _requireBufferBatch(attributes, vertexCount, indexCount) {
                var strideBytes = getAttributeStride(attributes);

                var buffers = this._meshBuffers.get(strideBytes);

                if (!buffers) {
                  buffers = [];

                  this._meshBuffers.set(strideBytes, buffers);
                }

                var meshBufferUseCount = this._meshBufferUseCount.get(strideBytes) || 0;

                if (meshBufferUseCount >= buffers.length) {
                  this._currMeshBuffer = this._createMeshBuffer(attributes);
                } else {
                  this._currMeshBuffer = buffers[meshBufferUseCount];
                }

                this._meshBufferUseCount.set(strideBytes, meshBufferUseCount + 1);

                if (vertexCount && indexCount) {
                  this._currMeshBuffer.request(vertexCount, indexCount);
                }
              };

              _proto._screenSort = function _screenSort(a, b) {
                return a.node.getSiblingIndex() - b.node.getSiblingIndex();
              };

              _proto._releaseDescriptorSetCache = function _releaseDescriptorSetCache(textureHash) {
                this._descriptorSetCache.releaseDescriptorSetCache(textureHash);
              };

              _createClass(Batcher2D, [{
                key: "currBufferBatch",
                get: function get() {
                  if (this._currMeshBuffer) return this._currMeshBuffer;
                  this._currMeshBuffer = this.acquireBufferBatch();
                  return this._currMeshBuffer;
                },
                set: function set(buffer) {
                  if (buffer) {
                    this._currMeshBuffer = buffer;
                  }
                }
              }, {
                key: "batches",
                get: function get() {
                  return this._batches;
                }
              }, {
                key: "currStaticRoot",
                set: function set(value) {
                  this._currStaticRoot = value;
                }
              }, {
                key: "currIsStatic",
                set: function set(value) {
                  this._currIsStatic = value;
                }
              }]);

              return Batcher2D;
            }());

            var LocalDescriptorSet = function () {
              function LocalDescriptorSet() {
                this._handle = null;
                this._transform = null;
                this._textureHash = 0;
                this._samplerHash = 0;
                this._localBuffer = null;
                this._transformUpdate = true;
                var device = legacyCC.director.root.device;
                this._localData = new Float32Array(UBOLocal.COUNT);
                this._localBuffer = device.createBuffer(new BufferInfo(BufferUsageBit.UNIFORM | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, UBOLocal.SIZE, UBOLocal.SIZE));
              }

              var _proto2 = LocalDescriptorSet.prototype;

              _proto2.initialize = function initialize(batch) {
                var device = legacyCC.director.root.device;
                this._transform = batch.useLocalData;
                this._textureHash = batch.textureHash;
                this._samplerHash = batch.samplerHash;
                _dsInfo.layout = batch.passes[0].localSetLayout;

                if (this._handle) {
                  DSPool.free(this._handle);
                  this._handle = null;
                }

                this._handle = DSPool.alloc(device, _dsInfo);
                this._descriptorSet = DSPool.get(this._handle);

                this._descriptorSet.bindBuffer(UBOLocal.BINDING, this._localBuffer);

                var binding = ModelLocalBindings.SAMPLER_SPRITE;

                this._descriptorSet.bindTexture(binding, batch.texture);

                this._descriptorSet.bindSampler(binding, batch.sampler);

                this._descriptorSet.update();

                this._transformUpdate = true;
              };

              _proto2.updateTransform = function updateTransform(transform) {
                if (transform === this._transform) return;
                this._transform = transform;
                this._transformUpdate = true;
                this.uploadLocalData();
              };

              _proto2.updateLocal = function updateLocal() {
                if (!this._transform) return;
                this.uploadLocalData();
              };

              _proto2.equals = function equals(transform, textureHash, samplerHash) {
                return this._transform === transform && this._textureHash === textureHash && this._samplerHash === samplerHash;
              };

              _proto2.reset = function reset() {
                this._transform = null;
                this._textureHash = 0;
                this._samplerHash = 0;
              };

              _proto2.destroy = function destroy() {
                if (this._localBuffer) {
                  this._localBuffer.destroy();

                  this._localBuffer = null;
                }

                if (this._handle) {
                  DSPool.free(this._handle);
                  this._handle = null;
                }

                this._localData = null;
              };

              _proto2.uploadLocalData = function uploadLocalData() {
                var node = this._transform;

                if (node.hasChangedFlags || node._dirtyFlags) {
                  node.updateWorldTransform();
                }

                if (this._transformUpdate) {
                  var worldMatrix = node._mat;
                  Mat4.toArray(this._localData, worldMatrix, UBOLocal.MAT_WORLD_OFFSET);
                  Mat4.inverseTranspose(m4_1, worldMatrix);
                  Mat4.toArray(this._localData, m4_1, UBOLocal.MAT_WORLD_IT_OFFSET);

                  this._localBuffer.update(this._localData);

                  this._transformUpdate = false;
                }
              };

              _createClass(LocalDescriptorSet, [{
                key: "handle",
                get: function get() {
                  return this._handle;
                }
              }]);

              return LocalDescriptorSet;
            }();

            var DescriptorSetCache = function () {
              function DescriptorSetCache() {
                this._descriptorSetCache = new Map();
                this._localDescriptorSetCache = [];
                this._localCachePool = void 0;
                this._localCachePool = new Pool(function () {
                  return new LocalDescriptorSet();
                }, 16);
              }

              var _proto3 = DescriptorSetCache.prototype;

              _proto3.getDescriptorSet = function getDescriptorSet(batch) {
                var root = legacyCC.director.root;

                if (batch.useLocalData) {
                  var caches = this._localDescriptorSetCache;

                  for (var i = 0, len = caches.length; i < len; i++) {
                    var cache = caches[i];

                    if (cache.equals(batch.useLocalData, batch.textureHash, batch.samplerHash)) {
                      return cache.handle;
                    }
                  }

                  var localDs = this._localCachePool.alloc();

                  localDs.initialize(batch);

                  this._localDescriptorSetCache.push(localDs);

                  return localDs.handle;
                } else {
                  var descriptorSetTextureMap = this._descriptorSetCache.get(batch.textureHash);

                  if (descriptorSetTextureMap && descriptorSetTextureMap.has(batch.samplerHash)) {
                    return descriptorSetTextureMap.get(batch.samplerHash);
                  } else {
                    _dsInfo.layout = batch.passes[0].localSetLayout;
                    var handle = DSPool.alloc(root.device, _dsInfo);
                    var descriptorSet = DSPool.get(handle);
                    var binding = ModelLocalBindings.SAMPLER_SPRITE;
                    descriptorSet.bindTexture(binding, batch.texture);
                    descriptorSet.bindSampler(binding, batch.sampler);
                    descriptorSet.update();

                    if (descriptorSetTextureMap) {
                      this._descriptorSetCache.get(batch.textureHash).set(batch.samplerHash, handle);
                    } else {
                      this._descriptorSetCache.set(batch.textureHash, new Map([[batch.samplerHash, handle]]));
                    }

                    return handle;
                  }
                }
              };

              _proto3.update = function update() {
                var caches = this._localDescriptorSetCache;
                caches.forEach(function (value) {
                  value.updateLocal();
                });
              };

              _proto3.reset = function reset() {
                var _this4 = this;

                var caches = this._localDescriptorSetCache;
                caches.forEach(function (value) {
                  _this4._localCachePool.free(value);
                });
                this._localDescriptorSetCache.length = 0;
              };

              _proto3.releaseDescriptorSetCache = function releaseDescriptorSetCache(textureHash) {
                if (this._descriptorSetCache.has(textureHash)) {
                  this._descriptorSetCache.get(textureHash).forEach(function (value) {
                    DSPool.free(value);
                  });

                  this._descriptorSetCache["delete"](textureHash);
                }
              };

              _proto3.destroy = function destroy() {
                this._descriptorSetCache.forEach(function (value, key, map) {
                  value.forEach(function (hDescriptorSet) {
                    DSPool.free(hDescriptorSet);
                  });
                });

                this._descriptorSetCache.clear();

                this._localDescriptorSetCache.length = 0;

                this._localCachePool.destroy(function (obj) {
                  obj.destroy();
                });
              };

              return DescriptorSetCache;
            }();

            legacyCC.internal.Batcher2D = Batcher2D;

            var _canvasContext = null;

            var _intervalId = -1;

            var _testString = "BES bswy:->@123\u4E01\u3041\u1101";

            var _fontFaces = Object.create(null);

            var _loadingFonts = [];
            var _timeout = 3000;

            var useNativeCheck = function () {
              var nativeCheck;
              return function () {
                if (nativeCheck === undefined) {
                  if ('FontFace' in window) {
                    var match = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);
                    var safari10Match = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);

                    if (match) {
                      nativeCheck = parseInt(match[1], 10) > 42;
                    } else if (safari10Match) {
                      nativeCheck = false;
                    } else {
                      nativeCheck = true;
                    }
                  } else {
                    nativeCheck = false;
                  }
                }

                return nativeCheck;
              };
            }();

            function checkFontLoaded() {
              var allFontsLoaded = true;
              var now = Date.now();

              for (var i = _loadingFonts.length - 1; i >= 0; i--) {
                var fontLoadHandle = _loadingFonts[i];
                var fontFamily = fontLoadHandle.fontFamilyName;

                if (now - fontLoadHandle.startTime > _timeout) {
                  warnID(4933, fontFamily);
                  fontLoadHandle.onComplete(null, fontFamily);

                  _loadingFonts.splice(i, 1);

                  continue;
                }

                var oldWidth = fontLoadHandle.refWidth;
                var fontDesc = "40px " + fontFamily;
                _canvasContext.font = fontDesc;
                var newWidth = safeMeasureText(_canvasContext, _testString, fontDesc);

                if (oldWidth !== newWidth) {
                  _loadingFonts.splice(i, 1);

                  fontLoadHandle.onComplete(null, fontFamily);
                } else {
                  allFontsLoaded = false;
                }
              }

              if (allFontsLoaded) {
                clearInterval(_intervalId);
                _intervalId = -1;
              }
            }

            function nativeCheckFontLoaded(start, font, callback) {
              var loader = new Promise(function (resolve, reject) {
                var check = function check() {
                  var now = Date.now();

                  if (now - start >= _timeout) {
                    reject();
                  } else {
                    document.fonts.load("40px " + font).then(function (fonts) {
                      if (fonts.length >= 1) {
                        resolve();
                      } else {
                        setTimeout(check, 100);
                      }
                    }, function () {
                      reject();
                    });
                  }
                };

                check();
              });
              var timeoutId = null;
              var timer = new Promise(function (resolve, reject) {
                timeoutId = setTimeout(reject, _timeout);
              });
              Promise.race([timer, loader]).then(function () {
                if (timeoutId) {
                  clearTimeout(timeoutId);
                  timeoutId = null;
                }

                callback(null, font);
              }, function () {
                warnID(4933, font);
                callback(null, font);
              });
            }

            function loadFont(url, options, onComplete) {
              var fontFamilyName = getFontFamily(url);

              if (_fontFaces[fontFamilyName]) {
                onComplete(null, fontFamilyName);
                return;
              }

              if (!_canvasContext) {
                var labelCanvas = document.createElement('canvas');
                labelCanvas.width = 100;
                labelCanvas.height = 100;
                _canvasContext = labelCanvas.getContext('2d');
              }

              var fontDesc = "40px " + fontFamilyName;
              var refWidth = safeMeasureText(_canvasContext, _testString, fontDesc);
              var fontStyle = document.createElement('style');
              fontStyle.type = 'text/css';
              var fontStr = '';

              if (Number.isNaN(fontFamilyName)) {
                fontStr += "@font-face { font-family:" + fontFamilyName + "; src:";
              } else {
                fontStr += "@font-face { font-family:\"" + fontFamilyName + "\"; src:";
              }

              fontStr += "url(\"" + url + "\");";
              fontStyle.textContent = fontStr + "}";
              document.body.appendChild(fontStyle);
              var preloadDiv = document.createElement('div');
              var divStyle = preloadDiv.style;
              divStyle.fontFamily = fontFamilyName;
              preloadDiv.innerHTML = '.';
              divStyle.position = 'absolute';
              divStyle.left = '-100px';
              divStyle.top = '-100px';
              document.body.appendChild(preloadDiv);

              if (useNativeCheck()) {
                nativeCheckFontLoaded(Date.now(), fontFamilyName, onComplete);
              } else {
                var fontLoadHandle = {
                  fontFamilyName: fontFamilyName,
                  refWidth: refWidth,
                  onComplete: onComplete,
                  startTime: Date.now()
                };

                _loadingFonts.push(fontLoadHandle);

                if (_intervalId === -1) {
                  _intervalId = setInterval(checkFontLoaded, 100);
                }
              }

              _fontFaces[fontFamilyName] = fontStyle;
            }
            function getFontFamily(fontHandle) {
              var ttfIndex = fontHandle.lastIndexOf('.ttf');

              if (ttfIndex === -1) {
                return fontHandle;
              }

              var slashPos = fontHandle.lastIndexOf('/');
              var fontFamilyName;

              if (slashPos === -1) {
                fontFamilyName = fontHandle.substring(0, ttfIndex) + "_LABEL";
              } else {
                fontFamilyName = fontHandle.substring(slashPos + 1, ttfIndex) + "_LABEL";
              }

              if (fontFamilyName.indexOf(' ') !== -1) {
                fontFamilyName = "\"" + fontFamilyName + "\"";
              }

              return fontFamilyName;
            }

            function createFont(id, data, options, onComplete) {
              var out = new TTFFont();
              out._nativeUrl = id;
              out._nativeAsset = data;
              onComplete(null, out);
            }

            downloader.register({
              '.font': loadFont,
              '.eot': loadFont,
              '.ttf': loadFont,
              '.woff': loadFont,
              '.svg': loadFont,
              '.ttc': loadFont
            });
            factory.register({
              '.font': createFont,
              '.eot': createFont,
              '.ttf': createFont,
              '.woff': createFont,
              '.svg': createFont,
              '.ttc': createFont
            });

            legacyCC.UI = {
              MeshBuffer: MeshBuffer,
              spriteAssembler: spriteAssembler,
              graphicsAssembler: graphicsAssemblerManager,
              labelAssembler: labelAssembler
            };

        }
    };
});
