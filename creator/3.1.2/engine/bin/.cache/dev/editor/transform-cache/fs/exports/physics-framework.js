"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  PhysicsSystem: true,
  RigidBody: true,
  ConstantForce: true,
  PhysicsMaterial: true,
  PhysicsRayResult: true,
  Collider: true,
  BoxCollider: true,
  SphereCollider: true,
  CapsuleCollider: true,
  MeshCollider: true,
  CylinderCollider: true,
  ConeCollider: true,
  TerrainCollider: true,
  SimplexCollider: true,
  PlaneCollider: true,
  Constraint: true,
  HingeConstraint: true,
  PointToPointConstraint: true,
  EAxisDirection: true,
  ERigidBodyType: true,
  physics: true
};
Object.defineProperty(exports, "PhysicsSystem", {
  enumerable: true,
  get: function () {
    return physics.PhysicsSystem;
  }
});
Object.defineProperty(exports, "RigidBody", {
  enumerable: true,
  get: function () {
    return physics.RigidBody;
  }
});
Object.defineProperty(exports, "ConstantForce", {
  enumerable: true,
  get: function () {
    return physics.ConstantForce;
  }
});
Object.defineProperty(exports, "PhysicsMaterial", {
  enumerable: true,
  get: function () {
    return physics.PhysicsMaterial;
  }
});
Object.defineProperty(exports, "PhysicsRayResult", {
  enumerable: true,
  get: function () {
    return physics.PhysicsRayResult;
  }
});
Object.defineProperty(exports, "Collider", {
  enumerable: true,
  get: function () {
    return physics.Collider;
  }
});
Object.defineProperty(exports, "BoxCollider", {
  enumerable: true,
  get: function () {
    return physics.BoxCollider;
  }
});
Object.defineProperty(exports, "SphereCollider", {
  enumerable: true,
  get: function () {
    return physics.SphereCollider;
  }
});
Object.defineProperty(exports, "CapsuleCollider", {
  enumerable: true,
  get: function () {
    return physics.CapsuleCollider;
  }
});
Object.defineProperty(exports, "MeshCollider", {
  enumerable: true,
  get: function () {
    return physics.MeshCollider;
  }
});
Object.defineProperty(exports, "CylinderCollider", {
  enumerable: true,
  get: function () {
    return physics.CylinderCollider;
  }
});
Object.defineProperty(exports, "ConeCollider", {
  enumerable: true,
  get: function () {
    return physics.ConeCollider;
  }
});
Object.defineProperty(exports, "TerrainCollider", {
  enumerable: true,
  get: function () {
    return physics.TerrainCollider;
  }
});
Object.defineProperty(exports, "SimplexCollider", {
  enumerable: true,
  get: function () {
    return physics.SimplexCollider;
  }
});
Object.defineProperty(exports, "PlaneCollider", {
  enumerable: true,
  get: function () {
    return physics.PlaneCollider;
  }
});
Object.defineProperty(exports, "Constraint", {
  enumerable: true,
  get: function () {
    return physics.Constraint;
  }
});
Object.defineProperty(exports, "HingeConstraint", {
  enumerable: true,
  get: function () {
    return physics.HingeConstraint;
  }
});
Object.defineProperty(exports, "PointToPointConstraint", {
  enumerable: true,
  get: function () {
    return physics.PointToPointConstraint;
  }
});
Object.defineProperty(exports, "EAxisDirection", {
  enumerable: true,
  get: function () {
    return physics.EAxisDirection;
  }
});
Object.defineProperty(exports, "ERigidBodyType", {
  enumerable: true,
  get: function () {
    return physics.ERigidBodyType;
  }
});
exports.physics = void 0;

var physics = _interopRequireWildcard(require("../cocos/physics/framework/index.js"));

exports.physics = physics;

var _base = require("./base.js");

var _deprecated = require("../cocos/physics/framework/deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
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
/// physics namespace ///
_base.cclegacy.physics = physics; /// cc namespace ///