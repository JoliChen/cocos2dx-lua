System.register("q-bundled:///fs/cocos/2d/components/label.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/index.js", "../../core/assets/index.js", "../../core/value-types/enum.js", "../assembler/label/font-utils.js", "../framework/renderable-2d.js", "../../core/assets/texture-base.js", "../../core/assets/asset-enum.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, displayOrder, visible, multiline, type, serializable, editable, EDITOR, BitmapFont, Font, SpriteFrame, ImageAsset, ccenum, CanvasPool, InstanceMaterialType, Renderable2D, TextureBase, PixelFormat, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp, HorizontalTextAlignment, VerticalTextAlignment, Overflow, CacheMode, Label;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  _export({
    HorizontalTextAlignment: void 0,
    VerticalTextAlignment: void 0,
    Overflow: void 0,
    CacheMode: void 0
  });

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      visible = _coreDataDecoratorsIndexJs.visible;
      multiline = _coreDataDecoratorsIndexJs.multiline;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsIndexJs) {
      BitmapFont = _assetsIndexJs.BitmapFont;
      Font = _assetsIndexJs.Font;
      SpriteFrame = _assetsIndexJs.SpriteFrame;
    }, function (_coreAssetsIndexJs) {
      ImageAsset = _coreAssetsIndexJs.ImageAsset;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_assemblerLabelFontUtilsJs) {
      CanvasPool = _assemblerLabelFontUtilsJs.CanvasPool;
    }, function (_frameworkRenderable2dJs) {
      InstanceMaterialType = _frameworkRenderable2dJs.InstanceMaterialType;
      Renderable2D = _frameworkRenderable2dJs.Renderable2D;
    }, function (_coreAssetsTextureBaseJs) {
      TextureBase = _coreAssetsTextureBaseJs.TextureBase;
    }, function (_coreAssetsAssetEnumJs) {
      PixelFormat = _coreAssetsAssetEnumJs.PixelFormat;
    }],
    execute: function () {
      (function (HorizontalTextAlignment) {
        HorizontalTextAlignment[HorizontalTextAlignment["LEFT"] = 0] = "LEFT";
        HorizontalTextAlignment[HorizontalTextAlignment["CENTER"] = 1] = "CENTER";
        HorizontalTextAlignment[HorizontalTextAlignment["RIGHT"] = 2] = "RIGHT";
      })(HorizontalTextAlignment || _export("HorizontalTextAlignment", HorizontalTextAlignment = {}));

      ccenum(HorizontalTextAlignment);
      /**
       * @en Enum for vertical text alignment.
       *
       * @zh 文本垂直对齐类型。
       */

      (function (VerticalTextAlignment) {
        VerticalTextAlignment[VerticalTextAlignment["TOP"] = 0] = "TOP";
        VerticalTextAlignment[VerticalTextAlignment["CENTER"] = 1] = "CENTER";
        VerticalTextAlignment[VerticalTextAlignment["BOTTOM"] = 2] = "BOTTOM";
      })(VerticalTextAlignment || _export("VerticalTextAlignment", VerticalTextAlignment = {}));

      ccenum(VerticalTextAlignment);
      /**
       * @en Enum for Overflow.
       *
       * @zh 文本超载类型。
       */

      (function (Overflow) {
        Overflow[Overflow["NONE"] = 0] = "NONE";
        Overflow[Overflow["CLAMP"] = 1] = "CLAMP";
        Overflow[Overflow["SHRINK"] = 2] = "SHRINK";
        Overflow[Overflow["RESIZE_HEIGHT"] = 3] = "RESIZE_HEIGHT";
      })(Overflow || _export("Overflow", Overflow = {}));

      ccenum(Overflow);
      /**
       * @en Enum for cache mode.
       *
       * @zh 文本图集缓存类型。
       */

      (function (CacheMode) {
        CacheMode[CacheMode["NONE"] = 0] = "NONE";
        CacheMode[CacheMode["BITMAP"] = 1] = "BITMAP";
        CacheMode[CacheMode["CHAR"] = 2] = "CHAR";
      })(CacheMode || _export("CacheMode", CacheMode = {}));

      ccenum(CacheMode);
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

      _export("Label", Label = (_dec = ccclass('cc.Label'), _dec2 = help('i18n:cc.Label'), _dec3 = executionOrder(110), _dec4 = menu('2D/Label'), _dec5 = displayOrder(4), _dec6 = tooltip('i18n:label.string'), _dec7 = type(HorizontalTextAlignment), _dec8 = displayOrder(5), _dec9 = tooltip('i18n:label.horizontal_align'), _dec10 = type(VerticalTextAlignment), _dec11 = displayOrder(6), _dec12 = tooltip('i18n:label.vertical_align'), _dec13 = displayOrder(7), _dec14 = tooltip('i18n:label.font_size'), _dec15 = displayOrder(8), _dec16 = visible(function () {
        return !this._isSystemFontUsed;
      }), _dec17 = tooltip('i18n:label.font_family'), _dec18 = displayOrder(8), _dec19 = tooltip('i18n:label.line_height'), _dec20 = type(Overflow), _dec21 = displayOrder(9), _dec22 = tooltip('i18n:label.overflow'), _dec23 = displayOrder(10), _dec24 = tooltip('i18n:label.wrap'), _dec25 = type(Font), _dec26 = displayOrder(11), _dec27 = visible(function () {
        return !this._isSystemFontUsed;
      }), _dec28 = tooltip('i18n:label.font'), _dec29 = displayOrder(12), _dec30 = tooltip('i18n:label.system_font'), _dec31 = type(CacheMode), _dec32 = displayOrder(13), _dec33 = tooltip('i18n:label.cache_mode'), _dec34 = displayOrder(15), _dec35 = tooltip('i18n:label.font_bold'), _dec36 = displayOrder(16), _dec37 = tooltip('i18n:label.font_italic'), _dec38 = displayOrder(17), _dec39 = tooltip('i18n:label.font_underline'), _dec40 = visible(function () {
        return this._isUnderline;
      }), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Renderable2D) {
        _inheritsLoose(Label, _Renderable2D);

        function Label() {
          var _this;

          _this = _Renderable2D.call(this) || this;

          _initializerDefineProperty(_this, "_string", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalAlign", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalAlign", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_actualFontSize", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fontSize", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fontFamily", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lineHeight", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_overflow", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableWrapText", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_font", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isSystemFontUsed", _descriptor11, _assertThisInitialized(_this));

          _this._spacingX = 0;

          _initializerDefineProperty(_this, "_isItalic", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isBold", _descriptor13, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isUnderline", _descriptor14, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_underlineHeight", _descriptor15, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cacheMode", _descriptor16, _assertThisInitialized(_this));

          _this._N$file = null;
          _this._texture = null;
          _this._ttfSpriteFrame = null;
          _this._userDefinedFont = null;
          _this._assemblerData = null;
          _this._fontAtlas = null;
          _this._letterTexture = null;

          if (EDITOR) {
            _this._userDefinedFont = null;
          }

          _this._ttfSpriteFrame = null;
          return _this;
        }

        var _proto = Label.prototype;

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this); // TODO: Hack for barbarians


          if (!this._font && !this._isSystemFontUsed) {
            this.useSystemFont = true;
          } // Reapply default font family if necessary


          if (this._isSystemFontUsed && !this._fontFamily) {
            this.fontFamily = 'Arial';
          }

          this.updateRenderData(true);
        };

        _proto.onDisable = function onDisable() {
          _Renderable2D.prototype.onDisable.call(this);
        };

        _proto.onDestroy = function onDestroy() {
          if (this._assembler && this._assembler.resetAssemblerData) {
            this._assembler.resetAssemblerData(this._assemblerData);
          }

          this._assemblerData = null;

          if (this._ttfSpriteFrame) {
            var tex = this._ttfSpriteFrame.texture;

            if (tex && this._ttfSpriteFrame.original === null) {
              var tex2d = tex;

              if (tex2d.image) {
                tex2d.image.destroy();
              }

              tex.destroy();
            }

            this._ttfSpriteFrame = null;
          } // texture cannot be destroyed in here, lettertexture image source is public.


          this._letterTexture = null;

          _Renderable2D.prototype.onDestroy.call(this);
        };

        _proto.updateRenderData = function updateRenderData(force) {
          if (force === void 0) {
            force = false;
          }

          this.markForUpdateRenderData();

          if (force) {
            this._flushAssembler(); // Hack: Fixed the bug that richText wants to get the label length by _measureText, _assembler.updateRenderData will update the content size immediately.


            if (this.renderData) this.renderData.vertDirty = true;

            this._applyFontTexture();
          }
        };

        _proto._render = function _render(render) {
          render.commitComp(this, this._texture, this._assembler, null);
        };

        _proto._updateColor = function _updateColor() {
          // hack for all type
          if (this._font instanceof BitmapFont) {
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
        };

        _proto._canRender = function _canRender() {
          if (!_Renderable2D.prototype._canRender.call(this) || !this._string) {
            return false;
          }

          var font = this._font;

          if (font && font instanceof BitmapFont) {
            var spriteFrame = font.spriteFrame; // cannot be activated if texture not loaded yet

            if (!spriteFrame || !spriteFrame.textureLoaded()) {
              return false;
            }
          }

          return true;
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = Label.Assembler.getAssembler(this);

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
        };

        _proto._applyFontTexture = function _applyFontTexture() {
          var _this2 = this;

          var font = this._font;

          if (font instanceof BitmapFont) {
            var spriteFrame = font.spriteFrame;

            var onBMFontTextureLoaded = function onBMFontTextureLoaded() {
              // TODO: old texture in material have been released by loader
              _this2._texture = spriteFrame;

              _this2.changeMaterialForDefine();

              if (_this2._assembler) {
                _this2._assembler.updateRenderData(_this2);
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
              this._ttfSpriteFrame = new SpriteFrame();
              this._assemblerData = this._assembler.getAssemblerData();
              var image = new ImageAsset(this._assemblerData.canvas);
              var tex = image._texture;
              this._ttfSpriteFrame.texture = tex;
            }

            if (this.cacheMode !== CacheMode.CHAR) {
              // this._frame._refreshTexture(this._texture);
              this._texture = this._ttfSpriteFrame;
            }

            this.changeMaterialForDefine();
            this._assembler && this._assembler.updateRenderData(this);
          }
        };

        _proto.changeMaterialForDefine = function changeMaterialForDefine() {
          if (!this._texture) {
            return;
          }

          var value = false;

          if (this.cacheMode !== CacheMode.CHAR) {
            var spriteFrame = this._texture;
            var texture = spriteFrame.texture;

            if (texture instanceof TextureBase) {
              var format = texture.getPixelFormat();
              value = format === PixelFormat.RGBA_ETC1 || format === PixelFormat.RGB_A_PVRTC_4BPPV1 || format === PixelFormat.RGB_A_PVRTC_2BPPV1;
            }
          }

          if (value) {
            this._instanceMaterialType = InstanceMaterialType.USE_ALPHA_SEPARATED;
          } else {
            this._instanceMaterialType = InstanceMaterialType.ADD_COLOR_AND_TEXTURE;
          }

          this.updateMaterial();
        };

        _createClass(Label, [{
          key: "string",
          get:
          /**
           * @en
           * Content string of label.
           *
           * @zh
           * 标签显示的文本内容。
           */
          function get() {
            return this._string;
          },
          set: function set(value) {
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

        }, {
          key: "horizontalAlign",
          get: function get() {
            return this._horizontalAlign;
          },
          set: function set(value) {
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

        }, {
          key: "verticalAlign",
          get: function get() {
            return this._verticalAlign;
          },
          set: function set(value) {
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

        }, {
          key: "actualFontSize",
          get: function get() {
            return this._actualFontSize;
          },
          set: function set(value) {
            this._actualFontSize = value;
          }
          /**
           * @en
           * Font size of label.
           *
           * @zh
           * 文本字体大小。
           */

        }, {
          key: "fontSize",
          get: function get() {
            return this._fontSize;
          },
          set: function set(value) {
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

        }, {
          key: "fontFamily",
          get: function get() {
            return this._fontFamily;
          },
          set: function set(value) {
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

        }, {
          key: "lineHeight",
          get: function get() {
            return this._lineHeight;
          },
          set: function set(value) {
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

        }, {
          key: "overflow",
          get: function get() {
            return this._overflow;
          },
          set: function set(value) {
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

        }, {
          key: "enableWrapText",
          get: function get() {
            return this._enableWrapText;
          },
          set: function set(value) {
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

        }, {
          key: "font",
          get: function get() {
            // return this._N$file;
            return this._font;
          },
          set: function set(value) {
            if (this._font === value) {
              return;
            } // if delete the font, we should change isSystemFontUsed to true


            this._isSystemFontUsed = !value;

            if (EDITOR && value) {
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

        }, {
          key: "useSystemFont",
          get: function get() {
            return this._isSystemFontUsed;
          },
          set: function set(value) {
            if (this._isSystemFontUsed === value) {
              return;
            }

            this.destroyRenderData();
            this._renderData = null;

            if (EDITOR) {
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

        }, {
          key: "cacheMode",
          get: function get() {
            return this._cacheMode;
          },
          set: function set(value) {
            if (this._cacheMode === value) {
              return;
            }

            if (this._cacheMode === CacheMode.BITMAP && !(this._font instanceof BitmapFont) && this._ttfSpriteFrame) {
              this._ttfSpriteFrame._resetDynamicAtlasFrame();
            }

            if (this._cacheMode === CacheMode.CHAR) {
              this._ttfSpriteFrame = null;
            }

            this._cacheMode = value;
            this.updateRenderData(true);
          }
        }, {
          key: "spriteFrame",
          get: function get() {
            return this._texture;
          }
        }, {
          key: "ttfSpriteFrame",
          get: function get() {
            return this._ttfSpriteFrame;
          }
          /**
           * @en
           * Whether the font is bold.
           *
           * @zh
           * 字体是否加粗。
           */

        }, {
          key: "isBold",
          get: function get() {
            return this._isBold;
          },
          set: function set(value) {
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

        }, {
          key: "isItalic",
          get: function get() {
            return this._isItalic;
          },
          set: function set(value) {
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

        }, {
          key: "isUnderline",
          get: function get() {
            return this._isUnderline;
          },
          set: function set(value) {
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

        }, {
          key: "underlineHeight",
          get: function get() {
            return this._underlineHeight;
          },
          set: function set(value) {
            if (this._underlineHeight === value) return;
            this._underlineHeight = value;
            this.updateRenderData();
          }
        }, {
          key: "assemblerData",
          get: function get() {
            return this._assemblerData;
          }
        }, {
          key: "fontAtlas",
          get: function get() {
            return this._fontAtlas;
          },
          set: function set(value) {
            this._fontAtlas = value;
          }
        }, {
          key: "spacingX",
          get: function get() {
            return this._spacingX;
          },
          set: function set(value) {
            if (this._spacingX === value) {
              return;
            }

            this._spacingX = value;
            this.updateRenderData();
          }
        }, {
          key: "_bmFontOriginalSize",
          get: function get() {
            if (this._font instanceof BitmapFont) {
              return this._font.fontSize;
            } else {
              return -1;
            }
          }
        }]);

        return Label;
      }(Renderable2D), _class3.HorizontalAlign = HorizontalTextAlignment, _class3.VerticalAlign = VerticalTextAlignment, _class3.Overflow = Overflow, _class3.CacheMode = CacheMode, _class3._canvasPool = CanvasPool.getInstance(), _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec5, _dec6, multiline], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalAlign", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "verticalAlign", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "fontSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontFamily", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "fontFamily"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineHeight", [_dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "lineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "overflow", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "overflow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableWrapText", [_dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "enableWrapText"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec25, _dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useSystemFont", [_dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "useSystemFont"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cacheMode", [_dec31, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "cacheMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isBold", [_dec34, _dec35], Object.getOwnPropertyDescriptor(_class2.prototype, "isBold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isItalic", [_dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "isItalic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isUnderline", [_dec38, _dec39], Object.getOwnPropertyDescriptor(_class2.prototype, "isUnderline"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "underlineHeight", [_dec40, editable], Object.getOwnPropertyDescriptor(_class2.prototype, "underlineHeight"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_string", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'label';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalAlign", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return HorizontalTextAlignment.CENTER;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_verticalAlign", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return VerticalTextAlignment.CENTER;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_actualFontSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fontSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'Arial';
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_lineHeight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_overflow", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Overflow.NONE;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_enableWrapText", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_font", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_isSystemFontUsed", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_isItalic", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_isBold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_isUnderline", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_underlineHeight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "_cacheMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CacheMode.NONE;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
    }
  };
});