System.register("q-bundled:///fs/cocos/physics-2d/builtin/builtin-world.js", ["../../../../virtual/internal%253Aconstants.js", "../../2d/index.js", "../../core/index.js", "../../2d/framework/index.js", "./shapes/box-shape-2d.js", "./shapes/circle-shape-2d.js", "./shapes/polygon-shape-2d.js", "../framework/physics-types.js", "../framework/index.js", "./builtin-contact.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Graphics, Node, CCObject, find, director, Vec3, Color, Canvas, BuiltinBoxShape, BuiltinCircleShape, BuiltinPolygonShape, EPhysics2DDrawFlags, Contact2DType, PhysicsSystem2D, BuiltinContact, contactResults, testIntersectResults, BuiltinPhysicsWorld;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dIndexJs) {
      Graphics = _dIndexJs.Graphics;
    }, function (_coreIndexJs) {
      Node = _coreIndexJs.Node;
      CCObject = _coreIndexJs.CCObject;
      find = _coreIndexJs.find;
      director = _coreIndexJs.director;
      Vec3 = _coreIndexJs.Vec3;
      Color = _coreIndexJs.Color;
    }, function (_dFrameworkIndexJs) {
      Canvas = _dFrameworkIndexJs.Canvas;
    }, function (_shapesBoxShape2dJs) {
      BuiltinBoxShape = _shapesBoxShape2dJs.BuiltinBoxShape;
    }, function (_shapesCircleShape2dJs) {
      BuiltinCircleShape = _shapesCircleShape2dJs.BuiltinCircleShape;
    }, function (_shapesPolygonShape2dJs) {
      BuiltinPolygonShape = _shapesPolygonShape2dJs.BuiltinPolygonShape;
    }, function (_frameworkPhysicsTypesJs) {
      EPhysics2DDrawFlags = _frameworkPhysicsTypesJs.EPhysics2DDrawFlags;
      Contact2DType = _frameworkPhysicsTypesJs.Contact2DType;
    }, function (_frameworkIndexJs) {
      PhysicsSystem2D = _frameworkIndexJs.PhysicsSystem2D;
    }, function (_builtinContactJs) {
      BuiltinContact = _builtinContactJs.BuiltinContact;
    }],
    execute: function () {
      contactResults = [];
      testIntersectResults = [];

      _export("BuiltinPhysicsWorld", BuiltinPhysicsWorld = /*#__PURE__*/function () {
        function BuiltinPhysicsWorld() {
          this._contacts = [];
          this._shapes = [];
          this._debugGraphics = null;
          this._debugDrawFlags = 0;
        }

        var _proto = BuiltinPhysicsWorld.prototype;

        _proto.shouldCollide = function shouldCollide(c1, c2) {
          var collider1 = c1.collider;
          var collider2 = c2.collider;
          var collisionMatrix = PhysicsSystem2D.instance.collisionMatrix;
          return collider1 !== collider2 && collider1.node !== collider2.node && collisionMatrix[collider1.group] & collider2.group && collisionMatrix[collider2.group] & collider1.group;
        };

        _proto.addShape = function addShape(shape) {
          var shapes = this._shapes;
          var index = shapes.indexOf(shape);

          if (index === -1) {
            for (var i = 0, l = shapes.length; i < l; i++) {
              var other = shapes[i];

              if (this.shouldCollide(shape, other)) {
                var contact = new BuiltinContact(shape, other);

                this._contacts.push(contact);
              }
            }

            shapes.push(shape);
          }
        };

        _proto.removeShape = function removeShape(shape) {
          var shapes = this._shapes;
          var index = shapes.indexOf(shape);

          if (index >= 0) {
            shapes.splice(index, 1);
            var contacts = this._contacts;

            for (var i = contacts.length - 1; i >= 0; i--) {
              var contact = contacts[i];

              if (contact.shape1 === shape || contact.shape2 === shape) {
                if (contact.touching) {
                  this._emitCollide(contact, Contact2DType.END_CONTACT);
                }

                contacts.splice(i, 1);
              }
            }
          }
        };

        _proto.updateShapeGroup = function updateShapeGroup(shape) {
          this.removeShape(shape);
          this.addShape(shape);
        };

        _proto.step = function step(deltaTime, velocityIterations, positionIterations) {
          if (velocityIterations === void 0) {
            velocityIterations = 10;
          }

          if (positionIterations === void 0) {
            positionIterations = 10;
          }

          // update collider
          var shapes = this._shapes;

          for (var i = 0, l = shapes.length; i < l; i++) {
            shapes[i].update();
          } // do collide


          var contacts = this._contacts;
          contactResults.length = 0;

          for (var _i = 0, _l = contacts.length; _i < _l; _i++) {
            var collisionType = contacts[_i].updateState();

            if (collisionType === Contact2DType.None) {
              continue;
            }

            contactResults.push(contacts[_i]);
          } // handle collide results, emit message


          for (var _i2 = 0, _l2 = contactResults.length; _i2 < _l2; _i2++) {
            var result = contactResults[_i2];

            this._emitCollide(result);
          }
        };

        _proto.drawDebug = function drawDebug() {
          if (!this._debugDrawFlags) {
            return;
          }

          this._checkDebugDrawValid();

          var debugDrawer = this._debugGraphics;

          if (!debugDrawer) {
            return;
          }

          debugDrawer.clear();
          var shapes = this._shapes;

          for (var i = 0, l = shapes.length; i < l; i++) {
            var shape = shapes[i];
            debugDrawer.strokeColor = Color.WHITE;

            if (shape instanceof BuiltinBoxShape || shape instanceof BuiltinPolygonShape) {
              var ps = shape.worldPoints;

              if (ps.length > 0) {
                debugDrawer.moveTo(ps[0].x, ps[0].y);

                for (var j = 1; j < ps.length; j++) {
                  debugDrawer.lineTo(ps[j].x, ps[j].y);
                }

                debugDrawer.close();
                debugDrawer.stroke();
              }
            } else if (shape instanceof BuiltinCircleShape) {
              debugDrawer.circle(shape.worldPosition.x, shape.worldPosition.y, shape.worldRadius);
              debugDrawer.stroke();
            }

            if (this._debugDrawFlags & EPhysics2DDrawFlags.Aabb) {
              var aabb = shape.worldAABB;
              debugDrawer.strokeColor = Color.BLUE;
              debugDrawer.moveTo(aabb.xMin, aabb.yMin);
              debugDrawer.lineTo(aabb.xMin, aabb.yMax);
              debugDrawer.lineTo(aabb.xMax, aabb.yMax);
              debugDrawer.lineTo(aabb.xMax, aabb.yMin);
              debugDrawer.close();
              debugDrawer.stroke();
            }
          }
        };

        _proto._emitCollide = function _emitCollide(contact, collisionType) {
          collisionType = collisionType || contact.type;
          var c1 = contact.shape1.collider;
          var c2 = contact.shape2.collider;
          PhysicsSystem2D.instance.emit(collisionType, c1, c2);
          c1.emit(collisionType, c1, c2);
          c2.emit(collisionType, c2, c1);
        };

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
          }

          var parent = this._debugGraphics.node.parent;

          this._debugGraphics.node.setSiblingIndex(parent.children.length - 1);
        };

        _proto.testPoint = function testPoint(p) {
          var shapes = this._shapes;
          testIntersectResults.length = 0;

          for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];

            if (!shape.containsPoint(p)) {
              continue;
            }

            testIntersectResults.push(shape.collider);
          }

          return testIntersectResults;
        };

        _proto.testAABB = function testAABB(rect) {
          var shapes = this._shapes;
          testIntersectResults.length = 0;

          for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];

            if (!shape.intersectsRect(rect)) {
              continue;
            }

            testIntersectResults.push(shape.collider);
          }

          return testIntersectResults;
        } // empty implements
        ;

        _proto.impl = function impl() {
          return null;
        };

        _proto.setGravity = function setGravity() {};

        _proto.setAllowSleep = function setAllowSleep() {};

        _proto.syncPhysicsToScene = function syncPhysicsToScene() {};

        _proto.syncSceneToPhysics = function syncSceneToPhysics() {};

        _proto.raycast = function raycast(p1, p2, type) {
          return [];
        };

        _createClass(BuiltinPhysicsWorld, [{
          key: "debugDrawFlags",
          get: function get() {
            return this._debugDrawFlags;
          },
          set: function set(v) {
            this._debugDrawFlags = v;
          }
        }]);

        return BuiltinPhysicsWorld;
      }());
    }
  };
});