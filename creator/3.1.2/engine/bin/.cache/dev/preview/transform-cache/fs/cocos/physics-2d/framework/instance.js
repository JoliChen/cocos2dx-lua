System.register("q-bundled:///fs/cocos/physics-2d/framework/instance.js", ["../../../../virtual/internal%253Aconstants.js", "./physics-selector.js", "../../core/index.js", "./physics-types.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, DEBUG, TEST, WRAPPER, errorID, ECollider2DType, EJoint2DType, legacyCC, FUNC, EntireBody, CREATE_COLLIDER_PROXY, ENTIRE_SHAPE, CREATE_JOINT_PROXY, ENTIRE_JOINT;

  function checkPhysicsModule(obj) {
    if (DEBUG && !TEST && !EDITOR && obj == null) {
      errorID(9600);
      return true;
    }

    return false;
  }

  function createPhysicsWorld() {
    if (DEBUG && checkPhysicsModule(WRAPPER.PhysicsWorld)) {
      return null;
    }

    return new WRAPPER.PhysicsWorld();
  }

  function createRigidBody() {
    var PHYSICS_2D_BUILTIN = legacyCC._global.CC_PHYSICS_2D_BUILTIN;

    if (PHYSICS_2D_BUILTIN) {
      return EntireBody;
    } else {
      if (DEBUG && checkPhysicsModule(WRAPPER.RigidBody)) {
        return null;
      }

      return new WRAPPER.RigidBody();
    }
  } // shapes


  function createShape(type) {
    initColliderProxy();
    return CREATE_COLLIDER_PROXY[type]();
  }

  function initColliderProxy() {
    if (CREATE_COLLIDER_PROXY.INITED) return;
    CREATE_COLLIDER_PROXY.INITED = true;

    CREATE_COLLIDER_PROXY[ECollider2DType.BOX] = function createBoxShape() {
      if (DEBUG && checkPhysicsModule(WRAPPER.BoxShape)) {
        return ENTIRE_SHAPE;
      }

      return new WRAPPER.BoxShape();
    };

    CREATE_COLLIDER_PROXY[ECollider2DType.CIRCLE] = function createCircleShape() {
      if (DEBUG && checkPhysicsModule(WRAPPER.CircleShape)) {
        return ENTIRE_SHAPE;
      }

      return new WRAPPER.CircleShape();
    };

    CREATE_COLLIDER_PROXY[ECollider2DType.POLYGON] = function createPolygonShape() {
      if (DEBUG && checkPhysicsModule(WRAPPER.PolygonShape)) {
        return ENTIRE_SHAPE;
      }

      return new WRAPPER.PolygonShape();
    };
  } // joints


  function createJoint(type) {
    initJointProxy();
    return CREATE_JOINT_PROXY[type]();
  }

  function initJointProxy() {
    if (CREATE_JOINT_PROXY.INITED) return;
    CREATE_JOINT_PROXY.INITED = true;
    var PHYSICS_2D_BUILTIN = legacyCC._global.CC_PHYSICS_2D_BUILTIN;

    CREATE_JOINT_PROXY[EJoint2DType.SPRING] = function createSpringJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.SpringJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.SpringJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.DISTANCE] = function createDistanceJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.DistanceJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.DistanceJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.FIXED] = function createFixedJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.FixedJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.FixedJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.MOUSE] = function createMouseJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.MouseJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.MouseJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.RELATIVE] = function createRelativeJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.RelativeJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.RelativeJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.SLIDER] = function createSliderJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.SliderJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.SliderJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.WHEEL] = function createWheelJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.WheelJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.WheelJoint();
      }
    };

    CREATE_JOINT_PROXY[EJoint2DType.HINGE] = function createHingeJoint() {
      if (PHYSICS_2D_BUILTIN) {
        return ENTIRE_JOINT;
      } else {
        if (DEBUG && checkPhysicsModule(WRAPPER.HingeJoint)) {
          return ENTIRE_JOINT;
        }

        return new WRAPPER.HingeJoint();
      }
    };
  }

  _export({
    checkPhysicsModule: checkPhysicsModule,
    createPhysicsWorld: createPhysicsWorld,
    createRigidBody: createRigidBody,
    createShape: createShape,
    createJoint: createJoint
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_physicsSelectorJs) {
      WRAPPER = _physicsSelectorJs.WRAPPER;
    }, function (_coreIndexJs) {
      errorID = _coreIndexJs.errorID;
    }, function (_physicsTypesJs) {
      ECollider2DType = _physicsTypesJs.ECollider2DType;
      EJoint2DType = _physicsTypesJs.EJoint2DType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @hidden
       */
      FUNC = function FUNC() {
        return 0;
      };

      EntireBody = {
        impl: null,
        rigidBody: null,
        isAwake: false,
        isSleeping: false,
        initialize: FUNC,
        setType: FUNC,
        setLinearDamping: FUNC,
        setAngularDamping: FUNC,
        setGravityScale: FUNC,
        setFixedRotation: FUNC,
        setAllowSleep: FUNC,
        isActive: FUNC,
        setActive: FUNC,
        wakeUp: FUNC,
        sleep: FUNC,
        getMass: FUNC,
        getInertia: FUNC,
        getLinearVelocity: FUNC,
        setLinearVelocity: FUNC,
        getLinearVelocityFromWorldPoint: FUNC,
        getAngularVelocity: FUNC,
        setAngularVelocity: FUNC,
        getLocalVector: FUNC,
        getWorldVector: FUNC,
        getLocalPoint: FUNC,
        getWorldPoint: FUNC,
        getLocalCenter: FUNC,
        getWorldCenter: FUNC,
        applyForce: FUNC,
        applyForceToCenter: FUNC,
        applyTorque: FUNC,
        applyLinearImpulse: FUNC,
        applyLinearImpulseToCenter: FUNC,
        applyAngularImpulse: FUNC,
        onEnable: FUNC,
        onDisable: FUNC,
        onDestroy: FUNC
      };
      CREATE_COLLIDER_PROXY = {
        INITED: false
      };
      ENTIRE_SHAPE = {
        impl: null,
        collider: null,
        worldAABB: null,
        worldPoints: null,
        worldPosition: null,
        worldRadius: null,
        initialize: FUNC,
        apply: FUNC,
        onLoad: FUNC,
        onEnable: FUNC,
        onDisable: FUNC,
        onDestroy: FUNC,
        onGroupChanged: FUNC
      };
      CREATE_JOINT_PROXY = {
        INITED: false
      };
      ENTIRE_JOINT = {
        impl: null,
        initialize: FUNC,
        setDampingRatio: FUNC,
        setFrequency: FUNC,
        setMaxForce: FUNC,
        setTarget: FUNC,
        setDistance: FUNC,
        setAngularOffset: FUNC,
        setCorrectionFactor: FUNC,
        setLinearOffset: FUNC,
        setMaxLength: FUNC,
        setMaxTorque: FUNC,
        setLowerLimit: FUNC,
        setUpperLimit: FUNC,
        setMaxMotorForce: FUNC,
        setMaxMotorTorque: FUNC,
        setMotorSpeed: FUNC,
        enableLimit: FUNC,
        enableMotor: FUNC,
        setLowerAngle: FUNC,
        setUpperAngle: FUNC
      };
    }
  };
});