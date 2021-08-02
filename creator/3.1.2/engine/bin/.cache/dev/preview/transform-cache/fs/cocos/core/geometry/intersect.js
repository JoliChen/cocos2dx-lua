System.register("q-bundled:///fs/cocos/core/geometry/intersect.js", ["../math/index.js", "./distance.js", "./enums.js", "./ray.js", "./sphere.js", "./triangle.js", "../gfx/index.js", "./spec.js"], function (_export, _context) {
  "use strict";

  var EPSILON, Mat3, Vec3, Mat4, distance, enums, Ray, Sphere, Triangle, PrimitiveMode, ERaycastMode, rayPlane, rayTriangle, raySphere, rayAABB, rayOBB, rayCapsule, raySubMesh, rayMesh, rayModel, linePlane, lineTriangle, r_t, aabbWithAABB, aabbWithOBB, aabbPlane, aabbFrustum, aabbFrustumAccurate, obbPoint, obbPlane, obbFrustum, obbFrustumAccurate, obbWithOBB, obbCapsule, spherePlane, sphereFrustum, sphereFrustumAccurate, sphereWithSphere, sphereAABB, sphereOBB, sphereCapsule, capsuleWithCapsule, intersect;

  function rayAABB2(ray, min, max) {
    var o = ray.o;
    var d = ray.d;
    var ix = 1 / d.x;
    var iy = 1 / d.y;
    var iz = 1 / d.z;
    var t1 = (min.x - o.x) * ix;
    var t2 = (max.x - o.x) * ix;
    var t3 = (min.y - o.y) * iy;
    var t4 = (max.y - o.y) * iy;
    var t5 = (min.z - o.z) * iz;
    var t6 = (max.z - o.z) * iz;
    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

    if (tmax < 0 || tmin > tmax) {
      return 0;
    }

    return tmin > 0 ? tmin : tmax; // ray origin inside aabb
  }
  /**
   * @en
   * ray-obb intersect detect.
   * @zh
   * 射线和方向包围盒的相交性检测。
   * @param {Ray} ray 射线
   * @param {OBB} obb 方向包围盒
   * @return {number} 0 或 非0
   */


  /**
   * @en
   * line-aabb intersect detect.
   * @zh
   * 线段与轴对齐包围盒的相交性检测
   * @param line 线段
   * @param aabb 轴对齐包围盒
   * @return {number} 0 或 非0
   */
  function lineAABB(line, aabb) {
    r_t.o.set(line.s);
    Vec3.subtract(r_t.d, line.e, line.s);
    r_t.d.normalize();
    var min = rayAABB(r_t, aabb);
    var len = line.length();

    if (min <= len) {
      return min;
    } else {
      return 0;
    }
  }
  /**
   * @en
   * line-obb intersect detect.
   * @zh
   * 线段与方向包围盒的相交性检测
   * @param line 线段
   * @param obb 方向包围盒
   * @return {number} 0 或 非0
   */


  function lineOBB(line, obb) {
    r_t.o.set(line.s);
    Vec3.subtract(r_t.d, line.e, line.s);
    r_t.d.normalize();
    var min = rayOBB(r_t, obb);
    var len = line.length();

    if (min <= len) {
      return min;
    } else {
      return 0;
    }
  }
  /**
   * @en
   * line-sphere intersect detect.
   * @zh
   * 线段与球的相交性检测
   * @param line 线段
   * @param sphere 球
   * @return {number} 0 或 非0
   */


  function lineSphere(line, sphere) {
    r_t.o.set(line.s);
    Vec3.subtract(r_t.d, line.e, line.s);
    r_t.d.normalize();
    var min = raySphere(r_t, sphere);
    var len = line.length();

    if (min <= len) {
      return min;
    } else {
      return 0;
    }
  }
  /**
   * @en
   * aabb-aabb intersect detect.
   * @zh
   * 轴对齐包围盒和轴对齐包围盒的相交性检测。
   * @param {AABB} aabb1 轴对齐包围盒1
   * @param {AABB} aabb2 轴对齐包围盒2
   * @return {number} 0 或 非0
   */


  function getAABBVertices(min, max, out) {
    Vec3.set(out[0], min.x, max.y, max.z);
    Vec3.set(out[1], min.x, max.y, min.z);
    Vec3.set(out[2], min.x, min.y, max.z);
    Vec3.set(out[3], min.x, min.y, min.z);
    Vec3.set(out[4], max.x, max.y, max.z);
    Vec3.set(out[5], max.x, max.y, min.z);
    Vec3.set(out[6], max.x, min.y, max.z);
    Vec3.set(out[7], max.x, min.y, min.z);
  }

  function getOBBVertices(c, e, a1, a2, a3, out) {
    Vec3.set(out[0], c.x + a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y + a3.z * e.z);
    Vec3.set(out[1], c.x - a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y + a3.z * e.z);
    Vec3.set(out[2], c.x + a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y + a3.z * e.z);
    Vec3.set(out[3], c.x + a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y - a3.z * e.z);
    Vec3.set(out[4], c.x - a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y - a3.z * e.z);
    Vec3.set(out[5], c.x + a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y - a3.z * e.z);
    Vec3.set(out[6], c.x - a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y - a3.z * e.z);
    Vec3.set(out[7], c.x - a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y + a3.z * e.z);
  }

  function getInterval(vertices, axis) {
    var min = Vec3.dot(axis, vertices[0]);
    var max = min;

    for (var i = 1; i < 8; ++i) {
      var projection = Vec3.dot(axis, vertices[i]);
      min = projection < min ? projection : min;
      max = projection > max ? projection : max;
    }

    return [min, max];
  }
  /**
   * @en
   * aabb-obb intersect detect.
   * @zh
   * 轴对齐包围盒和方向包围盒的相交性检测。
   * @param {AABB} aabb 轴对齐包围盒
   * @param {OBB} obb 方向包围盒
   * @return {number} 0 或 非0
   */


  return {
    setters: [function (_mathIndexJs) {
      EPSILON = _mathIndexJs.EPSILON;
      Mat3 = _mathIndexJs.Mat3;
      Vec3 = _mathIndexJs.Vec3;
      Mat4 = _mathIndexJs.Mat4;
    }, function (_distanceJs) {
      distance = _distanceJs;
    }, function (_enumsJs) {
      enums = _enumsJs.default;
    }, function (_rayJs) {
      Ray = _rayJs.Ray;
    }, function (_sphereJs) {
      Sphere = _sphereJs.Sphere;
    }, function (_triangleJs) {
      Triangle = _triangleJs.Triangle;
    }, function (_gfxIndexJs) {
      PrimitiveMode = _gfxIndexJs.PrimitiveMode;
    }, function (_specJs) {
      ERaycastMode = _specJs.ERaycastMode;
    }],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
       worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
       not use Cocos Creator software for developing other software or tools that's
       used for developing games. You are not granted to publish, distribute,
       sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @module geometry
       */

      /**
       * @en
       * ray-plane intersect detect.
       * @zh
       * 射线与平面的相交性检测。
       * @param {Ray} ray 射线
       * @param {Plane} plane 平面
       * @return {number} 0 或 非0
       */
      rayPlane = function () {
        var pt = new Vec3(0, 0, 0);
        return function (ray, plane) {
          var denom = Vec3.dot(ray.d, plane.n);

          if (Math.abs(denom) < Number.EPSILON) {
            return 0;
          }

          Vec3.multiplyScalar(pt, plane.n, plane.d);
          var t = Vec3.dot(Vec3.subtract(pt, pt, ray.o), plane.n) / denom;

          if (t < 0) {
            return 0;
          }

          return t;
        };
      }(); // based on http://fileadmin.cs.lth.se/cs/Personal/Tomas_Akenine-Moller/raytri/

      /**
       * @en
       * ray-triangle intersect detect.
       * @zh
       * 射线与三角形的相交性检测。
       * @param {Ray} ray 射线
       * @param {Triangle} triangle 三角形
       * @param {boolean} doubleSided 三角形是否为双面
       * @return {number} 0 或 非0
       */


      rayTriangle = function () {
        var ab = new Vec3(0, 0, 0);
        var ac = new Vec3(0, 0, 0);
        var pvec = new Vec3(0, 0, 0);
        var tvec = new Vec3(0, 0, 0);
        var qvec = new Vec3(0, 0, 0);
        return function (ray, triangle, doubleSided) {
          Vec3.subtract(ab, triangle.b, triangle.a);
          Vec3.subtract(ac, triangle.c, triangle.a);
          Vec3.cross(pvec, ray.d, ac);
          var det = Vec3.dot(ab, pvec);

          if (det < Number.EPSILON && (!doubleSided || det > -Number.EPSILON)) {
            return 0;
          }

          var inv_det = 1 / det;
          Vec3.subtract(tvec, ray.o, triangle.a);
          var u = Vec3.dot(tvec, pvec) * inv_det;

          if (u < 0 || u > 1) {
            return 0;
          }

          Vec3.cross(qvec, tvec, ab);
          var v = Vec3.dot(ray.d, qvec) * inv_det;

          if (v < 0 || u + v > 1) {
            return 0;
          }

          var t = Vec3.dot(ac, qvec) * inv_det;
          return t < 0 ? 0 : t;
        };
      }();
      /**
       * @en
       * ray-sphere intersect detect.
       * @zh
       * 射线和球的相交性检测。
       * @param {Ray} ray 射线
       * @param {Sphere} sphere 球
       * @return {number} 0 或 非0
       */


      raySphere = function () {
        var e = new Vec3(0, 0, 0);
        return function (ray, sphere) {
          var r = sphere.radius;
          var c = sphere.center;
          var o = ray.o;
          var d = ray.d;
          var rSq = r * r;
          Vec3.subtract(e, c, o);
          var eSq = e.lengthSqr();
          var aLength = Vec3.dot(e, d); // assume ray direction already normalized

          var fSq = rSq - (eSq - aLength * aLength);

          if (fSq < 0) {
            return 0;
          }

          var f = Math.sqrt(fSq);
          var t = eSq < rSq ? aLength + f : aLength - f;

          if (t < 0) {
            return 0;
          }

          return t;
        };
      }();
      /**
       * @en
       * ray-aabb intersect detect.
       * @zh
       * 射线和轴对齐包围盒的相交性检测。
       * @param {Ray} ray 射线
       * @param {AABB} aabb 轴对齐包围盒
       * @return {number} 0 或 非0
       */


      rayAABB = function () {
        var min = new Vec3();
        var max = new Vec3();
        return function (ray, aabb) {
          Vec3.subtract(min, aabb.center, aabb.halfExtents);
          Vec3.add(max, aabb.center, aabb.halfExtents);
          return rayAABB2(ray, min, max);
        };
      }();

      rayOBB = function () {
        var center = new Vec3();
        var o = new Vec3();
        var d = new Vec3();
        var X = new Vec3();
        var Y = new Vec3();
        var Z = new Vec3();
        var p = new Vec3();
        var size = new Array(3);
        var f = new Array(3);
        var e = new Array(3);
        var t = new Array(6);
        return function (ray, obb) {
          size[0] = obb.halfExtents.x;
          size[1] = obb.halfExtents.y;
          size[2] = obb.halfExtents.z;
          center = obb.center;
          o = ray.o;
          d = ray.d;
          Vec3.set(X, obb.orientation.m00, obb.orientation.m01, obb.orientation.m02);
          Vec3.set(Y, obb.orientation.m03, obb.orientation.m04, obb.orientation.m05);
          Vec3.set(Z, obb.orientation.m06, obb.orientation.m07, obb.orientation.m08);
          Vec3.subtract(p, center, o); // The cos values of the ray on the X, Y, Z

          f[0] = Vec3.dot(X, d);
          f[1] = Vec3.dot(Y, d);
          f[2] = Vec3.dot(Z, d); // The projection length of P on X, Y, Z

          e[0] = Vec3.dot(X, p);
          e[1] = Vec3.dot(Y, p);
          e[2] = Vec3.dot(Z, p);

          for (var i = 0; i < 3; ++i) {
            if (f[i] === 0) {
              if (-e[i] - size[i] > 0 || -e[i] + size[i] < 0) {
                return 0;
              } // Avoid div by 0!


              f[i] = 0.0000001;
            } // min


            t[i * 2 + 0] = (e[i] + size[i]) / f[i]; // max

            t[i * 2 + 1] = (e[i] - size[i]) / f[i];
          }

          var tmin = Math.max(Math.max(Math.min(t[0], t[1]), Math.min(t[2], t[3])), Math.min(t[4], t[5]));
          var tmax = Math.min(Math.min(Math.max(t[0], t[1]), Math.max(t[2], t[3])), Math.max(t[4], t[5]));

          if (tmax < 0 || tmin > tmax) {
            return 0;
          }

          return tmin > 0 ? tmin : tmax; // ray origin inside aabb
        };
      }();
      /**
       * @en
       * ray-capsule intersect detect.
       * @zh
       * 射线和胶囊体的相交性检测。
       * @param {Ray} ray 射线
       * @param {Capsule} capsule 胶囊体
       * @return {number} 0 或 非0
       */


      rayCapsule = function () {
        var v3_0 = new Vec3();
        var v3_1 = new Vec3();
        var v3_2 = new Vec3();
        var v3_3 = new Vec3();
        var v3_4 = new Vec3();
        var v3_5 = new Vec3();
        var v3_6 = new Vec3();
        var sphere_0 = new Sphere();
        return function (ray, capsule) {
          var radiusSqr = capsule.radius * capsule.radius;
          var vRayNorm = Vec3.normalize(v3_0, ray.d);
          var A = capsule.ellipseCenter0;
          var B = capsule.ellipseCenter1;
          var BA = Vec3.subtract(v3_1, B, A);

          if (BA.equals(Vec3.ZERO)) {
            sphere_0.radius = capsule.radius;
            sphere_0.center.set(capsule.ellipseCenter0);
            return intersect.raySphere(ray, sphere_0);
          }

          var O = ray.o;
          var OA = Vec3.subtract(v3_2, O, A);
          var VxBA = Vec3.cross(v3_3, vRayNorm, BA);
          var a = VxBA.lengthSqr();

          if (a === 0) {
            sphere_0.radius = capsule.radius;
            var BO = Vec3.subtract(v3_4, B, O);

            if (OA.lengthSqr() < BO.lengthSqr()) {
              sphere_0.center.set(capsule.ellipseCenter0);
            } else {
              sphere_0.center.set(capsule.ellipseCenter1);
            }

            return intersect.raySphere(ray, sphere_0);
          }

          var OAxBA = Vec3.cross(v3_4, OA, BA);
          var ab2 = BA.lengthSqr();
          var b = 2 * Vec3.dot(VxBA, OAxBA);
          var c = OAxBA.lengthSqr() - radiusSqr * ab2;
          var d = b * b - 4 * a * c;

          if (d < 0) {
            return 0;
          }

          var t = (-b - Math.sqrt(d)) / (2 * a);

          if (t < 0) {
            sphere_0.radius = capsule.radius;

            var _BO = Vec3.subtract(v3_5, B, O);

            if (OA.lengthSqr() < _BO.lengthSqr()) {
              sphere_0.center.set(capsule.ellipseCenter0);
            } else {
              sphere_0.center.set(capsule.ellipseCenter1);
            }

            return intersect.raySphere(ray, sphere_0);
          } else {
            // Limit intersection between the bounds of the cylinder's end caps.
            var iPos = Vec3.scaleAndAdd(v3_5, ray.o, vRayNorm, t);
            var iPosLen = Vec3.subtract(v3_6, iPos, A);
            var tLimit = Vec3.dot(iPosLen, BA) / ab2;

            if (tLimit >= 0 && tLimit <= 1) {
              return t;
            } else if (tLimit < 0) {
              sphere_0.radius = capsule.radius;
              sphere_0.center.set(capsule.ellipseCenter0);
              return intersect.raySphere(ray, sphere_0);
            } else if (tLimit > 1) {
              sphere_0.radius = capsule.radius;
              sphere_0.center.set(capsule.ellipseCenter1);
              return intersect.raySphere(ray, sphere_0);
            } else {
              return 0;
            }
          }
        };
      }();
      /**
       * @en
       * ray-subMesh intersect detect, in model space.
       * @zh
       * 在模型空间中，射线和子三角网格的相交性检测。
       * @param {Ray} ray
       * @param {RenderingSubMesh} subMesh
       * @param {IRaySubMeshOptions} options
       * @return {number} 0 or !0
       */


      raySubMesh = function () {
        var tri = Triangle.create();
        var deOpt = {
          distance: Infinity,
          doubleSided: false,
          mode: ERaycastMode.ANY
        };
        var minDis = 0;

        var fillResult = function fillResult(m, d, i0, i1, i2, r) {
          if (m === ERaycastMode.CLOSEST) {
            if (minDis > d || minDis === 0) {
              minDis = d;

              if (r) {
                if (r.length === 0) {
                  r.push({
                    distance: d,
                    vertexIndex0: i0 / 3,
                    vertexIndex1: i1 / 3,
                    vertexIndex2: i2 / 3
                  });
                } else {
                  r[0].distance = d;
                  r[0].vertexIndex0 = i0 / 3;
                  r[0].vertexIndex1 = i1 / 3;
                  r[0].vertexIndex2 = i2 / 3;
                }
              }
            }
          } else {
            minDis = d;
            if (r) r.push({
              distance: d,
              vertexIndex0: i0 / 3,
              vertexIndex1: i1 / 3,
              vertexIndex2: i2 / 3
            });
          }
        };

        var narrowphase = function narrowphase(vb, ib, pm, ray, opt) {
          if (pm === PrimitiveMode.TRIANGLE_LIST) {
            var cnt = ib.length;

            for (var j = 0; j < cnt; j += 3) {
              var i0 = ib[j] * 3;
              var i1 = ib[j + 1] * 3;
              var i2 = ib[j + 2] * 3;
              Vec3.set(tri.a, vb[i0], vb[i0 + 1], vb[i0 + 2]);
              Vec3.set(tri.b, vb[i1], vb[i1 + 1], vb[i1 + 2]);
              Vec3.set(tri.c, vb[i2], vb[i2 + 1], vb[i2 + 2]);
              var dist = intersect.rayTriangle(ray, tri, opt.doubleSided);
              if (dist === 0 || dist > opt.distance) continue;
              fillResult(opt.mode, dist, i0, i1, i2, opt.result);
              if (opt.mode === ERaycastMode.ANY) return dist;
            }
          } else if (pm === PrimitiveMode.TRIANGLE_STRIP) {
            var _cnt = ib.length - 2;

            var rev = 0;

            for (var _j = 0; _j < _cnt; _j += 1) {
              var _i = ib[_j - rev] * 3;

              var _i2 = ib[_j + rev + 1] * 3;

              var _i3 = ib[_j + 2] * 3;

              Vec3.set(tri.a, vb[_i], vb[_i + 1], vb[_i + 2]);
              Vec3.set(tri.b, vb[_i2], vb[_i2 + 1], vb[_i2 + 2]);
              Vec3.set(tri.c, vb[_i3], vb[_i3 + 1], vb[_i3 + 2]);
              rev = ~rev;

              var _dist = intersect.rayTriangle(ray, tri, opt.doubleSided);

              if (_dist === 0 || _dist > opt.distance) continue;
              fillResult(opt.mode, _dist, _i, _i2, _i3, opt.result);
              if (opt.mode === ERaycastMode.ANY) return _dist;
            }
          } else if (pm === PrimitiveMode.TRIANGLE_FAN) {
            var _cnt2 = ib.length - 1;

            var _i4 = ib[0] * 3;

            Vec3.set(tri.a, vb[_i4], vb[_i4 + 1], vb[_i4 + 2]);

            for (var _j2 = 1; _j2 < _cnt2; _j2 += 1) {
              var _i5 = ib[_j2] * 3;

              var _i6 = ib[_j2 + 1] * 3;

              Vec3.set(tri.b, vb[_i5], vb[_i5 + 1], vb[_i5 + 2]);
              Vec3.set(tri.c, vb[_i6], vb[_i6 + 1], vb[_i6 + 2]);

              var _dist2 = intersect.rayTriangle(ray, tri, opt.doubleSided);

              if (_dist2 === 0 || _dist2 > opt.distance) continue;
              fillResult(opt.mode, _dist2, _i4, _i5, _i6, opt.result);
              if (opt.mode === ERaycastMode.ANY) return _dist2;
            }
          }

          return minDis;
        };

        return function (ray, submesh, options) {
          minDis = 0;
          if (submesh.geometricInfo.positions.length === 0) return minDis;
          var opt = options === undefined ? deOpt : options;
          var min = submesh.geometricInfo.boundingBox.min;
          var max = submesh.geometricInfo.boundingBox.max;

          if (rayAABB2(ray, min, max)) {
            var pm = submesh.primitiveMode;
            var _submesh$geometricInf = submesh.geometricInfo,
                vb = _submesh$geometricInf.positions,
                ib = _submesh$geometricInf.indices;
            narrowphase(vb, ib, pm, ray, opt);
          }

          return minDis;
        };
      }();
      /**
       * @en
       * ray-mesh intersect detect, in model space.
       * @zh
       * 在模型空间中，射线和三角网格资源的相交性检测。
       * @param {Ray} ray
       * @param {Mesh} mesh
       * @param {IRayMeshOptions} options
       * @return {number} 0 or !0
       */


      rayMesh = function () {
        var minDis = 0;
        var deOpt = {
          distance: Infinity,
          doubleSided: false,
          mode: ERaycastMode.ANY
        };
        return function (ray, mesh, options) {
          minDis = 0;
          var opt = options === undefined ? deOpt : options;
          var length = mesh.renderingSubMeshes.length;
          var min = mesh.struct.minPosition;
          var max = mesh.struct.maxPosition;
          if (min && max && !rayAABB2(ray, min, max)) return minDis;

          for (var i = 0; i < length; i++) {
            var sm = mesh.renderingSubMeshes[i];
            var dis = raySubMesh(ray, sm, opt);

            if (dis) {
              if (opt.mode === ERaycastMode.CLOSEST) {
                if (minDis === 0 || minDis > dis) {
                  minDis = dis;
                  if (opt.subIndices) opt.subIndices[0] = i;
                }
              } else {
                minDis = dis;
                if (opt.subIndices) opt.subIndices.push(i);

                if (opt.mode === ERaycastMode.ANY) {
                  return dis;
                }
              }
            }
          }

          if (minDis && opt.mode === ERaycastMode.CLOSEST) {
            if (opt.result) {
              opt.result[0].distance = minDis;
              opt.result.length = 1;
            }

            if (opt.subIndices) opt.subIndices.length = 1;
          }

          return minDis;
        };
      }();
      /**
       * @en
       * ray-model intersect detect, in world space.
       * @zh
       * 在世界空间中，射线和渲染模型的相交性检测。
       * @param ray
       * @param model
       * @param options
       * @return 0 or !0
       */


      rayModel = function () {
        var minDis = 0;
        var deOpt = {
          distance: Infinity,
          doubleSided: false,
          mode: ERaycastMode.ANY
        };
        var modelRay = new Ray();
        var m4 = new Mat4();
        return function (r, model, options) {
          minDis = 0;
          var opt = options === undefined ? deOpt : options;
          var wb = model.worldBounds;
          if (wb && !rayAABB(r, wb)) return minDis;
          Ray.copy(modelRay, r);

          if (model.node) {
            Mat4.invert(m4, model.node.getWorldMatrix(m4));
            Vec3.transformMat4(modelRay.o, r.o, m4);
            Vec3.transformMat4Normal(modelRay.d, r.d, m4);
          }

          var subModels = model.subModels;

          for (var i = 0; i < subModels.length; i++) {
            var subMesh = subModels[i].subMesh;
            var dis = raySubMesh(modelRay, subMesh, opt);

            if (dis) {
              if (opt.mode === ERaycastMode.CLOSEST) {
                if (minDis === 0 || minDis > dis) {
                  minDis = dis;
                  if (opt.subIndices) opt.subIndices[0] = i;
                }
              } else {
                minDis = dis;
                if (opt.subIndices) opt.subIndices.push(i);

                if (opt.mode === ERaycastMode.ANY) {
                  return dis;
                }
              }
            }
          }

          if (minDis && opt.mode === ERaycastMode.CLOSEST) {
            if (opt.result) {
              opt.result[0].distance = minDis;
              opt.result.length = 1;
            }

            if (opt.subIndices) opt.subIndices.length = 1;
          }

          return minDis;
        };
      }();
      /**
       * @en
       * line-plane intersect detect.
       * @zh
       * 线段与平面的相交性检测。
       * @param {line} line 线段
       * @param {Plane} plane 平面
       * @return {number} 0 或 非0
       */


      linePlane = function () {
        var ab = new Vec3(0, 0, 0);
        return function (line, plane) {
          Vec3.subtract(ab, line.e, line.s);
          var t = (plane.d - Vec3.dot(line.s, plane.n)) / Vec3.dot(ab, plane.n);

          if (t < 0 || t > 1) {
            return 0;
          }

          return t;
        };
      }();
      /**
       * @en
       * line-triangle intersect detect.
       * @zh
       * 线段与三角形的相交性检测。
       * @param {line} line 线段
       * @param {Triangle} triangle 三角形
       * @param {Vec3} outPt 可选，相交点
       * @return {number} 0 或 非0
       */


      lineTriangle = function () {
        var ab = new Vec3(0, 0, 0);
        var ac = new Vec3(0, 0, 0);
        var qp = new Vec3(0, 0, 0);
        var ap = new Vec3(0, 0, 0);
        var n = new Vec3(0, 0, 0);
        var e = new Vec3(0, 0, 0);
        return function (line, triangle, outPt) {
          Vec3.subtract(ab, triangle.b, triangle.a);
          Vec3.subtract(ac, triangle.c, triangle.a);
          Vec3.subtract(qp, line.s, line.e);
          Vec3.cross(n, ab, ac);
          var det = Vec3.dot(qp, n);

          if (det <= 0.0) {
            return 0;
          }

          Vec3.subtract(ap, line.s, triangle.a);
          var t = Vec3.dot(ap, n);

          if (t < 0 || t > det) {
            return 0;
          }

          Vec3.cross(e, qp, ap);
          var v = Vec3.dot(ac, e);

          if (v < 0 || v > det) {
            return 0;
          }

          var w = -Vec3.dot(ab, e);

          if (w < 0.0 || v + w > det) {
            return 0;
          }

          if (outPt) {
            var invDet = 1.0 / det;
            v *= invDet;
            w *= invDet;
            var u = 1.0 - v - w; // outPt = u*a + v*d + w*c;

            Vec3.set(outPt, triangle.a.x * u + triangle.b.x * v + triangle.c.x * w, triangle.a.y * u + triangle.b.y * v + triangle.c.y * w, triangle.a.z * u + triangle.b.z * v + triangle.c.z * w);
          }

          return 1;
        };
      }();

      r_t = new Ray();

      aabbWithAABB = function () {
        var aMin = new Vec3();
        var aMax = new Vec3();
        var bMin = new Vec3();
        var bMax = new Vec3();
        return function (aabb1, aabb2) {
          Vec3.subtract(aMin, aabb1.center, aabb1.halfExtents);
          Vec3.add(aMax, aabb1.center, aabb1.halfExtents);
          Vec3.subtract(bMin, aabb2.center, aabb2.halfExtents);
          Vec3.add(bMax, aabb2.center, aabb2.halfExtents);
          return aMin.x <= bMax.x && aMax.x >= bMin.x && aMin.y <= bMax.y && aMax.y >= bMin.y && aMin.z <= bMax.z && aMax.z >= bMin.z;
        };
      }();

      aabbWithOBB = function () {
        var test = new Array(15);

        for (var i = 0; i < 15; i++) {
          test[i] = new Vec3(0, 0, 0);
        }

        var vertices = new Array(8);
        var vertices2 = new Array(8);

        for (var _i7 = 0; _i7 < 8; _i7++) {
          vertices[_i7] = new Vec3(0, 0, 0);
          vertices2[_i7] = new Vec3(0, 0, 0);
        }

        var min = new Vec3();
        var max = new Vec3();
        return function (aabb, obb) {
          Vec3.set(test[0], 1, 0, 0);
          Vec3.set(test[1], 0, 1, 0);
          Vec3.set(test[2], 0, 0, 1);
          Vec3.set(test[3], obb.orientation.m00, obb.orientation.m01, obb.orientation.m02);
          Vec3.set(test[4], obb.orientation.m03, obb.orientation.m04, obb.orientation.m05);
          Vec3.set(test[5], obb.orientation.m06, obb.orientation.m07, obb.orientation.m08);

          for (var _i8 = 0; _i8 < 3; ++_i8) {
            // Fill out rest of axis
            Vec3.cross(test[6 + _i8 * 3 + 0], test[_i8], test[0]);
            Vec3.cross(test[6 + _i8 * 3 + 1], test[_i8], test[1]);
            Vec3.cross(test[6 + _i8 * 3 + 1], test[_i8], test[2]);
          }

          Vec3.subtract(min, aabb.center, aabb.halfExtents);
          Vec3.add(max, aabb.center, aabb.halfExtents);
          getAABBVertices(min, max, vertices);
          getOBBVertices(obb.center, obb.halfExtents, test[3], test[4], test[5], vertices2);

          for (var j = 0; j < 15; ++j) {
            var a = getInterval(vertices, test[j]);
            var b = getInterval(vertices2, test[j]);

            if (b[0] > a[1] || a[0] > b[1]) {
              return 0; // Seperating axis found
            }
          }

          return 1;
        };
      }();
      /**
       * @en
       * aabb-plane intersect detect.
       * @zh
       * 轴对齐包围盒和平面的相交性检测。
       * @param {AABB} aabb 轴对齐包围盒
       * @param {Plane} plane 平面
       * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
       */


      aabbPlane = function aabbPlane(aabb, plane) {
        var r = aabb.halfExtents.x * Math.abs(plane.n.x) + aabb.halfExtents.y * Math.abs(plane.n.y) + aabb.halfExtents.z * Math.abs(plane.n.z);
        var dot = Vec3.dot(plane.n, aabb.center);

        if (dot + r < plane.d) {
          return -1;
        } else if (dot - r > plane.d) {
          return 0;
        }

        return 1;
      };
      /**
       * @en
       * aabb-frustum intersect detect, faster but has false positive corner cases.
       * @zh
       * 轴对齐包围盒和锥台相交性检测，速度快，但有错误情况。
       * @param {AABB} aabb 轴对齐包围盒
       * @param {Frustum} frustum 锥台
       * @return {number} 0 或 非0
       */


      aabbFrustum = function aabbFrustum(aabb, frustum) {
        for (var i = 0; i < frustum.planes.length; i++) {
          // frustum plane normal points to the inside
          if (aabbPlane(aabb, frustum.planes[i]) === -1) {
            return 0;
          }
        } // completely outside


        return 1;
      }; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

      /**
       * @en
       * aabb-frustum intersect, handles most of the false positives correctly.
       * @zh
       * 轴对齐包围盒和锥台相交性检测，正确处理大多数错误情况。
       * @param {AABB} aabb 轴对齐包围盒
       * @param {Frustum} frustum 锥台
       * @return {number}
       */


      aabbFrustumAccurate = function () {
        var tmp = new Array(8);
        var out1 = 0;
        var out2 = 0;

        for (var i = 0; i < tmp.length; i++) {
          tmp[i] = new Vec3(0, 0, 0);
        }

        return function (aabb, frustum) {
          var result = 0;
          var intersects = false; // 1. aabb inside/outside frustum test

          for (var _i9 = 0; _i9 < frustum.planes.length; _i9++) {
            result = aabbPlane(aabb, frustum.planes[_i9]); // frustum plane normal points to the inside

            if (result === -1) {
              return 0;
            } // completely outside
            else if (result === 1) {
                intersects = true;
              }
          }

          if (!intersects) {
            return 1;
          } // completely inside
          // in case of false positives
          // 2. frustum inside/outside aabb test


          for (var _i10 = 0; _i10 < frustum.vertices.length; _i10++) {
            Vec3.subtract(tmp[_i10], frustum.vertices[_i10], aabb.center);
          }

          out1 = 0, out2 = 0;

          for (var _i11 = 0; _i11 < frustum.vertices.length; _i11++) {
            if (tmp[_i11].x > aabb.halfExtents.x) {
              out1++;
            } else if (tmp[_i11].x < -aabb.halfExtents.x) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          out1 = 0;
          out2 = 0;

          for (var _i12 = 0; _i12 < frustum.vertices.length; _i12++) {
            if (tmp[_i12].y > aabb.halfExtents.y) {
              out1++;
            } else if (tmp[_i12].y < -aabb.halfExtents.y) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          out1 = 0;
          out2 = 0;

          for (var _i13 = 0; _i13 < frustum.vertices.length; _i13++) {
            if (tmp[_i13].z > aabb.halfExtents.z) {
              out1++;
            } else if (tmp[_i13].z < -aabb.halfExtents.z) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          return 1;
        };
      }();
      /**
       * @en
       * obb contains the point.
       * @zh
       * 方向包围盒和点的相交性检测。
       * @param {OBB} obb 方向包围盒
       * @param {Vec3} point 点
       * @return {boolean} true or false
       */


      obbPoint = function () {
        var tmp = new Vec3(0, 0, 0);
        var m3 = new Mat3();

        var lessThan = function lessThan(a, b) {
          return Math.abs(a.x) < b.x && Math.abs(a.y) < b.y && Math.abs(a.z) < b.z;
        };

        return function (obb, point) {
          Vec3.subtract(tmp, point, obb.center);
          Vec3.transformMat3(tmp, tmp, Mat3.transpose(m3, obb.orientation));
          return lessThan(tmp, obb.halfExtents);
        };
      }();
      /**
       * @en
       * obb-plane intersect detect.
       * @zh
       * 方向包围盒和平面的相交性检测。
       * @param {OBB} obb 方向包围盒
       * @param {Plane} plane 平面
       * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
       */


      obbPlane = function () {
        var absDot = function absDot(n, x, y, z) {
          return Math.abs(n.x * x + n.y * y + n.z * z);
        };

        return function (obb, plane) {
          // Real-Time Collision Detection, Christer Ericson, p. 163.
          var r = obb.halfExtents.x * absDot(plane.n, obb.orientation.m00, obb.orientation.m01, obb.orientation.m02) + obb.halfExtents.y * absDot(plane.n, obb.orientation.m03, obb.orientation.m04, obb.orientation.m05) + obb.halfExtents.z * absDot(plane.n, obb.orientation.m06, obb.orientation.m07, obb.orientation.m08);
          var dot = Vec3.dot(plane.n, obb.center);

          if (dot + r < plane.d) {
            return -1;
          } else if (dot - r > plane.d) {
            return 0;
          }

          return 1;
        };
      }();
      /**
       * @en
       * obb-frustum intersect, faster but has false positive corner cases.
       * @zh
       * 方向包围盒和锥台相交性检测，速度快，但有错误情况。
       * @param {OBB} obb 方向包围盒
       * @param {Frustum} frustum 锥台
       * @return {number} 0 或 非0
       */


      obbFrustum = function obbFrustum(obb, frustum) {
        for (var i = 0; i < frustum.planes.length; i++) {
          // frustum plane normal points to the inside
          if (obbPlane(obb, frustum.planes[i]) === -1) {
            return 0;
          }
        } // completely outside


        return 1;
      }; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

      /**
       * @en
       * obb-frustum intersect, handles most of the false positives correctly.
       * @zh
       * 方向包围盒和锥台相交性检测，正确处理大多数错误情况。
       * @param {OBB} obb 方向包围盒
       * @param {Frustum} frustum 锥台
       * @return {number} 0 或 非0
       */


      obbFrustumAccurate = function () {
        var tmp = new Array(8);
        var dist = 0;
        var out1 = 0;
        var out2 = 0;

        for (var i = 0; i < tmp.length; i++) {
          tmp[i] = new Vec3(0, 0, 0);
        }

        var dot = function dot(n, x, y, z) {
          return n.x * x + n.y * y + n.z * z;
        };

        return function (obb, frustum) {
          var result = 0;
          var intersects = false; // 1. obb inside/outside frustum test

          for (var _i14 = 0; _i14 < frustum.planes.length; _i14++) {
            result = obbPlane(obb, frustum.planes[_i14]); // frustum plane normal points to the inside

            if (result === -1) {
              return 0;
            } // completely outside
            else if (result === 1) {
                intersects = true;
              }
          }

          if (!intersects) {
            return 1;
          } // completely inside
          // in case of false positives
          // 2. frustum inside/outside obb test


          for (var _i15 = 0; _i15 < frustum.vertices.length; _i15++) {
            Vec3.subtract(tmp[_i15], frustum.vertices[_i15], obb.center);
          }

          out1 = 0, out2 = 0;

          for (var _i16 = 0; _i16 < frustum.vertices.length; _i16++) {
            dist = dot(tmp[_i16], obb.orientation.m00, obb.orientation.m01, obb.orientation.m02);

            if (dist > obb.halfExtents.x) {
              out1++;
            } else if (dist < -obb.halfExtents.x) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          out1 = 0;
          out2 = 0;

          for (var _i17 = 0; _i17 < frustum.vertices.length; _i17++) {
            dist = dot(tmp[_i17], obb.orientation.m03, obb.orientation.m04, obb.orientation.m05);

            if (dist > obb.halfExtents.y) {
              out1++;
            } else if (dist < -obb.halfExtents.y) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          out1 = 0;
          out2 = 0;

          for (var _i18 = 0; _i18 < frustum.vertices.length; _i18++) {
            dist = dot(tmp[_i18], obb.orientation.m06, obb.orientation.m07, obb.orientation.m08);

            if (dist > obb.halfExtents.z) {
              out1++;
            } else if (dist < -obb.halfExtents.z) {
              out2++;
            }
          }

          if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
          }

          return 1;
        };
      }();
      /**
       * @en
       * obb-obb intersect detect.
       * @zh
       * 方向包围盒和方向包围盒的相交性检测。
       * @param {OBB} obb1 方向包围盒1
       * @param {OBB} obb2 方向包围盒2
       * @return {number} 0 或 非0
       */


      obbWithOBB = function () {
        var test = new Array(15);

        for (var i = 0; i < 15; i++) {
          test[i] = new Vec3(0, 0, 0);
        }

        var vertices = new Array(8);
        var vertices2 = new Array(8);

        for (var _i19 = 0; _i19 < 8; _i19++) {
          vertices[_i19] = new Vec3(0, 0, 0);
          vertices2[_i19] = new Vec3(0, 0, 0);
        }

        return function (obb1, obb2) {
          Vec3.set(test[0], obb1.orientation.m00, obb1.orientation.m01, obb1.orientation.m02);
          Vec3.set(test[1], obb1.orientation.m03, obb1.orientation.m04, obb1.orientation.m05);
          Vec3.set(test[2], obb1.orientation.m06, obb1.orientation.m07, obb1.orientation.m08);
          Vec3.set(test[3], obb2.orientation.m00, obb2.orientation.m01, obb2.orientation.m02);
          Vec3.set(test[4], obb2.orientation.m03, obb2.orientation.m04, obb2.orientation.m05);
          Vec3.set(test[5], obb2.orientation.m06, obb2.orientation.m07, obb2.orientation.m08);

          for (var _i20 = 0; _i20 < 3; ++_i20) {
            // Fill out rest of axis
            Vec3.cross(test[6 + _i20 * 3 + 0], test[_i20], test[0]);
            Vec3.cross(test[6 + _i20 * 3 + 1], test[_i20], test[1]);
            Vec3.cross(test[6 + _i20 * 3 + 1], test[_i20], test[2]);
          }

          getOBBVertices(obb1.center, obb1.halfExtents, test[0], test[1], test[2], vertices);
          getOBBVertices(obb2.center, obb2.halfExtents, test[3], test[4], test[5], vertices2);

          for (var _i21 = 0; _i21 < 15; ++_i21) {
            var a = getInterval(vertices, test[_i21]);
            var b = getInterval(vertices2, test[_i21]);

            if (b[0] > a[1] || a[0] > b[1]) {
              return 0; // Seperating axis found
            }
          }

          return 1;
        };
      }(); // https://github.com/diku-dk/bvh-tvcg18/blob/1fd3348c17bc8cf3da0b4ae60fdb8f2aa90a6ff0/FOUNDATION/GEOMETRY/GEOMETRY/include/overlap/geometry_overlap_obb_capsule.h

      /**
       * @en
       * obb-capsule intersect detect.
       * @zh
       * 方向包围盒和胶囊体的相交性检测。
       * @param obb 方向包围盒
       * @param capsule 胶囊体
       */


      obbCapsule = function () {
        var sphere_0 = new Sphere();
        var v3_0 = new Vec3();
        var v3_1 = new Vec3();
        var v3_2 = new Vec3();
        var v3_verts8 = new Array(8);

        for (var i = 0; i < 8; i++) {
          v3_verts8[i] = new Vec3();
        }

        var v3_axis8 = new Array(8);

        for (var _i22 = 0; _i22 < 8; _i22++) {
          v3_axis8[_i22] = new Vec3();
        }

        return function (obb, capsule) {
          var h = Vec3.squaredDistance(capsule.ellipseCenter0, capsule.ellipseCenter1);

          if (h === 0) {
            sphere_0.radius = capsule.radius;
            sphere_0.center.set(capsule.ellipseCenter0);
            return intersect.sphereOBB(sphere_0, obb);
          } else {
            v3_0.x = obb.orientation.m00;
            v3_0.y = obb.orientation.m01;
            v3_0.z = obb.orientation.m02;
            v3_1.x = obb.orientation.m03;
            v3_1.y = obb.orientation.m04;
            v3_1.z = obb.orientation.m05;
            v3_2.x = obb.orientation.m06;
            v3_2.y = obb.orientation.m07;
            v3_2.z = obb.orientation.m08;
            getOBBVertices(obb.center, obb.halfExtents, v3_0, v3_1, v3_2, v3_verts8);
            var axes = v3_axis8;
            var a0 = Vec3.copy(axes[0], v3_0);
            var a1 = Vec3.copy(axes[1], v3_1);
            var a2 = Vec3.copy(axes[2], v3_2);
            var C = Vec3.subtract(axes[3], capsule.center, obb.center);
            C.normalize();
            var B = Vec3.subtract(axes[4], capsule.ellipseCenter0, capsule.ellipseCenter1);
            B.normalize();
            Vec3.cross(axes[5], a0, B);
            Vec3.cross(axes[6], a1, B);
            Vec3.cross(axes[7], a2, B);

            for (var _i23 = 0; _i23 < 8; ++_i23) {
              var a = getInterval(v3_verts8, axes[_i23]);
              var d0 = Vec3.dot(axes[_i23], capsule.ellipseCenter0);
              var d1 = Vec3.dot(axes[_i23], capsule.ellipseCenter1);
              var max_d = Math.max(d0, d1);
              var min_d = Math.min(d0, d1);
              var d_min = min_d - capsule.radius;
              var d_max = max_d + capsule.radius;

              if (d_min > a[1] || a[0] > d_max) {
                return 0; // Seperating axis found
              }
            }

            return 1;
          }
        };
      }();
      /**
       * @en
       * sphere-plane intersect, not necessarily faster than obb-plane,due to the length calculation of the
       * plane normal to factor out the unnomalized plane distance.
       * @zh
       * 球与平面的相交性检测。
       * @param {Sphere} sphere 球
       * @param {Plane} plane 平面
       * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
       */


      spherePlane = function spherePlane(sphere, plane) {
        var dot = Vec3.dot(plane.n, sphere.center);
        var r = sphere.radius * plane.n.length();

        if (dot + r < plane.d) {
          return -1;
        } else if (dot - r > plane.d) {
          return 0;
        }

        return 1;
      };
      /**
       * @en
       * sphere-frustum intersect, faster but has false positive corner cases.
       * @zh
       * 球和锥台的相交性检测，速度快，但有错误情况。
       * @param {Sphere} sphere 球
       * @param {Frustum} frustum 锥台
       * @return {number} 0 或 非0
       */


      sphereFrustum = function sphereFrustum(sphere, frustum) {
        for (var i = 0; i < frustum.planes.length; i++) {
          // frustum plane normal points to the inside
          if (spherePlane(sphere, frustum.planes[i]) === -1) {
            return 0;
          }
        } // completely outside


        return 1;
      }; // https://stackoverflow.com/questions/20912692/view-frustum-culling-corner-cases

      /**
       * @en
       * sphere-frustum intersect, handles the false positives correctly.
       * @zh
       * 球和锥台的相交性检测，正确处理大多数错误情况。
       * @param {Sphere} sphere 球
       * @param {Frustum} frustum 锥台
       * @return {number} 0 或 非0
       */


      sphereFrustumAccurate = function () {
        var pt = new Vec3(0, 0, 0);
        var map = [1, -1, 1, -1, 1, -1];
        return function (sphere, frustum) {
          for (var i = 0; i < 6; i++) {
            var plane = frustum.planes[i];
            var r = sphere.radius;
            var c = sphere.center;
            var n = plane.n;
            var d = plane.d;
            var dot = Vec3.dot(n, c); // frustum plane normal points to the inside

            if (dot + r < d) {
              return 0;
            } // completely outside
            else if (dot - r > d) {
                continue;
              } // in case of false positives
            // has false negatives, still working on it


            Vec3.add(pt, c, Vec3.multiplyScalar(pt, n, r));

            for (var j = 0; j < 6; j++) {
              if (j === i || j === i + map[i]) {
                continue;
              }

              var test = frustum.planes[j];

              if (Vec3.dot(test.n, pt) < test.d) {
                return 0;
              }
            }
          }

          return 1;
        };
      }();
      /**
       * @en
       * sphere-sphere intersect detect.
       * @zh
       * 球和球的相交性检测。
       * @param {Sphere} sphere0 球0
       * @param {Sphere} sphere1 球1
       * @return {boolean} true or false
       */


      sphereWithSphere = function sphereWithSphere(sphere0, sphere1) {
        var r = sphere0.radius + sphere1.radius;
        return Vec3.squaredDistance(sphere0.center, sphere1.center) < r * r;
      };
      /**
       * @en
       * sphere-aabb intersect detect.
       * @zh
       * 球和轴对齐包围盒的相交性检测。
       * @param {Sphere} sphere 球
       * @param {AABB} aabb 轴对齐包围盒
       * @return {boolean} true or false
       */


      sphereAABB = function () {
        var pt = new Vec3();
        return function (sphere, aabb) {
          distance.pt_point_aabb(pt, sphere.center, aabb);
          return Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
        };
      }();
      /**
       * @en
       * sphere-obb intersect detect.
       * @zh
       * 球和方向包围盒的相交性检测。
       * @param {Sphere} sphere 球
       * @param {OBB} obb 方向包围盒
       * @return {boolean} true or false
       */


      sphereOBB = function () {
        var pt = new Vec3();
        return function (sphere, obb) {
          distance.pt_point_obb(pt, sphere.center, obb);
          return Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
        };
      }();
      /**
       * @en
       * sphere-capsule intersect detect.
       * @zh
       * 球和胶囊体的相交性检测。
       */


      sphereCapsule = function () {
        var v3_0 = new Vec3();
        var v3_1 = new Vec3();
        return function (sphere, capsule) {
          var r = sphere.radius + capsule.radius;
          var squaredR = r * r;
          var h = Vec3.squaredDistance(capsule.ellipseCenter0, capsule.ellipseCenter1);

          if (h === 0) {
            return Vec3.squaredDistance(sphere.center, capsule.center) < squaredR;
          } else {
            Vec3.subtract(v3_0, sphere.center, capsule.ellipseCenter0);
            Vec3.subtract(v3_1, capsule.ellipseCenter1, capsule.ellipseCenter0);
            var t = Vec3.dot(v3_0, v3_1) / h;

            if (t < 0) {
              return Vec3.squaredDistance(sphere.center, capsule.ellipseCenter0) < squaredR;
            } else if (t > 1) {
              return Vec3.squaredDistance(sphere.center, capsule.ellipseCenter1) < squaredR;
            } else {
              Vec3.scaleAndAdd(v3_0, capsule.ellipseCenter0, v3_1, t);
              return Vec3.squaredDistance(sphere.center, v3_0) < squaredR;
            }
          }
        };
      }(); // http://www.geomalgorithms.com/a07-_distance.html

      /**
       * @en
       * capsule-capsule intersect detect.
       * @zh
       * 胶囊体和胶囊体的相交性检测。
       */


      capsuleWithCapsule = function () {
        var v3_0 = new Vec3();
        var v3_1 = new Vec3();
        var v3_2 = new Vec3();
        var v3_3 = new Vec3();
        var v3_4 = new Vec3();
        var v3_5 = new Vec3();
        return function capsuleWithCapsule(capsuleA, capsuleB) {
          var u = Vec3.subtract(v3_0, capsuleA.ellipseCenter1, capsuleA.ellipseCenter0);
          var v = Vec3.subtract(v3_1, capsuleB.ellipseCenter1, capsuleB.ellipseCenter0);
          var w = Vec3.subtract(v3_2, capsuleA.ellipseCenter0, capsuleB.ellipseCenter0);
          var a = Vec3.dot(u, u); // always >= 0

          var b = Vec3.dot(u, v);
          var c = Vec3.dot(v, v); // always >= 0

          var d = Vec3.dot(u, w);
          var e = Vec3.dot(v, w);
          var D = a * c - b * b; // always >= 0

          var sc;
          var sN;
          var sD = D; // sc = sN / sD, default sD = D >= 0

          var tc;
          var tN;
          var tD = D; // tc = tN / tD, default tD = D >= 0
          // compute the line parameters of the two closest points

          if (D < EPSILON) {
            // the lines are almost parallel
            sN = 0.0; // force using point P0 on segment S1

            sD = 1.0; // to prevent possible division by 0.0 later

            tN = e;
            tD = c;
          } else {
            // get the closest points on the infinite lines
            sN = b * e - c * d;
            tN = a * e - b * d;

            if (sN < 0.0) {
              // sc < 0 => the s=0 edge is visible
              sN = 0.0;
              tN = e;
              tD = c;
            } else if (sN > sD) {
              // sc > 1  => the s=1 edge is visible
              sN = sD;
              tN = e + b;
              tD = c;
            }
          }

          if (tN < 0.0) {
            // tc < 0 => the t=0 edge is visible
            tN = 0.0; // recompute sc for this edge

            if (-d < 0.0) {
              sN = 0.0;
            } else if (-d > a) {
              sN = sD;
            } else {
              sN = -d;
              sD = a;
            }
          } else if (tN > tD) {
            // tc > 1  => the t=1 edge is visible
            tN = tD; // recompute sc for this edge

            if (-d + b < 0.0) {
              sN = 0;
            } else if (-d + b > a) {
              sN = sD;
            } else {
              sN = -d + b;
              sD = a;
            }
          } // finally do the division to get sc and tc


          sc = Math.abs(sN) < EPSILON ? 0.0 : sN / sD;
          tc = Math.abs(tN) < EPSILON ? 0.0 : tN / tD; // get the difference of the two closest points

          var dP = v3_3;
          dP.set(w);
          dP.add(Vec3.multiplyScalar(v3_4, u, sc));
          dP.subtract(Vec3.multiplyScalar(v3_5, v, tc));
          var radius = capsuleA.radius + capsuleB.radius;
          return dP.lengthSqr() < radius * radius;
        };
      }();
      /**
       * @en
       * Algorithm of intersect detect for basic geometry.
       * @zh
       * 基础几何的相交性检测算法。
       */


      intersect = {
        raySphere: raySphere,
        rayAABB: rayAABB,
        rayOBB: rayOBB,
        rayPlane: rayPlane,
        rayTriangle: rayTriangle,
        rayCapsule: rayCapsule,
        raySubMesh: raySubMesh,
        rayMesh: rayMesh,
        rayModel: rayModel,
        lineSphere: lineSphere,
        lineAABB: lineAABB,
        lineOBB: lineOBB,
        linePlane: linePlane,
        lineTriangle: lineTriangle,
        sphereWithSphere: sphereWithSphere,
        sphereAABB: sphereAABB,
        sphereOBB: sphereOBB,
        spherePlane: spherePlane,
        sphereFrustum: sphereFrustum,
        sphereFrustumAccurate: sphereFrustumAccurate,
        sphereCapsule: sphereCapsule,
        aabbWithAABB: aabbWithAABB,
        aabbWithOBB: aabbWithOBB,
        aabbPlane: aabbPlane,
        aabbFrustum: aabbFrustum,
        aabbFrustumAccurate: aabbFrustumAccurate,
        obbWithOBB: obbWithOBB,
        obbPlane: obbPlane,
        obbFrustum: obbFrustum,
        obbFrustumAccurate: obbFrustumAccurate,
        obbPoint: obbPoint,
        obbCapsule: obbCapsule,
        capsuleWithCapsule: capsuleWithCapsule,

        /**
         * @zh
         * g1 和 g2 的相交性检测，可填入基础几何中的形状。
         * @param g1 几何1
         * @param g2 几何2
         * @param outPt 可选，相交点。（注：仅部分形状的检测带有这个返回值）
         */
        resolve: function resolve(g1, g2, outPt) {
          if (outPt === void 0) {
            outPt = null;
          }

          var type1 = g1._type;
          var type2 = g2._type;
          var resolver = this[type1 | type2];

          if (type1 < type2) {
            return resolver(g1, g2, outPt);
          } else {
            return resolver(g2, g1, outPt);
          }
        }
      };
      intersect[enums.SHAPE_RAY | enums.SHAPE_SPHERE] = raySphere;
      intersect[enums.SHAPE_RAY | enums.SHAPE_AABB] = rayAABB;
      intersect[enums.SHAPE_RAY | enums.SHAPE_OBB] = rayOBB;
      intersect[enums.SHAPE_RAY | enums.SHAPE_PLANE] = rayPlane;
      intersect[enums.SHAPE_RAY | enums.SHAPE_TRIANGLE] = rayTriangle;
      intersect[enums.SHAPE_RAY | enums.SHAPE_CAPSULE] = rayCapsule;
      intersect[enums.SHAPE_LINE | enums.SHAPE_SPHERE] = lineSphere;
      intersect[enums.SHAPE_LINE | enums.SHAPE_AABB] = lineAABB;
      intersect[enums.SHAPE_LINE | enums.SHAPE_OBB] = lineOBB;
      intersect[enums.SHAPE_LINE | enums.SHAPE_PLANE] = linePlane;
      intersect[enums.SHAPE_LINE | enums.SHAPE_TRIANGLE] = lineTriangle;
      intersect[enums.SHAPE_SPHERE] = sphereWithSphere;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_AABB] = sphereAABB;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_OBB] = sphereOBB;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_PLANE] = spherePlane;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_FRUSTUM] = sphereFrustum;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_FRUSTUM_ACCURATE] = sphereFrustumAccurate;
      intersect[enums.SHAPE_SPHERE | enums.SHAPE_CAPSULE] = sphereCapsule;
      intersect[enums.SHAPE_AABB] = aabbWithAABB;
      intersect[enums.SHAPE_AABB | enums.SHAPE_OBB] = aabbWithOBB;
      intersect[enums.SHAPE_AABB | enums.SHAPE_PLANE] = aabbPlane;
      intersect[enums.SHAPE_AABB | enums.SHAPE_FRUSTUM] = aabbFrustum;
      intersect[enums.SHAPE_AABB | enums.SHAPE_FRUSTUM_ACCURATE] = aabbFrustumAccurate;
      intersect[enums.SHAPE_OBB] = obbWithOBB;
      intersect[enums.SHAPE_OBB | enums.SHAPE_PLANE] = obbPlane;
      intersect[enums.SHAPE_OBB | enums.SHAPE_FRUSTUM] = obbFrustum;
      intersect[enums.SHAPE_OBB | enums.SHAPE_FRUSTUM_ACCURATE] = obbFrustumAccurate;
      intersect[enums.SHAPE_OBB | enums.SHAPE_CAPSULE] = obbCapsule;
      intersect[enums.SHAPE_CAPSULE] = capsuleWithCapsule;

      _export("default", intersect);
    }
  };
});