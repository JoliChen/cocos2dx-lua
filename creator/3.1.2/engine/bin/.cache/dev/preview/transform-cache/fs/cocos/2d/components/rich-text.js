System.register("q-bundled:///fs/cocos/2d/components/rich-text.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../assets/index.js", "../../core/platform/index.js", "../utils/text-utils.js", "../utils/html-text-parser.js", "../../core/utils/pool.js", "../../core/math/index.js", "../../core/scene-graph/index.js", "./label.js", "./label-outline.js", "./sprite.js", "../framework/index.js", "../../core/global-exports.js", "../../core/components/index.js", "../../core/asset-manager/asset-manager.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var ccclass, executeInEditMode, executionOrder, help, menu, tooltip, multiline, type, serializable, DEV, EDITOR, Font, SpriteAtlas, TTFFont, assert, SystemEventType, warnID, BASELINE_RATIO, fragmentText, isUnicodeCJK, isUnicodeSpace, HtmlTextParser, Pool, Color, Node, CacheMode, HorizontalTextAlignment, Label, VerticalTextAlignment, LabelOutline, Sprite, UIComponent, UITransform, legacyCC, Component, assetManager, CCObject, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp, _htmlTextParser, RichTextChildName, RichTextChildImageName, labelPool, imagePool, RichText;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  //
  function createSegment(type) {
    return {
      node: new Node(type),
      comp: null,
      lineCount: 0,
      styleIndex: 0,
      imageOffset: '',
      clickParam: '',
      clickHandler: '',
      type: type
    };
  }

  function getSegmentByPool(type, content) {
    var seg;

    if (type === RichTextChildName) {
      seg = labelPool._get();
    } else if (type === RichTextChildImageName) {
      seg = imagePool._get();
    }

    seg = seg || createSegment(type);
    var node = seg.node;

    if (!node) {
      node = new Node(type);
    }

    node.hideFlags |= CCObject.Flags.DontSave | CCObject.Flags.HideInHierarchy;

    if (type === RichTextChildImageName) {
      seg.comp = node.getComponent(Sprite) || node.addComponent(Sprite);
      seg.comp.spriteFrame = content;
      seg.comp.type = Sprite.Type.SLICED;
      seg.comp.sizeMode = Sprite.SizeMode.CUSTOM;
    } else {
      // RichTextChildName
      seg.comp = node.getComponent(Label) || node.addComponent(Label);
      seg.comp.string = content;
      seg.comp.horizontalAlign = HorizontalTextAlignment.LEFT;
      seg.comp.verticalAlign = VerticalTextAlignment.TOP;
    }

    node.setPosition(0, 0, 0);
    var trans = node._uiProps.uiTransformComp;
    trans.setAnchorPoint(0.5, 0.5);
    seg.node = node;
    seg.lineCount = 0;
    seg.styleIndex = 0;
    seg.imageOffset = '';
    seg.clickParam = '';
    seg.clickHandler = '';
    return seg;
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      help = _coreDataDecoratorsIndexJs.help;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      multiline = _coreDataDecoratorsIndexJs.multiline;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      DEV = _virtualInternal253AconstantsJs.DEV;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_assetsIndexJs) {
      Font = _assetsIndexJs.Font;
      SpriteAtlas = _assetsIndexJs.SpriteAtlas;
      TTFFont = _assetsIndexJs.TTFFont;
    }, function (_corePlatformIndexJs) {
      assert = _corePlatformIndexJs.assert;
      SystemEventType = _corePlatformIndexJs.SystemEventType;
      warnID = _corePlatformIndexJs.warnID;
    }, function (_utilsTextUtilsJs) {
      BASELINE_RATIO = _utilsTextUtilsJs.BASELINE_RATIO;
      fragmentText = _utilsTextUtilsJs.fragmentText;
      isUnicodeCJK = _utilsTextUtilsJs.isUnicodeCJK;
      isUnicodeSpace = _utilsTextUtilsJs.isUnicodeSpace;
    }, function (_utilsHtmlTextParserJs) {
      HtmlTextParser = _utilsHtmlTextParserJs.HtmlTextParser;
    }, function (_coreUtilsPoolJs) {
      Pool = _coreUtilsPoolJs.default;
    }, function (_coreMathIndexJs) {
      Color = _coreMathIndexJs.Color;
    }, function (_coreSceneGraphIndexJs) {
      Node = _coreSceneGraphIndexJs.Node;
    }, function (_labelJs) {
      CacheMode = _labelJs.CacheMode;
      HorizontalTextAlignment = _labelJs.HorizontalTextAlignment;
      Label = _labelJs.Label;
      VerticalTextAlignment = _labelJs.VerticalTextAlignment;
    }, function (_labelOutlineJs) {
      LabelOutline = _labelOutlineJs.LabelOutline;
    }, function (_spriteJs) {
      Sprite = _spriteJs.Sprite;
    }, function (_frameworkIndexJs) {
      UIComponent = _frameworkIndexJs.UIComponent;
      UITransform = _frameworkIndexJs.UITransform;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
    }, function (_coreAssetManagerAssetManagerJs) {
      assetManager = _coreAssetManagerAssetManagerJs.default;
    }, function (_coreIndexJs) {
      CCObject = _coreIndexJs.CCObject;
    }],
    execute: function () {
      _htmlTextParser = new HtmlTextParser();
      RichTextChildName = 'RICHTEXT_CHILD';
      RichTextChildImageName = 'RICHTEXT_Image_CHILD';
      /**
       * 富文本池。<br/>
       */

      labelPool = new Pool(function (seg) {
        if (DEV) {
          assert(!seg.node.parent, 'Recycling node\'s parent should be null!');
        }

        if (!legacyCC.isValid(seg.node)) {
          return false;
        } else {
          var outline = seg.node.getComponent(LabelOutline);

          if (outline) {
            outline.width = 0;
          }
        }

        return true;
      }, 20);
      imagePool = new Pool(function (seg) {
        if (DEV) {
          assert(!seg.node.parent, 'Recycling node\'s parent should be null!');
        }

        return legacyCC.isValid(seg.node);
      }, 10);

      /**
       * @en
       * The RichText Component.
       *
       * @zh
       * 富文本组件。
       */
      _export("RichText", RichText = (_dec = ccclass('cc.RichText'), _dec2 = help('i18n:cc.RichText'), _dec3 = executionOrder(110), _dec4 = menu('2D/RichText'), _dec5 = tooltip('i18n:richtext.string'), _dec6 = type(HorizontalTextAlignment), _dec7 = tooltip('i18n:richtext.horizontal_align'), _dec8 = tooltip('i18n:richtext.font_size'), _dec9 = tooltip('i18n:richtext.font_family'), _dec10 = type(Font), _dec11 = tooltip('i18n:richtext.font'), _dec12 = tooltip('i18n:richtext.use_system_font'), _dec13 = type(CacheMode), _dec14 = tooltip('i18n:richtext'), _dec15 = tooltip('i18n:richtext.max_width'), _dec16 = tooltip('i18n:richtext.line_height'), _dec17 = type(SpriteAtlas), _dec18 = tooltip('i18n:richtext.image_atlas'), _dec19 = tooltip('i18n:richtext.handleTouchEvent'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_UIComponent) {
        _inheritsLoose(RichText, _UIComponent);

        function RichText() {
          var _this;

          _this = _UIComponent.call(this) || this;

          _initializerDefineProperty(_this, "_lineHeight", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_string", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalAlign", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fontSize", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxWidth", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_fontFamily", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_font", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_isSystemFontUsed", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_userDefinedFont", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_cacheMode", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_imageAtlas", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_handleTouchEvent", _descriptor12, _assertThisInitialized(_this));

          _this._textArray = [];
          _this._segments = [];
          _this._labelSegmentsCache = [];
          _this._linesWidth = [];
          _this._lineCount = 1;
          _this._labelWidth = 0;
          _this._labelHeight = 0;
          _this._layoutDirty = true;
          _this._lineOffsetX = 0;
          _this._updateRichTextStatus = void 0;

          if (EDITOR) {
            _this._userDefinedFont = null;
          }

          _this._updateRichTextStatus = _this._updateRichText;
          return _this;
        }

        var _proto = RichText.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(SystemEventType.LAYER_CHANGED, this._applyLayer, this);
        };

        _proto.onEnable = function onEnable() {
          if (this.handleTouchEvent) {
            this._addEventListeners();
          }

          this._updateRichText();

          this._activateChildren(true);
        };

        _proto.onDisable = function onDisable() {
          if (this.handleTouchEvent) {
            this._removeEventListeners();
          }

          this._activateChildren(false);
        };

        _proto.start = function start() {
          this._onTTFLoaded();

          this.node.on(Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
        };

        _proto.onRestore = function onRestore() {
          if (!EDITOR) {
            return;
          } // TODO: refine undo/redo system
          // Because undo/redo will not call onEnable/onDisable,
          // we need call onEnable/onDisable manually to active/disactive children nodes.


          if (this.enabledInHierarchy) {
            this.onEnable();
          } else {
            this.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._segments), _step; !(_step = _iterator()).done;) {
            var seg = _step.value;
            seg.node.removeFromParent();

            if (seg.type === RichTextChildName) {
              labelPool.put(seg);
            } else if (seg.type === RichTextChildImageName) {
              imagePool.put(seg);
            }
          }

          this.node.off(Node.EventType.ANCHOR_CHANGED, this._updateRichTextPosition, this);
          this.node.off(SystemEventType.LAYER_CHANGED, this._applyLayer, this);
        };

        _proto._addEventListeners = function _addEventListeners() {
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._removeEventListeners = function _removeEventListeners() {
          this.node.off(Node.EventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._updateLabelSegmentTextAttributes = function _updateLabelSegmentTextAttributes() {
          var _this2 = this;

          this._segments.forEach(function (item) {
            _this2._applyTextAttribute(item);
          });
        };

        _proto._createFontLabel = function _createFontLabel(str) {
          return getSegmentByPool(RichTextChildName, str);
        };

        _proto._createImage = function _createImage(spriteFrame) {
          return getSegmentByPool(RichTextChildImageName, spriteFrame);
        };

        _proto._onTTFLoaded = function _onTTFLoaded() {
          var _this3 = this;

          if (this._font instanceof TTFFont) {
            if (this._font._nativeAsset) {
              this._layoutDirty = true;

              this._updateRichText();
            } else {
              assetManager.postLoadNative(this._font, function (err) {
                if (!_this3.isValid) {
                  return;
                }

                _this3._layoutDirty = true;

                _this3._updateRichText();
              });
            }
          } else {
            this._layoutDirty = true;

            this._updateRichText();
          }
        };

        _proto._measureText = function _measureText(styleIndex, string) {
          var _this4 = this;

          var func = function func(s) {
            var label;

            if (_this4._labelSegmentsCache.length === 0) {
              label = _this4._createFontLabel(s);

              _this4._labelSegmentsCache.push(label);
            } else {
              label = _this4._labelSegmentsCache[0];
              label.node.getComponent(Label).string = s;
            }

            label.styleIndex = styleIndex;

            _this4._applyTextAttribute(label);

            var labelSize = label.node._uiProps.uiTransformComp.contentSize;
            return labelSize.width;
          };

          if (string) {
            return func(string);
          } else {
            return func;
          }
        };

        _proto._onTouchEnded = function _onTouchEnded(event) {
          var _this5 = this;

          var components = this.node.getComponents(Component);

          var _loop = function _loop() {
            var seg = _step2.value;
            var clickHandler = seg.clickHandler;
            var clickParam = seg.clickParam;

            if (clickHandler && _this5._containsTouchLocation(seg, event.touch.getUILocation())) {
              components.forEach(function (component) {
                var func = component[clickHandler];

                if (component.enabledInHierarchy && func) {
                  func.call(component, event, clickParam);
                }
              });
              event.propagationStopped = true;
            }
          };

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._segments), _step2; !(_step2 = _iterator2()).done;) {
            _loop();
          }
        };

        _proto._containsTouchLocation = function _containsTouchLocation(label, point) {
          var comp = label.node.getComponent(UITransform);

          if (!comp) {
            return false;
          }

          var myRect = comp.getBoundingBoxToWorld();
          return myRect.contains(point);
        };

        _proto._resetState = function _resetState() {
          var children = this.node.children;

          for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];

            if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
              if (child.parent === this.node) {
                child.parent = null;
              } else {
                // In case child.parent !== this.node, child cannot be removed from children
                children.splice(i, 1);
              }

              var segment = createSegment(child.name);
              segment.node = child;

              if (child.name === RichTextChildName) {
                segment.comp = child.getComponent(Label);
                labelPool.put(segment);
              } else {
                segment.comp = child.getComponent(Sprite);
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
        };

        _proto._activateChildren = function _activateChildren(active) {
          for (var i = this.node.children.length - 1; i >= 0; i--) {
            var child = this.node.children[i];

            if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
              child.active = active;
            }
          }
        };

        _proto._addLabelSegment = function _addLabelSegment(stringToken, styleIndex) {
          var labelSegment;

          if (this._labelSegmentsCache.length === 0) {
            labelSegment = this._createFontLabel(stringToken);
          } else {
            labelSegment = this._labelSegmentsCache.pop();
            var label = labelSegment.node.getComponent(Label);

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
        };

        _proto._updateRichTextWithMaxWidth = function _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex) {
          var fragmentWidth = labelWidth;
          var labelSegment;

          if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this._maxWidth) {
            // concat previous line
            var checkStartIndex = 0;

            while (this._lineOffsetX <= this._maxWidth) {
              var checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);

              var checkString = labelString.substr(checkStartIndex, checkEndIndex);

              var checkStringWidth = this._measureText(styleIndex, checkString);

              if (this._lineOffsetX + checkStringWidth <= this._maxWidth) {
                this._lineOffsetX += checkStringWidth;
                checkStartIndex += checkEndIndex;
              } else {
                if (checkStartIndex > 0) {
                  var remainingString = labelString.substr(0, checkStartIndex);

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
            var fragments = fragmentText(labelString, fragmentWidth, this._maxWidth, this._measureText(styleIndex));

            for (var k = 0; k < fragments.length; ++k) {
              var splitString = fragments[k];
              labelSegment = this._addLabelSegment(splitString, styleIndex);
              var labelSize = labelSegment.node._uiProps.uiTransformComp.contentSize;
              this._lineOffsetX += labelSize.width;

              if (fragments.length > 1 && k < fragments.length - 1) {
                this._updateLineInfo();
              }
            }
          } else {
            this._lineOffsetX += fragmentWidth;

            this._addLabelSegment(labelString, styleIndex);
          }
        };

        _proto._isLastComponentCR = function _isLastComponentCR(stringToken) {
          return stringToken.length - 1 === stringToken.lastIndexOf('\n');
        };

        _proto._updateLineInfo = function _updateLineInfo() {
          this._linesWidth.push(this._lineOffsetX);

          this._lineOffsetX = 0;
          this._lineCount++;
        };

        _proto._needsUpdateTextLayout = function _needsUpdateTextLayout(newTextArray) {
          if (this._layoutDirty || !this._textArray || !newTextArray) {
            return true;
          }

          if (this._textArray.length !== newTextArray.length) {
            return true;
          }

          for (var i = 0; i < this._textArray.length; i++) {
            var oldItem = this._textArray[i];
            var newItem = newTextArray[i];

            if (oldItem.text !== newItem.text) {
              return true;
            } else {
              var oldStyle = oldItem.style;
              var newStyle = newItem.style;

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
        };

        _proto._addRichTextImageElement = function _addRichTextImageElement(richTextElement) {
          if (!richTextElement.style) {
            return;
          }

          var style = richTextElement.style;
          var spriteFrameName = style.src;

          var spriteFrame = this._imageAtlas && spriteFrameName && this._imageAtlas.getSpriteFrame(spriteFrameName);

          if (!spriteFrame) {
            warnID(4400);
          } else {
            var segment = this._createImage(spriteFrame);

            var sprite = segment.comp;

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

            var spriteRect = spriteFrame.rect.clone();
            var scaleFactor = 1;
            var spriteWidth = spriteRect.width;
            var spriteHeight = spriteRect.height;
            var expectWidth = style.imageWidth || 0;
            var expectHeight = style.imageHeight || 0;

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
            var event = style.event;

            if (event) {
              segment.clickHandler = event.click;
              segment.clickParam = event.param;
            }
          }
        };

        _proto._updateRichText = function _updateRichText() {
          if (!this.enabledInHierarchy) {
            return;
          }

          var newTextArray = _htmlTextParser.parse(this._string);

          if (!this._needsUpdateTextLayout(newTextArray)) {
            this._textArray = newTextArray.slice();

            this._updateLabelSegmentTextAttributes();

            return;
          }

          this._textArray = newTextArray.slice();

          this._resetState();

          var lastEmptyLine = false;
          var label;

          for (var i = 0; i < this._textArray.length; ++i) {
            var richTextElement = this._textArray[i];
            var text = richTextElement.text;

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

            var multilineTexts = text.split('\n');

            for (var j = 0; j < multilineTexts.length; ++j) {
              var labelString = multilineTexts[j];

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
                var labelWidth = this._measureText(i, labelString);

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

          this._labelHeight = (this._lineCount + BASELINE_RATIO) * this._lineHeight; // trigger "size-changed" event

          this.node._uiProps.uiTransformComp.setContentSize(this._labelWidth, this._labelHeight);

          this._updateRichTextPosition();

          this._layoutDirty = false;
        };

        _proto._getFirstWordLen = function _getFirstWordLen(text, startIndex, textLen) {
          var character = text.charAt(startIndex);

          if (isUnicodeCJK(character) || isUnicodeSpace(character)) {
            return 1;
          }

          var len = 1;

          for (var index = startIndex + 1; index < textLen; ++index) {
            character = text.charAt(index);

            if (isUnicodeSpace(character) || isUnicodeCJK(character)) {
              break;
            }

            len++;
          }

          return len;
        };

        _proto._updateRichTextPosition = function _updateRichTextPosition() {
          var nextTokenX = 0;
          var nextLineIndex = 1;
          var totalLineCount = this._lineCount;
          var trans = this.node._uiProps.uiTransformComp;
          var anchorX = trans.anchorX;
          var anchorY = trans.anchorY;

          for (var i = 0; i < this._segments.length; ++i) {
            var segment = this._segments[i];
            var lineCount = segment.lineCount;

            if (lineCount > nextLineIndex) {
              nextTokenX = 0;
              nextLineIndex = lineCount;
            }

            var lineOffsetX = this._labelWidth * (this._horizontalAlign * 0.5 - anchorX);

            switch (this._horizontalAlign) {
              case HorizontalTextAlignment.LEFT:
                break;

              case HorizontalTextAlignment.CENTER:
                lineOffsetX -= this._linesWidth[lineCount - 1] / 2;
                break;

              case HorizontalTextAlignment.RIGHT:
                lineOffsetX -= this._linesWidth[lineCount - 1];
                break;

              default:
                break;
            }

            var pos = segment.node.position;
            segment.node.setPosition(nextTokenX + lineOffsetX, this._lineHeight * (totalLineCount - lineCount) - this._labelHeight * anchorY, pos.z);

            if (lineCount === nextLineIndex) {
              nextTokenX += segment.node._uiProps.uiTransformComp.width;
            }

            var sprite = segment.node.getComponent(Sprite);

            if (sprite) {
              var position = segment.node.position.clone(); // adjust img align (from <img align=top|center|bottom>)

              var lineHeightSet = this._lineHeight;
              var lineHeightReal = this._lineHeight * (1 + BASELINE_RATIO); // single line node height

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
                var offsets = segment.imageOffset.split(',');

                if (offsets.length === 1 && offsets[0]) {
                  var offsetY = parseFloat(offsets[0]);
                  if (Number.isInteger(offsetY)) position.y += offsetY;
                } else if (offsets.length === 2) {
                  var offsetX = parseFloat(offsets[0]);

                  var _offsetY = parseFloat(offsets[1]);

                  if (Number.isInteger(offsetX)) position.x += offsetX;
                  if (Number.isInteger(_offsetY)) position.y += _offsetY;
                }
              }

              segment.node.position = position;
            } // adjust y for label with outline


            var outline = segment.node.getComponent(LabelOutline);

            if (outline) {
              var _position = segment.node.position.clone();

              _position.y -= outline.width;
              segment.node.position = _position;
            }
          }
        };

        _proto._convertLiteralColorValue = function _convertLiteralColorValue(color) {
          var colorValue = color.toUpperCase();

          if (Color[colorValue]) {
            var colorUse = Color[colorValue];
            return colorUse;
          } else {
            var out = new Color();
            return out.fromHEX(color);
          }
        };

        _proto._applyTextAttribute = function _applyTextAttribute(labelSeg) {
          var label = labelSeg.node.getComponent(Label);

          if (!label) {
            return;
          }

          var index = labelSeg.styleIndex;
          var textStyle;

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
              var labelOutline = labelSeg.node.getComponent(LabelOutline);

              if (!labelOutline) {
                labelOutline = labelSeg.node.addComponent(LabelOutline);
              }

              labelOutline.color = this._convertLiteralColorValue(textStyle.outline.color);
              labelOutline.width = textStyle.outline.width;
            }

            label.fontSize = textStyle.size || this._fontSize;
            labelSeg.clickHandler = '';
            labelSeg.clickParam = '';
            var event = textStyle.event;

            if (event) {
              labelSeg.clickHandler = event.click || '';
              labelSeg.clickParam = event.param || '';
            }
          } else {
            label.fontSize = this._fontSize;
          }

          label.cacheMode = this._cacheMode;
          var isAsset = this._font instanceof Font;

          if (isAsset && !this._isSystemFontUsed) {
            label.font = this._font;
          } else {
            label.fontFamily = this._fontFamily;
          }

          label.useSystemFont = this._isSystemFontUsed;
          label.lineHeight = this._lineHeight;
          label.updateRenderData(true); // Todo: need update context size after this function call
          // @ts-expect-error update assembler renderData for richText

          var assembler = label._assembler;

          if (assembler) {
            assembler.updateRenderData(label);
          }
        };

        _proto._applyLayer = function _applyLayer() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._segments), _step3; !(_step3 = _iterator3()).done;) {
            var seg = _step3.value;
            seg.node.layer = this.node.layer;
          }
        };

        _createClass(RichText, [{
          key: "string",
          get:
          /**
           * @en
           * Content string of RichText.
           *
           * @zh
           * 富文本显示的文本内容。
           */
          function get() {
            return this._string;
          },
          set: function set(value) {
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

        }, {
          key: "horizontalAlign",
          get: function get() {
            return this._horizontalAlign;
          },
          set: function set(value) {
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

        }, {
          key: "fontFamily",
          get: function get() {
            return this._fontFamily;
          },
          set: function set(value) {
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

        }, {
          key: "font",
          get: function get() {
            return this._font;
          },
          set: function set(value) {
            if (this._font === value) {
              return;
            }

            this._font = value;
            this._layoutDirty = true;

            if (this._font) {
              if (EDITOR) {
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

        }, {
          key: "useSystemFont",
          get: function get() {
            return this._isSystemFontUsed;
          },
          set: function set(value) {
            if (this._isSystemFontUsed === value) {
              return;
            }

            this._isSystemFontUsed = value;

            if (EDITOR) {
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

        }, {
          key: "cacheMode",
          get: function get() {
            return this._cacheMode;
          },
          set: function set(value) {
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

        }, {
          key: "maxWidth",
          get: function get() {
            return this._maxWidth;
          },
          set: function set(value) {
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

        }, {
          key: "imageAtlas",
          get: function get() {
            return this._imageAtlas;
          },
          set: function set(value) {
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

        }, {
          key: "handleTouchEvent",
          get: function get() {
            return this._handleTouchEvent;
          },
          set: function set(value) {
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
        }]);

        return RichText;
      }(UIComponent), _class3.HorizontalAlign = HorizontalTextAlignment, _class3.VerticalAlign = VerticalTextAlignment, _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [multiline, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalAlign", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalAlign"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontSize", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "fontSize"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fontFamily", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "fontFamily"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "font", [_dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "font"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useSystemFont", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "useSystemFont"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cacheMode", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "cacheMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxWidth", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "maxWidth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lineHeight", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "lineHeight"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "imageAtlas", [_dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "imageAtlas"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleTouchEvent", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "handleTouchEvent"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_lineHeight", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_string", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '<color=#00ff00>Rich</color><color=#0fffff>Text</color>';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalAlign", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return HorizontalTextAlignment.LEFT;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fontSize", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 40;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_maxWidth", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_fontFamily", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'Arial';
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_font", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_isSystemFontUsed", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_userDefinedFont", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_cacheMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return CacheMode.NONE;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_imageAtlas", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_handleTouchEvent", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
    }
  };
});