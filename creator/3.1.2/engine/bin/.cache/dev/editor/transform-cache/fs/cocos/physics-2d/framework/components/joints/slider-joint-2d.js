"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _index = require("../../../../core/index.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const tempVec2 = new _index.Vec2();
let SliderJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.SliderJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/SliderJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class SliderJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.SLIDER;

    _initializerDefineProperty(this, "_angle", _descriptor, this);

    _initializerDefineProperty(this, "_autoCalcAngle", _descriptor2, this);

    _initializerDefineProperty(this, "_enableMotor", _descriptor3, this);

    _initializerDefineProperty(this, "_maxMotorForce", _descriptor4, this);

    _initializerDefineProperty(this, "_motorSpeed", _descriptor5, this);

    _initializerDefineProperty(this, "_enableLimit", _descriptor6, this);

    _initializerDefineProperty(this, "_lowerLimit", _descriptor7, this);

    _initializerDefineProperty(this, "_upperLimit", _descriptor8, this);
  }

  /**
   * @en Slide direction
   * @zh 滑动的方向
   */
  get angle() {
    if (this._autoCalcAngle && this.connectedBody) {
      _index.Vec2.subtract(tempVec2, this.connectedBody.node.worldPosition, this.node.worldPosition);

      this._angle = (0, _index.toDegree)(Math.atan2(tempVec2.y, tempVec2.x));
    }

    return this._angle;
  }

  set angle(v) {
    this._angle = v;
  }
  /**
   * @en Auto calculate slide direction according to the slide direction
   * @zh 根据连接的两个刚体自动计算滑动方向
   */


  get autoCalcAngle() {
    return this._autoCalcAngle;
  }

  set autoCalcAngle(v) {
    this._autoCalcAngle = v;
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
  }
  /**
   * @en
   * The maxium force can be applied to rigidbody to rearch the target motor speed.
   * @zh
   * 可以施加到刚体的最大力。
   */


  get maxMotorForce() {
    return this._maxMotorForce;
  }

  set maxMotorForce(v) {
    this._maxMotorForce = v;

    if (this._joint) {
      this._joint.setMaxMotorForce(v);
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
   * Enable joint distance limit?
   * @zh
   * 是否开启关节的距离限制？
   */


  get enableLimit() {
    return this._enableLimit;
  }

  set enableLimit(v) {
    this._enableLimit = v;
  }
  /**
   * @en
   * The lower joint limit.
   * @zh
   * 刚体能够移动的最小值
   */


  get lowerLimit() {
    return this._lowerLimit;
  }

  set lowerLimit(v) {
    this._lowerLimit = v;

    if (this._joint) {
      this._joint.setLowerLimit(v);
    }
  }
  /**
   * @en
   * The lower joint limit.
   * @zh
   * 刚体能够移动的最大值
   */


  get upperLimit() {
    return this._upperLimit;
  }

  set upperLimit(v) {
    this._upperLimit = v;

    if (this._joint) {
      this._joint.setUpperLimit(v);
    }
  } /// private properties


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "angle", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoCalcAngle", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "autoCalcAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableMotor", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableMotor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxMotorForce", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxMotorForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "motorSpeed", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "motorSpeed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableLimit", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enableLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lowerLimit", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "lowerLimit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "upperLimit", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "upperLimit"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_angle", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_autoCalcAngle", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_enableMotor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_maxMotorForce", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_motorSpeed", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1000;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_enableLimit", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_lowerLimit", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_upperLimit", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
})), _class2)) || _class) || _class);
exports.SliderJoint2D = SliderJoint2D;