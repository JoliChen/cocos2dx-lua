"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinShape = void 0;

var _index = require("../../../core/math/index.js");

var _physicsFramework = require("../../../../exports/physics-framework.js");

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
class BuiltinShape {
  constructor() {
    this.id = BuiltinShape.idCounter++;
  }

  getAABB(v) {}

  getBoundingSphere(v) {}

  updateEventListener() {}

  setMaterial(v) {}

  setAsTrigger(v) {}

  get attachedRigidBody() {
    return null;
  }

  setCenter(v) {
    _index.Vec3.copy(this._localShape.center, v);
  }

  get localShape() {
    return this._localShape;
  }

  get worldShape() {
    return this._worldShape;
  }

  get impl() {
    return this._worldShape;
  }

  get sharedBody() {
    return this._sharedBody;
  }

  get collider() {
    return this._collider;
  }
  /** id generator */


  initialize(comp) {
    this._collider = comp;
    this._sharedBody = _physicsFramework.PhysicsSystem.instance.physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  }

  onLoad() {
    this.setCenter(this._collider.center);
  }

  onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  }

  onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  }

  onDestroy() {
    this._sharedBody.reference = false;
    this._collider = null;
    this._localShape = null;
    this._worldShape = null;
  }

  transform(m, pos, rot, scale) {
    this._localShape.transform(m, pos, rot, scale, this._worldShape);
  }
  /** group */


  getGroup() {
    return this._sharedBody.getGroup();
  }

  setGroup(v) {
    this._sharedBody.setGroup(v);
  }

  addGroup(v) {
    this._sharedBody.addGroup(v);
  }

  removeGroup(v) {
    this._sharedBody.removeGroup(v);
  }
  /** mask */


  getMask() {
    return this._sharedBody.getMask();
  }

  setMask(v) {
    this._sharedBody.setMask(v);
  }

  addMask(v) {
    this._sharedBody.addMask(v);
  }

  removeMask(v) {
    this._sharedBody.removeMask(v);
  }

}

exports.BuiltinShape = BuiltinShape;
BuiltinShape.idCounter = 0;