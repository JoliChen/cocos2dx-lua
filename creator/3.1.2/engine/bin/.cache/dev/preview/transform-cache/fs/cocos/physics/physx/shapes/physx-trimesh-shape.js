System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-trimesh-shape.js", ["../../../core/index.js", "../export-physx.js", "./physx-shape.js", "../../../core/gfx/index.js"], function (_export, _context) {
  "use strict";

  var Quat, Vec3, createConvexMesh, createMeshGeometryFlags, createTriangleMesh, PX, EPhysXShapeType, PhysXShape, AttributeName, PhysXTrimeshShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreIndexJs) {
      Quat = _coreIndexJs.Quat;
      Vec3 = _coreIndexJs.Vec3;
    }, function (_exportPhysxJs) {
      createConvexMesh = _exportPhysxJs.createConvexMesh;
      createMeshGeometryFlags = _exportPhysxJs.createMeshGeometryFlags;
      createTriangleMesh = _exportPhysxJs.createTriangleMesh;
      PX = _exportPhysxJs.PX;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }, function (_coreGfxIndexJs) {
      AttributeName = _coreGfxIndexJs.AttributeName;
    }],
    execute: function () {
      _export("PhysXTrimeshShape", PhysXTrimeshShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXTrimeshShape, _PhysXShape);

        function PhysXTrimeshShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.MESH) || this;
          _this.geometry = void 0;
          return _this;
        }

        var _proto = PhysXTrimeshShape.prototype;

        _proto.setMesh = function setMesh(v) {
          if (v && v.renderingSubMeshes.length > 0 && this._impl == null) {
            var wrappedWorld = this._sharedBody.wrappedWorld;
            var physics = wrappedWorld.physics;
            var collider = this.collider;
            var pxmat = this.getSharedMaterial(collider.sharedMaterial);
            var meshScale = PhysXShape.MESH_SCALE;
            meshScale.setScale(Vec3.ONE);
            meshScale.setRotation(Quat.IDENTITY);

            if (collider.convex) {
              if (PX.MESH_CONVEX[v._uuid] == null) {
                var cooking = wrappedWorld.cooking;
                var posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);
                PX.MESH_CONVEX[v._uuid] = createConvexMesh(posBuf, cooking, physics);
              }

              var convexMesh = PX.MESH_CONVEX[v._uuid];
              this.geometry = new PX.ConvexMeshGeometry(convexMesh, meshScale, createMeshGeometryFlags(0, true));
            } else {
              if (PX.MESH_STATIC[v._uuid] == null) {
                var _cooking = wrappedWorld.cooking;

                var _posBuf = v.readAttribute(0, AttributeName.ATTR_POSITION);

                var indBuf = v.readIndices(0); // Uint16Array ?

                PX.MESH_STATIC[v._uuid] = createTriangleMesh(_posBuf, indBuf, _cooking, physics);
              }

              var trimesh = PX.MESH_STATIC[v._uuid];
              this.geometry = new PX.TriangleMeshGeometry(trimesh, meshScale, createMeshGeometryFlags(0, false));
            }

            this.updateGeometry();
            this._impl = physics.createShape(this.geometry, pxmat, true, this._flags);
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          this.setMesh(this.collider.mesh);
        };

        _proto.updateScale = function updateScale() {
          this.updateGeometry();
          this.setCenter(this._collider.center);
        };

        _proto.updateGeometry = function updateGeometry() {
          var meshScale = PhysXShape.MESH_SCALE;
          meshScale.setScale(this.collider.node.worldScale);
          meshScale.setRotation(Quat.IDENTITY);
          this.geometry.setScale(meshScale);
        };

        _createClass(PhysXTrimeshShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXTrimeshShape;
      }(PhysXShape));
    }
  };
});