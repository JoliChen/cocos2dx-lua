System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-terrain-shape.js", ["../export-physx.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var createHeightField, createHeightFieldGeometry, getTempTransform, PX, EPhysXShapeType, PhysXShape, PhysXTerrainShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_exportPhysxJs) {
      createHeightField = _exportPhysxJs.createHeightField;
      createHeightFieldGeometry = _exportPhysxJs.createHeightFieldGeometry;
      getTempTransform = _exportPhysxJs.getTempTransform;
      PX = _exportPhysxJs.PX;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXTerrainShape", PhysXTerrainShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXTerrainShape, _PhysXShape);

        function PhysXTerrainShape() {
          return _PhysXShape.call(this, EPhysXShapeType.TERRAIN) || this;
        }

        var _proto = PhysXTerrainShape.prototype;

        _proto.setTerrain = function setTerrain(v) {
          if (v && this._impl == null) {
            var wrappedWorld = this._sharedBody.wrappedWorld;
            var physics = wrappedWorld.physics;
            var collider = this.collider;

            if (PX.TERRAIN_STATIC[v._uuid] == null) {
              var cooking = wrappedWorld.cooking;
              PX.TERRAIN_STATIC[v._uuid] = createHeightField(v, PhysXTerrainShape.heightScale, cooking, physics);
            }

            var hf = PX.TERRAIN_STATIC[v._uuid];
            var pxmat = this.getSharedMaterial(collider.sharedMaterial);
            var geometry = createHeightFieldGeometry(hf, 0, PhysXTerrainShape.heightScale, v.tileSize, v.tileSize);
            this._impl = physics.createShape(geometry, pxmat, true, this._flags);
          }
        };

        _proto.onComponentSet = function onComponentSet() {
          this.setTerrain(this.collider.terrain);
        };

        _proto.updateScale = function updateScale() {
          this.setCenter(this._collider.center);
        } // overwrite
        ;

        _proto.setCenter = function setCenter(v) {
          this._impl.setLocalPose(getTempTransform(v, this._rotation));
        };

        _createClass(PhysXTerrainShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXTerrainShape;
      }(PhysXShape));

      PhysXTerrainShape.heightScale = 1 / 5000;
    }
  };
});