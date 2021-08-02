"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonRigidBody = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../core/math/index.js");

var _physicsSystem = require("../framework/physics-system.js");

var _index2 = require("../framework/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const v3_cannon0 = new _cannon.default.Vec3();
const v3_cannon1 = new _cannon.default.Vec3();
/**
 * wrapped shared body
 * dynamic
 * kinematic
 */

class CannonRigidBody {
  constructor() {
    this._isEnabled = false;
  }

  get isAwake() {
    return this.impl.isAwake();
  }

  get isSleepy() {
    return this.impl.isSleepy();
  }

  get isSleeping() {
    return this.impl.isSleeping();
  }

  setAllowSleep(v) {
    if (this.impl.type !== _cannon.default.Body.DYNAMIC) return;
    this.impl.allowSleep = v;

    this._wakeUpIfSleep();
  }

  setMass(value) {
    if (this.impl.type !== _cannon.default.Body.DYNAMIC) return;
    this.impl.mass = value;
    this.impl.updateMassProperties();

    this._wakeUpIfSleep();
  }

  setType(v) {
    switch (v) {
      case _index2.ERigidBodyType.DYNAMIC:
        this.impl.type = _cannon.default.Body.DYNAMIC;
        this.impl.allowSleep = this._rigidBody.allowSleep;
        this.setMass(this._rigidBody.mass);
        break;

      case _index2.ERigidBodyType.KINEMATIC:
        this.impl.type = _cannon.default.Body.KINEMATIC;
        this.impl.mass = 0;
        this.impl.allowSleep = false;
        this.impl.sleepState = _cannon.default.Body.AWAKE;
        this.impl.updateMassProperties();
        break;

      case _index2.ERigidBodyType.STATIC:
      default:
        this.impl.type = _cannon.default.Body.STATIC;
        this.impl.mass = 0;
        this.impl.allowSleep = true;
        this.impl.updateMassProperties();
        break;
    }
  }

  setLinearDamping(value) {
    this.impl.linearDamping = value;
  }

  setAngularDamping(value) {
    this.impl.angularDamping = value;
  }

  useGravity(value) {
    this.impl.useGravity = value;

    this._wakeUpIfSleep();
  }

  setLinearFactor(value) {
    _index.Vec3.copy(this.impl.linearFactor, value);

    this._wakeUpIfSleep();
  }

  setAngularFactor(value) {
    _index.Vec3.copy(this.impl.angularFactor, value);

    const fixR = _index.Vec3.equals(this.impl.angularFactor, _index.Vec3.ZERO);

    if (fixR !== this.impl.fixedRotation) {
      this.impl.fixedRotation = fixR;
      this.impl.updateMassProperties();
    }

    this._wakeUpIfSleep();
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

  get isEnabled() {
    return this._isEnabled;
  }

  /** LIFECYCLE */
  initialize(com) {
    this._rigidBody = com;
    this._sharedBody = _physicsSystem.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
    this._sharedBody.wrappedBody = this;
  }

  onLoad() {}

  onEnable() {
    this._isEnabled = true;
    this.setType(this._rigidBody.type);
    this.setMass(this._rigidBody.mass);
    this.setAllowSleep(this._rigidBody.allowSleep);
    this.setLinearDamping(this._rigidBody.linearDamping);
    this.setAngularDamping(this._rigidBody.angularDamping);
    this.useGravity(this._rigidBody.useGravity);
    this.setLinearFactor(this._rigidBody.linearFactor);
    this.setAngularFactor(this._rigidBody.angularFactor);
    this._sharedBody.enabled = true;
  }

  onDisable() {
    this._isEnabled = false;
    this._sharedBody.enabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }
  /** INTERFACE */


  clearVelocity() {
    this.impl.velocity.setZero();
    this.impl.angularVelocity.setZero();
  }

  clearForces() {
    this.impl.force.setZero();
    this.impl.torque.setZero();
  }

  clearState() {
    this.clearVelocity();
    this.clearForces();
  }

  wakeUp() {
    return this.impl.wakeUp();
  }

  sleep() {
    return this.impl.sleep();
  }

  setSleepThreshold(v) {
    this.impl.sleepSpeedLimit = v;

    this._wakeUpIfSleep();
  }

  getSleepThreshold() {
    return this.impl.sleepSpeedLimit;
  }

  getLinearVelocity(out) {
    _index.Vec3.copy(out, this.impl.velocity);

    return out;
  }

  setLinearVelocity(value) {
    this._wakeUpIfSleep();

    _index.Vec3.copy(this.impl.velocity, value);
  }

  getAngularVelocity(out) {
    _index.Vec3.copy(out, this.impl.angularVelocity);

    return out;
  }

  setAngularVelocity(value) {
    this._wakeUpIfSleep();

    _index.Vec3.copy(this.impl.angularVelocity, value);
  }

  applyForce(force, worldPoint) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    if (worldPoint == null) worldPoint = _index.Vec3.ZERO;
    this.impl.applyForce(_index.Vec3.copy(v3_cannon0, force), _index.Vec3.copy(v3_cannon1, worldPoint));
  }

  applyImpulse(impulse, worldPoint) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    if (worldPoint == null) worldPoint = _index.Vec3.ZERO;
    this.impl.applyImpulse(_index.Vec3.copy(v3_cannon0, impulse), _index.Vec3.copy(v3_cannon1, worldPoint));
  }

  applyLocalForce(force, localPoint) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    if (localPoint == null) localPoint = _index.Vec3.ZERO;
    this.impl.applyLocalForce(_index.Vec3.copy(v3_cannon0, force), _index.Vec3.copy(v3_cannon1, localPoint));
  }

  applyLocalImpulse(impulse, localPoint) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    if (localPoint == null) localPoint = _index.Vec3.ZERO;
    this.impl.applyLocalImpulse(_index.Vec3.copy(v3_cannon0, impulse), _index.Vec3.copy(v3_cannon1, localPoint));
  }

  applyTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    _index.Vec3.add(this.impl.torque, this.impl.torque, torque);
  }

  applyLocalTorque(torque) {
    this._sharedBody.syncSceneToPhysics();

    this._wakeUpIfSleep();

    _index.Vec3.copy(v3_cannon0, torque);

    this.impl.vectorToWorldFrame(v3_cannon0, v3_cannon0);

    _index.Vec3.add(this.impl.torque, this.impl.torque, v3_cannon0);
  }
  /** group */


  getGroup() {
    return this.impl.collisionFilterGroup;
  }

  setGroup(v) {
    this.impl.collisionFilterGroup = v;

    this._wakeUpIfSleep();
  }

  addGroup(v) {
    this.impl.collisionFilterGroup |= v;

    this._wakeUpIfSleep();
  }

  removeGroup(v) {
    this.impl.collisionFilterGroup &= ~v;

    this._wakeUpIfSleep();
  }
  /** mask */


  getMask() {
    return this.impl.collisionFilterMask;
  }

  setMask(v) {
    this.impl.collisionFilterMask = v;

    this._wakeUpIfSleep();
  }

  addMask(v) {
    this.impl.collisionFilterMask |= v;

    this._wakeUpIfSleep();
  }

  removeMask(v) {
    this.impl.collisionFilterMask &= ~v;

    this._wakeUpIfSleep();
  }

  _wakeUpIfSleep() {
    if (!this.impl.isAwake()) this.impl.wakeUp();
  }

}

exports.CannonRigidBody = CannonRigidBody;