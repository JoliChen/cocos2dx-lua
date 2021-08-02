"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Device = void 0;

var _enum = require("../../value-types/enum.js");

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
 * @module gfx
 */
(0, _enum.ccenum)(_define.Format);
/**
 * @en GFX Device.
 * @zh GFX 设备。
 */

class Device {
  constructor() {
    this._canvas = null;
    this._canvas2D = null;
    this._gfxAPI = _define.API.UNKNOWN;
    this._transform = _define.SurfaceTransform.IDENTITY;
    this._deviceName = '';
    this._renderer = '';
    this._vendor = '';
    this._version = '';
    this._features = new Array(_define.Feature.COUNT);
    this._queue = null;
    this._cmdBuff = null;
    this._devicePixelRatio = 1.0;
    this._width = 0;
    this._height = 0;
    this._nativeWidth = 0;
    this._nativeHeight = 0;
    this._colorFmt = _define.Format.UNKNOWN;
    this._depthStencilFmt = _define.Format.UNKNOWN;
    this._numDrawCalls = 0;
    this._numInstances = 0;
    this._numTris = 0;
    this._memoryStatus = new _define.MemoryStatus();
    this._caps = new _define.DeviceCaps();
  }

  /**
   * @en The HTML canvas element.
   * @zh HTML 画布。
   */
  get canvas() {
    return this._canvas;
  }
  /**
   * @en The HTML canvas element for 2D rendering.
   * @zh 用于 2D 绘制的 HTML 画布。
   */


  get canvas2D() {
    return this._canvas2D;
  }
  /**
   * @en Current rendering API.
   * @zh 当前 GFX 使用的渲染 API。
   */


  get gfxAPI() {
    return this._gfxAPI;
  }
  /**
   * @en GFX default queue.
   * @zh GFX 默认队列。
   */


  get queue() {
    return this._queue;
  }
  /**
   * @en GFX default command buffer.
   * @zh GFX 默认命令缓冲。
   */


  get commandBuffer() {
    return this._cmdBuff;
  }
  /**
   * @en Device pixel ratio.
   * @zh DPR 设备像素比。
   */


  get devicePixelRatio() {
    return this._devicePixelRatio;
  }
  /**
   * @en Device pixel width.
   * @zh 设备像素宽度。
   */


  get width() {
    return this._width;
  }
  /**
   * @en Device pixel height.
   * @zh 设备像素高度。
   */


  get height() {
    return this._height;
  }
  /**
   * @en Device native width.
   * @zh 设备原生的像素宽度。
   */


  get nativeWidth() {
    return this._nativeWidth;
  }
  /**
   * @en Device native height.
   * @zh 设备原生的像素高度。
   */


  get nativeHeight() {
    return this._nativeHeight;
  }
  /**
   * @en Renderer description.
   * @zh 渲染器描述。
   */


  get renderer() {
    return this._renderer;
  }
  /**
   * @en Vendor description.
   * @zh 厂商描述。
   */


  get vendor() {
    return this._vendor;
  }
  /**
   * @en Device color format.
   * @zh 颜色格式。
   */


  get colorFormat() {
    return this._colorFmt;
  }
  /**
   * @en Device depth stencil format.
   * @zh 深度模板格式。
   */


  get depthStencilFormat() {
    return this._depthStencilFmt;
  }
  /**
   * @en Number of draw calls currently recorded.
   * @zh 绘制调用次数。
   */


  get numDrawCalls() {
    return this._numDrawCalls;
  }
  /**
   * @en Number of instances currently recorded.
   * @zh 绘制 Instance 数量。
   */


  get numInstances() {
    return this._numInstances;
  }
  /**
   * @en Number of triangles currently recorded.
   * @zh 渲染三角形数量。
   */


  get numTris() {
    return this._numTris;
  }
  /**
   * @en Total memory size currently allocated.
   * @zh 内存状态。
   */


  get memoryStatus() {
    return this._memoryStatus;
  }
  /**
   * @en Current device capabilities.
   * @zh 当前设备能立数据。
   */


  get capabilities() {
    return this._caps;
  }
  /**
   * @en The surface transform to be applied in projection matrices.
   * @zh 需要在投影矩阵中应用的表面变换。
   */


  get surfaceTransform() {
    return this._transform;
  }

  /**
   * @en Whether the device has specific feature.
   * @zh 是否具备特性。
   * @param feature The GFX feature to be queried.
   */
  hasFeature(feature) {
    return this._features[feature];
  }

}

exports.Device = Device;