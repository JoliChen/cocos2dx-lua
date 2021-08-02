"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DependUtil = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _deserialize = require("../data/deserialize.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _deserialize2 = _interopRequireDefault(require("./deserialize.js"));

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

/**
 * @en
 * Control asset's dependency list, it is a singleton. All member can be accessed with `cc.assetManager.dependUtil`
 *
 * @zh
 * 控制资源的依赖列表，这是一个单例, 所有成员能通过 `cc.assetManager.dependUtil` 访问
 *
 */
class DependUtil {
  constructor() {
    this._depends = new _cache.default();
  }

  init() {
    this._depends.clear();
  }
  /**
   * @en
   * Get asset's native dependency. For example, Texture's native dependency is image.
   *
   * @zh
   * 获取资源的原生依赖，例如 Texture 的原生依赖是图片
   *
   * @param uuid - asset's uuid
   * @returns native dependency
   *
   * @example
   * var dep = dependUtil.getNativeDep('fcmR3XADNLgJ1ByKhqcC5Z');
   */


  getNativeDep(uuid) {
    const depend = this._depends.get(uuid);

    if (depend && depend.nativeDep) {
      return { ...depend.nativeDep
      };
    }

    return null;
  }
  /**
   * @en
   * Get asset's direct referencing non-native dependency list. For example, Material's non-native dependencies are Texture.
   *
   * @zh
   * 获取资源直接引用的非原生依赖列表，例如，材质的非原生依赖是 Texture
   *
   * @param uuid - asset's uuid
   * @returns direct referencing non-native dependency list
   *
   * @example
   * var deps = dependUtil.getDeps('fcmR3XADNLgJ1ByKhqcC5Z');
   *
   */


  getDeps(uuid) {
    if (this._depends.has(uuid)) {
      return this._depends.get(uuid).deps;
    }

    return [];
  }
  /**
   * @en
   * Get non-native dependency list of the loaded asset, include indirect reference.
   * The returned array stores the dependencies with their uuid, after retrieve dependencies,
   *
   * @zh
   * 获取某个已经加载好的资源的所有非原生依赖资源列表，包括间接引用的资源，并保存在数组中返回。
   * 返回的数组将仅保存依赖资源的 uuid。
   *
   * @param uuid - The asset's uuid
   * @returns non-native dependency list
   *
   * @example
   * var deps = dependUtil.getDepsRecursively('fcmR3XADNLgJ1ByKhqcC5Z');
   *
   */


  getDepsRecursively(uuid) {
    const exclude = Object.create(null);
    const depends = [];

    this._descend(uuid, exclude, depends);

    return depends;
  }

  remove(uuid) {
    this._depends.remove(uuid);
  }
  /**
   * @en
   * Extract dependency list from serialized data or asset and then store in cache.
   *
   * @zh
   * 从序列化数据或资源中提取出依赖列表，并且存储在缓存中。
   *
   * @param uuid - The uuid of serialized data or asset
   * @param json - Serialized data or asset
   * @returns dependency list, include non-native and native dependency
   *
   * @example
   * downloader.downloadFile('test.json', { xhrResponseType: 'json'}, null, (err, file) => {
   *     var dependencies = parse('fcmR3XADNLgJ1ByKhqcC5Z', file);
   * });
   *
   */


  parse(uuid, json) {
    let out = null;

    if (Array.isArray(json) || json.__type__) {
      if (this._depends.has(uuid)) {
        return this._depends.get(uuid);
      } // @ts-expect-error unknown json


      if (Array.isArray(json) && (!(_internal253Aconstants.BUILD || (0, _deserialize.isCompiledJson)(json)) || !(0, _deserialize.hasNativeDep)(json))) {
        out = {
          deps: this._parseDepsFromJson(json)
        };
      } else {
        try {
          const asset = (0, _deserialize2.default)(json, {
            __uuid__: uuid
          });
          out = this._parseDepsFromAsset(asset);

          if (out.nativeDep) {
            out.nativeDep.uuid = uuid;
          }

          _shared.parsed.add(`${uuid}@import`, asset);
        } catch (e) {
          _shared.files.remove(`${uuid}@import`);

          out = {
            deps: []
          };
        }
      }
    } else {
      // get deps from an existing asset
      if (!_internal253Aconstants.EDITOR && this._depends.has(uuid)) {
        out = this._depends.get(uuid);

        if (out.parsedFromExistAsset) {
          return out;
        }
      }

      out = this._parseDepsFromAsset(json);
    } // cache dependency list


    this._depends.add(uuid, out);

    return out;
  }

  _parseDepsFromAsset(asset) {
    const out = {
      deps: [],
      parsedFromExistAsset: true
    };
    const deps = asset.__depends__;

    for (let i = 0, l = deps.length; i < l; i++) {
      out.deps.push(deps[i].uuid);
    }

    if (asset.__nativeDepend__) {
      out.nativeDep = asset._nativeDep;
    }

    return out;
  }

  _parseDepsFromJson(json) {
    let depends = null;

    if (_internal253Aconstants.DEV) {
      if ((0, _deserialize.isCompiledJson)(json)) {
        depends = (0, _deserialize.getDependUuidList)(json);
        depends.forEach((uuid, index) => depends[index] = (0, _helper.decodeUuid)(uuid));
        return depends;
      }

      depends = [];

      const parseDependRecursively = (data, out) => {
        if (!data || typeof data !== 'object' || data.__id__) {
          return;
        }

        const uuid = data.__uuid__;

        if (Array.isArray(data)) {
          for (let i = 0, l = data.length; i < l; i++) {
            parseDependRecursively(data[i], out);
          }
        } else if (uuid) {
          out.push((0, _helper.decodeUuid)(uuid));
        } else {
          for (const prop in data) {
            parseDependRecursively(data[prop], out);
          }
        }
      };

      parseDependRecursively(json, depends);
      return depends;
    }

    depends = (0, _deserialize.getDependUuidList)(json);
    depends.forEach((uuid, index) => depends[index] = (0, _helper.decodeUuid)(uuid));
    return depends;
  }

  _descend(uuid, exclude, depends) {
    const deps = this.getDeps(uuid);

    for (let i = 0; i < deps.length; i++) {
      const depend = deps[i];

      if (!exclude[depend]) {
        exclude[depend] = true;
        depends.push(depend);

        this._descend(depend, exclude, depends);
      }
    }
  }

}

exports.DependUtil = DependUtil;

var _default = new DependUtil();

exports.default = _default;