"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeUIProperties = void 0;

var _debug = require("../platform/debug.js");

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
 * @en Node's UI properties abstraction
 * @zh 节点上 UI 相关的属性抽象类
 */
class NodeUIProperties {
  /**
   * @en The UI transform component
   * @zh UI 变换组件
   */
  get uiTransformComp() {
    if (!this._uiTransformComp) {
      this._uiTransformComp = this._node.getComponent('cc.UITransform');
    }

    return this._uiTransformComp;
  }

  set uiTransformComp(value) {
    this._uiTransformComp = value;
  }
  /**
   * @en The base UI component
   * @zh UI 基类组件
   */


  get uiComp() {
    return this._uiComp;
  }

  set uiComp(comp) {
    if (this._uiComp && comp) {
      (0, _debug.warnID)(12002);
      return;
    }

    this._uiComp = comp;
  }

  constructor(node) {
    this._uiComp = null;
    this.opacity = 1;
    this.localOpacity = 1;
    this._uiTransformComp = null;
    this._node = void 0;
    this.uiTransformDirty = true;
    this._node = node;
  }

}

exports.NodeUIProperties = NodeUIProperties;