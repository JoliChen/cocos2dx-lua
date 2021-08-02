"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SphereLight = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/renderer/index.js");

var _lightComponent = require("./light-component.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let SphereLight = (_dec = (0, _index.ccclass)('cc.SphereLight'), _dec2 = (0, _index.help)('i18n:cc.SphereLight'), _dec3 = (0, _index.menu)('Light/SphereLight'), _dec4 = (0, _index.unit)('lm'), _dec5 = (0, _index.tooltip)('i18n:lights.luminous_power'), _dec6 = (0, _index.unit)('cd/m²'), _dec7 = (0, _index.tooltip)('i18n:lights.luminance'), _dec8 = (0, _index.type)(_lightComponent.PhotometricTerm), _dec9 = (0, _index.tooltip)('i18n:lights.term'), _dec10 = (0, _index.tooltip)('i18n:lights.size'), _dec11 = (0, _index.tooltip)('i18n:lights.range'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class SphereLight extends _lightComponent.Light {
  /**
   * @en Luminous power of the light.
   * @zh 光通量。
   */
  get luminousPower() {
    return this._luminance * _index2.scene.nt2lm(this._size);
  }

  set luminousPower(val) {
    this._luminance = val / _index2.scene.nt2lm(this._size);

    if (this._light) {
      this._light.luminance = this._luminance;
    }
  }
  /**
   * @en Luminance of the light.
   * @zh 光亮度。
   */


  get luminance() {
    return this._luminance;
  }

  set luminance(val) {
    this._luminance = val;

    if (this._light) {
      this._light.luminance = val;
    }
  }
  /**
   * @en The photometric term currently being used.
   * @zh 当前使用的光度学计量单位。
   */


  get term() {
    return this._term;
  }

  set term(val) {
    this._term = val;
  }
  /**
   * @en
   * Size of the light.
   * @zh
   * 光源大小。
   */


  get size() {
    return this._size;
  }

  set size(val) {
    this._size = val;

    if (this._light) {
      this._light.size = val;
    }
  }
  /**
   * @en
   * Range of the light.
   * @zh
   * 光源范围。
   */


  get range() {
    return this._range;
  }

  set range(val) {
    this._range = val;

    if (this._light) {
      this._light.range = val;
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_size", _descriptor, this);

    _initializerDefineProperty(this, "_luminance", _descriptor2, this);

    _initializerDefineProperty(this, "_term", _descriptor3, this);

    _initializerDefineProperty(this, "_range", _descriptor4, this);

    this._type = _index2.scene.LightType.SPHERE;
    this._light = null;
    this._lightType = _index2.scene.SphereLight;
  }

  _createLight() {
    super._createLight();

    if (!this._light) {
      return;
    }

    this.luminance = this._luminance;
    this.size = this._size;
    this.range = this._range;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_size", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.15;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_luminance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1700 / _index2.scene.nt2lm(0.15);
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_term", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _lightComponent.PhotometricTerm.LUMINOUS_POWER;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_range", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "luminousPower", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "luminousPower"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "luminance", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "luminance"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "term", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "term"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "size", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "size"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "range", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "range"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.SphereLight = SphereLight;