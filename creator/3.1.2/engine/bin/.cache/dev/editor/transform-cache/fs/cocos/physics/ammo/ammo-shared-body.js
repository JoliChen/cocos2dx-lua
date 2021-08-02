"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoSharedBody = void 0;

var _ammoInstantiated = _interopRequireDefault(require("./ammo-instantiated.js"));

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _ammoUtil = require("./ammo-util.js");

var _ammoEnum = require("./ammo-enum.js");

var _ammoInstance = require("./ammo-instance.js");

var _ammoConst = require("./ammo-const.js");

var _index = require("../framework/index.js");

var _physicsEnum = require("../framework/physics-enum.js");

var _array = require("../../core/utils/array.js");

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

/* eslint-disable new-cap */

/**
 * @packageDocumentation
 * @hidden
 */
const v3_0 = _ammoConst.CC_V3_0;
const quat_0 = _ammoConst.CC_QUAT_0;
let sharedIDCounter = 0;
/**
 * shared object, node : shared = 1 : 1
 * body for static \ dynamic \ kinematic (collider)
 * ghost for trigger
 */

class AmmoSharedBody {
  static getSharedBody(node, wrappedWorld, wrappedBody) {
    const key = node.uuid;
    let newSB;

    if (AmmoSharedBody.sharedBodesMap.has(key)) {
      newSB = AmmoSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new AmmoSharedBody(node, wrappedWorld);
      const g = _physicsEnum.PhysicsGroup.DEFAULT;
      const m = _index.PhysicsSystem.instance.collisionMatrix[g];
      newSB._collisionFilterGroup = g;
      newSB._collisionFilterMask = m;
      AmmoSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB._wrappedBody = wrappedBody;
      const g = wrappedBody.rigidBody._group;
      const m = _index.PhysicsSystem.instance.collisionMatrix[g];
      newSB._collisionFilterGroup = g;
      newSB._collisionFilterMask = m;
    }

    return newSB;
  }

  get wrappedBody() {
    return this._wrappedBody;
  }

  get bodyCompoundShape() {
    return this.bodyStruct.shape;
  }

  get ghostCompoundShape() {
    return this.ghostStruct.shape;
  }

  get body() {
    return this.bodyStruct.body;
  }

  get ghost() {
    return this.ghostStruct.ghost;
  }

  get collisionFilterGroup() {
    return this._collisionFilterGroup;
  }

  set collisionFilterGroup(v) {
    if (v !== this._collisionFilterGroup) {
      this._collisionFilterGroup = v;
      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  get collisionFilterMask() {
    return this._collisionFilterMask;
  }

  set collisionFilterMask(v) {
    if (v !== this._collisionFilterMask) {
      this._collisionFilterMask = v;
      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  get bodyStruct() {
    this._instantiateBodyStruct();

    return this._bodyStruct;
  }

  get ghostStruct() {
    this._instantiateGhostStruct();

    return this._ghostStruct;
  }

  /**
   * add or remove from world \
   * add, if enable \
   * remove, if disable & shapes.length == 0 & wrappedBody disable
   */
  set bodyEnabled(v) {
    if (v) {
      if (this.bodyIndex < 0) {
        // add to world only if it is a dynamic body or having shapes.
        if (this.bodyStruct.wrappedShapes.length === 0) {
          if (!this.wrappedBody) return;
          if (!this.wrappedBody.rigidBody.isDynamic) return;
        }

        this.bodyIndex = this.wrappedWorld.bodies.length;
        this.wrappedWorld.addSharedBody(this);
        this.syncInitialBody();
      }
    } else if (this.bodyIndex >= 0) {
      const isRemoveBody = this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody == null || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy;

      if (isRemoveBody) {
        this.body.clearState(); // clear velocity etc.

        this.bodyIndex = -1;
        this.wrappedWorld.removeSharedBody(this);
      }
    }
  }

  set ghostEnabled(v) {
    if (v) {
      if (this.ghostIndex < 0 && this.ghostStruct.wrappedShapes.length > 0) {
        this.ghostIndex = 1;
        this.wrappedWorld.addGhostObject(this);
        this.syncInitialGhost();
      }
    } else if (this.ghostIndex >= 0) {
      /** remove trigger */
      const isRemoveGhost = this.ghostStruct.wrappedShapes.length === 0 && this.ghost;

      if (isRemoveGhost) {
        this.ghostIndex = -1;
        this.wrappedWorld.removeGhostObject(this);
      }
    }
  }

  set reference(v) {
    // eslint-disable-next-line no-unused-expressions
    v ? this.ref++ : this.ref--;

    if (this.ref === 0) {
      this.destroy();
    }
  }

  constructor(node, wrappedWorld) {
    this.id = void 0;
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.wrappedJoints0 = [];
    this.wrappedJoints1 = [];
    this.dirty = 0;
    this._collisionFilterGroup = _index.PhysicsSystem.PhysicsGroup.DEFAULT;
    this._collisionFilterMask = -1;
    this.ref = 0;
    this.bodyIndex = -1;
    this.ghostIndex = -1;
    this._wrappedBody = null;
    this.id = AmmoSharedBody.idCounter++;
    this.wrappedWorld = wrappedWorld;
    this.node = node;
  }

  _instantiateBodyStruct() {
    if (this._bodyStruct) return;
    /** body struct */

    const st = new _ammoInstantiated.default.btTransform();
    st.setIdentity();
    (0, _ammoUtil.cocos2AmmoVec3)(st.getOrigin(), this.node.worldPosition);
    const bodyQuat = new _ammoInstantiated.default.btQuaternion();
    (0, _ammoUtil.cocos2AmmoQuat)(bodyQuat, this.node.worldRotation);
    st.setRotation(bodyQuat);
    const motionState = new _ammoInstantiated.default.btDefaultMotionState(st);
    const localInertia = new _ammoInstantiated.default.btVector3(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
    const bodyShape = new _ammoInstantiated.default.btCompoundShape();
    let mass = 0;

    if (this._wrappedBody && this._wrappedBody.rigidBody.enabled && this._wrappedBody.rigidBody.isDynamic) {
      mass = this._wrappedBody.rigidBody.mass;
    }

    if (mass === 0) localInertia.setValue(0, 0, 0);
    const rbInfo = new _ammoInstantiated.default.btRigidBodyConstructionInfo(mass, motionState, _ammoConst.AmmoConstant.instance.EMPTY_SHAPE, localInertia);
    const body = new _ammoInstantiated.default.btRigidBody(rbInfo);
    const sleepTd = _index.PhysicsSystem.instance.sleepThreshold;
    body.setSleepingThresholds(sleepTd, sleepTd);
    this._bodyStruct = {
      id: sharedIDCounter++,
      body,
      localInertia,
      motionState,
      startTransform: st,
      shape: bodyShape,
      rbInfo,
      worldQuat: bodyQuat,
      wrappedShapes: [],
      useCompound: false
    };
    _ammoInstance.AmmoInstance.bodyStructs[this._bodyStruct.id] = this._bodyStruct;
    this.body.setUserIndex2(2);
    this.body.setUserIndex(this._bodyStruct.id);
    if (_ammoInstantiated.default.CC_CONFIG.ignoreSelfBody && this._ghostStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
    if (this.wrappedBody) this.setBodyType(this.wrappedBody.rigidBody.type);
  }

  _instantiateGhostStruct() {
    if (this._ghostStruct) return;
    /** ghost struct */

    const ghost = new _ammoInstantiated.default.btCollisionObject();
    const ghostShape = new _ammoInstantiated.default.btCompoundShape();
    ghost.setCollisionShape(ghostShape);
    ghost.setCollisionFlags(_ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT | _ammoEnum.AmmoCollisionFlags.CF_NO_CONTACT_RESPONSE);
    this._ghostStruct = {
      id: sharedIDCounter++,
      ghost,
      shape: ghostShape,
      worldQuat: new _ammoInstantiated.default.btQuaternion(),
      wrappedShapes: []
    };
    _ammoInstance.AmmoInstance.ghostStructs[this._ghostStruct.id] = this._ghostStruct;
    this.ghost.setUserIndex2(2);
    this.ghost.setUserIndex(this._ghostStruct.id);
    if (_ammoInstantiated.default.CC_CONFIG.ignoreSelfBody && this._bodyStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
    if (this.wrappedBody) this.setGhostType(this.wrappedBody.rigidBody.type);
  }

  setType(v) {
    this.setBodyType(v);
    this.setGhostType(v);
  }

  setBodyType(v) {
    if (this._bodyStruct && this._wrappedBody) {
      const body = this._bodyStruct.body;
      const wrap = this._wrappedBody;
      const com = wrap.rigidBody;
      let m_bcf = body.getCollisionFlags();
      const localInertia = _ammoConst.AmmoConstant.instance.VECTOR3_0;

      switch (v) {
        case _physicsEnum.ERigidBodyType.DYNAMIC:
          m_bcf &= ~_ammoEnum.AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~_ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          wrap.setMass(com.mass);
          wrap.useGravity(com.useGravity);
          wrap.setAllowSleep(com.allowSleep);
          break;

        case _physicsEnum.ERigidBodyType.KINEMATIC:
          localInertia.setValue(0, 0, 0);
          body.setMassProps(0, localInertia);
          m_bcf |= _ammoEnum.AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_bcf &= ~_ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          body.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
          break;

        case _physicsEnum.ERigidBodyType.STATIC:
        default:
          localInertia.setValue(0, 0, 0);
          body.setMassProps(0, localInertia);
          m_bcf |= _ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT;
          m_bcf &= ~_ammoEnum.AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          body.setCollisionFlags(m_bcf);
          body.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.ISLAND_SLEEPING);
          break;
      }

      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
    }
  }

  setGhostType(v) {
    if (this._ghostStruct) {
      const ghost = this._ghostStruct.ghost;
      let m_gcf = ghost.getCollisionFlags();

      switch (v) {
        case _physicsEnum.ERigidBodyType.DYNAMIC:
        case _physicsEnum.ERigidBodyType.KINEMATIC:
          m_gcf &= ~_ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT;
          m_gcf |= _ammoEnum.AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          ghost.setCollisionFlags(m_gcf);
          ghost.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
          break;

        case _physicsEnum.ERigidBodyType.STATIC:
        default:
          m_gcf &= ~_ammoEnum.AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
          m_gcf |= _ammoEnum.AmmoCollisionFlags.CF_STATIC_OBJECT;
          ghost.setCollisionFlags(m_gcf);
          ghost.forceActivationState(_ammoEnum.AmmoCollisionObjectStates.ISLAND_SLEEPING);
          break;
      }

      this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.GHOST_RE_ADD;
    }
  }

  addShape(v, isTrigger) {
    function switchShape(that, shape) {
      that.body.setCollisionShape(shape);
      that.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;

      if (that._wrappedBody && that._wrappedBody.isEnabled) {
        that._wrappedBody.setMass(that._wrappedBody.rigidBody.mass);
      }
    }

    if (isTrigger) {
      const index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index < 0) {
        this.ghostStruct.wrappedShapes.push(v);
        v.setCompound(this.ghostCompoundShape);
        this.ghostEnabled = true;
      }
    } else {
      const index = this.bodyStruct.wrappedShapes.indexOf(v);

      if (index < 0) {
        this.bodyStruct.wrappedShapes.push(v);

        if (this.bodyStruct.useCompound) {
          v.setCompound(this.bodyCompoundShape);
        } else {
          const l = this.bodyStruct.wrappedShapes.length;

          if (l === 1 && !v.needCompound()) {
            switchShape(this, v.impl);
          } else {
            this.bodyStruct.useCompound = true;

            for (let i = 0; i < l; i++) {
              const childShape = this.bodyStruct.wrappedShapes[i];
              childShape.setCompound(this.bodyCompoundShape);
            }

            switchShape(this, this.bodyStruct.shape);
          }
        }

        this.bodyEnabled = true;
      }
    }
  }

  removeShape(v, isTrigger) {
    if (isTrigger) {
      const index = this.ghostStruct.wrappedShapes.indexOf(v);

      if (index >= 0) {
        (0, _array.fastRemoveAt)(this.ghostStruct.wrappedShapes, index);
        v.setCompound(null);
        this.ghostEnabled = false;
      }
    } else {
      const index = this.bodyStruct.wrappedShapes.indexOf(v);

      if (index >= 0) {
        if (this.bodyStruct.useCompound) {
          v.setCompound(null);
        } else {
          this.body.setCollisionShape(_ammoConst.AmmoConstant.instance.EMPTY_SHAPE);
        }

        this.body.activate(true);
        this.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
        (0, _array.fastRemoveAt)(this.bodyStruct.wrappedShapes, index);
        this.bodyEnabled = false;
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

  updateDirty() {
    if (this.dirty) {
      if (this.bodyIndex >= 0 && this.dirty & _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD) this.updateBodyByReAdd();
      if (this.ghostIndex >= 0 && this.dirty & _ammoEnum.EAmmoSharedBodyDirty.GHOST_RE_ADD) this.updateGhostByReAdd();
      this.dirty = 0;
    }
  }

  syncSceneToPhysics() {
    if (this.node.hasChangedFlags) {
      const wt = this.body.getWorldTransform();
      (0, _ammoUtil.cocos2AmmoVec3)(wt.getOrigin(), this.node.worldPosition);
      (0, _ammoUtil.cocos2AmmoQuat)(this.bodyStruct.worldQuat, this.node.worldRotation);
      wt.setRotation(this.bodyStruct.worldQuat);

      if (this.node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) {
        this.syncBodyScale();
      }

      if (this.body.isKinematicObject()) {
        // Kinematic objects must be updated using motion state
        const ms = this.body.getMotionState();
        if (ms) ms.setWorldTransform(wt);
      } else if (this.isBodySleeping()) this.body.activate();
    }
  }
  /**
   * TODO: use motion state
   */


  syncPhysicsToScene() {
    if (this.body.isStaticOrKinematicObject() || this.isBodySleeping()) {
      return;
    }

    const wt0 = this.bodyStruct.startTransform;
    this.body.getMotionState().getWorldTransform(wt0);
    this.node.worldPosition = (0, _ammoUtil.ammo2CocosVec3)(v3_0, wt0.getOrigin());
    wt0.getBasis().getRotation(this.bodyStruct.worldQuat);
    this.node.worldRotation = (0, _ammoUtil.ammo2CocosQuat)(quat_0, this.bodyStruct.worldQuat); // sync node to ghost

    if (this._ghostStruct) {
      const wt1 = this.ghost.getWorldTransform();
      (0, _ammoUtil.cocos2AmmoVec3)(wt1.getOrigin(), this.node.worldPosition);
      (0, _ammoUtil.cocos2AmmoQuat)(this.ghostStruct.worldQuat, this.node.worldRotation);
      wt1.setRotation(this.ghostStruct.worldQuat);
    }
  }

  syncSceneToGhost() {
    if (this.node.hasChangedFlags) {
      const wt1 = this.ghost.getWorldTransform();
      (0, _ammoUtil.cocos2AmmoVec3)(wt1.getOrigin(), this.node.worldPosition);
      (0, _ammoUtil.cocos2AmmoQuat)(this.ghostStruct.worldQuat, this.node.worldRotation);
      wt1.setRotation(this.ghostStruct.worldQuat);
      if (this.node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) this.syncGhostScale();
      this.ghost.activate();
    }
  }

  syncInitialBody() {
    const wt = this.body.getWorldTransform();
    (0, _ammoUtil.cocos2AmmoVec3)(wt.getOrigin(), this.node.worldPosition);
    (0, _ammoUtil.cocos2AmmoQuat)(this.bodyStruct.worldQuat, this.node.worldRotation);
    wt.setRotation(this.bodyStruct.worldQuat);
    this.syncBodyScale();
    this.body.activate();
  }

  syncInitialGhost() {
    const wt1 = this.ghost.getWorldTransform();
    (0, _ammoUtil.cocos2AmmoVec3)(wt1.getOrigin(), this.node.worldPosition);
    (0, _ammoUtil.cocos2AmmoQuat)(this.ghostStruct.worldQuat, this.node.worldRotation);
    wt1.setRotation(this.ghostStruct.worldQuat);
    this.syncGhostScale();
    this.ghost.activate();
  }

  syncBodyScale() {
    for (let i = 0; i < this.bodyStruct.wrappedShapes.length; i++) {
      this.bodyStruct.wrappedShapes[i].setScale();
    }

    for (let i = 0; i < this.wrappedJoints0.length; i++) {
      this.wrappedJoints0[i].updateScale0();
    }

    for (let i = 0; i < this.wrappedJoints1.length; i++) {
      this.wrappedJoints1[i].updateScale1();
    }
  }

  syncGhostScale() {
    for (let i = 0; i < this.ghostStruct.wrappedShapes.length; i++) {
      this.ghostStruct.wrappedShapes[i].setScale();
    }
  }
  /**
   * see: https://pybullet.org/Bullet/phpBB3/viewtopic.php?f=9&t=5312&p=19094&hilit=how+to+change+group+mask#p19097
   */


  updateBodyByReAdd() {
    if (this.bodyIndex >= 0) {
      this.wrappedWorld.removeSharedBody(this);
      this.bodyIndex = this.wrappedWorld.bodies.length;
      this.wrappedWorld.addSharedBody(this);
    }
  }

  updateGhostByReAdd() {
    if (this.ghostIndex >= 0) {
      this.wrappedWorld.removeGhostObject(this);
      this.ghostIndex = this.wrappedWorld.ghosts.length;
      this.wrappedWorld.addGhostObject(this);
    }
  }

  destroy() {
    AmmoSharedBody.sharedBodesMap.delete(this.node.uuid);
    this.node = null;
    this.wrappedWorld = null;

    if (this._bodyStruct) {
      const bodyStruct = this._bodyStruct;

      _ammoInstantiated.default.destroy(bodyStruct.localInertia);

      _ammoInstantiated.default.destroy(bodyStruct.worldQuat);

      _ammoInstantiated.default.destroy(bodyStruct.startTransform);

      _ammoInstantiated.default.destroy(bodyStruct.motionState);

      _ammoInstantiated.default.destroy(bodyStruct.rbInfo);

      _ammoInstantiated.default.destroy(bodyStruct.shape);

      (0, _ammoUtil.ammoDeletePtr)(bodyStruct.shape, _ammoInstantiated.default.btCollisionShape);

      const body = _ammoInstantiated.default.castObject(bodyStruct.body, _ammoInstantiated.default.btRigidBody);

      body.wrapped = null; // Ammo.destroy(bodyStruct.body);

      (0, _ammoUtil.ammoDeletePtr)(bodyStruct.body, _ammoInstantiated.default.btRigidBody);
      (0, _ammoUtil.ammoDeletePtr)(bodyStruct.body, _ammoInstantiated.default.btCollisionObject);
      delete _ammoInstance.AmmoInstance.bodyStructs[bodyStruct.id];
      this._bodyStruct = null;
    }

    if (this._ghostStruct) {
      const ghostStruct = this._ghostStruct;

      _ammoInstantiated.default.destroy(ghostStruct.worldQuat);

      _ammoInstantiated.default.destroy(ghostStruct.shape);

      (0, _ammoUtil.ammoDeletePtr)(ghostStruct.shape, _ammoInstantiated.default.btCollisionShape);

      _ammoInstantiated.default.destroy(ghostStruct.ghost);

      delete _ammoInstance.AmmoInstance.bodyStructs[ghostStruct.id];
      this._ghostStruct = null;
    }
  }

  isBodySleeping() {
    const state = this.body.getActivationState();
    return state === _ammoEnum.AmmoCollisionObjectStates.ISLAND_SLEEPING;
  }

}

exports.AmmoSharedBody = AmmoSharedBody;
AmmoSharedBody.idCounter = 0;
AmmoSharedBody.sharedBodesMap = new Map();