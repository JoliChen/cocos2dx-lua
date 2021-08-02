System.register("q-bundled:///fs/cocos/physics/ammo/ammo-world.js", ["./ammo-instantiated.js", "../../core/math/index.js", "./ammo-shared-body.js", "../utils/array-collision-matrix.js", "../utils/tuple-dictionary.js", "./ammo-const.js", "./ammo-util.js", "../../core/index.js", "./ammo-instance.js", "./ammo-contact-equation.js", "../../core/utils/array.js"], function (_export, _context) {
  "use strict";

  var Ammo, Vec3, AmmoSharedBody, ArrayCollisionMatrix, TupleDictionary, TriggerEventObject, CollisionEventObject, CC_V3_0, CC_V3_1, AmmoConstant, ammo2CocosVec3, cocos2AmmoVec3, error, AmmoInstance, AmmoContactEquation, fastRemoveAt, contactsPool, v3_0, v3_1, AmmoWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_ammoInstantiatedJs) {
      Ammo = _ammoInstantiatedJs.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_ammoSharedBodyJs) {
      AmmoSharedBody = _ammoSharedBodyJs.AmmoSharedBody;
    }, function (_utilsArrayCollisionMatrixJs) {
      ArrayCollisionMatrix = _utilsArrayCollisionMatrixJs.ArrayCollisionMatrix;
    }, function (_utilsTupleDictionaryJs) {
      TupleDictionary = _utilsTupleDictionaryJs.TupleDictionary;
    }, function (_ammoConstJs) {
      TriggerEventObject = _ammoConstJs.TriggerEventObject;
      CollisionEventObject = _ammoConstJs.CollisionEventObject;
      CC_V3_0 = _ammoConstJs.CC_V3_0;
      CC_V3_1 = _ammoConstJs.CC_V3_1;
      AmmoConstant = _ammoConstJs.AmmoConstant;
    }, function (_ammoUtilJs) {
      ammo2CocosVec3 = _ammoUtilJs.ammo2CocosVec3;
      cocos2AmmoVec3 = _ammoUtilJs.cocos2AmmoVec3;
    }, function (_coreIndexJs) {
      error = _coreIndexJs.error;
    }, function (_ammoInstanceJs) {
      AmmoInstance = _ammoInstanceJs.AmmoInstance;
    }, function (_ammoContactEquationJs) {
      AmmoContactEquation = _ammoContactEquationJs.AmmoContactEquation;
    }, function (_coreUtilsArrayJs) {
      fastRemoveAt = _coreUtilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      contactsPool = [];
      v3_0 = CC_V3_0;
      v3_1 = CC_V3_1;

      _export("AmmoWorld", AmmoWorld = /*#__PURE__*/function () {
        var _proto = AmmoWorld.prototype;

        _proto.setAllowSleep = function setAllowSleep(v) {};

        _proto.setDefaultMaterial = function setDefaultMaterial(v) {};

        _proto.setGravity = function setGravity(gravity) {
          var TMP = AmmoConstant.instance.VECTOR3_0;
          cocos2AmmoVec3(TMP, gravity);

          this._btWorld.setGravity(TMP);
        };

        function AmmoWorld(options) {
          this._btWorld = void 0;
          this._btBroadphase = void 0;
          this._btSolver = void 0;
          this._btDispatcher = void 0;
          this._btCollisionConfiguration = void 0;
          this.bodies = [];
          this.ghosts = [];
          this.constraints = [];
          this.triggerArrayMat = new ArrayCollisionMatrix();
          this.collisionArrayMat = new ArrayCollisionMatrix();
          this.contactsDic = new TupleDictionary();
          this.oldContactsDic = new TupleDictionary();
          this._btCollisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
          this._btDispatcher = new Ammo.btCollisionDispatcher(this._btCollisionConfiguration); // this._btDispatcher.setDispatcherFlags(AmmoDispatcherFlags.CD_STATIC_STATIC_REPORTED);

          this._btBroadphase = new Ammo.btDbvtBroadphase();
          this._btSolver = new Ammo.btSequentialImpulseConstraintSolver();
          this._btWorld = new Ammo.btDiscreteDynamicsWorld(this._btDispatcher, this._btBroadphase, this._btSolver, this._btCollisionConfiguration);

          this._btWorld.getPairCache().setOverlapFilterCallback(new Ammo.ccOverlapFilterCallback()); // this._btWorld.setContactBreakingThreshold(0.04);


          var TMP = AmmoConstant.instance.VECTOR3_0;
          TMP.setValue(0, -10, 0);

          this._btWorld.setGravity(TMP);

          if (!AmmoWorld.closeHitCB) AmmoWorld.closeHitCB = new Ammo.ClosestRayResultCallback(TMP, TMP);
          if (!AmmoWorld.allHitsCB) AmmoWorld.allHitsCB = new Ammo.AllHitsRayResultCallback(TMP, TMP);
          AmmoWorld.closeHitCB.setUseCC(true);
          AmmoWorld.allHitsCB.setUseCC(true);
        }

        _proto.destroy = function destroy() {
          if (this.constraints.length || this.bodies.length) error('You should destroy all physics component first.');
          Ammo.destroy(this._btWorld);
          Ammo.destroy(this._btSolver);
          Ammo.destroy(this._btBroadphase);
          Ammo.destroy(this._btDispatcher);
          Ammo.destroy(this._btCollisionConfiguration);
          this._btCollisionConfiguration = null;
          this._btDispatcher = null;
          this._btBroadphase = null;
          this._btSolver = null;
          this._btWorld = null;
          this.bodies = null;
          this.ghosts = null;
          this.constraints = null;
          this.triggerArrayMat = null;
          this.collisionArrayMat = null;
          this.contactsDic = null;
          this.oldContactsDic = null;
          contactsPool.length = 0;
        };

        _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
          if (maxSubStep === void 0) {
            maxSubStep = 0;
          }

          if (this.bodies.length === 0 && this.ghosts.length === 0) return;
          if (timeSinceLastCalled === undefined) timeSinceLastCalled = deltaTime;

          this._btWorld.stepSimulation(timeSinceLastCalled, maxSubStep, deltaTime);

          for (var i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncPhysicsToScene();
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          for (var i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].updateDirty();
            this.ghosts[i].syncSceneToGhost();
          }

          for (var _i = 0; _i < this.bodies.length; _i++) {
            this.bodies[_i].updateDirty();

            this.bodies[_i].syncSceneToPhysics();
          }
        };

        _proto.syncAfterEvents = function syncAfterEvents() {
          this.syncSceneToPhysics();
        };

        _proto.raycast = function raycast(worldRay, options, pool, results) {
          var allHitsCB = AmmoWorld.allHitsCB;
          var from = cocos2AmmoVec3(allHitsCB.m_rayFromWorld, worldRay.o);
          worldRay.computeHit(v3_0, options.maxDistance);
          var to = cocos2AmmoVec3(allHitsCB.m_rayToWorld, v3_0);
          allHitsCB.m_collisionFilterGroup = -1;
          allHitsCB.m_collisionFilterMask = options.mask;
          allHitsCB.m_closestHitFraction = 1;
          allHitsCB.m_shapePart = -1;
          allHitsCB.m_collisionObject = null;
          allHitsCB.m_shapeParts.clear();
          allHitsCB.m_hitFractions.clear();
          allHitsCB.m_collisionObjects.clear();
          var hp = allHitsCB.m_hitPointWorld;
          var hn = allHitsCB.m_hitNormalWorld;
          hp.clear();
          hn.clear();

          this._btWorld.rayTest(from, to, allHitsCB);

          if (allHitsCB.hasHit()) {
            for (var i = 0, n = allHitsCB.m_collisionObjects.size(); i < n; i++) {
              var btObj = allHitsCB.m_collisionObjects.at(i);
              var btCs = btObj.getCollisionShape();
              var shape = void 0;

              if (btCs.isCompound()) {
                var shapeIndex = allHitsCB.m_shapeParts.at(i);
                var index = btObj.getUserIndex();
                var shared = AmmoInstance.bodyAndGhosts[index];
                shape = shared.wrappedShapes[shapeIndex];
              } else {
                shape = btCs.wrapped;
              }

              ammo2CocosVec3(v3_0, hp.at(i));
              ammo2CocosVec3(v3_1, hn.at(i));
              var distance = Vec3.distance(worldRay.o, v3_0);
              var r = pool.add();

              r._assign(v3_0, distance, shape.collider, v3_1);

              results.push(r);
            }

            return true;
          }

          return false;
        }
        /**
         * Ray cast, and return information of the closest hit.
         * @return True if any body was hit.
         */
        ;

        _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
          var closeHitCB = AmmoWorld.closeHitCB;
          var from = cocos2AmmoVec3(closeHitCB.m_rayFromWorld, worldRay.o);
          worldRay.computeHit(v3_0, options.maxDistance);
          var to = cocos2AmmoVec3(closeHitCB.m_rayToWorld, v3_0);
          closeHitCB.m_collisionFilterGroup = -1;
          closeHitCB.m_collisionFilterMask = options.mask;
          closeHitCB.m_closestHitFraction = 1;
          closeHitCB.m_collisionObject = null;

          this._btWorld.rayTest(from, to, closeHitCB);

          if (closeHitCB.hasHit()) {
            var btObj = closeHitCB.m_collisionObject;
            var btCs = btObj.getCollisionShape();
            var shape;

            if (btCs.isCompound()) {
              var index = btObj.getUserIndex();
              var shared = AmmoInstance.bodyAndGhosts[index];
              var shapeIndex = closeHitCB.m_shapePart;
              shape = shared.wrappedShapes[shapeIndex];
            } else {
              shape = btCs.wrapped;
            }

            ammo2CocosVec3(v3_0, closeHitCB.m_hitPointWorld);
            ammo2CocosVec3(v3_1, closeHitCB.m_hitNormalWorld);
            var distance = Vec3.distance(worldRay.o, v3_0);

            result._assign(v3_0, distance, shape.collider, v3_1);

            return true;
          }

          return false;
        };

        _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
          return AmmoSharedBody.getSharedBody(node, this, wrappedBody);
        };

        _proto.addSharedBody = function addSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i < 0) {
            this.bodies.push(sharedBody);

            this._btWorld.addRigidBody(sharedBody.body, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        };

        _proto.removeSharedBody = function removeSharedBody(sharedBody) {
          var i = this.bodies.indexOf(sharedBody);

          if (i >= 0) {
            fastRemoveAt(this.bodies, i);

            this._btWorld.removeRigidBody(sharedBody.body);
          }
        };

        _proto.addGhostObject = function addGhostObject(sharedBody) {
          var i = this.ghosts.indexOf(sharedBody);

          if (i < 0) {
            this.ghosts.push(sharedBody);

            this._btWorld.addCollisionObject(sharedBody.ghost, sharedBody.collisionFilterGroup, sharedBody.collisionFilterMask);
          }
        };

        _proto.removeGhostObject = function removeGhostObject(sharedBody) {
          var i = this.ghosts.indexOf(sharedBody);

          if (i >= 0) {
            fastRemoveAt(this.ghosts, i);

            this._btWorld.removeCollisionObject(sharedBody.ghost);
          }
        };

        _proto.addConstraint = function addConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i < 0) {
            this.constraints.push(constraint);

            this._btWorld.addConstraint(constraint.impl, !constraint.constraint.enableCollision);

            constraint.index = i;
          }
        };

        _proto.removeConstraint = function removeConstraint(constraint) {
          var i = this.constraints.indexOf(constraint);

          if (i >= 0) {
            this.constraints.splice(i, 1);

            this._btWorld.removeConstraint(constraint.impl);

            constraint.index = -1;
          }
        };

        _proto.emitEvents = function emitEvents() {
          var numManifolds = this._btDispatcher.getNumManifolds();

          for (var i = 0; i < numManifolds; i++) {
            var manifold = this._btDispatcher.getManifoldByIndexInternal(i);

            var body0 = manifold.getBody0();
            var body1 = manifold.getBody1(); // TODO: SUPPORT CHARACTER EVENT

            if (body0.useCharacter || body1.useCharacter) {
              continue;
            }

            var numContacts = manifold.getNumContacts();

            for (var j = 0; j < numContacts; j++) {
              var manifoldPoint = manifold.getContactPoint(j);
              var s0 = manifoldPoint.getShape0();
              var s1 = manifoldPoint.getShape1();
              var shape0 = void 0;
              var shape1 = void 0;

              if (s0.isCompound()) {
                var com = Ammo.castObject(s0, Ammo.btCompoundShape);
                shape0 = com.getChildShape(manifoldPoint.m_index0).wrapped;
              } else {
                shape0 = s0.wrapped;
              }

              if (s1.isCompound()) {
                var _com = Ammo.castObject(s1, Ammo.btCompoundShape);

                shape1 = _com.getChildShape(manifoldPoint.m_index1).wrapped;
              } else {
                shape1 = s1.wrapped;
              }

              if (!shape0 || !shape1) continue;

              if (shape0.collider.needTriggerEvent || shape1.collider.needTriggerEvent || shape0.collider.needCollisionEvent || shape1.collider.needCollisionEvent) {
                // current contact
                var item = this.contactsDic.get(shape0.id, shape1.id);

                if (item == null) {
                  item = this.contactsDic.set(shape0.id, shape1.id, {
                    shape0: shape0,
                    shape1: shape1,
                    contacts: [],
                    impl: manifold
                  });
                }

                item.contacts.push(manifoldPoint);
              }
            }
          } // is enter or stay


          var dicL = this.contactsDic.getLength();

          while (dicL--) {
            contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
            CollisionEventObject.contacts.length = 0;
            var key = this.contactsDic.getKeyByIndex(dicL);
            var data = this.contactsDic.getDataByKey(key);
            var _shape = data.shape0;
            var _shape2 = data.shape1;
            this.oldContactsDic.set(_shape.id, _shape2.id, data);
            var collider0 = _shape.collider;
            var collider1 = _shape2.collider;

            if (collider0 && collider1) {
              var isTrigger = collider0.isTrigger || collider1.isTrigger;

              if (isTrigger) {
                if (this.triggerArrayMat.get(_shape.id, _shape2.id)) {
                  TriggerEventObject.type = 'onTriggerStay';
                } else {
                  TriggerEventObject.type = 'onTriggerEnter';
                  this.triggerArrayMat.set(_shape.id, _shape2.id, true);
                }

                TriggerEventObject.impl = data.impl;
                TriggerEventObject.selfCollider = collider0;
                TriggerEventObject.otherCollider = collider1;
                collider0.emit(TriggerEventObject.type, TriggerEventObject);
                TriggerEventObject.selfCollider = collider1;
                TriggerEventObject.otherCollider = collider0;
                collider1.emit(TriggerEventObject.type, TriggerEventObject);
              } else {
                var _body = collider0.attachedRigidBody;
                var _body2 = collider1.attachedRigidBody;

                if (_body && _body2) {
                  if (_body.isSleeping && _body2.isSleeping) continue;
                } else if (_body == null && _body2) {
                  if (_body2.isSleeping) continue;
                } else if (_body2 == null && _body) {
                  if (_body.isSleeping) continue;
                }

                if (this.collisionArrayMat.get(_shape.id, _shape2.id)) {
                  CollisionEventObject.type = 'onCollisionStay';
                } else {
                  CollisionEventObject.type = 'onCollisionEnter';
                  this.collisionArrayMat.set(_shape.id, _shape2.id, true);
                }

                for (var _i2 = 0; _i2 < data.contacts.length; _i2++) {
                  var cq = data.contacts[_i2];

                  if (contactsPool.length > 0) {
                    var c = contactsPool.pop();
                    c.impl = cq;
                    CollisionEventObject.contacts.push(c);
                  } else {
                    var _c = new AmmoContactEquation(CollisionEventObject);

                    _c.impl = cq;
                    CollisionEventObject.contacts.push(_c);
                  }
                }

                CollisionEventObject.impl = data.impl;
                CollisionEventObject.selfCollider = collider0;
                CollisionEventObject.otherCollider = collider1;
                collider0.emit(CollisionEventObject.type, CollisionEventObject);
                CollisionEventObject.selfCollider = collider1;
                CollisionEventObject.otherCollider = collider0;
                collider1.emit(CollisionEventObject.type, CollisionEventObject);
              }

              if (this.oldContactsDic.get(_shape.id, _shape2.id) == null) {
                this.oldContactsDic.set(_shape.id, _shape2.id, data);
              }
            }
          } // is exit


          var oldDicL = this.oldContactsDic.getLength();

          while (oldDicL--) {
            var _key = this.oldContactsDic.getKeyByIndex(oldDicL);

            var _data = this.oldContactsDic.getDataByKey(_key);

            var _shape3 = _data.shape0;
            var _shape4 = _data.shape1;
            var _collider = _shape3.collider;
            var _collider2 = _shape4.collider;

            if (_collider && _collider2) {
              var _isTrigger = _collider.isTrigger || _collider2.isTrigger;

              if (this.contactsDic.getDataByKey(_key) == null) {
                if (_isTrigger) {
                  if (this.triggerArrayMat.get(_shape3.id, _shape4.id)) {
                    TriggerEventObject.type = 'onTriggerExit';
                    TriggerEventObject.selfCollider = _collider;
                    TriggerEventObject.otherCollider = _collider2;

                    _collider.emit(TriggerEventObject.type, TriggerEventObject);

                    TriggerEventObject.selfCollider = _collider2;
                    TriggerEventObject.otherCollider = _collider;

                    _collider2.emit(TriggerEventObject.type, TriggerEventObject);

                    this.triggerArrayMat.set(_shape3.id, _shape4.id, false);
                    this.oldContactsDic.set(_shape3.id, _shape4.id, null);
                  }
                } else if (this.collisionArrayMat.get(_shape3.id, _shape4.id)) {
                  contactsPool.push.apply(contactsPool, CollisionEventObject.contacts);
                  CollisionEventObject.contacts.length = 0;
                  CollisionEventObject.type = 'onCollisionExit';
                  CollisionEventObject.selfCollider = _collider;
                  CollisionEventObject.otherCollider = _collider2;

                  _collider.emit(CollisionEventObject.type, CollisionEventObject);

                  CollisionEventObject.selfCollider = _collider2;
                  CollisionEventObject.otherCollider = _collider;

                  _collider2.emit(CollisionEventObject.type, CollisionEventObject);

                  this.collisionArrayMat.set(_shape3.id, _shape4.id, false);
                  this.oldContactsDic.set(_shape3.id, _shape4.id, null);
                }
              }
            }
          }

          this.contactsDic.reset();
        };

        _createClass(AmmoWorld, [{
          key: "impl",
          get: function get() {
            return this._btWorld;
          }
        }]);

        return AmmoWorld;
      }());

      AmmoWorld.closeHitCB = void 0;
      AmmoWorld.allHitsCB = void 0;
    }
  };
});