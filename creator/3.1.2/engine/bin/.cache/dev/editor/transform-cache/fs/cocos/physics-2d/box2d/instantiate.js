"use strict";

var _physicsSelector = require("../framework/physics-selector.js");

var _physicsWorld = require("./physics-world.js");

var _rigidBody = require("./rigid-body.js");

var _boxShape2d = require("./shapes/box-shape-2d.js");

var _circleShape2d = require("./shapes/circle-shape-2d.js");

var _polygonShape2d = require("./shapes/polygon-shape-2d.js");

var _mouseJoint = require("./joints/mouse-joint.js");

var _distanceJoint = require("./joints/distance-joint.js");

var _springJoint = require("./joints/spring-joint.js");

var _relativeJoint = require("./joints/relative-joint.js");

var _sliderJoint = require("./joints/slider-joint.js");

var _fixedJoint = require("./joints/fixed-joint.js");

var _wheelJoint = require("./joints/wheel-joint.js");

var _hingeJoint = require("./joints/hinge-joint.js");

/**
 * @packageDocumentation
 * @hidden
 */
(0, _physicsSelector.select)('box2d', {
  PhysicsWorld: _physicsWorld.b2PhysicsWorld,
  RigidBody: _rigidBody.b2RigidBody2D,
  BoxShape: _boxShape2d.b2BoxShape,
  CircleShape: _circleShape2d.b2CircleShape,
  PolygonShape: _polygonShape2d.b2PolygonShape,
  MouseJoint: _mouseJoint.b2MouseJoint,
  DistanceJoint: _distanceJoint.b2DistanceJoint,
  SpringJoint: _springJoint.b2SpringJoint,
  RelativeJoint: _relativeJoint.b2RelativeJoint,
  SliderJoint: _sliderJoint.b2SliderJoint,
  FixedJoint: _fixedJoint.b2FixedJoint,
  WheelJoint: _wheelJoint.b2WheelJoint,
  HingeJoint: _hingeJoint.b2HingeJoint
});