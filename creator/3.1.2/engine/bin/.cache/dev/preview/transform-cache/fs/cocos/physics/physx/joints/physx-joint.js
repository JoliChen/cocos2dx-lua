System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-joint.js", ["../../framework/index.js", "../export-physx.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem, PX, setJointActors, _pxtrans, PhysXJoint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_exportPhysxJs) {
      PX = _exportPhysxJs.PX;
      setJointActors = _exportPhysxJs.setJointActors;
      _pxtrans = _exportPhysxJs._pxtrans;
    }],
    execute: function () {
      _export("PhysXJoint", PhysXJoint = /*#__PURE__*/function () {
        function PhysXJoint() {}

        var _proto = PhysXJoint.prototype;

        _proto.setConnectedBody = function setConnectedBody(v) {// TODO
        };

        _proto.setEnableCollision = function setEnableCollision(v) {
          this._impl.setConstraintFlag(1 << 3, v);
        };

        _proto.initialize = function initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this.onComponentSet();
          this.setEnableCollision(this._com.enableCollision);

          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = this;
          } else {//
          }
        } // virtual
        ;

        _proto.onComponentSet = function onComponentSet() {} // virtual
        ;

        _proto.updateScale0 = function updateScale0() {};

        _proto.updateScale1 = function updateScale1() {};

        _proto.onEnable = function onEnable() {
          var sb = this._rigidBody.body.sharedBody;
          var connect = this._com.connectedBody;
          sb.addJoint(this, 0);

          if (connect) {
            var sb2 = connect.body.sharedBody;
            setJointActors(this._impl, sb.impl, sb2.impl);
            sb2.addJoint(this, 1);
          } else {
            setJointActors(this._impl, sb.impl, null);
          }
        };

        _proto.onDisable = function onDisable() {
          setJointActors(this._impl, PhysXJoint.tempActor, null);
          var sb = this._rigidBody.body.sharedBody;
          sb.removeJoint(this, 0);
          var connect = this.constraint.connectedBody;

          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = null;
            delete PX.IMPL_PTR[this._impl.$$.ptr];
          } else {//
          }

          this._impl.release();

          this._com = null;
          this._rigidBody = null;
          this._impl = null;
        };

        _createClass(PhysXJoint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }], [{
          key: "tempActor",
          get: function get() {
            if (this._tempActor == null) {
              var physics = PhysicsSystem.instance.physicsWorld.physics;
              this._tempActor = physics.createRigidDynamic(_pxtrans);
            }

            return this._tempActor;
          }
        }]);

        return PhysXJoint;
      }());

      PhysXJoint._tempActor = void 0;
    }
  };
});