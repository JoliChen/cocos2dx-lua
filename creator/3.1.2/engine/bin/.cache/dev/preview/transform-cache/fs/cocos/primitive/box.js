System.register("q-bundled:///fs/cocos/primitive/box.js", ["../core/math/index.js"], function (_export, _context) {
  "use strict";

  var Vec3, temp1, temp2, temp3, r, c0, c1, c2, c3, c4, c5, c6, c7;

  function box(options) {
    options = options || {};
    var ws = options.widthSegments || 1;
    var hs = options.heightSegments || 1;
    var ls = options.lengthSegments || 1;
    var hw = (options.width || 1) / 2;
    var hh = (options.height || 1) / 2;
    var hl = (options.length || 1) / 2;
    var corners = [Vec3.set(c0, -hw, -hh, hl), Vec3.set(c1, hw, -hh, hl), Vec3.set(c2, hw, hh, hl), Vec3.set(c3, -hw, hh, hl), Vec3.set(c4, hw, -hh, -hl), Vec3.set(c5, -hw, -hh, -hl), Vec3.set(c6, -hw, hh, -hl), Vec3.set(c7, hw, hh, -hl)];
    var faceAxes = [[2, 3, 1], // FRONT
    [4, 5, 7], // BACK
    [7, 6, 2], // TOP
    [1, 0, 4], // BOTTOM
    [1, 4, 2], // RIGHT
    [5, 0, 6] // LEFT
    ];
    var faceNormals = [[0, 0, 1], // FRONT
    [0, 0, -1], // BACK
    [0, 1, 0], // TOP
    [0, -1, 0], // BOTTOM
    [1, 0, 0], // RIGHT
    [-1, 0, 0] // LEFT
    ];
    var faceTangents = [[-1, 0, 0, 1], // FRONT
    [-1, 0, 0, 1], // BACK
    [-1, 0, 0, 1], // TOP
    [-1, 0, 0, 1], // BOTTOM
    [0, 0, -1, 1], // RIGHT
    [0, 0, 1, 1] // LEFT
    ];
    var positions = [];
    var normals = [];
    var uvs = [];
    var tangents = [];
    var indices = [];
    var minPos = new Vec3(-hw, -hh, -hl);
    var maxPos = new Vec3(hw, hh, hl);
    var boundingRadius = Math.sqrt(hw * hw + hh * hh + hl * hl);

    function _buildPlane(side, uSegments, vSegments) {
      var u;
      var v;
      var ix;
      var iy;
      var offset = positions.length / 3;
      var faceAxe = faceAxes[side];
      var faceNormal = faceNormals[side];
      var faceTangent = faceTangents[side];

      for (iy = 0; iy <= vSegments; iy++) {
        for (ix = 0; ix <= uSegments; ix++) {
          u = ix / uSegments;
          v = iy / vSegments;
          Vec3.lerp(temp1, corners[faceAxe[0]], corners[faceAxe[1]], u);
          Vec3.lerp(temp2, corners[faceAxe[0]], corners[faceAxe[2]], v);
          Vec3.subtract(temp3, temp2, corners[faceAxe[0]]);
          Vec3.add(r, temp1, temp3);
          positions.push(r.x, r.y, r.z);
          normals.push(faceNormal[0], faceNormal[1], faceNormal[2]);
          uvs.push(u, v);
          tangents.push(faceTangent[0], faceTangent[1], faceTangent[2], faceTangent[3]);

          if (ix < uSegments && iy < vSegments) {
            var useg1 = uSegments + 1;
            var a = ix + iy * useg1;
            var b = ix + (iy + 1) * useg1;
            var c = ix + 1 + (iy + 1) * useg1;
            var d = ix + 1 + iy * useg1;
            indices.push(offset + a, offset + d, offset + b);
            indices.push(offset + b, offset + d, offset + c);
          }
        }
      }
    }

    _buildPlane(0, ws, hs); // FRONT


    _buildPlane(4, ls, hs); // RIGHT


    _buildPlane(1, ws, hs); // BACK


    _buildPlane(5, ls, hs); // LEFT


    _buildPlane(3, ws, ls); // BOTTOM


    _buildPlane(2, ws, ls); // TOP


    return {
      positions: positions,
      normals: normals,
      uvs: uvs,
      tangents: tangents,
      indices: indices,
      minPos: minPos,
      maxPos: maxPos,
      boundingRadius: boundingRadius
    };
  }

  _export("default", box);

  return {
    setters: [function (_coreMathIndexJs) {
      Vec3 = _coreMathIndexJs.Vec3;
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
       * @module 3d/primitive
       */

      /**
       * @en
       * This function generates a box with specified extents and centered at origin,
       * but may be repositioned through the `center` option.
       * @zh
       * 生成一个立方体，其大小是定义的范围且中心在原点。
       * @param options 参数选项。
       */
      temp1 = new Vec3();
      temp2 = new Vec3();
      temp3 = new Vec3();
      r = new Vec3();
      c0 = new Vec3();
      c1 = new Vec3();
      c2 = new Vec3();
      c3 = new Vec3();
      c4 = new Vec3();
      c5 = new Vec3();
      c6 = new Vec3();
      c7 = new Vec3();
    }
  };
});