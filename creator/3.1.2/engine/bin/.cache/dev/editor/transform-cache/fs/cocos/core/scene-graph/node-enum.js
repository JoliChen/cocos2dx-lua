"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformBit = exports.NodeSpace = void 0;

var _globalExports = require("../global-exports.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
 * @module scene-graph
 */

/**
 * @en Node's coordinate space
 * @zh 节点的坐标空间
 */
let NodeSpace;
/**
 * @en Bit masks for node's transformation
 * @zh 节点的空间变换位标记
 */

exports.NodeSpace = NodeSpace;

(function (NodeSpace) {
  NodeSpace[NodeSpace["LOCAL"] = 0] = "LOCAL";
  NodeSpace[NodeSpace["WORLD"] = 1] = "WORLD";
})(NodeSpace || (exports.NodeSpace = NodeSpace = {}));

let TransformBit;
exports.TransformBit = TransformBit;

(function (TransformBit) {
  TransformBit[TransformBit["NONE"] = 0] = "NONE";
  TransformBit[TransformBit["POSITION"] = 1] = "POSITION";
  TransformBit[TransformBit["ROTATION"] = 2] = "ROTATION";
  TransformBit[TransformBit["SCALE"] = 4] = "SCALE";
  TransformBit[TransformBit["RS"] = TransformBit.ROTATION | TransformBit.SCALE] = "RS";
  TransformBit[TransformBit["TRS"] = TransformBit.POSITION | TransformBit.ROTATION | TransformBit.SCALE] = "TRS";
  TransformBit[TransformBit["TRS_MASK"] = ~TransformBit.TRS] = "TRS_MASK";
})(TransformBit || (exports.TransformBit = TransformBit = {}));

_globalExports.legacyCC.internal.TransformBit = TransformBit;