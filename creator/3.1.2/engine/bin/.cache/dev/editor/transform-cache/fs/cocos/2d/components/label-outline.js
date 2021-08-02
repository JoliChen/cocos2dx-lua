"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelOutline = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _index2 = require("../../core/math/index.js");

var _label = require("./label.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en
 * Outline effect used to change the display, only for system fonts or TTF fonts.
 *
 * @zh
 * 描边效果组件,用于字体描边,只能用于系统字体。
 *
 * @example
 * ```ts
 * import { Node, Label, LabelOutline } from 'cc';
 * // Create a new node and add label components.
 * const node = new Node("New Label");
 * const label = node.addComponent(Label);
 * const outline = node.addComponent(LabelOutline);
 * node.parent = this.node;
 * ```
 */
let LabelOutline = (_dec = (0, _index.ccclass)('cc.LabelOutline'), _dec2 = (0, _index.help)('i18n:cc.LabelOutline'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/LabelOutline'), _dec5 = (0, _index.requireComponent)(_label.Label), _dec6 = (0, _index.tooltip)('i18n:labelOutline.color'), _dec7 = (0, _index.tooltip)('i18n:labelOutline.width'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class LabelOutline extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_color", _descriptor, this);

    _initializerDefineProperty(this, "_width", _descriptor2, this);
  }

  /**
   * @en
   * Outline color.
   *
   * @zh
   * 改变描边的颜色。
   *
   * @example
   * ```ts
   * import { Color } from 'cc';
   * outline.color = new Color(0.5, 0.3, 0.7, 1.0);
   * ```
   */
  get color() {
    return this._color;
  }

  set color(value) {
    if (this._color === value) {
      return;
    }

    this._color.set(value);

    this._updateRenderData();
  }
  /**
   * @en
   * Change the outline width.
   *
   * @zh
   * 改变描边的宽度。
   *
   * @example
   * ```ts
   * outline.width = 3;
   * ```
   */


  get width() {
    return this._width;
  }

  set width(value) {
    if (this._width === value) {
      return;
    }

    this._width = value;

    this._updateRenderData();
  }

  onEnable() {
    this._updateRenderData();
  }

  onDisable() {
    this._updateRenderData();
  }

  _updateRenderData() {
    const label = this.node.getComponent(_label.Label);

    if (label) {
      label.updateRenderData(true);
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_color", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Color(0, 0, 0, 255);
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_width", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.LabelOutline = LabelOutline;