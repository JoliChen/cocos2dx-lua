System.register("q-bundled:///fs/cocos/core/platform/view.js", ["../data/class.js", "../../../pal/system/web/system.js", "../../../../virtual/internal%253Aconstants.js", "../event/event-target.js", "../game.js", "../math/index.js", "./visible-rect.js", "../global-exports.js", "./debug.js", "./sys.js", "../../../pal/system/enum-type/index.js"], function (_export, _context) {
  "use strict";

  var system, EDITOR, MINIGAME, JSB, RUNTIME_BASED, EventTarget, Rect, Size, Vec2, visibleRect, legacyCC, logID, errorID, sys, BrowserType, OS, BrowserGetter, __BrowserGetter, View, ContainerStrategy, ContentStrategy, ResolutionPolicy, view;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_dataClassJs) {}, function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      MINIGAME = _virtualInternal253AconstantsJs.MINIGAME;
      JSB = _virtualInternal253AconstantsJs.JSB;
      RUNTIME_BASED = _virtualInternal253AconstantsJs.RUNTIME_BASED;
    }, function (_eventEventTargetJs) {
      EventTarget = _eventEventTargetJs.EventTarget;
    }, function (_gameJs) {}, function (_mathIndexJs) {
      Rect = _mathIndexJs.Rect;
      Size = _mathIndexJs.Size;
      Vec2 = _mathIndexJs.Vec2;
    }, function (_visibleRectJs) {
      visibleRect = _visibleRectJs.default;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_debugJs) {
      logID = _debugJs.logID;
      errorID = _debugJs.errorID;
    }, function (_sysJs) {
      sys = _sysJs.sys;
    }, function (_palSystemEnumTypeIndexJs) {
      BrowserType = _palSystemEnumTypeIndexJs.BrowserType;
      OS = _palSystemEnumTypeIndexJs.OS;
    }],
    execute: function () {
      BrowserGetter = /*#__PURE__*/function () {
        function BrowserGetter() {
          this.html = void 0;
          this.meta = {
            width: 'device-width'
          };
          this.adaptationType = legacyCC.sys.browserType;
        }

        var _proto = BrowserGetter.prototype;

        _proto.init = function init() {
          if (!MINIGAME) {
            this.html = document.getElementsByTagName('html')[0];
          }
        };

        _proto.availWidth = function availWidth(frame) {
          if (legacyCC.sys.isMobile || !frame || frame === this.html) {
            return window.innerWidth;
          } else {
            return frame.clientWidth;
          }
        };

        _proto.availHeight = function availHeight(frame) {
          if (legacyCC.sys.isMobile || !frame || frame === this.html) {
            return window.innerHeight;
          } else {
            return frame.clientHeight;
          }
        };

        return BrowserGetter;
      }();

      __BrowserGetter = new BrowserGetter();

      if (system.os === OS.IOS) {
        // All browsers are WebView
        __BrowserGetter.adaptationType = BrowserType.SAFARI;
      }

      switch (__BrowserGetter.adaptationType) {
        case BrowserType.SAFARI:
          {
            __BrowserGetter.meta['minimal-ui'] = 'true';

            __BrowserGetter.availWidth = function (frame) {
              return frame.clientWidth;
            };

            __BrowserGetter.availHeight = function (frame) {
              return frame.clientHeight;
            };

            break;
          }

        case BrowserType.SOUGOU:
          {
            __BrowserGetter.availWidth = function (frame) {
              return frame.clientWidth;
            };

            __BrowserGetter.availHeight = function (frame) {
              return frame.clientHeight;
            };

            break;
          }

        case BrowserType.UC:
          {
            __BrowserGetter.availWidth = function (frame) {
              return frame.clientWidth;
            };

            __BrowserGetter.availHeight = function (frame) {
              return frame.clientHeight;
            };

            break;
          }

        default:
          break;
      }
      /**
       * @en View represents the game window.<br/>
       * It's main task include: <br/>
       *  - Apply the design resolution policy to the UI Canvas<br/>
       *  - Provide interaction with the window, like resize event on web, retina display support, etc...<br/>
       *  - Manage the scale and translation of canvas related to the frame on Web<br/>
       * <br/>
       * With {{view}} as its singleton initialized by the engine, you don't need to call any constructor or create functions,<br/>
       * the standard way to use it is by calling:<br/>
       *  - view.methodName(); <br/>
       * @zh View 代表游戏窗口视图，它的核心功能包括：
       *  - 对所有 UI Canvas 进行设计分辨率适配。
       *  - 提供窗口视图的交互，比如监听 resize 事件，控制 retina 屏幕适配，等等。
       *  - 控制 Canvas 节点相对于外层 DOM 节点的缩放和偏移。
       * 引擎会自动初始化它的单例对象 {{view}}，所以你不需要实例化任何 View，只需要直接使用 `view.methodName();`
       */


      _export("View", View = /*#__PURE__*/function (_EventTarget) {
        _inheritsLoose(View, _EventTarget);

        function View() {
          var _this;

          _this = _EventTarget.call(this) || this;
          _this._resizeWithBrowserSize = void 0;
          _this._designResolutionSize = void 0;
          _this._originalDesignResolutionSize = void 0;
          _this._frameSize = void 0;
          _this._scaleX = void 0;
          _this._scaleY = void 0;
          _this._viewportRect = void 0;
          _this._visibleRect = void 0;
          _this._autoFullScreen = void 0;
          _this._devicePixelRatio = void 0;
          _this._maxPixelRatio = void 0;
          _this._retinaEnabled = void 0;
          _this._resizeCallback = void 0;
          _this._resizing = void 0;
          _this._orientationChanging = void 0;
          _this._isRotated = void 0;
          _this._orientation = void 0;
          _this._isAdjustViewport = void 0;
          _this._resolutionPolicy = void 0;
          _this._rpExactFit = void 0;
          _this._rpShowAll = void 0;
          _this._rpNoBorder = void 0;
          _this._rpFixedHeight = void 0;
          _this._rpFixedWidth = void 0;
          var _strategyer = ContainerStrategy;
          var _strategy = ContentStrategy; // Size of parent node that contains cc.game.container and cc.game.canvas

          _this._frameSize = new Size(0, 0); // resolution size, it is the size appropriate for the app resources.

          _this._designResolutionSize = new Size(0, 0);
          _this._originalDesignResolutionSize = new Size(0, 0);
          _this._scaleX = 1;
          _this._scaleY = 1; // Viewport is the container's rect related to content's coordinates in pixel

          _this._viewportRect = new Rect(0, 0, 0, 0); // The visible rect in content's coordinate in point

          _this._visibleRect = new Rect(0, 0, 0, 0); // Auto full screen disabled by default

          _this._autoFullScreen = false; // The device's pixel ratio (for retina displays)

          _this._devicePixelRatio = 1;

          if (JSB || RUNTIME_BASED) {
            _this._maxPixelRatio = 4;
          } else {
            _this._maxPixelRatio = 2;
          } // Retina disabled by default


          _this._retinaEnabled = false; // Custom callback for resize event

          _this._resizeCallback = null;
          _this._resizing = false;
          _this._resizeWithBrowserSize = false;
          _this._orientationChanging = true;
          _this._isRotated = false;
          _this._orientation = legacyCC.macro.ORIENTATION_AUTO;
          _this._isAdjustViewport = true; // Setup system default resolution policies

          _this._rpExactFit = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
          _this._rpShowAll = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.SHOW_ALL);
          _this._rpNoBorder = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
          _this._rpFixedHeight = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
          _this._rpFixedWidth = new ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
          _this._resolutionPolicy = _this._rpShowAll;
          legacyCC.game.once(legacyCC.Game.EVENT_ENGINE_INITED, _this.init, _assertThisInitialized(_this));
          return _this;
        }

        var _proto2 = View.prototype;

        _proto2.init = function init() {
          __BrowserGetter.init();

          this._initFrameSize();

          var w = legacyCC.game.canvas.width;
          var h = legacyCC.game.canvas.height;
          this._designResolutionSize.width = w;
          this._designResolutionSize.height = h;
          this._originalDesignResolutionSize.width = w;
          this._originalDesignResolutionSize.height = h;
          this._viewportRect.width = w;
          this._viewportRect.height = h;
          this._visibleRect.width = w;
          this._visibleRect.height = h;
          legacyCC.winSize.width = this._visibleRect.width;
          legacyCC.winSize.height = this._visibleRect.height;

          if (legacyCC.visibleRect) {
            legacyCC.visibleRect.init(this._visibleRect);
          }
        }
        /**
         * @en
         * Sets whether resize canvas automatically when browser's size changed.<br/>
         * Useful only on web.
         * @zh 设置当发现浏览器的尺寸改变时，是否自动调整 canvas 尺寸大小。
         * 仅在 Web 模式下有效。
         * @param enabled - Whether enable automatic resize with browser's resize event
         */
        ;

        _proto2.resizeWithBrowserSize = function resizeWithBrowserSize(enabled) {
          if (enabled) {
            // enable
            if (!this._resizeWithBrowserSize) {
              this._resizeWithBrowserSize = true;
              system.onViewResize(this._resizeEvent);
              system.onOrientationChange(this._orientationChange);
            }
          } else if (this._resizeWithBrowserSize) {
            // disable
            this._resizeWithBrowserSize = false;
            system.offViewResize(this._resizeEvent);
            system.offOrientationChange(this._orientationChange);
          }
        }
        /**
         * @en
         * Sets the callback function for `view`'s resize action,<br/>
         * this callback will be invoked before applying resolution policy, <br/>
         * so you can do any additional modifications within the callback.<br/>
         * Useful only on web.
         * @zh 设置 `view` 调整视窗尺寸行为的回调函数，
         * 这个回调函数会在应用适配模式之前被调用，
         * 因此你可以在这个回调函数内添加任意附加改变，
         * 仅在 Web 平台下有效。
         * @param callback - The callback function
         */
        ;

        _proto2.setResizeCallback = function setResizeCallback(callback) {
          if (typeof callback === 'function' || callback == null) {
            this._resizeCallback = callback;
          }
        }
        /**
         * @en
         * Sets the orientation of the game, it can be landscape, portrait or auto.
         * When set it to landscape or portrait, and screen w/h ratio doesn't fit,
         * `view` will automatically rotate the game canvas using CSS.
         * Note that this function doesn't have any effect in native,
         * in native, you need to set the application orientation in native project settings
         * @zh 设置游戏屏幕朝向，它能够是横版，竖版或自动。
         * 当设置为横版或竖版，并且屏幕的宽高比例不匹配时，
         * `view` 会自动用 CSS 旋转游戏场景的 canvas，
         * 这个方法不会对 native 部分产生任何影响，对于 native 而言，你需要在应用设置中的设置排版。
         * @param orientation - Possible values: macro.ORIENTATION_LANDSCAPE | macro.ORIENTATION_PORTRAIT | macro.ORIENTATION_AUTO
         */
        ;

        _proto2.setOrientation = function setOrientation(orientation) {
          orientation &= legacyCC.macro.ORIENTATION_AUTO;

          if (orientation && this._orientation !== orientation) {
            this._orientation = orientation;
          }
        }
        /**
         * @en
         * Sets whether the engine modify the "viewport" meta in your web page.<br/>
         * It's enabled by default, we strongly suggest you not to disable it.<br/>
         * And even when it's enabled, you can still set your own "viewport" meta, it won't be overridden<br/>
         * Only useful on web
         * @zh 设置引擎是否调整 viewport meta 来配合屏幕适配。
         * 默认设置为启动，我们强烈建议你不要将它设置为关闭。
         * 即使当它启动时，你仍然能够设置你的 viewport meta，它不会被覆盖。
         * 仅在 Web 模式下有效
         * @param enabled - Enable automatic modification to "viewport" meta
         */
        ;

        _proto2.adjustViewportMeta = function adjustViewportMeta(enabled) {
          this._isAdjustViewport = enabled;
        }
        /**
         * @en
         * Retina support is enabled by default for Apple device but disabled for other devices,<br/>
         * it takes effect only when you called setDesignResolutionPolicy<br/>
         * Only useful on web
         * @zh 对于 Apple 这种支持 Retina 显示的设备上默认进行优化而其他类型设备默认不进行优化，
         * 它仅会在你调用 setDesignResolutionPolicy 方法时有影响。
         * 仅在 Web 模式下有效。
         * @param enabled - Enable or disable retina display
         */
        ;

        _proto2.enableRetina = function enableRetina(enabled) {
          this._retinaEnabled = !!enabled;
        }
        /**
         * @en
         * Check whether retina display is enabled.<br/>
         * Only useful on web
         * @zh 检查是否对 Retina 显示设备进行优化。
         * 仅在 Web 模式下有效。
         */
        ;

        _proto2.isRetinaEnabled = function isRetinaEnabled() {
          return this._retinaEnabled;
        }
        /**
         * @en
         * If enabled, the application will try automatically to enter full screen mode on mobile devices<br/>
         * You can pass true as parameter to enable it and disable it by passing false.<br/>
         * Only useful on web
         * @zh 启动时，移动端游戏会在移动端自动尝试进入全屏模式。
         * 你能够传入 true 为参数去启动它，用 false 参数来关闭它。
         * @param enabled - Enable or disable auto full screen on mobile devices
         */
        ;

        _proto2.enableAutoFullScreen = function enableAutoFullScreen(enabled) {
          if (enabled && enabled !== this._autoFullScreen && legacyCC.sys.isMobile && system.browserType !== BrowserType.WECHAT) {
            // Automatically full screen when user touches on mobile version
            this._autoFullScreen = true;
            legacyCC.screen.autoFullScreen(legacyCC.game.frame);
          } else {
            this._autoFullScreen = false;
          }
        }
        /**
         * @en
         * Check whether auto full screen is enabled.<br/>
         * Only useful on web
         * @zh 检查自动进入全屏模式是否启动。
         * 仅在 Web 模式下有效。
         * @return Auto full screen enabled or not
         */
        ;

        _proto2.isAutoFullScreenEnabled = function isAutoFullScreenEnabled() {
          return this._autoFullScreen;
        }
        /*
         * Not support on native.<br/>
         * On web, it sets the size of the canvas.
         * @zh 这个方法并不支持 native 平台，在 Web 平台下，可以用来设置 canvas 尺寸。
         * @private
         * @param {Number} width
         * @param {Number} height
         */
        ;

        _proto2.setCanvasSize = function setCanvasSize(width, height) {
          var canvas = legacyCC.game.canvas;
          var container = legacyCC.game.container;
          this._devicePixelRatio = window.devicePixelRatio;
          canvas.width = sys.windowPixelResolution.width;
          canvas.height = sys.windowPixelResolution.height; // canvas.width = width;
          // canvas.height = height;

          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          container.style.width = width + "px";
          container.style.height = height + "px";

          this._resizeEvent();
        }
        /**
         * @en
         * Returns the canvas size of the view.<br/>
         * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
         * On web, it returns the size of the canvas element.
         * @zh 返回视图中 canvas 的尺寸。
         * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
         * 在 Web 平台下，它返回 canvas 元素尺寸。
         */
        ;

        _proto2.getCanvasSize = function getCanvasSize() {
          return new Size(legacyCC.game.canvas.width, legacyCC.game.canvas.height);
        }
        /**
         * @en
         * Returns the frame size of the view.<br/>
         * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
         * On web, it returns the size of the canvas's outer DOM element.
         * @zh 返回视图中边框尺寸。
         * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
         * 在 web 平台下，它返回 canvas 元素的外层 DOM 元素尺寸。
         */
        ;

        _proto2.getFrameSize = function getFrameSize() {
          return new Size(this._frameSize.width, this._frameSize.height);
        }
        /**
         * @en On native, it sets the frame size of view.<br/>
         * On web, it sets the size of the canvas's outer DOM element.
         * @zh 在 native 平台下，设置视图框架尺寸。
         * 在 web 平台下，设置 canvas 外层 DOM 元素尺寸。
         * @param {Number} width
         * @param {Number} height
         */
        ;

        _proto2.setFrameSize = function setFrameSize(width, height) {
          this._frameSize.width = width;
          this._frameSize.height = height;
          legacyCC.game.frame.style.width = width + "px";
          legacyCC.game.frame.style.height = height + "px";

          this._resizeEvent();
        }
        /**
         * @en Returns the visible area size of the view port.
         * @zh 返回视图窗口可见区域尺寸。
         */
        ;

        _proto2.getVisibleSize = function getVisibleSize() {
          return new Size(this._visibleRect.width, this._visibleRect.height);
        }
        /**
         * @en Returns the visible area size of the view port.
         * @zh 返回视图窗口可见区域像素尺寸。
         */
        ;

        _proto2.getVisibleSizeInPixel = function getVisibleSizeInPixel() {
          return new Size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
        }
        /**
         * @en Returns the visible origin of the view port.
         * @zh 返回视图窗口可见区域原点。
         */
        ;

        _proto2.getVisibleOrigin = function getVisibleOrigin() {
          return new Vec2(this._visibleRect.x, this._visibleRect.y);
        }
        /**
         * @en Returns the visible origin of the view port.
         * @zh 返回视图窗口可见区域像素原点。
         */
        ;

        _proto2.getVisibleOriginInPixel = function getVisibleOriginInPixel() {
          return new Vec2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
        }
        /**
         * @en Returns the current resolution policy
         * @zh 返回当前分辨率方案
         * @see {{ResolutionPolicy}}
         */
        ;

        _proto2.getResolutionPolicy = function getResolutionPolicy() {
          return this._resolutionPolicy;
        }
        /**
         * @en Sets the current resolution policy
         * @zh 设置当前分辨率模式
         * @see {{ResolutionPolicy}}
         */
        ;

        _proto2.setResolutionPolicy = function setResolutionPolicy(resolutionPolicy) {
          if (resolutionPolicy instanceof ResolutionPolicy) {
            this._resolutionPolicy = resolutionPolicy;
          } else {
            // Ensure compatibility with JSB
            var _locPolicy = ResolutionPolicy;

            if (resolutionPolicy === _locPolicy.EXACT_FIT) {
              this._resolutionPolicy = this._rpExactFit;
            }

            if (resolutionPolicy === _locPolicy.SHOW_ALL) {
              this._resolutionPolicy = this._rpShowAll;
            }

            if (resolutionPolicy === _locPolicy.NO_BORDER) {
              this._resolutionPolicy = this._rpNoBorder;
            }

            if (resolutionPolicy === _locPolicy.FIXED_HEIGHT) {
              this._resolutionPolicy = this._rpFixedHeight;
            }

            if (resolutionPolicy === _locPolicy.FIXED_WIDTH) {
              this._resolutionPolicy = this._rpFixedWidth;
            }
          }
        }
        /**
         * @en Sets the resolution policy with designed view size in points.<br/>
         * The resolution policy include: <br/>
         * [1] ResolutionExactFit       Fill screen by stretch-to-fit: if the design resolution ratio of width to height is different from the screen resolution ratio, your game view will be stretched.<br/>
         * [2] ResolutionNoBorder       Full screen without black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two areas of your game view will be cut.<br/>
         * [3] ResolutionShowAll        Full screen with black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two black borders will be shown.<br/>
         * [4] ResolutionFixedHeight    Scale the content's height to screen's height and proportionally scale its width<br/>
         * [5] ResolutionFixedWidth     Scale the content's width to screen's width and proportionally scale its height<br/>
         * [ResolutionPolicy]        [Web only feature] Custom resolution policy, constructed by ResolutionPolicy<br/>
         * @zh 通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配。
         * @param width Design resolution width.
         * @param height Design resolution height.
         * @param resolutionPolicy The resolution policy desired
         */
        ;

        _proto2.setDesignResolutionSize = function setDesignResolutionSize(width, height, resolutionPolicy) {
          // Defensive code
          if (!(width > 0 && height > 0)) {
            errorID(2200);
            return;
          }

          this.setResolutionPolicy(resolutionPolicy);
          var policy = this._resolutionPolicy;

          if (policy) {
            policy.preApply(this);
          } // Reinit frame size


          if (legacyCC.sys.isMobile) {
            this._adjustViewportMeta();
          } // Permit to re-detect the orientation of device.


          this._orientationChanging = true; // If resizing, then frame size is already initialized, this logic should be improved

          if (!this._resizing) {
            this._initFrameSize();
          }

          if (!policy) {
            logID(2201);
            return;
          }

          this._originalDesignResolutionSize.width = this._designResolutionSize.width = width;
          this._originalDesignResolutionSize.height = this._designResolutionSize.height = height;
          var result = policy.apply(this, this._designResolutionSize);

          if (result.scale && result.scale.length === 2) {
            this._scaleX = result.scale[0];
            this._scaleY = result.scale[1];
          }

          if (result.viewport) {
            var vp = this._viewportRect;
            var vb = this._visibleRect;
            var rv = result.viewport;
            vp.x = rv.x;
            vp.y = rv.y;
            vp.width = rv.width;
            vp.height = rv.height;
            vb.x = 0;
            vb.y = 0;
            vb.width = rv.width / this._scaleX;
            vb.height = rv.height / this._scaleY;
          }

          policy.postApply(this);
          legacyCC.winSize.width = this._visibleRect.width;
          legacyCC.winSize.height = this._visibleRect.height;

          if (visibleRect) {
            visibleRect.init(this._visibleRect);
          }

          this.emit('design-resolution-changed');
        }
        /**
         * @en Returns the designed size for the view.
         * Default resolution size is the same as 'getFrameSize'.
         * @zh 返回视图的设计分辨率。
         * 默认下分辨率尺寸同 `getFrameSize` 方法相同
         */
        ;

        _proto2.getDesignResolutionSize = function getDesignResolutionSize() {
          return new Size(this._designResolutionSize.width, this._designResolutionSize.height);
        }
        /**
         * @en Sets the container to desired pixel resolution and fit the game content to it.
         * This function is very useful for adaptation in mobile browsers.
         * In some HD android devices, the resolution is very high, but its browser performance may not be very good.
         * In this case, enabling retina display is very costy and not suggested, and if retina is disabled, the image may be blurry.
         * But this API can be helpful to set a desired pixel resolution which is in between.
         * This API will do the following:
         *     1. Set viewport's width to the desired width in pixel
         *     2. Set body width to the exact pixel resolution
         *     3. The resolution policy will be reset with designed view size in points.
         * @zh 设置容器（container）需要的像素分辨率并且适配相应分辨率的游戏内容。
         * @param width Design resolution width.
         * @param height Design resolution height.
         * @param resolutionPolicy The resolution policy desired
         */
        ;

        _proto2.setRealPixelResolution = function setRealPixelResolution(width, height, resolutionPolicy) {
          if (!JSB && !RUNTIME_BASED && !MINIGAME) {
            // Set viewport's width
            this._setViewportMeta({
              width: width
            }, true); // Set body width to the exact pixel resolution


            document.documentElement.style.width = width + "px";
            document.body.style.width = width + "px";
            document.body.style.left = '0px';
            document.body.style.top = '0px';
          } // Reset the resolution size and policy


          this.setDesignResolutionSize(width, height, resolutionPolicy);
        }
        /**
         * @en Returns the view port rectangle.
         * @zh 返回视窗剪裁区域。
         */
        ;

        _proto2.getViewportRect = function getViewportRect() {
          return this._viewportRect;
        }
        /**
         * @en Returns scale factor of the horizontal direction (X axis).
         * @zh 返回横轴的缩放比，这个缩放比是将画布像素分辨率放到设计分辨率的比例。
         */
        ;

        _proto2.getScaleX = function getScaleX() {
          return this._scaleX;
        }
        /**
         * @en Returns scale factor of the vertical direction (Y axis).
         * @zh 返回纵轴的缩放比，这个缩放比是将画布像素分辨率缩放到设计分辨率的比例。
         */
        ;

        _proto2.getScaleY = function getScaleY() {
          return this._scaleY;
        }
        /**
         * @en Returns device pixel ratio for retina display.
         * @zh 返回设备或浏览器像素比例。
         */
        ;

        _proto2.getDevicePixelRatio = function getDevicePixelRatio() {
          return this._devicePixelRatio;
        }
        /**
         * @en Returns the real location in view for a translation based on a related position
         * @zh 将屏幕坐标转换为游戏视图下的坐标。
         * @param tx - The X axis translation
         * @param ty - The Y axis translation
         * @param relatedPos - The related position object including "left", "top", "width", "height" informations
         * @param out - The out object to save the conversion result
         */
        ;

        _proto2.convertToLocationInView = function convertToLocationInView(tx, ty, relatedPos, out) {
          var result = out || new Vec2();
          var x = this._devicePixelRatio * (tx - relatedPos.left);
          var y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);

          if (this._isRotated) {
            result.x = legacyCC.game.canvas.width - y;
            result.y = x;
          } else {
            result.x = x;
            result.y = y;
          }

          if (legacyCC.GAME_VIEW) {
            result.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
            result.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
          }

          return result;
        } // _convertMouseToLocationInView (in_out_point, relatedPos) {
        //     var viewport = this._viewportRect, _t = this;
        //     in_out_point.x = ((_t._devicePixelRatio * (in_out_point.x - relatedPos.left)) - viewport.x) / _t._scaleX;
        //     in_out_point.y = (_t._devicePixelRatio * (relatedPos.top + relatedPos.height - in_out_point.y) - viewport.y) / _t._scaleY;
        // }
        ;

        _proto2._convertPointWithScale = function _convertPointWithScale(point) {
          var viewport = this._viewportRect;
          point.x = (point.x - viewport.x) / this._scaleX;
          point.y = (point.y - viewport.y) / this._scaleY;
        } // Resize helper functions
        ;

        _proto2._resizeEvent = function _resizeEvent() {
          var _view = legacyCC.view; // Check frame size changed or not

          var prevFrameW = _view._frameSize.width;
          var prevFrameH = _view._frameSize.height;
          var prevRotated = _view._isRotated;

          if (legacyCC.sys.isMobile) {
            var containerStyle = legacyCC.game.container.style;
            var margin = containerStyle.margin;
            containerStyle.margin = '0';
            containerStyle.display = 'none';

            _view._initFrameSize();

            containerStyle.margin = margin;
            containerStyle.display = 'block';
          } else {
            _view._initFrameSize();
          }

          if (!JSB && !RUNTIME_BASED && !_view._orientationChanging && _view._isRotated === prevRotated && _view._frameSize.width === prevFrameW && _view._frameSize.height === prevFrameH) {
            return;
          } // Frame size changed, do resize works


          var width = _view._originalDesignResolutionSize.width;
          var height = _view._originalDesignResolutionSize.height;
          _view._resizing = true;

          if (width > 0) {
            _view.setDesignResolutionSize(width, height, _view._resolutionPolicy);
          }

          _view._resizing = false;

          _view.emit('canvas-resize');

          if (_view._resizeCallback) {
            _view._resizeCallback.call();
          }
        };

        _proto2._orientationChange = function _orientationChange() {
          legacyCC.view._orientationChanging = true;

          legacyCC.view._resizeEvent();
        };

        _proto2._initFrameSize = function _initFrameSize() {
          var locFrameSize = this._frameSize;

          var w = __BrowserGetter.availWidth(legacyCC.game.frame);

          var h = __BrowserGetter.availHeight(legacyCC.game.frame);

          var isLandscape = w >= h;

          if (EDITOR || !legacyCC.sys.isMobile || isLandscape && this._orientation & legacyCC.macro.ORIENTATION_LANDSCAPE || !isLandscape && this._orientation & legacyCC.macro.ORIENTATION_PORTRAIT) {
            locFrameSize.width = w;
            locFrameSize.height = h;
            legacyCC.game.container.style['-webkit-transform'] = 'rotate(0deg)';
            legacyCC.game.container.style.transform = 'rotate(0deg)';
            this._isRotated = false;
          } else {
            locFrameSize.width = h;
            locFrameSize.height = w;
            legacyCC.game.container.style['-webkit-transform'] = 'rotate(90deg)';
            legacyCC.game.container.style.transform = 'rotate(90deg)';
            legacyCC.game.container.style['-webkit-transform-origin'] = '0px 0px 0px';
            legacyCC.game.container.style.transformOrigin = '0px 0px 0px';
            this._isRotated = true; // Fix for issue: https://github.com/cocos-creator/fireball/issues/8365
            // Reference: https://www.douban.com/note/343402554/
            // For Chrome, z-index not working after container transform rotate 90deg.
            // Because 'transform' style adds canvas (the top-element of container) to a new stack context.
            // That causes the DOM Input was hidden under canvas.
            // This should be done after container rotated, instead of in style-mobile.css.

            legacyCC.game.canvas.style['-webkit-transform'] = 'translateZ(0px)';
            legacyCC.game.canvas.style.transform = 'translateZ(0px)';
          }

          if (this._orientationChanging) {
            setTimeout(function () {
              legacyCC.view._orientationChanging = false;
            }, 1000);
          }
        } // hack
        ;

        _proto2._adjustSizeKeepCanvasSize = function _adjustSizeKeepCanvasSize() {
          var designWidth = this._originalDesignResolutionSize.width;
          var designHeight = this._originalDesignResolutionSize.height;

          if (designWidth > 0) {
            this.setDesignResolutionSize(designWidth, designHeight, this._resolutionPolicy);
          }
        };

        _proto2._setViewportMeta = function _setViewportMeta(metas, overwrite) {
          var vp = document.getElementById('cocosMetaElement');

          if (vp && overwrite) {
            document.head.removeChild(vp);
          }

          var elems = document.getElementsByName('viewport');
          var currentVP = elems ? elems[0] : null;
          var content;
          var key;
          var pattern;
          content = currentVP ? currentVP.content : '';
          vp = vp || document.createElement('meta');
          vp.id = 'cocosMetaElement';
          vp.name = 'viewport';
          vp.content = '';

          for (key in metas) {
            if (content.indexOf(key) === -1) {
              content += "," + key + "=" + metas[key];
            } else if (overwrite) {
              // eslint-disable-next-line no-useless-escape
              pattern = new RegExp(key + "s*=s*[^,]+");
              content = content.replace(pattern, key + "=" + metas[key]);
            }
          }

          if (/^,/.test(content)) {
            content = content.substr(1);
          }

          vp.content = content; // For adopting certain android devices which don't support second viewport

          if (currentVP) {
            currentVP.content = content;
          }

          document.head.appendChild(vp);
        };

        _proto2._adjustViewportMeta = function _adjustViewportMeta() {
          if (this._isAdjustViewport && !JSB && !RUNTIME_BASED && !MINIGAME) {
            this._setViewportMeta(__BrowserGetter.meta, false);

            this._isAdjustViewport = false;
          }
        };

        _proto2._convertMouseToLocation = function _convertMouseToLocation(in_out_point, relatedPos) {
          in_out_point.x = this._devicePixelRatio * (in_out_point.x - relatedPos.left);
          in_out_point.y = this._devicePixelRatio * (relatedPos.top + relatedPos.height - in_out_point.y);

          if (legacyCC.GAME_VIEW) {
            in_out_point.x /= legacyCC.gameView.canvas.width / legacyCC.game.canvas.width;
            in_out_point.y /= legacyCC.gameView.canvas.height / legacyCC.game.canvas.height;
          }
        };

        _proto2._convertTouchWidthScale = function _convertTouchWidthScale(selTouch) {
          var viewport = this._viewportRect;
          var scaleX = this._scaleX;
          var scaleY = this._scaleY;
          selTouch._point.x = (selTouch._point.x - viewport.x) / scaleX;
          selTouch._point.y = (selTouch._point.y - viewport.y) / scaleY;
          selTouch._prevPoint.x = (selTouch._prevPoint.x - viewport.x) / scaleX;
          selTouch._prevPoint.y = (selTouch._prevPoint.y - viewport.y) / scaleY;
        };

        _proto2._convertTouchesWithScale = function _convertTouchesWithScale(touches) {
          var viewport = this._viewportRect;
          var scaleX = this._scaleX;
          var scaleY = this._scaleY;
          var selPoint;
          var selPrePoint;

          for (var i = 0; i < touches.length; i++) {
            var selTouch = touches[i];
            selPoint = selTouch._point;
            selPrePoint = selTouch._prevPoint;
            selPoint.x = (selPoint.x - viewport.x) / scaleX;
            selPoint.y = (selPoint.y - viewport.y) / scaleY;
            selPrePoint.x = (selPrePoint.x - viewport.x) / scaleX;
            selPrePoint.y = (selPrePoint.y - viewport.y) / scaleY;
          }
        };

        return View;
      }(EventTarget));
      /**
       * !en
       * Emit when design resolution changed.
       * !zh
       * 当设计分辨率改变时发送。
       * @event design-resolution-changed
       */


      View.instance = void 0;

      /**
       * ContainerStrategy class is the root strategy class of container's scale strategy,
       * it controls the behavior of how to scale the cc.game.container and cc.game.canvas object
       */
      ContainerStrategy = /*#__PURE__*/function () {
        function ContainerStrategy() {
          this.name = 'ContainerStrategy';
        }

        var _proto3 = ContainerStrategy.prototype;

        /**
         * @en Manipulation before appling the strategy
         * @zh 在应用策略之前的操作
         * @param view - The target view
         */
        _proto3.preApply = function preApply(_view) {}
        /**
         * @en Function to apply this strategy
         * @zh 策略应用方法
         * @param view
         * @param designedResolution
         */
        ;

        _proto3.apply = function apply(_view, designedResolution) {}
        /**
         * @en
         * Manipulation after applying the strategy
         * @zh 策略调用之后的操作
         * @param view  The target view
         */
        ;

        _proto3.postApply = function postApply(_view) {};

        _proto3._setupContainer = function _setupContainer(_view, w, h) {
          var locCanvas = legacyCC.game.canvas;
          var locContainer = legacyCC.game.container;

          if (system.os === OS.ANDROID) {
            document.body.style.width = (_view._isRotated ? h : w) + "px";
            document.body.style.height = (_view._isRotated ? w : h) + "px";
          } // Setup style


          locContainer.style.width = locCanvas.style.width = w + "px";
          locContainer.style.height = locCanvas.style.height = h + "px"; // Setup pixel ratio for retina display

          _view._devicePixelRatio = 1;

          if (_view.isRetinaEnabled()) {
            _view._devicePixelRatio = Math.min(_view._maxPixelRatio, window.devicePixelRatio || 1);
          } // Setup canvas


          if (JSB) {
            locCanvas.width = sys.windowPixelResolution.width;
            locCanvas.height = sys.windowPixelResolution.height;
          } else {
            locCanvas.width = w * _view._devicePixelRatio;
            locCanvas.height = h * _view._devicePixelRatio;
          }
        };

        _proto3._fixContainer = function _fixContainer() {
          // Add container to document body
          document.body.insertBefore(legacyCC.game.container, document.body.firstChild); // Set body's width height to window's size, and forbid overflow, so that game will be centered

          var bs = document.body.style;
          bs.width = window.innerWidth + "px";
          bs.height = window.innerHeight + "px";
          bs.overflow = 'hidden'; // Body size solution doesn't work on all mobile browser so this is the aleternative: fixed container

          var contStyle = legacyCC.game.container.style;
          contStyle.position = 'fixed';
          contStyle.left = contStyle.top = '0px'; // Reposition body

          document.body.scrollTop = 0;
        };

        return ContainerStrategy;
      }();
      /**
       * @en
       * Emit when canvas resize.
       * @zh
       * 当画布大小改变时发送。
       * @event canvas-resize
       */

      /**
       * ContentStrategy class is the root strategy class of content's scale strategy,
       * it controls the behavior of how to scale the scene and setup the viewport for the game
       *
       * @class ContentStrategy
       */


      ContainerStrategy.EQUAL_TO_FRAME = void 0;
      ContainerStrategy.PROPORTION_TO_FRAME = void 0;

      ContentStrategy = /*#__PURE__*/function () {
        function ContentStrategy() {
          this.name = 'ContentStrategy';
          this._result = void 0;
          this._result = {
            scale: [1, 1],
            viewport: null
          };
        }
        /**
         * @en Manipulation before applying the strategy
         * @zh 策略应用前的操作
         * @param view - The target view
         */


        var _proto4 = ContentStrategy.prototype;

        _proto4.preApply = function preApply(_view) {}
        /**
         * @en Function to apply this strategy
         * The return value is {scale: [scaleX, scaleY], viewport: {new Rect}},
         * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
         * @zh 调用策略方法
         * @return The result scale and viewport rect
         */
        ;

        _proto4.apply = function apply(_view, designedResolution) {
          return {
            scale: [1, 1]
          };
        }
        /**
         * @en Manipulation after applying the strategy
         * @zh 策略调用之后的操作
         * @param view - The target view
         */
        ;

        _proto4.postApply = function postApply(_view) {};

        _proto4._buildResult = function _buildResult(containerW, containerH, contentW, contentH, scaleX, scaleY) {
          // Makes content fit better the canvas
          if (Math.abs(containerW - contentW) < 2) {
            contentW = containerW;
          }

          if (Math.abs(containerH - contentH) < 2) {
            contentH = containerH;
          }

          var viewport = new Rect(Math.round((containerW - contentW) / 2), Math.round((containerH - contentH) / 2), contentW, contentH);
          this._result.scale = [scaleX, scaleY];
          this._result.viewport = viewport;
          return this._result;
        };

        return ContentStrategy;
      }();

      ContentStrategy.EXACT_FIT = void 0;
      ContentStrategy.SHOW_ALL = void 0;
      ContentStrategy.NO_BORDER = void 0;
      ContentStrategy.FIXED_HEIGHT = void 0;
      ContentStrategy.FIXED_WIDTH = void 0;

      (function () {
        // Container scale strategys

        /**
         * @class EqualToFrame
         * @extends ContainerStrategy
         */
        var EqualToFrame = /*#__PURE__*/function (_ContainerStrategy) {
          _inheritsLoose(EqualToFrame, _ContainerStrategy);

          function EqualToFrame() {
            var _this2;

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this2 = _ContainerStrategy.call.apply(_ContainerStrategy, [this].concat(args)) || this;
            _this2.name = 'EqualToFrame';
            return _this2;
          }

          var _proto5 = EqualToFrame.prototype;

          _proto5.apply = function apply(_view) {
            var frameH = _view._frameSize.height;
            var containerStyle = legacyCC.game.container.style;

            this._setupContainer(_view, _view._frameSize.width, _view._frameSize.height); // Setup container's margin and padding


            if (_view._isRotated) {
              containerStyle.margin = "0 0 0 " + frameH + "px";
            } else {
              containerStyle.margin = '0px';
            }

            containerStyle.padding = '0px';
          };

          return EqualToFrame;
        }(ContainerStrategy);
        /**
         * @class ProportionalToFrame
         * @extends ContainerStrategy
         */


        var ProportionalToFrame = /*#__PURE__*/function (_ContainerStrategy2) {
          _inheritsLoose(ProportionalToFrame, _ContainerStrategy2);

          function ProportionalToFrame() {
            var _this3;

            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            _this3 = _ContainerStrategy2.call.apply(_ContainerStrategy2, [this].concat(args)) || this;
            _this3.name = 'ProportionalToFrame';
            return _this3;
          }

          var _proto6 = ProportionalToFrame.prototype;

          _proto6.apply = function apply(_view, designedResolution) {
            var frameW = _view._frameSize.width;
            var frameH = _view._frameSize.height;
            var containerStyle = legacyCC.game.container.style;
            var designW = designedResolution.width;
            var designH = designedResolution.height;
            var scaleX = frameW / designW;
            var scaleY = frameH / designH;
            var containerW;
            var containerH;

            if (scaleX < scaleY) {
              containerW = frameW;
              containerH = designH * scaleX;
            } else {
              containerW = designW * scaleY;
              containerH = frameH;
            } // Adjust container size with integer value


            var offx = Math.round((frameW - containerW) / 2);
            var offy = Math.round((frameH - containerH) / 2);
            containerW = frameW - 2 * offx;
            containerH = frameH - 2 * offy;

            this._setupContainer(_view, containerW, containerH);

            if (!EDITOR) {
              // Setup container's margin and padding
              if (_view._isRotated) {
                containerStyle.margin = "0 0 0 " + frameH + "px";
              } else {
                containerStyle.margin = '0px';
              }

              containerStyle.paddingLeft = offx + "px";
              containerStyle.paddingRight = offx + "px";
              containerStyle.paddingTop = offy + "px";
              containerStyle.paddingBottom = offy + "px";
            }
          };

          return ProportionalToFrame;
        }(ContainerStrategy); // need to adapt prototype before instantiating


        var _global = typeof window === 'undefined' ? global : window;

        var globalAdapter = _global.__globalAdapter;

        if (globalAdapter) {
          if (globalAdapter.adaptContainerStrategy) {
            globalAdapter.adaptContainerStrategy(ContainerStrategy.prototype);
          }

          if (globalAdapter.adaptView) {
            globalAdapter.adaptView(View.prototype);
          }
        } // Alias: Strategy that makes the container's size equals to the frame's size


        ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame(); // Alias: Strategy that scale proportionally the container's size to frame's size

        ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame(); // Content scale strategys

        var ExactFit = /*#__PURE__*/function (_ContentStrategy) {
          _inheritsLoose(ExactFit, _ContentStrategy);

          function ExactFit() {
            var _this4;

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            _this4 = _ContentStrategy.call.apply(_ContentStrategy, [this].concat(args)) || this;
            _this4.name = 'ExactFit';
            return _this4;
          }

          var _proto7 = ExactFit.prototype;

          _proto7.apply = function apply(_view, designedResolution) {
            var containerW = legacyCC.game.canvas.width;
            var containerH = legacyCC.game.canvas.height;
            var scaleX = containerW / designedResolution.width;
            var scaleY = containerH / designedResolution.height;
            return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY);
          };

          return ExactFit;
        }(ContentStrategy);

        var ShowAll = /*#__PURE__*/function (_ContentStrategy2) {
          _inheritsLoose(ShowAll, _ContentStrategy2);

          function ShowAll() {
            var _this5;

            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            _this5 = _ContentStrategy2.call.apply(_ContentStrategy2, [this].concat(args)) || this;
            _this5.name = 'ShowAll';
            return _this5;
          }

          var _proto8 = ShowAll.prototype;

          _proto8.apply = function apply(_view, designedResolution) {
            var containerW = legacyCC.game.canvas.width;
            var containerH = legacyCC.game.canvas.height;
            var designW = designedResolution.width;
            var designH = designedResolution.height;
            var scaleX = containerW / designW;
            var scaleY = containerH / designH;
            var scale = 0;
            var contentW;
            var contentH;

            if (scaleX < scaleY) {
              scale = scaleX;
              contentW = containerW;
              contentH = designH * scale;
            } else {
              scale = scaleY;
              contentW = designW * scale;
              contentH = containerH;
            }

            return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
          };

          return ShowAll;
        }(ContentStrategy);

        var NoBorder = /*#__PURE__*/function (_ContentStrategy3) {
          _inheritsLoose(NoBorder, _ContentStrategy3);

          function NoBorder() {
            var _this6;

            for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            _this6 = _ContentStrategy3.call.apply(_ContentStrategy3, [this].concat(args)) || this;
            _this6.name = 'NoBorder';
            return _this6;
          }

          var _proto9 = NoBorder.prototype;

          _proto9.apply = function apply(_view, designedResolution) {
            var containerW = legacyCC.game.canvas.width;
            var containerH = legacyCC.game.canvas.height;
            var designW = designedResolution.width;
            var designH = designedResolution.height;
            var scaleX = containerW / designW;
            var scaleY = containerH / designH;
            var scale;
            var contentW;
            var contentH;

            if (scaleX < scaleY) {
              scale = scaleY;
              contentW = designW * scale;
              contentH = containerH;
            } else {
              scale = scaleX;
              contentW = containerW;
              contentH = designH * scale;
            }

            return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
          };

          return NoBorder;
        }(ContentStrategy);

        var FixedHeight = /*#__PURE__*/function (_ContentStrategy4) {
          _inheritsLoose(FixedHeight, _ContentStrategy4);

          function FixedHeight() {
            var _this7;

            for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            _this7 = _ContentStrategy4.call.apply(_ContentStrategy4, [this].concat(args)) || this;
            _this7.name = 'FixedHeight';
            return _this7;
          }

          var _proto10 = FixedHeight.prototype;

          _proto10.apply = function apply(_view, designedResolution) {
            var containerW = legacyCC.game.canvas.width;
            var containerH = legacyCC.game.canvas.height;
            var designH = designedResolution.height;
            var scale = containerH / designH;
            var contentW = containerW;
            var contentH = containerH;
            return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
          };

          return FixedHeight;
        }(ContentStrategy);

        var FixedWidth = /*#__PURE__*/function (_ContentStrategy5) {
          _inheritsLoose(FixedWidth, _ContentStrategy5);

          function FixedWidth() {
            var _this8;

            for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }

            _this8 = _ContentStrategy5.call.apply(_ContentStrategy5, [this].concat(args)) || this;
            _this8.name = 'FixedWidth';
            return _this8;
          }

          var _proto11 = FixedWidth.prototype;

          _proto11.apply = function apply(_view, designedResolution) {
            var containerW = legacyCC.game.canvas.width;
            var containerH = legacyCC.game.canvas.height;
            var designW = designedResolution.width;
            var scale = containerW / designW;
            var contentW = containerW;
            var contentH = containerH;
            return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
          };

          return FixedWidth;
        }(ContentStrategy); // Alias: Strategy to scale the content's size to container's size, non proportional


        ContentStrategy.EXACT_FIT = new ExactFit(); // Alias: Strategy to scale the content's size proportionally to maximum size and keeps the whole content area to be visible

        ContentStrategy.SHOW_ALL = new ShowAll(); // Alias: Strategy to scale the content's size proportionally to fill the whole container area

        ContentStrategy.NO_BORDER = new NoBorder(); // Alias: Strategy to scale the content's height to container's height and proportionally scale its width

        ContentStrategy.FIXED_HEIGHT = new FixedHeight(); // Alias: Strategy to scale the content's width to container's width and proportionally scale its height

        ContentStrategy.FIXED_WIDTH = new FixedWidth();
      })();
      /**
       * ResolutionPolicy class is the root strategy class of scale strategy,
       * its main task is to maintain the compatibility with Cocos2d-x</p>
       */


      _export("ResolutionPolicy", ResolutionPolicy = /*#__PURE__*/function () {
        /**
         * The entire application is visible in the specified area without trying to preserve the original aspect ratio.<br/>
         * Distortion can occur, and the application may appear stretched or compressed.
         */

        /**
         * The entire application fills the specified area, without distortion but possibly with some cropping,<br/>
         * while maintaining the original aspect ratio of the application.
         */

        /**
         * The entire application is visible in the specified area without distortion while maintaining the original<br/>
         * aspect ratio of the application. Borders can appear on two sides of the application.
         */

        /**
         * The application takes the height of the design resolution size and modifies the width of the internal<br/>
         * canvas so that it fits the aspect ratio of the device<br/>
         * no distortion will occur however you must make sure your application works on different<br/>
         * aspect ratios
         */

        /**
         * The application takes the width of the design resolution size and modifies the height of the internal<br/>
         * canvas so that it fits the aspect ratio of the device<br/>
         * no distortion will occur however you must make sure your application works on different<br/>
         * aspect ratios
         */

        /**
         * Unknown policy
         */

        /**
         * Constructor of ResolutionPolicy
         * @param containerStg
         * @param contentStg
         */
        function ResolutionPolicy(containerStg, contentStg) {
          this.name = 'ResolutionPolicy';
          this._containerStrategy = void 0;
          this._contentStrategy = void 0;
          this._containerStrategy = null;
          this._contentStrategy = null;
          this.setContainerStrategy(containerStg);
          this.setContentStrategy(contentStg);
        }

        var _proto12 = ResolutionPolicy.prototype;

        /**
         * @en Manipulation before applying the resolution policy
         * @zh 策略应用前的操作
         * @param _view The target view
         */
        _proto12.preApply = function preApply(_view) {
          this._containerStrategy.preApply(_view);

          this._contentStrategy.preApply(_view);
        }
        /**
         * @en Function to apply this resolution policy
         * The return value is {scale: [scaleX, scaleY], viewport: {new Rect}},
         * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
         * @zh 调用策略方法
         * @param _view - The target view
         * @param designedResolution - The user defined design resolution
         * @return An object contains the scale X/Y values and the viewport rect
         */
        ;

        _proto12.apply = function apply(_view, designedResolution) {
          this._containerStrategy.apply(_view, designedResolution);

          return this._contentStrategy.apply(_view, designedResolution);
        }
        /**
         * @en Manipulation after appyling the strategy
         * @zh 策略应用之后的操作
         * @param _view - The target view
         */
        ;

        _proto12.postApply = function postApply(_view) {
          this._containerStrategy.postApply(_view);

          this._contentStrategy.postApply(_view);
        }
        /**
         * @en Setup the container's scale strategy
         * @zh 设置容器的适配策略
         * @param containerStg The container strategy
         */
        ;

        _proto12.setContainerStrategy = function setContainerStrategy(containerStg) {
          if (containerStg instanceof ContainerStrategy) {
            this._containerStrategy = containerStg;
          }
        }
        /**
         * @en Setup the content's scale strategy
         * @zh 设置内容的适配策略
         * @param contentStg The content strategy
         */
        ;

        _proto12.setContentStrategy = function setContentStrategy(contentStg) {
          if (contentStg instanceof ContentStrategy) {
            this._contentStrategy = contentStg;
          }
        };

        _createClass(ResolutionPolicy, [{
          key: "canvasSize",
          get: function get() {
            return new Vec2(legacyCC.game.canvas.width, legacyCC.game.canvas.height);
          }
        }]);

        return ResolutionPolicy;
      }());

      ResolutionPolicy.EXACT_FIT = 0;
      ResolutionPolicy.NO_BORDER = 1;
      ResolutionPolicy.SHOW_ALL = 2;
      ResolutionPolicy.FIXED_HEIGHT = 3;
      ResolutionPolicy.FIXED_WIDTH = 4;
      ResolutionPolicy.UNKNOWN = 5;
      ResolutionPolicy.ContainerStrategy = ContainerStrategy;
      ResolutionPolicy.ContentStrategy = ContentStrategy;
      legacyCC.ResolutionPolicy = ResolutionPolicy;
      /**
       * @en view is the singleton view object.
       * @zh view 是全局的视图单例对象。
       */

      _export("view", view = View.instance = legacyCC.view = new View());
      /**
       * @en winSize is the alias object for the size of the current game window.
       * @zh winSize 为当前的游戏窗口的大小。
       */


      legacyCC.winSize = new Size();
    }
  };
});