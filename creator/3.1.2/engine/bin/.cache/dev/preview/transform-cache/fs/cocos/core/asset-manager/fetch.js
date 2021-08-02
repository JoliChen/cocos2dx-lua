System.register("q-bundled:///fs/cocos/core/asset-manager/fetch.js", ["../platform/debug.js", "./pack-manager.js", "./shared.js", "./task.js", "./utilities.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var error, packManager, assets, fetchPipeline, Task, clear, forEach, getDepends, legacyCC;

  function fetch(task, done) {
    var firstTask = false;

    if (!task.progress) {
      task.progress = {
        finish: 0,
        total: task.input.length,
        canInvoke: true
      };
      firstTask = true;
    }

    var options = task.options,
        progress = task.progress;
    var depends = [];
    var total = progress.total;
    var exclude = options.__exclude__ = options.__exclude__ || Object.create(null);
    task.output = [];
    forEach(task.input, function (item, cb) {
      if (!item.isNative && assets.has(item.uuid)) {
        var asset = assets.get(item.uuid);
        item.content = asset.addRef();
        task.output.push(item);

        if (progress.canInvoke) {
          task.dispatch('progress', ++progress.finish, progress.total, item);
        }

        cb();
        return;
      }

      packManager.load(item, task.options, function (err, data) {
        if (err) {
          if (!task.isFinish) {
            if (!legacyCC.assetManager.force || firstTask) {
              error(err.message, err.stack);
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
            getDepends(item.uuid, data, exclude, depends, item.config);
            progress.total = total + depends.length;
          }

          if (progress.canInvoke) {
            task.dispatch('progress', ++progress.finish, progress.total, item);
          }
        }

        cb();
      });
    }, function () {
      if (task.isFinish) {
        clear(task, true);
        task.dispatch('error');
        return;
      }

      if (depends.length > 0) {
        // stage 2 , download depend asset
        var subTask = Task.create({
          input: depends,
          progress: progress,
          options: options,
          onProgress: task.onProgress,
          onError: Task.prototype.recycle,
          onComplete: function onComplete(err) {
            if (!err) {
              var _task$output;

              (_task$output = task.output).push.apply(_task$output, subTask.output);

              subTask.recycle();
            }

            if (firstTask) {
              decreaseRef(task);
            }

            done(err);
          }
        });
        fetchPipeline.async(subTask);
        return;
      }

      if (firstTask) {
        decreaseRef(task);
      }

      done();
    });
  }

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
  function decreaseRef(task) {
    var output = task.output;

    for (var i = 0, l = output.length; i < l; i++) {
      if (output[i].content) {
        output[i].content.decRef(false);
      }
    }
  }

  _export("default", fetch);

  return {
    setters: [function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_packManagerJs) {
      packManager = _packManagerJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      fetchPipeline = _sharedJs.fetchPipeline;
    }, function (_taskJs) {
      Task = _taskJs.default;
    }, function (_utilitiesJs) {
      clear = _utilitiesJs.clear;
      forEach = _utilitiesJs.forEach;
      getDepends = _utilitiesJs.getDepends;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {}
  };
});