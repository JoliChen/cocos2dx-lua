System.register("q-bundled:///fs/cocos/physics-2d/framework/physics-system.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "./instance.js", "./physics-selector.js", "../../physics/framework/collision-matrix.js", "./physics-types.js"], function (_export, _context) {
  "use strict";

  var EDITOR, System, Vec2, director, Director, game, Eventify, createPhysicsWorld, physicsEngineId, CollisionMatrix, ERaycast2DType, PHYSICS_2D_PTM_RATIO, instance, PhysicsSystem2D;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function initPhysicsSystem() {
    if (!PhysicsSystem2D.PHYSICS_NONE && !EDITOR) {
      director.registerSystem(PhysicsSystem2D.ID, PhysicsSystem2D.instance, 0);
    }
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      System = _coreIndexJs.System;
      Vec2 = _coreIndexJs.Vec2;
      director = _coreIndexJs.director;
      Director = _coreIndexJs.Director;
      game = _coreIndexJs.game;
      Eventify = _coreIndexJs.Eventify;
    }, function (_instanceJs) {
      createPhysicsWorld = _instanceJs.createPhysicsWorld;
    }, function (_physicsSelectorJs) {
      physicsEngineId = _physicsSelectorJs.physicsEngineId;
    }, function (_physicsFrameworkCollisionMatrixJs) {
      CollisionMatrix = _physicsFrameworkCollisionMatrixJs.CollisionMatrix;
    }, function (_physicsTypesJs) {
      ERaycast2DType = _physicsTypesJs.ERaycast2DType;
      PHYSICS_2D_PTM_RATIO = _physicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }],
    execute: function () {
      instance = null;

      _export("PhysicsSystem2D", PhysicsSystem2D = /*#__PURE__*/function (_Eventify) {
        _inheritsLoose(PhysicsSystem2D, _Eventify);

        function PhysicsSystem2D() {
          var _this;

          _this = _Eventify.call(this) || this;
          _this.velocityIterations = 10;
          _this.positionIterations = 10;
          _this.physicsWorld = void 0;
          _this.collisionMatrix = new CollisionMatrix();
          _this._enable = true;
          _this._allowSleep = true;
          _this._maxSubSteps = 1;
          _this._fixedTimeStep = 1.0 / 60.0;
          _this._autoSimulation = true;
          _this._accumulator = 0;
          _this._steping = false;
          _this._gravity = new Vec2(0, -10 * PHYSICS_2D_PTM_RATIO);
          _this._delayEvents = [];
          var config = game.config ? game.config.physics : null;

          if (config) {
            Vec2.copy(_this._gravity, config.gravity);

            _this._gravity.multiplyScalar(PHYSICS_2D_PTM_RATIO);

            _this._allowSleep = config.allowSleep;
            _this._fixedTimeStep = config.fixedTimeStep;
            _this._maxSubSteps = config.maxSubSteps;
            _this._autoSimulation = config.autoSimulation;

            if (config.collisionMatrix) {
              for (var i in config.collisionMatrix) {
                var bit = parseInt(i);
                var value = 1 << parseInt(i);
                _this.collisionMatrix["" + value] = config.collisionMatrix[bit];
              }
            }
          }

          _this.physicsWorld = createPhysicsWorld();
          _this.gravity = _this._gravity;
          _this.allowSleep = _this._allowSleep;
          return _this;
        }
        /**
        * @en
        * Perform a simulation of the physics system, which will now be performed automatically on each frame.
        * @zh
        * 执行一次物理系统的模拟，目前将在每帧自动执行一次。
        * @param deltaTime 与上一次执行相差的时间，目前为每帧消耗时间
        */


        var _proto = PhysicsSystem2D.prototype;

        _proto.postUpdate = function postUpdate(deltaTime) {
          if (!this._enable) {
            return;
          }

          if (!this._autoSimulation) {
            return;
          }

          director.emit(Director.EVENT_BEFORE_PHYSICS);
          this._steping = true;
          var fixedTimeStep = this._fixedTimeStep;
          var velocityIterations = this.velocityIterations;
          var positionIterations = this.positionIterations;
          this._accumulator += deltaTime;
          var substepIndex = 0;

          while (substepIndex++ < this._maxSubSteps && this._accumulator > fixedTimeStep) {
            this.physicsWorld.step(fixedTimeStep, velocityIterations, positionIterations);
            this._accumulator -= fixedTimeStep;
          }

          var events = this._delayEvents;

          for (var i = 0, l = events.length; i < l; i++) {
            var event = events[i];
            event.func.call(event.target);
          }

          events.length = 0;
          this.physicsWorld.syncPhysicsToScene();

          if (this.debugDrawFlags) {
            this.physicsWorld.drawDebug();
          }

          this._steping = false;
          director.emit(Director.EVENT_AFTER_PHYSICS);
        };

        _proto._callAfterStep = function _callAfterStep(target, func) {
          if (this._steping) {
            this._delayEvents.push({
              target: target,
              func: func
            });
          } else {
            func.call(target);
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

        _proto.step = function step(fixedTimeStep) {
          this.physicsWorld.step(fixedTimeStep, this.velocityIterations, this.positionIterations);
        }
        /**
         * @en
         * Raycast the world for all colliders in the path of the ray.
         * The raycast ignores colliders that contain the starting point.
         * @zh
         * 检测哪些碰撞体在给定射线的路径上，射线检测将忽略包含起始点的碰撞体。
         * @method rayCast
         * @param {Vec2} p1 - start point of the raycast
         * @param {Vec2} p2 - end point of the raycast
         * @param {RayCastType} type - optional, default is RayCastType.Closest
         * @param {number} mask - optional, default is 0xffffffff
         * @return {[PhysicsRayCastResult]}
         */
        ;

        _proto.raycast = function raycast(p1, p2, type, mask) {
          if (type === void 0) {
            type = ERaycast2DType.Closest;
          }

          if (mask === void 0) {
            mask = 0xffffffff;
          }

          return this.physicsWorld.raycast(p1, p2, type, mask);
        }
        /**
         * @en Test which colliders contain the point.
         * @zh 检测给定点在哪些碰撞体内。
         */
        ;

        _proto.testPoint = function testPoint(p) {
          return this.physicsWorld.testPoint(p);
        }
        /**
         * @en Test which colliders contain the point.
         * @zh 检测给定点在哪些碰撞体内。
         */
        ;

        _proto.testAABB = function testAABB(rect) {
          return this.physicsWorld.testAABB(rect);
        };

        _createClass(PhysicsSystem2D, [{
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
           * Gets or sets the value of gravity in the physical world, which defaults to (0, -10).
           * @zh
           * 获取或设置物理世界的重力数值，默认为 (0, -10)。
           */

        }, {
          key: "gravity",
          get: function get() {
            return this._gravity;
          },
          set: function set(gravity) {
            this._gravity.set(gravity);

            if (!EDITOR) {
              this.physicsWorld.setGravity(new Vec2(gravity.x / PHYSICS_2D_PTM_RATIO, gravity.y / PHYSICS_2D_PTM_RATIO));
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
        }, {
          key: "debugDrawFlags",
          get: function get() {
            return this.physicsWorld.debugDrawFlags;
          },
          set: function set(v) {
            this.physicsWorld.debugDrawFlags = v;
          }
          /**
           * @en
           * The velocity iterations for the velocity constraint solver.
           * @zh
           * 速度更新迭代数
           */

        }, {
          key: "stepping",
          get: function get() {
            return this._steping;
          }
        }], [{
          key: "PHYSICS_NONE",
          get: function get() {
            return !physicsEngineId;
          }
        }, {
          key: "PHYSICS_BUILTIN",
          get: function get() {
            return physicsEngineId === 'builtin';
          }
        }, {
          key: "PHYSICS_BOX2D",
          get: function get() {
            return physicsEngineId === 'box2d';
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
            if (!instance) {
              instance = new PhysicsSystem2D();
            }

            return instance;
          }
          /**
           * @en
           * Gets the collision matrix。
           * @zh
           * 获取碰撞矩阵。
           */

        }]);

        return PhysicsSystem2D;
      }(Eventify(System)));

      PhysicsSystem2D.ID = 'PHYSICS_2D';
      director.once(Director.EVENT_INIT, function () {
        initPhysicsSystem();
      });
    }
  };
});