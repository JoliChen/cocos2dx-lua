"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PHYSICS_2D_PTM_RATIO = exports.EPhysics2DDrawFlags = exports.Contact2DType = exports.ERaycast2DType = exports.EJoint2DType = exports.ECollider2DType = exports.ERigidBody2DType = void 0;

var _index = require("../../core/index.js");

/**
 * @packageDocumentation
 * @module physics2d
 */
let ERigidBody2DType;
exports.ERigidBody2DType = ERigidBody2DType;

(function (ERigidBody2DType) {
  ERigidBody2DType[ERigidBody2DType["Static"] = 0] = "Static";
  ERigidBody2DType[ERigidBody2DType["Kinematic"] = 1] = "Kinematic";
  ERigidBody2DType[ERigidBody2DType["Dynamic"] = 2] = "Dynamic";
  ERigidBody2DType[ERigidBody2DType["Animated"] = 3] = "Animated";
})(ERigidBody2DType || (exports.ERigidBody2DType = ERigidBody2DType = {}));

(0, _index.Enum)(ERigidBody2DType);
let ECollider2DType;
exports.ECollider2DType = ECollider2DType;

(function (ECollider2DType) {
  ECollider2DType[ECollider2DType["None"] = 0] = "None";
  ECollider2DType[ECollider2DType["BOX"] = 1] = "BOX";
  ECollider2DType[ECollider2DType["CIRCLE"] = 2] = "CIRCLE";
  ECollider2DType[ECollider2DType["POLYGON"] = 3] = "POLYGON";
})(ECollider2DType || (exports.ECollider2DType = ECollider2DType = {}));

(0, _index.Enum)(ECollider2DType);
let EJoint2DType;
exports.EJoint2DType = EJoint2DType;

(function (EJoint2DType) {
  EJoint2DType[EJoint2DType["None"] = 0] = "None";
  EJoint2DType[EJoint2DType["DISTANCE"] = 1] = "DISTANCE";
  EJoint2DType[EJoint2DType["SPRING"] = 2] = "SPRING";
  EJoint2DType[EJoint2DType["WHEEL"] = 3] = "WHEEL";
  EJoint2DType[EJoint2DType["MOUSE"] = 4] = "MOUSE";
  EJoint2DType[EJoint2DType["FIXED"] = 5] = "FIXED";
  EJoint2DType[EJoint2DType["SLIDER"] = 6] = "SLIDER";
  EJoint2DType[EJoint2DType["RELATIVE"] = 7] = "RELATIVE";
  EJoint2DType[EJoint2DType["HINGE"] = 8] = "HINGE";
})(EJoint2DType || (exports.EJoint2DType = EJoint2DType = {}));

(0, _index.Enum)(EJoint2DType);
/**
 * @en Enum for ERaycast2DType.
 * @zh 射线检测类型
 * @enum ERaycast2DType
 */

let ERaycast2DType;
exports.ERaycast2DType = ERaycast2DType;

(function (ERaycast2DType) {
  ERaycast2DType[ERaycast2DType["Closest"] = 0] = "Closest";
  ERaycast2DType[ERaycast2DType["Any"] = 1] = "Any";
  ERaycast2DType[ERaycast2DType["AllClosest"] = 2] = "AllClosest";
  ERaycast2DType[ERaycast2DType["All"] = 3] = "All";
})(ERaycast2DType || (exports.ERaycast2DType = ERaycast2DType = {}));

const Contact2DType = {
  None: 'none-contact',
  BEGIN_CONTACT: 'begin-contact',
  END_CONTACT: 'end-contact',
  PRE_SOLVE: 'pre-solve',
  POST_SOLVE: 'post-solve'
};
exports.Contact2DType = Contact2DType;
let EPhysics2DDrawFlags;
exports.EPhysics2DDrawFlags = EPhysics2DDrawFlags;

(function (EPhysics2DDrawFlags) {
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["None"] = 0] = "None";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Shape"] = 1] = "Shape";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Joint"] = 2] = "Joint";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Aabb"] = 4] = "Aabb";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Pair"] = 8] = "Pair";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["CenterOfMass"] = 16] = "CenterOfMass";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Particle"] = 32] = "Particle";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["Controller"] = 64] = "Controller";
  EPhysics2DDrawFlags[EPhysics2DDrawFlags["All"] = 63] = "All";
})(EPhysics2DDrawFlags || (exports.EPhysics2DDrawFlags = EPhysics2DDrawFlags = {}));

const PHYSICS_2D_PTM_RATIO = 32;
exports.PHYSICS_2D_PTM_RATIO = PHYSICS_2D_PTM_RATIO;