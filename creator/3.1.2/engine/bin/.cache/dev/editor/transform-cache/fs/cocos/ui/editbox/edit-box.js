"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditBox = void 0;

var _index = require("../../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index2 = require("../../2d/framework/index.js");

var _spriteFrame = require("../../2d/assets/sprite-frame.js");

var _component = require("../../core/components/component.js");

var _componentEventHandler = require("../../core/components/component-event-handler.js");

var _eventEnum = require("../../core/platform/event-manager/event-enum.js");

var _node = require("../../core/scene-graph/node.js");

var _label = require("../../2d/components/label.js");

var _sprite = require("../../2d/components/sprite.js");

var _editBoxImpl = require("./edit-box-impl.js");

var _editBoxImplBase = require("./edit-box-impl-base.js");

var _types = require("./types.js");

var _globalExports = require("../../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const LEFT_PADDING = 2;

function capitalize(str) {
  return str.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var EventType;
/**
 * @en
 * `EditBox` is a component for inputing text, you can use it to gather small amounts of text from users.
 *
 * @zh
 * `EditBox` 组件，用于获取用户的输入文本。
 */

(function (EventType) {
  EventType["EDITING_DID_BEGAN"] = "editing-did-began";
  EventType["EDITING_DID_ENDED"] = "editing-did-ended";
  EventType["TEXT_CHANGED"] = "text-changed";
  EventType["EDITING_RETURN"] = "editing-return";
})(EventType || (EventType = {}));

let EditBox = (_dec = (0, _index.ccclass)('cc.EditBox'), _dec2 = (0, _index.help)('i18n:cc.EditBox'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/EditBox'), _dec5 = (0, _index.requireComponent)(_index2.UITransform), _dec6 = (0, _index.displayOrder)(1), _dec7 = (0, _index.tooltip)('i18n:editbox.string'), _dec8 = (0, _index.displayOrder)(2), _dec9 = (0, _index.tooltip)('i18n:editbox.placeholder'), _dec10 = (0, _index.type)(_label.Label), _dec11 = (0, _index.displayOrder)(3), _dec12 = (0, _index.tooltip)('i18n:editbox.text_lable'), _dec13 = (0, _index.type)(_label.Label), _dec14 = (0, _index.displayOrder)(4), _dec15 = (0, _index.tooltip)('i18n:editbox.placeholder_label'), _dec16 = (0, _index.type)(_spriteFrame.SpriteFrame), _dec17 = (0, _index.displayOrder)(5), _dec18 = (0, _index.tooltip)('i18n:editbox.backgroundImage'), _dec19 = (0, _index.type)(_types.InputFlag), _dec20 = (0, _index.displayOrder)(6), _dec21 = (0, _index.tooltip)('i18n:editbox.input_flag'), _dec22 = (0, _index.type)(_types.InputMode), _dec23 = (0, _index.displayOrder)(7), _dec24 = (0, _index.tooltip)('i18n:editbox.input_mode'), _dec25 = (0, _index.type)(_types.KeyboardReturnType), _dec26 = (0, _index.displayOrder)(8), _dec27 = (0, _index.tooltip)('i18n:editbox.returnType'), _dec28 = (0, _index.displayOrder)(9), _dec29 = (0, _index.tooltip)('i18n:editbox.max_length'), _dec30 = (0, _index.displayOrder)(10), _dec31 = (0, _index.tooltip)('i18n:editbox.tab_index'), _dec32 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec33 = (0, _index.displayOrder)(11), _dec34 = (0, _index.tooltip)('i18n:editbox.editing_began'), _dec35 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec36 = (0, _index.displayOrder)(12), _dec37 = (0, _index.tooltip)('i18n:editbox.text_changed'), _dec38 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec39 = (0, _index.displayOrder)(13), _dec40 = (0, _index.tooltip)('i18n:editbox.editing_ended'), _dec41 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec42 = (0, _index.displayOrder)(14), _dec43 = (0, _index.tooltip)('i18n:editbox.editing_return'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class EditBox extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "editingDidBegan", _descriptor, this);

    _initializerDefineProperty(this, "textChanged", _descriptor2, this);

    _initializerDefineProperty(this, "editingDidEnded", _descriptor3, this);

    _initializerDefineProperty(this, "editingReturn", _descriptor4, this);

    this._impl = null;
    this._background = null;

    _initializerDefineProperty(this, "_textLabel", _descriptor5, this);

    _initializerDefineProperty(this, "_placeholderLabel", _descriptor6, this);

    _initializerDefineProperty(this, "_returnType", _descriptor7, this);

    _initializerDefineProperty(this, "_string", _descriptor8, this);

    _initializerDefineProperty(this, "_tabIndex", _descriptor9, this);

    _initializerDefineProperty(this, "_backgroundImage", _descriptor10, this);

    _initializerDefineProperty(this, "_inputFlag", _descriptor11, this);

    _initializerDefineProperty(this, "_inputMode", _descriptor12, this);

    _initializerDefineProperty(this, "_maxLength", _descriptor13, this);

    this._isLabelVisible = false;
  }

  /**
   * @en
   * Input string of EditBox.
   *
   * @zh
   * 输入框的初始输入内容，如果为空则会显示占位符的文本。
   */
  get string() {
    return this._string;
  }

  set string(value) {
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


  get placeholder() {
    if (!this._placeholderLabel) {
      return '';
    }

    return this._placeholderLabel.string;
  }

  set placeholder(value) {
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


  get textLabel() {
    return this._textLabel;
  }

  set textLabel(oldValue) {
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


  get placeholderLabel() {
    return this._placeholderLabel;
  }

  set placeholderLabel(oldValue) {
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


  get backgroundImage() {
    return this._backgroundImage;
  }

  set backgroundImage(value) {
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


  get inputFlag() {
    return this._inputFlag;
  }

  set inputFlag(value) {
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


  get inputMode() {
    return this._inputMode;
  }

  set inputMode(oldValue) {
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


  get returnType() {
    return this._returnType;
  }

  set returnType(value) {
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


  get maxLength() {
    return this._maxLength;
  }

  set maxLength(value) {
    this._maxLength = value;
  }
  /**
   * @en
   * Set the tabIndex of the DOM input element (only useful on Web).
   *
   * @zh
   * 修改 DOM 输入元素的 tabIndex（这个属性只有在 Web 上面修改有意义）。
   */


  get tabIndex() {
    return this._tabIndex;
  }

  set tabIndex(value) {
    if (this._tabIndex !== value) {
      this._tabIndex = value;

      if (this._impl) {
        this._impl.setTabIndex(value);
      }
    }
  }

  __preload() {
    this._init();
  }

  onEnable() {
    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this._registerEvent();
    }

    if (this._impl) {
      this._impl.onEnable();
    }
  }

  update() {
    if (this._impl) {
      this._impl.update();
    }
  }

  onDisable() {
    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this._unregisterEvent();
    }

    if (this._impl) {
      this._impl.onDisable();
    }
  }

  onDestroy() {
    if (this._impl) {
      this._impl.clear();
    }
  }
  /**
   * @en Let the EditBox get focus
   * @zh 让当前 EditBox 获得焦点。
   */


  setFocus() {
    if (this._impl) {
      this._impl.setFocus(true);
    }
  }
  /**
   * @en Let the EditBox get focus
   * @zh 让当前 EditBox 获得焦点
   */


  focus() {
    if (this._impl) {
      this._impl.setFocus(true);
    }
  }
  /**
   * @en Let the EditBox lose focus
   * @zh 让当前 EditBox 失去焦点
   */


  blur() {
    if (this._impl) {
      this._impl.setFocus(false);
    }
  }
  /**
   * @en Determine whether EditBox is getting focus or not.
   * @zh 判断 EditBox 是否获得了焦点。
   * Note: only available on Web at the moment.
   */


  isFocused() {
    if (this._impl) {
      return this._impl.isFocused();
    }

    return false;
  }

  _editBoxEditingDidBegan() {
    _componentEventHandler.EventHandler.emitEvents(this.editingDidBegan, this);

    this.node.emit(EventType.EDITING_DID_BEGAN, this);
  }

  _editBoxEditingDidEnded() {
    _componentEventHandler.EventHandler.emitEvents(this.editingDidEnded, this);

    this.node.emit(EventType.EDITING_DID_ENDED, this);
  }

  _editBoxTextChanged(text) {
    text = this._updateLabelStringStyle(text, true);
    this.string = text;

    _componentEventHandler.EventHandler.emitEvents(this.textChanged, text, this);

    this.node.emit(EventType.TEXT_CHANGED, this);
  }

  _editBoxEditingReturn() {
    _componentEventHandler.EventHandler.emitEvents(this.editingReturn, this);

    this.node.emit(EventType.EDITING_RETURN, this);
  }

  _showLabels() {
    this._isLabelVisible = true;

    this._updateLabels();
  }

  _hideLabels() {
    this._isLabelVisible = false;

    if (this._textLabel) {
      this._textLabel.node.active = false;
    }

    if (this._placeholderLabel) {
      this._placeholderLabel.node.active = false;
    }
  }

  _onTouchBegan(event) {
    event.propagationStopped = true;
  }

  _onTouchCancel(event) {
    event.propagationStopped = true;
  }

  _onTouchEnded(event) {
    if (this._impl) {
      this._impl.beginEditing();
    }

    event.propagationStopped = true;
  }

  _init() {
    this._createBackgroundSprite();

    this._updatePlaceholderLabel();

    this._updateTextLabel();

    this._isLabelVisible = true;
    this.node.on(_eventEnum.SystemEventType.SIZE_CHANGED, this._resizeChildNodes, this);
    const impl = this._impl = new EditBox._EditBoxImpl();
    impl.init(this);

    this._updateString(this._string);

    this._syncSize();
  }

  _createBackgroundSprite() {
    if (!this._background) {
      this._background = this.node.getComponent(_sprite.Sprite);

      if (!this._background) {
        this._background = this.node.addComponent(_sprite.Sprite);
      }
    }

    this._background.type = _sprite.Sprite.Type.SLICED;
    this._background.spriteFrame = this._backgroundImage;
  }

  _updateTextLabel() {
    let textLabel = this._textLabel; // If textLabel doesn't exist, create one.

    if (!textLabel) {
      let node = this.node.getChildByName('TEXT_LABEL');

      if (!node) {
        node = new _node.Node('TEXT_LABEL');
      }

      textLabel = node.getComponent(_label.Label);

      if (!textLabel) {
        textLabel = node.addComponent(_label.Label);
      }

      node.parent = this.node;
      this._textLabel = textLabel;
    } // update


    const transformComp = this._textLabel.node._uiProps.uiTransformComp;
    transformComp.setAnchorPoint(0, 1);
    textLabel.overflow = _label.Label.Overflow.CLAMP;

    if (this._inputMode === _types.InputMode.ANY) {
      textLabel.verticalAlign = _label.VerticalTextAlignment.TOP;
      textLabel.enableWrapText = true;
    } else {
      textLabel.enableWrapText = false;
    }

    textLabel.string = this._updateLabelStringStyle(this._string);
  }

  _updatePlaceholderLabel() {
    let placeholderLabel = this._placeholderLabel; // If placeholderLabel doesn't exist, create one.

    if (!placeholderLabel) {
      let node = this.node.getChildByName('PLACEHOLDER_LABEL');

      if (!node) {
        node = new _node.Node('PLACEHOLDER_LABEL');
      }

      placeholderLabel = node.getComponent(_label.Label);

      if (!placeholderLabel) {
        placeholderLabel = node.addComponent(_label.Label);
      }

      node.parent = this.node;
      this._placeholderLabel = placeholderLabel;
    } // update


    const transform = this._placeholderLabel.node._uiProps.uiTransformComp;
    transform.setAnchorPoint(0, 1);
    placeholderLabel.overflow = _label.Label.Overflow.CLAMP;

    if (this._inputMode === _types.InputMode.ANY) {
      placeholderLabel.verticalAlign = _label.VerticalTextAlignment.TOP;
      placeholderLabel.enableWrapText = true;
    } else {
      placeholderLabel.enableWrapText = false;
    }

    placeholderLabel.string = this.placeholder;
  }

  _syncSize() {
    const trans = this.node._uiProps.uiTransformComp;
    const size = trans.contentSize;

    if (this._background) {
      const bgTrans = this._background.node._uiProps.uiTransformComp;
      bgTrans.anchorPoint = trans.anchorPoint;
      bgTrans.setContentSize(size);
    }

    this._updateLabelPosition(size);

    if (this._impl) {
      this._impl.setSize(size.width, size.height);
    }
  }

  _updateLabels() {
    if (this._isLabelVisible) {
      const content = this._string;

      if (this._textLabel) {
        this._textLabel.node.active = content !== '';
      }

      if (this._placeholderLabel) {
        this._placeholderLabel.node.active = content === '';
      }
    }
  }

  _updateString(text) {
    const textLabel = this._textLabel; // Not inited yet

    if (!textLabel) {
      return;
    }

    let displayText = text;

    if (displayText) {
      displayText = this._updateLabelStringStyle(displayText);
    }

    textLabel.string = displayText;

    this._updateLabels();
  }

  _updateLabelStringStyle(text, ignorePassword = false) {
    const inputFlag = this._inputFlag;

    if (!ignorePassword && inputFlag === _types.InputFlag.PASSWORD) {
      let passwordString = '';
      const len = text.length;

      for (let i = 0; i < len; ++i) {
        passwordString += '\u25CF';
      }

      text = passwordString;
    } else if (inputFlag === _types.InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      text = text.toUpperCase();
    } else if (inputFlag === _types.InputFlag.INITIAL_CAPS_WORD) {
      text = capitalize(text);
    } else if (inputFlag === _types.InputFlag.INITIAL_CAPS_SENTENCE) {
      text = capitalizeFirstLetter(text);
    }

    return text;
  }

  _registerEvent() {
    this.node.on(_eventEnum.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(_eventEnum.SystemEventType.TOUCH_END, this._onTouchEnded, this);
  }

  _unregisterEvent() {
    this.node.off(_eventEnum.SystemEventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(_eventEnum.SystemEventType.TOUCH_END, this._onTouchEnded, this);
  }

  _updateLabelPosition(size) {
    const trans = this.node._uiProps.uiTransformComp;
    const offX = -trans.anchorX * trans.width;
    const offY = -trans.anchorY * trans.height;
    const placeholderLabel = this._placeholderLabel;
    const textLabel = this._textLabel;

    if (textLabel) {
      textLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING, size.height);

      textLabel.node.setPosition(offX + LEFT_PADDING, offY + size.height, textLabel.node.position.z);

      if (this._inputMode === _types.InputMode.ANY) {
        textLabel.verticalAlign = _label.VerticalTextAlignment.TOP;
      }

      textLabel.enableWrapText = this._inputMode === _types.InputMode.ANY;
    }

    if (placeholderLabel) {
      placeholderLabel.node._uiProps.uiTransformComp.setContentSize(size.width - LEFT_PADDING, size.height);

      placeholderLabel.lineHeight = size.height;
      placeholderLabel.node.setPosition(offX + LEFT_PADDING, offY + size.height, placeholderLabel.node.position.z);

      if (this._inputMode === _types.InputMode.ANY) {
        placeholderLabel.verticalAlign = _label.VerticalTextAlignment.TOP;
      }

      placeholderLabel.enableWrapText = this._inputMode === _types.InputMode.ANY;
    }
  }

  _resizeChildNodes() {
    const trans = this.node._uiProps.uiTransformComp;
    const textLabelNode = this._textLabel && this._textLabel.node;

    if (textLabelNode) {
      textLabelNode.setPosition(-trans.width / 2, trans.height / 2, textLabelNode.position.z);

      textLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
    }

    const placeholderLabelNode = this._placeholderLabel && this._placeholderLabel.node;

    if (placeholderLabelNode) {
      placeholderLabelNode.setPosition(-trans.width / 2, trans.height / 2, placeholderLabelNode.position.z);

      placeholderLabelNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
    }

    const backgroundNode = this._background && this._background.node;

    if (backgroundNode) {
      backgroundNode._uiProps.uiTransformComp.setContentSize(trans.contentSize);
    }
  }

}, _class3._EditBoxImpl = _editBoxImplBase.EditBoxImplBase, _class3.KeyboardReturnType = _types.KeyboardReturnType, _class3.InputFlag = _types.InputFlag, _class3.InputMode = _types.InputMode, _class3.EventType = EventType, _temp), (_applyDecoratedDescriptor(_class2.prototype, "string", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "string"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "placeholder"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "textLabel", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "textLabel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "placeholderLabel", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "placeholderLabel"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "backgroundImage", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "backgroundImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inputFlag", [_dec19, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "inputFlag"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "inputMode", [_dec22, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "inputMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "returnType", [_dec25, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "returnType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec28, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "maxLength"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tabIndex", [_dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "tabIndex"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "editingDidBegan", [_dec32, _index.serializable, _dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "textChanged", [_dec35, _index.serializable, _dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "editingDidEnded", [_dec38, _index.serializable, _dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "editingReturn", [_dec41, _index.serializable, _dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_textLabel", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_placeholderLabel", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_returnType", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.KeyboardReturnType.DEFAULT;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_string", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return '';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_tabIndex", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_backgroundImage", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_inputFlag", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.InputFlag.DEFAULT;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_inputMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return _types.InputMode.ANY;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_maxLength", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 20;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class) || _class); // this equals to sys.isBrowser
// now we have no web-adapter yet

exports.EditBox = EditBox;

if (typeof window === 'object' && typeof document === 'object' && !_internal253Aconstants.MINIGAME && !_internal253Aconstants.JSB && !_internal253Aconstants.RUNTIME_BASED) {
  EditBox._EditBoxImpl = _editBoxImpl.EditBoxImpl;
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