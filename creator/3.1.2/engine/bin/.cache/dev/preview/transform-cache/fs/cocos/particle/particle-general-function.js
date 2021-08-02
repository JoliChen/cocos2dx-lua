System.register("q-bundled:///fs/cocos/particle/particle-general-function.js", ["../core/math/index.js", "../core/math/bits.js", "./enum.js"], function (_export, _context) {
  "use strict";

  var Mat4, Quat, random, randomRange, randomRangeInt, Vec2, Vec3, sign, Space, particleEmitZAxis;

  function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
    if (moduleSpace !== systemSpace) {
      if (systemSpace === Space.World) {
        Mat4.getRotation(outQuat, worldTransform);
      } else {
        Mat4.invert(worldTransform, worldTransform);
        Mat4.getRotation(outQuat, worldTransform);
      }

      return true;
    } else {
      Quat.set(outQuat, 0, 0, 0, 1);
      return false;
    }
  }

  function fixedAngleUnitVector2(out, theta) {
    Vec2.set(out, Math.cos(theta), Math.sin(theta));
  }

  function randomUnitVector2(out) {
    var a = randomRange(0, 2 * Math.PI);
    var x = Math.cos(a);
    var y = Math.sin(a);
    Vec2.set(out, x, y);
  }

  function randomUnitVector(out) {
    var z = randomRange(-1, 1);
    var a = randomRange(0, 2 * Math.PI);
    var r = Math.sqrt(1 - z * z);
    var x = r * Math.cos(a);
    var y = r * Math.sin(a);
    Vec3.set(out, x, y, z);
  }

  function randomPointInUnitSphere(out) {
    randomUnitVector(out);
    Vec3.multiplyScalar(out, out, random());
  }

  function randomPointBetweenSphere(out, minRadius, maxRadius) {
    randomUnitVector(out);
    Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * random());
  }

  function randomPointInUnitCircle(out) {
    randomUnitVector2(out);
    out.z = 0;
    Vec3.multiplyScalar(out, out, random());
  }

  function randomPointBetweenCircle(out, minRadius, maxRadius) {
    randomUnitVector2(out);
    out.z = 0;
    Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * random());
  }

  function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
    fixedAngleUnitVector2(out, theta);
    out.z = 0;
    Vec3.multiplyScalar(out, out, minRadius + (maxRadius - minRadius) * random());
  }

  function randomPointInCube(out, extents) {
    Vec3.set(out, randomRange(-extents.x, extents.x), randomRange(-extents.y, extents.y), randomRange(-extents.z, extents.z));
  }

  function randomPointBetweenCube(out, minBox, maxBox) {
    var subscript = ['x', 'y', 'z'];
    var edge = randomRangeInt(0, 3);

    for (var i = 0; i < 3; i++) {
      if (i === edge) {
        out[subscript[i]] = randomRange(-maxBox[subscript[i]], maxBox[subscript[i]]);
        continue;
      }

      var x = random() * 2 - 1;

      if (x < 0) {
        out[subscript[i]] = -minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
      } else {
        out[subscript[i]] = minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
      }
    }
  } // Fisher–Yates shuffle


  function randomSortArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      var transpose = i + randomRangeInt(0, arr.length - i);
      var val = arr[transpose];
      arr[transpose] = arr[i];
      arr[i] = val;
    }
  }

  function randomSign() {
    var sgn = randomRange(-1, 1);

    if (sgn === 0) {
      sgn++;
    }

    return sign(sgn);
  }

  _export({
    calculateTransform: calculateTransform,
    fixedAngleUnitVector2: fixedAngleUnitVector2,
    randomUnitVector2: randomUnitVector2,
    randomUnitVector: randomUnitVector,
    randomPointInUnitSphere: randomPointInUnitSphere,
    randomPointBetweenSphere: randomPointBetweenSphere,
    randomPointInUnitCircle: randomPointInUnitCircle,
    randomPointBetweenCircle: randomPointBetweenCircle,
    randomPointBetweenCircleAtFixedAngle: randomPointBetweenCircleAtFixedAngle,
    randomPointInCube: randomPointInCube,
    randomPointBetweenCube: randomPointBetweenCube,
    randomSortArray: randomSortArray,
    randomSign: randomSign
  });

  return {
    setters: [function (_coreMathIndexJs) {
      Mat4 = _coreMathIndexJs.Mat4;
      Quat = _coreMathIndexJs.Quat;
      random = _coreMathIndexJs.random;
      randomRange = _coreMathIndexJs.randomRange;
      randomRangeInt = _coreMathIndexJs.randomRangeInt;
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreMathBitsJs) {
      sign = _coreMathBitsJs.sign;
    }, function (_enumJs) {
      Space = _enumJs.Space;
    }],
    execute: function () {
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
      _export("particleEmitZAxis", particleEmitZAxis = new Vec3(0, 0, -1));
    }
  };
});