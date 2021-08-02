System.register("q-bundled:///fs/cocos/ui/scroll-view.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../core/components/component-event-handler.js", "../2d/framework/index.js", "../core/event/index.js", "../core/platform/index.js", "../core/math/index.js", "./layout.js", "./scroll-bar.js", "./view-group.js", "../core/scene-graph/node.js", "../core/director.js", "../core/scene-graph/node-enum.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executionOrder, menu, requireComponent, tooltip, displayOrder, range, type, serializable, EDITOR, ComponentEventHandler, UITransform, Event, EventTouch, logID, Vec2, Vec3, Layout, ScrollBar, ViewGroup, Node, director, Director, TransformBit, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _temp, NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED, OUT_OF_BOUNDARY_BREAKING_FACTOR, EPSILON, TOLERANCE, MOVEMENT_FACTOR, _tempVec3, _tempVec3_1, _tempVec2, _tempVec2_1, quintEaseOut, getTimeInMilliseconds, eventMap, EventType, ScrollView;

  function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  _export("EventType", void 0);

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executionOrder = _coreDataDecoratorsIndexJs.executionOrder;
      menu = _coreDataDecoratorsIndexJs.menu;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      range = _coreDataDecoratorsIndexJs.range;
      type = _coreDataDecoratorsIndexJs.type;
      serializable = _coreDataDecoratorsIndexJs.serializable;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_coreComponentsComponentEventHandlerJs) {
      ComponentEventHandler = _coreComponentsComponentEventHandlerJs.EventHandler;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_coreEventIndexJs) {
      Event = _coreEventIndexJs.Event;
    }, function (_corePlatformIndexJs) {
      EventTouch = _corePlatformIndexJs.EventTouch;
      logID = _corePlatformIndexJs.logID;
    }, function (_coreMathIndexJs) {
      Vec2 = _coreMathIndexJs.Vec2;
      Vec3 = _coreMathIndexJs.Vec3;
    }, function (_layoutJs) {
      Layout = _layoutJs.Layout;
    }, function (_scrollBarJs) {
      ScrollBar = _scrollBarJs.ScrollBar;
    }, function (_viewGroupJs) {
      ViewGroup = _viewGroupJs.ViewGroup;
    }, function (_coreSceneGraphNodeJs) {
      Node = _coreSceneGraphNodeJs.Node;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
      Director = _coreDirectorJs.Director;
    }, function (_coreSceneGraphNodeEnumJs) {
      TransformBit = _coreSceneGraphNodeEnumJs.TransformBit;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED = 5;
      OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
      EPSILON = 1e-4;
      TOLERANCE = 1e4;
      MOVEMENT_FACTOR = 0.7;
      _tempVec3 = new Vec3();
      _tempVec3_1 = new Vec3();
      _tempVec2 = new Vec2();
      _tempVec2_1 = new Vec2();

      quintEaseOut = function quintEaseOut(time) {
        time -= 1;
        return time * time * time * time * time + 1;
      };

      getTimeInMilliseconds = function getTimeInMilliseconds() {
        var currentTime = new Date();
        return currentTime.getMilliseconds();
      };

      eventMap = {
        'scroll-to-top': 0,
        'scroll-to-bottom': 1,
        'scroll-to-left': 2,
        'scroll-to-right': 3,
        scrolling: 4,
        'bounce-bottom': 6,
        'bounce-left': 7,
        'bounce-right': 8,
        'bounce-top': 5,
        'scroll-ended': 9,
        'touch-up': 10,
        'scroll-ended-with-threshold': 11,
        'scroll-began': 12
      };
      /**
       * @en
       * Enum for ScrollView event type.
       *
       * @zh
       * 滚动视图事件类型
       */

      (function (EventType) {
        EventType["SCROLL_TO_TOP"] = "scroll-to-top";
        EventType["SCROLL_TO_BOTTOM"] = "scroll-to-bottom";
        EventType["SCROLL_TO_LEFT"] = "scroll-to-left";
        EventType["SCROLL_TO_RIGHT"] = "scroll-to-right";
        EventType["SCROLL_BEGAN"] = "scroll-began";
        EventType["SCROLL_ENDED"] = "scroll-ended";
        EventType["BOUNCE_TOP"] = "bounce-top";
        EventType["BOUNCE_BOTTOM"] = "bounce-bottom";
        EventType["BOUNCE_LEFT"] = "bounce-left";
        EventType["BOUNCE_RIGHT"] = "bounce-right";
        EventType["SCROLLING"] = "scrolling";
        EventType["SCROLL_ENG_WITH_THRESHOLD"] = "scroll-ended-with-threshold";
        EventType["TOUCH_UP"] = "touch-up";
      })(EventType || _export("EventType", EventType = {}));

      /**
       * @en
       * Layout container for a view hierarchy that can be scrolled by the user,
       * allowing it to be larger than the physical display.
       *
       * @zh
       * 滚动视图组件。
       */
      _export("ScrollView", ScrollView = (_dec = ccclass('cc.ScrollView'), _dec2 = help('i18n:cc.ScrollView'), _dec3 = executionOrder(110), _dec4 = menu('UI/ScrollView'), _dec5 = requireComponent(UITransform), _dec6 = range([0, 10]), _dec7 = displayOrder(0), _dec8 = tooltip('i18n:scrollview.bounceDuration'), _dec9 = range([0, 1, 0.1]), _dec10 = displayOrder(1), _dec11 = tooltip('i18n:scrollview.brake'), _dec12 = displayOrder(2), _dec13 = tooltip('i18n:scrollview.elastic'), _dec14 = displayOrder(3), _dec15 = tooltip('i18n:scrollview.inertia'), _dec16 = type(Node), _dec17 = displayOrder(4), _dec18 = tooltip('i18n:scrollview.content'), _dec19 = displayOrder(5), _dec20 = tooltip('i18n:scrollview.horizontal'), _dec21 = type(ScrollBar), _dec22 = displayOrder(6), _dec23 = tooltip('i18n:scrollview.horizontal_bar'), _dec24 = displayOrder(7), _dec25 = tooltip('i18n:scrollview.vertical'), _dec26 = type(ScrollBar), _dec27 = displayOrder(8), _dec28 = tooltip('i18n:scrollview.vertical_bar'), _dec29 = displayOrder(9), _dec30 = tooltip('i18n:scrollview.cancelInnerEvents'), _dec31 = type([ComponentEventHandler]), _dec32 = displayOrder(10), _dec33 = tooltip('i18n:scrollview.scrollEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_ViewGroup) {
        _inheritsLoose(ScrollView, _ViewGroup);

        function ScrollView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ViewGroup.call.apply(_ViewGroup, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "bounceDuration", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "brake", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "elastic", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "inertia", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizontal", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "vertical", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cancelInnerEvents", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scrollEvents", _descriptor8, _assertThisInitialized(_this));

          _this._autoScrolling = false;
          _this._scrolling = false;

          _initializerDefineProperty(_this, "_content", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_horizontalScrollBar", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_verticalScrollBar", _descriptor11, _assertThisInitialized(_this));

          _this._topBoundary = 0;
          _this._bottomBoundary = 0;
          _this._leftBoundary = 0;
          _this._rightBoundary = 0;
          _this._touchMoveDisplacements = [];
          _this._touchMoveTimeDeltas = [];
          _this._touchMovePreviousTimestamp = 0;
          _this._touchMoved = false;
          _this._autoScrollAttenuate = false;
          _this._autoScrollStartPosition = new Vec3();
          _this._autoScrollTargetDelta = new Vec3();
          _this._autoScrollTotalTime = 0;
          _this._autoScrollAccumulatedTime = 0;
          _this._autoScrollCurrentlyOutOfBoundary = false;
          _this._autoScrollBraking = false;
          _this._autoScrollBrakingStartPosition = new Vec3();
          _this._outOfBoundaryAmount = new Vec3();
          _this._outOfBoundaryAmountDirty = true;
          _this._stopMouseWheel = false;
          _this._mouseWheelEventElapsedTime = 0.0;
          _this._isScrollEndedWithThresholdEventFired = false;
          _this._scrollEventEmitMask = 0;
          _this._isBouncing = false;
          _this._contentPos = new Vec3();
          _this._deltaPos = new Vec3();
          return _this;
        }

        var _proto = ScrollView.prototype;

        /**
         * @en
         * Scroll the content to the bottom boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图底部。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到底部边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the bottom of the view.
         * scrollView.scrollToBottom(0.1);
         * ```
         */
        _proto.scrollToBottom = function scrollToBottom(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta, true);
          }
        }
        /**
         * @en
         * Scroll the content to the top boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图顶部。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到顶部边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the top of the view.
         * scrollView.scrollToTop(0.1);
         * ```
         */
        ;

        _proto.scrollToTop = function scrollToTop(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 1),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左边。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the left of the view.
         * scrollView.scrollToLeft(0.1);
         * ```
         */
        ;

        _proto.scrollToLeft = function scrollToLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右边。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the right of the view.
         * scrollView.scrollToRight(0.1);
         * ```
         */
        ;

        _proto.scrollToRight = function scrollToRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the top left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左上角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左上边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the upper left corner of the view.
         * scrollView.scrollToTopLeft(0.1);
         * ```
         */
        ;

        _proto.scrollToTopLeft = function scrollToTopLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 1),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the top right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右上角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右上边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the top right corner of the view.
         * scrollView.scrollToTopRight(0.1);
         * ```
         */
        ;

        _proto.scrollToTopRight = function scrollToTopRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 1),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the bottom left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左下角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左下边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the lower left corner of the view.
         * scrollView.scrollToBottomLeft(0.1);
         * ```
         */
        ;

        _proto.scrollToBottomLeft = function scrollToBottomLeft(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, 0),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the bottom right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右下角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右边下边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to the lower right corner of the view.
         * scrollView.scrollToBottomRight(0.1);
         * ```
         */
        ;

        _proto.scrollToBottomRight = function scrollToBottomRight(timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(1, 0),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll with an offset related to the ScrollView's top left origin, if timeInSecond is omitted, then it will jump to the specific offset immediately.
         *
         * @zh
         * 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond 参数不传，则立即滚动到指定偏移位置。
         *
         * @param offset - 指定移动偏移量。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定偏移量处。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to middle position in 0.1 second in x-axis
         * let maxScrollOffset = this.getMaxScrollOffset();
         * scrollView.scrollToOffset(new Vec2(maxScrollOffset.x / 2, 0), 0.1);
         * ```
         */
        ;

        _proto.scrollToOffset = function scrollToOffset(offset, timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = true;
          }

          var maxScrollOffset = this.getMaxScrollOffset();
          var anchor = new Vec2(0, 0); // if maxScrollOffset is 0, then always align the content's top left origin to the top left corner of its parent

          if (maxScrollOffset.x === 0) {
            anchor.x = 0;
          } else {
            anchor.x = offset.x / maxScrollOffset.x;
          }

          if (maxScrollOffset.y === 0) {
            anchor.y = 1;
          } else {
            anchor.y = (maxScrollOffset.y - offset.y) / maxScrollOffset.y;
          }

          this.scrollTo(anchor, timeInSecond, attenuated);
        }
        /**
         * @en
         * Get the positive offset value corresponds to the content's top left boundary.
         *
         * @zh
         * 获取滚动视图相对于左上角原点的当前滚动偏移。
         *
         * @return - 当前滚动偏移量。
         */
        ;

        _proto.getScrollOffset = function getScrollOffset() {
          var topDelta = this._getContentTopBoundary() - this._topBoundary;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          return new Vec2(leftDelta, topDelta);
        }
        /**
         * @en
         * Get the maximize available  scroll offset.
         *
         * @zh
         * 获取滚动视图最大可以滚动的偏移量。
         *
         * @return - 最大可滚动偏移量。
         */
        ;

        _proto.getMaxScrollOffset = function getMaxScrollOffset() {
          if (!this._content || !this.view) {
            return Vec2.ZERO;
          }

          var contentSize = this._content._uiProps.uiTransformComp.contentSize;
          var horizontalMaximizeOffset = contentSize.width - this.view.width;
          var verticalMaximizeOffset = contentSize.height - this.view.height;
          horizontalMaximizeOffset = horizontalMaximizeOffset >= 0 ? horizontalMaximizeOffset : 0;
          verticalMaximizeOffset = verticalMaximizeOffset >= 0 ? verticalMaximizeOffset : 0;
          return new Vec2(horizontalMaximizeOffset, verticalMaximizeOffset);
        }
        /**
         * @en
         * Scroll the content to the horizontal percent position of ScrollView.
         *
         * @zh
         * 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
         *
         * @param percent - 0 - 之间的百分比。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定水平百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Scroll to middle position.
         * scrollView.scrollToBottomRight(0.5, 0.1);
         * ```
         */
        ;

        _proto.scrollToPercentHorizontal = function scrollToPercentHorizontal(percent, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(percent, 0),
            applyToHorizontal: true,
            applyToVertical: false
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the percent position of ScrollView in any direction.
         *
         * @zh
         * 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
         *
         * @param anchor - 在 new Vec2(0,0) and new Vec2(1,1) 上取差值的一个点。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定水平或垂直百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * // Vertical scroll to the bottom of the view.
         * scrollView.scrollTo(new Vec2(0, 1), 0.1);
         *
         * // Horizontal scroll to view right.
         * scrollView.scrollTo(new Vec2(1, 0), 0.1);
         * ```
         */
        ;

        _proto.scrollTo = function scrollTo(anchor, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(anchor),
            applyToHorizontal: true,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Scroll the content to the vertical percent position of ScrollView.
         *
         * @zh
         * 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
         *
         * @param percent - 0 - 1 之间的百分比。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定垂直百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```ts
         * scrollView.scrollToPercentVertical(0.5, 0.1);
         * ```
         */
        ;

        _proto.scrollToPercentVertical = function scrollToPercentVertical(percent, timeInSecond, attenuated) {
          var moveDelta = this._calculateMovePercentDelta({
            anchor: new Vec2(0, percent),
            applyToHorizontal: false,
            applyToVertical: true
          });

          if (timeInSecond) {
            this._startAutoScroll(moveDelta, timeInSecond, attenuated);
          } else {
            this._moveContent(moveDelta);
          }
        }
        /**
         * @en
         * Stop auto scroll immediately.
         *
         * @zh
         * 停止自动滚动, 调用此 API 可以让 ScrollView 立即停止滚动。
         */
        ;

        _proto.stopAutoScroll = function stopAutoScroll() {
          this._autoScrolling = false;
          this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
        }
        /**
         * @en
         * Modify the content position.
         *
         * @zh
         * 设置当前视图内容的坐标点。
         *
         * @param position - current content position.
         * @deprecated Since 3.1.0, setContentPosition is deprecated, please use scrollToOffset instead.
         */
        ;

        _proto.setContentPosition = function setContentPosition(position) {
          this._setContentPosition(position);
        };

        _proto._setContentPosition = function _setContentPosition(position) {
          if (!this._content) {
            return;
          }

          var contentPos = this._getContentPosition();

          if (Math.abs(position.x - contentPos.x) < EPSILON && Math.abs(position.y - contentPos.y) < EPSILON) {
            return;
          }

          this._content.setPosition(position);

          this._outOfBoundaryAmountDirty = true;
        }
        /**
         * @en
         * Query the content's position in its parent space.
         *
         * @zh
         * 获取当前视图内容的坐标点。
         *
         * @returns - current content position.
         * @deprecated Since 3.1.0, getContentPosition is deprecated.
         */
        ;

        _proto.getContentPosition = function getContentPosition() {
          return this._getContentPosition();
        };

        _proto._getContentPosition = function _getContentPosition() {
          if (!this._content) {
            return Vec3.ZERO;
          }

          this._contentPos.set(this._content.position);

          return this._contentPos;
        }
        /**
         * @en
         * Query whether the user is currently dragging the ScrollView to scroll it.
         *
         * @zh
         * 用户是否在拖拽当前滚动视图。
         *
         * @returns - 是否在拖拽当前滚动视图。
         */
        ;

        _proto.isScrolling = function isScrolling() {
          return this._scrolling;
        }
        /**
         * @en
         * Query whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
         *
         * @zh
         * 当前滚动视图是否在惯性滚动。
         *
         * @returns - 滚动视图是否在惯性滚动。
         */
        ;

        _proto.isAutoScrolling = function isAutoScrolling() {
          return this._autoScrolling;
        };

        _proto.getScrollEndedEventTiming = function getScrollEndedEventTiming() {
          return EPSILON;
        };

        _proto.start = function start() {
          this._calculateBoundary(); // Because widget component will adjust content position and scrollView position is correct after visit
          // So this event could make sure the content is on the correct position after loading.


          if (this._content) {
            director.once(Director.EVENT_BEFORE_DRAW, this._adjustContentOutOfBoundary, this);
          }
        };

        _proto.onEnable = function onEnable() {
          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._registerEvent();

            if (this._content) {
              this._content.on(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);

              this._content.on(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);

              if (this.view) {
                this.view.node.on(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);
                this.view.node.on(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);
              }
            }

            this._calculateBoundary();
          }

          this._updateScrollBarState();
        };

        _proto.update = function update(dt) {
          if (this._autoScrolling) {
            this._processAutoScrolling(dt);
          }
        };

        _proto.onDisable = function onDisable() {
          if (!EDITOR || legacyCC.GAME_VIEW) {
            this._unregisterEvent();

            if (this._content) {
              this._content.off(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);

              this._content.off(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);

              if (this.view) {
                this.view.node.off(Node.EventType.TRANSFORM_CHANGED, this._scaleChanged, this);
                this.view.node.off(Node.EventType.SIZE_CHANGED, this._calculateBoundary, this);
              }
            }
          }

          this._hideScrollBar();

          this.stopAutoScroll();
        } // private methods
        ;

        _proto._registerEvent = function _registerEvent() {
          this.node.on(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
          this.node.on(Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
          this.node.on(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
        };

        _proto._unregisterEvent = function _unregisterEvent() {
          this.node.off(Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
          this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
          this.node.off(Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
          this.node.off(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
        };

        _proto._onMouseWheel = function _onMouseWheel(event, captureListeners) {
          if (!this.enabledInHierarchy) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          var deltaMove = new Vec3();
          var wheelPrecision = -0.1;
          var scrollY = event.getScrollY();

          if (this.vertical) {
            deltaMove.set(0, scrollY * wheelPrecision, 0);
          } else if (this.horizontal) {
            deltaMove.set(scrollY * wheelPrecision, 0, 0);
          }

          this._mouseWheelEventElapsedTime = 0;

          this._processDeltaMove(deltaMove);

          if (!this._stopMouseWheel) {
            this._handlePressLogic();

            this.schedule(this._checkMouseWheel, 1.0 / 60, NaN, 0);
            this._stopMouseWheel = true;
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchBegan = function _onTouchBegan(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          this._handlePressLogic();

          this._touchMoved = false;

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          var touch = event.touch;

          this._handleMoveLogic(touch); // Do not prevent touch events in inner nodes


          if (!this.cancelInnerEvents) {
            return;
          }

          var deltaMove = touch.getUILocation(_tempVec2);
          deltaMove.subtract(touch.getUIStartLocation(_tempVec2_1)); // FIXME: touch move delta should be calculated by DPI.

          if (deltaMove.length() > 7) {
            if (!this._touchMoved && event.target !== this.node) {
              // Simulate touch cancel for target node
              var cancelEvent = new EventTouch(event.getTouches(), event.bubbles);
              cancelEvent.type = Node.EventType.TOUCH_CANCEL;
              cancelEvent.touch = event.touch;
              cancelEvent.simulate = true;
              event.target.dispatchEvent(cancelEvent);
              this._touchMoved = true;
            }
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._onTouchEnded = function _onTouchEnded(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content || !event) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          }

          this._dispatchEvent(EventType.TOUCH_UP);

          var touch = event.touch;

          this._handleReleaseLogic(touch);

          if (this._touchMoved) {
            event.propagationStopped = true;
          } else {
            this._stopPropagationIfTargetIsMe(event);
          }
        };

        _proto._onTouchCancelled = function _onTouchCancelled(event, captureListeners) {
          if (!this.enabledInHierarchy || !this._content) {
            return;
          }

          if (this._hasNestedViewGroup(event, captureListeners)) {
            return;
          } // Filter touch cancel event send from self


          if (event && !event.simulate) {
            var touch = event.touch;

            this._handleReleaseLogic(touch);
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._calculateBoundary = function _calculateBoundary() {
          if (this._content && this.view) {
            // refresh content size
            var layout = this._content.getComponent(Layout);

            if (layout && layout.enabledInHierarchy) {
              layout.updateLayout();
            }

            var viewTrans = this.view;
            var anchorX = viewTrans.width * viewTrans.anchorX;
            var anchorY = viewTrans.height * viewTrans.anchorY;
            this._leftBoundary = -anchorX;
            this._bottomBoundary = -anchorY;
            this._rightBoundary = this._leftBoundary + viewTrans.width;
            this._topBoundary = this._bottomBoundary + viewTrans.height;

            this._moveContentToTopLeft(viewTrans.contentSize);
          }
        };

        _proto._hasNestedViewGroup = function _hasNestedViewGroup(event, captureListeners) {
          if (!event || event.eventPhase !== Event.CAPTURING_PHASE) {
            return false;
          }

          if (captureListeners) {
            // captureListeners are arranged from child to parent
            for (var _iterator = _createForOfIteratorHelperLoose(captureListeners), _step; !(_step = _iterator()).done;) {
              var listener = _step.value;
              var item = listener;

              if (this.node === item) {
                if (event.target && event.target.getComponent(ViewGroup)) {
                  return true;
                }

                return false;
              }

              if (item.getComponent(ViewGroup)) {
                return true;
              }
            }
          }

          return false;
        };

        _proto._startInertiaScroll = function _startInertiaScroll(touchMoveVelocity) {
          var inertiaTotalMovement = new Vec3(touchMoveVelocity);
          inertiaTotalMovement.multiplyScalar(MOVEMENT_FACTOR);

          this._startAttenuatingAutoScroll(inertiaTotalMovement, touchMoveVelocity);
        };

        _proto._calculateAttenuatedFactor = function _calculateAttenuatedFactor(distance) {
          if (this.brake <= 0) {
            return 1 - this.brake;
          } // attenuate formula from: http://learnopengl.com/#!Lighting/Light-casters


          return (1 - this.brake) * (1 / (1 + distance * 0.000014 + distance * distance * 0.000000008));
        };

        _proto._startAttenuatingAutoScroll = function _startAttenuatingAutoScroll(deltaMove, initialVelocity) {
          var targetDelta = deltaMove.clone();
          targetDelta.normalize();

          if (this._content && this.view) {
            var contentSize = this._content._uiProps.uiTransformComp.contentSize;
            var scrollViewSize = this.view.contentSize;
            var totalMoveWidth = contentSize.width - scrollViewSize.width;
            var totalMoveHeight = contentSize.height - scrollViewSize.height;

            var attenuatedFactorX = this._calculateAttenuatedFactor(totalMoveWidth);

            var attenuatedFactorY = this._calculateAttenuatedFactor(totalMoveHeight);

            targetDelta.x = targetDelta.x * totalMoveWidth * (1 - this.brake) * attenuatedFactorX;
            targetDelta.y = targetDelta.y * totalMoveHeight * attenuatedFactorY * (1 - this.brake);
            targetDelta.z = 0;
          }

          var originalMoveLength = deltaMove.length();
          var factor = targetDelta.length() / originalMoveLength;
          targetDelta.add(deltaMove);

          if (this.brake > 0 && factor > 7) {
            factor = Math.sqrt(factor);
            var clonedDeltaMove = deltaMove.clone();
            clonedDeltaMove.multiplyScalar(factor);
            targetDelta.set(clonedDeltaMove);
            targetDelta.add(deltaMove);
          }

          var time = this._calculateAutoScrollTimeByInitialSpeed(initialVelocity.length());

          if (this.brake > 0 && factor > 3) {
            factor = 3;
            time *= factor;
          }

          if (this.brake === 0 && factor > 1) {
            time *= factor;
          }

          this._startAutoScroll(targetDelta, time, true);
        };

        _proto._calculateAutoScrollTimeByInitialSpeed = function _calculateAutoScrollTimeByInitialSpeed(initialSpeed) {
          return Math.sqrt(Math.sqrt(initialSpeed / 5));
        };

        _proto._startAutoScroll = function _startAutoScroll(deltaMove, timeInSecond, attenuated) {
          if (attenuated === void 0) {
            attenuated = false;
          }

          var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);

          this._autoScrolling = true;
          this._autoScrollTargetDelta = adjustedDeltaMove;
          this._autoScrollAttenuate = attenuated;
          Vec3.copy(this._autoScrollStartPosition, this._getContentPosition());
          this._autoScrollTotalTime = timeInSecond;
          this._autoScrollAccumulatedTime = 0;
          this._autoScrollBraking = false;
          this._isScrollEndedWithThresholdEventFired = false;

          this._autoScrollBrakingStartPosition.set(0, 0, 0);

          var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

          if (!currentOutOfBoundary.equals(Vec3.ZERO, EPSILON)) {
            this._autoScrollCurrentlyOutOfBoundary = true;
          }
        };

        _proto._calculateTouchMoveVelocity = function _calculateTouchMoveVelocity() {
          var out = new Vec3();
          var totalTime = 0;
          totalTime = this._touchMoveTimeDeltas.reduce(function (a, b) {
            return a + b;
          }, totalTime);

          if (totalTime <= 0 || totalTime >= 0.5) {
            out.set(Vec3.ZERO);
          } else {
            var totalMovement = new Vec3();
            totalMovement = this._touchMoveDisplacements.reduce(function (a, b) {
              a.add(b);
              return a;
            }, totalMovement);
            out.set(totalMovement.x * (1 - this.brake) / totalTime, totalMovement.y * (1 - this.brake) / totalTime, totalMovement.z);
          }

          return out;
        };

        _proto._flattenVectorByDirection = function _flattenVectorByDirection(vector) {
          var result = vector;
          result.x = this.horizontal ? result.x : 0;
          result.y = this.vertical ? result.y : 0;
          return result;
        };

        _proto._moveContent = function _moveContent(deltaMove, canStartBounceBack) {
          var adjustedMove = this._flattenVectorByDirection(deltaMove);

          _tempVec3.set(this._getContentPosition());

          _tempVec3.add(adjustedMove);

          _tempVec3.set(Math.floor(_tempVec3.x * TOLERANCE) * EPSILON, Math.floor(_tempVec3.y * TOLERANCE) * EPSILON, _tempVec3.z);

          this._setContentPosition(_tempVec3);

          var outOfBoundary = this._getHowMuchOutOfBoundary();

          _tempVec2.set(outOfBoundary.x, outOfBoundary.y);

          this._updateScrollBar(_tempVec2);

          if (this.elastic && canStartBounceBack) {
            this._startBounceBackIfNeeded();
          }
        };

        _proto._getContentLeftBoundary = function _getContentLeftBoundary() {
          if (!this._content) {
            return -1;
          }

          var contentPos = this._getContentPosition();

          var uiTrans = this._content._uiProps.uiTransformComp;
          return contentPos.x - uiTrans.anchorX * uiTrans.width;
        };

        _proto._getContentRightBoundary = function _getContentRightBoundary() {
          if (!this._content) {
            return -1;
          }

          var uiTrans = this._content._uiProps.uiTransformComp;
          return this._getContentLeftBoundary() + uiTrans.width;
        };

        _proto._getContentTopBoundary = function _getContentTopBoundary() {
          if (!this._content) {
            return -1;
          }

          var uiTrans = this._content._uiProps.uiTransformComp;
          return this._getContentBottomBoundary() + uiTrans.height;
        };

        _proto._getContentBottomBoundary = function _getContentBottomBoundary() {
          if (!this._content) {
            return -1;
          }

          var contentPos = this._getContentPosition();

          var uiTrans = this._content._uiProps.uiTransformComp;
          return contentPos.y - uiTrans.anchorY * uiTrans.height;
        };

        _proto._getHowMuchOutOfBoundary = function _getHowMuchOutOfBoundary(addition) {
          addition = addition || new Vec3();

          if (addition.equals(Vec3.ZERO, EPSILON) && !this._outOfBoundaryAmountDirty) {
            return this._outOfBoundaryAmount;
          }

          var outOfBoundaryAmount = new Vec3();

          if (this._getContentLeftBoundary() + addition.x > this._leftBoundary) {
            outOfBoundaryAmount.x = this._leftBoundary - (this._getContentLeftBoundary() + addition.x);
          } else if (this._getContentRightBoundary() + addition.x < this._rightBoundary) {
            outOfBoundaryAmount.x = this._rightBoundary - (this._getContentRightBoundary() + addition.x);
          }

          if (this._getContentTopBoundary() + addition.y < this._topBoundary) {
            outOfBoundaryAmount.y = this._topBoundary - (this._getContentTopBoundary() + addition.y);
          } else if (this._getContentBottomBoundary() + addition.y > this._bottomBoundary) {
            outOfBoundaryAmount.y = this._bottomBoundary - (this._getContentBottomBoundary() + addition.y);
          }

          if (addition.equals(Vec3.ZERO, EPSILON)) {
            this._outOfBoundaryAmount = outOfBoundaryAmount;
            this._outOfBoundaryAmountDirty = false;
          }

          this._clampDelta(outOfBoundaryAmount);

          return outOfBoundaryAmount;
        };

        _proto._updateScrollBar = function _updateScrollBar(outOfBoundary) {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onScroll(outOfBoundary);
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onScroll(outOfBoundary);
          }
        };

        _proto._onScrollBarTouchBegan = function _onScrollBarTouchBegan() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onTouchBegan();
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onTouchBegan();
          }
        };

        _proto._onScrollBarTouchEnded = function _onScrollBarTouchEnded() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.onTouchEnded();
          }

          if (this.verticalScrollBar) {
            this.verticalScrollBar.onTouchEnded();
          }
        };

        _proto._dispatchEvent = function _dispatchEvent(event) {
          if (event === EventType.SCROLL_ENDED) {
            this._scrollEventEmitMask = 0;
          } else if (event === EventType.SCROLL_TO_TOP || event === EventType.SCROLL_TO_BOTTOM || event === EventType.SCROLL_TO_LEFT || event === EventType.SCROLL_TO_RIGHT) {
            var flag = 1 << eventMap[event];

            if (this._scrollEventEmitMask & flag) {
              return;
            } else {
              this._scrollEventEmitMask |= flag;
            }
          }

          ComponentEventHandler.emitEvents(this.scrollEvents, this, eventMap[event]);
          this.node.emit(event, this);
        };

        _proto._adjustContentOutOfBoundary = function _adjustContentOutOfBoundary() {
          if (!this._content) {
            return;
          }

          this._outOfBoundaryAmountDirty = true;

          if (this._isOutOfBoundary()) {
            var outOfBoundary = this._getHowMuchOutOfBoundary();

            _tempVec3.set(this._getContentPosition());

            _tempVec3.add(outOfBoundary);

            this._content.setPosition(_tempVec3);

            this._updateScrollBar(Vec2.ZERO);
          }
        };

        _proto._hideScrollBar = function _hideScrollBar() {
          if (this._horizontalScrollBar) {
            this._horizontalScrollBar.hide();
          }

          if (this._verticalScrollBar) {
            this._verticalScrollBar.hide();
          }
        };

        _proto._updateScrollBarState = function _updateScrollBarState() {
          if (!this._content || !this.view) {
            return;
          }

          var viewTrans = this.view;
          var uiTrans = this._content._uiProps.uiTransformComp;

          if (this.verticalScrollBar) {
            if (uiTrans.height < viewTrans.height) {
              this.verticalScrollBar.hide();
            } else {
              this.verticalScrollBar.show();
            }
          }

          if (this.horizontalScrollBar) {
            if (uiTrans.width < viewTrans.width) {
              this.horizontalScrollBar.hide();
            } else {
              this.horizontalScrollBar.show();
            }
          }
        } // This is for ScrollView as children of a Button
        ;

        _proto._stopPropagationIfTargetIsMe = function _stopPropagationIfTargetIsMe(event) {
          if (event.eventPhase === Event.AT_TARGET && event.target === this.node) {
            event.propagationStopped = true;
          }
        };

        _proto._processDeltaMove = function _processDeltaMove(deltaMove) {
          this._scrollChildren(deltaMove);

          this._gatherTouchMove(deltaMove);
        };

        _proto._handleMoveLogic = function _handleMoveLogic(touch) {
          this._getLocalAxisAlignDelta(this._deltaPos, touch);

          this._processDeltaMove(this._deltaPos);
        };

        _proto._handleReleaseLogic = function _handleReleaseLogic(touch) {
          this._getLocalAxisAlignDelta(this._deltaPos, touch);

          this._gatherTouchMove(this._deltaPos);

          this._processInertiaScroll();

          if (this._scrolling) {
            this._scrolling = false;

            if (!this._autoScrolling) {
              this._dispatchEvent(EventType.SCROLL_ENDED);
            }
          }
        };

        _proto._getLocalAxisAlignDelta = function _getLocalAxisAlignDelta(out, touch) {
          var uiTransformComp = this.node._uiProps.uiTransformComp;
          var vec = new Vec3();

          if (uiTransformComp) {
            touch.getUILocation(_tempVec2);
            touch.getUIPreviousLocation(_tempVec2_1);

            _tempVec3.set(_tempVec2.x, _tempVec2.y, 0);

            _tempVec3_1.set(_tempVec2_1.x, _tempVec2_1.y, 0);

            uiTransformComp.convertToNodeSpaceAR(_tempVec3, _tempVec3);
            uiTransformComp.convertToNodeSpaceAR(_tempVec3_1, _tempVec3_1);
            Vec3.subtract(vec, _tempVec3, _tempVec3_1);
          }

          out.set(vec);
        };

        _proto._scrollChildren = function _scrollChildren(deltaMove) {
          this._clampDelta(deltaMove);

          var realMove = deltaMove;
          var outOfBoundary;

          if (this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary();
            realMove.x *= outOfBoundary.x === 0 ? 1 : 0.5;
            realMove.y *= outOfBoundary.y === 0 ? 1 : 0.5;
          }

          if (!this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
            realMove.add(outOfBoundary);
          }

          var scrollEventType;

          if (this._content) {
            var _ref = this._content._uiProps.uiTransformComp,
                anchorX = _ref.anchorX,
                anchorY = _ref.anchorY,
                width = _ref.width,
                height = _ref.height;
            var pos = this._content.position || Vec3.ZERO;

            if (realMove.y > 0) {
              // up
              var icBottomPos = pos.y - anchorY * height;

              if (icBottomPos + realMove.y >= this._bottomBoundary) {
                scrollEventType = EventType.SCROLL_TO_BOTTOM;
              }
            } else if (realMove.y < 0) {
              // down
              var icTopPos = pos.y - anchorY * height + height;

              if (icTopPos + realMove.y <= this._topBoundary) {
                scrollEventType = EventType.SCROLL_TO_TOP;
              }
            }

            if (realMove.x < 0) {
              // left
              var icRightPos = pos.x - anchorX * width + width;

              if (icRightPos + realMove.x <= this._rightBoundary) {
                scrollEventType = EventType.SCROLL_TO_RIGHT;
              }
            } else if (realMove.x > 0) {
              // right
              var icLeftPos = pos.x - anchorX * width;

              if (icLeftPos + realMove.x >= this._leftBoundary) {
                scrollEventType = EventType.SCROLL_TO_LEFT;
              }
            }
          }

          this._moveContent(realMove, false);

          if (realMove.x !== 0 || realMove.y !== 0) {
            if (!this._scrolling) {
              this._scrolling = true;

              this._dispatchEvent(EventType.SCROLL_BEGAN);
            }

            this._dispatchEvent(EventType.SCROLLING);
          }

          if (scrollEventType && scrollEventType.length > 0) {
            this._dispatchEvent(scrollEventType);
          }
        };

        _proto._handlePressLogic = function _handlePressLogic() {
          if (this._autoScrolling) {
            this._dispatchEvent(EventType.SCROLL_ENDED);
          }

          this._autoScrolling = false;
          this._isBouncing = false;
          this._touchMovePreviousTimestamp = getTimeInMilliseconds();
          this._touchMoveDisplacements.length = 0;
          this._touchMoveTimeDeltas.length = 0;

          this._onScrollBarTouchBegan();
        };

        _proto._clampDelta = function _clampDelta(out) {
          if (this._content && this.view) {
            var scrollViewSize = this.view.contentSize;
            var uiTrans = this._content._uiProps.uiTransformComp;

            if (uiTrans.width < scrollViewSize.width) {
              out.x = 0;
            }

            if (uiTrans.height < scrollViewSize.height) {
              out.y = 0;
            }
          }
        };

        _proto._gatherTouchMove = function _gatherTouchMove(delta) {
          var clampDt = delta.clone();

          this._clampDelta(clampDt);

          while (this._touchMoveDisplacements.length >= NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED) {
            this._touchMoveDisplacements.shift();

            this._touchMoveTimeDeltas.shift();
          }

          this._touchMoveDisplacements.push(clampDt);

          var timeStamp = getTimeInMilliseconds();

          this._touchMoveTimeDeltas.push((timeStamp - this._touchMovePreviousTimestamp) / 1000);

          this._touchMovePreviousTimestamp = timeStamp;
        };

        _proto._startBounceBackIfNeeded = function _startBounceBackIfNeeded() {
          if (!this.elastic) {
            return false;
          }

          var bounceBackAmount = this._getHowMuchOutOfBoundary();

          this._clampDelta(bounceBackAmount);

          if (bounceBackAmount.equals(Vec3.ZERO, EPSILON)) {
            return false;
          }

          var bounceBackTime = Math.max(this.bounceDuration, 0);

          this._startAutoScroll(bounceBackAmount, bounceBackTime, true);

          if (!this._isBouncing) {
            if (bounceBackAmount.y > 0) {
              this._dispatchEvent(EventType.BOUNCE_TOP);
            }

            if (bounceBackAmount.y < 0) {
              this._dispatchEvent(EventType.BOUNCE_BOTTOM);
            }

            if (bounceBackAmount.x > 0) {
              this._dispatchEvent(EventType.BOUNCE_RIGHT);
            }

            if (bounceBackAmount.x < 0) {
              this._dispatchEvent(EventType.BOUNCE_LEFT);
            }

            this._isBouncing = true;
          }

          return true;
        };

        _proto._processInertiaScroll = function _processInertiaScroll() {
          var bounceBackStarted = this._startBounceBackIfNeeded();

          if (!bounceBackStarted && this.inertia) {
            var touchMoveVelocity = this._calculateTouchMoveVelocity();

            if (!touchMoveVelocity.equals(_tempVec3, EPSILON) && this.brake < 1) {
              this._startInertiaScroll(touchMoveVelocity);
            }
          }

          this._onScrollBarTouchEnded();
        };

        _proto._isOutOfBoundary = function _isOutOfBoundary() {
          var outOfBoundary = this._getHowMuchOutOfBoundary();

          return !outOfBoundary.equals(Vec3.ZERO, EPSILON);
        };

        _proto._isNecessaryAutoScrollBrake = function _isNecessaryAutoScrollBrake() {
          if (this._autoScrollBraking) {
            return true;
          }

          if (this._isOutOfBoundary()) {
            if (!this._autoScrollCurrentlyOutOfBoundary) {
              this._autoScrollCurrentlyOutOfBoundary = true;
              this._autoScrollBraking = true;
              this._autoScrollBrakingStartPosition = this._getContentPosition();
              return true;
            }
          } else {
            this._autoScrollCurrentlyOutOfBoundary = false;
          }

          return false;
        };

        _proto._processAutoScrolling = function _processAutoScrolling(dt) {
          var isAutoScrollBrake = this._isNecessaryAutoScrollBrake();

          var brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
          this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
          var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);

          if (this._autoScrollAttenuate) {
            percentage = quintEaseOut(percentage);
          }

          var clonedAutoScrollTargetDelta = this._autoScrollTargetDelta.clone();

          clonedAutoScrollTargetDelta.multiplyScalar(percentage);

          var clonedAutoScrollStartPosition = this._autoScrollStartPosition.clone();

          clonedAutoScrollStartPosition.add(clonedAutoScrollTargetDelta);
          var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
          var fireEvent = Math.abs(percentage - 1) <= this.getScrollEndedEventTiming();

          if (fireEvent && !this._isScrollEndedWithThresholdEventFired) {
            this._dispatchEvent(EventType.SCROLL_ENG_WITH_THRESHOLD);

            this._isScrollEndedWithThresholdEventFired = true;
          }

          if (this.elastic) {
            var brakeOffsetPosition = clonedAutoScrollStartPosition.clone();
            brakeOffsetPosition.subtract(this._autoScrollBrakingStartPosition);

            if (isAutoScrollBrake) {
              brakeOffsetPosition.multiplyScalar(brakingFactor);
            }

            clonedAutoScrollStartPosition.set(this._autoScrollBrakingStartPosition);
            clonedAutoScrollStartPosition.add(brakeOffsetPosition);
          } else {
            var moveDelta = clonedAutoScrollStartPosition.clone();
            moveDelta.subtract(this.getContentPosition());

            var outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);

            if (!outOfBoundary.equals(Vec3.ZERO, EPSILON)) {
              clonedAutoScrollStartPosition.add(outOfBoundary);
              reachedEnd = true;
            }
          }

          if (reachedEnd) {
            this._autoScrolling = false;
          }

          var deltaMove = clonedAutoScrollStartPosition.clone();
          deltaMove.subtract(this._getContentPosition());

          this._clampDelta(deltaMove);

          this._moveContent(deltaMove, reachedEnd);

          this._dispatchEvent(EventType.SCROLLING);

          if (!this._autoScrolling) {
            this._isBouncing = false;
            this._scrolling = false;

            this._dispatchEvent(EventType.SCROLL_ENDED);
          }
        };

        _proto._checkMouseWheel = function _checkMouseWheel(dt) {
          var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

          var maxElapsedTime = 0.1;

          if (!currentOutOfBoundary.equals(Vec3.ZERO, EPSILON)) {
            this._processInertiaScroll();

            this.unschedule(this._checkMouseWheel);

            this._dispatchEvent(EventType.SCROLL_ENDED);

            this._stopMouseWheel = false;
            return;
          }

          this._mouseWheelEventElapsedTime += dt; // mouse wheel event is ended

          if (this._mouseWheelEventElapsedTime > maxElapsedTime) {
            this._onScrollBarTouchEnded();

            this.unschedule(this._checkMouseWheel);

            this._dispatchEvent(EventType.SCROLL_ENDED);

            this._stopMouseWheel = false;
          }
        };

        _proto._calculateMovePercentDelta = function _calculateMovePercentDelta(options) {
          var anchor = options.anchor;
          var applyToHorizontal = options.applyToHorizontal;
          var applyToVertical = options.applyToVertical;

          this._calculateBoundary();

          anchor.clampf(Vec2.ZERO, Vec2.ONE);

          var bottomDelta = this._getContentBottomBoundary() - this._bottomBoundary;

          bottomDelta = -bottomDelta;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          leftDelta = -leftDelta;
          var moveDelta = new Vec3();

          if (this._content && this.view) {
            var totalScrollDelta = 0;
            var uiTrans = this._content._uiProps.uiTransformComp;
            var contentSize = uiTrans.contentSize;
            var scrollSize = this.view.contentSize;

            if (applyToHorizontal) {
              totalScrollDelta = contentSize.width - scrollSize.width;
              moveDelta.x = leftDelta - totalScrollDelta * anchor.x;
            }

            if (applyToVertical) {
              totalScrollDelta = contentSize.height - scrollSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta * anchor.y;
            }
          }

          return moveDelta;
        };

        _proto._moveContentToTopLeft = function _moveContentToTopLeft(scrollViewSize) {
          var bottomDelta = this._getContentBottomBoundary() - this._bottomBoundary;

          bottomDelta = -bottomDelta;
          var moveDelta = new Vec3();
          var totalScrollDelta = 0;

          var leftDelta = this._getContentLeftBoundary() - this._leftBoundary;

          leftDelta = -leftDelta; // 是否限制在上视区上边

          if (this._content) {
            var uiTrans = this._content._uiProps.uiTransformComp;
            var contentSize = uiTrans.contentSize;

            if (contentSize.height < scrollViewSize.height) {
              totalScrollDelta = contentSize.height - scrollViewSize.height;
              moveDelta.y = bottomDelta - totalScrollDelta;
            } // 是否限制在上视区左边


            if (contentSize.width < scrollViewSize.width) {
              totalScrollDelta = contentSize.width - scrollViewSize.width;
              moveDelta.x = leftDelta;
            }
          }

          this._updateScrollBarState();

          this._moveContent(moveDelta);

          this._adjustContentOutOfBoundary();
        };

        _proto._scaleChanged = function _scaleChanged(value) {
          if (value === TransformBit.SCALE) {
            this._calculateBoundary();
          }
        };

        _createClass(ScrollView, [{
          key: "content",
          get:
          /**
           * @en
           * This is a reference to the UI element to be scrolled.
           *
           * @zh
           * 可滚动展示内容的节点。
           */
          function get() {
            return this._content;
          },
          set: function set(value) {
            if (this._content === value) {
              return;
            }

            var viewTrans = value && value.parent && value.parent._uiProps.uiTransformComp;

            if (value && (!value || !viewTrans)) {
              logID(4302);
              return;
            }

            this._content = value;

            this._calculateBoundary();
          }
          /**
           * @en
           * Enable horizontal scroll.
           *
           * @zh
           * 是否开启水平滚动。
           */

        }, {
          key: "horizontalScrollBar",
          get:
          /**
           * @en
           * The horizontal scrollbar reference.
           * @zh
           * 水平滚动的 ScrollBar。
           */
          function get() {
            return this._horizontalScrollBar;
          },
          set: function set(value) {
            if (this._horizontalScrollBar === value) {
              return;
            }

            this._horizontalScrollBar = value;

            if (this._horizontalScrollBar) {
              this._horizontalScrollBar.setScrollView(this);

              this._updateScrollBar(Vec2.ZERO);
            }
          }
          /**
           * @en
           * Enable vertical scroll.
           *
           * @zh
           * 是否开启垂直滚动。
           */

        }, {
          key: "verticalScrollBar",
          get:
          /**
           * @en
           * The vertical scrollbar reference.
           *
           * @zh
           * 垂直滚动的 ScrollBar。
           */
          function get() {
            return this._verticalScrollBar;
          },
          set: function set(value) {
            if (this._verticalScrollBar === value) {
              return;
            }

            this._verticalScrollBar = value;

            if (this._verticalScrollBar) {
              this._verticalScrollBar.setScrollView(this);

              this._updateScrollBar(Vec2.ZERO);
            }
          }
          /**
           * @en
           * If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes
           * It's set to true by default.
           *
           * @zh
           * 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。<br/>
           * 注意，子节点上的 touchstart 事件仍然会触发，触点移动距离非常短的情况下 touchmove 和 touchend 也不会受影响。
           */

        }, {
          key: "view",
          get: function get() {
            var parent = this._content && this._content.parent;

            if (!parent) {
              return null;
            }

            return parent._uiProps.uiTransformComp;
          }
        }]);

        return ScrollView;
      }(ViewGroup), _class3.EventType = EventType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bounceDuration", [serializable, _dec6, _dec7, _dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "brake", [serializable, _dec9, _dec10, _dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "elastic", [serializable, _dec12, _dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "inertia", [serializable, _dec14, _dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "content", [_dec16, _dec17, _dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "content"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "horizontal", [serializable, _dec19, _dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "horizontalScrollBar", [_dec21, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "horizontalScrollBar"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "vertical", [serializable, _dec24, _dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "verticalScrollBar", [_dec26, _dec27, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "verticalScrollBar"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cancelInnerEvents", [serializable, _dec29, _dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "scrollEvents", [_dec31, serializable, _dec32, _dec33], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_content", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_horizontalScrollBar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_verticalScrollBar", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-to-top
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-to-bottom
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-to-left
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-to-right
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scrolling
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event bounce-bottom
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event bounce-top
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event bounce-left
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event bounce-right
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-ended
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event touch-up
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

      /**
       * @en
       * Note: This event is emitted from the node to which the component belongs.
       * @zh
       * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
       * @event scroll-began
       * @param {Event.EventCustom} event
       * @param {ScrollView} scrollView - The ScrollView component.
       */

    }
  };
});