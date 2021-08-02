System.register("q-bundled:///fs/cocos/particle/renderer/particle-system-renderer-data.js", ["../../core/data/decorators/index.js", "../../3d/index.js", "../../core/assets/index.js", "../enum.js", "./particle-system-renderer-cpu.js", "./particle-system-renderer-gpu.js", "../../core/director.js", "../../core/gfx/index.js", "../../core/global-exports.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, tooltip, displayOrder, type, serializable, Mesh, Material, RenderMode, ParticleSystemRendererCPU, ParticleSystemRendererGPU, director, Feature, legacyCC, errorID, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, ParticleSystemRenderer;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function isSupportGPUParticle() {
    var device = director.root.device;

    if (device.capabilities.maxVertexTextureUnits >= 8 && device.hasFeature(Feature.TEXTURE_FLOAT)) {
      return true;
    }

    legacyCC.warn('Maybe the device has restrictions on vertex textures or does not support float textures.');
    return false;
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_dIndexJs) {
      Mesh = _dIndexJs.Mesh;
    }, function (_coreAssetsIndexJs) {
      Material = _coreAssetsIndexJs.Material;
    }, function (_enumJs) {
      RenderMode = _enumJs.RenderMode;
    }, function (_particleSystemRendererCpuJs) {
      ParticleSystemRendererCPU = _particleSystemRendererCpuJs.default;
    }, function (_particleSystemRendererGpuJs) {
      ParticleSystemRendererGPU = _particleSystemRendererGpuJs.default;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
    }, function (_coreGfxIndexJs) {
      Feature = _coreGfxIndexJs.Feature;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreIndexJs) {
      errorID = _coreIndexJs.errorID;
    }],
    execute: function () {
      _export("default", ParticleSystemRenderer = (_dec = ccclass('cc.ParticleSystemRenderer'), _dec2 = type(RenderMode), _dec3 = displayOrder(0), _dec4 = tooltip('i18n:particleSystemRenderer.renderMode'), _dec5 = displayOrder(1), _dec6 = tooltip('i18n:particleSystemRenderer.velocityScale'), _dec7 = displayOrder(2), _dec8 = tooltip('i18n:particleSystemRenderer.lengthScale'), _dec9 = type(RenderMode), _dec10 = type(Mesh), _dec11 = displayOrder(7), _dec12 = tooltip('i18n:particleSystemRenderer.mesh'), _dec13 = type(Material), _dec14 = displayOrder(8), _dec15 = tooltip('i18n:particleSystemRenderer.particleMaterial'), _dec16 = type(Material), _dec17 = displayOrder(9), _dec18 = tooltip('i18n:particleSystemRenderer.trailMaterial'), _dec19 = displayOrder(10), _dec20 = tooltip('i18n:particleSystemRenderer.useGPU'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
        function ParticleSystemRenderer() {
          _initializerDefineProperty(this, "_renderMode", _descriptor, this);

          _initializerDefineProperty(this, "_velocityScale", _descriptor2, this);

          _initializerDefineProperty(this, "_lengthScale", _descriptor3, this);

          _initializerDefineProperty(this, "_mesh", _descriptor4, this);

          _initializerDefineProperty(this, "_mainTexture", _descriptor5, this);

          _initializerDefineProperty(this, "_useGPU", _descriptor6, this);

          this._particleSystem = null;
        }

        var _proto = ParticleSystemRenderer.prototype;

        // ParticleSystem
        _proto.create = function create(ps) {
          // if particle system is null we run the old routine
          // else if particle system is not null we do nothing
          if (this._particleSystem === null) {
            this._particleSystem = ps;
          } else if (this._particleSystem !== ps) {
            errorID(6033);
          }
        };

        _proto.onInit = function onInit(ps) {
          this.create(ps);

          if (!this._particleSystem.processor) {
            var useGPU = this._useGPU && isSupportGPUParticle();
            this._particleSystem.processor = useGPU ? new ParticleSystemRendererGPU(this) : new ParticleSystemRendererCPU(this);

            this._particleSystem.processor.onInit(ps);
          } else {
            errorID(6034);
          }
        };

        _proto._switchProcessor = function _switchProcessor() {
          if (!this._particleSystem) {
            return;
          }

          if (this._particleSystem.processor) {
            this._particleSystem.processor.detachFromScene();

            this._particleSystem.processor.clear();

            this._particleSystem.processor = null;
          }

          this._particleSystem.processor = this._useGPU ? new ParticleSystemRendererGPU(this) : new ParticleSystemRendererCPU(this);

          this._particleSystem.processor.onInit(this._particleSystem);

          this._particleSystem.processor.onEnable();

          this._particleSystem.bindModule();
        };

        _createClass(ParticleSystemRenderer, [{
          key: "renderMode",
          get:
          /**
           * @zh 设定粒子生成模式。
           */
          function get() {
            return this._renderMode;
          },
          set: function set(val) {
            if (this._renderMode === val) {
              return;
            }

            this._renderMode = val;

            if (this._particleSystem) {
              this._particleSystem.processor.updateRenderMode();
            }
          }
          /**
           * @zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按速度大小进行拉伸。
           */

        }, {
          key: "velocityScale",
          get: function get() {
            return this._velocityScale;
          },
          set: function set(val) {
            this._velocityScale = val;

            if (this._particleSystem) {
              this._particleSystem.processor.updateMaterialParams();
            } // this._updateModel();

          }
          /**
           * @zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按粒子大小进行拉伸。
           */

        }, {
          key: "lengthScale",
          get: function get() {
            return this._lengthScale;
          },
          set: function set(val) {
            this._lengthScale = val;

            if (this._particleSystem) {
              this._particleSystem.processor.updateMaterialParams();
            } // this._updateModel();

          }
        }, {
          key: "mesh",
          get:
          /**
           * @zh 粒子发射的模型。
           */
          function get() {
            return this._mesh;
          },
          set: function set(val) {
            this._mesh = val;

            if (this._particleSystem) {
              this._particleSystem.processor.setVertexAttributes();
            }
          }
          /**
           * @zh 粒子使用的材质。
           */

        }, {
          key: "particleMaterial",
          get: function get() {
            if (!this._particleSystem) {
              return null;
            }

            return this._particleSystem.getMaterial(0);
          },
          set: function set(val) {
            if (this._particleSystem) {
              this._particleSystem.setMaterial(val, 0);
            }
          }
          /**
           * @zh 拖尾使用的材质。
           */

        }, {
          key: "trailMaterial",
          get: function get() {
            if (!this._particleSystem) {
              return null;
            }

            return this._particleSystem.getMaterial(1);
          },
          set: function set(val) {
            if (this._particleSystem) {
              this._particleSystem.setMaterial(val, 1);
            }
          }
        }, {
          key: "mainTexture",
          get: function get() {
            return this._mainTexture;
          },
          set: function set(val) {
            this._mainTexture = val;
          }
        }, {
          key: "useGPU",
          get: function get() {
            return this._useGPU;
          },
          set: function set(val) {
            if (this._useGPU === val) {
              return;
            }

            if (!isSupportGPUParticle()) {
              this._useGPU = false;
            } else {
              this._useGPU = val;
            }

            this._switchProcessor();
          }
        }]);

        return ParticleSystemRenderer;
      }(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "renderMode", [_dec2, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "renderMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "velocityScale", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lengthScale", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "lengthScale"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_renderMode", [_dec9, serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return RenderMode.Billboard;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_velocityScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lengthScale", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_mesh", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "mesh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "particleMaterial", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "particleMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trailMaterial", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "trailMaterial"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_mainTexture", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useGPU", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "useGPU", [_dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "useGPU"), _class2.prototype)), _class2)) || _class));
    }
  };
});