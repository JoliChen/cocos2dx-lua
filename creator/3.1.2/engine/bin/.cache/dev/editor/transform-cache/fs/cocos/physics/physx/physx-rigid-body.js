"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXRigidBody = void 0;

var _index = require("../../core/index.js");

var _index2 = require("../framework/index.js");

var _exportPhysx = require("./export-physx.js");

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

/* eslint-disable @typescript-eslint/no-unsafe-return */
const v3_0 = new _index.Vec3();

class PhysXRigidBody {
  constructor() {
    this.isSleepy = false;
    this._isEnabled = false;
  }

  get impl() {
    return this._sharedBody.impl;
  }

  get isAwake() {
    return !this.isStatic && !this.impl.isSleeping();
  }

  get isSleeping() {
    return this.isStatic || this.impl.isSleeping();
  }

  get isEnabled() {
    return this._isEnabled;
  }

  get rigidBody() {
    return this._rigidBody;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  get isStatic() {
    return !this.impl || this._sharedBody.isStatic;
  }

  get isStaticOrKinematic() {
    return !this.impl || this._sharedBody.isStatic || this._sharedBody.isKinematic;
  }

  get isInScene() {
    return this._sharedBody.isInScene;
  }

  initialize(v) {
    this._rigidBody = v;
    this._sharedBody = _index2.PhysicsSystem.instance.physicsWorld.getSharedBody(v.node, this);
    this._sharedBody.reference = true;
  }

  onEnable() {
    this._isEnabled = true;
    this.setMass(this._rigidBody.mass);
    this.setType(this._rigidBody.type);
    this.setAllowSleep(this._rigidBody.allowSleep);
    this.setLinearDamping(this._rigidBody.linearDamping);
    this.setAngularDamping(this._rigidBody.angularDamping);
    this.setLinearFactor(this._rigidBody.linearFactor);
    this.setAngularFactor(this._rigidBody.angularFactor);
    this.useGravity(this._rigidBody.useGravity);
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

  setType(v) {
    this._sharedBody.setType(v);
  }

  setMass(v) {
    if (this.isStatic) return;

    this._sharedBody.setMass(v);
  }

  setLinearDamping(v) {
    if (this.isStatic) return;
    this.impl.setLinearDamping(v);
  }

  setAngularDamping(v) {
    if (this.isStatic) return;
    this.impl.setAngularDamping(v);
  }

  useGravity(v) {
    if (this.isStatic) return;
    this.impl.setActorFlag(_exportPhysx.PX.ActorFlag.eDISABLE_GRAVITY, !v);
  }

  useCCD(v) {
    if (this.isStatic) return;
    this.impl.setRigidBodyFlag(_exportPhysx.PX.RigidBodyFlag.eENABLE_CCD, v);
  }

  setLinearFactor(v) {
    if (this.isStatic) return;
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_X, !v.x);
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_Y, !v.y);
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_Z, !v.z);
  }

  setAngularFactor(v) {
    if (this.isStatic) return;
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_X, !v.x);
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Y, !v.y);
    this.impl.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Z, !v.z);
  }

  setAllowSleep(v) {
    if (this.isStaticOrKinematic) return;
    const st = this.impl.getSleepThreshold();
    const wc = v ? Math.max(0.0, st - 0.001) : st + 0xffffffff;
    this.impl.setWakeCounter(wc);
  }

  wakeUp() {
    if (this.isStatic) return;
    this.impl.wakeUp();
  }

  sleep() {
    if (this.isStatic) return;
    this.impl.putToSleep();
  }

  clearState() {
    if (this.isStatic) return;
    this.clearForces();
    this.clearVelocity();
  }

  clearForces() {
    if (this.isStatic) return;

    this._sharedBody.clearForces();
  }

  clearVelocity() {
    if (this.isStatic) return;

    this._sharedBody.clearVelocity();
  }

  setSleepThreshold(v) {
    if (this.isStatic) return;
    this.impl.setSleepThreshold(v);
  }

  getSleepThreshold() {
    if (this.isStatic) return 0;
    return this.impl.getSleepThreshold();
  }

  getLinearVelocity(out) {
    if (this.isStatic) return;

    _index.Vec3.copy(out, this.impl.getLinearVelocity());
  }

  setLinearVelocity(value) {
    if (this.isStaticOrKinematic) return;
    this.impl.setLinearVelocity(value, true);
  }

  getAngularVelocity(out) {
    if (this.isStatic) return;

    _index.Vec3.copy(out, this.impl.getAngularVelocity());
  }

  setAngularVelocity(value) {
    if (this.isStaticOrKinematic) return;
    this.impl.setAngularVelocity(value, true);
  }

  applyForce(force, relativePoint) {
    if (!this.isInScene || this.isStaticOrKinematic) return;

    this._sharedBody.syncSceneToPhysics();

    const rp = relativePoint || _index.Vec3.ZERO;
    (0, _exportPhysx.applyForce)(true, this.impl, force, rp);
  }

  applyLocalForce(force, relativePoint) {
    if (!this.isInScene || this.isStaticOrKinematic) return;

    this._sharedBody.syncSceneToPhysics();

    const rp = relativePoint || _index.Vec3.ZERO;
    (0, _exportPhysx.applyForce)(false, this.impl, force, rp);
  }

  applyImpulse(force, relativePoint) {
    if (!this.isInScene || this.isStaticOrKinematic) return;

    this._sharedBody.syncSceneToPhysics();

    const rp = relativePoint || _index.Vec3.ZERO;
    (0, _exportPhysx.applyImpulse)(true, this.impl, force, rp);
  }

  applyLocalImpulse(force, relativePoint) {
    if (!this.isInScene || this.isStaticOrKinematic) return;

    this._sharedBody.syncSceneToPhysics();

    const rp = relativePoint || _index.Vec3.ZERO;
    (0, _exportPhysx.applyImpulse)(false, this.impl, force, rp);
  }

  applyTorque(torque) {
    if (!this.isInScene || this.isStaticOrKinematic) return;
    (0, _exportPhysx.applyTorqueForce)(this.impl, torque);
  }

  applyLocalTorque(torque) {
    if (!this.isInScene || this.isStaticOrKinematic) return;

    this._sharedBody.syncSceneToPhysics();

    _index.Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);

    (0, _exportPhysx.applyTorqueForce)(this.impl, v3_0);
  }

  setGroup(v) {
    this._sharedBody.setGroup(v);
  }

  getGroup() {
    return this._sharedBody.getGroup();
  }

  addGroup(v) {
    this._sharedBody.addGroup(v);
  }

  removeGroup(v) {
    this._sharedBody.removeGroup(v);
  }

  setMask(v) {
    this._sharedBody.setMask(v);
  }

  getMask() {
    return this._sharedBody.getMask();
  }

  addMask(v) {
    this._sharedBody.addMask(v);
  }

  removeMask(v) {
    this._sharedBody.removeMask(v);
  }

}

exports.PhysXRigidBody = PhysXRigidBody;