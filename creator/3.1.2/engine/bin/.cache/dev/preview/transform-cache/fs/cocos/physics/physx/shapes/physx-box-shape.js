System.register("q-bundled:///fs/cocos/physics/physx/shapes/physx-box-shape.js", ["../../utils/util.js", "../export-physx.js", "./physx-shape.js"], function (_export, _context) {
  "use strict";

  var VEC3_0, PX, EPhysXShapeType, PhysXShape, PhysXBoxShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_utilsUtilJs) {
      VEC3_0 = _utilsUtilJs.VEC3_0;
    }, function (_exportPhysxJs) {
      PX = _exportPhysxJs.PX;
    }, function (_physxShapeJs) {
      EPhysXShapeType = _physxShapeJs.EPhysXShapeType;
      PhysXShape = _physxShapeJs.PhysXShape;
    }],
    execute: function () {
      _export("PhysXBoxShape", PhysXBoxShape = /*#__PURE__*/function (_PhysXShape) {
        _inheritsLoose(PhysXBoxShape, _PhysXShape);

        function PhysXBoxShape() {
          var _this;

          _this = _PhysXShape.call(this, EPhysXShapeType.BOX) || this;

          if (!PhysXBoxShape.BOX_GEOMETRY) {
            VEC3_0.set(0.5, 0.5, 0.5);
            PhysXBoxShape.BOX_GEOMETRY = new PX.BoxGeometry(VEC3_0);
          }

          return _this;
        }

        var _proto = PhysXBoxShape.prototype;

        _proto.setSize = function setSize(v) {
          this.updateScale();
        };

        _proto.onComponentSet = function onComponentSet() {
          this.updateGeometry();
          var physics = this._sharedBody.wrappedWorld.physics;
          var pxmat = this.getSharedMaterial(this._collider.sharedMaterial);
          this._impl = physics.createShape(PhysXBoxShape.BOX_GEOMETRY, pxmat, true, this._flags);
        };

        _proto.updateScale = function updateScale() {
          this.updateGeometry();

          this._impl.setGeometry(PhysXBoxShape.BOX_GEOMETRY);

          this.setCenter(this._collider.center);
        };

        _proto.updateGeometry = function updateGeometry() {
          var co = this.collider;
          var ws = co.node.worldScale;
          VEC3_0.set(co.size);
          VEC3_0.multiplyScalar(0.5);
          VEC3_0.multiply(ws);
          VEC3_0.x = Math.abs(VEC3_0.x);
          VEC3_0.y = Math.abs(VEC3_0.y);
          VEC3_0.z = Math.abs(VEC3_0.z);
          PhysXBoxShape.BOX_GEOMETRY.setHalfExtents(VEC3_0);
        };

        _createClass(PhysXBoxShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return PhysXBoxShape;
      }(PhysXShape));

      PhysXBoxShape.BOX_GEOMETRY = void 0;
    }
  };
});