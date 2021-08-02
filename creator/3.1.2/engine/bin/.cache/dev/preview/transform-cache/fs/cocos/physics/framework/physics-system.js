System.register("q-bundled:///fs/cocos/physics/framework/physics-system.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/math/index.js", "./instance.js", "../../core/director.js", "../../core/components/index.js", "./assets/physics-material.js", "../../core/index.js", "./physics-ray-result.js", "./collision-matrix.js", "./physics-enum.js", "./physics-selector.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Vec3, createPhysicsWorld, director, Director, System, PhysicsMaterial, RecyclePool, game, Enum, PhysicsRayResult, CollisionMatrix, PhysicsGroup, selector, legacyCC, PhysicsSystem;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function initPhysicsSystem() {
    if (!EDITOR) {
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

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_instanceJs) {
      createPhysicsWorld = _instanceJs.createPhysicsWorld;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
      Director = _coreDirectorJs.Director;
    }, function (_coreComponentsIndexJs) {
      System = _coreComponentsIndexJs.System;
    }, function (_assetsPhysicsMaterialJs) {
      PhysicsMaterial = _assetsPhysicsMaterialJs.PhysicsMaterial;
    }, function (_coreIndexJs) {
      RecyclePool = _coreIndexJs.RecyclePool;
      game = _coreIndexJs.game;
      Enum = _coreIndexJs.Enum;
    }, function (_physicsRayResultJs) {
      PhysicsRayResult = _physicsRayResultJs.PhysicsRayResult;
    }, function (_collisionMatrixJs) {
      CollisionMatrix = _collisionMatrixJs.CollisionMatrix;
    }, function (_physicsEnumJs) {
      PhysicsGroup = _physicsEnumJs.PhysicsGroup;
    }, function (_physicsSelectorJs) {
      selector = _physicsSelectorJs.selector;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      legacyCC.internal.PhysicsGroup = PhysicsGroup;
      /**
       * @en
       * Physics system.
       * @zh
       * 物理系统。
       */

      _export("PhysicsSystem", PhysicsSystem = /*#__PURE__*/function (_System) {
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
        /**
         * @en
         * The lifecycle function is automatically executed after all components `update` and `lateUpadte` are executed.
         * @zh
         * 生命周期函数，在所有组件的`update`和`lateUpadte`执行完成后自动执行。
         * @param deltaTime the time since last frame.
         */


        var _proto = PhysicsSystem.prototype;

        _proto.postUpdate = function postUpdate(deltaTime) {
          if (EDITOR && !legacyCC.GAME_VIEW && !this._executeInEditMode) {
            return;
          }

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
                this.physicsWorld.emitEvents(); // TODO: nesting the dirty flag reset between the syncScenetoPhysics and the simulation to reduce calling syncScenetoPhysics.

                this.physicsWorld.syncAfterEvents();
              } else {
                this.physicsWorld.syncSceneToPhysics();
                break;
              }
            }

            director.emit(Director.EVENT_AFTER_PHYSICS);
          }
        }
        /**
         * @en
         * Reset the accumulator of time to given value.
         * @zh
         * 重置时间累积总量为给定值。
         */
        ;

        _proto.resetAccumulator = function resetAccumulator(time) {
          if (time === void 0) {
            time = 0;
          }

          this._accumulator = time;
        }
        /**
         * @en
         * Perform simulation steps for the physics world.
         * @zh
         * 执行物理世界的模拟步进。
         * @param fixedTimeStep
         */
        ;

        _proto.step = function step(fixedTimeStep, deltaTime, maxSubSteps) {
          this.physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
        }
        /**
         * @en
         * Sync the scene world transform changes to the physics world.
         * @zh
         * 同步场景世界的变化信息到物理世界中。
         */
        ;

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          this.physicsWorld.syncSceneToPhysics();
        }
        /**
         * @en
         * Emit trigger and collision events.
         * @zh
         * 触发`trigger`和`collision`事件。
         */
        ;

        _proto.emitEvents = function emitEvents() {
          this.physicsWorld.emitEvents();
        }
        /**
         * @en
         * Collision detect all collider, and record all the detected results, through PhysicsSystem.Instance.RaycastResults access to the results.
         * @zh
         * 检测所有的碰撞盒，并记录所有被检测到的结果，通过 PhysicsSystem.instance.raycastResults 访问结果。
         * @param worldRay 世界空间下的一条射线
         * @param mask 掩码，默认为 0xffffffff
         * @param maxDistance 最大检测距离，默认为 10000000，目前请勿传入 Infinity 或 Number.MAX_VALUE
         * @param queryTrigger 是否检测触发器
         * @return boolean 表示是否有检测到碰撞盒
         */
        ;

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
        }
        /**
         * @en
         * Collision detect all collider, and record and ray test results with the shortest distance
         * by PhysicsSystem.Instance.RaycastClosestResult access to the results.
         * @zh
         * 检测所有的碰撞盒，并记录与射线距离最短的检测结果，通过 PhysicsSystem.instance.raycastClosestResult 访问结果。
         * @param worldRay 世界空间下的一条射线
         * @param mask 掩码，默认为 0xffffffff
         * @param maxDistance 最大检测距离，默认为 10000000，目前请勿传入 Infinity 或 Number.MAX_VALUE
         * @param queryTrigger 是否检测触发器
         * @return boolean 表示是否有检测到碰撞盒
         */
        ;

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
          get:
          /**
           * @en
           * Gets or sets whether the physical system is enabled, which can be used to pause or continue running the physical system.
           * @zh
           * 获取或设置是否启用物理系统，可以用于暂停或继续运行物理系统。
           */
          function get() {
            return this._enable;
          },
          set: function set(value) {
            this._enable = value;
          }
          /**
           * @zh
           * Gets or sets whether the physical system allows automatic sleep, which defaults to true.
           * @zh
           * 获取或设置物理系统是否允许自动休眠，默认为 true。
           */

        }, {
          key: "allowSleep",
          get: function get() {
            return this._allowSleep;
          },
          set: function set(v) {
            this._allowSleep = v;

            if (!EDITOR) {
              this.physicsWorld.setAllowSleep(v);
            }
          }
          /**
           * @en
           * Gets or sets the maximum number of simulated substeps per frame.
           * @zh
           * 获取或设置每帧模拟的最大子步数。
           */

        }, {
          key: "maxSubSteps",
          get: function get() {
            return this._maxSubSteps;
          },
          set: function set(value) {
            this._maxSubSteps = value;
          }
          /**
           * @en
           * Gets or sets the fixed delta time consumed by each simulation step.
           * @zh
           * 获取或设置每步模拟消耗的固定时间。
           */

        }, {
          key: "fixedTimeStep",
          get: function get() {
            return this._fixedTimeStep;
          },
          set: function set(value) {
            this._fixedTimeStep = value;
          }
          /**
           * @en
           * Gets or sets the value of gravity in the physical world, which defaults to (0, -10, 0).
           * @zh
           * 获取或设置物理世界的重力数值，默认为 (0, -10, 0)。
           */

        }, {
          key: "gravity",
          get: function get() {
            return this._gravity;
          },
          set: function set(gravity) {
            this._gravity.set(gravity);

            if (!EDITOR) {
              this.physicsWorld.setGravity(gravity);
            }
          }
          /**
           * @en
           * Gets or sets the default speed threshold for going to sleep.
           * @zh
           * 获取或设置进入休眠的默认速度临界值。
           */

        }, {
          key: "sleepThreshold",
          get: function get() {
            return this._sleepThreshold;
          },
          set: function set(v) {
            this._sleepThreshold = v;
          }
          /**
           * @en
           * Turn on or off the automatic simulation.
           * @zh
           * 获取或设置是否自动模拟。
           */

        }, {
          key: "autoSimulation",
          get: function get() {
            return this._autoSimulation;
          },
          set: function set(value) {
            this._autoSimulation = value;
          }
          /**
           * @en
           * Gets the global default physical material.
           * @zh
           * 获取全局的默认物理材质。
           */

        }, {
          key: "defaultMaterial",
          get: function get() {
            return this._material;
          }
          /**
           * @en
           * Gets the wrappered object of the physical world through which you can access the actual underlying object.
           * @zh
           * 获取物理世界的封装对象，通过它你可以访问到实际的底层对象。
           */

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
          /**
           * @en
           * Gets the ID of the system.
           * @zh
           * 获取此系统的ID。
           */

        }, {
          key: "PhysicsGroup",
          get:
          /**
           * @en
           * Gets the predefined physics groups.
           * @zh
           * 获取预定义的物理分组。
           */
          function get() {
            return PhysicsGroup;
          }
          /**
           * @en
           * Gets the physical system instance.
           * @zh
           * 获取物理系统实例。
           */

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
    }
  };
});