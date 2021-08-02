"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AudioSource", {
  enumerable: true,
  get: function () {
    return _audioSource.AudioSource;
  }
});
Object.defineProperty(exports, "AudioSourceComponent", {
  enumerable: true,
  get: function () {
    return _audioSource.AudioSource;
  }
});
Object.defineProperty(exports, "AudioClip", {
  enumerable: true,
  get: function () {
    return _audioClip.AudioClip;
  }
});

require("./audio-downloader.js");

var _audioSource = require("./audio-source.js");

var _globalExports = require("../core/global-exports.js");

var _js = require("../core/utils/js.js");

require("./deprecated.js");

var _audioClip = require("./audio-clip.js");

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
_globalExports.legacyCC.AudioSourceComponent = _audioSource.AudioSource;

_js.js.setClassAlias(_audioSource.AudioSource, 'cc.AudioSourceComponent');