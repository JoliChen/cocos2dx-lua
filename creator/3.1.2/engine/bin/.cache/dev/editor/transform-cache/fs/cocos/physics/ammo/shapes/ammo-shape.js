"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmmoShape = void 0;

var _ammoInstantiated = _interopRequireDefault(require("../ammo-instantiated.js"));

var _index = require("../../../core/math/index.js");

var _physicsFramework = require("../../../../exports/physics-framework.js");

var _ammoEnum = require("../ammo-enum.js");

var _ammoUtil = require("../ammo-util.js");

var _ammoConst = require("../ammo-const.js");

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

/* eslint-disable new-cap */
const v3_0 = _ammoConst.CC_V3_0;

class AmmoShape {
  updateEventListener() {}

  setMaterial(v) {
    if (!this._isTrigger && this._isEnabled && v) {
      if (this._btCompound) {
        this._btCompound.setMaterial(this._index, v.friction, v.restitution, v.rollingFriction, v.spinningFriction, 2);
      } else {
        this._sharedBody.body.setFriction(v.friction);

        this._sharedBody.body.setRestitution(v.restitution);

        this._sharedBody.body.setRollingFriction(v.rollingFriction);

        this._sharedBody.body.setSpinningFriction(v.spinningFriction);

        this._sharedBody.body.setUserIndex2(2);
      }
    }
  }

  setCenter(v) {
    _index.Vec3.copy(v3_0, v);

    v3_0.multiply(this._collider.node.worldScale);
    (0, _ammoUtil.cocos2AmmoVec3)(this.transform.getOrigin(), v3_0);
    this.updateCompoundTransform();
  }

  setAsTrigger(v) {
    if (this._isTrigger === v) {
      return;
    }

    if (this._isEnabled) {
      this._sharedBody.removeShape(this, !v);

      this._sharedBody.addShape(this, v);
    }

    this._isTrigger = v;
  }

  get attachedRigidBody() {
    if (this._sharedBody.wrappedBody) {
      return this._sharedBody.wrappedBody.rigidBody;
    }

    return null;
  }

  get impl() {
    return this._btShape;
  }

  get collider() {
    return this._collider;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  get index() {
    return this._index;
  }

  constructor(type) {
    this.id = void 0;
    this.type = void 0;
    this._index = -1;
    this._isEnabled = false;
    this._isBinding = false;
    this._isTrigger = false;
    this._btCompound = null;
    this.transform = void 0;
    this.quat = void 0;
    this.scale = void 0;
    this.type = type;
    this.id = AmmoShape.idCounter++;
    this.quat = new _ammoInstantiated.default.btQuaternion();
    this.transform = new _ammoInstantiated.default.btTransform();
    this.transform.setIdentity();
    this.scale = new _ammoInstantiated.default.btVector3(1, 1, 1);
  }

  getAABB(v) {
    const TRANS = _ammoConst.AmmoConstant.instance.TRANSFORM;
    TRANS.setIdentity();
    TRANS.setRotation((0, _ammoUtil.cocos2AmmoQuat)(_ammoConst.AmmoConstant.instance.QUAT_0, this._collider.node.worldRotation));
    const MIN = _ammoConst.AmmoConstant.instance.VECTOR3_0;
    const MAX = _ammoConst.AmmoConstant.instance.VECTOR3_1;

    this._btShape.getAabb(TRANS, MIN, MAX);

    v.halfExtents.set((MAX.x() - MIN.x()) / 2, (MAX.y() - MIN.y()) / 2, (MAX.z() - MIN.z()) / 2);

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  getBoundingSphere(v) {
    v.radius = this._btShape.getLocalBoundingSphere();

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  initialize(com) {
    this._collider = com;
    this._isBinding = true;
    this._sharedBody = _physicsFramework.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
    this.onComponentSet();
    this.setWrapper();
  } // virtual


  onComponentSet() {}

  onLoad() {
    this.setCenter(this._collider.center);
    this.setAsTrigger(this._collider.isTrigger);
  }

  onEnable() {
    this._isEnabled = true;

    this._sharedBody.addShape(this, this._isTrigger);

    this.setMaterial(this.collider.sharedMaterial);
  }

  onDisable() {
    this._isEnabled = false;

    this._sharedBody.removeShape(this, this._isTrigger);
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._btCompound = null;
    this._collider = null;

    const shape = _ammoInstantiated.default.castObject(this._btShape, _ammoInstantiated.default.btCollisionShape);

    shape.wrapped = null;

    _ammoInstantiated.default.destroy(this.quat);

    _ammoInstantiated.default.destroy(this.scale);

    _ammoInstantiated.default.destroy(this.transform);

    if (this._btShape !== _ammoConst.AmmoConstant.instance.EMPTY_SHAPE) {
      _ammoInstantiated.default.destroy(this._btShape);

      (0, _ammoUtil.ammoDeletePtr)(this._btShape, _ammoInstantiated.default.btCollisionShape);
    }

    this._btShape = null;
    this.transform = null;
    this.quat = null;
    this.scale = null;
  }

  updateByReAdd() {
    if (this._isEnabled) {
      this._sharedBody.removeShape(this, this._isTrigger);

      this._sharedBody.addShape(this, this._isTrigger);
    }
  }
  /** group mask */


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

  setCompound(compound) {
    if (this._btCompound) {
      this._btCompound.removeChildShape(this._btShape);

      this._index = -1;
    }

    if (compound) {
      this._index = compound.getNumChildShapes();
      compound.addChildShape(this.transform, this._btShape);
    }

    this._btCompound = compound;
  }

  setWrapper() {
    const shape = _ammoInstantiated.default.castObject(this._btShape, _ammoInstantiated.default.btCollisionShape);

    shape.wrapped = this;
  }

  setScale() {
    this.setCenter(this._collider.center);
  }

  updateCompoundTransform() {
    if (this._btCompound) {
      this._btCompound.updateChildTransform(this.index, this.transform, true);
    } else if (this._isEnabled && !this._isTrigger) {
      if (this._sharedBody && !this._sharedBody.bodyStruct.useCompound) {
        this._sharedBody.dirty |= _ammoEnum.EAmmoSharedBodyDirty.BODY_RE_ADD;
      }
    }
  }

  needCompound() {
    if (this.type === _ammoEnum.AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE) {
      return true;
    }

    if (this._collider.center.equals(_index.Vec3.ZERO)) {
      return false;
    }

    return true;
  }
  /** DEBUG */


  debugTransform(n) {
    if (AmmoShape._debugTransform == null) {
      AmmoShape._debugTransform = new _ammoInstantiated.default.btTransform();
    }

    let wt;

    if (this._isTrigger) {
      wt = this._sharedBody.ghost.getWorldTransform();
    } else {
      wt = this._sharedBody.body.getWorldTransform();
    }

    const lt = this.transform;

    AmmoShape._debugTransform.setIdentity();

    AmmoShape._debugTransform.op_mul(wt).op_mul(lt);

    const origin = AmmoShape._debugTransform.getOrigin();

    n.worldPosition = new _index.Vec3(origin.x(), origin.y(), origin.z());

    const rotation = AmmoShape._debugTransform.getRotation();

    n.worldRotation = new _index.Quat(rotation.x(), rotation.y(), rotation.z(), rotation.w());
    const scale = this.impl.getLocalScaling();
    n.scale = new _index.Vec3(scale.x(), scale.y(), scale.z());
  }

}

exports.AmmoShape = AmmoShape;
AmmoShape.idCounter = 0;
AmmoShape._debugTransform = void 0;