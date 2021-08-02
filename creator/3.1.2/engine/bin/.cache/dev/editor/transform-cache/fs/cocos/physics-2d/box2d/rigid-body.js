"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2RigidBody2D = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _physicsSystem = require("../framework/physics-system.js");

var _index = require("../../core/index.js");

var _physicsTypes = require("../framework/physics-types.js");

var _node = require("../../core/scene-graph/node.js");

var _index2 = require("../framework/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempVec3 = new _index.Vec3();
const tempVec2_1 = new _box2d.default.Vec2();

class b2RigidBody2D {
  constructor() {
    this._animatedPos = new _index.Vec2();
    this._animatedAngle = 0;
    this._body = null;
    this._inited = false;
  }

  get impl() {
    return this._body;
  }

  set _imp(v) {
    this._body = v;
  }

  get rigidBody() {
    return this._rigidBody;
  }

  get isAwake() {
    return this._body.IsAwake();
  }

  get isSleeping() {
    return !this._body.IsAwake();
  }

  initialize(com) {
    this._rigidBody = com;

    _physicsSystem.PhysicsSystem2D.instance._callAfterStep(this, this._init);
  }

  onDestroy() {
    _physicsSystem.PhysicsSystem2D.instance._callAfterStep(this, this._destroy);
  }

  onEnable() {
    this.setActive(true);
  }

  onDisable() {
    this.setActive(false);
  }

  _registerNodeEvents() {
    const node = this.rigidBody.node;
    node.on(_node.Node.EventType.TRANSFORM_CHANGED, this._onNodeTransformChanged, this);
  }

  _unregisterNodeEvents() {
    const node = this.rigidBody.node;
    node.off(_node.Node.EventType.TRANSFORM_CHANGED, this._onNodeTransformChanged, this);
  }

  _onNodeTransformChanged(type) {
    if (_physicsSystem.PhysicsSystem2D.instance.stepping) {
      return;
    }

    if (type & _node.Node.TransformBit.SCALE) {
      const colliders = this.rigidBody.getComponents(_index2.Collider2D);

      for (let i = 0; i < colliders.length; i++) {
        colliders[i].apply();
      }
    } else {
      if (type & _node.Node.TransformBit.POSITION) {
        this.syncPositionToPhysics(true);
      }

      if (type & _node.Node.TransformBit.ROTATION) {
        this.syncRotationToPhysics(true);
      }
    }
  }

  _init() {
    if (this._inited) {
      return;
    }

    this._registerNodeEvents();

    _physicsSystem.PhysicsSystem2D.instance.physicsWorld.addBody(this);

    this._inited = true;
  }

  _destroy() {
    if (!this._inited) return;

    _physicsSystem.PhysicsSystem2D.instance.physicsWorld.removeBody(this);

    this._unregisterNodeEvents();

    this._inited = false;
  }

  animate(dt) {
    const b2body = this._body;
    if (!b2body) return;
    const b2Pos = b2body.GetPosition();
    b2body.SetAwake(true);
    const timeStep = 1 / dt;
    tempVec2_1.x = (this._animatedPos.x - b2Pos.x) * timeStep;
    tempVec2_1.y = (this._animatedPos.y - b2Pos.y) * timeStep;
    b2body.SetLinearVelocity(tempVec2_1);
    const b2Rotation = b2body.GetAngle();
    b2body.SetAngularVelocity((this._animatedAngle - b2Rotation) * timeStep);
  }

  syncPositionToPhysics(enableAnimated = false) {
    const b2body = this._body;
    if (!b2body) return;
    const pos = this._rigidBody.node.worldPosition;
    let temp;
    const bodyType = this._rigidBody.type;

    if (bodyType === _physicsTypes.ERigidBody2DType.Animated) {
      temp = b2body.GetLinearVelocity();
    } else {
      temp = b2body.GetPosition();
    }

    temp.x = pos.x / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    temp.y = pos.y / _physicsTypes.PHYSICS_2D_PTM_RATIO;

    if (bodyType === _physicsTypes.ERigidBody2DType.Animated && enableAnimated) {
      this._animatedPos.set(temp.x, temp.y);
    } else {
      b2body.SetTransformVec(temp, b2body.GetAngle());
    }
  }

  syncRotationToPhysics(enableAnimated = false) {
    const b2body = this._body;
    if (!b2body) return;
    const rotation = (0, _index.toRadian)(this._rigidBody.node.eulerAngles.z);
    const bodyType = this._rigidBody.type;

    if (bodyType === _physicsTypes.ERigidBody2DType.Animated && enableAnimated) {
      this._animatedAngle = rotation;
    } else {
      b2body.SetTransformVec(b2body.GetPosition(), rotation);
    }
  }

  resetVelocity() {
    const b2body = this._body;
    if (!b2body) return;
    const temp = b2body.m_linearVelocity;
    temp.Set(0, 0);
    b2body.SetLinearVelocity(temp);
    b2body.SetAngularVelocity(0);
  }

  setType(v) {
    this._body.SetType(v);
  }

  setLinearDamping(v) {
    this._body.SetLinearDamping(v);
  }

  setAngularDamping(v) {
    this._body.SetAngularDamping(v);
  }

  setGravityScale(v) {
    this._body.SetGravityScale(v);
  }

  setFixedRotation(v) {
    this._body.SetFixedRotation(v);
  }

  setAllowSleep(v) {
    this._body.SetSleepingAllowed(v);
  }

  isActive() {
    return this._body.IsActive();
  }

  setActive(v) {
    this._body.SetActive(v);
  }

  wakeUp() {
    this._body.SetAwake(true);
  }

  sleep() {
    this._body.SetAwake(false);
  }

  getMass() {
    return this._body.GetMass();
  }

  setLinearVelocity(v) {
    this._body.SetLinearVelocity(v);
  }

  getLinearVelocity(out) {
    const velocity = this._body.GetLinearVelocity();

    out.x = velocity.x;
    out.y = velocity.y;
    return out;
  }

  getLinearVelocityFromWorldPoint(worldPoint, out) {
    tempVec2_1.Set(worldPoint.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, worldPoint.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

    this._body.GetLinearVelocityFromWorldPoint(tempVec2_1, out);

    out.x *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  setAngularVelocity(v) {
    this._body.SetAngularVelocity(v);
  }

  getAngularVelocity() {
    return (0, _index.toDegree)(this._body.GetAngularVelocity());
  }

  getLocalVector(worldVector, out) {
    out = out || new _index.Vec2();
    tempVec2_1.Set(worldVector.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, worldVector.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

    this._body.GetLocalVector(tempVec2_1, out);

    out.x *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getWorldVector(localVector, out) {
    tempVec2_1.Set(localVector.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, localVector.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

    this._body.GetWorldVector(tempVec2_1, out);

    out.x *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getLocalPoint(worldPoint, out) {
    out = out || new _index.Vec2();
    tempVec2_1.Set(worldPoint.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, worldPoint.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

    this._body.GetLocalPoint(tempVec2_1, out);

    out.x *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getWorldPoint(localPoint, out) {
    out = out || new _index.Vec2();
    tempVec2_1.Set(localPoint.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, localPoint.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

    this._body.GetWorldPoint(tempVec2_1, out);

    out.x *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y *= _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getLocalCenter(out) {
    out = out || new _index.Vec2();

    const pos = this._body.GetLocalCenter();

    out.x = pos.x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y = pos.y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getWorldCenter(out) {
    out = out || new _index.Vec2();

    const pos = this._body.GetWorldCenter();

    out.x = pos.x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    out.y = pos.y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
    return out;
  }

  getInertia() {
    return this._body.GetInertia();
  }

  applyForce(force, point, wake) {
    if (this._body) {
      tempVec2_1.Set(point.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, point.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

      this._body.ApplyForce(force, tempVec2_1, wake);
    }
  }

  applyForceToCenter(force, wake) {
    if (this._body) {
      this._body.ApplyForceToCenter(force, wake);
    }
  }

  applyTorque(torque, wake) {
    if (this._body) {
      this._body.ApplyTorque(torque, wake);
    }
  }

  applyLinearImpulse(impulse, point, wake) {
    if (this._body) {
      tempVec2_1.Set(point.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, point.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);

      this._body.ApplyLinearImpulse(impulse, tempVec2_1, wake);
    }
  }

  applyLinearImpulseToCenter(impulse, wake) {
    if (this._body) {
      this._body.ApplyLinearImpulse(impulse, this._body.GetPosition(), wake);
    }
  }

  applyAngularImpulse(impulse, wake) {
    if (this._body) {
      this._body.ApplyAngularImpulse(impulse, wake);
    }
  }

}

exports.b2RigidBody2D = b2RigidBody2D;