System.register("q-bundled:///fs/cocos/primitive/transform.js", ["../core/gfx/index.js"], function (_export, _context) {
  "use strict";

  var PrimitiveMode;

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
   * Translate the geometry.
   * @zh
   * 平移几何体。
   * @param geometry 几何体信息。
   * @param offset 偏移量。
   */
  function translate(geometry, offset) {
    var x = offset.x || 0;
    var y = offset.y || 0;
    var z = offset.z || 0;
    var nVertex = Math.floor(geometry.positions.length / 3);

    for (var iVertex = 0; iVertex < nVertex; ++iVertex) {
      var iX = iVertex * 3;
      var iY = iVertex * 3 + 1;
      var iZ = iVertex * 3 + 2;
      geometry.positions[iX] += x;
      geometry.positions[iY] += y;
      geometry.positions[iZ] += z;
    }

    if (geometry.minPos) {
      geometry.minPos.x += x;
      geometry.minPos.y += y;
      geometry.minPos.z += z;
    }

    if (geometry.maxPos) {
      geometry.maxPos.x += x;
      geometry.maxPos.y += y;
      geometry.maxPos.z += z;
    }

    return geometry;
  }
  /**
   * @en
   * Scale the geometry.
   * @zh
   * 缩放几何体。
   * @param geometry 几何体信息。
   * @param value 缩放量。
   */


  function scale(geometry, value) {
    var x = value.x || 0;
    var y = value.y || 0;
    var z = value.z || 0;
    var nVertex = Math.floor(geometry.positions.length / 3);

    for (var iVertex = 0; iVertex < nVertex; ++iVertex) {
      var iX = iVertex * 3;
      var iY = iVertex * 3 + 1;
      var iZ = iVertex * 3 + 2;
      geometry.positions[iX] *= x;
      geometry.positions[iY] *= y;
      geometry.positions[iZ] *= z;
    }

    if (geometry.minPos) {
      geometry.minPos.x *= x;
      geometry.minPos.y *= y;
      geometry.minPos.z *= z;
    }

    if (geometry.maxPos) {
      geometry.maxPos.x *= x;
      geometry.maxPos.y *= y;
      geometry.maxPos.z *= z;
    }

    geometry.boundingRadius = Math.max(Math.max(x, y), z);
    return geometry;
  }
  /**
   * @en
   * Converts geometry to wireframe mode. Only geometry with triangle topology is supported.
   * @zh
   * 将几何体转换为线框模式，仅支持三角形拓扑的几何体。
   * @param geometry 几何体信息。
   */


  function wireframed(geometry) {
    var indices = geometry.indices;

    if (!indices) {
      return geometry;
    } // We only support triangles' wireframe.


    if (geometry.primitiveMode && geometry.primitiveMode !== PrimitiveMode.TRIANGLE_LIST) {
      return geometry;
    }

    var offsets = [[0, 1], [1, 2], [2, 0]];
    var lines = [];
    var lineIDs = {};

    for (var i = 0; i < indices.length; i += 3) {
      for (var k = 0; k < 3; ++k) {
        var i1 = indices[i + offsets[k][0]];
        var i2 = indices[i + offsets[k][1]]; // check if we already have the line in our lines

        var id = i1 > i2 ? i2 << 16 | i1 : i1 << 16 | i2;

        if (lineIDs[id] === undefined) {
          lineIDs[id] = 0;
          lines.push(i1, i2);
        }
      }
    }

    geometry.indices = lines;
    geometry.primitiveMode = PrimitiveMode.LINE_LIST;
    return geometry;
  }

  _export({
    translate: translate,
    scale: scale,
    wireframed: wireframed
  });

  return {
    setters: [function (_coreGfxIndexJs) {
      PrimitiveMode = _coreGfxIndexJs.PrimitiveMode;
    }],
    execute: function () {}
  };
});