"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = exports.WrapMode = exports.PixelFormat = void 0;

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
 * @module asset
 */
// define a specified number for the pixel format which gfx do not have a standard definition.
let CUSTOM_PIXEL_FORMAT = 1024;
/**
 * @en
 * The texture pixel format, default value is RGBA8888,<br>
 * you should note that textures loaded by normal image files (png, jpg) can only support RGBA8888 format,<br>
 * other formats are supported by compressed file types or raw data.
 * @zh
 * 纹理像素格式，默认值为RGBA8888，<br>
 * 你应该注意到普通图像文件（png，jpg）加载的纹理只能支持RGBA8888格式，<br>
 * 压缩文件类型或原始数据支持其他格式。
 */

let PixelFormat;
/**
 * @en
 * The texture wrap mode.
 * @zh
 * 纹理环绕方式。
 */

exports.PixelFormat = PixelFormat;

(function (PixelFormat) {
  PixelFormat[PixelFormat["RGB565"] = _index.Format.R5G6B5] = "RGB565";
  PixelFormat[PixelFormat["RGB5A1"] = _index.Format.RGB5A1] = "RGB5A1";
  PixelFormat[PixelFormat["RGBA4444"] = _index.Format.RGBA4] = "RGBA4444";
  PixelFormat[PixelFormat["RGB888"] = _index.Format.RGB8] = "RGB888";
  PixelFormat[PixelFormat["RGB32F"] = _index.Format.RGB32F] = "RGB32F";
  PixelFormat[PixelFormat["RGBA8888"] = _index.Format.RGBA8] = "RGBA8888";
  PixelFormat[PixelFormat["RGBA32F"] = _index.Format.RGBA32F] = "RGBA32F";
  PixelFormat[PixelFormat["A8"] = _index.Format.A8] = "A8";
  PixelFormat[PixelFormat["I8"] = _index.Format.L8] = "I8";
  PixelFormat[PixelFormat["AI8"] = _index.Format.LA8] = "AI8";
  PixelFormat[PixelFormat["RGB_PVRTC_2BPPV1"] = _index.Format.PVRTC_RGB2] = "RGB_PVRTC_2BPPV1";
  PixelFormat[PixelFormat["RGBA_PVRTC_2BPPV1"] = _index.Format.PVRTC_RGBA2] = "RGBA_PVRTC_2BPPV1";
  PixelFormat[PixelFormat["RGB_A_PVRTC_2BPPV1"] = CUSTOM_PIXEL_FORMAT++] = "RGB_A_PVRTC_2BPPV1";
  PixelFormat[PixelFormat["RGB_PVRTC_4BPPV1"] = _index.Format.PVRTC_RGB4] = "RGB_PVRTC_4BPPV1";
  PixelFormat[PixelFormat["RGBA_PVRTC_4BPPV1"] = _index.Format.PVRTC_RGBA4] = "RGBA_PVRTC_4BPPV1";
  PixelFormat[PixelFormat["RGB_A_PVRTC_4BPPV1"] = CUSTOM_PIXEL_FORMAT++] = "RGB_A_PVRTC_4BPPV1";
  PixelFormat[PixelFormat["RGB_ETC1"] = _index.Format.ETC_RGB8] = "RGB_ETC1";
  PixelFormat[PixelFormat["RGBA_ETC1"] = CUSTOM_PIXEL_FORMAT++] = "RGBA_ETC1";
  PixelFormat[PixelFormat["RGB_ETC2"] = _index.Format.ETC2_RGB8] = "RGB_ETC2";
  PixelFormat[PixelFormat["RGBA_ETC2"] = _index.Format.ETC2_RGBA8] = "RGBA_ETC2";
  PixelFormat[PixelFormat["RGBA_ASTC_4x4"] = _index.Format.ASTC_RGBA_4x4] = "RGBA_ASTC_4x4";
  PixelFormat[PixelFormat["RGBA_ASTC_5x4"] = _index.Format.ASTC_RGBA_5x4] = "RGBA_ASTC_5x4";
  PixelFormat[PixelFormat["RGBA_ASTC_5x5"] = _index.Format.ASTC_RGBA_5x5] = "RGBA_ASTC_5x5";
  PixelFormat[PixelFormat["RGBA_ASTC_6x5"] = _index.Format.ASTC_RGBA_6x5] = "RGBA_ASTC_6x5";
  PixelFormat[PixelFormat["RGBA_ASTC_6x6"] = _index.Format.ASTC_RGBA_6x6] = "RGBA_ASTC_6x6";
  PixelFormat[PixelFormat["RGBA_ASTC_8x5"] = _index.Format.ASTC_RGBA_8x5] = "RGBA_ASTC_8x5";
  PixelFormat[PixelFormat["RGBA_ASTC_8x6"] = _index.Format.ASTC_RGBA_8x6] = "RGBA_ASTC_8x6";
  PixelFormat[PixelFormat["RGBA_ASTC_8x8"] = _index.Format.ASTC_RGBA_8x8] = "RGBA_ASTC_8x8";
  PixelFormat[PixelFormat["RGBA_ASTC_10x5"] = _index.Format.ASTC_RGBA_10x5] = "RGBA_ASTC_10x5";
  PixelFormat[PixelFormat["RGBA_ASTC_10x6"] = _index.Format.ASTC_RGBA_10x6] = "RGBA_ASTC_10x6";
  PixelFormat[PixelFormat["RGBA_ASTC_10x8"] = _index.Format.ASTC_RGBA_10x8] = "RGBA_ASTC_10x8";
  PixelFormat[PixelFormat["RGBA_ASTC_10x10"] = _index.Format.ASTC_RGBA_10x10] = "RGBA_ASTC_10x10";
  PixelFormat[PixelFormat["RGBA_ASTC_12x10"] = _index.Format.ASTC_RGBA_12x10] = "RGBA_ASTC_12x10";
  PixelFormat[PixelFormat["RGBA_ASTC_12x12"] = _index.Format.ASTC_RGBA_12x12] = "RGBA_ASTC_12x12";
})(PixelFormat || (exports.PixelFormat = PixelFormat = {}));

let WrapMode;
/**
 * @en
 * The texture filter mode
 * @zh
 * 纹理过滤模式。
 */

exports.WrapMode = WrapMode;

(function (WrapMode) {
  WrapMode[WrapMode["REPEAT"] = _index.Address.WRAP] = "REPEAT";
  WrapMode[WrapMode["CLAMP_TO_EDGE"] = _index.Address.CLAMP] = "CLAMP_TO_EDGE";
  WrapMode[WrapMode["MIRRORED_REPEAT"] = _index.Address.MIRROR] = "MIRRORED_REPEAT";
  WrapMode[WrapMode["CLAMP_TO_BORDER"] = _index.Address.BORDER] = "CLAMP_TO_BORDER";
})(WrapMode || (exports.WrapMode = WrapMode = {}));

let Filter;
exports.Filter = Filter;

(function (Filter) {
  Filter[Filter["NONE"] = _index.Filter.NONE] = "NONE";
  Filter[Filter["LINEAR"] = _index.Filter.LINEAR] = "LINEAR";
  Filter[Filter["NEAREST"] = _index.Filter.POINT] = "NEAREST";
})(Filter || (exports.Filter = Filter = {}));