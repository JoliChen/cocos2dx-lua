System.register("q-bundled:///fs/cocos/core/geometry/plane.js", ["../math/index.js", "./enums.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var Mat4, Vec3, Vec4, enums, legacyCC, v1, v2, temp_mat, temp_vec4, Plane;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Mat4 = _mathIndexJs.Mat4;
      Vec3 = _mathIndexJs.Vec3;
      Vec4 = _mathIndexJs.Vec4;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      v1 = new Vec3(0, 0, 0);
      v2 = new Vec3(0, 0, 0);
      temp_mat = legacyCC.mat4();
      temp_vec4 = legacyCC.v4();
      /**
       * @en
       * Basic Geometry: Plane.
       * @zh
       * 基础几何 Plane。
       */

      _export("Plane", Plane = /*#__PURE__*/function () {
        /**
         * @en
         * create a new plane
         * @zh
         * 创建一个新的 plane。
         * @param nx 法向分量的 x 部分。
         * @param ny 法向分量的 y 部分。
         * @param nz 法向分量的 z 部分。
         * @param d 与原点的距离。
         * @return
         */
        Plane.create = function create(nx, ny, nz, d) {
          return new Plane(nx, ny, nz, d);
        }
        /**
         * @en
         * clone a new plane
         * @zh
         * 克隆一个新的 plane。
         * @param p 克隆的来源。
         * @return 克隆出的对象。
         */
        ;

        Plane.clone = function clone(p) {
          return new Plane(p.n.x, p.n.y, p.n.z, p.d);
        }
        /**
         * @en
         * copy the values from one plane to another
         * @zh
         * 复制一个平面的值到另一个。
         * @param out 接受操作的对象。
         * @param p 复制的来源。
         * @return 接受操作的对象。
         */
        ;

        Plane.copy = function copy(out, p) {
          Vec3.copy(out.n, p.n);
          out.d = p.d;
          return out;
        }
        /**
         * @en
         * create a plane from three points
         * @zh
         * 用三个点创建一个平面。
         * @param out 接受操作的对象。
         * @param a 点 a。
         * @param b 点 b。
         * @param c 点 c。
         * @return out 接受操作的对象。
         */
        ;

        Plane.fromPoints = function fromPoints(out, a, b, c) {
          Vec3.subtract(v1, b, a);
          Vec3.subtract(v2, c, a);
          Vec3.normalize(out.n, Vec3.cross(out.n, v1, v2));
          out.d = Vec3.dot(out.n, a);
          return out;
        }
        /**
         * @en
         * Set the components of a plane to the given values
         * @zh
         * 将给定平面的属性设置为给定值。
         * @param out 接受操作的对象。
         * @param nx 法向分量的 x 部分。
         * @param ny 法向分量的 y 部分。
         * @param nz 法向分量的 z 部分。
         * @param d 与原点的距离。
         * @return out 接受操作的对象。
         */
        ;

        Plane.set = function set(out, nx, ny, nz, d) {
          out.n.x = nx;
          out.n.y = ny;
          out.n.z = nz;
          out.d = d;
          return out;
        }
        /**
         * @en
         * create plane from normal and point
         * @zh
         * 用一条法线和一个点创建平面。
         * @param out 接受操作的对象。
         * @param normal 平面的法线。
         * @param point 平面上的一点。
         * @return out 接受操作的对象。
         */
        ;

        Plane.fromNormalAndPoint = function fromNormalAndPoint(out, normal, point) {
          Vec3.copy(out.n, normal);
          out.d = Vec3.dot(normal, point);
          return out;
        }
        /**
         * @en
         * normalize a plane
         * @zh
         * 归一化一个平面。
         * @param out 接受操作的对象。
         * @param a 操作的源数据。
         * @return out 接受操作的对象。
         */
        ;

        Plane.normalize = function normalize(out, a) {
          var len = a.n.length();
          Vec3.normalize(out.n, a.n);

          if (len > 0) {
            out.d = a.d / len;
          }

          return out;
        }
        /**
         * @en
         * The normal of the plane.
         * @zh
         * 法线向量。
         */
        ;

        /**
         * @en
         * Construct a plane.
         * @zh
         * 构造一个平面。
         * @param nx 法向分量的 x 部分。
         * @param ny 法向分量的 y 部分。
         * @param nz 法向分量的 z 部分。
         * @param d 与原点的距离。
         */
        function Plane(nx, ny, nz, d) {
          if (nx === void 0) {
            nx = 0;
          }

          if (ny === void 0) {
            ny = 1;
          }

          if (nz === void 0) {
            nz = 0;
          }

          if (d === void 0) {
            d = 0;
          }

          this.n = void 0;
          this.d = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_PLANE;
          this.n = new Vec3(nx, ny, nz);
          this.d = d;
        }
        /**
         * @en
         * transform this plane.
         * @zh
         * 变换一个平面。
         * @param mat
         */


        var _proto = Plane.prototype;

        _proto.transform = function transform(mat) {
          Mat4.invert(temp_mat, mat);
          Mat4.transpose(temp_mat, temp_mat);
          Vec4.set(temp_vec4, this.n.x, this.n.y, this.n.z, this.d);
          Vec4.transformMat4(temp_vec4, temp_vec4, temp_mat);
          Vec3.set(this.n, temp_vec4.x, temp_vec4.y, temp_vec4.z);
          this.d = temp_vec4.w;
        };

        _createClass(Plane, [{
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
          } // compatibility with vector interfaces

        }, {
          key: "x",
          get: function get() {
            return this.n.x;
          },
          set: function set(val) {
            this.n.x = val;
          }
        }, {
          key: "y",
          get: function get() {
            return this.n.y;
          },
          set: function set(val) {
            this.n.y = val;
          }
        }, {
          key: "z",
          get: function get() {
            return this.n.z;
          },
          set: function set(val) {
            this.n.z = val;
          }
        }, {
          key: "w",
          get: function get() {
            return this.d;
          },
          set: function set(val) {
            this.d = val;
          }
        }]);

        return Plane;
      }());
    }
  };
});