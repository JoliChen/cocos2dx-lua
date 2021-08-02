System.register("q-bundled:///fs/cocos/ui/editbox/edit-box.js", ["../../core/data/decorators/index.js", "../../../../virtual/internal%253Aconstants.js", "../../2d/framework/index.js", "../../2d/assets/sprite-frame.js", "../../core/components/component.js", "../../core/components/component-event-handler.js", "../../core/platform/event-manager/event-enum.js", "../../core/scene-graph/node.js", "../../2d/components/label.js", "../../2d/components/sprite.js", "./edit-box-impl.js", "./edit-box-impl-base.js", "./types.js", "../../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, executionOrder, menu, requireComponent, tooltip, displayOrder, type, serializable, EDITOR, JSB, MINIGAME, RUNTIME_BASED, UITransform, SpriteFrame, Component, ComponentEventHandler, SystemEventType, Node, Label, VerticalTextAlignment, Sprite, EditBoxImpl, EditBoxImplBase, InputFlag, InputMode, KeyboardReturnType, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _temp, LEFT_PADDING, EventType, EditBox;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function capitalize(str) {
    return str.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      JSB = _virtualInternal253AconstantsJs.JSB;
      MINIGAME = _virtualInternal253AconstantsJs.MINIGAME;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_dAssetsSpriteFrameJs) {
      SpriteFrame = _dAssetsSpriteFrameJs.SpriteFrame;
    }, function (_coreComponentsComponentJs) {
      Component = _coreComponentsComponentJs.Component;
    }, function (_coreComponentsComponentEventHandlerJs) {
      ComponentEventHandler = _coreComponentsComponentEventHandlerJs.EventHandler;
    }, function (_corePlatformEventManagerEventEnumJs) {
      SystemEventType = _corePlatformEventManagerEventEnumJs.SystemEventType;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_dComponentsLabelJs) {
      Label = _dComponentsLabelJs.Label;
      VerticalTextAlignment = _dComponentsLabelJs.VerticalTextAlignment;
    }, function (_dComponentsSpriteJs) {
      Sprite = _dComponentsSpriteJs.Sprite;
    }, function (_editBoxImplJs) {
      EditBoxImpl = _editBoxImplJs.EditBoxImpl;
    }, function (_editBoxImplBaseJs) {
      EditBoxImplBase = _editBoxImplBaseJs.EditBoxImplBase;
    }, function (_typesJs) {
      InputFlag = _typesJs.InputFlag;
      InputMode = _typesJs.InputMode;
      KeyboardReturnType = _typesJs.KeyboardReturnType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      LEFT_PADDING = 2;

      (function (EventType) {
        EventType["EDITING_DID_BEGAN"] = "editing-did-began";
        EventType["EDITING_DID_ENDED"] = "editing-did-ended";
        EventType["TEXT_CHANGED"] = "text-changed";
        EventType["EDITING_RETURN"] = "editing-return";
      })(EventType || (EventType = {}));

      /**
       * @en
       * `EditBox` is a component for inputing text, you can use it to gather small amounts of text from users.
       *
       * @zh
       * `EditBox` 组件，用于获取用户的输入文本。
       */
      _export("EditBox", EditBox = (_dec = ccclass('cc.EditBox'), _dec2 = help('i18n:cc.EditBox'), _dec3 = executionOrder(110), _dec4 = menu('UI/EditBox'), _dec5 = requireComponent(UITransform), _dec6 = displayOrder(1), _dec7 = tooltip('i18n:editbox.string'), _dec8 = displayOrder(2), _dec9 = tooltip('i18n:editbox.placeholder'), _dec10 = type(Label), _dec11 = displayOrder(3), _dec12 = tooltip('i18n:editbox.text_lable'), _dec13 = type(Label), _dec14 = displayOrder(4), _dec15 = tooltip('i18n:editbox.placeholder_label'), _dec16 = type(SpriteFrame), _dec17 = displayOrder(5), _dec18 = tooltip('i18n:editbox.backgroundImage'), _dec19 = type(InputFlag), _dec20 = displayOrder(6), _dec21 = tooltip('i18n:editbox.input_flag'), _dec22 = type(InputMode), _dec23 = displayOrder(7), _dec24 = tooltip('i18n:editbox.input_mode'), _dec25 = type(KeyboardReturnType), _dec26 = displayOrder(8), _dec27 = tooltip('i18n:editbox.returnType'), _dec28 = displayOrder(9), _dec29 = tooltip('i18n:editbox.max_length'), _dec30 = displayOrder(10), _dec31 = tooltip('i18n:editbox.tab_index'), _dec32 = type([ComponentEventHandler]), _dec33 = displayOrder(11), _dec34 = tooltip('i18n:editbox.editing_began'), _dec35 = type([ComponentEventHandler]), _dec36 = displayOrder(12), _dec37 = tooltip('i18n:editbox.text_changed'), _dec38 = type([ComponentEventHandler]), _dec39 = displayOrder(13), _dec40 = tooltip('i18n:editbox.editing_ended'), _dec41 = type([ComponentEventHandler]), _dec42 = displayOrder(14), _dec43 = tooltip('i18n:editbox.editing_return'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EditBox, _Component);

        function EditBox() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "editingDidBegan", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "textChanged", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editingDidEnded", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "editingReturn", _descriptor4, _assertThisInitialized(_this));

          _this._impl = null;
          _this._background = null;

          _initializerDefineProperty(_this, "_textLabel", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_placeholderLabel", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_returnType", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_string", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_tabIndex", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_backgroundImage", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_inputFlag", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_inputMode", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_maxLength", _descriptor13, _assertThisInitialized(_this));

          _this._isLabelVisible = false;
          return _this;
        }

        var _proto = EditBox.prototype;

        _proto.__preload = function __preload() {
          this._init();
        };

        _proto.onEnable = function onEnable() {
          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._registerEvent();
          }

          if (this._impl) {
            this._impl.onEnable();
          }
        };

        _proto.update = function update() {
          if (this._impl) {
            this._impl.update();
          }
        };

        _proto.onDisable = function onDisable() {
          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._unregisterEvent();
          }

          if (this._impl) {
            this._impl.onDisable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._impl) {
            this._impl.clear();
          }
        }
        /**
         * @en Let the EditBox get focus
         * @zh 让当前 EditBox 获得焦点。
         */
        ;

        _proto.setFocus = function setFocus() {
          if (this._impl) {
            this._impl.setFocus(true);
          }
        }
        /**
         * @en Let the EditBox get focus
         * @zh 让当前 EditBox 获得焦点
         */
        ;

        _proto.focus = function focus() {
          if (this._impl) {
            this._impl.setFocus(true);
          }
        }
        /**
         * @en Let the EditBox lose focus
         * @zh 让当前 EditBox 失去焦点
         */
        ;

        _proto.blur = function blur() {
          if (this._impl) {
            this._impl.setFocus(false);
          }
        }
        /**
         * @en Determine whether EditBox is getting focus or not.
         * @zh 判断 EditBox 是否获得了焦点。
         * Note: only available on Web at the moment.
         */
        ;

        _proto.isFocused = function isFocused() {
          if (this._impl) {
            return this._impl.isFocused();
          }

          return false;
        };

        _proto._editBoxEditingDidBegan = function _editBoxEditingDidBegan() {
          ComponentEventHandler.emitEvents(this.editingDidBegan, this);
          this.node.emit(EventType.EDITING_DID_BEGAN, this);
        };

        _proto._editBoxEditingDidEnded = function _editBoxEditingDidEnded() {
          ComponentEventHandler.emitEvents(this.editingDidEnded, this);
          this.node.emit(EventType.EDITING_DID_ENDED, this);
        };

        _proto._editBoxTextChanged = function _editBoxTextChanged(text) {
          text = this._updateLabelStringStyle(text, true);
          this.string = text;
          ComponentEventHandler.emitEvents(this.textChanged, text, this);
          this.node.emit(EventType.TEXT_CHANGED, this);
        };

        _proto._editBoxEditingReturn = function _editBoxEditingReturn() {
          ComponentEventHandler.emitEvents(this.editingReturn, this);
          this.node.emit(EventType.EDITING_RETURN, this);
        };

        _proto._showLabels = function _showLabels() {
          this._isLabelVisible = true;

          this._updateLabels();
        };

        _proto._hideLabels = function _hideLabels() {
          this._isLabelVisible = false;

          if (this._textLabel) {
            this._textLabel.node.active = false;
          }

          if (this._placeholderLabel) {
            this._placeholderLabel.node.active = false;
          }
        };

        _proto._onTouchBegan = function _onTouchBegan(event) {
          event.propagationStopped = true;
        };

        _proto._onTouchCancel = function _onTouchCancel(event) {
          event.propagationStopped = true;
        };

        _proto._onTouchEnded = function _onTouchEnded(event) {
          if (this._impl) {
            this._impl.beginEditing();
          }

          event.propagationStopped = true;
        };

        _proto._init = function _init() {
          this._createBackgroundSprite();

          this._updatePlaceholderLabel();

          this._updateTextLabel();

          this._isLabelVisible = true;
          this.node.on(SystemEventType.SIZE_CHANGED, this._resizeChildNodes, this);
          var impl = this._impl = new EditBox._EditBoxImpl();
          impl.init(this);

          this._updateString(this._string);

          this._syncSize();
        };

        _proto._createBackgroundSprite = function _createBackgroundSprite() {
          if (!this._background) {
            this._background = this.node.getComponent(Sprite);

            if (!this._background) {
              this._background = this.node.addComponent(Sprite);
            }
          }

          this._background.type = Sprite.Type.SLICED;
          this._background.spriteFrame = this._backgroundImage;
        };

        _proto._updateTextLabel = function _updateTextLabel() {
          var textLabel = this._textLabel; // If textLabel doesn't exist, create one.

          if (!textLabel) {
            var node = this.node.getChildByName('TEXT_LABEL');

            if (!node) {
              node = new Node('TEXT_LABEL');
            }

            textLabel = node.getComponent(Label);

            if (!textLabel) {
              textLabel = node.addComponent(Label);
            }

            node.parent = this.node;
            this._textLabel = textLabel;
          } // update


          var transformComp = this._textLabel.node._uiProps.uiTransformComp;
          transformComp.setAnchorPoint(0, 1);
          textLabel.overflow = Label.Overflow.CLAMP;

          if (this._inputMode === InputMode.ANY) {
            textLabel.verticalAlign = VerticalTextAlignment.TOP;
            textLabel.enableWrapText = true;
          } else {
            textLabel.enableWrapText = false;
          }

          textLabel.string = this._updateLabelStringStyle(this._string);
        };

        _proto._updatePlaceholderLabel = function _updatePlaceholderLabel() {
          var placeholderLabel = this._placeholderLabel; // If placeholderLabel doesn't exist, create one.

          if (!placeholderLabel) {
            var node = this.node.getChildByName('PLACEHOLDER_LABEL');

            if (!node) {
              node = new Node('PLACEHOLDER_LABEL');
            }

            placeholderLabel = node.getComponent(Label);

            if (!placeholderLabel) {
              placeholderLabel = node.addComponent(Label);
            }

            node.parent = this.node;
            this._placeholderLabel = placeholderLabel;
          } // update


          var transform = this._placeholderLabel.node._uiProps.uiTransformComp;
          transform.setAnchorPoint(0, 1);
          placeholderLabel.overflow = Label.Overflow.CLAMP;

          if (this._inputMode === InputMode.ANY) {
            placeholderLabel.verticalAlign = VerticalTextAlignment.TOP;
            placeholderLabel.enableWrapText = true;
          } else {
            placeholderLabel.enableWrapText = false;
          }

          placeholderLabel.string = this.placeholder;
        };

        _proto._syncSize = function _syncSize() {
          var trans = this.node._uiProps.uiTransformComp;
          var size = trans.contentSize;

          if (this._background) {
            var bgTrans = this._background.node._uiProps.uiTransformComp;
            bgTrans.anchorPoint = trans.anchorPoint;
            bgTrans.setContentSize(size);
          }

          this._updateLabelPosition(size);

          if (this._impl) {
            this._impl.setSize(size.width, size.height);
          }
        };

        _proto._updateLabels = function _updateLabels() {
          if (this._isLabelVisible) {
            var content = this._string;

            if (this._textLabel) {
              this._textLabel.node.active = content !== '';
            }

            if (this._placeholderLabel) {
              this._placeholderLabel.node.active = content === '';
            }
          }
        };

        _proto._updateString = function _updateString(text) {
          var textLabel = this._textLabel; // Not inited yet

          if (!textLabel) {
            return;
          }

          var displayText = text;

          if (displayText) {
            displayText = this._updateLabelStringStyle(displayText);
          }

          textLabel.string = displayText;

          this._updateLabels();
        };

        _proto._updateLabelStringStyle = function _updateLabelStringStyle(text, ignorePassword) {
          if (ignorePassword === void 0) {
            ignorePassword = false;
          }

          var inputFlag = this._inputFlag;

          if (!ignorePassword && inputFlag === InputFlag.PASSWORD) {
            var passwordString = '';
            var len = text.length;

            for (var i = 0; i < len; ++i) {
              passwordString += "\u25CF";
            }

            text = passwordString;
          } else if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
            text = text.toUpperCase();
          } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
            text = capitalize(text);
          } else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
            text = capitalizeFirstLetter(text);
          }

          return text;
        };

        _proto._registerEvent = function _registerEvent() {
          this.node.on(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.on(SystemEventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this.node.off(SystemEventType.TOUCH_START, this._onTouchBegan, this);
          this.node.off(SystemEventType.TOUCH_END, this._onTouchEnded, this);
        };

        _proto._updateLabelPosition = function _updateLabelPosition(size) {
          var trans = this.node._uiProps.uiTransformComp;
          var offX = -trans.anchorX * trans.width;
          var offY = -trans.anchorY * trans.height;
          var placeholderLabel = this._placeholderLabel;
          var textLabel = this._textLabel;

          if (textLabel) {
            textLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING, size.height);

            textLabel.node.setPosition(offX + LEFT_PADDING, offY + size.height, textLabel.node.position.z);

            if (this._inputMode === InputMode.ANY) {
              textLabel.verticalAlign = VerticalTextAlignment.TOP;
            }

            textLabel.enableWrapText = this._inputMode === InputMode.ANY;
          }

          if (placeholderLabel) {
            placeholderLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING, size.height);

            placeholderLabel.lineHeight = size.height;
            placeholderLabel.node.setPosition(offX + LEFT_PADDING, offY + size.height, placeholderLabel.node.position.z);

            if (this._inputMode === InputMode.ANY) {
              placeholderLabel.verticalAlign = VerticalTextAlignment.TOP;
            }

            placeholderLabel.enableWrapText = this._inputMode === InputMode.ANY;
          }
        };

        _proto._resizeChildNodes = function _resizeChildNodes() {
          var trans = this.node._uiProps.uiTransformComp;
          var textLabelNode = this._textLabel && this._textLabel.node;

          if (textLabelNode) {
            textLabelNode.setPosition(-trans.width / 2, trans.height / 2, textLabelNode.position.z);

            textLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }

          var placeholderLabelNode = this._placeholderLabel && this._placeholderLabel.node;

          if (placeholderLabelNode) {
            placeholderLabelNode.setPosition(-trans.width / 2, trans.height / 2, placeholderLabelNode.position.z);

            placeholderLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }

          var backgroundNode = this._background && this._background.node;

          if (backgroundNode) {
            backgroundNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
          }
        };

        _createClass(EditBox, [{
          key: "string",
          get:
          /**
           * @en
           * Input string of EditBox.
           *
           * @zh
           * 输入框的初始输入内容，如果为空则会显示占位符的文本。
           */
          function get() {
            return this._string;
          },
          set: function set(value) {
            if (this._maxLength >= 0 && value.length >= this._maxLength) {
              value = value.slice(0, this._maxLength);
            }

            this._string = value;

            this._updateString(value);
          }
          /**
           * @en
           * The display text of placeholder.
           *
           * @zh
           * 输入框占位符的文本内容。
           */

        }, {
          key: "placeholder",
          get: function get() {
            if (!this._placeholderLabel) {
              return '';
            }

            return this._placeholderLabel.string;
          },
          set: function set(value) {
            if (this._placeholderLabel) {
              this._placeholderLabel.string = value;
            }
          }
          /**
           * @en
           * The Label component attached to the node for EditBox's input text label
           *
           * @zh
           * 输入框输入文本节点上挂载的 Label 组件对象
           */

        }, {
          key: "textLabel",
          get: function get() {
            return this._textLabel;
          },
          set: function set(oldValue) {
            if (this._textLabel !== oldValue) {
              this._textLabel = oldValue;

              if (this._textLabel) {
                this._updateTextLabel();

                this._updateLabels();
              }
            }
          }
          /**
           * @en
           * The Label component attached to the node for EditBox's placeholder text label.
           *
           * @zh
           * 输入框占位符节点上挂载的 Label 组件对象。
           */

        }, {
          key: "placeholderLabel",
          get: function get() {
            return this._placeholderLabel;
          },
          set: function set(oldValue) {
            if (this._placeholderLabel !== oldValue) {
              this._placeholderLabel = oldValue;

              if (this._placeholderLabel) {
                this._updatePlaceholderLabel();

                this._updateLabels();
              }
            }
          }
          /**
           * @en
           * The background image of EditBox.
           *
           * @zh
           * 输入框的背景图片。
           */

        }, {
          key: "backgroundImage",
          get: function get() {
            return this._backgroundImage;
          },
          set: function set(value) {
            if (this._backgroundImage === value) {
              return;
            }

            this._backgroundImage = value;

            this._createBackgroundSprite();
          }
          /**
           * @en
           * Set the input flags that are to be applied to the EditBox.
           *
           * @zh
           * 指定输入标志位，可以指定输入方式为密码或者单词首字母大写。
           */

        }, {
          key: "inputFlag",
          get: function get() {
            return this._inputFlag;
          },
          set: function set(value) {
            this._inputFlag = value;

            this._updateString(this._string);
          }
          /**
           * @en
           * Set the input mode of the edit box.
           * If you pass ANY, it will create a multiline EditBox.
           *
           * @zh
           * 指定输入模式: ANY表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。
           */

        }, {
          key: "inputMode",
          get: function get() {
            return this._inputMode;
          },
          set: function set(oldValue) {
            if (this._inputMode !== oldValue) {
              this._inputMode = oldValue;

              this._updateTextLabel();

              this._updatePlaceholderLabel();
            }
          }
          /**
           * @en
           * The return key type of EditBox.
           * Note: it is meaningless for web platforms and desktop platforms.
           *
           * @zh
           * 指定移动设备上面回车按钮的样式。
           * 注意：这个选项对 web 平台与 desktop 平台无效。
           */

        }, {
          key: "returnType",
          get: function get() {
            return this._returnType;
          },
          set: function set(value) {
            this._returnType = value;
          }
          /**
           * @en
           * The maximize input length of EditBox.
           * - If pass a value less than 0, it won't limit the input number of characters.
           * - If pass 0, it doesn't allow input any characters.
           *
           * @zh
           * 输入框最大允许输入的字符个数。
           * - 如果值为小于 0 的值，则不会限制输入字符个数。
           * - 如果值为 0，则不允许用户进行任何输入。
           */

        }, {
          key: "maxLength",
          get: function get() {
            return this._maxLength;
          },
          set: function set(value) {
            this._maxLength = value;
          }
          /**
           * @en
           * Set the tabIndex of the DOM input element (only useful on Web).
           *
           * @zh
           * 修改 DOM 输入元素的 tabIndex（这个属性只有在 Web 上面修改有意义）。
           */

        }, {
          key: "tabIndex",
          get: function get() {
            return this._tabIndex;
          },
          set: function set(value) {
            if (this._tabIndex !== value) {
              this._tabIndex = value;

              if (this._impl) {
                this._impl.setTabIndex(value);
              }
            }
          }
        }]);

        return EditBox;
      }(Component), _class3._EditBoxImpl = EditBoxImplBase, _class3.KeyboardReturnType = KeyboardReturnType, _class3.InputFlag = InputFlag, _class3.InputMode = InputMode, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "placeholder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textLabel", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "textLabel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "placeholderLabel", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "placeholderLabel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "backgroundImage", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "backgroundImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inputFlag", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "inputFlag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inputMode", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "inputMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "returnType", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "returnType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "maxLength"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tabIndex", [_dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "tabIndex"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "editingDidBegan", [_dec32, serializable, _dec33, _dec34], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textChanged", [_dec35, serializable, _dec36, _dec37], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editingDidEnded", [_dec38, serializable, _dec39, _dec40], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "editingReturn", [_dec41, serializable, _dec42, _dec43], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_textLabel", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_placeholderLabel", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_returnType", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return KeyboardReturnType.DEFAULT;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_string", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_tabIndex", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_backgroundImage", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_inputFlag", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return InputFlag.DEFAULT;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_inputMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return InputMode.ANY;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_maxLength", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class) || _class)); // this equals to sys.isBrowser
      // now we have no web-adapter yet


      if (typeof window === 'object' && typeof document === 'object' && !MINIGAME && !JSB && !RUNTIME_BASED) {
        EditBox._EditBoxImpl = EditBoxImpl;
      }
      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event editing-did-began
       * @param {Event.EventCustom} event
       * @param {EditBox} editbox - The EditBox component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event editing-did-ended
       * @param {Event.EventCustom} event
       * @param {EditBox} editbox - The EditBox component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event text-changed
       * @param {Event.EventCustom} event
       * @param {EditBox} editbox - The EditBox component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event editing-return
       * @param {Event.EventCustom} event
       * @param {EditBox} editbox - The EditBox component.
       */

      /**
       * @en if you don't need the EditBox and it isn't in any running Scene, you should
       * call the destroy method on this component or the associated node explicitly.
       * Otherwise, the created DOM element won't be removed from web page.
       * @zh
       * 如果你不再使用 EditBox，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
       * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
       * @example
       * ```
       * editbox.node.parent = null;  // or  editbox.node.removeFromParent(false);
       * // when you don't need editbox anymore
       * editbox.node.destroy();
       * ```
       * @return {Boolean} whether it is the first time the destroy being called
       */

    }
  };
});