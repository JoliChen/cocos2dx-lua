System.register("q-bundled:///fs/cocos/particle/renderer/particle-system-renderer-base.js", ["../models/particle-batch-model.js", "../enum.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ParticleBatchModel, RenderMode, legacyCC, ParticleSystemRendererBase;
  return {
    setters: [function (_modelsParticleBatchModelJs) {
      ParticleBatchModel = _modelsParticleBatchModelJs.default;
    }, function (_enumJs) {
      RenderMode = _enumJs.RenderMode;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
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
      _export("ParticleSystemRendererBase", ParticleSystemRendererBase = /*#__PURE__*/function () {
        function ParticleSystemRendererBase(info) {
          this._particleSystem = null;
          this._model = null;
          this._renderInfo = null;
          this._vertAttrs = [];
          this._renderInfo = info;
        }

        var _proto = ParticleSystemRendererBase.prototype;

        _proto.onInit = function onInit(ps) {
          this._particleSystem = ps;
        };

        _proto.onEnable = function onEnable() {
          if (!this._particleSystem) {
            return;
          }

          this.attachToScene();
          var model = this._model;

          if (model) {
            model.node = model.transform = this._particleSystem.node;
            model.enabled = this._particleSystem.enabledInHierarchy;
          }
        };

        _proto.onDisable = function onDisable() {
          this.detachFromScene();
        };

        _proto.onDestroy = function onDestroy() {
          if (this._model) {
            legacyCC.director.root.destroyModel(this._model);
            this._model = null;
          }
        };

        _proto.attachToScene = function attachToScene() {
          if (this._model) {
            if (this._model.scene) {
              this.detachFromScene();
            }

            this._particleSystem._getRenderScene().addModel(this._model);
          }
        };

        _proto.detachFromScene = function detachFromScene() {
          if (this._model && this._model.scene) {
            this._model.scene.removeModel(this._model);
          }
        };

        _proto.setVertexAttributes = function setVertexAttributes() {
          if (this._model) {
            this._model.setVertexAttributes(this._renderInfo.renderMode === RenderMode.Mesh ? this._renderInfo.mesh : null, this._vertAttrs);
          }
        };

        _proto.clear = function clear() {
          if (this._model) this._model.enabled = false;
        };

        _proto._initModel = function _initModel() {
          if (!this._model) {
            this._model = legacyCC.director.root.createModel(ParticleBatchModel);

            this._model.setCapacity(this._particleSystem.capacity);

            this._model.visFlags = this._particleSystem.visibility;
          }
        };

        _proto.updateTrailMaterial = function updateTrailMaterial() {};

        _proto.getDefaultTrailMaterial = function getDefaultTrailMaterial() {
          return null;
        };

        return ParticleSystemRendererBase;
      }());
    }
  };
});