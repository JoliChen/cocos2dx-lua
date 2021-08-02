System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/mouse-joint.js", ["@cocos/box2d", "./joint-2d.js", "../../framework/index.js", "../../framework/physics-types.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Joint, PhysicsSystem2D, PHYSICS_2D_PTM_RATIO, SystemEventType, Vec2, find, tempB2Vec2, b2MouseJoint;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_joint2dJs) {
      b2Joint = _joint2dJs.b2Joint;
    }, function (_frameworkIndexJs) {
      PhysicsSystem2D = _frameworkIndexJs.PhysicsSystem2D;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      SystemEventType = _coreIndexJs.SystemEventType;
      Vec2 = _coreIndexJs.Vec2;
      find = _coreIndexJs.find;
    }],
    execute: function () {
      tempB2Vec2 = new b2.Vec2();

      _export("b2MouseJoint", b2MouseJoint = /*#__PURE__*/function (_b2Joint) {
        _inheritsLoose(b2MouseJoint, _b2Joint);

        function b2MouseJoint() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2Joint.call.apply(_b2Joint, [this].concat(args)) || this;
          _this._touchPoint = new Vec2();
          _this._isTouched = false;
          return _this;
        }

        var _proto = b2MouseJoint.prototype;

        _proto.setTarget = function setTarget(v) {
          if (this._b2joint) {
            tempB2Vec2.x = v.x / PHYSICS_2D_PTM_RATIO;
            tempB2Vec2.y = v.y / PHYSICS_2D_PTM_RATIO;

            this._b2joint.SetTarget(tempB2Vec2);
          }
        };

        _proto.setDampingRatio = function setDampingRatio(v) {
          if (this._b2joint) {
            this._b2joint.SetDampingRatio(v);
          }
        };

        _proto.setFrequency = function setFrequency(v) {
          if (this._b2joint) {
            this._b2joint.SetFrequency(v);
          }
        };

        _proto.setMaxForce = function setMaxForce(v) {
          if (this._b2joint) {
            this._b2joint.SetMaxForce(v);
          }
        };

        _proto._createJointDef = function _createJointDef() {
          var def = new b2.MouseJointDef();
          var comp = this._jointComp;
          def.target.Set(this._touchPoint.x / PHYSICS_2D_PTM_RATIO, this._touchPoint.y / PHYSICS_2D_PTM_RATIO);
          def.maxForce = comp.maxForce;
          def.dampingRatio = comp.dampingRatio;
          def.frequencyHz = comp.frequency;
          return def;
        };

        _proto.initialize = function initialize(comp) {
          _b2Joint.prototype.initialize.call(this, comp);

          var canvas = find('Canvas');

          if (canvas) {
            canvas.on(SystemEventType.TOUCH_START, this.onTouchBegan, this);
            canvas.on(SystemEventType.TOUCH_MOVE, this.onTouchMove, this);
            canvas.on(SystemEventType.TOUCH_END, this.onTouchEnd, this);
            canvas.on(SystemEventType.TOUCH_CANCEL, this.onTouchEnd, this);
          }
        };

        _proto.onEnable = function onEnable() {};

        _proto.start = function start() {};

        _proto.onTouchBegan = function onTouchBegan(event) {
          this._isTouched = true;

          var target = this._touchPoint.set(event.getUILocation());

          var world = PhysicsSystem2D.instance.physicsWorld;
          var colliders = world.testPoint(target);
          if (colliders.length <= 0) return;
          var body = colliders[0].body;
          body.wakeUp();
          var comp = this._jointComp;
          comp.connectedBody = body;

          this._init();

          this.setMaxForce(comp.maxForce * body.getMass());
          this.setTarget(target);
        };

        _proto.onTouchMove = function onTouchMove(event) {
          this._touchPoint = event.getUILocation();
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this._destroy();

          this._isTouched = false;
        };

        _proto.update = function update() {
          if (!this._isTouched || !this.isValid()) {
            return;
          } // let camera = cc.Camera.findCamera(this.node);
          // if (camera) {
          //     this.target = camera.getScreenToWorldPoint(this._touchPoint);
          // }
          // else {


          this.setTarget(this._touchPoint); // }
        };

        return b2MouseJoint;
      }(b2Joint));
    }
  };
});