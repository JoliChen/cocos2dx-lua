System.register("q-bundled:///fs/cocos/2d/assembler/label/letter.js", ["../../../core/utils/js.js", "../utils.js", "./bmfont.js", "./letter-font.js", "../../../core/math/color.js"], function (_export, _context) {
  "use strict";

  var addon, fillMeshVertices3D, bmfont, letterFont, Color, WHITE, letter;
  return {
    setters: [function (_coreUtilsJsJs) {
      addon = _coreUtilsJsJs.addon;
    }, function (_utilsJs) {
      fillMeshVertices3D = _utilsJs.fillMeshVertices3D;
    }, function (_bmfontJs) {
      bmfont = _bmfontJs.bmfont;
    }, function (_letterFontJs) {
      letterFont = _letterFontJs.letterFont;
    }, function (_coreMathColorJs) {
      Color = _coreMathColorJs.Color;
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
      WHITE = new Color(255, 255, 255, 255);
      /**
       * letter 组装器
       * 可通过 `UI.letter` 获取该组装器。
       */

      _export("letter", letter = {
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
      });

      addon(letter, letterFont);
    }
  };
});