"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HingeJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let HingeJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.HingeJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/HingeJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class HingeJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.HINGE;

    _initializerDefineProperty(this, "_enableLimit", _descriptor, this);

    _initializerDefineProperty(this, "_lowerAngle", _descriptor2, this);

    _initializerDefineProperty(this, "_upperAngle", _descriptor3, this);

    _initializerDefineProperty(this, "_enableMotor", _descriptor4, this);

    _initializerDefineProperty(this, "_maxMotorTorque", _descriptor5, this);

    _initializerDefineProperty(this, "_motorSpeed", _descriptor6, this);
  }

  /**
   * @en
   * Enable joint limit?
   * @zh
   * 是否开启关节的限制？
   */
  get enableLimit() {
    return this._enableLimit;
  }

  set enableLimit(v) {
    this._enableLimit = v;
  }
  /**
   * @en
   * The lower angle.
   * @zh
   * 角度的最低限制。
   */


  get lowerAngle() {
    return this._lowerAngle;
  }

  set lowerAngle(v) {
    this._lowerAngle = v;

    if (this._joint) {
      this._joint.setLowerAngle(v);
    }
  }
  /**
   * @en
   * The upper angle.
   * @zh
   * 角度的最高限制。
   */


  get upperAngle() {
    return this._upperAngle;
  }

  set upperAngle(v) {
    this._upperAngle = v;

    if (this._joint) {
      this._joint.setUpperAngle(v);
    }
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
  } /// private properties


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "enableLimit", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lowerAngle", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "lowerAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "upperAngle", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "upperAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableMotor", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableMotor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxMotorTorque", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxMotorTorque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "motorSpeed", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "motorSpeed"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enableLimit", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_lowerAngle", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_upperAngle", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_enableMotor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_maxMotorTorque", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_motorSpeed", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class) || _class);
exports.HingeJoint2D = HingeJoint2D;