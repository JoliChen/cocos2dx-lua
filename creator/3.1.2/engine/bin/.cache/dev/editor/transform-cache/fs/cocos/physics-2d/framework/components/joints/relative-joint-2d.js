"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelativeJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _index = require("../../../../core/index.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const tempVec3_1 = new _index.Vec3();
const tempVec3_2 = new _index.Vec3();
let RelativeJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.RelativeJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/RelativeJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class RelativeJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.RELATIVE;

    _initializerDefineProperty(this, "_maxForce", _descriptor, this);

    _initializerDefineProperty(this, "_maxTorque", _descriptor2, this);

    _initializerDefineProperty(this, "_correctionFactor", _descriptor3, this);

    _initializerDefineProperty(this, "_angularOffset", _descriptor4, this);

    _initializerDefineProperty(this, "_linearOffset", _descriptor5, this);

    _initializerDefineProperty(this, "_autoCalcOffset", _descriptor6, this);
  }

  /**
   * @en
   * The maximum force can be applied to rigidbody.
   * @zh
   * 可以应用于刚体的最大的力值
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
  /**
   * @en
   * The maximum torque can be applied to rigidbody.
   * @zh
   * 可以应用于刚体的最大扭矩值
   */


  get maxTorque() {
    return this._maxTorque;
  }

  set maxTorque(v) {
    this._maxTorque = v;

    if (this._joint) {
      this._joint.setMaxTorque(v);
    }
  }
  /**
   * @en
   * The position correction factor in the range [0,1].
   * @zh
   * 位置矫正系数，范围为 [0, 1]
   */


  get correctionFactor() {
    return this._correctionFactor;
  }

  set correctionFactor(v) {
    this._correctionFactor = v;

    if (this._joint) {
      this._joint.setCorrectionFactor(v);
    }
  }
  /**
   * @en
   * The linear offset from connected rigidbody to rigidbody.
   * @zh
   * 关节另一端的刚体相对于起始端刚体的位置偏移量
   */


  get linearOffset() {
    if (this._autoCalcOffset && this.connectedBody) {
      return _index.Vec2.subtract(this._linearOffset, this.connectedBody.node.worldPosition, this.node.worldPosition);
    }

    return this._linearOffset;
  }

  set linearOffset(v) {
    this._linearOffset.set(v);

    if (this._joint) {
      this._joint.setLinearOffset(v);
    }
  }
  /**
   * @en
   * The angular offset from connected rigidbody to rigidbody.
   * @zh
   * 关节另一端的刚体相对于起始端刚体的角度偏移量
   */


  get angularOffset() {
    if (this._autoCalcOffset && this.connectedBody) {
      _index.Quat.toEuler(tempVec3_1, this.node.worldRotation);

      _index.Quat.toEuler(tempVec3_2, this.connectedBody.node.worldRotation);

      this._angularOffset = tempVec3_2.z - tempVec3_1.z;
    }

    return this._angularOffset;
  }

  set angularOffset(v) {
    this._angularOffset = v;

    if (this._joint) {
      this._joint.setAngularOffset(v);
    }
  }
  /**
   * @en
   * Auto calculate the angularOffset and linearOffset between the connected two rigid bodies.
   * @zh
   * 自动计算关节连接的两个刚体间的 angularOffset 和 linearOffset
   */


  get autoCalcOffset() {
    return this._autoCalcOffset;
  }

  set autoCalcOffset(v) {
    this._autoCalcOffset = v;
  } /// private properties


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "maxForce", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxTorque", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxTorque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "correctionFactor", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "correctionFactor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearOffset", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "linearOffset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularOffset", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "angularOffset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoCalcOffset", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "autoCalcOffset"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_maxForce", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_maxTorque", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.7;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_correctionFactor", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.3;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_angularOffset", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_linearOffset", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index.Vec2();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_autoCalcOffset", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class2)) || _class) || _class);
exports.RelativeJoint2D = RelativeJoint2D;