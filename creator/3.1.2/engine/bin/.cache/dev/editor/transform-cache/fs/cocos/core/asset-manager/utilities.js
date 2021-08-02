"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultProgressCallback = setDefaultProgressCallback;
exports.clear = clear;
exports.urlAppendTimestamp = urlAppendTimestamp;
exports.retry = retry;
exports.getDepends = getDepends;
exports.cache = cache;
exports.setProperties = setProperties;
exports.gatherAsset = gatherAsset;
exports.forEach = forEach;
exports.parseParameters = parseParameters;
exports.parseLoadResArgs = parseLoadResArgs;
exports.checkCircleReference = checkCircleReference;
exports.asyncify = asyncify;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../assets/index.js");

var _globalExports = require("../global-exports.js");

var _debug = require("../platform/debug.js");

var _js = require("../utils/js.js");

var _misc = require("../utils/misc.js");

var _dependUtil = _interopRequireDefault(require("./depend-util.js"));

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
 * @hidden
 */
let defaultProgressCallback = null;

function setDefaultProgressCallback(onProgress) {
  defaultProgressCallback = onProgress;
}

function clear(task, clearRef) {
  for (let i = 0, l = task.input.length; i < l; i++) {
    const item = task.input[i];

    if (clearRef) {
      if (!item.isNative && item.content instanceof _index.Asset) {
        item.content.decRef(false);
      }
    }

    item.recycle();
  }

  task.input = null;
}

function urlAppendTimestamp(url, append) {
  if (append) {
    if (/\?/.test(url)) {
      return `${url}&_t=${Date.now()}`;
    }

    return `${url}?_t=${Date.now()}`;
  }

  return url;
}

function retry(process, times, wait, onComplete, index = 0) {
  process(index, (err, result) => {
    index++;

    if (!err || index > times) {
      if (onComplete) {
        onComplete(err, result);
      }
    } else {
      setTimeout(() => {
        retry(process, times, wait, onComplete, index);
      }, wait);
    }
  });
}

function getDepends(uuid, data, exclude, depends, config) {
  try {
    const info = _dependUtil.default.parse(uuid, data);

    for (let i = 0, l = info.deps.length; i < l; i++) {
      const dep = info.deps[i];

      if (!(dep in exclude)) {
        exclude[dep] = true;
        depends.push({
          uuid: dep,
          bundle: config && config.name
        });
      }
    }

    if (info.nativeDep) {
      if (config) {
        info.nativeDep.bundle = config.name;
      }

      depends.push({ ...info.nativeDep
      });
    }
  } catch (e) {
    (0, _debug.error)(e.message, e.stack);
  }
}

function cache(id, asset, cacheAsset) {
  if (!asset) {
    return;
  }

  cacheAsset = cacheAsset !== undefined ? cacheAsset : _globalExports.legacyCC.assetManager.cacheAsset;

  if (!(0, _helper.isScene)(asset) && cacheAsset && !asset.isDefault) {
    _shared.assets.add(id, asset);
  }
}

function setProperties(uuid, asset, assetsMap) {
  let missingAsset = false;
  const depends = asset.__depends__;

  if (depends) {
    let missingAssetReporter = null;

    for (let i = 0, l = depends.length; i < l; i++) {
      const depend = depends[i];
      const dependAsset = assetsMap[`${depend.uuid}@import`];

      if (!dependAsset) {
        if (_internal253Aconstants.EDITOR) {
          if (!missingAssetReporter) {
            // eslint-disable-next-line new-cap
            missingAssetReporter = new EditorExtends.MissingReporter.object(asset);
          }

          missingAssetReporter.stashByOwner(depend.owner, depend.prop, EditorExtends.serialize.asAsset(depend.uuid));
        } else {
          (0, _debug.error)(`The asset ${depend.uuid} is missing!`);
        }

        if (depend.type && depend.type !== _index.Asset) {
          // eslint-disable-next-line new-cap
          const placeHolder = new depend.type();
          placeHolder.initDefault(depend.uuid);
          depend.owner[depend.prop] = placeHolder;
        }

        missingAsset = true;
      } else {
        depend.owner[depend.prop] = dependAsset.addRef();

        if (_internal253Aconstants.EDITOR) {
          let reference = _shared.references.get(dependAsset);

          if (!reference || (0, _helper.isScene)(asset)) {
            reference = [];

            _shared.references.add(depend.uuid, reference);
          }

          reference.push([asset, depend.owner, depend.prop]);
        }
      }
    }

    if (missingAssetReporter) {
      missingAssetReporter.reportByOwner();
    }

    asset.__depends__ = null;
  }

  if (asset.__nativeDepend__) {
    if (assetsMap[`${uuid}@native`]) {
      asset._nativeAsset = assetsMap[`${uuid}@native`];
    } else {
      missingAsset = true;
      console.error(`the native asset of ${uuid} is missing!`);
    }

    asset.__nativeDepend__ = false;
  }

  return missingAsset;
}

function gatherAsset(task) {
  const source = task.source;

  if (!task.options.__outputAsArray__ && source.length === 1) {
    task.output = source[0].content;
  } else {
    const output = task.output = [];

    for (let i = 0, l = source.length; i < l; i++) {
      output.push(source[i].content);
    }
  }
}

function forEach(array, process, onComplete) {
  let count = 0;
  const errs = [];
  const length = array.length;

  if (length === 0 && onComplete) {
    onComplete(errs);
  }

  const cb = err => {
    if (err) {
      errs.push(err);
    }

    count++;

    if (count === length) {
      if (onComplete) {
        onComplete(errs);
      }
    }
  };

  for (let i = 0; i < length; i++) {
    process(array[i], cb);
  }
}

function parseParameters(options, onProgress, onComplete) {
  let optionsOut = options;
  let onProgressOut = onProgress;
  let onCompleteOut = onComplete;

  if (onComplete === undefined) {
    const isCallback = typeof options === 'function';

    if (onProgress) {
      onCompleteOut = onProgress;

      if (!isCallback) {
        onProgressOut = null;
      }
    } else if (onProgress === undefined && isCallback) {
      onCompleteOut = options;
      optionsOut = null;
      onProgressOut = null;
    }

    if (onProgress !== undefined && isCallback) {
      onProgressOut = options;
      optionsOut = null;
    }
  }

  return {
    options: optionsOut || Object.create(null),
    onProgress: onProgressOut,
    onComplete: onCompleteOut
  };
}

function parseLoadResArgs(type, onProgress, onComplete) {
  let typeOut = type;
  let onProgressOut = onProgress;
  let onCompleteOut = onComplete;

  if (onComplete === undefined) {
    const isValidType = _js.js.isChildClassOf(type, _index.Asset);

    if (onProgress) {
      onCompleteOut = onProgress;

      if (isValidType) {
        onProgressOut = null;
      }
    } else if (onProgress === undefined && !isValidType) {
      onCompleteOut = type;
      onProgressOut = null;
      typeOut = null;
    }

    if (onProgress !== undefined && !isValidType) {
      onProgressOut = type;
      typeOut = null;
    }
  }

  return {
    type: typeOut,
    onProgress: onProgressOut || defaultProgressCallback,
    onComplete: onCompleteOut
  };
}

function checkCircleReference(owner, uuid, map, checked = {}) {
  const item = map[uuid];

  if (!item || checked[uuid]) {
    return false;
  }

  checked[uuid] = true;
  let result = false;

  const deps = _dependUtil.default.getDeps(uuid);

  if (deps) {
    for (let i = 0, l = deps.length; i < l; i++) {
      const dep = deps[i];

      if (dep === owner || checkCircleReference(owner, dep, map, checked)) {
        result = true;
        break;
      }
    }
  }

  return result;
}

function asyncify(cb) {
  return (p1, p2) => {
    if (!cb) {
      return;
    }

    const refs = [];

    if (Array.isArray(p2)) {
      p2.forEach(x => x instanceof _index.Asset && refs.push(x.addRef()));
    } else if (p2 instanceof _index.Asset) {
      refs.push(p2.addRef());
    }

    (0, _misc.callInNextTick)(() => {
      refs.forEach(x => x.decRef(false));
      cb(p1, p2);
    });
  };
}