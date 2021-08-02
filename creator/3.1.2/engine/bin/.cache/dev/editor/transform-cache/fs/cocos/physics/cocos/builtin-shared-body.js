"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinSharedBody = void 0;

var _index = require("../../core/math/index.js");

var _index2 = require("../../core/geometry/index.js");

var _builtinObject = require("./object/builtin-object.js");

var _index3 = require("../framework/index.js");

var _physicsEnum = require("../framework/physics-enum.js");

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
const m4_0 = new _index.Mat4();
const v3_0 = new _index.Vec3();
const v3_1 = new _index.Vec3();
const quat_0 = new _index.Quat();
/**
 * Built-in static collider, no physical forces involved
 */

class BuiltinSharedBody extends _builtinObject.BuiltinObject {
  static getSharedBody(node, wrappedWorld, wrappedBody) {
    const key = node.uuid;
    let newSB;

    if (BuiltinSharedBody.sharedBodesMap.has(key)) {
      newSB = BuiltinSharedBody.sharedBodesMap.get(key);
    } else {
      newSB = new BuiltinSharedBody(node, wrappedWorld);
      const g = _physicsEnum.PhysicsGroup.DEFAULT;
      const m = _index3.PhysicsSystem.instance.collisionMatrix[g];
      newSB.collisionFilterGroup = g;
      newSB.collisionFilterMask = m;
      BuiltinSharedBody.sharedBodesMap.set(node.uuid, newSB);
    }

    if (wrappedBody) {
      newSB.wrappedBody = wrappedBody;
      const g = wrappedBody.rigidBody._group;
      const m = _index3.PhysicsSystem.instance.collisionMatrix[g];
      newSB.collisionFilterGroup = g;
      newSB.collisionFilterMask = m;
    }

    return newSB;
  }

  get id() {
    return this._id;
  }
  /**
   * add or remove from world \
   * add, if enable \
   * remove, if disable & shapes.length == 0 & wrappedBody disable
   */


  set enabled(v) {
    if (v) {
      if (this.index < 0) {
        this.index = this.world.bodies.length;
        this.world.addSharedBody(this);
        this.syncInitial();
      }
    } else if (this.index >= 0) {
      const isRemove = this.shapes.length === 0;

      if (isRemove) {
        this.index = -1;
        this.world.removeSharedBody(this);
      }
    }
  }

  set reference(v) {
    // eslint-disable-next-line no-unused-expressions
    v ? this.ref++ : this.ref--;

    if (this.ref === 0) {
      this.destroy();
    }
  }
  /** id generator */


  constructor(node, world) {
    super();
    this._id = void 0;
    this.index = -1;
    this.ref = 0;
    this.node = void 0;
    this.world = void 0;
    this.shapes = [];
    this.wrappedBody = null;
    this._id = BuiltinSharedBody.idCounter++;
    this.node = node;
    this.world = world;
  }

  intersects(body) {
    for (let i = 0; i < this.shapes.length; i++) {
      const shapeA = this.shapes[i];

      for (let j = 0; j < body.shapes.length; j++) {
        const shapeB = body.shapes[j];

        if (shapeA.collider.needTriggerEvent || shapeB.collider.needTriggerEvent) {
          if (_index2.intersect.resolve(shapeA.worldShape, shapeB.worldShape)) {
            this.world.shapeArr.push(shapeA);
            this.world.shapeArr.push(shapeB);
          }
        }
      }
    }
  }

  addShape(shape) {
    const i = this.shapes.indexOf(shape);

    if (i < 0) {
      this.shapes.push(shape);
    }
  }

  removeShape(shape) {
    const i = this.shapes.indexOf(shape);

    if (i >= 0) {
      (0, _array.fastRemoveAt)(this.shapes, i);
    }
  }

  syncSceneToPhysics() {
    if (this.node.hasChangedFlags) {
      this.node.getWorldMatrix(m4_0);
      v3_0.set(this.node.worldPosition);
      quat_0.set(this.node.worldRotation);
      v3_1.set(this.node.worldScale);

      for (let i = 0; i < this.shapes.length; i++) {
        this.shapes[i].transform(m4_0, v3_0, quat_0, v3_1);
      }
    }
  }

  syncInitial() {
    this.node.getWorldMatrix(m4_0);
    v3_0.set(this.node.worldPosition);
    quat_0.set(this.node.worldRotation);
    v3_1.set(this.node.worldScale);

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].transform(m4_0, v3_0, quat_0, v3_1);
    }
  }

  destroy() {
    BuiltinSharedBody.sharedBodesMap.delete(this.node.uuid);
    this.node = null;
    this.world = null;
    this.shapes = null;
  }

}

exports.BuiltinSharedBody = BuiltinSharedBody;
BuiltinSharedBody.sharedBodesMap = new Map();
BuiltinSharedBody.idCounter = 0;