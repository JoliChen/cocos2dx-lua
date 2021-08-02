"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGL2Queue = void 0;

var _queue = require("../base/queue.js");

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
class WebGL2Queue extends _queue.Queue {
  constructor(...args) {
    super(...args);
    this.numDrawCalls = 0;
    this.numInstances = 0;
    this.numTris = 0;
  }

  initialize(info) {
    this._type = info.type;
    return true;
  }

  destroy() {}

  submit(cmdBuffs) {
    // TODO: Async
    if (!this._isAsync) {
      for (let i = 0; i < cmdBuffs.length; i++) {
        const cmdBuff = cmdBuffs[i]; // WebGL2CmdFuncExecuteCmds(this._device as WebGL2Device, cmdBuff.cmdPackage); // opted out

        this.numDrawCalls += cmdBuff.numDrawCalls;
        this.numInstances += cmdBuff.numInstances;
        this.numTris += cmdBuff.numTris;
      }
    }
  }

  clear() {
    this.numDrawCalls = 0;
    this.numInstances = 0;
    this.numTris = 0;
  }

}

exports.WebGL2Queue = WebGL2Queue;