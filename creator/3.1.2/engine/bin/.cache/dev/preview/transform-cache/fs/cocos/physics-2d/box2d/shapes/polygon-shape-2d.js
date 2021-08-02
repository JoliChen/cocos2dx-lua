System.register("q-bundled:///fs/cocos/physics-2d/box2d/shapes/polygon-shape-2d.js", ["@cocos/box2d", "./shape-2d.js", "../../framework/utils/polygon-separator.js", "../../framework/physics-types.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var b2, b2Shape2D, PolygonSeparator, PHYSICS_2D_PTM_RATIO, Vec2, b2PolygonShape;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_shape2dJs) {
      b2Shape2D = _shape2dJs.b2Shape2D;
    }, function (_frameworkUtilsPolygonSeparatorJs) {
      PolygonSeparator = _frameworkUtilsPolygonSeparatorJs;
    }, function (_frameworkPhysicsTypesJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkPhysicsTypesJs.PHYSICS_2D_PTM_RATIO;
    }, function (_coreIndexJs) {
      Vec2 = _coreIndexJs.Vec2;
    }],
    execute: function () {
      _export("b2PolygonShape", b2PolygonShape = /*#__PURE__*/function (_b2Shape2D) {
        _inheritsLoose(b2PolygonShape, _b2Shape2D);

        function b2PolygonShape() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _b2Shape2D.call.apply(_b2Shape2D, [this].concat(args)) || this;
          _this._worldPoints = [];
          return _this;
        }

        var _proto = b2PolygonShape.prototype;

        _proto._createShapes = function _createShapes(scaleX, scaleY) {
          var shapes = [];
          var comp = this.collider;
          var points = comp.points; // check if last point equal to first point

          if (points.length > 0 && points[0].equals(points[points.length - 1])) {
            points.length -= 1;
          }

          var polys = PolygonSeparator.ConvexPartition(points);
          var offset = comp.offset;

          for (var i = 0; i < polys.length; i++) {
            var poly = polys[i];
            var shape = null;
            var vertices = [];
            var firstVertice = null;

            for (var j = 0, l = poly.length; j < l; j++) {
              if (!shape) {
                shape = new b2.PolygonShape();
              }

              var p = poly[j];
              var x = (p.x + offset.x) / PHYSICS_2D_PTM_RATIO * scaleX;
              var y = (p.y + offset.y) / PHYSICS_2D_PTM_RATIO * scaleY;
              var v = new b2.Vec2(x, y);
              vertices.push(v);

              if (!firstVertice) {
                firstVertice = v;
              }

              if (vertices.length === b2.maxPolygonVertices) {
                shape.Set(vertices, vertices.length);
                shapes.push(shape);
                shape = null;

                if (j < l - 1) {
                  vertices = [firstVertice, vertices[vertices.length - 1]];
                }
              }
            }

            if (shape) {
              shape.Set(vertices, vertices.length);
              shapes.push(shape);
            }
          }

          return shapes;
        };

        _createClass(b2PolygonShape, [{
          key: "worldPoints",
          get: function get() {
            var comp = this.collider;
            var points = comp.points;
            var worldPoints = this._worldPoints;
            var m = comp.node.worldMatrix;

            for (var i = 0; i < points.length; i++) {
              if (!worldPoints[i]) {
                worldPoints[i] = new Vec2();
              }

              Vec2.transformMat4(worldPoints[i], points[i], m);
            }

            worldPoints.length = points.length;
            return this._worldPoints;
          }
        }]);

        return b2PolygonShape;
      }(b2Shape2D));
    }
  };
});