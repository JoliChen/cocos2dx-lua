System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './renderable-2d-10fe359a.js', './deprecated-6bde9d8e.js'], function (exports) {
  'use strict';
  var _createClass, legacyCC, mat4, _inheritsLoose, contains, error, warn, ccclass, tooltip, type, displayOrder, executeInEditMode, _applyDecoratedDescriptor, help, menu, requireComponent, _initializerDefineProperty, _assertThisInitialized, Component, serializable, director, EventHandler, game, view, UITransform;
  return {
    setters: [function (module) {
      _createClass = module.eu;
      legacyCC = module.l;
      mat4 = module.d4;
      _inheritsLoose = module.et;
      contains = module.gH;
      error = module.e;
      warn = module.w;
      ccclass = module.es;
      tooltip = module.fX;
      type = module.ey;
      displayOrder = module.eE;
      executeInEditMode = module.fZ;
      _applyDecoratedDescriptor = module.ev;
      help = module.f$;
      menu = module.g0;
      requireComponent = module.gD;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      Component = module.eo;
      serializable = module.eI;
    }, function (module) {
      director = module.f;
      EventHandler = module.E;
    }, function () {}, function (module) {
      game = module.g;
      view = module.v;
    }, function () {}, function () {}, function () {}, function (module) {
      UITransform = module.U;
    }, function () {}],
    execute: function () {

      var EventType;

      (function (EventType) {
        EventType["NONE"] = "none";
        EventType["LOADING"] = "loading";
        EventType["LOADED"] = "loaded";
        EventType["ERROR"] = "error";
      })(EventType || (EventType = {}));

      var WebViewImpl = function () {
        function WebViewImpl(component) {
          this._componentEventList = new Map();
          this._state = EventType.NONE;
          this._warpper = void 0;
          this._webview = null;
          this._loaded = false;
          this._forceUpdate = false;
          this._component = null;
          this._uiTrans = null;
          this._node = null;
          this._w = 0;
          this._h = 0;
          this._m00 = 0;
          this._m01 = 0;
          this._m04 = 0;
          this._m05 = 0;
          this._m12 = 0;
          this._m13 = 0;
          this._component = component;
          this._node = component.node;
          this._uiTrans = component.node.getComponent(UITransform);
          this.reset();
          this.createWebView();
        }

        var _proto = WebViewImpl.prototype;

        _proto.reset = function reset() {
          this._warpper = null;
          this._webview = null;
          this._loaded = false;
          this._w = 0;
          this._h = 0;
          this._m00 = 0;
          this._m01 = 0;
          this._m04 = 0;
          this._m05 = 0;
          this._m12 = 0;
          this._m13 = 0;
          this._state = EventType.NONE;
          this._forceUpdate = false;
        };

        _proto.dispatchEvent = function dispatchEvent(key) {
          var callback = this._componentEventList.get(key);

          if (callback) {
            this._state = key;

            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            callback.call(this, args);
          }
        };

        _proto.destroy = function destroy() {
          this.removeWebView();
          this._warpper = null;
          this._webview = null;
          this._loaded = false;
          this._component = null;
          this._uiTrans = null;
          this._forceUpdate = false;

          this._componentEventList.clear();
        };

        _createClass(WebViewImpl, [{
          key: "loaded",
          get: function get() {
            return this._loaded;
          }
        }, {
          key: "componentEventList",
          get: function get() {
            return this._componentEventList;
          }
        }, {
          key: "webview",
          get: function get() {
            return this._webview;
          }
        }, {
          key: "state",
          get: function get() {
            return this._state;
          }
        }, {
          key: "UICamera",
          get: function get() {
            return director.root.batcher2D.getFirstRenderCamera(this._node);
          }
        }]);

        return WebViewImpl;
      }();
      legacyCC.internal.WebViewImpl = WebViewImpl;

      var _mat4_temp = mat4();

      var WebViewImplWeb = function (_WebViewImpl) {
        _inheritsLoose(WebViewImplWeb, _WebViewImpl);

        function WebViewImplWeb(component) {
          return _WebViewImpl.call(this, component) || this;
        }

        var _proto = WebViewImplWeb.prototype;

        _proto._bindDomEvent = function _bindDomEvent() {
          var _this = this;

          if (!this.webview) {
            return;
          }

          var onLoaded = function onLoaded(e) {
            _this._forceUpdate = true;

            _this.dispatchEvent(EventType.LOADED);

            var iframe = e.target;
            var body = iframe.contentDocument && iframe.contentDocument.body;

            if (body && body.innerHTML.includes('404')) {
              _this.dispatchEvent(EventType.ERROR, body.innerHTML);
            }
          };

          this.webview.addEventListener('load', onLoaded);
        };

        _proto.loadURL = function loadURL(url) {
          if (this.webview) {
            this.webview.src = url;
            this.dispatchEvent(EventType.LOADING);
          }
        };

        _proto.createWebView = function createWebView() {
          var warpper = document.createElement('div');
          this._warpper = warpper;
          warpper.id = 'webview-wrapper';
          warpper.style['-webkit-overflow'] = 'auto';
          warpper.style['-webkit-overflow-scrolling'] = 'touch';
          warpper.style.position = 'absolute';
          warpper.style.bottom = '0px';
          warpper.style.left = '0px';
          warpper.style.transformOrigin = '0px 100% 0px';
          warpper.style['-webkit-transform-origin'] = '0px 100% 0px';
          game.container.appendChild(warpper);
          var webview = document.createElement('iframe');
          this._webview = webview;
          webview.id = 'webview';
          webview.style.border = 'none';
          webview.style.width = '100%';
          webview.style.height = '100%';
          warpper.appendChild(webview);

          this._bindDomEvent();
        };

        _proto.removeWebView = function removeWebView() {
          var warpper = this._warpper;

          if (contains(game.container, warpper)) {
            game.container.removeChild(warpper);
          }

          this.reset();
        };

        _proto.enable = function enable() {
          if (this._warpper) {
            this._warpper.style.visibility = 'visible';
          }
        };

        _proto.disable = function disable() {
          if (this._warpper) {
            this._warpper.style.visibility = 'hidden';
          }
        };

        _proto.evaluateJS = function evaluateJS(str) {
          if (this.webview) {
            var win = this.webview.contentWindow;

            if (win) {
              try {
                win.eval(str);
              } catch (e) {
                this.dispatchEvent(EventType.ERROR, e);
                error(e);
              }
            }
          }
        };

        _proto.setOnJSCallback = function setOnJSCallback(callback) {
          warn('The platform does not support');
        };

        _proto.setJavascriptInterfaceScheme = function setJavascriptInterfaceScheme(scheme) {
          warn('The platform does not support');
        };

        _proto.syncMatrix = function syncMatrix() {
          if (!this._warpper || !this._uiTrans || !this._component || this._warpper.style.visibility === 'hidden') return;
          var camera = this.UICamera;

          if (!camera) {
            return;
          }

          this._component.node.getWorldMatrix(_mat4_temp);

          camera.update(true);
          camera.worldMatrixToScreen(_mat4_temp, _mat4_temp, game.canvas.width, game.canvas.height);
          var _this$_uiTrans$conten = this._uiTrans.contentSize,
              width = _this$_uiTrans$conten.width,
              height = _this$_uiTrans$conten.height;

          if (!this._forceUpdate && this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 && this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 && this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 && this._w === width && this._h === height) {
            return;
          }

          this._m00 = _mat4_temp.m00;
          this._m01 = _mat4_temp.m01;
          this._m04 = _mat4_temp.m04;
          this._m05 = _mat4_temp.m05;
          this._m12 = _mat4_temp.m12;
          this._m13 = _mat4_temp.m13;
          this._w = width;
          this._h = height;
          var dpr = view.getDevicePixelRatio();
          var scaleX = 1 / dpr;
          var scaleY = 1 / dpr;
          var container = game.container;
          var sx = _mat4_temp.m00 * scaleX;
          var b = _mat4_temp.m01;
          var c = _mat4_temp.m04;
          var sy = _mat4_temp.m05 * scaleY;
          this._warpper.style.width = width + "px";
          this._warpper.style.height = height + "px";
          var w = this._w * scaleX;
          var h = this._h * scaleY;
          var appx = w * _mat4_temp.m00 * this._uiTrans.anchorX;
          var appy = h * _mat4_temp.m05 * this._uiTrans.anchorY;
          var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
          var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
          var tx = _mat4_temp.m12 * scaleX - appx + offsetX;
          var ty = _mat4_temp.m13 * scaleY - appy + offsetY;
          var matrix = "matrix(" + sx + "," + -b + "," + -c + "," + sy + "," + tx + "," + -ty + ")";
          this._warpper.style.transform = matrix;
          this._warpper.style['-webkit-transform'] = matrix;
          this._forceUpdate = false;
        };

        return WebViewImplWeb;
      }(WebViewImpl);

      var WebViewImplManager = function () {
        function WebViewImplManager() {}

        WebViewImplManager.getImpl = function getImpl(component) {
          return new WebViewImplWeb(component);
        };

        return WebViewImplManager;
      }();
      legacyCC.internal.WebViewImplManager = WebViewImplManager;

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _class3, _temp;
      var WebView = exports('WebView', (_dec = ccclass('cc.WebView'), _dec2 = help('i18n:cc.WebView'), _dec3 = menu('Miscellaneous/WebView'), _dec4 = requireComponent(UITransform), _dec5 = tooltip('i18n:webview.url'), _dec6 = type([EventHandler]), _dec7 = displayOrder(20), _dec8 = tooltip('i18n:webview.webviewEvents'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = _class3 = function (_Component) {
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

        _proto.setJavascriptInterfaceScheme = function setJavascriptInterfaceScheme(scheme) {
          if (this._impl) {
            this._impl.setJavascriptInterfaceScheme(scheme);
          }
        };

        _proto.setOnJSCallback = function setOnJSCallback(callback) {
          if (this._impl) {
            this._impl.setOnJSCallback(callback);
          }
        };

        _proto.evaluateJS = function evaluateJS(str) {
          if (this._impl) {
            this._impl.evaluateJS(str);
          }
        };

        _proto.__preload = function __preload() {

          this._impl = WebViewImplManager.getImpl(this);

          this._impl.componentEventList.set(EventType.LOADING, this.onLoading.bind(this));

          this._impl.componentEventList.set(EventType.LOADED, this.onLoaded.bind(this));

          this._impl.componentEventList.set(EventType.ERROR, this.onError.bind(this));

          this._impl.loadURL(this._url);
        };

        _proto.onLoading = function onLoading() {
          EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADING);
          this.node.emit(EventType.LOADING, this);
        };

        _proto.onLoaded = function onLoaded() {
          EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADED);
          this.node.emit(EventType.LOADED, this);
        };

        _proto.onError = function onError() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          EventHandler.emitEvents(this.webviewEvents, this, EventType.ERROR, args);
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
          get: function get() {
            return this._url;
          },
          set: function set(val) {
            this._url = val;

            if (this._impl) {
              this._impl.loadURL(val);
            }
          }
        }, {
          key: "nativeWebView",
          get: function get() {
            return this._impl && this._impl.webview || null;
          }
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
      })), _class2)) || _class) || _class) || _class) || _class) || _class));
      legacyCC.internal.WebView = WebView;

    }
  };
});
