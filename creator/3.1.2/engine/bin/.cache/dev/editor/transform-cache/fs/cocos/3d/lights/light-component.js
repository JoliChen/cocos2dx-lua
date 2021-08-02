"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Light = exports.PhotometricTerm = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/value-types/index.js");

var _index4 = require("../../core/renderer/index.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class6, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const PhotometricTerm = (0, _index3.Enum)({
  LUMINOUS_POWER: 0,
  LUMINANCE: 1
});
exports.PhotometricTerm = PhotometricTerm;

const _color_tmp = new _index2.Vec3();
/**
 * @en static light settings.
 * @zh 静态灯光设置
 */


let StaticLightSettings = (_dec = (0, _index.ccclass)('cc.StaticLightSettings'), _dec(_class = (_class2 = (_temp = class StaticLightSettings {
  constructor() {
    _initializerDefineProperty(this, "_baked", _descriptor, this);

    _initializerDefineProperty(this, "_editorOnly", _descriptor2, this);

    _initializerDefineProperty(this, "_bakeable", _descriptor3, this);

    _initializerDefineProperty(this, "_castShadow", _descriptor4, this);
  }

  /**
   * @en editor only.
   * @zh 是否只在编辑器里生效。
   */
  get editorOnly() {
    return this._editorOnly;
  }

  set editorOnly(val) {
    this._editorOnly = val;
  }
  /**
   * bake state
   */


  get baked() {
    return this._baked;
  }

  set baked(val) {
    this._baked = val;
  }
  /**
   * @en bakeable.
   * @zh 是否可烘培。
   */


  get bakeable() {
    return this._bakeable;
  }

  set bakeable(val) {
    this._bakeable = val;
  }
  /**
   * @en cast shadow.
   * @zh 是否投射阴影。
   */


  get castShadow() {
    return this._castShadow;
  }

  set castShadow(val) {
    this._castShadow = val;
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_baked", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_editorOnly", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_bakeable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_castShadow", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "editorOnly", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "editorOnly"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "bakeable", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "bakeable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "castShadow", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "castShadow"), _class2.prototype)), _class2)) || _class);
let Light = (_dec2 = (0, _index.ccclass)('cc.Light'), _dec3 = (0, _index.tooltip)('i18n:lights.color'), _dec4 = (0, _index.tooltip)('i18n:lights.use_color_temperature'), _dec5 = (0, _index.range)([1000, 15000, 1]), _dec6 = (0, _index.tooltip)('i18n:lights.color_temperature'), _dec7 = (0, _index.type)(StaticLightSettings), _dec2(_class4 = (_class5 = (_temp2 = _class6 = class Light extends _component.Component {
  /**
   * @en
   * Color of the light.
   * @zh
   * 光源颜色。
   */
  get color() {
    return this._color;
  }

  set color(val) {
    this._color = val;

    if (this._light) {
      _color_tmp.x = val.r / 255.0;
      _color_tmp.y = val.g / 255.0;
      _color_tmp.z = val.b / 255.0;
      this._light.color = _color_tmp;
    }
  }
  /**
   * @en
   * Whether to enable light color temperature.
   * @zh
   * 是否启用光源色温。
   */


  get useColorTemperature() {
    return this._useColorTemperature;
  }

  set useColorTemperature(enable) {
    this._useColorTemperature = enable;

    if (this._light) {
      this._light.useColorTemperature = enable;
    }
  }
  /**
   * @en
   * The light color temperature.
   * @zh
   * 光源色温。
   */


  get colorTemperature() {
    return this._colorTemperature;
  }

  set colorTemperature(val) {
    this._colorTemperature = val;

    if (this._light) {
      this._light.colorTemperature = val;
    }
  }
  /**
   * @en
   * static light settings.
   * @zh
   * 静态灯光设置。
   */


  get staticSettings() {
    return this._staticSettings;
  }

  set staticSettings(val) {
    this._staticSettings = val;
  }
  /**
   * @en
   * The light type.
   * @zh
   * 光源类型。
   */


  get type() {
    return this._type;
  }
  /**
   * bake state
   */


  get baked() {
    return this.staticSettings.baked;
  }

  set baked(val) {
    this.staticSettings.baked = val;

    if (this._light !== null) {
      this._light.baked = val;
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_color", _descriptor5, this);

    _initializerDefineProperty(this, "_useColorTemperature", _descriptor6, this);

    _initializerDefineProperty(this, "_colorTemperature", _descriptor7, this);

    _initializerDefineProperty(this, "_staticSettings", _descriptor8, this);

    this._type = _index4.scene.LightType.UNKNOWN;
    this._lightType = void 0;
    this._light = null;
    this._lightType = _index4.scene.Light;
  }

  onLoad() {
    this._createLight();
  }

  onEnable() {
    this._attachToScene();
  }

  onDisable() {
    this._detachFromScene();
  }

  onDestroy() {
    this._destroyLight();
  }

  _createLight() {
    if (!this._light) {
      this._light = _globalExports.legacyCC.director.root.createLight(this._lightType);
    }

    this.color = this._color;
    this.useColorTemperature = this._useColorTemperature;
    this.colorTemperature = this._colorTemperature;
    this._light.node = this.node;
    this._light.baked = this.baked;
  }

  _destroyLight() {
    if (this._light) {
      _globalExports.legacyCC.director.root.destroyLight(this);

      this._light = null;
    }
  }

  _attachToScene() {
    this._detachFromScene();

    if (this._light && !this._light.scene && this.node.scene) {
      const renderScene = this._getRenderScene();

      switch (this._type) {
        case _index4.scene.LightType.DIRECTIONAL:
          renderScene.addDirectionalLight(this._light);
          renderScene.setMainLight(this._light);
          break;

        case _index4.scene.LightType.SPHERE:
          renderScene.addSphereLight(this._light);
          break;

        case _index4.scene.LightType.SPOT:
          renderScene.addSpotLight(this._light);
          break;
      }
    }
  }

  _detachFromScene() {
    if (this._light && this._light.scene) {
      const renderScene = this._light.scene;

      switch (this._type) {
        case _index4.scene.LightType.DIRECTIONAL:
          renderScene.removeDirectionalLight(this._light);
          renderScene.unsetMainLight(this._light);
          break;

        case _index4.scene.LightType.SPHERE:
          renderScene.removeSphereLight(this._light);
          break;

        case _index4.scene.LightType.SPOT:
          renderScene.removeSpotLight(this._light);
          break;
      }
    }
  }

}, _class6.Type = _index4.scene.LightType, _class6.PhotometricTerm = PhotometricTerm, _temp2), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_color", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_useColorTemperature", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_colorTemperature", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 6550;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class5.prototype, "_staticSettings", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new StaticLightSettings();
  }
}), _applyDecoratedDescriptor(_class5.prototype, "color", [_dec3], Object.getOwnPropertyDescriptor(_class5.prototype, "color"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useColorTemperature", [_dec4], Object.getOwnPropertyDescriptor(_class5.prototype, "useColorTemperature"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "colorTemperature", [_index.slide, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class5.prototype, "colorTemperature"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "staticSettings", [_dec7], Object.getOwnPropertyDescriptor(_class5.prototype, "staticSettings"), _class5.prototype)), _class5)) || _class4);
exports.Light = Light;