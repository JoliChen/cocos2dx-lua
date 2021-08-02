System.register("q-bundled:///fs/cocos/2d/assembler/graphics/webgl/impl.js", ["../../../../core/math/index.js", "../../../renderer/render-data.js", "../helper.js", "../types.js"], function (_export, _context) {
  "use strict";

  var Color, Vec2, MeshRenderData, _arc, _ellipse, _roundRect, tesselateBezier, LineCap, LineJoin, PointFlags, Point, Path, Impl;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Vec2 = _coreMathIndexJs.Vec2;
    }, function (_rendererRenderDataJs) {
      MeshRenderData = _rendererRenderDataJs.MeshRenderData;
    }, function (_helperJs) {
      _arc = _helperJs.arc;
      _ellipse = _helperJs.ellipse;
      _roundRect = _helperJs.roundRect;
      tesselateBezier = _helperJs.tesselateBezier;
    }, function (_typesJs) {
      LineCap = _typesJs.LineCap;
      LineJoin = _typesJs.LineJoin;
      PointFlags = _typesJs.PointFlags;
    }],
    execute: function () {
      _export("Point", Point = /*#__PURE__*/function (_Vec) {
        _inheritsLoose(Point, _Vec);

        function Point(x, y) {
          var _this;

          _this = _Vec.call(this, x, y) || this;
          _this.dx = 0;
          _this.dy = 0;
          _this.dmx = 0;
          _this.dmy = 0;
          _this.flags = 0;
          _this.len = 0;

          _this.reset();

          return _this;
        }

        var _proto = Point.prototype;

        _proto.reset = function reset() {
          this.dx = 0;
          this.dy = 0;
          this.dmx = 0;
          this.dmy = 0;
          this.flags = 0;
          this.len = 0;
        };

        return Point;
      }(Vec2));

      _export("Path", Path = /*#__PURE__*/function () {
        function Path() {
          this.closed = false;
          this.bevel = 0;
          this.complex = true;
          this.points = [];
          this.reset();
        }

        var _proto2 = Path.prototype;

        _proto2.reset = function reset() {
          this.closed = false;
          this.bevel = 0;
          this.complex = true;

          if (this.points) {
            this.points.length = 0;
          } else {
            this.points = [];
          }
        };

        return Path;
      }());

      _export("Impl", Impl = /*#__PURE__*/function () {
        function Impl() {
          this.dataOffset = 0;
          this.updatePathOffset = false;
          this.pathLength = 0;
          this.pathOffset = 0;
          this.paths = [];
          this.tessTol = 0.25;
          this.distTol = 0.01;
          this.fillColor = Color.WHITE.clone();
          this.lineCap = LineCap.BUTT;
          this.strokeColor = Color.BLACK.clone();
          this.lineJoin = LineJoin.MITER;
          this.lineWidth = 0;
          this.pointsOffset = 0;
          this._commandX = 0;
          this._commandY = 0;
          this._points = [];
          this._renderDataList = [];
          this._curPath = null;
        }

        var _proto3 = Impl.prototype;

        _proto3.moveTo = function moveTo(x, y) {
          if (this.updatePathOffset) {
            this.pathOffset = this.pathLength;
            this.updatePathOffset = false;
          }

          this._addPath();

          this.addPoint(x, y, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.lineTo = function lineTo(x, y) {
          this.addPoint(x, y, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.bezierCurveTo = function bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
          var path = this._curPath;
          var last = path.points[path.points.length - 1];

          if (!last) {
            return;
          }

          if (last.x === c1x && last.y === c1y && c2x === x && c2y === y) {
            this.lineTo(x, y);
            return;
          }

          tesselateBezier(this, last.x, last.y, c1x, c1y, c2x, c2y, x, y, 0, PointFlags.PT_CORNER);
          this._commandX = x;
          this._commandY = y;
        };

        _proto3.quadraticCurveTo = function quadraticCurveTo(cx, cy, x, y) {
          var x0 = this._commandX;
          var y0 = this._commandY;
          this.bezierCurveTo(x0 + 2.0 / 3.0 * (cx - x0), y0 + 2.0 / 3.0 * (cy - y0), x + 2.0 / 3.0 * (cx - x), y + 2.0 / 3.0 * (cy - y), x, y);
        };

        _proto3.arc = function arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
          _arc(this, cx, cy, r, startAngle, endAngle, counterclockwise);
        };

        _proto3.ellipse = function ellipse(cx, cy, rx, ry) {
          _ellipse(this, cx, cy, rx, ry);

          this._curPath.complex = false;
        };

        _proto3.circle = function circle(cx, cy, r) {
          _ellipse(this, cx, cy, r, r);

          this._curPath.complex = false;
        };

        _proto3.rect = function rect(x, y, w, h) {
          this.moveTo(x, y);
          this.lineTo(x + w, y);
          this.lineTo(x + w, y + h);
          this.lineTo(x, y + h);
          this.close();
          this._curPath.complex = false;
        };

        _proto3.roundRect = function roundRect(x, y, w, h, r) {
          _roundRect(this, x, y, w, h, r);

          this._curPath.complex = false;
        };

        _proto3.clear = function clear() {
          this.pathLength = 0;
          this.pathOffset = 0;
          this.pointsOffset = 0;
          this.dataOffset = 0;
          this._curPath = null;
          this.paths.length = 0;
          this._points.length = 0;
          var dataList = this._renderDataList;

          for (var i = 0, l = dataList.length; i < l; i++) {
            var data = dataList[i];

            if (!data) {
              continue;
            }

            MeshRenderData.remove(data);
          }

          this._renderDataList.length = 0;
        };

        _proto3.close = function close() {
          this._curPath.closed = true;
        };

        _proto3.requestRenderData = function requestRenderData() {
          var renderData = MeshRenderData.add();

          this._renderDataList.push(renderData);

          return renderData;
        };

        _proto3.getRenderDataList = function getRenderDataList() {
          if (this._renderDataList.length === 0) {
            this.requestRenderData();
          }

          return this._renderDataList;
        };

        _proto3.addPoint = function addPoint(x, y, flags) {
          var path = this._curPath;

          if (!path) {
            return;
          }

          var points = this._points;
          var pathPoints = path.points;
          var offset = this.pointsOffset++;
          var pt = points[offset];

          if (!pt) {
            pt = new Point(x, y);
            points.push(pt);
          } else {
            pt.x = x;
            pt.y = y;
          }

          pt.flags = flags;
          pathPoints.push(pt);
        };

        _proto3._addPath = function _addPath() {
          var offset = this.pathLength;
          var path = this.paths[offset];

          if (!path) {
            path = new Path();
            this.paths.push(path);
          } else {
            path.reset();
          }

          this.pathLength++;
          this._curPath = path;
          return path;
        };

        return Impl;
      }());
    }
  };
});