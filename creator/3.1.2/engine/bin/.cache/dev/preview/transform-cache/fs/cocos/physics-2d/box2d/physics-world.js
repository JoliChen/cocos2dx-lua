System.register("q-bundled:///fs/cocos/physics-2d/box2d/physics-world.js", ["@cocos/box2d", "../../../../virtual/internal%253Aconstants.js", "../../core/index.js", "../framework/physics-types.js", "../../core/utils/js.js", "../../2d/framework/index.js", "../../2d/components/index.js", "./platform/physics-contact-listener.js", "./platform/physics-aabb-query-callback.js", "./platform/physics-ray-cast-callback.js", "./physics-contact.js", "../framework/index.js", "./platform/physics-debug-draw.js"], function (_export, _context) {
  "use strict";

  var b2, EDITOR, Vec3, Quat, toRadian, Vec2, toDegree, Node, CCObject, find, director, PHYSICS_2D_PTM_RATIO, ERaycast2DType, ERigidBody2DType, array, Canvas, Graphics, PhysicsContactListener, PhysicsAABBQueryCallback, PhysicsRayCastCallback, PhysicsContact, Contact2DType, PhysicsDebugDraw, tempVec3, tempVec2_1, tempVec2_2, temoBodyDef, tempB2AABB, testResults, b2PhysicsWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreIndexJs) {
      Vec3 = _coreIndexJs.Vec3;
      Quat = _coreIndexJs.Quat;
      toRadian = _coreIndexJs.toRadian;
      Vec2 = _coreIndexJs.Vec2;
      toDegree = _coreIndexJs.toDegree;
      Node = _coreIndexJs.Node;
      CCObject = _coreIndexJs.CCObject;
      find = _coreIndexJs.find;
      director = _coreIndexJs.director;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
      ERaycast2DType = _frameworkPhysicsTypesJs.ERaycast2DType;
      ERigidBody2DType = _frameworkPhysicsTypesJs.ERigidBody2DType;
    }, function (_coreUtilsJsJs) {
      array = _coreUtilsJsJs.array;
    }, function (_dFrameworkIndexJs) {
      Canvas = _dFrameworkIndexJs.Canvas;
    }, function (_dComponentsIndexJs) {
      Graphics = _dComponentsIndexJs.Graphics;
    }, function (_platformPhysicsContactListenerJs) {
      PhysicsContactListener = _platformPhysicsContactListenerJs.PhysicsContactListener;
    }, function (_platformPhysicsAabbQueryCallbackJs) {
      PhysicsAABBQueryCallback = _platformPhysicsAabbQueryCallbackJs.PhysicsAABBQueryCallback;
    }, function (_platformPhysicsRayCastCallbackJs) {
      PhysicsRayCastCallback = _platformPhysicsRayCastCallbackJs.PhysicsRayCastCallback;
    }, function (_physicsContactJs) {
      PhysicsContact = _physicsContactJs.PhysicsContact;
    }, function (_frameworkIndexJs) {
      Contact2DType = _frameworkIndexJs.Contact2DType;
    }, function (_platformPhysicsDebugDrawJs) {
      PhysicsDebugDraw = _platformPhysicsDebugDrawJs.PhysicsDebugDraw;
    }],
    execute: function () {
      tempVec3 = new Vec3();
      tempVec2_1 = new Vec2();
      tempVec2_2 = new Vec2();
      temoBodyDef = new b2.BodyDef();
      tempB2AABB = new b2.AABB();
      testResults = [];

      _export("b2PhysicsWorld", b2PhysicsWorld = /*#__PURE__*/function () {
        function b2PhysicsWorld() {
          this._world = void 0;
          this._bodies = [];
          this._animatedBodies = [];
          this._rotationAxis = new Vec3();
          this._contactListener = void 0;
          this._aabbQueryCallback = void 0;
          this._raycastQueryCallback = void 0;
          this._debugGraphics = null;
          this._b2DebugDrawer = null;
          this._debugDrawFlags = 0;
          this._world = new b2.World(new b2.Vec2(0, -10));
          var listener = new PhysicsContactListener();
          listener.setBeginContact(this._onBeginContact);
          listener.setEndContact(this._onEndContact);
          listener.setPreSolve(this._onPreSolve);
          listener.setPostSolve(this._onPostSolve);

          this._world.SetContactListener(listener);

          this._contactListener = listener;
          this._aabbQueryCallback = new PhysicsAABBQueryCallback();
          this._raycastQueryCallback = new PhysicsRayCastCallback();
        }

        var _proto = b2PhysicsWorld.prototype;

        _proto._checkDebugDrawValid = function _checkDebugDrawValid() {
          if (EDITOR) return;

          if (!this._debugGraphics || !this._debugGraphics.isValid) {
            var canvas = find('Canvas');

            if (!canvas) {
              var scene = director.getScene();

              if (!scene) {
                return;
              }

              canvas = new Node('Canvas');
              canvas.addComponent(Canvas);
              canvas.parent = scene;
            }

            var node = new Node('PHYSICS_2D_DEBUG_DRAW'); // node.zIndex = cc.macro.MAX_ZINDEX;

            node.hideFlags |= CCObject.Flags.DontSave;
            node.parent = canvas;
            node.worldPosition = Vec3.ZERO;
            this._debugGraphics = node.addComponent(Graphics);
            this._debugGraphics.lineWidth = 2;
            var debugDraw = new PhysicsDebugDraw(this._debugGraphics);
            this._b2DebugDrawer = debugDraw;

            this._world.SetDebugDraw(debugDraw);
          }

          var parent = this._debugGraphics.node.parent;

          this._debugGraphics.node.setSiblingIndex(parent.children.length - 1);

          if (this._b2DebugDrawer) {
            this._b2DebugDrawer.SetFlags(this.debugDrawFlags);
          }
        };

        _proto.setGravity = function setGravity(v) {
          this._world.SetGravity(v);
        };

        _proto.setAllowSleep = function setAllowSleep(v) {
          this._world.SetAllowSleeping(true);
        };

        _proto.step = function step(deltaTime, velocityIterations, positionIterations) {
          if (velocityIterations === void 0) {
            velocityIterations = 10;
          }

          if (positionIterations === void 0) {
            positionIterations = 10;
          }

          var animatedBodies = this._animatedBodies;

          for (var i = 0, l = animatedBodies.length; i < l; i++) {
            animatedBodies[i].animate(deltaTime);
          }

          this._world.Step(deltaTime, velocityIterations, positionIterations);
        };

        _proto.raycast = function raycast(p1, p2, type, mask) {
          if (p1.equals(p2)) {
            return [];
          }

          type = type || ERaycast2DType.Closest;
          tempVec2_1.x = p1.x / PHYSICS_2D_PTM_RATIO;
          tempVec2_1.y = p1.y / PHYSICS_2D_PTM_RATIO;
          tempVec2_2.x = p2.x / PHYSICS_2D_PTM_RATIO;
          tempVec2_2.y = p2.y / PHYSICS_2D_PTM_RATIO;
          var callback = this._raycastQueryCallback;
          callback.init(type, mask);

          this._world.RayCast(callback, tempVec2_1, tempVec2_2);

          var fixtures = callback.getFixtures();

          if (fixtures.length > 0) {
            var points = callback.getPoints();
            var normals = callback.getNormals();
            var fractions = callback.getFractions();
            var results = [];

            for (var i = 0, l = fixtures.length; i < l; i++) {
              var fixture = fixtures[i];
              var shape = fixture.m_userData;
              var collider = shape.collider;

              if (type === ERaycast2DType.AllClosest) {
                var result = void 0;

                for (var j = 0; j < results.length; j++) {
                  if (results[j].collider === collider) {
                    result = results[j];
                  }
                }

                if (result) {
                  if (fractions[i] < result.fraction) {
                    result.fixtureIndex = shape.getFixtureIndex(fixture);
                    result.point.x = points[i].x * PHYSICS_2D_PTM_RATIO;
                    result.point.y = points[i].y * PHYSICS_2D_PTM_RATIO;
                    result.normal.x = normals[i].x;
                    result.normal.y = normals[i].y;
                    result.fraction = fractions[i];
                  }

                  continue;
                }
              }

              results.push({
                collider: collider,
                fixtureIndex: shape.getFixtureIndex(fixture),
                point: new Vec2(points[i].x * PHYSICS_2D_PTM_RATIO, points[i].y * PHYSICS_2D_PTM_RATIO),
                normal: new Vec2(normals[i].x, normals[i].y),
                fraction: fractions[i]
              });
            }

            return results;
          }

          return [];
        };

        _proto.syncPhysicsToScene = function syncPhysicsToScene() {
          var bodies = this._bodies;

          for (var i = 0, l = bodies.length; i < l; i++) {
            var body = bodies[i];
            var bodyComp = body.rigidBody;

            if (bodyComp.type === ERigidBody2DType.Animated) {
              body.resetVelocity();
              continue;
            }

            var node = bodyComp.node;
            var b2body = body.impl; // position

            var pos = b2body.GetPosition();
            tempVec3.x = pos.x * PHYSICS_2D_PTM_RATIO;
            tempVec3.y = pos.y * PHYSICS_2D_PTM_RATIO;
            tempVec3.z = 0;
            node.worldPosition = tempVec3; // rotation

            var angle = toDegree(b2body.GetAngle());
            node.setWorldRotationFromEuler(0, 0, angle);
          }
        };

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {
          var bodies = this._bodies;

          for (var i = 0; i < bodies.length; i++) {
            bodies[i].syncRotationToPhysics();
            bodies[i].syncPositionToPhysics();
          }
        };

        _proto.addBody = function addBody(body) {
          var bodies = this._bodies;

          if (bodies.includes(body)) {
            return;
          }

          var bodyDef = temoBodyDef;
          var comp = body.rigidBody;
          bodyDef.allowSleep = comp.allowSleep;
          bodyDef.gravityScale = comp.gravityScale;
          bodyDef.linearDamping = comp.linearDamping;
          bodyDef.angularDamping = comp.angularDamping;
          bodyDef.fixedRotation = comp.fixedRotation;
          bodyDef.bullet = comp.bullet;
          var node = comp.node;
          var pos = node.worldPosition;
          bodyDef.position.Set(pos.x / PHYSICS_2D_PTM_RATIO, pos.y / PHYSICS_2D_PTM_RATIO);
          tempVec3.z = Quat.getAxisAngle(this._rotationAxis, node.worldRotation);
          bodyDef.angle = tempVec3.z;
          bodyDef.awake = comp.awakeOnLoad;

          if (comp.type === ERigidBody2DType.Animated) {
            bodyDef.type = ERigidBody2DType.Kinematic;

            this._animatedBodies.push(body);

            body._animatedPos.set(bodyDef.position.x, bodyDef.position.y);

            body._animatedAngle = bodyDef.angle;
          } else {
            bodyDef.type = comp.type;
          } // read private property


          var compPrivate = comp;
          var linearVelocity = compPrivate._linearVelocity;
          bodyDef.linearVelocity.Set(linearVelocity.x, linearVelocity.y);
          bodyDef.angularVelocity = toRadian(compPrivate._angularVelocity);

          var b2Body = this._world.CreateBody(bodyDef);

          b2Body.m_userData = body;
          body._imp = b2Body;

          this._bodies.push(body);
        };

        _proto.removeBody = function removeBody(body) {
          if (!this._bodies.includes(body)) {
            return;
          }

          if (body.impl) {
            body.impl.m_userData = null;

            this._world.DestroyBody(body.impl);

            body._imp = null;
          }

          array.remove(this._bodies, body);
          var comp = body.rigidBody;

          if (comp.type === ERigidBody2DType.Animated) {
            array.remove(this._animatedBodies, body);
          }
        };

        _proto.registerContactFixture = function registerContactFixture(fixture) {
          this._contactListener.registerContactFixture(fixture);
        };

        _proto.unregisterContactFixture = function unregisterContactFixture(fixture) {
          this._contactListener.unregisterContactFixture(fixture);
        };

        _proto.testPoint = function testPoint(point) {
          var x = tempVec2_1.x = point.x / PHYSICS_2D_PTM_RATIO;
          var y = tempVec2_1.y = point.y / PHYSICS_2D_PTM_RATIO;
          var d = 0.2 / PHYSICS_2D_PTM_RATIO;
          tempB2AABB.lowerBound.x = x - d;
          tempB2AABB.lowerBound.y = y - d;
          tempB2AABB.upperBound.x = x + d;
          tempB2AABB.upperBound.y = y + d;
          var callback = this._aabbQueryCallback;
          callback.init(tempVec2_1);

          this._world.QueryAABB(callback, tempB2AABB);

          var fixtures = callback.getFixtures();
          testResults.length = 0;

          for (var i = 0; i < fixtures.length; i++) {
            var collider = fixtures[i].m_userData.collider;

            if (!testResults.includes(collider)) {
              testResults.push(collider);
            }
          }

          return testResults;
        };

        _proto.testAABB = function testAABB(rect) {
          tempB2AABB.lowerBound.x = rect.xMin / PHYSICS_2D_PTM_RATIO;
          tempB2AABB.lowerBound.y = rect.yMin / PHYSICS_2D_PTM_RATIO;
          tempB2AABB.upperBound.x = rect.xMax / PHYSICS_2D_PTM_RATIO;
          tempB2AABB.upperBound.y = rect.yMax / PHYSICS_2D_PTM_RATIO;
          var callback = this._aabbQueryCallback;
          callback.init();

          this._world.QueryAABB(callback, tempB2AABB);

          var fixtures = callback.getFixtures();
          testResults.length = 0;

          for (var i = 0; i < fixtures.length; i++) {
            var collider = fixtures[i].m_userData.collider;

            if (!testResults.includes(collider)) {
              testResults.push(collider);
            }
          }

          return testResults;
        };

        _proto.drawDebug = function drawDebug() {
          this._checkDebugDrawValid();

          if (!this._debugGraphics) {
            return;
          }

          this._debugGraphics.clear();

          this._world.DrawDebugData();
        };

        _proto._onBeginContact = function _onBeginContact(b2contact) {
          var c = PhysicsContact.get(b2contact);
          c.emit(Contact2DType.BEGIN_CONTACT);
        };

        _proto._onEndContact = function _onEndContact(b2contact) {
          var c = b2contact.m_userData;

          if (!c) {
            return;
          }

          c.emit(Contact2DType.END_CONTACT);
          PhysicsContact.put(b2contact);
        };

        _proto._onPreSolve = function _onPreSolve(b2contact) {
          var c = b2contact.m_userData;

          if (!c) {
            return;
          }

          c.emit(Contact2DType.PRE_SOLVE);
        };

        _proto._onPostSolve = function _onPostSolve(b2contact, impulse) {
          var c = b2contact.m_userData;

          if (!c) {
            return;
          } // impulse only survive during post sole callback


          c._setImpulse(impulse);

          c.emit(Contact2DType.POST_SOLVE);

          c._setImpulse(null);
        };

        _createClass(b2PhysicsWorld, [{
          key: "impl",
          get: function get() {
            return this._world;
          }
        }, {
          key: "debugDrawFlags",
          get: function get() {
            return this._debugDrawFlags;
          },
          set: function set(v) {
            if (EDITOR) return;

            if (!v) {
              if (this._debugGraphics) {
                this._debugGraphics.node.parent = null;
              }
            }

            this._debugDrawFlags = v;
          }
        }]);

        return b2PhysicsWorld;
      }());
    }
  };
});