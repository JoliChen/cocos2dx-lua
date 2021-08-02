"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetch;

var _debug = require("../platform/debug.js");

var _packManager = _interopRequireDefault(require("./pack-manager.js"));

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

/**
 * @packageDocumentation
 * @hidden
 */
function fetch(task, done) {
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
  const depends = [];
  const total = progress.total;
  const exclude = options.__exclude__ = options.__exclude__ || Object.create(null);
  task.output = [];
  (0, _utilities.forEach)(task.input, (item, cb) => {
    if (!item.isNative && _shared.assets.has(item.uuid)) {
      const asset = _shared.assets.get(item.uuid);

      item.content = asset.addRef();
      task.output.push(item);

      if (progress.canInvoke) {
        task.dispatch('progress', ++progress.finish, progress.total, item);
      }

      cb();
      return;
    }

    _packManager.default.load(item, task.options, (err, data) => {
      if (err) {
        if (!task.isFinish) {
          if (!_globalExports.legacyCC.assetManager.force || firstTask) {
            (0, _debug.error)(err.message, err.stack);
            progress.canInvoke = false;
            done(err);
          } else {
            task.output.push(item);

            if (progress.canInvoke) {
              task.dispatch('progress', ++progress.finish, progress.total, item);
            }
          }
        }
      } else if (!task.isFinish) {
        item.file = data;
        task.output.push(item);

        if (!item.isNative) {
          exclude[item.uuid] = true;
          (0, _utilities.getDepends)(item.uuid, data, exclude, depends, item.config);
          progress.total = total + depends.length;
        }

        if (progress.canInvoke) {
          task.dispatch('progress', ++progress.finish, progress.total, item);
        }
      }

      cb();
    });
  }, () => {
    if (task.isFinish) {
      (0, _utilities.clear)(task, true);
      task.dispatch('error');
      return;
    }

    if (depends.length > 0) {
      // stage 2 , download depend asset
      const subTask = _task.default.create({
        input: depends,
        progress,
        options,
        onProgress: task.onProgress,
        onError: _task.default.prototype.recycle,
        onComplete: err => {
          if (!err) {
            task.output.push(...subTask.output);
            subTask.recycle();
          }

          if (firstTask) {
            decreaseRef(task);
          }

          done(err);
        }
      });

      _shared.fetchPipeline.async(subTask);

      return;
    }

    if (firstTask) {
      decreaseRef(task);
    }

    done();
  });
}

function decreaseRef(task) {
  const output = task.output;

  for (let i = 0, l = output.length; i < l; i++) {
    if (output[i].content) {
      output[i].content.decRef(false);
    }
  }
}