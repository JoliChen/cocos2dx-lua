System.register("q-bundled:///fs/cocos/physics/physx/physx-rigid-body.js", ["../../core/index.js", "../framework/index.js", "./export-physx.js"], function (_export, _context) {
  "use strict";

  var Vec3, PhysicsSystem, _applyForce, _applyImpulse, applyTorqueForce, PX, v3_0, PhysXRigidBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_exportPhysxJs) {
      _applyForce = _exportPhysxJs.applyForce;
      _applyImpulse = _exportPhysxJs.applyImpulse;
      applyTorqueForce = _exportPhysxJs.applyTorqueForce;
      PX = _exportPhysxJs.PX;
    }],
    execute: function () {
      v3_0 = new Vec3();

      _export("PhysXRigidBody", PhysXRigidBody = /*#__PURE__*/function () {
        function PhysXRigidBody() {
          this.isSleepy = false;
          this._isEnabled = false;
        }

        var _proto = PhysXRigidBody.prototype;

        _proto.initialize = function initialize(v) {
          this._rigidBody = v;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(v.node, this);
          this._sharedBody.reference = true;
        };

        _proto.onEnable = function onEnable() {
          this._isEnabled = true;
          this.setMass(this._rigidBody.mass);
          this.setType(this._rigidBody.type);
          this.setAllowSleep(this._rigidBody.allowSleep);
          this.setLinearDamping(this._rigidBody.linearDamping);
          this.setAngularDamping(this._rigidBody.angularDamping);
          this.setLinearFactor(this._rigidBody.linearFactor);
          this.setAngularFactor(this._rigidBody.angularFactor);
          this.useGravity(this._rigidBody.useGravity);
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
        };

        _proto.setType = function setType(v) {
          this._sharedBody.setType(v);
        };

        _proto.setMass = function setMass(v) {
          if (this.isStatic) return;

          this._sharedBody.setMass(v);
        };

        _proto.setLinearDamping = function setLinearDamping(v) {
          if (this.isStatic) return;
          this.impl.setLinearDamping(v);
        };

        _proto.setAngularDamping = function setAngularDamping(v) {
          if (this.isStatic) return;
          this.impl.setAngularDamping(v);
        };

        _proto.useGravity = function useGravity(v) {
          if (this.isStatic) return;
          this.impl.setActorFlag(PX.ActorFlag.eDISABLE_GRAVITY, !v);
        };

        _proto.useCCD = function useCCD(v) {
          if (this.isStatic) return;
          this.impl.setRigidBodyFlag(PX.RigidBodyFlag.eENABLE_CCD, v);
        };

        _proto.setLinearFactor = function setLinearFactor(v) {
          if (this.isStatic) return;
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_X, !v.x);
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Y, !v.y);
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Z, !v.z);
        };

        _proto.setAngularFactor = function setAngularFactor(v) {
          if (this.isStatic) return;
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_X, !v.x);
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Y, !v.y);
          this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Z, !v.z);
        };

        _proto.setAllowSleep = function setAllowSleep(v) {
          if (this.isStaticOrKinematic) return;
          var st = this.impl.getSleepThreshold();
          var wc = v ? Math.max(0.0, st - 0.001) : st + 0xffffffff;
          this.impl.setWakeCounter(wc);
        };

        _proto.wakeUp = function wakeUp() {
          if (this.isStatic) return;
          this.impl.wakeUp();
        };

        _proto.sleep = function sleep() {
          if (this.isStatic) return;
          this.impl.putToSleep();
        };

        _proto.clearState = function clearState() {
          if (this.isStatic) return;
          this.clearForces();
          this.clearVelocity();
        };

        _proto.clearForces = function clearForces() {
          if (this.isStatic) return;

          this._sharedBody.clearForces();
        };

        _proto.clearVelocity = function clearVelocity() {
          if (this.isStatic) return;

          this._sharedBody.clearVelocity();
        };

        _proto.setSleepThreshold = function setSleepThreshold(v) {
          if (this.isStatic) return;
          this.impl.setSleepThreshold(v);
        };

        _proto.getSleepThreshold = function getSleepThreshold() {
          if (this.isStatic) return 0;
          return this.impl.getSleepThreshold();
        };

        _proto.getLinearVelocity = function getLinearVelocity(out) {
          if (this.isStatic) return;
          Vec3.copy(out, this.impl.getLinearVelocity());
        };

        _proto.setLinearVelocity = function setLinearVelocity(value) {
          if (this.isStaticOrKinematic) return;
          this.impl.setLinearVelocity(value, true);
        };

        _proto.getAngularVelocity = function getAngularVelocity(out) {
          if (this.isStatic) return;
          Vec3.copy(out, this.impl.getAngularVelocity());
        };

        _proto.setAngularVelocity = function setAngularVelocity(value) {
          if (this.isStaticOrKinematic) return;
          this.impl.setAngularVelocity(value, true);
        };

        _proto.applyForce = function applyForce(force, relativePoint) {
          if (!this.isInScene || this.isStaticOrKinematic) return;

          this._sharedBody.syncSceneToPhysics();

          var rp = relativePoint || Vec3.ZERO;

          _applyForce(true, this.impl, force, rp);
        };

        _proto.applyLocalForce = function applyLocalForce(force, relativePoint) {
          if (!this.isInScene || this.isStaticOrKinematic) return;

          this._sharedBody.syncSceneToPhysics();

          var rp = relativePoint || Vec3.ZERO;

          _applyForce(false, this.impl, force, rp);
        };

        _proto.applyImpulse = function applyImpulse(force, relativePoint) {
          if (!this.isInScene || this.isStaticOrKinematic) return;

          this._sharedBody.syncSceneToPhysics();

          var rp = relativePoint || Vec3.ZERO;

          _applyImpulse(true, this.impl, force, rp);
        };

        _proto.applyLocalImpulse = function applyLocalImpulse(force, relativePoint) {
          if (!this.isInScene || this.isStaticOrKinematic) return;

          this._sharedBody.syncSceneToPhysics();

          var rp = relativePoint || Vec3.ZERO;

          _applyImpulse(false, this.impl, force, rp);
        };

        _proto.applyTorque = function applyTorque(torque) {
          if (!this.isInScene || this.isStaticOrKinematic) return;
          applyTorqueForce(this.impl, torque);
        };

        _proto.applyLocalTorque = function applyLocalTorque(torque) {
          if (!this.isInScene || this.isStaticOrKinematic) return;

          this._sharedBody.syncSceneToPhysics();

          Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);
          applyTorqueForce(this.impl, v3_0);
        };

        _proto.setGroup = function setGroup(v) {
          this._sharedBody.setGroup(v);
        };

        _proto.getGroup = function getGroup() {
          return this._sharedBody.getGroup();
        };

        _proto.addGroup = function addGroup(v) {
          this._sharedBody.addGroup(v);
        };

        _proto.removeGroup = function removeGroup(v) {
          this._sharedBody.removeGroup(v);
        };

        _proto.setMask = function setMask(v) {
          this._sharedBody.setMask(v);
        };

        _proto.getMask = function getMask() {
          return this._sharedBody.getMask();
        };

        _proto.addMask = function addMask(v) {
          this._sharedBody.addMask(v);
        };

        _proto.removeMask = function removeMask(v) {
          this._sharedBody.removeMask(v);
        };

        _createClass(PhysXRigidBody, [{
          key: "impl",
          get: function get() {
            return this._sharedBody.impl;
          }
        }, {
          key: "isAwake",
          get: function get() {
            return !this.isStatic && !this.impl.isSleeping();
          }
        }, {
          key: "isSleeping",
          get: function get() {
            return this.isStatic || this.impl.isSleeping();
          }
        }, {
          key: "isEnabled",
          get: function get() {
            return this._isEnabled;
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
          key: "isStatic",
          get: function get() {
            return !this.impl || this._sharedBody.isStatic;
          }
        }, {
          key: "isStaticOrKinematic",
          get: function get() {
            return !this.impl || this._sharedBody.isStatic || this._sharedBody.isKinematic;
          }
        }, {
          key: "isInScene",
          get: function get() {
            return this._sharedBody.isInScene;
          }
        }]);

        return PhysXRigidBody;
      }());
    }
  };
});