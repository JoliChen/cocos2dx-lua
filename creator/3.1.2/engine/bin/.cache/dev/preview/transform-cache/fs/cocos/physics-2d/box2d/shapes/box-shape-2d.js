System.register("q-bundled:///fs/cocos/physics-2d/box2d/shapes/box-shape-2d.js", ["@cocos/box2d", "./shape-2d.js", "../../framework/physics-types.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Shape2D, PHYSICS_2D_PTM_RATIO, Vec2, Rect, tempAabb, b2BoxShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_shape2dJs) {
      b2Shape2D = _shape2dJs.b2Shape2D;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
      Rect = _coreIndexJs.Rect;
    }],
    execute: function () {
      tempAabb = new Rect();

      _export("b2BoxShape", b2BoxShape = /*#__PURE__*/function (_b2Shape2D) {
        _inheritsLoose(b2BoxShape, _b2Shape2D);

        function b2BoxShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2Shape2D.call.apply(_b2Shape2D, [this].concat(args)) || this;
          _this._worldPoints = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
          return _this;
        }

        var _proto = b2BoxShape.prototype;

        _proto._createShapes = function _createShapes(scaleX, scaleY) {
          scaleX = Math.abs(scaleX);
          scaleY = Math.abs(scaleY);
          var comp = this.collider;
          var width = comp.size.width / 2 / PHYSICS_2D_PTM_RATIO * scaleX;
          var height = comp.size.height / 2 / PHYSICS_2D_PTM_RATIO * scaleY;
          var offsetX = comp.offset.x / PHYSICS_2D_PTM_RATIO * scaleX;
          var offsetY = comp.offset.y / PHYSICS_2D_PTM_RATIO * scaleY;
          var shape = new b2.PolygonShape();
          shape.SetAsBox(width, height, new b2.Vec2(offsetX, offsetY), 0);
          return [shape];
        };

        _createClass(b2BoxShape, [{
          key: "worldPoints",
          get: function get() {
            var aabb = tempAabb;
            var collider = this.collider;
            var size = collider.size;
            var offset = collider.offset;
            aabb.x = offset.x - size.width / 2;
            aabb.y = offset.y - size.height / 2;
            aabb.width = size.width;
            aabb.height = size.height;
            var wps = this._worldPoints;
            var wp0 = wps[0];
            var wp1 = wps[1];
            var wp2 = wps[2];
            var wp3 = wps[3];
            aabb.transformMat4ToPoints(collider.node.worldMatrix, wp0, wp1, wp2, wp3);
            return wps;
          }
        }]);

        return b2BoxShape;
      }(b2Shape2D));
    }
  };
});