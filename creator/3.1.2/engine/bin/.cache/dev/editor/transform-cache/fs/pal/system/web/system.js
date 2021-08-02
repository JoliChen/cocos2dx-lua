"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.system = void 0;

var _internal253Aconstants = require("../../../../virtual/internal%253Aconstants.js");

var _index = require("../../../cocos/core/math/index.js");

var _eventTarget = require("../../../cocos/core/event/event-target.js");

var _index2 = require("../enum-type/index.js");

class System {
  constructor() {
    var _nav$getBattery;

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
    this._eventTarget = new _eventTarget.EventTarget();
    this._html = void 0;
    this._battery = void 0;
    const nav = window.navigator;
    const ua = nav.userAgent.toLowerCase();
    this._html = document.getElementsByTagName('html')[0]; // @ts-expect-error getBattery is not totally supported

    (_nav$getBattery = nav.getBattery) === null || _nav$getBattery === void 0 ? void 0 : _nav$getBattery.call(nav).then(battery => {
      this._battery = battery;
    });
    this.networkType = _index2.NetworkType.LAN; // TODO

    this.isNative = false;
    this.isBrowser = true; // init isMobile and platform

    if (_internal253Aconstants.EDITOR) {
      this.isMobile = false;
      this.platform = _index2.Platform.EDITOR_PAGE; // TODO
    } else {
      this.isMobile = /mobile|android|iphone|ipad/.test(ua);
      this.platform = this.isMobile ? _index2.Platform.MOBILE_BROWSER : _index2.Platform.DESKTOP_BROWSER;
    } // init isLittleEndian


    this.isLittleEndian = (() => {
      const buffer = new ArrayBuffer(2);
      new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

      return new Int16Array(buffer)[0] === 256;
    })(); // init languageCode and language


    let currLanguage = nav.language;
    this.nativeLanguage = currLanguage.toLowerCase();
    currLanguage = currLanguage || nav.browserLanguage;
    currLanguage = currLanguage ? currLanguage.split('-')[0] : _index2.Language.ENGLISH;
    this.language = currLanguage; // init os, osVersion and osMainVersion

    let isAndroid = false;
    let iOS = false;
    let osVersion = '';
    let osMajorVersion = 0;
    let uaResult = /android\s*(\d+(?:\.\d+)*)/i.exec(ua) || /android\s*(\d+(?:\.\d+)*)/i.exec(nav.platform);

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

    let osName = _index2.OS.UNKNOWN;

    if (nav.appVersion.indexOf('Win') !== -1) {
      osName = _index2.OS.WINDOWS;
    } else if (iOS) {
      osName = _index2.OS.IOS;
    } else if (nav.appVersion.indexOf('Mac') !== -1) {
      osName = _index2.OS.OSX;
    } else if (nav.appVersion.indexOf('X11') !== -1 && nav.appVersion.indexOf('Linux') === -1) {
      osName = _index2.OS.LINUX;
    } else if (isAndroid) {
      osName = _index2.OS.ANDROID;
    } else if (nav.appVersion.indexOf('Linux') !== -1 || ua.indexOf('ubuntu') !== -1) {
      osName = _index2.OS.LINUX;
    }

    this.os = osName;
    this.osVersion = osVersion;
    this.osMainVersion = osMajorVersion; // TODO: use dack-type to determine the browserType
    // init browserType and browserVersion

    this.browserType = _index2.BrowserType.UNKNOWN;
    const typeReg0 = /wechat|weixin|micromessenger/i;
    const typeReg1 = /mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|ucbs|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i;
    const typeReg2 = /qq|qqbrowser|ucbrowser|ubrowser|edge|HuaweiBrowser/i;
    const typeReg3 = /chrome|safari|firefox|trident|opera|opr\/|oupeng/i;
    const browserTypes = typeReg0.exec(ua) || typeReg1.exec(ua) || typeReg2.exec(ua) || typeReg3.exec(ua);
    let browserType = browserTypes ? browserTypes[0].toLowerCase() : _index2.OS.UNKNOWN;

    if (browserType === 'safari' && isAndroid) {
      browserType = _index2.BrowserType.ANDROID;
    } else if (browserType === 'qq' && /android.*applewebkit/i.test(ua)) {
      browserType = _index2.BrowserType.ANDROID;
    }

    const typeMap = {
      micromessenger: _index2.BrowserType.WECHAT,
      wechat: _index2.BrowserType.WECHAT,
      weixin: _index2.BrowserType.WECHAT,
      trident: _index2.BrowserType.IE,
      edge: _index2.BrowserType.EDGE,
      '360 aphone': _index2.BrowserType.BROWSER_360,
      mxbrowser: _index2.BrowserType.MAXTHON,
      'opr/': _index2.BrowserType.OPERA,
      ubrowser: _index2.BrowserType.UC,
      huaweibrowser: _index2.BrowserType.HUAWEI
    };
    this.browserType = typeMap[browserType] || browserType; // init browserVersion

    this.browserVersion = '';
    const versionReg1 = /(mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|uc|ucbs|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui(?:.hybrid)?)(mobile)?(browser)?\/?([\d.]+)/i;
    const versionReg2 = /(qq|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i;
    let tmp = versionReg1.exec(ua);

    if (!tmp) {
      tmp = versionReg2.exec(ua);
    }

    this.browserVersion = tmp ? tmp[4] : '';
    this.pixelRatio = window.devicePixelRatio || 1; // init capability

    const _tmpCanvas1 = document.createElement('canvas');

    const supportCanvas = _internal253Aconstants.TEST ? false : !!_tmpCanvas1.getContext('2d');
    let supportWebGL = false;

    if (_internal253Aconstants.TEST) {
      supportWebGL = false;
    } else if (window.WebGLRenderingContext) {
      supportWebGL = true;
    }

    let supportWebp;

    try {
      supportWebp = _internal253Aconstants.TEST ? false : _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');
    } catch (e) {
      supportWebp = false;
    }

    let supportImageBitmap = false;

    if (!_internal253Aconstants.TEST && typeof createImageBitmap !== 'undefined' && typeof Blob !== 'undefined') {
      _tmpCanvas1.width = _tmpCanvas1.height = 2;
      createImageBitmap(_tmpCanvas1, {}).then(imageBitmap => {
        supportImageBitmap = true;
        imageBitmap === null || imageBitmap === void 0 ? void 0 : imageBitmap.close();
      }).catch(err => {});
    }

    this.supportCapability = {
      webp: supportWebp,
      gl: supportWebGL,
      canvas: supportCanvas,
      imageBitmap: supportImageBitmap
    };

    this._registerEvent();
  }

  _registerEvent() {
    window.addEventListener('resize', () => {
      this._eventTarget.emit(_index2.AppEvent.RESIZE);
    });
    window.addEventListener('orientationchange', () => {
      this._eventTarget.emit(_index2.AppEvent.ORIENTATION_CHANGE);
    });

    this._registerVisibilityEvent();
  }

  _registerVisibilityEvent() {
    let hiddenPropName;

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

    let hidden = false;

    const onHidden = () => {
      if (!hidden) {
        hidden = true;

        this._eventTarget.emit(_index2.AppEvent.HIDE);
      }
    }; // In order to adapt the most of platforms the onshow API.


    const onShown = (arg0, arg1, arg2, arg3, arg4) => {
      if (hidden) {
        hidden = false;

        this._eventTarget.emit(_index2.AppEvent.SHOW, arg0, arg1, arg2, arg3, arg4);
      }
    };

    if (hiddenPropName) {
      const changeList = ['visibilitychange', 'mozvisibilitychange', 'msvisibilitychange', 'webkitvisibilitychange', 'qbrowserVisibilityChange'];

      for (let i = 0; i < changeList.length; i++) {
        document.addEventListener(changeList[i], event => {
          let visible = document[hiddenPropName]; // @ts-expect-error QQ App need hidden property

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
  }

  getViewSize() {
    const element = document.getElementById('GameDiv');

    if (this.isMobile || !element || element === this._html) {
      return new _index.Size(window.innerWidth, window.innerHeight);
    } else {
      return new _index.Size(element.clientWidth, element.clientHeight);
    }
  }

  getOrientation() {
    throw new Error('TODO');
  }

  getSafeAreaEdge() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
  }

  getBatteryLevel() {
    if (this._battery) {
      return this._battery.level;
    } else {
      if (_internal253Aconstants.DEBUG) {
        console.warn('getBatteryLevel is not supported');
      }

      return 1;
    }
  }

  triggerGC() {
    if (_internal253Aconstants.DEBUG) {
      console.warn('triggerGC is not supported.');
    }
  }

  openURL(url) {
    window.open(url);
  }

  now() {
    if (Date.now) {
      return Date.now();
    }

    return +new Date();
  }

  restartJSVM() {
    if (_internal253Aconstants.DEBUG) {
      console.warn('restartJSVM is not supported.');
    }
  }

  onHide(cb) {
    this._eventTarget.on(_index2.AppEvent.HIDE, cb);
  }

  onShow(cb) {
    this._eventTarget.on(_index2.AppEvent.SHOW, cb);
  }

  onViewResize(cb) {
    this._eventTarget.on(_index2.AppEvent.RESIZE, cb);
  }

  onOrientationChange(cb) {
    this._eventTarget.on(_index2.AppEvent.ORIENTATION_CHANGE, cb);
  }

  offHide(cb) {
    this._eventTarget.off(_index2.AppEvent.HIDE, cb);
  }

  offShow(cb) {
    this._eventTarget.off(_index2.AppEvent.SHOW, cb);
  }

  offViewResize(cb) {
    this._eventTarget.off(_index2.AppEvent.RESIZE, cb);
  }

  offOrientationChange(cb) {
    this._eventTarget.off(_index2.AppEvent.ORIENTATION_CHANGE, cb);
  }

}

const system = new System();
exports.system = system;