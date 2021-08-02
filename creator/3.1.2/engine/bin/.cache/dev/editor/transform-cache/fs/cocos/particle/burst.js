"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/math/index.js");

var _curveRange = _interopRequireDefault(require("./animator/curve-range.js"));

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Burst = (_dec = (0, _index.ccclass)('cc.Burst'), _dec2 = (0, _index.type)(_curveRange.default), _dec(_class = (_class2 = (_temp = class Burst {
  /**
   * @zh 粒子系统开始运行到触发此次 Brust 的时间。
   */
  get time() {
    return this._time;
  }

  set time(val) {
    this._time = val;
    this._curTime = val;
  }

  /**
   * @zh Burst 的触发次数。
   */
  get repeatCount() {
    return this._repeatCount;
  }

  set repeatCount(val) {
    this._repeatCount = val;
    this._remainingCount = val;
  }
  /**
   * @zh 每次触发的间隔时间。
   */


  constructor() {
    _initializerDefineProperty(this, "_time", _descriptor, this);

    _initializerDefineProperty(this, "_repeatCount", _descriptor2, this);

    _initializerDefineProperty(this, "repeatInterval", _descriptor3, this);

    _initializerDefineProperty(this, "count", _descriptor4, this);

    this._remainingCount = void 0;
    this._curTime = void 0;
    this._remainingCount = 0;
    this._curTime = 0.0;
  }

  update(psys, dt) {
    if (this._remainingCount === 0) {
      this._remainingCount = this._repeatCount;
      this._curTime = this._time;
    }

    if (this._remainingCount > 0) {
      let preFrameTime = (0, _index2.repeat)(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
      preFrameTime = preFrameTime > 0.0 ? preFrameTime : 0.0;
      const curFrameTime = (0, _index2.repeat)(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);

      if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
        psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
        this._curTime += this.repeatInterval;
        --this._remainingCount;
      }
    }
  }

  getMaxCount(psys) {
    return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_time", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "time", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "time"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_repeatCount", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "repeatCount", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "repeatCount"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "repeatInterval", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _curveRange.default();
  }
})), _class2)) || _class);
exports.default = Burst;