"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsSystem2D = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/index.js");

var _instance = require("./instance.js");

var _physicsSelector = require("./physics-selector.js");

var _collisionMatrix = require("../../physics/framework/collision-matrix.js");

var _physicsTypes = require("./physics-types.js");

/**
 * @packageDocumentation
 * @module physics2d
 */
let instance = null;

class PhysicsSystem2D extends (0, _index.Eventify)(_index.System) {
  /**
   * @en
   * Gets or sets whether the physical system is enabled, which can be used to pause or continue running the physical system.
   * @zh
   * 获取或设置是否启用物理系统，可以用于暂停或继续运行物理系统。
   */
  get enable() {
    return this._enable;
  }

  set enable(value) {
    this._enable = value;
  }
  /**
   * @zh
   * Gets or sets whether the physical system allows automatic sleep, which defaults to true.
   * @zh
   * 获取或设置物理系统是否允许自动休眠，默认为 true。
   */


  get allowSleep() {
    return this._allowSleep;
  }

  set allowSleep(v) {
    this._allowSleep = v;

    if (!_internal253Aconstants.EDITOR) {
      this.physicsWorld.setAllowSleep(v);
    }
  }
  /**
   * @en
   * Gets or sets the value of gravity in the physical world, which defaults to (0, -10).
   * @zh
   * 获取或设置物理世界的重力数值，默认为 (0, -10)。
   */


  get gravity() {
    return this._gravity;
  }

  set gravity(gravity) {
    this._gravity.set(gravity);

    if (!_internal253Aconstants.EDITOR) {
      this.physicsWorld.setGravity(new _index.Vec2(gravity.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, gravity.y / _physicsTypes.PHYSICS_2D_PTM_RATIO));
    }
  }
  /**
   * @en
   * Gets or sets the maximum number of simulated substeps per frame.
   * @zh
   * 获取或设置每帧模拟的最大子步数。
   */


  get maxSubSteps() {
    return this._maxSubSteps;
  }

  set maxSubSteps(value) {
    this._maxSubSteps = value;
  }
  /**
   * @en
   * Gets or sets the fixed delta time consumed by each simulation step.
   * @zh
   * 获取或设置每步模拟消耗的固定时间。
   */


  get fixedTimeStep() {
    return this._fixedTimeStep;
  }

  set fixedTimeStep(value) {
    this._fixedTimeStep = value;
  }
  /**
   * @en
   * Turn on or off the automatic simulation.
   * @zh
   * 获取或设置是否自动模拟。
   */


  get autoSimulation() {
    return this._autoSimulation;
  }

  set autoSimulation(value) {
    this._autoSimulation = value;
  }

  get debugDrawFlags() {
    return this.physicsWorld.debugDrawFlags;
  }

  set debugDrawFlags(v) {
    this.physicsWorld.debugDrawFlags = v;
  }
  /**
   * @en
   * The velocity iterations for the velocity constraint solver.
   * @zh
   * 速度更新迭代数
   */


  static get PHYSICS_NONE() {
    return !_physicsSelector.physicsEngineId;
  }

  static get PHYSICS_BUILTIN() {
    return _physicsSelector.physicsEngineId === 'builtin';
  }

  static get PHYSICS_BOX2D() {
    return _physicsSelector.physicsEngineId === 'box2d';
  }
  /**
   * @en
   * Gets the physical system instance.
   * @zh
   * 获取物理系统实例。
   */


  static get instance() {
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


  get stepping() {
    return this._steping;
  }

  constructor() {
    super();
    this.velocityIterations = 10;
    this.positionIterations = 10;
    this.physicsWorld = void 0;
    this.collisionMatrix = new _collisionMatrix.CollisionMatrix();
    this._enable = true;
    this._allowSleep = true;
    this._maxSubSteps = 1;
    this._fixedTimeStep = 1.0 / 60.0;
    this._autoSimulation = true;
    this._accumulator = 0;
    this._steping = false;
    this._gravity = new _index.Vec2(0, -10 * _physicsTypes.PHYSICS_2D_PTM_RATIO);
    this._delayEvents = [];
    const config = _index.game.config ? _index.game.config.physics : null;

    if (config) {
      _index.Vec2.copy(this._gravity, config.gravity);

      this._gravity.multiplyScalar(_physicsTypes.PHYSICS_2D_PTM_RATIO);

      this._allowSleep = config.allowSleep;
      this._fixedTimeStep = config.fixedTimeStep;
      this._maxSubSteps = config.maxSubSteps;
      this._autoSimulation = config.autoSimulation;

      if (config.collisionMatrix) {
        for (const i in config.collisionMatrix) {
          const bit = parseInt(i);
          const value = 1 << parseInt(i);
          this.collisionMatrix[`${value}`] = config.collisionMatrix[bit];
        }
      }
    }

    this.physicsWorld = (0, _instance.createPhysicsWorld)();
    this.gravity = this._gravity;
    this.allowSleep = this._allowSleep;
  }
  /**
  * @en
  * Perform a simulation of the physics system, which will now be performed automatically on each frame.
  * @zh
  * 执行一次物理系统的模拟，目前将在每帧自动执行一次。
  * @param deltaTime 与上一次执行相差的时间，目前为每帧消耗时间
  */


  postUpdate(deltaTime) {
    if (!this._enable) {
      return;
    }

    if (!this._autoSimulation) {
      return;
    }

    _index.director.emit(_index.Director.EVENT_BEFORE_PHYSICS);

    this._steping = true;
    const fixedTimeStep = this._fixedTimeStep;
    const velocityIterations = this.velocityIterations;
    const positionIterations = this.positionIterations;
    this._accumulator += deltaTime;
    let substepIndex = 0;

    while (substepIndex++ < this._maxSubSteps && this._accumulator > fixedTimeStep) {
      this.physicsWorld.step(fixedTimeStep, velocityIterations, positionIterations);
      this._accumulator -= fixedTimeStep;
    }

    const events = this._delayEvents;

    for (let i = 0, l = events.length; i < l; i++) {
      const event = events[i];
      event.func.call(event.target);
    }

    events.length = 0;
    this.physicsWorld.syncPhysicsToScene();

    if (this.debugDrawFlags) {
      this.physicsWorld.drawDebug();
    }

    this._steping = false;

    _index.director.emit(_index.Director.EVENT_AFTER_PHYSICS);
  }

  _callAfterStep(target, func) {
    if (this._steping) {
      this._delayEvents.push({
        target,
        func
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


  resetAccumulator(time = 0) {
    this._accumulator = time;
  }
  /**
   * @en
   * Perform simulation steps for the physics world.
   * @zh
   * 执行物理世界的模拟步进。
   * @param fixedTimeStep
   */


  step(fixedTimeStep) {
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


  raycast(p1, p2, type = _physicsTypes.ERaycast2DType.Closest, mask = 0xffffffff) {
    return this.physicsWorld.raycast(p1, p2, type, mask);
  }
  /**
   * @en Test which colliders contain the point.
   * @zh 检测给定点在哪些碰撞体内。
   */


  testPoint(p) {
    return this.physicsWorld.testPoint(p);
  }
  /**
   * @en Test which colliders contain the point.
   * @zh 检测给定点在哪些碰撞体内。
   */


  testAABB(rect) {
    return this.physicsWorld.testAABB(rect);
  }

}

exports.PhysicsSystem2D = PhysicsSystem2D;
PhysicsSystem2D.ID = 'PHYSICS_2D';

_index.director.once(_index.Director.EVENT_INIT, () => {
  initPhysicsSystem();
});

function initPhysicsSystem() {
  if (!PhysicsSystem2D.PHYSICS_NONE && !_internal253Aconstants.EDITOR) {
    _index.director.registerSystem(PhysicsSystem2D.ID, PhysicsSystem2D.instance, 0);
  }
}