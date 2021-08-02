"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _renderingSubMesh = require("../../core/assets/rendering-sub-mesh.js");

var _director = require("../../core/director.js");

var _index2 = require("../../core/gfx/index.js");

var _index3 = require("../../core/math/index.js");

var _index4 = require("../../core/memop/index.js");

var _index5 = require("../../core/renderer/index.js");

var _curveRange = _interopRequireDefault(require("../animator/curve-range.js"));

var _gradientRange = _interopRequireDefault(require("../animator/gradient-range.js"));

var _enum = require("../enum.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const PRE_TRIANGLE_INDEX = 1;
const NEXT_TRIANGLE_INDEX = 1 << 2;
const DIRECTION_THRESHOLD = Math.cos((0, _index3.toRadian)(100));
const _temp_trailEle = {
  position: new _index3.Vec3(),
  velocity: new _index3.Vec3()
};

const _temp_quat = new _index3.Quat();

const _temp_xform = new _index3.Mat4();

const _temp_vec3 = new _index3.Vec3();

const _temp_vec3_1 = new _index3.Vec3();

const _temp_color = new _index3.Color(); // const barycentric = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // <wireframe debug>
// let _bcIdx = 0; // <wireframe debug>


// the valid element is in [start,end) range.if start equals -1,it represents the array is empty.
class TrailSegment {
  constructor(maxTrailElementNum) {
    this.start = void 0;
    this.end = void 0;
    this.trailElements = void 0;
    this.start = -1;
    this.end = -1;
    this.trailElements = [];

    while (maxTrailElementNum--) {
      this.trailElements.push({
        position: new _index3.Vec3(),
        lifetime: 0,
        width: 0,
        velocity: new _index3.Vec3(),
        direction: 0,
        color: new _index3.Color()
      });
    }
  }

  getElement(idx) {
    if (this.start === -1) {
      return null;
    }

    if (idx < 0) {
      idx = (idx + this.trailElements.length) % this.trailElements.length;
    }

    if (idx >= this.trailElements.length) {
      idx %= this.trailElements.length;
    }

    return this.trailElements[idx];
  }

  addElement() {
    if (this.trailElements.length === 0) {
      return null;
    }

    if (this.start === -1) {
      this.start = 0;
      this.end = 1;
      return this.trailElements[0];
    }

    if (this.start === this.end) {
      this.trailElements.splice(this.end, 0, {
        position: new _index3.Vec3(),
        lifetime: 0,
        width: 0,
        velocity: new _index3.Vec3(),
        direction: 0,
        color: new _index3.Color()
      });
      this.start++;
      this.start %= this.trailElements.length;
    }

    const newEleLoc = this.end++;
    this.end %= this.trailElements.length;
    return this.trailElements[newEleLoc];
  }

  iterateElement(target, f, p, dt) {
    const end = this.start >= this.end ? this.end + this.trailElements.length : this.end;

    for (let i = this.start; i < end; i++) {
      if (f(target, this.trailElements[i % this.trailElements.length], p, dt)) {
        this.start++;
        this.start %= this.trailElements.length;
      }
    }

    if (this.start === end) {
      this.start = -1;
      this.end = -1;
    }
  }

  count() {
    if (this.start < this.end) {
      return this.end - this.start;
    } else {
      return this.trailElements.length + this.end - this.start;
    }
  }

  clear() {
    this.start = -1;
    this.end = -1;
  } // <debug>
  // public _print () {
  //     let msg = String();
  //     this.iterateElement(this, (target: object, e: ITrailElement, p: Particle, dt: number) => {
  //         msg += 'pos:' + e.position.toString() + ' lifetime:' + e.lifetime + ' dir:' + e.direction +
  //                ' velocity:' + e.velocity.toString() + '\n';
  //         return false;
  //     }, null, 0);
  //     console.log(msg);
  // }


}

let TrailModule = (_dec = (0, _index.ccclass)('cc.TrailModule'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.type)(_enum.TrailMode), _dec4 = (0, _index.displayOrder)(1), _dec5 = (0, _index.tooltip)('i18n:trailSegment.mode'), _dec6 = (0, _index.type)(_curveRange.default), _dec7 = (0, _index.displayOrder)(3), _dec8 = (0, _index.tooltip)('i18n:trailSegment.lifeTime'), _dec9 = (0, _index.displayOrder)(5), _dec10 = (0, _index.tooltip)('i18n:trailSegment.minParticleDistance'), _dec11 = (0, _index.type)(_enum.Space), _dec12 = (0, _index.displayOrder)(6), _dec13 = (0, _index.tooltip)('i18n:trailSegment.space'), _dec14 = (0, _index.type)(_enum.TextureMode), _dec15 = (0, _index.displayOrder)(8), _dec16 = (0, _index.tooltip)('i18n:trailSegment.textureMode'), _dec17 = (0, _index.displayOrder)(9), _dec18 = (0, _index.tooltip)('i18n:trailSegment.widthFromParticle'), _dec19 = (0, _index.type)(_curveRange.default), _dec20 = (0, _index.displayOrder)(10), _dec21 = (0, _index.tooltip)('i18n:trailSegment.widthRatio'), _dec22 = (0, _index.displayOrder)(11), _dec23 = (0, _index.tooltip)('i18n:trailSegment.colorFromParticle'), _dec24 = (0, _index.type)(_gradientRange.default), _dec25 = (0, _index.displayOrder)(12), _dec26 = (0, _index.tooltip)('i18n:trailSegment.colorOverTrail'), _dec27 = (0, _index.type)(_gradientRange.default), _dec28 = (0, _index.displayOrder)(13), _dec29 = (0, _index.tooltip)('i18n:trailSegment.colorOvertime'), _dec30 = (0, _index.type)(_enum.Space), _dec(_class = (_class2 = (_temp = class TrailModule {
  /**
   * 是否启用。
   */
  get enable() {
    return this._enable;
  }

  set enable(val) {
    if (val === this._enable && this._trailModel) {
      return;
    }

    if (val && !this._enable) {
      this._enable = val;
      if (this._particleSystem.processor) this._particleSystem.processor.updateTrailMaterial();
    }

    if (val && !this._trailModel) {
      this._createModel();

      this.rebuild();
    }

    this._enable = val;

    if (this._trailModel) {
      this._trailModel.enabled = val;
    }

    if (val) this.onEnable();else this.onDisable();
  }

  /**
   * 每个轨迹粒子之间的最小间距。
   */
  get minParticleDistance() {
    return this._minParticleDistance;
  }

  set minParticleDistance(val) {
    this._minParticleDistance = val;
    this._minSquaredDistance = val * val;
  }

  get space() {
    return this._space;
  }

  set space(val) {
    this._space = val;
    const ps = this._particleSystem;

    if (ps && ps.processor) {
      ps.processor.updateTrailMaterial();
    }
  }
  /**
   * 粒子本身是否存在。
   */


  constructor() {
    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "mode", _descriptor2, this);

    _initializerDefineProperty(this, "lifeTime", _descriptor3, this);

    _initializerDefineProperty(this, "_minParticleDistance", _descriptor4, this);

    _initializerDefineProperty(this, "existWithParticles", _descriptor5, this);

    _initializerDefineProperty(this, "textureMode", _descriptor6, this);

    _initializerDefineProperty(this, "widthFromParticle", _descriptor7, this);

    _initializerDefineProperty(this, "widthRatio", _descriptor8, this);

    _initializerDefineProperty(this, "colorFromParticle", _descriptor9, this);

    _initializerDefineProperty(this, "colorOverTrail", _descriptor10, this);

    _initializerDefineProperty(this, "colorOvertime", _descriptor11, this);

    _initializerDefineProperty(this, "_space", _descriptor12, this);

    _initializerDefineProperty(this, "_particleSystem", _descriptor13, this);

    this._minSquaredDistance = 0;
    this._vertSize = void 0;
    this._trailNum = 0;
    this._trailLifetime = 0;
    this.vbOffset = 0;
    this.ibOffset = 0;
    this._trailSegments = null;
    this._particleTrail = void 0;
    this._trailModel = null;
    this._iaInfo = void 0;
    this._iaInfoBuffer = null;
    this._subMeshData = null;
    this._vertAttrs = void 0;
    this._vbF32 = null;
    this._vbUint32 = null;
    this._iBuffer = null;
    this._needTransform = false;
    this._material = null;
    this._iaInfo = new _index2.IndirectBuffer([new _index2.DrawInfo()]);
    this._vertAttrs = [new _index2.Attribute(_index2.AttributeName.ATTR_POSITION, _index2.Format.RGB32F), // xyz:position
    new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD, _index2.Format.RGBA32F), // x:index y:size zw:texcoord
    // new Attribute(AttributeName.ATTR_TEX_COORD2, Format.RGB32F), // <wireframe debug>
    new _index2.Attribute(_index2.AttributeName.ATTR_TEX_COORD1, _index2.Format.RGB32F), // xyz:velocity
    new _index2.Attribute(_index2.AttributeName.ATTR_COLOR, _index2.Format.RGBA8, true)];
    this._vertSize = 0;

    for (const a of this._vertAttrs) {
      this._vertSize += _index2.FormatInfos[a.format].size;
    }

    this._particleTrail = new Map();
  }

  onInit(ps) {
    this._particleSystem = ps;
    this.minParticleDistance = this._minParticleDistance;
    let burstCount = 0;
    const psTime = ps.startLifetime.getMax();
    const psRate = ps.rateOverTime.getMax();
    const duration = ps.duration;

    for (let i = 0, len = ps.bursts.length; i < len; i++) {
      const b = ps.bursts[i];
      burstCount += b.getMaxCount(ps) * Math.ceil(psTime / duration);
    }

    this._trailNum = Math.ceil(psTime * this.lifeTime.getMax() * 60 * (psRate * duration + burstCount));
    this._trailSegments = new _index4.Pool(() => new TrailSegment(10), Math.ceil(psRate * duration));

    if (this._enable) {
      this.enable = this._enable;
    }
  }

  onEnable() {
    this._attachToScene();
  }

  onDisable() {
    this._particleTrail.clear();

    this._detachFromScene();
  }

  _attachToScene() {
    if (this._trailModel) {
      if (this._trailModel.scene) {
        this._detachFromScene();
      }

      this._particleSystem._getRenderScene().addModel(this._trailModel);
    }
  }

  _detachFromScene() {
    if (this._trailModel && this._trailModel.scene) {
      this._trailModel.scene.removeModel(this._trailModel);
    }
  }

  destroy() {
    this.destroySubMeshData();

    if (this._trailModel) {
      _director.director.root.destroyModel(this._trailModel);

      this._trailModel = null;
    }

    if (this._trailSegments) {
      this._trailSegments.destroy(obj => {
        obj.trailElements.length = 0;
      });

      this._trailSegments = null;
    }
  }

  play() {
    if (this._trailModel && this._enable) {
      this._trailModel.enabled = true;
    }
  }

  clear() {
    if (this.enable) {
      const trailIter = this._particleTrail.values();

      let trail = trailIter.next();

      while (!trail.done) {
        trail.value.clear();
        trail = trailIter.next();
      }

      this._particleTrail.clear();

      this.updateRenderData();
      if (this._trailModel) this._trailModel.enabled = false;
    }
  }

  updateMaterial() {
    if (this._particleSystem) {
      this._material = this._particleSystem.getMaterialInstance(1) || this._particleSystem.processor._defaultTrailMat;

      if (this._trailModel) {
        this._trailModel.setSubModelMaterial(0, this._material);
      }
    }
  }

  update() {
    this._trailLifetime = this.lifeTime.evaluate(this._particleSystem._time, 1);

    if (this.space === _enum.Space.World && this._particleSystem._simulationSpace === _enum.Space.Local) {
      this._needTransform = true;

      this._particleSystem.node.getWorldMatrix(_temp_xform);

      this._particleSystem.node.getWorldRotation(_temp_quat);
    } else {
      this._needTransform = false;
    }
  }

  animate(p, scaledDt) {
    if (!this._trailSegments) {
      return;
    }

    let trail = this._particleTrail.get(p);

    if (!trail) {
      trail = this._trailSegments.alloc();

      this._particleTrail.set(p, trail); // Avoid position and trail are one frame apart at the end of the particle animation.


      return;
    }

    let lastSeg = trail.getElement(trail.end - 1);

    if (this._needTransform) {
      _index3.Vec3.transformMat4(_temp_vec3, p.position, _temp_xform);
    } else {
      _index3.Vec3.copy(_temp_vec3, p.position);
    }

    if (lastSeg) {
      trail.iterateElement(this, this._updateTrailElement, p, scaledDt);

      if (_index3.Vec3.squaredDistance(lastSeg.position, _temp_vec3) < this._minSquaredDistance) {
        return;
      }
    }

    lastSeg = trail.addElement();

    if (!lastSeg) {
      return;
    }

    _index3.Vec3.copy(lastSeg.position, _temp_vec3);

    lastSeg.lifetime = 0;

    if (this.widthFromParticle) {
      lastSeg.width = p.size.x * this.widthRatio.evaluate(0, 1);
    } else {
      lastSeg.width = this.widthRatio.evaluate(0, 1);
    }

    const trailNum = trail.count();

    if (trailNum === 2) {
      const lastSecondTrail = trail.getElement(trail.end - 2);

      _index3.Vec3.subtract(lastSecondTrail.velocity, lastSeg.position, lastSecondTrail.position);
    } else if (trailNum > 2) {
      const lastSecondTrail = trail.getElement(trail.end - 2);
      const lastThirdTrail = trail.getElement(trail.end - 3);

      _index3.Vec3.subtract(_temp_vec3, lastThirdTrail.position, lastSecondTrail.position);

      _index3.Vec3.subtract(_temp_vec3_1, lastSeg.position, lastSecondTrail.position);

      _index3.Vec3.subtract(lastSecondTrail.velocity, _temp_vec3_1, _temp_vec3);

      if (_index3.Vec3.equals(_index3.Vec3.ZERO, lastSecondTrail.velocity)) {
        _index3.Vec3.copy(lastSecondTrail.velocity, _temp_vec3);
      }

      _index3.Vec3.normalize(lastSecondTrail.velocity, lastSecondTrail.velocity);

      this._checkDirectionReverse(lastSecondTrail, lastThirdTrail);
    }

    if (this.colorFromParticle) {
      lastSeg.color.set(p.color);
    } else {
      lastSeg.color.set(this.colorOvertime.evaluate(0, 1));
    }
  }

  removeParticle(p) {
    const trail = this._particleTrail.get(p);

    if (trail && this._trailSegments) {
      trail.clear();

      this._trailSegments.free(trail);

      this._particleTrail.delete(p);
    }
  }

  updateRenderData() {
    this.vbOffset = 0;
    this.ibOffset = 0;

    for (const p of this._particleTrail.keys()) {
      const trailSeg = this._particleTrail.get(p);

      if (trailSeg.start === -1) {
        continue;
      }

      const indexOffset = this.vbOffset * 4 / this._vertSize;
      const end = trailSeg.start >= trailSeg.end ? trailSeg.end + trailSeg.trailElements.length : trailSeg.end;
      const trailNum = end - trailSeg.start; // const lastSegRatio = vec3.distance(trailSeg.getTailElement()!.position, p.position) / this._minParticleDistance;

      const textCoordSeg = 1 / trailNum
      /* - 1 + lastSegRatio */
      ;
      const startSegEle = trailSeg.trailElements[trailSeg.start];

      this._fillVertexBuffer(startSegEle, this.colorOverTrail.evaluate(1, 1), indexOffset, 1, 0, NEXT_TRIANGLE_INDEX);

      for (let i = trailSeg.start + 1; i < end; i++) {
        const segEle = trailSeg.trailElements[i % trailSeg.trailElements.length];
        const j = i - trailSeg.start;

        this._fillVertexBuffer(segEle, this.colorOverTrail.evaluate(1 - j / trailNum, 1), indexOffset, 1 - j * textCoordSeg, j, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
      }

      if (this._needTransform) {
        _index3.Vec3.transformMat4(_temp_trailEle.position, p.position, _temp_xform);
      } else {
        _index3.Vec3.copy(_temp_trailEle.position, p.position);
      }

      if (trailNum === 1 || trailNum === 2) {
        const lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);

        _index3.Vec3.subtract(lastSecondTrail.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._vbF32[this.vbOffset - this._vertSize / 4 - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 2] = lastSecondTrail.velocity.z;
        this._vbF32[this.vbOffset - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - 2] = lastSecondTrail.velocity.z;

        _index3.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
      } else if (trailNum > 2) {
        const lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);
        const lastThirdTrail = trailSeg.getElement(trailSeg.end - 2);

        _index3.Vec3.subtract(_temp_vec3, lastThirdTrail.position, lastSecondTrail.position);

        _index3.Vec3.subtract(_temp_vec3_1, _temp_trailEle.position, lastSecondTrail.position);

        _index3.Vec3.normalize(_temp_vec3, _temp_vec3);

        _index3.Vec3.normalize(_temp_vec3_1, _temp_vec3_1);

        _index3.Vec3.subtract(lastSecondTrail.velocity, _temp_vec3_1, _temp_vec3);

        _index3.Vec3.normalize(lastSecondTrail.velocity, lastSecondTrail.velocity);

        this._checkDirectionReverse(lastSecondTrail, lastThirdTrail); // refresh last trail segment data


        this.vbOffset -= this._vertSize / 4 * 2;
        this.ibOffset -= 6; // _bcIdx = (_bcIdx - 6 + 9) % 9;  // <wireframe debug>

        this._fillVertexBuffer(lastSecondTrail, this.colorOverTrail.evaluate(textCoordSeg, 1), indexOffset, textCoordSeg, trailNum - 1, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);

        _index3.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);

        _index3.Vec3.normalize(_temp_trailEle.velocity, _temp_trailEle.velocity);

        this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
      }

      if (this.widthFromParticle) {
        _temp_trailEle.width = p.size.x * this.widthRatio.evaluate(0, 1);
      } else {
        _temp_trailEle.width = this.widthRatio.evaluate(0, 1);
      }

      _temp_trailEle.color = p.color;

      if (_index3.Vec3.equals(_temp_trailEle.velocity, _index3.Vec3.ZERO)) {
        this.ibOffset -= 3;
      } else {
        this._fillVertexBuffer(_temp_trailEle, this.colorOverTrail.evaluate(0, 1), indexOffset, 0, trailNum, PRE_TRIANGLE_INDEX);
      }
    }

    this._trailModel.enabled = this.ibOffset > 0;
  }

  updateIA(count) {
    const subModels = this._trailModel && this._trailModel.subModels;

    if (subModels && subModels.length > 0) {
      const subModel = subModels[0];
      subModel.inputAssembler.vertexBuffers[0].update(this._vbF32);
      subModel.inputAssembler.indexBuffer.update(this._iBuffer);
      this._iaInfo.drawInfos[0].firstIndex = 0;
      this._iaInfo.drawInfos[0].indexCount = count;

      this._iaInfoBuffer.update(this._iaInfo);
    }
  }

  beforeRender() {
    this.updateIA(this.ibOffset);
  }

  _createModel() {
    if (this._trailModel) {
      return;
    }

    this._trailModel = _globalExports.legacyCC.director.root.createModel(_index5.scene.Model);
  }

  rebuild() {
    const device = _director.director.root.device;
    const vertexBuffer = device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.VERTEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, this._vertSize * (this._trailNum + 1) * 2, this._vertSize));
    const vBuffer = new ArrayBuffer(this._vertSize * (this._trailNum + 1) * 2);
    this._vbF32 = new Float32Array(vBuffer);
    this._vbUint32 = new Uint32Array(vBuffer);
    vertexBuffer.update(vBuffer);
    const indexBuffer = device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.INDEX | _index2.BufferUsageBit.TRANSFER_DST, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, this._trailNum * 6 * Uint16Array.BYTES_PER_ELEMENT, Uint16Array.BYTES_PER_ELEMENT));
    this._iBuffer = new Uint16Array(this._trailNum * 6);
    indexBuffer.update(this._iBuffer);
    this._iaInfoBuffer = device.createBuffer(new _index2.BufferInfo(_index2.BufferUsageBit.INDIRECT, _index2.MemoryUsageBit.HOST | _index2.MemoryUsageBit.DEVICE, _index2.DRAW_INFO_SIZE, _index2.DRAW_INFO_SIZE));
    this._iaInfo.drawInfos[0].vertexCount = (this._trailNum + 1) * 2;
    this._iaInfo.drawInfos[0].indexCount = this._trailNum * 6;

    this._iaInfoBuffer.update(this._iaInfo);

    this._subMeshData = new _renderingSubMesh.RenderingSubMesh([vertexBuffer], this._vertAttrs, _index2.PrimitiveMode.TRIANGLE_LIST, indexBuffer, this._iaInfoBuffer);
    const trailModel = this._trailModel;

    if (trailModel) {
      trailModel.node = trailModel.transform = this._particleSystem.node;
      trailModel.visFlags = this._particleSystem.visibility;
      trailModel.initSubModel(0, this._subMeshData, this._material);
      trailModel.enabled = true;
    }
  }

  _updateTrailElement(module, trailEle, p, dt) {
    trailEle.lifetime += dt;

    if (module.colorFromParticle) {
      trailEle.color.set(p.color);
      trailEle.color.multiply(module.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    } else {
      trailEle.color.set(module.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    }

    if (module.widthFromParticle) {
      trailEle.width = p.size.x * module.widthRatio.evaluate(trailEle.lifetime / module._trailLifetime, 1);
    } else {
      trailEle.width = module.widthRatio.evaluate(trailEle.lifetime / module._trailLifetime, 1);
    }

    return trailEle.lifetime > module._trailLifetime;
  }

  _fillVertexBuffer(trailSeg, colorModifer, indexOffset, xTexCoord, trailEleIdx, indexSet) {
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = trailSeg.direction;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 0; // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;

    _temp_color.set(trailSeg.color);

    _temp_color.multiply(colorModifer);

    this._vbUint32[this.vbOffset++] = _temp_color._val;
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 1 - trailSeg.direction;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 1; // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32![this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
    this._vbUint32[this.vbOffset++] = _temp_color._val;

    if (indexSet & PRE_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx - 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
    }

    if (indexSet & NEXT_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 2;
    }
  }

  _checkDirectionReverse(currElement, prevElement) {
    if (_index3.Vec3.dot(currElement.velocity, prevElement.velocity) < DIRECTION_THRESHOLD) {
      currElement.direction = 1 - prevElement.direction;
    } else {
      currElement.direction = prevElement.direction;
    }
  }

  destroySubMeshData() {
    if (this._subMeshData) {
      this._subMeshData.destroy();

      this._subMeshData = null;
    }
  } // <debug use>
  // private _printVB() {
  //     let log = new String();
  //     for (let i = 0; i < this.vbOffset; i++) {
  //         log += 'pos:' + this._vbF32![i++].toFixed(2) + ',' + this._vbF32![i++].toFixed(2) + ',' +
  //                this._vbF32![i++].toFixed(2) + ' dir:' + this._vbF32![i++].toFixed(0) + ' ';
  //         i += 6;
  //         log += 'vel:' + this._vbF32![i++].toFixed(2) + ',' + this._vbF32![i++].toFixed(2) + ',' + this._vbF32![i++].toFixed(2) + '\n';
  //     }
  //     if (log.length > 0) {
  //         console.log(log);
  //     }
  // }


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec3, _index.serializable, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.TrailMode.Particles;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec6, _index.serializable, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_minParticleDistance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "minParticleDistance", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "minParticleDistance"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "space", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "space"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "existWithParticles", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "textureMode", [_dec14, _index.serializable, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.TextureMode.Stretch;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "widthFromParticle", [_index.serializable, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "widthRatio", [_dec19, _index.serializable, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "colorFromParticle", [_index.serializable, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "colorOverTrail", [_dec24, _index.serializable, _dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradientRange.default();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "colorOvertime", [_dec27, _index.serializable, _dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradientRange.default();
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_space", [_dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.Space.World;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_particleSystem", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class);
exports.default = TrailModule;