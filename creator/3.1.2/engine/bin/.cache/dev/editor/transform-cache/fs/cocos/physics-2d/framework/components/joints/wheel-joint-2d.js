"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let WheelJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.WheelJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/WheelJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class WheelJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.WHEEL;

    _initializerDefineProperty(this, "_angle", _descriptor, this);

    _initializerDefineProperty(this, "_enableMotor", _descriptor2, this);

    _initializerDefineProperty(this, "_maxMotorTorque", _descriptor3, this);

    _initializerDefineProperty(this, "_motorSpeed", _descriptor4, this);

    _initializerDefineProperty(this, "_frequency", _descriptor5, this);

    _initializerDefineProperty(this, "_dampingRatio", _descriptor6, this);
  }

  /**
   * @en Wheel susspension direction
   * @zh 轮子震动方向
   */
  get angle() {
    return this._angle;
  }

  set angle(v) {
    this._angle = v;
  }
  /**
   * @en
   * Enable joint motor?
   * @zh
   * 是否开启关节马达？
   */


  get enableMotor() {
    return this._enableMotor;
  }

  set enableMotor(v) {
    this._enableMotor = v;

    if (this._joint) {
      this._joint.enableMotor(v);
    }
  }
  /**
   * @en
   * The maxium torque can be applied to rigidbody to rearch the target motor speed.
   * @zh
   * 可以施加到刚体的最大扭矩。
   */


  get maxMotorTorque() {
    return this._maxMotorTorque;
  }

  set maxMotorTorque(v) {
    this._maxMotorTorque = v;

    if (this._joint) {
      this._joint.setMaxMotorTorque(v);
    }
  }
  /**
   * @en
   * The expected motor speed.
   * @zh
   * 期望的马达速度。
   */


  get motorSpeed() {
    return this._motorSpeed;
  }

  set motorSpeed(v) {
    this._motorSpeed = v;

    if (this._joint) {
      this._joint.setMotorSpeed(v);
    }
  }
  /**
   * @en
   * The spring frequency.
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


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "angle", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableMotor", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableMotor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxMotorTorque", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxMotorTorque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "motorSpeed", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "motorSpeed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "frequency", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "frequency"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "dampingRatio", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "dampingRatio"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_angle", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 90;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enableMotor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_maxMotorTorque", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_motorSpeed", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_frequency", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_dampingRatio", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.7;
  }
})), _class2)) || _class) || _class);
exports.WheelJoint2D = WheelJoint2D;