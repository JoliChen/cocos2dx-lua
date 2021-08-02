"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../3d/index.js");

var _index3 = require("../../core/assets/index.js");

var _enum = require("../enum.js");

var _particleSystemRendererCpu = _interopRequireDefault(require("./particle-system-renderer-cpu.js"));

var _particleSystemRendererGpu = _interopRequireDefault(require("./particle-system-renderer-gpu.js"));

var _director = require("../../core/director.js");

var _index4 = require("../../core/gfx/index.js");

var _globalExports = require("../../core/global-exports.js");

var _index5 = require("../../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function isSupportGPUParticle() {
  const device = _director.director.root.device;

  if (device.capabilities.maxVertexTextureUnits >= 8 && device.hasFeature(_index4.Feature.TEXTURE_FLOAT)) {
    return true;
  }

  _globalExports.legacyCC.warn('Maybe the device has restrictions on vertex textures or does not support float textures.');

  return false;
}

let ParticleSystemRenderer = (_dec = (0, _index.ccclass)('cc.ParticleSystemRenderer'), _dec2 = (0, _index.type)(_enum.RenderMode), _dec3 = (0, _index.displayOrder)(0), _dec4 = (0, _index.tooltip)('i18n:particleSystemRenderer.renderMode'), _dec5 = (0, _index.displayOrder)(1), _dec6 = (0, _index.tooltip)('i18n:particleSystemRenderer.velocityScale'), _dec7 = (0, _index.displayOrder)(2), _dec8 = (0, _index.tooltip)('i18n:particleSystemRenderer.lengthScale'), _dec9 = (0, _index.type)(_enum.RenderMode), _dec10 = (0, _index.type)(_index2.Mesh), _dec11 = (0, _index.displayOrder)(7), _dec12 = (0, _index.tooltip)('i18n:particleSystemRenderer.mesh'), _dec13 = (0, _index.type)(_index3.Material), _dec14 = (0, _index.displayOrder)(8), _dec15 = (0, _index.tooltip)('i18n:particleSystemRenderer.particleMaterial'), _dec16 = (0, _index.type)(_index3.Material), _dec17 = (0, _index.displayOrder)(9), _dec18 = (0, _index.tooltip)('i18n:particleSystemRenderer.trailMaterial'), _dec19 = (0, _index.displayOrder)(10), _dec20 = (0, _index.tooltip)('i18n:particleSystemRenderer.useGPU'), _dec(_class = (_class2 = (_temp = class ParticleSystemRenderer {
  constructor() {
    _initializerDefineProperty(this, "_renderMode", _descriptor, this);

    _initializerDefineProperty(this, "_velocityScale", _descriptor2, this);

    _initializerDefineProperty(this, "_lengthScale", _descriptor3, this);

    _initializerDefineProperty(this, "_mesh", _descriptor4, this);

    _initializerDefineProperty(this, "_mainTexture", _descriptor5, this);

    _initializerDefineProperty(this, "_useGPU", _descriptor6, this);

    this._particleSystem = null;
  }

  /**
   * @zh 设定粒子生成模式。
   */
  get renderMode() {
    return this._renderMode;
  }

  set renderMode(val) {
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


  get velocityScale() {
    return this._velocityScale;
  }

  set velocityScale(val) {
    this._velocityScale = val;

    if (this._particleSystem) {
      this._particleSystem.processor.updateMaterialParams();
    } // this._updateModel();

  }
  /**
   * @zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按粒子大小进行拉伸。
   */


  get lengthScale() {
    return this._lengthScale;
  }

  set lengthScale(val) {
    this._lengthScale = val;

    if (this._particleSystem) {
      this._particleSystem.processor.updateMaterialParams();
    } // this._updateModel();

  }

  /**
   * @zh 粒子发射的模型。
   */
  get mesh() {
    return this._mesh;
  }

  set mesh(val) {
    this._mesh = val;

    if (this._particleSystem) {
      this._particleSystem.processor.setVertexAttributes();
    }
  }
  /**
   * @zh 粒子使用的材质。
   */


  get particleMaterial() {
    if (!this._particleSystem) {
      return null;
    }

    return this._particleSystem.getMaterial(0);
  }

  set particleMaterial(val) {
    if (this._particleSystem) {
      this._particleSystem.setMaterial(val, 0);
    }
  }
  /**
   * @zh 拖尾使用的材质。
   */


  get trailMaterial() {
    if (!this._particleSystem) {
      return null;
    }

    return this._particleSystem.getMaterial(1);
  }

  set trailMaterial(val) {
    if (this._particleSystem) {
      this._particleSystem.setMaterial(val, 1);
    }
  }

  get mainTexture() {
    return this._mainTexture;
  }

  set mainTexture(val) {
    this._mainTexture = val;
  }

  get useGPU() {
    return this._useGPU;
  }

  set useGPU(val) {
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

  // ParticleSystem
  create(ps) {
    // if particle system is null we run the old routine
    // else if particle system is not null we do nothing
    if (this._particleSystem === null) {
      this._particleSystem = ps;
    } else if (this._particleSystem !== ps) {
      (0, _index5.errorID)(6033);
    }
  }

  onInit(ps) {
    this.create(ps);

    if (!this._particleSystem.processor) {
      const useGPU = this._useGPU && isSupportGPUParticle();
      this._particleSystem.processor = useGPU ? new _particleSystemRendererGpu.default(this) : new _particleSystemRendererCpu.default(this);

      this._particleSystem.processor.onInit(ps);
    } else {
      (0, _index5.errorID)(6034);
    }
  }

  _switchProcessor() {
    if (!this._particleSystem) {
      return;
    }

    if (this._particleSystem.processor) {
      this._particleSystem.processor.detachFromScene();

      this._particleSystem.processor.clear();

      this._particleSystem.processor = null;
    }

    this._particleSystem.processor = this._useGPU ? new _particleSystemRendererGpu.default(this) : new _particleSystemRendererCpu.default(this);

    this._particleSystem.processor.onInit(this._particleSystem);

    this._particleSystem.processor.onEnable();

    this._particleSystem.bindModule();
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "renderMode", [_dec2, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "renderMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "velocityScale", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityScale"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lengthScale", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "lengthScale"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_renderMode", [_dec9, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.RenderMode.Billboard;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_velocityScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_lengthScale", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_mesh", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "mesh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "particleMaterial", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "particleMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trailMaterial", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "trailMaterial"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_mainTexture", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useGPU", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "useGPU", [_dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "useGPU"), _class2.prototype)), _class2)) || _class);
exports.default = ParticleSystemRenderer;