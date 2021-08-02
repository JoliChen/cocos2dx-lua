"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertFilter = convertFilter;
exports.convertWraps = convertWraps;
exports.SkeletonTexture = void 0;

var _index = require("../core/index.js");

var _assetEnum = require("../core/assets/asset-enum.js");

var _spineCore = _interopRequireDefault(require("./lib/spine-core.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @packageDocumentation
 * @module spine
 */
class SkeletonTexture extends _spineCore.default.Texture {
  constructor(opt) {
    super(opt); // TODO

    this.name = 'sp.SkeletonTexture';
    this._texture = null;
    this._material = null;
  }

  setRealTexture(tex) {
    this._texture = tex;
  }

  getRealTexture() {
    if (!this._texture) {
      return null;
    }

    return this._texture instanceof _index.ImageAsset ? this._texture._texture : this._texture;
  }

  setFilters(minFilter, magFilter) {
    if (this._texture) {
      this.getRealTexture().setFilters(convertFilter(minFilter), convertFilter(magFilter));
    }
  }

  setWraps(uWrap, vWrap) {
    if (this._texture) {
      this.getRealTexture().setWrapMode(convertWraps(uWrap), convertWraps(vWrap));
    }
  }

  dispose() {}

}

exports.SkeletonTexture = SkeletonTexture;

function convertFilter(filter) {
  switch (filter) {
    case _spineCore.default.TextureFilter.Nearest:
    case _spineCore.default.TextureFilter.MipMapNearestNearest:
    case _spineCore.default.TextureFilter.MipMapLinearNearest:
      return _assetEnum.Filter.NEAREST;

    case _spineCore.default.TextureFilter.MipMap:
    case _spineCore.default.TextureFilter.MipMapNearestLinear:
    case _spineCore.default.TextureFilter.MipMapLinearLinear:
    case _spineCore.default.TextureFilter.Linear:
    default:
      return _assetEnum.Filter.LINEAR;
  }
}

function convertWraps(wrap) {
  switch (wrap) {
    case _spineCore.default.TextureWrap.MirroredRepeat:
      return _assetEnum.WrapMode.MIRRORED_REPEAT;

    case _spineCore.default.TextureWrap.ClampToEdge:
      return _assetEnum.WrapMode.CLAMP_TO_EDGE;

    case _spineCore.default.TextureWrap.Repeat:
    default:
      return _assetEnum.WrapMode.REPEAT;
  }
}