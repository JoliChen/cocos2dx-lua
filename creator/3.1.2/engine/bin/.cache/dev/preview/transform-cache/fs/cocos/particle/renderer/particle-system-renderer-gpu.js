System.register("q-bundled:///fs/cocos/particle/renderer/particle-system-renderer-gpu.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/builtin/index.js", "../../core/gfx/index.js", "../../core/math/index.js", "../../core/renderer/core/material-instance.js", "../enum.js", "../particle.js", "../animator/gradient-range.js", "../../core/renderer/core/pass.js", "../animator/curve-range.js", "./particle-system-renderer-base.js"], function (_export, _context) {
  "use strict";

  var EDITOR, builtinResMgr, AttributeName, Format, Attribute, Mat4, Vec2, Vec4, Quat, MaterialInstance, RenderMode, Space, Particle, packGradientRange, Pass, packCurveRangeXYZ, packCurveRangeZ, packCurveRangeXYZW, packCurveRangeN, packCurveRangeXY, ParticleSystemRendererBase, _tempWorldTrans, _tempVec4, _world_rot, _sample_num, _sample_interval, CC_USE_WORLD_SPACE, CC_RENDER_MODE, RENDER_MODE_BILLBOARD, RENDER_MODE_STRETCHED_BILLBOARD, RENDER_MODE_HORIZONTAL_BILLBOARD, RENDER_MODE_VERTICAL_BILLBOARD, RENDER_MODE_MESH, COLOR_OVER_TIME_MODULE_ENABLE, ROTATION_OVER_TIME_MODULE_ENABLE, SIZE_OVER_TIME_MODULE_ENABLE, VELOCITY_OVER_TIME_MODULE_ENABLE, FORCE_OVER_TIME_MODULE_ENABLE, TEXTURE_ANIMATION_MODULE_ENABLE, _vert_attr_name, _gpu_vert_attr, _gpu_vert_attr_mesh, _matInsInfo, ParticleSystemRendererGPU;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      Format = _coreGfxIndexJs.Format;
      Attribute = _coreGfxIndexJs.Attribute;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec4 = _coreMathIndexJs.Vec4;
      Quat = _coreMathIndexJs.Quat;
    }, function (_coreRendererCoreMaterialInstanceJs) {
      MaterialInstance = _coreRendererCoreMaterialInstanceJs.MaterialInstance;
    }, function (_enumJs) {
      RenderMode = _enumJs.RenderMode;
      Space = _enumJs.Space;
    }, function (_particleJs) {
      Particle = _particleJs.Particle;
    }, function (_animatorGradientRangeJs) {
      packGradientRange = _animatorGradientRangeJs.packGradientRange;
    }, function (_coreRendererCorePassJs) {
      Pass = _coreRendererCorePassJs.Pass;
    }, function (_animatorCurveRangeJs) {
      packCurveRangeXYZ = _animatorCurveRangeJs.packCurveRangeXYZ;
      packCurveRangeZ = _animatorCurveRangeJs.packCurveRangeZ;
      packCurveRangeXYZW = _animatorCurveRangeJs.packCurveRangeXYZW;
      packCurveRangeN = _animatorCurveRangeJs.packCurveRangeN;
      packCurveRangeXY = _animatorCurveRangeJs.packCurveRangeXY;
    }, function (_particleSystemRendererBaseJs) {
      ParticleSystemRendererBase = _particleSystemRendererBaseJs.ParticleSystemRendererBase;
    }],
    execute: function () {
      _tempWorldTrans = new Mat4();
      _tempVec4 = new Vec4();
      _world_rot = new Quat();
      _sample_num = 32;
      _sample_interval = 1.0 / _sample_num;
      CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
      CC_RENDER_MODE = 'CC_RENDER_MODE';
      RENDER_MODE_BILLBOARD = 0;
      RENDER_MODE_STRETCHED_BILLBOARD = 1;
      RENDER_MODE_HORIZONTAL_BILLBOARD = 2;
      RENDER_MODE_VERTICAL_BILLBOARD = 3;
      RENDER_MODE_MESH = 4;
      COLOR_OVER_TIME_MODULE_ENABLE = 'COLOR_OVER_TIME_MODULE_ENABLE';
      ROTATION_OVER_TIME_MODULE_ENABLE = 'ROTATION_OVER_TIME_MODULE_ENABLE';
      SIZE_OVER_TIME_MODULE_ENABLE = 'SIZE_OVER_TIME_MODULE_ENABLE';
      VELOCITY_OVER_TIME_MODULE_ENABLE = 'VELOCITY_OVER_TIME_MODULE_ENABLE';
      FORCE_OVER_TIME_MODULE_ENABLE = 'FORCE_OVER_TIME_MODULE_ENABLE';
      TEXTURE_ANIMATION_MODULE_ENABLE = 'TEXTURE_ANIMATION_MODULE_ENABLE';
      _vert_attr_name = {
        POSITION_STARTTIME: 'a_position_starttime',
        VERT_SIZE_UV: 'a_size_uv',
        VERT_ROTATION_UV: 'a_rotation_uv',
        COLOR: 'a_color',
        DIR_LIFE: 'a_dir_life',
        RANDOM_SEED: 'a_rndSeed'
      };
      _gpu_vert_attr = [new Attribute(_vert_attr_name.POSITION_STARTTIME, Format.RGBA32F), new Attribute(_vert_attr_name.VERT_SIZE_UV, Format.RGBA32F), new Attribute(_vert_attr_name.VERT_ROTATION_UV, Format.RGBA32F), new Attribute(_vert_attr_name.COLOR, Format.RGBA32F), new Attribute(_vert_attr_name.DIR_LIFE, Format.RGBA32F), new Attribute(_vert_attr_name.RANDOM_SEED, Format.R32F)];
      _gpu_vert_attr_mesh = [new Attribute(_vert_attr_name.POSITION_STARTTIME, Format.RGBA32F), new Attribute(_vert_attr_name.VERT_SIZE_UV, Format.RGBA32F), new Attribute(_vert_attr_name.VERT_ROTATION_UV, Format.RGBA32F), new Attribute(_vert_attr_name.COLOR, Format.RGBA32F), new Attribute(_vert_attr_name.DIR_LIFE, Format.RGBA32F), new Attribute(_vert_attr_name.RANDOM_SEED, Format.R32F), new Attribute(AttributeName.ATTR_TEX_COORD, Format.RGB32F), // uv,frame idx
      new Attribute(AttributeName.ATTR_TEX_COORD3, Format.RGB32F), // mesh position
      new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F), // mesh normal
      new Attribute(AttributeName.ATTR_COLOR1, Format.RGBA8, true) // mesh color
      ];
      _matInsInfo = {
        parent: null,
        owner: null,
        subModelIdx: 0
      };

      _export("default", ParticleSystemRendererGPU = /*#__PURE__*/function (_ParticleSystemRender) {
        _inheritsLoose(ParticleSystemRendererGPU, _ParticleSystemRender);

        function ParticleSystemRendererGPU(info) {
          var _this;

          _this = _ParticleSystemRender.call(this, info) || this;
          _this._defines = void 0;
          _this._frameTile_velLenScale = void 0;
          _this._node_scale = void 0;
          _this._vertAttrs = [];
          _this._defaultMat = null;
          _this._particleNum = 0;
          _this._tempParticle = null;
          _this._colorTexture = null;
          _this._forceTexture = null;
          _this._velocityTexture = null;
          _this._rotationTexture = null;
          _this._sizeTexture = null;
          _this._animTexture = null;
          _this._uTimeHandle = 0;
          _this._uRotHandle = 0;
          _this._inited = false;
          _this._frameTile_velLenScale = new Vec4(1, 1, 0, 0);
          _this._node_scale = new Vec4();
          _this._defines = {
            CC_USE_WORLD_SPACE: true,
            CC_USE_BILLBOARD: true,
            CC_USE_STRETCHED_BILLBOARD: false,
            CC_USE_HORIZONTAL_BILLBOARD: false,
            CC_USE_VERTICAL_BILLBOARD: false,
            COLOR_OVER_TIME_MODULE_ENABLE: false
          };
          _this._tempParticle = new Particle(null);
          _this._particleNum = 0;
          return _this;
        }

        var _proto = ParticleSystemRendererGPU.prototype;

        _proto.onInit = function onInit(ps) {
          _ParticleSystemRender.prototype.onInit.call(this, ps);

          this._setVertexAttrib();

          this._initModel();

          this.updateMaterialParams();
          this.setVertexAttributes();
          this._inited = true;
        };

        _proto.updateRenderMode = function updateRenderMode() {
          this._setVertexAttrib();

          this.updateMaterialParams();
          this.setVertexAttributes();
        };

        _proto.setVertexAttributes = function setVertexAttributes() {
          _ParticleSystemRender.prototype.setVertexAttributes.call(this);

          this._model.constructAttributeIndex();
        };

        _proto.clear = function clear() {
          _ParticleSystemRender.prototype.clear.call(this);

          this._particleNum = 0;
          this.updateRenderData();
        };

        _proto.onDestroy = function onDestroy() {
          _ParticleSystemRender.prototype.onDestroy.call(this);

          if (this._forceTexture) this._forceTexture.destroy();
          if (this._velocityTexture) this._velocityTexture.destroy();
          if (this._colorTexture) this._colorTexture.destroy();
          if (this._sizeTexture) this._sizeTexture.destroy();
          if (this._rotationTexture) this._rotationTexture.destroy();
          if (this._animTexture) this._animTexture.destroy();
        };

        _proto.enableModule = function enableModule(name, val, pm) {
          var mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

          if (!mat) {
            return;
          }

          this.initShaderUniform(mat);
          mat.recompileShaders(this._defines);

          if (this._model) {
            this._model.setSubModelMaterial(0, mat);
          }
        };

        _proto.getFreeParticle = function getFreeParticle() {
          if (this._particleNum >= this._particleSystem._capacity) {
            return null;
          }

          return this._tempParticle;
        };

        _proto.setNewParticle = function setNewParticle(p) {
          this._model.addGPUParticleVertexData(p, this._particleNum, this._particleSystem._time);

          this._particleNum++;
        };

        _proto.updateParticles = function updateParticles(dt) {
          if (EDITOR) {
            var mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

            this._particleSystem.node.getWorldMatrix(_tempWorldTrans);

            switch (this._particleSystem.scaleSpace) {
              case Space.Local:
                this._particleSystem.node.getScale(this._node_scale);

                break;

              case Space.World:
                this._particleSystem.node.getWorldScale(this._node_scale);

                break;

              default:
                break;
            }

            this.initShaderUniform(mat);
          }

          this._particleNum = this._model.updateGPUParticles(this._particleNum, this._particleSystem._time, dt);
          this.updateShaderUniform(dt);
          this._model.enabled = this._particleNum > 0;
          return this._particleNum;
        } // internal function
        ;

        _proto.updateRenderData = function updateRenderData() {};

        _proto.beforeRender = function beforeRender() {
          // update vertex buffer
          this._model.updateIA(this._particleNum);
        };

        _proto.updateShaderUniform = function updateShaderUniform(dt) {
          var mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

          if (!mat) {
            return;
          }

          var pass = mat.passes[0];
          _tempVec4.x = this._particleSystem._time;
          _tempVec4.y = dt;
          pass.setUniform(this._uTimeHandle, _tempVec4);

          this._particleSystem.node.getWorldRotation(_world_rot);

          pass.setUniform(this._uRotHandle, _world_rot);
        };

        _proto.initShaderUniform = function initShaderUniform(mat) {
          var pass = mat.passes[0];
          this._uTimeHandle = pass.getHandle('u_timeDelta');
          this._uRotHandle = pass.getHandle('u_worldRot');
          pass.setUniform(pass.getHandle('scale'), this._node_scale);
          pass.setUniform(pass.getHandle('frameTile_velLenScale'), this._frameTile_velLenScale);
          _tempVec4.x = _sample_num;
          _tempVec4.y = _sample_interval;
          pass.setUniform(pass.getHandle('u_sampleInfo'), _tempVec4);
          var enable = false; // force

          var forceModule = this._particleSystem._forceOvertimeModule;
          enable = forceModule && forceModule.enable;
          this._defines[FORCE_OVER_TIME_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._forceTexture) this._forceTexture.destroy();
            this._forceTexture = packCurveRangeXYZ(_sample_num, forceModule.x, forceModule.y, forceModule.z);
            var handle = pass.getHandle('force_over_time_tex0');
            var binding = Pass.getBindingFromHandle(handle);
            pass.bindSampler(binding, this._forceTexture.getGFXSampler());
            pass.bindTexture(binding, this._forceTexture.getGFXTexture());
            var spaceHandle = pass.getHandle('u_force_space');
            pass.setUniform(spaceHandle, forceModule.space);
            var modeHandle = pass.getHandle('u_force_mode');
            pass.setUniform(modeHandle, this._forceTexture.height);
          } // velocity


          var velocityModule = this._particleSystem._velocityOvertimeModule;
          enable = velocityModule && velocityModule.enable;
          this._defines[VELOCITY_OVER_TIME_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._velocityTexture) this._velocityTexture.destroy();
            this._velocityTexture = packCurveRangeXYZW(_sample_num, velocityModule.x, velocityModule.y, velocityModule.z, velocityModule.speedModifier);

            var _handle = pass.getHandle('velocity_over_time_tex0');

            var _binding = Pass.getBindingFromHandle(_handle);

            pass.bindSampler(_binding, this._velocityTexture.getGFXSampler());
            pass.bindTexture(_binding, this._velocityTexture.getGFXTexture());

            var _spaceHandle = pass.getHandle('u_velocity_space');

            pass.setUniform(_spaceHandle, velocityModule.space);

            var _modeHandle = pass.getHandle('u_velocity_mode');

            pass.setUniform(_modeHandle, this._velocityTexture.height);
          } // color module


          var colorModule = this._particleSystem._colorOverLifetimeModule;
          enable = colorModule && colorModule.enable;
          this._defines[COLOR_OVER_TIME_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._colorTexture) this._colorTexture.destroy();
            this._colorTexture = packGradientRange(_sample_num, colorModule.color);

            var _handle2 = pass.getHandle('color_over_time_tex0');

            var _binding2 = Pass.getBindingFromHandle(_handle2);

            pass.bindSampler(_binding2, this._colorTexture.getGFXSampler());
            pass.bindTexture(_binding2, this._colorTexture.getGFXTexture());

            var _modeHandle2 = pass.getHandle('u_color_mode');

            pass.setUniform(_modeHandle2, this._colorTexture.height);
          } // rotation module


          var roationModule = this._particleSystem._rotationOvertimeModule;
          enable = roationModule && roationModule.enable;
          this._defines[ROTATION_OVER_TIME_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._rotationTexture) this._rotationTexture.destroy();

            if (roationModule.separateAxes) {
              this._rotationTexture = packCurveRangeXYZ(_sample_num, roationModule.x, roationModule.y, roationModule.z);
            } else {
              this._rotationTexture = packCurveRangeZ(_sample_num, roationModule.z);
            }

            var _handle3 = pass.getHandle('rotation_over_time_tex0');

            var _binding3 = Pass.getBindingFromHandle(_handle3);

            pass.bindSampler(_binding3, this._rotationTexture.getGFXSampler());
            pass.bindTexture(_binding3, this._rotationTexture.getGFXTexture());

            var _modeHandle3 = pass.getHandle('u_rotation_mode');

            pass.setUniform(_modeHandle3, this._rotationTexture.height);
          } // size module


          var sizeModule = this._particleSystem._sizeOvertimeModule;
          enable = sizeModule && sizeModule.enable;
          this._defines[SIZE_OVER_TIME_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._sizeTexture) this._sizeTexture.destroy();

            if (sizeModule.separateAxes) {
              this._sizeTexture = packCurveRangeXYZ(_sample_num, sizeModule.x, sizeModule.y, sizeModule.z, true);
            } else {
              this._sizeTexture = packCurveRangeN(_sample_num, sizeModule.size, true);
            }

            var _handle4 = pass.getHandle('size_over_time_tex0');

            var _binding4 = Pass.getBindingFromHandle(_handle4);

            pass.bindSampler(_binding4, this._sizeTexture.getGFXSampler());
            pass.bindTexture(_binding4, this._sizeTexture.getGFXTexture());

            var _modeHandle4 = pass.getHandle('u_size_mode');

            pass.setUniform(_modeHandle4, this._sizeTexture.height);
          } // texture module


          var textureModule = this._particleSystem._textureAnimationModule;
          enable = textureModule && textureModule.enable;
          this._defines[TEXTURE_ANIMATION_MODULE_ENABLE] = enable;

          if (enable) {
            if (this._animTexture) this._animTexture.destroy();
            this._animTexture = packCurveRangeXY(_sample_num, textureModule.startFrame, textureModule.frameOverTime);

            var _handle5 = pass.getHandle('texture_animation_tex0');

            var _binding5 = Pass.getBindingFromHandle(_handle5);

            pass.bindSampler(_binding5, this._animTexture.getGFXSampler());
            pass.bindTexture(_binding5, this._animTexture.getGFXTexture());
            var infoHandle = pass.getHandle('u_anim_info');
            _tempVec4.x = this._animTexture.height;
            _tempVec4.y = textureModule.numTilesX * textureModule.numTilesY;
            _tempVec4.z = textureModule.cycleCount;
            pass.setUniform(infoHandle, _tempVec4);
          }
        };

        _proto.getParticleCount = function getParticleCount() {
          return this._particleNum;
        };

        _proto.onMaterialModified = function onMaterialModified(index, material) {
          if (!this._inited) {
            return;
          }

          this.updateMaterialParams();
        };

        _proto.onRebuildPSO = function onRebuildPSO(index, material) {
          if (this._model && index === 0) {
            this._model.setSubModelMaterial(0, material);
          }
        };

        _proto._setVertexAttrib = function _setVertexAttrib() {
          switch (this._renderInfo.renderMode) {
            case RenderMode.StrecthedBillboard:
              this._vertAttrs = _gpu_vert_attr.slice();
              break;

            case RenderMode.Mesh:
              this._vertAttrs = _gpu_vert_attr_mesh.slice();
              break;

            default:
              this._vertAttrs = _gpu_vert_attr.slice();
          }
        };

        _proto.updateMaterialParams = function updateMaterialParams() {
          if (!this._particleSystem) {
            return;
          }

          var ps = this._particleSystem;
          var shareMaterial = ps.sharedMaterial;

          if (shareMaterial !== null) {
            var effectName = shareMaterial._effectAsset._name;
            this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0);

            if (effectName.indexOf('particle-gpu') === -1) {
              this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0); // reset material

              this._particleSystem.setMaterial(null, 0);
            }
          }

          if (ps.sharedMaterial == null && this._defaultMat == null) {
            _matInsInfo.parent = builtinResMgr.get('default-particle-gpu-material');
            _matInsInfo.owner = ps;
            _matInsInfo.subModelIdx = 0;
            this._defaultMat = new MaterialInstance(_matInsInfo);

            if (this._renderInfo.mainTexture !== null) {
              this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
            }
          }

          var mat = ps.getMaterialInstance(0) || this._defaultMat;

          ps.node.getWorldMatrix(_tempWorldTrans);

          switch (ps.scaleSpace) {
            case Space.Local:
              ps.node.getScale(this._node_scale);
              break;

            case Space.World:
              ps.node.getWorldScale(this._node_scale);
              break;

            default:
              break;
          }

          if (ps._simulationSpace === Space.World) {
            this._defines[CC_USE_WORLD_SPACE] = true;
          } else {
            this._defines[CC_USE_WORLD_SPACE] = false;
          }

          var renderMode = this._renderInfo.renderMode;

          if (renderMode === RenderMode.Billboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_BILLBOARD;
          } else if (renderMode === RenderMode.StrecthedBillboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_STRETCHED_BILLBOARD;
            this._frameTile_velLenScale.z = this._renderInfo.velocityScale;
            this._frameTile_velLenScale.w = this._renderInfo.lengthScale;
          } else if (renderMode === RenderMode.HorizontalBillboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_HORIZONTAL_BILLBOARD;
          } else if (renderMode === RenderMode.VerticalBillboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_VERTICAL_BILLBOARD;
          } else if (renderMode === RenderMode.Mesh) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_MESH;
          } else {
            console.warn("particle system renderMode " + renderMode + " not support.");
          }

          var textureModule = ps._textureAnimationModule;

          if (textureModule && textureModule.enable) {
            Vec2.set(this._frameTile_velLenScale, textureModule.numTilesX, textureModule.numTilesY);
          }

          this.initShaderUniform(mat);
          mat.recompileShaders(this._defines);

          if (this._model) {
            this._model.updateMaterial(mat);
          }
        };

        return ParticleSystemRendererGPU;
      }(ParticleSystemRendererBase));
    }
  };
});