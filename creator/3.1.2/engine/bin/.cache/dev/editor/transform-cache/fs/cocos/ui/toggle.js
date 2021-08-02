"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _componentEventHandler = require("../core/components/component-event-handler.js");

var _index2 = require("../2d/framework/index.js");

var _sprite = require("../2d/components/sprite.js");

var _extendsEnum = require("../core/data/utils/extends-enum.js");

var _button = require("./button.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var EventType;
/**
 * @en
 * The toggle component is a CheckBox, when it used together with a ToggleGroup,
 * it could be treated as a RadioButton.
 *
 * @zh
 * Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
 */

(function (EventType) {
  EventType["TOGGLE"] = "toggle";
})(EventType || (EventType = {}));

let Toggle = (_dec = (0, _index.ccclass)('cc.Toggle'), _dec2 = (0, _index.help)('i18n:cc.Toggle'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/Toggle'), _dec5 = (0, _index.requireComponent)(_index2.UITransform), _dec6 = (0, _index.displayOrder)(2), _dec7 = (0, _index.tooltip)('i18n:toggle.isChecked'), _dec8 = (0, _index.type)(_sprite.Sprite), _dec9 = (0, _index.displayOrder)(3), _dec10 = (0, _index.tooltip)('i18n:toggle.checkMark'), _dec11 = (0, _index.type)([_componentEventHandler.EventHandler]), _dec12 = (0, _index.tooltip)('i18n:toggle.check_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = class Toggle extends _button.Button {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "checkEvents", _descriptor, this);

    _initializerDefineProperty(this, "_isChecked", _descriptor2, this);

    _initializerDefineProperty(this, "_checkMark", _descriptor3, this);
  }

  /**
   * @en
   * When this value is true, the check mark component will be enabled,
   * otherwise the check mark component will be disabled.
   *
   * @zh
   * 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
   */
  get isChecked() {
    return this._isChecked;
  }

  set isChecked(value) {
    this._set(value);
  }
  /**
   * @en
   * The image used for the checkmark.
   *
   * @zh
   * Toggle 处于选中状态时显示的图片。
   */


  get checkMark() {
    return this._checkMark;
  }

  set checkMark(value) {
    if (this._checkMark === value) {
      return;
    }

    this._checkMark = value;
  }

  set _resizeToTarget(value) {
    if (value) {
      this._resizeNodeToTargetNode();
    }
  }

  get _toggleContainer() {
    const parent = this.node.parent;

    if (_globalExports.legacyCC.Node.isNode(parent)) {
      return parent.getComponent('cc.ToggleContainer');
    }

    return null;
  }

  _internalToggle() {
    this.isChecked = !this.isChecked;
  }

  _set(value, emitEvent = true) {
    if (this._isChecked == value) return;
    this._isChecked = value;
    const group = this._toggleContainer;

    if (group && group.enabled && this.enabled) {
      if (value || !group.anyTogglesChecked() && !group.allowSwitchOff) {
        this._isChecked = true;
        group.notifyToggleCheck(this, emitEvent);
      }
    }

    this.playEffect();

    if (emitEvent) {
      this._emitToggleEvents();
    }
  } //


  playEffect() {
    if (this._checkMark) {
      this._checkMark.node.active = this._isChecked;
    }
  }
  /**
   * @en
   * Set isChecked without invoking checkEvents.
   *
   * @zh
   * 设置 isChecked 而不调用 checkEvents 回调。
   *
   * @param value - 是否被按下
   */


  setIsCheckedWithoutNotify(value) {
    this._set(value, false);
  }

  onEnable() {
    super.onEnable();
    this.playEffect();

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this.node.on(Toggle.EventType.CLICK, this._internalToggle, this);
    }
  }

  onDisable() {
    super.onDisable();

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this.node.off(Toggle.EventType.CLICK, this._internalToggle, this);
    }
  }

  OnDestroy() {
    const group = this._toggleContainer;

    if (group) {
      group.ensureValidState();
    }
  }

  _emitToggleEvents() {
    this.node.emit(Toggle.EventType.TOGGLE, this);

    if (this.checkEvents) {
      _componentEventHandler.EventHandler.emitEvents(this.checkEvents, this);
    }
  }

}, _class3.EventType = (0, _extendsEnum.extendsEnum)(EventType, _button.EventType), _temp), (_applyDecoratedDescriptor(_class2.prototype, "isChecked", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "isChecked"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "checkMark", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "checkMark"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "checkEvents", [_dec11, _index.serializable, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isChecked", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_checkMark", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
/**
 * @en
 * Note: This event is emitted from the node to which the component belongs.
 *
 * @zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event toggle
 * @param {Event.EventCustom} event
 * @param {Toggle} toggle - The Toggle component.
 */

exports.Toggle = Toggle;