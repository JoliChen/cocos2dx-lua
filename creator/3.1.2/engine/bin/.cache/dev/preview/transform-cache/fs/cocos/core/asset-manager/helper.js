System.register("q-bundled:///fs/cocos/core/asset-manager/helper.js", ["../global-exports.js", "../platform/debug.js", "./shared.js", "./task.js", "../utils/decode-uuid.js"], function (_export, _context) {
  "use strict";

  var legacyCC, error, bundles, transformPipeline, Task, _uuidRegex;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /**
   * @packageDocumentation
   * @module asset-manager
   */

  /**
   * @en
   * Extract uuid from url
   *
   * @zh
   * 从 url 中提取 uuid
   *
   * @param url - url
   * @returns the uuid parsed from url
   *
   * @example
   * var url = 'res/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
   * var uuid = getUuidFromURL(url); // fc991dd7-0033-4b80-9d41-c8a86a702e59
   */
  function getUuidFromURL(url) {
    var matches = _uuidRegex.exec(url);

    if (matches) {
      return matches[1];
    }

    return '';
  }
  /**
   * @en
   * Transform uuid to url
   *
   * @zh
   * 转换 uuid 为 url
   *
   * @param uuid - The uuid of asset
   * @param options - Some optional parameters
   * @param options.isNative - Indicates whether the path you want is a native resource path
   * @param options.nativeExt - Extension of the native resource path, it is required when isNative is true
   * @returns url
   *
   * @example
   * // json path, 'assets/main/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
   * var url = getUrlWithUuid('fcmR3XADNLgJ1ByKhqcC5Z', {isNative: false});
   *
   * // png path, 'assets/main/native/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.png';
   * var url = getUrlWithUuid('fcmR3XADNLgJ1ByKhqcC5Z', {isNative: true, nativeExt: '.png'});
   *
   */


  function getUrlWithUuid(uuid, options) {
    options = options || Object.create(null);
    options.__isNative__ = options.isNative;
    options.ext = options.nativeExt;
    var bundle = bundles.find(function (b) {
      return !!b.getAssetInfo(uuid);
    });

    if (bundle) {
      options.bundle = bundle.name;
    }

    return transform(uuid, options);
  }
  /**
   * @en
   * Check if the type of asset is scene
   *
   * @zh
   * 检查资源类型是否是场景
   *
   * @method isScene
   * @param {*} asset - asset
   * @returns {boolean} - whether or not type is cc.SceneAsset
   *
   */


  function isScene(asset) {
    return asset && (asset instanceof legacyCC.SceneAsset || asset instanceof legacyCC.Scene);
  }
  /**
   * @en
   * Normalize url, strip './' and '/'
   *
   * @zh
   * 标准化 url ，去除 './' 和 '/'
   *
   * @param url - url
   * @returns - The normalized url
   */


  function normalize(url) {
    if (url) {
      if (url.charCodeAt(0) === 46 && url.charCodeAt(1) === 47) {
        // strip './'
        url = url.slice(2);
      } else if (url.charCodeAt(0) === 47) {
        // strip '/'
        url = url.slice(1);
      }
    }

    return url;
  }

  function transform(input, options) {
    var subTask = Task.create({
      input: input,
      options: options
    });
    var urls = [];

    try {
      var result = transformPipeline.sync(subTask);

      for (var _iterator = _createForOfIteratorHelperLoose(result), _step; !(_step = _iterator()).done;) {
        var requestItem = _step.value;
        var url = requestItem.url;
        requestItem.recycle();
        urls.push(url);
      }
    } catch (e) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(subTask.output), _step2; !(_step2 = _iterator2()).done;) {
        var item = _step2.value;
        item.recycle();
      }

      error(e.message, e.stack);
    }

    subTask.recycle();
    return urls.length > 1 ? urls : urls[0];
  }

  _export({
    getUuidFromURL: getUuidFromURL,
    getUrlWithUuid: getUrlWithUuid,
    isScene: isScene,
    normalize: normalize,
    transform: transform
  });

  return {
    setters: [function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_sharedJs) {
      bundles = _sharedJs.bundles;
      transformPipeline = _sharedJs.transformPipeline;
    }, function (_taskJs) {
      Task = _taskJs.default;
    }, function (_utilsDecodeUuidJs) {
      _export("decodeUuid", _utilsDecodeUuidJs.default);
    }],
    execute: function () {
      _uuidRegex = /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-@]{8,}).*/;
    }
  };
});