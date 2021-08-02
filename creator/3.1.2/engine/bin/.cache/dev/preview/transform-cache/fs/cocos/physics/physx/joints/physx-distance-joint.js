System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-distance-joint.js", ["../../../core/index.js", "../export-physx.js", "./physx-joint.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, PX, _trans, getTempTransform, _pxtrans, PhysXJoint, PhysXDistanceJoint;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_exportPhysxJs) {
      PX = _exportPhysxJs.PX;
      _trans = _exportPhysxJs._trans;
      getTempTransform = _exportPhysxJs.getTempTransform;
      _pxtrans = _exportPhysxJs._pxtrans;
    }, function (_physxJointJs) {
      PhysXJoint = _physxJointJs.PhysXJoint;
    }],
    execute: function () {
      _export("PhysXDistanceJoint", PhysXDistanceJoint = /*#__PURE__*/function (_PhysXJoint) {
        _inheritsLoose(PhysXDistanceJoint, _PhysXJoint);

        function PhysXDistanceJoint() {
          return _PhysXJoint.apply(this, arguments) || this;
        }

        var _proto = PhysXDistanceJoint.prototype;

        _proto.setPivotA = function setPivotA(v) {
          var cs = this.constraint;
          var pos = _trans.translation;
          var rot = _trans.rotation;
          Vec3.multiply(pos, cs.node.worldScale, cs.pivotA);
          Quat.copy(rot, Quat.IDENTITY);

          this._impl.setLocalPose(0, getTempTransform(pos, rot));

          if (!cs.connectedBody) this.setPivotB(cs.pivotB);
        };

        _proto.setPivotB = function setPivotB(v) {
          var cs = this.constraint;
          var cb = cs.connectedBody;
          var pos = _trans.translation;
          var rot = _trans.rotation;
          Vec3.copy(pos, cs.pivotB);
          Quat.copy(rot, Quat.IDENTITY);

          if (cb) {
            Vec3.multiply(pos, cb.node.worldScale, cs.pivotB);
          } else {
            var node = cs.node;
            Vec3.multiply(pos, node.worldScale, cs.pivotA);
            Vec3.add(pos, pos, node.worldPosition);
            Vec3.add(pos, pos, cs.pivotB);
            Quat.multiply(rot, rot, node.worldRotation);
          }

          this._impl.setLocalPose(1, getTempTransform(pos, rot));
        };

        _proto.onComponentSet = function onComponentSet() {
          this._impl = PX.createDistanceJoint(PhysXJoint.tempActor, _pxtrans, null, _pxtrans);
          this.setPivotA(this.constraint.pivotA);
          this.setPivotB(this.constraint.pivotB);
        };

        _proto.updateScale0 = function updateScale0() {
          this.setPivotA(this.constraint.pivotA);
        };

        _proto.updateScale1 = function updateScale1() {
          this.setPivotB(this.constraint.pivotB);
        };

        _createClass(PhysXDistanceJoint, [{
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }]);

        return PhysXDistanceJoint;
      }(PhysXJoint));
    }
  };
});