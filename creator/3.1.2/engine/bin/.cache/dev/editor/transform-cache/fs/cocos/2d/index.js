"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CanvasPool: true,
  graphicsAssembler: true,
  labelAssembler: true,
  spriteAssembler: true,
  earcut: true,
  MeshBuffer: true,
  StencilManager: true
};
Object.defineProperty(exports, "CanvasPool", {
  enumerable: true,
  get: function () {
    return _index.CanvasPool;
  }
});
Object.defineProperty(exports, "graphicsAssembler", {
  enumerable: true,
  get: function () {
    return _index.graphicsAssembler;
  }
});
Object.defineProperty(exports, "labelAssembler", {
  enumerable: true,
  get: function () {
    return _index.labelAssembler;
  }
});
Object.defineProperty(exports, "spriteAssembler", {
  enumerable: true,
  get: function () {
    return _index.spriteAssembler;
  }
});
Object.defineProperty(exports, "earcut", {
  enumerable: true,
  get: function () {
    return _index.earcut;
  }
});
Object.defineProperty(exports, "MeshBuffer", {
  enumerable: true,
  get: function () {
    return _meshBuffer.MeshBuffer;
  }
});
Object.defineProperty(exports, "StencilManager", {
  enumerable: true,
  get: function () {
    return _stencilManager.StencilManager;
  }
});

var _index = require("./assembler/index.js");

var _meshBuffer = require("./renderer/mesh-buffer.js");

var _stencilManager = require("./renderer/stencil-manager.js");

var _globalExports = require("../core/global-exports.js");

require("./renderer/batcher-2d.js");

var _index2 = require("./assets/index.js");

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});

var _index3 = require("./framework/index.js");

Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index3[key];
    }
  });
});

var _index4 = require("./components/index.js");

Object.keys(_index4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index4[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index4[key];
    }
  });
});

var _base = require("./renderer/base.js");

Object.keys(_base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _base[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _base[key];
    }
  });
});

var _deprecated = require("./renderer/deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});

var _index5 = require("./utils/index.js");

Object.keys(_index5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index5[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index5[key];
    }
  });
});

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
_globalExports.legacyCC.UI = {
  MeshBuffer: _meshBuffer.MeshBuffer,
  // barFilled,
  // radialFilled,
  // simple,
  // sliced,
  // ttf,
  // bmfont,
  // letter,
  // mask,
  // maskEnd,
  // graphics,
  spriteAssembler: _index.spriteAssembler,
  graphicsAssembler: _index.graphicsAssembler,
  labelAssembler: _index.labelAssembler
};