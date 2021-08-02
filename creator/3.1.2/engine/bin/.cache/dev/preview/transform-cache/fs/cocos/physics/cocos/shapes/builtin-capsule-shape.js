System.register("q-bundled:///fs/cocos/physics/cocos/shapes/builtin-capsule-shape.js", ["./builtin-shape.js", "../../../core/geometry/index.js", "../../framework/index.js"], function (_export, _context) {
  "use strict";

  var BuiltinShape, Capsule, EAxisDirection, BuiltinCapsuleShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_builtinShapeJs) {
      BuiltinShape = _builtinShapeJs.BuiltinShape;
    }, function (_coreGeometryIndexJs) {
      Capsule = _coreGeometryIndexJs.Capsule;
    }, function (_frameworkIndexJs) {
      EAxisDirection = _frameworkIndexJs.EAxisDirection;
    }],
    execute: function () {
      _export("BuiltinCapsuleShape", BuiltinCapsuleShape = /*#__PURE__*/function (_BuiltinShape) {
        _inheritsLoose(BuiltinCapsuleShape, _BuiltinShape);

        function BuiltinCapsuleShape(radius, height, direction) {
          var _this;

          if (radius === void 0) {
            radius = 0.5;
          }

          if (height === void 0) {
            height = 2;
          }

          if (direction === void 0) {
            direction = EAxisDirection.Y_AXIS;
          }

          _this = _BuiltinShape.call(this) || this;
          var halfHeight = (height - radius * 2) / 2;
          var h = halfHeight < 0 ? 0 : halfHeight;
          _this._localShape = new Capsule(radius, h, direction);
          _this._worldShape = new Capsule(radius, h, direction);
          return _this;
        }

        var _proto = BuiltinCapsuleShape.prototype;

        _proto.setRadius = function setRadius(v) {
          this.localCapsule.radius = v;
          this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
        };

        _proto.setCylinderHeight = function setCylinderHeight(v) {
          this.localCapsule.halfHeight = v / 2;
          this.localCapsule.updateCache();
          this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
        };

        _proto.setDirection = function setDirection(v) {
          this.localCapsule.axis = v;
          this.localCapsule.updateCache();
          this.worldCapsule.axis = v;
          this.worldCapsule.updateCache();
          this.transform(this._sharedBody.node.worldMatrix, this._sharedBody.node.worldPosition, this._sharedBody.node.worldRotation, this._sharedBody.node.worldScale);
        };

        _proto.onLoad = function onLoad() {
          _BuiltinShape.prototype.onLoad.call(this);

          this.setRadius(this.collider.radius);
          this.setDirection(this.collider.direction);
        };

        _createClass(BuiltinCapsuleShape, [{
          key: "localCapsule",
          get: function get() {
            return this._localShape;
          }
        }, {
          key: "worldCapsule",
          get: function get() {
            return this._worldShape;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BuiltinCapsuleShape;
      }(BuiltinShape));
    }
  };
});