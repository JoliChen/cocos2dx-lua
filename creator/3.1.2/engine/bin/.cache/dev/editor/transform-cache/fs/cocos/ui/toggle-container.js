"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleContainer = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../core/components/index.js");

var _globalExports = require("../core/global-exports.js");

var _index3 = require("../core/platform/event-manager/index.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * ToggleContainer is not a visible UI component but a way to modify the behavior of a set of Toggles. <br/>
 * Toggles that belong to the same group could only have one of them to be switched on at a time.<br/>
 * Note: All the first layer child node containing the toggle component will auto be added to the container.
 *
 * @zh
 * ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，<br/>
 * 任何时候只能有一个 Toggle 处于选中状态。
 */
let ToggleContainer = (_dec = (0, _index.ccclass)('cc.ToggleContainer'), _dec2 = (0, _index.help)('i18n:cc.ToggleContainer'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/ToggleContainer'), _dec5 = (0, _index.tooltip)('i18n:toggle_group.allowSwitchOff'), _dec6 = (0, _index.type)([_index2.EventHandler]), _dec7 = (0, _index.tooltip)('i18n:toggle_group.check_events'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class ToggleContainer extends _index2.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_allowSwitchOff", _descriptor, this);

    _initializerDefineProperty(this, "checkEvents", _descriptor2, this);
  }

  /**
   * @en
   * If this setting is true, a toggle could be switched off and on when pressed.
   * If it is false, it will make sure there is always only one toggle could be switched on
   * and the already switched on toggle can't be switched off.
   *
   * @zh
   * 如果这个设置为 true，那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。
   */
  get allowSwitchOff() {
    return this._allowSwitchOff;
  }

  set allowSwitchOff(value) {
    this._allowSwitchOff = value;
  }
  /**
   * @en
   * If Toggle is clicked, it will trigger event's handler.
   *
   * @zh
   * Toggle 按钮的点击事件列表。
   */


  /**
   * @en
   * Read only property, return the toggle items array reference managed by ToggleContainer.
   *
   * @zh
   * 只读属性，返回 toggleContainer 管理的 toggle 数组引用。
   */
  get toggleItems() {
    return this.node.children.map(item => {
      const toggle = item.getComponent('cc.Toggle');

      if (toggle && toggle.enabled) {
        return toggle;
      }

      return null;
    }).filter(Boolean);
  }

  onEnable() {
    this.ensureValidState();
    this.node.on(_index3.SystemEventType.CHILD_ADDED, this.ensureValidState, this);
    this.node.on(_index3.SystemEventType.CHILD_REMOVED, this.ensureValidState, this);
  }

  onDisable() {
    this.node.off(_index3.SystemEventType.CHILD_ADDED, this.ensureValidState, this);
    this.node.off(_index3.SystemEventType.CHILD_REMOVED, this.ensureValidState, this);
  }

  activeToggles() {
    return this.toggleItems.filter(x => x.isChecked);
  }

  anyTogglesChecked() {
    return !!this.toggleItems.find(x => x.isChecked);
  }
  /**
   * @en
   * Refresh the state of the managed toggles.
   *
   * @zh
   * 刷新管理的 toggle 状态。
   *
   * @param toggle - 需要被更新的 toggle。
   * @param emitEvent - 是否需要触发事件
   */


  notifyToggleCheck(toggle, emitEvent = true) {
    if (!this.enabledInHierarchy) {
      return;
    }

    for (let i = 0; i < this.toggleItems.length; i++) {
      const item = this.toggleItems[i];

      if (item === toggle) {
        continue;
      }

      if (emitEvent) {
        item.isChecked = false;
      } else {
        item.setIsCheckedWithoutNotify(false);
      }
    }

    if (this.checkEvents) {
      _globalExports.legacyCC.Component.EventHandler.emitEvents(this.checkEvents, toggle);
    }
  }

  ensureValidState() {
    const toggles = this.toggleItems;

    if (!this._allowSwitchOff && !this.anyTogglesChecked() && toggles.length !== 0) {
      const toggle = toggles[0];
      toggle.isChecked = true;
      this.notifyToggleCheck(toggle);
    }

    const activeToggles = this.activeToggles();

    if (activeToggles.length > 1) {
      const firstToggle = activeToggles[0];

      for (let i = 0; i < activeToggles.length; ++i) {
        const toggle = activeToggles[i];

        if (toggle === firstToggle) {
          continue;
        }

        toggle.isChecked = false;
      }
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_allowSwitchOff", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "allowSwitchOff", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "allowSwitchOff"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "checkEvents", [_dec6, _index.serializable, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.ToggleContainer = ToggleContainer;