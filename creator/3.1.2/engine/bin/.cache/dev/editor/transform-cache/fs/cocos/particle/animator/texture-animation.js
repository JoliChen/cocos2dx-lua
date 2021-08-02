"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/value-types/index.js");

var _particle = require("../particle.js");

var _curveRange = _interopRequireDefault(require("./curve-range.js"));

var _enum = require("../enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const TEXTURE_ANIMATION_RAND_OFFSET = _enum.ModuleRandSeed.TEXTURE;
/**
 * 粒子贴图动画类型。
 * @enum textureAnimationModule.Mode
 */

const Mode = (0, _index3.Enum)({
  /**
   * 网格类型。
   */
  Grid: 0
  /**
   * 精灵类型（暂未支持）。
   */
  // Sprites: 1,

});
/**
 * 贴图动画的播放方式。
 * @enum textureAnimationModule.Animation
 */

const Animation = (0, _index3.Enum)({
  /**
   * 播放贴图中的所有帧。
   */
  WholeSheet: 0,

  /**
   * 播放贴图中的其中一行动画。
   */
  SingleRow: 1
});
let TextureAnimationModule = (_dec = (0, _index.ccclass)('cc.TextureAnimationModule'), _dec2 = (0, _index.formerlySerializedAs)('numTilesX'), _dec3 = (0, _index.formerlySerializedAs)('numTilesY'), _dec4 = (0, _index.displayOrder)(0), _dec5 = (0, _index.type)(Mode), _dec6 = (0, _index.type)(Mode), _dec7 = (0, _index.displayOrder)(1), _dec8 = (0, _index.tooltip)('i18n:textureAnimationModule.mode'), _dec9 = (0, _index.displayOrder)(2), _dec10 = (0, _index.tooltip)('i18n:textureAnimationModule.numTilesX'), _dec11 = (0, _index.displayOrder)(3), _dec12 = (0, _index.tooltip)('i18n:textureAnimationModule.numTilesY'), _dec13 = (0, _index.type)(Animation), _dec14 = (0, _index.displayOrder)(4), _dec15 = (0, _index.tooltip)('i18n:textureAnimationModule.animation'), _dec16 = (0, _index.type)(_curveRange.default), _dec17 = (0, _index.displayOrder)(7), _dec18 = (0, _index.tooltip)('i18n:textureAnimationModule.frameOverTime'), _dec19 = (0, _index.type)(_curveRange.default), _dec20 = (0, _index.displayOrder)(8), _dec21 = (0, _index.tooltip)('i18n:textureAnimationModule.startFrame'), _dec22 = (0, _index.displayOrder)(9), _dec23 = (0, _index.tooltip)('i18n:textureAnimationModule.cycleCount'), _dec24 = (0, _index.displayOrder)(5), _dec25 = (0, _index.tooltip)('i18n:textureAnimationModule.randomRow'), _dec26 = (0, _index.displayOrder)(6), _dec27 = (0, _index.tooltip)('i18n:textureAnimationModule.rowIndex'), _dec(_class = (_class2 = (_temp = class TextureAnimationModule extends _particle.ParticleModuleBase {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "_numTilesX", _descriptor2, this);

    _initializerDefineProperty(this, "_numTilesY", _descriptor3, this);

    _initializerDefineProperty(this, "_mode", _descriptor4, this);

    _initializerDefineProperty(this, "animation", _descriptor5, this);

    _initializerDefineProperty(this, "frameOverTime", _descriptor6, this);

    _initializerDefineProperty(this, "startFrame", _descriptor7, this);

    _initializerDefineProperty(this, "cycleCount", _descriptor8, this);

    _initializerDefineProperty(this, "_flipU", _descriptor9, this);

    _initializerDefineProperty(this, "_flipV", _descriptor10, this);

    _initializerDefineProperty(this, "_uvChannelMask", _descriptor11, this);

    _initializerDefineProperty(this, "randomRow", _descriptor12, this);

    _initializerDefineProperty(this, "rowIndex", _descriptor13, this);

    this.name = _particle.PARTICLE_MODULE_NAME.TEXTURE;
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
    this.target.updateMaterialParams();
    this.target.enableModule(this.name, val, this);
  }

  /**
   * @zh 设定粒子贴图动画的类型（暂只支持 Grid 模式）[[Mode]]。
   */
  get mode() {
    return this._mode;
  }

  set mode(val) {
    if (val !== Mode.Grid) {
      console.error('particle texture animation\'s sprites is not supported!');
    }
  }
  /**
   * @zh X 方向动画帧数。
   */


  get numTilesX() {
    return this._numTilesX;
  }

  set numTilesX(val) {
    if (this._numTilesX !== val) {
      this._numTilesX = val;
      this.target.updateMaterialParams();
    }
  }
  /**
   * @zh Y 方向动画帧数。
   */


  get numTilesY() {
    return this._numTilesY;
  }

  set numTilesY(val) {
    if (this._numTilesY !== val) {
      this._numTilesY = val;
      this.target.updateMaterialParams();
    }
  }
  /**
   * @zh 动画播放方式 [[Animation]]。
   */


  /**
   * @ignore
   */
  get flipU() {
    return this._flipU;
  }

  set flipU(val) {
    console.error('particle texture animation\'s flipU is not supported!');
  }

  get flipV() {
    return this._flipV;
  }

  set flipV(val) {
    console.error('particle texture animation\'s flipV is not supported!');
  }

  get uvChannelMask() {
    return this._uvChannelMask;
  }

  set uvChannelMask(val) {
    console.error('particle texture animation\'s uvChannelMask is not supported!');
  }
  /**
   * @zh 随机从动画贴图中选择一行以生成动画。<br>
   * 此选项仅在动画播放方式为 SingleRow 时生效。
   */


  init(p) {
    p.startRow = Math.floor(Math.random() * this.numTilesY);
  }

  animate(p, dt) {
    const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    const startFrame = this.startFrame.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);

    if (this.animation === Animation.WholeSheet) {
      p.frameIndex = (0, _index2.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
    } else if (this.animation === Animation.SingleRow) {
      const rowLength = 1 / this.numTilesY;

      if (this.randomRow) {
        const f = (0, _index2.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
        const from = p.startRow * rowLength;
        const to = from + rowLength;
        p.frameIndex = (0, _index2.lerp)(from, to, f);
      } else {
        const from = this.rowIndex * rowLength;
        const to = from + rowLength;
        p.frameIndex = (0, _index2.lerp)(from, to, (0, _index2.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _index2.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
      }
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_numTilesX", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_numTilesY", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Mode.Grid;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "numTilesX", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "numTilesX"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "numTilesY", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "numTilesY"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec13, _index.serializable, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Animation.WholeSheet;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "frameOverTime", [_dec16, _index.serializable, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "startFrame", [_dec19, _index.serializable, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cycleCount", [_index.serializable, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_flipU", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_flipV", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_uvChannelMask", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return -1;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "randomRow", [_index.serializable, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rowIndex", [_index.serializable, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.default = TextureAnimationModule;