"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _enum = require("../enum.js");

var _particle = require("../particle.js");

var _curveRange = _interopRequireDefault(require("./curve-range.js"));

var _particleGeneralFunction = require("../particle-general-function.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const LIMIT_VELOCITY_RAND_OFFSET = _enum.ModuleRandSeed.LIMIT;

const _temp_v3 = new _index2.Vec3();

const _temp_v3_1 = new _index2.Vec3();

let LimitVelocityOvertimeModule = (_dec = (0, _index.ccclass)('cc.LimitVelocityOvertimeModule'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.type)(_curveRange.default), _dec4 = (0, _index.range)([-1, 1]), _dec5 = (0, _index.displayOrder)(4), _dec6 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.limitX'), _dec7 = (0, _index.type)(_curveRange.default), _dec8 = (0, _index.range)([-1, 1]), _dec9 = (0, _index.displayOrder)(5), _dec10 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.limitY'), _dec11 = (0, _index.type)(_curveRange.default), _dec12 = (0, _index.range)([-1, 1]), _dec13 = (0, _index.displayOrder)(6), _dec14 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.limitZ'), _dec15 = (0, _index.type)(_curveRange.default), _dec16 = (0, _index.range)([-1, 1]), _dec17 = (0, _index.displayOrder)(3), _dec18 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.limit'), _dec19 = (0, _index.displayOrder)(7), _dec20 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.dampen'), _dec21 = (0, _index.displayOrder)(2), _dec22 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.separateAxes'), _dec23 = (0, _index.type)(_enum.Space), _dec24 = (0, _index.displayOrder)(1), _dec25 = (0, _index.tooltip)('i18n:limitVelocityOvertimeModule.space'), _dec(_class = (_class2 = (_temp = class LimitVelocityOvertimeModule extends _particle.ParticleModuleBase {
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
   * @zh X 轴方向上的速度下限。
   */


  constructor() {
    super();

    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "limitX", _descriptor2, this);

    _initializerDefineProperty(this, "limitY", _descriptor3, this);

    _initializerDefineProperty(this, "limitZ", _descriptor4, this);

    _initializerDefineProperty(this, "limit", _descriptor5, this);

    _initializerDefineProperty(this, "dampen", _descriptor6, this);

    _initializerDefineProperty(this, "separateAxes", _descriptor7, this);

    _initializerDefineProperty(this, "space", _descriptor8, this);

    this.drag = null;
    this.multiplyDragByParticleSize = false;
    this.multiplyDragByParticleVelocity = false;
    this.name = _particle.PARTICLE_MODULE_NAME.LIMIT;
    this.rotation = void 0;
    this.needTransform = void 0;
    this.rotation = new _index2.Quat();
    this.needTransform = false;
    this.needUpdate = true;
  }

  update(space, worldTransform) {
    this.needTransform = (0, _particleGeneralFunction.calculateTransform)(space, this.space, worldTransform, this.rotation);
  }

  animate(p, dt) {
    const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    const dampedVel = _temp_v3;

    if (this.separateAxes) {
      _index2.Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));

      if (this.needTransform) {
        _index2.Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
      }

      _index2.Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
    } else {
      _index2.Vec3.normalize(dampedVel, p.ultimateVelocity);

      _index2.Vec3.multiplyScalar(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.length(), this.limit.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
    }

    _index2.Vec3.copy(p.ultimateVelocity, dampedVel);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "limitX", [_dec3, _index.serializable, _dec4, _dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "limitY", [_dec7, _index.serializable, _dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "limitZ", [_dec11, _index.serializable, _dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec15, _index.serializable, _dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dampen", [_index.serializable, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 3;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_index.serializable, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec23, _index.serializable, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _enum.Space.Local;
  }
})), _class2)) || _class);
exports.default = LimitVelocityOvertimeModule;

function dampenBeyondLimit(vel, limit, dampen) {
  const sgn = Math.sign(vel);
  let abs = Math.abs(vel);

  if (abs > limit) {
    abs = (0, _index2.lerp)(abs, limit, dampen);
  }

  return abs * sgn;
}