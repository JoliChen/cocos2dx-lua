System.register("q-bundled:///fs/cocos/2d/utils/dynamic-atlas/atlas.js", ["../../../core/assets/asset-enum.js", "../../../core/assets/texture-2d.js", "../../../core/gfx/index.js", "../../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var PixelFormat, Texture2D, BufferTextureCopy, legacyCC, space, Atlas, DynamicAtlasTexture;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }, function (_coreAssetsTexture2dJs) {
      Texture2D = _coreAssetsTexture2dJs.Texture2D;
    }, function (_coreGfxIndexJs) {
      BufferTextureCopy = _coreGfxIndexJs.BufferTextureCopy;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      space = 2;

      _export("Atlas", Atlas = /*#__PURE__*/function () {
        function Atlas(width, height) {
          this._texture = void 0;
          this._width = void 0;
          this._height = void 0;
          this._x = void 0;
          this._y = void 0;
          this._nexty = void 0;
          this._innerTextureInfos = {};
          this._innerSpriteFrames = void 0;
          this._count = void 0;
          var texture = new DynamicAtlasTexture();
          texture.initWithSize(width, height);
          this._texture = texture;
          this._width = width;
          this._height = height;
          this._x = space;
          this._y = space;
          this._nexty = space;
          this._innerTextureInfos = {};
          this._innerSpriteFrames = [];
          this._count = 0;
        }

        var _proto = Atlas.prototype;

        _proto.insertSpriteFrame = function insertSpriteFrame(spriteFrame) {
          var rect = spriteFrame.rect; // Todo:No renderTexture

          var texture = spriteFrame.texture;

          var info = this._innerTextureInfos[texture.getId()];

          var sx = rect.x;
          var sy = rect.y;

          if (info) {
            sx += info.x;
            sy += info.y;
          } else {
            var width = texture.width;
            var height = texture.height;

            if (this._x + width + space > this._width) {
              this._x = space;
              this._y = this._nexty;
            }

            if (this._y + height + space > this._nexty) {
              this._nexty = this._y + height + space;
            }

            if (this._nexty > this._height) {
              return null;
            }

            if (legacyCC.internal.dynamicAtlasManager.textureBleeding) {
              // Smaller frame is more likely to be affected by linear filter
              if (width <= 8 || height <= 8) {
                this._texture.drawTextureAt(texture.image, this._x - 1, this._y - 1);

                this._texture.drawTextureAt(texture.image, this._x - 1, this._y + 1);

                this._texture.drawTextureAt(texture.image, this._x + 1, this._y - 1);

                this._texture.drawTextureAt(texture.image, this._x + 1, this._y + 1);
              }

              this._texture.drawTextureAt(texture.image, this._x - 1, this._y);

              this._texture.drawTextureAt(texture.image, this._x + 1, this._y);

              this._texture.drawTextureAt(texture.image, this._x, this._y - 1);

              this._texture.drawTextureAt(texture.image, this._x, this._y + 1);
            }

            this._texture.drawTextureAt(texture.image, this._x, this._y);

            this._innerTextureInfos[texture.getId()] = {
              x: this._x,
              y: this._y,
              texture: texture
            };
            this._count++;
            sx += this._x;
            sy += this._y;
            this._x += width + space;
          }

          var frame = {
            x: sx,
            y: sy,
            texture: this._texture
          };

          this._innerSpriteFrames.push(spriteFrame);

          return frame;
        };

        _proto.deleteInnerTexture = function deleteInnerTexture(texture) {
          if (texture && this._innerTextureInfos[texture.getId()]) {
            delete this._innerTextureInfos[texture.getId()];
            this._count--;
          }
        };

        _proto.isEmpty = function isEmpty() {
          return this._count <= 0;
        };

        _proto.reset = function reset() {
          this._x = space;
          this._y = space;
          this._nexty = space;
          var frames = this._innerSpriteFrames;

          for (var i = 0, l = frames.length; i < l; i++) {
            var frame = frames[i];

            if (!frame.isValid) {
              continue;
            }

            frame._resetDynamicAtlasFrame();
          }

          this._innerSpriteFrames.length = 0;
          this._innerTextureInfos = {};
        };

        _proto.destroy = function destroy() {
          this.reset();

          this._texture.destroy();
        };

        return Atlas;
      }());

      _export("DynamicAtlasTexture", DynamicAtlasTexture = /*#__PURE__*/function (_Texture2D) {
        _inheritsLoose(DynamicAtlasTexture, _Texture2D);

        function DynamicAtlasTexture() {
          return _Texture2D.apply(this, arguments) || this;
        }

        var _proto2 = DynamicAtlasTexture.prototype;

        /**
         * @en
         * Init the render texture with size.
         * @zh
         * 初始化 render texture。
         */
        _proto2.initWithSize = function initWithSize(width, height, format) {
          if (format === void 0) {
            format = PixelFormat.RGBA8888;
          }

          this.reset({
            width: width,
            height: height,
            format: format
          });
          this.loaded = true;
          this.emit('load');
        }
        /**
         * @en Draw a texture to the specified position
         * @zh 将指定的图片渲染到指定的位置上。
         * @param {Texture2D} image
         * @param {Number} x
         * @param {Number} y
         */
        ;

        _proto2.drawTextureAt = function drawTextureAt(image, x, y) {
          var gfxTexture = this.getGFXTexture();

          if (!image || !gfxTexture) {
            return;
          }

          var gfxDevice = this._getGFXDevice();

          if (!gfxDevice) {
            console.warn('Unable to get device');
            return;
          }

          var region = new BufferTextureCopy();
          region.texOffset.x = x;
          region.texOffset.y = y;
          region.texExtent.width = image.width;
          region.texExtent.height = image.height;
          gfxDevice.copyTexImagesToTexture([image.data], gfxTexture, [region]);
        };

        return DynamicAtlasTexture;
      }(Texture2D));
    }
  };
});