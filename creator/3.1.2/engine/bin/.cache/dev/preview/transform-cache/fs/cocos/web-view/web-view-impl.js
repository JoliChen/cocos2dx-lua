System.register("q-bundled:///fs/cocos/web-view/web-view-impl.js", ["../core/global-exports.js", "./web-view-enums.js", "../2d/framework/index.js", "../core/director.js"], function (_export, _context) {
  "use strict";

  var legacyCC, EventType, UITransform, director, WebViewImpl;

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [function (_coreGlobalExportsJs) {
      legacyCC = _coreGlobalExportsJs.legacyCC;
    }, function (_webViewEnumsJs) {
      EventType = _webViewEnumsJs.EventType;
    }, function (_dFrameworkIndexJs) {
      UITransform = _dFrameworkIndexJs.UITransform;
    }, function (_coreDirectorJs) {
      director = _coreDirectorJs.director;
    }],
    execute: function () {
      _export("WebViewImpl", WebViewImpl = /*#__PURE__*/function () {
        // Fix iframe display problem in ios.
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
      }());

      legacyCC.internal.WebViewImpl = WebViewImpl;
    }
  };
});