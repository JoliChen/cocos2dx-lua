"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let FixedJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.FixedJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/FixedJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class FixedJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.FIXED;

    _initializerDefineProperty(this, "_frequency", _descriptor, this);

    _initializerDefineProperty(this, "_dampingRatio", _descriptor2, this);
  }

  /**
   * @en
   * The frequency.
   * @zh
   * 弹性系数。
   */
  get frequency() {
    return this._frequency;
  }

  set frequency(v) {
    this._frequency = v;

    if (this._joint) {
      this._joint.setFrequency(v);
    }
  }
  /**
   * @en
   * The damping ratio.
   * @zh
   * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
   */


  get dampingRatio() {
    return this._dampingRatio;
  }

  set dampingRatio(v) {
    this._dampingRatio = v;

    if (this._joint) {
      this._joint.setDampingRatio(v);
    }
  } /// private properties


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "frequency", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "frequency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dampingRatio", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "dampingRatio"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_frequency", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.7;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dampingRatio", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
})), _class2)) || _class) || _class);
exports.FixedJoint2D = FixedJoint2D;