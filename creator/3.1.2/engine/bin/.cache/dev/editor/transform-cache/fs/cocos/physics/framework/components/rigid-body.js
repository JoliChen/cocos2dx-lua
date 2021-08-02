"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RigidBody = void 0;

var _index = require("../../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../../core/math/index.js");

var _index3 = require("../../../core/index.js");

var _instance = require("../instance.js");

var _physicsEnum = require("../physics-enum.js");

var _physicsSystem = require("../physics-system.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Rigid body component.
 * @zh
 * 刚体组件。
 */
let RigidBody = (_dec = (0, _index.ccclass)('cc.RigidBody'), _dec2 = (0, _index.help)('i18n:cc.RigidBody'), _dec3 = (0, _index.menu)('Physics/RigidBody'), _dec4 = (0, _index.executionOrder)(-1), _dec5 = (0, _index.type)(_physicsSystem.PhysicsSystem.PhysicsGroup), _dec6 = (0, _index.displayOrder)(-2), _dec7 = (0, _index.tooltip)('i18n:physics3d.rigidbody.group'), _dec8 = (0, _index.type)(_physicsEnum.ERigidBodyType), _dec9 = (0, _index.displayOrder)(-1), _dec10 = (0, _index.tooltip)('i18n:physics3d.rigidbody.type'), _dec11 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec12 = (0, _index.displayOrder)(0), _dec13 = (0, _index.tooltip)('i18n:physics3d.rigidbody.mass'), _dec14 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec15 = (0, _index.displayOrder)(0.5), _dec16 = (0, _index.tooltip)('i18n:physics3d.rigidbody.allowSleep'), _dec17 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec18 = (0, _index.displayOrder)(1), _dec19 = (0, _index.tooltip)('i18n:physics3d.rigidbody.linearDamping'), _dec20 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec21 = (0, _index.displayOrder)(2), _dec22 = (0, _index.tooltip)('i18n:physics3d.rigidbody.angularDamping'), _dec23 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec24 = (0, _index.displayOrder)(4), _dec25 = (0, _index.tooltip)('i18n:physics3d.rigidbody.useGravity'), _dec26 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec27 = (0, _index.displayOrder)(6), _dec28 = (0, _index.tooltip)('i18n:physics3d.rigidbody.linearFactor'), _dec29 = (0, _index.visible)(function () {
  return this.isDynamic;
}), _dec30 = (0, _index.displayOrder)(7), _dec31 = (0, _index.tooltip)('i18n:physics3d.rigidbody.angularFactor'), _dec(_class = _dec2(_class = _dec3(_class = (0, _index.executeInEditMode)(_class = (0, _index.disallowMultiple)(_class = _dec4(_class = (_class2 = (_temp = _class3 = class RigidBody extends _index3.Component {
  constructor(...args) {
    super(...args);
    this._body = null;

    _initializerDefineProperty(this, "_group", _descriptor, this);

    _initializerDefineProperty(this, "_type", _descriptor2, this);

    _initializerDefineProperty(this, "_mass", _descriptor3, this);

    _initializerDefineProperty(this, "_allowSleep", _descriptor4, this);

    _initializerDefineProperty(this, "_linearDamping", _descriptor5, this);

    _initializerDefineProperty(this, "_angularDamping", _descriptor6, this);

    _initializerDefineProperty(this, "_useGravity", _descriptor7, this);

    _initializerDefineProperty(this, "_linearFactor", _descriptor8, this);

    _initializerDefineProperty(this, "_angularFactor", _descriptor9, this);
  }

  /// PUBLIC PROPERTY GETTER\SETTER ///

  /**
   * @en
   * Gets or sets the group of the rigid body.
   * @zh
   * 获取或设置分组。
   */
  get group() {
    if (_internal253Aconstants.EDITOR) {
      return this._group;
    } else {
      return this.getGroup();
    }
  }

  set group(v) {
    if (_internal253Aconstants.DEBUG && !Number.isInteger(Math.log2(v >>> 0))) (0, _index3.warn)('[Physics]: The group should only have one bit.');
    this._group = v;
    if (!_internal253Aconstants.EDITOR && this.getGroup() === v) return;

    if (this._body) {
      this._body.setGroup(v);
    }
  }
  /**
   * @en
   * Gets or sets the type of rigid body.
   * @zh
   * 获取或设置刚体类型。
   */


  get type() {
    return this._type;
  }

  set type(v) {
    if (this._type === v) return;
    this._type = v;

    if (this._body) {
      this._body.setType(v);
    }
  }
  /**
   * @en
   * Gets or sets the mass of the rigid body.
   * @zh
   * 获取或设置刚体的质量。
   */


  get mass() {
    return this._mass;
  }

  set mass(value) {
    if (this._mass === value) return;
    value = value <= 0 ? 0.0001 : value;
    this._mass = value;

    if (this._body) {
      this._body.setMass(value);
    }
  }
  /**
   * @en
   * Gets or sets whether hibernation is allowed.
   * @zh
   * 获取或设置是否允许休眠。
   */


  get allowSleep() {
    return this._allowSleep;
  }

  set allowSleep(v) {
    this._allowSleep = v;

    if (this._body) {
      this._body.setAllowSleep(v);
    }
  }
  /**
   * @en
   * Gets or sets linear damping.
   * @zh
   * 获取或设置线性阻尼。
   */


  get linearDamping() {
    return this._linearDamping;
  }

  set linearDamping(value) {
    this._linearDamping = value;

    if (this._body) {
      this._body.setLinearDamping(value);
    }
  }
  /**
   * @en
   * Gets or sets the rotation damping.
   * @zh
   * 获取或设置旋转阻尼。
   */


  get angularDamping() {
    return this._angularDamping;
  }

  set angularDamping(value) {
    this._angularDamping = value;

    if (this._body) {
      this._body.setAngularDamping(value);
    }
  }
  /**
   * @en
   * Gets or sets whether a rigid body uses gravity.
   * @zh
   * 获取或设置刚体是否使用重力。
   */


  get useGravity() {
    return this._useGravity;
  }

  set useGravity(value) {
    this._useGravity = value;

    if (this._body) {
      this._body.useGravity(value);
    }
  }
  /**
   * @en
   * Gets or sets the linear velocity factor that can be used to control the scaling of the velocity in each axis direction.
   * @zh
   * 获取或设置线性速度的因子，可以用来控制每个轴方向上的速度的缩放。
   */


  get linearFactor() {
    return this._linearFactor;
  }

  set linearFactor(value) {
    _index2.Vec3.copy(this._linearFactor, value);

    if (this._body) {
      this._body.setLinearFactor(this._linearFactor);
    }
  }
  /**
   * @en
   * Gets or sets the rotation speed factor that can be used to control the scaling of the rotation speed in each axis direction.
   * @zh
   * 获取或设置旋转速度的因子，可以用来控制每个轴方向上的旋转速度的缩放。
   */


  get angularFactor() {
    return this._angularFactor;
  }

  set angularFactor(value) {
    _index2.Vec3.copy(this._angularFactor, value);

    if (this._body) {
      this._body.setAngularFactor(this._angularFactor);
    }
  }
  /**
   * @en
   * Gets or sets the speed threshold for going to sleep.
   * @zh
   * 获取或设置进入休眠的速度临界值。
   */


  get sleepThreshold() {
    if (this._assertOnLoadCalled) {
      return this._body.getSleepThreshold();
    }

    return 0;
  }

  set sleepThreshold(v) {
    if (this._assertOnLoadCalled) {
      this._body.setSleepThreshold(v);
    }
  }
  /**
   * @en
   * Gets whether it is the state of awake.
   * @zh
   * 获取是否是唤醒的状态。
   */


  get isAwake() {
    if (this._assertOnLoadCalled) {
      return this._body.isAwake;
    }

    return false;
  }
  /**
   * @en
   * Gets whether you can enter a dormant state.
   * @zh
   * 获取是否是可进入休眠的状态。
   */


  get isSleepy() {
    if (this._assertOnLoadCalled) {
      return this._body.isSleepy;
    }

    return false;
  }
  /**
   * @en
   * Gets whether the state is dormant.
   * @zh
   * 获取是否是正在休眠的状态。
   */


  get isSleeping() {
    if (this._assertOnLoadCalled) {
      return this._body.isSleeping;
    }

    return false;
  }
  /**
   * @en
   * Gets or sets whether the rigid body is static.
   * @zh
   * 获取或设置刚体是否是静态类型的（静止不动的）。
   */


  get isStatic() {
    return this._type === _physicsEnum.ERigidBodyType.STATIC;
  }

  set isStatic(v) {
    if (v && this.isStatic || !v && !this.isStatic) return;
    this.type = v ? _physicsEnum.ERigidBodyType.STATIC : _physicsEnum.ERigidBodyType.DYNAMIC;
  }
  /**
   * @en
   * Gets or sets whether the rigid body moves through physical dynamics.
   * @zh
   * 获取或设置刚体是否是动力学态类型的（将根据物理动力学控制运动）。
   */


  get isDynamic() {
    return this._type === _physicsEnum.ERigidBodyType.DYNAMIC;
  }

  set isDynamic(v) {
    if (v && this.isDynamic || !v && !this.isDynamic) return;
    this.type = v ? _physicsEnum.ERigidBodyType.DYNAMIC : _physicsEnum.ERigidBodyType.KINEMATIC;
  }
  /**
   * @en
   * Gets or sets whether a rigid body is controlled by users.
   * @zh
   * 获取或设置刚体是否是运动态类型的（将由用户来控制运动）。
   */


  get isKinematic() {
    return this._type === _physicsEnum.ERigidBodyType.KINEMATIC;
  }

  set isKinematic(v) {
    if (v && this.isKinematic || !v && !this.isKinematic) return;
    this.type = v ? _physicsEnum.ERigidBodyType.KINEMATIC : _physicsEnum.ERigidBodyType.DYNAMIC;
  }
  /**
   * @en
   * Gets the wrapper object, through which the lowLevel instance can be accessed.
   * @zh
   * 获取封装对象，通过此对象可以访问到底层实例。
   */


  get body() {
    return this._body;
  }

  get _assertOnLoadCalled() {
    const r = this._isOnLoadCalled === 0;

    if (r) {
      (0, _index3.error)('[Physics]: Please make sure that the node has been added to the scene');
    }

    return !r;
  } /// COMPONENT LIFECYCLE ///


  onLoad() {
    if (!_internal253Aconstants.EDITOR) {
      this._body = (0, _instance.createRigidBody)();

      this._body.initialize(this);
    }
  }

  onEnable() {
    if (this._body) {
      this._body.onEnable();
    }
  }

  onDisable() {
    if (this._body) {
      this._body.onDisable();
    }
  }

  onDestroy() {
    if (this._body) {
      this._body.onDestroy();
    }
  } /// PUBLIC METHOD ///

  /**
   * @en
   * Apply force to a world point. This could, for example, be a point on the Body surface.
   * @zh
   * 在世界空间中，相对于刚体的质心的某点上对刚体施加作用力。
   * @param force - 作用力
   * @param relativePoint - 作用点，相对于刚体的质心
   */


  applyForce(force, relativePoint) {
    if (this._assertOnLoadCalled) {
      this._body.applyForce(force, relativePoint);
    }
  }
  /**
   * @en
   * Apply force to a local point. This could, for example, be a point on the Body surface.
   * @zh
   * 在本地空间中，相对于刚体的质心的某点上对刚体施加作用力。
   * @param force - 作用力
   * @param localPoint - 作用点
   */


  applyLocalForce(force, localPoint) {
    if (this._assertOnLoadCalled) {
      this._body.applyLocalForce(force, localPoint);
    }
  }
  /**
   * @en
   * In world space, impulse is applied to the rigid body at some point relative to the center of mass of the rigid body.
   * @zh
   * 在世界空间中，相对于刚体的质心的某点上对刚体施加冲量。
   * @param impulse - 冲量
   * @param relativePoint - 作用点，相对于刚体的中心点
   */


  applyImpulse(impulse, relativePoint) {
    if (this._assertOnLoadCalled) {
      this._body.applyImpulse(impulse, relativePoint);
    }
  }
  /**
   * @en
   * In local space, impulse is applied to the rigid body at some point relative to the center of mass of the rigid body.
   * @zh
   * 在本地空间中，相对于刚体的质心的某点上对刚体施加冲量。
   * @param impulse - 冲量
   * @param localPoint - 作用点
   */


  applyLocalImpulse(impulse, localPoint) {
    if (this._assertOnLoadCalled) {
      this._body.applyLocalImpulse(impulse, localPoint);
    }
  }
  /**
   * @en
   * In world space, torque is applied to the rigid body.
   * @zh
   * 在世界空间中，对刚体施加扭矩。
   * @param torque - 扭矩
   */


  applyTorque(torque) {
    if (this._assertOnLoadCalled) {
      this._body.applyTorque(torque);
    }
  }
  /**
   * @zh
   * 在本地空间中，对刚体施加扭矩。
   * @param torque - 扭矩
   */


  applyLocalTorque(torque) {
    if (this._assertOnLoadCalled) {
      this._body.applyLocalTorque(torque);
    }
  }
  /**
   * @en
   * Wake up the rigid body.
   * @zh
   * 唤醒刚体。
   */


  wakeUp() {
    if (this._assertOnLoadCalled) {
      this._body.wakeUp();
    }
  }
  /**
   * @en
   * Dormancy of rigid body.
   * @zh
   * 休眠刚体。
   */


  sleep() {
    if (this._assertOnLoadCalled) {
      this._body.sleep();
    }
  }
  /**
   * @en
   * Clear the forces and velocity of the rigid body.
   * @zh
   * 清除刚体受到的力和速度。
   */


  clearState() {
    if (this._assertOnLoadCalled) {
      this._body.clearState();
    }
  }
  /**
   * @en
   * Clear the forces of the rigid body.
   * @zh
   * 清除刚体受到的力。
   */


  clearForces() {
    if (this._assertOnLoadCalled) {
      this._body.clearForces();
    }
  }
  /**
   * @en
   * Clear velocity of the rigid body.
   * @zh
   * 清除刚体的速度。
   */


  clearVelocity() {
    if (this._assertOnLoadCalled) {
      this._body.clearVelocity();
    }
  }
  /**
   * @en
   * Gets the linear velocity.
   * @zh
   * 获取线性速度。
   * @param out 速度 Vec3
   */


  getLinearVelocity(out) {
    if (this._assertOnLoadCalled) {
      this._body.getLinearVelocity(out);
    }
  }
  /**
   * @en
   * Sets the linear velocity.
   * @zh
   * 设置线性速度。
   * @param value 速度 Vec3
   */


  setLinearVelocity(value) {
    if (this._assertOnLoadCalled) {
      this._body.setLinearVelocity(value);
    }
  }
  /**
   * @en
   * Gets the angular velocity.
   * @zh
   * 获取旋转速度。
   * @param out 速度 Vec3
   */


  getAngularVelocity(out) {
    if (this._assertOnLoadCalled) {
      this._body.getAngularVelocity(out);
    }
  }
  /**
   * @en
   * Sets the angular velocity.
   * @zh
   * 设置旋转速度。
   * @param value 速度 Vec3
   */


  setAngularVelocity(value) {
    if (this._assertOnLoadCalled) {
      this._body.setAngularVelocity(value);
    }
  } /// GROUP MASK ///

  /**
   * @en
   * Gets the group value.
   * @zh
   * 获取分组值。
   * @returns 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  getGroup() {
    if (this._assertOnLoadCalled) {
      return this._body.getGroup();
    }

    return 0;
  }
  /**
   * @en
   * Sets the group value.
   * @zh
   * 设置分组值。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  setGroup(v) {
    if (this._assertOnLoadCalled) {
      this._body.setGroup(v);
    }
  }
  /**
   * @en
   * Add a grouping value to fill in the group you want to join.
   * @zh
   * 添加分组值，可填要加入的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  addGroup(v) {
    if (this._assertOnLoadCalled) {
      this._body.addGroup(v);
    }
  }
  /**
   * @en
   * Subtract the grouping value to fill in the group to be removed.
   * @zh
   * 减去分组值，可填要移除的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  removeGroup(v) {
    if (this._assertOnLoadCalled) {
      this._body.removeGroup(v);
    }
  }
  /**
   * @en
   * Gets the mask value.
   * @zh
   * 获取掩码值。
   * @returns 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  getMask() {
    if (this._assertOnLoadCalled) {
      return this._body.getMask();
    }

    return 0;
  }
  /**
   * @en
   * Sets the mask value.
   * @zh
   * 设置掩码值。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  setMask(v) {
    if (this._assertOnLoadCalled) {
      this._body.setMask(v);
    }
  }
  /**
   * @en
   * Add mask values to fill in groups that need to be checked.
   * @zh
   * 添加掩码值，可填入需要检查的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  addMask(v) {
    if (this._assertOnLoadCalled) {
      this._body.addMask(v);
    }
  }
  /**
   * @en
   * Subtract the mask value to fill in the group that does not need to be checked.
   * @zh
   * 减去掩码值，可填入不需要检查的 group。
   * @param v - 整数，范围为 2 的 0 次方 到 2 的 31 次方
   */


  removeMask(v) {
    if (this._assertOnLoadCalled) {
      this._body.removeMask(v);
    }
  }

}, _class3.Type = _physicsEnum.ERigidBodyType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "group", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "group"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mass", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "mass"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allowSleep", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "allowSleep"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearDamping", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "linearDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularDamping", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "angularDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useGravity", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "useGravity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearFactor", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "linearFactor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularFactor", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "angularFactor"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_group", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _physicsSystem.PhysicsSystem.PhysicsGroup.DEFAULT;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_type", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _physicsEnum.ERigidBodyType.DYNAMIC;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_mass", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_allowSleep", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_linearDamping", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_angularDamping", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_useGravity", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_linearFactor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(1, 1, 1);
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_angularFactor", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.RigidBody = RigidBody;

(function (_RigidBody) {})(RigidBody || (exports.RigidBody = RigidBody = {}));