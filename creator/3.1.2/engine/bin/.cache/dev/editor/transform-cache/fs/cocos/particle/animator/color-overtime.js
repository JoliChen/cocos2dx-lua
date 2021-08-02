"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _particle = require("../particle.js");

var _gradientRange = _interopRequireDefault(require("./gradient-range.js"));

var _enum = require("../enum.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const COLOR_OVERTIME_RAND_OFFSET = _enum.ModuleRandSeed.COLOR;
let ColorOvertimeModule = (_dec = (0, _index.ccclass)('cc.ColorOvertimeModule'), _dec2 = (0, _index.displayOrder)(0), _dec3 = (0, _index.type)(_gradientRange.default), _dec4 = (0, _index.displayOrder)(1), _dec(_class = (_class2 = (_temp = class ColorOvertimeModule extends _particle.ParticleModuleBase {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "color", _descriptor2, this);

    this.name = _particle.PARTICLE_MODULE_NAME.COLOR;
  }

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
   * @zh 颜色随时间变化的参数，各个 key 之间线性差值变化。
   */


  animate(particle) {
    particle.color.set(particle.startColor);
    particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, (0, _index2.pseudoRandom)(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec3, _index.serializable, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradientRange.default();
  }
})), _class2)) || _class);
exports.default = ColorOvertimeModule;