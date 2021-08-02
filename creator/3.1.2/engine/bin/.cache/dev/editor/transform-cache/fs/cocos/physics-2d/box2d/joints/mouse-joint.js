"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2MouseJoint = void 0;

var _box2d = _interopRequireDefault(require("@cocos/box2d"));

var _joint2d = require("./joint-2d.js");

var _index = require("../../framework/index.js");

var _physicsTypes = require("../../framework/physics-types.js");

var _index2 = require("../../../core/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @hidden
 */
const tempB2Vec2 = new _box2d.default.Vec2();

class b2MouseJoint extends _joint2d.b2Joint {
  constructor(...args) {
    super(...args);
    this._touchPoint = new _index2.Vec2();
    this._isTouched = false;
  }

  setTarget(v) {
    if (this._b2joint) {
      tempB2Vec2.x = v.x / _physicsTypes.PHYSICS_2D_PTM_RATIO;
      tempB2Vec2.y = v.y / _physicsTypes.PHYSICS_2D_PTM_RATIO;

      this._b2joint.SetTarget(tempB2Vec2);
    }
  }

  setDampingRatio(v) {
    if (this._b2joint) {
      this._b2joint.SetDampingRatio(v);
    }
  }

  setFrequency(v) {
    if (this._b2joint) {
      this._b2joint.SetFrequency(v);
    }
  }

  setMaxForce(v) {
    if (this._b2joint) {
      this._b2joint.SetMaxForce(v);
    }
  }

  _createJointDef() {
    const def = new _box2d.default.MouseJointDef();
    const comp = this._jointComp;
    def.target.Set(this._touchPoint.x / _physicsTypes.PHYSICS_2D_PTM_RATIO, this._touchPoint.y / _physicsTypes.PHYSICS_2D_PTM_RATIO);
    def.maxForce = comp.maxForce;
    def.dampingRatio = comp.dampingRatio;
    def.frequencyHz = comp.frequency;
    return def;
  }

  initialize(comp) {
    super.initialize(comp);
    const canvas = (0, _index2.find)('Canvas');

    if (canvas) {
      canvas.on(_index2.SystemEventType.TOUCH_START, this.onTouchBegan, this);
      canvas.on(_index2.SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
      canvas.on(_index2.SystemEventType.TOUCH_END, this.onTouchEnd, this);
      canvas.on(_index2.SystemEventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
  }

  onEnable() {}

  start() {}

  onTouchBegan(event) {
    this._isTouched = true;

    const target = this._touchPoint.set(event.getUILocation());

    const world = _index.PhysicsSystem2D.instance.physicsWorld;
    const colliders = world.testPoint(target);
    if (colliders.length <= 0) return;
    const body = colliders[0].body;
    body.wakeUp();
    const comp = this._jointComp;
    comp.connectedBody = body;

    this._init();

    this.setMaxForce(comp.maxForce * body.getMass());
    this.setTarget(target);
  }

  onTouchMove(event) {
    this._touchPoint = event.getUILocation();
  }

  onTouchEnd(event) {
    this._destroy();

    this._isTouched = false;
  }

  update() {
    if (!this._isTouched || !this.isValid()) {
      return;
    } // let camera = cc.Camera.findCamera(this.node);
    // if (camera) {
    //     this.target = camera.getScreenToWorldPoint(this._touchPoint);
    // }
    // else {


    this.setTarget(this._touchPoint); // }
  }

}

exports.b2MouseJoint = b2MouseJoint;