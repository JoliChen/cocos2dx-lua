"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollBar = void 0;

var _index = require("../core/data/decorators/index.js");

var _component = require("../core/components/component.js");

var _index2 = require("../2d/framework/index.js");

var _index3 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _utils = require("../core/math/utils.js");

var _sprite = require("../2d/components/sprite.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const GETTING_SHORTER_FACTOR = 20;

const _tempPos_1 = new _index3.Vec3();

const _tempPos_2 = new _index3.Vec3();

const _tempVec3 = new _index3.Vec3();

const defaultAnchor = new _index3.Vec2();

const _tempColor = new _index3.Color();

const _tempVec2 = new _index3.Vec2();
/**
 * @en
 * Enum for ScrollBar direction.
 *
 * @zh
 * 滚动条方向。
 */


var Direction;

(function (Direction) {
  Direction[Direction["HORIZONTAL"] = 0] = "HORIZONTAL";
  Direction[Direction["VERTICAL"] = 1] = "VERTICAL";
})(Direction || (Direction = {}));

(0, _enum.ccenum)(Direction);
/**
 * @en
 * The ScrollBar control allows the user to scroll an image or other view that is too large to see completely.
 *
 * @zh
 * 滚动条组件。
 */

let ScrollBar = (_dec = (0, _index.ccclass)('cc.ScrollBar'), _dec2 = (0, _index.help)('i18n:cc.ScrollBar'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/ScrollBar'), _dec5 = (0, _index.requireComponent)(_index2.UITransform), _dec6 = (0, _index.type)(_sprite.Sprite), _dec7 = (0, _index.displayOrder)(0), _dec8 = (0, _index.tooltip)('i18n:scrollbar.handle'), _dec9 = (0, _index.type)(Direction), _dec10 = (0, _index.displayOrder)(1), _dec11 = (0, _index.tooltip)('i18n:scrollbar.direction'), _dec12 = (0, _index.displayOrder)(2), _dec13 = (0, _index.tooltip)('i18n:scrollbar.auto_hide'), _dec14 = (0, _index.displayOrder)(3), _dec15 = (0, _index.tooltip)('i18n:scrollbar.auto_hide_time'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = class ScrollBar extends _component.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_scrollView", _descriptor, this);

    _initializerDefineProperty(this, "_handle", _descriptor2, this);

    _initializerDefineProperty(this, "_direction", _descriptor3, this);

    _initializerDefineProperty(this, "_enableAutoHide", _descriptor4, this);

    _initializerDefineProperty(this, "_autoHideTime", _descriptor5, this);

    this._touching = false;
    this._opacity = 255;
    this._autoHideRemainingTime = 0;
  }

  /**
   * @en
   * The "handle" part of the ScrollBar.
   *
   * @zh
   * 作为当前滚动区域位置显示的滑块 Sprite。
   */
  get handle() {
    return this._handle;
  }

  set handle(value) {
    if (this._handle === value) {
      return;
    }

    this._handle = value;
    this.onScroll(_index3.Vec2.ZERO);
  }
  /**
   * @en
   * The direction of scrolling.
   *
   * @zh
   * ScrollBar 的滚动方向。
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    if (this._direction === value) {
      return;
    }

    this._direction = value;
    this.onScroll(_index3.Vec2.ZERO);
  }
  /**
   * @en
   * Whether enable auto hide or not.
   *
   * @zh
   * 是否在没有滚动动作时自动隐藏 ScrollBar。
   */


  get enableAutoHide() {
    return this._enableAutoHide;
  }

  set enableAutoHide(value) {
    if (this._enableAutoHide === value) {
      return;
    }

    this._enableAutoHide = value;

    if (this._enableAutoHide) {
      this._setOpacity(0);
    }
  }
  /**
   * @en
   * The time to hide ScrollBar when scroll finished.
   * Note: This value is only useful when enableAutoHide is true.
   *
   * @zh
   * 没有滚动动作后经过多久会自动隐藏。<br/>
   * 注意：只要当 “enableAutoHide” 为 true 时，才有效。
   */


  get autoHideTime() {
    return this._autoHideTime;
  }

  set autoHideTime(value) {
    if (this._autoHideTime === value) {
      return;
    }

    this._autoHideTime = value;
  }

  /**
   * @en
   * Hide ScrollBar.
   *
   * @zh
   * 滚动条隐藏。
   */
  hide() {
    this._autoHideRemainingTime = 0;

    this._setOpacity(0);
  }
  /**
   * @en
   * Show ScrollBar.
   *
   * @zh
   * 滚动条显示。
   */


  show() {
    this._autoHideRemainingTime = this._autoHideTime;

    this._setOpacity(this._opacity);
  }
  /**
   * @en
   * Reset the position of ScrollBar.
   *
   * @zh
   * 重置滚动条位置。
   *
   * @param outOfBoundary - 滚动位移。
   */


  onScroll(outOfBoundary) {
    if (!this._scrollView) {
      return;
    }

    const content = this._scrollView.content;

    if (!content) {
      return;
    }

    const contentSize = content._uiProps.uiTransformComp.contentSize;
    const scrollViewSize = this._scrollView.node._uiProps.uiTransformComp.contentSize;
    const barSize = this.node._uiProps.uiTransformComp.contentSize;

    if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
      return;
    }

    if (this._enableAutoHide) {
      this._autoHideRemainingTime = this._autoHideTime;

      this._setOpacity(this._opacity);
    }

    let contentMeasure = 0;
    let scrollViewMeasure = 0;
    let outOfBoundaryValue = 0;
    let contentPosition = 0;
    let handleNodeMeasure = 0;
    const outOfContentPosition = _tempVec2;
    outOfContentPosition.set(0, 0);

    if (this._direction === Direction.HORIZONTAL) {
      contentMeasure = contentSize.width;
      scrollViewMeasure = scrollViewSize.width;
      handleNodeMeasure = barSize.width;
      outOfBoundaryValue = outOfBoundary.x;

      this._convertToScrollViewSpace(outOfContentPosition, content);

      contentPosition = -outOfContentPosition.x;
    } else if (this._direction === Direction.VERTICAL) {
      contentMeasure = contentSize.height;
      scrollViewMeasure = scrollViewSize.height;
      handleNodeMeasure = barSize.height;
      outOfBoundaryValue = outOfBoundary.y;

      this._convertToScrollViewSpace(outOfContentPosition, content);

      contentPosition = -outOfContentPosition.y;
    }

    const length = this._calculateLength(contentMeasure, scrollViewMeasure, handleNodeMeasure, outOfBoundaryValue);

    const position = _tempVec2;

    this._calculatePosition(position, contentMeasure, scrollViewMeasure, handleNodeMeasure, contentPosition, outOfBoundaryValue, length);

    this._updateLength(length);

    this._updateHandlerPosition(position);
  }
  /**
   * @zh
   * 滚动视窗设置。
   *
   * @param scrollView - 滚动视窗。
   */


  setScrollView(scrollView) {
    this._scrollView = scrollView;
  }

  onTouchBegan() {
    if (!this._enableAutoHide) {
      return;
    }

    this._touching = true;
  }

  onTouchEnded() {
    if (!this._enableAutoHide) {
      return;
    }

    this._touching = false;

    if (this._autoHideTime <= 0) {
      return;
    }

    if (this._scrollView) {
      const content = this._scrollView.content;

      if (content) {
        const contentSize = content._uiProps.uiTransformComp.contentSize;
        const scrollViewSize = this._scrollView.node._uiProps.uiTransformComp.contentSize;

        if (this._conditionalDisableScrollBar(contentSize, scrollViewSize)) {
          return;
        }
      }
    }

    this._autoHideRemainingTime = this._autoHideTime;
  }

  onEnable() {
    const renderComp = this.node.getComponent(_sprite.Sprite);

    if (renderComp) {
      this._opacity = renderComp.color.a;
    }
  }

  start() {
    if (this._enableAutoHide) {
      this._setOpacity(0);
    }
  }

  update(dt) {
    this._processAutoHide(dt);
  }

  _convertToScrollViewSpace(out, content) {
    const scrollTrans = this._scrollView && this._scrollView.node._uiProps.uiTransformComp;
    const contentTrans = content._uiProps.uiTransformComp;

    if (!scrollTrans || !contentTrans) {
      out.set(_index3.Vec2.ZERO);
    } else {
      _tempPos_1.set(-contentTrans.anchorX * contentTrans.width, -contentTrans.anchorY * contentTrans.height, 0);

      contentTrans.convertToWorldSpaceAR(_tempPos_1, _tempPos_2);
      const scrollViewSpacePos = scrollTrans.convertToNodeSpaceAR(_tempPos_2);
      scrollViewSpacePos.x += scrollTrans.anchorX * scrollTrans.width;
      scrollViewSpacePos.y += scrollTrans.anchorY * scrollTrans.height;
      out.set(scrollViewSpacePos.x, scrollViewSpacePos.y);
    }
  }

  _setOpacity(opacity) {
    if (this._handle) {
      let renderComp = this.node.getComponent(_sprite.Sprite);

      if (renderComp) {
        _tempColor.set(renderComp.color);

        _tempColor.a = opacity;
        renderComp.color = _tempColor;
      }

      renderComp = this._handle.getComponent(_sprite.Sprite);

      if (renderComp) {
        _tempColor.set(renderComp.color);

        _tempColor.a = opacity;
        renderComp.color = _tempColor;
      }
    }
  }

  _updateHandlerPosition(position) {
    if (this._handle) {
      const oldPosition = _tempVec3;

      this._fixupHandlerPosition(oldPosition);

      this._handle.node.setPosition(position.x + oldPosition.x, position.y + oldPosition.y, oldPosition.z);
    }
  }

  _fixupHandlerPosition(out) {
    const uiTrans = this.node._uiProps.uiTransformComp;
    const barSize = uiTrans.contentSize;
    const barAnchor = uiTrans.anchorPoint;
    const handleSize = this.handle.node._uiProps.uiTransformComp.contentSize;
    const handleParent = this.handle.node.parent;

    _index3.Vec3.set(_tempPos_1, -barSize.width * barAnchor.x, -barSize.height * barAnchor.y, 0);

    const leftBottomWorldPosition = this.node._uiProps.uiTransformComp.convertToWorldSpaceAR(_tempPos_1, _tempPos_2);

    const fixupPosition = out;
    fixupPosition.set(0, 0, 0);

    handleParent._uiProps.uiTransformComp.convertToNodeSpaceAR(leftBottomWorldPosition, fixupPosition);

    if (this.direction === Direction.HORIZONTAL) {
      fixupPosition.set(fixupPosition.x, fixupPosition.y + (barSize.height - handleSize.height) / 2, fixupPosition.z);
    } else if (this.direction === Direction.VERTICAL) {
      fixupPosition.set(fixupPosition.x + (barSize.width - handleSize.width) / 2, fixupPosition.y, fixupPosition.z);
    }

    this.handle.node.setPosition(fixupPosition);
  }

  _conditionalDisableScrollBar(contentSize, scrollViewSize) {
    if (contentSize.width <= scrollViewSize.width && this._direction === Direction.HORIZONTAL) {
      return true;
    }

    if (contentSize.height <= scrollViewSize.height && this._direction === Direction.VERTICAL) {
      return true;
    }

    return false;
  }

  _calculateLength(contentMeasure, scrollViewMeasure, handleNodeMeasure, outOfBoundary) {
    let denominatorValue = contentMeasure;

    if (outOfBoundary) {
      denominatorValue += (outOfBoundary > 0 ? outOfBoundary : -outOfBoundary) * GETTING_SHORTER_FACTOR;
    }

    const lengthRation = scrollViewMeasure / denominatorValue;
    return handleNodeMeasure * lengthRation;
  }

  _calculatePosition(out, contentMeasure, scrollViewMeasure, handleNodeMeasure, contentPosition, outOfBoundary, actualLenth) {
    let denominatorValue = contentMeasure - scrollViewMeasure;

    if (outOfBoundary) {
      denominatorValue += Math.abs(outOfBoundary);
    }

    let positionRatio = 0;

    if (denominatorValue) {
      positionRatio = contentPosition / denominatorValue;
      positionRatio = (0, _utils.clamp01)(positionRatio);
    }

    const position = (handleNodeMeasure - actualLenth) * positionRatio;

    if (this._direction === Direction.VERTICAL) {
      out.set(0, position);
    } else {
      out.set(position, 0);
    }
  }

  _updateLength(length) {
    if (this._handle) {
      const handleNode = this._handle.node;
      const handleTrans = handleNode._uiProps.uiTransformComp;
      const handleNodeSize = handleTrans.contentSize;
      const anchor = handleTrans.anchorPoint;

      if (anchor.x !== defaultAnchor.x || anchor.y !== defaultAnchor.y) {
        handleTrans.setAnchorPoint(defaultAnchor);
      }

      if (this._direction === Direction.HORIZONTAL) {
        handleTrans.setContentSize(length, handleNodeSize.height);
      } else {
        handleTrans.setContentSize(handleNodeSize.width, length);
      }
    }
  }

  _processAutoHide(deltaTime) {
    if (!this._enableAutoHide || this._autoHideRemainingTime <= 0) {
      return;
    } else if (this._touching) {
      return;
    }

    this._autoHideRemainingTime -= deltaTime;

    if (this._autoHideRemainingTime <= this._autoHideTime) {
      this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
      const opacity = this._opacity * (this._autoHideRemainingTime / this._autoHideTime);

      this._setOpacity(opacity);
    }
  }

}, _class3.Direction = Direction, _temp), (_applyDecoratedDescriptor(_class2.prototype, "handle", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "handle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec9, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "enableAutoHide", [_dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "enableAutoHide"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "autoHideTime", [_dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "autoHideTime"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_scrollView", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_handle", [_index.serializable], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_enableAutoHide", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_autoHideTime", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 1.0;
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.ScrollBar = ScrollBar;