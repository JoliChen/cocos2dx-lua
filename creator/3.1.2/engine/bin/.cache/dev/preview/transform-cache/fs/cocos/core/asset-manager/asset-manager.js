System.register("q-bundled:///fs/cocos/core/asset-manager/asset-manager.js", ["../../../../virtual/internal%253Aconstants.js", "../global-exports.js", "../platform/debug.js", "../platform/sys.js", "../utils/path.js", "./bundle.js", "./cache.js", "./depend-util.js", "./downloader.js", "./factory.js", "./fetch.js", "./helper.js", "./load.js", "./pack-manager.js", "./parser.js", "./pipeline.js", "./preprocess.js", "./release-manager.js", "./request-item.js", "./shared.js", "./task.js", "./url-transformer.js", "./utilities.js"], function (_export, _context) {
  "use strict";

  var BUILD, EDITOR, PREVIEW, legacyCC, error, sys, basename, extname, Bundle, Cache, dependUtil, downloader, factory, fetch, helper, load, packManager, parser, Pipeline, preprocess, releaseManager, RequestItem, presets, references, assets, BuiltinBundleName, bundles, fetchPipeline, files, parsed, pipeline, transformPipeline, Task, combine, parse, asyncify, parseParameters, AssetManager;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      BUILD = _virtualInternal253AconstantsJs.BUILD;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_utilsPathJs) {
      basename = _utilsPathJs.basename;
      extname = _utilsPathJs.extname;
    }, function (_bundleJs) {
      Bundle = _bundleJs.default;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_dependUtilJs) {
      dependUtil = _dependUtilJs.default;
    }, function (_downloaderJs) {
      downloader = _downloaderJs.default;
    }, function (_factoryJs) {
      factory = _factoryJs.default;
    }, function (_fetchJs) {
      fetch = _fetchJs.default;
    }, function (_helperJs) {
      helper = _helperJs;
    }, function (_loadJs) {
      load = _loadJs.default;
    }, function (_packManagerJs) {
      packManager = _packManagerJs.default;
    }, function (_parserJs) {
      parser = _parserJs.default;
    }, function (_pipelineJs) {
      Pipeline = _pipelineJs.Pipeline;
    }, function (_preprocessJs) {
      preprocess = _preprocessJs.default;
    }, function (_releaseManagerJs) {
      releaseManager = _releaseManagerJs.default;
    }, function (_requestItemJs) {
      RequestItem = _requestItemJs.default;
    }, function (_sharedJs) {
      presets = _sharedJs.presets;
      references = _sharedJs.references;
      assets = _sharedJs.assets;
      BuiltinBundleName = _sharedJs.BuiltinBundleName;
      bundles = _sharedJs.bundles;
      fetchPipeline = _sharedJs.fetchPipeline;
      files = _sharedJs.files;
      parsed = _sharedJs.parsed;
      pipeline = _sharedJs.pipeline;
      transformPipeline = _sharedJs.transformPipeline;
    }, function (_taskJs) {
      Task = _taskJs.default;
    }, function (_urlTransformerJs) {
      combine = _urlTransformerJs.combine;
      parse = _urlTransformerJs.parse;
    }, function (_utilitiesJs) {
      asyncify = _utilitiesJs.asyncify;
      parseParameters = _utilitiesJs.parseParameters;
    }],
    execute: function () {
      /**
       * @en
       * This module controls asset's behaviors and information, include loading, releasing etc. it is a singleton
       * All member can be accessed with `cc.assetManager`.
       *
       * @zh
       * 此模块管理资源的行为和信息，包括加载，释放等，这是一个单例，所有成员能够通过 `cc.assetManager` 调用
       *
       */
      _export("AssetManager", AssetManager = /*#__PURE__*/function () {
        function AssetManager() {
          this.pipeline = pipeline.append(preprocess).append(load);
          this.fetchPipeline = fetchPipeline.append(preprocess).append(fetch);
          this.transformPipeline = transformPipeline.append(parse).append(combine);
          this.bundles = bundles;
          this.assets = assets;
          this.generalImportBase = '';
          this.generalNativeBase = '';
          this.dependUtil = dependUtil;
          this.force = EDITOR || PREVIEW;
          this.allowImageBitmap = !sys.isMobile;
          this.utils = helper;
          this.downloader = downloader;
          this.parser = parser;
          this.packManager = packManager;
          this.cacheAsset = true;
          this.cacheManager = null;
          this.presets = presets;
          this.factory = factory;
          this.preprocessPipe = preprocess;
          this.fetchPipe = fetch;
          this.loadPipe = load;
          this.references = references;
          this._releaseManager = releaseManager;
          this._files = files;
          this._parsed = parsed;
          this._parsePipeline = BUILD ? null : new Pipeline('parse existing json', [this.loadPipe]);
        }

        var _proto = AssetManager.prototype;

        /**
         * @en
         * Initialize assetManager with options
         *
         * @zh
         * 初始化资源管理器
         *
         * @param options - the configuration
         *
         */
        _proto.init = function init(options) {
          if (options === void 0) {
            options = {};
          }

          this._files.clear();

          this._parsed.clear();

          this._releaseManager.init();

          this.assets.clear();
          this.bundles.clear();
          this.packManager.init();
          this.downloader.init(options.server, options.bundleVers, options.remoteBundles);
          this.parser.init();
          this.dependUtil.init();
          var importBase = options.importBase || '';

          if (importBase && importBase.endsWith('/')) {
            importBase = importBase.substr(0, importBase.length - 1);
          }

          var nativeBase = options.nativeBase || '';

          if (nativeBase && nativeBase.endsWith('/')) {
            nativeBase = nativeBase.substr(0, nativeBase.length - 1);
          }

          this.generalImportBase = importBase;
          this.generalNativeBase = nativeBase;
        }
        /**
         * @en
         * Get the bundle which has been loaded
         *
         * @zh
         * 获取已加载的分包
         *
         * @param name - The name of bundle
         * @return - The loaded bundle
         *
         * @example
         * // ${project}/assets/test1
         * cc.assetManager.getBundle('test1');
         *
         * cc.assetManager.getBundle('resources');
         *
         */
        ;

        _proto.getBundle = function getBundle(name) {
          return bundles.get(name) || null;
        }
        /**
         * @en
         * Remove this bundle. NOTE: The asset whthin this bundle will not be released automatically,
         * you can call {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} manually before remove it if you need
         *
         * @zh
         * 移除此包, 注意：这个包内的资源不会自动释放, 如果需要的话你可以在摧毁之前手动调用 {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} 进行释放
         *
         * @param bundle - The bundle to be removed
         *
         * @typescript
         * removeBundle(bundle: cc.AssetManager.Bundle): void
         */
        ;

        _proto.removeBundle = function removeBundle(bundle) {
          bundle._destroy();

          bundles.remove(bundle.name);
        }
        /**
         * @en
         * General interface used to load assets with a progression callback and a complete callback. You can achieve almost all
         * effect you want with combination of `requests` and `options`.It is highly recommended that you use more simple API,
         * such as `load`, `loadDir` etc. Every custom parameter in `options` will be distribute to each of `requests`. if request
         * already has same one, the parameter in request will be given priority. Besides, if request has dependencies, `options`
         * will distribute to dependencies too. Every custom parameter in `requests` will be tranfered to handler of `downloader`
         * and `parser` as `options`. You can register you own handler downloader or parser to collect these custom parameters for some effect.
         *
         * Reserved Keyword: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`,
         * `bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount`, `version`, `xhrResponseType`,
         * `xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`, `reloadAsset`, `cacheAsset`, `cacheEnabled`,
         * Please DO NOT use these words as custom options!
         *
         * @zh
         * 通用加载资源接口，可传入进度回调以及完成回调，通过组合 `request` 和 `options` 参数，几乎可以实现和扩展所有想要的加载效果。非常建议
         * 你使用更简单的API，例如 `load`、`loadDir` 等。`options` 中的自定义参数将会分发到 `requests` 的每一项中，如果request中已存在同名的
         * 参数则以 `requests` 中为准，同时如果有其他依赖资源，则 `options` 中的参数会继续向依赖项中分发。request中的自定义参数都会以 `options`
         * 形式传入加载流程中的 `downloader`, `parser` 的方法中, 你可以扩展 `downloader`, `parser` 收集参数完成想实现的效果。
         *
         * 保留关键字: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`,
         *  `maxConcurrency`, `maxRequestsPerFrame`, `maxRetryCount`, `version`, `xhrResponseType`, `xhrWithCredentials`, `xhrMimeType`, `xhrTimeout`, `xhrHeader`,
         *  `reloadAsset`, `cacheAsset`, `cacheEnabled`, 请不要使用这些字段为自定义参数!
         *
         * @param requests - The request you want to load
         * @param options - Optional parameters
         * @param onProgress - Callback invoked when progression change
         * @param onProgress.finished - The number of the items that are already completed
         * @param onProgress.total - The total number of the items
         * @param onProgress.item - The current request item
         * @param onComplete - Callback invoked when finish loading
         * @param onComplete.err - The error occured in loading process.
         * @param onComplete.data - The loaded content
         *
         * @example
         * cc.assetManager.loadAny({url: 'http://example.com/a.png'}, (err, img) => cc.log(img));
         * cc.assetManager.loadAny(['60sVXiTH1D/6Aft4MRt9VC'], (err, assets) => cc.log(assets));
         * cc.assetManager.loadAny([{ uuid: '0cbZa5Y71CTZAccaIFluuZ'}, {url: 'http://example.com/a.png'}], (err, assets) => cc.log(assets));
         * cc.assetManager.downloader.register('.asset', (url, options, onComplete) => {
         *      url += '?userName=' + options.userName + "&password=" + options.password;
         *      cc.assetManager.downloader.downloadFile(url, null, onComplete);
         * });
         * cc.assetManager.parser.register('.asset', (file, options, onComplete) => {
         *      var json = JSON.parse(file);
         *      var skin = json[options.skin];
         *      var model = json[options.model];
         *      onComplete(null, {skin, model});
         * });
         * cc.assetManager.loadAny({ url: 'http://example.com/my.asset', skin: 'xxx', model: 'xxx', userName: 'xxx', password: 'xxx' });
         *
         */
        ;

        _proto.loadAny = function loadAny(requests, options, onProgress, onComplete) {
          var _parseParameters = parseParameters(options, onProgress, onComplete),
              opts = _parseParameters.options,
              onProg = _parseParameters.onProgress,
              onComp = _parseParameters.onComplete;

          opts.preset = opts.preset || 'default';
          requests = Array.isArray(requests) ? requests.slice() : requests;
          var task = Task.create({
            input: requests,
            onProgress: onProg,
            onComplete: asyncify(onComp),
            options: opts
          });
          pipeline.async(task);
        }
        /**
         * @en
         * General interface used to preload assets with a progression callback and a complete callback.It is highly recommended that you use
         * more simple API, such as `preloadRes`, `preloadResDir` etc. Everything about preload is just likes `cc.assetManager.loadAny`, the
         * difference is `cc.assetManager.preloadAny` will only download asset but not parse asset. You need to invoke `cc.assetManager.loadAny(preloadTask)`
         * to finish loading asset
         *
         * @zh
         * 通用预加载资源接口，可传入进度回调以及完成回调，非常建议你使用更简单的 API ，例如 `preloadRes`, `preloadResDir` 等。`preloadAny` 和 `loadAny`
         * 几乎一样，区别在于 `preloadAny` 只会下载资源，不会去解析资源，你需要调用 `cc.assetManager.loadAny(preloadTask)` 来完成资源加载。
         *
         * @param requests - The request you want to preload
         * @param options - Optional parameters
         * @param onProgress - Callback invoked when progression change
         * @param onProgress.finished - The number of the items that are already completed
         * @param onProgress.total - The total number of the items
         * @param onProgress.item - The current request item
         * @param onComplete - Callback invoked when finish preloading
         * @param onComplete.err - The error occured in preloading process.
         * @param onComplete.items - The preloaded content
         *
         * @example
         * cc.assetManager.preloadAny('0cbZa5Y71CTZAccaIFluuZ', (err) => cc.assetManager.loadAny('0cbZa5Y71CTZAccaIFluuZ'));
         *
         */
        ;

        _proto.preloadAny = function preloadAny(requests, options, onProgress, onComplete) {
          var _parseParameters2 = parseParameters(options, onProgress, onComplete),
              opts = _parseParameters2.options,
              onProg = _parseParameters2.onProgress,
              onComp = _parseParameters2.onComplete;

          opts.preset = opts.preset || 'preload';
          requests = Array.isArray(requests) ? requests.slice() : requests;
          var task = Task.create({
            input: requests,
            onProgress: onProg,
            onComplete: asyncify(onComp),
            options: opts
          });
          fetchPipeline.async(task);
        }
        /**
         * @en
         * Load native file of asset, if you check the option 'Async Load Assets', you may need to load native file with this before you use the asset
         *
         * @zh
         * 加载资源的原生文件，如果你勾选了'延迟加载资源'选项，你可能需要在使用资源之前调用此方法来加载原生文件
         *
         * @param asset - The asset
         * @param options - Some optional parameters
         * @param onComplete - Callback invoked when finish loading
         * @param onComplete.err - The error occured in loading process.
         *
         * @example
         * cc.assetManager.postLoadNative(texture, (err) => console.log(err));
         *
         */
        ;

        _proto.postLoadNative = function postLoadNative(asset, options, onComplete) {
          var _parseParameters3 = parseParameters(options, undefined, onComplete),
              opts = _parseParameters3.options,
              onComp = _parseParameters3.onComplete;

          if (!asset._native || !asset.__nativeDepend__) {
            asyncify(onComp)(null);
            return;
          }

          var depend = dependUtil.getNativeDep(asset._uuid);

          if (!depend) {
            return;
          }

          if (!bundles.has(depend.bundle)) {
            var bundle = bundles.find(function (b) {
              return !!b.getAssetInfo(asset._uuid);
            });

            if (bundle) {
              depend.bundle = bundle.name;
            }
          }

          this.loadAny(depend, opts, function (err, _native) {
            if (!err) {
              if (asset.isValid && asset.__nativeDepend__) {
                asset._nativeAsset = _native;
                asset.__nativeDepend__ = false;
              }
            } else {
              error(err.message, err.stack);
            }

            if (onComp) {
              onComp(err);
            }
          });
        }
        /**
         * @en
         * Load remote asset with url, such as audio, image, text and so on.
         *
         * @zh
         * 使用 url 加载远程资源，例如音频，图片，文本等等。
         *
         * @param url - The url of asset
         * @param options - Some optional parameters
         * @param options.audioLoadMode - Indicate which mode audio you want to load
         * @param options.ext - If the url does not have a extension name, you can specify one manually.
         * @param onComplete - Callback invoked when finish loading
         * @param onComplete.err - The error occured in loading process.
         * @param onComplete.asset - The loaded texture
         *
         * @example
         * cc.assetManager.loadRemote('http://www.cloud.com/test1.jpg', (err, texture) => console.log(err));
         * cc.assetManager.loadRemote('http://www.cloud.com/test2.mp3', (err, audioClip) => console.log(err));
         * cc.assetManager.loadRemote('http://www.cloud.com/test3', { ext: '.png' }, (err, texture) => console.log(err));
         *
         */
        ;

        _proto.loadRemote = function loadRemote(url, options, onComplete) {
          var _parseParameters4 = parseParameters(options, undefined, onComplete),
              opts = _parseParameters4.options,
              onComp = _parseParameters4.onComplete;

          if (!opts.reloadAsset && this.assets.has(url)) {
            asyncify(onComp)(null, this.assets.get(url));
            return;
          }

          opts.__isNative__ = true;
          opts.preset = opts.preset || 'remote';
          this.loadAny({
            url: url
          }, opts, null, function (err, data) {
            if (err) {
              error(err.message, err.stack);

              if (onComp) {
                onComp(err, data);
              }
            } else {
              factory.create(url, data, opts.ext || extname(url), opts, function (p1, p2) {
                if (onComp) {
                  onComp(p1, p2);
                }
              });
            }
          });
        }
        /**
         * @en
         * load bundle
         *
         * @zh
         * 加载资源包
         *
         * @param nameOrUrl - The name or root path of bundle
         * @param options - Some optional paramter, same like downloader.downloadFile
         * @param options.version - The version of this bundle, you can check config.json in this bundle
         * @param onComplete - Callback when bundle loaded or failed
         * @param onComplete.err - The occurred error, null indicetes success
         * @param onComplete.bundle - The loaded bundle
         *
         * @example
         * loadBundle('http://localhost:8080/test', null, (err, bundle) => console.log(err));
         *
         */
        ;

        _proto.loadBundle = function loadBundle(nameOrUrl, options, onComplete) {
          var _parseParameters5 = parseParameters(options, undefined, onComplete),
              opts = _parseParameters5.options,
              onComp = _parseParameters5.onComplete;

          var bundleName = basename(nameOrUrl);

          if (this.bundles.has(bundleName)) {
            asyncify(onComp)(null, this.getBundle(bundleName));
            return;
          }

          opts.preset = opts.preset || 'bundle';
          opts.ext = 'bundle';
          opts.__isNative__ = true;
          this.loadAny({
            url: nameOrUrl
          }, opts, null, function (err, data) {
            if (err) {
              error(err.message, err.stack);

              if (onComp) {
                onComp(err, data);
              }
            } else {
              factory.create(nameOrUrl, data, 'bundle', opts, function (p1, p2) {
                if (onComp) {
                  onComp(p1, p2);
                }
              });
            }
          });
        }
        /**
         * @en
         * Release asset and it's dependencies.
         * This method will not only remove the cache of the asset in assetManager, but also clean up its content.
         * For example, if you release a texture, the texture asset and its gl texture data will be freed up.
         * Notice, this method may cause the texture to be unusable, if there are still other nodes use the same texture,
         * they may turn to black and report gl errors.
         *
         * @zh
         * 释放资源以及其依赖资源, 这个方法不仅会从 assetManager 中删除资源的缓存引用，还会清理它的资源内容。
         * 比如说，当你释放一个 texture 资源，这个 texture 和它的 gl 贴图数据都会被释放。
         * 注意，这个函数可能会导致资源贴图或资源所依赖的贴图不可用，如果场景中存在节点仍然依赖同样的贴图，它们可能会变黑并报 GL 错误。
         *
         * @param asset - The asset to be released
         *
         * @example
         * // release a texture which is no longer need
         * cc.assetManager.releaseAsset(texture);
         *
         */
        ;

        _proto.releaseAsset = function releaseAsset(asset) {
          releaseManager.tryRelease(asset, true);
        }
        /**
         * @en
         * Release all unused assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
         *
         * @zh
         * 释放所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
         *
         * @hidden
         *
         */
        ;

        _proto.releaseUnusedAssets = function releaseUnusedAssets() {
          assets.forEach(function (asset) {
            releaseManager.tryRelease(asset);
          });
        }
        /**
         * @en
         * Release all assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
         *
         * @zh
         * 释放所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
         *
         */
        ;

        _proto.releaseAll = function releaseAll() {
          assets.forEach(function (asset) {
            releaseManager.tryRelease(asset, true);
          });
        }
        /**
         * For internal usage.
         * @param json
         * @param options
         * @param onComplete
         * @private
         */
        ;

        _proto.loadWithJson = function loadWithJson(json, options, onProgress, onComplete) {
          if (BUILD) {
            throw new Error('Only valid in Editor');
          }

          var _parseParameters6 = parseParameters(options, onProgress, onComplete),
              opts = _parseParameters6.options,
              onProg = _parseParameters6.onProgress,
              onComp = _parseParameters6.onComplete;

          var item = RequestItem.create();
          item.isNative = false;
          item.uuid = opts.assetId || "" + new Date().getTime() + Math.random();
          item.file = json;
          item.ext = '.json';
          var task = Task.create({
            input: [item],
            onProgress: onProg,
            options: opts,
            onComplete: asyncify(function (err, data) {
              if (!err) {
                if (!opts.assetId) {
                  data._uuid = '';
                }
              }

              if (onComp) {
                onComp(err, data);
              }
            })
          });

          this._parsePipeline.async(task);
        };

        _createClass(AssetManager, [{
          key: "main",
          get:
          /**
           * @en
           * The builtin 'main' bundle
           *
           * @zh
           * 内置 main 包
           */
          function get() {
            return bundles.get(BuiltinBundleName.MAIN) || null;
          }
          /**
           * @en
           * The builtin 'resources' bundle
           *
           * @zh
           * 内置 resources 包
           *
           */

        }, {
          key: "resources",
          get: function get() {
            return bundles.get(BuiltinBundleName.RESOURCES) || null;
          }
        }]);

        return AssetManager;
      }());

      AssetManager.Pipeline = Pipeline;
      AssetManager.Task = Task;
      AssetManager.Cache = Cache;
      AssetManager.RequestItem = RequestItem;
      AssetManager.Bundle = Bundle;
      AssetManager.BuiltinBundleName = BuiltinBundleName;

      _export("default", legacyCC.assetManager = new AssetManager());

      legacyCC.AssetManager = AssetManager;
    }
  };
});