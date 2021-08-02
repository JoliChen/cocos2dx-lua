System.register("q-bundled:///fs/cocos/2d/assembler/label/bmfont.js", ["../../../core/utils/js.js", "../../../core/math/index.js", "../utils.js", "./bmfontUtils.js"], function (_export, _context) {
  "use strict";

  var js, Color, fillMeshVertices3D, bmfontUtils, tempColor, bmfont;
  return {
    setters: [function (_coreUtilsJsJs) {
      js = _coreUtilsJsJs;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_utilsJs) {
      fillMeshVertices3D = _utilsJs.fillMeshVertices3D;
    }, function (_bmfontUtilsJs) {
      bmfontUtils = _bmfontUtilsJs.bmfontUtils;
    }],
    execute: function () {
      /*
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
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
      tempColor = new Color(255, 255, 255, 255);
      /**
       * bmfont 组装器
       * 可通过 `UI.bmfont` 获取该组装器。
       */

      _export("bmfont", bmfont = {
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
      });

      js.addon(bmfont, bmfontUtils);
    }
  };
});