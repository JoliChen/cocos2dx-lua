System.register("q-bundled:///fs/cocos/physics-2d/builtin/shapes/polygon-shape-2d.js", ["./shape-2d.js", "../../../core/index.js", "../intersection-2d.js"], function (_export, _context) {
  "use strict";

  var BuiltinShape2D, Vec2, Intersection2D, tempVec2, BuiltinPolygonShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_shape2dJs) {
      BuiltinShape2D = _shape2dJs.BuiltinShape2D;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }, function (_intersection2dJs) {
      Intersection2D = _intersection2dJs.default;
    }],
    execute: function () {
      tempVec2 = new Vec2();

      _export("BuiltinPolygonShape", BuiltinPolygonShape = /*#__PURE__*/function (_BuiltinShape2D) {
        _inheritsLoose(BuiltinPolygonShape, _BuiltinShape2D);

        function BuiltinPolygonShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _BuiltinShape2D.call.apply(_BuiltinShape2D, [this].concat(args)) || this;
          _this._worldPoints = [];
          return _this;
        }

        var _proto = BuiltinPolygonShape.prototype;

        _proto.update = function update() {
          var aabb = this._worldAabb;
          var collider = this.collider;
          var points = collider.points;
          var offset = collider.offset;
          var worldMatrix = collider.node.worldMatrix;
          var worldPoints = this._worldPoints;
          worldPoints.length = points.length;
          var minx = 1e6;
          var miny = 1e6;
          var maxx = -1e6;
          var maxy = -1e6;

          for (var i = 0, l = points.length; i < l; i++) {
            if (!worldPoints[i]) {
              worldPoints[i] = new Vec2();
            }

            tempVec2.x = points[i].x + offset.x;
            tempVec2.y = points[i].y + offset.y;
            Vec2.transformMat4(tempVec2, tempVec2, worldMatrix);
            var x = tempVec2.x;
            var y = tempVec2.y;
            worldPoints[i].x = x;
            worldPoints[i].y = y;
            if (x > maxx) maxx = x;
            if (x < minx) minx = x;
            if (y > maxy) maxy = y;
            if (y < miny) miny = y;
          }

          aabb.x = minx;
          aabb.y = miny;
          aabb.width = maxx - minx;
          aabb.height = maxy - miny;
        };

        _proto.containsPoint = function containsPoint(p) {
          if (!this.worldAABB.contains(p)) {
            return false;
          }

          return Intersection2D.pointInPolygon(p, this.worldPoints);
        };

        _proto.intersectsRect = function intersectsRect(rect) {
          if (!this.worldAABB.intersects(rect)) {
            return false;
          }

          return Intersection2D.rectPolygon(rect, this.worldPoints);
        };

        _createClass(BuiltinPolygonShape, [{
          key: "worldPoints",
          get: function get() {
            return this._worldPoints;
          }
        }]);

        return BuiltinPolygonShape;
      }(BuiltinShape2D));
    }
  };
});