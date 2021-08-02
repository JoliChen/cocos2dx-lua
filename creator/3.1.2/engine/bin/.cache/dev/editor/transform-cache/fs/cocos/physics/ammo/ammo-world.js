"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoWorld = void 0;

var _ammoInstantiated = _interopRequireDefault(require("./ammo-instantiated.js"));

var _index = require("../../core/math/index.js");

var _ammoSharedBody = require("./ammo-shared-body.js");

var _arrayCollisionMatrix = require("../utils/array-collision-matrix.js");

var _tupleDictionary = require("../utils/tuple-dictionary.js");

var _ammoConst = require("./ammo-const.js");

var _ammoUtil = require("./ammo-util.js");

var _index2 = require("../../core/index.js");

var _ammoInstance = require("./ammo-instance.js");

var _ammoContactEquation = require("./ammo-contact-equation.js");

var _array = require("../../core/utils/array.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable new-cap */

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
const contactsPool = [];
const v3_0 = _ammoConst.CC_V3_0;
const v3_1 = _ammoConst.CC_V3_1;

class AmmoWorld {
  setAllowSleep(v) {}

  setDefaultMaterial(v) {}

  setGravity(gravity) {
    const TMP = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    (0, _ammoUtil.cocos2AmmoVec3)(TMP, gravity);

    this._btWorld.setGravity(TMP);
  }

  get impl() {
    return this._btWorld;
  }

  constructor(options) {
    this._btWorld = void 0;
    this._btBroadphase = void 0;
    this._btSolver = void 0;
    this._btDispatcher = void 0;
    this._btCollisionConfiguration = void 0;
    this.bodies = [];
    this.ghosts = [];
    this.constraints = [];
    this.triggerArrayMat = new _arrayCollisionMatrix.ArrayCollisionMatrix();
    this.collisionArrayMat = new _arrayCollisionMatrix.ArrayCollisionMatrix();
    this.contactsDic = new _tupleDictionary.TupleDictionary();
    this.oldContactsDic = new _tupleDictionary.TupleDictionary();
    this._btCollisionConfiguration = new _ammoInstantiated.default.btDefaultCollisionConfiguration();
    this._btDispatcher = new _ammoInstantiated.default.btCollisionDispatcher(this._btCollisionConfiguration); // this._btDispatcher.setDispatcherFlags(AmmoDispatcherFlags.CD_STATIC_STATIC_REPORTED);

    this._btBroadphase = new _ammoInstantiated.default.btDbvtBroadphase();
    this._btSolver = new _ammoInstantiated.default.btSequentialImpulseConstraintSolver();
    this._btWorld = new _ammoInstantiated.default.btDiscreteDynamicsWorld(this._btDispatcher, this._btBroadphase, this._btSolver, this._btCollisionConfiguration);

    this._btWorld.getPairCache().setOverlapFilterCallback(new _ammoInstantiated.default.ccOverlapFilterCallback()); // this._btWorld.setContactBreakingThreshold(0.04);


    const TMP = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    TMP.setValue(0, -10, 0);

    this._btWorld.setGravity(TMP);

    if (!AmmoWorld.closeHitCB) AmmoWorld.closeHitCB = new _ammoInstantiated.default.ClosestRayResultCallback(TMP, TMP);
    if (!AmmoWorld.allHitsCB) AmmoWorld.allHitsCB = new _ammoInstantiated.default.AllHitsRayResultCallback(TMP, TMP);
    AmmoWorld.closeHitCB.setUseCC(true);
    AmmoWorld.allHitsCB.setUseCC(true);
  }

  destroy() {
    if (this.constraints.length || this.bodies.length) (0, _index2.error)('You should destroy all physics component first.');

    _ammoInstantiated.default.destroy(this._btWorld);

    _ammoInstantiated.default.destroy(this._btSolver);

    _ammoInstantiated.default.destroy(this._btBroadphase);

    _ammoInstantiated.default.destroy(this._btDispatcher);

    _ammoInstantiated.default.destroy(this._btCollisionConfiguration);

    this._btCollisionConfiguration = null;
    this._btDispatcher = null;
    this._btBroadphase = null;
    this._btSolver = null;
    this._btWorld = null;
    this.bodies = null;
    this.ghosts = null;
    this.constraints = null;
    this.triggerArrayMat = null;
    this.collisionArrayMat = null;
    this.contactsDic = null;
    this.oldContactsDic = null;
    contactsPool.length = 0;
  }

  step(deltaTime, timeSinceLastCalled, maxSubStep = 0) {
    if (this.bodies.length === 0 && this.ghosts.length === 0) return;
    if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;

    this._btWorld.stepSimulation(timeSinceLastCalled, maxSubStep, deltaTime);

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncPhysicsToScene();
    }
  }

  syncSceneToPhysics() {
    for (let i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].updateDirty();
      this.ghosts[i].syncSceneToGhost();
    }

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].updateDirty();
      this.bodies[i].syncSceneToPhysics();
    }
  }

  syncAfterEvents() {
    this.syncSceneToPhysics();
  }

  raycast(worldRay, options, pool, results) {
    const allHitsCB = AmmoWorld.allHitsCB;
    const from = (0, _ammoUtil.cocos2AmmoVec3)(allHitsCB.m_rayFromWorld, worldRay.o);
    worldRay.computeHit(v3_0, options.maxDistance);
    const to = (0, _ammoUtil.cocos2AmmoVec3)(allHitsCB.m_rayToWorld, v3_0);
    allHitsCB.m_collisionFilterGroup = -1;
    allHitsCB.m_collisionFilterMask = options.mask;
    allHitsCB.m_closestHitFraction = 1;
    allHitsCB.m_shapePart = -1;
    allHitsCB.m_collisionObject = null;
    allHitsCB.m_shapeParts.clear();
    allHitsCB.m_hitFractions.clear();
    allHitsCB.m_collisionObjects.clear();
    const hp = allHitsCB.m_hitPointWorld;
    const hn = allHitsCB.m_hitNormalWorld;
    hp.clear();
    hn.clear();

    this._btWorld.rayTest(from, to, allHitsCB);

    if (allHitsCB.hasHit()) {
      for (let i = 0, n = allHitsCB.m_collisionObjects.size(); i < n; i++) {
        const btObj = allHitsCB.m_collisionObjects.at(i);
        const btCs = btObj.getCollisionShape();
        let shape;

        if (btCs.isCompound()) {
          const shapeIndex = allHitsCB.m_shapeParts.at(i);
          const index = btObj.getUserIndex();
          const shared = _ammoInstance.AmmoInstance.bodyAndGhosts[index];
          shape = shared.wrappedShapes[shapeIndex];
        } else {
          shape = btCs.wrapped;
        }

        (0, _ammoUtil.ammo2CocosVec3)(v3_0, hp.at(i));
        (0, _ammoUtil.ammo2CocosVec3)(v3_1, hn.at(i));

        const distance = _index.Vec3.distance(worldRay.o, v3_0);

        const r = pool.add();

        r._assign(v3_0, distance, shape.collider, v3_1);

        results.push(r);
      }

      return true;
    }

    return false;
  }
  /**
   * Ray cast, and return information of the closest hit.
   * @return True if any body was hit.
   */


  raycastClosest(worldRay, options, result) {
    const closeHitCB = AmmoWorld.closeHitCB;
    const from = (0, _ammoUtil.cocos2AmmoVec3)(closeHitCB.m_rayFromWorld, worldRay.o);
    worldRay.computeHit(v3_0, options.maxDistance);
    const to = (0, _ammoUtil.cocos2AmmoVec3)(closeHitCB.m_rayToWorld, v3_0);
    closeHitCB.m_collisionFilterGroup = -1;
    closeHitCB.m_collisionFilterMask = options.mask;
    closeHitCB.m_closestHitFraction = 1;
    closeHitCB.m_collisionObject = null;

    this._btWorld.rayTest(from, to, closeHitCB);

    if (closeHitCB.hasHit()) {
      const btObj = closeHitCB.m_collisionObject;
      const btCs = btObj.getCollisionShape();
      let shape;

      if (btCs.isCompound()) {
        const index = btObj.getUserIndex();
        const shared = _ammoInstance.AmmoInstance.bodyAndGhosts[index];
        const shapeIndex = closeHitCB.m_shapePart;
        shape = shared.wrappedShapes[shapeIndex];
      } else {
        shape = btCs.wrapped;
      }

      (0, _ammoUtil.ammo2CocosVec3)(v3_0, closeHitCB.m_hitPointWorld);
      (0, _ammoUtil.ammo2CocosVec3)(v3_1, closeHitCB.m_hitNormalWorld);

      const distance = _index.Vec3.distance(worldRay.o, v3_0);

      result._assign(v3_0, distance, shape.collider, v3_1);

      return true;
    }

    return false;
  }

  getSharedBody(node, wrappedBody) {
    return _ammoSharedBody.AmmoSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      this._btWorld.addRigidBody(sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  }

  removeSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.bodies, i);

      this._btWorld.removeRigidBody(sharedBody.body);
    }
  }

  addGhostObject(sharedBody) {
    const i = this.ghosts.indexOf(sharedBody);

    if (i < 0) {
      this.ghosts.push(sharedBody);

      this._btWorld.addCollisionObject(sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
    }
  }

  removeGhostObject(sharedBody) {
    const i = this.ghosts.indexOf(sharedBody);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.ghosts, i);

      this._btWorld.removeCollisionObject(sharedBody.ghost);
    }
  }

  addConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i < 0) {
      this.constraints.push(constraint);

      this._btWorld.addConstraint(constraint.impl, !constraint.constraint.enableCollision);

      constraint.index = i;
    }
  }

  removeConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i >= 0) {
      this.constraints.splice(i, 1);

      this._btWorld.removeConstraint(constraint.impl);

      constraint.index = -1;
    }
  }

  emitEvents() {
    const numManifolds = this._btDispatcher.getNumManifolds();

    for (let i = 0; i < numManifolds; i++) {
      const manifold = this._btDispatcher.getManifoldByIndexInternal(i);

      const body0 = manifold.getBody0();
      const body1 = manifold.getBody1(); // TODO: SUPPORT CHARACTER EVENT

      if (body0.useCharacter || body1.useCharacter) {
        continue;
      }

      const numContacts = manifold.getNumContacts();

      for (let j = 0; j < numContacts; j++) {
        const manifoldPoint = manifold.getContactPoint(j);
        const s0 = manifoldPoint.getShape0();
        const s1 = manifoldPoint.getShape1();
        let shape0;
        let shape1;

        if (s0.isCompound()) {
          const com = _ammoInstantiated.default.castObject(s0, _ammoInstantiated.default.btCompoundShape);

          shape0 = com.getChildShape(manifoldPoint.m_index0).wrapped;
        } else {
          shape0 = s0.wrapped;
        }

        if (s1.isCompound()) {
          const com = _ammoInstantiated.default.castObject(s1, _ammoInstantiated.default.btCompoundShape);

          shape1 = com.getChildShape(manifoldPoint.m_index1).wrapped;
        } else {
          shape1 = s1.wrapped;
        }

        if (!shape0 || !shape1) continue;

        if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent || shape0.collider.needCollisionEvent || shape1.collider.needCollisionEvent) {
          // current contact
          let item = this.contactsDic.get(shape0.id, shape1.id);

          if (item == null) {
            item = this.contactsDic.set(shape0.id, shape1.id, {
              shape0,
              shape1,
              contacts: [],
              impl: manifold
            });
          }

          item.contacts.push(manifoldPoint);
        }
      }
    } // is enter or stay


    let dicL = this.contactsDic.getLength();

    while (dicL--) {
      contactsPool.push.apply(contactsPool, _ammoConst.CollisionEventObject.contacts);
      _ammoConst.CollisionEventObject.contacts.length = 0;
      const key = this.contactsDic.getKeyByIndex(dicL);
      const data = this.contactsDic.getDataByKey(key);
      const shape0 = data.shape0;
      const shape1 = data.shape1;
      this.oldContactsDic.set(shape0.id, shape1.id, data);
      const collider0 = shape0.collider;
      const collider1 = shape1.collider;

      if (collider0 && collider1) {
        const isTrigger = collider0.isTrigger || collider1.isTrigger;

        if (isTrigger) {
          if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
            _ammoConst.TriggerEventObject.type = 'onTriggerStay';
          } else {
            _ammoConst.TriggerEventObject.type = 'onTriggerEnter';
            this.triggerArrayMat.set(shape0.id, shape1.id, true);
          }

          _ammoConst.TriggerEventObject.impl = data.impl;
          _ammoConst.TriggerEventObject.selfCollider = collider0;
          _ammoConst.TriggerEventObject.otherCollider = collider1;
          collider0.emit(_ammoConst.TriggerEventObject.type, _ammoConst.TriggerEventObject);
          _ammoConst.TriggerEventObject.selfCollider = collider1;
          _ammoConst.TriggerEventObject.otherCollider = collider0;
          collider1.emit(_ammoConst.TriggerEventObject.type, _ammoConst.TriggerEventObject);
        } else {
          const body0 = collider0.attachedRigidBody;
          const body1 = collider1.attachedRigidBody;

          if (body0 && body1) {
            if (body0.isSleeping && body1.isSleeping) continue;
          } else if (body0 == null && body1) {
            if (body1.isSleeping) continue;
          } else if (body1 == null && body0) {
            if (body0.isSleeping) continue;
          }

          if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
            _ammoConst.CollisionEventObject.type = 'onCollisionStay';
          } else {
            _ammoConst.CollisionEventObject.type = 'onCollisionEnter';
            this.collisionArrayMat.set(shape0.id, shape1.id, true);
          }

          for (let i = 0; i < data.contacts.length; i++) {
            const cq = data.contacts[i];

            if (contactsPool.length > 0) {
              const c = contactsPool.pop();
              c.impl = cq;

              _ammoConst.CollisionEventObject.contacts.push(c);
            } else {
              const c = new _ammoContactEquation.AmmoContactEquation(_ammoConst.CollisionEventObject);
              c.impl = cq;

              _ammoConst.CollisionEventObject.contacts.push(c);
            }
          }

          _ammoConst.CollisionEventObject.impl = data.impl;
          _ammoConst.CollisionEventObject.selfCollider = collider0;
          _ammoConst.CollisionEventObject.otherCollider = collider1;
          collider0.emit(_ammoConst.CollisionEventObject.type, _ammoConst.CollisionEventObject);
          _ammoConst.CollisionEventObject.selfCollider = collider1;
          _ammoConst.CollisionEventObject.otherCollider = collider0;
          collider1.emit(_ammoConst.CollisionEventObject.type, _ammoConst.CollisionEventObject);
        }

        if (this.oldContactsDic.get(shape0.id, shape1.id) == null) {
          this.oldContactsDic.set(shape0.id, shape1.id, data);
        }
      }
    } // is exit


    let oldDicL = this.oldContactsDic.getLength();

    while (oldDicL--) {
      const key = this.oldContactsDic.getKeyByIndex(oldDicL);
      const data = this.oldContactsDic.getDataByKey(key);
      const shape0 = data.shape0;
      const shape1 = data.shape1;
      const collider0 = shape0.collider;
      const collider1 = shape1.collider;

      if (collider0 && collider1) {
        const isTrigger = collider0.isTrigger || collider1.isTrigger;

        if (this.contactsDic.getDataByKey(key) == null) {
          if (isTrigger) {
            if (this.triggerArrayMat.get(shape0.id, shape1.id)) {
              _ammoConst.TriggerEventObject.type = 'onTriggerExit';
              _ammoConst.TriggerEventObject.selfCollider = collider0;
              _ammoConst.TriggerEventObject.otherCollider = collider1;
              collider0.emit(_ammoConst.TriggerEventObject.type, _ammoConst.TriggerEventObject);
              _ammoConst.TriggerEventObject.selfCollider = collider1;
              _ammoConst.TriggerEventObject.otherCollider = collider0;
              collider1.emit(_ammoConst.TriggerEventObject.type, _ammoConst.TriggerEventObject);
              this.triggerArrayMat.set(shape0.id, shape1.id, false);
              this.oldContactsDic.set(shape0.id, shape1.id, null);
            }
          } else if (this.collisionArrayMat.get(shape0.id, shape1.id)) {
            contactsPool.push.apply(contactsPool, _ammoConst.CollisionEventObject.contacts);
            _ammoConst.CollisionEventObject.contacts.length = 0;
            _ammoConst.CollisionEventObject.type = 'onCollisionExit';
            _ammoConst.CollisionEventObject.selfCollider = collider0;
            _ammoConst.CollisionEventObject.otherCollider = collider1;
            collider0.emit(_ammoConst.CollisionEventObject.type, _ammoConst.CollisionEventObject);
            _ammoConst.CollisionEventObject.selfCollider = collider1;
            _ammoConst.CollisionEventObject.otherCollider = collider0;
            collider1.emit(_ammoConst.CollisionEventObject.type, _ammoConst.CollisionEventObject);
            this.collisionArrayMat.set(shape0.id, shape1.id, false);
            this.oldContactsDic.set(shape0.id, shape1.id, null);
          }
        }
      }
    }

    this.contactsDic.reset();
  }

}

exports.AmmoWorld = AmmoWorld;
AmmoWorld.closeHitCB = void 0;
AmmoWorld.allHitsCB = void 0;