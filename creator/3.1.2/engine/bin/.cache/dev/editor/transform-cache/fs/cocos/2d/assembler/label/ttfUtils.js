"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ttfUtils = void 0;

var _index = require("../../assets/index.js");

var _textUtils = require("../../utils/text-utils.js");

var _index2 = require("../../../core/math/index.js");

var _index3 = require("../../components/index.js");

var _debug = require("../../../core/platform/debug.js");

var _globalExports = require("../../../core/global-exports.js");

var _index4 = require("../../../core/asset-manager/index.js");

var _atlasManager = require("../../utils/dynamic-atlas/atlas-manager.js");

var _index5 = require("../../../core/gfx/index.js");

/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @packageDocumentation
 * @hidden
 */
const Overflow = _index3.Label.Overflow;
const MAX_SIZE = 2048;

const _BASELINE_OFFSET = (0, _textUtils.getBaselineOffset)();

const _invisibleAlpha = (1 / 255).toFixed(3);

let _context = null;
let _canvas = null;
let _texture = null;
let _fontDesc = '';
let _string = '';
let _fontSize = 0;
let _drawFontsize = 0;
let _splitStrings = [];

const _canvasSize = new _index2.Size();

let _lineHeight = 0;
let _hAlign = 0;
let _vAlign = 0;

let _color = new _index2.Color();

let _alpha = 1;
let _fontFamily = '';
let _overflow = Overflow.NONE;
let _isWrapText = false; // outline

let _outlineComp = null;

const _outlineColor = _index2.Color.BLACK.clone(); // shadow


let _shadowComp = null;

const _shadowColor = _index2.Color.BLACK.clone();

const _canvasPadding = new _index2.Rect();

const _contentSizeExtend = _index2.Size.ZERO.clone();

const _nodeContentSize = _index2.Size.ZERO.clone();

const _startPosition = _index2.Vec2.ZERO.clone();

const _drawUnderlinePos = _index2.Vec2.ZERO.clone();

let _drawUnderlineWidth = 0;
let _underlineThickness = 0;
let _isBold = false;
let _isItalic = false;
let _isUnderline = false;
const Alignment = ['left', // macro.TextAlignment.LEFT
'center', // macro.TextAlignment.CENTER
'right' // macro.TextAlignment.RIGHT
];
const ttfUtils = {
  getAssemblerData() {
    const sharedLabelData = _index3.Label._canvasPool.get();

    return sharedLabelData;
  },

  resetAssemblerData(assemblerData) {
    if (assemblerData) {
      _index3.Label._canvasPool.put(assemblerData);
    }
  },

  updateRenderData(comp) {
    if (!comp.renderData || !comp.renderData.vertDirty) {
      return;
    }

    const trans = comp.node._uiProps.uiTransformComp;

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

  updateVertexData(comp) {},

  updateUvs(comp) {},

  updateOpacity(comp) {
    const vData = comp.renderData.vData;
    let colorOffset = 5;
    const colorA = comp.node._uiProps.opacity;

    for (let i = 0; i < 4; i++) {
      vData[colorOffset + 3] = colorA;
      colorOffset += 9;
    }
  },

  _updateFontFamily(comp) {
    if (!comp.useSystemFont) {
      if (comp.font) {
        if (comp.font._nativeAsset) {
          _fontFamily = comp.font._nativeAsset;
        } else {
          _index4.assetManager.postLoadNative(comp.font, err => {
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

  _updateProperties(comp, trans) {
    const assemblerData = comp.assemblerData;

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


    _outlineComp = _index3.LabelOutline && comp.getComponent(_index3.LabelOutline);
    _outlineComp = _outlineComp && _outlineComp.enabled && _outlineComp.width > 0 ? _outlineComp : null;

    if (_outlineComp) {
      _outlineColor.set(_outlineComp.color);
    } // shadow


    _shadowComp = _index3.LabelShadow && comp.getComponent(_index3.LabelShadow);
    _shadowComp = _shadowComp && _shadowComp.enabled ? _shadowComp : null;

    if (_shadowComp) {
      _shadowColor.set(_shadowComp.color);
    }

    this._updatePaddingRect();
  },

  _updatePaddingRect() {
    let top = 0;
    let bottom = 0;
    let left = 0;
    let right = 0;
    let outlineWidth = 0;
    _contentSizeExtend.width = _contentSizeExtend.height = 0;

    if (_outlineComp) {
      outlineWidth = _outlineComp.width;
      top = bottom = left = right = outlineWidth;
      _contentSizeExtend.width = _contentSizeExtend.height = outlineWidth * 2;
    }

    if (_shadowComp) {
      const shadowWidth = _shadowComp.blur + outlineWidth;
      const offsetX = _shadowComp.offset.x;
      const offsetY = _shadowComp.offset.y;
      left = Math.max(left, -offsetX + shadowWidth);
      right = Math.max(right, offsetX + shadowWidth);
      top = Math.max(top, offsetY + shadowWidth);
      bottom = Math.max(bottom, -offsetY + shadowWidth);
    }

    if (_isItalic) {
      // 0.0174532925 = 3.141592653 / 180
      const offset = _drawFontsize * Math.tan(12 * 0.0174532925);

      right += offset;
      _contentSizeExtend.width += offset;
    }

    _canvasPadding.x = left;
    _canvasPadding.y = top;
    _canvasPadding.width = left + right;
    _canvasPadding.height = top + bottom;
  },

  _calculateFillTextStartPosition() {
    let labelX = 0;

    if (_hAlign === _index3.HorizontalTextAlignment.RIGHT) {
      labelX = _canvasSize.width - _canvasPadding.width;
    } else if (_hAlign === _index3.HorizontalTextAlignment.CENTER) {
      labelX = (_canvasSize.width - _canvasPadding.width) / 2;
    }

    const lineHeight = this._getLineHeight();

    const drawStartY = lineHeight * (_splitStrings.length - 1); // TOP

    let firstLinelabelY = _fontSize * (1 - _textUtils.BASELINE_RATIO / 2);

    if (_vAlign !== _index3.VerticalTextAlignment.TOP) {
      // free space in vertical direction
      let blank = drawStartY + _canvasPadding.height + _fontSize - _canvasSize.height;

      if (_vAlign === _index3.VerticalTextAlignment.BOTTOM) {
        // Unlike BMFont, needs to reserve space below.
        blank += _textUtils.BASELINE_RATIO / 2 * _fontSize; // BOTTOM

        firstLinelabelY -= blank;
      } else {
        // CENTER
        firstLinelabelY -= blank / 2;
      }
    }

    firstLinelabelY += _BASELINE_OFFSET * _fontSize;

    _startPosition.set(labelX + _canvasPadding.x, firstLinelabelY + _canvasPadding.y);
  },

  _updateTexture(comp) {
    if (!_context || !_canvas) {
      return;
    }

    _context.clearRect(0, 0, _canvas.width, _canvas.height);

    _context.font = _fontDesc;

    this._calculateFillTextStartPosition();

    const lineHeight = this._getLineHeight(); // use round for line join to avoid sharp intersect point


    _context.lineJoin = 'round'; // to keep the one model same as before
    // Todo: remove this protect when component remove blend function
    // @ts-expect-error remove when component remove blend function

    if (comp._srcBlendFactor === _index5.BlendFactor.SRC_ALPHA) {
      _context.fillStyle = `rgba(${_color.r}, ${_color.g}, ${_color.b}, ${_invisibleAlpha})`;

      _context.fillRect(0, 0, _canvas.width, _canvas.height);
    }

    _context.fillStyle = `rgb(${_color.r}, ${_color.g}, ${_color.b})`;
    const drawTextPosX = _startPosition.x;
    let drawTextPosY = 0; // draw shadow and underline

    this._drawTextEffect(_startPosition, lineHeight); // draw text and outline


    for (let i = 0; i < _splitStrings.length; ++i) {
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
      let tex;

      if (_texture instanceof _index.SpriteFrame) {
        tex = _texture.texture;
      } else {
        tex = _texture;
      }

      const uploadAgain = _canvas.width !== 0 && _canvas.height !== 0;

      if (uploadAgain) {
        tex.reset({
          width: _canvas.width,
          height: _canvas.height,
          mipmapLevel: 1
        });
        tex.uploadData(_canvas);

        if (_texture instanceof _index.SpriteFrame) {
          _texture.rect = new _index2.Rect(0, 0, _canvas.width, _canvas.height);

          _texture._calculateUV();
        }

        if (_globalExports.legacyCC.director.root && _globalExports.legacyCC.director.root.batcher2D) {
          _globalExports.legacyCC.director.root.batcher2D._releaseDescriptorSetCache(tex.getHash());
        }
      }
    }
  },

  _resetDynamicAtlas(comp) {
    if (comp.cacheMode !== _index3.Label.CacheMode.BITMAP) return;
    const frame = comp.ttfSpriteFrame;

    _atlasManager.dynamicAtlasManager.deleteAtlasSpriteFrame(frame);

    frame._resetDynamicAtlasFrame();
  },

  _calDynamicAtlas(comp) {
    if (comp.cacheMode !== _index3.Label.CacheMode.BITMAP) return;
    const frame = comp.ttfSpriteFrame;

    _atlasManager.dynamicAtlasManager.packToDynamicAtlas(comp, frame);

    comp.renderData.uvDirty = true;
  },

  _setupOutline() {
    _context.strokeStyle = `rgba(${_outlineColor.r}, ${_outlineColor.g}, ${_outlineColor.b}, ${_outlineColor.a / 255})`;
    _context.lineWidth = _outlineComp.width * 2;
  },

  _setupShadow() {
    _context.shadowColor = `rgba(${_shadowColor.r}, ${_shadowColor.g}, ${_shadowColor.b}, ${_shadowColor.a / 255})`;
    _context.shadowBlur = _shadowComp.blur;
    _context.shadowOffsetX = _shadowComp.offset.x;
    _context.shadowOffsetY = -_shadowComp.offset.y;
  },

  _drawTextEffect(startPosition, lineHeight) {
    if (!_shadowComp && !_outlineComp && !_isUnderline) return;
    const isMultiple = _splitStrings.length > 1 && _shadowComp;

    const measureText = this._measureText(_context, _fontDesc);

    let drawTextPosX = 0;
    let drawTextPosY = 0; // only one set shadow and outline

    if (_shadowComp) {
      this._setupShadow();
    }

    if (_outlineComp) {
      this._setupOutline();
    } // draw shadow and (outline or text)


    for (let i = 0; i < _splitStrings.length; ++i) {
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

        if (_hAlign === _index3.HorizontalTextAlignment.RIGHT) {
          _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth;
        } else if (_hAlign === _index3.HorizontalTextAlignment.CENTER) {
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

  _updateLabelDimensions() {
    _canvasSize.width = Math.min(_canvasSize.width, MAX_SIZE);
    _canvasSize.height = Math.min(_canvasSize.height, MAX_SIZE);
    let recreate = false;

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

  _getFontDesc() {
    let fontDesc = `${_fontSize.toString()}px `;
    fontDesc += _fontFamily;

    if (_isBold) {
      fontDesc = `bold ${fontDesc}`;
    }

    if (_isItalic) {
      fontDesc = `italic ${fontDesc}`;
    }

    return fontDesc;
  },

  _getLineHeight() {
    let nodeSpacingY = _lineHeight;

    if (nodeSpacingY === 0) {
      nodeSpacingY = _fontSize;
    } else {
      nodeSpacingY = nodeSpacingY * _fontSize / _drawFontsize;
    }

    return nodeSpacingY | 0;
  },

  _calculateParagraphLength(paragraphedStrings, ctx) {
    const paragraphLength = [];

    for (const para of paragraphedStrings) {
      const width = (0, _textUtils.safeMeasureText)(ctx, para, _fontDesc);
      paragraphLength.push(width);
    }

    return paragraphLength;
  },

  _measureText(ctx, fontDesc) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return string => (0, _textUtils.safeMeasureText)(ctx, string, fontDesc);
  },

  _calculateShrinkFont(paragraphedStrings) {
    if (!_context) return;

    const paragraphLength = this._calculateParagraphLength(paragraphedStrings, _context);

    let i = 0;
    let totalHeight = 0;
    let maxLength = 0;

    if (_isWrapText) {
      const canvasWidthNoMargin = _nodeContentSize.width;
      const canvasHeightNoMargin = _nodeContentSize.height;

      if (canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
        return;
      }

      totalHeight = canvasHeightNoMargin + 1;
      const actualFontSize = _fontSize + 1;
      let textFragment = [];
      let left = 0;
      let right = actualFontSize | 0;
      let mid = 0;

      while (left < right) {
        mid = left + right + 1 >> 1;

        if (mid <= 0) {
          (0, _debug.logID)(4003);
          break;
        }

        _fontSize = mid;
        _fontDesc = this._getFontDesc();
        _context.font = _fontDesc;

        const lineHeight = this._getLineHeight();

        totalHeight = 0;

        for (i = 0; i < paragraphedStrings.length; ++i) {
          const allWidth = (0, _textUtils.safeMeasureText)(_context, paragraphedStrings[i], _fontDesc);
          textFragment = (0, _textUtils.fragmentText)(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
          totalHeight += textFragment.length * lineHeight;
        }

        if (totalHeight > canvasHeightNoMargin) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }

      if (left === 0) {
        (0, _debug.logID)(4003);
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

      const scaleX = (_canvasSize.width - _canvasPadding.width) / maxLength;
      const scaleY = _canvasSize.height / totalHeight;
      _fontSize = _drawFontsize * Math.min(1, scaleX, scaleY) | 0;
      _fontDesc = this._getFontDesc();
      _context.font = _fontDesc;
    }
  },

  _calculateWrapText(paragraphedStrings) {
    if (!_isWrapText || !_context) return;
    _splitStrings = [];
    const canvasWidthNoMargin = _nodeContentSize.width;

    for (let i = 0; i < paragraphedStrings.length; ++i) {
      const allWidth = (0, _textUtils.safeMeasureText)(_context, paragraphedStrings[i], _fontDesc);
      const textFragment = (0, _textUtils.fragmentText)(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
      _splitStrings = _splitStrings.concat(textFragment);
    }
  },

  _calculateLabelFont() {
    if (!_context) {
      return;
    }

    const paragraphedStrings = _string.split('\n');

    _splitStrings = paragraphedStrings;
    _fontDesc = this._getFontDesc();
    _context.font = _fontDesc;

    switch (_overflow) {
      case Overflow.NONE:
        {
          let canvasSizeX = 0;
          let canvasSizeY = 0;

          for (let i = 0; i < paragraphedStrings.length; ++i) {
            const paraLength = (0, _textUtils.safeMeasureText)(_context, paragraphedStrings[i], _fontDesc);
            canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
          }

          canvasSizeY = (_splitStrings.length + _textUtils.BASELINE_RATIO) * this._getLineHeight();
          const rawWidth = parseFloat(canvasSizeX.toFixed(2));
          const rawHeight = parseFloat(canvasSizeY.toFixed(2));
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

          const rawHeight = (_splitStrings.length + _textUtils.BASELINE_RATIO) * this._getLineHeight();

          _canvasSize.height = rawHeight + _canvasPadding.height; // set node height

          _nodeContentSize.height = rawHeight + _contentSizeExtend.height;
          break;
        }

      default:
        {// nop
        }
    }
  }

};
exports.ttfUtils = ttfUtils;