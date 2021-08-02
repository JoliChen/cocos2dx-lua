"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frustum = exports.capsule = exports.obb = exports.aabb = exports.sphere = exports.triangle = exports.ray = exports.plane = exports.line = void 0;

var _xDeprecated = require("../utils/x-deprecated.js");

var _intersect = _interopRequireDefault(require("./intersect.js"));

var _line = require("./line.js");

var _plane = require("./plane.js");

var _ray = require("./ray.js");

var _triangle = require("./triangle.js");

var _sphere = require("./sphere.js");

var _aabb = require("./aabb.js");

var _obb = require("./obb.js");

var _capsule = require("./capsule.js");

var _frustum = require("./frustum.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _xDeprecated.replaceProperty)(_intersect.default, 'intersect', [{
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

function deprecatedClassMessage(oldClassName, newClassName) {
  console.warn(`${oldClassName} is deprecated, please use ${newClassName} instead.`);
}
/**
 * Alias of [[Line]]
 * @deprecated Since v3.0
 */


class line extends _line.Line {
  constructor() {
    super();
    deprecatedClassMessage('line', 'Line');
  }

}
/**
 * Alias of [[Plane]]
 * @deprecated Since v3.0
 */


exports.line = line;

class plane extends _plane.Plane {
  constructor() {
    super();
    deprecatedClassMessage('plane', 'Plane');
  }

}
/**
 * Alias of [[Ray]]
 * @deprecated Since v3.0
 */


exports.plane = plane;

class ray extends _ray.Ray {
  constructor() {
    super();
    deprecatedClassMessage('ray', 'Ray');
  }

}
/**
 * Alias of [[Triangle]]
 * @deprecated Since v3.0
 */


exports.ray = ray;

class triangle extends _triangle.Triangle {
  constructor() {
    super();
    deprecatedClassMessage('triangle', 'Triangle');
  }

}
/**
 * Alias of [[Sphere]]
 * @deprecated Since v3.0
 */


exports.triangle = triangle;

class sphere extends _sphere.Sphere {
  constructor() {
    super();
    deprecatedClassMessage('sphere', 'Sphere');
  }

}
/**
 * Alias of [[AABB]]
 * @deprecated Since v3.0
 */


exports.sphere = sphere;

class aabb extends _aabb.AABB {
  constructor() {
    super();
    deprecatedClassMessage('aabb', 'AABB');
  }

}
/**
 * Alias of [[OBB]]
 * @deprecated Since v3.0
 */


exports.aabb = aabb;

class obb extends _obb.OBB {
  constructor() {
    super();
    deprecatedClassMessage('obb', 'OBB');
  }

}
/**
 * Alias of [[Capsule]]
 * @deprecated Since v3.0
 */


exports.obb = obb;

class capsule extends _capsule.Capsule {
  constructor() {
    super();
    deprecatedClassMessage('capsule', 'Capsule');
  }

}
/**
 * Alias of [[Frustum]]
 * @deprecated Since v3.0
 */


exports.capsule = capsule;

class frustum extends _frustum.Frustum {
  constructor() {
    super();
    deprecatedClassMessage('frustum', 'Frustum');
  }

}

exports.frustum = frustum;