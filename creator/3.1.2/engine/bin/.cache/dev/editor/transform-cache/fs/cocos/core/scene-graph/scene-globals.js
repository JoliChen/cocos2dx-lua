"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGlobals = exports.ShadowsInfo = exports.FogInfo = exports.SkyboxInfo = exports.AmbientInfo = void 0;

var _index = require("../data/decorators/index.js");

var _textureCube = require("../assets/texture-cube.js");

var _attribute = require("../data/utils/attribute.js");

var _index2 = require("../math/index.js");

var _ambient = require("../renderer/scene/ambient.js");

var _shadows = require("../renderer/scene/shadows.js");

var _fog = require("../renderer/scene/fog.js");

var _globalExports = require("../global-exports.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _dec3, _dec4, _dec5, _class4, _class5, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp2, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class7, _class8, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class9, _temp3, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _class10, _class11, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _temp4, _dec64, _dec65, _class13, _class14, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _temp5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const _up = new _index2.Vec3(0, 1, 0);

const _v3 = new _index2.Vec3();

const _qt = new _index2.Quat();
/**
 * @en Environment lighting information in the Scene
 * @zh 场景的环境光照相关信息
 */


let AmbientInfo = (_dec = (0, _index.ccclass)('cc.AmbientInfo'), _dec2 = (0, _index.type)(_attribute.CCFloat), _dec(_class = (_class2 = (_temp = class AmbientInfo {
  constructor() {
    _initializerDefineProperty(this, "_skyColor", _descriptor, this);

    _initializerDefineProperty(this, "_skyIllum", _descriptor2, this);

    _initializerDefineProperty(this, "_groundAlbedo", _descriptor3, this);

    this._resource = null;
  }

  /**
   * @en Sky color
   * @zh 天空颜色
   */
  set skyColor(val) {
    this._skyColor.set(val);

    if (this._resource) {
      this._resource.skyColor = this._skyColor;
    }
  }

  get skyColor() {
    return this._skyColor;
  }
  /**
   * @en Sky illuminance
   * @zh 天空亮度
   */


  set skyIllum(val) {
    this._skyIllum = val;

    if (this._resource) {
      this._resource.skyIllum = this.skyIllum;
    }
  }

  get skyIllum() {
    return this._skyIllum;
  }
  /**
   * @en Ground color
   * @zh 地面颜色
   */


  set groundAlbedo(val) {
    this._groundAlbedo.set(val); // only RGB channels are used, alpha channel are intensionally left unchanged here


    if (this._resource) {
      this._resource.groundAlbedo = this._groundAlbedo;
    }
  }

  get groundAlbedo() {
    return this._groundAlbedo;
  }

  activate(resource) {
    const aa = resource;
    this._resource = resource;

    this._resource.initialize(this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_skyColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(51, 128, 204, 1.0);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_skyIllum", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _ambient.Ambient.SKY_ILLUM;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_groundAlbedo", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(51, 51, 51, 255);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "skyColor", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "skyColor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "skyIllum", [_index.editable, _dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "skyIllum"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "groundAlbedo", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "groundAlbedo"), _class2.prototype)), _class2)) || _class);
exports.AmbientInfo = AmbientInfo;
_globalExports.legacyCC.AmbientInfo = AmbientInfo;
/**
 * @en Skybox related information
 * @zh 天空盒相关信息
 */

let SkyboxInfo = (_dec3 = (0, _index.ccclass)('cc.SkyboxInfo'), _dec4 = (0, _index.type)(_textureCube.TextureCube), _dec5 = (0, _index.type)(_textureCube.TextureCube), _dec3(_class4 = (_class5 = (_temp2 = class SkyboxInfo {
  constructor() {
    _initializerDefineProperty(this, "_envmap", _descriptor4, this);

    _initializerDefineProperty(this, "_isRGBE", _descriptor5, this);

    _initializerDefineProperty(this, "_enabled", _descriptor6, this);

    _initializerDefineProperty(this, "_useIBL", _descriptor7, this);

    this._resource = null;
  }

  /**
   * @en Whether activate skybox in the scene
   * @zh 是否启用天空盒？
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = this._enabled;
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @en Whether use environment lighting
   * @zh 是否启用环境光照？
   */


  set useIBL(val) {
    this._useIBL = val;

    if (this._resource) {
      this._resource.useIBL = this._useIBL;
    }
  }

  get useIBL() {
    return this._useIBL;
  }
  /**
   * @en The texture cube used for the skybox
   * @zh 使用的立方体贴图
   */


  set envmap(val) {
    this._envmap = val;

    if (this._resource) {
      this._resource.envmap = this._envmap;
    }
  }

  get envmap() {
    return this._envmap;
  }
  /**
   * @en Whether enable RGBE data support in skybox shader
   * @zh 是否需要开启 shader 内的 RGBE 数据支持？
   */


  set isRGBE(val) {
    this._isRGBE = val;

    if (this._resource) {
      this._resource.isRGBE = this._isRGBE;
    }
  }

  get isRGBE() {
    return this._isRGBE;
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);

    this._resource.activate(); // update global DS first

  }

}, _temp2), (_descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "_envmap", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "_isRGBE", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "_useIBL", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class5.prototype, "enabled", [_index.editable], Object.getOwnPropertyDescriptor(_class5.prototype, "enabled"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "useIBL", [_index.editable], Object.getOwnPropertyDescriptor(_class5.prototype, "useIBL"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "envmap", [_index.editable, _dec5], Object.getOwnPropertyDescriptor(_class5.prototype, "envmap"), _class5.prototype), _applyDecoratedDescriptor(_class5.prototype, "isRGBE", [_index.editable], Object.getOwnPropertyDescriptor(_class5.prototype, "isRGBE"), _class5.prototype)), _class5)) || _class4);
exports.SkyboxInfo = SkyboxInfo;
_globalExports.legacyCC.SkyboxInfo = SkyboxInfo;
/**
 * @zh 全局雾相关信息
 * @en Global fog info
 */

let FogInfo = (_dec6 = (0, _index.ccclass)('cc.FogInfo'), _dec7 = (0, _index.type)(_fog.FogType), _dec8 = (0, _index.visible)(function () {
  return this._type !== _fog.FogType.LAYERED && this._type !== _fog.FogType.LINEAR;
}), _dec9 = (0, _index.type)(_attribute.CCFloat), _dec10 = (0, _index.range)([0, 1]), _dec11 = (0, _index.rangeStep)(0.01), _dec12 = (0, _index.displayOrder)(3), _dec13 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LINEAR;
}), _dec14 = (0, _index.type)(_attribute.CCFloat), _dec15 = (0, _index.rangeStep)(0.01), _dec16 = (0, _index.displayOrder)(4), _dec17 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LINEAR;
}), _dec18 = (0, _index.type)(_attribute.CCFloat), _dec19 = (0, _index.rangeStep)(0.01), _dec20 = (0, _index.displayOrder)(5), _dec21 = (0, _index.visible)(function () {
  return this._type !== _fog.FogType.LINEAR;
}), _dec22 = (0, _index.type)(_attribute.CCFloat), _dec23 = (0, _index.rangeMin)(0.01), _dec24 = (0, _index.rangeStep)(0.01), _dec25 = (0, _index.displayOrder)(6), _dec26 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LAYERED;
}), _dec27 = (0, _index.type)(_attribute.CCFloat), _dec28 = (0, _index.rangeStep)(0.01), _dec29 = (0, _index.displayOrder)(7), _dec30 = (0, _index.visible)(function () {
  return this._type === _fog.FogType.LAYERED;
}), _dec31 = (0, _index.type)(_attribute.CCFloat), _dec32 = (0, _index.rangeStep)(0.01), _dec33 = (0, _index.displayOrder)(8), _dec6(_class7 = (_class8 = (_temp3 = _class9 = class FogInfo {
  constructor() {
    _initializerDefineProperty(this, "_type", _descriptor8, this);

    _initializerDefineProperty(this, "_fogColor", _descriptor9, this);

    _initializerDefineProperty(this, "_enabled", _descriptor10, this);

    _initializerDefineProperty(this, "_fogDensity", _descriptor11, this);

    _initializerDefineProperty(this, "_fogStart", _descriptor12, this);

    _initializerDefineProperty(this, "_fogEnd", _descriptor13, this);

    _initializerDefineProperty(this, "_fogAtten", _descriptor14, this);

    _initializerDefineProperty(this, "_fogTop", _descriptor15, this);

    _initializerDefineProperty(this, "_fogRange", _descriptor16, this);

    this._resource = null;
  }

  /**
   * @zh 是否启用全局雾效
   * @en Enable global fog
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = val;

      if (val) {
        this._resource.type = this._type;
      }
    }
  }

  get enabled() {
    return this._enabled;
  }
  /**
   * @zh 全局雾颜色
   * @en Global fog color
   */


  set fogColor(val) {
    this._fogColor.set(val);

    if (this._resource) {
      this._resource.fogColor = this._fogColor;
    }
  }

  get fogColor() {
    return this._fogColor;
  }
  /**
   * @zh 全局雾类型
   * @en Global fog type
   */


  get type() {
    return this._type;
  }

  set type(val) {
    this._type = val;

    if (this._resource) {
      this._resource.type = val;
    }
  }
  /**
   * @zh 全局雾浓度
   * @en Global fog density
   */


  get fogDensity() {
    return this._fogDensity;
  }

  set fogDensity(val) {
    this._fogDensity = val;

    if (this._resource) {
      this._resource.fogDensity = val;
    }
  }
  /**
   * @zh 雾效起始位置，只适用于线性雾
   * @en Global fog start position, only for linear fog
   */


  get fogStart() {
    return this._fogStart;
  }

  set fogStart(val) {
    this._fogStart = val;

    if (this._resource) {
      this._resource.fogStart = val;
    }
  }
  /**
   * @zh 雾效结束位置，只适用于线性雾
   * @en Global fog end position, only for linear fog
   */


  get fogEnd() {
    return this._fogEnd;
  }

  set fogEnd(val) {
    this._fogEnd = val;

    if (this._resource) {
      this._resource.fogEnd = val;
    }
  }
  /**
   * @zh 雾效衰减
   * @en Global fog attenuation
   */


  get fogAtten() {
    return this._fogAtten;
  }

  set fogAtten(val) {
    this._fogAtten = val;

    if (this._resource) {
      this._resource.fogAtten = val;
    }
  }
  /**
   * @zh 雾效顶部范围，只适用于层级雾
   * @en Global fog top range, only for layered fog
   */


  get fogTop() {
    return this._fogTop;
  }

  set fogTop(val) {
    this._fogTop = val;

    if (this._resource) {
      this._resource.fogTop = val;
    }
  }
  /**
   * @zh 雾效范围，只适用于层级雾
   * @en Global fog range, only for layered fog
   */


  get fogRange() {
    return this._fogRange;
  }

  set fogRange(val) {
    this._fogRange = val;

    if (this._resource) {
      this._resource.fogRange = val;
    }
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);

    this._resource.activate();
  }

}, _class9.FogType = _fog.FogType, _temp3), (_descriptor8 = _applyDecoratedDescriptor(_class8.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _fog.FogType.LINEAR;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class8.prototype, "_fogColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color('#C8C8C8');
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class8.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class8.prototype, "_fogDensity", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.3;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class8.prototype, "_fogStart", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class8.prototype, "_fogEnd", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 300;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class8.prototype, "_fogAtten", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class8.prototype, "_fogTop", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.5;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class8.prototype, "_fogRange", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.2;
  }
}), _applyDecoratedDescriptor(_class8.prototype, "enabled", [_index.editable], Object.getOwnPropertyDescriptor(_class8.prototype, "enabled"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogColor", [_index.editable], Object.getOwnPropertyDescriptor(_class8.prototype, "fogColor"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "type", [_index.editable, _dec7], Object.getOwnPropertyDescriptor(_class8.prototype, "type"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogDensity", [_dec8, _dec9, _dec10, _dec11, _index.slide, _dec12], Object.getOwnPropertyDescriptor(_class8.prototype, "fogDensity"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogStart", [_dec13, _dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class8.prototype, "fogStart"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogEnd", [_dec17, _dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class8.prototype, "fogEnd"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogAtten", [_dec21, _dec22, _dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class8.prototype, "fogAtten"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogTop", [_dec26, _dec27, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class8.prototype, "fogTop"), _class8.prototype), _applyDecoratedDescriptor(_class8.prototype, "fogRange", [_dec30, _dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class8.prototype, "fogRange"), _class8.prototype)), _class8)) || _class7);
/**
 * @en Scene level planar shadow related information
 * @zh 平面阴影相关信息
 */

exports.FogInfo = FogInfo;
let ShadowsInfo = (_dec34 = (0, _index.ccclass)('cc.ShadowsInfo'), _dec35 = (0, _index.type)(_shadows.ShadowType), _dec36 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.Planar;
}), _dec37 = (0, _index.type)(_attribute.CCFloat), _dec38 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.Planar;
}), _dec39 = (0, _index.type)(_shadows.PCFType), _dec40 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec41 = (0, _index.type)(_attribute.CCInteger), _dec42 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec43 = (0, _index.type)(_attribute.CCFloat), _dec44 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec45 = (0, _index.type)(_attribute.CCBoolean), _dec46 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec47 = (0, _index.type)(_attribute.CCBoolean), _dec48 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec49 = (0, _index.type)(_attribute.CCBoolean), _dec50 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec51 = (0, _index.type)(_attribute.CCFloat), _dec52 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._selfShadow === true;
}), _dec53 = (0, _index.type)(_attribute.CCBoolean), _dec54 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap;
}), _dec55 = (0, _index.type)(_attribute.CCFloat), _dec56 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._autoAdapt === false;
}), _dec57 = (0, _index.type)(_attribute.CCFloat), _dec58 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._autoAdapt === false;
}), _dec59 = (0, _index.type)(_attribute.CCFloat), _dec60 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._autoAdapt === false;
}), _dec61 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._autoAdapt === false;
}), _dec62 = (0, _index.type)(_attribute.CCFloat), _dec63 = (0, _index.visible)(function () {
  return this._type === _shadows.ShadowType.ShadowMap && this._autoAdapt === false;
}), _dec34(_class10 = (_class11 = (_temp4 = class ShadowsInfo {
  constructor() {
    _initializerDefineProperty(this, "_type", _descriptor17, this);

    _initializerDefineProperty(this, "_enabled", _descriptor18, this);

    _initializerDefineProperty(this, "_normal", _descriptor19, this);

    _initializerDefineProperty(this, "_distance", _descriptor20, this);

    _initializerDefineProperty(this, "_shadowColor", _descriptor21, this);

    _initializerDefineProperty(this, "_autoAdapt", _descriptor22, this);

    _initializerDefineProperty(this, "_pcf", _descriptor23, this);

    _initializerDefineProperty(this, "_bias", _descriptor24, this);

    _initializerDefineProperty(this, "_packing", _descriptor25, this);

    _initializerDefineProperty(this, "_linear", _descriptor26, this);

    _initializerDefineProperty(this, "_selfShadow", _descriptor27, this);

    _initializerDefineProperty(this, "_normalBias", _descriptor28, this);

    _initializerDefineProperty(this, "_near", _descriptor29, this);

    _initializerDefineProperty(this, "_far", _descriptor30, this);

    _initializerDefineProperty(this, "_aspect", _descriptor31, this);

    _initializerDefineProperty(this, "_orthoSize", _descriptor32, this);

    _initializerDefineProperty(this, "_maxReceived", _descriptor33, this);

    _initializerDefineProperty(this, "_size", _descriptor34, this);

    this._resource = null;
  }

  /**
   * @en Whether activate planar shadow
   * @zh 是否启用平面阴影？
   */
  set enabled(val) {
    if (this._enabled === val) return;
    this._enabled = val;

    if (this._resource) {
      this._resource.enabled = val;

      if (val) {
        this._resource.type = this._type;
      }
    }
  }

  get enabled() {
    return this._enabled;
  }

  set type(val) {
    this._type = val;

    if (this._resource) {
      this._resource.type = val;
    }
  }

  get type() {
    return this._type;
  }
  /**
   * @en Shadow color
   * @zh 阴影颜色
   */


  set shadowColor(val) {
    this._shadowColor.set(val);

    if (this._resource) {
      this._resource.shadowColor = val;
    }
  }

  get shadowColor() {
    return this._shadowColor;
  }
  /**
   * @en The normal of the plane which receives shadow
   * @zh 阴影接收平面的法线
   */


  set normal(val) {
    _index2.Vec3.copy(this._normal, val);

    if (this._resource) {
      this._resource.normal = val;
    }
  }

  get normal() {
    return this._normal;
  }
  /**
   * @en The distance from coordinate origin to the receiving plane.
   * @zh 阴影接收平面与原点的距离
   */


  set distance(val) {
    this._distance = val;

    if (this._resource) {
      this._resource.distance = val;
    }
  }

  get distance() {
    return this._distance;
  }
  /**
   * @en The normal of the plane which receives shadow
   * @zh 阴影接收平面的法线
   */


  set pcf(val) {
    this._pcf = val;

    if (this._resource) {
      this._resource.pcf = val;
    }
  }

  get pcf() {
    return this._pcf;
  }
  /**
   * @en get or set shadow max received
   * @zh 获取或者设置阴影接收的最大光源数量
   */


  set maxReceived(val) {
    this._maxReceived = val;

    if (this._resource) {
      this._resource.maxReceived = val;
    }
  }

  get maxReceived() {
    return this._maxReceived;
  }
  /**
   * @en get or set shadow map sampler offset
   * @zh 获取或者设置阴影纹理偏移值
   */


  set bias(val) {
    this._bias = val;

    if (this._resource) {
      this._resource.bias = val;
    }
  }

  get bias() {
    return this._bias;
  }
  /**
   * @en on or off packing depth.
   * @zh 打开或者关闭深度压缩。降低阴影质量，提高性能。与 liner depth 互斥。
   */


  set packing(val) {
    this._packing = val;

    if (val) {
      this._linear = this._linear ? false : this._linear;

      if (this._resource) {
        this._resource.linear = this._linear;
      }
    }

    if (this._resource) {
      this._resource.packing = val;
      this._resource.shadowMapDirty = true;
    }
  }

  get packing() {
    return this._packing;
  }
  /**
   * @en on or off linear depth.
   * @zh 打开或者关闭线性深度。提高阴影质量，降低性能。与 packing depth 互斥。
   */


  set linear(val) {
    this._linear = val;

    if (val) {
      this._packing = this._packing ? false : this._packing;

      if (this._resource) {
        this._resource.packing = this._packing;
      }
    }

    if (this._resource) {
      this._resource.linear = val;
    }
  }

  get linear() {
    return this._linear;
  }
  /**
   * @en on or off Self-shadowing.
   * @zh 打开或者关闭自阴影。
   */


  set selfShadow(val) {
    this._selfShadow = val;

    if (this._resource) {
      this._resource.selfShadow = val;
    }
  }

  get selfShadow() {
    return this._selfShadow;
  }
  /**
   * @en on or off Self-shadowing.
   * @zh 打开或者关闭自阴影。
   */


  set normalBias(val) {
    this._normalBias = val;

    if (this._resource) {
      this._resource.normalBias = val;
    }
  }

  get normalBias() {
    return this._normalBias;
  }
  /**
   * @en get or set shadow Map sampler auto adapt
   * @zh 阴影纹理生成是否自适应
   */


  set autoAdapt(val) {
    this._autoAdapt = val;

    if (this._resource) {
      this._resource.autoAdapt = val;
    }
  }

  get autoAdapt() {
    return this._autoAdapt;
  }
  /**
   * @en get or set shadow camera near
   * @zh 获取或者设置阴影相机近裁剪面
   */


  set near(val) {
    this._near = val;

    if (this._resource) {
      this._resource.near = val;
    }
  }

  get near() {
    return this._near;
  }
  /**
   * @en get or set shadow camera far
   * @zh 获取或者设置阴影相机远裁剪面
   */


  set far(val) {
    this._far = val;

    if (this._resource) {
      this._resource.far = val;
    }
  }

  get far() {
    return this._far;
  }
  /**
   * @en get or set shadow camera orthoSize
   * @zh 获取或者设置阴影相机正交大小
   */


  set orthoSize(val) {
    this._orthoSize = val;

    if (this._resource) {
      this._resource.orthoSize = val;
    }
  }

  get orthoSize() {
    return this._orthoSize;
  }
  /**
   * @en get or set shadow map size
   * @zh 获取或者设置阴影纹理大小
   */


  set shadowMapSize(val) {
    this._size.set(val);

    if (this._resource) {
      this._resource.size = val;
      this._resource.shadowMapDirty = true;
    }
  }

  get shadowMapSize() {
    return this._size;
  }
  /**
   * @en get or set shadow camera aspect.
   * @zh 获取或者设置阴影相机的宽高比。
   */


  set aspect(val) {
    this._aspect = val;

    if (this._resource) {
      this._resource.aspect = val;
    }
  }

  get aspect() {
    return this._aspect;
  }
  /**
   * @en Set plane which receives shadow with the given node's world transformation
   * @zh 根据指定节点的世界变换设置阴影接收平面的信息
   * @param node The node for setting up the plane
   */


  setPlaneFromNode(node) {
    node.getWorldRotation(_qt);
    this.normal = _index2.Vec3.transformQuat(_v3, _up, _qt);
    node.getWorldPosition(_v3);
    this.distance = _index2.Vec3.dot(this._normal, _v3);
  }

  activate(resource) {
    this._resource = resource;

    this._resource.initialize(this);

    this._resource.activate();
  }

}, _temp4), (_descriptor17 = _applyDecoratedDescriptor(_class11.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _shadows.ShadowType.Planar;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class11.prototype, "_enabled", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class11.prototype, "_normal", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(0, 1, 0);
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class11.prototype, "_distance", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class11.prototype, "_shadowColor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(0, 0, 0, 76);
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class11.prototype, "_autoAdapt", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class11.prototype, "_pcf", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _shadows.PCFType.HARD;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class11.prototype, "_bias", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.00001;
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class11.prototype, "_packing", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class11.prototype, "_linear", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class11.prototype, "_selfShadow", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class11.prototype, "_normalBias", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.0;
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class11.prototype, "_near", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class11.prototype, "_far", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 30;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class11.prototype, "_aspect", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class11.prototype, "_orthoSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class11.prototype, "_maxReceived", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 4;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class11.prototype, "_size", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec2(512, 512);
  }
}), _applyDecoratedDescriptor(_class11.prototype, "enabled", [_index.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "enabled"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "type", [_index.editable, _dec35], Object.getOwnPropertyDescriptor(_class11.prototype, "type"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowColor", [_index.editable], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowColor"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normal", [_dec36], Object.getOwnPropertyDescriptor(_class11.prototype, "normal"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "distance", [_dec37, _dec38], Object.getOwnPropertyDescriptor(_class11.prototype, "distance"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "pcf", [_dec39, _dec40], Object.getOwnPropertyDescriptor(_class11.prototype, "pcf"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "maxReceived", [_dec41, _dec42], Object.getOwnPropertyDescriptor(_class11.prototype, "maxReceived"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "bias", [_dec43, _dec44], Object.getOwnPropertyDescriptor(_class11.prototype, "bias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "packing", [_dec45, _dec46], Object.getOwnPropertyDescriptor(_class11.prototype, "packing"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "linear", [_dec47, _dec48], Object.getOwnPropertyDescriptor(_class11.prototype, "linear"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "selfShadow", [_dec49, _dec50], Object.getOwnPropertyDescriptor(_class11.prototype, "selfShadow"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "normalBias", [_dec51, _dec52], Object.getOwnPropertyDescriptor(_class11.prototype, "normalBias"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "autoAdapt", [_dec53, _dec54], Object.getOwnPropertyDescriptor(_class11.prototype, "autoAdapt"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "near", [_dec55, _dec56], Object.getOwnPropertyDescriptor(_class11.prototype, "near"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "far", [_dec57, _dec58], Object.getOwnPropertyDescriptor(_class11.prototype, "far"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "orthoSize", [_dec59, _dec60], Object.getOwnPropertyDescriptor(_class11.prototype, "orthoSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "shadowMapSize", [_dec61], Object.getOwnPropertyDescriptor(_class11.prototype, "shadowMapSize"), _class11.prototype), _applyDecoratedDescriptor(_class11.prototype, "aspect", [_dec62, _dec63], Object.getOwnPropertyDescriptor(_class11.prototype, "aspect"), _class11.prototype)), _class11)) || _class10);
exports.ShadowsInfo = ShadowsInfo;
_globalExports.legacyCC.ShadowsInfo = ShadowsInfo;
/**
 * @en All scene related global parameters, it affects all content in the corresponding scene
 * @zh 各类场景级别的渲染参数，将影响全场景的所有物体
 */

let SceneGlobals = (_dec64 = (0, _index.ccclass)('cc.SceneGlobals'), _dec65 = (0, _index.type)(SkyboxInfo), _dec64(_class13 = (_class14 = (_temp5 = class SceneGlobals {
  constructor() {
    _initializerDefineProperty(this, "ambient", _descriptor35, this);

    _initializerDefineProperty(this, "shadows", _descriptor36, this);

    _initializerDefineProperty(this, "_skybox", _descriptor37, this);

    _initializerDefineProperty(this, "fog", _descriptor38, this);
  }

  /**
   * @en Skybox related information
   * @zh 天空盒相关信息
   */
  get skybox() {
    return this._skybox;
  }

  set skybox(value) {
    this._skybox = value;
  }

  activate() {
    const sceneData = _globalExports.legacyCC.director.root.pipeline.pipelineSceneData;
    this.ambient.activate(sceneData.ambient);
    this.skybox.activate(sceneData.skybox);
    this.shadows.activate(sceneData.shadows);
    this.fog.activate(sceneData.fog);
  }

}, _temp5), (_descriptor35 = _applyDecoratedDescriptor(_class14.prototype, "ambient", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new AmbientInfo();
  }
}), _descriptor36 = _applyDecoratedDescriptor(_class14.prototype, "shadows", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new ShadowsInfo();
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class14.prototype, "_skybox", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new SkyboxInfo();
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class14.prototype, "fog", [_index.editable, _index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new FogInfo();
  }
}), _applyDecoratedDescriptor(_class14.prototype, "skybox", [_index.editable, _dec65], Object.getOwnPropertyDescriptor(_class14.prototype, "skybox"), _class14.prototype)), _class14)) || _class13);
exports.SceneGlobals = SceneGlobals;
_globalExports.legacyCC.SceneGlobals = SceneGlobals;