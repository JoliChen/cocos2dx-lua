"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoRigidBody = void 0;

var _index = require("../../core/index.js");

var _ammoUtil = require("./ammo-util.js");

var _physicsFramework = require("../../../exports/physics-framework.js");

var _ammoEnum = require("./ammo-enum.js");

var _ammoConst = require("./ammo-const.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @hidden
 */
const v3_0 = _ammoConst.CC_V3_0;
const v3_1 = _ammoConst.CC_V3_1;

class AmmoRigidBody {
  get isAwake() {
    const state = this.impl.getActivationState();
    return state === _ammoEnum.AmmoCollisionObjectStates.ACTIVE_TAG || state === _ammoEnum.AmmoCollisionObjectStates.DISABLE_DEACTIVATION;
  }

  get isSleepy() {
    const state = this.impl.getActivationState();
    return state === _ammoEnum.AmmoCollisionObjectStates.WANTS_DEACTIVATION;
  }

  get isSleeping() {
    const state = this.impl.getActivationState();
    return state === _ammoEnum.AmmoCollisionObjectStates.ISLAND_SLEEPING;
  }

  setMass(value) {
    if (!this._rigidBody.isDynamic) return; // See https://studiofreya.com/game-maker/bullet-physics/bullet-physics-how-to-change-body-mass/

    const localInertia = this._sharedBody.bodyStruct.localInertia;
    localInertia.setValue(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
    const shape = this.impl.getCollisionShape();

    if (shape.isCompound()) {
      if (this._sharedBody.bodyCompoundShape.getNumChildShapes() > 0) {
        shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
      }
    } else {
      shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
    }

    this.impl.setMassProps(value, localInertia);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
  }

  setType(v) {
    this._sharedBody.setType(v);
  }

  setLinearDamping(value) {
    this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  }

  setAngularDamping(value) {
    this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
  }

  useGravity(value) {
    if (!this._rigidBody.isDynamic) return;
    let m_rigidBodyFlag = this.impl.getFlags();

    if (value) {
      m_rigidBodyFlag &= ~_ammoEnum.AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    } else {
      this.impl.setGravity((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, _index.Vec3.ZERO));
      m_rigidBodyFlag |= _ammoEnum.AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
    }

    this.impl.setFlags(m_rigidBodyFlag);

    this._wakeUpIfSleep();

    this._sharedBody.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
  }

  setLinearFactor(value) {
    this.impl.setLinearFactor((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, value));

    this._wakeUpIfSleep();
  }

  setAngularFactor(value) {
    this.impl.setAngularFactor((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, value));

    this._wakeUpIfSleep();
  }

  setAllowSleep(v) {
    if (!this._rigidBody.isDynamic) return;

    if (v) {
      this.impl.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.ACTIVE_TAG);
    } else {
      this.impl.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
    }

    this._wakeUpIfSleep();
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get impl() {
    return this._sharedBody.body;
  }

  get rigidBody() {
    return this._rigidBody;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  constructor() {
    this.id = void 0;
    this._isEnabled = false;
    this.id = AmmoRigidBody.idCounter++;
  }

  clearState() {
    this.impl.clearState();
  }

  clearVelocity() {
    this.setLinearVelocity(_index.Vec3.ZERO);
    this.setAngularVelocity(_index.Vec3.ZERO);
  }

  clearForces() {
    this.impl.clearForces();
  }
  /** LIFECYCLE */


  initialize(com) {
    this._rigidBody = com;
    this._sharedBody = _physicsFramework.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
  }

  onEnable() {
    this._isEnabled = true;
    this.setMass(this._rigidBody.mass);
    this.setAllowSleep(this._rigidBody.allowSleep);
    this.setLinearDamping(this._rigidBody.linearDamping);
    this.setAngularDamping(this._rigidBody.angularDamping);
    this.setLinearFactor(this._rigidBody.linearFactor);
    this.setAngularFactor(this._rigidBody.angularFactor);
    this.useGravity(this._rigidBody.useGravity);
    this._sharedBody.bodyEnabled = true;
  }

  onDisable() {
    this._isEnabled = false;
    this._sharedBody.bodyEnabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }
  /** INTERFACE */


  wakeUp(force = true) {
    this.impl.activate(force);
  }

  sleep() {
    return this.impl.wantsSleeping();
  }

  setSleepThreshold(v) {
    this._wakeUpIfSleep();

    this.impl.setSleepingThresholds(v, v);
  }

  getSleepThreshold() {
    return this.impl.getLinearSleepingThreshold();
  }

  getLinearVelocity(out) {
    return (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.getLinearVelocity());
  }

  setLinearVelocity(value) {
    this._wakeUpIfSleep();

    (0, _ammoUtil.cocos2AmmoVec3)(this.impl.getLinearVelocity(), value);
  }

  getAngularVelocity(out) {
    return (0, _ammoUtil.ammo2CocosVec3)(out, this.impl.getAngularVelocity());
  }

  setAngularVelocity(value) {
    this._wakeUpIfSleep();

    (0, _ammoUtil.cocos2AmmoVec3)(this.impl.getAngularVelocity(), value);
  }

  applyLocalForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const quat = this._sharedBody.node.worldRotation;

    const v = _index.Vec3.transformQuat(v3_0, force, quat);

    const rp = rel_pos ? _index.Vec3.transformQuat(v3_1, rel_pos, quat) : _index.Vec3.ZERO;
    this.impl.applyForce((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, v), (0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_1, rp));
  }

  applyLocalTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    _index.Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);

    this.impl.applyTorque((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, v3_0));
  }

  applyLocalImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const quat = this._sharedBody.node.worldRotation;

    const v = _index.Vec3.transformQuat(v3_0, impulse, quat);

    const rp = rel_pos ? _index.Vec3.transformQuat(v3_1, rel_pos, quat) : _index.Vec3.ZERO;
    this.impl.applyImpulse((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, v), (0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_1, rp));
  }

  applyForce(force, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const rp = rel_pos || _index.Vec3.ZERO;
    this.impl.applyForce((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, force), (0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_1, rp));
  }

  applyTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    this.impl.applyTorque((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, torque));
  }

  applyImpulse(impulse, rel_pos) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    const rp = rel_pos || _index.Vec3.ZERO;
    this.impl.applyImpulse((0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_0, impulse), (0, _ammoUtil.cocos2AmmoVec3)(_ammoConst.AmmoConstant.instance.VECTOR3_1, rp));
  }

  getGroup() {
    return this._sharedBody.collisionFilterGroup;
  }

  setGroup(v) {
    this._sharedBody.collisionFilterGroup = v;
  }

  addGroup(v) {
    this._sharedBody.collisionFilterGroup |= v;
  }

  removeGroup(v) {
    this._sharedBody.collisionFilterGroup &= ~v;
  }

  getMask() {
    return this._sharedBody.collisionFilterMask;
  }

  setMask(v) {
    this._sharedBody.collisionFilterMask = v;
  }

  addMask(v) {
    this._sharedBody.collisionFilterMask |= v;
  }

  removeMask(v) {
    this._sharedBody.collisionFilterMask &= ~v;
  }

  _wakeUpIfSleep() {
    if (!this.isAwake) this.impl.activate(true);
  }

}

exports.AmmoRigidBody = AmmoRigidBody;
AmmoRigidBody.idCounter = 0;