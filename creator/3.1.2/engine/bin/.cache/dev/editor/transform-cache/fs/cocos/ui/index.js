"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Button: true,
  EditBox: true,
  Layout: true,
  ProgressBar: true,
  ScrollBar: true,
  ScrollView: true,
  Slider: true,
  Toggle: true,
  ToggleContainer: true,
  ViewGroup: true,
  Widget: true,
  PageView: true,
  PageViewIndicator: true,
  SafeArea: true,
  UICoordinateTracker: true,
  BlockInputEvents: true,
  SubContextView: true,
  widgetManager: true
};
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _button.Button;
  }
});
Object.defineProperty(exports, "EditBox", {
  enumerable: true,
  get: function () {
    return _editBox.EditBox;
  }
});
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function () {
    return _layout.Layout;
  }
});
Object.defineProperty(exports, "ProgressBar", {
  enumerable: true,
  get: function () {
    return _progressBar.ProgressBar;
  }
});
Object.defineProperty(exports, "ScrollBar", {
  enumerable: true,
  get: function () {
    return _scrollBar.ScrollBar;
  }
});
Object.defineProperty(exports, "ScrollView", {
  enumerable: true,
  get: function () {
    return _scrollView.ScrollView;
  }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () {
    return _slider.Slider;
  }
});
Object.defineProperty(exports, "Toggle", {
  enumerable: true,
  get: function () {
    return _toggle.Toggle;
  }
});
Object.defineProperty(exports, "ToggleContainer", {
  enumerable: true,
  get: function () {
    return _toggleContainer.ToggleContainer;
  }
});
Object.defineProperty(exports, "ViewGroup", {
  enumerable: true,
  get: function () {
    return _viewGroup.ViewGroup;
  }
});
Object.defineProperty(exports, "Widget", {
  enumerable: true,
  get: function () {
    return _widget.Widget;
  }
});
Object.defineProperty(exports, "PageView", {
  enumerable: true,
  get: function () {
    return _pageView.PageView;
  }
});
Object.defineProperty(exports, "PageViewIndicator", {
  enumerable: true,
  get: function () {
    return _pageViewIndicator.PageViewIndicator;
  }
});
Object.defineProperty(exports, "SafeArea", {
  enumerable: true,
  get: function () {
    return _safeArea.SafeArea;
  }
});
Object.defineProperty(exports, "UICoordinateTracker", {
  enumerable: true,
  get: function () {
    return _uiCoordinateTracker.UICoordinateTracker;
  }
});
Object.defineProperty(exports, "BlockInputEvents", {
  enumerable: true,
  get: function () {
    return _blockInputEvents.BlockInputEvents;
  }
});
Object.defineProperty(exports, "SubContextView", {
  enumerable: true,
  get: function () {
    return _subContextView.SubContextView;
  }
});
Object.defineProperty(exports, "widgetManager", {
  enumerable: true,
  get: function () {
    return _widgetManager.widgetManager;
  }
});

var _button = require("./button.js");

var _editBox = require("./editbox/edit-box.js");

var _layout = require("./layout.js");

var _progressBar = require("./progress-bar.js");

var _scrollBar = require("./scroll-bar.js");

var _scrollView = require("./scroll-view.js");

var _slider = require("./slider.js");

var _toggle = require("./toggle.js");

var _toggleContainer = require("./toggle-container.js");

var _viewGroup = require("./view-group.js");

var _widget = require("./widget.js");

var _pageView = require("./page-view.js");

var _pageViewIndicator = require("./page-view-indicator.js");

var _safeArea = require("./safe-area.js");

var _uiCoordinateTracker = require("./ui-coordinate-tracker.js");

var _blockInputEvents = require("./block-input-events.js");

var _subContextView = require("./sub-context-view.js");

var _widgetManager = require("./widget-manager.js");

var _deprecated = require("./deprecated.js");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _deprecated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});