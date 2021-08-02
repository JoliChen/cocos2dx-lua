System.register("q-bundled:///fs/cocos/core/renderer/scene/skybox.js", ["../../builtin/index.js", "../../assets/material.js", "../../pipeline/define.js", "../core/material-instance.js", "../core/sampler-lib.js", "../../global-exports.js", "../core/memory-pools.js"], function (_export, _context) {
  "use strict";

  var builtinResMgr, Material, UNIFORM_ENVIRONMENT_BINDING, MaterialInstance, samplerLib, legacyCC, SkyboxPool, NULL_HANDLE, SkyboxView, skybox_mesh, skybox_material, Skybox;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_builtinIndexJs) {
      builtinResMgr = _builtinIndexJs.builtinResMgr;
    }, function (_assetsMaterialJs) {
      Material = _assetsMaterialJs.Material;
    }, function (_pipelineDefineJs) {
      UNIFORM_ENVIRONMENT_BINDING = _pipelineDefineJs.UNIFORM_ENVIRONMENT_BINDING;
    }, function (_coreMaterialInstanceJs) {
      MaterialInstance = _coreMaterialInstanceJs.MaterialInstance;
    }, function (_coreSamplerLibJs) {
      samplerLib = _coreSamplerLibJs.samplerLib;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_coreMemoryPoolsJs) {
      SkyboxPool = _coreMemoryPoolsJs.SkyboxPool;
      NULL_HANDLE = _coreMemoryPoolsJs.NULL_HANDLE;
      SkyboxView = _coreMemoryPoolsJs.SkyboxView;
    }],
    execute: function () {
      skybox_mesh = null;
      skybox_material = null;

      _export("Skybox", Skybox = /*#__PURE__*/function () {
        function Skybox() {
          this._envmap = null;
          this._globalDSManager = null;
          this._model = null;
          this._default = null;
          this._handle = NULL_HANDLE;
          this._handle = SkyboxPool.alloc();
        }

        var _proto = Skybox.prototype;

        _proto.initialize = function initialize(skyboxInfo) {
          SkyboxPool.set(this._handle, SkyboxView.ENABLE, skyboxInfo.enabled ? 1 : 0);
          SkyboxPool.set(this._handle, SkyboxView.USE_IBL, skyboxInfo.useIBL ? 1 : 0);
          SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, skyboxInfo.isRGBE ? 1 : 0);
          this._envmap = skyboxInfo.envmap;
        };

        _proto.activate = function activate() {
          var pipeline = legacyCC.director.root.pipeline;
          var ambient = pipeline.pipelineSceneData.ambient;
          this._globalDSManager = pipeline.globalDSManager;
          this._default = builtinResMgr.get('default-cube-texture');

          if (!this._model) {
            this._model = legacyCC.director.root.createModel(legacyCC.renderer.scene.Model); // @ts-expect-error private member access

            this._model._initLocalDescriptors = function () {};
          }

          SkyboxPool.set(this._handle, SkyboxView.MODEL, this._model.handle);

          if (!this._envmap) {
            this._envmap = this._default;
          }

          ambient.albedoArray[3] = this._envmap.mipmapLevel;

          if (!skybox_material) {
            var mat = new Material();
            mat.initialize({
              effectName: 'skybox',
              defines: {
                USE_RGBE_CUBEMAP: this.isRGBE
              }
            });
            skybox_material = new MaterialInstance({
              parent: mat
            });
          } else {
            skybox_material.recompileShaders({
              USE_RGBE_CUBEMAP: this.isRGBE
            });
          }

          if (this.enabled) {
            if (!skybox_mesh) {
              skybox_mesh = legacyCC.utils.createMesh(legacyCC.primitives.box({
                width: 2,
                height: 2,
                length: 2
              }));
            }

            this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
          }

          this._updateGlobalBinding();

          this._updatePipeline();
        };

        _proto._updatePipeline = function _updatePipeline() {
          var value = this.useIBL ? this.isRGBE ? 2 : 1 : 0;
          var root = legacyCC.director.root;
          var pipeline = root.pipeline;
          var current = pipeline.macros.CC_USE_IBL;

          if (current === value) {
            return;
          }

          pipeline.macros.CC_USE_IBL = value;
          root.onGlobalPipelineStateChanged();
        };

        _proto._updateGlobalBinding = function _updateGlobalBinding() {
          var texture = this.envmap.getGFXTexture();
          var sampler = samplerLib.getSampler(legacyCC.director._device, this.envmap.getSamplerHash());

          this._globalDSManager.bindSampler(UNIFORM_ENVIRONMENT_BINDING, sampler);

          this._globalDSManager.bindTexture(UNIFORM_ENVIRONMENT_BINDING, texture);

          this._globalDSManager.update();
        };

        _proto.destroy = function destroy() {
          if (this._handle) {
            SkyboxPool.free(this._handle);
            this._handle = NULL_HANDLE;
          }
        };

        _createClass(Skybox, [{
          key: "model",
          get: function get() {
            return this._model;
          }
          /**
           * @en Whether activate skybox in the scene
           * @zh 是否启用天空盒？
           */

        }, {
          key: "enabled",
          get: function get() {
            return SkyboxPool.get(this._handle, SkyboxView.ENABLE);
          },
          set: function set(val) {
            SkyboxPool.set(this._handle, SkyboxView.ENABLE, val ? 1 : 0);
            if (val) this.activate();else this._updatePipeline();
          }
          /**
           * @en Whether use environment lighting
           * @zh 是否启用环境光照？
           */

        }, {
          key: "useIBL",
          get: function get() {
            return SkyboxPool.get(this._handle, SkyboxView.USE_IBL);
          },
          set: function set(val) {
            SkyboxPool.set(this._handle, SkyboxView.USE_IBL, val ? 1 : 0);

            this._updatePipeline();
          }
          /**
           * @en Whether enable RGBE data support in skybox shader
           * @zh 是否需要开启 shader 内的 RGBE 数据支持？
           */

        }, {
          key: "isRGBE",
          get: function get() {
            return SkyboxPool.get(this._handle, SkyboxView.IS_RGBE);
          },
          set: function set(val) {
            if (val) {
              if (skybox_material) {
                skybox_material.recompileShaders({
                  USE_RGBE_CUBEMAP: val
                });
              }

              if (this._model) {
                this._model.setSubModelMaterial(0, skybox_material);
              }
            }

            SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, val ? 1 : 0);

            this._updatePipeline();
          }
          /**
           * @en The texture cube used for the skybox
           * @zh 使用的立方体贴图
           */

        }, {
          key: "envmap",
          get: function get() {
            return this._envmap;
          },
          set: function set(val) {
            this._envmap = val || this._default;

            if (this._envmap) {
              legacyCC.director.root.pipeline.pipelineSceneData.ambient.albedoArray[3] = this._envmap.mipmapLevel;

              this._updateGlobalBinding();
            }
          }
        }, {
          key: "handle",
          get: function get() {
            return this._handle;
          }
        }]);

        return Skybox;
      }());

      legacyCC.Skybox = Skybox;
    }
  };
});