"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2PhysicsWorld = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../core/index.js");

var _physicsTypes = require("../framework/physics-types.js");

var _js = require("../../core/utils/js.js");

var _index2 = require("../../2d/framework/index.js");

var _index3 = require("../../2d/components/index.js");

var _physicsContactListener = require("./platform/physics-contact-listener.js");

var _physicsAabbQueryCallback = require("./platform/physics-aabb-query-callback.js");

var _physicsRayCastCallback = require("./platform/physics-ray-cast-callback.js");

var _physicsContact = require("./physics-contact.js");

var _index4 = require("../framework/index.js");

var _physicsDebugDraw = require("./platform/physics-debug-draw.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempVec3 = new _index.Vec3();
const tempVec2_1 = new _index.Vec2();
const tempVec2_2 = new _index.Vec2();
const temoBodyDef = new _box2d.default.BodyDef();
const tempB2AABB = new _box2d.default.AABB();
const testResults = [];

class b2PhysicsWorld {
  get impl() {
    return this._world;
  }

  constructor() {
    this._world = void 0;
    this._bodies = [];
    this._animatedBodies = [];
    this._rotationAxis = new _index.Vec3();
    this._contactListener = void 0;
    this._aabbQueryCallback = void 0;
    this._raycastQueryCallback = void 0;
    this._debugGraphics = null;
    this._b2DebugDrawer = null;
    this._debugDrawFlags = 0;
    this._world = new _box2d.default.World(new _box2d.default.Vec2(0, -10));
    const listener = new _physicsContactListener.PhysicsContactListener();
    listener.setBeginContact(this._onBeginContact);
    listener.setEndContact(this._onEndContact);
    listener.setPreSolve(this._onPreSolve);
    listener.setPostSolve(this._onPostSolve);

    this._world.SetContactListener(listener);

    this._contactListener = listener;
    this._aabbQueryCallback = new _physicsAabbQueryCallback.PhysicsAABBQueryCallback();
    this._raycastQueryCallback = new _physicsRayCastCallback.PhysicsRayCastCallback();
  }

  get debugDrawFlags() {
    return this._debugDrawFlags;
  }

  set debugDrawFlags(v) {
    if (_internal253Aconstants.EDITOR) return;

    if (!v) {
      if (this._debugGraphics) {
        this._debugGraphics.node.parent = null;
      }
    }

    this._debugDrawFlags = v;
  }

  _checkDebugDrawValid() {
    if (_internal253Aconstants.EDITOR) return;

    if (!this._debugGraphics || !this._debugGraphics.isValid) {
      let canvas = (0, _index.find)('Canvas');

      if (!canvas) {
        const scene = _index.director.getScene();

        if (!scene) {
          return;
        }

        canvas = new _index.Node('Canvas');
        canvas.addComponent(_index2.Canvas);
        canvas.parent = scene;
      }

      const node = new _index.Node('PHYSICS_2D_DEBUG_DRAW'); // node.zIndex = cc.macro.MAX_ZINDEX;

      node.hideFlags |= _index.CCObject.Flags.DontSave;
      node.parent = canvas;
      node.worldPosition = _index.Vec3.ZERO;
      this._debugGraphics = node.addComponent(_index3.Graphics);
      this._debugGraphics.lineWidth = 2;
      const debugDraw = new _physicsDebugDraw.PhysicsDebugDraw(this._debugGraphics);
      this._b2DebugDrawer = debugDraw;

      this._world.SetDebugDraw(debugDraw);
    }

    const parent = this._debugGraphics.node.parent;

    this._debugGraphics.node.setSiblingIndex(parent.children.length - 1);

    if (this._b2DebugDrawer) {
      this._b2DebugDrawer.SetFlags(this.debugDrawFlags);
    }
  }

  setGravity(v) {
    this._world.SetGravity(v);
  }

  setAllowSleep(v) {
    this._world.SetAllowSleeping(true);
  }

  step(deltaTime, velocityIterations = 10, positionIterations = 10) {
    const animatedBodies = this._animatedBodies;

    for (let i = 0, l = animatedBodies.length; i < l; i++) {
      animatedBodies[i].animate(deltaTime);
    }

    this._world.Step(deltaTime, velocityIterations, positionIterations);
  }

  raycast(p1, p2, type, mask) {
    if (p1.equals(p2)) {
      return [];
    }

    type = type || _physicsTypes.ERaycast2DType.Closest;
    tempVec2_1.x = p1.x / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempVec2_1.y = p1.y / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempVec2_2.x = p2.x / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempVec2_2.y = p2.y / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    const callback = this._raycastQueryCallback;
    callback.init(type, mask);

    this._world.RayCast(callback, tempVec2_1, tempVec2_2);

    const fixtures = callback.getFixtures();

    if (fixtures.length > 0) {
      const points = callback.getPoints();
      const normals = callback.getNormals();
      const fractions = callback.getFractions();
      const results = [];

      for (let i = 0, l = fixtures.length; i < l; i++) {
        const fixture = fixtures[i];
        const shape = fixture.m_userData;
        const collider = shape.collider;

        if (type === _physicsTypes.ERaycast2DType.AllClosest) {
          let result;

          for (let j = 0; j < results.length; j++) {
            if (results[j].collider === collider) {
              result = results[j];
            }
          }

          if (result) {
            if (fractions[i] < result.fraction) {
              result.fixtureIndex = shape.getFixtureIndex(fixture);
              result.point.x = points[i].x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
              result.point.y = points[i].y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
              result.normal.x = normals[i].x;
              result.normal.y = normals[i].y;
              result.fraction = fractions[i];
            }

            continue;
          }
        }

        results.push({
          collider,
          fixtureIndex: shape.getFixtureIndex(fixture),
          point: new _index.Vec2(points[i].x * _physicsTypes.PHYSICS_2D_PTM_RATIO, points[i].y * _physicsTypes.PHYSICS_2D_PTM_RATIO),
          normal: new _index.Vec2(normals[i].x, normals[i].y),
          fraction: fractions[i]
        });
      }

      return results;
    }

    return [];
  }

  syncPhysicsToScene() {
    const bodies = this._bodies;

    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      const bodyComp = body.rigidBody;

      if (bodyComp.type === _physicsTypes.ERigidBody2DType.Animated) {
        body.resetVelocity();
        continue;
      }

      const node = bodyComp.node;
      const b2body = body.impl; // position

      const pos = b2body.GetPosition();
      tempVec3.x = pos.x * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      tempVec3.y = pos.y * _physicsTypes.PHYSICS_2D_PTM_RATIO;
      tempVec3.z = 0;
      node.worldPosition = tempVec3; // rotation

      const angle = (0, _index.toDegree)(b2body.GetAngle());
      node.setWorldRotationFromEuler(0, 0, angle);
    }
  }

  syncSceneToPhysics() {
    const bodies = this._bodies;

    for (let i = 0; i < bodies.length; i++) {
      bodies[i].syncRotationToPhysics();
      bodies[i].syncPositionToPhysics();
    }
  }

  addBody(body) {
    const bodies = this._bodies;

    if (bodies.includes(body)) {
      return;
    }

    const bodyDef = temoBodyDef;
    const comp = body.rigidBody;
    bodyDef.allowSleep = comp.allowSleep;
    bodyDef.gravityScale = comp.gravityScale;
    bodyDef.linearDamping = comp.linearDamping;
    bodyDef.angularDamping = comp.angularDamping;
    bodyDef.fixedRotation = comp.fixedRotation;
    bodyDef.bullet = comp.bullet;
    const node = comp.node;
    const pos = node.worldPosition;
    bodyDef.position.Set(pos.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, pos.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    tempVec3.z = _index.Quat.getAxisAngle(this._rotationAxis, node.worldRotation);
    bodyDef.angle = tempVec3.z;
    bodyDef.awake = comp.awakeOnLoad;

    if (comp.type === _physicsTypes.ERigidBody2DType.Animated) {
      bodyDef.type = _physicsTypes.ERigidBody2DType.Kinematic;

      this._animatedBodies.push(body);

      body._animatedPos.set(bodyDef.position.x, bodyDef.position.y);

      body._animatedAngle = bodyDef.angle;
    } else {
      bodyDef.type = comp.type;
    } // read private property


    const compPrivate = comp;
    const linearVelocity = compPrivate._linearVelocity;
    bodyDef.linearVelocity.Set(linearVelocity.x, linearVelocity.y);
    bodyDef.angularVelocity = (0, _index.toRadian)(compPrivate._angularVelocity);

    const b2Body = this._world.CreateBody(bodyDef);

    b2Body.m_userData = body;
    body._imp = b2Body;

    this._bodies.push(body);
  }

  removeBody(body) {
    if (!this._bodies.includes(body)) {
      return;
    }

    if (body.impl) {
      body.impl.m_userData = null;

      this._world.DestroyBody(body.impl);

      body._imp = null;
    }

    _js.array.remove(this._bodies, body);

    const comp = body.rigidBody;

    if (comp.type === _physicsTypes.ERigidBody2DType.Animated) {
      _js.array.remove(this._animatedBodies, body);
    }
  }

  registerContactFixture(fixture) {
    this._contactListener.registerContactFixture(fixture);
  }

  unregisterContactFixture(fixture) {
    this._contactListener.unregisterContactFixture(fixture);
  }

  testPoint(point) {
    const x = tempVec2_1.x = point.x / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    const y = tempVec2_1.y = point.y / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    const d = 0.2 / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempB2AABB.lowerBound.x = x - d;
    tempB2AABB.lowerBound.y = y - d;
    tempB2AABB.upperBound.x = x + d;
    tempB2AABB.upperBound.y = y + d;
    const callback = this._aabbQueryCallback;
    callback.init(tempVec2_1);

    this._world.QueryAABB(callback, tempB2AABB);

    const fixtures = callback.getFixtures();
    testResults.length = 0;

    for (let i = 0; i < fixtures.length; i++) {
      const collider = fixtures[i].m_userData.collider;

      if (!testResults.includes(collider)) {
        testResults.push(collider);
      }
    }

    return testResults;
  }

  testAABB(rect) {
    tempB2AABB.lowerBound.x = rect.xMin / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempB2AABB.lowerBound.y = rect.yMin / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempB2AABB.upperBound.x = rect.xMax / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    tempB2AABB.upperBound.y = rect.yMax / _physicsTypes.PHYSICS_2D_PTM_RATIO;
    const callback = this._aabbQueryCallback;
    callback.init();

    this._world.QueryAABB(callback, tempB2AABB);

    const fixtures = callback.getFixtures();
    testResults.length = 0;

    for (let i = 0; i < fixtures.length; i++) {
      const collider = fixtures[i].m_userData.collider;

      if (!testResults.includes(collider)) {
        testResults.push(collider);
      }
    }

    return testResults;
  }

  drawDebug() {
    this._checkDebugDrawValid();

    if (!this._debugGraphics) {
      return;
    }

    this._debugGraphics.clear();

    this._world.DrawDebugData();
  }

  _onBeginContact(b2contact) {
    const c = _physicsContact.PhysicsContact.get(b2contact);

    c.emit(_index4.Contact2DType.BEGIN_CONTACT);
  }

  _onEndContact(b2contact) {
    const c = b2contact.m_userData;

    if (!c) {
      return;
    }

    c.emit(_index4.Contact2DType.END_CONTACT);

    _physicsContact.PhysicsContact.put(b2contact);
  }

  _onPreSolve(b2contact) {
    const c = b2contact.m_userData;

    if (!c) {
      return;
    }

    c.emit(_index4.Contact2DType.PRE_SOLVE);
  }

  _onPostSolve(b2contact, impulse) {
    const c = b2contact.m_userData;

    if (!c) {
      return;
    } // impulse only survive during post sole callback


    c._setImpulse(impulse);

    c.emit(_index4.Contact2DType.POST_SOLVE);

    c._setImpulse(null);
  }

}

exports.b2PhysicsWorld = b2PhysicsWorld;