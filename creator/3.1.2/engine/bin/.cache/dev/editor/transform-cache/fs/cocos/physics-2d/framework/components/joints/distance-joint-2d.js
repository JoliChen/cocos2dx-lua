"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DistanceJoint2D = void 0;

var _joint2d = require("./joint-2d.js");

var _classDecorator = require("../../../../core/data/class-decorator.js");

var _physicsTypes = require("../../physics-types.js");

var _index = require("../../../../core/index.js");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let DistanceJoint2D = (_dec = (0, _classDecorator.ccclass)('cc.DistanceJoint2D'), _dec2 = (0, _classDecorator.menu)('Physics2D/Joints/DistanceJoint2D'), _dec(_class = _dec2(_class = (_class2 = (_temp = class DistanceJoint2D extends _joint2d.Joint2D {
  constructor(...args) {
    super(...args);
    this.TYPE = _physicsTypes.EJoint2DType.DISTANCE;

    _initializerDefineProperty(this, "_maxLength", _descriptor, this);

    _initializerDefineProperty(this, "_autoCalcDistance", _descriptor2, this);
  }

  /**
   * @en
   * The max length.
   * @zh
   * 最大长度。
   */
  get maxLength() {
    if (this._autoCalcDistance && this.connectedBody) {
      return _index.Vec3.distance(this.node.worldPosition, this.connectedBody.node.worldPosition);
    }

    return this._maxLength;
  }

  set maxLength(v) {
    this._maxLength = v;

    if (this._joint) {
      this._joint.setMaxLength(v);
    }
  }
  /**
   * @en
   * Auto calculate the distance between the connected two rigid bodies.
   * @zh
   * 自动计算关节连接的两个刚体间的距离
   */


  get autoCalcDistance() {
    return this._autoCalcDistance;
  }

  set autoCalcDistance(v) {
    this._autoCalcDistance = v;
  } /// private properties


}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "maxLength", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "maxLength"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoCalcDistance", [_classDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "autoCalcDistance"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_maxLength", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 5;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_autoCalcDistance", [_classDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class2)) || _class) || _class);
exports.DistanceJoint2D = DistanceJoint2D;