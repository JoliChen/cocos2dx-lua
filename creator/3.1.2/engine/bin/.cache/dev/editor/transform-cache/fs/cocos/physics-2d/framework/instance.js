"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPhysicsModule = checkPhysicsModule;
exports.createPhysicsWorld = createPhysicsWorld;
exports.createRigidBody = createRigidBody;
exports.createShape = createShape;
exports.createJoint = createJoint;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _physicsSelector = require("./physics-selector.js");

var _index = require("../../core/index.js");

var _physicsTypes = require("./physics-types.js");

var _globalExports = require("../../core/global-exports.js");

/**
 * @packageDocumentation
 * @hidden
 */
const FUNC = (...v) => 0;

function checkPhysicsModule(obj) {
  if (_internal253Aconstants.DEBUG && !_internal253Aconstants.TEST && !_internal253Aconstants.EDITOR && obj == null) {
    (0, _index.errorID)(9600);
    return true;
  }

  return false;
}

function createPhysicsWorld() {
  if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.PhysicsWorld)) {
    return null;
  }

  return new _physicsSelector.WRAPPER.PhysicsWorld();
}

const EntireBody = {
  impl: null,
  rigidBody: null,
  isAwake: false,
  isSleeping: false,
  initialize: FUNC,
  setType: FUNC,
  setLinearDamping: FUNC,
  setAngularDamping: FUNC,
  setGravityScale: FUNC,
  setFixedRotation: FUNC,
  setAllowSleep: FUNC,
  isActive: FUNC,
  setActive: FUNC,
  wakeUp: FUNC,
  sleep: FUNC,
  getMass: FUNC,
  getInertia: FUNC,
  getLinearVelocity: FUNC,
  setLinearVelocity: FUNC,
  getLinearVelocityFromWorldPoint: FUNC,
  getAngularVelocity: FUNC,
  setAngularVelocity: FUNC,
  getLocalVector: FUNC,
  getWorldVector: FUNC,
  getLocalPoint: FUNC,
  getWorldPoint: FUNC,
  getLocalCenter: FUNC,
  getWorldCenter: FUNC,
  applyForce: FUNC,
  applyForceToCenter: FUNC,
  applyTorque: FUNC,
  applyLinearImpulse: FUNC,
  applyLinearImpulseToCenter: FUNC,
  applyAngularImpulse: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC
};

function createRigidBody() {
  const PHYSICS_2D_BUILTIN = _globalExports.legacyCC._global.CC_PHYSICS_2D_BUILTIN;

  if (PHYSICS_2D_BUILTIN) {
    return EntireBody;
  } else {
    if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.RigidBody)) {
      return null;
    }

    return new _physicsSelector.WRAPPER.RigidBody();
  }
} // shapes


const CREATE_COLLIDER_PROXY = {
  INITED: false
};
const ENTIRE_SHAPE = {
  impl: null,
  collider: null,
  worldAABB: null,
  worldPoints: null,
  worldPosition: null,
  worldRadius: null,
  initialize: FUNC,
  apply: FUNC,
  onLoad: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  onGroupChanged: FUNC
};

function createShape(type) {
  initColliderProxy();
  return CREATE_COLLIDER_PROXY[type]();
}

function initColliderProxy() {
  if (CREATE_COLLIDER_PROXY.INITED) return;
  CREATE_COLLIDER_PROXY.INITED = true;

  CREATE_COLLIDER_PROXY[_physicsTypes.ECollider2DType.BOX] = function createBoxShape() {
    if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.BoxShape)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.WRAPPER.BoxShape();
  };

  CREATE_COLLIDER_PROXY[_physicsTypes.ECollider2DType.CIRCLE] = function createCircleShape() {
    if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.CircleShape)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.WRAPPER.CircleShape();
  };

  CREATE_COLLIDER_PROXY[_physicsTypes.ECollider2DType.POLYGON] = function createPolygonShape() {
    if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.PolygonShape)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.WRAPPER.PolygonShape();
  };
} // joints


const CREATE_JOINT_PROXY = {
  INITED: false
};
const ENTIRE_JOINT = {
  impl: null,
  initialize: FUNC,
  setDampingRatio: FUNC,
  setFrequency: FUNC,
  setMaxForce: FUNC,
  setTarget: FUNC,
  setDistance: FUNC,
  setAngularOffset: FUNC,
  setCorrectionFactor: FUNC,
  setLinearOffset: FUNC,
  setMaxLength: FUNC,
  setMaxTorque: FUNC,
  setLowerLimit: FUNC,
  setUpperLimit: FUNC,
  setMaxMotorForce: FUNC,
  setMaxMotorTorque: FUNC,
  setMotorSpeed: FUNC,
  enableLimit: FUNC,
  enableMotor: FUNC,
  setLowerAngle: FUNC,
  setUpperAngle: FUNC
};

function createJoint(type) {
  initJointProxy();
  return CREATE_JOINT_PROXY[type]();
}

function initJointProxy() {
  if (CREATE_JOINT_PROXY.INITED) return;
  CREATE_JOINT_PROXY.INITED = true;
  const PHYSICS_2D_BUILTIN = _globalExports.legacyCC._global.CC_PHYSICS_2D_BUILTIN;

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.SPRING] = function createSpringJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.SpringJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.SpringJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.DISTANCE] = function createDistanceJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.DistanceJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.DistanceJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.FIXED] = function createFixedJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.FixedJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.FixedJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.MOUSE] = function createMouseJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.MouseJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.MouseJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.RELATIVE] = function createRelativeJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.RelativeJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.RelativeJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.SLIDER] = function createSliderJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.SliderJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.SliderJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.WHEEL] = function createWheelJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.WheelJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.WheelJoint();
    }
  };

  CREATE_JOINT_PROXY[_physicsTypes.EJoint2DType.HINGE] = function createHingeJoint() {
    if (PHYSICS_2D_BUILTIN) {
      return ENTIRE_JOINT;
    } else {
      if (_internal253Aconstants.DEBUG && checkPhysicsModule(_physicsSelector.WRAPPER.HingeJoint)) {
        return ENTIRE_JOINT;
      }

      return new _physicsSelector.WRAPPER.HingeJoint();
    }
  };
}