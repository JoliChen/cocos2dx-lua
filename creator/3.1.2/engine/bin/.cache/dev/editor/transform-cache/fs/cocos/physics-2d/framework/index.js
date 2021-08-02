"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Physics2DUtils: true
};
exports.Physics2DUtils = void 0;

var PolygonSeparator = _interopRequireWildcard(require("./utils/polygon-separator.js"));

var _physicsTypes = require("./physics-types.js");

Object.keys(_physicsTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _physicsTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsTypes[key];
    }
  });
});

var _physicsSystem = require("./physics-system.js");

Object.keys(_physicsSystem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _physicsSystem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsSystem[key];
    }
  });
});

var _iPhysicsContact = require("../spec/i-physics-contact.js");

Object.keys(_iPhysicsContact).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _iPhysicsContact[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iPhysicsContact[key];
    }
  });
});

var _rigidBody2d = require("./components/rigid-body-2d.js");

Object.keys(_rigidBody2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _rigidBody2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rigidBody2d[key];
    }
  });
});

var _collider2d = require("./components/colliders/collider-2d.js");

Object.keys(_collider2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _collider2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _collider2d[key];
    }
  });
});

var _boxCollider2d = require("./components/colliders/box-collider-2d.js");

Object.keys(_boxCollider2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _boxCollider2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _boxCollider2d[key];
    }
  });
});

var _circleCollider2d = require("./components/colliders/circle-collider-2d.js");

Object.keys(_circleCollider2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _circleCollider2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _circleCollider2d[key];
    }
  });
});

var _polygonCollider2d = require("./components/colliders/polygon-collider-2d.js");

Object.keys(_polygonCollider2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _polygonCollider2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _polygonCollider2d[key];
    }
  });
});

var _joint2d = require("./components/joints/joint-2d.js");

Object.keys(_joint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _joint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _joint2d[key];
    }
  });
});

var _distanceJoint2d = require("./components/joints/distance-joint-2d.js");

Object.keys(_distanceJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _distanceJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _distanceJoint2d[key];
    }
  });
});

var _springJoint2d = require("./components/joints/spring-joint-2d.js");

Object.keys(_springJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _springJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _springJoint2d[key];
    }
  });
});

var _mouseJoint2d = require("./components/joints/mouse-joint-2d.js");

Object.keys(_mouseJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _mouseJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mouseJoint2d[key];
    }
  });
});

var _relativeJoint2d = require("./components/joints/relative-joint-2d.js");

Object.keys(_relativeJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _relativeJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _relativeJoint2d[key];
    }
  });
});

var _sliderJoint2d = require("./components/joints/slider-joint-2d.js");

Object.keys(_sliderJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sliderJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sliderJoint2d[key];
    }
  });
});

var _fixedJoint2d = require("./components/joints/fixed-joint-2d.js");

Object.keys(_fixedJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _fixedJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fixedJoint2d[key];
    }
  });
});

var _wheelJoint2d = require("./components/joints/wheel-joint-2d.js");

Object.keys(_wheelJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _wheelJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wheelJoint2d[key];
    }
  });
});

var _hingeJoint2d = require("./components/joints/hinge-joint-2d.js");

Object.keys(_hingeJoint2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hingeJoint2d[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hingeJoint2d[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// rigid body
// colliders
// joints
const Physics2DUtils = {
  PolygonSeparator
};
exports.Physics2DUtils = Physics2DUtils;