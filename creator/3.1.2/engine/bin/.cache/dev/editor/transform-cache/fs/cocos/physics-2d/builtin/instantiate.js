"use strict";

var _physicsSelector = require("../framework/physics-selector.js");

var _builtinWorld = require("./builtin-world.js");

var _boxShape2d = require("./shapes/box-shape-2d.js");

var _circleShape2d = require("./shapes/circle-shape-2d.js");

var _polygonShape2d = require("./shapes/polygon-shape-2d.js");

/**
 * @packageDocumentation
 * @hidden
 */
(0, _physicsSelector.select)('builtin', {
  PhysicsWorld: _builtinWorld.BuiltinPhysicsWorld,
  RigidBody: null,
  BoxShape: _boxShape2d.BuiltinBoxShape,
  CircleShape: _circleShape2d.BuiltinCircleShape,
  PolygonShape: _polygonShape2d.BuiltinPolygonShape,
  MouseJoint: null,
  DistanceJoint: null,
  SpringJoint: null,
  RelativeJoint: null,
  SliderJoint: null,
  FixedJoint: null,
  WheelJoint: null,
  HingeJoint: null
});