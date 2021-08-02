System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-cone-shape.js", ["../../../core/index.js", "../../../primitive/cylinder.js", "../../framework/index.js", "../export-physx.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, cylinder, EAxisDirection, createConvexMesh, createMeshGeometryFlags, PX, _trans, EPhysXShapeType, PhysXShape, PhysXConeShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_primitiveCylinderJs) {
      cylinder = _primitiveCylinderJs.default;
    }, function (_frameworkIndexJs) {
      EAxisDirection = _frameworkIndexJs.EAxisDirection;
    }, function (_exportPhysxJs) {
      createConvexMesh = _exportPhysxJs.createConvexMesh;
      createMeshGeometryFlags = _exportPhysxJs.createMeshGeometryFlags;
      PX = _exportPhysxJs.PX;
      _trans = _exportPhysxJs._trans;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXConeShape", PhysXConeShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXConeShape, _PhysXShape);

        function PhysXConeShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.CONE) || this;
          _this.geometry = void 0;
          return _this;
        }

        var _proto = PhysXConeShape.prototype;

        _proto.setRadius = function setRadius(v) {
          this.updateGeometry();
        };

        _proto.setHeight = function setHeight(v) {
          this.updateGeometry();
        };

        _proto.setDirection = function setDirection(v) {
          this.updateGeometry();
        };

        _proto.onComponentSet = function onComponentSet() {
          var collider = this.collider;
          var physics = this._sharedBody.wrappedWorld.physics;

          if (!PhysXConeShape.CONVEX_MESH) {
            var cooking = this._sharedBody.wrappedWorld.cooking;
            var primitive = cylinder(0, 0.5, 1, {
              radialSegments: 32,
              heightSegments: 1
            });
            PhysXConeShape.CONVEX_MESH = createConvexMesh(primitive.positions, cooking, physics);
          }

          var meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(Vec3.ONE);
          meshScale.setRotation(Quat.IDENTITY);
          var convexMesh = PhysXConeShape.CONVEX_MESH;
          var pxmat = this.getSharedMaterial(collider.sharedMaterial);
          this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
          this.updateGeometry();
          this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
        };

        _proto.updateScale = function updateScale() {
          this.updateGeometry();
          this.setCenter(this._collider.center);
        };

        _proto.updateGeometry = function updateGeometry() {
          var collider = this.collider;
          var r = collider.radius;
          var h = collider.height;
          var a = collider.direction;
          var scale = _trans.translation;
          Vec3.copy(scale, collider.node.worldScale);
          scale.y *= Math.max(0.0001, h / 1);
          var xz = Math.max(0.0001, r / 0.5);
          scale.x *= xz;
          scale.z *= xz;
          var quat = _trans.rotation;

          switch (a) {
            case EAxisDirection.X_AXIS:
              Quat.fromEuler(quat, 0, 0, 90);
              break;

            case EAxisDirection.Y_AXIS:
            default:
              Quat.copy(quat, Quat.IDENTITY);
              break;

            case EAxisDirection.Z_AXIS:
              Quat.fromEuler(quat, 90, 0, 0);
              break;
          }

          var meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(scale);
          meshScale.setRotation(quat);
          this.geometry.setScale(meshScale);
          Quat.copy(this._rotation, quat);
        };

        _createClass(PhysXConeShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXConeShape;
      }(PhysXShape));

      PhysXConeShape.CONVEX_MESH = void 0;
    }
  };
});