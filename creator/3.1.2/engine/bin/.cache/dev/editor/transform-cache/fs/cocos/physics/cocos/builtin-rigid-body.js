"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinRigidBody = void 0;

var _index = require("../framework/index.js");

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
class BuiltinRigidBody {
  get impl() {
    return this;
  }

  get isAwake() {
    return true;
  }

  get isSleepy() {
    return false;
  }

  get isSleeping() {
    return false;
  }

  get rigidBody() {
    return this._rigidBody;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  initialize(com) {
    this._rigidBody = com;
    this._sharedBody = _index.PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
    this._sharedBody.reference = true;
  }

  onEnable() {
    this._sharedBody.enabled = true;
  }

  onDisable() {
    this._sharedBody.enabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }

  setMass(v) {}

  setType(v) {}

  setLinearDamping(v) {}

  setAngularDamping(v) {}

  useGravity(v) {}

  setLinearFactor(v) {}

  setAngularFactor(v) {}

  setAllowSleep(v) {}

  wakeUp() {}

  sleep() {}

  clearState() {}

  clearForces() {}

  clearVelocity() {}

  setSleepThreshold(v) {}

  getSleepThreshold() {
    return 0;
  }

  getLinearVelocity(out) {}

  setLinearVelocity(value) {}

  getAngularVelocity(out) {}

  setAngularVelocity(value) {}

  applyForce(force, relativePoint) {}

  applyLocalForce(force, relativePoint) {}

  applyImpulse(force, relativePoint) {}

  applyLocalImpulse(force, relativePoint) {}

  applyTorque(torque) {}

  applyLocalTorque(torque) {}

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

exports.BuiltinRigidBody = BuiltinRigidBody;