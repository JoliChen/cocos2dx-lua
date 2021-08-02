"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsSystem = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/math/index.js");

var _instance = require("./instance.js");

var _director = require("../../core/director.js");

var _index2 = require("../../core/components/index.js");

var _physicsMaterial = require("./assets/physics-material.js");

var _index3 = require("../../core/index.js");

var _physicsRayResult = require("./physics-ray-result.js");

var _collisionMatrix = require("./collision-matrix.js");

var _physicsEnum = require("./physics-enum.js");

var _physicsSelector = require("./physics-selector.js");

var _globalExports = require("../../core/global-exports.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module physics
 */
_globalExports.legacyCC.internal.PhysicsGroup = _physicsEnum.PhysicsGroup;
/**
 * @en
 * Physics system.
 * @zh
 * 物理系统。
 */

class PhysicsSystem extends _index2.System {
  static get PHYSICS_NONE() {
    return !_physicsSelector.selector.id;
  }

  static get PHYSICS_BUILTIN() {
    return _physicsSelector.selector.id === 'builtin';
  }

  static get PHYSICS_CANNON() {
    return _physicsSelector.selector.id === 'cannon.js';
  }

  static get PHYSICS_AMMO() {
    return _physicsSelector.selector.id === 'ammo.js';
  }

  static get PHYSICS_PHYSX() {
    return _physicsSelector.selector.id === 'physx';
  }
  /**
   * @en
   * Gets the ID of the system.
   * @zh
   * 获取此系统的ID。
   */


  /**
   * @en
   * Gets the predefined physics groups.
   * @zh
   * 获取预定义的物理分组。
   */
  static get PhysicsGroup() {
    return _physicsEnum.PhysicsGroup;
  }
  /**
   * @en
   * Gets the physical system instance.
   * @zh
   * 获取物理系统实例。
   */


  static get instance() {
    return PhysicsSystem._instance;
  }

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
   * Gets or sets the value of gravity in the physical world, which defaults to (0, -10, 0).
   * @zh
   * 获取或设置物理世界的重力数值，默认为 (0, -10, 0)。
   */


  get gravity() {
    return this._gravity;
  }

  set gravity(gravity) {
    this._gravity.set(gravity);

    if (!_internal253Aconstants.EDITOR) {
      this.physicsWorld.setGravity(gravity);
    }
  }
  /**
   * @en
   * Gets or sets the default speed threshold for going to sleep.
   * @zh
   * 获取或设置进入休眠的默认速度临界值。
   */


  get sleepThreshold() {
    return this._sleepThreshold;
  }

  set sleepThreshold(v) {
    this._sleepThreshold = v;
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
  /**
   * @en
   * Gets the global default physical material.
   * @zh
   * 获取全局的默认物理材质。
   */


  get defaultMaterial() {
    return this._material;
  }
  /**
   * @en
   * Gets the wrappered object of the physical world through which you can access the actual underlying object.
   * @zh
   * 获取物理世界的封装对象，通过它你可以访问到实际的底层对象。
   */


  constructor() {
    super();
    this.physicsWorld = void 0;
    this.raycastClosestResult = new _physicsRayResult.PhysicsRayResult();
    this.raycastResults = [];
    this.collisionMatrix = new _collisionMatrix.CollisionMatrix(1);
    this.useNodeChains = void 0;
    this._enable = true;
    this._allowSleep = true;
    this._maxSubSteps = 1;
    this._subStepCount = 0;
    this._fixedTimeStep = 1.0 / 60.0;
    this._autoSimulation = true;
    this._accumulator = 0;
    this._sleepThreshold = 0.1;
    this._gravity = new _index.Vec3(0, -10, 0);
    this._material = new _physicsMaterial.PhysicsMaterial();
    this.raycastOptions = {
      group: -1,
      mask: -1,
      queryTrigger: true,
      maxDistance: 10000000
    };
    this.raycastResultPool = new _index3.RecyclePool(() => new _physicsRayResult.PhysicsRayResult(), 1);
    const config = _index3.game.config ? _index3.game.config.physics : null;

    if (config && config.physicsEngine) {
      _index.Vec3.copy(this._gravity, config.gravity);

      this._allowSleep = config.allowSleep;
      this._fixedTimeStep = config.fixedTimeStep;
      this._maxSubSteps = config.maxSubSteps;
      this._sleepThreshold = config.sleepThreshold;
      this.autoSimulation = config.autoSimulation;
      this.useNodeChains = config.useNodeChains;

      if (config.defaultMaterial) {
        this._material.friction = config.defaultMaterial.friction;
        this._material.rollingFriction = config.defaultMaterial.rollingFriction;
        this._material.spinningFriction = config.defaultMaterial.spinningFriction;
        this._material.restitution = config.defaultMaterial.restitution;
      }

      if (config.collisionMatrix) {
        for (const i in config.collisionMatrix) {
          const key = 1 << parseInt(i);
          this.collisionMatrix[`${key}`] = config.collisionMatrix[i];
        }
      }
    } else {
      this.useNodeChains = false;
    }

    this._material.on('physics_material_update', this._updateMaterial, this);

    this.physicsWorld = (0, _instance.createPhysicsWorld)();
    this.physicsWorld.setGravity(this._gravity);
    this.physicsWorld.setAllowSleep(this._allowSleep);
    this.physicsWorld.setDefaultMaterial(this._material);
  }
  /**
   * @en
   * The lifecycle function is automatically executed after all components `update` and `lateUpadte` are executed.
   * @zh
   * 生命周期函数，在所有组件的`update`和`lateUpadte`执行完成后自动执行。
   * @param deltaTime the time since last frame.
   */


  postUpdate(deltaTime) {
    if (_internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW && !this._executeInEditMode) {
      return;
    }

    if (!this._enable) {
      this.physicsWorld.syncSceneToPhysics();
      return;
    }

    if (this._autoSimulation) {
      this._subStepCount = 0;
      this._accumulator += deltaTime;

      _director.director.emit(_director.Director.EVENT_BEFORE_PHYSICS);

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

      _director.director.emit(_director.Director.EVENT_AFTER_PHYSICS);
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


  step(fixedTimeStep, deltaTime, maxSubSteps) {
    this.physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
  }
  /**
   * @en
   * Sync the scene world transform changes to the physics world.
   * @zh
   * 同步场景世界的变化信息到物理世界中。
   */


  syncSceneToPhysics() {
    this.physicsWorld.syncSceneToPhysics();
  }
  /**
   * @en
   * Emit trigger and collision events.
   * @zh
   * 触发`trigger`和`collision`事件。
   */


  emitEvents() {
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


  raycast(worldRay, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true) {
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


  raycastClosest(worldRay, mask = 0xffffffff, maxDistance = 10000000, queryTrigger = true) {
    this.raycastOptions.mask = mask >>> 0;
    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    return this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
  }

  _updateMaterial() {
    this.physicsWorld.setDefaultMaterial(this._material);
  }

}

exports.PhysicsSystem = PhysicsSystem;
PhysicsSystem.ID = 'PHYSICS';
PhysicsSystem._instance = void 0;

_director.director.once(_director.Director.EVENT_INIT, () => {
  initPhysicsSystem();
});

function initPhysicsSystem() {
  if (!_internal253Aconstants.EDITOR) {
    const physics = _index3.game.config.physics;

    if (physics) {
      const cg = physics.collisionGroups;

      if (cg instanceof Array) {
        cg.forEach(v => {
          _physicsEnum.PhysicsGroup[v.name] = 1 << v.index;
        });

        _index3.Enum.update(_physicsEnum.PhysicsGroup);
      }
    }

    const oldIns = PhysicsSystem.instance;

    if (oldIns) {
      _director.director.unregisterSystem(oldIns);

      oldIns.physicsWorld.destroy();
    }

    const sys = new _globalExports.legacyCC.PhysicsSystem();
    _globalExports.legacyCC.PhysicsSystem._instance = sys;

    _director.director.registerSystem(PhysicsSystem.ID, sys, 0);
  }
}