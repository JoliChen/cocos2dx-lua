"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhysicsWorld = createPhysicsWorld;
exports.createRigidBody = createRigidBody;
exports.createShape = createShape;
exports.createConstraint = createConstraint;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _physicsSelector = require("./physics-selector.js");

var _index = require("../../core/index.js");

var _physicsEnum = require("./physics-enum.js");

var _globalExports = require("../../core/global-exports.js");

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
const FUNC = (...v) => 0;

const ENTIRE_WORLD = {
  impl: null,
  setGravity: FUNC,
  setAllowSleep: FUNC,
  setDefaultMaterial: FUNC,
  step: FUNC,
  syncAfterEvents: FUNC,
  syncSceneToPhysics: FUNC,
  raycast: FUNC,
  raycastClosest: FUNC,
  emitEvents: FUNC,
  destroy: FUNC
};
var ECheckType;

(function (ECheckType) {
  ECheckType[ECheckType["World"] = 0] = "World";
  ECheckType[ECheckType["RigidBody"] = 1] = "RigidBody";
  ECheckType[ECheckType["BoxCollider"] = 2] = "BoxCollider";
  ECheckType[ECheckType["SphereCollider"] = 3] = "SphereCollider";
  ECheckType[ECheckType["CapsuleCollider"] = 4] = "CapsuleCollider";
  ECheckType[ECheckType["MeshCollider"] = 5] = "MeshCollider";
  ECheckType[ECheckType["CylinderCollider"] = 6] = "CylinderCollider";
  ECheckType[ECheckType["ConeCollider"] = 7] = "ConeCollider";
  ECheckType[ECheckType["TerrainCollider"] = 8] = "TerrainCollider";
  ECheckType[ECheckType["SimplexCollider"] = 9] = "SimplexCollider";
  ECheckType[ECheckType["PlaneCollider"] = 10] = "PlaneCollider";
  ECheckType[ECheckType["PointToPointConstraint"] = 11] = "PointToPointConstraint";
  ECheckType[ECheckType["HingeConstraint"] = 12] = "HingeConstraint";
  ECheckType[ECheckType["ConeTwistConstraint"] = 13] = "ConeTwistConstraint";
})(ECheckType || (ECheckType = {}));

function check(obj, type) {
  if (!_internal253Aconstants.TEST && !_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW && obj == null) {
    if (_physicsSelector.selector.id) {
      (0, _index.warn)(`${_physicsSelector.selector.id} physics does not support ${ECheckType[type]}`);
    } else {
      (0, _index.errorID)(9600);
    }

    return true;
  }

  return false;
}

function createPhysicsWorld() {
  if (check(_physicsSelector.selector.wrapper.PhysicsWorld, ECheckType.World)) {
    return ENTIRE_WORLD;
  }

  return new _physicsSelector.selector.wrapper.PhysicsWorld();
}

const ENTIRE_RIGID_BODY = {
  impl: null,
  rigidBody: null,
  isAwake: false,
  isSleepy: false,
  isSleeping: false,
  initialize: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setType: FUNC,
  setMass: FUNC,
  setLinearDamping: FUNC,
  setAngularDamping: FUNC,
  useGravity: FUNC,
  setLinearFactor: FUNC,
  setAngularFactor: FUNC,
  setAllowSleep: FUNC,
  wakeUp: FUNC,
  sleep: FUNC,
  clearState: FUNC,
  clearForces: FUNC,
  clearVelocity: FUNC,
  setSleepThreshold: FUNC,
  getSleepThreshold: FUNC,
  getLinearVelocity: FUNC,
  setLinearVelocity: FUNC,
  getAngularVelocity: FUNC,
  setAngularVelocity: FUNC,
  applyForce: FUNC,
  applyLocalForce: FUNC,
  applyImpulse: FUNC,
  applyLocalImpulse: FUNC,
  applyTorque: FUNC,
  applyLocalTorque: FUNC,
  setGroup: FUNC,
  getGroup: FUNC,
  addGroup: FUNC,
  removeGroup: FUNC,
  setMask: FUNC,
  getMask: FUNC,
  addMask: FUNC,
  removeMask: FUNC
};

function createRigidBody() {
  if (check(_physicsSelector.selector.wrapper.RigidBody, ECheckType.RigidBody)) {
    return ENTIRE_RIGID_BODY;
  }

  return new _physicsSelector.selector.wrapper.RigidBody();
} /// CREATE COLLIDER ///


const CREATE_COLLIDER_PROXY = {
  INITED: false
};
const ENTIRE_SHAPE = {
  impl: null,
  collider: null,
  attachedRigidBody: null,
  initialize: FUNC,
  onLoad: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setGroup: FUNC,
  getGroup: FUNC,
  addGroup: FUNC,
  removeGroup: FUNC,
  setMask: FUNC,
  getMask: FUNC,
  addMask: FUNC,
  removeMask: FUNC,
  setMaterial: FUNC,
  setAsTrigger: FUNC,
  setCenter: FUNC,
  getAABB: FUNC,
  getBoundingSphere: FUNC,
  setSize: FUNC,
  setRadius: FUNC,
  setCylinderHeight: FUNC,
  setDirection: FUNC,
  setHeight: FUNC,
  setShapeType: FUNC,
  setVertices: FUNC,
  setMesh: FUNC,
  setTerrain: FUNC,
  setNormal: FUNC,
  setConstant: FUNC,
  updateEventListener: FUNC
};

function createShape(type) {
  initColliderProxy();
  return CREATE_COLLIDER_PROXY[type]();
}

function initColliderProxy() {
  if (CREATE_COLLIDER_PROXY.INITED) return;
  CREATE_COLLIDER_PROXY.INITED = true;

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.BOX] = function createBoxShape() {
    if (check(_physicsSelector.selector.wrapper.BoxShape, ECheckType.BoxCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.BoxShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.SPHERE] = function createSphereShape() {
    if (check(_physicsSelector.selector.wrapper.SphereShape, ECheckType.SphereCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.SphereShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.CAPSULE] = function createCapsuleShape() {
    if (check(_physicsSelector.selector.wrapper.CapsuleShape, ECheckType.CapsuleCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.CapsuleShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.CYLINDER] = function createCylinderShape() {
    if (check(_physicsSelector.selector.wrapper.CylinderShape, ECheckType.CylinderCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.CylinderShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.CONE] = function createConeShape() {
    if (check(_physicsSelector.selector.wrapper.ConeShape, ECheckType.ConeCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.ConeShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.MESH] = function createTrimeshShape() {
    if (check(_physicsSelector.selector.wrapper.TrimeshShape, ECheckType.MeshCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.TrimeshShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.TERRAIN] = function createTerrainShape() {
    if (check(_physicsSelector.selector.wrapper.TerrainShape, ECheckType.TerrainCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.TerrainShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.SIMPLEX] = function createSimplexShape() {
    if (check(_physicsSelector.selector.wrapper.SimplexShape, ECheckType.SimplexCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.SimplexShape();
  };

  CREATE_COLLIDER_PROXY[_physicsEnum.EColliderType.PLANE] = function createPlaneShape() {
    if (check(_physicsSelector.selector.wrapper.PlaneShape, ECheckType.PlaneCollider)) {
      return ENTIRE_SHAPE;
    }

    return new _physicsSelector.selector.wrapper.PlaneShape();
  };
} /// CREATE CONSTRAINT ///


const CREATE_CONSTRAINT_PROXY = {
  INITED: false
};
const ENTIRE_CONSTRAINT = {
  impl: null,
  initialize: FUNC,
  onLoad: FUNC,
  onEnable: FUNC,
  onDisable: FUNC,
  onDestroy: FUNC,
  setEnableCollision: FUNC,
  setConnectedBody: FUNC,
  setPivotA: FUNC,
  setPivotB: FUNC,
  setAxis: FUNC
};

function createConstraint(type) {
  initConstraintProxy();
  return CREATE_CONSTRAINT_PROXY[type]();
}

function initConstraintProxy() {
  if (CREATE_CONSTRAINT_PROXY.INITED) return;
  CREATE_CONSTRAINT_PROXY.INITED = true;

  CREATE_CONSTRAINT_PROXY[_physicsEnum.EConstraintType.POINT_TO_POINT] = function createPointToPointConstraint() {
    if (check(_physicsSelector.selector.wrapper.PointToPointConstraint, ECheckType.PointToPointConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new _physicsSelector.selector.wrapper.PointToPointConstraint();
  };

  CREATE_CONSTRAINT_PROXY[_physicsEnum.EConstraintType.HINGE] = function createHingeConstraint() {
    if (check(_physicsSelector.selector.wrapper.HingeConstraint, ECheckType.HingeConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new _physicsSelector.selector.wrapper.HingeConstraint();
  };

  CREATE_CONSTRAINT_PROXY[_physicsEnum.EConstraintType.CONE_TWIST] = function createConeTwistConstraint() {
    if (check(_physicsSelector.selector.wrapper.ConeTwistConstraint, ECheckType.ConeTwistConstraint)) {
      return ENTIRE_CONSTRAINT;
    }

    return new _physicsSelector.selector.wrapper.ConeTwistConstraint();
  };
}