"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PhysicsSystem: true,
  PhysicsMaterial: true,
  PhysicsRayResult: true,
  BoxCollider: true,
  Collider: true,
  SphereCollider: true,
  CapsuleCollider: true,
  CylinderCollider: true,
  ConeCollider: true,
  MeshCollider: true,
  RigidBody: true,
  ConstantForce: true,
  TerrainCollider: true,
  SimplexCollider: true,
  PlaneCollider: true,
  Constraint: true,
  HingeConstraint: true,
  PointToPointConstraint: true,
  selector: true,
  utils: true
};
Object.defineProperty(exports, "PhysicsSystem", {
  enumerable: true,
  get: function () {
    return _physicsSystem.PhysicsSystem;
  }
});
Object.defineProperty(exports, "PhysicsMaterial", {
  enumerable: true,
  get: function () {
    return _physicsMaterial.PhysicsMaterial;
  }
});
Object.defineProperty(exports, "PhysicsRayResult", {
  enumerable: true,
  get: function () {
    return _physicsRayResult.PhysicsRayResult;
  }
});
Object.defineProperty(exports, "BoxCollider", {
  enumerable: true,
  get: function () {
    return _boxCollider.BoxCollider;
  }
});
Object.defineProperty(exports, "Collider", {
  enumerable: true,
  get: function () {
    return _collider.Collider;
  }
});
Object.defineProperty(exports, "SphereCollider", {
  enumerable: true,
  get: function () {
    return _sphereCollider.SphereCollider;
  }
});
Object.defineProperty(exports, "CapsuleCollider", {
  enumerable: true,
  get: function () {
    return _capsuleCollider.CapsuleCollider;
  }
});
Object.defineProperty(exports, "CylinderCollider", {
  enumerable: true,
  get: function () {
    return _cylinderCollider.CylinderCollider;
  }
});
Object.defineProperty(exports, "ConeCollider", {
  enumerable: true,
  get: function () {
    return _coneCollider.ConeCollider;
  }
});
Object.defineProperty(exports, "MeshCollider", {
  enumerable: true,
  get: function () {
    return _meshCollider.MeshCollider;
  }
});
Object.defineProperty(exports, "RigidBody", {
  enumerable: true,
  get: function () {
    return _rigidBody.RigidBody;
  }
});
Object.defineProperty(exports, "ConstantForce", {
  enumerable: true,
  get: function () {
    return _constantForce.ConstantForce;
  }
});
Object.defineProperty(exports, "TerrainCollider", {
  enumerable: true,
  get: function () {
    return _terrainCollider.TerrainCollider;
  }
});
Object.defineProperty(exports, "SimplexCollider", {
  enumerable: true,
  get: function () {
    return _simplexCollider.SimplexCollider;
  }
});
Object.defineProperty(exports, "PlaneCollider", {
  enumerable: true,
  get: function () {
    return _planeCollider.PlaneCollider;
  }
});
Object.defineProperty(exports, "Constraint", {
  enumerable: true,
  get: function () {
    return _constraint.Constraint;
  }
});
Object.defineProperty(exports, "HingeConstraint", {
  enumerable: true,
  get: function () {
    return _hingeConstraint.HingeConstraint;
  }
});
Object.defineProperty(exports, "PointToPointConstraint", {
  enumerable: true,
  get: function () {
    return _pointToPointConstraint.PointToPointConstraint;
  }
});
Object.defineProperty(exports, "selector", {
  enumerable: true,
  get: function () {
    return _physicsSelector.selector;
  }
});
exports.utils = void 0;

var _physicsSystem = require("./physics-system.js");

var _physicsMaterial = require("./assets/physics-material.js");

var _physicsRayResult = require("./physics-ray-result.js");

var _boxCollider = require("./components/colliders/box-collider.js");

var _collider = require("./components/colliders/collider.js");

var _sphereCollider = require("./components/colliders/sphere-collider.js");

var _capsuleCollider = require("./components/colliders/capsule-collider.js");

var _cylinderCollider = require("./components/colliders/cylinder-collider.js");

var _coneCollider = require("./components/colliders/cone-collider.js");

var _meshCollider = require("./components/colliders/mesh-collider.js");

var _rigidBody = require("./components/rigid-body.js");

var _constantForce = require("./components/constant-force.js");

var _terrainCollider = require("./components/colliders/terrain-collider.js");

var _simplexCollider = require("./components/colliders/simplex-collider.js");

var _planeCollider = require("./components/colliders/plane-collider.js");

var _constraint = require("./components/constraints/constraint.js");

var _hingeConstraint = require("./components/constraints/hinge-constraint.js");

var _pointToPointConstraint = require("./components/constraints/point-to-point-constraint.js");

var _globalExports = require("../../core/global-exports.js");

var _physicsSelector = require("./physics-selector.js");

var utils = _interopRequireWildcard(require("../utils/util.js"));

exports.utils = utils;

var _physicsInterface = require("./physics-interface.js");

Object.keys(_physicsInterface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _physicsInterface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsInterface[key];
    }
  });
});

var _physicsConfig = require("./physics-config.js");

Object.keys(_physicsConfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _physicsConfig[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsConfig[key];
    }
  });
});

var _physicsEnum = require("./physics-enum.js");

Object.keys(_physicsEnum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _physicsEnum[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _physicsEnum[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @hidden
 */
// constraints
_globalExports.legacyCC.PhysicsSystem = _physicsSystem.PhysicsSystem;
_globalExports.legacyCC.PhysicsMaterial = _physicsMaterial.PhysicsMaterial;
_globalExports.legacyCC.PhysicsRayResult = _physicsRayResult.PhysicsRayResult;
_globalExports.legacyCC.ConstantForce = _constantForce.ConstantForce;