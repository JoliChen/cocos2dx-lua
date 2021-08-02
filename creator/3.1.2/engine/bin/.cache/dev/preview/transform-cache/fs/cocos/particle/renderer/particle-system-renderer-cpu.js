System.register("q-bundled:///fs/cocos/particle/renderer/particle-system-renderer-cpu.js", ["../../core/builtin/index.js", "../../core/gfx/index.js", "../../core/math/index.js", "../../core/memop/index.js", "../../core/renderer/core/material-instance.js", "../enum.js", "../particle.js", "./particle-system-renderer-base.js"], function (_export, _context) {
  "use strict";

  var builtinResMgr, AttributeName, Format, Attribute, Mat4, Vec2, Vec3, Vec4, pseudoRandom, RecyclePool, MaterialInstance, RenderMode, Space, Particle, PARTICLE_MODULE_ORDER, ParticleSystemRendererBase, _tempAttribUV, _tempWorldTrans, _anim_module, _uvs, CC_USE_WORLD_SPACE, CC_RENDER_MODE, RENDER_MODE_BILLBOARD, RENDER_MODE_STRETCHED_BILLBOARD, RENDER_MODE_HORIZONTAL_BILLBOARD, RENDER_MODE_VERTICAL_BILLBOARD, RENDER_MODE_MESH, _vertex_attrs, _vertex_attrs_stretch, _vertex_attrs_mesh, _matInsInfo, ParticleSystemRendererCPU;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreBuiltinIndexJs) {
      builtinResMgr = _coreBuiltinIndexJs.builtinResMgr;
    }, function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
      Format = _coreGfxIndexJs.Format;
      Attribute = _coreGfxIndexJs.Attribute;
    }, function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
      Vec4 = _coreMathIndexJs.Vec4;
      pseudoRandom = _coreMathIndexJs.pseudoRandom;
    }, function (_coreMemopIndexJs) {
      RecyclePool = _coreMemopIndexJs.RecyclePool;
    }, function (_coreRendererCoreMaterialInstanceJs) {
      MaterialInstance = _coreRendererCoreMaterialInstanceJs.MaterialInstance;
    }, function (_enumJs) {
      RenderMode = _enumJs.RenderMode;
      Space = _enumJs.Space;
    }, function (_particleJs) {
      Particle = _particleJs.Particle;
      PARTICLE_MODULE_ORDER = _particleJs.PARTICLE_MODULE_ORDER;
    }, function (_particleSystemRendererBaseJs) {
      ParticleSystemRendererBase = _particleSystemRendererBaseJs.ParticleSystemRendererBase;
    }],
    execute: function () {
      _tempAttribUV = new Vec3();
      _tempWorldTrans = new Mat4();
      _anim_module = ['_colorOverLifetimeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule'];
      _uvs = [0, 0, // bottom-left
      1, 0, // bottom-right
      0, 1, // top-left
      1, 1 // top-right
      ];
      CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
      CC_RENDER_MODE = 'CC_RENDER_MODE';
      RENDER_MODE_BILLBOARD = 0;
      RENDER_MODE_STRETCHED_BILLBOARD = 1;
      RENDER_MODE_HORIZONTAL_BILLBOARD = 2;
      RENDER_MODE_VERTICAL_BILLBOARD = 3;
      RENDER_MODE_MESH = 4;
      _vertex_attrs = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), // position
      new Attribute(AttributeName.ATTR_TEX_COORD, Format.RGB32F), // uv,frame idx
      new Attribute(AttributeName.ATTR_TEX_COORD1, Format.RGB32F), // size
      new Attribute(AttributeName.ATTR_TEX_COORD2, Format.RGB32F), // rotation
      new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8, true) // color
      ];
      _vertex_attrs_stretch = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), // position
      new Attribute(AttributeName.ATTR_TEX_COORD, Format.RGB32F), // uv,frame idx
      new Attribute(AttributeName.ATTR_TEX_COORD1, Format.RGB32F), // size
      new Attribute(AttributeName.ATTR_TEX_COORD2, Format.RGB32F), // rotation
      new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8, true), // color
      new Attribute(AttributeName.ATTR_COLOR1, Format.RGB32F) // particle velocity
      ];
      _vertex_attrs_mesh = [new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F), // particle position
      new Attribute(AttributeName.ATTR_TEX_COORD, Format.RGB32F), // uv,frame idx
      new Attribute(AttributeName.ATTR_TEX_COORD1, Format.RGB32F), // size
      new Attribute(AttributeName.ATTR_TEX_COORD2, Format.RGB32F), // rotation
      new Attribute(AttributeName.ATTR_COLOR, Format.RGBA8, true), // particle color
      new Attribute(AttributeName.ATTR_TEX_COORD3, Format.RGB32F), // mesh position
      new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F), // mesh normal
      new Attribute(AttributeName.ATTR_COLOR1, Format.RGBA8, true) // mesh color
      ];
      _matInsInfo = {
        parent: null,
        owner: null,
        subModelIdx: 0
      };

      _export("default", ParticleSystemRendererCPU = /*#__PURE__*/function (_ParticleSystemRender) {
        _inheritsLoose(ParticleSystemRendererCPU, _ParticleSystemRender);

        function ParticleSystemRendererCPU(info) {
          var _this;

          _this = _ParticleSystemRender.call(this, info) || this;
          _this._defines = void 0;
          _this._trailDefines = void 0;
          _this._frameTile_velLenScale = void 0;
          _this._defaultMat = null;
          _this._node_scale = void 0;
          _this._attrs = void 0;
          _this._particles = null;
          _this._defaultTrailMat = null;
          _this._updateList = new Map();
          _this._animateList = new Map();
          _this._runAnimateList = new Array();
          _this._fillDataFunc = null;
          _this._uScaleHandle = 0;
          _this._uLenHandle = 0;
          _this._inited = false;
          _this._localMat = new Mat4();
          _this._gravity = new Vec4();
          _this._model = null;
          _this._frameTile_velLenScale = new Vec4(1, 1, 0, 0);
          _this._node_scale = new Vec4();
          _this._attrs = new Array(5);
          _this._defines = {
            CC_USE_WORLD_SPACE: true,
            CC_USE_BILLBOARD: true,
            CC_USE_STRETCHED_BILLBOARD: false,
            CC_USE_HORIZONTAL_BILLBOARD: false,
            CC_USE_VERTICAL_BILLBOARD: false
          };
          _this._trailDefines = {
            CC_USE_WORLD_SPACE: true // CC_DRAW_WIRE_FRAME: true,   // <wireframe debug>

          };
          return _this;
        }

        var _proto = ParticleSystemRendererCPU.prototype;

        _proto.onInit = function onInit(ps) {
          var _this2 = this;

          _ParticleSystemRender.prototype.onInit.call(this, ps);

          this._particles = new RecyclePool(function () {
            return new Particle(_this2);
          }, 16);

          this._setVertexAttrib();

          this._setFillFunc();

          this._initModuleList();

          this._initModel();

          this.updateMaterialParams();
          this.updateTrailMaterial();
          this.setVertexAttributes();
          this._inited = true;
        };

        _proto.clear = function clear() {
          _ParticleSystemRender.prototype.clear.call(this);

          this._particles.reset();

          if (this._particleSystem._trailModule) {
            this._particleSystem._trailModule.clear();
          }

          this.updateRenderData();
          this._model.enabled = false;
        };

        _proto.updateRenderMode = function updateRenderMode() {
          this._setVertexAttrib();

          this._setFillFunc();

          this.updateMaterialParams();
          this.setVertexAttributes();
        };

        _proto.getFreeParticle = function getFreeParticle() {
          if (this._particles.length >= this._particleSystem.capacity) {
            return null;
          }

          return this._particles.add();
        };

        _proto.getDefaultTrailMaterial = function getDefaultTrailMaterial() {
          return this._defaultTrailMat;
        };

        _proto.setNewParticle = function setNewParticle(p) {};

        _proto._initModuleList = function _initModuleList() {
          var _this3 = this;

          _anim_module.forEach(function (val) {
            var pm = _this3._particleSystem[val];

            if (pm && pm.enable) {
              if (pm.needUpdate) {
                _this3._updateList[pm.name] = pm;
              }

              if (pm.needAnimate) {
                _this3._animateList[pm.name] = pm;
              }
            }
          }); // reorder


          this._runAnimateList.length = 0;

          for (var i = 0, len = PARTICLE_MODULE_ORDER.length; i < len; i++) {
            var p = this._animateList[PARTICLE_MODULE_ORDER[i]];

            if (p) {
              this._runAnimateList.push(p);
            }
          }
        };

        _proto.enableModule = function enableModule(name, val, pm) {
          if (val) {
            if (pm.needUpdate) {
              this._updateList[pm.name] = pm;
            }

            if (pm.needAnimate) {
              this._animateList[pm.name] = pm;
            }
          } else {
            delete this._animateList[name];
            delete this._updateList[name];
          } // reorder


          this._runAnimateList.length = 0;

          for (var i = 0, len = PARTICLE_MODULE_ORDER.length; i < len; i++) {
            var p = this._animateList[PARTICLE_MODULE_ORDER[i]];

            if (p) {
              this._runAnimateList.push(p);
            }
          }
        };

        _proto.updateParticles = function updateParticles(dt) {
          var _this4 = this;

          var ps = this._particleSystem;

          if (!ps) {
            return this._particles.length;
          }

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

          var mat = ps.getMaterialInstance(0) || this._defaultMat;

          var pass = mat.passes[0];
          pass.setUniform(this._uScaleHandle, this._node_scale);

          this._updateList.forEach(function (value, key) {
            value.update(ps._simulationSpace, _tempWorldTrans);
          });

          var trailModule = ps._trailModule;
          var trailEnable = trailModule && trailModule.enable;

          if (trailEnable) {
            trailModule.update();
          }

          if (ps.simulationSpace === Space.Local) {
            var r = ps.node.getRotation();
            Mat4.fromQuat(this._localMat, r);

            this._localMat.transpose(); // just consider rotation, use transpose as invert

          }

          var _loop = function _loop(_i) {
            var p = _this4._particles.data[_i];
            p.remainingLifetime -= dt;
            Vec3.set(p.animatedVelocity, 0, 0, 0);

            if (p.remainingLifetime < 0.0) {
              if (trailEnable) {
                trailModule.removeParticle(p);
              }

              _this4._particles.removeAt(_i);

              --_i;
              i = _i;
              return "continue";
            }

            if (ps.simulationSpace === Space.Local) {
              var gravityFactor = -ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, pseudoRandom(p.randomSeed)) * 9.8 * dt;
              _this4._gravity.x = 0.0;
              _this4._gravity.y = gravityFactor;
              _this4._gravity.z = 0.0;
              _this4._gravity.w = 1.0;
              _this4._gravity = _this4._gravity.transformMat4(_this4._localMat);
              p.velocity.x += _this4._gravity.x;
              p.velocity.y += _this4._gravity.y;
              p.velocity.z += _this4._gravity.z;
            } else {
              // apply gravity.
              p.velocity.y -= ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, pseudoRandom(p.randomSeed)) * 9.8 * dt;
            }

            Vec3.copy(p.ultimateVelocity, p.velocity);

            _this4._runAnimateList.forEach(function (value) {
              value.animate(p, dt);
            });

            Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.

            if (trailEnable) {
              trailModule.animate(p, dt);
            }

            i = _i;
          };

          for (var i = 0; i < this._particles.length; ++i) {
            var _ret = _loop(i);

            if (_ret === "continue") continue;
          }

          this._model.enabled = this._particles.length > 0;
          return this._particles.length;
        } // internal function
        ;

        _proto.updateRenderData = function updateRenderData() {
          // update vertex buffer
          var idx = 0;

          for (var _i2 = 0; _i2 < this._particles.length; ++_i2) {
            var p = this._particles.data[_i2];
            var fi = 0;
            var textureModule = this._particleSystem._textureAnimationModule;

            if (textureModule && textureModule.enable) {
              fi = p.frameIndex;
            }

            idx = _i2 * 4;

            this._fillDataFunc(p, idx, fi);
          }
        };

        _proto.beforeRender = function beforeRender() {
          // because we use index buffer, per particle index count = 6.
          this._model.updateIA(this._particles.length);
        };

        _proto.getParticleCount = function getParticleCount() {
          return this._particles.length;
        };

        _proto.onMaterialModified = function onMaterialModified(index, material) {
          if (!this._inited) {
            return;
          }

          if (index === 0) {
            this.updateMaterialParams();
          } else {
            this.updateTrailMaterial();
          }
        };

        _proto.onRebuildPSO = function onRebuildPSO(index, material) {
          if (this._model && index === 0) {
            this._model.setSubModelMaterial(0, material);
          }

          var trailModule = this._particleSystem._trailModule;

          if (trailModule && trailModule._trailModel && index === 1) {
            trailModule._trailModel.setSubModelMaterial(0, material);
          }
        };

        _proto._setFillFunc = function _setFillFunc() {
          if (this._renderInfo.renderMode === RenderMode.Mesh) {
            this._fillDataFunc = this._fillMeshData;
          } else if (this._renderInfo.renderMode === RenderMode.StrecthedBillboard) {
            this._fillDataFunc = this._fillStrecthedData;
          } else {
            this._fillDataFunc = this._fillNormalData;
          }
        };

        _proto._fillMeshData = function _fillMeshData(p, idx, fi) {
          var i = idx / 4;
          var attrNum = 0;
          this._attrs[attrNum++] = p.position;
          _tempAttribUV.z = fi;
          this._attrs[attrNum++] = _tempAttribUV;
          this._attrs[attrNum++] = p.size;
          this._attrs[attrNum++] = p.rotation;
          this._attrs[attrNum++] = p.color._val;

          this._model.addParticleVertexData(i, this._attrs);
        };

        _proto._fillStrecthedData = function _fillStrecthedData(p, idx, fi) {
          var attrNum = 0;

          for (var j = 0; j < 4; ++j) {
            // four verts per particle.
            attrNum = 0;
            this._attrs[attrNum++] = p.position;
            _tempAttribUV.x = _uvs[2 * j];
            _tempAttribUV.y = _uvs[2 * j + 1];
            _tempAttribUV.z = fi;
            this._attrs[attrNum++] = _tempAttribUV;
            this._attrs[attrNum++] = p.size;
            this._attrs[attrNum++] = p.rotation;
            this._attrs[attrNum++] = p.color._val;
            this._attrs[attrNum++] = p.ultimateVelocity;
            this._attrs[attrNum++] = p.ultimateVelocity;

            this._model.addParticleVertexData(idx++, this._attrs);
          }
        };

        _proto._fillNormalData = function _fillNormalData(p, idx, fi) {
          var attrNum = 0;

          for (var j = 0; j < 4; ++j) {
            // four verts per particle.
            attrNum = 0;
            this._attrs[attrNum++] = p.position;
            _tempAttribUV.x = _uvs[2 * j];
            _tempAttribUV.y = _uvs[2 * j + 1];
            _tempAttribUV.z = fi;
            this._attrs[attrNum++] = _tempAttribUV;
            this._attrs[attrNum++] = p.size;
            this._attrs[attrNum++] = p.rotation;
            this._attrs[attrNum++] = p.color._val;
            this._attrs[attrNum++] = null;

            this._model.addParticleVertexData(idx++, this._attrs);
          }
        };

        _proto._setVertexAttrib = function _setVertexAttrib() {
          switch (this._renderInfo.renderMode) {
            case RenderMode.StrecthedBillboard:
              this._vertAttrs = _vertex_attrs_stretch.slice();
              break;

            case RenderMode.Mesh:
              this._vertAttrs = _vertex_attrs_mesh.slice();
              break;

            default:
              this._vertAttrs = _vertex_attrs.slice();
          }
        };

        _proto.updateMaterialParams = function updateMaterialParams() {
          if (!this._particleSystem) {
            return;
          }

          var ps = this._particleSystem;
          var shareMaterial = ps.sharedMaterial;

          if (shareMaterial != null) {
            var effectName = shareMaterial._effectAsset._name;
            this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0); // reset material

            if (effectName.indexOf('particle') === -1 || effectName.indexOf('particle-gpu') !== -1) {
              ps.setMaterial(null, 0);
            }
          }

          if (ps.sharedMaterial == null && this._defaultMat == null) {
            _matInsInfo.parent = builtinResMgr.get('default-particle-material');
            _matInsInfo.owner = this._particleSystem;
            _matInsInfo.subModelIdx = 0;
            this._defaultMat = new MaterialInstance(_matInsInfo);

            if (this._renderInfo.mainTexture !== null) {
              this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
            }
          }

          var mat = ps.getMaterialInstance(0) || this._defaultMat;

          if (ps._simulationSpace === Space.World) {
            this._defines[CC_USE_WORLD_SPACE] = true;
          } else {
            this._defines[CC_USE_WORLD_SPACE] = false;
          }

          var pass = mat.passes[0];
          this._uScaleHandle = pass.getHandle('scale');
          this._uLenHandle = pass.getHandle('frameTile_velLenScale');
          var renderMode = this._renderInfo.renderMode;
          var vlenScale = this._frameTile_velLenScale;

          if (renderMode === RenderMode.Billboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_BILLBOARD;
          } else if (renderMode === RenderMode.StrecthedBillboard) {
            this._defines[CC_RENDER_MODE] = RENDER_MODE_STRETCHED_BILLBOARD;
            vlenScale.z = this._renderInfo.velocityScale;
            vlenScale.w = this._renderInfo.lengthScale;
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
            Vec2.set(vlenScale, textureModule.numTilesX, textureModule.numTilesY);
            pass.setUniform(this._uLenHandle, vlenScale);
          } else {
            pass.setUniform(this._uLenHandle, vlenScale);
          }

          mat.recompileShaders(this._defines);

          if (this._model) {
            this._model.updateMaterial(mat);
          }
        };

        _proto.updateTrailMaterial = function updateTrailMaterial() {
          if (!this._particleSystem) {
            return;
          }

          var ps = this._particleSystem;
          var trailModule = ps._trailModule;

          if (trailModule && trailModule.enable) {
            if (ps.simulationSpace === Space.World || trailModule.space === Space.World) {
              this._trailDefines[CC_USE_WORLD_SPACE] = true;
            } else {
              this._trailDefines[CC_USE_WORLD_SPACE] = false;
            }

            var mat = ps.getMaterialInstance(1);

            if (mat === null && this._defaultTrailMat === null) {
              _matInsInfo.parent = builtinResMgr.get('default-trail-material');
              _matInsInfo.owner = this._particleSystem;
              _matInsInfo.subModelIdx = 1;
              this._defaultTrailMat = new MaterialInstance(_matInsInfo);
            }

            mat = mat || this._defaultTrailMat;
            mat.recompileShaders(this._trailDefines);
            trailModule.updateMaterial();
          }
        };

        return ParticleSystemRendererCPU;
      }(ParticleSystemRendererBase));
    }
  };
});