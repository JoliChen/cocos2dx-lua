"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichText = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../assets/index.js");

var _index3 = require("../../core/platform/index.js");

var _textUtils = require("../utils/text-utils.js");

var _htmlTextParser2 = require("../utils/html-text-parser.js");

var _pool = _interopRequireDefault(require("../../core/utils/pool.js"));

var _index4 = require("../../core/math/index.js");

var _index5 = require("../../core/scene-graph/index.js");

var _label = require("./label.js");

var _labelOutline = require("./label-outline.js");

var _sprite = require("./sprite.js");

var _index6 = require("../framework/index.js");

var _globalExports = require("../../core/global-exports.js");

var _index7 = require("../../core/components/index.js");

var _assetManager = _interopRequireDefault(require("../../core/asset-manager/asset-manager.js"));

var _index8 = require("../../core/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _htmlTextParser = new _htmlTextParser2.HtmlTextParser();

const RichTextChildName = 'RICHTEXT_CHILD';
const RichTextChildImageName = 'RICHTEXT_Image_CHILD';
/**
 * 富文本池。<br/>
 */

const labelPool = new _pool.default(seg => {
  if (_internal253Aconstants.DEV) {
    (0, _index3.assert)(!seg.node.parent, 'Recycling node\'s parent should be null!');
  }

  if (!_globalExports.legacyCC.isValid(seg.node)) {
    return false;
  } else {
    const outline = seg.node.getComponent(_labelOutline.LabelOutline);

    if (outline) {
      outline.width = 0;
    }
  }

  return true;
}, 20);
const imagePool = new _pool.default(seg => {
  if (_internal253Aconstants.DEV) {
    (0, _index3.assert)(!seg.node.parent, 'Recycling node\'s parent should be null!');
  }

  return _globalExports.legacyCC.isValid(seg.node);
}, 10); //

function createSegment(type) {
  return {
    node: new _index5.Node(type),
    comp: null,
    lineCount: 0,
    styleIndex: 0,
    imageOffset: '',
    clickParam: '',
    clickHandler: '',
    type
  };
}

function getSegmentByPool(type, content) {
  let seg;

  if (type === RichTextChildName) {
    seg = labelPool._get();
  } else if (type === RichTextChildImageName) {
    seg = imagePool._get();
  }

  seg = seg || createSegment(type);
  let node = seg.node;

  if (!node) {
    node = new _index5.Node(type);
  }

  node.hideFlags |= _index8.CCObject.Flags.DontSave | _index8.CCObject.Flags.HideInHierarchy;

  if (type === RichTextChildImageName) {
    seg.comp = node.getComponent(_sprite.Sprite) || node.addComponent(_sprite.Sprite);
    seg.comp.spriteFrame = content;
    seg.comp.type = _sprite.Sprite.Type.SLICED;
    seg.comp.sizeMode = _sprite.Sprite.SizeMode.CUSTOM;
  } else {
    // RichTextChildName
    seg.comp = node.getComponent(_label.Label) || node.addComponent(_label.Label);
    seg.comp.string = content;
    seg.comp.horizontalAlign = _label.HorizontalTextAlignment.LEFT;
    seg.comp.verticalAlign = _label.VerticalTextAlignment.TOP;
  }

  node.setPosition(0, 0, 0);
  const trans = node._uiProps.uiTransformComp;
  trans.setAnchorPoint(0.5, 0.5);
  seg.node = node;
  seg.lineCount = 0;
  seg.styleIndex = 0;
  seg.imageOffset = '';
  seg.clickParam = '';
  seg.clickHandler = '';
  return seg;
}

/**
 * @en
 * The RichText Component.
 *
 * @zh
 * 富文本组件。
 */
let RichText = (_dec = (0, _index.ccclass)('cc.RichText'), _dec2 = (0, _index.help)('i18n:cc.RichText'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('2D/RichText'), _dec5 = (0, _index.tooltip)('i18n:richtext.string'), _dec6 = (0, _index.type)(_label.HorizontalTextAlignment), _dec7 = (0, _index.tooltip)('i18n:richtext.horizontal_align'), _dec8 = (0, _index.tooltip)('i18n:richtext.font_size'), _dec9 = (0, _index.tooltip)('i18n:richtext.font_family'), _dec10 = (0, _index.type)(_index2.Font), _dec11 = (0, _index.tooltip)('i18n:richtext.font'), _dec12 = (0, _index.tooltip)('i18n:richtext.use_system_font'), _dec13 = (0, _index.type)(_label.CacheMode), _dec14 = (0, _index.tooltip)('i18n:richtext'), _dec15 = (0, _index.tooltip)('i18n:richtext.max_width'), _dec16 = (0, _index.tooltip)('i18n:richtext.line_height'), _dec17 = (0, _index.type)(_index2.SpriteAtlas), _dec18 = (0, _index.tooltip)('i18n:richtext.image_atlas'), _dec19 = (0, _index.tooltip)('i18n:richtext.handleTouchEvent'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class RichText extends _index6.UIComponent {
  /**
   * @en
   * Content string of RichText.
   *
   * @zh
   * 富文本显示的文本内容。
   */
  get string() {
    return this._string;
  }

  set string(value) {
    if (this._string === value) {
      return;
    }

    this._string = value;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Horizontal Alignment of each line in RichText.
   *
   * @zh
   * 文本内容的水平对齐方式。
   */


  get horizontalAlign() {
    return this._horizontalAlign;
  }

  set horizontalAlign(value) {
    if (this.horizontalAlign === value) {
      return;
    }

    this._horizontalAlign = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Font size of RichText.
   *
   * @zh
   * 富文本字体大小。
   */


  get fontSize() {
    return this._fontSize;
  }

  set fontSize(value) {
    if (this._fontSize === value) {
      return;
    }

    this._fontSize = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Custom System font of RichText
   *
   * @zh
   * 富文本定制系统字体
   */


  get fontFamily() {
    return this._fontFamily;
  }

  set fontFamily(value) {
    if (this._fontFamily === value) return;
    this._fontFamily = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Custom System font of RichText.
   *
   * @zh
   * 富文本定制字体。
   */


  get font() {
    return this._font;
  }

  set font(value) {
    if (this._font === value) {
      return;
    }

    this._font = value;
    this._layoutDirty = true;

    if (this._font) {
      if (_internal253Aconstants.EDITOR) {
        this._userDefinedFont = this._font;
      }

      this.useSystemFont = false;

      this._onTTFLoaded();
    } else {
      this.useSystemFont = true;
    }

    this._updateRichTextStatus();
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

    this._isSystemFontUsed = value;

    if (_internal253Aconstants.EDITOR) {
      if (value) {
        this._font = null;
      } else if (this._userDefinedFont) {
        this._font = this._userDefinedFont;
        return;
      }
    }

    this._layoutDirty = true;

    this._updateRichTextStatus();
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

    this._cacheMode = value;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * The maximize width of the RichText.
   *
   * @zh
   * 富文本的最大宽度。
   */


  get maxWidth() {
    return this._maxWidth;
  }

  set maxWidth(value) {
    if (this._maxWidth === value) {
      return;
    }

    this._maxWidth = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Line Height of RichText.
   *
   * @zh
   * 富文本行高。
   */


  get lineHeight() {
    return this._lineHeight;
  }

  set lineHeight(value) {
    if (this._lineHeight === value) {
      return;
    }

    this._lineHeight = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas.
   *
   * @zh
   * 对于 img 标签里面的 src 属性名称，都需要在 imageAtlas 里面找到一个有效的 spriteFrame，否则 img tag 会判定为无效。
   */


  get imageAtlas() {
    return this._imageAtlas;
  }

  set imageAtlas(value) {
    if (this._imageAtlas === value) {
      return;
    }

    this._imageAtlas = value;
    this._layoutDirty = true;

    this._updateRichTextStatus();
  }
  /**
   * @en
   * Once checked, the RichText will block all input events (mouse and touch) within
   * the bounding box of the node, preventing the input from penetrating into the underlying node.
   *
   * @zh
   * 选中此选项后，RichText 将阻止节点边界框中的所有输入事件（鼠标和触摸），从而防止输入事件穿透到底层节点。
   */


  get handleTouchEvent() {
    return this._handleTouchEvent;
  }

  set handleTouchEvent(value) {
    if (this._handleTouchEvent === value) {
      return;
    }

    this._handleTouchEvent = value;

    if (this.enabledInHierarchy) {
      if (this.handleTouchEvent) {
        this._addEventListeners();
      } else {
        this._removeEventListeners();
      }
    }
  }

  constructor() {
    super();

    _initializerDefineProperty(this, "_lineHeight", _descriptor, this);

    _initializerDefineProperty(this, "_string", _descriptor2, this);

    _initializerDefineProperty(this, "_horizontalAlign", _descriptor3, this);

    _initializerDefineProperty(this, "_fontSize", _descriptor4, this);

    _initializerDefineProperty(this, "_maxWidth", _descriptor5, this);

    _initializerDefineProperty(this, "_fontFamily", _descriptor6, this);

    _initializerDefineProperty(this, "_font", _descriptor7, this);

    _initializerDefineProperty(this, "_isSystemFontUsed", _descriptor8, this);

    _initializerDefineProperty(this, "_userDefinedFont", _descriptor9, this);

    _initializerDefineProperty(this, "_cacheMode", _descriptor10, this);

    _initializerDefineProperty(this, "_imageAtlas", _descriptor11, this);

    _initializerDefineProperty(this, "_handleTouchEvent", _descriptor12, this);

    this._textArray = [];
    this._segments = [];
    this._labelSegmentsCache = [];
    this._linesWidth = [];
    this._lineCount = 1;
    this._labelWidth = 0;
    this._labelHeight = 0;
    this._layoutDirty = true;
    this._lineOffsetX = 0;
    this._updateRichTextStatus = void 0;

    if (_internal253Aconstants.EDITOR) {
      this._userDefinedFont = null;
    }

    this._updateRichTextStatus = this._updateRichText;
  }

  onLoad() {
    this.node.on(_index3.SystemEventType.LAYER_CHANGED, this._applyLayer, this);
  }

  onEnable() {
    if (this.handleTouchEvent) {
      this._addEventListeners();
    }

    this._updateRichText();

    this._activateChildren(true);
  }

  onDisable() {
    if (this.handleTouchEvent) {
      this._removeEventListeners();
    }

    this._activateChildren(false);
  }

  start() {
    this._onTTFLoaded();

    this.node.on(_index5.Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
  }

  onRestore() {
    if (!_internal253Aconstants.EDITOR) {
      return;
    } // TODO: refine undo/redo system
    // Because undo/redo will not call onEnable/onDisable,
    // we need call onEnable/onDisable manually to active/disactive children nodes.


    if (this.enabledInHierarchy) {
      this.onEnable();
    } else {
      this.onDisable();
    }
  }

  onDestroy() {
    for (const seg of this._segments) {
      seg.node.removeFromParent();

      if (seg.type === RichTextChildName) {
        labelPool.put(seg);
      } else if (seg.type === RichTextChildImageName) {
        imagePool.put(seg);
      }
    }

    this.node.off(_index5.Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
    this.node.off(_index3.SystemEventType.LAYER_CHANGED, this._applyLayer, this);
  }

  _addEventListeners() {
    this.node.on(_index5.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  }

  _removeEventListeners() {
    this.node.off(_index5.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  }

  _updateLabelSegmentTextAttributes() {
    this._segments.forEach(item => {
      this._applyTextAttribute(item);
    });
  }

  _createFontLabel(str) {
    return getSegmentByPool(RichTextChildName, str);
  }

  _createImage(spriteFrame) {
    return getSegmentByPool(RichTextChildImageName, spriteFrame);
  }

  _onTTFLoaded() {
    if (this._font instanceof _index2.TTFFont) {
      if (this._font._nativeAsset) {
        this._layoutDirty = true;

        this._updateRichText();
      } else {
        _assetManager.default.postLoadNative(this._font, err => {
          if (!this.isValid) {
            return;
          }

          this._layoutDirty = true;

          this._updateRichText();
        });
      }
    } else {
      this._layoutDirty = true;

      this._updateRichText();
    }
  }

  _measureText(styleIndex, string) {
    const func = s => {
      let label;

      if (this._labelSegmentsCache.length === 0) {
        label = this._createFontLabel(s);

        this._labelSegmentsCache.push(label);
      } else {
        label = this._labelSegmentsCache[0];
        label.node.getComponent(_label.Label).string = s;
      }

      label.styleIndex = styleIndex;

      this._applyTextAttribute(label);

      const labelSize = label.node._uiProps.uiTransformComp.contentSize;
      return labelSize.width;
    };

    if (string) {
      return func(string);
    } else {
      return func;
    }
  }

  _onTouchEnded(event) {
    const components = this.node.getComponents(_index7.Component);

    for (const seg of this._segments) {
      const clickHandler = seg.clickHandler;
      const clickParam = seg.clickParam;

      if (clickHandler && this._containsTouchLocation(seg, event.touch.getUILocation())) {
        components.forEach(component => {
          const func = component[clickHandler];

          if (component.enabledInHierarchy && func) {
            func.call(component, event, clickParam);
          }
        });
        event.propagationStopped = true;
      }
    }
  }

  _containsTouchLocation(label, point) {
    const comp = label.node.getComponent(_index6.UITransform);

    if (!comp) {
      return false;
    }

    const myRect = comp.getBoundingBoxToWorld();
    return myRect.contains(point);
  }

  _resetState() {
    const children = this.node.children;

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        if (child.parent === this.node) {
          child.parent = null;
        } else {
          // In case child.parent !== this.node, child cannot be removed from children
          children.splice(i, 1);
        }

        const segment = createSegment(child.name);
        segment.node = child;

        if (child.name === RichTextChildName) {
          segment.comp = child.getComponent(_label.Label);
          labelPool.put(segment);
        } else {
          segment.comp = child.getComponent(_sprite.Sprite);
          imagePool.put(segment);
        }
      }
    } // Tolerate null parent child (upgrade issue may cause this special case)


    children.length = 0;
    this._segments.length = 0;
    this._labelSegmentsCache.length = 0;
    this._linesWidth.length = 0;
    this._lineOffsetX = 0;
    this._lineCount = 1;
    this._labelWidth = 0;
    this._labelHeight = 0;
    this._layoutDirty = true;
  }

  _activateChildren(active) {
    for (let i = this.node.children.length - 1; i >= 0; i--) {
      const child = this.node.children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        child.active = active;
      }
    }
  }

  _addLabelSegment(stringToken, styleIndex) {
    let labelSegment;

    if (this._labelSegmentsCache.length === 0) {
      labelSegment = this._createFontLabel(stringToken);
    } else {
      labelSegment = this._labelSegmentsCache.pop();
      const label = labelSegment.node.getComponent(_label.Label);

      if (label) {
        label.string = stringToken;
      }
    }

    labelSegment.styleIndex = styleIndex;
    labelSegment.lineCount = this._lineCount;

    labelSegment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0);

    labelSegment.node.layer = this.node.layer;

    this._applyTextAttribute(labelSegment);

    this.node.addChild(labelSegment.node);

    this._segments.push(labelSegment);

    return labelSegment;
  }

  _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex) {
    let fragmentWidth = labelWidth;
    let labelSegment;

    if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this._maxWidth) {
      // concat previous line
      let checkStartIndex = 0;

      while (this._lineOffsetX <= this._maxWidth) {
        const checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);

        const checkString = labelString.substr(checkStartIndex, checkEndIndex);

        const checkStringWidth = this._measureText(styleIndex, checkString);

        if (this._lineOffsetX + checkStringWidth <= this._maxWidth) {
          this._lineOffsetX += checkStringWidth;
          checkStartIndex += checkEndIndex;
        } else {
          if (checkStartIndex > 0) {
            const remainingString = labelString.substr(0, checkStartIndex);

            this._addLabelSegment(remainingString, styleIndex);

            labelString = labelString.substr(checkStartIndex, labelString.length);
            fragmentWidth = this._measureText(styleIndex, labelString);
          }

          this._updateLineInfo();

          break;
        }
      }
    }

    if (fragmentWidth > this._maxWidth) {
      const fragments = (0, _textUtils.fragmentText)(labelString, fragmentWidth, this._maxWidth, this._measureText(styleIndex));

      for (let k = 0; k < fragments.length; ++k) {
        const splitString = fragments[k];
        labelSegment = this._addLabelSegment(splitString, styleIndex);
        const labelSize = labelSegment.node._uiProps.uiTransformComp.contentSize;
        this._lineOffsetX += labelSize.width;

        if (fragments.length > 1 && k < fragments.length - 1) {
          this._updateLineInfo();
        }
      }
    } else {
      this._lineOffsetX += fragmentWidth;

      this._addLabelSegment(labelString, styleIndex);
    }
  }

  _isLastComponentCR(stringToken) {
    return stringToken.length - 1 === stringToken.lastIndexOf('\n');
  }

  _updateLineInfo() {
    this._linesWidth.push(this._lineOffsetX);

    this._lineOffsetX = 0;
    this._lineCount++;
  }

  _needsUpdateTextLayout(newTextArray) {
    if (this._layoutDirty || !this._textArray || !newTextArray) {
      return true;
    }

    if (this._textArray.length !== newTextArray.length) {
      return true;
    }

    for (let i = 0; i < this._textArray.length; i++) {
      const oldItem = this._textArray[i];
      const newItem = newTextArray[i];

      if (oldItem.text !== newItem.text) {
        return true;
      } else {
        const oldStyle = oldItem.style;
        const newStyle = newItem.style;

        if (oldStyle) {
          if (newStyle) {
            if (!!newStyle.outline !== !!oldStyle.outline) {
              return true;
            }

            if (oldStyle.size !== newStyle.size || oldStyle.italic !== newStyle.italic || oldStyle.isImage !== newStyle.isImage) {
              return true;
            }

            if (oldStyle.src !== newStyle.src || oldStyle.imageAlign !== newStyle.imageAlign || oldStyle.imageHeight !== newStyle.imageHeight || oldStyle.imageWidth !== newStyle.imageWidth || oldStyle.imageOffset !== newStyle.imageOffset) {
              return true;
            }
          } else if (oldStyle.size || oldStyle.italic || oldStyle.isImage || oldStyle.outline) {
            return true;
          }
        } else if (newStyle) {
          if (newStyle.size || newStyle.italic || newStyle.isImage || newStyle.outline) {
            return true;
          }
        }
      }
    }

    return false;
  }

  _addRichTextImageElement(richTextElement) {
    if (!richTextElement.style) {
      return;
    }

    const style = richTextElement.style;
    const spriteFrameName = style.src;

    const spriteFrame = this._imageAtlas && spriteFrameName && this._imageAtlas.getSpriteFrame(spriteFrameName);

    if (!spriteFrame) {
      (0, _index3.warnID)(4400);
    } else {
      const segment = this._createImage(spriteFrame);

      const sprite = segment.comp;

      switch (style.imageAlign) {
        case 'top':
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 1);

          break;

        case 'center':
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0.5);

          break;

        default:
          segment.node._uiProps.uiTransformComp.setAnchorPoint(0, 0);

          break;
      }

      segment.node.layer = this.node.layer;
      this.node.addChild(segment.node);

      this._segments.push(segment);

      const spriteRect = spriteFrame.rect.clone();
      let scaleFactor = 1;
      let spriteWidth = spriteRect.width;
      let spriteHeight = spriteRect.height;
      const expectWidth = style.imageWidth || 0;
      const expectHeight = style.imageHeight || 0;

      if (expectHeight > 0) {
        scaleFactor = expectHeight / spriteHeight;
        spriteWidth *= scaleFactor;
        spriteHeight *= scaleFactor;
      } else {
        scaleFactor = this._lineHeight / spriteHeight;
        spriteWidth *= scaleFactor;
        spriteHeight *= scaleFactor;
      }

      if (expectWidth > 0) {
        spriteWidth = expectWidth;
      }

      if (this._maxWidth > 0) {
        if (this._lineOffsetX + spriteWidth > this._maxWidth) {
          this._updateLineInfo();
        }

        this._lineOffsetX += spriteWidth;
      } else {
        this._lineOffsetX += spriteWidth;

        if (this._lineOffsetX > this._labelWidth) {
          this._labelWidth = this._lineOffsetX;
        }
      }

      segment.node._uiProps.uiTransformComp.setContentSize(spriteWidth, spriteHeight);

      segment.lineCount = this._lineCount;
      segment.clickHandler = '';
      segment.clickParam = '';
      const event = style.event;

      if (event) {
        segment.clickHandler = event.click;
        segment.clickParam = event.param;
      }
    }
  }

  _updateRichText() {
    if (!this.enabledInHierarchy) {
      return;
    }

    const newTextArray = _htmlTextParser.parse(this._string);

    if (!this._needsUpdateTextLayout(newTextArray)) {
      this._textArray = newTextArray.slice();

      this._updateLabelSegmentTextAttributes();

      return;
    }

    this._textArray = newTextArray.slice();

    this._resetState();

    let lastEmptyLine = false;
    let label;

    for (let i = 0; i < this._textArray.length; ++i) {
      const richTextElement = this._textArray[i];
      const text = richTextElement.text;

      if (text === undefined) {
        continue;
      } // handle <br/> <img /> tag


      if (text === '') {
        if (richTextElement.style && richTextElement.style.isNewLine) {
          this._updateLineInfo();

          continue;
        }

        if (richTextElement.style && richTextElement.style.isImage && this._imageAtlas) {
          this._addRichTextImageElement(richTextElement);

          continue;
        }
      }

      const multilineTexts = text.split('\n');

      for (let j = 0; j < multilineTexts.length; ++j) {
        const labelString = multilineTexts[j];

        if (labelString === '') {
          // for continues \n
          if (this._isLastComponentCR(text) && j === multilineTexts.length - 1) {
            continue;
          }

          this._updateLineInfo();

          lastEmptyLine = true;
          continue;
        }

        lastEmptyLine = false;

        if (this._maxWidth > 0) {
          const labelWidth = this._measureText(i, labelString);

          this._updateRichTextWithMaxWidth(labelString, labelWidth, i);

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        } else {
          label = this._addLabelSegment(labelString, i);
          this._lineOffsetX += label.node._uiProps.uiTransformComp.width;

          if (this._lineOffsetX > this._labelWidth) {
            this._labelWidth = this._lineOffsetX;
          }

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        }
      }
    }

    if (!lastEmptyLine) {
      this._linesWidth.push(this._lineOffsetX);
    }

    if (this._maxWidth > 0) {
      this._labelWidth = this._maxWidth;
    }

    this._labelHeight = (this._lineCount + _textUtils.BASELINE_RATIO) * this._lineHeight; // trigger "size-changed" event

    this.node._uiProps.uiTransformComp.setContentSize(this._labelWidth, this._labelHeight);

    this._updateRichTextPosition();

    this._layoutDirty = false;
  }

  _getFirstWordLen(text, startIndex, textLen) {
    let character = text.charAt(startIndex);

    if ((0, _textUtils.isUnicodeCJK)(character) || (0, _textUtils.isUnicodeSpace)(character)) {
      return 1;
    }

    let len = 1;

    for (let index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);

      if ((0, _textUtils.isUnicodeSpace)(character) || (0, _textUtils.isUnicodeCJK)(character)) {
        break;
      }

      len++;
    }

    return len;
  }

  _updateRichTextPosition() {
    let nextTokenX = 0;
    let nextLineIndex = 1;
    const totalLineCount = this._lineCount;
    const trans = this.node._uiProps.uiTransformComp;
    const anchorX = trans.anchorX;
    const anchorY = trans.anchorY;

    for (let i = 0; i < this._segments.length; ++i) {
      const segment = this._segments[i];
      const lineCount = segment.lineCount;

      if (lineCount > nextLineIndex) {
        nextTokenX = 0;
        nextLineIndex = lineCount;
      }

      let lineOffsetX = this._labelWidth * (this._horizontalAlign * 0.5 - anchorX);

      switch (this._horizontalAlign) {
        case _label.HorizontalTextAlignment.LEFT:
          break;

        case _label.HorizontalTextAlignment.CENTER:
          lineOffsetX -= this._linesWidth[lineCount - 1] / 2;
          break;

        case _label.HorizontalTextAlignment.RIGHT:
          lineOffsetX -= this._linesWidth[lineCount - 1];
          break;

        default:
          break;
      }

      const pos = segment.node.position;
      segment.node.setPosition(nextTokenX + lineOffsetX, this._lineHeight * (totalLineCount - lineCount) - this._labelHeight * anchorY, pos.z);

      if (lineCount === nextLineIndex) {
        nextTokenX += segment.node._uiProps.uiTransformComp.width;
      }

      const sprite = segment.node.getComponent(_sprite.Sprite);

      if (sprite) {
        const position = segment.node.position.clone(); // adjust img align (from <img align=top|center|bottom>)

        const lineHeightSet = this._lineHeight;
        const lineHeightReal = this._lineHeight * (1 + _textUtils.BASELINE_RATIO); // single line node height

        switch (segment.node._uiProps.uiTransformComp.anchorY) {
          case 1:
            position.y += lineHeightSet + (lineHeightReal - lineHeightSet) / 2;
            break;

          case 0.5:
            position.y += lineHeightReal / 2;
            break;

          default:
            position.y += (lineHeightReal - lineHeightSet) / 2;
            break;
        } // adjust img offset (from <img offset=12|12,34>)


        if (segment.imageOffset) {
          const offsets = segment.imageOffset.split(',');

          if (offsets.length === 1 && offsets[0]) {
            const offsetY = parseFloat(offsets[0]);
            if (Number.isInteger(offsetY)) position.y += offsetY;
          } else if (offsets.length === 2) {
            const offsetX = parseFloat(offsets[0]);
            const offsetY = parseFloat(offsets[1]);
            if (Number.isInteger(offsetX)) position.x += offsetX;
            if (Number.isInteger(offsetY)) position.y += offsetY;
          }
        }

        segment.node.position = position;
      } // adjust y for label with outline


      const outline = segment.node.getComponent(_labelOutline.LabelOutline);

      if (outline) {
        const position = segment.node.position.clone();
        position.y -= outline.width;
        segment.node.position = position;
      }
    }
  }

  _convertLiteralColorValue(color) {
    const colorValue = color.toUpperCase();

    if (_index4.Color[colorValue]) {
      const colorUse = _index4.Color[colorValue];
      return colorUse;
    } else {
      const out = new _index4.Color();
      return out.fromHEX(color);
    }
  }

  _applyTextAttribute(labelSeg) {
    const label = labelSeg.node.getComponent(_label.Label);

    if (!label) {
      return;
    }

    const index = labelSeg.styleIndex;
    let textStyle;

    if (this._textArray[index]) {
      textStyle = this._textArray[index].style;
    }

    if (textStyle) {
      label.color = this._convertLiteralColorValue(textStyle.color || 'white');
      label.isBold = !!textStyle.bold;
      label.isItalic = !!textStyle.italic; // TODO: temporary implementation, the italic effect should be implemented in the internal of label-assembler.
      // if (textStyle.italic) {
      //     labelNode.skewX = 12;
      // }

      label.isUnderline = !!textStyle.underline;

      if (textStyle.outline) {
        let labelOutline = labelSeg.node.getComponent(_labelOutline.LabelOutline);

        if (!labelOutline) {
          labelOutline = labelSeg.node.addComponent(_labelOutline.LabelOutline);
        }

        labelOutline.color = this._convertLiteralColorValue(textStyle.outline.color);
        labelOutline.width = textStyle.outline.width;
      }

      label.fontSize = textStyle.size || this._fontSize;
      labelSeg.clickHandler = '';
      labelSeg.clickParam = '';
      const event = textStyle.event;

      if (event) {
        labelSeg.clickHandler = event.click || '';
        labelSeg.clickParam = event.param || '';
      }
    } else {
      label.fontSize = this._fontSize;
    }

    label.cacheMode = this._cacheMode;
    const isAsset = this._font instanceof _index2.Font;

    if (isAsset && !this._isSystemFontUsed) {
      label.font = this._font;
    } else {
      label.fontFamily = this._fontFamily;
    }

    label.useSystemFont = this._isSystemFontUsed;
    label.lineHeight = this._lineHeight;
    label.updateRenderData(true); // Todo: need update context size after this function call
    // @ts-expect-error update assembler renderData for richText

    const assembler = label._assembler;

    if (assembler) {
      assembler.updateRenderData(label);
    }
  }

  _applyLayer() {
    for (const seg of this._segments) {
      seg.node.layer = this.node.layer;
    }
  }

}, _class3.HorizontalAlign = _label.HorizontalTextAlignment, _class3.VerticalAlign = _label.VerticalTextAlignment, _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_index.multiline, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalAlign", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "fontSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontFamily", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "fontFamily"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useSystemFont", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "useSystemFont"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cacheMode", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "cacheMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxWidth", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "maxWidth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineHeight", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "lineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "imageAtlas", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "imageAtlas"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTouchEvent", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTouchEvent"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lineHeight", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 40;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_string", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '<color=#00ff00>Rich</color><color=#0fffff>Text</color>';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalAlign", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _label.HorizontalTextAlignment.LEFT;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fontSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 40;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_maxWidth", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'Arial';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_font", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_isSystemFontUsed", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_userDefinedFont", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_cacheMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _label.CacheMode.NONE;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_imageAtlas", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_handleTouchEvent", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.RichText = RichText;