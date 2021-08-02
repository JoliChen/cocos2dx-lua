System.register("q-bundled:///fs/cocos/2d/assets/bitmap-font.js", ["../../core/data/decorators/index.js", "./font.js", "./sprite-frame.js", "../../core/global-exports.js", "../../core/utils/index.js", "../../core/platform/debug.js"], function (_export, _context) {
  "use strict";

  var ccclass, type, serializable, editable, Font, SpriteFrame, legacyCC, js, warn, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, FontLetterDefinition, FontAtlas, BitmapFont;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_fontJs) {
      Font = _fontJs.Font;
    }, function (_spriteFrameJs) {
      SpriteFrame = _spriteFrameJs.SpriteFrame;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreUtilsIndexJs) {
      js = _coreUtilsIndexJs.js;
    }, function (_corePlatformDebugJs) {
      warn = _corePlatformDebugJs.warn;
    }],
    execute: function () {
      _export("FontLetterDefinition", FontLetterDefinition = function FontLetterDefinition() {
        this.u = 0;
        this.v = 0;
        this.w = 0;
        this.h = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.textureID = 0;
        this.valid = false;
        this.xAdvance = 0;
      });

      _export("FontAtlas", FontAtlas = /*#__PURE__*/function () {
        function FontAtlas(texture) {
          this.letterDefinitions = {};
          this.texture = texture;
        }

        var _proto = FontAtlas.prototype;

        _proto.addLetterDefinitions = function addLetterDefinitions(letter, letterDefinition) {
          this.letterDefinitions[letter] = letterDefinition;
        };

        _proto.cloneLetterDefinition = function cloneLetterDefinition() {
          var copyLetterDefinitions = {};

          for (var _i = 0, _Object$keys = Object.keys(this.letterDefinitions); _i < _Object$keys.length; _i++) {
            var _key = _Object$keys[_i];
            var value = new FontLetterDefinition();
            js.mixin(value, this.letterDefinitions[_key]);
            copyLetterDefinitions[_key] = value;
          }

          return copyLetterDefinitions;
        };

        _proto.getTexture = function getTexture() {
          return this.texture;
        };

        _proto.getLetter = function getLetter(key) {
          return this.letterDefinitions[key];
        };

        _proto.getLetterDefinitionForChar = function getLetterDefinitionForChar(_char, labelInfo) {
          var key = _char.charCodeAt(0);

          var hasKey = this.letterDefinitions.hasOwnProperty(key);
          var letter;

          if (hasKey) {
            letter = this.letterDefinitions[key];
          } else {
            letter = null;
          }

          return letter;
        };

        _proto.clear = function clear() {
          this.letterDefinitions = {};
        };

        return FontAtlas;
      }());
      /**
       * @en Class for BitmapFont handling.
       * @zh 位图字体资源类。
       */


      _export("BitmapFont", BitmapFont = (_dec = ccclass('cc.BitmapFont'), _dec2 = type(SpriteFrame), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Font) {
        _inheritsLoose(BitmapFont, _Font);

        function BitmapFont() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this = _Font.call.apply(_Font, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "fntDataStr", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrame", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "fontSize", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "fntConfig", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto2 = BitmapFont.prototype;

        _proto2.onLoaded = function onLoaded() {
          var spriteFrame = this.spriteFrame;

          if (!this.fontDefDictionary && spriteFrame) {
            this.fontDefDictionary = new FontAtlas(spriteFrame.texture);
          }

          var fntConfig = this.fntConfig;

          if (!fntConfig) {
            warn('The fnt config is not exists!');
            return;
          }

          var fontDict = fntConfig.fontDefDictionary;

          for (var fontDef in fontDict) {
            var letter = new FontLetterDefinition();
            var rect = fontDict[fontDef].rect;
            letter.offsetX = fontDict[fontDef].xOffset;
            letter.offsetY = fontDict[fontDef].yOffset;
            letter.w = rect.width;
            letter.h = rect.height;
            letter.u = rect.x;
            letter.v = rect.y; // FIXME: only one texture supported for now

            letter.textureID = 0;
            letter.valid = true;
            letter.xAdvance = fontDict[fontDef].xAdvance;
            this.fontDefDictionary.addLetterDefinitions(fontDef, letter);
          }
        };

        return BitmapFont;
      }(Font), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fntDataStr", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fontSize", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fntConfig", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      legacyCC.BitmapFont = BitmapFont;
    }
  };
});