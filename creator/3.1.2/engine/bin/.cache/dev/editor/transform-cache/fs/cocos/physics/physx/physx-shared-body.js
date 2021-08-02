"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysXSharedBody = void 0;

var _index = require("../../core/index.js");

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _exportPhysx = require("./export-physx.js");

var _util = require("../utils/util.js");

var _index2 = require("../framework/index.js");

var _physicsEnum = require("../framework/physics-enum.js");

var _array = require("../../core/utils/array.js");

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
class PhysXSharedBody {
  static getSharedBody(node, wrappedWorld, wrappedBody) {
    const key = node.uuid;
    let newSB;

    if (PhysXSharedBody.sharedBodesMap.has(key)) {
      newSB = PhysXSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new PhysXSharedBody(node, wrappedWorld);
      newSB.filterData.word0 = _physicsEnum.PhysicsGroup.DEFAULT;
      newSB.filterData.word1 = _index2.PhysicsSystem.instance.collisionMatrix[_physicsEnum.PhysicsGroup.DEFAULT];
      PhysXSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB._wrappedBody = wrappedBody;
      const g = wrappedBody.rigidBody._group;
      const m = _index2.PhysicsSystem.instance.collisionMatrix[g];
      newSB.filterData.word0 = g;
      newSB.filterData.word1 = m;
    }

    return newSB;
  }

  get isStatic() {
    return this._isStatic;
  }

  get isKinematic() {
    return this._isKinematic;
  }

  get isDynamic() {
    return !this._isStatic && !this._isKinematic;
  }

  get wrappedBody() {
    return this._wrappedBody;
  }

  get filterData() {
    return this._filterData;
  }

  get isInScene() {
    return this._index !== -1;
  }

  get impl() {
    this._initActor();

    return this.isStatic ? this._staticActor : this._dynamicActor;
  }

  set reference(v) {
    this._ref = v ? this._ref + 1 : this._ref - 1;

    if (this._ref === 0) {
      this.destroy();
    }
  }

  set enabled(v) {
    if (v) {
      if (this._index < 0) {
        this._index = this.wrappedWorld.wrappedBodies.length;
        this.wrappedWorld.addActor(this);
      }
    } else if (this._index >= 0) {
      const ws = this.wrappedShapes;
      const wb = this.wrappedBody;
      const isRemove = ws.length === 0 && wb == null || ws.length === 0 && wb != null && !wb.isEnabled;

      if (isRemove) {
        this._index = -1;
        this.clearForces();
        this.clearVelocity();
        this.wrappedWorld.removeActor(this);
      }
    }
  }

  constructor(node, wrappedWorld) {
    this.id = void 0;
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.wrappedShapes = [];
    this.wrappedJoints0 = [];
    this.wrappedJoints1 = [];
    this._index = -1;
    this._ref = 0;
    this._isStatic = false;
    this._isKinematic = false;
    this._wrappedBody = null;
    this._filterData = void 0;
    this.id = PhysXSharedBody.idCounter++;
    this.node = node;
    this.wrappedWorld = wrappedWorld;
    this._filterData = {
      word0: 1,
      word1: 1,
      word2: 0,
      word3: 0
    };
  }

  _initActor() {
    const st = this._isStatic;
    const wb = this.wrappedBody;

    if (wb) {
      const rb = wb.rigidBody;

      if (rb.type === _index2.ERigidBodyType.STATIC) {
        this._isStatic = true;
        this._isKinematic = false;

        this._initStaticActor();
      } else {
        this._isStatic = false;

        this._initDynamicActor();
      }
    } else {
      this._isStatic = true;
      this._isKinematic = false;

      this._initStaticActor();
    }

    if (st !== this._isStatic) {
      this._switchActor(st);
    }
  }

  _initStaticActor() {
    if (this._staticActor) return;
    const t = (0, _exportPhysx.getTempTransform)(this.node.worldPosition, this.node.worldRotation);
    this._staticActor = this.wrappedWorld.physics.createRigidStatic(t);
    if (this._staticActor.$$) _exportPhysx.PX.IMPL_PTR[this._staticActor.$$.ptr] = this;
  }

  _initDynamicActor() {
    if (this._dynamicActor) return;
    const t = (0, _exportPhysx.getTempTransform)(this.node.worldPosition, this.node.worldRotation);
    this._dynamicActor = this.wrappedWorld.physics.createRigidDynamic(t);
    if (this._dynamicActor.$$) _exportPhysx.PX.IMPL_PTR[this._dynamicActor.$$.ptr] = this;
    const wb = this.wrappedBody;

    if (wb) {
      const rb = wb.rigidBody;

      this._dynamicActor.setMass(rb.mass);

      this._dynamicActor.setActorFlag(_exportPhysx.PX.ActorFlag.eDISABLE_GRAVITY, !rb.useGravity);

      this.setRigidBodyFlag(_exportPhysx.PX.RigidBodyFlag.eKINEMATIC, rb.isKinematic);

      this._dynamicActor.setLinearDamping(rb.linearDamping);

      this._dynamicActor.setAngularDamping(rb.angularDamping);

      const lf = rb.linearFactor;

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_X, !lf.x);

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_Y, !lf.y);

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_LINEAR_Z, !lf.z);

      const af = rb.angularFactor;

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_X, !af.x);

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Y, !af.y);

      this._dynamicActor.setRigidDynamicLockFlag(_exportPhysx.PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Z, !af.z);
    }
  }

  _switchActor(isStaticBefore) {
    if (!this._staticActor || !this._dynamicActor) return;
    const a0 = isStaticBefore ? this._staticActor : this._dynamicActor;
    const a1 = !isStaticBefore ? this._staticActor : this._dynamicActor;

    if (this._index >= 0) {
      this.wrappedWorld.scene.removeActor(a0, false);
      (0, _exportPhysx.addActorToScene)(this.wrappedWorld.scene, a1);
    }

    for (let i = 0; i < this.wrappedShapes.length; i++) {
      const ws = this.wrappedShapes[i];
      a0.detachShape(ws.impl, false);
      a1.attachShape(ws.impl);
    }

    if (isStaticBefore) {
      const da = this._dynamicActor;
      (0, _exportPhysx.setMassAndUpdateInertia)(da, this._wrappedBody.rigidBody.mass);
      const center = _util.VEC3_0;
      center.set(0, 0, 0);

      for (let i = 0; i < this.wrappedShapes.length; i++) {
        const collider = this.wrappedShapes[i].collider;
        if (!collider.isTrigger) center.subtract(collider.center);
      }

      da.setCMassLocalPose((0, _exportPhysx.getTempTransform)(center, _index.Quat.IDENTITY));
    }
  }

  addShape(ws) {
    const index = this.wrappedShapes.indexOf(ws);

    if (index < 0) {
      ws.setIndex(this.wrappedShapes.length);
      ws.updateFilterData(this._filterData);
      this.impl.attachShape(ws.impl);
      this.wrappedShapes.push(ws);

      if (!ws.collider.isTrigger) {
        if (!_index.Vec3.strictEquals(ws.collider.center, _index.Vec3.ZERO)) this.updateCenterOfMass();
        if (this.isDynamic) (0, _exportPhysx.setMassAndUpdateInertia)(this.impl, this._wrappedBody.rigidBody.mass);
      }
    }
  }

  removeShape(ws) {
    const index = this.wrappedShapes.indexOf(ws);

    if (index >= 0) {
      ws.setIndex(-1);
      this.impl.detachShape(ws.impl, true);
      (0, _array.fastRemoveAt)(this.wrappedShapes, index);

      if (!ws.collider.isTrigger) {
        if (!_index.Vec3.strictEquals(ws.collider.center, _index.Vec3.ZERO)) this.updateCenterOfMass();
        if (this.isDynamic) (0, _exportPhysx.setMassAndUpdateInertia)(this.impl, this._wrappedBody.rigidBody.mass);
      }
    }
  }

  addJoint(v, type) {
    if (type) {
      const i = this.wrappedJoints1.indexOf(v);
      if (i < 0) this.wrappedJoints1.push(v);
    } else {
      const i = this.wrappedJoints0.indexOf(v);
      if (i < 0) this.wrappedJoints0.push(v);
    }
  }

  removeJoint(v, type) {
    if (type) {
      const i = this.wrappedJoints1.indexOf(v);
      if (i >= 0) (0, _array.fastRemoveAt)(this.wrappedJoints1, i);
    } else {
      const i = this.wrappedJoints0.indexOf(v);
      if (i >= 0) (0, _array.fastRemoveAt)(this.wrappedJoints0, i);
    }
  }

  setMass(v) {
    if (v <= 0) return;
    if (!this.isDynamic) return;
    (0, _exportPhysx.setMassAndUpdateInertia)(this.impl, v);
  }

  setType(v) {
    this._initActor();

    if (this.isStatic) return;

    switch (v) {
      case _index2.ERigidBodyType.DYNAMIC:
        this.setRigidBodyFlag(_exportPhysx.PX.RigidBodyFlag.eKINEMATIC, false);
        break;

      case _index2.ERigidBodyType.KINEMATIC:
      default:
        this.setRigidBodyFlag(_exportPhysx.PX.RigidBodyFlag.eKINEMATIC, true);
        break;
    }
  }

  setRigidBodyFlag(v, b) {
    if (v === _exportPhysx.PX.RigidBodyFlag.eKINEMATIC) this._isKinematic = b;
    this.impl.setRigidBodyFlag(v, b);
  }

  syncSceneToPhysics() {
    const node = this.node;

    if (node.hasChangedFlags) {
      if (node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) this.syncScale();

      if (this._isKinematic) {
        const trans = (0, _exportPhysx.getTempTransform)(node.worldPosition, node.worldRotation);
        this.impl.setKinematicTarget(trans);
      } else {
        const trans = (0, _exportPhysx.getJsTransform)(node.worldPosition, node.worldRotation);
        this.impl.setGlobalPose(trans, true);
      }
    }
  }

  syncSceneWithCheck() {
    const node = this.node;

    if (node.hasChangedFlags) {
      if (node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) this.syncScale();
      const wp = node.worldPosition;
      const wr = node.worldRotation;
      const pose = this.impl.getGlobalPose();
      const dontUpdate = (0, _exportPhysx.physXEqualsCocosVec3)(pose, wp) && (0, _exportPhysx.physXEqualsCocosQuat)(pose, wr);

      if (!dontUpdate) {
        if (this._isKinematic) {
          const trans = (0, _exportPhysx.getTempTransform)(node.worldPosition, node.worldRotation);
          this.impl.setKinematicTarget(trans);
        } else {
          const trans = (0, _exportPhysx.getJsTransform)(node.worldPosition, node.worldRotation);
          this.impl.setGlobalPose(trans, true);
        }
      }
    }
  }

  syncPhysicsToScene() {
    if (this._isStatic || this._dynamicActor.isSleeping()) return;

    const transform = this._dynamicActor.getGlobalPose();

    (0, _exportPhysx.copyPhysXTransform)(this.node, transform);
  }

  syncScale() {
    for (let i = 0; i < this.wrappedShapes.length; i++) {
      this.wrappedShapes[i].updateScale();
    }

    for (let i = 0; i < this.wrappedJoints0.length; i++) {
      this.wrappedJoints0[i].updateScale0();
    }

    for (let i = 0; i < this.wrappedJoints1.length; i++) {
      this.wrappedJoints1[i].updateScale1();
    }
  }

  setGroup(v) {
    this._filterData.word0 = v;
    this.updateFilterData();
  }

  getGroup() {
    return this._filterData.word0;
  }

  addGroup(v) {
    this._filterData.word0 |= v;
    this.updateFilterData();
  }

  removeGroup(v) {
    this._filterData.word0 &= ~v;
    this.updateFilterData();
  }

  setMask(v) {
    if (v === -1) v = 0xffffffff;
    this._filterData.word1 = v;
    this.updateFilterData();
  }

  getMask() {
    return this._filterData.word1;
  }

  addMask(v) {
    this._filterData.word1 |= v;
    this.updateFilterData();
  }

  removeMask(v) {
    this._filterData.word1 &= ~v;
    this.updateFilterData();
  }

  updateFilterData() {
    for (let i = 0; i < this.wrappedShapes.length; i++) {
      this.wrappedShapes[i].updateFilterData(this._filterData);
    }
  }

  updateCenterOfMass() {
    this._initActor();

    if (this._isStatic) return;
    const center = _util.VEC3_0;
    center.set(0, 0, 0);

    for (let i = 0; i < this.wrappedShapes.length; i++) {
      const collider = this.wrappedShapes[i].collider;
      if (!collider.isTrigger) center.subtract(collider.center);
    }

    this.impl.setCMassLocalPose((0, _exportPhysx.getTempTransform)(center, _index.Quat.IDENTITY));
  }

  clearForces() {
    if (this._isStatic || this._isKinematic) return;
    this.impl.clearForce(_exportPhysx.PX.ForceMode.eFORCE); // this.impl.clearForce(PX.ForceMode.eACCELERATION);

    this.impl.clearForce(_exportPhysx.PX.ForceMode.eIMPULSE); // this.impl.clearForce(PX.ForceMode.eVELOCITY_CHANGE);

    this.impl.clearTorque(_exportPhysx.PX.ForceMode.eFORCE);
    this.impl.clearTorque(_exportPhysx.PX.ForceMode.eIMPULSE);
  }

  clearVelocity() {
    if (this._isStatic || this._isKinematic) return;
    this.impl.setLinearVelocity(_index.Vec3.ZERO, false);
    this.impl.setAngularVelocity(_index.Vec3.ZERO, false);
  }

  destroy() {
    if (this._dynamicActor) {
      if (this._dynamicActor.$$) {
        _exportPhysx.PX.IMPL_PTR[this._dynamicActor.$$.ptr] = null;
        delete _exportPhysx.PX.IMPL_PTR[this._dynamicActor.$$.ptr];
      }

      this._dynamicActor.release();

      this._dynamicActor = null;
    }

    if (this._staticActor) {
      if (this._staticActor.$$) {
        _exportPhysx.PX.IMPL_PTR[this._staticActor.$$.ptr] = null;
        delete _exportPhysx.PX.IMPL_PTR[this._staticActor.$$.ptr];
      }

      this._staticActor.release();

      this._staticActor = null;
    }

    PhysXSharedBody.sharedBodesMap.delete(this.node.uuid);
  }

}

exports.PhysXSharedBody = PhysXSharedBody;
PhysXSharedBody.idCounter = 0;
PhysXSharedBody.sharedBodesMap = new Map();