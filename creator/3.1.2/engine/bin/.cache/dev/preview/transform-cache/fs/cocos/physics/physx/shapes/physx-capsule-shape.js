System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-capsule-shape.js", ["../../../core/index.js", "../../framework/index.js", "../export-physx.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var absMax, Quat, EAxisDirection, PX, EPhysXShapeType, PhysXShape, PhysXCapsuleShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      absMax = _coreIndexJs.absMax;
      Quat = _coreIndexJs.Quat;
    }, function (_frameworkIndexJs) {
      EAxisDirection = _frameworkIndexJs.EAxisDirection;
    }, function (_exportPhysxJs) {
      PX = _exportPhysxJs.PX;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXCapsuleShape", PhysXCapsuleShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXCapsuleShape, _PhysXShape);

        function PhysXCapsuleShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.CAPSULE) || this;

          if (!PhysXCapsuleShape.CAPSULE_GEOMETRY) {
            PhysXCapsuleShape.CAPSULE_GEOMETRY = new PX.CapsuleGeometry(0.5, 0.5);
          }

          return _this;
        }

        var _proto = PhysXCapsuleShape.prototype;

        _proto.setCylinderHeight = function setCylinderHeight(v) {
          this.updateScale();
        };

        _proto.setDirection = function setDirection(v) {
          this.updateScale();
        };

        _proto.setRadius = function setRadius(v) {
          this.updateScale();
        };

        _proto.onComponentSet = function onComponentSet() {
          this.updateGeometry();
          var physics = this._sharedBody.wrappedWorld.physics;
          var pxmat = this.getSharedMaterial(this._collider.sharedMaterial);
          this._impl = physics.createShape(PhysXCapsuleShape.CAPSULE_GEOMETRY, pxmat, true, this._flags);
        };

        _proto.updateScale = function updateScale() {
          this.updateGeometry();

          this._impl.setGeometry(PhysXCapsuleShape.CAPSULE_GEOMETRY);

          this.setCenter(this._collider.center);
        };

        _proto.updateGeometry = function updateGeometry() {
          var co = this.collider;
          var ws = co.node.worldScale;
          var upAxis = co.direction;
          var r = 0.5;
          var hf = 0.5;

          if (upAxis === EAxisDirection.Y_AXIS) {
            r = co.radius * Math.abs(absMax(ws.x, ws.z));
            hf = co.cylinderHeight / 2 * Math.abs(ws.y);
            Quat.fromEuler(this._rotation, 0, 0, 90);
          } else if (upAxis === EAxisDirection.X_AXIS) {
            r = co.radius * Math.abs(absMax(ws.y, ws.z));
            hf = co.cylinderHeight / 2 * Math.abs(ws.x);
            Quat.fromEuler(this._rotation, 0, 0, 0);
          } else {
            r = co.radius * Math.abs(absMax(ws.x, ws.y));
            hf = co.cylinderHeight / 2 * Math.abs(ws.z);
            Quat.fromEuler(this._rotation, 0, 90, 0);
          }

          PhysXCapsuleShape.CAPSULE_GEOMETRY.setRadius(Math.max(0.0001, r));
          PhysXCapsuleShape.CAPSULE_GEOMETRY.setHalfHeight(Math.max(0.0001, hf));
        };

        _createClass(PhysXCapsuleShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXCapsuleShape;
      }(PhysXShape));

      PhysXCapsuleShape.CAPSULE_GEOMETRY = void 0;
    }
  };
});