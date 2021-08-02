System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/joint-2d.js", ["../../framework/index.js"], function (_export, _context) {
  "use strict";

  var PhysicsSystem2D, RigidBody2D, b2Joint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_frameworkIndexJs) {
      PhysicsSystem2D = _frameworkIndexJs.PhysicsSystem2D;
      RigidBody2D = _frameworkIndexJs.RigidBody2D;
    }],
    execute: function () {
      _export("b2Joint", b2Joint = /*#__PURE__*/function () {
        function b2Joint() {
          this._b2joint = null;
          this._jointComp = null;
          this._body = null;
          this._inited = false;
        }

        var _proto = b2Joint.prototype;

        _proto.initialize = function initialize(comp) {
          this._jointComp = comp;
        };

        _proto.onEnable = function onEnable() {
          PhysicsSystem2D.instance._callAfterStep(this, this._init);
        };

        _proto.onDisable = function onDisable() {
          PhysicsSystem2D.instance._callAfterStep(this, this._destroy);
        } // need init after body and connected body init
        ;

        _proto.start = function start() {
          PhysicsSystem2D.instance._callAfterStep(this, this._init);
        };

        _proto._init = function _init() {
          if (this._inited) return;
          var comp = this._jointComp;

          if (!comp.isValid) {
            return;
          }

          this._body = comp.getComponent(RigidBody2D);

          var def = this._createJointDef();

          if (!def) {
            return;
          }

          var connectedBody = comp.connectedBody;

          if (!connectedBody || !connectedBody.enabledInHierarchy) {
            return;
          }

          def.bodyA = this._body.impl.impl;
          def.bodyB = connectedBody.impl.impl;
          def.collideConnected = comp.collideConnected;
          this._b2joint = PhysicsSystem2D.instance.physicsWorld.impl.CreateJoint(def);
          this._inited = true;
        };

        _proto._destroy = function _destroy() {
          if (!this._inited) return;
          PhysicsSystem2D.instance.physicsWorld.impl.DestroyJoint(this._b2joint);
          this._b2joint = null;
          this._inited = false;
        };

        _proto._createJointDef = function _createJointDef() {
          return null;
        };

        _proto.isValid = function isValid() {
          return this._b2joint && this._body && this._body.impl && this._jointComp && this._jointComp.connectedBody && this._jointComp.connectedBody.impl;
        };

        _createClass(b2Joint, [{
          key: "impl",
          get: function get() {
            return this._b2joint;
          }
        }, {
          key: "comp",
          get: function get() {
            return this._jointComp;
          }
        }, {
          key: "body",
          get: function get() {
            return this._body;
          }
        }]);

        return b2Joint;
      }());
    }
  };
});