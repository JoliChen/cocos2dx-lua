System.register("q-bundled:///fs/cocos/core/geometry/triangle.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Vec3, enums, Triangle;

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
       * Basic Geometry: Triangle.
       * @zh
       * 基础几何 三角形。
       */
      _export("Triangle", Triangle = /*#__PURE__*/function () {
        /**
         * @en
         * create a new triangle
         * @zh
         * 创建一个新的 triangle。
         * @param {number} ax a 点的 x 部分。
         * @param {number} ay a 点的 y 部分。
         * @param {number} az a 点的 z 部分。
         * @param {number} bx b 点的 x 部分。
         * @param {number} by b 点的 y 部分。
         * @param {number} bz b 点的 z 部分。
         * @param {number} cx c 点的 x 部分。
         * @param {number} cy c 点的 y 部分。
         * @param {number} cz c 点的 z 部分。
         * @return {Triangle} 一个新的 triangle。
         */
        Triangle.create = function create(ax, ay, az, bx, by, bz, cx, cy, cz) {
          if (ax === void 0) {
            ax = 1;
          }

          if (ay === void 0) {
            ay = 0;
          }

          if (az === void 0) {
            az = 0;
          }

          if (bx === void 0) {
            bx = 0;
          }

          if (by === void 0) {
            by = 0;
          }

          if (bz === void 0) {
            bz = 0;
          }

          if (cx === void 0) {
            cx = 0;
          }

          if (cy === void 0) {
            cy = 0;
          }

          if (cz === void 0) {
            cz = 1;
          }

          return new Triangle(ax, ay, az, bx, by, bz, cx, cy, cz);
        }
        /**
         * @en
         * clone a new triangle
         * @zh
         * 克隆一个新的 triangle。
         * @param {Triangle} t 克隆的目标。
         * @return {Triangle} 克隆出的新对象。
         */
        ;

        Triangle.clone = function clone(t) {
          return new Triangle(t.a.x, t.a.y, t.a.z, t.b.x, t.b.y, t.b.z, t.c.x, t.c.y, t.c.z);
        }
        /**
         * @en
         * copy the values from one triangle to another
         * @zh
         * 将一个 triangle 的值复制到另一个 triangle。
         * @param {Triangle} out 接受操作的 triangle。
         * @param {Triangle} t 被复制的 triangle。
         * @return {Triangle} out 接受操作的 triangle。
         */
        ;

        Triangle.copy = function copy(out, t) {
          Vec3.copy(out.a, t.a);
          Vec3.copy(out.b, t.b);
          Vec3.copy(out.c, t.c);
          return out;
        }
        /**
         * @en
         * Create a triangle from three points
         * @zh
         * 用三个点创建一个 triangle。
         * @param {Triangle} out 接受操作的 triangle。
         * @param {Vec3} a a 点。
         * @param {Vec3} b b 点。
         * @param {Vec3} c c 点。
         * @return {Triangle} out 接受操作的 triangle。
         */
        ;

        Triangle.fromPoints = function fromPoints(out, a, b, c) {
          Vec3.copy(out.a, a);
          Vec3.copy(out.b, b);
          Vec3.copy(out.c, c);
          return out;
        }
        /**
         * @en
         * Set the components of a triangle to the given values
         * @zh
         * 将给定三角形的属性设置为给定值。
         * @param {Triangle} out 给定的三角形。
         * @param {number} ax a 点的 x 部分。
         * @param {number} ay a 点的 y 部分。
         * @param {number} az a 点的 z 部分。
         * @param {number} bx b 点的 x 部分。
         * @param {number} by b 点的 y 部分。
         * @param {number} bz b 点的 z 部分。
         * @param {number} cx c 点的 x 部分。
         * @param {number} cy c 点的 y 部分。
         * @param {number} cz c 点的 z 部分。
         * @return {Triangle}
         * @function
         */
        ;

        Triangle.set = function set(out, ax, ay, az, bx, by, bz, cx, cy, cz) {
          out.a.x = ax;
          out.a.y = ay;
          out.a.z = az;
          out.b.x = bx;
          out.b.y = by;
          out.b.z = bz;
          out.c.x = cx;
          out.c.y = cy;
          out.c.z = cz;
          return out;
        }
        /**
         * @en
         * Point a.
         * @zh
         * 点 a。
         */
        ;

        /**
         * @en
         * Construct a triangle.
         * @zh
         * 构造一个三角形。
         * @param {number} ax a 点的 x 部分。
         * @param {number} ay a 点的 y 部分。
         * @param {number} az a 点的 z 部分。
         * @param {number} bx b 点的 x 部分。
         * @param {number} by b 点的 y 部分。
         * @param {number} bz b 点的 z 部分。
         * @param {number} cx c 点的 x 部分。
         * @param {number} cy c 点的 y 部分。
         * @param {number} cz c 点的 z 部分。
         */
        function Triangle(ax, ay, az, bx, by, bz, cx, cy, cz) {
          if (ax === void 0) {
            ax = 0;
          }

          if (ay === void 0) {
            ay = 0;
          }

          if (az === void 0) {
            az = 0;
          }

          if (bx === void 0) {
            bx = 1;
          }

          if (by === void 0) {
            by = 0;
          }

          if (bz === void 0) {
            bz = 0;
          }

          if (cx === void 0) {
            cx = 0;
          }

          if (cy === void 0) {
            cy = 1;
          }

          if (cz === void 0) {
            cz = 0;
          }

          this.a = void 0;
          this.b = void 0;
          this.c = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_TRIANGLE;
          this.a = new Vec3(ax, ay, az);
          this.b = new Vec3(bx, by, bz);
          this.c = new Vec3(cx, cy, cz);
        }

        _createClass(Triangle, [{
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

        return Triangle;
      }());
    }
  };
});