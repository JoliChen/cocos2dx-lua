System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './mesh-a2fd8333.js', './skeleton-900ed0b7.js', './index-69bbf9ec.js', './collision-matrix-e0ba62f9.js', './terrain-asset-80384d17.js', './capsule-b8983ee3.js', './tuple-dictionary-5e20c301.js'], function () {
    'use strict';
    var Vec3, Quat, legacyCC, AABB, fastRemoveAt, TransformBit, _createClass, error, _inheritsLoose, absMax, AttributeName, shrinkPositions, PhysicsSystem, VEC3_0, TriggerEventObject, CollisionEventObject, selector, ERigidBodyType, PhysicsGroup, EAxisDirection, cylinder, TupleDictionary;
    return {
        setters: [function (module) {
            Vec3 = module.cY;
            Quat = module.d0;
            legacyCC = module.l;
            AABB = module.f9;
            fastRemoveAt = module.gR;
            TransformBit = module.f_;
            _createClass = module.eu;
            error = module.e;
            _inheritsLoose = module.et;
            absMax = module.dw;
            AttributeName = module.b1;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function (module) {
            shrinkPositions = module.n;
            PhysicsSystem = module.P;
            VEC3_0 = module.V;
            TriggerEventObject = module.o;
            CollisionEventObject = module.q;
            selector = module.l;
        }, function (module) {
            ERigidBodyType = module.a;
            PhysicsGroup = module.P;
            EAxisDirection = module.E;
        }, function () {}, function (module) {
            cylinder = module.c;
        }, function (module) {
            TupleDictionary = module.T;
        }],
        execute: function () {

            var globalThis = legacyCC._global;

            if (globalThis.PhysX) {
              globalThis.PhysX = PhysX({
                onRuntimeInitialized: function onRuntimeInitialized() {
                  console.log('PhysX loaded');
                  PX.VECTOR_MAT = new PX.PxMaterialVector();
                  PX.QueryHitType = PX.PxQueryHitType;
                  PX.ShapeFlag = PX.PxShapeFlag;
                  PX.ActorFlag = PX.PxActorFlag;
                  PX.RigidBodyFlag = PX.PxRigidBodyFlag;
                  PX.RigidDynamicLockFlag = PX.PxRigidDynamicLockFlag;
                  PX.CombineMode = PX.PxCombineMode;
                  PX.ForceMode = PX.PxForceMode;
                  PX.SphereGeometry = PX.PxSphereGeometry;
                  PX.BoxGeometry = PX.PxBoxGeometry;
                  PX.CapsuleGeometry = PX.PxCapsuleGeometry;
                  PX.PlaneGeometry = PX.PxPlaneGeometry;
                  PX.ConvexMeshGeometry = PX.PxConvexMeshGeometry;
                  PX.TriangleMeshGeometry = PX.PxTriangleMeshGeometry;
                  PX.MeshScale = PX.PxMeshScale;

                  PX.createRevoluteJoint = function (a, b, c, d) {
                    return PX.PxRevoluteJointCreate(PX.physics, a, b, c, d);
                  };

                  PX.createDistanceJoint = function (a, b, c, d) {
                    return PX.PxDistanceJointCreate(PX.physics, a, b, c, d);
                  };
                }
              });
            }

            var _px = globalThis.PhysX;
            var PX = _px;

            if (PX) {
              PX.CACHE_MAT = {};
              PX.IMPL_PTR = {};
              PX.MESH_CONVEX = {};
              PX.MESH_STATIC = {};
              PX.TERRAIN_STATIC = {};
            }

            var EFilterDataWord3;

            (function (EFilterDataWord3) {
              EFilterDataWord3[EFilterDataWord3["QUERY_FILTER"] = 1] = "QUERY_FILTER";
              EFilterDataWord3[EFilterDataWord3["QUERY_CHECK_TRIGGER"] = 2] = "QUERY_CHECK_TRIGGER";
              EFilterDataWord3[EFilterDataWord3["QUERY_SINGLE_HIT"] = 4] = "QUERY_SINGLE_HIT";
              EFilterDataWord3[EFilterDataWord3["DETECT_TRIGGER_EVENT"] = 8] = "DETECT_TRIGGER_EVENT";
              EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_EVENT"] = 16] = "DETECT_CONTACT_EVENT";
              EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_POINT"] = 32] = "DETECT_CONTACT_POINT";
              EFilterDataWord3[EFilterDataWord3["DETECT_CONTACT_CCD"] = 64] = "DETECT_CONTACT_CCD";
            })(EFilterDataWord3 || (EFilterDataWord3 = {}));

            var PxHitFlag;

            (function (PxHitFlag) {
              PxHitFlag[PxHitFlag["ePOSITION"] = 1] = "ePOSITION";
              PxHitFlag[PxHitFlag["eNORMAL"] = 2] = "eNORMAL";
              PxHitFlag[PxHitFlag["eUV"] = 8] = "eUV";
              PxHitFlag[PxHitFlag["eASSUME_NO_INITIAL_OVERLAP"] = 16] = "eASSUME_NO_INITIAL_OVERLAP";
              PxHitFlag[PxHitFlag["eMESH_MULTIPLE"] = 32] = "eMESH_MULTIPLE";
              PxHitFlag[PxHitFlag["eMESH_ANY"] = 64] = "eMESH_ANY";
              PxHitFlag[PxHitFlag["eMESH_BOTH_SIDES"] = 128] = "eMESH_BOTH_SIDES";
              PxHitFlag[PxHitFlag["ePRECISE_SWEEP"] = 256] = "ePRECISE_SWEEP";
              PxHitFlag[PxHitFlag["eMTD"] = 512] = "eMTD";
              PxHitFlag[PxHitFlag["eFACE_INDEX"] = 1024] = "eFACE_INDEX";
              PxHitFlag[PxHitFlag["eDEFAULT"] = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL | PxHitFlag.eFACE_INDEX] = "eDEFAULT";
              PxHitFlag[PxHitFlag["eMODIFIABLE_FLAGS"] = PxHitFlag.eMESH_MULTIPLE | PxHitFlag.eMESH_BOTH_SIDES | PxHitFlag.eASSUME_NO_INITIAL_OVERLAP | PxHitFlag.ePRECISE_SWEEP] = "eMODIFIABLE_FLAGS";
            })(PxHitFlag || (PxHitFlag = {}));

            var PxQueryFlag;

            (function (PxQueryFlag) {
              PxQueryFlag[PxQueryFlag["eSTATIC"] = 1] = "eSTATIC";
              PxQueryFlag[PxQueryFlag["eDYNAMIC"] = 2] = "eDYNAMIC";
              PxQueryFlag[PxQueryFlag["ePREFILTER"] = 4] = "ePREFILTER";
              PxQueryFlag[PxQueryFlag["ePOSTFILTER"] = 8] = "ePOSTFILTER";
              PxQueryFlag[PxQueryFlag["eANY_HIT"] = 16] = "eANY_HIT";
              PxQueryFlag[PxQueryFlag["eNO_BLOCK"] = 32] = "eNO_BLOCK";
              PxQueryFlag[PxQueryFlag["eRESERVED"] = 32768] = "eRESERVED";
            })(PxQueryFlag || (PxQueryFlag = {}));

            var PxPairFlag;

            (function (PxPairFlag) {
              PxPairFlag[PxPairFlag["eSOLVE_CONTACT"] = 1] = "eSOLVE_CONTACT";
              PxPairFlag[PxPairFlag["eMODIFY_CONTACTS"] = 2] = "eMODIFY_CONTACTS";
              PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_FOUND"] = 4] = "eNOTIFY_TOUCH_FOUND";
              PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_PERSISTS"] = 8] = "eNOTIFY_TOUCH_PERSISTS";
              PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_LOST"] = 16] = "eNOTIFY_TOUCH_LOST";
              PxPairFlag[PxPairFlag["eNOTIFY_TOUCH_CCD"] = 32] = "eNOTIFY_TOUCH_CCD";
              PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_FOUND"] = 64] = "eNOTIFY_THRESHOLD_FORCE_FOUND";
              PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_PERSISTS"] = 128] = "eNOTIFY_THRESHOLD_FORCE_PERSISTS";
              PxPairFlag[PxPairFlag["eNOTIFY_THRESHOLD_FORCE_LOST"] = 256] = "eNOTIFY_THRESHOLD_FORCE_LOST";
              PxPairFlag[PxPairFlag["eNOTIFY_CONTACT_POINTS"] = 512] = "eNOTIFY_CONTACT_POINTS";
              PxPairFlag[PxPairFlag["eDETECT_DISCRETE_CONTACT"] = 1024] = "eDETECT_DISCRETE_CONTACT";
              PxPairFlag[PxPairFlag["eDETECT_CCD_CONTACT"] = 2048] = "eDETECT_CCD_CONTACT";
              PxPairFlag[PxPairFlag["ePRE_SOLVER_VELOCITY"] = 4096] = "ePRE_SOLVER_VELOCITY";
              PxPairFlag[PxPairFlag["ePOST_SOLVER_VELOCITY"] = 8192] = "ePOST_SOLVER_VELOCITY";
              PxPairFlag[PxPairFlag["eCONTACT_EVENT_POSE"] = 16384] = "eCONTACT_EVENT_POSE";
              PxPairFlag[PxPairFlag["eNEXT_FREE"] = 32768] = "eNEXT_FREE";
              PxPairFlag[PxPairFlag["eCONTACT_DEFAULT"] = 1025] = "eCONTACT_DEFAULT";
              PxPairFlag[PxPairFlag["eTRIGGER_DEFAULT"] = 1044] = "eTRIGGER_DEFAULT";
            })(PxPairFlag || (PxPairFlag = {}));

            var PxContactPairFlag;

            (function (PxContactPairFlag) {
              PxContactPairFlag[PxContactPairFlag["eREMOVED_SHAPE_0"] = 1] = "eREMOVED_SHAPE_0";
              PxContactPairFlag[PxContactPairFlag["eREMOVED_SHAPE_1"] = 2] = "eREMOVED_SHAPE_1";
              PxContactPairFlag[PxContactPairFlag["eACTOR_PAIR_HAS_FIRST_TOUCH"] = 4] = "eACTOR_PAIR_HAS_FIRST_TOUCH";
              PxContactPairFlag[PxContactPairFlag["eACTOR_PAIR_LOST_TOUCH"] = 8] = "eACTOR_PAIR_LOST_TOUCH";
              PxContactPairFlag[PxContactPairFlag["eINTERNAL_HAS_IMPULSES"] = 16] = "eINTERNAL_HAS_IMPULSES";
              PxContactPairFlag[PxContactPairFlag["eINTERNAL_CONTACTS_ARE_FLIPPED"] = 32] = "eINTERNAL_CONTACTS_ARE_FLIPPED";
            })(PxContactPairFlag || (PxContactPairFlag = {}));

            var PxTriggerPairFlag;

            (function (PxTriggerPairFlag) {
              PxTriggerPairFlag[PxTriggerPairFlag["eREMOVED_SHAPE_TRIGGER"] = 1] = "eREMOVED_SHAPE_TRIGGER";
              PxTriggerPairFlag[PxTriggerPairFlag["eREMOVED_SHAPE_OTHER"] = 2] = "eREMOVED_SHAPE_OTHER";
              PxTriggerPairFlag[PxTriggerPairFlag["eNEXT_FREE"] = 4] = "eNEXT_FREE";
            })(PxTriggerPairFlag || (PxTriggerPairFlag = {}));

            var _v3 = {
              x: 0,
              y: 0,
              z: 0
            };
            var _v4 = {
              x: 0,
              y: 0,
              z: 0,
              w: 1
            };
            var _trans = {
              translation: _v3,
              rotation: _v4,
              p: _v3,
              q: _v4
            };
            var _pxtrans =  _trans;
            function getImplPtr(impl) {

              return impl.$$.ptr;
            }
            function getWrapShape(pxShape) {
              return PX.IMPL_PTR[getImplPtr(pxShape)];
            }
            function getContactPosition(pxContactOrIndex, out, buf) {
              {
                Vec3.copy(out, pxContactOrIndex.position);
              }
            }
            function getContactNormal(pxContactOrIndex, out, buf) {
              {
                Vec3.copy(out, pxContactOrIndex.normal);
              }
            }
            function getTempTransform(pos, quat) {
              {
                Vec3.copy(_pxtrans.translation, pos);
                Quat.copy(_pxtrans.rotation, quat);
              }

              return _pxtrans;
            }
            function getJsTransform(pos, quat) {
              Vec3.copy(_trans.p, pos);
              Quat.copy(_trans.q, quat);
              return _trans;
            }
            function addActorToScene(scene, actor) {
              {
                scene.addActor(actor, null);
              }
            }
            function setJointActors(joint, actor0, actor1) {
              {
                joint.setActors(actor0, actor1);
              }
            }
            function setMassAndUpdateInertia(impl, mass) {
              {
                impl.setMassAndUpdateInertia(mass);
              }
            }
            function copyPhysXTransform(node, transform) {
              var wp = node.worldPosition;
              var wr = node.worldRotation;
              var dontUpdate = physXEqualsCocosVec3(transform, wp) && physXEqualsCocosQuat(transform, wr);
              if (dontUpdate) return;

              {
                node.setWorldPosition(transform.translation);
                node.setWorldRotation(transform.rotation);
              }
            }
            function physXEqualsCocosVec3(trans, v3) {
              var pos =  trans.translation;
              return Vec3.equals(pos, v3);
            }
            function physXEqualsCocosQuat(trans, q) {
              var rot =  trans.rotation;
              return Quat.equals(rot, q);
            }
            function getContactData(vec, index, o) {
              {
                var gc = PX.getGContacts();
                var data = gc.get(index + o);
                gc["delete"]();
                return data;
              }
            }
            function applyImpulse(isGlobal, impl, vec, rp) {
              if (isGlobal) {
                {
                  impl.applyImpulse(vec, rp);
                }
              } else {
                impl.applyLocalImpulse(vec, rp);
              }
            }
            function applyForce(isGlobal, impl, vec, rp) {
              if (isGlobal) {
                {
                  impl.applyForce(vec, rp);
                }
              } else {
                impl.applyLocalForce(vec, rp);
              }
            }
            function applyTorqueForce(impl, vec) {
              {
                impl.addTorque(vec);
              }
            }
            function getShapeFlags(isTrigger) {

              var flag = (isTrigger ? PX.PxShapeFlag.eTRIGGER_SHAPE.value : PX.PxShapeFlag.eSIMULATION_SHAPE.value) | PX.PxShapeFlag.eSCENE_QUERY_SHAPE.value;
              return new PX.PxShapeFlags(flag);
            }
            function getShapeWorldBounds(shape, actor, i, out) {
              if (i === void 0) {
                i = 1.01;
              }

              {
                var _b = shape.getWorldBounds(actor, i);

                AABB.fromPoints(out, _b.minimum, _b.maximum);
              }
            }
            function getShapeMaterials(pxMtl) {

              if (PX.VECTOR_MAT.size() > 0) {
                PX.VECTOR_MAT.set(0, pxMtl);
              } else {
                PX.VECTOR_MAT.push_back(pxMtl);
              }

              return PX.VECTOR_MAT;
            }
            function createConvexMesh(_buffer, cooking, physics) {
              var vertices = shrinkPositions(_buffer);

              {
                var l = vertices.length;
                var vArr = new PX.PxVec3Vector();

                for (var i = 0; i < l; i += 3) {
                  vArr.push_back({
                    x: vertices[i],
                    y: vertices[i + 1],
                    z: vertices[i + 2]
                  });
                }

                var r = cooking.createConvexMesh(vArr, physics);
                vArr["delete"]();
                return r;
              }
            }
            function createMeshGeometryFlags(flags, isConvex) {

              return isConvex ? new PX.PxConvexMeshGeometryFlags(flags) : new PX.PxMeshGeometryFlags(flags);
            }
            function createTriangleMesh(vertices, indices, cooking, physics) {
              {
                var l = vertices.length;
                var l2 = indices.length;
                var vArr = new PX.PxVec3Vector();

                for (var i = 0; i < l; i += 3) {
                  vArr.push_back({
                    x: vertices[i],
                    y: vertices[i + 1],
                    z: vertices[i + 2]
                  });
                }

                var iArr = new PX.PxU16Vector();

                for (var _i = 0; _i < l2; _i += 3) {
                  iArr.push_back(indices[_i]);
                  iArr.push_back(indices[_i + 1]);
                  iArr.push_back(indices[_i + 2]);
                }

                var r = cooking.createTriMeshExt(vArr, iArr, physics);
                vArr["delete"]();
                iArr["delete"]();
                return r;
              }
            }
            function createHeightField(terrain, heightScale, cooking, physics) {
              var sizeI = terrain.getVertexCountI();
              var sizeJ = terrain.getVertexCountJ();

              var samples = new PX.PxHeightFieldSampleVector();

              for (var _i2 = 0; _i2 < sizeI; _i2++) {
                for (var _j = 0; _j < sizeJ; _j++) {
                  var _s = new PX.PxHeightFieldSample();

                  _s.height = terrain.getHeight(_i2, _j) / heightScale;
                  samples.push_back(_s);
                }
              }

              return cooking.createHeightFieldExt(sizeI, sizeJ, samples, physics);
            }
            function createHeightFieldGeometry(hf, flags, hs, xs, zs) {

              return new PX.PxHeightFieldGeometry(hf, new PX.PxMeshGeometryFlags(flags), hs, xs, zs);
            }
            function simulateScene(scene, deltaTime) {
              {
                scene.simulate(deltaTime, true);
              }
            }
            function raycastAll(world, worldRay, options, pool, results) {
              var maxDistance = options.maxDistance;
              var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
              var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER);
              var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER | PxQueryFlag.eNO_BLOCK;

              {
                world.queryfilterData.setWords(options.mask >>> 0, 0);
                world.queryfilterData.setWords(word3, 3);
                world.queryfilterData.setFlags(queryFlags);
                var blocks = world.mutipleResults;

                var _r = world.scene.raycastMultiple(worldRay.o, worldRay.d, maxDistance, flags, blocks, blocks.size(), world.queryfilterData, world.queryFilterCB, null);

                if (_r > 0) {
                  for (var _i3 = 0; _i3 < _r; _i3++) {
                    var _block = blocks.get(_i3);

                    var _collider = getWrapShape(_block.getShape()).collider;

                    var _result = pool.add();

                    _result._assign(_block.position, _block.distance, _collider, _block.normal);

                    results.push(_result);
                  }

                  return true;
                }

                if (_r === -1) {
                  console.error('not enough memory.');
                }
              }

              return false;
            }
            function raycastClosest(world, worldRay, options, result) {
              var maxDistance = options.maxDistance;
              var flags = PxHitFlag.ePOSITION | PxHitFlag.eNORMAL;
              var word3 = EFilterDataWord3.QUERY_FILTER | (options.queryTrigger ? 0 : EFilterDataWord3.QUERY_CHECK_TRIGGER) | EFilterDataWord3.QUERY_SINGLE_HIT;
              var queryFlags = PxQueryFlag.eSTATIC | PxQueryFlag.eDYNAMIC | PxQueryFlag.ePREFILTER;

              {
                world.queryfilterData.setWords(options.mask >>> 0, 0);
                world.queryfilterData.setWords(word3, 3);
                world.queryfilterData.setFlags(queryFlags);
                var _block2 = world.singleResult;
                var r = world.scene.raycastSingle(worldRay.o, worldRay.d, options.maxDistance, flags, _block2, world.queryfilterData, world.queryFilterCB, null);

                if (r) {
                  var _collider2 = getWrapShape(_block2.getShape()).collider;

                  result._assign(_block2.position, _block2.distance, _collider2, _block2.normal);

                  return true;
                }
              }

              return false;
            }
            function initializeWorld(world, eventCallback, queryCallback, onCollision, onTrigger) {
              {
                world.singleResult = new PX.PxRaycastHit();
                world.mutipleResults = new PX.PxRaycastHitVector();
                world.mutipleResults.resize(world.mutipleResultSize, world.singleResult);
                world.queryfilterData = new PX.PxQueryFilterData();
                world.simulationCB = PX.PxSimulationEventCallback.implement(eventCallback);
                world.queryFilterCB = PX.PxQueryFilterCallback.implement(queryCallback);
                var version = PX.PX_PHYSICS_VERSION;
                var defaultErrorCallback = new PX.PxDefaultErrorCallback();
                var allocator = new PX.PxDefaultAllocator();
                var foundation = PX.PxCreateFoundation(version, allocator, defaultErrorCallback);
                var scale = new PX.PxTolerancesScale();
                world.cooking = PX.PxCreateCooking(version, foundation, new PX.PxCookingParams(scale));
                world.physics = PX.PxCreatePhysics(version, foundation, scale, false, null);
                PX.PxInitExtensions(world.physics, null);

                var _sceneDesc = PX.getDefaultSceneDesc(world.physics.getTolerancesScale(), 0, world.simulationCB);

                world.scene = world.physics.createScene(_sceneDesc);
                PX.physics = world.physics;
              }
            }

            var PhysXSharedBody = function () {
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
                this.impl.clearForce(PX.ForceMode.eFORCE);
                this.impl.clearForce(PX.ForceMode.eIMPULSE);
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
            }();
            PhysXSharedBody.idCounter = 0;
            PhysXSharedBody.sharedBodesMap = new Map();

            var quat = new Quat();
            var PhysXContactEquation = function () {
              function PhysXContactEquation(event) {
                this.impl = null;
                this.event = void 0;
                this.event = event;
              }

              var _proto = PhysXContactEquation.prototype;

              _proto.getLocalPointOnA = function getLocalPointOnA(out) {
                getContactPosition(this.impl, out, this.event.impl);
                Vec3.subtract(out, out, this.colliderA.node.worldPosition);
              };

              _proto.getLocalPointOnB = function getLocalPointOnB(out) {
                getContactPosition(this.impl, out, this.event.impl);
                Vec3.subtract(out, out, this.colliderB.node.worldPosition);
              };

              _proto.getWorldPointOnA = function getWorldPointOnA(out) {
                getContactPosition(this.impl, out, this.event.impl);
              };

              _proto.getWorldPointOnB = function getWorldPointOnB(out) {
                getContactPosition(this.impl, out, this.event.impl);
              };

              _proto.getLocalNormalOnA = function getLocalNormalOnA(out) {
                this.getWorldNormalOnA(out);
                Quat.conjugate(quat, this.colliderA.node.worldRotation);
                Vec3.transformQuat(out, out, quat);
              };

              _proto.getLocalNormalOnB = function getLocalNormalOnB(out) {
                this.getWorldNormalOnB(out);
                Quat.conjugate(quat, this.colliderB.node.worldRotation);
                Vec3.transformQuat(out, out, quat);
              };

              _proto.getWorldNormalOnA = function getWorldNormalOnA(out) {
                getContactNormal(this.impl, out, this.event.impl);
                if (!this.isBodyA) Vec3.negate(out, out);
              };

              _proto.getWorldNormalOnB = function getWorldNormalOnB(out) {
                getContactNormal(this.impl, out, this.event.impl);
              };

              _createClass(PhysXContactEquation, [{
                key: "isBodyA",
                get: function get() {
                  return this.colliderA.uuid === this.event.selfCollider.uuid;
                }
              }]);

              return PhysXContactEquation;
            }();

            var triggerEventBeginDic = new TupleDictionary();
            var triggerEventEndDic = new TupleDictionary();
            var triggerEventsPool = [];

            function onTrigger(type, wpa, wpb) {
              if (wpa && wpb) {
                if (wpa.collider.needTriggerEvent || wpb.collider.needTriggerEvent) {
                  var tE;

                  if (triggerEventsPool.length > 0) {
                    tE = triggerEventsPool.pop();
                    tE.a = wpa;
                    tE.b = wpb;
                    tE.times = 0;
                  } else {
                    tE = {
                      a: wpa,
                      b: wpb,
                      times: 0
                    };
                  }

                  if (type === 'onTriggerEnter') {
                    triggerEventBeginDic.set(wpa.id, wpb.id, tE);
                  } else {
                    triggerEventEndDic.set(wpa.id, wpb.id, tE);
                  }
                }
              }
            }

            function emitTriggerEvent() {
              var len = triggerEventEndDic.getLength();

              while (len--) {
                var key = triggerEventEndDic.getKeyByIndex(len);
                var data = triggerEventEndDic.getDataByKey(key);
                triggerEventsPool.push(data);
                var dataBeg = triggerEventBeginDic.getDataByKey(key);

                if (dataBeg) {
                  triggerEventsPool.push(dataBeg);
                  triggerEventBeginDic.set(data.a.id, data.b.id, null);
                }

                var colliderA = data.a.collider;
                var colliderB = data.b.collider;

                if (colliderA && colliderB) {
                  var type = 'onTriggerExit';
                  TriggerEventObject.type = type;

                  if (colliderA.needTriggerEvent) {
                    TriggerEventObject.selfCollider = colliderA;
                    TriggerEventObject.otherCollider = colliderB;
                    colliderA.emit(type, TriggerEventObject);
                  }

                  if (colliderB.needTriggerEvent) {
                    TriggerEventObject.selfCollider = colliderB;
                    TriggerEventObject.otherCollider = colliderA;
                    colliderB.emit(type, TriggerEventObject);
                  }
                }
              }

              triggerEventEndDic.reset();
              len = triggerEventBeginDic.getLength();

              while (len--) {
                var _key = triggerEventBeginDic.getKeyByIndex(len);

                var _data = triggerEventBeginDic.getDataByKey(_key);

                var _colliderA = _data.a.collider;
                var _colliderB = _data.b.collider;

                if (!_colliderA || !_colliderA.isValid || !_colliderB || !_colliderB.isValid) {
                  triggerEventsPool.push(_data);
                  triggerEventBeginDic.set(_data.a.id, _data.b.id, null);
                } else {
                  var _type = _data.times++ ? 'onTriggerStay' : 'onTriggerEnter';

                  TriggerEventObject.type = _type;

                  if (_colliderA.needTriggerEvent) {
                    TriggerEventObject.selfCollider = _colliderA;
                    TriggerEventObject.otherCollider = _colliderB;

                    _colliderA.emit(_type, TriggerEventObject);
                  }

                  if (_colliderB.needTriggerEvent) {
                    TriggerEventObject.selfCollider = _colliderB;
                    TriggerEventObject.otherCollider = _colliderA;

                    _colliderB.emit(_type, TriggerEventObject);
                  }
                }
              }
            }

            var contactEventDic = new TupleDictionary();
            var contactEventsPool = [];

            function onCollision(type, wpa, wpb, c, d, o) {
              if (wpa && wpb) {
                if (wpa.collider.needCollisionEvent || wpb.collider.needCollisionEvent) {
                  if (contactEventsPool.length > 0) {
                    var cE = contactEventsPool.pop();
                    cE.type = type;
                    cE.a = wpa;
                    cE.b = wpb;
                    cE.contactCount = c;
                    cE.buffer = d;
                    cE.offset = o;
                    contactEventDic.set(wpa.id, wpb.id, cE);
                  } else {
                    var _cE = {
                      type: type,
                      a: wpa,
                      b: wpb,
                      contactCount: c,
                      buffer: d,
                      offset: o
                    };
                    contactEventDic.set(wpa.id, wpb.id, _cE);
                  }
                }
              }
            }

            var contactsPool = [];

            function emitCollisionEvent() {
              var len = contactEventDic.getLength();

              while (len--) {
                var key = contactEventDic.getKeyByIndex(len);
                var data = contactEventDic.getDataByKey(key);
                contactEventsPool.push(data);
                var colliderA = data.a.collider;
                var colliderB = data.b.collider;

                if (colliderA && colliderA.isValid && colliderB && colliderB.isValid) {
                  CollisionEventObject.type = data.type;
                  CollisionEventObject.impl = data.buffer;
                  var c = data.contactCount;
                  var d = data.buffer;
                  var o = data.offset;
                  var contacts = CollisionEventObject.contacts;
                  contactsPool.push.apply(contactsPool, contacts);
                  contacts.length = 0;

                  for (var i = 0; i < c; i++) {
                    if (contactsPool.length > 0) {
                      var _c = contactsPool.pop();

                      _c.colliderA = colliderA;
                      _c.colliderB = colliderB;
                      _c.impl = getContactData(d, i, o);
                      contacts.push(_c);
                    } else {
                      var _c2 = new PhysXContactEquation(CollisionEventObject);

                      _c2.colliderA = colliderA;
                      _c2.colliderB = colliderB;
                      _c2.impl = getContactData(d, i, o);
                      contacts.push(_c2);
                    }
                  }

                  if (colliderA.needCollisionEvent) {
                    CollisionEventObject.selfCollider = colliderA;
                    CollisionEventObject.otherCollider = colliderB;
                    colliderA.emit(CollisionEventObject.type, CollisionEventObject);
                  }

                  if (colliderB.needCollisionEvent) {
                    CollisionEventObject.selfCollider = colliderB;
                    CollisionEventObject.otherCollider = colliderA;
                    colliderB.emit(CollisionEventObject.type, CollisionEventObject);
                  }
                }
              }

              contactEventDic.reset();
            }

            var eventCallback = {
              onContactBegin: function onContactBegin(a, b, c, d, o) {
                var wpa = getWrapShape(a);
                var wpb = getWrapShape(b);
                onCollision('onCollisionEnter', wpa, wpb, c, d, o);
              },
              onContactEnd: function onContactEnd(a, b, c, d, o) {
                var wpa = getWrapShape(a);
                var wpb = getWrapShape(b);
                onCollision('onCollisionExit', wpa, wpb, c, d, o);
              },
              onContactPersist: function onContactPersist(a, b, c, d, o) {
                var wpa = getWrapShape(a);
                var wpb = getWrapShape(b);
                onCollision('onCollisionStay', wpa, wpb, c, d, o);
              },
              onTriggerBegin: function onTriggerBegin(a, b) {
                var wpa = getWrapShape(a);
                var wpb = getWrapShape(b);
                onTrigger('onTriggerEnter', wpa, wpb);
              },
              onTriggerEnd: function onTriggerEnd(a, b) {
                var wpa = getWrapShape(a);
                var wpb = getWrapShape(b);
                onTrigger('onTriggerExit', wpa, wpb);
              }
            };
            var queryCallback = {
              preFilter: function preFilter(filterData, shape, _actor, _out) {
                var shapeFlags = shape.getFlags();

                if (filterData.word3 & EFilterDataWord3.QUERY_CHECK_TRIGGER && shapeFlags & PX.ShapeFlag.eTRIGGER_SHAPE) {
                  return PX.QueryHitType.eNONE;
                }

                return filterData.word3 & EFilterDataWord3.QUERY_SINGLE_HIT ? PX.QueryHitType.eBLOCK : PX.QueryHitType.eTOUCH;
              }
            };
            var PhysXWorld = function () {
              var _proto = PhysXWorld.prototype;

              _proto.setAllowSleep = function setAllowSleep(_v) {};

              _proto.setDefaultMaterial = function setDefaultMaterial(_v) {};

              _proto.setGravity = function setGravity(gravity) {
                this.scene.setGravity(gravity);
              };

              function PhysXWorld() {
                this.physics = void 0;
                this.scene = void 0;
                this.cooking = void 0;
                this.queryfilterData = void 0;
                this.singleResult = void 0;
                this.mutipleResults = void 0;
                this.simulationCB = void 0;
                this.queryFilterCB = void 0;
                this.wrappedBodies = [];
                this.mutipleResultSize = 12;
                initializeWorld(this, eventCallback, queryCallback);
              }

              _proto.destroy = function destroy() {
                if (this.wrappedBodies.length) error('You should destroy all physics component first.');
                this.scene.release();
              };

              _proto.step = function step(deltaTime, _timeSinceLastCalled, _maxSubStep) {

                if (this.wrappedBodies.length === 0) {
                  return;
                }

                var scene = this.scene;
                simulateScene(scene, deltaTime);
                scene.fetchResults(true);

                for (var i = 0; i < this.wrappedBodies.length; i++) {
                  var body = this.wrappedBodies[i];
                  body.syncPhysicsToScene();
                }
              };

              _proto.syncSceneToPhysics = function syncSceneToPhysics() {
                for (var i = 0; i < this.wrappedBodies.length; i++) {
                  var body = this.wrappedBodies[i];
                  body.syncSceneToPhysics();
                }
              };

              _proto.syncAfterEvents = function syncAfterEvents() {
                for (var i = 0; i < this.wrappedBodies.length; i++) {
                  var body = this.wrappedBodies[i];
                  body.syncSceneWithCheck();
                }
              };

              _proto.getSharedBody = function getSharedBody(node, wrappedBody) {
                return PhysXSharedBody.getSharedBody(node, this, wrappedBody);
              };

              _proto.addActor = function addActor(body) {
                var index = this.wrappedBodies.indexOf(body);

                if (index < 0) {
                  addActorToScene(this.scene, body.impl);
                  this.wrappedBodies.push(body);
                }
              };

              _proto.removeActor = function removeActor(body) {
                var index = this.wrappedBodies.indexOf(body);

                if (index >= 0) {
                  this.scene.removeActor(body.impl, true);
                  fastRemoveAt(this.wrappedBodies, index);
                }
              };

              _proto.addConstraint = function addConstraint(_constraint) {};

              _proto.removeConstraint = function removeConstraint(_constraint) {};

              _proto.raycast = function raycast(worldRay, options, pool, results) {
                return raycastAll(this, worldRay, options, pool, results);
              };

              _proto.raycastClosest = function raycastClosest$1(worldRay, options, result) {
                return raycastClosest(this, worldRay, options, result);
              };

              _proto.emitEvents = function emitEvents() {
                emitTriggerEvent();
                emitCollisionEvent();
              };

              _createClass(PhysXWorld, [{
                key: "impl",
                get: function get() {
                  return this.scene;
                }
              }]);

              return PhysXWorld;
            }();

            var v3_0 = new Vec3();
            var PhysXRigidBody = function () {
              function PhysXRigidBody() {
                this.isSleepy = false;
                this._isEnabled = false;
              }

              var _proto = PhysXRigidBody.prototype;

              _proto.initialize = function initialize(v) {
                this._rigidBody = v;
                this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(v.node, this);
                this._sharedBody.reference = true;
              };

              _proto.onEnable = function onEnable() {
                this._isEnabled = true;
                this.setMass(this._rigidBody.mass);
                this.setType(this._rigidBody.type);
                this.setAllowSleep(this._rigidBody.allowSleep);
                this.setLinearDamping(this._rigidBody.linearDamping);
                this.setAngularDamping(this._rigidBody.angularDamping);
                this.setLinearFactor(this._rigidBody.linearFactor);
                this.setAngularFactor(this._rigidBody.angularFactor);
                this.useGravity(this._rigidBody.useGravity);
                this._sharedBody.enabled = true;
              };

              _proto.onDisable = function onDisable() {
                this._isEnabled = false;
                this._sharedBody.enabled = false;
              };

              _proto.onDestroy = function onDestroy() {
                this._sharedBody.reference = false;
                this._rigidBody = null;
                this._sharedBody = null;
              };

              _proto.setType = function setType(v) {
                this._sharedBody.setType(v);
              };

              _proto.setMass = function setMass(v) {
                if (this.isStatic) return;

                this._sharedBody.setMass(v);
              };

              _proto.setLinearDamping = function setLinearDamping(v) {
                if (this.isStatic) return;
                this.impl.setLinearDamping(v);
              };

              _proto.setAngularDamping = function setAngularDamping(v) {
                if (this.isStatic) return;
                this.impl.setAngularDamping(v);
              };

              _proto.useGravity = function useGravity(v) {
                if (this.isStatic) return;
                this.impl.setActorFlag(PX.ActorFlag.eDISABLE_GRAVITY, !v);
              };

              _proto.useCCD = function useCCD(v) {
                if (this.isStatic) return;
                this.impl.setRigidBodyFlag(PX.RigidBodyFlag.eENABLE_CCD, v);
              };

              _proto.setLinearFactor = function setLinearFactor(v) {
                if (this.isStatic) return;
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_X, !v.x);
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Y, !v.y);
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_LINEAR_Z, !v.z);
              };

              _proto.setAngularFactor = function setAngularFactor(v) {
                if (this.isStatic) return;
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_X, !v.x);
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Y, !v.y);
                this.impl.setRigidDynamicLockFlag(PX.RigidDynamicLockFlag.eLOCK_ANGULAR_Z, !v.z);
              };

              _proto.setAllowSleep = function setAllowSleep(v) {
                if (this.isStaticOrKinematic) return;
                var st = this.impl.getSleepThreshold();
                var wc = v ? Math.max(0.0, st - 0.001) : st + 0xffffffff;
                this.impl.setWakeCounter(wc);
              };

              _proto.wakeUp = function wakeUp() {
                if (this.isStatic) return;
                this.impl.wakeUp();
              };

              _proto.sleep = function sleep() {
                if (this.isStatic) return;
                this.impl.putToSleep();
              };

              _proto.clearState = function clearState() {
                if (this.isStatic) return;
                this.clearForces();
                this.clearVelocity();
              };

              _proto.clearForces = function clearForces() {
                if (this.isStatic) return;

                this._sharedBody.clearForces();
              };

              _proto.clearVelocity = function clearVelocity() {
                if (this.isStatic) return;

                this._sharedBody.clearVelocity();
              };

              _proto.setSleepThreshold = function setSleepThreshold(v) {
                if (this.isStatic) return;
                this.impl.setSleepThreshold(v);
              };

              _proto.getSleepThreshold = function getSleepThreshold() {
                if (this.isStatic) return 0;
                return this.impl.getSleepThreshold();
              };

              _proto.getLinearVelocity = function getLinearVelocity(out) {
                if (this.isStatic) return;
                Vec3.copy(out, this.impl.getLinearVelocity());
              };

              _proto.setLinearVelocity = function setLinearVelocity(value) {
                if (this.isStaticOrKinematic) return;
                this.impl.setLinearVelocity(value, true);
              };

              _proto.getAngularVelocity = function getAngularVelocity(out) {
                if (this.isStatic) return;
                Vec3.copy(out, this.impl.getAngularVelocity());
              };

              _proto.setAngularVelocity = function setAngularVelocity(value) {
                if (this.isStaticOrKinematic) return;
                this.impl.setAngularVelocity(value, true);
              };

              _proto.applyForce = function applyForce$1(force, relativePoint) {
                if (!this.isInScene || this.isStaticOrKinematic) return;

                this._sharedBody.syncSceneToPhysics();

                var rp = relativePoint || Vec3.ZERO;

                applyForce(true, this.impl, force, rp);
              };

              _proto.applyLocalForce = function applyLocalForce(force, relativePoint) {
                if (!this.isInScene || this.isStaticOrKinematic) return;

                this._sharedBody.syncSceneToPhysics();

                var rp = relativePoint || Vec3.ZERO;

                applyForce(false, this.impl, force, rp);
              };

              _proto.applyImpulse = function applyImpulse$1(force, relativePoint) {
                if (!this.isInScene || this.isStaticOrKinematic) return;

                this._sharedBody.syncSceneToPhysics();

                var rp = relativePoint || Vec3.ZERO;

                applyImpulse(true, this.impl, force, rp);
              };

              _proto.applyLocalImpulse = function applyLocalImpulse(force, relativePoint) {
                if (!this.isInScene || this.isStaticOrKinematic) return;

                this._sharedBody.syncSceneToPhysics();

                var rp = relativePoint || Vec3.ZERO;

                applyImpulse(false, this.impl, force, rp);
              };

              _proto.applyTorque = function applyTorque(torque) {
                if (!this.isInScene || this.isStaticOrKinematic) return;
                applyTorqueForce(this.impl, torque);
              };

              _proto.applyLocalTorque = function applyLocalTorque(torque) {
                if (!this.isInScene || this.isStaticOrKinematic) return;

                this._sharedBody.syncSceneToPhysics();

                Vec3.transformQuat(v3_0, torque, this._sharedBody.node.worldRotation);
                applyTorqueForce(this.impl, v3_0);
              };

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

              _createClass(PhysXRigidBody, [{
                key: "impl",
                get: function get() {
                  return this._sharedBody.impl;
                }
              }, {
                key: "isAwake",
                get: function get() {
                  return !this.isStatic && !this.impl.isSleeping();
                }
              }, {
                key: "isSleeping",
                get: function get() {
                  return this.isStatic || this.impl.isSleeping();
                }
              }, {
                key: "isEnabled",
                get: function get() {
                  return this._isEnabled;
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
              }, {
                key: "isStatic",
                get: function get() {
                  return !this.impl || this._sharedBody.isStatic;
                }
              }, {
                key: "isStaticOrKinematic",
                get: function get() {
                  return !this.impl || this._sharedBody.isStatic || this._sharedBody.isKinematic;
                }
              }, {
                key: "isInScene",
                get: function get() {
                  return this._sharedBody.isInScene;
                }
              }]);

              return PhysXRigidBody;
            }();

            var EPhysXShapeType;

            (function (EPhysXShapeType) {
              EPhysXShapeType[EPhysXShapeType["SPHERE"] = 0] = "SPHERE";
              EPhysXShapeType[EPhysXShapeType["BOX"] = 1] = "BOX";
              EPhysXShapeType[EPhysXShapeType["CAPSULE"] = 2] = "CAPSULE";
              EPhysXShapeType[EPhysXShapeType["CYLINDER"] = 3] = "CYLINDER";
              EPhysXShapeType[EPhysXShapeType["CONE"] = 4] = "CONE";
              EPhysXShapeType[EPhysXShapeType["PLANE"] = 5] = "PLANE";
              EPhysXShapeType[EPhysXShapeType["TERRAIN"] = 6] = "TERRAIN";
              EPhysXShapeType[EPhysXShapeType["MESH"] = 7] = "MESH";
            })(EPhysXShapeType || (EPhysXShapeType = {}));

            var PhysXShape = function () {
              function PhysXShape(type) {
                this.id = void 0;
                this.type = void 0;
                this._impl = null;
                this._collider = null;
                this._flags = void 0;
                this._rotation = new Quat(0, 0, 0, 1);
                this._index = -1;
                this._word3 = 0;
                this.type = type;
                this.id = PhysXShape.idCounter++;
              }

              var _proto = PhysXShape.prototype;

              _proto.initialize = function initialize(v) {
                this._collider = v;
                this._flags = getShapeFlags(v.isTrigger);
                this._sharedBody = PhysicsSystem.instance.physicsWorld.getSharedBody(v.node);
                this._sharedBody.reference = true;
                this.onComponentSet();

                if (this._impl) {
                  if (this._impl.$$) {
                    PX.IMPL_PTR[this._impl.$$.ptr] = this;
                  } else {
                    PX.IMPL_PTR[this.id] = this;
                  }
                }
              };

              _proto.setIndex = function setIndex(v) {
                this._index = v;
              };

              _proto.onComponentSet = function onComponentSet() {};

              _proto.updateScale = function updateScale() {};

              _proto.onLoad = function onLoad() {
                this.setMaterial(this._collider.sharedMaterial);
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

                if (this._impl.$$) {
                  PX.IMPL_PTR[this._impl.$$.ptr] = null;
                  delete PX.IMPL_PTR[this._impl.$$.ptr];
                } else {
                  PX.IMPL_PTR[this.id] = null;
                  delete PX.IMPL_PTR[this.id];
                }

                this._impl.release();

                this._impl = null;
              };

              _proto.setMaterial = function setMaterial(v) {
                if (v == null) v = PhysicsSystem.instance.defaultMaterial;
                var mat = this.getSharedMaterial(v);

                this._impl.setMaterials(getShapeMaterials(mat));
              };

              _proto.getSharedMaterial = function getSharedMaterial(v) {
                if (!PX.CACHE_MAT[v.id]) {
                  var physics = this._sharedBody.wrappedWorld.physics;

                  var _mat = physics.createMaterial(v.friction, v.friction, v.restitution);

                  _mat.setFrictionCombineMode(PX.CombineMode.eMULTIPLY);

                  _mat.setRestitutionCombineMode(PX.CombineMode.eMULTIPLY);

                  PX.CACHE_MAT[v.id] = _mat;
                  return _mat;
                }

                var mat = PX.CACHE_MAT[v.id];
                mat.setStaticFriction(v.friction);
                mat.setDynamicFriction(v.friction);
                mat.setRestitution(v.restitution);
                return mat;
              };

              _proto.setAsTrigger = function setAsTrigger(v) {
                if (v) {
                  this._impl.setFlag(PX.ShapeFlag.eSIMULATION_SHAPE, !v);

                  this._impl.setFlag(PX.ShapeFlag.eTRIGGER_SHAPE, v);
                } else {
                  this._impl.setFlag(PX.ShapeFlag.eTRIGGER_SHAPE, v);

                  this._impl.setFlag(PX.ShapeFlag.eSIMULATION_SHAPE, !v);
                }

                if (this._index >= 0) {
                  this._sharedBody.removeShape(this);

                  this._sharedBody.addShape(this);
                }
              };

              _proto.setCenter = function setCenter(v) {
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Vec3.multiply(pos, v, this._collider.node.worldScale);
                Quat.copy(rot, this._rotation);
                var trans = getTempTransform(pos, rot);

                this._impl.setLocalPose(trans);

                if (this._collider.enabled && !this._collider.isTrigger) {
                  this._sharedBody.updateCenterOfMass();
                }
              };

              _proto.getAABB = function getAABB(v) {
                getShapeWorldBounds(this.impl, this._sharedBody.impl, 1, v);
              };

              _proto.getBoundingSphere = function getBoundingSphere(v) {
                AABB.toBoundingSphere(v, this._collider.worldBounds);
              };

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

              _proto.updateFilterData = function updateFilterData(filterData) {
                this._word3 = EFilterDataWord3.DETECT_CONTACT_CCD;

                if (this._collider.needTriggerEvent) {
                  this._word3 |= EFilterDataWord3.DETECT_TRIGGER_EVENT;
                }

                if (this._collider.needCollisionEvent) {
                  this._word3 |= EFilterDataWord3.DETECT_CONTACT_EVENT | EFilterDataWord3.DETECT_CONTACT_POINT;
                }

                filterData.word2 = this.id;
                filterData.word3 = this._word3;

                this._impl.setQueryFilterData(filterData);

                this._impl.setSimulationFilterData(filterData);
              };

              _proto.updateEventListener = function updateEventListener() {
                if (this._sharedBody) {
                  this.updateFilterData(this._sharedBody.filterData);
                }
              };

              _createClass(PhysXShape, [{
                key: "impl",
                get: function get() {
                  return this._impl;
                }
              }, {
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }, {
                key: "attachedRigidBody",
                get: function get() {
                  return null;
                }
              }], [{
                key: "MESH_SCALE",
                get: function get() {
                  if (!this._MESH_SCALE) {
                    this._MESH_SCALE = new PX.MeshScale(Vec3.ZERO, Quat.IDENTITY);
                  }

                  return this._MESH_SCALE;
                }
              }]);

              return PhysXShape;
            }();
            PhysXShape._MESH_SCALE = void 0;
            PhysXShape.idCounter = 0;

            var PhysXSphereShape = function (_PhysXShape) {
              _inheritsLoose(PhysXSphereShape, _PhysXShape);

              function PhysXSphereShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.SPHERE) || this;

                if (!PhysXSphereShape.SPHERE_GEOMETRY) {
                  PhysXSphereShape.SPHERE_GEOMETRY = new PX.SphereGeometry(0.5);
                }

                return _this;
              }

              var _proto = PhysXSphereShape.prototype;

              _proto.setRadius = function setRadius(v) {
                this.updateScale();
              };

              _proto.onComponentSet = function onComponentSet() {
                this.updateGeometry();
                var physics = this._sharedBody.wrappedWorld.physics;
                var pxmat = this.getSharedMaterial(this.collider.sharedMaterial);
                this._impl = physics.createShape(PhysXSphereShape.SPHERE_GEOMETRY, pxmat, true, this._flags);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();

                this._impl.setGeometry(PhysXSphereShape.SPHERE_GEOMETRY);

                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var co = this.collider;
                var ws = co.node.worldScale;
                var absX = Math.abs(ws.x);
                var absY = Math.abs(ws.y);
                var absZ = Math.abs(ws.z);
                var maxSp = Math.max(Math.max(absX, absY), absZ);
                PhysXSphereShape.SPHERE_GEOMETRY.setRadius(Math.max(0.0001, co.radius * maxSp));
              };

              _createClass(PhysXSphereShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXSphereShape;
            }(PhysXShape);
            PhysXSphereShape.SPHERE_GEOMETRY = void 0;

            var PhysXBoxShape = function (_PhysXShape) {
              _inheritsLoose(PhysXBoxShape, _PhysXShape);

              function PhysXBoxShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.BOX) || this;

                if (!PhysXBoxShape.BOX_GEOMETRY) {
                  VEC3_0.set(0.5, 0.5, 0.5);
                  PhysXBoxShape.BOX_GEOMETRY = new PX.BoxGeometry(VEC3_0);
                }

                return _this;
              }

              var _proto = PhysXBoxShape.prototype;

              _proto.setSize = function setSize(v) {
                this.updateScale();
              };

              _proto.onComponentSet = function onComponentSet() {
                this.updateGeometry();
                var physics = this._sharedBody.wrappedWorld.physics;
                var pxmat = this.getSharedMaterial(this._collider.sharedMaterial);
                this._impl = physics.createShape(PhysXBoxShape.BOX_GEOMETRY, pxmat, true, this._flags);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();

                this._impl.setGeometry(PhysXBoxShape.BOX_GEOMETRY);

                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var co = this.collider;
                var ws = co.node.worldScale;
                VEC3_0.set(co.size);
                VEC3_0.multiplyScalar(0.5);
                VEC3_0.multiply(ws);
                VEC3_0.x = Math.abs(VEC3_0.x);
                VEC3_0.y = Math.abs(VEC3_0.y);
                VEC3_0.z = Math.abs(VEC3_0.z);
                PhysXBoxShape.BOX_GEOMETRY.setHalfExtents(VEC3_0);
              };

              _createClass(PhysXBoxShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXBoxShape;
            }(PhysXShape);
            PhysXBoxShape.BOX_GEOMETRY = void 0;

            var PhysXCapsuleShape = function (_PhysXShape) {
              _inheritsLoose(PhysXCapsuleShape, _PhysXShape);

              function PhysXCapsuleShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.CAPSULE) || this;

                if (!PhysXCapsuleShape.CAPSULE_GEOMETRY) {
                  PhysXCapsuleShape.CAPSULE_GEOMETRY = new PX.CapsuleGeometry(0.5, 0.5);
                }

                return _this;
              }

              var _proto = PhysXCapsuleShape.prototype;

              _proto.setCylinderHeight = function setCylinderHeight(v) {
                this.updateScale();
              };

              _proto.setDirection = function setDirection(v) {
                this.updateScale();
              };

              _proto.setRadius = function setRadius(v) {
                this.updateScale();
              };

              _proto.onComponentSet = function onComponentSet() {
                this.updateGeometry();
                var physics = this._sharedBody.wrappedWorld.physics;
                var pxmat = this.getSharedMaterial(this._collider.sharedMaterial);
                this._impl = physics.createShape(PhysXCapsuleShape.CAPSULE_GEOMETRY, pxmat, true, this._flags);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();

                this._impl.setGeometry(PhysXCapsuleShape.CAPSULE_GEOMETRY);

                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var co = this.collider;
                var ws = co.node.worldScale;
                var upAxis = co.direction;
                var r = 0.5;
                var hf = 0.5;

                if (upAxis === EAxisDirection.Y_AXIS) {
                  r = co.radius * Math.abs(absMax(ws.x, ws.z));
                  hf = co.cylinderHeight / 2 * Math.abs(ws.y);
                  Quat.fromEuler(this._rotation, 0, 0, 90);
                } else if (upAxis === EAxisDirection.X_AXIS) {
                  r = co.radius * Math.abs(absMax(ws.y, ws.z));
                  hf = co.cylinderHeight / 2 * Math.abs(ws.x);
                  Quat.fromEuler(this._rotation, 0, 0, 0);
                } else {
                  r = co.radius * Math.abs(absMax(ws.x, ws.y));
                  hf = co.cylinderHeight / 2 * Math.abs(ws.z);
                  Quat.fromEuler(this._rotation, 0, 90, 0);
                }

                PhysXCapsuleShape.CAPSULE_GEOMETRY.setRadius(Math.max(0.0001, r));
                PhysXCapsuleShape.CAPSULE_GEOMETRY.setHalfHeight(Math.max(0.0001, hf));
              };

              _createClass(PhysXCapsuleShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXCapsuleShape;
            }(PhysXShape);
            PhysXCapsuleShape.CAPSULE_GEOMETRY = void 0;

            var PhysXPlaneShape = function (_PhysXShape) {
              _inheritsLoose(PhysXPlaneShape, _PhysXShape);

              function PhysXPlaneShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.PLANE) || this;

                if (!PhysXPlaneShape.PLANE_GEOMETRY) {
                  PhysXPlaneShape.PLANE_GEOMETRY = new PX.PlaneGeometry();
                }

                return _this;
              }

              var _proto = PhysXPlaneShape.prototype;

              _proto.setNormal = function setNormal(v) {
                this.setCenter();
              };

              _proto.setConstant = function setConstant(v) {
                this.setCenter();
              };

              _proto.setCenter = function setCenter() {
                var co = this.collider;
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Vec3.scaleAndAdd(pos, co.center, co.normal, co.constant);
                Quat.rotationTo(rot, Vec3.UNIT_X, co.normal);
                var trans = getTempTransform(pos, rot);

                this._impl.setLocalPose(trans);
              };

              _proto.onComponentSet = function onComponentSet() {
                var co = this.collider;
                var physics = this._sharedBody.wrappedWorld.physics;
                var pxmat = this.getSharedMaterial(co.sharedMaterial);
                this._impl = physics.createShape(PhysXPlaneShape.PLANE_GEOMETRY, pxmat, true, this._flags);
                this.setCenter();
              };

              _proto.updateScale = function updateScale() {
                this.setCenter();
              };

              _createClass(PhysXPlaneShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXPlaneShape;
            }(PhysXShape);
            PhysXPlaneShape.PLANE_GEOMETRY = void 0;

            var PhysXTrimeshShape = function (_PhysXShape) {
              _inheritsLoose(PhysXTrimeshShape, _PhysXShape);

              function PhysXTrimeshShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.MESH) || this;
                _this.geometry = void 0;
                return _this;
              }

              var _proto = PhysXTrimeshShape.prototype;

              _proto.setMesh = function setMesh(v) {
                if (v && v.renderingSubMeshes.length > 0 && this._impl == null) {
                  var wrappedWorld = this._sharedBody.wrappedWorld;
                  var physics = wrappedWorld.physics;
                  var collider = this.collider;
                  var pxmat = this.getSharedMaterial(collider.sharedMaterial);
                  var meshScale = PhysXShape.MESH_SCALE;
                  meshScale.setScale(Vec3.ONE);
                  meshScale.setRotation(Quat.IDENTITY);

                  if (collider.convex) {
                    if (PX.MESH_CONVEX[v._uuid] == null) {
                      var cooking = wrappedWorld.cooking;
                      var posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);
                      PX.MESH_CONVEX[v._uuid] = createConvexMesh(posBuf, cooking, physics);
                    }

                    var convexMesh = PX.MESH_CONVEX[v._uuid];
                    this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
                  } else {
                    if (PX.MESH_STATIC[v._uuid] == null) {
                      var _cooking = wrappedWorld.cooking;

                      var _posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);

                      var indBuf = v.readIndices(0);
                      PX.MESH_STATIC[v._uuid] = createTriangleMesh(_posBuf, indBuf, _cooking, physics);
                    }

                    var trimesh = PX.MESH_STATIC[v._uuid];
                    this.geometry = new PX.TriangleMeshGeometry(trimesh, meshScale, createMeshGeometryFlags(0, false));
                  }

                  this.updateGeometry();
                  this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
                }
              };

              _proto.onComponentSet = function onComponentSet() {
                this.setMesh(this.collider.mesh);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();
                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var meshScale = PhysXShape.MESH_SCALE;
                meshScale.setScale(this.collider.node.worldScale);
                meshScale.setRotation(Quat.IDENTITY);
                this.geometry.setScale(meshScale);
              };

              _createClass(PhysXTrimeshShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXTrimeshShape;
            }(PhysXShape);

            var PhysXTerrainShape = function (_PhysXShape) {
              _inheritsLoose(PhysXTerrainShape, _PhysXShape);

              function PhysXTerrainShape() {
                return _PhysXShape.call(this, EPhysXShapeType.TERRAIN) || this;
              }

              var _proto = PhysXTerrainShape.prototype;

              _proto.setTerrain = function setTerrain(v) {
                if (v && this._impl == null) {
                  var wrappedWorld = this._sharedBody.wrappedWorld;
                  var physics = wrappedWorld.physics;
                  var collider = this.collider;

                  if (PX.TERRAIN_STATIC[v._uuid] == null) {
                    var cooking = wrappedWorld.cooking;
                    PX.TERRAIN_STATIC[v._uuid] = createHeightField(v, PhysXTerrainShape.heightScale, cooking, physics);
                  }

                  var hf = PX.TERRAIN_STATIC[v._uuid];
                  var pxmat = this.getSharedMaterial(collider.sharedMaterial);
                  var geometry = createHeightFieldGeometry(hf, 0, PhysXTerrainShape.heightScale, v.tileSize, v.tileSize);
                  this._impl = physics.createShape(geometry, pxmat, true, this._flags);
                }
              };

              _proto.onComponentSet = function onComponentSet() {
                this.setTerrain(this.collider.terrain);
              };

              _proto.updateScale = function updateScale() {
                this.setCenter(this._collider.center);
              };

              _proto.setCenter = function setCenter(v) {
                this._impl.setLocalPose(getTempTransform(v, this._rotation));
              };

              _createClass(PhysXTerrainShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXTerrainShape;
            }(PhysXShape);
            PhysXTerrainShape.heightScale = 1 / 5000;

            var PhysXCylinderShape = function (_PhysXShape) {
              _inheritsLoose(PhysXCylinderShape, _PhysXShape);

              function PhysXCylinderShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.CYLINDER) || this;
                _this.geometry = void 0;
                return _this;
              }

              var _proto = PhysXCylinderShape.prototype;

              _proto.setRadius = function setRadius(v) {
                this.updateGeometry();
              };

              _proto.setHeight = function setHeight(v) {
                this.updateGeometry();
              };

              _proto.setDirection = function setDirection(v) {
                this.updateGeometry();
              };

              _proto.onComponentSet = function onComponentSet() {
                var collider = this.collider;
                var physics = this._sharedBody.wrappedWorld.physics;

                if (!PhysXCylinderShape.CONVEX_MESH) {
                  var cooking = this._sharedBody.wrappedWorld.cooking;
                  var primitive = cylinder(0.5, 0.5, 2, {
                    radialSegments: 32,
                    heightSegments: 1
                  });
                  PhysXCylinderShape.CONVEX_MESH = createConvexMesh(primitive.positions, cooking, physics);
                }

                var meshScale = PhysXShape.MESH_SCALE;
                meshScale.setScale(Vec3.ONE);
                meshScale.setRotation(Quat.IDENTITY);
                var convexMesh = PhysXCylinderShape.CONVEX_MESH;
                var pxmat = this.getSharedMaterial(collider.sharedMaterial);
                this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
                this.updateGeometry();
                this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();
                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var collider = this.collider;
                var r = collider.radius;
                var h = collider.height;
                var a = collider.direction;
                var scale = _trans.translation;
                Vec3.copy(scale, collider.node.worldScale);
                scale.y *= Math.max(0.0001, h / 2);
                var xz = Math.max(0.0001, r / 0.5);
                scale.x *= xz;
                scale.z *= xz;
                var quat = _trans.rotation;

                switch (a) {
                  case EAxisDirection.X_AXIS:
                    Quat.fromEuler(quat, 0, 0, 90);
                    break;

                  case EAxisDirection.Y_AXIS:
                  default:
                    Quat.copy(quat, Quat.IDENTITY);
                    break;

                  case EAxisDirection.Z_AXIS:
                    Quat.fromEuler(quat, 90, 0, 0);
                    break;
                }

                var meshScale = PhysXShape.MESH_SCALE;
                meshScale.setScale(scale);
                meshScale.setRotation(quat);
                this.geometry.setScale(meshScale);
                Quat.copy(this._rotation, quat);
              };

              _createClass(PhysXCylinderShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXCylinderShape;
            }(PhysXShape);
            PhysXCylinderShape.CONVEX_MESH = void 0;

            var PhysXConeShape = function (_PhysXShape) {
              _inheritsLoose(PhysXConeShape, _PhysXShape);

              function PhysXConeShape() {
                var _this;

                _this = _PhysXShape.call(this, EPhysXShapeType.CONE) || this;
                _this.geometry = void 0;
                return _this;
              }

              var _proto = PhysXConeShape.prototype;

              _proto.setRadius = function setRadius(v) {
                this.updateGeometry();
              };

              _proto.setHeight = function setHeight(v) {
                this.updateGeometry();
              };

              _proto.setDirection = function setDirection(v) {
                this.updateGeometry();
              };

              _proto.onComponentSet = function onComponentSet() {
                var collider = this.collider;
                var physics = this._sharedBody.wrappedWorld.physics;

                if (!PhysXConeShape.CONVEX_MESH) {
                  var cooking = this._sharedBody.wrappedWorld.cooking;
                  var primitive = cylinder(0, 0.5, 1, {
                    radialSegments: 32,
                    heightSegments: 1
                  });
                  PhysXConeShape.CONVEX_MESH = createConvexMesh(primitive.positions, cooking, physics);
                }

                var meshScale = PhysXShape.MESH_SCALE;
                meshScale.setScale(Vec3.ONE);
                meshScale.setRotation(Quat.IDENTITY);
                var convexMesh = PhysXConeShape.CONVEX_MESH;
                var pxmat = this.getSharedMaterial(collider.sharedMaterial);
                this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
                this.updateGeometry();
                this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
              };

              _proto.updateScale = function updateScale() {
                this.updateGeometry();
                this.setCenter(this._collider.center);
              };

              _proto.updateGeometry = function updateGeometry() {
                var collider = this.collider;
                var r = collider.radius;
                var h = collider.height;
                var a = collider.direction;
                var scale = _trans.translation;
                Vec3.copy(scale, collider.node.worldScale);
                scale.y *= Math.max(0.0001, h / 1);
                var xz = Math.max(0.0001, r / 0.5);
                scale.x *= xz;
                scale.z *= xz;
                var quat = _trans.rotation;

                switch (a) {
                  case EAxisDirection.X_AXIS:
                    Quat.fromEuler(quat, 0, 0, 90);
                    break;

                  case EAxisDirection.Y_AXIS:
                  default:
                    Quat.copy(quat, Quat.IDENTITY);
                    break;

                  case EAxisDirection.Z_AXIS:
                    Quat.fromEuler(quat, 90, 0, 0);
                    break;
                }

                var meshScale = PhysXShape.MESH_SCALE;
                meshScale.setScale(scale);
                meshScale.setRotation(quat);
                this.geometry.setScale(meshScale);
                Quat.copy(this._rotation, quat);
              };

              _createClass(PhysXConeShape, [{
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }]);

              return PhysXConeShape;
            }(PhysXShape);
            PhysXConeShape.CONVEX_MESH = void 0;

            var PhysXJoint = function () {
              function PhysXJoint() {}

              var _proto = PhysXJoint.prototype;

              _proto.setConnectedBody = function setConnectedBody(v) {};

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
                }
              };

              _proto.onComponentSet = function onComponentSet() {};

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
            }();
            PhysXJoint._tempActor = void 0;

            var PhysXDistanceJoint = function (_PhysXJoint) {
              _inheritsLoose(PhysXDistanceJoint, _PhysXJoint);

              function PhysXDistanceJoint() {
                return _PhysXJoint.apply(this, arguments) || this;
              }

              var _proto = PhysXDistanceJoint.prototype;

              _proto.setPivotA = function setPivotA(v) {
                var cs = this.constraint;
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Vec3.multiply(pos, cs.node.worldScale, cs.pivotA);
                Quat.copy(rot, Quat.IDENTITY);

                this._impl.setLocalPose(0, getTempTransform(pos, rot));

                if (!cs.connectedBody) this.setPivotB(cs.pivotB);
              };

              _proto.setPivotB = function setPivotB(v) {
                var cs = this.constraint;
                var cb = cs.connectedBody;
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Vec3.copy(pos, cs.pivotB);
                Quat.copy(rot, Quat.IDENTITY);

                if (cb) {
                  Vec3.multiply(pos, cb.node.worldScale, cs.pivotB);
                } else {
                  var node = cs.node;
                  Vec3.multiply(pos, node.worldScale, cs.pivotA);
                  Vec3.add(pos, pos, node.worldPosition);
                  Vec3.add(pos, pos, cs.pivotB);
                  Quat.multiply(rot, rot, node.worldRotation);
                }

                this._impl.setLocalPose(1, getTempTransform(pos, rot));
              };

              _proto.onComponentSet = function onComponentSet() {
                this._impl = PX.createDistanceJoint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
                this.setPivotA(this.constraint.pivotA);
                this.setPivotB(this.constraint.pivotB);
              };

              _proto.updateScale0 = function updateScale0() {
                this.setPivotA(this.constraint.pivotA);
              };

              _proto.updateScale1 = function updateScale1() {
                this.setPivotB(this.constraint.pivotB);
              };

              _createClass(PhysXDistanceJoint, [{
                key: "constraint",
                get: function get() {
                  return this._com;
                }
              }]);

              return PhysXDistanceJoint;
            }(PhysXJoint);

            var PhysXRevoluteJoint = function (_PhysXJoint) {
              _inheritsLoose(PhysXRevoluteJoint, _PhysXJoint);

              function PhysXRevoluteJoint() {
                return _PhysXJoint.apply(this, arguments) || this;
              }

              var _proto = PhysXRevoluteJoint.prototype;

              _proto.setPivotA = function setPivotA(v) {
                var cs = this.constraint;
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Vec3.multiply(pos, cs.node.worldScale, cs.pivotA);
                Quat.rotationTo(rot, Vec3.UNIT_X, cs.axis);

                this._impl.setLocalPose(0, getTempTransform(pos, rot));

                if (!cs.connectedBody) this.setPivotB(cs.pivotB);
              };

              _proto.setPivotB = function setPivotB(v) {
                var cs = this.constraint;
                var cb = cs.connectedBody;
                var pos = _trans.translation;
                var rot = _trans.rotation;
                Quat.rotationTo(rot, Vec3.UNIT_X, cs.axis);

                if (cb) {
                  Vec3.multiply(pos, cb.node.worldScale, cs.pivotB);
                } else {
                  var node = cs.node;
                  Vec3.multiply(pos, node.worldScale, cs.pivotA);
                  Vec3.add(pos, pos, node.worldPosition);
                  Vec3.add(pos, pos, cs.pivotB);
                  Quat.multiply(rot, rot, node.worldRotation);
                }

                this._impl.setLocalPose(1, getTempTransform(pos, rot));
              };

              _proto.setAxis = function setAxis(v) {
                this.setPivotA(this.constraint.pivotA);
                this.setPivotB(this.constraint.pivotB);
              };

              _proto.onComponentSet = function onComponentSet() {
                this._impl = PX.createRevoluteJoint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
                this.setPivotA(this.constraint.pivotA);
                this.setPivotB(this.constraint.pivotB);
              };

              _proto.updateScale0 = function updateScale0() {
                this.setPivotA(this.constraint.pivotA);
              };

              _proto.updateScale1 = function updateScale1() {
                this.setPivotB(this.constraint.pivotB);
              };

              _createClass(PhysXRevoluteJoint, [{
                key: "constraint",
                get: function get() {
                  return this._com;
                }
              }]);

              return PhysXRevoluteJoint;
            }(PhysXJoint);

            selector.select('physx', {
              PhysicsWorld: PhysXWorld,
              RigidBody: PhysXRigidBody,
              BoxShape: PhysXBoxShape,
              SphereShape: PhysXSphereShape,
              CapsuleShape: PhysXCapsuleShape,
              TrimeshShape: PhysXTrimeshShape,
              CylinderShape: PhysXCylinderShape,
              ConeShape: PhysXConeShape,
              TerrainShape: PhysXTerrainShape,
              PlaneShape: PhysXPlaneShape,
              PointToPointConstraint: PhysXDistanceJoint,
              HingeConstraint: PhysXRevoluteJoint
            });

        }
    };
});
