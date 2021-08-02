System.register("q-bundled:///fs/cocos/physics-2d/box2d/joints/spring-joint.js", ["@cocos/box2d", "./joint-2d.js", "../../framework/physics-types.js"], function (_export, _context) {
  "use strict";

  var b2, b2Joint, PHYSICS_2D_PTM_RATIO, b2SpringJoint;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_joint2dJs) {
      b2Joint = _joint2dJs.b2Joint;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }],
    execute: function () {
      _export("b2SpringJoint", b2SpringJoint = /*#__PURE__*/function (_b2Joint) {
        _inheritsLoose(b2SpringJoint, _b2Joint);

        function b2SpringJoint() {
          return _b2Joint.apply(this, arguments) || this;
        }

        var _proto = b2SpringJoint.prototype;

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

        _proto.setDistance = function setDistance(v) {
          if (this._b2joint) {
            this._b2joint.SetLength(v);
          }
        };

        _proto._createJointDef = function _createJointDef() {
          var comp = this._jointComp;
          var def = new b2.DistanceJointDef();
          def.localAnchorA.Set(comp.anchor.x / PHYSICS_2D_PTM_RATIO, comp.anchor.y / PHYSICS_2D_PTM_RATIO);
          def.localAnchorB.Set(comp.connectedAnchor.x / PHYSICS_2D_PTM_RATIO, comp.connectedAnchor.y / PHYSICS_2D_PTM_RATIO);
          def.length = comp.distance / PHYSICS_2D_PTM_RATIO;
          def.dampingRatio = comp.dampingRatio;
          def.frequencyHz = comp.frequency;
          return def;
        };

        return b2SpringJoint;
      }(b2Joint));
    }
  };
});