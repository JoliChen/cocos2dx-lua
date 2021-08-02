System.register("q-bundled:///fs/cocos/core/asset-manager/release-manager.js", ["../../../../virtual/internal%253Aconstants.js", "../assets/asset.js", "../data/object.js", "./cache.js", "./depend-util.js", "./shared.js", "../assets/image-asset.js", "../assets/texture-base.js", "../utils/misc.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, Asset, isValid, Cache, dependUtil, assets, references, ImageAsset, TextureBase, callInNextTick, _temp, ReleaseManager;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function visitAsset(asset, deps) {
    // Skip assets generated programmatically or by user (e.g. label texture)
    if (!asset._uuid) {
      return;
    }

    deps.push(asset._uuid);
  }

  function visitComponent(comp, deps) {
    var props = Object.getOwnPropertyNames(comp);

    for (var i = 0; i < props.length; i++) {
      var propName = props[i];

      if (propName === 'node' || propName === '__eventTargets') {
        continue;
      }

      var value = comp[propName];

      if (typeof value === 'object' && value) {
        if (Array.isArray(value)) {
          for (var j = 0; j < value.length; j++) {
            var val = value[j];

            if (val instanceof Asset) {
              visitAsset(val, deps);
            }
          }
        } else if (!value.constructor || value.constructor === Object) {
          var keys = Object.getOwnPropertyNames(value);

          for (var _j = 0; _j < keys.length; _j++) {
            var _val = value[keys[_j]];

            if (_val instanceof Asset) {
              visitAsset(_val, deps);
            }
          }
        } else if (value instanceof Asset) {
          visitAsset(value, deps);
        }
      }
    }
  }

  function visitNode(node, deps) {
    for (var i = 0; i < node._components.length; i++) {
      visitComponent(node._components[i], deps);
    }

    for (var _i = 0; _i < node._children.length; _i++) {
      visitNode(node._children[_i], deps);
    }
  }

  function descendOpRef(asset, refs, exclude, op) {
    exclude.push(asset._uuid);
    var depends = dependUtil.getDeps(asset._uuid);

    for (var i = 0, l = depends.length; i < l; i++) {
      var dependAsset = assets.get(depends[i]);

      if (!dependAsset) {
        continue;
      }

      var uuid = dependAsset._uuid;

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

  function checkCircularReference(asset) {
    // check circular reference
    var refs = Object.create(null);
    refs[asset._uuid] = asset.refCount;
    descendOpRef(asset, refs, _temp, -1);
    _temp.length = 0;

    if (refs[asset._uuid] !== 0) {
      return refs[asset._uuid];
    }

    for (var uuid in refs) {
      if (refs[uuid] !== 0) {
        descendOpRef(assets.get(uuid), refs, _temp, 1);
      }
    }

    _temp.length = 0;
    return refs[asset._uuid];
  }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_assetsAssetJs) {
      Asset = _assetsAssetJs.Asset;
    }, function (_dataObjectJs) {
      isValid = _dataObjectJs.isValid;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_dependUtilJs) {
      dependUtil = _dependUtilJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      references = _sharedJs.references;
    }, function (_assetsImageAssetJs) {
      ImageAsset = _assetsImageAssetJs.ImageAsset;
    }, function (_assetsTextureBaseJs) {
      TextureBase = _assetsTextureBaseJs.TextureBase;
    }, function (_utilsMiscJs) {
      callInNextTick = _utilsMiscJs.callInNextTick;
    }],
    execute: function () {
      _temp = [];

      ReleaseManager = /*#__PURE__*/function () {
        function ReleaseManager() {
          this._persistNodeDeps = new Cache();
          this._toDelete = new Cache();
          this._eventListener = false;
        }

        var _proto = ReleaseManager.prototype;

        _proto.init = function init() {
          this._persistNodeDeps.clear();

          this._toDelete.clear();
        };

        _proto._addPersistNodeRef = function _addPersistNodeRef(node) {
          var deps = [];
          visitNode(node, deps);

          for (var i = 0, l = deps.length; i < l; i++) {
            var dependAsset = assets.get(deps[i]);

            if (dependAsset) {
              dependAsset.addRef();
            }
          }

          this._persistNodeDeps.add(node.uuid, deps);
        };

        _proto._removePersistNodeRef = function _removePersistNodeRef(node) {
          if (!this._persistNodeDeps.has(node.uuid)) {
            return;
          }

          var deps = this._persistNodeDeps.get(node.uuid);

          for (var i = 0, l = deps.length; i < l; i++) {
            var dependAsset = assets.get(deps[i]);

            if (dependAsset) {
              dependAsset.decRef();
            }
          }

          this._persistNodeDeps.remove(node.uuid);
        } // do auto release
        ;

        _proto._autoRelease = function _autoRelease(oldScene, newScene, persistNodes) {
          if (oldScene) {
            var childs = dependUtil.getDeps(oldScene.uuid);

            for (var i = 0, l = childs.length; i < l; i++) {
              var asset = assets.get(childs[i]);

              if (asset) {
                asset.decRef(TEST || oldScene.autoReleaseAssets);
              }
            }

            var dependencies = dependUtil._depends.get(oldScene.uuid);

            if (dependencies && dependencies.persistDeps) {
              var persistDeps = dependencies.persistDeps;

              for (var _i2 = 0, _l = persistDeps.length; _i2 < _l; _i2++) {
                var _asset = assets.get(persistDeps[_i2]);

                if (_asset) {
                  _asset.decRef(TEST || oldScene.autoReleaseAssets);
                }
              }
            }

            if (oldScene.uuid !== newScene.uuid) {
              dependUtil.remove(oldScene.uuid);
            }
          } // transfer refs from persist nodes to new scene


          var sceneDeps = dependUtil._depends.get(newScene.uuid);

          if (sceneDeps) {
            sceneDeps.persistDeps = [];
          }

          for (var key in persistNodes) {
            var _ref;

            var node = persistNodes[key];

            var deps = this._persistNodeDeps.get(node.uuid);

            for (var _iterator = _createForOfIteratorHelperLoose(deps), _step; !(_step = _iterator()).done;) {
              var dep = _step.value;
              var dependAsset = assets.get(dep);

              if (dependAsset) {
                dependAsset.addRef();
              }
            }

            if (!sceneDeps) {
              continue;
            }

            (_ref = sceneDeps.persistDeps).push.apply(_ref, deps);
          }
        };

        _proto.tryRelease = function tryRelease(asset, force) {
          if (force === void 0) {
            force = false;
          }

          if (!(asset instanceof Asset)) {
            return;
          }

          if (force) {
            this._free(asset, force);

            return;
          }

          this._toDelete.add(asset._uuid, asset);

          if (!this._eventListener) {
            this._eventListener = true;
            callInNextTick(this._freeAssets.bind(this));
          }
        };

        _proto._freeAssets = function _freeAssets() {
          var _this = this;

          this._eventListener = false;

          this._toDelete.forEach(function (asset) {
            _this._free(asset);
          });

          this._toDelete.clear();
        };

        _proto._free = function _free(asset, force) {
          if (force === void 0) {
            force = false;
          }

          var uuid = asset._uuid;

          this._toDelete.remove(uuid);

          if (!isValid(asset, true)) {
            return;
          }

          if (!force) {
            if (asset.refCount > 0) {
              if (checkCircularReference(asset) > 0) {
                return;
              }
            }
          } // remove from cache


          assets.remove(uuid);
          var depends = dependUtil.getDeps(uuid);

          for (var i = 0, l = depends.length; i < l; i++) {
            var dependAsset = assets.get(depends[i]);

            if (dependAsset) {
              dependAsset.decRef(false); // no need to release dependencies recursively in editor

              if (!EDITOR) {
                this._free(dependAsset, false);
              }
            }
          } // only release non-gc asset in editor


          if (!EDITOR || asset instanceof ImageAsset || asset instanceof TextureBase) {
            asset.destroy();
          }

          dependUtil.remove(uuid);

          if (EDITOR) {
            references.remove(uuid);
          }
        };

        return ReleaseManager;
      }();

      _export("default", new ReleaseManager());
    }
  };
});