System.register("q-bundled:///fs/cocos/physics/cocos/shapes/builtin-box-shape.js", ["../../../core/math/index.js", "../../../core/geometry/index.js", "./builtin-shape.js"], function (_export, _context) {
  "use strict";

  var Vec3, OBB, BuiltinShape, BuiltinBoxShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreGeometryIndexJs) {
      OBB = _coreGeometryIndexJs.OBB;
    }, function (_builtinShapeJs) {
      BuiltinShape = _builtinShapeJs.BuiltinShape;
    }],
    execute: function () {
      _export("BuiltinBoxShape", BuiltinBoxShape = /*#__PURE__*/function (_BuiltinShape) {
        _inheritsLoose(BuiltinBoxShape, _BuiltinShape);

        function BuiltinBoxShape() {
          var _this;

          _this = _BuiltinShape.call(this) || this;
          _this._localShape = new OBB();
          _this._worldShape = new OBB();
          return _this;
        }

        var _proto = BuiltinBoxShape.prototype;

        _proto.setSize = function setSize(size) {
          Vec3.multiplyScalar(this.localObb.halfExtents, size, 0.5);
          Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, this.collider.node.worldScale);
        };

        _proto.onLoad = function onLoad() {
          _BuiltinShape.prototype.onLoad.call(this);

          this.setSize(this.collider.size);
        };

        _createClass(BuiltinBoxShape, [{
          key: "localObb",
          get: function get() {
            return this._localShape;
          }
        }, {
          key: "worldObb",
          get: function get() {
            return this._worldShape;
          }
        }, {
          key: "collider",
          get: function get() {
            return this._collider;
          }
        }]);

        return BuiltinBoxShape;
      }(BuiltinShape));
    }
  };
});