System.register("q-bundled:///fs/cocos/physics/cocos/shapes/builtin-shape.js", ["../../../core/math/index.js", "../../../../exports/physics-framework.js"], function (_export, _context) {
  "use strict";

  var Vec3, PhysicsSystem, BuiltinShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }],
    execute: function () {
      _export("BuiltinShape", BuiltinShape = /*#__PURE__*/function () {
        function BuiltinShape() {
          this.id = BuiltinShape.idCounter++;
        }

        var _proto = BuiltinShape.prototype;

        _proto.getAABB = function getAABB(v) {};

        _proto.getBoundingSphere = function getBoundingSphere(v) {};

        _proto.updateEventListener = function updateEventListener() {};

        _proto.setMaterial = function setMaterial(v) {};

        _proto.setAsTrigger = function setAsTrigger(v) {};

        _proto.setCenter = function setCenter(v) {
          Vec3.copy(this._localShape.center, v);
        };

        _proto.initialize = function initialize(comp) {
          this._collider = comp;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
          this._sharedBody.reference = true;
        };

        _proto.onLoad = function onLoad() {
          this.setCenter(this._collider.center);
        };

        _proto.onEnable = function onEnable() {
          this._sharedBody.addShape(this);

          this._sharedBody.enabled = true;
        };

        _proto.onDisable = function onDisable() {
          this._sharedBody.removeShape(this);

          this._sharedBody.enabled = false;
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._collider = null;
          this._localShape = null;
          this._worldShape = null;
        };

        _proto.transform = function transform(m, pos, rot, scale) {
          this._localShape.transform(m, pos, rot, scale, this._worldShape);
        }
        /** group */
        ;

        _proto.getGroup = function getGroup() {
          return this._sharedBody.getGroup();
        };

        _proto.setGroup = function setGroup(v) {
          this._sharedBody.setGroup(v);
        };

        _proto.addGroup = function addGroup(v) {
          this._sharedBody.addGroup(v);
        };

        _proto.removeGroup = function removeGroup(v) {
          this._sharedBody.removeGroup(v);
        }
        /** mask */
        ;

        _proto.getMask = function getMask() {
          return this._sharedBody.getMask();
        };

        _proto.setMask = function setMask(v) {
          this._sharedBody.setMask(v);
        };

        _proto.addMask = function addMask(v) {
          this._sharedBody.addMask(v);
        };

        _proto.removeMask = function removeMask(v) {
          this._sharedBody.removeMask(v);
        };

        _createClass(BuiltinShape, [{
          key: "attachedRigidBody",
          get: function get() {
            return null;
          }
        }, {
          key: "localShape",
          get: function get() {
            return this._localShape;
          }
        }, {
          key: "worldShape",
          get: function get() {
            return this._worldShape;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._worldShape;
          }
        }, {
          key: "sharedBody",
          get: function get() {
            return this._sharedBody;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
          /** id generator */

        }]);

        return BuiltinShape;
      }());

      BuiltinShape.idCounter = 0;
    }
  };
});