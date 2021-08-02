"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packGradientRange = packGradientRange;
exports.default = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/value-types/index.js");

var _gradient = _interopRequireWildcard(require("./gradient.js"));

var _index4 = require("../../core/index.js");

var _assetEnum = require("../../core/assets/asset-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const SerializableTable = _internal253Aconstants.EDITOR && [['_mode', 'color'], ['_mode', 'gradient'], ['_mode', 'colorMin', 'colorMax'], ['_mode', 'gradientMin', 'gradientMax'], ['_mode', 'gradient']];
const Mode = (0, _index3.Enum)({
  Color: 0,
  Gradient: 1,
  TwoColors: 2,
  TwoGradients: 3,
  RandomColor: 4
});
let GradientRange = (_dec = (0, _index.ccclass)('cc.GradientRange'), _dec2 = (0, _index.type)(Mode), _dec3 = (0, _index.type)(_gradient.default), _dec4 = (0, _index.type)(_gradient.default), _dec5 = (0, _index.type)(_gradient.default), _dec6 = (0, _index.type)(Mode), _dec(_class = (_class2 = (_temp = _class3 = class GradientRange {
  constructor() {
    _initializerDefineProperty(this, "color", _descriptor, this);

    _initializerDefineProperty(this, "colorMin", _descriptor2, this);

    _initializerDefineProperty(this, "colorMax", _descriptor3, this);

    _initializerDefineProperty(this, "gradient", _descriptor4, this);

    _initializerDefineProperty(this, "gradientMin", _descriptor5, this);

    _initializerDefineProperty(this, "gradientMax", _descriptor6, this);

    _initializerDefineProperty(this, "_mode", _descriptor7, this);

    this._color = _index2.Color.WHITE.clone();
  }

  /**
   * @zh 渐变色类型 [[Mode]]。
   */
  get mode() {
    return this._mode;
  }

  set mode(m) {
    if (_internal253Aconstants.EDITOR) {
      if (m === Mode.RandomColor) {
        if (this.gradient.colorKeys.length === 0) {
          this.gradient.colorKeys.push(new _gradient.ColorKey());
        }

        if (this.gradient.alphaKeys.length === 0) {
          this.gradient.alphaKeys.push(new _gradient.AlphaKey());
        }
      }
    }

    this._mode = m;
  }

  evaluate(time, rndRatio) {
    switch (this._mode) {
      case Mode.Color:
        return this.color;

      case Mode.TwoColors:
        _index2.Color.lerp(this._color, this.colorMin, this.colorMax, rndRatio);

        return this._color;

      case Mode.RandomColor:
        return this.gradient.randomColor();

      case Mode.Gradient:
        return this.gradient.evaluate(time);

      case Mode.TwoGradients:
        _index2.Color.lerp(this._color, this.gradientMin.evaluate(time), this.gradientMax.evaluate(time), rndRatio);

        return this._color;

      default:
        return this.color;
    }
  }

  _onBeforeSerialize(props) {
    return SerializableTable[this._mode];
  }

}, _class3.Mode = Mode, _temp), (_applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "colorMin", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colorMax", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gradient", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradient.default();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gradientMin", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradient.default();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gradientMax", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _gradient.default();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Mode.Color;
  }
})), _class2)) || _class);
exports.default = GradientRange;

function evaluateGradient(gr, time, index) {
  switch (gr.mode) {
    case Mode.Color:
      return gr.color;

    case Mode.TwoColors:
      return index === 0 ? gr.colorMin : gr.colorMax;

    case Mode.RandomColor:
      return gr.gradient.randomColor();

    case Mode.Gradient:
      return gr.gradient.evaluate(time);

    case Mode.TwoGradients:
      return index === 0 ? gr.gradientMin.evaluate(time) : gr.gradientMax.evaluate(time);

    default:
      return gr.color;
  }
}

function evaluateHeight(gr) {
  switch (gr.mode) {
    case Mode.TwoColors:
      return 2;

    case Mode.TwoGradients:
      return 2;

    default:
      return 1;
  }
}

function packGradientRange(samples, gr) {
  const height = evaluateHeight(gr);
  const data = new Uint8Array(samples * height * 4);
  const interval = 1.0 / (samples - 1);
  let offset = 0;

  for (let h = 0; h < height; h++) {
    for (let j = 0; j < samples; j++) {
      const color = evaluateGradient(gr, interval * j, h);
      data[offset] = color.r;
      data[offset + 1] = color.g;
      data[offset + 2] = color.b;
      data[offset + 3] = color.a;
      offset += 4;
    }
  }

  const texture = new _index4.Texture2D();
  texture.create(samples, height, _assetEnum.PixelFormat.RGBA8888);
  texture.setFilters(_assetEnum.Filter.LINEAR, _assetEnum.Filter.LINEAR);
  texture.setWrapMode(_assetEnum.WrapMode.CLAMP_TO_EDGE, _assetEnum.WrapMode.CLAMP_TO_EDGE);
  texture.uploadData(data);
  return texture;
}