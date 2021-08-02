"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateTransform = calculateTransform;
exports.fixedAngleUnitVector2 = fixedAngleUnitVector2;
exports.randomUnitVector2 = randomUnitVector2;
exports.randomUnitVector = randomUnitVector;
exports.randomPointInUnitSphere = randomPointInUnitSphere;
exports.randomPointBetweenSphere = randomPointBetweenSphere;
exports.randomPointInUnitCircle = randomPointInUnitCircle;
exports.randomPointBetweenCircle = randomPointBetweenCircle;
exports.randomPointBetweenCircleAtFixedAngle = randomPointBetweenCircleAtFixedAngle;
exports.randomPointInCube = randomPointInCube;
exports.randomPointBetweenCube = randomPointBetweenCube;
exports.randomSortArray = randomSortArray;
exports.randomSign = randomSign;
exports.particleEmitZAxis = void 0;

var _index = require("../core/math/index.js");

var _bits = require("../core/math/bits.js");

var _enum = require("./enum.js");

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
const particleEmitZAxis = new _index.Vec3(0, 0, -1);
exports.particleEmitZAxis = particleEmitZAxis;

function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
  if (moduleSpace !== systemSpace) {
    if (systemSpace === _enum.Space.World) {
      _index.Mat4.getRotation(outQuat, worldTransform);
    } else {
      _index.Mat4.invert(worldTransform, worldTransform);

      _index.Mat4.getRotation(outQuat, worldTransform);
    }

    return true;
  } else {
    _index.Quat.set(outQuat, 0, 0, 0, 1);

    return false;
  }
}

function fixedAngleUnitVector2(out, theta) {
  _index.Vec2.set(out, Math.cos(theta), Math.sin(theta));
}

function randomUnitVector2(out) {
  const a = (0, _index.randomRange)(0, 2 * Math.PI);
  const x = Math.cos(a);
  const y = Math.sin(a);

  _index.Vec2.set(out, x, y);
}

function randomUnitVector(out) {
  const z = (0, _index.randomRange)(-1, 1);
  const a = (0, _index.randomRange)(0, 2 * Math.PI);
  const r = Math.sqrt(1 - z * z);
  const x = r * Math.cos(a);
  const y = r * Math.sin(a);

  _index.Vec3.set(out, x, y, z);
}

function randomPointInUnitSphere(out) {
  randomUnitVector(out);

  _index.Vec3.multiplyScalar(out, out, (0, _index.random)());
}

function randomPointBetweenSphere(out, minRadius, maxRadius) {
  randomUnitVector(out);

  _index.Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * (0, _index.random)());
}

function randomPointInUnitCircle(out) {
  randomUnitVector2(out);
  out.z = 0;

  _index.Vec3.multiplyScalar(out, out, (0, _index.random)());
}

function randomPointBetweenCircle(out, minRadius, maxRadius) {
  randomUnitVector2(out);
  out.z = 0;

  _index.Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * (0, _index.random)());
}

function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
  fixedAngleUnitVector2(out, theta);
  out.z = 0;

  _index.Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * (0, _index.random)());
}

function randomPointInCube(out, extents) {
  _index.Vec3.set(out, (0, _index.randomRange)(-extents.x, extents.x), (0, _index.randomRange)(-extents.y, extents.y), (0, _index.randomRange)(-extents.z, extents.z));
}

function randomPointBetweenCube(out, minBox, maxBox) {
  const subscript = ['x', 'y', 'z'];
  const edge = (0, _index.randomRangeInt)(0, 3);

  for (let i = 0; i < 3; i++) {
    if (i === edge) {
      out[subscript[i]] = (0, _index.randomRange)(-maxBox[subscript[i]], maxBox[subscript[i]]);
      continue;
    }

    const x = (0, _index.random)() * 2 - 1;

    if (x < 0) {
      out[subscript[i]] = -minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    } else {
      out[subscript[i]] = minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    }
  }
} // Fisher–Yates shuffle


function randomSortArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    const transpose = i + (0, _index.randomRangeInt)(0, arr.length - i);
    const val = arr[transpose];
    arr[transpose] = arr[i];
    arr[i] = val;
  }
}

function randomSign() {
  let sgn = (0, _index.randomRange)(-1, 1);

  if (sgn === 0) {
    sgn++;
  }

  return (0, _bits.sign)(sgn);
}