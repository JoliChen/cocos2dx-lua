System.register("q-bundled:///fs/cocos/2d/assembler/label/ttfUtils.js", ["../../assets/index.js", "../../utils/text-utils.js", "../../../core/math/index.js", "../../components/index.js", "../../../core/platform/debug.js", "../../../core/global-exports.js", "../../../core/asset-manager/index.js", "../../utils/dynamic-atlas/atlas-manager.js", "../../../core/gfx/index.js"], function (_export, _context2) {
  "use strict";

  var SpriteFrame, fragmentText, safeMeasureText, getBaselineOffset, BASELINE_RATIO, Color, Size, Vec2, Rect, HorizontalTextAlignment, Label, LabelOutline, VerticalTextAlignment, LabelShadow, logID, legacyCC, assetManager, dynamicAtlasManager, BlendFactor, Overflow, MAX_SIZE, _BASELINE_OFFSET, _invisibleAlpha, _context, _canvas, _texture, _fontDesc, _string, _fontSize, _drawFontsize, _splitStrings, _canvasSize, _lineHeight, _hAlign, _vAlign, _color, _alpha, _fontFamily, _overflow, _isWrapText, _outlineComp, _outlineColor, _shadowComp, _shadowColor, _canvasPadding, _contentSizeExtend, _nodeContentSize, _startPosition, _drawUnderlinePos, _drawUnderlineWidth, _underlineThickness, _isBold, _isItalic, _isUnderline, Alignment, ttfUtils;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  return {
    setters: [function (_assetsIndexJs) {
      SpriteFrame = _assetsIndexJs.SpriteFrame;
    }, function (_utilsTextUtilsJs) {
      fragmentText = _utilsTextUtilsJs.fragmentText;
      safeMeasureText = _utilsTextUtilsJs.safeMeasureText;
      getBaselineOffset = _utilsTextUtilsJs.getBaselineOffset;
      BASELINE_RATIO = _utilsTextUtilsJs.BASELINE_RATIO;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
      Size = _coreMathIndexJs.Size;
      Vec2 = _coreMathIndexJs.Vec2;
      Rect = _coreMathIndexJs.Rect;
    }, function (_componentsIndexJs) {
      HorizontalTextAlignment = _componentsIndexJs.HorizontalTextAlignment;
      Label = _componentsIndexJs.Label;
      LabelOutline = _componentsIndexJs.LabelOutline;
      VerticalTextAlignment = _componentsIndexJs.VerticalTextAlignment;
      LabelShadow = _componentsIndexJs.LabelShadow;
    }, function (_corePlatformDebugJs) {
      logID = _corePlatformDebugJs.logID;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreAssetManagerIndexJs) {
      assetManager = _coreAssetManagerIndexJs.assetManager;
    }, function (_utilsDynamicAtlasAtlasManagerJs) {
      dynamicAtlasManager = _utilsDynamicAtlasAtlasManagerJs.dynamicAtlasManager;
    }, function (_coreGfxIndexJs) {
      BlendFactor = _coreGfxIndexJs.BlendFactor;
    }],
    execute: function () {
      Overflow = Label.Overflow;
      MAX_SIZE = 2048;
      _BASELINE_OFFSET = getBaselineOffset();
      _invisibleAlpha = (1 / 255).toFixed(3);
      _context = null;
      _canvas = null;
      _texture = null;
      _fontDesc = '';
      _string = '';
      _fontSize = 0;
      _drawFontsize = 0;
      _splitStrings = [];
      _canvasSize = new Size();
      _lineHeight = 0;
      _hAlign = 0;
      _vAlign = 0;
      _color = new Color();
      _alpha = 1;
      _fontFamily = '';
      _overflow = Overflow.NONE;
      _isWrapText = false; // outline

      _outlineComp = null;
      _outlineColor = Color.BLACK.clone(); // shadow

      _shadowComp = null;
      _shadowColor = Color.BLACK.clone();
      _canvasPadding = new Rect();
      _contentSizeExtend = Size.ZERO.clone();
      _nodeContentSize = Size.ZERO.clone();
      _startPosition = Vec2.ZERO.clone();
      _drawUnderlinePos = Vec2.ZERO.clone();
      _drawUnderlineWidth = 0;
      _underlineThickness = 0;
      _isBold = false;
      _isItalic = false;
      _isUnderline = false;
      Alignment = ['left', // macro.TextAlignment.LEFT
      'center', // macro.TextAlignment.CENTER
      'right' // macro.TextAlignment.RIGHT
      ];

      _export("ttfUtils", ttfUtils = {
        getAssemblerData: function getAssemblerData() {
          var sharedLabelData = Label._canvasPool.get();

          return sharedLabelData;
        },
        resetAssemblerData: function resetAssemblerData(assemblerData) {
          if (assemblerData) {
            Label._canvasPool.put(assemblerData);
          }
        },
        updateRenderData: function updateRenderData(comp) {
          if (!comp.renderData || !comp.renderData.vertDirty) {
            return;
          }

          var trans = comp.node._uiProps.uiTransformComp;

          this._updateFontFamily(comp);

          this._updateProperties(comp, trans);

          this._calculateLabelFont();

          this._updateLabelDimensions();

          this._resetDynamicAtlas(comp);

          this._updateTexture(comp);

          this.updateOpacity(comp);

          comp._setCacheAlpha(_alpha);

          this._calDynamicAtlas(comp);

          comp.actualFontSize = _fontSize;
          trans.setContentSize(_canvasSize);
          this.updateVertexData(comp);
          this.updateUvs(comp);
          comp.markForUpdateRenderData(false);
          _context = null;
          _canvas = null;
          _texture = null;
        },
        updateVertexData: function updateVertexData(comp) {},
        updateUvs: function updateUvs(comp) {},
        updateOpacity: function updateOpacity(comp) {
          var vData = comp.renderData.vData;
          var colorOffset = 5;
          var colorA = comp.node._uiProps.opacity;

          for (var i = 0; i < 4; i++) {
            vData[colorOffset + 3] = colorA;
            colorOffset += 9;
          }
        },
        _updateFontFamily: function _updateFontFamily(comp) {
          if (!comp.useSystemFont) {
            if (comp.font) {
              if (comp.font._nativeAsset) {
                _fontFamily = comp.font._nativeAsset;
              } else {
                assetManager.postLoadNative(comp.font, function (err) {
                  if (!comp.isValid) {
                    return;
                  }

                  _fontFamily = comp.font._nativeAsset || 'Arial';
                  comp.updateRenderData(true);
                });
                _fontFamily = 'Arial';
              }
            } else {
              _fontFamily = 'Arial';
            }
          } else {
            _fontFamily = comp.fontFamily || 'Arial';
          }
        },
        _updateProperties: function _updateProperties(comp, trans) {
          var assemblerData = comp.assemblerData;

          if (!assemblerData) {
            return;
          }

          _context = assemblerData.context;
          _canvas = assemblerData.canvas;
          _texture = comp.spriteFrame;
          _string = comp.string.toString();
          _fontSize = comp.fontSize;
          _drawFontsize = _fontSize;
          _overflow = comp.overflow;
          _nodeContentSize.width = _canvasSize.width = trans.width;
          _nodeContentSize.height = _canvasSize.height = trans.height;
          _underlineThickness = comp.underlineHeight;
          _lineHeight = comp.lineHeight;
          _hAlign = comp.horizontalAlign;
          _vAlign = comp.verticalAlign;
          _color = comp.color;
          _alpha = comp.node._uiProps.opacity;
          _isBold = comp.isBold;
          _isItalic = comp.isItalic;
          _isUnderline = comp.isUnderline;

          if (_overflow === Overflow.NONE) {
            _isWrapText = false;
          } else if (_overflow === Overflow.RESIZE_HEIGHT) {
            _isWrapText = true;
          } else {
            _isWrapText = comp.enableWrapText;
          } // outline


          _outlineComp = LabelOutline && comp.getComponent(LabelOutline);
          _outlineComp = _outlineComp && _outlineComp.enabled && _outlineComp.width > 0 ? _outlineComp : null;

          if (_outlineComp) {
            _outlineColor.set(_outlineComp.color);
          } // shadow


          _shadowComp = LabelShadow && comp.getComponent(LabelShadow);
          _shadowComp = _shadowComp && _shadowComp.enabled ? _shadowComp : null;

          if (_shadowComp) {
            _shadowColor.set(_shadowComp.color);
          }

          this._updatePaddingRect();
        },
        _updatePaddingRect: function _updatePaddingRect() {
          var top = 0;
          var bottom = 0;
          var left = 0;
          var right = 0;
          var outlineWidth = 0;
          _contentSizeExtend.width = _contentSizeExtend.height = 0;

          if (_outlineComp) {
            outlineWidth = _outlineComp.width;
            top = bottom = left = right = outlineWidth;
            _contentSizeExtend.width = _contentSizeExtend.height = outlineWidth * 2;
          }

          if (_shadowComp) {
            var shadowWidth = _shadowComp.blur + outlineWidth;
            var offsetX = _shadowComp.offset.x;
            var offsetY = _shadowComp.offset.y;
            left = Math.max(left, -offsetX + shadowWidth);
            right = Math.max(right, offsetX + shadowWidth);
            top = Math.max(top, offsetY + shadowWidth);
            bottom = Math.max(bottom, -offsetY + shadowWidth);
          }

          if (_isItalic) {
            // 0.0174532925 = 3.141592653 / 180
            var offset = _drawFontsize * Math.tan(12 * 0.0174532925);

            right += offset;
            _contentSizeExtend.width += offset;
          }

          _canvasPadding.x = left;
          _canvasPadding.y = top;
          _canvasPadding.width = left + right;
          _canvasPadding.height = top + bottom;
        },
        _calculateFillTextStartPosition: function _calculateFillTextStartPosition() {
          var labelX = 0;

          if (_hAlign === HorizontalTextAlignment.RIGHT) {
            labelX = _canvasSize.width - _canvasPadding.width;
          } else if (_hAlign === HorizontalTextAlignment.CENTER) {
            labelX = (_canvasSize.width - _canvasPadding.width) / 2;
          }

          var lineHeight = this._getLineHeight();

          var drawStartY = lineHeight * (_splitStrings.length - 1); // TOP

          var firstLinelabelY = _fontSize * (1 - BASELINE_RATIO / 2);

          if (_vAlign !== VerticalTextAlignment.TOP) {
            // free space in vertical direction
            var blank = drawStartY + _canvasPadding.height + _fontSize - _canvasSize.height;

            if (_vAlign === VerticalTextAlignment.BOTTOM) {
              // Unlike BMFont, needs to reserve space below.
              blank += BASELINE_RATIO / 2 * _fontSize; // BOTTOM

              firstLinelabelY -= blank;
            } else {
              // CENTER
              firstLinelabelY -= blank / 2;
            }
          }

          firstLinelabelY += _BASELINE_OFFSET * _fontSize;

          _startPosition.set(labelX + _canvasPadding.x, firstLinelabelY + _canvasPadding.y);
        },
        _updateTexture: function _updateTexture(comp) {
          if (!_context || !_canvas) {
            return;
          }

          _context.clearRect(0, 0, _canvas.width, _canvas.height);

          _context.font = _fontDesc;

          this._calculateFillTextStartPosition();

          var lineHeight = this._getLineHeight(); // use round for line join to avoid sharp intersect point


          _context.lineJoin = 'round'; // to keep the one model same as before
          // Todo: remove this protect when component remove blend function
          // @ts-expect-error remove when component remove blend function

          if (comp._srcBlendFactor === BlendFactor.SRC_ALPHA) {
            _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", " + _invisibleAlpha + ")";

            _context.fillRect(0, 0, _canvas.width, _canvas.height);
          }

          _context.fillStyle = "rgb(" + _color.r + ", " + _color.g + ", " + _color.b + ")";
          var drawTextPosX = _startPosition.x;
          var drawTextPosY = 0; // draw shadow and underline

          this._drawTextEffect(_startPosition, lineHeight); // draw text and outline


          for (var i = 0; i < _splitStrings.length; ++i) {
            drawTextPosY = _startPosition.y + i * lineHeight;

            if (_outlineComp) {
              _context.strokeText(_splitStrings[i], drawTextPosX, drawTextPosY);
            }

            _context.fillText(_splitStrings[i], drawTextPosX, drawTextPosY);
          }

          if (_shadowComp) {
            _context.shadowColor = 'transparent';
          } // _texture.handleLoadedTexture();


          if (_texture) {
            var tex;

            if (_texture instanceof SpriteFrame) {
              tex = _texture.texture;
            } else {
              tex = _texture;
            }

            var uploadAgain = _canvas.width !== 0 && _canvas.height !== 0;

            if (uploadAgain) {
              tex.reset({
                width: _canvas.width,
                height: _canvas.height,
                mipmapLevel: 1
              });
              tex.uploadData(_canvas);

              if (_texture instanceof SpriteFrame) {
                _texture.rect = new Rect(0, 0, _canvas.width, _canvas.height);

                _texture._calculateUV();
              }

              if (legacyCC.director.root && legacyCC.director.root.batcher2D) {
                legacyCC.director.root.batcher2D._releaseDescriptorSetCache(tex.getHash());
              }
            }
          }
        },
        _resetDynamicAtlas: function _resetDynamicAtlas(comp) {
          if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
          var frame = comp.ttfSpriteFrame;
          dynamicAtlasManager.deleteAtlasSpriteFrame(frame);

          frame._resetDynamicAtlasFrame();
        },
        _calDynamicAtlas: function _calDynamicAtlas(comp) {
          if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
          var frame = comp.ttfSpriteFrame;
          dynamicAtlasManager.packToDynamicAtlas(comp, frame);
          comp.renderData.uvDirty = true;
        },
        _setupOutline: function _setupOutline() {
          _context.strokeStyle = "rgba(" + _outlineColor.r + ", " + _outlineColor.g + ", " + _outlineColor.b + ", " + _outlineColor.a / 255 + ")";
          _context.lineWidth = _outlineComp.width * 2;
        },
        _setupShadow: function _setupShadow() {
          _context.shadowColor = "rgba(" + _shadowColor.r + ", " + _shadowColor.g + ", " + _shadowColor.b + ", " + _shadowColor.a / 255 + ")";
          _context.shadowBlur = _shadowComp.blur;
          _context.shadowOffsetX = _shadowComp.offset.x;
          _context.shadowOffsetY = -_shadowComp.offset.y;
        },
        _drawTextEffect: function _drawTextEffect(startPosition, lineHeight) {
          if (!_shadowComp && !_outlineComp && !_isUnderline) return;
          var isMultiple = _splitStrings.length > 1 && _shadowComp;

          var measureText = this._measureText(_context, _fontDesc);

          var drawTextPosX = 0;
          var drawTextPosY = 0; // only one set shadow and outline

          if (_shadowComp) {
            this._setupShadow();
          }

          if (_outlineComp) {
            this._setupOutline();
          } // draw shadow and (outline or text)


          for (var i = 0; i < _splitStrings.length; ++i) {
            drawTextPosX = startPosition.x;
            drawTextPosY = startPosition.y + i * lineHeight; // multiple lines need to be drawn outline and fill text

            if (isMultiple) {
              if (_outlineComp) {
                _context.strokeText(_splitStrings[i], drawTextPosX, drawTextPosY);
              }

              _context.fillText(_splitStrings[i], drawTextPosX, drawTextPosY);
            } // draw underline


            if (_isUnderline) {
              _drawUnderlineWidth = measureText(_splitStrings[i]);

              if (_hAlign === HorizontalTextAlignment.RIGHT) {
                _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth;
              } else if (_hAlign === HorizontalTextAlignment.CENTER) {
                _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth / 2;
              } else {
                _drawUnderlinePos.x = startPosition.x;
              }

              _drawUnderlinePos.y = drawTextPosY + _drawFontsize / 8;

              _context.fillRect(_drawUnderlinePos.x, _drawUnderlinePos.y, _drawUnderlineWidth, _underlineThickness);
            }
          }

          if (isMultiple) {
            _context.shadowColor = 'transparent';
          }
        },
        _updateLabelDimensions: function _updateLabelDimensions() {
          _canvasSize.width = Math.min(_canvasSize.width, MAX_SIZE);
          _canvasSize.height = Math.min(_canvasSize.height, MAX_SIZE);
          var recreate = false;

          if (_canvas.width !== _canvasSize.width) {
            _canvas.width = _canvasSize.width;
            recreate = true;
          }

          if (_canvas.height !== _canvasSize.height) {
            _canvas.height = _canvasSize.height;
            recreate = true;
          }

          if (recreate) _context.font = _fontDesc; // align

          _context.textAlign = Alignment[_hAlign];
          _context.textBaseline = 'alphabetic';
        },
        _getFontDesc: function _getFontDesc() {
          var fontDesc = _fontSize.toString() + "px ";
          fontDesc += _fontFamily;

          if (_isBold) {
            fontDesc = "bold " + fontDesc;
          }

          if (_isItalic) {
            fontDesc = "italic " + fontDesc;
          }

          return fontDesc;
        },
        _getLineHeight: function _getLineHeight() {
          var nodeSpacingY = _lineHeight;

          if (nodeSpacingY === 0) {
            nodeSpacingY = _fontSize;
          } else {
            nodeSpacingY = nodeSpacingY * _fontSize / _drawFontsize;
          }

          return nodeSpacingY | 0;
        },
        _calculateParagraphLength: function _calculateParagraphLength(paragraphedStrings, ctx) {
          var paragraphLength = [];

          for (var _iterator = _createForOfIteratorHelperLoose(paragraphedStrings), _step; !(_step = _iterator()).done;) {
            var para = _step.value;
            var width = safeMeasureText(ctx, para, _fontDesc);
            paragraphLength.push(width);
          }

          return paragraphLength;
        },
        _measureText: function _measureText(ctx, fontDesc) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return function (string) {
            return safeMeasureText(ctx, string, fontDesc);
          };
        },
        _calculateShrinkFont: function _calculateShrinkFont(paragraphedStrings) {
          if (!_context) return;

          var paragraphLength = this._calculateParagraphLength(paragraphedStrings, _context);

          var i = 0;
          var totalHeight = 0;
          var maxLength = 0;

          if (_isWrapText) {
            var canvasWidthNoMargin = _nodeContentSize.width;
            var canvasHeightNoMargin = _nodeContentSize.height;

            if (canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
              return;
            }

            totalHeight = canvasHeightNoMargin + 1;
            var actualFontSize = _fontSize + 1;
            var textFragment = [];
            var left = 0;
            var right = actualFontSize | 0;
            var mid = 0;

            while (left < right) {
              mid = left + right + 1 >> 1;

              if (mid <= 0) {
                logID(4003);
                break;
              }

              _fontSize = mid;
              _fontDesc = this._getFontDesc();
              _context.font = _fontDesc;

              var lineHeight = this._getLineHeight();

              totalHeight = 0;

              for (i = 0; i < paragraphedStrings.length; ++i) {
                var allWidth = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
                textFragment = fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
                totalHeight += textFragment.length * lineHeight;
              }

              if (totalHeight > canvasHeightNoMargin) {
                right = mid - 1;
              } else {
                left = mid;
              }
            }

            if (left === 0) {
              logID(4003);
            } else {
              _fontSize = left;
              _fontDesc = this._getFontDesc();
              _context.font = _fontDesc;
            }
          } else {
            totalHeight = paragraphedStrings.length * this._getLineHeight();

            for (i = 0; i < paragraphedStrings.length; ++i) {
              if (maxLength < paragraphLength[i]) {
                maxLength = paragraphLength[i];
              }
            }

            var scaleX = (_canvasSize.width - _canvasPadding.width) / maxLength;
            var scaleY = _canvasSize.height / totalHeight;
            _fontSize = _drawFontsize * Math.min(1, scaleX, scaleY) | 0;
            _fontDesc = this._getFontDesc();
            _context.font = _fontDesc;
          }
        },
        _calculateWrapText: function _calculateWrapText(paragraphedStrings) {
          if (!_isWrapText || !_context) return;
          _splitStrings = [];
          var canvasWidthNoMargin = _nodeContentSize.width;

          for (var i = 0; i < paragraphedStrings.length; ++i) {
            var allWidth = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
            var textFragment = fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
            _splitStrings = _splitStrings.concat(textFragment);
          }
        },
        _calculateLabelFont: function _calculateLabelFont() {
          if (!_context) {
            return;
          }

          var paragraphedStrings = _string.split('\n');

          _splitStrings = paragraphedStrings;
          _fontDesc = this._getFontDesc();
          _context.font = _fontDesc;

          switch (_overflow) {
            case Overflow.NONE:
              {
                var canvasSizeX = 0;
                var canvasSizeY = 0;

                for (var i = 0; i < paragraphedStrings.length; ++i) {
                  var paraLength = safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
                  canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
                }

                canvasSizeY = (_splitStrings.length + BASELINE_RATIO) * this._getLineHeight();
                var rawWidth = parseFloat(canvasSizeX.toFixed(2));
                var rawHeight = parseFloat(canvasSizeY.toFixed(2));
                _canvasSize.width = rawWidth + _canvasPadding.width;
                _canvasSize.height = rawHeight + _canvasPadding.height;
                _nodeContentSize.width = rawWidth + _contentSizeExtend.width;
                _nodeContentSize.height = rawHeight + _contentSizeExtend.height;
                break;
              }

            case Overflow.SHRINK:
              {
                this._calculateShrinkFont(paragraphedStrings);

                this._calculateWrapText(paragraphedStrings);

                break;
              }

            case Overflow.CLAMP:
              {
                this._calculateWrapText(paragraphedStrings);

                break;
              }

            case Overflow.RESIZE_HEIGHT:
              {
                this._calculateWrapText(paragraphedStrings);

                var _rawHeight = (_splitStrings.length + BASELINE_RATIO) * this._getLineHeight();

                _canvasSize.height = _rawHeight + _canvasPadding.height; // set node height

                _nodeContentSize.height = _rawHeight + _contentSizeExtend.height;
                break;
              }

            default:
              {// nop
              }
          }
        }
      });
    }
  };
});