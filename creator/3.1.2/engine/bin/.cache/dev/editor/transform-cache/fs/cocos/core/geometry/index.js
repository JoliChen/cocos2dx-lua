"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  distance: true,
  enums: true,
  intersect: true,
  Line: true,
  Plane: true,
  Ray: true,
  Triangle: true,
  Sphere: true,
  AABB: true,
  OBB: true,
  Capsule: true,
  Frustum: true,
  Keyframe: true,
  AnimationCurve: true
};
Object.defineProperty(exports, "enums", {
  enumerable: true,
  get: function () {
    return _enums.default;
  }
});
Object.defineProperty(exports, "intersect", {
  enumerable: true,
  get: function () {
    return _intersect.default;
  }
});
Object.defineProperty(exports, "Line", {
  enumerable: true,
  get: function () {
    return _line.Line;
  }
});
Object.defineProperty(exports, "Plane", {
  enumerable: true,
  get: function () {
    return _plane.Plane;
  }
});
Object.defineProperty(exports, "Ray", {
  enumerable: true,
  get: function () {
    return _ray.Ray;
  }
});
Object.defineProperty(exports, "Triangle", {
  enumerable: true,
  get: function () {
    return _triangle.Triangle;
  }
});
Object.defineProperty(exports, "Sphere", {
  enumerable: true,
  get: function () {
    return _sphere.Sphere;
  }
});
Object.defineProperty(exports, "AABB", {
  enumerable: true,
  get: function () {
    return _aabb.AABB;
  }
});
Object.defineProperty(exports, "OBB", {
  enumerable: true,
  get: function () {
    return _obb.OBB;
  }
});
Object.defineProperty(exports, "Capsule", {
  enumerable: true,
  get: function () {
    return _capsule.Capsule;
  }
});
Object.defineProperty(exports, "Frustum", {
  enumerable: true,
  get: function () {
    return _frustum.Frustum;
  }
});
Object.defineProperty(exports, "Keyframe", {
  enumerable: true,
  get: function () {
    return _curve.Keyframe;
  }
});
Object.defineProperty(exports, "AnimationCurve", {
  enumerable: true,
  get: function () {
    return _curve.AnimationCurve;
  }
});
exports.distance = void 0;

var distance = _interopRequireWildcard(require("./distance.js"));

exports.distance = distance;

require("./deprecated.js");

var _enums = _interopRequireDefault(require("./enums.js"));

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

var _curve = require("./curve.js");

var _spec = require("./spec.js");

Object.keys(_spec).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _spec[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spec[key];
    }
  });
});

var _deprecated2 = require("./deprecated-3.0.0.js");

Object.keys(_deprecated2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated2[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }