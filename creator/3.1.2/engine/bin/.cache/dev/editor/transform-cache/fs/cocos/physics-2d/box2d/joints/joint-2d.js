"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2Joint = void 0;

var _index = require("../../framework/index.js");

/**
 * @packageDocumentation
 * @hidden
 */
class b2Joint {
  constructor() {
    this._b2joint = null;
    this._jointComp = null;
    this._body = null;
    this._inited = false;
  }

  get impl() {
    return this._b2joint;
  }

  get comp() {
    return this._jointComp;
  }

  get body() {
    return this._body;
  }

  initialize(comp) {
    this._jointComp = comp;
  }

  onEnable() {
    _index.PhysicsSystem2D.instance._callAfterStep(this, this._init);
  }

  onDisable() {
    _index.PhysicsSystem2D.instance._callAfterStep(this, this._destroy);
  } // need init after body and connected body init


  start() {
    _index.PhysicsSystem2D.instance._callAfterStep(this, this._init);
  }

  _init() {
    if (this._inited) return;
    const comp = this._jointComp;

    if (!comp.isValid) {
      return;
    }

    this._body = comp.getComponent(_index.RigidBody2D);

    const def = this._createJointDef();

    if (!def) {
      return;
    }

    const connectedBody = comp.connectedBody;

    if (!connectedBody || !connectedBody.enabledInHierarchy) {
      return;
    }

    def.bodyA = this._body.impl.impl;
    def.bodyB = connectedBody.impl.impl;
    def.collideConnected = comp.collideConnected;
    this._b2joint = _index.PhysicsSystem2D.instance.physicsWorld.impl.CreateJoint(def);
    this._inited = true;
  }

  _destroy() {
    if (!this._inited) return;

    _index.PhysicsSystem2D.instance.physicsWorld.impl.DestroyJoint(this._b2joint);

    this._b2joint = null;
    this._inited = false;
  }

  _createJointDef() {
    return null;
  }

  isValid() {
    return this._b2joint && this._body && this._body.impl && this._jointComp && this._jointComp.connectedBody && this._jointComp.connectedBody.impl;
  }

}

exports.b2Joint = b2Joint;