System.register("q-bundled:///fs/cocos/web-view/web-view.js", ["../core/data/decorators/index.js", "../../../virtual/internal%253Aconstants.js", "../2d/framework/index.js", "../core/components/index.js", "./web-view-impl-manager.js", "./web-view-enums.js", "../core/global-exports.js"], function (_export, _context) {
  "use strict";

  var ccclass, help, executeInEditMode, menu, tooltip, type, displayOrder, serializable, requireComponent, EDITOR, UITransform, Component, ComponentEventHandler, WebViewImplManager, EventType, legacyCC, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp, WebView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      help = _coreDataDecoratorsIndexJs.help;
      executeInEditMode = _coreDataDecoratorsIndexJs.executeInEditMode;
      menu = _coreDataDecoratorsIndexJs.menu;
      tooltip = _coreDataDecoratorsIndexJs.tooltip;
      type = _coreDataDecoratorsIndexJs.type;
      displayOrder = _coreDataDecoratorsIndexJs.displayOrder;
      serializable = _coreDataDecoratorsIndexJs.serializable;
      requireComponent = _coreDataDecoratorsIndexJs.requireComponent;
    }, function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_coreComponentsIndexJs) {
      Component = _coreComponentsIndexJs.Component;
      ComponentEventHandler = _coreComponentsIndexJs.EventHandler;
    }, function (_webViewImplManagerJs) {
      WebViewImplManager = _webViewImplManagerJs.WebViewImplManager;
    }, function (_webViewEnumsJs) {
      EventType = _webViewEnumsJs.EventType;
    }, function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }],
    execute: function () {
      /**
       * @en
       * WebView is a component for display web pages in the game.
       * Because different platforms have different authorization,
       * API and control methods for WebView component.
       * And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
       * @zh
       * WebView 组件，用于在游戏中显示网页。
       * 由于不同平台对于 WebView 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
       */
      _export("WebView", WebView = (_dec = ccclass('cc.WebView'), _dec2 = help('i18n:cc.WebView'), _dec3 = menu('Miscellaneous/WebView'), _dec4 = requireComponent(UITransform), _dec5 = tooltip('i18n:webview.url'), _dec6 = type([ComponentEventHandler]), _dec7 = displayOrder(20), _dec8 = tooltip('i18n:webview.webviewEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(WebView, _Component);

        function WebView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_url", _descriptor, _assertThisInitialized(_this));

          _this._impl = null;

          _initializerDefineProperty(_this, "webviewEvents", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = WebView.prototype;

        /**
         * @en
         * Set javascript interface scheme (see also setOnJSCallback). <br>
         * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br>
         * Please refer to the official documentation for more details.
         * @zh
         * 设置 JavaScript 接口方案（与 'setOnJSCallback' 配套使用）。<br>
         * 注意：只支持 Android 和 iOS ，Web 端用法请前往官方文档查看。<br>
         * 详情请参阅官方文档
         * @method setJavascriptInterfaceScheme
         * @param {String} scheme
         */
        _proto.setJavascriptInterfaceScheme = function setJavascriptInterfaceScheme(scheme) {
          if (this._impl) {
            this._impl.setJavascriptInterfaceScheme(scheme);
          }
        }
        /**
         * @en
         * This callback called when load URL that start with javascript
         * interface scheme (see also setJavascriptInterfaceScheme). <br>
         * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation. <br>
         * Please refer to the official documentation for more details.
         * @zh
         * 当加载 URL 以 JavaScript 接口方案开始时调用这个回调函数。<br>
         * 注意：只支持 Android 和 iOS，Web 端用法请前往官方文档查看。
         * 详情请参阅官方文档
         * @method setOnJSCallback
         * @param {Function} callback
         */
        ;

        _proto.setOnJSCallback = function setOnJSCallback(callback) {
          if (this._impl) {
            this._impl.setOnJSCallback(callback);
          }
        }
        /**
         * @en
         * Evaluates JavaScript in the context of the currently displayed page. <br>
         * Please refer to the official document for more details <br>
         * Note: Cross domain issues need to be resolved by yourself <br>
         * @zh
         * 执行 WebView 内部页面脚本（详情请参阅官方文档） <br>
         * 注意：需要自行解决跨域问题
         * @method evaluateJS
         * @param {String} str
         */
        ;

        _proto.evaluateJS = function evaluateJS(str) {
          if (this._impl) {
            this._impl.evaluateJS(str);
          }
        };

        _proto.__preload = function __preload() {
          if (EDITOR) {
            return;
          }

          this._impl = WebViewImplManager.getImpl(this); // must be register the event listener

          this._impl.componentEventList.set(EventType.LOADING, this.onLoading.bind(this));

          this._impl.componentEventList.set(EventType.LOADED, this.onLoaded.bind(this));

          this._impl.componentEventList.set(EventType.ERROR, this.onError.bind(this));

          this._impl.loadURL(this._url);
        };

        _proto.onLoading = function onLoading() {
          ComponentEventHandler.emitEvents(this.webviewEvents, this, EventType.LOADING);
          this.node.emit(EventType.LOADING, this);
        };

        _proto.onLoaded = function onLoaded() {
          ComponentEventHandler.emitEvents(this.webviewEvents, this, EventType.LOADED);
          this.node.emit(EventType.LOADED, this);
        };

        _proto.onError = function onError() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          ComponentEventHandler.emitEvents(this.webviewEvents, this, EventType.ERROR, args);
          this.node.emit(EventType.ERROR, this, args);
        };

        _proto.onEnable = function onEnable() {
          if (this._impl) {
            this._impl.enable();
          }
        };

        _proto.onDisable = function onDisable() {
          if (this._impl) {
            this._impl.disable();
          }
        };

        _proto.onDestroy = function onDestroy() {
          if (this._impl) {
            this._impl.destroy();

            this._impl = null;
          }
        };

        _proto.update = function update(dt) {
          if (this._impl) {
            this._impl.syncMatrix();
          }
        };

        _createClass(WebView, [{
          key: "url",
          get:
          /**
           * @en
           * A given URL to be loaded by the WebView, it should have a http or https prefix.
           * @zh
           * 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
           */
          function get() {
            return this._url;
          },
          set: function set(val) {
            this._url = val;

            if (this._impl) {
              this._impl.loadURL(val);
            }
          }
          /**
           * @en
           * The webview's event callback , it will be triggered when certain webview event occurs.
           * @zh
           * WebView 的回调事件，当网页加载过程中，加载完成后或者加载出错时都会回调此函数
           */

        }, {
          key: "nativeWebView",
          get:
          /**
           * @en
           * Raw webview objects for user customization
           * @zh
           * 原始网页对象，用于用户定制
           */
          function get() {
            return this._impl && this._impl.webview || null;
          }
          /**
           * @en
           * Get current audio state.
           * @zh
           * 获取当前网页视图状态。
           */

        }, {
          key: "state",
          get: function get() {
            if (!this._impl) {
              return EventType.NONE;
            }

            return this._impl.state;
          }
        }]);

        return WebView;
      }(Component), _class3.EventType = EventType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_url", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'https://cocos.com';
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "url", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "webviewEvents", [serializable, _dec6, _dec7, _dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class) || _class) || _class) || _class) || _class)); // TODO Since jsb adapter does not support import cc, put it on internal first and adjust it later.


      legacyCC.internal.WebView = WebView;
    }
  };
});