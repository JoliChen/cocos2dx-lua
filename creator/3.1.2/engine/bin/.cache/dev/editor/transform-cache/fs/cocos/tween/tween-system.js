"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenSystem = void 0;

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index = require("../core/index.js");

var _actionManager = require("./actions/action-manager.js");

var _globalExports = require("../core/global-exports.js");

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
 * @module tween
 */

/**
 * @en
 * Tween system.
 * @zh
 * 缓动系统。
 */
class TweenSystem extends _index.System {
  constructor(...args) {
    super(...args);
    this.actionMgr = new _actionManager.ActionManager();
  }

  /**
   * @en
   * Gets the action manager.
   * @zh
   * 获取动作管理器。
   */
  get ActionManager() {
    return this.actionMgr;
  }

  /**
   * @en
   * The update will auto execute after all compnents update.
   * @zh
   * 此方法会在组件 update 之后自动执行。
   * @param dt 间隔时间
   */
  update(dt) {
    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW || this._executeInEditMode) {
      this.actionMgr.update(dt);
    }
  }

}

exports.TweenSystem = TweenSystem;
TweenSystem.ID = 'TWEEN';
TweenSystem.instance = void 0;

_index.director.on(_index.Director.EVENT_INIT, () => {
  const sys = new TweenSystem();
  TweenSystem.instance = sys;

  _index.director.registerSystem(TweenSystem.ID, sys, 100);
});