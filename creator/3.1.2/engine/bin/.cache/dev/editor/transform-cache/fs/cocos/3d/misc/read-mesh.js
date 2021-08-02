"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readMesh = readMesh;

var _index = require("../../core/gfx/index.js");

var _buffer = require("./buffer.js");

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
var _keyMap;

(function (_keyMap) {
  _keyMap[_keyMap["positions"] = _index.AttributeName.ATTR_POSITION] = "positions";
  _keyMap[_keyMap["normals"] = _index.AttributeName.ATTR_NORMAL] = "normals";
  _keyMap[_keyMap["uvs"] = _index.AttributeName.ATTR_TEX_COORD] = "uvs";
  _keyMap[_keyMap["colors"] = _index.AttributeName.ATTR_COLOR] = "colors";
})(_keyMap || (_keyMap = {}));

function readMesh(mesh, iPrimitive = 0) {
  const out = {
    positions: []
  };
  const dataView = new DataView(mesh.data.buffer, mesh.data.byteOffset, mesh.data.byteLength);
  const struct = mesh.struct;
  const primitive = struct.primitives[iPrimitive];

  for (const idx of primitive.vertexBundelIndices) {
    const bundle = struct.vertexBundles[idx];
    let offset = bundle.view.offset;
    const {
      length,
      stride
    } = bundle.view;

    for (const attr of bundle.attributes) {
      const name = _keyMap[attr.name];

      if (name) {
        out[name] = (out[name] || []).concat((0, _buffer.readBuffer)(dataView, attr.format, offset, length, stride));
      }

      offset += _index.FormatInfos[attr.format].size;
    }
  }

  const view = primitive.indexView;
  out.indices = (0, _buffer.readBuffer)(dataView, _index.Format[`R${view.stride * 8}UI`], view.offset, view.length);
  return out;
}