"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Downloader = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _sys = require("../platform/sys.js");

var _index = require("../utils/index.js");

var _misc = require("../utils/misc.js");

var _path = require("../utils/path.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _downloadDomImage = _interopRequireDefault(require("./download-dom-image.js"));

var _downloadFile = _interopRequireDefault(require("./download-file.js"));

var _downloadScript = _interopRequireDefault(require("./download-script.js"));

var _shared = require("./shared.js");

var _utilities = require("./utilities.js");

var _globalExports = require("../global-exports.js");

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
 * @module asset-manager
 */
const REGEX = /^(?:\w+:\/\/|\.+\/).+/;

const downloadImage = (url, options, onComplete) => {
  // if createImageBitmap is valid, we can transform blob to ImageBitmap. Otherwise, just use HTMLImageElement to load
  const func = _sys.sys.capabilities.imageBitmap && _globalExports.legacyCC.assetManager.allowImageBitmap ? downloadBlob : _downloadDomImage.default;
  func(url, options, onComplete);
};

const downloadBlob = (url, options, onComplete) => {
  options.xhrResponseType = 'blob';
  (0, _downloadFile.default)(url, options, options.onFileProgress, onComplete);
};

const downloadJson = (url, options, onComplete) => {
  options.xhrResponseType = 'json';
  (0, _downloadFile.default)(url, options, options.onFileProgress, onComplete);
};

const downloadArrayBuffer = (url, options, onComplete) => {
  options.xhrResponseType = 'arraybuffer';
  (0, _downloadFile.default)(url, options, options.onFileProgress, onComplete);
};

const downloadText = (url, options, onComplete) => {
  options.xhrResponseType = 'text';
  (0, _downloadFile.default)(url, options, options.onFileProgress, onComplete);
};

const downloadBundle = (nameOrUrl, options, onComplete) => {
  const bundleName = (0, _path.basename)(nameOrUrl);
  let url = nameOrUrl;

  if (!REGEX.test(url)) {
    if (downloader.remoteBundles.indexOf(bundleName) !== -1) {
      url = `${downloader.remoteServerAddress}remote/${bundleName}`;
    } else {
      url = `assets/${bundleName}`;
    }
  }

  const version = options.version || downloader.bundleVers[bundleName];
  let count = 0;
  const config = `${url}/config.${version ? `${version}.` : ''}json`;
  let out = null;
  let error = null;
  downloadJson(config, options, (err, response) => {
    error = err;
    out = response;

    if (out) {
      out.base = `${url}/`;
    }

    if (++count === 2) {
      onComplete(error, out);
    }
  });
  const jspath = `${url}/index.${version ? `${version}.` : ''}js`;
  (0, _downloadScript.default)(jspath, options, err => {
    error = err;

    if (++count === 2) {
      onComplete(err, out);
    }
  });
};
/**
 * @en
 * Control all download process, it is a singleton. All member can be accessed with `cc.assetManager.downloader` , it can download several types of files:
 * 1. Text
 * 2. Image
 * 3. Audio
 * 4. Assets
 * 5. Scripts
 *
 * @zh
 * 管理所有下载过程，downloader 是个单例，所有成员能通过 `cc.assetManager.downloader` 访问，它能下载以下几种类型的文件：
 * 1. 文本
 * 2. 图片
 * 3. 音频
 * 4. 资源
 * 5. 脚本
 *
 */


class Downloader {
  constructor() {
    this.maxConcurrency = 6;
    this.maxRequestsPerFrame = 6;
    this.maxRetryCount = _internal253Aconstants.BUILD ? 3 : 0;
    this.appendTimeStamp = !!_internal253Aconstants.EDITOR;
    this.limited = !_internal253Aconstants.EDITOR;
    this.retryInterval = 2000;
    this.bundleVers = null;
    this.remoteBundles = [];
    this.downloadDomImage = _downloadDomImage.default;
    this.downloadDomAudio = null;
    this.downloadFile = _downloadFile.default;
    this.downloadScript = _downloadScript.default;
    this._downloaders = {
      // Images
      '.png': downloadImage,
      '.jpg': downloadImage,
      '.bmp': downloadImage,
      '.jpeg': downloadImage,
      '.gif': downloadImage,
      '.ico': downloadImage,
      '.tiff': downloadImage,
      '.webp': downloadImage,
      '.image': downloadImage,
      '.pvr': downloadArrayBuffer,
      '.pkm': downloadArrayBuffer,
      '.astc': downloadArrayBuffer,
      // Txt
      '.txt': downloadText,
      '.xml': downloadText,
      '.vsh': downloadText,
      '.fsh': downloadText,
      '.atlas': downloadText,
      '.tmx': downloadText,
      '.tsx': downloadText,
      '.json': downloadJson,
      '.ExportJson': downloadJson,
      '.plist': downloadText,
      '.fnt': downloadText,
      // Binary
      '.binary': downloadArrayBuffer,
      '.bin': downloadArrayBuffer,
      '.dbbin': downloadArrayBuffer,
      '.skel': downloadArrayBuffer,
      '.js': _downloadScript.default,
      bundle: downloadBundle,
      default: downloadText
    };
    this._downloading = new _cache.default();
    this._queue = [];
    this._queueDirty = false;
    this._totalNum = 0;
    this._totalNumThisPeriod = 0;
    this._lastDate = -1;
    this._checkNextPeriod = false;
    this._remoteServerAddress = '';
    this._maxInterval = 1 / 30;
  }

  /**
   * @en
   * The address of remote server
   *
   * @zh
   * 远程服务器地址
   *
   */
  get remoteServerAddress() {
    return this._remoteServerAddress;
  }
  /**
   * @en
   * The max number of retries when fail
   *
   * @zh
   * 失败重试次数
   *
   * @property maxRetryCount
   * @type {Number}
   */


  init(remoteServerAddress = '', bundleVers = {}, remoteBundles = []) {
    this._downloading.clear();

    this._queue.length = 0;
    this._remoteServerAddress = remoteServerAddress;
    this.bundleVers = bundleVers;
    this.remoteBundles = remoteBundles;
  }
  /**
   * @en
   * Register custom handler if you want to change default behavior or extend downloader to download other format file
   *
   * @zh
   * 当你想修改默认行为或者拓展 downloader 来下载其他格式文件时可以注册自定义的 handler
   *
   * @param type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
   * @param handler - handler
   * @param handler.url - url
   * @param handler.options - some optional paramters will be transferred to handler.
   * @param handler.onComplete - callback when finishing downloading
   *
   * @example
   * downloader.register('.tga', (url, options, onComplete) => onComplete(null, null));
   * downloader.register({'.tga': (url, options, onComplete) => onComplete(null, null), '.ext': (url, options, onComplete) => onComplete(null, null)});
   *
   */


  register(type, handler) {
    if (typeof type === 'object') {
      _index.js.mixin(this._downloaders, type);
    } else {
      this._downloaders[type] = handler;
    }
  }
  /**
   * @en
   * Use corresponding handler to download file under limitation
   *
   * @zh
   * 在限制下使用对应的 handler 来下载文件
   *
   * @param id - The unique id of this download
   * @param url - The url should be downloaded
   * @param type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param options - some optional paramters will be transferred to the corresponding handler.
   * @param options.onFileProgress - progressive callback will be transferred to handler.
   * @param options.maxRetryCount - How many times should retry when download failed
   * @param options.maxConcurrency - The maximum number of concurrent when downloading
   * @param options.maxRequestsPerFrame - The maximum number of request can be launched per frame when downloading
   * @param options.priority - The priority of this url, default is 0, the greater number is higher priority.
   * @param onComplete - callback when finishing downloading
   * @param onComplete.err - The occurred error, null indicetes success
   * @param onComplete.contetnt - The downloaded file
   *
   * @example
   * download('http://example.com/test.tga', '.tga', {onFileProgress: (loaded, total) => console.lgo(loaded/total)}, onComplete: (err) => console.log(err));
   *
   */


  download(id, url, type, options, onComplete) {
    // if it is downloaded, don't download again
    const file = _shared.files.get(id);

    if (file) {
      onComplete(null, file);
      return;
    }

    const downloadCallbacks = this._downloading.get(id);

    if (downloadCallbacks) {
      downloadCallbacks.push(onComplete);

      const request = this._queue.find(x => x.id === id);

      if (!request) {
        return;
      }

      const priority = options.priority || 0;

      if (request.priority < priority) {
        request.priority = priority;
        this._queueDirty = true;
      }

      return;
    } // if download fail, should retry


    const maxRetryCount = typeof options.maxRetryCount !== 'undefined' ? options.maxRetryCount : this.maxRetryCount;
    const maxConcurrency = typeof options.maxConcurrency !== 'undefined' ? options.maxConcurrency : this.maxConcurrency;
    const maxRequestsPerFrame = typeof options.maxRequestsPerFrame !== 'undefined' ? options.maxRequestsPerFrame : this.maxRequestsPerFrame;
    const handler = this._downloaders[type] || this._downloaders.default;

    const process = (index, callback) => {
      if (index === 0) {
        this._downloading.add(id, [onComplete]);
      }

      if (!this.limited) {
        handler((0, _utilities.urlAppendTimestamp)(url, this.appendTimeStamp), options, callback);
        return;
      } // refresh


      this._updateTime();

      const done = (err, data) => {
        // when finish downloading, update _totalNum
        this._totalNum--;

        this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);

        callback(err, data);
      };

      if (this._totalNum < maxConcurrency && this._totalNumThisPeriod < maxRequestsPerFrame) {
        handler((0, _utilities.urlAppendTimestamp)(url, this.appendTimeStamp), options, done);
        this._totalNum++;
        this._totalNumThisPeriod++;
      } else {
        // when number of request up to limitation, cache the rest
        this._queue.push({
          id,
          priority: options.priority || 0,
          url,
          options,
          done,
          handler
        });

        this._queueDirty = true;

        if (this._totalNum < maxConcurrency) {
          this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);
        }
      }
    }; // when retry finished, invoke callbacks


    const finale = (err, result) => {
      if (!err) {
        _shared.files.add(id, result);
      }

      const callbacks = this._downloading.remove(id);

      for (let i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](err, result);
      }
    };

    (0, _utilities.retry)(process, maxRetryCount, this.retryInterval, finale);
  }
  /**
   * @en Load sub package with name.
   * @zh 通过子包名加载子包代码。
   * @param name - Sub package name
   * @param completeCallback -  Callback invoked when sub package loaded
   * @param {Error} completeCallback.error - error information
   *
   * @deprecated loader.downloader.loadSubpackage is deprecated, please use AssetManager.loadBundle instead
   */


  loadSubpackage(name, completeCallback) {
    _globalExports.legacyCC.assetManager.loadBundle(name, null, completeCallback);
  }

  _updateTime() {
    const now = Date.now(); // use deltaTime as interval

    const deltaTime = _globalExports.legacyCC.director.getDeltaTime();

    const interval = deltaTime > this._maxInterval ? this._maxInterval : deltaTime;

    if (now - this._lastDate > interval * 1000) {
      this._totalNumThisPeriod = 0;
      this._lastDate = now;
    }
  } // handle the rest request in next period


  _handleQueue(maxConcurrency, maxRequestsPerFrame) {
    this._checkNextPeriod = false;

    this._updateTime();

    while (this._queue.length > 0 && this._totalNum < maxConcurrency && this._totalNumThisPeriod < maxRequestsPerFrame) {
      if (this._queueDirty) {
        this._queue.sort((a, b) => a.priority - b.priority);

        this._queueDirty = false;
      }

      const request = this._queue.pop();

      if (!request) {
        break;
      }

      this._totalNum++;
      this._totalNumThisPeriod++;
      request.handler((0, _utilities.urlAppendTimestamp)(request.url, this.appendTimeStamp), request.options, request.done);
    }

    this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);
  }

  _handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame) {
    if (!this._checkNextPeriod && this._queue.length > 0) {
      (0, _misc.callInNextTick)(this._handleQueue.bind(this), maxConcurrency, maxRequestsPerFrame);
      this._checkNextPeriod = true;
    }
  }

}

exports.Downloader = Downloader;
const downloader = new Downloader();
var _default = downloader;
exports.default = _default;