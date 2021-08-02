System.register("q-bundled:///fs/cocos/core/renderer/utils.js", ["../gfx/index.js"], function (_export, _context) {
  "use strict";

  var Attribute, BufferInfo, InputAssemblerInfo, AttributeName, BufferUsageBit, Format, MemoryUsageBit;

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

    var verts = [];
    var vcount = data.positions.length / 3;

    for (var i = 0; i < vcount; ++i) {
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

    var vfmt = [];
    vfmt.push(new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F));

    if (data.normals) {
      vfmt.push(new Attribute(AttributeName.ATTR_NORMAL, Format.RGB32F));
    }

    if (data.uvs) {
      vfmt.push(new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F));
    }

    if (data.colors) {
      vfmt.push(new Attribute(AttributeName.ATTR_COLOR, Format.RGB32F));
    }

    var vb = device.createBuffer(new BufferInfo(BufferUsageBit.VERTEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, verts.length * 4, verts.length * 4 / vcount));
    vb.update(new Float32Array(verts));
    var ib = null;

    if (data.indices) {
      ib = device.createBuffer(new BufferInfo(BufferUsageBit.INDEX | BufferUsageBit.TRANSFER_DST, MemoryUsageBit.HOST | MemoryUsageBit.DEVICE, data.indices.length * 2, 2));
      ib.update(new Uint16Array(data.indices));
    }

    return device.createInputAssembler(new InputAssemblerInfo(vfmt, [vb], ib));
  }

  _export("createIA", createIA);

  return {
    setters: [function (_gfxIndexJs) {
      Attribute = _gfxIndexJs.Attribute;
      BufferInfo = _gfxIndexJs.BufferInfo;
      InputAssemblerInfo = _gfxIndexJs.InputAssemblerInfo;
      AttributeName = _gfxIndexJs.AttributeName;
      BufferUsageBit = _gfxIndexJs.BufferUsageBit;
      Format = _gfxIndexJs.Format;
      MemoryUsageBit = _gfxIndexJs.MemoryUsageBit;
    }],
    execute: function () {}
  };
});