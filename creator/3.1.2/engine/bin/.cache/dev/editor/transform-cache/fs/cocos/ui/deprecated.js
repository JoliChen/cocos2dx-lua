"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UICoordinateTrackerComponent", {
  enumerable: true,
  get: function () {
    return _uiCoordinateTracker.UICoordinateTracker;
  }
});
Object.defineProperty(exports, "BlockInputEventsComponent", {
  enumerable: true,
  get: function () {
    return _blockInputEvents.BlockInputEvents;
  }
});
Object.defineProperty(exports, "ButtonComponent", {
  enumerable: true,
  get: function () {
    return _button.Button;
  }
});
Object.defineProperty(exports, "EditBoxComponent", {
  enumerable: true,
  get: function () {
    return _editBox.EditBox;
  }
});
Object.defineProperty(exports, "LayoutComponent", {
  enumerable: true,
  get: function () {
    return _layout.Layout;
  }
});
Object.defineProperty(exports, "ProgressBarComponent", {
  enumerable: true,
  get: function () {
    return _progressBar.ProgressBar;
  }
});
Object.defineProperty(exports, "ScrollViewComponent", {
  enumerable: true,
  get: function () {
    return _scrollView.ScrollView;
  }
});
Object.defineProperty(exports, "ScrollBarComponent", {
  enumerable: true,
  get: function () {
    return _scrollBar.ScrollBar;
  }
});
Object.defineProperty(exports, "SliderComponent", {
  enumerable: true,
  get: function () {
    return _slider.Slider;
  }
});
Object.defineProperty(exports, "ToggleComponent", {
  enumerable: true,
  get: function () {
    return _toggle.Toggle;
  }
});
Object.defineProperty(exports, "ToggleContainerComponent", {
  enumerable: true,
  get: function () {
    return _toggleContainer.ToggleContainer;
  }
});
Object.defineProperty(exports, "WidgetComponent", {
  enumerable: true,
  get: function () {
    return _widget.Widget;
  }
});
Object.defineProperty(exports, "PageViewComponent", {
  enumerable: true,
  get: function () {
    return _pageView.PageView;
  }
});
Object.defineProperty(exports, "PageViewIndicatorComponent", {
  enumerable: true,
  get: function () {
    return _pageViewIndicator.PageViewIndicator;
  }
});
Object.defineProperty(exports, "SafeAreaComponent", {
  enumerable: true,
  get: function () {
    return _safeArea.SafeArea;
  }
});
exports.UIReorderComponent = void 0;

var _uiCoordinateTracker = require("./ui-coordinate-tracker.js");

var _blockInputEvents = require("./block-input-events.js");

var _button = require("./button.js");

var _editBox = require("./editbox/edit-box.js");

var _layout = require("./layout.js");

var _progressBar = require("./progress-bar.js");

var _scrollView = require("./scroll-view.js");

var _scrollBar = require("./scroll-bar.js");

var _slider = require("./slider.js");

var _toggle = require("./toggle.js");

var _toggleContainer = require("./toggle-container.js");

var _widget = require("./widget.js");

var _pageView = require("./page-view.js");

var _pageViewIndicator = require("./page-view-indicator.js");

var _safeArea = require("./safe-area.js");

var _debug = require("../core/platform/debug.js");

var _classDecorator = require("../core/data/class-decorator.js");

var _js = require("../core/utils/js.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _class;

/**
 * @deprecated Since v1.2
 */
let UIReorderComponent = (_dec = (0, _classDecorator.ccclass)('cc.UIReorderComponent'), _dec(_class = class UIReorderComponent {
  constructor() {
    (0, _debug.warnID)(1408, 'UIReorderComponent');
  }

}) || _class);
exports.UIReorderComponent = UIReorderComponent;
_globalExports.legacyCC.UIReorderComponent = UIReorderComponent;
/**
 * Alias of [[Button]]
 * @deprecated Since v1.2
 */

_globalExports.legacyCC.ButtonComponent = _button.Button;

_js.js.setClassAlias(_button.Button, 'cc.ButtonComponent');
/**
 * Alias of [[EditBox]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.EditBoxComponent = _editBox.EditBox;

_js.js.setClassAlias(_editBox.EditBox, 'cc.EditBoxComponent');
/**
 * Alias of [[Layout]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.LayoutComponent = _layout.Layout;

_js.js.setClassAlias(_layout.Layout, 'cc.LayoutComponent');
/**
 * Alias of [[ProgressBar]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ProgressBarComponent = _progressBar.ProgressBar;

_js.js.setClassAlias(_progressBar.ProgressBar, 'cc.ProgressBarComponent');
/**
 * Alias of [[ScrollView]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ScrollViewComponent = _scrollView.ScrollView;

_js.js.setClassAlias(_scrollView.ScrollView, 'cc.ScrollViewComponent');
/**
 * Alias of [[ScrollBar]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ScrollBarComponent = _scrollBar.ScrollBar;

_js.js.setClassAlias(_scrollBar.ScrollBar, 'cc.ScrollBarComponent');
/**
 * Alias of [[Slider]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SliderComponent = _slider.Slider;

_js.js.setClassAlias(_slider.Slider, 'cc.SliderComponent');
/**
 * Alias of [[Toggle]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ToggleComponent = _toggle.Toggle;

_js.js.setClassAlias(_toggle.Toggle, 'cc.ToggleComponent');
/**
 * Alias of [[ToggleContainer]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.ToggleContainerComponent = _toggleContainer.ToggleContainer;

_js.js.setClassAlias(_toggleContainer.ToggleContainer, 'cc.ToggleContainerComponent');
/**
 * Alias of [[Widget]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.WidgetComponent = _widget.Widget;

_js.js.setClassAlias(_widget.Widget, 'cc.WidgetComponent');
/**
 * Alias of [[PageView]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.PageViewComponent = _pageView.PageView;

_js.js.setClassAlias(_pageView.PageView, 'cc.PageViewComponent');
/**
 * Alias of [[PageViewIndicator]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.PageViewIndicatorComponent = _pageViewIndicator.PageViewIndicator;

_js.js.setClassAlias(_pageViewIndicator.PageViewIndicator, 'cc.PageViewIndicatorComponent');
/**
 * Alias of [[SafeArea]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.SafeAreaComponent = _safeArea.SafeArea;

_js.js.setClassAlias(_safeArea.SafeArea, 'cc.SafeAreaComponent');
/**
 * Alias of [[UICoordinateTracker]]
 * @deprecated Since v1.2
 */


_js.js.setClassAlias(_uiCoordinateTracker.UICoordinateTracker, 'cc.UICoordinateTrackerComponent');
/**
 * Alias of [[BlockInputEvents]]
 * @deprecated Since v1.2
 */


_globalExports.legacyCC.BlockInputEventsComponent = _blockInputEvents.BlockInputEvents;

_js.js.setClassAlias(_blockInputEvents.BlockInputEvents, 'cc.BlockInputEventsComponent');