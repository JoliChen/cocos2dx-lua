"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLight = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/renderer/index.js");

var _lightComponent = require("./light-component.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let DirectionalLight = (_dec = (0, _index.ccclass)('cc.DirectionalLight'), _dec2 = (0, _index.help)('i18n:cc.DirectionalLight'), _dec3 = (0, _index.menu)('Light/DirectionalLight'), _dec4 = (0, _index.unit)('lx'), _dec5 = (0, _index.tooltip)('i18n:lights.illuminance'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class DirectionalLight extends _lightComponent.Light {
  /**
   * @en
   * The light source intensity.
   * @zh
   * 光源强度。
   */
  get illuminance() {
    return this._illuminance;
  }

  set illuminance(val) {
    this._illuminance = val;

    if (this._light) {
      this._light.illuminance = this._illuminance;
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_illuminance", _descriptor, this);

    this._type = _index2.scene.LightType.DIRECTIONAL;
    this._light = null;
    this._lightType = _index2.scene.DirectionalLight;
  }

  _createLight() {
    super._createLight();

    if (!this._light) {
      return;
    }

    this.illuminance = this._illuminance;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_illuminance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 65000;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "illuminance", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "illuminance"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports.DirectionalLight = DirectionalLight;