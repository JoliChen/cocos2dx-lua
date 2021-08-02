"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORT_JIT = exports.VIVO = exports.OPPO = exports.HUAWEI = exports.COCOSPLAY = exports.BAIDU = exports.BYTEDANCE = exports.XIAOMI = exports.ALIPAY = exports.RUNTIME_BASED = exports.MINIGAME = exports.WECHAT = exports.HTML5 = exports.JSB = exports.DEBUG = exports.DEV = exports.PREVIEW = exports.EDITOR = exports.TEST = exports.BUILD = exports.EXPORT_TO_GLOBAL = void 0;

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
const _global = typeof window === 'undefined' ? global : window;

function defined(name) {
  return typeof _global[name] === 'object';
}

function tryDefineGlobal(name, value) {
  if (typeof _global[name] === 'undefined') {
    return _global[name] = value;
  } else {
    return _global[name];
  }
} // No export to global required since we have already done here.


const EXPORT_TO_GLOBAL = false;
exports.EXPORT_TO_GLOBAL = EXPORT_TO_GLOBAL;
const BUILD = tryDefineGlobal('CC_BUILD', false);
exports.BUILD = BUILD;
const TEST = tryDefineGlobal('CC_TEST', defined('tap') || defined('QUnit'));
exports.TEST = TEST;
const EDITOR = tryDefineGlobal('CC_EDITOR', defined('Editor') && defined('process') && 'electron' in process.versions);
exports.EDITOR = EDITOR;
const PREVIEW = tryDefineGlobal('CC_PREVIEW', !EDITOR);
exports.PREVIEW = PREVIEW;
const DEV = tryDefineGlobal('CC_DEV', true); // (CC_EDITOR && !CC_BUILD) || CC_PREVIEW || CC_TEST

exports.DEV = DEV;
const DEBUG = tryDefineGlobal('CC_DEBUG', true); // CC_DEV || Debug Build

exports.DEBUG = DEBUG;
const JSB = tryDefineGlobal('CC_JSB', defined('jsb'));
exports.JSB = JSB;
const HTML5 = false; // @ts-expect-error

exports.HTML5 = HTML5;
const WECHAT = tryDefineGlobal('CC_WECHAT', !!(defined('wx') && (wx.getSystemInfoSync || wx.getSharedCanvas)));
exports.WECHAT = WECHAT;
const MINIGAME = tryDefineGlobal('CC_MINIGAME', false);
exports.MINIGAME = MINIGAME;
const RUNTIME_BASED = tryDefineGlobal('CC_RUNTIME_BASED', false);
exports.RUNTIME_BASED = RUNTIME_BASED;
const ALIPAY = tryDefineGlobal('CC_ALIPAY', false);
exports.ALIPAY = ALIPAY;
const XIAOMI = tryDefineGlobal('CC_XIAOMI', false);
exports.XIAOMI = XIAOMI;
const BYTEDANCE = tryDefineGlobal('CC_BYTEDANCE', false);
exports.BYTEDANCE = BYTEDANCE;
const BAIDU = tryDefineGlobal('CC_BAIDU', false);
exports.BAIDU = BAIDU;
const COCOSPLAY = tryDefineGlobal('CC_COCOSPLAY', false);
exports.COCOSPLAY = COCOSPLAY;
const HUAWEI = tryDefineGlobal('CC_HUAWEI', false);
exports.HUAWEI = HUAWEI;
const OPPO = tryDefineGlobal('CC_OPPO', false);
exports.OPPO = OPPO;
const VIVO = tryDefineGlobal('CC_VIVO', false); // @ts-expect-error

exports.VIVO = VIVO;
const SUPPORT_JIT = tryDefineGlobal('CC_SUPPORT_JIT', 'function' === typeof loadRuntime);
exports.SUPPORT_JIT = SUPPORT_JIT;