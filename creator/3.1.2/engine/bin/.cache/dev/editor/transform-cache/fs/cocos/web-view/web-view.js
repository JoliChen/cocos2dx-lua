"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebView = void 0;

var _index = require("../core/data/decorators/index.js");

var _internal253Aconstants = require("../../../virtual/internal%253Aconstants.js");

var _index2 = require("../2d/framework/index.js");

var _index3 = require("../core/components/index.js");

var _webViewImplManager = require("./web-view-impl-manager.js");

var _webViewEnums = require("./web-view-enums.js");

var _globalExports = require("../core/global-exports.js");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
let WebView = (_dec = (0, _index.ccclass)('cc.WebView'), _dec2 = (0, _index.help)('i18n:cc.WebView'), _dec3 = (0, _index.menu)('Miscellaneous/WebView'), _dec4 = (0, _index.requireComponent)(_index2.UITransform), _dec5 = (0, _index.tooltip)('i18n:webview.url'), _dec6 = (0, _index.type)([_index3.EventHandler]), _dec7 = (0, _index.displayOrder)(20), _dec8 = (0, _index.tooltip)('i18n:webview.webviewEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (0, _index.executeInEditMode)(_class = (_class2 = (_temp = _class3 = class WebView extends _index3.Component {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "_url", _descriptor, this);

    this._impl = null;

    _initializerDefineProperty(this, "webviewEvents", _descriptor2, this);
  }

  /**
   * @en
   * A given URL to be loaded by the WebView, it should have a http or https prefix.
   * @zh
   * 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
   */
  get url() {
    return this._url;
  }

  set url(val) {
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


  /**
   * @en
   * Raw webview objects for user customization
   * @zh
   * 原始网页对象，用于用户定制
   */
  get nativeWebView() {
    return this._impl && this._impl.webview || null;
  }
  /**
   * @en
   * Get current audio state.
   * @zh
   * 获取当前网页视图状态。
   */


  get state() {
    if (!this._impl) {
      return _webViewEnums.EventType.NONE;
    }

    return this._impl.state;
  }
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


  setJavascriptInterfaceScheme(scheme) {
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


  setOnJSCallback(callback) {
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


  evaluateJS(str) {
    if (this._impl) {
      this._impl.evaluateJS(str);
    }
  }

  __preload() {
    if (_internal253Aconstants.EDITOR) {
      return;
    }

    this._impl = _webViewImplManager.WebViewImplManager.getImpl(this); // must be register the event listener

    this._impl.componentEventList.set(_webViewEnums.EventType.LOADING, this.onLoading.bind(this));

    this._impl.componentEventList.set(_webViewEnums.EventType.LOADED, this.onLoaded.bind(this));

    this._impl.componentEventList.set(_webViewEnums.EventType.ERROR, this.onError.bind(this));

    this._impl.loadURL(this._url);
  }

  onLoading() {
    _index3.EventHandler.emitEvents(this.webviewEvents, this, _webViewEnums.EventType.LOADING);

    this.node.emit(_webViewEnums.EventType.LOADING, this);
  }

  onLoaded() {
    _index3.EventHandler.emitEvents(this.webviewEvents, this, _webViewEnums.EventType.LOADED);

    this.node.emit(_webViewEnums.EventType.LOADED, this);
  }

  onError(...args) {
    _index3.EventHandler.emitEvents(this.webviewEvents, this, _webViewEnums.EventType.ERROR, args);

    this.node.emit(_webViewEnums.EventType.ERROR, this, args);
  }

  onEnable() {
    if (this._impl) {
      this._impl.enable();
    }
  }

  onDisable() {
    if (this._impl) {
      this._impl.disable();
    }
  }

  onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  }

  update(dt) {
    if (this._impl) {
      this._impl.syncMatrix();
    }
  }

}, _class3.EventType = _webViewEnums.EventType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_url", [_index.serializable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return 'https://cocos.com';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "url", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "url"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "webviewEvents", [_index.serializable, _dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class); // TODO Since jsb adapter does not support import cc, put it on internal first and adjust it later.

exports.WebView = WebView;
_globalExports.legacyCC.internal.WebView = WebView;