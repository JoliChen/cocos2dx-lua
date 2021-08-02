System.register("q-bundled:///fs/cocos/web-view/web-view-impl-web.js", ["./web-view-enums.js", "../core/platform/index.js", "./web-view-impl.js", "../core/index.js", "../core/math/index.js", "../core/utils/misc.js"], function (_export, _context) {
  "use strict";

  var EventType, error, warn, view, WebViewImpl, game, mat4, contains, _mat4_temp, WebViewImplWeb;

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  return {
    setters: [function (_webViewEnumsJs) {
      EventType = _webViewEnumsJs.EventType;
    }, function (_corePlatformIndexJs) {
      error = _corePlatformIndexJs.error;
      warn = _corePlatformIndexJs.warn;
      view = _corePlatformIndexJs.view;
    }, function (_webViewImplJs) {
      WebViewImpl = _webViewImplJs.WebViewImpl;
    }, function (_coreIndexJs) {
      game = _coreIndexJs.game;
    }, function (_coreMathIndexJs) {
      mat4 = _coreMathIndexJs.mat4;
    }, function (_coreUtilsMiscJs) {
      contains = _coreUtilsMiscJs.contains;
    }],
    execute: function () {
      _mat4_temp = mat4();

      _export("WebViewImplWeb", WebViewImplWeb = /*#__PURE__*/function (_WebViewImpl) {
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
            this.webview.src = url; // emit loading event

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
          } // update matrix cache


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
      }(WebViewImpl));
    }
  };
});