"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/builtin/index.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _materialInstance = require("../../core/renderer/core/material-instance.js");

var _enum = require("../enum.js");

var _particle = require("../particle.js");

var _gradientRange = require("../animator/gradient-range.js");

var _pass = require("../../core/renderer/core/pass.js");

var _curveRange = require("../animator/curve-range.js");

var _particleSystemRendererBase = require("./particle-system-renderer-base.js");

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
const _tempWorldTrans = new _index3.Mat4();

const _tempVec4 = new _index3.Vec4();

const _world_rot = new _index3.Quat();

const _sample_num = 32;

const _sample_interval = 1.0 / _sample_num;

const CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
const CC_RENDER_MODE = 'CC_RENDER_MODE';
const RENDER_MODE_BILLBOARD = 0;
const RENDER_MODE_STRETCHED_BILLBOARD = 1;
const RENDER_MODE_HORIZONTAL_BILLBOARD = 2;
const RENDER_MODE_VERTICAL_BILLBOARD = 3;
const RENDER_MODE_MESH = 4;
const COLOR_OVER_TIME_MODULE_ENABLE = 'COLOR_OVER_TIME_MODULE_ENABLE';
const ROTATION_OVER_TIME_MODULE_ENABLE = 'ROTATION_OVER_TIME_MODULE_ENABLE';
const SIZE_OVER_TIME_MODULE_ENABLE = 'SIZE_OVER_TIME_MODULE_ENABLE';
const VELOCITY_OVER_TIME_MODULE_ENABLE = 'VELOCITY_OVER_TIME_MODULE_ENABLE';
const FORCE_OVER_TIME_MODULE_ENABLE = 'FORCE_OVER_TIME_MODULE_ENABLE';
const TEXTURE_ANIMATION_MODULE_ENABLE = 'TEXTURE_ANIMATION_MODULE_ENABLE';
const _vert_attr_name = {
  POSITION_STARTTIME: 'a_position_starttime',
  VERT_SIZE_UV: 'a_size_uv',
  VERT_ROTATION_UV: 'a_rotation_uv',
  COLOR: 'a_color',
  DIR_LIFE: 'a_dir_life',
  RANDOM_SEED: 'a_rndSeed'
};
const _gpu_vert_attr = [new _index2.Attribute(_vert_attr_name.POSITION_STARTTIME, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.VERT_SIZE_UV, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.VERT_ROTATION_UV, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.COLOR, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.DIR_LIFE, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.RANDOM_SEED, _index2.Format.R32F)];
const _gpu_vert_attr_mesh = [new _index2.Attribute(_vert_attr_name.POSITION_STARTTIME, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.VERT_SIZE_UV, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.VERT_ROTATION_UV, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.COLOR, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.DIR_LIFE, _index2.Format.RGBA32F), new _index2.Attribute(_vert_attr_name.RANDOM_SEED, _index2.Format.R32F), new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD, _index2.Format.RGB32F), // uv,frame idx
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD3, _index2.Format.RGB32F), // mesh position
new _index2.Attribute(_index2.AttributeName.ATTR_NORMAL, _index2.Format.RGB32F), // mesh normal
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR1, _index2.Format.RGBA8, true) // mesh color
];
const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};

class ParticleSystemRendererGPU extends _particleSystemRendererBase.ParticleSystemRendererBase {
  constructor(info) {
    super(info);
    this._defines = void 0;
    this._frameTile_velLenScale = void 0;
    this._node_scale = void 0;
    this._vertAttrs = [];
    this._defaultMat = null;
    this._particleNum = 0;
    this._tempParticle = null;
    this._colorTexture = null;
    this._forceTexture = null;
    this._velocityTexture = null;
    this._rotationTexture = null;
    this._sizeTexture = null;
    this._animTexture = null;
    this._uTimeHandle = 0;
    this._uRotHandle = 0;
    this._inited = false;
    this._frameTile_velLenScale = new _index3.Vec4(1, 1, 0, 0);
    this._node_scale = new _index3.Vec4();
    this._defines = {
      CC_USE_WORLD_SPACE: true,
      CC_USE_BILLBOARD: true,
      CC_USE_STRETCHED_BILLBOARD: false,
      CC_USE_HORIZONTAL_BILLBOARD: false,
      CC_USE_VERTICAL_BILLBOARD: false,
      COLOR_OVER_TIME_MODULE_ENABLE: false
    };
    this._tempParticle = new _particle.Particle(null);
    this._particleNum = 0;
  }

  onInit(ps) {
    super.onInit(ps);

    this._setVertexAttrib();

    this._initModel();

    this.updateMaterialParams();
    this.setVertexAttributes();
    this._inited = true;
  }

  updateRenderMode() {
    this._setVertexAttrib();

    this.updateMaterialParams();
    this.setVertexAttributes();
  }

  setVertexAttributes() {
    super.setVertexAttributes();

    this._model.constructAttributeIndex();
  }

  clear() {
    super.clear();
    this._particleNum = 0;
    this.updateRenderData();
  }

  onDestroy() {
    super.onDestroy();
    if (this._forceTexture) this._forceTexture.destroy();
    if (this._velocityTexture) this._velocityTexture.destroy();
    if (this._colorTexture) this._colorTexture.destroy();
    if (this._sizeTexture) this._sizeTexture.destroy();
    if (this._rotationTexture) this._rotationTexture.destroy();
    if (this._animTexture) this._animTexture.destroy();
  }

  enableModule(name, val, pm) {
    const mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

    if (!mat) {
      return;
    }

    this.initShaderUniform(mat);
    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.setSubModelMaterial(0, mat);
    }
  }

  getFreeParticle() {
    if (this._particleNum >= this._particleSystem._capacity) {
      return null;
    }

    return this._tempParticle;
  }

  setNewParticle(p) {
    this._model.addGPUParticleVertexData(p, this._particleNum, this._particleSystem._time);

    this._particleNum++;
  }

  updateParticles(dt) {
    if (_internal253Aconstants.EDITOR) {
      const mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

      this._particleSystem.node.getWorldMatrix(_tempWorldTrans);

      switch (this._particleSystem.scaleSpace) {
        case _enum.Space.Local:
          this._particleSystem.node.getScale(this._node_scale);

          break;

        case _enum.Space.World:
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


  updateRenderData() {}

  beforeRender() {
    // update vertex buffer
    this._model.updateIA(this._particleNum);
  }

  updateShaderUniform(dt) {
    const mat = this._particleSystem.getMaterialInstance(0) || this._defaultMat;

    if (!mat) {
      return;
    }

    const pass = mat.passes[0];
    _tempVec4.x = this._particleSystem._time;
    _tempVec4.y = dt;
    pass.setUniform(this._uTimeHandle, _tempVec4);

    this._particleSystem.node.getWorldRotation(_world_rot);

    pass.setUniform(this._uRotHandle, _world_rot);
  }

  initShaderUniform(mat) {
    const pass = mat.passes[0];
    this._uTimeHandle = pass.getHandle('u_timeDelta');
    this._uRotHandle = pass.getHandle('u_worldRot');
    pass.setUniform(pass.getHandle('scale'), this._node_scale);
    pass.setUniform(pass.getHandle('frameTile_velLenScale'), this._frameTile_velLenScale);
    _tempVec4.x = _sample_num;
    _tempVec4.y = _sample_interval;
    pass.setUniform(pass.getHandle('u_sampleInfo'), _tempVec4);
    let enable = false; // force

    const forceModule = this._particleSystem._forceOvertimeModule;
    enable = forceModule && forceModule.enable;
    this._defines[FORCE_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._forceTexture) this._forceTexture.destroy();
      this._forceTexture = (0, _curveRange.packCurveRangeXYZ)(_sample_num, forceModule.x, forceModule.y, forceModule.z);
      const handle = pass.getHandle('force_over_time_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._forceTexture.getGFXSampler());
      pass.bindTexture(binding, this._forceTexture.getGFXTexture());
      const spaceHandle = pass.getHandle('u_force_space');
      pass.setUniform(spaceHandle, forceModule.space);
      const modeHandle = pass.getHandle('u_force_mode');
      pass.setUniform(modeHandle, this._forceTexture.height);
    } // velocity


    const velocityModule = this._particleSystem._velocityOvertimeModule;
    enable = velocityModule && velocityModule.enable;
    this._defines[VELOCITY_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._velocityTexture) this._velocityTexture.destroy();
      this._velocityTexture = (0, _curveRange.packCurveRangeXYZW)(_sample_num, velocityModule.x, velocityModule.y, velocityModule.z, velocityModule.speedModifier);
      const handle = pass.getHandle('velocity_over_time_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._velocityTexture.getGFXSampler());
      pass.bindTexture(binding, this._velocityTexture.getGFXTexture());
      const spaceHandle = pass.getHandle('u_velocity_space');
      pass.setUniform(spaceHandle, velocityModule.space);
      const modeHandle = pass.getHandle('u_velocity_mode');
      pass.setUniform(modeHandle, this._velocityTexture.height);
    } // color module


    const colorModule = this._particleSystem._colorOverLifetimeModule;
    enable = colorModule && colorModule.enable;
    this._defines[COLOR_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._colorTexture) this._colorTexture.destroy();
      this._colorTexture = (0, _gradientRange.packGradientRange)(_sample_num, colorModule.color);
      const handle = pass.getHandle('color_over_time_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._colorTexture.getGFXSampler());
      pass.bindTexture(binding, this._colorTexture.getGFXTexture());
      const modeHandle = pass.getHandle('u_color_mode');
      pass.setUniform(modeHandle, this._colorTexture.height);
    } // rotation module


    const roationModule = this._particleSystem._rotationOvertimeModule;
    enable = roationModule && roationModule.enable;
    this._defines[ROTATION_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._rotationTexture) this._rotationTexture.destroy();

      if (roationModule.separateAxes) {
        this._rotationTexture = (0, _curveRange.packCurveRangeXYZ)(_sample_num, roationModule.x, roationModule.y, roationModule.z);
      } else {
        this._rotationTexture = (0, _curveRange.packCurveRangeZ)(_sample_num, roationModule.z);
      }

      const handle = pass.getHandle('rotation_over_time_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._rotationTexture.getGFXSampler());
      pass.bindTexture(binding, this._rotationTexture.getGFXTexture());
      const modeHandle = pass.getHandle('u_rotation_mode');
      pass.setUniform(modeHandle, this._rotationTexture.height);
    } // size module


    const sizeModule = this._particleSystem._sizeOvertimeModule;
    enable = sizeModule && sizeModule.enable;
    this._defines[SIZE_OVER_TIME_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._sizeTexture) this._sizeTexture.destroy();

      if (sizeModule.separateAxes) {
        this._sizeTexture = (0, _curveRange.packCurveRangeXYZ)(_sample_num, sizeModule.x, sizeModule.y, sizeModule.z, true);
      } else {
        this._sizeTexture = (0, _curveRange.packCurveRangeN)(_sample_num, sizeModule.size, true);
      }

      const handle = pass.getHandle('size_over_time_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._sizeTexture.getGFXSampler());
      pass.bindTexture(binding, this._sizeTexture.getGFXTexture());
      const modeHandle = pass.getHandle('u_size_mode');
      pass.setUniform(modeHandle, this._sizeTexture.height);
    } // texture module


    const textureModule = this._particleSystem._textureAnimationModule;
    enable = textureModule && textureModule.enable;
    this._defines[TEXTURE_ANIMATION_MODULE_ENABLE] = enable;

    if (enable) {
      if (this._animTexture) this._animTexture.destroy();
      this._animTexture = (0, _curveRange.packCurveRangeXY)(_sample_num, textureModule.startFrame, textureModule.frameOverTime);
      const handle = pass.getHandle('texture_animation_tex0');

      const binding = _pass.Pass.getBindingFromHandle(handle);

      pass.bindSampler(binding, this._animTexture.getGFXSampler());
      pass.bindTexture(binding, this._animTexture.getGFXTexture());
      const infoHandle = pass.getHandle('u_anim_info');
      _tempVec4.x = this._animTexture.height;
      _tempVec4.y = textureModule.numTilesX * textureModule.numTilesY;
      _tempVec4.z = textureModule.cycleCount;
      pass.setUniform(infoHandle, _tempVec4);
    }
  }

  getParticleCount() {
    return this._particleNum;
  }

  onMaterialModified(index, material) {
    if (!this._inited) {
      return;
    }

    this.updateMaterialParams();
  }

  onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setSubModelMaterial(0, material);
    }
  }

  _setVertexAttrib() {
    switch (this._renderInfo.renderMode) {
      case _enum.RenderMode.StrecthedBillboard:
        this._vertAttrs = _gpu_vert_attr.slice();
        break;

      case _enum.RenderMode.Mesh:
        this._vertAttrs = _gpu_vert_attr_mesh.slice();
        break;

      default:
        this._vertAttrs = _gpu_vert_attr.slice();
    }
  }

  updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    const ps = this._particleSystem;
    const shareMaterial = ps.sharedMaterial;

    if (shareMaterial !== null) {
      const effectName = shareMaterial._effectAsset._name;
      this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0);

      if (effectName.indexOf('particle-gpu') === -1) {
        this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0); // reset material

        this._particleSystem.setMaterial(null, 0);
      }
    }

    if (ps.sharedMaterial == null && this._defaultMat == null) {
      _matInsInfo.parent = _index.builtinResMgr.get('default-particle-gpu-material');
      _matInsInfo.owner = ps;
      _matInsInfo.subModelIdx = 0;
      this._defaultMat = new _materialInstance.MaterialInstance(_matInsInfo);

      if (this._renderInfo.mainTexture !== null) {
        this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
      }
    }

    const mat = ps.getMaterialInstance(0) || this._defaultMat;

    ps.node.getWorldMatrix(_tempWorldTrans);

    switch (ps.scaleSpace) {
      case _enum.Space.Local:
        ps.node.getScale(this._node_scale);
        break;

      case _enum.Space.World:
        ps.node.getWorldScale(this._node_scale);
        break;

      default:
        break;
    }

    if (ps._simulationSpace === _enum.Space.World) {
      this._defines[CC_USE_WORLD_SPACE] = true;
    } else {
      this._defines[CC_USE_WORLD_SPACE] = false;
    }

    const renderMode = this._renderInfo.renderMode;

    if (renderMode === _enum.RenderMode.Billboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_BILLBOARD;
    } else if (renderMode === _enum.RenderMode.StrecthedBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_STRETCHED_BILLBOARD;
      this._frameTile_velLenScale.z = this._renderInfo.velocityScale;
      this._frameTile_velLenScale.w = this._renderInfo.lengthScale;
    } else if (renderMode === _enum.RenderMode.HorizontalBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_HORIZONTAL_BILLBOARD;
    } else if (renderMode === _enum.RenderMode.VerticalBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_VERTICAL_BILLBOARD;
    } else if (renderMode === _enum.RenderMode.Mesh) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_MESH;
    } else {
      console.warn(`particle system renderMode ${renderMode} not support.`);
    }

    const textureModule = ps._textureAnimationModule;

    if (textureModule && textureModule.enable) {
      _index3.Vec2.set(this._frameTile_velLenScale, textureModule.numTilesX, textureModule.numTilesY);
    }

    this.initShaderUniform(mat);
    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.updateMaterial(mat);
    }
  }

}

exports.default = ParticleSystemRendererGPU;