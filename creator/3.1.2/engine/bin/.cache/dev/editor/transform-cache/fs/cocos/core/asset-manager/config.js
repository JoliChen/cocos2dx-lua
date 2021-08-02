"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _globalExports = require("../global-exports.js");

var _js = require("../utils/js.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _helper = require("./helper.js");

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
const isMatchByWord = (path, test) => {
  if (path.length > test.length) {
    const nextAscii = path.charCodeAt(test.length);
    return nextAscii === 47; // '/'
  }

  return true;
};

const processOptions = options => {
  if (_internal253Aconstants.EDITOR) {
    return;
  }

  let uuids = options.uuids;
  const paths = options.paths;
  const types = options.types;
  const bundles = options.deps;
  const realEntries = options.paths = Object.create(null);

  if (options.debug === false) {
    for (let i = 0, l = uuids.length; i < l; i++) {
      uuids[i] = (0, _helper.decodeUuid)(uuids[i]);
    }

    for (const id in paths) {
      const entry = paths[id];
      const type = entry[1];
      entry[1] = types[type];
    }
  } else {
    const out = Object.create(null);

    for (let i = 0, l = uuids.length; i < l; i++) {
      const uuid = uuids[i];
      uuids[i] = out[uuid] = (0, _helper.decodeUuid)(uuid);
    }

    uuids = out;
  }

  for (const id in paths) {
    const entry = paths[id];
    realEntries[uuids[id]] = entry;
  }

  const scenes = options.scenes;

  for (const name in scenes) {
    const uuid = scenes[name];
    scenes[name] = uuids[uuid];
  }

  const packs = options.packs;

  for (const packId in packs) {
    const packedIds = packs[packId];

    for (let j = 0; j < packedIds.length; ++j) {
      packedIds[j] = uuids[packedIds[j]];
    }
  }

  const versions = options.versions;

  if (versions) {
    for (const folder in versions) {
      const entries = versions[folder];

      for (let i = 0; i < entries.length; i += 2) {
        const uuid = entries[i];
        entries[i] = uuids[uuid] || uuid;
      }
    }
  }

  const redirect = options.redirect;

  if (redirect) {
    for (let i = 0; i < redirect.length; i += 2) {
      redirect[i] = uuids[redirect[i]];
      redirect[i + 1] = bundles[redirect[i + 1]];
    }
  }
};

class Config {
  constructor() {
    this.name = '';
    this.base = '';
    this.importBase = '';
    this.nativeBase = '';
    this.deps = null;
    this.assetInfos = new _cache.default();
    this.scenes = new _cache.default();
    this.paths = new _cache.default();
  }

  init(options) {
    processOptions(options);
    this.importBase = options.importBase || '';
    this.nativeBase = options.nativeBase || '';
    this.base = options.base || '';
    this.name = options.name || '';
    this.deps = options.deps || []; // init

    this._initUuid(options.uuids);

    this._initPath(options.paths);

    this._initScene(options.scenes);

    this._initPackage(options.packs);

    this._initVersion(options.versions);

    this._initRedirect(options.redirect);
  }

  getInfoWithPath(path, type) {
    if (!path) {
      return null;
    }

    path = (0, _helper.normalize)(path);
    const items = this.paths.get(path);

    if (items) {
      if (type) {
        for (let i = 0, l = items.length; i < l; i++) {
          const assetInfo = items[i];

          if (_js.js.isChildClassOf(assetInfo.ctor, type)) {
            return assetInfo;
          }
        }
      } else {
        return items[0];
      }
    }

    return null;
  }

  getDirWithPath(path, type, out) {
    path = (0, _helper.normalize)(path);

    if (path[path.length - 1] === '/') {
      path = path.slice(0, -1);
    }

    const infos = out || [];
    this.paths.forEach((items, p) => {
      if (p.startsWith(path) && isMatchByWord(p, path) || !path) {
        for (let i = 0, l = items.length; i < l; i++) {
          const entry = items[i];

          if (!type || _js.js.isChildClassOf(entry.ctor, type)) {
            infos.push(entry);
          }
        }
      }
    });
    return infos;
  }

  getAssetInfo(uuid) {
    return this.assetInfos.get(uuid) || null;
  }

  getSceneInfo(name) {
    if (!name.endsWith('.scene')) {
      name += '.scene';
    }

    if (name[0] !== '/' && !name.startsWith('db://')) {
      name = `/${name}`;
    } // search scene


    const info = this.scenes.find((val, key) => key.endsWith(name));
    return info;
  }

  destroy() {
    this.paths.destroy();
    this.scenes.destroy();
    this.assetInfos.destroy();
  }

  _initUuid(uuidList) {
    if (!uuidList) {
      return;
    }

    this.assetInfos.clear();

    for (let i = 0, l = uuidList.length; i < l; i++) {
      const uuid = uuidList[i];
      this.assetInfos.add(uuid, {
        uuid
      });
    }
  }

  _initPath(pathList) {
    if (!pathList) {
      return;
    }

    const paths = this.paths;
    paths.clear();

    for (const uuid in pathList) {
      const info = pathList[uuid];
      const path = info[0];
      const type = info[1];
      const isSubAsset = info.length === 3;
      const assetInfo = this.assetInfos.get(uuid);
      assetInfo.path = path;
      assetInfo.ctor = _js.js._getClassById(type);

      if (paths.has(path)) {
        if (isSubAsset) {
          paths.get(path).push(assetInfo);
        } else {
          paths.get(path).splice(0, 0, assetInfo);
        }
      } else {
        paths.add(path, [assetInfo]);
      }
    }
  }

  _initScene(sceneList) {
    if (!sceneList) {
      return;
    }

    const scenes = this.scenes;
    scenes.clear();
    const assetInfos = this.assetInfos;

    for (const sceneName in sceneList) {
      const uuid = sceneList[sceneName];
      const assetInfo = assetInfos.get(uuid);
      assetInfo.url = sceneName;
      scenes.add(sceneName, assetInfo);
    }
  }

  _initPackage(packageList) {
    if (!packageList) {
      return;
    }

    const assetInfos = this.assetInfos;

    for (const packUuid in packageList) {
      const uuids = packageList[packUuid];
      const pack = {
        uuid: packUuid,
        packedUuids: uuids,
        ext: '.json'
      };
      assetInfos.add(packUuid, pack);

      for (let i = 0, l = uuids.length; i < l; i++) {
        const uuid = uuids[i];
        const assetInfo = assetInfos.get(uuid);
        const assetPacks = assetInfo.packs;

        if (assetPacks) {
          if (l === 1) {
            assetPacks.splice(0, 0, pack);
          } else {
            assetPacks.push(pack);
          }
        } else {
          assetInfo.packs = [pack];
        }
      }
    }
  }

  _initVersion(versions) {
    if (!versions) {
      return;
    }

    const assetInfos = this.assetInfos;
    let entries = versions.import;

    if (entries) {
      for (let i = 0, l = entries.length; i < l; i += 2) {
        const uuid = entries[i];
        const assetInfo = assetInfos.get(uuid);
        assetInfo.ver = entries[i + 1];
      }
    }

    entries = versions.native;

    if (entries) {
      for (let i = 0, l = entries.length; i < l; i += 2) {
        const uuid = entries[i];
        const assetInfo = assetInfos.get(uuid);
        assetInfo.nativeVer = entries[i + 1];
      }
    }
  }

  _initRedirect(redirect) {
    if (!redirect) {
      return;
    }

    const assetInfos = this.assetInfos;

    for (let i = 0, l = redirect.length; i < l; i += 2) {
      const uuid = redirect[i];
      const assetInfo = assetInfos.get(uuid);
      assetInfo.redirect = redirect[i + 1];
    }
  }

}

exports.default = Config;

if (_internal253Aconstants.TEST) {
  _globalExports.legacyCC._Test.Config = Config;
}