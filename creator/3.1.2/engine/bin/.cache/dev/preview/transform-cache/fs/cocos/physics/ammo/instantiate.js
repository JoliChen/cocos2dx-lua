System.register("q-bundled:///fs/cocos/physics/ammo/instantiate.js", ["../framework/physics-selector.js", "./ammo-rigid-body.js", "./ammo-world.js", "./shapes/ammo-box-shape.js", "./shapes/ammo-sphere-shape.js", "./shapes/ammo-capsule-shape.js", "./shapes/ammo-trimesh-shape.js", "./shapes/ammo-cylinder-shape.js", "./shapes/ammo-cone-shape.js", "./shapes/ammo-terrain-shape.js", "./shapes/ammo-simplex-shape.js", "./shapes/ammo-plane-shape.js", "./constraints/ammo-point-to-point-constraint.js", "./constraints/ammo-hinge-constraint.js"], function (_export, _context) {
  "use strict";

  var selector, AmmoRigidBody, AmmoWorld, AmmoBoxShape, AmmoSphereShape, AmmoCapsuleShape, AmmoTrimeshShape, AmmoCylinderShape, AmmoConeShape, AmmoTerrainShape, AmmoSimplexShape, AmmoPlaneShape, AmmoPointToPointConstraint, AmmoHingeConstraint;
  return {
    setters: [function (_frameworkPhysicsSelectorJs) {
      selector = _frameworkPhysicsSelectorJs.selector;
    }, function (_ammoRigidBodyJs) {
      AmmoRigidBody = _ammoRigidBodyJs.AmmoRigidBody;
    }, function (_ammoWorldJs) {
      AmmoWorld = _ammoWorldJs.AmmoWorld;
    }, function (_shapesAmmoBoxShapeJs) {
      AmmoBoxShape = _shapesAmmoBoxShapeJs.AmmoBoxShape;
    }, function (_shapesAmmoSphereShapeJs) {
      AmmoSphereShape = _shapesAmmoSphereShapeJs.AmmoSphereShape;
    }, function (_shapesAmmoCapsuleShapeJs) {
      AmmoCapsuleShape = _shapesAmmoCapsuleShapeJs.AmmoCapsuleShape;
    }, function (_shapesAmmoTrimeshShapeJs) {
      AmmoTrimeshShape = _shapesAmmoTrimeshShapeJs.AmmoTrimeshShape;
    }, function (_shapesAmmoCylinderShapeJs) {
      AmmoCylinderShape = _shapesAmmoCylinderShapeJs.AmmoCylinderShape;
    }, function (_shapesAmmoConeShapeJs) {
      AmmoConeShape = _shapesAmmoConeShapeJs.AmmoConeShape;
    }, function (_shapesAmmoTerrainShapeJs) {
      AmmoTerrainShape = _shapesAmmoTerrainShapeJs.AmmoTerrainShape;
    }, function (_shapesAmmoSimplexShapeJs) {
      AmmoSimplexShape = _shapesAmmoSimplexShapeJs.AmmoSimplexShape;
    }, function (_shapesAmmoPlaneShapeJs) {
      AmmoPlaneShape = _shapesAmmoPlaneShapeJs.AmmoPlaneShape;
    }, function (_constraintsAmmoPointToPointConstraintJs) {
      AmmoPointToPointConstraint = _constraintsAmmoPointToPointConstraintJs.AmmoPointToPointConstraint;
    }, function (_constraintsAmmoHingeConstraintJs) {
      AmmoHingeConstraint = _constraintsAmmoHingeConstraintJs.AmmoHingeConstraint;
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
      selector.select('ammo.js', {
        PhysicsWorld: AmmoWorld,
        RigidBody: AmmoRigidBody,
        BoxShape: AmmoBoxShape,
        SphereShape: AmmoSphereShape,
        CapsuleShape: AmmoCapsuleShape,
        TrimeshShape: AmmoTrimeshShape,
        CylinderShape: AmmoCylinderShape,
        ConeShape: AmmoConeShape,
        TerrainShape: AmmoTerrainShape,
        SimplexShape: AmmoSimplexShape,
        PlaneShape: AmmoPlaneShape,
        PointToPointConstraint: AmmoPointToPointConstraint,
        HingeConstraint: AmmoHingeConstraint
      });
    }
  };
});