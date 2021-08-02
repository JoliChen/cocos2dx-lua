System.register("q-bundled:///fs/cocos/physics/cocos/builtin-rigid-body.js", ["../framework/index.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem, BuiltinRigidBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }],
    execute: function () {
      _export("BuiltinRigidBody", BuiltinRigidBody = /*#__PURE__*/function () {
        function BuiltinRigidBody() {}

        var _proto = BuiltinRigidBody.prototype;

        _proto.initialize = function initialize(com) {
          this._rigidBody = com;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._rigidBody.node, this);
          this._sharedBody.reference = true;
        };

        _proto.onEnable = function onEnable() {
          this._sharedBody.enabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._sharedBody.enabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._rigidBody = null;
          this._sharedBody = null;
        };

        _proto.setMass = function setMass(v) {};

        _proto.setType = function setType(v) {};

        _proto.setLinearDamping = function setLinearDamping(v) {};

        _proto.setAngularDamping = function setAngularDamping(v) {};

        _proto.useGravity = function useGravity(v) {};

        _proto.setLinearFactor = function setLinearFactor(v) {};

        _proto.setAngularFactor = function setAngularFactor(v) {};

        _proto.setAllowSleep = function setAllowSleep(v) {};

        _proto.wakeUp = function wakeUp() {};

        _proto.sleep = function sleep() {};

        _proto.clearState = function clearState() {};

        _proto.clearForces = function clearForces() {};

        _proto.clearVelocity = function clearVelocity() {};

        _proto.setSleepThreshold = function setSleepThreshold(v) {};

        _proto.getSleepThreshold = function getSleepThreshold() {
          return 0;
        };

        _proto.getLinearVelocity = function getLinearVelocity(out) {};

        _proto.setLinearVelocity = function setLinearVelocity(value) {};

        _proto.getAngularVelocity = function getAngularVelocity(out) {};

        _proto.setAngularVelocity = function setAngularVelocity(value) {};

        _proto.applyForce = function applyForce(force, relativePoint) {};

        _proto.applyLocalForce = function applyLocalForce(force, relativePoint) {};

        _proto.applyImpulse = function applyImpulse(force, relativePoint) {};

        _proto.applyLocalImpulse = function applyLocalImpulse(force, relativePoint) {};

        _proto.applyTorque = function applyTorque(torque) {};

        _proto.applyLocalTorque = function applyLocalTorque(torque) {};

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

        _createClass(BuiltinRigidBody, [{
          key: "impl",
          get: function get() {
            return this;
          }
        }, {
          key: "isAwake",
          get: function get() {
            return true;
          }
        }, {
          key: "isSleepy",
          get: function get() {
            return false;
          }
        }, {
          key: "isSleeping",
          get: function get() {
            return false;
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

        return BuiltinRigidBody;
      }());
    }
  };
});