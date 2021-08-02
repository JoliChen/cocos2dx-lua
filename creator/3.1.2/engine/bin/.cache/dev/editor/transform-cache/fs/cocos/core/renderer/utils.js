"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIA = createIA;

var _index = require("../gfx/index.js");

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
function createIA(device, data) {
  if (!data.positions) {
    console.error('The data must have positions field');
    return null;
  }

  const verts = [];
  const vcount = data.positions.length / 3;

  for (let i = 0; i < vcount; ++i) {
    verts.push(data.positions[3 * i], data.positions[3 * i + 1], data.positions[3 * i + 2]);

    if (data.normals) {
      verts.push(data.normals[3 * i], data.normals[3 * i + 1], data.normals[3 * i + 2]);
    }

    if (data.uvs) {
      verts.push(data.uvs[2 * i], data.uvs[2 * i + 1]);
    }

    if (data.colors) {
      verts.push(data.colors[3 * i], data.colors[3 * i + 1], data.colors[3 * i + 2]);
    }
  }

  const vfmt = [];
  vfmt.push(new _index.Attribute(_index.AttributeName.ATTR_POSITION, _index.Format.RGB32F));

  if (data.normals) {
    vfmt.push(new _index.Attribute(_index.AttributeName.ATTR_NORMAL, _index.Format.RGB32F));
  }

  if (data.uvs) {
    vfmt.push(new _index.Attribute(_index.AttributeName.ATTR_TEX_COORD, _index.Format.RG32F));
  }

  if (data.colors) {
    vfmt.push(new _index.Attribute(_index.AttributeName.ATTR_COLOR, _index.Format.RGB32F));
  }

  const vb = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.VERTEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, verts.length * 4, verts.length * 4 / vcount));
  vb.update(new Float32Array(verts));
  let ib = null;

  if (data.indices) {
    ib = device.createBuffer(new _index.BufferInfo(_index.BufferUsageBit.INDEX | _index.BufferUsageBit.TRANSFER_DST, _index.MemoryUsageBit.HOST | _index.MemoryUsageBit.DEVICE, data.indices.length * 2, 2));
    ib.update(new Uint16Array(data.indices));
  }

  return device.createInputAssembler(new _index.InputAssemblerInfo(vfmt, [vb], ib));
}