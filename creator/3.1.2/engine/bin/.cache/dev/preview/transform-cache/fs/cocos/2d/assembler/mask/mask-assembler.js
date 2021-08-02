System.register("q-bundled:///fs/cocos/2d/assembler/mask/mask-assembler.js", ["../../components/mask.js", "../../renderer/stencil-manager.js", "../sprite/index.js"], function (_export, _context) {
  "use strict";

  var Mask, MaskType, StencilManager, simple, _stencilManager, maskAssembler, maskEndAssembler, StartAssembler, PostAssembler;

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

  return {
    setters: [function (_componentsMaskJs) {
      Mask = _componentsMaskJs.Mask;
      MaskType = _componentsMaskJs.MaskType;
    }, function (_rendererStencilManagerJs) {
      StencilManager = _rendererStencilManagerJs.StencilManager;
    }, function (_spriteIndexJs) {
      simple = _spriteIndexJs.simple;
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
      _stencilManager = StencilManager.sharedManager;

      _export("maskAssembler", maskAssembler = {
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
      });

      _export("maskEndAssembler", maskEndAssembler = {
        fillBuffers: function fillBuffers(mask, ui) {
          _stencilManager.exitMask();
        }
      });

      StartAssembler = {
        getAssembler: function getAssembler() {
          return maskAssembler;
        }
      };
      PostAssembler = {
        getAssembler: function getAssembler() {
          return maskEndAssembler;
        }
      };
      Mask.Assembler = StartAssembler;
      Mask.PostAssembler = PostAssembler;
    }
  };
});