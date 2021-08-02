System.register("q-bundled:///fs/cocos/core/math/vec3.js", ["../data/class.js", "../value-types/value-type.js", "./utils.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var CCClass, ValueType, clamp, EPSILON, _random, legacyCC, Vec3, v3_1, v3_2;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function v3(x, y, z) {
    return new Vec3(x, y, z);
  }

  _export("v3", v3);

  return {
    setters: [function (_dataClassJs) {
      CCClass = _dataClassJs.CCClass;
    }, function (_valueTypesValueTypeJs) {
      ValueType = _valueTypesValueTypeJs.ValueType;
    }, function (_utilsJs) {
      clamp = _utilsJs.clamp;
      EPSILON = _utilsJs.EPSILON;
      _random = _utilsJs.random;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en Representation of 3D vectors and points.
       * @zh 三维向量。
       */
      _export("Vec3", Vec3 = /*#__PURE__*/function (_ValueType) {
        _inheritsLoose(Vec3, _ValueType);

        // we use -z for view-dir

        /**
         * @en return a Vec3 object with x = 0, y = 0, z = 0.
         * @zh 将目标赋值为零向量
         */
        Vec3.zero = function zero(out) {
          out.x = 0;
          out.y = 0;
          out.z = 0;
          return out;
        }
        /**
         * @en Obtains a clone of the given vector object
         * @zh 获得指定向量的拷贝
         */
        ;

        Vec3.clone = function clone(a) {
          return new Vec3(a.x, a.y, a.z);
        }
        /**
         * @en Copy the target vector and save the results to out vector object
         * @zh 复制目标向量
         */
        ;

        Vec3.copy = function copy(out, a) {
          out.x = a.x;
          out.y = a.y;
          out.z = a.z;
          return out;
        }
        /**
         * @en Sets the out vector with the given x, y and z values
         * @zh 设置向量值
         */
        ;

        Vec3.set = function set(out, x, y, z) {
          out.x = x;
          out.y = y;
          out.z = z;
          return out;
        }
        /**
         * @en Element-wise vector addition and save the results to out vector object
         * @zh 逐元素向量加法
         */
        ;

        Vec3.add = function add(out, a, b) {
          out.x = a.x + b.x;
          out.y = a.y + b.y;
          out.z = a.z + b.z;
          return out;
        }
        /**
         * @en Element-wise vector subtraction and save the results to out vector object
         * @zh 逐元素向量减法
         */
        ;

        Vec3.subtract = function subtract(out, a, b) {
          out.x = a.x - b.x;
          out.y = a.y - b.y;
          out.z = a.z - b.z;
          return out;
        }
        /**
         * @en Element-wise vector multiplication and save the results to out vector object
         * @zh 逐元素向量乘法 (分量积)
         */
        ;

        Vec3.multiply = function multiply(out, a, b) {
          out.x = a.x * b.x;
          out.y = a.y * b.y;
          out.z = a.z * b.z;
          return out;
        }
        /**
         * @en Element-wise vector division and save the results to out vector object
         * @zh 逐元素向量除法
         */
        ;

        Vec3.divide = function divide(out, a, b) {
          out.x = a.x / b.x;
          out.y = a.y / b.y;
          out.z = a.z / b.z;
          return out;
        }
        /**
         * @en Rounds up by elements of the vector and save the results to out vector object
         * @zh 逐元素向量向上取整
         */
        ;

        Vec3.ceil = function ceil(out, a) {
          out.x = Math.ceil(a.x);
          out.y = Math.ceil(a.y);
          out.z = Math.ceil(a.z);
          return out;
        }
        /**
         * @en Element-wise rounds down of the current vector and save the results to the out vector
         * @zh 逐元素向量向下取整
         */
        ;

        Vec3.floor = function floor(out, a) {
          out.x = Math.floor(a.x);
          out.y = Math.floor(a.y);
          out.z = Math.floor(a.z);
          return out;
        }
        /**
         * @en Calculates element-wise minimum values and save to the out vector
         * @zh 逐元素向量最小值
         */
        ;

        Vec3.min = function min(out, a, b) {
          out.x = Math.min(a.x, b.x);
          out.y = Math.min(a.y, b.y);
          out.z = Math.min(a.z, b.z);
          return out;
        }
        /**
         * @en Calculates element-wise maximum values and save to the out vector
         * @zh 逐元素向量最大值
         */
        ;

        Vec3.max = function max(out, a, b) {
          out.x = Math.max(a.x, b.x);
          out.y = Math.max(a.y, b.y);
          out.z = Math.max(a.z, b.z);
          return out;
        }
        /**
         * @en Calculates element-wise round results and save to the out vector
         * @zh 逐元素向量四舍五入取整
         */
        ;

        Vec3.round = function round(out, a) {
          out.x = Math.round(a.x);
          out.y = Math.round(a.y);
          out.z = Math.round(a.z);
          return out;
        }
        /**
         * @en Vector scalar multiplication and save the results to out vector object
         * @zh 向量标量乘法
         */
        ;

        Vec3.multiplyScalar = function multiplyScalar(out, a, b) {
          out.x = a.x * b;
          out.y = a.y * b;
          out.z = a.z * b;
          return out;
        }
        /**
         * @en Element-wise multiplication and addition with the equation: a + b * scale
         * @zh 逐元素向量乘加: A + B * scale
         */
        ;

        Vec3.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
          out.x = a.x + b.x * scale;
          out.y = a.y + b.y * scale;
          out.z = a.z + b.z * scale;
          return out;
        }
        /**
         * @en Calculates the euclidean distance of two vectors
         * @zh 求两向量的欧氏距离
         */
        ;

        Vec3.distance = function distance(a, b) {
          var x = b.x - a.x;
          var y = b.y - a.y;
          var z = b.z - a.z;
          return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * @en Calculates the squared euclidean distance of two vectors
         * @zh 求两向量的欧氏距离平方
         */
        ;

        Vec3.squaredDistance = function squaredDistance(a, b) {
          var x = b.x - a.x;
          var y = b.y - a.y;
          var z = b.z - a.z;
          return x * x + y * y + z * z;
        }
        /**
         * @en Calculates the length of the vector
         * @zh 求向量长度
         */
        ;

        Vec3.len = function len(a) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * @en Calculates the squared length of the vector
         * @zh 求向量长度平方
         */
        ;

        Vec3.lengthSqr = function lengthSqr(a) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          return x * x + y * y + z * z;
        }
        /**
         * @en Sets each element to its negative value
         * @zh 逐元素向量取负
         */
        ;

        Vec3.negate = function negate(out, a) {
          out.x = -a.x;
          out.y = -a.y;
          out.z = -a.z;
          return out;
        }
        /**
         * @en Sets each element to its inverse value, zero value will become Infinity
         * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
         */
        ;

        Vec3.invert = function invert(out, a) {
          out.x = 1.0 / a.x;
          out.y = 1.0 / a.y;
          out.z = 1.0 / a.z;
          return out;
        }
        /**
         * @en Sets each element to its inverse value, zero value will remain zero
         * @zh 逐元素向量取倒数，接近 0 时返回 0
         */
        ;

        Vec3.invertSafe = function invertSafe(out, a) {
          var x = a.x;
          var y = a.y;
          var z = a.z;

          if (Math.abs(x) < EPSILON) {
            out.x = 0;
          } else {
            out.x = 1.0 / x;
          }

          if (Math.abs(y) < EPSILON) {
            out.y = 0;
          } else {
            out.y = 1.0 / y;
          }

          if (Math.abs(z) < EPSILON) {
            out.z = 0;
          } else {
            out.z = 1.0 / z;
          }

          return out;
        }
        /**
         * @en Sets the normalized vector to the out vector
         * @zh 归一化向量
         */
        ;

        Vec3.normalize = function normalize(out, a) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          var len = x * x + y * y + z * z;

          if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = x * len;
            out.y = y * len;
            out.z = z * len;
          }

          return out;
        }
        /**
         * @en Calculates the dot product of the vector
         * @zh 向量点积（数量积）
         */
        ;

        Vec3.dot = function dot(a, b) {
          return a.x * b.x + a.y * b.y + a.z * b.z;
        }
        /**
         * @en Calculates the cross product of the vector
         * @zh 向量叉积（向量积）
         */
        ;

        Vec3.cross = function cross(out, a, b) {
          var ax = a.x,
              ay = a.y,
              az = a.z;
          var bx = b.x,
              by = b.y,
              bz = b.z;
          out.x = ay * bz - az * by;
          out.y = az * bx - ax * bz;
          out.z = ax * by - ay * bx;
          return out;
        }
        /**
         * @en Calculates the linear interpolation between two vectors with a given ratio
         * @zh 逐元素向量线性插值： A + t * (B - A)
         */
        ;

        Vec3.lerp = function lerp(out, a, b, t) {
          out.x = a.x + t * (b.x - a.x);
          out.y = a.y + t * (b.y - a.y);
          out.z = a.z + t * (b.z - a.z);
          return out;
        }
        /**
         * @en Generates a uniformly distributed random vector points from center to the surface of the unit sphere
         * @zh 生成一个在单位球体上均匀分布的随机向量
         * @param scale vector length
         */
        ;

        Vec3.random = function random(out, scale) {
          scale = scale || 1.0;
          var phi = _random() * 2.0 * Math.PI;
          var cosTheta = _random() * 2 - 1;
          var sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
          out.x = sinTheta * Math.cos(phi) * scale;
          out.y = sinTheta * Math.sin(phi) * scale;
          out.z = cosTheta * scale;
          return out;
        }
        /**
         * @en Vector and fourth order matrix multiplication, will complete the vector with a fourth value as one
         * @zh 向量与四维矩阵乘法，默认向量第四位为 1。
         */
        ;

        Vec3.transformMat4 = function transformMat4(out, a, m) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          var rhw = m.m03 * x + m.m07 * y + m.m11 * z + m.m15;
          rhw = rhw ? Math.abs(1 / rhw) : 1;
          out.x = (m.m00 * x + m.m04 * y + m.m08 * z + m.m12) * rhw;
          out.y = (m.m01 * x + m.m05 * y + m.m09 * z + m.m13) * rhw;
          out.z = (m.m02 * x + m.m06 * y + m.m10 * z + m.m14) * rhw;
          return out;
        }
        /**
         * @en Vector and fourth order matrix multiplication, will complete the vector with a fourth element as one
         * @zh 向量与四维矩阵乘法，默认向量第四位为 0。
         */
        ;

        Vec3.transformMat4Normal = function transformMat4Normal(out, a, m) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          var rhw = m.m03 * x + m.m07 * y + m.m11 * z;
          rhw = rhw ? Math.abs(1 / rhw) : 1;
          out.x = (m.m00 * x + m.m04 * y + m.m08 * z) * rhw;
          out.y = (m.m01 * x + m.m05 * y + m.m09 * z) * rhw;
          out.z = (m.m02 * x + m.m06 * y + m.m10 * z) * rhw;
          return out;
        }
        /**
         * @en Vector and third order matrix multiplication
         * @zh 向量与三维矩阵乘法
         */
        ;

        Vec3.transformMat3 = function transformMat3(out, a, m) {
          var x = a.x;
          var y = a.y;
          var z = a.z;
          out.x = x * m.m00 + y * m.m03 + z * m.m06;
          out.y = x * m.m01 + y * m.m04 + z * m.m07;
          out.z = x * m.m02 + y * m.m05 + z * m.m08;
          return out;
        }
        /**
         * @en Affine transformation vector
         * @zh 向量仿射变换
         */
        ;

        Vec3.transformAffine = function transformAffine(out, v, m) {
          var x = v.x;
          var y = v.y;
          var z = v.z;
          out.x = m.m00 * x + m.m04 * y + m.m08 * z + m.m12;
          out.y = m.m01 * x + m.m05 * y + m.m09 * z + m.m13;
          out.x = m.m02 * x + m.m06 * y + m.m10 * z + m.m14;
          return out;
        }
        /**
         * @en Vector quaternion multiplication
         * @zh 向量四元数乘法
         */
        ;

        Vec3.transformQuat = function transformQuat(out, a, q) {
          // benchmarks: http://jsperf.com/quaternion-transform-Vec3-implementations
          // calculate quat * vec
          var ix = q.w * a.x + q.y * a.z - q.z * a.y;
          var iy = q.w * a.y + q.z * a.x - q.x * a.z;
          var iz = q.w * a.z + q.x * a.y - q.y * a.x;
          var iw = -q.x * a.x - q.y * a.y - q.z * a.z; // calculate result * inverse quat

          out.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
          out.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
          out.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
          return out;
        }
        /**
         * @en Transforms the current vector with given scale, rotation and translation in order
         * @zh 以缩放 -> 旋转 -> 平移顺序变换向量
         */
        ;

        Vec3.transformRTS = function transformRTS(out, a, r, t, s) {
          var x = a.x * s.x;
          var y = a.y * s.y;
          var z = a.z * s.z;
          var ix = r.w * x + r.y * z - r.z * y;
          var iy = r.w * y + r.z * x - r.x * z;
          var iz = r.w * z + r.x * y - r.y * x;
          var iw = -r.x * x - r.y * y - r.z * z;
          out.x = ix * r.w + iw * -r.x + iy * -r.z - iz * -r.y + t.x;
          out.y = iy * r.w + iw * -r.y + iz * -r.x - ix * -r.z + t.y;
          out.z = iz * r.w + iw * -r.z + ix * -r.y - iy * -r.x + t.z;
          return out;
        }
        /**
         * @en Transforms the current vector with given scale, rotation and translation in reverse order
         * @zh 以平移 -> 旋转 -> 缩放顺序逆变换向量
         */
        ;

        Vec3.transformInverseRTS = function transformInverseRTS(out, a, r, t, s) {
          var x = a.x - t.x;
          var y = a.y - t.y;
          var z = a.z - t.z;
          var ix = r.w * x - r.y * z + r.z * y;
          var iy = r.w * y - r.z * x + r.x * z;
          var iz = r.w * z - r.x * y + r.y * x;
          var iw = r.x * x + r.y * y + r.z * z;
          out.x = (ix * r.w + iw * r.x + iy * r.z - iz * r.y) / s.x;
          out.y = (iy * r.w + iw * r.y + iz * r.x - ix * r.z) / s.y;
          out.z = (iz * r.w + iw * r.z + ix * r.y - iy * r.x) / s.z;
          return out;
        }
        /**
         * @en Rotates the vector with specified angle around X axis
         * @zh 绕 X 轴旋转向量指定弧度
         * @param v rotation vector
         * @param o center of rotation
         * @param a radius of rotation
         */
        ;

        Vec3.rotateX = function rotateX(out, v, o, a) {
          // Translate point to the origin
          var x = v.x - o.x;
          var y = v.y - o.y;
          var z = v.z - o.z; // perform rotation

          var cos = Math.cos(a);
          var sin = Math.sin(a);
          var rx = x;
          var ry = y * cos - z * sin;
          var rz = y * sin + z * cos; // translate to correct position

          out.x = rx + o.x;
          out.y = ry + o.y;
          out.z = rz + o.z;
          return out;
        }
        /**
         * @en Rotates the vector with specified angle around Y axis
         * @zh 绕 Y 轴旋转向量指定弧度
         * @param v rotation vector
         * @param o center of rotation
         * @param a radius of rotation
         */
        ;

        Vec3.rotateY = function rotateY(out, v, o, a) {
          // Translate point to the origin
          var x = v.x - o.x;
          var y = v.y - o.y;
          var z = v.z - o.z; // perform rotation

          var cos = Math.cos(a);
          var sin = Math.sin(a);
          var rx = z * sin + x * cos;
          var ry = y;
          var rz = z * cos - x * sin; // translate to correct position

          out.x = rx + o.x;
          out.y = ry + o.y;
          out.z = rz + o.z;
          return out;
        }
        /**
         * @en Rotates the vector with specified angle around Z axis
         * @zh 绕 Z 轴旋转向量指定弧度
         * @param v rotation vector
         * @param o center of rotation
         * @param a radius of rotation
         */
        ;

        Vec3.rotateZ = function rotateZ(out, v, o, a) {
          // Translate point to the origin
          var x = v.x - o.x;
          var y = v.y - o.y;
          var z = v.z - o.z; // perform rotation

          var cos = Math.cos(a);
          var sin = Math.sin(a);
          var rx = x * cos - y * sin;
          var ry = x * sin + y * cos;
          var rz = z; // translate to correct position

          out.x = rx + o.x;
          out.y = ry + o.y;
          out.z = rz + o.z;
          return out;
        }
        /**
         * @en Converts the given vector to an array
         * @zh 向量转数组
         * @param ofs Array Start Offset
         */
        ;

        Vec3.toArray = function toArray(out, v, ofs) {
          if (ofs === void 0) {
            ofs = 0;
          }

          out[ofs + 0] = v.x;
          out[ofs + 1] = v.y;
          out[ofs + 2] = v.z;
          return out;
        }
        /**
         * @en Converts the given array to a vector
         * @zh 数组转向量
         * @param ofs Array Start Offset
         */
        ;

        Vec3.fromArray = function fromArray(out, arr, ofs) {
          if (ofs === void 0) {
            ofs = 0;
          }

          out.x = arr[ofs + 0];
          out.y = arr[ofs + 1];
          out.z = arr[ofs + 2];
          return out;
        }
        /**
         * @en Check the equality of the two given vectors
         * @zh 向量等价判断
         */
        ;

        Vec3.strictEquals = function strictEquals(a, b) {
          return a.x === b.x && a.y === b.y && a.z === b.z;
        }
        /**
         * @en Check whether the two given vectors are approximately equivalent
         * @zh 排除浮点数误差的向量近似等价判断
         */
        ;

        Vec3.equals = function equals(a, b, epsilon) {
          if (epsilon === void 0) {
            epsilon = EPSILON;
          }

          var a0 = a.x,
              a1 = a.y,
              a2 = a.z;
          var b0 = b.x,
              b1 = b.y,
              b2 = b.z;
          return Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2));
        }
        /**
         * @en Calculates the radian angle between two vectors
         * @zh 求两向量夹角弧度
         */
        ;

        Vec3.angle = function angle(a, b) {
          Vec3.normalize(v3_1, a);
          Vec3.normalize(v3_2, b);
          var cosine = Vec3.dot(v3_1, v3_2);

          if (cosine > 1.0) {
            return 0;
          }

          if (cosine < -1.0) {
            return Math.PI;
          }

          return Math.acos(cosine);
        }
        /**
         * @en Calculates the projection vector on the specified plane
         * @zh 计算向量在指定平面上的投影
         * @param a projection vector
         * @param n the normal line of specified plane
         */
        ;

        Vec3.projectOnPlane = function projectOnPlane(out, a, n) {
          return Vec3.subtract(out, a, Vec3.project(out, a, n));
        }
        /**
         * @en Calculates the projection on the specified vector
         * @zh 计算向量在指定向量上的投影
         * @param a projection vector
         * @param n target vector
         */
        ;

        Vec3.project = function project(out, a, b) {
          var sqrLen = Vec3.lengthSqr(b);

          if (sqrLen < 0.000001) {
            return Vec3.set(out, 0, 0, 0);
          } else {
            return Vec3.multiplyScalar(out, b, Vec3.dot(a, b) / sqrLen);
          }
        }
        /**
         * @en x component.
         * @zh x 分量。
         */
        ;

        function Vec3(x, y, z) {
          var _this;

          _this = _ValueType.call(this) || this;

          if (x && typeof x === 'object') {
            _this.x = x.x;
            _this.y = x.y;
            _this.z = x.z;
          } else {
            _this.x = x || 0;
            _this.y = y || 0;
            _this.z = z || 0;
          }

          return _this;
        }
        /**
         * @en clone a Vec3 value
         * @zh 克隆当前向量。
         */


        var _proto = Vec3.prototype;

        _proto.clone = function clone() {
          return new Vec3(this.x, this.y, this.z);
        }
        /**
         * @en Set the current vector value with the given vector.
         * @zh 设置当前向量使其与指定向量相等。
         * @param other Specified vector
         * @returns `this`
         */
        ;

        _proto.set = function set(x, y, z) {
          if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
          } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
          }

          return this;
        }
        /**
         * @en Check whether the vector approximately equals another one.
         * @zh 判断当前向量是否在误差范围内与指定向量相等。
         * @param other Specified vector
         * @param epsilon The error allowed. It`s should be a non-negative number.
         * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
         */
        ;

        _proto.equals = function equals(other, epsilon) {
          if (epsilon === void 0) {
            epsilon = EPSILON;
          }

          return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z));
        }
        /**
         * @en Check whether the vector approximately equals another one.
         * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         * @param epsilon The error allowed. It`s should be a non-negative number.
         * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
         */
        ;

        _proto.equals3f = function equals3f(x, y, z, epsilon) {
          if (epsilon === void 0) {
            epsilon = EPSILON;
          }

          return Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)) && Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z));
        }
        /**
         * @en Check whether the current vector strictly equals another Vec3.
         * @zh 判断当前向量是否与指定向量相等。
         * @param other specified vector
         * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
         */
        ;

        _proto.strictEquals = function strictEquals(other) {
          return this.x === other.x && this.y === other.y && this.z === other.z;
        }
        /**
         * @en Check whether the current vector strictly equals another Vec3.
         * @zh 判断当前向量是否与指定分量的向量相等。
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         * @returns Returns `true` when the components of both vectors are equal within the specified range of error; otherwise it returns `false`.
         */
        ;

        _proto.strictEquals3f = function strictEquals3f(x, y, z) {
          return this.x === x && this.y === y && this.z === z;
        }
        /**
         * @en Transform to string with vector information.
         * @zh 返回当前向量的字符串表示。
         * @returns The string with vector information
         */
        ;

        _proto.toString = function toString() {
          return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
        }
        /**
         * @en Calculate linear interpolation result between this vector and another one with given ratio.
         * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
         * @param to Target vector
         * @param ratio The interpolation coefficient.The range is [0,1].
         */
        ;

        _proto.lerp = function lerp(to, ratio) {
          this.x += ratio * (to.x - this.x);
          this.y += ratio * (to.y - this.y);
          this.z += ratio * (to.z - this.z);
          return this;
        }
        /**
         * @en Adds the current vector with another one and return this
         * @zh 向量加法。将当前向量与指定向量的相加
         * @param other specified vector
         */
        ;

        _proto.add = function add(other) {
          this.x += other.x;
          this.y += other.y;
          this.z += other.z;
          return this;
        }
        /**
         * @en Adds the current vector with another one and return this
         * @zh 向量加法。将当前向量与指定分量的向量相加
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         */
        ;

        _proto.add3f = function add3f(x, y, z) {
          this.x += x;
          this.y += y;
          this.z += z;
          return this;
        }
        /**
         * @en Subtracts one vector from this, and returns this.
         * @zh 向量减法。将当前向量减去指定向量的结果。
         * @param other specified vector
         */
        ;

        _proto.subtract = function subtract(other) {
          this.x -= other.x;
          this.y -= other.y;
          this.z -= other.z;
          return this;
        }
        /**
         * @en Subtracts one vector from this, and returns this.
         * @zh 向量减法。将当前向量减去指定分量的向量
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         */
        ;

        _proto.subtract3f = function subtract3f(x, y, z) {
          this.x -= x;
          this.y -= y;
          this.z -= z;
          return this;
        }
        /**
         * @en Multiplies the current vector with a number, and returns this.
         * @zh 向量数乘。将当前向量数乘指定标量
         * @param scalar scalar number
         */
        ;

        _proto.multiplyScalar = function multiplyScalar(scalar) {
          if (typeof scalar === 'object') {
            console.warn('should use Vec3.multiply for vector * vector operation');
          }

          this.x *= scalar;
          this.y *= scalar;
          this.z *= scalar;
          return this;
        }
        /**
         * @en Multiplies the current vector with another one and return this
         * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
         * @param other specified vector
         */
        ;

        _proto.multiply = function multiply(other) {
          if (typeof other !== 'object') {
            console.warn('should use Vec3.scale for vector * scalar operation');
          }

          this.x *= other.x;
          this.y *= other.y;
          this.z *= other.z;
          return this;
        }
        /**
         * @en Multiplies the current vector with another one and return this
         * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         */
        ;

        _proto.multiply3f = function multiply3f(x, y, z) {
          this.x *= x;
          this.y *= y;
          this.z *= z;
          return this;
        }
        /**
         * @en Element-wisely divides this vector with another one, and return this.
         * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
         * @param other specified vector
         */
        ;

        _proto.divide = function divide(other) {
          this.x /= other.x;
          this.y /= other.y;
          this.z /= other.z;
          return this;
        }
        /**
         * @en Element-wisely divides this vector with another one, and return this.
         * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
         * @param x The x value of specified vector
         * @param y The y value of specified vector
         * @param z The z value of specified vector
         */
        ;

        _proto.divide3f = function divide3f(x, y, z) {
          this.x /= x;
          this.y /= y;
          this.z /= z;
          return this;
        }
        /**
         * @en Sets each component of this vector with its negative value
         * @zh 将当前向量的各个分量取反
         */
        ;

        _proto.negative = function negative() {
          this.x = -this.x;
          this.y = -this.y;
          this.z = -this.z;
          return this;
        }
        /**
         * @en Clamp the vector between minInclusive and maxInclusive.
         * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
         * @param minInclusive Minimum value allowed
         * @param maxInclusive Maximum value allowed
         * @returns `this`
         */
        ;

        _proto.clampf = function clampf(minInclusive, maxInclusive) {
          this.x = clamp(this.x, minInclusive.x, maxInclusive.x);
          this.y = clamp(this.y, minInclusive.y, maxInclusive.y);
          this.z = clamp(this.z, minInclusive.z, maxInclusive.z);
          return this;
        }
        /**
         * @en Calculates the dot product with another vector
         * @zh 向量点乘。
         * @param other specified vector
         * @returns The result of calculates the dot product with another vector
         */
        ;

        _proto.dot = function dot(other) {
          return this.x * other.x + this.y * other.y + this.z * other.z;
        }
        /**
         * @en Calculates the cross product with another vector.
         * @zh 向量叉乘。将当前向量左叉乘指定向量
         * @param other specified vector
         */
        ;

        _proto.cross = function cross(other) {
          var ax = this.x,
              ay = this.y,
              az = this.z;
          var bx = other.x,
              by = other.y,
              bz = other.z;
          this.x = ay * bz - az * by;
          this.y = az * bx - ax * bz;
          this.z = ax * by - ay * bx;
          return this;
        }
        /**
         * @en Returns the length of this vector.
         * @zh 计算向量的长度（模）。
         * @returns Length of vector
         */
        ;

        _proto.length = function length() {
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        /**
         * @en Returns the squared length of this vector.
         * @zh 计算向量长度（模）的平方。
         * @returns the squared length of this vector
         */
        ;

        _proto.lengthSqr = function lengthSqr() {
          return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        /**
         * @en Normalize the current vector.
         * @zh 将当前向量归一化
         */
        ;

        _proto.normalize = function normalize() {
          var x = this.x;
          var y = this.y;
          var z = this.z;
          var len = x * x + y * y + z * z;

          if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x * len;
            this.y = y * len;
            this.z = z * len;
          }

          return this;
        }
        /**
         * @en Transforms the vec3 with a mat4. 4th vector component is implicitly '1'
         * @zh 将当前向量视为 w 分量为 1 的四维向量，应用四维矩阵变换到当前矩阵
         * @param matrix matrix to transform with
         */
        ;

        _proto.transformMat4 = function transformMat4(matrix) {
          var x = this.x;
          var y = this.y;
          var z = this.z;
          var rhw = matrix.m03 * x + matrix.m07 * y + matrix.m11 * z + matrix.m15;
          rhw = rhw ? 1 / rhw : 1;
          this.x = (matrix.m00 * x + matrix.m04 * y + matrix.m08 * z + matrix.m12) * rhw;
          this.y = (matrix.m01 * x + matrix.m05 * y + matrix.m09 * z + matrix.m13) * rhw;
          this.z = (matrix.m02 * x + matrix.m06 * y + matrix.m10 * z + matrix.m14) * rhw;
          return this;
        };

        return Vec3;
      }(ValueType));

      Vec3.UNIT_X = Object.freeze(new Vec3(1, 0, 0));
      Vec3.UNIT_Y = Object.freeze(new Vec3(0, 1, 0));
      Vec3.UNIT_Z = Object.freeze(new Vec3(0, 0, 1));
      Vec3.RIGHT = Object.freeze(new Vec3(1, 0, 0));
      Vec3.UP = Object.freeze(new Vec3(0, 1, 0));
      Vec3.FORWARD = Object.freeze(new Vec3(0, 0, -1));
      Vec3.ZERO = Object.freeze(new Vec3(0, 0, 0));
      Vec3.ONE = Object.freeze(new Vec3(1, 1, 1));
      Vec3.NEG_ONE = Object.freeze(new Vec3(-1, -1, -1));
      v3_1 = new Vec3();
      v3_2 = new Vec3();
      CCClass.fastDefine('cc.Vec3', Vec3, {
        x: 0,
        y: 0,
        z: 0
      });
      legacyCC.Vec3 = Vec3;
      legacyCC.v3 = v3;
    }
  };
});