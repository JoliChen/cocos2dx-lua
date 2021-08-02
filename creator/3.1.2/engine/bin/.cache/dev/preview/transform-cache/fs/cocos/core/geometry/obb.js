System.register("q-bundled:///fs/cocos/core/geometry/obb.js", ["../math/index.js", "./enums.js"], function (_export, _context) {
  "use strict";

  var Mat3, Vec3, enums, _v3_tmp, _v3_tmp2, _m3_tmp, transform_extent_m3, OBB;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_mathIndexJs) {
      Mat3 = _mathIndexJs.Mat3;
      Vec3 = _mathIndexJs.Vec3;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }],
    execute: function () {
      _v3_tmp = new Vec3();
      _v3_tmp2 = new Vec3();
      _m3_tmp = new Mat3(); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/

      transform_extent_m3 = function transform_extent_m3(out, extent, m3) {
        _m3_tmp.m00 = Math.abs(m3.m00);
        _m3_tmp.m01 = Math.abs(m3.m01);
        _m3_tmp.m02 = Math.abs(m3.m02);
        _m3_tmp.m03 = Math.abs(m3.m03);
        _m3_tmp.m04 = Math.abs(m3.m04);
        _m3_tmp.m05 = Math.abs(m3.m05);
        _m3_tmp.m06 = Math.abs(m3.m06);
        _m3_tmp.m07 = Math.abs(m3.m07);
        _m3_tmp.m08 = Math.abs(m3.m08);
        Vec3.transformMat3(out, extent, _m3_tmp);
      };
      /**
       * @en
       * Basic Geometry: directional bounding box.
       * @zh
       * 基础几何  方向包围盒。
       */


      _export("OBB", OBB = /*#__PURE__*/function () {
        /**
         * @en
         * create a new obb
         * @zh
         * 创建一个新的 obb 实例。
         * @param cx 形状的相对于原点的 X 坐标。
         * @param cy 形状的相对于原点的 Y 坐标。
         * @param cz 形状的相对于原点的 Z 坐标。
         * @param hw - obb 宽度的一半。
         * @param hh - obb 高度的一半。
         * @param hl - obb 长度的一半。
         * @param ox_1 方向矩阵参数。
         * @param ox_2 方向矩阵参数。
         * @param ox_3 方向矩阵参数。
         * @param oy_1 方向矩阵参数。
         * @param oy_2 方向矩阵参数。
         * @param oy_3 方向矩阵参数。
         * @param oz_1 方向矩阵参数。
         * @param oz_2 方向矩阵参数。
         * @param oz_3 方向矩阵参数。
         * @return 返回一个 obb。
         */
        OBB.create = function create(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
          return new OBB(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
        }
        /**
         * @en
         * clone a new obb
         * @zh
         * 克隆一个 obb。
         * @param a 克隆的目标。
         * @returns 克隆出的新对象。
         */
        ;

        OBB.clone = function clone(a) {
          return new OBB(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z, a.orientation.m00, a.orientation.m01, a.orientation.m02, a.orientation.m03, a.orientation.m04, a.orientation.m05, a.orientation.m06, a.orientation.m07, a.orientation.m08);
        }
        /**
         * @en
         * copy the values from one obb to another
         * @zh
         * 将从一个 obb 的值复制到另一个 obb。
         * @param {OBB} out 接受操作的 obb。
         * @param {OBB} a 被复制的 obb。
         * @return {OBB} out 接受操作的 obb。
         */
        ;

        OBB.copy = function copy(out, a) {
          Vec3.copy(out.center, a.center);
          Vec3.copy(out.halfExtents, a.halfExtents);
          Mat3.copy(out.orientation, a.orientation);
          return out;
        }
        /**
         * @en
         * create a new obb from two corner points
         * @zh
         * 用两个点创建一个新的 obb。
         * @param out - 接受操作的 obb。
         * @param minPos - obb 的最小点。
         * @param maxPos - obb 的最大点。
         * @returns {OBB} out 接受操作的 obb。
         */
        ;

        OBB.fromPoints = function fromPoints(out, minPos, maxPos) {
          Vec3.multiplyScalar(out.center, Vec3.add(_v3_tmp, minPos, maxPos), 0.5);
          Vec3.multiplyScalar(out.halfExtents, Vec3.subtract(_v3_tmp2, maxPos, minPos), 0.5);
          Mat3.identity(out.orientation);
          return out;
        }
        /**
         * @en
         * Set the components of a obb to the given values
         * @zh
         * 将给定 obb 的属性设置为给定的值。
         * @param cx - obb 的原点的 X 坐标。
         * @param cy - obb 的原点的 Y 坐标。
         * @param cz - obb 的原点的 Z 坐标。
         * @param hw - obb 宽度的一半。
         * @param hh - obb 高度的一半。
         * @param hl - obb 长度的一半。
         * @param ox_1 方向矩阵参数。
         * @param ox_2 方向矩阵参数。
         * @param ox_3 方向矩阵参数。
         * @param oy_1 方向矩阵参数。
         * @param oy_2 方向矩阵参数。
         * @param oy_3 方向矩阵参数。
         * @param oz_1 方向矩阵参数。
         * @param oz_2 方向矩阵参数。
         * @param oz_3 方向矩阵参数。
         * @return {OBB} out
         */
        ;

        OBB.set = function set(out, cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
          Vec3.set(out.center, cx, cy, cz);
          Vec3.set(out.halfExtents, hw, hh, hl);
          Mat3.set(out.orientation, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
          return out;
        }
        /**
         * @zh
         * 本地坐标的中心点。
         */
        ;

        function OBB(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
          if (cx === void 0) {
            cx = 0;
          }

          if (cy === void 0) {
            cy = 0;
          }

          if (cz === void 0) {
            cz = 0;
          }

          if (hw === void 0) {
            hw = 1;
          }

          if (hh === void 0) {
            hh = 1;
          }

          if (hl === void 0) {
            hl = 1;
          }

          if (ox_1 === void 0) {
            ox_1 = 1;
          }

          if (ox_2 === void 0) {
            ox_2 = 0;
          }

          if (ox_3 === void 0) {
            ox_3 = 0;
          }

          if (oy_1 === void 0) {
            oy_1 = 0;
          }

          if (oy_2 === void 0) {
            oy_2 = 1;
          }

          if (oy_3 === void 0) {
            oy_3 = 0;
          }

          if (oz_1 === void 0) {
            oz_1 = 0;
          }

          if (oz_2 === void 0) {
            oz_2 = 0;
          }

          if (oz_3 === void 0) {
            oz_3 = 1;
          }

          this.center = void 0;
          this.halfExtents = void 0;
          this.orientation = void 0;
          this._type = void 0;
          this._type = enums.SHAPE_OBB;
          this.center = new Vec3(cx, cy, cz);
          this.halfExtents = new Vec3(hw, hh, hl);
          this.orientation = new Mat3(ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
        }
        /**
         * @en
         * Get the bounding points of this shape
         * @zh
         * 获取 obb 的最小点和最大点。
         * @param {Vec3} minPos 最小点。
         * @param {Vec3} maxPos 最大点。
         */


        var _proto = OBB.prototype;

        _proto.getBoundary = function getBoundary(minPos, maxPos) {
          transform_extent_m3(_v3_tmp, this.halfExtents, this.orientation);
          Vec3.subtract(minPos, this.center, _v3_tmp);
          Vec3.add(maxPos, this.center, _v3_tmp);
        }
        /**
         * Transform this shape
         * @zh
         * 将 out 根据这个 obb 的数据进行变换。
         * @param m 变换的矩阵。
         * @param pos 变换的位置部分。
         * @param rot 变换的旋转部分。
         * @param scale 变换的缩放部分。
         * @param out 变换的目标。
         */
        ;

        _proto.transform = function transform(m, pos, rot, scale, out) {
          Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now

          Mat3.fromQuat(out.orientation, rot);
          Vec3.multiply(out.halfExtents, this.halfExtents, scale);
        }
        /**
         * @zh
         * 将 out 根据这个 obb 的数据进行变换。
         * @param m 变换的矩阵。
         * @param rot 变换的旋转部分。
         * @param out 变换的目标。
         */
        ;

        _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
          Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now

          Mat3.fromQuat(out.orientation, rot);
        }
        /**
         * @zh
         *  将 out 根据这个 obb 的数据进行缩放。
         * @param scale 缩放值。
         * @param out 缩放的目标。
         */
        ;

        _proto.setScale = function setScale(scale, out) {
          Vec3.multiply(out.halfExtents, this.halfExtents, scale);
        };

        _createClass(OBB, [{
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

        return OBB;
      }());
    }
  };
});