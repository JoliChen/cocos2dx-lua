System.register("q-bundled:///fs/cocos/physics/cannon/instantiate.js", ["../framework/physics-selector.js", "./cannon-rigid-body.js", "./cannon-world.js", "./shapes/cannon-box-shape.js", "./shapes/cannon-sphere-shape.js", "./shapes/cannon-trimesh-shape.js", "./shapes/cannon-cylinder-shape.js", "./shapes/cannon-cone-shape.js", "./shapes/cannon-terrain-shape.js", "./shapes/cannon-simplex-shape.js", "./shapes/cannon-plane-shape.js", "./constraints/cannon-point-to-point-constraint.js", "./constraints/cannon-hinge-constraint.js"], function (_export, _context) {
  "use strict";

  var selector, CannonRigidBody, CannonWorld, CannonBoxShape, CannonSphereShape, CannonTrimeshShape, CannonCylinderShape, CannonConeShape, CannonTerrainShape, CannonSimplexShape, CannonPlaneShape, CannonPointToPointConstraint, CannonHingeConstraint;
  return {
    setters: [function (_frameworkPhysicsSelectorJs) {
      selector = _frameworkPhysicsSelectorJs.selector;
    }, function (_cannonRigidBodyJs) {
      CannonRigidBody = _cannonRigidBodyJs.CannonRigidBody;
    }, function (_cannonWorldJs) {
      CannonWorld = _cannonWorldJs.CannonWorld;
    }, function (_shapesCannonBoxShapeJs) {
      CannonBoxShape = _shapesCannonBoxShapeJs.CannonBoxShape;
    }, function (_shapesCannonSphereShapeJs) {
      CannonSphereShape = _shapesCannonSphereShapeJs.CannonSphereShape;
    }, function (_shapesCannonTrimeshShapeJs) {
      CannonTrimeshShape = _shapesCannonTrimeshShapeJs.CannonTrimeshShape;
    }, function (_shapesCannonCylinderShapeJs) {
      CannonCylinderShape = _shapesCannonCylinderShapeJs.CannonCylinderShape;
    }, function (_shapesCannonConeShapeJs) {
      CannonConeShape = _shapesCannonConeShapeJs.CannonConeShape;
    }, function (_shapesCannonTerrainShapeJs) {
      CannonTerrainShape = _shapesCannonTerrainShapeJs.CannonTerrainShape;
    }, function (_shapesCannonSimplexShapeJs) {
      CannonSimplexShape = _shapesCannonSimplexShapeJs.CannonSimplexShape;
    }, function (_shapesCannonPlaneShapeJs) {
      CannonPlaneShape = _shapesCannonPlaneShapeJs.CannonPlaneShape;
    }, function (_constraintsCannonPointToPointConstraintJs) {
      CannonPointToPointConstraint = _constraintsCannonPointToPointConstraintJs.CannonPointToPointConstraint;
    }, function (_constraintsCannonHingeConstraintJs) {
      CannonHingeConstraint = _constraintsCannonHingeConstraintJs.CannonHingeConstraint;
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
      selector.select('cannon.js', {
        PhysicsWorld: CannonWorld,
        RigidBody: CannonRigidBody,
        BoxShape: CannonBoxShape,
        SphereShape: CannonSphereShape,
        TrimeshShape: CannonTrimeshShape,
        CylinderShape: CannonCylinderShape,
        ConeShape: CannonConeShape,
        TerrainShape: CannonTerrainShape,
        SimplexShape: CannonSimplexShape,
        PlaneShape: CannonPlaneShape,
        PointToPointConstraint: CannonPointToPointConstraint,
        HingeConstraint: CannonHingeConstraint
      });
    }
  };
});