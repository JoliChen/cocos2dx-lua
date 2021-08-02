System.register("q-bundled:///fs/cocos/physics-2d/box2d/platform/physics-debug-draw.js", ["@cocos/box2d", "../../../core/index.js", "../../framework/index.js"], function (_export, _context) {
  "use strict";

  var b2, Color, PHYSICS_2D_PTM_RATIO, _tmp_vec2, _tmp_color, GREEN_COLOR, RED_COLOR, PhysicsDebugDraw;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_cocosBox2d) {
      b2 = _cocosBox2d.default;
    }, function (_coreIndexJs) {
      Color = _coreIndexJs.Color;
    }, function (_frameworkIndexJs) {
      PHYSICS_2D_PTM_RATIO = _frameworkIndexJs.PHYSICS_2D_PTM_RATIO;
    }],
    execute: function () {
      _tmp_vec2 = new b2.Vec2();
      _tmp_color = new Color();
      GREEN_COLOR = Color.GREEN;
      RED_COLOR = Color.RED;

      _export("PhysicsDebugDraw", PhysicsDebugDraw = /*#__PURE__*/function (_b2$Draw) {
        _inheritsLoose(PhysicsDebugDraw, _b2$Draw);

        function PhysicsDebugDraw(drawer) {
          var _this;

          _this = _b2$Draw.call(this) || this;
          _this._drawer = null;
          _this._xf = new b2.Transform();
          _this._dxf = new b2.Transform();
          _this._drawer = drawer;
          return _this;
        }

        var _proto = PhysicsDebugDraw.prototype;

        _proto._DrawPolygon = function _DrawPolygon(vertices, vertexCount) {
          var drawer = this._drawer;

          for (var i = 0; i < vertexCount; i++) {
            b2.Transform.MulXV(this._xf, vertices[i], _tmp_vec2);
            var x = _tmp_vec2.x * PHYSICS_2D_PTM_RATIO;
            var y = _tmp_vec2.y * PHYSICS_2D_PTM_RATIO;
            if (i === 0) drawer.moveTo(x, y);else {
              drawer.lineTo(x, y);
            }
          }

          drawer.close();
        };

        _proto.DrawPolygon = function DrawPolygon(vertices, vertexCount, color) {
          this._applyStrokeColor(color);

          this._DrawPolygon(vertices, vertexCount);

          this._drawer.stroke();
        };

        _proto.DrawSolidPolygon = function DrawSolidPolygon(vertices, vertexCount, color) {
          this._applyFillColor(color);

          this._DrawPolygon(vertices, vertexCount);

          this._drawer.fill();

          this._drawer.stroke();
        };

        _proto._DrawCircle = function _DrawCircle(center, radius) {
          var p = this._xf.p;

          this._drawer.circle((center.x + p.x) * PHYSICS_2D_PTM_RATIO, (center.y + p.y) * PHYSICS_2D_PTM_RATIO, radius * PHYSICS_2D_PTM_RATIO);
        };

        _proto.DrawCircle = function DrawCircle(center, radius, color) {
          this._applyStrokeColor(color);

          this._DrawCircle(center, radius);

          this._drawer.stroke();
        };

        _proto.DrawSolidCircle = function DrawSolidCircle(center, radius, axis, color) {
          this._applyFillColor(color);

          this._DrawCircle(center, radius);

          this._drawer.fill();
        };

        _proto.DrawSegment = function DrawSegment(p1, p2, color) {
          var drawer = this._drawer;

          if (p1.x === p2.x && p1.y === p2.y) {
            this._applyFillColor(color);

            this._DrawCircle(p1, 2 / PHYSICS_2D_PTM_RATIO);

            drawer.fill();
            return;
          }

          this._applyStrokeColor(color);

          b2.Transform.MulXV(this._xf, p1, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          b2.Transform.MulXV(this._xf, p2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
        };

        _proto.DrawTransform = function DrawTransform(xf) {
          var drawer = this._drawer;
          drawer.strokeColor = RED_COLOR;
          _tmp_vec2.x = _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          _tmp_vec2.x = 1;
          _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
          drawer.strokeColor = GREEN_COLOR;
          _tmp_vec2.x = _tmp_vec2.y = 0;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.moveTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          _tmp_vec2.x = 0;
          _tmp_vec2.y = 1;
          b2.Transform.MulXV(xf, _tmp_vec2, _tmp_vec2);
          drawer.lineTo(_tmp_vec2.x * PHYSICS_2D_PTM_RATIO, _tmp_vec2.y * PHYSICS_2D_PTM_RATIO);
          drawer.stroke();
        };

        _proto.DrawPoint = function DrawPoint(center, radius, color) {};

        _proto.DrawParticles = function DrawParticles() {};

        _proto._applyStrokeColor = function _applyStrokeColor(color) {
          this._drawer.strokeColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
        };

        _proto._applyFillColor = function _applyFillColor(color) {
          this._drawer.fillColor = _tmp_color.set(color.r * 255, color.g * 255, color.b * 255, 150);
        };

        _proto.PushTransform = function PushTransform(xf) {
          this._xf = xf;
        };

        _proto.PopTransform = function PopTransform() {
          this._xf = this._dxf;
        };

        return PhysicsDebugDraw;
      }(b2.Draw));
    }
  };
});