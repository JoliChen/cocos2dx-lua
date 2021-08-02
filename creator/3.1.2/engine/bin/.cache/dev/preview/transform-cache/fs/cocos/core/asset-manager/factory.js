System.register("q-bundled:///fs/cocos/core/asset-manager/factory.js", ["../assets/index.js", "../assets/buffer-asset.js", "../utils/js.js", "./bundle.js", "./cache.js", "./shared.js", "./utilities.js"], function (_export, _context) {
  "use strict";

  var ImageAsset, JsonAsset, TextAsset, Asset, BufferAsset, js, Bundle, resources, Cache, assets, BuiltinBundleName, bundles, cache, Factory;

  /*
   Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
  
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
  function createImageAsset(id, data, options, onComplete) {
    var out = null;
    var err = null;

    try {
      out = new ImageAsset();
      out._nativeUrl = id;
      out._nativeAsset = data;
    } catch (e) {
      err = e;
    }

    onComplete(err, out);
  }

  function createJsonAsset(id, data, options, onComplete) {
    var out = new JsonAsset();
    out.json = data;
    onComplete(null, out);
  }

  function createTextAsset(id, data, options, onComplete) {
    var out = new TextAsset();
    out.text = data;
    onComplete(null, out);
  }

  function createBufferAsset(id, data, options, onComplete) {
    var out = new BufferAsset();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  function createAsset(id, data, options, onComplete) {
    var out = new Asset();
    out._nativeUrl = id;
    out._nativeAsset = data;
    onComplete(null, out);
  }

  function createBundle(id, data, options, onComplete) {
    var bundle = bundles.get(data.name);

    if (!bundle) {
      bundle = data.name === BuiltinBundleName.RESOURCES ? resources : new Bundle();
      data.base = data.base || id + "/";
      bundle.init(data);
    }

    _context["import"]("virtual:///prerequisite-imports/" + bundle.name).then(function () {
      onComplete(null, bundle);
    })["catch"](onComplete);
  }

  return {
    setters: [function (_assetsIndexJs) {
      ImageAsset = _assetsIndexJs.ImageAsset;
      JsonAsset = _assetsIndexJs.JsonAsset;
      TextAsset = _assetsIndexJs.TextAsset;
      Asset = _assetsIndexJs.Asset;
    }, function (_assetsBufferAssetJs) {
      BufferAsset = _assetsBufferAssetJs.BufferAsset;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }, function (_bundleJs) {
      Bundle = _bundleJs.default;
      resources = _bundleJs.resources;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_sharedJs) {
      assets = _sharedJs.assets;
      BuiltinBundleName = _sharedJs.BuiltinBundleName;
      bundles = _sharedJs.bundles;
    }, function (_utilitiesJs) {
      cache = _utilitiesJs.cache;
    }],
    execute: function () {
      _export("Factory", Factory = /*#__PURE__*/function () {
        function Factory() {
          this._creating = new Cache();
          this._producers = {
            // Images
            '.png': createImageAsset,
            '.jpg': createImageAsset,
            '.bmp': createImageAsset,
            '.jpeg': createImageAsset,
            '.gif': createImageAsset,
            '.ico': createImageAsset,
            '.tiff': createImageAsset,
            '.webp': createImageAsset,
            '.image': createImageAsset,
            '.pvr': createImageAsset,
            '.pkm': createImageAsset,
            // Txt
            '.txt': createTextAsset,
            '.xml': createTextAsset,
            '.vsh': createTextAsset,
            '.fsh': createTextAsset,
            '.atlas': createTextAsset,
            '.tmx': createTextAsset,
            '.tsx': createTextAsset,
            '.fnt': createTextAsset,
            '.json': createJsonAsset,
            '.ExportJson': createJsonAsset,
            // Binary
            '.binary': createBufferAsset,
            '.bin': createBufferAsset,
            '.dbbin': createBufferAsset,
            '.skel': createBufferAsset,
            bundle: createBundle,
            "default": createAsset
          };
        }

        var _proto = Factory.prototype;

        _proto.register = function register(type, handler) {
          if (typeof type === 'object') {
            js.mixin(this._producers, type);
          } else {
            this._producers[type] = handler;
          }
        };

        _proto.create = function create(id, data, type, options, onComplete) {
          var _this = this;

          var handler = this._producers[type] || this._producers["default"];
          var asset = assets.get(id);

          if (!options.reloadAsset && asset) {
            onComplete(null, asset);
            return;
          }

          var creating = this._creating.get(id);

          if (creating) {
            creating.push(onComplete);
            return;
          }

          this._creating.add(id, [onComplete]);

          handler(id, data, options, function (err, result) {
            if (!err && result instanceof Asset) {
              result._uuid = id;
              cache(id, result, options.cacheAsset);
            }

            var callbacks = _this._creating.remove(id);

            for (var i = 0, l = callbacks.length; i < l; i++) {
              callbacks[i](err, result);
            }
          });
        };

        return Factory;
      }());

      _export("default", new Factory());
    }
  };
});