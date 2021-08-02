System.register("q-bundled:///fs/cocos/2d/assembler/sprite/sliced.js", ["../../../core/math/index.js", "../../utils/dynamic-atlas/atlas-manager.js"], function (_export, _context) {
  "use strict";

  var Color, Mat4, Vec3, dynamicAtlasManager, vec3_temp, matrix, sliced;
  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Mat4 = _coreMathIndexJs.Mat4;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_utilsDynamicAtlasAtlasManagerJs) {
      dynamicAtlasManager = _utilsDynamicAtlasAtlasManagerJs.dynamicAtlasManager;
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
       * @module ui-assembler
       */
      vec3_temp = new Vec3();
      matrix = new Mat4();
      /**
       * sliced 组装器
       * 可通过 `UI.sliced` 获取该组装器。
       */

      _export("sliced", sliced = {
        useModel: false,
        createData: function createData(sprite) {
          var renderData = sprite.requestRenderData(); // 0-4 for local vertex
          // 5-20 for world vertex

          renderData.dataLength = 20;
          renderData.vertexCount = 16;
          renderData.indicesCount = 54;
          return renderData;
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
          var renderData = sprite.renderData; // const node: Node = sprite.node;
          // const color: Color = sprite.color;

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
          } // buffer data may be realloc, need get reference after request.


          var vBuf = buffer.vData; // const  uintbuf = buffer._uintVData,

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
            vertexOffset += 4; // uintbuf[vertexOffset++] = color;
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
          node.getWorldMatrix(matrix);

          for (var row = 0; row < 4; ++row) {
            var rowD = dataList[row];

            for (var col = 0; col < 4; ++col) {
              var colD = dataList[col];
              var world = dataList[4 + row * 4 + col];
              Vec3.set(vec3_temp, colD.x, rowD.y, 0);
              Vec3.transformMat4(world, vec3_temp, matrix);
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
      });
    }
  };
});