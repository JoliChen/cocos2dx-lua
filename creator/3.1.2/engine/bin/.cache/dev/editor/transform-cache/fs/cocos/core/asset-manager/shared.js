"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuiltinBundleName = exports.presets = exports.RequestType = exports.references = exports.transformPipeline = exports.fetchPipeline = exports.pipeline = exports.bundles = exports.parsed = exports.files = exports.assets = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _pipeline = require("./pipeline.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.

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
const assets = new _cache.default();
exports.assets = assets;
const files = new _cache.default();
exports.files = files;
const parsed = new _cache.default();
exports.parsed = parsed;
const bundles = new _cache.default();
exports.bundles = bundles;
const pipeline = new _pipeline.Pipeline('normal load', []);
exports.pipeline = pipeline;
const fetchPipeline = new _pipeline.Pipeline('fetch', []);
exports.fetchPipeline = fetchPipeline;
const transformPipeline = new _pipeline.Pipeline('transform url', []);
exports.transformPipeline = transformPipeline;
const references = _internal253Aconstants.EDITOR ? new _cache.default() : null;
exports.references = references;
let RequestType;
exports.RequestType = RequestType;

(function (RequestType) {
  RequestType["UUID"] = "uuid";
  RequestType["PATH"] = "path";
  RequestType["DIR"] = "dir";
  RequestType["URL"] = "url";
  RequestType["SCENE"] = "scene";
})(RequestType || (exports.RequestType = RequestType = {}));

const presets = {
  default: {
    priority: 0
  },
  preload: {
    maxConcurrency: 6,
    maxRequestsPerFrame: 2,
    priority: -1
  },
  scene: {
    maxConcurrency: 20,
    maxRequestsPerFrame: 20,
    priority: 1
  },
  bundle: {
    maxConcurrency: 20,
    maxRequestsPerFrame: 20,
    priority: 2
  },
  remote: {
    maxRetryCount: 4
  }
};
/**
 * @en
 * The builtin bundles
 *
 * @zh
 * 内置 bundle
 *
 */

exports.presets = presets;
let BuiltinBundleName;
exports.BuiltinBundleName = BuiltinBundleName;

(function (BuiltinBundleName) {
  BuiltinBundleName["RESOURCES"] = "resources";
  BuiltinBundleName["MAIN"] = "main";
  BuiltinBundleName["START_SCENE"] = "start-scene";
})(BuiltinBundleName || (exports.BuiltinBundleName = BuiltinBundleName = {}));