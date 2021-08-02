System.register("q-bundled:///fs/cocos/physics/framework/index.js", ["./physics-system.js", "./assets/physics-material.js", "./physics-ray-result.js", "./components/colliders/box-collider.js", "./components/colliders/collider.js", "./components/colliders/sphere-collider.js", "./components/colliders/capsule-collider.js", "./components/colliders/cylinder-collider.js", "./components/colliders/cone-collider.js", "./components/colliders/mesh-collider.js", "./components/rigid-body.js", "./components/constant-force.js", "./components/colliders/terrain-collider.js", "./components/colliders/simplex-collider.js", "./components/colliders/plane-collider.js", "./components/constraints/constraint.js", "./components/constraints/hinge-constraint.js", "./components/constraints/point-to-point-constraint.js", "../../core/global-exports.js", "./physics-selector.js", "../utils/util.js", "./physics-interface.js", "./physics-config.js", "./physics-enum.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem, PhysicsMaterial, PhysicsRayResult, BoxCollider, Collider, SphereCollider, CapsuleCollider, CylinderCollider, ConeCollider, MeshCollider, RigidBody, ConstantForce, TerrainCollider, SimplexCollider, PlaneCollider, Constraint, HingeConstraint, PointToPointConstraint, legacyCC, selector, utils;
  return {
    setters: [function (_physicsSystemJs) {
      PhysicsSystem = _physicsSystemJs.PhysicsSystem;
    }, function (_assetsPhysicsMaterialJs) {
      PhysicsMaterial = _assetsPhysicsMaterialJs.PhysicsMaterial;
    }, function (_physicsRayResultJs) {
      PhysicsRayResult = _physicsRayResultJs.PhysicsRayResult;
    }, function (_componentsCollidersBoxColliderJs) {
      BoxCollider = _componentsCollidersBoxColliderJs.BoxCollider;
    }, function (_componentsCollidersColliderJs) {
      Collider = _componentsCollidersColliderJs.Collider;
    }, function (_componentsCollidersSphereColliderJs) {
      SphereCollider = _componentsCollidersSphereColliderJs.SphereCollider;
    }, function (_componentsCollidersCapsuleColliderJs) {
      CapsuleCollider = _componentsCollidersCapsuleColliderJs.CapsuleCollider;
    }, function (_componentsCollidersCylinderColliderJs) {
      CylinderCollider = _componentsCollidersCylinderColliderJs.CylinderCollider;
    }, function (_componentsCollidersConeColliderJs) {
      ConeCollider = _componentsCollidersConeColliderJs.ConeCollider;
    }, function (_componentsCollidersMeshColliderJs) {
      MeshCollider = _componentsCollidersMeshColliderJs.MeshCollider;
    }, function (_componentsRigidBodyJs) {
      RigidBody = _componentsRigidBodyJs.RigidBody;
    }, function (_componentsConstantForceJs) {
      ConstantForce = _componentsConstantForceJs.ConstantForce;
    }, function (_componentsCollidersTerrainColliderJs) {
      TerrainCollider = _componentsCollidersTerrainColliderJs.TerrainCollider;
    }, function (_componentsCollidersSimplexColliderJs) {
      SimplexCollider = _componentsCollidersSimplexColliderJs.SimplexCollider;
    }, function (_componentsCollidersPlaneColliderJs) {
      PlaneCollider = _componentsCollidersPlaneColliderJs.PlaneCollider;
    }, function (_componentsConstraintsConstraintJs) {
      Constraint = _componentsConstraintsConstraintJs.Constraint;
    }, function (_componentsConstraintsHingeConstraintJs) {
      HingeConstraint = _componentsConstraintsHingeConstraintJs.HingeConstraint;
    }, function (_componentsConstraintsPointToPointConstraintJs) {
      PointToPointConstraint = _componentsConstraintsPointToPointConstraintJs.PointToPointConstraint;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_physicsSelectorJs) {
      selector = _physicsSelectorJs.selector;
    }, function (_utilsUtilJs) {
      utils = _utilsUtilJs;
    }, function (_physicsInterfaceJs) {
      var _exportObj = {};

      for (var _key in _physicsInterfaceJs) {
        if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _physicsInterfaceJs[_key];
      }

      _export(_exportObj);
    }, function (_physicsConfigJs) {
      var _exportObj2 = {};

      for (var _key2 in _physicsConfigJs) {
        if (_key2 !== "default" && _key2 !== "__esModule") _exportObj2[_key2] = _physicsConfigJs[_key2];
      }

      _export(_exportObj2);
    }, function (_physicsEnumJs) {
      var _exportObj3 = {};

      for (var _key3 in _physicsEnumJs) {
        if (_key3 !== "default" && _key3 !== "__esModule") _exportObj3[_key3] = _physicsEnumJs[_key3];
      }

      _export(_exportObj3);
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
      // constraints
      _export("PhysicsSystem", PhysicsSystem);

      _export("PhysicsRayResult", PhysicsRayResult);

      _export("Collider", Collider);

      _export("BoxCollider", BoxCollider);

      _export("SphereCollider", SphereCollider);

      _export("CapsuleCollider", CapsuleCollider);

      _export("MeshCollider", MeshCollider);

      _export("CylinderCollider", CylinderCollider);

      _export("ConeCollider", ConeCollider);

      _export("TerrainCollider", TerrainCollider);

      _export("SimplexCollider", SimplexCollider);

      _export("PlaneCollider", PlaneCollider);

      _export("Constraint", Constraint);

      _export("HingeConstraint", HingeConstraint);

      _export("PointToPointConstraint", PointToPointConstraint);

      _export("RigidBody", RigidBody);

      _export("PhysicsMaterial", PhysicsMaterial);

      _export("ConstantForce", ConstantForce);

      _export("selector", selector);

      _export("utils", utils);

      legacyCC.PhysicsSystem = PhysicsSystem;
      legacyCC.PhysicsMaterial = PhysicsMaterial;
      legacyCC.PhysicsRayResult = PhysicsRayResult;
      legacyCC.ConstantForce = ConstantForce;
    }
  };
});