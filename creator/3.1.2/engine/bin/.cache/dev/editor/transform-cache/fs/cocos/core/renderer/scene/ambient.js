"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ambient = void 0;

var _index = require("../../math/index.js");

var _memoryPools = require("../core/memory-pools.js");

var _globalExports = require("../../global-exports.js");

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
class Ambient {
  get colorArray() {
    return this._colorArray;
  }

  get albedoArray() {
    return this._albedoArray;
  }
  /**
   * @en Enable ambient
   * @zh 是否开启环境光
   */


  set enabled(val) {
    _memoryPools.AmbientPool.set(this._handle, _memoryPools.AmbientView.ENABLE, val ? 1 : 0);
  }

  get enabled() {
    return _memoryPools.AmbientPool.get(this._handle, _memoryPools.AmbientView.ENABLE);
  }
  /**
   * @en Sky color
   * @zh 天空颜色
   */


  get skyColor() {
    return this._skyColor;
  }

  set skyColor(color) {
    this._skyColor.set(color);

    _index.Color.toArray(this._colorArray, this._skyColor);

    _memoryPools.AmbientPool.setVec4(this._handle, _memoryPools.AmbientView.SKY_COLOR, this._skyColor);
  }
  /**
   * @en Sky illuminance
   * @zh 天空亮度
   */


  get skyIllum() {
    return _memoryPools.AmbientPool.get(this._handle, _memoryPools.AmbientView.ILLUM);
  }

  set skyIllum(illum) {
    _memoryPools.AmbientPool.set(this._handle, _memoryPools.AmbientView.ILLUM, illum);
  }
  /**
   * @en Ground color
   * @zh 地面颜色
   */


  get groundAlbedo() {
    return this._groundAlbedo;
  }

  set groundAlbedo(color) {
    this._groundAlbedo.set(color);

    _index.Vec3.toArray(this._albedoArray, this._groundAlbedo);

    _memoryPools.AmbientPool.setVec4(this._handle, _memoryPools.AmbientView.GROUND_ALBEDO, this._groundAlbedo);
  }

  get handle() {
    return this._handle;
  }

  constructor() {
    this._skyColor = new _index.Color(51, 128, 204, 1.0);
    this._groundAlbedo = new _index.Color(51, 51, 51, 255);
    this._albedoArray = Float32Array.from([0.2, 0.2, 0.2, 1.0]);
    this._colorArray = Float32Array.from([0.2, 0.5, 0.8, 1.0]);
    this._handle = _memoryPools.NULL_HANDLE;
    this._handle = _memoryPools.AmbientPool.alloc();
  }

  initialize(ambientInfo) {
    this._skyColor.set(ambientInfo.skyColor);

    this._groundAlbedo.set(ambientInfo.groundAlbedo);

    _index.Color.toArray(this._colorArray, this._skyColor);

    _index.Vec3.toArray(this._albedoArray, this._groundAlbedo);

    _memoryPools.AmbientPool.setVec4(this._handle, _memoryPools.AmbientView.SKY_COLOR, this._skyColor);

    _memoryPools.AmbientPool.setVec4(this._handle, _memoryPools.AmbientView.GROUND_ALBEDO, this._groundAlbedo);

    _memoryPools.AmbientPool.set(this._handle, _memoryPools.AmbientView.ILLUM, ambientInfo.skyIllum);
  }

  destroy() {
    if (this._handle) {
      _memoryPools.AmbientPool.free(this._handle);

      this._handle = _memoryPools.NULL_HANDLE;
    }
  }

}

exports.Ambient = Ambient;
Ambient.SUN_ILLUM = 65000.0;
Ambient.SKY_ILLUM = 20000.0;
_globalExports.legacyCC.Ambient = Ambient;