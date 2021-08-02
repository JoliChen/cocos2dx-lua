System.register("q-bundled:///fs/cocos/physics/cannon/shapes/cannon-plane-shape.js", ["@cocos/cannon", "../../../core/math/index.js", "../cannon-util.js", "./cannon-shape.js"], function (_export, _context) {
  "use strict";

  var CANNON, Vec3, Quat, commitShapeUpdates, CannonShape, CannonPlaneShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosCannon) {
      CANNON = _cocosCannon.default;
    }, function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
      Quat = _coreMathIndexJs.Quat;
    }, function (_cannonUtilJs) {
      commitShapeUpdates = _cannonUtilJs.commitShapeUpdates;
    }, function (_cannonShapeJs) {
      CannonShape = _cannonShapeJs.CannonShape;
    }],
    execute: function () {
      _export("CannonPlaneShape", CannonPlaneShape = /*#__PURE__*/function (_CannonShape) {
        _inheritsLoose(CannonPlaneShape, _CannonShape);

        function CannonPlaneShape() {
          var _this;

          _this = _CannonShape.call(this) || this;
          _this._shape = new CANNON.Plane();
          return _this;
        }

        var _proto = CannonPlaneShape.prototype;

        _proto.setNormal = function setNormal(v) {
          Quat.rotationTo(this._orient, Vec3.UNIT_Z, v);

          if (this._index !== -1) {
            commitShapeUpdates(this._body);
          }
        };

        _proto.setConstant = function setConstant(v) {
          Vec3.scaleAndAdd(this._offset, this._collider.center, this.collider.normal, v);
        };

        _proto.onLoad = function onLoad() {
          _CannonShape.prototype.onLoad.call(this);

          this.setConstant(this.collider.constant);
          this.setNormal(this.collider.normal);
        };

        _proto._setCenter = function _setCenter(v) {
          _CannonShape.prototype._setCenter.call(this, v);

          this.setConstant(this.collider.constant);
        };

        _createClass(CannonPlaneShape, [{
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

        return CannonPlaneShape;
      }(CannonShape));
    }
  };
});