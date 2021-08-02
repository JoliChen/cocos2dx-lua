"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Factory = void 0;

var _index = require("../assets/index.js");

var _bufferAsset = require("../assets/buffer-asset.js");

var _js = require("../utils/js.js");

var _bundle = _interopRequireWildcard(require("./bundle.js"));

var _cache = _interopRequireDefault(require("./cache.js"));

var _shared = require("./shared.js");

var _utilities = require("./utilities.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function createImageAsset(id, data, options, onComplete) {
  let out = null;
  let err = null;

  try {
    out = new _index.ImageAsset();
    out._nativeUrl = id;
    out._nativeAsset = data;
  } catch (e) {
    err = e;
  }

  onComplete(err, out);
}

function createJsonAsset(id, data, options, onComplete) {
  const out = new _index.JsonAsset();
  out.json = data;
  onComplete(null, out);
}

function createTextAsset(id, data, options, onComplete) {
  const out = new _index.TextAsset();
  out.text = data;
  onComplete(null, out);
}

function createBufferAsset(id, data, options, onComplete) {
  const out = new _bufferAsset.BufferAsset();
  out._nativeUrl = id;
  out._nativeAsset = data;
  onComplete(null, out);
}

function createAsset(id, data, options, onComplete) {
  const out = new _index.Asset();
  out._nativeUrl = id;
  out._nativeAsset = data;
  onComplete(null, out);
}

function createBundle(id, data, options, onComplete) {
  let bundle = _shared.bundles.get(data.name);

  if (!bundle) {
    bundle = data.name === _shared.BuiltinBundleName.RESOURCES ? _bundle.resources : new _bundle.default();
    data.base = data.base || `${id}/`;
    bundle.init(data);
  }

  Promise.resolve(`virtual:///prerequisite-imports/${bundle.name}`).then(s => _interopRequireWildcard(require(s))).then(() => {
    onComplete(null, bundle);
  }).catch(onComplete);
}

class Factory {
  constructor() {
    this._creating = new _cache.default();
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
      default: createAsset
    };
  }

  register(type, handler) {
    if (typeof type === 'object') {
      _js.js.mixin(this._producers, type);
    } else {
      this._producers[type] = handler;
    }
  }

  create(id, data, type, options, onComplete) {
    const handler = this._producers[type] || this._producers.default;

    const asset = _shared.assets.get(id);

    if (!options.reloadAsset && asset) {
      onComplete(null, asset);
      return;
    }

    const creating = this._creating.get(id);

    if (creating) {
      creating.push(onComplete);
      return;
    }

    this._creating.add(id, [onComplete]);

    handler(id, data, options, (err, result) => {
      if (!err && result instanceof _index.Asset) {
        result._uuid = id;
        (0, _utilities.cache)(id, result, options.cacheAsset);
      }

      const callbacks = this._creating.remove(id);

      for (let i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](err, result);
      }
    });
  }

}

exports.Factory = Factory;

var _default = new Factory();

exports.default = _default;