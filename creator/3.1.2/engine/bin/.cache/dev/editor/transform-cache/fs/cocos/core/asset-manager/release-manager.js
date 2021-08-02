"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _asset = require("../assets/asset.js");

var _object = require("../data/object.js");

var _cache = _interopRequireDefault(require("./cache.js"));

var _dependUtil = _interopRequireDefault(require("./depend-util.js"));

var _shared = require("./shared.js");

var _imageAsset = require("../assets/image-asset.js");

var _textureBase = require("../assets/texture-base.js");

var _misc = require("../utils/misc.js");

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
function visitAsset(asset, deps) {
  // Skip assets generated programmatically or by user (e.g. label texture)
  if (!asset._uuid) {
    return;
  }

  deps.push(asset._uuid);
}

function visitComponent(comp, deps) {
  const props = Object.getOwnPropertyNames(comp);

  for (let i = 0; i < props.length; i++) {
    const propName = props[i];

    if (propName === 'node' || propName === '__eventTargets') {
      continue;
    }

    const value = comp[propName];

    if (typeof value === 'object' && value) {
      if (Array.isArray(value)) {
        for (let j = 0; j < value.length; j++) {
          const val = value[j];

          if (val instanceof _asset.Asset) {
            visitAsset(val, deps);
          }
        }
      } else if (!value.constructor || value.constructor === Object) {
        const keys = Object.getOwnPropertyNames(value);

        for (let j = 0; j < keys.length; j++) {
          const val = value[keys[j]];

          if (val instanceof _asset.Asset) {
            visitAsset(val, deps);
          }
        }
      } else if (value instanceof _asset.Asset) {
        visitAsset(value, deps);
      }
    }
  }
}

function visitNode(node, deps) {
  for (let i = 0; i < node._components.length; i++) {
    visitComponent(node._components[i], deps);
  }

  for (let i = 0; i < node._children.length; i++) {
    visitNode(node._children[i], deps);
  }
}

function descendOpRef(asset, refs, exclude, op) {
  exclude.push(asset._uuid);

  const depends = _dependUtil.default.getDeps(asset._uuid);

  for (let i = 0, l = depends.length; i < l; i++) {
    const dependAsset = _shared.assets.get(depends[i]);

    if (!dependAsset) {
      continue;
    }

    const uuid = dependAsset._uuid;

    if (!(uuid in refs)) {
      refs[uuid] = dependAsset.refCount + op;
    } else {
      refs[uuid] += op;
    }

    if (exclude.includes(uuid)) {
      continue;
    }

    descendOpRef(dependAsset, refs, exclude, op);
  }
}

const _temp = [];

function checkCircularReference(asset) {
  // check circular reference
  const refs = Object.create(null);
  refs[asset._uuid] = asset.refCount;
  descendOpRef(asset, refs, _temp, -1);
  _temp.length = 0;

  if (refs[asset._uuid] !== 0) {
    return refs[asset._uuid];
  }

  for (const uuid in refs) {
    if (refs[uuid] !== 0) {
      descendOpRef(_shared.assets.get(uuid), refs, _temp, 1);
    }
  }

  _temp.length = 0;
  return refs[asset._uuid];
}

class ReleaseManager {
  constructor() {
    this._persistNodeDeps = new _cache.default();
    this._toDelete = new _cache.default();
    this._eventListener = false;
  }

  init() {
    this._persistNodeDeps.clear();

    this._toDelete.clear();
  }

  _addPersistNodeRef(node) {
    const deps = [];
    visitNode(node, deps);

    for (let i = 0, l = deps.length; i < l; i++) {
      const dependAsset = _shared.assets.get(deps[i]);

      if (dependAsset) {
        dependAsset.addRef();
      }
    }

    this._persistNodeDeps.add(node.uuid, deps);
  }

  _removePersistNodeRef(node) {
    if (!this._persistNodeDeps.has(node.uuid)) {
      return;
    }

    const deps = this._persistNodeDeps.get(node.uuid);

    for (let i = 0, l = deps.length; i < l; i++) {
      const dependAsset = _shared.assets.get(deps[i]);

      if (dependAsset) {
        dependAsset.decRef();
      }
    }

    this._persistNodeDeps.remove(node.uuid);
  } // do auto release


  _autoRelease(oldScene, newScene, persistNodes) {
    if (oldScene) {
      const childs = _dependUtil.default.getDeps(oldScene.uuid);

      for (let i = 0, l = childs.length; i < l; i++) {
        const asset = _shared.assets.get(childs[i]);

        if (asset) {
          asset.decRef(_internal253Aconstants.TEST || oldScene.autoReleaseAssets);
        }
      }

      const dependencies = _dependUtil.default._depends.get(oldScene.uuid);

      if (dependencies && dependencies.persistDeps) {
        const persistDeps = dependencies.persistDeps;

        for (let i = 0, l = persistDeps.length; i < l; i++) {
          const asset = _shared.assets.get(persistDeps[i]);

          if (asset) {
            asset.decRef(_internal253Aconstants.TEST || oldScene.autoReleaseAssets);
          }
        }
      }

      if (oldScene.uuid !== newScene.uuid) {
        _dependUtil.default.remove(oldScene.uuid);
      }
    } // transfer refs from persist nodes to new scene


    const sceneDeps = _dependUtil.default._depends.get(newScene.uuid);

    if (sceneDeps) {
      sceneDeps.persistDeps = [];
    }

    for (const key in persistNodes) {
      const node = persistNodes[key];

      const deps = this._persistNodeDeps.get(node.uuid);

      for (const dep of deps) {
        const dependAsset = _shared.assets.get(dep);

        if (dependAsset) {
          dependAsset.addRef();
        }
      }

      if (!sceneDeps) {
        continue;
      }

      sceneDeps.persistDeps.push(...deps);
    }
  }

  tryRelease(asset, force = false) {
    if (!(asset instanceof _asset.Asset)) {
      return;
    }

    if (force) {
      this._free(asset, force);

      return;
    }

    this._toDelete.add(asset._uuid, asset);

    if (!this._eventListener) {
      this._eventListener = true;
      (0, _misc.callInNextTick)(this._freeAssets.bind(this));
    }
  }

  _freeAssets() {
    this._eventListener = false;

    this._toDelete.forEach(asset => {
      this._free(asset);
    });

    this._toDelete.clear();
  }

  _free(asset, force = false) {
    const uuid = asset._uuid;

    this._toDelete.remove(uuid);

    if (!(0, _object.isValid)(asset, true)) {
      return;
    }

    if (!force) {
      if (asset.refCount > 0) {
        if (checkCircularReference(asset) > 0) {
          return;
        }
      }
    } // remove from cache


    _shared.assets.remove(uuid);

    const depends = _dependUtil.default.getDeps(uuid);

    for (let i = 0, l = depends.length; i < l; i++) {
      const dependAsset = _shared.assets.get(depends[i]);

      if (dependAsset) {
        dependAsset.decRef(false); // no need to release dependencies recursively in editor

        if (!_internal253Aconstants.EDITOR) {
          this._free(dependAsset, false);
        }
      }
    } // only release non-gc asset in editor


    if (!_internal253Aconstants.EDITOR || asset instanceof _imageAsset.ImageAsset || asset instanceof _textureBase.TextureBase) {
      asset.destroy();
    }

    _dependUtil.default.remove(uuid);

    if (_internal253Aconstants.EDITOR) {
      _shared.references.remove(uuid);
    }
  }

}

var _default = new ReleaseManager();

exports.default = _default;