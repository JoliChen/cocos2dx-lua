"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.CacheMode = exports.Overflow = exports.VerticalTextAlignment = exports.HorizontalTextAlignment = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../assets/index.js");

var _index3 = require("../../core/assets/index.js");

var _enum = require("../../core/value-types/enum.js");

var _fontUtils = require("../assembler/label/font-utils.js");

var _renderable2d = require("../framework/renderable-2d.js");

var _textureBase = require("../../core/assets/texture-base.js");

var _assetEnum = require("../../core/assets/asset-enum.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en Enum for horizontal text alignment.
 *
 * @zh 文本横向对齐类型。
 */
let HorizontalTextAlignment;
exports.HorizontalTextAlignment = HorizontalTextAlignment;

(function (HorizontalTextAlignment) {
  HorizontalTextAlignment[HorizontalTextAlignment["LEFT"] = 0] = "LEFT";
  HorizontalTextAlignment[HorizontalTextAlignment["CENTER"] = 1] = "CENTER";
  HorizontalTextAlignment[HorizontalTextAlignment["RIGHT"] = 2] = "RIGHT";
})(HorizontalTextAlignment || (exports.HorizontalTextAlignment = HorizontalTextAlignment = {}));

(0, _enum.ccenum)(HorizontalTextAlignment);
/**
 * @en Enum for vertical text alignment.
 *
 * @zh 文本垂直对齐类型。
 */

let VerticalTextAlignment;
exports.VerticalTextAlignment = VerticalTextAlignment;

(function (VerticalTextAlignment) {
  VerticalTextAlignment[VerticalTextAlignment["TOP"] = 0] = "TOP";
  VerticalTextAlignment[VerticalTextAlignment["CENTER"] = 1] = "CENTER";
  VerticalTextAlignment[VerticalTextAlignment["BOTTOM"] = 2] = "BOTTOM";
})(VerticalTextAlignment || (exports.VerticalTextAlignment = VerticalTextAlignment = {}));

(0, _enum.ccenum)(VerticalTextAlignment);
/**
 * @en Enum for Overflow.
 *
 * @zh 文本超载类型。
 */

let Overflow;
exports.Overflow = Overflow;

(function (Overflow) {
  Overflow[Overflow["NONE"] = 0] = "NONE";
  Overflow[Overflow["CLAMP"] = 1] = "CLAMP";
  Overflow[Overflow["SHRINK"] = 2] = "SHRINK";
  Overflow[Overflow["RESIZE_HEIGHT"] = 3] = "RESIZE_HEIGHT";
})(Overflow || (exports.Overflow = Overflow = {}));

(0, _enum.ccenum)(Overflow);
/**
 * @en Enum for cache mode.
 *
 * @zh 文本图集缓存类型。
 */

let CacheMode;
exports.CacheMode = CacheMode;

(function (CacheMode) {
  CacheMode[CacheMode["NONE"] = 0] = "NONE";
  CacheMode[CacheMode["BITMAP"] = 1] = "BITMAP";
  CacheMode[CacheMode["CHAR"] = 2] = "CHAR";
})(CacheMode || (exports.CacheMode = CacheMode = {}));

(0, _enum.ccenum)(CacheMode);
/**
 * @zh
 * Type 类型。
 */

/**
 * @zh
 * TTF字体。
 */

/**
 * @zh
 * 位图字体。
 */

/**
 * @zh
 * 系统字体。
 */

/**
 * @en
 * The Label Component.
 *
 * @zh
 * 文字标签组件。
 */

let Label = (_dec = (0, _index.ccclass)('cc.Label'), _dec2 = (0, _index.help)('i18n:cc.Label'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('2D/Label'), _dec5 = (0, _index.displayOrder)(4), _dec6 = (0, _index.tooltip)('i18n:label.string'), _dec7 = (0, _index.type)(HorizontalTextAlignment), _dec8 = (0, _index.displayOrder)(5), _dec9 = (0, _index.tooltip)('i18n:label.horizontal_align'), _dec10 = (0, _index.type)(VerticalTextAlignment), _dec11 = (0, _index.displayOrder)(6), _dec12 = (0, _index.tooltip)('i18n:label.vertical_align'), _dec13 = (0, _index.displayOrder)(7), _dec14 = (0, _index.tooltip)('i18n:label.font_size'), _dec15 = (0, _index.displayOrder)(8), _dec16 = (0, _index.visible)(function () {
  return !this._isSystemFontUsed;
}), _dec17 = (0, _index.tooltip)('i18n:label.font_family'), _dec18 = (0, _index.displayOrder)(8), _dec19 = (0, _index.tooltip)('i18n:label.line_height'), _dec20 = (0, _index.type)(Overflow), _dec21 = (0, _index.displayOrder)(9), _dec22 = (0, _index.tooltip)('i18n:label.overflow'), _dec23 = (0, _index.displayOrder)(10), _dec24 = (0, _index.tooltip)('i18n:label.wrap'), _dec25 = (0, _index.type)(_index2.Font), _dec26 = (0, _index.displayOrder)(11), _dec27 = (0, _index.visible)(function () {
  return !this._isSystemFontUsed;
}), _dec28 = (0, _index.tooltip)('i18n:label.font'), _dec29 = (0, _index.displayOrder)(12), _dec30 = (0, _index.tooltip)('i18n:label.system_font'), _dec31 = (0, _index.type)(CacheMode), _dec32 = (0, _index.displayOrder)(13), _dec33 = (0, _index.tooltip)('i18n:label.cache_mode'), _dec34 = (0, _index.displayOrder)(15), _dec35 = (0, _index.tooltip)('i18n:label.font_bold'), _dec36 = (0, _index.displayOrder)(16), _dec37 = (0, _index.tooltip)('i18n:label.font_italic'), _dec38 = (0, _index.displayOrder)(17), _dec39 = (0, _index.tooltip)('i18n:label.font_underline'), _dec40 = (0, _index.visible)(function () {
  return this._isUnderline;
}), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class Label extends _renderable2d.Renderable2D {
  /**
   * @en
   * Content string of label.
   *
   * @zh
   * 标签显示的文本内容。
   */
  get string() {
    return this._string;
  }

  set string(value) {
    value += '';

    if (this._string === value) {
      return;
    }

    this._string = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Horizontal Alignment of label.
   *
   * @zh
   * 文本内容的水平对齐方式。
   */


  get horizontalAlign() {
    return this._horizontalAlign;
  }

  set horizontalAlign(value) {
    if (this._horizontalAlign === value) {
      return;
    }

    this._horizontalAlign = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Vertical Alignment of label.
   *
   * @zh
   * 文本内容的垂直对齐方式。
   */


  get verticalAlign() {
    return this._verticalAlign;
  }

  set verticalAlign(value) {
    if (this._verticalAlign === value) {
      return;
    }

    this._verticalAlign = value;
    this.updateRenderData();
  }
  /**
   * @en
   * The actual rendering font size in shrink mode.
   *
   * @zh
   * SHRINK 模式下面文本实际渲染的字体大小。
   */


  get actualFontSize() {
    return this._actualFontSize;
  }

  set actualFontSize(value) {
    this._actualFontSize = value;
  }
  /**
   * @en
   * Font size of label.
   *
   * @zh
   * 文本字体大小。
   */


  get fontSize() {
    return this._fontSize;
  }

  set fontSize(value) {
    if (this._fontSize === value) {
      return;
    }

    this._fontSize = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Font family of label, only take effect when useSystemFont property is true.
   *
   * @zh
   * 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
   */


  get fontFamily() {
    return this._fontFamily;
  }

  set fontFamily(value) {
    if (this._fontFamily === value) {
      return;
    }

    this._fontFamily = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Line Height of label.
   *
   * @zh
   * 文本行高。
   */


  get lineHeight() {
    return this._lineHeight;
  }

  set lineHeight(value) {
    if (this._lineHeight === value) {
      return;
    }

    this._lineHeight = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Overflow of label.
   *
   * @zh
   * 文字显示超出范围时的处理方式。
   */


  get overflow() {
    return this._overflow;
  }

  set overflow(value) {
    if (this._overflow === value) {
      return;
    }

    this._overflow = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Whether auto wrap label when string width is large than label width.
   *
   * @zh
   * 是否自动换行。
   */


  get enableWrapText() {
    return this._enableWrapText;
  }

  set enableWrapText(value) {
    if (this._enableWrapText === value) {
      return;
    }

    this._enableWrapText = value;
    this.updateRenderData();
  }
  /**
   * @en
   * The font of label.
   *
   * @zh
   * 文本字体。
   */


  get font() {
    // return this._N$file;
    return this._font;
  }

  set font(value) {
    if (this._font === value) {
      return;
    } // if delete the font, we should change isSystemFontUsed to true


    this._isSystemFontUsed = !value;

    if (_internal253Aconstants.EDITOR && value) {
      this._userDefinedFont = value;
    } // this._N$file = value;


    this._font = value; // if (value && this._isSystemFontUsed)
    //     this._isSystemFontUsed = false;

    if (this._renderData) {
      this.destroyRenderData();
      this._renderData = null;
    }

    this._fontAtlas = null;
    this.updateRenderData(true);
  }
  /**
   * @en
   * Whether use system font name or not.
   *
   * @zh
   * 是否使用系统字体。
   */


  get useSystemFont() {
    return this._isSystemFontUsed;
  }

  set useSystemFont(value) {
    if (this._isSystemFontUsed === value) {
      return;
    }

    this.destroyRenderData();
    this._renderData = null;

    if (_internal253Aconstants.EDITOR) {
      if (!value && this._isSystemFontUsed && this._userDefinedFont) {
        this.font = this._userDefinedFont;
        this.spacingX = this._spacingX;
        return;
      }
    }

    this._isSystemFontUsed = !!value;

    if (value) {
      this.font = null;
    }

    this._flushAssembler();

    this.updateRenderData();
  }
  /**
   * @en
   * The cache mode of label. This mode only supports system fonts.
   *
   * @zh
   * 文本缓存模式, 该模式只支持系统字体。
   */


  get cacheMode() {
    return this._cacheMode;
  }

  set cacheMode(value) {
    if (this._cacheMode === value) {
      return;
    }

    if (this._cacheMode === CacheMode.BITMAP && !(this._font instanceof _index2.BitmapFont) && this._ttfSpriteFrame) {
      this._ttfSpriteFrame._resetDynamicAtlasFrame();
    }

    if (this._cacheMode === CacheMode.CHAR) {
      this._ttfSpriteFrame = null;
    }

    this._cacheMode = value;
    this.updateRenderData(true);
  }

  get spriteFrame() {
    return this._texture;
  }

  get ttfSpriteFrame() {
    return this._ttfSpriteFrame;
  }
  /**
   * @en
   * Whether the font is bold.
   *
   * @zh
   * 字体是否加粗。
   */


  get isBold() {
    return this._isBold;
  }

  set isBold(value) {
    if (this._isBold === value) {
      return;
    }

    this._isBold = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Whether the font is italic.
   *
   * @zh
   * 字体是否倾斜。
   */


  get isItalic() {
    return this._isItalic;
  }

  set isItalic(value) {
    if (this._isItalic === value) {
      return;
    }

    this._isItalic = value;
    this.updateRenderData();
  }
  /**
   * @en
   * Whether the font is underline.
   *
   * @zh
   * 字体是否加下划线。
   */


  get isUnderline() {
    return this._isUnderline;
  }

  set isUnderline(value) {
    if (this._isUnderline === value) {
      return;
    }

    this._isUnderline = value;
    this.updateRenderData();
  }
  /**
   * @en The height of underline.
   * @zh 下划线高度。
   */


  get underlineHeight() {
    return this._underlineHeight;
  }

  set underlineHeight(value) {
    if (this._underlineHeight === value) return;
    this._underlineHeight = value;
    this.updateRenderData();
  }

  get assemblerData() {
    return this._assemblerData;
  }

  get fontAtlas() {
    return this._fontAtlas;
  }

  set fontAtlas(value) {
    this._fontAtlas = value;
  }

  get spacingX() {
    return this._spacingX;
  }

  set spacingX(value) {
    if (this._spacingX === value) {
      return;
    }

    this._spacingX = value;
    this.updateRenderData();
  }

  get _bmFontOriginalSize() {
    if (this._font instanceof _index2.BitmapFont) {
      return this._font.fontSize;
    } else {
      return -1;
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_string", _descriptor, this);

    _initializerDefineProperty(this, "_horizontalAlign", _descriptor2, this);

    _initializerDefineProperty(this, "_verticalAlign", _descriptor3, this);

    _initializerDefineProperty(this, "_actualFontSize", _descriptor4, this);

    _initializerDefineProperty(this, "_fontSize", _descriptor5, this);

    _initializerDefineProperty(this, "_fontFamily", _descriptor6, this);

    _initializerDefineProperty(this, "_lineHeight", _descriptor7, this);

    _initializerDefineProperty(this, "_overflow", _descriptor8, this);

    _initializerDefineProperty(this, "_enableWrapText", _descriptor9, this);

    _initializerDefineProperty(this, "_font", _descriptor10, this);

    _initializerDefineProperty(this, "_isSystemFontUsed", _descriptor11, this);

    this._spacingX = 0;

    _initializerDefineProperty(this, "_isItalic", _descriptor12, this);

    _initializerDefineProperty(this, "_isBold", _descriptor13, this);

    _initializerDefineProperty(this, "_isUnderline", _descriptor14, this);

    _initializerDefineProperty(this, "_underlineHeight", _descriptor15, this);

    _initializerDefineProperty(this, "_cacheMode", _descriptor16, this);

    this._N$file = null;
    this._texture = null;
    this._ttfSpriteFrame = null;
    this._userDefinedFont = null;
    this._assemblerData = null;
    this._fontAtlas = null;
    this._letterTexture = null;

    if (_internal253Aconstants.EDITOR) {
      this._userDefinedFont = null;
    }

    this._ttfSpriteFrame = null;
  }

  onEnable() {
    super.onEnable(); // TODO: Hack for barbarians

    if (!this._font && !this._isSystemFontUsed) {
      this.useSystemFont = true;
    } // Reapply default font family if necessary


    if (this._isSystemFontUsed && !this._fontFamily) {
      this.fontFamily = 'Arial';
    }

    this.updateRenderData(true);
  }

  onDisable() {
    super.onDisable();
  }

  onDestroy() {
    if (this._assembler && this._assembler.resetAssemblerData) {
      this._assembler.resetAssemblerData(this._assemblerData);
    }

    this._assemblerData = null;

    if (this._ttfSpriteFrame) {
      const tex = this._ttfSpriteFrame.texture;

      if (tex && this._ttfSpriteFrame.original === null) {
        const tex2d = tex;

        if (tex2d.image) {
          tex2d.image.destroy();
        }

        tex.destroy();
      }

      this._ttfSpriteFrame = null;
    } // texture cannot be destroyed in here, lettertexture image source is public.


    this._letterTexture = null;
    super.onDestroy();
  }

  updateRenderData(force = false) {
    this.markForUpdateRenderData();

    if (force) {
      this._flushAssembler(); // Hack: Fixed the bug that richText wants to get the label length by _measureText, _assembler.updateRenderData will update the content size immediately.


      if (this.renderData) this.renderData.vertDirty = true;

      this._applyFontTexture();
    }
  }

  _render(render) {
    render.commitComp(this, this._texture, this._assembler, null);
  }

  _updateColor() {
    // hack for all type
    if (this._font instanceof _index2.BitmapFont) {
      this._updateWorldAlpha();

      this._colorDirty = false;
    } else {
      this._updateWorldAlpha();

      if (this._colorDirty) {
        this.updateRenderData(false);
        this._colorDirty = false;
      } else if (this._cacheAlpha !== this.node._uiProps.opacity && this._renderFlag && this._assembler && this._assembler.updateOpacity) {
        this._assembler.updateOpacity(this);

        this._cacheAlpha = this.node._uiProps.opacity;
      }
    }
  }

  _canRender() {
    if (!super._canRender() || !this._string) {
      return false;
    }

    const font = this._font;

    if (font && font instanceof _index2.BitmapFont) {
      const spriteFrame = font.spriteFrame; // cannot be activated if texture not loaded yet

      if (!spriteFrame || !spriteFrame.textureLoaded()) {
        return false;
      }
    }

    return true;
  }

  _flushAssembler() {
    const assembler = Label.Assembler.getAssembler(this);

    if (this._assembler !== assembler) {
      this.destroyRenderData();
      this._assembler = assembler;
    }

    if (!this._renderData) {
      if (this._assembler && this._assembler.createData) {
        this._renderData = this._assembler.createData(this);
        this._renderData.material = this.material;
      }
    }
  }

  _applyFontTexture() {
    const font = this._font;

    if (font instanceof _index2.BitmapFont) {
      const spriteFrame = font.spriteFrame;

      const onBMFontTextureLoaded = () => {
        // TODO: old texture in material have been released by loader
        this._texture = spriteFrame;
        this.changeMaterialForDefine();

        if (this._assembler) {
          this._assembler.updateRenderData(this);
        }
      }; // cannot be activated if texture not loaded yet


      if (spriteFrame) {
        if (spriteFrame.loaded || spriteFrame.textureLoaded) {
          onBMFontTextureLoaded();
        } else {
          spriteFrame.once('load', onBMFontTextureLoaded, this);
        }
      }
    } else {
      if (this.cacheMode === CacheMode.CHAR) {
        this._letterTexture = this._assembler.getAssemblerData();
        this._texture = this._letterTexture;
      } else if (!this._ttfSpriteFrame) {
        this._ttfSpriteFrame = new _index2.SpriteFrame();
        this._assemblerData = this._assembler.getAssemblerData();
        const image = new _index3.ImageAsset(this._assemblerData.canvas);
        const tex = image._texture;
        this._ttfSpriteFrame.texture = tex;
      }

      if (this.cacheMode !== CacheMode.CHAR) {
        // this._frame._refreshTexture(this._texture);
        this._texture = this._ttfSpriteFrame;
      }

      this.changeMaterialForDefine();
      this._assembler && this._assembler.updateRenderData(this);
    }
  }

  changeMaterialForDefine() {
    if (!this._texture) {
      return;
    }

    let value = false;

    if (this.cacheMode !== CacheMode.CHAR) {
      const spriteFrame = this._texture;
      const texture = spriteFrame.texture;

      if (texture instanceof _textureBase.TextureBase) {
        const format = texture.getPixelFormat();
        value = format === _assetEnum.PixelFormat.RGBA_ETC1 || format === _assetEnum.PixelFormat.RGB_A_PVRTC_4BPPV1 || format === _assetEnum.PixelFormat.RGB_A_PVRTC_2BPPV1;
      }
    }

    if (value) {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.USE_ALPHA_SEPARATED;
    } else {
      this._instanceMaterialType = _renderable2d.InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
    }

    this.updateMaterial();
  }

}, _class3.HorizontalAlign = HorizontalTextAlignment, _class3.VerticalAlign = VerticalTextAlignment, _class3.Overflow = Overflow, _class3.CacheMode = CacheMode, _class3._canvasPool = _fontUtils.CanvasPool.getInstance(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec5, _dec6, _index.multiline], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalAlign", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalAlign", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "fontSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontFamily", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "fontFamily"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineHeight", [_dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "lineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "overflow", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "overflow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableWrapText", [_dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "enableWrapText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec25, _dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useSystemFont", [_dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "useSystemFont"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cacheMode", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "cacheMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isBold", [_dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "isBold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isItalic", [_dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "isItalic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUnderline", [_dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "isUnderline"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "underlineHeight", [_dec40, _index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "underlineHeight"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_string", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'label';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalAlign", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return HorizontalTextAlignment.CENTER;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_verticalAlign", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return VerticalTextAlignment.CENTER;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_actualFontSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fontSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 40;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'Arial';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_lineHeight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 40;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_overflow", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Overflow.NONE;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_enableWrapText", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_font", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_isSystemFontUsed", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_isItalic", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_isBold", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_isUnderline", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_underlineHeight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_cacheMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return CacheMode.NONE;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.Label = Label;