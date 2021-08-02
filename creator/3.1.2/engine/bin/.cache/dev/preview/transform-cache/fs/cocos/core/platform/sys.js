System.register("q-bundled:///fs/cocos/core/platform/sys.js", ["../../../pal/system/web/system.js", "../global-exports.js", "../math/rect.js", "./debug.js", "../../../pal/system/enum-type/index.js", "../math/index.js"], function (_export, _context) {
  "use strict";

  var system, legacyCC, Rect, warnID, log, NetworkType, Language, OS, Platform, BrowserType, Vec2, viewSize, pixelRatio, sys;
  return {
    setters: [function (_palSystemWebSystemJs) {
      system = _palSystemWebSystemJs.system;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }, function (_mathRectJs) {
      Rect = _mathRectJs.Rect;
    }, function (_debugJs) {
      warnID = _debugJs.warnID;
      log = _debugJs.log;
    }, function (_palSystemEnumTypeIndexJs) {
      NetworkType = _palSystemEnumTypeIndexJs.NetworkType;
      Language = _palSystemEnumTypeIndexJs.Language;
      OS = _palSystemEnumTypeIndexJs.OS;
      Platform = _palSystemEnumTypeIndexJs.Platform;
      BrowserType = _palSystemEnumTypeIndexJs.BrowserType;
    }, function (_mathIndexJs) {
      Vec2 = _mathIndexJs.Vec2;
    }],
    execute: function () {
      /*
       Copyright (c) 2013-2016 Chukong Technologies Inc.
       Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
      */

      /**
       * @packageDocumentation
       * @module core
       */
      viewSize = system.getViewSize();
      pixelRatio = system.pixelRatio;
      /**
       * @en A set of system related variables
       * @zh 一系列系统相关环境变量
       * @main
       */

      _export("sys", sys = {
        /**
         * @en
         * Network type enumeration
         * @zh
         * 网络类型枚举
         */
        NetworkType: NetworkType,

        /**
         * @en
         * LanguageCode type enumeration
         * @zh
         * 语言码类型枚举
         */
        Language: Language,

        /**
         * @en
         * OS type enumeration
         * @zh
         * 操作系统类型枚举
         */
        OS: OS,

        /**
         * @en
         * Platform type enumeration
         * @zh
         * 平台类型枚举
         */
        Platform: Platform,

        /**
         * @en
         * Browser type enumeration
         * @zh
         * 浏览器类型枚举
         */
        BrowserType: BrowserType,

        /**
         * @en Whether the running platform is native app
         * @zh 指示运行平台是否是原生平台
         */
        isNative: system.isNative,

        /**
         * @en Whether the running platform is browser
         * @zh 指示运行平台是否是浏览器
         */
        isBrowser: system.isBrowser,

        /**
         * @en Indicate whether the current running context is a mobile system
         * @zh 指示当前运行平台是否是移动端平台
         */
        isMobile: system.isMobile,

        /**
         * @en Whether the endianness of current platform is little endian
         * @zh 当前平台字节顺序是否是小端序
         */
        isLittleEndian: system.isLittleEndian,

        /**
         * @en The running platform
         * @zh 当前运行平台或环境
         */
        platform: system.platform,

        /**
         * @en Indicate the current language of the running system
         * @zh 指示当前运行环境的语言
         */
        language: system.language,

        /**
         * @en
         * Get current language iso 639-1 code.
         * Examples of valid language codes include "zh-tw", "en", "en-us", "fr", "fr-fr", "es-es", etc.
         * The actual value totally depends on results provided by destination platform.
         * @zh
         * 指示当前运行环境的语言
         * 获取当前的语言iso 639-1代码。
         * 有效的语言代码包括 "zh-tw"、"en"、"en-us"、"fr"、"fr-fr"、"es-es "等。
         * 实际值完全取决于目的地平台提供的结果。
         */
        languageCode: system.nativeLanguage,

        /**
         * @en Indicate the running os name
         * @zh 指示当前运行系统
         */
        os: system.os,

        /**
         * @en Indicate the running os version string
         * @zh 指示当前运行系统版本字符串
         */
        osVersion: system.osVersion,

        /**
         * @en Indicate the running os main version
         * @zh 指示当前系统主版本
         */
        osMainVersion: system.osMainVersion,

        /**
         * @en Indicate the running browser type
         * @zh 指示当前运行的浏览器类型
         */
        browserType: system.browserType,

        /**
         * @en Indicate the running browser version
         * @zh 指示当前运行的浏览器版本
         */
        browserVersion: system.browserVersion,

        /**
         * @en Indicate the real pixel resolution of the whole game window
         * @zh 指示游戏窗口的像素分辨率
         */
        windowPixelResolution: {
          width: viewSize.width * pixelRatio,
          height: viewSize.height * pixelRatio
        },

        /**
         * @en The capabilities of the current platform
         * @zh 当前平台的功能可用性
         */
        capabilities: {
          canvas: system.supportCapability.canvas,
          opengl: system.supportCapability.gl,
          webp: system.supportCapability.webp,
          imageBitmap: system.supportCapability.imageBitmap,
          // TODO: move into pal/input
          touches: false,
          mouse: false,
          keyboard: false,
          accelerometer: false
        },

        /**
         * @en It is a local storage component based on HTML5 localStorage API, on web platform, it's equal to window.localStorage
         * @zh HTML5 标准中的 localStorage 的本地存储功能，在 Web 端等价于 window.localStorage
         */
        localStorage: null,

        /**
         * @en Get the network type of current device, return `sys.NetworkType.LAN` if failure.
         * @zh 获取当前设备的网络类型, 如果网络类型无法获取，默认将返回 `sys.NetworkType.LAN`
         */
        getNetworkType: function getNetworkType() {
          return system.networkType;
        },

        /**
         * @en Get the battery level of current device, return 1.0 if failure.
         * @zh 获取当前设备的电池电量，如果电量无法获取，默认将返回 1
         * @return - 0.0 ~ 1.0
         */
        getBatteryLevel: function getBatteryLevel() {
          return system.getBatteryLevel();
        },

        /**
         * @en Forces the garbage collection, only available in native platforms
         * @zh 强制进行 JS 内存垃圾回收，尽在原生平台有效
         */
        garbageCollect: function garbageCollect() {
          system.triggerGC();
        },

        /**
         * @en Check whether an object is valid,
         * In web engine, it will return true if the object exist
         * In native engine, it will return true if the JS object and the correspond native object are both valid
         * @zh 检查一个对象是否非空或在原生平台有效，
         * 在 Web 平台，只要对象非空或非 Undefined 就会返回 true，在原生平台，我们会检查当前 JS 对象和其绑定的原生对象是否都有效
         * @param obj The object to be checked
         */
        isObjectValid: function isObjectValid(obj) {
          if (obj === null || obj === undefined) {
            return false;
          }

          return true;
        },

        /**
         * @en Dump system informations
         * @zh 在控制台打印当前的主要系统信息
         */
        dump: function dump() {
          var str = '';
          str += "isMobile : " + this.isMobile + "\r\n";
          str += "language : " + this.language + "\r\n";
          str += "browserType : " + this.browserType + "\r\n";
          str += "browserVersion : " + this.browserVersion + "\r\n";
          str += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
          str += "os : " + this.os + "\r\n";
          str += "osVersion : " + this.osVersion + "\r\n";
          str += "platform : " + this.platform + "\r\n";
          str += "Using " + (legacyCC.game.renderType === legacyCC.game.RENDER_TYPE_WEBGL ? 'WEBGL' : 'CANVAS') + " renderer.\r\n";
          log(str);
        },

        /**
         * @en Try to open a url in browser, may not work in some platforms
         * @zh 尝试打开一个 web 页面，并非在所有平台都有效
         */
        openURL: function openURL(url) {
          system.openURL(url);
        },

        /**
         * @en Get the current time in milliseconds
         * @zh 获取当前时间（毫秒为单位）
         */
        now: function now() {
          return system.now();
        },

        /**
         * Restart the JS VM, only available in native platforms
         * @private
         */
        restartVM: function restartVM() {
          system.restartJSVM();
        },

        /**
         * @en
         * Returns the safe area of the screen (in design resolution) based on the game view coordinate system.
         * If the screen is not notched, this method returns a Rect of the same size as visibleSize by default.
         * Currently supports Android, iOS and WeChat, ByteDance Mini Game platform.
         * @zh
         * 返回基于游戏视图坐标系的手机屏幕安全区域（设计分辨率为单位），如果不是异形屏将默认返回一个和 visibleSize 一样大的 Rect。目前支持安卓、iOS 原生平台和微信、字节小游戏平台。
         * @method getSafeAreaRect
         * @return {Rect}
         */
        getSafeAreaRect: function getSafeAreaRect() {
          var locView = legacyCC.view;
          var edge = system.getSafeAreaEdge();
          var viewSize = system.getViewSize(); // Get leftBottom and rightTop point in screen coordinates system.

          var leftBottom = new Vec2(edge.left, viewSize.height - edge.bottom);
          var rightTop = new Vec2(viewSize.width - edge.right, edge.top); // Convert to the location in game view coordinates system.

          var relatedPos = {
            left: 0,
            top: 0,
            width: viewSize.width,
            height: viewSize.height
          };
          locView.convertToLocationInView(leftBottom.x, leftBottom.y, relatedPos, leftBottom);
          locView.convertToLocationInView(rightTop.x, rightTop.y, relatedPos, rightTop); // Convert view point to design resolution size

          locView._convertPointWithScale(leftBottom);

          locView._convertPointWithScale(rightTop);

          var x = leftBottom.x;
          var y = leftBottom.y;
          var width = rightTop.x - leftBottom.x;
          var height = rightTop.y - leftBottom.y;
          return new Rect(x, y, width, height);
        },
        __init: function __init() {
          try {
            var localStorage = sys.localStorage = window.localStorage;
            localStorage.setItem('storage', '');
            localStorage.removeItem('storage');
            localStorage = null;
          } catch (e) {
            var warn = function warn() {
              warnID(5200);
            };

            sys.localStorage = {
              getItem: warn,
              setItem: warn,
              removeItem: warn,
              clear: warn
            };
          } // TODO: move into pal/input


          var win = window;
          var nav = win.navigator;
          var doc = document;
          var docEle = doc.documentElement;
          var capabilities = sys.capabilities;

          if (docEle.ontouchstart !== undefined || doc.ontouchstart !== undefined || nav.msPointerEnabled) {
            capabilities.touches = true;
          }

          if (docEle.onmouseup !== undefined) {
            capabilities.mouse = true;
          }

          if (docEle.onkeyup !== undefined) {
            capabilities.keyboard = true;
          }

          if (win.DeviceMotionEvent || win.DeviceOrientationEvent) {
            capabilities.accelerometer = true;
          } // HACK: this private property only needed on web


          sys.__isWebIOS14OrIPadOS14Env = (sys.os === OS.IOS || sys.os === OS.OSX) && system.isBrowser && /(OS 1[4-9])|(Version\/1[4-9])/.test(window.navigator.userAgent);
          system.onViewResize(function () {
            var viewSize = system.getViewSize();
            sys.windowPixelResolution = {
              width: Math.round(viewSize.width * pixelRatio),
              height: Math.round(viewSize.height * pixelRatio)
            };
          });
        }
      });

      sys.__init();

      legacyCC.sys = sys;
    }
  };
});