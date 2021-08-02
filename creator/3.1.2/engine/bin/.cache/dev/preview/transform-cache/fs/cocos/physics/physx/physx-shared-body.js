System.register("q-bundled:///fs/cocos/physics/physx/physx-shared-body.js", ["../../core/index.js", "../../core/scene-graph/node-enum.js", "./export-physx.js", "../utils/util.js", "../framework/index.js", "../framework/physics-enum.js", "../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, TransformBit, addActorToScene, copyPhysXTransform, getJsTransform, getTempTransform, physXEqualsCocosQuat, physXEqualsCocosVec3, PX, setMassAndUpdateInertia, VEC3_0, ERigidBodyType, PhysicsSystem, PhysicsGroup, fastRemoveAt, PhysXSharedBody;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_exportPhysxJs) {
      addActorToScene = _exportPhysxJs.addActorToScene;
      copyPhysXTransform = _exportPhysxJs.copyPhysXTransform;
      getJsTransform = _exportPhysxJs.getJsTransform;
      getTempTransform = _exportPhysxJs.getTempTransform;
      physXEqualsCocosQuat = _exportPhysxJs.physXEqualsCocosQuat;
      physXEqualsCocosVec3 = _exportPhysxJs.physXEqualsCocosVec3;
      PX = _exportPhysxJs.PX;
      setMassAndUpdateInertia = _exportPhysxJs.setMassAndUpdateInertia;
    }, function (_utilsUtilJs) {
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }, function (_frameworkIndexJs) {
      ERigidBodyType = _frameworkIndexJs.ERigidBodyType;
      PhysicsSystem = _frameworkIndexJs.PhysicsSystem;
    }, function (_frameworkPhysicsEnumJs) {
      PhysicsGroup = _frameworkPhysicsEnumJs.PhysicsGroup;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      _export("PhysXSharedBody", PhysXSharedBody = /*#__PURE__*/function () {
        PhysXSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld, wrappedBody) {
          var key = node.uuid;
          var newSB;

          if (PhysXSharedBody.sharedBodesMap.has(key)) {
            newSB = PhysXSharedBody.sharedBodesMap.get(key);
          } else {
            newSB = new PhysXSharedBody(node, wrappedWorld);
            newSB.filterData.word0 = PhysicsGroup.DEFAULT;
            newSB.filterData.word1 = PhysicsSystem.instance.collisionMatrix[PhysicsGroup.DEFAULT];
            PhysXSharedBody.sharedBodesMap.set(node.uuid, newSB);
          }

          if (wrappedBody) {
            newSB._wrappedBody = wrappedBody;
            var g = wrappedBody.rigidBody._group;
            var m = PhysicsSystem.instance.collisionMatrix[g];
            newSB.filterData.word0 = g;
            newSB.filterData.word1 = m;
          }

          return newSB;
        };

        function PhysXSharedBody(node, wrappedWorld) {
          this.id = void 0;
          this.node = void 0;
          this.wrappedWorld = void 0;
          this.wrappedShapes = [];
          this.wrappedJoints0 = [];
          this.wrappedJoints1 = [];
          this._index = -1;
          this._ref = 0;
          this._isStatic = false;
          this._isKinematic = false;
          this._wrappedBody = null;
          this._filterData = void 0;
          this.id = PhysXSharedBody.idCounter++;
          this.node = node;
          this.wrappedWorld = wrappedWorld;
          this._filterData = {
            word0: 1,
            word1: 1,
            word2: 0,
            word3: 0
          };
        }

        var _proto = PhysXSharedBody.prototype;

        _proto._initActor = function _initActor() {
          var st = this._isStatic;
          var wb = this.wrappedBody;

          if (wb) {
            var rb = wb.rigidBody;

            if (rb.type === ERigidBodyType.STATIC) {
              this._isStatic = true;
              this._isKinematic = false;

              this._initStaticActor();
            } else {
              this._isStatic = false;

              this._initDynamicActor();
            }
          } else {
            this._isStatic = true;
            this._isKinematic = false;

            this._initStaticActor();
          }

          if (st !== this._isStatic) {
            this._switchActor(st);
          }
        };

        _proto._initStaticActor = function _initStaticActor() {
          if (this._staticActor) return;
          var t = getTempTransform(this.node.worldPosition, this.node.worldRotation);
          this._staticActor = this.wrappedWorld.physics.createRigidStatic(t);
          if (this._staticActor.$$) PX.IMPL_PTR[this._staticActor.$$.ptr] = this;
        };

        _proto._initDynamicActor = function _initDynamicActor() {
          if (this._dynamicActor) return;
          var t = getTempTransform(this.node.worldPosition, this.node.worldRotation);
          this._dynamicActor = this.wrappedWorld.physics.createRigidDynamic(t);
          if (this._dynamicActor.$$) PX.IMPL_PTR[this._dynamicActor.$$.ptr] = this;
          var wb = this.wrappedBody;

          if (wb) {
            var rb = wb.rigidBody;

            this._dynamicActor.setMass(rb.mass);

            this._dynamicActor.setActorFlag(PX.ActorFlag.eDISABLE_GRAVITY, !rb.useGravity);

            this.setRigidBodyFlag(PX.RigidBodyFlag.eKINEMATIC, rb.isKinematic);

            this._dynamicActor.setLinearDamping(rb.linearDamping);

            this._dynamicActor.setAngularDamping(rb.angularDamping);

            var lf = rb.linearFactor;

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_X, !lf.x);

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Y, !lf.y);

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Z, !lf.z);

            var af = rb.angularFactor;

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_X, !af.x);

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Y, !af.y);

            this._dynamicActor.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Z, !af.z);
          }
        };

        _proto._switchActor = function _switchActor(isStaticBefore) {
          if (!this._staticActor || !this._dynamicActor) return;
          var a0 = isStaticBefore ? this._staticActor : this._dynamicActor;
          var a1 = !isStaticBefore ? this._staticActor : this._dynamicActor;

          if (this._index >= 0) {
            this.wrappedWorld.scene.removeActor(a0, false);
            addActorToScene(this.wrappedWorld.scene, a1);
          }

          for (var i = 0; i < this.wrappedShapes.length; i++) {
            var ws = this.wrappedShapes[i];
            a0.detachShape(ws.impl, false);
            a1.attachShape(ws.impl);
          }

          if (isStaticBefore) {
            var da = this._dynamicActor;
            setMassAndUpdateInertia(da, this._wrappedBody.rigidBody.mass);
            var center = VEC3_0;
            center.set(0, 0, 0);

            for (var _i = 0; _i < this.wrappedShapes.length; _i++) {
              var collider = this.wrappedShapes[_i].collider;
              if (!collider.isTrigger) center.subtract(collider.center);
            }

            da.setCMassLocalPose(getTempTransform(center, Quat.IDENTITY));
          }
        };

        _proto.addShape = function addShape(ws) {
          var index = this.wrappedShapes.indexOf(ws);

          if (index < 0) {
            ws.setIndex(this.wrappedShapes.length);
            ws.updateFilterData(this._filterData);
            this.impl.attachShape(ws.impl);
            this.wrappedShapes.push(ws);

            if (!ws.collider.isTrigger) {
              if (!Vec3.strictEquals(ws.collider.center, Vec3.ZERO)) this.updateCenterOfMass();
              if (this.isDynamic) setMassAndUpdateInertia(this.impl, this._wrappedBody.rigidBody.mass);
            }
          }
        };

        _proto.removeShape = function removeShape(ws) {
          var index = this.wrappedShapes.indexOf(ws);

          if (index >= 0) {
            ws.setIndex(-1);
            this.impl.detachShape(ws.impl, true);
            fastRemoveAt(this.wrappedShapes, index);

            if (!ws.collider.isTrigger) {
              if (!Vec3.strictEquals(ws.collider.center, Vec3.ZERO)) this.updateCenterOfMass();
              if (this.isDynamic) setMassAndUpdateInertia(this.impl, this._wrappedBody.rigidBody.mass);
            }
          }
        };

        _proto.addJoint = function addJoint(v, type) {
          if (type) {
            var i = this.wrappedJoints1.indexOf(v);
            if (i < 0) this.wrappedJoints1.push(v);
          } else {
            var _i2 = this.wrappedJoints0.indexOf(v);

            if (_i2 < 0) this.wrappedJoints0.push(v);
          }
        };

        _proto.removeJoint = function removeJoint(v, type) {
          if (type) {
            var i = this.wrappedJoints1.indexOf(v);
            if (i >= 0) fastRemoveAt(this.wrappedJoints1, i);
          } else {
            var _i3 = this.wrappedJoints0.indexOf(v);

            if (_i3 >= 0) fastRemoveAt(this.wrappedJoints0, _i3);
          }
        };

        _proto.setMass = function setMass(v) {
          if (v <= 0) return;
          if (!this.isDynamic) return;
          setMassAndUpdateInertia(this.impl, v);
        };

        _proto.setType = function setType(v) {
          this._initActor();

          if (this.isStatic) return;

          switch (v) {
            case ERigidBodyType.DYNAMIC:
              this.setRigidBodyFlag(PX.RigidBodyFlag.eKINEMATIC, false);
              break;

            case ERigidBodyType.KINEMATIC:
            default:
              this.setRigidBodyFlag(PX.RigidBodyFlag.eKINEMATIC, true);
              break;
          }
        };

        _proto.setRigidBodyFlag = function setRigidBodyFlag(v, b) {
          if (v === PX.RigidBodyFlag.eKINEMATIC) this._isKinematic = b;
          this.impl.setRigidBodyFlag(v, b);
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          var node = this.node;

          if (node.hasChangedFlags) {
            if (node.hasChangedFlags & TransformBit.SCALE) this.syncScale();

            if (this._isKinematic) {
              var trans = getTempTransform(node.worldPosition, node.worldRotation);
              this.impl.setKinematicTarget(trans);
            } else {
              var _trans = getJsTransform(node.worldPosition, node.worldRotation);

              this.impl.setGlobalPose(_trans, true);
            }
          }
        };

        _proto.syncSceneWithCheck = function syncSceneWithCheck() {
          var node = this.node;

          if (node.hasChangedFlags) {
            if (node.hasChangedFlags & TransformBit.SCALE) this.syncScale();
            var wp = node.worldPosition;
            var wr = node.worldRotation;
            var pose = this.impl.getGlobalPose();
            var dontUpdate = physXEqualsCocosVec3(pose, wp) && physXEqualsCocosQuat(pose, wr);

            if (!dontUpdate) {
              if (this._isKinematic) {
                var trans = getTempTransform(node.worldPosition, node.worldRotation);
                this.impl.setKinematicTarget(trans);
              } else {
                var _trans2 = getJsTransform(node.worldPosition, node.worldRotation);

                this.impl.setGlobalPose(_trans2, true);
              }
            }
          }
        };

        _proto.syncPhysicsToScene = function syncPhysicsToScene() {
          if (this._isStatic || this._dynamicActor.isSleeping()) return;

          var transform = this._dynamicActor.getGlobalPose();

          copyPhysXTransform(this.node, transform);
        };

        _proto.syncScale = function syncScale() {
          for (var i = 0; i < this.wrappedShapes.length; i++) {
            this.wrappedShapes[i].updateScale();
          }

          for (var _i4 = 0; _i4 < this.wrappedJoints0.length; _i4++) {
            this.wrappedJoints0[_i4].updateScale0();
          }

          for (var _i5 = 0; _i5 < this.wrappedJoints1.length; _i5++) {
            this.wrappedJoints1[_i5].updateScale1();
          }
        };

        _proto.setGroup = function setGroup(v) {
          this._filterData.word0 = v;
          this.updateFilterData();
        };

        _proto.getGroup = function getGroup() {
          return this._filterData.word0;
        };

        _proto.addGroup = function addGroup(v) {
          this._filterData.word0 |= v;
          this.updateFilterData();
        };

        _proto.removeGroup = function removeGroup(v) {
          this._filterData.word0 &= ~v;
          this.updateFilterData();
        };

        _proto.setMask = function setMask(v) {
          if (v === -1) v = 0xffffffff;
          this._filterData.word1 = v;
          this.updateFilterData();
        };

        _proto.getMask = function getMask() {
          return this._filterData.word1;
        };

        _proto.addMask = function addMask(v) {
          this._filterData.word1 |= v;
          this.updateFilterData();
        };

        _proto.removeMask = function removeMask(v) {
          this._filterData.word1 &= ~v;
          this.updateFilterData();
        };

        _proto.updateFilterData = function updateFilterData() {
          for (var i = 0; i < this.wrappedShapes.length; i++) {
            this.wrappedShapes[i].updateFilterData(this._filterData);
          }
        };

        _proto.updateCenterOfMass = function updateCenterOfMass() {
          this._initActor();

          if (this._isStatic) return;
          var center = VEC3_0;
          center.set(0, 0, 0);

          for (var i = 0; i < this.wrappedShapes.length; i++) {
            var collider = this.wrappedShapes[i].collider;
            if (!collider.isTrigger) center.subtract(collider.center);
          }

          this.impl.setCMassLocalPose(getTempTransform(center, Quat.IDENTITY));
        };

        _proto.clearForces = function clearForces() {
          if (this._isStatic || this._isKinematic) return;
          this.impl.clearForce(PX.ForceMode.eFORCE); // this.impl.clearForce(PX.ForceMode.eACCELERATION);

          this.impl.clearForce(PX.ForceMode.eIMPULSE); // this.impl.clearForce(PX.ForceMode.eVELOCITY_CHANGE);

          this.impl.clearTorque(PX.ForceMode.eFORCE);
          this.impl.clearTorque(PX.ForceMode.eIMPULSE);
        };

        _proto.clearVelocity = function clearVelocity() {
          if (this._isStatic || this._isKinematic) return;
          this.impl.setLinearVelocity(Vec3.ZERO, false);
          this.impl.setAngularVelocity(Vec3.ZERO, false);
        };

        _proto.destroy = function destroy() {
          if (this._dynamicActor) {
            if (this._dynamicActor.$$) {
              PX.IMPL_PTR[this._dynamicActor.$$.ptr] = null;
              delete PX.IMPL_PTR[this._dynamicActor.$$.ptr];
            }

            this._dynamicActor.release();

            this._dynamicActor = null;
          }

          if (this._staticActor) {
            if (this._staticActor.$$) {
              PX.IMPL_PTR[this._staticActor.$$.ptr] = null;
              delete PX.IMPL_PTR[this._staticActor.$$.ptr];
            }

            this._staticActor.release();

            this._staticActor = null;
          }

          PhysXSharedBody.sharedBodesMap["delete"](this.node.uuid);
        };

        _createClass(PhysXSharedBody, [{
          key: "isStatic",
          get: function get() {
            return this._isStatic;
          }
        }, {
          key: "isKinematic",
          get: function get() {
            return this._isKinematic;
          }
        }, {
          key: "isDynamic",
          get: function get() {
            return !this._isStatic && !this._isKinematic;
          }
        }, {
          key: "wrappedBody",
          get: function get() {
            return this._wrappedBody;
          }
        }, {
          key: "filterData",
          get: function get() {
            return this._filterData;
          }
        }, {
          key: "isInScene",
          get: function get() {
            return this._index !== -1;
          }
        }, {
          key: "impl",
          get: function get() {
            this._initActor();

            return this.isStatic ? this._staticActor : this._dynamicActor;
          }
        }, {
          key: "reference",
          set: function set(v) {
            this._ref = v ? this._ref + 1 : this._ref - 1;

            if (this._ref === 0) {
              this.destroy();
            }
          }
        }, {
          key: "enabled",
          set: function set(v) {
            if (v) {
              if (this._index < 0) {
                this._index = this.wrappedWorld.wrappedBodies.length;
                this.wrappedWorld.addActor(this);
              }
            } else if (this._index >= 0) {
              var ws = this.wrappedShapes;
              var wb = this.wrappedBody;
              var isRemove = ws.length === 0 && wb == null || ws.length === 0 && wb != null && !wb.isEnabled;

              if (isRemove) {
                this._index = -1;
                this.clearForces();
                this.clearVelocity();
                this.wrappedWorld.removeActor(this);
              }
            }
          }
        }]);

        return PhysXSharedBody;
      }());

      PhysXSharedBody.idCounter = 0;
      PhysXSharedBody.sharedBodesMap = new Map();
    }
  };
});