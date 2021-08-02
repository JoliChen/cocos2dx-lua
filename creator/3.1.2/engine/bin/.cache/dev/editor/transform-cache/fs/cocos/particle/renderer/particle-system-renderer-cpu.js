"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/builtin/index.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _index4 = require("../../core/memop/index.js");

var _materialInstance = require("../../core/renderer/core/material-instance.js");

var _enum = require("../enum.js");

var _particle = require("../particle.js");

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
const _tempAttribUV = new _index3.Vec3();

const _tempWorldTrans = new _index3.Mat4();

const _anim_module = ['_colorOverLifetimeModule', '_sizeOvertimeModule', '_velocityOvertimeModule', '_forceOvertimeModule', '_limitVelocityOvertimeModule', '_rotationOvertimeModule', '_textureAnimationModule'];
const _uvs = [0, 0, // bottom-left
1, 0, // bottom-right
0, 1, // top-left
1, 1 // top-right
];
const CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
const CC_RENDER_MODE = 'CC_RENDER_MODE';
const RENDER_MODE_BILLBOARD = 0;
const RENDER_MODE_STRETCHED_BILLBOARD = 1;
const RENDER_MODE_HORIZONTAL_BILLBOARD = 2;
const RENDER_MODE_VERTICAL_BILLBOARD = 3;
const RENDER_MODE_MESH = 4;
const _vertex_attrs = [new _index2.Attribute(_index2.AttributeName.ATTR_POSITION, _index2.Format.RGB32F), // position
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD, _index2.Format.RGB32F), // uv,frame idx
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD1, _index2.Format.RGB32F), // size
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD2, _index2.Format.RGB32F), // rotation
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR, _index2.Format.RGBA8, true) // color
];
const _vertex_attrs_stretch = [new _index2.Attribute(_index2.AttributeName.ATTR_POSITION, _index2.Format.RGB32F), // position
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD, _index2.Format.RGB32F), // uv,frame idx
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD1, _index2.Format.RGB32F), // size
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD2, _index2.Format.RGB32F), // rotation
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR, _index2.Format.RGBA8, true), // color
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR1, _index2.Format.RGB32F) // particle velocity
];
const _vertex_attrs_mesh = [new _index2.Attribute(_index2.AttributeName.ATTR_POSITION, _index2.Format.RGB32F), // particle position
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD, _index2.Format.RGB32F), // uv,frame idx
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD1, _index2.Format.RGB32F), // size
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD2, _index2.Format.RGB32F), // rotation
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR, _index2.Format.RGBA8, true), // particle color
new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD3, _index2.Format.RGB32F), // mesh position
new _index2.Attribute(_index2.AttributeName.ATTR_NORMAL, _index2.Format.RGB32F), // mesh normal
new _index2.Attribute(_index2.AttributeName.ATTR_COLOR1, _index2.Format.RGBA8, true) // mesh color
];
const _matInsInfo = {
  parent: null,
  owner: null,
  subModelIdx: 0
};

class ParticleSystemRendererCPU extends _particleSystemRendererBase.ParticleSystemRendererBase {
  constructor(info) {
    super(info);
    this._defines = void 0;
    this._trailDefines = void 0;
    this._frameTile_velLenScale = void 0;
    this._defaultMat = null;
    this._node_scale = void 0;
    this._attrs = void 0;
    this._particles = null;
    this._defaultTrailMat = null;
    this._updateList = new Map();
    this._animateList = new Map();
    this._runAnimateList = new Array();
    this._fillDataFunc = null;
    this._uScaleHandle = 0;
    this._uLenHandle = 0;
    this._inited = false;
    this._localMat = new _index3.Mat4();
    this._gravity = new _index3.Vec4();
    this._model = null;
    this._frameTile_velLenScale = new _index3.Vec4(1, 1, 0, 0);
    this._node_scale = new _index3.Vec4();
    this._attrs = new Array(5);
    this._defines = {
      CC_USE_WORLD_SPACE: true,
      CC_USE_BILLBOARD: true,
      CC_USE_STRETCHED_BILLBOARD: false,
      CC_USE_HORIZONTAL_BILLBOARD: false,
      CC_USE_VERTICAL_BILLBOARD: false
    };
    this._trailDefines = {
      CC_USE_WORLD_SPACE: true // CC_DRAW_WIRE_FRAME: true,   // <wireframe debug>

    };
  }

  onInit(ps) {
    super.onInit(ps);
    this._particles = new _index4.RecyclePool(() => new _particle.Particle(this), 16);

    this._setVertexAttrib();

    this._setFillFunc();

    this._initModuleList();

    this._initModel();

    this.updateMaterialParams();
    this.updateTrailMaterial();
    this.setVertexAttributes();
    this._inited = true;
  }

  clear() {
    super.clear();

    this._particles.reset();

    if (this._particleSystem._trailModule) {
      this._particleSystem._trailModule.clear();
    }

    this.updateRenderData();
    this._model.enabled = false;
  }

  updateRenderMode() {
    this._setVertexAttrib();

    this._setFillFunc();

    this.updateMaterialParams();
    this.setVertexAttributes();
  }

  getFreeParticle() {
    if (this._particles.length >= this._particleSystem.capacity) {
      return null;
    }

    return this._particles.add();
  }

  getDefaultTrailMaterial() {
    return this._defaultTrailMat;
  }

  setNewParticle(p) {}

  _initModuleList() {
    _anim_module.forEach(val => {
      const pm = this._particleSystem[val];

      if (pm && pm.enable) {
        if (pm.needUpdate) {
          this._updateList[pm.name] = pm;
        }

        if (pm.needAnimate) {
          this._animateList[pm.name] = pm;
        }
      }
    }); // reorder


    this._runAnimateList.length = 0;

    for (let i = 0, len = _particle.PARTICLE_MODULE_ORDER.length; i < len; i++) {
      const p = this._animateList[_particle.PARTICLE_MODULE_ORDER[i]];

      if (p) {
        this._runAnimateList.push(p);
      }
    }
  }

  enableModule(name, val, pm) {
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

    for (let i = 0, len = _particle.PARTICLE_MODULE_ORDER.length; i < len; i++) {
      const p = this._animateList[_particle.PARTICLE_MODULE_ORDER[i]];

      if (p) {
        this._runAnimateList.push(p);
      }
    }
  }

  updateParticles(dt) {
    const ps = this._particleSystem;

    if (!ps) {
      return this._particles.length;
    }

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

    const mat = ps.getMaterialInstance(0) || this._defaultMat;

    const pass = mat.passes[0];
    pass.setUniform(this._uScaleHandle, this._node_scale);

    this._updateList.forEach((value, key) => {
      value.update(ps._simulationSpace, _tempWorldTrans);
    });

    const trailModule = ps._trailModule;
    const trailEnable = trailModule && trailModule.enable;

    if (trailEnable) {
      trailModule.update();
    }

    if (ps.simulationSpace === _enum.Space.Local) {
      const r = ps.node.getRotation();

      _index3.Mat4.fromQuat(this._localMat, r);

      this._localMat.transpose(); // just consider rotation, use transpose as invert

    }

    for (let i = 0; i < this._particles.length; ++i) {
      const p = this._particles.data[i];
      p.remainingLifetime -= dt;

      _index3.Vec3.set(p.animatedVelocity, 0, 0, 0);

      if (p.remainingLifetime < 0.0) {
        if (trailEnable) {
          trailModule.removeParticle(p);
        }

        this._particles.removeAt(i);

        --i;
        continue;
      }

      if (ps.simulationSpace === _enum.Space.Local) {
        const gravityFactor = -ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _index3.pseudoRandom)(p.randomSeed)) * 9.8 * dt;
        this._gravity.x = 0.0;
        this._gravity.y = gravityFactor;
        this._gravity.z = 0.0;
        this._gravity.w = 1.0;
        this._gravity = this._gravity.transformMat4(this._localMat);
        p.velocity.x += this._gravity.x;
        p.velocity.y += this._gravity.y;
        p.velocity.z += this._gravity.z;
      } else {
        // apply gravity.
        p.velocity.y -= ps.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _index3.pseudoRandom)(p.randomSeed)) * 9.8 * dt;
      }

      _index3.Vec3.copy(p.ultimateVelocity, p.velocity);

      this._runAnimateList.forEach(value => {
        value.animate(p, dt);
      });

      _index3.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.


      if (trailEnable) {
        trailModule.animate(p, dt);
      }
    }

    this._model.enabled = this._particles.length > 0;
    return this._particles.length;
  } // internal function


  updateRenderData() {
    // update vertex buffer
    let idx = 0;

    for (let i = 0; i < this._particles.length; ++i) {
      const p = this._particles.data[i];
      let fi = 0;
      const textureModule = this._particleSystem._textureAnimationModule;

      if (textureModule && textureModule.enable) {
        fi = p.frameIndex;
      }

      idx = i * 4;

      this._fillDataFunc(p, idx, fi);
    }
  }

  beforeRender() {
    // because we use index buffer, per particle index count = 6.
    this._model.updateIA(this._particles.length);
  }

  getParticleCount() {
    return this._particles.length;
  }

  onMaterialModified(index, material) {
    if (!this._inited) {
      return;
    }

    if (index === 0) {
      this.updateMaterialParams();
    } else {
      this.updateTrailMaterial();
    }
  }

  onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setSubModelMaterial(0, material);
    }

    const trailModule = this._particleSystem._trailModule;

    if (trailModule && trailModule._trailModel && index === 1) {
      trailModule._trailModel.setSubModelMaterial(0, material);
    }
  }

  _setFillFunc() {
    if (this._renderInfo.renderMode === _enum.RenderMode.Mesh) {
      this._fillDataFunc = this._fillMeshData;
    } else if (this._renderInfo.renderMode === _enum.RenderMode.StrecthedBillboard) {
      this._fillDataFunc = this._fillStrecthedData;
    } else {
      this._fillDataFunc = this._fillNormalData;
    }
  }

  _fillMeshData(p, idx, fi) {
    const i = idx / 4;
    let attrNum = 0;
    this._attrs[attrNum++] = p.position;
    _tempAttribUV.z = fi;
    this._attrs[attrNum++] = _tempAttribUV;
    this._attrs[attrNum++] = p.size;
    this._attrs[attrNum++] = p.rotation;
    this._attrs[attrNum++] = p.color._val;

    this._model.addParticleVertexData(i, this._attrs);
  }

  _fillStrecthedData(p, idx, fi) {
    let attrNum = 0;

    for (let j = 0; j < 4; ++j) {
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
  }

  _fillNormalData(p, idx, fi) {
    let attrNum = 0;

    for (let j = 0; j < 4; ++j) {
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
  }

  _setVertexAttrib() {
    switch (this._renderInfo.renderMode) {
      case _enum.RenderMode.StrecthedBillboard:
        this._vertAttrs = _vertex_attrs_stretch.slice();
        break;

      case _enum.RenderMode.Mesh:
        this._vertAttrs = _vertex_attrs_mesh.slice();
        break;

      default:
        this._vertAttrs = _vertex_attrs.slice();
    }
  }

  updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    const ps = this._particleSystem;
    const shareMaterial = ps.sharedMaterial;

    if (shareMaterial != null) {
      const effectName = shareMaterial._effectAsset._name;
      this._renderInfo.mainTexture = shareMaterial.getProperty('mainTexture', 0); // reset material

      if (effectName.indexOf('particle') === -1 || effectName.indexOf('particle-gpu') !== -1) {
        ps.setMaterial(null, 0);
      }
    }

    if (ps.sharedMaterial == null && this._defaultMat == null) {
      _matInsInfo.parent = _index.builtinResMgr.get('default-particle-material');
      _matInsInfo.owner = this._particleSystem;
      _matInsInfo.subModelIdx = 0;
      this._defaultMat = new _materialInstance.MaterialInstance(_matInsInfo);

      if (this._renderInfo.mainTexture !== null) {
        this._defaultMat.setProperty('mainTexture', this._renderInfo.mainTexture);
      }
    }

    const mat = ps.getMaterialInstance(0) || this._defaultMat;

    if (ps._simulationSpace === _enum.Space.World) {
      this._defines[CC_USE_WORLD_SPACE] = true;
    } else {
      this._defines[CC_USE_WORLD_SPACE] = false;
    }

    const pass = mat.passes[0];
    this._uScaleHandle = pass.getHandle('scale');
    this._uLenHandle = pass.getHandle('frameTile_velLenScale');
    const renderMode = this._renderInfo.renderMode;
    const vlenScale = this._frameTile_velLenScale;

    if (renderMode === _enum.RenderMode.Billboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_BILLBOARD;
    } else if (renderMode === _enum.RenderMode.StrecthedBillboard) {
      this._defines[CC_RENDER_MODE] = RENDER_MODE_STRETCHED_BILLBOARD;
      vlenScale.z = this._renderInfo.velocityScale;
      vlenScale.w = this._renderInfo.lengthScale;
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
      _index3.Vec2.set(vlenScale, textureModule.numTilesX, textureModule.numTilesY);

      pass.setUniform(this._uLenHandle, vlenScale);
    } else {
      pass.setUniform(this._uLenHandle, vlenScale);
    }

    mat.recompileShaders(this._defines);

    if (this._model) {
      this._model.updateMaterial(mat);
    }
  }

  updateTrailMaterial() {
    if (!this._particleSystem) {
      return;
    }

    const ps = this._particleSystem;
    const trailModule = ps._trailModule;

    if (trailModule && trailModule.enable) {
      if (ps.simulationSpace === _enum.Space.World || trailModule.space === _enum.Space.World) {
        this._trailDefines[CC_USE_WORLD_SPACE] = true;
      } else {
        this._trailDefines[CC_USE_WORLD_SPACE] = false;
      }

      let mat = ps.getMaterialInstance(1);

      if (mat === null && this._defaultTrailMat === null) {
        _matInsInfo.parent = _index.builtinResMgr.get('default-trail-material');
        _matInsInfo.owner = this._particleSystem;
        _matInsInfo.subModelIdx = 1;
        this._defaultTrailMat = new _materialInstance.MaterialInstance(_matInsInfo);
      }

      mat = mat || this._defaultTrailMat;
      mat.recompileShaders(this._trailDefines);
      trailModule.updateMaterial();
    }
  }

}

exports.default = ParticleSystemRendererCPU;