System.register("q-bundled:///fs/cocos/physics/ammo/ammo-shared-body.js", ["./ammo-instantiated.js", "../../core/scene-graph/node-enum.js", "./ammo-util.js", "./ammo-enum.js", "./ammo-instance.js", "./ammo-const.js", "../framework/index.js", "../framework/physics-enum.js", "../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var Ammo, TransformBit, cocos2AmmoVec3, cocos2AmmoQuat, ammo2CocosVec3, ammo2CocosQuat, ammoDeletePtr, AmmoCollisionFlags, AmmoCollisionObjectStates, EAmmoSharedBodyDirty, AmmoInstance, CC_V3_0, CC_QUAT_0, AmmoConstant, PhysicsSystem, ERigidBodyType, PhysicsGroup, fastRemoveAt, v3_0, quat_0, sharedIDCounter, AmmoSharedBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_ammoUtilJs) {
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
      cocos2AmmoQuat = _ammoUtilJs.cocos2AmmoQuat;
      ammo2CocosVec3 = _ammoUtilJs.ammo2CocosVec3;
      ammo2CocosQuat = _ammoUtilJs.ammo2CocosQuat;
      ammoDeletePtr = _ammoUtilJs.ammoDeletePtr;
    }, function (_ammoEnumJs) {
      AmmoCollisionFlags = _ammoEnumJs.AmmoCollisionFlags;
      AmmoCollisionObjectStates = _ammoEnumJs.AmmoCollisionObjectStates;
      EAmmoSharedBodyDirty = _ammoEnumJs.EAmmoSharedBodyDirty;
    }, function (_ammoInstanceJs) {
      AmmoInstance = _ammoInstanceJs.AmmoInstance;
    }, function (_ammoConstJs) {
      CC_V3_0 = _ammoConstJs.CC_V3_0;
      CC_QUAT_0 = _ammoConstJs.CC_QUAT_0;
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }, function (_frameworkIndexJs) {
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_frameworkPhysicsEnumJs) {
      ERigidBodyType = _frameworkPhysicsEnumJs.ERigidBodyType;
      PhysicsGroup = _frameworkPhysicsEnumJs.PhysicsGroup;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      /**
       * @packageDocumentation
       * @hidden
       */
      v3_0 = CC_V3_0;
      quat_0 = CC_QUAT_0;
      sharedIDCounter = 0;
      /**
       * shared object, node : shared = 1 : 1
       * body for static \ dynamic \ kinematic (collider)
       * ghost for trigger
       */

      _export("AmmoSharedBody", AmmoSharedBody = /*#__PURE__*/function () {
        AmmoSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld, wrappedBody) {
          var key = node.uuid;
          var newSB;

          if (AmmoSharedBody.sharedBodesMap.has(key)) {
            newSB = AmmoSharedBody.sharedBodesMap.get(key);
          } else {
            newSB = new AmmoSharedBody(node, wrappedWorld);
            var g = PhysicsGroup.DEFAULT;
            var m = PhysicsSystem.instance.collisionMatrix[g];
            newSB._collisionFilterGroup = g;
            newSB._collisionFilterMask = m;
            AmmoSharedBody.sharedBodesMap.set(node.uuid, newSB);
          }

          if (wrappedBody) {
            newSB._wrappedBody = wrappedBody;
            var _g = wrappedBody.rigidBody._group;
            var _m = PhysicsSystem.instance.collisionMatrix[_g];
            newSB._collisionFilterGroup = _g;
            newSB._collisionFilterMask = _m;
          }

          return newSB;
        };

        function AmmoSharedBody(node, wrappedWorld) {
          this.id = void 0;
          this.node = void 0;
          this.wrappedWorld = void 0;
          this.wrappedJoints0 = [];
          this.wrappedJoints1 = [];
          this.dirty = 0;
          this._collisionFilterGroup = PhysicsSystem.PhysicsGroup.DEFAULT;
          this._collisionFilterMask = -1;
          this.ref = 0;
          this.bodyIndex = -1;
          this.ghostIndex = -1;
          this._wrappedBody = null;
          this.id = AmmoSharedBody.idCounter++;
          this.wrappedWorld = wrappedWorld;
          this.node = node;
        }

        var _proto = AmmoSharedBody.prototype;

        _proto._instantiateBodyStruct = function _instantiateBodyStruct() {
          if (this._bodyStruct) return;
          /** body struct */

          var st = new Ammo.btTransform();
          st.setIdentity();
          cocos2AmmoVec3(st.getOrigin(), this.node.worldPosition);
          var bodyQuat = new Ammo.btQuaternion();
          cocos2AmmoQuat(bodyQuat, this.node.worldRotation);
          st.setRotation(bodyQuat);
          var motionState = new Ammo.btDefaultMotionState(st);
          var localInertia = new Ammo.btVector3(1.6666666269302368, 1.6666666269302368, 1.6666666269302368);
          var bodyShape = new Ammo.btCompoundShape();
          var mass = 0;

          if (this._wrappedBody && this._wrappedBody.rigidBody.enabled && this._wrappedBody.rigidBody.isDynamic) {
            mass = this._wrappedBody.rigidBody.mass;
          }

          if (mass === 0) localInertia.setValue(0, 0, 0);
          var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, AmmoConstant.instance.EMPTY_SHAPE, localInertia);
          var body = new Ammo.btRigidBody(rbInfo);
          var sleepTd = PhysicsSystem.instance.sleepThreshold;
          body.setSleepingThresholds(sleepTd, sleepTd);
          this._bodyStruct = {
            id: sharedIDCounter++,
            body: body,
            localInertia: localInertia,
            motionState: motionState,
            startTransform: st,
            shape: bodyShape,
            rbInfo: rbInfo,
            worldQuat: bodyQuat,
            wrappedShapes: [],
            useCompound: false
          };
          AmmoInstance.bodyStructs[this._bodyStruct.id] = this._bodyStruct;
          this.body.setUserIndex2(2);
          this.body.setUserIndex(this._bodyStruct.id);
          if (Ammo.CC_CONFIG.ignoreSelfBody && this._ghostStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
          if (this.wrappedBody) this.setBodyType(this.wrappedBody.rigidBody.type);
        };

        _proto._instantiateGhostStruct = function _instantiateGhostStruct() {
          if (this._ghostStruct) return;
          /** ghost struct */

          var ghost = new Ammo.btCollisionObject();
          var ghostShape = new Ammo.btCompoundShape();
          ghost.setCollisionShape(ghostShape);
          ghost.setCollisionFlags(AmmoCollisionFlags.CF_STATIC_OBJECT | AmmoCollisionFlags.CF_NO_CONTACT_RESPONSE);
          this._ghostStruct = {
            id: sharedIDCounter++,
            ghost: ghost,
            shape: ghostShape,
            worldQuat: new Ammo.btQuaternion(),
            wrappedShapes: []
          };
          AmmoInstance.ghostStructs[this._ghostStruct.id] = this._ghostStruct;
          this.ghost.setUserIndex2(2);
          this.ghost.setUserIndex(this._ghostStruct.id);
          if (Ammo.CC_CONFIG.ignoreSelfBody && this._bodyStruct) this.ghost.setIgnoreCollisionCheck(this.body, true);
          if (this.wrappedBody) this.setGhostType(this.wrappedBody.rigidBody.type);
        };

        _proto.setType = function setType(v) {
          this.setBodyType(v);
          this.setGhostType(v);
        };

        _proto.setBodyType = function setBodyType(v) {
          if (this._bodyStruct && this._wrappedBody) {
            var body = this._bodyStruct.body;
            var wrap = this._wrappedBody;
            var com = wrap.rigidBody;
            var m_bcf = body.getCollisionFlags();
            var localInertia = AmmoConstant.instance.VECTOR3_0;

            switch (v) {
              case ERigidBodyType.DYNAMIC:
                m_bcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
                m_bcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
                body.setCollisionFlags(m_bcf);
                wrap.setMass(com.mass);
                wrap.useGravity(com.useGravity);
                wrap.setAllowSleep(com.allowSleep);
                break;

              case ERigidBodyType.KINEMATIC:
                localInertia.setValue(0, 0, 0);
                body.setMassProps(0, localInertia);
                m_bcf |= AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
                m_bcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
                body.setCollisionFlags(m_bcf);
                body.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
                break;

              case ERigidBodyType.STATIC:
              default:
                localInertia.setValue(0, 0, 0);
                body.setMassProps(0, localInertia);
                m_bcf |= AmmoCollisionFlags.CF_STATIC_OBJECT;
                m_bcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
                body.setCollisionFlags(m_bcf);
                body.forceActivationState(AmmoCollisionObjectStates.ISLAND_SLEEPING);
                break;
            }

            this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
          }
        };

        _proto.setGhostType = function setGhostType(v) {
          if (this._ghostStruct) {
            var ghost = this._ghostStruct.ghost;
            var m_gcf = ghost.getCollisionFlags();

            switch (v) {
              case ERigidBodyType.DYNAMIC:
              case ERigidBodyType.KINEMATIC:
                m_gcf &= ~AmmoCollisionFlags.CF_STATIC_OBJECT;
                m_gcf |= AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
                ghost.setCollisionFlags(m_gcf);
                ghost.forceActivationState(AmmoCollisionObjectStates.DISABLE_DEACTIVATION);
                break;

              case ERigidBodyType.STATIC:
              default:
                m_gcf &= ~AmmoCollisionFlags.CF_KINEMATIC_OBJECT;
                m_gcf |= AmmoCollisionFlags.CF_STATIC_OBJECT;
                ghost.setCollisionFlags(m_gcf);
                ghost.forceActivationState(AmmoCollisionObjectStates.ISLAND_SLEEPING);
                break;
            }

            this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
          }
        };

        _proto.addShape = function addShape(v, isTrigger) {
          function switchShape(that, shape) {
            that.body.setCollisionShape(shape);
            that.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;

            if (that._wrappedBody && that._wrappedBody.isEnabled) {
              that._wrappedBody.setMass(that._wrappedBody.rigidBody.mass);
            }
          }

          if (isTrigger) {
            var index = this.ghostStruct.wrappedShapes.indexOf(v);

            if (index < 0) {
              this.ghostStruct.wrappedShapes.push(v);
              v.setCompound(this.ghostCompoundShape);
              this.ghostEnabled = true;
            }
          } else {
            var _index = this.bodyStruct.wrappedShapes.indexOf(v);

            if (_index < 0) {
              this.bodyStruct.wrappedShapes.push(v);

              if (this.bodyStruct.useCompound) {
                v.setCompound(this.bodyCompoundShape);
              } else {
                var l = this.bodyStruct.wrappedShapes.length;

                if (l === 1 && !v.needCompound()) {
                  switchShape(this, v.impl);
                } else {
                  this.bodyStruct.useCompound = true;

                  for (var i = 0; i < l; i++) {
                    var childShape = this.bodyStruct.wrappedShapes[i];
                    childShape.setCompound(this.bodyCompoundShape);
                  }

                  switchShape(this, this.bodyStruct.shape);
                }
              }

              this.bodyEnabled = true;
            }
          }
        };

        _proto.removeShape = function removeShape(v, isTrigger) {
          if (isTrigger) {
            var index = this.ghostStruct.wrappedShapes.indexOf(v);

            if (index >= 0) {
              fastRemoveAt(this.ghostStruct.wrappedShapes, index);
              v.setCompound(null);
              this.ghostEnabled = false;
            }
          } else {
            var _index2 = this.bodyStruct.wrappedShapes.indexOf(v);

            if (_index2 >= 0) {
              if (this.bodyStruct.useCompound) {
                v.setCompound(null);
              } else {
                this.body.setCollisionShape(AmmoConstant.instance.EMPTY_SHAPE);
              }

              this.body.activate(true);
              this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
              fastRemoveAt(this.bodyStruct.wrappedShapes, _index2);
              this.bodyEnabled = false;
            }
          }
        };

        _proto.addJoint = function addJoint(v, type) {
          if (type) {
            var i = this.wrappedJoints1.indexOf(v);
            if (i < 0) this.wrappedJoints1.push(v);
          } else {
            var _i = this.wrappedJoints0.indexOf(v);

            if (_i < 0) this.wrappedJoints0.push(v);
          }
        };

        _proto.removeJoint = function removeJoint(v, type) {
          if (type) {
            var i = this.wrappedJoints1.indexOf(v);
            if (i >= 0) fastRemoveAt(this.wrappedJoints1, i);
          } else {
            var _i2 = this.wrappedJoints0.indexOf(v);

            if (_i2 >= 0) fastRemoveAt(this.wrappedJoints0, _i2);
          }
        };

        _proto.updateDirty = function updateDirty() {
          if (this.dirty) {
            if (this.bodyIndex >= 0 && this.dirty & EAmmoSharedBodyDirty.BODY_RE_ADD) this.updateBodyByReAdd();
            if (this.ghostIndex >= 0 && this.dirty & EAmmoSharedBodyDirty.GHOST_RE_ADD) this.updateGhostByReAdd();
            this.dirty = 0;
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          if (this.node.hasChangedFlags) {
            var wt = this.body.getWorldTransform();
            cocos2AmmoVec3(wt.getOrigin(), this.node.worldPosition);
            cocos2AmmoQuat(this.bodyStruct.worldQuat, this.node.worldRotation);
            wt.setRotation(this.bodyStruct.worldQuat);

            if (this.node.hasChangedFlags & TransformBit.SCALE) {
              this.syncBodyScale();
            }

            if (this.body.isKinematicObject()) {
              // Kinematic objects must be updated using motion state
              var ms = this.body.getMotionState();
              if (ms) ms.setWorldTransform(wt);
            } else if (this.isBodySleeping()) this.body.activate();
          }
        }
        /**
         * TODO: use motion state
         */
        ;

        _proto.syncPhysicsToScene = function syncPhysicsToScene() {
          if (this.body.isStaticOrKinematicObject() || this.isBodySleeping()) {
            return;
          }

          var wt0 = this.bodyStruct.startTransform;
          this.body.getMotionState().getWorldTransform(wt0);
          this.node.worldPosition = ammo2CocosVec3(v3_0, wt0.getOrigin());
          wt0.getBasis().getRotation(this.bodyStruct.worldQuat);
          this.node.worldRotation = ammo2CocosQuat(quat_0, this.bodyStruct.worldQuat); // sync node to ghost

          if (this._ghostStruct) {
            var wt1 = this.ghost.getWorldTransform();
            cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
            cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
            wt1.setRotation(this.ghostStruct.worldQuat);
          }
        };

        _proto.syncSceneToGhost = function syncSceneToGhost() {
          if (this.node.hasChangedFlags) {
            var wt1 = this.ghost.getWorldTransform();
            cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
            cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
            wt1.setRotation(this.ghostStruct.worldQuat);
            if (this.node.hasChangedFlags & TransformBit.SCALE) this.syncGhostScale();
            this.ghost.activate();
          }
        };

        _proto.syncInitialBody = function syncInitialBody() {
          var wt = this.body.getWorldTransform();
          cocos2AmmoVec3(wt.getOrigin(), this.node.worldPosition);
          cocos2AmmoQuat(this.bodyStruct.worldQuat, this.node.worldRotation);
          wt.setRotation(this.bodyStruct.worldQuat);
          this.syncBodyScale();
          this.body.activate();
        };

        _proto.syncInitialGhost = function syncInitialGhost() {
          var wt1 = this.ghost.getWorldTransform();
          cocos2AmmoVec3(wt1.getOrigin(), this.node.worldPosition);
          cocos2AmmoQuat(this.ghostStruct.worldQuat, this.node.worldRotation);
          wt1.setRotation(this.ghostStruct.worldQuat);
          this.syncGhostScale();
          this.ghost.activate();
        };

        _proto.syncBodyScale = function syncBodyScale() {
          for (var i = 0; i < this.bodyStruct.wrappedShapes.length; i++) {
            this.bodyStruct.wrappedShapes[i].setScale();
          }

          for (var _i3 = 0; _i3 < this.wrappedJoints0.length; _i3++) {
            this.wrappedJoints0[_i3].updateScale0();
          }

          for (var _i4 = 0; _i4 < this.wrappedJoints1.length; _i4++) {
            this.wrappedJoints1[_i4].updateScale1();
          }
        };

        _proto.syncGhostScale = function syncGhostScale() {
          for (var i = 0; i < this.ghostStruct.wrappedShapes.length; i++) {
            this.ghostStruct.wrappedShapes[i].setScale();
          }
        }
        /**
         * see: https://pybullet.org/Bullet/phpBB3/viewtopic.php?f=9&t=5312&p=19094&hilit=how+to+change+group+mask#p19097
         */
        ;

        _proto.updateBodyByReAdd = function updateBodyByReAdd() {
          if (this.bodyIndex >= 0) {
            this.wrappedWorld.removeSharedBody(this);
            this.bodyIndex = this.wrappedWorld.bodies.length;
            this.wrappedWorld.addSharedBody(this);
          }
        };

        _proto.updateGhostByReAdd = function updateGhostByReAdd() {
          if (this.ghostIndex >= 0) {
            this.wrappedWorld.removeGhostObject(this);
            this.ghostIndex = this.wrappedWorld.ghosts.length;
            this.wrappedWorld.addGhostObject(this);
          }
        };

        _proto.destroy = function destroy() {
          AmmoSharedBody.sharedBodesMap["delete"](this.node.uuid);
          this.node = null;
          this.wrappedWorld = null;

          if (this._bodyStruct) {
            var bodyStruct = this._bodyStruct;
            Ammo.destroy(bodyStruct.localInertia);
            Ammo.destroy(bodyStruct.worldQuat);
            Ammo.destroy(bodyStruct.startTransform);
            Ammo.destroy(bodyStruct.motionState);
            Ammo.destroy(bodyStruct.rbInfo);
            Ammo.destroy(bodyStruct.shape);
            ammoDeletePtr(bodyStruct.shape, Ammo.btCollisionShape);
            var body = Ammo.castObject(bodyStruct.body, Ammo.btRigidBody);
            body.wrapped = null; // Ammo.destroy(bodyStruct.body);

            ammoDeletePtr(bodyStruct.body, Ammo.btRigidBody);
            ammoDeletePtr(bodyStruct.body, Ammo.btCollisionObject);
            delete AmmoInstance.bodyStructs[bodyStruct.id];
            this._bodyStruct = null;
          }

          if (this._ghostStruct) {
            var ghostStruct = this._ghostStruct;
            Ammo.destroy(ghostStruct.worldQuat);
            Ammo.destroy(ghostStruct.shape);
            ammoDeletePtr(ghostStruct.shape, Ammo.btCollisionShape);
            Ammo.destroy(ghostStruct.ghost);
            delete AmmoInstance.bodyStructs[ghostStruct.id];
            this._ghostStruct = null;
          }
        };

        _proto.isBodySleeping = function isBodySleeping() {
          var state = this.body.getActivationState();
          return state === AmmoCollisionObjectStates.ISLAND_SLEEPING;
        };

        _createClass(AmmoSharedBody, [{
          key: "wrappedBody",
          get: function get() {
            return this._wrappedBody;
          }
        }, {
          key: "bodyCompoundShape",
          get: function get() {
            return this.bodyStruct.shape;
          }
        }, {
          key: "ghostCompoundShape",
          get: function get() {
            return this.ghostStruct.shape;
          }
        }, {
          key: "body",
          get: function get() {
            return this.bodyStruct.body;
          }
        }, {
          key: "ghost",
          get: function get() {
            return this.ghostStruct.ghost;
          }
        }, {
          key: "collisionFilterGroup",
          get: function get() {
            return this._collisionFilterGroup;
          },
          set: function set(v) {
            if (v !== this._collisionFilterGroup) {
              this._collisionFilterGroup = v;
              this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
              this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
            }
          }
        }, {
          key: "collisionFilterMask",
          get: function get() {
            return this._collisionFilterMask;
          },
          set: function set(v) {
            if (v !== this._collisionFilterMask) {
              this._collisionFilterMask = v;
              this.dirty |= EAmmoSharedBodyDirty.BODY_RE_ADD;
              this.dirty |= EAmmoSharedBodyDirty.GHOST_RE_ADD;
            }
          }
        }, {
          key: "bodyStruct",
          get: function get() {
            this._instantiateBodyStruct();

            return this._bodyStruct;
          }
        }, {
          key: "ghostStruct",
          get: function get() {
            this._instantiateGhostStruct();

            return this._ghostStruct;
          }
        }, {
          key: "bodyEnabled",
          set:
          /**
           * add or remove from world \
           * add, if enable \
           * remove, if disable & shapes.length == 0 & wrappedBody disable
           */
          function set(v) {
            if (v) {
              if (this.bodyIndex < 0) {
                // add to world only if it is a dynamic body or having shapes.
                if (this.bodyStruct.wrappedShapes.length === 0) {
                  if (!this.wrappedBody) return;
                  if (!this.wrappedBody.rigidBody.isDynamic) return;
                }

                this.bodyIndex = this.wrappedWorld.bodies.length;
                this.wrappedWorld.addSharedBody(this);
                this.syncInitialBody();
              }
            } else if (this.bodyIndex >= 0) {
              var isRemoveBody = this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody == null || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled || this.bodyStruct.wrappedShapes.length === 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy;

              if (isRemoveBody) {
                this.body.clearState(); // clear velocity etc.

                this.bodyIndex = -1;
                this.wrappedWorld.removeSharedBody(this);
              }
            }
          }
        }, {
          key: "ghostEnabled",
          set: function set(v) {
            if (v) {
              if (this.ghostIndex < 0 && this.ghostStruct.wrappedShapes.length > 0) {
                this.ghostIndex = 1;
                this.wrappedWorld.addGhostObject(this);
                this.syncInitialGhost();
              }
            } else if (this.ghostIndex >= 0) {
              /** remove trigger */
              var isRemoveGhost = this.ghostStruct.wrappedShapes.length === 0 && this.ghost;

              if (isRemoveGhost) {
                this.ghostIndex = -1;
                this.wrappedWorld.removeGhostObject(this);
              }
            }
          }
        }, {
          key: "reference",
          set: function set(v) {
            // eslint-disable-next-line no-unused-expressions
            v ? this.ref++ : this.ref--;

            if (this.ref === 0) {
              this.destroy();
            }
          }
        }]);

        return AmmoSharedBody;
      }());

      AmmoSharedBody.idCounter = 0;
      AmmoSharedBody.sharedBodesMap = new Map();
    }
  };
});