System.register("q-bundled:///fs/cocos/physics/ammo/shapes/ammo-shape.js", ["../ammo-instantiated.js", "../../../core/math/index.js", "../../../../exports/physics-framework.js", "../ammo-enum.js", "../ammo-util.js", "../ammo-const.js"], function (_export, _context) {
  "use strict";

  var Ammo, Vec3, Quat, PhysicsSystem, AmmoBroadphaseNativeTypes, EAmmoSharedBodyDirty, cocos2AmmoVec3, ammoDeletePtr, cocos2AmmoQuat, AmmoConstant, CC_V3_0, v3_0, AmmoShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Quat = _coreMathIndexJs.Quat;
    }, function (_exportsPhysicsFrameworkJs) {
      PhysicsSystem = _exportsPhysicsFrameworkJs.PhysicsSystem;
    }, function (_ammoEnumJs) {
      AmmoBroadphaseNativeTypes = _ammoEnumJs.AmmoBroadphaseNativeTypes;
      EAmmoSharedBodyDirty = _ammoEnumJs.EAmmoSharedBodyDirty;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
      ammoDeletePtr = _ammoUtilJs.ammoDeletePtr;
      cocos2AmmoQuat = _ammoUtilJs.cocos2AmmoQuat;
    }, function (_ammoConstJs) {
      AmmoConstant = _ammoConstJs.AmmoConstant;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
    }],
    execute: function () {
      v3_0 = CC_V3_0;

      _export("AmmoShape", AmmoShape = /*#__PURE__*/function () {
        var _proto = AmmoShape.prototype;

        _proto.updateEventListener = function updateEventListener() {};

        _proto.setMaterial = function setMaterial(v) {
          if (!this._isTrigger && this._isEnabled && v) {
            if (this._btCompound) {
              this._btCompound.setMaterial(this._index, v.friction, v.restitution, v.rollingFriction, v.spinningFriction, 2);
            } else {
              this._sharedBody.body.setFriction(v.friction);

              this._sharedBody.body.setRestitution(v.restitution);

              this._sharedBody.body.setRollingFriction(v.rollingFriction);

              this._sharedBody.body.setSpinningFriction(v.spinningFriction);

              this._sharedBody.body.setUserIndex2(2);
            }
          }
        };

        _proto.setCenter = function setCenter(v) {
          Vec3.copy(v3_0, v);
          v3_0.multiply(this._collider.node.worldScale);
          cocos2AmmoVec3(this.transform.getOrigin(), v3_0);
          this.updateCompoundTransform();
        };

        _proto.setAsTrigger = function setAsTrigger(v) {
          if (this._isTrigger === v) {
            return;
          }

          if (this._isEnabled) {
            this._sharedBody.removeShape(this, !v);

            this._sharedBody.addShape(this, v);
          }

          this._isTrigger = v;
        };

        function AmmoShape(type) {
          this.id = void 0;
          this.type = void 0;
          this._index = -1;
          this._isEnabled = false;
          this._isBinding = false;
          this._isTrigger = false;
          this._btCompound = null;
          this.transform = void 0;
          this.quat = void 0;
          this.scale = void 0;
          this.type = type;
          this.id = AmmoShape.idCounter++;
          this.quat = new Ammo.btQuaternion();
          this.transform = new Ammo.btTransform();
          this.transform.setIdentity();
          this.scale = new Ammo.btVector3(1, 1, 1);
        }

        _proto.getAABB = function getAABB(v) {
          var TRANS = AmmoConstant.instance.TRANSFORM;
          TRANS.setIdentity();
          TRANS.setRotation(cocos2AmmoQuat(AmmoConstant.instance.QUAT_0, this._collider.node.worldRotation));
          var MIN = AmmoConstant.instance.VECTOR3_0;
          var MAX = AmmoConstant.instance.VECTOR3_1;

          this._btShape.getAabb(TRANS, MIN, MAX);

          v.halfExtents.set((MAX.x() - MIN.x()) / 2, (MAX.y() - MIN.y()) / 2, (MAX.z() - MIN.z()) / 2);
          Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
        };

        _proto.getBoundingSphere = function getBoundingSphere(v) {
          v.radius = this._btShape.getLocalBoundingSphere();
          Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
        };

        _proto.initialize = function initialize(com) {
          this._collider = com;
          this._isBinding = true;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
          this._sharedBody.reference = true;
          this.onComponentSet();
          this.setWrapper();
        } // virtual
        ;

        _proto.onComponentSet = function onComponentSet() {};

        _proto.onLoad = function onLoad() {
          this.setCenter(this._collider.center);
          this.setAsTrigger(this._collider.isTrigger);
        };

        _proto.onEnable = function onEnable() {
          this._isEnabled = true;

          this._sharedBody.addShape(this, this._isTrigger);

          this.setMaterial(this.collider.sharedMaterial);
        };

        _proto.onDisable = function onDisable() {
          this._isEnabled = false;

          this._sharedBody.removeShape(this, this._isTrigger);
        };

        _proto.onDestroy = function onDestroy() {
          this._sharedBody.reference = false;
          this._btCompound = null;
          this._collider = null;
          var shape = Ammo.castObject(this._btShape, Ammo.btCollisionShape);
          shape.wrapped = null;
          Ammo.destroy(this.quat);
          Ammo.destroy(this.scale);
          Ammo.destroy(this.transform);

          if (this._btShape !== AmmoConstant.instance.EMPTY_SHAPE) {
            Ammo.destroy(this._btShape);
            ammoDeletePtr(this._btShape, Ammo.btCollisionShape);
          }

          this._btShape = null;
          this.transform = null;
          this.quat = null;
          this.scale = null;
        };

        _proto.updateByReAdd = function updateByReAdd() {
          if (this._isEnabled) {
            this._sharedBody.removeShape(this, this._isTrigger);

            this._sharedBody.addShape(this, this._isTrigger);
          }
        }
        /** group mask */
        ;

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

        _proto.setCompound = function setCompound(compound) {
          if (this._btCompound) {
            this._btCompound.removeChildShape(this._btShape);

            this._index = -1;
          }

          if (compound) {
            this._index = compound.getNumChildShapes();
            compound.addChildShape(this.transform, this._btShape);
          }

          this._btCompound = compound;
        };

        _proto.setWrapper = function setWrapper() {
          var shape = Ammo.castObject(this._btShape, Ammo.btCollisionShape);
          shape.wrapped = this;
        };

        _proto.setScale = function setScale() {
          this.setCenter(this._collider.center);
        };

        _proto.updateCompoundTransform = function updateCompoundTransform() {
          if (this._btCompound) {
            this._btCompound.updateChildTransform(this.index, this.transform, true);
          } else if (this._isEnabled && !this._isTrigger) {
            if (this._sharedBody && !this._sharedBody.bodyStruct.useCompound) {
              this._sharedBody.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
            }
          }
        };

        _proto.needCompound = function needCompound() {
          if (this.type === AmmoBroadphaseNativeTypes.TERRAIN_SHAPE_PROXYTYPE) {
            return true;
          }

          if (this._collider.center.equals(Vec3.ZERO)) {
            return false;
          }

          return true;
        }
        /** DEBUG */
        ;

        _proto.debugTransform = function debugTransform(n) {
          if (AmmoShape._debugTransform == null) {
            AmmoShape._debugTransform = new Ammo.btTransform();
          }

          var wt;

          if (this._isTrigger) {
            wt = this._sharedBody.ghost.getWorldTransform();
          } else {
            wt = this._sharedBody.body.getWorldTransform();
          }

          var lt = this.transform;

          AmmoShape._debugTransform.setIdentity();

          AmmoShape._debugTransform.op_mul(wt).op_mul(lt);

          var origin = AmmoShape._debugTransform.getOrigin();

          n.worldPosition = new Vec3(origin.x(), origin.y(), origin.z());

          var rotation = AmmoShape._debugTransform.getRotation();

          n.worldRotation = new Quat(rotation.x(), rotation.y(), rotation.z(), rotation.w());
          var scale = this.impl.getLocalScaling();
          n.scale = new Vec3(scale.x(), scale.y(), scale.z());
        };

        _createClass(AmmoShape, [{
          key: "attachedRigidBody",
          get: function get() {
            if (this._sharedBody.wrappedBody) {
              return this._sharedBody.wrappedBody.rigidBody;
            }

            return null;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._btShape;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "sharedBody",
          get: function get() {
            return this._sharedBody;
          }
        }, {
          key: "index",
          get: function get() {
            return this._index;
          }
        }]);

        return AmmoShape;
      }());

      AmmoShape.idCounter = 0;
      AmmoShape._debugTransform = void 0;
    }
  };
});