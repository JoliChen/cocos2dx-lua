"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BoxColliderComponent", {
  enumerable: true,
  get: function () {
    return _boxCollider.BoxCollider;
  }
});
Object.defineProperty(exports, "SphereColliderComponent", {
  enumerable: true,
  get: function () {
    return _sphereCollider.SphereCollider;
  }
});
Object.defineProperty(exports, "CapsuleColliderComponent", {
  enumerable: true,
  get: function () {
    return _capsuleCollider.CapsuleCollider;
  }
});
Object.defineProperty(exports, "CylinderColliderComponent", {
  enumerable: true,
  get: function () {
    return _cylinderCollider.CylinderCollider;
  }
});
Object.defineProperty(exports, "MeshColliderComponent", {
  enumerable: true,
  get: function () {
    return _meshCollider.MeshCollider;
  }
});
Object.defineProperty(exports, "RigidBodyComponent", {
  enumerable: true,
  get: function () {
    return _rigidBody.RigidBody;
  }
});
Object.defineProperty(exports, "ColliderComponent", {
  enumerable: true,
  get: function () {
    return _collider.Collider;
  }
});
Object.defineProperty(exports, "PhysicMaterial", {
  enumerable: true,
  get: function () {
    return _physicsMaterial.PhysicsMaterial;
  }
});

var _physicsSystem = require("./physics-system.js");

var _xDeprecated = require("../../core/utils/x-deprecated.js");

var _boxCollider = require("./components/colliders/box-collider.js");

var _sphereCollider = require("./components/colliders/sphere-collider.js");

var _capsuleCollider = require("./components/colliders/capsule-collider.js");

var _cylinderCollider = require("./components/colliders/cylinder-collider.js");

var _meshCollider = require("./components/colliders/mesh-collider.js");

var _rigidBody = require("./components/rigid-body.js");

var _collider = require("./components/colliders/collider.js");

var _js = require("../../core/utils/js.js");

var _globalExports = require("../../core/global-exports.js");

var _physicsMaterial = require("./assets/physics-material.js");

var _constraint = require("./components/constraints/constraint.js");

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
 * @module physics
 */
(0, _xDeprecated.replaceProperty)(_physicsSystem.PhysicsSystem, 'PhysicsSystem', [{
  name: 'ins',
  newName: 'instance'
}]);
(0, _xDeprecated.replaceProperty)(_physicsSystem.PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
  name: 'deltaTime',
  newName: 'fixedTimeStep'
}, {
  name: 'maxSubStep',
  newName: 'maxSubSteps'
}]);
(0, _xDeprecated.removeProperty)(_physicsSystem.PhysicsSystem.prototype, 'PhysicsSystem.prototype', [{
  name: 'useFixedTime'
}, {
  name: 'useCollisionMatrix'
}, {
  name: 'updateCollisionMatrix'
}, {
  name: 'resetCollisionMatrix'
}, {
  name: 'isCollisionGroup'
}, {
  name: 'setCollisionGroup'
}]);
(0, _xDeprecated.replaceProperty)(_collider.Collider.prototype, 'Collider.prototype', [{
  name: 'attachedRigidbody',
  newName: 'attachedRigidBody'
}, {
  name: 'TYPE',
  newName: 'type'
}]);
(0, _xDeprecated.replaceProperty)(_collider.Collider, 'Collider', [{
  name: 'EColliderType',
  newName: 'Type'
}, {
  name: 'EAxisDirection',
  newName: 'Axis'
}]);
(0, _xDeprecated.replaceProperty)(_constraint.Constraint, 'Constraint', [{
  name: 'EConstraintType',
  newName: 'Type'
}]);
(0, _xDeprecated.replaceProperty)(_boxCollider.BoxCollider.prototype, 'BoxCollider.prototype', [{
  name: 'boxShape',
  newName: 'shape'
}]);
(0, _xDeprecated.replaceProperty)(_sphereCollider.SphereCollider.prototype, 'SphereCollider.prototype', [{
  name: 'sphereShape',
  newName: 'shape'
}]);
(0, _xDeprecated.replaceProperty)(_capsuleCollider.CapsuleCollider.prototype, 'CapsuleCollider.prototype', [{
  name: 'capsuleShape',
  newName: 'shape'
}]);
(0, _xDeprecated.replaceProperty)(_rigidBody.RigidBody.prototype, 'RigidBody.prototype', [{
  name: 'rigidBody',
  newName: 'body'
}]);
(0, _xDeprecated.replaceProperty)(_rigidBody.RigidBody, 'RigidBody', [{
  name: 'ERigidBodyType',
  newName: 'Type'
}]);
(0, _xDeprecated.removeProperty)(_rigidBody.RigidBody.prototype, 'RigidBody.prototype', [{
  name: 'fixedRotation'
}]);
/**
 * Alias of [[RigidBody]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.RigidBodyComponent = _rigidBody.RigidBody;

_js.js.setClassAlias(_rigidBody.RigidBody, 'cc.RigidBodyComponent');
/**
 * Alias of [[Collider]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ColliderComponent = _collider.Collider;

_js.js.setClassAlias(_collider.Collider, 'cc.ColliderComponent');
/**
 * Alias of [[BoxCollider]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.BoxColliderComponent = _boxCollider.BoxCollider;

_js.js.setClassAlias(_boxCollider.BoxCollider, 'cc.BoxColliderComponent');
/**
 * Alias of [[SphereCollider]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SphereColliderComponent = _sphereCollider.SphereCollider;

_js.js.setClassAlias(_sphereCollider.SphereCollider, 'cc.SphereColliderComponent');
/**
 * Alias of [[CapsuleCollider]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_capsuleCollider.CapsuleCollider, 'cc.CapsuleColliderComponent');
/**
 * Alias of [[MeshCollider]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_meshCollider.MeshCollider, 'cc.MeshColliderComponent');
/**
 * Alias of [[CylinderCollider]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_cylinderCollider.CylinderCollider, 'cc.CylinderColliderComponent');
/**
 * Alias of [[PhysicsMaterial]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.PhysicMaterial = _physicsMaterial.PhysicsMaterial;

_js.js.setClassAlias(_physicsMaterial.PhysicsMaterial, 'cc.PhysicMaterial');