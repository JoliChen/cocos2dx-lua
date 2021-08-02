System.register("q-bundled:///fs/cocos/2d/assembler/sprite/radial-filled.js", ["../../../core/math/index.js", "../utils.js", "../../utils/dynamic-atlas/atlas-manager.js"], function (_export, _context) {
  "use strict";

  var Color, Vec2, fillVertices3D, dynamicAtlasManager, PI_2, EPSILON, tempColor, _vertPos, _vertices, _uvs, _intersectPoint_1, _intersectPoint_2, _center, _triangles, radialFilled;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _calcIntersectedPoints(left, right, bottom, top, center, angle, intersectPoints) {
    // left bottom, right, top
    var sinAngle = Math.sin(angle);
    sinAngle = Math.abs(sinAngle) > EPSILON ? sinAngle : 0;
    var cosAngle = Math.cos(angle);
    cosAngle = Math.abs(cosAngle) > EPSILON ? cosAngle : 0;
    var tanAngle = 0;
    var cotAngle = 0;

    if (cosAngle !== 0) {
      tanAngle = sinAngle / cosAngle; // calculate right and left

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
      cotAngle = cosAngle / sinAngle; // calculate  top and bottom

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
  /**
   * radialFilled 组装器
   * 可通过 `UI.radialFilled` 获取该组装器。
   */


  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_utilsJs) {
      fillVertices3D = _utilsJs.fillVertices3D;
    }, function (_utilsDynamicAtlasAtlasManagerJs) {
      dynamicAtlasManager = _utilsDynamicAtlasAtlasManagerJs.dynamicAtlasManager;
    }],
    execute: function () {
      PI_2 = Math.PI * 2;
      EPSILON = 1e-6;
      tempColor = new Color(255, 255, 255, 255);
      _vertPos = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
      _vertices = new Array(4);
      _uvs = new Array(8);
      _intersectPoint_1 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
      _intersectPoint_2 = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
      _center = new Vec2();
      _triangles = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];

      _export("radialFilled", radialFilled = {
        useModel: false,
        createData: function createData(sprite) {
          return sprite.requestRenderData();
        },
        updateRenderData: function updateRenderData(sprite) {
          var frame = sprite.spriteFrame; // TODO: Material API design and export from editor could affect the material activation process
          // need to update the logic here
          // if (frame) {
          //     if (!frame._original && dynamicAtlasManager) {
          //         dynamicAtlasManager.insertSpriteFrame(frame);
          //     }
          //     if (sprite._material._texture !== frame._texture) {
          //         sprite._activateMaterial();
          //     }
          // }

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
              } // do round fill start [0,1), include 0, exclude 1


              while (fillStart >= 1.0) {
                fillStart -= 1.0;
              }

              while (fillStart < 0.0) {
                fillStart += 1.0;
              }

              fillStart *= PI_2;
              fillRange *= PI_2;
              var fillEnd = fillStart + fillRange; // build vertices

              _calculateVertices(sprite); // build uvs


              _calculateUVs(frame);

              _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart, _intersectPoint_1);

              _calcIntersectedPoints(_vertices[0], _vertices[2], _vertices[1], _vertices[3], _center, fillStart + fillRange, _intersectPoint_2);

              var offset = 0;

              for (var triangleIndex = 0; triangleIndex < 4; ++triangleIndex) {
                var triangle = _triangles[triangleIndex];

                if (!triangle) {
                  continue;
                } // all in


                if (fillRange >= PI_2) {
                  renderData.dataLength = offset + 3;

                  _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);

                  offset += 3;
                  continue;
                } // test against


                var startAngle = _getVertAngle(_center, _vertPos[triangle.x]);

                var endAngle = _getVertAngle(_center, _vertPos[triangle.y]);

                if (endAngle < startAngle) {
                  endAngle += PI_2;
                }

                startAngle -= PI_2;
                endAngle -= PI_2; // testing

                for (var testIndex = 0; testIndex < 3; ++testIndex) {
                  if (startAngle >= fillEnd) {// all out
                  } else if (startAngle >= fillStart) {
                    renderData.dataLength = offset + 3;

                    if (endAngle >= fillEnd) {
                      // startAngle to fillEnd
                      _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _intersectPoint_2[triangleIndex]);
                    } else {
                      // startAngle to endAngle
                      _generateTriangle(dataList, offset, _center, _vertPos[triangle.x], _vertPos[triangle.y]);
                    }

                    offset += 3;
                  } else if (endAngle > fillStart) {
                    // startAngle < fillStart
                    if (endAngle <= fillEnd) {
                      renderData.dataLength = offset + 3; // fillStart to endAngle

                      _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _vertPos[triangle.y]);

                      offset += 3;
                    } else {
                      renderData.dataLength = offset + 3; // fillStart to fillEnd

                      _generateTriangle(dataList, offset, _center, _intersectPoint_1[triangleIndex], _intersectPoint_2[triangleIndex]);

                      offset += 3;
                    }
                  } // add 2 * PI


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
          tempColor.set(comp.color);
          tempColor.a = node._uiProps.opacity * 255;
          fillVertices3D(node, renderer, renderData, tempColor);
        },
        updateColor: function updateColor(sprite) {}
      });
    }
  };
});