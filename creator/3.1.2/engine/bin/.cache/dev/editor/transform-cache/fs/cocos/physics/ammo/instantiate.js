"use strict";

var _physicsSelector = require("../framework/physics-selector.js");

var _ammoRigidBody = require("./ammo-rigid-body.js");

var _ammoWorld = require("./ammo-world.js");

var _ammoBoxShape = require("./shapes/ammo-box-shape.js");

var _ammoSphereShape = require("./shapes/ammo-sphere-shape.js");

var _ammoCapsuleShape = require("./shapes/ammo-capsule-shape.js");

var _ammoTrimeshShape = require("./shapes/ammo-trimesh-shape.js");

var _ammoCylinderShape = require("./shapes/ammo-cylinder-shape.js");

var _ammoConeShape = require("./shapes/ammo-cone-shape.js");

var _ammoTerrainShape = require("./shapes/ammo-terrain-shape.js");

var _ammoSimplexShape = require("./shapes/ammo-simplex-shape.js");

var _ammoPlaneShape = require("./shapes/ammo-plane-shape.js");

var _ammoPointToPointConstraint = require("./constraints/ammo-point-to-point-constraint.js");

var _ammoHingeConstraint = require("./constraints/ammo-hinge-constraint.js");

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
_physicsSelector.selector.select('ammo.js', {
  PhysicsWorld: _ammoWorld.AmmoWorld,
  RigidBody: _ammoRigidBody.AmmoRigidBody,
  BoxShape: _ammoBoxShape.AmmoBoxShape,
  SphereShape: _ammoSphereShape.AmmoSphereShape,
  CapsuleShape: _ammoCapsuleShape.AmmoCapsuleShape,
  TrimeshShape: _ammoTrimeshShape.AmmoTrimeshShape,
  CylinderShape: _ammoCylinderShape.AmmoCylinderShape,
  ConeShape: _ammoConeShape.AmmoConeShape,
  TerrainShape: _ammoTerrainShape.AmmoTerrainShape,
  SimplexShape: _ammoSimplexShape.AmmoSimplexShape,
  PlaneShape: _ammoPlaneShape.AmmoPlaneShape,
  PointToPointConstraint: _ammoPointToPointConstraint.AmmoPointToPointConstraint,
  HingeConstraint: _ammoHingeConstraint.AmmoHingeConstraint
});