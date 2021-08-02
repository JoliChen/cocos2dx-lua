System.register("q-bundled:///fs/pal/system/web/system.js", ["../../../../virtual/internal%253Aconstants.js", "../../../cocos/core/math/index.js", "../../../cocos/core/event/event-target.js", "../enum-type/index.js"], function (_export, _context) {
  "use strict";

  var DEBUG, EDITOR, TEST, Size, EventTarget, BrowserType, NetworkType, OS, Platform, AppEvent, Language, System, system;
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      DEBUG = _virtualInternal253AconstantsJs.DEBUG;
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_cocosCoreMathIndexJs) {
      Size = _cocosCoreMathIndexJs.Size;
    }, function (_cocosCoreEventEventTargetJs) {
      EventTarget = _cocosCoreEventEventTargetJs.EventTarget;
    }, function (_enumTypeIndexJs) {
      BrowserType = _enumTypeIndexJs.BrowserType;
      NetworkType = _enumTypeIndexJs.NetworkType;
      OS = _enumTypeIndexJs.OS;
      Platform = _enumTypeIndexJs.Platform;
      AppEvent = _enumTypeIndexJs.AppEvent;
      Language = _enumTypeIndexJs.Language;
    }],
    execute: function () {
      System = /*#__PURE__*/function () {
        function System() {
          var _nav$getBattery,
              _this = this;

          this.networkType = void 0;
          this.isNative = void 0;
          this.isBrowser = void 0;
          this.isMobile = void 0;
          this.isLittleEndian = void 0;
          this.platform = void 0;
          this.language = void 0;
          this.nativeLanguage = void 0;
          this.os = void 0;
          this.osVersion = void 0;
          this.osMainVersion = void 0;
          this.browserType = void 0;
          this.browserVersion = void 0;
          this.pixelRatio = void 0;
          this.supportCapability = void 0;
          this._eventTarget = new EventTarget();
          this._html = void 0;
          this._battery = void 0;
          var nav = window.navigator;
          var ua = nav.userAgent.toLowerCase();
          this._html = document.getElementsByTagName('html')[0]; // @ts-expect-error getBattery is not totally supported

          (_nav$getBattery = nav.getBattery) === null || _nav$getBattery === void 0 ? void 0 : _nav$getBattery.call(nav).then(function (battery) {
            _this._battery = battery;
          });
          this.networkType = NetworkType.LAN; // TODO

          this.isNative = false;
          this.isBrowser = true; // init isMobile and platform

          if (EDITOR) {
            this.isMobile = false;
            this.platform = Platform.EDITOR_PAGE; // TODO
          } else {
            this.isMobile = /mobile|android|iphone|ipad/.test(ua);
            this.platform = this.isMobile ? Platform.MOBILE_BROWSER : Platform.DESKTOP_BROWSER;
          } // init isLittleEndian


          this.isLittleEndian = function () {
            var buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

            return new Int16Array(buffer)[0] === 256;
          }(); // init languageCode and language


          var currLanguage = nav.language;
          this.nativeLanguage = currLanguage.toLowerCase();
          currLanguage = currLanguage || nav.browserLanguage;
          currLanguage = currLanguage ? currLanguage.split('-')[0] : Language.ENGLISH;
          this.language = currLanguage; // init os, osVersion and osMainVersion

          var isAndroid = false;
          var iOS = false;
          var osVersion = '';
          var osMajorVersion = 0;
          var uaResult = /android\s*(\d+(?:\.\d+)*)/i.exec(ua) || /android\s*(\d+(?:\.\d+)*)/i.exec(nav.platform);

          if (uaResult) {
            isAndroid = true;
            osVersion = uaResult[1] || '';
            osMajorVersion = parseInt(osVersion) || 0;
          }

          uaResult = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(ua);

          if (uaResult) {
            iOS = true;
            osVersion = uaResult[2] || '';
            osMajorVersion = parseInt(osVersion) || 0; // refer to https://github.com/cocos-creator/engine/pull/5542 , thanks for contribition from @krapnikkk
            // ipad OS 13 safari identifies itself as "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)"
            // so use maxTouchPoints to check whether it's desktop safari or not.
            // reference: https://stackoverflow.com/questions/58019463/how-to-detect-device-name-in-safari-on-ios-13-while-it-doesnt-show-the-correct
            // FIXME: should remove it when touch-enabled mac are available
            // TODO: due to compatibility issues, it is still determined to be ios, and a new operating system type ipados may be added later？
          } else if (/(iPhone|iPad|iPod)/.exec(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints && nav.maxTouchPoints > 1) {
            iOS = true;
            osVersion = '';
            osMajorVersion = 0;
          }

          var osName = OS.UNKNOWN;

          if (nav.appVersion.indexOf('Win') !== -1) {
            osName = OS.WINDOWS;
          } else if (iOS) {
            osName = OS.IOS;
          } else if (nav.appVersion.indexOf('Mac') !== -1) {
            osName = OS.OSX;
          } else if (nav.appVersion.indexOf('X11') !== -1 && nav.appVersion.indexOf('Linux') === -1) {
            osName = OS.LINUX;
          } else if (isAndroid) {
            osName = OS.ANDROID;
          } else if (nav.appVersion.indexOf('Linux') !== -1 || ua.indexOf('ubuntu') !== -1) {
            osName = OS.LINUX;
          }

          this.os = osName;
          this.osVersion = osVersion;
          this.osMainVersion = osMajorVersion; // TODO: use dack-type to determine the browserType
          // init browserType and browserVersion

          this.browserType = BrowserType.UNKNOWN;
          var typeReg0 = /wechat|weixin|micromessenger/i;
          var typeReg1 = /mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|ucbs|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i;
          var typeReg2 = /qq|qqbrowser|ucbrowser|ubrowser|edge|HuaweiBrowser/i;
          var typeReg3 = /chrome|safari|firefox|trident|opera|opr\/|oupeng/i;
          var browserTypes = typeReg0.exec(ua) || typeReg1.exec(ua) || typeReg2.exec(ua) || typeReg3.exec(ua);
          var browserType = browserTypes ? browserTypes[0].toLowerCase() : OS.UNKNOWN;

          if (browserType === 'safari' && isAndroid) {
            browserType = BrowserType.ANDROID;
          } else if (browserType === 'qq' && /android.*applewebkit/i.test(ua)) {
            browserType = BrowserType.ANDROID;
          }

          var typeMap = {
            micromessenger: BrowserType.WECHAT,
            wechat: BrowserType.WECHAT,
            weixin: BrowserType.WECHAT,
            trident: BrowserType.IE,
            edge: BrowserType.EDGE,
            '360 aphone': BrowserType.BROWSER_360,
            mxbrowser: BrowserType.MAXTHON,
            'opr/': BrowserType.OPERA,
            ubrowser: BrowserType.UC,
            huaweibrowser: BrowserType.HUAWEI
          };
          this.browserType = typeMap[browserType] || browserType; // init browserVersion

          this.browserVersion = '';
          var versionReg1 = /(mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|uc|ucbs|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui(?:.hybrid)?)(mobile)?(browser)?\/?([\d.]+)/i;
          var versionReg2 = /(qq|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i;
          var tmp = versionReg1.exec(ua);

          if (!tmp) {
            tmp = versionReg2.exec(ua);
          }

          this.browserVersion = tmp ? tmp[4] : '';
          this.pixelRatio = window.devicePixelRatio || 1; // init capability

          var _tmpCanvas1 = document.createElement('canvas');

          var supportCanvas = TEST ? false : !!_tmpCanvas1.getContext('2d');
          var supportWebGL = false;

          if (TEST) {
            supportWebGL = false;
          } else if (window.WebGLRenderingContext) {
            supportWebGL = true;
          }

          var supportWebp;

          try {
            supportWebp = TEST ? false : _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');
          } catch (e) {
            supportWebp = false;
          }

          var supportImageBitmap = false;

          if (!TEST && typeof createImageBitmap !== 'undefined' && typeof Blob !== 'undefined') {
            _tmpCanvas1.width = _tmpCanvas1.height = 2;
            createImageBitmap(_tmpCanvas1, {}).then(function (imageBitmap) {
              supportImageBitmap = true;
              imageBitmap === null || imageBitmap === void 0 ? void 0 : imageBitmap.close();
            })["catch"](function (err) {});
          }

          this.supportCapability = {
            webp: supportWebp,
            gl: supportWebGL,
            canvas: supportCanvas,
            imageBitmap: supportImageBitmap
          };

          this._registerEvent();
        }

        var _proto = System.prototype;

        _proto._registerEvent = function _registerEvent() {
          var _this2 = this;

          window.addEventListener('resize', function () {
            _this2._eventTarget.emit(AppEvent.RESIZE);
          });
          window.addEventListener('orientationchange', function () {
            _this2._eventTarget.emit(AppEvent.ORIENTATION_CHANGE);
          });

          this._registerVisibilityEvent();
        };

        _proto._registerVisibilityEvent = function _registerVisibilityEvent() {
          var _this3 = this;

          var hiddenPropName;

          if (typeof document.hidden !== 'undefined') {
            hiddenPropName = 'hidden';
          } else if (typeof document.mozHidden !== 'undefined') {
            hiddenPropName = 'mozHidden';
          } else if (typeof document.msHidden !== 'undefined') {
            hiddenPropName = 'msHidden';
          } else if (typeof document.webkitHidden !== 'undefined') {
            hiddenPropName = 'webkitHidden';
          } else {
            hiddenPropName = 'hidden';
          }

          var hidden = false;

          var onHidden = function onHidden() {
            if (!hidden) {
              hidden = true;

              _this3._eventTarget.emit(AppEvent.HIDE);
            }
          }; // In order to adapt the most of platforms the onshow API.


          var onShown = function onShown(arg0, arg1, arg2, arg3, arg4) {
            if (hidden) {
              hidden = false;

              _this3._eventTarget.emit(AppEvent.SHOW, arg0, arg1, arg2, arg3, arg4);
            }
          };

          if (hiddenPropName) {
            var changeList = ['visibilitychange', 'mozvisibilitychange', 'msvisibilitychange', 'webkitvisibilitychange', 'qbrowserVisibilityChange'];

            for (var i = 0; i < changeList.length; i++) {
              document.addEventListener(changeList[i], function (event) {
                var visible = document[hiddenPropName]; // @ts-expect-error QQ App need hidden property

                visible = visible || event.hidden;

                if (visible) {
                  onHidden();
                } else {
                  onShown();
                }
              });
            }
          } else {
            window.addEventListener('blur', onHidden);
            window.addEventListener('focus', onShown);
          }

          if (window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
            window.onfocus = onShown;
          }

          if ('onpageshow' in window && 'onpagehide' in window) {
            window.addEventListener('pagehide', onHidden);
            window.addEventListener('pageshow', onShown); // Taobao UIWebKit

            document.addEventListener('pagehide', onHidden);
            document.addEventListener('pageshow', onShown);
          }
        };

        _proto.getViewSize = function getViewSize() {
          var element = document.getElementById('GameDiv');

          if (this.isMobile || !element || element === this._html) {
            return new Size(window.innerWidth, window.innerHeight);
          } else {
            return new Size(element.clientWidth, element.clientHeight);
          }
        };

        _proto.getOrientation = function getOrientation() {
          throw new Error('TODO');
        };

        _proto.getSafeAreaEdge = function getSafeAreaEdge() {
          return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          };
        };

        _proto.getBatteryLevel = function getBatteryLevel() {
          if (this._battery) {
            return this._battery.level;
          } else {
            if (DEBUG) {
              console.warn('getBatteryLevel is not supported');
            }

            return 1;
          }
        };

        _proto.triggerGC = function triggerGC() {
          if (DEBUG) {
            console.warn('triggerGC is not supported.');
          }
        };

        _proto.openURL = function openURL(url) {
          window.open(url);
        };

        _proto.now = function now() {
          if (Date.now) {
            return Date.now();
          }

          return +new Date();
        };

        _proto.restartJSVM = function restartJSVM() {
          if (DEBUG) {
            console.warn('restartJSVM is not supported.');
          }
        };

        _proto.onHide = function onHide(cb) {
          this._eventTarget.on(AppEvent.HIDE, cb);
        };

        _proto.onShow = function onShow(cb) {
          this._eventTarget.on(AppEvent.SHOW, cb);
        };

        _proto.onViewResize = function onViewResize(cb) {
          this._eventTarget.on(AppEvent.RESIZE, cb);
        };

        _proto.onOrientationChange = function onOrientationChange(cb) {
          this._eventTarget.on(AppEvent.ORIENTATION_CHANGE, cb);
        };

        _proto.offHide = function offHide(cb) {
          this._eventTarget.off(AppEvent.HIDE, cb);
        };

        _proto.offShow = function offShow(cb) {
          this._eventTarget.off(AppEvent.SHOW, cb);
        };

        _proto.offViewResize = function offViewResize(cb) {
          this._eventTarget.off(AppEvent.RESIZE, cb);
        };

        _proto.offOrientationChange = function offOrientationChange(cb) {
          this._eventTarget.off(AppEvent.ORIENTATION_CHANGE, cb);
        };

        return System;
      }();

      _export("system", system = new System());
    }
  };
});