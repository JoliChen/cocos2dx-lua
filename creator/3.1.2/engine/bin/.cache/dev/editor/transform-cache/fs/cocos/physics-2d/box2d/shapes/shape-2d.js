"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2Shape2D = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _physics2dFramework = require("../../../../exports/physics-2d-framework.js");

var _index = require("../../../core/index.js");

var _physicsEnum = require("../../../physics/framework/physics-enum.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempFilter = new _box2d.default.Filter();

function getFilter(shape) {
  const comp = shape.collider;
  tempFilter.categoryBits = comp.group === _physicsEnum.PhysicsGroup.DEFAULT ? comp.body.group : comp.group;
  tempFilter.maskBits = _physics2dFramework.PhysicsSystem2D.instance.collisionMatrix[tempFilter.categoryBits];
  return tempFilter;
}

class b2Shape2D {
  constructor() {
    this._shapes = [];
    this._fixtures = [];
    this._collider = null;
    this._body = null;
    this._inited = false;
    this._rect = new _index.Rect();
  }

  get impl() {
    return this._shapes;
  }

  get collider() {
    return this._collider;
  }

  initialize(comp) {
    this._collider = comp;
  }

  onLoad() {}

  onEnable() {
    _physics2dFramework.PhysicsSystem2D.instance._callAfterStep(this, this._init);
  }

  onDisable() {
    _physics2dFramework.PhysicsSystem2D.instance._callAfterStep(this, this._destroy);
  }

  start() {}

  onGroupChanged() {
    const filter = getFilter(this);

    this._fixtures.forEach(f => {
      f.SetFilterData(filter);
    });
  }

  apply() {
    this._destroy();

    this._init();
  }

  get worldAABB() {
    const MAX = 10e6;
    let minX = MAX;
    let minY = MAX;
    let maxX = -MAX;
    let maxY = -MAX;
    const fixtures = this._fixtures;

    for (let i = 0; i < fixtures.length; i++) {
      const fixture = fixtures[i];
      const count = fixture.GetShape().GetChildCount();

      for (let j = 0; j < count; j++) {
        const aabb = fixture.GetAABB(j);
        if (aabb.lowerBound.x < minX) minX = aabb.lowerBound.x;
        if (aabb.lowerBound.y < minY) minY = aabb.lowerBound.y;
        if (aabb.upperBound.x > maxX) maxX = aabb.upperBound.x;
        if (aabb.upperBound.y > maxY) maxY = aabb.upperBound.y;
      }
    }

    minX *= _physics2dFramework.PHYSICS_2D_PTM_RATIO;
    minY *= _physics2dFramework.PHYSICS_2D_PTM_RATIO;
    maxX *= _physics2dFramework.PHYSICS_2D_PTM_RATIO;
    maxY *= _physics2dFramework.PHYSICS_2D_PTM_RATIO;
    const r = this._rect;
    r.x = minX;
    r.y = minY;
    r.width = maxX - minX;
    r.height = maxY - minY;
    return r;
  }

  getFixtureIndex(fixture) {
    return this._fixtures.indexOf(fixture);
  }

  _createShapes(scaleX, scaleY) {
    return [];
  }

  _init() {
    var _body$impl;

    if (this._inited) return;
    const comp = this.collider;
    const body = comp.getComponent(_physics2dFramework.RigidBody2D);
    if (!body) return;
    const innerBody = (_body$impl = body.impl) === null || _body$impl === void 0 ? void 0 : _body$impl.impl;
    if (!innerBody) return;
    const node = body.node;
    const scale = node.worldScale;
    const shapes = scale.x === 0 && scale.y === 0 ? [] : this._createShapes(scale.x, scale.y);
    const filter = getFilter(this);

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const fixDef = {
        density: comp.density,
        isSensor: comp.sensor,
        friction: comp.friction,
        restitution: comp.restitution,
        shape,
        filter
      };
      const fixture = innerBody.CreateFixture(fixDef);
      fixture.m_userData = this;

      if (body.enabledContactListener) {
        _physics2dFramework.PhysicsSystem2D.instance.physicsWorld.registerContactFixture(fixture);
      }

      this._shapes.push(shape);

      this._fixtures.push(fixture);
    }

    this._body = innerBody;
    this._inited = true;
  }

  _destroy() {
    if (!this._inited) return;
    const fixtures = this._fixtures;
    const body = this._body;

    for (let i = fixtures.length - 1; i >= 0; i--) {
      const fixture = fixtures[i];
      fixture.m_userData = null;

      _physics2dFramework.PhysicsSystem2D.instance.physicsWorld.unregisterContactFixture(fixture);

      if (body) {
        body.DestroyFixture(fixture);
      }
    }

    this._body = null;
    this._fixtures.length = 0;
    this._shapes.length = 0;
    this._inited = false;
  }

}

exports.b2Shape2D = b2Shape2D;