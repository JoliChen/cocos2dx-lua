"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannonWorld = void 0;

var _cannon = _interopRequireDefault(require("@cocos/cannon"));

var _index = require("../../core/math/index.js");

var _cannonUtil = require("./cannon-util.js");

var _cannonShape = require("./shapes/cannon-shape.js");

var _index2 = require("../../core/index.js");

var _cannonSharedBody = require("./cannon-shared-body.js");

var _array = require("../../core/utils/array.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @hidden
 */
class CannonWorld {
  get impl() {
    return this._world;
  }

  setDefaultMaterial(mat) {
    this._world.defaultMaterial.friction = mat.friction;
    this._world.defaultMaterial.restitution = mat.restitution;

    if (_cannonShape.CannonShape.idToMaterial[mat.id] != null) {
      _cannonShape.CannonShape.idToMaterial[mat.id] = this._world.defaultMaterial;
    }
  }

  setAllowSleep(v) {
    this._world.allowSleep = v;
  }

  setGravity(gravity) {
    _index.Vec3.copy(this._world.gravity, gravity);
  } // get defaultContactMaterial () {
  //     return this._defaultContactMaterial;
  // }


  constructor() {
    this.bodies = [];
    this.constraints = [];
    this._world = void 0;
    this._world = new _cannon.default.World();
    this._world.broadphase = new _cannon.default.NaiveBroadphase();
    this._world.solver.iterations = 10;
    this._world.solver.tolerance = 0.0001;
    this._world.defaultContactMaterial.contactEquationStiffness = 1000000;
    this._world.defaultContactMaterial.frictionEquationStiffness = 1000000;
    this._world.defaultContactMaterial.contactEquationRelaxation = 3;
    this._world.defaultContactMaterial.frictionEquationRelaxation = 3;
  }

  destroy() {
    if (this.constraints.length || this.bodies.length) (0, _index2.error)('You should destroy all physics component first.');
    this._world = null;
    this._world.broadphase = null;
  }

  emitEvents() {
    this._world.emitTriggeredEvents();

    this._world.emitCollisionEvents();
  }

  syncSceneToPhysics() {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncSceneToPhysics();
    }
  }

  syncAfterEvents() {
    this.syncSceneToPhysics();
  }

  step(deltaTime, timeSinceLastCalled, maxSubStep) {
    if (this.bodies.length === 0) return;

    this._world.step(deltaTime, timeSinceLastCalled, maxSubStep); // sync physics to scene


    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncPhysicsToScene();
    }
  }

  raycastClosest(worldRay, options, result) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    const hit = this._world.raycastClosest(from, to, raycastOpt, CannonWorld.rayResult);

    if (hit) {
      (0, _cannonUtil.fillRaycastResult)(result, CannonWorld.rayResult);
    }

    return hit;
  }

  raycast(worldRay, options, pool, results) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    const hit = this._world.raycastAll(from, to, raycastOpt, result => {
      const r = pool.add();
      (0, _cannonUtil.fillRaycastResult)(r, result);
      results.push(r);
    });

    return hit;
  }

  getSharedBody(node, wrappedBody) {
    return _cannonSharedBody.CannonSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      this._world.addBody(sharedBody.body);
    }
  }

  removeSharedBody(sharedBody) {
    const i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.bodies, i);

      this._world.remove(sharedBody.body);
    }
  } //  addContactMaterial (contactMaterial: ContactMaterial) {
  //     this._cannonWorld.addContactMaterial(contactMaterial._getImpl());
  // }


  addConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i < 0) {
      this.constraints.push(constraint);

      this._world.addConstraint(constraint.impl);
    }
  }

  removeConstraint(constraint) {
    const i = this.constraints.indexOf(constraint);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.constraints, i);

      this._world.removeConstraint(constraint.impl);
    }
  }

}

exports.CannonWorld = CannonWorld;
CannonWorld.rayResult = new _cannon.default.RaycastResult();
const from = new _cannon.default.Vec3();
const to = new _cannon.default.Vec3();

function setupFromAndTo(worldRay, distance) {
  _index.Vec3.copy(from, worldRay.o);

  worldRay.computeHit(to, distance);
}

const raycastOpt = {
  checkCollisionResponse: false,
  collisionFilterGroup: -1,
  collisionFilterMask: -1,
  skipBackfaces: true
};