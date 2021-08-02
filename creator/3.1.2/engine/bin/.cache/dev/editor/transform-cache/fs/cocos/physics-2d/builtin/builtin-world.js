"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinPhysicsWorld = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../2d/index.js");

var _index2 = require("../../core/index.js");

var _index3 = require("../../2d/framework/index.js");

var _boxShape2d = require("./shapes/box-shape-2d.js");

var _circleShape2d = require("./shapes/circle-shape-2d.js");

var _polygonShape2d = require("./shapes/polygon-shape-2d.js");

var _physicsTypes = require("../framework/physics-types.js");

var _index4 = require("../framework/index.js");

var _builtinContact = require("./builtin-contact.js");

/**
 * @packageDocumentation
 * @hidden
 */
const contactResults = [];
const testIntersectResults = [];

class BuiltinPhysicsWorld {
  constructor() {
    this._contacts = [];
    this._shapes = [];
    this._debugGraphics = null;
    this._debugDrawFlags = 0;
  }

  get debugDrawFlags() {
    return this._debugDrawFlags;
  }

  set debugDrawFlags(v) {
    this._debugDrawFlags = v;
  }

  shouldCollide(c1, c2) {
    const collider1 = c1.collider;
    const collider2 = c2.collider;
    const collisionMatrix = _index4.PhysicsSystem2D.instance.collisionMatrix;
    return collider1 !== collider2 && collider1.node !== collider2.node && collisionMatrix[collider1.group] & collider2.group && collisionMatrix[collider2.group] & collider1.group;
  }

  addShape(shape) {
    const shapes = this._shapes;
    const index = shapes.indexOf(shape);

    if (index === -1) {
      for (let i = 0, l = shapes.length; i < l; i++) {
        const other = shapes[i];

        if (this.shouldCollide(shape, other)) {
          const contact = new _builtinContact.BuiltinContact(shape, other);

          this._contacts.push(contact);
        }
      }

      shapes.push(shape);
    }
  }

  removeShape(shape) {
    const shapes = this._shapes;
    const index = shapes.indexOf(shape);

    if (index >= 0) {
      shapes.splice(index, 1);
      const contacts = this._contacts;

      for (let i = contacts.length - 1; i >= 0; i--) {
        const contact = contacts[i];

        if (contact.shape1 === shape || contact.shape2 === shape) {
          if (contact.touching) {
            this._emitCollide(contact, _physicsTypes.Contact2DType.END_CONTACT);
          }

          contacts.splice(i, 1);
        }
      }
    }
  }

  updateShapeGroup(shape) {
    this.removeShape(shape);
    this.addShape(shape);
  }

  step(deltaTime, velocityIterations = 10, positionIterations = 10) {
    // update collider
    const shapes = this._shapes;

    for (let i = 0, l = shapes.length; i < l; i++) {
      shapes[i].update();
    } // do collide


    const contacts = this._contacts;
    contactResults.length = 0;

    for (let i = 0, l = contacts.length; i < l; i++) {
      const collisionType = contacts[i].updateState();

      if (collisionType === _physicsTypes.Contact2DType.None) {
        continue;
      }

      contactResults.push(contacts[i]);
    } // handle collide results, emit message


    for (let i = 0, l = contactResults.length; i < l; i++) {
      const result = contactResults[i];

      this._emitCollide(result);
    }
  }

  drawDebug() {
    if (!this._debugDrawFlags) {
      return;
    }

    this._checkDebugDrawValid();

    const debugDrawer = this._debugGraphics;

    if (!debugDrawer) {
      return;
    }

    debugDrawer.clear();
    const shapes = this._shapes;

    for (let i = 0, l = shapes.length; i < l; i++) {
      const shape = shapes[i];
      debugDrawer.strokeColor = _index2.Color.WHITE;

      if (shape instanceof _boxShape2d.BuiltinBoxShape || shape instanceof _polygonShape2d.BuiltinPolygonShape) {
        const ps = shape.worldPoints;

        if (ps.length > 0) {
          debugDrawer.moveTo(ps[0].x, ps[0].y);

          for (let j = 1; j < ps.length; j++) {
            debugDrawer.lineTo(ps[j].x, ps[j].y);
          }

          debugDrawer.close();
          debugDrawer.stroke();
        }
      } else if (shape instanceof _circleShape2d.BuiltinCircleShape) {
        debugDrawer.circle(shape.worldPosition.x, shape.worldPosition.y, shape.worldRadius);
        debugDrawer.stroke();
      }

      if (this._debugDrawFlags & _physicsTypes.EPhysics2DDrawFlags.Aabb) {
        const aabb = shape.worldAABB;
        debugDrawer.strokeColor = _index2.Color.BLUE;
        debugDrawer.moveTo(aabb.xMin, aabb.yMin);
        debugDrawer.lineTo(aabb.xMin, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMax);
        debugDrawer.lineTo(aabb.xMax, aabb.yMin);
        debugDrawer.close();
        debugDrawer.stroke();
      }
    }
  }

  _emitCollide(contact, collisionType) {
    collisionType = collisionType || contact.type;
    const c1 = contact.shape1.collider;
    const c2 = contact.shape2.collider;

    _index4.PhysicsSystem2D.instance.emit(collisionType, c1, c2);

    c1.emit(collisionType, c1, c2);
    c2.emit(collisionType, c2, c1);
  }

  _checkDebugDrawValid() {
    if (_internal253Aconstants.EDITOR) return;

    if (!this._debugGraphics || !this._debugGraphics.isValid) {
      let canvas = (0, _index2.find)('Canvas');

      if (!canvas) {
        const scene = _index2.director.getScene();

        if (!scene) {
          return;
        }

        canvas = new _index2.Node('Canvas');
        canvas.addComponent(_index3.Canvas);
        canvas.parent = scene;
      }

      const node = new _index2.Node('PHYSICS_2D_DEBUG_DRAW'); // node.zIndex = cc.macro.MAX_ZINDEX;

      node.hideFlags |= _index2.CCObject.Flags.DontSave;
      node.parent = canvas;
      node.worldPosition = _index2.Vec3.ZERO;
      this._debugGraphics = node.addComponent(_index.Graphics);
      this._debugGraphics.lineWidth = 2;
    }

    const parent = this._debugGraphics.node.parent;

    this._debugGraphics.node.setSiblingIndex(parent.children.length - 1);
  }

  testPoint(p) {
    const shapes = this._shapes;
    testIntersectResults.length = 0;

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];

      if (!shape.containsPoint(p)) {
        continue;
      }

      testIntersectResults.push(shape.collider);
    }

    return testIntersectResults;
  }

  testAABB(rect) {
    const shapes = this._shapes;
    testIntersectResults.length = 0;

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];

      if (!shape.intersectsRect(rect)) {
        continue;
      }

      testIntersectResults.push(shape.collider);
    }

    return testIntersectResults;
  } // empty implements


  impl() {
    return null;
  }

  setGravity() {}

  setAllowSleep() {}

  syncPhysicsToScene() {}

  syncSceneToPhysics() {}

  raycast(p1, p2, type) {
    return [];
  }

}

exports.BuiltinPhysicsWorld = BuiltinPhysicsWorld;