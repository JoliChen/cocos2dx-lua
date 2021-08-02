"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelShadow = void 0;

var _index = require("../../core/data/decorators/index.js");

var _component = require("../../core/components/component.js");

var _index2 = require("../../core/math/index.js");

var _label = require("./label.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @en Shadow effect for Label component, only for system fonts or TTF fonts
 * @zh 用于给 Label 组件添加阴影效果，只能用于系统字体或 ttf 字体
 * @example
 * import { Node, Label, LabelShadow } from 'cc';
 * // Create a new node and add label components.
 * const node = new Node("New Label");
 * const label = node.addComponent(Label);
 * const shadow = node.addComponent(LabelShadow);
 * node.parent = this.node;
 */
let LabelShadow = (_dec = (0, _index.ccclass)('cc.LabelShadow'), _dec2 = (0, _index.help)('i18n:cc.LabelShadow'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/LabelShadow'), _dec5 = (0, _index.requireComponent)(_label.Label), _dec6 = (0, _index.tooltip)('i18n:labelShadow.color'), _dec7 = (0, _index.tooltip)('i18n:labelShadow.offset'), _dec8 = (0, _index.tooltip)('i18n:labelShadow.blur'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = class LabelShadow extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_color", _descriptor, this);

    _initializerDefineProperty(this, "_offset", _descriptor2, this);

    _initializerDefineProperty(this, "_blur", _descriptor3, this);
  }

  /**
   * @en
   * Shadow color.
   *
   * @zh
   * 阴影的颜色。
   *
   * @example
   * ```ts
   * import { Color } from 'cc';
   * labelShadow.color = new Color(0.5, 0.3, 0.7, 1.0);
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
   * Offset between font and shadow
   *
   * @zh
   * 字体与阴影的偏移。
   *
   * @example
   * ```ts
   * import { Vec2 } from 'cc';
   * labelShadow.offset = new Vec2(2, 2);
   * ```
   */


  get offset() {
    return this._offset;
  }

  set offset(value) {
    this._offset = value;

    this._updateRenderData();
  }
  /**
   * @en
   * A non-negative float specifying the level of shadow blur
   *
   * @zh
   * 阴影的模糊程度
   *
   * @example
   * ```ts
   * labelShadow.blur = 2;
   * ```
   */


  get blur() {
    return this._blur;
  }

  set blur(value) {
    this._blur = value;

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
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_offset", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index2.Vec2(2, 2);
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_blur", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 2;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "offset", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "offset"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "blur", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "blur"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.LabelShadow = LabelShadow;