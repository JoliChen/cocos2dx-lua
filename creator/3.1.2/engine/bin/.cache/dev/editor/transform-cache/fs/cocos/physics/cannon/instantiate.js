"use strict";

var _physicsSelector = require("../framework/physics-selector.js");

var _cannonRigidBody = require("./cannon-rigid-body.js");

var _cannonWorld = require("./cannon-world.js");

var _cannonBoxShape = require("./shapes/cannon-box-shape.js");

var _cannonSphereShape = require("./shapes/cannon-sphere-shape.js");

var _cannonTrimeshShape = require("./shapes/cannon-trimesh-shape.js");

var _cannonCylinderShape = require("./shapes/cannon-cylinder-shape.js");

var _cannonConeShape = require("./shapes/cannon-cone-shape.js");

var _cannonTerrainShape = require("./shapes/cannon-terrain-shape.js");

var _cannonSimplexShape = require("./shapes/cannon-simplex-shape.js");

var _cannonPlaneShape = require("./shapes/cannon-plane-shape.js");

var _cannonPointToPointConstraint = require("./constraints/cannon-point-to-point-constraint.js");

var _cannonHingeConstraint = require("./constraints/cannon-hinge-constraint.js");

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
_physicsSelector.selector.select('cannon.js', {
  PhysicsWorld: _cannonWorld.CannonWorld,
  RigidBody: _cannonRigidBody.CannonRigidBody,
  BoxShape: _cannonBoxShape.CannonBoxShape,
  SphereShape: _cannonSphereShape.CannonSphereShape,
  TrimeshShape: _cannonTrimeshShape.CannonTrimeshShape,
  CylinderShape: _cannonCylinderShape.CannonCylinderShape,
  ConeShape: _cannonConeShape.CannonConeShape,
  TerrainShape: _cannonTerrainShape.CannonTerrainShape,
  SimplexShape: _cannonSimplexShape.CannonSimplexShape,
  PlaneShape: _cannonPlaneShape.CannonPlaneShape,
  PointToPointConstraint: _cannonPointToPointConstraint.CannonPointToPointConstraint,
  HingeConstraint: _cannonHingeConstraint.CannonHingeConstraint
});