System.register("q-bundled:///fs/cocos/physics/cannon/cannon-rigid-body.js", ["@cocos/cannon", "../../core/math/index.js", "../framework/physics-system.js", "../framework/index.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, PhysicsSystem, ERigidBodyType, v3_cannon0, v3_cannon1, CannonRigidBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_frameworkPhysicsSystemJs) {
      PhysicsSystem = _frameworkPhysicsSystemJs.PhysicsSystem;
    }, function (_frameworkIndexJs) {
      ERigidBodyType = _frameworkIndexJs.ERigidBodyType;
    }],
    execute: function () {
      v3_cannon0 = new CANNON.Vec3();
      v3_cannon1 = new CANNON.Vec3();
      /**
       * wrapped shared body
       * dynamic
       * kinematic
       */

      _export("CannonRigidBody", CannonRigidBody = /*#__PURE__*/function () {
        function CannonRigidBody() {
          this._isEnabled = false;
        }

        var _proto = CannonRigidBody.prototype;

        _proto.setAllowSleep = function setAllowSleep(v) {
          if (this.impl.type !== CANNON.Body.DYNAMIC) return;
          this.impl.allowSleep = v;

          this._wakeUpIfSleep();
        };

        _proto.setMass = function setMass(value) {
          if (this.impl.type !== CANNON.Body.DYNAMIC) return;
          this.impl.mass = value;
          this.impl.updateMassProperties();

          this._wakeUpIfSleep();
        };

        _proto.setType = function setType(v) {
          switch (v) {
            case ERigidBodyType.DYNAMIC:
              this.impl.type = CANNON.Body.DYNAMIC;
              this.impl.allowSleep = this._rigidBody.allowSleep;
              this.setMass(this._rigidBody.mass);
              break;

            case ERigidBodyType.KINEMATIC:
              this.impl.type = CANNON.Body.KINEMATIC;
              this.impl.mass = 0;
              this.impl.allowSleep = false;
              this.impl.sleepState = CANNON.Body.AWAKE;
              this.impl.updateMassProperties();
              break;

            case ERigidBodyType.STATIC:
            default:
              this.impl.type = CANNON.Body.STATIC;
              this.impl.mass = 0;
              this.impl.allowSleep = true;
              this.impl.updateMassProperties();
              break;
          }
        };

        _proto.setLinearDamping = function setLinearDamping(value) {
          this.impl.linearDamping = value;
        };

        _proto.setAngularDamping = function setAngularDamping(value) {
          this.impl.angularDamping = value;
        };

        _proto.useGravity = function useGravity(value) {
          this.impl.useGravity = value;

          this._wakeUpIfSleep();
        };

        _proto.setLinearFactor = function setLinearFactor(value) {
          Vec3.copy(this.impl.linearFactor, value);

          this._wakeUpIfSleep();
        };

        _proto.setAngularFactor = function setAngularFactor(value) {
          Vec3.copy(this.impl.angularFactor, value);
          var fixR = Vec3.equals(this.impl.angularFactor, Vec3.ZERO);

          if (fixR !== this.impl.fixedRotation) {
            this.impl.fixedRotation = fixR;
            this.impl.updateMassProperties();
          }

          this._wakeUpIfSleep();
        };

        /** LIFECYCLE */
        _proto.initialize = function initialize(com) {
          this._rigidBody = com;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
          this._sharedBody.reference = true;
          this._sharedBody.wrappedBody = this;
        };

        _proto.onLoad = function onLoad() {};

        _proto.onEnable = function onEnable() {
          this._isEnabled = true;
          this.setType(this._rigidBody.type);
          this.setMass(this._rigidBody.mass);
          this.setAllowSleep(this._rigidBody.allowSleep);
          this.setLinearDamping(this._rigidBody.linearDamping);
          this.setAngularDamping(this._rigidBody.angularDamping);
          this.useGravity(this._rigidBody.useGravity);
          this.setLinearFactor(this._rigidBody.linearFactor);
          this.setAngularFactor(this._rigidBody.angularFactor);
          this._sharedBody.enabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._isEnabled = false;
          this._sharedBody.enabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._rigidBody = null;
          this._sharedBody = null;
        }
        /** INTERFACE */
        ;

        _proto.clearVelocity = function clearVelocity() {
          this.impl.velocity.setZero();
          this.impl.angularVelocity.setZero();
        };

        _proto.clearForces = function clearForces() {
          this.impl.force.setZero();
          this.impl.torque.setZero();
        };

        _proto.clearState = function clearState() {
          this.clearVelocity();
          this.clearForces();
        };

        _proto.wakeUp = function wakeUp() {
          return this.impl.wakeUp();
        };

        _proto.sleep = function sleep() {
          return this.impl.sleep();
        };

        _proto.setSleepThreshold = function setSleepThreshold(v) {
          this.impl.sleepSpeedLimit = v;

          this._wakeUpIfSleep();
        };

        _proto.getSleepThreshold = function getSleepThreshold() {
          return this.impl.sleepSpeedLimit;
        };

        _proto.getLinearVelocity = function getLinearVelocity(out) {
          Vec3.copy(out, this.impl.velocity);
          return out;
        };

        _proto.setLinearVelocity = function setLinearVelocity(value) {
          this._wakeUpIfSleep();

          Vec3.copy(this.impl.velocity, value);
        };

        _proto.getAngularVelocity = function getAngularVelocity(out) {
          Vec3.copy(out, this.impl.angularVelocity);
          return out;
        };

        _proto.setAngularVelocity = function setAngularVelocity(value) {
          this._wakeUpIfSleep();

          Vec3.copy(this.impl.angularVelocity, value);
        };

        _proto.applyForce = function applyForce(force, worldPoint) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          if (worldPoint == null) worldPoint = Vec3.ZERO;
          this.impl.applyForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, worldPoint));
        };

        _proto.applyImpulse = function applyImpulse(impulse, worldPoint) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          if (worldPoint == null) worldPoint = Vec3.ZERO;
          this.impl.applyImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, worldPoint));
        };

        _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          if (localPoint == null) localPoint = Vec3.ZERO;
          this.impl.applyLocalForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, localPoint));
        };

        _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          if (localPoint == null) localPoint = Vec3.ZERO;
          this.impl.applyLocalImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, localPoint));
        };

        _proto.applyTorque = function applyTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          Vec3.add(this.impl.torque, this.impl.torque, torque);
        };

        _proto.applyLocalTorque = function applyLocalTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          Vec3.copy(v3_cannon0, torque);
          this.impl.vectorToWorldFrame(v3_cannon0, v3_cannon0);
          Vec3.add(this.impl.torque, this.impl.torque, v3_cannon0);
        }
        /** group */
        ;

        _proto.getGroup = function getGroup() {
          return this.impl.collisionFilterGroup;
        };

        _proto.setGroup = function setGroup(v) {
          this.impl.collisionFilterGroup = v;

          this._wakeUpIfSleep();
        };

        _proto.addGroup = function addGroup(v) {
          this.impl.collisionFilterGroup |= v;

          this._wakeUpIfSleep();
        };

        _proto.removeGroup = function removeGroup(v) {
          this.impl.collisionFilterGroup &= ~v;

          this._wakeUpIfSleep();
        }
        /** mask */
        ;

        _proto.getMask = function getMask() {
          return this.impl.collisionFilterMask;
        };

        _proto.setMask = function setMask(v) {
          this.impl.collisionFilterMask = v;

          this._wakeUpIfSleep();
        };

        _proto.addMask = function addMask(v) {
          this.impl.collisionFilterMask |= v;

          this._wakeUpIfSleep();
        };

        _proto.removeMask = function removeMask(v) {
          this.impl.collisionFilterMask &= ~v;

          this._wakeUpIfSleep();
        };

        _proto._wakeUpIfSleep = function _wakeUpIfSleep() {
          if (!this.impl.isAwake()) this.impl.wakeUp();
        };

        _createClass(CannonRigidBody, [{
          key: "isAwake",
          get: function get() {
            return this.impl.isAwake();
          }
        }, {
          key: "isSleepy",
          get: function get() {
            return this.impl.isSleepy();
          }
        }, {
          key: "isSleeping",
          get: function get() {
            return this.impl.isSleeping();
          }
        }, {
          key: "impl",
          get: function get() {
            return this._sharedBody.body;
          }
        }, {
          key: "rigidBody",
          get: function get() {
            return this._rigidBody;
          }
        }, {
          key: "sharedBody",
          get: function get() {
            return this._sharedBody;
          }
        }, {
          key: "isEnabled",
          get: function get() {
            return this._isEnabled;
          }
        }]);

        return CannonRigidBody;
      }());
    }
  };
});