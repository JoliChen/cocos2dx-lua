System.register("q-bundled:///fs/cocos/core/geometry/deprecated-3.0.0.js", ["../utils/x-deprecated.js", "./intersect.js", "./line.js", "./plane.js", "./ray.js", "./triangle.js", "./sphere.js", "./aabb.js", "./obb.js", "./capsule.js", "./frustum.js"], function (_export, _context) {
  "use strict";

  var replaceProperty, intersect, Line, Plane, Ray, Triangle, Sphere, AABB, OBB, Capsule, Frustum, line, plane, ray, triangle, sphere, aabb, obb, capsule, frustum;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function deprecatedClassMessage(oldClassName, newClassName) {
    console.warn(oldClassName + " is deprecated, please use " + newClassName + " instead.");
  }
  /**
   * Alias of [[Line]]
   * @deprecated Since v3.0
   */


  return {
    setters: [function (_utilsXDeprecatedJs) {
      replaceProperty = _utilsXDeprecatedJs.replaceProperty;
    }, function (_intersectJs) {
      intersect = _intersectJs.default;
    }, function (_lineJs) {
      Line = _lineJs.Line;
    }, function (_planeJs) {
      Plane = _planeJs.Plane;
    }, function (_rayJs) {
      Ray = _rayJs.Ray;
    }, function (_triangleJs) {
      Triangle = _triangleJs.Triangle;
    }, function (_sphereJs) {
      Sphere = _sphereJs.Sphere;
    }, function (_aabbJs) {
      AABB = _aabbJs.AABB;
    }, function (_obbJs) {
      OBB = _obbJs.OBB;
    }, function (_capsuleJs) {
      Capsule = _capsuleJs.Capsule;
    }, function (_frustumJs) {
      Frustum = _frustumJs.Frustum;
    }],
    execute: function () {
      replaceProperty(intersect, 'intersect', [{
        name: 'ray_aabb',
        newName: 'rayAABB'
      }, {
        name: 'ray_plane',
        newName: 'rayPlane'
      }, {
        name: 'ray_triangle',
        newName: 'rayTriangle'
      }, {
        name: 'ray_sphere',
        newName: 'raySphere'
      }, {
        name: 'ray_obb',
        newName: 'rayOBB'
      }, {
        name: 'ray_capsule',
        newName: 'rayCapsule'
      }, {
        name: 'ray_subMesh',
        newName: 'raySubMesh'
      }, {
        name: 'ray_mesh',
        newName: 'rayMesh'
      }, {
        name: 'ray_model',
        newName: 'rayModel'
      }, {
        name: 'line_plane',
        newName: 'linePlane'
      }, {
        name: 'line_triangle',
        newName: 'lineTriangle'
      }, {
        name: 'line_aabb',
        newName: 'lineAABB'
      }, {
        name: 'line_obb',
        newName: 'lineOBB'
      }, {
        name: 'line_sphere',
        newName: 'lineSphere'
      }, {
        name: 'aabb_aabb',
        newName: 'aabbWithAABB'
      }, {
        name: 'aabb_obb',
        newName: 'aabbWithOBB'
      }, {
        name: 'aabb_plane',
        newName: 'aabbPlane'
      }, {
        name: 'aabb_frustum',
        newName: 'aabbFrustum'
      }, {
        name: 'aabbFrustum_accurate',
        newName: 'aabbFrustumAccurate'
      }, {
        name: 'obb_point',
        newName: 'obbPoint'
      }, {
        name: 'obb_plane',
        newName: 'obbPlane'
      }, {
        name: 'obb_frustum',
        newName: 'obbFrustum'
      }, {
        name: 'obbFrustum_accurate',
        newName: 'obbFrustumAccurate'
      }, {
        name: 'obb_obb',
        newName: 'obbWithOBB'
      }, {
        name: 'obb_capsule',
        newName: 'obbCapsule'
      }, {
        name: 'sphere_plane',
        newName: 'spherePlane'
      }, {
        name: 'sphere_frustum',
        newName: 'sphereFrustum'
      }, {
        name: 'sphereFrustum_accurate',
        newName: 'sphereFrustumAccurate'
      }, {
        name: 'sphere_sphere',
        newName: 'sphereWithSphere'
      }, {
        name: 'sphere_aabb',
        newName: 'sphereAABB'
      }, {
        name: 'sphere_obb',
        newName: 'sphereOBB'
      }, {
        name: 'sphere_capsule',
        newName: 'sphereCapsule'
      }, {
        name: 'capsule_capsule',
        newName: 'capsuleWithCapsule'
      }]);

      _export("line", line = /*#__PURE__*/function (_Line) {
        _inheritsLoose(line, _Line);

        function line() {
          var _this;

          _this = _Line.call(this) || this;
          deprecatedClassMessage('line', 'Line');
          return _this;
        }

        return line;
      }(Line));
      /**
       * Alias of [[Plane]]
       * @deprecated Since v3.0
       */


      _export("plane", plane = /*#__PURE__*/function (_Plane) {
        _inheritsLoose(plane, _Plane);

        function plane() {
          var _this2;

          _this2 = _Plane.call(this) || this;
          deprecatedClassMessage('plane', 'Plane');
          return _this2;
        }

        return plane;
      }(Plane));
      /**
       * Alias of [[Ray]]
       * @deprecated Since v3.0
       */


      _export("ray", ray = /*#__PURE__*/function (_Ray) {
        _inheritsLoose(ray, _Ray);

        function ray() {
          var _this3;

          _this3 = _Ray.call(this) || this;
          deprecatedClassMessage('ray', 'Ray');
          return _this3;
        }

        return ray;
      }(Ray));
      /**
       * Alias of [[Triangle]]
       * @deprecated Since v3.0
       */


      _export("triangle", triangle = /*#__PURE__*/function (_Triangle) {
        _inheritsLoose(triangle, _Triangle);

        function triangle() {
          var _this4;

          _this4 = _Triangle.call(this) || this;
          deprecatedClassMessage('triangle', 'Triangle');
          return _this4;
        }

        return triangle;
      }(Triangle));
      /**
       * Alias of [[Sphere]]
       * @deprecated Since v3.0
       */


      _export("sphere", sphere = /*#__PURE__*/function (_Sphere) {
        _inheritsLoose(sphere, _Sphere);

        function sphere() {
          var _this5;

          _this5 = _Sphere.call(this) || this;
          deprecatedClassMessage('sphere', 'Sphere');
          return _this5;
        }

        return sphere;
      }(Sphere));
      /**
       * Alias of [[AABB]]
       * @deprecated Since v3.0
       */


      _export("aabb", aabb = /*#__PURE__*/function (_AABB) {
        _inheritsLoose(aabb, _AABB);

        function aabb() {
          var _this6;

          _this6 = _AABB.call(this) || this;
          deprecatedClassMessage('aabb', 'AABB');
          return _this6;
        }

        return aabb;
      }(AABB));
      /**
       * Alias of [[OBB]]
       * @deprecated Since v3.0
       */


      _export("obb", obb = /*#__PURE__*/function (_OBB) {
        _inheritsLoose(obb, _OBB);

        function obb() {
          var _this7;

          _this7 = _OBB.call(this) || this;
          deprecatedClassMessage('obb', 'OBB');
          return _this7;
        }

        return obb;
      }(OBB));
      /**
       * Alias of [[Capsule]]
       * @deprecated Since v3.0
       */


      _export("capsule", capsule = /*#__PURE__*/function (_Capsule) {
        _inheritsLoose(capsule, _Capsule);

        function capsule() {
          var _this8;

          _this8 = _Capsule.call(this) || this;
          deprecatedClassMessage('capsule', 'Capsule');
          return _this8;
        }

        return capsule;
      }(Capsule));
      /**
       * Alias of [[Frustum]]
       * @deprecated Since v3.0
       */


      _export("frustum", frustum = /*#__PURE__*/function (_Frustum) {
        _inheritsLoose(frustum, _Frustum);

        function frustum() {
          var _this9;

          _this9 = _Frustum.call(this) || this;
          deprecatedClassMessage('frustum', 'Frustum');
          return _this9;
        }

        return frustum;
      }(Frustum));
    }
  };
});