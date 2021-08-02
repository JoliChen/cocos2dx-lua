System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-sphere-shape.js", ["@cocos/cannon", "../../utils/util.js", "../cannon-util.js", "./cannon-shape.js"], function (_export, _context) {
  "use strict";

  var CANNON, maxComponent, commitShapeUpdates, CannonShape, CannonSphereShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_utilsUtilJs) {
      maxComponent = _utilsUtilJs.maxComponent;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }],
    execute: function () {
      _export("CannonSphereShape", CannonSphereShape = /*#__PURE__*/function (_CannonShape) {
        _inheritsLoose(CannonSphereShape, _CannonShape);

        var _proto = CannonSphereShape.prototype;

        _proto.setRadius = function setRadius(v) {
          var max = maxComponent(this.collider.node.worldScale);
          this.impl.radius = v * Math.abs(max);
          this.impl.updateBoundingSphereRadius();

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        };

        function CannonSphereShape(radius) {
          var _this;

          if (radius === void 0) {
            radius = 0.5;
          }

          _this = _CannonShape.call(this) || this;
          _this._shape = new CANNON.Sphere(radius);
          return _this;
        }

        _proto.onLoad = function onLoad() {
          _CannonShape.prototype.onLoad.call(this);

          this.setRadius(this.collider.radius);
        };

        _proto.setScale = function setScale(scale) {
          _CannonShape.prototype.setScale.call(this, scale);

          this.setRadius(this.collider.radius);
        };

        _createClass(CannonSphereShape, [{
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }, {
          key: "impl",
          get: function get() {
            return this._shape;
          }
        }]);

        return CannonSphereShape;
      }(CannonShape));
    }
  };
});