System.register("q-bundled:///fs/cocos/physics/framework/instance.js", ["../../../../virtual/internal%253Aconstants.js", "./physics-selector.js", "../../core/index.js", "./physics-enum.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, selector, errorID, warn, EColliderType, EConstraintType, legacyCC, FUNC, ENTIRE_WORLD, ECheckType, ENTIRE_RIGID_BODY, CREATE_COLLIDER_PROXY, ENTIRE_SHAPE, CREATE_CONSTRAINT_PROXY, ENTIRE_CONSTRAINT;

  function check(obj, type) {
    if (!TEST && !EDITOR && !legacyCC.GAME_VIEW && obj == null) {
      if (selector.id) {
        warn(selector.id + " physics does not support " + ECheckType[type]);
      } else {
        errorID(9600);
      }

      return true;
    }

    return false;
  }

  function createPhysicsWorld() {
    if (check(selector.wrapper.PhysicsWorld, ECheckType.World)) {
      return ENTIRE_WORLD;
    }

    return new selector.wrapper.PhysicsWorld();
  }

  function createRigidBody() {
    if (check(selector.wrapper.RigidBody, ECheckType.RigidBody)) {
      return ENTIRE_RIGID_BODY;
    }

    return new selector.wrapper.RigidBody();
  } /// CREATE COLLIDER ///


  function createShape(type) {
    initColliderProxy();
    return CREATE_COLLIDER_PROXY[type]();
  }

  function initColliderProxy() {
    if (CREATE_COLLIDER_PROXY.INITED) return;
    CREATE_COLLIDER_PROXY.INITED = true;

    CREATE_COLLIDER_PROXY[EColliderType.BOX] = function createBoxShape() {
      if (check(selector.wrapper.BoxShape, ECheckType.BoxCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.BoxShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.SPHERE] = function createSphereShape() {
      if (check(selector.wrapper.SphereShape, ECheckType.SphereCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.SphereShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.CAPSULE] = function createCapsuleShape() {
      if (check(selector.wrapper.CapsuleShape, ECheckType.CapsuleCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.CapsuleShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.CYLINDER] = function createCylinderShape() {
      if (check(selector.wrapper.CylinderShape, ECheckType.CylinderCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.CylinderShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.CONE] = function createConeShape() {
      if (check(selector.wrapper.ConeShape, ECheckType.ConeCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.ConeShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.MESH] = function createTrimeshShape() {
      if (check(selector.wrapper.TrimeshShape, ECheckType.MeshCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.TrimeshShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.TERRAIN] = function createTerrainShape() {
      if (check(selector.wrapper.TerrainShape, ECheckType.TerrainCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.TerrainShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.SIMPLEX] = function createSimplexShape() {
      if (check(selector.wrapper.SimplexShape, ECheckType.SimplexCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.SimplexShape();
    };

    CREATE_COLLIDER_PROXY[EColliderType.PLANE] = function createPlaneShape() {
      if (check(selector.wrapper.PlaneShape, ECheckType.PlaneCollider)) {
        return ENTIRE_SHAPE;
      }

      return new selector.wrapper.PlaneShape();
    };
  } /// CREATE CONSTRAINT ///


  function createConstraint(type) {
    initConstraintProxy();
    return CREATE_CONSTRAINT_PROXY[type]();
  }

  function initConstraintProxy() {
    if (CREATE_CONSTRAINT_PROXY.INITED) return;
    CREATE_CONSTRAINT_PROXY.INITED = true;

    CREATE_CONSTRAINT_PROXY[EConstraintType.POINT_TO_POINT] = function createPointToPointConstraint() {
      if (check(selector.wrapper.PointToPointConstraint, ECheckType.PointToPointConstraint)) {
        return ENTIRE_CONSTRAINT;
      }

      return new selector.wrapper.PointToPointConstraint();
    };

    CREATE_CONSTRAINT_PROXY[EConstraintType.HINGE] = function createHingeConstraint() {
      if (check(selector.wrapper.HingeConstraint, ECheckType.HingeConstraint)) {
        return ENTIRE_CONSTRAINT;
      }

      return new selector.wrapper.HingeConstraint();
    };

    CREATE_CONSTRAINT_PROXY[EConstraintType.CONE_TWIST] = function createConeTwistConstraint() {
      if (check(selector.wrapper.ConeTwistConstraint, ECheckType.ConeTwistConstraint)) {
        return ENTIRE_CONSTRAINT;
      }

      return new selector.wrapper.ConeTwistConstraint();
    };
  }

  _export({
    createPhysicsWorld: createPhysicsWorld,
    createRigidBody: createRigidBody,
    createShape: createShape,
    createConstraint: createConstraint
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_physicsSelectorJs) {
      selector = _physicsSelectorJs.selector;
    }, function (_coreIndexJs) {
      errorID = _coreIndexJs.errorID;
      warn = _coreIndexJs.warn;
    }, function (_physicsEnumJs) {
      EColliderType = _physicsEnumJs.EColliderType;
      EConstraintType = _physicsEnumJs.EConstraintType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
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

      /* eslint-disable @typescript-eslint/no-unsafe-return */
      FUNC = function FUNC() {
        return 0;
      };

      ENTIRE_WORLD = {
        impl: null,
        setGravity: FUNC,
        setAllowSleep: FUNC,
        setDefaultMaterial: FUNC,
        step: FUNC,
        syncAfterEvents: FUNC,
        syncSceneToPhysics: FUNC,
        raycast: FUNC,
        raycastClosest: FUNC,
        emitEvents: FUNC,
        destroy: FUNC
      };

      (function (ECheckType) {
        ECheckType[ECheckType["World"] = 0] = "World";
        ECheckType[ECheckType["RigidBody"] = 1] = "RigidBody";
        ECheckType[ECheckType["BoxCollider"] = 2] = "BoxCollider";
        ECheckType[ECheckType["SphereCollider"] = 3] = "SphereCollider";
        ECheckType[ECheckType["CapsuleCollider"] = 4] = "CapsuleCollider";
        ECheckType[ECheckType["MeshCollider"] = 5] = "MeshCollider";
        ECheckType[ECheckType["CylinderCollider"] = 6] = "CylinderCollider";
        ECheckType[ECheckType["ConeCollider"] = 7] = "ConeCollider";
        ECheckType[ECheckType["TerrainCollider"] = 8] = "TerrainCollider";
        ECheckType[ECheckType["SimplexCollider"] = 9] = "SimplexCollider";
        ECheckType[ECheckType["PlaneCollider"] = 10] = "PlaneCollider";
        ECheckType[ECheckType["PointToPointConstraint"] = 11] = "PointToPointConstraint";
        ECheckType[ECheckType["HingeConstraint"] = 12] = "HingeConstraint";
        ECheckType[ECheckType["ConeTwistConstraint"] = 13] = "ConeTwistConstraint";
      })(ECheckType || (ECheckType = {}));

      ENTIRE_RIGID_BODY = {
        impl: null,
        rigidBody: null,
        isAwake: false,
        isSleepy: false,
        isSleeping: false,
        initialize: FUNC,
        onEnable: FUNC,
        onDisable: FUNC,
        onDestroy: FUNC,
        setType: FUNC,
        setMass: FUNC,
        setLinearDamping: FUNC,
        setAngularDamping: FUNC,
        useGravity: FUNC,
        setLinearFactor: FUNC,
        setAngularFactor: FUNC,
        setAllowSleep: FUNC,
        wakeUp: FUNC,
        sleep: FUNC,
        clearState: FUNC,
        clearForces: FUNC,
        clearVelocity: FUNC,
        setSleepThreshold: FUNC,
        getSleepThreshold: FUNC,
        getLinearVelocity: FUNC,
        setLinearVelocity: FUNC,
        getAngularVelocity: FUNC,
        setAngularVelocity: FUNC,
        applyForce: FUNC,
        applyLocalForce: FUNC,
        applyImpulse: FUNC,
        applyLocalImpulse: FUNC,
        applyTorque: FUNC,
        applyLocalTorque: FUNC,
        setGroup: FUNC,
        getGroup: FUNC,
        addGroup: FUNC,
        removeGroup: FUNC,
        setMask: FUNC,
        getMask: FUNC,
        addMask: FUNC,
        removeMask: FUNC
      };
      CREATE_COLLIDER_PROXY = {
        INITED: false
      };
      ENTIRE_SHAPE = {
        impl: null,
        collider: null,
        attachedRigidBody: null,
        initialize: FUNC,
        onLoad: FUNC,
        onEnable: FUNC,
        onDisable: FUNC,
        onDestroy: FUNC,
        setGroup: FUNC,
        getGroup: FUNC,
        addGroup: FUNC,
        removeGroup: FUNC,
        setMask: FUNC,
        getMask: FUNC,
        addMask: FUNC,
        removeMask: FUNC,
        setMaterial: FUNC,
        setAsTrigger: FUNC,
        setCenter: FUNC,
        getAABB: FUNC,
        getBoundingSphere: FUNC,
        setSize: FUNC,
        setRadius: FUNC,
        setCylinderHeight: FUNC,
        setDirection: FUNC,
        setHeight: FUNC,
        setShapeType: FUNC,
        setVertices: FUNC,
        setMesh: FUNC,
        setTerrain: FUNC,
        setNormal: FUNC,
        setConstant: FUNC,
        updateEventListener: FUNC
      };
      CREATE_CONSTRAINT_PROXY = {
        INITED: false
      };
      ENTIRE_CONSTRAINT = {
        impl: null,
        initialize: FUNC,
        onLoad: FUNC,
        onEnable: FUNC,
        onDisable: FUNC,
        onDestroy: FUNC,
        setEnableCollision: FUNC,
        setConnectedBody: FUNC,
        setPivotA: FUNC,
        setPivotB: FUNC,
        setAxis: FUNC
      };
    }
  };
});