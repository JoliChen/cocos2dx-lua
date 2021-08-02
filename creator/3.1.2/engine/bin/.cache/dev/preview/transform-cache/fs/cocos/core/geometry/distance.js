System.register("q-bundled:///fs/cocos/core/geometry/distance.js", ["../math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, X, Y, Z, d, min, max, u, e;

  /**
   * @en
   * the distance between a point and a plane
   * @zh
   * 计算点和平面之间的距离。
   * @param {Vec3} point 点。
   * @param {Plane} plane 平面。
   * @return 距离。
   */
  function point_plane(point, plane_) {
    return Vec3.dot(plane_.n, point) - plane_.d;
  }
  /**
   * @en
   * the closest point on plane to a given point
   * @zh
   * 计算平面上最接近给定点的点。
   * @param out 最近点。
   * @param point 给定点。
   * @param plane 平面。
   * @return 最近点。
   */


  function pt_point_plane(out, point, plane_) {
    var t = point_plane(point, plane_);
    return Vec3.subtract(out, point, Vec3.multiplyScalar(out, plane_.n, t));
  }
  /**
   * @en
   * the closest point on aabb to a given point
   * @zh
   * 计算 aabb 上最接近给定点的点。
   * @param {Vec3} out 最近点。
   * @param {Vec3} point 给定点。
   * @param {AABB} aabb 轴对齐包围盒。
   * @return {Vec3} 最近点。
   */


  function pt_point_aabb(out, point, aabb_) {
    Vec3.copy(out, point);
    Vec3.subtract(min, aabb_.center, aabb_.halfExtents);
    Vec3.add(max, aabb_.center, aabb_.halfExtents);
    out.x = out.x < min.x ? min.x : out.x;
    out.y = out.y < min.y ? min.y : out.y;
    out.z = out.z < min.z ? min.z : out.z;
    out.x = out.x > max.x ? max.x : out.x;
    out.y = out.y > max.y ? max.y : out.y;
    out.z = out.z > max.z ? max.z : out.z;
    return out;
  }
  /**
   * @en
   * the closest point on obb to a given point
   * @zh
   * 计算 obb 上最接近给定点的点。
   * @param {Vec3} out 最近点。
   * @param {Vec3} point 给定点。
   * @param {OBB} obb 方向包围盒。
   * @return {Vec3} 最近点。
   */


  function pt_point_obb(out, point, obb_) {
    Vec3.set(X, obb_.orientation.m00, obb_.orientation.m01, obb_.orientation.m02);
    Vec3.set(Y, obb_.orientation.m03, obb_.orientation.m04, obb_.orientation.m05);
    Vec3.set(Z, obb_.orientation.m06, obb_.orientation.m07, obb_.orientation.m08);
    u[0] = X;
    u[1] = Y;
    u[2] = Z;
    e[0] = obb_.halfExtents.x;
    e[1] = obb_.halfExtents.y;
    e[2] = obb_.halfExtents.z;
    Vec3.subtract(d, point, obb_.center); // Start result at center of obb; make steps from there

    Vec3.set(out, obb_.center.x, obb_.center.y, obb_.center.z); // For each OBB axis...

    for (var i = 0; i < 3; i++) {
      // ...project d onto that axis to get the distance
      // along the axis of d from the obb center
      var dist = Vec3.dot(d, u[i]); // if distance farther than the obb extents, clamp to the obb

      if (dist > e[i]) {
        dist = e[i];
      }

      if (dist < -e[i]) {
        dist = -e[i];
      } // Step that distance along the axis to get world coordinate


      out.x += dist * u[i].x;
      out.y += dist * u[i].y;
      out.z += dist * u[i].z;
    }

    return out;
  }
  /**
   * @en
   * Calculate the nearest point on the line to the given point.
   * @zh
   * 计算给定点距离直线上最近的一点。
   * @param out 最近点
   * @param point 给定点
   * @param linePointA 线上的某点 A
   * @param linePointB 线上的某点 B
   */


  function pt_point_line(out, point, linePointA, linePointB) {
    Vec3.subtract(X, linePointA, linePointB);
    var dir = X;
    var dirSquaredLength = Vec3.lengthSqr(dir);

    if (dirSquaredLength == 0) {
      // The point is at the segment start.
      Vec3.copy(out, linePointA);
    } else {
      // Calculate the projection of the point onto the line extending through the segment.
      Vec3.subtract(X, point, linePointA);
      var t = Vec3.dot(X, dir) / dirSquaredLength;

      if (t < 0) {
        // The point projects beyond the segment start.
        Vec3.copy(out, linePointA);
      } else if (t > 1) {
        // The point projects beyond the segment end.
        Vec3.copy(out, linePointB);
      } else {
        // The point projects between the start and end of the segment.
        Vec3.scaleAndAdd(out, linePointA, dir, t);
      }
    }
  }

  _export({
    point_plane: point_plane,
    pt_point_plane: pt_point_plane,
    pt_point_aabb: pt_point_aabb,
    pt_point_obb: pt_point_obb,
    pt_point_line: pt_point_line
  });

  return {
    setters: [function (_mathIndexJs) {
      Vec3 = _mathIndexJs.Vec3;
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
      X = new Vec3();
      Y = new Vec3();
      Z = new Vec3();
      d = new Vec3();
      min = new Vec3();
      max = new Vec3();
      u = new Array(3);
      e = new Array(3);
    }
  };
});