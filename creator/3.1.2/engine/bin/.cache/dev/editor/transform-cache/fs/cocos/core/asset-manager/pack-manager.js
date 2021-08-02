"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PackManager = void 0;

var _index = require("../assets/index.js");

var _deserialize = require("../data/deserialize.js");

var _debug = require("../platform/debug.js");

var _js = require("../utils/js.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _downloader = _interopRequireDefault(require("./downloader.js"));

var _helper = require("./helper.js");

var _shared = require("./shared.js");

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
// import MissingScript from '../components/missing-script';
// import { packCustomObjData, unpackJSONs } from '../data/deserialize-compiled';

/**
 * @en
 * Handle the packed asset, include unpacking, loading, cache and so on. It is a singleton. All member can be accessed with `cc.assetManager.packManager`
 *
 * @zh
 * 处理打包资源，包括拆包，加载，缓存等等，这是一个单例, 所有成员能通过 `cc.assetManager.packManager` 访问
 *
 */
class PackManager {
  constructor() {
    this._loading = new _cache.default();
    this._unpackers = {
      '.json': this.unpackJson
    };
  }

  /**
   * @en
   * Unpack the json, revert to what it was before packing
   *
   * @zh
   * 拆解 json 包，恢复为打包之前的内容
   *
   * @param pack - The pack
   * @param json - The content of pack
   * @param options - Some optional parameters
   * @param onComplete - Callback when finish unpacking
   * @param onComplete.err - The occurred error, null indicetes success
   * @param onComplete.content - The unpacked assets
   *
   * @example
   * downloader.downloadFile('pack.json', { xhrResponseType: 'json'}, null, (err, file) => {
   *      packManager.unpackJson(['a', 'b'], file, null, (err, data) => console.log(err));
   * });
   *
   */
  unpackJson(pack, json, options, onComplete) {
    let out = _js.js.createMap(true);

    let err = null;

    if (Array.isArray(json)) {
      json = (0, _deserialize.unpackJSONs)(json);

      if (json.length !== pack.length) {
        (0, _debug.errorID)(4915);
      }

      for (let i = 0; i < pack.length; i++) {
        out[`${pack[i]}@import`] = json[i];
      }
    } else {
      const textureType = _js.js._getClassId(_index.Texture2D);

      const imageAssetType = _js.js._getClassId(_index.ImageAsset);

      if (json.type === textureType && json.data) {
        const datas = json.data;

        if (datas.length !== pack.length) {
          (0, _debug.errorID)(4915);
        }

        for (let i = 0; i < pack.length; i++) {
          out[`${pack[i]}@import`] = (0, _deserialize.packCustomObjData)(textureType, {
            base: datas[i][0],
            mipmaps: datas[i][1]
          });
        }
      } else if (json.type === imageAssetType && json.data) {
        const datas = json.data;

        if (datas.length !== pack.length) {
          (0, _debug.errorID)(4915);
        }

        for (let i = 0; i < pack.length; i++) {
          out[`${pack[i]}@import`] = datas[i];
        }
      } else {
        err = new Error('unmatched type pack!');
        out = null;
      }
    }

    onComplete(err, out);
  }

  init() {
    this._loading.clear();
  }
  /**
   * @en
   * Register custom handler if you want to change default behavior or extend packManager to unpack other format pack
   *
   * @zh
   * 当你想修改默认行为或者拓展 packManager 来拆分其他格式的包时可以注册自定义的 handler
   *
   * @param type - Extension likes '.bin' or map likes {'.bin': binHandler, '.ab': abHandler}
   * @param handler - handler
   * @param handler.packUuid - The uuid of pack
   * @param handler.data - The content of pack
   * @param handler.options - Some optional parameters
   * @param handler.onComplete - Callback when finishing unpacking
   *
   * @example
   * packManager.register('.bin', (packUuid, file, options, onComplete) => onComplete(null, null));
   * packManager.register({
   *  '.bin': (packUuid, file, options, onComplete) => onComplete(null, null),
   *  '.ab': (packUuid, file, options, onComplete) => onComplete(null, null),
   * });
   */


  register(type, handler) {
    if (typeof type === 'object') {
      _js.js.mixin(this._unpackers, type);
    } else {
      this._unpackers[type] = handler;
    }
  }
  /**
   * @en
   * Use corresponding handler to unpack package
   *
   * @zh
   * 用对应的 handler 来进行解包
   *
   * @method unpack
   * @param pack - The uuid of packed assets
   * @param data - The packed data
   * @param type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param options - Some optional parameter
   * @param onComplete - callback when finishing unpacking
   * @param onComplete.err -  The occurred error, null indicetes success
   * @param onComplete.data - Original assets
   *
   * @example
   * downloader.downloadFile('pack.json', {xhrResponseType: 'json'}, null, (err, file) => {
   *      packManager.unpack(['2fawq123d', '1zsweq23f'], file, '.json', null, (err, data) => console.log(err));
   * });
   *
   */


  unpack(pack, data, type, options, onComplete) {
    if (!data) {
      onComplete(new Error('package data is wrong!'));
      return;
    }

    const unpacker = this._unpackers[type];
    unpacker(pack, data, options, onComplete);
  }
  /**
   * @en
   * Download request item, If item is not in any package, download as usual. Otherwise, download the corresponding package and unpack it.
   * And then retrieve the corresponding content form it.
   *
   * @zh
   * 下载请求对象，如果请求对象不在任何包内，则正常下载，否则下载对应的 package 并进行拆解，并取回包内对应的内容
   *
   * @param item - Some item you want to download
   * @param options - Some optional parameters
   * @param onComplete - Callback when finished
   * @param onComplete.err - The occurred error, null indicetes success
   * @param onComplete.data - The unpacked data retrieved from package
   *
   * @example
   * var requestItem = cc.AssetManager.RequestItem.create();
   * requestItem.uuid = 'fcmR3XADNLgJ1ByKhqcC5Z';
   * requestItem.info = config.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * packManager.load(requestItem, null, (err, data) => console.log(err));
   *
   */


  load(item, options, onComplete) {
    // if not in any package, download as uausl
    if (item.isNative || !item.info || !item.info.packs) {
      _downloader.default.download(item.id, item.url, item.ext, item.options, onComplete);

      return;
    }

    if (_shared.files.has(item.id)) {
      onComplete(null, _shared.files.get(item.id));
      return;
    }

    const packs = item.info.packs; // find a loading package

    let pack = packs.find(val => this._loading.has(val.uuid));

    if (pack) {
      this._loading.get(pack.uuid).push({
        onComplete,
        id: item.id
      });

      return;
    } // download a new package


    pack = packs[0];

    this._loading.add(pack.uuid, [{
      onComplete,
      id: item.id
    }]); // find the url of pack


    const url = (0, _helper.transform)(pack.uuid, {
      ext: pack.ext,
      bundle: item.config.name
    });

    _downloader.default.download(pack.uuid, url, pack.ext, item.options, (err, data) => {
      _shared.files.remove(pack.uuid);

      if (err) {
        (0, _debug.error)(err.message, err.stack);
      } // unpack package


      this.unpack(pack.packedUuids, data, pack.ext, item.options, (err2, result) => {
        if (!err2) {
          for (const id in result) {
            _shared.files.add(id, result[id]);
          }
        }

        const callbacks = this._loading.remove(pack.uuid);

        for (let i = 0, l = callbacks.length; i < l; i++) {
          const cb = callbacks[i];

          if (err || err2) {
            cb.onComplete(err || err2);
            continue;
          }

          const unpackedData = result[cb.id];

          if (!unpackedData) {
            cb.onComplete(new Error('can not retrieve data from package'));
          } else {
            cb.onComplete(null, unpackedData);
          }
        }
      });
    });
  }

}

exports.PackManager = PackManager;

var _default = new PackManager();

exports.default = _default;