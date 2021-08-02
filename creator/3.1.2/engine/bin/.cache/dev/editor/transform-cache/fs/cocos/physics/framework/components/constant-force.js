"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConstantForce = void 0;

var _index = require("../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _component = require("../../../core/components/component.js");

var _rigidBody = require("./rigid-body.js");

var _vec = require("../../../core/math/vec3.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * A tool component to help apply force to the rigid body at each frame.
 * @zh
 * 在每帧对一个刚体施加持续的力，依赖 RigidBody 组件。
 */
let ConstantForce = (_dec = (0, _index.ccclass)('cc.ConstantForce'), _dec2 = (0, _index.help)('i18n:cc.ConstantForce'), _dec3 = (0, _index.requireComponent)(_rigidBody.RigidBody), _dec4 = (0, _index.menu)('Physics/ConstantForce'), _dec5 = (0, _index.displayOrder)(0), _dec6 = (0, _index.tooltip)('i18n:physics3d.constant_force.force'), _dec7 = (0, _index.displayOrder)(1), _dec8 = (0, _index.tooltip)('i18n:physics3d.constant_force.localForce'), _dec9 = (0, _index.displayOrder)(2), _dec10 = (0, _index.tooltip)('i18n:physics3d.constant_force.torque'), _dec11 = (0, _index.displayOrder)(3), _dec12 = (0, _index.tooltip)('i18n:physics3d.constant_force.localTorque'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.disallowMultiple)(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class ConstantForce extends _component.Component {
  constructor(...args) {
    super(...args);
    this._rigidBody = null;

    _initializerDefineProperty(this, "_force", _descriptor, this);

    _initializerDefineProperty(this, "_localForce", _descriptor2, this);

    _initializerDefineProperty(this, "_torque", _descriptor3, this);

    _initializerDefineProperty(this, "_localTorque", _descriptor4, this);

    this._mask = 0;
  }

  /**
   * @en
   * Gets or sets forces in world coordinates.
   * @zh
   * 获取或设置世界坐标系下的力。
   */
  get force() {
    return this._force;
  }

  set force(value) {
    _vec.Vec3.copy(this._force, value);

    this._maskUpdate(this._force, 1);
  }
  /**
   * @en
   * Gets or sets the forces in the local coordinate system.
   * @zh
   * 获取或设置本地坐标系下的力。
   */


  get localForce() {
    return this._localForce;
  }

  set localForce(value) {
    _vec.Vec3.copy(this._localForce, value);

    this._maskUpdate(this.localForce, 2);
  }
  /**
   * @en
   * Gets or sets the torsional force in world coordinates.
   * @zh
   * 获取或设置世界坐标系下的扭转力。
   */


  get torque() {
    return this._torque;
  }

  set torque(value) {
    _vec.Vec3.copy(this._torque, value);

    this._maskUpdate(this._torque, 4);
  }
  /**
   * @en
   * Gets or sets the torsional force in the local coordinate system.
   * @zh
   * 获取或设置本地坐标系下的扭转力。
   */


  get localTorque() {
    return this._localTorque;
  }

  set localTorque(value) {
    _vec.Vec3.copy(this._localTorque, value);

    this._maskUpdate(this._localTorque, 8);
  }

  onLoad() {
    this._rigidBody = this.node.getComponent(_rigidBody.RigidBody);

    this._maskUpdate(this._force, 1);

    this._maskUpdate(this._localForce, 2);

    this._maskUpdate(this._torque, 4);

    this._maskUpdate(this._localTorque, 8);
  }

  lateUpdate(dt) {
    if (!_internal253Aconstants.EDITOR) {
      if (this._rigidBody != null && this._mask !== 0) {
        if (this._mask & 1) this._rigidBody.applyForce(this._force);
        if (this._mask & 2) this._rigidBody.applyLocalForce(this.localForce);
        if (this._mask & 4) this._rigidBody.applyTorque(this._torque);
        if (this._mask & 8) this._rigidBody.applyLocalTorque(this._localTorque);
      }
    }
  }

  _maskUpdate(t, m) {
    if (t.strictEquals(_vec.Vec3.ZERO)) {
      this._mask &= ~m;
    } else {
      this._mask |= m;
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_force", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _vec.Vec3();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_localForce", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _vec.Vec3();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_torque", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _vec.Vec3();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTorque", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _vec.Vec3();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "force", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "force"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localForce", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "localForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "torque", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "torque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localTorque", [_dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "localTorque"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ConstantForce = ConstantForce;