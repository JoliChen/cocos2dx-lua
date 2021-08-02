"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageViewIndicator = void 0;

var _index = require("../core/data/decorators/index.js");

var _index2 = require("../2d/assets/index.js");

var _index3 = require("../core/components/index.js");

var _index4 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _index5 = require("../core/scene-graph/index.js");

var _layout = require("./layout.js");

var _sprite = require("../2d/components/sprite.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _color = new _index4.Color();
/**
 * @en Enum for PageView Indicator direction.
 *
 * @zh 页面视图指示器的摆放方向
 *
 * @enum PageViewIndicator.Direction
 */


var Direction;

(function (Direction) {
  Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
  Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction || (Direction = {}));

(0, _enum.ccenum)(Direction);
/**
 * @en
 * The Page View Indicator Component.
 *
 * @zh
 * 页面视图每页标记组件
 */

let PageViewIndicator = (_dec = (0, _index.ccclass)('cc.PageViewIndicator'), _dec2 = (0, _index.help)('i18n:cc.PageViewIndicator'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/PageViewIndicator'), _dec5 = (0, _index.type)(_index2.SpriteFrame), _dec6 = (0, _index.tooltip)('i18n:pageview_indicator.spriteFrame'), _dec7 = (0, _index.type)(Direction), _dec8 = (0, _index.tooltip)('i18n:pageview_indicator.direction'), _dec9 = (0, _index.type)(_index4.Size), _dec10 = (0, _index.tooltip)('i18n:pageview_indicator.cell_size'), _dec11 = (0, _index.tooltip)('i18n:pageview_indicator.spacing'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class PageViewIndicator extends _index3.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "spacing", _descriptor, this);

    _initializerDefineProperty(this, "_spriteFrame", _descriptor2, this);

    _initializerDefineProperty(this, "_direction", _descriptor3, this);

    _initializerDefineProperty(this, "_cellSize", _descriptor4, this);

    this._layout = null;
    this._pageView = null;
    this._indicators = [];
  }

  /**
   * @en
   * The spriteFrame for each element.
   *
   * @zh
   * 每个页面标记显示的图片
   */
  get spriteFrame() {
    return this._spriteFrame;
  }

  set spriteFrame(value) {
    if (this._spriteFrame === value) {
      return;
    }

    this._spriteFrame = value;
  }
  /**
   * @en
   * The location direction of PageViewIndicator.
   *
   * @zh
   * 页面标记摆放方向
   *
   * @param direction 摆放方向
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    if (this._direction === value) {
      return;
    }

    this._direction = value;
  }
  /**
   * @en
   * The cellSize for each element.
   *
   * @zh
   * 每个页面标记的大小
   */


  get cellSize() {
    return this._cellSize;
  }

  set cellSize(value) {
    if (this._cellSize === value) {
      return;
    }

    this._cellSize = value;
  }

  onLoad() {
    this._updateLayout();
  }
  /**
   * @en
   * Set Page View.
   *
   * @zh
   * 设置页面视图
   *
   * @param target 页面视图对象
   */


  setPageView(target) {
    this._pageView = target;

    this._refresh();
  }

  _updateLayout() {
    this._layout = this.getComponent(_layout.Layout);

    if (!this._layout) {
      this._layout = this.addComponent(_layout.Layout);
    }

    const layout = this._layout;

    if (this.direction === Direction.HORIZONTAL) {
      layout.type = _layout.Layout.Type.HORIZONTAL;
      layout.spacingX = this.spacing;
    } else if (this.direction === Direction.VERTICAL) {
      layout.type = _layout.Layout.Type.VERTICAL;
      layout.spacingY = this.spacing;
    }

    layout.resizeMode = _layout.Layout.ResizeMode.CONTAINER;
  }

  _createIndicator() {
    const node = new _index5.Node();
    node.layer = this.node.layer;
    const sprite = node.addComponent(_sprite.Sprite);
    sprite.spriteFrame = this.spriteFrame;
    sprite.sizeMode = _sprite.Sprite.SizeMode.CUSTOM;
    node.parent = this.node;

    node._uiProps.uiTransformComp.setContentSize(this._cellSize);

    return node;
  }

  _changedState() {
    const indicators = this._indicators;

    if (indicators.length === 0 || !this._pageView) {
      return;
    }

    const idx = this._pageView.curPageIdx;

    if (idx >= indicators.length) {
      return;
    }

    for (let i = 0; i < indicators.length; ++i) {
      const node = indicators[i];

      if (!node._uiProps.uiComp) {
        continue;
      }

      const uiComp = node._uiProps.uiComp;

      _color.set(uiComp.color);

      _color.a = 255 / 2;
      uiComp.color = _color;
    }

    if (indicators[idx]._uiProps.uiComp) {
      const comp = indicators[idx]._uiProps.uiComp;

      _color.set(comp.color);

      _color.a = 255;
      comp.color = _color;
    }
  }

  _refresh() {
    if (!this._pageView) {
      return;
    }

    const indicators = this._indicators;

    const pages = this._pageView.getPages();

    if (pages.length === indicators.length) {
      return;
    }

    let i = 0;

    if (pages.length > indicators.length) {
      for (i = 0; i < pages.length; ++i) {
        if (!indicators[i]) {
          indicators[i] = this._createIndicator();
        }
      }
    } else {
      const count = indicators.length - pages.length;

      for (i = count; i > 0; --i) {
        const node = indicators[i - 1];
        this.node.removeChild(node);
        indicators.splice(i - 1, 1);
      }
    }

    if (this._layout && this._layout.enabledInHierarchy) {
      this._layout.updateLayout();
    }

    this._changedState();
  }

}, _class3.Direction = Direction, _temp), (_applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cellSize", [_dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "cellSize"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "spacing", [_index.serializable, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_spriteFrame", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Direction.HORIZONTAL;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_cellSize", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return new _index4.Size(20, 20);
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.PageViewIndicator = PageViewIndicator;