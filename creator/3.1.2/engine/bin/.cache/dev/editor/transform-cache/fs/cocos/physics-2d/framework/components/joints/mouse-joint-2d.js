"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _index = require("../../../../core/index.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let MouseJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.MouseJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/MouseJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class MouseJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.MOUSE;

    _initializerDefineProperty(this, "_maxForce", _descriptor, this);

    _initializerDefineProperty(this, "_dampingRatio", _descriptor2, this);

    _initializerDefineProperty(this, "_frequency", _descriptor3, this);

    this._target = new _index.Vec2();
  }

  get target() {
    return this._target;
  }

  set target(v) {
    this._target = v;

    if (this._joint) {
      this._joint.setTarget(v);
    }
  }
  /**
   * @en
   * The spring frequency.
   * @zh
   * 弹簧系数。
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
  }
  /**
   * @en
   * The maximum force
   * @zh
   * 最大阻力值
   */


  get maxForce() {
    return this._maxForce;
  }

  set maxForce(v) {
    this._maxForce = v;

    if (this._joint) {
      this._joint.setMaxForce(v);
    }
  }

  update(dt) {
    this._joint.update(dt);
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "frequency", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "frequency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dampingRatio", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "dampingRatio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxForce", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxForce"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_maxForce", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_dampingRatio", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.7;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_frequency", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
})), _class2)) || _class) || _class);
exports.MouseJoint2D = MouseJoint2D;