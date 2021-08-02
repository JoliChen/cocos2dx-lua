"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = load;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../assets/index.js");

var _debug = require("../platform/debug.js");

var _packManager = _interopRequireDefault(require("./pack-manager.js"));

var _parser = _interopRequireDefault(require("./parser.js"));

var _pipeline = require("./pipeline.js");

var _shared = require("./shared.js");

var _task = _interopRequireDefault(require("./task.js"));

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
function load(task, done) {
  let firstTask = false;

  if (!task.progress) {
    task.progress = {
      finish: 0,
      total: task.input.length,
      canInvoke: true
    };
    firstTask = true;
  }

  const {
    options,
    progress
  } = task;
  options.__exclude__ = options.__exclude__ || Object.create(null);
  task.output = [];
  (0, _utilities.forEach)(task.input, (item, cb) => {
    const subTask = _task.default.create({
      input: item,
      onProgress: task.onProgress,
      options,
      progress,
      onComplete: (err, result) => {
        if (err && !task.isFinish) {
          if (!_globalExports.legacyCC.assetManager.force || firstTask) {
            if (_internal253Aconstants.BUILD) {
              (0, _debug.error)(err.message, err.stack);
            }

            progress.canInvoke = false;
            done(err);
          } else if (progress.canInvoke) {
            task.dispatch('progress', ++progress.finish, progress.total, item);
          }
        }

        task.output.push(result);
        subTask.recycle();
        cb(null);
      }
    });

    loadOneAssetPipeline.async(subTask);
  }, () => {
    options.__exclude__ = null;

    if (task.isFinish) {
      (0, _utilities.clear)(task, true);
      task.dispatch('error');
      return;
    }

    (0, _utilities.gatherAsset)(task);
    (0, _utilities.clear)(task, true);
    done();
  });
}

const loadOneAssetPipeline = new _pipeline.Pipeline('loadOneAsset', [function fetch(task, done) {
  const item = task.output = task.input;
  const {
    options,
    isNative,
    uuid,
    file
  } = item;
  const {
    reloadAsset
  } = options;

  if (file || !reloadAsset && !isNative && _shared.assets.has(uuid)) {
    done();
    return;
  }

  _packManager.default.load(item, task.options, (err, data) => {
    item.file = data;
    done(err);
  });
}, function parse(task, done) {
  const item = task.output = task.input;
  const progress = task.progress;
  const exclude = task.options.__exclude__;
  const {
    id,
    file,
    options
  } = item;

  if (item.isNative) {
    _parser.default.parse(id, file, item.ext, options, (err, asset) => {
      if (err) {
        done(err);
        return;
      }

      item.content = asset;

      if (progress.canInvoke) {
        task.dispatch('progress', ++progress.finish, progress.total, item);
      }

      _shared.files.remove(id);

      _shared.parsed.remove(id);

      done();
    });
  } else {
    const {
      uuid
    } = item;

    if (uuid in exclude) {
      const {
        finish,
        content,
        err,
        callbacks
      } = exclude[uuid];

      if (progress.canInvoke) {
        task.dispatch('progress', ++progress.finish, progress.total, item);
      }

      if (finish || (0, _utilities.checkCircleReference)(uuid, uuid, exclude)) {
        if (content) {
          content.addRef();
        }

        item.content = content;
        done(err);
      } else {
        callbacks.push({
          done,
          item
        });
      }
    } else if (!options.reloadAsset && _shared.assets.has(uuid)) {
      const asset = _shared.assets.get(uuid);

      item.content = asset.addRef();

      if (progress.canInvoke) {
        task.dispatch('progress', ++progress.finish, progress.total, item);
      }

      done();
    } else {
      options.__uuid__ = uuid;

      _parser.default.parse(id, file, 'import', options, (err, asset) => {
        if (err) {
          done(err);
          return;
        }

        loadDepends(task, asset, done);
      });
    }
  }
}]);

function loadDepends(task, asset, done) {
  const {
    input: item,
    progress
  } = task;
  const {
    uuid,
    id,
    options,
    config
  } = item;
  const {
    cacheAsset
  } = options;
  const depends = []; // add reference avoid being released during loading dependencies

  if (asset.addRef) {
    asset.addRef();
  }

  (0, _utilities.getDepends)(uuid, asset, Object.create(null), depends, config);

  if (progress.canInvoke) {
    task.dispatch('progress', ++progress.finish, progress.total += depends.length, item);
  }

  const repeatItem = task.options.__exclude__[uuid] = {
    content: asset,
    finish: false,
    callbacks: [{
      done,
      item
    }]
  };

  const subTask = _task.default.create({
    input: depends,
    options: task.options,
    onProgress: task.onProgress,
    onError: _task.default.prototype.recycle,
    progress,
    onComplete: err => {
      if (asset.decRef) {
        asset.decRef(false);
      }

      repeatItem.finish = true;
      repeatItem.err = err;

      if (!err) {
        const output = Array.isArray(subTask.output) ? subTask.output : [subTask.output];
        const map = Object.create(null);

        for (const dependAsset of output) {
          if (!dependAsset) {
            continue;
          }

          map[dependAsset instanceof _index.Asset ? `${dependAsset._uuid}@import` : `${uuid}@native`] = dependAsset;
        }

        (0, _utilities.setProperties)(uuid, asset, map);

        try {
          if (typeof asset.onLoaded === 'function' && !asset.__onLoadedInvoked__ && !asset.__nativeDepend__) {
            asset.onLoaded();
            asset.__onLoadedInvoked__ = true;
          }
        } catch (e) {
          (0, _debug.error)(`The asset ${uuid} is invalid for some reason, detail message: ${e.message}, stack: ${e.stack}`);

          if (_internal253Aconstants.EDITOR || _internal253Aconstants.PREVIEW) {
            if (asset instanceof _index.Asset) {
              asset.initDefault();
            } else {
              // TODO: remove it.
              // scene asset might be a json in editor or preview
              _index.SceneAsset.prototype.initDefault.call(asset);
            }
          }
        }

        _shared.files.remove(id);

        _shared.parsed.remove(id);

        if (!_internal253Aconstants.BUILD && asset.validate && !asset.validate()) {
          asset.initDefault();
        }

        (0, _utilities.cache)(uuid, asset, cacheAsset);
        subTask.recycle();
      }

      const callbacks = repeatItem.callbacks;

      for (let i = 0, l = callbacks.length; i < l; i++) {
        const cb = callbacks[i];

        if (asset.addRef) {
          asset.addRef();
        }

        cb.item.content = asset;
        cb.done(err);
      }

      callbacks.length = 0;
    }
  });

  _shared.pipeline.async(subTask);
}