System.register("q-bundled:///fs/cocos/core/assets/texture-2d.js", ["../../../../virtual/internal%253Aconstants.js", "../data/decorators/index.js", "../gfx/index.js", "./asset-enum.js", "./image-asset.js", "./simple-texture.js", "../global-exports.js", "../utils/js.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, ccclass, type, TextureType, TextureInfo, PixelFormat, ImageAsset, SimpleTexture, legacyCC, js, _dec, _dec2, _class, _class2, _descriptor, _temp, Texture2D;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      type = _dataDecoratorsIndexJs.type;
    }, function (_gfxIndexJs) {
      TextureType = _gfxIndexJs.TextureType;
      TextureInfo = _gfxIndexJs.TextureInfo;
    }, function (_assetEnumJs) {
      PixelFormat = _assetEnumJs.PixelFormat;
    }, function (_imageAssetJs) {
      ImageAsset = _imageAssetJs.ImageAsset;
    }, function (_simpleTextureJs) {
      SimpleTexture = _simpleTextureJs.SimpleTexture;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_utilsJsJs) {
      js = _utilsJsJs.js;
    }],
    execute: function () {
      /**
       * @en The 2D texture asset. It supports mipmap, each level of mipmap use an [[ImageAsset]].
       * @zh 二维贴图资源。二维贴图资源的每个 Mipmap 层级都为一张 [[ImageAsset]]。
       */
      _export("Texture2D", Texture2D = (_dec = ccclass('cc.Texture2D'), _dec2 = type([ImageAsset]), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_SimpleTexture) {
        _inheritsLoose(Texture2D, _SimpleTexture);

        function Texture2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _SimpleTexture.call.apply(_SimpleTexture, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_mipmaps", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Texture2D.prototype;

        _proto.initialize = function initialize() {
          this.mipmaps = this._mipmaps;
        };

        _proto.onLoaded = function onLoaded() {
          this.initialize();
        }
        /**
         * @en Reset the current texture with given size, pixel format and mipmap images.
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * @param info The create information
         */
        ;

        _proto.reset = function reset(info) {
          this._width = info.width;
          this._height = info.height;

          this._setGFXFormat(info.format);

          this._setMipmapLevel(info.mipmapLevel || 1);

          this._tryReset();
        }
        /**
         * @en Reset the current texture with given size, pixel format and mipmap images.
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * @param width Pixel width
         * @param height Pixel height
         * @param format Pixel format
         * @param mipmapLevel Mipmap level count
         * @deprecated since v1.0 please use [[reset]] instead
         */
        ;

        _proto.create = function create(width, height, format, mipmapLevel) {
          if (format === void 0) {
            format = PixelFormat.RGBA8888;
          }

          if (mipmapLevel === void 0) {
            mipmapLevel = 1;
          }

          this.reset({
            width: width,
            height: height,
            format: format,
            mipmapLevel: mipmapLevel
          });
        };

        _proto.toString = function toString() {
          return this._mipmaps.length !== 0 ? this._mipmaps[0].url : '';
        };

        _proto.updateMipmaps = function updateMipmaps(firstLevel, count) {
          if (firstLevel === void 0) {
            firstLevel = 0;
          }

          if (firstLevel >= this._mipmaps.length) {
            return;
          }

          var nUpdate = Math.min(count === undefined ? this._mipmaps.length : count, this._mipmaps.length - firstLevel);

          for (var i = 0; i < nUpdate; ++i) {
            var level = firstLevel + i;

            this._assignImage(this._mipmaps[level], level);
          }
        }
        /**
         * @en If the level 0 mipmap image is a HTML element, then return it, otherwise return null.
         * @zh 若此贴图 0 级 Mipmap 的图像资源的实际源存在并为 HTML 元素则返回它，否则返回 `null`。
         * @returns HTML element or `null`
         * @deprecated Please use [[image.data]] instead
         */
        ;

        _proto.getHtmlElementObj = function getHtmlElementObj() {
          return this._mipmaps[0] && this._mipmaps[0].data instanceof HTMLElement ? this._mipmaps[0].data : null;
        }
        /**
         * @en Destroy the current 2d texture, clear up all mipmap levels and the related GPU resources.
         * @zh 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
         */
        ;

        _proto.destroy = function destroy() {
          this._mipmaps = [];
          return _SimpleTexture.prototype.destroy.call(this);
        }
        /**
         * @en Gets the description of the 2d texture
         * @zh 返回此贴图的描述。
         * @returns The description
         */
        ;

        _proto.description = function description() {
          var url = this._mipmaps[0] ? this._mipmaps[0].url : '';
          return "<cc.Texture2D | Name = " + url + " | Dimension = " + this.width + " x " + this.height + ">";
        }
        /**
         * @en Release used GPU resources.
         * @zh 释放占用的 GPU 资源。
         * @deprecated please use [[destroy]] instead
         */
        ;

        _proto.releaseTexture = function releaseTexture() {
          this.destroy();
        };

        _proto._serialize = function _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            return {
              base: _SimpleTexture.prototype._serialize.call(this, ctxForExporting),
              mipmaps: this._mipmaps.map(function (mipmap) {
                if (!mipmap || !mipmap._uuid) {
                  return null;
                }

                if (ctxForExporting && ctxForExporting._compressUuid) {
                  // ctxForExporting.dependsOn('_textureSource', texture); TODO
                  return EditorExtends.UuidUtils.compressUuid(mipmap._uuid, true);
                }

                return mipmap._uuid;
              })
            };
          }

          return null;
        };

        _proto._deserialize = function _deserialize(serializedData, handle) {
          var data = serializedData;

          _SimpleTexture.prototype._deserialize.call(this, data.base, handle);

          this._mipmaps = new Array(data.mipmaps.length);

          for (var i = 0; i < data.mipmaps.length; ++i) {
            // Prevent resource load failed
            this._mipmaps[i] = new ImageAsset();

            if (!data.mipmaps[i]) {
              continue;
            }

            var mipmapUUID = data.mipmaps[i];
            handle.result.push(this._mipmaps, "" + i, mipmapUUID, js._getClassId(ImageAsset));
            this._mipmaps[i]._texture = this;
          }
        };

        _proto._getGfxTextureCreateInfo = function _getGfxTextureCreateInfo(presumed) {
          var texInfo = new TextureInfo(TextureType.TEX2D);
          texInfo.width = this._width;
          texInfo.height = this._height;
          return Object.assign(texInfo, presumed);
        };

        _proto._checkTextureLoaded = function _checkTextureLoaded() {
          var ready = true;

          for (var i = 0; i < this._mipmaps.length; ++i) {
            var image = this._mipmaps[i];

            if (!image.loaded) {
              ready = false;
              break;
            }
          }

          if (ready) {
            _SimpleTexture.prototype._textureReady.call(this);
          }
        };

        _proto.initDefault = function initDefault(uuid) {
          _SimpleTexture.prototype.initDefault.call(this, uuid);

          var imageAsset = new ImageAsset();
          imageAsset.initDefault();
          this.image = imageAsset;
        };

        _proto.validate = function validate() {
          return this.mipmaps && this.mipmaps.length !== 0;
        };

        _createClass(Texture2D, [{
          key: "mipmaps",
          get:
          /**
           * @en All levels of mipmap images, be noted, automatically generated mipmaps are not included.
           * When setup mipmap, the size of the texture and pixel format could be modified.
           * @zh 所有层级 Mipmap，注意，这里不包含自动生成的 Mipmap。
           * 当设置 Mipmap 时，贴图的尺寸以及像素格式可能会改变。
           */
          function get() {
            return this._mipmaps;
          },
          set: function set(value) {
            var _this2 = this;

            this._mipmaps = value;

            this._setMipmapLevel(this._mipmaps.length);

            if (this._mipmaps.length > 0) {
              var imageAsset = this._mipmaps[0];
              this.reset({
                width: imageAsset.width,
                height: imageAsset.height,
                format: imageAsset.format,
                mipmapLevel: this._mipmaps.length
              });

              this._mipmaps.forEach(function (mipmap, level) {
                _this2._assignImage(mipmap, level);
              });
            } else {
              this.reset({
                width: 0,
                height: 0,
                mipmapLevel: this._mipmaps.length
              });
            }
          }
          /**
           * @en Level 0 mipmap image.
           * Be noted, `this.image = img` equals `this.mipmaps = [img]`,
           * sets image will clear all previous mipmaps.
           * @zh 0 级 Mipmap。
           * 注意，`this.image = img` 等价于 `this.mipmaps = [img]`，
           * 也就是说，通过 `this.image` 设置 0 级 Mipmap 时将隐式地清除之前的所有 Mipmap。
           */

        }, {
          key: "image",
          get: function get() {
            return this._mipmaps.length === 0 ? null : this._mipmaps[0];
          },
          set: function set(value) {
            this.mipmaps = value ? [value] : [];
          }
        }]);

        return Texture2D;
      }(SimpleTexture), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mipmaps", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      legacyCC.Texture2D = Texture2D;
    }
  };
});