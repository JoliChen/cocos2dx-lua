System.register("q-bundled:///fs/cocos/2d/assembler/label/font-utils.js", ["../../assets/bitmap-font.js", "../../../core/math/index.js", "../../../core/assets/index.js", "../../../core/assets/asset-enum.js", "../../../core/gfx/index.js", "../../utils/text-utils.js", "../../../core/director.js", "../../../core/index.js"], function (_export, _context) {
  "use strict";

  var FontAtlas, Color, ImageAsset, Texture2D, PixelFormat, BufferTextureCopy, safeMeasureText, BASELINE_RATIO, MIDDLE_RATIO, getBaselineOffset, director, Director, macro, warnID, _canvasPool, CanvasPool, WHITE, space, bleed, FontLetterDefinition, _backgroundStyle, BASELINE_OFFSET, LetterTexture, LetterRenderTexture, LetterAtlas, shareLabelInfo;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function computeHash(labelInfo) {
    var hashData = '';
    var color = labelInfo.color.toHEX();
    var out = '';

    if (labelInfo.isOutlined && labelInfo.margin > 0) {
      out = out + labelInfo.margin + labelInfo.out.toHEX();
    }

    return hashData + labelInfo.fontSize + labelInfo.fontFamily + color + out;
  }

  _export("computeHash", computeHash);

  return {
    setters: [function (_assetsBitmapFontJs) {
      FontAtlas = _assetsBitmapFontJs.FontAtlas;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_coreAssetsIndexJs) {
      ImageAsset = _coreAssetsIndexJs.ImageAsset;
      Texture2D = _coreAssetsIndexJs.Texture2D;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }, function (_coreGfxIndexJs) {
      BufferTextureCopy = _coreGfxIndexJs.BufferTextureCopy;
    }, function (_utilsTextUtilsJs) {
      safeMeasureText = _utilsTextUtilsJs.safeMeasureText;
      BASELINE_RATIO = _utilsTextUtilsJs.BASELINE_RATIO;
      MIDDLE_RATIO = _utilsTextUtilsJs.MIDDLE_RATIO;
      getBaselineOffset = _utilsTextUtilsJs.getBaselineOffset;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
      Director = _coreDirectorJs.Director;
    }, function (_coreIndexJs) {
      macro = _coreIndexJs.macro;
      warnID = _coreIndexJs.warnID;
    }],
    execute: function () {
      _export("CanvasPool", CanvasPool = /*#__PURE__*/function () {
        function CanvasPool() {
          this.pool = [];
        }

        CanvasPool.getInstance = function getInstance() {
          if (!_canvasPool) {
            _canvasPool = new CanvasPool();
          }

          return _canvasPool;
        };

        var _proto = CanvasPool.prototype;

        _proto.get = function get() {
          var data = this.pool.pop();

          if (!data) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            data = {
              canvas: canvas,
              context: context
            };
          }

          return data;
        };

        _proto.put = function put(canvas) {
          if (this.pool.length >= macro.MAX_LABEL_CANVAS_POOL_SIZE) {
            return;
          }

          this.pool.push(canvas);
        };

        return CanvasPool;
      }()); // export function packToDynamicAtlas(comp, frame) {
      //     // TODO: Material API design and export from editor could affect the material activation process
      //     // need to update the logic here
      //     if (frame && !TEST) {
      //         if (!frame._original && dynamicAtlasManager) {
      //             let packedFrame = dynamicAtlasManager.insertSpriteFrame(frame);
      //             if (packedFrame) {
      //                 frame._setDynamicAtlasFrame(packedFrame);
      //             }
      //         }
      //         if (comp.sharedMaterials[0].getProperty('texture') !== frame._texture) {
      //             comp._activateMaterial();
      //         }
      //     }
      // }


      WHITE = Color.WHITE.clone();
      space = 0;
      bleed = 2;

      FontLetterDefinition = function FontLetterDefinition() {
        this.u = 0;
        this.v = 0;
        this.w = 0;
        this.h = 0;
        this.texture = null;
        this.offsetX = 0;
        this.offsetY = 0;
        this.valid = false;
        this.xAdvance = 0;
      };

      _backgroundStyle = "rgba(255, 255, 255, " + (1 / 255).toFixed(3) + ")";
      BASELINE_OFFSET = getBaselineOffset();

      LetterTexture = /*#__PURE__*/function () {
        function LetterTexture(_char, labelInfo) {
          this.image = null;
          this.labelInfo = void 0;
          this["char"] = void 0;
          this.data = null;
          this.canvas = null;
          this.context = null;
          this.width = 0;
          this.height = 0;
          this.offsetY = 0;
          this.hash = void 0;
          this["char"] = _char;
          this.labelInfo = labelInfo;
          this.hash = _char.charCodeAt(0) + labelInfo.hash;
        }

        var _proto2 = LetterTexture.prototype;

        _proto2.updateRenderData = function updateRenderData() {
          this._updateProperties();

          this._updateTexture();
        };

        _proto2.destroy = function destroy() {
          this.image = null; // Label._canvasPool.put(this._data);
        };

        _proto2._updateProperties = function _updateProperties() {
          this.data = CanvasPool.getInstance().get();
          this.canvas = this.data.canvas;
          this.context = this.data.context;

          if (this.context) {
            this.context.font = this.labelInfo.fontDesc;
            var width = safeMeasureText(this.context, this["char"], this.labelInfo.fontDesc);
            var blank = this.labelInfo.margin * 2 + bleed;
            this.width = parseFloat(width.toFixed(2)) + blank;
            this.height = (1 + BASELINE_RATIO) * this.labelInfo.fontSize + blank;
            this.offsetY = -(this.labelInfo.fontSize * BASELINE_RATIO) / 2;
          }

          if (this.canvas.width !== this.width) {
            this.canvas.width = this.width;
          }

          if (this.canvas.height !== this.height) {
            this.canvas.height = this.height;
          }

          if (!this.image) {
            this.image = new ImageAsset();
          }

          this.image.reset(this.canvas);
        };

        _proto2._updateTexture = function _updateTexture() {
          if (!this.context || !this.canvas) {
            return;
          }

          var context = this.context;
          var labelInfo = this.labelInfo;
          var width = this.canvas.width;
          var height = this.canvas.height;
          context.textAlign = 'center';
          context.textBaseline = 'alphabetic';
          context.clearRect(0, 0, width, height); // Add a white background to avoid black edges.

          context.fillStyle = _backgroundStyle;
          context.fillRect(0, 0, width, height);
          context.font = labelInfo.fontDesc;
          var fontSize = labelInfo.fontSize;
          var startX = width / 2;
          var startY = height / 2 + fontSize * MIDDLE_RATIO + fontSize * BASELINE_OFFSET;
          var color = labelInfo.color; // use round for line join to avoid sharp intersect point

          context.lineJoin = 'round';
          context.fillStyle = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + 1 + ")";

          if (labelInfo.isOutlined) {
            var strokeColor = labelInfo.out || WHITE;
            context.strokeStyle = "rgba(" + strokeColor.r + ", " + strokeColor.g + ", " + strokeColor.b + ", " + strokeColor.a / 255 + ")";
            context.lineWidth = labelInfo.margin * 2;
            context.strokeText(this["char"], startX, startY);
          }

          context.fillText(this["char"], startX, startY); // this.texture.handleLoadedTexture();
          // (this.image as Texture2D).updateImage();
        };

        return LetterTexture;
      }();

      _export("LetterRenderTexture", LetterRenderTexture = /*#__PURE__*/function (_Texture2D) {
        _inheritsLoose(LetterRenderTexture, _Texture2D);

        function LetterRenderTexture() {
          return _Texture2D.apply(this, arguments) || this;
        }

        var _proto3 = LetterRenderTexture.prototype;

        /**
         * @en
         * Init the render texture with size.
         * @zh
         * 初始化 render texture。
         * @param [width]
         * @param [height]
         * @param [string]
         */
        _proto3.initWithSize = function initWithSize(width, height, format) {
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

        _proto3.drawTextureAt = function drawTextureAt(image, x, y) {
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

        return LetterRenderTexture;
      }(Texture2D));

      _export("LetterAtlas", LetterAtlas = /*#__PURE__*/function () {
        function LetterAtlas(width, height) {
          this._x = space;
          this._y = space;
          this._nextY = space;
          this._width = 0;
          this._height = 0;
          this._halfBleed = 0;
          this._dirty = false;
          var texture = new LetterRenderTexture();
          texture.initWithSize(width, height);
          this.fontDefDictionary = new FontAtlas(texture);
          this._halfBleed = bleed / 2;
          this._width = width;
          this._height = height;
          director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLoad, this);
        }

        var _proto4 = LetterAtlas.prototype;

        _proto4.insertLetterTexture = function insertLetterTexture(letterTexture) {
          var texture = letterTexture.image;
          var device = director.root.device;

          if (!texture || !this.fontDefDictionary || !device) {
            return null;
          }

          var width = texture.width;
          var height = texture.height;

          if (this._x + width + space > this._width) {
            this._x = space;
            this._y = this._nextY;
          }

          if (this._y + height > this._nextY) {
            this._nextY = this._y + height + space;
          }

          if (this._nextY > this._height) {
            warnID(12100);
            return null;
          }

          this.fontDefDictionary.texture.drawTextureAt(texture, this._x, this._y);
          this._dirty = true;
          var letterDefinition = new FontLetterDefinition();
          letterDefinition.u = this._x + this._halfBleed;
          letterDefinition.v = this._y + this._halfBleed;
          letterDefinition.texture = this.fontDefDictionary.texture;
          letterDefinition.valid = true;
          letterDefinition.w = letterTexture.width - bleed;
          letterDefinition.h = letterTexture.height - bleed;
          letterDefinition.xAdvance = letterDefinition.w;
          letterDefinition.offsetY = letterTexture.offsetY;
          this._x += width + space;
          this.fontDefDictionary.addLetterDefinitions(letterTexture.hash, letterDefinition);
          /*
          const region = new BufferTextureCopy();
          region.texOffset.x = letterDefinition.offsetX;
          region.texOffset.y = letterDefinition.offsetY;
          region.texExtent.width = letterDefinition.w;
          region.texExtent.height = letterDefinition.h;
          */

          return letterDefinition;
        };

        _proto4.update = function update() {
          if (!this._dirty) {
            return;
          } // this.texture.update();


          this._dirty = false;
        };

        _proto4.reset = function reset() {
          this._x = space;
          this._y = space;
          this._nextY = space; // const chars = this.letterDefinitions;
          // for (let i = 0, l = (Object.keys(chars)).length; i < l; i++) {
          //     const char = chars[i];
          //     if (!char.valid) {
          //         continue;
          //     }
          //     char.destroy();
          // }
          // this.letterDefinitions = createMap();

          this.fontDefDictionary.clear();
        };

        _proto4.destroy = function destroy() {
          this.reset();

          if (this.fontDefDictionary) {
            this.fontDefDictionary.texture.destroy();
            this.fontDefDictionary.texture = null;
          }
        };

        _proto4.getTexture = function getTexture() {
          return this.fontDefDictionary.getTexture();
        };

        _proto4.beforeSceneLoad = function beforeSceneLoad() {
          this.clearAllCache();
        };

        _proto4.clearAllCache = function clearAllCache() {
          this.destroy();
          var texture = new LetterRenderTexture();
          texture.initWithSize(this._width, this._height);
          this.fontDefDictionary.texture = texture;
        };

        _proto4.getLetter = function getLetter(key) {
          return this.fontDefDictionary.letterDefinitions[key];
        };

        _proto4.getLetterDefinitionForChar = function getLetterDefinitionForChar(_char2, labelInfo) {
          var hash = _char2.charCodeAt(0) + labelInfo.hash;
          var letter = this.fontDefDictionary.letterDefinitions[hash];

          if (!letter) {
            var temp = new LetterTexture(_char2, labelInfo);
            temp.updateRenderData();
            letter = this.insertLetterTexture(temp);
            temp.destroy();
          }

          return letter;
        };

        _createClass(LetterAtlas, [{
          key: "width",
          get: function get() {
            return this._width;
          }
        }, {
          key: "height",
          get: function get() {
            return this._height;
          }
        }]);

        return LetterAtlas;
      }());

      _export("shareLabelInfo", shareLabelInfo = {
        fontAtlas: null,
        fontSize: 0,
        lineHeight: 0,
        hAlign: 0,
        vAlign: 0,
        hash: '',
        fontFamily: '',
        fontDesc: 'Arial',
        color: Color.WHITE.clone(),
        isOutlined: false,
        out: Color.WHITE.clone(),
        margin: 0
      });
    }
  };
});