System.register("q-bundled:///fs/cocos/core/legacy.js", ["./platform/debug.js", "./utils/path.js", "./global-exports.js"], function (_export, _context) {
  "use strict";

  var debug, _normalize, basename, changeBasename, changeExtname, dirname, extname, getSeperator, join, mainFileName, stripSep, legacyCC;

  return {
    setters: [function (_platformDebugJs) {
      debug = _platformDebugJs;
    }, function (_utilsPathJs) {
      _normalize = _utilsPathJs._normalize;
      basename = _utilsPathJs.basename;
      changeBasename = _utilsPathJs.changeBasename;
      changeExtname = _utilsPathJs.changeExtname;
      dirname = _utilsPathJs.dirname;
      extname = _utilsPathJs.extname;
      getSeperator = _utilsPathJs.getSeperator;
      join = _utilsPathJs.join;
      mainFileName = _utilsPathJs.mainFileName;
      stripSep = _utilsPathJs.stripSep;
    }, function (_globalExportsJs) {
      legacyCC = _globalExportsJs.legacyCC;
    }],
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

      /**
       * @packageDocumentation
       * @hidden
       */
      // CCDebug.js
      legacyCC.log = debug.log;
      legacyCC.warn = debug.warn;
      legacyCC.error = debug.error;
      legacyCC.assert = debug.assert;
      legacyCC._throw = debug._throw;
      legacyCC.logID = debug.logID;
      legacyCC.warnID = debug.warnID;
      legacyCC.errorID = debug.errorID;
      legacyCC.assertID = debug.assertID;
      legacyCC.debug = debug; // path.js

      legacyCC.path = {
        join: join,
        extname: extname,
        mainFileName: mainFileName,
        basename: basename,
        dirname: dirname,
        changeExtname: changeExtname,
        changeBasename: changeBasename,
        _normalize: _normalize,
        stripSep: stripSep,

        get sep() {
          return getSeperator();
        }

      };
    }
  };
});