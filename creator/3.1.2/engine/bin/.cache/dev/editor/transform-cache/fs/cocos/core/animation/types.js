"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLerpable = isLerpable;
exports.WrappedInfo = exports.WrapMode = exports.WrapModeMask = void 0;

var _enum = require("../value-types/enum.js");

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
 * @module animation
 */
let WrapModeMask;
exports.WrapModeMask = WrapModeMask;

(function (WrapModeMask) {
  WrapModeMask[WrapModeMask["Default"] = 0] = "Default";
  WrapModeMask[WrapModeMask["Normal"] = 1] = "Normal";
  WrapModeMask[WrapModeMask["Loop"] = 2] = "Loop";
  WrapModeMask[WrapModeMask["ShouldWrap"] = 4] = "ShouldWrap";
  WrapModeMask[WrapModeMask["Clamp"] = 8] = "Clamp";
  WrapModeMask[WrapModeMask["PingPong"] = 22] = "PingPong";
  WrapModeMask[WrapModeMask["Reverse"] = 36] = "Reverse";
})(WrapModeMask || (exports.WrapModeMask = WrapModeMask = {}));

/**
 * 动画使用的循环模式。
 */
let WrapMode;
exports.WrapMode = WrapMode;

(function (WrapMode) {
  WrapMode[WrapMode["Default"] = WrapModeMask.Default] = "Default";
  WrapMode[WrapMode["Normal"] = WrapModeMask.Normal] = "Normal";
  WrapMode[WrapMode["Reverse"] = WrapModeMask.Reverse] = "Reverse";
  WrapMode[WrapMode["Loop"] = WrapModeMask.Loop] = "Loop";
  WrapMode[WrapMode["LoopReverse"] = WrapModeMask.Loop | WrapModeMask.Reverse] = "LoopReverse";
  WrapMode[WrapMode["PingPong"] = WrapModeMask.PingPong] = "PingPong";
  WrapMode[WrapMode["PingPongReverse"] = WrapModeMask.PingPong | WrapModeMask.Reverse] = "PingPongReverse";
})(WrapMode || (exports.WrapMode = WrapMode = {}));

(0, _enum.ccenum)(WrapMode);
/**
 * For internal
 */

class WrappedInfo {
  constructor(info) {
    this.ratio = 0;
    this.time = 0;
    this.direction = 1;
    this.stopped = true;
    this.iterations = 0;
    this.frameIndex = undefined;

    if (info) {
      this.set(info);
    }
  }

  set(info) {
    this.ratio = info.ratio;
    this.time = info.time;
    this.direction = info.direction;
    this.stopped = info.stopped;
    this.iterations = info.iterations;
    this.frameIndex = info.frameIndex;
  }

}

exports.WrappedInfo = WrappedInfo;

function isLerpable(object) {
  return typeof object.lerp === 'function';
}