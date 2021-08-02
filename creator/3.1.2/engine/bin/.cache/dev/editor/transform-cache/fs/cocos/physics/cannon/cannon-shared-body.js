"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonSharedBody = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../core/math/index.js");

var _physicsEnum = require("../framework/physics-enum.js");

var _util = require("../utils/util.js");

var _physicsFramework = require("../../../exports/physics-framework.js");

var _nodeEnum = require("../../core/scene-graph/node-enum.js");

var _cannonUtil = require("./cannon-util.js");

var _cannonContactEquation = require("./cannon-contact-equation.js");

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

/**
 * @packageDocumentation
 * @hidden
 */
const v3_0 = new _index.Vec3();
const quat_0 = new _index.Quat();
const contactsPool = [];
const CollisionEventObject = {
  type: 'onCollisionEnter',
  selfCollider: null,
  otherCollider: null,
  contacts: [],
  impl: null
};
/**
 * node : shared-body = 1 : 1
 * static
 */

class CannonSharedBody {
  static getSharedBody(node, wrappedWorld, wrappedBody) {
    const key = node.uuid;
    let newSB;

    if (CannonSharedBody.sharedBodesMap.has(key)) {
      newSB = CannonSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new CannonSharedBody(node, wrappedWorld);
      const g = _physicsEnum.PhysicsGroup.DEFAULT;
      const m = _physicsFramework.PhysicsSystem.instance.collisionMatrix[g];
      newSB.body.collisionFilterGroup = g;
      newSB.body.collisionFilterMask = m;
      CannonSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB.wrappedBody = wrappedBody;
      const g = wrappedBody.rigidBody._group;
      const m = _physicsFramework.PhysicsSystem.instance.collisionMatrix[g];
      newSB.body.collisionFilterGroup = g;
      newSB.body.collisionFilterMask = m;
    }

    return newSB;
  }

  /**
   * add or remove from world \
   * add, if enable \
   * remove, if disable & shapes.length == 0 & wrappedBody disable
   */
  set enabled(v) {
    if (v) {
      if (this.index < 0) {
        this.index = this.wrappedWorld.bodies.length;
        this.wrappedWorld.addSharedBody(this);
        this.syncInitial();
      }
    } else if (this.index >= 0) {
      const isRemove = this.wrappedShapes.length === 0 && this.wrappedBody == null || this.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled;

      if (isRemove) {
        this.body.sleep(); // clear velocity etc.

        this.index = -1;
        this.wrappedWorld.removeSharedBody(this);
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
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.body = void 0;
    this.wrappedShapes = [];
    this.wrappedJoints0 = [];
    this.wrappedJoints1 = [];
    this.wrappedBody = null;
    this.index = -1;
    this.ref = 0;
    this.onCollidedListener = this.onCollided.bind(this);
    this.wrappedWorld = wrappedWorld;
    this.node = node;
    this.body = new _cannon.default.Body();
    (0, _util.setWrap)(this.body, this);
    this.body.collisionFilterGroup = _physicsFramework.PhysicsSystem.PhysicsGroup.DEFAULT;
    this.body.sleepSpeedLimit = _physicsFramework.PhysicsSystem.instance.sleepThreshold;
    this.body.material = this.wrappedWorld.impl.defaultMaterial;
    this.body.addEventListener('cc-collide', this.onCollidedListener);
  }

  addShape(v) {
    const index = this.wrappedShapes.indexOf(v);

    if (index < 0) {
      const index = this.body.shapes.length;
      this.body.addShape(v.impl);
      this.wrappedShapes.push(v);
      v.setIndex(index);
      const offset = this.body.shapeOffsets[index];
      const orient = this.body.shapeOrientations[index];
      v.setOffsetAndOrient(offset, orient);
      if (this.body.isSleeping()) this.body.wakeUp();
    }
  }

  removeShape(v) {
    const index = this.wrappedShapes.indexOf(v);

    if (index >= 0) {
      (0, _array.fastRemoveAt)(this.wrappedShapes, index);
      this.body.removeShape(v.impl);
      v.setIndex(-1);
      if (this.body.isSleeping()) this.body.wakeUp();
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

  syncSceneToPhysics() {
    const node = this.node;
    const body = this.body;

    if (node.hasChangedFlags) {
      if (body.isSleeping()) body.wakeUp();

      _index.Vec3.copy(body.position, node.worldPosition);

      _index.Quat.copy(body.quaternion, node.worldRotation);

      body.aabbNeedsUpdate = true;
      if (node.hasChangedFlags & _nodeEnum.TransformBit.SCALE) this.syncScale();
    }
  }

  syncPhysicsToScene() {
    const n = this.node;
    const b = this.body;

    if (b.type === _physicsEnum.ERigidBodyType.DYNAMIC) {
      if (!b.isSleeping()) {
        _index.Vec3.copy(v3_0, b.position);

        _index.Quat.copy(quat_0, b.quaternion);

        n.worldPosition = v3_0;
        n.worldRotation = quat_0;
      }
    }
  }

  syncInitial() {
    const n = this.node;
    const b = this.body;

    _index.Vec3.copy(b.position, n.worldPosition);

    _index.Quat.copy(b.quaternion, n.worldRotation);

    _index.Vec3.copy(b.previousPosition, n.worldPosition);

    _index.Quat.copy(b.previousQuaternion, n.worldRotation);

    b.aabbNeedsUpdate = true;
    this.syncScale();
    if (b.isSleeping()) b.wakeUp();
  }

  syncScale() {
    for (let i = 0; i < this.wrappedShapes.length; i++) {
      this.wrappedShapes[i].setScale(this.node.worldScale);
    }

    for (let i = 0; i < this.wrappedJoints0.length; i++) {
      this.wrappedJoints0[i].updateScale0();
    }

    for (let i = 0; i < this.wrappedJoints1.length; i++) {
      this.wrappedJoints1[i].updateScale1();
    }

    (0, _cannonUtil.commitShapeUpdates)(this.body);
  }

  destroy() {
    (0, _util.setWrap)(this.body, null);
    this.body.removeEventListener('cc-collide', this.onCollidedListener);
    CannonSharedBody.sharedBodesMap.delete(this.node.uuid);
    delete _cannon.default.World.idToBodyMap[this.body.id];
    this.node = null;
    this.wrappedWorld = null;
    this.body = null;
    this.wrappedShapes = null;
    this.wrappedJoints0 = null;
    this.wrappedJoints1 = null;
    this.onCollidedListener = null;
  }

  onCollided(event) {
    CollisionEventObject.type = event.event;
    const self = (0, _util.getWrap)(event.selfShape);
    const other = (0, _util.getWrap)(event.otherShape);

    if (self && self.collider.needCollisionEvent) {
      contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
      CollisionEventObject.contacts.length = 0;
      CollisionEventObject.impl = event;
      CollisionEventObject.selfCollider = self.collider;
      CollisionEventObject.otherCollider = other ? other.collider : null;
      let i = 0;

      if (CollisionEventObject.type !== 'onCollisionExit') {
        for (i = 0; i < event.contacts.length; i++) {
          const cq = event.contacts[i];

          if (contactsPool.length > 0) {
            const c = contactsPool.pop();
            c.impl = cq;
            CollisionEventObject.contacts.push(c);
          } else {
            const c = new _cannonContactEquation.CannonContactEquation(CollisionEventObject);
            c.impl = cq;
            CollisionEventObject.contacts.push(c);
          }
        }
      }

      for (i = 0; i < this.wrappedShapes.length; i++) {
        const shape = this.wrappedShapes[i];
        shape.collider.emit(CollisionEventObject.type, CollisionEventObject);
      }
    }
  }

}

exports.CannonSharedBody = CannonSharedBody;
CannonSharedBody.sharedBodesMap = new Map();