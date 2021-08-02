System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-shape.js", ["@cocos/cannon", "../../../core/math/index.js", "../../utils/util.js", "../cannon-util.js", "../../framework/physics-system.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, Quat, getWrap, setWrap, commitShapeUpdates, PhysicsSystem, TriggerEventObject, cannonQuat_0, cannonVec3_0, cannonVec3_1, CannonShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Quat = _coreMathIndexJs.Quat;
    }, function (_utilsUtilJs) {
      getWrap = _utilsUtilJs.getWrap;
      setWrap = _utilsUtilJs.setWrap;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_frameworkPhysicsSystemJs) {
      PhysicsSystem = _frameworkPhysicsSystemJs.PhysicsSystem;
    }],
    execute: function () {
      TriggerEventObject = {
        type: 'onTriggerEnter',
        selfCollider: null,
        otherCollider: null,
        impl: null
      };
      cannonQuat_0 = new CANNON.Quaternion();
      cannonVec3_0 = new CANNON.Vec3();
      cannonVec3_1 = new CANNON.Vec3();

      _export("CannonShape", CannonShape = /*#__PURE__*/function () {
        function CannonShape() {
          this._offset = new CANNON.Vec3();
          this._orient = new CANNON.Quaternion();
          this._index = -1;
          this.onTriggerListener = this._onTrigger.bind(this);
          this._isBinding = false;
        }

        var _proto = CannonShape.prototype;

        _proto.updateEventListener = function updateEventListener() {};

        _proto.setMaterial = function setMaterial(mat) {
          if (mat == null) {
            this._shape.material = null;
          } else {
            if (CannonShape.idToMaterial[mat.id] == null) {
              CannonShape.idToMaterial[mat.id] = new CANNON.Material(mat.id);
            }

            this._shape.material = CannonShape.idToMaterial[mat.id];
            var smat = this._shape.material;
            smat.friction = mat.friction;
            smat.restitution = mat.restitution;
            var coef = CANNON.CC_CONFIG.correctInelastic;
            smat.correctInelastic = smat.restitution === 0 ? coef : 0;
          }
        };

        _proto.setAsTrigger = function setAsTrigger(v) {
          this._shape.collisionResponse = !v;

          if (this._index >= 0) {
            this._body.updateHasTrigger();
          }
        };

        _proto.setCenter = function setCenter(v) {
          this._setCenter(v);

          if (this._index >= 0) {
            commitShapeUpdates(this._body);
          }
        };

        _proto.setAttachedBody = function setAttachedBody(v) {
          if (v) {
            if (this._sharedBody) {
              if (this._sharedBody.wrappedBody === v.body) return;
              this._sharedBody.reference = false;
            }

            this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(v.node);
            this._sharedBody.reference = true;
          } else {
            if (this._sharedBody) {
              this._sharedBody.reference = false;
            }

            this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
            this._sharedBody.reference = true;
          }
        };

        _proto.getAABB = function getAABB(v) {
          Quat.copy(cannonQuat_0, this._collider.node.worldRotation);

          this._shape.calculateWorldAABB(CANNON.Vec3.ZERO, cannonQuat_0, cannonVec3_0, cannonVec3_1);

          Vec3.subtract(v.halfExtents, cannonVec3_1, cannonVec3_0);
          Vec3.multiplyScalar(v.halfExtents, v.halfExtents, 0.5);
          Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
        };

        _proto.getBoundingSphere = function getBoundingSphere(v) {
          v.radius = this._shape.boundingSphereRadius;
          Vec3.add(v.center, this._collider.node.worldPosition, this._collider.center);
        };

        /** LIFECYCLE */
        _proto.initialize = function initialize(comp) {
          this._collider = comp;
          this._isBinding = true;
          this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
          this._sharedBody.reference = true;
          this.onComponentSet();
          setWrap(this._shape, this);

          this._shape.addEventListener('cc-trigger', this.onTriggerListener);
        } // virtual
        ;

        _proto.onComponentSet = function onComponentSet() {};

        _proto.onLoad = function onLoad() {
          this.setMaterial(this._collider.sharedMaterial);
          this.setCenter(this._collider.center);
          this.setAsTrigger(this._collider.isTrigger);
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

          this._shape.removeEventListener('cc-trigger', this.onTriggerListener);

          delete CANNON.World.idToShapeMap[this._shape.id];
          this._sharedBody = null;
          setWrap(this._shape, null);
          this._offset = null;
          this._orient = null;
          this._shape = null;
          this._collider = null;
          this.onTriggerListener = null;
        }
        /** INTERFACE */

        /** group */
        ;

        _proto.getGroup = function getGroup() {
          return this._body.collisionFilterGroup;
        };

        _proto.setGroup = function setGroup(v) {
          this._body.collisionFilterGroup = v;
          if (!this._body.isAwake()) this._body.wakeUp();
        };

        _proto.addGroup = function addGroup(v) {
          this._body.collisionFilterGroup |= v;
          if (!this._body.isAwake()) this._body.wakeUp();
        };

        _proto.removeGroup = function removeGroup(v) {
          this._body.collisionFilterGroup &= ~v;
          if (!this._body.isAwake()) this._body.wakeUp();
        }
        /** mask */
        ;

        _proto.getMask = function getMask() {
          return this._body.collisionFilterMask;
        };

        _proto.setMask = function setMask(v) {
          this._body.collisionFilterMask = v;
          if (!this._body.isAwake()) this._body.wakeUp();
        };

        _proto.addMask = function addMask(v) {
          this._body.collisionFilterMask |= v;
          if (!this._body.isAwake()) this._body.wakeUp();
        };

        _proto.removeMask = function removeMask(v) {
          this._body.collisionFilterMask &= ~v;
          if (!this._body.isAwake()) this._body.wakeUp();
        }
        /**
         * change scale will recalculate center & size \
         * size handle by child class
         * @param scale
         */
        ;

        _proto.setScale = function setScale(scale) {
          this._setCenter(this._collider.center);
        };

        _proto.setIndex = function setIndex(index) {
          this._index = index;
        };

        _proto.setOffsetAndOrient = function setOffsetAndOrient(offset, orient) {
          Vec3.copy(offset, this._offset);
          Quat.copy(orient, this._orient);
          this._offset = offset;
          this._orient = orient;
        };

        _proto._setCenter = function _setCenter(v) {
          var lpos = this._offset;
          Vec3.subtract(lpos, this._sharedBody.node.worldPosition, this._collider.node.worldPosition);
          Vec3.add(lpos, lpos, v);
          Vec3.multiply(lpos, lpos, this._collider.node.worldScale);
        };

        _proto._onTrigger = function _onTrigger(event) {
          TriggerEventObject.type = event.event;
          var self = getWrap(event.selfShape);
          var other = getWrap(event.otherShape);

          if (self && self.collider.needTriggerEvent) {
            TriggerEventObject.selfCollider = self.collider;
            TriggerEventObject.otherCollider = other ? other.collider : null;
            TriggerEventObject.impl = event;

            this._collider.emit(TriggerEventObject.type, TriggerEventObject);
          }
        };

        _createClass(CannonShape, [{
          key: "impl",
          get: function get() {
            return this._shape;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "attachedRigidBody",
          get: function get() {
            if (this._sharedBody.wrappedBody) {
              return this._sharedBody.wrappedBody.rigidBody;
            }

            return null;
          }
        }, {
          key: "sharedBody",
          get: function get() {
            return this._sharedBody;
          }
        }, {
          key: "_body",
          get: function get() {
            return this._sharedBody.body;
          }
        }]);

        return CannonShape;
      }());

      CannonShape.idToMaterial = {};
    }
  };
});