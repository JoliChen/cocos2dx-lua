"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AssetManager = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var _sys = require("../platform/sys.js");

var _path = require("../utils/path.js");

var _bundle = _interopRequireDefault(require("./bundle.js"));

var _cache = _interopRequireDefault(require("./cache.js"));

var _dependUtil = _interopRequireDefault(require("./depend-util.js"));

var _downloader = _interopRequireDefault(require("./downloader.js"));

var _factory = _interopRequireDefault(require("./factory.js"));

var _fetch = _interopRequireDefault(require("./fetch.js"));

var helper = _interopRequireWildcard(require("./helper.js"));

var _load = _interopRequireDefault(require("./load.js"));

var _packManager = _interopRequireDefault(require("./pack-manager.js"));

var _parser = _interopRequireDefault(require("./parser.js"));

var _pipeline = require("./pipeline.js");

var _preprocess = _interopRequireDefault(require("./preprocess.js"));

var _releaseManager = _interopRequireDefault(require("./release-manager.js"));

var _requestItem = _interopRequireDefault(require("./request-item.js"));

var _shared = require("./shared.js");

var _task = _interopRequireDefault(require("./task.js"));

var _urlTransformer = require("./url-transformer.js");

var _utilities = require("./utilities.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * @en
 * This module controls asset's behaviors and information, include loading, releasing etc. it is a singleton
 * All member can be accessed with `cc.assetManager`.
 *
 * @zh
 * 此模块管理资源的行为和信息，包括加载，释放等，这是一个单例，所有成员能够通过 `cc.assetManager` 调用
 *
 */
class AssetManager {
  constructor() {
    this.pipeline = _shared.pipeline.append(_preprocess.default).append(_load.default);
    this.fetchPipeline = _shared.fetchPipeline.append(_preprocess.default).append(_fetch.default);
    this.transformPipeline = _shared.transformPipeline.append(_urlTransformer.parse).append(_urlTransformer.combine);
    this.bundles = _shared.bundles;
    this.assets = _shared.assets;
    this.generalImportBase = '';
    this.generalNativeBase = '';
    this.dependUtil = _dependUtil.default;
    this.force = _internal253Aconstants.EDITOR || _internal253Aconstants.PREVIEW;
    this.allowImageBitmap = !_sys.sys.isMobile;
    this.utils = helper;
    this.downloader = _downloader.default;
    this.parser = _parser.default;
    this.packManager = _packManager.default;
    this.cacheAsset = true;
    this.cacheManager = null;
    this.presets = _shared.presets;
    this.factory = _factory.default;
    this.preprocessPipe = _preprocess.default;
    this.fetchPipe = _fetch.default;
    this.loadPipe = _load.default;
    this.references = _shared.references;
    this._releaseManager = _releaseManager.default;
    this._files = _shared.files;
    this._parsed = _shared.parsed;
    this._parsePipeline = _internal253Aconstants.BUILD ? null : new _pipeline.Pipeline('parse existing json', [this.loadPipe]);
  }

  /**
   * @en
   * The builtin 'main' bundle
   *
   * @zh
   * 内置 main 包
   */
  get main() {
    return _shared.bundles.get(_shared.BuiltinBundleName.MAIN) || null;
  }
  /**
   * @en
   * The builtin 'resources' bundle
   *
   * @zh
   * 内置 resources 包
   *
   */


  get resources() {
    return _shared.bundles.get(_shared.BuiltinBundleName.RESOURCES) || null;
  }
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


  init(options = {}) {
    this._files.clear();

    this._parsed.clear();

    this._releaseManager.init();

    this.assets.clear();
    this.bundles.clear();
    this.packManager.init();
    this.downloader.init(options.server, options.bundleVers, options.remoteBundles);
    this.parser.init();
    this.dependUtil.init();
    let importBase = options.importBase || '';

    if (importBase && importBase.endsWith('/')) {
      importBase = importBase.substr(0, importBase.length - 1);
    }

    let nativeBase = options.nativeBase || '';

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


  getBundle(name) {
    return _shared.bundles.get(name) || null;
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


  removeBundle(bundle) {
    bundle._destroy();

    _shared.bundles.remove(bundle.name);
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


  loadAny(requests, options, onProgress, onComplete) {
    const {
      options: opts,
      onProgress: onProg,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, onProgress, onComplete);
    opts.preset = opts.preset || 'default';
    requests = Array.isArray(requests) ? requests.slice() : requests;

    const task = _task.default.create({
      input: requests,
      onProgress: onProg,
      onComplete: (0, _utilities.asyncify)(onComp),
      options: opts
    });

    _shared.pipeline.async(task);
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


  preloadAny(requests, options, onProgress, onComplete) {
    const {
      options: opts,
      onProgress: onProg,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, onProgress, onComplete);
    opts.preset = opts.preset || 'preload';
    requests = Array.isArray(requests) ? requests.slice() : requests;

    const task = _task.default.create({
      input: requests,
      onProgress: onProg,
      onComplete: (0, _utilities.asyncify)(onComp),
      options: opts
    });

    _shared.fetchPipeline.async(task);
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


  postLoadNative(asset, options, onComplete) {
    const {
      options: opts,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, undefined, onComplete);

    if (!asset._native || !asset.__nativeDepend__) {
      (0, _utilities.asyncify)(onComp)(null);
      return;
    }

    const depend = _dependUtil.default.getNativeDep(asset._uuid);

    if (!depend) {
      return;
    }

    if (!_shared.bundles.has(depend.bundle)) {
      const bundle = _shared.bundles.find(b => !!b.getAssetInfo(asset._uuid));

      if (bundle) {
        depend.bundle = bundle.name;
      }
    }

    this.loadAny(depend, opts, (err, native) => {
      if (!err) {
        if (asset.isValid && asset.__nativeDepend__) {
          asset._nativeAsset = native;
          asset.__nativeDepend__ = false;
        }
      } else {
        (0, _debug.error)(err.message, err.stack);
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


  loadRemote(url, options, onComplete) {
    const {
      options: opts,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, undefined, onComplete);

    if (!opts.reloadAsset && this.assets.has(url)) {
      (0, _utilities.asyncify)(onComp)(null, this.assets.get(url));
      return;
    }

    opts.__isNative__ = true;
    opts.preset = opts.preset || 'remote';
    this.loadAny({
      url
    }, opts, null, (err, data) => {
      if (err) {
        (0, _debug.error)(err.message, err.stack);

        if (onComp) {
          onComp(err, data);
        }
      } else {
        _factory.default.create(url, data, opts.ext || (0, _path.extname)(url), opts, (p1, p2) => {
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


  loadBundle(nameOrUrl, options, onComplete) {
    const {
      options: opts,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, undefined, onComplete);
    const bundleName = (0, _path.basename)(nameOrUrl);

    if (this.bundles.has(bundleName)) {
      (0, _utilities.asyncify)(onComp)(null, this.getBundle(bundleName));
      return;
    }

    opts.preset = opts.preset || 'bundle';
    opts.ext = 'bundle';
    opts.__isNative__ = true;
    this.loadAny({
      url: nameOrUrl
    }, opts, null, (err, data) => {
      if (err) {
        (0, _debug.error)(err.message, err.stack);

        if (onComp) {
          onComp(err, data);
        }
      } else {
        _factory.default.create(nameOrUrl, data, 'bundle', opts, (p1, p2) => {
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


  releaseAsset(asset) {
    _releaseManager.default.tryRelease(asset, true);
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


  releaseUnusedAssets() {
    _shared.assets.forEach(asset => {
      _releaseManager.default.tryRelease(asset);
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


  releaseAll() {
    _shared.assets.forEach(asset => {
      _releaseManager.default.tryRelease(asset, true);
    });
  }
  /**
   * For internal usage.
   * @param json
   * @param options
   * @param onComplete
   * @private
   */


  loadWithJson(json, options, onProgress, onComplete) {
    if (_internal253Aconstants.BUILD) {
      throw new Error('Only valid in Editor');
    }

    const {
      options: opts,
      onProgress: onProg,
      onComplete: onComp
    } = (0, _utilities.parseParameters)(options, onProgress, onComplete);

    const item = _requestItem.default.create();

    item.isNative = false;
    item.uuid = opts.assetId || `${new Date().getTime()}${Math.random()}`;
    item.file = json;
    item.ext = '.json';

    const task = _task.default.create({
      input: [item],
      onProgress: onProg,
      options: opts,
      onComplete: (0, _utilities.asyncify)((err, data) => {
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
  }

}

exports.AssetManager = AssetManager;
AssetManager.Pipeline = _pipeline.Pipeline;
AssetManager.Task = _task.default;
AssetManager.Cache = _cache.default;
AssetManager.RequestItem = _requestItem.default;
AssetManager.Bundle = _bundle.default;
AssetManager.BuiltinBundleName = _shared.BuiltinBundleName;

var _default = _globalExports.legacyCC.assetManager = new AssetManager();

exports.default = _default;
_globalExports.legacyCC.AssetManager = AssetManager;