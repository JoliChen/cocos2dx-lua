"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonShape = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../../core/math/index.js");

var _util = require("../../utils/util.js");

var _cannonUtil = require("../cannon-util.js");

var _physicsSystem = require("../../framework/physics-system.js");

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
const TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: null
};
const cannonQuat_0 = new _cannon.default.Quaternion();
const cannonVec3_0 = new _cannon.default.Vec3();
const cannonVec3_1 = new _cannon.default.Vec3();

class CannonShape {
  constructor() {
    this._offset = new _cannon.default.Vec3();
    this._orient = new _cannon.default.Quaternion();
    this._index = -1;
    this.onTriggerListener = this._onTrigger.bind(this);
    this._isBinding = false;
  }

  updateEventListener() {}

  get impl() {
    return this._shape;
  }

  get collider() {
    return this._collider;
  }

  get attachedRigidBody() {
    if (this._sharedBody.wrappedBody) {
      return this._sharedBody.wrappedBody.rigidBody;
    }

    return null;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  setMaterial(mat) {
    if (mat == null) {
      this._shape.material = null;
    } else {
      if (CannonShape.idToMaterial[mat.id] == null) {
        CannonShape.idToMaterial[mat.id] = new _cannon.default.Material(mat.id);
      }

      this._shape.material = CannonShape.idToMaterial[mat.id];
      const smat = this._shape.material;
      smat.friction = mat.friction;
      smat.restitution = mat.restitution;
      const coef = _cannon.default.CC_CONFIG.correctInelastic;
      smat.correctInelastic = smat.restitution === 0 ? coef : 0;
    }
  }

  setAsTrigger(v) {
    this._shape.collisionResponse = !v;

    if (this._index >= 0) {
      this._body.updateHasTrigger();
    }
  }

  setCenter(v) {
    this._setCenter(v);

    if (this._index >= 0) {
      (0, _cannonUtil.commitShapeUpdates)(this._body);
    }
  }

  setAttachedBody(v) {
    if (v) {
      if (this._sharedBody) {
        if (this._sharedBody.wrappedBody === v.body) return;
        this._sharedBody.reference = false;
      }

      this._sharedBody = _physicsSystem.PhysicsSystem.instance.physicsWorld.getSharedBody(v.node);
      this._sharedBody.reference = true;
    } else {
      if (this._sharedBody) {
        this._sharedBody.reference = false;
      }

      this._sharedBody = _physicsSystem.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
      this._sharedBody.reference = true;
    }
  }

  getAABB(v) {
    _index.Quat.copy(cannonQuat_0, this._collider.node.worldRotation);

    this._shape.calculateWorldAABB(_cannon.default.Vec3.ZERO, cannonQuat_0, cannonVec3_0, cannonVec3_1);

    _index.Vec3.subtract(v.halfExtents, cannonVec3_1, cannonVec3_0);

    _index.Vec3.multiplyScalar(v.halfExtents, v.halfExtents, 0.5);

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  getBoundingSphere(v) {
    v.radius = this._shape.boundingSphereRadius;

    _index.Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
  }

  get _body() {
    return this._sharedBody.body;
  }

  /** LIFECYCLE */
  initialize(comp) {
    this._collider = comp;
    this._isBinding = true;
    this._sharedBody = _physicsSystem.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
    this.onComponentSet();
    (0, _util.setWrap)(this._shape, this);

    this._shape.addEventListener('cc-trigger', this.onTriggerListener);
  } // virtual


  onComponentSet() {}

  onLoad() {
    this.setMaterial(this._collider.sharedMaterial);
    this.setCenter(this._collider.center);
    this.setAsTrigger(this._collider.isTrigger);
  }

  onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  }

  onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;

    this._shape.removeEventListener('cc-trigger', this.onTriggerListener);

    delete _cannon.default.World.idToShapeMap[this._shape.id];
    this._sharedBody = null;
    (0, _util.setWrap)(this._shape, null);
    this._offset = null;
    this._orient = null;
    this._shape = null;
    this._collider = null;
    this.onTriggerListener = null;
  }
  /** INTERFACE */

  /** group */


  getGroup() {
    return this._body.collisionFilterGroup;
  }

  setGroup(v) {
    this._body.collisionFilterGroup = v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }

  addGroup(v) {
    this._body.collisionFilterGroup |= v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }

  removeGroup(v) {
    this._body.collisionFilterGroup &= ~v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }
  /** mask */


  getMask() {
    return this._body.collisionFilterMask;
  }

  setMask(v) {
    this._body.collisionFilterMask = v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }

  addMask(v) {
    this._body.collisionFilterMask |= v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }

  removeMask(v) {
    this._body.collisionFilterMask &= ~v;
    if (!this._body.isAwake()) this._body.wakeUp();
  }
  /**
   * change scale will recalculate center & size \
   * size handle by child class
   * @param scale
   */


  setScale(scale) {
    this._setCenter(this._collider.center);
  }

  setIndex(index) {
    this._index = index;
  }

  setOffsetAndOrient(offset, orient) {
    _index.Vec3.copy(offset, this._offset);

    _index.Quat.copy(orient, this._orient);

    this._offset = offset;
    this._orient = orient;
  }

  _setCenter(v) {
    const lpos = this._offset;

    _index.Vec3.subtract(lpos, this._sharedBody.node.worldPosition, this._collider.node.worldPosition);

    _index.Vec3.add(lpos, lpos, v);

    _index.Vec3.multiply(lpos, lpos, this._collider.node.worldScale);
  }

  _onTrigger(event) {
    TriggerEventObject.type = event.event;
    const self = (0, _util.getWrap)(event.selfShape);
    const other = (0, _util.getWrap)(event.otherShape);

    if (self && self.collider.needTriggerEvent) {
      TriggerEventObject.selfCollider = self.collider;
      TriggerEventObject.otherCollider = other ? other.collider : null;
      TriggerEventObject.impl = event;

      this._collider.emit(TriggerEventObject.type, TriggerEventObject);
    }
  }

}

exports.CannonShape = CannonShape;
CannonShape.idToMaterial = {};