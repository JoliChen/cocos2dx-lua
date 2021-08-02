"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLCommandAllocator = exports.WebGLCommandPool = void 0;

var _cachedArray = require("../../memop/cached-array.js");

var _webglCommands = require("./webgl-commands.js");

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
class WebGLCommandPool {
  constructor(Clazz, count) {
    this._frees = void 0;
    this._freeIdx = 0;
    this._freeCmds = void 0;
    this._frees = new Array(count);
    this._freeCmds = new _cachedArray.CachedArray(count);

    for (let i = 0; i < count; ++i) {
      this._frees[i] = new Clazz();
    }

    this._freeIdx = count - 1;
  }
  /*
  public alloc (clazz: new() => T): T {
      return new clazz();
  }
  */


  alloc(Clazz) {
    if (this._freeIdx < 0) {
      const size = this._frees.length * 2;
      const temp = this._frees;
      this._frees = new Array(size);
      const increase = size - temp.length;

      for (let i = 0; i < increase; ++i) {
        this._frees[i] = new Clazz();
      }

      for (let i = increase, j = 0; i < size; ++i, ++j) {
        this._frees[i] = temp[j];
      }

      this._freeIdx += increase;
    }

    const cmd = this._frees[this._freeIdx];
    this._frees[this._freeIdx--] = null;
    ++cmd.refCount;
    return cmd;
  }

  free(cmd) {
    if (--cmd.refCount === 0) {
      this._freeCmds.push(cmd);
    }
  }

  freeCmds(cmds) {
    // return ;
    for (let i = 0; i < cmds.length; ++i) {
      if (--cmds.array[i].refCount === 0) {
        this._freeCmds.push(cmds.array[i]);
      }
    }
  }

  release() {
    for (let i = 0; i < this._freeCmds.length; ++i) {
      const cmd = this._freeCmds.array[i];
      cmd.clear();
      this._frees[++this._freeIdx] = cmd;
    }

    this._freeCmds.clear();
  }

}

exports.WebGLCommandPool = WebGLCommandPool;

class WebGLCommandAllocator {
  constructor() {
    this.beginRenderPassCmdPool = void 0;
    this.bindStatesCmdPool = void 0;
    this.drawCmdPool = void 0;
    this.updateBufferCmdPool = void 0;
    this.copyBufferToTextureCmdPool = void 0;
    this.beginRenderPassCmdPool = new WebGLCommandPool(_webglCommands.WebGLCmdBeginRenderPass, 1);
    this.bindStatesCmdPool = new WebGLCommandPool(_webglCommands.WebGLCmdBindStates, 1);
    this.drawCmdPool = new WebGLCommandPool(_webglCommands.WebGLCmdDraw, 1);
    this.updateBufferCmdPool = new WebGLCommandPool(_webglCommands.WebGLCmdUpdateBuffer, 1);
    this.copyBufferToTextureCmdPool = new WebGLCommandPool(_webglCommands.WebGLCmdCopyBufferToTexture, 1);
  }

  clearCmds(cmdPackage) {
    if (cmdPackage.beginRenderPassCmds.length) {
      this.beginRenderPassCmdPool.freeCmds(cmdPackage.beginRenderPassCmds);
      cmdPackage.beginRenderPassCmds.clear();
    }

    if (cmdPackage.bindStatesCmds.length) {
      this.bindStatesCmdPool.freeCmds(cmdPackage.bindStatesCmds);
      cmdPackage.bindStatesCmds.clear();
    }

    if (cmdPackage.drawCmds.length) {
      this.drawCmdPool.freeCmds(cmdPackage.drawCmds);
      cmdPackage.drawCmds.clear();
    }

    if (cmdPackage.updateBufferCmds.length) {
      this.updateBufferCmdPool.freeCmds(cmdPackage.updateBufferCmds);
      cmdPackage.updateBufferCmds.clear();
    }

    if (cmdPackage.copyBufferToTextureCmds.length) {
      this.copyBufferToTextureCmdPool.freeCmds(cmdPackage.copyBufferToTextureCmds);
      cmdPackage.copyBufferToTextureCmds.clear();
    }

    cmdPackage.cmds.clear();
  }

  releaseCmds() {
    this.beginRenderPassCmdPool.release();
    this.bindStatesCmdPool.release();
    this.drawCmdPool.release();
    this.updateBufferCmdPool.release();
    this.copyBufferToTextureCmdPool.release();
  }

}

exports.WebGLCommandAllocator = WebGLCommandAllocator;