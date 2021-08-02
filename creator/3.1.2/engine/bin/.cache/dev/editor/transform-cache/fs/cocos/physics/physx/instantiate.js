"use strict";

var _physicsSelector = require("../framework/physics-selector.js");

var _physxWorld = require("./physx-world.js");

var _physxRigidBody = require("./physx-rigid-body.js");

var _physxSphereShape = require("./shapes/physx-sphere-shape.js");

var _physxBoxShape = require("./shapes/physx-box-shape.js");

var _physxCapsuleShape = require("./shapes/physx-capsule-shape.js");

var _physxPlaneShape = require("./shapes/physx-plane-shape.js");

var _physxTrimeshShape = require("./shapes/physx-trimesh-shape.js");

var _physxTerrainShape = require("./shapes/physx-terrain-shape.js");

var _physxCylinderShape = require("./shapes/physx-cylinder-shape.js");

var _physxConeShape = require("./shapes/physx-cone-shape.js");

var _physxDistanceJoint = require("./joints/physx-distance-joint.js");

var _physxRevoluteJoint = require("./joints/physx-revolute-joint.js");

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
// import { PhysXFixedJoint } from './joints/physx-fixed-joint';
_physicsSelector.selector.select('physx', {
  PhysicsWorld: _physxWorld.PhysXWorld,
  RigidBody: _physxRigidBody.PhysXRigidBody,
  BoxShape: _physxBoxShape.PhysXBoxShape,
  SphereShape: _physxSphereShape.PhysXSphereShape,
  CapsuleShape: _physxCapsuleShape.PhysXCapsuleShape,
  TrimeshShape: _physxTrimeshShape.PhysXTrimeshShape,
  CylinderShape: _physxCylinderShape.PhysXCylinderShape,
  ConeShape: _physxConeShape.PhysXConeShape,
  TerrainShape: _physxTerrainShape.PhysXTerrainShape,
  // SimplexShape: PhysXSimplexShape,
  PlaneShape: _physxPlaneShape.PhysXPlaneShape,
  PointToPointConstraint: _physxDistanceJoint.PhysXDistanceJoint,
  // PointToPointConstraint: PhysXFixedJoint,
  HingeConstraint: _physxRevoluteJoint.PhysXRevoluteJoint
});