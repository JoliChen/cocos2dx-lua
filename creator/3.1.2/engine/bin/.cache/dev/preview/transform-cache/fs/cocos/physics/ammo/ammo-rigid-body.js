System.register("q-bundled:///fs/cocos/physics/ammo/ammo-rigid-body.js", ["../../core/index.js", "./ammo-util.js", "../../../exports/physics-framework.js", "./ammo-enum.js", "./ammo-const.js"], function (_export, _context) {
  "use strict";

  var Vec3, cocos2AmmoVec3, ammo2CocosVec3, PhysicsSystem, AmmoRigidBodyFlags, AmmoCollisionObjectStates, EAmmoSharedBodyDirty, AmmoConstant, CC_V3_0, CC_V3_1, v3_0, v3_1, AmmoRigidBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
      ammo2CocosVec3 = _ammoUtilJs.ammo2CocosVec3;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_ammoEnumJs) {
      AmmoRigidBodyFlags = _ammoEnumJs.AmmoRigidBodyFlags;
      AmmoCollisionObjectStates = _ammoEnumJs.AmmoCollisionObjectStates;
      EAmmoSharedBodyDirty = _ammoEnumJs.EAmmoSharedBodyDirty;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
      CC_V3_1 = _ammoConstJs.CC_V3_1;
    }],
    execute: function () {
      v3_0 = CC_V3_0;
      v3_1 = CC_V3_1;

      _export("AmmoRigidBody", AmmoRigidBody = /*#__PURE__*/function () {
        var _proto = AmmoRigidBody.prototype;

        _proto.setMass = function setMass(value) {
          if (!this._rigidBody.isDynamic) return; // See https://studiofreya.com/game-maker/bullet-physics/bullet-physics-how-to-change-body-mass/

          var localInertia = this._sharedBody.bodyStruct.localInertia;
          localInertia.setValue(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
          var shape = this.impl.getCollisionShape();

          if (shape.isCompound()) {
            if (this._sharedBody.bodyCompoundShape.getNumChildShapes() > 0) {
              shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
            }
          } else {
            shape.calculateLocalInertia(this._rigidBody.mass, localInertia);
          }

          this.impl.setMassProps(value, localInertia);

          this._wakeUpIfSleep();

          this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
        };

        _proto.setType = function setType(v) {
          this._sharedBody.setType(v);
        };

        _proto.setLinearDamping = function setLinearDamping(value) {
          this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
        };

        _proto.setAngularDamping = function setAngularDamping(value) {
          this.impl.setDamping(this._rigidBody.linearDamping, this._rigidBody.angularDamping);
        };

        _proto.useGravity = function useGravity(value) {
          if (!this._rigidBody.isDynamic) return;
          var m_rigidBodyFlag = this.impl.getFlags();

          if (value) {
            m_rigidBodyFlag &= ~AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
          } else {
            this.impl.setGravity(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, Vec3.ZERO));
            m_rigidBodyFlag |= AmmoRigidBodyFlags.BT_DISABLE_WORLD_GRAVITY;
          }

          this.impl.setFlags(m_rigidBodyFlag);

          this._wakeUpIfSleep();

          this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
        };

        _proto.setLinearFactor = function setLinearFactor(value) {
          this.impl.setLinearFactor(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, value));

          this._wakeUpIfSleep();
        };

        _proto.setAngularFactor = function setAngularFactor(value) {
          this.impl.setAngularFactor(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, value));

          this._wakeUpIfSleep();
        };

        _proto.setAllowSleep = function setAllowSleep(v) {
          if (!this._rigidBody.isDynamic) return;

          if (v) {
            this.impl.forceActivationState(AmmoCollisionObjectStates.ACTIVE_TAG);
          } else {
            this.impl.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
          }

          this._wakeUpIfSleep();
        };

        function AmmoRigidBody() {
          this.id = void 0;
          this._isEnabled = false;
          this.id = AmmoRigidBody.idCounter++;
        }

        _proto.clearState = function clearState() {
          this.impl.clearState();
        };

        _proto.clearVelocity = function clearVelocity() {
          this.setLinearVelocity(Vec3.ZERO);
          this.setAngularVelocity(Vec3.ZERO);
        };

        _proto.clearForces = function clearForces() {
          this.impl.clearForces();
        }
        /** LIFECYCLE */
        ;

        _proto.initialize = function initialize(com) {
          this._rigidBody = com;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
          this._sharedBody.reference = true;
        };

        _proto.onEnable = function onEnable() {
          this._isEnabled = true;
          this.setMass(this._rigidBody.mass);
          this.setAllowSleep(this._rigidBody.allowSleep);
          this.setLinearDamping(this._rigidBody.linearDamping);
          this.setAngularDamping(this._rigidBody.angularDamping);
          this.setLinearFactor(this._rigidBody.linearFactor);
          this.setAngularFactor(this._rigidBody.angularFactor);
          this.useGravity(this._rigidBody.useGravity);
          this._sharedBody.bodyEnabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._isEnabled = false;
          this._sharedBody.bodyEnabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._rigidBody = null;
          this._sharedBody = null;
        }
        /** INTERFACE */
        ;

        _proto.wakeUp = function wakeUp(force) {
          if (force === void 0) {
            force = true;
          }

          this.impl.activate(force);
        };

        _proto.sleep = function sleep() {
          return this.impl.wantsSleeping();
        };

        _proto.setSleepThreshold = function setSleepThreshold(v) {
          this._wakeUpIfSleep();

          this.impl.setSleepingThresholds(v, v);
        };

        _proto.getSleepThreshold = function getSleepThreshold() {
          return this.impl.getLinearSleepingThreshold();
        };

        _proto.getLinearVelocity = function getLinearVelocity(out) {
          return ammo2CocosVec3(out, this.impl.getLinearVelocity());
        };

        _proto.setLinearVelocity = function setLinearVelocity(value) {
          this._wakeUpIfSleep();

          cocos2AmmoVec3(this.impl.getLinearVelocity(), value);
        };

        _proto.getAngularVelocity = function getAngularVelocity(out) {
          return ammo2CocosVec3(out, this.impl.getAngularVelocity());
        };

        _proto.setAngularVelocity = function setAngularVelocity(value) {
          this._wakeUpIfSleep();

          cocos2AmmoVec3(this.impl.getAngularVelocity(), value);
        };

        _proto.applyLocalForce = function applyLocalForce(force, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var quat = this._sharedBody.node.worldRotation;
          var v = Vec3.transformQuat(v3_0, force, quat);
          var rp = rel_pos ? Vec3.transformQuat(v3_1, rel_pos, quat) : Vec3.ZERO;
          this.impl.applyForce(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
        };

        _proto.applyLocalTorque = function applyLocalTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);
          this.impl.applyTorque(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v3_0));
        };

        _proto.applyLocalImpulse = function applyLocalImpulse(impulse, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var quat = this._sharedBody.node.worldRotation;
          var v = Vec3.transformQuat(v3_0, impulse, quat);
          var rp = rel_pos ? Vec3.transformQuat(v3_1, rel_pos, quat) : Vec3.ZERO;
          this.impl.applyImpulse(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, v), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
        };

        _proto.applyForce = function applyForce(force, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var rp = rel_pos || Vec3.ZERO;
          this.impl.applyForce(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, force), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
        };

        _proto.applyTorque = function applyTorque(torque) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          this.impl.applyTorque(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, torque));
        };

        _proto.applyImpulse = function applyImpulse(impulse, rel_pos) {
          this._sharedBody.syncSceneToPhysics();

          this._wakeUpIfSleep();

          var rp = rel_pos || Vec3.ZERO;
          this.impl.applyImpulse(cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_0, impulse), cocos2AmmoVec3(AmmoConstant.instance.VECTOR3_1, rp));
        };

        _proto.getGroup = function getGroup() {
          return this._sharedBody.collisionFilterGroup;
        };

        _proto.setGroup = function setGroup(v) {
          this._sharedBody.collisionFilterGroup = v;
        };

        _proto.addGroup = function addGroup(v) {
          this._sharedBody.collisionFilterGroup |= v;
        };

        _proto.removeGroup = function removeGroup(v) {
          this._sharedBody.collisionFilterGroup &= ~v;
        };

        _proto.getMask = function getMask() {
          return this._sharedBody.collisionFilterMask;
        };

        _proto.setMask = function setMask(v) {
          this._sharedBody.collisionFilterMask = v;
        };

        _proto.addMask = function addMask(v) {
          this._sharedBody.collisionFilterMask |= v;
        };

        _proto.removeMask = function removeMask(v) {
          this._sharedBody.collisionFilterMask &= ~v;
        };

        _proto._wakeUpIfSleep = function _wakeUpIfSleep() {
          if (!this.isAwake) this.impl.activate(true);
        };

        _createClass(AmmoRigidBody, [{
          key: "isAwake",
          get: function get() {
            var state = this.impl.getActivationState();
            return state === AmmoCollisionObjectStates.ACTIVE_TAG || state === AmmoCollisionObjectStates.DISABLE_DEACTIVATION;
          }
        }, {
          key: "isSleepy",
          get: function get() {
            var state = this.impl.getActivationState();
            return state === AmmoCollisionObjectStates.WANTS_DEACTIVATION;
          }
        }, {
          key: "isSleeping",
          get: function get() {
            var state = this.impl.getActivationState();
            return state === AmmoCollisionObjectStates.ISLAND_SLEEPING;
          }
        }, {
          key: "isEnabled",
          get: function get() {
            return this._isEnabled;
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
        }]);

        return AmmoRigidBody;
      }());

      AmmoRigidBody.idCounter = 0;
    }
  };
});