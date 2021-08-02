"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = void 0;

var _index = require("../../core/index.js");

var _globalExports = require("../../core/global-exports.js");

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
 * @hidden
 */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable @typescript-eslint/restrict-template-expressions */
function select(id, wrapper) {
  _globalExports.legacyCC._global.CC_PHYSICS_BUILTIN = id === 'builtin';
  _globalExports.legacyCC._global.CC_PHYSICS_CANNON = id === 'cannon.js';
  _globalExports.legacyCC._global.CC_PHYSICS_AMMO = id === 'ammo.js';
  (0, _index.warn)(`[PHYSICS]: Using ${id}`);
  selector.id = id;
  selector.wrapper = wrapper;
  if (id != null) selector.backend[id] = wrapper;
}

const selector = {
  id: '',
  select,
  wrapper: {},
  backend: {}
};
exports.selector = selector;