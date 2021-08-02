System.register("q-bundled:///fs/cocos/core/asset-manager/utilities.js", ["../../../../virtual/internal%253Aconstants.js", "../assets/index.js", "../global-exports.js", "../platform/debug.js", "../utils/js.js", "../utils/misc.js", "./depend-util.js", "./helper.js", "./shared.js"], function (_export, _context) {
  "use strict";

  var EDITOR, Asset, legacyCC, error, js, callInNextTick, dependUtil, isScene, assets, references, defaultProgressCallback;

  function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function setDefaultProgressCallback(onProgress) {
    defaultProgressCallback = onProgress;
  }

  function clear(task, clearRef) {
    for (var i = 0, l = task.input.length; i < l; i++) {
      var _item = task.input[i];

      if (clearRef) {
        if (!_item.isNative && _item.content instanceof Asset) {
          _item.content.decRef(false);
        }
      }

      _item.recycle();
    }

    task.input = null;
  }

  function urlAppendTimestamp(url, append) {
    if (append) {
      if (/\?/.test(url)) {
        return url + "&_t=" + Date.now();
      }

      return url + "?_t=" + Date.now();
    }

    return url;
  }

  function retry(process, times, wait, onComplete, index) {
    if (index === void 0) {
      index = 0;
    }

    process(index, function (err, result) {
      index++;

      if (!err || index > times) {
        if (onComplete) {
          onComplete(err, result);
        }
      } else {
        setTimeout(function () {
          retry(process, times, wait, onComplete, index);
        }, wait);
      }
    });
  }

  function getDepends(uuid, data, exclude, depends, config) {
    try {
      var info = dependUtil.parse(uuid, data);

      for (var i = 0, l = info.deps.length; i < l; i++) {
        var dep = info.deps[i];

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

        depends.push(_extends({}, info.nativeDep));
      }
    } catch (e) {
      error(e.message, e.stack);
    }
  }

  function cache(id, asset, cacheAsset) {
    if (!asset) {
      return;
    }

    cacheAsset = cacheAsset !== undefined ? cacheAsset : legacyCC.assetManager.cacheAsset;

    if (!isScene(asset) && cacheAsset && !asset.isDefault) {
      assets.add(id, asset);
    }
  }

  function setProperties(uuid, asset, assetsMap) {
    var missingAsset = false;
    var depends = asset.__depends__;

    if (depends) {
      var missingAssetReporter = null;

      for (var i = 0, l = depends.length; i < l; i++) {
        var depend = depends[i];
        var dependAsset = assetsMap[depend.uuid + "@import"];

        if (!dependAsset) {
          if (EDITOR) {
            if (!missingAssetReporter) {
              // eslint-disable-next-line new-cap
              missingAssetReporter = new EditorExtends.MissingReporter.object(asset);
            }

            missingAssetReporter.stashByOwner(depend.owner, depend.prop, EditorExtends.serialize.asAsset(depend.uuid));
          } else {
            error("The asset " + depend.uuid + " is missing!");
          }

          if (depend.type && depend.type !== Asset) {
            // eslint-disable-next-line new-cap
            var placeHolder = new depend.type();
            placeHolder.initDefault(depend.uuid);
            depend.owner[depend.prop] = placeHolder;
          }

          missingAsset = true;
        } else {
          depend.owner[depend.prop] = dependAsset.addRef();

          if (EDITOR) {
            var reference = references.get(dependAsset);

            if (!reference || isScene(asset)) {
              reference = [];
              references.add(depend.uuid, reference);
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
      if (assetsMap[uuid + "@native"]) {
        asset._nativeAsset = assetsMap[uuid + "@native"];
      } else {
        missingAsset = true;
        console.error("the native asset of " + uuid + " is missing!");
      }

      asset.__nativeDepend__ = false;
    }

    return missingAsset;
  }

  function gatherAsset(task) {
    var source = task.source;

    if (!task.options.__outputAsArray__ && source.length === 1) {
      task.output = source[0].content;
    } else {
      var output = task.output = [];

      for (var i = 0, l = source.length; i < l; i++) {
        output.push(source[i].content);
      }
    }
  }

  function forEach(array, process, onComplete) {
    var count = 0;
    var errs = [];
    var length = array.length;

    if (length === 0 && onComplete) {
      onComplete(errs);
    }

    var cb = function cb(err) {
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

    for (var i = 0; i < length; i++) {
      process(array[i], cb);
    }
  }

  function parseParameters(options, onProgress, onComplete) {
    var optionsOut = options;
    var onProgressOut = onProgress;
    var onCompleteOut = onComplete;

    if (onComplete === undefined) {
      var isCallback = typeof options === 'function';

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
    var typeOut = type;
    var onProgressOut = onProgress;
    var onCompleteOut = onComplete;

    if (onComplete === undefined) {
      var isValidType = js.isChildClassOf(type, Asset);

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

  function checkCircleReference(owner, uuid, map, checked) {
    if (checked === void 0) {
      checked = {};
    }

    var item = map[uuid];

    if (!item || checked[uuid]) {
      return false;
    }

    checked[uuid] = true;
    var result = false;
    var deps = dependUtil.getDeps(uuid);

    if (deps) {
      for (var i = 0, l = deps.length; i < l; i++) {
        var dep = deps[i];

        if (dep === owner || checkCircleReference(owner, dep, map, checked)) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  function asyncify(cb) {
    return function (p1, p2) {
      if (!cb) {
        return;
      }

      var refs = [];

      if (Array.isArray(p2)) {
        p2.forEach(function (x) {
          return x instanceof Asset && refs.push(x.addRef());
        });
      } else if (p2 instanceof Asset) {
        refs.push(p2.addRef());
      }

      callInNextTick(function () {
        refs.forEach(function (x) {
          return x.decRef(false);
        });
        cb(p1, p2);
      });
    };
  }

  _export({
    setDefaultProgressCallback: setDefaultProgressCallback,
    clear: clear,
    urlAppendTimestamp: urlAppendTimestamp,
    retry: retry,
    getDepends: getDepends,
    cache: cache,
    setProperties: setProperties,
    gatherAsset: gatherAsset,
    forEach: forEach,
    parseParameters: parseParameters,
    parseLoadResArgs: parseLoadResArgs,
    checkCircleReference: checkCircleReference,
    asyncify: asyncify
  });

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsIndexJs) {
      Asset = _assetsIndexJs.Asset;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }, function (_utilsMiscJs) {
      callInNextTick = _utilsMiscJs.callInNextTick;
    }, function (_dependUtilJs) {
      dependUtil = _dependUtilJs.default;
    }, function (_helperJs) {
      isScene = _helperJs.isScene;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      references = _sharedJs.references;
    }],
    execute: function () {
      defaultProgressCallback = null;
    }
  };
});