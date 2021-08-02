System.register("q-bundled:///fs/cocos/core/pipeline/pipeline-scene-data.js", ["../renderer/scene/fog.js", "../renderer/scene/ambient.js", "../renderer/scene/skybox.js", "../renderer/scene/shadows.js", "../renderer/core/memory-pools.js", "../builtin/builtin-res-mgr.js"], function (_export, _context) {
  "use strict";

  var Fog, Ambient, Skybox, Shadows, PipelineSceneDataPool, PipelineSceneDataView, builtinResMgr, PipelineSceneData;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_rendererSceneFogJs) {
      Fog = _rendererSceneFogJs.Fog;
    }, function (_rendererSceneAmbientJs) {
      Ambient = _rendererSceneAmbientJs.Ambient;
    }, function (_rendererSceneSkyboxJs) {
      Skybox = _rendererSceneSkyboxJs.Skybox;
    }, function (_rendererSceneShadowsJs) {
      Shadows = _rendererSceneShadowsJs.Shadows;
    }, function (_rendererCoreMemoryPoolsJs) {
      PipelineSceneDataPool = _rendererCoreMemoryPoolsJs.PipelineSceneDataPool;
      PipelineSceneDataView = _rendererCoreMemoryPoolsJs.PipelineSceneDataView;
    }, function (_builtinBuiltinResMgrJs) {
      builtinResMgr = _builtinBuiltinResMgrJs.builtinResMgr;
    }],
    execute: function () {
      _export("PipelineSceneData", PipelineSceneData = /*#__PURE__*/function () {
        function PipelineSceneData() {
          this.fog = new Fog();
          this.ambient = new Ambient();
          this.skybox = new Skybox();
          this.shadows = new Shadows();
          this.renderObjects = [];
          this.shadowObjects = [];
          this.shadowFrameBufferMap = new Map();
          this._handle = PipelineSceneDataPool.alloc();
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.AMBIENT, this.ambient.handle);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SKYBOX, this.skybox.handle);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FOG, this.fog.handle);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADOW, this.shadows.handle);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.IS_HDR, 0);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADING_SCALE, 1.0);
          PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FP_SCALE, 1.0 / 1024.0);
        }

        var _proto = PipelineSceneData.prototype;

        _proto.initDeferredPassInfo = function initDeferredPassInfo() {
          var builinDeferred = builtinResMgr.get('builtin-deferred-material');

          if (builinDeferred) {
            var passLit = builinDeferred.passes[0];
            passLit.beginChangeStatesSilently();
            passLit.tryCompile();
            passLit.endChangeStatesSilently();
          }

          var builtinPostProcess = builtinResMgr.get('builtin-post-process-material');

          if (builtinPostProcess) {
            var passPost = builtinPostProcess.passes[0];
            passPost.beginChangeStatesSilently();
            passPost.tryCompile();
            passPost.endChangeStatesSilently();
          }

          if (builinDeferred) {
            var _passLit = builinDeferred.passes[0];
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS, _passLit.handle);
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER, _passLit.getShaderVariant());
          }

          if (builtinPostProcess) {
            var _passPost = builtinPostProcess.passes[0];
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS, _passPost.handle);
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS_SHADER, _passPost.getShaderVariant());
          }
        };

        _proto.activate = function activate(device, pipeline) {
          this._device = device;
          this._pipeline = pipeline;
          this.initDeferredPassInfo();
          return true;
        };

        _proto.destroy = function destroy() {
          this.ambient.destroy();
          this.skybox.destroy();
          this.fog.destroy();
          this.shadows.destroy();

          if (this._handle) {
            PipelineSceneDataPool.free(this._handle);
          }
        };

        _createClass(PipelineSceneData, [{
          key: "handle",
          get: function get() {
            return this._handle;
          }
          /**
           * @en Is open HDR.
           * @zh 是否开启 HDR。
           * @readonly
           */

        }, {
          key: "isHDR",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.IS_HDR);
          },
          set: function set(val) {
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.IS_HDR, val ? 1 : 0);
          }
        }, {
          key: "shadingScale",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.SHADING_SCALE);
          },
          set: function set(val) {
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.SHADING_SCALE, val);
          }
        }, {
          key: "fpScale",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.FP_SCALE);
          },
          set: function set(val) {
            PipelineSceneDataPool.set(this._handle, PipelineSceneDataView.FP_SCALE, val);
          }
        }, {
          key: "deferredLightPassHandle",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS);
          }
        }, {
          key: "deferredLightPassShaderHandle",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_LIGHT_PASS_SHADER);
          }
        }, {
          key: "deferredPostPassHandle",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS);
          }
        }, {
          key: "deferredPostPassShaderHandle",
          get: function get() {
            return PipelineSceneDataPool.get(this._handle, PipelineSceneDataView.DEFERRED_POST_PASS_SHADER);
          }
        }]);

        return PipelineSceneData;
      }());
    }
  };
});