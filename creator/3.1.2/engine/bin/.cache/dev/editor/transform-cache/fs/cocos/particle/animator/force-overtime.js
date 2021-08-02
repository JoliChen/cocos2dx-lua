"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _enum = require("../enum.js");

var _particleGeneralFunction = require("../particle-general-function.js");

var _curveRange = _interopRequireDefault(require("./curve-range.js"));

var _particle = require("../particle.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const FORCE_OVERTIME_RAND_OFFSET = _enum.ModuleRandSeed.FORCE;

const _temp_v3 = new _index2.Vec3();

let ForceOvertimeModule = (_dec = (0, _index.ccclass)('cc.ForceOvertimeModule'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.type)(_curveRange.default), _dec4 = (0, _index.range)([-1, 1]), _dec5 = (0, _index.displayOrder)(2), _dec6 = (0, _index.tooltip)('i18n:forceOvertimeModule.x'), _dec7 = (0, _index.type)(_curveRange.default), _dec8 = (0, _index.range)([-1, 1]), _dec9 = (0, _index.displayOrder)(3), _dec10 = (0, _index.tooltip)('i18n:forceOvertimeModule.y'), _dec11 = (0, _index.type)(_curveRange.default), _dec12 = (0, _index.range)([-1, 1]), _dec13 = (0, _index.displayOrder)(4), _dec14 = (0, _index.tooltip)('i18n:forceOvertimeModule.z'), _dec15 = (0, _index.type)(_enum.Space), _dec16 = (0, _index.displayOrder)(1), _dec17 = (0, _index.tooltip)('i18n:forceOvertimeModule.space'), _dec(_class = (_class2 = (_temp = class ForceOvertimeModule extends _particle.ParticleModuleBase {
  /**
   * @zh 是否启用。
   */
  get enable() {
    return this._enable;
  }

  set enable(val) {
    if (this._enable === val) return;
    this._enable = val;
    if (!this.target) return;
    this.target.enableModule(this.name, val, this);
  }
  /**
   * @zh X 轴方向上的加速度分量。
   */


  constructor() {
    super();

    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "x", _descriptor2, this);

    _initializerDefineProperty(this, "y", _descriptor3, this);

    _initializerDefineProperty(this, "z", _descriptor4, this);

    _initializerDefineProperty(this, "space", _descriptor5, this);

    this.randomized = false;
    this.rotation = void 0;
    this.needTransform = void 0;
    this.name = _particle.PARTICLE_MODULE_NAME.FORCE;
    this.rotation = new _index2.Quat();
    this.needTransform = false;
    this.needUpdate = true;
  }

  update(space, worldTransform) {
    this.needTransform = (0, _particleGeneralFunction.calculateTransform)(space, this.space, worldTransform, this.rotation);
  }

  animate(p, dt) {
    const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    const force = _index2.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      _index2.Vec3.transformQuat(force, force, this.rotation);
    }

    _index2.Vec3.scaleAndAdd(p.velocity, p.velocity, force, dt);

    _index2.Vec3.copy(p.ultimateVelocity, p.velocity);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec3, _index.serializable, _dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec7, _index.serializable, _dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec11, _index.serializable, _dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec15, _index.serializable, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.Space.Local;
  }
})), _class2)) || _class);
exports.default = ForceOvertimeModule;