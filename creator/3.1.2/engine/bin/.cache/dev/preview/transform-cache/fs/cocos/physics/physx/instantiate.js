System.register("q-bundled:///fs/cocos/physics/physx/instantiate.js", ["../framework/physics-selector.js", "./physx-world.js", "./physx-rigid-body.js", "./shapes/physx-sphere-shape.js", "./shapes/physx-box-shape.js", "./shapes/physx-capsule-shape.js", "./shapes/physx-plane-shape.js", "./shapes/physx-trimesh-shape.js", "./shapes/physx-terrain-shape.js", "./shapes/physx-cylinder-shape.js", "./shapes/physx-cone-shape.js", "./joints/physx-distance-joint.js", "./joints/physx-revolute-joint.js"], function (_export, _context) {
  "use strict";

  var selector, PhysXWorld, PhysXRigidBody, PhysXSphereShape, PhysXBoxShape, PhysXCapsuleShape, PhysXPlaneShape, PhysXTrimeshShape, PhysXTerrainShape, PhysXCylinderShape, PhysXConeShape, PhysXDistanceJoint, PhysXRevoluteJoint;
  return {
    setters: [function (_frameworkPhysicsSelectorJs) {
      selector = _frameworkPhysicsSelectorJs.selector;
    }, function (_physxWorldJs) {
      PhysXWorld = _physxWorldJs.PhysXWorld;
    }, function (_physxRigidBodyJs) {
      PhysXRigidBody = _physxRigidBodyJs.PhysXRigidBody;
    }, function (_shapesPhysxSphereShapeJs) {
      PhysXSphereShape = _shapesPhysxSphereShapeJs.PhysXSphereShape;
    }, function (_shapesPhysxBoxShapeJs) {
      PhysXBoxShape = _shapesPhysxBoxShapeJs.PhysXBoxShape;
    }, function (_shapesPhysxCapsuleShapeJs) {
      PhysXCapsuleShape = _shapesPhysxCapsuleShapeJs.PhysXCapsuleShape;
    }, function (_shapesPhysxPlaneShapeJs) {
      PhysXPlaneShape = _shapesPhysxPlaneShapeJs.PhysXPlaneShape;
    }, function (_shapesPhysxTrimeshShapeJs) {
      PhysXTrimeshShape = _shapesPhysxTrimeshShapeJs.PhysXTrimeshShape;
    }, function (_shapesPhysxTerrainShapeJs) {
      PhysXTerrainShape = _shapesPhysxTerrainShapeJs.PhysXTerrainShape;
    }, function (_shapesPhysxCylinderShapeJs) {
      PhysXCylinderShape = _shapesPhysxCylinderShapeJs.PhysXCylinderShape;
    }, function (_shapesPhysxConeShapeJs) {
      PhysXConeShape = _shapesPhysxConeShapeJs.PhysXConeShape;
    }, function (_jointsPhysxDistanceJointJs) {
      PhysXDistanceJoint = _jointsPhysxDistanceJointJs.PhysXDistanceJoint;
    }, function (_jointsPhysxRevoluteJointJs) {
      PhysXRevoluteJoint = _jointsPhysxRevoluteJointJs.PhysXRevoluteJoint;
    }],
    execute: function () {
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
      selector.select('physx', {
        PhysicsWorld: PhysXWorld,
        RigidBody: PhysXRigidBody,
        BoxShape: PhysXBoxShape,
        SphereShape: PhysXSphereShape,
        CapsuleShape: PhysXCapsuleShape,
        TrimeshShape: PhysXTrimeshShape,
        CylinderShape: PhysXCylinderShape,
        ConeShape: PhysXConeShape,
        TerrainShape: PhysXTerrainShape,
        // SimplexShape: PhysXSimplexShape,
        PlaneShape: PhysXPlaneShape,
        PointToPointConstraint: PhysXDistanceJoint,
        // PointToPointConstraint: PhysXFixedJoint,
        HingeConstraint: PhysXRevoluteJoint
      });
    }
  };
});