"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plane;

var _index = require("../core/math/index.js");

var _define = require("./define.js");

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
 * @zh
 * 应用默认的平面参数选项。
 * @param options 平面参数选项。
 */
function applyDefaultPlaneOptions(options) {
  options = (0, _define.applyDefaultGeometryOptions)(options);
  options.width = options.width || 10;
  options.length = options.length || 10;
  options.widthSegments = options.widthSegments || 10;
  options.lengthSegments = options.lengthSegments || 10;
  return options;
}

const temp1 = new _index.Vec3(0, 0, 0);
const temp2 = new _index.Vec3(0, 0, 0);
const temp3 = new _index.Vec3(0, 0, 0);
const r = new _index.Vec3(0, 0, 0);
const c00 = new _index.Vec3(0, 0, 0);
const c10 = new _index.Vec3(0, 0, 0);
const c01 = new _index.Vec3(0, 0, 0);
/**
 * @en
 * This function generates a plane on XOZ plane with positive Y direction.
 * @zh
 * 生成一个平面，其位于XOZ平面，方向为Y轴正方向。
 * @param options 平面参数选项。
 */

function plane(options) {
  const normalizedOptions = applyDefaultPlaneOptions(options);
  const {
    width,
    length,
    widthSegments: uSegments,
    lengthSegments: vSegments
  } = normalizedOptions;
  const hw = width * 0.5;
  const hl = length * 0.5;
  const positions = [];
  const uvs = [];
  const indices = [];
  const minPos = new _index.Vec3(-hw, 0, -hl);
  const maxPos = new _index.Vec3(hw, 0, hl);
  const boundingRadius = Math.sqrt(width * width + length * length);

  _index.Vec3.set(c00, -hw, 0, hl);

  _index.Vec3.set(c10, hw, 0, hl);

  _index.Vec3.set(c01, -hw, 0, -hl);

  for (let y = 0; y <= vSegments; y++) {
    for (let x = 0; x <= uSegments; x++) {
      const u = x / uSegments;
      const v = y / vSegments;

      _index.Vec3.lerp(temp1, c00, c10, u);

      _index.Vec3.lerp(temp2, c00, c01, v);

      _index.Vec3.subtract(temp3, temp2, c00);

      _index.Vec3.add(r, temp1, temp3);

      positions.push(r.x, r.y, r.z);

      if (normalizedOptions.includeUV) {
        uvs.push(u, v);
      }

      if (x < uSegments && y < vSegments) {
        const useg1 = uSegments + 1;
        const a = x + y * useg1;
        const b = x + (y + 1) * useg1;
        const c = x + 1 + (y + 1) * useg1;
        const d = x + 1 + y * useg1;
        indices.push(a, d, b);
        indices.push(d, c, b);
      }
    }
  }

  const result = {
    positions,
    indices,
    minPos,
    maxPos,
    boundingRadius
  };

  if (normalizedOptions.includeNormal) {
    const nVertex = (vSegments + 1) * (uSegments + 1);
    const normals = new Array(3 * nVertex);
    result.normals = normals;

    for (let i = 0; i < nVertex; ++i) {
      normals[i * 3 + 0] = 0;
      normals[i * 3 + 1] = 1;
      normals[i * 3 + 2] = 0;
    }
  }

  if (normalizedOptions.includeUV) {
    result.uvs = uvs;
  }

  return result;
}