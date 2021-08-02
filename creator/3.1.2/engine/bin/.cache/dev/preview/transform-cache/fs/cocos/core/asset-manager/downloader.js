System.register("q-bundled:///fs/cocos/core/asset-manager/downloader.js", ["../../../../virtual/internal%253Aconstants.js", "../platform/sys.js", "../utils/index.js", "../utils/misc.js", "../utils/path.js", "./cache.js", "./download-dom-image.js", "./download-file.js", "./download-script.js", "./shared.js", "./utilities.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var BUILD, EDITOR, sys, js, callInNextTick, basename, Cache, downloadDomImage, downloadFile, downloadScript, files, retry, urlAppendTimestamp, legacyCC, REGEX, downloadImage, downloadBlob, downloadJson, downloadArrayBuffer, downloadText, downloadBundle, Downloader, downloader;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      BUILD = _virtualInternal253AconstantsJs.BUILD;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_utilsIndexJs) {
      js = _utilsIndexJs.js;
    }, function (_utilsMiscJs) {
      callInNextTick = _utilsMiscJs.callInNextTick;
    }, function (_utilsPathJs) {
      basename = _utilsPathJs.basename;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_downloadDomImageJs) {
      downloadDomImage = _downloadDomImageJs.default;
    }, function (_downloadFileJs) {
      downloadFile = _downloadFileJs.default;
    }, function (_downloadScriptJs) {
      downloadScript = _downloadScriptJs.default;
    }, function (_sharedJs) {
      files = _sharedJs.files;
    }, function (_utilitiesJs) {
      retry = _utilitiesJs.retry;
      urlAppendTimestamp = _utilitiesJs.urlAppendTimestamp;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      REGEX = /^(?:\w+:\/\/|\.+\/).+/;

      downloadImage = function downloadImage(url, options, onComplete) {
        // if createImageBitmap is valid, we can transform blob to ImageBitmap. Otherwise, just use HTMLImageElement to load
        var func = sys.capabilities.imageBitmap && legacyCC.assetManager.allowImageBitmap ? downloadBlob : downloadDomImage;
        func(url, options, onComplete);
      };

      downloadBlob = function downloadBlob(url, options, onComplete) {
        options.xhrResponseType = 'blob';
        downloadFile(url, options, options.onFileProgress, onComplete);
      };

      downloadJson = function downloadJson(url, options, onComplete) {
        options.xhrResponseType = 'json';
        downloadFile(url, options, options.onFileProgress, onComplete);
      };

      downloadArrayBuffer = function downloadArrayBuffer(url, options, onComplete) {
        options.xhrResponseType = 'arraybuffer';
        downloadFile(url, options, options.onFileProgress, onComplete);
      };

      downloadText = function downloadText(url, options, onComplete) {
        options.xhrResponseType = 'text';
        downloadFile(url, options, options.onFileProgress, onComplete);
      };

      downloadBundle = function downloadBundle(nameOrUrl, options, onComplete) {
        var bundleName = basename(nameOrUrl);
        var url = nameOrUrl;

        if (!REGEX.test(url)) {
          if (downloader.remoteBundles.indexOf(bundleName) !== -1) {
            url = downloader.remoteServerAddress + "remote/" + bundleName;
          } else {
            url = "assets/" + bundleName;
          }
        }

        var version = options.version || downloader.bundleVers[bundleName];
        var count = 0;
        var config = url + "/config." + (version ? version + "." : '') + "json";
        var out = null;
        var error = null;
        downloadJson(config, options, function (err, response) {
          error = err;
          out = response;

          if (out) {
            out.base = url + "/";
          }

          if (++count === 2) {
            onComplete(error, out);
          }
        });
        var jspath = url + "/index." + (version ? version + "." : '') + "js";
        downloadScript(jspath, options, function (err) {
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


      _export("Downloader", Downloader = /*#__PURE__*/function () {
        function Downloader() {
          this.maxConcurrency = 6;
          this.maxRequestsPerFrame = 6;
          this.maxRetryCount = BUILD ? 3 : 0;
          this.appendTimeStamp = !!EDITOR;
          this.limited = !EDITOR;
          this.retryInterval = 2000;
          this.bundleVers = null;
          this.remoteBundles = [];
          this.downloadDomImage = downloadDomImage;
          this.downloadDomAudio = null;
          this.downloadFile = downloadFile;
          this.downloadScript = downloadScript;
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
            '.js': downloadScript,
            bundle: downloadBundle,
            "default": downloadText
          };
          this._downloading = new Cache();
          this._queue = [];
          this._queueDirty = false;
          this._totalNum = 0;
          this._totalNumThisPeriod = 0;
          this._lastDate = -1;
          this._checkNextPeriod = false;
          this._remoteServerAddress = '';
          this._maxInterval = 1 / 30;
        }

        var _proto = Downloader.prototype;

        _proto.init = function init(remoteServerAddress, bundleVers, remoteBundles) {
          if (remoteServerAddress === void 0) {
            remoteServerAddress = '';
          }

          if (bundleVers === void 0) {
            bundleVers = {};
          }

          if (remoteBundles === void 0) {
            remoteBundles = [];
          }

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
        ;

        _proto.register = function register(type, handler) {
          if (typeof type === 'object') {
            js.mixin(this._downloaders, type);
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
        ;

        _proto.download = function download(id, url, type, options, onComplete) {
          var _this = this;

          // if it is downloaded, don't download again
          var file = files.get(id);

          if (file) {
            onComplete(null, file);
            return;
          }

          var downloadCallbacks = this._downloading.get(id);

          if (downloadCallbacks) {
            downloadCallbacks.push(onComplete);

            var request = this._queue.find(function (x) {
              return x.id === id;
            });

            if (!request) {
              return;
            }

            var priority = options.priority || 0;

            if (request.priority < priority) {
              request.priority = priority;
              this._queueDirty = true;
            }

            return;
          } // if download fail, should retry


          var maxRetryCount = typeof options.maxRetryCount !== 'undefined' ? options.maxRetryCount : this.maxRetryCount;
          var maxConcurrency = typeof options.maxConcurrency !== 'undefined' ? options.maxConcurrency : this.maxConcurrency;
          var maxRequestsPerFrame = typeof options.maxRequestsPerFrame !== 'undefined' ? options.maxRequestsPerFrame : this.maxRequestsPerFrame;
          var handler = this._downloaders[type] || this._downloaders["default"];

          var process = function process(index, callback) {
            if (index === 0) {
              _this._downloading.add(id, [onComplete]);
            }

            if (!_this.limited) {
              handler(urlAppendTimestamp(url, _this.appendTimeStamp), options, callback);
              return;
            } // refresh


            _this._updateTime();

            var done = function done(err, data) {
              // when finish downloading, update _totalNum
              _this._totalNum--;

              _this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);

              callback(err, data);
            };

            if (_this._totalNum < maxConcurrency && _this._totalNumThisPeriod < maxRequestsPerFrame) {
              handler(urlAppendTimestamp(url, _this.appendTimeStamp), options, done);
              _this._totalNum++;
              _this._totalNumThisPeriod++;
            } else {
              // when number of request up to limitation, cache the rest
              _this._queue.push({
                id: id,
                priority: options.priority || 0,
                url: url,
                options: options,
                done: done,
                handler: handler
              });

              _this._queueDirty = true;

              if (_this._totalNum < maxConcurrency) {
                _this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);
              }
            }
          }; // when retry finished, invoke callbacks


          var finale = function finale(err, result) {
            if (!err) {
              files.add(id, result);
            }

            var callbacks = _this._downloading.remove(id);

            for (var i = 0, l = callbacks.length; i < l; i++) {
              callbacks[i](err, result);
            }
          };

          retry(process, maxRetryCount, this.retryInterval, finale);
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
        ;

        _proto.loadSubpackage = function loadSubpackage(name, completeCallback) {
          legacyCC.assetManager.loadBundle(name, null, completeCallback);
        };

        _proto._updateTime = function _updateTime() {
          var now = Date.now(); // use deltaTime as interval

          var deltaTime = legacyCC.director.getDeltaTime();
          var interval = deltaTime > this._maxInterval ? this._maxInterval : deltaTime;

          if (now - this._lastDate > interval * 1000) {
            this._totalNumThisPeriod = 0;
            this._lastDate = now;
          }
        } // handle the rest request in next period
        ;

        _proto._handleQueue = function _handleQueue(maxConcurrency, maxRequestsPerFrame) {
          this._checkNextPeriod = false;

          this._updateTime();

          while (this._queue.length > 0 && this._totalNum < maxConcurrency && this._totalNumThisPeriod < maxRequestsPerFrame) {
            if (this._queueDirty) {
              this._queue.sort(function (a, b) {
                return a.priority - b.priority;
              });

              this._queueDirty = false;
            }

            var request = this._queue.pop();

            if (!request) {
              break;
            }

            this._totalNum++;
            this._totalNumThisPeriod++;
            request.handler(urlAppendTimestamp(request.url, this.appendTimeStamp), request.options, request.done);
          }

          this._handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame);
        };

        _proto._handleQueueInNextFrame = function _handleQueueInNextFrame(maxConcurrency, maxRequestsPerFrame) {
          if (!this._checkNextPeriod && this._queue.length > 0) {
            callInNextTick(this._handleQueue.bind(this), maxConcurrency, maxRequestsPerFrame);
            this._checkNextPeriod = true;
          }
        };

        _createClass(Downloader, [{
          key: "remoteServerAddress",
          get:
          /**
           * @en
           * The address of remote server
           *
           * @zh
           * 远程服务器地址
           *
           */
          function get() {
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

        }]);

        return Downloader;
      }());

      downloader = new Downloader();

      _export("default", downloader);
    }
  };
});