System.register("q-bundled:///fs/cocos/2d/assembler/sprite/tiled.js", ["../../../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, Color, vec3_temps, i, _perVertexLength, tiled;

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Color = _coreMathIndexJs.Color;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
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
       * @hidden
       */
      vec3_temps = [];

      for (i = 0; i < 4; i++) {
        vec3_temps.push(new Vec3());
      }

      _perVertexLength = 9;

      _export("tiled", tiled = {
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
          this.updateVerts(sprite, sizableWidth, sizableHeight, row, col); // update data property

          renderData.vertexCount = row * col * 4;
          renderData.indicesCount = row * col * 6;
          renderData.uvDirty = false;
          renderData.vertDirty = false; // Tiled mode create data is after updateColor

          this.updateColor(sprite);
        },
        fillBuffers: function fillBuffers(sprite, renderer) {
          var node = sprite.node;
          var uiTrans = sprite.node._uiProps.uiTransformComp;
          var contentWidth = Math.abs(uiTrans.width);
          var contentHeight = Math.abs(uiTrans.height);
          var renderData = sprite.renderData; // buffer

          var buffer = renderer.acquireBufferBatch(); // buffer data may be realloc, need get reference after request.

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
              var vertexOffsetV = vertexOffsetU + 1; // UV

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
              } // lb


              vBuf[vertexOffsetU] = tempXVerts[0];
              vBuf[vertexOffsetV] = tempYVerts[0]; // rb

              vBuf[vertexOffsetU + offset1] = tempXVerts[1];
              vBuf[vertexOffsetV + offset1] = tempYVerts[1]; // lt

              vBuf[vertexOffsetU + offset2] = tempXVerts[2];
              vBuf[vertexOffsetV + offset2] = tempYVerts[2]; // rt

              vBuf[vertexOffsetU + offset3] = tempXVerts[3];
              vBuf[vertexOffsetV + offset3] = tempYVerts[3]; // color
              // Hack: the color is same

              Color.toArray(vBuf, datalist[0].color, vertexOffsetV + 1);
              Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset1 + 1);
              Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset2 + 1);
              Color.toArray(vBuf, datalist[0].color, vertexOffsetV + offset3 + 1);
              vertexOffset += offset4;
            }
          } // update indices


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
              Vec3.set(vec3_temps[0], x, y, 0);
              Vec3.set(vec3_temps[1], x1, y, 0);
              Vec3.set(vec3_temps[2], x, y1, 0);
              Vec3.set(vec3_temps[3], x1, y1, 0);

              for (var _i2 = 0; _i2 < 4; _i2++) {
                var vec3_temp = vec3_temps[_i2];
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
            /*
             * Because the float numerical calculation in javascript is not accurate enough,
             * there is an expected result of 1.0, but the actual result is 1.000001.
             */
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
      });
    }
  };
});