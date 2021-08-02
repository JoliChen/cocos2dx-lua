"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packCurveRangeZ = packCurveRangeZ;
exports.packCurveRangeN = packCurveRangeN;
exports.packCurveRangeXY = packCurveRangeXY;
exports.packCurveRangeXYZ = packCurveRangeXYZ;
exports.packCurveRangeXYZW = packCurveRangeXYZW;
exports.default = exports.Mode = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/value-types/index.js");

var _index4 = require("../../core/geometry/index.js");

var _index5 = require("../../core/index.js");

var _assetEnum = require("../../core/assets/asset-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const SerializableTable = _internal253Aconstants.EDITOR && [['mode', 'constant', 'multiplier'], ['mode', 'curve', 'multiplier'], ['mode', 'curveMin', 'curveMax', 'multiplier'], ['mode', 'constantMin', 'constantMax', 'multiplier']];
const Mode = (0, _index3.Enum)({
  Constant: 0,
  Curve: 1,
  TwoCurves: 2,
  TwoConstants: 3
});
exports.Mode = Mode;
let CurveRange = (_dec = (0, _index.ccclass)('cc.CurveRange'), _dec2 = (0, _index.type)(Mode), _dec3 = (0, _index.type)(_index4.AnimationCurve), _dec4 = (0, _index.type)(_index4.AnimationCurve), _dec5 = (0, _index.type)(_index4.AnimationCurve), _dec(_class = (_class2 = (_temp = _class3 = class CurveRange {
  /**
   * @zh 曲线类型[[Mode]]。
   */

  /**
   * @zh 当mode为Curve时，使用的曲线。
   */

  /**
   * @zh 当mode为TwoCurves时，使用的曲线下限。
   */

  /**
   * @zh 当mode为TwoCurves时，使用的曲线上限。
   */

  /**
   * @zh 当mode为Constant时，曲线的值。
   */

  /**
   * @zh 当mode为TwoConstants时，曲线的上限。
   */

  /**
   * @zh 当mode为TwoConstants时，曲线的下限。
   */

  /**
   * @zh 应用于曲线插值的系数。
   */
  constructor() {
    _initializerDefineProperty(this, "mode", _descriptor, this);

    _initializerDefineProperty(this, "curve", _descriptor2, this);

    _initializerDefineProperty(this, "curveMin", _descriptor3, this);

    _initializerDefineProperty(this, "curveMax", _descriptor4, this);

    _initializerDefineProperty(this, "constant", _descriptor5, this);

    _initializerDefineProperty(this, "constantMin", _descriptor6, this);

    _initializerDefineProperty(this, "constantMax", _descriptor7, this);

    _initializerDefineProperty(this, "multiplier", _descriptor8, this);
  }

  evaluate(time, rndRatio) {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.curve.evaluate(time) * this.multiplier;

      case Mode.TwoCurves:
        return (0, _index2.lerp)(this.curveMin.evaluate(time), this.curveMax.evaluate(time), rndRatio) * this.multiplier;

      case Mode.TwoConstants:
        return (0, _index2.lerp)(this.constantMin, this.constantMax, rndRatio);
    }
  }

  getMax() {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.multiplier;

      case Mode.TwoConstants:
        return this.constantMax;

      case Mode.TwoCurves:
        return this.multiplier;
    }

    return 0;
  }

  _onBeforeSerialize(props) {
    return SerializableTable[this.mode];
  }

}, _class3.Mode = Mode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Mode.Constant;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "curve", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.AnimationCurve();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "curveMin", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.AnimationCurve();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "curveMax", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.AnimationCurve();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "constant", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "constantMin", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "constantMax", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "multiplier", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
})), _class2)) || _class);
exports.default = CurveRange;

function evaluateCurve(cr, time, index) {
  switch (cr.mode) {
    case Mode.Constant:
      return cr.constant;

    case Mode.Curve:
      return cr.curve.evaluate(time) * cr.multiplier;

    case Mode.TwoCurves:
      return index === 0 ? cr.curveMin.evaluate(time) * cr.multiplier : cr.curveMax.evaluate(time) * cr.multiplier;

    case Mode.TwoConstants:
      return index === 0 ? cr.constantMin : cr.constantMax;

    default:
      return 0;
  }
}

function evaluateHeight(cr) {
  switch (cr.mode) {
    case Mode.TwoConstants:
      return 2;

    case Mode.TwoCurves:
      return 2;

    default:
      return 1;
  }
}

function packTexture(data, width, height) {
  const image = new _index5.ImageAsset({
    width,
    height,
    _data: data,
    _compressed: false,
    format: _assetEnum.PixelFormat.RGBA32F
  });
  const texture = new _index5.Texture2D();
  texture.setFilters(_assetEnum.Filter.NEAREST, _assetEnum.Filter.NEAREST);
  texture.setMipFilter(_assetEnum.Filter.NONE);
  texture.setWrapMode(_assetEnum.WrapMode.CLAMP_TO_EDGE, _assetEnum.WrapMode.CLAMP_TO_EDGE, _assetEnum.WrapMode.CLAMP_TO_EDGE);
  texture.image = image;
  return texture;
}

function packCurveRangeZ(samples, cr, discrete) {
  const height = evaluateHeight(cr);
  const data = new Float32Array(samples * height * 4);
  const interval = 1.0 / (samples - 1);
  let sum = 0;
  let average = 0;
  let offset = 0;

  for (let h = 0; h < height; h++) {
    sum = 0;

    for (let j = 0; j < samples; j++) {
      const value = evaluateCurve(cr, interval * j, h);

      if (discrete) {
        average = value;
      } else {
        sum += value;
        average = sum / (j + 1);
      }

      data[offset + 2] = value;
      offset += 4;
    }
  }

  return packTexture(data, samples, height);
}

function packCurveRangeN(samples, cr, discrete) {
  const height = evaluateHeight(cr);
  const data = new Float32Array(samples * height * 4);
  const interval = 1.0 / (samples - 1);
  let sum = 0;
  let average = 0;
  let offset = 0;

  for (let h = 0; h < height; h++) {
    sum = 0;

    for (let j = 0; j < samples; j++) {
      const value = evaluateCurve(cr, interval * j, h);

      if (discrete) {
        average = value;
      } else {
        sum += value;
        average = sum / (j + 1);
      }

      data[offset] = average;
      data[offset + 1] = average;
      data[offset + 2] = average;
      offset += 4;
    }
  }

  return packTexture(data, samples, height);
}

function packCurveRangeXY(samples, x, y, discrete) {
  const height = Math.max(evaluateHeight(x), evaluateHeight(y));
  const data = new Float32Array(samples * height * 4);
  const curves = [x, y];
  const interval = 1.0 / (samples - 1);

  for (let h = 0; h < height; h++) {
    for (let i = 0; i < 2; i++) {
      const cr = curves[i];
      let sum = 0;
      let average = 0;

      for (let j = 0; j < samples; j++) {
        const value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}

function packCurveRangeXYZ(samples, x, y, z, discrete) {
  const height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z));
  const data = new Float32Array(samples * height * 4);
  const curves = [x, y, z];
  const interval = 1.0 / (samples - 1);

  for (let h = 0; h < height; h++) {
    for (let i = 0; i < 3; i++) {
      const cr = curves[i];
      let sum = 0;
      let average = 0;

      for (let j = 0; j < samples; j++) {
        const value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}

function packCurveRangeXYZW(samples, x, y, z, w, discrete) {
  const height = Math.max(evaluateHeight(x), evaluateHeight(y), evaluateHeight(z), evaluateHeight(w));
  const data = new Float32Array(samples * height * 4);
  const curves = [x, y, z, w];
  const interval = 1.0 / (samples - 1);

  for (let h = 0; h < height; h++) {
    for (let i = 0; i < 4; i++) {
      const cr = curves[i];
      let sum = 0;
      let average = 0;

      for (let j = 0; j < samples; j++) {
        const value = evaluateCurve(cr, interval * j, h);

        if (discrete) {
          average = value;
        } else {
          sum += value;
          average = sum / (j + 1);
        }

        data[j * 4 + i] = average;
      }
    }
  }

  return packTexture(data, samples, height);
}