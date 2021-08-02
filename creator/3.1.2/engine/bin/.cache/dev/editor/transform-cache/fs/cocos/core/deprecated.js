"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vmath = void 0;

var _xDeprecated = require("./utils/x-deprecated.js");

var math = _interopRequireWildcard(require("./math/index.js"));

var _scheduler = require("./scheduler.js");

var _events = require("./platform/event-manager/events.js");

var _globalExports = require("./global-exports.js");

var _submodel = require("./renderer/scene/submodel.js");

var _root = require("./root.js");

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
// VMATH
const vmath = {};
exports.vmath = vmath;
(0, _xDeprecated.replaceProperty)(vmath, 'vmath', [{
  name: 'vec2',
  newName: 'Vec2',
  target: math,
  targetName: 'math'
}, {
  name: 'vec3',
  newName: 'Vec3',
  target: math,
  targetName: 'math'
}, {
  name: 'vec4',
  newName: 'Vec4',
  target: math,
  targetName: 'math'
}, {
  name: 'quat',
  newName: 'Quat',
  target: math,
  targetName: 'math'
}, {
  name: 'mat3',
  newName: 'Mat3',
  target: math,
  targetName: 'math'
}, {
  name: 'mat4',
  newName: 'Mat4',
  target: math,
  targetName: 'math'
}, {
  name: 'color4',
  newName: 'Color',
  target: math,
  targetName: 'math'
}, {
  name: 'rect',
  newName: 'Rect',
  target: math,
  targetName: 'math'
}, {
  name: 'approx',
  newName: 'approx',
  target: math,
  targetName: 'math'
}, {
  name: 'EPSILON',
  newName: 'EPSILON',
  target: math,
  targetName: 'math'
}, {
  name: 'equals',
  newName: 'equals',
  target: math,
  targetName: 'math'
}, {
  name: 'clamp',
  newName: 'clamp',
  target: math,
  targetName: 'math'
}, {
  name: 'clamp01',
  newName: 'clamp01',
  target: math,
  targetName: 'math'
}, {
  name: 'lerp',
  newName: 'lerp',
  target: math,
  targetName: 'math'
}, {
  name: 'toRadian',
  newName: 'toRadian',
  target: math,
  targetName: 'math'
}, {
  name: 'toDegree',
  newName: 'toDegree',
  target: math,
  targetName: 'math'
}, {
  name: 'random',
  newName: 'random',
  target: math,
  targetName: 'math'
}, {
  name: 'randomRange',
  newName: 'randomRange',
  target: math,
  targetName: 'math'
}, {
  name: 'randomRangeInt',
  newName: 'randomRangeInt',
  target: math,
  targetName: 'math'
}, {
  name: 'pseudoRandom',
  newName: 'pseudoRandom',
  target: math,
  targetName: 'math'
}, {
  name: 'pseudoRandomRangeInt',
  newName: 'pseudoRandomRangeInt',
  target: math,
  targetName: 'math'
}, {
  name: 'nextPow2',
  newName: 'nextPow2',
  target: math,
  targetName: 'math'
}, {
  name: 'repeat',
  newName: 'repeat',
  target: math,
  targetName: 'math'
}, {
  name: 'pingPong',
  newName: 'pingPong',
  target: math,
  targetName: 'math'
}, {
  name: 'inverseLerp',
  newName: 'inverseLerp',
  target: math,
  targetName: 'math'
}]);
_globalExports.legacyCC.vmath = vmath;
// Scheduler
(0, _xDeprecated.replaceProperty)(_scheduler.Scheduler.prototype, 'Scheduler.prototype', [{
  name: 'enableForTarget',
  newName: 'enableForTarget',
  target: _scheduler.Scheduler,
  targetName: 'Scheduler'
}]); // Events

(0, _xDeprecated.replaceProperty)(_events.EventTouch.prototype, 'EventTouch.prototype', [{
  name: 'getUILocationInView',
  newName: 'getLocationInView',
  target: _events.EventTouch,
  targetName: 'EventTouch'
}]); // Render scene

(0, _xDeprecated.replaceProperty)(_submodel.SubModel.prototype, 'SubModel.prototype', [{
  name: 'subMeshData',
  newName: 'subMesh'
}]);
(0, _xDeprecated.removeProperty)(_submodel.SubModel.prototype, 'SubModel.prototype', [{
  name: 'getSubModel',
  suggest: 'Use `subModels[i]` instead'
}, {
  name: 'subModelNum',
  suggest: 'Use `subModels.length` instead'
}]); // Root

(0, _xDeprecated.replaceProperty)(_root.Root.prototype, 'Root.prototype', [{
  name: 'ui',
  newName: 'batcher2D'
}]);