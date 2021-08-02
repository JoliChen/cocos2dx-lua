System.register("q-bundled:///fs/cocos/core/asset-manager/load.js", ["../../../../virtual/internal%253Aconstants.js", "../assets/index.js", "../platform/debug.js", "./pack-manager.js", "./parser.js", "./pipeline.js", "./shared.js", "./task.js", "./utilities.js", "../global-exports.js"], function (_export, _context) {
  "use strict";

  var BUILD, EDITOR, PREVIEW, Asset, SceneAsset, error, packManager, parser, Pipeline, assets, files, parsed, pipeline, Task, cache, checkCircleReference, clear, forEach, gatherAsset, getDepends, setProperties, legacyCC, loadOneAssetPipeline;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function load(task, done) {
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
    options.__exclude__ = options.__exclude__ || Object.create(null);
    task.output = [];
    forEach(task.input, function (item, cb) {
      var subTask = Task.create({
        input: item,
        onProgress: task.onProgress,
        options: options,
        progress: progress,
        onComplete: function onComplete(err, result) {
          if (err && !task.isFinish) {
            if (!legacyCC.assetManager.force || firstTask) {
              if (BUILD) {
                error(err.message, err.stack);
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
    }, function () {
      options.__exclude__ = null;

      if (task.isFinish) {
        clear(task, true);
        task.dispatch('error');
        return;
      }

      gatherAsset(task);
      clear(task, true);
      done();
    });
  }

  function loadDepends(task, asset, done) {
    var item = task.input,
        progress = task.progress;
    var _ref = item,
        uuid = _ref.uuid,
        id = _ref.id,
        options = _ref.options,
        config = _ref.config;
    var cacheAsset = options.cacheAsset;
    var depends = []; // add reference avoid being released during loading dependencies

    if (asset.addRef) {
      asset.addRef();
    }

    getDepends(uuid, asset, Object.create(null), depends, config);

    if (progress.canInvoke) {
      task.dispatch('progress', ++progress.finish, progress.total += depends.length, item);
    }

    var repeatItem = task.options.__exclude__[uuid] = {
      content: asset,
      finish: false,
      callbacks: [{
        done: done,
        item: item
      }]
    };
    var subTask = Task.create({
      input: depends,
      options: task.options,
      onProgress: task.onProgress,
      onError: Task.prototype.recycle,
      progress: progress,
      onComplete: function onComplete(err) {
        if (asset.decRef) {
          asset.decRef(false);
        }

        repeatItem.finish = true;
        repeatItem.err = err;

        if (!err) {
          var output = Array.isArray(subTask.output) ? subTask.output : [subTask.output];
          var map = Object.create(null);

          for (var _iterator = _createForOfIteratorHelperLoose(output), _step; !(_step = _iterator()).done;) {
            var dependAsset = _step.value;

            if (!dependAsset) {
              continue;
            }

            map[dependAsset instanceof Asset ? dependAsset._uuid + "@import" : uuid + "@native"] = dependAsset;
          }

          setProperties(uuid, asset, map);

          try {
            if (typeof asset.onLoaded === 'function' && !asset.__onLoadedInvoked__ && !asset.__nativeDepend__) {
              asset.onLoaded();
              asset.__onLoadedInvoked__ = true;
            }
          } catch (e) {
            error("The asset " + uuid + " is invalid for some reason, detail message: " + e.message + ", stack: " + e.stack);

            if (EDITOR || PREVIEW) {
              if (asset instanceof Asset) {
                asset.initDefault();
              } else {
                // TODO: remove it.
                // scene asset might be a json in editor or preview
                SceneAsset.prototype.initDefault.call(asset);
              }
            }
          }

          files.remove(id);
          parsed.remove(id);

          if (!BUILD && asset.validate && !asset.validate()) {
            asset.initDefault();
          }

          cache(uuid, asset, cacheAsset);
          subTask.recycle();
        }

        var callbacks = repeatItem.callbacks;

        for (var i = 0, l = callbacks.length; i < l; i++) {
          var cb = callbacks[i];

          if (asset.addRef) {
            asset.addRef();
          }

          cb.item.content = asset;
          cb.done(err);
        }

        callbacks.length = 0;
      }
    });
    pipeline.async(subTask);
  }

  _export("default", load);

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      BUILD = _virtualInternal253AconstantsJs.BUILD;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      PREVIEW = _virtualInternal253AconstantsJs.PREVIEW;
    }, function (_assetsIndexJs) {
      Asset = _assetsIndexJs.Asset;
      SceneAsset = _assetsIndexJs.SceneAsset;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_packManagerJs) {
      packManager = _packManagerJs.default;
    }, function (_parserJs) {
      parser = _parserJs.default;
    }, function (_pipelineJs) {
      Pipeline = _pipelineJs.Pipeline;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      files = _sharedJs.files;
      parsed = _sharedJs.parsed;
      pipeline = _sharedJs.pipeline;
    }, function (_taskJs) {
      Task = _taskJs.default;
    }, function (_utilitiesJs) {
      cache = _utilitiesJs.cache;
      checkCircleReference = _utilitiesJs.checkCircleReference;
      clear = _utilitiesJs.clear;
      forEach = _utilitiesJs.forEach;
      gatherAsset = _utilitiesJs.gatherAsset;
      getDepends = _utilitiesJs.getDepends;
      setProperties = _utilitiesJs.setProperties;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
    execute: function () {
      loadOneAssetPipeline = new Pipeline('loadOneAsset', [function fetch(task, done) {
        var item = task.output = task.input;
        var options = item.options,
            isNative = item.isNative,
            uuid = item.uuid,
            file = item.file;
        var reloadAsset = options.reloadAsset;

        if (file || !reloadAsset && !isNative && assets.has(uuid)) {
          done();
          return;
        }

        packManager.load(item, task.options, function (err, data) {
          item.file = data;
          done(err);
        });
      }, function parse(task, done) {
        var item = task.output = task.input;
        var progress = task.progress;
        var exclude = task.options.__exclude__;
        var id = item.id,
            file = item.file,
            options = item.options;

        if (item.isNative) {
          parser.parse(id, file, item.ext, options, function (err, asset) {
            if (err) {
              done(err);
              return;
            }

            item.content = asset;

            if (progress.canInvoke) {
              task.dispatch('progress', ++progress.finish, progress.total, item);
            }

            files.remove(id);
            parsed.remove(id);
            done();
          });
        } else {
          var uuid = item.uuid;

          if (uuid in exclude) {
            var _exclude$uuid = exclude[uuid],
                finish = _exclude$uuid.finish,
                content = _exclude$uuid.content,
                err = _exclude$uuid.err,
                callbacks = _exclude$uuid.callbacks;

            if (progress.canInvoke) {
              task.dispatch('progress', ++progress.finish, progress.total, item);
            }

            if (finish || checkCircleReference(uuid, uuid, exclude)) {
              if (content) {
                content.addRef();
              }

              item.content = content;
              done(err);
            } else {
              callbacks.push({
                done: done,
                item: item
              });
            }
          } else if (!options.reloadAsset && assets.has(uuid)) {
            var asset = assets.get(uuid);
            item.content = asset.addRef();

            if (progress.canInvoke) {
              task.dispatch('progress', ++progress.finish, progress.total, item);
            }

            done();
          } else {
            options.__uuid__ = uuid;
            parser.parse(id, file, 'import', options, function (err, asset) {
              if (err) {
                done(err);
                return;
              }

              loadDepends(task, asset, done);
            });
          }
        }
      }]);
    }
  };
});