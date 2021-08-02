"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageView = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../core/components/index.js");

var _index3 = require("../core/platform/index.js");

var _index4 = require("../core/math/index.js");

var _enum = require("../core/value-types/enum.js");

var _layout = require("./layout.js");

var _pageViewIndicator = require("./page-view-indicator.js");

var _scrollView = require("./scroll-view.js");

var _scrollBar = require("./scroll-bar.js");

var _debug = require("../core/platform/debug.js");

var _extendsEnum = require("../core/data/utils/extends-enum.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

const _tempVec2 = new _index4.Vec2();
/**
 * @en Enum for Page View Size Mode.
 *
 * @zh 页面视图每个页面统一的大小类型
 */


var SizeMode;

(function (SizeMode) {
  SizeMode[SizeMode["Unified"] = 0] = "Unified";
  SizeMode[SizeMode["Free"] = 1] = "Free";
})(SizeMode || (SizeMode = {}));

(0, _enum.ccenum)(SizeMode);
/**
 * @en Enum for Page View Direction.
 *
 * @zh 页面视图滚动类型
 */

var Direction;

(function (Direction) {
  Direction[Direction["Horizontal"] = 0] = "Horizontal";
  Direction[Direction["Vertical"] = 1] = "Vertical";
})(Direction || (Direction = {}));

(0, _enum.ccenum)(Direction);
/**
 * @en Enum for ScrollView event type.
 *
 * @zh 滚动视图事件类型
 */

var EventType;
/**
 * @en
 * The PageView control.
 *
 * @zh
 * 页面视图组件
 */

(function (EventType) {
  EventType["PAGE_TURNING"] = "page-turning";
})(EventType || (EventType = {}));

let PageView = (_dec = (0, _index.ccclass)('cc.PageView'), _dec2 = (0, _index.help)('i18n:cc.PageView'), _dec3 = (0, _index.executionOrder)(110), _dec4 = (0, _index.menu)('UI/PageView'), _dec5 = (0, _index.type)(SizeMode), _dec6 = (0, _index.tooltip)('i18n:pageview.sizeMode'), _dec7 = (0, _index.type)(Direction), _dec8 = (0, _index.tooltip)('i18n:pageview.direction'), _dec9 = (0, _index.range)([0, 1, 0.01]), _dec10 = (0, _index.tooltip)('i18n:pageview.scrollThreshold'), _dec11 = (0, _index.range)([0, 1, 0.01]), _dec12 = (0, _index.tooltip)('i18n:pageview.pageTurningEventTiming'), _dec13 = (0, _index.type)(_pageViewIndicator.PageViewIndicator), _dec14 = (0, _index.tooltip)('i18n:pageview.indicator'), _dec15 = (0, _index.tooltip)('i18n:pageview.autoPageTurningThreshold'), _dec16 = (0, _index.type)(_scrollBar.ScrollBar), _dec17 = (0, _index.visible)(false), _dec18 = (0, _index.type)(_scrollBar.ScrollBar), _dec19 = (0, _index.visible)(false), _dec20 = (0, _index.visible)(false), _dec21 = (0, _index.visible)(false), _dec22 = (0, _index.visible)(false), _dec23 = (0, _index.type)([_index2.EventHandler]), _dec24 = (0, _index.visible)(false), _dec25 = (0, _index.type)([_index2.EventHandler]), _dec26 = (0, _index.tooltip)('i18n:pageview.pageEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = class PageView extends _scrollView.ScrollView {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "autoPageTurningThreshold", _descriptor, this);

    _initializerDefineProperty(this, "horizontal", _descriptor2, this);

    _initializerDefineProperty(this, "vertical", _descriptor3, this);

    _initializerDefineProperty(this, "cancelInnerEvents", _descriptor4, this);

    _initializerDefineProperty(this, "scrollEvents", _descriptor5, this);

    _initializerDefineProperty(this, "pageTurningSpeed", _descriptor6, this);

    _initializerDefineProperty(this, "pageEvents", _descriptor7, this);

    _initializerDefineProperty(this, "_sizeMode", _descriptor8, this);

    _initializerDefineProperty(this, "_direction", _descriptor9, this);

    _initializerDefineProperty(this, "_scrollThreshold", _descriptor10, this);

    _initializerDefineProperty(this, "_pageTurningEventTiming", _descriptor11, this);

    _initializerDefineProperty(this, "_indicator", _descriptor12, this);

    this._curPageIdx = 0;
    this._lastPageIdx = 0;
    this._pages = [];
    this._initContentPos = new _index4.Vec3();
    this._scrollCenterOffsetX = [];
    this._scrollCenterOffsetY = [];
    this._touchBeganPosition = new _index4.Vec2();
    this._touchEndPosition = new _index4.Vec2();
  }

  /**
   * @en
   * Specify the size type of each page in PageView.
   *
   * @zh
   * 页面视图中每个页面大小类型
   */
  get sizeMode() {
    return this._sizeMode;
  }

  set sizeMode(value) {
    if (this._sizeMode === value) {
      return;
    }

    this._sizeMode = value;

    this._syncSizeMode();
  }
  /**
   * @en
   * The page view direction.
   *
   * @zh
   * 页面视图滚动类型
   */


  get direction() {
    return this._direction;
  }

  set direction(value) {
    if (this._direction === value) {
      return;
    }

    this._direction = value;

    this._syncScrollDirection();
  }
  /**
   * @en
   * The scroll threshold value, when drag exceeds this value,
   * release the next page will automatically scroll, less than the restore.
   *
   * @zh
   * 滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原。
   */


  get scrollThreshold() {
    return this._scrollThreshold;
  }

  set scrollThreshold(value) {
    if (this._scrollThreshold === value) {
      return;
    }

    this._scrollThreshold = value;
  }
  /**
   * @en
   * Change the PageTurning event timing of PageView.
   *
   * @zh
   * 设置 PageView PageTurning 事件的发送时机。
   */


  get pageTurningEventTiming() {
    return this._pageTurningEventTiming;
  }

  set pageTurningEventTiming(value) {
    if (this._pageTurningEventTiming === value) {
      return;
    }

    this._pageTurningEventTiming = value;
  }
  /**
   * @en
   * The Page View Indicator.
   *
   * @zh
   * 页面视图指示器组件
   */


  get indicator() {
    return this._indicator;
  }

  set indicator(value) {
    if (this._indicator === value) {
      return;
    }

    this._indicator = value;

    if (this.indicator) {
      this.indicator.setPageView(this);
    }
  }

  get curPageIdx() {
    return this._curPageIdx;
  }

  get verticalScrollBar() {
    return super.verticalScrollBar;
  }

  set verticalScrollBar(value) {
    super.verticalScrollBar = value;
  }

  get horizontalScrollBar() {
    return super.horizontalScrollBar;
  }

  set horizontalScrollBar(value) {
    super.horizontalScrollBar = value;
  }

  onEnable() {
    super.onEnable();
    this.node.on(_index3.SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this.node.on(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
    }
  }

  onDisable() {
    super.onDisable();
    this.node.off(_index3.SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

    if (!_internal253Aconstants.EDITOR || _globalExports.legacyCC.GAME_VIEW) {
      this.node.off(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
    }
  }

  onLoad() {
    this._initPages();

    if (this.indicator) {
      this.indicator.setPageView(this);
    }
  }
  /**
   * @en
   * Returns current page index.
   *
   * @zh
   * 返回当前页面索引。
   *
   * @returns 当前页面索引。
   */


  getCurrentPageIndex() {
    return this._curPageIdx;
  }
  /**
   * @en
   * Set current page index.
   *
   * @zh
   * 设置当前页面索引。
   * @param index 索引。
   */


  setCurrentPageIndex(index) {
    this.scrollToPage(index, 1);
  }
  /**
   * @en
   * Returns all pages of pageview.
   *
   * @zh
   * 返回视图中的所有页面。
   *
   * @returns 输=视图所有页面。
   */


  getPages() {
    return this._pages;
  }
  /**
   * @en
   * At the end of the current page view to insert a new view.
   *
   * @zh
   * 在当前页面视图的尾部插入一个新视图。
   *
   * @param page 新视图。
   */


  addPage(page) {
    if (!page || this._pages.indexOf(page) !== -1 || !this.content) {
      return;
    }

    if (!page._uiProps.uiTransformComp) {
      (0, _debug.logID)(4301);
      return;
    }

    this.content.addChild(page);

    this._pages.push(page);

    this._updatePageView();
  }
  /**
   * @en
   * Inserts a page in the specified location.
   *
   * @zh
   * 将页面插入指定位置中。
   *
   * @param page 新视图。
   * @param index 指定位置。
   */


  insertPage(page, index) {
    if (index < 0 || !page || this._pages.indexOf(page) !== -1 || !this.content) {
      return;
    }

    const pageCount = this._pages.length;

    if (index >= pageCount) {
      this.addPage(page);
    } else {
      if (!page._uiProps.uiTransformComp) {
        (0, _debug.logID)(4301);
        return;
      }

      this._pages.splice(index, 0, page);

      this.content.insertChild(page, index);

      this._updatePageView();
    }
  }
  /**
   * @en
   * Removes a page from PageView.
   *
   * @zh
   * 移除指定页面。
   *
   * @param page 指定页面。
   */


  removePage(page) {
    if (!page || !this.content) {
      return;
    }

    const index = this._pages.indexOf(page);

    if (index === -1) {
      (0, _debug.warnID)(4300, page.name);
      return;
    }

    this.removePageAtIndex(index);
  }
  /**
   * @en
   * Removes a page at index of PageView.
   *
   * @zh
   * 移除指定下标的页面。
   *
   * @param index 页面下标。
   */


  removePageAtIndex(index) {
    const pageList = this._pages;

    if (index < 0 || index >= pageList.length) {
      return;
    }

    const page = pageList[index];

    if (!page || !this.content) {
      return;
    }

    this.content.removeChild(page);
    pageList.splice(index, 1);

    this._updatePageView();
  }
  /**
   * @en
   * Removes all pages from PageView.
   *
   * @zh
   * 移除所有页面。
   */


  removeAllPages() {
    if (!this.content) {
      return;
    }

    const locPages = this._pages;

    for (let i = 0, len = locPages.length; i < len; i++) {
      this.content.removeChild(locPages[i]);
    }

    this._pages.length = 0;

    this._updatePageView();
  }
  /**
   * @en
   * Scroll PageView to index.
   *
   * @zh
   * 滚动到指定页面
   *
   * @param idx index of page.
   * @param timeInSecond scrolling time.
   */


  scrollToPage(idx, timeInSecond = 0.3) {
    if (idx < 0 || idx >= this._pages.length) {
      return;
    }

    this._curPageIdx = idx;
    this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

    if (this.indicator) {
      this.indicator._changedState();
    }
  } // override the method of ScrollView


  getScrollEndedEventTiming() {
    return this.pageTurningEventTiming;
  } // 刷新页面视图


  _updatePageView() {
    // 当页面数组变化时修改 content 大小
    if (!this.content) {
      return;
    }

    const layout = this.content.getComponent(_layout.Layout);

    if (layout && layout.enabled) {
      layout.updateLayout();
    }

    const pageCount = this._pages.length;

    if (this._curPageIdx >= pageCount) {
      this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
      this._lastPageIdx = this._curPageIdx;
    } // 进行排序


    const contentPos = this._initContentPos;

    for (let i = 0; i < pageCount; ++i) {
      const page = this._pages[i]; // page.setSiblingIndex(i);

      const pos = page.position;

      if (this.direction === Direction.Horizontal) {
        this._scrollCenterOffsetX[i] = Math.abs(contentPos.x + pos.x);
      } else {
        this._scrollCenterOffsetY[i] = Math.abs(contentPos.y + pos.y);
      }
    } // 刷新 indicator 信息与状态


    if (this.indicator) {
      this.indicator._refresh();
    }
  } // 刷新所有页面的大小


  _updateAllPagesSize() {
    const viewTrans = this.view;

    if (!this.content || !viewTrans) {
      return;
    }

    if (this._sizeMode !== SizeMode.Unified) {
      return;
    }

    const locPages = _internal253Aconstants.EDITOR && !_globalExports.legacyCC.GAME_VIEW ? this.content.children : this._pages;
    const selfSize = viewTrans.contentSize;

    for (let i = 0, len = locPages.length; i < len; i++) {
      locPages[i]._uiProps.uiTransformComp.setContentSize(selfSize);
    }
  }

  _handleReleaseLogic() {
    this._autoScrollToPage();

    if (this._scrolling) {
      this._scrolling = false;

      if (!this._autoScrolling) {
        this._dispatchEvent(PageView.EventType.SCROLL_ENDED);
      }
    }
  }

  _onTouchBegan(event, captureListeners) {
    event.touch.getUILocation(_tempVec2);

    _index4.Vec2.set(this._touchBeganPosition, _tempVec2.x, _tempVec2.y);

    super._onTouchBegan(event, captureListeners);
  }

  _onTouchMoved(event, captureListeners) {
    super._onTouchMoved(event, captureListeners);
  }

  _onTouchEnded(event, captureListeners) {
    event.touch.getUILocation(_tempVec2);

    _index4.Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);

    super._onTouchEnded(event, captureListeners);
  }

  _onTouchCancelled(event, captureListeners) {
    event.touch.getUILocation(_tempVec2);

    _index4.Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);

    super._onTouchCancelled(event, captureListeners);
  }

  _onMouseWheel() {}

  _syncScrollDirection() {
    this.horizontal = this.direction === Direction.Horizontal;
    this.vertical = this.direction === Direction.Vertical;
  }

  _syncSizeMode() {
    const viewTrans = this.view;

    if (!this.content || !viewTrans) {
      return;
    }

    const layout = this.content.getComponent(_layout.Layout);

    if (layout) {
      if (this._sizeMode === SizeMode.Free && this._pages.length > 0) {
        const firstPageTrans = this._pages[0]._uiProps.uiTransformComp;
        const lastPageTrans = this._pages[this._pages.length - 1]._uiProps.uiTransformComp;

        if (this.direction === Direction.Horizontal) {
          layout.paddingLeft = (viewTrans.width - firstPageTrans.width) / 2;
          layout.paddingRight = (viewTrans.width - lastPageTrans.width) / 2;
        } else if (this.direction === Direction.Vertical) {
          layout.paddingTop = (viewTrans.height - firstPageTrans.height) / 2;
          layout.paddingBottom = (viewTrans.height - lastPageTrans.height) / 2;
        }
      }

      layout.updateLayout();
    }
  } // 初始化页面


  _initPages() {
    if (!this.content) {
      return;
    }

    this._initContentPos = this.content.position;
    const children = this.content.children;

    for (let i = 0; i < children.length; ++i) {
      const page = children[i];

      if (this._pages.indexOf(page) >= 0) {
        continue;
      }

      this._pages.push(page);
    }

    this._syncScrollDirection();

    this._syncSizeMode();

    this._updatePageView();
  }

  _dispatchPageTurningEvent() {
    if (this._lastPageIdx === this._curPageIdx) {
      return;
    }

    this._lastPageIdx = this._curPageIdx;

    _index2.EventHandler.emitEvents(this.pageEvents, this, EventType.PAGE_TURNING);

    this.node.emit(EventType.PAGE_TURNING, this);
  } // 快速滑动


  _isQuicklyScrollable(touchMoveVelocity) {
    if (this.direction === Direction.Horizontal) {
      if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
        return true;
      }
    } else if (this.direction === Direction.Vertical) {
      if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
        return true;
      }
    }

    return false;
  } // 通过 idx 获取偏移值数值


  _moveOffsetValue(idx) {
    const offset = new _index4.Vec2();

    if (this._sizeMode === SizeMode.Free) {
      if (this.direction === Direction.Horizontal) {
        offset.x = this._scrollCenterOffsetX[idx];
      } else if (this.direction === Direction.Vertical) {
        offset.y = this._scrollCenterOffsetY[idx];
      }
    } else {
      const viewTrans = this.view;

      if (!viewTrans) {
        return offset;
      }

      if (this.direction === Direction.Horizontal) {
        offset.x = idx * viewTrans.width;
      } else if (this.direction === Direction.Vertical) {
        offset.y = idx * viewTrans.height;
      }
    }

    return offset;
  }

  _getDragDirection(moveOffset) {
    if (this._direction === Direction.Horizontal) {
      if (moveOffset.x === 0) {
        return 0;
      }

      return moveOffset.x > 0 ? 1 : -1;
    } else {
      // 由于滚动 Y 轴的原点在在右上角所以应该是小于 0
      if (moveOffset.y === 0) {
        return 0;
      }

      return moveOffset.y < 0 ? 1 : -1;
    }
  } // 是否超过自动滚动临界值


  _isScrollable(offset, index, nextIndex) {
    if (this._sizeMode === SizeMode.Free) {
      let curPageCenter = 0;
      let nextPageCenter = 0;

      if (this.direction === Direction.Horizontal) {
        curPageCenter = this._scrollCenterOffsetX[index];
        nextPageCenter = this._scrollCenterOffsetX[nextIndex];
        return Math.abs(offset.x) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        curPageCenter = this._scrollCenterOffsetY[index];
        nextPageCenter = this._scrollCenterOffsetY[nextIndex];
        return Math.abs(offset.y) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      }
    } else {
      const viewTrans = this.view;

      if (!viewTrans) {
        return false;
      }

      if (this.direction === Direction.Horizontal) {
        return Math.abs(offset.x) >= viewTrans.width * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        return Math.abs(offset.y) >= viewTrans.height * this.scrollThreshold;
      }
    }

    return false;
  }

  _autoScrollToPage() {
    const bounceBackStarted = this._startBounceBackIfNeeded();

    if (bounceBackStarted) {
      const bounceBackAmount = this._getHowMuchOutOfBoundary();

      this._clampDelta(bounceBackAmount);

      if (bounceBackAmount.x > 0 || bounceBackAmount.y < 0) {
        this._curPageIdx = this._pages.length === 0 ? 0 : this._pages.length - 1;
      }

      if (bounceBackAmount.x < 0 || bounceBackAmount.y > 0) {
        this._curPageIdx = 0;
      }

      if (this.indicator) {
        this.indicator._changedState();
      }
    } else {
      const moveOffset = new _index4.Vec2();

      _index4.Vec2.subtract(moveOffset, this._touchBeganPosition, this._touchEndPosition);

      const index = this._curPageIdx;

      const nextIndex = index + this._getDragDirection(moveOffset);

      const timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

      if (nextIndex < this._pages.length) {
        if (this._isScrollable(moveOffset, index, nextIndex)) {
          this.scrollToPage(nextIndex, timeInSecond);
          return;
        } else {
          const touchMoveVelocity = this._calculateTouchMoveVelocity();

          if (this._isQuicklyScrollable(touchMoveVelocity)) {
            this.scrollToPage(nextIndex, timeInSecond);
            return;
          }
        }
      }

      this.scrollToPage(index, timeInSecond);
    }
  }

}, _class3.SizeMode = SizeMode, _class3.Direction = Direction, _class3.EventType = (0, _extendsEnum.extendsEnum)(EventType, _scrollView.EventType), _temp), (_applyDecoratedDescriptor(_class2.prototype, "sizeMode", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scrollThreshold", [_index.slide, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "scrollThreshold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pageTurningEventTiming", [_index.slide, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "pageTurningEventTiming"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "indicator", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "indicator"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoPageTurningThreshold", [_index.serializable, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 100;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "verticalScrollBar", [_dec16, _index.override, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalScrollBar"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalScrollBar", [_dec18, _index.override, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalScrollBar"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "horizontal", [_index.override, _index.serializable, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vertical", [_index.override, _index.serializable, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cancelInnerEvents", [_index.override, _index.serializable, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scrollEvents", [_dec23, _index.serializable, _index.override, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pageTurningSpeed", [_index.serializable, _index.editable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.3;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pageEvents", [_dec25, _index.serializable, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_sizeMode", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return SizeMode.Unified;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return Direction.Horizontal;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_scrollThreshold", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.5;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_pageTurningEventTiming", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 0.1;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_indicator", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class) || _class) || _class);
/**
 * @en
 * Note: This event is emitted from the node to which the component belongs.
 * @zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event page-turning
 * @param {Event.EventCustom} event
 * @param {PageView} pageView - The PageView component.
 */

exports.PageView = PageView;