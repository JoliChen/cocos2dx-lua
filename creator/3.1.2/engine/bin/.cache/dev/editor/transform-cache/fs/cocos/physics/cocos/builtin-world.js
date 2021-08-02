"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltInWorld = void 0;

var _index = require("../../core/math/index.js");

var _builtinSharedBody = require("./builtin-shared-body.js");

var _arrayCollisionMatrix = require("../utils/array-collision-matrix.js");

var _index2 = require("../../core/geometry/index.js");

var _index3 = require("../../core/index.js");

var _array = require("../../core/utils/array.js");

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
const hitPoint = new _index.Vec3();
const TriggerEventObject = {
  type: 'onTriggerEnter',
  selfCollider: null,
  otherCollider: null,
  impl: {}
};
/**
 * Built-in collision system, intended for use as a
 * efficient discrete collision detector,
 * not a full physical simulator
 */

class BuiltInWorld {
  constructor() {
    this.shapeArr = [];
    this.bodies = [];
    this._shapeArrPrev = [];
    this._collisionMatrix = new _arrayCollisionMatrix.ArrayCollisionMatrix();
    this._collisionMatrixPrev = new _arrayCollisionMatrix.ArrayCollisionMatrix();
  }

  setGravity(v) {}

  setAllowSleep(v) {}

  setDefaultMaterial(v) {}

  get impl() {
    return this;
  }

  destroy() {
    if (this.bodies.length) (0, _index3.error)('You should destroy all physics component first.');
  }

  step(deltaTime) {
    // store and reset collision array
    const tmp = this._shapeArrPrev;
    this._shapeArrPrev = this.shapeArr;
    this.shapeArr = tmp;
    this.shapeArr.length = 0; // collision detection

    for (let i = 0; i < this.bodies.length; i++) {
      const bodyA = this.bodies[i];

      for (let j = i + 1; j < this.bodies.length; j++) {
        const bodyB = this.bodies[j]; // first, Check collision filter masks

        if ((bodyA.collisionFilterGroup & bodyB.collisionFilterMask) === 0 || (bodyB.collisionFilterGroup & bodyA.collisionFilterMask) === 0) {
          continue;
        }

        bodyA.intersects(bodyB);
      }
    }
  }

  syncSceneToPhysics() {
    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncSceneToPhysics();
    }
  }

  syncAfterEvents() {
    this.syncSceneToPhysics();
  }

  emitEvents() {
    this.emitTriggerEvent();
  }

  raycastClosest(worldRay, options, out) {
    let tmp_d = Infinity;
    const max_d = options.maxDistance;
    const mask = options.mask;

    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      if (!(body.collisionFilterGroup & mask)) continue;

      for (let i = 0; i < body.shapes.length; i++) {
        const shape = body.shapes[i];

        const distance = _index2.intersect.resolve(worldRay, shape.worldShape);

        if (distance === 0 || distance > max_d) {
          continue;
        }

        if (tmp_d > distance) {
          tmp_d = distance;

          _index.Vec3.normalize(hitPoint, worldRay.d);

          _index.Vec3.scaleAndAdd(hitPoint, worldRay.o, hitPoint, distance);

          out._assign(hitPoint, distance, shape.collider, _index.Vec3.ZERO);
        }
      }
    }

    return !(tmp_d === Infinity);
  }

  raycast(worldRay, options, pool, results) {
    const max_d = options.maxDistance;
    const mask = options.mask;

    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      if (!(body.collisionFilterGroup & mask)) continue;

      for (let i = 0; i < body.shapes.length; i++) {
        const shape = body.shapes[i];

        const distance = _index2.intersect.resolve(worldRay, shape.worldShape);

        if (distance === 0 || distance > max_d) {
          continue;
        } else {
          const r = pool.add();
          worldRay.computeHit(hitPoint, distance);

          r._assign(hitPoint, distance, shape.collider, _index.Vec3.ZERO);

          results.push(r);
        }
      }
    }

    return results.length > 0;
  }

  getSharedBody(node, wrappedBody) {
    return _builtinSharedBody.BuiltinSharedBody.getSharedBody(node, this, wrappedBody);
  }

  addSharedBody(body) {
    const index = this.bodies.indexOf(body);

    if (index < 0) {
      this.bodies.push(body);
    }
  }

  removeSharedBody(body) {
    const index = this.bodies.indexOf(body);

    if (index >= 0) {
      (0, _array.fastRemoveAt)(this.bodies, index);
    }
  }

  emitTriggerEvent() {
    let shapeA;
    let shapeB;

    for (let i = 0; i < this.shapeArr.length; i += 2) {
      shapeA = this.shapeArr[i];
      shapeB = this.shapeArr[i + 1];
      TriggerEventObject.selfCollider = shapeA.collider;
      TriggerEventObject.otherCollider = shapeB.collider;

      this._collisionMatrix.set(shapeA.id, shapeB.id, true);

      if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
        // emit stay
        TriggerEventObject.type = 'onTriggerStay';
      } else {
        // first trigger, emit enter
        TriggerEventObject.type = 'onTriggerEnter';
      }

      if (shapeA.collider) {
        shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
      }

      TriggerEventObject.selfCollider = shapeB.collider;
      TriggerEventObject.otherCollider = shapeA.collider;

      if (shapeB.collider) {
        shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
      }
    }

    for (let i = 0; i < this._shapeArrPrev.length; i += 2) {
      shapeA = this._shapeArrPrev[i];
      shapeB = this._shapeArrPrev[i + 1];

      if (this._collisionMatrixPrev.get(shapeA.id, shapeB.id)) {
        if (!this._collisionMatrix.get(shapeA.id, shapeB.id)) {
          // emit exit
          TriggerEventObject.type = 'onTriggerExit';
          TriggerEventObject.selfCollider = shapeA.collider;
          TriggerEventObject.otherCollider = shapeB.collider;

          if (shapeA.collider) {
            shapeA.collider.emit(TriggerEventObject.type, TriggerEventObject);
          }

          TriggerEventObject.selfCollider = shapeB.collider;
          TriggerEventObject.otherCollider = shapeA.collider;

          if (shapeB.collider) {
            shapeB.collider.emit(TriggerEventObject.type, TriggerEventObject);
          }

          this._collisionMatrix.set(shapeA.id, shapeB.id, false);
        }
      }
    }

    const temp = this._collisionMatrixPrev.matrix;
    this._collisionMatrixPrev.matrix = this._collisionMatrix.matrix;
    this._collisionMatrix.matrix = temp;

    this._collisionMatrix.reset();
  }

}

exports.BuiltInWorld = BuiltInWorld;