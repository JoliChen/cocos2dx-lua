"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AlphaKey = exports.ColorKey = void 0;

var _index = require("../../core/data/decorators/index.js");

var _index2 = require("../../core/math/index.js");

var _index3 = require("../../core/value-types/index.js");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2, _dec3, _class7, _class8, _descriptor5, _descriptor6, _descriptor7, _class9, _temp3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const Mode = (0, _index3.Enum)({
  Blend: 0,
  Fixed: 1
});
let ColorKey = (_dec = (0, _index.ccclass)('cc.ColorKey'), _dec(_class = (_class2 = (_temp = class ColorKey {
  constructor() {
    _initializerDefineProperty(this, "color", _descriptor, this);

    _initializerDefineProperty(this, "time", _descriptor2, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _index2.Color.WHITE.clone();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class);
exports.ColorKey = ColorKey;
let AlphaKey = (_dec2 = (0, _index.ccclass)('cc.AlphaKey'), _dec2(_class4 = (_class5 = (_temp2 = class AlphaKey {
  constructor() {
    _initializerDefineProperty(this, "alpha", _descriptor3, this);

    _initializerDefineProperty(this, "time", _descriptor4, this);
  }

}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "alpha", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "time", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class5)) || _class4);
exports.AlphaKey = AlphaKey;
let Gradient = (_dec3 = (0, _index.ccclass)('cc.Gradient'), _dec3(_class7 = (_class8 = (_temp3 = _class9 = class Gradient {
  /**
   * @en Array of color key.
   * @zh 颜色关键帧列表。
   */

  /**
   * @en Array of alpha key.
   * @zh 透明度关键帧列表。
   */

  /**
   * @en Blend mode.
   * @zh 混合模式。
   */
  constructor() {
    _initializerDefineProperty(this, "colorKeys", _descriptor5, this);

    _initializerDefineProperty(this, "alphaKeys", _descriptor6, this);

    _initializerDefineProperty(this, "mode", _descriptor7, this);

    this._color = void 0;
    this._color = _index2.Color.WHITE.clone();
  }

  setKeys(colorKeys, alphaKeys) {
    this.colorKeys = colorKeys;
    this.alphaKeys = alphaKeys;
  }

  sortKeys() {
    if (this.colorKeys.length > 1) {
      this.colorKeys.sort((a, b) => a.time - b.time);
    }

    if (this.alphaKeys.length > 1) {
      this.alphaKeys.sort((a, b) => a.time - b.time);
    }
  }

  evaluate(time) {
    this.getRGB(time);

    this._color._set_a_unsafe(this.getAlpha(time));

    return this._color;
  }

  randomColor() {
    const c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
    const a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];

    this._color.set(c.color);

    this._color._set_a_unsafe(a.alpha);

    return this._color;
  }

  getRGB(time) {
    if (this.colorKeys.length > 1) {
      time = (0, _index2.repeat)(time, 1);

      for (let i = 1; i < this.colorKeys.length; ++i) {
        const preTime = this.colorKeys[i - 1].time;
        const curTime = this.colorKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.colorKeys[i].color;
          }

          const factor = (time - preTime) / (curTime - preTime);

          _index2.Color.lerp(this._color, this.colorKeys[i - 1].color, this.colorKeys[i].color, factor);

          return this._color;
        }
      }

      const lastIndex = this.colorKeys.length - 1;

      if (time < this.colorKeys[0].time) {
        _index2.Color.lerp(this._color, _index2.Color.BLACK, this.colorKeys[0].color, time / this.colorKeys[0].time);
      } else if (time > this.colorKeys[lastIndex].time) {
        _index2.Color.lerp(this._color, this.colorKeys[lastIndex].color, _index2.Color.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time));
      } // console.warn('something went wrong. can not get gradient color.');

    } else if (this.colorKeys.length === 1) {
      this._color.set(this.colorKeys[0].color);

      return this._color;
    } else {
      this._color.set(_index2.Color.WHITE);

      return this._color;
    }
  }

  getAlpha(time) {
    if (this.alphaKeys.length > 1) {
      time = (0, _index2.repeat)(time, 1);

      for (let i = 1; i < this.alphaKeys.length; ++i) {
        const preTime = this.alphaKeys[i - 1].time;
        const curTime = this.alphaKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.alphaKeys[i].alpha;
          }

          const factor = (time - preTime) / (curTime - preTime);
          return (0, _index2.lerp)(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
        }
      }

      const lastIndex = this.alphaKeys.length - 1;

      if (time < this.alphaKeys[0].time) {
        return (0, _index2.lerp)(255, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
      } else if (time > this.alphaKeys[lastIndex].time) {
        return (0, _index2.lerp)(this.alphaKeys[lastIndex].alpha, 255, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
      }
    } else if (this.alphaKeys.length === 1) {
      return this.alphaKeys[0].alpha;
    } else {
      return 255;
    }
  }

}, _class9.Mode = Mode, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "colorKeys", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Array();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "alphaKeys", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new Array();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "mode", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Mode.Blend;
  }
})), _class8)) || _class7);
exports.default = Gradient;