"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIOpacity = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _misc = require("../../core/utils/misc.js");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

/**
 * @en
 * Set the UI transparency component.
 * This component can be used to influence subsequent render nodes.
 * Nodes that already have a rendering component can modify the alpha channel of color directly.
 *
 * @zh
 * UI 透明度设置组件。可以通过该组件设置透明度来影响后续的渲染节点。已经带有渲染组件的节点可以直接修改 color 的 alpha 通道。
 */
let UIOpacity = (_dec = (0, _index.ccclass)('cc.UIOpacity'), _dec2 = (0, _index.help)('i18n:cc.UIOpacity'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/UIOpacity'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class UIOpacity extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_opacity", _descriptor, this);
  }

  /**
   * @en
   * The transparency value of the impact.
   *
   * @zh
   * 透明度。
   */
  get opacity() {
    return this._opacity;
  }

  set opacity(value) {
    if (this._opacity === value) {
      return;
    }

    value = (0, _misc.clampf)(value, 0, 255);
    this._opacity = value;
    this.node._uiProps.localOpacity = value / 255;
  }

  onEnable() {
    this.node._uiProps.localOpacity = this._opacity / 255;
  }

  onDisable() {
    this.node._uiProps.localOpacity = 1;
  }

}, _temp), (_applyDecoratedDescriptor(_class2.prototype, "opacity", [_index.editable], Object.getOwnPropertyDescriptor(_class2.prototype, "opacity"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_opacity", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 255;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.UIOpacity = UIOpacity;