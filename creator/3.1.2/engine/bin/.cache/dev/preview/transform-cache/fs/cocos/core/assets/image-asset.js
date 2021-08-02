System.register("q-bundled:///fs/cocos/core/assets/image-asset.js", ["../data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../gfx/index.js", "./asset.js", "./asset-enum.js", "../global-exports.js", "../platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, override, EDITOR, MINIGAME, ALIPAY, XIAOMI, JSB, TEST, BAIDU, Feature, Asset, PixelFormat, legacyCC, warnID, _dec, _class, _class2, _class3, _temp, ImageAsset;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function isImageBitmap(imageSource) {
    return legacyCC.sys.capabilities.imageBitmap && imageSource instanceof ImageBitmap;
  }

  function fetchImageSource(imageSource) {
    return '_data' in imageSource ? imageSource._data : imageSource;
  } // 返回该图像源是否是平台提供的图像对象。


  function isNativeImage(imageSource) {
    if (ALIPAY || XIAOMI || BAIDU) {
      // We're unable to grab the constructors of Alipay native image or canvas object.
      return !('_data' in imageSource);
    }

    if (JSB && imageSource._compressed === true) {
      return false;
    }

    return imageSource instanceof HTMLImageElement || imageSource instanceof HTMLCanvasElement || isImageBitmap(imageSource);
  }
  /**
   * @en Image Asset.
   * @zh 图像资源。
   */


  function _getGlobalDevice() {
    if (legacyCC.director.root) {
      return legacyCC.director.root.device;
    }

    return null;
  }
  /**
   * @zh
   * 当该资源加载成功后触发该事件。
   * @en
   * This event is emitted when the asset is loaded
   *
   * @event load
   */


  return {
    setters: [function (_dataDecoratorsIndexJs) {
      ccclass = _dataDecoratorsIndexJs.ccclass;
      override = _dataDecoratorsIndexJs.override;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      MINIGAME = _virtualInternal253AconstantsJs.MINIGAME;
      ALIPAY = _virtualInternal253AconstantsJs.ALIPAY;
      XIAOMI = _virtualInternal253AconstantsJs.XIAOMI;
      JSB = _virtualInternal253AconstantsJs.JSB;
      TEST = _virtualInternal253AconstantsJs.TEST;
      BAIDU = _virtualInternal253AconstantsJs.BAIDU;
    }, function (_gfxIndexJs) {
      Feature = _gfxIndexJs.Feature;
    }, function (_assetJs) {
      Asset = _assetJs.Asset;
    }, function (_assetEnumJs) {
      PixelFormat = _assetEnumJs.PixelFormat;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_platformDebugJs) {
      warnID = _platformDebugJs.warnID;
    }],
    execute: function () {
      _export("ImageAsset", ImageAsset = (_dec = ccclass('cc.ImageAsset'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Asset) {
        _inheritsLoose(ImageAsset, _Asset);

        function ImageAsset(nativeAsset) {
          var _this;

          _this = _Asset.call(this) || this;
          _this._nativeData = void 0;
          _this._tex = void 0;
          _this._exportedExts = undefined;
          _this._format = PixelFormat.RGBA8888;
          _this._width = 0;
          _this._height = 0;
          _this.loaded = false;
          _this._nativeData = {
            _data: null,
            width: 0,
            height: 0,
            format: 0,
            _compressed: false
          };

          if (EDITOR) {
            _this._exportedExts = null;
          }

          if (nativeAsset !== undefined) {
            _this.reset(nativeAsset);
          }

          return _this;
        }
        /**
         * @en Reset the source of the image asset.
         * @zh 重置此图像资源使用的原始图像源。
         * @param data The new source
         */


        var _proto = ImageAsset.prototype;

        _proto.reset = function reset(data) {
          var _this2 = this;

          if (isImageBitmap(data)) {
            this._nativeData = data;

            this._onDataComplete();
          } else if (!(data instanceof HTMLElement)) {
            // this._nativeData = Object.create(data);
            this._nativeData = data;
            this._format = data.format;

            this._onDataComplete();
          } else {
            this._nativeData = data;

            if (MINIGAME || data.complete || data instanceof HTMLCanvasElement) {
              // todo need adatper
              this._onDataComplete();
            } else {
              this.loaded = false;
              data.addEventListener('load', function () {
                _this2._onDataComplete();
              });
              data.addEventListener('error', function (err) {
                warnID(3119, err.message);
              });
            }
          }
        };

        _proto.destroy = function destroy() {
          if (this.data && this.data instanceof HTMLImageElement) {
            this.data.src = '';

            this._setRawAsset(''); // @ts-expect-error JSB element should destroy native data.


            if (JSB) this.data.destroy();
          } else if (isImageBitmap(this.data)) {
            this.data.close && this.data.close();
          }

          return _Asset.prototype.destroy.call(this);
        } // SERIALIZATION
        ;

        _proto._serialize = function _serialize() {
          if (EDITOR || TEST) {
            var targetExtensions = this._exportedExts;

            if (!targetExtensions && this._native) {
              targetExtensions = [this._native];
            }

            if (!targetExtensions) {
              return '';
            }

            var extensionIndices = [];

            for (var _iterator = _createForOfIteratorHelperLoose(targetExtensions), _step; !(_step = _iterator()).done;) {
              var targetExtension = _step.value;
              var extensionFormat = targetExtension.split('@');
              var i = ImageAsset.extnames.indexOf(extensionFormat[0]);
              var exportedExtensionID = i < 0 ? targetExtension : "" + i;

              if (extensionFormat[1]) {
                exportedExtensionID += "@" + extensionFormat[1];
              }

              extensionIndices.push(exportedExtensionID);
            }

            return {
              fmt: extensionIndices.join('_'),
              w: this.width,
              h: this.height
            };
          }
        };

        _proto._deserialize = function _deserialize(data) {
          var fmtStr = '';

          if (typeof data === 'string') {
            fmtStr = data;
          } else {
            this._width = data.w;
            this._height = data.h;
            fmtStr = data.fmt;
          }

          var device = _getGlobalDevice();

          var extensionIDs = fmtStr.split('_');
          var defaultExt = '';
          var preferedExtensionIndex = Number.MAX_VALUE;
          var format = this._format;
          var ext = '';
          var SupportTextureFormats = legacyCC.macro.SUPPORT_TEXTURE_FORMATS;

          for (var _iterator2 = _createForOfIteratorHelperLoose(extensionIDs), _step2; !(_step2 = _iterator2()).done;) {
            var extensionID = _step2.value;
            var extFormat = extensionID.split('@');
            var i = parseInt(extFormat[0], undefined);
            var tmpExt = ImageAsset.extnames[i] || extFormat[0];
            var index = SupportTextureFormats.indexOf(tmpExt);

            if (index !== -1 && index < preferedExtensionIndex) {
              var fmt = extFormat[1] ? parseInt(extFormat[1]) : this._format; // check whether or not support compressed texture

              if (tmpExt === '.astc' && (!device || !device.hasFeature(Feature.FORMAT_ASTC))) {
                continue;
              } else if (tmpExt === '.pvr' && (!device || !device.hasFeature(Feature.FORMAT_PVRTC))) {
                continue;
              } else if ((fmt === PixelFormat.RGB_ETC1 || fmt === PixelFormat.RGBA_ETC1) && (!device || !device.hasFeature(Feature.FORMAT_ETC1))) {
                continue;
              } else if ((fmt === PixelFormat.RGB_ETC2 || fmt === PixelFormat.RGBA_ETC2) && (!device || !device.hasFeature(Feature.FORMAT_ETC2))) {
                continue;
              } else if (tmpExt === '.webp' && !legacyCC.sys.capabilities.webp) {
                continue;
              }

              preferedExtensionIndex = index;
              ext = tmpExt;
              format = fmt;
            } else if (!defaultExt) {
              defaultExt = tmpExt;
            }
          }

          if (ext) {
            this._setRawAsset(ext);

            this._format = format;
          } else if (defaultExt) {
            this._setRawAsset(defaultExt);

            warnID(3120, defaultExt, defaultExt);
          } else {
            warnID(3121);
          }
        };

        _proto._onDataComplete = function _onDataComplete() {
          this.loaded = true;
          this.emit('load');
        };

        _proto.initDefault = function initDefault(uuid) {
          _Asset.prototype.initDefault.call(this, uuid);

          if (!ImageAsset._sharedPlaceHolderCanvas) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var l = canvas.width = canvas.height = 2;
            context.fillStyle = '#ff00ff';
            context.fillRect(0, 0, l, l);
            this.reset(canvas);
            ImageAsset._sharedPlaceHolderCanvas = canvas;
          } else {
            this.reset(ImageAsset._sharedPlaceHolderCanvas);
          }
        };

        _proto.validate = function validate() {
          return !!this.data;
        };

        _createClass(ImageAsset, [{
          key: "_nativeAsset",
          get: function get() {
            // Maybe returned to pool in webgl.
            return this._nativeData;
          },
          set: function set(value) {
            if (!(value instanceof HTMLElement) && !isImageBitmap(value)) {
              value.format = value.format || this._format;
            }

            this.reset(value);
          }
          /**
           * @en Image data.
           * @zh 此图像资源的图像数据。
           */

        }, {
          key: "data",
          get: function get() {
            if (this._nativeData && isNativeImage(this._nativeData)) {
              return this._nativeData;
            }

            return this._nativeData && this._nativeData._data;
          }
          /**
           * @en The pixel width of the image.
           * @zh 此图像资源的像素宽度。
           */

        }, {
          key: "width",
          get: function get() {
            return this._nativeData.width || this._width;
          }
          /**
           * @en The pixel height of the image.
           * @zh 此图像资源的像素高度。
           */

        }, {
          key: "height",
          get: function get() {
            return this._nativeData.height || this._height;
          }
          /**
           * @en The pixel format of the image.
           * @zh 此图像资源的像素格式。
           */

        }, {
          key: "format",
          get: function get() {
            return this._format;
          }
          /**
           * @en Whether the image is in compressed texture format.
           * @zh 此图像资源是否为压缩像素格式。
           */

        }, {
          key: "isCompressed",
          get: function get() {
            return this._format >= PixelFormat.RGB_ETC1 && this._format <= PixelFormat.RGBA_ASTC_12x12 || this._format >= PixelFormat.RGB_A_PVRTC_2BPPV1 && this._format <= PixelFormat.RGBA_ETC1;
          }
          /**
           * @en The original source image URL, it could be empty.
           * @zh 此图像资源的原始图像源的 URL。当原始图像元不是 HTML 文件时可能为空。
           * @deprecated Please use [[nativeUrl]]
           */

        }, {
          key: "url",
          get: function get() {
            return this.nativeUrl;
          }
          /**
           * @private
           */

        }, {
          key: "_texture",
          get: function get() {
            if (!this._tex) {
              var tex = new legacyCC.Texture2D();
              tex.name = this.nativeUrl;
              tex.image = this;
              this._tex = tex;
            }

            return this._tex;
          },
          set: function set(tex) {
            this._tex = tex;
          }
        }]);

        return ImageAsset;
      }(Asset), _class3.extnames = ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.pvr', '.pkm', '.astc'], _class3._sharedPlaceHolderCanvas = null, _temp), (_applyDecoratedDescriptor(_class2.prototype, "_nativeAsset", [override], Object.getOwnPropertyDescriptor(_class2.prototype, "_nativeAsset"), _class2.prototype)), _class2)) || _class));

      legacyCC.ImageAsset = ImageAsset;
    }
  };
});