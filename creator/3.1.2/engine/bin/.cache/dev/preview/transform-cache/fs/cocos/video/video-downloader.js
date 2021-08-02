System.register("q-bundled:///fs/cocos/video/video-downloader.js", ["../core/asset-manager/downloader.js", "../core/asset-manager/factory.js", "../core/platform/debug.js", "./assets/video-clip.js"], function (_export, _context) {
  "use strict";

  var downloader, factory, log, VideoClip;

  /*
   Copyright (c) 2013-2016 Chukong Technologies Inc.
   Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
  
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
   * @module asset-manager
   */
  // eslint-disable-next-line consistent-return
  function downloadVideo(url, options, onComplete) {
    var video = document.createElement('video');
    var source = document.createElement('source');
    video.appendChild(source);
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'blob';

    req.onload = function onload() {
      if (this.status === 200 || this.status === 0) {
        source.src = URL.createObjectURL(this.response);
        onComplete(null, video);
      } else {
        onComplete(new Error(req.status + "(no response)"));
      }
    };

    req.onerror = function onerror() {
      var message = "load video failure - " + url;
      log(message);
      onComplete(new Error(message));
    };

    req.send();
  }

  function createVideoClip(id, data, options, onComplete) {
    var out = new VideoClip();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  _export("downloadVideo", downloadVideo);

  return {
    setters: [function (_coreAssetManagerDownloaderJs) {
      downloader = _coreAssetManagerDownloaderJs.default;
    }, function (_coreAssetManagerFactoryJs) {
      factory = _coreAssetManagerFactoryJs.default;
    }, function (_corePlatformDebugJs) {
      log = _corePlatformDebugJs.log;
    }, function (_assetsVideoClipJs) {
      VideoClip = _assetsVideoClipJs.VideoClip;
    }],
    execute: function () {
      downloader.register({
        // Video
        '.mp4': downloadVideo,
        '.avi': downloadVideo,
        '.mov': downloadVideo,
        '.mpg': downloadVideo,
        '.mpeg': downloadVideo,
        '.rm': downloadVideo,
        '.rmvb': downloadVideo
      });
      factory.register({
        // Video
        '.mp4': createVideoClip,
        '.avi': createVideoClip,
        '.mov': createVideoClip,
        '.mpg': createVideoClip,
        '.mpeg': createVideoClip,
        '.rm': createVideoClip,
        '.rmvb': createVideoClip
      });
    }
  };
});