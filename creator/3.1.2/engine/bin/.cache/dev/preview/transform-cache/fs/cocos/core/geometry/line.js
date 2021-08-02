System.register("q-bundled:///fs/cocos/core/geometry/line.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, Line;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }],
    execute: function () {
      /**
       * @en
       * Basic Geometry: Line.
       * @zh
       * 基础几何 line。
       */
      _export("Line", Line = /*#__PURE__*/function () {
        /**
         * @en
         * create a new line
         * @zh
         * 创建一个新的 line。
         * @param sx 起点的 x 部分。
         * @param sy 起点的 y 部分。
         * @param sz 起点的 z 部分。
         * @param ex 终点的 x 部分。
         * @param ey 终点的 y 部分。
         * @param ez 终点的 z 部分。
         * @return
         */
        Line.create = function create(sx, sy, sz, ex, ey, ez) {
          return new Line(sx, sy, sz, ex, ey, ez);
        }
        /**
         * @en
         * Creates a new Line initialized with values from an existing Line
         * @zh
         * 克隆一个新的 line。
         * @param a 克隆的来源。
         * @return 克隆出的对象。
         */
        ;

        Line.clone = function clone(a) {
          return new Line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
        }
        /**
         * @en
         * Copy the values from one Line to another
         * @zh
         * 复制一个线的值到另一个。
         * @param out 接受操作的对象。
         * @param a 复制的来源。
         * @return 接受操作的对象。
         */
        ;

        Line.copy = function copy(out, a) {
          Vec3.copy(out.s, a.s);
          Vec3.copy(out.e, a.e);
          return out;
        }
        /**
         * @en
         * create a line from two points
         * @zh
         * 用两个点创建一个线。
         * @param out 接受操作的对象。
         * @param start 起点。
         * @param end 终点。
         * @return out 接受操作的对象。
         */
        ;

        Line.fromPoints = function fromPoints(out, start, end) {
          Vec3.copy(out.s, start);
          Vec3.copy(out.e, end);
          return out;
        }
        /**
         * @en
         * Set the components of a Vec3 to the given values
         * @zh
         * 将给定线的属性设置为给定值。
         * @param out 接受操作的对象。
         * @param sx 起点的 x 部分。
         * @param sy 起点的 y 部分。
         * @param sz 起点的 z 部分。
         * @param ex 终点的 x 部分。
         * @param ey 终点的 y 部分。
         * @param ez 终点的 z 部分。
         * @return out 接受操作的对象。
         */
        ;

        Line.set = function set(out, sx, sy, sz, ex, ey, ez) {
          out.s.x = sx;
          out.s.y = sy;
          out.s.z = sz;
          out.e.x = ex;
          out.e.y = ey;
          out.e.z = ez;
          return out;
        }
        /**
         * @zh
         * 计算线的长度。
         * @param a 要计算的线。
         * @return 长度。
         */
        ;

        Line.len = function len(a) {
          return Vec3.distance(a.s, a.e);
        }
        /**
         * @zh
         * 起点。
         */
        ;

        /**
         * 构造一条线。
         * @param sx 起点的 x 部分。
         * @param sy 起点的 y 部分。
         * @param sz 起点的 z 部分。
         * @param ex 终点的 x 部分。
         * @param ey 终点的 y 部分。
         * @param ez 终点的 z 部分。
         */
        function Line(sx, sy, sz, ex, ey, ez) {
          if (sx === void 0) {
            sx = 0;
          }

          if (sy === void 0) {
            sy = 0;
          }

          if (sz === void 0) {
            sz = 0;
          }

          if (ex === void 0) {
            ex = 0;
          }

          if (ey === void 0) {
            ey = 0;
          }

          if (ez === void 0) {
            ez = -1;
          }

          this.s = void 0;
          this.e = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_LINE;
          this.s = new Vec3(sx, sy, sz);
          this.e = new Vec3(ex, ey, ez);
        }
        /**
         * @zh
         * 计算线的长度。
         * @param a 要计算的线。
         * @return 长度。
         */


        var _proto = Line.prototype;

        _proto.length = function length() {
          return Vec3.distance(this.s, this.e);
        };

        _createClass(Line, [{
          key: "type",
          get:
          /**
           * @en
           * Gets the type of the shape.
           * @zh
           * 获取形状的类型。
           */
          function get() {
            return this._type;
          }
        }]);

        return Line;
      }());
    }
  };
});