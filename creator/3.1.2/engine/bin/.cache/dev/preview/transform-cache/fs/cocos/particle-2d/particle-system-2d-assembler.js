System.register("q-bundled:///fs/cocos/particle-2d/particle-system-2d-assembler.js", ["./particle-system-2d.js", "../2d/renderer/render-data.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ParticleSystem2D, MeshRenderData, legacyCC, ParticleAssembler, ParticleSystem2DAssembler;
  return {
    setters: [function (_particleSystem2dJs) {
      ParticleSystem2D = _particleSystem2dJs.ParticleSystem2D;
    }, function (_dRendererRenderDataJs) {
      MeshRenderData = _dRendererRenderDataJs.MeshRenderData;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
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
      _export("ParticleAssembler", ParticleAssembler = {
        maxParticleDeltaTime: 0,
        createData: function createData(comp) {
          return MeshRenderData.add();
        },
        updateRenderData: function updateRenderData() {},
        fillBuffers: function fillBuffers(comp, renderer) {
          if (comp === null) {
            return;
          }

          var renderData = comp._simulator.renderData;

          if (renderData.vertexCount === 0 || renderData.indicesCount === 0) {
            return;
          }

          var buffer = renderer.acquireBufferBatch();
          var vertexOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexId = buffer.vertexOffset;
          var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            indicesOffset = 0;
            vertexId = 0;
          } // buffer data may be realloc, need get reference after request.


          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var vData = renderData.vData;
          var iData = renderData.iData;
          var vLen = renderData.vertexCount * 9;

          for (var i = 0; i < vLen; i++) {
            vBuf[vertexOffset++] = vData[i];
          }

          var iLen = renderData.indicesCount;

          for (var _i = 0; _i < iLen; _i++) {
            iBuf[indicesOffset++] = iData[_i] + vertexId;
          }
        }
      });

      _export("ParticleSystem2DAssembler", ParticleSystem2DAssembler = {
        getAssembler: function getAssembler(comp) {
          if (!ParticleAssembler.maxParticleDeltaTime) {
            ParticleAssembler.maxParticleDeltaTime = legacyCC.game.frameTime / 1000 * 2;
          }

          return ParticleAssembler;
        }
      });

      ParticleSystem2D.Assembler = ParticleSystem2DAssembler;
    }
  };
});