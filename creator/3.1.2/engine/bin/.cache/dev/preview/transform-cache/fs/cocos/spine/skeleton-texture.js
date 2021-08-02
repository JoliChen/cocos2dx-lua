System.register("q-bundled:///fs/cocos/spine/skeleton-texture.js", ["../core/index.js", "../core/assets/asset-enum.js", "./lib/spine-core.js"], function (_export, _context) {
  "use strict";

  var ImageAsset, Filter, WrapMode, spine, SkeletonTexture;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function convertFilter(filter) {
    switch (filter) {
      case spine.TextureFilter.Nearest:
      case spine.TextureFilter.MipMapNearestNearest:
      case spine.TextureFilter.MipMapLinearNearest:
        return Filter.NEAREST;

      case spine.TextureFilter.MipMap:
      case spine.TextureFilter.MipMapNearestLinear:
      case spine.TextureFilter.MipMapLinearLinear:
      case spine.TextureFilter.Linear:
      default:
        return Filter.LINEAR;
    }
  }

  function convertWraps(wrap) {
    switch (wrap) {
      case spine.TextureWrap.MirroredRepeat:
        return WrapMode.MIRRORED_REPEAT;

      case spine.TextureWrap.ClampToEdge:
        return WrapMode.CLAMP_TO_EDGE;

      case spine.TextureWrap.Repeat:
      default:
        return WrapMode.REPEAT;
    }
  }

  _export({
    convertFilter: convertFilter,
    convertWraps: convertWraps
  });

  return {
    setters: [function (_coreIndexJs) {
      ImageAsset = _coreIndexJs.ImageAsset;
    }, function (_coreAssetsAssetEnumJs) {
      Filter = _coreAssetsAssetEnumJs.Filter;
      WrapMode = _coreAssetsAssetEnumJs.WrapMode;
    }, function (_libSpineCoreJs) {
      spine = _libSpineCoreJs.default;
    }],
    execute: function () {
      _export("SkeletonTexture", SkeletonTexture = /*#__PURE__*/function (_spine$Texture) {
        _inheritsLoose(SkeletonTexture, _spine$Texture);

        function SkeletonTexture(opt) {
          var _this;

          _this = _spine$Texture.call(this, opt) || this; // TODO

          _this.name = 'sp.SkeletonTexture';
          _this._texture = null;
          _this._material = null;
          return _this;
        }

        var _proto = SkeletonTexture.prototype;

        _proto.setRealTexture = function setRealTexture(tex) {
          this._texture = tex;
        };

        _proto.getRealTexture = function getRealTexture() {
          if (!this._texture) {
            return null;
          }

          return this._texture instanceof ImageAsset ? this._texture._texture : this._texture;
        };

        _proto.setFilters = function setFilters(minFilter, magFilter) {
          if (this._texture) {
            this.getRealTexture().setFilters(convertFilter(minFilter), convertFilter(magFilter));
          }
        };

        _proto.setWraps = function setWraps(uWrap, vWrap) {
          if (this._texture) {
            this.getRealTexture().setWrapMode(convertWraps(uWrap), convertWraps(vWrap));
          }
        };

        _proto.dispose = function dispose() {};

        return SkeletonTexture;
      }(spine.Texture));
    }
  };
});