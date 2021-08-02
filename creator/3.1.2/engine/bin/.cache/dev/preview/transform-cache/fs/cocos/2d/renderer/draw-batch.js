System.register("q-bundled:///fs/cocos/2d/renderer/draw-batch.js", ["../../core/renderer/core/memory-pools.js", "../../core/scene-graph/layers.js", "../../core/global-exports.js", "../../core/renderer/core/pass.js"], function (_export, _context) {
  "use strict";

  var NULL_HANDLE, BatchPool2D, BatchView2D, PassPool, Layers, legacyCC, Pass, UI_VIS_FLAG, DrawBatch2D;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreRendererCoreMemoryPoolsJs) {
      NULL_HANDLE = _coreRendererCoreMemoryPoolsJs.NULL_HANDLE;
      BatchPool2D = _coreRendererCoreMemoryPoolsJs.BatchPool2D;
      BatchView2D = _coreRendererCoreMemoryPoolsJs.BatchView2D;
      PassPool = _coreRendererCoreMemoryPoolsJs.PassPool;
    }, function (_coreSceneGraphLayersJs) {
      Layers = _coreSceneGraphLayersJs.Layers;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreRendererCorePassJs) {
      Pass = _coreRendererCorePassJs.Pass;
    }],
    execute: function () {
      UI_VIS_FLAG = Layers.Enum.NONE | Layers.Enum.UI_3D;

      _export("DrawBatch2D", DrawBatch2D = /*#__PURE__*/function () {
        function DrawBatch2D() {
          this.bufferBatch = null;
          this.camera = null;
          this.renderScene = null;
          this.model = null;
          this.texture = null;
          this.sampler = null;
          this.useLocalData = null;
          this.isStatic = false;
          this.textureHash = 0;
          this.samplerHash = 0;
          this._handle = NULL_HANDLE;
          this._passes = [];
          this._handle = BatchPool2D.alloc();
          BatchPool2D.set(this._handle, BatchView2D.VIS_FLAGS, UI_VIS_FLAG);
          BatchPool2D.set(this._handle, BatchView2D.INPUT_ASSEMBLER, NULL_HANDLE);
          BatchPool2D.set(this._handle, BatchView2D.DESCRIPTOR_SET, NULL_HANDLE);
        }

        var _proto = DrawBatch2D.prototype;

        _proto.destroy = function destroy(ui) {
          if (this._handle) {
            var length = this.passes.length;

            for (var i = 0; i < length; i++) {
              // @ts-expect-error hack for UI destroyHandle
              this.passes[i]._destroyHandle();
            }

            this._passes = [];
            BatchPool2D.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        };

        _proto.clear = function clear() {
          this.bufferBatch = null;
          this.hInputAssembler = NULL_HANDLE;
          this.hDescriptorSet = NULL_HANDLE;
          this.camera = null;
          this.texture = null;
          this.sampler = null;
          this.model = null;
          this.isStatic = false;
          this.useLocalData = null;
          this.visFlags = UI_VIS_FLAG;
        } // object version
        ;

        _proto.fillPasses = function fillPasses(mat, dss, dssHash, bs, bsHash, patches) {
          if (mat) {
            var passes = mat.passes;

            if (!passes) {
              return;
            }

            BatchPool2D.set(this._handle, BatchView2D.PASS_COUNT, passes.length);
            var passOffset = BatchView2D.PASS_0;
            var shaderOffset = BatchView2D.SHADER_0;
            var hashFactor = 0;

            for (var i = 0; i < passes.length; i++, passOffset++, shaderOffset++) {
              if (!this._passes[i]) {
                this._passes[i] = new Pass(legacyCC.director.root); // @ts-expect-error hack for UI use pass object

                this._passes[i]._handle = PassPool.alloc();
              }

              var mtlPass = passes[i];
              var passInUse = this._passes[i];

              if (!dss) {
                dss = mtlPass.depthStencilState;
                dssHash = 0;
              }

              if (!bs) {
                bs = mtlPass.blendState;
                bsHash = 0;
              }

              if (bsHash === -1) {
                bsHash = 0;
              }

              hashFactor = dssHash << 16 | bsHash;
              mtlPass.update(); // @ts-expect-error hack for UI use pass object

              passInUse._initPassFromTarget(mtlPass, dss, bs, hashFactor);

              BatchPool2D.set(this._handle, passOffset, passInUse.handle);
              BatchPool2D.set(this._handle, shaderOffset, passInUse.getShaderVariant(patches));
            }
          }
        };

        _createClass(DrawBatch2D, [{
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }, {
          key: "hInputAssembler",
          get: function get() {
            return BatchPool2D.get(this._handle, BatchView2D.INPUT_ASSEMBLER);
          },
          set: function set(handle) {
            BatchPool2D.set(this._handle, BatchView2D.INPUT_ASSEMBLER, handle);
          }
        }, {
          key: "hDescriptorSet",
          get: function get() {
            return BatchPool2D.get(this._handle, BatchView2D.DESCRIPTOR_SET);
          },
          set: function set(handle) {
            BatchPool2D.set(this._handle, BatchView2D.DESCRIPTOR_SET, handle);
          }
        }, {
          key: "visFlags",
          get: function get() {
            return BatchPool2D.get(this._handle, BatchView2D.VIS_FLAGS);
          },
          set: function set(vis) {
            BatchPool2D.set(this._handle, BatchView2D.VIS_FLAGS, vis);
          }
        }, {
          key: "passes",
          get: function get() {
            return this._passes;
          }
        }]);

        return DrawBatch2D;
      }());
    }
  };
});