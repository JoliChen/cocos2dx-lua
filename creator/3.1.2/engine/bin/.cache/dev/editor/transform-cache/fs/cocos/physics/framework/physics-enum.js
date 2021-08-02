"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhysicsGroup = exports.EConstraintType = exports.EColliderType = exports.ESimplexType = exports.EAxisDirection = exports.ERigidBodyType = void 0;

var _index = require("../../core/index.js");

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
let ERigidBodyType;
exports.ERigidBodyType = ERigidBodyType;

(function (ERigidBodyType) {
  ERigidBodyType[ERigidBodyType["DYNAMIC"] = 1] = "DYNAMIC";
  ERigidBodyType[ERigidBodyType["STATIC"] = 2] = "STATIC";
  ERigidBodyType[ERigidBodyType["KINEMATIC"] = 4] = "KINEMATIC";
})(ERigidBodyType || (exports.ERigidBodyType = ERigidBodyType = {}));

(0, _index.Enum)(ERigidBodyType);
let EAxisDirection;
exports.EAxisDirection = EAxisDirection;

(function (EAxisDirection) {
  EAxisDirection[EAxisDirection["X_AXIS"] = 0] = "X_AXIS";
  EAxisDirection[EAxisDirection["Y_AXIS"] = 1] = "Y_AXIS";
  EAxisDirection[EAxisDirection["Z_AXIS"] = 2] = "Z_AXIS";
})(EAxisDirection || (exports.EAxisDirection = EAxisDirection = {}));

(0, _index.Enum)(EAxisDirection);
let ESimplexType;
exports.ESimplexType = ESimplexType;

(function (ESimplexType) {
  ESimplexType[ESimplexType["VERTEX"] = 1] = "VERTEX";
  ESimplexType[ESimplexType["LINE"] = 2] = "LINE";
  ESimplexType[ESimplexType["TRIANGLE"] = 3] = "TRIANGLE";
  ESimplexType[ESimplexType["TETRAHEDRON"] = 4] = "TETRAHEDRON";
})(ESimplexType || (exports.ESimplexType = ESimplexType = {}));

(0, _index.Enum)(ESimplexType);
let EColliderType;
exports.EColliderType = EColliderType;

(function (EColliderType) {
  EColliderType[EColliderType["BOX"] = 0] = "BOX";
  EColliderType[EColliderType["SPHERE"] = 1] = "SPHERE";
  EColliderType[EColliderType["CAPSULE"] = 2] = "CAPSULE";
  EColliderType[EColliderType["CYLINDER"] = 3] = "CYLINDER";
  EColliderType[EColliderType["CONE"] = 4] = "CONE";
  EColliderType[EColliderType["MESH"] = 5] = "MESH";
  EColliderType[EColliderType["PLANE"] = 6] = "PLANE";
  EColliderType[EColliderType["SIMPLEX"] = 7] = "SIMPLEX";
  EColliderType[EColliderType["TERRAIN"] = 8] = "TERRAIN";
})(EColliderType || (exports.EColliderType = EColliderType = {}));

(0, _index.Enum)(EColliderType);
let EConstraintType;
exports.EConstraintType = EConstraintType;

(function (EConstraintType) {
  EConstraintType[EConstraintType["POINT_TO_POINT"] = 0] = "POINT_TO_POINT";
  EConstraintType[EConstraintType["HINGE"] = 1] = "HINGE";
  EConstraintType[EConstraintType["CONE_TWIST"] = 2] = "CONE_TWIST";
})(EConstraintType || (exports.EConstraintType = EConstraintType = {}));

(0, _index.Enum)(EConstraintType);
let PhysicsGroup;
exports.PhysicsGroup = PhysicsGroup;

(function (PhysicsGroup) {
  PhysicsGroup[PhysicsGroup["DEFAULT"] = 1] = "DEFAULT";
})(PhysicsGroup || (exports.PhysicsGroup = PhysicsGroup = {}));

(0, _index.Enum)(PhysicsGroup);