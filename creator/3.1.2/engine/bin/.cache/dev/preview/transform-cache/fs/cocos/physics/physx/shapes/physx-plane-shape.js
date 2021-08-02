System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-plane-shape.js", ["../../../core/index.js", "../export-physx.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, getTempTransform, PX, _trans, EPhysXShapeType, PhysXShape, PhysXPlaneShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_exportPhysxJs) {
      getTempTransform = _exportPhysxJs.getTempTransform;
      PX = _exportPhysxJs.PX;
      _trans = _exportPhysxJs._trans;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXPlaneShape", PhysXPlaneShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXPlaneShape, _PhysXShape);

        function PhysXPlaneShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.PLANE) || this;

          if (!PhysXPlaneShape.PLANE_GEOMETRY) {
            PhysXPlaneShape.PLANE_GEOMETRY = new PX.PlaneGeometry();
          }

          return _this;
        }

        var _proto = PhysXPlaneShape.prototype;

        _proto.setNormal = function setNormal(v) {
          this.setCenter();
        };

        _proto.setConstant = function setConstant(v) {
          this.setCenter();
        };

        _proto.setCenter = function setCenter() {
          var co = this.collider;
          var pos = _trans.translation;
          var rot = _trans.rotation;
          Vec3.scaleAndAdd(pos, co.center, co.normal, co.constant);
          Quat.rotationTo(rot, Vec3.UNIT_X, co.normal);
          var trans = getTempTransform(pos, rot);

          this._impl.setLocalPose(trans);
        };

        _proto.onComponentSet = function onComponentSet() {
          var co = this.collider;
          var physics = this._sharedBody.wrappedWorld.physics;
          var pxmat = this.getSharedMaterial(co.sharedMaterial);
          this._impl = physics.createShape(PhysXPlaneShape.PLANE_GEOMETRY, pxmat, true, this._flags);
          this.setCenter();
        };

        _proto.updateScale = function updateScale() {
          this.setCenter();
        };

        _createClass(PhysXPlaneShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXPlaneShape;
      }(PhysXShape));

      PhysXPlaneShape.PLANE_GEOMETRY = void 0;
    }
  };
});