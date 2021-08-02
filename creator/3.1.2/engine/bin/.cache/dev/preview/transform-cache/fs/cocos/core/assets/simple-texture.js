System.register("q-bundled:///fs/cocos/core/assets/simple-texture.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../gfx/index.js", "../platform/debug.js", "./asset-enum.js", "./texture-base.js", "../global-exports.js", "../platform/macro.js", "../asset-manager/depend-util.js", "../utils/array.js"], function (_export, _context) {
  "use strict";

  var ccclass, DEV, TextureFlagBit, TextureUsageBit, API, BufferTextureCopy, error, Filter, TextureBase, legacyCC, macro, dependUtil, fastRemoveAt, _dec, _class, _temp, _regions, SimpleTexture;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function getMipLevel(width, height) {
    var size = Math.max(width, height);
    var level = 0;

    while (size) {
      size >>= 1;
      level++;
    }

    return level;
  }

  function isPOT(n) {
    return n && (n & n - 1) === 0;
  }

  function canGenerateMipmap(device, w, h) {
    var needCheckPOT = device.gfxAPI === API.WEBGL;

    if (needCheckPOT) {
      return isPOT(w) && isPOT(h);
    }

    return true;
  }
  /**
   * @en The simple texture base class.
   * It create the GFX Texture and can set mipmap levels.
   * @zh 简单贴图基类。
   * 简单贴图内部创建了 GFX 贴图和该贴图上的 GFX 贴图视图。
   * 简单贴图允许指定不同的 Mipmap 层级。
   */


  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
    }, function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
    }, function (_gfxIndexJs) {
      TextureFlagBit = _gfxIndexJs.TextureFlagBit;
      TextureUsageBit = _gfxIndexJs.TextureUsageBit;
      API = _gfxIndexJs.API;
      BufferTextureCopy = _gfxIndexJs.BufferTextureCopy;
    }, function (_platformDebugJs) {
      error = _platformDebugJs.error;
    }, function (_assetEnumJs) {
      Filter = _assetEnumJs.Filter;
    }, function (_textureBaseJs) {
      TextureBase = _textureBaseJs.TextureBase;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformMacroJs) {
      macro = _platformMacroJs.macro;
    }, function (_assetManagerDependUtilJs) {
      dependUtil = _assetManagerDependUtilJs.default;
    }, function (_utilsArrayJs) {
      fastRemoveAt = _utilsArrayJs.fastRemoveAt;
    }],
    execute: function () {
      _regions = [new BufferTextureCopy()];

      _export("SimpleTexture", SimpleTexture = (_dec = ccclass('cc.SimpleTexture'), _dec(_class = (_temp = /*#__PURE__*/function (_TextureBase) {
        _inheritsLoose(SimpleTexture, _TextureBase);

        function SimpleTexture() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _TextureBase.call.apply(_TextureBase, [this].concat(args)) || this;
          _this._gfxTexture = null;
          _this._mipmapLevel = 1;
          _this._textureWidth = 0;
          _this._textureHeight = 0;
          return _this;
        }

        var _proto = SimpleTexture.prototype;

        /**
         * @en The GFX Texture resource
         * @zh 获取此贴图底层的 GFX 贴图对象。
         */
        _proto.getGFXTexture = function getGFXTexture() {
          return this._gfxTexture;
        };

        _proto.destroy = function destroy() {
          this._tryDestroyTexture();

          return _TextureBase.prototype.destroy.call(this);
        }
        /**
         * @en Update the level 0 mipmap image.
         * @zh 更新 0 级 Mipmap。
         */
        ;

        _proto.updateImage = function updateImage() {
          this.updateMipmaps(0);
        }
        /**
         * @en Update the given level mipmap image.
         * @zh 更新指定层级范围内的 Mipmap。当 Mipmap 数据发生了改变时应调用此方法提交更改。
         * 若指定的层级范围超出了实际已有的层级范围，只有覆盖的那些层级范围会被更新。
         * @param firstLevel First level to be updated
         * @param count Mipmap level count to be updated
         */
        ;

        _proto.updateMipmaps = function updateMipmaps(firstLevel, count) {
          if (firstLevel === void 0) {
            firstLevel = 0;
          }
        }
        /**
         * @en Upload data to the given mipmap level.
         * The size of the image will affect how the mipmap is updated.
         * - When the image is an ArrayBuffer, the size of the image must match the mipmap size.
         * - If the image size matches the mipmap size, the mipmap data will be updated entirely.
         * - If the image size is smaller than the mipmap size, the mipmap will be updated from top left corner.
         * - If the image size is larger, an error will be raised
         * @zh 上传图像数据到指定层级的 Mipmap 中。
         * 图像的尺寸影响 Mipmap 的更新范围：
         * - 当图像是 `ArrayBuffer` 时，图像的尺寸必须和 Mipmap 的尺寸一致；否则，
         * - 若图像的尺寸与 Mipmap 的尺寸相同，上传后整个 Mipmap 的数据将与图像数据一致；
         * - 若图像的尺寸小于指定层级 Mipmap 的尺寸（不管是长或宽），则从贴图左上角开始，图像尺寸范围内的 Mipmap 会被更新；
         * - 若图像的尺寸超出了指定层级 Mipmap 的尺寸（不管是长或宽），都将引起错误。
         * @param source The source image or image data
         * @param level Mipmap level to upload the image to
         * @param arrayIndex The array index
         */
        ;

        _proto.uploadData = function uploadData(source, level, arrayIndex) {
          if (level === void 0) {
            level = 0;
          }

          if (arrayIndex === void 0) {
            arrayIndex = 0;
          }

          if (!this._gfxTexture || this._mipmapLevel <= level) {
            return;
          }

          var gfxDevice = this._getGFXDevice();

          if (!gfxDevice) {
            return;
          }

          var region = _regions[0];
          region.texExtent.width = this._textureWidth >> level;
          region.texExtent.height = this._textureHeight >> level;
          region.texSubres.mipLevel = level;
          region.texSubres.baseArrayLayer = arrayIndex;

          if (DEV) {
            if (source instanceof HTMLElement) {
              if (source.height > region.texExtent.height || source.width > region.texExtent.width) {
                error("Image source(" + this.name + ") bounds override.");
              }
            }
          }

          if (ArrayBuffer.isView(source)) {
            gfxDevice.copyBuffersToTexture([source], this._gfxTexture, _regions);
          } else {
            gfxDevice.copyTexImagesToTexture([source], this._gfxTexture, _regions);
          }
        };

        _proto._assignImage = function _assignImage(image, level, arrayIndex) {
          var _this2 = this;

          var upload = function upload() {
            var data = image.data;

            if (!data) {
              return;
            }

            _this2.uploadData(data, level, arrayIndex);

            _this2._checkTextureLoaded();

            if (macro.CLEANUP_IMAGE_CACHE) {
              var deps = dependUtil.getDeps(_this2._uuid);
              var index = deps.indexOf(image._uuid);

              if (index !== -1) {
                fastRemoveAt(deps, index);
                image.decRef();
              }
            }
          };

          if (image.loaded) {
            upload();
          } else {
            image.once('load', function () {
              upload();
            });

            if (!this.isCompressed) {
              var defaultImg = legacyCC.builtinResMgr.get('black-texture').image;
              this.uploadData(defaultImg.data, level, arrayIndex);
            }

            legacyCC.assetManager.postLoadNative(image);
          }
        };

        _proto._checkTextureLoaded = function _checkTextureLoaded() {
          this._textureReady();
        };

        _proto._textureReady = function _textureReady() {
          this.loaded = true;
          this.emit('load');
        }
        /**
         * Set mipmap level of this texture.
         * The value is passes as presumed info to `this._getGfxTextureCreateInfo()`.
         * @param value The mipmap level.
         */
        ;

        _proto._setMipmapLevel = function _setMipmapLevel(value) {
          this._mipmapLevel = value < 1 ? 1 : value;
        }
        /**
         * @en This method is overrided by derived classes to provide GFX texture info.
         * @zh 这个方法被派生类重写以提供 GFX 纹理信息。
         * @param presumed The presumed GFX texture info.
         */
        ;

        _proto._getGfxTextureCreateInfo = function _getGfxTextureCreateInfo(presumed) {
          return null;
        };

        _proto._tryReset = function _tryReset() {
          this._tryDestroyTexture();

          if (this._mipmapLevel === 0) {
            return;
          }

          var device = this._getGFXDevice();

          if (!device) {
            return;
          }

          this._createTexture(device);
        };

        _proto._createTexture = function _createTexture(device) {
          if (this._width === 0 || this._height === 0) {
            return;
          }

          var flags = TextureFlagBit.NONE;

          if (this._mipFilter !== Filter.NONE && canGenerateMipmap(device, this._width, this._height)) {
            this._mipmapLevel = getMipLevel(this._width, this._height);
            flags = TextureFlagBit.GEN_MIPMAP;
          }

          var textureCreateInfo = this._getGfxTextureCreateInfo({
            usage: TextureUsageBit.SAMPLED | TextureUsageBit.TRANSFER_DST,
            format: this._getGFXFormat(),
            levelCount: this._mipmapLevel,
            flags: flags | TextureFlagBit.IMMUTABLE
          });

          if (!textureCreateInfo) {
            return;
          }

          var texture = device.createTexture(textureCreateInfo);
          this._textureWidth = textureCreateInfo.width;
          this._textureHeight = textureCreateInfo.height;
          this._gfxTexture = texture;
        };

        _proto._tryDestroyTexture = function _tryDestroyTexture() {
          if (this._gfxTexture) {
            this._gfxTexture.destroy();

            this._gfxTexture = null;
          }
        };

        _createClass(SimpleTexture, [{
          key: "mipmapLevel",
          get:
          /**
           * @en The mipmap level of the texture
           * @zh 贴图中的 Mipmap 层级数量
           */
          function get() {
            return this._mipmapLevel;
          }
        }]);

        return SimpleTexture;
      }(TextureBase), _temp)) || _class));

      legacyCC.SimpleTexture = SimpleTexture;
    }
  };
});