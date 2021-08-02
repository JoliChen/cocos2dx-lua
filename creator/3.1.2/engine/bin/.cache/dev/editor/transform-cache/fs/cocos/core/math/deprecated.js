"use strict";

var _xDeprecated = require("../utils/x-deprecated.js");

var _color = require("./color.js");

var _mat = require("./mat3.js");

var _mat2 = require("./mat4.js");

var _quat = require("./quat.js");

var _vec = require("./vec2.js");

var _vec2 = require("./vec3.js");

var _vec3 = require("./vec4.js");

var _globalExports = require("../global-exports.js");

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
(0, _xDeprecated.replaceProperty)(_vec.Vec2, 'Vec2', [{
  name: 'sub',
  newName: 'subtract',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'div',
  newName: 'divide',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'dist',
  newName: 'distance',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'sqrDist',
  newName: 'squaredDistance',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'mag',
  newName: 'len',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'sqrMag',
  newName: 'lengthSqr',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec.Vec2,
  targetName: 'Vec2'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec.Vec2,
  targetName: 'Vec2'
}]);
(0, _xDeprecated.replaceProperty)(_vec.Vec2.prototype, 'Vec2', [{
  name: 'mag',
  newName: 'length',
  target: _vec.Vec2.prototype,
  targetName: 'Vec2'
}, {
  name: 'magSqr',
  newName: 'lengthSqr',
  target: _vec.Vec2.prototype,
  targetName: 'Vec2'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec.Vec2.prototype,
  targetName: 'Vec2'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec.Vec2.prototype,
  targetName: 'Vec2'
}]);
(0, _xDeprecated.replaceProperty)(_vec2.Vec3, 'Vec3', [{
  name: 'sub',
  newName: 'subtract',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'div',
  newName: 'divide',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'dist',
  newName: 'distance',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'sqrDist',
  newName: 'squaredDistance',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'mag',
  newName: 'len',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'sqrMag',
  newName: 'lengthSqr',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec2.Vec3,
  targetName: 'Vec3'
}]);
(0, _xDeprecated.replaceProperty)(_vec2.Vec3.prototype, 'Vec3', [{
  name: 'mag',
  newName: 'length',
  target: _vec2.Vec3.prototype,
  targetName: 'Vec3'
}, {
  name: 'magSqr',
  newName: 'lengthSqr',
  target: _vec2.Vec3.prototype,
  targetName: 'Vec3'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec2.Vec3.prototype,
  targetName: 'Vec3'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec2.Vec3.prototype,
  targetName: 'Vec3'
}]);
(0, _xDeprecated.replaceProperty)(_vec3.Vec4, 'Vec4', [{
  name: 'sub',
  newName: 'subtract',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'div',
  newName: 'divide',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'dist',
  newName: 'distance',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'sqrDist',
  newName: 'squaredDistance',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'mag',
  newName: 'len',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'sqrMag',
  newName: 'lengthSqr',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec3.Vec4,
  targetName: 'Vec4'
}]);
(0, _xDeprecated.replaceProperty)(_vec3.Vec4.prototype, 'Vec4', [{
  name: 'mag',
  newName: 'length',
  target: _vec3.Vec4.prototype,
  targetName: 'Vec4'
}, {
  name: 'magSqr',
  newName: 'lengthSqr',
  target: _vec3.Vec4.prototype,
  targetName: 'Vec4'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _vec3.Vec4.prototype,
  targetName: 'Vec4'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _vec3.Vec4.prototype,
  targetName: 'Vec4'
}]);
(0, _xDeprecated.replaceProperty)(_quat.Quat, 'Quat', [{
  name: 'mag',
  newName: 'len',
  target: _quat.Quat,
  targetName: 'Quat'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _quat.Quat,
  targetName: 'Quat'
}, {
  name: 'sqrMag',
  newName: 'lengthSqr',
  target: _quat.Quat,
  targetName: 'Quat'
}, {
  name: 'scale',
  newName: 'multiplyScalar',
  target: _quat.Quat,
  targetName: 'Quat'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _quat.Quat,
  targetName: 'Quat'
}]);
(0, _xDeprecated.replaceProperty)(_quat.Quat.prototype, 'Quat', [{
  name: 'scale',
  newName: 'multiplyScalar',
  target: _quat.Quat.prototype,
  targetName: 'Quat'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _quat.Quat.prototype,
  targetName: 'Quat'
}]);
(0, _xDeprecated.replaceProperty)(_color.Color, 'Color', [{
  name: 'sub',
  newName: 'subtract',
  target: _color.Color,
  targetName: 'Color'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _color.Color,
  targetName: 'Color'
}, {
  name: 'div',
  newName: 'divide',
  target: _color.Color,
  targetName: 'Color'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _color.Color,
  targetName: 'Color'
}, {
  name: 'fromHex',
  newName: 'fromHEX',

  customFunction(...args) {
    const arg1 = args[1].toString(16);
    return _globalExports.legacyCC.Color.fromHEX(args[0], arg1);
  }

}]);
(0, _xDeprecated.replaceProperty)(_mat.Mat3, 'Mat3', [{
  name: 'sub',
  newName: 'subtract',
  target: _mat.Mat3,
  targetName: 'Mat3'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _mat.Mat3,
  targetName: 'Mat3'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _mat.Mat3,
  targetName: 'Mat3'
}, {
  name: 'transfrom',
  newName: 'transform',
  target: _mat.Mat3,
  targetName: 'Mat3'
}]);
(0, _xDeprecated.replaceProperty)(_mat.Mat3.prototype, 'Mat3', [{
  name: 'sub',
  newName: 'subtract',
  target: _mat.Mat3.prototype,
  targetName: 'Mat3'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _mat.Mat3.prototype,
  targetName: 'Mat3'
}, {
  name: 'mulScalar',
  newName: 'multiplyScalar',
  target: _mat.Mat3.prototype,
  targetName: 'Mat3'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _mat.Mat3.prototype,
  targetName: 'Mat3'
}]);
(0, _xDeprecated.replaceProperty)(_mat2.Mat4, 'Mat4', [{
  name: 'sub',
  newName: 'subtract',
  target: _mat2.Mat4,
  targetName: 'Mat4'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _mat2.Mat4,
  targetName: 'Mat4'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _mat2.Mat4,
  targetName: 'Mat4'
}]);
(0, _xDeprecated.replaceProperty)(_mat2.Mat4.prototype, 'Mat4', [{
  name: 'sub',
  newName: 'subtract',
  target: _mat2.Mat4.prototype,
  targetName: 'Mat4'
}, {
  name: 'mul',
  newName: 'multiply',
  target: _mat2.Mat4.prototype,
  targetName: 'Mat4'
}, {
  name: 'mulScalar',
  newName: 'multiplyScalar',
  target: _mat2.Mat4.prototype,
  targetName: 'Mat4'
}, {
  name: 'exactEquals',
  newName: 'strictEquals',
  target: _mat2.Mat4.prototype,
  targetName: 'Mat4'
}]);