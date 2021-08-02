System.register("q-bundled:///fs/cocos/core/default-constants.js", [], function (_export, _context) {
  "use strict";

  var _global, EXPORT_TO_GLOBAL, BUILD, TEST, EDITOR, PREVIEW, DEV, DEBUG, JSB, HTML5, WECHAT, MINIGAME, RUNTIME_BASED, ALIPAY, XIAOMI, BYTEDANCE, BAIDU, COCOSPLAY, HUAWEI, OPPO, VIVO, SUPPORT_JIT;

  function defined(name) {
    return typeof _global[name] === 'object';
  }

  function tryDefineGlobal(name, value) {
    if (typeof _global[name] === 'undefined') {
      return _global[name] = value;
    } else {
      return _global[name];
    }
  } // No export to global required since we have already done here.


  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.
      
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
      _global = typeof window === 'undefined' ? global : window;

      _export("EXPORT_TO_GLOBAL", EXPORT_TO_GLOBAL = false);

      _export("BUILD", BUILD = tryDefineGlobal('CC_BUILD', false));

      _export("TEST", TEST = tryDefineGlobal('CC_TEST', defined('tap') || defined('QUnit')));

      _export("EDITOR", EDITOR = tryDefineGlobal('CC_EDITOR', defined('Editor') && defined('process') && 'electron' in process.versions));

      _export("PREVIEW", PREVIEW = tryDefineGlobal('CC_PREVIEW', !EDITOR));

      _export("DEV", DEV = tryDefineGlobal('CC_DEV', true)); // (CC_EDITOR && !CC_BUILD) || CC_PREVIEW || CC_TEST


      _export("DEBUG", DEBUG = tryDefineGlobal('CC_DEBUG', true)); // CC_DEV || Debug Build


      _export("JSB", JSB = tryDefineGlobal('CC_JSB', defined('jsb')));

      _export("HTML5", HTML5 = false); // @ts-expect-error


      _export("WECHAT", WECHAT = tryDefineGlobal('CC_WECHAT', !!(defined('wx') && (wx.getSystemInfoSync || wx.getSharedCanvas))));

      _export("MINIGAME", MINIGAME = tryDefineGlobal('CC_MINIGAME', false));

      _export("RUNTIME_BASED", RUNTIME_BASED = tryDefineGlobal('CC_RUNTIME_BASED', false));

      _export("ALIPAY", ALIPAY = tryDefineGlobal('CC_ALIPAY', false));

      _export("XIAOMI", XIAOMI = tryDefineGlobal('CC_XIAOMI', false));

      _export("BYTEDANCE", BYTEDANCE = tryDefineGlobal('CC_BYTEDANCE', false));

      _export("BAIDU", BAIDU = tryDefineGlobal('CC_BAIDU', false));

      _export("COCOSPLAY", COCOSPLAY = tryDefineGlobal('CC_COCOSPLAY', false));

      _export("HUAWEI", HUAWEI = tryDefineGlobal('CC_HUAWEI', false));

      _export("OPPO", OPPO = tryDefineGlobal('CC_OPPO', false));

      _export("VIVO", VIVO = tryDefineGlobal('CC_VIVO', false)); // @ts-expect-error


      _export("SUPPORT_JIT", SUPPORT_JIT = tryDefineGlobal('CC_SUPPORT_JIT', 'function' === typeof loadRuntime));
    }
  };
});