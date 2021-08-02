System.register("q-bundled:///fs/cocos/ui/page-view.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/index.js", "../core/platform/index.js", "../core/math/index.js", "../core/value-types/enum.js", "./layout.js", "./page-view-indicator.js", "./scroll-view.js", "./scroll-bar.js", "../core/platform/debug.js", "../core/data/utils/extends-enum.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, tooltip, type, slide, range, visible, override, serializable, editable, EDITOR, ComponentEventHandler, SystemEventType, Vec2, Vec3, ccenum, Layout, PageViewIndicator, ScrollView, ScrollEventType, ScrollBar, warnID, logID, extendsEnum, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3, _temp, _tempVec2, SizeMode, Direction, EventType, PageView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      slide = _coreDataDecoratorsIndexJs.slide;
      range = _coreDataDecoratorsIndexJs.range;
      visible = _coreDataDecoratorsIndexJs.visible;
      override = _coreDataDecoratorsIndexJs.override;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      editable = _coreDataDecoratorsIndexJs.editable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsIndexJs) {
      ComponentEventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_corePlatformIndexJs) {
      SystemEventType = _corePlatformIndexJs.SystemEventType;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_coreValueTypesEnumJs) {
      ccenum = _coreValueTypesEnumJs.ccenum;
    }, function (_layoutJs) {
      Layout = _layoutJs.Layout;
    }, function (_pageViewIndicatorJs) {
      PageViewIndicator = _pageViewIndicatorJs.PageViewIndicator;
    }, function (_scrollViewJs) {
      ScrollView = _scrollViewJs.ScrollView;
      ScrollEventType = _scrollViewJs.EventType;
    }, function (_scrollBarJs) {
      ScrollBar = _scrollBarJs.ScrollBar;
    }, function (_corePlatformDebugJs) {
      warnID = _corePlatformDebugJs.warnID;
      logID = _corePlatformDebugJs.logID;
    }, function (_coreDataUtilsExtendsEnumJs) {
      extendsEnum = _coreDataUtilsExtendsEnumJs.extendsEnum;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      _tempVec2 = new Vec2();
      /**
       * @en Enum for Page View Size Mode.
       *
       * @zh 页面视图每个页面统一的大小类型
       */

      (function (SizeMode) {
        SizeMode[SizeMode["Unified"] = 0] = "Unified";
        SizeMode[SizeMode["Free"] = 1] = "Free";
      })(SizeMode || (SizeMode = {}));

      ccenum(SizeMode);
      /**
       * @en Enum for Page View Direction.
       *
       * @zh 页面视图滚动类型
       */

      (function (Direction) {
        Direction[Direction["Horizontal"] = 0] = "Horizontal";
        Direction[Direction["Vertical"] = 1] = "Vertical";
      })(Direction || (Direction = {}));

      ccenum(Direction);
      /**
       * @en Enum for ScrollView event type.
       *
       * @zh 滚动视图事件类型
       */

      (function (EventType) {
        EventType["PAGE_TURNING"] = "page-turning";
      })(EventType || (EventType = {}));

      /**
       * @en
       * The PageView control.
       *
       * @zh
       * 页面视图组件
       */
      _export("PageView", PageView = (_dec = ccclass('cc.PageView'), _dec2 = help('i18n:cc.PageView'), _dec3 = executionOrder(110), _dec4 = menu('UI/PageView'), _dec5 = type(SizeMode), _dec6 = tooltip('i18n:pageview.sizeMode'), _dec7 = type(Direction), _dec8 = tooltip('i18n:pageview.direction'), _dec9 = range([0, 1, 0.01]), _dec10 = tooltip('i18n:pageview.scrollThreshold'), _dec11 = range([0, 1, 0.01]), _dec12 = tooltip('i18n:pageview.pageTurningEventTiming'), _dec13 = type(PageViewIndicator), _dec14 = tooltip('i18n:pageview.indicator'), _dec15 = tooltip('i18n:pageview.autoPageTurningThreshold'), _dec16 = type(ScrollBar), _dec17 = visible(false), _dec18 = type(ScrollBar), _dec19 = visible(false), _dec20 = visible(false), _dec21 = visible(false), _dec22 = visible(false), _dec23 = type([ComponentEventHandler]), _dec24 = visible(false), _dec25 = type([ComponentEventHandler]), _dec26 = tooltip('i18n:pageview.pageEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_ScrollView) {
        _inheritsLoose(PageView, _ScrollView);

        function PageView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ScrollView.call.apply(_ScrollView, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "autoPageTurningThreshold", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontal", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vertical", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cancelInnerEvents", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scrollEvents", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageTurningSpeed", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pageEvents", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_sizeMode", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_direction", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_scrollThreshold", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_pageTurningEventTiming", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_indicator", _descriptor12, _assertThisInitialized(_this));

          _this._curPageIdx = 0;
          _this._lastPageIdx = 0;
          _this._pages = [];
          _this._initContentPos = new Vec3();
          _this._scrollCenterOffsetX = [];
          _this._scrollCenterOffsetY = [];
          _this._touchBeganPosition = new Vec2();
          _this._touchEndPosition = new Vec2();
          return _this;
        }

        var _proto = PageView.prototype;

        _proto.onEnable = function onEnable() {
          _ScrollView.prototype.onEnable.call(this);

          this.node.on(SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this.node.on(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
          }
        };

        _proto.onDisable = function onDisable() {
          _ScrollView.prototype.onDisable.call(this);

          this.node.off(SystemEventType.SIZE_CHANGED, this._updateAllPagesSize, this);

          if (!EDITOR || legacyCC.GAME_VIEW) {
            this.node.off(PageView.EventType.SCROLL_ENG_WITH_THRESHOLD, this._dispatchPageTurningEvent, this);
          }
        };

        _proto.onLoad = function onLoad() {
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
        ;

        _proto.getCurrentPageIndex = function getCurrentPageIndex() {
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
        ;

        _proto.setCurrentPageIndex = function setCurrentPageIndex(index) {
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
        ;

        _proto.getPages = function getPages() {
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
        ;

        _proto.addPage = function addPage(page) {
          if (!page || this._pages.indexOf(page) !== -1 || !this.content) {
            return;
          }

          if (!page._uiProps.uiTransformComp) {
            logID(4301);
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
        ;

        _proto.insertPage = function insertPage(page, index) {
          if (index < 0 || !page || this._pages.indexOf(page) !== -1 || !this.content) {
            return;
          }

          var pageCount = this._pages.length;

          if (index >= pageCount) {
            this.addPage(page);
          } else {
            if (!page._uiProps.uiTransformComp) {
              logID(4301);
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
        ;

        _proto.removePage = function removePage(page) {
          if (!page || !this.content) {
            return;
          }

          var index = this._pages.indexOf(page);

          if (index === -1) {
            warnID(4300, page.name);
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
        ;

        _proto.removePageAtIndex = function removePageAtIndex(index) {
          var pageList = this._pages;

          if (index < 0 || index >= pageList.length) {
            return;
          }

          var page = pageList[index];

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
        ;

        _proto.removeAllPages = function removeAllPages() {
          if (!this.content) {
            return;
          }

          var locPages = this._pages;

          for (var i = 0, len = locPages.length; i < len; i++) {
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
        ;

        _proto.scrollToPage = function scrollToPage(idx, timeInSecond) {
          if (timeInSecond === void 0) {
            timeInSecond = 0.3;
          }

          if (idx < 0 || idx >= this._pages.length) {
            return;
          }

          this._curPageIdx = idx;
          this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

          if (this.indicator) {
            this.indicator._changedState();
          }
        } // override the method of ScrollView
        ;

        _proto.getScrollEndedEventTiming = function getScrollEndedEventTiming() {
          return this.pageTurningEventTiming;
        } // 刷新页面视图
        ;

        _proto._updatePageView = function _updatePageView() {
          // 当页面数组变化时修改 content 大小
          if (!this.content) {
            return;
          }

          var layout = this.content.getComponent(Layout);

          if (layout && layout.enabled) {
            layout.updateLayout();
          }

          var pageCount = this._pages.length;

          if (this._curPageIdx >= pageCount) {
            this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
            this._lastPageIdx = this._curPageIdx;
          } // 进行排序


          var contentPos = this._initContentPos;

          for (var i = 0; i < pageCount; ++i) {
            var page = this._pages[i]; // page.setSiblingIndex(i);

            var pos = page.position;

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
        ;

        _proto._updateAllPagesSize = function _updateAllPagesSize() {
          var viewTrans = this.view;

          if (!this.content || !viewTrans) {
            return;
          }

          if (this._sizeMode !== SizeMode.Unified) {
            return;
          }

          var locPages = EDITOR && !legacyCC.GAME_VIEW ? this.content.children : this._pages;
          var selfSize = viewTrans.contentSize;

          for (var i = 0, len = locPages.length; i < len; i++) {
            locPages[i]._uiProps.uiTransformComp.setContentSize(selfSize);
          }
        };

        _proto._handleReleaseLogic = function _handleReleaseLogic() {
          this._autoScrollToPage();

          if (this._scrolling) {
            this._scrolling = false;

            if (!this._autoScrolling) {
              this._dispatchEvent(PageView.EventType.SCROLL_ENDED);
            }
          }
        };

        _proto._onTouchBegan = function _onTouchBegan(event, captureListeners) {
          event.touch.getUILocation(_tempVec2);
          Vec2.set(this._touchBeganPosition, _tempVec2.x, _tempVec2.y);

          _ScrollView.prototype._onTouchBegan.call(this, event, captureListeners);
        };

        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          _ScrollView.prototype._onTouchMoved.call(this, event, captureListeners);
        };

        _proto._onTouchEnded = function _onTouchEnded(event, captureListeners) {
          event.touch.getUILocation(_tempVec2);
          Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);

          _ScrollView.prototype._onTouchEnded.call(this, event, captureListeners);
        };

        _proto._onTouchCancelled = function _onTouchCancelled(event, captureListeners) {
          event.touch.getUILocation(_tempVec2);
          Vec2.set(this._touchEndPosition, _tempVec2.x, _tempVec2.y);

          _ScrollView.prototype._onTouchCancelled.call(this, event, captureListeners);
        };

        _proto._onMouseWheel = function _onMouseWheel() {};

        _proto._syncScrollDirection = function _syncScrollDirection() {
          this.horizontal = this.direction === Direction.Horizontal;
          this.vertical = this.direction === Direction.Vertical;
        };

        _proto._syncSizeMode = function _syncSizeMode() {
          var viewTrans = this.view;

          if (!this.content || !viewTrans) {
            return;
          }

          var layout = this.content.getComponent(Layout);

          if (layout) {
            if (this._sizeMode === SizeMode.Free && this._pages.length > 0) {
              var firstPageTrans = this._pages[0]._uiProps.uiTransformComp;
              var lastPageTrans = this._pages[this._pages.length - 1]._uiProps.uiTransformComp;

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
        ;

        _proto._initPages = function _initPages() {
          if (!this.content) {
            return;
          }

          this._initContentPos = this.content.position;
          var children = this.content.children;

          for (var i = 0; i < children.length; ++i) {
            var page = children[i];

            if (this._pages.indexOf(page) >= 0) {
              continue;
            }

            this._pages.push(page);
          }

          this._syncScrollDirection();

          this._syncSizeMode();

          this._updatePageView();
        };

        _proto._dispatchPageTurningEvent = function _dispatchPageTurningEvent() {
          if (this._lastPageIdx === this._curPageIdx) {
            return;
          }

          this._lastPageIdx = this._curPageIdx;
          ComponentEventHandler.emitEvents(this.pageEvents, this, EventType.PAGE_TURNING);
          this.node.emit(EventType.PAGE_TURNING, this);
        } // 快速滑动
        ;

        _proto._isQuicklyScrollable = function _isQuicklyScrollable(touchMoveVelocity) {
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
        ;

        _proto._moveOffsetValue = function _moveOffsetValue(idx) {
          var offset = new Vec2();

          if (this._sizeMode === SizeMode.Free) {
            if (this.direction === Direction.Horizontal) {
              offset.x = this._scrollCenterOffsetX[idx];
            } else if (this.direction === Direction.Vertical) {
              offset.y = this._scrollCenterOffsetY[idx];
            }
          } else {
            var viewTrans = this.view;

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
        };

        _proto._getDragDirection = function _getDragDirection(moveOffset) {
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
        ;

        _proto._isScrollable = function _isScrollable(offset, index, nextIndex) {
          if (this._sizeMode === SizeMode.Free) {
            var curPageCenter = 0;
            var nextPageCenter = 0;

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
            var viewTrans = this.view;

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
        };

        _proto._autoScrollToPage = function _autoScrollToPage() {
          var bounceBackStarted = this._startBounceBackIfNeeded();

          if (bounceBackStarted) {
            var bounceBackAmount = this._getHowMuchOutOfBoundary();

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
            var moveOffset = new Vec2();
            Vec2.subtract(moveOffset, this._touchBeganPosition, this._touchEndPosition);
            var index = this._curPageIdx;

            var nextIndex = index + this._getDragDirection(moveOffset);

            var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

            if (nextIndex < this._pages.length) {
              if (this._isScrollable(moveOffset, index, nextIndex)) {
                this.scrollToPage(nextIndex, timeInSecond);
                return;
              } else {
                var touchMoveVelocity = this._calculateTouchMoveVelocity();

                if (this._isQuicklyScrollable(touchMoveVelocity)) {
                  this.scrollToPage(nextIndex, timeInSecond);
                  return;
                }
              }
            }

            this.scrollToPage(index, timeInSecond);
          }
        };

        _createClass(PageView, [{
          key: "sizeMode",
          get:
          /**
           * @en
           * Specify the size type of each page in PageView.
           *
           * @zh
           * 页面视图中每个页面大小类型
           */
          function get() {
            return this._sizeMode;
          },
          set: function set(value) {
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

        }, {
          key: "direction",
          get: function get() {
            return this._direction;
          },
          set: function set(value) {
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

        }, {
          key: "scrollThreshold",
          get: function get() {
            return this._scrollThreshold;
          },
          set: function set(value) {
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

        }, {
          key: "pageTurningEventTiming",
          get: function get() {
            return this._pageTurningEventTiming;
          },
          set: function set(value) {
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

        }, {
          key: "indicator",
          get: function get() {
            return this._indicator;
          },
          set: function set(value) {
            if (this._indicator === value) {
              return;
            }

            this._indicator = value;

            if (this.indicator) {
              this.indicator.setPageView(this);
            }
          }
        }, {
          key: "curPageIdx",
          get: function get() {
            return this._curPageIdx;
          }
        }, {
          key: "verticalScrollBar",
          get: function get() {
            return _ScrollView.prototype.verticalScrollBar;
          },
          set: function set(value) {
            this.verticalScrollBar = value;
          }
        }, {
          key: "horizontalScrollBar",
          get: function get() {
            return _ScrollView.prototype.horizontalScrollBar;
          },
          set: function set(value) {
            this.horizontalScrollBar = value;
          }
        }]);

        return PageView;
      }(ScrollView), _class3.SizeMode = SizeMode, _class3.Direction = Direction, _class3.EventType = extendsEnum(EventType, ScrollEventType), _temp), (_applyDecoratedDescriptor(_class2.prototype, "sizeMode", [_dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "direction"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "scrollThreshold", [slide, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "scrollThreshold"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pageTurningEventTiming", [slide, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "pageTurningEventTiming"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "indicator", [_dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "indicator"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "autoPageTurningThreshold", [serializable, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "verticalScrollBar", [_dec16, override, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalScrollBar"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "horizontalScrollBar", [_dec18, override, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalScrollBar"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "horizontal", [override, serializable, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "vertical", [override, serializable, _dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cancelInnerEvents", [override, serializable, _dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scrollEvents", [_dec23, serializable, override, _dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "pageTurningSpeed", [serializable, editable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.3;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "pageEvents", [_dec25, serializable, _dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_sizeMode", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return SizeMode.Unified;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_direction", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Direction.Horizontal;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_scrollThreshold", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_pageTurningEventTiming", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_indicator", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class));
      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event page-turning
       * @param {Event.EventCustom} event
       * @param {PageView} pageView - The PageView component.
       */

    }
  };
});