System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './camera-component-51a857d1.js', './mesh-a2fd8333.js', './skeleton-900ed0b7.js', './collision-matrix-e0ba62f9.js', './terrain-asset-80384d17.js', './capsule-b8983ee3.js'], function (exports) {
    'use strict';
    var legacyCC, warn, errorID, ccclass, _inheritsLoose, _createClass, Asset, _applyDecoratedDescriptor, editable, _initializerDefineProperty, _assertThisInitialized, equals, serializable, Vec3, Enum, RecyclePool, type, displayOrder, tooltip, visible, executeInEditMode, disallowMultiple, help, menu, executionOrder, error, Component, displayName, Eventify, readOnly, AABB, Sphere, absMax, requireComponent, formerlySerializedAs, director, Director, System, game, Mesh, EColliderType, EConstraintType, PhysicsGroup, CollisionMatrix, ERigidBodyType, EAxisDirection, ESimplexType, TerrainAsset, cylinder;
    return {
        setters: [function (module) {
            legacyCC = module.l;
            warn = module.w;
            errorID = module.f;
            ccclass = module.es;
            _inheritsLoose = module.et;
            _createClass = module.eu;
            Asset = module.e1;
            _applyDecoratedDescriptor = module.ev;
            editable = module.ez;
            _initializerDefineProperty = module.eH;
            _assertThisInitialized = module.eL;
            equals = module.dd;
            serializable = module.eI;
            Vec3 = module.cY;
            Enum = module.dy;
            RecyclePool = module.R;
            type = module.ey;
            displayOrder = module.eE;
            tooltip = module.fX;
            visible = module.eB;
            executeInEditMode = module.fZ;
            disallowMultiple = module.gC;
            help = module.f$;
            menu = module.g0;
            executionOrder = module.gi;
            error = module.e;
            Component = module.eo;
            displayName = module.g8;
            Eventify = module.e0;
            readOnly = module.gQ;
            AABB = module.f9;
            Sphere = module.f8;
            absMax = module.dw;
            requireComponent = module.gD;
            formerlySerializedAs = module.gx;
        }, function (module) {
            director = module.f;
            Director = module.D;
            System = module.k;
        }, function () {}, function (module) {
            game = module.g;
        }, function () {}, function (module) {
            Mesh = module.M;
        }, function () {}, function (module) {
            EColliderType = module.b;
            EConstraintType = module.c;
            PhysicsGroup = module.P;
            CollisionMatrix = module.C;
            ERigidBodyType = module.a;
            EAxisDirection = module.E;
            ESimplexType = module.d;
        }, function (module) {
            TerrainAsset = module.T;
        }, function (module) {
            cylinder = module.c;
        }],
        execute: function () {

            exports({
                k: getWrap,
                m: maxComponent,
                n: shrinkPositions,
                s: setWrap
            });

            function select(id, wrapper) {
              legacyCC._global.CC_PHYSICS_BUILTIN = id === 'builtin';
              legacyCC._global.CC_PHYSICS_CANNON = id === 'cannon.js';
              legacyCC._global.CC_PHYSICS_AMMO = id === 'ammo.js';
              warn("[PHYSICS]: Using " + id);
              selector.id = id;
              selector.wrapper = wrapper;
              if (id != null) selector.backend[id] = wrapper;
            }

            var selector = exports('l', {
              id: '',
              select: select,
              wrapper: {},
              backend: {}
            });

            var FUNC = function FUNC() {
              return 0;
            };

            var ENTIRE_WORLD = {
              impl: null,
              setGravity: FUNC,
              setAllowSleep: FUNC,
              setDefaultMaterial: FUNC,
              step: FUNC,
              syncAfterEvents: FUNC,
              syncSceneToPhysics: FUNC,
              raycast: FUNC,
              raycastClosest: FUNC,
              emitEvents: FUNC,
              destroy: FUNC
            };
            var ECheckType;

            (function (ECheckType) {
              ECheckType[ECheckType["World"] = 0] = "World";
              ECheckType[ECheckType["RigidBody"] = 1] = "RigidBody";
              ECheckType[ECheckType["BoxCollider"] = 2] = "BoxCollider";
              ECheckType[ECheckType["SphereCollider"] = 3] = "SphereCollider";
              ECheckType[ECheckType["CapsuleCollider"] = 4] = "CapsuleCollider";
              ECheckType[ECheckType["MeshCollider"] = 5] = "MeshCollider";
              ECheckType[ECheckType["CylinderCollider"] = 6] = "CylinderCollider";
              ECheckType[ECheckType["ConeCollider"] = 7] = "ConeCollider";
              ECheckType[ECheckType["TerrainCollider"] = 8] = "TerrainCollider";
              ECheckType[ECheckType["SimplexCollider"] = 9] = "SimplexCollider";
              ECheckType[ECheckType["PlaneCollider"] = 10] = "PlaneCollider";
              ECheckType[ECheckType["PointToPointConstraint"] = 11] = "PointToPointConstraint";
              ECheckType[ECheckType["HingeConstraint"] = 12] = "HingeConstraint";
              ECheckType[ECheckType["ConeTwistConstraint"] = 13] = "ConeTwistConstraint";
            })(ECheckType || (ECheckType = {}));

            function check(obj, type) {
              if ( !legacyCC.GAME_VIEW && obj == null) {
                if (selector.id) {
                  warn(selector.id + " physics does not support " + ECheckType[type]);
                } else {
                  errorID(9600);
                }

                return true;
              }

              return false;
            }

            function createPhysicsWorld() {
              if (check(selector.wrapper.PhysicsWorld, ECheckType.World)) {
                return ENTIRE_WORLD;
              }

              return new selector.wrapper.PhysicsWorld();
            }
            var ENTIRE_RIGID_BODY = {
              impl: null,
              rigidBody: null,
              isAwake: false,
              isSleepy: false,
              isSleeping: false,
              initialize: FUNC,
              onEnable: FUNC,
              onDisable: FUNC,
              onDestroy: FUNC,
              setType: FUNC,
              setMass: FUNC,
              setLinearDamping: FUNC,
              setAngularDamping: FUNC,
              useGravity: FUNC,
              setLinearFactor: FUNC,
              setAngularFactor: FUNC,
              setAllowSleep: FUNC,
              wakeUp: FUNC,
              sleep: FUNC,
              clearState: FUNC,
              clearForces: FUNC,
              clearVelocity: FUNC,
              setSleepThreshold: FUNC,
              getSleepThreshold: FUNC,
              getLinearVelocity: FUNC,
              setLinearVelocity: FUNC,
              getAngularVelocity: FUNC,
              setAngularVelocity: FUNC,
              applyForce: FUNC,
              applyLocalForce: FUNC,
              applyImpulse: FUNC,
              applyLocalImpulse: FUNC,
              applyTorque: FUNC,
              applyLocalTorque: FUNC,
              setGroup: FUNC,
              getGroup: FUNC,
              addGroup: FUNC,
              removeGroup: FUNC,
              setMask: FUNC,
              getMask: FUNC,
              addMask: FUNC,
              removeMask: FUNC
            };
            function createRigidBody() {
              if (check(selector.wrapper.RigidBody, ECheckType.RigidBody)) {
                return ENTIRE_RIGID_BODY;
              }

              return new selector.wrapper.RigidBody();
            }
            var CREATE_COLLIDER_PROXY = {
              INITED: false
            };
            var ENTIRE_SHAPE = {
              impl: null,
              collider: null,
              attachedRigidBody: null,
              initialize: FUNC,
              onLoad: FUNC,
              onEnable: FUNC,
              onDisable: FUNC,
              onDestroy: FUNC,
              setGroup: FUNC,
              getGroup: FUNC,
              addGroup: FUNC,
              removeGroup: FUNC,
              setMask: FUNC,
              getMask: FUNC,
              addMask: FUNC,
              removeMask: FUNC,
              setMaterial: FUNC,
              setAsTrigger: FUNC,
              setCenter: FUNC,
              getAABB: FUNC,
              getBoundingSphere: FUNC,
              setSize: FUNC,
              setRadius: FUNC,
              setCylinderHeight: FUNC,
              setDirection: FUNC,
              setHeight: FUNC,
              setShapeType: FUNC,
              setVertices: FUNC,
              setMesh: FUNC,
              setTerrain: FUNC,
              setNormal: FUNC,
              setConstant: FUNC,
              updateEventListener: FUNC
            };
            function createShape(type) {
              initColliderProxy();
              return CREATE_COLLIDER_PROXY[type]();
            }

            function initColliderProxy() {
              if (CREATE_COLLIDER_PROXY.INITED) return;
              CREATE_COLLIDER_PROXY.INITED = true;

              CREATE_COLLIDER_PROXY[EColliderType.BOX] = function createBoxShape() {
                if (check(selector.wrapper.BoxShape, ECheckType.BoxCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.BoxShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.SPHERE] = function createSphereShape() {
                if (check(selector.wrapper.SphereShape, ECheckType.SphereCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.SphereShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.CAPSULE] = function createCapsuleShape() {
                if (check(selector.wrapper.CapsuleShape, ECheckType.CapsuleCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.CapsuleShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.CYLINDER] = function createCylinderShape() {
                if (check(selector.wrapper.CylinderShape, ECheckType.CylinderCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.CylinderShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.CONE] = function createConeShape() {
                if (check(selector.wrapper.ConeShape, ECheckType.ConeCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.ConeShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.MESH] = function createTrimeshShape() {
                if (check(selector.wrapper.TrimeshShape, ECheckType.MeshCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.TrimeshShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.TERRAIN] = function createTerrainShape() {
                if (check(selector.wrapper.TerrainShape, ECheckType.TerrainCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.TerrainShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.SIMPLEX] = function createSimplexShape() {
                if (check(selector.wrapper.SimplexShape, ECheckType.SimplexCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.SimplexShape();
              };

              CREATE_COLLIDER_PROXY[EColliderType.PLANE] = function createPlaneShape() {
                if (check(selector.wrapper.PlaneShape, ECheckType.PlaneCollider)) {
                  return ENTIRE_SHAPE;
                }

                return new selector.wrapper.PlaneShape();
              };
            }

            var CREATE_CONSTRAINT_PROXY = {
              INITED: false
            };
            var ENTIRE_CONSTRAINT = {
              impl: null,
              initialize: FUNC,
              onLoad: FUNC,
              onEnable: FUNC,
              onDisable: FUNC,
              onDestroy: FUNC,
              setEnableCollision: FUNC,
              setConnectedBody: FUNC,
              setPivotA: FUNC,
              setPivotB: FUNC,
              setAxis: FUNC
            };
            function createConstraint(type) {
              initConstraintProxy();
              return CREATE_CONSTRAINT_PROXY[type]();
            }

            function initConstraintProxy() {
              if (CREATE_CONSTRAINT_PROXY.INITED) return;
              CREATE_CONSTRAINT_PROXY.INITED = true;

              CREATE_CONSTRAINT_PROXY[EConstraintType.POINT_TO_POINT] = function createPointToPointConstraint() {
                if (check(selector.wrapper.PointToPointConstraint, ECheckType.PointToPointConstraint)) {
                  return ENTIRE_CONSTRAINT;
                }

                return new selector.wrapper.PointToPointConstraint();
              };

              CREATE_CONSTRAINT_PROXY[EConstraintType.HINGE] = function createHingeConstraint() {
                if (check(selector.wrapper.HingeConstraint, ECheckType.HingeConstraint)) {
                  return ENTIRE_CONSTRAINT;
                }

                return new selector.wrapper.HingeConstraint();
              };

              CREATE_CONSTRAINT_PROXY[EConstraintType.CONE_TWIST] = function createConeTwistConstraint() {
                if (check(selector.wrapper.ConeTwistConstraint, ECheckType.ConeTwistConstraint)) {
                  return ENTIRE_CONSTRAINT;
                }

                return new selector.wrapper.ConeTwistConstraint();
              };
            }

            var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;
            var PhysicsMaterial = exports('d', (_dec = ccclass('cc.PhysicsMaterial'), _dec(_class = (_class2 = (_temp = _class3 = function (_Asset) {
              _inheritsLoose(PhysicsMaterial, _Asset);

              function PhysicsMaterial() {
                var _this;

                _this = _Asset.call(this) || this;
                _this.id = void 0;

                _initializerDefineProperty(_this, "_friction", _descriptor, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_rollingFriction", _descriptor2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_spinningFriction", _descriptor3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_restitution", _descriptor4, _assertThisInitialized(_this));

                PhysicsMaterial.allMaterials.push(_assertThisInitialized(_this));
                _this.id = PhysicsMaterial._idCounter++;
                if (!_this._uuid) _this._uuid = "pm_" + _this.id;
                return _this;
              }

              var _proto = PhysicsMaterial.prototype;

              _proto.clone = function clone() {
                var c = new PhysicsMaterial();
                c._friction = this._friction;
                c._restitution = this._restitution;
                c._rollingFriction = this._rollingFriction;
                c._spinningFriction = this._spinningFriction;
                return c;
              };

              _proto.destroy = function destroy() {
                if (_Asset.prototype.destroy.call(this)) {
                  var idx = PhysicsMaterial.allMaterials.indexOf(this);

                  if (idx >= 0) {
                    PhysicsMaterial.allMaterials.splice(idx, 1);
                  }

                  return true;
                }

                return false;
              };

              _createClass(PhysicsMaterial, [{
                key: "friction",
                get: function get() {
                  return this._friction;
                },
                set: function set(value) {
                  if (!equals(this._friction, value)) {
                    this._friction = value;
                    this.emit('physics_material_update');
                  }
                }
              }, {
                key: "rollingFriction",
                get: function get() {
                  return this._rollingFriction;
                },
                set: function set(value) {
                  if (!equals(this._rollingFriction, value)) {
                    this._rollingFriction = value;
                    this.emit('physics_material_update');
                  }
                }
              }, {
                key: "spinningFriction",
                get: function get() {
                  return this._spinningFriction;
                },
                set: function set(value) {
                  if (!equals(this._spinningFriction, value)) {
                    this._spinningFriction = value;
                    this.emit('physics_material_update');
                  }
                }
              }, {
                key: "restitution",
                get: function get() {
                  return this._restitution;
                },
                set: function set(value) {
                  if (!equals(this._restitution, value)) {
                    this._restitution = value;
                    this.emit('physics_material_update');
                  }
                }
              }]);

              return PhysicsMaterial;
            }(Asset), _class3.allMaterials = [], _class3._idCounter = 0, _temp), (_applyDecoratedDescriptor(_class2.prototype, "friction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "friction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "rollingFriction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "rollingFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spinningFriction", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "spinningFriction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "restitution", [editable], Object.getOwnPropertyDescriptor(_class2.prototype, "restitution"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_friction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.6;
              }
            }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_rollingFriction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.1;
              }
            }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_spinningFriction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.1;
              }
            }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_restitution", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.0;
              }
            })), _class2)) || _class));

            var PhysicsRayResult = exports('f', function () {
              function PhysicsRayResult() {
                this._hitPoint = new Vec3();
                this._hitNormal = new Vec3();
                this._distance = 0;
                this._collider = null;
              }

              var _proto = PhysicsRayResult.prototype;

              _proto._assign = function _assign(hitPoint, distance, collider, hitNormal) {
                Vec3.copy(this._hitPoint, hitPoint);
                Vec3.copy(this._hitNormal, hitNormal);
                this._distance = distance;
                this._collider = collider;
              };

              _proto.clone = function clone() {
                var c = new PhysicsRayResult();
                Vec3.copy(c._hitPoint, this._hitPoint);
                Vec3.copy(c._hitNormal, this._hitNormal);
                c._distance = this._distance;
                c._collider = this._collider;
                return c;
              };

              _createClass(PhysicsRayResult, [{
                key: "hitPoint",
                get: function get() {
                  return this._hitPoint;
                }
              }, {
                key: "distance",
                get: function get() {
                  return this._distance;
                }
              }, {
                key: "collider",
                get: function get() {
                  return this._collider;
                }
              }, {
                key: "hitNormal",
                get: function get() {
                  return this._hitNormal;
                }
              }]);

              return PhysicsRayResult;
            }());

            legacyCC.internal.PhysicsGroup = PhysicsGroup;
            var PhysicsSystem = exports('P', function (_System) {
              _inheritsLoose(PhysicsSystem, _System);

              function PhysicsSystem() {
                var _this;

                _this = _System.call(this) || this;
                _this.physicsWorld = void 0;
                _this.raycastClosestResult = new PhysicsRayResult();
                _this.raycastResults = [];
                _this.collisionMatrix = new CollisionMatrix(1);
                _this.useNodeChains = void 0;
                _this._enable = true;
                _this._allowSleep = true;
                _this._maxSubSteps = 1;
                _this._subStepCount = 0;
                _this._fixedTimeStep = 1.0 / 60.0;
                _this._autoSimulation = true;
                _this._accumulator = 0;
                _this._sleepThreshold = 0.1;
                _this._gravity = new Vec3(0, -10, 0);
                _this._material = new PhysicsMaterial();
                _this.raycastOptions = {
                  group: -1,
                  mask: -1,
                  queryTrigger: true,
                  maxDistance: 10000000
                };
                _this.raycastResultPool = new RecyclePool(function () {
                  return new PhysicsRayResult();
                }, 1);
                var config = game.config ? game.config.physics : null;

                if (config && config.physicsEngine) {
                  Vec3.copy(_this._gravity, config.gravity);
                  _this._allowSleep = config.allowSleep;
                  _this._fixedTimeStep = config.fixedTimeStep;
                  _this._maxSubSteps = config.maxSubSteps;
                  _this._sleepThreshold = config.sleepThreshold;
                  _this.autoSimulation = config.autoSimulation;
                  _this.useNodeChains = config.useNodeChains;

                  if (config.defaultMaterial) {
                    _this._material.friction = config.defaultMaterial.friction;
                    _this._material.rollingFriction = config.defaultMaterial.rollingFriction;
                    _this._material.spinningFriction = config.defaultMaterial.spinningFriction;
                    _this._material.restitution = config.defaultMaterial.restitution;
                  }

                  if (config.collisionMatrix) {
                    for (var i in config.collisionMatrix) {
                      var key = 1 << parseInt(i);
                      _this.collisionMatrix["" + key] = config.collisionMatrix[i];
                    }
                  }
                } else {
                  _this.useNodeChains = false;
                }

                _this._material.on('physics_material_update', _this._updateMaterial, _assertThisInitialized(_this));

                _this.physicsWorld = createPhysicsWorld();

                _this.physicsWorld.setGravity(_this._gravity);

                _this.physicsWorld.setAllowSleep(_this._allowSleep);

                _this.physicsWorld.setDefaultMaterial(_this._material);

                return _this;
              }

              var _proto = PhysicsSystem.prototype;

              _proto.postUpdate = function postUpdate(deltaTime) {

                if (!this._enable) {
                  this.physicsWorld.syncSceneToPhysics();
                  return;
                }

                if (this._autoSimulation) {
                  this._subStepCount = 0;
                  this._accumulator += deltaTime;
                  director.emit(Director.EVENT_BEFORE_PHYSICS);

                  while (this._subStepCount < this._maxSubSteps) {
                    if (this._accumulator > this._fixedTimeStep) {
                      this.physicsWorld.syncSceneToPhysics();
                      this.physicsWorld.step(this._fixedTimeStep);
                      this._accumulator -= this._fixedTimeStep;
                      this._subStepCount++;
                      this.physicsWorld.emitEvents();
                      this.physicsWorld.syncAfterEvents();
                    } else {
                      this.physicsWorld.syncSceneToPhysics();
                      break;
                    }
                  }

                  director.emit(Director.EVENT_AFTER_PHYSICS);
                }
              };

              _proto.resetAccumulator = function resetAccumulator(time) {
                if (time === void 0) {
                  time = 0;
                }

                this._accumulator = time;
              };

              _proto.step = function step(fixedTimeStep, deltaTime, maxSubSteps) {
                this.physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
              };

              _proto.syncSceneToPhysics = function syncSceneToPhysics() {
                this.physicsWorld.syncSceneToPhysics();
              };

              _proto.emitEvents = function emitEvents() {
                this.physicsWorld.emitEvents();
              };

              _proto.raycast = function raycast(worldRay, mask, maxDistance, queryTrigger) {
                if (mask === void 0) {
                  mask = 0xffffffff;
                }

                if (maxDistance === void 0) {
                  maxDistance = 10000000;
                }

                if (queryTrigger === void 0) {
                  queryTrigger = true;
                }

                this.raycastResultPool.reset();
                this.raycastResults.length = 0;
                this.raycastOptions.mask = mask >>> 0;
                this.raycastOptions.maxDistance = maxDistance;
                this.raycastOptions.queryTrigger = queryTrigger;
                return this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
              };

              _proto.raycastClosest = function raycastClosest(worldRay, mask, maxDistance, queryTrigger) {
                if (mask === void 0) {
                  mask = 0xffffffff;
                }

                if (maxDistance === void 0) {
                  maxDistance = 10000000;
                }

                if (queryTrigger === void 0) {
                  queryTrigger = true;
                }

                this.raycastOptions.mask = mask >>> 0;
                this.raycastOptions.maxDistance = maxDistance;
                this.raycastOptions.queryTrigger = queryTrigger;
                return this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
              };

              _proto._updateMaterial = function _updateMaterial() {
                this.physicsWorld.setDefaultMaterial(this._material);
              };

              _createClass(PhysicsSystem, [{
                key: "enable",
                get: function get() {
                  return this._enable;
                },
                set: function set(value) {
                  this._enable = value;
                }
              }, {
                key: "allowSleep",
                get: function get() {
                  return this._allowSleep;
                },
                set: function set(v) {
                  this._allowSleep = v;

                  {
                    this.physicsWorld.setAllowSleep(v);
                  }
                }
              }, {
                key: "maxSubSteps",
                get: function get() {
                  return this._maxSubSteps;
                },
                set: function set(value) {
                  this._maxSubSteps = value;
                }
              }, {
                key: "fixedTimeStep",
                get: function get() {
                  return this._fixedTimeStep;
                },
                set: function set(value) {
                  this._fixedTimeStep = value;
                }
              }, {
                key: "gravity",
                get: function get() {
                  return this._gravity;
                },
                set: function set(gravity) {
                  this._gravity.set(gravity);

                  {
                    this.physicsWorld.setGravity(gravity);
                  }
                }
              }, {
                key: "sleepThreshold",
                get: function get() {
                  return this._sleepThreshold;
                },
                set: function set(v) {
                  this._sleepThreshold = v;
                }
              }, {
                key: "autoSimulation",
                get: function get() {
                  return this._autoSimulation;
                },
                set: function set(value) {
                  this._autoSimulation = value;
                }
              }, {
                key: "defaultMaterial",
                get: function get() {
                  return this._material;
                }
              }], [{
                key: "PHYSICS_NONE",
                get: function get() {
                  return !selector.id;
                }
              }, {
                key: "PHYSICS_BUILTIN",
                get: function get() {
                  return selector.id === 'builtin';
                }
              }, {
                key: "PHYSICS_CANNON",
                get: function get() {
                  return selector.id === 'cannon.js';
                }
              }, {
                key: "PHYSICS_AMMO",
                get: function get() {
                  return selector.id === 'ammo.js';
                }
              }, {
                key: "PHYSICS_PHYSX",
                get: function get() {
                  return selector.id === 'physx';
                }
              }, {
                key: "PhysicsGroup",
                get: function get() {
                  return PhysicsGroup;
                }
              }, {
                key: "instance",
                get: function get() {
                  return PhysicsSystem._instance;
                }
              }]);

              return PhysicsSystem;
            }(System));
            PhysicsSystem.ID = 'PHYSICS';
            PhysicsSystem._instance = void 0;
            director.once(Director.EVENT_INIT, function () {
              initPhysicsSystem();
            });

            function initPhysicsSystem() {
              {
                var physics = game.config.physics;

                if (physics) {
                  var cg = physics.collisionGroups;

                  if (cg instanceof Array) {
                    cg.forEach(function (v) {
                      PhysicsGroup[v.name] = 1 << v.index;
                    });
                    Enum.update(PhysicsGroup);
                  }
                }

                var oldIns = PhysicsSystem.instance;

                if (oldIns) {
                  director.unregisterSystem(oldIns);
                  oldIns.physicsWorld.destroy();
                }

                var sys = new legacyCC.PhysicsSystem();
                legacyCC.PhysicsSystem._instance = sys;
                director.registerSystem(PhysicsSystem.ID, sys, 0);
              }
            }

            var _dec$1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class$1, _class2$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _class3$1, _temp$1;
            var RigidBody = exports('R', (_dec$1 = ccclass('cc.RigidBody'), _dec2 = help('i18n:cc.RigidBody'), _dec3 = menu('Physics/RigidBody'), _dec4 = executionOrder(-1), _dec5 = type(PhysicsSystem.PhysicsGroup), _dec6 = displayOrder(-2), _dec7 = tooltip('i18n:physics3d.rigidbody.group'), _dec8 = type(ERigidBodyType), _dec9 = displayOrder(-1), _dec10 = tooltip('i18n:physics3d.rigidbody.type'), _dec11 = visible(function () {
              return this.isDynamic;
            }), _dec12 = displayOrder(0), _dec13 = tooltip('i18n:physics3d.rigidbody.mass'), _dec14 = visible(function () {
              return this.isDynamic;
            }), _dec15 = displayOrder(0.5), _dec16 = tooltip('i18n:physics3d.rigidbody.allowSleep'), _dec17 = visible(function () {
              return this.isDynamic;
            }), _dec18 = displayOrder(1), _dec19 = tooltip('i18n:physics3d.rigidbody.linearDamping'), _dec20 = visible(function () {
              return this.isDynamic;
            }), _dec21 = displayOrder(2), _dec22 = tooltip('i18n:physics3d.rigidbody.angularDamping'), _dec23 = visible(function () {
              return this.isDynamic;
            }), _dec24 = displayOrder(4), _dec25 = tooltip('i18n:physics3d.rigidbody.useGravity'), _dec26 = visible(function () {
              return this.isDynamic;
            }), _dec27 = displayOrder(6), _dec28 = tooltip('i18n:physics3d.rigidbody.linearFactor'), _dec29 = visible(function () {
              return this.isDynamic;
            }), _dec30 = displayOrder(7), _dec31 = tooltip('i18n:physics3d.rigidbody.angularFactor'), _dec$1(_class$1 = _dec2(_class$1 = _dec3(_class$1 = executeInEditMode(_class$1 = disallowMultiple(_class$1 = _dec4(_class$1 = (_class2$1 = (_temp$1 = _class3$1 = function (_Component) {
              _inheritsLoose(RigidBody, _Component);

              function RigidBody() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Component.call.apply(_Component, [this].concat(args)) || this;
                _this._body = null;

                _initializerDefineProperty(_this, "_group", _descriptor$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_type", _descriptor2$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_mass", _descriptor3$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_allowSleep", _descriptor4$1, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_linearDamping", _descriptor5, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_angularDamping", _descriptor6, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_useGravity", _descriptor7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_linearFactor", _descriptor8, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_angularFactor", _descriptor9, _assertThisInitialized(_this));

                return _this;
              }

              var _proto = RigidBody.prototype;

              _proto.onLoad = function onLoad() {
                {
                  this._body = createRigidBody();

                  this._body.initialize(this);
                }
              };

              _proto.onEnable = function onEnable() {
                if (this._body) {
                  this._body.onEnable();
                }
              };

              _proto.onDisable = function onDisable() {
                if (this._body) {
                  this._body.onDisable();
                }
              };

              _proto.onDestroy = function onDestroy() {
                if (this._body) {
                  this._body.onDestroy();
                }
              };

              _proto.applyForce = function applyForce(force, relativePoint) {
                if (this._assertOnLoadCalled) {
                  this._body.applyForce(force, relativePoint);
                }
              };

              _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
                if (this._assertOnLoadCalled) {
                  this._body.applyLocalForce(force, localPoint);
                }
              };

              _proto.applyImpulse = function applyImpulse(impulse, relativePoint) {
                if (this._assertOnLoadCalled) {
                  this._body.applyImpulse(impulse, relativePoint);
                }
              };

              _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
                if (this._assertOnLoadCalled) {
                  this._body.applyLocalImpulse(impulse, localPoint);
                }
              };

              _proto.applyTorque = function applyTorque(torque) {
                if (this._assertOnLoadCalled) {
                  this._body.applyTorque(torque);
                }
              };

              _proto.applyLocalTorque = function applyLocalTorque(torque) {
                if (this._assertOnLoadCalled) {
                  this._body.applyLocalTorque(torque);
                }
              };

              _proto.wakeUp = function wakeUp() {
                if (this._assertOnLoadCalled) {
                  this._body.wakeUp();
                }
              };

              _proto.sleep = function sleep() {
                if (this._assertOnLoadCalled) {
                  this._body.sleep();
                }
              };

              _proto.clearState = function clearState() {
                if (this._assertOnLoadCalled) {
                  this._body.clearState();
                }
              };

              _proto.clearForces = function clearForces() {
                if (this._assertOnLoadCalled) {
                  this._body.clearForces();
                }
              };

              _proto.clearVelocity = function clearVelocity() {
                if (this._assertOnLoadCalled) {
                  this._body.clearVelocity();
                }
              };

              _proto.getLinearVelocity = function getLinearVelocity(out) {
                if (this._assertOnLoadCalled) {
                  this._body.getLinearVelocity(out);
                }
              };

              _proto.setLinearVelocity = function setLinearVelocity(value) {
                if (this._assertOnLoadCalled) {
                  this._body.setLinearVelocity(value);
                }
              };

              _proto.getAngularVelocity = function getAngularVelocity(out) {
                if (this._assertOnLoadCalled) {
                  this._body.getAngularVelocity(out);
                }
              };

              _proto.setAngularVelocity = function setAngularVelocity(value) {
                if (this._assertOnLoadCalled) {
                  this._body.setAngularVelocity(value);
                }
              };

              _proto.getGroup = function getGroup() {
                if (this._assertOnLoadCalled) {
                  return this._body.getGroup();
                }

                return 0;
              };

              _proto.setGroup = function setGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._body.setGroup(v);
                }
              };

              _proto.addGroup = function addGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._body.addGroup(v);
                }
              };

              _proto.removeGroup = function removeGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._body.removeGroup(v);
                }
              };

              _proto.getMask = function getMask() {
                if (this._assertOnLoadCalled) {
                  return this._body.getMask();
                }

                return 0;
              };

              _proto.setMask = function setMask(v) {
                if (this._assertOnLoadCalled) {
                  this._body.setMask(v);
                }
              };

              _proto.addMask = function addMask(v) {
                if (this._assertOnLoadCalled) {
                  this._body.addMask(v);
                }
              };

              _proto.removeMask = function removeMask(v) {
                if (this._assertOnLoadCalled) {
                  this._body.removeMask(v);
                }
              };

              _createClass(RigidBody, [{
                key: "group",
                get: function get() {
                  {
                    return this.getGroup();
                  }
                },
                set: function set(v) {
                  if ( !Number.isInteger(Math.log2(v >>> 0))) warn('[Physics]: The group should only have one bit.');
                  this._group = v;
                  if ( this.getGroup() === v) return;

                  if (this._body) {
                    this._body.setGroup(v);
                  }
                }
              }, {
                key: "type",
                get: function get() {
                  return this._type;
                },
                set: function set(v) {
                  if (this._type === v) return;
                  this._type = v;

                  if (this._body) {
                    this._body.setType(v);
                  }
                }
              }, {
                key: "mass",
                get: function get() {
                  return this._mass;
                },
                set: function set(value) {
                  if (this._mass === value) return;
                  value = value <= 0 ? 0.0001 : value;
                  this._mass = value;

                  if (this._body) {
                    this._body.setMass(value);
                  }
                }
              }, {
                key: "allowSleep",
                get: function get() {
                  return this._allowSleep;
                },
                set: function set(v) {
                  this._allowSleep = v;

                  if (this._body) {
                    this._body.setAllowSleep(v);
                  }
                }
              }, {
                key: "linearDamping",
                get: function get() {
                  return this._linearDamping;
                },
                set: function set(value) {
                  this._linearDamping = value;

                  if (this._body) {
                    this._body.setLinearDamping(value);
                  }
                }
              }, {
                key: "angularDamping",
                get: function get() {
                  return this._angularDamping;
                },
                set: function set(value) {
                  this._angularDamping = value;

                  if (this._body) {
                    this._body.setAngularDamping(value);
                  }
                }
              }, {
                key: "useGravity",
                get: function get() {
                  return this._useGravity;
                },
                set: function set(value) {
                  this._useGravity = value;

                  if (this._body) {
                    this._body.useGravity(value);
                  }
                }
              }, {
                key: "linearFactor",
                get: function get() {
                  return this._linearFactor;
                },
                set: function set(value) {
                  Vec3.copy(this._linearFactor, value);

                  if (this._body) {
                    this._body.setLinearFactor(this._linearFactor);
                  }
                }
              }, {
                key: "angularFactor",
                get: function get() {
                  return this._angularFactor;
                },
                set: function set(value) {
                  Vec3.copy(this._angularFactor, value);

                  if (this._body) {
                    this._body.setAngularFactor(this._angularFactor);
                  }
                }
              }, {
                key: "sleepThreshold",
                get: function get() {
                  if (this._assertOnLoadCalled) {
                    return this._body.getSleepThreshold();
                  }

                  return 0;
                },
                set: function set(v) {
                  if (this._assertOnLoadCalled) {
                    this._body.setSleepThreshold(v);
                  }
                }
              }, {
                key: "isAwake",
                get: function get() {
                  if (this._assertOnLoadCalled) {
                    return this._body.isAwake;
                  }

                  return false;
                }
              }, {
                key: "isSleepy",
                get: function get() {
                  if (this._assertOnLoadCalled) {
                    return this._body.isSleepy;
                  }

                  return false;
                }
              }, {
                key: "isSleeping",
                get: function get() {
                  if (this._assertOnLoadCalled) {
                    return this._body.isSleeping;
                  }

                  return false;
                }
              }, {
                key: "isStatic",
                get: function get() {
                  return this._type === ERigidBodyType.STATIC;
                },
                set: function set(v) {
                  if (v && this.isStatic || !v && !this.isStatic) return;
                  this.type = v ? ERigidBodyType.STATIC : ERigidBodyType.DYNAMIC;
                }
              }, {
                key: "isDynamic",
                get: function get() {
                  return this._type === ERigidBodyType.DYNAMIC;
                },
                set: function set(v) {
                  if (v && this.isDynamic || !v && !this.isDynamic) return;
                  this.type = v ? ERigidBodyType.DYNAMIC : ERigidBodyType.KINEMATIC;
                }
              }, {
                key: "isKinematic",
                get: function get() {
                  return this._type === ERigidBodyType.KINEMATIC;
                },
                set: function set(v) {
                  if (v && this.isKinematic || !v && !this.isKinematic) return;
                  this.type = v ? ERigidBodyType.KINEMATIC : ERigidBodyType.DYNAMIC;
                }
              }, {
                key: "body",
                get: function get() {
                  return this._body;
                }
              }, {
                key: "_assertOnLoadCalled",
                get: function get() {
                  var r = this._isOnLoadCalled === 0;

                  if (r) {
                    error('[Physics]: Please make sure that the node has been added to the scene');
                  }

                  return !r;
                }
              }]);

              return RigidBody;
            }(Component), _class3$1.Type = ERigidBodyType, _temp$1), (_applyDecoratedDescriptor(_class2$1.prototype, "group", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2$1.prototype, "group"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "type", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2$1.prototype, "type"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "mass", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2$1.prototype, "mass"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "allowSleep", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2$1.prototype, "allowSleep"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "linearDamping", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2$1.prototype, "linearDamping"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "angularDamping", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2$1.prototype, "angularDamping"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "useGravity", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2$1.prototype, "useGravity"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "linearFactor", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2$1.prototype, "linearFactor"), _class2$1.prototype), _applyDecoratedDescriptor(_class2$1.prototype, "angularFactor", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2$1.prototype, "angularFactor"), _class2$1.prototype), _descriptor$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_group", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return PhysicsSystem.PhysicsGroup.DEFAULT;
              }
            }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_type", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ERigidBodyType.DYNAMIC;
              }
            }), _descriptor3$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_mass", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor4$1 = _applyDecoratedDescriptor(_class2$1.prototype, "_allowSleep", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor5 = _applyDecoratedDescriptor(_class2$1.prototype, "_linearDamping", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.1;
              }
            }), _descriptor6 = _applyDecoratedDescriptor(_class2$1.prototype, "_angularDamping", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.1;
              }
            }), _descriptor7 = _applyDecoratedDescriptor(_class2$1.prototype, "_useGravity", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor8 = _applyDecoratedDescriptor(_class2$1.prototype, "_linearFactor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3(1, 1, 1);
              }
            }), _descriptor9 = _applyDecoratedDescriptor(_class2$1.prototype, "_angularFactor", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3(1, 1, 1);
              }
            })), _class2$1)) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1) || _class$1));

            (function (_RigidBody) {})(RigidBody || (RigidBody = exports('R', {})));

            var _dec$2, _dec2$1, _dec3$1, _dec4$1, _dec5$1, _dec6$1, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _dec12$1, _dec13$1, _dec14$1, _dec15$1, _class$2, _class2$2, _descriptor$2, _descriptor2$2, _descriptor3$2, _class3$2, _temp$2;
            var Collider = exports('C', (_dec$2 = ccclass('cc.Collider'), _dec2$1 = type(RigidBody), _dec3$1 = displayName('Attached'), _dec4$1 = displayOrder(-2), _dec5$1 = tooltip('i18n:physics3d.collider.attached'), _dec6$1 = type(PhysicsMaterial), _dec7$1 = displayName('Material'), _dec8$1 = displayOrder(-1), _dec9$1 = tooltip('i18n:physics3d.collider.sharedMaterial'), _dec10$1 = displayOrder(0), _dec11$1 = tooltip('i18n:physics3d.collider.isTrigger'), _dec12$1 = type(Vec3), _dec13$1 = displayOrder(1), _dec14$1 = tooltip('i18n:physics3d.collider.center'), _dec15$1 = type(PhysicsMaterial), _dec$2(_class$2 = (_class2$2 = (_temp$2 = _class3$2 = function (_Eventify) {
              _inheritsLoose(Collider, _Eventify);

              function Collider(type) {
                var _this;

                _this = _Eventify.call(this) || this;
                _this.type = void 0;
                _this._shape = null;
                _this._aabb = null;
                _this._boundingSphere = null;
                _this._isSharedMaterial = true;
                _this._needTriggerEvent = false;
                _this._needCollisionEvent = false;

                _initializerDefineProperty(_this, "_material", _descriptor$2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_isTrigger", _descriptor2$2, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_center", _descriptor3$2, _assertThisInitialized(_this));

                _this.type = type;
                return _this;
              }

              var _proto = Collider.prototype;

              _proto.on = function on(type, callback, target, once) {
                var ret = _Eventify.prototype.on.call(this, type, callback, target, once);

                this._updateNeedEvent(type);

                return ret;
              };

              _proto.off = function off(type, callback, target) {
                _Eventify.prototype.off.call(this, type, callback, target);

                this._updateNeedEvent();
              };

              _proto.once = function once(type, callback, target) {
                var ret = _Eventify.prototype.once.call(this, type, callback, target);

                this._updateNeedEvent(type);

                return ret;
              };

              _proto.removeAll = function removeAll(typeOrTarget) {
                _Eventify.prototype.removeAll.call(this, typeOrTarget);

                this._updateNeedEvent();
              };

              _proto.getGroup = function getGroup() {
                if (this._assertOnLoadCalled) {
                  return this._shape.getGroup();
                }

                return 0;
              };

              _proto.setGroup = function setGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.setGroup(v);
                }
              };

              _proto.addGroup = function addGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.addGroup(v);
                }
              };

              _proto.removeGroup = function removeGroup(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.removeGroup(v);
                }
              };

              _proto.getMask = function getMask() {
                if (this._assertOnLoadCalled) {
                  return this._shape.getMask();
                }

                return 0;
              };

              _proto.setMask = function setMask(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.setMask(v);
                }
              };

              _proto.addMask = function addMask(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.addMask(v);
                }
              };

              _proto.removeMask = function removeMask(v) {
                if (this._assertOnLoadCalled) {
                  this._shape.removeMask(v);
                }
              };

              _proto.onLoad = function onLoad() {
                {
                  this.sharedMaterial = this._material == null ? PhysicsSystem.instance.defaultMaterial : this._material;
                  this._shape = createShape(this.type);

                  this._shape.initialize(this);

                  this._shape.onLoad();
                }
              };

              _proto.onEnable = function onEnable() {
                if (this._shape) {
                  this._shape.onEnable();
                }
              };

              _proto.onDisable = function onDisable() {
                if (this._shape) {
                  this._shape.onDisable();
                }
              };

              _proto.onDestroy = function onDestroy() {
                if (this._shape) {
                  if (this._material) {
                    this._material.off('physics_material_update', this._updateMaterial, this);
                  }

                  this._shape.onDestroy();
                }

                if (this._boundingSphere) this._boundingSphere.destroy();
              };

              _proto._updateMaterial = function _updateMaterial() {
                if (this._shape) {
                  this._shape.setMaterial(this._material);
                }
              };

              _proto._updateNeedEvent = function _updateNeedEvent(type) {
                if (this.isValid) {
                  if (type !== undefined) {
                    if (type === 'onCollisionEnter' || type === 'onCollisionStay' || type === 'onCollisionExit') {
                      this._needCollisionEvent = true;
                    }

                    if (type === 'onTriggerEnter' || type === 'onTriggerStay' || type === 'onTriggerExit') {
                      this._needTriggerEvent = true;
                    }
                  } else {
                    if (!(this.hasEventListener('onTriggerEnter') || this.hasEventListener('onTriggerStay') || this.hasEventListener('onTriggerExit'))) {
                      this._needTriggerEvent = false;
                    }

                    if (!(this.hasEventListener('onCollisionEnter') || this.hasEventListener('onCollisionStay') || this.hasEventListener('onCollisionExit'))) {
                      this._needCollisionEvent = false;
                    }
                  }

                  if (this._shape) this._shape.updateEventListener();
                }
              };

              _createClass(Collider, [{
                key: "attachedRigidBody",
                get: function get() {
                  return findAttachedBody(this.node);
                }
              }, {
                key: "sharedMaterial",
                get: function get() {
                  return this._material;
                },
                set: function set(value) {
                  {
                    this.material = value;
                  }
                }
              }, {
                key: "material",
                get: function get() {
                  if (this._isSharedMaterial && this._material != null) {
                    this._material.off('physics_material_update', this._updateMaterial, this);

                    this._material = this._material.clone();

                    this._material.on('physics_material_update', this._updateMaterial, this);

                    this._isSharedMaterial = false;
                  }

                  return this._material;
                },
                set: function set(value) {
                  if (this._shape) {
                    if (value != null && this._material != null) {
                      if (this._material.id !== value.id) {
                        this._material.off('physics_material_update', this._updateMaterial, this);

                        value.on('physics_material_update', this._updateMaterial, this);
                        this._isSharedMaterial = false;
                        this._material = value;
                      }
                    } else if (value != null && this._material == null) {
                      value.on('physics_material_update', this._updateMaterial, this);
                      this._material = value;
                    } else if (value == null && this._material != null) {
                      this._material.off('physics_material_update', this._updateMaterial, this);

                      this._material = value;
                    }

                    this._updateMaterial();
                  } else {
                    this._material = value;
                  }
                }
              }, {
                key: "isTrigger",
                get: function get() {
                  return this._isTrigger;
                },
                set: function set(value) {
                  this._isTrigger = value;

                  if (this._shape) {
                    this._shape.setAsTrigger(this._isTrigger);
                  }
                }
              }, {
                key: "center",
                get: function get() {
                  return this._center;
                },
                set: function set(value) {
                  Vec3.copy(this._center, value);

                  if (this._shape) {
                    this._shape.setCenter(this._center);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }, {
                key: "worldBounds",
                get: function get() {
                  if (this._aabb == null) this._aabb = new AABB();
                  if (this._shape) this._shape.getAABB(this._aabb);
                  return this._aabb;
                }
              }, {
                key: "boundingSphere",
                get: function get() {
                  if (this._boundingSphere == null) this._boundingSphere = new Sphere();
                  if (this._shape) this._shape.getBoundingSphere(this._boundingSphere);
                  return this._boundingSphere;
                }
              }, {
                key: "needTriggerEvent",
                get: function get() {
                  return this._needTriggerEvent;
                }
              }, {
                key: "needCollisionEvent",
                get: function get() {
                  return this._needCollisionEvent;
                }
              }, {
                key: "_assertOnLoadCalled",
                get: function get() {
                  var r = this._isOnLoadCalled === 0;

                  if (r) {
                    error('[Physics]: Please make sure that the node has been added to the scene');
                  }

                  return !r;
                }
              }]);

              return Collider;
            }(Eventify(Component)), _class3$2.Type = EColliderType, _class3$2.Axis = EAxisDirection, _temp$2), (_applyDecoratedDescriptor(_class2$2.prototype, "attachedRigidBody", [_dec2$1, readOnly, _dec3$1, _dec4$1, _dec5$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "attachedRigidBody"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "sharedMaterial", [_dec6$1, _dec7$1, _dec8$1, _dec9$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "sharedMaterial"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "isTrigger", [_dec10$1, _dec11$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "isTrigger"), _class2$2.prototype), _applyDecoratedDescriptor(_class2$2.prototype, "center", [_dec12$1, _dec13$1, _dec14$1], Object.getOwnPropertyDescriptor(_class2$2.prototype, "center"), _class2$2.prototype), _descriptor$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_material", [_dec15$1], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor2$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_isTrigger", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            }), _descriptor3$2 = _applyDecoratedDescriptor(_class2$2.prototype, "_center", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            })), _class2$2)) || _class$2));

            (function (_Collider) {})(Collider || (Collider = exports('C', {})));

            function findAttachedBody(node) {
              var rb = node.getComponent(RigidBody);

              if (rb && rb.isValid) {
                return rb;
              }

              return null;
            }

            var _dec$3, _dec2$2, _dec3$2, _dec4$2, _dec5$2, _class$3, _class2$3, _descriptor$3, _temp$3;
            var BoxCollider = exports('B', (_dec$3 = ccclass('cc.BoxCollider'), _dec2$2 = help('i18n:cc.BoxCollider'), _dec3$2 = menu('Physics/BoxCollider'), _dec4$2 = type(Vec3), _dec5$2 = tooltip('i18n:physics3d.collider.box_size'), _dec$3(_class$3 = _dec2$2(_class$3 = _dec3$2(_class$3 = executeInEditMode(_class$3 = (_class2$3 = (_temp$3 = function (_Collider) {
              _inheritsLoose(BoxCollider, _Collider);

              function BoxCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.BOX) || this;

                _initializerDefineProperty(_this, "_size", _descriptor$3, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(BoxCollider, [{
                key: "size",
                get: function get() {
                  return this._size;
                },
                set: function set(value) {
                  Vec3.copy(this._size, value);

                  if (this._shape) {
                    this.shape.setSize(this._size);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return BoxCollider;
            }(Collider), _temp$3), (_applyDecoratedDescriptor(_class2$3.prototype, "size", [_dec4$2, _dec5$2], Object.getOwnPropertyDescriptor(_class2$3.prototype, "size"), _class2$3.prototype), _descriptor$3 = _applyDecoratedDescriptor(_class2$3.prototype, "_size", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3(1, 1, 1);
              }
            })), _class2$3)) || _class$3) || _class$3) || _class$3) || _class$3));

            var _dec$4, _dec2$3, _dec3$3, _dec4$3, _class$4, _class2$4, _descriptor$4, _temp$4;
            var SphereCollider = exports('S', (_dec$4 = ccclass('cc.SphereCollider'), _dec2$3 = help('i18n:cc.SphereCollider'), _dec3$3 = menu('Physics/SphereCollider'), _dec4$3 = tooltip('i18n:physics3d.collider.sphere_radius'), _dec$4(_class$4 = _dec2$3(_class$4 = _dec3$3(_class$4 = executeInEditMode(_class$4 = (_class2$4 = (_temp$4 = function (_Collider) {
              _inheritsLoose(SphereCollider, _Collider);

              function SphereCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.SPHERE) || this;

                _initializerDefineProperty(_this, "_radius", _descriptor$4, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(SphereCollider, [{
                key: "radius",
                get: function get() {
                  return this._radius;
                },
                set: function set(value) {
                  this._radius = value;

                  {
                    this.shape.setRadius(this._radius);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return SphereCollider;
            }(Collider), _temp$4), (_applyDecoratedDescriptor(_class2$4.prototype, "radius", [_dec4$3], Object.getOwnPropertyDescriptor(_class2$4.prototype, "radius"), _class2$4.prototype), _descriptor$4 = _applyDecoratedDescriptor(_class2$4.prototype, "_radius", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.5;
              }
            })), _class2$4)) || _class$4) || _class$4) || _class$4) || _class$4));

            var _dec$5, _dec2$4, _dec3$4, _dec4$4, _dec5$3, _dec6$2, _dec7$2, _class$5, _class2$5, _descriptor$5, _descriptor2$3, _descriptor3$3, _temp$5;
            var CapsuleCollider = exports('b', (_dec$5 = ccclass('cc.CapsuleCollider'), _dec2$4 = help('i18n:cc.CapsuleCollider'), _dec3$4 = menu('Physics/CapsuleCollider'), _dec4$4 = tooltip('i18n:physics3d.collider.capsule_radius'), _dec5$3 = tooltip('i18n:physics3d.collider.capsule_cylinderHeight'), _dec6$2 = type(EAxisDirection), _dec7$2 = tooltip('i18n:physics3d.collider.capsule_direction'), _dec$5(_class$5 = _dec2$4(_class$5 = _dec3$4(_class$5 = executeInEditMode(_class$5 = (_class2$5 = (_temp$5 = function (_Collider) {
              _inheritsLoose(CapsuleCollider, _Collider);

              function CapsuleCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.CAPSULE) || this;

                _initializerDefineProperty(_this, "_radius", _descriptor$5, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_cylinderHeight", _descriptor2$3, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_direction", _descriptor3$3, _assertThisInitialized(_this));

                return _this;
              }

              var _proto = CapsuleCollider.prototype;

              _proto._getRadiusScale = function _getRadiusScale() {
                if (this.node == null) return 1;
                var ws = this.node.worldScale;
                if (this._direction === EAxisDirection.Y_AXIS) return Math.abs(absMax(ws.x, ws.z));
                if (this._direction === EAxisDirection.X_AXIS) return Math.abs(absMax(ws.y, ws.z));
                return Math.abs(absMax(ws.x, ws.y));
              };

              _proto._getHeightScale = function _getHeightScale() {
                if (this.node == null) return 1;
                var ws = this.node.worldScale;
                if (this._direction === EAxisDirection.Y_AXIS) return Math.abs(ws.y);
                if (this._direction === EAxisDirection.X_AXIS) return Math.abs(ws.x);
                return Math.abs(ws.z);
              };

              _createClass(CapsuleCollider, [{
                key: "radius",
                get: function get() {
                  return this._radius;
                },
                set: function set(value) {
                  if (value < 0) value = 0;
                  this._radius = value;

                  {
                    this.shape.setRadius(value);
                  }
                }
              }, {
                key: "cylinderHeight",
                get: function get() {
                  return this._cylinderHeight;
                },
                set: function set(value) {
                  if (value < 0) value = 0;
                  this._cylinderHeight = value;

                  {
                    this.shape.setCylinderHeight(value);
                  }
                }
              }, {
                key: "direction",
                get: function get() {
                  return this._direction;
                },
                set: function set(value) {
                  value = Math.floor(value);
                  if (value < EAxisDirection.X_AXIS || value > EAxisDirection.Z_AXIS) return;
                  this._direction = value;

                  {
                    this.shape.setDirection(value);
                  }
                }
              }, {
                key: "height",
                get: function get() {
                  return this._radius * 2 + this._cylinderHeight;
                },
                set: function set(value) {
                  var ch = value - this._radius * 2;
                  if (ch < 0) ch = 0;
                  this.cylinderHeight = ch;
                }
              }, {
                key: "worldHeight",
                get: function get() {
                  return this._radius * 2 * this._getRadiusScale() + this._cylinderHeight * this._getHeightScale();
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return CapsuleCollider;
            }(Collider), _temp$5), (_applyDecoratedDescriptor(_class2$5.prototype, "radius", [_dec4$4], Object.getOwnPropertyDescriptor(_class2$5.prototype, "radius"), _class2$5.prototype), _applyDecoratedDescriptor(_class2$5.prototype, "cylinderHeight", [_dec5$3], Object.getOwnPropertyDescriptor(_class2$5.prototype, "cylinderHeight"), _class2$5.prototype), _applyDecoratedDescriptor(_class2$5.prototype, "direction", [_dec6$2, _dec7$2], Object.getOwnPropertyDescriptor(_class2$5.prototype, "direction"), _class2$5.prototype), _descriptor$5 = _applyDecoratedDescriptor(_class2$5.prototype, "_radius", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.5;
              }
            }), _descriptor2$3 = _applyDecoratedDescriptor(_class2$5.prototype, "_cylinderHeight", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor3$3 = _applyDecoratedDescriptor(_class2$5.prototype, "_direction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return EAxisDirection.Y_AXIS;
              }
            })), _class2$5)) || _class$5) || _class$5) || _class$5) || _class$5));

            var _dec$6, _dec2$5, _dec3$5, _dec4$5, _dec5$4, _dec6$3, _dec7$3, _class$6, _class2$6, _descriptor$6, _descriptor2$4, _descriptor3$4, _temp$6;
            var CylinderCollider = exports('c', (_dec$6 = ccclass('cc.CylinderCollider'), _dec2$5 = help('i18n:cc.CylinderCollider'), _dec3$5 = menu('Physics/CylinderCollider'), _dec4$5 = tooltip('i18n:physics3d.collider.cylinder_radius'), _dec5$4 = tooltip('i18n:physics3d.collider.cylinder_height'), _dec6$3 = type(EAxisDirection), _dec7$3 = tooltip('i18n:physics3d.collider.cylinder_direction'), _dec$6(_class$6 = _dec2$5(_class$6 = _dec3$5(_class$6 = executeInEditMode(_class$6 = (_class2$6 = (_temp$6 = function (_Collider) {
              _inheritsLoose(CylinderCollider, _Collider);

              function CylinderCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.CYLINDER) || this;

                _initializerDefineProperty(_this, "_radius", _descriptor$6, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_height", _descriptor2$4, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_direction", _descriptor3$4, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(CylinderCollider, [{
                key: "radius",
                get: function get() {
                  return this._radius;
                },
                set: function set(value) {
                  if (this._radius === value) return;
                  if (value < 0) value = 0;
                  this._radius = value;

                  {
                    this.shape.setRadius(value);
                  }
                }
              }, {
                key: "height",
                get: function get() {
                  return this._height;
                },
                set: function set(value) {
                  if (this._height === value) return;
                  if (value < 0) value = 0;
                  this._height = value;

                  {
                    this.shape.setHeight(value);
                  }
                }
              }, {
                key: "direction",
                get: function get() {
                  return this._direction;
                },
                set: function set(value) {
                  if (this._direction === value) return;
                  if (value < EAxisDirection.X_AXIS || value > EAxisDirection.Z_AXIS) return;
                  this._direction = value;

                  {
                    this.shape.setDirection(value);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return CylinderCollider;
            }(Collider), _temp$6), (_applyDecoratedDescriptor(_class2$6.prototype, "radius", [_dec4$5], Object.getOwnPropertyDescriptor(_class2$6.prototype, "radius"), _class2$6.prototype), _applyDecoratedDescriptor(_class2$6.prototype, "height", [_dec5$4], Object.getOwnPropertyDescriptor(_class2$6.prototype, "height"), _class2$6.prototype), _applyDecoratedDescriptor(_class2$6.prototype, "direction", [_dec6$3, _dec7$3], Object.getOwnPropertyDescriptor(_class2$6.prototype, "direction"), _class2$6.prototype), _descriptor$6 = _applyDecoratedDescriptor(_class2$6.prototype, "_radius", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.5;
              }
            }), _descriptor2$4 = _applyDecoratedDescriptor(_class2$6.prototype, "_height", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 2;
              }
            }), _descriptor3$4 = _applyDecoratedDescriptor(_class2$6.prototype, "_direction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return EAxisDirection.Y_AXIS;
              }
            })), _class2$6)) || _class$6) || _class$6) || _class$6) || _class$6));

            var _dec$7, _dec2$6, _dec3$6, _dec4$6, _dec5$5, _dec6$4, _dec7$4, _class$7, _class2$7, _descriptor$7, _descriptor2$5, _descriptor3$5, _temp$7;
            var ConeCollider = exports('g', (_dec$7 = ccclass('cc.ConeCollider'), _dec2$6 = help('i18n:cc.ConeCollider'), _dec3$6 = menu('Physics/ConeCollider'), _dec4$6 = tooltip('i18n:physics3d.collider.cone_radius'), _dec5$5 = tooltip('i18n:physics3d.collider.cone_height'), _dec6$4 = type(EAxisDirection), _dec7$4 = tooltip('i18n:physics3d.collider.cone_direction'), _dec$7(_class$7 = _dec2$6(_class$7 = _dec3$6(_class$7 = executeInEditMode(_class$7 = (_class2$7 = (_temp$7 = function (_Collider) {
              _inheritsLoose(ConeCollider, _Collider);

              function ConeCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.CONE) || this;

                _initializerDefineProperty(_this, "_radius", _descriptor$7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_height", _descriptor2$5, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_direction", _descriptor3$5, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(ConeCollider, [{
                key: "radius",
                get: function get() {
                  return this._radius;
                },
                set: function set(value) {
                  if (this._radius === value) return;
                  if (value < 0) value = 0;
                  this._radius = value;

                  {
                    this.shape.setRadius(value);
                  }
                }
              }, {
                key: "height",
                get: function get() {
                  return this._height;
                },
                set: function set(value) {
                  if (this._height === value) return;
                  if (value < 0) value = 0;
                  this._height = value;

                  {
                    this.shape.setHeight(value);
                  }
                }
              }, {
                key: "direction",
                get: function get() {
                  return this._direction;
                },
                set: function set(value) {
                  if (this._direction === value) return;
                  if (value < EAxisDirection.X_AXIS || value > EAxisDirection.Z_AXIS) return;
                  this._direction = value;

                  {
                    this.shape.setDirection(value);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return ConeCollider;
            }(Collider), _temp$7), (_applyDecoratedDescriptor(_class2$7.prototype, "radius", [_dec4$6], Object.getOwnPropertyDescriptor(_class2$7.prototype, "radius"), _class2$7.prototype), _applyDecoratedDescriptor(_class2$7.prototype, "height", [_dec5$5], Object.getOwnPropertyDescriptor(_class2$7.prototype, "height"), _class2$7.prototype), _applyDecoratedDescriptor(_class2$7.prototype, "direction", [_dec6$4, _dec7$4], Object.getOwnPropertyDescriptor(_class2$7.prototype, "direction"), _class2$7.prototype), _descriptor$7 = _applyDecoratedDescriptor(_class2$7.prototype, "_radius", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0.5;
              }
            }), _descriptor2$5 = _applyDecoratedDescriptor(_class2$7.prototype, "_height", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 1;
              }
            }), _descriptor3$5 = _applyDecoratedDescriptor(_class2$7.prototype, "_direction", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return EAxisDirection.Y_AXIS;
              }
            })), _class2$7)) || _class$7) || _class$7) || _class$7) || _class$7));

            var _dec$8, _dec2$7, _dec3$7, _dec4$7, _dec5$6, _dec6$5, _class$8, _class2$8, _descriptor$8, _descriptor2$6, _temp$8;
            var MeshCollider = exports('M', (_dec$8 = ccclass('cc.MeshCollider'), _dec2$7 = help('i18n:cc.MeshCollider'), _dec3$7 = menu('Physics/MeshCollider'), _dec4$7 = type(Mesh), _dec5$6 = tooltip('i18n:physics3d.collider.mesh_mesh'), _dec6$5 = tooltip('i18n:physics3d.collider.mesh_convex'), _dec$8(_class$8 = _dec2$7(_class$8 = _dec3$7(_class$8 = executeInEditMode(_class$8 = (_class2$8 = (_temp$8 = function (_Collider) {
              _inheritsLoose(MeshCollider, _Collider);

              function MeshCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.MESH) || this;

                _initializerDefineProperty(_this, "_mesh", _descriptor$8, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_convex", _descriptor2$6, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(MeshCollider, [{
                key: "mesh",
                get: function get() {
                  return this._mesh;
                },
                set: function set(value) {
                  if (this._mesh === value) return;
                  this._mesh = value;
                  this.shape.setMesh(this._mesh);
                }
              }, {
                key: "convex",
                get: function get() {
                  return this._convex;
                },
                set: function set(value) {
                  if (this._convex === value) return;
                  this._convex = value;
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return MeshCollider;
            }(Collider), _temp$8), (_applyDecoratedDescriptor(_class2$8.prototype, "mesh", [_dec4$7, _dec5$6], Object.getOwnPropertyDescriptor(_class2$8.prototype, "mesh"), _class2$8.prototype), _applyDecoratedDescriptor(_class2$8.prototype, "convex", [editable, _dec6$5], Object.getOwnPropertyDescriptor(_class2$8.prototype, "convex"), _class2$8.prototype), _descriptor$8 = _applyDecoratedDescriptor(_class2$8.prototype, "_mesh", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            }), _descriptor2$6 = _applyDecoratedDescriptor(_class2$8.prototype, "_convex", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return false;
              }
            })), _class2$8)) || _class$8) || _class$8) || _class$8) || _class$8));

            var _dec$9, _dec2$8, _dec3$8, _dec4$8, _dec5$7, _dec6$6, _dec7$5, _dec8$2, _dec9$2, _dec10$2, _dec11$2, _dec12$2, _class$9, _class2$9, _descriptor$9, _descriptor2$7, _descriptor3$6, _descriptor4$2, _temp$9;
            var ConstantForce = exports('e', (_dec$9 = ccclass('cc.ConstantForce'), _dec2$8 = help('i18n:cc.ConstantForce'), _dec3$8 = requireComponent(RigidBody), _dec4$8 = menu('Physics/ConstantForce'), _dec5$7 = displayOrder(0), _dec6$6 = tooltip('i18n:physics3d.constant_force.force'), _dec7$5 = displayOrder(1), _dec8$2 = tooltip('i18n:physics3d.constant_force.localForce'), _dec9$2 = displayOrder(2), _dec10$2 = tooltip('i18n:physics3d.constant_force.torque'), _dec11$2 = displayOrder(3), _dec12$2 = tooltip('i18n:physics3d.constant_force.localTorque'), _dec$9(_class$9 = _dec2$8(_class$9 = _dec3$8(_class$9 = _dec4$8(_class$9 = disallowMultiple(_class$9 = executeInEditMode(_class$9 = (_class2$9 = (_temp$9 = function (_Component) {
              _inheritsLoose(ConstantForce, _Component);

              function ConstantForce() {
                var _this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                _this = _Component.call.apply(_Component, [this].concat(args)) || this;
                _this._rigidBody = null;

                _initializerDefineProperty(_this, "_force", _descriptor$9, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_localForce", _descriptor2$7, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_torque", _descriptor3$6, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_localTorque", _descriptor4$2, _assertThisInitialized(_this));

                _this._mask = 0;
                return _this;
              }

              var _proto = ConstantForce.prototype;

              _proto.onLoad = function onLoad() {
                this._rigidBody = this.node.getComponent(RigidBody);

                this._maskUpdate(this._force, 1);

                this._maskUpdate(this._localForce, 2);

                this._maskUpdate(this._torque, 4);

                this._maskUpdate(this._localTorque, 8);
              };

              _proto.lateUpdate = function lateUpdate(dt) {
                {
                  if (this._rigidBody != null && this._mask !== 0) {
                    if (this._mask & 1) this._rigidBody.applyForce(this._force);
                    if (this._mask & 2) this._rigidBody.applyLocalForce(this.localForce);
                    if (this._mask & 4) this._rigidBody.applyTorque(this._torque);
                    if (this._mask & 8) this._rigidBody.applyLocalTorque(this._localTorque);
                  }
                }
              };

              _proto._maskUpdate = function _maskUpdate(t, m) {
                if (t.strictEquals(Vec3.ZERO)) {
                  this._mask &= ~m;
                } else {
                  this._mask |= m;
                }
              };

              _createClass(ConstantForce, [{
                key: "force",
                get: function get() {
                  return this._force;
                },
                set: function set(value) {
                  Vec3.copy(this._force, value);

                  this._maskUpdate(this._force, 1);
                }
              }, {
                key: "localForce",
                get: function get() {
                  return this._localForce;
                },
                set: function set(value) {
                  Vec3.copy(this._localForce, value);

                  this._maskUpdate(this.localForce, 2);
                }
              }, {
                key: "torque",
                get: function get() {
                  return this._torque;
                },
                set: function set(value) {
                  Vec3.copy(this._torque, value);

                  this._maskUpdate(this._torque, 4);
                }
              }, {
                key: "localTorque",
                get: function get() {
                  return this._localTorque;
                },
                set: function set(value) {
                  Vec3.copy(this._localTorque, value);

                  this._maskUpdate(this._localTorque, 8);
                }
              }]);

              return ConstantForce;
            }(Component), _temp$9), (_descriptor$9 = _applyDecoratedDescriptor(_class2$9.prototype, "_force", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor2$7 = _applyDecoratedDescriptor(_class2$9.prototype, "_localForce", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor3$6 = _applyDecoratedDescriptor(_class2$9.prototype, "_torque", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor4$2 = _applyDecoratedDescriptor(_class2$9.prototype, "_localTorque", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _applyDecoratedDescriptor(_class2$9.prototype, "force", [_dec5$7, _dec6$6], Object.getOwnPropertyDescriptor(_class2$9.prototype, "force"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "localForce", [_dec7$5, _dec8$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "localForce"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "torque", [_dec9$2, _dec10$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "torque"), _class2$9.prototype), _applyDecoratedDescriptor(_class2$9.prototype, "localTorque", [_dec11$2, _dec12$2], Object.getOwnPropertyDescriptor(_class2$9.prototype, "localTorque"), _class2$9.prototype)), _class2$9)) || _class$9) || _class$9) || _class$9) || _class$9) || _class$9) || _class$9));

            var _dec$a, _dec2$9, _dec3$9, _dec4$9, _dec5$8, _class$a, _class2$a, _descriptor$a, _temp$a;
            var TerrainCollider = exports('T', (_dec$a = ccclass('cc.TerrainCollider'), _dec2$9 = help('i18n:cc.TerrainCollider'), _dec3$9 = menu('Physics/TerrainCollider'), _dec4$9 = type(TerrainAsset), _dec5$8 = tooltip('i18n:physics3d.collider.terrain_terrain'), _dec$a(_class$a = _dec2$9(_class$a = _dec3$9(_class$a = executeInEditMode(_class$a = (_class2$a = (_temp$a = function (_Collider) {
              _inheritsLoose(TerrainCollider, _Collider);

              function TerrainCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.TERRAIN) || this;

                _initializerDefineProperty(_this, "_terrain", _descriptor$a, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(TerrainCollider, [{
                key: "terrain",
                get: function get() {
                  return this._terrain;
                },
                set: function set(value) {
                  this._terrain = value;
                  this.shape.setTerrain(this._terrain);
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return TerrainCollider;
            }(Collider), _temp$a), (_applyDecoratedDescriptor(_class2$a.prototype, "terrain", [_dec4$9, _dec5$8], Object.getOwnPropertyDescriptor(_class2$a.prototype, "terrain"), _class2$a.prototype), _descriptor$a = _applyDecoratedDescriptor(_class2$a.prototype, "_terrain", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2$a)) || _class$a) || _class$a) || _class$a) || _class$a));

            var _dec$b, _dec2$a, _dec3$a, _dec4$a, _dec5$9, _dec6$7, _dec7$6, _dec8$3, _dec9$3, _dec10$3, _dec11$3, _dec12$3, _class$b, _class2$b, _descriptor$b, _descriptor2$8, _class3$3, _temp$b;
            var SimplexCollider = exports('h', (_dec$b = ccclass('cc.SimplexCollider'), _dec2$a = help('i18n:cc.SimplexCollider'), _dec3$a = menu('Physics/SimplexCollider'), _dec4$a = type(ESimplexType), _dec5$9 = tooltip('i18n:physics3d.collider.simplex_shapeType'), _dec6$7 = tooltip('i18n:physics3d.collider.simplex_vertex0'), _dec7$6 = visible(function () {
              return this._shapeType > 1;
            }), _dec8$3 = tooltip('i18n:physics3d.collider.simplex_vertex1'), _dec9$3 = visible(function () {
              return this._shapeType > 2;
            }), _dec10$3 = tooltip('i18n:physics3d.collider.simplex_vertex2'), _dec11$3 = visible(function () {
              return this._shapeType > 3;
            }), _dec12$3 = tooltip('i18n:physics3d.collider.simplex_vertex3'), _dec$b(_class$b = _dec2$a(_class$b = _dec3$a(_class$b = executeInEditMode(_class$b = (_class2$b = (_temp$b = _class3$3 = function (_Collider) {
              _inheritsLoose(SimplexCollider, _Collider);

              function SimplexCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.SIMPLEX) || this;

                _initializerDefineProperty(_this, "_shapeType", _descriptor$b, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_vertices", _descriptor2$8, _assertThisInitialized(_this));

                return _this;
              }

              var _proto = SimplexCollider.prototype;

              _proto.updateVertices = function updateVertices() {
                {
                  this.shape.setVertices(this._vertices);
                }
              };

              _createClass(SimplexCollider, [{
                key: "shapeType",
                get: function get() {
                  return this._shapeType;
                },
                set: function set(v) {
                  this._shapeType = v;

                  {
                    this.shape.setShapeType(v);
                  }
                }
              }, {
                key: "vertex0",
                get: function get() {
                  return this._vertices[0];
                },
                set: function set(v) {
                  Vec3.copy(this._vertices[0], v);
                  this.updateVertices();
                }
              }, {
                key: "vertex1",
                get: function get() {
                  return this._vertices[1];
                },
                set: function set(v) {
                  Vec3.copy(this._vertices[1], v);
                  this.updateVertices();
                }
              }, {
                key: "vertex2",
                get: function get() {
                  return this._vertices[2];
                },
                set: function set(v) {
                  Vec3.copy(this._vertices[2], v);
                  this.updateVertices();
                }
              }, {
                key: "vertex3",
                get: function get() {
                  return this._vertices[3];
                },
                set: function set(v) {
                  Vec3.copy(this._vertices[3], v);
                  this.updateVertices();
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }, {
                key: "vertices",
                get: function get() {
                  return this._vertices;
                }
              }]);

              return SimplexCollider;
            }(Collider), _class3$3.ESimplexType = ESimplexType, _temp$b), (_applyDecoratedDescriptor(_class2$b.prototype, "shapeType", [_dec4$a, _dec5$9], Object.getOwnPropertyDescriptor(_class2$b.prototype, "shapeType"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "vertex0", [editable, _dec6$7], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex0"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "vertex1", [_dec7$6, _dec8$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex1"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "vertex2", [_dec9$3, _dec10$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex2"), _class2$b.prototype), _applyDecoratedDescriptor(_class2$b.prototype, "vertex3", [_dec11$3, _dec12$3], Object.getOwnPropertyDescriptor(_class2$b.prototype, "vertex3"), _class2$b.prototype), _descriptor$b = _applyDecoratedDescriptor(_class2$b.prototype, "_shapeType", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return ESimplexType.TETRAHEDRON;
              }
            }), _descriptor2$8 = _applyDecoratedDescriptor(_class2$b.prototype, "_vertices", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return [new Vec3(0, 0, 0), new Vec3(0, 0, 1), new Vec3(1, 0, 0), new Vec3(0, 1, 0)];
              }
            })), _class2$b)) || _class$b) || _class$b) || _class$b) || _class$b));

            (function (_SimplexCollider) {})(SimplexCollider || (SimplexCollider = exports('h', {})));

            var _dec$c, _dec2$b, _dec3$b, _dec4$b, _dec5$a, _dec6$8, _class$c, _class2$c, _descriptor$c, _descriptor2$9, _temp$c;
            var PlaneCollider = exports('i', (_dec$c = ccclass('cc.PlaneCollider'), _dec2$b = help('i18n:cc.PlaneCollider'), _dec3$b = menu('Physics/PlaneCollider'), _dec4$b = type(Vec3), _dec5$a = tooltip('i18n:physics3d.collider.plane_normal'), _dec6$8 = tooltip('i18n:physics3d.collider.plane_constant'), _dec$c(_class$c = _dec2$b(_class$c = _dec3$b(_class$c = executeInEditMode(_class$c = (_class2$c = (_temp$c = function (_Collider) {
              _inheritsLoose(PlaneCollider, _Collider);

              function PlaneCollider() {
                var _this;

                _this = _Collider.call(this, EColliderType.PLANE) || this;

                _initializerDefineProperty(_this, "_normal", _descriptor$c, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_constant", _descriptor2$9, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(PlaneCollider, [{
                key: "normal",
                get: function get() {
                  return this._normal;
                },
                set: function set(value) {
                  Vec3.copy(this._normal, value);

                  {
                    this.shape.setNormal(this._normal);
                  }
                }
              }, {
                key: "constant",
                get: function get() {
                  return this._constant;
                },
                set: function set(v) {
                  this._constant = v;

                  {
                    this.shape.setConstant(this._constant);
                  }
                }
              }, {
                key: "shape",
                get: function get() {
                  return this._shape;
                }
              }]);

              return PlaneCollider;
            }(Collider), _temp$c), (_applyDecoratedDescriptor(_class2$c.prototype, "normal", [_dec4$b, _dec5$a], Object.getOwnPropertyDescriptor(_class2$c.prototype, "normal"), _class2$c.prototype), _applyDecoratedDescriptor(_class2$c.prototype, "constant", [editable, _dec6$8], Object.getOwnPropertyDescriptor(_class2$c.prototype, "constant"), _class2$c.prototype), _descriptor$c = _applyDecoratedDescriptor(_class2$c.prototype, "_normal", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3(0, 1, 0);
              }
            }), _descriptor2$9 = _applyDecoratedDescriptor(_class2$c.prototype, "_constant", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return 0;
              }
            })), _class2$c)) || _class$c) || _class$c) || _class$c) || _class$c));

            var _dec$d, _dec2$c, _dec3$c, _dec4$c, _dec5$b, _dec6$9, _dec7$7, _dec8$4, _class$d, _class2$d, _descriptor$d, _descriptor2$a, _class3$4, _temp$d;
            var Constraint = exports('a', (_dec$d = ccclass('cc.Constraint'), _dec2$c = requireComponent(RigidBody), _dec3$c = type(RigidBody), _dec4$c = displayOrder(-2), _dec5$b = type(RigidBody), _dec6$9 = displayOrder(-1), _dec7$7 = displayOrder(0), _dec8$4 = type(RigidBody), _dec$d(_class$d = _dec2$c(_class$d = (_class2$d = (_temp$d = _class3$4 = function (_Eventify) {
              _inheritsLoose(Constraint, _Eventify);

              function Constraint(type) {
                var _this;

                _this = _Eventify.call(this) || this;
                _this.TYPE = void 0;

                _initializerDefineProperty(_this, "_enableCollision", _descriptor$d, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_connectedBody", _descriptor2$a, _assertThisInitialized(_this));

                _this._constraint = null;
                _this.TYPE = type;
                return _this;
              }

              var _proto = Constraint.prototype;

              _proto.onLoad = function onLoad() {
                {
                  this._constraint = createConstraint(this.TYPE);

                  this._constraint.initialize(this);
                }
              };

              _proto.onEnable = function onEnable() {
                if (this._constraint) {
                  this._constraint.onEnable();
                }
              };

              _proto.onDisable = function onDisable() {
                if (this._constraint) {
                  this._constraint.onDisable();
                }
              };

              _proto.onDestroy = function onDestroy() {
                if (this._constraint) {
                  this._constraint.onDestroy();
                }
              };

              _createClass(Constraint, [{
                key: "attachedBody",
                get: function get() {
                  return this.getComponent(RigidBody);
                }
              }, {
                key: "connectedBody",
                get: function get() {
                  return this._connectedBody;
                },
                set: function set(v) {
                  this._connectedBody = v;

                  {
                    if (this._constraint) this._constraint.setConnectedBody(v);
                  }
                }
              }, {
                key: "enableCollision",
                get: function get() {
                  return this._enableCollision;
                },
                set: function set(v) {
                  this._enableCollision = v;

                  {
                    if (this._constraint) this._constraint.setEnableCollision(v);
                  }
                }
              }]);

              return Constraint;
            }(Eventify(Component)), _class3$4.Type = EConstraintType, _temp$d), (_applyDecoratedDescriptor(_class2$d.prototype, "attachedBody", [_dec3$c, readOnly, _dec4$c], Object.getOwnPropertyDescriptor(_class2$d.prototype, "attachedBody"), _class2$d.prototype), _applyDecoratedDescriptor(_class2$d.prototype, "connectedBody", [_dec5$b, _dec6$9], Object.getOwnPropertyDescriptor(_class2$d.prototype, "connectedBody"), _class2$d.prototype), _applyDecoratedDescriptor(_class2$d.prototype, "enableCollision", [_dec7$7], Object.getOwnPropertyDescriptor(_class2$d.prototype, "enableCollision"), _class2$d.prototype), _descriptor$d = _applyDecoratedDescriptor(_class2$d.prototype, "_enableCollision", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return true;
              }
            }), _descriptor2$a = _applyDecoratedDescriptor(_class2$d.prototype, "_connectedBody", [_dec8$4], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return null;
              }
            })), _class2$d)) || _class$d) || _class$d));

            (function (_Constraint) {})(Constraint || (Constraint = exports('a', {})));

            var _dec$e, _dec2$d, _dec3$d, _dec4$d, _dec5$c, _dec6$a, _dec7$8, _dec8$5, _dec9$4, _class$e, _class2$e, _descriptor$e, _descriptor2$b, _descriptor3$7, _temp$e;
            var HingeConstraint = exports('H', (_dec$e = ccclass('cc.HingeConstraint'), _dec2$d = help('i18n:cc.HingeConstraint'), _dec3$d = menu('Physics/HingeConstraint(beta)'), _dec4$d = type(Vec3), _dec5$c = type(Vec3), _dec6$a = type(Vec3), _dec7$8 = formerlySerializedAs('axisA'), _dec8$5 = formerlySerializedAs('pivotA'), _dec9$4 = formerlySerializedAs('pivotB'), _dec$e(_class$e = _dec2$d(_class$e = _dec3$d(_class$e = (_class2$e = (_temp$e = function (_Constraint) {
              _inheritsLoose(HingeConstraint, _Constraint);

              function HingeConstraint() {
                var _this;

                _this = _Constraint.call(this, EConstraintType.HINGE) || this;

                _initializerDefineProperty(_this, "_axis", _descriptor$e, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_pivotA", _descriptor2$b, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_pivotB", _descriptor3$7, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(HingeConstraint, [{
                key: "pivotA",
                get: function get() {
                  return this._pivotA;
                },
                set: function set(v) {
                  Vec3.copy(this._pivotA, v);

                  {
                    this.constraint.setPivotA(this._pivotA);
                  }
                }
              }, {
                key: "pivotB",
                get: function get() {
                  return this._pivotB;
                },
                set: function set(v) {
                  Vec3.copy(this._pivotB, v);

                  {
                    this.constraint.setPivotB(this._pivotB);
                  }
                }
              }, {
                key: "axis",
                get: function get() {
                  return this._axis;
                },
                set: function set(v) {
                  Vec3.copy(this._axis, v);

                  {
                    this.constraint.setAxis(this._axis);
                  }
                }
              }, {
                key: "constraint",
                get: function get() {
                  return this._constraint;
                }
              }]);

              return HingeConstraint;
            }(Constraint), _temp$e), (_applyDecoratedDescriptor(_class2$e.prototype, "pivotA", [_dec4$d], Object.getOwnPropertyDescriptor(_class2$e.prototype, "pivotA"), _class2$e.prototype), _applyDecoratedDescriptor(_class2$e.prototype, "pivotB", [_dec5$c], Object.getOwnPropertyDescriptor(_class2$e.prototype, "pivotB"), _class2$e.prototype), _applyDecoratedDescriptor(_class2$e.prototype, "axis", [_dec6$a], Object.getOwnPropertyDescriptor(_class2$e.prototype, "axis"), _class2$e.prototype), _descriptor$e = _applyDecoratedDescriptor(_class2$e.prototype, "_axis", [serializable, _dec7$8], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor2$b = _applyDecoratedDescriptor(_class2$e.prototype, "_pivotA", [serializable, _dec8$5], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor3$7 = _applyDecoratedDescriptor(_class2$e.prototype, "_pivotB", [serializable, _dec9$4], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            })), _class2$e)) || _class$e) || _class$e) || _class$e));

            var _dec$f, _dec2$e, _dec3$e, _dec4$e, _dec5$d, _class$f, _class2$f, _descriptor$f, _descriptor2$c, _temp$f;
            var PointToPointConstraint = exports('j', (_dec$f = ccclass('cc.PointToPointConstraint'), _dec2$e = help('i18n:cc.PointToPointConstraint'), _dec3$e = menu('Physics/PointToPointConstraint(beta)'), _dec4$e = type(Vec3), _dec5$d = type(Vec3), _dec$f(_class$f = _dec2$e(_class$f = _dec3$e(_class$f = (_class2$f = (_temp$f = function (_Constraint) {
              _inheritsLoose(PointToPointConstraint, _Constraint);

              function PointToPointConstraint() {
                var _this;

                _this = _Constraint.call(this, EConstraintType.POINT_TO_POINT) || this;

                _initializerDefineProperty(_this, "_pivotA", _descriptor$f, _assertThisInitialized(_this));

                _initializerDefineProperty(_this, "_pivotB", _descriptor2$c, _assertThisInitialized(_this));

                return _this;
              }

              _createClass(PointToPointConstraint, [{
                key: "pivotA",
                get: function get() {
                  return this._pivotA;
                },
                set: function set(v) {
                  Vec3.copy(this._pivotA, v);

                  {
                    this.constraint.setPivotA(this._pivotA);
                  }
                }
              }, {
                key: "pivotB",
                get: function get() {
                  return this._pivotB;
                },
                set: function set(v) {
                  Vec3.copy(this._pivotB, v);

                  {
                    this.constraint.setPivotB(this._pivotB);
                  }
                }
              }, {
                key: "constraint",
                get: function get() {
                  return this._constraint;
                }
              }]);

              return PointToPointConstraint;
            }(Constraint), _temp$f), (_applyDecoratedDescriptor(_class2$f.prototype, "pivotA", [_dec4$e], Object.getOwnPropertyDescriptor(_class2$f.prototype, "pivotA"), _class2$f.prototype), _applyDecoratedDescriptor(_class2$f.prototype, "pivotB", [_dec5$d], Object.getOwnPropertyDescriptor(_class2$f.prototype, "pivotB"), _class2$f.prototype), _descriptor$f = _applyDecoratedDescriptor(_class2$f.prototype, "_pivotA", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            }), _descriptor2$c = _applyDecoratedDescriptor(_class2$f.prototype, "_pivotB", [serializable], {
              configurable: true,
              enumerable: true,
              writable: true,
              initializer: function initializer() {
                return new Vec3();
              }
            })), _class2$f)) || _class$f) || _class$f) || _class$f));

            function setWrap(object, wrapper) {
              object.__cc_wrapper__ = wrapper;
            }
            function getWrap(object) {
              return object.__cc_wrapper__;
            }
            function maxComponent(v) {
              return Math.max(v.x, Math.max(v.y, v.z));
            }
            var VEC3_0 = exports('V', new Vec3());
            var TriggerEventObject = exports('o', {
              type: 'onTriggerEnter',
              selfCollider: null,
              otherCollider: null,
              impl: null
            });
            var CollisionEventObject = exports('q', {
              type: 'onCollisionEnter',
              selfCollider: null,
              otherCollider: null,
              contacts: [],
              impl: null
            });
            function shrinkPositions(buffer) {
              var pos = [];

              if (buffer.length >= 3) {
                pos[0] = buffer[0], pos[1] = buffer[1], pos[2] = buffer[2];
                var len = buffer.length;

                for (var i = 3; i < len; i += 3) {
                  var p0 = buffer[i];
                  var p1 = buffer[i + 1];
                  var p2 = buffer[i + 2];
                  var len2 = pos.length;
                  var isNew = true;

                  for (var j = 0; j < len2; j += 3) {
                    if (equals(p0, pos[j]) && equals(p1, pos[j + 1]) && equals(p2, pos[j + 2])) {
                      isNew = false;
                      break;
                    }
                  }

                  if (isNew) {
                    pos.push(p0);
                    pos.push(p1);
                    pos.push(p2);
                  }
                }
              }

              return pos;
            }

            var util = /*#__PURE__*/Object.freeze({
                __proto__: null,
                setWrap: setWrap,
                getWrap: getWrap,
                maxComponent: maxComponent,
                VEC3_0: VEC3_0,
                TriggerEventObject: TriggerEventObject,
                CollisionEventObject: CollisionEventObject,
                shrinkPositions: shrinkPositions,
                cylinder: cylinder
            });

            legacyCC.PhysicsSystem = PhysicsSystem;
            legacyCC.PhysicsMaterial = PhysicsMaterial;
            legacyCC.PhysicsRayResult = PhysicsRayResult;
            legacyCC.ConstantForce = ConstantForce;

            var physics = /*#__PURE__*/Object.freeze({
                __proto__: null,
                PhysicsSystem: PhysicsSystem,
                PhysicsRayResult: PhysicsRayResult,
                get Collider () { return Collider; },
                BoxCollider: BoxCollider,
                SphereCollider: SphereCollider,
                CapsuleCollider: CapsuleCollider,
                MeshCollider: MeshCollider,
                CylinderCollider: CylinderCollider,
                ConeCollider: ConeCollider,
                TerrainCollider: TerrainCollider,
                get SimplexCollider () { return SimplexCollider; },
                PlaneCollider: PlaneCollider,
                get Constraint () { return Constraint; },
                HingeConstraint: HingeConstraint,
                PointToPointConstraint: PointToPointConstraint,
                get RigidBody () { return RigidBody; },
                PhysicsMaterial: PhysicsMaterial,
                ConstantForce: ConstantForce,
                selector: selector,
                utils: util,
                get ERigidBodyType () { return ERigidBodyType; },
                get EAxisDirection () { return EAxisDirection; },
                get ESimplexType () { return ESimplexType; },
                get EColliderType () { return EColliderType; },
                get EConstraintType () { return EConstraintType; },
                get PhysicsGroup () { return PhysicsGroup; }
            });
            exports('p', physics);

        }
    };
});
