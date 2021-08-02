"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinShape2D = void 0;

var _physics2dFramework = require("../../../../exports/physics-2d-framework.js");

var _index = require("../../../core/index.js");

/**
 * @packageDocumentation
 * @hidden
 */
class BuiltinShape2D {
  constructor() {
    this._collider = null;
    this._worldAabb = new _index.Rect();
  }

  get impl() {
    return null;
  }

  get collider() {
    return this._collider;
  }

  apply() {}

  initialize(comp) {
    this._collider = comp;
  }

  onLoad() {}

  onEnable() {
    _physics2dFramework.PhysicsSystem2D.instance.physicsWorld.addShape(this);
  }

  onDisable() {
    _physics2dFramework.PhysicsSystem2D.instance.physicsWorld.removeShape(this);
  }

  start() {}

  update() {}

  get worldAABB() {
    return this._worldAabb;
  }

  containsPoint(p) {
    if (!this.worldAABB.contains(p)) {
      return false;
    }

    return true;
  }

  intersectsRect(rect) {
    if (!this.worldAABB.intersects(rect)) {
      return false;
    }

    return true;
  }

  onGroupChanged() {
    _physics2dFramework.PhysicsSystem2D.instance.physicsWorld.updateShapeGroup(this);
  }

}

exports.BuiltinShape2D = BuiltinShape2D;